/**
 * test_mcer_institutional_gradebook.cjs
 * Comprehensive Verification Suite for Fases 65, 66 & 67
 *
 * Validates:
 * 1. Fase 65: Teacher MCER Gradebook, Batch Assignment Modal, CACEI Acta & Admin 240.0h Funnel
 * 2. Fase 66: Placement Diagnostic Passport, URL Routing, CEFR Progression HUD & Fast-Track Validation
 * 3. Fase 67: Voice Crucible Studio Acoustic Waveform Canvas, WPM Cadence Telemetry & False Cognate Radar
 * 4. 100% Bit-for-Bit File Parity between Root and Dev Mirrors
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function it(desc, fn) {
    totalTests++;
    try {
        fn();
        console.log(`  ✓ ${desc}`);
        passedTests++;
    } catch (err) {
        console.error(`  ✗ ${desc}`);
        console.error(`    ${err.message}`);
    }
}

console.log('\n================================================================');
console.log('🧪 STEMOS AUDIT SUITE: FASES 65, 66 & 67 VERIFICATION');
console.log('================================================================\n');

// Load files
const rootDir = path.resolve(__dirname, '..');
const teacherHtml = fs.readFileSync(path.join(rootDir, 'teacher.html'), 'utf8');
const adminHtml = fs.readFileSync(path.join(rootDir, 'admin.html'), 'utf8');
const placementHtml = fs.readFileSync(path.join(rootDir, 'placement.html'), 'utf8');
const appHtml = fs.readFileSync(path.join(rootDir, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf8');

// ── 1. FASE 65: TEACHER INSTITUTIONAL GRADEBOOK & CACEI ACTA ──
console.log('📋 Test Group 1: Fase 65 — Teacher MCER Gradebook & CACEI Accreditation');

it('Teacher Portal contains Curricular Program Switcher (#btn-view-esp & #btn-view-mcer)', () => {
    assert(teacherHtml.includes('id="btn-view-esp"'), 'Missing #btn-view-esp');
    assert(teacherHtml.includes('id="btn-view-mcer"'), 'Missing #btn-view-mcer');
    assert(teacherHtml.includes('switchClassProgramView(\'esp\')'), 'Missing switchClassProgramView esp call');
    assert(teacherHtml.includes('switchClassProgramView(\'mcer\')'), 'Missing switchClassProgramView mcer call');
});

it('Teacher Portal contains #mcer-gradebook-card with 4 KPI cards and 7-Dimension Table', () => {
    assert(teacherHtml.includes('id="mcer-gradebook-card"'), 'Missing #mcer-gradebook-card');
    assert(teacherHtml.includes('id="mcer-kpi-hours"'), 'Missing #mcer-kpi-hours');
    assert(teacherHtml.includes('id="mcer-kpi-distribution"'), 'Missing #mcer-kpi-distribution');
    assert(teacherHtml.includes('id="mcer-kpi-crucible"'), 'Missing #mcer-kpi-crucible');
    assert(teacherHtml.includes('id="mcer-kpi-cacei"'), 'Missing #mcer-kpi-cacei');
    assert(teacherHtml.includes('id="mcer-gradebook-table"'), 'Missing #mcer-gradebook-table');
    assert(teacherHtml.includes('id="mcer-gradebook-tbody"'), 'Missing #mcer-gradebook-tbody');
});

it('Teacher Portal contains Cohort Command mass action buttons for MCER assignment & CACEI acta', () => {
    assert(teacherHtml.includes('id="btn-open-assign-mcer"'), 'Missing #btn-open-assign-mcer');
    assert(teacherHtml.includes('id="btn-open-cacei-acta"'), 'Missing #btn-open-cacei-acta');
    assert(teacherHtml.includes('openAssignMcerModal()'), 'Missing openAssignMcerModal trigger');
    assert(teacherHtml.includes('openMcerCaceiActaModal()'), 'Missing openMcerCaceiActaModal trigger');
});

it('Teacher Portal contains Batch Assignment Modal (#modal-assign-mcer) with complete form controls', () => {
    assert(teacherHtml.includes('id="modal-assign-mcer"'), 'Missing #modal-assign-mcer');
    assert(teacherHtml.includes('id="assign-mcer-level"'), 'Missing #assign-mcer-level');
    assert(teacherHtml.includes('id="assign-mcer-scope"'), 'Missing #assign-mcer-scope');
    assert(teacherHtml.includes('id="assign-mcer-threshold"'), 'Missing #assign-mcer-threshold');
    assert(teacherHtml.includes('id="assign-mcer-deadline"'), 'Missing #assign-mcer-deadline');
    assert(teacherHtml.includes('onsubmit="submitMcerAssignment(event)"'), 'Missing submitMcerAssignment on form');
});

it('Teacher Portal contains Official CACEI / DGUTyP Acta Modal (#modal-mcer-cacei-acta)', () => {
    assert(teacherHtml.includes('id="modal-mcer-cacei-acta"'), 'Missing #modal-mcer-cacei-acta');
    assert(teacherHtml.includes('id="acta-folio-code"'), 'Missing #acta-folio-code');
    assert(teacherHtml.includes('id="acta-institution-name"'), 'Missing #acta-institution-name');
    assert(teacherHtml.includes('id="acta-total-hours"'), 'Missing #acta-total-hours');
    assert(teacherHtml.includes('id="acta-students-tbody"'), 'Missing #acta-students-tbody');
    assert(teacherHtml.includes('onclick="exportMcerCaceiActaCSV()"'), 'Missing exportMcerCaceiActaCSV button');
    assert(teacherHtml.includes('onclick="printMcerCaceiActa()"'), 'Missing printMcerCaceiActa button');
});

it('Teacher Portal implements all required JavaScript controller functions', () => {
    assert(teacherHtml.includes('function switchClassProgramView(view)'), 'Missing switchClassProgramView');
    assert(teacherHtml.includes('function renderMcerGradebook()'), 'Missing renderMcerGradebook');
    assert(teacherHtml.includes('function filterMcerStudents(level, btn)'), 'Missing filterMcerStudents');
    assert(teacherHtml.includes('function openAssignMcerModal()'), 'Missing openAssignMcerModal');
    assert(teacherHtml.includes('function submitMcerAssignment(e)'), 'Missing submitMcerAssignment');
    assert(teacherHtml.includes('function openMcerCaceiActaModal()'), 'Missing openMcerCaceiActaModal');
    assert(teacherHtml.includes('function exportMcerCaceiActaCSV()'), 'Missing exportMcerCaceiActaCSV');
    assert(teacherHtml.includes('function printMcerCaceiActa()'), 'Missing printMcerCaceiActa');
});

// ── 2. FASE 65: ADMIN 240.0H FUNNEL & ACCREDITATION REPORT ──
console.log('\n📊 Test Group 2: Fase 65 — Admin 240.0h Funnel & Accreditation');

it('Admin Portal has #admin-mcer-diagnostic-card with 240.0h Cohort Funnel', () => {
    assert(adminHtml.includes('id="admin-mcer-diagnostic-card"'), 'Missing #admin-mcer-diagnostic-card');
    assert(adminHtml.includes('Embudo Institucional de Acreditación 240.0h'), 'Missing 240.0h funnel title');
    assert(adminHtml.includes('HITO 1 · A1 (60.0h)'), 'Missing HITO 1');
    assert(adminHtml.includes('HITO 2 · A2 (120.0h)'), 'Missing HITO 2');
    assert(adminHtml.includes('HITO 3 · B1 (180.0h)'), 'Missing HITO 3');
    assert(adminHtml.includes('HITO 4 · B2 (240.0h)'), 'Missing HITO 4');
    assert(adminHtml.includes('Valor Agregado: +42.6%'), 'Missing value added progression rate');
});

it('Admin Portal exports comprehensive 240.0h CSV report with CACEI Criterio 4', () => {
    assert(adminHtml.includes('Horas Acreditadas MCER (240.0h max)'), 'Missing 240.0h column in CSV');
    assert(adminHtml.includes('Unidades A1-B2 Superadas (0-16)'), 'Missing units column in CSV');
    assert(adminHtml.includes('Dictamen CACEI Criterio 4 / DGUTyP'), 'Missing CACEI verdict column in CSV');
    assert(adminHtml.includes('Dictamen_Acreditacion_CACEI_'), 'Missing filename pattern');
});

// ── 3. FASE 66: PLACEMENT DIAGNOSTIC PASSPORT & ONBOARDING ──
console.log('\n🛂 Test Group 3: Fase 66 — Diagnostic Passport & Onboarding Routing');

it('Placement test stores stemos_diagnostic_passport on completion and routes to app.html with onboarding=mcer', () => {
    assert(placementHtml.includes('id="btn-enter-stemos"'), 'Missing #btn-enter-stemos');
    assert(placementHtml.includes('stemos_diagnostic_passport'), 'Missing passport localStorage key');
    assert(placementHtml.includes('fastTrackEligible'), 'Missing fastTrackEligible flag');
    assert(placementHtml.includes('app.html?onboarding=mcer&level='), 'Missing onboarding URL redirect');
});

it('App header contains #header-cefr-passport-hud button to review Diagnostic Passport', () => {
    assert(appHtml.includes('id="header-cefr-passport-hud"'), 'Missing #header-cefr-passport-hud');
    assert(appHtml.includes('id="header-cefr-passport-text"'), 'Missing #header-cefr-passport-text');
    assert(appHtml.includes('openDiagnosticPassportModal()'), 'Missing openDiagnosticPassportModal call');
});

it('App contains #modal-diagnostic-passport with credentials, subscores, and progression HUD', () => {
    assert(appHtml.includes('id="modal-diagnostic-passport"'), 'Missing #modal-diagnostic-passport');
    assert(appHtml.includes('id="passport-student-name"'), 'Missing #passport-student-name');
    assert(appHtml.includes('id="passport-folio-code"'), 'Missing #passport-folio-code');
    assert(appHtml.includes('id="passport-level-badge"'), 'Missing #passport-level-badge');
    assert(appHtml.includes('id="passport-score-val"'), 'Missing #passport-score-val');
    assert(appHtml.includes('id="passport-grammar-bar"'), 'Missing #passport-grammar-bar');
    assert(appHtml.includes('id="passport-listening-bar"'), 'Missing #passport-listening-bar');
    assert(appHtml.includes('id="passport-reading-bar"'), 'Missing #passport-reading-bar');
    assert(appHtml.includes('id="hud-step-a1"'), 'Missing #hud-step-a1');
    assert(appHtml.includes('id="hud-step-a2"'), 'Missing #hud-step-a2');
    assert(appHtml.includes('id="hud-step-b1"'), 'Missing #hud-step-b1');
    assert(appHtml.includes('id="hud-step-b2"'), 'Missing #hud-step-b2');
});

it('App implements Fast-Track validation trigger and logic in app.js', () => {
    assert(appHtml.includes('id="btn-fast-track-validate"'), 'Missing #btn-fast-track-validate');
    assert(appHtml.includes('id="fast-track-status-box"'), 'Missing #fast-track-status-box');
    assert(appHtml.includes('id="btn-passport-start-unit"'), 'Missing #btn-passport-start-unit');
    assert(appJs.includes('function openDiagnosticPassportModal()'), 'Missing openDiagnosticPassportModal in app.js');
    assert(appJs.includes('stemos_mcer_convalidated'), 'Missing stemos_mcer_convalidated in app.js');
    assert(appJs.includes('onboarding') && appJs.includes('mcer'), 'Missing onboarding=mcer query param listener in app.js');
});

// ── 4. FASE 67: NEARSHORING VOICE CRUCIBLE STUDIO TELEMETRY ──
console.log('\n🎙️ Test Group 4: Fase 67 — Voice Crucible Studio Telemetry & Radar');

it('Tab 6 (Voice Crucible) in app.html contains #mcer-crucible-telemetry-panel', () => {
    assert(appHtml.includes('id="mcer-crucible-telemetry-panel"'), 'Missing #mcer-crucible-telemetry-panel');
    assert(appHtml.includes('Nearshoring Voice Crucible Studio'), 'Missing Voice Crucible Studio label');
});

it('Crucible Telemetry Panel contains live waveform canvas (#mcer-crucible-waveform)', () => {
    assert(appHtml.includes('id="mcer-crucible-waveform"'), 'Missing #mcer-crucible-waveform canvas');
    assert(appHtml.includes('<canvas id="mcer-crucible-waveform"'), 'Canvas element properly declared');
});

it('Crucible Telemetry Panel contains real-time WPM cadence monitor (#mcer-crucible-cadence-pill & #mcer-crucible-wpm-val)', () => {
    assert(appHtml.includes('id="mcer-crucible-cadence-pill"'), 'Missing #mcer-crucible-cadence-pill');
    assert(appHtml.includes('id="mcer-crucible-wpm-val"'), 'Missing #mcer-crucible-wpm-val');
});

it('Crucible Telemetry Panel contains real-time Cognate & Stress radar (#mcer-crucible-live-badges)', () => {
    assert(appHtml.includes('id="mcer-crucible-live-badges"'), 'Missing #mcer-crucible-live-badges');
});

it('app.js initializes AudioContext / AnalyserNode waveform loop and live cadence calculation', () => {
    assert(appJs.includes('initCrucibleWaveform()'), 'Missing initCrucibleWaveform call');
    assert(appJs.includes('mcer-crucible-waveform'), 'Missing waveform canvas reference in app.js');
    assert(appJs.includes('updateCrucibleCadenceAndScanner'), 'Missing updateCrucibleCadenceAndScanner');
    assert(appJs.includes('mcer-crucible-wpm-val'), 'Missing WPM element update in app.js');
    assert(appJs.includes('mcer-crucible-cadence-pill'), 'Missing cadence pill update in app.js');
});

it('app.js scans for false cognate traps and stress pronunciation in real-time', () => {
    assert(appJs.includes('mcer-crucible-live-badges'), 'Missing live badges element reference in app.js');
    assert(appJs.includes('False Cognate:'), 'Missing false cognate badge template in app.js');
    assert(appJs.includes('Standard Stress:'), 'Missing standard stress badge template in app.js');
});

// ── 5. EXACT FILE PARITY CHECK ──
console.log('\n🔒 Test Group 5: Root vs Dev Mirrors Parity Check');

const filesToCompare = [
    'teacher.html',
    'admin.html',
    'placement.html',
    'app.html',
    'app.js'
];

filesToCompare.forEach(file => {
    it(`File parity: ${file} === dev/${file}`, () => {
        const rootContent = fs.readFileSync(path.join(rootDir, file), 'utf8');
        const devContent = fs.readFileSync(path.join(rootDir, 'dev', file), 'utf8');
        assert.strictEqual(rootContent, devContent, `Content mismatch between ${file} and dev/${file}`);
    });
});

console.log('\n================================================================');
console.log(`🏁 RESULT: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('================================================================\n');

if (passedTests === totalTests) {
    process.exit(0);
} else {
    process.exit(1);
}
