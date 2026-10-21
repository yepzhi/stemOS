/**
 * FASE 82 — Comprehensive Cross-Platform Mobile Hardening, Cloudflare Production Security Headers & Deployment
 * Test Suite: test_phase82_production_security_and_mobile.cjs
 *
 * Verifies:
 * 1. Cloudflare _headers security headers (CSP, HSTS, XFO, nosniff, Referrer-Policy, Permissions-Policy, COOP, Cache-Control)
 * 2. Cross-portal HTML viewport-fit=cover compliance across all production HTML files
 * 3. Mobile responsiveness, unblocked scroll & safe-area-inset handling in app.html, placement.html, teacher.html, admin.html, tracks.html
 * 4. Touch target ergonomics (WCAG 2.5.8 ≥44px) across CSS/HTML
 * 5. Cloudflare Workers / Assets configuration in wrangler.jsonc & .assetsignore hygiene
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

console.log('🚀 RUNNING PHASE 82 TEST SUITE: PRODUCTION SECURITY & MOBILE HARDENING');
console.log('======================================================================\n');

// ─── SUITE 1: Cloudflare _headers Security & Caching ───
console.log('🔒 SUITE 1 — Cloudflare _headers Production Security');
const headersPath = path.join(ROOT_DIR, '_headers');
assert(fs.existsSync(headersPath), '_headers file exists in root directory');

if (fs.existsSync(headersPath)) {
  const headersContent = fs.readFileSync(headersPath, 'utf8');

  assert(headersContent.includes('Content-Security-Policy:'), 'Content-Security-Policy is present');
  assert(headersContent.includes("default-src 'self'"), "CSP specifies default-src 'self'");
  assert(headersContent.includes("object-src 'none'"), "CSP blocks plugins with object-src 'none'");
  assert(headersContent.includes("base-uri 'self'"), "CSP restricts base-uri to 'self'");
  assert(headersContent.includes("frame-ancestors 'self'"), "CSP clickjacking defense frame-ancestors 'self'");
  assert(headersContent.includes('https://www.gstatic.com'), 'CSP permits Google/Firebase static scripts');
  assert(headersContent.includes('Strict-Transport-Security: max-age=31536000'), 'HSTS is set to 1 year max-age');
  assert(headersContent.includes('X-Frame-Options: SAMEORIGIN'), 'X-Frame-Options is SAMEORIGIN');
  assert(headersContent.includes('X-Content-Type-Options: nosniff'), 'X-Content-Type-Options is nosniff');
  assert(headersContent.includes('Referrer-Policy: strict-origin-when-cross-origin'), 'Referrer-Policy is strict-origin');
  assert(headersContent.includes('Permissions-Policy:'), 'Permissions-Policy is present');
  assert(headersContent.includes('Cross-Origin-Opener-Policy: same-origin-allow-popups'), 'COOP same-origin-allow-popups for OAuth');
  assert(headersContent.includes('Cache-Control: public, max-age=86400'), 'Aggressive caching on static JS/CSS');
  assert(headersContent.includes('Cache-Control: public, max-age=0, must-revalidate'), 'Revalidation on HTML pages');
}

// ─── SUITE 2: Cross-Portal Viewport-Fit=Cover Audit ───
console.log('\n📱 SUITE 2 — Cross-Portal Viewport-Fit=Cover Audit');
const htmlFiles = [
  '404.html',
  'admin.html',
  'app.html',
  'dev.html',
  'index.html',
  'placement.html',
  'privacy.html',
  'register.html',
  'teacher.html',
  'tracks.html'
];

htmlFiles.forEach((file) => {
  const filePath = path.join(ROOT_DIR, file);
  assert(fs.existsSync(filePath), `HTML file exists: ${file}`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    assert(
      content.includes('viewport-fit=cover'),
      `${file} contains viewport-fit=cover for notched devices`
    );
    assert(
      content.includes('width=device-width'),
      `${file} contains width=device-width`
    );
  }
});

// ─── SUITE 3: app.html Mobile Scroll & Ergonomics ───
console.log('\n📱 SUITE 3 — app.html Mobile Scroll & Ergonomics');
const appHtml = fs.readFileSync(path.join(ROOT_DIR, 'app.html'), 'utf8');
assert(!appHtml.includes('style="overflow: hidden; height: 100vh;"'), 'app.html body no longer has blocking inline overflow:hidden 100vh');
assert(appHtml.includes('overflow-y: auto !important'), 'app.html has responsive vertical scroll enabled for mobile');
assert(appHtml.includes('env(safe-area-inset-top)'), 'app.html uses safe-area-inset-top');
assert(appHtml.includes('env(safe-area-inset-bottom)'), 'app.html uses safe-area-inset-bottom');
assert(appHtml.includes('100dvh'), 'app.html uses dynamic viewport units (100dvh)');

// ─── SUITE 4: placement.html & teacher.html Mobile Hardening ───
console.log('\n🎯 SUITE 4 — placement.html & teacher.html Mobile Hardening');
const placementHtml = fs.readFileSync(path.join(ROOT_DIR, 'placement.html'), 'utf8');
assert(placementHtml.includes('env(safe-area-inset-top)'), 'placement.html top-bar handles notch safe-area');
assert(placementHtml.includes('touch-action: manipulation'), 'placement.html eliminates tap delay with touch-action: manipulation');
assert(placementHtml.includes('@media (max-width: 640px)'), 'placement.html has small-screen responsive breakpoint');

const teacherHtml = fs.readFileSync(path.join(ROOT_DIR, 'teacher.html'), 'utf8');
assert(teacherHtml.includes('@media (max-width: 600px)'), 'teacher.html has mobile phone breakpoint');
assert(teacherHtml.includes('table-container'), 'teacher.html includes table container styling');

const adminHtml = fs.readFileSync(path.join(ROOT_DIR, 'admin.html'), 'utf8');
assert(adminHtml.includes('@media (max-width: 600px)'), 'admin.html has mobile phone breakpoint');
assert(adminHtml.includes('env(safe-area-inset-top)'), 'admin.html handles safe-area insets');

// ─── SUITE 5: Global CSS Mobile Safe Area & Touch Targets ───
console.log('\n🎨 SUITE 5 — Global CSS Mobile Navigation & Safe Areas');
const stylesCss = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
assert(stylesCss.includes('env(safe-area-inset-top)'), 'styles.css rail sidebar supports safe-area-inset-top');
assert(stylesCss.includes('min-height: 44px'), 'styles.css enforces min-height 44px touch targets');
assert(stylesCss.includes('100dvh'), 'styles.css uses dynamic viewport units (100dvh)');

const devCss = fs.readFileSync(path.join(ROOT_DIR, 'dev.css'), 'utf8');
assert(devCss.includes('env(safe-area-inset-top)'), 'dev.css supaste-nav-wrapper handles safe-area-inset-top');
assert(devCss.includes('min-height: 44px'), 'dev.css enforces 44px touch target on mobile buttons');

// ─── SUITE 6: Cloudflare Configuration & Deployment Hygiene ───
console.log('\n⛅ SUITE 6 — Cloudflare Wrangler & Assets Hygiene');
const wranglerPath = path.join(ROOT_DIR, 'wrangler.jsonc');
const wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
assert(wranglerContent.includes('"not_found_handling": "404-page"'), 'wrangler.jsonc configures 404-page handling');

const assetsIgnore = fs.readFileSync(path.join(ROOT_DIR, '.assetsignore'), 'utf8');
assert(assetsIgnore.includes('scripts/'), '.assetsignore excludes scripts/ directory from public assets');
assert(assetsIgnore.includes('.git/'), '.assetsignore excludes .git metadata');
assert(assetsIgnore.includes('*.md'), '.assetsignore excludes development markdown plans');

console.log('\n======================================================================');
console.log(`📊 PHASE 82 TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
if (failedTests > 0) {
  console.error(`❌ ${failedTests} test(s) failed.`);
  process.exit(1);
} else {
  console.log('🎉 ALL PHASE 82 TESTS PASSED! Production security & mobile readiness verified.');
  process.exit(0);
}
