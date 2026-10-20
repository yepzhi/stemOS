/**
 * ==============================================================================
 * stemOS — 60.0-Hour MCER Core Curriculum Generator & Synchronizer
 * 
 * Expands CEFR Core Tracks (A1, A2, B1, B2) into 60.0 Hours of active work each
 * (4 Hitos x 15.0 Hours = 60.0 Hours per level, 240.0 Hours total accredited course sequence).
 * 
 * Aligned with:
 * - Mexican University English Tronco Común (Inglés I, II, III, IV)
 * - CACEI / DGUTyP 60h/semester accreditation standards
 * - CEFR / MCER Standard American Workplace English
 * - W3C Open Badges 3.0 & ISO 9001:2015 Verifiable Credentials
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const outRoot = path.join(ROOT, 'content/mcer_tracks.js');
const outDev = path.join(ROOT, 'dev/content/mcer_tracks.js');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🏗️  stemOS 60.0-Hour MCER Core Curriculum Builder');
console.log('═══════════════════════════════════════════════════════════════════\n');

// ── Level A1: Foundations & Workplace Literacy (60.0 Hours) ──
const A1_UNITS = [
  {
    id: 'a1-u1',
    unitNum: 1,
    unitNumber: 1,
    title: 'Personal & Professional Introductions',
    titleES: 'Presentación Personal y Roles Laborales en Planta',
    cefrDescriptor: 'Can introduce him/herself and others, state job title, exchange employee ID details, and ask simple clarifying questions.',
    canDo: 'Presentarse con colegas y supervisores, deletrear nombres, dar números de empleado y describir puestos de trabajo simples.',
    grammarFocus: 'Verb to be (am/is/are), Subject Pronouns, Possessive Adjectives (my, your, his, her), Question Words (What, Who, Where)',
    communicativeGoal: 'Presentarse con colegas y supervisores, deletrear nombres, dar números de teléfono y describir puestos de trabajo simples.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Coworker', es: 'Compañero de trabajo', ipa: '/ˈkoʊˌwɜːrkər/', example: 'This is Diana, my new coworker in quality inspection.' },
      { en: 'Shift Manager', es: 'Supervisor de turno', ipa: '/ʃɪft ˈmænɪdʒər/', example: 'Carlos is our shift manager on the morning crew.' },
      { en: 'Employee ID Badge', es: 'Credencial de empleado', ipa: '/ɛmˈplɔɪiː aɪˈdiː bædʒ/', example: 'Please scan your employee badge at the turnstile.' },
      { en: 'Workstation', es: 'Estación de trabajo', ipa: '/ˈwɜːrkˌsteɪʃən/', example: 'My workstation is located next to assembly line three.' },
      { en: 'Department', es: 'Departamento / Área', ipa: '/dɪˈpɑːrtmənt/', example: 'Which department are you assigned to this semester?' },
      { en: 'Team Lead', es: 'Líder de equipo', ipa: '/tiːm liːd/', example: 'Report your morning attendance to the team lead before 7:00 AM.' },
      { en: 'Turnstile', es: 'Torniquete de acceso', ipa: '/ˈtɜːrnˌstaɪl/', example: 'Security requires every employee to badge in at the turnstile.' },
      { en: 'Intern', es: 'Practicante / Pasante', ipa: '/ˈɪntɜːrn/', example: 'Marco is a mechanical engineering intern from UPBC.' }
    ],
    dialogue: {
      title: 'First Day Orientation at the Manufacturing Facility',
      speakers: ['Mark (Supervisor)', 'Alex (New Engineering Intern)'],
      lines: [
        { speaker: 'Mark', text: 'Good morning! Welcome to the team. Are you Alex Rivera, the new mechatronics intern?' },
        { speaker: 'Alex', text: 'Good morning, Mark. Yes, I am. It is a pleasure to meet you in person.' },
        { speaker: 'Mark', text: 'Welcome aboard. Here is your facility access badge. What is your employee number for our shift roster?' },
        { speaker: 'Alex', text: 'My employee ID is 8-4-0-2-9. My primary workstation is located at Sub-Assembly Line 3, correct?' },
        { speaker: 'Mark', text: 'That is correct. Let me walk you over and introduce you to your morning team lead.' },
        { speaker: 'Alex', text: 'Thank you, Mark. Should I keep my safety glasses on while walking across the yellow pedestrian aisle?' },
        { speaker: 'Mark', text: 'Yes, absolutely. Safety eyewear is mandatory whenever you step past the blue line.' }
      ]
    },
    reading: {
      title: 'Facility Orientation Notice: Security & Badge Issuance',
      text: 'Welcome to Northern Tech Manufacturing Facility. All incoming engineering interns must complete their security credential verification by 08:30 AM on Day One. Please bring your official university credentials and emergency contact sheet to Human Resources on the second floor, Room 210. Assigned equipment lockers are located in Corridor B. Personal cell phones must remain inside your locker during active machine operations.',
      question: 'Where must new interns present their emergency contact sheet?',
      options: ['In the cafeteria', 'To Human Resources on the second floor, Room 210', 'At the shipping dock', 'To the security guard at Line 3'],
      correct: 1
    },
    crucible: {
      title: 'Badge Scan & Workstation Check-In Simulation',
      context: 'You arrive at Security Gate #2. The guard asks for your employee ID, your assigned department, and your team lead name before printing your cleanroom access card.',
      scenario: 'Answer the security guard using clear, professional American workplace phrasing.'
    },
    quiz: [
      { q: 'Hello, _____ name is David and I am an electrical engineering intern.', opts: ['my', 'me', 'mine', 'I'], ans: 0, exp: 'Use the possessive adjective "my" before a noun.' },
      { q: 'Where _____ your workstation located on the production floor?', opts: ['are', 'is', 'be', 'am'], ans: 1, exp: 'Workstation is third-person singular, requiring "is".' },
      { q: 'How do you politely introduce a new colleague to your supervisor?', opts: ['Look at this person right now', 'This is Maria, our new quality assurance coordinator', 'Who is Maria here', 'Maria is she'], ans: 1, exp: '"This is [Name]" is the standard professional introduction formula.' },
      { q: 'Which question correctly asks for an employee identification number?', opts: ['What is your employee badge number?', 'Where employee number is?', 'Who employee number have you?', 'Why employee number?'], ans: 0, exp: '"What is your [noun]?" is the correct interrogative structure.' }
    ]
  },
  {
    id: 'a1-u2',
    unitNum: 2,
    unitNumber: 2,
    title: 'Workplace Routines, Time & Schedules',
    titleES: 'Rutinas Laborales, Horarios y Turnos',
    cefrDescriptor: 'Can describe daily routines, shift start and end times, break periods, and recurring weekly work activities using simple present structures.',
    canDo: 'Informar a qué hora inicia y termina un turno, describir actividades de rutina y programar descansos.',
    grammarFocus: 'Simple Present (affirmative/negative/questions), Adverbs of Frequency (always, usually, sometimes, never), Prepositions of Time (at 7:00, in the morning, on Monday)',
    communicativeGoal: 'Informar a qué hora inicia y termina un turno, describir actividades de rutina y programar descansos.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Shift Handover', es: 'Entrega de turno', ipa: '/ʃɪft ˈhændˌoʊvər/', example: 'Shift handover takes place every day at 2:45 PM sharp.' },
      { en: 'Break Room', es: 'Comedor / Sala de descanso', ipa: '/breɪk ruːm/', example: 'Coffee and filtered water are available in the break room.' },
      { en: 'Daily Log', es: 'Bitácora diaria', ipa: '/ˈdeɪli lɔːɡ/', example: 'Technicians always update the daily log before leaving their station.' },
      { en: 'Punch In / Punch Out', es: 'Checar entrada / salida', ipa: '/pʌntʃ ɪn / pʌntʃ aʊt/', example: 'Remember to punch in at the digital clock before putting on PPE.' },
      { en: 'On Time', es: 'Puntual / A tiempo', ipa: '/ɑːn taɪm/', example: 'The morning safety briefing starts on time at 07:00 AM.' },
      { en: 'Overtime', es: 'Horas extras', ipa: '/ˈoʊvərˌtaɪm/', example: 'Weekend overtime is optional but requires supervisor approval.' },
      { en: 'Briefing', es: 'Reunión informativa rápida', ipa: '/ˈbriːfɪŋ/', example: 'We attend a 10-minute briefing at the start of every shift.' }
    ],
    dialogue: {
      title: 'Reviewing the Weekly Production Roster',
      speakers: ['Elena (Senior Technician)', 'Javier (Assembly Operator)'],
      lines: [
        { speaker: 'Elena', text: 'Hi Javier, what shift do you work this week on Line 4?' },
        { speaker: 'Javier', text: 'I work the first shift, from 7:00 AM to 3:30 PM, Monday through Friday.' },
        { speaker: 'Elena', text: 'Great. When does your crew have the morning safety briefing?' },
        { speaker: 'Javier', text: 'We always hold the safety briefing at 7:15 AM in front of the main Kanban board.' },
        { speaker: 'Elena', text: 'And what time is your scheduled lunch break?' },
        { speaker: 'Javier', text: 'First shift takes lunch at 11:30 AM for thirty minutes in Cafeteria B.' }
      ]
    },
    reading: {
      title: 'Standard Operating Schedule: Shift Hours & Break Rotations',
      text: 'Plant operations run on three continuous shifts. Shift 1 runs from 07:00 to 15:30. Shift 2 operates from 15:30 to 23:30. Shift 3 runs from 23:30 to 07:00. To prevent production bottlenecks, cafeteria meal times are strictly staggered: Group A dines at 11:30 AM, and Group B dines at 12:15 PM. Operators must never leave active conveyor lines unattended during break handoffs.',
      question: 'Why are cafeteria meal times staggered into two groups?',
      options: ['To clean the tables', 'To prevent production bottlenecks on the floor', 'Because there is no food', 'To close the factory early'],
      correct: 1
    },
    crucible: {
      title: 'Shift Handover Log Briefing',
      context: 'It is 15:20 PM. The second shift technician approaches your station. You must report completed cycle counts and notify them about upcoming scheduled maintenance.',
      scenario: 'Summarize your daily routine using Simple Present and time prepositions.'
    },
    quiz: [
      { q: 'The morning safety briefing starts _____ 7:15 AM every morning.', opts: ['in', 'on', 'at', 'to'], ans: 2, exp: 'Use "at" with clock times.' },
      { q: 'She _____ late to her workstation; she is always on time.', opts: ['never is', 'is never', 'does never', 'not is'], ans: 1, exp: 'The verb "to be" precedes adverbs of frequency: "is never".' },
      { q: 'What _____ you do during the 15:00 PM shift handover?', opts: ['do', 'does', 'are', 'did'], ans: 0, exp: 'With "you" in Simple Present questions, use auxiliary "do".' },
      { q: 'We work on the automated stamping line _____ Mondays and Wednesdays.', opts: ['at', 'in', 'on', 'for'], ans: 2, exp: 'Use "on" with days of the week.' }
    ]
  },
  {
    id: 'a1-u3',
    unitNum: 3,
    unitNumber: 3,
    title: 'Workstation Navigation, Tools & Supplies',
    titleES: 'Ubicación en Planta, Herramientas y Suministros',
    cefrDescriptor: 'Can understand and use simple descriptions of physical layout, inventory cabinets, hand tools, and spatial prepositions.',
    canDo: 'Indicar dónde se guardan herramientas y refacciones, pedir insumos y orientar a compañeros en el edificio.',
    grammarFocus: 'There is / There are, Prepositions of Place (in, on, under, next to, between, across from), Plural Nouns (regular/irregular)',
    communicativeGoal: 'Indicar dónde se guardan herramientas y refacciones, pedir insumos y orientar a compañeros en el edificio.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Toolbox', es: 'Caja de herramientas', ipa: '/ˈtuːlˌbɑːks/', example: 'There is a calibrated torque wrench in the yellow toolbox.' },
      { en: 'Spare Parts', es: 'Refacciones / Piezas de repuesto', ipa: '/spɛər pɑːrts/', example: 'Spare parts are kept in Cabinet B across from the tool crib.' },
      { en: 'Safety Goggles', es: 'Lentes de seguridad', ipa: '/ˈseɪfti ˈɡɑːɡəlz/', example: 'Safety goggles are mandatory inside the production zone.' },
      { en: 'Storage Rack', es: 'Estante de almacenamiento', ipa: '/ˈstɔːrɪdʒ ræk/', example: 'Raw materials are stacked on the lower storage rack.' },
      { en: 'Emergency Exit', es: 'Salida de emergencia', ipa: '/ɪˈmɜːrdʒənsi ˈɛɡzɪt/', example: 'The emergency exit is between Line 2 and the testing bay.' },
      { en: 'Calipers', es: 'Vernier / Calibrador digital', ipa: '/ˈkælɪpərz/', example: 'Use the digital calipers to measure the outer diameter.' },
      { en: 'Tool Crib', es: 'Almacén de herramientas', ipa: '/tuːl krɪb/', example: 'Sign out precision torque drivers at the central tool crib.' }
    ],
    dialogue: {
      title: 'Locating Replacement Optical Sensors',
      speakers: ['Tom (Automation Engineer)', 'Mateo (Mechatronics Intern)'],
      lines: [
        { speaker: 'Tom', text: 'Mateo, where are the replacement optical proximity sensors?' },
        { speaker: 'Mateo', text: 'There are three sealed boxes on the middle shelf, right next to the digital calipers.' },
        { speaker: 'Tom', text: 'Great. Is there any electrical insulation tape left in the drawer?' },
        { speaker: 'Mateo', text: 'Yes, there is a fresh roll inside the top drawer of the green mobile cart.' },
        { speaker: 'Tom', text: 'Excellent. Please grab the 5mm hex wrench as well before we enter the cell.' },
        { speaker: 'Mateo', text: 'Got it. I have the hex wrench and sensors ready.' }
      ]
    },
    reading: {
      title: '5S Tool Organization & Tool Crib Checkout Rules',
      text: 'Under 5S housekeeping standards, every tool has a designated shadow outline. All specialized calibration gauges must be signed out electronically using your employee badge. Operators must clean all grease and metal shavings from calipers before returning them to Shelf 4. Never leave loose hand tools on top of active machine guards or electrical enclosures.',
      question: 'Where must cleaned calipers be returned after use?',
      options: ['Under the conveyor', 'To Shelf 4 with their shadow outline', 'In your pocket', 'On top of the electrical panel'],
      correct: 1
    },
    crucible: {
      title: 'Tool Crib Spatial Orientation',
      context: 'An audit inspector asks you where the primary Lockout/Tagout (LOTO) padlock station and emergency eyewash units are located.',
      scenario: 'Direct the auditor accurately using there is/are and prepositions of place.'
    },
    quiz: [
      { q: '_____ two emergency eyewash stations next to the chemical storage enclosure.', opts: ['There is', 'There are', 'They have', 'Are there'], ans: 1, exp: 'Use "There are" with plural nouns ("two stations").' },
      { q: 'The digital multimeters are stored _____ the top drawer of Cabinet 3.', opts: ['in', 'at', 'on to', 'between'], ans: 0, exp: 'Use "in" for items placed inside a drawer or container.' },
      { q: 'How do you say "lentes de seguridad" in Standard American workplace English?', opts: ['Safety shoes', 'Safety goggles', 'Safety helmet', 'Safety harness'], ans: 1, exp: '"Safety goggles" or "safety glasses" is standard.' },
      { q: 'The emergency fire extinguisher is located _____ the main entrance and the tool crib.', opts: ['between', 'under', 'into', 'among of'], ans: 0, exp: 'Use "between" when referencing two specific landmarks.' }
    ]
  },
  {
    id: 'a1-u4',
    unitNum: 4,
    unitNumber: 4,
    title: 'Simple Directives, Safety Signs & Protocols',
    titleES: 'Instrucciones Simples, Imperativos y Señalética de Seguridad',
    cefrDescriptor: 'Can understand short, simple safety warnings, follow imperative directives, and make clear polite requests in workplace contexts.',
    canDo: 'Comprender letreros de advertencia en equipo de trabajo, pedir materiales con cortesía y seguir listas de verificación simples.',
    grammarFocus: 'Imperatives (Do / Do not / Don\'t), Modal "Can" for polite requests (Can you pass me...?), Polite markers (Please, Thank you, Excuse me)',
    communicativeGoal: 'Comprender letreros de advertencia en equipo de trabajo, pedir materiales con cortesía y seguir listas de verificación simples.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Caution', es: 'Precaución / Advertencia', ipa: '/ˈkɔːʃən/', example: 'Caution: Hot surface, do not touch without heat-resistant gloves.' },
      { en: 'Ear Protection', es: 'Protección auditiva', ipa: '/ɪər prəˈtɛkʃən/', example: 'Ear protection is required beyond this yellow boundary line.' },
      { en: 'Shut Down', es: 'Apagar / Desconectar', ipa: '/ʃʌt daʊn/', example: 'Please shut down the conveyor motor before clearing the jam.' },
      { en: 'Authorized Personnel', es: 'Personal autorizado', ipa: '/ˈɔːθəˌraɪzd ˌpɜːrsəˈnɛl/', example: 'High-voltage enclosure: authorized licensed personnel only.' },
      { en: 'Keep Clear', es: 'Mantener despejado', ipa: '/kiːp klɪər/', example: 'Keep this forklift corridor clear of wooden pallets at all times.' },
      { en: 'Emergency Stop', es: 'Paro de emergencia (E-Stop)', ipa: '/ɪˈmɜːrdʒənsi stɑːp/', example: 'Hit the red mushroom emergency stop button in case of jam.' },
      { en: 'Hard Hat', es: 'Casco de seguridad', ipa: '/hɑːrd hæt/', example: 'Wear your hard hat inside the overhead crane zone.' }
    ],
    dialogue: {
      title: 'Requesting Immediate Line Feeder Shutdown',
      speakers: ['Rachel (Line Lead)', 'David (Maintenance Apprentice)'],
      lines: [
        { speaker: 'Rachel', text: 'David, please stop the feeder conveyor for a moment.' },
        { speaker: 'David', text: 'Sure. Done. The red beacon is on. Is there a problem?' },
        { speaker: 'Rachel', text: 'Yes, can you hand me the 10mm Allen wrench from the magnetic tray?' },
        { speaker: 'David', text: 'Here you go. Do you need an inspection flashlight as well?' },
        { speaker: 'Rachel', text: 'Yes, please. Hold it right here on the lower motor bracket.' },
        { speaker: 'David', text: 'Careful! The notice says the gear housing is extremely hot.' },
        { speaker: 'Rachel', text: 'Good catch. Put on your thermal gloves before touching the casing.' }
      ]
    },
    reading: {
      title: 'Plant Safety Directive: OSHA & Lockout Warning Placard',
      text: 'DANGER: AUTOMATIC EQUIPMENT MAY ENERGIZE OR START WITHOUT NOTICE. Always verify Lockout/Tagout (LOTO) de-energization before reaching into mechanical pinch points. Keep hands and loose clothing away from rotating spindle drives. Do not bypass safety interlock switches under any operational circumstances.',
      question: 'What must technicians do before reaching into mechanical pinch points?',
      options: ['Turn on the lights', 'Verify Lockout/Tagout de-energization', 'Increase conveyor velocity', 'Remove safety goggles'],
      correct: 1
    },
    crucible: {
      title: 'Emergency Alarm & E-Stop Protocol',
      context: 'A packing belt begins to shudder with abnormal grinding. You must issue the immediate shut-down command to your coworker and point out the E-Stop mushroom button.',
      scenario: 'Execute negative and affirmative imperative commands accurately.'
    },
    quiz: [
      { q: '_____ touch the red emergency button unless there is immediate danger to personnel or tooling.', opts: ['Not', 'Do not', 'No to', 'Are not'], ans: 1, exp: 'Negative imperative directives begin with "Do not" or "Don\'t".' },
      { q: 'Excuse me, _____ you pass me the 10mm socket wrench, please?', opts: ['can', 'do', 'must', 'have'], ans: 0, exp: '"Can you [verb]...?" is the standard polite workplace request.' },
      { q: 'What does a high-visibility yellow sign saying "KEEP CLEAR" mean?', opts: ['Store excess pallets here', 'Do not obstruct this pathway with objects', 'Clean this once per month', 'Authorized parking only'], ans: 1, exp: '"Keep clear" means keep the area completely unobstructed.' },
      { q: 'Please _____ your safety helmet before entering the overhead gantry area.', opts: ['wear', 'wears', 'wearing', 'to wear'], ans: 0, exp: 'Imperative verbs use the base infinitive form without "to".' }
    ]
  }
];

// ── Level A2: Workplace Operations & Technical Communication (60.0 Hours) ──
const A2_UNITS = [
  {
    id: 'a2-u1',
    unitNum: 1,
    unitNumber: 1,
    title: 'Past Actions & Shift Incident Logs',
    titleES: 'Acciones Pasadas y Registro de Incidentes',
    cefrDescriptor: 'Can describe past events, past mechanical breakdowns, and equipment maintenance actions using simple past sentences.',
    canDo: 'Explicar qué ocurrió en el turno anterior, reportar anomalías pasadas y redactar bitácoras breves de trabajo.',
    grammarFocus: 'Simple Past (regular verbs -ed, common irregular verbs: went, saw, had, spoke, made), Time expressions (yesterday, last night, two hours ago), Past questions with Did',
    communicativeGoal: 'Explicar qué ocurrió en el turno anterior, reportar anomalías pasadas y redactar bitácoras breves de trabajo.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Malfunction', es: 'Falla / Desperfecto', ipa: '/mælˈfʌŋkʃən/', example: 'The hydraulic pump malfunctioned around 11:30 AM yesterday.' },
      { en: 'Replaced', es: 'Reemplazado / Cambiado', ipa: '/rɪˈpleɪst/', example: 'We replaced the worn timing belt during preventive maintenance.' },
      { en: 'Inspection', es: 'Inspección técnica', ipa: '/ɪnˈspɛkʃən/', example: 'Quality completed the dimensional inspection this morning.' },
      { en: 'Downtime', es: 'Tiempo muerto / Paro de línea', ipa: '/ˈdaʊnˌtaɪm/', example: 'Line 2 experienced 45 minutes of unexpected downtime.' },
      { en: 'Logged', es: 'Registrado en bitácora', ipa: '/lɔːɡd/', example: 'The technician logged the voltage variance in the shift binder.' },
      { en: 'Tripped', es: 'Disparado (interruptor térmico)', ipa: '/trɪpt/', example: 'The main circuit breaker tripped due to excessive motor current.' },
      { en: 'Calibrated', es: 'Calibrado', ipa: '/ˈkælɪˌbreɪtɪd/', example: 'We calibrated the load cell before starting production.' }
    ],
    dialogue: {
      title: 'Morning Shift Handover & Incident Triangulation',
      speakers: ['Luis (Night Shift Lead)', 'Claudia (Morning Shift Lead)'],
      lines: [
        { speaker: 'Luis', text: 'Good morning, Claudia. Here is the shift handover log for Line 4.' },
        { speaker: 'Claudia', text: 'Thanks, Luis. Did you experience any downtime during the graveyard shift?' },
        { speaker: 'Luis', text: 'Yes, Station 4 stopped for about thirty minutes because a proximity sensor came loose.' },
        { speaker: 'Claudia', text: 'Did the maintenance technician replace the unit?' },
        { speaker: 'Luis', text: 'No, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward.' },
        { speaker: 'Claudia', text: 'Did you log the stop in the digital MES system?' },
        { speaker: 'Luis', text: 'Yes, I logged code E-104 and recorded thirty minutes of total downtime.' }
      ]
    },
    reading: {
      title: 'Maintenance Log Summary: Overheated Spindle Bearing',
      text: 'Date: Oct 18. Technician: R. Gomez. At 14:15, spindle drive #3 overheated and triggered thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature stabilized at 48°C. Total downtime was 30 minutes.',
      question: 'What maintenance actions were performed on drive #3?',
      options: ['They replaced the motor entirely', 'They inspected the reservoir, cleaned the filter, and restarted it', 'They painted the enclosure', 'They called the supplier in Japan'],
      correct: 1
    },
    crucible: {
      title: 'Shift Handover Incident Report',
      context: 'A sensor misalignment caused 25 minutes of downtime on the robotic packaging cell last night. The morning supervisor asks you what happened.',
      scenario: 'Present the incident chronology using Simple Past and time adverbs.'
    },
    quiz: [
      { q: 'Yesterday the maintenance crew _____ the damaged pneumatic cylinder.', opts: ['replace', 'replaced', 'was replace', 'replacing'], ans: 1, exp: 'Simple Past regular verbs take "-ed": replaced.' },
      { q: '_____ you verify the sensor calibration before resuming production?', opts: ['Did', 'Do', 'Were', 'Have'], ans: 0, exp: 'Simple Past questions with main verbs use auxiliary "Did".' },
      { q: 'What does "downtime" mean in advanced manufacturing?', opts: ['Break time for lunch', 'Period when production machinery is halted and unproductive', 'Weekend shifts', 'Overtime pay'], ans: 1, exp: 'Downtime refers to non-productive machine stoppage.' },
      { q: 'The circuit breaker _____ last night when voltage surged above 480V.', opts: ['trip', 'tripped', 'is tripping', 'has trip'], ans: 1, exp: 'Past of regular verb trip doubles the "p": tripped.' }
    ]
  },
  {
    id: 'a2-u2',
    unitNum: 2,
    unitNumber: 2,
    title: 'Comparing Equipment, Specs & Materials',
    titleES: 'Comparación de Equipos, Especificaciones y Materiales',
    cefrDescriptor: 'Can compare technical items, dimensions, tolerances, materials, and machinery options using comparative and superlative forms.',
    canDo: 'Comparar dos opciones técnicas de refacciones o equipos, sustentando cuál es más rápida, duradera o económica.',
    grammarFocus: 'Comparative and Superlative Adjectives (cheaper than, more durable than, fastest, most efficient), as... as, Quantity expressions (more, less, fewer)',
    communicativeGoal: 'Comparar dos opciones técnicas de refacciones o equipos, sustentando cuál es más rápida, duradera o económica.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Durable', es: 'Duradero / Resistente', ipa: '/ˈdʊrəbəl/', example: 'Carbide cutting tips are significantly more durable than high-speed steel.' },
      { en: 'Lightweight', es: 'Ligero / De bajo peso', ipa: '/ˈlaɪtˌweɪt/', example: 'Aluminum alloys are lighter than structural carbon steel.' },
      { en: 'Cost-Effective', es: 'Rentable / Eficiente en costo', ipa: '/ˌkɔːst ɪˈfɛktɪv/', example: 'Refurbishing servo drives is more cost-effective than buying replacements.' },
      { en: 'Tolerance', es: 'Tolerancia de precisión', ipa: '/ˈtɑːlərəns/', example: 'The wire EDM machine holds a tighter tolerance than the CNC mill.' },
      { en: 'Throughput', es: 'Rendimiento / Volumen de piezas', ipa: '/ˈθruːˌpʊt/', example: 'The multi-spindle lathe achieves a higher throughput per hour.' },
      { en: 'Corrosion-Resistant', es: 'Resistente a la corrosión', ipa: '/kəˈroʊʒən rɪˈzɪstənt/', example: 'Stainless steel 316 is more corrosion-resistant in marine environments.' }
    ],
    dialogue: {
      title: 'Selecting Tooling Material for High-Speed Milling',
      speakers: ['Sara (Procurement Engineer)', 'Ken (Lead Machinist)'],
      lines: [
        { speaker: 'Sara', text: 'Ken, we have two vendor quotes for our end-mill bits: carbide and cobalt steel.' },
        { speaker: 'Ken', text: 'Cobalt steel is cheaper, but carbide tooling is much more durable at high RPMs.' },
        { speaker: 'Sara', text: 'Will carbide survive our thermal stress specs during titanium milling?' },
        { speaker: 'Ken', text: 'Yes, carbide is the most heat-resistant material for this aerospace bracket.' },
        { speaker: 'Sara', text: 'Then carbide is the most cost-effective option over the full production run.' },
        { speaker: 'Ken', text: 'Agreed. It will give us a tighter tolerance and fewer tool changes.' }
      ]
    },
    reading: {
      title: 'Material Comparison Report: Polycarbonate vs Acrylic Guards',
      text: 'When selecting clear machine safety enclosures, polycarbonate provides 250 times the impact resistance of standard tempered glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant and marginally cheaper, polycarbonate is significantly safer for high-pressure pneumatic chip containment under ISO 14120 safety regulations.',
      question: 'Why is polycarbonate chosen over acrylic for machine enclosures?',
      options: ['It is cheaper than glass', 'It provides twice the impact resistance for high-pressure debris containment', 'It is made of recycled wood', 'It bends without heat'],
      correct: 1
    },
    crucible: {
      title: 'Vendor Component Trade-Off Analysis',
      context: 'Compare two linear actuator options for a packaging client: Model A is faster but noisier; Model B is quieter, more energy-efficient, but costs 15% more.',
      scenario: 'Defend your recommendation using comparative and superlative structures.'
    },
    quiz: [
      { q: 'The new multi-axis robotic cell is _____ than the legacy pneumatic pick-and-place.', opts: ['fast', 'faster', 'more fast', 'fastest'], ans: 1, exp: 'One-syllable adjectives take "-er": faster than.' },
      { q: 'Stainless steel fasteners are _____ expensive than zinc fasteners, but they resist corrosion better.', opts: ['much', 'more', 'most', 'as'], ans: 1, exp: 'Multi-syllable adjectives take "more": more expensive.' },
      { q: 'Which machine in the toolroom holds the _____ dimensional tolerance?', opts: ['tight', 'tighter', 'tightest', 'more tight'], ans: 2, exp: 'Superlatives take "the" + "-est": tightest.' },
      { q: 'Titanium is not as heavy _____ stainless steel of equivalent volume.', opts: ['than', 'as', 'that', 'from'], ans: 1, exp: 'Equality comparisons use "as [adjective] as".' }
    ]
  },
  {
    id: 'a2-u3',
    unitNum: 3,
    unitNumber: 3,
    title: 'Scheduling, Agendas & Future Deadlines',
    titleES: 'Agendas, Fechas Límite y Planes Futuros',
    cefrDescriptor: 'Can communicate future production schedules, schedule vendor appointments, and express target dates using appropriate future tenses.',
    canDo: 'Agendar juntas técnicas, confirmar fechas de entrega con proveedores y coordinar citas de mantenimiento.',
    grammarFocus: 'Future with "going to" (planned intentions), Future with "will" (offers/spontaneous decisions), Time clauses (when, as soon as, by next Friday)',
    communicativeGoal: 'Agendar juntas técnicas, confirmar fechas de entrega con proveedores y coordinar citas de mantenimiento.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Deadline', es: 'Fecha límite / Plazo de entrega', ipa: '/ˈdɛdˌlaɪn/', example: 'The hard deadline for the pre-production sample is next Thursday.' },
      { en: 'Reschedule', es: 'Reprogramar / Reagendar', ipa: '/riːˈskɛdʒuːl/', example: 'Can we reschedule the laser calibration review to 10:00 AM?' },
      { en: 'Milestone', es: 'Hito / Etapa clave', ipa: '/ˈmaɪlˌstoʊn/', example: 'Reaching 50,000 continuous cycles is our primary project milestone.' },
      { en: 'Delivery Date', es: 'Fecha de entrega', ipa: '/dɪˈlɪvəri deɪt/', example: 'The steel vendor confirmed the raw billet delivery date for Monday morning.' },
      { en: 'Follow Up', es: 'Dar seguimiento', ipa: '/ˈfɑːloʊ ʌp/', example: 'I will follow up with the plant director after the ISO audit.' },
      { en: 'Shutdown', es: 'Paro programado de planta', ipa: '/ˈʃʌtˌdaʊn/', example: 'Annual electrical substation shutdown takes place in December.' }
    ],
    dialogue: {
      title: 'Scheduling the Annual Metrology Audit',
      speakers: ['Patricia (Quality Specialist)', 'Mr. Barnes (External Auditor)'],
      lines: [
        { speaker: 'Patricia', text: 'Good morning, Mr. Barnes. We are going to conduct our annual metrology audit next month.' },
        { speaker: 'Mr. Barnes', text: 'Hello Patricia. What dates are best for your engineering team?' },
        { speaker: 'Patricia', text: 'We are planning for Tuesday the 14th. Will your inspection crew be ready by then?' },
        { speaker: 'Mr. Barnes', text: 'Yes, I will confirm the flight details and email the calibration certificates today.' },
        { speaker: 'Patricia', text: 'Perfect. We will arrange cleanroom visitor badges before your arrival.' },
        { speaker: 'Mr. Barnes', text: 'Thank you. I will see you on the 14th at 08:30 AM.' }
      ]
    },
    reading: {
      title: 'Facility Preventive Maintenance Notice: Substation Shut-Off',
      text: 'Notice: Next Saturday, November 3rd, the main electrical substation will be shut down from 06:00 to 14:00 for transformer dielectric oil analysis. Backup diesel generators will supply emergency lighting and critical server racks only. All production equipment must be fully de-energized by Friday afternoon at 17:00.',
      question: 'When must all production machinery be de-energized?',
      options: ['Saturday morning', 'By Friday afternoon at 17:00', 'On Sunday evening', 'Next month'],
      correct: 1
    },
    crucible: {
      title: 'Coordination of Vendor Installation Visit',
      context: 'An automation vendor wants to reschedule their on-site robot commissioning. You must propose an alternate date that accommodates the production schedule.',
      scenario: 'Draft the scheduling response using going to and by deadlines.'
    },
    quiz: [
      { q: 'We _____ to install the upgraded safety light curtains next Monday morning.', opts: ['are going', 'will going', 'going', 'is going'], ans: 0, exp: 'Use "are going [to verb]" for pre-planned group schedules.' },
      { q: 'Don\'t worry about the supplier email; I _____ send it right now.', opts: ['am going', 'will', 'did', 'have'], ans: 1, exp: 'Use "will" for spontaneous decisions and immediate offers.' },
      { q: 'Please submit your tooling inventory data _____ Friday at 15:00 PM.', opts: ['on', 'by', 'until to', 'in'], ans: 1, exp: '"By [time/day]" specifies a deadline on or before that point.' },
      { q: 'We will inspect the circuit boards as soon as the courier _____.', opts: ['arrives', 'will arrive', 'arrived', 'is arriving'], ans: 0, exp: 'Time clauses with "as soon as" take Simple Present for future reference.' }
    ]
  },
  {
    id: 'a2-u4',
    unitNum: 4,
    unitNumber: 4,
    title: 'Troubleshooting & Describing Problems',
    titleES: 'Resolución de Problemas y Descripción de Fallas',
    cefrDescriptor: 'Can describe mechanical, pneumatic, and electrical symptoms, abnormal sounds, and communicate with technical support clearly.',
    canDo: 'Describir ruidos anómalos, fugas, sobrecalentamientos y solicitar asistencia técnica sin malentendidos.',
    grammarFocus: 'Modals for obligation and advice (should, must, have to), Present Continuous for ongoing anomalies (is vibrating, are leaking), Stative vs Dynamic verbs',
    communicativeGoal: 'Describir ruidos anómalos, fugas, sobrecalentamientos y solicitar asistencia técnica sin malentendidos.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Leak', es: 'Fuga / Goteo', ipa: '/liːk/', example: 'There is a hydraulic fluid leak under the main clamp cylinder.' },
      { en: 'Vibration', es: 'Vibración excesiva', ipa: '/vaɪˈbreɪʃən/', example: 'The blower motor has an abnormal vibration at high speeds.' },
      { en: 'Overheating', es: 'Sobrecalentamiento', ipa: '/ˌoʊvərˈhiːtɪŋ/', example: 'The servo controller is overheating due to blocked air ventilation.' },
      { en: 'Tighten', es: 'Apretar / Ajustar', ipa: '/ˈtaɪtən/', example: 'Please tighten the four hex bolts to 35 Newton-meters.' },
      { en: 'Reset', es: 'Reiniciar / Restablecer', ipa: '/riːˈsɛt/', example: 'Press and hold the blue button for three seconds to reset the PLC.' },
      { en: 'Air Pressure Drop', es: 'Caída de presión neumática', ipa: '/ɛər ˈprɛʃər drɑːp/', example: 'An air pressure drop caused the pneumatic gripper to release.' }
    ],
    dialogue: {
      title: 'Reporting an Air Pressure Drop in Pneumatic Cell',
      speakers: ['Oscar (Machine Operator)', 'Sam (Maintenance Technician)'],
      lines: [
        { speaker: 'Oscar', text: 'Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very sluggishly.' },
        { speaker: 'Sam', text: 'Sure. Let me check the inline pressure regulator. It shows 40 PSI, but it should be 85 PSI.' },
        { speaker: 'Oscar', text: 'Do you hear that hissing sound behind the manifold block?' },
        { speaker: 'Sam', text: 'Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring.' },
        { speaker: 'Oscar', text: 'Understood. I will hit the pneumatic isolation valve right now.' },
        { speaker: 'Sam', text: 'Thanks. Always bleed the residual line pressure before disconnecting the hose.' }
      ]
    },
    reading: {
      title: 'Basic Machine Troubleshooting Flowchart: Alarm Code E-12',
      text: 'Alarm E-12 indicates pneumatic actuator timeout. Step 1: Inspect the main air supply gauge. If pressure is below 6.0 bar, verify that the facility main ball valve is open. Step 2: Check cylinder reed sensors for magnetic alignment. If the green LED does not illuminate at stroke end, adjust sensor position. Step 3: Check for audible hose leaks. Step 4: If issue persists, notify shift supervisor.',
      question: 'What does Step 2 advise if the cylinder reed sensor LED does not illuminate?',
      options: ['Replace the whole PLC', 'Adjust the magnetic sensor position on the cylinder body', 'Ignore the LED', 'Turn off all plant power'],
      correct: 1
    },
    crucible: {
      title: 'Pneumatic Leak Escalation & Containment',
      context: 'A high-pressure air hose develops a tear next to an operator station, emitting a loud hissing noise and causing the cylinder stroke to fail.',
      scenario: 'Command the immediate safety isolation steps using must, have to, and Present Continuous.'
    },
    quiz: [
      { q: 'The hydraulic hose _____ fluid onto the floor; we need to shut off the pump immediately.', opts: ['leaks', 'is leaking', 'leaked already', 'was leak'], ans: 1, exp: 'Present Continuous "is leaking" describes an active ongoing anomaly.' },
      { q: 'Technicians _____ wear hearing protection inside the high-tonnage stamping bay.', opts: ['must', 'might', 'can', 'should to'], ans: 0, exp: '"Must" expresses strict mandatory safety rules.' },
      { q: 'What does an audible hissing sound in a pneumatic system indicate?', opts: ['Normal motor cooling', 'A pressurized air leak or loose fitting', 'Good vacuum grip', 'Low electrical current'], ans: 1, exp: 'Hissing in pneumatic lines indicates escaping compressed air.' },
      { q: 'You _____ reset the safety breaker until you find the short circuit.', opts: ['should not', 'can', 'must to', 'have'], ans: 0, exp: '"Should not" advises strongly against unsafe operational actions.' }
    ]
  }
];

// ── Level B1: Professional Independence & Technical Autonomy (60.0 Hours) ──
const B1_UNITS = [
  {
    id: 'b1-u1',
    unitNum: 1,
    unitNumber: 1,
    title: 'Explaining Workflows & Standard Operating Procedures',
    titleES: 'Explicación de Flujos de Trabajo y Procedimientos SOP',
    cefrDescriptor: 'Can give clear, connected technical descriptions of procedural sequences, cause-and-effect relationships, and process specifications.',
    canDo: 'Explicar cómo funciona un proceso paso a paso, redactar instrucciones operativas estándar (SOP) y describir cómo se fabrican o inspeccionan productos.',
    grammarFocus: 'Passive Voice in technical descriptions (is assembled, are inspected, was calibrated), Sequence Connectors (First, Subsequently, Once that is complete, Finally), Cause & Effect (due to, as a result of, therefore)',
    communicativeGoal: 'Explicar cómo funciona un proceso paso a paso, redactar instrucciones operativas estándar (SOP) y describir cómo se fabrican o inspeccionan productos.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Standard Operating Procedure (SOP)', es: 'Procedimiento Operativo Estándar', ipa: '/ˈstændərd ˈɑːpəˌreɪtɪŋ prəˈsiːdʒər/', example: 'All operators must follow the approved SOP to ensure repeatable quality.' },
      { en: 'Sequential', es: 'Secuencial / Paso a paso', ipa: '/sɪˈkwɛnʃəl/', example: 'The test protocol requires strict sequential execution of five steps.' },
      { en: 'Discrepancy', es: 'Discrepancia / Diferencia', ipa: '/dɪˈskrɛpənsi/', example: 'A dimensional discrepancy was detected between CAD and physical part.' },
      { en: 'Calibrated', es: 'Calibrado bajo norma', ipa: '/ˈkælɪˌbreɪtɪd/', example: 'The micrometer is calibrated every six months according to ISO 17025.' },
      { en: 'Root Cause', es: 'Causa raíz del problema', ipa: '/ruːt kɔːz/', example: 'The engineering team investigated the root cause of the weld fracture.' },
      { en: 'Quarantine', es: 'Cuarentena / Aislamiento', ipa: '/ˈkwɔːrənˌtiːn/', example: 'Non-conforming lots are segregated in the red quarantine cage.' }
    ],
    dialogue: {
      title: 'Walking Through a Quality Inspection SOP',
      speakers: ['Andrea (Quality Assurance Engineer)', 'Brian (Process Technician)'],
      lines: [
        { speaker: 'Andrea', text: 'Brian, could you walk me through the inspection sequence for this stamped bracket?' },
        { speaker: 'Brian', text: 'Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge.' },
        { speaker: 'Andrea', text: 'What occurs if a hole diameter is out of specification?' },
        { speaker: 'Brian', text: 'If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES.' },
        { speaker: 'Andrea', text: 'And once the lot passes all three dimensional checks?' },
        { speaker: 'Brian', text: 'Subsequently, the lot traveler is stamped and the parts are routed to the powder-coating line.' }
      ]
    },
    reading: {
      title: 'SOP-204: Automated Optical Inspection (AOI) Protocol',
      text: 'Purpose: To verify surface mount component alignment. Procedure: Once PCBs enter the inspection conveyor, dual 4K cameras capture top-side fiducial markers. Image processing algorithms compare component placement against Gerber design files. If any capacitor or IC exceeds 0.05mm tilt, the PCB is automatically routed to the manual rework station for microscopic audit.',
      question: 'What triggers a PCB to be diverted to the rework station?',
      options: ['Every tenth circuit board', 'If component tilt exceeds 0.05mm tolerance', 'When the operator takes a break', 'After 10,000 units are produced'],
      correct: 1
    },
    crucible: {
      title: 'Drafting an Assembly Sequence SOP',
      context: 'You are tasked with drafting a 4-step work instruction for a newly installed automated ultrasonic welding cell.',
      scenario: 'Structure the procedure using sequence connectors and passive voice.'
    },
    quiz: [
      { q: 'Every printed circuit board _____ inspected by automated optical cameras before shipping.', opts: ['is', 'are', 'has', 'were'], ans: 0, exp: 'Passive voice with singular subject: "is inspected".' },
      { q: 'The robotic line stopped _____ a sudden drop in incoming pneumatic pressure.', opts: ['due to', 'because', 'so that', 'despite of'], ans: 0, exp: '"Due to" is followed by a noun phrase explaining cause.' },
      { q: 'Which sequence connector best introduces the step following the primary action?', opts: ['Finally', 'Subsequently', 'At last', 'To conclude'], ans: 1, exp: '"Subsequently" introduces subsequent procedural steps.' },
      { q: 'All non-conforming stamped housings _____ segregated into quarantine yesterday.', opts: ['was', 'were', 'is', 'are'], ans: 1, exp: 'Plural subject in past passive takes "were segregated".' }
    ]
  },
  {
    id: 'b1-u2',
    unitNum: 2,
    unitNumber: 2,
    title: 'Professional Email Correspondence & Status Reports',
    titleES: 'Redacción de Correos Profesionales y Reportes de Avance',
    cefrDescriptor: 'Can write formal workplace emails, progress reports, request vendor quotes (RFQs), and summarize action items with professional tone.',
    canDo: 'Redactar correos electrónicos a clientes o proveedores de EE.UU. informando avances, solicitando cotizaciones y confirmando entregas.',
    grammarFocus: 'Formal vs Informal register, Present Perfect for completed accomplishments (We have completed, She has sent), Polite modals (Could you please, Would it be possible to)',
    communicativeGoal: 'Redactar correos electrónicos a clientes o proveedores de EE.UU. informando avances, solicitando cotizaciones y confirmando entregas.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Deliverable', es: 'Entregable del proyecto', ipa: '/dɪˈlɪvərəbəl/', example: 'The preliminary CAD drawing is our primary deliverable this week.' },
      { en: 'Action Item', es: 'Tarea acordada / Pendiente', ipa: '/ˈækʃən ˈaɪtəm/', example: 'Please review the action items listed at the end of the meeting minutes.' },
      { en: 'Inquiry', es: 'Consulta formal / Solicitud', ipa: '/ɪnˈkwaɪri/', example: 'We received an inquiry from the customer regarding thermal tolerances.' },
      { en: 'Attached', es: 'Adjunto / En el archivo anexo', ipa: '/əˈtætʃt/', example: 'Please find attached the signed inspection sign-off sheet.' },
      { en: 'Follow-Up', es: 'Seguimiento formal', ipa: '/ˈfɑːloʊ ʌp/', example: 'I am writing to follow up on our phone conversation from Tuesday.' },
      { en: 'Sign-Off', es: 'Aprobación formal / Firma de aceptación', ipa: '/saɪn ɔːf/', example: 'We obtained executive sign-off from the client director.' }
    ],
    dialogue: {
      title: 'Clarifying Engineering Change Request via Email',
      speakers: ['Jessica (Project Manager)', 'Daniel (Lead Design Engineer)'],
      lines: [
        { speaker: 'Jessica', text: 'Daniel, have you drafted the status update email to the Detroit client?' },
        { speaker: 'Daniel', text: 'Yes, Jessica. I have outlined the three completed milestones and attached the FEA stress simulation.' },
        { speaker: 'Jessica', text: 'Did you mention that we need their sign-off on the revised mounting bracket by Friday?' },
        { speaker: 'Daniel', text: 'Yes, I wrote: "Could you please confirm your formal approval of drawing Rev-C by Friday at 16:00 EST?"' },
        { speaker: 'Jessica', text: 'Excellent wording. That sets a clear timeline without sounding confrontational.' }
      ]
    },
    reading: {
      title: 'Sample Executive Status Email: Production Line Ramp-Up',
      text: 'Subject: Weekly Project Status Update: Assembly Line #5 Ramp-Up. Dear Operations Committee: We have successfully completed Milestone 2 on schedule. Cycle time has been reduced from 45 seconds to 38.2 seconds, meeting our Phase-1 KPI target. Action Items: (1) Vendor will deliver replacement servo drive by Wednesday. (2) Quality team will conduct Gage R&R validation on Friday. Please find attached the full telemetry dataset.',
      question: 'What is the primary accomplishment reported in the email?',
      options: ['The plant was closed', 'Cycle time was reduced to 38.2 seconds on schedule', 'Workers went on strike', 'The vendor canceled the project'],
      correct: 1
    },
    crucible: {
      title: 'Customer Delay Notification & Recovery Plan',
      context: 'A delayed shipment of custom microcontrollers from Taiwan will push back pilot testing by five days. You must email the US account manager with a recovery plan.',
      scenario: 'Compose the formal email using Present Perfect and polite modal requests.'
    },
    quiz: [
      { q: 'We _____ already validated the high-voltage insulation on all fifty battery enclosures.', opts: ['have', 'has', 'did', 'had to'], ans: 0, exp: 'Present Perfect with subject "We" uses "have + past participle".' },
      { q: 'Please find _____ the updated bill of materials (BOM) in PDF format.', opts: ['attached', 'attaching', 'attachment', 'to attach'], ans: 0, exp: '"Please find attached [document]" is standard business formula.' },
      { q: 'Which phrasing is most appropriate for a formal inquiry to an international client?', opts: ['Give me the drawings now', 'Could you please provide the updated CAD files at your earliest convenience?', 'Send me files quickly', 'I want the drawings'], ans: 1, exp: 'Professional register uses polite modals like "Could you please...".' },
      { q: 'The engineering team _____ significant progress on the cycle-time bottleneck this week.', opts: ['has made', 'have made', 'making', 'does make'], ans: 0, exp: 'Singular collective noun "team" takes singular "has made".' }
    ]
  },
  {
    id: 'b1-u3',
    unitNum: 3,
    unitNumber: 3,
    title: 'Technical Phone Calls, Standups & Clarifications',
    titleES: 'Llamadas Técnicas, Standups Diarios y Aclaraciones',
    cefrDescriptor: 'Can take part in virtual standups, understand spoken technical updates, interrupt politely to seek clarification, and confirm next steps.',
    canDo: 'Participar en daily standups, pedir que repitan información técnica sin pena y confirmar acuerdos en llamadas internacionales.',
    grammarFocus: 'Indirect questions for politeness (Could you tell me if... / Do you know when...), Clarification strategies (Could you repeat that? / What do you mean by...), Phrasal verbs in meetings (break down, catch up, run through)',
    communicativeGoal: 'Participar en daily standups, pedir que repitan información técnica sin pena y confirmar acuerdos en llamadas internacionales.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Clarify', es: 'Aclarar / Precisar', ipa: '/ˈklærɪfaɪ/', example: 'Could you clarify whether the tolerance is plus or minus 0.02mm?' },
      { en: 'Catch Up', es: 'Ponerse al día / Actualizarse', ipa: '/kætʃ ʌp/', example: 'Let us catch up on the supplier audit action items after the call.' },
      { en: 'Break Down', es: 'Desglosar / Explicar paso a paso', ipa: '/breɪk daʊn/', example: 'Can you break down the failure rates by operating temperature?' },
      { en: 'Run Through', es: 'Repasar rápidamente', ipa: '/rʌn θruː/', example: 'Let me run through the four critical checklist items before we hang up.' },
      { en: 'Bottleneck', es: 'Cuello de botella', ipa: '/ˈbɑːtəlˌnɛk/', example: 'The manual deburring station is our primary throughput bottleneck.' },
      { en: 'Standup', es: 'Reunión rápida de sincronización', ipa: '/ˈstændˌʌp/', example: 'We hold a 15-minute virtual standup every morning at 08:00.' }
    ],
    dialogue: {
      title: 'Virtual Daily Standup with Tier-1 Client Engineering Team',
      speakers: ['Kevin (US Product Lead)', 'Gabriela (Manufacturing Lead MX)'],
      lines: [
        { speaker: 'Kevin', text: 'Good morning, Gabriela. Could you run through yesterday’s yield numbers on the EV battery trays?' },
        { speaker: 'Gabriela', text: 'Good morning, Kevin. Yesterday we reached a first-pass yield of 97.4%, which is an increase of 2.1%.' },
        { speaker: 'Kevin', text: 'That sounds promising. Did you encounter any porosity issues on the friction stir welds?' },
        { speaker: 'Gabriela', text: 'I am sorry, the connection cut out for a second. Could you repeat that last question, please?' },
        { speaker: 'Kevin', text: 'Sure! I asked if you observed any porosity defects on the weld seams.' },
        { speaker: 'Gabriela', text: 'Understood. We observed zero porosity on ultrasonic testing. All fifty welds met ISO 25239 specs.' }
      ]
    },
    reading: {
      title: 'Best Practices for Cross-Border Engineering Standups',
      text: 'International remote engineering calls require structured communication. (1) State your main point concisely: "Yesterday I completed X, today I am working on Y, and my blocker is Z." (2) Never hesitate to seek clarification if an acoustic drop or technical acronym is unfamiliar. Use professional formulas such as "Could you please rephrase that?" (3) Conclude calls by confirming assigned ownership.',
      question: 'What is the recommended 3-part format for daily standups?',
      options: ['Talk about personal life for 30 minutes', 'Yesterday I completed X, today I work on Y, my blocker is Z', 'Only complain about management', 'Do not say anything'],
      correct: 1
    },
    crucible: {
      title: 'Clarifying Ambiguous Acoustic Specifications on Zoom',
      context: 'During an audio call with an OEM engineer, static causes you to miss a critical torque specification. You must politely interrupt and verify the exact Newton-meter figure.',
      scenario: 'Use indirect questions and clarification strategies.'
    },
    quiz: [
      { q: 'Could you please tell me _____ the shipment has cleared customs?', opts: ['whether', 'that if', 'what', 'which'], ans: 0, exp: 'Indirect yes/no questions use "whether" or "if".' },
      { q: 'I apologize, the audio cut out. Could you please _____ that last specification?', opts: ['repeat', 'repeating', 'repeated', 'to repeat'], ans: 0, exp: 'Modals like "could" take the base bare infinitive: "repeat".' },
      { q: 'In engineering meetings, what does it mean to "run through" a document?', opts: ['To run physical laps around it', 'To quickly review its main points sequentially', 'To tear it up', 'To delete it'], ans: 1, exp: '"Run through" means to review or inspect sequentially.' },
      { q: 'Do you know when _____ the audit results?', opts: ['will they publish', 'they will publish', 'did they publish', 'are they publish'], ans: 1, exp: 'Indirect questions use statement word order: "they will publish".' }
    ]
  },
  {
    id: 'b1-u4',
    unitNum: 4,
    unitNumber: 4,
    title: 'Constructive Disagreements, Solutions & 8D Actions',
    titleES: 'Desacuerdos Constructivos, Soluciones y Acciones 8D',
    cefrDescriptor: 'Can express polite disagreement, negotiate technical compromises, present root-cause solutions, and participate in 8D problem-solving meetings.',
    canDo: 'Expresar desacuerdos técnicos con diplomacia, proponer soluciones alternativas y justificar acciones correctivas en juntas de calidad.',
    grammarFocus: 'Diplomatic disagreement phrasing (I see your point, however... / With respect, the data suggests...), Conditionals for hypothetical solutions (If we adjust X, we could prevent Y), Quantifiers for statistical claims',
    communicativeGoal: 'Expresar desacuerdos técnicos con diplomacia, proponer soluciones alternativas y justificar acciones correctivas en juntas de calidad.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Countermeasure', es: 'Contramedida de seguridad / Acción correctiva', ipa: '/ˈkaʊntərˌmɛʒər/', example: 'The permanent countermeasure is to install optical safety interlocks.' },
      { en: 'Compromise', es: 'Punto medio / Acuerdo técnico', ipa: '/ˈkɑːmprəˌmaɪz/', example: 'We reached an engineering compromise on the wall thickness.' },
      { en: 'Containment', es: 'Contención inmediata del defecto', ipa: '/kənˈteɪnmənt/', example: 'Immediate containment was implemented by 100% sorting of finished goods.' },
      { en: 'Ishikawa Diagram', es: 'Diagrama de causa-efecto (Fishbone)', ipa: '/ˌɪʃiˈkɑːwə ˈdaɪəˌɡræm/', example: 'The team completed an Ishikawa diagram to map out contributing factors.' },
      { en: 'Corrective Action', es: 'Acción correctiva definitiva (CAPA)', ipa: '/kəˈrɛktɪv ˈækʃən/', example: 'CAPA #402 requires re-tooling the injection nozzle.' },
      { en: 'Non-Conforming', es: 'No conforme / Fuera de especificación', ipa: '/nɑːn kənˈfɔːrmɪŋ/', example: 'Twenty non-conforming shafts were segregated from the assembly bay.' }
    ],
    dialogue: {
      title: '8D Root Cause Meeting: Disputing Tool Wear vs Lubrication',
      speakers: ['Valeria (Quality Engineer)', 'Richard (Tooling Lead)'],
      lines: [
        { speaker: 'Richard', text: 'I believe the micro-cracks on the stampings are caused by inadequate hydraulic oil lubrication.' },
        { speaker: 'Valeria', text: 'I see your point, Richard; however, our lubricant viscosity logs show normal readings across all three shifts.' },
        { speaker: 'Richard', text: 'What else could explain the repeated shear tear-out on the corner radii?' },
        { speaker: 'Valeria', text: 'If we inspect the carbide die under magnification, we will see that tool wear exceeded 0.08mm. The data suggests tool fatigue is the primary root cause.' },
        { speaker: 'Richard', text: 'That makes sense. If we swap out the die insert today, we can run a test batch of fifty parts.' },
        { speaker: 'Valeria', text: 'Agreed. That will validate our D5 corrective action before we submit the 8D report.' }
      ]
    },
    reading: {
      title: '8D Methodology Overview: From D3 Containment to D7 Prevention',
      text: 'The 8D (Eight Disciplines) problem-solving standard is required by global automotive and aerospace OEMs under IATF 16949. Discipline 3 requires immediate containment within 24 hours to protect the customer from defect escapes. Disciplines 4 and 5 demand rigorous root-cause identification using 5-Why analysis and verification of permanent corrective actions. Discipline 7 updates institutional FMEAs to prevent recurrence across sister plants.',
      question: 'What is the required timeline for D3 containment actions under automotive standards?',
      options: ['Within 6 months', 'Within 24 hours', 'Whenever possible', 'Only after customer complains twice'],
      correct: 1
    },
    crucible: {
      title: '8D War Room Technical Defense',
      context: 'An OEM supplier quality auditor insists that your plant is at fault for a thermal sensor failure. Your testing data proves the customer exceeded rated operating voltage.',
      scenario: 'Defend your position diplomatically using conditional reasoning and data citations.'
    },
    quiz: [
      { q: '"I see your point; _____, the telemetry data indicates an over-voltage spike from the inverter."', opts: ['however', 'although', 'despite of', 'because'], ans: 0, exp: '"However" introduces a polite, diplomatic counter-argument.' },
      { q: 'If we _____ the die clearance by 0.05mm, we will eliminate the edge burrs completely.', opts: ['increase', 'will increase', 'increased', 'are increase'], ans: 0, exp: 'First conditional uses Simple Present in the "if" clause: "if we increase".' },
      { q: 'What is the main objective of an 8D "Discipline 3 Containment Action"?', opts: ['To assign blame to operators', 'To stop non-conforming products from reaching the customer immediately', 'To redesign the factory', 'To close the assembly line permanently'], ans: 1, exp: 'Containment actions quarantine and isolate defects within 24 hours.' },
      { q: 'Which statement demonstrates the highest level of diplomatic workplace disagreement?', opts: ['You are completely wrong', 'With respect, the metrology measurements suggest an alternate root cause', 'I hate that idea', 'Never say that again'], ans: 1, exp: '"With respect, [evidence] suggests..." is the gold standard of professional discourse.' }
    ]
  }
];

// ── Level B2: Vantage & Executive Fluency (60.0 Hours) ──
const B2_UNITS = [
  {
    id: 'b2-u1',
    unitNum: 1,
    unitNumber: 1,
    title: 'Engineering Change Orders & Technical Specs',
    titleES: 'Órdenes de Cambio de Ingeniería (ECO) y Especificaciones',
    cefrDescriptor: 'Can evaluate complex engineering change notices, debate technical trade-offs, manage tolerances, and negotiate deviation approvals with clients.',
    canDo: 'Gestionar órdenes de cambio de ingeniería (ECO), negociar desviaciones de tolerancia y evaluar impactos de costos y manufactura.',
    grammarFocus: 'Advanced Passives with Modals (must be submitted, should have been flagged, could be retrofitted), Complex relative clauses, Nominalization for executive conciseness',
    communicativeGoal: 'Gestionar órdenes de cambio de ingeniería (ECO), negociar desviaciones de tolerancia y evaluar impactos de costos y manufactura.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Engineering Change Order (ECO)', es: 'Orden de Cambio de Ingeniería', ipa: '/ˌɛndʒɪˈnɪərɪŋ tʃeɪndʒ ˈɔːrdər/', example: 'ECO #901 modifies the mounting flange thickness from 3mm to 4.5mm.' },
      { en: 'Bill of Materials (BOM)', es: 'Lista de materiales de ensamble', ipa: '/bɪl əv məˈtɪriəlz/', example: 'The multi-level BOM was updated to reflect the new silicone O-rings.' },
      { en: 'Deviation Permit', es: 'Permiso de desviación temporal', ipa: '/ˌdiːviˈeɪʃən ˈpɜːrmɪt/', example: 'The OEM granted a deviation permit for batch #45 to prevent production halt.' },
      { en: 'Traceability', es: 'Trazabilidad de componentes', ipa: '/ˌtreɪsəˈbɪlɪti/', example: 'Full QR laser-etched traceability is mandatory under ISO 9001:2015.' },
      { en: 'Scrap Rate', es: 'Tasa de desperdicio / Rechazo', ipa: '/skræp reɪt/', example: 'The automated deburring cell reduced the overall scrap rate to 0.4%.' },
      { en: 'Obsolescence', es: 'Obsolescencia de componentes', ipa: '/ˌɑːbsəˈlɛsəns/', example: 'We issued an ECO due to electronic microcontroller obsolescence.' }
    ],
    dialogue: {
      title: 'Reviewing an Urgent Engineering Change Order (ECO)',
      speakers: ['Marcus (Lead Systems Engineer)', 'Elena (Plant Operations VP)'],
      lines: [
        { speaker: 'Marcus', text: 'Elena, we received Engineering Change Order ECO-884 from the automotive OEM in Detroit.' },
        { speaker: 'Elena', text: 'What is the scope of the revision, Marcus? Does it impact our active tooling?' },
        { speaker: 'Marcus', text: 'The customer increased the heat-sink fin thickness by 1.2 millimeters to improve thermal dissipation during fast-charging.' },
        { speaker: 'Elena', text: 'Will our existing stamping progressive dies have to be re-machined?' },
        { speaker: 'Marcus', text: 'Yes, the die cavity must be modified by EDM, which requires a three-day maintenance window. However, unit manufacturing cost remains unchanged.' },
        { speaker: 'Elena', text: 'Make sure that all work-in-progress inventory is quarantined before the new drawing revision takes effect on Monday.' }
      ]
    },
    reading: {
      title: 'Management of Engineering Change Orders (ECO) in Nearshoring',
      text: 'Engineering Change Management is a critical discipline in US-Mexico nearshoring contracts. When an OEM issues an ECO, cross-border engineering teams must perform a 4-dimensional impact assessment: (1) Tooling re-machining lead time, (2) Scrap risk of obsolete work-in-progress (WIP) stock, (3) BOM revision in ERP/MES software, and (4) PPAP (Production Part Approval Process) level 3 re-submission. Failure to execute rigorous change control can result in multi-million-dollar warranty claims.',
      question: 'What is a major risk of poor engineering change management?',
      options: ['Excess coffee in the break room', 'Multi-million-dollar warranty claims and assembly line shutdowns', 'Free tooling upgrades', 'Lower taxes'],
      correct: 1
    },
    crucible: {
      title: 'ECO Cost & Lead-Time Dispute with US Client',
      context: 'The OEM requests a major revision to a casting housing but expects zero change in piece-part price and zero schedule slippage.',
      scenario: 'Present an executive counter-proposal establishing tooling costs and validation lead-time professionally.'
    },
    quiz: [
      { q: 'The proposed tooling modifications _____ submitted to the customer by Friday at 17:00.', opts: ['must be', 'must to be', 'should been', 'have to being'], ans: 0, exp: 'Modal passive takes "must be + past participle": "must be submitted".' },
      { q: 'The engineer _____ designed the progressive die recommended carbide inserts for wear resistance.', opts: ['which', 'who', 'whom', 'whose'], ans: 1, exp: 'Use "who" as the relative pronoun referring to people in subject position.' },
      { q: 'What does a "Deviation Permit" authorize in manufacturing?', opts: ['A vacation for operators', 'Temporary acceptance of components slightly outside specification that do not affect fit or function', 'Canceling all safety protocols', 'Buying uncertified raw materials'], ans: 1, exp: 'Deviation permits formally authorize temporary non-standard component usage.' },
      { q: 'Had the design team flagged the thermal issue earlier, the tooling _____ redesigned.', opts: ['would not have been', 'will not be', 'was not', 'is not'], ans: 0, exp: 'Third conditional inverted form takes "would not have been + past participle".' }
    ]
  },
  {
    id: 'b2-u2',
    unitNum: 2,
    unitNumber: 2,
    title: 'Cross-Border Negotiations & Executive Facilitation',
    titleES: 'Negociaciones Transfronterizas y Facilitación Ejecutiva',
    cefrDescriptor: 'Can chair international engineering meetings, facilitate contentious discussions, negotiate contract deliverables, and tactfully mediate multi-stakeholder conflicts.',
    canDo: 'Liderar juntas técnicas con directores de EE. UU., mediar desacuerdos entre producción y calidad, y negociar acuerdos contractuales.',
    grammarFocus: 'Hedging and softening techniques (It would appear that / We might want to consider), Turn-taking and meeting facilitation formulas (Let us circle back / Moving on to the next item), Cleft sentences for emphasis',
    communicativeGoal: 'Liderar juntas técnicas con directores de EE. UU., mediar desacuerdos entre producción y calidad, y negociar acuerdos contractuales.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Circle Back', es: 'Retomar un tema más adelante', ipa: '/ˈsɜːrkəl bæk/', example: 'Let us circle back to the tooling budget once we review the yield data.' },
      { en: 'Stakeholder', es: 'Parte interesada / Involucrado clave', ipa: '/ˈsteɪkˌhoʊldər/', example: 'All key stakeholders must sign off on the facility validation protocol.' },
      { en: 'Touch Base', es: 'Ponerse en contacto brevemente', ipa: '/tʌtʃ beɪs/', example: 'I will touch base with your quality director tomorrow morning.' },
      { en: 'Leverage', es: 'Aprovechar / Sacar ventaja estratégica', ipa: '/ˈlɛvərɪdʒ/', example: 'We can leverage our automated inspection line to reduce labor costs.' },
      { en: 'Table a Topic', es: 'Posponer la discusión de un tema', ipa: '/ˈteɪbəl/', example: 'Given our tight agenda, let us table the packaging discussion until Friday.' },
      { en: 'Wrap Up', es: 'Concluir / Dar por terminada una junta', ipa: '/ræp ʌp/', example: 'Before we wrap up, let us confirm the three critical action items.' }
    ],
    dialogue: {
      title: 'Facilitating a High-Stakes Supplier Quarterly Business Review',
      speakers: ['Javier (Director of Operations MX)', 'Sarah (VP Supply Chain US)'],
      lines: [
        { speaker: 'Javier', text: 'Good morning, everyone. Let us begin our Quarterly Business Review on time. Today our primary objective is to finalize the ramp-up schedule for the Mexicali expansion.' },
        { speaker: 'Sarah', text: 'Thanks, Javier. From our side in California, the delivery timelines for the stamping presses appear somewhat tight.' },
        { speaker: 'Javier', text: 'I appreciate your concern, Sarah. What we might want to consider is phasing the qualification into two two-week sprints. That would allow early batch sampling while secondary tooling is being installed.' },
        { speaker: 'Sarah', text: 'That is a reasonable compromise. It provides the risk mitigation our OEM board requires.' },
        { speaker: 'Javier', text: 'Excellent. Let us circle back to the logistics milestones right after reviewing the capital expenditure slides.' }
      ]
    },
    reading: {
      title: 'Executive Presence in Cross-Border US-Mexico Technical Leadership',
      text: 'In high-stakes corporate nearshoring environments, linguistic proficiency must be paired with executive presence. Effective meeting leaders employ hedging strategies to offer critical perspectives without provoking defensive reactions: "It would appear that the data suggests an alternate hypothesis" replaces blunt confrontation. Facilitators keep multi-disciplinary discussions focused by actively managing conversational turns, parking tangential topics, and driving decisive accountability.',
      question: 'Why do executive leaders use hedging techniques like "It would appear that..." in technical meetings?',
      options: ['To waste meeting time', 'To state critical insights diplomatically without provoking defensive reactions', 'Because they are uncertain of the facts', 'To avoid taking responsibility'],
      correct: 1
    },
    crucible: {
      title: 'Mediating a Heated Production vs Quality Standoff',
      context: 'Production wants to ship 5,000 sub-assemblies to avoid line-stop penalties. Quality discovered an intermittent grounding glitch. As Operations Manager, chair the resolution call.',
      scenario: 'De-escalate the tension and establish a compliant containment protocol.'
    },
    quiz: [
      { q: 'We don\'t have the full metrology dataset yet, so let us _____ this discussion until Friday.', opts: ['table', 'chair', 'desk', 'bench'], ans: 0, exp: 'In American executive English, to "table a topic" means to postpone it temporarily.' },
      { q: 'Before we _____ the call, let me confirm who owns the tooling redesign action item.', opts: ['wrap up', 'wrap on', 'wrap down', 'wrap into'], ans: 0, exp: '"Wrap up" means to conclude or finalize a meeting.' },
      { q: 'What is the primary role of an executive meeting facilitator when two engineers disagree strongly?', opts: ['Shout louder than both', 'Diplomatically acknowledge both perspectives, anchor the discussion in empirical data, and agree on a validation test', 'Cancel the project immediately', 'Hang up the call'], ans: 1, exp: 'Effective facilitation centers on diplomatic mediation and empirical validation.' },
      { q: '"What we _____ consider is dual-sourcing the semiconductor component to mitigate lead-time risk."', opts: ['might want to', 'must to', 'are want', 'ought'], ans: 0, exp: '"We might want to consider..." is a classic executive hedging formula.' }
    ]
  },
  {
    id: 'b2-u3',
    unitNum: 3,
    unitNumber: 3,
    title: 'Formal Escalations, Root Cause & Executive Memos',
    titleES: 'Escalación Formal, Causa Raíz y Memorándums',
    cefrDescriptor: 'Can write clear, detailed formal escalation memos, present rigorous 8D root-cause analyses, and evaluate operational risk matrices for C-suite review.',
    canDo: 'Redactar memorándums ejecutivos de escalación formal ante fallas críticas de producto, explicando la causa raíz y las acciones correctivas (CAPA).',
    grammarFocus: 'Conditional inversion (Should you require / Had we known), Cleft sentences for emphasis (What caused the failure was...), Passive reporting verbs (It is estimated that / The defect was determined to be)',
    communicativeGoal: 'Redactar memorándums ejecutivos de escalación formal ante fallas críticas de producto, explicando la causa raíz y las acciones correctivas (CAPA).',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Non-Conformance Report (NCR)', es: 'Reporte de No Conformidad', ipa: '/nɑːn kənˈfɔːrməns/', example: 'Quality issued an NCR due to surface roughness deviations on batch #20.' },
      { en: 'Containment Action', es: 'Acción de contención inmediata', ipa: '/kənˈteɪnmənt/', example: 'Our containment action involved quarantining 1,200 suspect housings.' },
      { en: 'Root Cause Analysis', es: 'Análisis de causa raíz', ipa: '/ruːt kɔːz əˈnæləsɪs/', example: 'The 5-Why root cause analysis confirmed a cracked nozzle O-ring.' },
      { en: 'Mitigation Plan', es: 'Plan de mitigación de riesgos', ipa: '/ˌmɪtɪˈɡeɪʃən plæn/', example: 'The engineering team presented a robust mitigation plan to prevent recurrence.' },
      { en: 'Executive Sponsorship', es: 'Respaldo ejecutivo / Dirección', ipa: '/ɪɡˈzɛkjətɪv/', example: 'We have executive sponsorship from the VP of Quality to execute the fix.' },
      { en: 'CAPA', es: 'Acción Correctiva y Preventiva', ipa: '/ˈkæpə/', example: 'CAPA #801 closed successfully following a 30-day zero-defect trial.' }
    ],
    dialogue: {
      title: 'Reviewing an 8D Escalation Notice with the Quality Director',
      speakers: ['Hector (Senior Quality Engineer)', 'Dr. Vance (VP of Quality Assurance)'],
      lines: [
        { speaker: 'Hector', text: 'Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM.' },
        { speaker: 'Dr. Vance', text: 'What did the Ishikawa fishbone diagram confirm as the underlying root cause?' },
        { speaker: 'Hector', text: 'It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove.' },
        { speaker: 'Dr. Vance', text: 'And what permanent corrective action (D5) have we implemented?' },
        { speaker: 'Hector', text: 'We integrated an optical laser tool-wear sensor that halts the machine automatically after 500 cycles.' },
        { speaker: 'Dr. Vance', text: 'Excellent work. That provides an airtight, data-driven response for our upcoming customer quality audit.' }
      ]
    },
    reading: {
      title: 'Sample Executive Memo: Urgent Escalation & Containment Protocol',
      text: 'MEMORANDUM. TO: Plant Operations Executive Committee. FROM: Quality Task Force. SUBJECT: Containment Protocol for Lot #849 Weld Discrepancy. Summary: During random destructive pull testing on Oct 19, five brackets failed below the 5.0 kN tensile specification. Immediate containment: All 1,500 finished assemblies in transit have been placed on electronic hold in warehouse quarantine. Root cause investigation is active. Zero defect escapes to customer confirmed.',
      question: 'What immediate containment action was executed for Lot #849?',
      options: ['The parts were shipped anyway', 'All 1,500 finished assemblies in transit were placed on electronic hold in quarantine', 'The factory was closed', 'The data was erased'],
      correct: 1
    },
    crucible: {
      title: 'Drafting an Executive Non-Conformance Escalation Memo',
      context: 'An automotive Tier-1 supplier detected an out-of-spec plating thickness on a shipment of 10,000 terminals. Draft the formal executive memo explaining containment and root cause.',
      scenario: 'Use passive reporting verbs and conditional inversion.'
    },
    quiz: [
      { q: '_____ you require any further validation data, please contact our quality laboratory directly.', opts: ['Should', 'Would', 'Had', 'Could'], ans: 0, exp: 'Conditional inversion: "Should you require..." equals "If you require...".' },
      { q: 'What _____ the micro-burrs on the sealing groove was excessive tool wear on the carbide broach.', opts: ['cause', 'caused', 'causing', 'did cause'], ans: 1, exp: 'Cleft sentence structure: "What caused [X] was [Y]".' },
      { q: 'What is the primary objective of a "containment action" in manufacturing?', opts: ['To punish machine operators', 'To immediately prevent non-conforming parts from escaping to the customer', 'To repaint the floor', 'To celebrate good results'], ans: 1, exp: 'Containment actions isolate and quarantine suspect material immediately.' },
      { q: 'It _____ estimated that the automated vision inspection cell will pay for itself within six months.', opts: ['is', 'are', 'has', 'was to'], ans: 0, exp: 'Passive reporting structure: "It is estimated that...".' }
    ]
  },
  {
    id: 'b2-u4',
    unitNum: 4,
    unitNumber: 4,
    title: 'American Business Idioms & Cultural Radar',
    titleES: 'Modismos Corporativos Americanos y Radar Cultural',
    cefrDescriptor: 'Can understand a wide range of colloquial workplace idioms, navigate American corporate cultural nuances, and participate naturally in executive banter.',
    canDo: 'Comprender y utilizar con naturalidad modismos corporativos nativos sin caer en calcos literales del español ni malentendidos.',
    grammarFocus: 'High-context idioms vs literal phrasing, Phrasal verbs with multiple business meanings, Nuances of tone, humor, and executive presence',
    communicativeGoal: 'Comprender y utilizar con naturalidad modismos corporativos nativos sin caer en calcos literales del español ni malentendidos.',
    hours: 15.0,
    xp: 1400,
    workloadBreakdown: {
      theoryHours: 3.5,
      audioPracticeHours: 3.5,
      readingStandardsHours: 4.0,
      plantSimulationHours: 4.0
    },
    vocabulary: [
      { en: 'Move the Needle', es: 'Hacer una diferencia medible / Tener impacto real', ipa: '/muːv ðə ˈniːdəl/', example: 'Incremental training is good, but automation is what will truly move the needle on productivity.' },
      { en: 'Drop the Ball', es: 'Cometer un descuido / Fallar en un compromiso', ipa: '/drɑːp ðə bɔːl/', example: 'The freight carrier dropped the ball by forgetting the customs import paperwork.' },
      { en: 'Bandwidth', es: 'Capacidad de tiempo / Disponibilidad mental', ipa: '/ˈbændˌwɪdθ/', example: 'I do not have the bandwidth to take on a third automation project this quarter.' },
      { en: 'Low-Hanging Fruit', es: 'Oportunidades fáciles de lograr con poco esfuerzo', ipa: '/loʊ ˈhæŋɪŋ fruːt/', example: 'Fixing compressed air leaks is low-hanging fruit for immediate energy savings.' },
      { en: 'Ballpark Figure', es: 'Cifra aproximada / Estimación preliminar', ipa: '/ˈbɔːlˌpɑːrk ˈfɪɡjər/', example: 'Can you give me a ballpark figure for the tooling retrofit costs?' },
      { en: 'Touch Base', es: 'Ponerse en contacto breve', ipa: '/tʌtʃ beɪs/', example: 'Let us touch base tomorrow afternoon to verify the cleanroom airflow readings.' }
    ],
    dialogue: {
      title: 'Executive Sync with US Corporate Vice President',
      speakers: ['Lorena (Director of Operations MX)', 'Scott (US Vice President)'],
      lines: [
        { speaker: 'Scott', text: 'Lorena, thanks for jumping on the call. Do you have a ballpark figure for the cleanroom expansion in Mexicali?' },
        { speaker: 'Lorena', text: 'Yes, Scott. We estimate around $350,000 to $400,000 USD, depending on the HEPA filtration tier we select.' },
        { speaker: 'Scott', text: 'That fits comfortably within our capital expenditure envelope. What is our low-hanging fruit to start immediate preparation?' },
        { speaker: 'Lorena', text: 'We can clear the existing warehouse partition this week without disrupting current assembly lines.' },
        { speaker: 'Scott', text: 'Great. Let us make sure nobody drops the ball on the environmental permits with the city.' },
        { speaker: 'Lorena', text: 'Understood. I will touch base with our environmental health and safety lead this afternoon.' }
      ]
    },
    reading: {
      title: 'Cross-Cultural Guide: Decoding American High-Context Workplace Idioms',
      text: 'When American engineering executives remark "I do not have the bandwidth," they are politely declining additional responsibilities due to a full schedule, not referring to internet connectivity. Similarly, "touching base" implies a brief five-minute alignment check, not a formal two-hour presentation. Recognizing these corporate colloquial markers ensures seamless collaboration and elevates professional credibility across international teams.',
      question: 'What does an engineering manager mean by "I don\'t have the bandwidth"?',
      options: ['Their Wi-Fi is broken', 'They are politely declining additional tasks due to a full workload', 'They want more work immediately', 'They are buying new fiber optics'],
      correct: 1
    },
    crucible: {
      title: 'Decoding American Executive Banter in Project Kickoff',
      context: 'In a kickoff call, your US client sponsor uses multiple idioms ("move the needle", "ballpark figure", "touch base"). You must respond accurately without literal translation errors.',
      scenario: 'Incorporate native professional idioms naturally into your project timeline update.'
    },
    quiz: [
      { q: '"Can you give me a _____ figure for the tooling retrofit costs?"', opts: ['ballpark', 'football', 'basketball', 'playground'], ans: 0, exp: '"Ballpark figure" means an approximate or rough numerical estimate.' },
      { q: 'When an executive says an initiative will "move the needle", they mean it will:', opts: ['Sew clothing', 'Have a noticeable, measurable impact on bottom-line results', 'Be extremely slow', 'Damage the machine needles'], ans: 1, exp: '"Move the needle" means produce significant, measurable progress.' },
      { q: 'What is "low-hanging fruit" in continuous improvement terminology?', opts: ['Fresh apples in the dining area', 'Easy improvements or quick wins achievable with minimal effort', 'Tasks nobody wants to perform', 'Expensive machine overhauls'], ans: 1, exp: 'Low-hanging fruit refers to easily achieved initial targets.' },
      { q: 'When someone "drops the ball" in a project, they:', opts: ['Play soccer during work hours', 'Make a careless error or fail to fulfill a crucial commitment', 'Drop physical tools on the floor', 'Throw away parts'], ans: 1, exp: '"Drop the ball" means to commit an oversight or fail to deliver on a commitment.' }
    ]
  }
];

// Combine all 4 levels into master catalog
const MCER_LEVELS = [
  {
    id: 'mcer-a1',
    code: 'A1',
    name: 'Breakthrough / Beginner',
    nameES: 'Nivel A1: Fundamentos y Comunicación Cotidiana (Inglés I)',
    badge: 'CEFR A1 Novice',
    color: '#10b981',
    icon: 'fa-seedling',
    totalHours: 60.0,
    totalXP: 5600,
    summary: 'Acredita 60.0 horas curriculares (Inglés I). Desarrolla las competencias esenciales para presentarse, intercambiar información personal y laboral básica, describir rutinas diarias, horarios y comprender instrucciones sencillas en el entorno de trabajo.',
    units: A1_UNITS,
    milestone: {
      title: 'Milestone Checkpoint A1: Novice Workplace Communicator',
      questions: 10,
      passingGrade: 80,
      badgeId: 'badge-mcer-a1',
      badgeName: 'CEFR A1: Foundations in Standard American English (60.0h Course)',
      totalHours: 60.0,
      accreditation: 'CACEI / DGUTyP Inglés I'
    }
  },
  {
    id: 'mcer-a2',
    code: 'A2',
    name: 'Waystage / Elementary',
    nameES: 'Nivel A2: Operaciones Laborales y Comunicación Práctica (Inglés II)',
    badge: 'CEFR A2 Waystage',
    color: '#38bdf8',
    icon: 'fa-cubes',
    totalHours: 60.0,
    totalXP: 5600,
    summary: 'Acredita 60.0 horas curriculares (Inglés II). Capacita al alumno para relatar actividades pasadas e incidentes menores, comparar herramientas y piezas por especificaciones técnicas, programar juntas y describir desperfectos con cortesía.',
    units: A2_UNITS,
    milestone: {
      title: 'Milestone Checkpoint A2: Practical Workplace Operator',
      questions: 10,
      passingGrade: 80,
      badgeId: 'badge-mcer-a2',
      badgeName: 'CEFR A2: Practical Workplace English (60.0h Course)',
      totalHours: 60.0,
      accreditation: 'CACEI / DGUTyP Inglés II'
    }
  },
  {
    id: 'mcer-b1',
    code: 'B1',
    name: 'Threshold / Intermediate',
    nameES: 'Nivel B1: Autonomía Profesional y Procesos (Inglés III)',
    badge: 'CEFR B1 Intermediate',
    color: '#f59e0b',
    icon: 'fa-chart-simple',
    totalHours: 60.0,
    totalXP: 5600,
    summary: 'Acredita 60.0 horas curriculares (Inglés III). Permite al estudiante desenvolverse con soltura en ambientes profesionales: redactar correos ejecutivos, explicar procedimientos operativos (SOPs), expresar desacuerdos constructivos y resolver contingencias.',
    units: B1_UNITS,
    milestone: {
      title: 'Milestone Checkpoint B1: Professional Independence',
      questions: 10,
      passingGrade: 80,
      badgeId: 'badge-mcer-b1',
      badgeName: 'CEFR B1: Professional Independence (60.0h Course)',
      totalHours: 60.0,
      accreditation: 'CACEI / DGUTyP Inglés III'
    }
  },
  {
    id: 'mcer-b2',
    code: 'B2',
    name: 'Vantage / Executive Fluency',
    nameES: 'Nivel B2: Fluidez Ejecutiva y Negociación (Inglés IV)',
    badge: 'CEFR B2 Executive',
    color: '#a855f7',
    icon: 'fa-award',
    totalHours: 60.0,
    totalXP: 5600,
    summary: 'Acredita 60.0 horas curriculares (Inglés IV). Nivel de graduación y empleabilidad global: liderar órdenes de cambio (ECO), facilitar juntas internacionales, redactar memorándums ejecutivos y dominar el radar cultural estadounidense.',
    units: B2_UNITS,
    milestone: {
      title: 'Milestone Checkpoint B2: Executive Business Communicator',
      questions: 10,
      passingGrade: 80,
      badgeId: 'badge-mcer-b2',
      badgeName: 'CEFR B2: Executive Fluency & Advanced Pragmatics (60.0h Course)',
      totalHours: 60.0,
      accreditation: 'CACEI / DGUTyP Inglés IV'
    }
  }
];

// Enrich MCER_LEVELS with Pedagogical Modules (False Cognates, Pronunciation Lab, Crucible Model Transcripts)
try {
  const { ENRICHMENT_MAP } = require('./enrich_mcer_pedagogical_modules.cjs');
  if (ENRICHMENT_MAP) {
    MCER_LEVELS.forEach(lvl => {
      lvl.units.forEach(u => {
        const enrichment = ENRICHMENT_MAP[u.id];
        if (enrichment) {
          if (enrichment.falseCognates) u.falseCognates = enrichment.falseCognates;
          if (enrichment.pronunciationLab) u.pronunciationLab = enrichment.pronunciationLab;
          if (enrichment.crucible) {
            u.crucible = Object.assign({}, u.crucible, enrichment.crucible);
          }
        }
      });
    });
    console.log('✓ Injected pedagogical modules into all 16 MCER units.');
  }
} catch (e) {
  console.warn('Pedagogical enrichment warning:', e.message);
}

// Generate final clean JS file
const fileContent = `/**
 * ==============================================================================
 * stemOS LXP — Catálogo Curricular MCER Core (Standard American English)
 * Niveles Canónicos A1 • A2 • B1 • B2 — 60.0 Horas Activas por Nivel (240.0h Total)
 * 
 * Alineación Internacional:
 * - Marco Común Europeo de Referencia para las Lenguas (MCER / CEFR)
 * - Standard American English (Spelling, Pronunciation IPA & Workplace Pragmatics)
 * - Acreditación de Tronco Común Universitario (Inglés I, II, III, IV — 60.0h / nivel)
 * - W3C Open Badges 3.0 & Descriptor Mapping (Can-Do Statements)
 * ==============================================================================
 */

