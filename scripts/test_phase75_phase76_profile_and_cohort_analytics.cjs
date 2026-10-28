/**
 * ==============================================================================
 * stemOS Verification Suite: Fases 75 & 76
 * Fase 75: Pasaporte Diagnóstico y Credenciales Académicas en Modal de Perfil Estudiantil
 * Fase 76: Analíticas de Colocación en Tiempo Real y Filtros de Cohorte MCER en Portales Docente y Admin
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
  }
}

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔬 stemOS Verification: Fases 75 & 76 (Profile Passport & Cohort Analytics)');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ─────────────────────────────────────────────────────────────────
// SECTION 1: Fase 75 - Student Profile Modal Passport Strip
// ─────────────────────────────────────────────────────────────────
console.log('▶ 1. Fase 75: Student Profile Modal Diagnostic Passport Strip');

const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const devAppHtml = fs.readFileSync(path.join(ROOT, 'dev/app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const devAppJs = fs.readFileSync(path.join(ROOT, 'dev/app.js'), 'utf8');

test('Parity check: app.html <==> dev/app.html', () => {
  assert.strictEqual(appHtml, devAppHtml, 'app.html must match dev/app.html');
});

test('Parity check: app.js <==> dev/app.js', () => {
  assert.strictEqual(appJs, devAppJs, 'app.js must match dev/app.js');
});

test('app.html contains #sp-modal-cefr-badge, #sp-modal-modality, and #sp-modal-folio', () => {
  assert(appHtml.includes('id="sp-modal-cefr-badge"'), 'Missing #sp-modal-cefr-badge in app.html');
  assert(appHtml.includes('id="sp-modal-modality"'), 'Missing #sp-modal-modality in app.html');
  assert(appHtml.includes('id="sp-modal-folio"'), 'Missing #sp-modal-folio in app.html');
  assert(appHtml.includes('Pasaporte Diagnóstico MCER'), 'Missing Pasaporte Diagnóstico MCER label');
  assert(appHtml.includes('href="/placement.html"'), 'Missing link to placement.html');
});

test('app.js openStudentProfileModal populates CEFR diagnostic passport credentials', () => {
  assert(appJs.includes("document.getElementById('sp-modal-cefr-badge')"), 'openStudentProfileModal looks up sp-modal-cefr-badge');
  assert(appJs.includes("document.getElementById('sp-modal-modality')"), 'openStudentProfileModal looks up sp-modal-modality');
  assert(appJs.includes("document.getElementById('sp-modal-folio')"), 'openStudentProfileModal looks up sp-modal-folio');
  assert(appJs.includes("userLvl === 'A1'"), 'Color-coding handles A1');
  assert(appJs.includes("userLvl === 'B1'"), 'Color-coding handles B1');
  assert(appJs.includes("profile.degreeModality === 'tsu'"), 'Modality display checks degreeModality');
});

// ─────────────────────────────────────────────────────────────────
// SECTION 2: Fase 76 - Teacher Portal Cohort MCER Analytics & Roster Sync
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 2. Fase 76: Teacher Portal Cohort MCER Analytics & Roster Sync');

const teacherHtml = fs.readFileSync(path.join(ROOT, 'teacher.html'), 'utf8');
const devTeacherHtml = fs.readFileSync(path.join(ROOT, 'dev/teacher.html'), 'utf8');

test('Parity check: teacher.html <==> dev/teacher.html', () => {
  assert.strictEqual(teacherHtml, devTeacherHtml, 'teacher.html must match dev/teacher.html');
});

test('teacher.html synchronizes placementLevel, cefrScore, and degreeModality from STEMOS_FIREBASE', () => {
  assert(teacherHtml.includes('placementLevel: fbs.cefrLevel'), 'teacher.html maps placementLevel from fbs.cefrLevel');
  assert(teacherHtml.includes('degreeModality: fbs.degreeModality'), 'teacher.html maps degreeModality from fbs.degreeModality');
  assert(teacherHtml.includes('tsuSpecialtyName: fbs.tsuSpecialtyName'), 'teacher.html maps tsuSpecialtyName from fbs.tsuSpecialtyName');
});

test('teacher.html renderMcerGradebook renders CEFR badges and accredited hours', () => {
  assert(teacherHtml.includes('function renderMcerGradebook()'), 'Missing renderMcerGradebook in teacher.html');
  assert(teacherHtml.includes('CEFR ${diagLevel}') || teacherHtml.includes('CEFR ${esc(diagLevel)}'), 'renderMcerGradebook renders CEFR level badge');
  assert(teacherHtml.includes('totalAccreditedHours'), 'renderMcerGradebook computes totalAccreditedHours');
  assert(teacherHtml.includes('stemOS_CACEI_Acta_'), 'teacher.html provides CACEI Acta download');
});

// ─────────────────────────────────────────────────────────────────
// SECTION 3: Fase 76 - Admin Portal Cohort MCER Analytics & Audit Sync
// ─────────────────────────────────────────────────────────────────
console.log('\n▶ 3. Fase 76: Admin Portal Cohort MCER Analytics & Audit Sync');

const adminHtml = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
const devAdminHtml = fs.readFileSync(path.join(ROOT, 'dev/admin.html'), 'utf8');

test('Parity check: admin.html <==> dev/admin.html', () => {
  assert.strictEqual(adminHtml, devAdminHtml, 'admin.html must match dev/admin.html');
});

test('admin.html synchronizes placementLevel and degreeModality from STEMOS_FIREBASE', () => {
  assert(adminHtml.includes('placementLevel: fbs.cefrLevel'), 'admin.html maps placementLevel from fbs.cefrLevel');
  assert(adminHtml.includes('degreeModality: fbs.degreeModality'), 'admin.html maps degreeModality from fbs.degreeModality');
  assert(adminHtml.includes('tsuSpecialtyName: fbs.tsuSpecialtyName'), 'admin.html maps tsuSpecialtyName from fbs.tsuSpecialtyName');
});

test('admin.html contains Institutional Diagnostic Baseline & 240.0h Funnel Card', () => {
  assert(adminHtml.includes('id="admin-mcer-diagnostic-card"'), 'Missing #admin-mcer-diagnostic-card in admin.html');
  assert(adminHtml.includes('CEFR A1 · Foundations'), 'admin.html contains CEFR A1 baseline pill');
  assert(adminHtml.includes('CEFR B1 · Threshold'), 'admin.html contains CEFR B1 baseline pill');
  assert(adminHtml.includes('Embudo Institucional de Acreditación 240.0h'), 'admin.html contains 240h accreditation funnel');
  assert(adminHtml.includes('Nivel CEFR Diagnostico'), 'CSV export includes Nivel CEFR Diagnostico column');
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, ${totalTests - passedTests} Failed (out of ${totalTests} total)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL FASES 75 & 76 AUDITS PASSED WITH 100% SUCCESS!\n');
  process.exit(0);
} else {
  console.error('❌ SOME AUDITS FAILED. Please review output above.\n');
  process.exit(1);
}
