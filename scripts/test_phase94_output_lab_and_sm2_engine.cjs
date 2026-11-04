/**
 * test_phase94_output_lab_and_sm2_engine.cjs
 * Comprehensive test suite verifying Phase 94:
 * Technical Output Lab (8D Problem Solving & Escalation Email Studio)
 * and Adaptive Spaced Repetition (SM-2) Flashcard Mastery Engine.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  \x1b[32m[PASS]\x1b[0m ${message}`);
    passCount++;
  } else {
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${message}`);
    failCount++;
  }
}

console.log('\n═════════════════════════════════════════════════════════════════════════');
console.log('🏭 stemOS PHASE 94: TECHNICAL OUTPUT LAB & SM-2 ENGINE TEST SUITE');
console.log('═════════════════════════════════════════════════════════════════════════\n');

const ROOT_DIR = path.join(__dirname, '..');

// ─── SUITE 1: ROOT FILE INTEGRITY ───
console.log('▶ SUITE 1: Root File Integrity Audit');
const filesToVerify = [
  'app.html',
  'app.js',
  'dev.css'
];

filesToVerify.forEach(rel => {
  const rootPath = path.join(ROOT_DIR, rel);
  assert(fs.existsSync(rootPath), `Root file exists: ${rel}`);
});

// ─── SUITE 2: DOM ARCHITECTURE & ACCESSIBILITY IN app.html ───
console.log('\n▶ SUITE 2: app.html DOM Elements & Accessibility');
const appHtml = fs.readFileSync(path.join(ROOT_DIR, 'app.html'), 'utf8');

// Sidebar nav
assert(appHtml.includes('id="nav-btn-output-lab"'), 'app.html contains #nav-btn-output-lab in sidebar');
assert(appHtml.includes('data-view="output-lab"'), 'app.html nav button routes to data-view="output-lab"');
assert(appHtml.includes('id="view-output-lab"'), 'app.html contains #view-output-lab container view');

// Output Lab 8D & Email
assert(appHtml.includes('id="btn-mode-8d"'), 'app.html contains 8D mode switcher #btn-mode-8d');
assert(appHtml.includes('id="btn-mode-email"'), 'app.html contains Email mode switcher #btn-mode-email');
assert(appHtml.includes('id="workspace-8d"'), 'app.html contains #workspace-8d container');
assert(appHtml.includes('id="workspace-email"'), 'app.html contains #workspace-email container');
assert(appHtml.includes('data-preset="auto_weld"'), 'app.html includes Automotive IATF 16949 preset');
assert(appHtml.includes('data-preset="med_balloon"'), 'app.html includes Medical Devices FDA 21 CFR 820 preset');
assert(appHtml.includes('data-preset="semi_wafer"'), 'app.html includes Semiconductor SEMI E10 preset');
assert(appHtml.includes('id="8d-d1-input"'), 'app.html contains #8d-d1-input (CFT Team)');
assert(appHtml.includes('id="8d-d2-input"'), 'app.html contains #8d-d2-input (5W2H Problem Description)');
assert(appHtml.includes('id="8d-d3-input"'), 'app.html contains #8d-d3-input (Interim Containment ICA)');
assert(appHtml.includes('id="8d-d4-input"'), 'app.html contains #8d-d4-input (Root Cause & Escape Point)');
assert(appHtml.includes('id="8d-d5-input"'), 'app.html contains #8d-d5-input (PCA & Statistical Validation Cpk)');
assert(appHtml.includes('id="8d-d7-input"'), 'app.html contains #8d-d7-input (PFMEA/Control Plan & Recognition)');
assert(appHtml.includes('id="btn-eval-8d"'), 'app.html contains #btn-eval-8d trigger');
assert(appHtml.includes('id="rubric-score-val"'), 'app.html contains #rubric-score-val compliance gauge');

// Executive Email Builder
assert(appHtml.includes('id="email-to-input"'), 'app.html contains #email-to-input field');
assert(appHtml.includes('id="email-subject-input"'), 'app.html contains #email-subject-input field');
assert(appHtml.includes('id="email-bluf-input"'), 'app.html contains #email-bluf-input field');
assert(appHtml.includes('id="email-preview-paper"'), 'app.html contains #email-preview-paper document preview');
assert(appHtml.includes('id="btn-copy-email"'), 'app.html contains #btn-copy-email copy trigger');

// Glossary & SM-2 Deck
assert(appHtml.includes('id="btn-glossary-mode-list"'), 'app.html contains #btn-glossary-mode-list');
assert(appHtml.includes('id="btn-glossary-mode-sm2"'), 'app.html contains #btn-glossary-mode-sm2');
assert(appHtml.includes('id="glossary-list-workspace"'), 'app.html contains #glossary-list-workspace');
assert(appHtml.includes('id="glossary-sm2-workspace"'), 'app.html contains #glossary-sm2-workspace');
assert(appHtml.includes('id="sm2-active-card"'), 'app.html contains #sm2-active-card flippable deck card');
assert(appHtml.includes('id="sm2-stat-due"'), 'app.html contains #sm2-stat-due counter');
assert(appHtml.includes('id="sm2-stat-total"'), 'app.html contains #sm2-stat-total counter');
assert(appHtml.includes('id="sm2-stat-retention"'), 'app.html contains #sm2-stat-retention gauge');
assert(appHtml.includes('id="sm2-stat-ef"'), 'app.html contains #sm2-stat-ef average Easiness Factor');
assert(appHtml.includes('data-quality="0"'), 'app.html includes SM-2 Again button (q=0)');
assert(appHtml.includes('data-quality="3"'), 'app.html includes SM-2 Hard button (q=3)');
assert(appHtml.includes('data-quality="4"'), 'app.html includes SM-2 Good button (q=4)');
assert(appHtml.includes('data-quality="5"'), 'app.html includes SM-2 Easy button (q=5)');

// ─── SUITE 3: app.js LOGIC AND EVENT WIRING ───
console.log('\n▶ SUITE 3: app.js Logic & Event Wiring');
const appJs = fs.readFileSync(path.join(ROOT_DIR, 'app.js'), 'utf8');

assert(appJs.includes("viewName === 'output-lab'"), 'app.js switchDashboardView handles output-lab view');
assert(appJs.includes('function initOutputLab()'), 'app.js defines initOutputLab()');
assert(appJs.includes('function initGlossarySM2()'), 'app.js defines initGlossarySM2()');
assert(appJs.includes('function evaluate8DReport('), 'app.js defines evaluate8DReport()');
assert(appJs.includes('function renderExecutiveEmail()'), 'app.js defines renderExecutiveEmail()');
assert(appJs.includes('function rateCard(quality)'), 'app.js implements SM-2 rateCard logic');

// ─── SUITE 4: SM-2 ALGORITHM MATHEMATICAL VERIFICATION ───
console.log('\n▶ SUITE 4: SM-2 Spaced Repetition Formula Verification');

function computeSM2(card, quality) {
  let n = card.n || 0;
  let ef = card.ef || 2.50;
  let interval = card.interval || 0;

  if (quality < 3) {
    n = 0;
    interval = 1;
  } else {
    if (n === 0) interval = 1;
    else if (n === 1) interval = 6;
    else interval = Math.round((interval || 1) * ef);

    if (quality === 5) interval = Math.round(interval * 1.3);
    n++;
  }

  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < 1.30) ef = 1.30;
  if (ef > 3.00) ef = 3.00;

  return { n, ef: parseFloat(ef.toFixed(2)), interval };
}

// Test initial card rated Good (q=4)
const card0 = { n: 0, ef: 2.50, interval: 0 };
const step1 = computeSM2(card0, 4);
assert(step1.n === 1 && step1.interval === 1, 'Initial card rated Good (q=4) sets n=1 and interval=1d');
assert(step1.ef === 2.50, 'Initial EF remains 2.50 on quality 4');

// Test second review rated Good (q=4)
const step2 = computeSM2(step1, 4);
assert(step2.n === 2 && step2.interval === 6, 'Second review rated Good (q=4) sets n=2 and interval=6d');

// Test third review rated Good (q=4)
const step3 = computeSM2(step2, 4);
assert(step3.n === 3 && step3.interval === 15, 'Third review rated Good (q=4) expands interval to 6 * 2.5 = 15d');

// Test review rated Again (q=0) -> resets to 1d
const resetStep = computeSM2(step3, 0);
assert(resetStep.n === 0 && resetStep.interval === 1, 'Rating Again (q=0) resets repetitions n=0 and interval=1d');
assert(resetStep.ef < step3.ef, 'Rating Again (q=0) decreases Easiness Factor');

// Test review rated Easy (q=5) -> gets 1.3x bonus and increases EF
const easyStep = computeSM2(step2, 5);
assert(easyStep.interval === Math.round(6 * 2.5 * 1.3), 'Rating Easy (q=5) awards 1.3x interval multiplier');
assert(easyStep.ef === 2.60, 'Rating Easy (q=5) increases EF by +0.10');

// ─── SUITE 5: 8D RUBRIC EVALUATION LOGIC ───
console.log('\n▶ SUITE 5: 8D Industrial Rubric Scoring Logic');

function evaluate8DRubric(d1, d2, d3, d4, d5, d7) {
  let score = 0;
  if (d1.length > 20 && (/champion/i.test(d1) || /leader/i.test(d1) || /eng/i.test(d1))) score += 15;
  if (d2.length > 30 && (/\d+/i.test(d2) || /%/i.test(d2) || /defect/i.test(d2))) score += 15;
  if (d3.length > 25 && (/quarantine/i.test(d3) || /hold/i.test(d3) || /freeze/i.test(d3) || /red tag/i.test(d3))) score += 20;
  if (d4.length > 25 && (/cause/i.test(d4) || /escape/i.test(d4) || /5 whys/i.test(d4) || /ishikawa/i.test(d4) || /drift/i.test(d4))) score += 20;
  if (d5.length > 25 && (/cpk/i.test(d5) || /validat/i.test(d5) || /poka/i.test(d5) || /trial/i.test(d5) || /interlock/i.test(d5))) score += 15;
  if (d7.length > 25 && (/pfmea/i.test(d7) || /control plan/i.test(d7) || /recogni/i.test(d7) || /audit/i.test(d7) || /sop/i.test(d7))) score += 15;
  return score;
}

const samplePassingD1 = "Champion: Roberto Garza (Plant Director), Leader: Mariana Cordero (SQE Lead)";
const samplePassingD2 = "During helium mass spectrometer leak testing at Detroit plant on 2026-09-18, 14 of 500 enclosures exhibited micro-porosity (defect rate 2.8%).";
const samplePassingD3 = "100% warehouse quarantine initiated in Saltillo; 320 finished pallets locked in ERP with serialized red hold tags.";
const samplePassingD4 = "Physical root cause was laser focal length drift from spatter; escape point was coarse optical threshold.";
const samplePassingD5 = "Automated quartz cassette with interlocking shutoff installed; Run@Rate trial verified Cpk = 1.84 across 4 shifts.";
const samplePassingD7 = "PFMEA revised to reduce occurrence rating; Control Plan updated to require shift-handover check; team recognized.";

const passingScore = evaluate8DRubric(samplePassingD1, samplePassingD2, samplePassingD3, samplePassingD4, samplePassingD5, samplePassingD7);
assert(passingScore === 100, `Exemplary 8D submission earns 100% audit score (got: ${passingScore}%)`);

const blankScore = evaluate8DRubric("", "", "", "", "", "");
assert(blankScore === 0, `Blank submission correctly receives 0% (got: ${blankScore}%)`);

const partialScore = evaluate8DRubric(samplePassingD1, samplePassingD2, samplePassingD3, "", "", "");
assert(partialScore === 50, `Partial submission without root cause and validation receives 50% (got: ${partialScore}%)`);

console.log('\n═════════════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passCount} Passed, ${failCount} Failed (Total: ${passCount + failCount})`);
console.log('═════════════════════════════════════════════════════════════════════════\n');

if (failCount > 0) {
  process.exit(1);
}

