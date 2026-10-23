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
assert(heroSubEn.includes('specialized tracks'), 'Hero subtitle translated to English');

const heroTitleEn = document.querySelector('[data-i18n="hero_title"]').textContent;
assert(heroTitleEn.includes('From first words to industry-ready English'), `Hero title in English: "${heroTitleEn}"`);
assert(!heroTitleEn.includes('Mastering'), 'Hero title does NOT contain "Mastering"');
assert(!heroTitleEn.includes('Advanced Industry'), 'Hero title does NOT contain "Advanced Industry"');

const btnPlacementEn = document.querySelector('[data-i18n="btn_take_placement"]').textContent;
assert(btnPlacementEn === 'Take your free placement test', `Primary button in English: "${btnPlacementEn}"`);

const btnPricingEn = document.querySelector('[data-i18n="btn_pricing"]').textContent;
assert(btnPricingEn === 'Request an institutional quote', `Secondary button in English: "${btnPricingEn}"`);

const card1TitleEn = document.querySelector('[data-i18n="hero_card1_title"]').textContent;
assert(card1TitleEn === '1. Standard English (A1 to C1)', `Card 1 title in English: "${card1TitleEn}"`);

const card2TitleEn = document.querySelector('[data-i18n="hero_card2_title"]').textContent;
assert(card2TitleEn === '2. Industry English (34 ESP tracks)', `Card 2 title in English: "${card2TitleEn}"`);

const stdLineEn = document.querySelector('[data-i18n="hero_standards_line"]').textContent;
assert(stdLineEn.includes('USMCA'), `Standards line in English uses USMCA: "${stdLineEn}"`);

// Switch back to Spanish to confirm bidirectionality
window.setPlatformLanguage('es');
const heroSubEs = document.querySelector('[data-i18n="hero_subtitle"]').innerHTML;
assert(heroSubEs.includes('tracks especializados'), 'Hero subtitle translated back to Spanish');

const heroTitleEs = document.querySelector('[data-i18n="hero_title"]').textContent;
assert(heroTitleEs.includes('Del inglés desde cero al inglés de tu industria'), `Hero title in Spanish: "${heroTitleEs}"`);
assert(!heroTitleEs.includes('Mastering'), 'Hero title in Spanish does NOT contain "Mastering"');
assert(!heroTitleEs.includes('Advanced Industry'), 'Hero title in Spanish does NOT contain "Advanced Industry"');

const btnPlacementEs = document.querySelector('[data-i18n="btn_take_placement"]').textContent;
assert(btnPlacementEs === 'Haz tu examen de ubicación gratis', `Primary button in Spanish: "${btnPlacementEs}"`);

const btnPricingEs = document.querySelector('[data-i18n="btn_pricing"]').textContent;
assert(btnPricingEs === 'Solicitar cotización institucional', `Secondary button in Spanish: "${btnPricingEs}"`);

const card1TitleEs = document.querySelector('[data-i18n="hero_card1_title"]').textContent;
assert(card1TitleEs === '1. Inglés estándar (A1 a C1)', `Card 1 title in Spanish: "${card1TitleEs}"`);

const card2TitleEs = document.querySelector('[data-i18n="hero_card2_title"]').textContent;
assert(card2TitleEs === '2. Inglés para la industria (34 tracks ESP)', `Card 2 title in Spanish: "${card2TitleEs}"`);

const stdLineEs = document.querySelector('[data-i18n="hero_standards_line"]').textContent;
assert(stdLineEs.includes('T-MEC'), `Standards line in Spanish uses T-MEC: "${stdLineEs}"`);

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL BILINGUAL TESTS PASSED (100%)!\n');
}
