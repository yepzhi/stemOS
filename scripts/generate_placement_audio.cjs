/**
 * Generate Neural Audio for Placement Listening Section
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '../content/audio');
const devAudioDir = path.join(__dirname, '../dev/content/audio');

if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
if (!fs.existsSync(devAudioDir)) fs.mkdirSync(devAudioDir, { recursive: true });

const prompts = [
  { id: 'pt-test-audio', voice: 'en-US-JennyNeural', text: 'Welcome to stemOS. Audio check complete. Your speakers and speech synthesis are working perfectly.' },
  { id: 'pt-l01', voice: 'en-US-GuyNeural', text: 'Good morning, my name is Robert. My employee badge number is 4-2-9-0.' },
  { id: 'pt-l02', voice: 'en-US-JennyNeural', text: "Attention all operators. The cafeteria will be closed for cleaning from two o'clock to three o'clock this afternoon." },
  { id: 'pt-l03', voice: 'en-US-ChristopherNeural', text: 'Please place the calibrated torque wrench in Cabinet B on the top shelf.' },
  { id: 'pt-l04', voice: 'en-US-AriaNeural', text: 'Station four experienced twenty minutes of unexpected downtime yesterday because an optical sensor became loose.' },
  { id: 'pt-l05', voice: 'en-US-GuyNeural', text: 'The delivery of raw stainless steel brackets was rescheduled from Monday morning to Wednesday afternoon.' },
  { id: 'pt-l06', voice: 'en-US-ChristopherNeural', text: 'The pneumatic clamp cylinder is leaking compressed air behind the manifold. We must shut the air valve before replacing the seal.' },
  { id: 'pt-l07', voice: 'en-US-JennyNeural', text: 'If the hole diameter exceeds zero point zero five millimeters from the CAD specification, the automated robot will segregate the part into the red quarantine bin.' },
  { id: 'pt-l08', voice: 'en-US-AriaNeural', text: 'I understand your concern about delivery lead times; however, switching to an unverified local vendor poses a significant quality risk.' },
  { id: 'pt-l09', voice: 'en-US-GuyNeural', text: "We are running short on time during this engineering review. Let's table the discussion regarding the secondary filtration bracket until Friday's morning sync." },
  { id: 'pt-l10', voice: 'en-US-ChristopherNeural', text: 'Our containment action was fully effective: all fifteen hundred finished subassemblies in transit were placed on electronic hold in warehouse quarantine, confirming zero defect escapes to the customer.' }
];

console.log('🎙️ Generating High-Fidelity US Neural Audio for Placement Test...');

prompts.forEach(p => {
  const mp3Path = path.join(audioDir, `${p.id}.mp3`);
  const devMp3Path = path.join(devAudioDir, `${p.id}.mp3`);
  console.log(`Generating ${p.id}.mp3 with voice ${p.voice}...`);
  const cmd = `uv run --with edge-tts edge-tts --voice ${p.voice} --rate=-3% --text "${p.text.replace(/"/g, '\\"')}" --write-media "${mp3Path}"`;
  execSync(cmd, { stdio: 'inherit' });
  fs.copyFileSync(mp3Path, devMp3Path);
});

console.log('✅ All 11 placement audio assets successfully generated and synced!');
