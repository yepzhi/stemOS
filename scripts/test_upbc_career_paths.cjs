/**
 * scripts/test_upbc_career_paths.cjs
 * Comprehensive Verification Suite for UPBC Mexicali (Cliente Fundador)
 * Tests:
 * 1. UPBC Academic Catalog Integrity (11 Careers & 25 TSU Specialties)
 * 2. Deterministic 60-Hour Path Resolution & TSU Inheritance (16 stations, 4 hitos, 5,600 XP)
 * 3. Pedagogical Interleaving Invariants (Theory -> English B1 -> Lab -> Milestone)
 * 4. Zero A2 Policy Platform-Wide
 * 5. Onboarding Wizard (register.html) UPBC & TSU Flow
 * 6. Placement Test (placement.html) UPBC Career & TSU Selector
 * 7. Teacher & Admin Subsystem Groupings
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🎓 stemOS UPBC Mexicali (Cliente Fundador) Integration Audit');
console.log('   Academic Catalog, TSU Specialties & Deterministic Path Engine');
console.log('═══════════════════════════════════════════════════════════════════\n');

let totalTests = 0;
let passedTests = 0;

function runTest(desc, fn) {
    totalTests++;
    try {
        fn();
        passedTests++;
        console.log(`  [PASS] ${desc}`);
    } catch (err) {
        console.error(`  [FAIL] ${desc}`);
        console.error(`         Error: ${err.message}`);
    }
}

// Mock window environment to load modules
global.window = {};

// Load career_tracks.js
const careerTracksCode = fs.readFileSync(path.join(__dirname, '../content/career_tracks.js'), 'utf8');
eval(careerTracksCode);

// Load career_paths.js
const careerPathsCode = fs.readFileSync(path.join(__dirname, '../content/career_paths.js'), 'utf8');
eval(careerPathsCode);

const CAREER_TRACKS = global.window.STEMOS_CAREER_TRACKS;
const CAREER_PATHS = global.window.STEMOS_CAREER_PATHS;

// 1. UPBC Academic Catalog Integrity
console.log('▶ 1. UPBC Academic Catalog (11 Careers)');

const UPBC_CAREERS = [
    { id: 'upbc-animacion', name: 'Ingeniería en Animación y Efectos Visuales', tsus: 1 },
    { id: 'upbc-energia', name: 'Ingeniería en Energía y Desarrollo Sostenible', tsus: 3 },
    { id: 'upbc-mecatronica', name: 'Ingeniería Mecatrónica', tsus: 6 },
    { id: 'upbc-ti', name: 'Ingeniería en Tecnologías de la Información e Innovación Digital', tsus: 5 },
    { id: 'upbc-manufactura', name: 'Ingeniería en Manufactura Avanzada', tsus: 1 },
    { id: 'upbc-administracion', name: 'Licenciatura en Administración', tsus: 2 },
    { id: 'upbc-semiconductores', name: 'Ingeniería en Semiconductores', tsus: 1 },
    { id: 'upbc-industrial', name: 'Ingeniería Industrial', tsus: 3 },
    { id: 'upbc-educacion', name: 'Licenciatura en Educación', tsus: 1 },
    { id: 'upbc-gastronomia', name: 'Licenciatura en Gastronomía', tsus: 1 },
    { id: 'upbc-negocios', name: 'Licenciatura en Negocios y Mercadotecnia', tsus: 1 }
];

runTest('getAllUpbcCareers() returns all 11 careers for UPBC Mexicali', () => {
    const list = CAREER_TRACKS.getAllUpbcCareers();
    assert.strictEqual(list.length, 11, `Expected 11 UPBC careers, got ${list.length}`);
});

UPBC_CAREERS.forEach(expected => {
    runTest(`Verify UPBC Career: ${expected.id} (${expected.name})`, () => {
        const c = CAREER_TRACKS.getCareerById(expected.id);
        assert(c, `Career ${expected.id} not found`);
        assert.strictEqual(c.system, 'upbc');
        assert.strictEqual(c.hub, 'tijuana-mxi');
        assert.strictEqual(c.totalHours, 60.0);
        assert(Array.isArray(c.tsuPrograms), `tsuPrograms array missing for ${expected.id}`);
        assert.strictEqual(c.tsuPrograms.length, expected.tsus, `Expected ${expected.tsus} TSUs, got ${c.tsuPrograms.length}`);
    });
});

// 2. Official 25 TSU Specialties Verification
console.log('\n▶ 2. Official Convocatoria UPBC 2026: 25 TSU Specialties');

runTest('Total TSU specialties count across all 11 careers equals exactly 25', () => {
    let count = 0;
    const upbcList = CAREER_TRACKS.getAllUpbcCareers();
    upbcList.forEach(c => {
        count += (c.tsuPrograms || []).length;
    });
    assert.strictEqual(count, 25, `Expected exactly 25 TSU specialties, got ${count}`);
});

runTest('getTsuSpecialtiesForCareer() returns correct specialties', () => {
    const mecaTsus = CAREER_TRACKS.getTsuSpecialtiesForCareer('upbc-mecatronica');
    assert.strictEqual(mecaTsus.length, 6, 'Expected 6 TSUs for Mecatrónica');
    const ids = mecaTsus.map(t => t.id);
    assert(ids.includes('tsu-robotica'), 'tsu-robotica should be in Mecatrónica TSUs');
    assert(ids.includes('tsu-automatizacion'), 'tsu-automatizacion should be in Mecatrónica TSUs');
});

runTest('getCareerById() resolves TSU specialty IDs back to parent career metadata', () => {
    const roboticaCareer = CAREER_TRACKS.getCareerById('tsu-robotica');
    assert(roboticaCareer, 'tsu-robotica should resolve to a valid career object');
    assert.strictEqual(roboticaCareer.id, 'tsu-robotica');
    assert.strictEqual(roboticaCareer.parentCareerId, 'upbc-mecatronica', 'Should point to parent upbc-mecatronica');
    assert.strictEqual(roboticaCareer.tsuSpecialty, 'TSU en Robótica');
});

// 3. Deterministic 60-Hour Curricular Paths & TSU Inheritance
console.log('\n▶ 3. Deterministic 60.0h Path Engine & Interleaving Invariants');

UPBC_CAREERS.forEach(item => {
    runTest(`Verify 16-station path for ${item.id}`, () => {
        const pathData = CAREER_PATHS.getPathForCareer(item.id);
        assert(pathData, `Path missing for ${item.id}`);
        assert.strictEqual(pathData.modules.length, 16, `Expected 16 stations for ${item.id}`);
        assert.strictEqual(pathData.totalHours, 60.0, `Expected 60.0 hours for ${item.id}`);
        assert.strictEqual(pathData.totalXP, 5600, `Expected 5,600 XP for ${item.id}`);
        assert.strictEqual(pathData.hitosCount, 4, `Expected 4 hitos for ${item.id}`);

        // Interleaving rule check: Theory -> English B1 -> Practical Lab -> Milestone
        const expectedPattern = ['theory', 'english-b1', 'practical-lab', 'milestone'];
        pathData.modules.forEach((st, idx) => {
            const expectedType = expectedPattern[idx % 4];
            assert.strictEqual(st.type, expectedType, `Station ${idx + 1} (${st.id}) type mismatch: expected ${expectedType}, got ${st.type}`);
        });
    });
});

runTest('TSU Specialty IDs inherit parent deterministic 16-station path', () => {
    const tsuPath = CAREER_PATHS.getPathForCareer('tsu-robotica');
    assert(tsuPath, 'Path missing for tsu-robotica');
    assert.strictEqual(tsuPath.modules.length, 16);
    assert.strictEqual(tsuPath.totalHours, 60.0);
    assert.strictEqual(tsuPath.totalXP, 5600);
});

// 4. Zero A2 Policy
console.log('\n▶ 4. Zero A2 Policy Invariant');

runTest('Zero A2 Policy: All 11 UPBC paths have 0 stations with level A2 or A1', () => {
    UPBC_CAREERS.forEach(item => {
        const pathData = CAREER_PATHS.getPathForCareer(item.id);
        pathData.modules.forEach(st => {
            if (st.level) {
                assert.notStrictEqual(st.level.toLowerCase(), 'a1', `Station ${st.id} violates Zero A2 Policy (has A1)`);
                assert.notStrictEqual(st.level.toLowerCase(), 'a2', `Station ${st.id} violates Zero A2 Policy (has A2)`);
            }
        });
    });
});

// 5. Portals Integration: register.html
console.log('\n▶ 5. Onboarding Portal (register.html & dev/register.html)');

const regHtml = fs.readFileSync(path.join(__dirname, '../register.html'), 'utf8');
const devRegHtml = fs.readFileSync(path.join(__dirname, '../dev/register.html'), 'utf8');

runTest('register.html and dev/register.html are in 100% sync', () => {
    assert.strictEqual(regHtml, devRegHtml, 'dev/register.html must match register.html');
});

runTest('register.html includes UPBC Mexicali featured card in Step 2', () => {
    assert(regHtml.includes('data-subsystem="upbc"'), 'Step 2 missing upbc selection card');
    assert(regHtml.includes('Universidad Politécnica de Baja California'), 'Missing UPBC title');
    assert(regHtml.includes('Primer Cliente'), 'Missing Primer Cliente badge');
});

runTest('register.html includes Degree Modality toggle (Licenciatura vs TSU)', () => {
    assert(regHtml.includes('id="degree-modality-wrapper"'), 'Missing degree modality wrapper');
    assert(regHtml.includes('id="pill-degree-lic"'), 'Missing pill-degree-lic');
    assert(regHtml.includes('id="pill-degree-tsu"'), 'Missing pill-degree-tsu');
    assert(regHtml.includes('id="tsu-specialty-picker"'), 'Missing tsu-specialty-picker');
});

runTest('register.html contains UPBC demo classes', () => {
    assert(regHtml.includes('UPBC-MECA-2026'), 'Missing UPBC-MECA-2026 class');
    assert(regHtml.includes('UPBC-SEMI-2026'), 'Missing UPBC-SEMI-2026 class');
    assert(regHtml.includes('UPBC-TI-2026'), 'Missing UPBC-TI-2026 class');
    assert(regHtml.includes('UPBC-ENERGIA-2026'), 'Missing UPBC-ENERGIA-2026 class');
});

runTest('register.html stores degreeModality and tsuSpecialty in student profile', () => {
    assert(regHtml.includes('degreeModality: d.degreeModality'), 'Missing degreeModality in profile');
    assert(regHtml.includes('tsuSpecialtyId: d.tsuSpecialtyId'), 'Missing tsuSpecialtyId in profile');
    assert(regHtml.includes('stemos_active_career'), 'Missing stemos_active_career persistence');
});

// 6. Placement Test: placement.html
console.log('\n▶ 6. Placement Diagnostic (placement.html & dev/placement.html)');

const placeHtml = fs.readFileSync(path.join(__dirname, '../placement.html'), 'utf8');
const devPlaceHtml = fs.readFileSync(path.join(__dirname, '../dev/placement.html'), 'utf8');

runTest('placement.html and dev/placement.html are in 100% sync', () => {
    assert.strictEqual(placeHtml, devPlaceHtml, 'dev/placement.html must match placement.html');
});

runTest('placement.html includes UPMXL as the top institution option', () => {
    assert(placeHtml.includes('value="UPMXL"'), 'Missing UPMXL value');
    assert(placeHtml.includes('UPBC Mexicali - Cliente Fundador'), 'Missing Cliente Fundador badge in placement');
});

runTest('placement.html includes Nivel Académico and dynamic TSU specialty dropdown', () => {
    assert(placeHtml.includes('id="reg-degree-type"'), 'Missing reg-degree-type');
    assert(placeHtml.includes('id="placement-tsu-group"'), 'Missing placement-tsu-group');
    assert(placeHtml.includes('id="reg-tsu-specialty"'), 'Missing reg-tsu-specialty');
});

runTest('placement.html loads career_tracks.js and populates UPBC careers', () => {
    assert(placeHtml.includes('content/career_tracks.js'), 'career_tracks.js must be loaded in placement.html');
    assert(placeHtml.includes('populatePlacementCareers'), 'populatePlacementCareers function missing');
    assert(placeHtml.includes('populatePlacementTsuSpecialties'), 'populatePlacementTsuSpecialties missing');
});

runTest('placement.html saves student profile with degreeModality and activates career in localStorage', () => {
    assert(placeHtml.includes("localStorage.setItem('stemos_active_career'"), 'Missing stemos_active_career in finishQuiz');
    assert(placeHtml.includes("localStorage.setItem('stemos_student_profile'"), 'Missing stemos_student_profile in finishQuiz');
    assert(placeHtml.includes('id="res-career-val"'), 'Missing res-career-val in results folio card');
});

// 7. Teacher & Admin Subsystem Groupings
console.log('\n▶ 7. Teacher & Admin Subsystem Groupings');

const teacherHtml = fs.readFileSync(path.join(__dirname, '../teacher.html'), 'utf8');
const adminHtml = fs.readFileSync(path.join(__dirname, '../admin.html'), 'utf8');

runTest('teacher.html includes UPBC as first subsystem group in populateCareerTrackSelect', () => {
    assert(teacherHtml.includes("upbc: { label: 'UPBC (Universidad Politécnica de Baja California - Cliente Fundador)'"), 'Missing UPBC in teacher.html');
});

runTest('admin.html includes UPBC as first subsystem group in populateCareerTrackSelect', () => {
    assert(adminHtml.includes("upbc: { label: 'UPBC (Universidad Politécnica de Baja California - Cliente Fundador)'"), 'Missing UPBC in admin.html');
});

// Final Summary
console.log('\n═══════════════════════════════════════════════════════════════════');
console.log(`🏁 AUDIT COMPLETE: ${passedTests} Passed, ${totalTests - passedTests} Failed (out of ${totalTests} total)`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (passedTests === totalTests) {
    console.log('🎉 ALL UPBC MEXICALI INTEGRATION AUDITS PASSED WITH 100% SUCCESS!\n');
    process.exit(0);
} else {
    console.error('❌ SOME AUDITS FAILED.\n');
    process.exit(1);
}
