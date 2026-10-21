/**
 * stemOS — MCER Interactive Exercises Bank (All 16 Units • 208 Additional Standardized MCQs)
 * ════════════════════════════════════════════════════════════════════════════════════════════
 * Injects for every single one of the 16 MCER Units:
 * 1. listeningLab: Spoken industrial dispatch scenario + 3 Listening Comprehension MCQs (48 items)
 * 2. grammarDrills: 5 Targeted Grammar & Syntax Drills with Socratic hints (80 items)
 * 3. vocabularyExercises: 4 Technical Workplace Lexicon & Collocation MCQs (64 items)
 * 4. fourthReadingQuestion: 1 Additional high-level analytical reading question (16 items)
 * ════════════════════════════════════════════════════════════════════════════════════════════
 */

const MCER_INTERACTIVE_EXERCISES = {
  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL A1: FOUNDATIONS & WORKPLACE LITERACY (60.0h)
  // ─────────────────────────────────────────────────────────────────────────────

  // ── A1.1: Personal & Professional Introductions ──
  'a1-u1': {
    listeningLab: {
      title: 'Plant Security Gate & Badging Dispatch',
      speaker: 'Officer Davis (Main Security Desk)',
      audioScenario: 'Good morning. All incoming engineering interns must step to Window 2. Please state your full legal name, spelling your last name clearly, and provide your university affiliate identification number. Remember that visitor badges are temporary and expire daily at seventeen hundred hours.',
      questions: [
        {
          q: 'Where must incoming engineering interns report according to Officer Davis?',
          opts: ['To Window 2', 'To the main cafeteria', 'To Line 3 assembly station', 'To the loading dock'],
          ans: 0,
          exp: 'Officer Davis explicitly directs interns: "All incoming engineering interns must step to Window 2."',
          socraticHint: 'Escucha con atención la primera directiva del oficial: ¿a qué ventanilla les pide acercarse?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What information must the interns state and spell out clearly?',
          opts: ['Their email password', 'Their full legal name, spelling their last name', 'Their locker combination', 'Their home address'],
          ans: 1,
          exp: 'The officer instructs: "Please state your full legal name, spelling your last name clearly."',
          socraticHint: '¿Qué dato personal y de deletreo solicita el guardia antes de imprimir la credencial?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'At what time do temporary visitor badges expire?',
          opts: ['At 12:00 PM', 'At 15:30 PM', 'At 17:00 hours (5:00 PM)', 'They do not expire'],
          ans: 2,
          exp: '"Visitor badges are temporary and expire daily at seventeen hundred hours (17:00 hrs).',
          socraticHint: 'En formato militar o de 24 horas, ¿qué hora corresponde a "seventeen hundred hours"?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'Good morning. I _____ Carlos Gomez and I _____ the new robotics technician.',
        opts: ['am / am', 'is / are', 'are / is', 'be / be'],
        ans: 0,
        exp: 'The first person singular pronoun "I" always takes the verb "am" in present simple.',
        socraticHint: 'El pronombre sujeto es "I" (primera persona singular). ¿Cuál es la única conjugación correcta de "to be"?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'This is Diana. _____ employee ID badge is registered for the cleanroom.',
        opts: ['Her', 'His', 'She', 'Hers'],
        ans: 0,
        exp: '"Diana" is female; the corresponding possessive adjective before the noun "employee ID badge" is "Her".',
        socraticHint: 'Diana es femenino singular y necesitas un adjetivo posesivo antes de "employee ID badge".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: '_____ are the calibration tools stored on the first floor?',
        opts: ['Where', 'Who', 'When', 'What'],
        ans: 0,
        exp: '"Where" asks about spatial location or storage position.',
        socraticHint: 'La pregunta se refiere a un lugar o ubicación física ("stored on the first floor"). ¿Qué interrogativo usas?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Mark and Steve are shift supervisors. _____ office is located next to assembly line 1.',
        opts: ['Their', 'There', 'They', 'Theirs'],
        ans: 0,
        exp: 'Use the possessive adjective "Their" to indicate possession for third person plural (Mark and Steve).',
        socraticHint: 'Se trata de la oficina perteneciente a Mark y Steve (ellos). ¿Cuál es el adjetivo posesivo plural?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Which sentence correctly uses the verb "to be" in an interrogative form?',
        opts: ['Is your workstation ready for operation?', 'Your workstation is ready for operation?', 'Are your workstation ready?', 'Be your workstation ready?'],
        ans: 0,
        exp: 'Inversion of "to be" + subject: "Is [third person singular] your workstation ready...?"',
        socraticHint: 'Para formular una pregunta con "to be", ¿el verbo auxiliar se coloca antes o después del sujeto singular "your workstation"?',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'All personnel must tap their _____ at the turnstile gate to log arrival time.',
        opts: ['Employee ID Badge', 'Screwdriver', 'Safety Eyewear', 'Lunch Tray'],
        ans: 0,
        exp: 'An employee identification badge is scanned at facility turnstiles for electronic time attendance.',
        socraticHint: '¿Qué credencial electrónica se pasa por el lector del torniquete para registrar tu asistencia?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A person who works alongside you in the same engineering department is your _____.',
        opts: ['coworker', 'supplier', 'competitor', 'landlord'],
        ans: 0,
        exp: '"Coworker" (or colleague) denotes a peer working within the same organization.',
        socraticHint: '¿Cuál es el término en inglés para designar a un colega o compañero de trabajo en la misma planta?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The industrial area designated for a specific technician to assemble parts is a _____.',
        opts: ['workstation', 'turnstile', 'auditorium', 'corridor'],
        ans: 0,
        exp: 'A "workstation" is the designated physical setup where an operator or engineer carries out their shift tasks.',
        socraticHint: '¿Cómo se llama el puesto o estación asignada donde realizas tus tareas de ensamble?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct prepositional collocation: "Please report _____ your team lead before the morning briefing."',
        opts: ['to', 'at', 'on', 'with'],
        ans: 0,
        exp: 'The standard technical English verb phrase is "report to [supervisor/lead]".',
        socraticHint: '¿Qué preposición acompaña al verbo "report" cuando te presentas ante un superior jerárquico?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'What is the primary security consequence if an intern brings an unapproved personal smartphone onto the active factory floor?',
      opts: ['It violates the cleanroom and safety policy prohibiting uninspected mobile devices near operating machinery', 'They receive a promotion to line manager', 'The phone battery charges automatically', 'It is required for recording TikTok videos'],
      correct: 0,
      answer: 0,
      exp: 'The safety notice explicitly mandates that personal cell phones remain inside lockers during active machine operations to prevent distractions and safety hazards.'
    }
  },

  // ── A1.2: Workplace Routines, Time & Schedules ──
  'a1-u2': {
    listeningLab: {
      title: 'Shift Handover Voice Note: Cycle Counts',
      speaker: 'Supervisor Morales (Shift 1 Lead)',
      audioScenario: 'Attention team. First shift concluded with four hundred and twenty inspected power supplies. Sub-assembly line four requires preventative belt lubrication at fifteen thirty. The second shift technician must log the maintenance entry before seventeen hundred hours.',
      questions: [
        {
          q: 'How many inspected power supplies did the first shift produce?',
          opts: ['420 units', '150 units', '300 units', '520 units'],
          ans: 0,
          exp: 'The supervisor states: "First shift concluded with four hundred and twenty (420) inspected power supplies."',
          socraticHint: 'Identifica el conteo de producción mencionado: "four hundred and twenty".',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What maintenance activity is scheduled for Line 4 at 15:30?',
          opts: ['Preventative belt lubrication', 'Full motor replacement', 'Floor painting', 'Software uninstallation'],
          ans: 0,
          exp: 'The audio explicitly notes: "Sub-assembly line four requires preventative belt lubrication at fifteen thirty."',
          socraticHint: '¿Qué acción de mantenimiento preventivo se realizará a las 15:30 en la banda transportadora?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'By what time must the second shift technician log the maintenance entry?',
          opts: ['Before 17:00 hours', 'Before 12:00 PM', 'Tomorrow morning', 'At midnight'],
          ans: 0,
          exp: '"The second shift technician must log the maintenance entry before seventeen hundred hours (17:00 hrs)."',
          socraticHint: '¿Cuál es la hora límite para registrar la bitácora técnica?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'The maintenance team _____ the conveyor belts every Tuesday morning.',
        opts: ['inspects', 'inspect', 'inspecting', 'is inspect'],
        ans: 0,
        exp: '"The maintenance team" is treated as a collective third-person singular entity in American English, taking "inspects".',
        socraticHint: 'El sujeto es singular ("The maintenance team") y expresa una rutina semanal. ¿Lleva terminación en -s?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Technicians _____ use uncalibrated digital multimeters during final QA validation.',
        opts: ['never', 'always not', 'ever', 'not never'],
        ans: 0,
        exp: 'The frequency adverb "never" precedes the main verb "use" to denote complete prohibition or zero occurrence.',
        socraticHint: '¿Qué adverbio de frecuencia se usa antes del verbo para expresar "nunca" en una rutina de calidad?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Shift change occurs _____ 07:00 AM and our briefing starts _____ Monday.',
        opts: ['at / on', 'in / at', 'on / in', 'at / in'],
        ans: 0,
        exp: 'Use preposition "at" for precise clock times and "on" for days of the week.',
        socraticHint: 'Recuerda las preposiciones temporales: ¿qué preposición va con las horas en punto (07:00 AM) y cuál con los días (Monday)?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Does your production station _____ high-pressure pneumatic tools?',
        opts: ['require', 'requires', 'requiring', 'to require'],
        ans: 0,
        exp: 'After the auxiliary "Does", the main verb returns to its base/infinitive form without -s: "require".',
        socraticHint: 'En una pregunta en presente simple con el auxiliar "Does", ¿el verbo principal conserva la -s o queda en forma base?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'We _____ update the digital ERP log before departing the production cell.',
        opts: ['always', 'yesterday', 'rare', 'never did'],
        ans: 0,
        exp: '"Always" is an adverb of frequency correctly placed between the subject "We" and the verb "update".',
        socraticHint: '¿Qué adverbio de frecuencia describe una práctica que se hace el 100% de las veces antes de salir de turno?',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'The transfer of shift responsibility and machinery logs to the incoming crew is called a _____.',
        opts: ['handover (or turnover)', 'layoff', 'takeoff', 'breakout'],
        ans: 0,
        exp: '"Shift handover" is the standardized term for delivering station status to the next operator.',
        socraticHint: '¿Cómo se le llama en inglés industrial al cambio de turno o entrega de guardia?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The official digital or paper system where operational readings are noted is the _____.',
        opts: ['shift log', 'lunch ticket', 'visitor badge', 'floor mop'],
        ans: 0,
        exp: 'A "shift log" (bitácora de turno) records machine output, downtime, and operational notes.',
        socraticHint: '¿Qué documento o sistema digital almacena los registros de operación de un turno?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Routine tasks performed to preserve machine functionality before failures occur are _____.',
        opts: ['preventative maintenance', 'reactive scrap', 'emergency evacuation', 'manual disassembly'],
        ans: 0,
        exp: '"Preventative maintenance" (PM) prevents unexpected machine downtime.',
        socraticHint: '¿Cómo se denomina el mantenimiento planeado que se ejecuta antes de que ocurra una falla?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct technical collocation: "Our line operates _____ a three-shift schedule around the clock."',
        opts: ['on', 'over', 'by', 'through'],
        ans: 0,
        exp: 'The correct prepositional idiom is "to operate on a schedule".',
        socraticHint: '¿Qué preposición se asocia con "operate ... a schedule"?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'According to industrial 5S shift standards, why must scrap bins be emptied and audited before 15:00 hours?',
      opts: ['To ensure raw material reconciliation and maintain clear aisle pathways for the oncoming crew', 'To throw away good components without inspection', 'Because the cafeteria closes at 15:00', 'To hide defects from the quality department'],
      correct: 0,
      answer: 0,
      exp: 'Emptying scrap bins and reconciling counts ensures traceability and maintains clean, compliant work cells under 5S visual factory guidelines.'
    }
  },

  // ── A1.3: Workstation Navigation, Tools & Supplies ──
  'a1-u3': {
    listeningLab: {
      title: 'Tool Crib Technician Radio Request',
      speaker: 'Frank (Tool Crib Dispatcher)',
      audioScenario: 'Frank to Cell 5. I have the digital torque wrenches and two sets of vernier calipers ready at the South tool crib counter. Please present your signed calibration request slip and confirm serial numbers before moving equipment past the yellow demarcation line.',
      questions: [
        {
          q: 'Which tools are ready for pickup at the South tool crib counter?',
          opts: ['Digital torque wrenches and vernier calipers', 'Safety boots and earplugs', 'Oscilloscopes and soldering irons', 'Hydraulic fluid drums'],
          ans: 0,
          exp: 'Frank specifically mentions: "digital torque wrenches and two sets of vernier calipers".',
          socraticHint: '¿Qué dos instrumentos de metrología y apriete están listos en el mostrador del tool crib?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What document must the technician present before collecting the tools?',
          opts: ['A signed calibration request slip', 'A university transcript', 'A driver license', 'A cashier receipt'],
          ans: 0,
          exp: 'Frank instructs: "Please present your signed calibration request slip."',
          socraticHint: '¿Qué formato firmado de solicitud de calibración pide presentar Frank?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'Where is the designated tool crib counter located?',
          opts: ['South tool crib counter', 'North cafeteria', 'West chemical warehouse', 'East parking bay'],
          ans: 0,
          exp: 'The radio dispatch says: "at the South tool crib counter."',
          socraticHint: '¿Cuál es la orientación cardinal del tool crib mencionado (North, South, East, West)?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: '_____ is a digital micrometer on the workbench, and _____ are replacement Allen keys in the bin.',
        opts: ['There is / there are', 'There are / there is', 'It is / they is', 'There be / there are'],
        ans: 0,
        exp: 'Use "There is" for singular nouns ("a digital micrometer") and "There are" for plural nouns ("replacement Allen keys").',
        socraticHint: 'El primer elemento es singular ("a digital micrometer") y el segundo es plural ("Allen keys").',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Please place the torque wrench _____ the charging dock and the ESD mat.',
        opts: ['between', 'among', 'through', 'underneath of'],
        ans: 0,
        exp: '"Between" is used for spatial position situated in the middle of two distinct objects.',
        socraticHint: 'Cuando un objeto se ubica en medio de dos puntos de referencia específicos, ¿qué preposición se usa?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Look at _____ CNC milling machine over there across Corridor C.',
        opts: ['that', 'this', 'these', 'those'],
        ans: 0,
        exp: '"That" is the singular demonstrative for an object located at a distance from the speaker ("over there").',
        socraticHint: 'La máquina es singular y se encuentra lejos del hablante ("over there across Corridor C").',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Store _____ precision calipers inside their velvet-lined protective cases.',
        opts: ['these', 'this', 'that', 'an'],
        ans: 0,
        exp: '"Calipers" is grammatically plural in English; use the plural demonstrative "these".',
        socraticHint: 'La palabra "calipers" es plural en inglés. ¿Qué demostrativo plural de proximidad le corresponde?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Where are the master Lockout/Tagout padlocks? — They are located _____ Shelf 4.',
        opts: ['on', 'at', 'in to', 'between of'],
        ans: 0,
        exp: 'Items rest "on" a shelf or surface.',
        socraticHint: 'Los objetos colocados sobre la superficie de un estante o repisa llevan la preposición "on".',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'A high-precision instrument used to measure internal and external dimensions with sliding jaws is a _____.',
        opts: ['caliper', 'hammer', 'sledge', 'crowbar'],
        ans: 0,
        exp: 'A vernier or digital caliper measures thickness and diameter with high accuracy.',
        socraticHint: '¿Qué instrumento de metrología con mordazas deslizantes se usa para medir espesores y diámetros?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The secure storage room where specialized tools, dies, and measuring devices are checked out is the _____.',
        opts: ['tool crib', 'auditorium', 'kitchenette', 'locker room'],
        ans: 0,
        exp: 'The "tool crib" is the centralized industrial inventory room for tooling checkout.',
        socraticHint: '¿Cómo se llama en inglés el almacén o cuarto de herramientas de una nave industrial?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Safety equipment designed to flush chemicals out of an operator\'s face immediately after contact is the _____.',
        opts: ['eyewash station', 'coffee machine', 'water fountain', 'air conditioner'],
        ans: 0,
        exp: 'An emergency "eyewash station" is mandatory near chemical handling zones under OSHA rules.',
        socraticHint: '¿Qué equipo de seguridad para ojos se utiliza ante una salpicadura de químicos?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The acronym LOTO stands for _____.',
        opts: ['Lockout / Tagout', 'Line Output / Team Order', 'Local Operational Tool Office', 'Low Oxidation Thermal Output'],
        ans: 0,
        exp: 'LOTO (Lockout/Tagout) is the OSHA standard for de-energizing machinery during service.',
        socraticHint: '¿Qué significa el acrónimo de seguridad industrial LOTO en el protocolo de bloqueo de energía?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'Why are precision measurement instruments like micrometers prohibited from resting directly on vibrating conveyor frames?',
      opts: ['Mechanical vibration causes drift in zero-point calibration and can distort delicate carbide measuring faces', 'They look less shiny on metal frames', 'Conveyors only carry food items', 'The tool crib dispatcher prefers keeping them in personal pockets'],
      correct: 0,
      answer: 0,
      exp: 'Precision metrology tools must be placed on anti-vibration ESD surfaces to prevent shock-induced calibration drift.'
    }
  },

  // ── A1.4: Simple Directives, Safety Signs & Protocols ──
  'a1-u4': {
    listeningLab: {
      title: 'Facility Evacuation & Intercom Directives',
      speaker: 'EHS Manager Chen (Emergency PA System)',
      audioScenario: 'May I have your attention please. An audible sensor alert was triggered in Chemical Storage Bay B. All personnel must stop machine operations immediately. Do not use the elevators. Walk calmly along the green evacuation route toward Assembly Point Four outside Gate Three.',
      questions: [
        {
          q: 'Where was the sensor alert triggered?',
          opts: ['In Chemical Storage Bay B', 'In the administrative offices', 'In the main parking lot', 'In the employee gym'],
          ans: 0,
          exp: 'EHS Manager Chen announces: "An audible sensor alert was triggered in Chemical Storage Bay B."',
          socraticHint: '¿En qué área de la planta se disparó la alarma del sensor?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What is the immediate directive regarding machine operations?',
          opts: ['Stop machine operations immediately', 'Increase production speed', 'Ignore the alarm for ten minutes', 'Disassemble the electrical motors'],
          ans: 0,
          exp: 'The announcement orders: "All personnel must stop machine operations immediately."',
          socraticHint: '¿Qué acción inmediata deben tomar los operadores con la maquinaria en funcionamiento?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'Which evacuation destination must personnel proceed toward?',
          opts: ['Assembly Point Four outside Gate Three', 'The roof of Building A', 'The basement cafeteria', 'Their personal vehicles'],
          ans: 0,
          exp: '"Walk calmly along the green evacuation route toward Assembly Point Four outside Gate Three."',
          socraticHint: '¿Hacia qué punto de reunión exterior (Assembly Point) se debe caminar?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: '_____ the red emergency stop push-button in the event of an automated cell jam.',
        opts: ['Press', 'Pressing', 'To press', 'You are press'],
        ans: 0,
        exp: 'Imperatives in English use the base form of the verb without subject pronoun: "Press the button."',
        socraticHint: 'Para dar una instrucción u orden técnica directa en imperativo, ¿cómo debe iniciar la oración?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: '_____ touch the exposed high-voltage wiring under any operational circumstances.',
        opts: ['Do not', 'No', 'Not to', 'Never to'],
        ans: 0,
        exp: 'Negative imperatives use "Do not" (or "Don\'t") + base form of the verb: "Do not touch".',
        socraticHint: 'Para una prohibición imperativa negativa formal en señalética industrial, ¿qué auxiliar negativo se antepone?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'All visitors _____ wear steel-toed safety boots past this demarcation threshold.',
        opts: ['must', 'might to', 'can should', 'must to'],
        ans: 0,
        exp: 'The modal "must" expresses mandatory safety regulation and is followed directly by a base verb without "to".',
        socraticHint: '¿Qué verbo modal expresa obligación regulatoria estricta y se combina con verbo base sin "to"?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'First, isolate the power source; _____, attach your personal safety padlock to the clasp.',
        opts: ['next', 'at first', 'finally of', 'lastly before'],
        ans: 0,
        exp: '"Next" or "then" is the standard sequential linker following "First" in standard operating procedures.',
        socraticHint: 'En una secuencia de pasos ("First, ..."), ¿qué conector de proceso continúa la instrucción?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: '_____ your safety glasses clean and inspect them for surface scratches daily.',
        opts: ['Keep', 'Keeping', 'To keep', 'You keeped'],
        ans: 0,
        exp: 'Standard imperative directive using base verb: "Keep your safety glasses clean".',
        socraticHint: 'Instrucción imperativa afirmativa de mantenimiento preventivo: usa la forma base del verbo.',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'The prominent mushroom-shaped red switch designed to halt equipment instantly during emergencies is the _____.',
        opts: ['E-Stop (Emergency Stop) button', 'Toggle light switch', 'Volume knob', 'Thermostat dial'],
        ans: 0,
        exp: 'The E-Stop (Emergency Stop) is standard safety equipment on all industrial machines.',
        socraticHint: '¿Cómo se le llama comúnmente al botón rojo tipo hongo de paro de emergencia en una máquina?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Protective gear worn to shield eyes, hearing, head, and feet in industrial plants is collectively termed _____.',
        opts: ['PPE (Personal Protective Equipment)', 'ERP', 'BOM', 'MES'],
        ans: 0,
        exp: 'PPE stands for Personal Protective Equipment (Equipo de Protección Personal).',
        socraticHint: '¿Qué acrónimo en inglés engloba lentes, tapones, casco y botas de seguridad?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A marked exterior outdoor location where all evacuated personnel gather during a fire drill is an _____.',
        opts: ['assembly point', 'inspection booth', 'electrical substation', 'airlock'],
        ans: 0,
        exp: 'An "assembly point" (punto de reunión) is the designated outdoor muster area during emergencies.',
        socraticHint: '¿Cómo se denomina en inglés el punto de reunión exterior en caso de evacuación de planta?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct safety phrase: "Keep aisles _____ of tripping hazards at all times."',
        opts: ['clear', 'cluttered', 'packed', 'jammed'],
        ans: 0,
        exp: 'The standard OSHA safety slogan is "keep aisles clear of hazards".',
        socraticHint: '¿Qué adjetivo significa "despejado" o libre de obstáculos en pasillos peatonales?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'Under OSHA Lockout/Tagout regulations, who is authorized to remove a personal safety padlock from an electrical breaker panel?',
      opts: ['Only the designated technician who originally placed the lock, after verifying the area is clear', 'Any passing worker with a crowbar', 'The cafeteria cook', 'The security guard on night patrol'],
      correct: 0,
      answer: 0,
      exp: 'OSHA 1910.147 strictly states that each lockout device shall be removed only by the authorized employee who applied it.'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL A2: WAYSTAGE & WORKPLACE OPERATIONS (60.0h)
  // ─────────────────────────────────────────────────────────────────────────────

  // ── A2.1: Past Actions & Shift Incident Logs ──
  'a2-u1': {
    listeningLab: {
      title: 'Shift Incident Log Audio Report',
      speaker: 'Lead Technician Ramos (Cell 2)',
      audioScenario: 'This is technician Ramos logging past shift actions. At 14:15 yesterday, conveyor belt three stalled because an aluminum bracket jammed the feeder gear. We de-energized the motor, replaced the sheared shear pin, and restarted operations at 15:00. The line ran smoothly for the remainder of the afternoon.',
      questions: [
        {
          q: 'Why did conveyor belt three stall yesterday at 14:15?',
          opts: ['An aluminum bracket jammed the feeder gear', 'The power grid suffered a citywide blackout', 'The operator forgot to turn on the switch', 'A software bug erased the operating system'],
          ans: 0,
          exp: 'Ramos reports: "conveyor belt three stalled because an aluminum bracket jammed the feeder gear."',
          socraticHint: '¿Cuál fue la causa mecánica del atascamiento de la banda tres?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'Which component did the maintenance team replace before restarting the motor?',
          opts: ['The sheared shear pin', 'The main PLC computer', 'The pneumatic compressor', 'The emergency exit door'],
          ans: 0,
          exp: 'Ramos specifies: "We de-energized the motor, replaced the sheared shear pin, and restarted operations."',
          socraticHint: '¿Qué pieza mecánica de sacrificio reemplazó el equipo técnico?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'At what time did the line resume normal operations?',
          opts: ['At 15:00 hours', 'At 17:30 hours', 'At midnight', 'The following morning'],
          ans: 0,
          exp: 'The audio confirms: "...and restarted operations at fifteen hundred hours (15:00)."',
          socraticHint: '¿A qué hora se reanudó la operación?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'The quality inspector _____ all fifty hydraulic fittings yesterday afternoon.',
        opts: ['inspected', 'inspects', 'was inspect', 'inspecting'],
        ans: 0,
        exp: 'Simple past tense of regular verb "inspect" is formed by adding -ed: "inspected".',
        socraticHint: 'La oración tiene la expresión de tiempo pasado "yesterday afternoon". ¿Cuál es el pasado simple regular?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'We _____ the spindle motor when we detected the irregular high-frequency vibration.',
        opts: ['shut down', 'shutdowned', 'did shutted down', 'shuts down'],
        ans: 0,
        exp: 'The irregular verb "shut" has identical base and past forms: "shut down".',
        socraticHint: 'El verbo irregular "shut down" no cambia en pasado. No existe la forma terminada en "-ed".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The technicians _____ monitoring telemetry readings while the test bench was operating.',
        opts: ['were', 'was', 'did be', 'are'],
        ans: 0,
        exp: 'The subject "The technicians" is plural; past continuous requires auxiliary "were".',
        socraticHint: 'El sujeto es plural ("The technicians") en pasado continuo. ¿Qué forma de "to be" en pasado corresponde?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'How much downtime _____ the extrusion cell experience during third shift?',
        opts: ['did', 'was', 'does', 'had been'],
        ans: 0,
        exp: 'Past simple questions with main action verbs use the auxiliary "did": "did [subject] experience...?"',
        socraticHint: 'Para formular una pregunta en pasado simple con un verbo de acción ("experience"), ¿qué auxiliar utilizas?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Two hours ago, the maintenance crew _____ the primary coolant filter.',
        opts: ['replaced', 'replaces', 'is replacing', 'was replaced'],
        ans: 0,
        exp: '"Two hours ago" specifies completed past action requiring simple past "replaced".',
        socraticHint: 'La frase "Two hours ago" señala una acción concluida en el pasado. Elige el verbo en pasado simple activo.',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'Unplanned machine stoppage that halts line production is termed _____.',
        opts: ['downtime', 'overtime', 'lifetime', 'meantime'],
        ans: 0,
        exp: '"Downtime" (tiempo muerto o paro no programado) represents lost production time due to malfunctions.',
        socraticHint: '¿Cuál es el término industrial para el tiempo en que una máquina permanece detenida por falla?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A physical blockage preventing gears or robotic joints from moving freely is a _____.',
        opts: ['jam', 'toast', 'spread', 'slice'],
        ans: 0,
        exp: 'A mechanical "jam" occurs when foreign material obstructs kinetic movement.',
        socraticHint: '¿Cómo se le dice en inglés a un atascamiento o traba mecánica en un alimentador?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The sacrificial pin engineered to break under excessive torque to protect an expensive shaft is a _____.',
        opts: ['shear pin', 'hair pin', 'safety pin', 'bowling pin'],
        ans: 0,
        exp: 'A "shear pin" (perno de seguridad o perno fusible) shears off intentionally to prevent catastrophic drivetrain failure.',
        socraticHint: '¿Cómo se llama el perno diseñado para romperse por sobrecarga y proteger el motor?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct technical collocation: "The operators _____ an incident report immediately after the stoppage."',
        opts: ['filed', 'drank', 'shuffled', 'folded'],
        ans: 0,
        exp: 'In professional English, one "files a report" (levantar o radicar un reporte formal).',
        socraticHint: '¿Qué verbo en inglés se asocia formalmente con redactar o ingresar un reporte oficial?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'In an ISO 9001 post-incident root cause report, why is recording the exact timestamp of machine stoppage critical?',
      opts: ['It allows quality engineers to cross-reference sensor telemetry and isolate the suspect production batch', 'It is required so workers know when to take lunch', 'It makes the paper look longer', 'It resets the plant clocks automatically'],
      correct: 0,
      answer: 0,
      exp: 'Accurate stoppage timestamps allow traceability systems to identify all parts manufactured immediately before the failure occurred.'
    }
  },

  // ── A2.2: Comparing Equipment, Specs & Materials ──
  'a2-u2': {
    listeningLab: {
      title: 'Material Evaluation Technical Briefing',
      speaker: 'Materials Engineer Sarah Jenkins',
      audioScenario: 'Comparing our housing options: Aluminum 6061 is significantly lighter than 304 stainless steel, but stainless steel exhibits higher corrosion resistance in saltwater spray environments. For our aerospace brackets, titanium is the most durable alloy, though its machining cycle time is noticeably longer.',
      questions: [
        {
          q: 'Which material is lighter according to engineer Sarah Jenkins?',
          opts: ['Aluminum 6061 is lighter than 304 stainless steel', '304 stainless steel is lighter than aluminum', 'Titanium is lighter than everything', 'They have identical densities'],
          ans: 0,
          exp: 'Jenkins states: "Aluminum 6061 is significantly lighter than 304 stainless steel."',
          socraticHint: '¿Qué metal tiene menor peso según la comparativa directa?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What is the main operational advantage of 304 stainless steel over aluminum?',
          opts: ['Higher corrosion resistance in saltwater spray environments', 'It melts at room temperature', 'It is cheaper than plastic', 'It conducts electricity faster than pure copper'],
          ans: 0,
          exp: '"...stainless steel exhibits higher corrosion resistance in saltwater spray environments."',
          socraticHint: '¿Qué propiedad de resistencia química destaca en el acero inoxidable 304?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'Which alloy is described as "the most durable" for aerospace brackets?',
          opts: ['Titanium', 'Cast iron', 'Polycarbonate', 'Brass'],
          ans: 0,
          exp: 'Jenkins affirms: "titanium is the most durable alloy...".',
          socraticHint: '¿Qué aleación recibe el superlativo de máxima durabilidad en aplicaciones aeroespaciales?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'The brushless servo motor is _____ than the legacy stepper motor.',
        opts: ['faster and more efficient', 'more fast and efficienter', 'fastest and efficient', 'as fast than'],
        ans: 0,
        exp: 'One-syllable adjectives add -er ("faster"), while multi-syllable adjectives take "more" ("more efficient").',
        socraticHint: 'Revisa las reglas de comparativos: "fast" es de una sílaba y "efficient" de tres sílabas.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'This carbon-fiber chassis provides _____ tensile strength among all tested prototypes.',
        opts: ['the highest', 'higher than', 'as high as', 'most high'],
        ans: 0,
        exp: 'Superlatives comparing one item among a whole group use "the" + adjective + "-est": "the highest".',
        socraticHint: 'Se compara una pieza frente a todo el grupo evaluado ("among all tested prototypes"). ¿Qué superlativo corresponde?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The new CNC lathe is _____ accurate as the German grinding station.',
        opts: ['as', 'more', 'so', 'than'],
        ans: 0,
        exp: 'The comparative of equality uses the formula "as + adjective + as": "as accurate as".',
        socraticHint: 'Fórmula de igualdad: "as [adjetivo] as".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Titanium is considerably _____ expensive than standard mild carbon steel.',
        opts: ['more', 'much', 'most', 'as'],
        ans: 0,
        exp: 'Multi-syllable adjective "expensive" forms its comparative with "more": "more expensive than".',
        socraticHint: '¿Cómo se forma el comparativo de superioridad para adjetivos largos como "expensive"?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Which machine operates _____ on the assembly floor?',
        opts: ['the most quietly', 'more quieter', 'quieter than', 'most quietest'],
        ans: 0,
        exp: 'Superlative of the adverb "quietly" is "the most quietly".',
        socraticHint: 'Superlativo de un adverbio terminado en -ly: "the most quietly".',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'The maximum dimensional deviation allowed from a nominal engineering drawing value is the _____.',
        opts: ['tolerance', 'weight', 'texture', 'color'],
        ans: 0,
        exp: 'In engineering GD&T (Geometric Dimensioning and Tolerancing), "tolerance" is the allowable variation.',
        socraticHint: '¿Qué término define el margen de variación dimensional permisible respecto a la medida nominal de plano?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The property of a material to withstand mechanical pulling forces without fracturing is its _____.',
        opts: ['tensile strength', 'optical clarity', 'thermal conductivity', 'acoustic damping'],
        ans: 0,
        exp: '"Tensile strength" (resistencia a la tracción) measures resistance to breaking under tension.',
        socraticHint: '¿Cómo se llama la resistencia mecánica de un material al ser estirado o jalado en un ensayo universal?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A metallic substance composed of two or more combined elements is an _____.',
        opts: ['alloy', 'aggregate', 'isotope', 'insulator'],
        ans: 0,
        exp: 'An "alloy" (aleación) combines metals or elements (e.g. steel is iron and carbon).',
        socraticHint: '¿Qué término define una mezcla homogénea de dos o más metales (como bronce, latón o acero)?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct technical collocation: "The titanium bracket has a high strength-to-weight _____."',
        opts: ['ratio', 'fraction', 'division', 'percentage'],
        ans: 0,
        exp: 'The standard aerospace engineering metric is "strength-to-weight ratio" (relación resistencia-peso).',
        socraticHint: '¿Qué palabra acompaña a "strength-to-weight" para expresar la relación matemática en ingeniería aeroespacial?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'When an engineer specifies an engineering change from Aluminum 6061-T6 to Stainless Steel 316 for a marine subsea sensor, what trade-off is accepted?',
      opts: ['Gaining superior pitting corrosion resistance at the cost of significantly increased component mass', 'Reducing the product lifespan to save paper', 'Making the sensor dissolve in seawater', 'Eliminating the need for electrical batteries'],
      correct: 0,
      answer: 0,
      exp: 'Upgrading to 316 stainless steel provides molybdenum-enhanced chloride pitting resistance but adds density compared to lightweight aluminum.'
    }
  },

  // ── A2.3: Scheduling, Agendas & Future Deadlines ──
  'a2-u3': {
    listeningLab: {
      title: 'Project Milestone Conference Call',
      speaker: 'Program Manager Liam Wright',
      audioScenario: 'Liam speaking. I am confirming our delivery timeline. We are going to ship the forty pre-production prototype enclosures by Friday afternoon. The customer engineering team will review the dimensional CMM inspection report on Monday morning. Please ensure all shipping manifests are signed by Thursday at five.',
      questions: [
        {
          q: 'By what deadline is the team going to ship the pre-production prototype enclosures?',
          opts: ['By Friday afternoon', 'Next month', 'Immediately this morning', 'In two weeks'],
          ans: 0,
          exp: 'Liam states: "We are going to ship the forty pre-production prototype enclosures by Friday afternoon."',
          socraticHint: '¿Cuál es la fecha y momento de entrega acordada para los gabinetes prototipo?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'When will the customer engineering team review the CMM inspection report?',
          opts: ['On Monday morning', 'On Sunday night', 'During Christmas break', 'Never'],
          ans: 0,
          exp: '"The customer engineering team will review the dimensional CMM inspection report on Monday morning."',
          socraticHint: '¿Qué día de la semana revisará el cliente los reportes de medición CMM?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'When must all shipping manifests be signed?',
          opts: ['By Thursday at five (17:00)', 'On Friday night', 'Next Wednesday', 'After shipment arrives'],
          ans: 0,
          exp: 'Liam confirms: "Please ensure all shipping manifests are signed by Thursday at five."',
          socraticHint: '¿Cuál es la fecha límite para firmar los manifiestos de embarque?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'Look at the depleted inventory levels; the assembly line _____ run out of microcontrollers before Friday.',
        opts: ['is going to', 'will to', 'going to', 'shall be to'],
        ans: 0,
        exp: '"Be going to" expresses future predictions based on present observable physical evidence.',
        socraticHint: 'Hay evidencia física visible en el presente ("Look at the depleted inventory"). ¿Qué estructura de futuro corresponde?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The lead engineer _____ present the PPAP documentation during tomorrow\'s customer audit.',
        opts: ['will', 'is will', 'wills', 'going to'],
        ans: 0,
        exp: 'Modal future "will" is followed directly by the base verb "present" without "to".',
        socraticHint: 'El auxiliar modal de futuro simple "will" no lleva -s ni requiere "to".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Our quality team _____ meeting with the ISO auditor next Tuesday at 09:00 AM.',
        opts: ['is', 'are', 'will be to', 'going'],
        ans: 0,
        exp: 'Present continuous for fixed future calendar arrangements: "Our quality team is meeting...".',
        socraticHint: 'Para eventos agendados con fecha y hora fija en calendario, se emplea el presente continuo con valor de futuro.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'All supplier corrective actions must be submitted _____ Friday at 17:00.',
        opts: ['by', 'until', 'since', 'for'],
        ans: 0,
        exp: '"By" indicates a strict deadline (no later than that specific point in time).',
        socraticHint: '¿Qué preposición indica "a más tardar a las" al fijar una fecha límite estricta (deadline)?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The tooling supplier promised they _____ deliver the replacement injection mold within ten business days.',
        opts: ['would', 'will to', 'are to will', 'woulded'],
        ans: 0,
        exp: 'In reported speech with past reporting verb "promised", "will" shifts to conditional "would".',
        socraticHint: 'En estilo indirecto subordinado a un verbo en pasado ("promised"), ¿en qué cambia "will"?',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'The final date or time by which an engineering task or delivery must be completed is the _____.',
        opts: ['deadline', 'guideline', 'baseline', 'punchline'],
        ans: 0,
        exp: 'A "deadline" (fecha límite de entrega) represents non-negotiable project timing.',
        socraticHint: '¿Cuál es el término en inglés para la fecha límite improrrogable de entrega de un proyecto?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The list of scheduled topics to be discussed in a formal technical meeting is the _____.',
        opts: ['agenda', 'roster', 'manifest', 'blueprint'],
        ans: 0,
        exp: 'An "agenda" outlines the sequence and time slots for meeting topics.',
        socraticHint: '¿Cómo se le llama al orden del día o temario estructurado de una junta de trabajo?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A major strategic event marking significant progress in a project timeline is a _____.',
        opts: ['milestone', 'tombstone', 'flagstone', 'cobblestone'],
        ans: 0,
        exp: 'A "milestone" (hito de proyecto) marks critical gate reviews and delivery completions.',
        socraticHint: '¿Qué palabra se usa en gestión de proyectos para designar un hito o entrega intermedia clave?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct technical collocation: "We need to _____ the kickoff meeting for Wednesday morning."',
        opts: ['schedule', 'invent', 'bake', 'erase'],
        ans: 0,
        exp: 'In business operations, one "schedules a meeting" (agendar o programar una reunión).',
        socraticHint: '¿Qué verbo significa programar o agendar formalmente una junta en el calendario corporativo?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'Why does an Advanced Product Quality Planning (APQP) gateway review require sign-off from both Design and Manufacturing leads before tooling fabrication begins?',
      opts: ['To ensure Design for Manufacturability (DFM) issues are resolved and prevent expensive tooling rework', 'To satisfy personal curiosity', 'Because machines cannot read drawings without a signature', 'To delay the launch intentionally'],
      correct: 0,
      answer: 0,
      exp: 'Cross-functional gateway sign-offs verify that dimensional tolerances and draft angles can be reliably molded without tool modification.'
    }
  },

  // ── A2.4: Troubleshooting & Describing Problems ──
  'a2-u4': {
    listeningLab: {
      title: 'Robotic Cell Diagnostic Radio Dispatch',
      speaker: 'Robotics Specialist Keller',
      audioScenario: 'Keller reporting to maintenance lead. Robot Arm Number 2 has halted unexpectedly during the welding cycle. The servo drive displayed Fault Code 44, indicating an axis motor overheat. I have already inspected the cooling fan and reset the breaker, but the enclosure temperature remains slightly above normal operating threshold.',
      questions: [
        {
          q: 'Which fault code was displayed on Robot Arm 2\'s servo drive?',
          opts: ['Fault Code 44', 'Error Code 100', 'Warning 9', 'Code Blue'],
          ans: 0,
          exp: 'Keller states: "The servo drive displayed Fault Code 44, indicating an axis motor overheat."',
          socraticHint: '¿Qué código numérico de falla apareció en el display del servo drive?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What physical condition does Fault Code 44 indicate?',
          opts: ['An axis motor overheat', 'A low battery voltage', 'An empty wire feeder', 'A broken safety cage window'],
          ans: 0,
          exp: 'The dispatch clarifies: "...Fault Code 44, indicating an axis motor overheat."',
          socraticHint: '¿Qué condición térmica anómala causó el código de falla?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What actions has technician Keller already performed?',
          opts: ['Inspected the cooling fan and reset the breaker', 'Replaced the robot completely', 'Painted the enclosure white', 'Deleted the robot firmware'],
          ans: 0,
          exp: 'Keller reports: "I have already inspected the cooling fan and reset the breaker..."',
          socraticHint: '¿Cuáles fueron las dos acciones preliminares de diagnóstico que ya ejecutó Keller?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'The maintenance team _____ already _____ the pneumatic line for pressure leaks.',
        opts: ['has / checked', 'have / check', 'is / checking', 'was / check'],
        ans: 0,
        exp: 'Present perfect with third-person singular collective noun ("maintenance team") uses "has" + past participle "checked".',
        socraticHint: 'Sujeto singular colectivo con adverbio "already". ¿Qué auxiliar y participio requiere el presente perfecto?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The hydraulic pressure in Reservoir B is _____ below the recommended 150 PSI threshold.',
        opts: ['slightly', 'slight', 'more slight', 'most slightly'],
        ans: 0,
        exp: 'Use the adverb of degree "slightly" to modify the prepositional phrase "below the threshold".',
        socraticHint: 'Necesitas un adverbio de grado ("ligeramente") para modificar la posición respecto al umbral.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Have you _____ calibrated the digital pressure transducer this morning?',
        opts: ['already', 'yet', 'yesterday', 'ago'],
        ans: 0,
        exp: 'In questions expecting an affirmative operational confirmation, "already" is used: "Have you already calibrated...?"',
        socraticHint: '¿Qué adverbio en presente perfecto indaga si una acción ya se ejecutó con antelación?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The conveyor motor was vibrating violently while the line _____ running at maximum capacity.',
        opts: ['was', 'is', 'were', 'has been'],
        ans: 0,
        exp: 'Past continuous subordinate clause with singular subject "the line": "while the line was running".',
        socraticHint: 'Cláusula de acción simultánea en pasado con "while" y sujeto singular ("the line").',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The sensor _____ not responded to optical triggers since the shift started at 07:00.',
        opts: ['has', 'have', 'is', 'did'],
        ans: 0,
        exp: 'Present perfect with time anchor "since": singular subject "The sensor has not responded...".',
        socraticHint: 'La presencia de "since" conecta el pasado con el presente. Sujeto singular requiere "has not".',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'The systematic process of identifying, diagnosing, and resolving the root cause of an engineering malfunction is _____.',
        opts: ['troubleshooting', 'daydreaming', 'freewheeling', 'tailgating'],
        ans: 0,
        exp: '"Troubleshooting" (diagnóstico de fallas o resolución de problemas) is the core technical skill of diagnosing anomalies.',
        socraticHint: '¿Cuál es el término en inglés para el proceso sistemático de detección y corrección de fallas en maquinaria?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'An abnormal, excessive physical shaking of rotating mechanical equipment is _____.',
        opts: ['vibration', 'lubrication', 'ventilation', 'insulation'],
        ans: 0,
        exp: 'Excessive "vibration" indicates bearing wear, misalignment, or dynamic unbalance.',
        socraticHint: '¿Cómo se le llama a la oscilación mecánica anormal en motores o flechas que advierte desgaste de baleros?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'An automated safety switch designed to trip and interrupt electrical flow during overcurrent events is a _____.',
        opts: ['circuit breaker', 'light dimmer', 'wall socket', 'mouse pad'],
        ans: 0,
        exp: 'A "circuit breaker" (pastilla termomagnética o disyuntor) trips automatically under fault conditions.',
        socraticHint: '¿Cómo se llama el interruptor termomagnético que se bota para proteger un circuito contra sobrecargas?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct technical collocation: "The pressure valve began to _____ hydraulic fluid around the seal."',
        opts: ['leak', 'sneeze', 'yawn', 'shout'],
        ans: 0,
        exp: 'To "leak fluid" (fugar líquido o tener una fuga de fluido hidráulico) is standard engineering phraseology.',
        socraticHint: '¿Qué verbo significa fugar o gotear un fluido presurizado a través de un sello dañado?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'During root cause analysis of intermittent optical sensor trip failures, why should wiring insulation and electrical grounding be checked before replacing the sensor unit?',
      opts: ['Because electromagnetic interference (EMI) and loose grounding can produce false triggering without any hardware defect in the sensor itself', 'Because sensors cannot be purchased online', 'Because grounds are always painted yellow', 'To avoid completing maintenance logs'],
      correct: 0,
      answer: 0,
      exp: 'Verifying signal shielding and common grounds rules out induced electrical noise before condemning expensive optical transceivers.'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL B1: THRESHOLD & PROFESSIONAL FLUENCY (60.0h)
  // ─────────────────────────────────────────────────────────────────────────────

  // ── B1.1: Explaining Workflows & Standard Operating Procedures ──
  'b1-u1': {
    listeningLab: {
      title: 'Automated Surface Mount Technology (SMT) Workflow Briefing',
      speaker: 'Process Engineer Elena Torres',
      audioScenario: 'Welcome to Line 1 SMT workflow overview. First, solder paste is automatically applied to bare printed circuit boards via a high-precision stencil printer. Next, passive components are placed by dual-head pick-and-place robots at fifty thousand components per hour. Finally, assemblies are conveyed through a ten-zone convection reflow oven where solder joints are formed under a nitrogen atmosphere.',
      questions: [
        {
          q: 'How is solder paste applied to bare circuit boards in the first step?',
          opts: ['Automatically via a high-precision stencil printer', 'Manually using a hand paintbrush', 'By dipping the board into a liquid bucket', 'It is not applied at all'],
          ans: 0,
          exp: 'Torres states: "First, solder paste is automatically applied to bare printed circuit boards via a high-precision stencil printer."',
          socraticHint: '¿Qué equipo automatizado de serigrafía o esténcil aplica la soldadura en pasta al inicio del proceso?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What placement speed is achieved by the dual-head pick-and-place robotics?',
          opts: ['50,000 components per hour', '1,000 components per hour', '100 components per day', '500,000 components per minute'],
          ans: 0,
          exp: 'The audio specifies: "...placed by dual-head pick-and-place robots at fifty thousand (50,000) components per hour."',
          socraticHint: '¿Qué velocidad numérica de colocación de componentes SMD se menciona?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'Under what chemical atmosphere are solder joints formed in the reflow oven?',
          opts: ['Under a nitrogen atmosphere', 'Under pure oxygen', 'Under underwater submersion', 'In open exhaust air'],
          ans: 0,
          exp: 'Torres emphasizes: "...solder joints are formed under a nitrogen atmosphere."',
          socraticHint: '¿Qué gas inerte se inyecta en el horno de reflujo para evitar la oxidación?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'After thermal reflow, all solder joints _____ by an automated optical inspection (AOI) camera.',
        opts: ['are inspected', 'are inspect', 'inspected', 'have inspecting'],
        ans: 0,
        exp: 'Passive voice in present simple: "are" + past participle "inspected" (the focus is on the action performed on the solder joints).',
        socraticHint: 'La voz pasiva técnica requiere el verbo "to be" + participio pasado. El sujeto son las uniones (plural).',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Production was halted temporarily _____ a sensor calibration drift on Station 3.',
        opts: ['due to', 'because', 'therefore', 'consequently'],
        ans: 0,
        exp: '"Due to" is followed by a noun phrase ("a sensor calibration drift"); "because" requires a full clause with subject and verb.',
        socraticHint: 'Observa lo que sigue al conector: es una frase nominal ("a sensor calibration drift"), no una oración con verbo conjugado.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The firmware _____ successfully _____ into the microcontroller flash memory.',
        opts: ['has been / flashed', 'have been / flashed', 'is been / flashing', 'was been / flash'],
        ans: 0,
        exp: 'Present perfect passive: "has been flashed" for third-person singular noun "firmware".',
        socraticHint: 'Voz pasiva en presente perfecto para sujeto singular ("firmware"): "has been [participio]".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The raw aluminum billets are pre-heated; _____, dimensional extrusion can proceed without cracking.',
        opts: ['therefore', 'although', 'despite', 'because of'],
        ans: 0,
        exp: '"Therefore" indicates logical cause-and-effect transition between two independent clauses separated by a semicolon.',
        socraticHint: '¿Qué conector de causa-efecto une dos oraciones independientes separadas por punto y coma ("therefore")?',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Every sub-assembly must _____ prior to final packaging and serialization.',
        opts: ['be validated', 'validate', 'validated', 'is validated'],
        ans: 0,
        exp: 'Passive voice with modal verb: "must be + past participle" -> "must be validated".',
        socraticHint: 'Estructura pasiva con verbo modal: "must be" + participio pasado.',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'A formal documented instruction that outlines exact sequential steps for completing an industrial operation is an _____.',
        opts: ['SOP (Standard Operating Procedure)', 'NDF', 'ROI', 'IPO'],
        ans: 0,
        exp: 'An SOP (Procedimiento Operativo Estandarizado) ensures repeatability and ISO compliance.',
        socraticHint: '¿Qué acrónimo de tres letras designa el procedimiento operativo estandarizado de trabajo?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A specialized perforated foil or sheet used to deposit precise amounts of solder paste onto PCB pads is a _____.',
        opts: ['stencil', 'protractor', 'spatula', 'funnel'],
        ans: 0,
        exp: 'An SMT "stencil" (esténcil de pasta) controls paste deposit volume and aperture registration.',
        socraticHint: '¿Cómo se llama la lámina metálica cortada por láser que dosifica la soldadura en pasta en SMT?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The thermal process where solder alloy melts, wets copper traces, and solidifies into mechanical bonds is _____.',
        opts: ['reflow', 'evaporation', 'condensation', 'sublimation'],
        ans: 0,
        exp: '"Reflow" soldering melts solder paste progressively across controlled temperature heating zones.',
        socraticHint: '¿Cómo se le llama al proceso térmico de refundición de soldadura en ensamble electrónico?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct technical collocation: "The mechanical press must undergo rigorous _____ before commissioning."',
        opts: ['testing and validation', 'sleeping and dreaming', 'shredding and tearing', 'tasting and chewing'],
        ans: 0,
        exp: 'Standard industrial engineering pairs "testing and validation" as a formal verification milestone.',
        socraticHint: '¿Qué frase técnica describe la etapa formal de pruebas y validación previa a la liberación de línea?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'Why does IPC-A-610 Class 3 electronics manufacturing require nitrogen inerting inside the reflow tunnel?',
      opts: ['To prevent solder oxidation, minimize intermetallic voiding, and ensure superior solder wetting on critical aerospace avionics', 'To make the factory smell like fresh pine', 'Because nitrogen cools the boards to freezing temperatures', 'To reduce the electricity bill of the cafeteria'],
      correct: 0,
      answer: 0,
      exp: 'Inert nitrogen blankets reduce oxygen levels below 50 PPM, preventing surface oxidation on micro-scale ball grid array (BGA) interconnects.'
    }
  },

  // ── B1.2: Professional Email Correspondence & Status Reports ──
  'b1-u2': {
    listeningLab: {
      title: 'Customer Quality Engineering Voicemail',
      speaker: 'David Miller (North American Supplier Quality Lead)',
      audioScenario: 'Hello quality team. Following up on my email regarding the plastic injection batch 402. We noticed minor sink marks near the structural rib bosses. Could you please provide an official 8D containment report by tomorrow midday? We also request that you place remaining warehouse inventory on quarantine hold until corrective tooling inserts arrive.',
      questions: [
        {
          q: 'What visual defect was identified on plastic injection batch 402?',
          opts: ['Minor sink marks near the structural rib bosses', 'Large electrical scorch burns', 'Missing serial numbers', 'Excessive paint overspray'],
          ans: 0,
          exp: 'Miller states: "We noticed minor sink marks near the structural rib bosses."',
          socraticHint: '¿Qué defecto estético de hundimiento ("sink marks") se detectó en las piezas inyectadas?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What official report does David Miller request by tomorrow midday?',
          opts: ['An official 8D containment report', 'An invoice payment receipt', 'A company vacation schedule', 'A patent defense filing'],
          ans: 0,
          exp: 'Miller requests: "Could you please provide an official 8D containment report by tomorrow midday?"',
          socraticHint: '¿Qué metodología automotriz de 8 disciplinas solicita enviar como reporte de contención?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What action must be taken immediately with remaining warehouse inventory?',
          opts: ['Place it on quarantine hold', 'Ship it immediately to customers', 'Discard it into the city landfill', 'Sell it at a discounted price'],
          ans: 0,
          exp: 'The voicemail orders: "...place remaining warehouse inventory on quarantine hold..."',
          socraticHint: '¿En qué estatus de aislamiento preventivo de calidad (cuarentena) se deben retener las piezas en almacén?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'Could you please _____ the revised CAD models before our design review teleconference?',
        opts: ['forward', 'forwarded', 'forwarding', 'to forward'],
        ans: 0,
        exp: 'Polite request with modal "Could you please" requires the base form of the verb: "forward".',
        socraticHint: 'Fórmula de cortesía formal: "Could you please" se acompaña del verbo en su forma base.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'We _____ inform you that shipment delivery has been delayed by customs clearance.',
        opts: ['regret to', 'are regret of', 'regret of', 'regretting to'],
        ans: 0,
        exp: 'Standard formal corporate correspondence formula: "We regret to inform you that...".',
        socraticHint: 'Fórmula estándar de cortesía corporativa en correos formales: "We regret to inform you that...".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Suppliers _____ ensure that all pallets comply with ISPM 15 heat treatment standards.',
        opts: ['should', 'ought', 'may to', 'can to'],
        ans: 0,
        exp: '"Should" expresses professional obligation and requirement without requiring "to".',
        socraticHint: 'Verbo modal de recomendación y requisito normativo que se usa directamente sin "to": "should".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Please find _____ the updated engineering change matrix for your executive review.',
        opts: ['attached', 'attaching', 'attachment', 'to attach'],
        ans: 0,
        exp: 'Standard business correspondence formula: "Please find attached [document]".',
        socraticHint: 'Fórmula clásica para indicar que se adjunta un documento en un correo electrónico profesional: "Please find attached...".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'I would appreciate it if you _____ confirm receipt of the quarantined RMA tracking number.',
        opts: ['could', 'can to', 'shall may', 'are able to will'],
        ans: 0,
        exp: 'Polite conditional structure in formal emails: "I would appreciate it if you could [verb]...".',
        socraticHint: 'Estructura de cortesía condicional formal: "I would appreciate it if you could...".',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'A standardized quality problem-solving methodology comprising eight structured disciplines is the _____.',
        opts: ['8D Report (Eight Disciplines)', 'Six Sigma Black Belt', 'FMEA Worksheet', 'Gantt Chart'],
        ans: 0,
        exp: 'The 8D methodology resolves chronic quality issues systematically from D1 team formation to D8 celebration.',
        socraticHint: '¿Qué metodología automotriz de 8 disciplinas estructuradas se utiliza para resolver fallas de calidad?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Immediate operational actions taken to isolate defective parts and prevent them from reaching customers are _____ actions.',
        opts: ['containment', 'entertainment', 'abandonment', 'punishment'],
        ans: 0,
        exp: '"Containment actions" (acciones de contención D3) quarantine suspect lots immediately.',
        socraticHint: '¿Cómo se le llama a las acciones de contención inmediata para frenar el flujo de piezas no conformes?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The formal number authorized by a supplier to return defective products for warranty evaluation is an _____.',
        opts: ['RMA (Return Material Authorization)', 'SSN', 'ATM', 'VIN'],
        ans: 0,
        exp: 'An RMA (Autorización de Devolución de Material) tracks customer returns.',
        socraticHint: '¿Qué código comercial autoriza el retorno de mercancía defectuosa hacia el proveedor?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct email closing for a formal engineering letter: "Sincerely _____, David Miller."',
        opts: ['yours', 'you', 'your', 'yourself'],
        ans: 0,
        exp: '"Sincerely yours" or "Sincerely" is the standard American formal closing formula.',
        socraticHint: '¿Cuál es la fórmula formal de despedida en correspondencia profesional estadounidense ("Sincerely yours")?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'Why must an interim containment action (D3 in 8D methodology) achieve 100% defect isolation before the root cause investigation (D4) is completed?',
      opts: ['To protect customer production lines from assembly disruptions while the engineering team investigates the underlying mechanism', 'Because companies are not allowed to think and act at the same time', 'To make competitors happy', 'Because containment replaces the need for any corrective action'],
      correct: 0,
      answer: 0,
      exp: 'Containment acts as a temporary firewall protecting the end customer while rigorous 5-Why and Ishikawa investigations proceed in parallel.'
    }
  },

  // ── B1.3: Technical Phone Calls, Standups & Clarifications ──
  'b1-u3': {
    listeningLab: {
      title: 'Daily Cross-Border Scrum Standup',
      speaker: 'Scrum Master Jason Campbell (San Diego / Mexicali Bridge)',
      audioScenario: 'Morning everyone. Let us start our 15-minute cross-border standup. Yesterday, the embedded software sprint completed the CAN bus communication stack. Today, we are validating telemetry packets over the wireless gateway. Our sole blocker is that we are waiting for updated pinout schematics from the hardware hardware team in Austin. Could someone clarify who owns that deliverable?',
      questions: [
        {
          q: 'What milestone did the embedded software sprint complete yesterday?',
          opts: ['The CAN bus communication stack', 'The marketing website design', 'The human resources handbook', 'The cafeteria payment app'],
          ans: 0,
          exp: 'Campbell reports: "Yesterday, the embedded software sprint completed the CAN bus communication stack."',
          socraticHint: '¿Qué desarrollo de software embebido para red de comunicación automotriz CAN bus se concluyó ayer?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What is the sole active blocker reported during the standup?',
          opts: ['Waiting for updated pinout schematics from the hardware team in Austin', 'A broken coffee machine in San Diego', 'Lack of internet connectivity across Mexico', 'The team forgot how to code'],
          ans: 0,
          exp: '"Our sole blocker is that we are waiting for updated pinout schematics from the hardware team in Austin."',
          socraticHint: '¿Cuál es el impedimento o "blocker" que detiene el avance de la tarea?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What is the planned maximum duration for this daily standup?',
          opts: ['15 minutes', 'Two hours', 'All afternoon', 'Three minutes'],
          ans: 0,
          exp: 'Campbell introduces: "Let us start our 15-minute cross-border standup."',
          socraticHint: '¿Cuál es la duración reglamentaria del standup ágil mencionado?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'Could you tell me _____ the firmware update was deployed to the test bench?',
        opts: ['when', 'when was', 'when did', 'when was it'],
        ans: 0,
        exp: 'In embedded / indirect questions, sentence order returns to subject + verb: "Could you tell me when [subject] [verb]...".',
        socraticHint: 'En preguntas indirectas ("Could you tell me..."), el orden gramatical no se invierte; sigue la estructura afirmativa.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'I am not sure _____ the optical sensor is compatible with 24-volt industrial logic.',
        opts: ['whether', 'what', 'which', 'who'],
        ans: 0,
        exp: '"Whether" (or "if") is used to introduce indirect yes/no inquiry conditions.',
        socraticHint: 'Para introducir una duda o interrogante de sí/no en una oración indirecta, se utiliza "whether" o "if".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The telemetry gateway is transmitting UDP packets correctly, _____ it?',
        opts: ['isn\'t', 'doesn\'t', 'is', 'wasn\'t'],
        ans: 0,
        exp: 'Tag questions match the auxiliary verb and reverse polarity: positive statement ("is") takes negative tag ("isn\'t it?").',
        socraticHint: 'La oración principal es afirmativa con el verbo "is". La pregunta de confirmación (tag question) debe ser negativa: "isn\'t it?".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Do you know who _____ the lead harness architect on the avionics project?',
        opts: ['is', 'is he', 'does be', 'be'],
        ans: 0,
        exp: 'Indirect question structure: "Do you know who [subject] is?".',
        socraticHint: 'En la pregunta indirecta después de "who", el verbo "is" se coloca al final sin inversión adicional.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Sorry to interrupt, but could you _____ that last CAN bus baud rate figure?',
        opts: ['repeat', 'repeated', 'repeating', 'to repeat'],
        ans: 0,
        exp: 'Polite active listening clarification formula: "could you repeat [detail]?".',
        socraticHint: 'Fórmula de interrupción cortés para clarificar datos técnicos: "could you repeat...".',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'A short daily meeting where Agile team members state yesterday\'s achievements, today\'s plan, and roadblocks is a _____.',
        opts: ['standup (scrum meeting)', 'board banquet', 'press conference', 'shareholders vote'],
        ans: 0,
        exp: 'A daily "standup" keeps distributed engineering teams synchronized with brief status updates.',
        socraticHint: '¿Cómo se le llama a la reunión diaria ágil de 15 minutos de sincronización técnica de equipo?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Any impediment or dependency that prevents an engineer from completing their sprint backlog task is a _____.',
        opts: ['blocker', 'accelerator', 'propeller', 'booster'],
        ans: 0,
        exp: 'A "blocker" (or impediment) halts progress until resolved by the team or Scrum Master.',
        socraticHint: '¿Qué palabra se utiliza en metodología ágil para referirse a un impedimento u obstáculo que frena el avance?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A technical document showing the specific function and electrical signal assigned to each pin of a connector is a _____.',
        opts: ['pinout schematic', 'color palette', 'price tag', 'warranty card'],
        ans: 0,
        exp: 'A "pinout" diagram maps electrical signals to connector terminals.',
        socraticHint: '¿Cómo se llama el diagrama que especifica las señales y voltajes de cada terminal o pin de un conector?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct conversational phrase for active listening: "Just to make sure we are on the same _____, you will ship the prototypes tomorrow."',
        opts: ['page', 'train', 'cloud', 'shoe'],
        ans: 0,
        exp: 'The American business idiom is "to be on the same page" (estar en la misma sintonía o alineados).',
        socraticHint: '¿Qué modismo corporativo estadounidense se completa con "on the same page" para indicar entendimiento mutuo?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'During an asynchronous standup across three international time zones (California, Mexico, and Germany), why is writing concise blocker descriptions with ticket IDs superior to vague voice messages?',
      opts: ['It provides permanent searchable traceability in project Jira/Azure DevOps backlogs and allows immediate engineering triage without timezone lag', 'It uses fewer battery cycles on phones', 'It is required by federal postal law', 'To prevent coworkers from speaking English'],
      correct: 0,
      answer: 0,
      exp: 'Structured asynchronous blocker reporting with ticket IDs allows overseas shift leads to reproduce bugs and push commits while the other team sleeps.'
    }
  },

  // ── B1.4: Constructive Disagreements, Solutions & 8D Actions ──
  'b1-u4': {
    listeningLab: {
      title: 'Engineering Review: Disagreement on Tolerance Tightening',
      speaker: 'Senior Lead Mechanical Engineer Marcus Vance',
      audioScenario: 'I appreciate your proposal to tighten shaft tolerances to five microns, but if we adopt that specification, machining cycle times will increase by forty percent. Furthermore, tool wear will escalate significantly. It seems to me that we could achieve identical structural concentricity by improving our fixture clamping rigidity instead.',
      questions: [
        {
          q: 'What negative production impact would occur if shaft tolerances were tightened to 5 microns?',
          opts: ['Machining cycle times would increase by 40% and tool wear would escalate', 'The factory roof would collapse', 'Operators would earn twice as much money', 'Electricity would turn off immediately'],
          ans: 0,
          exp: 'Vance explains: "...if we adopt that specification, machining cycle times will increase by forty percent. Furthermore, tool wear will escalate significantly."',
          socraticHint: '¿Qué dos costos operativos y de tiempo se dispararían si se aprieta la tolerancia a 5 micras?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What alternative solution does Marcus Vance propose to achieve identical concentricity?',
          opts: ['Improving fixture clamping rigidity instead', 'Using plastic shafts instead of steel', 'Eliminating all quality inspections', 'Shutting down the plant for two months'],
          ans: 0,
          exp: 'Vance suggests: "...we could achieve identical structural concentricity by improving our fixture clamping rigidity instead."',
          socraticHint: '¿Qué alternativa técnica de sujeción (fixturing) plantea Marcus para lograr la misma concentricidad?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'How does Marcus introduce his constructive disagreement professionally?',
          opts: ['With diplomatic hedging: "I appreciate your proposal... but it seems to me that we could..."', 'By shouting angrily at the intern', 'By walking out of the conference room', 'By sending an anonymous complaint'],
          ans: 0,
          exp: 'Vance uses diplomatic professional American phrasing: "I appreciate your proposal..., but... It seems to me that we could...".',
          socraticHint: '¿Qué fórmula de cortesía y diplomacia técnica ("hedging") utiliza para disentir sin ser agresivo?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'If the hydraulic pump pressure _____ 200 bar, the automated relief valve trips immediately.',
        opts: ['exceeds', 'will exceed', 'exceeded', 'is exceeding'],
        ans: 0,
        exp: 'First conditional / zero conditional scientific statement: "If + present simple, present simple / future will".',
        socraticHint: 'En una regla física o condición técnica causa-efecto ("If [sujeto singular]..."), se usa el presente simple con -s.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'If we _____ the clamping fixture, we would reduce machining deflection significantly.',
        opts: ['redesigned', 'redesign', 'will redesign', 'are redesigning'],
        ans: 0,
        exp: 'Second conditional (hypothetical technical counterfactual): "If + simple past (redesigned), would + base verb".',
        socraticHint: 'Oración condicional de segundo grado (hipótesis técnica futura con "would reduce"). La cláusula "if" debe ir en pasado simple.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The sensor telemetry data _____ to indicate a progressive thermal breakdown in Bearing 4.',
        opts: ['appears', 'is appearing to', 'appear', 'appearing'],
        ans: 0,
        exp: 'Hedging verb "appears to indicate": third-person singular pronoun/noun agreement.',
        socraticHint: 'Verbo de atenuación o diplomacia técnica ("hedging"): "appears to indicate".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'I see your point regarding cost; _____, we cannot compromise on ISO safety compliance.',
        opts: ['however', 'furthermore', 'besides', 'in addition'],
        ans: 0,
        exp: '"However" introduces a contrast or constructive disagreement following an acknowledgement of the other party\'s point.',
        socraticHint: 'Conector de contraste y objeción profesional tras reconocer el punto de la contraparte: "however".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Unless the supplier _____ an updated material test report, we will not release the quarantine hold.',
        opts: ['provides', 'will provide', 'provided', 'is providing'],
        ans: 0,
        exp: '"Unless" means "if not" and is followed by the simple present: "Unless the supplier provides...".',
        socraticHint: 'La conjunción condicional "Unless" equivale a "si no" y se construye con presente simple en su cláusula.',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'Using cautious, diplomatic phrasing (such as "it appears that" or "findings suggest") to avoid making premature absolute claims is called _____.',
        opts: ['hedging', 'boasting', 'yelling', 'bargaining'],
        ans: 0,
        exp: '"Hedging" is the linguistic strategy of using cautious language to express technical uncertainty or diplomatic disagreement.',
        socraticHint: '¿Cómo se le llama en pragmática lingüística al uso de lenguaje cauteloso y diplomático para no ser tajante?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The geometric condition where two or more cylindrical features share the exact same rotational center axis is _____.',
        opts: ['concentricity', 'porosity', 'viscosity', 'elasticity'],
        ans: 0,
        exp: '"Concentricity" is the GD&T tolerance controlling the alignment of circular features sharing a common datum axis.',
        socraticHint: '¿Qué propiedad geométrica de alineación indica que dos cilindros comparten exactamente el mismo eje central?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A tooling apparatus designed to securely hold, support, and locate a workpiece during high-speed machining is a _____.',
        opts: ['fixture', 'furniture', 'fracture', 'fissure'],
        ans: 0,
        exp: 'A machining "fixture" (dispositivo de sujeción o ensamble) maintains accurate workpiece orientation.',
        socraticHint: '¿Cómo se le llama en manufactura al dispositivo o mordaza rígida que sujeta una pieza durante el maquinado?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct technical phrase: "We need to find an acceptable _____ between production speed and surface roughness."',
        opts: ['trade-off', 'trade-in', 'trade-mark', 'trade-wind'],
        ans: 0,
        exp: 'An engineering "trade-off" (compromiso o balance entre dos variables en conflicto) balances conflicting specs.',
        socraticHint: '¿Qué sustantivo compuesto en inglés designa el balance o compromiso óptimo entre dos requerimientos opuestos?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'In an engineering conflict between the Design team (requesting tight tolerances) and Manufacturing (requesting looser tolerances), what empirical tool provides definitive objective resolution?',
      opts: ['Process Capability Analysis calculating Cpk and Ppk values from statistical sample runs', 'Flipping a coin in the hallway', 'Asking the oldest person in the building', 'Ignoring the drawing completely'],
      correct: 0,
      answer: 0,
      exp: 'Statistical Process Capability indices (Cpk >= 1.33 or 1.67) mathematically demonstrate whether factory machinery can reliably meet proposed tolerances without generating excessive scrap.'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL B2: VANTAGE & EXECUTIVE CAPSTONE FLUENCY (60.0h)
  // ─────────────────────────────────────────────────────────────────────────────

  // ── B2.1: Engineering Change Orders & Technical Specs ──
  'b2-u1': {
    listeningLab: {
      title: 'Engineering Change Review Board (ECRB) Executive Hearing',
      speaker: 'Chief Technology Officer Dr. Robert Hayes',
      audioScenario: 'Members of the board: ECO-2026-88 requests a transition from FR-4 substrate to high-frequency Rogers laminate for our 5G transceiver modules. Had we conducted thermal dissipation simulations earlier in Q2, the dielectric breakdown issue would have been mitigated without halting pre-production. I move that we approve the ECO subject to supplier PPAP re-certification by October thirty-first.',
      questions: [
        {
          q: 'What material transition is requested under ECO-2026-88?',
          opts: ['From FR-4 substrate to high-frequency Rogers laminate', 'From aluminum to cardboard', 'From copper to plastic wire', 'From steel to wood'],
          ans: 0,
          exp: 'Dr. Hayes specifies: "...requests a transition from FR-4 substrate to high-frequency Rogers laminate for our 5G transceiver modules."',
          socraticHint: '¿Qué cambio de sustrato dieléctrico de circuito impreso para alta frecuencia se solicita en la orden ECO?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'According to Dr. Hayes, what past action would have mitigated the dielectric breakdown earlier?',
          opts: ['Conducting thermal dissipation simulations earlier in Q2', 'Hiring fifty more assembly workers', 'Shutting down the company email server', 'Reducing employee lunch breaks'],
          ans: 0,
          exp: '"Had we conducted thermal dissipation simulations earlier in Q2, the dielectric breakdown issue would have been mitigated..."',
          socraticHint: '¿Qué estudio de simulación térmica previo en el segundo trimestre habría evitado la falla dieléctrica?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What condition is attached to the board approval of the ECO?',
          opts: ['Subject to supplier PPAP re-certification by October 31', 'No conditions; immediate unrestricted launch', 'The supplier must pay a cash penalty', 'The product must be sold at half price'],
          ans: 0,
          exp: 'Dr. Hayes concludes: "...approve the ECO subject to supplier PPAP re-certification by October thirty-first."',
          socraticHint: '¿Qué requerimiento automotriz de aprobación de partes (PPAP) condiciona la aprobación de la orden?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'If the development team _____ the stress analysis earlier, the chassis would not have cracked during vibration testing.',
        opts: ['had executed', 'would execute', 'has executed', 'executed'],
        ans: 0,
        exp: 'Third conditional (past unreal condition and past unreal result): "If + past perfect (had executed), would not have + past participle".',
        socraticHint: 'Condicional de tercer grado sobre una situación del pasado que no ocurrió: la cláusula "if" requiere past perfect.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Had the firmware _____ tested under cryogenic operating conditions, the memory leak would have been detected in the lab.',
        opts: ['been', 'being', 'be', 'to be'],
        ans: 0,
        exp: 'Inversion of third conditional without "if": "Had [subject] been [past participle]...".',
        socraticHint: 'Inversión formal de tercer condicional que reemplaza a "If the firmware had been tested": "Had the firmware been tested".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'It is imperative that the supplier _____ updated compliance certificates prior to shipment.',
        opts: ['submit', 'submits', 'submitted', 'will submit'],
        ans: 0,
        exp: 'Formal American English subjunctive mood following expressions of necessity ("imperative that [subject] + base verb"): "submit".',
        socraticHint: 'En inglés estadounidense formal, las oraciones con "It is imperative that..." rigen modo subjuntivo con verbo en forma base.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The engineering change order _____ currently _____ reviewed by the cross-functional quality board.',
        opts: ['is / being', 'was / been', 'has / been', 'is / been'],
        ans: 0,
        exp: 'Present continuous passive: "is being reviewed" indicates an ongoing action in the present.',
        socraticHint: 'Voz pasiva en presente continuo para una acción en desarrollo ahora mismo: "is being [participio]".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'If the sensor _____ calibrated yesterday, the line would be operating smoothly right now.',
        opts: ['had been', 'was', 'would be', 'is'],
        ans: 0,
        exp: 'Mixed conditional (past action affecting present condition): "If + past perfect (had been), would be + ing (right now)".',
        socraticHint: 'Condicional mixto: una acción no realizada en el pasado ("yesterday") que tiene impacto en el presente ("right now").',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'A formal document that authorizes, details, and tracks approved modifications to an engineered component or process is an _____.',
        opts: ['ECO (Engineering Change Order)', 'IPO', 'NDA', 'EULA'],
        ans: 0,
        exp: 'An ECO (Orden de Cambio de Ingeniería) manages configuration revisions under ISO/AS9100 quality systems.',
        socraticHint: '¿Qué documento oficial de ingeniería gestiona y autoriza cambios a planos, listas de materiales o procesos?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The dielectric constant and insulating base plate upon which electronic circuit traces are printed is the _____.',
        opts: ['substrate', 'substation', 'substitute', 'subsidy'],
        ans: 0,
        exp: 'A PCB "substrate" (sustrato dieléctrico) provides mechanical support and electrical insulation.',
        socraticHint: '¿Cómo se le llama a la base o sustrato aislante sobre el que se graban las pistas de cobre de una tarjeta electrónica?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The automotive and aerospace validation dossier demonstrating that a manufacturing process can consistently produce conforming parts is the _____.',
        opts: ['PPAP (Production Part Approval Process)', 'GPS', 'P&L', 'HRM'],
        ans: 0,
        exp: 'PPAP (Proceso de Aprobación de Partes para Producción) is the golden standard across AIAG/IATF 16949.',
        socraticHint: '¿Qué dossier documental estandarizado IATF aprueba las partes para su corrida en producción en masa?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct formal technical collocation: "The board approved the design change _____ to successful environmental testing."',
        opts: ['subject', 'object', 'reject', 'inject'],
        ans: 0,
        exp: 'The executive legal/technical phrase is "approved subject to [condition]" (aprobado sujeto a cumplimiento de condición).',
        socraticHint: '¿Qué adjetivo formal acompaña a "approved ... to" para indicar una aprobación condicionada al éxito de pruebas?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'In an aerospace Engineering Change Order (ECO) workflow, why must "interchangeability" (Form, Fit, and Function) be evaluated before assigning a new part number versus a revision dash number?',
      opts: ['If a modified part can no longer replace the legacy part in existing field assemblies without modification, it violates interchangeability and mandates a brand-new part number', 'Because part numbers must never exceed six digits', 'To confuse the warehouse inventory software', 'Because engineers enjoy memorizing new numbers'],
      correct: 0,
      answer: 0,
      exp: 'Configuration management standards (MIL-STD-973 / EIA-649) dictate that any change affecting Form, Fit, Function, or field interchangeability requires a new base part number.'
    }
  },

  // ── B2.2: Cross-Border Negotiations & Executive Facilitation ──
  'b2-u2': {
    listeningLab: {
      title: 'Executive Contract Negotiation: Supplier Volume Pricing',
      speaker: 'Procurement Director Victoria Stone',
      audioScenario: 'Thank you for joining this executive commercial session. While we appreciate your proposal for an eight percent price rebate at three hundred thousand units, our nearshoring volume projections indicate five hundred thousand units for Q1. On condition that you commit to guaranteed four-week lead times and localized buffer warehousing in Tijuana, we are prepared to sign a two-year exclusive supply agreement.',
      questions: [
        {
          q: 'What volume projection does Victoria Stone state for Q1?',
          opts: ['500,000 units', '300,000 units', '50,000 units', '1,000,000 units'],
          ans: 0,
          exp: 'Stone states: "...our nearshoring volume projections indicate five hundred thousand (500,000) units for Q1."',
          socraticHint: '¿Cuál es el volumen de producción proyectado para el primer trimestre en la planta de nearshoring?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What two contractual commitments does Director Stone require from the supplier?',
          opts: ['Guaranteed 4-week lead times and localized buffer warehousing in Tijuana', 'Free catering and holiday gifts', 'Relocating their headquarters to London', 'Signing daily NDAs'],
          ans: 0,
          exp: '"On condition that you commit to guaranteed four-week lead times and localized buffer warehousing in Tijuana..."',
          socraticHint: '¿Cuáles son las dos condiciones operativas que exige la directora comercial para firmar la exclusividad?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What is the duration of the proposed exclusive supply agreement?',
          opts: ['Two years', 'Six months', 'Ten years', 'One month'],
          ans: 0,
          exp: 'Stone proposes: "...we are prepared to sign a two-year exclusive supply agreement."',
          socraticHint: '¿Por cuántos años de vigencia se ofrece el contrato de suministro exclusivo?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'The board recommended that the procurement team _____ negotiations with the secondary vendor.',
        opts: ['reopen', 'reopens', 'reopened', 'will reopen'],
        ans: 0,
        exp: 'Subjunctive mood following mandative verb "recommended that [subject] + base verb": "reopen".',
        socraticHint: 'Oración subordinada con verbo mandativo ("recommended that"). En inglés formal se usa el subjuntivo con forma base.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'We will accept the revised tooling fee _____ that you guarantee four-week lead times.',
        opts: ['provided', 'providing of', 'unless', 'despite'],
        ans: 0,
        exp: '"Provided that" (or "providing that") introduces a contractual condition equivalent to "on the condition that".',
        socraticHint: 'Conector condicional formal que equivale a "siempre y cuando" o "bajo la condición de que": "provided that".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: '_____ our production volume projections materialize, the amortized cost per unit will drop significantly.',
        opts: ['Should', 'Had', 'Would', 'Were'],
        ans: 0,
        exp: 'Formal conditional inversion replacing "If our projections should materialize": "Should our production volume projections materialize...".',
        socraticHint: 'Inversión formal de primer condicional con "Should" al inicio de la oración sustituyendo a "If": "Should our projections materialize...".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Not only _____ agree to the revised pricing structure, but they also guaranteed localized inventory.',
        opts: ['did the supplier', 'the supplier did', 'was the supplier', 'the supplier was'],
        ans: 0,
        exp: 'Inversion following negative correlative conjunction "Not only did [subject] [base verb]...".',
        socraticHint: 'Estructura invertida tras la frase correlativa negativa "Not only": requiere auxiliar "did" antes del sujeto.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The executive committee insists that every contract _____ verified by legal counsel.',
        opts: ['be', 'is', 'was', 'are'],
        ans: 0,
        exp: 'Mandative subjunctive with "insists that [subject] be [past participle]": "be verified".',
        socraticHint: 'Subjuntivo mandativo con "insists that": el verbo "to be" se mantiene en su forma base "be".',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'The elapsed time between the initial placement of an order and the physical receipt of goods at the dock is the _____.',
        opts: ['lead time', 'lunch time', 'closing time', 'play time'],
        ans: 0,
        exp: '"Lead time" (tiempo de entrega o ciclo de suministro) is a critical KPI in supply chain logistics.',
        socraticHint: '¿Cuál es el término en inglés para el lapso entre la emisión de la orden de compra y la recepción de piezas?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A reserve inventory strategically stored near a manufacturing facility to absorb supply fluctuations is a _____.',
        opts: ['buffer stock (or safety stock)', 'penny stock', 'dead stock', 'junk stock'],
        ans: 0,
        exp: '"Buffer stock" mitigates supply disruption and transportation delays.',
        socraticHint: '¿Cómo se le llama al inventario de seguridad o amortiguador ubicado cerca de la planta para evitar desabastos?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The commercial practice of relocating manufacturing and supply chains to a geographically proximate country is _____.',
        opts: ['nearshoring', 'offshoring', 'outsourcing', 'downsizing'],
        ans: 0,
        exp: '"Nearshoring" relocates manufacturing closer to target markets (e.g., US companies expanding in Mexico).',
        socraticHint: '¿Qué concepto define la relocalización de cadenas de suministro a países geográficamente cercanos?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct executive negotiation collocation: "Both teams reached a _____ agreement after intense commercial mediation."',
        opts: ['mutually beneficial', 'wildly destructive', 'carelessly forgotten', 'hastily discarded'],
        ans: 0,
        exp: 'A "mutually beneficial agreement" (win-win agreement) represents optimal corporate diplomacy.',
        socraticHint: '¿Qué colocación ejecutiva describe un acuerdo donde ambas partes obtienen beneficios mutuos ("win-win")?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'Why do multinational original equipment manufacturers (OEMs) negotiating long-term agreements (LTAs) require indexation clauses tied to public raw material commodity indices (such as the London Metal Exchange)?',
      opts: ['To establish transparent, automated price adjustment mechanisms that protect both buyer and supplier against volatile raw material swings', 'Because OEMs do not know the price of copper', 'To make contracts legally invalid in court', 'To avoid using computers for billing'],
      correct: 0,
      answer: 0,
      exp: 'Commodity indexation clauses (LME/Platts) remove speculative risk by adjusting contract part costs strictly when published commodity markets fluctuate beyond negotiated bands.'
    }
  },

  // ── B2.3: Formal Escalations, Root Cause & Executive Memos ──
  'b2-u3': {
    listeningLab: {
      title: 'Executive Quality Escalation Briefing',
      speaker: 'Vice President of Operations Arthur Sterling',
      audioScenario: 'Good afternoon. This briefing addresses our customer escalation regarding field inverter failures. Under no circumstances should non-conforming batch units be re-certified without an exhaustive metallurgical failure analysis. Preliminary scans indicate inter-granular stress corrosion cracking on the copper busbars. I am establishing an executive war room effective immediately to oversee containment across all North American service centers.',
      questions: [
        {
          q: 'What is Vice President Sterling\'s strict directive regarding the non-conforming batch units?',
          opts: ['Under no circumstances should they be re-certified without an exhaustive metallurgical analysis', 'Ship them to discount retailers immediately', 'Ignore the customer complaint', 'Throw them into the ocean'],
          ans: 0,
          exp: 'Sterling directs: "Under no circumstances should non-conforming batch units be re-certified without an exhaustive metallurgical failure analysis."',
          socraticHint: '¿Qué directiva categórica y prohibitiva dicta el vicepresidente sobre recertificar piezas sin análisis previo?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What physical failure mechanism do preliminary scans indicate on the copper busbars?',
          opts: ['Inter-granular stress corrosion cracking', 'Paint discoloration', 'Software syntax error', 'Low battery charge'],
          ans: 0,
          exp: '"Preliminary scans indicate inter-granular stress corrosion cracking on the copper busbars."',
          socraticHint: '¿Qué mecanismo metalúrgico de falla por corrosión bajo esfuerzo se detectó en las barras colectoras de cobre?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What organizational measure does Sterling establish effective immediately?',
          opts: ['An executive war room to oversee containment across all North American centers', 'A company holiday party', 'A 50% layoff of all workers', 'A marketing campaign on television'],
          ans: 0,
          exp: 'Sterling announces: "I am establishing an executive war room effective immediately to oversee containment..."',
          socraticHint: '¿Qué unidad operativa de crisis ("war room") convoca el vicepresidente de forma inmediata?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'Under no circumstances _____ power be restored before the safety interlocks are verified.',
        opts: ['should', 'should not', 'it should', 'should it not'],
        ans: 0,
        exp: 'Negative inversion: following restrictive negative adverbial "Under no circumstances", auxiliary precedes subject: "should power be restored...".',
        socraticHint: 'Inversión negativa formal con "Under no circumstances": el verbo auxiliar modal "should" precede al sujeto "power".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Seldom _____ an engineering flaw triggered such an immediate executive intervention.',
        opts: ['has', 'have', 'had been', 'did have'],
        ans: 0,
        exp: 'Negative frequency inversion with "Seldom" + auxiliary "has" + singular subject "an engineering flaw" + past participle "triggered".',
        socraticHint: 'Inversión con el adverbio restrictivo "Seldom" y sujeto singular ("an engineering flaw"): auxiliar "has".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The executive memo recommended _____ of all suspect inventory to safeguard brand reputation.',
        opts: ['immediate quarantine', 'to quarantine immediate', 'quarantine immediately', 'immediate to quarantine'],
        ans: 0,
        exp: 'Nominalization ("immediate quarantine") is preferred in executive technical writing for conciseness and punch.',
        socraticHint: 'En redacción ejecutiva de alto nivel se prefiere la nominalización concisa: adjetivo + sustantivo ("immediate quarantine").',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Little _____ the quality engineers realize how critical the thermal cycle testing would become.',
        opts: ['did', 'do', 'were', 'have'],
        ans: 0,
        exp: 'Negative inversion with "Little": "Little did [subject] realize...".',
        socraticHint: 'Inversión enfática formal con "Little": requiere auxiliar "did" antes del sujeto en tiempo pasado.',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Only after the metallurgical lab completed the SEM fractography _____ the true fracture mode confirmed.',
        opts: ['was', 'is', 'did', 'had'],
        ans: 0,
        exp: 'Inversion following "Only after [clause]": auxiliary "was" + subject + participle: "was the true fracture mode confirmed".',
        socraticHint: 'Inversión condicionada con "Only after...": la cláusula principal invierte el auxiliar pasivo "was" antes del sujeto.',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'The high-resolution microscopy technique that scans conductive surfaces with a focused electron beam to reveal fracture topology is a _____.',
        opts: ['SEM (Scanning Electron Microscope)', 'Stethoscope', 'Telescope', 'Periscope'],
        ans: 0,
        exp: 'A Scanning Electron Microscope (SEM) produces micro-scale fractography imaging for root cause investigations.',
        socraticHint: '¿Qué instrumento de microscopía electrónica de barrido (SEM) analiza la superficie de fracturas metálicas a nivel micrométrico?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'A dedicated cross-functional emergency command center assembled to solve a critical corporate crisis rapidly is a _____.',
        opts: ['war room', 'restroom', 'playroom', 'fitting room'],
        ans: 0,
        exp: 'An executive "war room" (cuarto de crisis o comando de operaciones) manages urgent escalations with maximum authority.',
        socraticHint: '¿Cómo se le llama en la industria al centro de comando de emergencia o cuarto de crisis montado para resolver un problema crítico?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The metallurgical degradation process where tensile stress and a corrosive environment combine to produce rapid cracking along metal grain boundaries is _____.',
        opts: ['stress corrosion cracking (SCC)', 'electroplating', 'anodizing', 'galvanizing'],
        ans: 0,
        exp: 'Stress Corrosion Cracking (SCC) causes catastrophic component fractures under combined mechanical and chemical exposure.',
        socraticHint: '¿Qué fenómeno metalúrgico de agrietamiento ocurre por la combinación de esfuerzos mecánicos de tensión y un medio corrosivo?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct executive collocation: "The board issued an _____ memo demanding immediate corrective actions."',
        opts: ['executive', 'irresponsible', 'accidental', 'inattentive'],
        ans: 0,
        exp: 'An "executive memo" (memorando ejecutivo de alta dirección) carries binding corporate authority.',
        socraticHint: '¿Qué adjetivo califica formalmente a un memorándum emitido por la alta dirección corporativa ("executive memo")?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'Why does an executive escalation memo require concise "BLUF" (Bottom Line Up Front) framing when communicating systemic recalls to a Chief Executive Officer?',
      opts: ['C-level executives require immediate situational clarity on financial exposure, safety liabilities, and containment status within the first thirty seconds of reading', 'Because CEOs only read three words per day', 'To prevent the document from being translated into Spanish', 'Because long paragraphs use too much printer ink'],
      correct: 0,
      answer: 0,
      exp: 'Executive communication protocols mandate the BLUF structure so decision-makers can instantly grasp operational risk, capital impact, and decisive containment actions.'
    }
  },

  // ── B2.4: American Business Idioms & Cultural Radar ──
  'b2-u4': {
    listeningLab: {
      title: 'Strategy Offsite: Executive Pragmatics & Cultural Idioms',
      speaker: 'Managing Partner Carolyn Bennett',
      audioScenario: 'Team, let us look at the big picture. We are in the final lap of the nearshoring transition. I want everyone to touch base with our supply chain partners before we pull the trigger on the expanded manufacturing facility. Remember to keep your ear to the ground regarding local regulatory shifts. Do not cut corners on quality, because what is on the line is our multi-year customer trust.',
      questions: [
        {
          q: 'What does Carolyn Bennett mean when she instructs the team to "touch base" with partners?',
          opts: ['To briefly establish contact and communicate status with them', 'To play baseball on the factory floor', 'To physically touch a metal baseplate', 'To ignore all incoming telephone calls'],
          ans: 0,
          exp: 'The American business idiom "to touch base" means to make brief contact to update each other on progress.',
          socraticHint: '¿Qué significa el modismo corporativo "touch base" en el contexto de gestión de socios comerciales?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'What does the phrase "pull the trigger" mean in this operational context?',
          opts: ['To formally initiate or commit to the major capital decision', 'To fire a weapon inside the plant', 'To cancel the project completely', 'To disassemble the machinery'],
          ans: 0,
          exp: '"To pull the trigger" is a standard executive idiom meaning to finalize a major operational or financial decision.',
          socraticHint: '¿Qué acción de compromiso o inicio de inversión significa la frase idiomática "pull the trigger"?',
          category: 'Comprensión Auditiva'
        },
        {
          q: 'Why does Carolyn warn the team "not to cut corners"?',
          opts: ['Because cutting corners means doing something cheaply or carelessly, which jeopardizes multi-year customer trust', 'Because sharp corners on boxes are dangerous', 'Because squares have four corners', 'Because the scissors are missing'],
          ans: 0,
          exp: '"To cut corners" means to take shortcuts that compromise standards or quality, leading to long-term reputational risk.',
          socraticHint: '¿Qué significa la expresión de alerta de calidad "don\'t cut corners" en los estándares de manufactura?',
          category: 'Comprensión Auditiva'
        }
      ]
    },
    grammarDrills: [
      {
        q: 'By the time the executive board convenes tomorrow, our engineering team _____ the root cause presentation.',
        opts: ['will have finalized', 'will finalize', 'finalizes', 'finalized'],
        ans: 0,
        exp: 'Future perfect tense ("will have finalized") denotes an action that will be completed before a designated future reference point.',
        socraticHint: 'Estructura temporal "By the time [evento futuro]": la acción principal se completará antes, requiriendo el futuro perfecto ("will have + participio").',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The program director insisted that everyone _____ their ear to the ground regarding tariff modifications.',
        opts: ['keep', 'keeps', 'kept', 'is keeping'],
        ans: 0,
        exp: 'Subjunctive mood with base form verb following mandative "insisted that [subject] + base verb": "keep".',
        socraticHint: 'Subjuntivo mandativo tras "insisted that": el verbo se coloca en su forma base ("keep").',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Not only did we bring the project in under budget, but we _____ delivered it two weeks ahead of schedule.',
        opts: ['also', 'too', 'either', 'neither'],
        ans: 0,
        exp: 'Correlative pair: "Not only [inversion]... but [subject] also [verb]...".',
        socraticHint: 'Conector correlativo formal: "Not only did we..., but we also...".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'Were we to lower our inspection frequency, the risk of undetected defects _____ multiply tenfold.',
        opts: ['would', 'will', 'is to', 'shall'],
        ans: 0,
        exp: 'Formal conditional inversion with "Were we to [verb], [subject] would [base verb]...".',
        socraticHint: 'Inversión formal de segundo condicional con "Were we to [verbo]": la cláusula consecuente requiere "would".',
        category: 'Gramática Aplicada & Sintaxis'
      },
      {
        q: 'The lead architect suggested that the sensor data _____ re-verified by an independent calibration laboratory.',
        opts: ['be', 'is', 'was', 'been'],
        ans: 0,
        exp: 'Subjunctive passive: "suggested that [subject] be re-verified".',
        socraticHint: 'Subjuntivo pasivo tras el verbo "suggested that": requiere la forma base "be" + participio.',
        category: 'Gramática Aplicada & Sintaxis'
      }
    ],
    vocabularyExercises: [
      {
        q: 'An American workplace idiom meaning to step back and evaluate the overall strategic situation rather than minute details is to look at the _____.',
        opts: ['big picture', 'small pixel', 'dark tunnel', 'empty glass'],
        ans: 0,
        exp: 'The "big picture" refers to the broad macro-level overview of a business scenario.',
        socraticHint: '¿Qué modismo estadounidense de negocios alude a tener una visión panorámica y macroestratégica del negocio?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'When an engineer is instructed to "get down to brass tacks", they are being asked to _____.',
        opts: ['focus immediately on the essential, practical, and factual details of a problem', 'pick up nails from the floor', 'polish copper fittings', 'purchase office stationery'],
        ans: 0,
        exp: '"To get down to brass tacks" means focusing directly on the fundamental facts and practical realities.',
        socraticHint: '¿Qué modismo técnico-laboral significa ir directo al grano y enfocarse en los hechos esenciales y prácticos?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'The phrase "to keep someone in the loop" means to _____.',
        opts: ['keep someone informed and updated about ongoing developments', 'tie someone with a rope', 'trap someone in a conveyor belt', 'lock someone in a room'],
        ans: 0,
        exp: '"In the loop" indicates being part of the communication channel and receiving regular progress updates.',
        socraticHint: '¿Qué modismo corporativo significa mantener a alguien debidamente informado y copiado en las actualizaciones del proyecto?',
        category: 'Léxico Técnico & Colocaciones'
      },
      {
        q: 'Choose the correct idiomatic phrase: "We need to ensure everyone is _____ the same page before presenting to executive leadership."',
        opts: ['on', 'under', 'at', 'into'],
        ans: 0,
        exp: 'The correct preposition is "on the same page" (alineados en el mismo entendimiento).',
        socraticHint: '¿Qué preposición acompaña a la frase idiomática "on the same page"?',
        category: 'Léxico Técnico & Colocaciones'
      }
    ],
    fourthReadingQuestion: {
      q: 'In cross-cultural communication between Mexican engineers and American corporate directors, why can indirect polite vagueness (such as saying "we will try our best" when a deadline is impossible) be misinterpreted as a firm commitment?',
      opts: ['American engineering culture values low-context directness and transparency regarding risks, interpreting ambiguous optimism as an affirmative deliverable promise', 'Because Americans don\'t understand the word "best"', 'Because Mexican engineers are not allowed to use calendars', 'Because clocks run faster in the United States'],
      correct: 0,
      answer: 0,
      exp: 'Low-context American business communication expects direct, factual escalation of delays; indirect cultural politeness can lead to severe misalignment if risks are not stated assertively.'
    }
  }
};

module.exports = { MCER_INTERACTIVE_EXERCISES };
