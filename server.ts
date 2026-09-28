import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { runSiteAudit } from "./server/siteAuditorEngine";
import {
  generateHeuristicKgrKeywords,
  generateHeuristicEvaluation,
} from "./src/services/heuristicGenerators";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Check health
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // API Route: Live Site AdSense Pre-Approval Audit & Rejection Doctor
  app.post("/api/audit-site", async (req, res) => {
    try {
      const { url, mode, rejectionReason, customNotes, sampleContent } = req.body;

      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "Website URL is required" });
      }

      const auditResult = await runSiteAudit({
        url,
        mode: mode || "pre-approval",
        rejectionReason,
        customNotes,
        sampleContent,
      });

      return res.json(auditResult);
    } catch (err: any) {
      console.warn("Site audit processing warning:", err?.message || err);
      return res.status(500).json({
        error: "Failed to complete website audit. Please verify the URL and try again.",
      });
    }
  });

  // API Route: AI Custom Niche Feasibility & AdSense Evaluator
  app.post("/api/evaluate-niche", async (req, res) => {
    try {
      const { nicheName, targetAudience, description } = req.body;

      if (!nicheName || typeof nicheName !== "string") {
        return res.status(400).json({ error: "nicheName is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          isAiGenerated: false,
          warning: "No GEMINI_API_KEY configured. Providing heuristic evaluation.",
          evaluation: generateHeuristicEvaluation(nicheName, targetAudience, description),
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class Google AdSense Monetization and Organic SEO Architect.
A creator wants to launch a website on a strict ultra-low budget (only domain cost ~$10/yr, $0 free static hosting like Cloudflare Pages) that achieves rapid Google AdSense approval and sustainable organic traffic with minimal competition.

Evaluate this proposed niche:
Niche: "${nicheName}"
Target Audience: "${targetAudience || 'General online searchers'}"
Description / Concept: "${description || 'Utility tools or informational guides in this niche'}"

Return ONLY valid JSON matching this exact structure:
{
  "nicheName": "${nicheName}",
  "competitionScore": "Ultra-Low" | "Low" | "Medium" | "High",
  "competitionSummary": "Brief 1-2 sentence explanation of competitor weakness or saturation",
  "estimatedRPM": { "min": 8, "max": 24, "average": 15 },
  "policyApprovalRisk": "Low" | "Medium" | "High",
  "policyRiskExplanation": "Why Google AdSense will approve or might flag (mention YMYL, thin content risks)",
  "approvalProbability": 94, // Percentage 0 - 100 estimated probability of passing Google AdSense manual & bot review
  "approvalFactors": {
    "policyCompliance": 96,
    "thinContentSafety": 95,
    "ymylSafety": 98,
    "commercialDemand": 90
  },
  "hostingCostFeasibility": "Explain why this can easily run on $0 static hosting (JS micro-tools, SSG)",
  "recommendedModel": "Client-side interactive calculator/tool paired with 1,000-word guides",
  "trafficPotentialMonthly": "15,000 - 80,000 pageviews within 6-9 months",
  "kgrKeywords": [
    { "keyword": "example low competition long tail query", "estimatedVolume": 210, "kgrScore": 0.18, "intent": "High utility calculation" },
    { "keyword": "example second long tail query", "estimatedVolume": 160, "kgrScore": 0.22, "intent": "Formula / step by step solver" },
    { "keyword": "example third long tail query", "estimatedVolume": 320, "kgrScore": 0.24, "intent": "Troubleshooting conversion" }
  ],
  "monetizationBlueprint": {
    "recommendedAdDensity": "3 ad units + 1 anchor unit",
    "dwellTimeAdvantage": "How the interactive nature keeps users on page for 2+ minutes",
    "topAdPlacements": ["Above tool fold (responsive)", "Immediately below calculation result", "Mid-article educational section"]
  },
  "verdictScore": 88,
  "verdictReasoning": "Summarize overall viability in 2 sentences"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      return res.json({
        isAiGenerated: true,
        evaluation: parsedData,
      });
    } catch (err: any) {
      const errMsg = String(err?.message || err || "");
      const isApiKeyIssue =
        errMsg.includes("API key was reported as leaked") ||
        errMsg.includes("PERMISSION_DENIED") ||
        errMsg.includes("API_KEY_INVALID") ||
        err?.status === 403;

      console.warn("AI evaluation falling back to heuristic engine:", errMsg.slice(0, 120));

      // Fallback gracefully so the UI and application never break
      const { nicheName, targetAudience, description } = req.body;
      const fallbackWarning = isApiKeyIssue
        ? "Configured Gemini API key is currently restricted or reported as compromised. Please update your key in Settings. Built-in algorithmic AdSense analysis was provided."
        : "Algorithmic AdSense publisher modeling applied.";

      return res.status(200).json({
        isAiGenerated: false,
        warning: fallbackWarning,
        evaluation: generateHeuristicEvaluation(nicheName || "Custom Niche", targetAudience, description),
      });
    }
  });

  // API Route: Dynamic KGR Keyword Search for Any Niche or Query
  app.post("/api/search-kgr", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Search query is required" });
      }

      const cleanQuery = query.trim();
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          query: cleanQuery,
          isAiGenerated: false,
          keywords: generateHeuristicKgrKeywords(cleanQuery),
        });
      }

      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are a Keyword Golden Ratio (KGR) SEO specialist.
The user searched for: "${cleanQuery}".
Strict KGR criteria:
1. Monthly Search Volume typically under 250 (e.g. between 60 and 240).
2. Google AllInTitle results under 30 (e.g. between 2 and 22).
3. KGR score = AllInTitle / Volume <= 0.25 (Golden Ratio, fast page 1 ranking).

CRITICAL INSTRUCTIONS:
- First, detect the real topic and domain of "${cleanQuery}" (e.g., Jobs/Careers, Local Services, Education/Admissions, Real Estate, Civic/Legal, Tech, Trades, Food Science).
- KEYWORD #1 in the list MUST be the exact query "${cleanQuery}" itself (do not append random words to item #1).
- For subsequent variations, generate 5 to 7 realistic, natural, high-intent search queries that real users search on Google for this SPECIFIC topic.
- DO NOT append irrelevant words. NEVER append "calculator", "ratio mixing formula", or "volume" to job searches, real estate, or unrelated queries! If it's a job query, suggest job-specific variations (freshers, walk-in, salary, interview, openings).

Return ONLY valid JSON matching this exact structure:
{
  "keywords": [
    {
      "kw": "exact long-tail query string",
      "vol": 190,
      "ait": 12,
      "kgr": 0.063,
      "category": "Domain/Category Name (e.g. Careers, Education, Local, Tech, Civic, Trades)",
      "intent": "Brief user search intent"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        });

        const responseText = response.text || "{}";
        const parsed = JSON.parse(responseText);

        if (Array.isArray(parsed.keywords) && parsed.keywords.length > 0) {
          // Normalize kgr values
          const normalized = parsed.keywords.map((k: any, index: number) => {
            const vol = Number(k.vol) || (140 + (index * 15));
            const ait = Number(k.ait) || (5 + index);
            const score = Number((ait / vol).toFixed(3));
            return {
              kw: String(k.kw || cleanQuery),
              vol,
              ait,
              kgr: score,
              category: String(k.category || "General"),
              intent: String(k.intent || (index === 0 ? "Exact Target Query" : "High-intent long-tail search")),
            };
          });

          return res.json({
            query: cleanQuery,
            isAiGenerated: true,
            keywords: normalized,
          });
        }
      } catch (geminiErr: any) {
        console.warn("KGR Gemini generation failed, using domain heuristic engine:", geminiErr?.message || geminiErr);
      }

      // Fallback: Domain-aware heuristic generation
      return res.json({
        query: cleanQuery,
        isAiGenerated: false,
        keywords: generateHeuristicKgrKeywords(cleanQuery),
      });
    } catch (err: any) {
      console.warn("KGR Search general error:", err?.message || err);
      return res.status(500).json({ error: "Failed to search KGR keywords." });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AdSense Strategist server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
