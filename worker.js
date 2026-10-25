/**
 * Cloudflare Worker: stemOS Asset Server & Firebase Auth Custom Domain Reverse Proxy
 * ════════════════════════════════════════════════════════════════════════════════════
 * Route: /__/auth/*
 * Destination: https://stemos-org.firebaseapp.com/__/auth/*
 * 
 * Intercepts Firebase Auth OAuth handler and iframe requests on stemos.org
 * and transparently reverse-proxies them to Firebase Hosting backend.
 * Ensures Google OAuth consent screen displays only "stemOS" / "stemos.org".
 * ════════════════════════════════════════════════════════════════════════════════════
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Intercept Firebase Auth OAuth handlers & state iframes
    if (url.pathname.startsWith('/__/auth/')) {
      const targetHost = 'stemos-org.firebaseapp.com';
      const targetUrl = new URL(url.pathname + url.search, `https://${targetHost}`);

      // Forward request headers with rewritten Host
      const outgoingHeaders = new Headers(request.headers);
      outgoingHeaders.set('Host', targetHost);
      outgoingHeaders.set('X-Forwarded-Host', url.host);
      outgoingHeaders.set('X-Forwarded-Proto', url.protocol.replace(':', ''));

      const requestInit = {
        method: request.method,
        headers: outgoingHeaders,
        redirect: 'manual'
      };

      if (request.method !== 'GET' && request.method !== 'HEAD') {
        requestInit.body = request.body;
      }

      try {
        const upstreamResponse = await fetch(targetUrl.toString(), requestInit);
        const responseHeaders = new Headers(upstreamResponse.headers);

        // Rewrite redirect Location to keep user on origin host
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

    // Serve all static assets via Cloudflare Assets
    return env.ASSETS.fetch(request);
  }
};