(function (root, factory) {
  const result = factory();
  if (typeof define === 'function' && define.amd) {
    define([], () => result);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = result;
  }
  if (typeof root !== 'undefined') {
    root.STEMOS_MCER_TRACKS = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_MCER_TRACKS = result;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const MCER_LEVELS = ${JSON.stringify(MCER_LEVELS, null, 2)};

  function normalizeUnit(u, lvl) {
    const lines = (u.dialogue && u.dialogue.lines) ? u.dialogue.lines : (Array.isArray(u.dialogue) ? u.dialogue : []);
    const dialogueArr = [...lines];
    dialogueArr.title = (u.dialogue && u.dialogue.title) || u.title;
    dialogueArr.speakers = (u.dialogue && u.dialogue.speakers) || [];
    dialogueArr.lines = lines;

    const vocab = (u.vocabulary || []).map(v => Object.assign({}, v, {
      term: v.term || v.en,
      en: v.en || v.term,
      sample: v.sample || v.example,
      example: v.example || v.sample
    }));

    const readingObj = Object.assign({}, u.reading, {
      passage: (u.reading && (u.reading.passage || u.reading.text)) || '',
      text: (u.reading && (u.reading.text || u.reading.passage)) || '',
      questions: (u.reading && u.reading.questions) || (u.reading && u.reading.question ? [{
        q: u.reading.question,
        options: u.reading.options || [],
        answer: u.reading.correct !== undefined ? u.reading.correct : (u.reading.answer || 0),
        correct: u.reading.correct !== undefined ? u.reading.correct : (u.reading.answer || 0)
      }] : [])
    });

    const quizArr = (u.unitQuiz || u.quiz || []).map(q => ({
      q: q.q || q.question,
      question: q.question || q.q,
      opts: q.opts || q.options,
      options: q.options || q.opts,
      ans: q.ans !== undefined ? q.ans : q.answer,
      answer: q.answer !== undefined ? q.answer : q.ans,
      exp: q.exp || q.explanation,
      explanation: q.explanation || q.exp
    }));

    const crucibleObj = Object.assign({
      title: 'Plant Crucible Simulation',
      context: '',
      scenario: '',
      role: 'Engineering Specialist',
      modelResponse: '',
      keywords: []
    }, u.crucible || {});

    return Object.assign({}, u, {
      levelCode: lvl.code,
      levelName: lvl.name,
      levelColor: lvl.color,
      cefr: lvl.code,
      assignedLevel: lvl.code,
      unitNumber: u.unitNum || u.unitNumber,
      canDo: u.cefrDescriptor || u.canDo,
      dialogue: dialogueArr,
      vocabulary: vocab,
      reading: readingObj,
      quiz: quizArr,
      unitQuiz: quizArr,
      falseCognates: u.falseCognates || [],
      pronunciationLab: u.pronunciationLab || [],
      crucible: crucibleObj
    });
  }

  return {
    version: '2.0.0-60h-accredited',
    title: 'stemOS MCER Core — 60h Accredited Courses (A1-B2)',
    levels: MCER_LEVELS,
    getLevelById: function(levelId) {
      return MCER_LEVELS.find(l => l.id === levelId || l.code.toLowerCase() === levelId.toLowerCase());
    },
    getLevel: function(levelId) {
      return this.getLevelById(levelId);
    },
    getAllUnits: function() {
      const allUnits = [];
      MCER_LEVELS.forEach(lvl => {
        lvl.units.forEach(u => {
          allUnits.push(normalizeUnit(u, lvl));
        });
      });
      return allUnits;
    },
    getUnitById: function(unitId) {
      for (const lvl of MCER_LEVELS) {
        const found = lvl.units.find(u => u.id === unitId);
        if (found) {
          return normalizeUnit(found, lvl);
        }
      }
      return null;
    }
  };
}));
`;

fs.writeFileSync(outRoot, fileContent, 'utf8');
fs.writeFileSync(outDev, fileContent, 'utf8');

console.log(`✅ Successfully generated 60.0h MCER catalog:`);
console.log(`   - Root: ${outRoot} (${fileContent.length} bytes)`);
console.log(`   - Dev:  ${outDev} (${fileContent.length} bytes)`);
console.log(`   - 4 Levels (A1, A2, B1, B2) x 60.0h = 240.0h Total`);
console.log(`   - 16 Comprehensive Units with Vocabulary, Dialogues, Readings, Crucibles, and Quizzes.`);
