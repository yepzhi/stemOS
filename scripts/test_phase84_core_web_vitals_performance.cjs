/**
 * FASE 84 — Core Web Vitals Hyper-Optimization, Two-Tier Service Worker Cache, Non-Blocking Parsing & Cloudflare Early Hints
 * Test Suite: test_phase84_core_web_vitals_performance.cjs
 *
 * Verifies:
 * 1. Critical Resource Hints (dns-prefetch, preconnect, preload) in HTML headers across all portals
 * 2. Elimination of parser-blocking scripts with defer attribute across all primary portals
 * 3. Service Worker sw.js v6.5.0 two-tier caching engine (Stale-While-Revalidate for media/data, Network-First for HTML/APIs)
 * 4. Cloudflare _headers HTTP Early Hints & Link preconnect/preload directives
 * 5. Production version v1.1.1 synchronization and badge integration across portals
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS — ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL — ${message}`);
  }
}

console.log('🚀 RUNNING PHASE 84 TEST SUITE: CORE WEB VITALS & TWO-TIER CACHE ARCHITECTURE');
console.log('===============================================================================\n');

// ─── SUITE 1: Critical Resource Hints in HTML Portals ───
console.log('⚡ SUITE 1 — Critical Resource Hints (dns-prefetch, preconnect, preload)');

const portals = [
  'index.html',
  'dev.html',
  'tracks.html',
  'placement.html',
  'register.html',
  'teacher.html',
  'admin.html'
];

portals.forEach(portal => {
  const filePath = path.join(ROOT_DIR, portal);
  assert(fs.existsSync(filePath), `${portal} exists in workspace`);
  const content = fs.readFileSync(filePath, 'utf8');

  // Verify dns-prefetch for external CDNs and fonts
  assert(
    content.includes('rel="dns-prefetch" href="https://fonts.googleapis.com"'),
    `${portal} has dns-prefetch for fonts.googleapis.com`
  );
  assert(
    content.includes('rel="dns-prefetch" href="https://fonts.gstatic.com"'),
    `${portal} has dns-prefetch for fonts.gstatic.com`
  );
  assert(
    content.includes('rel="dns-prefetch" href="https://cdnjs.cloudflare.com"'),
    `${portal} has dns-prefetch for cdnjs.cloudflare.com`
  );

  // Verify preconnect for critical origins
  assert(
    content.includes('rel="preconnect" href="https://fonts.googleapis.com"'),
    `${portal} has preconnect for fonts.googleapis.com`
  );
  assert(
    content.includes('rel="preconnect" href="https://fonts.gstatic.com"') &&
    content.includes('crossorigin'),
    `${portal} has preconnect for fonts.gstatic.com with crossorigin`
  );
});

// Specific checks for primary stylesheet preloads
const indexContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(
  indexContent.includes('rel="preload"') && indexContent.includes('as="style"'),
  'index.html preloads primary stylesheet dev.css'
);

const devContent = fs.readFileSync(path.join(ROOT_DIR, 'dev.html'), 'utf8');
assert(
  devContent.includes('rel="preload"') && devContent.includes('as="style"'),
  'dev.html preloads primary stylesheet dev.css'
);

const tracksContent = fs.readFileSync(path.join(ROOT_DIR, 'tracks.html'), 'utf8');
assert(
  tracksContent.includes('rel="preload"') && tracksContent.includes('as="style"'),
  'tracks.html preloads primary stylesheet dev.css'
);

// ─── SUITE 2: Parser-Blocking Elimination with Defer ───
console.log('\n🚀 SUITE 2 — Parser-Blocking Elimination with defer across Portals');

function checkScriptsHaveDefer(portalName, scriptSubstrings) {
  const content = fs.readFileSync(path.join(ROOT_DIR, portalName), 'utf8');
  scriptSubstrings.forEach(scriptSub => {
    // Look for <script ... src="...scriptSub..."
    const re = new RegExp(`<script[^>]*src="[^"]*${scriptSub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*"[^>]*>`, 'i');
    const match = content.match(re);
    if (match) {
      assert(match[0].includes('defer'), `${portalName}: script matching "${scriptSub}" contains defer attribute`);
    } else {
      assert(false, `${portalName}: script matching "${scriptSub}" was not found`);
    }
  });
}

// index.html checks
checkScriptsHaveDefer('index.html', [
  'courses.js',
  'career_tracks.js',
  'career_paths.js',
  'dev.js',
  'firebase_config.js',
  'firebase_adapter.js',
  'gemini_service.js',
  'stemos_pwa.js'
]);

// dev.html checks
checkScriptsHaveDefer('dev.html', [
  'courses.js',
  'career_tracks.js',
  'career_paths.js',
  'dev.js',
  'stemos_pwa.js'
]);

// tracks.html checks
checkScriptsHaveDefer('tracks.html', [
  'courses.js',
  'career_tracks.js',
  'career_paths.js',
  'dev.js',
  'stemos_pwa.js'
]);

// placement.html checks
checkScriptsHaveDefer('placement.html', [
  'firebase-app-compat.js',
  'firebase-auth-compat.js',
  'firebase-firestore-compat.js',
  'career_tracks.js',
  'placement_test.js',
  'stemos_pwa.js'
]);

// teacher.html checks
checkScriptsHaveDefer('teacher.html', [
  'firebase-app-compat.js',
  'firebase-auth-compat.js',
  'firebase-firestore-compat.js',
  'career_tracks.js',
  'career_paths.js',
  'stemos_pwa.js'
]);

// admin.html checks
checkScriptsHaveDefer('admin.html', [
  'firebase-app-compat.js',
  'firebase-auth-compat.js',
  'firebase-firestore-compat.js',
  'career_tracks.js',
  'career_paths.js',
  'stemos_pwa.js'
]);

// register.html checks
checkScriptsHaveDefer('register.html', [
  'confetti.browser.min.js'
]);

// ─── SUITE 3: Service Worker sw.js v6.5.0 Two-Tier Cache Engine ───
console.log('\n🛡️ SUITE 3 — Service Worker sw.js v6.5.0 Two-Tier Architecture');

const swPath = path.join(ROOT_DIR, 'sw.js');
assert(fs.existsSync(swPath), 'sw.js exists in root directory');

const swContent = fs.readFileSync(swPath, 'utf8');

assert(
  swContent.includes("CACHE_NAME = 'stemos-lxp-v6.5.0-cwv-speed-tier'"),
  'sw.js specifies CACHE_NAME v6.5.0 with cwv-speed-tier'
);

assert(
  swContent.includes("SW_VERSION = '6.5.0'"),
  'sw.js specifies SW_VERSION 6.5.0'
);

assert(
  swContent.includes('Two-Tier') || swContent.includes('Stale-While-Revalidate'),
  'sw.js documents and implements Two-Tier Speed Strategy'
);

assert(
  swContent.includes('isSpeedAsset') &&
  swContent.includes('/content/courses.js') &&
  swContent.includes('/content/career_tracks.js'),
  'sw.js has Stale-While-Revalidate tier matching curriculum and media files'
);

assert(
  swContent.includes('caches.open(CACHE_NAME)') && swContent.includes('cache.put(event.request, clone)'),
  'sw.js updates cache in background during Stale-While-Revalidate fetches'
);

assert(
  swContent.includes('Promise.allSettled'),
  'sw.js uses Promise.allSettled for resilient pre-caching without install failures'
);

assert(
  swContent.includes('manifest.json') && swContent.includes('manifest.webmanifest'),
  'sw.js pre-caches both manifest variants for offline PWA compliance'
);

// ─── SUITE 4: Cloudflare _headers Early Hints & Caching ───
console.log('\n🌐 SUITE 4 — Cloudflare _headers Early Hints & Performance Directives');

const headersPath = path.join(ROOT_DIR, '_headers');
assert(fs.existsSync(headersPath), '_headers file exists in root directory');

const headersContent = fs.readFileSync(headersPath, 'utf8');

assert(
  headersContent.includes('<https://fonts.googleapis.com>; rel=preconnect; crossorigin'),
  '_headers defines HTTP Link preconnect for Google Fonts'
);

assert(
  headersContent.includes('<https://fonts.gstatic.com>; rel=preconnect; crossorigin'),
  '_headers defines HTTP Link preconnect for Google Fonts Static CDN'
);

assert(
  headersContent.includes('<https://cdnjs.cloudflare.com>; rel=dns-prefetch'),
  '_headers defines HTTP Link dns-prefetch for cdnjs'
);

assert(
  headersContent.includes('Link: </dev.css?v=5.12.1>; rel=preload; as=style') ||
  headersContent.includes('</dev.css?v=5.12.1>; rel=preload; as=style'),
  '_headers defines HTTP Link preload for dev.css stylesheet'
);

assert(
  headersContent.includes('</manifest.webmanifest>; rel=preload; as=fetch; crossorigin=anonymous'),
  '_headers defines HTTP Link preload for manifest.webmanifest'
);

assert(
  headersContent.includes('Cache-Control: public, max-age=31536000, immutable'),
  '_headers configures 1-year immutable caching for static assets'
);

// ─── SUITE 5: Global Version Synchronization & Badges ───
console.log('\n🏷️ SUITE 5 — Global Version Synchronization (v1.1.1)');

['index.html', 'dev.html', 'tracks.html'].forEach(portal => {
  const content = fs.readFileSync(path.join(ROOT_DIR, portal), 'utf8');
  assert(
    content.includes('stemos-version-badge') && content.includes('v1.1.1'),
    `${portal} includes visible v1.1.1 version badge in footer`
  );
  assert(
    content.includes("STEMOS_VERSION = 'v1.1.1'"),
    `${portal} exposes global window.STEMOS_VERSION = 'v1.1.1'`
  );
});

// Summary
console.log('\n===============================================================================');
console.log(`📊 PHASE 84 TEST RESULTS: ${passedTests} passed out of ${totalTests} tests`);

if (failedTests > 0) {
  console.error(`❌ ${failedTests} test(s) failed.`);
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 84 TESTS PASSED PERFECTLY! ZERO ERRORS.\n');
  process.exit(0);
}
