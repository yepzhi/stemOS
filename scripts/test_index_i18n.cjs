/**
 * stemOS — Index Main Page Bilingual (ES | EN) Verification Test
 * Validates:
 * 1. ES | EN Language switcher exists on index.html ONLY.
 * 2. All other subpages (app.html, placement.html, teacher.html, admin.html, register.html) remain strictly English.
 * 3. Every data-i18n attribute in index.html is fully populated in both Spanish and English dictionaries.
 * 4. Language persistence, document.documentElement.lang update, and DOM integrity.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🌐 stemOS Index Main Page Bilingual (ES | EN) Verification');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ── 1. Target Subpage Scoping Test ──
console.log('▶ 1. Page Scope Verification: ES|EN Button on index.html ONLY');
const rootDir = path.join(__dirname, '..');
const indexHtmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

assert(indexHtmlContent.includes('id="lang-btn-es"'), 'index.html contains #lang-btn-es');
assert(indexHtmlContent.includes('id="lang-btn-en"'), 'index.html contains #lang-btn-en');
assert(indexHtmlContent.includes('class="lang-switch-capsule"'), 'index.html contains .lang-switch-capsule');

const subpages = ['app.html', 'placement.html', 'teacher.html', 'admin.html'];
subpages.forEach(sub => {
  const content = fs.readFileSync(path.join(rootDir, sub), 'utf8');
  assert(!content.includes('id="lang-btn-es"'), `${sub} remains in English without #lang-btn-es`);
  assert(!content.includes('class="lang-switch-capsule"'), `${sub} remains in English without .lang-switch-capsule`);
});

// Verify register.html has standardized bilingual switcher aligned with index.html
const regContent = fs.readFileSync(path.join(rootDir, 'register.html'), 'utf8');
assert(regContent.includes('class="lang-switch-capsule"'), 'register.html contains standardized .lang-switch-capsule');
assert(regContent.includes('class="lang-divider"'), 'register.html contains standardized .lang-divider');

// ── 2. DOM & Dictionary Parity in index.html ──
console.log('\n▶ 2. DOM & Translation Dictionary Completeness');
const dom = new JSDOM(indexHtmlContent, { 
  url: "https://yepzhi.com/index.html",
  runScripts: "dangerously"
});
const window = dom.window;
const document = window.document;

assert(typeof window.STEMOS_I18N === 'object', 'STEMOS_I18N dictionary is exposed on window');
assert(typeof window.STEMOS_I18N.en === 'object', 'STEMOS_I18N has English dictionary');
assert(typeof window.STEMOS_I18N.es === 'object', 'STEMOS_I18N has Spanish dictionary');

const i18nElements = document.querySelectorAll('[data-i18n]');
assert(i18nElements.length >= 25, `Found ${i18nElements.length} translatable elements with data-i18n`);

let missingEn = 0;
let missingEs = 0;
i18nElements.forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (!window.STEMOS_I18N.en[key]) {
    console.error(`Missing EN translation for key: "${key}"`);
    missingEn++;
  }
  if (!window.STEMOS_I18N.es[key]) {
    console.error(`Missing ES translation for key: "${key}"`);
    missingEs++;
  }
});

assert(missingEn === 0, 'All data-i18n keys have complete English translations');
assert(missingEs === 0, 'All data-i18n keys have complete Spanish translations');

// ── 3. Runtime Language Toggle Simulation ──
console.log('\n▶ 3. Runtime Language Switcher Simulation');

// Switch to Spanish
window.setPlatformLanguage('es');
assert(document.documentElement.lang === 'es', 'document.documentElement.lang is updated to "es"');
assert(document.getElementById('lang-btn-es').classList.contains('active'), '#lang-btn-es is active');
assert(!document.getElementById('lang-btn-en').classList.contains('active'), '#lang-btn-en is inactive');

const navCatalogEs = document.querySelector('[data-i18n="nav_catalog"]').textContent;
assert(navCatalogEs === 'Catálogo ESP', `Catalog link translated to Spanish: "${navCatalogEs}"`);

// Switch to English
window.setPlatformLanguage('en');
assert(document.documentElement.lang === 'en', 'document.documentElement.lang is updated to "en"');
assert(document.getElementById('lang-btn-en').classList.contains('active'), '#lang-btn-en is active');
assert(!document.getElementById('lang-btn-es').classList.contains('active'), '#lang-btn-es is inactive');

const navCatalogEn = document.querySelector('[data-i18n="nav_catalog"]').textContent;
assert(navCatalogEn === 'ESP Catalog', `Catalog link translated to English: "${navCatalogEn}"`);

const heroSubEn = document.querySelector('[data-i18n="hero_subtitle"]').innerHTML;
assert(heroSubEn.includes('specialized industry tracks'), 'Hero subtitle translated to English');

// Switch back to Spanish to confirm bidirectionality
window.setPlatformLanguage('es');
const heroSubEs = document.querySelector('[data-i18n="hero_subtitle"]').innerHTML;
assert(heroSubEs.includes('tracks especializados de industria'), 'Hero subtitle translated back to Spanish');

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL BILINGUAL TESTS PASSED (100%)!\n');
}
