/**
 * stemOS Phase 61: Live Telemetry Inspector, Persona Switcher & Cross-Portal Synchronizer Audit
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔬 stemOS Phase 61: Telemetry Inspector & Persona Switcher Audit');
console.log('═══════════════════════════════════════════════════════════════════');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  [PASS] ${message}`);
  passedTests++;
}

const devHtmlPath = path.join(__dirname, '../dev.html');
const devIndexPath = path.join(__dirname, '../dev/index.html');
const devJsPath = path.join(__dirname, '../dev.js');
const devIndexJsPath = path.join(__dirname, '../dev/index.js');
const devCssPath = path.join(__dirname, '../dev.css');

// ── 1. Markup Verification in dev.html & dev/index.html ──
[
  { name: 'dev.html', path: devHtmlPath },
  { name: 'dev/index.html', path: devIndexPath }
].forEach(target => {
  console.log(`\n▶ 1. HTML Markup Structure: ${target.name}`);
  const html = fs.readFileSync(target.path, 'utf8');
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const { document } = dom.window;

  // Personas bar presence
  const personasBar = document.querySelector('.inst-sandbox-personas-bar');
  assert(!!personasBar, `${target.name}: .inst-sandbox-personas-bar exists in DOM`);

  // Persona buttons
  const personaKeys = ['admin_rector', 'faculty_docente', 'student_advanced', 'student_new'];
  personaKeys.forEach(pKey => {
    const btn = document.querySelector(`.inst-persona-btn[data-persona="${pKey}"]`);
    assert(!!btn, `${target.name}: Persona button for [${pKey}] exists`);
  });

  // Telemetry drawer button
  const toggleBtn = document.getElementById('btn-toggle-telemetry');
  assert(!!toggleBtn, `${target.name}: #btn-toggle-telemetry button exists`);

  // Telemetry drawer container
  const telemDrawer = document.getElementById('inst-sandbox-telemetry');
  assert(!!telemDrawer, `${target.name}: #inst-sandbox-telemetry exists`);

  // Telemetry cards & elements
  assert(!!document.getElementById('inst-telem-name'), `${target.name}: #inst-telem-name exists`);
  assert(!!document.getElementById('inst-telem-role'), `${target.name}: #inst-telem-role exists`);
  assert(!!document.getElementById('inst-telem-career'), `${target.name}: #inst-telem-career exists`);
  assert(!!document.getElementById('inst-telem-classcode'), `${target.name}: #inst-telem-classcode exists`);
  assert(!!document.getElementById('inst-telem-xp'), `${target.name}: #inst-telem-xp exists`);
  assert(!!document.getElementById('inst-telem-level'), `${target.name}: #inst-telem-level exists`);
  assert(!!document.getElementById('inst-telem-progress-bar'), `${target.name}: #inst-telem-progress-bar exists`);
  assert(!!document.getElementById('inst-telem-audit-list'), `${target.name}: #inst-telem-audit-list exists`);

  // Telemetry actions
  assert(!!document.getElementById('btn-seed-data'), `${target.name}: #btn-seed-data exists`);
  assert(!!document.getElementById('btn-reset-data'), `${target.name}: #btn-reset-data exists`);
  assert(!!document.getElementById('btn-export-data'), `${target.name}: #btn-export-data exists`);
});

// ── 2. JavaScript Engine & Studio Functions (dev.js & dev/index.js) ──
[
  { name: 'dev.js', path: devJsPath },
  { name: 'dev/index.js', path: devIndexJsPath }
].forEach(target => {
  console.log(`\n▶ 2. JavaScript Functions Integrity: ${target.name}`);
  const code = fs.readFileSync(target.path, 'utf8');

  assert(code.includes('window.INSTITUTIONAL_PERSONAS'), `${target.name}: window.INSTITUTIONAL_PERSONAS map defined`);
  assert(code.includes('admin_rector:'), `${target.name}: admin_rector persona defined`);
  assert(code.includes('faculty_docente:'), `${target.name}: faculty_docente persona defined`);
  assert(code.includes('student_advanced:'), `${target.name}: student_advanced persona defined`);
  assert(code.includes('student_new:'), `${target.name}: student_new persona defined`);
  assert(code.includes('window.selectInstitutionalPersona = function'), `${target.name}: window.selectInstitutionalPersona function defined`);
  assert(code.includes('window.refreshSandboxTelemetry = function'), `${target.name}: window.refreshSandboxTelemetry function defined`);
  assert(code.includes('window.seedInstitutionalDemoData = function'), `${target.name}: window.seedInstitutionalDemoData function defined`);
  assert(code.includes('window.resetInstitutionalSandboxState = function'), `${target.name}: window.resetInstitutionalSandboxState function defined`);
  assert(code.includes('window.exportInstitutionalState = function'), `${target.name}: window.exportInstitutionalState function defined`);
  assert(code.includes('window.toggleTelemetryDrawer = function'), `${target.name}: window.toggleTelemetryDrawer function defined`);
});

// ── 3. CSS Classes Verification (dev.css) ──
console.log('\n▶ 3. CSS Classes Verification: dev.css');
const css = fs.readFileSync(devCssPath, 'utf8');

assert(css.includes('.inst-sandbox-personas-bar'), 'dev.css: .inst-sandbox-personas-bar defined');
assert(css.includes('.inst-persona-btn'), 'dev.css: .inst-persona-btn defined');
assert(css.includes('.btn-toggle-telemetry'), 'dev.css: .btn-toggle-telemetry defined');
assert(css.includes('.inst-sandbox-telemetry'), 'dev.css: .inst-sandbox-telemetry defined');
assert(css.includes('.inst-telem-grid'), 'dev.css: .inst-telem-grid defined');
assert(css.includes('.inst-telem-card'), 'dev.css: .inst-telem-card defined');
assert(css.includes('.role-admin'), 'dev.css: .role-admin defined');
assert(css.includes('.role-teacher'), 'dev.css: .role-teacher defined');
assert(css.includes('.role-student'), 'dev.css: .role-student defined');
assert(css.includes('.role-guest'), 'dev.css: .role-guest defined');
assert(css.includes('.inst-audit-pill'), 'dev.css: .inst-audit-pill defined');

// ── 4. Live Functional Simulation (JSDOM with Full Script Execution) ──
console.log('\n▶ 4. Live Functional Interaction Simulation');
const devHtml = fs.readFileSync(devHtmlPath, 'utf8');
const devJs = fs.readFileSync(devJsPath, 'utf8');

const simDom = new JSDOM(devHtml, { runScripts: "dangerously", url: "https://stemos.institute" });
const { window } = simDom;

// Mock window.scrollIntoView since JSDOM does not implement layout
window.HTMLElement.prototype.scrollIntoView = function() {};

// Evaluate Phase 60 and 61 logic
window.eval(devJs);

const iframe = window.document.getElementById('inst-sandbox-iframe');
const telemDrawer = window.document.getElementById('inst-sandbox-telemetry');
const telemRole = window.document.getElementById('inst-telem-role');
const telemName = window.document.getElementById('inst-telem-name');
const telemXp = window.document.getElementById('inst-telem-xp');

// Test 4.1: Toggle Telemetry Drawer
assert(!telemDrawer.classList.contains('active'), 'Telemetry drawer starts closed');
window.toggleTelemetryDrawer();
assert(telemDrawer.classList.contains('active'), 'toggleTelemetryDrawer opens drawer');
window.toggleTelemetryDrawer();
assert(!telemDrawer.classList.contains('active'), 'toggleTelemetryDrawer closes drawer on second click');

// Test 4.2: Select Admin Rector Persona
window.selectInstitutionalPersona('admin_rector');
assert(iframe.src.includes('admin.html'), 'admin_rector loads /admin.html');
assert(telemRole.textContent === 'ADMIN', 'Telemetry displays ADMIN role');
assert(telemName.textContent.includes('Villarreal'), 'Telemetry displays Dr. Villarreal');

// Test 4.3: Select Faculty Docente Persona
window.selectInstitutionalPersona('faculty_docente');
assert(iframe.src.includes('teacher.html'), 'faculty_docente loads /teacher.html');
assert(telemRole.textContent === 'TEACHER', 'Telemetry displays TEACHER role');
assert(telemName.textContent.includes('Elena Morales'), 'Telemetry displays Dra. Elena Morales');

// Test 4.4: Select Student Advanced Persona
window.selectInstitutionalPersona('student_advanced');
assert(iframe.src.includes('app.html'), 'student_advanced loads /app.html');
assert(telemRole.textContent === 'STUDENT', 'Telemetry displays STUDENT role');
assert(telemName.textContent.includes('Carlos Mendoza'), 'Telemetry displays Carlos Mendoza');
assert(telemXp.textContent.includes('3450'), 'Telemetry displays 3,450 XP');

// Test 4.5: Select Student New (Guest) Persona
window.selectInstitutionalPersona('student_new');
assert(iframe.src.includes('register.html'), 'student_new loads /register.html');
assert(telemRole.textContent === 'GUEST', 'Telemetry displays GUEST role');

// Test 4.6: Seed Institutional Demo Data
window.seedInstitutionalDemoData();
assert(iframe.src.includes('app.html'), 'seedInstitutionalDemoData switches to active student');
assert(telemRole.textContent === 'STUDENT', 'Seeded data activates student role');
assert(window.document.getElementById('inst-telem-audit-list').children.length > 0, 'Audit feed populated with seeded logs');

// Test 4.7: Reset Institutional State
window.resetInstitutionalSandboxState();
assert(iframe.src.includes('register.html'), 'resetInstitutionalSandboxState resets to register');
assert(telemRole.textContent === 'GUEST', 'Reset restores GUEST role');

console.log('═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, 0 Failed (out of ${totalTests} total)`);
console.log('═══════════════════════════════════════════════════════════════════');
console.log('\n🎉 ALL PHASE 61 TELEMETRY & PERSONA SWITCHER TESTS PASSED (100%)!\n');
