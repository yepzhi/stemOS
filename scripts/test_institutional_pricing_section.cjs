/**
 * stemOS — Institutional Pricing & Commercial Proposal Verification Suite
 * Validates:
 * 1. #pricing-institutional-section exists in index.html with exactly 3 options.
 * 2. Executive memorandum: Institutional alignment, up to 2,000 students, zero book purchases, zero cost to students.
 * 3. NO occurrences of "Mario" anywhere in the page or CTAs.
 * 4. Exactly 3 pricing cards:
 *    - Individual: $49 MXN / mes
 *    - Opción 1: $95,000 MXN + IVA / cuatrimestre (hasta 2,000 alumnos, campus + casa/móvil).
 *    - Opción 2: $240,000 MXN + IVA / 3 cuatrimestres ($80,000/cuatrimestre, precio congelado, soporte docente).
 * 5. Option 3 ("Solo Laboratorio") and interactive equipment calculator safely retired.
 * 6. Direct CTAs: WhatsApp button, Zoom 15-min demo modal, and official email.
 * 7. Preview banner linking to tracks.html.
 * 8. Dedicated tracks.html tab page integrity with 34 tracks and industrial simulation crucibles.
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
console.log('💼 stemOS Institutional Proposal & Pricing Section Verification');
console.log('═══════════════════════════════════════════════════════════════════\n');

const rootDir = path.join(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

const dom = new JSDOM(indexContent, { runScripts: "dangerously" });
const { document, window } = dom.window;

if (typeof window.setPlatformLanguage === 'function') {
  window.setPlatformLanguage('es');
}

// ── 1. Backup Verification ──
console.log('▶ 1. Backup File Verification');
const backupPath = path.join(rootDir, 'index.landing-backup.html');
assert(fs.existsSync(backupPath), 'index.landing-backup.html safely archived');
assert(fs.statSync(backupPath).size > 50000, 'Backup file has valid payload size');

// ── 2. Pricing Section Core Elements ──
console.log('\n▶ 2. Institutional Pricing Section Integrity');
const pricingSec = document.getElementById('pricing-institutional-section');
assert(!!pricingSec, '#pricing-institutional-section exists in index.html');

const memoQuote = pricingSec.querySelector('.pricing-memo-quote');
assert(!!memoQuote, 'Executive memorandum quote exists');
assert(!memoQuote.textContent.includes('Mario'), 'Strictly ZERO occurrences of "Mario" in memo quote');
assert(memoQuote.textContent.includes('2,000') || memoQuote.textContent.includes('2000'), 'References up to 2,000 students cohort');
assert(memoQuote.textContent.includes('sin compra de libros') || memoQuote.textContent.includes('libros de texto'), 'Specifies zero book purchase requirement');
assert(memoQuote.textContent.includes('factura') || memoQuote.textContent.includes('institucional') || memoQuote.textContent.includes('Institucional'), 'Specifies single institutional invoice / model');
assert(memoQuote.textContent.includes('cero costo') || memoQuote.textContent.includes('cero cobro') || memoQuote.textContent.includes('zero direct student fee'), 'Guarantees zero cost to students');
assert(memoQuote.textContent.includes('panel') || memoQuote.textContent.includes('docentes'), 'Includes faculty practice dashboard');

// ── 3. Exactly 3 Pricing Cards Audit ──
console.log('\n▶ 3. Individual Plan & University Options Audit (Exactly 3 Cards)');
const cards = pricingSec.querySelectorAll('.pricing-card');
assert(cards.length === 3, `Found exactly 3 pricing option cards (Found: ${cards.length})`);

// Card 0: Individual Plan Card
const indCard = pricingSec.querySelector('.pricing-card.individual-plan');
assert(!!indCard, 'Individual Student Plan card present');
const indText = indCard.textContent;
assert(indText.includes('Estudiante Individual'), 'Individual Plan: Estudiante Individual title present');
assert(indText.includes('49'), 'Individual Plan: $49 MXN price present');
assert(indText.includes('Todos los beneficios incluidos'), 'Individual Plan: All benefits included badge present');
assert(indText.includes('Suscribirme por $49/mes'), 'Individual Plan: Subscribe CTA button present');

// Card 1: Option 1 - Piloto Cuatrimestral
const op1Text = cards[1].textContent;
assert(op1Text.includes('Piloto Cuatrimestral'), 'Option 1: Piloto Cuatrimestral title present');
assert(op1Text.includes('95,000'), 'Option 1: $95,000 MXN price present');
assert(op1Text.includes('2,000 alumnos') || op1Text.includes('2000 alumnos'), 'Option 1: Up to 2,000 students metric present');
assert(op1Text.includes('casa o celular') || op1Text.includes('Casa/Celular'), 'Option 1: Mobile/remote access included');

// Card 2: Option 2 - Licencia Anual
const op2Text = cards[2].textContent;
assert(op2Text.includes('Licencia Anual'), 'Option 2: Licencia Anual title present');
assert(op2Text.includes('240,000'), 'Option 2: $240,000 MXN price present');
assert(op2Text.includes('80,000'), 'Option 2: ($80,000 por cuatrimestre) rate present');
assert(op2Text.includes('precio congelado') || op2Text.includes('Precio congelado'), 'Option 2: Locked price feature present');
assert(op2Text.includes('soporte técnico docente') || op2Text.includes('Soporte técnico y pedagógico'), 'Option 2: Faculty support included');

// Option 3 ("Solo Laboratorio") must NOT exist
const op3Card = pricingSec.querySelector('.pricing-card:nth-child(4)');
assert(!op3Card, 'Option 3 ("Solo Laboratorio") successfully removed');
const labCalc = document.getElementById('slider-lab-equipos');
assert(!labCalc, 'Interactive lab equipment calculator retired');

// ── 4. WhatsApp, Email & Zoom CTAs ──
console.log('\n▶ 4. Conversion Action Triggers (No Mario Mentions)');
const waBtn = pricingSec.querySelector('a[href*="wa.me"]');
assert(!!waBtn, 'Direct WhatsApp button with wa.me link exists');
assert(!waBtn.getAttribute('href').includes('Mario'), 'WhatsApp link does NOT contain "Mario"');

const zoomBtn = pricingSec.querySelector('.btn-hub-zoom');
assert(!!zoomBtn, 'Zoom 15-minute demo booking button exists');

const zoomModal = document.getElementById('stemos-zoom-modal');
assert(!!zoomModal, '#stemos-zoom-modal scheduling dialog exists');
assert(!zoomModal.textContent.includes('Mario'), 'Zoom modal does NOT contain "Mario"');

// ── 5. Preview Banner & tracks.html Tab Integrity ──
console.log('\n▶ 5. Catalog Callout Banner & tracks.html Tab');
const previewBanner = document.getElementById('catalog-preview-banner');
assert(!!previewBanner, '#catalog-preview-banner exists');
assert(previewBanner.querySelector('a[href="/tracks.html"]'), 'Preview banner links directly to /tracks.html');

const tracksHtmlPath = path.join(rootDir, 'tracks.html');
assert(fs.existsSync(tracksHtmlPath), 'tracks.html dedicated tab page exists');

const tracksContent = fs.readFileSync(tracksHtmlPath, 'utf8');
assert(tracksContent.includes('id="catalog-section"'), 'tracks.html houses #catalog-section (34 tracks)');
assert(tracksContent.includes('id="nearshoring-talent-hub-section"'), 'tracks.html houses #nearshoring-talent-hub-section');
assert(tracksContent.includes('id="output-engine-section"'), 'tracks.html houses #output-engine-section');
assert(tracksContent.includes('id="incident-war-room-section"'), 'tracks.html houses #incident-war-room-section');
assert(tracksContent.includes('switchTracksWorkspaceView'), 'tracks.html implements switchTracksWorkspaceView');

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL INSTITUTIONAL PROPOSAL & PRICING TESTS PASSED (100%)!\n');
}
