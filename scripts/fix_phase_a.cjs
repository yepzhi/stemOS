/**
 * stemOS Phase A Fixer
 * 1. Fix status of 5 empty tracks from "full" to "blueprint"
 * 2. Add missing IPA pronunciations to all vocabulary terms
 */

const fs = require('fs');
const path = require('path');

const COURSES_PATH = path.join(__dirname, '..', 'content', 'courses.js');

// ============================================================
// IPA Dictionary for technical terms
// ============================================================
const IPA_DICT = {
  // Advanced Manufacturing
  "GD&T": "/ˌdʒiːˌdiːˈtiː/",
  "Datum": "/ˈdeɪ.təm/",
  "Fixture": "/ˈfɪks.tʃər/",
  "Powder-bed fusion": "/ˈpaʊ.dɚ bɛd ˈfjuː.ʒən/",
  "Topology optimization": "/təˌpɒl.ə.dʒi ˌɒp.tɪ.maɪˈzeɪ.ʃən/",
  "Sintering": "/ˈsɪn.tər.ɪŋ/",
  "Digital Twin": "/ˈdɪdʒ.ɪ.təl twɪn/",
  "Kinematics": "/ˌkɪn.ɪˈmæt.ɪks/",
  "Throughput": "/ˈθruː.pʊt/",
  "Subtractive Manufacturing": "/səbˈtræk.tɪv ˌmæn.jʊˈfæk.tʃər.ɪŋ/",
  "Spindle": "/ˈspɪn.dəl/",
  "Tolerance": "/ˈtɒl.ər.əns/",
  "Downtime": "/ˈdaʊn.taɪm/",
  "Scrap": "/skræp/",
  "Changeover": "/ˈtʃeɪndʒˌoʊ.vər/",

  // Mechatronics
  "Closed-loop": "/kloʊzd luːp/",
  "Encoder": "/ɪnˈkoʊ.dər/",
  "Overshoot": "/ˈoʊ.vər.ʃuːt/",
  "Compressible": "/kəmˈprɛs.ɪ.bəl/",
  "Solenoid valve": "/ˈsoʊ.lɪ.nɔɪd vælv/",
  "Cylinder": "/ˈsɪl.ɪn.dər/",
  "Backlash": "/ˈbæk.læʃ/",
  "Harmonic Drive": "/hɑːrˈmɒn.ɪk draɪv/",
  "Bearing": "/ˈbɛr.ɪŋ/",
  "Conduction": "/kənˈdʌk.ʃən/",
  "Convection": "/kənˈvɛk.ʃən/",
  "Heat Pipe": "/hiːt paɪp/",

  // Biotechnology
  "Genome": "/ˈdʒiː.noʊm/",
  "Enzyme": "/ˈɛn.zaɪm/",
  "Knock-out": "/ˈnɒk.aʊt/",
  "Downstream processing": "/ˌdaʊnˈstriːm ˈprɒs.ɛs.ɪŋ/",
  "Chromatography": "/ˌkroʊ.məˈtɒɡ.rə.fi/",
  "Centrifuge": "/ˈsɛn.trɪ.fjuːdʒ/",
  "Cleanroom": "/ˈkliːn.ruːm/",
  "Sterile": "/ˈstɛr.aɪl/",
  "Traceability": "/ˌtreɪ.sə.ˈbɪl.ɪ.ti/",
  "Catalyst": "/ˈkæt.ə.lɪst/",
  "Substrate": "/ˈsʌb.streɪt/",
  "Kinetics": "/kɪˈnɛt.ɪks/",

  // Space & Satellite
  "Attitude": "/ˈæt.ɪ.tjuːd/",
  "Payload": "/ˈpeɪ.loʊd/",
  "Subsystem": "/ˈsʌb.sɪs.təm/",
  "Cryogenic": "/ˌkraɪ.oʊˈdʒɛn.ɪk/",
  "Oxidizer": "/ˈɒk.sɪ.daɪ.zər/",
  "Thrust": "/θrʌst/",
  "Telemetry": "/tɪˈlɛm.ɪ.tri/",
  "Orbit": "/ˈɔːr.bɪt/",
  "Antenna": "/ænˈtɛn.ə/",
  "Radiation": "/ˌreɪ.diˈeɪ.ʃən/",
  "Debris": "/dəˈbriː/",
  "Redundancy": "/rɪˈdʌn.dən.si/",

  // Environmental & Sustainability
  "Effluent": "/ˈɛf.lu.ənt/",
  "Membrane": "/ˈmɛm.breɪn/",
  "Brine": "/braɪn/",
  "Flue gas": "/fluː ɡæs/",
  "Solvent": "/ˈsɒl.vənt/",
  "Aquifer": "/ˈæk.wɪ.fər/",
  "Linear": "/ˈlɪn.i.ər/",
  "Scope": "/skoʊp/",
  "Supply chain": "/səˈplaɪ tʃeɪn/",
  "Audit": "/ˈɔː.dɪt/",
  "Compliance": "/kəmˈplaɪ.əns/",
  "Landfill": "/ˈlænd.fɪl/",

  // Materials & Nanotech
  "Lattice": "/ˈlæt.ɪs/",
  "Semiconductor": "/ˌsɛm.i.kənˈdʌk.tər/",
  "Chirality": "/kaɪˈræl.ɪ.ti/",
  "Resolution": "/ˌrɛz.əˈluː.ʃən/",
  "Vacuum": "/ˈvæk.juːm/",
  "Topography": "/təˈpɒɡ.rə.fi/",
  "Plasma": "/ˈplæz.mə/",
  "Volatile": "/ˈvɒl.ə.taɪl/",
  "Alloy": "/ˈæl.ɔɪ/",
  "Polymer": "/ˈpɒl.ɪ.mər/",
  "Resistance": "/rɪˈzɪs.təns/",

  // Project Management
  "Dependency": "/dɪˈpɛn.dən.si/",
  "Critical Path": "/ˈkrɪt.ɪ.kəl pæθ/",
  "Resource Leveling": "/rɪˈsɔːrs ˈlɛv.əl.ɪŋ/",
  "Severity": "/sɪˈvɛr.ɪ.ti/",
  "Mitigation": "/ˌmɪt.ɪˈɡeɪ.ʃən/",
  "Detection": "/dɪˈtɛk.ʃən/",
  "Stakeholder": "/ˈsteɪk.hoʊl.dər/",
  "Compromise": "/ˈkɒm.prə.maɪz/",
  "Scope Creep": "/skoʊp kriːp/",
  "Deliverable": "/dɪˈlɪv.ər.ə.bəl/",
  "Milestone": "/ˈmaɪl.stoʊn/",

  // Entrepreneurship
  "Equity": "/ˈɛk.wɪ.ti/",
  "Dilution": "/daɪˈluː.ʃən/",
  "Venture Capital": "/ˈvɛn.tʃər ˈkæp.ɪ.təl/",
  "Valuation": "/ˌvæl.juˈeɪ.ʃən/",
  "Vesting": "/ˈvɛs.tɪŋ/",
  "Liquidation": "/ˌlɪk.wɪˈdeɪ.ʃən/",
  "Minimum Viable Product": "/ˈmɪn.ɪ.məm ˈvaɪ.ə.bəl ˈprɒd.ʌkt/",
  "Pivot": "/ˈpɪv.ət/",
  "Hypothesis": "/haɪˈpɒθ.ɪ.sɪs/",
  "Patent": "/ˈpæt.ənt/",
  "Royalty": "/ˈrɔɪ.əl.ti/",
  "Reverse Engineering": "/rɪˈvɜːrs ˌɛn.dʒɪˈnɪər.ɪŋ/",
};

