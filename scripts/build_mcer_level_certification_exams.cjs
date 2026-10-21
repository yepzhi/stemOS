/**
 * stemOS — MCER Level Milestone Certification Exams (Levels A1 • A2 • B1 • B2)
 * ══════════════════════════════════════════════════════════════════════════════
 * 4 Comprehensive Level Certification Exams (80 Items Total • 20 Items per Level)
 * - 4 Listening items with audio prompt scripts
 * - 6 Grammar & Syntax items
 * - 5 Reading & Technical Standards items
 * - 5 Workplace Pragmatics & Protocol items
 * 
 * Passing criteria: >= 75% (15/20) for W3C Open Badge & 60.0h Course Credit.
 * ══════════════════════════════════════════════════════════════════════════════
 */

const MCER_LEVEL_CERTIFICATION_EXAMS = {
  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL A1 CERTIFICATION EXAM (Breakthrough / Tronco Común I • 60.0h)
  // ─────────────────────────────────────────────────────────────────────────────
  'mcer-a1': {
    id: 'exam-mcer-a1',
    level: 'A1',
    title: 'Examen de Certificación Integral Nivel A1 (Breakthrough • 60.0h)',
    titleEN: 'CEFR A1 Comprehensive Milestone Certification Exam',
    timeLimitMinutes: 40,
    passingScore: 15,
    totalQuestions: 20,
    badgeId: 'stemos-mcer-a1-credential',
    accreditationDossier: 'Alineado a Tronco Común Universitario Inglés I (CACEI / DGUTyP / SEP).',
    questions: [
      // Section 1: Listening Comprehension (4 items)
      {
        q: '[AUDIO] Listen to Shift Supervisor Miller: "Good morning team. Welcome to Line 2. Please verify that your security badges are scanned before 07:15. Workstation assignments are posted on Wall Board C." — By what time must badges be scanned?',
        audioScript: 'Good morning team. Welcome to Line 2. Please verify that your security badges are scanned before 07:15. Workstation assignments are posted on Wall Board C.',
        opts: ['Before 07:15 AM', 'At 08:30 AM', 'At midday', 'At shift end'],
        ans: 0,
        exp: 'Supervisor Miller explicitly mandates scanning before 07:15 AM.',
        socraticHint: 'Escucha el audio con atención: ¿cuál es la hora límite exacta indicada por el supervisor Miller?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Tool Crib Dispatcher: "Technician Alex, your replacement digital caliper is in Locker 14 next to the charging station." — Where is the digital caliper located?',
        audioScript: 'Technician Alex, your replacement digital caliper is in Locker 14 next to the charging station.',
        opts: ['In Locker 14 next to the charging station', 'On Conveyor 3', 'In the cafeteria', 'Inside the manager office'],
        ans: 0,
        exp: 'The dispatcher clearly directs: "in Locker 14 next to the charging station."',
        socraticHint: 'Identifica el número de casillero y la referencia espacial mencionada.',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to EHS Emergency Broadcast: "Attention plant floor: Stop all manual assembly. Proceed through Exit Door 4 immediately." — What must workers do?',
        audioScript: 'Attention plant floor: Stop all manual assembly. Proceed through Exit Door 4 immediately.',
        opts: ['Stop assembly and proceed through Exit Door 4', 'Continue working normally', 'Turn off the lights and sleep', 'Eat lunch at Station 2'],
        ans: 0,
        exp: 'The broadcast gives the imperative: "Stop all manual assembly. Proceed through Exit Door 4 immediately."',
        socraticHint: '¿Cuál es la instrucción prioritaria de evacuación dictada por el altavoz?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Quality Coordinator: "Sample Batch 8 has zero dimensional defects. Great job." — What is the status of Sample Batch 8?',
        audioScript: 'Sample Batch 8 has zero dimensional defects. Great job.',
        opts: ['It has zero dimensional defects', 'It is completely defective', 'It was lost in transit', 'It needs full rework'],
        ans: 0,
        exp: 'The coordinator confirms: "Sample Batch 8 has zero dimensional defects."',
        socraticHint: '¿Cuántos defectos dimensionales reporta la inspectora de calidad en el lote 8?',
        category: 'Comprensión Auditiva'
      },

      // Section 2: Applied Grammar & Syntax (6 items)
      {
        q: 'Good morning. My name is Daniel and I _____ the morning electrical intern.',
        opts: ['am', 'is', 'are', 'be'],
        ans: 0,
        exp: 'Pronoun "I" requires first-person singular "am".',
        socraticHint: 'El sujeto es "I". ¿Qué forma del verbo "to be" corresponde?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'This is Engineer Diana. _____ employee badge grants access to Cleanroom 1.',
        opts: ['Her', 'His', 'Its', 'Their'],
        ans: 0,
        exp: 'Diana is feminine singular; possessive adjective is "Her".',
        socraticHint: 'Diana es femenino singular. Elige el adjetivo posesivo correcto para acompañar a "employee badge".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The quality team _____ vibration readings every two hours.',
        opts: ['records', 'record', 'is record', 'recording'],
        ans: 0,
        exp: 'Third-person singular subject "The quality team" takes "records" in the simple present.',
        socraticHint: 'Sujeto singular en presente simple con sentido de rutina técnica periódica.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: '_____ there any replacement pneumatic hoses in the tool cabinet?',
        opts: ['Are', 'Is', 'Be', 'Do'],
        ans: 0,
        exp: '"Pneumatic hoses" is plural; requires "Are there...?"',
        socraticHint: 'El sustantivo que sigue es plural ("replacement pneumatic hoses"). ¿"Is there" o "Are there"?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: '_____ touch the rotating drill spindle with unapproved fabric gloves.',
        opts: ['Do not', 'No to', 'Not', 'Never to'],
        ans: 0,
        exp: 'Negative imperative begins with "Do not" + base verb.',
        socraticHint: 'Prohibición imperativa directa de seguridad en máquina herramienta.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Our production line operates _____ Monday to Friday _____ 07:00 AM.',
        opts: ['from / at', 'in / on', 'at / in', 'on / of'],
        ans: 0,
        exp: '"From Monday to Friday" and "at 07:00 AM".',
        socraticHint: 'Revisa las preposiciones: rango de días ("from... to...") y hora específica ("at").',
        category: 'Gramática Aplicada & Sintaxis'
      },

      // Section 3: Technical Reading & Safety SOP (5 items)
      {
        q: 'According to OSHA plant signage: "CAUTION: Hearing protection mandatory past yellow floor stripe." — What is required past the stripe?',
        opts: ['Approved hearing protection (earplugs or earmuffs)', 'High heels', 'Sunglasses', 'Removing your shoes'],
        ans: 0,
        exp: 'The safety sign explicitly mandates approved hearing protection.',
        socraticHint: '¿Qué tipo de equipo de protección personal exige el letrero amarillo?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'A safety bulletin states: "Lockout/Tagout padlocks must remain locked until maintenance service is 100% completed." — When may padlocks be removed?',
        opts: ['Only after maintenance service is 100% completed', 'During lunch breaks', 'When the operator is tired', 'Anytime someone asks'],
        ans: 0,
        exp: 'Padlocks must remain engaged until service is fully completed.',
        socraticHint: '¿En qué momento preciso se autoriza el retiro de los candados LOTO?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'In an assembly notice: "ESD wrist straps must be plugged into grounded terminals before touching PCB components." — What does ESD stand for?',
        opts: ['Electrostatic Discharge', 'Emergency Stop Device', 'Engine Speed Dial', 'Electronic Standard Document'],
        ans: 0,
        exp: 'ESD stands for Electrostatic Discharge.',
        socraticHint: '¿Qué significa el acrónimo técnico ESD en protección de circuitos integrados?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'A workstation checklist states: "Calibrate micrometer zero-point using standard gauge block before shift start." — What tool is used to verify zero-point?',
        opts: ['A standard gauge block', 'A wooden stick', 'A metal coin', 'A rubber band'],
        ans: 0,
        exp: 'Standard gauge blocks are certified metrology standards.',
        socraticHint: '¿Qué bloque patrón calibrado se utiliza para verificar el cero del micrómetro?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'An SDS label reads: "Flammable Liquid: Store away from direct heat and ignition sources." — Where should this liquid NOT be stored?',
        opts: ['Near furnaces or open flames', 'In a cool ventilated chemical cabinet', 'In designated drums', 'In safety cans'],
        ans: 0,
        exp: 'Flammable materials must never be stored near heat or ignition sources.',
        socraticHint: '¿Qué fuentes térmicas deben evitarse estrictamente al almacenar líquidos inflamables?',
        category: 'Lectura Técnica & Normas'
      },

      // Section 4: Workplace Pragmatics & Industrial Protocol (5 items)
      {
        q: 'How do you politely introduce yourself to a new plant manager in an American manufacturing facility?',
        opts: ['Good morning, I am Carlos Mendez, new mechatronics intern on Line 3. Pleasure to meet you.', 'Hey you, look at me right now.', 'My name is Carlos and you must listen.', 'I am the boss here.'],
        ans: 0,
        exp: 'Standard American workplace protocol uses polite greeting + full name + role + polite closing.',
        socraticHint: '¿Cuál es la fórmula formal y respetuosa de autopresentación en una planta estadounidense?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'Cuidado con el falso amigo: "Actually, my shift starts at 07:00." — ¿Qué significa "Actually"?',
        opts: ['De hecho / En realidad', 'Actualmente en este mes', 'Con acciones rápidas', 'Ocasionalmente'],
        ans: 0,
        exp: '"Actually" means "in reality" or "as a matter of fact". "Currently" means actualmente.',
        socraticHint: 'Recuerda el falso amigo: ¿cómo se traduce "Actually"?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'Which syllable carries the primary stress in the noun "COLLEAGUE"?',
        opts: ['First syllable: COL-league', 'Second syllable: col-LEAGUE', 'Both equal', 'The silent final -ue'],
        ans: 0,
        exp: 'Stressed on first syllable /ˈkɑːliːɡ/; the ending "-ue" is completely silent.',
        socraticHint: 'Laboratorio fonético: ¿dónde cae el golpe de voz en "colleague"?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'When an auditor asks for your employee ID number, how should you respond?',
        opts: ['My employee ID is 4-0-9-2-1, assigned to Quality Inspection.', 'I don\'t know numbers.', 'Ask someone else.', 'It is secret.'],
        ans: 0,
        exp: 'Clear, concise stating of ID numbers with department designation reflects professional plant literacy.',
        socraticHint: '¿Cómo se responde de forma profesional y precisa al auditor ISO?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'When concluding a shift handover with the incoming operator, what is the professional sign-off?',
        opts: ['"All machines are running on schedule. Here is the shift logbook. Have a safe shift."', '"I am leaving now, deal with it."', '"Whatever happens is your problem."', '"Goodbye forever."'],
        ans: 0,
        exp: 'Professional handovers confirm operating status, deliver physical logs, and wish a safe shift.',
        socraticHint: '¿Cuál es la fórmula de entrega de turno (handover) colaborativa y profesional?',
        category: 'Pragmática & Protocolo Laboral'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL A2 CERTIFICATION EXAM (Waystage / Tronco Común II • 60.0h)
  // ─────────────────────────────────────────────────────────────────────────────
  'mcer-a2': {
    id: 'exam-mcer-a2',
    level: 'A2',
    title: 'Examen de Certificación Integral Nivel A2 (Waystage • 60.0h)',
    titleEN: 'CEFR A2 Comprehensive Milestone Certification Exam',
    timeLimitMinutes: 45,
    passingScore: 15,
    totalQuestions: 20,
    badgeId: 'stemos-mcer-a2-credential',
    accreditationDossier: 'Alineado a Tronco Común Universitario Inglés II (CACEI / DGUTyP / SEP).',
    questions: [
      // Section 1: Listening Comprehension (4 items)
      {
        q: '[AUDIO] Listen to Maintenance Dispatcher: "At 14:20 yesterday, Robot 3 stopped because the proximity sensor detected foreign metal shavings. Technician Ramos cleaned the sensor optic and resumed cycle testing at 14:50." — What caused Robot 3 to stop?',
        audioScript: 'At 14:20 yesterday, Robot 3 stopped because the proximity sensor detected foreign metal shavings. Technician Ramos cleaned the sensor optic and resumed cycle testing at 14:50.',
        opts: ['The proximity sensor detected foreign metal shavings', 'A software virus erased the PLC', 'The robot ran out of hydraulic oil', 'The main power was cut by lightning'],
        ans: 0,
        exp: 'The audio explicitly notes: "the proximity sensor detected foreign metal shavings."',
        socraticHint: '¿Cuál fue la causa detectada por el sensor de proximidad en el robot 3?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Materials Engineer: "Aluminum 6061 is forty percent lighter than stainless steel, making it ideal for our drone motor arms." — Why is Aluminum 6061 preferred for drone arms?',
        audioScript: 'Aluminum 6061 is forty percent lighter than stainless steel, making it ideal for our drone motor arms.',
        opts: ['It is 40% lighter than stainless steel', 'It is magnetic', 'It glows in the dark', 'It costs zero dollars'],
        ans: 0,
        exp: 'The engineer confirms: "Aluminum 6061 is forty percent lighter than stainless steel..."',
        socraticHint: '¿Qué porcentaje de ligereza se menciona respecto al acero inoxidable?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Project Lead: "We are going to ship the pilot batch by Thursday afternoon. The customer will review CMM data on Friday." — When will CMM data be reviewed?',
        audioScript: 'We are going to ship the pilot batch by Thursday afternoon. The customer will review CMM data on Friday.',
        opts: ['On Friday', 'On Thursday afternoon', 'Next year', 'Immediately on Monday'],
        ans: 0,
        exp: 'The customer will review data on Friday.',
        socraticHint: '¿Qué día de la semana revisará el cliente los datos CMM?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Production Lead: "Cell 4 has produced 520 units today without any scrap. The line is operating at peak efficiency." — How many scrap units were generated in Cell 4 today?',
        audioScript: 'Cell 4 has produced 520 units today without any scrap. The line is operating at peak efficiency.',
        opts: ['Zero scrap units', '520 scrap units', '10 scrap units', '50 scrap units'],
        ans: 0,
        exp: '"...without any scrap" indicates zero rejected units.',
        socraticHint: '¿Cuántas piezas de desperdicio o scrap se produjeron?',
        category: 'Comprensión Auditiva'
      },

      // Section 2: Applied Grammar & Syntax (6 items)
      {
        q: 'The technician _____ the broken drive belt yesterday afternoon.',
        opts: ['replaced', 'replace', 'was replaced', 'is replacing'],
        ans: 0,
        exp: 'Regular simple past with "yesterday afternoon": "replaced".',
        socraticHint: 'Acción completada en el pasado ("yesterday afternoon"). Verbo regular en pasado.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Titanium alloys are significantly _____ than standard structural aluminum.',
        opts: ['more durable', 'durabler', 'most durable', 'durable than'],
        ans: 0,
        exp: 'Multi-syllable adjective "durable" takes "more durable".',
        socraticHint: 'Comparativo de superioridad para adjetivo de tres sílabas ("durable").',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The quality team _____ already calibrated all pressure transmitters this morning.',
        opts: ['has', 'have', 'is', 'did'],
        ans: 0,
        exp: 'Present perfect with third-person singular collective noun: "has already calibrated".',
        socraticHint: 'Presente perfecto con el adverbio "already" y sujeto singular colectivo.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Look at those dark smoke fumes; the conveyor motor _____ overheat.',
        opts: ['is going to', 'will to', 'shall be', 'going to'],
        ans: 0,
        exp: '"Be going to" expresses future prediction based on immediate physical evidence (smoke).',
        socraticHint: 'Predicción futura fundamentada en evidencia observable inmediata (humo negro).',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'While the robotic arm _____ welding, the vision system detected an arc fault.',
        opts: ['was', 'is', 'were', 'has been'],
        ans: 0,
        exp: 'Past continuous: "was welding" for an ongoing past background action interrupted by an event.',
        socraticHint: 'Acción continua en el pasado interrumpida por otro evento ("detected"). Sujeto singular: "was".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The CNC spindle runs _____ than the manual milling machine.',
        opts: ['more quietly', 'quietlier', 'most quiet', 'quiet as'],
        ans: 0,
        exp: 'Comparative of adverb "quietly" is "more quietly".',
        socraticHint: 'Comparativo de un adverbio en -ly: "more quietly".',
        category: 'Gramática Aplicada & Sintaxis'
      },

      // Section 3: Technical Reading & Equipment Logs (5 items)
      {
        q: 'A shift maintenance report notes: "Total downtime: 45 minutes due to sheared pin in gearbox 2. MTTR was 22 minutes." — What does MTTR mean?',
        opts: ['Mean Time to Repair', 'Maximum Tool Temperature Rate', 'Machine Total Turnover Record', 'Motor Testing Transit Rule'],
        ans: 0,
        exp: 'MTTR stands for Mean Time to Repair (Tiempo Medio de Reparación).',
        socraticHint: '¿Qué métrica de mantenimiento mide el tiempo promedio requerido para reparar una falla?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'In an equipment comparison datasheet: "Model X features IP67 ingress protection, whereas Model Y is rated IP20." — Which model is protected against temporary water submersion?',
        opts: ['Model X (IP67 is dust-tight and submersible up to 1 meter)', 'Model Y', 'Neither model', 'Both models equally'],
        ans: 0,
        exp: 'IP67 protects against dust ingress and immersion in water up to 1 meter.',
        socraticHint: 'En códigos de protección IP, ¿cuál de los dos números (IP67 vs IP20) garantiza resistencia al agua?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'A technical drawing tolerance note reads: "Shaft diameter: 25.00 mm ± 0.05 mm." — What is the maximum acceptable diameter?',
        opts: ['25.05 mm', '25.50 mm', '24.95 mm', '25.00 mm'],
        ans: 0,
        exp: '25.00 + 0.05 = 25.05 mm maximum allowable material condition.',
        socraticHint: 'Suma la tolerancia positiva al valor nominal (25.00 + 0.05).',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'An operational directive states: "All prototype tooling must be certified under PPAP Level 3 before mass production launch." — What does PPAP Level 3 require?',
        opts: ['Submission of full design records, dimensional results, and material test certificates with sample parts', 'Only an oral confirmation by phone', 'A single photograph', 'Nothing in writing'],
        ans: 0,
        exp: 'PPAP Level 3 is the standard submission level requiring full dimensional, material, and capability documentation.',
        socraticHint: '¿Qué nivel de documentación de aprobación de partes automotrices exige el dossier completo?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'A technical calibration label reads: "CALIBRATION DUE: NOV 2026." — What must happen if the date is passed?',
        opts: ['The tool must be removed from service and recalibrated before further use', 'The tool can be used without restrictions', 'The label should be erased', 'The tool should be thrown into the trash'],
        ans: 0,
        exp: 'Expired calibration requires immediate quarantine and recalibration.',
        socraticHint: '¿Qué acción de control metrológico procede si la etiqueta de calibración está vencida?',
        category: 'Lectura Técnica & Normas'
      },

      // Section 4: Workplace Pragmatics & Troubleshooting Handover (5 items)
      {
        q: 'Cuidado con el falso amigo: "We need to check the facility layout." — ¿Qué significa "facility"?',
        opts: ['Instalación física / Nave industrial', 'Facilidad de hacer una tarea', 'Dificultad de operación', 'Herramienta manual'],
        ans: 0,
        exp: '"Facility" means industrial plant, building, or campus. "Ease" means facilidad.',
        socraticHint: 'Alerta de falso amigo: "facility" no significa facilidad, sino la planta o nave industrial.',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "MAINTENANCE"?',
        opts: ['MAIN-te-nance (accent on first syllable)', 'main-TE-nance', 'main-te-NANCE', 'All syllables equal'],
        ans: 0,
        exp: 'Primary stress is firmly on the first syllable /ˈmeɪntənəns/.',
        socraticHint: 'Laboratorio fonético: el acento primario va en la primera sílaba "MAIN".',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'How do you professionally notify your lead about an unexpected machine stoppage?',
        opts: ['"Lead, Station 4 halted due to an optical jam. We isolated the breaker and are troubleshooting now."', '"Station 4 broke, not my problem."', '"Everything is ruined forever."', '"I am going home early."'],
        ans: 0,
        exp: 'Professional escalation states line, failure symptom, containment action, and active troubleshooting.',
        socraticHint: '¿Cuál es la comunicación técnica concisa y estructurada ante un paro de máquina?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'When participating in an American workplace meeting, how do you politely request clarification?',
        opts: ['"Could you please clarify the target cycle time for Cell 2?"', '"Speak louder now."', '"What did you say? Speak better."', '"I do not understand you at all."'],
        ans: 0,
        exp: 'Polite request formula: "Could you please clarify [topic]?"',
        socraticHint: 'Fórmula de cortesía formal para pedir clarificación en juntas de trabajo.',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'In industrial handover, what does "The line ran smoothly" imply?',
        opts: ['The production line operated without unexpected stoppages or quality anomalies', 'The conveyor was covered in grease', 'The floor was slippery', 'The line was running in reverse'],
        ans: 0,
        exp: '"Ran smoothly" is an idiomatic phrase meaning trouble-free continuous operation.',
        socraticHint: '¿Qué significa la expresión industrial "the line ran smoothly" en el reporte de turno?',
        category: 'Pragmática & Protocolo Laboral'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL B1 CERTIFICATION EXAM (Threshold / Tronco Común III • 60.0h)
  // ─────────────────────────────────────────────────────────────────────────────
  'mcer-b1': {
    id: 'exam-mcer-b1',
    level: 'B1',
    title: 'Examen de Certificación Integral Nivel B1 (Threshold • 60.0h)',
    titleEN: 'CEFR B1 Comprehensive Milestone Certification Exam',
    timeLimitMinutes: 50,
    passingScore: 15,
    totalQuestions: 20,
    badgeId: 'stemos-mcer-b1-credential',
    accreditationDossier: 'Alineado a Tronco Común Universitario Inglés III (CACEI / DGUTyP / SEP).',
    questions: [
      // Section 1: Technical Conference & Standup Listening (4 items)
      {
        q: '[AUDIO] Listen to Quality Engineer: "In our 8D investigation, D3 containment verified that all 250 suspect valve bodies were quarantined. Root cause analysis under D4 isolated insufficient nitrogen pressure during automated brazing." — What was the verified root cause in D4?',
        audioScript: 'In our 8D investigation, D3 containment verified that all 250 suspect valve bodies were quarantined. Root cause analysis under D4 isolated insufficient nitrogen pressure during automated brazing.',
        opts: ['Insufficient nitrogen pressure during automated brazing', 'The operator arrived late', 'The CAD drawing was deleted', 'The shipping boxes were the wrong color'],
        ans: 0,
        exp: 'D4 root cause analysis specifically isolated insufficient nitrogen pressure during automated brazing.',
        socraticHint: '¿Cuál fue la causa raíz técnica demostrada en la disciplina D4?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Lead Process Engineer: "First, boards are screen-printed with lead-free solder paste. Next, components are placed at forty thousand per hour. Finally, assemblies are soldered in a ten-zone reflow oven." — What type of solder paste is used?',
        audioScript: 'First, boards are screen-printed with lead-free solder paste. Next, components are placed at forty thousand per hour. Finally, assemblies are soldered in a ten-zone reflow oven.',
        opts: ['Lead-free solder paste', 'Pure lead solder', 'Epoxy glue', 'Silver paint'],
        ans: 0,
        exp: 'The audio explicitly specifies: "lead-free solder paste."',
        socraticHint: '¿Qué tipo ecológico de soldadura en pasta se menciona en el proceso SMT?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Scrum Master: "Our team completed the CAN bus communication driver yesterday. Our sole active blocker is waiting for updated pinout schematics from Austin." — What is the current team blocker?',
        audioScript: 'Our team completed the CAN bus communication driver yesterday. Our sole active blocker is waiting for updated pinout schematics from Austin.',
        opts: ['Waiting for updated pinout schematics from Austin', 'Lack of coffee', 'Broken computer monitors', 'Testing is finished'],
        ans: 0,
        exp: 'The blocker is waiting for updated pinout schematics from the Austin hardware team.',
        socraticHint: '¿Cuál es el impedimento (blocker) que detiene al equipo de software embebido?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Marcus Vance: "If we tighten shaft tolerances to five microns, machining cycle times will increase by forty percent. I suggest improving fixture rigidity instead." — What alternative does Vance propose?',
        audioScript: 'If we tighten shaft tolerances to five microns, machining cycle times will increase by forty percent. I suggest improving fixture rigidity instead.',
        opts: ['Improving fixture clamping rigidity instead', 'Accepting forty percent higher cycle times', 'Using plastic shafts', 'Closing the line permanently'],
        ans: 0,
        exp: 'Vance proposes improving fixture clamping rigidity instead of expensive tolerance tightening.',
        socraticHint: '¿Qué solución mecánica alternativa propone Marcus para evitar el aumento de ciclo?',
        category: 'Comprensión Auditiva'
      },

      // Section 2: Applied Grammar & Syntax (6 items)
      {
        q: 'All printed circuit assemblies _____ by automated optical inspection prior to final functional testing.',
        opts: ['are inspected', 'are inspect', 'inspected', 'have inspecting'],
        ans: 0,
        exp: 'Present simple passive: "are" + past participle "inspected".',
        socraticHint: 'Voz pasiva técnica en presente: el foco está en la acción recibida por las tarjetas.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Could you please tell me _____ the firmware update was uploaded to the cloud repository?',
        opts: ['when', 'when was', 'when did', 'when was it'],
        ans: 0,
        exp: 'Indirect/embedded question retains normal subject-verb word order: "when the firmware update was uploaded".',
        socraticHint: 'En preguntas indirectas no se invierte el sujeto y el verbo.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'If hydraulic pressure _____ 200 bar, the secondary relief valve trips automatically.',
        opts: ['exceeds', 'will exceed', 'exceeded', 'is exceeding'],
        ans: 0,
        exp: 'Zero / first conditional scientific cause-and-effect: present simple with singular subject.',
        socraticHint: 'Condicional para hechos técnicos y leyes físicas: presente simple con -s.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'If we _____ the cooling jacket design, thermal dissipation would improve by twenty percent.',
        opts: ['redesigned', 'redesign', 'will redesign', 'are redesigning'],
        ans: 0,
        exp: 'Second conditional (hypothetical proposal): "If + simple past (redesigned), would + base verb".',
        socraticHint: 'Condicional hipotético de segundo grado con "would improve": la cláusula "if" va en pasado simple.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The line was shut down temporarily _____ an intermittent encoder signal loss.',
        opts: ['due to', 'because', 'therefore', 'consequently'],
        ans: 0,
        exp: '"Due to" is followed by a noun phrase ("an intermittent encoder signal loss").',
        socraticHint: 'Conector de causa seguido de una frase nominal sin verbo conjugado.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'I would appreciate it if you _____ confirm receipt of the quarantined RMA tracking number.',
        opts: ['could', 'can to', 'shall may', 'are able to will'],
        ans: 0,
        exp: 'Polite formal correspondence conditional formula: "I would appreciate it if you could...".',
        socraticHint: 'Fórmula de cortesía epistolar formal: "I would appreciate it if you could...".',
        category: 'Gramática Aplicada & Sintaxis'
      },

      // Section 3: SOPs & 8D Incident Reports (5 items)
      {
        q: 'In an 8D quality methodology, what is the primary purpose of Discipline 3 (D3 Containment)?',
        opts: ['To immediately quarantine suspect parts and prevent defects from escaping to the customer', 'To celebrate the team success', 'To punish the operator', 'To write an invoice'],
        ans: 0,
        exp: 'D3 establishes immediate containment barriers isolating suspect product.',
        socraticHint: '¿Cuál es el objetivo primordial de la disciplina D3 en la metodología 8D?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'A technical email begins: "Further to our teleconference this morning, please find attached the revised FMEA." — What is an FMEA?',
        opts: ['Failure Mode and Effects Analysis', 'Factory Management Education Association', 'Final Machine Energy Audit', 'Fast Manufacturing Engineering Award'],
        ans: 0,
        exp: 'FMEA is Failure Mode and Effects Analysis (Análisis de Modo y Efecto de Falla).',
        socraticHint: '¿Qué significa el acrónimo de análisis de riesgo FMEA / AMEF?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'In standard technical writing, why is the passive voice extensively utilized in SOP documents?',
        opts: ['Because the technical process and object are more important than who performs the action', 'Because engineers forget their names', 'To make sentences longer', 'Because passive verbs are cheaper'],
        ans: 0,
        exp: 'Passive voice places objective emphasis on the workpiece and procedure rather than individual human actors.',
        socraticHint: '¿Por qué la voz pasiva es el estándar de estilo en procedimientos y normas industriales?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'An engineering memo states: "Preliminary findings suggest that solder joint embrittlement was caused by excessive intermetallic thickness." — What linguistic technique is "suggest that"?',
        opts: ['Hedging (diplomatic cautious scientific assertion)', 'Aggressive shouting', 'Informal slang', 'Sarcasm'],
        ans: 0,
        exp: '"Suggest that" is hedging, used in scientific reports to present evidence-based conclusions cautiously.',
        socraticHint: '¿Qué recurso pragmático de cautela científica representa la expresión "suggest that"?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'An RMA form specifies: "Non-conforming items must be tagged with red disposition cards and moved to Cage 2." — What do red disposition cards designate?',
        opts: ['Quarantined / rejected parts awaiting engineering disposition', 'Rush customer orders', 'Approved clean parts', 'Personal belongings'],
        ans: 0,
        exp: 'Red tags universally designate non-conforming, quarantined, or rejected inventory in visual factories.',
        socraticHint: 'En control visual de calidad, ¿qué señalan las tarjetas de color rojo en piezas de almacén?',
        category: 'Lectura Técnica & Normas'
      },

      // Section 4: Professional Correspondence & Disagreements (5 items)
      {
        q: 'How do you professionally express constructive disagreement in an engineering design review?',
        opts: ['"I see your point regarding speed; however, empirical telemetry indicates that thermal dissipation will be compromised."', '"Your idea is completely stupid."', '"Nobody cares about your opinion."', '"I refuse to talk to you."'],
        ans: 0,
        exp: 'Professional constructive disagreement acknowledges the counter-argument politely, then presents empirical data with "however".',
        socraticHint: '¿Cómo se expresa desacuerdo técnico constructivo con diplomacia y sustento de datos?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'What is the professional email closing for formal correspondence with international suppliers?',
        opts: ['Sincerely yours, / Best regards,', 'See ya later,', 'Bye bye,', 'Cheers buddy,'],
        ans: 0,
        exp: '"Sincerely yours" or "Best regards" are formal and appropriate professional sign-offs.',
        socraticHint: 'Despedida epistolar formal apropiada para proveedores internacionales.',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'In an Agile standup, what does it mean when an engineer says "I have a blocker on Ticket 302"?',
        opts: ['They are impeded by an external dependency and cannot make progress without assistance', 'They are blocking the hallway', 'They want to play video games', 'They deleted the ticket'],
        ans: 0,
        exp: 'A blocker is an impediment requiring resolution to resume sprint progress.',
        socraticHint: '¿Qué significa declarar un "blocker" en un daily standup ágil?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'What is the meaning of the technical idiom "trade-off" in systems engineering?',
        opts: ['A balance achieved between two competing or conflicting design parameters', 'Exchanging baseball cards', 'Trading employees between departments', 'Selling old machines at an auction'],
        ans: 0,
        exp: 'A trade-off balances opposing engineering requirements (e.g., speed vs. accuracy).',
        socraticHint: '¿Qué representa el concepto de "trade-off" entre dos variables en conflicto?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'Cuidado con el falso amigo: "We attended the supplier audit yesterday." — ¿Qué significa "attended"?',
        opts: ['Asistimos físicamente a la auditoría', 'Atendimos a un cliente en mostrador', 'Intentamos hacer la auditoría', 'Esperamos sentados'],
        ans: 0,
        exp: '"Attend" means to be present at an event. "Tend to" means atender operativamente.',
        socraticHint: 'Alerta de falso amigo: "attend" significa asistir físicamente, no atender.',
        category: 'Pragmática & Protocolo Laboral'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL B2 CERTIFICATION EXAM (Vantage / Tronco Común IV • 60.0h)
  // ─────────────────────────────────────────────────────────────────────────────
  'mcer-b2': {
    id: 'exam-mcer-b2',
    level: 'B2',
    title: 'Examen de Certificación Integral Nivel B2 (Vantage Fluency • 60.0h)',
    titleEN: 'CEFR B2 Comprehensive Milestone Certification Exam',
    timeLimitMinutes: 60,
    passingScore: 15,
    totalQuestions: 20,
    badgeId: 'stemos-mcer-b2-credential',
    accreditationDossier: 'Alineado a Tronco Común Universitario Inglés IV (CACEI / DGUTyP / SEP).',
    questions: [
      // Section 1: Executive Board & Negotiation Listening (4 items)
      {
        q: '[AUDIO] Listen to CTO Dr. Robert Hayes: "ECO-2026-88 requests upgrading our high-speed transceiver to low-loss Rogers laminate. Had we conducted thermal dissipation simulations earlier in Q2, the dielectric breakdown issue would have been mitigated without halting pre-production." — What would have mitigated the dielectric breakdown earlier?',
        audioScript: 'ECO-2026-88 requests upgrading our high-speed transceiver to low-loss Rogers laminate. Had we conducted thermal dissipation simulations earlier in Q2, the dielectric breakdown issue would have been mitigated without halting pre-production.',
        opts: ['Conducting thermal dissipation simulations earlier in Q2', 'Hiring more factory workers', 'Decreasing the warranty period', 'Ignoring the board failures'],
        ans: 0,
        exp: 'Dr. Hayes affirms: "Had we conducted thermal dissipation simulations earlier in Q2, the dielectric breakdown issue would have been mitigated..."',
        socraticHint: '¿Qué simulación técnica previa en Q2 habría mitigado la falla según el CTO?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Procurement Director Victoria Stone: "On condition that you commit to guaranteed four-week lead times and localized buffer warehousing in Tijuana, we are prepared to sign a two-year exclusive supply agreement." — What lead time is demanded?',
        audioScript: 'On condition that you commit to guaranteed four-week lead times and localized buffer warehousing in Tijuana, we are prepared to sign a two-year exclusive supply agreement.',
        opts: ['Guaranteed 4-week lead times', 'Twelve months', 'Six months', 'No lead time guarantee'],
        ans: 0,
        exp: 'Stone requires: "guaranteed four-week lead times."',
        socraticHint: '¿Cuál es el tiempo de entrega máximo condicionado para la firma del contrato?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to VP Sterling: "Under no circumstances should non-conforming batch units be re-certified without an exhaustive metallurgical failure analysis." — What is strictly prohibited?',
        audioScript: 'Under no circumstances should non-conforming batch units be re-certified without an exhaustive metallurgical failure analysis.',
        opts: ['Re-certifying non-conforming batch units without exhaustive metallurgical failure analysis', 'Running the factory on weekends', 'Conducting failure analysis', 'Paying employee salaries'],
        ans: 0,
        exp: 'Sterling strictly prohibits re-certifying non-conforming batch units without exhaustive metallurgical analysis.',
        socraticHint: '¿Qué acción queda prohibida categóricamente bajo ninguna circunstancia?',
        category: 'Comprensión Auditiva'
      },
      {
        q: '[AUDIO] Listen to Managing Partner Bennett: "Let us touch base with our supply chain partners before we pull the trigger on the expanded manufacturing facility." — What does "pull the trigger" mean?',
        audioScript: 'Let us touch base with our supply chain partners before we pull the trigger on the expanded manufacturing facility.',
        opts: ['Finalize and commit to the major investment decision', 'Fire a weapon', 'Cancel the expansion permanently', 'Sell the machines'],
        ans: 0,
        exp: '"Pull the trigger" is an American executive idiom meaning to commit to a major strategic decision.',
        socraticHint: '¿Qué decisión estratégica y de inversión significa el modismo "pull the trigger"?',
        category: 'Comprensión Auditiva'
      },

      // Section 2: Advanced Grammar & Syntactic Mastery (6 items)
      {
        q: 'Had the design team _____ the finite element analysis earlier, the chassis fatigue cracks would have been prevented.',
        opts: ['conducted', 'conducting', 'conduct', 'was conducted'],
        ans: 0,
        exp: 'Inversion of third conditional: "Had [subject] conducted [past participle]...".',
        socraticHint: 'Inversión formal de tercer condicional que reemplaza a "If the design team had conducted...".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The board of directors insisted that the supplier _____ ISO 14001 environmental certification before Q4.',
        opts: ['provide', 'provides', 'provided', 'will provide'],
        ans: 0,
        exp: 'Subjunctive mood with mandative "insisted that [subject] + base verb": "provide".',
        socraticHint: 'Subjuntivo mandativo tras "insisted that": verbo en forma base sin -s.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Under no circumstances _____ the cleanroom airlock doors be opened simultaneously.',
        opts: ['should', 'should not', 'they should', 'should they not'],
        ans: 0,
        exp: 'Negative inversion: auxiliary "should" precedes the subject "the cleanroom airlock doors".',
        socraticHint: 'Inversión enfática formal tras "Under no circumstances": el auxiliar precede al sujeto.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Seldom _____ a nearshoring facility achieved full automotive IATF certification within six months.',
        opts: ['has', 'have', 'did have', 'having'],
        ans: 0,
        exp: 'Negative frequency inversion with "Seldom" + singular auxiliary "has" + subject + participle.',
        socraticHint: 'Inversión con adverbio restrictivo "Seldom" y sujeto en singular.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'By the time the European audit team arrives next Monday, our facility _____ all containment audits.',
        opts: ['will have completed', 'will complete', 'completes', 'completed'],
        ans: 0,
        exp: 'Future perfect tense: action completed prior to a designated future time reference.',
        socraticHint: 'Futuro perfecto con "By the time [evento futuro]": "will have completed".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Were the tariff regulations to change unexpectedly, our localized supply chain _____ absorb the impact.',
        opts: ['would', 'will', 'is to', 'shall'],
        ans: 0,
        exp: 'Formal conditional inversion with "Were [subject] to [verb], [subject] would...".',
        socraticHint: 'Inversión formal de segundo condicional con "Were the regulations to change": requiere "would".',
        category: 'Gramática Aplicada & Sintaxis'
      },

      // Section 3: ECOs, Technical Specifications & Root Cause (5 items)
      {
        q: 'In an aerospace Engineering Change Order, what is the principle of "Form, Fit, and Function"?',
        opts: ['The criteria determining whether a part modification preserves interchangeability without altering the higher assembly', 'A marketing slogan for office chairs', 'An exercise routine for pilots', 'A packaging guideline for shipping boxes'],
        ans: 0,
        exp: 'Form, Fit, and Function (FFF) governs whether a part change requires a brand-new part number.',
        socraticHint: '¿Qué principio de configuración técnica evalúa la intercambiabilidad de partes modificadas?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'What is the metallurgical mechanism of "Inter-granular Stress Corrosion Cracking" (IGSCC)?',
        opts: ['Cracking that propagates along microscopic metal grain boundaries under simultaneous tensile stress and chemical corrosion', 'Surface rust caused by water puddles', 'Paint peeling off after three years', 'Metal melting under sunlight'],
        ans: 0,
        exp: 'IGSCC propagates along alloy grain boundaries due to sensitized microstructure and tensile stress.',
        socraticHint: '¿Cómo progresa la corrosión bajo esfuerzo a lo largo de los límites de grano del metal?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'In high-reliability semiconductor packaging, what is the advantage of using Rogers high-frequency laminates over standard FR-4?',
        opts: ['Significantly lower dielectric loss (Df) and stable dielectric constant (Dk) at gigahertz frequencies', 'It is made of recycled plastic', 'It is cheaper than cardboard', 'It glows under ultraviolet lamps'],
        ans: 0,
        exp: 'Rogers laminates minimize signal attenuation and dielectric dispersion in RF and 5G microwave circuits.',
        socraticHint: '¿Qué propiedades dieléctricas de baja pérdida (Df y Dk) distinguen al laminado de alta frecuencia?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'Why does an executive escalation memo employ the BLUF (Bottom Line Up Front) structural protocol?',
        opts: ['To provide C-level decision-makers immediate clarity on financial risk, safety impact, and decisive containment in the opening paragraph', 'Because executives do not have computers', 'To hide the bad news at the bottom', 'To save paper ink'],
        ans: 0,
        exp: 'BLUF delivers the most critical operational conclusions and requested actions immediately.',
        socraticHint: '¿Por qué la metodología ejecutiva BLUF coloca la conclusión y el impacto financiero en el primer párrafo?',
        category: 'Lectura Técnica & Normas'
      },
      {
        q: 'In supply chain contracts, what does an "indexation clause" linked to the London Metal Exchange (LME) accomplish?',
        opts: ['Automatically adjusts unit prices based on transparent public market commodity movements, removing speculative raw material risk', 'Fixes the price forever without changes', 'Forces the supplier to pay the buyer cash', 'Cancels the contract if copper prices rise'],
        ans: 0,
        exp: 'Commodity indexation clauses tie contract price revisions to objective global market movements.',
        socraticHint: '¿Qué función cumple una cláusula de indexación a índices oficiales de materias primas (LME)?',
        category: 'Lectura Técnica & Normas'
      },

      // Section 4: American Business Idioms & Cultural Diplomacy (5 items)
      {
        q: 'What does the American business idiom "to get down to brass tacks" signify in a negotiation?',
        opts: ['To focus directly on the essential, practical, and factual matters at hand', 'To hammer copper nails into the table', 'To buy office supplies', 'To polish metal hardware'],
        ans: 0,
        exp: '"Get down to brass tacks" means stripping away pleasantries to address fundamental financial and technical realities.',
        socraticHint: '¿Qué significa el modismo corporativo "get down to brass tacks"?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'When an executive advises "Do not cut corners on the cleanroom HVAC validation", what is their intent?',
        opts: ['Do not compromise quality standards or skip regulatory steps to save time or cost', 'Do not make circular rooms', 'Avoid sharp table edges', 'Turn off the ventilation fans'],
        ans: 0,
        exp: '"Cut corners" means doing something poorly or taking cheap shortcuts that jeopardize long-term compliance.',
        socraticHint: '¿Qué advertencia de calidad implica el modismo "do not cut corners"?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'What does "keeping someone in the loop" entail in cross-border program management?',
        opts: ['Keeping stakeholders continuously informed and copied on project developments and decisions', 'Wrapping a wire around someone', 'Locking someone in an assembly cell', 'Excluding someone from email threads'],
        ans: 0,
        exp: '"In the loop" means maintaining transparent and timely communication with interested parties.',
        socraticHint: '¿Qué significa mantener a un colega o directivo "in the loop"?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'In high-stakes cross-cultural negotiations between Mexican suppliers and American OEMs, why is direct communication regarding schedule delays preferred over polite ambiguity?',
        opts: ['American corporate culture relies on low-context transparency to trigger automated risk mitigations, whereas ambiguity can be misconstrued as lack of integrity', 'Americans dislike conversation', 'Clocks run slower in Mexico', 'Delays are illegal under federal law'],
        ans: 0,
        exp: 'Low-context business environments value prompt, factual escalation so contingency plans can be executed immediately.',
        socraticHint: '¿Por qué la cultura corporativa estadounidense de bajo contexto exige comunicación directa y transparente sobre retrasos?',
        category: 'Pragmática & Protocolo Laboral'
      },
      {
        q: 'Cuidado con el falso amigo: "We must defend our technical premises before the executive board." — ¿Qué significa "premises"?',
        opts: ['Premisas lógicas y fundamentos teóricos / o las instalaciones físicas del edificio', 'Premios de la academia de ciencias', 'Promesas que no se pueden cumplir', 'Préstamos bancarios'],
        ans: 0,
        exp: '"Premises" can denote logical foundations/hypotheses or physical facilities. It never means "premios".',
        socraticHint: 'Alerta de falso amigo: en argumentación técnica, "premises" son las premisas lógicas o las instalaciones físicas.',
        category: 'Pragmática & Protocolo Laboral'
      }
    ]
  }
};

module.exports = { MCER_LEVEL_CERTIFICATION_EXAMS };
