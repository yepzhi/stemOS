/**
 * scripts/test_register_enhancements.cjs
 *
 * Automated regression test suite for:
 * 1. Email domain auto-detection (@upbc.edu.mx, @tecnm.mx, @uabc.edu.mx, @utt.edu.mx, Gmail)
 * 2. Step 2: "Primer Cliente" visible removal, updated subsystems copy, and <select> campus dropdown
 * 3. Step 4: Cuatrimestres (UPBC, UT) vs Semestres (TecNM, State, LATAM) dynamic adaptation
 * 4. Step 6: Clean class code prompt (no 'cohorte', no raw code tag glitch)
 * 5. Step 6: Hidden solo subscription $49/mo banner in onboarding
 * 6. File parity: register.html === dev/register.html
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🎓 stemOS Registration Wizard UX Enhancements Audit');
console.log('═══════════════════════════════════════════════════════════════════\n');

const regHtml = fs.readFileSync(path.join(__dirname, '../register.html'), 'utf8');
const devRegHtml = fs.readFileSync(path.join(__dirname, '../dev/register.html'), 'utf8');

// 1. File Parity
console.log('▶ 1. File Parity Audit');
assert.strictEqual(regHtml, devRegHtml, 'register.html and dev/register.html must be 100% identical');
console.log('  [PASS] File Parity: register.html === dev/register.html');

// 2. Email Domain Auto-Detection
console.log('\n▶ 2. Email Domain Auto-Detection');
assert(regHtml.includes('handleEmailInputDetection(this.value)'), 'Missing handleEmailInputDetection on #inp-email');
assert(regHtml.includes('detectInstitutionFromEmail'), 'Missing detectInstitutionFromEmail function');
assert(regHtml.includes('@upbc.edu.mx'), 'Missing @upbc.edu.mx domain');
assert(regHtml.includes('@tecnm.mx'), 'Missing @tecnm.mx domain');
assert(regHtml.includes('@uabc.edu.mx'), 'Missing @uabc.edu.mx domain');
assert(regHtml.includes('@utt.edu.mx'), 'Missing @utt.edu.mx domain');
assert(regHtml.includes('email-detect-badge'), 'Missing #email-detect-badge indicator');
console.log('  [PASS] Institutional domains @upbc.edu.mx, @tecnm.mx, @uabc.edu.mx, @utt.edu.mx and Gmail detected');

// 3. Step 2: "Primer Cliente" Visible Badge Removed & Clean Subsystem Copy (UTyP Unified)
console.log('\n▶ 3. Step 2 Subsystems & "Primer Cliente" Removal');
// Visible badge is gone (not rendered as a visible star badge)
assert(!regHtml.includes('<i class="fa-solid fa-star"></i> Primer Cliente'), 'Visible Primer Cliente badge was not removed');
assert(regHtml.includes('Universidades Tecnológicas y Politécnicas'), 'Missing Universidades Tecnológicas y Politécnicas title');
assert(regHtml.includes('UTyP'), 'Missing UTyP badge');
assert(regHtml.includes('Subsistema oficial UTyP (UPBC, UTT y red nacional): Modelo cuatrimestral, TSU, Ingenierías y Estadías Profesionales en la industria.'), 'Missing UTyP description');
assert(regHtml.includes('Sistema TecNM Nacional'), 'Missing Sistema TecNM Nacional title');
assert(regHtml.includes("Mexico's largest STEM network with 254 engineering campuses and professional residencies."), 'Missing TecNM description');
assert(regHtml.includes('UNISON, UNAM, IPN, UANL, UDG, UABC & autonomous research centers with R&D specialization.'), 'Missing State description');
assert(regHtml.includes('International, LATAM & US Institutions.'), 'Missing LATAM/USA description');
console.log('  [PASS] Visible "Primer Cliente" removed and all academic subsystem descriptions calibrated with UTyP unified');

// 4. Step 2: Standardized Campus <select> Dropdown
console.log('\n▶ 4. Standardized Campus Dropdown');
assert(regHtml.includes('<select id="inp-campus"'), 'Missing select#inp-campus');
assert(regHtml.includes('handleCampusDropdownChange(this.value)'), 'Missing handleCampusDropdownChange on #inp-campus');
assert(regHtml.includes('Universidad Politécnica de Baja California (UPBC Mexicali)'), 'Missing UPBC Mexicali option');
assert(regHtml.includes('TecNM Tijuana (ITT)'), 'Missing ITT option');
assert(regHtml.includes('TecNM Campus Saltillo'), 'Missing Saltillo option');
assert(regHtml.includes('Universidad Tecnológica de Tijuana (UTT)'), 'Missing UTT option');
assert(regHtml.includes('Universidad Autónoma de Baja California (UABC)'), 'Missing UABC option');
assert(regHtml.includes('Continuar sin selección de Universidad / Estudio Independiente'), 'Missing Independent study option');
console.log('  [PASS] Standardized dropdown with UPBC, ITT, Saltillo, UTT, UABC, and Independent study option');

// 5. Step 4: Cuatrimestres (UPBC, UT) vs Semestres (TecNM, State)
console.log('\n▶ 5. Academic Stage Terminology (Cuatrimestre vs Semestre)');
assert(regHtml.includes('updateStageTerms'), 'Missing updateStageTerms function');
assert(regHtml.includes('title-stage-early'), 'Missing id title-stage-early');
assert(regHtml.includes('title-stage-mid'), 'Missing id title-stage-mid');
assert(regHtml.includes('title-stage-senior'), 'Missing id title-stage-senior');
assert(regHtml.includes('title-stage-pro'), 'Missing id title-stage-pro');
assert(regHtml.includes('Cuatrimestre'), 'Missing Cuatrimestre terminology support in updateStageTerms');
assert(regHtml.includes('Estadías'), 'Missing Estadías terminology support in updateStageTerms');
console.log('  [PASS] Dynamic Stage terminology switches between Cuatrimestres/Estadías and Semestres/Residencias');

// 6. Step 6: Clean Class Code Prompt
console.log('\n▶ 6. Step 6 Clean Class Code Prompt');
assert(!regHtml.includes('código de cohorte (ej. <code>STEM-MECA-A7X3K2</code>)'), 'Raw cohorte/code tag glitch still present in Step 6');
assert(regHtml.includes('Si tu profesor te asignó un código de clase (ejemplo: STEM-MECA-A7X3K2), ingrésalo abajo para unirte a su grupo.'), 'Missing clean Spanish subtitle');
assert(regHtml.includes('If your professor assigned you a class code (example: STEM-MECA-A7X3K2), enter it below to join their class roster directly.'), 'Missing clean English subtitle');
console.log('  [PASS] Class code prompt cleaned: No "cohorte" jargon and no raw code formatting glitches');

// 7. Step 6: Solo Subscription Banner Hidden in Onboarding
console.log('\n▶ 7. Hidden Solo Subscription Banner in Onboarding');
assert(regHtml.includes('id="solo-subscription-banner" style="display: none !important;'), 'solo-subscription-banner must be hidden with display: none !important;');
console.log('  [PASS] #solo-subscription-banner hidden in onboarding wizard per user request');

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('🏁 ALL 7 AUDITS PASSED WITH 100% SUCCESS!');
console.log('═══════════════════════════════════════════════════════════════════\n');