// Read the file
let content = fs.readFileSync(COURSES_PATH, 'utf-8');

// ============================================================
// FIX 1: Change status of empty tracks
// ============================================================
const emptyTracks = [
  'industrial-operations',
  'healthcare-tech',
  'food-science',
  'hospitality-food',
  'business-leadership'
];

const lines = content.split('\n');
let currentTrackId = '';
let fixCount = 0;

for (let i = 0; i < lines.length; i++) {
  const idMatch = lines[i].match(/"id":\s*"([a-z-]+)"/);
  if (idMatch) currentTrackId = idMatch[1];

  if (emptyTracks.includes(currentTrackId) && lines[i].includes('"status": "full"')) {
    lines[i] = lines[i].replace('"status": "full"', '"status": "blueprint"');
    console.log(`✅ Fixed status: ${currentTrackId} → blueprint (line ${i + 1})`);
    fixCount++;
    currentTrackId = '';
  }
}

content = lines.join('\n');
console.log(`\nStatus fixes: ${fixCount}\n`);

// ============================================================
// FIX 2: Add missing IPA to vocabulary terms
// ============================================================
let ipaFixCount = 0;

eval(content);

for (const trackId of Object.keys(LXP_COURSES)) {
  const track = LXP_COURSES[trackId];
  for (const mod of (track.modules || [])) {
    for (const reading of (mod.readings || [])) {
      for (const vocab of (reading.vocabulary || [])) {
        if (!vocab.ipa && vocab.en) {
          const ipaVal = IPA_DICT[vocab.en];
          if (ipaVal) {
            vocab.ipa = ipaVal;
            ipaFixCount++;
          } else {
            console.log(`⚠️  No IPA mapping for: "${vocab.en}" (${reading.id})`);
          }
        }
      }
    }
  }
}

console.log(`\nIPA fixes applied: ${ipaFixCount}`);

// ============================================================
// WRITE BACK
// ============================================================
let output = `/**\n * stemOS LXP Course Content Database\n * ====================================\n * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks\n */\n\nvar LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};\n\nvar LXP_COURSES = ${JSON.stringify(LXP_COURSES, null, 4)};\n`;

fs.writeFileSync(COURSES_PATH, output, 'utf-8');
console.log(`\n✅ Written to ${COURSES_PATH}`);
console.log(`File size: ${(Buffer.byteLength(output) / 1024 / 1024).toFixed(2)} MB`);
