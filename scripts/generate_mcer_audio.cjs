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
  { id: 'a1-u2-d1', voice: 'Samantha', text: 'Hi Javier, what shift do you work this week on Line 4?' },
  { id: 'a1-u2-d2', voice: 'Eddy', text: 'I work the first shift, from 7:00 AM to 3:30 PM, Monday through Friday.' },
  { id: 'a1-u2-d3', voice: 'Samantha', text: 'Great. When does your crew have the morning safety briefing?' },
  { id: 'a1-u2-d4', voice: 'Eddy', text: 'We always hold the safety briefing at 7:15 AM in front of the main Kanban board.' },
  { id: 'a1-u2-d5', voice: 'Samantha', text: 'And what time is your scheduled lunch break?' },
  { id: 'a1-u2-d6', voice: 'Eddy', text: 'First shift takes lunch at 11:30 AM for thirty minutes in Cafeteria B.' },
  { 
    id: 'a1-u2-dialogue-full', 
    voice: 'Samantha', 
    text: 'Elena asks: Hi Javier, what shift do you work this week on Line 4? Javier answers: I work the first shift, from 7:00 AM to 3:30 PM, Monday through Friday. Elena asks: Great. When does your crew have the morning safety briefing? Javier answers: We always hold the safety briefing at 7:15 AM in front of the main Kanban board. Elena asks: And what time is your scheduled lunch break? Javier explains: First shift takes lunch at 11:30 AM for thirty minutes in Cafeteria B.' 
  },
  { id: 'a1-u2-vocab-schedule', voice: 'Samantha', text: 'Schedule. My schedule starts at 8:00 AM sharp.' },
  { id: 'a1-u2-vocab-routine', voice: 'Samantha', text: 'Routine. Daily routines help us stay organized.' },
  { id: 'a1-u2-vocab-morning', voice: 'Samantha', text: 'Morning. I always have a team briefing in the morning.' },
  { id: 'a1-u2-vocab-afternoon', voice: 'Samantha', text: 'Afternoon. Our second session meets in the afternoon.' },
  { id: 'a1-u2-vocab-weekend', voice: 'Samantha', text: 'Weekend. Do you have classes on the weekend?' },
  { id: 'a1-u2-vocab-break', voice: 'Samantha', text: 'Break. We take a 30-minute lunch break at noon.' },
  { id: 'a1-u2-vocab-ontime', voice: 'Samantha', text: 'On Time. The meeting starts on time at 9:00 AM.' },
  { id: 'a1-u2-vocab-usually', voice: 'Samantha', text: 'Usually. I usually finish my tasks before 5:00 PM.' },
  { 
    id: 'a1-u2-listening-lab', 
    voice: 'Eddy', 
    text: 'Plant operations run on three continuous shifts. Shift 1 runs from 07:00 to 15:30. Shift 2 operates from 15:30 to 23:30. Shift 3 runs from 23:30 to 07:00. To prevent production bottlenecks, cafeteria meal times are strictly staggered: Group A dines at 11:30 AM, and Group B dines at 12:15 PM. Operators must never leave active conveyor lines unattended during break handoffs.' 
  },
  {
    id: 'a1-u2-reading-passage',
    voice: 'Samantha',
    text: 'Plant operations run on three continuous shifts. Shift 1 runs from 07:00 to 15:30. Shift 2 operates from 15:30 to 23:30. Shift 3 runs from 23:30 to 07:00. To prevent production bottlenecks, cafeteria meal times are strictly staggered: Group A dines at 11:30 AM, and Group B dines at 12:15 PM. Operators must never leave active conveyor lines unattended during break handoffs.'
  },
  {
    id: 'a1-u2-crucible-model',
    voice: 'Eddy',
    text: 'Hello Javier, first shift produced 420 finished units today on Line 4. The line ran on schedule without stoppage. We always update the digital log before leaving. Scheduled belt maintenance takes place at 4:00 PM.'
  },

  // A1 Unit 3 - Workstation Navigation, Tools & Supplies (Module 3)
  { id: 'a1-u3-d1', voice: 'Eddy', text: 'Mateo, where are the replacement optical proximity sensors?' },
  { id: 'a1-u3-d2', voice: 'Samantha', text: 'There are three sealed boxes on the middle shelf, right next to the digital calipers.' },
  { id: 'a1-u3-d3', voice: 'Eddy', text: 'Great. Is there any electrical insulation tape left in the drawer?' },
  { id: 'a1-u3-d4', voice: 'Samantha', text: 'Yes, there is a fresh roll inside the top drawer of the green mobile cart.' },
  { id: 'a1-u3-d5', voice: 'Eddy', text: 'Excellent. Please grab the 5mm hex wrench as well before we enter the cell.' },
  { id: 'a1-u3-d6', voice: 'Samantha', text: 'Got it. I have the hex wrench and sensors ready.' },
  {
    id: 'a1-u3-dialogue-full',
    voice: 'Eddy',
    text: 'Tom asks: Mateo, where are the replacement optical proximity sensors? Mateo answers: There are three sealed boxes on the middle shelf, right next to the digital calipers. Tom asks: Great. Is there any electrical insulation tape left in the drawer? Mateo replies: Yes, there is a fresh roll inside the top drawer of the green mobile cart. Tom instructs: Excellent. Please grab the 5mm hex wrench as well before we enter the cell. Mateo confirms: Got it. I have the hex wrench and sensors ready.'
  },
  { id: 'a1-u3-vocab-toolbox', voice: 'Samantha', text: 'Toolbox. There is a calibrated torque wrench in the yellow toolbox.' },
  { id: 'a1-u3-vocab-spareparts', voice: 'Samantha', text: 'Spare Parts. Spare parts are kept in Cabinet B across from the tool crib.' },
  { id: 'a1-u3-vocab-safetygoggles', voice: 'Samantha', text: 'Safety Goggles. Safety goggles are mandatory inside the production zone.' },
  { id: 'a1-u3-vocab-storagerack', voice: 'Samantha', text: 'Storage Rack. Raw materials are stacked on the lower storage rack.' },
  { id: 'a1-u3-vocab-emergencyexit', voice: 'Samantha', text: 'Emergency Exit. The emergency exit is between Line 2 and the testing bay.' },
  { id: 'a1-u3-vocab-calipers', voice: 'Samantha', text: 'Calipers. Use the digital calipers to measure the outer diameter.' },
  { id: 'a1-u3-vocab-toolcrib', voice: 'Samantha', text: 'Tool Crib. Sign out precision torque drivers at the central tool crib.' },
  {
    id: 'a1-u3-listening-lab',
    voice: 'Eddy',
    text: 'Under 5S housekeeping standards, every tool has a designated shadow outline. All specialized calibration gauges must be signed out electronically using your employee badge. Operators must clean all grease and metal shavings from calipers before returning them to Shelf 4. Never leave loose hand tools on top of active machine guards or electrical enclosures.'
  },
  {
    id: 'a1-u3-reading-passage',
    voice: 'Samantha',
    text: 'Under 5S housekeeping standards, every tool has a designated shadow outline. All specialized calibration gauges must be signed out electronically using your employee badge. Operators must clean all grease and metal shavings from calipers before returning them to Shelf 4. Never leave loose hand tools on top of active machine guards or electrical enclosures.'
  },
  {
    id: 'a1-u3-crucible-model',
    voice: 'Eddy',
    text: 'Good afternoon. There is a master Lockout/Tagout padlock cabinet on Wall C, directly between the tool crib and the automated test bay. In addition, there are two emergency eyewash stations located ten feet to your right next to the chemical rack.'
  },

  // A1 Unit 4 - Simple Directives, Safety Signs & Protocols (Module 4)
  { id: 'a1-u4-d1', voice: 'Samantha', text: 'David, please stop the feeder conveyor for a moment.' },
  { id: 'a1-u4-d2', voice: 'Eddy', text: 'Sure. Done. The red beacon is on. Is there a problem?' },
  { id: 'a1-u4-d3', voice: 'Samantha', text: 'Yes, can you hand me the 10mm Allen wrench from the magnetic tray?' },
  { id: 'a1-u4-d4', voice: 'Eddy', text: 'Here you go. Do you need an inspection flashlight as well?' },
  { id: 'a1-u4-d5', voice: 'Samantha', text: 'Yes, please. Hold it right here on the lower motor bracket.' },
  { id: 'a1-u4-d6', voice: 'Eddy', text: 'Careful! The notice says the gear housing is extremely hot.' },
  { id: 'a1-u4-d7', voice: 'Samantha', text: 'Good catch. Put on your thermal gloves before touching the casing.' },
  {
    id: 'a1-u4-dialogue-full',
    voice: 'Samantha',
    text: 'Rachel says: David, please stop the feeder conveyor for a moment. David responds: Sure. Done. The red beacon is on. Is there a problem? Rachel asks: Yes, can you hand me the 10mm Allen wrench from the magnetic tray? David replies: Here you go. Do you need an inspection flashlight as well? Rachel answers: Yes, please. Hold it right here on the lower motor bracket. David warns: Careful! The notice says the gear housing is extremely hot. Rachel confirms: Good catch. Put on your thermal gloves before touching the casing.'
  },
  { id: 'a1-u4-vocab-caution', voice: 'Samantha', text: 'Caution. Caution: Hot surface, do not touch without heat-resistant gloves.' },
  { id: 'a1-u4-vocab-earprotection', voice: 'Samantha', text: 'Ear Protection. Ear protection is required beyond this yellow boundary line.' },
  { id: 'a1-u4-vocab-shutdown', voice: 'Samantha', text: 'Shut Down. Please shut down the conveyor motor before clearing the jam.' },
  { id: 'a1-u4-vocab-authorized', voice: 'Samantha', text: 'Authorized Personnel. High-voltage enclosure: authorized licensed personnel only.' },
  { id: 'a1-u4-vocab-keepclear', voice: 'Samantha', text: 'Keep Clear. Keep this forklift corridor clear of wooden pallets at all times.' },
  { id: 'a1-u4-vocab-emergencystop', voice: 'Samantha', text: 'Emergency Stop. Hit the red mushroom emergency stop button in case of jam.' },
  { id: 'a1-u4-vocab-hardhat', voice: 'Samantha', text: 'Hard Hat. Wear your hard hat inside the overhead crane zone.' },
  {
    id: 'a1-u4-listening-lab',
    voice: 'Eddy',
    text: 'DANGER: AUTOMATIC EQUIPMENT MAY ENERGIZE OR START WITHOUT NOTICE. Always verify Lockout/Tagout de-energization before reaching into mechanical pinch points. Keep hands and loose clothing away from rotating spindle drives. Do not bypass safety interlock switches under any operational circumstances.'
  },
  {
    id: 'a1-u4-reading-passage',
    voice: 'Samantha',
    text: 'DANGER: AUTOMATIC EQUIPMENT MAY ENERGIZE OR START WITHOUT NOTICE. Always verify Lockout/Tagout de-energization before reaching into mechanical pinch points. Keep hands and loose clothing away from rotating spindle drives. Do not bypass safety interlock switches under any operational circumstances.'
  },
  {
    id: 'a1-u4-crucible-model',
    voice: 'Samantha',
    text: 'Excuse me, please stop immediately. Safety goggles and hard hats are mandatory beyond the yellow line. This is a restricted high-voltage robotic cell. Do not cross the safety interlock line. Please report to the security office to sign in.'
  },

  // ==========================================
  // LEVEL A2 (ELEMENTARY / WAYSTAGE)
  // ==========================================

  // A2 Unit 1 - Past Actions & Shift Incident Logs
  { id: 'a2-u1-d1', voice: 'Eddy', text: 'Good morning, Claudia. Here is the shift handover log for Line 4.' },
  { id: 'a2-u1-d2', voice: 'Samantha', text: 'Thanks, Luis. Did you experience any downtime during the graveyard shift?' },
  { id: 'a2-u1-d3', voice: 'Eddy', text: 'Yes, Station 4 stopped for about thirty minutes because a proximity sensor came loose.' },
  { id: 'a2-u1-d4', voice: 'Samantha', text: 'Did the maintenance technician replace the unit?' },
  { id: 'a2-u1-d5', voice: 'Eddy', text: 'No, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward.' },
  { id: 'a2-u1-d6', voice: 'Samantha', text: 'Did you log the stop in the digital MES system?' },
  { id: 'a2-u1-d7', voice: 'Eddy', text: 'Yes, I logged code E-104 and recorded thirty minutes of total downtime.' },
  {
    id: 'a2-u1-dialogue-full',
    voice: 'Samantha',
    text: 'Luis says: Good morning, Claudia. Here is the shift handover log for Line 4. Claudia asks: Thanks, Luis. Did you experience any downtime during the graveyard shift? Luis explains: Yes, Station 4 stopped for about thirty minutes because a proximity sensor came loose. Claudia asks: Did the maintenance technician replace the unit? Luis answers: No, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward. Claudia asks: Did you log the stop in the digital MES system? Luis confirms: Yes, I logged code E-104 and recorded thirty minutes of total downtime.'
  },
  { id: 'a2-u1-vocab-malfunction', voice: 'Samantha', text: 'Malfunction. The hydraulic pump malfunctioned around 11:30 AM yesterday.' },
  { id: 'a2-u1-vocab-replaced', voice: 'Samantha', text: 'Replaced. We replaced the worn timing belt during preventive maintenance.' },
  { id: 'a2-u1-vocab-inspection', voice: 'Samantha', text: 'Inspection. Quality completed the dimensional inspection this morning.' },
  { id: 'a2-u1-vocab-downtime', voice: 'Samantha', text: 'Downtime. Line 2 experienced 45 minutes of unexpected downtime.' },
  { id: 'a2-u1-vocab-logged', voice: 'Samantha', text: 'Logged. The technician logged the voltage variance in the shift binder.' },
  { id: 'a2-u1-vocab-tripped', voice: 'Samantha', text: 'Tripped. The main circuit breaker tripped due to excessive motor current.' },
  { id: 'a2-u1-vocab-calibrated', voice: 'Samantha', text: 'Calibrated. We calibrated the load cell before starting production.' },
  {
    id: 'a2-u1-listening-lab',
    voice: 'Eddy',
    text: 'Date: October 18th. Technician: R. Gomez. At 14:15, spindle drive number 3 overheated and triggered thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature stabilized at 48 degrees Celsius. Total downtime was 30 minutes.'
  },
  {
    id: 'a2-u1-reading-passage',
    voice: 'Samantha',
    text: 'Date: October 18th. Technician: R. Gomez. At 14:15, spindle drive number 3 overheated and triggered thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature stabilized at 48 degrees Celsius. Total downtime was 30 minutes.'
  },
  {
    id: 'a2-u1-crucible-model',
    voice: 'Eddy',
    text: 'Yesterday at 14:15, spindle drive number 3 overheated and tripped thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the line. Normal operating temperature stabilized at 48 degrees Celsius after thirty minutes of downtime.'
  },

  // A2 Unit 2 - Comparing Equipment, Specs & Materials
  { id: 'a2-u2-d1', voice: 'Samantha', text: 'Ken, we have two vendor quotes for our end-mill bits: carbide and cobalt steel.' },
  { id: 'a2-u2-d2', voice: 'Eddy', text: 'Cobalt steel is cheaper, but carbide tooling is much more durable at high RPMs.' },
  { id: 'a2-u2-d3', voice: 'Samantha', text: 'Will carbide survive our thermal stress specs during titanium milling?' },
  { id: 'a2-u2-d4', voice: 'Eddy', text: 'Yes, carbide is the most heat-resistant material for this aerospace bracket.' },
  { id: 'a2-u2-d5', voice: 'Samantha', text: 'Then carbide is the most cost-effective option over the full production run.' },
  { id: 'a2-u2-d6', voice: 'Eddy', text: 'Agreed. It will give us a tighter tolerance and fewer tool changes.' },
  {
    id: 'a2-u2-dialogue-full',
    voice: 'Samantha',
    text: 'Sara says: Ken, we have two vendor quotes for our end-mill bits: carbide and cobalt steel. Ken explains: Cobalt steel is cheaper, but carbide tooling is much more durable at high RPMs. Sara asks: Will carbide survive our thermal stress specs during titanium milling? Ken answers: Yes, carbide is the most heat-resistant material for this aerospace bracket. Sara says: Then carbide is the most cost-effective option over the full production run. Ken agrees: Agreed. It will give us a tighter tolerance and fewer tool changes.'
  },
  { id: 'a2-u2-vocab-durable', voice: 'Samantha', text: 'Durable. Carbide cutting tips are significantly more durable than high-speed steel.' },
  { id: 'a2-u2-vocab-lightweight', voice: 'Samantha', text: 'Lightweight. Aluminum alloys are lighter than structural carbon steel.' },
  { id: 'a2-u2-vocab-costeffective', voice: 'Samantha', text: 'Cost-Effective. Refurbishing servo drives is more cost-effective than buying replacements.' },
  { id: 'a2-u2-vocab-tolerance', voice: 'Samantha', text: 'Tolerance. The wire EDM machine holds a tighter tolerance than the CNC mill.' },
  { id: 'a2-u2-vocab-throughput', voice: 'Samantha', text: 'Throughput. The multi-spindle lathe achieves a higher throughput per hour.' },
  { id: 'a2-u2-vocab-corrosionresistant', voice: 'Samantha', text: 'Corrosion-Resistant. Stainless steel 316 is more corrosion-resistant in marine environments.' },
  {
    id: 'a2-u2-listening-lab',
    voice: 'Eddy',
    text: 'When selecting clear machine safety enclosures, polycarbonate provides 250 times the impact resistance of standard tempered glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant and marginally cheaper, polycarbonate is significantly safer for high-pressure pneumatic chip containment under ISO 14120 safety regulations.'
  },
  {
    id: 'a2-u2-reading-passage',
    voice: 'Samantha',
    text: 'When selecting clear machine safety enclosures, polycarbonate provides 250 times the impact resistance of standard tempered glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant and marginally cheaper, polycarbonate is significantly safer for high-pressure pneumatic chip containment under ISO 14120 safety regulations.'
  },
  {
    id: 'a2-u2-crucible-model',
    voice: 'Eddy',
    text: 'I recommend purchasing Tungsten Carbide inserts for the CNC milling cells. Although Carbide is twenty percent more expensive than High-Speed Steel, it is significantly more durable at high cutting speeds. It provides tighter dimensional tolerance and achieves fifteen percent higher throughput with fewer tool changes.'
  },

  // A2 Unit 3 - Scheduling, Agendas & Future Deadlines
  { id: 'a2-u3-d1', voice: 'Samantha', text: 'Good morning, Mr. Barnes. We are going to conduct our annual metrology audit next month.' },
  { id: 'a2-u3-d2', voice: 'Eddy', text: 'Hello Patricia. What dates are best for your engineering team?' },
  { id: 'a2-u3-d3', voice: 'Samantha', text: 'We are planning for Tuesday the 14th. Will your inspection crew be ready by then?' },
  { id: 'a2-u3-d4', voice: 'Eddy', text: 'Yes, I will confirm the flight details and email the calibration certificates today.' },
  { id: 'a2-u3-d5', voice: 'Samantha', text: 'Perfect. We will arrange cleanroom visitor badges before your arrival.' },
  { id: 'a2-u3-d6', voice: 'Eddy', text: 'Thank you. I will see you on the 14th at 08:30 AM.' },
  {
    id: 'a2-u3-dialogue-full',
    voice: 'Samantha',
    text: 'Patricia says: Good morning, Mr. Barnes. We are going to conduct our annual metrology audit next month. Mr. Barnes asks: Hello Patricia. What dates are best for your engineering team? Patricia replies: We are planning for Tuesday the 14th. Will your inspection crew be ready by then? Mr. Barnes answers: Yes, I will confirm the flight details and email the calibration certificates today. Patricia confirms: Perfect. We will arrange cleanroom visitor badges before your arrival. Mr. Barnes concludes: Thank you. I will see you on the 14th at 08:30 AM.'
  },
  { id: 'a2-u3-vocab-deadline', voice: 'Samantha', text: 'Deadline. The hard deadline for the pre-production sample is next Thursday.' },
  { id: 'a2-u3-vocab-reschedule', voice: 'Samantha', text: 'Reschedule. Can we reschedule the laser calibration review to 10:00 AM?' },
  { id: 'a2-u3-vocab-milestone', voice: 'Samantha', text: 'Milestone. Reaching 50,000 continuous cycles is our primary project milestone.' },
  { id: 'a2-u3-vocab-deliverydate', voice: 'Samantha', text: 'Delivery Date. The steel vendor confirmed the raw billet delivery date for Monday morning.' },
  { id: 'a2-u3-vocab-followup', voice: 'Samantha', text: 'Follow Up. I will follow up with the plant director after the ISO audit.' },
  { id: 'a2-u3-vocab-shutdown', voice: 'Samantha', text: 'Shutdown. Annual electrical substation shutdown takes place in December.' },
  {
    id: 'a2-u3-listening-lab',
    voice: 'Eddy',
    text: 'Notice: Next Saturday, November 3rd, the main electrical substation will be shut down from 06:00 to 14:00 for transformer dielectric oil analysis. Backup diesel generators will supply emergency lighting and critical server racks only. All production equipment must be fully de-energized by Friday afternoon at 17:00.'
  },
  {
    id: 'a2-u3-reading-passage',
    voice: 'Samantha',
    text: 'Notice: Next Saturday, November 3rd, the main electrical substation will be shut down from 06:00 to 14:00 for transformer dielectric oil analysis. Backup diesel generators will supply emergency lighting and critical server racks only. All production equipment must be fully de-energized by Friday afternoon at 17:00.'
  },
  {
    id: 'a2-u3-crucible-model',
    voice: 'Eddy',
    text: 'Good morning leads. We are going to conduct scheduled preventive maintenance on electrical substation B next Friday from 02:00 to 06:00 AM. Production Line 1 will shut down during this four-hour window. Backup diesel generators will supply power to cleanroom Bay 3, and normal operations will resume promptly at 06:30 AM.'
  },

  // A2 Unit 4 - Troubleshooting & Describing Problems
  { id: 'a2-u4-d1', voice: 'Eddy', text: 'Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very sluggishly.' },
  { id: 'a2-u4-d2', voice: 'Samantha', text: 'Sure. Let me check the inline pressure regulator. It shows 40 PSI, but it should be 85 PSI.' },
  { id: 'a2-u4-d3', voice: 'Eddy', text: 'Do you hear that hissing sound behind the manifold block?' },
  { id: 'a2-u4-d4', voice: 'Samantha', text: 'Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring.' },
  { id: 'a2-u4-d5', voice: 'Eddy', text: 'Understood. I will hit the pneumatic isolation valve right now.' },
  { id: 'a2-u4-d6', voice: 'Samantha', text: 'Thanks. Always bleed the residual line pressure before disconnecting the hose.' },
  {
    id: 'a2-u4-dialogue-full',
    voice: 'Samantha',
    text: 'Oscar asks: Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very sluggishly. Sam responds: Sure. Let me check the inline pressure regulator. It shows 40 PSI, but it should be 85 PSI. Oscar asks: Do you hear that hissing sound behind the manifold block? Sam answers: Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring. Oscar confirms: Understood. I will hit the pneumatic isolation valve right now. Sam concludes: Thanks. Always bleed the residual line pressure before disconnecting the hose.'
  },
  { id: 'a2-u4-vocab-leak', voice: 'Samantha', text: 'Leak. There is a hydraulic fluid leak under the main clamp cylinder.' },
  { id: 'a2-u4-vocab-vibration', voice: 'Samantha', text: 'Vibration. The blower motor has an abnormal vibration at high speeds.' },
  { id: 'a2-u4-vocab-overheating', voice: 'Samantha', text: 'Overheating. The servo controller is overheating due to blocked air ventilation.' },
  { id: 'a2-u4-vocab-tighten', voice: 'Samantha', text: 'Tighten. Please tighten the four hex bolts to 35 Newton-meters.' },
  { id: 'a2-u4-vocab-reset', voice: 'Samantha', text: 'Reset. Press and hold the blue button for three seconds to reset the PLC.' },
  { id: 'a2-u4-vocab-airpressuredrop', voice: 'Samantha', text: 'Air Pressure Drop. An air pressure drop caused the pneumatic gripper to release.' },
  {
    id: 'a2-u4-listening-lab',
    voice: 'Eddy',
    text: 'Alarm E-12 indicates pneumatic actuator timeout. Step 1: Inspect the main air supply gauge. If pressure is below 6.0 bar, verify that the facility main ball valve is open. Step 2: Check cylinder reed sensors for magnetic alignment. If the green LED does not illuminate at stroke end, adjust sensor position. Step 3: Check for audible hose leaks. Step 4: If issue persists, notify shift supervisor.'
  },
  {
    id: 'a2-u4-reading-passage',
    voice: 'Samantha',
    text: 'Alarm E-12 indicates pneumatic actuator timeout. Step 1: Inspect the main air supply gauge. If pressure is below 6.0 bar, verify that the facility main ball valve is open. Step 2: Check cylinder reed sensors for magnetic alignment. If the green LED does not illuminate at stroke end, adjust sensor position. Step 3: Check for audible hose leaks. Step 4: If issue persists, notify shift supervisor.'
  },
  {
    id: 'a2-u4-crucible-model',
    voice: 'Samantha',
    text: 'First, you must inspect the digital torque display and verify the calibration sticker is valid. Second, you have to set the target torque to exactly 45 Newton-meters. Next, you should tighten each bolt in a star sequence until the audible beep sounds. Finally, you must log the verified values on the digital quality tablet.'
  }
];

console.log(`Starting generation of ${AUDIO_ITEMS.length} static MP3 audio files...`);

for (const item of AUDIO_ITEMS) {
  const tmpAiff = `/tmp/${item.id}.aiff`;
  const outMp3 = path.join(OUTPUT_DIR, `${item.id}.mp3`);
  
  if (fs.existsSync(outMp3)) {
    console.log(`⏩ [${item.id}] already exists, skipping.`);
    continue;
  }
  
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
