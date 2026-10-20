/**
 * ==============================================================================
 * stemOS LXP — Catálogo Curricular MCER Core (Standard American English)
 * Niveles Canónicos A1 • A2 • B1 • B2
 * 
 * Alineación Internacional:
 * - Marco Común Europeo de Referencia para las Lenguas (MCER / CEFR)
 * - Standard American English (Spelling, Pronunciation IPA & Workplace Pragmatics)
 * - Acreditación de Tronco Común Universitario (Inglés I, II, III, IV)
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

  const MCER_LEVELS = [
    {
      id: 'mcer-a1',
      code: 'A1',
      name: 'Breakthrough / Beginner',
      nameES: 'Nivel A1: Fundamentos y Comunicación Cotidiana',
      badge: 'CEFR A1 Novice',
      color: '#10b981',
      icon: 'fa-seedling',
      totalHours: 15.0,
      totalXP: 1400,
      summary: 'Desarrolla las competencias esenciales para presentarse, intercambiar información personal y laboral básica, describir rutinas diarias, horarios y comprender instrucciones sencillas en el entorno de trabajo.',
      units: [
        {
          id: 'a1-u1',
          unitNum: 1,
          title: 'Personal & Professional Introductions',
          titleES: 'Presentación Personal y Roles Laborales',
          cefrDescriptor: 'Can introduce him/herself and others and can ask and answer questions about personal details such as where he/she lives, people he/she knows and things he/she has.',
          grammarFocus: 'Verb to be (am/is/are), Subject Pronouns, Possessive Adjectives (my, your, his, her), Question Words (What, Who, Where)',
          communicativeGoal: 'Presentarse con colegas y supervisores, deletrear nombres, dar números de teléfono y describir puestos de trabajo simples.',
          vocabulary: [
            { en: 'Coworker', es: 'Compañero de trabajo', ipa: '/ˈkoʊˌwɜːrkər/', example: 'This is Diana, my new coworker in quality inspection.' },
            { en: 'Shift Manager', es: 'Supervisor de turno', ipa: '/ʃɪft ˈmænɪdʒər/', example: 'Carlos is our shift manager on the morning crew.' },
            { en: 'Employee ID Badge', es: 'Credencial de empleado', ipa: '/ɛmˈplɔɪiː aɪˈdiː bædʒ/', example: 'Please scan your employee badge at the turnstile.' },
            { en: 'Workstation', es: 'Estación de trabajo', ipa: '/ˈwɜːrkˌsteɪʃən/', example: 'My workstation is located next to the assembly line.' },
            { en: 'Department', es: 'Departamento / Área', ipa: '/dɪˈpɑːrtmənt/', example: 'Which department are you assigned to this semester?' }
          ],
          dialogue: {
            title: 'First Day at the Facility',
            speakers: ['Mark (Supervisor)', 'Alex (New Hire)'],
            lines: [
              { speaker: 'Mark', text: 'Good morning! Welcome to the team. Are you Alex Rivera?' },
              { speaker: 'Alex', text: 'Good morning, yes, I am. Nice to meet you, Mark.' },
              { speaker: 'Mark', text: 'Nice to meet you too. Here is your temporary badge. What is your employee number?' },
              { speaker: 'Alex', text: 'It is 8-4-0-2-9. My workstation is at Line 3, right?' },
              { speaker: 'Mark', text: 'That is correct. Let me introduce you to your team lead.' }
            ]
          },
          reading: {
            title: 'New Employee Registration Memo',
            text: 'Welcome to Northern Tech Facility. All new interns must complete their orientation badge registration by 9:00 AM. Please bring your official government ID and emergency contact information to Human Resources on the second floor. Lockers are available in Room 104.',
            question: 'Where should new interns take their emergency contact info?',
            options: ['To Room 104', 'To Human Resources on the second floor', 'To Line 3', 'To the security gate'],
            correct: 1
          },
          quiz: [
            { q: 'Hello, _____ name is David and I am an electrical intern.', opts: ['my', 'me', 'mine', 'I'], ans: 0, exp: 'Use possessive adjective "my" before a noun.' },
            { q: 'Where _____ your workstation located?', opts: ['are', 'is', 'be', 'am'], ans: 1, exp: 'Workstation is singular, so it takes "is".' },
            { q: 'How do you politely introduce someone else?', opts: ['Look at this person', 'This is Maria, our team coordinator', 'Who is Maria', 'Maria is she'], ans: 1, exp: '"This is [Name]" is the standard professional introduction formula.' }
          ]
        },
        {
          id: 'a1-u2',
          unitNum: 2,
          title: 'Workplace Routines, Time & Schedules',
          titleES: 'Rutinas Laborales, Horarios y Turnos',
          cefrDescriptor: 'Can describe daily routines, times of day, shift schedules, and regular work activities using simple phrases.',
          grammarFocus: 'Simple Present (affirmative/negative/questions), Adverbs of Frequency (always, usually, sometimes, never), Prepositions of Time (at 8:00, in the morning, on Monday)',
          communicativeGoal: 'Informar a qué hora inicia y termina un turno, describir actividades de rutina y programar descansos.',
          vocabulary: [
            { en: 'Shift Handover', es: 'Entrega de turno', ipa: '/ʃɪft ˈhændˌoʊvər/', example: 'Shift handover takes place every day at 2:45 PM.' },
            { en: 'Break Room', es: 'Comedor / Sala de descanso', ipa: '/breɪk ruːm/', example: 'Coffee and water are available in the break room.' },
            { en: 'Daily Log', es: 'Bitácora diaria', ipa: '/ˈdeɪli lɔːɡ/', example: 'Technicians always update the daily log before leaving.' },
            { en: 'Punch In / Punch Out', es: 'Checar entrada / salida', ipa: '/pʌntʃ ɪn / pʌntʃ aʊt/', example: 'Remember to punch in before putting on your safety gear.' },
            { en: 'On Time', es: 'Puntual / A tiempo', ipa: '/ɑːn taɪm/', example: "The morning meeting starts on time at eight o\'clock sharp." }
          ],
          dialogue: {
            title: 'Checking the Weekly Roster',
            speakers: ['Elena (Technician)', 'Javier (Operator)'],
            lines: [
              { speaker: 'Elena', text: 'Hi Javier, what shift do you work this week?' },
              { speaker: 'Javier', text: 'I work the first shift, from 7:00 AM to 3:30 PM, Monday through Friday.' },
              { speaker: 'Elena', text: 'Great. When is our team safety briefing?' },
              { speaker: 'Javier', text: 'We always have the briefing at 7:15 AM in the main corridor.' },
              { speaker: 'Elena', text: 'Got it. I will see you there tomorrow morning.' }
            ]
          },
          reading: {
            title: 'Shift Hours & Cafeteria Schedule',
            text: 'First shift operations run from 07:00 to 15:30. Scheduled lunch breaks are staggered: Group A eats at 11:30 AM, and Group B eats at 12:15 PM. Do not leave machines running unattended during break time.',
            question: 'When does Group B have their lunch break?',
            options: ['At 07:00 AM', 'At 11:30 AM', 'At 12:15 PM', 'At 15:30 PM'],
            correct: 2
          },
          quiz: [
            { q: 'The safety briefing starts _____ 7:15 AM every morning.', opts: ['in', 'on', 'at', 'to'], ans: 2, exp: 'Use "at" with specific times.' },
            { q: 'She _____ late to her workstation; she is always punctual.', opts: ['never is', 'is never', 'does never', 'not is'], ans: 1, exp: 'The verb "to be" comes before adverbs of frequency: "is never".' },
            { q: 'What _____ you do during shift turnover?', opts: ['do', 'does', 'are', 'did'], ans: 0, exp: 'With "you" in Simple Present questions, use auxiliary "do".' }
          ]
        },
        {
          id: 'a1-u3',
          unitNum: 3,
          title: 'Workstation Navigation, Tools & Supplies',
          titleES: 'Ubicación en Planta, Herramientas y Suministros',
          cefrDescriptor: 'Can understand and use simple descriptions of physical locations, tools, basic supplies, and prepositions of place.',
          grammarFocus: 'There is / There are, Prepositions of Place (in, on, under, next to, between, across from), Plural Nouns (regular/irregular)',
          communicativeGoal: 'Indicar dónde se guardan herramientas y refacciones, pedir insumos y orientar a compañeros en el edificio.',
          vocabulary: [
            { en: 'Toolbox', es: 'Caja de herramientas', ipa: '/ˈtuːlˌbɑːks/', example: 'There is a calibrated torque wrench in the yellow toolbox.' },
            { en: 'Spare Parts', es: 'Refacciones / Piezas de repuesto', ipa: '/spɛər pɑːrts/', example: 'Spare parts are kept in Cabinet B across from the tool crib.' },
            { en: 'Safety Goggles', es: 'Lentes de seguridad', ipa: '/ˈseɪfti ˈɡɑːɡəlz/', example: 'Safety goggles are mandatory inside the production zone.' },
            { en: 'Storage Rack', es: 'Estante de almacenamiento', ipa: '/ˈstɔːrɪdʒ ræk/', example: 'Raw materials are stacked on the lower storage rack.' },
            { en: 'Emergency Exit', es: 'Salida de emergencia', ipa: '/ɪˈmɜːrdʒənsi ˈɛɡzɪt/', example: 'The emergency exit is between Line 2 and the testing bay.' }
          ],
          dialogue: {
            title: 'Locating the Replacement Sensors',
            speakers: ['Tom (Engineer)', 'Mateo (Intern)'],
            lines: [
              { speaker: 'Tom', text: 'Mateo, where are the replacement optical sensors?' },
              { speaker: 'Mateo', text: 'There are three boxes on the middle shelf, next to the digital calipers.' },
              { speaker: 'Tom', text: 'Great. Is there any electrical tape left?' },
              { speaker: 'Mateo', text: 'Yes, there is some inside the top drawer of the green cart.' },
              { speaker: 'Tom', text: 'Thanks! Make sure to put the safety goggles on before entering.' }
            ]
          },
          reading: {
            title: 'Tool Crib Checkout Rules',
            text: 'All specialized diagnostic tools must be signed out using the electronic scanner. Clean all calipers and gauges before returning them to Shelf 4. Do not leave tools on top of machines after completing a work order.',
            question: 'What must you do before returning tools to Shelf 4?',
            options: ['Paint them yellow', 'Clean all calipers and gauges', 'Leave them on the machine', 'Take them to HR'],
            correct: 1
          },
          quiz: [
            { q: '_____ two emergency eyewash stations next to the chemical storage.', opts: ['There is', 'There are', 'They have', 'Are there'], ans: 1, exp: 'Use "There are" with plural subjects.' },
            { q: 'The digital multimeters are _____ the top drawer of Cabinet 3.', opts: ['in', 'at', 'on to', 'between'], ans: 0, exp: 'Use "in" for items inside a container or drawer.' },
            { q: 'How do you say "lentes de seguridad" in American workplace English?', opts: ['Safety shoes', 'Safety goggles', 'Safety helmet', 'Safety belt'], ans: 1, exp: '"Safety goggles" or "safety glasses" is standard.' }
          ]
        },
        {
          id: 'a1-u4',
          unitNum: 4,
          title: 'Simple Requests, Imperatives & Safety Signs',
          titleES: 'Instrucciones Simples, Imperativos y Señalética',
          cefrDescriptor: 'Can understand short, simple instructions, safety warning signs, and make direct requests using polite formulas (please, can you).',
          grammarFocus: 'Imperatives (Do / Do not / Don\'t), Modal "Can" for requests (Can you pass me...?), Polite markers (Please, Thank you, Excuse me)',
          communicativeGoal: 'Comprender letreros de advertencia en equipo de trabajo, pedir materiales con cortesía y seguir listas de verificación simples.',
          vocabulary: [
            { en: 'Caution', es: 'Precaución / Advertencia', ipa: '/ˈkɔːʃən/', example: 'Caution: Hot surface, do not touch without heat-resistant gloves.' },
            { en: 'Ear Protection', es: 'Protección auditiva', ipa: '/ɪər prəˈtɛkʃən/', example: 'Ear protection required beyond this yellow boundary line.' },
            { en: 'Shut Down', es: 'Apagar / Desconectar', ipa: '/ʃʌt daʊn/', example: 'Please shut down the conveyor belt before clearing the jam.' },
            { en: 'Authorized Personnel', es: 'Personal autorizado', ipa: '/ˈɔːθəˌraɪzd ˌpɜːrsəˈnɛl/', example: 'High-voltage enclosure: authorized personnel only.' },
            { en: 'Keep Clear', es: 'Mantener despejado', ipa: '/kiːp klɪər/', example: 'Keep this doorway clear of pallets at all times.' }
          ],
          dialogue: {
            title: 'Requesting Assistance on the Floor',
            speakers: ['Rachel (Lead)', 'David (Apprentice)'],
            lines: [
              { speaker: 'Rachel', text: 'David, please stop the feeder conveyor for a moment.' },
              { speaker: 'David', text: 'Sure. Done. Is there a problem?' },
              { speaker: 'Rachel', text: 'Yes, can you hand me the 10mm Allen wrench from the tool tray?' },
              { speaker: 'David', text: 'Here you go. Do you need a flashlight as well?' },
              { speaker: 'Rachel', text: 'Yes, please. Hold it right here on the motor bracket.' }
            ]
          },
          reading: {
            title: 'Machine Bay Safety Notice',
            text: 'DANGER: AUTOMATIC MACHINE MAY START WITHOUT WARNING. Always lock out electrical disconnect switch before performing maintenance or servicing. Keep hands and loose clothing away from rotating spindles.',
            question: 'What must you do before performing maintenance?',
            options: ['Start the machine immediately', 'Lock out electrical disconnect switch', 'Put loose clothing inside', 'Call HR'],
            correct: 1
          },
          quiz: [
            { q: '_____ touch the red emergency button unless there is an immediate danger.', opts: ['Not', 'Do not', 'No to', 'Are not'], ans: 1, exp: 'Negative imperatives use "Do not" or "Don\'t".' },
            { q: 'Excuse me, _____ you pass me the torque wrench, please?', opts: ['can', 'do', 'must', 'have'], ans: 0, exp: '"Can you [verb]...?" is the standard polite request formula.' },
            { q: 'What does a yellow sign saying "KEEP CLEAR" mean?', opts: ['Keep this area dirty', 'Do not block this area with objects', 'Clean this once a year', 'Only visitors allowed'], ans: 1, exp: '"Keep clear" means keep the pathway unobstructed.' }
          ]
        }
      ],
      milestone: {
        title: 'Milestone Checkpoint A1: Novice Workplace Communicator',
        questions: 10,
        passingGrade: 80,
        badgeId: 'badge-mcer-a1',
        badgeName: 'CEFR A1: Foundations in Standard American English'
      }
    },
    {
      id: 'mcer-a2',
      code: 'A2',
      name: 'Waystage / Elementary',
      nameES: 'Nivel A2: Operaciones Laborales y Comunicación Práctica',
      badge: 'CEFR A2 Waystage',
      color: '#38bdf8',
      icon: 'fa-cubes',
      totalHours: 15.0,
      totalXP: 1400,
      summary: 'Capacita al alumno para relatar actividades pasadas e incidentes menores, comparar herramientas y piezas por especificaciones técnicas, programar juntas y describir desperfectos con cortesía.',
      units: [
        {
          id: 'a2-u1',
          unitNum: 1,
          title: 'Past Actions & Shift Incident Logs',
          titleES: 'Acciones Pasadas y Registro de Incidentes',
          cefrDescriptor: 'Can describe past events, past activities, and personal experiences related to work using simple connected sentences.',
          grammarFocus: 'Simple Past (regular verbs -ed, common irregular verbs: went, saw, had, spoke, made), Time expressions (yesterday, last week, two hours ago), Past questions with Did',
          communicativeGoal: 'Explicar qué ocurrió en el turno anterior, reportar anomalías pasadas y redactar bitácoras breves de trabajo.',
          vocabulary: [
            { en: 'Malfunction', es: 'Falla / Desperfecto', ipa: '/mælˈfʌŋkʃən/', example: 'The hydraulic pump malfunctioned around 11:30 AM yesterday.' },
            { en: 'Replaced', es: 'Reemplazado / Cambiado', ipa: '/rɪˈpleɪst/', example: 'We replaced the worn timing belt during preventive maintenance.' },
            { en: 'Inspection', es: 'Inspección técnica', ipa: '/ɪnˈspɛkʃən/', example: 'Quality assurance completed the dimensional inspection this morning.' },
            { en: 'Downtime', es: 'Tiempo muerto / Paro de línea', ipa: '/ˈdaʊnˌtaɪm/', example: 'Line 2 experienced 45 minutes of unexpected downtime.' },
            { en: 'Logged', es: 'Registrado en bitácora', ipa: '/lɔːɡd/', example: 'The technician logged the voltage variance in the shift binder.' }
          ],
          dialogue: {
            title: 'Morning Shift Handover Briefing',
            speakers: ['Luis (Night Lead)', 'Claudia (Morning Lead)'],
            lines: [
              { speaker: 'Luis', text: 'Good morning, Claudia. Here is the shift handover log.' },
              { speaker: 'Claudia', text: 'Thanks, Luis. Did you have any downtime during the night shift?' },
              { speaker: 'Luis', text: 'Yes, Station 4 stopped for about twenty minutes because a proximity sensor came loose.' },
              { speaker: 'Claudia', text: 'Did the maintenance technician fix it?' },
              { speaker: 'Luis', text: 'Yes, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward.' }
            ]
          },
          reading: {
            title: 'End-of-Shift Maintenance Summary',
            text: 'Date: Oct 18. Technician: R. Gomez. At 14:15, motor drive #3 overheated and triggered thermal alarm code E-04. The crew inspected the cooling fan, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature was restored.',
            question: 'What caused motor drive #3 to stop?',
            options: ['Low lubricating oil', 'It overheated and triggered alarm code E-04', 'A loose cable in Room 104', 'An emergency stop drill'],
            correct: 1
          },
          quiz: [
            { q: 'Yesterday the maintenance crew _____ the main water cooling pump.', opts: ['replace', 'replaced', 'was replace', 'replacing'], ans: 1, exp: 'Simple Past regular verb takes "-ed": replaced.' },
            { q: '_____ you verify the calibration measurements before starting the line?', opts: ['Did', 'Do', 'Were', 'Have'], ans: 0, exp: 'Simple Past questions use auxiliary "Did".' },
            { q: 'What does "downtime" mean in a production plant?', opts: ['Time when workers sleep', 'Period when equipment is stopped and not producing', 'Time spent eating lunch', 'Overtime pay'], ans: 1, exp: 'Downtime refers to non-productive equipment stoppage.' }
          ]
        },
        {
          id: 'a2-u2',
          unitNum: 2,
          title: 'Comparing Equipment, Specs & Materials',
          titleES: 'Comparación de Equipos, Especificaciones y Materiales',
          cefrDescriptor: 'Can make simple comparisons between items, tools, materials, and processes, discussing dimensions, weight, speed, and cost.',
          grammarFocus: 'Comparative and Superlative Adjectives (cheaper than, more durable than, fastest, most efficient), as... as, Quantity expressions (more, less, fewer)',
          communicativeGoal: 'Comparar dos opciones técnicas de refacciones o equipos, sustentando cuál es más rápida, duradera o económica.',
          vocabulary: [
            { en: 'Durable', es: 'Duradero / Resistente', ipa: '/ˈdʊrəbəl/', example: 'Carbide cutting tips are significantly more durable than steel tips.' },
            { en: 'Lightweight', es: 'Ligero / De bajo peso', ipa: '/ˈlaɪtˌweɪt/', example: 'Aluminum brackets are lighter than cast iron brackets.' },
            { en: 'Cost-Effective', es: 'Rentable / Eficiente en costo', ipa: '/ˌkɔːst ɪˈfɛktɪv/', example: 'Refurbishing the pneumatic valves is more cost-effective than buying new ones.' },
            { en: 'Tolerance', es: 'Tolerancia de precisión', ipa: '/ˈtɑːlərəns/', example: 'This CNC mill holds a tighter tolerance than the manual lathe.' },
            { en: 'Throughput', es: 'Rendimiento / Volumen procesado', ipa: '/ˈθruːˌpʊt/', example: 'The automated packaging cell has a higher throughput than manual boxing.' }
          ],
          dialogue: {
            title: 'Selecting the Best Fastener Material',
            speakers: ['Sara (Buyer)', 'Ken (Lead Mech)'],
            lines: [
              { speaker: 'Sara', text: 'Ken, we have two vendor quotes for the assembly screws: stainless steel and zinc-plated.' },
              { speaker: 'Ken', text: 'Zinc-plated screws are cheaper, but stainless steel is much more corrosion-resistant.' },
              { speaker: 'Sara', text: 'Will zinc screws survive our outdoor testing specs?' },
              { speaker: 'Ken', text: 'No, stainless steel is the safest choice for high-humidity environments.' },
              { speaker: 'Sara', text: 'Understood. I will place the order for stainless steel today.' }
            ]
          },
          reading: {
            title: 'Material Comparison Report: Polycarbonate vs Acrylic',
            text: 'When choosing transparent machine guards, polycarbonate offers 250 times the impact resistance of standard glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant, polycarbonate is far safer for high-pressure debris containment.',
            question: 'Why is polycarbonate preferred for high-pressure debris containment?',
            options: ['It is cheaper than glass', 'It offers far higher impact resistance', 'It is made of wood', 'It scratches easily'],
            correct: 1
          },
          quiz: [
            { q: 'The new robotic cell is _____ than the legacy conveyor system.', opts: ['fast', 'faster', 'more fast', 'fastest'], ans: 1, exp: 'One-syllable adjectives take "-er": faster than.' },
            { q: 'Stainless steel fasteners are _____ expensive than zinc fasteners, but they resist corrosion better.', opts: ['much', 'more', 'most', 'as'], ans: 1, exp: 'Multi-syllable adjectives take "more": more expensive.' },
            { q: 'Which machine holds the _____ tolerance in the machine shop?', opts: ['tight', 'tighter', 'tightest', 'more tight'], ans: 2, exp: 'Superlative takes "the" + "-est": tightest.' }
          ]
        },
        {
          id: 'a2-u3',
          unitNum: 3,
          title: 'Scheduling, Agendas & Future Deadlines',
          titleES: 'Agendas, Fechas Límite y Planes Futuros',
          cefrDescriptor: 'Can communicate future plans, arrange meetings, schedule appointments, and discuss project target dates using simple future forms.',
          grammarFocus: 'Future with "going to" (planned intentions), Future with "will" (offers/spontaneous decisions), Time clauses (when, as soon as, by next Friday)',
          communicativeGoal: 'Agendar juntas técnicas, confirmar fechas de entrega con proveedores y coordinar citas de mantenimiento.',
          vocabulary: [
            { en: 'Deadline', es: 'Fecha límite / Plazo de entrega', ipa: '/ˈdɛdˌlaɪn/', example: 'The hard deadline for the prototype submission is next Thursday.' },
            { en: 'Reschedule', es: 'Reprogramar / Reagendar', ipa: '/riːˈskɛdʒuːl/', example: 'Can we reschedule our calibration review to tomorrow at 10:00 AM?' },
            { en: 'Milestone', es: 'Hito / Etapa clave', ipa: '/ˈmaɪlˌstoʊn/', example: 'Reaching 10,000 continuous operating hours is a critical milestone.' },
            { en: 'Delivery Date', es: 'Fecha de entrega', ipa: '/dɪˈlɪvəri deɪt/', example: 'The supplier confirmed the raw steel delivery date for Monday morning.' },
            { en: 'Follow Up', es: 'Dar seguimiento', ipa: '/ˈfɑːloʊ ʌp/', example: 'I will follow up with the plant director after the audit.' }
          ],
          dialogue: {
            title: 'Arranging the Vendor Calibration Audit',
            speakers: ['Patricia (Quality)', 'Mr. Barnes (Vendor)'],
            lines: [
              { speaker: 'Patricia', text: 'Good morning, Mr. Barnes. We are going to conduct our annual tooling calibration next month.' },
              { speaker: 'Mr. Barnes', text: 'Hello Patricia. When are your technicians available for our on-site team?' },
              { speaker: 'Patricia', text: 'We are planning for Tuesday the 14th. Will your calibration team be ready by then?' },
              { speaker: 'Mr. Barnes', text: 'Yes, I will confirm the service flight details and email you the safety clearances today.' },
              { speaker: 'Patricia', text: 'Perfect. We will prepare the cleanroom access badges in advance.' }
            ]
          },
          reading: {
            title: 'Upcoming Facility Preventive Maintenance Notice',
            text: 'Notice: Next Saturday, November 3rd, the facility electrical substation will be shut down from 06:00 to 14:00 for transformer oil testing. Backup generators will supply emergency lighting and server rooms only. All work orders must be completed by Friday afternoon.',
            question: 'What will happen next Saturday between 06:00 and 14:00?',
            options: ['A company party', 'The electrical substation will be shut down for maintenance', 'Production will double', 'All workers must work overtime'],
            correct: 1
          },
          quiz: [
            { q: 'We _____ to install the upgraded safety light curtains next Monday morning.', opts: ['are going', 'will going', 'going', 'is going'], ans: 0, exp: 'Use "are going [to verb]" for planned group intentions.' },
            { q: 'Don\'t worry about the report; I _____ email the customer right now.', opts: ['am going', 'will', 'did', 'have'], ans: 1, exp: 'Use "will" for immediate spontaneous decisions and offers.' },
            { q: 'Please submit your tooling inventory _____ Friday at 3:00 PM.', opts: ['on', 'by', 'until to', 'in'], ans: 1, exp: '"By [time/day]" indicates on or before a deadline.' }
          ]
        },
        {
          id: 'a2-u4',
          unitNum: 4,
          title: 'Troubleshooting & Describing Problems',
          titleES: 'Resolución de Problemas y Descripción de Fallas',
          cefrDescriptor: 'Can describe simple mechanical, electrical, or software malfunctions, symptoms, and communicate with technical support.',
          grammarFocus: 'Modals for obligation and advice (should, must, have to), Present Continuous for ongoing issues (is vibrating, are leaking), Stative vs Dynamic verbs',
          communicativeGoal: 'Describir ruidos anómalos, fugas, sobrecalentamientos y solicitar asistencia técnica sin malentendidos.',
          vocabulary: [
            { en: 'Leak', es: 'Fuga / Goteo', ipa: '/liːk/', example: 'There is a hydraulic fluid leak under the main clamp cylinder.' },
            { en: 'Vibration', es: 'Vibración excesiva', ipa: '/vaɪˈbreɪʃən/', example: 'The blower motor has an abnormal vibration at high speeds.' },
            { en: 'Overheating', es: 'Sobrecalentamiento', ipa: '/ˌoʊvərˈhiːtɪŋ/', example: 'The servo controller is overheating due to blocked air ventilation.' },
            { en: 'Tighten', es: 'Apretar / Ajustar', ipa: '/ˈtaɪtən/', example: 'Please tighten the four hex bolts to 35 Newton-meters.' },
            { en: 'Reset', es: 'Reiniciar / Restablecer', ipa: '/riːˈsɛt/', example: 'Press and hold the blue button for three seconds to reset the PLC.' }
          ],
          dialogue: {
            title: 'Reporting an Air Pressure Drop',
            speakers: ['Oscar (Operator)', 'Sam (Maintenance)'],
            lines: [
              { speaker: 'Oscar', text: 'Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very slowly.' },
              { speaker: 'Sam', text: 'Sure. Let me check the pressure gauge. It shows 40 PSI, but it should be 85 PSI.' },
              { speaker: 'Oscar', text: 'Do you hear that hissing noise behind the valve manifold?' },
              { speaker: 'Sam', text: 'Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring.' },
              { speaker: 'Oscar', text: 'Understood. I will hit the pneumatic isolation lever now.' }
            ]
          },
          reading: {
            title: 'Basic Machine Troubleshooting Flowchart',
            text: 'Step 1: Check emergency stop buttons. If depressed, twist clockwise to release. Step 2: Inspect breaker panel. If tripped, notify licensed electrician. Step 3: Check pneumatic pressure gauge. If below 6 bar, check main supply valve. Step 4: If issue persists, log code in ticket system.',
            question: 'What is Step 1 in the troubleshooting guide?',
            options: ['Notify licensed electrician', 'Check emergency stop buttons and twist clockwise if depressed', 'Buy a new machine', 'Turn off all building lights'],
            correct: 1
          },
          quiz: [
            { q: 'The hydraulic hose _____ fluid onto the floor; we need to turn off the pump.', opts: ['leaks', 'is leaking', 'leaked already', 'was leak'], ans: 1, exp: 'Use Present Continuous "is leaking" for an action happening right now.' },
            { q: 'Technicians _____ wear hearing protection inside the stamping press area.', opts: ['must', 'might', 'can', 'should to'], ans: 0, exp: '"Must" expresses strict mandatory requirement/rule.' },
            { q: 'What should you do if an air hose has a hissing sound?', opts: ['Ignore it', 'Check for a leak and inspect fittings', 'Throw water on it', 'Speed up the line'], ans: 1, exp: 'A hissing sound in pneumatic lines indicates a pressurized gas leak.' }
          ]
        }
      ],
      milestone: {
        title: 'Milestone Checkpoint A2: Practical Workplace Operator',
        questions: 10,
        passingGrade: 80,
        badgeId: 'badge-mcer-a2',
        badgeName: 'CEFR A2: Practical Workplace English'
      }
    },
    {
      id: 'mcer-b1',
      code: 'B1',
      name: 'Threshold / Intermediate',
      nameES: 'Nivel B1: Autonomía Profesional y Procesos',
      badge: 'CEFR B1 Intermediate',
      color: '#f59e0b',
      icon: 'fa-chart-simple',
      totalHours: 15.0,
      totalXP: 1400,
      summary: 'Permite al estudiante desenvolverse con soltura en ambientes profesionales: redactar correos ejecutivos, explicar procedimientos operativos (SOPs), expresar desacuerdos constructivos y resolver contingencias.',
      units: [
        {
          id: 'b1-u1',
          unitNum: 1,
          title: 'Explaining Workflows & Standard Operating Procedures',
          titleES: 'Explicación de Flujos de Trabajo y Procedimientos SOP',
          cefrDescriptor: 'Can give straightforward descriptions of how to carry out a procedure or process, explain cause and effect, and link a series of shorter discrete elements into a connected sequence.',
          grammarFocus: 'Passive Voice in technical descriptions (is assembled, are tested, was inspected), Sequence Connectors (First, Subsequently, Once that is complete, Finally), Cause & Effect (due to, as a result of, therefore)',
          communicativeGoal: 'Explicar cómo funciona un proceso paso a paso, redactar instrucciones operativas estándar (SOP) y describir cómo se fabrican o inspeccionan productos.',
          vocabulary: [
            { en: 'Standard Operating Procedure (SOP)', es: 'Procedimiento Operativo Estándar', ipa: '/ˈstændərd ˈɑːpəˌreɪtɪŋ prəˈsiːdʒər/', example: 'All operators must follow the approved SOP to ensure consistent quality.' },
            { en: 'Sequential', es: 'Secuencial / Paso a paso', ipa: '/sɪˈkwɛnʃəl/', example: 'The test protocol requires strict sequential execution of five validation steps.' },
            { en: 'Discrepancy', es: 'Discrepancia / Diferencia', ipa: '/dɪˈskrɛpənsi/', example: 'A dimensional discrepancy was detected between CAD model and physical part.' },
            { en: 'Calibrated', es: 'Calibrado bajo norma', ipa: '/ˈkælɪˌbreɪtɪd/', example: 'The micrometer is calibrated every six months according to ISO standards.' },
            { en: 'Root Cause', es: 'Causa raíz del problema', ipa: '/ruːt kɔːz/', example: 'The engineering team investigated the root cause of the weld fracture.' }
          ],
          dialogue: {
            title: 'Walking Through a Quality Inspection SOP',
            speakers: ['Andrea (Quality Engineer)', 'Brian (Process Tech)'],
            lines: [
              { speaker: 'Andrea', text: 'Brian, could you walk me through the inspection process for this stamped bracket?' },
              { speaker: 'Brian', text: 'Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge.' },
              { speaker: 'Andrea', text: 'What happens if a hole diameter is out of tolerance?' },
              { speaker: 'Brian', text: 'If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES system.' },
              { speaker: 'Andrea', text: 'Excellent. That aligns perfectly with our ISO 9001 quality procedure.' }
            ]
          },
          reading: {
            title: 'SOP-204: Automated Optical Inspection (AOI) Protocol',
            text: 'Purpose: To verify surface mount component alignment. Procedure: Once PCBs enter the inspection conveyor, dual 4K cameras capture top-side fiducial markers. Image algorithms compare component placement against Gerber design files. If any component exceeds 0.05mm tilt, the PCB is routed to manual rework station automatically.',
            question: 'What triggers a PCB to be routed to the manual rework station?',
            options: ['Cleaning with alcohol', 'If component tilt exceeds 0.05mm', 'When the operator is tired', 'After 10,000 units are built'],
            correct: 1
          },
          quiz: [
            { q: 'Every printed circuit board _____ inspected by automated optical cameras before shipment.', opts: ['is', 'are', 'has', 'were'], ans: 0, exp: 'Passive voice with singular subject: "is inspected".' },
            { q: 'The line stopped _____ a sudden drop in municipal electrical voltage.', opts: ['due to', 'because', 'so that', 'despite of'], ans: 0, exp: '"Due to" is followed by a noun phrase explaining the cause.' },
            { q: 'Which sequence connector best indicates the step happening right after the first?', opts: ['Finally', 'Subsequently', 'At last', 'To conclude'], ans: 1, exp: '"Subsequently" or "Next" introduces following procedural steps.' }
          ]
        },
        {
          id: 'b1-u2',
          unitNum: 2,
          title: 'Professional Email Correspondence & Status Reports',
          titleES: 'Redacción de Correos Profesionales y Reportes de Avance',
          cefrDescriptor: 'Can write straightforward, connected texts on familiar subjects, including formal business emails, progress updates, and meeting summaries.',
          grammarFocus: 'Formal vs Informal register, Present Perfect for completed accomplishments (We have completed, She has sent), Polite modals (Could you please, Would it be possible to)',
          communicativeGoal: 'Redactar correos electrónicos a clientes o proveedores de EE.UU. informando avances, solicitando cotizaciones y confirmando entregas.',
          vocabulary: [
            { en: 'Deliverable', es: 'Entregable del proyecto', ipa: '/dɪˈlɪvərəbəl/', example: 'The preliminary CAD drawing is our primary deliverable this week.' },
            { en: 'Action Item', es: 'Tarea acordada / Pendiente', ipa: '/ˈækʃən ˈaɪtəm/', example: 'Please review the action items listed at the end of the meeting minutes.' },
            { en: 'Inquiry', es: 'Consulta formal / Solicitud', ipa: '/ɪnˈkwaɪri/', example: 'We received an inquiry from the customer regarding thermal tolerances.' },
            { en: 'Attached', es: 'Adjunto / En el archivo anexo', ipa: '/əˈtætʃt/', example: 'Please find attached the signed inspection sign-off sheet.' },
            { en: 'Follow-Up', es: 'Seguimiento formal', ipa: '/ˈfɑːloʊ ʌp/', example: 'I am writing to follow up on our phone conversation from Tuesday.' }
          ],
          dialogue: {
            title: 'Drafting an Update Email to a US Project Manager',
            speakers: ['Monica (Project Lead)', 'Kevin (Engineering Manager)'],
            lines: [
              { speaker: 'Monica', text: 'Kevin, could you review this email draft before I send it to our client in Chicago?' },
              { speaker: 'Kevin', text: 'Sure, read it to me.' },
              { speaker: 'Monica', text: '"Dear Mr. Peterson, I am writing to provide a progress update on the prototype testing. We have successfully completed Milestone 2, and the dimensional reports are attached for your review. Please let us know if you have any questions."' },
              { speaker: 'Kevin', text: 'That is clear, professional, and concise. Send it out right away.' },
              { speaker: 'Monica', text: 'Thank you. I will add the CAD files to the attachment.' }
            ]
          },
          reading: {
            title: 'Sample Email: Project Status Milestone Notification',
            text: `Subject: Project Titan — Milestone 3 Completed (Validation Run)
Dear Team,
We are pleased to inform you that our engineering team has finalized the 24-hour endurance test for Project Titan. All telemetry parameters remained within nominal specifications. Attached is the complete data log. Our next meeting is scheduled for Thursday at 10:00 AM CST.
Best regards,
Carlos Mendez, Project Engineer`,
            question: 'What is the purpose of the email?',
            options: ['To cancel the project', 'To notify that Milestone 3 endurance test is completed successfully', 'To ask for money', 'To complain about working hours'],
            correct: 1
          },
          quiz: [
            { q: 'We _____ already finalized the tooling adjustments for the pilot run.', opts: ['have', 'has', 'are', 'did'], ans: 0, exp: 'Present Perfect with "we": "have finalized".' },
            { q: 'Which is the most professional closing formula for an executive email in the US?', opts: ['Bye bye', 'Best regards', 'See ya soon', 'Cheers mate'], ans: 1, exp: '"Best regards" or "Sincerely" is standard professional American etiquette.' },
            { q: 'Please find _____ the updated engineering change notice.', opts: ['attach', 'attached', 'attaching', 'attachment'], ans: 1, exp: 'Standard business formula: "Please find attached [the file]".' }
          ]
        },
        {
          id: 'b1-u3',
          unitNum: 3,
          title: 'Expressing Opinions, Agreement & Diplomatic Disagreement',
          titleES: 'Opiniones, Acuerdos y Desacuerdo Diplomático',
          cefrDescriptor: 'Can express opinions, briefly give reasons and explanations for opinions, plans and actions, and politely agree or disagree in professional discussions.',
          grammarFocus: 'Modal verbs for advice and possibility (might, could, should), Expressing partial agreement (I see your point, but... / That makes sense, however...), Softening language (It seems that / Perhaps we could)',
          communicativeGoal: 'Exponer puntos de vista en juntas técnicas sin sonar agresivo, defender propuestas con datos y proponer alternativas viables.',
          vocabulary: [
            { en: 'From my perspective', es: 'Desde mi perspectiva', ipa: '/frʌm maɪ pərˈspɛktɪv/', example: 'From my perspective, upgrading the conveyor sensor will prevent further line stops.' },
            { en: 'Trade-off', es: 'Compromiso / Balance entre dos opciones', ipa: '/ˈtreɪdˌɔːf/', example: 'There is a trade-off between higher cutting speed and tool wear.' },
            { en: 'Feasible', es: 'Factible / Viable', ipa: '/ˈfiːzəbəl/', example: 'Completing the installation in three days is feasible if we add a second crew.' },
            { en: 'I see your point', es: 'Entiendo tu punto', ipa: '/aɪ siː jɔːr pɔɪnt/', example: 'I see your point, but we must also consider the lead time for foreign parts.' },
            { en: 'Consensus', es: 'Consenso / Acuerdo mutuo', ipa: '/kənˈsɛnsəs/', example: 'The team reached a consensus to proceed with Option B.' }
          ],
          dialogue: {
            title: 'Technical Debate on Cycle Time Optimization',
            speakers: ['Victor (Process Lead)', 'Hannah (Operations)'],
            lines: [
              { speaker: 'Victor', text: 'I propose we increase the robot arm speed by 15% to meet the daily quota.' },
              { speaker: 'Hannah', text: 'I see your point, Victor, but that might increase thermal stress on the gearboxes.' },
              { speaker: 'Victor', text: 'That is true, but what if we lubricate the joints twice per shift instead of once?' },
              { speaker: 'Hannah', text: 'That could work as a temporary measure. Let\'s test it on one cell first and monitor vibration.' },
              { speaker: 'Victor', text: 'Agreed. That sounds like a sensible compromise.' }
            ]
          },
          reading: {
            title: 'Minutes of Meeting: Tooling Material Selection',
            text: 'Discussion: Team reviewed whether to switch to ceramic cutting inserts. Engineering raised concerns about brittleness during interrupted cuts. Compromise: Quality and Machining agreed to run a pilot test on 500 aluminum parts before making a plant-wide change. Decision approved by unanimous consensus.',
            question: 'What compromise did Quality and Machining agree on?',
            options: ['To cancel ceramic inserts forever', 'To run a pilot test on 500 aluminum parts first', 'To fire the operators', 'To double the machine speed'],
            correct: 1
          },
          quiz: [
            { q: 'I see what you mean, _____ we should also verify the supplier warranty.', opts: ['so', 'however', 'because', 'due to'], ans: 1, exp: '"However" or "but" introduces a polite counter-perspective.' },
            { q: 'From my perspective, this solution is _____ for our current budget.', opts: ['the most feasible', 'more feasible that', 'feasiblest', 'as feasible than'], ans: 0, exp: 'Superlative with multi-syllable adjective: "the most feasible".' },
            { q: 'How do you soften a disagreement politely in an American business meeting?', opts: ['You are completely wrong', 'I see your point, but we might want to consider...', 'Be quiet and listen', 'No way'], ans: 1, exp: '"I see your point, but..." demonstrates executive tact and professional diplomacy.' }
          ]
        },
        {
          id: 'b1-u4',
          unitNum: 4,
          title: 'Managing Delays, Phone Calls & Unforeseen Events',
          titleES: 'Gestión de Retrasos, Llamadas y Contingencias',
          cefrDescriptor: 'Can handle unexpected situations and telephoning, explain why a problem has occurred, apologize politely, and negotiate a revised plan.',
          grammarFocus: 'First and Second Conditionals (If we ship today, it will arrive on Monday / If we had extra staff, we could finish faster), Telephone etiquette phrases',
          communicativeGoal: 'Explicar causas de retrasos a clientes extranjeros por teléfono o videoconferencia, ofrecer disculpas profesionales y dar una nueva fecha de entrega.',
          vocabulary: [
            { en: 'Supply Chain Delay', es: 'Retraso en la cadena de suministro', ipa: '/səˈplaɪ tʃeɪn dɪˈleɪ/', example: 'The customs port congestion caused a three-day supply chain delay.' },
            { en: 'Expedite', es: 'Agilizar / Acelerar envío', ipa: '/ˈɛkspəˌdaɪt/', example: 'We decided to expedite the urgent microcontrollers via air freight.' },
            { en: 'Estimate', es: 'Estimación / Fecha estimada', ipa: '/ˈɛstəmət/', example: 'Our revised delivery estimate is Wednesday afternoon.' },
            { en: 'Apologies for the inconvenience', es: 'Disculpas por las molestias', ipa: '/əˈpɑːlədʒiz fɔːr/', example: 'Please accept our sincere apologies for the inconvenience caused by the delay.' },
            { en: 'Keep you updated', es: 'Mantenerte informado', ipa: '/kiːp juː ˈʌpˌdeɪtɪd/', example: 'I will personally monitor the shipment and keep you updated every morning.' }
          ],
          dialogue: {
            title: 'Conference Call with Laredo Logistics Hub',
            speakers: ['Rodrigo (Plant Dispatch)', 'Melissa (Freight Forwarder)'],
            lines: [
              { speaker: 'Rodrigo', text: 'Hello Melissa, this is Rodrigo from the Mexicali plant. I am calling regarding Trailer #408.' },
              { speaker: 'Melissa', text: 'Hi Rodrigo. Yes, the truck was inspected at the border, which caused an unexpected delay.' },
              { speaker: 'Rodrigo', text: 'When is the new estimated arrival time at the San Diego warehouse?' },
              { speaker: 'Melissa', text: 'If traffic remains steady, it will arrive by 4:00 PM today.' },
              { speaker: 'Rodrigo', text: 'Thank you for the update. Please email me the tracking confirmation as soon as it crosses.' }
            ]
          },
          reading: {
            title: 'Customer Communication Protocol: Shipment Delays',
            text: 'In the event of an unavoidable shipping delay exceeding 24 hours: 1. Contact the account representative immediately by phone. 2. State the cause clearly without placing blame on third parties. 3. Provide a firm revised delivery date. 4. Offer expedited freight at company cost if the delay affects customer assembly line.',
            question: 'What is the first step when a shipping delay exceeds 24 hours?',
            options: ['Hide the problem', 'Contact the account representative immediately by phone', 'Close the warehouse', 'Wait until next week'],
            correct: 1
          },
          quiz: [
            { q: 'If we _____ air freight instead of ground transport, the parts will arrive tomorrow.', opts: ['use', 'used', 'will use', 'are used'], ans: 0, exp: 'First conditional uses Simple Present in the if-clause: "If we use...".' },
            { q: '"Please accept our sincere _____ for the delay."', opts: ['apology', 'apologies', 'apologize', 'apologetic'], ans: 1, exp: 'Standard formal phrase: "Please accept our sincere apologies...".' },
            { q: 'What does "to expedite a shipment" mean?', opts: ['To cancel the shipment', 'To speed up or accelerate the shipment process', 'To send it by horse', 'To store it forever'], ans: 1, exp: 'Expedite means to accelerate execution or delivery.' }
          ]
        }
      ],
      milestone: {
        title: 'Milestone Checkpoint B1: Autonomous Workplace Communicator',
        questions: 10,
        passingGrade: 80,
        badgeId: 'badge-mcer-b1',
        badgeName: 'CEFR B1: Professional Workplace Independence'
      }
    },
    {
      id: 'mcer-b2',
      code: 'B2',
      name: 'Vantage / Upper-Intermediate',
      nameES: 'Nivel B2: Fluidez Ejecutiva y Negociación Profesional',
      badge: 'CEFR B2 Fluency',
      color: '#a855f7',
      icon: 'fa-award',
      totalHours: 15.0,
      totalXP: 1400,
      summary: 'Desarrolla la fluidez ejecutiva necesaria para interpretar datos complejos, liderar juntas cross-border, redactar memorándums formales de causa raíz (CAPA) y dominar modismos corporativos en Estados Unidos.',
      units: [
        {
          id: 'b2-u1',
          unitNum: 1,
          title: 'Data Interpretation & Technical Presentations',
          titleES: 'Interpretación de Datos y Presentaciones Técnicas',
          cefrDescriptor: 'Can give clear, systematically developed presentations, with highlight of significant points, and can present numerical trends and data charts with precision.',
          grammarFocus: 'Vocabulary of trends (soared, plummeted, leveled off, fluctuated), Complex relative clauses (which indicates that, whose primary function is), Linking devices for contrast (whereas, on the contrary, despite)',
          communicativeGoal: 'Presentar gráficas de rendimiento y métricas de calidad ante ejecutivos de EE.UU., explicando variaciones y justificando recomendaciones técnicas.',
          vocabulary: [
            { en: 'Steep Decline', es: 'Caída pronunciada', ipa: '/stiːp dɪˈklaɪn/', example: 'Scrap rates experienced a steep decline after installing the new vision system.' },
            { en: 'Plateau', es: 'Estabilizarse / Meseta', ipa: '/plæˈtoʊ/', example: 'Production output reached a plateau of 4,000 units per shift.' },
            { en: 'Correlation', es: 'Correlación estadística', ipa: '/ˌkɔːrəˈleɪʃən/', example: 'There is a strong correlation between ambient humidity and solder bridge defects.' },
            { en: 'Key Takeaway', es: 'Conclusión principal', ipa: '/kiː ˈteɪkəˌweɪ/', example: 'The key takeaway from this quarterly review is that preventive maintenance saved ,000 USD.' },
            { en: 'Benchmark', es: 'Punto de referencia / Estándar', ipa: '/ˈbɛntʃˌmɑːrk/', example: 'Our scrap rate of 0.8% is well below the industry benchmark of 1.5%.' }
          ],
          dialogue: {
            title: 'Presenting Yield Analytics to HQ',
            speakers: ['Daniela (Lead Data Analyst)', 'Greg (VP Operations)'],
            lines: [
              { speaker: 'Daniela', text: 'As you can see on Slide 4, first-pass yield rose steadily from 92% in January to 98.4% in September.' },
              { speaker: 'Greg', text: 'Impressive turnaround, Daniela. What drove that significant improvement?' },
              { speaker: 'Daniela', text: 'The inflection point occurred in March when we implemented automated solder paste inspection, which eliminated cold joints.' },
              { speaker: 'Greg', text: 'And how does that compare to our benchmark facility in Austin?' },
              { speaker: 'Daniela', text: 'Our Mexicali plant is currently outperforming Austin by 1.2 percentage points on this assembly.' }
            ]
          },
          reading: {
            title: 'Executive Summary: Quarterly OEE & Yield Metrics',
            text: 'Overall Equipment Effectiveness (OEE) across the plant reached 86.2% in Q3, surpassing corporate targets. Availability increased by 4.5% due to reduced changeover duration. Quality yield remained steady at 99.1%. Key recommendation: Invest ,000 in spare servo drives to prevent long lead-time risks in Q4.',
            question: 'What is the primary recommendation in the executive summary?',
            options: ['Shut down the plant', 'Invest ,000 in spare servo drives', 'Lower the quality targets', 'Change all operators'],
            correct: 1
          },
          quiz: [
            { q: 'Defect rates _____ sharply after we recalibrated the robotic dispensing valves.', opts: ['fell', 'fall', 'has fallen', 'were fallen'], ans: 0, exp: 'Simple past "fell" describes a completed historical drop.' },
            { q: 'The plant achieved 98% yield, _____ our Austin facility reached 96%.', opts: ['whereas', 'despite', 'because', 'in order to'], ans: 0, exp: '"Whereas" contrasts two parallel facts.' },
            { q: 'What does a "key takeaway" refer to in a technical presentation?', opts: ['Food delivered to the office', 'The most important conclusion or insight learned', 'A key to unlock the door', 'A subtraction problem'], ans: 1, exp: 'Key takeaway is the core executive insight to remember.' }
          ]
        },
        {
          id: 'b2-u2',
          unitNum: 2,
          title: 'Leading Cross-Border Meetings & Facilitation',
          titleES: 'Liderazgo de Juntas Transfronterizas y Moderación',
          cefrDescriptor: 'Can lead a meeting smoothly, summarize discussions, handle hostile or unexpected questions with poise, and manage interruptions diplomatically.',
          grammarFocus: 'Phrasal verbs in business meetings (touch base, circle back, bring up, wrap up), Managing agenda (Moving on to..., Let\'s table this for later), Diplomatic deflection formulas',
          communicativeGoal: 'Moderar juntas de ingeniería entre México y EE.UU., manejar desacuerdos de agenda, asignar compromisos y cerrar con minutas claras.',
          vocabulary: [
            { en: 'Circle Back', es: 'Retomar un punto más adelante', ipa: '/ˈsɜːrkəl bæk/', example: 'Let\'s circle back to the budget allocation once we finalize the engineering specs.' },
            { en: 'Table this discussion', es: 'Posponer temporalmente (US)', ipa: '/ˈteɪbəl ðɪs/', example: 'We are running short on time; let\'s table this discussion until tomorrow morning.' },
            { en: 'Action Items', es: 'Acuerdos y responsables', ipa: '/ˈækʃən ˈaɪtəmz/', example: 'Before we adjourn, let\'s review the action items and assign ownership.' },
            { en: 'Bottleneck', es: 'Cuello de botella / Punto de bloqueo', ipa: '/ˈbɑːtəlˌnɛk/', example: 'The customs clearance process in Laredo is our primary logistics bottleneck.' },
            { en: 'Wrap Up', es: 'Concluir / Cerrar la sesión', ipa: '/ræp ʌp/', example: 'It is 11:55 AM, so let\'s wrap up and summarize the main takeaways.' }
          ],
          dialogue: {
            title: 'Facilitating a Cross-Functional Engineering Sync',
            speakers: ['Eduardo (Chair)', 'Sarah (Design Engineer)', 'Bill (Purchasing)'],
            lines: [
              { speaker: 'Eduardo', text: 'Good morning, everyone. Thanks for joining. Our objective today is to finalize the sensor selection for Model X.' },
              { speaker: 'Sarah', text: 'I strongly recommend the laser distance sensor. It offers 0.01mm resolution.' },
              { speaker: 'Bill', text: 'Hold on, Sarah. The lead time is 18 weeks. That will jeopardize our launch.' },
              { speaker: 'Eduardo', text: 'Thank you both. Bill\'s lead-time concern is valid, and Sarah\'s precision requirement is essential. Let\'s see if the supplier can expedite 10 prototypes for testing while we order standard parts in volume.' },
              { speaker: 'Sarah', text: 'That works for design validation.' },
              { speaker: 'Eduardo', text: 'Great. Bill, can you follow up with the vendor by 3:00 PM today? That is our action item.' }
            ]
          },
          reading: {
            title: 'Best Practices: Leading Bilingual Hybrid Engineering Meetings',
            text: 'Effective cross-border meetings require structure: 1. Send an agenda with time allocations 24 hours in advance. 2. Establish ground rules against cross-talk. 3. Solicit input from remote attendees directly. 4. Summarize decisions verbally before ending the call and distribute written action items within two hours.',
            question: 'When should meeting action items be distributed?',
            options: ['Next month', 'Within two hours after the meeting', 'Never', 'Only if someone complains'],
            correct: 1
          },
          quiz: [
            { q: 'We don\'t have the full dataset yet, so let\'s _____ this discussion until Friday.', opts: ['table', 'chair', 'desk', 'bench'], ans: 0, exp: 'In American English, "table a discussion" means to postpone it temporarily.' },
            { q: 'Before we _____ the call, let me confirm who owns the tooling redesign.', opts: ['wrap up', 'wrap on', 'wrap down', 'wrap into'], ans: 0, exp: '"Wrap up" means to conclude or finish.' },
            { q: 'How does an effective meeting chair handle two engineers talking over each other?', opts: ['Shout at them', 'Politely intervene, acknowledge both points, and give each person a clear turn', 'Leave the room', 'Turn off the camera'], ans: 1, exp: 'Executive facilitation requires tact, active listening, and structured turns.' }
          ]
        },
        {
          id: 'b2-u3',
          unitNum: 3,
          title: 'Formal Escalations, Root Cause & Executive Memos',
          titleES: 'Escalación Formal, Causa Raíz y Memorándums',
          cefrDescriptor: 'Can write clear, detailed formal letters and reports on complex topics, outlining arguments, root-cause analyses, and evaluating risk scenarios.',
          grammarFocus: 'Conditional inversion (Should you require / Had we known), Cleft sentences for emphasis (What caused the failure was...), Passive reporting verbs (It is estimated that / The defect was determined to be)',
          communicativeGoal: 'Redactar memorándums ejecutivos de escalación formal ante fallas críticas de producto, explicando la causa raíz y las acciones correctivas (CAPA).',
          vocabulary: [
            { en: 'Non-Conformance Report (NCR)', es: 'Reporte de No Conformidad', ipa: '/nɑːn kənˈfɔːrməns/', example: 'Quality issued an NCR due to out-of-spec surface roughness on batch #20.' },
            { en: 'Containment Action', es: 'Acción de contención inmediata', ipa: '/kənˈteɪnmənt/', example: 'Our containment action involved quarantining 1,200 suspect housings.' },
            { en: 'Root Cause Analysis', es: 'Análisis de causa raíz', ipa: '/ruːt kɔːz əˈnæləsɪs/', example: 'The 5-Why root cause analysis revealed a cracked nozzle O-ring.' },
            { en: 'Mitigation Plan', es: 'Plan de mitigación de riesgos', ipa: '/ˌmɪtɪˈɡeɪʃən plæn/', example: 'The team presented a robust mitigation plan to prevent recurrence.' },
            { en: 'Executive Sponsorship', es: 'Respaldo ejecutivo / Dirección', ipa: '/ɪɡˈzɛkjətɪv/', example: 'We have executive sponsorship from VP of Quality to implement the fix.' }
          ],
          dialogue: {
            title: 'Reviewing an 8D Escalation Notice with Quality Director',
            speakers: ['Hector (Senior QE)', 'Dra. Vance (Director)'],
            lines: [
              { speaker: 'Hector', text: 'Dra. Vance, we finalized the D3 and D4 sections of the 8D report for the Detroit OEM.' },
              { speaker: 'Dra. Vance', text: 'What did the Ishikawa fishbone diagram confirm as the root cause?' },
              { speaker: 'Hector', text: 'It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove.' },
              { speaker: 'Dra. Vance', text: 'And what is our permanent corrective action?' },
              { speaker: 'Hector', text: 'We installed an optical tool-wear sensor that halts the machine automatically after 500 cycles.' },
              { speaker: 'Dra. Vance', text: 'Excellent work. That is an airtight response for our customer audit.' }
            ]
          },
          reading: {
            title: 'Sample Executive Memo: Urgent Escalation & Containment',
            text: `MEMORANDUM
TO: Plant Operations Leadership
FROM: Quality Engineering Task Force
SUBJECT: Containment Protocol for Lot #849 Weld Discrepancy
Summary: During random destructive pull testing on Oct 19, five brackets failed below the 5.0 kN specification. Immediate containment: All 1,500 finished assemblies in transit have been placed on electronic hold in warehouse quarantine. Root cause investigation is active. Zero defect escapes to customer confirmed.`,
            question: 'What immediate containment action was executed for Lot #849?',
            options: ['They shipped the parts anyway', 'All 1,500 finished assemblies in transit were placed on electronic hold in quarantine', 'The factory was closed', 'They erased the data'],
            correct: 1
          },
          quiz: [
            { q: '_____ you require any further validation data, please contact our quality lab.', opts: ['Should', 'Would', 'Had', 'Could'], ans: 0, exp: 'Conditional inversion: "Should you require..." = "If you require...".' },
            { q: 'What _____ the micro-burrs was excessive tool wear on the carbide broach.', opts: ['cause', 'caused', 'causing', 'did cause'], ans: 1, exp: 'Cleft sentence: "What caused [noun] was [noun]".' },
            { q: 'What is the primary objective of a "containment action" in manufacturing?', opts: ['To punish the operator', 'To immediately stop non-conforming parts from reaching the customer', 'To paint the machines', 'To celebrate good results'], ans: 1, exp: 'Containment actions isolate and quarantine suspect material immediately.' }
          ]
        },
        {
          id: 'b2-u4',
          unitNum: 4,
          title: 'American Business Idioms & Cultural Radar',
          titleES: 'Modismos Corporativos Americanos y Radar Cultural',
          cefrDescriptor: 'Can understand a wide range of idiomatic expressions and colloquialisms, appreciating register shifts and cultural nuances in professional contexts.',
          grammarFocus: 'High-context idioms vs literal phrasing, Phrasal verbs with multiple meanings, Nuances of tone and executive presence',
          communicativeGoal: 'Comprender y utilizar con naturalidad modismos corporativos nativos sin caer en calcos literales del español ni malentendidos.',
          vocabulary: [
            { en: 'Move the Needle', es: 'Hacer una diferencia medible / Tener impacto real', ipa: '/muːv ðə ˈniːdəl/', example: 'Incremental training is good, but automation is what will truly move the needle on productivity.' },
            { en: 'Drop the Ball', es: 'Cometer un descuido / Fallar en un compromiso', ipa: '/drɑːp ðə bɔːl/', example: 'The freight carrier dropped the ball by forgetting the customs paperwork.' },
            { en: 'Bandwidth', es: 'Capacidad de tiempo / Disponibilidad mental', ipa: '/ˈbændˌwɪdθ/', example: 'I don\'t have the bandwidth to take on a third project this cuatrimestre.' },
            { en: 'Low-Hanging Fruit', es: 'Oportunidades fáciles de lograr con poco esfuerzo', ipa: '/loʊ ˈhæŋɪŋ fruːt/', example: 'Fixing the air hose leaks is low-hanging fruit for immediate energy savings.' },
            { en: 'Ballpark Figure', es: 'Cifra aproximada / Estimación preliminar', ipa: '/ˈbɔːlˌpɑːrk ˈfɪɡjər/', example: 'Can you give me a ballpark figure for the tooling retrofit costs?' }
          ],
          dialogue: {
            title: 'Executive Sync with US Headquarters Director',
            speakers: ['Lorena (Operations Director)', 'Scott (US VP)'],
            lines: [
              { speaker: 'Scott', text: 'Lorena, thanks for jumping on the call. Do you have a ballpark figure for the new cleanroom expansion?' },
              { speaker: 'Lorena', text: 'Yes, Scott. We estimate around ,000 to ,000 USD, depending on the HEPA filtration tier.' },
              { speaker: 'Scott', text: 'That fits our capital expenditure envelope. What is our low-hanging fruit to start preparation?' },
              { speaker: 'Lorena', text: 'We can clear the existing warehouse partition this week without disrupting current assembly lines.' },
              { speaker: 'Scott', text: 'Great. Let\'s make sure nobody drops the ball on the environmental permits.' }
            ]
          },
          reading: {
            title: 'Cross-Cultural Guide: Decoding American High-Context Idioms',
            text: 'When American executives say "I don\'t have the bandwidth," they are politely declining additional tasks due to full workload, not discussing internet speed. Similarly, "to touch base" means a quick 5-minute update, not a formal meeting. Understanding these colloquial markers ensures seamless collaboration and elevates executive presence.',
            question: 'What does an executive mean by "I don\'t have the bandwidth"?',
            options: ['Their Wi-Fi is broken', 'They politely decline additional work due to full schedule', 'They want more work', 'They are buying new routers'],
            correct: 1
          },
          quiz: [
            { q: '"Can you give me a _____ figure for the shipping costs?"', opts: ['ballpark', 'football', 'basketball', 'playground'], ans: 0, exp: '"Ballpark figure" means an approximate or rough estimate.' },
            { q: 'When a manager says a project will "move the needle", they mean it will:', opts: ['Sew clothing', 'Have a noticeable, measurable impact on results', 'Be very slow', 'Break the machines'], ans: 1, exp: '"Move the needle" means generate significant measurable progress.' },
            { q: 'What is "low-hanging fruit" in operational terminology?', opts: ['Fresh apples in the cafeteria', 'Easy improvements or quick wins achieved with minimal effort', 'Tasks nobody wants to do', 'Expensive machines'], ans: 1, exp: 'Low-hanging fruit refers to easily achieved initial targets.' }
          ]
        }
      ],
      milestone: {
        title: 'Milestone Checkpoint B2: Executive Business Communicator',
        questions: 10,
        passingGrade: 80,
        badgeId: 'badge-mcer-b2',
        badgeName: 'CEFR B2: Executive Fluency & Advanced Pragmatics'
      }
    }
  ];

  return {
    version: '1.0.0',
    title: 'stemOS MCER Core — Standard American English',
    levels: MCER_LEVELS,
    getLevelById: function(levelId) {
      return MCER_LEVELS.find(l => l.id === levelId || l.code.toLowerCase() === levelId.toLowerCase());
    },
    getAllUnits: function() {
      const allUnits = [];
      MCER_LEVELS.forEach(lvl => {
        lvl.units.forEach(u => {
          allUnits.push(Object.assign({}, u, { levelCode: lvl.code, levelName: lvl.name, levelColor: lvl.color }));
        });
      });
      return allUnits;
    }
  };
}));
