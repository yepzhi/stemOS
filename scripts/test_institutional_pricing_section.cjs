/**
 * stemOS — Institutional Pricing & Commercial Proposal Verification Suite
 * Validates:
 * 1. #pricing-institutional-section exists in index.html with all 3 university options.
 * 2. Executive memorandum (Mario proposal context, 1500 students, zero student cost, flat university invoice).
 * 3. All pricing figures and inclusions:
 *    - Opción 1: $95,000 MXN + IVA / cuatrimestre (~$63 pesos/alumno, campus + casa/móvil).
 *    - Opción 2: $240,000 MXN + IVA / 3 cuatrimestres ($80,000/cuatrimestre, precio congelado, soporte docente).
 *    - Opción 3: $1,000 MXN + IVA por equipo / cuatrimestre (ej. 80 equipos = $80,000 MXN).
 * 4. Interactive equipment calculator & "¿Cuántos equipos tienen entre todos sus laboratorios?".
 * 5. Direct CTAs: WhatsApp button, Zoom 15-min demo modal, and official email.
 * 6. Preview banner linking to tracks.html.
 * 7. Dedicated tracks.html tab page integrity with 34 tracks and industrial simulation crucibles.
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
assert(memoQuote.textContent.includes('Mario, gracias por la confianza'), 'Contains "Mario, gracias por la confianza"');
assert(memoQuote.textContent.includes('1,500 alumnos'), 'References ≈1,500 students cohort');
assert(memoQuote.textContent.includes('sin compra de libros'), 'Specifies zero book purchase requirement');
assert(memoQuote.textContent.includes('licencia institucional plana'), 'Specifies flat institutional license');
assert(memoQuote.textContent.includes('cero cobro a los alumnos'), 'Guarantees zero cost to students');
assert(memoQuote.textContent.includes('panel para que los docentes de inglés'), 'Includes faculty practice dashboard');

// ── 3. Three Pricing Options Verification ──
console.log('\n▶ 3. Individual Plan & University Options Audit (4 Cards Total)');
const cards = pricingSec.querySelectorAll('.pricing-card');
assert(cards.length === 4, `Found exactly 4 pricing option cards (Found: ${cards.length})`);

// Individual Plan Card
const indCard = pricingSec.querySelector('.pricing-card.individual-plan');
assert(!!indCard, 'Individual Student Plan card present');
const indText = indCard.textContent;
assert(indText.includes('Estudiante Individual'), 'Individual Plan: Estudiante Individual title present');
assert(indText.includes('49'), 'Individual Plan: $49 MXN price present');
assert(indText.includes('Todos los beneficios incluidos'), 'Individual Plan: All benefits included badge present');
assert(indText.includes('Suscribirme por $49/mes'), 'Individual Plan: Subscribe CTA button present');

// Option 1
const op1Text = cards[1].textContent;
assert(op1Text.includes('Piloto Cuatrimestral'), 'Option 1: Piloto Cuatrimestral title present');
assert(op1Text.includes('95,000'), 'Option 1: $95,000 MXN price present');
assert(op1Text.includes('63'), 'Option 1: ~$63 pesos per student metric present');
assert(op1Text.includes('casa o celular'), 'Option 1: Mobile/remote access included');

// Option 2
const op2Text = cards[2].textContent;
assert(op2Text.includes('Licencia Anual de Campus'), 'Option 2: Licencia Anual title present');
assert(op2Text.includes('240,000'), 'Option 2: $240,000 MXN price present');
assert(op2Text.includes('80,000'), 'Option 2: ($80,000 por cuatrimestre) rate present');
assert(op2Text.includes('precio congelado') || op2Text.includes('Precio congelado'), 'Option 2: Locked price feature present');
assert(op2Text.includes('soporte técnico docente') || op2Text.includes('Soporte técnico y pedagógico'), 'Option 2: Faculty support included');

// Option 3
const op3Text = cards[3].textContent;
assert(op3Text.includes('Solo Laboratorio'), 'Option 3: Solo Laboratorio title present');
assert(op3Text.includes('1,000'), 'Option 3: $1,000 MXN per computer rate present');
assert(op3Text.includes('80 computadoras = $80,000'), 'Option 3: Example 80 computers calculation present');
assert(op3Text.includes('distintos turnos'), 'Option 3: Covers all rotating shifts');

// ── 4. Interactive Lab Calculator & Zoom Scheduling Hub ──
console.log('\n▶ 4. Interactive Calculator & Direct Action CTAs');
const hubTitle = pricingSec.querySelector('.pricing-hub-title');
assert(hubTitle && hubTitle.textContent.includes('¿Cuántos equipos tienen entre todos sus laboratorios?'), 
  'Hub title contains "¿Cuántos equipos tienen entre todos sus laboratorios?"');

const hubDesc = pricingSec.querySelector('.pricing-hub-desc');
assert(hubDesc && hubDesc.textContent.includes('15 min por Zoom'), 
  'Hub description proposes 15-min Zoom walkthrough');

const slider = document.getElementById('slider-lab-equipos');
const numInput = document.getElementById('input-lab-equipos');
assert(!!slider, 'Lab equipment range slider exists');
assert(!!numInput, 'Lab equipment number input exists');

// Simulate calculator runtime
assert(typeof window.updateLabCalc === 'function', 'window.updateLabCalc function exists');
window.updateLabCalc(100);
const calcResult = document.getElementById('calc-val-op3').textContent;
assert(calcResult.includes('100,000'), `Calculator correctly computes 100 equipments = $100,000 MXN (Result: ${calcResult})`);

// ── 5. WhatsApp & Zoom CTAs ──
console.log('\n▶ 5. Conversion Action Triggers');
const waBtn = pricingSec.querySelector('a[href*="wa.me"]');
assert(!!waBtn, 'Direct WhatsApp button with wa.me link exists');
assert(waBtn.getAttribute('href').includes('Mario'), 'WhatsApp link contains prefilled proposal message for Mario');

const zoomBtn = pricingSec.querySelector('.btn-hub-zoom');
assert(!!zoomBtn, 'Zoom 15-minute demo booking button exists');

const zoomModal = document.getElementById('stemos-zoom-modal');
assert(!!zoomModal, '#stemos-zoom-modal scheduling dialog exists');

// ── 6. Preview Banner & tracks.html Tab Integrity ──
console.log('\n▶ 6. Catalog Callout Banner & tracks.html Tab');
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
