/**
 * Test Suite: Phase 85 Security Hardening & Modern Web Guidance
 * Verifies:
 *  1. Firebase Adapter XSS sanitization and export
 *  2. Subresource Integrity (SRI) on external CDNs (FontAwesome, canvas-confetti)
 *  3. Content-Security-Policy & Permissions-Policy in _headers
 *  4. Cloudflare HTTP Early Hints Link headers in _headers
 *  5. Viewport-fit=cover & mobile safe-area meta across all 9 portals
 *  6. Service Worker v6.5.0 two-tier caching architecture
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
    if (condition) {
        console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
        passedTests++;
    } else {
        console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${testName}${details ? ` -> ${details}` : ''}`);
        failedTests++;
    }
}

console.log('\n🔒 Starting Test Suite: Phase 85 — Security Hardening & Modern Web Guidance');

// 1. Firebase Adapter Input Sanitization
console.log('\n--- 1. Firebase Adapter XSS Sanitization ---');
const adapterPath = path.join(ROOT_DIR, 'content', 'firebase_adapter.js');
assert(fs.existsSync(adapterPath), 'content/firebase_adapter.js exists');

const adapterContent = fs.readFileSync(adapterPath, 'utf8');
assert(adapterContent.includes('function sanitize(val)'), 'sanitize helper defined in firebase_adapter.js');
assert(adapterContent.includes('sanitize: sanitize'), 'sanitize exported in STEMOS_FIREBASE');
assert(adapterContent.includes('name: sanitize('), 'registerStudent sanitizes student name');
assert(adapterContent.includes('matricula: sanitize('), 'registerStudent sanitizes student matricula');
assert(adapterContent.includes('careerName: sanitize('), 'registerStudent sanitizes careerName');

// Functional test of sanitize logic
const sanitizeMatch = adapterContent.match(/function sanitize\(val\)\s*\{([\s\S]*?)\}/);
assert(Boolean(sanitizeMatch), 'Extract sanitize implementation');
if (sanitizeMatch) {
    const sanitizeFn = new Function('val', sanitizeMatch[1]);
    const xssPayload = '<script>alert("hacked")</script>Juan Pérez';
    const cleaned = sanitizeFn(xssPayload);
    assert(!cleaned.includes('<') && !cleaned.includes('>'), 'sanitize strips angle brackets from malicious XSS input');
    assert(cleaned.includes('Juan Pérez'), 'sanitize preserves legitimate character content');
}

// 2. Subresource Integrity (SRI) Verification
console.log('\n--- 2. Subresource Integrity (SRI) on External CDNs ---');
const registerPath = path.join(ROOT_DIR, 'register.html');
const registerHtml = fs.readFileSync(registerPath, 'utf8');
assert(
    registerHtml.includes('confetti.browser.min.js') &&
    registerHtml.includes('integrity="sha384-HAH79XdRvHr6axVGh4xQWVCp14kcd32bNk4Xu0sHDHtFQ42n6BAM8ykvB47dGz6D"') &&
    registerHtml.includes('crossorigin="anonymous"'),
    'register.html has valid SHA-384 SRI and crossorigin for canvas-confetti'
);

const portals = [
    { name: 'index.html', version: '6.5.1', hash: 'sha384-t1nt8BQoYMLFN5p42tRAtuAAFQaCQODekUVeKKZrEnEyp4H2R0RHFz0KWpmj7i8g' },
    { name: 'dev.html', version: '6.5.1', hash: 'sha384-t1nt8BQoYMLFN5p42tRAtuAAFQaCQODekUVeKKZrEnEyp4H2R0RHFz0KWpmj7i8g' },
    { name: 'tracks.html', version: '6.5.1', hash: 'sha384-t1nt8BQoYMLFN5p42tRAtuAAFQaCQODekUVeKKZrEnEyp4H2R0RHFz0KWpmj7i8g' },
    { name: 'privacy.html', version: '6.5.1', hash: 'sha384-t1nt8BQoYMLFN5p42tRAtuAAFQaCQODekUVeKKZrEnEyp4H2R0RHFz0KWpmj7i8g' },
    { name: 'app.html', version: '6.4.0', hash: 'sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0' },
    { name: 'placement.html', version: '6.4.0', hash: 'sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0' },
    { name: 'teacher.html', version: '6.4.0', hash: 'sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0' },
    { name: 'admin.html', version: '6.4.0', hash: 'sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0' },
    { name: 'register.html', version: '6.4.0', hash: 'sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0' }
];

portals.forEach(portal => {
    const filePath = path.join(ROOT_DIR, portal.name);
    const content = fs.readFileSync(filePath, 'utf8');
    const hasSRI = content.includes(`font-awesome/${portal.version}/css/all.min.css`) &&
                   content.includes(portal.hash) &&
                   content.includes('crossorigin="anonymous"');
    assert(hasSRI, `${portal.name} has SRI integrity for Font Awesome ${portal.version}`);
});

// 3. Cloudflare Security Headers in _headers
console.log('\n--- 3. Cloudflare Security Headers (_headers) ---');
const headersPath = path.join(ROOT_DIR, '_headers');
assert(fs.existsSync(headersPath), '_headers file exists');
const headersContent = fs.readFileSync(headersPath, 'utf8');

assert(headersContent.includes('Content-Security-Policy:'), '_headers defines Content-Security-Policy');
assert(headersContent.includes("default-src 'self'"), 'CSP sets default-src to self');
assert(headersContent.includes("object-src 'none'"), 'CSP blocks vulnerable plugin objects (object-src none)');
assert(headersContent.includes("base-uri 'self'"), 'CSP prevents base-tag hijacking (base-uri self)');
assert(headersContent.includes("frame-ancestors 'self'"), 'CSP prevents clickjacking via frame-ancestors');
assert(headersContent.includes('Permissions-Policy:'), '_headers defines modern Permissions-Policy');
assert(headersContent.includes('camera=()'), 'Permissions-Policy restricts camera access');
assert(headersContent.includes('microphone=()'), 'Permissions-Policy restricts microphone access');
assert(headersContent.includes('geolocation=()'), 'Permissions-Policy restricts geolocation access');

// 4. Cloudflare HTTP Early Hints Link Headers
console.log('\n--- 4. Cloudflare HTTP Early Hints Link Headers ---');
assert(headersContent.includes('Link:'), '_headers defines Link headers');
assert(headersContent.includes('<https://fonts.googleapis.com>; rel="preconnect"') || headersContent.includes('<https://fonts.googleapis.com>; rel=preconnect'), 'Link header preconnects to Google Fonts');
assert(headersContent.includes('<https://fonts.gstatic.com>; rel="preconnect"') || headersContent.includes('<https://fonts.gstatic.com>; rel=preconnect'), 'Link header preconnects with crossorigin to fonts.gstatic.com');
assert(headersContent.includes('<https://cdnjs.cloudflare.com>; rel="dns-prefetch"') || headersContent.includes('<https://cdnjs.cloudflare.com>; rel=dns-prefetch'), 'Link header prefetches cdnjs.cloudflare.com');
assert(headersContent.includes('</dev.css?v=5.12.1>; rel="preload"') || headersContent.includes('</dev.css?v=5.12.1>; rel=preload'), 'Link header preloads critical stylesheet /dev.css');

// 5. Modern Web Responsive Viewport & Meta
console.log('\n--- 5. Modern Web Responsive Viewport & Theme Meta ---');
const allPortalNames = ['index.html', 'dev.html', 'tracks.html', 'placement.html', 'register.html', 'teacher.html', 'admin.html', 'app.html', 'privacy.html'];
allPortalNames.forEach(file => {
    const fPath = path.join(ROOT_DIR, file);
    const content = fs.readFileSync(fPath, 'utf8');
    assert(content.includes('viewport-fit=cover'), `${file} specifies viewport-fit=cover for notch/safe-area support`);
    assert(content.includes('name="theme-color"'), `${file} declares theme-color for seamless browser integration`);
});

// 6. Service Worker v6.5.0 Architecture
console.log('\n--- 6. Service Worker v6.5.0 Speed & Caching ---');
const swPath = path.join(ROOT_DIR, 'sw.js');
const swContent = fs.readFileSync(swPath, 'utf8');
assert(/CACHE_NAME\s*=\s*'stemos-lxp-v6\.[5-9]\./.test(swContent), 'sw.js uses CACHE_NAME v6.5.0 or newer');
assert(swContent.includes('isSpeedAsset'), 'sw.js identifies high-speed assets for Stale-While-Revalidate');
assert(swContent.includes('caches.match(event.request)'), 'sw.js implements cache matching logic');
assert(swContent.includes('Promise.allSettled'), 'sw.js uses Promise.allSettled for resilient pre-caching');

// Summary
console.log('\n======================================================');
console.log(`Test Execution Completed: ${passedTests} Passed, ${failedTests} Failed.`);
console.log('======================================================\n');

if (failedTests > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
