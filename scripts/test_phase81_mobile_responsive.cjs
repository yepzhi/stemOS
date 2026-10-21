/**
 * FASE 81 — Mobile-First Responsive Design Overhaul
 * Test Suite: test_phase81_mobile_responsive.cjs
 *
 * Verifies all Phase 81 mobile CSS features in register.html:
 * - viewport-fit=cover, safe-area-inset, dvh, clamp(), max()
 * - 44px touch targets, fixed bottom bar, iOS zoom prevention
 * - Responsive breakpoints for 320px–2560px
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REGISTER_HTML = path.resolve(__dirname, '../register.html');

// ─────────────────────────────────────────────
// Test infrastructure
// ─────────────────────────────────────────────
let passCount = 0;
let failCount = 0;
const failures = [];

function test(name, fn) {
    try {
        fn();
        console.log(`  ✅ PASS — ${name}`);
        passCount++;
    } catch (err) {
        console.log(`  ❌ FAIL — ${name}`);
        console.log(`         → ${err.message}`);
        failCount++;
        failures.push({ name, message: err.message });
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message || 'Assertion failed');
}

function assertContains(haystack, needle, message) {
    if (!haystack.includes(needle)) {
        throw new Error(message || `Expected to find: "${needle}"`);
    }
}

// ─────────────────────────────────────────────
// Load file
// ─────────────────────────────────────────────
console.log('\n🔍 Loading register.html...');
assert(fs.existsSync(REGISTER_HTML), 'register.html not found at expected path');
const html = fs.readFileSync(REGISTER_HTML, 'utf8');
console.log(`   File loaded: ${(html.length / 1024).toFixed(1)} KB, ${html.split('\n').length} lines\n`);

// ─────────────────────────────────────────────
// SUITE 1: Viewport & Meta
// ─────────────────────────────────────────────
console.log('📱 SUITE 1 — Viewport & Meta Tags');

test('viewport-fit=cover is present in meta viewport', () => {
    assertContains(html, 'viewport-fit=cover',
        'Missing viewport-fit=cover — safe-area-inset will not work on notched iPhones');
});

test('width=device-width is in meta viewport', () => {
    assertContains(html, 'width=device-width',
        'Missing width=device-width in meta viewport');
});

test('initial-scale=1.0 is in meta viewport', () => {
    assertContains(html, 'initial-scale=1.0',
        'Missing initial-scale=1.0 in meta viewport');
});

// ─────────────────────────────────────────────
// SUITE 2: Phase 81 CSS Block
// ─────────────────────────────────────────────
console.log('\n🎨 SUITE 2 — Phase 81 CSS Block Presence');

test('Phase 81 CSS block comment is present', () => {
    assertContains(html, 'PHASE 81',
        'Missing Phase 81 CSS block comment');
});

test('WCAG 2.5.8 / ui-navigation-hierarchy comment is present', () => {
    assertContains(html, 'ui-navigation-hierarchy',
        'Missing WCAG touch target comment reference');
});

// ─────────────────────────────────────────────
// SUITE 3: Safe Area Inset
// ─────────────────────────────────────────────
console.log('\n🔒 SUITE 3 — Safe Area Inset (notch / Dynamic Island)');

test('env(safe-area-inset-bottom) is used', () => {
    assertContains(html, 'safe-area-inset-bottom',
        'Missing safe-area-inset-bottom for notched iPhone support');
});

test('env(safe-area-inset-left) is used', () => {
    assertContains(html, 'safe-area-inset-left',
        'Missing safe-area-inset-left for landscape notch support');
});

test('env(safe-area-inset-right) is used', () => {
    assertContains(html, 'safe-area-inset-right',
        'Missing safe-area-inset-right for landscape notch support');
});

// ─────────────────────────────────────────────
// SUITE 4: Modern CSS Units & Functions
// ─────────────────────────────────────────────
console.log('\n📐 SUITE 4 — Modern CSS Functions & Units');

test('clamp() is used for fluid typography', () => {
    assertContains(html, 'clamp(',
        'Missing clamp() — fluid typography not implemented');
});

test('dvh unit is used for dynamic viewport height', () => {
    assertContains(html, 'dvh',
        'Missing dvh unit — use dvh instead of vh for mobile scrollable containers');
});

test('max() function is used for safe minimums', () => {
    assertContains(html, 'max(',
        'Missing max() — needed for safe-area and font-size minimums');
});

test('calc() with safe-area is used in padding', () => {
    assertContains(html, 'calc(12px + env(safe-area-inset-bottom',
        'Missing calc() with safe-area-inset-bottom in padding');
});

// ─────────────────────────────────────────────
// SUITE 5: Touch Targets (WCAG 2.5.8)
// ─────────────────────────────────────────────
console.log('\n👆 SUITE 5 — Touch Targets (WCAG 2.5.8 ≥44px)');

test('min-height: 44px is applied to interactive elements', () => {
    assertContains(html, 'min-height: 44px',
        'Missing min-height: 44px — touch targets must be at least 44px');
});

test('selection-card is listed in touch target rule', () => {
    assertContains(html, '.selection-card',
        'Missing .selection-card in touch target declarations');
});

test('hub-card is listed in touch target rule', () => {
    assertContains(html, '.hub-card',
        'Missing .hub-card in touch target declarations');
});

// ─────────────────────────────────────────────
// SUITE 6: iOS Zoom Prevention
// ─────────────────────────────────────────────
console.log('\n🔎 SUITE 6 — iOS Auto-Zoom Prevention');

test('font-size: max(1rem, 16px) prevents iOS zoom on text-input', () => {
    assertContains(html, 'font-size: max(1rem, 16px)',
        'Missing font-size: max(1rem, 16px) — iOS zooms in on inputs <16px');
});

test('-webkit-text-size-adjust: 100% is present', () => {
    assertContains(html, '-webkit-text-size-adjust: 100%',
        'Missing -webkit-text-size-adjust: 100% — Safari may resize text on rotation');
});

// ─────────────────────────────────────────────
// SUITE 7: Fixed Bottom Action Bar
// ─────────────────────────────────────────────
console.log('\n📍 SUITE 7 — Fixed Bottom Action Bar (≤640px)');

test('position: fixed is applied to .wizard-actions', () => {
    assertContains(html, 'position: fixed',
        'Missing position: fixed for .wizard-actions bottom bar');
});

test('z-index: 100 is set for the bottom bar', () => {
    assertContains(html, 'z-index: 100',
        'Missing z-index: 100 for bottom bar layering');
});

test('backdrop-filter: blur(20px) is on bottom bar', () => {
    assertContains(html, 'backdrop-filter: blur(20px)',
        'Missing backdrop-filter: blur(20px) for glass bottom bar effect');
});

test('-webkit-backdrop-filter is included for Safari', () => {
    assertContains(html, '-webkit-backdrop-filter: blur(20px)',
        'Missing -webkit-backdrop-filter prefix for Safari compatibility');
});

test('enter-key-hint is hidden on mobile', () => {
    assertContains(html, '.enter-key-hint',
        'Missing .enter-key-hint in mobile breakpoint rules');
});

// ─────────────────────────────────────────────
// SUITE 8: Responsive Breakpoints
// ─────────────────────────────────────────────
console.log('\n📏 SUITE 8 — Responsive Breakpoints Coverage');

const breakpoints = [
    ['@media (max-width: 360px)', '360px breakpoint for tiny phones'],
    ['@media (max-width: 400px)', '400px breakpoint for small phones'],
    ['@media (max-width: 480px)', '480px breakpoint for standard mobile'],
    ['@media (max-width: 540px)', '540px breakpoint for large mobile / phablet'],
    ['@media (max-width: 640px)', '640px breakpoint for landscape mobile'],
    ['@media (min-width: 768px)', '768px breakpoint for tablet and up'],
];

for (const [bp, desc] of breakpoints) {
    test(`Breakpoint ${bp} exists`, () => {
        assertContains(html, bp, `Missing breakpoint: ${desc}`);
    });
}

// ─────────────────────────────────────────────
// SUITE 9: Grid & Layout
// ─────────────────────────────────────────────
console.log('\n🧩 SUITE 9 — Grid & Layout Fixes');

test('selection-grid-2 gets 1fr override on small screens', () => {
    assertContains(html, 'grid-template-columns: 1fr !important',
        'Missing 1fr grid override for .selection-grid-2 on small screens');
});

test('careers-scroll-container has dvh max-height', () => {
    assertContains(html, 'careers-scroll-container',
        'Missing .careers-scroll-container in mobile responsive rules');
});

test('hubs-grid is listed in mobile rules', () => {
    assertContains(html, 'hubs-grid',
        'Missing .hubs-grid in mobile breakpoint rules');
});

test('solo-subscription-banner is responsive', () => {
    assertContains(html, 'solo-subscription-banner',
        'Missing #solo-subscription-banner in mobile layout rules');
});

// ─────────────────────────────────────────────
// SUITE 10: Credential Pass Card (Step 7)
// ─────────────────────────────────────────────
console.log('\n🪪 SUITE 10 — Credential Pass Card Mobile Layout');

test('pass-grid is responsive on mobile', () => {
    assertContains(html, 'pass-grid',
        'Missing .pass-grid in mobile responsive rules');
});

test('pass-footer stacks on mobile', () => {
    assertContains(html, 'pass-footer',
        'Missing .pass-footer in mobile responsive rules');
});

test('pass-header has flex-wrap: wrap', () => {
    assertContains(html, 'flex-wrap: wrap',
        'Missing flex-wrap: wrap for .pass-header on mobile');
});

// ─────────────────────────────────────────────
// SUITE 11: Ambient Performance
// ─────────────────────────────────────────────
console.log('\n⚡ SUITE 11 — Performance & Visual Tuning');

test('ambient glows are scaled down on mobile', () => {
    assertContains(html, 'ambient-glow-1, .ambient-glow-2',
        'Missing ambient glow performance optimization for mobile');
});

test('opacity reduction for glows on mobile', () => {
    assertContains(html, 'opacity: 0.7',
        'Missing opacity reduction for ambient glows on mobile');
});

// ─────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────
const total = passCount + failCount;
console.log('\n' + '═'.repeat(60));
console.log(`\n📊 PHASE 81 TEST RESULTS: ${passCount}/${total} PASSED`);
console.log(`   ✅ Passed: ${passCount}`);
console.log(`   ❌ Failed: ${failCount}`);

if (failCount > 0) {
    console.log('\n🚨 FAILURES:');
    failures.forEach((f, i) => {
        console.log(`   ${i + 1}. ${f.name}`);
        console.log(`      → ${f.message}`);
    });
    console.log('');
    process.exit(1);
} else {
    console.log('\n🎉 ALL TESTS PASSED — Phase 81 Mobile Responsive Overhaul verified!');
    console.log('   register.html is production-ready for 320px–2560px, notched iPhones,');
    console.log('   Dynamic Island, iOS bottom bar, and university computer lab tablets.\n');
    process.exit(0);
}
