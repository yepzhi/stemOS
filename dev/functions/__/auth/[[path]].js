/**
 * Cloudflare Pages Function: Firebase Auth Custom Domain Reverse Proxy
 * ════════════════════════════════════════════════════════════════════════════════════
 * Route: /__/auth/*
 * Destination: https://stemos-org.firebaseapp.com/__/auth/*
 * 
 * Intercepts Firebase Auth OAuth handler and iframe requests on stemos.org
 * and transparently reverse-proxies them to Firebase Hosting backend.
 * Ensures Google OAuth consent screen displays only "stemOS" / "stemos.org".
 * ════════════════════════════════════════════════════════════════════════════════════
 */

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetHost = 'stemos-org.firebaseapp.com';
  const targetUrl = new URL(url.pathname + url.search, `https://${targetHost}`);

  // Clone headers and rewrite Host for destination
  const outgoingHeaders = new Headers(context.request.headers);
  outgoingHeaders.set('Host', targetHost);
  outgoingHeaders.set('X-Forwarded-Host', url.host);
  outgoingHeaders.set('X-Forwarded-Proto', url.protocol.replace(':', ''));

  // Prepare upstream fetch request
  const requestInit = {
    method: context.request.method,
    headers: outgoingHeaders,
    redirect: 'manual'
  };

  // Only pass body for non-GET / non-HEAD requests
  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
    requestInit.body = context.request.body;
  }

  try {
    const upstreamResponse = await fetch(targetUrl.toString(), requestInit);

    // Clone response headers
    const responseHeaders = new Headers(upstreamResponse.headers);

    // If upstream returns a redirect to targetHost, rewrite it to current host
    const location = responseHeaders.get('Location');
    if (location && location.includes(targetHost)) {
      responseHeaders.set('Location', location.replace(targetHost, url.host));
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders
    });
  } catch (error) {
    return new Response(`Firebase Auth Proxy Error: ${error.message}`, {
      status: 502,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
  }
}
