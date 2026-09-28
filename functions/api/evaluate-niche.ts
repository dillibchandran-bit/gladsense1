import { generateHeuristicEvaluation } from '../../src/services/heuristicGenerators';

/**
 * Cloudflare Pages Function: /api/evaluate-niche
 * Zero Operational Cost: Algorithmic monetization evaluator running on edge.
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
    const { nicheName, targetAudience, description } = body || {};

    if (!nicheName || typeof nicheName !== 'string') {
      return new Response(JSON.stringify({ error: 'nicheName is required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const evaluation = generateHeuristicEvaluation(nicheName, targetAudience, description);

    return new Response(
      JSON.stringify({
        isAiGenerated: false,
        warning: 'Zero-cost algorithmic AdSense publisher modeling applied.',
        evaluation,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to evaluate niche.', details: err?.message || String(err) }),
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
