/**
 * stemOS — Verification Test for CACEI 2026 Executive Proposal & Agreement Dossier Generator (Fase 72)
 * Validates:
 * 1. Admin Portal view-reports contains #btn-open-proposal-modal.
 * 2. #modal-cacei-proposal exists with complete institutional form controls.
 * 3. #print-cacei-proposal-document exists with CACEI Criterio 4, 25 careers, and 240h MCER.
 * 4. Zero occurrences of "Mario" in proposal templates.
 * 5. Controller functions openCaceiProposalModal and printCaceiProposal defined.
 * 6. Bit-for-bit parity between admin.html and dev/admin.html.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { JSDOM } = require('jsdom');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('📜 stemOS CACEI 2026 Executive Proposal & Agreement Generator Audit');
console.log('═══════════════════════════════════════════════════════════════════\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
    failed++;
  }
}

const ROOT_DIR = path.resolve(__dirname, '..');
const adminPath = path.join(ROOT_DIR, 'admin.html');
const devAdminPath = path.join(ROOT_DIR, 'dev', 'admin.html');

// ── 1. Parity Check ──
console.log('▶ 1. File Parity Check (admin.html === dev/admin.html)');
test('100% bit-for-bit parity between admin.html and dev/admin.html', () => {
  const rootContent = fs.readFileSync(adminPath, 'utf8');
  const devContent = fs.readFileSync(devAdminPath, 'utf8');
  assert.strictEqual(rootContent, devContent, 'admin.html and dev/admin.html must be identical');
});

// ── 2. DOM & Modal Audit ──
console.log('\n▶ 2. DOM Elements & Modal Integrity in admin.html');
const adminHtml = fs.readFileSync(adminPath, 'utf8');
const dom = new JSDOM(adminHtml, { runScripts: "outside-only" });
const doc = dom.window.document;

test('Card trigger button #btn-open-proposal-modal exists in view-reports', () => {
  const btn = doc.getElementById('btn-open-proposal-modal');
  assert(!!btn, 'Missing #btn-open-proposal-modal');
  assert(btn.textContent.includes('Generate Proposal PDF'), 'Button must state "Generate Proposal PDF"');
});

test('#modal-cacei-proposal dialog exists with complete form controls', () => {
  const modal = doc.getElementById('modal-cacei-proposal');
  assert(!!modal, 'Missing #modal-cacei-proposal');
  assert(!!doc.getElementById('prop-inst-name'), 'Missing #prop-inst-name input');
  assert(!!doc.getElementById('prop-rector-name'), 'Missing #prop-rector-name input');
  assert(!!doc.getElementById('prop-students-count'), 'Missing #prop-students-count input');
  assert(!!doc.getElementById('prop-plan-select'), 'Missing #prop-plan-select dropdown');
  assert(!!doc.getElementById('prop-include-edge'), 'Missing #prop-include-edge checkbox');
});

test('Plan select includes both Piloto Cuatrimestral ($95,000) and Licencia Anual ($240,000)', () => {
  const planSel = doc.getElementById('prop-plan-select');
  assert(planSel.innerHTML.includes('95,000'), 'Must offer $95,000 MXN Pilot option');
  assert(planSel.innerHTML.includes('240,000'), 'Must offer $240,000 MXN Annual option');
});

// ── 3. Printable Proposal Document Audit ──
console.log('\n▶ 3. Printable CACEI 2026 Proposal Document Audit');
test('#print-cacei-proposal-document printable container exists', () => {
  const printDoc = doc.getElementById('print-cacei-proposal-document');
  assert(!!printDoc, 'Missing #print-cacei-proposal-document');
});

test('Printable proposal includes all required dynamic placeholders', () => {
  const requiredPlaceholders = [
    'proposal-print-folio',
    'proposal-print-date',
    'proposal-print-institution',
    'proposal-print-rector',
    'proposal-print-plan',
    'proposal-print-amount',
    'proposal-print-amount-table',
    'proposal-print-terms',
    'proposal-print-students',
    'proposal-print-per-student',
    'proposal-print-edge',
    'proposal-print-rector-signature',
    'proposal-print-inst-signature'
  ];

  requiredPlaceholders.forEach(id => {
    assert(!!doc.getElementById(id), `Missing placeholder #${id} in printable proposal`);
  });
});

test('Proposal explicitly aligns with CACEI Criterio 4, 25 Careers & 240h MCER', () => {
  const printDoc = doc.getElementById('print-cacei-proposal-document');
  const text = printDoc.textContent;
  assert(text.includes('CACEI'), 'Must cite CACEI accreditation');
  assert(text.includes('Criterio 4'), 'Must cite Criterio 4');
  assert(text.includes('25 Carreras'), 'Must cite 25 Carreras');
  assert(text.includes('240 horas') || text.includes('240-Hour'), 'Must cite 240 hours MCER');
  assert(text.includes('Cero Costo') || text.includes('cero costo'), 'Must guarantee zero student cost');
});

test('Proposal guarantees strictly ZERO occurrences of "Mario"', () => {
  const printDoc = doc.getElementById('print-cacei-proposal-document');
  assert(!printDoc.textContent.includes('Mario'), 'Strictly ZERO occurrences of "Mario" allowed');
});

// ── 4. Controller Functions & CSS Rules Audit ──
console.log('\n▶ 4. Controller Functions & Styling Audit');
test('admin.html defines openCaceiProposalModal and printCaceiProposal', () => {
  assert(adminHtml.includes('function openCaceiProposalModal'), 'Missing openCaceiProposalModal definition');
  assert(adminHtml.includes('function printCaceiProposal'), 'Missing printCaceiProposal definition');
  assert(adminHtml.includes('window.openCaceiProposalModal = openCaceiProposalModal'), 'openCaceiProposalModal must be exposed on window');
  assert(adminHtml.includes('window.printCaceiProposal = printCaceiProposal'), 'printCaceiProposal must be exposed on window');
});

test('admin.html handleRouting supports #proposal and action=proposal', () => {
  assert(adminHtml.includes("hash === 'proposal'"), 'handleRouting must handle #proposal');
  assert(adminHtml.includes("action=proposal"), 'handleRouting must handle action=proposal query');
});

test('@media print CSS includes body.printing-cacei-proposal rules', () => {
  assert(adminHtml.includes('body.printing-cacei-proposal #print-cacei-proposal-document'), 'Missing print display rule for #print-cacei-proposal-document');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL CACEI PROPOSAL & AGREEMENT GENERATOR TESTS PASSED (100%)!\n');
}
