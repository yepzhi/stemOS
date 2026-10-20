/**
 * stemOS — MCER 60.0h Full Questions Bank (All 16 Units • 176 Standardized MCQs)
 * ══════════════════════════════════════════════════════════════════════════════
 * Complete set of 16 Units x 3 Reading MCQs (48 items)
 * Complete set of 16 Units x 8 Unit Mastery Quiz MCQs (128 items)
 * Every reactivo includes:
 * - q: Question Stem in authentic industrial context
 * - opts: 4 Options (1 correct, 3 plausible technical distractors)
 * - ans: Index of correct option (0-3)
 * - exp: Technical & grammatical explanation
 * - socraticHint: Socratic AI Mentor reflection question (guía mayéutica)
 * - category: Pedagogical classification
 * ══════════════════════════════════════════════════════════════════════════════
 */

const MCER_QUESTIONS_BANK = {
  // ── A1.1: Personal & Professional Introductions ──
  'a1-u1': {
    readingQuestions: [
      {
        q: 'According to the orientation notice, by what time must incoming interns complete credential verification?',
        options: ['By 07:00 AM', 'By 08:30 AM on Day One', 'At the end of their first week', 'During the afternoon shift change'],
        correct: 1,
        answer: 1,
        exp: 'The passage explicitly states: "All incoming engineering interns must complete their security credential verification by 08:30 AM on Day One."'
      },
      {
        q: 'Where is Human Resources located within the Northern Tech facility?',
        options: ['In Corridor B next to the lockers', 'On the factory floor at Line 3', 'On the second floor, Room 210', 'At the main turnstile entrance'],
        correct: 2,
        answer: 2,
        exp: 'The text specifies: "Please bring your official university credentials and emergency contact sheet to Human Resources on the second floor, Room 210."'
      },
      {
        q: 'What is the facility policy regarding personal cell phones during active operations?',
        options: ['They must remain inside your equipment locker in Corridor B', 'They may be kept on your desk in silent mode', 'They can be used for taking machine photos freely', 'They must be handed to your shift supervisor'],
        correct: 0,
        answer: 0,
        exp: 'The standard safety protocol mandates: "Personal cell phones must remain inside your locker during active machine operations."'
      }
    ],
    unitQuiz: [
      {
        q: 'Hello, _____ name is David and I am an electrical engineering intern.',
        opts: ['my', 'me', 'mine', 'I'],
        ans: 0,
        exp: 'Use the possessive adjective "my" before the noun "name".',
        socraticHint: 'Observa la palabra "name" que sigue. ¿Necesitas un pronombre sujeto, objeto o un adjetivo posesivo para indicar propiedad?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Where _____ your workstation located on the production floor?',
        opts: ['are', 'is', 'be', 'am'],
        ans: 1,
        exp: 'Workstation is third-person singular (it), which pairs with "is".',
        socraticHint: '¿Cuál es el sujeto de la oración: "workstation" (singular) o "workstations" (plural)? ¿Qué forma del verbo "to be" le corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'How do you politely introduce a new colleague to your supervisor in an American plant?',
        opts: ['Look at this person right now', 'This is Maria, our new quality assurance coordinator', 'Who is Maria here', 'Maria is she'],
        ans: 1,
        exp: '"This is [Name]" is the standard, respectful professional introduction formula in American workplace culture.',
        socraticHint: 'En el protocolo corporativo estadounidense, ¿cuál es la fórmula estándar de cortesía para presentar a un tercero a un líder?',
        category: 'Pragmática Estadounidense'
      },
      {
        q: 'Which question correctly asks for an employee identification number?',
        opts: ['What is your employee badge number?', 'Where employee number is?', 'Who employee number have you?', 'Why employee number?'],
        ans: 0,
        exp: '"What is your [noun]?" is the correct interrogative structure in English.',
        socraticHint: '¿Cuál es la palabra interrogativa adecuada para pedir un dato de identificación específico (número, código, nombre)?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Cuidado con el falso amigo: "Actually, my assigned station is on Line 3." ¿Qué significa "Actually"?',
        opts: ['Actualmente en este momento', 'En realidad / De hecho', 'Actuando en el puesto', 'Ocasionalmente'],
        ans: 1,
        exp: '"Actually" significa "en realidad" o "de hecho". Para decir "actualmente", se usa "currently" o "at present".',
        socraticHint: 'Recuerda la alerta de falsos amigos: ¿cómo se dice en inglés "en este momento" frente a "en realidad"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing the word "Colleague"?',
        opts: ['On the first syllable: COL-league', 'On the second syllable: col-LEAGUE', 'Both syllables receive equal high pitch', 'On the silent final -ue'],
        ans: 0,
        exp: 'In standard American English, "colleague" is stressed on the first syllable /ˈkɑːliːɡ/, and "-ue" is completely silent.',
        socraticHint: 'Revisa el Laboratorio Fonético de la unidad: ¿la terminación "-ue" se pronuncia o es muda?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Before stepping past the blue safety line on the shopfloor, what action is mandatory?',
        opts: ['Remove your badge to avoid magnetic interference', 'Ensure you are wearing approved safety eyewear', 'Turn off all machinery manually', 'Wait for a written memo from HR'],
        ans: 1,
        exp: 'As outlined in the plant dialogue, safety eyewear is mandatory whenever walking past the demarcation line into active production zones.',
        socraticHint: 'En el diálogo entre Mark y Alex, ¿qué equipo de protección le pide Alex confirmar antes de cruzar la línea azul?',
        category: 'Seguridad y Protocolo'
      },
      {
        q: 'Complete the dialogue: "_____ department are you assigned to?" — "I am in Quality Inspection."',
        opts: ['Which', 'Who', 'When', 'How'],
        ans: 0,
        exp: 'Use "Which" when choosing from a specific, defined set of departments within a company.',
        socraticHint: 'Si estás seleccionando un departamento entre las opciones disponibles de una fábrica, ¿qué palabra interrogativa se emplea?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── A1.2: Workplace Routines, Time & Schedules ──
  'a1-u2': {
    readingQuestions: [
      {
        q: 'How many continuous operating shifts run at the manufacturing facility?',
        options: ['Two shifts: Day and Night', 'Three continuous shifts: Shift 1, Shift 2, and Shift 3', 'One extended 12-hour shift', 'Four rotating weekend shifts'],
        correct: 1,
        answer: 1,
        exp: 'The document states: "Plant operations run on three continuous shifts. Shift 1 (07:00-15:30), Shift 2 (15:30-23:30), and Shift 3 (23:30-07:00)."'
      },
      {
        q: 'What is the primary operational reason for staggering cafeteria lunch times into Group A and Group B?',
        options: ['Because the cafeteria cooks only prepare food for 20 people', 'To prevent production bottlenecks and maintain line coverage on the floor', 'To allow managers to eat before technicians', 'To clean the tables between meal groups'],
        correct: 1,
        answer: 1,
        exp: 'The text specifies: "To prevent production bottlenecks, cafeteria meal times are strictly staggered: Group A dines at 11:30 AM, and Group B dines at 12:15 PM."'
      },
      {
        q: 'What rule must operators follow regarding conveyor lines during meal handoffs?',
        options: ['Operators must turn off the main circuit breaker during lunch', 'Operators must speed up the conveyor before leaving', 'Operators must never leave active conveyor lines unattended during break handoffs', 'Operators can leave whenever their personal watch shows 11:30 AM'],
        correct: 2,
        answer: 2,
        exp: 'The safety directive mandates: "Operators must never leave active conveyor lines unattended during break handoffs."'
      }
    ],
    unitQuiz: [
      {
        q: 'The morning safety briefing starts _____ 7:15 AM every morning.',
        opts: ['in', 'on', 'at', 'to'],
        ans: 2,
        exp: 'In English, use the preposition "at" with specific clock times (at 7:15 AM, at noon).',
        socraticHint: '¿Qué preposición de tiempo se utiliza en inglés antes de horas exactas del reloj?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'She _____ late to her workstation; she is always on time.',
        opts: ['never is', 'is never', 'does never', 'not is'],
        ans: 1,
        exp: 'Frequency adverbs follow the verb "to be" (Subject + BE + Adverb: "she is never late").',
        socraticHint: 'Cuando usamos el verbo "to be", ¿el adverbio de frecuencia (never, always) se coloca antes o después de "is"?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What _____ you do during the 15:00 PM shift handover?',
        opts: ['do', 'does', 'are', 'did'],
        ans: 0,
        exp: 'In Simple Present questions with subject pronoun "you", use auxiliary "do".',
        socraticHint: 'En preguntas del presente simple, ¿cuál es el verbo auxiliar para la segunda persona (you)?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'We work on the automated stamping line _____ Mondays and Wednesdays.',
        opts: ['at', 'in', 'on', 'for'],
        ans: 2,
        exp: 'Use the preposition "on" with days of the week (on Monday, on weekends).',
        socraticHint: '¿Qué preposición en inglés acompaña a los días de la semana y fechas específicas?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Cuidado con el falso amigo: "All technicians must attend the mandatory EHS meeting." ¿Qué significa "attend"?',
        opts: ['Atender y arreglar una máquina descompuesta', 'Asistir presencialmente a la reunión', 'Esperar a que comience la junta', 'Servir café a los supervisores'],
        ans: 1,
        exp: '"Attend" significa estar presente o asistir a una sesión. "Atender" a un equipo se traduce como "check" o "service".',
        socraticHint: 'Revisa la alerta de falsos amigos: ¿cómo traduces "asistir a un evento" vs. "atender una máquina"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall in the technical noun "Maintenance"?',
        opts: ['On the first syllable: MAIN-te-nance', 'On the middle syllable: main-TE-nance', 'On the final syllable: main-te-NANCE', 'It is pronounced without any stressed vowel'],
        ans: 0,
        exp: 'In American English, "maintenance" has its primary stress on the first syllable: /ˈmeɪntənəns/.',
        socraticHint: '¿El acento recae en la primera sílaba "MAIN" o se pronuncia agudo como en español?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Before leaving the plant at the end of a shift, what must operators do at the digital time clock?',
        opts: ['Punch out using their digital badge', 'Unplug the time clock power supply', 'Reformat the memory card', 'Write their signature on the wall'],
        ans: 0,
        exp: 'To "punch out" (or clock out) means recording the end of your shift on the attendance system.',
        socraticHint: '¿Cuál es el término técnico en inglés estadounidense para registrar la salida en el checador?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Technicians _____ the daily maintenance log before shutting down the hydraulic pump.',
        opts: ['always update', 'update always', 'are always update', 'always updating'],
        ans: 0,
        exp: 'With regular action verbs, adverbs of frequency precede the main verb: Subject + Adverb + Verb ("always update").',
        socraticHint: 'A diferencia del verbo "to be", ¿dónde se sitúa el adverbio "always" frente a verbos de acción como "update"?',
        category: 'Gramática y Sintaxis'
      }
    ]
  },

  // ── A1.3: Workstation Navigation, Tools & Supplies ──
  'a1-u3': {
    readingQuestions: [
      {
        q: 'Under 5S housekeeping standards, how must every hand tool be stored on the shadow board?',
        options: ['Inside any random drawer that is empty', 'In its designated shadow outline with matching silhouette', 'Stacked in piles of ten on the workbench', 'Stored inside the operator lunch locker'],
        correct: 1,
        answer: 1,
        exp: 'The text specifies: "Under 5S housekeeping standards, every tool has a designated shadow outline."'
      },
      {
        q: 'What electronic procedure is required to sign out specialized calibration gauges from the tool crib?',
        options: ['Scanning your employee ID badge at the checkout terminal', 'Paying a cash deposit to the crib attendant', 'Submitting a printed paper requisition form signed by HR', 'Calling the university academic dean'],
        correct: 0,
        answer: 0,
        exp: 'The rule states: "All specialized calibration gauges must be signed out electronically using your employee badge."'
      },
      {
        q: 'What is prohibited regarding machine guards and electrical enclosures?',
        options: ['Cleaning them with microfiber cloths', 'Leaving loose hand tools on top of active machine guards or enclosures', 'Inspecting them during preventative maintenance', 'Painting them safety yellow'],
        correct: 1,
        answer: 1,
        exp: 'The text strictly warns: "Never leave loose hand tools on top of active machine guards or electrical enclosures."'
      }
    ],
    unitQuiz: [
      {
        q: '_____ two emergency eyewash stations located next to the chemical storage enclosure.',
        opts: ['There is', 'There are', 'They have', 'Are there'],
        ans: 1,
        exp: 'Use "There are" with plural noun phrases ("two emergency eyewash stations").',
        socraticHint: '¿El sustantivo "eyewash stations" es singular o plural? ¿Cuál expresión existencial corresponde en plural?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The digital multimeters are stored _____ the top drawer of Cabinet 3.',
        opts: ['in', 'at', 'on to', 'between'],
        ans: 0,
        exp: 'Use preposition "in" to denote containment inside an enclosed drawer, box, or cabinet.',
        socraticHint: 'Si un objeto está dentro de un cajón o gabinete cerrado, ¿qué preposición espacial se emplea?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The main emergency exit is located _____ Line 2 and the motor testing bay.',
        opts: ['under', 'between', 'inside of', 'amongst'],
        ans: 1,
        exp: 'Use "between" when specifying a position in the space separating two distinct entities.',
        socraticHint: 'Cuando un elemento se ubica en el espacio intermedio que separa dos puntos específicos, ¿qué preposición se usa?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Which tool is calibrated specifically to verify the precise outer diameter of cylindrical pins?',
        opts: ['Digital calipers', 'Heavy sledgehammer', 'Wire cutters', 'Utility razor knife'],
        ans: 0,
        exp: 'Calipers (vernier) are precision metrology instruments used to measure internal and external dimensions.',
        socraticHint: '¿Cuál instrumento de metrología dimensional mide diámetros externos con precisión de milésimas de pulgada o milímetros?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "There are multiple spare parts in the cabinet." ¿Qué son "spare parts"?',
        opts: ['Partes que estorban o sobran', 'Refacciones y piezas de repuesto', 'Herramientas rotas para chatarra', 'Muestras de laboratorio químico'],
        ans: 1,
        exp: '"Spare parts" son piezas de repuesto o refacciones operativas para mantenimiento.',
        socraticHint: '¿Cómo se le denomina en la industria de manufactura a las piezas de recambio para máquinas?',
        category: 'Léxico Técnico'
      },
      {
        q: 'What is the regular plural form of the noun "Calibrator"?',
        opts: ['Calibratores', 'Calibrators', 'Calibrateries', 'Calibrator-men'],
        ans: 1,
        exp: 'The regular plural is formed by adding -s: "Calibrators".',
        socraticHint: 'Aplica la regla morfológica regular de pluralización en inglés para sustantivos estándar.',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Workstation"?',
        opts: ['WORK-sta-tion (accent on WORK)', 'work-STA-tion (accent on STA)', 'work-sta-TION (accent on TION)', 'There is no stressed syllable'],
        ans: 0,
        exp: 'In compound workplace nouns, the primary stress falls on the first element: WORK-sta-tion.',
        socraticHint: 'En palabras compuestas en inglés técnico, ¿dónde recae generalmente el acento de intensidad?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Complete the inventory inquiry: "_____ any 5mm hex wrenches left on the mobile cart?"',
        opts: ['Is there', 'Are there', 'There are', 'Have there'],
        ans: 1,
        exp: 'In questions with plural countable nouns ("hex wrenches"), invert to "Are there...?"',
        socraticHint: 'Para formular una pregunta sobre la existencia de objetos en plural, ¿cómo se invierte la estructura?',
        category: 'Gramática y Sintaxis'
      }
    ]
  },

  // ── A1.4: Health, Safety & PPE Compliance ──
  'a1-u4': {
    readingQuestions: [
      {
        q: 'Under OSHA standards, what color combination identifies Lockout/Tagout (LOTO) energy isolation warning tags?',
        options: ['Green and white', 'Red, black, and white danger tags with hazard warnings', 'Blue and yellow information tags', 'Solid orange maintenance labels'],
        correct: 1,
        answer: 1,
        exp: 'The safety specification states that OSHA LOTO padlocks and tags feature high-visibility red, black, and white warning typography to signal zero-energy state.'
      },
      {
        q: 'What type of footwear is mandatory across all active warehouse and machine cell aisles?',
        options: ['Breathable canvas running shoes', 'ASTM-compliant steel-toe or composite safety boots', 'Open-toe rubber sandals for ventilation', 'Standard leather office shoes'],
        correct: 1,
        answer: 1,
        exp: 'The standard mandates ASTM F2413 compliant steel-toe or composite toe protective footwear.'
      },
      {
        q: 'What is the immediate requirement when high-decibel acoustic levels exceed 85 dBA?',
        options: ['Operators must shout to communicate', 'Approved hearing protection (earplugs or earmuffs) must be worn', 'The line must be permanently dismantled', 'Operators can remove their eye protection'],
        correct: 1,
        answer: 1,
        exp: 'OSHA standard 1910.95 requires approved hearing protection in continuous noise environments above 85 dBA.'
      }
    ],
    unitQuiz: [
      {
        q: 'You _____ wear ANSI Z87.1 approved safety glasses in all designated yellow floor zones.',
        opts: ['must', 'can optionally', 'are never', 'might if comfortable'],
        ans: 0,
        exp: 'Use modal "must" to express mandatory regulatory requirements and critical safety rules.',
        socraticHint: '¿Cuál verbo modal expresa una obligación estricta e ineludible impuesta por una norma de seguridad industrial?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Choose the correct imperative instruction: "_____ the emergency stop button immediately if the robotic arm jams!"',
        opts: ['Pressing', 'To press', 'Press', 'You pressing'],
        ans: 2,
        exp: 'Imperative instructions start with the base form of the verb without "to" or suffixes: "Press".',
        socraticHint: '¿Cómo se forma una orden o instrucción directa de emergencia en inglés técnico?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Do not _____ any electrical control panel without an authorized Lockout/Tagout permit.',
        opts: ['open', 'opening', 'opened', 'to open'],
        ans: 0,
        exp: 'Negative imperatives use "Do not" followed by the base form of the verb ("open").',
        socraticHint: 'Después de "Do not" en una prohibición técnica, ¿qué forma debe adoptar el verbo principal?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What does the industrial acronym "PPE" stand for under OSHA and safety guidelines?',
        opts: ['Personal Plant Equipment', 'Personal Protective Equipment', 'Primary Production Engine', 'Physical Protection Element'],
        ans: 1,
        exp: 'PPE stands for Personal Protective Equipment (EPP en español).',
        socraticHint: '¿Cuál es el significado formal internacional de la sigla "PPE" en seguridad y salud ocupacional?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "Wear ear protection to avoid injury in this facility." ¿Qué es una "injury"?',
        opts: ['Una calumnia legal o insulto', 'Una lesión o herida física en el cuerpo', 'Una pieza de desecho oxidada', 'Una multa económica aplicada por el supervisor'],
        ans: 1,
        exp: '"Injury" significa lesión o herida física en el cuerpo. Una injuria moral es "insult" o "slander".',
        socraticHint: 'Revisa el falso amigo: ¿"injury" se refiere a una ofensa verbal o a una lesión corporal en el trabajo?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Hazardous"?',
        opts: ['HAZ-ard-ous (accent on HAZ)', 'haz-ARD-ous (accent on ARD)', 'haz-ard-OUS (accent on OUS)', 'Equal flat tone on all syllables'],
        ans: 0,
        exp: 'In American English, "hazardous" is stressed on the first syllable: /ˈhæzərdəs/.',
        socraticHint: '¿El adjetivo "hazardous" (peligroso) se acentúa en la primera sílaba o en el sufijo?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Operators _____ clear of the robotic travel perimeter while the amber strobe light flashes.',
        opts: ['must remain', 'remaining', 'must to remain', 'remained always'],
        ans: 0,
        exp: 'Modals like "must" take the base verb directly without "to": "must remain".',
        socraticHint: '¿Los verbos modales como "must" llevan o no la preposición "to" antes del verbo principal?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What color safety sign universally designates chemical and eyewash emergency equipment under OSHA standards?',
        opts: ['Safety Green with white graphics', 'Bright Purple with black dots', 'Solid Red with skulls', 'Fluorescent Pink'],
        ans: 0,
        exp: 'Safety Green is the international color designation for first aid, safety eyewash, and emergency equipment.',
        socraticHint: '¿Cuál es el código de color internacional estándar para estaciones de primeros auxilios y lavaojos?',
        category: 'Seguridad y Protocolo'
      }
    ]
  },

  // ── A2.1: Workstation Setup & Equipment Operation ──
  'a2-u1': {
    readingQuestions: [
      {
        q: 'What is the required initial action before starting automated conveyor sequencing?',
        options: ['Lubricate the main drive chain while running', 'Perform a visual inspection and verify that all interlock switches are closed', 'Increase the motor voltage to 480V', 'Clear the PLC memory registry'],
        correct: 1,
        answer: 1,
        exp: 'The SOP states that operators must first inspect safety interlocks and clear the bed before initiating automated conveyor start cycles.'
      },
      {
        q: 'At what frequency must operators calibrate optical sensor focal distances on the assembly jig?',
        options: ['Once every year', 'At the start of every shift and after any tooling changeover', 'Only after an optical lens breaks', 'Whenever an auditor visits the floor'],
        correct: 1,
        answer: 1,
        exp: 'Calibration is required at shift inception and following any mechanical tooling adjustment.'
      },
      {
        q: 'What does a blinking yellow beacon on the machine tower light indicate?',
        options: ['Normal automated running cycle', 'Machine is operating in manual setup mode or awaiting feeder reload', 'Emergency stop triggered', 'Power disconnect failure'],
        correct: 1,
        answer: 1,
        exp: 'Under standard NFPA 79 tower light conventions, yellow indicates a warning, manual mode, or hopper reload condition.'
      }
    ],
    unitQuiz: [
      {
        q: '_____, inspect the pneumatic hoses; next, connect the air regulator to 90 PSI.',
        opts: ['First', 'Finally', 'At last', 'After while'],
        ans: 0,
        exp: 'Use "First" to introduce the initial step in a technical sequence.',
        socraticHint: '¿Cuál conector discursivo introduce el primer paso de un procedimiento operativo?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The technician is currently _____ the tension on the main drive belt.',
        opts: ['adjust', 'adjusts', 'adjusting', 'adjusted'],
        ans: 2,
        exp: 'With "is currently", form the Present Continuous with -ing: "is currently adjusting".',
        socraticHint: 'La presencia de "is currently" indica una acción en progreso. ¿Qué terminación verbal requiere?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Before power-up, ensure the safety interlock switch _____ properly engaged.',
        opts: ['is', 'are', 'be', 'were'],
        ans: 0,
        exp: '"Safety interlock switch" is third-person singular (it), requiring "is".',
        socraticHint: 'Identifica el núcleo del sujeto: "switch" está en singular. ¿Qué forma del verbo "to be" corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Which sequence adverb correctly indicates the conclusion of a four-step setup procedure?',
        opts: ['Initially', 'Next', 'Finally', 'Meanwhile'],
        ans: 2,
        exp: '"Finally" designates the concluding step in a chronological engineering workflow.',
        socraticHint: '¿Cuál adverbio de secuencia introduce el paso terminal o de cierre?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Cuidado con el falso amigo: "The plant is a high-tech facility." ¿Qué significa "facility"?',
        opts: ['Facilidad o habilidad fácil para hacer algo', 'Instalación industrial / Planta / Edificio de manufactura', 'Dificultad técnica imprevista', 'Aparato electrónico simple'],
        ans: 1,
        exp: '"Facility" en contexto industrial se refiere a una planta o instalación manufacturera. Facilidad de hacer algo es "ease".',
        socraticHint: 'Revisa el falso amigo: en inglés corporativo, ¿a qué se refiere "the facility"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Pneumatic"?',
        opts: ['PNEU-mat-ic', 'pneu-MAT-ic (accent on MAT)', 'pneu-mat-IC', 'The p- is pronounced with an explosive pop'],
        ans: 1,
        exp: 'In American English, the "p-" is completely silent and primary stress falls on the second syllable: /nuːˈmætɪk/.',
        socraticHint: 'Recuerda que la "p" es muda. ¿Dónde recae el golpe de voz prosódico?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'The operator _____ the digital touch screen to reset the batch cycle counter right now.',
        opts: ['touches', 'is touching', 'touched', 'was touch'],
        ans: 1,
        exp: 'The time expression "right now" requires the Present Continuous: "is touching".',
        socraticHint: 'La frase temporal "right now" exige describir una acción en progreso en este instante.',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Which pressure unit is standard for industrial pneumatic air lines in North American facilities?',
        opts: ['PSI (Pounds per Square Inch)', 'Kelvin', 'Gallons per Minute', 'RPM'],
        ans: 0,
        exp: 'PSI (Pounds per Square Inch) is the standard US customary unit for pneumatic line pressure.',
        socraticHint: '¿Cuál es la unidad de presión manométrica estándar en la industria estadounidense?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── A2.2: Reporting Machine Faults & Troubleshooting ──
  'a2-u2': {
    readingQuestions: [
      {
        q: 'What physical anomaly caused the automatic shutoff on Stamping Press #4 yesterday?',
        options: ['An overvoltage surge on the secondary transformer', 'A sheared alignment pin causing a sheet metal jam in the die cavity', 'A lack of hydraulic oil in the reservoir', 'An operator pressing the start button repeatedly'],
        correct: 1,
        answer: 1,
        exp: 'The incident log recorded a sheared alignment pin that resulted in an immediate sheet metal feeding jam.'
      },
      {
        q: 'What maintenance action was completed before resetting the emergency circuit?',
        options: ['The tooling die was repainted blue', 'Technicians extracted the jammed scrap and torqued a replacement pin to 65 Nm', 'The whole stamping press was sold for scrap', 'Operators bypassed the optical light curtain'],
        correct: 1,
        answer: 1,
        exp: 'The report specifies scrap extraction and torquing a new pin to 65 Nm under lock-out conditions.'
      },
      {
        q: 'How long did the total unprogrammed downtime last?',
        options: ['5 minutes', '42 minutes of downtime', '3 full days', '12 hours'],
        correct: 1,
        answer: 1,
        exp: 'The downtime log shows the press stopped at 10:14 AM and restarted at 10:56 AM, totaling 42 minutes.'
      }
    ],
    unitQuiz: [
      {
        q: 'Yesterday morning, the conveyor motor _____ unexpectedly due to thermal overload.',
        opts: ['stops', 'stopped', 'stopping', 'is stop'],
        ans: 1,
        exp: 'The time marker "Yesterday morning" requires Past Simple: "stopped".',
        socraticHint: 'El marcador temporal "Yesterday morning" sitúa la acción en el pasado cerrado. ¿Qué tiempo verbal se utiliza?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The lead technician _____ the root cause of the hydraulic leak an hour ago.',
        opts: ['finds', 'found', 'finding', 'was find'],
        ans: 1,
        exp: '"An hour ago" indicates finished past action; the irregular past of "find" is "found".',
        socraticHint: 'El verbo "find" es irregular. ¿Cuál es su forma en pasado simple?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The proximity sensor _____ not detect the incoming metal pallet during cycle 4.',
        opts: ['did', 'does', 'was', 'is'],
        ans: 0,
        exp: 'In Past Simple negative statements with regular verbs, use auxiliary "did not" + base verb.',
        socraticHint: '¿Cuál es el auxiliar de negación en pasado simple para todos los sujetos?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Which technical adjective describes a rotating shaft that is vibrating because it is not securely fastened?',
        opts: ['Loose', 'Tight', 'Calibrated', 'Polished'],
        ans: 0,
        exp: '"Loose" means not firmly or securely attached or fastened.',
        socraticHint: '¿Qué adjetivo en inglés describe una pieza o tornillo flojo que genera vibración?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "We cannot compromise plant safety." ¿Qué significa "compromise"?',
        opts: ['Comprometerse a asistir a una reunión', 'Poner en peligro / Comprometer negativamente la integridad', 'Firmar un contrato laboral', 'Comprar refacciones nuevas'],
        ans: 1,
        exp: '"To compromise" a menudo significa poner en riesgo o vulnerar ("compromise safety"). Comprometerse a una cita es "commit".',
        socraticHint: 'Revisa la alerta de falsos amigos: en seguridad industrial, ¿qué implica "to compromise safety"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Hydraulic"?',
        opts: ['HY-drau-lic', 'hy-DRAU-lic (accent on DRAU)', 'hy-drau-LIC', 'Equal stress across all three vowels'],
        ans: 1,
        exp: 'In American English, "hydraulic" has primary stress on the second syllable: /haɪˈdrɔːlɪk/.',
        socraticHint: '¿La sílaba tónica de "hydraulic" está en el prefijo o en la sílaba central "DRAU"?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Why _____ the safety curtain trigger an automatic shutdown during shift 2?',
        opts: ['did', 'was', 'were', 'does'],
        ans: 0,
        exp: 'Past Simple questions with a base verb ("trigger") use auxiliary "did".',
        socraticHint: 'Al formular una pregunta en pasado simple con un verbo de acción ("trigger"), ¿qué auxiliar se antepone al sujeto?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What official document must an operator fill out to request mechanical repair on a defective motor?',
        opts: ['A Maintenance Work Order (MWO)', 'A university transcript request', 'A personal loan application', 'A shipping invoice'],
        ans: 0,
        exp: 'A Maintenance Work Order (MWO / orden de trabajo) formally requests engineering corrective service.',
        socraticHint: '¿Cómo se le llama al formato formal para solicitar una reparación mecánica en planta?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── A2.3: Inventory, Spare Parts & Logistics ──
  'a2-u3': {
    readingQuestions: [
      {
        q: 'What is the minimum safety stock threshold for pneumatic solenoid valves in Warehouse Bay 4?',
        options: ['1 valve', '15 units minimum on shelf', '500 units', 'Zero, ordered on demand'],
        correct: 1,
        answer: 1,
        exp: 'The inventory specification mandates maintaining a minimum buffer stock of 15 solenoid valves to prevent line stoppage.'
      },
      {
        q: 'What automated system tracks reorder points and triggers supplier purchase orders when inventory dips below minimum?',
        options: ['A handwritten paper notebook', 'The automated ERP / MES inventory management database', 'A weekly telephone call from security', 'Physical counting every morning by operators'],
        correct: 1,
        answer: 1,
        exp: 'The ERP (Enterprise Resource Planning) system auto-generates replenishment purchase requisitions.'
      },
      {
        q: 'Where are hazardous flammable solvents stored in the logistics annex?',
        options: ['Directly on wooden pallets under sunlight', 'Inside double-walled FM-approved fireproof safety cabinets with grounding cables', 'In cardboard boxes next to the lunchroom', 'On the roof of the warehouse'],
        correct: 1,
        answer: 1,
        exp: 'NFPA and OSHA standards require flammable solvents in certified FM fireproof cabinets with ground wire dissipation.'
      }
    ],
    unitQuiz: [
      {
        q: 'We have _____ pneumatic fittings left in Bin 12; we need to reorder immediately.',
        opts: ['very few', 'much', 'too many', 'a lot of'],
        ans: 0,
        exp: 'Use "few" or "very few" with plural countable nouns ("pneumatic fittings") to denote scarcity.',
        socraticHint: 'El sustantivo "fittings" es contable en plural y hay escasez. ¿Qué cuantificador expresa pocos elementos contables?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'How _____ hydraulic oil does the CNC cooling reservoir require during flush cycles?',
        opts: ['much', 'many', 'few', 'several'],
        ans: 0,
        exp: 'Use "How much" with non-countable mass nouns like liquids ("oil").',
        socraticHint: '¿El aceite (oil) es un sustantivo contable individual o incontable de masa líquida?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Robotic Cell B is _____ than Cell A because it uses dual-axis servo drives.',
        opts: ['faster', 'more fast', 'fastest', 'fast'],
        ans: 0,
        exp: 'Form the comparative of one-syllable adjectives by adding -er: "faster than".',
        socraticHint: '¿Cómo se forma el comparativo regular de un adjetivo corto de una sola sílaba como "fast"?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'This is the _____ reliable optical sensor on our packaging line; it never fails calibration.',
        opts: ['more', 'most', 'better', 'much'],
        ans: 1,
        exp: 'Form the superlative of multi-syllable adjectives with "the most": "the most reliable".',
        socraticHint: 'Para un adjetivo largo de cuatro sílabas ("re-li-a-ble"), ¿cómo se construye el grado superlativo absoluto?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Cuidado con el falso amigo: "Copper is an excellent electrical conductor." ¿Qué es un "conductor"?',
        opts: ['El chofer de un camión de carga', 'Un material conductor de electricidad o calor', 'El director de orquesta sinfónica', 'Un cobrador de boletos'],
        ans: 1,
        exp: 'En ingeniería, "conductor" es un material físico que transmite corriente o calor. Un chofer vehicular es "driver".',
        socraticHint: 'Revisa el falso amigo: en física e ingeniería eléctrica, ¿qué significa "electrical conductor"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Inventory"?',
        opts: ['IN-ven-to-ry (accent on IN)', 'in-VEN-to-ry', 'in-ven-TO-ry', 'in-ven-to-RY'],
        ans: 0,
        exp: 'In American English, "inventory" is stressed firmly on the first syllable: /ˈɪnvəntɔːri/.',
        socraticHint: '¿El sustantivo "inventory" en inglés estadounidense lleva el acento en la primera sílaba "IN" o en la segunda?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'What document lists every component, raw material, and sub-assembly required to build a finished product?',
        opts: ['Bill of Materials (BOM)', 'Doctor prescription pad', 'Receipt of petty cash', 'Parking citation'],
        ans: 0,
        exp: 'A Bill of Materials (BOM / lista de materiales) itemizes every component and quantity for production.',
        socraticHint: '¿Cuál es la sigla estándar internacional para la lista estructurada de materiales de un producto de ingeniería?',
        category: 'Léxico Técnico'
      },
      {
        q: 'There are _____ defective resistors in this batch than in yesterday’s shipment.',
        opts: ['fewer', 'less', 'little', 'much'],
        ans: 0,
        exp: 'Use "fewer" with plural countable nouns ("resistors") when comparing quantities.',
        socraticHint: 'Para sustantivos contables en plural ("resistors"), ¿se utiliza "fewer" o "less"?',
        category: 'Gramática y Sintaxis'
      }
    ]
  },

  // ── A2.4: Shift Logs, Handover & Basic Technical Emails ──
  'a2-u4': {
    readingQuestions: [
      {
        q: 'What is the primary objective of a technical shift handover email sent to the incoming supervisor?',
        options: ['To complain about cafeteria food quality', 'To communicate machine operating status, scrap rate, and unresolved alarms', 'To send vacation photos to coworkers', 'To ask for a salary raise'],
        correct: 1,
        answer: 1,
        exp: 'The handover memo standardizes reporting throughput, downtime duration, scrap parts count, and pending open issues.'
      },
      {
        q: 'What standard email subject line format is mandatory at Northern Tech for quick indexing?',
        options: ['"Hello"', '"[LINE-STATUS] - Line 3 - Shift 1 Handover - [DATE]"', '"Urgent read now please"', '"FYI from Dave"'],
        correct: 1,
        answer: 1,
        exp: 'Industrial email etiquette requires a standardized tag: [TAG] - [LINE] - [SUBJECT] - [DATE] for traceability.'
      },
      {
        q: 'If an uncontained hydraulic leak remains active at shift change, who must be tagged on the email?',
        options: ['The plant night florist', 'The Incoming Shift Supervisor and the On-Duty Maintenance Specialist', 'Only the human resources intern', 'No one, leave it as a surprise'],
        correct: 1,
        answer: 1,
        exp: 'Standard escalation protocols require copying both the incoming supervisor and the maintenance technician on unresolved anomalies.'
      }
    ],
    unitQuiz: [
      {
        q: 'We _____ already calibrated all five laser sensors on Station 4.',
        opts: ['have', 'has', 'having', 'did'],
        ans: 0,
        exp: 'Use "have" + past participle with pronoun "We" to form the Present Perfect: "We have already calibrated".',
        socraticHint: '¿Cuál es el auxiliar del presente perfecto para la primera persona del plural (We)?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Shift 2 _____ not finished the visual inspection of the circuit boards yet.',
        opts: ['has', 'have', 'is', 'did'],
        ans: 0,
        exp: '"Shift 2" is singular collective entity (it), requiring auxiliary "has not finished".',
        socraticHint: 'El sujeto "Shift 2" funciona como tercera persona singular (it). ¿Qué auxiliar del presente perfecto le corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Have you _____ the digital incident report in the MES terminal?',
        opts: ['submitted', 'submit', 'submitting', 'submits'],
        ans: 0,
        exp: 'In Present Perfect questions ("Have you..."), use the past participle of the main verb: "submitted".',
        socraticHint: 'Después del auxiliar "Have you", ¿qué forma adopta el verbo principal en el presente perfecto?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Which standard email salutation is most appropriate for a formal technical dispatch to a client quality manager?',
        opts: ['Hey buddy, check this out:', 'Dear Mr. Henderson, / Dear Quality Team,', 'Yo Henderson,', 'What is up my friend:'],
        ans: 1,
        exp: '"Dear Mr. [Last Name]" or "Dear [Team]" is the standard professional salutation in formal American technical correspondence.',
        socraticHint: 'En correspondencia técnica formal dirigida a un cliente o gerente, ¿cuál es el saludo más profesional y cortés?',
        category: 'Pragmática Estadounidense'
      },
      {
        q: 'Cuidado con el falso amigo: "Fabrication of the aluminum chassis is on schedule." ¿Qué significa "fabrication"?',
        opts: ['Una mentira o invención falsa', 'Fabricación y manufactura física de piezas mecánicas', 'Diseño conceptual en papel', 'Venta en mostrador'],
        ans: 1,
        exp: 'En ingeniería y manufactura, "fabrication" es la fabricación, soldadura o corte físico de componentes. No significa engaño.',
        socraticHint: 'Revisa el falso amigo: en metalmecánica y ensamble, ¿a qué alude "metal fabrication"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Certificate"? (Noun form)',
        opts: ['CER-tif-i-cate', 'cer-TIF-i-cate (accent on TIF)', 'cer-tif-i-CATE', 'cer-tif-I-cate'],
        ans: 1,
        exp: 'As a noun, "certificate" has its primary stress on the second syllable: /sərˈtɪfɪkət/.',
        socraticHint: '¿El sustantivo "certificate" lleva el acento principal en la primera o en la segunda sílaba "TIF"?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Choose the correct sign-off for a technical status email:',
        opts: ['Warm regards, / Sincerely,', 'Kisses and hugs,', 'Later on,', 'See ya tomorrow dude,'],
        ans: 0,
        exp: '"Sincerely" and "Best regards / Warm regards" are accepted professional sign-offs in American corporate engineering.',
        socraticHint: '¿Cuál es la despedida escrita formal y profesional estándar en correos electrónicos de ingeniería?',
        category: 'Pragmática Estadounidense'
      },
      {
        q: 'The quality inspector _____ just verified the dimensional tolerances on the CNC milled bracket.',
        opts: ['has', 'have', 'is', 'was'],
        ans: 0,
        exp: '"The quality inspector" is third-person singular (he/she), which pairs with "has just verified".',
        socraticHint: 'Identifica el sujeto: "The quality inspector" es singular. ¿Qué auxiliar de presente perfecto requiere?',
        category: 'Gramática y Sintaxis'
      }
    ]
  },

  // ── B1.1: Standard Operating Procedures (SOPs) & Work Instructions ──
  'b1-u1': {
    readingQuestions: [
      {
        q: 'Under ISO 9001:2015 documentation standards, what defines an authorized Standard Operating Procedure (SOP)?',
        options: ['An informal sticky note placed on a monitor', 'A controlled, versioned document outlining step-by-step instructions to ensure reproducible quality', 'A verbal agreement between operators during lunch', 'A supplier brochure'],
        correct: 1,
        answer: 1,
        exp: 'ISO 9001 mandates controlled, audited, and reproducible work instructions with revision control.'
      },
      {
        q: 'What torque specification must be applied to the M12 flange bolts according to Work Instruction WI-402?',
        options: ['10 Nm hand tight', '55 Nm ± 2 Nm applied in an alternating star pattern', '150 Nm with an impact wrench', 'Zero torque, finger tight only'],
        correct: 1,
        answer: 1,
        exp: 'The instruction specifies 55 Nm ± 2 Nm in a cross-star tightening sequence to prevent gasket distortion.'
      },
      {
        q: 'What mandatory action must occur if a revision change (Rev B to Rev C) is released for an active SOP?',
        options: ['Old printed sheets must be recycled and operators must complete documented retraining before running production', 'Operators ignore the change until next year', 'Production continues with Rev B indefinitely', 'The line lead shreds the document silently'],
        correct: 0,
        answer: 0,
        exp: 'Under QMS protocols, obsolete revisions are quarantined/destroyed and personnel must be retrained with sign-off records.'
      }
    ],
    unitQuiz: [
      {
        q: 'The high-pressure hydraulic valve _____ to 55 Nm using a calibrated torque wrench.',
        opts: ['is torqued', 'torques', 'is torquing', 'torqued itself'],
        ans: 0,
        exp: 'Use the Passive Voice (is + past participle) when the object being operated on is the focus of the technical instruction.',
        socraticHint: 'En una instrucción técnica objetiva donde la pieza recibe la acción mecánica, ¿cómo se formula la voz pasiva presente?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'All optical sensors _____ every morning before initiating automated cell cycles.',
        opts: ['must be inspected', 'must to inspect', 'must inspecting', 'must inspected'],
        ans: 0,
        exp: 'Modal passive structure is: Modal + be + Past Participle ("must be inspected").',
        socraticHint: '¿Cómo se estructura la voz pasiva con un verbo modal de obligación (must + be + participio)?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Operators _____ bypass safety interlocks under any operating circumstances.',
        opts: ['should never', 'ought to', 'are allowed to', 'can optionally'],
        ans: 0,
        exp: 'Use "should never" to indicate strict, non-negotiable safety prohibitions.',
        socraticHint: '¿Cuál combinación modal expresa una prohibición absoluta en normativas de seguridad de planta?',
        category: 'Seguridad y Protocolo'
      },
      {
        q: 'Which document control element ensures that operators are not running obsolete procedures?',
        opts: ['Revision Number and Effective Release Date', 'The color of the binder cover', 'The operator personal signature on the wall', 'A barcode sticker on the lunch table'],
        ans: 0,
        exp: 'Controlled engineering documents must feature Document ID, Revision Level (Rev), and Effective Date.',
        socraticHint: 'Bajo la norma ISO 9001, ¿qué dos datos encabezan una instrucción técnica para garantizar su vigencia?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "The wafer yield reached 98.4% this quarter." ¿Qué significa "yield"?',
        opts: ['Ceder el paso en el tráfico automotriz', 'Rendimiento / Porcentaje de piezas conformes sin defecto', 'Hielo acumulado en el condensador', 'Grito de auxilio de un operador'],
        ans: 1,
        exp: 'En manufactura avanzada y semiconductores, "yield" es el rendimiento productivo (% de piezas buenas producidas).',
        socraticHint: 'Revisa el falso amigo: en la industria de semiconductores y manufactura, ¿qué mide la métrica de "yield"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Specification"?',
        opts: ['spec-i-fi-CA-tion (accent on CA)', 'SPEC-i-fi-ca-tion', 'spec-I-fi-ca-tion', 'spec-i-FI-ca-tion'],
        ans: 0,
        exp: 'Words ending in the suffix "-tion" regularly receive primary stress on the penultimate syllable: /ˌspɛsɪfɪˈkeɪʃən/.',
        socraticHint: 'Aplica la regla de acentuación prosódica para palabras con terminación "-tion". ¿Dónde cae el acento?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'The printed circuit boards _____ with isopropyl alcohol before applying the conformal coating.',
        opts: ['are cleaned', 'cleaning', 'clean', 'are clean'],
        ans: 0,
        exp: 'Passive Voice plural: are + past participle ("are cleaned").',
        socraticHint: 'El sujeto "circuit boards" es plural y recibe la acción de limpieza. ¿Qué forma pasiva le corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What is the technical definition of "Torque"?',
        opts: ['Rotational mechanical force applied to a fastener', 'The electrical resistance of a wire', 'The temperature inside an autoclave', 'The weight of a cardboard box'],
        ans: 0,
        exp: 'Torque is the rotational force applied around an axis, measured in Newton-meters (Nm) or Foot-pounds (ft-lb).',
        socraticHint: 'En mecánica y ensamble automotriz, ¿qué magnitud física representa el torque aplicado a un perno?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── B1.2: 8D Problem Solving & Root Cause Analysis ──
  'b1-u2': {
    readingQuestions: [
      {
        q: 'In the automotive 8D problem-solving discipline, what is the crucial purpose of Step D3 (Containment Action)?',
        options: ['To blame the supplier publicly', 'To isolate defective inventory immediately and prevent non-conforming parts from reaching the customer', 'To dismantle the entire factory permanently', 'To wait for customer complaints to increase'],
        correct: 1,
        answer: 1,
        exp: 'D3 establishes immediate containment to quarantine suspected lots and protect the customer while root cause investigation proceeds.'
      },
      {
        q: 'What analytical methodology was used in Step D4 to drill down into the electrical intermittent failure?',
        options: ['Guessing randomly', 'The 5-Whys root cause analysis combined with an Ishikawa Fishbone diagram', 'Flipping a coin three times', 'Asking the delivery driver for advice'],
        correct: 1,
        answer: 1,
        exp: 'Step D4 utilizes structured RCA tools: Ishikawa cause-and-effect diagrams and the 5-Whys interrogation technique.'
      },
      {
        q: 'What permanent corrective action (D5/D6) was implemented to prevent recurrence of solder bridging?',
        options: ['Re-programming the wave soldering thermal profile and modifying stencil aperture geometry by 12%', 'Lowering operator wages', 'Buying cheaper solder alloy', 'Increasing line conveyor speed by 50%'],
        correct: 0,
        answer: 0,
        exp: 'The engineering action plan corrected stencil aperture dimensions and optimized thermal ramp-up rates.'
      }
    ],
    unitQuiz: [
      {
        q: 'The assembly line _____ for three hours before technicians identified the sheared gear.',
        opts: ['had been stopped', 'has stopped', 'was stop', 'will stop'],
        ans: 0,
        exp: 'Use Past Perfect ("had been stopped") to describe an action occurring prior to another past event ("identified").',
        socraticHint: 'La detención de la línea ocurrió ANTES de que los técnicos identificaran la falla. ¿Qué tiempo verbal expresa el "pasado del pasado"?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The quality team discovered that the supplier _____ defective capacitors in the previous lot.',
        opts: ['had shipped', 'has shipped', 'ships', 'will ship'],
        ans: 0,
        exp: 'The shipping occurred before the discovery, requiring the Past Perfect: "had shipped".',
        socraticHint: 'El envío por parte del proveedor sucedió antes de que el equipo de calidad lo descubriera. ¿Cuál es el tiempo adecuado?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'While the robotic arm _____ the chassis, the optical vision sensor triggered an unexpected fault.',
        opts: ['was welding', 'welded', 'is welding', 'has welded'],
        ans: 0,
        exp: 'Use Past Continuous ("was welding") to describe an ongoing background action interrupted by a past event.',
        socraticHint: 'La acción de soldar estaba en progreso cuando se activó la alarma. ¿Qué tiempo verbal describe esa acción continua en el pasado?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What is the core objective of the "5-Whys" methodology in industrial quality engineering?',
        opts: ['To drill past surface symptoms to determine the underlying systemic root cause', 'To ask five different operators the same question', 'To delay the audit for five weeks', 'To write five separate incident reports'],
        ans: 0,
        exp: 'The 5-Whys interrogative technique peels away layers of symptoms to reach the fundamental systemic cause of failure.',
        socraticHint: '¿Cuál es el propósito medular de preguntar sucesivamente "¿Por qué?" en la ingeniería de calidad?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "Submit your engineering resume before the interview." ¿Qué es un "resume"?',
        opts: ['Un resumen de texto de un libro', 'El currículum vitae profesional (CV)', 'Reanudar una máquina pausada', 'Una queja formal de calidad'],
        ans: 1,
        exp: '"Resume" (sustantivo) significa currículum vitae en inglés estadounidense. Reanudar una actividad es el verbo "to resume".',
        socraticHint: 'Revisa el falso amigo: en el ámbito profesional estadounidense, ¿qué documento laboral es un "resume"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Defect" (as a noun)?',
        opts: ['DE-fect (accent on DE)', 'de-FECT (accent on FECT)', 'Equal stress on both syllables', 'The word has no stressed vowel'],
        ans: 0,
        exp: 'As a noun denoting a physical flaw, "defect" is stressed on the first syllable: /ˈdiːfɛkt/. (The verb "to defect" is stressed on the second).',
        socraticHint: 'En inglés técnico, el sustantivo "defect" (falla/defecto) acentúa la primera sílaba "DE". ¿Cómo se pronuncia?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Which 8D step validates that the permanent corrective action actually eradicated the failure mode?',
        opts: ['D7 - Prevent Recurrence', 'D6 - Implement and Validate Corrective Action', 'D1 - Establish the Team', 'D2 - Describe the Problem'],
        ans: 1,
        exp: 'D6 focuses on deploying and quantitatively validating that corrective actions eliminated the root cause.',
        socraticHint: '¿En cuál de las 8 disciplinas se implementan y validan formalmente las acciones correctivas permanentes?',
        category: 'Léxico Técnico'
      },
      {
        q: 'The motor overheated because the cooling fan _____ clogged with industrial metal dust.',
        opts: ['had become', 'has become', 'becomes', 'is becoming'],
        ans: 0,
        exp: 'The clogging occurred prior to the overheating, necessitating the Past Perfect: "had become".',
        socraticHint: 'La obstrucción con polvo metálico ocurrió con anterioridad al sobrecalentamiento. ¿Qué tiempo verbal conecta ambas acciones pasadas?',
        category: 'Gramática y Sintaxis'
      }
    ]
  },

  // ── B1.3: Quality Control, Tolerances & Statistical Process Control ──
  'b1-u3': {
    readingQuestions: [
      {
        q: 'What minimum process capability index (Cpk) is required for critical automotive safety dimensions under IATF 16949?',
        options: ['Cpk ≥ 0.67', 'Cpk ≥ 1.33 (with 1.67 for high-liability safety characteristics)', 'Cpk must be zero', 'Cpk is only measured once every decade'],
        correct: 1,
        answer: 1,
        exp: 'Automotive standard IATF 16949 mandates Cpk ≥ 1.33 for standard features and ≥ 1.67 for critical safety-critical dimensions.'
      },
      {
        q: 'What is indicated when five consecutive points on an X-bar control chart fall on one side of the central line?',
        options: ['Completely random normal distribution', 'A statistically significant process shift or trend requiring immediate tool wear investigation', 'The machine is running faster', 'The sensors are turned off'],
        correct: 1,
        answer: 1,
        exp: 'Under Western Electric SPC rules, consecutive runs on one side of the mean signal non-random process shift or tool degradation.'
      },
      {
        q: 'What dimensional measurement device is utilized for sub-micron verification of complex 3D engine block geometries?',
        options: ['A wooden yardstick', 'A Coordinate Measuring Machine (CMM) in a climate-controlled inspection bay', 'A plastic pocket ruler', 'Visual inspection through a window'],
        correct: 1,
        answer: 1,
        exp: 'CMMs (Coordinate Measuring Machines) inside thermal stabilization labs provide high-precision 3D dimensional metrology.'
      }
    ],
    unitQuiz: [
      {
        q: 'If the Cpk index _____ below 1.33, the automated line will trigger an alert for engineering review.',
        opts: ['drops', 'will drop', 'dropped', 'had dropped'],
        ans: 0,
        exp: 'In First Conditional real scenarios: If + Present Simple ("drops"), main clause uses will + base verb ("will trigger").',
        socraticHint: 'En oraciones condicionales de tipo 1 (reales/factibles), ¿qué tiempo verbal sigue a la cláusula "If"?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'If we calibrated the coordinate measuring machine weekly, we _____ fewer measurement variances.',
        opts: ['would observe', 'will observe', 'observe', 'observed'],
        ans: 0,
        exp: 'Second Conditional (hypothetical): If + Past Simple ("calibrated"), main clause uses would + base verb ("would observe").',
        socraticHint: 'La cláusula condicional usa pasado simple ("calibrated"). ¿Qué modal hipotético corresponde en la cláusula principal?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The outer diameter of the crankshaft must remain within the specified tolerance of 45.00 mm _____ 0.02 mm.',
        opts: ['plus or minus (±)', 'multiplied by', 'divided into', 'underneath'],
        ans: 0,
        exp: 'Engineering tolerances are designated with "plus or minus" (±) to indicate upper and lower allowable limits.',
        socraticHint: '¿Cómo se lee y escribe formalmente el símbolo "±" en especificaciones de tolerancias dimensionales en inglés?',
        category: 'Léxico Técnico'
      },
      {
        q: 'What statistical measure indicates whether a manufacturing process is capable of producing parts within specification limits?',
        opts: ['Process Capability Index (Cpk / Ppk)', 'Total factory floor square footage', 'Number of cafeteria chairs', 'Monthly electricity bill'],
        ans: 0,
        exp: 'Cpk evaluates both the spread and centering of a process relative to its upper and lower specification limits (USL/LSL).',
        socraticHint: '¿Qué índice estadístico relaciona la dispersión de seis sigmas del proceso con los límites de especificación del cliente?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "She realized the micrometer was out of calibration." ¿Qué significa "realized"?',
        opts: ['Realizó físicamente la calibración', 'Se dio cuenta / Comprendió la situación', 'Fabricó un micrómetro nuevo', 'Vendió el instrumento'],
        ans: 1,
        exp: '"To realize" significa percatarse, darse cuenta o comprender. Llevar a cabo una tarea física es "to perform" o "to carry out".',
        socraticHint: 'Revisa el falso amigo: en inglés, ¿"to realize" significa ejecutar una acción o percatarse de un hecho?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Statistical"?',
        opts: ['sta-TIS-ti-cal (accent on TIS)', 'STA-tis-ti-cal', 'sta-tis-TI-cal', 'sta-tis-ti-CAL'],
        ans: 0,
        exp: 'In American English, "statistical" has its primary stress on the second syllable: /stəˈtɪstɪkəl/.',
        socraticHint: '¿El adjetivo "statistical" lleva la sílaba tónica en "TIS" o en el prefijo?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'If the ambient temperature in the metrology lab rises above 20°C, the thermal expansion _____ the reading.',
        opts: ['will distort', 'distorted', 'would have distort', 'is distorting'],
        ans: 0,
        exp: 'First Conditional: If + Present Simple ("rises"), result clause = will + base verb ("will distort").',
        socraticHint: 'Se describe una causa-efecto física predecible. ¿Qué estructura condicional expresa este resultado futuro seguro?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What does "USL" represent on an industrial Statistical Process Control (SPC) chart?',
        opts: ['Upper Specification Limit', 'Universal Solder Line', 'Unified System Lock', 'Underground Safety Link'],
        ans: 0,
        exp: 'USL stands for Upper Specification Limit (Límite Superior de Especificación), set by customer engineering prints.',
        socraticHint: '¿Cuál es el significado formal de la sigla "USL" en las cartas de control estadístico de calidad?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── B1.4: Cross-Functional Technical Meetings & Engineering Dispatches ──
  'b1-u4': {
    readingQuestions: [
      {
        q: 'What is the primary agenda item for the Tuesday morning cross-functional engineering meeting?',
        options: ['Reviewing the launch schedule and tooling changeover for Project Titan', 'Ordering office stationery', 'Selecting the color of the company uniforms', 'Discussing weekend sports results'],
        correct: 0,
        answer: 0,
        exp: 'The meeting notice highlights the final production pilot and tooling changeover milestones for Project Titan.'
      },
      {
        q: 'How does an engineer professionally express technical disagreement with an unrealistic delivery timeline?',
        options: ['By shouting and walking out of the conference room', 'By using diplomatic phrasing: "From an engineering standpoint, that timeline introduces unacceptable quality risks"', 'By remaining silent and failing the deadline later', 'By blaming the purchasing department'],
        correct: 1,
        answer: 1,
        exp: 'American professional engineering pragmatics relies on data-driven, diplomatic pushback that frames issues around risk.'
      },
      {
        q: 'What action item was assigned to the automation team by the end of the sprint cycle?',
        options: ['Deploying the validated PLC ladder logic for Station 2 and completing the safety interlock sign-off', 'Painting the walls of the break room', 'Ordering 500 paper notebooks', 'Conducting a social media survey'],
        correct: 0,
        answer: 0,
        exp: 'The action matrix records the automation deliverable: PLC code deployment and safety sign-off.'
      }
    ],
    unitQuiz: [
      {
        q: 'Which phrase expresses diplomatic disagreement most professionally in an American engineering conference?',
        opts: ['"You are completely wrong about the motor sizing."', '"I understand your perspective; however, our thermal data indicates potential overheating under peak load."', '"That idea is foolish."', '"Do whatever you want, but it will fail."'],
        ans: 1,
        exp: 'Professional technical disagreement validates the counterpart’s perspective while grounding pushback on empirical data.',
        socraticHint: 'En una reunión con clientes o gerentes de EE. UU., ¿cómo se manifiesta un desacuerdo técnico sin sonar confrontacional?',
        category: 'Pragmática Estadounidense'
      },
      {
        q: 'It is highly _____ that the tooling supplier will deliver the CNC fixtures before Friday.',
        opts: ['likely', 'like', 'liking', 'as like'],
        ans: 0,
        exp: '"Likely" functions as an adjective meaning probable: "It is highly likely that...".',
        socraticHint: '¿Qué palabra en inglés significa "probable" en estimaciones de ingeniería y cronogramas?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Could you please _____ your recommendation regarding the backup power generator capacity?',
        opts: ['clarify', 'clarifies', 'clarifying', 'clarified'],
        ans: 0,
        exp: 'Modal questions ("Could you please...") take the base form of the verb: "clarify".',
        socraticHint: 'Después de una fórmula de cortesía modal ("Could you please..."), ¿en qué forma se presenta el verbo?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What term describes a quantifiable project milestone that must be achieved before moving to the next phase?',
        opts: ['Deliverable', 'Distraction', 'Deficit', 'Discrepancy'],
        ans: 0,
        exp: 'A deliverable (entregable) is a tangible or intangible product or service produced as a result of a project.',
        socraticHint: '¿Cuál es el término corporativo estándar para designar un entregable o hito contractual de un proyecto?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "The eventual outcome of the thermal test will be published tomorrow." ¿Qué significa "eventual"?',
        opts: ['Algo que ocurre de manera ocasional o por casualidad', 'Final / Definitivo que ocurrirá al final del proceso', 'Un suceso inesperado que causó alarma', 'Un evento deportivo'],
        ans: 1,
        exp: '"Eventual" en inglés significa final o resultante a largo plazo. Algo ocasional o por casualidad es "occasional" o "sporadic".',
        socraticHint: 'Revisa el falso amigo: ¿"eventual outcome" se refiere a un resultado fortuito o al resultado final resultante?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Deliverable"?',
        opts: ['de-LIV-er-a-ble (accent on LIV)', 'DE-liv-er-a-ble', 'de-liv-ER-a-ble', 'de-liv-er-A-ble'],
        ans: 0,
        exp: 'In American English, "deliverable" has primary stress on the second syllable: /dɪˈlɪvərəbəl/.',
        socraticHint: '¿El sustantivo "deliverable" (entregable) lleva su golpe de voz en "LIV" o en el sufijo?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'We _____ the project timeline with the Mexican and North American directors next Monday.',
        opts: ['are going to review', 'reviewed', 'had reviewed', 'were reviewing'],
        ans: 0,
        exp: 'Use "be going to" or Present Continuous for planned future arrangements with specific time markers ("next Monday").',
        socraticHint: 'Se trata de un plan agendado y confirmado para el próximo lunes. ¿Qué estructura de futuro planificado corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What is the purpose of an "Action Items Matrix" circulated after a technical design review?',
        opts: ['Assigning specific task ownership, deliverables, and completion deadlines to project engineers', 'Listing what snacks were served in the conference room', 'Recording employee personal birthdays', 'Calculating the cafeteria expense report'],
        ans: 0,
        exp: 'An Action Items list clearly maps Who (Owner), What (Task), and When (Due Date) for accountability.',
        socraticHint: '¿Cuál es el propósito medular de la minuta de compromisos (Action Items) tras una junta de ingeniería?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── B2.1: Engineering Change Orders (ECO) & Design Revisions ──
  'b2-u1': {
    readingQuestions: [
      {
        q: 'Under standard aerospace and automotive PLM workflows, why is an Engineering Change Order (ECO) required before altering CAD geometry?',
        options: ['Because CAD files cannot be edited without a password', 'To guarantee documented cross-departmental approval, traceability, and supply chain readiness', 'To satisfy personal preferences of the drafter', 'To delay the project launch date intentionally'],
        correct: 1,
        answer: 1,
        exp: 'An ECO enforces formal change control across design, tooling, procurement, inventory, and quality validation.'
      },
      {
        q: 'What catastrophic thermal failure mode did ECO-7804 resolve on the battery management system (BMS) enclosure?',
        options: ['The plastic cover was changing color under fluorescent lamps', 'Thermal runaway risk caused by insufficient heat dissipation near MOSFET switching arrays', 'Water vapor entering through the USB debugging port', 'The serial number label was peeling off'],
        correct: 1,
        answer: 1,
        exp: 'The change order resolved thermal concentration by integrating aluminum heat sinks and thermal conductive pads.'
      },
      {
        q: 'What inventory action must occur regarding pre-ECO component stock currently residing in assembly staging bins?',
        options: ['All pre-ECO parts must be immediately quarantined or reworked to prevent mixed-revision assembly', 'Operators continue assembling old parts without inspection', 'Parts are thrown into the ocean', 'Parts are donated to employees'],
        correct: 0,
        answer: 0,
        exp: 'Configuration management requires physical segregation and disposition (scrap, rework, or use-as-is) of legacy stock.'
      }
    ],
    unitQuiz: [
      {
        q: 'If the mechanical engineering team _____ the thermal dissipation in finite element analysis earlier, the PCB revision wouldn’t have required heat sinks.',
        opts: ['had modeled', 'modeled', 'would model', 'has modeled'],
        ans: 0,
        exp: 'Third Conditional (past hypothetical counterfactual): If + Past Perfect ("had modeled"), result = would have + past participle.',
        socraticHint: 'Esta situación es un contrafáctico en el pasado (algo que no sucedió en su momento). ¿Qué tiempo verbal sigue a "If"?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'If we had incorporated the customer feedback in Phase 1, our launch date _____ delayed by three months.',
        opts: ['would not have been', 'will not be', 'is not', 'was not'],
        ans: 0,
        exp: 'Past hypothetical conditional consequence: "would not have been delayed".',
        socraticHint: '¿Cómo se construye la consecuencia negativa de una condición hipotética en el pasado (Third Conditional)?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'All design changes _____ by the Lead Systems Architect prior to manufacturing execution.',
        opts: ['must be officially signed off', 'must sign off officially', 'must to be sign off', 'must been signing off'],
        ans: 0,
        exp: 'Modal passive structure: must + be + past participle ("must be officially signed off").',
        socraticHint: 'Los cambios de diseño reciben la firma de autorización. ¿Qué estructura pasiva con "must" corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What formal document formally requests authorization to alter a component specification before the actual ECO is published?',
        opts: ['Engineering Change Request (ECR)', 'Invoice receipt', 'Purchase requisition', 'Travel expense voucher'],
        ans: 0,
        exp: 'An ECR (Engineering Change Request) precedes the ECO to evaluate feasibility and cost impact.',
        socraticHint: '¿Cuál es la sigla del documento inicial de propuesta de cambio de ingeniería (ECR) previo a la orden formal (ECO)?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "This design revision is comprehensive." ¿Qué significa "comprehensive"?',
        opts: ['Que es muy comprensivo y perdona errores', 'Exhaustivo / Integral / Que abarca todos los aspectos', 'Fácil de comprender para principiantes', 'Comprimido en un archivo ZIP'],
        ans: 1,
        exp: '"Comprehensive" significa integral, exhaustivo o completo. "Comprensivo" con los demás se traduce como "understanding".',
        socraticHint: 'Revisa el falso amigo: cuando decimos "a comprehensive design revision", ¿nos referimos a empatía o a un alcance exhaustivo?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Photolithography"?',
        opts: ['pho-to-li-THOG-ra-phy (accent on THOG)', 'PHO-to-li-thog-ra-phy', 'pho-TO-li-thog-ra-phy', 'pho-to-li-thog-ra-PHY'],
        ans: 0,
        exp: 'Technical nouns with the Greek root "-graphy" regularly shift primary stress to the antepenultimate syllable: /ˌfoʊtoʊlɪˈθɑːɡrəfi/.',
        socraticHint: 'Aplica la regla prosódica para palabras con el sufijo "-graphy": el acento sube a la sílaba inmediatamente anterior.',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Had the quality team verified the resin shrinkage rate, the mold tooling _____ modified twice.',
        opts: ['would not have been', 'will not be', 'was not', 'is not'],
        ans: 0,
        exp: 'Inverted Third Conditional without "if": "Had the team verified..., the mold would not have been modified...".',
        socraticHint: 'Esta es una inversión condicional elegante sin "if" ("Had the team verified..."). ¿Cómo se completa la cláusula principal?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What phrase describes components that can replace older revisions without requiring mechanical modifications to surrounding mating parts?',
        opts: ['Form, Fit, and Function Interchangeability', 'Random Scrap Matching', 'Loose Assembly Tolerance', 'Visual Similarity'],
        ans: 0,
        exp: 'Form, Fit, and Function (FFF) interchangeability guarantees backward compatibility across mechanical and electrical boundaries.',
        socraticHint: '¿Cuál es la tríada de ingeniería (FFF) que define la intercambiabilidad total de una pieza sin alterar el ensamble?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── B2.2: Supplier Quality Audits & International Certifications ──
  'b2-u2': {
    readingQuestions: [
      {
        q: 'During an IATF 16949 supplier audit, what constitutes a "Major Non-Conformance"?',
        options: ['A minor spelling typo on a cleaning schedule', 'The absence or total systemic breakdown of a required quality management system control affecting product integrity', 'An auditor arriving 5 minutes early', 'A missing pen at the conference table'],
        correct: 1,
        answer: 1,
        exp: 'A Major Non-Conformance represents an absence or total failure of an essential QMS requirement that jeopardizes customer delivery.'
      },
      {
        q: 'What documented evidence must a Tier-1 supplier produce during raw material traceability sampling?',
        options: ['A Mill Test Certificate / Certificate of Analysis (CoA) matching heat lot numbers to incoming inventory', 'A verbal promise from the supplier sales representative', 'A photograph of the supplier corporate building', 'A business card'],
        correct: 0,
        answer: 0,
        exp: 'Auditors require verifiable Certificates of Analysis (CoA) linked directly to chemical heat lots and physical inventory.'
      },
      {
        q: 'What timeframe is standard for submitting a formal 8D corrective action plan following audit non-conformance issuance?',
        options: ['12 months', 'Initial containment within 24 hours, root cause within 14 days, and full closure within 30 calendar days', '5 years', 'No deadline, whenever convenient'],
        correct: 1,
        answer: 1,
        exp: 'Automotive and aerospace standards strictly mandate the 24h/14d/30d resolution cadence for audit findings.'
      }
    ],
    unitQuiz: [
      {
        q: 'The auditor requested that the calibration records _____ submitted for review before noon.',
        opts: ['be', 'are', 'were', 'to be'],
        ans: 0,
        exp: 'Subjunctive mood following verbs of demand or request ("requested that..."): use the bare subjunctive "be".',
        socraticHint: 'En inglés formal, tras verbos como "request that", "demand that" o "require that", ¿qué forma adopta el subjuntivo?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'It is imperative that every non-conforming batch _____ immediately quarantined in the designated red holding pen.',
        opts: ['be', 'is', 'was', 'being'],
        ans: 0,
        exp: 'Formulaic technical subjunctive: "It is imperative that [subject] be [past participle]".',
        socraticHint: 'Identifica la estructura con adjetivo de necesidad ("It is imperative that..."). ¿Qué forma verbal rige el subjuntivo inglés?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'How should an engineering quality director diplomatically counter an auditor’s preliminary finding?',
        opts: ['"You do not understand our operations."', '"We acknowledge your observation; allow us to present the validated statistical gage R&R data that demonstrates process compliance."', '"Cancel the audit immediately."', '"We refuse to accept your paper."'],
        ans: 1,
        exp: 'Diplomatic audit defense pairs professional acknowledgment with objective, verified statistical evidence.',
        socraticHint: 'En una auditoría internacional, ¿cuál es la respuesta más diplomática, profesional y respaldada por evidencia empírica?',
        category: 'Pragmática Estadounidense'
      },
      {
        q: 'What metric evaluates the measurement system variance between different operators and repeated trials on the same parts?',
        opts: ['Gage Repeatability and Reproducibility (Gage R&R)', 'Gross Factory Profit', 'Operator Heart Rate', 'Lunch Break Duration'],
        ans: 0,
        exp: 'Gage R&R evaluates whether the metrology system itself introduces unacceptable variability into process metrics.',
        socraticHint: '¿Qué estudio de metrología estadística determina el porcentaje de variación debido al instrumento y al operador?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "The plant is certified according to international standards." ¿Qué significa "certified"?',
        opts: ['Que alguien está loco o demente', 'Certificado oficialmente mediante auditoría y acreditación formal', 'Sospechoso de fraude', 'Registrado en el registro civil'],
        ans: 1,
        exp: '"Certified" en gestión de calidad significa que la planta posee un certificado formal de cumplimiento de normas (ISO/IATF).',
        socraticHint: 'Revisa el término: en el entorno industrial, ¿qué avala una planta "certified"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Compliance"?',
        opts: ['com-PLI-ance (accent on PLI)', 'COM-pli-ance', 'com-pli-ANCE', 'Equal flat pitch across all syllables'],
        ans: 0,
        exp: 'In American English, "compliance" is stressed on the second syllable: /kəmˈplaɪəns/.',
        socraticHint: '¿El sustantivo "compliance" (cumplimiento normativo) lleva su acento de intensidad en la primera o segunda sílaba?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'The quality committee insisted that the supplier _____ its corrective action plan within 48 hours.',
        opts: ['revise', 'revises', 'revised', 'will revise'],
        ans: 0,
        exp: 'Subjunctive mood after "insisted that [subject] + base form": "revise".',
        socraticHint: 'Aplica el subjuntivo mandatorio en inglés tras "insisted that": ¿el verbo lleva "-s" de tercera persona o queda en forma base?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What type of audit finding represents an opportunity for enhancement but does not violate a mandatory clause?',
        opts: ['Opportunity for Improvement (OFI)', 'Critical Safety Violation', 'Major Non-Conformance', 'Immediate Plant Evacuation'],
        ans: 0,
        exp: 'An OFI (Opportunity for Improvement) is an advisory observation that helps optimize processes without counting as a failure.',
        socraticHint: '¿Cómo se le denomina en auditorías ISO a una observación constructiva que no constituye una no-conformidad formal?',
        category: 'Léxico Técnico'
      }
    ]
  },

  // ── B2.3: Advanced Incident Investigation & Risk Assessment ──
  'b2-u3': {
    readingQuestions: [
      {
        q: 'In industrial risk management under ISO 31000 and FMEA standards, how is the Risk Priority Number (RPN) calculated?',
        options: ['RPN = Severity x Occurrence x Detection', 'RPN = Voltage x Current x Resistance', 'RPN = Temperature + Pressure', 'RPN = Total scrap parts divided by shift hours'],
        correct: 0,
        answer: 0,
        exp: 'RPN is the quantitative product of Severity rating (S), Occurrence probability (O), and Detection capability (D).'
      },
      {
        q: 'What was the immediate physical triggering event that precipitated the robotic cell collision during shift 3?',
        options: ['An intentional sabotage by a technician', 'A micro-fracture in the optical fiber communication cable between the PLC and the robotic drive controller', 'A lightning bolt striking the factory roof', 'A programming error created in 1995'],
        correct: 1,
        answer: 1,
        exp: 'The forensic analysis identified optical attenuation caused by dynamic mechanical fatigue in the flex cable track.'
      },
      {
        q: 'What preventative safeguard was retrofitted to eliminate high-severity pinch points in the loading vestibule?',
        options: ['Painting warning signs on the floor with yellow tape', 'Installing category 4 safety light curtains paired with redundant dual-channel safety relays', 'Removing the robotic arm entirely', 'Telling operators to be very careful'],
        correct: 1,
        answer: 1,
        exp: 'ISO 13849-1 mandates Category 4 redundant safety architectures for high-severity mechanical entrapment zones.'
      }
    ],
    unitQuiz: [
      {
        q: 'The electrical surge _____ the primary relay, because the backup circuit breaker tripped immediately.',
        opts: ['must have damaged', 'should damage', 'can damage', 'would damaged'],
        ans: 0,
        exp: 'Use modal of deduction in the past: "must have + past participle" to express logical certainty about past events.',
        socraticHint: 'Se tiene evidencia concluyente de lo ocurrido en el pasado. ¿Qué estructura modal deduce certeza lógica en retrospectiva?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The operator _____ bypassed the safety interlock, because the electronic event log shows the door switch was closed.',
        opts: ['could not have', 'must have', 'should have', 'might have'],
        ans: 0,
        exp: 'Use "could not have + past participle" to express that something was physically impossible based on empirical evidence.',
        socraticHint: 'Los registros electrónicos demuestran que era imposible que ocurriera. ¿Qué modal deduce imposibilidad en el pasado?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'The maintenance team _____ replaced the flex cable during the scheduled 500-hour overhaul, but they overlooked it.',
        opts: ['should have', 'must have', 'could not have', 'might not'],
        ans: 0,
        exp: 'Use "should have + past participle" to criticize past inaction or unfulfilled obligations.',
        socraticHint: 'Se expresa un deber no cumplido en el pasado que provocó una consecuencia negativa. ¿Qué modal corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What does "FMEA" stand for in reliability engineering and advanced risk analysis?',
        opts: ['Failure Mode and Effects Analysis', 'Fast Mechanical Electrical Assembly', 'Factory Maintenance Electronic Application', 'Functional Metrology Engineering Association'],
        ans: 0,
        exp: 'FMEA (Failure Mode and Effects Analysis) is the structured engineering discipline for proactive risk prevention.',
        socraticHint: '¿Cuál es el significado formal de la sigla internacional FMEA en ingeniería de confiabilidad y calidad?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "The fire caused severe damage to the facility." ¿Qué significa "severe"?',
        opts: ['Una persona muy estricta de carácter', 'Grave / Crítico / De alta magnitud o peligro', 'Seco y sin agua', 'Barato'],
        ans: 1,
        exp: 'En ingeniería y análisis de fallas, "severe" significa grave, crítico o catastrófico ("severe damage"). No alude a un profesor severo.',
        socraticHint: 'Revisa el falso amigo: en la clasificación de severidad de riesgos (Severity), ¿a qué se refiere "severe"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Mitigation"?',
        opts: ['mit-i-GA-tion (accent on GA)', 'MIT-i-ga-tion', 'mit-I-ga-tion', 'mit-i-ga-TION'],
        ans: 0,
        exp: 'In American English, words ending in "-tion" place primary stress on the preceding syllable: /ˌmɪtɪˈɡeɪʃən/.',
        socraticHint: 'Aplica la regla de acentuación para sustantivos terminados en "-tion". ¿Dónde recae la sílaba tónica?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'The forensic report concluded that hydraulic contamination _____ caused the proportional valve to stick.',
        opts: ['might have', 'ought to', 'is having', 'shall have'],
        ans: 0,
        exp: 'Use "might have + past participle" to express plausible past possibility when conclusive evidence is still pending.',
        socraticHint: 'Se plantea una posibilidad verosímil pero no 100% definitiva sobre la causa pasada. ¿Qué modal de deducción se usa?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What is the highest priority action when an FMEA analysis yields a Severity rating of 9 or 10?',
        opts: ['Immediate engineering redesign to eliminate the failure mode, regardless of RPN score', 'Ignore it if Occurrence is low', 'Wait until a customer files a lawsuit', 'Offer discounts on the product'],
        ans: 0,
        exp: 'Severity 9 or 10 denotes safety hazard or non-compliance; design action is mandatory regardless of RPN.',
        socraticHint: 'Bajo los estándares de AIAG/VDA, cuando la severidad es 9 o 10 (riesgo a la vida), ¿qué acción es obligatoria?',
        category: 'Seguridad y Protocolo'
      }
    ]
  },

  // ── B2.4: Executive Capstone Defense & Technical Pitching ──
  'b2-u4': {
    readingQuestions: [
      {
        q: 'In an executive engineering capstone defense, what is the critical balance required when presenting to the Chief Technology Officer (CTO)?',
        options: ['Presenting only lines of code without explaining business value', 'Translating complex engineering architecture and technical trade-offs into measurable Return on Investment (ROI) and operational efficiency gains', 'Speaking in high-level marketing buzzwords without technical data', 'Reading directly from a teleprompter'],
        correct: 1,
        answer: 1,
        exp: 'Executive engineering presentations bridge technical rigor (specifications, algorithms) with strategic ROI and capital justification.'
      },
      {
        q: 'How does an engineering team defend a 12% capital expenditure (CapEx) variance during executive cross-examination?',
        options: ['By apologizing and offering to cancel the project', 'By presenting data-driven payback amortization models showing that the investment pays for itself within 14 months through scrap reduction', 'By blaming the supplier', 'By pretending the variance does not exist'],
        correct: 1,
        answer: 1,
        exp: 'Defending CapEx investments requires demonstrating net present value (NPV) and rapid payback amortization based on scrap reduction.'
      },
      {
        q: 'What rhetorical discourse strategy should an engineer adopt when responding to hostile or probing questions from executive board members?',
        options: ['Defensive emotional pushback and arguing', 'The Socratic concession-and-pivot framework: acknowledge the validity of the concern, clarify the underlying constraint, and present verified empirical benchmark data', 'Ignoring the board member completely', 'Resigning on the spot'],
        correct: 1,
        answer: 1,
        exp: 'The concession-and-pivot framework demonstrates executive maturity, intellectual honesty, and composure under pressure.'
      }
    ],
    unitQuiz: [
      {
        q: 'Which discourse marker best introduces an empirical counter-argument in an executive technical pitch?',
        opts: ['"Whereas previous implementations encountered latency bottlenecks, our distributed architecture maintains sub-millisecond throughput."', '"You are wrong about the throughput."', '"Our code is fast because we say so."', '"Nobody cares about latency anyway."'],
        ans: 0,
        exp: 'Using "Whereas..." establishes high-level comparative contrast between baseline limitations and empirical engineering breakthroughs.',
        socraticHint: '¿Cuál conector retórico formal establece un contraste empírico sofisticado en una defensa ejecutiva?',
        category: 'Pragmática Estadounidense'
      },
      {
        q: 'Not only _____ the automation cell achieve a 99.4% first-pass yield, but it also reduced labor costs by 35%.',
        opts: ['did', 'does', 'has', 'was'],
        ans: 0,
        exp: 'Negative adverbial inversion: "Not only did [subject] + base verb... but it also...".',
        socraticHint: 'Esta estructura utiliza inversión estilística enfática ("Not only..."). ¿Qué auxiliar se coloca antes del sujeto en pasado?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'Under no circumstances _____ safety-critical firmware be flashed without secondary cryptographic verification.',
        opts: ['should', 'ought', 'must to', 'will to'],
        ans: 0,
        exp: 'Inversion after restrictive prepositional phrases: "Under no circumstances should [subject] be...".',
        socraticHint: 'La frase restrictiva inicial "Under no circumstances" exige inversión auxiliar-sujeto. ¿Cuál modal encaja?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What financial metric calculates the length of time required to recover the cost of an automation investment through cost savings?',
        opts: ['Payback Period (Amortization Horizon)', 'Net Gross Weight', 'Daily Scrap Ratio', 'Operating Temperature Range'],
        ans: 0,
        exp: 'The Payback Period (Periodo de Retorno de Inversión) determines when capital expenditure breaks even through operational savings.',
        socraticHint: '¿Qué métrica económico-financiera calcula los meses o años necesarios para recuperar la inversión de capital (CapEx)?',
        category: 'Léxico Técnico'
      },
      {
        q: 'Cuidado con el falso amigo: "We must defend our technical premises before the executive board." ¿Qué son "premises"?',
        opts: ['Premisas lógicas y fundamentos teóricos / o las instalaciones físicas del edificio', 'Premios de la academia de ciencias', 'Promesas que no se pueden cumplir', 'Préstamos bancarios'],
        ans: 0,
        exp: '"Premises" puede referirse a premisas de razonamiento o a las instalaciones físicas de una empresa. No significa "premios".',
        socraticHint: 'Revisa el falso amigo: en argumentación científica y lógica técnica, ¿qué significa "technical premises"?',
        category: 'Trampa de Falso Amigo'
      },
      {
        q: 'Where does the primary stress fall when pronouncing "Architecture"?',
        opts: ['AR-chi-tec-ture (accent on AR)', 'ar-CHI-tec-ture', 'ar-chi-TEC-ture', 'ar-chi-tec-TURE'],
        ans: 0,
        exp: 'In American English, "architecture" has its primary stress on the first syllable: /ˈɑːrkətɛktʃər/.',
        socraticHint: '¿El sustantivo "architecture" se acentúa en la primera sílaba "AR" o en el centro?',
        category: 'Fonética y Acentuación'
      },
      {
        q: 'Seldom _____ an engineering capstone demonstrated such a thorough integration of ISO compliance and edge computing.',
        opts: ['has', 'have', 'did have', 'having'],
        ans: 0,
        exp: 'Inversion with negative frequency adverb "Seldom has [subject singular] demonstrated...".',
        socraticHint: 'La oración inicia con el adverbio restrictivo "Seldom" y el sujeto es singular ("capstone"). ¿Qué auxiliar corresponde?',
        category: 'Gramática y Sintaxis'
      },
      {
        q: 'What is the primary objective of the Socratic defense portion of an engineering master’s capstone?',
        opts: ['To test whether the engineer can defend architectural choices under cross-examination and demonstrate deep systemic understanding', 'To memorize slides and recite them mechanically', 'To see who speaks the loudest', 'To avoid answering difficult technical questions'],
        ans: 0,
        exp: 'The Socratic defense evaluates critical thinking, handling trade-offs, and intellectual resilience under rigorous questioning.',
        socraticHint: '¿Cuál es el valor académico y profesional de la ronda de preguntas socráticas en una defensa de grado de ingeniería?',
        category: 'Léxico Técnico'
      }
    ]
  }
};

module.exports = { MCER_QUESTIONS_BANK };
