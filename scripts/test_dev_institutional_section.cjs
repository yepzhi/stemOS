/**
 * stemOS — Verification Test for Institutional Academic Section in dev.html & dev/index.html
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const devHtmlPath = path.join(__dirname, '../dev.html');
const devIndexPath = path.join(__dirname, '../dev/index.html');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🏛️  stemOS Dev Studio Institutional Academic Section Audit');
console.log('═══════════════════════════════════════════════════════════════════');

[
  { name: 'dev.html', path: devHtmlPath },
  { name: 'dev/index.html', path: devIndexPath }
].forEach(target => {
  console.log(`\n▶ Verifying ${target.name}...`);
  const html = fs.readFileSync(target.path, 'utf8');
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const { document } = dom.window;

  // 1. Check Section exists
  const section = document.getElementById('institutional-academic-section');
  if (!section) throw new Error(`${target.name}: #institutional-academic-section NOT FOUND!`);
  console.log(`  [PASS] #institutional-academic-section exists`);

  // 2. Check 4 Portals exist
  const portalLinks = [
    { href: '/admin.html', label: 'Admin Portal' },
    { href: '/teacher.html', label: 'Teacher Portal' },
    { href: '/register.html', label: 'Register Portal' },
    { href: '/app.html', label: 'App 3D Portal' }
  ];
  portalLinks.forEach(p => {
    const link = section.querySelector(`a[href="${p.href}"]`);
    if (!link) throw new Error(`${target.name}: Link to ${p.href} not found in institutional section!`);
    console.log(`  [PASS] Institutional portal link to ${p.href} (${p.label}) exists`);
  });

  // 3. Check Subsystem filter buttons
  const filters = section.querySelectorAll('#inst-subsystem-filters button');
  if (filters.length < 5) throw new Error(`${target.name}: Expected at least 5 subsystem filter buttons, found ${filters.length}`);
  console.log(`  [PASS] ${filters.length} Subsystem filter buttons present`);

  // 4. Check Search Input
  const searchInput = section.querySelector('#inst-career-search');
  if (!searchInput) throw new Error(`${target.name}: #inst-career-search NOT FOUND!`);
  console.log(`  [PASS] #inst-career-search input exists`);

  // 5. Check Careers Grid Container
  const grid = section.querySelector('#inst-careers-grid');
  if (!grid) throw new Error(`${target.name}: #inst-careers-grid NOT FOUND!`);
  console.log(`  [PASS] #inst-careers-grid container exists`);

  // 6. Check Modal for 16 Stations exists
  const modal = document.getElementById('inst-career-stations-modal');
  if (!modal) throw new Error(`${target.name}: #inst-career-stations-modal NOT FOUND!`);
  console.log(`  [PASS] #inst-career-stations-modal exists`);

  // 7. Check Hero Dock Pill exists
  const heroPill = document.getElementById('hero-academic-btn');
  if (!heroPill) throw new Error(`${target.name}: #hero-academic-btn NOT FOUND in hero dock!`);
  console.log(`  [PASS] #hero-academic-btn exists in hero dock`);
});

console.log('\n🎉 ALL DEV INSTITUTIONAL TESTS PASSED WITH 100% SUCCESS!\n');
