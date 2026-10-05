/**
 * stemOS Phase 60: Embedded Dev Portal Studio & Zero-Page-Navigation Workstation Audit
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🚀 stemOS Phase 60: Embedded Dev Studio & Zero-Navigation Audit');
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

  // Sandbox presence
  const sandbox = document.getElementById('inst-embedded-sandbox');
  assert(!!sandbox, `${target.name}: #inst-embedded-sandbox exists in DOM`);

  // Iframe presence
  const iframe = document.getElementById('inst-sandbox-iframe');
  assert(!!iframe, `${target.name}: #inst-sandbox-iframe exists`);
  assert(iframe.getAttribute('src') === '/admin.html', `${target.name}: iframe default src is /admin.html`);

  // Tab switchers
  const tabs = ['admin', 'teacher', 'register', 'app'];
  tabs.forEach(t => {
    const tabBtn = document.getElementById(`inst-tab-${t}`);
    assert(!!tabBtn, `${target.name}: Tab button #inst-tab-${t} exists`);
    assert(tabBtn.getAttribute('data-portal') === t, `${target.name}: Tab #inst-tab-${t} data-portal matches ${t}`);
  });

  // Viewport switchers
  const viewports = ['desktop', 'tablet', 'mobile'];
  viewports.forEach(vp => {
    const vpBtn = document.getElementById(`inst-vp-${vp}`);
    assert(!!vpBtn, `${target.name}: Viewport button #inst-vp-${vp} exists`);
  });

  // Tools & URL display
  assert(!!document.getElementById('inst-sandbox-reload'), `${target.name}: #inst-sandbox-reload button exists`);
  assert(!!document.getElementById('inst-sandbox-fullscreen'), `${target.name}: #inst-sandbox-fullscreen button exists`);
  assert(!!document.getElementById('inst-sandbox-url-display'), `${target.name}: #inst-sandbox-url-display exists`);
  assert(!!document.getElementById('inst-sandbox-loader'), `${target.name}: #inst-sandbox-loader overlay exists`);

  // Zero-Navigation constraint: No target="_blank" in 4 institutional cards
  const portalCards = document.querySelectorAll('.inst-portal-card');
  assert(portalCards.length === 4, `${target.name}: Exactly 4 institutional portal cards found`);
  portalCards.forEach(card => {
    assert(!card.hasAttribute('target'), `${target.name}: Portal card ${card.getAttribute('href')} has NO target="_blank"`);
    const onclick = card.getAttribute('onclick') || '';
    assert(onclick.includes('window.switchEmbeddedPortal'), `${target.name}: Portal card ${card.getAttribute('href')} intercepts click via switchEmbeddedPortal`);
  });

  // Zero-Navigation in Navigation Dropdown
  const toolsMenu = document.getElementById('nav-dropdown-tools');
  if (toolsMenu) {
    const navPortals = toolsMenu.querySelectorAll('a[href^="/admin"], a[href^="/teacher"], a[href^="/register"], a[href^="/app"]');
    navPortals.forEach(navLink => {
      assert(!navLink.hasAttribute('target'), `${target.name}: Nav link ${navLink.getAttribute('href')} has NO target="_blank"`);
      assert((navLink.getAttribute('onclick') || '').includes('switchEmbeddedPortal'), `${target.name}: Nav link ${navLink.getAttribute('href')} calls switchEmbeddedPortal`);
    });
  }

  // Zero-Navigation in Mobile Drawer
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileDrawer) {
    const mobilePortals = mobileDrawer.querySelectorAll('a[href^="/admin"], a[href^="/teacher"], a[href^="/register"], a[href^="/app"]');
    mobilePortals.forEach(mLink => {
      assert(!mLink.hasAttribute('target'), `${target.name}: Mobile link ${mLink.getAttribute('href')} has NO target="_blank"`);
      assert((mLink.getAttribute('onclick') || '').includes('switchEmbeddedPortal'), `${target.name}: Mobile link ${mLink.getAttribute('href')} calls switchEmbeddedPortal`);
    });
  }
});

// ── 2. JavaScript Engine & Studio Functions (dev.js & dev/index.js) ──
[
  { name: 'dev.js', path: devJsPath },
  { name: 'dev/index.js', path: devIndexJsPath }
].forEach(target => {
  console.log(`\n▶ 2. JavaScript Functions Integrity: ${target.name}`);
  const code = fs.readFileSync(target.path, 'utf8');

  assert(code.includes('window.PORTAL_URLS'), `${target.name}: window.PORTAL_URLS map defined`);
  assert(code.includes('window.switchEmbeddedPortal = function'), `${target.name}: window.switchEmbeddedPortal function defined`);
  assert(code.includes('window.enrollCareerInEmbeddedSandbox = function'), `${target.name}: window.enrollCareerInEmbeddedSandbox function defined`);
  assert(code.includes('window.setSandboxViewport = function'), `${target.name}: window.setSandboxViewport function defined`);
  assert(code.includes('window.reloadSandbox = function'), `${target.name}: window.reloadSandbox function defined`);
  assert(code.includes('window.toggleSandboxFullscreen = function'), `${target.name}: window.toggleSandboxFullscreen function defined`);
  assert(code.includes('window.enrollCareerInEmbeddedSandbox(\'${c.id}\''), `${target.name}: .btn-enroll-career bound to enrollCareerInEmbeddedSandbox`);
});

// ── 3. CSS Viewport & Responsive Design Verification (dev.css) ──
console.log('\n▶ 3. CSS Classes & Responsive Frame Verification: dev.css');
const css = fs.readFileSync(devCssPath, 'utf8');

assert(css.includes('.inst-embedded-sandbox'), 'dev.css: .inst-embedded-sandbox base styles defined');
assert(css.includes('.inst-sandbox-header'), 'dev.css: .inst-sandbox-header styles defined');
assert(css.includes('.inst-sandbox-status-badge'), 'dev.css: .inst-sandbox-status-badge styles defined');
assert(css.includes('.inst-status-pulse'), 'dev.css: .inst-status-pulse green pulse animation defined');
assert(css.includes('.inst-device-desktop'), 'dev.css: .inst-device-desktop mode defined');
assert(css.includes('.inst-device-tablet'), 'dev.css: .inst-device-tablet mode defined');
assert(css.includes('.inst-device-mobile'), 'dev.css: .inst-device-mobile mode defined');
assert(css.includes('.inst-sandbox-fullscreen-mode'), 'dev.css: .inst-sandbox-fullscreen-mode defined');
assert(css.includes('#inst-sandbox-iframe'), 'dev.css: #inst-sandbox-iframe styling present');
assert(css.includes('.inst-sandbox-loader'), 'dev.css: .inst-sandbox-loader overlay animation present');

// ── 4. Live Functional Simulation (JSDOM with Full Script Execution) ──
console.log('\n▶ 4. Live Functional Interaction Simulation');
const devHtml = fs.readFileSync(devHtmlPath, 'utf8');
const devJs = fs.readFileSync(devJsPath, 'utf8');

const simDom = new JSDOM(devHtml, { runScripts: "dangerously" });
const { window } = simDom;

// Mock window.scrollIntoView since JSDOM does not implement layout
window.HTMLElement.prototype.scrollIntoView = function() {};

// Evaluate Phase 60 studio logic
window.eval(devJs);

const iframe = window.document.getElementById('inst-sandbox-iframe');
const urlDisplay = window.document.getElementById('inst-sandbox-url-display');
const wrapper = window.document.getElementById('inst-sandbox-viewport-wrapper');
const sandbox = window.document.getElementById('inst-embedded-sandbox');

// Test 4.1: Switch to Teacher portal
window.switchEmbeddedPortal('teacher');
assert(iframe.src.includes('teacher.html'), 'switchEmbeddedPortal("teacher") sets iframe src to /teacher.html');
assert(urlDisplay.textContent === '/teacher.html', 'URL display shows /teacher.html');
assert(window.document.getElementById('inst-tab-teacher').classList.contains('active'), 'Teacher tab is active');
assert(!window.document.getElementById('inst-tab-admin').classList.contains('active'), 'Admin tab is deactivated');

// Test 4.2: Switch to Register portal with class invite code query param
window.switchEmbeddedPortal('register', null, '?class=STEM-MECA-A7X3K2');
assert(iframe.src.includes('register.html?class=STEM-MECA-A7X3K2'), 'switchEmbeddedPortal with query params updates iframe src accurately');
assert(urlDisplay.textContent.includes('?class=STEM-MECA-A7X3K2'), 'URL display reflects query parameter');
assert(window.document.getElementById('inst-tab-register').classList.contains('active'), 'Register tab is active');

// Test 4.3: Direct Career Enrollment Bridge
window.enrollCareerInEmbeddedSandbox('it-mecatronica');
assert(iframe.src.includes('register.html?career=it-mecatronica'), 'enrollCareerInEmbeddedSandbox loads /register.html?career=it-mecatronica');
assert(urlDisplay.textContent === '/register.html?career=it-mecatronica', 'URL display shows /register.html?career=it-mecatronica');

// Test 4.4: Device Viewport Switching
window.setSandboxViewport('mobile');
assert(wrapper.classList.contains('inst-device-mobile'), 'setSandboxViewport("mobile") adds inst-device-mobile class');
assert(window.document.getElementById('inst-vp-mobile').classList.contains('active'), 'Mobile viewport button is active');

window.setSandboxViewport('tablet');
assert(wrapper.classList.contains('inst-device-tablet'), 'setSandboxViewport("tablet") adds inst-device-tablet class');
assert(!wrapper.classList.contains('inst-device-mobile'), 'Previous device class removed');

window.setSandboxViewport('desktop');
assert(wrapper.classList.contains('inst-device-desktop'), 'setSandboxViewport("desktop") restores desktop class');

// Test 4.5: Fullscreen Studio Toggle
assert(!sandbox.classList.contains('inst-sandbox-fullscreen-mode'), 'Sandbox starts in normal embedded mode');
window.toggleSandboxFullscreen();
assert(sandbox.classList.contains('inst-sandbox-fullscreen-mode'), 'toggleSandboxFullscreen() activates inst-sandbox-fullscreen-mode');
window.toggleSandboxFullscreen();
assert(!sandbox.classList.contains('inst-sandbox-fullscreen-mode'), 'Second toggle restores normal embedded mode');

// Test 4.6: Reload handler
window.reloadSandbox();
assert(iframe.src.length > 0, 'reloadSandbox retains valid iframe src');

console.log('═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, 0 Failed (out of ${totalTests} total)`);
console.log('═══════════════════════════════════════════════════════════════════');
console.log('\n🎉 ALL PHASE 60 EMBEDDED DEV STUDIO TESTS PASSED (100%)!\n');
