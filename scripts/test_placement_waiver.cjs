const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
const placementHtml = fs.readFileSync(path.join(ROOT, 'placement.html'), 'utf8');
const appHtml = fs.readFileSync(path.join(ROOT, 'app.html'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

console.log('Testing Placement Test Waiver Feature...');

// 1. Placement.html checks
assert(placementHtml.includes('btn-waive-placement'), 'placement.html must include #btn-waive-placement');
assert(placementHtml.includes('handlePlacementWaiver()'), 'placement.html must call handlePlacementWaiver()');
assert(placementHtml.includes('function handlePlacementWaiver()'), 'placement.html must define handlePlacementWaiver()');
assert(placementHtml.includes('stemos_placement_waived'), 'placement.html must set stemos_placement_waived');
console.log('✔ PASS: placement.html contains waiver UI and logic');

// 2. App.html checks
assert(appHtml.includes('btn-banner-waive-placement'), 'app.html must include #btn-banner-waive-placement');
assert(appHtml.includes('btn-modal-waive-placement'), 'app.html must include #btn-modal-waive-placement');
assert(appHtml.includes('handlePlacementWaiverFromApp()'), 'app.html must invoke handlePlacementWaiverFromApp()');
console.log('✔ PASS: app.html contains banner and modal waiver buttons');

// 3. App.js checks
assert(appJs.includes('handlePlacementWaiverFromApp'), 'app.js must define handlePlacementWaiverFromApp');
assert(appJs.includes('stemos_placement_waived'), 'app.js must check stemos_placement_waived');
assert(appJs.includes('Nivel A1 Asignado (Waiver Nivel 0)'), 'app.js must display waiver badge label');
console.log('✔ PASS: app.js contains waiver logic and badge updates');

console.log('🎉 ALL PLACEMENT WAIVER TESTS PASSED (100%)!');
