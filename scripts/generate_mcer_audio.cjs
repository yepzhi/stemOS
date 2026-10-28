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
,

  // Dynamic B1 & B2 Audio Items (8 Units, 158 Items)
  // === Unit B1-U1: Explaining Workflows & Standard Operating Procedures ===
  { id: 'b1-u1-d1', voice: 'Samantha', text: "Brian, could you walk me through the inspection sequence for this stamped bracket?" },
  { id: 'b1-u1-d2', voice: 'Eddy', text: "Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge." },
  { id: 'b1-u1-d3', voice: 'Samantha', text: "What occurs if a hole diameter is out of specification?" },
  { id: 'b1-u1-d4', voice: 'Eddy', text: "If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES." },
  { id: 'b1-u1-d5', voice: 'Samantha', text: "And once the lot passes all three dimensional checks?" },
  { id: 'b1-u1-d6', voice: 'Eddy', text: "Subsequently, the lot traveler is stamped and the parts are routed to the powder-coating line." },
  { id: 'b1-u1-dialogue-full', voice: 'Samantha', text: "Andrea says: Brian, could you walk me through the inspection sequence for this stamped bracket?. Brian says: Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge.. Andrea says: What occurs if a hole diameter is out of specification?. Brian says: If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES.. Andrea says: And once the lot passes all three dimensional checks?. Brian says: Subsequently, the lot traveler is stamped and the parts are routed to the powder-coating line." },
  { id: 'b1-u1-vocab-standardoperatingproceduresop', voice: 'Samantha', text: "Standard Operating Procedure (SOP). All operators must follow the approved SOP to ensure repeatable quality." },
  { id: 'b1-u1-vocab-sequential', voice: 'Samantha', text: "Sequential. The test protocol requires strict sequential execution of five steps." },
  { id: 'b1-u1-vocab-discrepancy', voice: 'Samantha', text: "Discrepancy. A dimensional discrepancy was detected between CAD and physical part." },
  { id: 'b1-u1-vocab-calibrated', voice: 'Samantha', text: "Calibrated. The micrometer is calibrated every six months according to ISO 17025." },
  { id: 'b1-u1-vocab-rootcause', voice: 'Samantha', text: "Root Cause. The engineering team investigated the root cause of the weld fracture." },
  { id: 'b1-u1-vocab-quarantine', voice: 'Samantha', text: "Quarantine. Non-conforming lots are segregated in the red quarantine cage." },
  { id: 'b1-u1-pron-automation', voice: 'Samantha', text: "Automation" },
  { id: 'b1-u1-pron-programmable', voice: 'Samantha', text: "Programmable" },
  { id: 'b1-u1-pron-proximity', voice: 'Samantha', text: "Proximity" },
  { id: 'b1-u1-listening-lab', voice: 'Samantha', text: "Welcome to Line 1 SMT workflow overview. First, solder paste is automatically applied to bare printed circuit boards via a high-precision stencil printer. Next, passive components are placed by dual-head pick-and-place robots at fifty thousand components per hour. Finally, assemblies are conveyed through a ten-zone convection reflow oven where solder joints are formed under a nitrogen atmosphere." },
  { id: 'b1-u1-reading-passage', voice: 'Samantha', text: "Purpose: To verify surface mount component alignment. Procedure: Once PCBs enter the inspection conveyor, dual 4K cameras capture top-side fiducial markers. Image processing algorithms compare component placement against Gerber design files. If any capacitor or IC exceeds 0.05mm tilt, the PCB is automatically routed to the manual rework station for microscopic audit." },
  { id: 'b1-u1-crucible-model', voice: 'Eddy', text: "During automated packaging, optical sensor S-2 on conveyor three intermittently drops its 24-volt DC signal. If the translucent blister pack reflects ambient LED light, the sensor beam deflects and the PLC ladder logic fails to trigger the pneumatic pusher. We adjusted the optical gain potentiometer and shielded the sensor bracket, which restored full operational cycle throughput." },
  // === Unit B1-U2: Professional Email Correspondence & Status Reports ===
  { id: 'b1-u2-d1', voice: 'Samantha', text: "Daniel, have you drafted the status update email to the Detroit client?" },
  { id: 'b1-u2-d2', voice: 'Eddy', text: "Yes, Jessica. I have outlined the three completed milestones and attached the FEA stress simulation." },
  { id: 'b1-u2-d3', voice: 'Samantha', text: "Did you mention that we need their sign-off on the revised mounting bracket by Friday?" },
  { id: 'b1-u2-d4', voice: 'Eddy', text: "Yes, I wrote: \"Could you please confirm your formal approval of drawing Rev-C by Friday at 16:00 EST?\"" },
  { id: 'b1-u2-d5', voice: 'Samantha', text: "Excellent wording. That sets a clear timeline without sounding confrontational." },
  { id: 'b1-u2-dialogue-full', voice: 'Samantha', text: "Jessica says: Daniel, have you drafted the status update email to the Detroit client?. Daniel says: Yes, Jessica. I have outlined the three completed milestones and attached the FEA stress simulation.. Jessica says: Did you mention that we need their sign-off on the revised mounting bracket by Friday?. Daniel says: Yes, I wrote: \"Could you please confirm your formal approval of drawing Rev-C by Friday at 16:00 EST?\". Jessica says: Excellent wording. That sets a clear timeline without sounding confrontational." },
  { id: 'b1-u2-vocab-deliverable', voice: 'Samantha', text: "Deliverable. The preliminary CAD drawing is our primary deliverable this week." },
  { id: 'b1-u2-vocab-actionitem', voice: 'Samantha', text: "Action Item. Please review the action items listed at the end of the meeting minutes." },
  { id: 'b1-u2-vocab-inquiry', voice: 'Samantha', text: "Inquiry. We received an inquiry from the customer regarding thermal tolerances." },
  { id: 'b1-u2-vocab-attached', voice: 'Samantha', text: "Attached. Please find attached the signed inspection sign-off sheet." },
  { id: 'b1-u2-vocab-followup', voice: 'Samantha', text: "Follow-Up. I am writing to follow up on our phone conversation from Tuesday." },
  { id: 'b1-u2-vocab-signoff', voice: 'Samantha', text: "Sign-Off. We obtained executive sign-off from the client director." },
  { id: 'b1-u2-pron-deviation', voice: 'Samantha', text: "Deviation" },
  { id: 'b1-u2-pron-capability', voice: 'Samantha', text: "Capability" },
  { id: 'b1-u2-pron-statistical', voice: 'Samantha', text: "Statistical" },
  { id: 'b1-u2-listening-lab', voice: 'Eddy', text: "Hello quality team. Following up on my email regarding the plastic injection batch 402. We noticed minor sink marks near the structural rib bosses. Could you please provide an official 8D containment report by tomorrow midday? We also request that you place remaining warehouse inventory on quarantine hold until corrective tooling inserts arrive." },
  { id: 'b1-u2-reading-passage', voice: 'Samantha', text: "Subject: Weekly Project Status Update: Assembly Line #5 Ramp-Up. Dear Operations Committee: We have successfully completed Milestone 2 on schedule. Cycle time has been reduced from 45 seconds to 38.2 seconds, meeting our Phase-1 KPI target. Action Items: (1) Vendor will deliver replacement servo drive by Wednesday. (2) Quality team will conduct Gage R&R validation on Friday. Please find attached the full telemetry dataset." },
  { id: 'b1-u2-crucible-model', voice: 'Eddy', text: "Our statistical process control chart shows that the machining diameter has drifted toward the upper specification limit, causing our Cpk capability index to drop from 1.67 to 1.18. This dimensional variation was caused by thermal expansion of the lathe spindle during high-ambient afternoon shifts. We have installed a closed-loop coolant refrigeration jacket to stabilize thermal equilibrium and maintain 1.67 Cpk." },
  // === Unit B1-U3: Technical Phone Calls, Standups & Clarifications ===
  { id: 'b1-u3-d1', voice: 'Eddy', text: "Good morning, Gabriela. Could you run through yesterday’s yield numbers on the EV battery trays?" },
  { id: 'b1-u3-d2', voice: 'Samantha', text: "Good morning, Kevin. Yesterday we reached a first-pass yield of 97.4%, which is an increase of 2.1%." },
  { id: 'b1-u3-d3', voice: 'Eddy', text: "That sounds promising. Did you encounter any porosity issues on the friction stir welds?" },
  { id: 'b1-u3-d4', voice: 'Samantha', text: "I am sorry, the connection cut out for a second. Could you repeat that last question, please?" },
  { id: 'b1-u3-d5', voice: 'Eddy', text: "Sure! I asked if you observed any porosity defects on the weld seams." },
  { id: 'b1-u3-d6', voice: 'Samantha', text: "Understood. We observed zero porosity on ultrasonic testing. All fifty welds met ISO 25239 specs." },
  { id: 'b1-u3-dialogue-full', voice: 'Samantha', text: "Kevin says: Good morning, Gabriela. Could you run through yesterday’s yield numbers on the EV battery trays?. Gabriela says: Good morning, Kevin. Yesterday we reached a first-pass yield of 97.4%, which is an increase of 2.1%.. Kevin says: That sounds promising. Did you encounter any porosity issues on the friction stir welds?. Gabriela says: I am sorry, the connection cut out for a second. Could you repeat that last question, please?. Kevin says: Sure! I asked if you observed any porosity defects on the weld seams.. Gabriela says: Understood. We observed zero porosity on ultrasonic testing. All fifty welds met ISO 25239 specs." },
  { id: 'b1-u3-vocab-clarify', voice: 'Samantha', text: "Clarify. Could you clarify whether the tolerance is plus or minus 0.02mm?" },
  { id: 'b1-u3-vocab-catchup', voice: 'Samantha', text: "Catch Up. Let us catch up on the supplier audit action items after the call." },
  { id: 'b1-u3-vocab-breakdown', voice: 'Samantha', text: "Break Down. Can you break down the failure rates by operating temperature?" },
  { id: 'b1-u3-vocab-runthrough', voice: 'Samantha', text: "Run Through. Let me run through the four critical checklist items before we hang up." },
  { id: 'b1-u3-vocab-bottleneck', voice: 'Samantha', text: "Bottleneck. The manual deburring station is our primary throughput bottleneck." },
  { id: 'b1-u3-vocab-standup', voice: 'Samantha', text: "Standup. We hold a 15-minute virtual standup every morning at 08:00." },
  { id: 'b1-u3-pron-hydraulic', voice: 'Samantha', text: "Hydraulic" },
  { id: 'b1-u3-pron-pneumatic', voice: 'Samantha', text: "Pneumatic" },
  { id: 'b1-u3-pron-oscilloscope', voice: 'Samantha', text: "Oscilloscope" },
  { id: 'b1-u3-listening-lab', voice: 'Eddy', text: "Morning everyone. Let us start our 15-minute cross-border standup. Yesterday, the embedded software sprint completed the CAN bus communication stack. Today, we are validating telemetry packets over the wireless gateway. Our sole blocker is that we are waiting for updated pinout schematics from the hardware hardware team in Austin. Could someone clarify who owns that deliverable?" },
  { id: 'b1-u3-reading-passage', voice: 'Samantha', text: "International remote engineering calls require structured communication. (1) State your main point concisely: \"Yesterday I completed X, today I am working on Y, and my blocker is Z.\" (2) Never hesitate to seek clarification if an acoustic drop or technical acronym is unfamiliar. Use professional formulas such as \"Could you please rephrase that?\" (3) Conclude calls by confirming assigned ownership." },
  { id: 'b1-u3-crucible-model', voice: 'Eddy', text: "We investigated the sudden pressure drop from 200 bar down to 85 bar on Stamping Press #4. If the pilot-operated relief valve sticks open, the primary cylinder cannot build required forming tonnage. We de-energized the hydraulic power unit, tagged out the motor, and disassembled manifold block B. We discovered a ruptured fluoroelastomer O-ring seal, which was replaced and tested successfully under 220 bar." },
  // === Unit B1-U4: Constructive Disagreements, Solutions & 8D Actions ===
  { id: 'b1-u4-d1', voice: 'Eddy', text: "I believe the micro-cracks on the stampings are caused by inadequate hydraulic oil lubrication." },
  { id: 'b1-u4-d2', voice: 'Samantha', text: "I see your point, Richard; however, our lubricant viscosity logs show normal readings across all three shifts." },
  { id: 'b1-u4-d3', voice: 'Eddy', text: "What else could explain the repeated shear tear-out on the corner radii?" },
  { id: 'b1-u4-d4', voice: 'Samantha', text: "If we inspect the carbide die under magnification, we will see that tool wear exceeded 0.08mm. The data suggests tool fatigue is the primary root cause." },
  { id: 'b1-u4-d5', voice: 'Eddy', text: "That makes sense. If we swap out the die insert today, we can run a test batch of fifty parts." },
  { id: 'b1-u4-d6', voice: 'Samantha', text: "Agreed. That will validate our D5 corrective action before we submit the 8D report." },
  { id: 'b1-u4-dialogue-full', voice: 'Samantha', text: "Richard says: I believe the micro-cracks on the stampings are caused by inadequate hydraulic oil lubrication.. Valeria says: I see your point, Richard; however, our lubricant viscosity logs show normal readings across all three shifts.. Richard says: What else could explain the repeated shear tear-out on the corner radii?. Valeria says: If we inspect the carbide die under magnification, we will see that tool wear exceeded 0.08mm. The data suggests tool fatigue is the primary root cause.. Richard says: That makes sense. If we swap out the die insert today, we can run a test batch of fifty parts.. Valeria says: Agreed. That will validate our D5 corrective action before we submit the 8D report." },
  { id: 'b1-u4-vocab-countermeasure', voice: 'Samantha', text: "Countermeasure. The permanent countermeasure is to install optical safety interlocks." },
  { id: 'b1-u4-vocab-compromise', voice: 'Samantha', text: "Compromise. We reached an engineering compromise on the wall thickness." },
  { id: 'b1-u4-vocab-containment', voice: 'Samantha', text: "Containment. Immediate containment was implemented by 100% sorting of finished goods." },
  { id: 'b1-u4-vocab-ishikawadiagram', voice: 'Samantha', text: "Ishikawa Diagram. The team completed an Ishikawa diagram to map out contributing factors." },
  { id: 'b1-u4-vocab-correctiveaction', voice: 'Samantha', text: "Corrective Action. CAPA #402 requires re-tooling the injection nozzle." },
  { id: 'b1-u4-vocab-nonconforming', voice: 'Samantha', text: "Non-Conforming. Twenty non-conforming shafts were segregated from the assembly bay." },
  { id: 'b1-u4-pron-logistics', voice: 'Samantha', text: "Logistics" },
  { id: 'b1-u4-pron-procurement', voice: 'Samantha', text: "Procurement" },
  { id: 'b1-u4-pron-inventory', voice: 'Samantha', text: "Inventory" },
  { id: 'b1-u4-listening-lab', voice: 'Samantha', text: "I appreciate your proposal to tighten shaft tolerances to five microns, but if we adopt that specification, machining cycle times will increase by forty percent. Furthermore, tool wear will escalate significantly. It seems to me that we could achieve identical structural concentricity by improving our fixture clamping rigidity instead." },
  { id: 'b1-u4-reading-passage', voice: 'Samantha', text: "The 8D (Eight Disciplines) problem-solving standard is required by global automotive and aerospace OEMs under IATF 16949. Discipline 3 requires immediate containment within 24 hours to protect the customer from defect escapes. Disciplines 4 and 5 demand rigorous root-cause identification using 5-Why analysis and verification of permanent corrective actions. Discipline 7 updates institutional FMEAs to prevent recurrence across sister plants." },
  { id: 'b1-u4-crucible-model', voice: 'Eddy', text: "We are tracking shipment lot #489 containing 5,000 automotive microcontroller units currently held at Otay Mesa customs for tariff classification review. Our customs broker submitted revised manufacturer certificates of origin this morning. If customs releases the bonded trailer by 14:00, our dedicated carrier will deliver the crates directly to the Mexicali plant dock before the third shift begins, avoiding any assembly downtime." },
  // === Unit B2-U1: Engineering Change Orders & Technical Specs ===
  { id: 'b2-u1-d1', voice: 'Eddy', text: "Elena, we received Engineering Change Order ECO-884 from the automotive OEM in Detroit." },
  { id: 'b2-u1-d2', voice: 'Samantha', text: "What is the scope of the revision, Marcus? Does it impact our active tooling?" },
  { id: 'b2-u1-d3', voice: 'Eddy', text: "The customer increased the heat-sink fin thickness by 1.2 millimeters to improve thermal dissipation during fast-charging." },
  { id: 'b2-u1-d4', voice: 'Samantha', text: "Will our existing stamping progressive dies have to be re-machined?" },
  { id: 'b2-u1-d5', voice: 'Eddy', text: "Yes, the die cavity must be modified by EDM, which requires a three-day maintenance window. However, unit manufacturing cost remains unchanged." },
  { id: 'b2-u1-d6', voice: 'Samantha', text: "Make sure that all work-in-progress inventory is quarantined before the new drawing revision takes effect on Monday." },
  { id: 'b2-u1-dialogue-full', voice: 'Samantha', text: "Marcus says: Elena, we received Engineering Change Order ECO-884 from the automotive OEM in Detroit.. Elena says: What is the scope of the revision, Marcus? Does it impact our active tooling?. Marcus says: The customer increased the heat-sink fin thickness by 1.2 millimeters to improve thermal dissipation during fast-charging.. Elena says: Will our existing stamping progressive dies have to be re-machined?. Marcus says: Yes, the die cavity must be modified by EDM, which requires a three-day maintenance window. However, unit manufacturing cost remains unchanged.. Elena says: Make sure that all work-in-progress inventory is quarantined before the new drawing revision takes effect on Monday." },
  { id: 'b2-u1-vocab-engineeringchangeordereco', voice: 'Samantha', text: "Engineering Change Order (ECO). ECO #901 modifies the mounting flange thickness from 3mm to 4.5mm." },
  { id: 'b2-u1-vocab-billofmaterialsbom', voice: 'Samantha', text: "Bill of Materials (BOM). The multi-level BOM was updated to reflect the new silicone O-rings." },
  { id: 'b2-u1-vocab-deviationpermit', voice: 'Samantha', text: "Deviation Permit. The OEM granted a deviation permit for batch #45 to prevent production halt." },
  { id: 'b2-u1-vocab-traceability', voice: 'Samantha', text: "Traceability. Full QR laser-etched traceability is mandatory under ISO 9001:2015." },
  { id: 'b2-u1-vocab-scraprate', voice: 'Samantha', text: "Scrap Rate. The automated deburring cell reduced the overall scrap rate to 0.4%." },
  { id: 'b2-u1-vocab-obsolescence', voice: 'Samantha', text: "Obsolescence. We issued an ECO due to electronic microcontroller obsolescence." },
  { id: 'b2-u1-pron-hypothesis', voice: 'Samantha', text: "Hypothesis" },
  { id: 'b2-u1-pron-systematic', voice: 'Samantha', text: "Systematic" },
  { id: 'b2-u1-pron-containment', voice: 'Samantha', text: "Containment" },
  { id: 'b2-u1-listening-lab', voice: 'Eddy', text: "Members of the board: ECO-2026-88 requests a transition from FR-4 substrate to high-frequency Rogers laminate for our 5G transceiver modules. Had we conducted thermal dissipation simulations earlier in Q2, the dielectric breakdown issue would have been mitigated without halting pre-production. I move that we approve the ECO subject to supplier PPAP re-certification by October thirty-first." },
  { id: 'b2-u1-reading-passage', voice: 'Samantha', text: "Engineering Change Management is a critical discipline in US-Mexico nearshoring contracts. When an OEM issues an ECO, cross-border engineering teams must perform a 4-dimensional impact assessment: (1) Tooling re-machining lead time, (2) Scrap risk of obsolete work-in-progress (WIP) stock, (3) BOM revision in ERP/MES software, and (4) PPAP (Production Part Approval Process) level 3 re-submission. Failure to execute rigorous change control can result in multi-million-dollar warranty claims." },
  { id: 'b2-u1-crucible-model', voice: 'Eddy', text: "Our multidisciplinary 8D team performed a five-why root cause investigation on the cracked titanium brackets. Scanning electron microscopy confirmed that the fissures originated from excessive quenching rates during thermal heat treatment, rather than fatigue stress. As permanent corrective action D5, we reprogrammed the induction furnace ramp-down rate and installed dual-wavelength pyrometers to ensure uniform cooling, eliminating recurrence." },
  // === Unit B2-U2: Cross-Border Negotiations & Executive Facilitation ===
  { id: 'b2-u2-d1', voice: 'Eddy', text: "Good morning, everyone. Let us begin our Quarterly Business Review on time. Today our primary objective is to finalize the ramp-up schedule for the Mexicali expansion." },
  { id: 'b2-u2-d2', voice: 'Samantha', text: "Thanks, Javier. From our side in California, the delivery timelines for the stamping presses appear somewhat tight." },
  { id: 'b2-u2-d3', voice: 'Eddy', text: "I appreciate your concern, Sarah. What we might want to consider is phasing the qualification into two two-week sprints. That would allow early batch sampling while secondary tooling is being installed." },
  { id: 'b2-u2-d4', voice: 'Samantha', text: "That is a reasonable compromise. It provides the risk mitigation our OEM board requires." },
  { id: 'b2-u2-d5', voice: 'Eddy', text: "Excellent. Let us circle back to the logistics milestones right after reviewing the capital expenditure slides." },
  { id: 'b2-u2-dialogue-full', voice: 'Samantha', text: "Javier says: Good morning, everyone. Let us begin our Quarterly Business Review on time. Today our primary objective is to finalize the ramp-up schedule for the Mexicali expansion.. Sarah says: Thanks, Javier. From our side in California, the delivery timelines for the stamping presses appear somewhat tight.. Javier says: I appreciate your concern, Sarah. What we might want to consider is phasing the qualification into two two-week sprints. That would allow early batch sampling while secondary tooling is being installed.. Sarah says: That is a reasonable compromise. It provides the risk mitigation our OEM board requires.. Javier says: Excellent. Let us circle back to the logistics milestones right after reviewing the capital expenditure slides." },
  { id: 'b2-u2-vocab-circleback', voice: 'Samantha', text: "Circle Back. Let us circle back to the tooling budget once we review the yield data." },
  { id: 'b2-u2-vocab-stakeholder', voice: 'Samantha', text: "Stakeholder. All key stakeholders must sign off on the facility validation protocol." },
  { id: 'b2-u2-vocab-touchbase', voice: 'Samantha', text: "Touch Base. I will touch base with your quality director tomorrow morning." },
  { id: 'b2-u2-vocab-leverage', voice: 'Samantha', text: "Leverage. We can leverage our automated inspection line to reduce labor costs." },
  { id: 'b2-u2-vocab-tableatopic', voice: 'Samantha', text: "Table a Topic. Given our tight agenda, let us table the packaging discussion until Friday." },
  { id: 'b2-u2-vocab-wrapup', voice: 'Samantha', text: "Wrap Up. Before we wrap up, let us confirm the three critical action items." },
  { id: 'b2-u2-pron-photolithography', voice: 'Samantha', text: "Photolithography" },
  { id: 'b2-u2-pron-contamination', voice: 'Samantha', text: "Contamination" },
  { id: 'b2-u2-pron-substrate', voice: 'Samantha', text: "Substrate" },
  { id: 'b2-u2-listening-lab', voice: 'Samantha', text: "Thank you for joining this executive commercial session. While we appreciate your proposal for an eight percent price rebate at three hundred thousand units, our nearshoring volume projections indicate five hundred thousand units for Q1. On condition that you commit to guaranteed four-week lead times and localized buffer warehousing in Tijuana, we are prepared to sign a two-year exclusive supply agreement." },
  { id: 'b2-u2-reading-passage', voice: 'Samantha', text: "In high-stakes corporate nearshoring environments, linguistic proficiency must be paired with executive presence. Effective meeting leaders employ hedging strategies to offer critical perspectives without provoking defensive reactions: \"It would appear that the data suggests an alternate hypothesis\" replaces blunt confrontation. Facilitators keep multi-disciplinary discussions focused by actively managing conversational turns, parking tangential topics, and driving decisive accountability." },
  { id: 'b2-u2-crucible-model', voice: 'Eddy', text: "Airborne particle sensors in EUV Photolithography Bay 2 registered an excursion exceeding ISO Class 1 thresholds at 09:40 AM. We immediately suspended wafer stepper processing and isolated the automated track. Differential pressure dropped two Pascals due to a clogged pre-filter on HEPA fan unit 4. The HEPA filter was replaced under continuous laminar purge, and airborne particle counts have returned to baseline zero." },
  // === Unit B2-U3: Formal Escalations, Root Cause & Executive Memos ===
  { id: 'b2-u3-d1', voice: 'Eddy', text: "Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM." },
  { id: 'b2-u3-d2', voice: 'Samantha', text: "What did the Ishikawa fishbone diagram confirm as the underlying root cause?" },
  { id: 'b2-u3-d3', voice: 'Eddy', text: "It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove." },
  { id: 'b2-u3-d4', voice: 'Samantha', text: "And what permanent corrective action (D5) have we implemented?" },
  { id: 'b2-u3-d5', voice: 'Eddy', text: "We integrated an optical laser tool-wear sensor that halts the machine automatically after 500 cycles." },
  { id: 'b2-u3-d6', voice: 'Samantha', text: "Excellent work. That provides an airtight, data-driven response for our upcoming customer quality audit." },
  { id: 'b2-u3-dialogue-full', voice: 'Samantha', text: "Hector says: Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM.. Dr. Vance says: What did the Ishikawa fishbone diagram confirm as the underlying root cause?. Hector says: It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove.. Dr. Vance says: And what permanent corrective action (D5) have we implemented?. Hector says: We integrated an optical laser tool-wear sensor that halts the machine automatically after 500 cycles.. Dr. Vance says: Excellent work. That provides an airtight, data-driven response for our upcoming customer quality audit." },
  { id: 'b2-u3-vocab-nonconformancereportncr', voice: 'Samantha', text: "Non-Conformance Report (NCR). Quality issued an NCR due to surface roughness deviations on batch #20." },
  { id: 'b2-u3-vocab-containmentaction', voice: 'Samantha', text: "Containment Action. Our containment action involved quarantining 1,200 suspect housings." },
  { id: 'b2-u3-vocab-rootcauseanalysis', voice: 'Samantha', text: "Root Cause Analysis. The 5-Why root cause analysis confirmed a cracked nozzle O-ring." },
  { id: 'b2-u3-vocab-mitigationplan', voice: 'Samantha', text: "Mitigation Plan. The engineering team presented a robust mitigation plan to prevent recurrence." },
  { id: 'b2-u3-vocab-executivesponsorship', voice: 'Samantha', text: "Executive Sponsorship. We have executive sponsorship from the VP of Quality to execute the fix." },
  { id: 'b2-u3-vocab-capa', voice: 'Samantha', text: "CAPA. CAPA #801 closed successfully following a 30-day zero-defect trial." },
  { id: 'b2-u3-pron-compliance', voice: 'Samantha', text: "Compliance" },
  { id: 'b2-u3-pron-specification', voice: 'Samantha', text: "Specification" },
  { id: 'b2-u3-pron-traceability', voice: 'Samantha', text: "Traceability" },
  { id: 'b2-u3-listening-lab', voice: 'Eddy', text: "Good afternoon. This briefing addresses our customer escalation regarding field inverter failures. Under no circumstances should non-conforming batch units be re-certified without an exhaustive metallurgical failure analysis. Preliminary scans indicate inter-granular stress corrosion cracking on the copper busbars. I am establishing an executive war room effective immediately to oversee containment across all North American service centers." },
  { id: 'b2-u3-reading-passage', voice: 'Samantha', text: "MEMORANDUM. TO: Plant Operations Executive Committee. FROM: Quality Task Force. SUBJECT: Containment Protocol for Lot #849 Weld Discrepancy. Summary: During random destructive pull testing on Oct 19, five brackets failed below the 5.0 kN tensile specification. Immediate containment: All 1,500 finished assemblies in transit have been placed on electronic hold in warehouse quarantine. Root cause investigation is active. Zero defect escapes to customer confirmed." },
  { id: 'b2-u3-crucible-model', voice: 'Eddy', text: "Engineering Change Order ECO-9042 modifies the silicone conformal coating thickness specification from 50 to 75 microns. This revision complies with updated IPC-CC-830 humidity resistance guidelines. Full traceability records, revised Gerber CAD drawings, and customer engineering sign-off approvals are archived in our PLM system under revision Charlie, ensuring seamless production line cutover." },
  // === Unit B2-U4: American Business Idioms & Cultural Radar ===
  { id: 'b2-u4-d1', voice: 'Eddy', text: "Lorena, thanks for jumping on the call. Do you have a ballpark figure for the cleanroom expansion in Mexicali?" },
  { id: 'b2-u4-d2', voice: 'Samantha', text: "Yes, Scott. We estimate around $350,000 to $400,000 USD, depending on the HEPA filtration tier we select." },
  { id: 'b2-u4-d3', voice: 'Eddy', text: "That fits comfortably within our capital expenditure envelope. What is our low-hanging fruit to start immediate preparation?" },
  { id: 'b2-u4-d4', voice: 'Samantha', text: "We can clear the existing warehouse partition this week without disrupting current assembly lines." },
  { id: 'b2-u4-d5', voice: 'Eddy', text: "Great. Let us make sure nobody drops the ball on the environmental permits with the city." },
  { id: 'b2-u4-d6', voice: 'Samantha', text: "Understood. I will touch base with our environmental health and safety lead this afternoon." },
  { id: 'b2-u4-dialogue-full', voice: 'Samantha', text: "Scott says: Lorena, thanks for jumping on the call. Do you have a ballpark figure for the cleanroom expansion in Mexicali?. Lorena says: Yes, Scott. We estimate around $350,000 to $400,000 USD, depending on the HEPA filtration tier we select.. Scott says: That fits comfortably within our capital expenditure envelope. What is our low-hanging fruit to start immediate preparation?. Lorena says: We can clear the existing warehouse partition this week without disrupting current assembly lines.. Scott says: Great. Let us make sure nobody drops the ball on the environmental permits with the city.. Lorena says: Understood. I will touch base with our environmental health and safety lead this afternoon." },
  { id: 'b2-u4-vocab-movetheneedle', voice: 'Samantha', text: "Move the Needle. Incremental training is good, but automation is what will truly move the needle on productivity." },
  { id: 'b2-u4-vocab-droptheball', voice: 'Samantha', text: "Drop the Ball. The freight carrier dropped the ball by forgetting the customs import paperwork." },
  { id: 'b2-u4-vocab-bandwidth', voice: 'Samantha', text: "Bandwidth. I do not have the bandwidth to take on a third automation project this quarter." },
  { id: 'b2-u4-vocab-lowhangingfruit', voice: 'Samantha', text: "Low-Hanging Fruit. Fixing compressed air leaks is low-hanging fruit for immediate energy savings." },
  { id: 'b2-u4-vocab-ballparkfigure', voice: 'Samantha', text: "Ballpark Figure. Can you give me a ballpark figure for the tooling retrofit costs?" },
  { id: 'b2-u4-vocab-touchbase', voice: 'Samantha', text: "Touch Base. Let us touch base tomorrow afternoon to verify the cleanroom airflow readings." },
  { id: 'b2-u4-pron-feasibility', voice: 'Samantha', text: "Feasibility" },
  { id: 'b2-u4-pron-sustainability', voice: 'Samantha', text: "Sustainability" },
  { id: 'b2-u4-pron-electrification', voice: 'Samantha', text: "Electrification" },
  { id: 'b2-u4-listening-lab', voice: 'Samantha', text: "Team, let us look at the big picture. We are in the final lap of the nearshoring transition. I want everyone to touch base with our supply chain partners before we pull the trigger on the expanded manufacturing facility. Remember to keep your ear to the ground regarding local regulatory shifts. Do not cut corners on quality, because what is on the line is our multi-year customer trust." },
  { id: 'b2-u4-reading-passage', voice: 'Samantha', text: "When American engineering executives remark \"I do not have the bandwidth,\" they are politely declining additional responsibilities due to a full schedule, not referring to internet connectivity. Similarly, \"touching base\" implies a brief five-minute alignment check, not a formal two-hour presentation. Recognizing these corporate colloquial markers ensures seamless collaboration and elevates professional credibility across international teams." },
  { id: 'b2-u4-crucible-model', voice: 'Eddy', text: "Good morning, members of the executive steering committee. Our capstone proposal outlines an automated prismatic lithium-ion battery cell assembly line designed specifically for Northern Mexico nearshoring corridors. By deploying six-axis robotic winding cells, integrated vision inspection, and closed-loop thermal testing, this facility achieves a cycle time of 4.2 seconds per cell with a 99.4 percent first-pass yield, reducing supply chain lead times to US assembly plants by sixty percent." },
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
