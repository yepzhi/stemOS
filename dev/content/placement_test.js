/**
 * ==============================================================================
 * stemOS LXP — Examen de Ubicación Institucional (Placement Test Engine)
 * Evaluación Diagnóstica de 3 Competencias Clave (Grammar, Listening, Reading)
 * 
 * Filosofía de Diseño:
 * - Cero latencia y cero dependencias de APIs complejas (Speaking/Writing pesados)
 * - 32 Reactivos calibrados bajo descriptores del Marco Común Europeo (MCER/CEFR)
 * - Reproducción de Audio Nativo mediante Web Speech API (en-US)
 * - Calificación instantánea determinista con reporte de cohorte para Docentes y Rectoría
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
    root.STEMOS_PLACEMENT_TEST = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_PLACEMENT_TEST = result;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Banco de 32 Reactivos Calibrados: 12 Grammar, 10 Listening, 10 Reading
  const PLACEMENT_QUESTIONS = [
    // ════════════════════════════════════════════════════════════════════════
    // SECCIÓN 1: GRAMMAR & USE OF ENGLISH (12 Reactivos)
    // ════════════════════════════════════════════════════════════════════════
    {
      id: 'pt-g01',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A1',
      question: 'Hello, my name _____ Carlos and I am an engineering student.',
      options: ['is', 'are', 'am', 'be'],
      correct: 0,
      explanation: 'Use "is" with singular third-person subject "my name".'
    },
    {
      id: 'pt-g02',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A1',
      question: 'The daily morning shift _____ at 07:00 AM every weekday.',
      options: ['start', 'starts', 'starting', 'is start'],
      correct: 1,
      explanation: 'Simple present third-person singular takes "-s": starts.'
    },
    {
      id: 'pt-g03',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A1',
      question: '_____ there any cleanroom safety glasses inside that cabinet?',
      options: ['Is', 'Are', 'Do', 'Have'],
      correct: 1,
      explanation: 'Use "Are there" for plural countable nouns (safety glasses).'
    },
    {
      id: 'pt-g04',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A2',
      question: 'Yesterday, the maintenance technician _____ the worn drive belt.',
      options: ['replaces', 'replaced', 'was replace', 'replacing'],
      correct: 1,
      explanation: 'Simple past tense for a completed action in the past: replaced.'
    },
    {
      id: 'pt-g05',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A2',
      question: 'Aluminum enclosures are significantly _____ than cast-iron housings.',
      options: ['light', 'lighter', 'more light', 'lightest'],
      correct: 1,
      explanation: 'One-syllable comparative adjective: lighter than.'
    },
    {
      id: 'pt-g06',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'A2',
      question: 'We _____ install the new automated packaging line next Tuesday.',
      options: ['are going to', 'going to', 'will to', 'is going to'],
      correct: 0,
      explanation: 'Planned future with plural "we": are going to install.'
    },
    {
      id: 'pt-g07',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B1',
      question: 'Every circuit board _____ by dual optical inspection cameras before packaging.',
      options: ['is inspected', 'inspected', 'inspecting', 'has inspect'],
      correct: 0,
      explanation: 'Passive voice in present tense with singular subject: is inspected.'
    },
    {
      id: 'pt-g08',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B1',
      question: 'The engineering team _____ already finalized the tooling redesign.',
      options: ['is', 'has', 'did', 'was'],
      correct: 1,
      explanation: 'Present perfect with collective singular subject "team": has already finalized.'
    },
    {
      id: 'pt-g09',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B1',
      question: 'If we _____ air freight for the urgent components, they will arrive tomorrow.',
      options: ['use', 'used', 'will use', 'are used'],
      correct: 0,
      explanation: 'First conditional uses Simple Present in the if-clause: If we use...'
    },
    {
      id: 'pt-g10',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B2',
      question: 'The plant achieved 98.4% yield, _____ the benchmark facility reached only 94%.',
      options: ['whereas', 'despite', 'because', 'so that'],
      correct: 0,
      explanation: '"Whereas" contrasts two parallel factual clauses.'
    },
    {
      id: 'pt-g11',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B2',
      question: '_____ you require any further validation records, please contact our quality lab.',
      options: ['Should', 'Would', 'Had', 'Could'],
      correct: 0,
      explanation: 'Conditional inversion: "Should you require..." = "If you require...".'
    },
    {
      id: 'pt-g12',
      section: 'grammar',
      sectionLabel: 'Grammar & Structure',
      levelTarget: 'B2',
      question: 'What _____ the micro-burrs was excessive tool wear on the carbide broach.',
      options: ['cause', 'caused', 'causing', 'did cause'],
      correct: 1,
      explanation: 'Cleft sentence structure: What caused [object] was [noun].'
    },

    // ════════════════════════════════════════════════════════════════════════
    // SECCIÓN 2: LISTENING COMPREHENSION (10 Reactivos)
    // ════════════════════════════════════════════════════════════════════════
    {
      id: 'pt-l01',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A1',
      audioScript: 'Good morning, my name is Robert. My employee badge number is 4-2-9-0.',
      question: 'What is Robert\'s employee badge number?',
      options: ['4-2-9-0', '4-2-0-9', '2-4-9-0', '4-9-2-0'],
      correct: 0,
      explanation: 'The speaker clearly states 4-2-9-0.'
    },
    {
      id: 'pt-l02',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A1',
      audioScript: 'Attention all operators. The cafeteria will be closed for cleaning from two o\'clock to three o\'clock this afternoon.',
      question: 'What time will the cafeteria be closed?',
      options: ['From 1:00 to 2:00 PM', 'From 2:00 to 3:00 PM', 'From 3:00 to 4:00 PM', 'All day long'],
      correct: 1,
      explanation: 'The announcement states from 2:00 to 3:00 PM.'
    },
    {
      id: 'pt-l03',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A1',
      audioScript: 'Please place the calibrated torque wrench in Cabinet B on the top shelf.',
      question: 'Where should the torque wrench be placed?',
      options: ['In Cabinet A on the floor', 'In Cabinet B on the top shelf', 'In the manager\'s desk', 'Under the conveyor belt'],
      correct: 1,
      explanation: 'The instruction specifies Cabinet B on the top shelf.'
    },
    {
      id: 'pt-l04',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A2',
      audioScript: 'Station four experienced twenty minutes of unexpected downtime yesterday because an optical sensor became loose.',
      question: 'Why did Station four stop yesterday?',
      options: ['Power failure in the city', 'An optical sensor became loose', 'The operator arrived late', 'A software virus'],
      correct: 1,
      explanation: 'The speaker states that an optical sensor became loose.'
    },
    {
      id: 'pt-l05',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A2',
      audioScript: 'The delivery of raw stainless steel brackets was rescheduled from Monday morning to Wednesday afternoon.',
      question: 'When will the stainless steel brackets arrive?',
      options: ['Monday morning', 'Tuesday at noon', 'Wednesday afternoon', 'Friday night'],
      correct: 2,
      explanation: 'The delivery was rescheduled to Wednesday afternoon.'
    },
    {
      id: 'pt-l06',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'A2',
      audioScript: 'The pneumatic clamp cylinder is leaking compressed air behind the manifold. We must shut the air valve before replacing the seal.',
      question: 'What action must be taken before replacing the seal?',
      options: ['Speed up the machine', 'Shut the air valve', 'Turn on the hydraulic pump', 'Clean the floor'],
      correct: 1,
      explanation: 'The technician states: We must shut the air valve before replacing the seal.'
    },
    {
      id: 'pt-l07',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B1',
      audioScript: 'If the hole diameter exceeds zero point zero five millimeters from the CAD specification, the automated robot will segregate the part into the red quarantine bin.',
      question: 'What happens when a part exceeds the 0.05mm tolerance?',
      options: ['It is painted green', 'It is shipped immediately', 'It is segregated into the red quarantine bin', 'It is thrown in the trash'],
      correct: 2,
      explanation: 'The process diverts non-conforming parts into the red quarantine bin.'
    },
    {
      id: 'pt-l08',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B1',
      audioScript: 'I understand your concern about delivery lead times; however, switching to an unverified local vendor poses a significant quality risk.',
      question: 'What is the speaker\'s primary concern regarding the local vendor?',
      options: ['The vendor is too cheap', 'It poses a significant quality risk', 'The vendor is too close', 'The vendor has too many workers'],
      correct: 1,
      explanation: 'The speaker explicitly states it poses a significant quality risk.'
    },
    {
      id: 'pt-l09',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B2',
      audioScript: 'We are running short on time during this engineering review. Let\'s table the discussion regarding the secondary filtration bracket until Friday\'s morning sync.',
      question: 'What does the speaker mean by "let\'s table the discussion"?',
      options: ['Put the documents on top of a table', 'Postpone the topic until Friday', 'Cancel the project completely', 'Argue about it immediately'],
      correct: 1,
      explanation: 'In American English, to table a discussion means to postpone it temporarily.'
    },
    {
      id: 'pt-l10',
      section: 'listening',
      sectionLabel: 'Listening Comprehension',
      levelTarget: 'B2',
      audioScript: 'Our containment action was fully effective: all fifteen hundred finished subassemblies in transit were placed on electronic hold in warehouse quarantine, confirming zero defect escapes to the customer.',
      question: 'What did the containment action achieve?',
      options: ['Customer returned all items', 'Fifteen hundred units were held in quarantine, preventing defect escapes', 'The warehouse ran out of space', 'Production was doubled'],
      correct: 1,
      explanation: 'The containment quarantined the units and confirmed zero customer escapes.'
    },

    // ════════════════════════════════════════════════════════════════════════
    // SECCIÓN 3: READING COMPREHENSION (10 Reactivos)
    // ════════════════════════════════════════════════════════════════════════
    {
      id: 'pt-r01',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A1',
      passage: 'NOTICE: Eye protection and steel-toe safety boots are mandatory beyond this point. Visitors must sign the visitor log at Gate 2 and wear high-visibility vests at all times.',
      question: 'What must visitors do before entering?',
      options: ['Sign the visitor log at Gate 2 and wear high-visibility vests', 'Take off their boots', 'Drive a forklift', 'Clean the windows'],
      correct: 0,
      explanation: 'The notice specifies signing at Gate 2 and wearing high-vis vests.'
    },
    {
      id: 'pt-r02',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A1',
      passage: 'TOOL CRIB HOURS: Open Monday through Friday from 06:30 to 18:00. Closed for physical inventory on the last Friday of every month. Emergency tooling requests require supervisor signature.',
      question: 'When is the tool crib closed for inventory?',
      options: ['Every Monday morning', 'On the last Friday of every month', 'On weekends only', 'Every day at 18:00'],
      correct: 1,
      explanation: 'Closed for physical inventory on the last Friday of every month.'
    },
    {
      id: 'pt-r03',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A2',
      passage: 'MAINTENANCE LOG: At 14:15, motor drive #3 overheated and triggered thermal alarm code E-04. The crew inspected the cooling fan, cleaned the air intake filter, and restarted the drive at 14:45. Normal operating temperature was restored.',
      question: 'How long did the maintenance crew work before restarting the drive?',
      options: ['10 minutes', '30 minutes (from 14:15 to 14:45)', 'Two hours', 'All night'],
      correct: 1,
      explanation: 'From 14:15 to 14:45 is exactly 30 minutes.'
    },
    {
      id: 'pt-r04',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A2',
      passage: 'MATERIAL COMPARISON: Polycarbonate offers 250 times the impact resistance of standard glass and is twice as impact-resistant as acrylic. While acrylic is more scratch-resistant, polycarbonate is far safer for high-pressure machine guards.',
      question: 'Why is polycarbonate chosen for high-pressure machine guards?',
      options: ['It is cheaper than wood', 'It offers far higher impact resistance than glass and acrylic', 'It is completely opaque', 'It scratches easily'],
      correct: 1,
      explanation: 'It offers 250 times the impact resistance of glass and twice that of acrylic.'
    },
    {
      id: 'pt-r05',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'A2',
      passage: 'SHUTDOWN NOTICE: Next Saturday, the facility electrical substation will be shut down from 06:00 to 14:00 for transformer testing. Backup generators will supply emergency lighting and server rooms only.',
      question: 'What will backup generators power during the electrical shutdown?',
      options: ['The entire assembly line', 'Emergency lighting and server rooms only', 'All air conditioning', 'The cafeteria ovens'],
      correct: 1,
      explanation: 'The text specifies emergency lighting and server rooms only.'
    },
    {
      id: 'pt-r06',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B1',
      passage: 'SOP-108: Once circuit boards exit the reflow soldering oven, high-resolution cameras verify solder joints. If any bridge or insufficient solder is detected, the board is diverted to the rework station automatically without halting the main conveyor line.',
      question: 'What happens when a defective solder joint is detected?',
      options: ['The entire conveyor halts', 'The board is diverted to rework without halting the line', 'The board is discarded in the trash', 'Operators are evacuated'],
      correct: 1,
      explanation: 'The board is diverted to rework without halting the main line.'
    },
    {
      id: 'pt-r07',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B1',
      passage: 'EMAIL EXCERPT: "Dear Mr. Peterson, our engineering team has completed Milestone 2. Dimensional inspection data confirmed all critical tolerances are within plus or minus 0.02 millimeters. Attached is the sign-off certificate for your review."',
      question: 'What does the email confirm?',
      options: ['The project is delayed', 'Critical tolerances are within +/- 0.02mm and Milestone 2 is complete', 'The customer canceled the contract', 'New machines must be bought'],
      correct: 1,
      explanation: 'It confirms tolerances within +/- 0.02mm and Milestone 2 completion.'
    },
    {
      id: 'pt-r08',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B1',
      passage: 'SHIPPING DELAY PROTOCOL: In the event of an unavoidable transit delay exceeding 24 hours, contact the customer account representative immediately by telephone. State the cause objectively, provide a firm revised delivery date, and offer expedited freight if necessary.',
      question: 'What must you do if a transit delay exceeds 24 hours?',
      options: ['Send a postcard next month', 'Contact the customer by telephone and provide a firm revised date', 'Ignore the delay', 'Blame the driver'],
      correct: 1,
      explanation: 'Contact the representative by phone immediately and provide a firm revised date.'
    },
    {
      id: 'pt-r09',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B2',
      passage: 'EXECUTIVE MEMORANDUM: Overall Equipment Effectiveness (OEE) reached 86.2% in Q3, outperforming corporate benchmarks by 2.4 percentage points. Unplanned downtime decreased by 18% as a direct consequence of implementing vibration analysis predictive maintenance.',
      question: 'What directly contributed to the 18% decrease in unplanned downtime?',
      options: ['Hiring more guards', 'Implementing vibration analysis predictive maintenance', 'Working 24 hours on Sunday', 'Reducing wages'],
      correct: 1,
      explanation: 'The text links the decrease directly to implementing vibration analysis predictive maintenance.'
    },
    {
      id: 'pt-r10',
      section: 'reading',
      sectionLabel: 'Reading Comprehension',
      levelTarget: 'B2',
      passage: 'ROOT CAUSE SUMMARY: The 5-Why analysis determined that micro-burrs formed because tool wear on the carbide broach exceeded threshold after 500 cycles. Permanent corrective action: An automated optical tool-wear sensor has been installed to interlock the machine and enforce tool changes.',
      question: 'What is the permanent corrective action to prevent future micro-burrs?',
      options: ['Cleaning the broach manually once a week', 'Installing an automated optical sensor that enforces tool changes', 'Increasing the cutting speed', 'Buying cheaper steel'],
      correct: 1,
      explanation: 'Installing an automated optical sensor to interlock machine and enforce tool changes.'
    }
  ];

  // Algoritmo de Calificación y Diagnóstico CEFR
  function evaluateAnswers(userAnswers) {
    let totalScore = 0;
    let grammarScore = 0;
    let listeningScore = 0;
    let readingScore = 0;

    const detailedResults = [];

    PLACEMENT_QUESTIONS.forEach(q => {
      const selectedIndex = userAnswers[q.id];
      const isCorrect = selectedIndex === q.correct;
      if (isCorrect) {
        totalScore++;
        if (q.section === 'grammar') grammarScore++;
        if (q.section === 'listening') listeningScore++;
        if (q.section === 'reading') readingScore++;
      }
      detailedResults.push({
        id: q.id,
        section: q.section,
        levelTarget: q.levelTarget,
        selected: selectedIndex,
        correct: q.correct,
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    });

    const totalQuestions = PLACEMENT_QUESTIONS.length; // 32
    const percentage = Math.round((totalScore / totalQuestions) * 100);

    // Mapeo Determinista de Nivel MCER & Regla de Entrelazado (Interleaving)
    let assignedLevel = 'A1';
    let levelName = 'Breakthrough / Novice';
    let levelTitle = 'CEFR A1: Foundations';
    let recommendedTrack = 'mcer-a1-foundations';
    let color = '#10b981';
    let nextStep = 'Iniciar con Fundamentos del Idioma (A1), saludos laborales, horarios y ubicación en planta. Regla pedagógica: Cursas exclusivamente el Track Base MCER A1 para afianzar bases sólidas; los laboratorios técnicos de carrera (ESP) se desbloquean al alcanzar Nivel A2.';
    let interleavingRule = 'Nivel A1: Solo Track Base MCER A1 (Protección cognitiva • Labs ESP bloqueados hasta Nivel A2)';

    if (totalScore >= 26) {
      // 26 - 32 (>= 80%)
      assignedLevel = 'B2';
      levelName = 'Vantage / Executive Fluency';
      levelTitle = 'CEFR B2: Executive Fluency';
      recommendedTrack = 'mcer-b2-fluency';
      color = '#a855f7';
      nextStep = '¡Nivel Avanzado B2! Acreditas tronco común. Estás listo para liderar órdenes de cambio de ingeniería (ECO), negociaciones con clientes en EE. UU., auditorías internacionales y defensa de Capstone Socrático con IA.';
      interleavingRule = 'Nivel B2/C1: Nearshoring Senior, ECO & Capstone Socrático con IA';
    } else if (totalScore >= 20) {
      // 20 - 25 (60% - 79%)
      assignedLevel = 'B1';
      levelName = 'Threshold / Intermediate';
      levelTitle = 'CEFR B1: Professional Independence';
      recommendedTrack = 'mcer-b1-professional';
      color = '#f59e0b';
      nextStep = 'Iniciar en Nivel B1: Procedimientos SOPs, correos ejecutivos, llamadas de seguimiento y defensa técnica. Inmersión total en las 60.0h de Ruta Determinista de tu Carrera con simuladores de incidentes y reporte 8D.';
      interleavingRule = 'Nivel B1: Inmersión Total en Ruta Determinista de 60h (16 Estaciones)';
    } else if (totalScore >= 13) {
      // 13 - 19 (40% - 59%)
      assignedLevel = 'A2';
      levelName = 'Waystage / Elementary';
      levelTitle = 'CEFR A2: Practical Workplace';
      recommendedTrack = 'mcer-a2-workplace';
      color = '#38bdf8';
      nextStep = 'Iniciar en Nivel A2: Registro de incidentes pasados, comparación de materiales y reportes de falla. ¡Entrelazado activo! Cursas MCER A2 y se desbloquean tus primeros laboratorios técnicos de carrera (Seguridad, EHS y Herramientas Industriales).';
      interleavingRule = 'Nivel A2: MCER A2 + Labs ESP Iniciales Desbloqueados';
    }

    return {
      totalScore: totalScore,
      totalQuestions: totalQuestions,
      percentage: percentage,
      assignedLevel: assignedLevel,
      levelName: levelName,
      levelTitle: levelTitle,
      recommendedTrack: recommendedTrack,
      color: color,
      nextStep: nextStep,
      interleavingRule: interleavingRule,
      sectionScores: {
        grammar: { score: grammarScore, total: 12, pct: Math.round((grammarScore / 12) * 100) },
        listening: { score: listeningScore, total: 10, pct: Math.round((listeningScore / 10) * 100) },
        reading: { score: readingScore, total: 10, pct: Math.round((readingScore / 10) * 100) }
      },
      detailedResults: detailedResults,
      timestamp: new Date().toISOString()
    };
  }

  // Pre-rendered Studio-Quality US Neural Audio Assets (Edge/Piper Neural)
  const PLACEMENT_AUDIO_FILES = {
    'pt-test-audio': '/content/audio/pt-test-audio.mp3',
    'pt-l01': '/content/audio/pt-l01.mp3',
    'pt-l02': '/content/audio/pt-l02.mp3',
    'pt-l03': '/content/audio/pt-l03.mp3',
    'pt-l04': '/content/audio/pt-l04.mp3',
    'pt-l05': '/content/audio/pt-l05.mp3',
    'pt-l06': '/content/audio/pt-l06.mp3',
    'pt-l07': '/content/audio/pt-l07.mp3',
    'pt-l08': '/content/audio/pt-l08.mp3',
    'pt-l09': '/content/audio/pt-l09.mp3',
    'pt-l10': '/content/audio/pt-l10.mp3'
  };

  const SCRIPT_AUDIO_LOOKUP = {
    'good morning, my name is robert': '/content/audio/pt-l01.mp3',
    'attention all operators': '/content/audio/pt-l02.mp3',
    'please place the calibrated torque wrench': '/content/audio/pt-l03.mp3',
    'station four experienced twenty minutes': '/content/audio/pt-l04.mp3',
    'the delivery of raw stainless steel': '/content/audio/pt-l05.mp3',
    'the pneumatic clamp cylinder': '/content/audio/pt-l06.mp3',
    'if the hole diameter exceeds': '/content/audio/pt-l07.mp3',
    'i understand your concern about delivery': '/content/audio/pt-l08.mp3',
    'we are running short on time': '/content/audio/pt-l09.mp3',
    'our containment action was fully effective': '/content/audio/pt-l10.mp3',
    'welcome to stemos': '/content/audio/pt-test-audio.mp3'
  };

  let activePlacementAudio = null;

  function stopAudioPrompt() {
    if (activePlacementAudio) {
      try {
        activePlacementAudio.pause();
        activePlacementAudio.currentTime = 0;
      } catch (_) {}
      activePlacementAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
    }
  }

  // Reproductor de Audio: US Neural Audio Directo (Primario) -> Piper TTS -> Web Speech API (Fallback)
  function playAudioPrompt(scriptText, onStart, onEnd, qId) {
    stopAudioPrompt();

    // 1. Check exact question ID or text match in pre-rendered US Neural Audio assets
    let matchedUrl = null;
    if (qId && PLACEMENT_AUDIO_FILES[qId]) {
      matchedUrl = PLACEMENT_AUDIO_FILES[qId];
    } else if (scriptText) {
      const lower = scriptText.toLowerCase();
      for (const [snippet, url] of Object.entries(SCRIPT_AUDIO_LOOKUP)) {
        if (lower.includes(snippet)) {
          matchedUrl = url;
          break;
        }
      }
    }

    if (matchedUrl && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio(matchedUrl);
        activePlacementAudio = audio;
        audio.onplay = () => { if (onStart) onStart(); };
        audio.onended = () => {
          activePlacementAudio = null;
          if (onEnd) onEnd();
        };
        audio.onerror = () => {
          activePlacementAudio = null;
          fallbackToSpeechSynthesis(scriptText, onStart, onEnd);
        };
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => fallbackToSpeechSynthesis(scriptText, onStart, onEnd));
        }
        return;
      } catch (_) {
        // Fall through
      }
    }

    // 2. Check STEMOS_TTS Piper Neural engine
    if (typeof window !== 'undefined' && window.STEMOS_TTS && typeof window.STEMOS_TTS.speak === 'function') {
      window.STEMOS_TTS.speak(scriptText, {
        speed: 0.95,
        lang: 'en-US',
        onStart: onStart,
        onEnd: onEnd,
        onError: () => fallbackToSpeechSynthesis(scriptText, onStart, onEnd)
      });
      return;
    }

    // 3. Fallback
    fallbackToSpeechSynthesis(scriptText, onStart, onEnd);
  }

  function fallbackToSpeechSynthesis(scriptText, onStart, onEnd) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis not supported in this environment');
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Aaron') || v.name.includes('Jenny') || v.name.includes('Guy')));
    if (usVoice) utterance.voice = usVoice;

    if (onStart) utterance.onstart = onStart;
    utterance.onend = onEnd;
    utterance.onerror = onEnd;

    window.speechSynthesis.speak(utterance);
  }

  return {
    version: '1.0.0',
    title: 'stemOS Institutional Placement Test (Grammar, Listening, Reading)',
    questions: PLACEMENT_QUESTIONS,
    evaluateAnswers: evaluateAnswers,
    playAudioPrompt: playAudioPrompt,
    stopAudioPrompt: stopAudioPrompt
  };
}));
