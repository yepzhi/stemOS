const fs = require('fs');
const path = require('path');
const mod = require('../content/mcer_tracks.js');

function normalizeKey(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const units = ['b1-u1', 'b1-u2', 'b1-u3', 'b1-u4', 'b2-u1', 'b2-u2', 'b2-u3', 'b2-u4'];
const entries = [];

units.forEach(uid => {
  const u = mod.getUnitById(uid);
  const dLines = Array.isArray(u.dialogue) ? u.dialogue : (u.dialogue && u.dialogue.lines ? u.dialogue.lines : []);
  
  entries.push(`    // === Unit ${u.id.toUpperCase()}: ${u.title} ===`);

  // 1. Dialogue turns
  dLines.forEach((d, idx) => {
    const id = `${u.id}-d${idx + 1}`;
    entries.push(`    [normalizeKey(${JSON.stringify(d.text)})]: '/content/audio/mcer/${id}.mp3',`);
  });

  // 2. Full dialogue (both raw join and 'Speaker says:' join)
  const fullRaw = dLines.map(d => d.text).join(' ');
  const fullPrefixed = dLines.map(d => `${d.speaker || 'Speaker'} says: ${d.text || ''}`).join('. ');
  entries.push(`    [normalizeKey(${JSON.stringify(fullRaw)})]: '/content/audio/mcer/${u.id}-dialogue-full.mp3',`);
  entries.push(`    [normalizeKey(${JSON.stringify(fullPrefixed)})]: '/content/audio/mcer/${u.id}-dialogue-full.mp3',`);

  // 3. Vocab
  (u.vocabulary || []).forEach(v => {
    const slug = v.term.toLowerCase().replace(/[^a-z0-9]/g, '');
    const id = `${u.id}-vocab-${slug}`;
    entries.push(`    [normalizeKey(${JSON.stringify(v.term)})]: '/content/audio/mcer/${id}.mp3',`);
    entries.push(`    [normalizeKey(${JSON.stringify(`${v.term}. ${v.example}`)})]: '/content/audio/mcer/${id}.mp3',`);
  });

  // 4. Pronunciation lab
  (u.pronunciationLab || []).forEach(p => {
    const word = p.word || p.term;
    const slug = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    const id = `${u.id}-pron-${slug}`;
    entries.push(`    [normalizeKey(${JSON.stringify(word)})]: '/content/audio/mcer/${id}.mp3',`);
  });

  // 5. Listening lab
  if (u.listeningLab && u.listeningLab.audioScript) {
    entries.push(`    [normalizeKey(${JSON.stringify(u.listeningLab.audioScript)})]: '/content/audio/mcer/${u.id}-listening-lab.mp3',`);
  }

  // 6. Reading passage
  const rPassage = u.reading ? (u.reading.passage || u.reading.text) : null;
  if (rPassage) {
    entries.push(`    [normalizeKey(${JSON.stringify(rPassage)})]: '/content/audio/mcer/${u.id}-reading-passage.mp3',`);
  }

  // 7. Crucible model response
  if (u.crucible && u.crucible.modelResponse) {
    entries.push(`    [normalizeKey(${JSON.stringify(u.crucible.modelResponse)})]: '/content/audio/mcer/${u.id}-crucible-model.mp3',`);
  }
});

const outJs = entries.join('\n');
fs.writeFileSync(path.join(__dirname, 'mcer_b1_b2_map_entries.txt'), outJs, 'utf8');
console.log(`Wrote ${entries.length} map entries to scripts/mcer_b1_b2_map_entries.txt`);

