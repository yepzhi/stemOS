/**
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

  const MCER_LEVELS = [
  {
    "id": "mcer-a1",
    "code": "A1",
    "name": "Breakthrough / Beginner",
    "nameES": "Nivel A1: Fundamentos y Comunicación Cotidiana (Inglés I)",
    "badge": "CEFR A1 Novice",
    "color": "#10b981",
    "icon": "fa-seedling",
    "totalHours": 60,
    "totalXP": 5600,
    "summary": "Acredita 60.0 horas curriculares (Inglés I). Desarrolla las competencias esenciales para presentarse, intercambiar información personal y laboral básica, describir rutinas diarias, horarios y comprender instrucciones sencillas en el entorno de trabajo.",
    "units": [
      {
        "id": "a1-u1",
        "unitNum": 1,
        "unitNumber": 1,
        "title": "Personal & Professional Introductions",
        "titleES": "Presentación Personal y Roles Laborales en Planta",
        "cefrDescriptor": "Can introduce him/herself and others, state job title, exchange employee ID details, and ask simple clarifying questions.",
        "canDo": "Presentarse con colegas y supervisores, deletrear nombres, dar números de empleado y describir puestos de trabajo simples.",
        "grammarFocus": "Verb to be (am/is/are), Subject Pronouns, Possessive Adjectives (my, your, his, her), Question Words (What, Who, Where)",
        "communicativeGoal": "Presentarse con colegas y supervisores, deletrear nombres, dar números de teléfono y describir puestos de trabajo simples.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Coworker",
            "es": "Compañero de trabajo",
            "ipa": "/ˈkoʊˌwɜːrkər/",
            "example": "This is Diana, my new coworker in quality inspection."
          },
          {
            "en": "Shift Manager",
            "es": "Supervisor de turno",
            "ipa": "/ʃɪft ˈmænɪdʒər/",
            "example": "Carlos is our shift manager on the morning crew."
          },
          {
            "en": "Employee ID Badge",
            "es": "Credencial de empleado",
            "ipa": "/ɛmˈplɔɪiː aɪˈdiː bædʒ/",
            "example": "Please scan your employee badge at the turnstile."
          },
          {
            "en": "Workstation",
            "es": "Estación de trabajo",
            "ipa": "/ˈwɜːrkˌsteɪʃən/",
            "example": "My workstation is located next to assembly line three."
          },
          {
            "en": "Department",
            "es": "Departamento / Área",
            "ipa": "/dɪˈpɑːrtmənt/",
            "example": "Which department are you assigned to this semester?"
          },
          {
            "en": "Team Lead",
            "es": "Líder de equipo",
            "ipa": "/tiːm liːd/",
            "example": "Report your morning attendance to the team lead before 7:00 AM."
          },
          {
            "en": "Turnstile",
            "es": "Torniquete de acceso",
            "ipa": "/ˈtɜːrnˌstaɪl/",
            "example": "Security requires every employee to badge in at the turnstile."
          },
          {
            "en": "Intern",
            "es": "Practicante / Pasante",
            "ipa": "/ˈɪntɜːrn/",
            "example": "Marco is a mechanical engineering intern from UPBC."
          }
        ],
        "dialogue": {
          "title": "First Day Orientation at the Manufacturing Facility",
          "speakers": [
            "Mark (Supervisor)",
            "Alex (New Engineering Intern)"
          ],
          "lines": [
            {
              "speaker": "Mark",
              "text": "Good morning! Welcome to the team. Are you Alex Rivera, the new mechatronics intern?"
            },
            {
              "speaker": "Alex",
              "text": "Good morning, Mark. Yes, I am. It is a pleasure to meet you in person."
            },
            {
              "speaker": "Mark",
              "text": "Welcome aboard. Here is your facility access badge. What is your employee number for our shift roster?"
            },
            {
              "speaker": "Alex",
              "text": "My employee ID is 8-4-0-2-9. My primary workstation is located at Sub-Assembly Line 3, correct?"
            },
            {
              "speaker": "Mark",
              "text": "That is correct. Let me walk you over and introduce you to your morning team lead."
            },
            {
              "speaker": "Alex",
              "text": "Thank you, Mark. Should I keep my safety glasses on while walking across the yellow pedestrian aisle?"
            },
            {
              "speaker": "Mark",
              "text": "Yes, absolutely. Safety eyewear is mandatory whenever you step past the blue line."
            }
          ]
        },
        "reading": {
          "title": "Facility Orientation Notice: Security & Badge Issuance",
          "text": "Welcome to Northern Tech Manufacturing Facility. All incoming engineering interns must complete their security credential verification by 08:30 AM on Day One. Please bring your official university credentials and emergency contact sheet to Human Resources on the second floor, Room 210. Assigned equipment lockers are located in Corridor B. Personal cell phones must remain inside your locker during active machine operations.",
          "question": "Where must new interns present their emergency contact sheet?",
          "options": [
            "In the cafeteria",
            "To Human Resources on the second floor, Room 210",
            "At the shipping dock",
            "To the security guard at Line 3"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Badge Scan & Workstation Check-In Simulation",
          "context": "You arrive at Security Gate #2 on Day 1. The security officer requests your identity, employee ID badge number, assigned department, and supervisor name before coding your cleanroom NFC pass.",
          "scenario": "Answer the security officer using clear, professional American workplace introductory phrasing.",
          "role": "Mechatronics Engineering Intern",
          "modelResponse": "Good morning. My name is Alex Rivera, employee number 84029. I am the new mechatronics intern assigned to Sub-Assembly Line 3 under shift supervisor Mark Reynolds.",
          "keywords": [
            "name",
            "employee",
            "intern",
            "station",
            "Line 3",
            "supervisor"
          ],
          "rubric": {
            "grammar": "Use correct forms of the verb to be (am/is) and possessive adjectives (my/your).",
            "lexicon": "Accurately state employee ID, department/line designation, and job role.",
            "protocol": "Deliver standard American polite greeting with clear pronunciation."
          }
        },
        "quiz": [
          {
            "q": "Hello, _____ name is David and I am an electrical engineering intern.",
            "opts": [
              "my",
              "me",
              "mine",
              "I"
            ],
            "ans": 0,
            "exp": "Use the possessive adjective \"my\" before a noun."
          },
          {
            "q": "Where _____ your workstation located on the production floor?",
            "opts": [
              "are",
              "is",
              "be",
              "am"
            ],
            "ans": 1,
            "exp": "Workstation is third-person singular, requiring \"is\"."
          },
          {
            "q": "How do you politely introduce a new colleague to your supervisor?",
            "opts": [
              "Look at this person right now",
              "This is Maria, our new quality assurance coordinator",
              "Who is Maria here",
              "Maria is she"
            ],
            "ans": 1,
            "exp": "\"This is [Name]\" is the standard professional introduction formula."
          },
          {
            "q": "Which question correctly asks for an employee identification number?",
            "opts": [
              "What is your employee badge number?",
              "Where employee number is?",
              "Who employee number have you?",
              "Why employee number?"
            ],
            "ans": 0,
            "exp": "\"What is your [noun]?\" is the correct interrogative structure."
          }
        ],
        "falseCognates": [
          {
            "term": "Actually",
            "mistake": "Actualmente",
            "correct": "En realidad / De hecho",
            "tip": "Para decir \"actualmente\", utiliza \"Currently\" o \"At present\". En la planta: \"Actually, my shift is on Line 3.\""
          },
          {
            "term": "Introduce",
            "mistake": "Introducir una pieza",
            "correct": "Presentar formalmente a una persona",
            "tip": "Para meter una refacción o componente usa \"Insert\" o \"Feed\". \"Introduce\" se reserva para personas: \"Let me introduce you to the team lead.\""
          },
          {
            "term": "Assist",
            "mistake": "Asistir de estar presente",
            "correct": "Ayudar / Auxiliar operativamente",
            "tip": "Para decir que asististe a una junta o curso usa \"Attend\": \"I attended the safety meeting.\" \"Assist\" significa prestar ayuda técnica."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Colleague",
            "stress": "COL-league",
            "ipa": "/ˈkɑːliːɡ/",
            "rule": "Acento en la primera sílaba; la terminación \"-ue\" es totalmente muda."
          },
          {
            "term": "Workstation",
            "stress": "WORK-sta-tion",
            "ipa": "/ˈwɜːrkˌsteɪʃən/",
            "rule": "Palabra compuesta: el acento principal recae en \"WORK\"."
          },
          {
            "term": "Supervisor",
            "stress": "SU-per-vi-sor",
            "ipa": "/ˈsuːpərˌvaɪzər/",
            "rule": "Acento en la primera sílaba \"SU\", no en la penúltima como en español."
          }
        ]
      },
      {
        "id": "a1-u2",
        "unitNum": 2,
        "unitNumber": 2,
        "title": "Workplace Routines, Time & Schedules",
        "titleES": "Rutinas Laborales, Horarios y Turnos",
        "cefrDescriptor": "Can describe daily routines, shift start and end times, break periods, and recurring weekly work activities using simple present structures.",
        "canDo": "Informar a qué hora inicia y termina un turno, describir actividades de rutina y programar descansos.",
        "grammarFocus": "Simple Present (affirmative/negative/questions), Adverbs of Frequency (always, usually, sometimes, never), Prepositions of Time (at 7:00, in the morning, on Monday)",
        "communicativeGoal": "Informar a qué hora inicia y termina un turno, describir actividades de rutina y programar descansos.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Shift Handover",
            "es": "Entrega de turno",
            "ipa": "/ʃɪft ˈhændˌoʊvər/",
            "example": "Shift handover takes place every day at 2:45 PM sharp."
          },
          {
            "en": "Break Room",
            "es": "Comedor / Sala de descanso",
            "ipa": "/breɪk ruːm/",
            "example": "Coffee and filtered water are available in the break room."
          },
          {
            "en": "Daily Log",
            "es": "Bitácora diaria",
            "ipa": "/ˈdeɪli lɔːɡ/",
            "example": "Technicians always update the daily log before leaving their station."
          },
          {
            "en": "Punch In / Punch Out",
            "es": "Checar entrada / salida",
            "ipa": "/pʌntʃ ɪn / pʌntʃ aʊt/",
            "example": "Remember to punch in at the digital clock before putting on PPE."
          },
          {
            "en": "On Time",
            "es": "Puntual / A tiempo",
            "ipa": "/ɑːn taɪm/",
            "example": "The morning safety briefing starts on time at 07:00 AM."
          },
          {
            "en": "Overtime",
            "es": "Horas extras",
            "ipa": "/ˈoʊvərˌtaɪm/",
            "example": "Weekend overtime is optional but requires supervisor approval."
          },
          {
            "en": "Briefing",
            "es": "Reunión informativa rápida",
            "ipa": "/ˈbriːfɪŋ/",
            "example": "We attend a 10-minute briefing at the start of every shift."
          }
        ],
        "dialogue": {
          "title": "Reviewing the Weekly Production Roster",
          "speakers": [
            "Elena (Senior Technician)",
            "Javier (Assembly Operator)"
          ],
          "lines": [
            {
              "speaker": "Elena",
              "text": "Hi Javier, what shift do you work this week on Line 4?"
            },
            {
              "speaker": "Javier",
              "text": "I work the first shift, from 7:00 AM to 3:30 PM, Monday through Friday."
            },
            {
              "speaker": "Elena",
              "text": "Great. When does your crew have the morning safety briefing?"
            },
            {
              "speaker": "Javier",
              "text": "We always hold the safety briefing at 7:15 AM in front of the main Kanban board."
            },
            {
              "speaker": "Elena",
              "text": "And what time is your scheduled lunch break?"
            },
            {
              "speaker": "Javier",
              "text": "First shift takes lunch at 11:30 AM for thirty minutes in Cafeteria B."
            }
          ]
        },
        "reading": {
          "title": "Standard Operating Schedule: Shift Hours & Break Rotations",
          "text": "Plant operations run on three continuous shifts. Shift 1 runs from 07:00 to 15:30. Shift 2 operates from 15:30 to 23:30. Shift 3 runs from 23:30 to 07:00. To prevent production bottlenecks, cafeteria meal times are strictly staggered: Group A dines at 11:30 AM, and Group B dines at 12:15 PM. Operators must never leave active conveyor lines unattended during break handoffs.",
          "question": "Why are cafeteria meal times staggered into two groups?",
          "options": [
            "To clean the tables",
            "To prevent production bottlenecks on the floor",
            "Because there is no food",
            "To close the factory early"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Shift Handover Log Briefing",
          "context": "It is 15:20 PM. The second shift technician approaches your station for handover. You must report completed cycle counts and notify them about upcoming scheduled maintenance.",
          "scenario": "Summarize your daily routine and shift status using Simple Present, time prepositions, and frequency adverbs.",
          "role": "First Shift Assembly Operator",
          "modelResponse": "Hello Javier, first shift produced 420 finished units today on Line 4. The line ran on schedule without stoppage. We always update the digital log before leaving. Scheduled belt maintenance takes place at 4:00 PM.",
          "keywords": [
            "shift",
            "units",
            "schedule",
            "maintenance",
            "produced",
            "line"
          ],
          "rubric": {
            "grammar": "Correct usage of Simple Present and time prepositions (at 4:00 PM, on Line 4).",
            "lexicon": "Include cycle counts, line designation, and maintenance terms.",
            "protocol": "Concise, actionable handover clarity following industrial 5S routines."
          }
        },
        "quiz": [
          {
            "q": "The morning safety briefing starts _____ 7:15 AM every morning.",
            "opts": [
              "in",
              "on",
              "at",
              "to"
            ],
            "ans": 2,
            "exp": "Use \"at\" with clock times."
          },
          {
            "q": "She _____ late to her workstation; she is always on time.",
            "opts": [
              "never is",
              "is never",
              "does never",
              "not is"
            ],
            "ans": 1,
            "exp": "The verb \"to be\" precedes adverbs of frequency: \"is never\"."
          },
          {
            "q": "What _____ you do during the 15:00 PM shift handover?",
            "opts": [
              "do",
              "does",
              "are",
              "did"
            ],
            "ans": 0,
            "exp": "With \"you\" in Simple Present questions, use auxiliary \"do\"."
          },
          {
            "q": "We work on the automated stamping line _____ Mondays and Wednesdays.",
            "opts": [
              "at",
              "in",
              "on",
              "for"
            ],
            "ans": 2,
            "exp": "Use \"on\" with days of the week."
          }
        ],
        "falseCognates": [
          {
            "term": "Notice",
            "mistake": "Noticia periodística",
            "correct": "Aviso formal / Letrero de seguridad / Darse cuenta",
            "tip": "Una noticia es \"News\". En la fábrica, un \"Notice\" es una directiva o circular colocada en el tablero de anuncios."
          },
          {
            "term": "Attend",
            "mistake": "Atender una máquina o cliente",
            "correct": "Asistir a una reunión / junta / turno",
            "tip": "Para atender o arreglar un equipo usa \"Check\" o \"Tend to\". \"Attend\" es tu presencia física: \"We attend the 07:00 briefing.\""
          },
          {
            "term": "Record",
            "mistake": "Recordar mentalmente",
            "correct": "Registrar datos en bitácora / Archivo",
            "tip": "Acordarse de algo es \"Remember\". Escribir lecturas técnicas en el sistema MES es \"Record\" o \"Log\"."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Schedule",
            "stress": "SCHED-ule",
            "ipa": "/ˈskɛdʒuːl/",
            "rule": "En inglés estadounidense inicia con sonido /sk-/, nunca con \"ch\" ni \"sh\"."
          },
          {
            "term": "Maintenance",
            "stress": "MAIN-te-nance",
            "ipa": "/ˈmeɪntənəns/",
            "rule": "Acento primario en la primera sílaba \"MAIN\"; las dos vocales siguientes se reducen a schwa."
          },
          {
            "term": "Handover",
            "stress": "HAND-o-ver",
            "ipa": "/ˈhændˌoʊvər/",
            "rule": "Sustantivo compuesto: el golpe de voz va firmemente en \"HAND\"."
          }
        ]
      },
      {
        "id": "a1-u3",
        "unitNum": 3,
        "unitNumber": 3,
        "title": "Workstation Navigation, Tools & Supplies",
        "titleES": "Ubicación en Planta, Herramientas y Suministros",
        "cefrDescriptor": "Can understand and use simple descriptions of physical layout, inventory cabinets, hand tools, and spatial prepositions.",
        "canDo": "Indicar dónde se guardan herramientas y refacciones, pedir insumos y orientar a compañeros en el edificio.",
        "grammarFocus": "There is / There are, Prepositions of Place (in, on, under, next to, between, across from), Plural Nouns (regular/irregular)",
        "communicativeGoal": "Indicar dónde se guardan herramientas y refacciones, pedir insumos y orientar a compañeros en el edificio.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Toolbox",
            "es": "Caja de herramientas",
            "ipa": "/ˈtuːlˌbɑːks/",
            "example": "There is a calibrated torque wrench in the yellow toolbox."
          },
          {
            "en": "Spare Parts",
            "es": "Refacciones / Piezas de repuesto",
            "ipa": "/spɛər pɑːrts/",
            "example": "Spare parts are kept in Cabinet B across from the tool crib."
          },
          {
            "en": "Safety Goggles",
            "es": "Lentes de seguridad",
            "ipa": "/ˈseɪfti ˈɡɑːɡəlz/",
            "example": "Safety goggles are mandatory inside the production zone."
          },
          {
            "en": "Storage Rack",
            "es": "Estante de almacenamiento",
            "ipa": "/ˈstɔːrɪdʒ ræk/",
            "example": "Raw materials are stacked on the lower storage rack."
          },
          {
            "en": "Emergency Exit",
            "es": "Salida de emergencia",
            "ipa": "/ɪˈmɜːrdʒənsi ˈɛɡzɪt/",
            "example": "The emergency exit is between Line 2 and the testing bay."
          },
          {
            "en": "Calipers",
            "es": "Vernier / Calibrador digital",
            "ipa": "/ˈkælɪpərz/",
            "example": "Use the digital calipers to measure the outer diameter."
          },
          {
            "en": "Tool Crib",
            "es": "Almacén de herramientas",
            "ipa": "/tuːl krɪb/",
            "example": "Sign out precision torque drivers at the central tool crib."
          }
        ],
        "dialogue": {
          "title": "Locating Replacement Optical Sensors",
          "speakers": [
            "Tom (Automation Engineer)",
            "Mateo (Mechatronics Intern)"
          ],
          "lines": [
            {
              "speaker": "Tom",
              "text": "Mateo, where are the replacement optical proximity sensors?"
            },
            {
              "speaker": "Mateo",
              "text": "There are three sealed boxes on the middle shelf, right next to the digital calipers."
            },
            {
              "speaker": "Tom",
              "text": "Great. Is there any electrical insulation tape left in the drawer?"
            },
            {
              "speaker": "Mateo",
              "text": "Yes, there is a fresh roll inside the top drawer of the green mobile cart."
            },
            {
              "speaker": "Tom",
              "text": "Excellent. Please grab the 5mm hex wrench as well before we enter the cell."
            },
            {
              "speaker": "Mateo",
              "text": "Got it. I have the hex wrench and sensors ready."
            }
          ]
        },
        "reading": {
          "title": "5S Tool Organization & Tool Crib Checkout Rules",
          "text": "Under 5S housekeeping standards, every tool has a designated shadow outline. All specialized calibration gauges must be signed out electronically using your employee badge. Operators must clean all grease and metal shavings from calipers before returning them to Shelf 4. Never leave loose hand tools on top of active machine guards or electrical enclosures.",
          "question": "Where must cleaned calipers be returned after use?",
          "options": [
            "Under the conveyor",
            "To Shelf 4 with their shadow outline",
            "In your pocket",
            "On top of the electrical panel"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Tool Crib & LOTO Spatial Orientation",
          "context": "An ISO/OSHA plant auditor approaches your workstation and asks where the primary Lockout/Tagout (LOTO) padlock cabinet and emergency eyewash stations are located.",
          "scenario": "Direct the auditor accurately across the plant floor using \"there is / there are\" and spatial prepositions.",
          "role": "Junior Tooling Technician",
          "modelResponse": "Good afternoon. There is a master Lockout/Tagout padlock cabinet on Wall C, directly between the tool crib and the automated test bay. In addition, there are two emergency eyewash stations located ten feet to your right next to the chemical rack.",
          "keywords": [
            "there is",
            "there are",
            "between",
            "next to",
            "cabinet",
            "station"
          ],
          "rubric": {
            "grammar": "Proper agreement between singular (there is) and plural (there are) structures.",
            "lexicon": "Precise location landmarks (tool crib, wall C, eyewash, cabinet).",
            "protocol": "Courteous auditor guidance following plant 5S layout standards."
          }
        },
        "quiz": [
          {
            "q": "_____ two emergency eyewash stations next to the chemical storage enclosure.",
            "opts": [
              "There is",
              "There are",
              "They have",
              "Are there"
            ],
            "ans": 1,
            "exp": "Use \"There are\" with plural nouns (\"two stations\")."
          },
          {
            "q": "The digital multimeters are stored _____ the top drawer of Cabinet 3.",
            "opts": [
              "in",
              "at",
              "on to",
              "between"
            ],
            "ans": 0,
            "exp": "Use \"in\" for items placed inside a drawer or container."
          },
          {
            "q": "How do you say \"lentes de seguridad\" in Standard American workplace English?",
            "opts": [
              "Safety shoes",
              "Safety goggles",
              "Safety helmet",
              "Safety harness"
            ],
            "ans": 1,
            "exp": "\"Safety goggles\" or \"safety glasses\" is standard."
          },
          {
            "q": "The emergency fire extinguisher is located _____ the main entrance and the tool crib.",
            "opts": [
              "between",
              "under",
              "into",
              "among of"
            ],
            "ans": 0,
            "exp": "Use \"between\" when referencing two specific landmarks."
          }
        ],
        "falseCognates": [
          {
            "term": "Facility",
            "mistake": "Facilidad de hacer algo",
            "correct": "Planta industrial / Instalación física",
            "tip": "La facilidad o destreza se dice \"Ease\". \"Facility\" se refiere a la nave industrial, campus o edificio de manufactura."
          },
          {
            "term": "Large",
            "mistake": "Largo en longitud",
            "correct": "Grande en volumen o tamaño",
            "tip": "Para decir que una banda transportadora es larga usa \"Long\". \"Large\" significa grande o espacioso."
          },
          {
            "term": "Exit",
            "mistake": "Éxito laboral",
            "correct": "Salida de emergencia / Puerta de evacuación",
            "tip": "Éxito profesional se dice \"Success\". \"Emergency Exit\" es la puerta o ruta de evacuación reglamentaria."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Calipers",
            "stress": "CAL-i-pers",
            "ipa": "/ˈkælɪpərz/",
            "rule": "Acento en la primera sílaba \"CAL\"; la \"p\" se pronuncia nítida."
          },
          {
            "term": "Equipment",
            "stress": "e-QUIP-ment",
            "ipa": "/ɪˈkwɪpmənt/",
            "rule": "Acento en \"QUIP\". Es incontable en inglés técnico (nunca digas \"equipments\")."
          },
          {
            "term": "Extinguisher",
            "stress": "ex-TING-guish-er",
            "ipa": "/ɪkˈstɪŋɡwɪʃər/",
            "rule": "Acento en la segunda sílaba \"TING\" con sonido /ŋg/."
          }
        ]
      },
      {
        "id": "a1-u4",
        "unitNum": 4,
        "unitNumber": 4,
        "title": "Simple Directives, Safety Signs & Protocols",
        "titleES": "Instrucciones Simples, Imperativos y Señalética de Seguridad",
        "cefrDescriptor": "Can understand short, simple safety warnings, follow imperative directives, and make clear polite requests in workplace contexts.",
        "canDo": "Comprender letreros de advertencia en equipo de trabajo, pedir materiales con cortesía y seguir listas de verificación simples.",
        "grammarFocus": "Imperatives (Do / Do not / Don't), Modal \"Can\" for polite requests (Can you pass me...?), Polite markers (Please, Thank you, Excuse me)",
        "communicativeGoal": "Comprender letreros de advertencia en equipo de trabajo, pedir materiales con cortesía y seguir listas de verificación simples.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Caution",
            "es": "Precaución / Advertencia",
            "ipa": "/ˈkɔːʃən/",
            "example": "Caution: Hot surface, do not touch without heat-resistant gloves."
          },
          {
            "en": "Ear Protection",
            "es": "Protección auditiva",
            "ipa": "/ɪər prəˈtɛkʃən/",
            "example": "Ear protection is required beyond this yellow boundary line."
          },
          {
            "en": "Shut Down",
            "es": "Apagar / Desconectar",
            "ipa": "/ʃʌt daʊn/",
            "example": "Please shut down the conveyor motor before clearing the jam."
          },
          {
            "en": "Authorized Personnel",
            "es": "Personal autorizado",
            "ipa": "/ˈɔːθəˌraɪzd ˌpɜːrsəˈnɛl/",
            "example": "High-voltage enclosure: authorized licensed personnel only."
          },
          {
            "en": "Keep Clear",
            "es": "Mantener despejado",
            "ipa": "/kiːp klɪər/",
            "example": "Keep this forklift corridor clear of wooden pallets at all times."
          },
          {
            "en": "Emergency Stop",
            "es": "Paro de emergencia (E-Stop)",
            "ipa": "/ɪˈmɜːrdʒənsi stɑːp/",
            "example": "Hit the red mushroom emergency stop button in case of jam."
          },
          {
            "en": "Hard Hat",
            "es": "Casco de seguridad",
            "ipa": "/hɑːrd hæt/",
            "example": "Wear your hard hat inside the overhead crane zone."
          }
        ],
        "dialogue": {
          "title": "Requesting Immediate Line Feeder Shutdown",
          "speakers": [
            "Rachel (Line Lead)",
            "David (Maintenance Apprentice)"
          ],
          "lines": [
            {
              "speaker": "Rachel",
              "text": "David, please stop the feeder conveyor for a moment."
            },
            {
              "speaker": "David",
              "text": "Sure. Done. The red beacon is on. Is there a problem?"
            },
            {
              "speaker": "Rachel",
              "text": "Yes, can you hand me the 10mm Allen wrench from the magnetic tray?"
            },
            {
              "speaker": "David",
              "text": "Here you go. Do you need an inspection flashlight as well?"
            },
            {
              "speaker": "Rachel",
              "text": "Yes, please. Hold it right here on the lower motor bracket."
            },
            {
              "speaker": "David",
              "text": "Careful! The notice says the gear housing is extremely hot."
            },
            {
              "speaker": "Rachel",
              "text": "Good catch. Put on your thermal gloves before touching the casing."
            }
          ]
        },
        "reading": {
          "title": "Plant Safety Directive: OSHA & Lockout Warning Placard",
          "text": "DANGER: AUTOMATIC EQUIPMENT MAY ENERGIZE OR START WITHOUT NOTICE. Always verify Lockout/Tagout (LOTO) de-energization before reaching into mechanical pinch points. Keep hands and loose clothing away from rotating spindle drives. Do not bypass safety interlock switches under any operational circumstances.",
          "question": "What must technicians do before reaching into mechanical pinch points?",
          "options": [
            "Turn on the lights",
            "Verify Lockout/Tagout de-energization",
            "Increase conveyor velocity",
            "Remove safety goggles"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Restricted Robotic Cell Safety Interlock Protocol",
          "context": "An unbadged outside contractor steps past the yellow floor demarcation toward an active high-voltage robotic welding cell without safety eyewear or hard hat.",
          "scenario": "Intervene immediately and assertively using polite yet firm imperatives and safety directives.",
          "role": "Safety Warden Assistant",
          "modelResponse": "Excuse me, please stop immediately. Safety goggles and hard hats are mandatory beyond the yellow line. This is a restricted high-voltage robotic cell. Do not cross the safety interlock line. Please report to the security office to sign in.",
          "keywords": [
            "stop",
            "mandatory",
            "safety goggles",
            "restricted",
            "do not",
            "wear"
          ],
          "rubric": {
            "grammar": "Assertive use of positive and negative imperatives (Stop, Do not cross, Please report).",
            "lexicon": "Correct safety terminology (mandatory, safety goggles, yellow line, interlock).",
            "protocol": "OSHA compliance firmness balanced with professional workplace etiquette."
          }
        },
        "quiz": [
          {
            "q": "_____ touch the red emergency button unless there is immediate danger to personnel or tooling.",
            "opts": [
              "Not",
              "Do not",
              "No to",
              "Are not"
            ],
            "ans": 1,
            "exp": "Negative imperative directives begin with \"Do not\" or \"Don't\"."
          },
          {
            "q": "Excuse me, _____ you pass me the 10mm socket wrench, please?",
            "opts": [
              "can",
              "do",
              "must",
              "have"
            ],
            "ans": 0,
            "exp": "\"Can you [verb]...?\" is the standard polite workplace request."
          },
          {
            "q": "What does a high-visibility yellow sign saying \"KEEP CLEAR\" mean?",
            "opts": [
              "Store excess pallets here",
              "Do not obstruct this pathway with objects",
              "Clean this once per month",
              "Authorized parking only"
            ],
            "ans": 1,
            "exp": "\"Keep clear\" means keep the area completely unobstructed."
          },
          {
            "q": "Please _____ your safety helmet before entering the overhead gantry area.",
            "opts": [
              "wear",
              "wears",
              "wearing",
              "to wear"
            ],
            "ans": 0,
            "exp": "Imperative verbs use the base infinitive form without \"to\"."
          }
        ],
        "falseCognates": [
          {
            "term": "Injury",
            "mistake": "Injuria verbal / Ofensa",
            "correct": "Lesión física / Herida de trabajo",
            "tip": "Un insulto es \"Insult\". En reportes OSHA, \"Injury\" es un daño físico o traumatismo corporal ocurrido en el trabajo."
          },
          {
            "term": "Precaution",
            "mistake": "Precaución (ojo con la ortografía)",
            "correct": "Medida preventiva de seguridad",
            "tip": "En inglés se escribe con \"c\" intermedia (precaution); el adjetivo es \"cautious\"."
          },
          {
            "term": "Fabricate",
            "mistake": "Fabricar mentiras o historias",
            "correct": "Manufacturar piezas estructurales de metal/plástico",
            "tip": "En plantas automotrices y aeroespaciales, \"fabrication\" es el corte, soldadura y ensamblado de partes metálicas."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Hazard",
            "stress": "HAZ-ard",
            "ipa": "/ˈhæzərd/",
            "rule": "Acento en la primera sílaba; la \"z\" tiene vibración sonora."
          },
          {
            "term": "Mandatory",
            "stress": "MAN-da-to-ry",
            "ipa": "/ˈmændətɔːri/",
            "rule": "Acento primario en la primera sílaba \"MAN\"."
          },
          {
            "term": "Interlock",
            "stress": "IN-ter-lock",
            "ipa": "/ˈɪntərˌlɑːk/",
            "rule": "Sustantivo técnico: acento fuerte en la primera sílaba \"IN\"."
          }
        ]
      }
    ],
    "milestone": {
      "title": "Milestone Checkpoint A1: Novice Workplace Communicator",
      "questions": 10,
      "passingGrade": 80,
      "badgeId": "badge-mcer-a1",
      "badgeName": "CEFR A1: Foundations in Standard American English (60.0h Course)",
      "totalHours": 60,
      "accreditation": "CACEI / DGUTyP Inglés I"
    }
  },
  {
    "id": "mcer-a2",
    "code": "A2",
    "name": "Waystage / Elementary",
    "nameES": "Nivel A2: Operaciones Laborales y Comunicación Práctica (Inglés II)",
    "badge": "CEFR A2 Waystage",
    "color": "#38bdf8",
    "icon": "fa-cubes",
    "totalHours": 60,
    "totalXP": 5600,
    "summary": "Acredita 60.0 horas curriculares (Inglés II). Capacita al alumno para relatar actividades pasadas e incidentes menores, comparar herramientas y piezas por especificaciones técnicas, programar juntas y describir desperfectos con cortesía.",
    "units": [
      {
        "id": "a2-u1",
        "unitNum": 1,
        "unitNumber": 1,
        "title": "Past Actions & Shift Incident Logs",
        "titleES": "Acciones Pasadas y Registro de Incidentes",
        "cefrDescriptor": "Can describe past events, past mechanical breakdowns, and equipment maintenance actions using simple past sentences.",
        "canDo": "Explicar qué ocurrió en el turno anterior, reportar anomalías pasadas y redactar bitácoras breves de trabajo.",
        "grammarFocus": "Simple Past (regular verbs -ed, common irregular verbs: went, saw, had, spoke, made), Time expressions (yesterday, last night, two hours ago), Past questions with Did",
        "communicativeGoal": "Explicar qué ocurrió en el turno anterior, reportar anomalías pasadas y redactar bitácoras breves de trabajo.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Malfunction",
            "es": "Falla / Desperfecto",
            "ipa": "/mælˈfʌŋkʃən/",
            "example": "The hydraulic pump malfunctioned around 11:30 AM yesterday."
          },
          {
            "en": "Replaced",
            "es": "Reemplazado / Cambiado",
            "ipa": "/rɪˈpleɪst/",
            "example": "We replaced the worn timing belt during preventive maintenance."
          },
          {
            "en": "Inspection",
            "es": "Inspección técnica",
            "ipa": "/ɪnˈspɛkʃən/",
            "example": "Quality completed the dimensional inspection this morning."
          },
          {
            "en": "Downtime",
            "es": "Tiempo muerto / Paro de línea",
            "ipa": "/ˈdaʊnˌtaɪm/",
            "example": "Line 2 experienced 45 minutes of unexpected downtime."
          },
          {
            "en": "Logged",
            "es": "Registrado en bitácora",
            "ipa": "/lɔːɡd/",
            "example": "The technician logged the voltage variance in the shift binder."
          },
          {
            "en": "Tripped",
            "es": "Disparado (interruptor térmico)",
            "ipa": "/trɪpt/",
            "example": "The main circuit breaker tripped due to excessive motor current."
          },
          {
            "en": "Calibrated",
            "es": "Calibrado",
            "ipa": "/ˈkælɪˌbreɪtɪd/",
            "example": "We calibrated the load cell before starting production."
          }
        ],
        "dialogue": {
          "title": "Morning Shift Handover & Incident Triangulation",
          "speakers": [
            "Luis (Night Shift Lead)",
            "Claudia (Morning Shift Lead)"
          ],
          "lines": [
            {
              "speaker": "Luis",
              "text": "Good morning, Claudia. Here is the shift handover log for Line 4."
            },
            {
              "speaker": "Claudia",
              "text": "Thanks, Luis. Did you experience any downtime during the graveyard shift?"
            },
            {
              "speaker": "Luis",
              "text": "Yes, Station 4 stopped for about thirty minutes because a proximity sensor came loose."
            },
            {
              "speaker": "Claudia",
              "text": "Did the maintenance technician replace the unit?"
            },
            {
              "speaker": "Luis",
              "text": "No, he tightened the mounting bracket and recalibrated the beam. It ran smoothly afterward."
            },
            {
              "speaker": "Claudia",
              "text": "Did you log the stop in the digital MES system?"
            },
            {
              "speaker": "Luis",
              "text": "Yes, I logged code E-104 and recorded thirty minutes of total downtime."
            }
          ]
        },
        "reading": {
          "title": "Maintenance Log Summary: Overheated Spindle Bearing",
          "text": "Date: Oct 18. Technician: R. Gomez. At 14:15, spindle drive #3 overheated and triggered thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature stabilized at 48°C. Total downtime was 30 minutes.",
          "question": "What maintenance actions were performed on drive #3?",
          "options": [
            "They replaced the motor entirely",
            "They inspected the reservoir, cleaned the filter, and restarted it",
            "They painted the enclosure",
            "They called the supplier in Japan"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Shift Handover Incident Triangulation",
          "context": "A sensor misalignment caused 30 minutes of downtime on CNC Mill #2 during yesterday afternoon. The incoming lead asks for an explanation of root causes and corrective actions.",
          "scenario": "Report the past mechanical breakdown and maintenance resolution using Simple Past and time adverbs.",
          "role": "Mechatronics Maintenance Specialist",
          "modelResponse": "Yesterday at 14:15, spindle drive number 3 overheated and tripped thermal alarm code E-04. The maintenance crew inspected the lubricating reservoir, cleaned the air intake filter, and restarted the line. Normal operating temperature stabilized at 48 degrees Celsius after thirty minutes of downtime.",
          "keywords": [
            "overheated",
            "tripped",
            "inspected",
            "restarted",
            "downtime",
            "stabilized"
          ],
          "rubric": {
            "grammar": "Consistent Simple Past inflection on regular (-ed) and irregular verbs.",
            "lexicon": "Accurate mechanical terminology (spindle drive, thermal alarm, reservoir, filter).",
            "protocol": "Chronological timeline reporting complying with standard shift logs."
          }
        },
        "quiz": [
          {
            "q": "Yesterday the maintenance crew _____ the damaged pneumatic cylinder.",
            "opts": [
              "replace",
              "replaced",
              "was replace",
              "replacing"
            ],
            "ans": 1,
            "exp": "Simple Past regular verbs take \"-ed\": replaced."
          },
          {
            "q": "_____ you verify the sensor calibration before resuming production?",
            "opts": [
              "Did",
              "Do",
              "Were",
              "Have"
            ],
            "ans": 0,
            "exp": "Simple Past questions with main verbs use auxiliary \"Did\"."
          },
          {
            "q": "What does \"downtime\" mean in advanced manufacturing?",
            "opts": [
              "Break time for lunch",
              "Period when production machinery is halted and unproductive",
              "Weekend shifts",
              "Overtime pay"
            ],
            "ans": 1,
            "exp": "Downtime refers to non-productive machine stoppage."
          },
          {
            "q": "The circuit breaker _____ last night when voltage surged above 480V.",
            "opts": [
              "trip",
              "tripped",
              "is tripping",
              "has trip"
            ],
            "ans": 1,
            "exp": "Past of regular verb trip doubles the \"p\": tripped."
          }
        ],
        "falseCognates": [
          {
            "term": "Current",
            "mistake": "Corriente ordinaria / Vulgar",
            "correct": "Actual / Corriente eléctrica (amperios)",
            "tip": "Común y vulgar se dice \"Ordinary\" o \"Common\". En plantas, \"Current\" es corriente eléctrica o el estado actual de un sistema."
          },
          {
            "term": "Compromise",
            "mistake": "Comprometerse con una cita o deber",
            "correct": "Acordar una solución intermedia / Arriesgar la integridad",
            "tip": "Comprometerse formalmente se dice \"Commit\". \"Compromise\" significa ceder para llegar a un acuerdo o poner en riesgo una pieza."
          },
          {
            "term": "Event",
            "mistake": "Evento social o fiesta",
            "correct": "Incidente / Disparo técnico de alarma",
            "tip": "En sistemas SCADA/PLC, un \"Event\" es cualquier cambio de estado, paro o activación de sensor registrado en bitácora."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Malfunction",
            "stress": "mal-FUNC-tion",
            "ipa": "/mælˈfʌŋkʃən/",
            "rule": "El prefijo \"mal-\" es átono; el golpe de voz recae firmemente en \"FUNC\"."
          },
          {
            "term": "Calibrated",
            "stress": "CAL-i-brat-ed",
            "ipa": "/ˈkælɪˌbreɪtɪd/",
            "rule": "Palabra de 4 sílabas; la terminación \"-ed\" se pronuncia /ɪd/ tras la \"t\"."
          },
          {
            "term": "Stabilized",
            "stress": "STA-bi-lized",
            "ipa": "/ˈsteɪbəˌlaɪzd/",
            "rule": "Acento en la primera sílaba; la terminación \"-ed\" suena como /d/ suave."
          }
        ]
      },
      {
        "id": "a2-u2",
        "unitNum": 2,
        "unitNumber": 2,
        "title": "Comparing Equipment, Specs & Materials",
        "titleES": "Comparación de Equipos, Especificaciones y Materiales",
        "cefrDescriptor": "Can compare technical items, dimensions, tolerances, materials, and machinery options using comparative and superlative forms.",
        "canDo": "Comparar dos opciones técnicas de refacciones o equipos, sustentando cuál es más rápida, duradera o económica.",
        "grammarFocus": "Comparative and Superlative Adjectives (cheaper than, more durable than, fastest, most efficient), as... as, Quantity expressions (more, less, fewer)",
        "communicativeGoal": "Comparar dos opciones técnicas de refacciones o equipos, sustentando cuál es más rápida, duradera o económica.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Durable",
            "es": "Duradero / Resistente",
            "ipa": "/ˈdʊrəbəl/",
            "example": "Carbide cutting tips are significantly more durable than high-speed steel."
          },
          {
            "en": "Lightweight",
            "es": "Ligero / De bajo peso",
            "ipa": "/ˈlaɪtˌweɪt/",
            "example": "Aluminum alloys are lighter than structural carbon steel."
          },
          {
            "en": "Cost-Effective",
            "es": "Rentable / Eficiente en costo",
            "ipa": "/ˌkɔːst ɪˈfɛktɪv/",
            "example": "Refurbishing servo drives is more cost-effective than buying replacements."
          },
          {
            "en": "Tolerance",
            "es": "Tolerancia de precisión",
            "ipa": "/ˈtɑːlərəns/",
            "example": "The wire EDM machine holds a tighter tolerance than the CNC mill."
          },
          {
            "en": "Throughput",
            "es": "Rendimiento / Volumen de piezas",
            "ipa": "/ˈθruːˌpʊt/",
            "example": "The multi-spindle lathe achieves a higher throughput per hour."
          },
          {
            "en": "Corrosion-Resistant",
            "es": "Resistente a la corrosión",
            "ipa": "/kəˈroʊʒən rɪˈzɪstənt/",
            "example": "Stainless steel 316 is more corrosion-resistant in marine environments."
          }
        ],
        "dialogue": {
          "title": "Selecting Tooling Material for High-Speed Milling",
          "speakers": [
            "Sara (Procurement Engineer)",
            "Ken (Lead Machinist)"
          ],
          "lines": [
            {
              "speaker": "Sara",
              "text": "Ken, we have two vendor quotes for our end-mill bits: carbide and cobalt steel."
            },
            {
              "speaker": "Ken",
              "text": "Cobalt steel is cheaper, but carbide tooling is much more durable at high RPMs."
            },
            {
              "speaker": "Sara",
              "text": "Will carbide survive our thermal stress specs during titanium milling?"
            },
            {
              "speaker": "Ken",
              "text": "Yes, carbide is the most heat-resistant material for this aerospace bracket."
            },
            {
              "speaker": "Sara",
              "text": "Then carbide is the most cost-effective option over the full production run."
            },
            {
              "speaker": "Ken",
              "text": "Agreed. It will give us a tighter tolerance and fewer tool changes."
            }
          ]
        },
        "reading": {
          "title": "Material Comparison Report: Polycarbonate vs Acrylic Guards",
          "text": "When selecting clear machine safety enclosures, polycarbonate provides 250 times the impact resistance of standard tempered glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant and marginally cheaper, polycarbonate is significantly safer for high-pressure pneumatic chip containment under ISO 14120 safety regulations.",
          "question": "Why is polycarbonate chosen over acrylic for machine enclosures?",
          "options": [
            "It is cheaper than glass",
            "It provides twice the impact resistance for high-pressure debris containment",
            "It is made of recycled wood",
            "It bends without heat"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Tooling Material Trade-Off Defense",
          "context": "You must justify to the plant tooling manager why the plant should purchase Tungsten Carbide milling inserts instead of cheaper High-Speed Steel (HSS) cutters.",
          "scenario": "Defend your recommendation using comparative and superlative adjectives and quantifiable metrics.",
          "role": "Manufacturing Process Technician",
          "modelResponse": "I recommend purchasing Tungsten Carbide inserts for the CNC milling cells. Although Carbide is twenty percent more expensive than High-Speed Steel, it is significantly more durable at high cutting speeds. It provides tighter dimensional tolerance and achieves fifteen percent higher throughput with fewer tool changes.",
          "keywords": [
            "recommend",
            "more durable",
            "expensive",
            "throughput",
            "tolerance",
            "faster"
          ],
          "rubric": {
            "grammar": "Proper comparative (more durable than, higher than) and superlative forms.",
            "lexicon": "Quantifiable operational metrics (throughput, tolerance, cutting speeds, tool wear).",
            "protocol": "Compelling cost-benefit engineering justification."
          }
        },
        "quiz": [
          {
            "q": "The new multi-axis robotic cell is _____ than the legacy pneumatic pick-and-place.",
            "opts": [
              "fast",
              "faster",
              "more fast",
              "fastest"
            ],
            "ans": 1,
            "exp": "One-syllable adjectives take \"-er\": faster than."
          },
          {
            "q": "Stainless steel fasteners are _____ expensive than zinc fasteners, but they resist corrosion better.",
            "opts": [
              "much",
              "more",
              "most",
              "as"
            ],
            "ans": 1,
            "exp": "Multi-syllable adjectives take \"more\": more expensive."
          },
          {
            "q": "Which machine in the toolroom holds the _____ dimensional tolerance?",
            "opts": [
              "tight",
              "tighter",
              "tightest",
              "more tight"
            ],
            "ans": 2,
            "exp": "Superlatives take \"the\" + \"-est\": tightest."
          },
          {
            "q": "Titanium is not as heavy _____ stainless steel of equivalent volume.",
            "opts": [
              "than",
              "as",
              "that",
              "from"
            ],
            "ans": 1,
            "exp": "Equality comparisons use \"as [adjective] as\"."
          }
        ],
        "falseCognates": [
          {
            "term": "Sensible",
            "mistake": "Sensible al calor o luz",
            "correct": "Sensato / Razonable / Juicioso",
            "tip": "Si un sensor o material reacciona con facilidad a la temperatura, usa \"Sensitive\". \"Sensible\" significa una decisión inteligente."
          },
          {
            "term": "Eventual",
            "mistake": "Eventual de vez en cuando",
            "correct": "Definitivo / Que ocurrirá al final a largo plazo",
            "tip": "Ocasional se dice \"Occasional\". \"Eventual wear\" se refiere al desgaste final e inevitable con el tiempo."
          },
          {
            "term": "Particular",
            "mistake": "Privado o peculiar",
            "correct": "Específico / Concreto en especificaciones",
            "tip": "En fichas técnicas, \"in this particular application\" significa \"en esta aplicación técnica específica\"."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Tolerance",
            "stress": "TOL-er-ance",
            "ipa": "/ˈtɑːlərəns/",
            "rule": "Acento en la primera sílaba \"TOL\"; las siguientes dos sílabas son breves y neutras."
          },
          {
            "term": "Throughput",
            "stress": "THROUGH-put",
            "ipa": "/ˈθruːˌpʊt/",
            "rule": "Inicia con la fricativa interdental sorda /θ/; acento fuerte en \"THROUGH\"."
          },
          {
            "term": "Corrosion",
            "stress": "cor-RO-sion",
            "ipa": "/kəˈroʊʒən/",
            "rule": "Acento en la segunda sílaba \"RO\"; la terminación \"-sion\" suena con fricativa sonora /ʒ/."
          }
        ]
      },
      {
        "id": "a2-u3",
        "unitNum": 3,
        "unitNumber": 3,
        "title": "Scheduling, Agendas & Future Deadlines",
        "titleES": "Agendas, Fechas Límite y Planes Futuros",
        "cefrDescriptor": "Can communicate future production schedules, schedule vendor appointments, and express target dates using appropriate future tenses.",
        "canDo": "Agendar juntas técnicas, confirmar fechas de entrega con proveedores y coordinar citas de mantenimiento.",
        "grammarFocus": "Future with \"going to\" (planned intentions), Future with \"will\" (offers/spontaneous decisions), Time clauses (when, as soon as, by next Friday)",
        "communicativeGoal": "Agendar juntas técnicas, confirmar fechas de entrega con proveedores y coordinar citas de mantenimiento.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Deadline",
            "es": "Fecha límite / Plazo de entrega",
            "ipa": "/ˈdɛdˌlaɪn/",
            "example": "The hard deadline for the pre-production sample is next Thursday."
          },
          {
            "en": "Reschedule",
            "es": "Reprogramar / Reagendar",
            "ipa": "/riːˈskɛdʒuːl/",
            "example": "Can we reschedule the laser calibration review to 10:00 AM?"
          },
          {
            "en": "Milestone",
            "es": "Hito / Etapa clave",
            "ipa": "/ˈmaɪlˌstoʊn/",
            "example": "Reaching 50,000 continuous cycles is our primary project milestone."
          },
          {
            "en": "Delivery Date",
            "es": "Fecha de entrega",
            "ipa": "/dɪˈlɪvəri deɪt/",
            "example": "The steel vendor confirmed the raw billet delivery date for Monday morning."
          },
          {
            "en": "Follow Up",
            "es": "Dar seguimiento",
            "ipa": "/ˈfɑːloʊ ʌp/",
            "example": "I will follow up with the plant director after the ISO audit."
          },
          {
            "en": "Shutdown",
            "es": "Paro programado de planta",
            "ipa": "/ˈʃʌtˌdaʊn/",
            "example": "Annual electrical substation shutdown takes place in December."
          }
        ],
        "dialogue": {
          "title": "Scheduling the Annual Metrology Audit",
          "speakers": [
            "Patricia (Quality Specialist)",
            "Mr. Barnes (External Auditor)"
          ],
          "lines": [
            {
              "speaker": "Patricia",
              "text": "Good morning, Mr. Barnes. We are going to conduct our annual metrology audit next month."
            },
            {
              "speaker": "Mr. Barnes",
              "text": "Hello Patricia. What dates are best for your engineering team?"
            },
            {
              "speaker": "Patricia",
              "text": "We are planning for Tuesday the 14th. Will your inspection crew be ready by then?"
            },
            {
              "speaker": "Mr. Barnes",
              "text": "Yes, I will confirm the flight details and email the calibration certificates today."
            },
            {
              "speaker": "Patricia",
              "text": "Perfect. We will arrange cleanroom visitor badges before your arrival."
            },
            {
              "speaker": "Mr. Barnes",
              "text": "Thank you. I will see you on the 14th at 08:30 AM."
            }
          ]
        },
        "reading": {
          "title": "Facility Preventive Maintenance Notice: Substation Shut-Off",
          "text": "Notice: Next Saturday, November 3rd, the main electrical substation will be shut down from 06:00 to 14:00 for transformer dielectric oil analysis. Backup diesel generators will supply emergency lighting and critical server racks only. All production equipment must be fully de-energized by Friday afternoon at 17:00.",
          "question": "When must all production machinery be de-energized?",
          "options": [
            "Saturday morning",
            "By Friday afternoon at 17:00",
            "On Sunday evening",
            "Next month"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Facility Preventive Substation Shutdown Coordination",
          "context": "The main electrical substation requires a 4-hour scheduled maintenance shutdown next Friday. You must announce the plan and backup arrangements to the line leads.",
          "scenario": "Present the upcoming maintenance schedule using future tenses (going to / will) and deadline time markers.",
          "role": "Production Scheduling Coordinator",
          "modelResponse": "Good morning leads. We are going to conduct scheduled preventive maintenance on electrical substation B next Friday from 02:00 to 06:00 AM. Production Line 1 will shut down during this four-hour window. Backup diesel generators will supply power to cleanroom Bay 3, and normal operations will resume promptly at 06:30 AM.",
          "keywords": [
            "going to",
            "scheduled",
            "maintenance",
            "will shut down",
            "generators",
            "resume"
          ],
          "rubric": {
            "grammar": "Distinction between planned schedules (are going to) and future commitments (will supply/resume).",
            "lexicon": "Industrial power terminology (substation, generators, shutdown window, maintenance).",
            "protocol": "Professional interdepartmental communication ensuring zero surprise downtime."
          }
        },
        "quiz": [
          {
            "q": "We _____ to install the upgraded safety light curtains next Monday morning.",
            "opts": [
              "are going",
              "will going",
              "going",
              "is going"
            ],
            "ans": 0,
            "exp": "Use \"are going [to verb]\" for pre-planned group schedules."
          },
          {
            "q": "Don't worry about the supplier email; I _____ send it right now.",
            "opts": [
              "am going",
              "will",
              "did",
              "have"
            ],
            "ans": 1,
            "exp": "Use \"will\" for spontaneous decisions and immediate offers."
          },
          {
            "q": "Please submit your tooling inventory data _____ Friday at 15:00 PM.",
            "opts": [
              "on",
              "by",
              "until to",
              "in"
            ],
            "ans": 1,
            "exp": "\"By [time/day]\" specifies a deadline on or before that point."
          },
          {
            "q": "We will inspect the circuit boards as soon as the courier _____.",
            "opts": [
              "arrives",
              "will arrive",
              "arrived",
              "is arriving"
            ],
            "ans": 0,
            "exp": "Time clauses with \"as soon as\" take Simple Present for future reference."
          }
        ],
        "falseCognates": [
          {
            "term": "Intend",
            "mistake": "Intentar hacer algo",
            "correct": "Planear / Tener la firme intención de hacer algo",
            "tip": "Intentar o tratar se dice \"Try\" o \"Attempt\". \"Intend\" expresa planes programados: \"We intend to install the sensors next week.\""
          },
          {
            "term": "Resume",
            "mistake": "Resumir un texto",
            "correct": "Reanudar operaciones / Currículum vítae",
            "tip": "Hacer un resumen es \"Summarize\". En el piso de producción, \"Resume conveyor operation\" significa volver a poner en marcha la línea."
          },
          {
            "term": "Estimate",
            "mistake": "Estimar afectuosamente",
            "correct": "Calcular costo / Presupuesto técnico",
            "tip": "En ingeniería de proyectos, un \"Cost Estimate\" es un cálculo formal de materiales y horas de ingeniería."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Preventive",
            "stress": "pre-VEN-tive",
            "ipa": "/prɪˈvɛntɪv/",
            "rule": "Acento en la segunda sílaba \"VEN\", no en la primera."
          },
          {
            "term": "Overhaul",
            "stress": "O-ver-haul",
            "ipa": "/ˈoʊvərˌhɔːl/",
            "rule": "Sustantivo compuesto: el acento principal está en \"O\"."
          },
          {
            "term": "Substation",
            "stress": "SUB-sta-tion",
            "ipa": "/ˈsʌbˌsteɪʃən/",
            "rule": "Acento primario en la primera sílaba \"SUB\"."
          }
        ]
      },
      {
        "id": "a2-u4",
        "unitNum": 4,
        "unitNumber": 4,
        "title": "Troubleshooting & Describing Problems",
        "titleES": "Resolución de Problemas y Descripción de Fallas",
        "cefrDescriptor": "Can describe mechanical, pneumatic, and electrical symptoms, abnormal sounds, and communicate with technical support clearly.",
        "canDo": "Describir ruidos anómalos, fugas, sobrecalentamientos y solicitar asistencia técnica sin malentendidos.",
        "grammarFocus": "Modals for obligation and advice (should, must, have to), Present Continuous for ongoing anomalies (is vibrating, are leaking), Stative vs Dynamic verbs",
        "communicativeGoal": "Describir ruidos anómalos, fugas, sobrecalentamientos y solicitar asistencia técnica sin malentendidos.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Leak",
            "es": "Fuga / Goteo",
            "ipa": "/liːk/",
            "example": "There is a hydraulic fluid leak under the main clamp cylinder."
          },
          {
            "en": "Vibration",
            "es": "Vibración excesiva",
            "ipa": "/vaɪˈbreɪʃən/",
            "example": "The blower motor has an abnormal vibration at high speeds."
          },
          {
            "en": "Overheating",
            "es": "Sobrecalentamiento",
            "ipa": "/ˌoʊvərˈhiːtɪŋ/",
            "example": "The servo controller is overheating due to blocked air ventilation."
          },
          {
            "en": "Tighten",
            "es": "Apretar / Ajustar",
            "ipa": "/ˈtaɪtən/",
            "example": "Please tighten the four hex bolts to 35 Newton-meters."
          },
          {
            "en": "Reset",
            "es": "Reiniciar / Restablecer",
            "ipa": "/riːˈsɛt/",
            "example": "Press and hold the blue button for three seconds to reset the PLC."
          },
          {
            "en": "Air Pressure Drop",
            "es": "Caída de presión neumática",
            "ipa": "/ɛər ˈprɛʃər drɑːp/",
            "example": "An air pressure drop caused the pneumatic gripper to release."
          }
        ],
        "dialogue": {
          "title": "Reporting an Air Pressure Drop in Pneumatic Cell",
          "speakers": [
            "Oscar (Machine Operator)",
            "Sam (Maintenance Technician)"
          ],
          "lines": [
            {
              "speaker": "Oscar",
              "text": "Sam, can you take a look at Station 2? The pneumatic pick-and-place is moving very sluggishly."
            },
            {
              "speaker": "Sam",
              "text": "Sure. Let me check the inline pressure regulator. It shows 40 PSI, but it should be 85 PSI."
            },
            {
              "speaker": "Oscar",
              "text": "Do you hear that hissing sound behind the manifold block?"
            },
            {
              "speaker": "Sam",
              "text": "Yes, the quick-disconnect fitting is leaking compressed air. We must shut the air valve and replace the O-ring."
            },
            {
              "speaker": "Oscar",
              "text": "Understood. I will hit the pneumatic isolation valve right now."
            },
            {
              "speaker": "Sam",
              "text": "Thanks. Always bleed the residual line pressure before disconnecting the hose."
            }
          ]
        },
        "reading": {
          "title": "Basic Machine Troubleshooting Flowchart: Alarm Code E-12",
          "text": "Alarm E-12 indicates pneumatic actuator timeout. Step 1: Inspect the main air supply gauge. If pressure is below 6.0 bar, verify that the facility main ball valve is open. Step 2: Check cylinder reed sensors for magnetic alignment. If the green LED does not illuminate at stroke end, adjust sensor position. Step 3: Check for audible hose leaks. Step 4: If issue persists, notify shift supervisor.",
          "question": "What does Step 2 advise if the cylinder reed sensor LED does not illuminate?",
          "options": [
            "Replace the whole PLC",
            "Adjust the magnetic sensor position on the cylinder body",
            "Ignore the LED",
            "Turn off all plant power"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Digital Torque Wrench SOP Standard Training",
          "context": "A newly onboarded assembly technician is setting up the digital torque wrench for aerospace chassis fasteners. You must walk them through the standard operating sequence.",
          "scenario": "Instruct the technician step-by-step using modal verbs (must, should, have to) and sequence markers.",
          "role": "Quality Assurance Trainer",
          "modelResponse": "First, you must inspect the digital torque display and verify the calibration sticker is valid. Second, you have to set the target torque to exactly 45 Newton-meters. Next, you should tighten each bolt in a star sequence until the audible beep sounds. Finally, you must log the verified values on the digital quality tablet.",
          "keywords": [
            "first",
            "must",
            "have to",
            "tighten",
            "torque",
            "finally",
            "calibrate"
          ],
          "rubric": {
            "grammar": "Effective use of sequence connectors (First, Second, Next, Finally) and modals of obligation (must, have to, should).",
            "lexicon": "Standard SOP procedural terms (calibration sticker, Newton-meters, star sequence, tablet).",
            "protocol": "Clear, patient instructional coaching adhering to ISO 9001 quality audits."
          }
        },
        "quiz": [
          {
            "q": "The hydraulic hose _____ fluid onto the floor; we need to shut off the pump immediately.",
            "opts": [
              "leaks",
              "is leaking",
              "leaked already",
              "was leak"
            ],
            "ans": 1,
            "exp": "Present Continuous \"is leaking\" describes an active ongoing anomaly."
          },
          {
            "q": "Technicians _____ wear hearing protection inside the high-tonnage stamping bay.",
            "opts": [
              "must",
              "might",
              "can",
              "should to"
            ],
            "ans": 0,
            "exp": "\"Must\" expresses strict mandatory safety rules."
          },
          {
            "q": "What does an audible hissing sound in a pneumatic system indicate?",
            "opts": [
              "Normal motor cooling",
              "A pressurized air leak or loose fitting",
              "Good vacuum grip",
              "Low electrical current"
            ],
            "ans": 1,
            "exp": "Hissing in pneumatic lines indicates escaping compressed air."
          },
          {
            "q": "You _____ reset the safety breaker until you find the short circuit.",
            "opts": [
              "should not",
              "can",
              "must to",
              "have"
            ],
            "ans": 0,
            "exp": "\"Should not\" advises strongly against unsafe operational actions."
          }
        ],
        "falseCognates": [
          {
            "term": "Realize",
            "mistake": "Realizar una tarea física",
            "correct": "Darse cuenta de un error / Comprender",
            "tip": "Realizar o ejecutar una tarea técnica se dice \"Perform\", \"Execute\" o \"Carry out\". \"I realized the belt was loose\" significa me di cuenta."
          },
          {
            "term": "Sanction",
            "mistake": "Castigar exclusivamente",
            "correct": "Aprobar oficialmente un procedimiento / Autorizar",
            "tip": "En normativas ISO/FDA, \"sanctioned procedure\" significa un procedimiento formalmente homologado y autorizado."
          },
          {
            "term": "Ultimate",
            "mistake": "El último de una lista",
            "correct": "Definitivo / Primordial / Final",
            "tip": "Para el último de una serie usa \"Last\" o \"Latest\". \"Ultimate responsibility\" se refiere a la máxima responsabilidad definitiva."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Calibration",
            "stress": "cal-i-BRA-tion",
            "ipa": "/ˌkælɪˈbreɪʃən/",
            "rule": "Acento principal en la penúltima sílaba \"BRA\" antes del sufijo \"-tion\"."
          },
          {
            "term": "Specification",
            "stress": "spec-i-fi-CA-tion",
            "ipa": "/ˌspɛsɪfɪˈkeɪʃən/",
            "rule": "Acento principal en \"CA\"; patrón rítmico cuaternario con acento secundario en \"spec\"."
          },
          {
            "term": "Torque",
            "stress": "TORQUE",
            "ipa": "/tɔːrk/",
            "rule": "Monosílabo; la vocal es /ɔːr/ abierta seguida de una \"k\" seca."
          }
        ]
      }
    ],
    "milestone": {
      "title": "Milestone Checkpoint A2: Practical Workplace Operator",
      "questions": 10,
      "passingGrade": 80,
      "badgeId": "badge-mcer-a2",
      "badgeName": "CEFR A2: Practical Workplace English (60.0h Course)",
      "totalHours": 60,
      "accreditation": "CACEI / DGUTyP Inglés II"
    }
  },
  {
    "id": "mcer-b1",
    "code": "B1",
    "name": "Threshold / Intermediate",
    "nameES": "Nivel B1: Autonomía Profesional y Procesos (Inglés III)",
    "badge": "CEFR B1 Intermediate",
    "color": "#f59e0b",
    "icon": "fa-chart-simple",
    "totalHours": 60,
    "totalXP": 5600,
    "summary": "Acredita 60.0 horas curriculares (Inglés III). Permite al estudiante desenvolverse con soltura en ambientes profesionales: redactar correos ejecutivos, explicar procedimientos operativos (SOPs), expresar desacuerdos constructivos y resolver contingencias.",
    "units": [
      {
        "id": "b1-u1",
        "unitNum": 1,
        "unitNumber": 1,
        "title": "Explaining Workflows & Standard Operating Procedures",
        "titleES": "Explicación de Flujos de Trabajo y Procedimientos SOP",
        "cefrDescriptor": "Can give clear, connected technical descriptions of procedural sequences, cause-and-effect relationships, and process specifications.",
        "canDo": "Explicar cómo funciona un proceso paso a paso, redactar instrucciones operativas estándar (SOP) y describir cómo se fabrican o inspeccionan productos.",
        "grammarFocus": "Passive Voice in technical descriptions (is assembled, are inspected, was calibrated), Sequence Connectors (First, Subsequently, Once that is complete, Finally), Cause & Effect (due to, as a result of, therefore)",
        "communicativeGoal": "Explicar cómo funciona un proceso paso a paso, redactar instrucciones operativas estándar (SOP) y describir cómo se fabrican o inspeccionan productos.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Standard Operating Procedure (SOP)",
            "es": "Procedimiento Operativo Estándar",
            "ipa": "/ˈstændərd ˈɑːpəˌreɪtɪŋ prəˈsiːdʒər/",
            "example": "All operators must follow the approved SOP to ensure repeatable quality."
          },
          {
            "en": "Sequential",
            "es": "Secuencial / Paso a paso",
            "ipa": "/sɪˈkwɛnʃəl/",
            "example": "The test protocol requires strict sequential execution of five steps."
          },
          {
            "en": "Discrepancy",
            "es": "Discrepancia / Diferencia",
            "ipa": "/dɪˈskrɛpənsi/",
            "example": "A dimensional discrepancy was detected between CAD and physical part."
          },
          {
            "en": "Calibrated",
            "es": "Calibrado bajo norma",
            "ipa": "/ˈkælɪˌbreɪtɪd/",
            "example": "The micrometer is calibrated every six months according to ISO 17025."
          },
          {
            "en": "Root Cause",
            "es": "Causa raíz del problema",
            "ipa": "/ruːt kɔːz/",
            "example": "The engineering team investigated the root cause of the weld fracture."
          },
          {
            "en": "Quarantine",
            "es": "Cuarentena / Aislamiento",
            "ipa": "/ˈkwɔːrənˌtiːn/",
            "example": "Non-conforming lots are segregated in the red quarantine cage."
          }
        ],
        "dialogue": {
          "title": "Walking Through a Quality Inspection SOP",
          "speakers": [
            "Andrea (Quality Assurance Engineer)",
            "Brian (Process Technician)"
          ],
          "lines": [
            {
              "speaker": "Andrea",
              "text": "Brian, could you walk me through the inspection sequence for this stamped bracket?"
            },
            {
              "speaker": "Brian",
              "text": "Certainly. First, the bracket is cleaned with isopropyl alcohol to remove oil. Next, three critical hole diameters are measured using a calibrated plug gauge."
            },
            {
              "speaker": "Andrea",
              "text": "What occurs if a hole diameter is out of specification?"
            },
            {
              "speaker": "Brian",
              "text": "If a discrepancy is detected, the part is segregated into the red quarantine bin and an alert is logged in the MES."
            },
            {
              "speaker": "Andrea",
              "text": "And once the lot passes all three dimensional checks?"
            },
            {
              "speaker": "Brian",
              "text": "Subsequently, the lot traveler is stamped and the parts are routed to the powder-coating line."
            }
          ]
        },
        "reading": {
          "title": "SOP-204: Automated Optical Inspection (AOI) Protocol",
          "text": "Purpose: To verify surface mount component alignment. Procedure: Once PCBs enter the inspection conveyor, dual 4K cameras capture top-side fiducial markers. Image processing algorithms compare component placement against Gerber design files. If any capacitor or IC exceeds 0.05mm tilt, the PCB is automatically routed to the manual rework station for microscopic audit.",
          "question": "What triggers a PCB to be diverted to the rework station?",
          "options": [
            "Every tenth circuit board",
            "If component tilt exceeds 0.05mm tolerance",
            "When the operator takes a break",
            "After 10,000 units are produced"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Intermittent PLC Optical Sensor Signal Triangulation",
          "context": "Conveyor Line 3 experiences intermittent indexing stops. Optical sensor S-2 fails to register translucent automotive blister packs, halting the downstream pneumatic pusher arm.",
          "scenario": "Troubleshoot and report the root cause and resolution to the engineering supervisor using conditional clauses and PLC terminology.",
          "role": "Automation Controls Specialist",
          "modelResponse": "During automated packaging, optical sensor S-2 on conveyor three intermittently drops its 24-volt DC signal. If the translucent blister pack reflects ambient LED light, the sensor beam deflects and the PLC ladder logic fails to trigger the pneumatic pusher. We adjusted the optical gain potentiometer and shielded the sensor bracket, which restored full operational cycle throughput.",
          "keywords": [
            "sensor",
            "signal",
            "PLC",
            "pneumatic",
            "logic",
            "voltage",
            "intermittently"
          ],
          "rubric": {
            "grammar": "Precise conditional constructions (If... reflects, the logic fails to trigger...).",
            "lexicon": "Advanced automation control vocabulary (ladder logic, optical gain, potentiometer, pneumatic pusher).",
            "protocol": "Methodical diagnostic reporting from electrical signal to mechanical actuator."
          }
        },
        "quiz": [
          {
            "q": "Every printed circuit board _____ inspected by automated optical cameras before shipping.",
            "opts": [
              "is",
              "are",
              "has",
              "were"
            ],
            "ans": 0,
            "exp": "Passive voice with singular subject: \"is inspected\"."
          },
          {
            "q": "The robotic line stopped _____ a sudden drop in incoming pneumatic pressure.",
            "opts": [
              "due to",
              "because",
              "so that",
              "despite of"
            ],
            "ans": 0,
            "exp": "\"Due to\" is followed by a noun phrase explaining cause."
          },
          {
            "q": "Which sequence connector best introduces the step following the primary action?",
            "opts": [
              "Finally",
              "Subsequently",
              "At last",
              "To conclude"
            ],
            "ans": 1,
            "exp": "\"Subsequently\" introduces subsequent procedural steps."
          },
          {
            "q": "All non-conforming stamped housings _____ segregated into quarantine yesterday.",
            "opts": [
              "was",
              "were",
              "is",
              "are"
            ],
            "ans": 1,
            "exp": "Plural subject in past passive takes \"were segregated\"."
          }
        ],
        "falseCognates": [
          {
            "term": "Conductor",
            "mistake": "Conductor de autobús o vehículo",
            "correct": "Conductor eléctrico / Cable conductor",
            "tip": "El chofer de un vehículo es un \"Driver\". En automatización y tableros PLC, \"Conductor\" es el alambre o filamento que transporta corriente eléctrica."
          },
          {
            "term": "Sensibility",
            "mistake": "Sensibilidad de medición técnica",
            "correct": "Sensatez / Criterio prudente",
            "tip": "La sensibilidad de calibración de un sensor o pirómetro es \"Sensitivity\". \"Sensibility\" denota madurez emocional o juicio lógico."
          },
          {
            "term": "Actuator",
            "mistake": "Persona que actúa",
            "correct": "Actuador mecánico / Cilindro neumático o eléctrico",
            "tip": "En ingeniería mecatrónica, un \"Actuator\" es el dispositivo motriz que transforma energía de control en movimiento físico."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Automation",
            "stress": "au-to-MA-tion",
            "ipa": "/ˌɔːtəˈmeɪʃən/",
            "rule": "Acento principal en la tercera sílaba \"MA\"; la \"au\" suena como /ɔː/."
          },
          {
            "term": "Programmable",
            "stress": "PRO-gram-ma-ble",
            "ipa": "/ˈproʊɡræməbəl/",
            "rule": "Acento en la primera sílaba \"PRO\"; las tres siguientes son átonas."
          },
          {
            "term": "Proximity",
            "stress": "prox-IM-i-ty",
            "ipa": "/prɑːkˈsɪmɪti/",
            "rule": "Acento en la segunda sílaba \"IM\"; vocal corta /ɪ/."
          }
        ]
      },
      {
        "id": "b1-u2",
        "unitNum": 2,
        "unitNumber": 2,
        "title": "Professional Email Correspondence & Status Reports",
        "titleES": "Redacción de Correos Profesionales y Reportes de Avance",
        "cefrDescriptor": "Can write formal workplace emails, progress reports, request vendor quotes (RFQs), and summarize action items with professional tone.",
        "canDo": "Redactar correos electrónicos a clientes o proveedores de EE.UU. informando avances, solicitando cotizaciones y confirmando entregas.",
        "grammarFocus": "Formal vs Informal register, Present Perfect for completed accomplishments (We have completed, She has sent), Polite modals (Could you please, Would it be possible to)",
        "communicativeGoal": "Redactar correos electrónicos a clientes o proveedores de EE.UU. informando avances, solicitando cotizaciones y confirmando entregas.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Deliverable",
            "es": "Entregable del proyecto",
            "ipa": "/dɪˈlɪvərəbəl/",
            "example": "The preliminary CAD drawing is our primary deliverable this week."
          },
          {
            "en": "Action Item",
            "es": "Tarea acordada / Pendiente",
            "ipa": "/ˈækʃən ˈaɪtəm/",
            "example": "Please review the action items listed at the end of the meeting minutes."
          },
          {
            "en": "Inquiry",
            "es": "Consulta formal / Solicitud",
            "ipa": "/ɪnˈkwaɪri/",
            "example": "We received an inquiry from the customer regarding thermal tolerances."
          },
          {
            "en": "Attached",
            "es": "Adjunto / En el archivo anexo",
            "ipa": "/əˈtætʃt/",
            "example": "Please find attached the signed inspection sign-off sheet."
          },
          {
            "en": "Follow-Up",
            "es": "Seguimiento formal",
            "ipa": "/ˈfɑːloʊ ʌp/",
            "example": "I am writing to follow up on our phone conversation from Tuesday."
          },
          {
            "en": "Sign-Off",
            "es": "Aprobación formal / Firma de aceptación",
            "ipa": "/saɪn ɔːf/",
            "example": "We obtained executive sign-off from the client director."
          }
        ],
        "dialogue": {
          "title": "Clarifying Engineering Change Request via Email",
          "speakers": [
            "Jessica (Project Manager)",
            "Daniel (Lead Design Engineer)"
          ],
          "lines": [
            {
              "speaker": "Jessica",
              "text": "Daniel, have you drafted the status update email to the Detroit client?"
            },
            {
              "speaker": "Daniel",
              "text": "Yes, Jessica. I have outlined the three completed milestones and attached the FEA stress simulation."
            },
            {
              "speaker": "Jessica",
              "text": "Did you mention that we need their sign-off on the revised mounting bracket by Friday?"
            },
            {
              "speaker": "Daniel",
              "text": "Yes, I wrote: \"Could you please confirm your formal approval of drawing Rev-C by Friday at 16:00 EST?\""
            },
            {
              "speaker": "Jessica",
              "text": "Excellent wording. That sets a clear timeline without sounding confrontational."
            }
          ]
        },
        "reading": {
          "title": "Sample Executive Status Email: Production Line Ramp-Up",
          "text": "Subject: Weekly Project Status Update: Assembly Line #5 Ramp-Up. Dear Operations Committee: We have successfully completed Milestone 2 on schedule. Cycle time has been reduced from 45 seconds to 38.2 seconds, meeting our Phase-1 KPI target. Action Items: (1) Vendor will deliver replacement servo drive by Wednesday. (2) Quality team will conduct Gage R&R validation on Friday. Please find attached the full telemetry dataset.",
          "question": "What is the primary accomplishment reported in the email?",
          "options": [
            "The plant was closed",
            "Cycle time was reduced to 38.2 seconds on schedule",
            "Workers went on strike",
            "The vendor canceled the project"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Process Capability Index (Cpk) Drift Audit Defense",
          "context": "The monthly statistical process control (SPC) chart reveals that CNC turning cell #4 had its Cpk index drop from 1.67 to 1.18, threatening bilateral automotive tolerance compliance.",
          "scenario": "Explain the root cause of the dimensional drift and present corrective countermeasures to the client audit team.",
          "role": "Six Sigma Quality Assurance Engineer",
          "modelResponse": "Our statistical process control chart shows that the machining diameter has drifted toward the upper specification limit, causing our Cpk capability index to drop from 1.67 to 1.18. This dimensional variation was caused by thermal expansion of the lathe spindle during high-ambient afternoon shifts. We have installed a closed-loop coolant refrigeration jacket to stabilize thermal equilibrium and maintain 1.67 Cpk.",
          "keywords": [
            "Cpk",
            "specification",
            "variation",
            "SPC",
            "thermal",
            "capability",
            "tolerance"
          ],
          "rubric": {
            "grammar": "Accurate use of Present Perfect and passive causative structures (has drifted, was caused by, have installed).",
            "lexicon": "Rigorous Six Sigma metrology vocabulary (Cpk, upper specification limit, dimensional drift, thermal equilibrium).",
            "protocol": "Data-driven, objective engineering presentation to external auditors."
          }
        },
        "quiz": [
          {
            "q": "We _____ already validated the high-voltage insulation on all fifty battery enclosures.",
            "opts": [
              "have",
              "has",
              "did",
              "had to"
            ],
            "ans": 0,
            "exp": "Present Perfect with subject \"We\" uses \"have + past participle\"."
          },
          {
            "q": "Please find _____ the updated bill of materials (BOM) in PDF format.",
            "opts": [
              "attached",
              "attaching",
              "attachment",
              "to attach"
            ],
            "ans": 0,
            "exp": "\"Please find attached [document]\" is standard business formula."
          },
          {
            "q": "Which phrasing is most appropriate for a formal inquiry to an international client?",
            "opts": [
              "Give me the drawings now",
              "Could you please provide the updated CAD files at your earliest convenience?",
              "Send me files quickly",
              "I want the drawings"
            ],
            "ans": 1,
            "exp": "Professional register uses polite modals like \"Could you please...\"."
          },
          {
            "q": "The engineering team _____ significant progress on the cycle-time bottleneck this week.",
            "opts": [
              "has made",
              "have made",
              "making",
              "does make"
            ],
            "ans": 0,
            "exp": "Singular collective noun \"team\" takes singular \"has made\"."
          }
        ],
        "falseCognates": [
          {
            "term": "Deception",
            "mistake": "Decepción o desilusión",
            "correct": "Engaño deliberado / Falsificación fraudulenta",
            "tip": "Estar decepcionado o desilusionado es \"Disappointment\". En auditorías de calidad, \"Deception\" implica manipulación fraudulenta de datos."
          },
          {
            "term": "Preservative",
            "mistake": "Preservativo profiláctico",
            "correct": "Conservador químico / Recubrimiento antioxidante",
            "tip": "Un profiláctico es \"Condom\". En manufactura de alimentos o metalmecánica, \"Preservative\" es un agente conservador o protector."
          },
          {
            "term": "Variance",
            "mistake": "Variación informal",
            "correct": "Varianza estadística matemáticamente cuantificada",
            "tip": "En Six Sigma y control de procesos, \"Variance\" se refiere específicamente al cuadrado de la desviación estándar (σ²)."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Deviation",
            "stress": "de-vi-A-tion",
            "ipa": "/ˌdiːviˈeɪʃən/",
            "rule": "Acento principal en la tercera sílaba \"A\" antes de \"-tion\"."
          },
          {
            "term": "Capability",
            "stress": "ca-pa-BIL-i-ty",
            "ipa": "/ˌkeɪpəˈbɪlɪti/",
            "rule": "Acento en la antepenúltima sílaba \"BIL\"."
          },
          {
            "term": "Statistical",
            "stress": "sta-TIS-ti-cal",
            "ipa": "/stəˈtɪstɪkəl/",
            "rule": "Acento en la segunda sílaba \"TIS\"."
          }
        ]
      },
      {
        "id": "b1-u3",
        "unitNum": 3,
        "unitNumber": 3,
        "title": "Technical Phone Calls, Standups & Clarifications",
        "titleES": "Llamadas Técnicas, Standups Diarios y Aclaraciones",
        "cefrDescriptor": "Can take part in virtual standups, understand spoken technical updates, interrupt politely to seek clarification, and confirm next steps.",
        "canDo": "Participar en daily standups, pedir que repitan información técnica sin pena y confirmar acuerdos en llamadas internacionales.",
        "grammarFocus": "Indirect questions for politeness (Could you tell me if... / Do you know when...), Clarification strategies (Could you repeat that? / What do you mean by...), Phrasal verbs in meetings (break down, catch up, run through)",
        "communicativeGoal": "Participar en daily standups, pedir que repitan información técnica sin pena y confirmar acuerdos en llamadas internacionales.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Clarify",
            "es": "Aclarar / Precisar",
            "ipa": "/ˈklærɪfaɪ/",
            "example": "Could you clarify whether the tolerance is plus or minus 0.02mm?"
          },
          {
            "en": "Catch Up",
            "es": "Ponerse al día / Actualizarse",
            "ipa": "/kætʃ ʌp/",
            "example": "Let us catch up on the supplier audit action items after the call."
          },
          {
            "en": "Break Down",
            "es": "Desglosar / Explicar paso a paso",
            "ipa": "/breɪk daʊn/",
            "example": "Can you break down the failure rates by operating temperature?"
          },
          {
            "en": "Run Through",
            "es": "Repasar rápidamente",
            "ipa": "/rʌn θruː/",
            "example": "Let me run through the four critical checklist items before we hang up."
          },
          {
            "en": "Bottleneck",
            "es": "Cuello de botella",
            "ipa": "/ˈbɑːtəlˌnɛk/",
            "example": "The manual deburring station is our primary throughput bottleneck."
          },
          {
            "en": "Standup",
            "es": "Reunión rápida de sincronización",
            "ipa": "/ˈstændˌʌp/",
            "example": "We hold a 15-minute virtual standup every morning at 08:00."
          }
        ],
        "dialogue": {
          "title": "Virtual Daily Standup with Tier-1 Client Engineering Team",
          "speakers": [
            "Kevin (US Product Lead)",
            "Gabriela (Manufacturing Lead MX)"
          ],
          "lines": [
            {
              "speaker": "Kevin",
              "text": "Good morning, Gabriela. Could you run through yesterday’s yield numbers on the EV battery trays?"
            },
            {
              "speaker": "Gabriela",
              "text": "Good morning, Kevin. Yesterday we reached a first-pass yield of 97.4%, which is an increase of 2.1%."
            },
            {
              "speaker": "Kevin",
              "text": "That sounds promising. Did you encounter any porosity issues on the friction stir welds?"
            },
            {
              "speaker": "Gabriela",
              "text": "I am sorry, the connection cut out for a second. Could you repeat that last question, please?"
            },
            {
              "speaker": "Kevin",
              "text": "Sure! I asked if you observed any porosity defects on the weld seams."
            },
            {
              "speaker": "Gabriela",
              "text": "Understood. We observed zero porosity on ultrasonic testing. All fifty welds met ISO 25239 specs."
            }
          ]
        },
        "reading": {
          "title": "Best Practices for Cross-Border Engineering Standups",
          "text": "International remote engineering calls require structured communication. (1) State your main point concisely: \"Yesterday I completed X, today I am working on Y, and my blocker is Z.\" (2) Never hesitate to seek clarification if an acoustic drop or technical acronym is unfamiliar. Use professional formulas such as \"Could you please rephrase that?\" (3) Conclude calls by confirming assigned ownership.",
          "question": "What is the recommended 3-part format for daily standups?",
          "options": [
            "Talk about personal life for 30 minutes",
            "Yesterday I completed X, today I work on Y, my blocker is Z",
            "Only complain about management",
            "Do not say anything"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Hydraulic Stamping Press Circuit Pressure Loss Triangulation",
          "context": "Stamping Press #4 suffered a sudden pressure collapse from 200 bar down to 85 bar during ram descent, preventing full sheet metal forming.",
          "scenario": "Report the hydraulic fault diagnosis, isolation procedure, and repair actions using technical past passives and system schematics.",
          "role": "Senior Electromechanical Field Technician",
          "modelResponse": "We investigated the sudden pressure drop from 200 bar down to 85 bar on Stamping Press #4. If the pilot-operated relief valve sticks open, the primary cylinder cannot build required forming tonnage. We de-energized the hydraulic power unit, tagged out the motor, and disassembled manifold block B. We discovered a ruptured fluoroelastomer O-ring seal, which was replaced and tested successfully under 220 bar.",
          "keywords": [
            "pressure",
            "hydraulic",
            "valve",
            "cylinder",
            "de-energized",
            "bar",
            "seal"
          ],
          "rubric": {
            "grammar": "Correct passive voice implementations (was de-energized, was replaced, tested successfully).",
            "lexicon": "Fluid power engineering terms (pilot-operated relief valve, manifold, forming tonnage, fluoroelastomer).",
            "protocol": "Strict adherence to Lockout/Tagout de-energization and fluid power safety rules."
          }
        },
        "quiz": [
          {
            "q": "Could you please tell me _____ the shipment has cleared customs?",
            "opts": [
              "whether",
              "that if",
              "what",
              "which"
            ],
            "ans": 0,
            "exp": "Indirect yes/no questions use \"whether\" or \"if\"."
          },
          {
            "q": "I apologize, the audio cut out. Could you please _____ that last specification?",
            "opts": [
              "repeat",
              "repeating",
              "repeated",
              "to repeat"
            ],
            "ans": 0,
            "exp": "Modals like \"could\" take the base bare infinitive: \"repeat\"."
          },
          {
            "q": "In engineering meetings, what does it mean to \"run through\" a document?",
            "opts": [
              "To run physical laps around it",
              "To quickly review its main points sequentially",
              "To tear it up",
              "To delete it"
            ],
            "ans": 1,
            "exp": "\"Run through\" means to review or inspect sequentially."
          },
          {
            "q": "Do you know when _____ the audit results?",
            "opts": [
              "will they publish",
              "they will publish",
              "did they publish",
              "are they publish"
            ],
            "ans": 1,
            "exp": "Indirect questions use statement word order: \"they will publish\"."
          }
        ],
        "falseCognates": [
          {
            "term": "Disrupt",
            "mistake": "Disrumpir (arcaico)",
            "correct": "Interrumpir bruscamente / Colapsar el flujo",
            "tip": "En logística y sistemas de manufactura, \"Disrupt\" significa detener o trastornar severamente la continuidad del proceso."
          },
          {
            "term": "Contaminate",
            "mistake": "Contaminar con toxinas exclusivamente",
            "correct": "Presencia de cualquier partícula microscópica o impureza extraña",
            "tip": "En hidráulica de precisión, incluso una partícula de polvo de 5 micras es clasificada técnicamente como \"contamination\"."
          },
          {
            "term": "Hazardous",
            "mistake": "Azaroso o aleatorio",
            "correct": "Peligroso / De alto riesgo para la integridad",
            "tip": "Aleatorio se dice \"Random\". \"Hazardous materials (HAZMAT)\" son sustancias altamente peligrosas o reactivas."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Hydraulic",
            "stress": "hy-DRAU-lic",
            "ipa": "/haɪˈdrɔːlɪk/",
            "rule": "Acento en la segunda sílaba \"DRAU\" con sonido vocálico /ɔː/."
          },
          {
            "term": "Pneumatic",
            "stress": "pneu-MAT-ic",
            "ipa": "/nʊˈmætɪk/",
            "rule": "La letra \"p\" inicial es totalmente muda; comienza directamente con sonido /n/."
          },
          {
            "term": "Oscilloscope",
            "stress": "os-CIL-lo-scope",
            "ipa": "/əˈsɪləˌskoʊp/",
            "rule": "Acento principal en la segunda sílaba \"CIL\"."
          }
        ]
      },
      {
        "id": "b1-u4",
        "unitNum": 4,
        "unitNumber": 4,
        "title": "Constructive Disagreements, Solutions & 8D Actions",
        "titleES": "Desacuerdos Constructivos, Soluciones y Acciones 8D",
        "cefrDescriptor": "Can express polite disagreement, negotiate technical compromises, present root-cause solutions, and participate in 8D problem-solving meetings.",
        "canDo": "Expresar desacuerdos técnicos con diplomacia, proponer soluciones alternativas y justificar acciones correctivas en juntas de calidad.",
        "grammarFocus": "Diplomatic disagreement phrasing (I see your point, however... / With respect, the data suggests...), Conditionals for hypothetical solutions (If we adjust X, we could prevent Y), Quantifiers for statistical claims",
        "communicativeGoal": "Expresar desacuerdos técnicos con diplomacia, proponer soluciones alternativas y justificar acciones correctivas en juntas de calidad.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Countermeasure",
            "es": "Contramedida de seguridad / Acción correctiva",
            "ipa": "/ˈkaʊntərˌmɛʒər/",
            "example": "The permanent countermeasure is to install optical safety interlocks."
          },
          {
            "en": "Compromise",
            "es": "Punto medio / Acuerdo técnico",
            "ipa": "/ˈkɑːmprəˌmaɪz/",
            "example": "We reached an engineering compromise on the wall thickness."
          },
          {
            "en": "Containment",
            "es": "Contención inmediata del defecto",
            "ipa": "/kənˈteɪnmənt/",
            "example": "Immediate containment was implemented by 100% sorting of finished goods."
          },
          {
            "en": "Ishikawa Diagram",
            "es": "Diagrama de causa-efecto (Fishbone)",
            "ipa": "/ˌɪʃiˈkɑːwə ˈdaɪəˌɡræm/",
            "example": "The team completed an Ishikawa diagram to map out contributing factors."
          },
          {
            "en": "Corrective Action",
            "es": "Acción correctiva definitiva (CAPA)",
            "ipa": "/kəˈrɛktɪv ˈækʃən/",
            "example": "CAPA #402 requires re-tooling the injection nozzle."
          },
          {
            "en": "Non-Conforming",
            "es": "No conforme / Fuera de especificación",
            "ipa": "/nɑːn kənˈfɔːrmɪŋ/",
            "example": "Twenty non-conforming shafts were segregated from the assembly bay."
          }
        ],
        "dialogue": {
          "title": "8D Root Cause Meeting: Disputing Tool Wear vs Lubrication",
          "speakers": [
            "Valeria (Quality Engineer)",
            "Richard (Tooling Lead)"
          ],
          "lines": [
            {
              "speaker": "Richard",
              "text": "I believe the micro-cracks on the stampings are caused by inadequate hydraulic oil lubrication."
            },
            {
              "speaker": "Valeria",
              "text": "I see your point, Richard; however, our lubricant viscosity logs show normal readings across all three shifts."
            },
            {
              "speaker": "Richard",
              "text": "What else could explain the repeated shear tear-out on the corner radii?"
            },
            {
              "speaker": "Valeria",
              "text": "If we inspect the carbide die under magnification, we will see that tool wear exceeded 0.08mm. The data suggests tool fatigue is the primary root cause."
            },
            {
              "speaker": "Richard",
              "text": "That makes sense. If we swap out the die insert today, we can run a test batch of fifty parts."
            },
            {
              "speaker": "Valeria",
              "text": "Agreed. That will validate our D5 corrective action before we submit the 8D report."
            }
          ]
        },
        "reading": {
          "title": "8D Methodology Overview: From D3 Containment to D7 Prevention",
          "text": "The 8D (Eight Disciplines) problem-solving standard is required by global automotive and aerospace OEMs under IATF 16949. Discipline 3 requires immediate containment within 24 hours to protect the customer from defect escapes. Disciplines 4 and 5 demand rigorous root-cause identification using 5-Why analysis and verification of permanent corrective actions. Discipline 7 updates institutional FMEAs to prevent recurrence across sister plants.",
          "question": "What is the required timeline for D3 containment actions under automotive standards?",
          "options": [
            "Within 6 months",
            "Within 24 hours",
            "Whenever possible",
            "Only after customer complains twice"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Cross-Border Nearshoring Freight Expediting Dispatch",
          "context": "A critical batch of 5,000 automotive microcontroller chips is halted at the Otay Mesa commercial border crossing due to a Harmonized Tariff Code discrepancy.",
          "scenario": "Brief the plant operations director on shipment status, customs remediation steps, and buffer stock projections.",
          "role": "Cross-Border Supply Chain Planner",
          "modelResponse": "We are tracking shipment lot #489 containing 5,000 automotive microcontroller units currently held at Otay Mesa customs for tariff classification review. Our customs broker submitted revised manufacturer certificates of origin this morning. If customs releases the bonded trailer by 14:00, our dedicated carrier will deliver the crates directly to the Mexicali plant dock before the third shift begins, avoiding any assembly downtime.",
          "keywords": [
            "shipment",
            "customs",
            "delivery",
            "lead time",
            "inspection",
            "carrier",
            "dock"
          ],
          "rubric": {
            "grammar": "Conditional future real structures (If customs releases... our carrier will deliver...).",
            "lexicon": "Cross-border logistics terminology (customs broker, bonded trailer, certificate of origin, dock).",
            "protocol": "Crisp executive situational dispatch balancing urgency with commercial precision."
          }
        },
        "quiz": [
          {
            "q": "\"I see your point; _____, the telemetry data indicates an over-voltage spike from the inverter.\"",
            "opts": [
              "however",
              "although",
              "despite of",
              "because"
            ],
            "ans": 0,
            "exp": "\"However\" introduces a polite, diplomatic counter-argument."
          },
          {
            "q": "If we _____ the die clearance by 0.05mm, we will eliminate the edge burrs completely.",
            "opts": [
              "increase",
              "will increase",
              "increased",
              "are increase"
            ],
            "ans": 0,
            "exp": "First conditional uses Simple Present in the \"if\" clause: \"if we increase\"."
          },
          {
            "q": "What is the main objective of an 8D \"Discipline 3 Containment Action\"?",
            "opts": [
              "To assign blame to operators",
              "To stop non-conforming products from reaching the customer immediately",
              "To redesign the factory",
              "To close the assembly line permanently"
            ],
            "ans": 1,
            "exp": "Containment actions quarantine and isolate defects within 24 hours."
          },
          {
            "q": "Which statement demonstrates the highest level of diplomatic workplace disagreement?",
            "opts": [
              "You are completely wrong",
              "With respect, the metrology measurements suggest an alternate root cause",
              "I hate that idea",
              "Never say that again"
            ],
            "ans": 1,
            "exp": "\"With respect, [evidence] suggests...\" is the gold standard of professional discourse."
          }
        ],
        "falseCognates": [
          {
            "term": "Commodity",
            "mistake": "Comodidad o confort personal",
            "correct": "Materia prima genérica cotizada a granel",
            "tip": "La comodidad personal se dice \"Comfort\". En compras industriales, \"Commodity\" se refiere al cobre, acero, resina plástica o aluminio."
          },
          {
            "term": "Procure",
            "mistake": "Procurar intentar",
            "correct": "Abastecer / Adquirir formalmente suministros industriales",
            "tip": "Procurar hacer algo es \"Try to\". \"Procurement\" es la función ejecutiva de compras, licitaciones y proveeduría fabril."
          },
          {
            "term": "Lead Time",
            "mistake": "Tiempo de liderazgo",
            "correct": "Tiempo de ciclo de entrega desde orden hasta recepción",
            "tip": "En logística de nearshoring, \"Lead Time\" es la cantidad de días o semanas que transcurren desde la orden de compra hasta la entrega en muelle."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Logistics",
            "stress": "lo-GIS-tics",
            "ipa": "/ləˈdʒɪstɪks/",
            "rule": "Acento en la segunda sílaba \"GIS\" con sonido suave /dʒ/."
          },
          {
            "term": "Procurement",
            "stress": "pro-CURE-ment",
            "ipa": "/prəˈkjʊərmənt/",
            "rule": "Acento en la segunda sílaba \"CURE\" con sonido /kjʊər/."
          },
          {
            "term": "Inventory",
            "stress": "IN-ven-to-ry",
            "ipa": "/ˈɪnvənˌtɔːri/",
            "rule": "En inglés estadounidense, el acento primario recae con fuerza en \"IN\"."
          }
        ]
      }
    ],
    "milestone": {
      "title": "Milestone Checkpoint B1: Professional Independence",
      "questions": 10,
      "passingGrade": 80,
      "badgeId": "badge-mcer-b1",
      "badgeName": "CEFR B1: Professional Independence (60.0h Course)",
      "totalHours": 60,
      "accreditation": "CACEI / DGUTyP Inglés III"
    }
  },
  {
    "id": "mcer-b2",
    "code": "B2",
    "name": "Vantage / Executive Fluency",
    "nameES": "Nivel B2: Fluidez Ejecutiva y Negociación (Inglés IV)",
    "badge": "CEFR B2 Executive",
    "color": "#a855f7",
    "icon": "fa-award",
    "totalHours": 60,
    "totalXP": 5600,
    "summary": "Acredita 60.0 horas curriculares (Inglés IV). Nivel de graduación y empleabilidad global: liderar órdenes de cambio (ECO), facilitar juntas internacionales, redactar memorándums ejecutivos y dominar el radar cultural estadounidense.",
    "units": [
      {
        "id": "b2-u1",
        "unitNum": 1,
        "unitNumber": 1,
        "title": "Engineering Change Orders & Technical Specs",
        "titleES": "Órdenes de Cambio de Ingeniería (ECO) y Especificaciones",
        "cefrDescriptor": "Can evaluate complex engineering change notices, debate technical trade-offs, manage tolerances, and negotiate deviation approvals with clients.",
        "canDo": "Gestionar órdenes de cambio de ingeniería (ECO), negociar desviaciones de tolerancia y evaluar impactos de costos y manufactura.",
        "grammarFocus": "Advanced Passives with Modals (must be submitted, should have been flagged, could be retrofitted), Complex relative clauses, Nominalization for executive conciseness",
        "communicativeGoal": "Gestionar órdenes de cambio de ingeniería (ECO), negociar desviaciones de tolerancia y evaluar impactos de costos y manufactura.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Engineering Change Order (ECO)",
            "es": "Orden de Cambio de Ingeniería",
            "ipa": "/ˌɛndʒɪˈnɪərɪŋ tʃeɪndʒ ˈɔːrdər/",
            "example": "ECO #901 modifies the mounting flange thickness from 3mm to 4.5mm."
          },
          {
            "en": "Bill of Materials (BOM)",
            "es": "Lista de materiales de ensamble",
            "ipa": "/bɪl əv məˈtɪriəlz/",
            "example": "The multi-level BOM was updated to reflect the new silicone O-rings."
          },
          {
            "en": "Deviation Permit",
            "es": "Permiso de desviación temporal",
            "ipa": "/ˌdiːviˈeɪʃən ˈpɜːrmɪt/",
            "example": "The OEM granted a deviation permit for batch #45 to prevent production halt."
          },
          {
            "en": "Traceability",
            "es": "Trazabilidad de componentes",
            "ipa": "/ˌtreɪsəˈbɪlɪti/",
            "example": "Full QR laser-etched traceability is mandatory under ISO 9001:2015."
          },
          {
            "en": "Scrap Rate",
            "es": "Tasa de desperdicio / Rechazo",
            "ipa": "/skræp reɪt/",
            "example": "The automated deburring cell reduced the overall scrap rate to 0.4%."
          },
          {
            "en": "Obsolescence",
            "es": "Obsolescencia de componentes",
            "ipa": "/ˌɑːbsəˈlɛsəns/",
            "example": "We issued an ECO due to electronic microcontroller obsolescence."
          }
        ],
        "dialogue": {
          "title": "Reviewing an Urgent Engineering Change Order (ECO)",
          "speakers": [
            "Marcus (Lead Systems Engineer)",
            "Elena (Plant Operations VP)"
          ],
          "lines": [
            {
              "speaker": "Marcus",
              "text": "Elena, we received Engineering Change Order ECO-884 from the automotive OEM in Detroit."
            },
            {
              "speaker": "Elena",
              "text": "What is the scope of the revision, Marcus? Does it impact our active tooling?"
            },
            {
              "speaker": "Marcus",
              "text": "The customer increased the heat-sink fin thickness by 1.2 millimeters to improve thermal dissipation during fast-charging."
            },
            {
              "speaker": "Elena",
              "text": "Will our existing stamping progressive dies have to be re-machined?"
            },
            {
              "speaker": "Marcus",
              "text": "Yes, the die cavity must be modified by EDM, which requires a three-day maintenance window. However, unit manufacturing cost remains unchanged."
            },
            {
              "speaker": "Elena",
              "text": "Make sure that all work-in-progress inventory is quarantined before the new drawing revision takes effect on Monday."
            }
          ]
        },
        "reading": {
          "title": "Management of Engineering Change Orders (ECO) in Nearshoring",
          "text": "Engineering Change Management is a critical discipline in US-Mexico nearshoring contracts. When an OEM issues an ECO, cross-border engineering teams must perform a 4-dimensional impact assessment: (1) Tooling re-machining lead time, (2) Scrap risk of obsolete work-in-progress (WIP) stock, (3) BOM revision in ERP/MES software, and (4) PPAP (Production Part Approval Process) level 3 re-submission. Failure to execute rigorous change control can result in multi-million-dollar warranty claims.",
          "question": "What is a major risk of poor engineering change management?",
          "options": [
            "Excess coffee in the break room",
            "Multi-million-dollar warranty claims and assembly line shutdowns",
            "Free tooling upgrades",
            "Lower taxes"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Aerospace Titanium Bracket 8D Root Cause Defense",
          "context": "An aerospace customer rejected a batch of titanium structural wing brackets due to micro-fissures found during dye penetrant testing. You are presenting D4 (Root Cause) and D5 (Permanent Corrective Actions).",
          "scenario": "Defend your metallurgical 5-Why findings and corrective countermeasures before the customer quality director.",
          "role": "Quality Engineering Lead (8D Champion)",
          "modelResponse": "Our multidisciplinary 8D team performed a five-why root cause investigation on the cracked titanium brackets. Scanning electron microscopy confirmed that the fissures originated from excessive quenching rates during thermal heat treatment, rather than fatigue stress. As permanent corrective action D5, we reprogrammed the induction furnace ramp-down rate and installed dual-wavelength pyrometers to ensure uniform cooling, eliminating recurrence.",
          "keywords": [
            "root cause",
            "analysis",
            "corrective action",
            "fissures",
            "8D",
            "preventive",
            "eliminated"
          ],
          "rubric": {
            "grammar": "Complex subordinate clauses and formal evidence presentation (confirmed that... originated from... to ensure...).",
            "lexicon": "High-level materials science and aerospace quality lexicon (scanning electron microscopy, quenching, thermal ramp-down).",
            "protocol": "Authoritative, accountable engineering defense answering all customer audit inquiries."
          }
        },
        "quiz": [
          {
            "q": "The proposed tooling modifications _____ submitted to the customer by Friday at 17:00.",
            "opts": [
              "must be",
              "must to be",
              "should been",
              "have to being"
            ],
            "ans": 0,
            "exp": "Modal passive takes \"must be + past participle\": \"must be submitted\"."
          },
          {
            "q": "The engineer _____ designed the progressive die recommended carbide inserts for wear resistance.",
            "opts": [
              "which",
              "who",
              "whom",
              "whose"
            ],
            "ans": 1,
            "exp": "Use \"who\" as the relative pronoun referring to people in subject position."
          },
          {
            "q": "What does a \"Deviation Permit\" authorize in manufacturing?",
            "opts": [
              "A vacation for operators",
              "Temporary acceptance of components slightly outside specification that do not affect fit or function",
              "Canceling all safety protocols",
              "Buying uncertified raw materials"
            ],
            "ans": 1,
            "exp": "Deviation permits formally authorize temporary non-standard component usage."
          },
          {
            "q": "Had the design team flagged the thermal issue earlier, the tooling _____ redesigned.",
            "opts": [
              "would not have been",
              "will not be",
              "was not",
              "is not"
            ],
            "ans": 0,
            "exp": "Third conditional inverted form takes \"would not have been + past participle\"."
          }
        ],
        "falseCognates": [
          {
            "term": "Comprehensive",
            "mistake": "Comprensivo con sentimientos ajenos",
            "correct": "Exhaustivo / Integral / Completo",
            "tip": "Tener empatía o comprensión humana se dice \"Understanding\" o \"Sympathetic\". Un \"Comprehensive 8D Report\" es un reporte técnico exhaustivo y completo."
          },
          {
            "term": "Pretend",
            "mistake": "Pretender aspirar a una meta",
            "correct": "Fingir / Simular artificialmente",
            "tip": "Aspirar o proponerse algo es \"Intend\" o \"Aim\". \"Pretend\" significa simular algo falso."
          },
          {
            "term": "Apparent",
            "mistake": "Aparente sin fundamento",
            "correct": "Visible a primera vista / Evidente al inicio",
            "tip": "En análisis de causa raíz, la \"apparent cause\" es el síntoma superficial observable antes de aplicar los 5 Porqués."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Hypothesis",
            "stress": "hy-POTH-e-sis",
            "ipa": "/haɪˈpɑːθəsɪs/",
            "rule": "Acento principal en la segunda sílaba \"POTH\"; el plural es \"hypotheses\" /haɪˈpɑːθəsiːz/."
          },
          {
            "term": "Systematic",
            "stress": "sys-te-MAT-ic",
            "ipa": "/ˌsɪstəˈmætɪk/",
            "rule": "Acento en la tercera sílaba \"MAT\" con vocal /æ/."
          },
          {
            "term": "Containment",
            "stress": "con-TAIN-ment",
            "ipa": "/kənˈteɪnmənt/",
            "rule": "Acento en la sílaba central \"TAIN\"."
          }
        ]
      },
      {
        "id": "b2-u2",
        "unitNum": 2,
        "unitNumber": 2,
        "title": "Cross-Border Negotiations & Executive Facilitation",
        "titleES": "Negociaciones Transfronterizas y Facilitación Ejecutiva",
        "cefrDescriptor": "Can chair international engineering meetings, facilitate contentious discussions, negotiate contract deliverables, and tactfully mediate multi-stakeholder conflicts.",
        "canDo": "Liderar juntas técnicas con directores de EE. UU., mediar desacuerdos entre producción y calidad, y negociar acuerdos contractuales.",
        "grammarFocus": "Hedging and softening techniques (It would appear that / We might want to consider), Turn-taking and meeting facilitation formulas (Let us circle back / Moving on to the next item), Cleft sentences for emphasis",
        "communicativeGoal": "Liderar juntas técnicas con directores de EE. UU., mediar desacuerdos entre producción y calidad, y negociar acuerdos contractuales.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Circle Back",
            "es": "Retomar un tema más adelante",
            "ipa": "/ˈsɜːrkəl bæk/",
            "example": "Let us circle back to the tooling budget once we review the yield data."
          },
          {
            "en": "Stakeholder",
            "es": "Parte interesada / Involucrado clave",
            "ipa": "/ˈsteɪkˌhoʊldər/",
            "example": "All key stakeholders must sign off on the facility validation protocol."
          },
          {
            "en": "Touch Base",
            "es": "Ponerse en contacto brevemente",
            "ipa": "/tʌtʃ beɪs/",
            "example": "I will touch base with your quality director tomorrow morning."
          },
          {
            "en": "Leverage",
            "es": "Aprovechar / Sacar ventaja estratégica",
            "ipa": "/ˈlɛvərɪdʒ/",
            "example": "We can leverage our automated inspection line to reduce labor costs."
          },
          {
            "en": "Table a Topic",
            "es": "Posponer la discusión de un tema",
            "ipa": "/ˈteɪbəl/",
            "example": "Given our tight agenda, let us table the packaging discussion until Friday."
          },
          {
            "en": "Wrap Up",
            "es": "Concluir / Dar por terminada una junta",
            "ipa": "/ræp ʌp/",
            "example": "Before we wrap up, let us confirm the three critical action items."
          }
        ],
        "dialogue": {
          "title": "Facilitating a High-Stakes Supplier Quarterly Business Review",
          "speakers": [
            "Javier (Director of Operations MX)",
            "Sarah (VP Supply Chain US)"
          ],
          "lines": [
            {
              "speaker": "Javier",
              "text": "Good morning, everyone. Let us begin our Quarterly Business Review on time. Today our primary objective is to finalize the ramp-up schedule for the Mexicali expansion."
            },
            {
              "speaker": "Sarah",
              "text": "Thanks, Javier. From our side in California, the delivery timelines for the stamping presses appear somewhat tight."
            },
            {
              "speaker": "Javier",
              "text": "I appreciate your concern, Sarah. What we might want to consider is phasing the qualification into two two-week sprints. That would allow early batch sampling while secondary tooling is being installed."
            },
            {
              "speaker": "Sarah",
              "text": "That is a reasonable compromise. It provides the risk mitigation our OEM board requires."
            },
            {
              "speaker": "Javier",
              "text": "Excellent. Let us circle back to the logistics milestones right after reviewing the capital expenditure slides."
            }
          ]
        },
        "reading": {
          "title": "Executive Presence in Cross-Border US-Mexico Technical Leadership",
          "text": "In high-stakes corporate nearshoring environments, linguistic proficiency must be paired with executive presence. Effective meeting leaders employ hedging strategies to offer critical perspectives without provoking defensive reactions: \"It would appear that the data suggests an alternate hypothesis\" replaces blunt confrontation. Facilitators keep multi-disciplinary discussions focused by actively managing conversational turns, parking tangential topics, and driving decisive accountability.",
          "question": "Why do executive leaders use hedging techniques like \"It would appear that...\" in technical meetings?",
          "options": [
            "To waste meeting time",
            "To state critical insights diplomatically without provoking defensive reactions",
            "Because they are uncertain of the facts",
            "To avoid taking responsibility"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "ISO Class 1 Cleanroom Particle Excursion Mitigation",
          "context": "Airborne optical particle counters in Extreme Ultraviolet (EUV) Photolithography Bay 2 triggered a warning excursion, detecting 14 particles per cubic meter above 0.1 microns.",
          "scenario": "Command the cleanroom protocol response and brief the yield management director using formal cleanroom terminology.",
          "role": "Semiconductor Cleanroom Fab Lead",
          "modelResponse": "Airborne particle sensors in EUV Photolithography Bay 2 registered an excursion exceeding ISO Class 1 thresholds at 09:40 AM. We immediately suspended wafer stepper processing and isolated the automated track. Differential pressure dropped two Pascals due to a clogged pre-filter on HEPA fan unit 4. The HEPA filter was replaced under continuous laminar purge, and airborne particle counts have returned to baseline zero.",
          "keywords": [
            "cleanroom",
            "particles",
            "ISO Class 1",
            "photolithography",
            "wafer",
            "HEPA filter",
            "excursion"
          ],
          "rubric": {
            "grammar": "Flawless passive reporting and sequence linking in high-stakes technical environments.",
            "lexicon": "State-of-the-art semiconductor cleanroom vocabulary (EUV, wafer stepper, differential pressure, laminar purge).",
            "protocol": "Decisive, compliance-certified cleanroom protocol execution."
          }
        },
        "quiz": [
          {
            "q": "We don't have the full metrology dataset yet, so let us _____ this discussion until Friday.",
            "opts": [
              "table",
              "chair",
              "desk",
              "bench"
            ],
            "ans": 0,
            "exp": "In American executive English, to \"table a topic\" means to postpone it temporarily."
          },
          {
            "q": "Before we _____ the call, let me confirm who owns the tooling redesign action item.",
            "opts": [
              "wrap up",
              "wrap on",
              "wrap down",
              "wrap into"
            ],
            "ans": 0,
            "exp": "\"Wrap up\" means to conclude or finalize a meeting."
          },
          {
            "q": "What is the primary role of an executive meeting facilitator when two engineers disagree strongly?",
            "opts": [
              "Shout louder than both",
              "Diplomatically acknowledge both perspectives, anchor the discussion in empirical data, and agree on a validation test",
              "Cancel the project immediately",
              "Hang up the call"
            ],
            "ans": 1,
            "exp": "Effective facilitation centers on diplomatic mediation and empirical validation."
          },
          {
            "q": "\"What we _____ consider is dual-sourcing the semiconductor component to mitigate lead-time risk.\"",
            "opts": [
              "might want to",
              "must to",
              "are want",
              "ought"
            ],
            "ans": 0,
            "exp": "\"We might want to consider...\" is a classic executive hedging formula."
          }
        ],
        "falseCognates": [
          {
            "term": "Fabrication",
            "mistake": "Fabricación de mentiras o invenciones",
            "correct": "Procesamiento de obleas de semiconductores (Wafer Fab)",
            "tip": "En la industria de semiconductores, \"Wafer Fabrication\" o \"Fab\" se refiere estrictamente a los procesos químicos, litográficos y de grabado en sala limpia."
          },
          {
            "term": "Deposition",
            "mistake": "Destitución de cargo o declaración judicial",
            "correct": "Deposición física o química de películas delgadas (CVD/PVD)",
            "tip": "En nanotecnología y chips, \"Thin-Film Deposition\" es la aplicación de capas atómicas de óxidos o metales sobre silicio."
          },
          {
            "term": "Yield",
            "mistake": "Ceder el paso en tráfico vehicular",
            "correct": "Rendimiento porcentual de microchips funcionales por oblea",
            "tip": "En fábricas de chips, \"Wafer Yield\" es la métrica suprema de productividad: porcentaje de chips sin defectos sobre la oblea."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Photolithography",
            "stress": "pho-to-li-THOG-ra-phy",
            "ipa": "/ˌfoʊtoʊlɪˈθɑːɡrəfi/",
            "rule": "Palabra de seis sílabas; el acento principal recae invariablemente en la cuarta sílaba \"THOG\"."
          },
          {
            "term": "Contamination",
            "stress": "con-tam-i-NA-tion",
            "ipa": "/kənˌtæmɪˈneɪʃən/",
            "rule": "Acento principal en la penúltima sílaba \"NA\"."
          },
          {
            "term": "Substrate",
            "stress": "SUB-strate",
            "ipa": "/ˈsʌbstreɪt/",
            "rule": "Sustantivo técnico: acento fuerte en la primera sílaba \"SUB\"."
          }
        ]
      },
      {
        "id": "b2-u3",
        "unitNum": 3,
        "unitNumber": 3,
        "title": "Formal Escalations, Root Cause & Executive Memos",
        "titleES": "Escalación Formal, Causa Raíz y Memorándums",
        "cefrDescriptor": "Can write clear, detailed formal escalation memos, present rigorous 8D root-cause analyses, and evaluate operational risk matrices for C-suite review.",
        "canDo": "Redactar memorándums ejecutivos de escalación formal ante fallas críticas de producto, explicando la causa raíz y las acciones correctivas (CAPA).",
        "grammarFocus": "Conditional inversion (Should you require / Had we known), Cleft sentences for emphasis (What caused the failure was...), Passive reporting verbs (It is estimated that / The defect was determined to be)",
        "communicativeGoal": "Redactar memorándums ejecutivos de escalación formal ante fallas críticas de producto, explicando la causa raíz y las acciones correctivas (CAPA).",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Non-Conformance Report (NCR)",
            "es": "Reporte de No Conformidad",
            "ipa": "/nɑːn kənˈfɔːrməns/",
            "example": "Quality issued an NCR due to surface roughness deviations on batch #20."
          },
          {
            "en": "Containment Action",
            "es": "Acción de contención inmediata",
            "ipa": "/kənˈteɪnmənt/",
            "example": "Our containment action involved quarantining 1,200 suspect housings."
          },
          {
            "en": "Root Cause Analysis",
            "es": "Análisis de causa raíz",
            "ipa": "/ruːt kɔːz əˈnæləsɪs/",
            "example": "The 5-Why root cause analysis confirmed a cracked nozzle O-ring."
          },
          {
            "en": "Mitigation Plan",
            "es": "Plan de mitigación de riesgos",
            "ipa": "/ˌmɪtɪˈɡeɪʃən plæn/",
            "example": "The engineering team presented a robust mitigation plan to prevent recurrence."
          },
          {
            "en": "Executive Sponsorship",
            "es": "Respaldo ejecutivo / Dirección",
            "ipa": "/ɪɡˈzɛkjətɪv/",
            "example": "We have executive sponsorship from the VP of Quality to execute the fix."
          },
          {
            "en": "CAPA",
            "es": "Acción Correctiva y Preventiva",
            "ipa": "/ˈkæpə/",
            "example": "CAPA #801 closed successfully following a 30-day zero-defect trial."
          }
        ],
        "dialogue": {
          "title": "Reviewing an 8D Escalation Notice with the Quality Director",
          "speakers": [
            "Hector (Senior Quality Engineer)",
            "Dr. Vance (VP of Quality Assurance)"
          ],
          "lines": [
            {
              "speaker": "Hector",
              "text": "Dr. Vance, we finalized the D3 containment and D4 root cause sections of the 8D report for the Detroit OEM."
            },
            {
              "speaker": "Dr. Vance",
              "text": "What did the Ishikawa fishbone diagram confirm as the underlying root cause?"
            },
            {
              "speaker": "Hector",
              "text": "It confirmed that tool wear on the carbide broach exceeded threshold, causing micro-burrs on the sealing groove."
            },
            {
              "speaker": "Dr. Vance",
              "text": "And what permanent corrective action (D5) have we implemented?"
            },
            {
              "speaker": "Hector",
              "text": "We integrated an optical laser tool-wear sensor that halts the machine automatically after 500 cycles."
            },
            {
              "speaker": "Dr. Vance",
              "text": "Excellent work. That provides an airtight, data-driven response for our upcoming customer quality audit."
            }
          ]
        },
        "reading": {
          "title": "Sample Executive Memo: Urgent Escalation & Containment Protocol",
          "text": "MEMORANDUM. TO: Plant Operations Executive Committee. FROM: Quality Task Force. SUBJECT: Containment Protocol for Lot #849 Weld Discrepancy. Summary: During random destructive pull testing on Oct 19, five brackets failed below the 5.0 kN tensile specification. Immediate containment: All 1,500 finished assemblies in transit have been placed on electronic hold in warehouse quarantine. Root cause investigation is active. Zero defect escapes to customer confirmed.",
          "question": "What immediate containment action was executed for Lot #849?",
          "options": [
            "The parts were shipped anyway",
            "All 1,500 finished assemblies in transit were placed on electronic hold in quarantine",
            "The factory was closed",
            "The data was erased"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Engineering Change Order (ECO) ISO 9001 Audit Defense",
          "context": "An ISO 9001:2015 third-party auditor audits ECO-9042, which modified conformal coating thickness on aerospace engine control units (ECUs).",
          "scenario": "Defend the technical necessity, customer approval sign-offs, and drawing revision traceability of ECO-9042.",
          "role": "Configuration & Regulatory Compliance Engineer",
          "modelResponse": "Engineering Change Order ECO-9042 modifies the silicone conformal coating thickness specification from 50 to 75 microns. This revision complies with updated IPC-CC-830 humidity resistance guidelines. Full traceability records, revised Gerber CAD drawings, and customer engineering sign-off approvals are archived in our PLM system under revision Charlie, ensuring seamless production line cutover.",
          "keywords": [
            "ECO",
            "compliance",
            "specification",
            "ISO 9001",
            "traceability",
            "revision",
            "audit"
          ],
          "rubric": {
            "grammar": "Formal regulatory prose utilizing nominalizations and participial clauses.",
            "lexicon": "Accurate configuration management terminology (PLM, Gerber CAD, conformal coating, cutover).",
            "protocol": "Unshakable audit defense adhering to ISO 9001:2015 document control clauses."
          }
        },
        "quiz": [
          {
            "q": "_____ you require any further validation data, please contact our quality laboratory directly.",
            "opts": [
              "Should",
              "Would",
              "Had",
              "Could"
            ],
            "ans": 0,
            "exp": "Conditional inversion: \"Should you require...\" equals \"If you require...\"."
          },
          {
            "q": "What _____ the micro-burrs on the sealing groove was excessive tool wear on the carbide broach.",
            "opts": [
              "cause",
              "caused",
              "causing",
              "did cause"
            ],
            "ans": 1,
            "exp": "Cleft sentence structure: \"What caused [X] was [Y]\"."
          },
          {
            "q": "What is the primary objective of a \"containment action\" in manufacturing?",
            "opts": [
              "To punish machine operators",
              "To immediately prevent non-conforming parts from escaping to the customer",
              "To repaint the floor",
              "To celebrate good results"
            ],
            "ans": 1,
            "exp": "Containment actions isolate and quarantine suspect material immediately."
          },
          {
            "q": "It _____ estimated that the automated vision inspection cell will pay for itself within six months.",
            "opts": [
              "is",
              "are",
              "has",
              "was to"
            ],
            "ans": 0,
            "exp": "Passive reporting structure: \"It is estimated that...\"."
          }
        ],
        "falseCognates": [
          {
            "term": "Actual",
            "mistake": "Actual del momento presente",
            "correct": "Real / Verdadero / Medido empíricamente",
            "tip": "Para el momento presente usa \"Current\" o \"Present\". \"Actual dimensions\" son las dimensiones verdaderamente medidas en metrología."
          },
          {
            "term": "Formidable",
            "mistake": "Formidable de maravilloso o estupendo",
            "correct": "Imponente / Muy difícil de superar o desafiante",
            "tip": "En inglés, un \"formidable challenge\" significa un obstáculo intimidante y de gran dificultad técnica."
          },
          {
            "term": "Mandate",
            "mistake": "Mandado o recado informal",
            "correct": "Mandato regulatorio vinculante de autoridad federal o ISO",
            "tip": "Un \"Regulatory Mandate\" de la FDA, FAA o ISO es un requerimiento legal de cumplimiento obligatorio e ineludible."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Compliance",
            "stress": "com-PLI-ance",
            "ipa": "/kəmˈplaɪəns/",
            "rule": "Acento en la segunda sílaba \"PLI\" con diptongo /aɪ/."
          },
          {
            "term": "Specification",
            "stress": "spec-i-fi-CA-tion",
            "ipa": "/ˌspɛsɪfɪˈkeɪʃən/",
            "rule": "Acento en \"CA\"; ritmo marcado típico de normas técnicas."
          },
          {
            "term": "Traceability",
            "stress": "trace-a-BIL-i-ty",
            "ipa": "/ˌtreɪsəˈbɪlɪti/",
            "rule": "Palabra de seis sílabas; el acento recae en \"BIL\"."
          }
        ]
      },
      {
        "id": "b2-u4",
        "unitNum": 4,
        "unitNumber": 4,
        "title": "American Business Idioms & Cultural Radar",
        "titleES": "Modismos Corporativos Americanos y Radar Cultural",
        "cefrDescriptor": "Can understand a wide range of colloquial workplace idioms, navigate American corporate cultural nuances, and participate naturally in executive banter.",
        "canDo": "Comprender y utilizar con naturalidad modismos corporativos nativos sin caer en calcos literales del español ni malentendidos.",
        "grammarFocus": "High-context idioms vs literal phrasing, Phrasal verbs with multiple business meanings, Nuances of tone, humor, and executive presence",
        "communicativeGoal": "Comprender y utilizar con naturalidad modismos corporativos nativos sin caer en calcos literales del español ni malentendidos.",
        "hours": 15,
        "xp": 1400,
        "workloadBreakdown": {
          "theoryHours": 3.5,
          "audioPracticeHours": 3.5,
          "readingStandardsHours": 4,
          "plantSimulationHours": 4
        },
        "vocabulary": [
          {
            "en": "Move the Needle",
            "es": "Hacer una diferencia medible / Tener impacto real",
            "ipa": "/muːv ðə ˈniːdəl/",
            "example": "Incremental training is good, but automation is what will truly move the needle on productivity."
          },
          {
            "en": "Drop the Ball",
            "es": "Cometer un descuido / Fallar en un compromiso",
            "ipa": "/drɑːp ðə bɔːl/",
            "example": "The freight carrier dropped the ball by forgetting the customs import paperwork."
          },
          {
            "en": "Bandwidth",
            "es": "Capacidad de tiempo / Disponibilidad mental",
            "ipa": "/ˈbændˌwɪdθ/",
            "example": "I do not have the bandwidth to take on a third automation project this quarter."
          },
          {
            "en": "Low-Hanging Fruit",
            "es": "Oportunidades fáciles de lograr con poco esfuerzo",
            "ipa": "/loʊ ˈhæŋɪŋ fruːt/",
            "example": "Fixing compressed air leaks is low-hanging fruit for immediate energy savings."
          },
          {
            "en": "Ballpark Figure",
            "es": "Cifra aproximada / Estimación preliminar",
            "ipa": "/ˈbɔːlˌpɑːrk ˈfɪɡjər/",
            "example": "Can you give me a ballpark figure for the tooling retrofit costs?"
          },
          {
            "en": "Touch Base",
            "es": "Ponerse en contacto breve",
            "ipa": "/tʌtʃ beɪs/",
            "example": "Let us touch base tomorrow afternoon to verify the cleanroom airflow readings."
          }
        ],
        "dialogue": {
          "title": "Executive Sync with US Corporate Vice President",
          "speakers": [
            "Lorena (Director of Operations MX)",
            "Scott (US Vice President)"
          ],
          "lines": [
            {
              "speaker": "Scott",
              "text": "Lorena, thanks for jumping on the call. Do you have a ballpark figure for the cleanroom expansion in Mexicali?"
            },
            {
              "speaker": "Lorena",
              "text": "Yes, Scott. We estimate around $350,000 to $400,000 USD, depending on the HEPA filtration tier we select."
            },
            {
              "speaker": "Scott",
              "text": "That fits comfortably within our capital expenditure envelope. What is our low-hanging fruit to start immediate preparation?"
            },
            {
              "speaker": "Lorena",
              "text": "We can clear the existing warehouse partition this week without disrupting current assembly lines."
            },
            {
              "speaker": "Scott",
              "text": "Great. Let us make sure nobody drops the ball on the environmental permits with the city."
            },
            {
              "speaker": "Lorena",
              "text": "Understood. I will touch base with our environmental health and safety lead this afternoon."
            }
          ]
        },
        "reading": {
          "title": "Cross-Cultural Guide: Decoding American High-Context Workplace Idioms",
          "text": "When American engineering executives remark \"I do not have the bandwidth,\" they are politely declining additional responsibilities due to a full schedule, not referring to internet connectivity. Similarly, \"touching base\" implies a brief five-minute alignment check, not a formal two-hour presentation. Recognizing these corporate colloquial markers ensures seamless collaboration and elevates professional credibility across international teams.",
          "question": "What does an engineering manager mean by \"I don't have the bandwidth\"?",
          "options": [
            "Their Wi-Fi is broken",
            "They are politely declining additional tasks due to a full workload",
            "They want more work immediately",
            "They are buying new fiber optics"
          ],
          "correct": 1
        },
        "crucible": {
          "title": "Executive Capstone Defense: Nearshoring Battery Pack Line",
          "context": "You are pitching your senior capstone design to American automotive executive stakeholders: an automated prismatic lithium-ion battery assembly line optimized for Northern Mexico nearshoring hubs.",
          "scenario": "Deliver the opening project defense outlining technical architecture, throughput metrics, and nearshoring cost-lead-time advantages.",
          "role": "Mechatronics Capstone Lead Engineer",
          "modelResponse": "Good morning, members of the executive steering committee. Our capstone proposal outlines an automated prismatic lithium-ion battery cell assembly line designed specifically for Northern Mexico nearshoring corridors. By deploying six-axis robotic winding cells, integrated vision inspection, and closed-loop thermal testing, this facility achieves a cycle time of 4.2 seconds per cell with a 99.4 percent first-pass yield, reducing supply chain lead times to US assembly plants by sixty percent.",
          "keywords": [
            "capstone",
            "nearshoring",
            "cycle time",
            "yield",
            "automation",
            "assembly",
            "battery"
          ],
          "rubric": {
            "grammar": "High-level executive rhetoric with persuasive gerundive prepositional phrases (By deploying... achieving... reducing...).",
            "lexicon": "Executive-level industrial engineering and advanced nearshoring metrics (prismatic lithium-ion, cycle time, first-pass yield).",
            "protocol": "Poised, professional stakeholder presentation inspiring investor and corporate trust."
          }
        },
        "quiz": [
          {
            "q": "\"Can you give me a _____ figure for the tooling retrofit costs?\"",
            "opts": [
              "ballpark",
              "football",
              "basketball",
              "playground"
            ],
            "ans": 0,
            "exp": "\"Ballpark figure\" means an approximate or rough numerical estimate."
          },
          {
            "q": "When an executive says an initiative will \"move the needle\", they mean it will:",
            "opts": [
              "Sew clothing",
              "Have a noticeable, measurable impact on bottom-line results",
              "Be extremely slow",
              "Damage the machine needles"
            ],
            "ans": 1,
            "exp": "\"Move the needle\" means produce significant, measurable progress."
          },
          {
            "q": "What is \"low-hanging fruit\" in continuous improvement terminology?",
            "opts": [
              "Fresh apples in the dining area",
              "Easy improvements or quick wins achievable with minimal effort",
              "Tasks nobody wants to perform",
              "Expensive machine overhauls"
            ],
            "ans": 1,
            "exp": "Low-hanging fruit refers to easily achieved initial targets."
          },
          {
            "q": "When someone \"drops the ball\" in a project, they:",
            "opts": [
              "Play soccer during work hours",
              "Make a careless error or fail to fulfill a crucial commitment",
              "Drop physical tools on the floor",
              "Throw away parts"
            ],
            "ans": 1,
            "exp": "\"Drop the ball\" means to commit an oversight or fail to deliver on a commitment."
          }
        ],
        "falseCognates": [
          {
            "term": "Eventually",
            "mistake": "Eventualmente / De vez en cuando",
            "correct": "Con el tiempo / A la larga / En última instancia",
            "tip": "De vez en cuando se dice \"Occasionally\". \"Eventually\" denota un resultado que sucederá inevitablemente con el paso del tiempo."
          },
          {
            "term": "Conference",
            "mistake": "Llamada telefónica informal",
            "correct": "Congreso técnico / Conferencia magna de ingeniería",
            "tip": "En el ámbito corporativo y académico, \"Conference\" es un congreso científico formal con ponencias arbitradas."
          },
          {
            "term": "Sympathy",
            "mistake": "Simpatía personal o gracia",
            "correct": "Compasión / Solidaridad ante una dificultad",
            "tip": "Tener don de gentes o simpatía es \"Friendliness\" o \"Charisma\". \"Sympathy\" es condolencia o conmiseración."
          }
        ],
        "pronunciationLab": [
          {
            "term": "Feasibility",
            "stress": "fea-si-BIL-i-ty",
            "ipa": "/ˌfiːzəˈbɪlɪti/",
            "rule": "Acento en la antepenúltima sílaba \"BIL\"."
          },
          {
            "term": "Sustainability",
            "stress": "sus-tain-a-BIL-i-ty",
            "ipa": "/səˌsteɪnəˈbɪlɪti/",
            "rule": "Seis sílabas; acento primario en \"BIL\"."
          },
          {
            "term": "Electrification",
            "stress": "e-lec-tri-fi-CA-tion",
            "ipa": "/ɪˌlɛktrɪfɪˈkeɪʃən/",
            "rule": "Siete sílabas; acento culminante en \"CA\"."
          }
        ]
      }
    ],
    "milestone": {
      "title": "Milestone Checkpoint B2: Executive Business Communicator",
      "questions": 10,
      "passingGrade": 80,
      "badgeId": "badge-mcer-b2",
      "badgeName": "CEFR B2: Executive Fluency & Advanced Pragmatics (60.0h Course)",
      "totalHours": 60,
      "accreditation": "CACEI / DGUTyP Inglés IV"
    }
  }
];

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
