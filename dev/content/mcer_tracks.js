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
          "question": "According to the orientation notice, by what time must incoming interns complete credential verification?",
          "options": [
            "By 07:00 AM",
            "By 08:30 AM on Day One",
            "At the end of their first week",
            "During the afternoon shift change"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "According to the orientation notice, by what time must incoming interns complete credential verification?",
              "options": [
                "By 07:00 AM",
                "By 08:30 AM on Day One",
                "At the end of their first week",
                "During the afternoon shift change"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The passage explicitly states: \"All incoming engineering interns must complete their security credential verification by 08:30 AM on Day One.\""
            },
            {
              "q": "Where is Human Resources located within the Northern Tech facility?",
              "options": [
                "In Corridor B next to the lockers",
                "On the factory floor at Line 3",
                "On the second floor, Room 210",
                "At the main turnstile entrance"
              ],
              "correct": 2,
              "answer": 2,
              "exp": "The text specifies: \"Please bring your official university credentials and emergency contact sheet to Human Resources on the second floor, Room 210.\""
            },
            {
              "q": "What is the facility policy regarding personal cell phones during active operations?",
              "options": [
                "They must remain inside your equipment locker in Corridor B",
                "They may be kept on your desk in silent mode",
                "They can be used for taking machine photos freely",
                "They must be handed to your shift supervisor"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "The standard safety protocol mandates: \"Personal cell phones must remain inside your locker during active machine operations.\""
            }
          ],
          "answer": 1
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
            "exp": "Use the possessive adjective \"my\" before the noun \"name\".",
            "socraticHint": "Observa la palabra \"name\" que sigue. ¿Necesitas un pronombre sujeto, objeto o un adjetivo posesivo para indicar propiedad?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Workstation is third-person singular (it), which pairs with \"is\".",
            "socraticHint": "¿Cuál es el sujeto de la oración: \"workstation\" (singular) o \"workstations\" (plural)? ¿Qué forma del verbo \"to be\" le corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "How do you politely introduce a new colleague to your supervisor in an American plant?",
            "opts": [
              "Look at this person right now",
              "This is Maria, our new quality assurance coordinator",
              "Who is Maria here",
              "Maria is she"
            ],
            "ans": 1,
            "exp": "\"This is [Name]\" is the standard, respectful professional introduction formula in American workplace culture.",
            "socraticHint": "En el protocolo corporativo estadounidense, ¿cuál es la fórmula estándar de cortesía para presentar a un tercero a un líder?",
            "category": "Pragmática Estadounidense"
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
            "exp": "\"What is your [noun]?\" is the correct interrogative structure in English.",
            "socraticHint": "¿Cuál es la palabra interrogativa adecuada para pedir un dato de identificación específico (número, código, nombre)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"Actually, my assigned station is on Line 3.\" ¿Qué significa \"Actually\"?",
            "opts": [
              "Actualmente en este momento",
              "En realidad / De hecho",
              "Actuando en el puesto",
              "Ocasionalmente"
            ],
            "ans": 1,
            "exp": "\"Actually\" significa \"en realidad\" o \"de hecho\". Para decir \"actualmente\", se usa \"currently\" o \"at present\".",
            "socraticHint": "Recuerda la alerta de falsos amigos: ¿cómo se dice en inglés \"en este momento\" frente a \"en realidad\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing the word \"Colleague\"?",
            "opts": [
              "On the first syllable: COL-league",
              "On the second syllable: col-LEAGUE",
              "Both syllables receive equal high pitch",
              "On the silent final -ue"
            ],
            "ans": 0,
            "exp": "In standard American English, \"colleague\" is stressed on the first syllable /ˈkɑːliːɡ/, and \"-ue\" is completely silent.",
            "socraticHint": "Revisa el Laboratorio Fonético de la unidad: ¿la terminación \"-ue\" se pronuncia o es muda?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Before stepping past the blue safety line on the shopfloor, what action is mandatory?",
            "opts": [
              "Remove your badge to avoid magnetic interference",
              "Ensure you are wearing approved safety eyewear",
              "Turn off all machinery manually",
              "Wait for a written memo from HR"
            ],
            "ans": 1,
            "exp": "As outlined in the plant dialogue, safety eyewear is mandatory whenever walking past the demarcation line into active production zones.",
            "socraticHint": "En el diálogo entre Mark y Alex, ¿qué equipo de protección le pide Alex confirmar antes de cruzar la línea azul?",
            "category": "Seguridad y Protocolo"
          },
          {
            "q": "Complete the dialogue: \"_____ department are you assigned to?\" — \"I am in Quality Inspection.\"",
            "opts": [
              "Which",
              "Who",
              "When",
              "How"
            ],
            "ans": 0,
            "exp": "Use \"Which\" when choosing from a specific, defined set of departments within a company.",
            "socraticHint": "Si estás seleccionando un departamento entre las opciones disponibles de una fábrica, ¿qué palabra interrogativa se emplea?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "Hello, _____ name is David and I am an electrical engineering intern.",
            "opts": [
              "my",
              "me",
              "mine",
              "I"
            ],
            "ans": 0,
            "exp": "Use the possessive adjective \"my\" before the noun \"name\".",
            "socraticHint": "Observa la palabra \"name\" que sigue. ¿Necesitas un pronombre sujeto, objeto o un adjetivo posesivo para indicar propiedad?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Workstation is third-person singular (it), which pairs with \"is\".",
            "socraticHint": "¿Cuál es el sujeto de la oración: \"workstation\" (singular) o \"workstations\" (plural)? ¿Qué forma del verbo \"to be\" le corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "How do you politely introduce a new colleague to your supervisor in an American plant?",
            "opts": [
              "Look at this person right now",
              "This is Maria, our new quality assurance coordinator",
              "Who is Maria here",
              "Maria is she"
            ],
            "ans": 1,
            "exp": "\"This is [Name]\" is the standard, respectful professional introduction formula in American workplace culture.",
            "socraticHint": "En el protocolo corporativo estadounidense, ¿cuál es la fórmula estándar de cortesía para presentar a un tercero a un líder?",
            "category": "Pragmática Estadounidense"
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
            "exp": "\"What is your [noun]?\" is the correct interrogative structure in English.",
            "socraticHint": "¿Cuál es la palabra interrogativa adecuada para pedir un dato de identificación específico (número, código, nombre)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"Actually, my assigned station is on Line 3.\" ¿Qué significa \"Actually\"?",
            "opts": [
              "Actualmente en este momento",
              "En realidad / De hecho",
              "Actuando en el puesto",
              "Ocasionalmente"
            ],
            "ans": 1,
            "exp": "\"Actually\" significa \"en realidad\" o \"de hecho\". Para decir \"actualmente\", se usa \"currently\" o \"at present\".",
            "socraticHint": "Recuerda la alerta de falsos amigos: ¿cómo se dice en inglés \"en este momento\" frente a \"en realidad\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing the word \"Colleague\"?",
            "opts": [
              "On the first syllable: COL-league",
              "On the second syllable: col-LEAGUE",
              "Both syllables receive equal high pitch",
              "On the silent final -ue"
            ],
            "ans": 0,
            "exp": "In standard American English, \"colleague\" is stressed on the first syllable /ˈkɑːliːɡ/, and \"-ue\" is completely silent.",
            "socraticHint": "Revisa el Laboratorio Fonético de la unidad: ¿la terminación \"-ue\" se pronuncia o es muda?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Before stepping past the blue safety line on the shopfloor, what action is mandatory?",
            "opts": [
              "Remove your badge to avoid magnetic interference",
              "Ensure you are wearing approved safety eyewear",
              "Turn off all machinery manually",
              "Wait for a written memo from HR"
            ],
            "ans": 1,
            "exp": "As outlined in the plant dialogue, safety eyewear is mandatory whenever walking past the demarcation line into active production zones.",
            "socraticHint": "En el diálogo entre Mark y Alex, ¿qué equipo de protección le pide Alex confirmar antes de cruzar la línea azul?",
            "category": "Seguridad y Protocolo"
          },
          {
            "q": "Complete the dialogue: \"_____ department are you assigned to?\" — \"I am in Quality Inspection.\"",
            "opts": [
              "Which",
              "Who",
              "When",
              "How"
            ],
            "ans": 0,
            "exp": "Use \"Which\" when choosing from a specific, defined set of departments within a company.",
            "socraticHint": "Si estás seleccionando un departamento entre las opciones disponibles de una fábrica, ¿qué palabra interrogativa se emplea?",
            "category": "Léxico Técnico"
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
          "question": "How many continuous operating shifts run at the manufacturing facility?",
          "options": [
            "Two shifts: Day and Night",
            "Three continuous shifts: Shift 1, Shift 2, and Shift 3",
            "One extended 12-hour shift",
            "Four rotating weekend shifts"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "How many continuous operating shifts run at the manufacturing facility?",
              "options": [
                "Two shifts: Day and Night",
                "Three continuous shifts: Shift 1, Shift 2, and Shift 3",
                "One extended 12-hour shift",
                "Four rotating weekend shifts"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The document states: \"Plant operations run on three continuous shifts. Shift 1 (07:00-15:30), Shift 2 (15:30-23:30), and Shift 3 (23:30-07:00).\""
            },
            {
              "q": "What is the primary operational reason for staggering cafeteria lunch times into Group A and Group B?",
              "options": [
                "Because the cafeteria cooks only prepare food for 20 people",
                "To prevent production bottlenecks and maintain line coverage on the floor",
                "To allow managers to eat before technicians",
                "To clean the tables between meal groups"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The text specifies: \"To prevent production bottlenecks, cafeteria meal times are strictly staggered: Group A dines at 11:30 AM, and Group B dines at 12:15 PM.\""
            },
            {
              "q": "What rule must operators follow regarding conveyor lines during meal handoffs?",
              "options": [
                "Operators must turn off the main circuit breaker during lunch",
                "Operators must speed up the conveyor before leaving",
                "Operators must never leave active conveyor lines unattended during break handoffs",
                "Operators can leave whenever their personal watch shows 11:30 AM"
              ],
              "correct": 2,
              "answer": 2,
              "exp": "The safety directive mandates: \"Operators must never leave active conveyor lines unattended during break handoffs.\""
            }
          ],
          "answer": 1
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
            "exp": "In English, use the preposition \"at\" with specific clock times (at 7:15 AM, at noon).",
            "socraticHint": "¿Qué preposición de tiempo se utiliza en inglés antes de horas exactas del reloj?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Frequency adverbs follow the verb \"to be\" (Subject + BE + Adverb: \"she is never late\").",
            "socraticHint": "Cuando usamos el verbo \"to be\", ¿el adverbio de frecuencia (never, always) se coloca antes o después de \"is\"?",
            "category": "Gramática y Sintaxis"
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
            "exp": "In Simple Present questions with subject pronoun \"you\", use auxiliary \"do\".",
            "socraticHint": "En preguntas del presente simple, ¿cuál es el verbo auxiliar para la segunda persona (you)?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Use the preposition \"on\" with days of the week (on Monday, on weekends).",
            "socraticHint": "¿Qué preposición en inglés acompaña a los días de la semana y fechas específicas?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"All technicians must attend the mandatory EHS meeting.\" ¿Qué significa \"attend\"?",
            "opts": [
              "Atender y arreglar una máquina descompuesta",
              "Asistir presencialmente a la reunión",
              "Esperar a que comience la junta",
              "Servir café a los supervisores"
            ],
            "ans": 1,
            "exp": "\"Attend\" significa estar presente o asistir a una sesión. \"Atender\" a un equipo se traduce como \"check\" o \"service\".",
            "socraticHint": "Revisa la alerta de falsos amigos: ¿cómo traduces \"asistir a un evento\" vs. \"atender una máquina\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall in the technical noun \"Maintenance\"?",
            "opts": [
              "On the first syllable: MAIN-te-nance",
              "On the middle syllable: main-TE-nance",
              "On the final syllable: main-te-NANCE",
              "It is pronounced without any stressed vowel"
            ],
            "ans": 0,
            "exp": "In American English, \"maintenance\" has its primary stress on the first syllable: /ˈmeɪntənəns/.",
            "socraticHint": "¿El acento recae en la primera sílaba \"MAIN\" o se pronuncia agudo como en español?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Before leaving the plant at the end of a shift, what must operators do at the digital time clock?",
            "opts": [
              "Punch out using their digital badge",
              "Unplug the time clock power supply",
              "Reformat the memory card",
              "Write their signature on the wall"
            ],
            "ans": 0,
            "exp": "To \"punch out\" (or clock out) means recording the end of your shift on the attendance system.",
            "socraticHint": "¿Cuál es el término técnico en inglés estadounidense para registrar la salida en el checador?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Technicians _____ the daily maintenance log before shutting down the hydraulic pump.",
            "opts": [
              "always update",
              "update always",
              "are always update",
              "always updating"
            ],
            "ans": 0,
            "exp": "With regular action verbs, adverbs of frequency precede the main verb: Subject + Adverb + Verb (\"always update\").",
            "socraticHint": "A diferencia del verbo \"to be\", ¿dónde se sitúa el adverbio \"always\" frente a verbos de acción como \"update\"?",
            "category": "Gramática y Sintaxis"
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
        ],
        "unitQuiz": [
          {
            "q": "The morning safety briefing starts _____ 7:15 AM every morning.",
            "opts": [
              "in",
              "on",
              "at",
              "to"
            ],
            "ans": 2,
            "exp": "In English, use the preposition \"at\" with specific clock times (at 7:15 AM, at noon).",
            "socraticHint": "¿Qué preposición de tiempo se utiliza en inglés antes de horas exactas del reloj?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Frequency adverbs follow the verb \"to be\" (Subject + BE + Adverb: \"she is never late\").",
            "socraticHint": "Cuando usamos el verbo \"to be\", ¿el adverbio de frecuencia (never, always) se coloca antes o después de \"is\"?",
            "category": "Gramática y Sintaxis"
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
            "exp": "In Simple Present questions with subject pronoun \"you\", use auxiliary \"do\".",
            "socraticHint": "En preguntas del presente simple, ¿cuál es el verbo auxiliar para la segunda persona (you)?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Use the preposition \"on\" with days of the week (on Monday, on weekends).",
            "socraticHint": "¿Qué preposición en inglés acompaña a los días de la semana y fechas específicas?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"All technicians must attend the mandatory EHS meeting.\" ¿Qué significa \"attend\"?",
            "opts": [
              "Atender y arreglar una máquina descompuesta",
              "Asistir presencialmente a la reunión",
              "Esperar a que comience la junta",
              "Servir café a los supervisores"
            ],
            "ans": 1,
            "exp": "\"Attend\" significa estar presente o asistir a una sesión. \"Atender\" a un equipo se traduce como \"check\" o \"service\".",
            "socraticHint": "Revisa la alerta de falsos amigos: ¿cómo traduces \"asistir a un evento\" vs. \"atender una máquina\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall in the technical noun \"Maintenance\"?",
            "opts": [
              "On the first syllable: MAIN-te-nance",
              "On the middle syllable: main-TE-nance",
              "On the final syllable: main-te-NANCE",
              "It is pronounced without any stressed vowel"
            ],
            "ans": 0,
            "exp": "In American English, \"maintenance\" has its primary stress on the first syllable: /ˈmeɪntənəns/.",
            "socraticHint": "¿El acento recae en la primera sílaba \"MAIN\" o se pronuncia agudo como en español?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Before leaving the plant at the end of a shift, what must operators do at the digital time clock?",
            "opts": [
              "Punch out using their digital badge",
              "Unplug the time clock power supply",
              "Reformat the memory card",
              "Write their signature on the wall"
            ],
            "ans": 0,
            "exp": "To \"punch out\" (or clock out) means recording the end of your shift on the attendance system.",
            "socraticHint": "¿Cuál es el término técnico en inglés estadounidense para registrar la salida en el checador?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Technicians _____ the daily maintenance log before shutting down the hydraulic pump.",
            "opts": [
              "always update",
              "update always",
              "are always update",
              "always updating"
            ],
            "ans": 0,
            "exp": "With regular action verbs, adverbs of frequency precede the main verb: Subject + Adverb + Verb (\"always update\").",
            "socraticHint": "A diferencia del verbo \"to be\", ¿dónde se sitúa el adverbio \"always\" frente a verbos de acción como \"update\"?",
            "category": "Gramática y Sintaxis"
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
          "question": "Under 5S housekeeping standards, how must every hand tool be stored on the shadow board?",
          "options": [
            "Inside any random drawer that is empty",
            "In its designated shadow outline with matching silhouette",
            "Stacked in piles of ten on the workbench",
            "Stored inside the operator lunch locker"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "Under 5S housekeeping standards, how must every hand tool be stored on the shadow board?",
              "options": [
                "Inside any random drawer that is empty",
                "In its designated shadow outline with matching silhouette",
                "Stacked in piles of ten on the workbench",
                "Stored inside the operator lunch locker"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The text specifies: \"Under 5S housekeeping standards, every tool has a designated shadow outline.\""
            },
            {
              "q": "What electronic procedure is required to sign out specialized calibration gauges from the tool crib?",
              "options": [
                "Scanning your employee ID badge at the checkout terminal",
                "Paying a cash deposit to the crib attendant",
                "Submitting a printed paper requisition form signed by HR",
                "Calling the university academic dean"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "The rule states: \"All specialized calibration gauges must be signed out electronically using your employee badge.\""
            },
            {
              "q": "What is prohibited regarding machine guards and electrical enclosures?",
              "options": [
                "Cleaning them with microfiber cloths",
                "Leaving loose hand tools on top of active machine guards or enclosures",
                "Inspecting them during preventative maintenance",
                "Painting them safety yellow"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The text strictly warns: \"Never leave loose hand tools on top of active machine guards or electrical enclosures.\""
            }
          ],
          "answer": 1
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
            "q": "_____ two emergency eyewash stations located next to the chemical storage enclosure.",
            "opts": [
              "There is",
              "There are",
              "They have",
              "Are there"
            ],
            "ans": 1,
            "exp": "Use \"There are\" with plural noun phrases (\"two emergency eyewash stations\").",
            "socraticHint": "¿El sustantivo \"eyewash stations\" es singular o plural? ¿Cuál expresión existencial corresponde en plural?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Use preposition \"in\" to denote containment inside an enclosed drawer, box, or cabinet.",
            "socraticHint": "Si un objeto está dentro de un cajón o gabinete cerrado, ¿qué preposición espacial se emplea?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The main emergency exit is located _____ Line 2 and the motor testing bay.",
            "opts": [
              "under",
              "between",
              "inside of",
              "amongst"
            ],
            "ans": 1,
            "exp": "Use \"between\" when specifying a position in the space separating two distinct entities.",
            "socraticHint": "Cuando un elemento se ubica en el espacio intermedio que separa dos puntos específicos, ¿qué preposición se usa?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which tool is calibrated specifically to verify the precise outer diameter of cylindrical pins?",
            "opts": [
              "Digital calipers",
              "Heavy sledgehammer",
              "Wire cutters",
              "Utility razor knife"
            ],
            "ans": 0,
            "exp": "Calipers (vernier) are precision metrology instruments used to measure internal and external dimensions.",
            "socraticHint": "¿Cuál instrumento de metrología dimensional mide diámetros externos con precisión de milésimas de pulgada o milímetros?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"There are multiple spare parts in the cabinet.\" ¿Qué son \"spare parts\"?",
            "opts": [
              "Partes que estorban o sobran",
              "Refacciones y piezas de repuesto",
              "Herramientas rotas para chatarra",
              "Muestras de laboratorio químico"
            ],
            "ans": 1,
            "exp": "\"Spare parts\" son piezas de repuesto o refacciones operativas para mantenimiento.",
            "socraticHint": "¿Cómo se le denomina en la industria de manufactura a las piezas de recambio para máquinas?",
            "category": "Léxico Técnico"
          },
          {
            "q": "What is the regular plural form of the noun \"Calibrator\"?",
            "opts": [
              "Calibratores",
              "Calibrators",
              "Calibrateries",
              "Calibrator-men"
            ],
            "ans": 1,
            "exp": "The regular plural is formed by adding -s: \"Calibrators\".",
            "socraticHint": "Aplica la regla morfológica regular de pluralización en inglés para sustantivos estándar.",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Workstation\"?",
            "opts": [
              "WORK-sta-tion (accent on WORK)",
              "work-STA-tion (accent on STA)",
              "work-sta-TION (accent on TION)",
              "There is no stressed syllable"
            ],
            "ans": 0,
            "exp": "In compound workplace nouns, the primary stress falls on the first element: WORK-sta-tion.",
            "socraticHint": "En palabras compuestas en inglés técnico, ¿dónde recae generalmente el acento de intensidad?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Complete the inventory inquiry: \"_____ any 5mm hex wrenches left on the mobile cart?\"",
            "opts": [
              "Is there",
              "Are there",
              "There are",
              "Have there"
            ],
            "ans": 1,
            "exp": "In questions with plural countable nouns (\"hex wrenches\"), invert to \"Are there...?\"",
            "socraticHint": "Para formular una pregunta sobre la existencia de objetos en plural, ¿cómo se invierte la estructura?",
            "category": "Gramática y Sintaxis"
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
        ],
        "unitQuiz": [
          {
            "q": "_____ two emergency eyewash stations located next to the chemical storage enclosure.",
            "opts": [
              "There is",
              "There are",
              "They have",
              "Are there"
            ],
            "ans": 1,
            "exp": "Use \"There are\" with plural noun phrases (\"two emergency eyewash stations\").",
            "socraticHint": "¿El sustantivo \"eyewash stations\" es singular o plural? ¿Cuál expresión existencial corresponde en plural?",
            "category": "Gramática y Sintaxis"
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
            "exp": "Use preposition \"in\" to denote containment inside an enclosed drawer, box, or cabinet.",
            "socraticHint": "Si un objeto está dentro de un cajón o gabinete cerrado, ¿qué preposición espacial se emplea?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The main emergency exit is located _____ Line 2 and the motor testing bay.",
            "opts": [
              "under",
              "between",
              "inside of",
              "amongst"
            ],
            "ans": 1,
            "exp": "Use \"between\" when specifying a position in the space separating two distinct entities.",
            "socraticHint": "Cuando un elemento se ubica en el espacio intermedio que separa dos puntos específicos, ¿qué preposición se usa?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which tool is calibrated specifically to verify the precise outer diameter of cylindrical pins?",
            "opts": [
              "Digital calipers",
              "Heavy sledgehammer",
              "Wire cutters",
              "Utility razor knife"
            ],
            "ans": 0,
            "exp": "Calipers (vernier) are precision metrology instruments used to measure internal and external dimensions.",
            "socraticHint": "¿Cuál instrumento de metrología dimensional mide diámetros externos con precisión de milésimas de pulgada o milímetros?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"There are multiple spare parts in the cabinet.\" ¿Qué son \"spare parts\"?",
            "opts": [
              "Partes que estorban o sobran",
              "Refacciones y piezas de repuesto",
              "Herramientas rotas para chatarra",
              "Muestras de laboratorio químico"
            ],
            "ans": 1,
            "exp": "\"Spare parts\" son piezas de repuesto o refacciones operativas para mantenimiento.",
            "socraticHint": "¿Cómo se le denomina en la industria de manufactura a las piezas de recambio para máquinas?",
            "category": "Léxico Técnico"
          },
          {
            "q": "What is the regular plural form of the noun \"Calibrator\"?",
            "opts": [
              "Calibratores",
              "Calibrators",
              "Calibrateries",
              "Calibrator-men"
            ],
            "ans": 1,
            "exp": "The regular plural is formed by adding -s: \"Calibrators\".",
            "socraticHint": "Aplica la regla morfológica regular de pluralización en inglés para sustantivos estándar.",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Workstation\"?",
            "opts": [
              "WORK-sta-tion (accent on WORK)",
              "work-STA-tion (accent on STA)",
              "work-sta-TION (accent on TION)",
              "There is no stressed syllable"
            ],
            "ans": 0,
            "exp": "In compound workplace nouns, the primary stress falls on the first element: WORK-sta-tion.",
            "socraticHint": "En palabras compuestas en inglés técnico, ¿dónde recae generalmente el acento de intensidad?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Complete the inventory inquiry: \"_____ any 5mm hex wrenches left on the mobile cart?\"",
            "opts": [
              "Is there",
              "Are there",
              "There are",
              "Have there"
            ],
            "ans": 1,
            "exp": "In questions with plural countable nouns (\"hex wrenches\"), invert to \"Are there...?\"",
            "socraticHint": "Para formular una pregunta sobre la existencia de objetos en plural, ¿cómo se invierte la estructura?",
            "category": "Gramática y Sintaxis"
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
          "question": "Under OSHA standards, what color combination identifies Lockout/Tagout (LOTO) energy isolation warning tags?",
          "options": [
            "Green and white",
            "Red, black, and white danger tags with hazard warnings",
            "Blue and yellow information tags",
            "Solid orange maintenance labels"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "Under OSHA standards, what color combination identifies Lockout/Tagout (LOTO) energy isolation warning tags?",
              "options": [
                "Green and white",
                "Red, black, and white danger tags with hazard warnings",
                "Blue and yellow information tags",
                "Solid orange maintenance labels"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The safety specification states that OSHA LOTO padlocks and tags feature high-visibility red, black, and white warning typography to signal zero-energy state."
            },
            {
              "q": "What type of footwear is mandatory across all active warehouse and machine cell aisles?",
              "options": [
                "Breathable canvas running shoes",
                "ASTM-compliant steel-toe or composite safety boots",
                "Open-toe rubber sandals for ventilation",
                "Standard leather office shoes"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The standard mandates ASTM F2413 compliant steel-toe or composite toe protective footwear."
            },
            {
              "q": "What is the immediate requirement when high-decibel acoustic levels exceed 85 dBA?",
              "options": [
                "Operators must shout to communicate",
                "Approved hearing protection (earplugs or earmuffs) must be worn",
                "The line must be permanently dismantled",
                "Operators can remove their eye protection"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "OSHA standard 1910.95 requires approved hearing protection in continuous noise environments above 85 dBA."
            }
          ],
          "answer": 1
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
            "q": "You _____ wear ANSI Z87.1 approved safety glasses in all designated yellow floor zones.",
            "opts": [
              "must",
              "can optionally",
              "are never",
              "might if comfortable"
            ],
            "ans": 0,
            "exp": "Use modal \"must\" to express mandatory regulatory requirements and critical safety rules.",
            "socraticHint": "¿Cuál verbo modal expresa una obligación estricta e ineludible impuesta por una norma de seguridad industrial?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Choose the correct imperative instruction: \"_____ the emergency stop button immediately if the robotic arm jams!\"",
            "opts": [
              "Pressing",
              "To press",
              "Press",
              "You pressing"
            ],
            "ans": 2,
            "exp": "Imperative instructions start with the base form of the verb without \"to\" or suffixes: \"Press\".",
            "socraticHint": "¿Cómo se forma una orden o instrucción directa de emergencia en inglés técnico?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Do not _____ any electrical control panel without an authorized Lockout/Tagout permit.",
            "opts": [
              "open",
              "opening",
              "opened",
              "to open"
            ],
            "ans": 0,
            "exp": "Negative imperatives use \"Do not\" followed by the base form of the verb (\"open\").",
            "socraticHint": "Después de \"Do not\" en una prohibición técnica, ¿qué forma debe adoptar el verbo principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What does the industrial acronym \"PPE\" stand for under OSHA and safety guidelines?",
            "opts": [
              "Personal Plant Equipment",
              "Personal Protective Equipment",
              "Primary Production Engine",
              "Physical Protection Element"
            ],
            "ans": 1,
            "exp": "PPE stands for Personal Protective Equipment (EPP en español).",
            "socraticHint": "¿Cuál es el significado formal internacional de la sigla \"PPE\" en seguridad y salud ocupacional?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"Wear ear protection to avoid injury in this facility.\" ¿Qué es una \"injury\"?",
            "opts": [
              "Una calumnia legal o insulto",
              "Una lesión o herida física en el cuerpo",
              "Una pieza de desecho oxidada",
              "Una multa económica aplicada por el supervisor"
            ],
            "ans": 1,
            "exp": "\"Injury\" significa lesión o herida física en el cuerpo. Una injuria moral es \"insult\" o \"slander\".",
            "socraticHint": "Revisa el falso amigo: ¿\"injury\" se refiere a una ofensa verbal o a una lesión corporal en el trabajo?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Hazardous\"?",
            "opts": [
              "HAZ-ard-ous (accent on HAZ)",
              "haz-ARD-ous (accent on ARD)",
              "haz-ard-OUS (accent on OUS)",
              "Equal flat tone on all syllables"
            ],
            "ans": 0,
            "exp": "In American English, \"hazardous\" is stressed on the first syllable: /ˈhæzərdəs/.",
            "socraticHint": "¿El adjetivo \"hazardous\" (peligroso) se acentúa en la primera sílaba o en el sufijo?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Operators _____ clear of the robotic travel perimeter while the amber strobe light flashes.",
            "opts": [
              "must remain",
              "remaining",
              "must to remain",
              "remained always"
            ],
            "ans": 0,
            "exp": "Modals like \"must\" take the base verb directly without \"to\": \"must remain\".",
            "socraticHint": "¿Los verbos modales como \"must\" llevan o no la preposición \"to\" antes del verbo principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What color safety sign universally designates chemical and eyewash emergency equipment under OSHA standards?",
            "opts": [
              "Safety Green with white graphics",
              "Bright Purple with black dots",
              "Solid Red with skulls",
              "Fluorescent Pink"
            ],
            "ans": 0,
            "exp": "Safety Green is the international color designation for first aid, safety eyewash, and emergency equipment.",
            "socraticHint": "¿Cuál es el código de color internacional estándar para estaciones de primeros auxilios y lavaojos?",
            "category": "Seguridad y Protocolo"
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
        ],
        "unitQuiz": [
          {
            "q": "You _____ wear ANSI Z87.1 approved safety glasses in all designated yellow floor zones.",
            "opts": [
              "must",
              "can optionally",
              "are never",
              "might if comfortable"
            ],
            "ans": 0,
            "exp": "Use modal \"must\" to express mandatory regulatory requirements and critical safety rules.",
            "socraticHint": "¿Cuál verbo modal expresa una obligación estricta e ineludible impuesta por una norma de seguridad industrial?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Choose the correct imperative instruction: \"_____ the emergency stop button immediately if the robotic arm jams!\"",
            "opts": [
              "Pressing",
              "To press",
              "Press",
              "You pressing"
            ],
            "ans": 2,
            "exp": "Imperative instructions start with the base form of the verb without \"to\" or suffixes: \"Press\".",
            "socraticHint": "¿Cómo se forma una orden o instrucción directa de emergencia en inglés técnico?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Do not _____ any electrical control panel without an authorized Lockout/Tagout permit.",
            "opts": [
              "open",
              "opening",
              "opened",
              "to open"
            ],
            "ans": 0,
            "exp": "Negative imperatives use \"Do not\" followed by the base form of the verb (\"open\").",
            "socraticHint": "Después de \"Do not\" en una prohibición técnica, ¿qué forma debe adoptar el verbo principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What does the industrial acronym \"PPE\" stand for under OSHA and safety guidelines?",
            "opts": [
              "Personal Plant Equipment",
              "Personal Protective Equipment",
              "Primary Production Engine",
              "Physical Protection Element"
            ],
            "ans": 1,
            "exp": "PPE stands for Personal Protective Equipment (EPP en español).",
            "socraticHint": "¿Cuál es el significado formal internacional de la sigla \"PPE\" en seguridad y salud ocupacional?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"Wear ear protection to avoid injury in this facility.\" ¿Qué es una \"injury\"?",
            "opts": [
              "Una calumnia legal o insulto",
              "Una lesión o herida física en el cuerpo",
              "Una pieza de desecho oxidada",
              "Una multa económica aplicada por el supervisor"
            ],
            "ans": 1,
            "exp": "\"Injury\" significa lesión o herida física en el cuerpo. Una injuria moral es \"insult\" o \"slander\".",
            "socraticHint": "Revisa el falso amigo: ¿\"injury\" se refiere a una ofensa verbal o a una lesión corporal en el trabajo?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Hazardous\"?",
            "opts": [
              "HAZ-ard-ous (accent on HAZ)",
              "haz-ARD-ous (accent on ARD)",
              "haz-ard-OUS (accent on OUS)",
              "Equal flat tone on all syllables"
            ],
            "ans": 0,
            "exp": "In American English, \"hazardous\" is stressed on the first syllable: /ˈhæzərdəs/.",
            "socraticHint": "¿El adjetivo \"hazardous\" (peligroso) se acentúa en la primera sílaba o en el sufijo?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Operators _____ clear of the robotic travel perimeter while the amber strobe light flashes.",
            "opts": [
              "must remain",
              "remaining",
              "must to remain",
              "remained always"
            ],
            "ans": 0,
            "exp": "Modals like \"must\" take the base verb directly without \"to\": \"must remain\".",
            "socraticHint": "¿Los verbos modales como \"must\" llevan o no la preposición \"to\" antes del verbo principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What color safety sign universally designates chemical and eyewash emergency equipment under OSHA standards?",
            "opts": [
              "Safety Green with white graphics",
              "Bright Purple with black dots",
              "Solid Red with skulls",
              "Fluorescent Pink"
            ],
            "ans": 0,
            "exp": "Safety Green is the international color designation for first aid, safety eyewash, and emergency equipment.",
            "socraticHint": "¿Cuál es el código de color internacional estándar para estaciones de primeros auxilios y lavaojos?",
            "category": "Seguridad y Protocolo"
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
          "question": "What is the required initial action before starting automated conveyor sequencing?",
          "options": [
            "Lubricate the main drive chain while running",
            "Perform a visual inspection and verify that all interlock switches are closed",
            "Increase the motor voltage to 480V",
            "Clear the PLC memory registry"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "What is the required initial action before starting automated conveyor sequencing?",
              "options": [
                "Lubricate the main drive chain while running",
                "Perform a visual inspection and verify that all interlock switches are closed",
                "Increase the motor voltage to 480V",
                "Clear the PLC memory registry"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The SOP states that operators must first inspect safety interlocks and clear the bed before initiating automated conveyor start cycles."
            },
            {
              "q": "At what frequency must operators calibrate optical sensor focal distances on the assembly jig?",
              "options": [
                "Once every year",
                "At the start of every shift and after any tooling changeover",
                "Only after an optical lens breaks",
                "Whenever an auditor visits the floor"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Calibration is required at shift inception and following any mechanical tooling adjustment."
            },
            {
              "q": "What does a blinking yellow beacon on the machine tower light indicate?",
              "options": [
                "Normal automated running cycle",
                "Machine is operating in manual setup mode or awaiting feeder reload",
                "Emergency stop triggered",
                "Power disconnect failure"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Under standard NFPA 79 tower light conventions, yellow indicates a warning, manual mode, or hopper reload condition."
            }
          ],
          "answer": 1
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
            "q": "_____, inspect the pneumatic hoses; next, connect the air regulator to 90 PSI.",
            "opts": [
              "First",
              "Finally",
              "At last",
              "After while"
            ],
            "ans": 0,
            "exp": "Use \"First\" to introduce the initial step in a technical sequence.",
            "socraticHint": "¿Cuál conector discursivo introduce el primer paso de un procedimiento operativo?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The technician is currently _____ the tension on the main drive belt.",
            "opts": [
              "adjust",
              "adjusts",
              "adjusting",
              "adjusted"
            ],
            "ans": 2,
            "exp": "With \"is currently\", form the Present Continuous with -ing: \"is currently adjusting\".",
            "socraticHint": "La presencia de \"is currently\" indica una acción en progreso. ¿Qué terminación verbal requiere?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Before power-up, ensure the safety interlock switch _____ properly engaged.",
            "opts": [
              "is",
              "are",
              "be",
              "were"
            ],
            "ans": 0,
            "exp": "\"Safety interlock switch\" is third-person singular (it), requiring \"is\".",
            "socraticHint": "Identifica el núcleo del sujeto: \"switch\" está en singular. ¿Qué forma del verbo \"to be\" corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which sequence adverb correctly indicates the conclusion of a four-step setup procedure?",
            "opts": [
              "Initially",
              "Next",
              "Finally",
              "Meanwhile"
            ],
            "ans": 2,
            "exp": "\"Finally\" designates the concluding step in a chronological engineering workflow.",
            "socraticHint": "¿Cuál adverbio de secuencia introduce el paso terminal o de cierre?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"The plant is a high-tech facility.\" ¿Qué significa \"facility\"?",
            "opts": [
              "Facilidad o habilidad fácil para hacer algo",
              "Instalación industrial / Planta / Edificio de manufactura",
              "Dificultad técnica imprevista",
              "Aparato electrónico simple"
            ],
            "ans": 1,
            "exp": "\"Facility\" en contexto industrial se refiere a una planta o instalación manufacturera. Facilidad de hacer algo es \"ease\".",
            "socraticHint": "Revisa el falso amigo: en inglés corporativo, ¿a qué se refiere \"the facility\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Pneumatic\"?",
            "opts": [
              "PNEU-mat-ic",
              "pneu-MAT-ic (accent on MAT)",
              "pneu-mat-IC",
              "The p- is pronounced with an explosive pop"
            ],
            "ans": 1,
            "exp": "In American English, the \"p-\" is completely silent and primary stress falls on the second syllable: /nuːˈmætɪk/.",
            "socraticHint": "Recuerda que la \"p\" es muda. ¿Dónde recae el golpe de voz prosódico?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The operator _____ the digital touch screen to reset the batch cycle counter right now.",
            "opts": [
              "touches",
              "is touching",
              "touched",
              "was touch"
            ],
            "ans": 1,
            "exp": "The time expression \"right now\" requires the Present Continuous: \"is touching\".",
            "socraticHint": "La frase temporal \"right now\" exige describir una acción en progreso en este instante.",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which pressure unit is standard for industrial pneumatic air lines in North American facilities?",
            "opts": [
              "PSI (Pounds per Square Inch)",
              "Kelvin",
              "Gallons per Minute",
              "RPM"
            ],
            "ans": 0,
            "exp": "PSI (Pounds per Square Inch) is the standard US customary unit for pneumatic line pressure.",
            "socraticHint": "¿Cuál es la unidad de presión manométrica estándar en la industria estadounidense?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "_____, inspect the pneumatic hoses; next, connect the air regulator to 90 PSI.",
            "opts": [
              "First",
              "Finally",
              "At last",
              "After while"
            ],
            "ans": 0,
            "exp": "Use \"First\" to introduce the initial step in a technical sequence.",
            "socraticHint": "¿Cuál conector discursivo introduce el primer paso de un procedimiento operativo?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The technician is currently _____ the tension on the main drive belt.",
            "opts": [
              "adjust",
              "adjusts",
              "adjusting",
              "adjusted"
            ],
            "ans": 2,
            "exp": "With \"is currently\", form the Present Continuous with -ing: \"is currently adjusting\".",
            "socraticHint": "La presencia de \"is currently\" indica una acción en progreso. ¿Qué terminación verbal requiere?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Before power-up, ensure the safety interlock switch _____ properly engaged.",
            "opts": [
              "is",
              "are",
              "be",
              "were"
            ],
            "ans": 0,
            "exp": "\"Safety interlock switch\" is third-person singular (it), requiring \"is\".",
            "socraticHint": "Identifica el núcleo del sujeto: \"switch\" está en singular. ¿Qué forma del verbo \"to be\" corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which sequence adverb correctly indicates the conclusion of a four-step setup procedure?",
            "opts": [
              "Initially",
              "Next",
              "Finally",
              "Meanwhile"
            ],
            "ans": 2,
            "exp": "\"Finally\" designates the concluding step in a chronological engineering workflow.",
            "socraticHint": "¿Cuál adverbio de secuencia introduce el paso terminal o de cierre?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"The plant is a high-tech facility.\" ¿Qué significa \"facility\"?",
            "opts": [
              "Facilidad o habilidad fácil para hacer algo",
              "Instalación industrial / Planta / Edificio de manufactura",
              "Dificultad técnica imprevista",
              "Aparato electrónico simple"
            ],
            "ans": 1,
            "exp": "\"Facility\" en contexto industrial se refiere a una planta o instalación manufacturera. Facilidad de hacer algo es \"ease\".",
            "socraticHint": "Revisa el falso amigo: en inglés corporativo, ¿a qué se refiere \"the facility\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Pneumatic\"?",
            "opts": [
              "PNEU-mat-ic",
              "pneu-MAT-ic (accent on MAT)",
              "pneu-mat-IC",
              "The p- is pronounced with an explosive pop"
            ],
            "ans": 1,
            "exp": "In American English, the \"p-\" is completely silent and primary stress falls on the second syllable: /nuːˈmætɪk/.",
            "socraticHint": "Recuerda que la \"p\" es muda. ¿Dónde recae el golpe de voz prosódico?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The operator _____ the digital touch screen to reset the batch cycle counter right now.",
            "opts": [
              "touches",
              "is touching",
              "touched",
              "was touch"
            ],
            "ans": 1,
            "exp": "The time expression \"right now\" requires the Present Continuous: \"is touching\".",
            "socraticHint": "La frase temporal \"right now\" exige describir una acción en progreso en este instante.",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which pressure unit is standard for industrial pneumatic air lines in North American facilities?",
            "opts": [
              "PSI (Pounds per Square Inch)",
              "Kelvin",
              "Gallons per Minute",
              "RPM"
            ],
            "ans": 0,
            "exp": "PSI (Pounds per Square Inch) is the standard US customary unit for pneumatic line pressure.",
            "socraticHint": "¿Cuál es la unidad de presión manométrica estándar en la industria estadounidense?",
            "category": "Léxico Técnico"
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
          "question": "What physical anomaly caused the automatic shutoff on Stamping Press #4 yesterday?",
          "options": [
            "An overvoltage surge on the secondary transformer",
            "A sheared alignment pin causing a sheet metal jam in the die cavity",
            "A lack of hydraulic oil in the reservoir",
            "An operator pressing the start button repeatedly"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "What physical anomaly caused the automatic shutoff on Stamping Press #4 yesterday?",
              "options": [
                "An overvoltage surge on the secondary transformer",
                "A sheared alignment pin causing a sheet metal jam in the die cavity",
                "A lack of hydraulic oil in the reservoir",
                "An operator pressing the start button repeatedly"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The incident log recorded a sheared alignment pin that resulted in an immediate sheet metal feeding jam."
            },
            {
              "q": "What maintenance action was completed before resetting the emergency circuit?",
              "options": [
                "The tooling die was repainted blue",
                "Technicians extracted the jammed scrap and torqued a replacement pin to 65 Nm",
                "The whole stamping press was sold for scrap",
                "Operators bypassed the optical light curtain"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The report specifies scrap extraction and torquing a new pin to 65 Nm under lock-out conditions."
            },
            {
              "q": "How long did the total unprogrammed downtime last?",
              "options": [
                "5 minutes",
                "42 minutes of downtime",
                "3 full days",
                "12 hours"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The downtime log shows the press stopped at 10:14 AM and restarted at 10:56 AM, totaling 42 minutes."
            }
          ],
          "answer": 1
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
            "q": "Yesterday morning, the conveyor motor _____ unexpectedly due to thermal overload.",
            "opts": [
              "stops",
              "stopped",
              "stopping",
              "is stop"
            ],
            "ans": 1,
            "exp": "The time marker \"Yesterday morning\" requires Past Simple: \"stopped\".",
            "socraticHint": "El marcador temporal \"Yesterday morning\" sitúa la acción en el pasado cerrado. ¿Qué tiempo verbal se utiliza?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The lead technician _____ the root cause of the hydraulic leak an hour ago.",
            "opts": [
              "finds",
              "found",
              "finding",
              "was find"
            ],
            "ans": 1,
            "exp": "\"An hour ago\" indicates finished past action; the irregular past of \"find\" is \"found\".",
            "socraticHint": "El verbo \"find\" es irregular. ¿Cuál es su forma en pasado simple?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The proximity sensor _____ not detect the incoming metal pallet during cycle 4.",
            "opts": [
              "did",
              "does",
              "was",
              "is"
            ],
            "ans": 0,
            "exp": "In Past Simple negative statements with regular verbs, use auxiliary \"did not\" + base verb.",
            "socraticHint": "¿Cuál es el auxiliar de negación en pasado simple para todos los sujetos?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which technical adjective describes a rotating shaft that is vibrating because it is not securely fastened?",
            "opts": [
              "Loose",
              "Tight",
              "Calibrated",
              "Polished"
            ],
            "ans": 0,
            "exp": "\"Loose\" means not firmly or securely attached or fastened.",
            "socraticHint": "¿Qué adjetivo en inglés describe una pieza o tornillo flojo que genera vibración?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"We cannot compromise plant safety.\" ¿Qué significa \"compromise\"?",
            "opts": [
              "Comprometerse a asistir a una reunión",
              "Poner en peligro / Comprometer negativamente la integridad",
              "Firmar un contrato laboral",
              "Comprar refacciones nuevas"
            ],
            "ans": 1,
            "exp": "\"To compromise\" a menudo significa poner en riesgo o vulnerar (\"compromise safety\"). Comprometerse a una cita es \"commit\".",
            "socraticHint": "Revisa la alerta de falsos amigos: en seguridad industrial, ¿qué implica \"to compromise safety\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Hydraulic\"?",
            "opts": [
              "HY-drau-lic",
              "hy-DRAU-lic (accent on DRAU)",
              "hy-drau-LIC",
              "Equal stress across all three vowels"
            ],
            "ans": 1,
            "exp": "In American English, \"hydraulic\" has primary stress on the second syllable: /haɪˈdrɔːlɪk/.",
            "socraticHint": "¿La sílaba tónica de \"hydraulic\" está en el prefijo o en la sílaba central \"DRAU\"?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Why _____ the safety curtain trigger an automatic shutdown during shift 2?",
            "opts": [
              "did",
              "was",
              "were",
              "does"
            ],
            "ans": 0,
            "exp": "Past Simple questions with a base verb (\"trigger\") use auxiliary \"did\".",
            "socraticHint": "Al formular una pregunta en pasado simple con un verbo de acción (\"trigger\"), ¿qué auxiliar se antepone al sujeto?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What official document must an operator fill out to request mechanical repair on a defective motor?",
            "opts": [
              "A Maintenance Work Order (MWO)",
              "A university transcript request",
              "A personal loan application",
              "A shipping invoice"
            ],
            "ans": 0,
            "exp": "A Maintenance Work Order (MWO / orden de trabajo) formally requests engineering corrective service.",
            "socraticHint": "¿Cómo se le llama al formato formal para solicitar una reparación mecánica en planta?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "Yesterday morning, the conveyor motor _____ unexpectedly due to thermal overload.",
            "opts": [
              "stops",
              "stopped",
              "stopping",
              "is stop"
            ],
            "ans": 1,
            "exp": "The time marker \"Yesterday morning\" requires Past Simple: \"stopped\".",
            "socraticHint": "El marcador temporal \"Yesterday morning\" sitúa la acción en el pasado cerrado. ¿Qué tiempo verbal se utiliza?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The lead technician _____ the root cause of the hydraulic leak an hour ago.",
            "opts": [
              "finds",
              "found",
              "finding",
              "was find"
            ],
            "ans": 1,
            "exp": "\"An hour ago\" indicates finished past action; the irregular past of \"find\" is \"found\".",
            "socraticHint": "El verbo \"find\" es irregular. ¿Cuál es su forma en pasado simple?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The proximity sensor _____ not detect the incoming metal pallet during cycle 4.",
            "opts": [
              "did",
              "does",
              "was",
              "is"
            ],
            "ans": 0,
            "exp": "In Past Simple negative statements with regular verbs, use auxiliary \"did not\" + base verb.",
            "socraticHint": "¿Cuál es el auxiliar de negación en pasado simple para todos los sujetos?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which technical adjective describes a rotating shaft that is vibrating because it is not securely fastened?",
            "opts": [
              "Loose",
              "Tight",
              "Calibrated",
              "Polished"
            ],
            "ans": 0,
            "exp": "\"Loose\" means not firmly or securely attached or fastened.",
            "socraticHint": "¿Qué adjetivo en inglés describe una pieza o tornillo flojo que genera vibración?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"We cannot compromise plant safety.\" ¿Qué significa \"compromise\"?",
            "opts": [
              "Comprometerse a asistir a una reunión",
              "Poner en peligro / Comprometer negativamente la integridad",
              "Firmar un contrato laboral",
              "Comprar refacciones nuevas"
            ],
            "ans": 1,
            "exp": "\"To compromise\" a menudo significa poner en riesgo o vulnerar (\"compromise safety\"). Comprometerse a una cita es \"commit\".",
            "socraticHint": "Revisa la alerta de falsos amigos: en seguridad industrial, ¿qué implica \"to compromise safety\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Hydraulic\"?",
            "opts": [
              "HY-drau-lic",
              "hy-DRAU-lic (accent on DRAU)",
              "hy-drau-LIC",
              "Equal stress across all three vowels"
            ],
            "ans": 1,
            "exp": "In American English, \"hydraulic\" has primary stress on the second syllable: /haɪˈdrɔːlɪk/.",
            "socraticHint": "¿La sílaba tónica de \"hydraulic\" está en el prefijo o en la sílaba central \"DRAU\"?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Why _____ the safety curtain trigger an automatic shutdown during shift 2?",
            "opts": [
              "did",
              "was",
              "were",
              "does"
            ],
            "ans": 0,
            "exp": "Past Simple questions with a base verb (\"trigger\") use auxiliary \"did\".",
            "socraticHint": "Al formular una pregunta en pasado simple con un verbo de acción (\"trigger\"), ¿qué auxiliar se antepone al sujeto?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What official document must an operator fill out to request mechanical repair on a defective motor?",
            "opts": [
              "A Maintenance Work Order (MWO)",
              "A university transcript request",
              "A personal loan application",
              "A shipping invoice"
            ],
            "ans": 0,
            "exp": "A Maintenance Work Order (MWO / orden de trabajo) formally requests engineering corrective service.",
            "socraticHint": "¿Cómo se le llama al formato formal para solicitar una reparación mecánica en planta?",
            "category": "Léxico Técnico"
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
          "question": "What is the minimum safety stock threshold for pneumatic solenoid valves in Warehouse Bay 4?",
          "options": [
            "1 valve",
            "15 units minimum on shelf",
            "500 units",
            "Zero, ordered on demand"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "What is the minimum safety stock threshold for pneumatic solenoid valves in Warehouse Bay 4?",
              "options": [
                "1 valve",
                "15 units minimum on shelf",
                "500 units",
                "Zero, ordered on demand"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The inventory specification mandates maintaining a minimum buffer stock of 15 solenoid valves to prevent line stoppage."
            },
            {
              "q": "What automated system tracks reorder points and triggers supplier purchase orders when inventory dips below minimum?",
              "options": [
                "A handwritten paper notebook",
                "The automated ERP / MES inventory management database",
                "A weekly telephone call from security",
                "Physical counting every morning by operators"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The ERP (Enterprise Resource Planning) system auto-generates replenishment purchase requisitions."
            },
            {
              "q": "Where are hazardous flammable solvents stored in the logistics annex?",
              "options": [
                "Directly on wooden pallets under sunlight",
                "Inside double-walled FM-approved fireproof safety cabinets with grounding cables",
                "In cardboard boxes next to the lunchroom",
                "On the roof of the warehouse"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "NFPA and OSHA standards require flammable solvents in certified FM fireproof cabinets with ground wire dissipation."
            }
          ],
          "answer": 1
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
            "q": "We have _____ pneumatic fittings left in Bin 12; we need to reorder immediately.",
            "opts": [
              "very few",
              "much",
              "too many",
              "a lot of"
            ],
            "ans": 0,
            "exp": "Use \"few\" or \"very few\" with plural countable nouns (\"pneumatic fittings\") to denote scarcity.",
            "socraticHint": "El sustantivo \"fittings\" es contable en plural y hay escasez. ¿Qué cuantificador expresa pocos elementos contables?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "How _____ hydraulic oil does the CNC cooling reservoir require during flush cycles?",
            "opts": [
              "much",
              "many",
              "few",
              "several"
            ],
            "ans": 0,
            "exp": "Use \"How much\" with non-countable mass nouns like liquids (\"oil\").",
            "socraticHint": "¿El aceite (oil) es un sustantivo contable individual o incontable de masa líquida?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Robotic Cell B is _____ than Cell A because it uses dual-axis servo drives.",
            "opts": [
              "faster",
              "more fast",
              "fastest",
              "fast"
            ],
            "ans": 0,
            "exp": "Form the comparative of one-syllable adjectives by adding -er: \"faster than\".",
            "socraticHint": "¿Cómo se forma el comparativo regular de un adjetivo corto de una sola sílaba como \"fast\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "This is the _____ reliable optical sensor on our packaging line; it never fails calibration.",
            "opts": [
              "more",
              "most",
              "better",
              "much"
            ],
            "ans": 1,
            "exp": "Form the superlative of multi-syllable adjectives with \"the most\": \"the most reliable\".",
            "socraticHint": "Para un adjetivo largo de cuatro sílabas (\"re-li-a-ble\"), ¿cómo se construye el grado superlativo absoluto?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"Copper is an excellent electrical conductor.\" ¿Qué es un \"conductor\"?",
            "opts": [
              "El chofer de un camión de carga",
              "Un material conductor de electricidad o calor",
              "El director de orquesta sinfónica",
              "Un cobrador de boletos"
            ],
            "ans": 1,
            "exp": "En ingeniería, \"conductor\" es un material físico que transmite corriente o calor. Un chofer vehicular es \"driver\".",
            "socraticHint": "Revisa el falso amigo: en física e ingeniería eléctrica, ¿qué significa \"electrical conductor\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Inventory\"?",
            "opts": [
              "IN-ven-to-ry (accent on IN)",
              "in-VEN-to-ry",
              "in-ven-TO-ry",
              "in-ven-to-RY"
            ],
            "ans": 0,
            "exp": "In American English, \"inventory\" is stressed firmly on the first syllable: /ˈɪnvəntɔːri/.",
            "socraticHint": "¿El sustantivo \"inventory\" en inglés estadounidense lleva el acento en la primera sílaba \"IN\" o en la segunda?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "What document lists every component, raw material, and sub-assembly required to build a finished product?",
            "opts": [
              "Bill of Materials (BOM)",
              "Doctor prescription pad",
              "Receipt of petty cash",
              "Parking citation"
            ],
            "ans": 0,
            "exp": "A Bill of Materials (BOM / lista de materiales) itemizes every component and quantity for production.",
            "socraticHint": "¿Cuál es la sigla estándar internacional para la lista estructurada de materiales de un producto de ingeniería?",
            "category": "Léxico Técnico"
          },
          {
            "q": "There are _____ defective resistors in this batch than in yesterday’s shipment.",
            "opts": [
              "fewer",
              "less",
              "little",
              "much"
            ],
            "ans": 0,
            "exp": "Use \"fewer\" with plural countable nouns (\"resistors\") when comparing quantities.",
            "socraticHint": "Para sustantivos contables en plural (\"resistors\"), ¿se utiliza \"fewer\" o \"less\"?",
            "category": "Gramática y Sintaxis"
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
        ],
        "unitQuiz": [
          {
            "q": "We have _____ pneumatic fittings left in Bin 12; we need to reorder immediately.",
            "opts": [
              "very few",
              "much",
              "too many",
              "a lot of"
            ],
            "ans": 0,
            "exp": "Use \"few\" or \"very few\" with plural countable nouns (\"pneumatic fittings\") to denote scarcity.",
            "socraticHint": "El sustantivo \"fittings\" es contable en plural y hay escasez. ¿Qué cuantificador expresa pocos elementos contables?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "How _____ hydraulic oil does the CNC cooling reservoir require during flush cycles?",
            "opts": [
              "much",
              "many",
              "few",
              "several"
            ],
            "ans": 0,
            "exp": "Use \"How much\" with non-countable mass nouns like liquids (\"oil\").",
            "socraticHint": "¿El aceite (oil) es un sustantivo contable individual o incontable de masa líquida?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Robotic Cell B is _____ than Cell A because it uses dual-axis servo drives.",
            "opts": [
              "faster",
              "more fast",
              "fastest",
              "fast"
            ],
            "ans": 0,
            "exp": "Form the comparative of one-syllable adjectives by adding -er: \"faster than\".",
            "socraticHint": "¿Cómo se forma el comparativo regular de un adjetivo corto de una sola sílaba como \"fast\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "This is the _____ reliable optical sensor on our packaging line; it never fails calibration.",
            "opts": [
              "more",
              "most",
              "better",
              "much"
            ],
            "ans": 1,
            "exp": "Form the superlative of multi-syllable adjectives with \"the most\": \"the most reliable\".",
            "socraticHint": "Para un adjetivo largo de cuatro sílabas (\"re-li-a-ble\"), ¿cómo se construye el grado superlativo absoluto?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Cuidado con el falso amigo: \"Copper is an excellent electrical conductor.\" ¿Qué es un \"conductor\"?",
            "opts": [
              "El chofer de un camión de carga",
              "Un material conductor de electricidad o calor",
              "El director de orquesta sinfónica",
              "Un cobrador de boletos"
            ],
            "ans": 1,
            "exp": "En ingeniería, \"conductor\" es un material físico que transmite corriente o calor. Un chofer vehicular es \"driver\".",
            "socraticHint": "Revisa el falso amigo: en física e ingeniería eléctrica, ¿qué significa \"electrical conductor\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Inventory\"?",
            "opts": [
              "IN-ven-to-ry (accent on IN)",
              "in-VEN-to-ry",
              "in-ven-TO-ry",
              "in-ven-to-RY"
            ],
            "ans": 0,
            "exp": "In American English, \"inventory\" is stressed firmly on the first syllable: /ˈɪnvəntɔːri/.",
            "socraticHint": "¿El sustantivo \"inventory\" en inglés estadounidense lleva el acento en la primera sílaba \"IN\" o en la segunda?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "What document lists every component, raw material, and sub-assembly required to build a finished product?",
            "opts": [
              "Bill of Materials (BOM)",
              "Doctor prescription pad",
              "Receipt of petty cash",
              "Parking citation"
            ],
            "ans": 0,
            "exp": "A Bill of Materials (BOM / lista de materiales) itemizes every component and quantity for production.",
            "socraticHint": "¿Cuál es la sigla estándar internacional para la lista estructurada de materiales de un producto de ingeniería?",
            "category": "Léxico Técnico"
          },
          {
            "q": "There are _____ defective resistors in this batch than in yesterday’s shipment.",
            "opts": [
              "fewer",
              "less",
              "little",
              "much"
            ],
            "ans": 0,
            "exp": "Use \"fewer\" with plural countable nouns (\"resistors\") when comparing quantities.",
            "socraticHint": "Para sustantivos contables en plural (\"resistors\"), ¿se utiliza \"fewer\" o \"less\"?",
            "category": "Gramática y Sintaxis"
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
          "question": "What is the primary objective of a technical shift handover email sent to the incoming supervisor?",
          "options": [
            "To complain about cafeteria food quality",
            "To communicate machine operating status, scrap rate, and unresolved alarms",
            "To send vacation photos to coworkers",
            "To ask for a salary raise"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "What is the primary objective of a technical shift handover email sent to the incoming supervisor?",
              "options": [
                "To complain about cafeteria food quality",
                "To communicate machine operating status, scrap rate, and unresolved alarms",
                "To send vacation photos to coworkers",
                "To ask for a salary raise"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The handover memo standardizes reporting throughput, downtime duration, scrap parts count, and pending open issues."
            },
            {
              "q": "What standard email subject line format is mandatory at Northern Tech for quick indexing?",
              "options": [
                "\"Hello\"",
                "\"[LINE-STATUS] - Line 3 - Shift 1 Handover - [DATE]\"",
                "\"Urgent read now please\"",
                "\"FYI from Dave\""
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Industrial email etiquette requires a standardized tag: [TAG] - [LINE] - [SUBJECT] - [DATE] for traceability."
            },
            {
              "q": "If an uncontained hydraulic leak remains active at shift change, who must be tagged on the email?",
              "options": [
                "The plant night florist",
                "The Incoming Shift Supervisor and the On-Duty Maintenance Specialist",
                "Only the human resources intern",
                "No one, leave it as a surprise"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Standard escalation protocols require copying both the incoming supervisor and the maintenance technician on unresolved anomalies."
            }
          ],
          "answer": 1
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
            "q": "We _____ already calibrated all five laser sensors on Station 4.",
            "opts": [
              "have",
              "has",
              "having",
              "did"
            ],
            "ans": 0,
            "exp": "Use \"have\" + past participle with pronoun \"We\" to form the Present Perfect: \"We have already calibrated\".",
            "socraticHint": "¿Cuál es el auxiliar del presente perfecto para la primera persona del plural (We)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Shift 2 _____ not finished the visual inspection of the circuit boards yet.",
            "opts": [
              "has",
              "have",
              "is",
              "did"
            ],
            "ans": 0,
            "exp": "\"Shift 2\" is singular collective entity (it), requiring auxiliary \"has not finished\".",
            "socraticHint": "El sujeto \"Shift 2\" funciona como tercera persona singular (it). ¿Qué auxiliar del presente perfecto le corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Have you _____ the digital incident report in the MES terminal?",
            "opts": [
              "submitted",
              "submit",
              "submitting",
              "submits"
            ],
            "ans": 0,
            "exp": "In Present Perfect questions (\"Have you...\"), use the past participle of the main verb: \"submitted\".",
            "socraticHint": "Después del auxiliar \"Have you\", ¿qué forma adopta el verbo principal en el presente perfecto?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which standard email salutation is most appropriate for a formal technical dispatch to a client quality manager?",
            "opts": [
              "Hey buddy, check this out:",
              "Dear Mr. Henderson, / Dear Quality Team,",
              "Yo Henderson,",
              "What is up my friend:"
            ],
            "ans": 1,
            "exp": "\"Dear Mr. [Last Name]\" or \"Dear [Team]\" is the standard professional salutation in formal American technical correspondence.",
            "socraticHint": "En correspondencia técnica formal dirigida a un cliente o gerente, ¿cuál es el saludo más profesional y cortés?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "Cuidado con el falso amigo: \"Fabrication of the aluminum chassis is on schedule.\" ¿Qué significa \"fabrication\"?",
            "opts": [
              "Una mentira o invención falsa",
              "Fabricación y manufactura física de piezas mecánicas",
              "Diseño conceptual en papel",
              "Venta en mostrador"
            ],
            "ans": 1,
            "exp": "En ingeniería y manufactura, \"fabrication\" es la fabricación, soldadura o corte físico de componentes. No significa engaño.",
            "socraticHint": "Revisa el falso amigo: en metalmecánica y ensamble, ¿a qué alude \"metal fabrication\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Certificate\"? (Noun form)",
            "opts": [
              "CER-tif-i-cate",
              "cer-TIF-i-cate (accent on TIF)",
              "cer-tif-i-CATE",
              "cer-tif-I-cate"
            ],
            "ans": 1,
            "exp": "As a noun, \"certificate\" has its primary stress on the second syllable: /sərˈtɪfɪkət/.",
            "socraticHint": "¿El sustantivo \"certificate\" lleva el acento principal en la primera o en la segunda sílaba \"TIF\"?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Choose the correct sign-off for a technical status email:",
            "opts": [
              "Warm regards, / Sincerely,",
              "Kisses and hugs,",
              "Later on,",
              "See ya tomorrow dude,"
            ],
            "ans": 0,
            "exp": "\"Sincerely\" and \"Best regards / Warm regards\" are accepted professional sign-offs in American corporate engineering.",
            "socraticHint": "¿Cuál es la despedida escrita formal y profesional estándar en correos electrónicos de ingeniería?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "The quality inspector _____ just verified the dimensional tolerances on the CNC milled bracket.",
            "opts": [
              "has",
              "have",
              "is",
              "was"
            ],
            "ans": 0,
            "exp": "\"The quality inspector\" is third-person singular (he/she), which pairs with \"has just verified\".",
            "socraticHint": "Identifica el sujeto: \"The quality inspector\" es singular. ¿Qué auxiliar de presente perfecto requiere?",
            "category": "Gramática y Sintaxis"
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
        ],
        "unitQuiz": [
          {
            "q": "We _____ already calibrated all five laser sensors on Station 4.",
            "opts": [
              "have",
              "has",
              "having",
              "did"
            ],
            "ans": 0,
            "exp": "Use \"have\" + past participle with pronoun \"We\" to form the Present Perfect: \"We have already calibrated\".",
            "socraticHint": "¿Cuál es el auxiliar del presente perfecto para la primera persona del plural (We)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Shift 2 _____ not finished the visual inspection of the circuit boards yet.",
            "opts": [
              "has",
              "have",
              "is",
              "did"
            ],
            "ans": 0,
            "exp": "\"Shift 2\" is singular collective entity (it), requiring auxiliary \"has not finished\".",
            "socraticHint": "El sujeto \"Shift 2\" funciona como tercera persona singular (it). ¿Qué auxiliar del presente perfecto le corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Have you _____ the digital incident report in the MES terminal?",
            "opts": [
              "submitted",
              "submit",
              "submitting",
              "submits"
            ],
            "ans": 0,
            "exp": "In Present Perfect questions (\"Have you...\"), use the past participle of the main verb: \"submitted\".",
            "socraticHint": "Después del auxiliar \"Have you\", ¿qué forma adopta el verbo principal en el presente perfecto?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Which standard email salutation is most appropriate for a formal technical dispatch to a client quality manager?",
            "opts": [
              "Hey buddy, check this out:",
              "Dear Mr. Henderson, / Dear Quality Team,",
              "Yo Henderson,",
              "What is up my friend:"
            ],
            "ans": 1,
            "exp": "\"Dear Mr. [Last Name]\" or \"Dear [Team]\" is the standard professional salutation in formal American technical correspondence.",
            "socraticHint": "En correspondencia técnica formal dirigida a un cliente o gerente, ¿cuál es el saludo más profesional y cortés?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "Cuidado con el falso amigo: \"Fabrication of the aluminum chassis is on schedule.\" ¿Qué significa \"fabrication\"?",
            "opts": [
              "Una mentira o invención falsa",
              "Fabricación y manufactura física de piezas mecánicas",
              "Diseño conceptual en papel",
              "Venta en mostrador"
            ],
            "ans": 1,
            "exp": "En ingeniería y manufactura, \"fabrication\" es la fabricación, soldadura o corte físico de componentes. No significa engaño.",
            "socraticHint": "Revisa el falso amigo: en metalmecánica y ensamble, ¿a qué alude \"metal fabrication\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Certificate\"? (Noun form)",
            "opts": [
              "CER-tif-i-cate",
              "cer-TIF-i-cate (accent on TIF)",
              "cer-tif-i-CATE",
              "cer-tif-I-cate"
            ],
            "ans": 1,
            "exp": "As a noun, \"certificate\" has its primary stress on the second syllable: /sərˈtɪfɪkət/.",
            "socraticHint": "¿El sustantivo \"certificate\" lleva el acento principal en la primera o en la segunda sílaba \"TIF\"?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Choose the correct sign-off for a technical status email:",
            "opts": [
              "Warm regards, / Sincerely,",
              "Kisses and hugs,",
              "Later on,",
              "See ya tomorrow dude,"
            ],
            "ans": 0,
            "exp": "\"Sincerely\" and \"Best regards / Warm regards\" are accepted professional sign-offs in American corporate engineering.",
            "socraticHint": "¿Cuál es la despedida escrita formal y profesional estándar en correos electrónicos de ingeniería?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "The quality inspector _____ just verified the dimensional tolerances on the CNC milled bracket.",
            "opts": [
              "has",
              "have",
              "is",
              "was"
            ],
            "ans": 0,
            "exp": "\"The quality inspector\" is third-person singular (he/she), which pairs with \"has just verified\".",
            "socraticHint": "Identifica el sujeto: \"The quality inspector\" es singular. ¿Qué auxiliar de presente perfecto requiere?",
            "category": "Gramática y Sintaxis"
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
          "question": "Under ISO 9001:2015 documentation standards, what defines an authorized Standard Operating Procedure (SOP)?",
          "options": [
            "An informal sticky note placed on a monitor",
            "A controlled, versioned document outlining step-by-step instructions to ensure reproducible quality",
            "A verbal agreement between operators during lunch",
            "A supplier brochure"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "Under ISO 9001:2015 documentation standards, what defines an authorized Standard Operating Procedure (SOP)?",
              "options": [
                "An informal sticky note placed on a monitor",
                "A controlled, versioned document outlining step-by-step instructions to ensure reproducible quality",
                "A verbal agreement between operators during lunch",
                "A supplier brochure"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "ISO 9001 mandates controlled, audited, and reproducible work instructions with revision control."
            },
            {
              "q": "What torque specification must be applied to the M12 flange bolts according to Work Instruction WI-402?",
              "options": [
                "10 Nm hand tight",
                "55 Nm ± 2 Nm applied in an alternating star pattern",
                "150 Nm with an impact wrench",
                "Zero torque, finger tight only"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The instruction specifies 55 Nm ± 2 Nm in a cross-star tightening sequence to prevent gasket distortion."
            },
            {
              "q": "What mandatory action must occur if a revision change (Rev B to Rev C) is released for an active SOP?",
              "options": [
                "Old printed sheets must be recycled and operators must complete documented retraining before running production",
                "Operators ignore the change until next year",
                "Production continues with Rev B indefinitely",
                "The line lead shreds the document silently"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "Under QMS protocols, obsolete revisions are quarantined/destroyed and personnel must be retrained with sign-off records."
            }
          ],
          "answer": 1
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
            "q": "The high-pressure hydraulic valve _____ to 55 Nm using a calibrated torque wrench.",
            "opts": [
              "is torqued",
              "torques",
              "is torquing",
              "torqued itself"
            ],
            "ans": 0,
            "exp": "Use the Passive Voice (is + past participle) when the object being operated on is the focus of the technical instruction.",
            "socraticHint": "En una instrucción técnica objetiva donde la pieza recibe la acción mecánica, ¿cómo se formula la voz pasiva presente?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "All optical sensors _____ every morning before initiating automated cell cycles.",
            "opts": [
              "must be inspected",
              "must to inspect",
              "must inspecting",
              "must inspected"
            ],
            "ans": 0,
            "exp": "Modal passive structure is: Modal + be + Past Participle (\"must be inspected\").",
            "socraticHint": "¿Cómo se estructura la voz pasiva con un verbo modal de obligación (must + be + participio)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Operators _____ bypass safety interlocks under any operating circumstances.",
            "opts": [
              "should never",
              "ought to",
              "are allowed to",
              "can optionally"
            ],
            "ans": 0,
            "exp": "Use \"should never\" to indicate strict, non-negotiable safety prohibitions.",
            "socraticHint": "¿Cuál combinación modal expresa una prohibición absoluta en normativas de seguridad de planta?",
            "category": "Seguridad y Protocolo"
          },
          {
            "q": "Which document control element ensures that operators are not running obsolete procedures?",
            "opts": [
              "Revision Number and Effective Release Date",
              "The color of the binder cover",
              "The operator personal signature on the wall",
              "A barcode sticker on the lunch table"
            ],
            "ans": 0,
            "exp": "Controlled engineering documents must feature Document ID, Revision Level (Rev), and Effective Date.",
            "socraticHint": "Bajo la norma ISO 9001, ¿qué dos datos encabezan una instrucción técnica para garantizar su vigencia?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The wafer yield reached 98.4% this quarter.\" ¿Qué significa \"yield\"?",
            "opts": [
              "Ceder el paso en el tráfico automotriz",
              "Rendimiento / Porcentaje de piezas conformes sin defecto",
              "Hielo acumulado en el condensador",
              "Grito de auxilio de un operador"
            ],
            "ans": 1,
            "exp": "En manufactura avanzada y semiconductores, \"yield\" es el rendimiento productivo (% de piezas buenas producidas).",
            "socraticHint": "Revisa el falso amigo: en la industria de semiconductores y manufactura, ¿qué mide la métrica de \"yield\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Specification\"?",
            "opts": [
              "spec-i-fi-CA-tion (accent on CA)",
              "SPEC-i-fi-ca-tion",
              "spec-I-fi-ca-tion",
              "spec-i-FI-ca-tion"
            ],
            "ans": 0,
            "exp": "Words ending in the suffix \"-tion\" regularly receive primary stress on the penultimate syllable: /ˌspɛsɪfɪˈkeɪʃən/.",
            "socraticHint": "Aplica la regla de acentuación prosódica para palabras con terminación \"-tion\". ¿Dónde cae el acento?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The printed circuit boards _____ with isopropyl alcohol before applying the conformal coating.",
            "opts": [
              "are cleaned",
              "cleaning",
              "clean",
              "are clean"
            ],
            "ans": 0,
            "exp": "Passive Voice plural: are + past participle (\"are cleaned\").",
            "socraticHint": "El sujeto \"circuit boards\" es plural y recibe la acción de limpieza. ¿Qué forma pasiva le corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the technical definition of \"Torque\"?",
            "opts": [
              "Rotational mechanical force applied to a fastener",
              "The electrical resistance of a wire",
              "The temperature inside an autoclave",
              "The weight of a cardboard box"
            ],
            "ans": 0,
            "exp": "Torque is the rotational force applied around an axis, measured in Newton-meters (Nm) or Foot-pounds (ft-lb).",
            "socraticHint": "En mecánica y ensamble automotriz, ¿qué magnitud física representa el torque aplicado a un perno?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "The high-pressure hydraulic valve _____ to 55 Nm using a calibrated torque wrench.",
            "opts": [
              "is torqued",
              "torques",
              "is torquing",
              "torqued itself"
            ],
            "ans": 0,
            "exp": "Use the Passive Voice (is + past participle) when the object being operated on is the focus of the technical instruction.",
            "socraticHint": "En una instrucción técnica objetiva donde la pieza recibe la acción mecánica, ¿cómo se formula la voz pasiva presente?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "All optical sensors _____ every morning before initiating automated cell cycles.",
            "opts": [
              "must be inspected",
              "must to inspect",
              "must inspecting",
              "must inspected"
            ],
            "ans": 0,
            "exp": "Modal passive structure is: Modal + be + Past Participle (\"must be inspected\").",
            "socraticHint": "¿Cómo se estructura la voz pasiva con un verbo modal de obligación (must + be + participio)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Operators _____ bypass safety interlocks under any operating circumstances.",
            "opts": [
              "should never",
              "ought to",
              "are allowed to",
              "can optionally"
            ],
            "ans": 0,
            "exp": "Use \"should never\" to indicate strict, non-negotiable safety prohibitions.",
            "socraticHint": "¿Cuál combinación modal expresa una prohibición absoluta en normativas de seguridad de planta?",
            "category": "Seguridad y Protocolo"
          },
          {
            "q": "Which document control element ensures that operators are not running obsolete procedures?",
            "opts": [
              "Revision Number and Effective Release Date",
              "The color of the binder cover",
              "The operator personal signature on the wall",
              "A barcode sticker on the lunch table"
            ],
            "ans": 0,
            "exp": "Controlled engineering documents must feature Document ID, Revision Level (Rev), and Effective Date.",
            "socraticHint": "Bajo la norma ISO 9001, ¿qué dos datos encabezan una instrucción técnica para garantizar su vigencia?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The wafer yield reached 98.4% this quarter.\" ¿Qué significa \"yield\"?",
            "opts": [
              "Ceder el paso en el tráfico automotriz",
              "Rendimiento / Porcentaje de piezas conformes sin defecto",
              "Hielo acumulado en el condensador",
              "Grito de auxilio de un operador"
            ],
            "ans": 1,
            "exp": "En manufactura avanzada y semiconductores, \"yield\" es el rendimiento productivo (% de piezas buenas producidas).",
            "socraticHint": "Revisa el falso amigo: en la industria de semiconductores y manufactura, ¿qué mide la métrica de \"yield\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Specification\"?",
            "opts": [
              "spec-i-fi-CA-tion (accent on CA)",
              "SPEC-i-fi-ca-tion",
              "spec-I-fi-ca-tion",
              "spec-i-FI-ca-tion"
            ],
            "ans": 0,
            "exp": "Words ending in the suffix \"-tion\" regularly receive primary stress on the penultimate syllable: /ˌspɛsɪfɪˈkeɪʃən/.",
            "socraticHint": "Aplica la regla de acentuación prosódica para palabras con terminación \"-tion\". ¿Dónde cae el acento?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The printed circuit boards _____ with isopropyl alcohol before applying the conformal coating.",
            "opts": [
              "are cleaned",
              "cleaning",
              "clean",
              "are clean"
            ],
            "ans": 0,
            "exp": "Passive Voice plural: are + past participle (\"are cleaned\").",
            "socraticHint": "El sujeto \"circuit boards\" es plural y recibe la acción de limpieza. ¿Qué forma pasiva le corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the technical definition of \"Torque\"?",
            "opts": [
              "Rotational mechanical force applied to a fastener",
              "The electrical resistance of a wire",
              "The temperature inside an autoclave",
              "The weight of a cardboard box"
            ],
            "ans": 0,
            "exp": "Torque is the rotational force applied around an axis, measured in Newton-meters (Nm) or Foot-pounds (ft-lb).",
            "socraticHint": "En mecánica y ensamble automotriz, ¿qué magnitud física representa el torque aplicado a un perno?",
            "category": "Léxico Técnico"
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
          "question": "In the automotive 8D problem-solving discipline, what is the crucial purpose of Step D3 (Containment Action)?",
          "options": [
            "To blame the supplier publicly",
            "To isolate defective inventory immediately and prevent non-conforming parts from reaching the customer",
            "To dismantle the entire factory permanently",
            "To wait for customer complaints to increase"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "In the automotive 8D problem-solving discipline, what is the crucial purpose of Step D3 (Containment Action)?",
              "options": [
                "To blame the supplier publicly",
                "To isolate defective inventory immediately and prevent non-conforming parts from reaching the customer",
                "To dismantle the entire factory permanently",
                "To wait for customer complaints to increase"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "D3 establishes immediate containment to quarantine suspected lots and protect the customer while root cause investigation proceeds."
            },
            {
              "q": "What analytical methodology was used in Step D4 to drill down into the electrical intermittent failure?",
              "options": [
                "Guessing randomly",
                "The 5-Whys root cause analysis combined with an Ishikawa Fishbone diagram",
                "Flipping a coin three times",
                "Asking the delivery driver for advice"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Step D4 utilizes structured RCA tools: Ishikawa cause-and-effect diagrams and the 5-Whys interrogation technique."
            },
            {
              "q": "What permanent corrective action (D5/D6) was implemented to prevent recurrence of solder bridging?",
              "options": [
                "Re-programming the wave soldering thermal profile and modifying stencil aperture geometry by 12%",
                "Lowering operator wages",
                "Buying cheaper solder alloy",
                "Increasing line conveyor speed by 50%"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "The engineering action plan corrected stencil aperture dimensions and optimized thermal ramp-up rates."
            }
          ],
          "answer": 1
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
            "q": "The assembly line _____ for three hours before technicians identified the sheared gear.",
            "opts": [
              "had been stopped",
              "has stopped",
              "was stop",
              "will stop"
            ],
            "ans": 0,
            "exp": "Use Past Perfect (\"had been stopped\") to describe an action occurring prior to another past event (\"identified\").",
            "socraticHint": "La detención de la línea ocurrió ANTES de que los técnicos identificaran la falla. ¿Qué tiempo verbal expresa el \"pasado del pasado\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The quality team discovered that the supplier _____ defective capacitors in the previous lot.",
            "opts": [
              "had shipped",
              "has shipped",
              "ships",
              "will ship"
            ],
            "ans": 0,
            "exp": "The shipping occurred before the discovery, requiring the Past Perfect: \"had shipped\".",
            "socraticHint": "El envío por parte del proveedor sucedió antes de que el equipo de calidad lo descubriera. ¿Cuál es el tiempo adecuado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "While the robotic arm _____ the chassis, the optical vision sensor triggered an unexpected fault.",
            "opts": [
              "was welding",
              "welded",
              "is welding",
              "has welded"
            ],
            "ans": 0,
            "exp": "Use Past Continuous (\"was welding\") to describe an ongoing background action interrupted by a past event.",
            "socraticHint": "La acción de soldar estaba en progreso cuando se activó la alarma. ¿Qué tiempo verbal describe esa acción continua en el pasado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the core objective of the \"5-Whys\" methodology in industrial quality engineering?",
            "opts": [
              "To drill past surface symptoms to determine the underlying systemic root cause",
              "To ask five different operators the same question",
              "To delay the audit for five weeks",
              "To write five separate incident reports"
            ],
            "ans": 0,
            "exp": "The 5-Whys interrogative technique peels away layers of symptoms to reach the fundamental systemic cause of failure.",
            "socraticHint": "¿Cuál es el propósito medular de preguntar sucesivamente \"¿Por qué?\" en la ingeniería de calidad?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"Submit your engineering resume before the interview.\" ¿Qué es un \"resume\"?",
            "opts": [
              "Un resumen de texto de un libro",
              "El currículum vitae profesional (CV)",
              "Reanudar una máquina pausada",
              "Una queja formal de calidad"
            ],
            "ans": 1,
            "exp": "\"Resume\" (sustantivo) significa currículum vitae en inglés estadounidense. Reanudar una actividad es el verbo \"to resume\".",
            "socraticHint": "Revisa el falso amigo: en el ámbito profesional estadounidense, ¿qué documento laboral es un \"resume\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Defect\" (as a noun)?",
            "opts": [
              "DE-fect (accent on DE)",
              "de-FECT (accent on FECT)",
              "Equal stress on both syllables",
              "The word has no stressed vowel"
            ],
            "ans": 0,
            "exp": "As a noun denoting a physical flaw, \"defect\" is stressed on the first syllable: /ˈdiːfɛkt/. (The verb \"to defect\" is stressed on the second).",
            "socraticHint": "En inglés técnico, el sustantivo \"defect\" (falla/defecto) acentúa la primera sílaba \"DE\". ¿Cómo se pronuncia?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Which 8D step validates that the permanent corrective action actually eradicated the failure mode?",
            "opts": [
              "D7 - Prevent Recurrence",
              "D6 - Implement and Validate Corrective Action",
              "D1 - Establish the Team",
              "D2 - Describe the Problem"
            ],
            "ans": 1,
            "exp": "D6 focuses on deploying and quantitatively validating that corrective actions eliminated the root cause.",
            "socraticHint": "¿En cuál de las 8 disciplinas se implementan y validan formalmente las acciones correctivas permanentes?",
            "category": "Léxico Técnico"
          },
          {
            "q": "The motor overheated because the cooling fan _____ clogged with industrial metal dust.",
            "opts": [
              "had become",
              "has become",
              "becomes",
              "is becoming"
            ],
            "ans": 0,
            "exp": "The clogging occurred prior to the overheating, necessitating the Past Perfect: \"had become\".",
            "socraticHint": "La obstrucción con polvo metálico ocurrió con anterioridad al sobrecalentamiento. ¿Qué tiempo verbal conecta ambas acciones pasadas?",
            "category": "Gramática y Sintaxis"
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
        ],
        "unitQuiz": [
          {
            "q": "The assembly line _____ for three hours before technicians identified the sheared gear.",
            "opts": [
              "had been stopped",
              "has stopped",
              "was stop",
              "will stop"
            ],
            "ans": 0,
            "exp": "Use Past Perfect (\"had been stopped\") to describe an action occurring prior to another past event (\"identified\").",
            "socraticHint": "La detención de la línea ocurrió ANTES de que los técnicos identificaran la falla. ¿Qué tiempo verbal expresa el \"pasado del pasado\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The quality team discovered that the supplier _____ defective capacitors in the previous lot.",
            "opts": [
              "had shipped",
              "has shipped",
              "ships",
              "will ship"
            ],
            "ans": 0,
            "exp": "The shipping occurred before the discovery, requiring the Past Perfect: \"had shipped\".",
            "socraticHint": "El envío por parte del proveedor sucedió antes de que el equipo de calidad lo descubriera. ¿Cuál es el tiempo adecuado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "While the robotic arm _____ the chassis, the optical vision sensor triggered an unexpected fault.",
            "opts": [
              "was welding",
              "welded",
              "is welding",
              "has welded"
            ],
            "ans": 0,
            "exp": "Use Past Continuous (\"was welding\") to describe an ongoing background action interrupted by a past event.",
            "socraticHint": "La acción de soldar estaba en progreso cuando se activó la alarma. ¿Qué tiempo verbal describe esa acción continua en el pasado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the core objective of the \"5-Whys\" methodology in industrial quality engineering?",
            "opts": [
              "To drill past surface symptoms to determine the underlying systemic root cause",
              "To ask five different operators the same question",
              "To delay the audit for five weeks",
              "To write five separate incident reports"
            ],
            "ans": 0,
            "exp": "The 5-Whys interrogative technique peels away layers of symptoms to reach the fundamental systemic cause of failure.",
            "socraticHint": "¿Cuál es el propósito medular de preguntar sucesivamente \"¿Por qué?\" en la ingeniería de calidad?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"Submit your engineering resume before the interview.\" ¿Qué es un \"resume\"?",
            "opts": [
              "Un resumen de texto de un libro",
              "El currículum vitae profesional (CV)",
              "Reanudar una máquina pausada",
              "Una queja formal de calidad"
            ],
            "ans": 1,
            "exp": "\"Resume\" (sustantivo) significa currículum vitae en inglés estadounidense. Reanudar una actividad es el verbo \"to resume\".",
            "socraticHint": "Revisa el falso amigo: en el ámbito profesional estadounidense, ¿qué documento laboral es un \"resume\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Defect\" (as a noun)?",
            "opts": [
              "DE-fect (accent on DE)",
              "de-FECT (accent on FECT)",
              "Equal stress on both syllables",
              "The word has no stressed vowel"
            ],
            "ans": 0,
            "exp": "As a noun denoting a physical flaw, \"defect\" is stressed on the first syllable: /ˈdiːfɛkt/. (The verb \"to defect\" is stressed on the second).",
            "socraticHint": "En inglés técnico, el sustantivo \"defect\" (falla/defecto) acentúa la primera sílaba \"DE\". ¿Cómo se pronuncia?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Which 8D step validates that the permanent corrective action actually eradicated the failure mode?",
            "opts": [
              "D7 - Prevent Recurrence",
              "D6 - Implement and Validate Corrective Action",
              "D1 - Establish the Team",
              "D2 - Describe the Problem"
            ],
            "ans": 1,
            "exp": "D6 focuses on deploying and quantitatively validating that corrective actions eliminated the root cause.",
            "socraticHint": "¿En cuál de las 8 disciplinas se implementan y validan formalmente las acciones correctivas permanentes?",
            "category": "Léxico Técnico"
          },
          {
            "q": "The motor overheated because the cooling fan _____ clogged with industrial metal dust.",
            "opts": [
              "had become",
              "has become",
              "becomes",
              "is becoming"
            ],
            "ans": 0,
            "exp": "The clogging occurred prior to the overheating, necessitating the Past Perfect: \"had become\".",
            "socraticHint": "La obstrucción con polvo metálico ocurrió con anterioridad al sobrecalentamiento. ¿Qué tiempo verbal conecta ambas acciones pasadas?",
            "category": "Gramática y Sintaxis"
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
          "question": "What minimum process capability index (Cpk) is required for critical automotive safety dimensions under IATF 16949?",
          "options": [
            "Cpk ≥ 0.67",
            "Cpk ≥ 1.33 (with 1.67 for high-liability safety characteristics)",
            "Cpk must be zero",
            "Cpk is only measured once every decade"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "What minimum process capability index (Cpk) is required for critical automotive safety dimensions under IATF 16949?",
              "options": [
                "Cpk ≥ 0.67",
                "Cpk ≥ 1.33 (with 1.67 for high-liability safety characteristics)",
                "Cpk must be zero",
                "Cpk is only measured once every decade"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Automotive standard IATF 16949 mandates Cpk ≥ 1.33 for standard features and ≥ 1.67 for critical safety-critical dimensions."
            },
            {
              "q": "What is indicated when five consecutive points on an X-bar control chart fall on one side of the central line?",
              "options": [
                "Completely random normal distribution",
                "A statistically significant process shift or trend requiring immediate tool wear investigation",
                "The machine is running faster",
                "The sensors are turned off"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Under Western Electric SPC rules, consecutive runs on one side of the mean signal non-random process shift or tool degradation."
            },
            {
              "q": "What dimensional measurement device is utilized for sub-micron verification of complex 3D engine block geometries?",
              "options": [
                "A wooden yardstick",
                "A Coordinate Measuring Machine (CMM) in a climate-controlled inspection bay",
                "A plastic pocket ruler",
                "Visual inspection through a window"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "CMMs (Coordinate Measuring Machines) inside thermal stabilization labs provide high-precision 3D dimensional metrology."
            }
          ],
          "answer": 1
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
            "q": "If the Cpk index _____ below 1.33, the automated line will trigger an alert for engineering review.",
            "opts": [
              "drops",
              "will drop",
              "dropped",
              "had dropped"
            ],
            "ans": 0,
            "exp": "In First Conditional real scenarios: If + Present Simple (\"drops\"), main clause uses will + base verb (\"will trigger\").",
            "socraticHint": "En oraciones condicionales de tipo 1 (reales/factibles), ¿qué tiempo verbal sigue a la cláusula \"If\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "If we calibrated the coordinate measuring machine weekly, we _____ fewer measurement variances.",
            "opts": [
              "would observe",
              "will observe",
              "observe",
              "observed"
            ],
            "ans": 0,
            "exp": "Second Conditional (hypothetical): If + Past Simple (\"calibrated\"), main clause uses would + base verb (\"would observe\").",
            "socraticHint": "La cláusula condicional usa pasado simple (\"calibrated\"). ¿Qué modal hipotético corresponde en la cláusula principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The outer diameter of the crankshaft must remain within the specified tolerance of 45.00 mm _____ 0.02 mm.",
            "opts": [
              "plus or minus (±)",
              "multiplied by",
              "divided into",
              "underneath"
            ],
            "ans": 0,
            "exp": "Engineering tolerances are designated with \"plus or minus\" (±) to indicate upper and lower allowable limits.",
            "socraticHint": "¿Cómo se lee y escribe formalmente el símbolo \"±\" en especificaciones de tolerancias dimensionales en inglés?",
            "category": "Léxico Técnico"
          },
          {
            "q": "What statistical measure indicates whether a manufacturing process is capable of producing parts within specification limits?",
            "opts": [
              "Process Capability Index (Cpk / Ppk)",
              "Total factory floor square footage",
              "Number of cafeteria chairs",
              "Monthly electricity bill"
            ],
            "ans": 0,
            "exp": "Cpk evaluates both the spread and centering of a process relative to its upper and lower specification limits (USL/LSL).",
            "socraticHint": "¿Qué índice estadístico relaciona la dispersión de seis sigmas del proceso con los límites de especificación del cliente?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"She realized the micrometer was out of calibration.\" ¿Qué significa \"realized\"?",
            "opts": [
              "Realizó físicamente la calibración",
              "Se dio cuenta / Comprendió la situación",
              "Fabricó un micrómetro nuevo",
              "Vendió el instrumento"
            ],
            "ans": 1,
            "exp": "\"To realize\" significa percatarse, darse cuenta o comprender. Llevar a cabo una tarea física es \"to perform\" o \"to carry out\".",
            "socraticHint": "Revisa el falso amigo: en inglés, ¿\"to realize\" significa ejecutar una acción o percatarse de un hecho?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Statistical\"?",
            "opts": [
              "sta-TIS-ti-cal (accent on TIS)",
              "STA-tis-ti-cal",
              "sta-tis-TI-cal",
              "sta-tis-ti-CAL"
            ],
            "ans": 0,
            "exp": "In American English, \"statistical\" has its primary stress on the second syllable: /stəˈtɪstɪkəl/.",
            "socraticHint": "¿El adjetivo \"statistical\" lleva la sílaba tónica en \"TIS\" o en el prefijo?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "If the ambient temperature in the metrology lab rises above 20°C, the thermal expansion _____ the reading.",
            "opts": [
              "will distort",
              "distorted",
              "would have distort",
              "is distorting"
            ],
            "ans": 0,
            "exp": "First Conditional: If + Present Simple (\"rises\"), result clause = will + base verb (\"will distort\").",
            "socraticHint": "Se describe una causa-efecto física predecible. ¿Qué estructura condicional expresa este resultado futuro seguro?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What does \"USL\" represent on an industrial Statistical Process Control (SPC) chart?",
            "opts": [
              "Upper Specification Limit",
              "Universal Solder Line",
              "Unified System Lock",
              "Underground Safety Link"
            ],
            "ans": 0,
            "exp": "USL stands for Upper Specification Limit (Límite Superior de Especificación), set by customer engineering prints.",
            "socraticHint": "¿Cuál es el significado formal de la sigla \"USL\" en las cartas de control estadístico de calidad?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "If the Cpk index _____ below 1.33, the automated line will trigger an alert for engineering review.",
            "opts": [
              "drops",
              "will drop",
              "dropped",
              "had dropped"
            ],
            "ans": 0,
            "exp": "In First Conditional real scenarios: If + Present Simple (\"drops\"), main clause uses will + base verb (\"will trigger\").",
            "socraticHint": "En oraciones condicionales de tipo 1 (reales/factibles), ¿qué tiempo verbal sigue a la cláusula \"If\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "If we calibrated the coordinate measuring machine weekly, we _____ fewer measurement variances.",
            "opts": [
              "would observe",
              "will observe",
              "observe",
              "observed"
            ],
            "ans": 0,
            "exp": "Second Conditional (hypothetical): If + Past Simple (\"calibrated\"), main clause uses would + base verb (\"would observe\").",
            "socraticHint": "La cláusula condicional usa pasado simple (\"calibrated\"). ¿Qué modal hipotético corresponde en la cláusula principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The outer diameter of the crankshaft must remain within the specified tolerance of 45.00 mm _____ 0.02 mm.",
            "opts": [
              "plus or minus (±)",
              "multiplied by",
              "divided into",
              "underneath"
            ],
            "ans": 0,
            "exp": "Engineering tolerances are designated with \"plus or minus\" (±) to indicate upper and lower allowable limits.",
            "socraticHint": "¿Cómo se lee y escribe formalmente el símbolo \"±\" en especificaciones de tolerancias dimensionales en inglés?",
            "category": "Léxico Técnico"
          },
          {
            "q": "What statistical measure indicates whether a manufacturing process is capable of producing parts within specification limits?",
            "opts": [
              "Process Capability Index (Cpk / Ppk)",
              "Total factory floor square footage",
              "Number of cafeteria chairs",
              "Monthly electricity bill"
            ],
            "ans": 0,
            "exp": "Cpk evaluates both the spread and centering of a process relative to its upper and lower specification limits (USL/LSL).",
            "socraticHint": "¿Qué índice estadístico relaciona la dispersión de seis sigmas del proceso con los límites de especificación del cliente?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"She realized the micrometer was out of calibration.\" ¿Qué significa \"realized\"?",
            "opts": [
              "Realizó físicamente la calibración",
              "Se dio cuenta / Comprendió la situación",
              "Fabricó un micrómetro nuevo",
              "Vendió el instrumento"
            ],
            "ans": 1,
            "exp": "\"To realize\" significa percatarse, darse cuenta o comprender. Llevar a cabo una tarea física es \"to perform\" o \"to carry out\".",
            "socraticHint": "Revisa el falso amigo: en inglés, ¿\"to realize\" significa ejecutar una acción o percatarse de un hecho?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Statistical\"?",
            "opts": [
              "sta-TIS-ti-cal (accent on TIS)",
              "STA-tis-ti-cal",
              "sta-tis-TI-cal",
              "sta-tis-ti-CAL"
            ],
            "ans": 0,
            "exp": "In American English, \"statistical\" has its primary stress on the second syllable: /stəˈtɪstɪkəl/.",
            "socraticHint": "¿El adjetivo \"statistical\" lleva la sílaba tónica en \"TIS\" o en el prefijo?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "If the ambient temperature in the metrology lab rises above 20°C, the thermal expansion _____ the reading.",
            "opts": [
              "will distort",
              "distorted",
              "would have distort",
              "is distorting"
            ],
            "ans": 0,
            "exp": "First Conditional: If + Present Simple (\"rises\"), result clause = will + base verb (\"will distort\").",
            "socraticHint": "Se describe una causa-efecto física predecible. ¿Qué estructura condicional expresa este resultado futuro seguro?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What does \"USL\" represent on an industrial Statistical Process Control (SPC) chart?",
            "opts": [
              "Upper Specification Limit",
              "Universal Solder Line",
              "Unified System Lock",
              "Underground Safety Link"
            ],
            "ans": 0,
            "exp": "USL stands for Upper Specification Limit (Límite Superior de Especificación), set by customer engineering prints.",
            "socraticHint": "¿Cuál es el significado formal de la sigla \"USL\" en las cartas de control estadístico de calidad?",
            "category": "Léxico Técnico"
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
          "question": "What is the primary agenda item for the Tuesday morning cross-functional engineering meeting?",
          "options": [
            "Reviewing the launch schedule and tooling changeover for Project Titan",
            "Ordering office stationery",
            "Selecting the color of the company uniforms",
            "Discussing weekend sports results"
          ],
          "correct": 0,
          "questions": [
            {
              "q": "What is the primary agenda item for the Tuesday morning cross-functional engineering meeting?",
              "options": [
                "Reviewing the launch schedule and tooling changeover for Project Titan",
                "Ordering office stationery",
                "Selecting the color of the company uniforms",
                "Discussing weekend sports results"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "The meeting notice highlights the final production pilot and tooling changeover milestones for Project Titan."
            },
            {
              "q": "How does an engineer professionally express technical disagreement with an unrealistic delivery timeline?",
              "options": [
                "By shouting and walking out of the conference room",
                "By using diplomatic phrasing: \"From an engineering standpoint, that timeline introduces unacceptable quality risks\"",
                "By remaining silent and failing the deadline later",
                "By blaming the purchasing department"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "American professional engineering pragmatics relies on data-driven, diplomatic pushback that frames issues around risk."
            },
            {
              "q": "What action item was assigned to the automation team by the end of the sprint cycle?",
              "options": [
                "Deploying the validated PLC ladder logic for Station 2 and completing the safety interlock sign-off",
                "Painting the walls of the break room",
                "Ordering 500 paper notebooks",
                "Conducting a social media survey"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "The action matrix records the automation deliverable: PLC code deployment and safety sign-off."
            }
          ],
          "answer": 0
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
            "q": "Which phrase expresses diplomatic disagreement most professionally in an American engineering conference?",
            "opts": [
              "\"You are completely wrong about the motor sizing.\"",
              "\"I understand your perspective; however, our thermal data indicates potential overheating under peak load.\"",
              "\"That idea is foolish.\"",
              "\"Do whatever you want, but it will fail.\""
            ],
            "ans": 1,
            "exp": "Professional technical disagreement validates the counterpart’s perspective while grounding pushback on empirical data.",
            "socraticHint": "En una reunión con clientes o gerentes de EE. UU., ¿cómo se manifiesta un desacuerdo técnico sin sonar confrontacional?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "It is highly _____ that the tooling supplier will deliver the CNC fixtures before Friday.",
            "opts": [
              "likely",
              "like",
              "liking",
              "as like"
            ],
            "ans": 0,
            "exp": "\"Likely\" functions as an adjective meaning probable: \"It is highly likely that...\".",
            "socraticHint": "¿Qué palabra en inglés significa \"probable\" en estimaciones de ingeniería y cronogramas?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Could you please _____ your recommendation regarding the backup power generator capacity?",
            "opts": [
              "clarify",
              "clarifies",
              "clarifying",
              "clarified"
            ],
            "ans": 0,
            "exp": "Modal questions (\"Could you please...\") take the base form of the verb: \"clarify\".",
            "socraticHint": "Después de una fórmula de cortesía modal (\"Could you please...\"), ¿en qué forma se presenta el verbo?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What term describes a quantifiable project milestone that must be achieved before moving to the next phase?",
            "opts": [
              "Deliverable",
              "Distraction",
              "Deficit",
              "Discrepancy"
            ],
            "ans": 0,
            "exp": "A deliverable (entregable) is a tangible or intangible product or service produced as a result of a project.",
            "socraticHint": "¿Cuál es el término corporativo estándar para designar un entregable o hito contractual de un proyecto?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The eventual outcome of the thermal test will be published tomorrow.\" ¿Qué significa \"eventual\"?",
            "opts": [
              "Algo que ocurre de manera ocasional o por casualidad",
              "Final / Definitivo que ocurrirá al final del proceso",
              "Un suceso inesperado que causó alarma",
              "Un evento deportivo"
            ],
            "ans": 1,
            "exp": "\"Eventual\" en inglés significa final o resultante a largo plazo. Algo ocasional o por casualidad es \"occasional\" o \"sporadic\".",
            "socraticHint": "Revisa el falso amigo: ¿\"eventual outcome\" se refiere a un resultado fortuito o al resultado final resultante?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Deliverable\"?",
            "opts": [
              "de-LIV-er-a-ble (accent on LIV)",
              "DE-liv-er-a-ble",
              "de-liv-ER-a-ble",
              "de-liv-er-A-ble"
            ],
            "ans": 0,
            "exp": "In American English, \"deliverable\" has primary stress on the second syllable: /dɪˈlɪvərəbəl/.",
            "socraticHint": "¿El sustantivo \"deliverable\" (entregable) lleva su golpe de voz en \"LIV\" o en el sufijo?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "We _____ the project timeline with the Mexican and North American directors next Monday.",
            "opts": [
              "are going to review",
              "reviewed",
              "had reviewed",
              "were reviewing"
            ],
            "ans": 0,
            "exp": "Use \"be going to\" or Present Continuous for planned future arrangements with specific time markers (\"next Monday\").",
            "socraticHint": "Se trata de un plan agendado y confirmado para el próximo lunes. ¿Qué estructura de futuro planificado corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the purpose of an \"Action Items Matrix\" circulated after a technical design review?",
            "opts": [
              "Assigning specific task ownership, deliverables, and completion deadlines to project engineers",
              "Listing what snacks were served in the conference room",
              "Recording employee personal birthdays",
              "Calculating the cafeteria expense report"
            ],
            "ans": 0,
            "exp": "An Action Items list clearly maps Who (Owner), What (Task), and When (Due Date) for accountability.",
            "socraticHint": "¿Cuál es el propósito medular de la minuta de compromisos (Action Items) tras una junta de ingeniería?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "Which phrase expresses diplomatic disagreement most professionally in an American engineering conference?",
            "opts": [
              "\"You are completely wrong about the motor sizing.\"",
              "\"I understand your perspective; however, our thermal data indicates potential overheating under peak load.\"",
              "\"That idea is foolish.\"",
              "\"Do whatever you want, but it will fail.\""
            ],
            "ans": 1,
            "exp": "Professional technical disagreement validates the counterpart’s perspective while grounding pushback on empirical data.",
            "socraticHint": "En una reunión con clientes o gerentes de EE. UU., ¿cómo se manifiesta un desacuerdo técnico sin sonar confrontacional?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "It is highly _____ that the tooling supplier will deliver the CNC fixtures before Friday.",
            "opts": [
              "likely",
              "like",
              "liking",
              "as like"
            ],
            "ans": 0,
            "exp": "\"Likely\" functions as an adjective meaning probable: \"It is highly likely that...\".",
            "socraticHint": "¿Qué palabra en inglés significa \"probable\" en estimaciones de ingeniería y cronogramas?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Could you please _____ your recommendation regarding the backup power generator capacity?",
            "opts": [
              "clarify",
              "clarifies",
              "clarifying",
              "clarified"
            ],
            "ans": 0,
            "exp": "Modal questions (\"Could you please...\") take the base form of the verb: \"clarify\".",
            "socraticHint": "Después de una fórmula de cortesía modal (\"Could you please...\"), ¿en qué forma se presenta el verbo?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What term describes a quantifiable project milestone that must be achieved before moving to the next phase?",
            "opts": [
              "Deliverable",
              "Distraction",
              "Deficit",
              "Discrepancy"
            ],
            "ans": 0,
            "exp": "A deliverable (entregable) is a tangible or intangible product or service produced as a result of a project.",
            "socraticHint": "¿Cuál es el término corporativo estándar para designar un entregable o hito contractual de un proyecto?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The eventual outcome of the thermal test will be published tomorrow.\" ¿Qué significa \"eventual\"?",
            "opts": [
              "Algo que ocurre de manera ocasional o por casualidad",
              "Final / Definitivo que ocurrirá al final del proceso",
              "Un suceso inesperado que causó alarma",
              "Un evento deportivo"
            ],
            "ans": 1,
            "exp": "\"Eventual\" en inglés significa final o resultante a largo plazo. Algo ocasional o por casualidad es \"occasional\" o \"sporadic\".",
            "socraticHint": "Revisa el falso amigo: ¿\"eventual outcome\" se refiere a un resultado fortuito o al resultado final resultante?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Deliverable\"?",
            "opts": [
              "de-LIV-er-a-ble (accent on LIV)",
              "DE-liv-er-a-ble",
              "de-liv-ER-a-ble",
              "de-liv-er-A-ble"
            ],
            "ans": 0,
            "exp": "In American English, \"deliverable\" has primary stress on the second syllable: /dɪˈlɪvərəbəl/.",
            "socraticHint": "¿El sustantivo \"deliverable\" (entregable) lleva su golpe de voz en \"LIV\" o en el sufijo?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "We _____ the project timeline with the Mexican and North American directors next Monday.",
            "opts": [
              "are going to review",
              "reviewed",
              "had reviewed",
              "were reviewing"
            ],
            "ans": 0,
            "exp": "Use \"be going to\" or Present Continuous for planned future arrangements with specific time markers (\"next Monday\").",
            "socraticHint": "Se trata de un plan agendado y confirmado para el próximo lunes. ¿Qué estructura de futuro planificado corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the purpose of an \"Action Items Matrix\" circulated after a technical design review?",
            "opts": [
              "Assigning specific task ownership, deliverables, and completion deadlines to project engineers",
              "Listing what snacks were served in the conference room",
              "Recording employee personal birthdays",
              "Calculating the cafeteria expense report"
            ],
            "ans": 0,
            "exp": "An Action Items list clearly maps Who (Owner), What (Task), and When (Due Date) for accountability.",
            "socraticHint": "¿Cuál es el propósito medular de la minuta de compromisos (Action Items) tras una junta de ingeniería?",
            "category": "Léxico Técnico"
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
          "question": "Under standard aerospace and automotive PLM workflows, why is an Engineering Change Order (ECO) required before altering CAD geometry?",
          "options": [
            "Because CAD files cannot be edited without a password",
            "To guarantee documented cross-departmental approval, traceability, and supply chain readiness",
            "To satisfy personal preferences of the drafter",
            "To delay the project launch date intentionally"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "Under standard aerospace and automotive PLM workflows, why is an Engineering Change Order (ECO) required before altering CAD geometry?",
              "options": [
                "Because CAD files cannot be edited without a password",
                "To guarantee documented cross-departmental approval, traceability, and supply chain readiness",
                "To satisfy personal preferences of the drafter",
                "To delay the project launch date intentionally"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "An ECO enforces formal change control across design, tooling, procurement, inventory, and quality validation."
            },
            {
              "q": "What catastrophic thermal failure mode did ECO-7804 resolve on the battery management system (BMS) enclosure?",
              "options": [
                "The plastic cover was changing color under fluorescent lamps",
                "Thermal runaway risk caused by insufficient heat dissipation near MOSFET switching arrays",
                "Water vapor entering through the USB debugging port",
                "The serial number label was peeling off"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The change order resolved thermal concentration by integrating aluminum heat sinks and thermal conductive pads."
            },
            {
              "q": "What inventory action must occur regarding pre-ECO component stock currently residing in assembly staging bins?",
              "options": [
                "All pre-ECO parts must be immediately quarantined or reworked to prevent mixed-revision assembly",
                "Operators continue assembling old parts without inspection",
                "Parts are thrown into the ocean",
                "Parts are donated to employees"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "Configuration management requires physical segregation and disposition (scrap, rework, or use-as-is) of legacy stock."
            }
          ],
          "answer": 1
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
            "q": "If the mechanical engineering team _____ the thermal dissipation in finite element analysis earlier, the PCB revision wouldn’t have required heat sinks.",
            "opts": [
              "had modeled",
              "modeled",
              "would model",
              "has modeled"
            ],
            "ans": 0,
            "exp": "Third Conditional (past hypothetical counterfactual): If + Past Perfect (\"had modeled\"), result = would have + past participle.",
            "socraticHint": "Esta situación es un contrafáctico en el pasado (algo que no sucedió en su momento). ¿Qué tiempo verbal sigue a \"If\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "If we had incorporated the customer feedback in Phase 1, our launch date _____ delayed by three months.",
            "opts": [
              "would not have been",
              "will not be",
              "is not",
              "was not"
            ],
            "ans": 0,
            "exp": "Past hypothetical conditional consequence: \"would not have been delayed\".",
            "socraticHint": "¿Cómo se construye la consecuencia negativa de una condición hipotética en el pasado (Third Conditional)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "All design changes _____ by the Lead Systems Architect prior to manufacturing execution.",
            "opts": [
              "must be officially signed off",
              "must sign off officially",
              "must to be sign off",
              "must been signing off"
            ],
            "ans": 0,
            "exp": "Modal passive structure: must + be + past participle (\"must be officially signed off\").",
            "socraticHint": "Los cambios de diseño reciben la firma de autorización. ¿Qué estructura pasiva con \"must\" corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What formal document formally requests authorization to alter a component specification before the actual ECO is published?",
            "opts": [
              "Engineering Change Request (ECR)",
              "Invoice receipt",
              "Purchase requisition",
              "Travel expense voucher"
            ],
            "ans": 0,
            "exp": "An ECR (Engineering Change Request) precedes the ECO to evaluate feasibility and cost impact.",
            "socraticHint": "¿Cuál es la sigla del documento inicial de propuesta de cambio de ingeniería (ECR) previo a la orden formal (ECO)?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"This design revision is comprehensive.\" ¿Qué significa \"comprehensive\"?",
            "opts": [
              "Que es muy comprensivo y perdona errores",
              "Exhaustivo / Integral / Que abarca todos los aspectos",
              "Fácil de comprender para principiantes",
              "Comprimido en un archivo ZIP"
            ],
            "ans": 1,
            "exp": "\"Comprehensive\" significa integral, exhaustivo o completo. \"Comprensivo\" con los demás se traduce como \"understanding\".",
            "socraticHint": "Revisa el falso amigo: cuando decimos \"a comprehensive design revision\", ¿nos referimos a empatía o a un alcance exhaustivo?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Photolithography\"?",
            "opts": [
              "pho-to-li-THOG-ra-phy (accent on THOG)",
              "PHO-to-li-thog-ra-phy",
              "pho-TO-li-thog-ra-phy",
              "pho-to-li-thog-ra-PHY"
            ],
            "ans": 0,
            "exp": "Technical nouns with the Greek root \"-graphy\" regularly shift primary stress to the antepenultimate syllable: /ˌfoʊtoʊlɪˈθɑːɡrəfi/.",
            "socraticHint": "Aplica la regla prosódica para palabras con el sufijo \"-graphy\": el acento sube a la sílaba inmediatamente anterior.",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Had the quality team verified the resin shrinkage rate, the mold tooling _____ modified twice.",
            "opts": [
              "would not have been",
              "will not be",
              "was not",
              "is not"
            ],
            "ans": 0,
            "exp": "Inverted Third Conditional without \"if\": \"Had the team verified..., the mold would not have been modified...\".",
            "socraticHint": "Esta es una inversión condicional elegante sin \"if\" (\"Had the team verified...\"). ¿Cómo se completa la cláusula principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What phrase describes components that can replace older revisions without requiring mechanical modifications to surrounding mating parts?",
            "opts": [
              "Form, Fit, and Function Interchangeability",
              "Random Scrap Matching",
              "Loose Assembly Tolerance",
              "Visual Similarity"
            ],
            "ans": 0,
            "exp": "Form, Fit, and Function (FFF) interchangeability guarantees backward compatibility across mechanical and electrical boundaries.",
            "socraticHint": "¿Cuál es la tríada de ingeniería (FFF) que define la intercambiabilidad total de una pieza sin alterar el ensamble?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "If the mechanical engineering team _____ the thermal dissipation in finite element analysis earlier, the PCB revision wouldn’t have required heat sinks.",
            "opts": [
              "had modeled",
              "modeled",
              "would model",
              "has modeled"
            ],
            "ans": 0,
            "exp": "Third Conditional (past hypothetical counterfactual): If + Past Perfect (\"had modeled\"), result = would have + past participle.",
            "socraticHint": "Esta situación es un contrafáctico en el pasado (algo que no sucedió en su momento). ¿Qué tiempo verbal sigue a \"If\"?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "If we had incorporated the customer feedback in Phase 1, our launch date _____ delayed by three months.",
            "opts": [
              "would not have been",
              "will not be",
              "is not",
              "was not"
            ],
            "ans": 0,
            "exp": "Past hypothetical conditional consequence: \"would not have been delayed\".",
            "socraticHint": "¿Cómo se construye la consecuencia negativa de una condición hipotética en el pasado (Third Conditional)?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "All design changes _____ by the Lead Systems Architect prior to manufacturing execution.",
            "opts": [
              "must be officially signed off",
              "must sign off officially",
              "must to be sign off",
              "must been signing off"
            ],
            "ans": 0,
            "exp": "Modal passive structure: must + be + past participle (\"must be officially signed off\").",
            "socraticHint": "Los cambios de diseño reciben la firma de autorización. ¿Qué estructura pasiva con \"must\" corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What formal document formally requests authorization to alter a component specification before the actual ECO is published?",
            "opts": [
              "Engineering Change Request (ECR)",
              "Invoice receipt",
              "Purchase requisition",
              "Travel expense voucher"
            ],
            "ans": 0,
            "exp": "An ECR (Engineering Change Request) precedes the ECO to evaluate feasibility and cost impact.",
            "socraticHint": "¿Cuál es la sigla del documento inicial de propuesta de cambio de ingeniería (ECR) previo a la orden formal (ECO)?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"This design revision is comprehensive.\" ¿Qué significa \"comprehensive\"?",
            "opts": [
              "Que es muy comprensivo y perdona errores",
              "Exhaustivo / Integral / Que abarca todos los aspectos",
              "Fácil de comprender para principiantes",
              "Comprimido en un archivo ZIP"
            ],
            "ans": 1,
            "exp": "\"Comprehensive\" significa integral, exhaustivo o completo. \"Comprensivo\" con los demás se traduce como \"understanding\".",
            "socraticHint": "Revisa el falso amigo: cuando decimos \"a comprehensive design revision\", ¿nos referimos a empatía o a un alcance exhaustivo?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Photolithography\"?",
            "opts": [
              "pho-to-li-THOG-ra-phy (accent on THOG)",
              "PHO-to-li-thog-ra-phy",
              "pho-TO-li-thog-ra-phy",
              "pho-to-li-thog-ra-PHY"
            ],
            "ans": 0,
            "exp": "Technical nouns with the Greek root \"-graphy\" regularly shift primary stress to the antepenultimate syllable: /ˌfoʊtoʊlɪˈθɑːɡrəfi/.",
            "socraticHint": "Aplica la regla prosódica para palabras con el sufijo \"-graphy\": el acento sube a la sílaba inmediatamente anterior.",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Had the quality team verified the resin shrinkage rate, the mold tooling _____ modified twice.",
            "opts": [
              "would not have been",
              "will not be",
              "was not",
              "is not"
            ],
            "ans": 0,
            "exp": "Inverted Third Conditional without \"if\": \"Had the team verified..., the mold would not have been modified...\".",
            "socraticHint": "Esta es una inversión condicional elegante sin \"if\" (\"Had the team verified...\"). ¿Cómo se completa la cláusula principal?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What phrase describes components that can replace older revisions without requiring mechanical modifications to surrounding mating parts?",
            "opts": [
              "Form, Fit, and Function Interchangeability",
              "Random Scrap Matching",
              "Loose Assembly Tolerance",
              "Visual Similarity"
            ],
            "ans": 0,
            "exp": "Form, Fit, and Function (FFF) interchangeability guarantees backward compatibility across mechanical and electrical boundaries.",
            "socraticHint": "¿Cuál es la tríada de ingeniería (FFF) que define la intercambiabilidad total de una pieza sin alterar el ensamble?",
            "category": "Léxico Técnico"
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
          "question": "During an IATF 16949 supplier audit, what constitutes a \"Major Non-Conformance\"?",
          "options": [
            "A minor spelling typo on a cleaning schedule",
            "The absence or total systemic breakdown of a required quality management system control affecting product integrity",
            "An auditor arriving 5 minutes early",
            "A missing pen at the conference table"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "During an IATF 16949 supplier audit, what constitutes a \"Major Non-Conformance\"?",
              "options": [
                "A minor spelling typo on a cleaning schedule",
                "The absence or total systemic breakdown of a required quality management system control affecting product integrity",
                "An auditor arriving 5 minutes early",
                "A missing pen at the conference table"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "A Major Non-Conformance represents an absence or total failure of an essential QMS requirement that jeopardizes customer delivery."
            },
            {
              "q": "What documented evidence must a Tier-1 supplier produce during raw material traceability sampling?",
              "options": [
                "A Mill Test Certificate / Certificate of Analysis (CoA) matching heat lot numbers to incoming inventory",
                "A verbal promise from the supplier sales representative",
                "A photograph of the supplier corporate building",
                "A business card"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "Auditors require verifiable Certificates of Analysis (CoA) linked directly to chemical heat lots and physical inventory."
            },
            {
              "q": "What timeframe is standard for submitting a formal 8D corrective action plan following audit non-conformance issuance?",
              "options": [
                "12 months",
                "Initial containment within 24 hours, root cause within 14 days, and full closure within 30 calendar days",
                "5 years",
                "No deadline, whenever convenient"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Automotive and aerospace standards strictly mandate the 24h/14d/30d resolution cadence for audit findings."
            }
          ],
          "answer": 1
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
            "q": "The auditor requested that the calibration records _____ submitted for review before noon.",
            "opts": [
              "be",
              "are",
              "were",
              "to be"
            ],
            "ans": 0,
            "exp": "Subjunctive mood following verbs of demand or request (\"requested that...\"): use the bare subjunctive \"be\".",
            "socraticHint": "En inglés formal, tras verbos como \"request that\", \"demand that\" o \"require that\", ¿qué forma adopta el subjuntivo?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "It is imperative that every non-conforming batch _____ immediately quarantined in the designated red holding pen.",
            "opts": [
              "be",
              "is",
              "was",
              "being"
            ],
            "ans": 0,
            "exp": "Formulaic technical subjunctive: \"It is imperative that [subject] be [past participle]\".",
            "socraticHint": "Identifica la estructura con adjetivo de necesidad (\"It is imperative that...\"). ¿Qué forma verbal rige el subjuntivo inglés?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "How should an engineering quality director diplomatically counter an auditor’s preliminary finding?",
            "opts": [
              "\"You do not understand our operations.\"",
              "\"We acknowledge your observation; allow us to present the validated statistical gage R&R data that demonstrates process compliance.\"",
              "\"Cancel the audit immediately.\"",
              "\"We refuse to accept your paper.\""
            ],
            "ans": 1,
            "exp": "Diplomatic audit defense pairs professional acknowledgment with objective, verified statistical evidence.",
            "socraticHint": "En una auditoría internacional, ¿cuál es la respuesta más diplomática, profesional y respaldada por evidencia empírica?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "What metric evaluates the measurement system variance between different operators and repeated trials on the same parts?",
            "opts": [
              "Gage Repeatability and Reproducibility (Gage R&R)",
              "Gross Factory Profit",
              "Operator Heart Rate",
              "Lunch Break Duration"
            ],
            "ans": 0,
            "exp": "Gage R&R evaluates whether the metrology system itself introduces unacceptable variability into process metrics.",
            "socraticHint": "¿Qué estudio de metrología estadística determina el porcentaje de variación debido al instrumento y al operador?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The plant is certified according to international standards.\" ¿Qué significa \"certified\"?",
            "opts": [
              "Que alguien está loco o demente",
              "Certificado oficialmente mediante auditoría y acreditación formal",
              "Sospechoso de fraude",
              "Registrado en el registro civil"
            ],
            "ans": 1,
            "exp": "\"Certified\" en gestión de calidad significa que la planta posee un certificado formal de cumplimiento de normas (ISO/IATF).",
            "socraticHint": "Revisa el término: en el entorno industrial, ¿qué avala una planta \"certified\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Compliance\"?",
            "opts": [
              "com-PLI-ance (accent on PLI)",
              "COM-pli-ance",
              "com-pli-ANCE",
              "Equal flat pitch across all syllables"
            ],
            "ans": 0,
            "exp": "In American English, \"compliance\" is stressed on the second syllable: /kəmˈplaɪəns/.",
            "socraticHint": "¿El sustantivo \"compliance\" (cumplimiento normativo) lleva su acento de intensidad en la primera o segunda sílaba?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The quality committee insisted that the supplier _____ its corrective action plan within 48 hours.",
            "opts": [
              "revise",
              "revises",
              "revised",
              "will revise"
            ],
            "ans": 0,
            "exp": "Subjunctive mood after \"insisted that [subject] + base form\": \"revise\".",
            "socraticHint": "Aplica el subjuntivo mandatorio en inglés tras \"insisted that\": ¿el verbo lleva \"-s\" de tercera persona o queda en forma base?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What type of audit finding represents an opportunity for enhancement but does not violate a mandatory clause?",
            "opts": [
              "Opportunity for Improvement (OFI)",
              "Critical Safety Violation",
              "Major Non-Conformance",
              "Immediate Plant Evacuation"
            ],
            "ans": 0,
            "exp": "An OFI (Opportunity for Improvement) is an advisory observation that helps optimize processes without counting as a failure.",
            "socraticHint": "¿Cómo se le denomina en auditorías ISO a una observación constructiva que no constituye una no-conformidad formal?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "The auditor requested that the calibration records _____ submitted for review before noon.",
            "opts": [
              "be",
              "are",
              "were",
              "to be"
            ],
            "ans": 0,
            "exp": "Subjunctive mood following verbs of demand or request (\"requested that...\"): use the bare subjunctive \"be\".",
            "socraticHint": "En inglés formal, tras verbos como \"request that\", \"demand that\" o \"require that\", ¿qué forma adopta el subjuntivo?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "It is imperative that every non-conforming batch _____ immediately quarantined in the designated red holding pen.",
            "opts": [
              "be",
              "is",
              "was",
              "being"
            ],
            "ans": 0,
            "exp": "Formulaic technical subjunctive: \"It is imperative that [subject] be [past participle]\".",
            "socraticHint": "Identifica la estructura con adjetivo de necesidad (\"It is imperative that...\"). ¿Qué forma verbal rige el subjuntivo inglés?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "How should an engineering quality director diplomatically counter an auditor’s preliminary finding?",
            "opts": [
              "\"You do not understand our operations.\"",
              "\"We acknowledge your observation; allow us to present the validated statistical gage R&R data that demonstrates process compliance.\"",
              "\"Cancel the audit immediately.\"",
              "\"We refuse to accept your paper.\""
            ],
            "ans": 1,
            "exp": "Diplomatic audit defense pairs professional acknowledgment with objective, verified statistical evidence.",
            "socraticHint": "En una auditoría internacional, ¿cuál es la respuesta más diplomática, profesional y respaldada por evidencia empírica?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "What metric evaluates the measurement system variance between different operators and repeated trials on the same parts?",
            "opts": [
              "Gage Repeatability and Reproducibility (Gage R&R)",
              "Gross Factory Profit",
              "Operator Heart Rate",
              "Lunch Break Duration"
            ],
            "ans": 0,
            "exp": "Gage R&R evaluates whether the metrology system itself introduces unacceptable variability into process metrics.",
            "socraticHint": "¿Qué estudio de metrología estadística determina el porcentaje de variación debido al instrumento y al operador?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The plant is certified according to international standards.\" ¿Qué significa \"certified\"?",
            "opts": [
              "Que alguien está loco o demente",
              "Certificado oficialmente mediante auditoría y acreditación formal",
              "Sospechoso de fraude",
              "Registrado en el registro civil"
            ],
            "ans": 1,
            "exp": "\"Certified\" en gestión de calidad significa que la planta posee un certificado formal de cumplimiento de normas (ISO/IATF).",
            "socraticHint": "Revisa el término: en el entorno industrial, ¿qué avala una planta \"certified\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Compliance\"?",
            "opts": [
              "com-PLI-ance (accent on PLI)",
              "COM-pli-ance",
              "com-pli-ANCE",
              "Equal flat pitch across all syllables"
            ],
            "ans": 0,
            "exp": "In American English, \"compliance\" is stressed on the second syllable: /kəmˈplaɪəns/.",
            "socraticHint": "¿El sustantivo \"compliance\" (cumplimiento normativo) lleva su acento de intensidad en la primera o segunda sílaba?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The quality committee insisted that the supplier _____ its corrective action plan within 48 hours.",
            "opts": [
              "revise",
              "revises",
              "revised",
              "will revise"
            ],
            "ans": 0,
            "exp": "Subjunctive mood after \"insisted that [subject] + base form\": \"revise\".",
            "socraticHint": "Aplica el subjuntivo mandatorio en inglés tras \"insisted that\": ¿el verbo lleva \"-s\" de tercera persona o queda en forma base?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What type of audit finding represents an opportunity for enhancement but does not violate a mandatory clause?",
            "opts": [
              "Opportunity for Improvement (OFI)",
              "Critical Safety Violation",
              "Major Non-Conformance",
              "Immediate Plant Evacuation"
            ],
            "ans": 0,
            "exp": "An OFI (Opportunity for Improvement) is an advisory observation that helps optimize processes without counting as a failure.",
            "socraticHint": "¿Cómo se le denomina en auditorías ISO a una observación constructiva que no constituye una no-conformidad formal?",
            "category": "Léxico Técnico"
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
          "question": "In industrial risk management under ISO 31000 and FMEA standards, how is the Risk Priority Number (RPN) calculated?",
          "options": [
            "RPN = Severity x Occurrence x Detection",
            "RPN = Voltage x Current x Resistance",
            "RPN = Temperature + Pressure",
            "RPN = Total scrap parts divided by shift hours"
          ],
          "correct": 0,
          "questions": [
            {
              "q": "In industrial risk management under ISO 31000 and FMEA standards, how is the Risk Priority Number (RPN) calculated?",
              "options": [
                "RPN = Severity x Occurrence x Detection",
                "RPN = Voltage x Current x Resistance",
                "RPN = Temperature + Pressure",
                "RPN = Total scrap parts divided by shift hours"
              ],
              "correct": 0,
              "answer": 0,
              "exp": "RPN is the quantitative product of Severity rating (S), Occurrence probability (O), and Detection capability (D)."
            },
            {
              "q": "What was the immediate physical triggering event that precipitated the robotic cell collision during shift 3?",
              "options": [
                "An intentional sabotage by a technician",
                "A micro-fracture in the optical fiber communication cable between the PLC and the robotic drive controller",
                "A lightning bolt striking the factory roof",
                "A programming error created in 1995"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The forensic analysis identified optical attenuation caused by dynamic mechanical fatigue in the flex cable track."
            },
            {
              "q": "What preventative safeguard was retrofitted to eliminate high-severity pinch points in the loading vestibule?",
              "options": [
                "Painting warning signs on the floor with yellow tape",
                "Installing category 4 safety light curtains paired with redundant dual-channel safety relays",
                "Removing the robotic arm entirely",
                "Telling operators to be very careful"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "ISO 13849-1 mandates Category 4 redundant safety architectures for high-severity mechanical entrapment zones."
            }
          ],
          "answer": 0
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
            "q": "The electrical surge _____ the primary relay, because the backup circuit breaker tripped immediately.",
            "opts": [
              "must have damaged",
              "should damage",
              "can damage",
              "would damaged"
            ],
            "ans": 0,
            "exp": "Use modal of deduction in the past: \"must have + past participle\" to express logical certainty about past events.",
            "socraticHint": "Se tiene evidencia concluyente de lo ocurrido en el pasado. ¿Qué estructura modal deduce certeza lógica en retrospectiva?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The operator _____ bypassed the safety interlock, because the electronic event log shows the door switch was closed.",
            "opts": [
              "could not have",
              "must have",
              "should have",
              "might have"
            ],
            "ans": 0,
            "exp": "Use \"could not have + past participle\" to express that something was physically impossible based on empirical evidence.",
            "socraticHint": "Los registros electrónicos demuestran que era imposible que ocurriera. ¿Qué modal deduce imposibilidad en el pasado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The maintenance team _____ replaced the flex cable during the scheduled 500-hour overhaul, but they overlooked it.",
            "opts": [
              "should have",
              "must have",
              "could not have",
              "might not"
            ],
            "ans": 0,
            "exp": "Use \"should have + past participle\" to criticize past inaction or unfulfilled obligations.",
            "socraticHint": "Se expresa un deber no cumplido en el pasado que provocó una consecuencia negativa. ¿Qué modal corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What does \"FMEA\" stand for in reliability engineering and advanced risk analysis?",
            "opts": [
              "Failure Mode and Effects Analysis",
              "Fast Mechanical Electrical Assembly",
              "Factory Maintenance Electronic Application",
              "Functional Metrology Engineering Association"
            ],
            "ans": 0,
            "exp": "FMEA (Failure Mode and Effects Analysis) is the structured engineering discipline for proactive risk prevention.",
            "socraticHint": "¿Cuál es el significado formal de la sigla internacional FMEA en ingeniería de confiabilidad y calidad?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The fire caused severe damage to the facility.\" ¿Qué significa \"severe\"?",
            "opts": [
              "Una persona muy estricta de carácter",
              "Grave / Crítico / De alta magnitud o peligro",
              "Seco y sin agua",
              "Barato"
            ],
            "ans": 1,
            "exp": "En ingeniería y análisis de fallas, \"severe\" significa grave, crítico o catastrófico (\"severe damage\"). No alude a un profesor severo.",
            "socraticHint": "Revisa el falso amigo: en la clasificación de severidad de riesgos (Severity), ¿a qué se refiere \"severe\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Mitigation\"?",
            "opts": [
              "mit-i-GA-tion (accent on GA)",
              "MIT-i-ga-tion",
              "mit-I-ga-tion",
              "mit-i-ga-TION"
            ],
            "ans": 0,
            "exp": "In American English, words ending in \"-tion\" place primary stress on the preceding syllable: /ˌmɪtɪˈɡeɪʃən/.",
            "socraticHint": "Aplica la regla de acentuación para sustantivos terminados en \"-tion\". ¿Dónde recae la sílaba tónica?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The forensic report concluded that hydraulic contamination _____ caused the proportional valve to stick.",
            "opts": [
              "might have",
              "ought to",
              "is having",
              "shall have"
            ],
            "ans": 0,
            "exp": "Use \"might have + past participle\" to express plausible past possibility when conclusive evidence is still pending.",
            "socraticHint": "Se plantea una posibilidad verosímil pero no 100% definitiva sobre la causa pasada. ¿Qué modal de deducción se usa?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the highest priority action when an FMEA analysis yields a Severity rating of 9 or 10?",
            "opts": [
              "Immediate engineering redesign to eliminate the failure mode, regardless of RPN score",
              "Ignore it if Occurrence is low",
              "Wait until a customer files a lawsuit",
              "Offer discounts on the product"
            ],
            "ans": 0,
            "exp": "Severity 9 or 10 denotes safety hazard or non-compliance; design action is mandatory regardless of RPN.",
            "socraticHint": "Bajo los estándares de AIAG/VDA, cuando la severidad es 9 o 10 (riesgo a la vida), ¿qué acción es obligatoria?",
            "category": "Seguridad y Protocolo"
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
        ],
        "unitQuiz": [
          {
            "q": "The electrical surge _____ the primary relay, because the backup circuit breaker tripped immediately.",
            "opts": [
              "must have damaged",
              "should damage",
              "can damage",
              "would damaged"
            ],
            "ans": 0,
            "exp": "Use modal of deduction in the past: \"must have + past participle\" to express logical certainty about past events.",
            "socraticHint": "Se tiene evidencia concluyente de lo ocurrido en el pasado. ¿Qué estructura modal deduce certeza lógica en retrospectiva?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The operator _____ bypassed the safety interlock, because the electronic event log shows the door switch was closed.",
            "opts": [
              "could not have",
              "must have",
              "should have",
              "might have"
            ],
            "ans": 0,
            "exp": "Use \"could not have + past participle\" to express that something was physically impossible based on empirical evidence.",
            "socraticHint": "Los registros electrónicos demuestran que era imposible que ocurriera. ¿Qué modal deduce imposibilidad en el pasado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "The maintenance team _____ replaced the flex cable during the scheduled 500-hour overhaul, but they overlooked it.",
            "opts": [
              "should have",
              "must have",
              "could not have",
              "might not"
            ],
            "ans": 0,
            "exp": "Use \"should have + past participle\" to criticize past inaction or unfulfilled obligations.",
            "socraticHint": "Se expresa un deber no cumplido en el pasado que provocó una consecuencia negativa. ¿Qué modal corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What does \"FMEA\" stand for in reliability engineering and advanced risk analysis?",
            "opts": [
              "Failure Mode and Effects Analysis",
              "Fast Mechanical Electrical Assembly",
              "Factory Maintenance Electronic Application",
              "Functional Metrology Engineering Association"
            ],
            "ans": 0,
            "exp": "FMEA (Failure Mode and Effects Analysis) is the structured engineering discipline for proactive risk prevention.",
            "socraticHint": "¿Cuál es el significado formal de la sigla internacional FMEA en ingeniería de confiabilidad y calidad?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"The fire caused severe damage to the facility.\" ¿Qué significa \"severe\"?",
            "opts": [
              "Una persona muy estricta de carácter",
              "Grave / Crítico / De alta magnitud o peligro",
              "Seco y sin agua",
              "Barato"
            ],
            "ans": 1,
            "exp": "En ingeniería y análisis de fallas, \"severe\" significa grave, crítico o catastrófico (\"severe damage\"). No alude a un profesor severo.",
            "socraticHint": "Revisa el falso amigo: en la clasificación de severidad de riesgos (Severity), ¿a qué se refiere \"severe\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Mitigation\"?",
            "opts": [
              "mit-i-GA-tion (accent on GA)",
              "MIT-i-ga-tion",
              "mit-I-ga-tion",
              "mit-i-ga-TION"
            ],
            "ans": 0,
            "exp": "In American English, words ending in \"-tion\" place primary stress on the preceding syllable: /ˌmɪtɪˈɡeɪʃən/.",
            "socraticHint": "Aplica la regla de acentuación para sustantivos terminados en \"-tion\". ¿Dónde recae la sílaba tónica?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "The forensic report concluded that hydraulic contamination _____ caused the proportional valve to stick.",
            "opts": [
              "might have",
              "ought to",
              "is having",
              "shall have"
            ],
            "ans": 0,
            "exp": "Use \"might have + past participle\" to express plausible past possibility when conclusive evidence is still pending.",
            "socraticHint": "Se plantea una posibilidad verosímil pero no 100% definitiva sobre la causa pasada. ¿Qué modal de deducción se usa?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the highest priority action when an FMEA analysis yields a Severity rating of 9 or 10?",
            "opts": [
              "Immediate engineering redesign to eliminate the failure mode, regardless of RPN score",
              "Ignore it if Occurrence is low",
              "Wait until a customer files a lawsuit",
              "Offer discounts on the product"
            ],
            "ans": 0,
            "exp": "Severity 9 or 10 denotes safety hazard or non-compliance; design action is mandatory regardless of RPN.",
            "socraticHint": "Bajo los estándares de AIAG/VDA, cuando la severidad es 9 o 10 (riesgo a la vida), ¿qué acción es obligatoria?",
            "category": "Seguridad y Protocolo"
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
          "question": "In an executive engineering capstone defense, what is the critical balance required when presenting to the Chief Technology Officer (CTO)?",
          "options": [
            "Presenting only lines of code without explaining business value",
            "Translating complex engineering architecture and technical trade-offs into measurable Return on Investment (ROI) and operational efficiency gains",
            "Speaking in high-level marketing buzzwords without technical data",
            "Reading directly from a teleprompter"
          ],
          "correct": 1,
          "questions": [
            {
              "q": "In an executive engineering capstone defense, what is the critical balance required when presenting to the Chief Technology Officer (CTO)?",
              "options": [
                "Presenting only lines of code without explaining business value",
                "Translating complex engineering architecture and technical trade-offs into measurable Return on Investment (ROI) and operational efficiency gains",
                "Speaking in high-level marketing buzzwords without technical data",
                "Reading directly from a teleprompter"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Executive engineering presentations bridge technical rigor (specifications, algorithms) with strategic ROI and capital justification."
            },
            {
              "q": "How does an engineering team defend a 12% capital expenditure (CapEx) variance during executive cross-examination?",
              "options": [
                "By apologizing and offering to cancel the project",
                "By presenting data-driven payback amortization models showing that the investment pays for itself within 14 months through scrap reduction",
                "By blaming the supplier",
                "By pretending the variance does not exist"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "Defending CapEx investments requires demonstrating net present value (NPV) and rapid payback amortization based on scrap reduction."
            },
            {
              "q": "What rhetorical discourse strategy should an engineer adopt when responding to hostile or probing questions from executive board members?",
              "options": [
                "Defensive emotional pushback and arguing",
                "The Socratic concession-and-pivot framework: acknowledge the validity of the concern, clarify the underlying constraint, and present verified empirical benchmark data",
                "Ignoring the board member completely",
                "Resigning on the spot"
              ],
              "correct": 1,
              "answer": 1,
              "exp": "The concession-and-pivot framework demonstrates executive maturity, intellectual honesty, and composure under pressure."
            }
          ],
          "answer": 1
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
            "q": "Which discourse marker best introduces an empirical counter-argument in an executive technical pitch?",
            "opts": [
              "\"Whereas previous implementations encountered latency bottlenecks, our distributed architecture maintains sub-millisecond throughput.\"",
              "\"You are wrong about the throughput.\"",
              "\"Our code is fast because we say so.\"",
              "\"Nobody cares about latency anyway.\""
            ],
            "ans": 0,
            "exp": "Using \"Whereas...\" establishes high-level comparative contrast between baseline limitations and empirical engineering breakthroughs.",
            "socraticHint": "¿Cuál conector retórico formal establece un contraste empírico sofisticado en una defensa ejecutiva?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "Not only _____ the automation cell achieve a 99.4% first-pass yield, but it also reduced labor costs by 35%.",
            "opts": [
              "did",
              "does",
              "has",
              "was"
            ],
            "ans": 0,
            "exp": "Negative adverbial inversion: \"Not only did [subject] + base verb... but it also...\".",
            "socraticHint": "Esta estructura utiliza inversión estilística enfática (\"Not only...\"). ¿Qué auxiliar se coloca antes del sujeto en pasado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Under no circumstances _____ safety-critical firmware be flashed without secondary cryptographic verification.",
            "opts": [
              "should",
              "ought",
              "must to",
              "will to"
            ],
            "ans": 0,
            "exp": "Inversion after restrictive prepositional phrases: \"Under no circumstances should [subject] be...\".",
            "socraticHint": "La frase restrictiva inicial \"Under no circumstances\" exige inversión auxiliar-sujeto. ¿Cuál modal encaja?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What financial metric calculates the length of time required to recover the cost of an automation investment through cost savings?",
            "opts": [
              "Payback Period (Amortization Horizon)",
              "Net Gross Weight",
              "Daily Scrap Ratio",
              "Operating Temperature Range"
            ],
            "ans": 0,
            "exp": "The Payback Period (Periodo de Retorno de Inversión) determines when capital expenditure breaks even through operational savings.",
            "socraticHint": "¿Qué métrica económico-financiera calcula los meses o años necesarios para recuperar la inversión de capital (CapEx)?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"We must defend our technical premises before the executive board.\" ¿Qué son \"premises\"?",
            "opts": [
              "Premisas lógicas y fundamentos teóricos / o las instalaciones físicas del edificio",
              "Premios de la academia de ciencias",
              "Promesas que no se pueden cumplir",
              "Préstamos bancarios"
            ],
            "ans": 0,
            "exp": "\"Premises\" puede referirse a premisas de razonamiento o a las instalaciones físicas de una empresa. No significa \"premios\".",
            "socraticHint": "Revisa el falso amigo: en argumentación científica y lógica técnica, ¿qué significa \"technical premises\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Architecture\"?",
            "opts": [
              "AR-chi-tec-ture (accent on AR)",
              "ar-CHI-tec-ture",
              "ar-chi-TEC-ture",
              "ar-chi-tec-TURE"
            ],
            "ans": 0,
            "exp": "In American English, \"architecture\" has its primary stress on the first syllable: /ˈɑːrkətɛktʃər/.",
            "socraticHint": "¿El sustantivo \"architecture\" se acentúa en la primera sílaba \"AR\" o en el centro?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Seldom _____ an engineering capstone demonstrated such a thorough integration of ISO compliance and edge computing.",
            "opts": [
              "has",
              "have",
              "did have",
              "having"
            ],
            "ans": 0,
            "exp": "Inversion with negative frequency adverb \"Seldom has [subject singular] demonstrated...\".",
            "socraticHint": "La oración inicia con el adverbio restrictivo \"Seldom\" y el sujeto es singular (\"capstone\"). ¿Qué auxiliar corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the primary objective of the Socratic defense portion of an engineering master’s capstone?",
            "opts": [
              "To test whether the engineer can defend architectural choices under cross-examination and demonstrate deep systemic understanding",
              "To memorize slides and recite them mechanically",
              "To see who speaks the loudest",
              "To avoid answering difficult technical questions"
            ],
            "ans": 0,
            "exp": "The Socratic defense evaluates critical thinking, handling trade-offs, and intellectual resilience under rigorous questioning.",
            "socraticHint": "¿Cuál es el valor académico y profesional de la ronda de preguntas socráticas en una defensa de grado de ingeniería?",
            "category": "Léxico Técnico"
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
        ],
        "unitQuiz": [
          {
            "q": "Which discourse marker best introduces an empirical counter-argument in an executive technical pitch?",
            "opts": [
              "\"Whereas previous implementations encountered latency bottlenecks, our distributed architecture maintains sub-millisecond throughput.\"",
              "\"You are wrong about the throughput.\"",
              "\"Our code is fast because we say so.\"",
              "\"Nobody cares about latency anyway.\""
            ],
            "ans": 0,
            "exp": "Using \"Whereas...\" establishes high-level comparative contrast between baseline limitations and empirical engineering breakthroughs.",
            "socraticHint": "¿Cuál conector retórico formal establece un contraste empírico sofisticado en una defensa ejecutiva?",
            "category": "Pragmática Estadounidense"
          },
          {
            "q": "Not only _____ the automation cell achieve a 99.4% first-pass yield, but it also reduced labor costs by 35%.",
            "opts": [
              "did",
              "does",
              "has",
              "was"
            ],
            "ans": 0,
            "exp": "Negative adverbial inversion: \"Not only did [subject] + base verb... but it also...\".",
            "socraticHint": "Esta estructura utiliza inversión estilística enfática (\"Not only...\"). ¿Qué auxiliar se coloca antes del sujeto en pasado?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "Under no circumstances _____ safety-critical firmware be flashed without secondary cryptographic verification.",
            "opts": [
              "should",
              "ought",
              "must to",
              "will to"
            ],
            "ans": 0,
            "exp": "Inversion after restrictive prepositional phrases: \"Under no circumstances should [subject] be...\".",
            "socraticHint": "La frase restrictiva inicial \"Under no circumstances\" exige inversión auxiliar-sujeto. ¿Cuál modal encaja?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What financial metric calculates the length of time required to recover the cost of an automation investment through cost savings?",
            "opts": [
              "Payback Period (Amortization Horizon)",
              "Net Gross Weight",
              "Daily Scrap Ratio",
              "Operating Temperature Range"
            ],
            "ans": 0,
            "exp": "The Payback Period (Periodo de Retorno de Inversión) determines when capital expenditure breaks even through operational savings.",
            "socraticHint": "¿Qué métrica económico-financiera calcula los meses o años necesarios para recuperar la inversión de capital (CapEx)?",
            "category": "Léxico Técnico"
          },
          {
            "q": "Cuidado con el falso amigo: \"We must defend our technical premises before the executive board.\" ¿Qué son \"premises\"?",
            "opts": [
              "Premisas lógicas y fundamentos teóricos / o las instalaciones físicas del edificio",
              "Premios de la academia de ciencias",
              "Promesas que no se pueden cumplir",
              "Préstamos bancarios"
            ],
            "ans": 0,
            "exp": "\"Premises\" puede referirse a premisas de razonamiento o a las instalaciones físicas de una empresa. No significa \"premios\".",
            "socraticHint": "Revisa el falso amigo: en argumentación científica y lógica técnica, ¿qué significa \"technical premises\"?",
            "category": "Trampa de Falso Amigo"
          },
          {
            "q": "Where does the primary stress fall when pronouncing \"Architecture\"?",
            "opts": [
              "AR-chi-tec-ture (accent on AR)",
              "ar-CHI-tec-ture",
              "ar-chi-TEC-ture",
              "ar-chi-tec-TURE"
            ],
            "ans": 0,
            "exp": "In American English, \"architecture\" has its primary stress on the first syllable: /ˈɑːrkətɛktʃər/.",
            "socraticHint": "¿El sustantivo \"architecture\" se acentúa en la primera sílaba \"AR\" o en el centro?",
            "category": "Fonética y Acentuación"
          },
          {
            "q": "Seldom _____ an engineering capstone demonstrated such a thorough integration of ISO compliance and edge computing.",
            "opts": [
              "has",
              "have",
              "did have",
              "having"
            ],
            "ans": 0,
            "exp": "Inversion with negative frequency adverb \"Seldom has [subject singular] demonstrated...\".",
            "socraticHint": "La oración inicia con el adverbio restrictivo \"Seldom\" y el sujeto es singular (\"capstone\"). ¿Qué auxiliar corresponde?",
            "category": "Gramática y Sintaxis"
          },
          {
            "q": "What is the primary objective of the Socratic defense portion of an engineering master’s capstone?",
            "opts": [
              "To test whether the engineer can defend architectural choices under cross-examination and demonstrate deep systemic understanding",
              "To memorize slides and recite them mechanically",
              "To see who speaks the loudest",
              "To avoid answering difficult technical questions"
            ],
            "ans": 0,
            "exp": "The Socratic defense evaluates critical thinking, handling trade-offs, and intellectual resilience under rigorous questioning.",
            "socraticHint": "¿Cuál es el valor académico y profesional de la ronda de preguntas socráticas en una defensa de grado de ingeniería?",
            "category": "Léxico Técnico"
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
      explanation: q.explanation || q.exp,
      socraticHint: q.socraticHint || '',
      category: q.category || 'General'
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
