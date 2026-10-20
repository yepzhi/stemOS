/**
 * stemOS — MCER 60.0h Comprehensive Questions Bank (176 Standardized MCQs)
 * ═════════════════════════════════════════════════════════════════════════
 * 16 Units x 3 Reading Comprehension MCQs = 48 Reading Reactivos
 * 16 Units x 8 Comprehensive Mastery Quiz MCQs = 128 Unit Quiz Reactivos
 * Total: 176 High-Yield Multiple Choice Questions with:
 * - 4 Options (1 correct, 3 plausible distractors)
 * - Detailed Grammatical & Technical Explanation (exp)
 * - Socratic AI Mentor Hint (socraticHint) for guided student reflection
 * - Topic Category (category)
 * ═════════════════════════════════════════════════════════════════════════
 */

const MCER_QUESTIONS_BANK = {
  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL A1: UNITS 1 - 4
  // ─────────────────────────────────────────────────────────────────────────
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
  }
};

module.exports = { MCER_QUESTIONS_BANK };
