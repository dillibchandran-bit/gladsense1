import { runSiteAudit } from '../../server/siteAuditorEngine';
import { SiteAuditRequest } from '../../src/types';

/**
 * Cloudflare Pages Function: /api/audit-site
 * Zero Operational Cost: Runs on Cloudflare Pages Functions Free Tier (100k free requests/day).
 * Executes server-side fetch from Cloudflare's global edge without browser CORS restrictions.
 */
export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = (await context.request.json()) as SiteAuditRequest;
    const { url, mode, rejectionReason, customNotes, sampleContent } = body || {};

    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'Website URL is required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const auditResult = await runSiteAudit({
      url,
      mode: mode || 'pre-approval',
      rejectionReason,
      customNotes,
      sampleContent,
    });

    return new Response(JSON.stringify(auditResult), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to complete website audit.',
        details: err?.message || String(err),
      }),
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
