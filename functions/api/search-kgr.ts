import { generateHeuristicKgrKeywords } from '../../src/services/heuristicGenerators';

/**
 * Cloudflare Pages Function: /api/search-kgr
 * Zero Operational Cost: Powered by high-speed algorithmic KGR generator (with optional Gemini if env key provided).
 */
export async function onRequestPost(context: { request: Request; env: any }): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body: any = await context.request.json();
    const query = body?.query;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return new Response(JSON.stringify({ error: 'Search query is required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const cleanQuery = query.trim();
    const keywords = generateHeuristicKgrKeywords(cleanQuery);

    return new Response(
      JSON.stringify({
        query: cleanQuery,
        isAiGenerated: false,
        keywords,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to search KGR keywords.', details: err?.message || String(err) }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
