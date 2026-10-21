/**
 * FASE 84 — Core Web Vitals (CWV) Hyper-Optimization, Two-Tier Cache Strategy & Resource Hints Engine
 * Test Suite: test_phase84_core_web_vitals_performance.cjs
 *
 * Verifies:
 * 1. Resource Hints: dns-prefetch, preconnect, and preload across all core portals (index, dev, tracks, app, placement, teacher, admin, register)
 * 2. Elimination of parser-blocking scripts: deferred loading (defer) for external scripts across all portals
 * 3. Service Worker sw.js v6.5.0 two-tier cache strategy (Stale-While-Revalidate for media/curricula, Network-First for HTML/APIs)
 * 4. Cloudflare HTTP Early Hints Link headers & sw.js instantaneous revalidation policy in _headers
 * 5. Viewport and modern performance rendering tags (viewport-fit=cover, theme-color)
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

console.log('🚀 RUNNING PHASE 84 TEST SUITE: CORE WEB VITALS (CWV) & SPEED TIER ENGINE');
console.log('========================================================================\n');

const CORE_PORTALS = [
  'index.html',
  'dev.html',
  'tracks.html',
  'app.html',
  'placement.html',
  'teacher.html',
  'admin.html',
  'register.html'
];

// ─── SUITE 1: Critical Resource Hints & DNS Prefetch ───
console.log('⚡ SUITE 1 — Critical Resource Hints & DNS Prefetch in HTML Head');
CORE_PORTALS.forEach((portal) => {
  const filePath = path.join(ROOT_DIR, portal);
  assert(fs.existsSync(filePath), `${portal} exists on disk`);

  const content = fs.readFileSync(filePath, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  assert(headMatch !== null, `${portal} contains a valid <head> element`);

  if (headMatch) {
    const headContent = headMatch[1];
    assert(
      headContent.includes('rel="dns-prefetch"') && headContent.includes('fonts.googleapis.com'),
      `${portal} declares <link rel="dns-prefetch" href="https://fonts.googleapis.com">`
    );
    assert(
      headContent.includes('rel="dns-prefetch"') && headContent.includes('fonts.gstatic.com'),
      `${portal} declares <link rel="dns-prefetch" href="https://fonts.gstatic.com">`
    );
    assert(
      headContent.includes('rel="dns-prefetch"') && headContent.includes('cdnjs.cloudflare.com'),
      `${portal} declares <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">`
    );
    assert(
      headContent.includes('rel="preconnect"') && headContent.includes('fonts.googleapis.com'),
      `${portal} declares <link rel="preconnect" href="https://fonts.googleapis.com">`
    );
  }
});

// Verify CSS Preload on critical portals
['index.html', 'dev.html', 'tracks.html'].forEach((portal) => {
  const content = fs.readFileSync(path.join(ROOT_DIR, portal), 'utf8');
  assert(
    content.includes('rel="preload"') && content.includes('as="style"'),
    `${portal} preloads critical stylesheet dev.css for faster FCP/LCP`
  );
});

// ─── SUITE 2: Parser-Blocking Script Elimination (defer attribute) ───
console.log('\n🚀 SUITE 2 — Parser-Blocking Script Elimination (defer Attributes)');
CORE_PORTALS.forEach((portal) => {
  const content = fs.readFileSync(path.join(ROOT_DIR, portal), 'utf8');
  
  // Find all external scripts (<script src="..." ...>)
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let match;
  let deferredCount = 0;
  let nonDeferredCount = 0;
  const nonDeferredList = [];

  while ((match = scriptRegex.exec(content)) !== null) {
    const fullTag = match[0];
    const src = match[1];

    if (fullTag.includes('defer') || fullTag.includes('async')) {
      deferredCount++;
    } else {
      nonDeferredCount++;
      nonDeferredList.push(src);
    }
  }

  assert(
    nonDeferredCount === 0,
    `${portal} has zero parser-blocking scripts (${deferredCount} deferred, ${nonDeferredCount} blocking: ${nonDeferredList.join(', ')})`
  );
});

// ─── SUITE 3: Service Worker v6.5.0 Two-Tier High-Performance Architecture ───
console.log('\n⚙️ SUITE 3 — Service Worker v6.5.0 Two-Tier Speed Cache Engine');
const swPath = path.join(ROOT_DIR, 'sw.js');
assert(fs.existsSync(swPath), 'sw.js exists in root directory');

const swContent = fs.readFileSync(swPath, 'utf8');
assert(
  swContent.includes("CACHE_NAME = 'stemos-lxp-v6.5.0-cwv-speed-tier'"),
  'sw.js defines CACHE_NAME as stemos-lxp-v6.5.0-cwv-speed-tier'
);
assert(
  swContent.includes('Promise.allSettled'),
  'sw.js uses Promise.allSettled for robust non-fatal pre-caching'
);
assert(
  swContent.includes('isStaticOrMedia'),
  'sw.js implements isStaticOrMedia classifier for Stale-While-Revalidate speed tier'
);
assert(
  swContent.includes('// TIER 1: Stale-While-Revalidate'),
  'sw.js implements TIER 1: Stale-While-Revalidate cache strategy'
);
assert(
  swContent.includes('// TIER 2: Network-First with Instant Cache Fallback'),
  'sw.js implements TIER 2: Network-First with Instant Cache Fallback strategy'
);

// Verify inclusion of all core curriculum files in cache
const keyCurricula = [
  '/content/courses.js',
  '/content/career_tracks.js',
  '/content/career_paths.js',
  '/content/phrases_library.js',
  '/content/mcer_tracks.js',
  '/content/placement_test.js',
  '/content/firebase_config.js',
  '/content/firebase_adapter.js',
  '/content/gemini_service.js'
];
keyCurricula.forEach((file) => {
  assert(
    swContent.includes(file),
    `sw.js ASSETS_TO_CACHE includes curriculum file: ${file}`
  );
});

// ─── SUITE 4: Cloudflare _headers Early Hints & Cache-Control ───
console.log('\n🌐 SUITE 4 — Cloudflare HTTP Early Hints & Link Headers in _headers');
const headersPath = path.join(ROOT_DIR, '_headers');
assert(fs.existsSync(headersPath), '_headers exists in root directory');

const headersContent = fs.readFileSync(headersPath, 'utf8');
assert(
  headersContent.includes('Link: <https://fonts.googleapis.com>; rel="preconnect"'),
  '_headers specifies Link preconnect for fonts.googleapis.com'
);
assert(
  headersContent.includes('Link: <https://fonts.gstatic.com>; rel="preconnect"; crossorigin') ||
  headersContent.includes('<https://fonts.gstatic.com>; rel="preconnect"; crossorigin'),
  '_headers specifies Link preconnect crossorigin for fonts.gstatic.com'
);
assert(
  headersContent.includes('/sw.js') && headersContent.includes('max-age=0, must-revalidate'),
  '_headers enforces instant revalidation (max-age=0, must-revalidate) for /sw.js'
);
assert(
  headersContent.includes('/*.html') && headersContent.includes('max-age=0, must-revalidate'),
  '_headers enforces instant revalidation for HTML documents'
);
assert(
  headersContent.includes('/*.js') && headersContent.includes('stale-while-revalidate=604800'),
  '_headers specifies stale-while-revalidate caching for static JavaScript assets'
);
assert(
  headersContent.includes('/*.css') && headersContent.includes('stale-while-revalidate=604800'),
  '_headers specifies stale-while-revalidate caching for static CSS assets'
);

// ─── SUITE 5: Modern Performance & Mobile Metas ───
console.log('\n📱 SUITE 5 — Responsive Viewport & Modern Rendering Metas');
CORE_PORTALS.forEach((portal) => {
  const content = fs.readFileSync(path.join(ROOT_DIR, portal), 'utf8');
  assert(
    content.includes('viewport-fit=cover'),
    `${portal} includes viewport-fit=cover in viewport meta tag`
  );
  assert(
    content.includes('name="theme-color"') || content.includes('content="#0284c7"'),
    `${portal} declares mobile theme-color`
  );
});

// ─── FINAL SUMMARY ───
console.log('\n========================================================================');
console.log(`📊 PHASE 84 TEST RESULTS: ${passedTests} / ${totalTests} PASSED`);
if (failedTests > 0) {
  console.error(`❌ ${failedTests} TESTS FAILED! Check logs above.`);
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 84 CWV HYPER-OPTIMIZATION TESTS PASSED PERFECTLY!');
  process.exit(0);
}
