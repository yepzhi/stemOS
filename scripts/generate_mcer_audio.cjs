const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../content/audio/mcer');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const AUDIO_ITEMS = [
  // A1 Unit 1 - Dialogue turns
  { id: 'a1-u1-d1', voice: 'Eddy', text: 'Good morning! Welcome to the team. Are you Alex Rivera?' },
  { id: 'a1-u1-d2', voice: 'Samantha', text: 'Good morning, Mark. Yes, I am. It is a pleasure to meet you in person.' },
  { id: 'a1-u1-d3', voice: 'Eddy', text: 'It is great to meet you too, Alex. How do you spell your last name?' },
  { id: 'a1-u1-d4', voice: 'Samantha', text: 'It is R-I-V-E-R-A. Rivera. What is your email address?' },
  { id: 'a1-u1-d5', voice: 'Eddy', text: 'My email is mark@stemos.org. Welcome aboard!' },
  { id: 'a1-u1-d6', voice: 'Samantha', text: 'Thank you, Mark. I am very happy to be here.' },
  { 
    id: 'a1-u1-dialogue-full', 
    voice: 'Samantha', 
    text: 'Mark says: Good morning! Welcome to the team. Are you Alex Rivera? Alex replies: Good morning, Mark. Yes, I am. It is a pleasure to meet you in person. Mark asks: It is great to meet you too, Alex. How do you spell your last name? Alex says: It is R-I-V-E-R-A. Rivera. What is your email address? Mark answers: My email is mark@stemos.org. Welcome aboard! Alex concludes: Thank you, Mark. I am very happy to be here.' 
  },

  // A1 Unit 1 - Vocabulary (Word + Example)
  { id: 'a1-u1-vocab-hello', voice: 'Samantha', text: 'Hello. Hello! My name is Alex.' },
  { id: 'a1-u1-vocab-welcome', voice: 'Samantha', text: 'Welcome. Welcome to our team.' },
  { id: 'a1-u1-vocab-name', voice: 'Samantha', text: 'Name. What is your last name?' },
  { id: 'a1-u1-vocab-student', voice: 'Samantha', text: 'Student. Are you a new student here?' },
  { id: 'a1-u1-vocab-coworker', voice: 'Samantha', text: 'Coworker. Diana is my new coworker.' },
  { id: 'a1-u1-vocab-pleasure', voice: 'Samantha', text: 'Pleasure. It is a pleasure to meet you.' },
  { id: 'a1-u1-vocab-colleague', voice: 'Samantha', text: 'Colleague. Mark is an experienced colleague.' },
  { id: 'a1-u1-vocab-morning', voice: 'Samantha', text: 'Morning. Good morning, everyone.' },

  // A1 Unit 1 - Pronunciation Lab
  { id: 'a1-u1-pron-colleague', voice: 'Samantha', text: 'Colleague' },
  { id: 'a1-u1-pron-pleasure', voice: 'Samantha', text: 'Pleasure' },
  { id: 'a1-u1-pron-student', voice: 'Samantha', text: 'Student' },

  // A1 Unit 1 - Listening Lab Dispatch
  { 
    id: 'a1-u1-listening-lab', 
    voice: 'Eddy', 
    text: 'Good morning. All incoming engineering interns must step to Window 2. Please state your full legal name, spelling your last name clearly, and provide your university affiliate identification number. Remember that visitor badges are temporary and expire daily at seventeen hundred hours.' 
  },

  // A1 Unit 1 - Reading Passage
  {
    id: 'a1-u1-reading-passage',
    voice: 'Samantha',
    text: 'Welcome to Northern Tech Manufacturing Facility. All incoming engineering interns must complete their security credential verification by 08:30 AM on Day One. Please bring your official university credentials and emergency contact sheet to Human Resources on the second floor, Room 210. Assigned equipment lockers are located in Corridor B. Personal cell phones must remain inside your locker during active machine operations.'
  },

  // A1 Unit 1 - Plant Crucible Model Response
  {
    id: 'a1-u1-crucible-model',
    voice: 'Eddy',
    text: 'Good morning. My name is Alex Rivera, employee number 84029. I am the new mechatronics intern assigned to Sub-Assembly Line 3 under shift supervisor Mark Reynolds.'
  },

  // A1 Unit 2 - Dialogue & Vocabulary (Module 2)
  { id: 'a1-u2-d1', voice: 'Eddy', text: 'Good morning, team. Today we review equipment safety procedures on the shop floor.' },
  { id: 'a1-u2-d2', voice: 'Samantha', text: 'Understood, Steve. I have inspected my personal protective equipment.' },
  { id: 'a1-u2-dialogue-full', voice: 'Samantha', text: 'Good morning, team. Today we review equipment safety procedures on the shop floor. Understood, Steve. I have inspected my personal protective equipment.' },
  { id: 'a1-u2-vocab-safety', voice: 'Samantha', text: 'Safety. Safety is our top operational priority.' },
  { id: 'a1-u2-vocab-inspection', voice: 'Samantha', text: 'Inspection. Daily machine inspection begins at seven AM.' },
  { id: 'a1-u2-listening-lab', voice: 'Eddy', text: 'Attention technicians. Line 2 conveyor speed is calibrated at point five meters per second. Maintain safe distance.' }
];

console.log(`Starting generation of ${AUDIO_ITEMS.length} static MP3 audio files...`);

for (const item of AUDIO_ITEMS) {
  const tmpAiff = `/tmp/${item.id}.aiff`;
  const outMp3 = path.join(OUTPUT_DIR, `${item.id}.mp3`);
  
  try {
    // 1. Run say
    execSync(`say -v "${item.voice}" -o "${tmpAiff}" "${item.text.replace(/"/g, '\\"')}"`);
    // 2. Convert with ffmpeg to standard web MP3
    execSync(`ffmpeg -y -i "${tmpAiff}" -codec:a libmp3lame -qscale:a 3 "${outMp3}" 2>/dev/null`);
    // 3. Remove temp file
    if (fs.existsSync(tmpAiff)) fs.unlinkSync(tmpAiff);

    const stats = fs.statSync(outMp3);
    console.log(`✓ [${item.id}] -> ${outMp3} (${Math.round(stats.size / 1024)} KB)`);
  } catch (err) {
    console.error(`Error generating ${item.id}:`, err.message);
  }
}

console.log('Static audio generation completed successfully!');
