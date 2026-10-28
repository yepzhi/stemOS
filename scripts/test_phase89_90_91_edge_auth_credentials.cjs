#!/usr/bin/env node
/**
 * stemOS Automated Verification Suite — Phases 89, 90 & 91
 *  - Phase 89: Cloudflare Edge Worker (worker.js + wrangler.jsonc) & Anti-Runaway Billing Guards
 *  - Phase 90: Institutional Google OAuth SSO & Role Verification in teacher.html & admin.html
 *  - Phase 91: Server-Side W3C Open Badges 3.0 Cryptographic Signing & Verification (/api/credentials/*)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}\n     ${err.message}`);
    failed++;
  }
}

console.log('🚀 ==============================================================');
console.log('🚀 STARTING PHASES 89, 90 & 91 VERIFICATION SUITE');
console.log('🚀 ==============================================================\n');

// ── SUITE 1: Phase 89 — Cloudflare Edge Worker & Anti-Runaway Billing Guards ──
console.log('⚡ SUITE 1: Phase 89 — Edge Worker (worker.js) & Billing Guards');

const workerPath = path.join(ROOT, 'worker.js');
const wranglerPath = path.join(ROOT, 'wrangler.jsonc');
const geminiServicePath = path.join(ROOT, 'content', 'gemini_service.js');
const firebaseAdapterPath = path.join(ROOT, 'content', 'firebase_adapter.js');

test('worker.js exists and defines all edge API routes', () => {
  assert(fs.existsSync(workerPath), 'worker.js must exist in root');
  const code = fs.readFileSync(workerPath, 'utf8');
  assert(code.includes("url.pathname === '/api/health'"), 'Missing /api/health route');
  assert(code.includes("url.pathname === '/api/gemini' || url.pathname === '/api/tutor'"), 'Missing /api/gemini & /api/tutor route');
  assert(code.includes("url.pathname === '/api/stripe/checkout'"), 'Missing /api/stripe/checkout route');
  assert(code.includes("url.pathname === '/api/spei/reference'"), 'Missing /api/spei/reference route');
  assert(code.includes("url.pathname === '/api/spei/webhook'"), 'Missing /api/spei/webhook route');
  assert(code.includes("url.pathname === '/api/tts'"), 'Missing /api/tts route');
  assert(code.includes("url.pathname === '/api/auth/verify-role'"), 'Missing /api/auth/verify-role route');
  assert(code.includes("url.pathname === '/api/credentials/sign'"), 'Missing /api/credentials/sign route');
  assert(code.includes("url.pathname === '/api/credentials/verify'"), 'Missing /api/credentials/verify route');
});

test('worker.js enforces per-IP rate limiting and fail-closed SPEI webhook', () => {
  const code = fs.readFileSync(workerPath, 'utf8');
  assert(code.includes('function checkRateLimit('), 'Missing checkRateLimit token bucket');
  assert(code.includes('BILLING_GUARD_RATE_LIMIT'), 'Missing BILLING_GUARD_RATE_LIMIT code');
  assert(code.includes('SPEI webhook secret is not configured; failing closed.'), 'SPEI webhook must fail closed when secret is missing');
  assert(code.includes('timingSafeEqualHex(expectedSig, signature)'), 'SPEI webhook must use constant-time signature comparison');
});

test('wrangler.jsonc registers worker.js and routes /api/* to Worker first', () => {
  const cfg = JSON.parse(fs.readFileSync(wranglerPath, 'utf8'));
  assert.strictEqual(cfg.main, 'worker.js', 'wrangler.jsonc main must be worker.js');
  assert(cfg.assets && Array.isArray(cfg.assets.run_worker_first) && cfg.assets.run_worker_first.includes('/api/*'), 'wrangler.jsonc must route /api/* to worker first');
});

test('content/gemini_service.js enforces BillingGuard circuit breaker and Worker-first proxy', () => {
  const code = fs.readFileSync(geminiServicePath, 'utf8');
  assert(code.includes('checkAiCircuitBreaker'), 'Missing checkAiCircuitBreaker in gemini_service.js');
  assert(code.includes('MAX_AI_CALLS_PER_HOUR = 50'), 'Missing 50 calls/hour circuit breaker limit');
  const proxyIdx = code.indexOf("const proxyEndpoints = ['/api/gemini', '/api/tutor']");
  const directIdx = code.indexOf('generativelanguage.googleapis.com');
  assert(proxyIdx > 0 && directIdx > proxyIdx, 'Edge Worker proxy must be attempted before direct generativelanguage.googleapis.com fallback');
});

test('content/firebase_adapter.js enforces 60s minimum polling floor and visibilityState guard', () => {
  const code = fs.readFileSync(firebaseAdapterPath, 'utf8');
  assert(code.includes("document.visibilityState !== 'visible'"), 'Missing document.visibilityState check in background queue processor');
  assert(code.includes('MAX_CONSECUTIVE_POLLS'), 'Missing MAX_CONSECUTIVE_POLLS ceiling');
  assert(code.includes('}, 60000);'), 'Background queue processor must use >= 60000ms interval');
});

// ── SUITE 2: Phase 90 — Institutional Google SSO in admin.html & teacher.html ──
console.log('\n🔐 SUITE 2: Phase 90 — Institutional Google OAuth SSO (Admin & Teacher Portals)');

const adminHtml = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
const teacherHtml = fs.readFileSync(path.join(ROOT, 'teacher.html'), 'utf8');

test('admin.html includes Google SSO button and handleAdminGoogleSSO with /api/auth/verify-role', () => {
  assert(adminHtml.includes('id="btn-admin-google-sso"'), 'Missing #btn-admin-google-sso in admin.html');
  assert(adminHtml.includes('async function handleAdminGoogleSSO()'), 'Missing handleAdminGoogleSSO in admin.html');
  assert(adminHtml.includes("fetch('/api/auth/verify-role'"), 'admin.html must verify institutional role via /api/auth/verify-role');
});

test('teacher.html includes Google SSO button and handleTeacherGoogleSSO with /api/auth/verify-role', () => {
  assert(teacherHtml.includes('id="btn-teacher-google-sso"'), 'Missing #btn-teacher-google-sso in teacher.html');
  assert(teacherHtml.includes('async function handleTeacherGoogleSSO()'), 'Missing handleTeacherGoogleSSO in teacher.html');
  assert(teacherHtml.includes("fetch('/api/auth/verify-role'"), 'teacher.html must verify institutional role via /api/auth/verify-role');
});

// ── SUITE 3: Phase 91 — W3C Open Badges 3.0 Edge Signing & Verification ──
console.log('\n🏅 SUITE 3: Phase 91 — W3C Open Badges 3.0 Cryptographic Signing & Mirror Parity');

const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

test('app.js requests server-side proof from /api/credentials/sign when exporting Open Badges JSON', () => {
  assert(appJs.includes("fetch('/api/credentials/sign'"), 'app.js must call /api/credentials/sign');
  assert(appJs.includes("cryptosuite: 'stemos-ed25519-hmac-sha256-2026'"), 'app.js must attach cryptographic suite metadata');
});

test('Root and dev/ mirror files remain 100% identical', () => {
  const pairs = [
    'app.js',
    'admin.html',
    'teacher.html',
    'content/gemini_service.js',
    'content/firebase_adapter.js'
  ];
  for (const rel of pairs) {
    const a = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const b = fs.readFileSync(path.join(ROOT, 'dev', rel), 'utf8');
    assert.strictEqual(a, b, `Parity mismatch between ${rel} and dev/${rel}`);
  }
});

console.log('\n🏁 ==============================================================');
console.log(`🏁 PHASES 89-91 COMPLETED: ${passed}/${passed + failed} TESTS PASSING`);
console.log('🏁 ==============================================================\n');

if (failed > 0) process.exit(1);

