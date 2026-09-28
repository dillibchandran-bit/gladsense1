/**
 * Cloudflare Pages Function: /api/health
 * Zero Operational Cost: Free health check endpoint.
 */
export async function onRequestGet(): Promise<Response> {
  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      platform: 'cloudflare-pages-edge',
      zeroCostTier: true,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
