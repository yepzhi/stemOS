/**
 * ==============================================================================
 * stemOS LXP — Módulos Curriculares MCER de 50 Minutos (A1 • A2 • B1 • B2 + C1–C2)
 * Cobertura Integral EAQUALS Core Inventory + CEFR-J Grammar/Vocab Profile + EGP
 * Con Diseño Instruccional por Modularidad, Slides Opcionales y Power Sheets (1 Hoja)
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
    root.STEMOS_MCER_CLASSES = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_MCER_CLASSES = result;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const MODULARITY_TEMPLATES = {
    'grammar-inductive': {
      id: 'grammar-inductive',
      name: 'Modularidad MCER-A: Gramática Inductiva & Sintaxis Operativa',
      focus: 'Dominio estructural con fórmula visual de bloques, contraste español→inglés y producción guiada.',
      totalMinutes: 50,
      onlineDuoMinutes: 18,
      phases: [
        { block: '00–05 min', phase: 'Ignición / Error Puzzle', desc: 'Detona el contraste típico español→inglés con 1 ejemplo de piso de planta o vida diaria y plantea el Can-Do del día.' },
        { block: '05–15 min', phase: 'Blueprint Inductivo (+ Slides)', desc: 'Presenta la fórmula visual en bloques de color, pronunciación con acento prosódico (pink stress) y 1 alerta de falso amigo.' },
        { block: '15–28 min', phase: 'Práctica Comunicativa en Aula', desc: 'Dinámica presencial por parejas ("Swap & Transform") produciendo afirmativa, negativa y pregunta sin depender de pantalla.' },
        { block: '28–46 min', phase: 'Reto Online Duolingo (18 min)', desc: 'Secuencia en app.html: Vocab Sprint (3m) + Sentence Builder (4m) + Audio Lab (4m) + Grammar Drills (4m) + Voice Crucible corto (3m).' },
        { block: '46–50 min', phase: 'Exit Ticket & Power Sheet', desc: 'Verificación oral/escrita de salida (60s) y descarga/entrega de Power Sheet de 1 hoja para refuerzo en casa.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Vocab Sprint', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Sentence Builder', minutes: 4 },
        { step: 3, type: 'listening', title: 'Audio Lab', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'Grammar Drills', minutes: 4 },
        { step: 5, type: 'voice_crucible', title: 'Voice Check', minutes: 3 }
      ]
    },
    'functional-spatial': {
      id: 'functional-spatial',
      name: 'Modularidad MCER-B: Espacios, Formularios & Funciones Transaccionales',
      focus: 'Comunicación situacional real (direcciones, mapas, formularios, precios, citas y solicitudes) con doble entorno ciudadano + industrial.',
      totalMinutes: 50,
      onlineDuoMinutes: 17,
      phases: [
        { block: '00–05 min', phase: 'Audio Real Flash', desc: 'Escucha breve de situación cotidiana/corporativa sin subtítulos para activar comprensión global.' },
        { block: '05–15 min', phase: 'Modelado Visual (+ Slides/Mapa)', desc: 'Disección de documento real, dirección postal o plano con marcadores funcionales y cortesía estadounidense.' },
        { block: '15–28 min', phase: 'Simulación Information Gap', desc: 'Trabajo en parejas con hojas A/B complementarias: llenar formularios, dictar direcciones o trazar rutas sin mostrar su hoja.' },
        { block: '28–45 min', phase: 'Reto Online Duolingo (17 min)', desc: 'Énfasis en comprensión auditiva (5m), Vocab Sprint (3m), Sentence Builder (5m) y Situational Drills (4m).' },
        { block: '45–50 min', phase: 'Exit Ticket & Power Sheet', desc: 'Cotejo rápido del formulario o mapa y entrega del Power Sheet de 1 hoja con mapa/guía de bolsillo.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Vocab Sprint', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Sentence Builder', minutes: 5 },
        { step: 3, type: 'listening', title: 'Audio Lab', minutes: 5 },
        { step: 4, type: 'grammar_drills', title: 'Functional Drills', minutes: 4 }
      ]
    },
    'communicative-crucible': {
      id: 'communicative-crucible',
      name: 'Modularidad MCER-C: Talleres Comunicativos & Crisol Oral de Unidad',
      focus: 'Integración oral/escrita bajo escenarios EAQUALS reales (negociación, emergencias, auditorías, retrospectivas) y Boss Crucible.',
      totalMinutes: 50,
      onlineDuoMinutes: 20,
      phases: [
        { block: '00–05 min', phase: 'Briefing de Escenario', desc: 'Planteamiento del caso técnico/real (incidente, auditoría, junta o negociación) y asignación de roles.' },
        { block: '05–12 min', phase: 'Calibración Discursiva', desc: 'Activación rápida de marcadores conversacionales, tonos diplomáticos y expresiones nativas.' },
        { block: '12–27 min', phase: 'Roleplay en Tríadas con Rúbrica', desc: 'Dos rondas cronometradas (Ingeniero + Contraparte + Observador con rúbrica de 3 criterios) y retroalimentación entre pares.' },
        { block: '27–47 min', phase: 'Reto Online Duolingo & Boss Crucible (20 min)', desc: 'Ejecución de los 5 micro-pasos incluyendo Audio Lab (4m), Grammar (4m), Writing Check (4m) y Voice Crucible Boss (5m).' },
        { block: '47–50 min', phase: 'Debrief & Power Sheet Maestro', desc: 'Retroalimentación final, registro de XP/acreditación y descarga del Power Sheet integrador de 1 hoja.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Vocab Sprint', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Sentence Builder', minutes: 4 },
        { step: 3, type: 'listening', title: 'Audio Lab', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'Synthesis Drills', minutes: 4 },
        { step: 5, type: 'voice_crucible', title: 'Voice Crucible Boss', minutes: 5 }
      ]
    }
  };

  function makeFormula(subj, op1, verb, op2, comp, examplesHtml) {
    return `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:6px;"><span class="mcer-formula-chip subject">${subj}</span><span class="mcer-formula-chip operator">${op1}</span><span class="mcer-formula-chip verb">${verb}</span><span class="mcer-formula-chip operator">${op2}</span><span class="mcer-formula-chip complement">${comp}</span></div><div style="font-size:0.78rem;color:#475569;font-family:var(--font-mono);">${examplesHtml}</div>`;
  }

  function makeSlideDeck(cls) {
    if (!cls.hasSlides) return [];
    return [
      { n: 1, kind: 'cover', title: cls.title, subtitle: cls.titleES, badge: `${cls.level} · ${cls.id.toUpperCase()} · 50 min`, canDo: cls.canDo, industryTag: cls.industryContext },
      { n: 2, kind: 'hook', title: 'Situación Real & Gancho Inicial', context: cls.warmupPrompt, comparisonWrong: cls.commonMistake.bad, comparisonRight: cls.commonMistake.good, note: cls.commonMistake.exp },
      { n: 3, kind: 'formula', title: 'Fórmula Visual Inductiva', formulaHtml: cls.grammarFormulaHtml, explanationES: cls.explanationES, goldenRule: cls.goldenRuleES },
      { n: 4, kind: 'vocab', title: 'Léxico Clave & Acento Prosódico', items: cls.vocab.slice(0, 6) },
      { n: 5, kind: 'dialogue', title: 'Diálogo Modelado en Contexto', lines: cls.dialogue, falseCognate: cls.falseCognate },
      { n: 6, kind: 'activity', title: 'Reto en Aula (13 min) & Salto a Duolingo (18 min)', activityTitle: cls.classroomActivity.title, steps: cls.classroomActivity.steps, duoMinutes: cls.onlinePracticeMinutes }
    ];
  }

  function hydrateClass(raw) {
    const modMeta = MODULARITY_TEMPLATES[raw.modularity] || MODULARITY_TEMPLATES['grammar-inductive'];
    const c = Object.assign({
      durationMinutes: 50,
      onlinePracticeMinutes: modMeta.onlineDuoMinutes,
      accreditedHours: raw.level === 'A1' || raw.level === 'A2' ? 3.0 : (raw.level === 'C1-C2' ? 3.5 : 3.75),
      xp: raw.level === 'A1' || raw.level === 'A2' ? 280 : 350,
      modularityMeta: modMeta,
      instructionalPhases: modMeta.phases,
      duoSteps: modMeta.duoSteps
    }, raw);
    c.slidesDeck = makeSlideDeck(c);
    return c;
  }

  const RAW_CLASSES = [
    // =========================================================================
    // NIVEL A1 — 20 CLASES MODULARES (a1-c01 .. a1-c20)
    // =========================================================================
    {
      id: 'a1-c01', unitId: 'a1-u1', level: 'A1', classNum: 1, coreType: 'CORE', eaqualsRef: '#7, #56, #125',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Verb "to be" (Affirmative) & Subject Pronouns',
      titleES: 'Verbo To Be (Afirmativo) y Pronombres Personales',
      grammarFocus: 'Subject pronouns (I, you, he, she, it, we, they) + am / is / are + contractions',
      canDo: 'Presentarte en inglés diciendo tu nombre, rol u ocupación sin omitir el sujeto.',
      industryContext: 'Onboarding de técnicos e ingenieros y credenciales en caseta.',
      warmupPrompt: 'Observa: "¿Por qué en inglés es incorrecto decir *Am Carlos*?" Descubrimos por qué el sujeto siempre viaja con el verbo.',
      grammarFormulaHtml: makeFormula('Sujeto (I/You/He/She/It/We/They)', '+', 'am / is / are', '+', 'Nombre / Rol / Origen', "<strong>I'm</strong> Alex. · <strong>She's</strong> a quality tech. · <strong>They're</strong> in Lab 2."),
      explanationES: '<strong>To be</strong> significa tanto <em>ser</em> como <em>estar</em>. Nunca omitas el pronombre sujeto (<code>I, he, it</code>). Usa <code>am</code> con <em>I</em>, <code>is</code> con <em>he/she/it</em>, y <code>are</code> con <em>you/we/they</em>.',
      goldenRuleES: 'En conversación americana usa siempre contracciones naturales: I\'m, you\'re, he\'s, she\'s, it\'s, we\'re, they\'re. Antes de una profesión singular añade <em>a/an</em>.',
      commonMistake: { bad: 'Is technician on Line 3. / I am engineer.', good: "He's a technician on Line 3. / I'm an engineer.", exp: 'Nunca omitas "He/It", y recuerda usar "a/an" antes de ocupaciones en singular.' },
      falseCognate: { term: 'Introduce', mistake: 'Introducir una pieza', correct: 'Presentar a una persona', tip: 'Para presentar colegas usa "Let me introduce Ana"; para insertar piezas usa "Insert".' },
      vocab: [
        { en: 'Name', es: 'Nombre', ipa: '/neɪm/', pinkStress: 'NAME', example: 'My name is Valeria.', exampleES: 'Mi nombre es Valeria.' },
        { en: 'Technician', es: 'Técnico/a', ipa: '/tɛkˈnɪʃən/', pinkStress: 'tech-NI-cian', example: "He's a robotics technician.", exampleES: 'Él es técnico en robótica.' },
        { en: 'Engineer', es: 'Ingeniero/a', ipa: '/ˌɛndʒɪˈnɪr/', pinkStress: 'en-gi-NEER', example: "I'm a manufacturing engineer.", exampleES: 'Soy ingeniero de manufactura.' },
        { en: 'Team', es: 'Equipo de trabajo', ipa: '/tim/', pinkStress: 'TEAM', example: 'Welcome to our team.', exampleES: 'Bienvenido a nuestro equipo.' },
        { en: 'Badge', es: 'Credencial / Gafete', ipa: '/bædʒ/', pinkStress: 'BADGE', example: 'This is my security badge.', exampleES: 'Esta es mi credencial de seguridad.' },
        { en: 'Shift', es: 'Turno laboral', ipa: '/ʃɪft/', pinkStress: 'SHIFT', example: 'We are on the morning shift.', exampleES: 'Estamos en el turno matutino.' }
      ],
      dialogue: [
        { speaker: 'Mark', en: "Good morning! I'm Mark. Welcome to Northern Tech.", es: '¡Buenos días! Soy Mark. Bienvenida a Northern Tech.' },
        { speaker: 'Ana', en: "Nice to meet you. I'm Ana Silva, the new intern.", es: 'Mucho gusto. Soy Ana Silva, la nueva practicante.' },
        { speaker: 'Mark', en: "This is Luis. He's an engineer on Line 2.", es: 'Él es Luis. Es ingeniero en la Línea 2.' },
        { speaker: 'Ana', en: "Hello Luis! We're in the same morning shift.", es: '¡Hola Luis! Estamos en el mismo turno matutino.' }
      ],
      drills: [
        { q: 'Hello! I ___ Diana and he ___ Roberto.', opts: ['am / is', 'is / are', 'are / am', 'be / is'], ans: 0, exp: '"I" toma siempre "am"; "he" (3ª persona singular) toma "is".', socraticHint: 'Identifica la conjugación exacta de "to be" para I y para he.' },
        { q: 'Maria and Carlos work in QA. ___ on the first shift.', opts: ["They're", "He's", "We's", 'There'], ans: 0, exp: 'Para dos o más personas usamos el pronombre plural "they" + "are" = "They\'re".', socraticHint: 'Sustituye "Maria and Carlos" por un solo pronombre personal plural.' },
        { q: 'Which sentence is grammatically correct?', opts: ['He is an automation engineer.', 'Is automation engineer.', 'He are an engineer.', 'He have engineer.'], ans: 0, exp: 'Lleva sujeto explícito (He), verbo correcto (is) y artículo indefinido (an).', socraticHint: 'Recuerda no omitir el sujeto ni el artículo antes de profesión.' },
        { q: 'My badge is new. ___ blue and white.', opts: ["It's", "He's", 'They are', 'I am'], ans: 0, exp: 'Objetos en singular como "badge" usan el pronombre "it" → "It\'s".', socraticHint: 'Una credencial es una cosa singular.' }
      ],
      classroomActivity: {
        title: 'Speed Networking de Credenciales (Parejas → Tríos)',
        grouping: 'Parejas rotativas (2 min por ronda)',
        materials: 'Tarjetas de rol (Ingeniero, Técnico, Visitante, Estudiante) o Power Sheet A1-C01',
        steps: ['Cada alumno escribe en su tarjeta su nombre real y rol asignado.', 'Ronda 1: Se presentan en pareja usando contracciones ("I\'m...", "I\'m a/an...").', 'Ronda 2: Se unen dos parejas; cada alumno presenta al compañero ("This is... He\'s/She\'s...").']
      },
      powerSheet: {
        fillBlanks: [
          '1. Hi! I ___ a mechatronics student. (am / is)',
          '2. This is Sofia. She ___ from Mexicali. (is / are)',
          '3. Luis and I are colleagues. ___ are in Lab B. (We / They)',
          '4. That sensor is new. ___ is very fast. (It / He)'
        ],
        reorder: [
          'a / badge / is / security / This / .',
          "engineer / I'm / manufacturing / a / ."
        ],
        writePrompt: 'Escribe 2 oraciones presentándote a ti mismo y a un compañero usando I\'m y He\'s/She\'s:',
        answerKey: '1) am · 2) is · 3) We · 4) It | Orden: This is a security badge. / I\'m a manufacturing engineer.'
      }
    },
    {
      id: 'a1-c02', unitId: 'a1-u1', level: 'A1', classNum: 2, coreType: 'CORE', eaqualsRef: '#56, #60',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Verb "to be" (Negatives, Questions & Short Answers)',
      titleES: 'Verbo To Be: Negación, Preguntas y Respuestas Cortas',
      grammarFocus: "am not / isn't / aren't · Yes/No questions (Am/Is/Are + S?) · Wh- (Who, What, Where)",
      canDo: 'Confirmar o negar datos en recepción, responder preguntas sí/no y preguntar ubicación o identidad.',
      industryContext: 'Check-in en caseta de vigilancia y verificación de disponibilidad en piso.',
      warmupPrompt: 'Si un guardia te pregunta "Are you a visitor?", ¿por qué NO se debe contestar "Yes, I\'m"? ¡Descubramos la regla de inversión!',
      grammarFormulaHtml: makeFormula('Pregunta: Am / Is / Are', '+', 'Sujeto', '+', 'Complemento ?', "<strong>Are you</strong> ready? → Yes, <strong>I am</strong>. / No, <strong>I'm not</strong>. · She <strong>isn't</strong> here."),
      explanationES: 'Para negar con <em>to be</em> agrega <strong>not</strong>: <code>I\'m not</code>, <code>he/she/it isn\'t</code>, <code>we/you/they aren\'t</code>. Para preguntar, invierte el orden poniendo <code>Am/Is/Are</code> al inicio.',
      goldenRuleES: 'En respuestas cortas <strong>afirmativas</strong> NUNCA uses contracción ("Yes, I am", NO "Yes, I\'m"). En negativas sí puedes contraer ("No, he isn\'t").',
      commonMistake: { bad: "You are ready? — Yes, I'm.", good: 'Are you ready? — Yes, I am.', exp: 'Las preguntas invierten auxiliar y sujeto; las respuestas cortas afirmativas no se contraen.' },
      falseCognate: { term: 'Actually', mistake: 'Actualmente', correct: 'En realidad / De hecho', tip: 'Usa "Actually, I\'m not a visitor; I\'m staff" para aclarar un dato con cortesía.' },
      vocab: [
        { en: 'Visitor', es: 'Visitante', ipa: '/ˈvɪzɪtər/', pinkStress: 'VIS-i-tor', example: "I'm not a visitor; I'm an intern.", exampleES: 'No soy visitante; soy practicante.' },
        { en: 'Ready', es: 'Listo / Preparado', ipa: '/ˈrɛdi/', pinkStress: 'READ-y', example: 'Is the machine ready?', exampleES: '¿Está lista la máquina?' },
        { en: 'Available', es: 'Disponible', ipa: '/əˈveɪləbəl/', pinkStress: 'a-VAIL-a-ble', example: "He isn't available right now.", exampleES: 'Él no está disponible ahora.' },
        { en: 'Where', es: 'Dónde', ipa: '/wɛr/', pinkStress: 'WHERE', example: 'Where is the main office?', exampleES: '¿Dónde está la oficina principal?' },
        { en: 'Correct', es: 'Correcto', ipa: '/kəˈrɛkt/', pinkStress: 'cor-RECT', example: 'Is your email correct?', exampleES: '¿Es correcto tu correo?' },
        { en: 'Station', es: 'Estación / Puesto', ipa: '/ˈsteɪʃən/', pinkStress: 'STA-tion', example: "We aren't on Station 4 today.", exampleES: 'Hoy no estamos en la Estación 4.' }
      ],
      dialogue: [
        { speaker: 'Guard', en: 'Good morning. Are you a contractor?', es: 'Buenos días. ¿Eres contratista?' },
        { speaker: 'Elena', en: "No, I'm not. Actually, I'm a QA supervisor.", es: 'No. De hecho, soy supervisora de calidad.' },
        { speaker: 'Guard', en: 'Got it. Is Mark Reynolds here today?', es: 'Entendido. ¿Está Mark Reynolds hoy aquí?' },
        { speaker: 'Elena', en: "Yes, he is. He's in Office 204.", es: 'Sí, está en la oficina 204.' }
      ],
      drills: [
        { q: '___ the calibration lab open today? — No, it ___.', opts: ["Is / isn't", "Are / aren't", "Is / aren't", 'Am / not'], ans: 0, exp: '"The calibration lab" es singular (it) → pregunta con "Is", negación "isn\'t".', socraticHint: 'Un laboratorio es singular (equivale a it).' },
        { q: 'Are you on Line 1? — ___', opts: ['Yes, I am.', "Yes, I'm.", 'Yes, you are.', 'No, I am.'], ans: 0, exp: 'Respuesta corta afirmativa completa: "Yes, I am." (sin contracción).', socraticHint: 'Las respuestas cortas afirmativas nunca llevan apóstrofo.' },
        { q: '___ is your shift supervisor?', opts: ['Who', 'Where', 'What time', 'Are'], ans: 0, exp: '"Who" pregunta por identidad de una persona.', socraticHint: 'La respuesta esperada es un nombre propio.' },
        { q: 'Carlos and Ana ___ in the meeting; they are in the lab.', opts: ["aren't", "isn't", 'not are', "doesn't"], ans: 0, exp: 'Para sujeto plural "they" se usa "aren\'t".', socraticHint: 'Sujeto plural en negación con to be.' }
      ],
      classroomActivity: {
        title: 'Adivina el Puesto y Área ("5 Yes/No Questions")',
        grouping: 'Parejas frente a frente',
        materials: '6 roles en pizarrón o Power Sheet',
        steps: ['Alumno A elige mentalmente un puesto y ubicación (ej. Cleanroom Tech en Edificio B).', 'Alumno B solo puede hacer preguntas con Are you...? / Is it...? (máximo 5).', 'Al descubrirlo, invierten papeles enfocándose en respuestas cortas sin errores de contracción.']
      },
      powerSheet: {
        fillBlanks: [
          '1. ___ you the new logistics intern? — Yes, I ___.',
          "2. The printer ___ working; it is offline. (isn't / aren't)",
          '3. ___ is Tool Crib B? — It is on the first floor. (Where / Who)',
          "4. We ___ late; it is 6:55 AM! (aren't / isn't)"
        ],
        reorder: [
          'supervisor / Is / your / here / today / ?',
          "not / are / They / visitors / ."
        ],
        writePrompt: 'Escribe 1 pregunta con "Are/Is..." sobre tu escuela/empresa y respóndela en negativo:',
        answerKey: "1) Are, am · 2) isn't · 3) Where · 4) aren't | Orden: Is your supervisor here today? / They are not visitors."
      }
    },
    {
      id: 'a1-c03', unitId: 'a1-u1', level: 'A1', classNum: 3, coreType: 'CORE', eaqualsRef: '#8, #127, #167, #168',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Personal Info Forms, Spelling, Countries & Nationalities',
      titleES: 'Formularios Personales, Deletreo, Países y Nacionalidades',
      grammarFocus: 'Possessive adjectives (my, your, his, her, our, their) · Alphabet & @/dot · Origin & nationality forms',
      canDo: 'Completar formularios de registro con nombre, nacionalidad, puesto y correo deletreado por voz.',
      industryContext: 'Alta de credenciales HR, formularios de aeropuerto y acceso a portales corporativos.',
      warmupPrompt: 'Escucha el audio: ¿cuántos datos personales capturas cuando alguien deletrea "V-A-S-Q-U-E-Z" y dicta su correo?',
      grammarFormulaHtml: makeFormula('Adjetivo Posesivo (My/Your/His/Her/Their)', '+', 'Sustantivo (name/email/country)', '+', 'is / are + Dato', "<strong>My</strong> nationality is Mexican. · <strong>Her</strong> email is ana_liu@corp.us."),
      explanationES: 'Los adjetivos posesivos concuerdan con quien posee: <code>his</code> (de él), <code>her</code> (de ella), <code>our</code> (nuestro), <code>their</code> (de ellos). En correos lee <strong>@ = "at"</strong>, <strong>. = "dot"</strong>, <strong>_ = "underscore"</strong>.',
      goldenRuleES: 'Los países y nacionalidades SIEMPRE inician con mayúscula en inglés (<em>Mexico / Mexican, Germany / German, the US / American</em>). Nunca pongas "I am from Mexican"; usa "from + país" o "be + nacionalidad".',
      commonMistake: { bad: 'I am from Mexican. Her name is Carlos (para hombre).', good: "I am Mexican. / I'm from Mexico. His name is Carlos.", exp: '"from" exige país; la nacionalidad va sola tras to be. Para hombre usa "his".' },
      falseCognate: { term: 'Career', mistake: 'Carrera universitaria (título)', correct: 'Trayectoria profesional', tip: 'En formularios escolares usa "Major" o "Degree program" para tu ingeniería, no "Career".' },
      vocab: [
        { en: 'First / Last Name', es: 'Nombre / Apellido', ipa: '/fɜrst læst neɪm/', pinkStress: 'FIRST / LAST name', example: 'How do you spell your last name?', exampleES: '¿Cómo deletreas tu apellido?' },
        { en: 'Spell', es: 'Deletrear', ipa: '/spɛl/', pinkStress: 'SPELL', example: 'Please spell your company name.', exampleES: 'Por favor deletrea tu empresa.' },
        { en: 'Nationality', es: 'Nacionalidad', ipa: '/ˌnæʃəˈnælɪti/', pinkStress: 'na-tion-AL-i-ty', example: 'What is your nationality?', exampleES: '¿Cuál es tu nacionalidad?' },
        { en: 'Date of Birth (DOB)', es: 'Fecha de nacimiento', ipa: '/deɪt əv bɜrθ/', pinkStress: 'DATE of BIRTH', example: 'Write your date of birth here.', exampleES: 'Escribe tu fecha de nacimiento aquí.' },
        { en: 'Job Title / Major', es: 'Puesto / Carrera', ipa: '/dʒɑb ˈtaɪtəl/', pinkStress: 'JOB ti-tle', example: 'My major is industrial engineering.', exampleES: 'Mi carrera es ingeniería industrial.' },
        { en: 'Email Address', es: 'Correo electrónico', ipa: '/ˈimeɪl ˈædrɛs/', pinkStress: 'E-mail AD-dress', example: 'My email is juan dot perez at stemos dot org.', exampleES: 'Mi correo es juan punto perez arroba stemos punto org.' }
      ],
      dialogue: [
        { speaker: 'Clerk', en: 'Welcome! Could I have your full name and nationality?', es: '¡Bienvenido! ¿Me das tu nombre completo y nacionalidad?' },
        { speaker: 'Kenji', en: "Sure. I'm Kenji Sato, and I'm Japanese.", es: 'Claro. Soy Kenji Sato y soy japonés.' },
        { speaker: 'Clerk', en: 'How do you spell your last name, Mr. Sato?', es: '¿Cómo deletrea su apellido, Sr. Sato?' },
        { speaker: 'Kenji', en: "It's S-A-T-O. And my email is k.sato@tech-jp.com.", es: 'Es S-A-T-O. Y mi correo es k.sato@tech-jp.com.' }
      ],
      drills: [
        { q: 'Sofia comes from Brazil. ___ nationality is ___.', opts: ['Her / Brazilian', 'His / Brazil', 'She / Brazilian', 'Their / Brazilians'], ans: 0, exp: '"Sofia" requiere posesivo femenino "Her" y la nacionalidad "Brazilian" (con mayúscula).', socraticHint: 'Usa adjetivo posesivo antes de "nationality" + adjetivo gentilicio.' },
        { q: 'How do you read "m_lopez@plant.com" aloud?', opts: ['m underscore lopez at plant dot com', 'm line lopez arroba plant point com', 'm dash lopez at plant dot com', 'm slash lopez in plant period com'], ans: 0, exp: '_ es "underscore", @ es "at" y . es "dot".', socraticHint: 'Recuerda los nombres exactos de puntuación web en inglés.' },
        { q: 'Which question asks correctly about origin?', opts: ['Where are you from?', 'Where you are from?', 'From where you come?', 'What country you are?'], ans: 0, exp: 'La pregunta estándar es "Where are you from?" (preposición al final).', socraticHint: 'Orden: Wh-word + are + sujeto + from.' },
        { q: 'Mark and Sara work together. ___ department is Automation.', opts: ['Their', 'Her', 'Our', 'His'], ans: 0, exp: 'Para posesión de dos o más terceras personas se utiliza "Their".', socraticHint: 'Posesivo de "they".' }
      ],
      classroomActivity: {
        title: 'Registro en Recepción "Information Gap" (Sin Mostrar Hoja)',
        grouping: 'Parejas (Recepcionista A / Visitante Internacional B)',
        materials: 'Formulario en Power Sheet A1-C03 con 5 campos vacíos',
        steps: ['Alumno B asume identidad ficticia de proveedor internacional (nombre raro, país, correo con guion/punto).', 'Alumno A pregunta campo por campo ("How do you spell...", "What\'s your email?") y anota exacto.', 'Al final comparan ortografía letra por letra y cambian de rol.']
      },
      powerSheet: {
        fillBlanks: [
          '1. This is Elena. ___ major is Mechatronics. (Her / His)',
          "2. I'm from ___; I am German. (Germany / German)",
          '3. How do you ___ your first name? (spell / write)',
          '4. We are interns. ___ badges are blue. (Our / Their)'
        ],
        reorder: [
          'are / from / Where / you / ?',
          'is / date of birth / May 14 / My / .'
        ],
        writePrompt: 'Completa tus datos reales estilo formulario US: Full Name / Nationality / Major / Email:',
        answerKey: '1) Her · 2) Germany · 3) spell · 4) Our | Orden: Where are you from? / My date of birth is May 14.'
      }
    },
    {
      id: 'a1-c04', unitId: 'a1-u1', level: 'A1', classNum: 4, coreType: 'CORE', eaqualsRef: '#8, #131, #168, #172',
      modularity: 'functional-spatial', hasSlides: true,
      title: 'Addresses, Streets & Workplace Locations',
      titleES: 'Direcciones Postales, Calles y Ubicaciones',
      grammarFocus: 'Address order (# + Street + Apt/Suite + City, State + ZIP) · live / work + at / on / in',
      canDo: 'Dar, entender y verificar direcciones domiciliarias y de centros de trabajo usando at / on / in correctamente.',
      industryContext: 'Recepción de envíos logísticos, ubicación de parques industriales y registro domiciliario.',
      warmupPrompt: 'Compara: "Av. Reforma #450, Tijuana" vs "450 Reforma Ave, Tijuana". ¿Por qué el número va PRIMERO en inglés?',
      grammarFormulaHtml: makeFormula('Sujeto + live / work', '+', 'AT (# exacto) / ON (calle) / IN (ciudad)', '+', 'Dirección Postal', "It's <strong>at</strong> 450 Industrial Pkwy, Suite 3, <strong>in</strong> Mexicali, ZIP 21395."),
      explanationES: 'En inglés estadounidense el número exterior va <strong>antes</strong> del nombre de la calle (<code>450 Main St.</code>). Usa el triángulo espacial: <strong>AT</strong> para dirección completa con número, <strong>ON</strong> solo para el nombre de la calle/piso, y <strong>IN</strong> para colonia, ciudad o país.',
      goldenRuleES: 'Aprende las abreviaturas postales universales: <code>St.</code> (Street), <code>Ave.</code> (Avenue), <code>Blvd.</code> (Boulevard), <code>Rd.</code> (Road), <code>Pkwy.</code> (Parkway), <code>ZIP code</code> (código postal).',
      commonMistake: { bad: 'My factory is in 450 Lazaro Cardenas St. My direction is...', good: 'My factory is AT 450 Lazaro Cardenas St. My ADDRESS is...', exp: 'Usa "at" con número exacto; "direction" significa rumbo, ¡para domicilio se dice "address"!' },
      falseCognate: { term: 'Address vs Direction', mistake: 'Decir "My direction is 120..."', correct: 'Address = domicilio | Direction = instrucción/rumbo', tip: '"What is your home address?" = ¿Cuál es tu domicilio?; "Ask for directions" = pedir indicaciones de cómo llegar.' },
      vocab: [
        { en: 'Address', es: 'Dirección / Domicilio', ipa: '/ˈædrɛs/', pinkStress: 'AD-dress', example: 'What is the warehouse address?', exampleES: '¿Cuál es la dirección del almacén?' },
        { en: 'Street / Avenue', es: 'Calle / Avenida', ipa: '/strit / ˈævənu/', pinkStress: 'STREET / AV-e-nue', example: 'Our campus is on University Avenue.', exampleES: 'Nuestro campus está en Av. Universidad.' },
        { en: 'ZIP / Postal Code', es: 'Código postal', ipa: '/zɪp koʊd/', pinkStress: 'ZIP code', example: 'Please enter the 5-digit ZIP code.', exampleES: 'Por favor ingresa el código postal de 5 dígitos.' },
        { en: 'Building / Suite', es: 'Edificio / Oficina #', ipa: '/ˈbɪldɪŋ / swit/', pinkStress: 'BUILD-ing / SUITE', example: 'HR is in Building C, Suite 12.', exampleES: 'RH está en el Edificio C, Oficina 12.' },
        { en: 'Live / Work', es: 'Vivir / Trabajar', ipa: '/lɪv / wɜrk/', pinkStress: 'LIVE / WORK', example: 'I live in Saltillo and work at Plant 2.', exampleES: 'Vivo en Saltillo y trabajo en la Planta 2.' },
        { en: 'Industrial Park', es: 'Parque industrial', ipa: '/ɪnˈdʌstriəl pɑrk/', pinkStress: 'in-DUS-tri-al PARK', example: 'The company is inside Nelson Industrial Park.', exampleES: 'La empresa está dentro del Parque Industrial Nelson.' }
      ],
      dialogue: [
        { speaker: 'Courier', en: 'Hi! Is this MedTech Assembly? Where do I deliver this pallet?', es: '¡Hola! ¿Aquí es MedTech Assembly? ¿Dónde entrego esta tarima?' },
        { speaker: 'Clerk', en: "Yes, you're in the right place! What address is on the label?", es: 'Sí, estás en el lugar correcto. ¿Qué dirección dice la etiqueta?' },
        { speaker: 'Courier', en: 'It says 820 Innovation Parkway, Suite B, ZIP 21210.', es: 'Dice 820 Innovation Parkway, Suite B, CP 21210.' },
        { speaker: 'Clerk', en: "Perfect. We're at 820 Innovation Parkway. Receiving is on the second floor dock.", es: 'Perfecto. Estamos en 820 Innovation Parkway. Recibos está en el andén del segundo nivel.' }
      ],
      drills: [
        { q: 'Our aerospace plant is located ___ 1450 Skyway Boulevard, ___ Phoenix.', opts: ['at / in', 'in / at', 'on / at', 'at / on'], ans: 0, exp: '"at" va antes del número exacto (1450) y "in" antes de la ciudad (Phoenix).', socraticHint: 'Aplica la regla AT (punto/número exacto) vs IN (ciudad).' },
        { q: 'I live ___ Juarez Street, right across from the bank.', opts: ['on', 'at', 'to', 'from'], ans: 0, exp: 'Cuando mencionas la calle SIN número exterior se usa "on".', socraticHint: 'Calle sin número = superficie/línea → on.' },
        { q: 'Which word correctly asks for someone\'s street and city?', opts: ['What is your home address?', 'What is your home direction?', 'Where is your zip live?', 'How is your street?'], ans: 0, exp: 'Domicilio siempre es "address", jamás "direction".', socraticHint: 'Cuidado con el falso amigo de "dirección".' },
        { q: 'How do you write an address in American standard order?', opts: ['710 Oak Avenue, Apt 4, Austin, TX 78701', 'Oak Avenue #710, Austin TX, 78701 Apt 4', 'TX Austin, Oak Avenue 710', '78701 Apt 4 Oak Avenue 710'], ans: 0, exp: 'Formato US: Número + Calle + Interior/Suite + Ciudad, Estado + ZIP.', socraticHint: 'De lo más específico (número exterior) a lo más general (ZIP).' }
      ],
      classroomActivity: {
        title: 'Dictado Telefónico de Envíos & Tarjeta Postal',
        grouping: 'Parejas espalda con espalda (simulando llamada)',
        materials: 'Tarjetas de direcciones ciudad/planta + Power Sheet A1-C04',
        steps: ['Alumno A lee una dirección completa en voz alta (con Suite y ZIP) sin que B la vea.', 'Alumno B pide aclaración ("How do you spell that street?", "What\'s the ZIP code?") y escribe.', 'Comparan contra tarjeta original y redactan su propia dirección en formato estándar US.']
      },
      powerSheet: {
        fillBlanks: [
          '1. My family lives ___ Monterrey, Nuevo Leon. (in / on / at)',
          '2. The bank is ___ 250 Central Avenue. (at / in)',
          '3. Turn right ___ Pine Street. (on / in / at)',
          '4. Please write your shipping ___, not your phone. (address / direction)'
        ],
        reorder: [
          'ZIP code / is / Your / 78205 / .',
          'at / 900 / work / Technology Blvd / We / .'
        ],
        writePrompt: 'Escribe tu dirección escolar o laboral en orden estadounidense (Número + Calle + Ciudad + CP):',
        answerKey: '1) in · 2) at · 3) on · 4) address | Orden: Your ZIP code is 78205. / We work at 900 Technology Blvd.'
      }
    },
    {
      id: 'a1-c05', unitId: 'a1-u1', level: 'A1', classNum: 5, coreType: 'CORE', eaqualsRef: '#3, #5, #132',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Numbers 0–1000, Ages, Phone IDs & Telling the Time',
      titleES: 'Números, Edades, Teléfonos y Cómo Decir la Hora',
      grammarFocus: 'Cardinal numbers · Saying phone digits ("oh") · Age with "be" · O\'clock / half past / quarter to',
      canDo: 'Decir números de empleado, teléfonos, edades y horarios en reloj analógico y digital.',
      industryContext: 'Reloj checador, extensiones telefónicas internas y parámetros numéricos básicos.',
      warmupPrompt: '¿Por qué un hablante nativo dice "twenty-four" vs "two-four" o "oh" en un teléfono como 686-504-1900?',
      grammarFormulaHtml: makeFormula('What time is it?', '→', "It's + [hora] / a quarter past / half past", '|', 'Edad: I am [num] years old', "It's <strong>a quarter to</strong> eight (7:45). · My extension is <strong>four-oh-two</strong>."),
      explanationES: 'Para la edad usa <strong>to be</strong> (<code>I\'m 20 years old</code>, nunca <em>I have</em>). Para el cero en teléfonos e IDs se pronuncia <strong>"oh"</strong>. Para horas usa <code>o\'clock</code> (en punto), <code>quarter past</code> (:15), <code>half past</code> (:30), <code>quarter to</code> (:45) o dígitos directos (<code>nine forty-five</code>).',
      goldenRuleES: 'Distingue el acento entre <code>thir-TEEN</code> (13) y <code>THIR-ty</code> (30) o <code>fif-TEEN</code> (15) vs <code>FIF-ty</code> (50) al dictar cantidades por radio o llamada.',
      commonMistake: { bad: 'I have 19 years. / Is the three and half.', good: "I'm 19 years old. / It's half past three (3:30).", exp: 'Edad siempre con verbo "to be"; la hora lleva sujeto "It\'s" y antepone "half past" o minutos.' },
      falseCognate: { term: 'Schedule vs Reunion', mistake: 'Decir "I have a reunion at 2"', correct: 'Meeting = junta | Reunion = reencuentro familiar/egresados', tip: 'En oficina o planta una junta de trabajo siempre es a "meeting".' },
      vocab: [
        { en: 'Quarter past / to', es: 'Y cuarto / Para las...', ipa: '/ˈkwɔrtər pæst/', pinkStress: 'QUAR-ter past', example: "It's a quarter to seven (6:45).", exampleES: 'Son un cuarto para las siete.' },
        { en: 'Half past', es: 'Y media', ipa: '/hæf pæst/', pinkStress: 'HALF past', example: 'Our break starts at half past ten.', exampleES: 'Nuestro descanso empieza a las diez y media.' },
        { en: 'Phone Number', es: 'Número telefónico', ipa: '/foʊn ˈnʌmbər/', pinkStress: 'PHONE num-ber', example: 'My phone number is 555-0192.', exampleES: 'Mi número telefónico es 555-0192.' },
        { en: 'Extension', es: 'Extensión interna', ipa: '/ɪkˈstɛnʃən/', pinkStress: 'ex-TEN-sion', example: 'Call extension 308 for IT support.', exampleES: 'Llama a la extensión 308 para soporte TI.' },
        { en: 'Age', es: 'Edad', ipa: '/eɪdʒ/', pinkStress: 'AGE', example: 'Our team members are 19 to 25 years old.', exampleES: 'Nuestro equipo tiene entre 19 y 25 años.' },
        { en: 'Sharp / On Time', es: 'En punto / Puntual', ipa: '/ʃɑrp/', pinkStress: 'SHARP', example: 'Shift 1 begins at 7:00 AM sharp.', exampleES: 'El Turno 1 comienza a las 7:00 AM en punto.' }
      ],
      dialogue: [
        { speaker: 'Sara', en: 'Excuse me, do you have the time, please?', es: 'Disculpa, ¿tienes la hora, por favor?' },
        { speaker: 'Leo', en: "Sure! It's a quarter past eight. The lab opens at 8:30.", es: '¡Claro! Son las ocho y cuarto. El lab abre a las 8:30.' },
        { speaker: 'Sara', en: "Thanks. What's the IT desk extension number?", es: 'Gracias. ¿Cuál es el número de extensión de TI?' },
        { speaker: 'Leo', en: "It's 4-0-9 (four-oh-nine), and the emergency line is 911.", es: 'Es 4-0-9, y la línea de emergencia es 911.' }
      ],
      drills: [
        { q: 'How do you say "7:45" using traditional English time expressions?', opts: ["It's a quarter to eight.", "It's a quarter past eight.", "It's half past seven.", "It's seven o'clock."], ans: 0, exp: 'Faltan 15 minutos ("a quarter") para las 8 ("to eight").', socraticHint: 'Cuenta los minutos que faltan para la siguiente hora.' },
        { q: 'My younger brother ___ 18 years old and ___ at Tech High.', opts: ['is / is', 'has / is', 'are / has', 'is / are'], ans: 0, exp: 'Tanto edad como ubicación usan "is" en 3ª persona singular.', socraticHint: 'Edad en inglés = to be, no to have.' },
        { q: 'Which pair sounds clearly distinct in stress: 15 vs 50?', opts: ['fif-TEEN vs FIF-ty', 'FIF-teen vs fif-TY', 'both on last syllable', 'both on first syllable'], ans: 0, exp: '-teen acentúa al final (fif-TEEN); las decenas -ty acentúan al inicio (FIF-ty).', socraticHint: 'Recuerda dónde cae la sílaba fuerte en -teen vs -ty.' },
        { q: 'What is the natural way to say phone digit "0" in 502-0140?', opts: ['oh', 'nought', 'void', 'zip'], ans: 0, exp: 'En EE. UU., el cero en teléfonos, habitaciones y años se lee como "oh".', socraticHint: 'Suena igual que la letra O.' }
      ],
      classroomActivity: {
        title: 'Bingo Auditivo de Horarios, IDs y Extensiones',
        grouping: 'Parejas + dictado grupal del docente (13 min)',
        materials: 'Cuadrícula de 9 relojes/teléfonos en pizarrón o cuaderno',
        steps: ['Docente dicta 6 horas y números con contraste -teen/-ty (ej. 14 vs 40, quarter to 9).', 'En parejas verifican sus respuestas en inglés ("Is extension 215 or 250?").', 'Cada alumno redacta 3 líneas: su edad, hora de entrada a clase y extensión/teléfono ficticio.']
      },
      powerSheet: {
        fillBlanks: [
          '1. What ___ is it? — It is half ___ nine (9:30).',
          '2. How ___ is your mentor? — He ___ 34 years old.',
          '3. The safety briefing starts ___ 07:00 AM. (at / on)',
          '4. Pronounce 30 vs 13: THIR-ty vs thir-___. (-ty / -teen)'
        ],
        reorder: [
          'extension / What / your / number / is / ?',
          'a quarter / It / ten / to / is / .'
        ],
        writePrompt: 'Escribe en palabras la hora actual, tu edad y la hora de tu clase:',
        answerKey: '1) time, past · 2) old, is · 3) at · 4) -teen | Orden: What is your extension number? / It is a quarter to ten.'
      }
    },
    {
      id: 'a1-c06', unitId: 'a1-u2', level: 'A1', classNum: 6, coreType: 'CORE', eaqualsRef: '#170, #171, #194',
      modularity: 'functional-spatial', hasSlides: true,
      title: 'Places in Town, Campus & Facility Map',
      titleES: 'Lugares en la Ciudad, Campus y Áreas del Complejo',
      grammarFocus: 'Singular & plural place nouns · Where is the [place]? · Prepositions: near, next to, across from',
      canDo: 'Identificar y nombrar lugares esenciales de la ciudad, campus universitario y complejo industrial.',
      industryContext: 'Orientación de recién llegados entre ciudad (banco, farmacia, hotel) y edificio/planta.',
      warmupPrompt: 'Cuando viajas a otra ciudad por capacitación, ¿qué 6 lugares necesitas ubicar desde el día 1?',
      grammarFormulaHtml: makeFormula('Where is the [place]?', '→', "It's + [near / across from / next to]", '+', 'the [landmark]', "Where's the <strong>pharmacy</strong>? → It's <strong>across from</strong> the main <strong>bank</strong>."),
      explanationES: 'Agrupa los lugares en dos mapas: <strong>Ciudad</strong> (<em>bank, supermarket, hospital, pharmacy, bus station, airport, hotel, restaurant</em>) y <strong>Campus/Planta</strong> (<em>cafeteria, parking lot, lab, reception, restroom, security gate</em>). Usa <code>Where\'s the...?</code> para preguntar ubicación.',
      goldenRuleES: 'En inglés estadounidense se dice <strong>restroom</strong> (baño público/edificio), <strong>drugstore / pharmacy</strong> (farmacia), <strong>grocery store / supermarket</strong> (supermercado) y <strong>parking lot</strong> (estacionamiento).',
      commonMistake: { bad: 'Where is a bath? (en oficina) / In front the bank.', good: 'Where is the restroom? / Across from the bank.', exp: '"Bath" significa bañera; di "restroom". Usa "across from" (cruzando la calle) vs "in front of" (justo delante en el mismo lado).' },
      falseCognate: { term: 'Library', mistake: 'Librería (donde compras libros)', correct: 'Biblioteca', tip: 'Donde compras libros es "Bookstore"; donde estudias o consultas manuales prestados es "Library".' },
      vocab: [
        { en: 'Bank / Pharmacy', es: 'Banco / Farmacia', ipa: '/bæŋk / ˈfɑrməsi/', pinkStress: 'BANK / PHAR-ma-cy', example: 'The pharmacy is next to the bank.', exampleES: 'La farmacia está junto al banco.' },
        { en: 'Train / Bus Station', es: 'Estación de tren / autobús', ipa: '/ˈsteɪʃən/', pinkStress: 'STA-tion', example: 'Does this bus go to the central station?', exampleES: '¿Este autobús va a la estación central?' },
        { en: 'Cafeteria / Restroom', es: 'Comedor / Baño público', ipa: '/ˌkæfəˈtɪriə / ˈrɛstrum/', pinkStress: 'cafe-TE-ria / REST-room', example: 'The cafeteria is near the cleanroom lobby.', exampleES: 'La cafetería está cerca del vestíbulo del cuarto limpio.' },
        { en: 'Hospital / Clinic', es: 'Hospital / Enfermería', ipa: '/ˈhɑspɪtəl/', pinkStress: 'HOS-pi-tal', example: 'Plant clinic is in Building A.', exampleES: 'La enfermería de planta está en el Edificio A.' },
        { en: 'Supermarket / Hotel', es: 'Supermercado / Hotel', ipa: '/ˈsupərˌmɑrkɪt/', pinkStress: 'SU-per-mar-ket', example: 'The hotel is across from the supermarket.', exampleES: 'El hotel está frente al supermercado.' },
        { en: 'Parking Lot', es: 'Estacionamiento', ipa: '/ˈpɑrkɪŋ lɑt/', pinkStress: 'PARK-ing lot', example: 'Visitor parking lot is at Gate 1.', exampleES: 'El estacionamiento de visitas está en la Puerta 1.' }
      ],
      dialogue: [
        { speaker: 'Visitor', en: 'Excuse me, is there a pharmacy near the industrial park?', es: 'Disculpe, ¿hay una farmacia cerca del parque industrial?' },
        { speaker: 'Host', en: 'Yes! There is a pharmacy next to the bank on Main Street.', es: '¡Sí! Hay una farmacia junto al banco sobre Main Street.' },
        { speaker: 'Visitor', en: 'Great. And where is the campus cafeteria?', es: 'Genial. ¿Y dónde está la cafetería del campus?' },
        { speaker: 'Host', en: "It's across from the robotics lab, behind Building B.", es: 'Está cruzando frente al lab de robótica, detrás del Edificio B.' }
      ],
      drills: [
        { q: 'In an American plant or university, how do you ask politely for the bathroom?', opts: ['Where is the restroom?', 'Where is the bath?', 'Where is the library?', 'Where is the bookstore?'], ans: 0, exp: '"Restroom" es la forma educada estándar en lugares públicos y laborales en EE. UU.', socraticHint: 'No es "bath" (bañera).' },
        { q: 'You need medicine after work. Where do you go?', opts: ['pharmacy / drugstore', 'library', 'parking lot', 'warehouse'], ans: 0, exp: 'Farmacia = pharmacy o drugstore.', socraticHint: 'Lugar para surtir recetas.' },
        { q: 'The hotel is on one side of Oak St. and the bank is on the opposite side. The hotel is ___ the bank.', opts: ['across from', 'under', 'inside', 'between'], ans: 0, exp: '"Across from" indica enfrente cruzando una calle o pasillo.', socraticHint: 'Lado opuesto de la calle.' },
        { q: 'I want to borrow technical manuals without buying them. I go to the ___.', opts: ['library', 'bookstore', 'cafeteria', 'station'], ans: 0, exp: 'Library = biblioteca; bookstore = librería.', socraticHint: 'Cuidado con el falso amigo.' }
      ],
      classroomActivity: {
        title: 'Diseño Rápido de Mapa Dual (Ciudad + Parque Industrial)',
        grouping: 'Parejas (1 hoja cuadriculada / Power Sheet)',
        materials: 'Mapa de referencia con 8 bloques',
        steps: ['Cada pareja ubica 6 lugares clave (Hotel, Bank, Pharmacy, Bus Station, Cafeteria, Plant Lab) en un croquis de 3 cuadras.', 'Preguntan y responden 5 ubicaciones usando next to, behind, near, across from.', 'Intercambian croquis con otra pareja para validar lectura de mapa.']
      },
      powerSheet: {
        fillBlanks: [
          '1. Excuse me, where is the ___? I need aspirin. (pharmacy / library)',
          '2. The visitors ___ is next to Security Gate 1. (parking lot / restroom)',
          '3. The restaurant is ___ from the bus station. (across / between)',
          '4. Remember: a ___ sells books; a library lends them. (bookstore / hotel)'
        ],
        reorder: [
          'the / Where / cafeteria / is / campus / ?',
          'next to / is / The bank / supermarket / the / .'
        ],
        writePrompt: 'Describe 2 lugares cerca de tu escuela o trabajo usando next to y near:',
        answerKey: '1) pharmacy · 2) parking lot · 3) across · 4) bookstore | Orden: Where is the campus cafeteria? / The bank is next to the supermarket.'
      }
    },
    {
      id: 'a1-c07', unitId: 'a1-u2', level: 'A1', classNum: 7, coreType: 'CORE', eaqualsRef: '#6, #58, #171',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Giving & Asking for Simple Directions',
      titleES: 'Pedir y Dar Direcciones e Indicaciones de Ruta',
      grammarFocus: 'Imperatives for navigation (Go straight, Turn left/right, Walk 2 blocks) · How do I get to...?',
      canDo: 'Guiar paso a paso a una persona a pie o dentro de un edificio utilizando imperativos direccionales.',
      industryContext: 'Guiar visitantes/auditores desde recepción hasta oficinas, cafetería o parada de autobús.',
      warmupPrompt: 'Alguien se detiene frente a ti: "How do I get to the train station?" ¿Qué 3 verbos imperativos resuelven cualquier ruta?',
      grammarFormulaHtml: makeFormula('Verbo Imperativo (Go / Turn / Walk)', '+', 'Dirección (straight / left / right / two blocks)', '+', "It's on your left / right", "<strong>Go straight</strong> ahead, <strong>turn right</strong> at the corner. <strong>It's on your left.</strong>"),
      explanationES: 'Las indicaciones viales usan verbos en forma base sin sujeto: <code>Go straight ahead</code> (sigue derecho), <code>Turn left / right</code> (gira a la izquierda/derecha), <code>Cross the street</code> (cruza). Indica distancia con <code>Walk two blocks</code> o pisos con <code>Take the elevator to the 2nd floor</code>.',
      goldenRuleES: 'Para sonar amable al pedir ayuda inicia siempre con <strong>"Excuse me, how do I get to...?"</strong> o <strong>"Can you tell me the way to...?"</strong>.',
      commonMistake: { bad: 'Go straight for front. / Turn to the left.', good: 'Go straight ahead. / Turn left.', exp: 'Con "turn" no necesitas "to the"; di simplemente "Turn left" o "Turn right".' },
      falseCognate: { term: 'Block vs Quadra', mistake: 'Walk two squares', correct: 'Walk two blocks', tip: 'En ciudades americanas una "cuadra" o manzana urbana es siempre "block", nunca "square".' },
      vocab: [
        { en: 'Go straight ahead', es: 'Sigue derecho', ipa: '/ɡoʊ streɪt əˈhɛd/', pinkStress: 'go STRAIGHT a-HEAD', example: 'Go straight ahead for two blocks.', exampleES: 'Sigue derecho por dos cuadras.' },
        { en: 'Turn left / right', es: 'Gira a la izquierda / derecha', ipa: '/tɜrn lɛft / raɪt/', pinkStress: 'turn LEFT / RIGHT', example: 'Turn right at the traffic light.', exampleES: 'Gira a la derecha en el semáforo.' },
        { en: 'On the corner', es: 'En la esquina', ipa: '/ɑn ðə ˈkɔrnər/', pinkStress: 'on the COR-ner', example: 'The café is on the corner of Oak and 5th.', exampleES: 'El café está en la esquina de Oak y la 5ª.' },
        { en: 'Block', es: 'Cuadra / Manzana', ipa: '/blɑk/', pinkStress: 'BLOCK', example: 'The subway is one block from here.', exampleES: 'El metro está a una cuadra de aquí.' },
        { en: 'On your left / right', es: 'A tu izquierda / derecha', ipa: '/ɑn jʊr lɛft/', pinkStress: 'on your LEFT', example: 'Walk past reception; HR is on your left.', exampleES: 'Pasa recepción; RH está a tu izquierda.' },
        { en: 'Take the elevator / stairs', es: 'Toma el elevador / las escaleras', ipa: '/ˈɛləˌveɪtər/', pinkStress: 'EL-e-va-tor', example: 'Take the stairs to the second floor.', exampleES: 'Sube las escaleras al segundo piso.' }
      ],
      dialogue: [
        { speaker: 'Guest', en: 'Excuse me, how do I get to the Metro station?', es: 'Disculpa, ¿cómo llego a la estación del Metro?' },
        { speaker: 'Worker', en: 'Exit Gate 1 and go straight ahead for two blocks.', es: 'Sal por la Puerta 1 y sigue derecho dos cuadras.' },
        { speaker: 'Guest', en: 'Two blocks straight. Then left or right?', es: 'Dos cuadras derecho. ¿Luego izquierda o derecha?' },
        { speaker: 'Worker', en: "Turn left on Central Ave. The station is on the corner, on your right.", es: 'Gira a la izquierda en Av. Central. La estación está en la esquina, a tu derecha.' }
      ],
      drills: [
        { q: '___ to the end of the corridor and ___ left.', opts: ['Go / turn', 'Walks / turns', 'Going / turning', 'To go / to turn'], ans: 0, exp: 'Los imperativos en indicaciones usan el verbo en forma base sin sujeto.', socraticHint: 'Instrucción directa: verbo en forma simple.' },
        { q: 'Excuse me, how ___ get to the hospital?', opts: ['do I', 'I do', 'am I', 'are I'], ans: 0, exp: 'La pregunta funcional estándar es "How do I get to...?".', socraticHint: 'Necesitas el auxiliar "do" antes de "I".' },
        { q: 'Walk three ___ and stop at the red building.', opts: ['blocks', 'squares', 'addresses', 'corners'], ans: 0, exp: 'Cuadra urbana en inglés = block.', socraticHint: 'Falso amigo con "square".' },
        { q: 'The coffee shop is ___ the corner of 2nd Street and Pine.', opts: ['on', 'under', 'between', 'into'], ans: 0, exp: 'La preposición fija en inglés para "en la esquina" es "on the corner" (o "at the corner").', socraticHint: 'Se posa en el vértice de la calle: on.' }
      ],
      classroomActivity: {
        title: 'Blind Map Navigation (Información Faltante A/B)',
        grouping: 'Parejas (Mapa A vs Mapa B)',
        materials: 'Cuadrícula urbana/planta con calles nombradas',
        steps: ['Alumno A parte de "Main Gate" y pide indicaciones para llegar a 2 destinos secretos que solo B ve en su mapa.', 'B guía paso a paso ("Go straight 2 blocks, turn right...").', 'Cambian roles; verifican haber marcado el edificio exacto en el mapa.']
      },
      powerSheet: {
        fillBlanks: [
          '1. Excuse me, how ___ I get to the airport bus?',
          '2. Go ___ ahead and ___ right at the bank.',
          '3. Walk one ___ down Industrial Ave. (block / square)',
          '4. Building 4 is ___ your left, next to Parking B. (on / in)'
        ],
        reorder: [
          'turn / the corner / left / At / , / .',
          'two blocks / ahead / Go / straight / .'
        ],
        writePrompt: 'Escribe en 3 pasos cómo llegar desde la entrada de tu escuela/trabajo hasta la cafetería o salida:',
        answerKey: '1) do · 2) straight, turn · 3) block · 4) on | Orden: At the corner, turn left. / Go straight ahead two blocks.'
      }
    },
    {
      id: 'a1-c08', unitId: 'a1-u2', level: 'A1', classNum: 8, coreType: 'CORE', eaqualsRef: '#9, #64, #172',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Simple Present: Daily Routines & 3rd Person (-s/-es)',
      titleES: 'Presente Simple Afirmativo: Rutinas y 3ª Persona',
      grammarFocus: 'I/You/We/They + base verb · He/She/It + V-s/-es/-ies · Basic verbs (work, start, finish, have, go)',
      canDo: 'Describir tu rutina diaria, traslados y horarios habituales tanto tuyos como de un compañero.',
      industryContext: 'Rutinas de turno, inspecciones matutinas y jornada de estudio.',
      warmupPrompt: '¿Por qué decimos "I work at 7:00" pero "Carlos workS at 7:00"? Exploremos la regla de la -s en 3ª persona.',
      grammarFormulaHtml: makeFormula('Sujeto (I/We/They vs He/She/It)', '+', 'Verbo base / Verbo + -s/-es', '+', 'Rutina + Hora', "I <strong>check</strong> gauges at 7:00. · She <strong>checks</strong> logs at 8:00. · He <strong>has</strong> lunch at 12."),
      explanationES: 'El <strong>Presente Simple</strong> describe hábitos y verdades generales. Con <em>I, you, we, they</em> el verbo queda igual; con <strong>he, she, it</strong> añade <code>-s</code> (<em>works</em>), <code>-es</code> tras -s/-sh/-ch/-x/-o (<em>goes, watches, finishes</em>), <code>-ies</code> tras consonante+y (<em>studies</em>) y forma irregular <code>has</code>.',
      goldenRuleES: 'La <code>-s</code> de tercera persona singular es uno de los marcadores más vigilados en entrevistas y evaluaciones A1. ¡Pronúnciala siempre al hablar de un colega o máquina!',
      commonMistake: { bad: 'My supervisor work in morning shift. He haves a tablet.', good: 'My supervisor works the morning shift. He has a tablet.', exp: '3ª persona singular agrega -s; el verbo "have" cambia a "has", nunca "haves".' },
      falseCognate: { term: 'Resume (verb vs noun)', mistake: 'Confundir "resume" (reanudar) con resumen', correct: 'Summary = resumen | Resume (verb) = reanudar | Résumé = CV', tip: '"Line 2 resumes work at 1:00 PM" = la línea reanuda operación a la 1.' },
      vocab: [
        { en: 'Routine / Schedule', es: 'Rutina / Horario', ipa: '/ruˈtin / ˈskɛdʒul/', pinkStress: 'rou-TINE / SCHED-ule', example: 'My daily routine starts at 6:30 AM.', exampleES: 'Mi rutina diaria empieza a las 6:30 AM.' },
        { en: 'Start / Finish', es: 'Comenzar / Terminar', ipa: '/stɑrt / ˈfɪnɪʃ/', pinkStress: 'START / FIN-ish', example: 'The machine finishes each cycle in 20 seconds.', exampleES: 'La máquina termina cada ciclo en 20 segundos.' },
        { en: 'Take the bus / Drive', es: 'Tomar el camión / Manejar', ipa: '/teɪk ðə bʌs / draɪv/', pinkStress: 'TAKE / DRIVE', example: 'Ana takes the bus; Pedro drives to work.', exampleES: 'Ana toma el autobús; Pedro maneja al trabajo.' },
        { en: 'Lunch Break', es: 'Descanso para comer', ipa: '/lʌntʃ breɪk/', pinkStress: 'LUNCH break', example: 'We have a 30-minute lunch break at noon.', exampleES: 'Tenemos un descanso de comida de 30 min al mediodía.' },
        { en: 'Check / Inspect', es: 'Revisar / Inspeccionar', ipa: '/tʃɛk / ɪnˈspɛkt/', pinkStress: 'CHECK / in-SPECT', example: 'Every morning he checks the tire pressure.', exampleES: 'Cada mañana él revisa la presión de llantas.' },
        { en: 'Study / Practice', es: 'Estudiar / Practicar', ipa: '/ˈstʌdi/', pinkStress: 'STUD-y', example: 'She studies English after her shift.', exampleES: 'Ella estudia inglés después de su turno.' }
      ],
      dialogue: [
        { speaker: 'Leo', en: 'What does your sister do, Sofia?', es: '¿A qué se dedica tu hermana, Sofía?' },
        { speaker: 'Sofia', en: 'She works at an EV battery plant. Her shift starts at 7:00 AM.', es: 'Trabaja en una planta de baterías EV. Su turno inicia a las 7:00 AM.' },
        { speaker: 'Leo', en: 'Nice! Does she drive there?', es: '¡Qué bien! ¿Maneja hasta allá?' },
        { speaker: 'Sofia', en: 'Yes, she drives 20 minutes and gets home at 4:00 PM.', es: 'Sí, maneja 20 minutos y llega a casa a las 4:00 PM.' }
      ],
      drills: [
        { q: 'Every Tuesday, Engineer Garza ___ all pressure valves.', opts: ['inspects', 'inspect', 'inspecting', 'is inspect'], ans: 0, exp: '"Engineer Garza" = 3ª persona singular (he/she), requiere -s.', socraticHint: 'Sujeto singular + hábito frecuente.' },
        { q: 'My friend Elena ___ Engineering at UABC and ___ a part-time job.', opts: ['studies / has', 'studys / haves', 'study / has', 'studies / have'], ans: 0, exp: '"study" termina en consonante+y → "studies"; "have" en 3ª persona → "has".', socraticHint: 'Revisa las reglas especiales de -ies y have → has.' },
        { q: 'First shift operators ___ work at 07:00 and ___ at 15:30.', opts: ['start / finish', 'starts / finishes', 'start / finishes', 'starts / finish'], ans: 0, exp: '"operators" es plural (they), por lo que el verbo permanece en forma base sin -s.', socraticHint: '¿Es singular o plural "operators"?' },
        { q: 'The conveyor ___ automatically after each pallet.', opts: ['stops', 'stopes', 'stop', 'stopping'], ans: 0, exp: '"The conveyor" (it) añade una simple -s: "stops".', socraticHint: 'Solo 1 banda transportadora.' }
      ],
      classroomActivity: {
        title: 'Cadena "Same Routine, 3rd Person Report"',
        grouping: 'Tríos (A entrevista a B → C reporta)',
        materials: '5 verbos guía (wake up, commute, start, have lunch, finish)',
        steps: ['A pregunta a B sobre su rutina diaria en 3 minutos y anota horas.', 'A cambia de grupo y reporta la vida de B ante C usando exclusivamente 3ª persona ("Marco wakes up at 6, takes the bus...").', 'C anota cualquier falta de "-s" en checklist de pares.']
      },
      powerSheet: {
        fillBlanks: [
          '1. Every morning I ___ coffee and ___ to the lab. (have, go)',
          '2. Luis ___ at 6:30 and ___ the bus. (wake up, take)',
          '3. The CNC machine ___ at 5:00 PM. (finish)',
          '4. She ___ English for 30 minutes daily. (study)'
        ],
        reorder: [
          'at / starts / Her shift / 7:00 AM / .',
          'checks / The / every hour / technician / sensors / .'
        ],
        writePrompt: 'Escribe 3 oraciones de TU rutina y 2 de un familiar/colega usando -s/-es:',
        answerKey: '1) have, go · 2) wakes up, takes · 3) finishes · 4) studies | Orden: Her shift starts at 7:00 AM. / The technician checks sensors every hour.'
      }
    },
    {
      id: 'a1-c09', unitId: 'a1-u2', level: 'A1', classNum: 9, coreType: 'CORE', eaqualsRef: '#60, #64, #132, #152',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Simple Present Negatives, Questions, Frequency & Time (in/on/at)',
      titleES: 'Presente Simple Negativo/Preguntas, Frecuencia y Preposiciones de Tiempo',
      grammarFocus: "don't / doesn't + V · Do/Does + S + V? · Adverbs (always..never) · Prepositions at / on / in",
      canDo: 'Negar acciones habituales, formular preguntas de rutina, expresar frecuencia y usar at/on/in para horarios.',
      industryContext: 'Coordinación de turnos semanales, días de mantenimiento y reglas de frecuencia.',
      warmupPrompt: 'Observa el choque típico: "Does she works on Sunday?" ¿Por qué el verbo principal PIERDE la -s cuando llega "Does"?',
      grammarFormulaHtml: makeFormula('Do / Does + S', '+', 'Verbo BASE (¡sin -s!)', '|', 'Frecuencia: S + [always/never] + V (o be + [adverb])', "<strong>Does</strong> he <strong>work</strong> on Saturdays? · No, he <strong>doesn't</strong>. · We <strong>always</strong> meet <strong>on</strong> Monday <strong>at</strong> 8 AM."),
      explanationES: 'Al negar o preguntar con verbos normales usa <code>do/don\'t</code> (I/you/we/they) o <code>does/doesn\'t</code> (he/she/it) + verbo en <strong>forma base sin -s</strong>. Adverbios de frecuencia van <strong>antes</strong> del verbo principal (<em>always check</em>) pero <strong>después</strong> de <em>to be</em> (<em>am never late</em>). Tiempo: <strong>AT</strong> + hora, <strong>ON</strong> + día/fecha, <strong>IN</strong> + mes/parte del día.',
      goldenRuleES: '"Does/Doesn\'t" funciona como un imán que absorbe la -s de tercera persona; ¡nunca la pongas dos veces! Y recuerda: <em>at 7:00, on Monday, in the morning</em>.',
      commonMistake: { bad: "He doesn't works in Monday at the morning.", good: "He doesn't work ON Monday IN the morning.", exp: 'Quitamos -s tras "doesn\'t"; días van con ON y partes del día (excepto night) van con IN.' },
      falseCognate: { term: 'Eventually', mistake: 'Eventualmente (de vez en cuando)', correct: 'Finalmente / Con el tiempo', tip: 'Si quieres decir "de vez en cuando", usa "Occasionally" o "Sometimes", no "Eventually".' },
      vocab: [
        { en: 'Always / Never', es: 'Siempre / Nunca', ipa: '/ˈɔlweɪz / ˈnɛvər/', pinkStress: 'AL-ways / NEV-er', example: 'We always wear safety goggles.', exampleES: 'Siempre usamos lentes de seguridad.' },
        { en: 'Usually / Sometimes', es: 'Usualmente / A veces', ipa: '/ˈjuʒuəli / ˈsʌmtaɪmz/', pinkStress: 'U-su-al-ly / SOME-times', example: 'I sometimes stay until 6:00 PM.', exampleES: 'A veces me quedo hasta las 6:00 PM.' },
        { en: 'Weekday / Weekend', es: 'Entre semana / Fin de semana', ipa: '/ˈwikdeɪ / ˈwikˌɛnd/', pinkStress: 'WEEK-day / WEEK-end', example: 'Do you work on the weekend?', exampleES: '¿Trabajas el fin de semana?' },
        { en: 'In the morning / at night', es: 'En la mañana / En la noche', ipa: '/ɪn ðə ˈmɔrnɪŋ/', pinkStress: 'in the MOR-ning', example: 'Shift 3 starts at night.', exampleES: 'El Turno 3 comienza en la noche.' },
        { en: 'Monthly / Weekly', es: 'Mensual / Semanal', ipa: '/ˈmʌnθli/', pinkStress: 'MONTH-ly', example: 'We have a weekly audit on Fridays.', exampleES: 'Tenemos auditoría semanal los viernes.' },
        { en: 'Seldom / Rarely', es: 'Rara vez', ipa: '/ˈrɛrli/', pinkStress: 'RARE-ly', example: 'Line 1 rarely stops unexpectedly.', exampleES: 'La Línea 1 rara vez se detiene inesperadamente.' }
      ],
      dialogue: [
        { speaker: 'Maya', en: 'When does your robotics club meet?', es: '¿Cuándo se reúne tu club de robótica?' },
        { speaker: 'Diego', en: 'We usually meet on Wednesdays at 4:00 PM in Lab 3.', es: 'Usualmente nos reunimos los miércoles a las 4:00 PM en el Lab 3.' },
        { speaker: 'Maya', en: "Do you always stay late? My bus doesn't run after 7:00.", es: '¿Siempre se quedan tarde? Mi camión no pasa después de las 7:00.' },
        { speaker: 'Diego', en: "No, we don't! We finish on time at 5:30 PM.", es: '¡No! Terminamos puntual a las 5:30 PM.' }
      ],
      drills: [
        { q: 'Does the night supervisor ___ logs ___ Fridays?', opts: ['review / on', 'reviews / in', 'review / at', 'reviewing / on'], ans: 0, exp: '"Does" exige verbo base "review"; los días de la semana usan "on".', socraticHint: 'Recuerda: imán Does quita la -s + día = on.' },
        { q: 'Technicians ___ calibrate sensors before starting.', opts: ['always check and', 'check always and', 'always checks', 'are always check'], ans: 0, exp: 'Con verbo plural (they) el adverbio va ANTES del verbo base.', socraticHint: 'Posición de "always" con verbos normales.' },
        { q: 'My plant doesn\'t ___ on Christmas Day.', opts: ['operate', 'operates', 'operating', 'to operate'], ans: 0, exp: 'Después de "doesn\'t" va el verbo en forma base.', socraticHint: 'Auxiliar negativo absorbe la conjugación.' },
        { q: 'Choose the right time prepositions: "Shift starts ___ 07:00 AM, ___ the morning, ___ July."', opts: ['at / in / in', 'on / at / in', 'at / on / on', 'in / in / at'], ans: 0, exp: 'at + hora, in + the morning, in + mes.', socraticHint: 'AT hora · ON día · IN periodo largo/mes.' }
      ],
      classroomActivity: {
        title: 'Entrevista "Find Someone Who Never..." (Bingo en Aula)',
        grouping: 'Circulación rápida (8–10 min) + síntesis en parejas',
        materials: '6 ítems de frecuencia en Power Sheet',
        steps: ['Alumnos circulan haciendo preguntas completas ("Do you ever work on Sundays?", "Do you study at night?").', 'Deben escuchar y responder con frecuencia real usando always/usually/sometimes/never.', 'Regresan a su lugar y resumen 2 hábitos encontrados usando doesn\'t y never.']
      },
      powerSheet: {
        fillBlanks: [
          '1. ___ your partner live near the campus? (Do / Does)',
          "2. No, he ___ work in the evening; he works ___ the morning. (doesn't, in)",
          '3. We have team briefings ___ Mondays ___ 8:15 AM. (on, at)',
          '4. Place "never": Operators _____ bypass _____ safety locks. (before verb)'
        ],
        reorder: [
          'does / time / the class / What / finish / ?',
          "don't / Sundays / on / usually / work / We / ."
        ],
        writePrompt: 'Escribe 2 cosas que SIEMPRE haces los lunes y 1 cosa que NUNCA haces en clase/planta:',
        answerKey: "1) Does · 2) doesn't, in · 3) on, at · 4) Operators never bypass safety locks. | Orden: What time does the class finish? / We usually don't work on Sundays."
      }
    },
    {
      id: 'a1-c10', unitId: 'a1-u2', level: 'A1', classNum: 10, coreType: 'CORE', eaqualsRef: '#47, #86, #190, #191, #195',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Likes/Dislikes (-ing), Family, Hobbies & Basic Connectors',
      titleES: 'Gustos (+ -ing), Familia, Pasatiempos y Conectores (and/but/or/because)',
      grammarFocus: 'love / like / enjoy / hate + V-ing · and / but / or / because · Family & leisure lexis',
      canDo: 'Hablar de tu familia, pasatiempos y preferencias laborales uniendo ideas con and, but, or y because.',
      industryContext: 'Small talk profesional con colegas remotos de EE. UU. / Canadá y entrevistas iniciales.',
      warmupPrompt: 'En español decimos "Me gusta diseñar circuitos" (infinitivo); ¿por qué en inglés suena tan natural "I enjoy designING circuits"?',
      grammarFormulaHtml: makeFormula('I / She + like / love / hate', '+', 'Verbo-ing / Sustantivo', '+', 'and / but / or / because + Cláusula', "I <strong>love coding</strong> <strong>and</strong> robotics, <strong>but</strong> I hate waiting <strong>because</strong> it wastes time."),
      explanationES: 'Después de verbos de preferencia (<code>love, like, enjoy, don\'t like, hate</code>) usa <strong>verbo + -ing</strong> (gerundio sustantivado) o un sustantivo. Une dos ideas con <strong>and</strong> (suma), <strong>but</strong> (contraste), <strong>or</strong> (opción) y <strong>because</strong> (causa/razón).',
      goldenRuleES: 'Para responder a "¿Por qué te gusta esto?" empieza directamente con <strong>"Because..."</strong> sin olvidar poner sujeto y verbo después (*Because it is useful*, nunca *Because useful*).',
      commonMistake: { bad: "I don't like wait for buses. I like CAD because useful.", good: "I don't like waiting for buses. I like CAD because it's useful.", exp: 'Verbos de preferencia piden "-ing"; toda cláusula tras "because" requiere sujeto + verbo.' },
      falseCognate: { term: 'Parents vs Relatives', mistake: 'Decir "My parents" para tíos o primos', correct: 'Parents = papá y mamá | Relatives = parientes/familiares', tip: 'Si quieres incluir abuelos, tíos o primos di "my family" o "my relatives".' },
      vocab: [
        { en: 'Parents / Siblings', es: 'Padres / Hermanos(as)', ipa: '/ˈpɛrənts / ˈsɪblɪŋz/', pinkStress: 'PAR-ents / SIB-lings', example: 'I have two sisters and one brother.', exampleES: 'Tengo dos hermanas y un hermano.' },
        { en: 'Married / Single', es: 'Casado(a) / Soltero(a)', ipa: '/ˈmɛrid / ˈsɪŋɡəl/', pinkStress: 'MAR-ried / SIN-gle', example: "She's married and has two kids.", exampleES: 'Ella está casada y tiene dos hijos.' },
        { en: 'Hobby / Free Time', es: 'Pasatiempo / Tiempo libre', ipa: '/ˈhɑbi/', pinkStress: 'HOB-by', example: 'My favorite hobby is fixing bikes.', exampleES: 'Mi pasatiempo favorito es reparar bicicletas.' },
        { en: 'Enjoy / Hate', es: 'Disfrutar / Odiar', ipa: '/ɪnˈdʒɔɪ / heɪt/', pinkStress: 'en-JOY / HATE', example: 'I enjoy solving math puzzles.', exampleES: 'Disfruto resolver acertijos matemáticos.' },
        { en: 'Because / But', es: 'Porque / Pero', ipa: '/bɪˈkɔz / bʌt/', pinkStress: 'be-CAUSE', example: 'I like automation because it improves safety.', exampleES: 'Me gusta la automatización porque mejora la seguridad.' },
        { en: 'Travel / Sports', es: 'Viajar / Deportes', ipa: '/ˈtrævəl / spɔrts/', pinkStress: 'TRAV-el / SPORTS', example: 'On weekends we love playing soccer.', exampleES: 'Los fines de semana amamos jugar fútbol.' }
      ],
      dialogue: [
        { speaker: 'Chris', en: 'So Mia, what do you enjoy doing in your free time?', es: 'Entonces Mia, ¿qué disfrutas hacer en tu tiempo libre?' },
        { speaker: 'Mia', en: 'I love swimming and building drones, because I enjoy hands-on tech!', es: 'Amo nadar y armar drones, ¡porque disfruto la tecnología práctica!' },
        { speaker: 'Chris', en: 'Cool! Do you have a big family?', es: '¡Genial! ¿Tienes una familia grande?' },
        { speaker: 'Mia', en: 'Not really. I have one brother and my parents live in Puebla, but I call them every Sunday.', es: 'No tanto. Tengo un hermano y mis padres viven en Puebla, pero les llamo cada domingo.' }
      ],
      drills: [
        { q: 'I love ___ Python scripts, ___ I hate ___ long reports.', opts: ['writing / but / typing', 'write / because / type', 'to writing / but / typing', 'writing / or / to type'], ans: 0, exp: 'love/hate + V-ing + contraste "but".', socraticHint: 'Dos acciones opuestas con preferencia en -ing.' },
        { q: 'He goes to bed early ___ his shift starts at 6:00 AM.', opts: ['because', 'but', 'or', 'so that'], ans: 0, exp: '"Because" introduce la razón/causa de irse a dormir temprano.', socraticHint: 'Causa o motivo.' },
        { q: 'Wait — your aunt and uncle are not your "parents"; they are your ___.', opts: ['relatives', 'parents', 'colleagues', 'coworkers'], ans: 0, exp: '"Parents" se limita únicamente a padre y madre.', socraticHint: 'Falso amigo con "parientes".' },
        { q: 'Do you prefer working mornings ___ afternoons?', opts: ['or', 'because', 'but', 'and not'], ans: 0, exp: '"or" conecta dos alternativas excluyentes en preguntas.', socraticHint: 'Opción entre A o B.' }
      ],
      classroomActivity: {
        title: 'Icebreaker "2 Truths + 1 Connector" en Parejas',
        grouping: 'Parejas + rotación',
        materials: 'Tarjetas con and / but / because',
        steps: ['Cada estudiante redacta 3 frases sobre su familia y gustos: 1 debe usar "because" y 1 "but".', 'En parejas intercambian y el compañero hace 1 pregunta de seguimiento ("Why do you hate...?").', '2 voluntarios comparten una frase memorable en plenario.']
      },
      powerSheet: {
        fillBlanks: [
          '1. Carlos enjoys ___ 3D CAD models. (design / designing)',
          '2. I live with my ___ (mom & dad) and two sisters. (parents / relatives)',
          '3. I like math ___ physics, ___ I don\'t like chemistry. (and, but)',
          '4. She takes the train ___ she doesn\'t have a car. (because / or)'
        ],
        reorder: [
          'swimming / on / loves / Saturdays / My brother / .',
          'because / I / coding / creative / enjoy / it is / .'
        ],
        writePrompt: 'Presenta a tu familia en 1 frase y 1 hobby que disfrutas (+ because):',
        answerKey: '1) designing · 2) parents · 3) and, but · 4) because | Orden: My brother loves swimming on Saturdays. / I enjoy coding because it is creative.'
      }
    },
    {
      id: 'a1-c11', unitId: 'a1-u3', level: 'A1', classNum: 11, coreType: 'CORE', eaqualsRef: '#123, #131',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'There is / There are & Prepositions of Place',
      titleES: 'Existencia (There is/are) y Preposiciones de Lugar',
      grammarFocus: "There is / There isn't / Is there...? · There are / There aren't / Are there...? · in, on, under, next to, between, behind",
      canDo: 'Describir qué hay o no hay en un espacio físico e indicar la posición exacta de objetos y herramientas.',
      industryContext: 'Inventario en gavetas, cuartos de herramientas (Tool Crib) y escritorios.',
      warmupPrompt: 'Error #1 en hispanohablantes: traducir "Hay tres cajas" como *"Have three boxes"*. ¡Conoce la fórmula real con There is/are!',
      grammarFormulaHtml: makeFormula('There is (Singular) / There are (Plural)', '+', 'Objeto(s)', '+', 'Preposición (in/on/under/between) + Lugar', "<strong>There's</strong> a wrench <strong>on</strong> the bench. · <strong>Are there</strong> any goggles <strong>in</strong> the drawer?"),
      explanationES: 'Para expresar existencia ("hay") jamás uses <em>have</em>. Usa <code>There is</code> (singular o incontable) y <code>There are</code> (plural). En pregunta invierte: <code>Is there...?</code> / <code>Are there...?</code>. Preposiciones clave: <code>in</code> (dentro), <code>on</code> (encima), <code>under</code> (debajo), <code>between</code> (entre 2), <code>next to</code> (junto a), <code>behind</code> (detrás).',
      goldenRuleES: 'Con "There are" usa <strong>some</strong> en afirmativo ("There are some boxes") y <strong>any</strong> en negativo o pregunta ("Are there any sensors? / There aren\'t any").',
      commonMistake: { bad: 'In my classroom have 20 desks. / There are a toolbox.', good: 'There are 20 desks in my classroom. / There is a toolbox.', exp: 'Nunca uses "have" solo para "hay"; respeta concordancia singular ("is") vs plural ("are").' },
      falseCognate: { term: 'Cabinet / Shelf vs Folder', mistake: 'Confundir "carpeta" con "carpet"', correct: 'Folder = carpeta | Carpet = alfombra | Cabinet = gabinete', tip: '"Put the safety folders inside the metal cabinet" (nunca "inside the carpet").' },
      vocab: [
        { en: 'Toolbox / Storage Rack', es: 'Caja de herramientas / Anaquel', ipa: '/ˈtulbɑks / ræk/', pinkStress: 'TOOL-box / RACK', example: 'There is a red toolbox on the storage rack.', exampleES: 'Hay una caja de herramientas roja en el anaquel.' },
        { en: 'Drawer / Cabinet', es: 'Cajón / Gabinete', ipa: '/drɔr / ˈkæbɪnət/', pinkStress: 'DRAW-er / CAB-i-net', example: 'Check inside the top drawer.', exampleES: 'Revisa dentro del cajón superior.' },
        { en: 'Calipers / Wrench', es: 'Calibrador / Llave española', ipa: '/ˈkælɪpərz / rɛntʃ/', pinkStress: 'CAL-i-pers / WRENCH', example: 'The calipers are between the mat and the wrench.', exampleES: 'El calibrador está entre el tapete y la llave.' },
        { en: 'Under / Behind', es: 'Debajo de / Detrás de', ipa: '/ˈʌndər / bɪˈhaɪnd/', pinkStress: 'UN-der / be-HIND', example: 'The emergency exit is behind Shelf 4.', exampleES: 'La salida de emergencia está detrás del Estante 4.' },
        { en: 'Safety Goggles', es: 'Lentes de seguridad', ipa: '/ˈseɪfti ˈɡɑɡəlz/', pinkStress: 'SAFE-ty GOG-gles', example: 'Are there safety goggles by the door?', exampleES: '¿Hay lentes de seguridad junto a la puerta?' },
        { en: 'Spare Parts', es: 'Refacciones', ipa: '/spɛr pɑrts/', pinkStress: 'SPARE parts', example: 'There are spare parts in Box B.', exampleES: 'Hay refacciones en la Caja B.' }
      ],
      dialogue: [
        { speaker: 'Tom', en: 'Mateo, is there a digital multimeter in Tool Crib 1?', es: 'Mateo, ¿hay un multímetro digital en el Almacén 1?' },
        { speaker: 'Mateo', en: 'Yes, there is one on the middle shelf, next to the calipers.', es: 'Sí, hay uno en el estante de en medio, junto a los calibradores.' },
        { speaker: 'Tom', en: 'Great! Are there any spare fuses in the top drawer?', es: '¡Genial! ¿Hay fusibles de repuesto en el cajón superior?' },
        { speaker: 'Mateo', en: 'No, there aren\'t any here. Look in the box under the desk.', es: 'No, no hay ninguno aquí. Mira en la caja debajo del escritorio.' }
      ],
      drills: [
        { q: '___ a fire extinguisher on the wall, and ___ two emergency exits behind us.', opts: ['There is / there are', 'Have / there is', 'There are / there is', 'Is / are'], ans: 0, exp: '1 extintor → There is; 2 salidas → There are.', socraticHint: 'Singular vs plural al expresar existencia.' },
        { q: 'Place the laptop ___ the monitor and the printer.', opts: ['between', 'under of', 'on top', 'next'], ans: 0, exp: 'Entre dos objetos específicos se usa "between A and B".', socraticHint: 'En medio de dos cosas.' },
        { q: '___ any spare batteries in Cabinet C? — No, there aren\'t.', opts: ['Are there', 'Have there', 'Is there', 'There are'], ans: 0, exp: '"batteries" está en plural y es pregunta → "Are there".', socraticHint: 'Inversión para existencia plural.' },
        { q: 'Where are the folders? — They are ___ the desk, inside Drawer 2.', opts: ['in', 'between', 'across', 'behind to'], ans: 0, exp: 'Dentro de un cajón o gabinete cerrado se usa "in" / "inside".', socraticHint: 'Contenido en el interior de algo.' }
      ],
      classroomActivity: {
        title: 'Mesa de Trabajo Oculta ("Draw What You Hear")',
        grouping: 'Parejas (A dicta su estación / aula, B dibuja)',
        materials: 'Diagrama vacío de mesa con 3 estantes en Power Sheet',
        steps: ['A dibuja en secreto 4 objetos/herramientas en distintas posiciones (encima, debajo, entre, dentro).', 'A describe usando exclusivamente There is/are + preposiciones ("There are 2 laptops on the desk; there is a bottle under...").', 'B dibuja sin mirar y luego comparan ambos esquemas.']
      },
      powerSheet: {
        fillBlanks: [
          '1. ___ is a white board in front of the class. (There / Have)',
          '2. ___ there any safety glasses in the locker? (Is / Are)',
          '3. The charger is ___ the keyboard and the mouse. (between / in)',
          "4. Look ___ the table; the cable fell on the floor. (under / inside)"
        ],
        reorder: [
          'on / two wrenches / There / Shelf 3 / are / .',
          'any / Is / ink / there / printer / in / the / ?'
        ],
        writePrompt: 'Describe 3 objetos que hay en tu escritorio o salón usando There is/are + in/on/next to:',
        answerKey: '1) There · 2) Are · 3) between · 4) under | Orden: There are two wrenches on Shelf 3. / Is there any ink in the printer?'
      }
    },
    {
      id: 'a1-c12', unitId: 'a1-u3', level: 'A1', classNum: 12, coreType: 'CORE', eaqualsRef: '#135, #145, #146',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Demonstratives (this/that/these/those), Articles (a/an/the) & Plurals',
      titleES: 'Demostrativos, Artículos (a/an/the) y Sustantivos Plurales',
      grammarFocus: 'this / that (sing.) vs these / those (plur.) · a / an / the · Regular & irregular plurals',
      canDo: 'Señalar objetos cercanos o lejanos correctamente y utilizar artículos y plurales sin omisiones.',
      industryContext: 'Identificación de componentes en mesa vs máquinas al fondo del taller y control de piezas.',
      warmupPrompt: '¿Por qué `a1-u3` preguntaba sobre "THAT machine" y "THESE calipers" sin haberlos explicado antes? ¡Hoy dominamos la distancia y el número!',
      grammarFormulaHtml: makeFormula('Cerca: THIS (1) / THESE (2+)', '|', 'Lejos: THAT (1) / THOSE (2+)', '|', 'a (cons.) / an (vocal) / the (específico)', "<strong>This</strong> sensor here vs <strong>That</strong> robot over there. · <strong>An</strong> hour / <strong>A</strong> unit / <strong>The</strong> red button."),
      explanationES: '<strong>Demostrativos:</strong> <code>this/these</code> para objetos que puedes tocar o están cerca; <code>that/those</code> para lo que está lejos ("over there"). <strong>Artículos:</strong> <code>a</code> antes de sonido consonántico (<em>a tool, a university</em>), <code>an</code> antes de sonido vocálico (<em>an intern, an hour</em>) y <code>the</code> cuando ambos saben de cuál objeto se habla.',
      goldenRuleES: 'El criterio para <code>a</code> vs <code>an</code> es el <strong>SONIDO inicial</strong>, no la letra escrita: <em>a European plant</em> (suena /j/), <em>an MBA</em> (suena /ɛm/). Plurales irregulares clave: <em>box→boxes, switch→switches, battery→batteries, foot→feet, person→people</em>.',
      commonMistake: { bad: 'Look at this machines over there. I have a orange badge.', good: 'Look at THOSE machines over there. I have AN orange badge.', exp: '"over there" (lejos) + plural pide "those"; "orange" inicia con sonido vocal → "an".' },
      falseCognate: { term: 'Fabric vs Factory', mistake: 'Llamar "fabric" a una fábrica industrial', correct: 'Factory = fábrica | Fabric = tela / tejido', tip: '"That factory makes cleanroom fabric" = esa fábrica produce tela para cuartos limpios.' },
      vocab: [
        { en: 'This / That', es: 'Este(a) / Ese(a), aquel', ipa: '/ðɪs / ðæt/', pinkStress: 'THIS / THAT', example: 'This badge is mine; that one is yours.', exampleES: 'Este gafete es mío; aquel es tuyo.' },
        { en: 'These / Those', es: 'Estos(as) / Esos(as), aquellos', ipa: '/ðiz / ðoʊz/', pinkStress: 'THESE / THOSE', example: 'Keep these screws here and move those boxes.', exampleES: 'Deja estos tornillos aquí y mueve esas cajas.' },
        { en: 'Unit / Hour (a vs an)', es: 'Unidad / Hora', ipa: '/ˈjunɪt / ˈaʊər/', pinkStress: 'U-nit / HOUR', example: 'Check a unit in an hour.', exampleES: 'Revisa una unidad en una hora.' },
        { en: 'Factory / Device', es: 'Fábrica / Dispositivo', ipa: '/ˈfæktəri / dɪˈvaɪs/', pinkStress: 'FAC-to-ry / de-VICE', example: 'The device passes final QA at the factory.', exampleES: 'El dispositivo pasa calidad final en la fábrica.' },
        { en: 'Switch / Switches', es: 'Interruptor / Interruptores', ipa: '/swɪtʃ / ˈswɪtʃɪz/', pinkStress: 'SWITCH-es', example: 'Test both emergency switches.', exampleES: 'Prueba ambos interruptores de emergencia.' },
        { en: 'Person / People', es: 'Persona / Personas', ipa: '/ˈpɜrsən / ˈpipəl/', pinkStress: 'PER-son / PEO-ple', example: 'Two people are waiting outside.', exampleES: 'Dos personas están esperando afuera.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Alex, hand me those blue gloves on the cart, please.', es: 'Alex, pásame esos guantes azules del carrito, por favor.' },
        { speaker: 'Alex', en: 'These right here, or the ones by that CNC lathe?', es: '¿Estos de aquí, o los que están junto a ese torno CNC?' },
        { speaker: 'Lead', en: 'Those over there! And place this multimeter in an ESD bag.', es: '¡Esos de allá! Y coloca este multímetro en una bolsa antiestática.' },
        { speaker: 'Alex', en: 'Done! Now five people are ready for the tour.', es: '¡Listo! Ya hay cinco personas listas para el recorrido.' }
      ],
      drills: [
        { q: 'Store ___ precision screws in this bin, and move ___ heavy crates across the aisle.', opts: ['these / those', 'this / that', 'that / these', 'those / this'], ans: 0, exp: '"here/this bin" (cerca plural) → these; "across the aisle" (lejos plural) → those.', socraticHint: 'Cerca+plural = these · Lejos+plural = those.' },
        { q: 'Wait ___ hour before touching ___ hot motor housing.', opts: ['an / the', 'a / the', 'an / a', 'the / an'], ans: 0, exp: '"hour" tiene h muda (sonido vocal /aʊ/) → "an"; motor específico → "the".', socraticHint: 'Sonido inicial de "hour" + sustantivo específico.' },
        { q: 'Choose the correct plural pair: "one box, two ___; one person, three ___"', opts: ['boxes / people', 'boxs / persons', 'boxes / peoples', 'box / people'], ans: 0, exp: 'box añade -es ("boxes"); plural estándar de "person" es "people".', socraticHint: 'Sustantivos acabados en -x añaden -es; "people" es irregular.' },
        { q: 'Look at ___ automated press over there at Gate 4!', opts: ['that', 'this', 'these', 'those'], ans: 0, exp: '"press" es singular y "over there" señala lejanía → "that".', socraticHint: 'Singular + lejos = that.' }
      ],
      classroomActivity: {
        title: 'Estación "Cerca vs Lejos" en Mesa y Pizarrón',
        grouping: 'Parejas con objetos reales de mochila/escritorio',
        materials: 'Objetos en mano (plumas, llaves, cuadernos) vs objetos al fondo del salón',
        steps: ['Cada alumno señala 3 cosas sobre su mesa usando This/These y 3 cosas al otro lado del salón usando That/Those.', 'Incluyen artículo correcto: "This is an eraser", "That\'s a projector".', 'El compañero repite y corrige plurales o sonido de a/an.']
      },
      powerSheet: {
        fillBlanks: [
          '1. ___ sensor in my hand works well; ___ screen across the room is off. (This, that)',
          '2. Bring ___ boxes near the door, not ___ papers here. (those, these)',
          '3. Luis is ___ electrical engineer; wait ___ hour. (an, an)',
          '4. Singular to plural: 1 switch → 4 ___; 1 person → 5 ___.'
        ],
        reorder: [
          'over there / machine / is / CNC / a / That / .',
          'these / on / tools / Put / workbench / the / .'
        ],
        writePrompt: 'Escribe 2 ejemplos con objetos de tu mesa (this/these) y 2 lejos en tu aula (that/those):',
        answerKey: '1) This, that · 2) those, these · 3) an, an · 4) switches, people | Orden: That is a CNC machine over there. / Put these tools on the workbench.'
      }
    },
    {
      id: 'a1-c13', unitId: 'a1-u3', level: 'A1', classNum: 13, coreType: 'CORE', eaqualsRef: '#125, #128, #129',
      modularity: 'grammar-inductive', hasSlides: false,
      title: "Possessive 's, Object Pronouns & Possessive Pronouns",
      titleES: "Genitivo Sajón ('s), Pronombres Objeto y Posesivos",
      grammarFocus: "Noun + 's / s' · Object pronouns (me, you, him, her, it, us, them) · Possessive pronouns (mine, yours, his, hers, ours, theirs)",
      canDo: 'Expresar pertenencia sin redundancias usando el genitivo sajón (\'s) y reemplazar nombres por pronombres objeto y posesivos.',
      industryContext: 'Control de pertenencia de equipo, relevo de turnos y entrega directa de insumos.',
      warmupPrompt: '¿Por qué es más natural decir *"Mark\'s laptop"* en lugar de *"The laptop of Mark"*? ¿Y cuándo usar *"me"* vs *"my"* vs *"mine"*?',
      grammarFormulaHtml: makeFormula("Dueño + 's + Objeto", '|', 'Verbo + Pronombre Objeto (me/him/her/us/them)', '|', 'Mine / Yours / Hers / Theirs', "That's <strong>Ana's</strong> desk. · Give <strong>it</strong> to <strong>her</strong>. · Is this tablet <strong>yours</strong>? Yes, it's <strong>mine</strong>."),
      explanationES: '<strong>1) Genitivo \'s:</strong> pon el dueño primero: <em>Carlos\'s helmet</em>; si el plural termina en -s solo pon apóstrofo: <em>the engineers\' room</em>. <strong>2) Pronombres objeto:</strong> van después de verbo o preposición (<em>Call me, Help them</em>). <strong>3) Pronombres posesivos:</strong> sustituyen al objeto para no repetirlo (<em>mine, yours, his, hers, ours, theirs</em>).',
      goldenRuleES: 'Diferencia clave: <strong>Adjetivo posesivo</strong> va ANTES de un sustantivo (<em>my charger</em>); <strong>Pronombre posesivo</strong> va SOLO al final (<em>It\'s mine</em> — jamás *"mine charger"*).',
      commonMistake: { bad: 'The office of supervisor. Give the keys to I. Is this my?', good: "The supervisor's office. Give the keys to ME. Is this MINE?", exp: 'Usa \'s con personas/cargos; tras preposición "to/for/with" usa pronombre objeto; sin sustantivo al final usa "mine/yours".' },
      falseCognate: { term: 'Own / Owner', mistake: 'Confundir "owner" (dueño) con "own" (propio/poseer)', correct: 'Owner = propietario | On my own = por cuenta propia', tip: '"Ask the station owner before moving that fixture."' },
      vocab: [
        { en: 'Mine / Yours', es: 'Mío / Tuyo', ipa: '/maɪn / jʊrz/', pinkStress: 'MINE / YOURS', example: 'Are these safety glasses yours? Yes, they are mine.', exampleES: '¿Estos lentes son tuyos? Sí, son míos.' },
        { en: 'Hers / Ours / Theirs', es: 'De ella / Nuestro / De ellos', ipa: '/hɜrz / ˈaʊərz / ðɛrz/', pinkStress: 'HERS / OURS / THEIRS', example: 'Tool Rack A is ours; Rack B is theirs.', exampleES: 'El anaquel A es nuestro; el B es de ellos.' },
        { en: 'Pass / Give + [Object]', es: 'Pasa / Dale a...', ipa: '/pæs / ɡɪv/', pinkStress: 'PASS / GIVE', example: 'Please send the file to them.', exampleES: 'Por favor envíales el archivo a ellos.' },
        { en: 'Desk / Locker', es: 'Escritorio / Casillero', ipa: '/dɛsk / ˈlɑkər/', pinkStress: 'DESK / LOCK-er', example: "Elena's locker is number 42.", exampleES: 'El casillero de Elena es el 42.' },
        { en: 'Owner', es: 'Dueño / Propietario', ipa: '/ˈoʊnər/', pinkStress: 'OWN-er', example: 'Who is the owner of this blue hard hat?', exampleES: '¿Quién es el dueño de este casco azul?' },
        { en: 'Teamwork', es: 'Trabajo en equipo', ipa: '/ˈtimwɜrk/', pinkStress: 'TEAM-work', example: 'The supervisor praised us for good teamwork.', exampleES: 'El supervisor nos felicitó por el buen trabajo en equipo.' }
      ],
      dialogue: [
        { speaker: 'Nina', en: 'Hey Leo, is this Diana\'s torque wrench?', es: 'Oye Leo, ¿esta llave es de Diana?' },
        { speaker: 'Leo', en: 'No, hers is in Locker 12. Ask Mark—maybe it\'s his.', es: 'No, la de ella está en el casillero 12. Pregúntale a Mark; tal vez es suya.' },
        { speaker: 'Nina', en: 'Okay, I\'ll call him right now. Can you hold these bolts for me?', es: 'Bien, le llamo ahora mismo. ¿Me detienes estos tornillos?' },
        { speaker: 'Leo', en: 'Sure, give them to me. Oh, and this clipboard is yours!', es: 'Claro, dámelos. ¡Oh, y esta tabla es tuya!' }
      ],
      drills: [
        { q: 'I left my badge on ___ desk; can you bring ___ to ___?', opts: ["Carlos's / it / me", "of Carlos / its / I", "Carlos / it / my", "Carlos's / him / mine"], ans: 0, exp: "Posesivo 's para Carlos; 'it' reemplaza badge; 'me' tras preposición 'to'.", socraticHint: 'Dueño + \'s | Objeto singular | Pronombre objeto tras "to".' },
        { q: 'Whose multimeter is this? — It\'s ___; my name is on the back.', opts: ['mine', 'my', 'me', 'I'], ans: 0, exp: 'Sin sustantivo después se usa el pronombre posesivo "mine".', socraticHint: 'Reemplaza "my multimeter".' },
        { q: 'The supervisors share one room. It is the ___ lounge.', opts: ["supervisors'", "supervisor's", 'supervisors', "of supervisor's"], ans: 0, exp: 'Plural terminado en -s coloca solo el apóstrofo al final: supervisors\'.', socraticHint: 'Hay varios supervisores (plural).' },
        { q: 'Wait for Luis and Sofia! Call ___ before leaving.', opts: ['them', 'they', 'their', 'theirs'], ans: 0, exp: 'Después del verbo "Call" va el pronombre objeto plural "them".', socraticHint: 'Forma objeto de "they".' }
      ],
      classroomActivity: {
        title: '"Lost & Found" de Objetos en Mesa',
        grouping: 'Grupos de 4 personas',
        materials: '1 objeto personal por alumno puesto al centro',
        steps: ['Todos colocan 1 objeto común al centro (llaves, credencial, pluma, celular).', 'Por turnos señalan y preguntan: "Is this Maria\'s pen? No, hers is black. Give it to Carlos; it\'s his."', 'Practican responder usando solo pronombres objeto y posesivos sin repetir el nombre del objeto.']
      },
      powerSheet: {
        fillBlanks: [
          "1. This is not my helmet; it is ___. (Elena's / of Elena)",
          '2. Look! Our mentors are waving. Walk with ___! (they / them)',
          '3. Is this notebook yours? — Yes, it is ___. (my / mine)',
          '4. That is the ___ locker room (plural). (interns\' / intern\'s)'
        ],
        reorder: [
          'desk / is / Mark\'s / window / near / the / .',
          'email / Please / send / me / the / to / .'
        ],
        writePrompt: 'Escribe 2 oraciones usando el nombre de un compañero + \'s y 1 con "mine/yours":',
        answerKey: "1) Elena's · 2) them · 3) mine · 4) interns' | Orden: Mark's desk is near the window. / Please send the email to me."
      }
    },
    {
      id: 'a1-c14', unitId: 'a1-u3', level: 'A1', classNum: 14, coreType: 'CORE', eaqualsRef: '#4, #85, #141, #169',
      modularity: 'functional-spatial', hasSlides: true,
      title: 'Countable/Uncountable Nouns, Prices, How much/many & some/any',
      titleES: 'Contables e Incontables, Precios, How much/many y some/any',
      grammarFocus: 'Countable vs uncountable (water, coffee, oil, money, time) · How much / How many · some / any / a lot of',
      canDo: 'Preguntar precios, cuantificar materiales contables o líquidos/insumos y usar some/any correctamente.',
      industryContext: 'Compras diarias, comedor industrial y requisiciones básicas de líquidos o consumibles.',
      warmupPrompt: '¿Por qué preguntamos "How MANY boxes?" pero "How MUCH oil / water / money?" ¿Qué cambia entre lo que cuentas por unidad vs masa?',
      grammarFormulaHtml: makeFormula('How MANY + Plural Contable?', '|', 'How MUCH + Incontable / Precio?', '|', 'some (+) / any (-, ?)', "<strong>How much</strong> is the coffee? · <strong>How many</strong> bolts do we have? · There's <strong>a lot of</strong> tape, but we don't have <strong>any</strong> oil."),
      explanationES: '<strong>Contables</strong> tienen plural (<em>1 bottle, 5 boxes → How many?</em>). <strong>Incontables</strong> no tienen plural (<em>water, milk, ink, grease, time, money → How much?</em>). Usa <strong>some</strong> en afirmativas y ofertas corteses; <strong>any</strong> en negativas y preguntas. Preguntar precio: <code>How much is it? / How much does it cost?</code>.',
      goldenRuleES: 'Sustantivos trampa en español que son <strong>INCONTABLES</strong> en inglés: <em>information, equipment, advice, furniture, homework, money</em>. ¡Nunca les agregues "-s"!',
      commonMistake: { bad: 'How many moneys does it cost? Do we have some informations?', good: 'How MUCH does it cost? Do we have ANY information?', exp: '"Money" e "information" son incontables (nunca llevan -s); en preguntas normales usa "any".' },
      falseCognate: { term: 'Bill vs Coin / Price', mistake: 'Decir "cost" como verbo con "is cost"', correct: 'It costs $10 / How much does it cost?', tip: 'O dices "How much IS it?" (to be) o "How much DOES it cost?" (verbo cost). Nunca mezcles ambos.' },
      vocab: [
        { en: 'How much / Cost', es: 'Cuánto / Costar', ipa: '/haʊ mʌtʃ / kɔst/', pinkStress: 'how MUCH / COST', example: 'How much does the bus ticket cost? $5 dollars.', exampleES: '¿Cuánto cuesta el boleto de camión? 5 dólares.' },
        { en: 'How many', es: 'Cuántos(as)', ipa: '/haʊ ˈmɛni/', pinkStress: 'how MAN-y', example: 'How many screws are in each pack?', exampleES: '¿Cuántos tornillos vienen en cada paquete?' },
        { en: 'Equipment / Supplies', es: 'Equipo (incont.) / Suministros', ipa: '/ɪˈkwɪpmənt/', pinkStress: 'e-QUIP-ment', example: 'We need new protective equipment.', exampleES: 'Necesitamos equipo de protección nuevo.' },
        { en: 'Bottle / Cup / Box of', es: 'Botella / Taza / Caja de', ipa: '/ˈbɑtəl / kʌp/', pinkStress: 'BOT-tle / CUP', example: 'Buy two bottles of water and a box of gloves.', exampleES: 'Compra dos botellas de agua y una caja de guantes.' },
        { en: 'A lot of', es: 'Mucho / Muchos', ipa: '/ə lɑt əv/', pinkStress: 'a LOT of', example: 'There is a lot of traffic today.', exampleES: 'Hay mucho tráfico hoy.' },
        { en: 'Receipt / Change', es: 'Recibo / Cambio', ipa: '/rɪˈsit / tʃeɪndʒ/', pinkStress: 're-CEIPT / CHANGE', example: 'Here is your change and receipt.', exampleES: 'Aquí tiene su cambio y su recibo.' }
      ],
      dialogue: [
        { speaker: 'Clerk', en: 'Good afternoon! Do we have any printer paper left?', es: '¡Buenas tardes! ¿Nos queda papel para impresora?' },
        { speaker: 'Alex', en: 'Yes, there is a lot of paper in Cabinet A, but we don\'t have any black ink.', es: 'Sí, hay mucho papel en el Gabinete A, pero no tenemos tinta negra.' },
        { speaker: 'Clerk', en: 'Okay. How many boxes of pens do we need?', es: 'Bien. ¿Cuántas cajas de plumas necesitamos?' },
        { speaker: 'Alex', en: 'Just two boxes. Also, how much does a bottle of lubricant cost?', es: 'Solo dos cajas. Además, ¿cuánto cuesta una botella de lubricante?' }
      ],
      drills: [
        { q: '___ does a train ticket to the city center cost?', opts: ['How much', 'How many', 'What cost', 'Which many'], ans: 0, exp: 'Para preguntar precio se usa siempre "How much".', socraticHint: 'Precios = incontable (dinero) → How much.' },
        { q: 'We don\'t have ___ coolant left, so order ___ new drums.', opts: ['any / some', 'some / any', 'many / a', 'no / any'], ans: 0, exp: 'Oración negativa usa "any"; afirmativa usa "some".', socraticHint: 'Regla básica: (-) any / (+) some.' },
        { q: '___ safety helmets are stored on Rack 2?', opts: ['How many', 'How much', 'How far', 'How long'], ans: 0, exp: '"helmets" es sustantivo contable en plural → "How many".', socraticHint: '¿Se pueden contar por unidad: 1, 2, 3?' },
        { q: 'Which phrase is grammatically correct?', opts: ['The lab has a lot of new equipment.', 'The lab has many new equipments.', 'There are an equipment.', 'I need some informations.'], ans: 0, exp: '"equipment" e "information" son incontables: no toman -s ni "an/many".', socraticHint: 'Incontable nunca pluraliza con -s.' }
      ],
      classroomActivity: {
        title: 'Compras en Cafetería / Almacén con Presupuesto',
        grouping: 'Parejas (Vendedor A / Comprador B con $50 USD)',
        materials: 'Lista de precios (comida + insumos escolares/planta) en Power Sheet',
        steps: ['B tiene $50 USD y pregunta por disponibilidad ("Do you have any...?") y precios ("How much is...?").', 'A responde cantidades disponibles ("We have some..., we don\'t have any...") y da total.', 'Gana la pareja que optimiza el presupuesto sin errores de countable/uncountable.']
      },
      powerSheet: {
        fillBlanks: [
          '1. How ___ does this multimeter cost? (much / many)',
          '2. How ___ notebooks do you need for class? (much / many)',
          "3. I have ___ water, but I don't have ___ coffee. (some, any)",
          '4. We need helpful ___ before the exam. (information / informations)'
        ],
        reorder: [
          'cost / does / lunch / How much / the / ?',
          'in / any / Aren\'t / tape / drawer / rolls of / the / there / ?'
        ],
        writePrompt: 'Haz una mini lista de 3 compras usando 1 incontable (some) y 2 contables con número:',
        answerKey: '1) much · 2) many · 3) some, any · 4) information | Orden: How much does the lunch cost? / Aren\'t there any rolls of tape in the drawer?'
      }
    },
    {
      id: 'a1-c15', unitId: 'a1-u3', level: 'A1', classNum: 15, coreType: 'CORE', eaqualsRef: '#85, #145, #161, #173, #174, #175',
      modularity: 'functional-spatial', hasSlides: false,
      title: "Polite Orders with I'd like, Common Adjectives, Colors & Sizes",
      titleES: "Peticiones Corteses (I'd like), Adjetivos, Colores y Dimensiones",
      grammarFocus: "I'd like (+ noun / to + verb) · Adjective + Noun order (¡antes del sustantivo!) · Intensifiers (very, really) · Clothes & PPE",
      canDo: 'Pedir alimentos o materiales con cortesía usando I\'d like y describir objetos por color, tamaño y condición.',
      industryContext: 'Pedidos en cafetería/restaurante, tallas de equipo de seguridad (EPP), colores de cables y dimensiones.',
      warmupPrompt: '¿Por qué decir *"Give me a large helmet red"* suena brusco y desordenado? Aprende "I\'d like" y el orden Adjetivo → Sustantivo.',
      grammarFormulaHtml: makeFormula("I'd like / Would you like", '+', 'a / an + [very/really] + Adjetivo (Tamaño/Color)', '+', 'Sustantivo / to + Verbo', "<strong>I'd like</strong> a <strong>really large blue</strong> vest, please. · <strong>Would you like</strong> to order?"),
      explanationES: '<code>I\'d like</code> (contracción de <em>I would like</em> = "Me gustaría / Quisiera") es mucho más cortés que <em>I want</em> al pedir comida o ayuda. En inglés el <strong>adjetivo va SIEMPRE ANTES</strong> del sustantivo y <strong>nunca lleva plural</strong> (<em>two red cables</em>, jamás <em>reds cables</em>). Intensificadores básicos: <code>very / really</code>.',
      goldenRuleES: 'Regla de oro descriptiva: Tamaño antes que Color + Sustantivo SIN pluralizar el adjetivo: <em>a small black case</em>, <em>three long steel rods</em>.',
      commonMistake: { bad: 'I want a coffee. / They are gloves blues and larges.', good: "I'd like a coffee, please. / They are large blue gloves.", exp: 'Usa "I\'d like" para pedir; coloca adjetivos antes del sustantivo y nunca los pluralices.' },
      falseCognate: { term: 'Large vs Long', mistake: 'Traducir "largo" como "large"', correct: 'Large = grande (tamaño/talla) | Long = largo (longitud)', tip: '"Large" es talla Grande (L) o volumen amplio; una banda o calle "larga" es "long".' },
      vocab: [
        { en: "I'd like / Would you like", es: 'Quisiera / ¿Le gustaría...?', ipa: '/aɪd laɪk/', pinkStress: "I'D like", example: "I'd like a cup of black coffee, please.", exampleES: 'Quisiera una taza de café negro, por favor.' },
        { en: 'Large / Small / Medium', es: 'Grande / Chico / Mediano', ipa: '/lɑrdʒ / smɔl/', pinkStress: 'LARGE / SMALL', example: 'Do you have these work boots in size medium?', exampleES: '¿Tienen estas botas de trabajo en talla mediana?' },
        { en: 'Long / Short / Heavy', es: 'Largo / Corto / Pesado', ipa: '/lɔŋ / ˈhɛvi/', pinkStress: 'LONG / HEAV-y', example: 'This cable is very long and heavy.', exampleES: 'Este cable es muy largo y pesado.' },
        { en: 'Clean / Dirty / Safe', es: 'Limpio / Sucio / Seguro', ipa: '/klin / ˈdɜrti / seɪf/', pinkStress: 'CLEAN / DIR-ty', example: 'Keep the cleanroom floor really clean.', exampleES: 'Mantén el piso del cuarto limpio muy limpio.' },
        { en: 'Lab Coat / Jacket / Shoes', es: 'Bata / Chamarra / Zapatos', ipa: '/læb koʊt/', pinkStress: 'LAB coat', example: 'All interns wear a white lab coat.', exampleES: 'Todos los practicantes usan bata blanca.' },
        { en: 'Red / Yellow / Green / Black', es: 'Rojo / Amarillo / Verde / Negro', ipa: '/rɛd / ˈjɛloʊ/', pinkStress: 'RED / YEL-low', example: 'Press the red button, not the green one.', exampleES: 'Presiona el botón rojo, no el verde.' }
      ],
      dialogue: [
        { speaker: 'Attendant', en: 'Good morning! What would you like for the cleanroom today?', es: '¡Buenos días! ¿Qué le gustaría pedir hoy para cuarto limpio?' },
        { speaker: 'Diana', en: "I'd like a white lab coat in size large and a pair of blue shoe covers.", es: 'Quisiera una bata blanca talla grande y un par de cubrezapatos azules.' },
        { speaker: 'Attendant', en: 'Sure! Would you like thick or thin gloves?', es: '¡Claro! ¿Te gustaría guantes gruesos o delgados?' },
        { speaker: 'Diana', en: "I'd like the really thin ones for micro-soldering, please. Thanks!", es: 'Quisiera los muy delgados para microsoldadura, por favor. ¡Gracias!' }
      ],
      drills: [
        { q: 'In a café, what is the polite American way to order lunch?', opts: ["I'd like a turkey sandwich and water, please.", 'Give me a sandwich now.', 'I want eating sandwich.', 'Take me a sandwich.'], ans: 0, exp: '"I\'d like + sustantivo + please" es la estructura cortés estándar en MCER A1.', socraticHint: 'Evita imperativos secos o "I want" directo con desconocidos.' },
        { q: 'Select the correct adjective order and grammar:', opts: ['two small yellow tags', 'two tags yellows and smalls', 'smalls yellow two tags', 'two yellow small tag'], ans: 0, exp: 'Número + Tamaño + Color + Sustantivo plural (sin -s en adjetivos).', socraticHint: 'Los adjetivos nunca toman -s de plural en inglés.' },
        { q: 'This conveyor belt isn\'t short; it is very ___.', opts: ['long', 'large', 'small', 'tall'], ans: 0, exp: 'Para longitud horizontal se usa "long", no "large".', socraticHint: 'Cuidado con el falso amigo "large".' },
        { q: 'I\'d like ___ to the shift leader after breakfast.', opts: ['to speak', 'speaking', 'speak', 'spoke'], ans: 0, exp: '"I\'d like" seguido de otro verbo exige infinitivo con "to": I\'d like to speak.', socraticHint: 'would like + TO + verbo.' }
      ],
      classroomActivity: {
        title: 'Ventanilla Dual: Cafetería + Almacén de Tallas EPP',
        grouping: 'Parejas alternando cliente y mostrador',
        materials: 'Menú mixto (comida + batas/guantes/lentes en colores y tallas)',
        steps: ['Cliente pide 1 alimento y 1 artículo de vestir/EPP usando "I\'d like..." + 2 adjetivos (color + tamaño).', 'Quien atiende confirma con "Would you like...?" y da precio total.', 'Cambian roles y califican claridad en uso de "really/very".']
      },
      powerSheet: {
        fillBlanks: [
          "1. ___ a green salad and an iced tea, please. (I'd like / I want)",
          '2. Look at those ___ ___ trucks. (big red / reds big)',
          '3. This street is 5 kilometers ___. (long / large)',
          "4. My workstation is ___ clean today. (very / much)"
        ],
        reorder: [
          'would / What / like / order / you / to / ?',
          'new / black / safety / boots / bought / She / .'
        ],
        writePrompt: 'Pide algo en una cafetería con "I\'d like" y describe 1 prenda/objeto con 2 adjetivos:',
        answerKey: "1) I'd like · 2) big red · 3) long · 4) very | Orden: What would you like to order? / She bought new black safety boots."
      }
    },
    {
      id: 'a1-c16', unitId: 'a1-u4', level: 'A1', classNum: 16, coreType: 'CORE', eaqualsRef: '#58',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Imperatives (+/-), Safety Signs & Workplace Directives',
      titleES: 'Imperativos Afirmativos/Negativos y Señalética de Seguridad',
      grammarFocus: 'Base Verb (Shut down / Keep clear) · Negative Don\'t / Do not + Base Verb · Polite "Please"',
      canDo: 'Comprender letreros oficiales de advertencia y emitir instrucciones claras de operación y seguridad.',
      industryContext: 'Señalética EHS, listas de verificación de paro de emergencia y protocolos de aula/laboratorio.',
      warmupPrompt: '¿Por qué un letrero de peligro dice "Do NOT touch" y nunca "Not touch" ni "Doesn\'t touch"?',
      grammarFormulaHtml: makeFormula('Afirmativo: [Please] Verbo Base', '|', "Negativo: Do not / Don't + Verbo Base", '+', 'Objeto / Advertencia', "<strong>Wear</strong> ear protection. · <strong>Don't open</strong> the panel! · Please <strong>wait</strong> here."),
      explanationES: 'El <strong>Imperativo</strong> no lleva sujeto escrito porque siempre se dirige a "you". Para ordenar algo empieza directo con el verbo en infinitivo sin <em>to</em> (<code>Press, Sit, Check</code>). Para prohibir o advertir usa SIEMPRE <code>Don\'t</code> (informal/oral) o <code>Do not</code> (formal/letreros) + verbo base.',
      goldenRuleES: 'No agregues "must" dentro de un imperativo A1; un letrero efectivo es directo y corto. Suaviza órdenes verbales a colegas añadiendo <strong>please</strong> al inicio o al final.',
      commonMistake: { bad: 'No run in the hallway! Please to open the door.', good: "Don't run in the hallway! Please open the door.", exp: 'En inglés prohibimos con "Don\'t + verbo" (no "No + verbo"); el imperativo nunca lleva "to".' },
      falseCognate: { term: 'Caution / Advise', mistake: 'Traducir "advertencia" como "advice"', correct: 'Warning / Caution = advertencia de peligro | Advice = consejo', tip: 'Un letrero amarillo dice "Caution" o "Warning", nunca "Advice".' },
      vocab: [
        { en: 'Caution / Keep Clear', es: 'Precaución / Mantener despejado', ipa: '/ˈkɔʃən / kip klɪr/', pinkStress: 'CAU-tion / KEEP clear', example: 'Keep the emergency exit clear at all times.', exampleES: 'Mantén despejada la salida de emergencia siempre.' },
        { en: 'Shut Down / Turn Off', es: 'Apagar (máquina/sistema)', ipa: '/ʃʌt daʊn/', pinkStress: 'shut DOWN', example: 'Shut down the compressor before cleaning.', exampleES: 'Apaga el compresor antes de limpiar.' },
        { en: 'Press / Pull / Push', es: 'Presionar / Jalar / Empujar', ipa: '/prɛs / pʊl / pʊʃ/', pinkStress: 'PRESS / PULL', example: 'Press the red button in an emergency.', exampleES: 'Presiona el botón rojo en caso de emergencia.' },
        { en: 'Authorized Personnel', es: 'Personal autorizado', ipa: '/ˈɔθəˌraɪzd/', pinkStress: 'AU-thor-ized', example: 'Authorized personnel only beyond this gate.', exampleES: 'Solo personal autorizado después de esta puerta.' },
        { en: 'Hard Hat / Ear Protection', es: 'Casco / Protección auditiva', ipa: '/hɑrd hæt/', pinkStress: 'HARD hat', example: 'Wear ear protection inside Area B.', exampleES: 'Usa protección auditiva dentro del Área B.' },
        { en: 'Check / Lock', es: 'Verificar / Asegurar con llave', ipa: '/tʃɛk / lɑk/', pinkStress: 'CHECK / LOCK', example: "Don't leave the cabinet open; lock it.", exampleES: 'No dejes abierto el gabinete; ciérralo con llave.' }
      ],
      dialogue: [
        { speaker: 'Rachel', en: 'David, please stop the feeder conveyor for a second.', es: 'David, por favor detén la banda alimentadora un segundo.' },
        { speaker: 'David', en: 'Sure. Done. The yellow light is on. Wait—is that panel hot?', es: 'Claro. Listo. La luz amarilla está encendida. Espera, ¿ese panel está caliente?' },
        { speaker: 'Rachel', en: "Yes! Don't touch the metal cover without gloves. Put on your heat gloves first.", es: '¡Sí! No toques la cubierta metálica sin guantes. Ponte tus guantes térmicos primero.' },
        { speaker: 'David', en: 'Good catch. Always check the warning signs first.', es: 'Buen aviso. Siempre revisa primero las señales de advertencia.' }
      ],
      drills: [
        { q: '___ touch exposed high-voltage cables while the machine is on.', opts: ['Do not', 'No', 'Not to', "Doesn't"], ans: 0, exp: 'Prohibición formal en señalética y protocolos: "Do not" / "Don\'t".', socraticHint: 'Nunca uses "No" ni "Doesn\'t" en imperativo.' },
        { q: '___ your lab coat and safety goggles before entering the cleanroom.', opts: ['Put on', 'Putting on', 'Puts on', 'To put on'], ans: 0, exp: 'Imperativo afirmativo inicia con verbo base.', socraticHint: 'Instrucción paso 1.' },
        { q: 'Which sign means "No bloquear la puerta"?', opts: ['Keep Doorway Clear', 'Do Not Clear Door', 'Shut Down Doorway', 'Push Door Only'], ans: 0, exp: '"Keep clear" significa mantener libre/despejado.', socraticHint: 'Mantener libre de obstáculos.' },
        { q: 'Please ___ the lights when you leave Room 204.', opts: ['turn off', 'turning off', 'turned off', 'turns off'], ans: 0, exp: '"Please + verbo base".', socraticHint: 'Imperativo cortés.' }
      ],
      classroomActivity: {
        title: '"Simon Says EHS" & Diseño de Tarjeta de Señalética',
        grouping: 'Plenario rápido (5m) + parejas diseñan 3 reglas de salón/laboratorio (8m)',
        materials: 'Tarjetas en Power Sheet / pizarrón',
        steps: ['Docente da órdenes afirmativas y negativas veloces; alumnos ejecutan mímica en su lugar.', 'En parejas crean un mini-cartel bilingüe con 2 órdenes positivas y 2 prohibiciones ("Don\'t eat near PCs!").', 'Pegan o intercambian tarjetas para validar sintaxis sin errores.']
      },
      powerSheet: {
        fillBlanks: [
          '1. ___ the emergency stop button immediately! (Press / Pressing)',
          "2. ___ talk loudly during the safety video. (Don't / No)",
          '3. Please ___ quiet and listen to the instructions. (be / are)',
          '4. Caution: Authorized ___ only! (personnel / personals)'
        ],
        reorder: [
          'the / Do not / power / unplug / cable / .',
          'seatbelt / your / Always / fasten / .'
        ],
        writePrompt: 'Redacta 1 regla afirmativa y 1 prohibición (Don\'t) para el laboratorio o tu casa:',
        answerKey: "1) Press · 2) Don't · 3) be · 4) personnel | Orden: Do not unplug the power cable. / Always fasten your seatbelt."
      }
    },
    {
      id: 'a1-c17', unitId: 'a1-u4', level: 'A1', classNum: 17, coreType: 'CORE', eaqualsRef: '#104, #105',
      modularity: 'grammar-inductive', hasSlides: true,
      title: "Modals Can / Can't (Ability) & Can / Could Functional Requests",
      titleES: "Verbo Modal Can/Can't (Habilidades) y Peticiones Corteses",
      grammarFocus: "Can / Can't + Verb base (all persons, no -s!) · Questions: Can you...? / Can I...? / Could I...?",
      canDo: 'Expresar qué habilidades técnicas o cotidianas sabes hacer (o aún no) y pedir favores o permisos con cortesía.',
      industryContext: 'Matriz de habilidades del técnico (operación de máquinas/idiomas) y peticiones en viajes/oficina.',
      warmupPrompt: '¿Por qué NUNCA decimos *"He cans drive"* ni *"I can to speak English"*? ¡Conoce las 2 reglas de acero de los verbos modales!',
      grammarFormulaHtml: makeFormula('Sujeto + CAN / CAN\'T', '+', 'Verbo Base (sin "to" y sin "-s")', '|', 'Pregunta: Can / Could + Sujeto + V?', "She <strong>can speak</strong> three languages. · I <strong>can't swim</strong>. · <strong>Can/Could I</strong> use your phone?"),
      explanationES: 'Los modales <strong>can / could</strong> son invariables: igual para <em>I, he, they</em> (sin <code>-s</code> en 3ª persona) y seguidos SIEMPRE de verbo simple sin <code>to</code>. Usos en A1: <strong>1) Habilidad:</strong> <em>I can program PLCs</em>; <strong>2) Permiso / Petición:</strong> <em>Can I open the window? / Could you pass me...?</em>.',
      goldenRuleES: 'En inglés americano distingue pronunciación: <strong>can</strong> átono suena rápido (/kən/), mientras <strong>can\'t</strong> se alarga y suena fuerte (/kænt/) con una pausa clara antes de la <em>t</em>.',
      commonMistake: { bad: 'She can to use Excel. Does he can drive a forklift?', good: 'She can use Excel. Can he drive a forklift?', exp: 'Los modales NO usan "to" ni auxiliares "do/does" para preguntar.' },
      falseCognate: { term: 'Capacitate vs Train / Can', mistake: 'I am capacitated for...', correct: 'I am trained to... / I can operate...', tip: 'En inglés "capacitated" no significa "capacitado"; usa "certified", "trained" o "I can...".' },
      vocab: [
        { en: 'Can / Can\'t', es: 'Poder / No poder (saber hacer)', ipa: '/kæn / kænt/', pinkStress: 'can / CAN\'T', example: 'Alex can solder PCBs, but he can\'t drive a crane.', exampleES: 'Alex sabe soldar PCBs, pero no sabe manejar grúa.' },
        { en: 'Operate / Program', es: 'Operar / Programar', ipa: '/ˈɑpəreɪt / ˈproʊɡræm/', pinkStress: 'OP-er-ate / PRO-gram', example: 'Can you operate a digital caliper?', exampleES: '¿Sabes operar un calibrador digital?' },
        { en: 'Speak / Translate', es: 'Hablar / Traducir', ipa: '/spik / trænsˈleɪt/', pinkStress: 'SPEAK / trans-LATE', example: 'She can speak Spanish and English.', exampleES: 'Ella sabe hablar español e inglés.' },
        { en: 'Borrow / Use', es: 'Pedir prestado / Usar', ipa: '/ˈbɑroʊ / juz/', pinkStress: 'BOR-row / USE', example: 'Could I borrow your pen for a moment?', exampleES: '¿Podría pedirte prestada tu pluma un momento?' },
        { en: 'Return Ticket / Pass', es: 'Boleto redondo / Pase', ipa: '/rɪˈtɜrn ˈtɪkɪt/', pinkStress: 're-TURN tick-et', example: 'Could I have a return ticket to Austin?', exampleES: '¿Me da un boleto redondo a Austin?' },
        { en: 'Lift / Swim / Cook', es: 'Levantar peso / Nadar / Cocinar', ipa: '/lɪft / swɪm / kʊk/', pinkStress: 'LIFT / SWIM', example: 'Don\'t lift heavy boxes alone; ask for help.', exampleES: 'No levantes cajas pesadas solo; pide ayuda.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Marco, can you read electrical schematics?', es: 'Marco, ¿sabes leer diagramas eléctricos?' },
        { speaker: 'Marco', en: "Yes, I can! I can also solder fine-pitch boards, though I can't program PLCs yet.", es: '¡Sí sé! También sé soldar placas finas, aunque aún no sé programar PLCs.' },
        { speaker: 'Lead', en: "No problem. Could you help Sarah on Line 2 this morning?", es: 'Sin problema. ¿Podrías ayudar a Sarah en la Línea 2 esta mañana?' },
        { speaker: 'Marco', en: 'Of course! Can I borrow an ESD wrist strap first?', es: '¡Por supuesto! ¿Puedo tomar una pulsera antiestática primero?' }
      ],
      drills: [
        { q: 'Roberto ___ speak French and English, but he ___ read Japanese.', opts: ["can / can't", 'cans / not can', 'can to / cannot to', 'does can / doesn\'t'], ans: 0, exp: '"can" no lleva -s en 3ª persona y niega como "can\'t".', socraticHint: 'Modal invariable sin -s y sin "to".' },
        { q: 'Which question politely asks to use someone\'s charger?', opts: ['Could I use your charger, please?', 'Do I can to use your charger?', 'Am I can using your charger?', 'Give me your charger!'], ans: 0, exp: '"Can I / Could I + verbo base" es la petición cortés correcta.', socraticHint: 'El modal va al inicio antes del sujeto.' },
        { q: '___ Ana calibrate the optical sensor by herself?', opts: ['Can', 'Does can', 'Is can', 'Could to'], ans: 0, exp: 'Preguntas con "can" invierten sujeto y modal directamente.', socraticHint: 'Sin "do/does".' },
        { q: 'I ___ play the guitar very well, and I ___ fix my bicycle too.', opts: ['can / can', 'can / to can', 'am / have', 'cans / cans'], ans: 0, exp: 'Ambos indican habilidades reales actuales con verbo base.', socraticHint: 'Can + verbo base.' }
      ],
      classroomActivity: {
        title: 'Entrevista "Matriz de Habilidades" (Skills Matrix)',
        grouping: 'Parejas',
        materials: 'Tabla de 6 habilidades (Speak English, Drive, Code Python, Solder, Cook, Swim)',
        steps: ['Cada alumno entrevista a su pareja con "Can you...?" y marca ✓ / ✗ en la hoja.', 'Practican 3 peticiones reales de aula usando "Can/Could I borrow...?" o "Can you repeat...?".', 'Reportan 1 habilidad y 1 reto de su compañero al trío vecino.']
      },
      powerSheet: {
        fillBlanks: [
          '1. My partner ___ drive a car, and she ___ speak English. (can, can)',
          "2. I ___ read blueprints yet, sorry! (can't / don't can)",
          '3. ___ I use your tablet to check the schedule? (Could / Am)',
          '4. He can ___ Python scripts fast. (write / to write)'
        ],
        reorder: [
          'can / three / speak / languages / Maria / .',
          'pass / you / please / wrench / Can / the / me / , / ?'
        ],
        writePrompt: 'Escribe 2 habilidades que SÍ tienes (I can...) y 1 cosa que aún no puedes hacer (I can\'t...):',
        answerKey: "1) can, can · 2) can't · 3) Could · 4) write | Orden: Maria can speak three languages. / Can you pass me the wrench, please?"
      }
    },
    {
      id: 'a1-c18', unitId: 'a1-u4', level: 'A1', classNum: 18, coreType: 'CORE', eaqualsRef: '#65, #147',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Present Continuous: Actions Happening Right Now',
      titleES: 'Presente Continuo: Acciones en Progreso Ahora',
      grammarFocus: 'am / is / are (+ not) + V-ing · Questions (What are you doing?) · Spelling rules (-e, double consonant)',
      canDo: 'Describir qué estás haciendo tú o qué está ocurriendo en este preciso momento en casa, clase o planta.',
      industryContext: 'Monitoreo en tiempo real, reportes de estado en vivo y qué ocurre en la línea ahora.',
      warmupPrompt: 'Diferencia vital: "He inspectS machines" (todos los días) vs "He IS inspectING a machine right now" (¡en este segundo!).',
      grammarFormulaHtml: makeFormula('Sujeto + am / is / are (+ not)', '+', 'Verbo + -ing', '+', 'now / right now / at the moment', "Ibrahim <strong>is studying</strong> now. · We <strong>aren't sleeping</strong>. · Why <strong>are</strong> you <strong>waiting</strong>?"),
      explanationES: 'El <strong>Presente Continuo</strong> describe acciones que ocurren <strong>en este momento</strong> o proyectos temporales actuales. Se forma SIEMPRE con <code>am/is/are</code> + verbo acabado en <code>-ing</code>. Ortografía: quita <code>-e</code> muda (<em>write → writing</em>); duplica consonante en sílaba corta CVC (<em>run → running, stop → stopping</em>).',
      goldenRuleES: '¡No olvides el auxiliar <code>am/is/are</code>! Un error clásico es decir *"She working now"*; siempre debe ser *"She IS working now"*.',
      commonMistake: { bad: 'John working in Texas now. It raining outside.', good: "John's working in Texas now. It's raining outside.", exp: 'El Presente Continuo NUNCA existe sin el verbo auxiliar "to be" (am/is/are).' },
      falseCognate: { term: 'Wait vs Expect / Hope', mistake: 'I am expecting the bus (parado en la esquina)', correct: 'Wait = esperar físicamente | Expect = prever que pase | Hope = desear', tip: 'Si estás parado viendo el reloj esperándolo, usa "Waiting for": "Why are we waiting?"' },
      vocab: [
        { en: 'Right now / At the moment', es: 'Ahora mismo / En este momento', ipa: '/raɪt naʊ/', pinkStress: 'RIGHT now', example: "She's calibrating the sensor right now.", exampleES: 'Ella está calibrando el sensor ahora mismo.' },
        { en: 'Working / Studying', es: 'Trabajando / Estudiando', ipa: '/ˈwɜrkɪŋ / ˈstʌdiɪŋ/', pinkStress: 'WORK-ing / STUD-y-ing', example: "I'm studying mechatronics this semester.", exampleES: 'Estoy estudiando mecatrónica este semestre.' },
        { en: 'Testing / Running', es: 'Probando / Corriendo (operando)', ipa: '/ˈtɛstɪŋ / ˈrʌnɪŋ/', pinkStress: 'TEST-ing / RUN-ning', example: 'Line 2 is running smoothly at the moment.', exampleES: 'La Línea 2 está operando suavemente en este momento.' },
        { en: 'Waiting (for)', es: 'Esperando (a alguien/algo)', ipa: '/ˈweɪtɪŋ/', pinkStress: 'WAIT-ing', example: "We're waiting for the QA sign-off.", exampleES: 'Estamos esperando la firma de calidad.' },
        { en: 'Raining / Wearing', es: 'Lloviendo / Llevando puesto', ipa: '/ˈreɪnɪŋ / ˈwɛrɪŋ/', pinkStress: 'RAIN-ing / WEAR-ing', example: "Look outside—it's raining! Is he wearing boots?", exampleES: 'Mira afuera: ¡está lloviendo! ¿Trae botas puestas?' },
        { en: 'Typing / Fixing', es: 'Tecleando / Reparando', ipa: '/ˈtaɪpɪŋ / ˈfɪksɪŋ/', pinkStress: 'TYP-ing / FIX-ing', example: "He isn't typing; he's fixing the cable.", exampleES: 'No está tecleando; está reparando el cable.' }
      ],
      dialogue: [
        { speaker: 'Sara', en: 'Hey Tom, are you having lunch right now?', es: 'Oye Tom, ¿estás almorzando ahorita?' },
        { speaker: 'Tom', en: "No, I'm not. I'm waiting for a technician at Gate 3. Why?", es: 'No. Estoy esperando a un técnico en la Puerta 3. ¿Por qué?' },
        { speaker: 'Sara', en: "It's raining heavily and Line 1 isn't running—the team is checking a sensor.", es: 'Está lloviendo fuerte y la Línea 1 no está corriendo; el equipo está revisando un sensor.' },
        { speaker: 'Tom', en: 'Got it! Is Ana writing the quick note?', es: '¡Entendido! ¿Está Ana escribiendo la nota rápida?' }
      ],
      drills: [
        { q: 'Look at Line 4! The operators ___ testing the new battery pack right now.', opts: ['are', 'is', 'do', 'have'], ans: 0, exp: '"operators" plural + acción en curso → "are testing".', socraticHint: 'Present Continuous necesita am/is/are.' },
        { q: 'What is the correct -ing spelling for "write" and "stop"?', opts: ['writing / stopping', 'writting / stoping', 'writeing / stopping', 'writing / stoping'], ans: 0, exp: '"write" pierde la -e muda; "stop" (CVC corto) duplica la p.', socraticHint: 'Revisa reglas de -e muda y doble consonante.' },
        { q: 'Why ___ Maria wearing her blue lab coat today?', opts: ['is', 'does', 'are', 'be'], ans: 0, exp: 'En preguntas en Presente Continuo se usa "is/are", jamás "do/does".', socraticHint: 'Verbo auxiliar = am/is/are.' },
        { q: 'Every day I ___ CAD, but right now I ___ a phone call.', opts: ['use / am taking', 'am using / take', 'using / taking', 'uses / am take'], ans: 0, exp: 'Rutina ("Every day") = Simple Present; "right now" = Present Continuous.', socraticHint: 'Contrasta hábito vs acción inmediata.' }
      ],
      classroomActivity: {
        title: 'Mímica en Vivo "What\'s Happening on the Floor?"',
        grouping: 'Parejas / equipos de 4',
        materials: 'Tarjetas de acciones (typing, soldering, waiting for a bus, wearing goggles, checking a phone)',
        steps: ['Un alumno hace mímica silenciosa de una acción; sus compañeros adivinan en Presente Continuo ("You are typing an email!").', 'Después formulan 2 preguntas reales al azar por WhatsApp/aula simulada ("What are you studying right now?").', 'Comparan contraste: "Every morning I drive, right now I\'m sitting in class."']
      },
      powerSheet: {
        fillBlanks: [
          '1. Carlos ___ studying engineering at UABC this year. (is / does)',
          "2. We ___ running Line 2 today; it's off for maintenance. (aren't / isn't)",
          '3. Correct -ing forms: run → ___; take → ___.',
          '4. Why ___ you waiting at Reception? (are / do)'
        ],
        reorder: [
          'wearing / is / blue / She / hard hat / a / .',
          'right now / are / doing / What / you / ?'
        ],
        writePrompt: 'Escribe 2 acciones que tú o tus compañeros están haciendo JUSTO AHORA:',
        answerKey: "1) is · 2) aren't · 3) running, taking · 4) are | Orden: She is wearing a blue hard hat. / What are you doing right now?"
      }
    },
    {
      id: 'a1-c19', unitId: 'a1-u4', level: 'A1', classNum: 19, coreType: 'CORE', eaqualsRef: '#67, #68',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Past Simple of "to be" (was/were) & Intro to Simple Past',
      titleES: 'Pasado de To Be (was/were) e Introducción al Pasado Simple',
      grammarFocus: "was / wasn't / were / weren't · Past Simple regular (-ed: worked, lived) & key irregulars (went, had, made, saw, did) · Did...?",
      canDo: 'Reportar dónde estuviste ayer y contar acciones pasadas sencillas usando was/were y verbos pasados esenciales.',
      industryContext: 'Primer reporte breve de turno anterior, asistencia de ayer y eventos pasados recientes.',
      warmupPrompt: 'Ayer no estabas aquí hoy estás aquí: "Today I AM in class; yesterday I WAS at home." ¿Qué cambia cuando viajamos al pasado?',
      grammarFormulaHtml: makeFormula('was / wasn\'t (I/he/she/it) · were / weren\'t (you/we/they)', '|', 'Sujeto + Verbo-ed / Irregular (went/had/saw)', '+', 'yesterday / last night', "The briefing <strong>was</strong> good. · <strong>Were</strong> you at the lab? · Yesterday we <strong>went</strong> to the plant."),
      explanationES: 'En pasado, <em>to be</em> solo tiene 2 formas: <strong>was</strong> (singular I/he/she/it) y <strong>were</strong> (you/we/they). Otros verbos añaden <code>-ed</code> (<em>worked, checked</em>) o son irregulares de uso diario (<em>go→went, have→had, do→did, see→saw, make→made</em>). Para negar/preguntar verbos normales en pasado usamos <strong>didn\'t / Did...? + verbo BASE</strong>.',
      goldenRuleES: '¡Regla imán del pasado! Con <code>Did</code> o <code>didn\'t</code> el verbo vuelve a su forma simple: <em>Did you go?</em> (NO <em>Did you went?</em>). Y con <em>was/were</em> NO necesitas <em>did</em>.',
      commonMistake: { bad: 'Yesterday I was go to work. Did you checked the door?', good: 'Yesterday I WENT to work. Did you CHECK the door?', exp: 'Nunca mezcles "was" con otro verbo en forma simple ni dejes -ed después de "Did".' },
      falseCognate: { term: 'Assist vs Attend (in past)', mistake: 'I assisted to the workshop yesterday', correct: 'I ATTENDED the workshop / I ASSISTED my colleague', tip: '"Attend" es asistir/estar presente; "assist" es ayudar técnicamente.' },
      vocab: [
        { en: 'Yesterday / Last week', es: 'Ayer / La semana pasada', ipa: '/ˈjɛstərdeɪ/', pinkStress: 'YES-ter-day', example: 'I was in Mexicali last week.', exampleES: 'Estuve en Mexicali la semana pasada.' },
        { en: 'Was / Were', es: 'Fue, estuvo / Fueron, estuvieron', ipa: '/wʌz / wɜr/', pinkStress: 'WAS / WERE', example: 'The sensor was offline; we were busy.', exampleES: 'El sensor estaba desconectado; estábamos ocupados.' },
        { en: 'Went (go) / Had (have)', es: 'Fue / Tuvo', ipa: '/wɛnt / hæd/', pinkStress: 'WENT / HAD', example: 'After class we went to the cafeteria and had lunch.', exampleES: 'Después de clase fuimos al comedor y comimos.' },
        { en: 'Worked / Checked', es: 'Trabajó / Revisó', ipa: '/wɜrkt / tʃɛkt/', pinkStress: 'WORKED / CHECKED', example: 'She worked late and checked all badges.', exampleES: 'Trabajó tarde y revisó todos los gafetes.' },
        { en: 'Saw (see) / Made (make)', es: 'Vio / Hizo', ipa: '/sɔ / meɪd/', pinkStress: 'SAW / MADE', example: 'We saw a warning light and made a note.', exampleES: 'Vimos una luz de alerta e hicimos una nota.' },
        { en: 'Ago', es: 'Hace (tiempo atrás)', ipa: '/əˈɡoʊ/', pinkStress: 'a-GO', example: 'Our team arrived two days ago.', exampleES: 'Nuestro equipo llegó hace dos días.' }
      ],
      dialogue: [
        { speaker: 'Maya', en: 'Hi Diego! Were you in the robotics lab yesterday afternoon?', es: '¡Hola Diego! ¿Estuviste en el lab de robótica ayer en la tarde?' },
        { speaker: 'Diego', en: "No, I wasn't. I went to the aerospace park for a tour with my team.", es: 'No, no estuve. Fui al parque aeroespacial a un recorrido con mi equipo.' },
        { speaker: 'Maya', en: 'Oh, cool! How was it?', es: '¡Oh, genial! ¿Cómo estuvo?' },
        { speaker: 'Diego', en: 'It was amazing! We saw CNC arms and had a Q&A with a supervisor.', es: '¡Estuvo increíble! Vimos brazos CNC y tuvimos sesión de preguntas con un supervisor.' }
      ],
      drills: [
        { q: '___ the conference good yesterday? — Yes, it ___ really useful.', opts: ['Was / was', 'Were / were', 'Did / was', 'Was / did'], ans: 0, exp: '"conference" e "it" son singulares → "Was / was".', socraticHint: 'Adjetivo "good" exige pasado de to be.' },
        { q: 'Last Friday our group ___ to the semiconductor plant and ___ the cleanroom.', opts: ['went / saw', 'go / see', 'goed / sawed', 'went / seen'], ans: 0, exp: 'Irregulares clave A1: go → went; see → saw.', socraticHint: 'Formas pasadas irregulares de go y see.' },
        { q: 'Did you ___ the maintenance log yesterday?', opts: ['finish', 'finished', 'finishes', 'was finish'], ans: 0, exp: 'Con auxiliar "Did" el verbo regresa a su forma base ("finish").', socraticHint: 'No dupliques el pasado.' },
        { q: 'Where ___ you and Carlos two hours ago?', opts: ['were', 'was', 'did', 'are'], ans: 0, exp: '"you and Carlos" es plural → "were".', socraticHint: 'To be pasado en plural.' }
      ],
      classroomActivity: {
        title: 'Entrevista Relámpago "What Happened Yesterday?"',
        grouping: 'Parejas',
        materials: '5 preguntas del pasado en Power Sheet',
        steps: ['Alumno A pregunta: "Where were you at 8 PM yesterday?", "What did you do?", "Did you work/study?".', 'B contesta usando al menos 1 was/were y 2 verbos pasados (worked/went/had/saw).', 'Cada alumno redacta 2 líneas de diario del día de ayer en su hoja.']
      },
      powerSheet: {
        fillBlanks: [
          '1. The workshop ___ very interesting yesterday. (was / were)',
          '2. ___ you at home last night? — No, we ___. (Were, weren\'t)',
          '3. After dinner I ___ to bed at 10:30 PM. (went / go)',
          '4. Did she ___ the test? Yes, she worked hard! (pass / passed)'
        ],
        reorder: [
          'last / in Tijuana / I / month / was / .',
          'yesterday / Did / work / you / late / ?'
        ],
        writePrompt: 'Escribe 1 oración con was/were y 1 con went/worked/had sobre ayer o tu fin de semana:',
        answerKey: "1) was · 2) Were, weren't · 3) went · 4) pass | Orden: I was in Tijuana last month. / Did you work late yesterday?"
      }
    },
    {
      id: 'a1-c20', unitId: 'a1-u4', level: 'A1', classNum: 20, coreType: 'CORE', eaqualsRef: '#74, #149',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Going to (Plans), Basic Comparatives/Superlatives & A1 Crucible',
      titleES: 'Planes Futuros (Going to), Comparativos Básicos y Crisol A1',
      grammarFocus: 'be going to + V (plans) · Basic Comparatives (-er than / better / worse) & Superlatives (the -est / best) · Full A1 Synthesis',
      canDo: 'Anunciar planes cercanos con going to, hacer comparaciones simples entre opciones y superar el Crisol Integral A1.',
      industryContext: 'Comparación rápida de dos herramientas/rutas y plan de trabajo para el siguiente turno + Crisol Día 1–4.',
      warmupPrompt: '¿Cómo dices "Voy a revisar el motor mañana" y "Este autobús es más rápido que el otro"? Hoy cerramos A1 listo para la industria.',
      grammarFormulaHtml: makeFormula('S + am/is/are + GOING TO + V', '|', 'Adj corto + -er + THAN', '|', 'THE + Adj corto + -est / good→better→best', "I'm <strong>going to study</strong> tonight. · This bus is <strong>faster than</strong> the train. · Line 2 is <strong>the best</strong>."),
      explanationES: 'Usa <code>am/is/are + going to + verbo base</code> para hablar de planes e intenciones futuras (<em>We\'re going to visit the plant tomorrow</em>). Para comparar dos cosas con adjetivos cortos (1 sílaba) agrega <code>-er + than</code> (<em>taller than, faster than</em>); con adjetivos largos usa <code>more + adj + than</code>. Irregulares clave: <em>good → better → the best</em>.',
      goldenRuleES: 'Con "going to" recuerda SIEMPRE incluir <code>am / is / are</code> antes (<em>She IS going to call</em>). Y para el superlativo no olvides el artículo <code>the</code> (<em>the fastest machine</em>).',
      commonMistake: { bad: 'I going to work tomorrow. This tool is more fast than that.', good: "I'm going to work tomorrow. This tool is FASTER than that.", exp: '"going to" exige am/is/are; los adjetivos cortos usan "-er", no "more".' },
      falseCognate: { term: 'Pretend vs Intend (Going to)', mistake: 'I pretend to finish tonight', correct: 'I am going to finish / I intend to finish', tip: '"Pretend" en inglés significa ¡fingir! Para intenciones di "I\'m going to" o "I plan to".' },
      vocab: [
        { en: 'Going to / Tomorrow', es: 'Ir a (plan) / Mañana', ipa: '/ˈɡoʊɪŋ tu / təˈmɑroʊ/', pinkStress: 'GO-ing to / to-MOR-row', example: "We're going to clean Lab 1 tomorrow.", exampleES: 'Vamos a limpiar el Lab 1 mañana.' },
        { en: 'Faster / Cheaper (than)', es: 'Más rápido / Más económico (que)', ipa: '/ˈfæstər / ˈtʃipər/', pinkStress: 'FAST-er / CHEAP-er', example: 'The new printer is faster than the old one.', exampleES: 'La nueva impresora es más rápida que la vieja.' },
        { en: 'Better / The best', es: 'Mejor / El mejor', ipa: '/ˈbɛtər / ðə bɛst/', pinkStress: 'BET-ter / BEST', example: 'Morning shift is better than night shift for me.', exampleES: 'El turno matutino es mejor que el nocturno para mí.' },
        { en: 'Visit / Practice', es: 'Visitar / Practicar', ipa: '/ˈvɪzɪt / ˈpræktɪs/', pinkStress: 'VIS-it / PRAC-tice', example: "They're going to visit London next summer.", exampleES: 'Ellos van a visitar Londres el próximo verano.' },
        { en: 'Safe / Safer / The safest', es: 'Seguro / Más seguro / El más seguro', ipa: '/ˈseɪfər/', pinkStress: 'SAF-er', example: 'Always pick the safest route inside the warehouse.', exampleES: 'Elige siempre la ruta más segura dentro del almacén.' },
        { en: 'Plan / Goal', es: 'Plan / Meta', ipa: '/plæn / ɡoʊl/', pinkStress: 'PLAN / GOAL', example: 'Our goal is A1 mastery with zero safety incidents.', exampleES: 'Nuestra meta es dominar A1 con cero incidentes.' }
      ],
      dialogue: [
        { speaker: 'Alex', en: 'Hi Maya! What are you going to do this evening?', es: '¡Hola Maya! ¿Qué vas a hacer hoy en la tarde-noche?' },
        { speaker: 'Maya', en: "I'm going to buy a new caliper. Mine is old, and the digital one is faster than the manual one.", es: 'Voy a comprar un calibrador nuevo. El mío está viejo, y el digital es más rápido que el manual.' },
        { speaker: 'Alex', en: 'Good choice! Where is the tool store? Is it better than Online Depot?', es: '¡Buena elección! ¿Dónde está la tienda? ¿Es mejor que Online Depot?' },
        { speaker: 'Maya', en: 'Yes, it\'s cheaper and right across from the station at 310 Elm St.!', es: '¡Sí, es más barata y justo frente a la estación en 310 Elm St.!' }
      ],
      drills: [
        { q: 'We ___ to attend a robotics seminar tomorrow morning.', opts: ['are going', 'going', 'will going', 'go'], ans: 0, exp: '"We are going to + verbo".', socraticHint: 'No olvides "are" antes de "going to".' },
        { q: 'Carlos is ___ than Miguel, and Ana is ___ at English in our team.', opts: ['taller / the best', 'more tall / best', 'tallest / better', 'taller / more good'], ans: 0, exp: 'Comparativo de 1 sílaba: taller than; superlativo irregular: the best.', socraticHint: 'good → better → the best.' },
        { q: 'Are they going ___ the new lab this Friday?', opts: ['to inspect', 'inspect', 'inspecting', 'inspected'], ans: 0, exp: 'Estructura completa: be + going + to + verbo base.', socraticHint: 'Falta el marcador "to + verbo".' },
        { q: 'Bus Route A costs $2 and Bus B costs $4. Route A is ___ than Route B.', opts: ['cheaper', 'more cheap', 'cheapest', 'the cheaper'], ans: 0, exp: 'Adjetivo corto "cheap" forma comparativo con -er.', socraticHint: 'Comparando dos rutas con adjetivo corto.' }
      ],
      classroomActivity: {
        title: 'Crisol Integrador A1 ("El Primer Día Completo")',
        grouping: 'Tríos (Candidato, Supervisor/Recepción, Observador)',
        materials: 'Power Sheet A1-C20 + Tarjeta de Escenario Integrador',
        steps: ['Ronda de 3 min por candidato cubriendo 5 puntos A1: saludo/nombre, dirección, lugares/direcciones, rutina presente y plan con going to.', 'El observador verifica 5 casillas (To be, Address/Prepositions, Present Simple/Continuous, Imperative/Can, Past/Going to).', 'Cierre en plataforma con Voice Crucible Boss A1 (20 min).']
      },
      powerSheet: {
        fillBlanks: [
          '1. Tomorrow our team is ___ to test the prototype. (going / go)',
          '2. This electric bus is ___ than the old diesel bus. (quieter / more quiet)',
          '3. Safety is ___ priority on our shopfloor. (the best / the most high)',
          '4. Are you ___ to visit the plant on Monday? (going / goes)'
        ],
        reorder: [
          'are / make / tonight / We / pizza / going to / .',
          'better / Line 2 / than / Line 1 / is / .'
        ],
        writePrompt: 'Cierre A1: Escribe tu plan para mañana (going to) y compara 2 objetos o rutas (comparativo):',
        answerKey: '1) going · 2) quieter · 3) the best (o highest) · 4) going | Orden: We are going to make pizza tonight. / Line 2 is better than Line 1.'
      }
    }

    // =========================================================================
    // NIVEL A2 — 20 CLASES MODULARES (a2-c01 .. a2-c20)
    // =========================================================================
    ,{
      id: 'a2-c01', unitId: 'a2-u1', level: 'A2', classNum: 1, coreType: 'CORE', eaqualsRef: '#20, #67',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Simple Past Consolidation: Regular (-ed) & Irregular Logs',
      titleES: 'Pasado Simple Consolidado: Regulares e Irregulares de Turno',
      grammarFocus: 'Regular -ed (/t/, /d/, /ɪd/) + High-frequency irregulars (gave, bought, found, broke, took, sent)',
      canDo: 'Relatar acciones terminadas del turno o día anterior combinando verbos regulares e irregulares.',
      industryContext: 'Bitácoras de mantenimiento del turno previo y registro de reparaciones pasadas.',
      warmupPrompt: '¿Por qué "worked" suena con /t/, "logged" con /d/ y "calibrated" añade una sílaba /ɪd/?',
      grammarFormulaHtml: makeFormula('Sujeto + V-ed / Irregular V2', '|', 'Neg: didn\'t + V base', '+', 'yesterday / ago / last week', 'We <strong>replaced</strong> the seal and <strong>found</strong> a leak two hours ago.'),
      explanationES: 'Los verbos regulares en pasado terminan en <code>-ed</code> con tres sonidos (/t/ tras sordo, /d/ tras sonoro, /ɪd/ tras t/d). Los irregulares cambian su raíz (<em>buy→bought, find→found, break→broke, give→gave, send→sent</em>).',
      goldenRuleES: 'Nunca pronuncies la "-e" de "-ed" en verbos como *worked, checked, tripped* (suenan /wɜrkt/, /tʃɛkt/, /trɪpt/ en 1 sola sílaba).',
      commonMistake: { bad: 'He breaked the clamp and didn\'t told me.', good: 'He BROKE the clamp and didn\'t TELL me.', exp: '"break" es irregular (broke); tras "didn\'t" vuelve la forma base (tell).' },
      falseCognate: { term: 'Realize', mistake: 'Realizar una tarea', correct: 'Darse cuenta (comprensión mental)', tip: 'Para "realizar un mantenimiento" usa "perform" o "carry out", no "realize".' },
      vocab: [
        { en: 'Malfunction / Tripped', es: 'Desperfecto / Se disparó', ipa: '/mælˈfʌŋkʃən/', pinkStress: 'mal-FUNC-tion', example: 'Breaker 4 tripped during the night shift.', exampleES: 'El interruptor 4 se disparó en el turno nocturno.' },
        { en: 'Replaced / Calibrated', es: 'Reemplazado / Calibrado', ipa: '/rɪˈpleɪst/', pinkStress: 're-PLACED', example: 'I replaced the belt and calibrated the scale.', exampleES: 'Reemplacé la banda y calibré la báscula.' },
        { en: 'Found (find) / Broke (break)', es: 'Encontró / Se rompió', ipa: '/faʊnd / broʊk/', pinkStress: 'FOUND / BROKE', example: 'She found why the bracket broke.', exampleES: 'Ella encontró por qué se rompió el soporte.' },
        { en: 'Sent (send) / Took (take)', es: 'Envió / Tomó', ipa: '/sɛnt / tʊk/', pinkStress: 'SENT / TOOK', example: 'We sent the report; it took twenty minutes.', exampleES: 'Enviamos el reporte; tomó veinte minutos.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'What happened on Conveyor 2 last night?', es: '¿Qué pasó en la banda 2 anoche?' },
        { speaker: 'Tech', en: 'The thermal relay tripped at 11:00 PM. We found a loose wire.', es: 'El relevador térmico se disparó a las 11 PM. Hallamos un cable suelto.' },
        { speaker: 'Lead', en: 'Did you replace the relay?', es: '¿Reemplazaron el relevador?' },
        { speaker: 'Tech', en: 'Yes, we bought a spare from Crib B, installed it, and ran a 10-minute test.', es: 'Sí, trajimos un repuesto del almacén B, lo instalamos e hicimos prueba de 10 min.' }
      ],
      drills: [
        { q: 'Two hours ago the maintenance team ___ the coolant filter and ___ the line.', opts: ['replaced / tested', 'replacet / test', 'did replaced / tested', 'replace / testing'], ans: 0, exp: 'Ambas acciones terminadas usan pasado simple regular (-ed).', socraticHint: '"Two hours ago" indica pasado cerrado.' },
        { q: 'Which -ed verb adds an extra syllable (/ɪd/) when pronounced?', opts: ['calibrated', 'checked', 'logged', 'stopped'], ans: 0, exp: 'Solo verbos terminados en sonido /t/ o /d/ añaden sílaba /ɪd/ ("cal-i-brat-ed").', socraticHint: 'Observa la consonante final de la raíz.' },
        { q: 'Yesterday afternoon our supplier ___ the updated CAD drawings by email.', opts: ['sent', 'sended', 'send', 'was send'], ans: 0, exp: 'Pasado irregular de "send" es "sent".', socraticHint: 'Irregular d→t.' }
      ],
      classroomActivity: {
        title: 'Clasificación Fonética -ed & Bitácora en Parejas',
        grouping: 'Parejas (13 min)',
        materials: '8 verbos en pizarrón (/t/, /d/, /ɪd/) + 4 eventos pasados',
        steps: ['Clasifican 6 verbos por sonido final (/t/, /d/, /ɪd/) y los pronuncian en voz alta.', 'Construyen oralmente un reporte de 4 líneas del día anterior combinando 2 regulares + 2 irregulares.']
      },
      powerSheet: {
        fillBlanks: ['1. Last night Breaker 2 ___ at 02:00 AM. (trip)', '2. She ___ the lost key under the bench. (find)', "3. I ___ buy parts; we had spares. (didn't)", '4. Sonido /ɪd/: ___ (checked / calibrated)'],
        reorder: ['sent / an hour ago / They / the invoice / .', 'did / arrive / When / shipment / the / ?'],
        writePrompt: 'Redacta 3 renglones de bitácora sobre algo que reparaste o completaste la semana pasada:',
        answerKey: "1) tripped · 2) found · 3) didn't · 4) calibrated | Orden: They sent the invoice an hour ago. / When did the shipment arrive?"
      }
    },
    {
      id: 'a2-c02', unitId: 'a2-u1', level: 'A2', classNum: 2, coreType: 'CORE', eaqualsRef: '#48, #61',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Wh-Questions in the Past & Sequential Time Linkers',
      titleES: 'Preguntas Abiertas en Pasado y Conectores Secuenciales',
      grammarFocus: 'Where/When/How/Why + did + S + V? · Linkers: First, Then, After that, Finally',
      canDo: 'Investigar hechos pasados con preguntas específicas y narrar eventos en orden cronológico.',
      industryContext: 'Indagatoria de incidentes (5 Whys iniciales) y crónica ordenada de viajes o procedimientos.',
      warmupPrompt: 'Cuando alguien dice "The server crashed!", ¿qué 4 preguntas (Who/When/Where/Why) lanzas primero?',
      grammarFormulaHtml: makeFormula('Wh-Word + did + Sujeto + Verbo base?', '|', 'First..., Then..., After that..., Finally...', '', '', '<strong>Where did</strong> she go? · <strong>How did</strong> it fail? · <strong>First</strong> we checked power; <strong>after that</strong>, we reset PLC.'),
      explanationES: 'Las preguntas abiertas en pasado siguen la regla fija <code>Wh + did + Sujeto + Verbo simple</code> (excepto cuando <em>Who/What</em> es el sujeto: <em>Who broke the valve?</em>). Ordena narrativas pasadas con <code>First → Next / Then → After that → Finally</code>.',
      goldenRuleES: 'Cada conector secuencial al inicio de frase se separa con una coma: <em>After that, we stayed in Puebla.</em>',
      commonMistake: { bad: 'Why did the pump stopped? Where you went yesterday?', good: 'Why did the pump STOP? Where DID you go yesterday?', exp: 'Con "did" el verbo queda en base; toda pregunta normal necesita auxiliar "did".' },
      falseCognate: { term: 'Actually / Finally', mistake: 'Confundir secuencia temporal con resumen', correct: 'Finally = al final de una secuencia de eventos', tip: 'Usa "Finally" como último paso de una lista de acciones en pasado.' },
      vocab: [
        { en: 'First / After that', es: 'Primero / Después de eso', ipa: '/fɜrst / ˈæftər ðæt/', pinkStress: 'FIRST / AF-ter that', example: 'First we shut down power; after that, we tagged it.', exampleES: 'Primero cortamos energía; después etiquetamos.' },
        { en: 'Downtime', es: 'Tiempo muerto / Paro', ipa: '/ˈdaʊntaɪm/', pinkStress: 'DOWN-time', example: 'How long did the downtime last?', exampleES: '¿Cuánto duró el tiempo muerto?' },
        { en: 'Sequence', es: 'Secuencia', ipa: '/ˈsikwəns/', pinkStress: 'SE-quence', example: 'Explain the failure sequence step by step.', exampleES: 'Explica la secuencia de falla paso a paso.' },
        { en: 'Finally', es: 'Finalmente', ipa: '/ˈfaɪnəli/', pinkStress: 'FI-nal-ly', example: 'Finally, Line 1 restarted normally.', exampleES: 'Finalmente, la Línea 1 reinició normalmente.' }
      ],
      dialogue: [
        { speaker: 'Auditor', en: 'When did you notice the cooling leak?', es: '¿Cuándo notaron la fuga de refrigerante?' },
        { speaker: 'Tech', en: 'Around 10:00 AM. First, an alarm beeped. Then, pressure dropped.', es: 'Cerca de las 10 AM. Primero sonó alarma; luego cayó la presión.' },
        { speaker: 'Auditor', en: 'And how did you fix it?', es: '¿Y cómo la repararon?' },
        { speaker: 'Tech', en: 'After that, we tightened the flange, and finally we tested the seal.', es: 'Después apretamos la brida y finalmente probamos el sello.' }
      ],
      drills: [
        { q: 'Where ___ the calibration specialist travel last Tuesday?', opts: ['did / -', 'did / traveled', 'was / -', 'went / did'], ans: 0, exp: '"Where did [sujeto] [verbo base]?" → Where did the specialist travel?', socraticHint: 'Usa "did" + verbo sin -ed.' },
        { q: '___ we visited the supplier; ___, we drove to the warehouse; ___, we flew home.', opts: ['First / After that / Finally', 'Finally / First / Then', 'Last / Before / First', 'After / Finally / First'], ans: 0, exp: 'Secuencia lógica cronológica: First → After that → Finally.', socraticHint: 'Orden cronológico de inicio a fin.' },
        { q: '___ turned off the main breaker yesterday?', opts: ['Who', 'Who did', 'Where did', 'Why'], ans: 0, exp: 'Cuando "Who" pregunta QUIÉN realizó la acción (sujeto), no se usa "did".', socraticHint: 'Pregunta por el sujeto de la acción.' }
      ],
      classroomActivity: {
        title: 'Entrevista Periodística de Incidente / Viaje',
        grouping: 'Parejas',
        materials: '4 conectores en tarjeta',
        steps: ['A narra una historia real de falla técnica o viaje usando First, Then, After that, Finally.', 'B hace 4 preguntas Wh- en pasado (Where/Why/When/How did...?) para sacar detalles.', 'Intercambian roles.']
      },
      powerSheet: {
        fillBlanks: ['1. How long ___ the outage last? (did / was)', '2. Why didn\'t they ___ the manager? (call / called)', '3. ___, I unplugged the cable; ___, I checked the fuse. (First, Then)', '4. ___, the machine passed inspection. (Finally / At first)'],
        reorder: ['travel / did / How / Saltillo / they / to / ?', 'left / Then / went / home / and / we / .'],
        writePrompt: 'Narra en 4 pasos breves qué hiciste la última vez que resolviste un problema:',
        answerKey: '1) did · 2) call · 3) First, Then · 4) Finally | Orden: How did they travel to Saltillo? / Then we left and went home.'
      }
    },
    {
      id: 'a2-c03', unitId: 'a2-u1', level: 'A2', classNum: 3, coreType: 'CORE', eaqualsRef: '#68',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Past Continuous vs Simple Past (when / while)',
      titleES: 'Pasado Continuo vs Pasado Simple (when / while)',
      grammarFocus: 'was / were + V-ing (background action) · Simple Past (interruption) · while vs when',
      canDo: 'Describir qué estaba ocurriendo en el fondo cuando un evento puntual lo interrumpió.',
      industryContext: 'Investigación de accidentes, fallas durante corrida continua y crónicas reales.',
      warmupPrompt: '¿Cómo cuentas dos acciones simultáneas y una interrupción? "Estábamos corriendo la prueba CUANDO el sensor falló."',
      grammarFormulaHtml: makeFormula('S + was/were + V-ing (acción larga)', '+', 'WHEN + S + V-pasado (interrupción)', '|', 'WHILE + Pasado Continuo', 'The robot <strong>was welding</strong> <strong>when</strong> the power <strong>went out</strong>. · <strong>While</strong> I was driving, it rained.'),
      explanationES: 'El <strong>Pasado Continuo</strong> (<code>was/were + V-ing</code>) pinta el escenario o acción en progreso en el pasado; el <strong>Pasado Simple</strong> marca el evento corto que interrumpe. Regla práctica: <code>while</code> introduce la acción en progreso; <code>when</code> suele introducir la acción breve.',
      goldenRuleES: 'No uses verbos estáticos (<em>know, want, like, believe</em>) en continuo: di "I knew", no *"I was knowing"*.',
      commonMistake: { bad: 'While I drove to work, a tire was popping.', good: 'While I WAS DRIVING to work, a tire POPPED.', exp: 'Manejar es la acción larga de fondo (was driving); reventar la llanta es la interrupción puntual (popped).' },
      falseCognate: { term: 'Incident vs Accident', mistake: 'Llamar "accident" a cualquier desvío', correct: 'Near-miss / Incident = incidente sin daño o leve | Accident = accidente con lesión/daño', tip: 'En EHS industrial distingue "We were walking when a tool fell—an incident".' },
      vocab: [
        { en: 'While / When', es: 'Mientras / Cuando', ipa: '/waɪl / wɛn/', pinkStress: 'WHILE / WHEN', example: 'While the belt was running, a jam occurred.', exampleES: 'Mientras la banda corría, ocurrió un atasco.' },
        { en: 'Vibrate / Overheat', es: 'Vibrar / Sobrecalentarse', ipa: '/ˈvaɪbreɪt/', pinkStress: 'VI-brate / o-ver-HEAT', example: 'The spindle was vibrating heavily.', exampleES: 'El husillo estaba vibrando fuerte.' },
        { en: 'Suddenly / Power Outage', es: 'De repente / Apagón', ipa: '/ˈsʌdənli/', pinkStress: 'SUD-den-ly', example: 'Suddenly a power outage stopped all PCs.', exampleES: 'De repente un apagón detuvo todas las PCs.' },
        { en: 'Monitor / Operate', es: 'Monitorear / Operar', ipa: '/ˈmɑnɪtər/', pinkStress: 'MON-i-tor', example: 'They were monitoring telemetry.', exampleES: 'Estaban monitoreando telemetría.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'What were you doing when the alarm went off?', es: '¿Qué estabas haciendo cuando sonó la alarma?' },
        { speaker: 'Ana', en: 'I was calibrating Station 3 while Carlos was checking voltage.', es: 'Estaba calibrando la Estación 3 mientras Carlos revisaba el voltaje.' },
        { speaker: 'Lead', en: 'Did the press stop immediately?', es: '¿Se detuvo la prensa de inmediato?' },
        { speaker: 'Ana', en: 'Yes, it was running fast when the guard sensor tripped it.', es: 'Sí, estaba corriendo rápido cuando el sensor de guarda la detuvo.' }
      ],
      drills: [
        { q: 'I ___ the safety report when the lights ___ out.', opts: ['was writing / went', 'wrote / were going', 'was writing / go', 'were writing / went'], ans: 0, exp: 'Acción de fondo ("was writing") + interrupción corta ("went out").', socraticHint: 'Larga = was/were + ing · Corta = pasado simple.' },
        { q: '___ the CNC mill was cutting aluminum, the coolant line disconnected.', opts: ['While', 'During', 'Ago', 'Where'], ans: 0, exp: '"While" introduce una cláusula completa con verbo en progreso.', socraticHint: 'Conector + sujeto + verbo.' },
        { q: 'Were the technicians ___ the motor at 3:00 PM? — Yes, they ___.', opts: ['inspecting / were', 'inspect / did', 'inspected / were', 'inspecting / was'], ans: 0, exp: 'Pregunta continua plural usa Were + V-ing + respuesta corta plural "were".', socraticHint: 'Plural "technicians" = were.' }
      ],
      classroomActivity: {
        title: '"Alibi & Plant Freeze-Frame" (Interrogatorio en Parejas)',
        grouping: 'Parejas (Inspector vs Testigo)',
        materials: 'Escenas cotidianas y de planta',
        steps: ['B elige un incidente (ej. apagón a las 4 PM). A interroga qué hacía en ese instante exacto.', 'Deben encadenar 2 pares de Past Continuous + When + Past Simple sin errores.', 'Cambian papeles y crean 1 titular breve de reporte.']
      },
      powerSheet: {
        fillBlanks: ['1. While we ___ (test) the drone, it ___ (start) to rain.', '2. I was walking home ___ I met my boss. (when / while)', '3. What ___ you ___ at 9:00 AM yesterday? (were, doing)', '4. It ___ (not rain) when the truck arrived.'],
        reorder: ['when / sleeping / rang / I / the phone / was / .', 'running / Line 2 / was / tripped / the breaker / when / .'],
        writePrompt: 'Completa una anécdota real o de taller: "I was ___ when ___":',
        answerKey: "1) were testing, started · 2) when · 3) were, doing · 4) wasn't raining | Orden: I was sleeping when the phone rang. / Line 2 was running when the breaker tripped."
      }
    },
    {
      id: 'a2-c04', unitId: 'a2-u1', level: 'A2', classNum: 4, coreType: 'EXT', eaqualsRef: '#69, #147',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Used to (Past Habits) & Adjectives Ending in -ed vs -ing',
      titleES: 'Hábitos Pasados (Used to) y Adjetivos en -ed vs -ing',
      grammarFocus: 'used to / didn\'t use to / Did you use to...? · Bored vs Boring / Confused vs Confusing / Tired vs Tiring',
      canDo: 'Comparar cómo operabas antes vs ahora (used to) y distinguir cómo te sientes (-ed) de qué causa la sensación (-ing).',
      industryContext: 'Digitalización de procesos (antes papel → hoy ERP) y retroalimentación sobre capacitaciones/manuales.',
      warmupPrompt: '¿Es correcto decir *"I am boring in this manual"*? ¡Cuidado! Eso significa "yo doy flojera"; descubre la diferencia entre -ed y -ing.',
      grammarFormulaHtml: makeFormula('S + used to + Verbo base (antes sí, ya no)', '|', 'Cosa/Causa = adj-ING', '|', 'Persona/Sentimiento = adj-ED', 'We <strong>used to log</strong> data on paper. · The manual was <strong>confusing</strong>, so I felt <strong>confused</strong>.'),
      explanationES: '<strong>Used to</strong> describe hábitos o estados pasados que ya cambiaron. En negativa e interrogativa pierde la "d": <code>didn\'t use to</code>, <code>Did you use to...?</code>. <strong>Adjetivos:</strong> usa <code>-ing</code> para describir lo que provoca la emoción (<em>a boring task</em>) y <code>-ed</code> para cómo se siente la persona (<em>I feel bored / excited / interested</em>).',
      goldenRuleES: 'Regla mnemotécnica infalible: <strong>ed = Estado Emocional</strong> (sentimiento); <strong>ing = INducen la emoción</strong> (causa).',
      commonMistake: { bad: 'Did you used to live there? I\'m very boring with that lecture.', good: 'Did you USE to live there? I\'m very BORED with that lecture.', exp: 'Con "Did" quitamos la -d a "use"; quien siente aburrimiento usa "-ed" (bored).' },
      falseCognate: { term: 'Excited vs Nervous', mistake: 'Decir "I am very nervous" cuando estás emocionado', correct: 'Excited = emocionado/entusiasmado | Nervous = nervioso/preocupado', tip: '"We are excited about our new robotics lab!"' },
      vocab: [
        { en: 'Used to / Anymore', es: 'Solía / Ya no', ipa: '/just tu/', pinkStress: 'USED to', example: 'We used to use paper checklists; not anymore.', exampleES: 'Solíamos usar hojas de papel; ya no.' },
        { en: 'Confusing / Confused', es: 'Confuso / Confundido', ipa: '/kənˈfjuzɪŋ/', pinkStress: 'con-FUS-ing', example: 'The diagram was confusing, so operators felt confused.', exampleES: 'El diagrama era confuso, así que operadores se sentían confundidos.' },
        { en: 'Tiring / Tired', es: 'Agotador / Cansado', ipa: '/ˈtaɪərɪŋ / ˈtaɪərd/', pinkStress: 'TIR-ing / TIRED', example: 'Standing 10 hours is tiring; now he is tired.', exampleES: 'Estar de pie 10 horas es agotador; ahora está cansado.' },
        { en: 'Interested / Interesting', es: 'Interesado / Interesante', ipa: '/ˈɪntrəstɪd/', pinkStress: 'IN-ter-est-ed', example: 'She is very interested in an interesting EV role.', exampleES: 'Está muy interesada en un puesto interesante de EV.' }
      ],
      dialogue: [
        { speaker: 'Leo', en: 'Did this factory use to build televisions?', es: '¿Esta fábrica solía armar televisores?' },
        { speaker: 'Sara', en: "Yes! Years ago they used to make screens here. Now we make aerospace harnesses.", es: '¡Sí! Hace años solían hacer pantallas aquí. Ahora hacemos arneses aeroespaciales.' },
        { speaker: 'Leo', en: 'Wow, is the training boring?', es: 'Vaya, ¿es aburrida la capacitación?' },
        { speaker: 'Sara', en: "Not at all! It's challenging, so nobody gets bored.", es: '¡Para nada! Es retadora, así que nadie se aburre.' }
      ],
      drills: [
        { q: 'Ten years ago our engineering team ___ print huge paper blueprints.', opts: ['used to', 'use to', 'was used', 'did used to'], ans: 0, exp: 'Afirmativa de hábito pasado = "used to + verbo base".', socraticHint: 'Acción habitual antigua que hoy cambió.' },
        { q: 'The instructions are really ___, and the new intern looks ___.', opts: ['confusing / confused', 'confused / confusing', 'confusing / confusing', 'confuse / confused'], ans: 0, exp: 'Instrucciones = causa (-ing); persona = sentimiento (-ed).', socraticHint: 'Causa → -ing · Emoción de persona → -ed.' },
        { q: "We ___ use cloud software in 2015, so audits took days.", opts: ["didn't use to", "didn't used to", 'not used to', "wasn't use to"], ans: 0, exp: 'Tras "didn\'t" vuelve "use to" sin "d".', socraticHint: 'Auxiliar "didn\'t" absorbe la terminación.' }
      ],
      classroomActivity: {
        title: '"Antes vs Hoy" + Tarjetas -ed/-ing',
        grouping: 'Parejas (13 min)',
        materials: 'Lista de cambios (teléfonos, herramientas, escuela, software)',
        steps: ['Cada alumno explica 2 cosas de su vida o tecnología usando "I used to..., but now..." y 1 "I didn\'t use to...".', 'Responden 4 tarjetas flash eligiendo -ed o -ing para describir su semana.']
      },
      powerSheet: {
        fillBlanks: ['1. My dad ___ to fix radios when he was young. (used / use)', "2. Did your school ___ to have 3D printers? (use / used)", '3. This overtime week is ___! Everyone feels ___. (tiring, tired)', '4. I am very ___ in automation courses. (interested / interesting)'],
        reorder: ['paper forms / We / to / fill out / used / .', 'movie / That / really / was / exciting / .'],
        writePrompt: 'Escribe 1 costumbre pasada tuya con "used to" y cómo te sentiste hoy con un adjetivo -ed:',
        answerKey: '1) used · 2) use · 3) tiring, tired · 4) interested | Orden: We used to fill out paper forms. / That movie was really exciting.'
      }
    },
    {
      id: 'a2-c05', unitId: 'a2-u1', level: 'A2', classNum: 5, coreType: 'CORE', eaqualsRef: '#20, #48, #67',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Storytelling & Shift Incident Logbook (A2 Hito 1 Synthesis)',
      titleES: 'Narrativa Pasada y Bitácora de Turno (Síntesis A2 U1)',
      grammarFocus: 'Integrating Simple Past + Past Continuous + Used to + Time Linkers in real shift & life stories',
      canDo: 'Relatar coherentemente un incidente o experiencia pasada completa de forma oral y escrita.',
      industryContext: 'Bitácora escrita de paro de línea (Extrusion Cell) y reporte oral en relevo de turno.',
      warmupPrompt: 'Lee una bitácora sin conectores ni tiempo verbal claro: ¿cómo la transformas en un reporte A2 profesional de 4 líneas?',
      grammarFormulaHtml: makeFormula('Contexto (Past Cont.)', '+', 'Evento (Past Simple + Linkers)', '+', 'Resolución / Resultado', 'We <strong>were running</strong> batch 4 <strong>when</strong> a belt snapped. <strong>First</strong>, we hit E-Stop. <strong>Finally</strong>, we restarted safely.'),
      explanationES: 'Al narrar una historia o falla sigue 3 actos: <strong>1) Escenario</strong> (was/were o Past Continuous); <strong>2) Suceso clave</strong> (Simple Past con <em>First, Then, After that</em>); <strong>3) Cierre</strong> (qué aprendimos o cómo se solucionó).',
      goldenRuleES: 'En bitácoras técnicas evita frases sueltas sin sujeto; especifica siempre quién hizo qué y a qué hora.',
      commonMistake: { bad: 'Line stop at 2 PM because sensor fail and mechanic change.', good: 'Line 2 stopped at 2:00 PM because a sensor failed, so mechanics replaced it.', exp: 'Asegura verbos en pasado y sujetos explícitos en cada cláusula.' },
      falseCognate: { term: 'Log vs Record', mistake: 'Traducir "bitácora" solo como "diary"', correct: 'Shift log / Maintenance logbook = bitácora operativa', tip: '"Log" como verbo también significa "registrar en bitácora".' },
      vocab: [
        { en: 'Incident / Shift Handover', es: 'Incidente / Relevo de turno', ipa: '/ˈɪnsɪdənt/', pinkStress: 'IN-ci-dent', example: 'Give a clear shift handover log.', exampleES: 'Entrega una bitácora clara de relevo.' },
        { en: 'Lasted / Experienced', es: 'Duró / Experimentó', ipa: '/ˈlæstɪd/', pinkStress: 'LAST-ed', example: 'The power drop lasted 12 minutes.', exampleES: 'La caída de energía duró 12 minutos.' },
        { en: 'Logged / Restarted', es: 'Registró / Reinició', ipa: '/lɔɡd/', pinkStress: 'LOGGED', example: 'Operators logged the error and restarted safely.', exampleES: 'Los operadores registraron el error y reiniciaron con seguridad.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Morning! How was third shift?', es: '¡Buenos días! ¿Cómo estuvo el tercer turno?' },
        { speaker: 'Tech', en: 'Smooth overall, though Conveyor 1 tripped around 3:15 AM while we were packing boxes.', es: 'Bien en general, aunque la banda 1 se disparó cerca de las 3:15 AM mientras empacábamos cajas.' },
        { speaker: 'Lead', en: 'What happened after that?', es: '¿Qué pasó después de eso?' },
        { speaker: 'Tech', en: 'First, we checked the breaker. Then, we cleared a jammed box and logged a 15-minute downtime.', es: 'Primero revisamos el interruptor. Luego sacamos una caja atorada y registramos 15 min de paro.' }
      ],
      drills: [
        { q: 'Conveyor 2 ___ for 15 minutes while the crew ___ changing a sensor.', opts: ['stopped / was', 'was stop / were', 'stopped / did', 'stops / was'], ans: 0, exp: 'Paro puntual (stopped) + acción simultánea singular crew (was).', socraticHint: 'Evento corto vs contexto en curso.' },
        { q: 'Which order makes the cleanest incident log?', opts: ['Situation → Sequence of Actions → Resolution', 'Resolution → Random Dates → No Subjects', 'Present tense only', 'Single word bullet points'], ans: 0, exp: 'Toda narrativa MCER A2 requiere marco temporal, secuencia y cierre.', socraticHint: 'Estructura narrativa estándar.' }
      ],
      classroomActivity: {
        title: 'Simulación de Relevo de Turno en Tríadas',
        grouping: 'Tríos (Turno saliente, Turno entrante, Supervisor)',
        materials: 'Plantilla de incidentes A2-C05',
        steps: ['Saliente reporta en 90 segundos un problema pasado usando at least 1 Past Continuous, 3 Past Simple y 2 conectores.', 'Entrante hace 2 preguntas Wh- de seguimiento antes de firmar.', 'Cierre con Voice Crucible y Power Sheet de unidad.']
      },
      powerSheet: {
        fillBlanks: ['1. While Line 3 ___ running, a hose leaked. (was / did)', '2. ___, we called maintenance; ___, we cleaned the floor. (First, after that)', '3. Total downtime ___ only 10 minutes. (lasted / last)', '4. We ___ the breakdown in the digital system. (logged / log)'],
        reorder: ['shift / During / tripped / the valve / night / the / .', 'clear / First / area / the / , / .'],
        writePrompt: 'Redacta tu mini-bitácora de 4 frases sobre un fallo real (auto, computadora o máquina) y cómo terminó:',
        answerKey: '1) was · 2) First, after that · 3) lasted · 4) logged | Orden: During the night shift, the valve tripped. / First, clear the area.'
      }
    },
    {
      id: 'a2-c06', unitId: 'a2-u2', level: 'A2', classNum: 6, coreType: 'CORE', eaqualsRef: '#10, #178',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Describing People: Appearance, Personality & Feelings',
      titleES: 'Descripción de Personas: Apariencia, Carácter y Estados',
      grammarFocus: 'be + adj (tall, slim, quiet, helpful) vs have + noun (brown eyes, short hair, glasses) · look like vs be like',
      canDo: 'Describir el aspecto físico, vestimenta y personalidad de compañeros o clientes.',
      industryContext: 'Reconocer a visitantes internacionales en aeropuerto/lobby y describir perfil de equipo.',
      warmupPrompt: '¿Cuál es la diferencia gigante entre "What does she LOOK LIKE?" vs "What is she LIKE?"?',
      grammarFormulaHtml: makeFormula("What's he LIKE? → Carácter (is friendly)", '|', 'What does he LOOK LIKE? → Físico', '+', 'BE (tall) vs HAVE (blue eyes / glasses)', "Marco <strong>is</strong> tall and serious, and he <strong>wears</strong> glasses. · Ana <strong>has</strong> curly hair and <strong>is</strong> very reliable."),
      explanationES: 'Usa <strong>to be + adjetivo</strong> para estatura, complexión y carácter (<em>is tall, is organized</em>); usa <strong>have + rasgo</strong> (<em>has dark hair, has blue eyes</em>) y <strong>wear</strong> para lo que se lleva puesto (<em>wears glasses / a green vest</em>).',
      goldenRuleES: '"What is she like?" pregunta por su forma de ser (<em>kind, hardworking</em>); "What does she look like?" pregunta por su apariencia física.',
      commonMistake: { bad: 'She has tall and blue eyes. He uses glasses.', good: 'She IS tall and HAS blue eyes. He WEARS glasses.', exp: 'Estatura lleva "is", ojos "has", ropa/lentes puestos usan "wear" (no "use").' },
      falseCognate: { term: 'Sympathetic vs Friendly', mistake: 'Decir "My boss is very sympathetic" por "simpático"', correct: 'Friendly / Nice = simpático | Sympathetic = comprensivo ante una pena', tip: 'Si tu colega es amable y agradable di "friendly" o "easygoing".' },
      vocab: [
        { en: 'Friendly / Reliable', es: 'Amigable / Confiable', ipa: '/rɪˈlaɪəbəl/', pinkStress: 're-LI-a-ble', example: 'Our lead technician is calm and reliable.', exampleES: 'Nuestro técnico líder es tranquilo y confiable.' },
        { en: 'Tall / Slim / Medium-height', es: 'Alto / Delgado / Estatura media', ipa: '/tɔl / slɪm/', pinkStress: 'TALL / SLIM', example: 'He is medium-height with short black hair.', exampleES: 'Es de estatura media y cabello negro corto.' },
        { en: 'Wear (glasses / badge)', es: 'Traer puesto (lentes / gafete)', ipa: '/wɛr/', pinkStress: 'WEAR', example: 'Look for a visitor wearing a navy blazer.', exampleES: 'Busca a un visitante con saco azul marino.' },
        { en: 'Quiet / Organized', es: 'Callado / Organizado', ipa: '/ˈkwaɪət / ˈɔrɡənaɪzd/', pinkStress: 'QUI-et / OR-gan-ized', example: 'She is quiet at first, yet super organized.', exampleES: 'Es callada al inicio, pero muy organizada.' }
      ],
      dialogue: [
        { speaker: 'Reception', en: 'We have a guest auditor at the airport. What does he look like?', es: 'Tenemos un auditor invitado en el aeropuerto. ¿Cómo luce?' },
        { speaker: 'Manager', en: "He's tall, has gray hair, and wears round glasses and a gray coat.", es: 'Es alto, tiene cabello gris y trae lentes redondos y abrigo gris.' },
        { speaker: 'Reception', en: "Got it! And what's he like to work with?", es: '¡Entendido! ¿Y cómo es para trabajar con él?' },
        { speaker: 'Manager', en: "Very friendly and patient, though detail-oriented on ISO logs.", es: 'Muy amigable y paciente, aunque detallista en bitácoras ISO.' }
      ],
      drills: [
        { q: 'Look for Mr. Jenkins: he ___ short beard and ___ a yellow safety vest.', opts: ['has a / is wearing', 'is a / uses', 'have / wears', 'has / wearing'], ans: 0, exp: '"has a beard" (rasgo físico) + "is wearing" (prenda puesta).', socraticHint: 'Rasgos con have · Ropa/lentes con wear.' },
        { q: '"What is your new teammate like?" means you want to know about ___.', opts: ['her personality and attitude', 'her height and hair color', 'what hobbies she likes doing', 'her home address'], ans: 0, exp: '"What + be + S + like?" pregunta carácter/cualidades.', socraticHint: 'No dice "look".' },
        { q: 'Sarah is always on time and finishes tasks well; she is really ___.', opts: ['reliable', 'sympathetic', 'boring', 'quietly'], ans: 0, exp: '"reliable" = confiable y cumplida.', socraticHint: 'Adjetivo de confiabilidad.' }
      ],
      classroomActivity: {
        title: '"Pick Up at Reception" — Perfil Físico y de Carácter',
        grouping: 'Parejas (A describe sin decir nombre, B identifica o dibuja)',
        materials: '4 tarjetas de personajes en pizarrón o aula',
        steps: ['A describe 1 personaje/compañero combinando 2 rasgos físicos (have/wear) y 2 de carácter (is).', 'B formula pregunta con look like o like para confirmar.', 'Invierten roles describiendo a su mentor o colega ideal.']
      },
      powerSheet: {
        fillBlanks: ['1. Elena ___ curly hair and ___ smart glasses. (has, wears)', '2. "What does Luis ___ like?" — "He is tall and slim." (look / be)', '3. Our manager is very ___ to new interns. (friendly / sympathetic)', '4. I feel ___ today because my code works! (excited / nervous)'],
        reorder: ['like / your / supervisor / is / What / ?', 'coat / wearing / a / is / white lab / She / .'],
        writePrompt: 'Describe en 3 frases el aspecto y personalidad de alguien de tu equipo:',
        answerKey: '1) has, wears · 2) look · 3) friendly · 4) excited | Orden: What is your supervisor like? / She is wearing a white lab coat.'
      }
    },
    {
      id: 'a2-c07', unitId: 'a2-u2', level: 'A2', classNum: 7, coreType: 'CORE', eaqualsRef: '#11',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Describing Objects, Materials, Shapes & Technical Specs',
      titleES: 'Descripción de Objetos, Materiales, Formas y Propiedades',
      grammarFocus: 'made of (metal/plastic/rubber/glass) · used for + -ing · Shapes & adjectives (round, lightweight, durable)',
      canDo: 'Describir de qué material está hecho un objeto, qué forma tiene y para qué sirve cuando no sabes su nombre exacto.',
      industryContext: 'Especificaciones de piezas, empaques, refacciones y reporte de partes faltantes.',
      warmupPrompt: '¿Cómo explicas una pieza en inglés si olvidaste cómo se llama ("Es pequeño, redondo, hecho de hule y sirve para sellar...")?',
      grammarFormulaHtml: makeFormula("It's + [Forma/Tamaño] + made of + [Material]", '+', "It's used for + [V-ing]", '|', 'A2 Specs', "This ring is <strong>small, round, and made of rubber</strong>. It's <strong>used for sealing</strong> valves."),
      explanationES: 'Para describir cualquier herramienta, objeto doméstico o componente usa 3 piezas: <strong>1) Apariencia</strong> (<em>square, round, rectangular, flat, lightweight</em>); <strong>2) Material</strong> con <code>made of</code> (<em>steel, aluminum, plastic, wood, rubber, glass</em>); <strong>3) Función</strong> con <code>used for + V-ing</code>.',
      goldenRuleES: 'Fórmula de rescate comunicativo: cuando no recuerdes una palabra técnica di <em>"It\'s a small metal thing used for..."</em> — así nunca te quedas callado.',
      commonMistake: { bad: 'Is make in plastic and use to protect.', good: 'It\'s MADE OF plastic and USED FOR protecting.', exp: '"made of" (participio pasado + preposición of) y "used for + V-ing" (o "used to + V base").' },
      falseCognate: { term: 'Plastic / Rubber vs Resistant', mistake: 'Decir "is of metal"', correct: "It's made of metal / It's metallic", tip: 'Evita traducir literalmente "es de metal" como "is of metal"; di "made of metal".' },
      vocab: [
        { en: 'Made of', es: 'Hecho de', ipa: '/meɪd ʌv/', pinkStress: 'MADE of', example: 'This housing is made of brushed aluminum.', exampleES: 'Esta carcasa está hecha de aluminio cepillado.' },
        { en: 'Rubber / Steel / Plastic', es: 'Hule / Acero / Plástico', ipa: '/ˈrʌbər / stil/', pinkStress: 'RUB-ber / STEEL', example: 'Gaskets are made of heat-resistant rubber.', exampleES: 'Los empaques están hechos de hule térmico.' },
        { en: 'Durable / Lightweight', es: 'Duradero / Ligero', ipa: '/ˈdʊrəbəl / ˈlaɪtweɪt/', pinkStress: 'DU-ra-ble / LIGHT-weight', example: 'Carbon fiber is lightweight yet durable.', exampleES: 'La fibra de carbono es ligera pero duradera.' },
        { en: 'Round / Square / Flat', es: 'Redondo / Cuadrado / Plano', ipa: '/raʊnd / skwɛr/', pinkStress: 'ROUND / SQUARE', example: 'Check the flat square bracket.', exampleES: 'Revisa el soporte plano y cuadrado.' }
      ],
      dialogue: [
        { speaker: 'Tech', en: 'I need that little connector from Shelf 2, but I forgot its name.', es: 'Necesito ese pequeño conector del estante 2, pero olvidé su nombre.' },
        { speaker: 'Clerk', en: 'Sure! What does it look like and what is it made of?', es: '¡Claro! ¿Cómo luce y de qué está hecho?' },
        { speaker: 'Tech', en: 'It\'s small, round, and made of black rubber. It\'s used for sealing oil pipes.', es: 'Es pequeño, redondo y de hule negro. Se usa para sellar tubos de aceite.' },
        { speaker: 'Clerk', en: 'Oh, you mean an O-ring! Here is a box of rubber O-rings.', es: 'Oh, ¡te refieres a un O-ring! Aquí tienes una caja.' }
      ],
      drills: [
        { q: 'Safety goggles are lightweight and made ___ polycarbonate plastic.', opts: ['of', 'from by', 'for', 'in'], ans: 0, exp: '"made of" indica el material visible del objeto.', socraticHint: 'Preposición fija tras "made".' },
        { q: 'A digital micrometer is used ___ measuring tiny tolerances.', opts: ['for', 'at', 'of', 'with to'], ans: 0, exp: '"used for + V-ing" describe la función principal del objeto.', socraticHint: 'Propósito + gerundio -ing.' },
        { q: 'Which word describes an object that weighs very little?', opts: ['lightweight', 'heavy', 'square', 'loud'], ans: 0, exp: '"lightweight" = peso ligero (opuesto de heavy).', socraticHint: 'Light (ligero) + weight (peso).' }
      ],
      classroomActivity: {
        title: '"Taboo Técnico" — Describe sin Nombrar',
        grouping: 'Parejas',
        materials: '6 objetos reales/cotidianos (taza, cable USB, engrapadora, calibrador, casco, botella)',
        steps: ['A toma un objeto secreto y lo describe sin decir el nombre usando forma + material (made of) + función (used for -ing).', 'B adivina en 30 segundos.', 'Rotan 3 rondas cada uno.']
      },
      powerSheet: {
        fillBlanks: ['1. This tray is ___ ___ stainless steel. (made of)', '2. Earplugs are used ___ reducing noise. (for / to)', '3. Carbon composite is very ___ (poco peso). (lightweight)', '4. A coin or O-ring has a ___ shape. (round / square)'],
        reorder: ['plastic / made / bottles / are / These / of / .', 'cutting / used / is / A laser / for / steel / .'],
        writePrompt: 'Describe tu celular o una herramienta de taller usando tamaño + forma + material (made of) + para qué sirve:',
        answerKey: '1) made of · 2) for · 3) lightweight · 4) round | Orden: These bottles are made of plastic. / A laser is used for cutting steel.'
      }
    },
    {
      id: 'a2-c08', unitId: 'a2-u2', level: 'A2', classNum: 8, coreType: 'CORE', eaqualsRef: '#149',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Comparatives (-er than / more...than) & Equality (as...as)',
      titleES: 'Comparativos de Superioridad e Igualdad (than / as...as)',
      grammarFocus: 'short -er + than · long more/less + adj + than · (not) as + adj + as · modifiers (much / a bit)',
      canDo: 'Sustentar comparaciones técnicas y cotidianas entre dos equipos, materiales o soluciones.',
      industryContext: 'Comparativa de motores, materiales (aluminio vs acero), costos y tiempos de ciclo.',
      warmupPrompt: '¿Por qué es error decir *"more faster than"* o *"more cheaper"*? Hoy pulimos las 3 reglas de comparación exacta.',
      grammarFormulaHtml: makeFormula('A + is + [much/a bit] + -er / more + adj', '+', 'THAN', '+', 'B | (not) as + adj + as', 'Servo motor is <strong>much faster than</strong> stepper. · Titanium is <strong>more durable than</strong> steel. · A is <strong>as accurate as</strong> B.'),
      explanationES: '<strong>1) Cortos (1 sílaba):</strong> <code>-er + than</code> (<em>faster than</em>); acabado en -y cambia a <code>-ier</code> (<em>easier than</em>). <strong>2) Largos (2+ sílabas sin -y):</strong> <code>more / less + adj + than</code>. <strong>3) Igualdad:</strong> <code>as + adj base + as</code> ("tan... como"). Refuerza diferencia con <code>much / far</code> o suaviza con <code>a bit / slightly</code>.',
      goldenRuleES: '¡Nunca combines <code>more</code> + <code>-er</code> juntos! Y tras <code>than</code> no omitas la palabra de comparación si es necesario comparar dos cosas.',
      commonMistake: { bad: 'Steel is more heavy that aluminum. Laser is as faster as CNC.', good: 'Steel is HEAVIER THAN aluminum. Laser is AS FAST AS CNC.', exp: 'heavy→heavier (no more heavy), comparación usa "than" (no "that"), y "as...as" lleva adjetivo neutro.' },
      falseCognate: { term: 'Cost-effective vs Economic', mistake: 'Decir "is more economic" para maquinaria rentable', correct: 'Cost-effective = rentable (costo-beneficio) | Cheaper = más barato', tip: '"This alloy is more cost-effective than titanium."' },
      vocab: [
        { en: 'Than / As... as', es: 'Que (comp.) / Tan... como', ipa: '/ðæn / æz/', pinkStress: 'THAN / AS', example: 'Line 2 is as clean as Line 1.', exampleES: 'La Línea 2 es tan limpia como la Línea 1.' },
        { en: 'Throughput / Efficiency', es: 'Rendimiento / Eficiencia', ipa: '/ˈθruˌpʊt/', pinkStress: 'THROUGH-put', example: 'The new pump delivers higher throughput.', exampleES: 'La bomba nueva entrega mayor rendimiento.' },
        { en: 'Tolerance / Accuracy', es: 'Tolerancia / Precisión', ipa: '/ˈtɑlərəns/', pinkStress: 'TOL-er-ance', example: 'CNC milling is more accurate than hand drilling.', exampleES: 'El fresado CNC es más preciso que el taladro manual.' },
        { en: 'Slightly / Much', es: 'Ligeramente / Mucho (más)', ipa: '/ˈslaɪtli / mʌtʃ/', pinkStress: 'SLIGHT-ly / MUCH', example: 'This model is slightly quieter.', exampleES: 'Este modelo es ligeramente más silencioso.' }
      ],
      dialogue: [
        { speaker: 'Eng 1', en: 'Should we pick Aluminum 6061 or Mild Steel for the arm bracket?', es: '¿Elegimos Aluminio 6061 o Acero al Carbón para el soporte?' },
        { speaker: 'Eng 2', en: 'Aluminum is much lighter than steel, and it\'s more corrosion-resistant.', es: 'El aluminio es mucho más ligero que el acero y más resistente a la corrosión.' },
        { speaker: 'Eng 1', en: 'True, though isn\'t steel cheaper per kilo?', es: 'Cierto, pero ¿el acero no es más barato por kilo?' },
        { speaker: 'Eng 2', en: 'Yes, slightly cheaper—yet Aluminum is as strong as our spec requires.', es: 'Sí, ligeramente más barato; sin embargo el aluminio es tan fuerte como nuestra norma exige.' }
      ],
      drills: [
        { q: 'Brushless motors are ___ and ___ than legacy brushed motors.', opts: ['quieter / more efficient', 'more quiet / efficienter', 'quieter / efficienter', 'most quiet / more efficient'], ans: 0, exp: '"quiet" → quieter; "efficient" (3 sílabas) → more efficient.', socraticHint: 'Corto (-er) vs largo (more).' },
        { q: 'The German sensor is ___ reliable ___ the Swiss model.', opts: ['as / as', 'so / than', 'as / than', 'more / as'], ans: 0, exp: 'Comparativo de igualdad = "as + adjetivo neutro + as".', socraticHint: 'Igualdad simétrica.' },
        { q: 'Shipping by air is ___ faster than sea freight, though more expensive.', opts: ['much', 'very', 'more', 'so'], ans: 0, exp: 'Para enfatizar comparativos se usa "much / far / a lot", nunca "very".', socraticHint: '"Very" no modifica comparativos (-er).' }
      ],
      classroomActivity: {
        title: 'Duelo Técnico de Especificaciones (A vs B)',
        grouping: 'Parejas (comprador vs vendedor técnico)',
        materials: '2 tarjetas de productos (Drone A vs B o Laptop A vs B)',
        steps: ['Comparan peso, batería, precio y precisión usando 3 comparativos (-er / more / less) y 1 estructura "not as... as".', 'Deciden cuál conviene comprar y justifican en 2 frases.']
      },
      powerSheet: {
        fillBlanks: ['1. Aluminum is much ___ than steel. (lighter / more light)', '2. Hybrid cars are ___ fuel-efficient ___ older sedans. (more, than)', '3. Our morning class is ___ interactive ___ the lab! (as, as)', '4. Today feels slightly ___ than yesterday. (warmer / more warm)'],
        reorder: ['than / is / copper / expensive / Gold / more / .', 'as / not / fast / Printer B / is / Printer A / as / .'],
        writePrompt: 'Compara 2 ciudades, máquinas o teléfonos usando 1 comparativo (-er/more) y 1 "as...as":',
        answerKey: '1) lighter · 2) more, than · 3) as, as · 4) warmer | Orden: Gold is more expensive than copper. / Printer B is not as fast as Printer A.'
      }
    },
    {
      id: 'a2-c09', unitId: 'a2-u2', level: 'A2', classNum: 9, coreType: 'CORE', eaqualsRef: '#142, #150, #162',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Superlatives (the -est / most) & Quantifiers (too, enough, a few)',
      titleES: 'Superlativos y Cuantificadores (too, enough, a few, several)',
      grammarFocus: 'the + -est / the most + adj + (in/of) · too + adj (excess) · adj + enough / enough + noun · a few vs a little',
      canDo: 'Destacar el máximo o mínimo de un grupo (the fastest/most durable) y evaluar si algo es excesivo (too) o suficiente (enough).',
      industryContext: 'Selección del mejor equipo en licitaciones y evaluación de capacidad/inventario suficiente.',
      warmupPrompt: '¿Por qué "too fast" es un problema mientras "fast enough" es positivo? Y ¡ojo con el orden de "enough"!',
      grammarFormulaHtml: makeFormula('THE + -est / most + adj', '|', 'TOO + Adjetivo (problema)', '|', 'Adjetivo + ENOUGH / ENOUGH + Sustantivo', "It's <strong>the fastest</strong> press <strong>in</strong> the plant. · The room is <strong>too hot</strong> / not <strong>cool enough</strong>. · Do we have <strong>enough bolts</strong>?"),
      explanationES: '<strong>Superlativos:</strong> compara 3 o más con <code>the</code> + corto<code>-est</code> (<em>the safest</em>) o largo <code>the most / the least</code> (<em>the most reliable</em>). <strong>Quantifiers:</strong> <code>too</code> = exceso indeseable; <code>enough</code> va <strong>después de adjetivos</strong> (<em>big enough</em>) pero <strong>antes de sustantivos</strong> (<em>enough time / screws</em>). Contables pocos = <code>a few</code>; incontables poco = <code>a little</code>.',
      goldenRuleES: 'En inglés el superlativo de lugar usa preposición <strong>in</strong>, no *of*: <em>the best engineer in Mexico</em> (NO *of Mexico*).',
      commonMistake: { bad: 'Is the more fast machine of the factory. We don\'t have time enough.', good: 'It\'s THE FASTEST machine IN the factory. We don\'t have ENOUGH TIME.', exp: 'Superlativo lleva "the + -est + in"; "enough" precede al sustantivo "time".' },
      falseCognate: { term: 'Sufficient / Enough', mistake: 'Abusar de "very" en lugar de "too"', correct: 'Very hot = muy caliente | Too hot = demasiado caliente (riesgoso/malo)', tip: '"Very" intensifica neutralmente; "too" indica que excede un límite.' },
      vocab: [
        { en: 'Too / Enough', es: 'Demasiado (exceso) / Suficiente', ipa: '/tu / ɪˈnʌf/', pinkStress: 'TOO / e-NOUGH', example: 'The cable isn\'t long enough; tension is too high.', exampleES: 'El cable no es lo bastante largo; la tensión es muy alta.' },
        { en: 'A few / None', es: 'Unos pocos (cont.) / Ninguno', ipa: '/ə fju / nʌn/', pinkStress: 'a FEW / NONE', example: 'Only a few sensors failed; none were damaged.', exampleES: 'Solo unos pocos sensores fallaron; ninguno se dañó.' },
        { en: 'The fastest / The worst', es: 'El más rápido / El peor', ipa: '/ðə ˈfæstɪst / wɜrst/', pinkStress: 'FAST-est / WORST', example: 'Manual logging was the worst bottleneck.', exampleES: 'El registro manual era el peor cuello de botella.' },
        { en: 'Quite / A bit', es: 'Bastante / Un poco', ipa: '/kwaɪt / ə bɪt/', pinkStress: 'QUITE / a BIT', example: 'Today\'s assembly line is quite quiet.', exampleES: 'La línea de ensamble de hoy es bastante silenciosa.' }
      ],
      dialogue: [
        { speaker: 'QA', en: 'How is our newest optical scanner performing?', es: '¿Cómo funciona nuestro nuevo escáner óptico?' },
        { speaker: 'Tech', en: "It's the most accurate scanner in our lab! Only a few parts needed manual recheck.", es: '¡Es el escáner más preciso del lab! Solo unas pocas piezas requirieron revisión manual.' },
        { speaker: 'QA', en: 'Great! Is the belt fast enough for Friday\'s quota?', es: '¡Genial! ¿Es suficientemente rápida la banda para la cuota del viernes?' },
        { speaker: 'Tech', en: 'Yes, though if we speed it up, vibration gets too strong.', es: 'Sí, aunque si la aceleramos más, la vibración se vuelve demasiado fuerte.' }
      ],
      drills: [
        { q: 'Carbon fiber provides ___ strength-to-weight ratio ___ all tested materials.', opts: ['the highest / of', 'higher / in', 'the most high / of', 'highest / than'], ans: 0, exp: '"the highest" + "of all [grupo plural]".', socraticHint: 'Superlativo de "high".' },
        { q: 'We can\'t start assembly because we don\'t have ___ aluminum brackets.', opts: ['enough', 'too many', 'a few', 'very'], ans: 0, exp: '"enough" precede a sustantivos plurales/incontables.', socraticHint: 'Cantidad suficiente antes del nombre.' },
        { q: 'The conveyor isn\'t running ___ to clear the afternoon batch.', opts: ['fast enough', 'enough fast', 'too fast', 'a few fast'], ans: 0, exp: 'Después de adjetivo/adverbio se coloca "enough": fast enough.', socraticHint: 'Adjetivo + enough.' }
      ],
      classroomActivity: {
        title: 'Auditoría Express "Too vs Enough"',
        grouping: 'Parejas',
        materials: '4 escenarios de falla/aula (habitación calurosa, cable corto, poco tiempo, presupuesto)',
        steps: ['Para cada escenario crean 1 oración con "too" y 1 solución con "not ... enough".', 'Eligen "el mejor" producto/equipo de su área usando superlativos con "in".']
      },
      powerSheet: {
        fillBlanks: ['1. This is ___ safest cleanroom ___ our state. (the, in)', '2. That motor is ___ loud; wear ear plugs! (too / enough)', '3. Do we have ___ screws for 20 units? (enough / too)', '4. Only ___ ___ friends came early. (a few / a little)'],
        reorder: ['enough / not / room / The / cool / is / .', 'is / best / team / Ours / the / in / the division / .'],
        writePrompt: 'Evalúa tu espacio de estudio o trabajo usando 1 frase con "too", 1 con "enough" y 1 superlativo:',
        answerKey: '1) the, in · 2) too · 3) enough · 4) a few | Orden: The room is not cool enough. / Ours is the best team in the division.'
      }
    },
    {
      id: 'a2-c10', unitId: 'a2-u2', level: 'A2', classNum: 10, coreType: 'CORE', eaqualsRef: '#19, #170, #171',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Describing Places, Cities & Industrial Travel Services',
      titleES: 'Describir Lugares, Ciudades y Servicios de Viaje Técnico',
      grammarFocus: 'Capital/famous for/has a population of · Hotels, airports, train stations, signs (Keep left, Exact money)',
      canDo: 'Describir ciudades y parques tecnológicos, leer señales de tránsito/servicio y resolver traslados en viaje de trabajo.',
      industryContext: 'Viajes de capacitación entre hubs (Tijuana, Mexicali, Austin, Detroit, Phoenix).',
      warmupPrompt: 'Si recibes a un colega de California en tu ciudad, ¿cómo la describes en 3 frases atractivas (famosa por, población, clima/industria)?',
      grammarFormulaHtml: makeFormula('[Ciudad] is famous for + [Sustantivo/V-ing]', '|', 'It has + [rasgo] | Services: Can you tell me the way to...?', '', '', 'Mexicali is <strong>famous for</strong> aerospace and semiconductor hubs. · Keep left. · Insert exact change.'),
      explanationES: 'Describe ciudades con bloques EAQUALS A2: <code>is the capital/center of...</code>, <code>has a population of...</code>, <code>is famous for...</code>, <code>holds an annual expo...</code>. En viaje/servicios domina letreros breves (<em>Keep left, Out of order, Exact change</em>) y petición de boletos.',
      goldenRuleES: 'Tras <strong>"famous for"</strong> usa un sustantivo o verbo en <code>-ing</code>: <em>Austin is famous for music and chip plants</em>.',
      commonMistake: { bad: 'Tijuana is famous by medical devices and have 2 million people.', good: 'Tijuana is famous FOR medical devices and HAS 2 million people.', exp: 'Preposición fija: "famous FOR"; 3ª persona singular ciudad usa "HAS".' },
      falseCognate: { term: 'Ticket / Fine vs Return Ticket', mistake: 'Pedir "a round travel"', correct: 'Round-trip / Return ticket = boleto redondo | One-way ticket = sencillo', tip: '"Two round-trip tickets to San Diego, please."' },
      vocab: [
        { en: 'Famous for / Population', es: 'Famoso por / Población', ipa: '/ˈfeɪməs fɔr/', pinkStress: 'FA-mous for', example: 'Saltillo is famous for automotive manufacturing.', exampleES: 'Saltillo es famoso por la manufactura automotriz.' },
        { en: 'Architecture / Corridor', es: 'Arquitectura / Corredor industrial', ipa: '/ˈɑrkəˌtɛktʃər/', pinkStress: 'AR-chi-tec-ture', example: 'The border corridor brings global suppliers.', exampleES: 'El corredor fronterizo atrae proveedores globales.' },
        { en: 'Out of Order / Exact Change', es: 'Fuera de servicio / Cambio exacto', ipa: '/aʊt əv ˈɔrdər/', pinkStress: 'out of OR-der', example: 'The ticket machine is out of order.', exampleES: 'La máquina de boletos está fuera de servicio.' },
        { en: 'Round-Trip / Check-In', es: 'Viaje redondo / Registro', ipa: '/raʊnd trɪp/', pinkStress: 'ROUND-trip', example: 'I need a round-trip shuttle pass.', exampleES: 'Necesito un pase redondo de transporte.' }
      ],
      dialogue: [
        { speaker: 'Visitor', en: 'First time in Querétaro! What is the city famous for?', es: '¡Primera vez en Querétaro! ¿Por qué es famosa la ciudad?' },
        { speaker: 'Host', en: 'It\'s famous for colonial architecture and a growing aerospace industrial park.', es: 'Es famosa por su arquitectura colonial y un creciente parque aeroespacial.' },
        { speaker: 'Visitor', en: 'Awesome! Also, how do I get to the shuttle? Is that kiosk working?', es: '¡Genial! Además, ¿cómo tomo el transporte? ¿Funciona ese quiosco?' },
        { speaker: 'Host', en: 'No, it says "Out of Order"—buy a round-trip ticket at Desk 2.', es: 'No, dice "Fuera de servicio"; compra un boleto redondo en el mostrador 2.' }
      ],
      drills: [
        { q: 'Edinburgh is ___ for its historic castle and annual arts festival.', opts: ['famous', 'fame', 'popular by', 'know'], ans: 0, exp: 'Expresión exacta EAQUALS A2: "famous for".', socraticHint: 'Adjetivo + preposición "for".' },
        { q: 'You see a sign on a vending machine reading "Out of order". What does it mean?', opts: ['It is broken / not working.', 'It only takes coins.', 'Keep left.', 'Authorized personnel only.'], ans: 0, exp: '"Out of order" = descompuesto / fuera de servicio.', socraticHint: 'Letrero común de servicio.' },
        { q: 'I need to travel to El Paso and come back tonight. I\'d like a ___ ticket.', opts: ['round-trip', 'one-way', 'going-only', 'return back'], ans: 0, exp: 'Ida y vuelta en EE. UU. = round-trip ticket (UK: return ticket).', socraticHint: 'Boleto de regreso incluido.' }
      ],
      classroomActivity: {
        title: 'Mini-Guía Turística & Corporativa de Tu Ciudad',
        grouping: 'Parejas (Anfitrión local vs Ingeniero extranjero)',
        materials: '4 puntos descriptivos (population, famous for, architecture/parks, transport)',
        steps: ['A presenta su ciudad o estado en 60 segundos incluyendo 2 datos industriales y 2 culturales.', 'B pregunta sobre hospedaje y transporte usando expresiones de servicio.', 'Escriben una ficha postal de 3 frases en el Power Sheet.']
      },
      powerSheet: {
        fillBlanks: ['1. Guadalajara is ___ ___ software and electronics hubs. (famous for)', '2. That coffee machine has a sign: "___ ___ ___" (fuera de servicio).', '3. We want a ___ ___ ticket (ida y vuelta) for tomorrow.', '4. The city ___ over 1 million residents. (has / have)'],
        reorder: ['has / lots of / modern / buildings / Austin / .', 'ticket / I\'d / a / Phoenix / like / to / round-trip / .'],
        writePrompt: 'Describe tu ciudad en 3 oraciones (ubicación, "famous for" y qué industrias o lugares tiene):',
        answerKey: '1) famous for · 2) Out of order · 3) round-trip · 4) has | Orden: Austin has lots of modern buildings. / I\'d like a round-trip ticket to Phoenix.'
      }
    },
    {
      id: 'a2-c11', unitId: 'a2-u3', level: 'A2', classNum: 11, coreType: 'CORE', eaqualsRef: '#74, #76',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Future Contrast: "going to" (Planned) vs "will" (Instant Decisions & Offers)',
      titleES: 'Contraste Futuro: Going to (Planes) vs Will (Decisiones y Ofertas)',
      grammarFocus: 'be going to (prior plans & visible evidence) vs will / won\'t (spontaneous decisions, offers, promises, general predictions)',
      canDo: 'Elegir con naturalidad entre going to (algo ya planeado) y will (algo que decides justo al hablar).',
      industryContext: 'Planeación de entregas/paros (going to) vs respuesta inmediata ante emergencias/ofertas (will).',
      warmupPrompt: 'Dos amigos hablan: Uno ya compró boleto ("I\'m going to fly Friday"). Al otro le avisan justo ahora ("Wait—I\'ll go with you!"). ¿Ves la diferencia?',
      grammarFormulaHtml: makeFormula('Plan Previo / Evidencia → AM/IS/ARE GOING TO + V', '|', 'Justo ahora / Promesa / Oferta → WILL / WON\'T + V', '', '', "We're <strong>going to audit</strong> Supplier B Tuesday (en agenda). · Tool fell? I'<strong>ll grab</strong> a spare right now!"),
      explanationES: 'Usa <strong>going to</strong> para planes ya decididos antes de hablar o predicciones con evidencia física visible (<em>Look at those dark clouds—it\'s going to rain / Low inventory—the line is going to stop</em>). Usa <strong>will (\'ll / won\'t)</strong> cuando decides al instante, te ofreces a ayudar (<em>I\'ll carry that box</em>) o prometes algo (<em>I won\'t forget</em>).',
      goldenRuleES: 'En conversación americana casi nunca decimos *"I will call"* completo en ofertas; suena robótico o terco. Usa la contracción natural: <strong>"I\'ll call you / I\'ll check it"</strong>.',
      commonMistake: { bad: 'Oh, no ink! Wait, I am going to check the drawer right now.', good: "Oh, no ink! Wait, I'LL CHECK the drawer right now.", exp: 'Como acaba de surgir la decisión en el momento, lo natural en inglés es "I\'ll + verbo", no "going to".' },
      falseCognate: { term: 'Compromise vs Promise', mistake: 'I make a compromise to send it', correct: 'I promise I\'ll send it / Let\'s reach a compromise', tip: '"Compromise" significa acuerdo mutuo donde ambos ceden; "promesa/compromiso personal" usa "I promise / I commit to".' },
      vocab: [
        { en: 'Deadline / Milestone', es: 'Fecha límite / Hito', ipa: '/ˈdɛdlaɪn/', pinkStress: 'DEAD-line', example: 'We are going to hit the milestone by Friday.', exampleES: 'Vamos a cumplir el hito antes del viernes.' },
        { en: 'I\'ll handle it / I\'ll help', es: 'Yo me encargo / Yo ayudo', ipa: '/aɪl ˈhændəl ɪt/', pinkStress: "I'LL HAN-dle it", example: 'Phone ringing? Hold on, I\'ll get it!', exampleES: '¿Suena el teléfono? Espera, ¡yo contesto!' },
        { en: 'Shutdown / Schedule', es: 'Paro programado / Agenda', ipa: '/ˈʃʌtdaʊn/', pinkStress: 'SHUT-down', example: 'Plant shutdown is going to start on Dec 20.', exampleES: 'El paro de planta va a iniciar el 20 de dic.' },
        { en: 'Depleted / Run out of', es: 'Agotado / Quedarse sin', ipa: '/rʌn aʊt ʌv/', pinkStress: 'RUN out of', example: 'Stock is low—we\'re going to run out of labels.', exampleES: 'El stock está bajo; nos vamos a quedar sin etiquetas.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Look at those pressure numbers—Valve 2 is going to leak if we don\'t act.', es: 'Mira esas cifras de presión; la Válvula 2 va a fugar si no actuamos.' },
        { speaker: 'Tech', en: 'Whoa, I see it! I\'ll grab the torque wrench and tighten it now.', es: '¡Uy, lo veo! Iré por la llave de torque y la aprieto ahora mismo.' },
        { speaker: 'Lead', en: 'Thanks! Also, remember we\'re going to install new sensors next Monday.', es: '¡Gracias! Además, recuerda que el próximo lunes vamos a instalar sensores nuevos.' },
        { speaker: 'Tech', en: 'Right, it\'s on my calendar. I won\'t miss the 8:00 AM briefing.', es: 'Cierto, está en mi calendario. No me perderé el briefing de las 8 AM.' }
      ],
      drills: [
        { q: 'Look at the empty tray! Line 3 ___ run out of bolts in 10 minutes.', opts: ['is going to', 'will to', 'shall', 'won\'t'], ans: 0, exp: 'Evidencia física presente en el momento ("empty tray") → "is going to".', socraticHint: 'Predicción basada en lo que ves ahorita.' },
        { q: '"This crate is heavy!" — "Don\'t worry, I ___ help you carry it."', opts: ["'ll", "'m going to", 'am', 'going to'], ans: 0, exp: 'Oferta espontánea al escuchar el problema → "I\'ll".', socraticHint: 'Decisión tomada en este instante.' },
        { q: 'I promise I ___ send the calibrated data sheet by 5:00 PM.', opts: ['will', 'am going', 'to will', 'going to'], ans: 0, exp: 'Promesas formales o personales usan "will / won\'t".', socraticHint: 'Promesa explícita.' }
      ],
      classroomActivity: {
        title: 'Tablero "Planificado (Agenda) vs Emergencia en Vivo"',
        grouping: 'Parejas (13 min)',
        materials: '4 citas en calendario vs 4 imprevistos súbitos',
        steps: ['A anuncia sus planes de la semana con "going to".', 'Docente grita 4 imprevistos ("Power went out!", "Guest arrived early!", "Coffee spilled!"); alumnos reaccionan en menos de 3 segundos usando "I\'ll + verbo!"']
      },
      powerSheet: {
        fillBlanks: ["1. Next Tuesday we ___ going to meet the auditor. (are / will)", "2. Oh no, you dropped your pen! I ___ pick it up. ('ll / 'm going to)", '3. Look at those black clouds; it ___ ___ to rain. (is going)', "4. I promise I ___ forget your manual tomorrow. (won't / not going to)"],
        reorder: ['going to / audit / They / start / are / the / Monday / next / .', "send / email / you / the / today / I'll / ."],
        writePrompt: 'Escribe 1 plan que YA decidiste (going to) y 1 oferta o promesa espontánea (I\'ll...):',
        answerKey: "1) are · 2) 'll · 3) is going · 4) won't | Orden: They are going to start the audit next Monday. / I'll send you the email today."
      }
    },
    {
      id: 'a2-c12', unitId: 'a2-u3', level: 'A2', classNum: 12, coreType: 'CORE', eaqualsRef: '#13, #15, #16, #17, #75',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Future Arrangements, Suggestions, Offers & Invitations',
      titleES: 'Citas Confirmadas (Pres. Continuous), Sugerencias e Invitaciones',
      grammarFocus: 'Pres. Continuous for fixed appointments · Shall we / Let\'s / How about -ing · Would you like to...?',
      canDo: 'Agendar reuniones reales con fecha y hora, proponer planes, aceptar o rechazar invitaciones con cortesía.',
      industryContext: 'Coordinación de juntas técnicas con proveedores, almuerzos de bienvenida e itinerarios.',
      warmupPrompt: '¿Por qué un nativo dice "I\'m meeting the supplier tomorrow at 10 AM" usando Presente Continuo aunque sea futuro?',
      grammarFormulaHtml: makeFormula('Cita confirmada: S + am/is/are + V-ing + tiempo futuro', '|', "Sugerencia: Let's + V / Shall we + V?", '|', 'Invitación: Would you like to + V?', "We'<strong>re flying</strong> to Chicago Monday. · <strong>Shall we</strong> start at 9? · <strong>Would you like to</strong> join us for lunch?"),
      explanationES: 'Cuando una cita o viaje ya tiene <strong>fecha, hora o reserva confirmada</strong> (diary future), el inglés prefiere el <strong>Presente Continuo</strong> (<em>I\'m seeing the client at 11:00</em>). Sugerencias colaborativas: <code>Let\'s + V</code>, <code>Shall we + V?</code>, <code>Why don\'t we + V?</code>. Invitaciones amables: <code>Would you like to...?</code>.',
      goldenRuleES: 'Al declinar una invitación profesional no digas simplemente *"No"*; usa la fórmula de cortesía: <em>"I\'d love to, thanks, but I\'m working on a deadline."</em>',
      commonMistake: { bad: 'Shall we to go? Let\'s going to lunch! Would you like come?', good: "Shall we GO? Let's GO to lunch! Would you like TO COME?", exp: '"Shall we" y "Let\'s" van seguidos de verbo base sin "to"; "Would you like" exige "to + verbo".' },
      falseCognate: { term: 'Appointment / Reschedule', mistake: 'Confundir "date" romántica con cita laboral', correct: 'Appointment / Meeting = cita médica o laboral | Reschedule = reprogramar', tip: 'Usa "schedule an appointment" o "book a meeting", no "make a date".' },
      vocab: [
        { en: 'Reschedule / Confirm', es: 'Reprogramar / Confirmar', ipa: '/riˈskɛdʒul/', pinkStress: 're-SCHED-ule', example: 'We\'re rescheduling Friday\'s audit to Monday.', exampleES: 'Reprogramaremos la auditoría del viernes para el lunes.' },
        { en: "Let's / Shall we", es: 'Hagamos... / ¿Qué tal si...?', ipa: '/lɛts / ʃæl wi/', pinkStress: "LET'S / SHALL we", example: 'Shall we review the agenda before lunch?', exampleES: '¿Revisamos la agenda antes de comer?' },
        { en: "I'd love to, but...", es: 'Me encantaría, pero...', ipa: '/aɪd lʌv tu/', pinkStress: "I'D love to", example: "I'd love to join, but I have a lab at 2:00.", exampleES: 'Me encantaría unirme, pero tengo lab a las 2.' },
        { en: 'Follow up / Arrange', es: 'Dar seguimiento / Organizar', ipa: '/ˈfɑloʊ ʌp/', pinkStress: 'FOL-low up', example: 'I\'m meeting HR to arrange visitor passes.', exampleES: 'Me reuniré con RH para gestionar pases de visita.' }
      ],
      dialogue: [
        { speaker: 'Maya', en: 'Hey Carlos, are you coming to the robotics demo tomorrow?', es: 'Oye Carlos, ¿vienes mañana a la demo de robótica?' },
        { speaker: 'Carlos', en: 'What time? I\'m seeing our tooling vendor at 10:00 AM.', es: '¿A qué hora? Me reúno con el proveedor de herramentales a las 10 AM.' },
        { speaker: 'Maya', en: 'It\'s at 3:00 PM! Would you like to go together after lunch?', es: '¡Es a las 3 PM! ¿Te gustaría ir juntos después de comer?' },
        { speaker: 'Carlos', en: "I'd love to! Let's meet at Building A lobby at 2:45.", es: '¡Me encantaría! Nos vemos en el lobby del Edificio A a las 2:45.' }
      ],
      drills: [
        { q: 'All flights are booked: the quality team ___ to Austin next Thursday.', opts: ['is flying', 'fly', 'will to fly', 'is fly'], ans: 0, exp: 'Viaje ya reservado/confirmado usa Presente Continuo para futuro.', socraticHint: 'Cita/vuelo ya comprado y agendado.' },
        { q: 'It\'s noisy near Press 1. ___ move to Meeting Room B?', opts: ['Shall we', "Let's to", 'Would you', 'How about to'], ans: 0, exp: '"Shall we + verbo base?" hace una sugerencia abierta en pregunta.', socraticHint: 'Forma interrogativa para proponer acción conjunta.' },
        { q: '___ you like to tour our cleanroom after the briefing?', opts: ['Would', 'Do', 'Are', 'Will to'], ans: 0, exp: 'Invitación formal/cortés estándar: "Would you like to...?".', socraticHint: 'Fórmula con "Would".' }
      ],
      classroomActivity: {
        title: 'Sincronización de Agendas Ocupadas (Calendar Swap)',
        grouping: 'Parejas con agendas semanales llenas de bloqueos',
        materials: 'Mini calendario Lun–Vie en Power Sheet',
        steps: ['Cada alumno tacha 3 espacios con citas fijas ("I\'m seeing... at 10").', 'Deben negociar un hueco libre mutuo haciendo invitaciones y sugerencias ("Would you like to meet Wednesday? — No, I\'m having a class. Shall we try Thursday?").']
      },
      powerSheet: {
        fillBlanks: ["1. We'___ having a client review at 9:00 AM tomorrow. (re / will)", '2. ___ review the safety checklist first! (Let\'s / Shall)', '3. ___ we take a 10-minute coffee break? (Shall / Let\'s)', '4. Would you like ___ attend the seminar? (to / for)'],
        reorder: ['next week / meeting / am / the / director / I / .', "to / love / join / but / busy / I'd / I'm / , / ."],
        writePrompt: 'Redacta 1 invitación cortés (Would you like...?) y 1 rechazo amable con cita alternativa:',
        answerKey: "1) 're · 2) Let's · 3) Shall · 4) to | Orden: I am meeting the director next week. / I'd love to join, but I'm busy."
      }
    },
    {
      id: 'a2-c13', unitId: 'a2-u3', level: 'A2', classNum: 13, coreType: 'CORE', eaqualsRef: '#132, #133, #154',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Prepositional Phrases (Time, Place & Movement) & Word Order',
      titleES: 'Frases Preposicionales de Movimiento, Tiempo y Orden Sintáctico',
      grammarFocus: 'through, along, across, into, out of, past, toward · during / by + deadline / until · Manner + Place + Time order',
      canDo: 'Describir trayectorias en movimiento, límites de tiempo (by vs until) y ordenar adverbios al final de la frase.',
      industryContext: 'Rutas de logística/montacargas, plazos límite ("by Friday") y movimiento físico de piezas.',
      warmupPrompt: 'Diferencia decisiva en plazos: *"Finish the report BY Friday"* vs *"Work on the report UNTIL Friday"*. ¿Cuál significa "fecha tope"?',
      grammarFormulaHtml: makeFormula('Movimiento: into / out of / along / through / past', '|', 'Tiempo: BY (tope) vs UNTIL (duración)', '|', 'Orden: Manner → Place → Time', 'Forklifts move <strong>along</strong> the aisle. · Submit <strong>by</strong> 5 PM. · We worked <strong>quickly in Lab 1 yesterday</strong>.'),
      explanationES: 'Preposiciones dinámicas: <code>into</code> (entrar), <code>out of</code> (salir), <code>through</code> (atravesar túnel/puerta/proceso), <code>along</code> (a lo largo de pasillo/calle), <code>past</code> (pasar de largo). Tiempos: <code>by</code> = fecha límite máximo antes de X; <code>until</code> = acción continua hasta X; <code>during</code> + sustantivo (<em>during the shift</em>). Orden final en inglés: <strong>Modo → Lugar → Tiempo</strong>.',
      goldenRuleES: '¡Jamás pongas el lugar o tiempo entre el verbo y su objeto! Di <em>"I checked the valve at work yesterday"</em>, nunca <em>"I checked at work the valve"</em>.',
      commonMistake: { bad: 'Send the email until Friday (queriendo decir fecha tope). I finished yesterday my lab.', good: 'Send the email BY Friday. I finished my lab YESTERDAY.', exp: '"By" marca plazo límite puntual; objetos directos van pegados al verbo, no después del tiempo.' },
      falseCognate: { term: 'During vs While', mistake: 'During we worked on the press...', correct: 'DURING + sustantivo ("during the shift") | WHILE + verbo ("while we worked")', tip: 'Si sigue un sustantivo sin verbo conjugado usa "during".' },
      vocab: [
        { en: 'Through / Along', es: 'A través de / A lo largo de', ipa: '/θru / əˈlɔŋ/', pinkStress: 'THROUGH / a-LONG', example: 'Walk along Corridor A and go through Door 3.', exampleES: 'Camina por el Corredor A y cruza la Puerta 3.' },
        { en: 'Into / Out of', es: 'Hacia adentro de / Hacia afuera de', ipa: '/ˈɪntu / aʊt ʌv/', pinkStress: 'IN-to / OUT of', example: 'Load parts into the tray and take scrap out of Cell 2.', exampleES: 'Carga piezas dentro de la charola y saca merma de la Celda 2.' },
        { en: 'By [Deadline] / Until', es: 'A más tardar el... / Hasta que', ipa: '/baɪ / ənˈtɪl/', pinkStress: 'BY / un-TIL', example: 'All quotes must arrive by Friday at 5:00 PM.', exampleES: 'Todas las cotizaciones deben llegar a más tardar el viernes a las 5 PM.' },
        { en: 'During', es: 'Durante (+ sustantivo)', ipa: '/ˈdʊrɪŋ/', pinkStress: 'DU-ring', example: 'No cell phones during machine calibration.', exampleES: 'Cero celulares durante calibración de máquina.' }
      ],
      dialogue: [
        { speaker: 'Tech', en: 'How do raw wafers move through Inspection Bay 2?', es: '¿Cómo se mueven las obleas por la Bahía de Inspección 2?' },
        { speaker: 'Lead', en: 'First, carts roll along the yellow lane, go through Gate B, and stop inside Cleanroom 1.', es: 'Primero, carros ruedan por el carril amarillo, pasan Puerta B y paran en Cuarto Limpio 1.' },
        { speaker: 'Tech', en: 'Got it. And when do we submit the audit sheet? Until 4:00 PM?', es: 'Entendido. ¿Y cuándo entregamos la hoja de auditoría? ¿Hasta las 4 PM?' },
        { speaker: 'Lead', en: 'Submit it BY 4:00 PM sharp—don\'t wait until 5:00!', es: 'Entrégala A MÁS TARDAR a las 4 PM en punto; ¡no esperes hasta las 5!' }
      ],
      drills: [
        { q: 'All supplier corrective reports must be submitted ___ Friday at 17:00.', opts: ['by', 'until', 'during', 'through'], ans: 0, exp: '"by + momento futuro" expresa plazo límite ("a más tardar").', socraticHint: 'Fecha tope de entrega.' },
        { q: 'The autonomous cart traveled slowly ___ the main aisle ___ this morning.', opts: ['along / -', '- / along', 'until / during', 'into / between'], ans: 0, exp: '"along" para recorrer a lo largo de un pasillo; orden correcto verbo + modo + lugar + tiempo.', socraticHint: 'Movimiento a lo largo de línea.' },
        { q: 'Pick the sentence with natural English word order:', opts: ['They tested the engine carefully in Lab 4 yesterday.', 'They tested yesterday in Lab 4 carefully the engine.', 'They carefully tested yesterday the engine.', 'In Lab 4 they tested yesterday the engine.'], ans: 0, exp: 'Verbo + Objeto + Modo + Lugar + Tiempo.', socraticHint: 'El objeto directo va justo después del verbo.' }
      ],
      classroomActivity: {
        title: '"Recorrido de Material" + Corrección de Orden Sintáctico',
        grouping: 'Parejas (13 min)',
        materials: '4 frases desordenadas en pizarrón + mini mapa de flujo',
        steps: ['Trazan la ruta de un paquete/pieza desde llegada hasta envío usando 4 preposiciones dinámicas (into, through, along, out of).', 'Reordenan 3 oraciones aplicando regla Objeto + Modo + Lugar + Tiempo.']
      },
      powerSheet: {
        fillBlanks: ['1. Turn in your homework ___ Monday morning! (by / during)', '2. Stay inside the waiting area ___ the test ends. (until / by)', '3. Walk ___ Corridor C and step ___ the elevator. (along, into)', '4. Keep safety goggles on ___ the lab session. (during / while)'],
        reorder: ['checked / carefully / in Lab 2 / They / the pump / this morning / .', 'across / ran / The operator / bay / the / .'],
        writePrompt: 'Escribe 1 indicación usando "by [hora/día]" y 1 trayecto usando "through" o "into":',
        answerKey: '1) by · 2) until · 3) along, into · 4) during | Orden: They checked the pump carefully in Lab 2 this morning. / The operator ran across the bay.'
      }
    },
    {
      id: 'a2-c14', unitId: 'a2-u3', level: 'A2', classNum: 14, coreType: 'CORE', eaqualsRef: '#86, #87, #88',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Infinitive of Purpose (to + V), Gerunds & Verb Patterns (to + V vs V-ing)',
      titleES: 'Infinitivo de Propósito, Gerundios y Patrones Verbales',
      grammarFocus: 'Infinitive of purpose ("to check...", NOT "for check") · Verb + to V (want, plan, need, forget, decide) · Verb + V-ing (avoid, finish, enjoy) · Subject Gerund ("Testing takes time")',
      canDo: 'Explicar el propósito de una acción ("para revisar...") y combinar dos verbos seguidos sin errores de "for".',
      industryContext: 'Explicación de pasos técnicos ("press here to reset"), metas de estudio y hábitos de calidad.',
      warmupPrompt: 'Error clásico #1 en México/LATAM: decir *"I came here FOR learn English"*. ¡Descubre la palabra correcta que reemplaza al "para"!',
      grammarFormulaHtml: makeFormula('Propósito: Verbo + TO + Verbo base (¡nunca "for"!)', '|', 'Sujeto: V-ING es... | Patrón: want/need/forget + TO V', '', '', 'Press red button <strong>to stop</strong>. · <strong>Wear</strong> gloves <strong>to avoid</strong> shocks. · <strong>Checking</strong> gauges takes 5 min.'),
      explanationES: '<strong>1) Propósito ("para + verbo"):</strong> en inglés se dice SIEMPRE con <strong>to + verbo base</strong> (<em>go jogging to get fit / scan QR to download</em>), ¡NUNCA uses <em>for + verbo</em>! (Usa <em>for</em> solo antes de sustantivos o al explicar uso de herramienta: <em>used for cutting</em>). <strong>2) Verbo sujeto:</strong> empieza oración con <code>V-ing</code> (<em>Calibrating saves money</em>). <strong>3) Pares:</strong> <code>want, need, plan, decide, hope, forget + TO V</code> vs <code>enjoy, finish, avoid, stop + V-ING</code>.',
      goldenRuleES: 'Cada vez que en español pienses decir <em>"para + acción"</em>, traduce mentalmente a <strong>TO + verbo simple</strong> (*to improve, to send, to save*).',
      commonMistake: { bad: 'I study English for get a better job. Wait, I forgot locking the door!', good: 'I study English TO GET a better job. Wait, I forgot TO LOCK the door!', exp: 'Propósito siempre lleva "to + verbo"; "forget + to V" significa olvidar hacer una tarea pendiente.' },
      falseCognate: { term: 'Stop doing vs Stop to do', mistake: 'Mezclar ambos significados', correct: 'Stop smoking = dejar el hábito | Stop TO check = detenerse con el propósito de revisar', tip: '"We stopped working TO eat lunch" = paramos de trabajar para comer.' },
      vocab: [
        { en: 'In order to / To + [Verb]', es: 'Para (propósito)', ipa: '/tu/', pinkStress: 'TO + verb', example: 'Use checklists to prevent human errors.', exampleES: 'Usa listas de verificación para prevenir errores humanos.' },
        { en: 'Avoid + -ing', es: 'Evitar (hacer algo)', ipa: '/əˈvɔɪd/', pinkStress: 'a-VOID', example: 'Wear ESD straps to avoid damaging chips.', exampleES: 'Usa pulseras ESD para evitar dañar los chips.' },
        { en: 'Decide / Plan / Need to', es: 'Decidir / Planear / Necesitar', ipa: '/dɪˈsaɪd/', pinkStress: 'de-CIDE', example: 'We decided to upgrade the PLC.', exampleES: 'Decidimos actualizar el PLC.' },
        { en: 'Finish + -ing', es: 'Terminar de...', ipa: '/ˈfɪnɪʃ/', pinkStress: 'FIN-ish', example: 'Did you finish calibrating Station 1?', exampleES: '¿Terminaste de calibrar la Estación 1?' }
      ],
      dialogue: [
        { speaker: 'Intern', en: 'Why do operators wear blue wrist straps in this room?', es: '¿Por qué los operadores usan pulseras azules en esta sala?' },
        { speaker: 'Lead', en: 'They wear them to discharge static and to avoid frying delicate boards.', es: 'Las usan para descargar estática y evitar quemar tarjetas delicadas.' },
        { speaker: 'Intern', en: 'Makes sense! Oh—did you finish inspecting Batch 9?', es: '¡Tiene sentido! Oh, ¿terminaste de inspeccionar el Lote 9?' },
        { speaker: 'Lead', en: 'Not yet! I need to verify two labels before going home.', es: '¡Aún no! Necesito verificar dos etiquetas antes de irme a casa.' }
      ],
      drills: [
        { q: 'Turn the green dial clockwise ___ reset the thermal counter.', opts: ['to', 'for', 'for to', 'to for'], ans: 0, exp: 'Infinitivo de propósito ("para reiniciar") = "to + verbo base".', socraticHint: '¡Cuidado con poner "for" antes de un verbo!' },
        { q: 'We finally finished ___ all the incoming valves at 4:00 PM.', opts: ['checking', 'to check', 'check', 'checked'], ans: 0, exp: 'El verbo "finish" rige gerundio (-ing): finish checking.', socraticHint: 'Patrón: finish / avoid / enjoy + -ing.' },
        { q: '___ regularly improves pronunciation and listening speed.', opts: ['Practicing', 'Practice', 'To practicing', 'Practiced'], ans: 0, exp: 'Un verbo como sujeto de la oración toma forma de gerundio: "Practicing".', socraticHint: 'Verbo funcionando como sujeto al inicio.' }
      ],
      classroomActivity: {
        title: '"¿Para qué?" — Cadena de Propósitos y Hábitos',
        grouping: 'Parejas',
        materials: '5 verbos de meta + 5 objetos',
        steps: ['A pregunta "¿Por qué haces X?" ("Why do you take notes / bring a wrench / study English?"). B responde usando "to + verbo".', 'Construyen 2 avisos usando gerundio sujeto ("Wearing goggles protects eyes").']
      },
      powerSheet: {
        fillBlanks: ['1. She studies every night ___ pass her exam. (to / for)', '2. Always avoid ___ drinks near computers. (placing / to place)', '3. I forgot ___ lock the tool cabinet yesterday! (to / -ing)', '4. ___ safety procedures keeps teams safe. (Following / Follow)'],
        reorder: ['get / I / jog / fit / to / morning / every / .', 'need / verify / We / to / calibration / the / .'],
        writePrompt: 'Completa con propósito real: "I use stemOS to..." y 1 recomendación con "Avoid + -ing":',
        answerKey: '1) to · 2) placing · 3) to · 4) Following | Orden: I jog every morning to get fit. / We need to verify the calibration.'
      }
    },
    {
      id: 'a2-c15', unitId: 'a2-u3', level: 'A2', classNum: 15, coreType: 'CORE', eaqualsRef: '#76, #132, #193',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Maintenance Agendas, Vendor Meetings & Confirmations',
      titleES: 'Agendas de Mantenimiento, Citas con Proveedores y Confirmaciones',
      grammarFocus: 'Future forms review in real emails/schedules · Confirmation phrases ("Please confirm if...", "Let\'s pencil in...")',
      canDo: 'Redactar agendas breves, confirmar citas de calibración y responder cambios de horario con claridad A2.',
      industryContext: 'Coordinación de calendario entre ingeniería, compras y proveedores externos.',
      warmupPrompt: 'Un proveedor mueve la cita 24 horas: ¿qué 3 frases claras te ayudan a reconfirmar fecha, hora y lugar?',
      grammarFormulaHtml: makeFormula('Cita confirmada / Agenda', '+', 'Día (on) + Hora (at) + Lugar (in/at)', '+', 'Confirmación', 'Calibration is scheduled <strong>on</strong> Tuesday <strong>at</strong> 10 AM. Can you confirm if that works?'),
      explanationES: 'Combina las 3 estructuras futuras de la Unidad 3: <strong>Presente Continuo</strong> para citas ya agendadas, <strong>going to</strong> para planes de equipo, y <strong>will</strong> para confirmar o comprometerse al momento. Incluye tiempos límite con <em>by</em> y días con <em>on</em>.',
      goldenRuleES: 'Pregunta natural estadounidense para validar si un horario acomoda al otro: <strong>"Does Tuesday at 10 AM work for you?"</strong>.',
      commonMistake: { bad: 'Does Tuesday serves you? We see on 10 AM in Tuesday.', good: 'Does Tuesday WORK FOR you? We meet AT 10 AM ON Tuesday.', exp: 'Di "work for you" (no "serve you"), at + hora, on + día.' },
      falseCognate: { term: 'Date vs Agenda / Schedule', mistake: 'Pass me the date of topics', correct: 'Agenda = orden del día/temario | Schedule = horario | Date = fecha calendario', tip: '"Let\'s review the meeting agenda before 9:00 AM."' },
      vocab: [
        { en: 'Work for you', es: '¿Te queda bien (horario)?', ipa: '/wɜrk fɔr ju/', pinkStress: 'WORK for you', example: 'Does Thursday afternoon work for you?', exampleES: '¿Te queda bien el jueves en la tarde?' },
        { en: 'Pencil in / Lock in', es: 'Anotar tentativo / Confirmar fijo', ipa: '/ˈpɛnsəl ɪn/', pinkStress: 'PEN-cil in', example: 'Let\'s pencil in Wednesday at 2:00 PM.', exampleES: 'Anotemos tentativamente el miércoles a las 2 PM.' },
        { en: 'Agenda / Minutes', es: 'Orden del día / Minuta de junta', ipa: '/əˈdʒɛndə/', pinkStress: 'a-GEN-da', example: 'Here is our 3-point calibration agenda.', exampleES: 'Aquí está nuestra agenda de calibración de 3 puntos.' },
        { en: 'Postpone / Move up', es: 'Posponer / Adelantar', ipa: '/poʊstˈpoʊn/', pinkStress: 'post-PONE', example: 'Can we move up the delivery by two days?', exampleES: '¿Podemos adelantar la entrega dos días?' }
      ],
      dialogue: [
        { speaker: 'Vendor', en: 'Hi Ana, our engineer can\'t come Friday. Can we reschedule for Monday at 9:30 AM?', es: 'Hola Ana, nuestro ingeniero no puede el viernes. ¿Reprogramamos para lunes 9:30 AM?' },
        { speaker: 'Ana', en: 'Let me check. Yes, Monday at 9:30 AM works for us. Which room are we using?', es: 'Déjame revisar. Sí, lunes 9:30 AM nos queda bien. ¿Qué sala usaremos?' },
        { speaker: 'Vendor', en: 'Let\'s meet in Metrology Lab B. I\'ll send the updated agenda by noon.', es: 'Nos vemos en Lab Metrología B. Enviaré la agenda actualizada al mediodía.' },
        { speaker: 'Ana', en: 'Awesome, we\'re going to prepare the three gauges beforehand!', es: '¡Genial, prepararemos los tres medidores de antemano!' }
      ],
      drills: [
        { q: 'Which sentence politely checks if a proposed time fits the client?', opts: ['Does 2:00 PM on Thursday work for you?', 'Does Thursday serve you?', 'Will Thursday good for you?', 'Work you on Thursday?'], ans: 0, exp: '"Does [time] work for you?" es la frase nativa estándar.', socraticHint: 'Usa verbo "work for".' },
        { q: 'Let\'s ___ the vendor visit for Tuesday at 11:00 AM on the calendar.', opts: ['lock in', 'out of order', 'used to', 'famous for'], ans: 0, exp: '"lock in" significa fijar o confirmar cita definitiva.', socraticHint: 'Confirmar cita.' }
      ],
      classroomActivity: {
        title: 'Llamada de Reprogramación con Proveedor',
        grouping: 'Parejas (Cliente vs Proveedor)',
        materials: 'Plantilla de agenda de 4 renglones',
        steps: ['Simulan llamada para mover una cita por retraso de paquetería usando "Does... work for you?" y "I\'ll send... by...".', 'Redactan nota breve de confirmación en el Power Sheet.']
      },
      powerSheet: {
        fillBlanks: ['1. ___ 3:30 PM on Wednesday ___ for you? (Does, work)', '2. Our calibration vendor is ___ on Monday morning. (coming / will come)', '3. I\'ll email the final ___ before 5:00 PM. (agenda / schedule work)', '4. Could we ___ the visit to next week? (reschedule / famous)'],
        reorder: ['works / afternoon / Tuesday / me / for / .', 'by / confirm / Friday / Please / noon / .'],
        writePrompt: 'Redacta un mensaje de 3 líneas confirmando fecha, hora y objetivo de una reunión:',
        answerKey: '1) Does, work · 2) coming · 3) agenda · 4) reschedule | Orden: Tuesday afternoon works for me. / Please confirm by Friday noon.'
      }
    },
    {
      id: 'a2-c16', unitId: 'a2-u4', level: 'A2', classNum: 16, coreType: 'CORE', eaqualsRef: '#14, #18, #112, #113, #115',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Modals of Obligation & Advice (have to, must, mustn\'t, should)',
      titleES: 'Modales de Obligación, Prohibición y Consejo (have to / must / should)',
      grammarFocus: 'have to vs must · don\'t have to (opcional!) vs mustn\'t (prohibido!) · should / shouldn\'t (consejo/recomendación)',
      canDo: 'Expresar reglas obligatorias, prohibiciones estrictas y consejos técnicos o de salud/estudio con precisión.',
      industryContext: 'Protocolos EHS/ISO obligatorios vs recomendaciones preventivas de mantenimiento.',
      warmupPrompt: 'Trampa mortal de traducción: "¿En qué se oponen totalmente *"You DON\'T HAVE TO wear a tie"* vs *"You MUSTN\'T touch live wires"*?"',
      grammarFormulaHtml: makeFormula('Fuerza: MUST (ley/regla) / HAVE TO (deber externo)', '|', "Prohibido: MUSTN'T ≠ Opcional: DON'T HAVE TO", '|', 'Consejo: SHOULD / SHOULDN\'T', 'We <strong>have to</strong> log out. · You <strong>mustn\'t</strong> bypass sensors. · We <strong>don\'t have to</strong> work Sunday. · You <strong>should</strong> test it first.'),
      explanationES: '<strong>Must y Have to</strong> expresan obligación ("tener que"). ¡Atención al negativo! <code>mustn\'t</code> significa <strong>PROHIBIDO hacerlo</strong>; <code>don\'t have to</code> significa <strong>NO es necesario hacerlo</strong> (es opcional). Usa <code>should / shouldn\'t + verbo base</code> para consejos, buenas prácticas y sugerencias.',
      goldenRuleES: 'Los modales <code>must</code> y <code>should</code> nunca añaden "-s" ni llevan "to". En cambio <code>have to</code> SÍ cambia en 3ª persona (<em>he has to</em>) y pregunta con <em>Do/Does... have to?</em>.',
      commonMistake: { bad: "Visitors don't have to enter without goggles (queriendo prohibir). He musts to study.", good: "Visitors MUSTN'T enter without goggles. He SHOULD / MUST study.", exp: 'Para prohibir usa "mustn\'t" o "cannot"; "don\'t have to" significa "no es obligatorio".' },
      falseCognate: { term: 'Advice vs Advise', mistake: 'Decir "Let me give you an advise"', correct: 'Advice (sustantivo incontable) = consejo | Advise (verbo) = aconsejar', tip: '"You should listen to good safety advice" (nunca "an advice" ni "advices").' },
      vocab: [
        { en: 'Have to / Has to', es: 'Tener que (obligación)', ipa: '/hæv tu/', pinkStress: 'HAVE to', example: 'Interns have to fill in a daily sign-in sheet.', exampleES: 'Los practicantes tienen que llenar hoja diaria de entrada.' },
        { en: "Mustn't vs Don't have to", es: 'Prohibido vs No es necesario', ipa: '/ˈmʌsənt/', pinkStress: 'MUST-n\'t', example: 'You mustn\'t smoke here, and you don\'t have to bring tools.', exampleES: 'Está prohibido fumar aquí, y no tienes que traer herramienta.' },
        { en: 'Should / Shouldn\'t', es: 'Deberías / No deberías (consejo)', ipa: '/ʃʊd/', pinkStress: 'SHOULD', example: 'You should stay home if you feel sick.', exampleES: 'Deberías quedarte en casa si te sientes mal.' },
        { en: 'Tighten / Inspect', es: 'Apretar / Revisar', ipa: '/ˈtaɪtən/', pinkStress: 'TIGH-ten', example: 'You should tighten the clamp before starting.', exampleES: 'Deberías apretar la abrazadera antes de encender.' }
      ],
      dialogue: [
        { speaker: 'Safety', en: 'Welcome! First rule: everyone must wear steel-toed boots past this line.', es: '¡Bienvenidos! Primera regla: todos deben usar botas con casquillo después de esta línea.' },
        { speaker: 'Intern', en: 'Do we have to wear hearing protection in the office area too?', es: '¿Tenemos que usar protección auditiva en el área de oficinas también?' },
        { speaker: 'Safety', en: "No, you don't have to wear earplugs in offices, only in Press Bay 2. And you mustn't take photos of client parts.", es: 'No, no tienen que usar tapones en oficinas, solo en Bahía 2. Y está prohibido tomar fotos de piezas.' },
        { speaker: 'Intern', en: 'Clear! Should we leave our phones in the locker then?', es: '¡Claro! ¿Deberíamos dejar nuestros teléfonos en el locker entonces?' }
      ],
      drills: [
        { q: 'High voltage! Authorized staff ___ isolate power before opening this panel, and interns ___ touch it.', opts: ["have to / mustn't", "mustn't / don't have to", 'should to / must', 'has to / must not to'], ans: 0, exp: 'Obligación = have to; prohibición estricta = mustn\'t.', socraticHint: '¿Obligatorio vs prohibido?' },
        { q: 'Today is a company holiday, so we ___ clock in at 7:00 AM.', opts: ["don't have to", "mustn't", "shouldn't to", 'have not'], ans: 0, exp: 'Ausencia de obligación (es opcional/descanso) = don\'t have to.', socraticHint: 'No significa prohibición, sino que no es necesario.' },
        { q: 'Your conveyor belt sounds noisy. You ___ ask maintenance to check the bearings.', opts: ['should', 'have', 'must to', 'ought'], ans: 0, exp: 'Consejo técnico amable: "should + verbo base".', socraticHint: 'Recomendación práctica.' }
      ],
      classroomActivity: {
        title: '"Reglas de Oro vs Buenos Consejos" (Taller de 3 Columnas)',
        grouping: 'Tríos (13 min)',
        materials: 'Tabla Must/Have to | Mustn\'t | Should/Don\'t have to',
        steps: ['Crean 1 regla obligatoria, 1 prohibición absoluta, 1 cosa opcional y 1 consejo inteligente tanto para la universidad como para un taller.', 'Comparten 1 par problemático ("Mustn\'t vs Don\'t have to") con otro trío para detectar trampas.']
      },
      powerSheet: {
        fillBlanks: ["1. Students ___ arrive on time for exams. (have to / should to)", "2. You ___ cross a red barrier! It's dangerous. (mustn't / don't have to)", "3. Tomorrow is online, so you ___ come to campus. (don't have to / mustn't)", '4. He looks tired; he ___ take a short break. (should / musts)'],
        reorder: ['wear / all / must / visitors / badges / .', 'leave / shouldn\'t / unlocked / You / the cabinet / .'],
        writePrompt: 'Escribe 1 prohibición real con "mustn\'t" y 1 cosa que NO necesitas hacer los domingos ("don\'t have to"):',
        answerKey: "1) have to · 2) mustn't · 3) don't have to · 4) should | Orden: All visitors must wear badges. / You shouldn't leave the cabinet unlocked."
      }
    },
    {
      id: 'a2-c17', unitId: 'a2-u4', level: 'A2', classNum: 17, coreType: 'EXT', eaqualsRef: '#107, #108',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Modals & Adverbs of Possibility (might, may, probably, perhaps)',
      titleES: 'Posibilidad y Probabilidad (might, may, probably, perhaps)',
      grammarFocus: 'might / may (+ not) + Base Verb · probably (word order: after will/to be, before normal verbs) · perhaps / maybe',
      canDo: 'Formular hipótesis iniciales ante una falla, duda de agenda o diagnóstico sin afirmar sin pruebas.',
      industryContext: 'Diagnóstico preliminar ("The sensor might be loose"), pronósticos de entrega y cautela.',
      warmupPrompt: 'Cuando falla una máquina aún no sabes la causa al 100%. ¿Cómo pasas de decir *"It IS broken"* a *"It MIGHT BE loose"*?',
      grammarFormulaHtml: makeFormula('Sujeto + might / may (+ not) + Verbo base', '|', 'S + will PROBABLY + V / Maybe + S + V', '', '', 'The fuse <strong>might be</strong> blown. · He <strong>may not arrive</strong> on time. · She <strong>will probably check</strong> it later.'),
      explanationES: 'Para expresar que algo es posible (40–60% certeza) usa los modales invariables <strong>might</strong> o <strong>may</strong> + verbo simple (<code>may</code> es un poco más formal; <code>might</code> es el rey del habla cotidiana). Con adverbios: <code>perhaps / maybe</code> van al principio; <code>probably</code> va <strong>después</strong> de <em>will / to be</em> pero <strong>antes</strong> de <em>won\'t</em> y verbos normales.',
      goldenRuleES: '¡No digas *"maybe yes"* solo o *"might to be"*! Di <em>"It might be the cable"</em> o <em>"It\'ll probably arrive tomorrow"</em>.',
      commonMistake: { bad: 'It mights be a leak. Probably I will arrive late. She will not probably come.', good: 'It MIGHT BE a leak. I will PROBABLY arrive late. She PROBABLY WON\'T come.', exp: 'Sin "-s" ni "to" tras "might"; "probably" va después de "will" pero ANTES de "won\'t".' },
      falseCognate: { term: 'Actually vs Currently', mistake: 'Creer que "actualmente" ayuda en probabilidad', correct: 'Maybe / Perhaps = tal vez | Probably = probablemente | Possibly = posiblemente', tip: 'Usa "It might possibly be a grounding issue."' },
      vocab: [
        { en: 'Might / May', es: 'Podría / Puede que (posibilidad)', ipa: '/maɪt / meɪ/', pinkStress: 'MIGHT / MAY', example: 'The overheating might be a cooling fan fault.', exampleES: 'El sobrecalentamiento podría ser falla del ventilador.' },
        { en: 'Probably / Perhaps', es: 'Probablemente / Quizás', ipa: '/ˈprɑbəbli / pərˈhæps/', pinkStress: 'PROB-ab-ly / per-HAPS', example: 'Perhaps the truck got delayed at customs.', exampleES: 'Quizás el camión se retrasó en aduana.' },
        { en: 'Leak / Vibration', es: 'Fuga / Vibración', ipa: '/lik / vaɪˈbreɪʃən/', pinkStress: 'LEAK / vi-BRA-tion', example: 'Air pressure drop suggests a pipe leak.', exampleES: 'Caída de presión de aire sugiere fuga en tubería.' },
        { en: 'Fault / Symptom', es: 'Falla / Síntoma', ipa: '/fɔlt / ˈsɪmptəm/', pinkStress: 'FAULT / SYMP-tom', example: 'This noise may indicate a bearing symptom.', exampleES: 'Este ruido puede indicar un síntoma en balero.' }
      ],
      dialogue: [
        { speaker: 'Tech', en: 'Machine 5 is making a clicking sound. Any idea why?', es: 'La Máquina 5 hace un ruido de clic. ¿Alguna idea por qué?' },
        { speaker: 'Lead', en: 'I\'m not sure yet. A bolt might be loose, or it may be low on oil.', es: 'Aún no estoy seguro. Un tornillo podría estar suelto, o puede que tenga poco aceite.' },
        { speaker: 'Tech', en: 'Should I shut it down? It probably won\'t run another hour like this.', es: '¿Debería apagarla? Probablemente no aguante otra hora así.' },
        { speaker: 'Lead', en: 'Yes, good call. Perhaps maintenance can check it during break.', es: 'Sí, buena decisión. Quizás mantenimiento pueda revisarla en el descanso.' }
      ],
      drills: [
        { q: 'Why is Station 4 silent? — I don\'t know; the breaker ___ tripped.', opts: ['might have', 'might be to', 'mights', 'can probably'], ans: 0, exp: 'Posibilidad sencilla A2 con adjetivo: "might be off" / con participio "might have tripped". (Mantén base en A2: might be!).', socraticHint: 'Modal de incertidumbre.' },
        { q: 'Traffic is heavy today. Our vendor ___ be 15 minutes late.', opts: ['will probably', 'probably will', 'mights', 'may to'], ans: 0, exp: 'En afirmativo "probably" se coloca DESPUÉS de "will": will probably.', socraticHint: 'will + probably + verbo base.' },
        { q: 'The coolant gauge reads zero. There ___ a hose leak under Press 2.', opts: ['may be', 'may to be', 'mays be', 'probably is be'], ans: 0, exp: '"may + be" sin "to" ni "-s".', socraticHint: 'Modal may + to be base.' }
      ],
      classroomActivity: {
        title: '"Caja Misteriosa de Diagnóstico" (3 Hipótesis por Síntoma)',
        grouping: 'Tríos (13 min)',
        materials: '4 síntomas (Laptop no prende, Lámpara parpadea, Ruido en motor, Amigo llegó tarde)',
        steps: ['Por cada síntoma, cada integrante formula una causa posible distinta usando 1) might, 2) may, y 3) will probably / maybe.', 'Votan cuál hipótesis investigan primero.']
      },
      powerSheet: {
        fillBlanks: ['1. Look at the red LED—the battery ___ be low. (might / mights)', '2. I ___ ___ arrive before 8:30 AM. (will, probably)', '3. She ___ not know the new password yet. (may / cans)', '4. ___ the rain caused the power blink. (Perhaps / Wait)'],
        reorder: ['rain / later / today / might / It / .', 'won\'t / He / probably / stay / late / .'],
        writePrompt: 'Da 2 explicaciones posibles de por qué falló hoy un dispositivo o por qué alguien no contestó (might / may):',
        answerKey: "1) might · 2) will probably · 3) may · 4) Perhaps | Orden: It might rain later today. / He probably won't stay late."
      }
    },
    {
      id: 'a2-c18', unitId: 'a2-u4', level: 'A2', classNum: 18, coreType: 'CORE', eaqualsRef: '#81, #152',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Present Perfect Intro: Experiences & Recent Checks (already / yet / ever)',
      titleES: 'Presente Perfecto Inicial: Experiencias y Verificaciones (already/yet/ever)',
      grammarFocus: 'have / has + Past Participle (V3) · Have you ever...? · already (+) vs yet (- / ?) · just',
      canDo: 'Confirmar qué tareas ya fueron completadas recientemente (already/yet) y preguntar por experiencias de vida/trabajo (ever).',
      industryContext: 'Checklists de arranque, validación ("Have you calibrated it yet?") y experiencia laboral en CV/entrevistas.',
      warmupPrompt: 'A diferencia del pasado cerrado ("yesterday"), ¿cómo preguntas si un técnico YA completó una tarea sin importar a qué hora exacto fue?',
      grammarFormulaHtml: makeFormula('S + have / has (+ not)', '+', 'Participio Pasado (V3: checked/been/seen)', '+', 'already / just / yet / ever', 'We <strong>have already checked</strong> the valve. · <strong>Have</strong> you tested it <strong>yet</strong>? · I <strong>haven\'t</strong> finished <strong>yet</strong>.'),
      explanationES: 'El <strong>Presente Perfecto</strong> (<code>have / has + Participio V3</code>) conecta el pasado reciente o experiencias abiertas con el presente. Marcadores clave: <strong>already</strong> ("ya", afirmativas entre aux y V3), <strong>yet</strong> ("todavía / ya", al FINAL de negativas y preguntas), <strong>ever</strong> ("alguna vez", en preguntas de experiencia).',
      goldenRuleES: '¡No uses marcadores cerrados como <em>yesterday</em> o <em>in 2020</em> con Present Perfect! Cuando dices cuándo ocurrió exactamente, cambias a Simple Past.',
      commonMistake: { bad: 'Did you checked it yet? He have lost his keys yesterday.', good: 'HAVE YOU CHECKED it yet? He HAS LOST his keys (no "yesterday").', exp: '"yet" prefiere Present Perfect; "he" exige "has"; no mezcles "yesterday" con Present Perfect.' },
      falseCognate: { term: 'Already vs Still vs Yet', mistake: 'Usar "yet" en medio de frases afirmativas', correct: 'Already (+) = ya | Yet (- / ?) = ya / todavía (al final) | Still = aún sigue', tip: '"I have ALREADY emailed the log, but they haven\'t replied YET."' },
      vocab: [
        { en: 'Already / Yet / Just', es: 'Ya / Todavía (al final) / Acaba de', ipa: '/ɔlˈrɛdi / jɛt/', pinkStress: 'al-READ-y / YET', example: 'She has just arrived, and she hasn\'t signed in yet.', exampleES: 'Ella acaba de llegar y aún no firma su entrada.' },
        { en: 'Ever / Never', es: 'Alguna vez / Nunca', ipa: '/ˈɛvər / ˈnɛvər/', pinkStress: 'EV-er / NEV-er', example: 'Have you ever visited an aerospace plant?', exampleES: '¿Alguna vez has visitado una planta aeroespacial?' },
        { en: 'Done / Seen / Been', es: 'Hecho / Visto / Estado o ido', ipa: '/dʌn / sin / bɪn/', pinkStress: 'DONE / SEEN / BEEN', example: 'I have been to Monterrey twice.', exampleES: 'He estado en Monterrey dos veces.' },
        { en: 'Checklist / Transducer', es: 'Lista de cotejo / Transductor', ipa: '/ˈtʃɛklɪst/', pinkStress: 'CHECK-list', example: 'Have you calibrated the transducer yet?', exampleES: '¿Ya calibraste el transductor?' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Morning! Have you inspected the pneumatic hoses yet?', es: '¡Buenos días! ¿Ya inspeccionaron las mangueras neumáticas?' },
        { speaker: 'Tech', en: "Yes, we've already checked Line 1, and we haven't found any leaks.", es: 'Sí, ya revisamos la Línea 1 y no hemos encontrado fugas.' },
        { speaker: 'Lead', en: 'Nice work! Have you ever used the new digital gauge?', es: '¡Buen trabajo! ¿Alguna vez has usado el manómetro digital nuevo?' },
        { speaker: 'Tech', en: "No, I haven't tried it yet, though Carlos has just installed it!", es: 'No, aún no lo he probado, ¡aunque Carlos lo acaba de instalar!' }
      ],
      drills: [
        { q: 'The maintenance team ___ already ___ the pneumatic line for pressure leaks.', opts: ['has / checked', 'have / check', 'did / checked', 'has / checking'], ans: 0, exp: '"The maintenance team" (singular colectivo it) → "has already checked".', socraticHint: 'have/has + already + V3.' },
        { q: 'Have you ___ calibrated the pressure transducer this morning?', opts: ['already', 'yet', 'yesterday', 'ago'], ans: 0, exp: 'Entre auxiliar y participio va "already" o "ever"; "yet" siempre va al final.', socraticHint: 'Observa dónde está el espacio vacío.' },
        { q: 'Wait—we ___ the afternoon audit ___!', opts: ["haven't started / yet", "hasn't started / already", "didn't started / yet", "haven't start / never"], ans: 0, exp: 'Negativa Plural ("we") + acción inconclusa al final ("yet").', socraticHint: 'we → haven\'t + V3 + yet.' }
      ],
      classroomActivity: {
        title: '"Have You Ever?" Bingo + Checklist Pre-Auditoría',
        grouping: 'Parejas + rotación',
        materials: '5 preguntas "Have you ever..." + checklist de 4 pendientes',
        steps: ['Intercambian 3 preguntas de experiencia ("Have you ever fixed a PC / been to another country / worked on a team project?").', 'Luego revisan su checklist de clase usando "Have you finished X yet? Yes, I\'ve already done it / Not yet."']
      },
      powerSheet: {
        fillBlanks: ['1. ___ you ever worked inside a lab? (Have / Did)', '2. I ___ already finished my homework! (have / am)', "3. She ___ replied to my message ___. (hasn't, yet)", '4. Participios irregulares: go → ___ / see → ___ / lose → lost.'],
        reorder: ['checked / Have / yet / brakes / you / the / ?', 'just / arrived / The manager / has / .'],
        writePrompt: 'Escribe 1 pregunta "Have you ever...?" y 1 tarea que ya terminaste hoy ("I\'ve already..."):',
        answerKey: "1) Have · 2) have · 3) hasn't, yet · 4) been/gone, seen | Orden: Have you checked the brakes yet? / The manager has just arrived."
      }
    },
    {
      id: 'a2-c19', unitId: 'a2-u4', level: 'A2', classNum: 19, coreType: 'CORE', eaqualsRef: '#90, #95',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Common Phrasal Verbs & Zero / First Conditionals',
      titleES: 'Verbos Frasales Comunes y Condicionales 0 y 1',
      grammarFocus: 'Phrasal verbs (turn on/off, plug in, fill out, look up, put on, pick up) · Zero Cond. (If + pres, pres) vs First Cond. (If + pres, will)',
      canDo: 'Usar phrasal verbs cotidianos/técnicos y formular reglas automáticas (Cero) o consecuencias reales futuras (Primero).',
      industryContext: 'Interlocks de seguridad, lógica PLC causa-efecto y troubleshooting cotidiano.',
      warmupPrompt: '¿Por qué un hablante nativo prefiere decir "Put on your coat / Turn off the PC / Fill out this form" en lugar de palabras latinas largas?',
      grammarFormulaHtml: makeFormula('Zero (Siempre): If + Presente, Presente', '|', 'First (Futuro real): If + Presente, WILL / CAN / Imperativo', '', '', 'If you <strong>press</strong> red, it <strong>stops</strong>. · If the valve <strong>leaks</strong>, we <strong>will shut down</strong> Line 1. · <strong>Fill out</strong> the form!'),
      explanationES: '<strong>Phrasal verbs</strong> combinan verbo + partícula creando un sentido específico: <em>turn on/off</em> (encender/apagar), <em>plug in</em> (enchufar), <em>fill out</em> (llenar formato), <em>pick up</em> (recoger), <em>look for</em> (buscar). <strong>Condicionales:</strong> <strong>Zero</strong> = leyes físicas/hechos siempre ciertos (<code>If + pres, pres</code>). <strong>First</strong> = causa probable y su resultado futuro (<code>If + pres, will/won\'t + V</code>).',
      goldenRuleES: '¡Regla de oro del Condicional! Después de <strong>If</strong> en Cero y Primer Condicional <strong>NUNCA pongas "will"</strong>: di *"If it rains, we will stay"* (jamás *"If it will rain"*).',
      commonMistake: { bad: 'If pressure will drop, the alarm triggers. Turn on it!', good: 'If pressure DROPS, the alarm triggers. Turn IT on!', exp: 'Prohibido "will" en la parte del "If"; los pronombres (it/them) van EN MEDIO de phrasal verbs separables (turn it on).' },
      falseCognate: { term: 'Look for vs Look up vs Look at', mistake: 'Usar "look" solo para buscar', correct: 'Look for = buscar objeto | Look up = consultar dato/palabra | Look after = cuidar', tip: '"I\'m looking for my badge" vs "Look up the code in the manual".' },
      vocab: [
        { en: 'Turn on / Turn off / Plug in', es: 'Encender / Apagar / Enchufar', ipa: '/tɜrn ɑn / plʌɡ ɪn/', pinkStress: 'turn ON / plug IN', example: 'Plug in the monitor and turn it on.', exampleES: 'Enchufa el monitor y enciéndelo.' },
        { en: 'Fill out / Look up', es: 'Llenar (formato) / Consultar (dato)', ipa: '/fɪl aʊt / lʊk ʌp/', pinkStress: 'fill OUT / look UP', example: 'Fill out this ticket and look up the error code.', exampleES: 'Llena este ticket y consulta el código de error.' },
        { en: 'Look for / Pick up', es: 'Buscar / Recoger', ipa: '/lʊk fɔr / pɪk ʌp/', pinkStress: 'look FOR / pick UP', example: 'Pick up the parcel; I\'ll look for the key.', exampleES: 'Recoge el paquete; buscaré la llave.' },
        { en: 'Trigger / Reset', es: 'Activar (alarma) / Reiniciar', ipa: '/ˈtrɪɡər / riˈsɛt/', pinkStress: 'TRIG-ger / re-SET', example: 'If temperature exceeds 80°C, an alarm triggers.', exampleES: 'Si la temperatura supera 80°C, se activa una alarma.' }
      ],
      dialogue: [
        { speaker: 'Tech', en: 'Press 3 isn\'t turning on! I\'m looking for the manual right now.', es: '¡La Prensa 3 no enciende! Estoy buscando el manual ahorita.' },
        { speaker: 'Lead', en: 'Wait—did you plug it in? If the main breaker is off, it won\'t start.', es: 'Espera, ¿la enchufaste? Si el interruptor principal está apagado, no arrancará.' },
        { speaker: 'Tech', en: 'Oops, let me check! Yes! If I turn on Breaker B, the screen lights up!', es: '¡Ups, déjame ver! ¡Sí! Si enciendo el interruptor B, la pantalla prende.' },
        { speaker: 'Lead', en: 'Great. Put on your gloves and fill out the startup log, please.', es: 'Genial. Ponte tus guantes y llena la bitácora de arranque, por favor.' }
      ],
      drills: [
        { q: 'If water reaches 100°C at sea level, it ___. (Zero Conditional)', opts: ['boils', 'will boiled', 'boiled', 'boil'], ans: 0, exp: 'Hecho científico universal = Present Simple en ambas cláusulas.', socraticHint: 'Hecho físico constante → Zero Conditional.' },
        { q: 'If the supplier ___ late tomorrow, Line 2 ___ stop.', opts: ['arrives / will', 'will arrive / will', 'arrived / will', 'arrive / is'], ans: 0, exp: 'First Conditional: If + Presente Simple ("arrives"), Futuro ("will").', socraticHint: 'Nunca pongas "will" dentro de la cláusula "If".' },
        { q: 'Please ___ this visitor registration card before entering.', opts: ['fill out', 'put out', 'look off', 'turn in on'], ans: 0, exp: '"fill out" (EE. UU.) significa completar un formulario.', socraticHint: 'Phrasal verb para formularios.' }
      ],
      classroomActivity: {
        title: '"Lógica Si-Entonces" & Cadena de Phrasal Verbs',
        grouping: 'Parejas (13 min)',
        materials: '4 pares causa-efecto + 6 tarjetas phrasal verb',
        steps: ['Construyen 3 reglas automáticas (Zero Cond: "If you mix...", "If you press E-stop...") y 2 escenarios futuros (First Cond: "If it rains...").', 'Actúan y usan 4 phrasal verbs con objeto pronombre en medio ("Put them on!", "Turn it off!").']
      },
      powerSheet: {
        fillBlanks: ['1. If you heat ice, it ___. (melts / will melt)', '2. If we finish early, we ___ check the next unit. (will / are)', '3. Don\'t forget to ___ ___ the lights when leaving! (turn off)', '4. I lost my badge; help me ___ ___ it. (look for)'],
        reorder: ['starts / button / If / press / green / the / you / , / it / .', 'fill / Please / out / form / this / .'],
        writePrompt: 'Escribe 1 regla Zero Conditional (ciencia/máquina) y 1 amenaza/plan First Conditional para esta semana:',
        answerKey: '1) melts · 2) will · 3) turn off · 4) look for | Orden: If you press the green button, it starts. / Please fill out this form.'
      }
    },
    {
      id: 'a2-c20', unitId: 'a2-u4', level: 'A2', classNum: 20, coreType: 'CORE', eaqualsRef: '#18, #90, #171',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Troubleshooting & Work Order Tickets (A2 Crucible Capstone)',
      titleES: 'Resolución de Fallas y Tickets de Mantenimiento (Crisol A2)',
      grammarFocus: 'Integrating Past vs Continuous + Modals (should/have to/might) + First Conditional in troubleshooting',
      canDo: 'Diagnosticar síntomas técnicos, emitir recomendaciones inmediatas y superar el Crisol Oral + Examen A2.',
      industryContext: 'Levantamiento completo de ticket de orden de trabajo (fuga hidráulica / vibración) en piso.',
      warmupPrompt: 'Suena alarma en Presa Hidráulica B: integra en 4 pasos QUÉ está pasando, QUÉ pudo causarlo (might), QUÉ pasa si sigue (If...) y QUÉ debemos hacer (should/have to).',
      grammarFormulaHtml: makeFormula('Síntoma (is -ing)', '+', 'Hipótesis (might be)', '+', 'Acción (have to / should) + Condición (If... will)', 'Pump 2 <strong>is leaking</strong> oil. It <strong>might be</strong> a worn gasket. We <strong>have to</strong> tighten it, or pressure <strong>will drop</strong>.'),
      explanationES: 'Al reportar cualquier falla real conecta tus herramientas A2: <strong>1) Síntoma vivo</strong> (Present Continuous: <em>is overheating</em>) o reciente (Present Perfect: <em>has dropped</em>); <strong>2) Posibilidad</strong> (<em>might be</em>); <strong>3) Acción obligada o consejo</strong> (<em>have to / should</em>); <strong>4) Riesgo futuro</strong> (<em>If we don\'t act, it\'ll fail</em>).',
      goldenRuleES: 'Todo buen ticket técnico responde 3 cosas en menos de 40 palabras: Ubicación exacta, Síntoma observable y Acción sugerida.',
      commonMistake: { bad: 'Press leaking and need fix fast because broken.', good: 'Press 2 IS leaking, so we HAVE TO inspect it or it WILL fail.', exp: 'Incluye sujeto, auxiliares continuos/modales y conector lógico.' },
      falseCognate: { term: 'Ticket / Order / Actually', mistake: 'Decir "I do a reclamation"', correct: 'Submit a work order / file a ticket = levantar reporte de falla', tip: '"I already submitted a hydraulic leak work order."' },
      vocab: [
        { en: 'Work Order / Ticket', es: 'Orden de trabajo / Ticket de falla', ipa: '/wɜrk ˈɔrdər/', pinkStress: 'WORK or-der', example: 'Open a priority work order for Line 4.', exampleES: 'Abre una orden de trabajo prioritaria para la Línea 4.' },
        { en: 'Air Pressure Drop', es: 'Caída de presión de aire', ipa: '/ɛr ˈprɛʃər drɑp/', pinkStress: 'PRES-sure drop', example: 'We detected an air pressure drop.', exampleES: 'Detectamos una caída de presión de aire.' },
        { en: 'Loose / Cracked', es: 'Flojo / Agrietado', ipa: '/lus / krækt/', pinkStress: 'LOOSE / CRACKED', example: 'Check for loose fittings or cracked hoses.', exampleES: 'Revisa conexiones flojas o mangueras agrietadas.' }
      ],
      dialogue: [
        { speaker: 'Operator', en: 'Support! Reservoir B is overheating and vibrating.', es: '¡Soporte! El Depósito B se está sobrecalentando y vibrando.' },
        { speaker: 'Tech', en: 'Okay, have you shut down the pump yet? It might be an oil leak.', es: 'Bien, ¿ya apagaste la bomba? Podría ser fuga de aceite.' },
        { speaker: 'Operator', en: 'Yes, I turned it off. If we run it now, it\'ll trip the breaker.', es: 'Sí, la apagué. Si la corremos ahora, disparará el interruptor.' },
        { speaker: 'Tech', en: 'Smart move! You should fill out a red work order while I bring tools.', es: '¡Buena decisión! Deberías llenar una orden roja mientras traigo herramienta.' }
      ],
      drills: [
        { q: 'Conveyor 1 ___ making an odd noise; the roller bearing ___ be dry.', opts: ['is / might', 'does / mights', 'is / have to', 'are / can to'], ans: 0, exp: 'Síntoma presente en curso ("is making") + hipótesis ("might be").', socraticHint: 'Observa el estado vivo y la hipótesis.' },
        { q: 'If we ___ seal that valve today, coolant ___ leak overnight.', opts: ["don't / will", "won't / will", "didn't / is", 'not / will'], ans: 0, exp: 'Primer condicional negativo: If + don\'t + V, ... will + V.', socraticHint: 'If + presente simple.' }
      ],
      classroomActivity: {
        title: 'Mesa de Despacho "911 Industrial" — Crisol Oral A2',
        grouping: 'Tríos (Operador en piso, Técnico de Soporte, Auditor)',
        materials: 'Tarjetas de fallo A2-C20 + formato de ticket en Power Sheet',
        steps: ['Simulación de 3 minutos en llamada real: reportan falla, formulan hipótesis (might), aplican phrasal verb (shut down/turn off/check) y cierran con acción (should/have to).', 'Ejecutan Voice Crucible Boss A2 en stemOS (20 min).']
      },
      powerSheet: {
        fillBlanks: ['1. The compressor ___ vibrating right now. (is / has)', '2. Check Valve 3: a gasket ___ be cracked. (might / should)', '3. First, ___ off the main switch. (turn / do)', '4. If pressure drops further, the cell ___ halt automatically. (will / is)'],
        reorder: ['leaking / is / hose / hydraulic / The / .', 'should / order / a / work / You / submit / .'],
        writePrompt: 'Redacta un Work Order Ticket A2 (4 líneas): máquina, síntoma (-ing), causa posible (might) y solución (should):',
        answerKey: '1) is · 2) might · 3) turn · 4) will | Orden: The hydraulic hose is leaking. / You should submit a work order.'
      }
    }

    // =========================================================================
    // NIVEL B1 — 16 CLASES MODULARES (b1-c01 .. b1-c16)
    // =========================================================================
    ,{
      id: 'b1-c01', unitId: 'b1-u1', level: 'B1', classNum: 1, coreType: 'CORE', eaqualsRef: '#98',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Passive Voice (Present & Past Simple) for Processes & SOPs',
      titleES: 'Voz Pasiva (Presente y Pasado) en Procesos y SOPs',
      grammarFocus: 'is / are / was / were + Past Participle (V3) (+ by agent optional) · Active → Passive conversion',
      canDo: 'Describir cómo se fabrican, ensamblan o inspeccionan productos sin depender del agente ejecutor.',
      industryContext: 'Instrucciones estándar de operación (SOPs), manufactura, control de calidad e incidentes históricos.',
      warmupPrompt: '¿Por qué un manual ISO dice "PCBs ARE INSPECTED by AOI" en lugar de "A worker inspects PCBs"?',
      grammarFormulaHtml: makeFormula('Objeto Receptor', '+', 'is / are / was / were + Participio Pasado (V3)', '+', '[by + Agente opcional]', 'Raw billets <strong>are heated</strong> at 450°C. · The damaged lock <strong>was replaced</strong> yesterday.'),
      explanationES: 'La <strong>Voz Pasiva</strong> enfoca la atención en <strong>qué recibe la acción</strong> (la pieza, el reporte, el edificio), típico de manuales y noticias. Se arma con <code>to be</code> en el tiempo deseado (<em>is/are</em> o <em>was/were</em>) + <strong>Participio Pasado (V3)</strong>.',
      goldenRuleES: 'Regla anti-error: nunca pongas verbo base ni -ing en una pasiva simple: <em>was calibrated</em>, jamás *was calibrate*. Añade <code>by</code> solo si saber quién lo hizo aporta valor técnico.',
      commonMistake: { bad: 'The valve is calibrate every week. These parts was inspect.', good: 'The valve IS CALIBRATED every week. These parts WERE INSPECTED.', exp: 'Falta "-ed" / V3 en el participio y concordancia plural ("parts were").' },
      falseCognate: { term: 'Fabricate vs Manufacture / Produce', mistake: 'Traducir "fabricar" siempre como "fabricate"', correct: 'Manufacture / Produce / Assemble = producir en serie | Fabricate = maquinar metal/inventar excusa', tip: 'En electrónica o automotriz prefiere "These EV motors are manufactured in Saltillo."' },
      vocab: [
        { en: 'Assembled / Inspected', es: 'Ensamblado / Inspeccionado', ipa: '/əˈsɛmbəld/', pinkStress: 'as-SEM-bled', example: 'Every module is inspected before shipping.', exampleES: 'Cada módulo es inspeccionado antes del envío.' },
        { en: 'Calibrated / Sterilized', es: 'Calibrado / Esterilizado', ipa: '/ˈkælɪbreɪtɪd/', pinkStress: 'CAL-i-brat-ed', example: 'Surgical tools are sterilized twice.', exampleES: 'Las herramientas quirúrgicas se esterilizan dos veces.' },
        { en: 'Damaged / Quarantined', es: 'Dañado / Puesto en cuarentena', ipa: '/ˈkwɔrəntind/', pinkStress: 'QUAR-an-tined', example: 'Defective batches were quarantined immediately.', exampleES: 'Los lotes defectuosos se pusieron en cuarentena de inmediato.' },
        { en: 'SOP (Standard Operating Procedure)', es: 'Procedimiento Estándar de Operación', ipa: '/ɛs oʊ pi/', pinkStress: 'S-O-P', example: 'SOP steps are printed near each workstation.', exampleES: 'Los pasos SOP se imprimen junto a cada estación.' }
      ],
      dialogue: [
        { speaker: 'Auditor', en: 'Can you explain how these PCB boards are inspected here?', es: '¿Puedes explicar cómo se inspeccionan estas placas PCB aquí?' },
        { speaker: 'Tech', en: 'Sure! First, solder joints are scanned by an AOI camera.', es: '¡Claro! Primero, las soldaduras son escaneadas por una cámara AOI.' },
        { speaker: 'Auditor', en: 'What happened to the failed units from yesterday\'s lot?', es: '¿Qué pasó con las unidades fallidas del lote de ayer?' },
        { speaker: 'Tech', en: 'They were tagged and moved to Quarantine Cage B by Quality.', es: 'Fueron etiquetadas y movidas a Jaula de Cuarentena B por Calidad.' }
      ],
      drills: [
        { q: 'After thermal reflow, all solder joints ___ by an optical inspection camera.', opts: ['are inspected', 'is inspected', 'inspecting', 'are inspect'], ans: 0, exp: 'Plural "joints" + presente general de proceso = "are inspected".', socraticHint: 'Voz pasiva presente plural.' },
        { q: 'During the storm, two roof solar panels ___ damaged.', opts: ['were', 'was', 'did', 'been'], ans: 0, exp: '"two panels" (plural pasado) → "were damaged".', socraticHint: 'Pasado pasivo plural.' },
        { q: 'Convert to passive: "Engineers calibrated the robot yesterday."', opts: ['The robot was calibrated yesterday.', 'The robot calibrated yesterday.', 'The robot is calibrate yesterday.', 'The robot were calibrated.'], ans: 0, exp: 'Sujeto singular "The robot" + pasado "was calibrated".', socraticHint: 'Pasa el objeto al frente y pon was + V3.' }
      ],
      classroomActivity: {
        title: 'Transformador SOP "Activa → Pasiva" en Parejas',
        grouping: 'Parejas (13 min)',
        materials: '5 frases activas ("Workers pack boxes", "Somebody locked Door 2")',
        steps: ['Convierten 5 pasos de un proceso industrial o receta cotidiana de Voz Activa a Pasiva en Presente y Pasado.', 'Explican un diagrama de 4 etapas usando solo pasivas sin decir "they/people".']
      },
      powerSheet: {
        fillBlanks: ['1. Coffee ___ grown in Veracruz and Chiapas. (is / are)', '2. These microchips ___ manufactured in cleanrooms. (are / is)', '3. Yesterday\'s valve ___ replaced in 20 minutes. (was / were)', '4. Active → Passive: "Luis sent the file." → The file ___ ___ by Luis.'],
        reorder: ['checked / are / Every hour / pressure gauges / .', 'by / sealed / the team / The boxes / were / .'],
        writePrompt: 'Describe 3 pasos de cómo se fabrica o revisa un producto usando Voz Pasiva (is/are + V3):',
        answerKey: '1) is · 2) are · 3) was · 4) was sent | Orden: Every hour pressure gauges are checked. / The boxes were sealed by the team.'
      }
    },
    {
      id: 'b1-c02', unitId: 'b1-u1', level: 'B1', classNum: 2, coreType: 'CORE', eaqualsRef: '#48, #49, #179',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Discourse Markers: Sequence, Cause/Effect & Contrast',
      titleES: 'Conectores B1: Secuencia, Causa-Efecto y Contraste',
      grammarFocus: 'Subsequently / Once that is complete · due to / as a result of / therefore · however / on the other hand / although',
      canDo: 'Estructurar explicaciones técnicas o argumentativas conectando causas, consecuencias y contrastes con claridad B1.',
      industryContext: 'Reportes de anomalía, análisis causa-efecto y argumentación en juntas técnicas.',
      warmupPrompt: '¿Cuándo usas "due to + sustantivo" vs "because + oración", y dónde colocas "However,"?',
      grammarFormulaHtml: makeFormula('Causa: due to / because of + Sustantivo', '|', 'Efecto: Therefore, / As a result,', '|', 'Contraste: However, / On the one hand... on the other hand', 'Production stopped <strong>due to</strong> a power drop. <strong>Therefore</strong>, output fell. <strong>However</strong>, quality stayed high.'),
      explanationES: '<strong>Causa nominal:</strong> <code>due to / as a result of</code> exigen un sustantivo/frase (<em>due to the delay</em>, NO verbo). <strong>Consecuencia:</strong> <code>therefore / consequently</code> introducen el resultado tras punto o punto y coma. <strong>Contraste:</strong> <code>although / even though</code> unen 2 cláusulas; <code>however / on the other hand</code> conectan oraciones separadas.',
      goldenRuleES: 'Jamás uses coma para unir dos oraciones independientes con "however": escribe <code>. However,</code> o <code>; however,</code>.',
      commonMistake: { bad: 'Production stopped due to the pump failed. I went, however it closed.', good: 'Production stopped DUE TO pump failure. I went; HOWEVER, it was closed.', exp: '"Due to" pide sustantivo (o "the fact that"); "however" exige punto o punto y coma antes.' },
      falseCognate: { term: 'Discrepancy vs Discuss', mistake: 'Traducir "discusión amistosa" como "discussion"', correct: 'Discrepancy = discrepancia / diferencia de datos | Argument = pleito | Discussion = análisis/charla', tip: '"Due to a data discrepancy, we postponed the launch."' },
      vocab: [
        { en: 'Due to / As a result of', es: 'Debido a (+ sust.) / Como resultado de', ipa: '/du tu/', pinkStress: 'DUE to', example: 'Flight delays happened due to thick fog.', exampleES: 'Los retrasos de vuelo ocurrieron debido a neblina densa.' },
        { en: 'Therefore / Consequently', es: 'Por lo tanto / En consecuencia', ipa: '/ˈðɛrfɔr/', pinkStress: 'THERE-fore', example: 'The seal broke; therefore, pressure dropped.', exampleES: 'El sello se rompió; por lo tanto cayó la presión.' },
        { en: 'However / On the other hand', es: 'Sin embargo / Por otro lado', ipa: '/haʊˈɛvər/', pinkStress: 'how-EV-er', example: 'Plan A is cheap; however, Plan B is safer.', exampleES: 'El Plan A es barato; sin embargo el Plan B es más seguro.' },
        { en: 'Subsequently / Once', es: 'Posteriormente / Una vez que', ipa: '/ˈsʌbsɪkwəntli/', pinkStress: 'SUB-se-quent-ly', example: 'Once cooled, billets are cut subsequently.', exampleES: 'Una vez enfriados, los lingotes se cortan posteriormente.' }
      ],
      dialogue: [
        { speaker: 'Eng A', en: 'Why was Line 4 halted earlier? Due to mechanical wear?', es: '¿Por qué detuvieron la Línea 4 antes? ¿Debido a desgaste mecánico?' },
        { speaker: 'Eng B', en: 'Actually, it stopped due to a sensor drift. Consequently, ten units were held.', es: 'En realidad paró debido a desviación del sensor. En consecuencia, retuvimos diez piezas.' },
        { speaker: 'Eng A', en: 'Got it. On the one hand, recalibrating takes an hour; on the other hand, skipping it risks scrap.', es: 'Entendido. Por un lado recalibrar toma 1 hora; por otro lado omitirlo arriesga desperdicio.' },
        { speaker: 'Eng B', en: 'True! Let\'s recalibrate; however, let\'s inform dispatch right away.', es: '¡Cierto! Recalibremos; sin embargo, avisemos a despacho de inmediato.' }
      ],
      drills: [
        { q: 'Production stopped temporarily ___ a calibration drift on Station 3.', opts: ['due to', 'because', 'therefore', 'however'], ans: 0, exp: '"a calibration drift" es un grupo nominal sin verbo → "due to".', socraticHint: '¿Hay verbo después del espacio o solo sustantivo?' },
        { q: 'The mold preheated; ___, plastic injection proceeded smoothly.', opts: ['therefore', 'due to', 'although', 'despite'], ans: 0, exp: 'Punto y coma + resultado lógico → "therefore,".', socraticHint: 'Conector de consecuencia tras ";".' },
        { q: '___ the manual is short, it covers every safety interlock.', opts: ['Although', 'However', 'Due to', 'Therefore'], ans: 0, exp: '"Although + S + V, S + V" introduce una cláusula concesiva directa.', socraticHint: 'Va al inicio subordinando dos cláusulas opuestas.' }
      ],
      classroomActivity: {
        title: 'Debate Rápido "On One Hand vs On the Other Hand"',
        grouping: 'Parejas (13 min)',
        materials: '3 dilemas (Trabajo remoto vs presencial, Automatizar vs manual, Comprar barato vs duradero)',
        steps: ['Cada pareja redacta y expone un párrafo balanceado de 4 oraciones usando due to, therefore, on the one hand... on the other hand y however.']
      },
      powerSheet: {
        fillBlanks: ['1. The shipment arrived late ___ heavy snow. (due to / because)', '2. Battery voltage fell; ___, the drone landed. (therefore / although)', '3. ___ he is new, he reads schematics very well. (Although / However)', '4. ___ the hand, cost is low; ___ the other hand, maintenance rises. (On, on)'],
        reorder: ['failed / due to / a blown / The motor / fuse / .', 'however / fast / This / costly / method is / it is / ; / , / .'],
        writePrompt: 'Redacta 2 frases conectadas explicando un retraso real o decisión técnica usando "due to" y "however":',
        answerKey: '1) due to · 2) therefore · 3) Although · 4) On, on | Orden: The motor failed due to a blown fuse. / This method is fast; however, it is costly.'
      }
    },
    {
      id: 'b1-c03', unitId: 'b1-u1', level: 'B1', classNum: 3, coreType: 'EXT', eaqualsRef: '#69, #70',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Past Habits: Used to vs Would in Workplace & Life Narratives',
      titleES: 'Hábitos Pasados: Used to vs Would en Narrativas',
      grammarFocus: 'used to (actions + states: live, be, have) vs would + V (repeated past actions ONLY, never states)',
      canDo: 'Narrar cómo solían operar los procesos o cómo vivías en el pasado alternando used to y would con precisión B1.',
      industryContext: 'Historias de evolución tecnológica (de talleres análogos a Industria 4.0) y anécdotas.',
      warmupPrompt: '¿Por qué podemos decir "Years ago technicians WOULD write paper tags", pero es INCORRECTO decir *"I WOULD live in Cancun"*?',
      grammarFormulaHtml: makeFormula('USED TO + Acción o Estado (be/live/have)', '|', 'WOULD + Solo Acciones Repetidas', '', '', 'We <strong>used to have</strong> noisy presses. Every Friday we <strong>would log</strong> data manually.'),
      explanationES: 'En B1 combinamos ambos para evitar repetir "used to" diez veces. Empieza situando el estado pasado con <strong>used to</strong> (<em>used to be, used to live, used to have</em>); luego narra las rutinas repetidas con <strong>would + verbo base</strong> (<em>every morning we would calibrate...</em>).',
      goldenRuleES: '<strong>Would</strong> para hábitos pasados NUNCA funciona con verbos de estado (*be, live, have, like, know*). En duda sobre un estado usa siempre <em>used to</em>.',
      commonMistake: { bad: 'When I was young, I would have a bike and would live in Oaxaca.', good: 'When I was young, I USED TO have a bike and I WOULD ride it daily.', exp: '"have" (posesión) y "live" son estados → exigen "used to"; "ride" es acción repetida → acepta "would".' },
      falseCognate: { term: 'Before vs Used to', mistake: 'Antes trabajaba = Before I work', correct: 'I used to work / Earlier in my career, I worked...', tip: 'No traduzcas el "antes" imperfecto del español literal; usa "used to" o Simple Past.' },
      vocab: [
        { en: 'Manual / Legacy System', es: 'Sistema manual / Legado (antiguo)', ipa: '/ˈlɛɡəsi ˈsɪstəm/', pinkStress: 'LEG-a-cy', example: 'The legacy plant used to have zero automation.', exampleES: 'La planta antigua solía tener cero automatización.' },
        { en: 'Back then', es: 'En aquel entonces', ipa: '/bæk ðɛn/', pinkStress: 'BACK then', example: 'Back then, we would print every schematic.', exampleES: 'En aquel entonces imprimíamos cada diagrama.' },
        { en: 'Evolve / Transition', es: 'Evolucionar / Hacer transición', ipa: '/ɪˈvɑlv/', pinkStress: 'e-VOLVE', example: 'Processes evolved once IoT sensors arrived.', exampleES: 'Los procesos evolucionaron al llegar sensores IoT.' }
      ],
      dialogue: [
        { speaker: 'Veteran', en: 'Before ERP software, inventory used to be chaotic!', es: 'Antes del software ERP, ¡el inventario solía ser caótico!' },
        { speaker: 'Intern', en: 'Really? How did you track stock back then?', es: '¿En serio? ¿Cómo rastreaban el stock en aquel entonces?' },
        { speaker: 'Veteran', en: 'Every Friday afternoon we would walk down every aisle with clipboards and count parts by hand.', es: 'Cada viernes en la tarde recorríamos cada pasillo con tablas y contábamos piezas a mano.' },
        { speaker: 'Intern', en: 'Wow—today scanners would save you hours!', es: 'Vaya; ¡hoy los escáneres les ahorrarían horas!' }
      ],
      drills: [
        { q: 'Ten years ago our campus ___ only two small labs, and students ___ share one oscilloscope.', opts: ['used to have / would', 'would have / used', 'would be / use to', 'used to having / would'], ans: 0, exp: '"have" = estado (exige used to); "share" = acción repetida (acepta would).', socraticHint: 'Estado vs acción repetida.' },
        { q: 'Which sentence uses "would" INCORRECTLY for past habit?', opts: ['He would be very shy in high school.', 'We would meet at the café every morning.', 'She would call me after every shift.', 'They would run diagnostics every Friday.'], ans: 0, exp: '"be" es un verbo de estado; no admite "would" como hábito pasado.', socraticHint: 'Busca el verbo de estado.' }
      ],
      classroomActivity: {
        title: '"Historia de Evolución" (De Ayer a Hoy)',
        grouping: 'Parejas (13 min)',
        materials: 'Temas: Comunicación (teléfono/email), Educación o Fábricas',
        steps: ['A cuenta un recuerdo de su infancia o primer semestre usando 1 "used to" de estado + 2 "would" de rutina repetida.', 'B verifica que "would" no acompañe ningún estado (be/live/know/have).']
      },
      powerSheet: {
        fillBlanks: ['1. My hometown ___ to be quiet, and kids ___ play outside all day. (used, would)', "2. Before cloud storage, I ___ save everything on USBs. (would / was used)", '3. Error? "I would live in Puebla" → Fix: I ___ ___ live in Puebla.', '4. Back ___, engineers used slide rules. (then / before)'],
        reorder: ['walk / to / Every day / campus / we / would / .', 'used to / old building / be / That / a warehouse / .'],
        writePrompt: 'Escribe 2 líneas sobre cómo estudiabas o trabajabas hace 5 años combinando "used to" + "would":',
        answerKey: '1) used, would · 2) would · 3) used to · 4) then | Orden: Every day we would walk to campus. / That old building used to be a warehouse.'
      }
    },
    {
      id: 'b1-c04', unitId: 'b1-u1', level: 'B1', classNum: 4, coreType: 'CORE', eaqualsRef: '#98, #48, #49',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Explaining Workflows, Technical SOPs & Discrepancies (B1 U1 Workshop)',
      titleES: 'Flujos de Trabajo, SOPs Técnicos y Crucible B1 U1',
      grammarFocus: 'Integrating Passive Voice + Sequential & Causal Linkers in formal SOP documentation & live walk-throughs',
      canDo: 'Redactar y explicar oralmente un Procedimiento Operativo Estándar (SOP) completo paso a paso.',
      industryContext: 'Protocolo Cleanroom Gowning, manejo de discrepancias y defensa de flujo operativo.',
      warmupPrompt: 'Observa un SOP técnico: ¿qué 3 ingredientes gramaticales lo hacen claro para cualquier planta global (Imperativo/Pasiva + Secuencia + Causa)?',
      grammarFormulaHtml: makeFormula('Step 1 (Sequencer)', '+', 'Passive Process (is verified)', '+', 'Cause / Safety Effect (due to / to prevent)', '<strong>First</strong>, garments <strong>are inspected</strong>; <strong>subsequently</strong>, airlock pressure is checked <strong>to prevent</strong> contamination.'),
      explanationES: 'Combina las herramientas B1 de la Unidad 1 en un solo flujo profesional: describe el estado del sistema en <strong>Voz Pasiva</strong>, encadena pasos con <strong>Once that is complete / Subsequently</strong>, y justifica por qué con <strong>due to / therefore</strong>.',
      goldenRuleES: 'Cada paso de un SOP debe poder ejecutarse sin ambigüedad: nombra qué herramienta se usa y qué ocurre cuando la tolerancia falla.',
      commonMistake: { bad: 'First enter room, second wash hands, final exit.', good: 'First, hands ARE WASHED thoroughly; once dry, sterile gloves ARE PUT ON.', exp: 'En documentos de proceso ISO/B1 utiliza voz pasiva o secuencias completas bien conectadas.' },
      falseCognate: { term: 'Contamination / Cleanroom Suit vs Dress', mistake: 'Put on the white dress', correct: 'Cleanroom bunny suit / ESD smock / Gowning suit', tip: 'Traje de cuarto limpio es "bunny suit" o "cleanroom coverall", nunca "dress".' },
      vocab: [
        { en: 'Discrepancy / Out-of-Spec', es: 'Discrepancia / Fuera de especificación', ipa: '/dɪˈskrɛpənsi/', pinkStress: 'dis-CREP-an-cy', example: 'Report any torque discrepancy immediately.', exampleES: 'Reporta de inmediato cualquier discrepancia de torque.' },
        { en: 'Once that is complete', es: 'Una vez completado eso', ipa: '/wʌns ðæt ɪz kəmˈplit/', pinkStress: 'ONCE that is com-PLETE', example: 'Once that is complete, seal the batch label.', exampleES: 'Una vez completado eso, sella la etiqueta del lote.' },
        { en: 'Sequential / Traceability', es: 'Secuencial / Trazabilidad', ipa: '/ˌtreɪsəˈbɪlɪti/', pinkStress: 'trace-a-BIL-i-ty', example: 'Barcodes are scanned to maintain traceability.', exampleES: 'Los códigos de barras se escanean para mantener trazabilidad.' }
      ],
      dialogue: [
        { speaker: 'Engineer', en: 'Let\'s walk through our cleanroom gowning SOP step by step.', es: 'Repasemos paso a paso nuestro SOP de vestimenta de cuarto limpio.' },
        { speaker: 'Intern', en: 'First, street shoes are covered with booties. Subsequently, hairnets are put on.', es: 'Primero se cubren los zapatos con botas. Después se coloca cofia.' },
        { speaker: 'Engineer', en: 'What comes after washing hands?', es: '¿Qué sigue después de lavar manos?' },
        { speaker: 'Intern', en: 'Once hands are dried, the sterile bunny suit is zipped up; therefore, zero particles enter.', es: 'Una vez secas las manos, se cierra el traje estéril; por ello entran cero partículas.' }
      ],
      drills: [
        { q: 'Every batch ___ serialized before shipping ___ full customer traceability.', opts: ['is / to ensure', 'are / for ensure', 'was / due to', 'is / because'], ans: 0, exp: 'Singular "batch" → is serialized + infinitivo de propósito "to ensure".', socraticHint: 'Pasiva singular + propósito.' },
        { q: '___ the seal is tested, the unit moves into automated packaging.', opts: ['Once', 'Due to', 'Therefore', 'However'], ans: 0, exp: '"Once + cláusula" indica "Una vez que...".', socraticHint: 'Conector temporal de condición completada.' }
      ],
      classroomActivity: {
        title: 'Taller "Redacta y Narra Tu SOP de 4 Etapas" (Voice Crucible Prep)',
        grouping: 'Tríos (Autor, Operador que ejecuta, Auditor)',
        materials: 'Plantilla SOP B1-C04',
        steps: ['Escriben 4 pasos en voz pasiva con linkers (First, Once complete, Subsequently, Finally) de un proceso real.', 'El Auditor escucha e interrumpe con 1 pregunta de causa ("Why is X checked?").']
      },
      powerSheet: {
        fillBlanks: ['1. Raw parts ___ washed; ___, they are dried. (are, subsequently)', '2. ___ the form is signed, ship the lot. (Once / Due to)', '3. Production paused ___ a software discrepancy. (due to / therefore)', '4. Calibrate tools monthly ___ ensure ISO accuracy. (to / for)'],
        reorder: ['is / sealed / the box / complete / Once / is / that / , / .', 'inspected / Before / are / packaging / units / all / , / .'],
        writePrompt: 'Redacta un micro-SOP de 4 pasos de tu carrera o actividad diaria usando al menos 2 pasivas y 2 conectores:',
        answerKey: '1) are, subsequently · 2) Once · 3) due to · 4) to | Orden: Once that is complete, the box is sealed. / Before packaging, all units are inspected.'
      }
    },
    {
      id: 'b1-c05', unitId: 'b1-u2', level: 'B1', classNum: 5, coreType: 'CORE', eaqualsRef: '#81, #82',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Present Perfect vs Simple Past (for, since, ago, ever, already)',
      titleES: 'Presente Perfecto vs Pasado Simple (for, since, ago)',
      grammarFocus: 'Present Perfect (unfinished period / life exp. / result now) vs Simple Past (finished time: yesterday, in 2022, ago) · for (duration) vs since (start point)',
      canDo: 'Alternar con precisión entre Present Perfect y Simple Past al relatar logros laborales y duración de actividades.',
      industryContext: 'Actualizaciones de proyecto, experiencia en currículum/entrevistas y seguimiento de entregas.',
      warmupPrompt: '¿Por qué dices "I\'VE BEEN to Guadalajara twice" (sin año), pero "I WENT there in 2023" (con fecha cerrada)?',
      grammarFormulaHtml: makeFormula('Tiempo abierto / Resultado hoy → HAVE/HAS + V3 (+ for/since)', '|', 'Tiempo cerrado → PASADO SIMPLE (+ ago / last / in 2022)', '', '', 'We <strong>have worked</strong> here <strong>for</strong> 3 years / <strong>since</strong> 2023. · We <strong>launched</strong> the line 3 years <strong>ago</strong>.'),
      explanationES: 'Usa <strong>Present Perfect</strong> para: 1) Experiencias sin fecha exacta; 2) Acciones que iniciaron en el pasado y <strong>continúan hoy</strong> (<code>for</code> + cantidad de tiempo: <em>for 5 months</em>; <code>since</code> + punto de inicio: <em>since Monday / 2021</em>); 3) Noticias recientes. Cambia a <strong>Simple Past</strong> en cuanto menciones un tiempo acabado (<em>yesterday, last week, when I was 18, two days ago</em>).',
      goldenRuleES: '¡Diferencia mortal! <code>for</code> + periodo ("for two years"); <code>since</code> + fecha/evento de partida ("since May"); <code>ago</code> SIEMPRE va al final con Simple Past ("two years ago").',
      commonMistake: { bad: 'I work here since 2022. I have arrived yesterday at 8 AM.', good: "I HAVE WORKED here SINCE 2022. I ARRIVED yesterday at 8 AM.", exp: 'Estado continuo hasta hoy usa Present Perfect + since; "yesterday" obliga Pasado Simple.' },
      falseCognate: { term: 'Actually / So far', mistake: 'Traducir "hasta ahora" como "until now" formal', correct: 'So far / Up to now = hasta el momento (usa Present Perfect)', tip: '"We have assembled 400 units so far this shift."' },
      vocab: [
        { en: 'For vs Since', es: 'Durante (duración) vs Desde (inicio)', ipa: '/fɔr / sɪns/', pinkStress: 'FOR / SINCE', example: 'She has led QA for four years, since 2022.', exampleES: 'Ella lidera calidad desde hace cuatro años, desde 2022.' },
        { en: 'So far / Deliver', es: 'Hasta ahora / Entregar', ipa: '/soʊ fɑr/', pinkStress: 'SO far', example: 'So far we have completed three milestones.', exampleES: 'Hasta ahora hemos completado tres hitos.' },
        { en: 'Accomplishment / Deliverable', es: 'Logro / Entregable', ipa: '/əˈkɑmplɪʃmənt/', pinkStress: 'ac-COM-plish-ment', example: 'We have shipped every deliverable on time.', exampleES: 'Hemos enviado cada entregable a tiempo.' }
      ],
      dialogue: [
        { speaker: 'Manager', en: 'How long have you worked with robotics firmware, Javier?', es: '¿Cuánto tiempo llevas trabajando con firmware de robótica, Javier?' },
        { speaker: 'Javier', en: "I've been on the automation team for two years, since March 2024.", es: 'Llevo en el equipo de automatización dos años, desde marzo de 2024.' },
        { speaker: 'Manager', en: 'Awesome. Have you visited our partner lab in Austin yet?', es: 'Genial. ¿Ya visitaste nuestro lab socio en Austin?' },
        { speaker: 'Javier', en: 'Yes! I\'ve been there twice—actually, I went last November for training.', es: '¡Sí! He ido allá dos veces; de hecho fui en noviembre pasado a capacitación.' }
      ],
      drills: [
        { q: 'Our engineering division ___ used ISO 9001 templates ___ 2019.', opts: ['has / since', 'have / for', 'used / since', 'is / since'], ans: 0, exp: 'División singular → "has used" + fecha puntual de inicio → "since".', socraticHint: 'Acción que empezó en 2019 y sigue vigente.' },
        { q: 'I ___ to Texas twice; my first trip ___ in 2023.', opts: ['have been / was', 'went / has been', 'have gone / were', 'was / was'], ans: 0, exp: 'Experiencia abierta sin fecha ("have been") → detalle con año cerrado ("was in 2023").', socraticHint: 'Sin fecha = Pres Perfect; con año cerrado = Past Simple.' },
        { q: 'Supplier quotes arrived three days ___, and we have reviewed four ___.', opts: ['ago / so far', 'since / already', 'for / yet', 'ago / yesterday'], ans: 0, exp: '"ago" al final de Past Simple; "so far" con Present Perfect.', socraticHint: 'Posición al final de cláusula.' }
      ],
      classroomActivity: {
        title: '"How Long...?" Entrevista de Trayectoria y Logros',
        grouping: 'Parejas',
        materials: '4 preguntas detonadoras (live here, study English, know best friend, use laptop)',
        steps: ['A pregunta con "How long have you...?" y B responde usando alternativamente "for" y "since".', 'Luego preguntan un detalle específico en Past Simple ("When did you buy it / move here?").']
      },
      powerSheet: {
        fillBlanks: ['1. Carlos has lived in Saltillo ___ six years, ___ 2020. (for, since)', '2. I ___ (send) the RFQ five minutes ___. (sent, ago)', '3. How many units ___ we produced ___ far? (have, so)', '4. Have you ___ seen a chip fab? Yes, I ___ one last year! (ever, visited)'],
        reorder: ['since / worked / here / Maria / May / has / .', 'did / arrive / you / Mexicali / When / in / ?'],
        writePrompt: 'Escribe 2 líneas sobre ti: una duración actual (since/for) y cuándo comenzó exactamente (ago/last/in):',
        answerKey: '1) for, since · 2) sent, ago · 3) have, so · 4) ever, visited | Orden: Maria has worked here since May. / When did you arrive in Mexicali?'
      }
    },
    {
      id: 'b1-c06', unitId: 'b1-u2', level: 'B1', classNum: 6, coreType: 'CORE', eaqualsRef: '#71',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Past Perfect (had + V3): Earlier Past Events & Incident Root Chronology',
      titleES: 'Pasado Perfecto (had + V3): Orden Cronológico de Dos Eventos Pasados',
      grammarFocus: 'had / hadn\'t + Past Participle (V3) · Before / By the time / When + Simple Past · Already / Never before',
      canDo: 'Mostrar claramente qué evento pasado ocurrió PRIMERO antes de otro hecho pasado en historias y análisis de causa.',
      industryContext: 'Análisis cronológico de fallas ("When QA arrived, the technician had already reset it").',
      warmupPrompt: 'Lee dos situaciones: "When I got to the station, the train left" vs "...the train HAD LEFT". ¿En cuál perdiste el tren?',
      grammarFormulaHtml: makeFormula('Evento #1 (Más antiguo): S + HAD (+ not) + V3', '+', 'before / when / by the time', '+', 'Evento #2 (Más reciente): S + Pasado Simple', 'By the time maintenance arrived, the operator <strong>had already isolated</strong> power. · The train <strong>had left</strong> when I got there.'),
      explanationES: 'El <strong>Pasado Perfecto</strong> (<code>had + participio V3</code>) es el "pasado del pasado". Cuando cuentas dos acciones pasadas y quieres dejar clarísimo cuál pasó <strong>antes</strong>, pones la primera en <code>had + V3</code> y la más reciente en <code>Past Simple</code>.',
      goldenRuleES: 'Expresiones imán de Past Perfect: <code>by the time</code> ("para cuando"), <code>already</code> ("ya había"), <code>because</code> al explicar la causa anterior (*Line 2 stopped because a fuse had blown*).',
      commonMistake: { bad: 'When I arrived at work, the meeting already started (ambigüedad). Had you saw it?', good: 'When I arrived at work, the meeting HAD ALREADY STARTED. HAD you SEEN it?', exp: 'Usa "had + V3" para marcar prioridad temporal; participio de see es "seen", no "saw".' },
      falseCognate: { term: 'Anticipate vs Earlier / Previously', mistake: 'We had anticipated (creyendo que significa "hicimos antes")', correct: 'Previously / Prior to that / Earlier = con anterioridad | Anticipate = prever', tip: '"Prior to the audit, we had updated all records."' },
      vocab: [
        { en: 'By the time', es: 'Para cuando', ipa: '/baɪ ðə taɪm/', pinkStress: 'by the TIME', example: 'By the time we called, they had shipped the parts.', exampleES: 'Para cuando llamamos, ya habían enviado las piezas.' },
        { en: 'Previously / Already', es: 'Previamente / Ya había', ipa: '/ˈpriviəsli/', pinkStress: 'PRE-vi-ous-ly', example: 'We discovered someone had previously edited the PLC.', exampleES: 'Descubrimos que alguien había editado el PLC antes.' },
        { en: 'Root Cause', es: 'Causa raíz', ipa: '/rut kɔz/', pinkStress: 'ROOT cause', example: 'QA confirmed the seal had failed earlier.', exampleES: 'Calidad confirmó que el sello había fallado antes.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Why couldn\'t you inspect the error screen on Machine 7?', es: '¿Por qué no pudiste inspeccionar la pantalla de error en la Máquina 7?' },
        { speaker: 'QA', en: 'By the time I got to Bay 7, the night operator had already rebooted the PC!', es: '¡Para cuando llegué a la Bahía 7, el operador nocturno ya había reiniciado la PC!' },
        { speaker: 'Lead', en: 'Oh no! Had he saved the diagnostic log before resetting?', es: '¡Oh no! ¿Había guardado la bitácora diagnóstica antes de reiniciar?' },
        { speaker: 'QA', en: 'Luckily, yes—the system had auto-backed up the file five minutes earlier.', es: 'Por suerte sí; el sistema había respaldado el archivo cinco minutos antes.' }
      ],
      drills: [
        { q: 'When the supervisor arrived at 8:00 AM, the team ___ already ___ the coolant tank.', opts: ['had / drained', 'has / drained', 'did / drain', 'was / draining'], ans: 0, exp: 'Acción previa antes de las 8:00 AM pasada → "had already drained".', socraticHint: 'Dos momentos pasados: ¿cuál ocurrió primero?' },
        { q: 'The conveyor tripped because a bolt ___ inside the gear housing.', opts: ['had fallen', 'fell had', 'has fell', 'falling'], ans: 0, exp: 'Causa anterior al disparo del equipo → "had fallen".', socraticHint: 'had + V3 de fall (fallen).' },
        { q: '___ the email before the customer called?', opts: ['Had you read', 'Did you had read', 'Have you read (past context)', 'Were you read'], ans: 0, exp: 'Pregunta antes de otro momento pasado: "Had + S + V3?".', socraticHint: 'Inversión de "had" + participio.' }
      ],
      classroomActivity: {
        title: '"Línea del Tiempo Invertida" (¿Qué Pasó Primero?)',
        grouping: 'Parejas (13 min)',
        materials: '4 pares de tarjetas de causa-efecto pasada',
        steps: ['Reciben pares desordenados (ej. "Alarma sonó / Alguien olvidó cerrar válvula"; "Llegué tarde / Autobús ya se fue").', 'Unen cada par usando "When..., ... had already..." y "Because ... had...".']
      },
      powerSheet: {
        fillBlanks: ['1. When we got to the airport, the flight ___ already ___. (had, left)', '2. The server crashed because someone ___ unplugged the fan. (had / has)', '3. By the time he called, I ___ finished the email. (had / did)', '4. Had she ___ (see) that error code before? (seen / saw)'],
        reorder: ['had / before / arrived / closed / The lab / we / .', 'forgot / realized / I / had / I / badge / my / .'],
        writePrompt: 'Escribe 2 líneas explicando un contratiempo pasado con "By the time..." y "had + V3":',
        answerKey: '1) had, left · 2) had · 3) had · 4) seen | Orden: The lab had closed before we arrived. / I realized I had forgotten my badge.'
      }
    },
    {
      id: 'b1-c07', unitId: 'b1-u2', level: 'B1', classNum: 7, coreType: 'CORE', eaqualsRef: '#49, #187',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Professional Emails, Formal vs Informal Register & Polite Modals',
      titleES: 'Correos Profesionales, Registro Formal e Informal y Modales Corteses',
      grammarFocus: 'Register comparison (Informal vs Formal) · Could you please / Would it be possible to / I would appreciate it if you could... · BLUF structure',
      canDo: 'Redactar correos profesionales claros (reportes de avance, RFQs y entregas) eligiendo el tono y registro adecuado.',
      industryContext: 'Correspondencia con clientes/proveedores en EE. UU., solicitudes de cotización (RFQ) y avisos de envío.',
      warmupPrompt: 'Compara: *"Hey, send me quotes ASAP!"* vs *"I would appreciate it if you could forward the RFQ by Friday."* ¿Cuál cierra negocios internacionales?',
      grammarFormulaHtml: makeFormula('Formal Requests: Could you please + V?', '|', 'Would it be possible to + V?', '|', 'BLUF: Bottom Line Up Front + Attached + Action Item', '<strong>Please find attached</strong> the quote. · <strong>I would appreciate it if</strong> you <strong>could</strong> confirm receipt.'),
      explanationES: 'En correos laborales en EE. UU. aplica el método <strong>BLUF</strong> (conclusión o petición en las primeras 2 líneas). Contrastes clave: <em>Sorry I\'m late → Apologies for the delay</em>; <em>Ask for → Inquiry / Request</em>; <em>Here is → Please find attached</em>; <em>Tell me → Let me know / Kindly confirm</em>.',
      goldenRuleES: 'Nunca escribas <em>"I regret to tell you..."</em> con tono informal ni olvides el sujeto en <em>"I look forward to hearing from you"</em> (tras <em>look forward to</em> va <strong>-ing</strong>!).',
      commonMistake: { bad: 'I look forward to hear from you. Attached is the files.', good: 'I look forward to HEARING from you. Please find the files attached.', exp: 'Preposición "to" en "look forward to" exige verbo en "-ing"; cuida plurales "are/is".' },
      falseCognate: { term: 'Attach vs Annex', mistake: 'Annexed I send the PDF', correct: 'Please find attached... / I\'ve attached...', tip: 'En correos en inglés siempre es "attached" (adjuntar archivo), casi nunca "annex".' },
      vocab: [
        { en: 'Deliverable / Action Item', es: 'Entregable / Punto de acción', ipa: '/dɪˈlɪvərəbəl/', pinkStress: 'de-LIV-er-a-ble', example: 'Our first deliverable is ready for sign-off.', exampleES: 'Nuestro primer entregable está listo para firma.' },
        { en: 'Inquiry / Quote (RFQ)', es: 'Consulta / Cotización', ipa: '/ˈɪnkwəri / kwoʊt/', pinkStress: 'IN-qui-ry / QUOTE', example: 'Thank you for your pricing inquiry.', exampleES: 'Gracias por su consulta de precios.' },
        { en: 'Attached / Forward', es: 'Adjunto / Reenviar o remitir', ipa: '/əˈtætʃt/', pinkStress: 'at-TACHED', example: 'Could you please forward the revised specs?', exampleES: '¿Podría remitir las especificaciones revisadas?' },
        { en: 'Look forward to + -ing', es: 'Quedar atento / Esperar con gusto', ipa: '/ˈfɔrwərd/', pinkStress: 'look FOR-ward to', example: 'I look forward to meeting your team.', exampleES: 'Espero con gusto reunirme con su equipo.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Luis, look at this draft email to our Michigan client: "Give me the price fast."', es: 'Luis, mira este borrador para nuestro cliente en Michigan: "Dame el precio rápido."' },
        { speaker: 'Luis', en: 'Whoa, way too abrupt! How can we soften it without sounding robotic?', es: 'Uf, demasiado brusco. ¿Cómo lo suavizamos sin sonar robóticos?' },
        { speaker: 'Lead', en: 'Try: "Could you please provide an updated quote by Thursday? Please find our BOM attached."', es: 'Prueba: "Could you please provide an updated quote by Thursday? Please find our BOM attached."' },
        { speaker: 'Luis', en: 'Much better! And finish with "I look forward to hearing from you."', es: '¡Mucho mejor! Y cerrar con "I look forward to hearing from you."' }
      ],
      drills: [
        { q: 'I look forward to ___ your confirmation regarding the shipment.', opts: ['receiving', 'receive', 'received', 'be receive'], ans: 0, exp: '"look forward to + sustantivo o V-ing" (to aquí es preposición).', socraticHint: 'Expresión fija que pide gerundio.' },
        { q: 'I would appreciate it if you ___ forward the revised drawings.', opts: ['could', 'can to', 'will to', 'mighted'], ans: 0, exp: 'Cláusula cortés formal en correos: "...if you could + V base".', socraticHint: 'Forma condicional cortés.' },
        { q: 'Which phrase is best in a formal customer email instead of "Sorry about wait"?', opts: ['We apologize for the delay.', 'Sorry for late.', 'No worries wait.', 'I regret to late you.'], ans: 0, exp: 'Registro formal estándar corporativo.', socraticHint: 'Tono profesional claro.' }
      ],
      classroomActivity: {
        title: '"Traductor de Tono" (De Chat Informal a Correo Ejecutivo BLUF)',
        grouping: 'Parejas (13 min)',
        materials: '1 correo mal redactado lleno de órdenes bruscas y sin asunto',
        steps: ['Reescriben asunto, saludo, petición BLUF con "Could you please / Would it be possible", mención de adjunto y despedida cordial en menos de 8 líneas.', 'Intercambian correos y verifican claridad en 60 segundos.']
      },
      powerSheet: {
        fillBlanks: ['1. Could you ___ send me the invoice? (please / favor)', '2. Please find ___ the weekly progress sheet. (attached / annexed)', '3. I look forward to ___ with you soon. (working / work)', '4. We ___ for the customs delay. (apologize / sorry)'],
        reorder: ['to / would / possible / be / it / confirm / Would / ? (fix: Would it be possible to confirm?)'],
        writePrompt: 'Redacta un micro-correo BLUF de 4 líneas solicitando una cotización o prórroga con cortesía:',
        answerKey: '1) please · 2) attached · 3) working · 4) apologize | Orden: Would it be possible to confirm?'
      }
    },
    {
      id: 'b1-c08', unitId: 'b1-u2', level: 'B1', classNum: 8, coreType: 'CORE', eaqualsRef: '#138, #143, #181',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Broad Determiners (both, all, most, neither, several) & Work Collocations',
      titleES: 'Determinantes Amplios (both, most, neither) y Colocaciones Técnicas',
      grammarFocus: 'all / most / both / several / neither / none (+ of the + plural) · Verb/Adjective collocations (make a decision, high quality, heavy rain)',
      canDo: 'Cuantificar grupos completos o parciales con precisión y usar combinaciones de palabras naturales en inglés.',
      industryContext: 'Estadísticas breves de lotes, reportes semanales y lenguaje técnico natural (collocations).',
      warmupPrompt: '¿Por qué un hablante nativo dice *"MAKE a decision / DO a test / HIGH quality"*, pero nunca *"DO a decision"* ni *"BIG quality"*?',
      grammarFormulaHtml: makeFormula('All / Most / Both / Several (+ of the + Sust. Plural)', '|', 'Neither of (+ verbo sing.) | Collocations naturales', '', '', '<strong>Both</strong> sensors passed, and <strong>most of the</strong> units are ready. · Let\'s <strong>make a decision</strong>.'),
      explanationES: 'Cuantificadores clave B1: <strong>both</strong> (los 2 juntos), <strong>neither of</strong> (ninguno de los 2), <strong>several</strong> (varios: 3–6), <strong>most (of the)</strong> (la mayoría de), <strong>all</strong> (todos). <strong>Collocations:</strong> combinaciones fijas: <em>make a mistake / make progress / take a break / do research / heavy traffic / strong wind</em>.',
      goldenRuleES: 'Usa <code>Most students</code> para generalizar (sin "of the"), y <code>Most OF THE students in this room</code> cuando señalas un grupo específico.',
      commonMistake: { bad: 'Most of engineers work here. Both of sensor failed. I did a mistake.', good: 'MOST engineers work here. BOTH sensors failed. I MADE a mistake.', exp: '"Most" general va sin "of"; "both" pide plural; error/decisión van con "make".' },
      falseCognate: { term: 'Several vs Various / Actually', mistake: 'Creer que "several" es "severo"', correct: 'Several = varios / diversos | Severe = severo / grave', tip: '"Several pallets arrived late" = llegaron varias tarimas tarde.' },
      vocab: [
        { en: 'Several / Both / Neither', es: 'Varios / Ambos / Ninguno de dos', ipa: '/ˈsɛvrəl / boʊθ / ˈniðər/', pinkStress: 'SEV-er-al / BOTH', example: 'Neither of the two cables fits this port.', exampleES: 'Ninguno de los dos cables entra en este puerto.' },
        { en: 'Make vs Do (Collocations)', es: 'Tomar decisión/error vs Hacer tarea/prueba', ipa: '/meɪk / du/', pinkStress: 'MAKE / DO', example: 'Do the test carefully and don\'t make a mistake.', exampleES: 'Haz la prueba con cuidado y no cometas errores.' },
        { en: 'High Quality / Heavy Load', es: 'Alta calidad / Carga pesada', ipa: '/haɪ ˈkwɑləti/', pinkStress: 'HIGH qual-i-ty', example: 'Teams produced really high quality work.', exampleES: 'Los equipos produjeron trabajo de muy alta calidad.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Did the team finish checking both assembly lines?', es: '¿Terminó el equipo de revisar ambas líneas de ensamble?' },
        { speaker: 'QA', en: 'Yes! Most of the stations passed cleanly, though several bolts needed retorque.', es: '¡Sí! La mayoría de las estaciones pasaron bien, aunque varios tornillos ocuparon reapriete.' },
        { speaker: 'Lead', en: 'And what about the two backup motors?', es: '¿Y qué hay de los dos motores de respaldo?' },
        { speaker: 'QA', en: 'Good news—neither of them showed overheating during the test.', es: 'Buenas noticias; ninguno de los dos mostró sobrecalentamiento en la prueba.' }
      ],
      drills: [
        { q: '___ of the two printers works right now; both need toner.', opts: ['Neither', 'All', 'Several', 'Both'], ans: 0, exp: '"Neither of the two..." toma verbo singular ("works") = ninguno de los dos.', socraticHint: 'Ninguno entre exactamente dos.' },
        { q: 'Before we ___ a final decision, we must ___ one more lab test.', opts: ['make / do', 'do / make', 'take / create', 'make / make'], ans: 0, exp: 'Colocación fija: make a decision / do a test.', socraticHint: 'Collocations Make vs Do.' },
        { q: '___ engineers use English manuals daily in automotive plants.', opts: ['Most', 'Most of', 'Mostly', 'The most of'], ans: 0, exp: 'Para generalizar sin grupo específico = "Most + sustantivo plural".', socraticHint: 'Sin "of" al hablar en general.' }
      ],
      classroomActivity: {
        title: '"Make or Do?" Relámpago + Gráfica Grupal Oral',
        grouping: 'Parejas (13 min)',
        materials: '10 frases MAKE/DO + conteo rápido del salón (lentes, laptops, idiomas)',
        steps: ['Clasifican 10 colocaciones comunes en 3 min.', 'Reportan estadísticas reales del aula usando All of us, Most students, Several classmates, Both of us, Neither of us.']
      },
      powerSheet: {
        fillBlanks: ['1. ___ of my teammates speak English! (All / Every)', '2. We have two options, and ___ is risky. (neither / several)', '3. Remember to ___ research before you ___ a mistake. (do, make)', '4. ___ engineers need troubleshooting skills. (Most / Most of)'],
        reorder: ['seats / All / the / taken / are / .', 'needs / paper / Several / printers / need (fix: Several printers need paper.)'],
        writePrompt: 'Escribe 2 afirmaciones reales sobre tu clase usando Most / Several / Both / Neither y 1 collocation con Make/Do:',
        answerKey: '1) All · 2) neither · 3) do, make · 4) Most | Orden: All the seats are taken. / Several printers need paper.'
      }
    },
    {
      id: 'b1-c09', unitId: 'b1-u3', level: 'B1', classNum: 9, coreType: 'CORE', eaqualsRef: '#41, #42, #59',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Indirect Questions & Polite Conversation Clarifications',
      titleES: 'Preguntas Indirectas y Estrategias de Aclaración en Llamadas',
      grammarFocus: 'Could you tell me + where/when/what + S + V? · Do you know if/whether + S + V? · Interruption & clarification markers',
      canDo: 'Formular preguntas corteses sin inversión interna en llamadas técnicas e interrumpir amablemente para aclarar datos.',
      industryContext: 'Daily standups, videollamadas internacionales con EE. UU. y soporte técnico telefónico.',
      warmupPrompt: '¿Por qué es un error decir *"Could you tell me where IS the bathroom?"*? ¡Cuando una pregunta vive dentro de otra, vuelve al orden normal!',
      grammarFormulaHtml: makeFormula('Intro Cortés (Could you tell me / Do you know)', '+', 'Wh-word / if / whether', '+', 'SUJETO + VERBO (¡Orden Afirmativo!)', 'Do you know when the plane <strong>arrives</strong>? · Could you tell me if the lab <strong>is</strong> open?'),
      explanationES: 'Las <strong>Indirect Questions</strong> suavizan preguntas frente a clientes, jefes o desconocidos: <code>Could you tell me...</code>, <code>Do you know...</code>, <code>I\'d like to know...</code>. ¡La regla más importante!: la segunda mitad <strong>NO se invierte ni usa do/does/did</strong>; se escribe en orden de frase afirmativa (<em>where he works</em>, NO <em>where does he work</em>). Para preguntas Sí/No inserta <code>if / whether</code>.',
      goldenRuleES: 'Si la conversación telefónica va muy rápida no te quedes callado: usa fórmulas B1 reales: <em>"Sorry to interrupt, could you repeat that figure?"</em> / <em>"Are you following me? / Let me clarify..."</em>.',
      commonMistake: { bad: 'Could you tell me what time does the shift start? Do you know where is Lab 2?', good: 'Could you tell me what time the shift STARTS? Do you know where Lab 2 IS?', exp: 'Dentro de preguntas indirectas quitamos "does/did" y regresamos el verbo después del sujeto.' },
      falseCognate: { term: 'Clarify vs Explain / Pretend', mistake: 'Can you clear me this?', correct: 'Could you clarify what you mean by...? / Let me double-check.', tip: 'Jamás digas "clear me"; usa "clarify" o "explain".' },
      vocab: [
        { en: 'Clarify / Catch Up', es: 'Aclarar / Ponerse al día', ipa: '/ˈklɛrəfaɪ / kætʃ ʌp/', pinkStress: 'CLAR-i-fy / catch UP', example: 'Let\'s catch up for five minutes after standup.', exampleES: 'Pongámonos al día cinco minutos tras el standup.' },
        { en: 'Whether', es: 'Si (en duda/alternativa)', ipa: '/ˈwɛðər/', pinkStress: 'WHETH-er', example: 'I\'m not sure whether the sensor runs on 12V or 24V.', exampleES: 'No estoy seguro de si el sensor opera a 12V o 24V.' },
        { en: 'Standup / Bottleneck', es: 'Junta diaria corta / Cuello de botella', ipa: '/ˈstændʌp / ˈbɑtəlˌnɛk/', pinkStress: 'STAND-up / BOT-tle-neck', example: 'What is our main bottleneck today?', exampleES: '¿Cuál es nuestro principal cuello de botella hoy?' },
        { en: 'Do you follow me?', es: '¿Me sigues / Queda claro?', ipa: '/ˈfɑloʊ/', pinkStress: 'FOL-low me', example: 'We check tolerance first—is that clear?', exampleES: 'Revisamos tolerancia primero; ¿queda claro?' }
      ],
      dialogue: [
        { speaker: 'Austin Lead', en: 'Hey, welcome to the standup! Did you get the firmware patch loaded at 115200 baud?', es: '¡Hola, bienvenido al standup! ¿Cargaste el parche a 115200 baudios?' },
        { speaker: 'Engineer', en: 'Sorry to interrupt, Tom—could you repeat that baud rate figure?', es: 'Disculpa la interrupción, Tom, ¿podrías repetir esa cifra de baudios?' },
        { speaker: 'Austin Lead', en: 'Sure! 115,200. Also, do you know when QA arrives today?', es: '¡Claro! 115,200. Además, ¿sabes cuándo llega Calidad hoy?' },
        { speaker: 'Engineer', en: "I'm not sure whether she arrives at 10 AM or 11 AM, but I'll ask her.", es: 'No estoy seguro de si llega a las 10 u 11 AM, pero le pregunto.' }
      ],
      drills: [
        { q: 'Could you tell me when ___ to the calibration lab?', opts: ['the firmware update was deployed', 'was the firmware update deployed', 'did the firmware update deploy', 'deployed the firmware'], ans: 0, exp: 'Pregunta indirecta mantiene orden Sujeto + Verbo sin inversión.', socraticHint: 'Sujeto primero → verbo después.' },
        { q: 'I am not sure ___ the optical sensor works with 24-volt DC.', opts: ['whether', 'where', 'that do', 'what'], ans: 0, exp: 'Duda binaria (sí/no) tras "not sure" o "know" pide "if / whether".', socraticHint: 'Equivale a "si" condicional de duda.' },
        { q: 'Do you know who ___ the project lead on Line 3?', opts: ['is', 'is he', 'does', 'was be'], ans: 0, exp: 'Sujeto + verbo al final: "who is" queda al final cuando "who" ya es el sujeto.', socraticHint: 'Orden natural declarativo.' }
      ],
      classroomActivity: {
        title: '"Llamada con Interferencia" (Pedir Aclaración + Indirectas)',
        grouping: 'Parejas espalda con espalda',
        materials: '4 preguntas directas rudas + cifras rápidas',
        steps: ['A dicta datos rápidos con números/siglas mientras B interrumpe cortésmente 2 veces para confirmar cifras.', 'Luego B transforma 3 preguntas directas en Indirect Questions ("Could you tell me...", "Do you know whether...").']
      },
      powerSheet: {
        fillBlanks: ['1. Do you know where the nearest bank ___? (is / does)', '2. Could you tell me ___ the class starts at 8 AM? (whether / did)', '3. Please convert "Where does she live?" → Can you tell me where ___ ___?', '4. Sorry ___ interrupt, what do you mean ___ "RMA"? (to, by)'],
        reorder: ['me / Could / tell / when / leaves / train / the / you / ?', 'what / means / you / Do / know / acronym / this / ?'],
        writePrompt: 'Transforma estas 2 preguntas directas a corteses: 1) Where is Room 10? 2) Did he finish?',
        answerKey: '1) is · 2) whether · 3) she lives · 4) to, by | Orden: Could you tell me when the train leaves? / Do you know what this acronym means?'
      }
    },
    {
      id: 'b1-c10', unitId: 'b1-u3', level: 'B1', classNum: 10, coreType: 'CORE', eaqualsRef: '#52, #62',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Question Tags & Spoken Discourse Markers (Right, Anyway, Actually)',
      titleES: 'Question Tags Complejas y Marcadores del Habla',
      grammarFocus: 'Affirmative + Negative Tag / Negative + Positive Tag · All auxiliaries (is/isn\'t, do/don\'t, did/didn\'t, haven\'t, won\'t, can\'t) · Informal spoken transitions',
      canDo: 'Confirmar acuerdos en reuniones usando question tags naturales y guiar conversaciones orales con marcadores fluidos.',
      industryContext: 'Cierre de acuerdos en standups, confirmación rápida ("You tested it, didn\'t you?") y small talk.',
      warmupPrompt: '¿Por qué los nativos no dicen *"..., verdad?"* o *"..., no?"* al final de cada frase, sino que repiten el auxiliar opuesto?',
      grammarFormulaHtml: makeFormula('Frase (+) → Tag (-)? | Frase (-) → Tag (+)?', '|', 'Marcadores: Right. / Well, anyway... / Actually, / You know...', '', '', "She sent the log, <strong>didn't she</strong>? · It <strong>hasn't</strong> failed yet, <strong>has it</strong>? · The sensor is working, <strong>isn't it</strong>?"),
      explanationES: 'Las <strong>Question Tags</strong> van al final para confirmar o invitar a responder: <strong>Frase positiva = Tag negativa</strong>; <strong>Frase negativa = Tag positiva</strong>. Usa siempre el mismo auxiliar (o <em>do/does/did</em> si el verbo principal va solo) + pronombre (nunca sustantivo). Caso especial: <code>I am late, AREN\'T I?</code>.',
      goldenRuleES: 'Entonación: si bajas la voz al final, ya estás 90% seguro y solo buscas asentimiento; si subes el tono, es una pregunta real de duda.',
      commonMistake: { bad: "The printer works fast, isn't it? Let's start, no?", good: "The printer works fast, DOESN'T IT? Let's start, SHALL WE?", exp: 'Verbo presente "works" exige auxiliar "doesn\'t"; "Let\'s..." siempre cierra con "shall we?".' },
      falseCognate: { term: 'Anyway / Actually vs By the way', mistake: 'Usar "Anyway" cuando cambias a tema nuevo', correct: 'Anyway = volviendo al punto / bueno, en fin | By the way = por cierto (tema nuevo)', tip: '"Well, anyway, back to our tolerance spec..."' },
      vocab: [
        { en: 'Right? / Isn\'t it?', es: '¿Cierto? / ¿Verdad que sí?', ipa: '/ˈɪzənt ɪt/', pinkStress: 'IS-n\'t it', example: 'This gateway sends UDP data, doesn\'t it?', exampleES: 'Este gateway envía datos UDP, ¿no es así?' },
        { en: 'Well, anyway...', es: 'Bueno, en fin / Volviendo al tema...', ipa: '/wɛl ˈɛniweɪ/', pinkStress: 'well AN-y-way', example: 'Well, anyway, let\'s wrap up Section 2.', exampleES: 'Bueno, en fin, cerremos la Sección 2.' },
        { en: 'You know / I suppose so', es: 'Sabes / Supongo que sí', ipa: '/aɪ səˈpoʊz soʊ/', pinkStress: 'sup-POSE so', example: 'I suppose so, though let\'s double-check.', exampleES: 'Supongo que sí, aunque revisemos doble.' }
      ],
      dialogue: [
        { speaker: 'Mark', en: 'Hey, you already uploaded the BOM update, didn\'t you?', es: 'Oye, ya subiste la actualización del BOM, ¿cierto?' },
        { speaker: 'Sara', en: 'Yes, I did! It hasn\'t been approved by Procurement yet, has it?', es: '¡Sí! Aún no ha sido aprobado por Compras, ¿verdad?' },
        { speaker: 'Mark', en: 'Not yet. Well, anyway, our 10:00 AM standup starts in two minutes, doesn\'t it?', es: 'Aún no. En fin, nuestro standup de las 10 empieza en dos minutos, ¿no?' },
        { speaker: 'Sara', en: 'Right! Let\'s grab our coffees, shall we?', es: '¡Cierto! Tomemos nuestros cafés, ¿vamos?' }
      ],
      drills: [
        { q: 'The telemetry gateway is transmitting packets accurately, ___?', opts: ["isn't it", "doesn't it", "isn't he", 'is it'], ans: 0, exp: 'Auxiliar presente continuo "is transmitting" + sujeto "it" → "isn\'t it?".', socraticHint: 'Invierte "is" a negativo.' },
        { q: 'He built the aluminum fixture himself, ___?', opts: ["didn't he", "hasn't he", "wasn't he", "doesn't he"], ans: 0, exp: 'Verbo pasado simple "built" sin auxiliar usa "didn\'t he?".', socraticHint: 'Auxiliar de Pasado Simple.' },
        { q: 'They haven\'t signed the NDA yet, ___?', opts: ['have they', "haven't they", 'do they', 'did they'], ans: 0, exp: 'Cláusula negativa ("haven\'t") → Tag afirmativa ("have they?").', socraticHint: 'Negativo + Positivo.' }
      ],
      classroomActivity: {
        title: '"Confirmación Express" con Question Tags',
        grouping: 'Parejas (13 min)',
        materials: '6 suposiciones sobre el compañero (ej. "You live near...", "You can speak...", "You didn\'t eat...")',
        steps: ['A lanza 6 frases con question tags buscando confirmar cosas sobre B.', 'B responde completo ("Yes, I do / Actually, no I don\'t") usando marcadores ("You know", "Well, anyway").']
      },
      powerSheet: {
        fillBlanks: ["1. Today's deadline is at 5:00 PM, ___ it? (isn't / doesn't)", '2. You don\'t work weekends, ___ you? (do / don\'t)', "3. She finished the lab yesterday, ___ she? (didn't / wasn't)", "4. We can't skip the helmet rule, ___ we? (can / could)"],
        reorder: ['has / come / yet / He / home / , / he / hasn\'t / ?'],
        writePrompt: 'Escribe 3 afirmaciones sobre un compañero o proyecto cerrando cada una con su question tag correcta:',
        answerKey: "1) isn't · 2) do · 3) didn't · 4) can | Orden: He hasn't come home yet, has he?"
      }
    },
    {
      id: 'b1-c11', unitId: 'b1-u3', level: 'B1', classNum: 11, coreType: 'CORE', eaqualsRef: '#101',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Reported Speech: Statements, Questions & Requests',
      titleES: 'Estilo Indirecto (Reported Speech): Reportar Mensajes y Preguntas',
      grammarFocus: 'said (that) / told [person] (that) · Tense backshift (present→past, past→past perfect, will→would, can→could) · asked if/where + S + V · asked me to + V',
      canDo: 'Transmitir fielmente a un tercero qué dijo o pidió un cliente, jefe o colega sin citar literalmente.',
      industryContext: 'Minutas de junta, escalaciones de voz ("The client said they needed...") y reportes de campo.',
      warmupPrompt: 'El cliente te dijo por teléfono: "We NEED 500 units tomorrow." ¿Cómo se lo reportas una hora después a tu jefe?',
      grammarFormulaHtml: makeFormula('S + said (that) / told ME + Cláusula retrocedida', '|', 'Preguntas: asked + if/Wh + S + V', '|', 'Órdenes: told/asked + persona + TO + V', 'She <strong>said (that) she liked</strong> our specs. · He <strong>asked if we could</strong> ship early. · Boss <strong>told me to lock</strong> Gate 2.'),
      explanationES: 'Al reportar en pasado palabras previas retrocedemos un paso los tiempos (<em>backshift</em>): <code>am/is → was</code>, <code>presente → pasado</code>, <code>past/pres. perf. → had + V3</code>, <code>will → would</code>, <code>can → could</code>. <strong>Say vs Tell:</strong> <em>say</em> va sin persona directa (<em>He said that...</em>); <em>tell</em> EXIGE persona (<em>He told ME that...</em>). Órdenes/peticiones usan infinitivo: <code>told us TO check</code>.',
      goldenRuleES: 'Recuerda cambiar también pronombres y tiempo: "I will send it tomorrow" → <em>She said she WOULD send it the NEXT DAY.</em>',
      commonMistake: { bad: 'He said me that the motor is stop. She asked me where was the key.', good: 'He TOLD ME that the motor HAD STOPPED. She asked me where the key WAS.', exp: 'Usa "told me" (nunca "said me"); preguntas reportadas no se invierten (where the key was).' },
      falseCognate: { term: 'Say vs Tell vs Ask', mistake: 'Say to him to come', correct: 'Tell him to come (orden) / Ask him to come (petición)', tip: 'Nunca digas "say him"; "tell + persona + to V" o "ask + persona + to V".' },
      vocab: [
        { en: 'Mentioned / Explained', es: 'Mencionó / Explicó', ipa: '/ˈmɛnʃənd/', pinkStress: 'MEN-tioned', example: 'The vendor explained that customs took 3 days.', exampleES: 'El proveedor explicó que aduana tomó 3 días.' },
        { en: 'Confirmed / Claimed', es: 'Confirmó / Afirmó', ipa: '/kənˈfɜrmd/', pinkStress: 'con-FIRMED', example: 'He confirmed he would deliver the mold Monday.', exampleES: 'Confirmó que entregaría el molde el lunes.' },
        { en: 'Asked + Object + to V', es: 'Pidió a alguien que...', ipa: '/æskt/', pinkStress: 'ASKED', example: 'QA asked us to re-measure ten samples.', exampleES: 'Calidad nos pidió re-medir diez muestras.' }
      ],
      dialogue: [
        { speaker: 'Manager', en: 'What did the Texas buyer say on the call?', es: '¿Qué dijo el comprador de Texas en la llamada?' },
        { speaker: 'Rep', en: 'She said that they were happy with quality, though she asked if we could cut lead time.', es: 'Dijo que estaban contentos con calidad, aunque preguntó si podíamos reducir el plazo.' },
        { speaker: 'Manager', en: 'Did you tell her we already added a second shift?', es: '¿Le dijiste que ya agregamos segundo turno?' },
        { speaker: 'Rep', en: 'Yes! I told her we had added Shift 2, and she asked me to email an updated schedule.', es: '¡Sí! Le dije que habíamos agregado Turno 2 y me pidió enviarle calendario actualizado.' }
      ],
      drills: [
        { q: 'Direct: "I am testing the board now." → Reported: Tom ___ he ___ the board.', opts: ['told me / was testing', 'said me / is testing', 'told / tested', 'said that / testing'], ans: 0, exp: '"told me" (con persona) + backshift "am testing" → "was testing".', socraticHint: 'Nunca "said me" + tiempo atrás.' },
        { q: 'Direct: "Do you have the invoice?" → Reported: She asked me ___ the invoice.', opts: ['if I had', 'did I have', 'had I', 'that I have'], ans: 0, exp: 'Pregunta reportada Sí/No usa "if/whether" + orden normal + pasado.', socraticHint: 'Sin auxiliar "did" ni inversión.' },
        { q: 'Direct: "Please wear ear protection!" → Reported: The coach told us ___ ear protection.', opts: ['to wear', 'wear', 'wearing', 'that wear'], ans: 0, exp: 'Imperativos reportados pasan a "tell/ask + objeto + to + V".', socraticHint: 'Fórmula de orden reportada.' }
      ],
      classroomActivity: {
        title: '"Teléfono Descompuesto Corporativo" en Tríos',
        grouping: 'Tríos (Cliente A, Traductor B, Gerente C)',
        materials: '4 recados reales con cifras, preguntas e instrucciones',
        steps: ['A dice 1 afirmación, 1 pregunta y 1 petición a B.', 'B voltea con C y reporta todo en pasado sin leer ("He said he needed...", "He asked if...", "He asked us to...").']
      },
      powerSheet: {
        fillBlanks: ['1. Mark ___ us that the audit was moved to Friday. (told / said)', '2. She said she ___ speak German too. (could / can)', '3. He asked me ___ I had checked the pressure. (if / that)', '4. The nurse told him ___ rest for two days. (to / for)'],
        reorder: ['waiting / said / had been / she / She / .', 'to / asked / email / the / me / supervisor / The / specs / .'],
        writePrompt: 'Reporta lo último que te dijo un profesor, amigo o jefe usando "told me that..." y "asked me to...":',
        answerKey: '1) told · 2) could · 3) if · 4) to | Orden: She said she had been waiting. / The supervisor asked me to email the specs.'
      }
    },
    {
      id: 'b1-c12', unitId: 'b1-u3', level: 'B1', classNum: 12, coreType: 'CORE', eaqualsRef: '#77, #96',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Separable Phrasal Verbs in Meetings & Future Continuous',
      titleES: 'Verbos Frasales Separables y Futuro Continuo (will be -ing)',
      grammarFocus: 'Separable phrasal verbs (break down, run through, turn down, make up, bring up, call off) · Pronoun placement in middle! · will be + V-ing',
      canDo: 'Usar phrasal verbs laborales y describir qué estará en marcha en un punto futuro específico (Future Continuous).',
      industryContext: 'Juntas de sincronización ("run through the agenda") y proyecciones de piso ("At 3 PM we will be running Batch 4").',
      warmupPrompt: '¿Por qué es correcto "Turn the job DOWN" y "Turn IT down", pero JAMÁS *"Turn down IT"*?',
      grammarFormulaHtml: makeFormula('S + Phrasal + Objeto OR Phrasal + PRONOMBRE + Partícula', '|', 'Futuro Continuo: S + will be + V-ing + [hora futura]', '', '', 'We will <strong>run through</strong> the slides. · They turned <strong>it</strong> down. · Tomorrow at 10 AM I\'<strong>ll be testing</strong> the robot.'),
      explanationES: 'Muchos phrasal verbs B1 son <strong>separables</strong> (<em>turn down</em> = rechazar oferta, <em>call off</em> = cancelar junta, <em>bring up</em> = sacar tema, <em>break down</em> = desglosar/descomponerse). Con sustantivo puedes separarlos o dejarlos juntos; con pronombre (<em>it/them</em>) es OBLIGATORIO ponerlo en medio (<em>call it off</em>). <strong>Future Continuous</strong> (<code>will be + V-ing</code>) describe acciones en pleno progreso en un momento futuro.',
      goldenRuleES: 'Memoriza en pareja 3 phrasals de junta: <em>run through</em> (repasar rápido), <em>break down</em> (desglosar en partes) y <em>follow up on</em> (dar seguimiento).',
      commonMistake: { bad: 'They called off it. Tomorrow I will working at 9 AM.', good: 'They called IT OFF. Tomorrow I WILL BE WORKING at 9 AM.', exp: 'Pronombre "it" siempre entre verbo y partícula; Futuro Continuo exige "will BE + V-ing".' },
      falseCognate: { term: 'Break down (Machine vs Data)', mistake: 'Pensar que "break down" solo es descomponerse', correct: 'Break down = fallar máquina (intrans.) O desglosar costos/datos paso a paso (trans.)', tip: '"Let\'s break down the cost per unit before we call off the order."' },
      vocab: [
        { en: 'Run through / Break down', es: 'Repasar rápido / Desglosar', ipa: '/rʌn θru/', pinkStress: 'RUN through', example: 'Let\'s run through the checklist and break down errors.', exampleES: 'Repasemos la lista y desglosemos los errores.' },
        { en: 'Turn down / Call off', es: 'Rechazar / Cancelar', ipa: '/tɜrn daʊn / kɔl ɔf/', pinkStress: 'turn DOWN / call OFF', example: 'Why did the vendor turn the offer down?', exampleES: '¿Por qué rechazó la oferta el proveedor?' },
        { en: 'Catch up / Bring up', es: 'Ponerse al día / Mencionar tema', ipa: '/brɪŋ ʌp/', pinkStress: 'bring UP', example: 'Please bring up the budget gap at the meeting.', exampleES: 'Por favor plantea la brecha presupuestal en la junta.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Hey Maya, are we still meeting the client at 2:00 PM?', es: 'Oye Maya, ¿seguimos reuniéndonos con el cliente a las 2 PM?' },
        { speaker: 'Maya', en: 'No, they called it off! So at 2:00 PM I\'ll be running through the new CAD assembly with Engineering.', es: '¡No, la cancelaron! Así que a las 2 PM estaré repasando el nuevo ensamble CAD con Ingeniería.' },
        { speaker: 'Lead', en: 'Good catch. Should I bring up the aluminum quote tomorrow?', es: 'Buen aviso. ¿Debería plantear la cotización de aluminio mañana?' },
        { speaker: 'Maya', en: 'Definitely—and break it down by shipping cost too.', es: 'Definitivamente; y desglósala también por costo de envío.' }
      ],
      drills: [
        { q: 'The client offered a tight contract, yet Management turned ___ because margins were low.', opts: ['it down', 'down it', 'off it', 'up it'], ans: 0, exp: '"turn down" es separable y exige el pronombre "it" en el medio.', socraticHint: 'Verbo + pronombre + partícula.' },
        { q: 'This time next Friday, our team ___ installing solar inverters in Sonora.', opts: ['will be', 'will', 'is going be', 'will being'], ans: 0, exp: 'Momento específico futuro en curso ("This time next Friday") → "will be + V-ing".', socraticHint: 'Futuro Continuo = will be + -ing.' },
        { q: 'During the standup, let\'s ___ our three blockers quickly.', opts: ['run through', 'call out off', 'make up off', 'turn in down'], ans: 0, exp: '"run through" = repasar brevemente punto por punto.', socraticHint: 'Phrasal verb de revisión rápida.' }
      ],
      classroomActivity: {
        title: '"Agenda en Futuro Continuo" + Phrasal Swap',
        grouping: 'Parejas (13 min)',
        materials: '4 horas de mañana ("Tomorrow at 9 AM / 12 PM / 4 PM / 8 PM")',
        steps: ['Intercambian qué estarán haciendo mañana en esas horas exactas con "I\'ll be + V-ing".', 'Reescriben 4 frases sustituyendo sustantivos largos por "it / them" dentro de phrasal verbs separables.']
      },
      powerSheet: {
        fillBlanks: ['1. The training was canceled → They called ___ ___. (it off)', '2. Tomorrow at 11 AM, our crew ___ ___ testing Line 2. (will be)', '3. Please ___ ___ the cost table step by step. (break down)', '4. Don\'t ___ ___ that internship—it pays well! (turn down)'],
        reorder: ['be / I\'ll / Austin / working / week / next / in / .', 'them / Let\'s / run / carefully / through / .'],
        writePrompt: 'Escribe qué estarás haciendo mañana a las 10 AM (Future Continuous) y usa 1 phrasal separable con "it":',
        answerKey: '1) it off · 2) will be · 3) break down · 4) turn down | Orden: I\'ll be working in Austin next week. / Let\'s run through them carefully.'
      }
    },
    {
      id: 'b1-c13', unitId: 'b1-u4', level: 'B1', classNum: 13, coreType: 'CORE', eaqualsRef: '#102',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Defining Relative Clauses (who, which, that, where, whose)',
      titleES: 'Oraciones Relativas Definitorias (who, which, that, where, whose)',
      grammarFocus: 'who/that (people) · which/that (things) · where (places) · whose (possession) · Omitting object pronoun',
      canDo: 'Definir personas, piezas técnicas, lugares y herramientas con precisión sin partir oraciones en frases cortas.',
      industryContext: 'Redacción de especificaciones ("The valve THAT controls coolant"), descripción de puestos y manuales.',
      warmupPrompt: '¿Por qué es un error en inglés poner un pronombre extra después del relativo: *"The engineer who I talked to HIM"*?',
      grammarFormulaHtml: makeFormula('Sustantivo', '+', 'WHO (persona) / WHICH (cosa) / THAT (ambos) / WHERE (lugar)', '+', 'Definición exacta', 'An auditor is a person <strong>who inspects</strong> systems. · That\'s the lab <strong>where</strong> we test EV batteries.'),
      explanationES: 'Las <strong>Defining Relative Clauses</strong> identifican exactamente de qué persona, objeto o lugar hablamos (sin comas): <code>who</code> (personas), <code>which</code> (cosas/máquinas), <code>that</code> (reemplaza a <em>who</em> o <em>which</em>), <code>where</code> ("en donde" para lugares), <code>whose</code> ("cuyo/a"). Jamás repitas otro pronombre (<em>he/it</em>) que refiera al mismo antecedente.',
      goldenRuleES: 'Diferencia <em>which</em> vs <em>where</em> en lugares: <em>"The lab WHERE we work"</em> (ahí dentro) vs <em>"The lab WHICH has 3 printers"</em> (sujeto/cosa que posee algo).',
      commonMistake: { bad: 'The technician which came yesterday. The CNC machine that I fixed it.', good: 'The technician WHO came yesterday. The CNC machine THAT I FIXED.', exp: 'Personas usan "who/that" (jamás "which"); no dupliques "it" al final de la relativa.' },
      falseCognate: { term: 'What vs That / Which', mistake: 'All what you need is...', correct: 'All THAT you need / Everything THAT failed...', tip: 'Tras "everything, all, something" o superlativos se usa "that", nunca "what".' },
      vocab: [
        { en: 'Component / Device that...', es: 'Componente / Dispositivo que...', ipa: '/kəmˈpoʊnənt/', pinkStress: 'com-PO-nent', example: 'Check the sensor that monitors temperature.', exampleES: 'Revisa el sensor que monitorea temperatura.' },
        { en: 'Facility where...', es: 'Instalación donde...', ipa: '/fəˈsɪləti/', pinkStress: 'fa-CIL-i-ty', example: 'This is the plant where batteries are built.', exampleES: 'Esta es la planta donde se arman baterías.' },
        { en: 'Specialist whose...', es: 'Especialista cuyo(a)...', ipa: '/huz/', pinkStress: 'WHOSE', example: 'Talk to the lead whose line passed zero defects.', exampleES: 'Habla con la líder cuya línea logró cero defectos.' }
      ],
      dialogue: [
        { speaker: 'Intern', en: 'Which multimeter is calibrated? The yellow one?', es: '¿Cuál multímetro está calibrado? ¿El amarillo?' },
        { speaker: 'Lead', en: 'No—use the Fluke meter that has the green sticker on the back.', es: 'No; usa el medidor Fluke que tiene la etiqueta verde atrás.' },
        { speaker: 'Intern', en: 'Got it! And who signs the test sheet?', es: '¡Entendido! ¿Y quién firma la hoja de prueba?' },
        { speaker: 'Lead', en: 'Look for Elena, the QA supervisor who leads Station 4, or go to the room where logs are filed.', es: 'Busca a Elena, la supervisora que lidera Estación 4, o ve al cuarto donde se archivan bitácoras.' }
      ],
      drills: [
        { q: 'An Ishikawa diagram is a quality tool ___ identifies root causes visually.', opts: ['which / that', 'who', 'where', 'whose'], ans: 0, exp: '"a quality tool" es objeto/concepto → "which" o "that".', socraticHint: 'Relativo para objetos/herramientas.' },
        { q: 'Saltillo is the industrial hub ___ many EV powertrain plants operate.', opts: ['where', 'which', 'who', 'what'], ans: 0, exp: '"en donde operan" (lugar donde ocurre acción) → "where".', socraticHint: '¿Funciona como ubicación espacial ("en donde")?' },
        { q: 'Everything ___ the client requested is ready for review.', opts: ['that', 'what', 'who', 'where'], ans: 0, exp: 'Después de "everything / nothing / all" siempre va "that".', socraticHint: 'Nunca uses "what" tras "everything".' }
      ],
      classroomActivity: {
        title: '"Diccionario STEM en Parejas" (Define con Relativas)',
        grouping: 'Parejas (13 min)',
        materials: '6 términos (Engineer, Cleanroom, Caliper, QR Code, Forklift, Mentor)',
        steps: ['Escriben definiciones estilo diccionario sin repetir palabra: "A cleanroom is a room WHERE...", "A mentor is someone WHO...".', 'Leen su definición al grupo sin nombrar el término para que adivinen.']
      },
      powerSheet: {
        fillBlanks: ['1. A caliper is a precision tool ___ measures thickness. (which / who)', '2. That is the supervisor ___ signed my permit. (who / where)', '3. This is the cleanroom ___ microchips are fabricated. (where / which)', '4. I met an engineer ___ sister works at NASA. (whose / who)'],
        reorder: ['works / is / the / This / robot / AI / with / that / .', 'she / the / engineer / who / led / Is / team / the / ?'],
        writePrompt: 'Define 1 profesión/puesto (who), 1 máquina/app (that) y 1 lugar de trabajo (where):',
        answerKey: '1) which · 2) who · 3) where · 4) whose | Orden: This is the robot that works with AI. / Is she the engineer who led the team?'
      }
    },
    {
      id: 'b1-c14', unitId: 'b1-u4', level: 'B1', classNum: 14, coreType: 'CORE', eaqualsRef: '#91',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Second & Third Conditionals: Hypothetical Fixes & Past Prevention',
      titleES: 'Segundo y Tercer Condicional: Hipótesis y Prevención Pasada',
      grammarFocus: '2nd Cond (Present/Future hypothetical): If + Past Simple, would/could + V · 3rd Cond (Past regret/prevention): If + had + V3, would have + V3 · Unless',
      canDo: 'Proponer mejoras hipotéticas ("Si ajustáramos X, evitaríamos Y") y analizar qué habría prevenido una falla pasada.',
      industryContext: 'Juntas CAPA de prevención de fallas, lluvia de ideas 8D y lecciones aprendidas.',
      warmupPrompt: 'Diferencia temporal clave: *"If we ADJUSTED the clamp, yield WOULD improve"* (ahora/hipotético) vs *"If we HAD checked it yesterday, the motor WOULDN\'T HAVE burned"* (pasado irreal).',
      grammarFormulaHtml: makeFormula('2º (Hipótesis hoy): If + Pasado Simple (were), would / could + V', '|', '3º (Pasado irreal): If + had + V3, would/could HAVE + V3', '', '', 'If we <strong>redesigned</strong> the jig, scrap <strong>would drop</strong>. · If we <strong>had tested</strong> twice, it <strong>wouldn\'t have failed</strong>.'),
      explanationES: '<strong>2º Condicional:</strong> situaciones imaginarias, improbables o propuestas futuras hipotéticas (<code>If + past, would/could + base</code>; con <em>to be</em> se prefiere <code>If I were...</code>). <strong>3º Condicional:</strong> analizar un evento pasado imposible de cambiar (<code>If + had + V3, would/could/might have + V3</code>). Usa <code>unless</code> = "a menos que / si no".',
      goldenRuleES: 'En la mitad del <code>If</code> NUNCA pongas <code>would</code>! Error clásico: *"If I would know"* → Correcto: *"If I KNEW / If I HAD KNOWN"*.',
      commonMistake: { bad: 'If I would have money, I buy it. If he calibrated it, it wouldn\'t have stopped.', good: 'If I HAD money, I WOULD buy it. If he HAD CALIBRATED it, it wouldn\'t have stopped.', exp: 'Nunca pongas "would" después de "If"; en 3º condicional la causa pasada exige "had + V3".' },
      falseCognate: { term: 'Unless vs If not', mistake: 'Unless you don\'t wear goggles...', correct: 'Unless you wear goggles... (= If you don\'t wear goggles)', tip: '"Unless" ya es negativo ("a menos que"); ¡no le agregues "don\'t" o creas doble negación!' },
      vocab: [
        { en: 'Countermeasure / Containment', es: 'Contramedida / Contención', ipa: '/ˈkaʊntərmɛʒər/', pinkStress: 'COUN-ter-mea-sure', example: 'If we added a guide pin, scrap would disappear.', exampleES: 'Si agregáramos un perno guía, el desperdicio desaparecería.' },
        { en: 'Unless', es: 'A menos que / Si no', ipa: '/ənˈlɛs/', pinkStress: 'un-LESS', example: 'Unless the supplier tests Batch 4, we\'ll hold payment.', exampleES: 'A menos que el proveedor pruebe Lote 4, retendremos pago.' },
        { en: 'Prevent / Avoid', es: 'Prevenir / Evitar', ipa: '/prɪˈvɛnt/', pinkStress: 'pre-VENT', example: 'A backup battery would have prevented data loss.', exampleES: 'Una batería de respaldo habría prevenido pérdida de datos.' }
      ],
      dialogue: [
        { speaker: 'Eng 1', en: 'Why did the batch fail optical inspection last Tuesday?', es: '¿Por qué falló el lote en inspección óptica el martes pasado?' },
        { speaker: 'Eng 2', en: 'Honestly, if our team had calibrated the camera Monday night, those 40 boards wouldn\'t have failed.', es: 'Honestamente, si nuestro equipo hubiera calibrado la cámara el lunes, esas 40 placas no habrían fallado.' },
        { speaker: 'Eng 1', en: 'True. Moving forward, if we automated the morning check, could we eliminate manual drift?', es: 'Cierto. En adelante, si automatizáramos el chequeo matutino, ¿podríamos eliminar la deriva manual?' },
        { speaker: 'Eng 2', en: 'Yes! And unless maintenance signs off daily, Line 3 stays locked.', es: '¡Sí! Y a menos que mantenimiento firme diario, la Línea 3 queda bloqueada.' }
      ],
      drills: [
        { q: 'If we ___ the clamping fixture, we ___ reduce machining vibration significantly.', opts: ['redesigned / would', 'would redesign / had', 'redesign / would have', 'had redesigned / will'], ans: 0, exp: '2º condicional (propuesta hipotética): If + Past ("redesigned"), "would + V".', socraticHint: 'Propuesta de mejora actual.' },
        { q: 'If I ___ the warning email earlier, I ___ ordered the spare relay immediately.', opts: ['had seen / would have', 'saw / would have', 'would have seen / had', 'see / will have'], ans: 0, exp: '3º condicional (pasado irreal): If + had + V3, would have + V3.', socraticHint: 'Lamentando una omisión pasada.' },
        { q: '___ the vendor provides a valid lab report, we will keep the pallet quarantined.', opts: ['Unless', 'Unless not', 'If', 'Would'], ans: 0, exp: '"Unless" = si no / a menos que (sin "not").', socraticHint: 'Condición negativa en una sola palabra.' }
      ],
      classroomActivity: {
        title: '"Laboratorio ¿Qué Hubiera Pasado Si...?" (2º vs 3º Condicional)',
        grouping: 'Parejas (13 min)',
        materials: '2 casos: 1 incidente pasado famoso/planta + 1 mejora futura ideal',
        steps: ['Analizan el caso pasado con 2 oraciones 3er Condicional ("If they had checked..., it wouldn\'t have...").', 'Proponen 2 mejoras con 2o Condicional ("If our campus had..., students would...").']
      },
      powerSheet: {
        fillBlanks: ['1. If I ___ you, I would verify the torque again. (were / was been)', '2. If she had woken up earlier, she ___ ___ caught the bus. (would have)', '3. ___ we fix this bug, the app will crash. (Unless / If)', '4. What would you do if a server ___ during demo? (crashed / would crash)'],
        reorder: ['had / would / called / helped / If / you / , / I / have / .', 'won / If / I / lab / buy / a / would / the lottery / I / new / .'],
        writePrompt: 'Escribe 1 hipótesis actual (2º Cond.) sobre tu carrera y 1 lección aprendida del pasado (3º Cond.):',
        answerKey: '1) were · 2) would have · 3) Unless · 4) crashed | Orden: If you had called, I would have helped. / If I won the lottery, I would buy a new lab.'
      }
    },
    {
      id: 'b1-c15', unitId: 'b1-u4', level: 'B1', classNum: 15, coreType: 'CORE', eaqualsRef: '#109, #110, #114, #116, #117, #119',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Modals of Deduction (must/can\'t/might) & Past Modals (should/might have)',
      titleES: 'Modales de Deducción Presente y Pasado (must / can\'t / should have)',
      grammarFocus: 'Present deduction: must (95% sure true) vs can\'t (95% sure impossible) vs might/may (50%) · Past regret/criticism: should have + V3 / ought to / need to',
      canDo: 'Deducir causas lógicas con base en evidencia presente y evaluar errores pasados con tacto (should have / shouldn\'t have).',
      industryContext: 'Diagnóstico lógico por descarte y auditorías constructivas de errores previos.',
      warmupPrompt: 'Si ves la luz LED verde apagada y el cable desenchufado: ¿dices "It MUST be unplugged" o "It CAN\'T be broken yet"? ¡Aprende a deducir con certeza!',
      grammarFormulaHtml: makeFormula('Deducción Hoy: MUST / MIGHT / CAN\'T + V base', '|', 'Crítica / Arrepentimiento Pasado: SHOULD / MIGHT HAVE + V3', '', '', 'The sensor <strong>can\'t be</strong> dead—it\'s brand new! · We <strong>should have checked</strong> the voltage first.'),
      explanationES: '<strong>Deducción lógica presente:</strong> <code>must + be</code> = estoy casi seguro que SÍ por las pistas; <code>can\'t + be</code> = es lógicamente IMPOSIBLE (¡no uses <em>mustn\'t</em> para deducir!). <strong>Modales en pasado:</strong> <code>should have + V3</code> ("debimos haber hecho X, pero no lo hicimos"); <code>might have + V3</code> ("quizás ocurrió"). Obligación formal alternativa: <code>ought to</code> y <code>need to</code>.',
      goldenRuleES: '¡Cuidado español! El contrario lógico de <em>"Must be true"</em> NO es *"mustn\'t be"*; es siempre <strong>"CAN\'T be"</strong> (*That can\'t be right!*).',
      commonMistake: { bad: "He mustn't be at home; I saw his car leave! We should check yesterday (omitiendo have).", good: "He CAN'T be at home; I saw him leave! We SHOULD HAVE CHECKED yesterday.", exp: 'Deducción negativa imposible usa "can\'t"; pasado de obligación incumplida exige "should have + V3".' },
      falseCognate: { term: 'Must vs Have to vs Need to', mistake: 'Pensar que "ought to" es más fuerte que "must"', correct: 'Ought to ≈ should (recomendación/deber moral) | Need to = necesidad práctica | Must = obligación/deducción fuerte', tip: '"You really ought to double-check tolerances before shipping."' },
      vocab: [
        { en: "Can't be / Must be", es: 'Imposible que sea / Seguro que es', ipa: '/kænt bi / mʌst bi/', pinkStress: "CAN'T be / MUST be", example: 'That number can\'t be true—zero isn\'t realistic!', exampleES: 'Esa cifra no puede ser cierta; ¡cero no es realista!' },
        { en: 'Should have + V3', es: 'Debió haber... (no se hizo)', ipa: '/ʃʊd hæv/', pinkStress: 'SHOULD have', example: 'They should have labeled the box before storing it.', exampleES: 'Debieron haber etiquetado la caja antes de guardarla.' },
        { en: 'Ought to / Need to', es: 'Debería / Necesita', ipa: '/ˈɔt tu/', pinkStress: 'OUGHT to', example: 'We ought to notify Safety right away.', exampleES: 'Deberíamos notificar a Seguridad de inmediato.' }
      ],
      dialogue: [
        { speaker: 'Tech', en: 'Wait—the dashboard says Machine 2 is running at 300°C! Look!', es: 'Espera, ¡el tablero dice que la Máquina 2 corre a 300°C! ¡Mira!' },
        { speaker: 'Engineer', en: 'Hold on. That can\'t be right! I touched the outer panel two minutes ago and it was cool.', es: 'Calma. ¡Eso no puede estar bien! Toqué el panel hace dos minutos y estaba frío.' },
        { speaker: 'Tech', en: 'True! Then the temperature probe must be faulty.', es: '¡Cierto! Entonces la sonda de temperatura debe estar dañada.' },
        { speaker: 'Engineer', en: 'Yes, and maintenance should have swapped that cable last Friday.', es: 'Sí, y mantenimiento debió haber cambiado ese cable el viernes pasado.' }
      ],
      drills: [
        { q: 'Carlos just walked out the gate five seconds ago; he ___ be at the hotel already!', opts: ["can't", "mustn't", "shouldn't", 'has not to'], ans: 0, exp: 'Imposibilidad lógica basada en evidencia = "can\'t".', socraticHint: 'Nunca "mustn\'t" para deducción.' },
        { q: 'We ran out of packaging tape! Someone ___ ordered extra rolls last week.', opts: ['should have', 'must to have', 'should', 'had ought to'], ans: 0, exp: 'Reproche o acción no realizada en el pasado = "should have + V3".', socraticHint: 'Debió haberlo hecho y no se hizo.' },
        { q: 'All lights are off and every desk is empty; the team ___ be at the town hall meeting.', opts: ['must', 'can', "can't", 'would'], ans: 0, exp: 'Deducción lógica muy probable con evidencia clara = "must".', socraticHint: 'Certeza positiva por pistas.' }
      ],
      classroomActivity: {
        title: '"Detectives de Evidencia" (Deducción Presente + Crítica Pasada)',
        grouping: 'Tríos (13 min)',
        materials: '4 escenas misteriosas (Sala vacía con café caliente, Alarma roja pero motor frío, Falla tras envío urgente)',
        steps: ['Por cada escena producen 1 deducción con "must be", 1 imposibilidad con "can\'t be" y 1 mejora pasada con "someone should have + V3".']
      },
      powerSheet: {
        fillBlanks: ['1. He drove 12 hours without rest; he ___ be exhausted! (must / can)', "2. You ___ be serious—that price is way too low! (can't / mustn't)", '3. We forgot the umbrella; we ___ ___ checked the weather. (should have)', '4. You ___ to inform QA before altering specs. (ought / must)'],
        reorder: ['have / earlier / checked / should / the log / They / .', "can't / be / empty / already / tank / The / !"],
        writePrompt: 'Haz 1 deducción lógica con "must/can\'t" y 1 consejo sobre algo pasado con "should have":',
        answerKey: "1) must · 2) can't · 3) should have · 4) ought | Orden: They should have checked the log earlier. / The tank can't be empty already!"
      }
    },
    {
      id: 'b1-c16', unitId: 'b1-u4', level: 'B1', classNum: 16, coreType: 'CORE', eaqualsRef: '#29, #31, #155, #156, #157, #163',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Comparative Adverbs, Intensifiers, Diplomatic Disagreement & 8D Crucible',
      titleES: 'Adverbios Comparativos, Desacuerdo Diplomático y Crisol 8D (B1 Capstone)',
      grammarFocus: 'Adverbs (-ly, well, hard) & more quickly/fastest · Intensifiers (too, so, enough, extremely) · Diplomatic phrasing (I see your point, however...)',
      canDo: 'Debatir propuestas con diplomacia profesional, comparar desempeño con adverbios y defender soluciones 8D en Crisol B1.',
      industryContext: 'Juntas de contención de calidad (8D Problem Solving) y defensa de contramedidas.',
      warmupPrompt: '¿Cómo corriges a un director estadounidense sin sonar hostil (*"You are wrong!"*)? Usa la técnica sándwich diplomática.',
      grammarFormulaHtml: makeFormula('Validación (I see your point)', '+', 'Pivote (however / with respect)', '+', 'Evidencia + Solución (more reliably / fast enough)', '<strong>I see your point</strong>; <strong>however</strong>, data shows the sensor runs <strong>more reliably</strong> at 12V.'),
      explanationES: 'Los <strong>adjetivos</strong> describen sustantivos (<em>a good team, extremely clear</em>); los <strong>adverbios</strong> describen verbos o acciones (<em>work quickly, test carefully, perform well</em>). Compara acciones con <code>more/less + adverbio + than</code> o irregulares (<em>faster, harder, better, worse</em>). En desacuerdos valida primero antes de objetar: <em>"I see your point; however, the data suggests..."</em>.',
      goldenRuleES: 'Diferencia clave: <code>good</code> es adjetivo (*good driver*); <code>well</code> es adverbio (*drives well*). Y nunca uses *"too much"* antes de adjetivo; di *"much too loud"* o *"too loud"*.',
      commonMistake: { bad: 'You speak English very good! Machine runs quick. You are wrong on tolerances.', good: 'You speak English VERY WELL! Machine runs QUICKLY. With respect, data suggests otherwise.', exp: 'Usa adverbios ("well, quickly") tras verbos de acción; evita descalificaciones directas en desacuerdos.' },
      falseCognate: { term: 'Compromise / Containment', mistake: 'Creer que "Compromise" significa comprometer seguridad', correct: 'Compromise = acuerdo intermedio ganar-ganar | Containment = contención inmediata de defecto', tip: '"Let\'s find a compromise that protects containment deadlines."' },
      vocab: [
        { en: 'I see your point, however...', es: 'Entiendo tu punto, sin embargo...', ipa: '/aɪ si jʊr pɔɪnt/', pinkStress: 'SEE your point', example: 'I see your point on cost; however, safety comes first.', exampleES: 'Entiendo tu punto sobre costo; sin embargo seguridad va primero.' },
        { en: 'Compromise / Middle Ground', es: 'Punto medio / Acuerdo mutuo', ipa: '/ˈkɑmprəmaɪz/', pinkStress: 'COM-pro-mise', example: 'Can engineering and purchasing find a middle ground?', exampleES: '¿Pueden ingeniería y compras hallar un punto medio?' },
        { en: 'Reliably / Accurately', es: 'Confiablemente / Con precisión', ipa: '/rɪˈlaɪəbli/', pinkStress: 're-LI-a-bly', example: 'Automated stations test boards more consistently.', exampleES: 'Estaciones automatizadas prueban placas más consistentemente.' }
      ],
      dialogue: [
        { speaker: 'Mgr', en: 'We should speed up Assembly Line 1 by 20% tomorrow to clear backlog.', es: 'Deberíamos acelerar Línea 1 un 20% mañana para sacar retraso.' },
        { speaker: 'Lead', en: 'I see your point regarding delivery; however, running faster hurts weld quality.', es: 'Entiendo tu punto sobre entregas; sin embargo correr más rápido daña soldadura.' },
        { speaker: 'Mgr', en: 'Wait—did the new solder paste run worse last night?', es: 'Espera, ¿corrió peor la pasta de soldar nueva anoche?' },
        { speaker: 'Lead', en: 'Yes, slightly worse. If we run 10% slower today, we can contain defects cleanly. Can we meet in the middle?', es: 'Sí, algo peor. Si corremos 10% más lento hoy contenemos defectos limpio. ¿Acordamos punto medio?' }
      ],
      drills: [
        { q: 'The automated laser inspects PCB joints much ___ than manual operators.', opts: ['more accurately', 'accurate', 'accurater', 'more accurate'], ans: 0, exp: 'Modifica el verbo "inspects" → adverbio comparativo "more accurately".', socraticHint: 'Verbo de acción exige adverbio (-ly).' },
        { q: 'Which sentence politely disagrees during a 8D quality review?', opts: ['With respect, telemetry suggests the drift started before Tuesday.', 'Your analysis is completely wrong.', 'No, you don\'t understand physics.', 'You made bad mistake.'], ans: 0, exp: 'Usa marcador diplomático respaldado en datos.', socraticHint: 'Tono constructivo basado en evidencia.' },
        { q: 'Our Spanish-English pronunciation sounds really ___ after daily practice!', opts: ['good / natural', 'well / naturally', 'best / clear', 'fluently / nice'], ans: 0, exp: '"sound" (verbo de percepción/estado) lleva adjetivo: sound good.', socraticHint: 'Verbos copulativos (look/sound/feel) usan adjetivo.' }
      ],
      classroomActivity: {
        title: 'Mesa Redonda 8D — Crisol de Negociación B1',
        grouping: 'Tríos (Producción vs Calidad vs Gerencia)',
        materials: 'Caso de lote defectuoso PCB 410 + tarjetas diplomáticas',
        steps: ['Debate de 6 min defendiendo contención vs entrega urgente usando mínimo 3 frases diplomáticas + 1 condicional + 1 adverbio comparativo.', 'Ejecutan Voice Crucible Boss B1 y Exam Marathon (20 min).']
      },
      powerSheet: {
        fillBlanks: ['1. She configures robots remarkably ___. (well / good)', '2. Line B operates ___ quickly than Line A. (more / most)', '3. I see your ___, ___, data requires a recall. (point, however)', '4. This exam wasn\'t ___ hard as the last one. (so / too)'],
        reorder: ['the / suggests / With / data / differently / respect / , / .'],
        writePrompt: 'Redacta una objeción diplomática de 3 líneas (Validar + However + Propuesta con If):',
        answerKey: '1) well · 2) more · 3) point, however · 4) so | Orden: With respect, the data suggests differently.'
      }
    }

    // =========================================================================
    // NIVEL B2 — 16 CLASES MODULARES (b2-c01 .. b2-c16)
    // =========================================================================
    ,{
      id: 'b2-c01', unitId: 'b2-u1', level: 'B2', classNum: 1, coreType: 'CORE', eaqualsRef: '#99, #100',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Advanced Passives (Modals, Continuous & Reporting Structures)',
      titleES: 'Pasivas Avanzadas con Modales, Continuas y Verbos de Reporte',
      grammarFocus: 'must/should have been + V3 · is/are being + V3 · It is estimated/believed that / X is thought to have...',
      canDo: 'Redactar reportes objetivos de auditoría, ECOs y acciones en curso manteniendo tono técnico impersonal B2.',
      industryContext: 'Órdenes de Cambio de Ingeniería (ECO), auditorías IATF/AS9100 y boletines ejecutivos.',
      warmupPrompt: '¿Cómo expresas en inglés técnico: *"La falla DEBIÓ HABER SIDO reportada antes"* y *"Se estima que la planta ampliará..."*?',
      grammarFormulaHtml: makeFormula('Modal + be / have been + V3', '|', 'Continuo: is/was BEING + V3', '|', 'Reporting: It is estimated that... / X is known to...', 'The spec <strong>is being reviewed</strong>. · This tolerance <strong>should have been flagged</strong> earlier. · <strong>It is estimated that</strong> yield will rise.'),
      explanationES: 'La pasiva B2 combina cualquier tiempo o modal colocando siempre <strong>to be en la forma del auxiliar</strong> + V3: 1) Modal presente: <code>must be verified</code>; 2) Modal pasado: <code>should have been shipped</code>; 3) En proceso ahora: <code>is being tested</code>; 4) Reporte objetivo impersonal: <code>It is estimated that...</code> o <code>The alloy was determined to be...</code>.',
      goldenRuleES: 'En pasiva continua jamás omitas <strong>being</strong>: <em>"The BOM is being updated"</em> (no *"is updating"* cuando se refiere al documento mismo).',
      commonMistake: { bad: 'The ECO must submitted today. The prototype is testing right now by engineers.', good: 'The ECO MUST BE SUBMITTED today. The prototype IS BEING TESTED right now.', exp: 'Modal exige "be + V3"; acción pasiva en progreso exige "is being + V3".' },
      falseCognate: { term: 'Deviation / Concession vs Permit', mistake: 'Solicitar un "desviation permission"', correct: 'Deviation permit / Temporary concession = permiso temporal fuera de especificación', tip: '"A temporary deviation permit was granted by the customer QA board."' },
      vocab: [
        { en: 'Engineering Change Order (ECO)', es: 'Orden de Cambio de Ingeniería', ipa: '/ˈɔrdər/', pinkStress: 'E-C-O', example: 'The ECO is currently being reviewed by Manufacturing.', exampleES: 'La ECO está siendo revisada actualmente por Manufactura.' },
        { en: 'Deviation Permit / BOM', es: 'Permiso de desviación / Lista de materiales', ipa: '/ˌdiviˈeɪʃən/', pinkStress: 'de-vi-A-tion', example: 'Bill of Materials updates must be approved first.', exampleES: 'Las actualizaciones del BOM deben aprobarse primero.' },
        { en: 'It is estimated that...', es: 'Se estima que...', ipa: '/ˈɛstəˌmeɪtɪd/', pinkStress: 'ES-ti-mat-ed', example: 'It is estimated that tooling changeover takes 48 hours.', exampleES: 'Se estima que el cambio de herramental toma 48h.' }
      ],
      dialogue: [
        { speaker: 'VP Eng', en: 'Where is the status on Revision C of our thermal bracket?', es: '¿Cómo va el estatus de la Revisión C del soporte térmico?' },
        { speaker: 'Lead', en: 'ECO-402 is currently being validated by QA, and updated BOM sheets should have been uploaded at noon.', es: 'ECO-402 está siendo validada por Calidad ahora, y los BOM debieron subirse al mediodía.' },
        { speaker: 'VP Eng', en: 'Were the obsolete heat sinks quarantined?', es: '¿Los disipadores obsoletos fueron puestos en cuarentena?' },
        { speaker: 'Lead', en: 'Yes—and it is projected that scrap rate will drop below 0.5% next week.', es: 'Sí; y se proyecta que la tasa de merma baje de 0.5% la próxima semana.' }
      ],
      drills: [
        { q: 'The new engineering change order ___ currently ___ reviewed by the quality board.', opts: ['is / being', 'has / be', 'was / been', 'is / been'], ans: 0, exp: '"currently" indica presente continuo pasivo: is being + V3.', socraticHint: 'Pasiva continua.' },
        { q: 'That thermal drift ___ flagged during incoming inspection two weeks ago!', opts: ['should have been', 'should be have', 'must being', 'ought to been'], ans: 0, exp: 'Obligación incumplida en el pasado pasivo = should have been + V3.', socraticHint: 'Modal pasado pasivo.' },
        { q: 'The hairline crack was ___ to be the main cause of premature fatigue.', opts: ['determined', 'determining', 'determine', 'determines'], ans: 0, exp: 'Pasiva de reporte impersonal: was determined to be...', socraticHint: 'Participio pasado en reporte.' }
      ],
      classroomActivity: {
        title: '"Boletín Ejecutivo Impersonal" (Pasivas Avanzadas)',
        grouping: 'Parejas (13 min)',
        materials: '4 oraciones informales con nombres personales culpando gente',
        steps: ['Transforman acusaciones ("Juan forgot to calibrate...") en lenguaje objetivo ISO ("The unit should have been calibrated prior to...", "An investigation is currently being conducted...").']
      },
      powerSheet: {
        fillBlanks: ['1. Patient data must ___ encrypted at rest. (be / being)', '2. Wait—our shipment ___ ___ unloaded right now! (is being)', '3. Warning labels should ___ ___ placed yesterday. (have been)', '4. It ___ believed that laser welding saves 15% cycle time. (is / has)'],
        reorder: ['currently / being / updated / is / software / The / .', 'by Friday / must / deviations / approved / be / All / .'],
        writePrompt: 'Escribe 2 líneas de reporte de auditoría usando "is being + V3" y "should have been + V3":',
        answerKey: '1) be · 2) is being · 3) have been · 4) is | Orden: The software is currently being updated. / All deviations must be approved by Friday.'
      }
    },
    {
      id: 'b2-c02', unitId: 'b2-u1', level: 'B2', classNum: 2, coreType: 'CORE', eaqualsRef: '#102',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Non-Defining & Reduced Relative Clauses for Dense Specs',
      titleES: 'Cláusulas Relativas No Definitorias y Reducidas en Especificaciones',
      grammarFocus: ', which / , who (NEVER "that" after comma!) · , which + whole clause summary · Reduced relatives (V-ing / V3)',
      canDo: 'Añadir contexto técnico adicional entre comas y compactar cláusulas largas usando participios reducidos.',
      industryContext: 'Especificaciones de materiales, trazabilidad de proveedores y resúmenes concisos.',
      warmupPrompt: '¿Por qué la coma antes de ", WHICH" cambia totalmente el significado—y por qué prohibimos ", THAT" después de coma?',
      grammarFormulaHtml: makeFormula('Dato extra: Sustantivo, WHICH / WHO ..., Verbo', '|', 'Resumen de frase: ..., WHICH caused a delay.', '|', 'Reducida: The part [made in Texas / running fast]', 'Mexicali, <strong>which hosts</strong> semiconductor hubs, expanded fast. · Power dropped, <strong>which halted</strong> testing. · Chips <strong>fabricated here</strong> pass ISO.'),
      explanationES: '<strong>Non-defining clauses</strong> aportan información extra (no esencial) entre comas: nunca usan <code>that</code> ni omiten el pronombre (usa <code>, who</code> o <code>, which</code>). Además, <code>, which</code> puede comentar <strong>toda la oración previa</strong> (*He resigned early, which surprised us*). <strong>Reducción:</strong> borra <em>which is/are</em> dejando solo <code>V-ing</code> (activa: <em>sensors measuring heat</em>) o <code>V3</code> (pasiva: <em>bolts tightened at 20 Nm</em>).',
      goldenRuleES: 'Después de una coma <strong>JAMÁS escribas "that"</strong>: siempre es <code>, which</code> o <code>, who</code>. Y en reducciones pasivas quédate con el participio V3 directo.',
      commonMistake: { bad: 'Our supplier, that lives in Texas, sent it. The mold making in Japan broke.', good: 'Our supplier, WHO is based in Texas, sent it. The mold MADE in Japan broke.', exp: 'Comas rechazan "that"; un molde que recibió fabricación usa participio pasivo "made", no "making".' },
      falseCognate: { term: 'Reduced Relative vs Participle Error', mistake: 'Parts inspecting yesterday shipped today', correct: 'Parts INSPECTED yesterday shipped today (= that were inspected)', tip: 'Pregunta: ¿las piezas inspeccionaron o fueron inspeccionadas? Si reciben la acción usa V3 (-ed).' },
      vocab: [
        { en: 'Traceability / Obsolescence', es: 'Trazabilidad / Obsolescencia', ipa: '/ˌɑbsəˈlɛsəns/', pinkStress: 'ob-so-LES-cence', example: 'Component obsolescence, which happens rapidly in ICs, hurts BOMs.', exampleES: 'La obsolescencia de componentes, que ocurre rápido en CI, afecta los BOMs.' },
        { en: 'Allocated / Manufactured in', es: 'Asignado / Fabricado en', ipa: '/ˈæləˌkeɪtɪd/', pinkStress: 'AL-lo-cat-ed', example: 'Units manufactured in Tier-1 cells include serial barcodes.', exampleES: 'Las unidades fabricadas en celdas Tier-1 llevan código serial.' },
        { en: 'Comply with (standard)', es: 'Cumplir con norma', ipa: '/kəmˈplaɪ wɪð/', pinkStress: 'com-PLY with', example: 'All resins complying with RoHS stay approved.', exampleES: 'Todas las resinas que cumplen con RoHS permanecen aprobadas.' }
      ],
      dialogue: [
        { speaker: 'Eng A', en: 'We flagged Vendor B, which missed three shipments last quarter, for review.', es: 'Marcamos al Proveedor B, el cual falló tres envíos el trimestre pasado, para revisión.' },
        { speaker: 'Eng B', en: 'Right—and any parts shipped without a Material Test Report go to hold.', es: 'Cierto; y toda pieza enviada sin certificado de material va a retención.' },
        { speaker: 'Eng A', en: 'Agreed. Even our main customer, who normally waives fees, denied concession!', es: 'De acuerdo. ¡Incluso nuestro cliente principal, quien normalmente condona cargos, negó concesión!' }
      ],
      drills: [
        { q: 'Silicon Valley, ___ serves as a global tech epicenter, faces steep engineering salaries.', opts: ['which', 'that', 'where it', 'who'], ans: 0, exp: 'Entre comas (Non-defining) solo cabe "which" para cosas/lugares como sujeto, nunca "that".', socraticHint: 'Cláusula explicativa entre comas.' },
        { q: 'He fixed the zero-point drift within ten minutes, ___ saved an entire production shift.', opts: ['which', 'that', 'what', 'who'], ans: 0, exp: '", which + verbo" refiere a todo el hecho completo de la frase previa.', socraticHint: 'Evaluando toda la oración anterior.' },
        { q: 'Brackets ___ with laser tolerances under 0.05 mm qualify for aerospace assembly.', opts: ['machined', 'machining', 'which machining', 'are machined'], ans: 0, exp: 'Cláusula relativa pasiva reducida: "(which are) machined" → "machined".', socraticHint: 'Los soportes reciben el maquinado (V3).' }
      ],
      classroomActivity: {
        title: '"Compresor de Especificaciones" (De 2 Frases a 1 Relativa B2)',
        grouping: 'Parejas (13 min)',
        materials: '4 pares de frases técnicas largas',
        steps: ['Fusionan cada par usando primero ", which/who" y después lo comprimen en 1 cláusula reducida (-ing o -ed).']
      },
      powerSheet: {
        fillBlanks: ['1. Monterrey, ___ exports heavy machinery worldwide, added two parks. (which / that)', '2. Our team passed ISO audit cleanly, ___ boosted executive trust. (which / what)', '3. Sensors ___ (calibrate) last week sit on Shelf A. (calibrated / calibrating)', '4. Engineers ___ (work) night shift receive bonus pay. (working / worked)'],
        reorder: ['failed / , which / the test / , / cost us / two days / .'],
        writePrompt: 'Escribe 1 frase sobre una empresa/ciudad con ", which..." y 1 frase con participio reducido (-ed/-ing):',
        answerKey: '1) which · 2) which · 3) calibrated · 4) working | Orden: The test failed, which cost us two days.'
      }
    },
    {
      id: 'b2-c03', unitId: 'b2-u1', level: 'B2', classNum: 3, coreType: 'CORE', eaqualsRef: '#92',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Mixed Conditionals & Nominalization for Executive Conciseness',
      titleES: 'Condicionales Mixtos y Nominalización Técnica Concisa',
      grammarFocus: 'Mixed Conditionals (Past Cause → Present Result: If + had V3, would + V now) · Nominalization (verbs/adjs → noun phrases)',
      canDo: 'Conectar decisiones pasadas con consecuencias presentes mediante condicionales mixtos y condensar párrafos con nominalización.',
      industryContext: 'Justificación de ECOs, análisis de impacto financiero actual por fallas previas y resúmenes ejecutivos.',
      warmupPrompt: '¿Cómo traduces: *"Si HUBIÉRAMOS comprado el repuesto ayer (pasado), la línea ESTARÍA operando HOY (presente)"*?',
      grammarFormulaHtml: makeFormula('Pasado → Hoy: If + S + had + V3, S + would + V [right now]', '|', 'Nominalización: When we fail to inspect → Inspection failure leads to...', '', '', 'If we <strong>had signed</strong> the NDA earlier, we <strong>would be</strong> testing prototypes <strong>today</strong>.'),
      explanationES: 'Los <strong>Mixed Conditionals</strong> cruzan tiempos: 1) Causa pasada (<code>If + had + V3</code>) + consecuencia ACTUAL (<code>would/could + V base + now/today</code>); 2) Rasgo permanente hoy (<code>If + Past</code>) + evento pasado (<code>would have + V3</code>). La <strong>Nominalización</strong> transforma verbos verbosos en sustantivos compactos (<em>analyze → analysis, fail → failure, delay → delay</em>) logrando estilo ejecutivo.',
      goldenRuleES: 'Fíjate siempre en los marcadores de tiempo al final de la oración principal: palabras como <strong>now, today, currently</strong> exigen <code>would + V</code> (NO <em>would have</em>) aun cuando el <em>If</em> lleve <code>had + V3</code>.',
      commonMistake: { bad: 'If he calibrated the sensor yesterday, it would have work right now.', good: 'If he HAD CALIBRATED the sensor yesterday, it WOULD BE WORKING right now.', exp: 'Causa de ayer = had + V3; consecuencia presente ("right now") = would + V / be V-ing.' },
      falseCognate: { term: 'Viability / Feasibility vs Actualization', mistake: 'Nominalizar mal inventando "-tion"', correct: 'Perform → performance · Maintain → maintenance · Implement → implementation', tip: 'Usa nominalización con medida para títulos y métricas: "Rapid containment prevented recall escalation."' },
      vocab: [
        { en: 'Nominalization / Conciseness', es: 'Nominalización / Concisión ejecutiva', ipa: '/kənˈsaɪsnəs/', pinkStress: 'con-CISE-ness', example: 'Executive memos favor structural conciseness.', exampleES: 'Memorándums ejecutivos favorecen concisión estructural.' },
        { en: 'Trade-off / Scrap Rate', es: 'Compensación (pros/contras) / Merma', ipa: '/ˈtreɪd ɔf/', pinkStress: 'TRADE-off', example: 'Cost vs weight trade-offs delayed approval.', exampleES: 'Compensaciones costo-peso retrasaron aprobación.' },
        { en: 'Imperative (that + subjunctive)', es: 'Imperativo que (+ verbo base)', ipa: '/ɪmˈpɛrətɪv/', pinkStress: 'im-PER-a-tive', example: 'It is imperative that the vendor submit MTRs.', exampleES: 'Es imperativo que el proveedor envíe los MTRs.' }
      ],
      dialogue: [
        { speaker: 'Director', en: 'Why are we still waiting on Line 3 tooling validation today?', es: '¿Por qué seguimos esperando hoy la validación de herramental en Línea 3?' },
        { speaker: 'Engineer', en: 'If purchasing had approved the backup vendor last month, we would be shipping Volume Batch 1 right now.', es: 'Si compras hubiera aprobado al proveedor respaldo el mes pasado, estaríamos enviando el lote 1 ahorita.' },
        { speaker: 'Director', en: 'Fair point. What is our risk mitigation going forward?', es: 'Buen punto. ¿Cuál es nuestra mitigación de riesgo en adelante?' },
        { speaker: 'Engineer', en: 'Dual sourcing and pre-qualification will prevent future stoppages.', es: 'Proveeduría dual y precalificación evitarán paros futuros.' }
      ],
      drills: [
        { q: 'If our team ___ the fatigue test last week, production ___ operating smoothly today.', opts: ['had run / would be', 'ran / would have been', 'had run / would have', 'would run / had been'], ans: 0, exp: 'Causa pasada ("last week") + resultado en el presente ("today") → Mixed Conditional.', socraticHint: 'Observa "last week" vs "today".' },
        { q: 'If Luis weren\'t afraid of heights (general trait), he ___ climbed the tower yesterday.', opts: ['would have', 'would', 'had', 'will have'], ans: 0, exp: 'Rasgo permanente actual ("If + weren\'t") + efecto pasado ("yesterday") → would have + V3.', socraticHint: 'Segundo tipo inverso: rasgo general → acción pasada.' },
        { q: 'Which option applies executive nominalization cleanly?', opts: ['Vendor delay triggered line reallocation.', 'Because vendor delayed us, we had to move line things.', 'The vendor was slow so we changed.', 'Delaying of vendor made line move.'], ans: 0, exp: 'Sustantivo compacto + verbo preciso + objeto técnico.', socraticHint: 'Estilo directo de reporte B2.' }
      ],
      classroomActivity: {
        title: '"Causa Pasada → Efecto Hoy" + Editor Conciso B2',
        grouping: 'Parejas (13 min)',
        materials: '3 decisiones pasadas históricas/propias + 3 párrafos verbosos para compactar',
        steps: ['Escriben 2 condicionales mixtos reales ("If I had learned English earlier, I wouldn\'t feel stressed now").', 'Comprimen frases verbosas de 14 palabras a 6 usando nominalización.']
      },
      powerSheet: {
        fillBlanks: ['1. If we had caught that bug in QA, clients ___ be complaining today. (wouldn\'t / hadn\'t)', '2. If she spoke fluent German, she ___ ___ got the Berlin role last year. (would have)', '3. Nominalize "We failed to calibrate" → Calibration ___ led to scrap. (failure)', '4. It is crucial that every batch ___ (pass) testing. (pass — subjunctive)'],
        reorder: ['now / right / be / wouldn\'t / debugging / We / .', 'earlier / had / left / If / we / , / .'],
        writePrompt: 'Escribe 1 condicional mixto (causa pasada → resultado HOY) y reescribe "The supplier delivered late, so production stopped" nominalizado:',
        answerKey: "1) wouldn't · 2) would have · 3) failure · 4) pass | Orden: We wouldn't be debugging right now. / If we had left earlier, ... | Nom: Late supplier delivery caused production stoppage."
      }
    },
    {
      id: 'b2-c04', unitId: 'b2-u1', level: 'B2', classNum: 4, coreType: 'CORE', eaqualsRef: '#23, #34',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'ECO Technical Justification & Tolerance Defense (B2 U1 Workshop)',
      titleES: 'Justificación Técnica de ECOs y Defensa de Tolerancias (B2 U1)',
      grammarFocus: 'Giving precise information (dates, tolerances, dimensions) · Defending engineering trade-offs with passives & mixed conditionals',
      canDo: 'Presentar y defender una Orden de Cambio de Ingeniería (ECO) sustentando costo, calidad y riesgo ante clientes.',
      industryContext: 'Aprobación de cambios CNC/PCB, evaluación BOM y permisos de desviación temporal.',
      warmupPrompt: 'Cliente rechaza cambiar una tolerancia de Ra 3.2 a Ra 3.4 porque suena a menor calidad. ¿Cómo defiendes la viabilidad funcional con datos?',
      grammarFormulaHtml: makeFormula('Precision Fact + Trade-Off + Passive Action + Impact', '', '', '', '', 'Ra 3.4 meets structural stress limits, <strong>reducing scrap by 4%</strong>. Updated ECO sheets <strong>must be signed</strong> by Thursday.'),
      explanationES: 'Al defender especificaciones B2 aporta <strong>datos precisos</strong> (unidades, cifras exactas, porcentajes y fechas), emplea <strong>pasivas modales</strong> para acciones formales (<em>must be archived, could be retrofitted</em>) y justifica trade-offs con conectores de impacto.',
      goldenRuleES: 'Sustituye opiniones vagas (*"I think it\'s okay"*) por métricas concretas (*"Functional life remains identical over 50,000 cycles"*).',
      commonMistake: { bad: 'We want change Ra 3.4 because cheaper for plant and same good.', good: 'We propose modifying spec to Ra 3.4, which cuts cycle cost 12% while preserving fatigue performance.', exp: 'Alinea registro ejecutivo, precisión numérica y cláusula relativa explicativa.' },
      falseCognate: { term: 'Viable / Retrofit / Concession', mistake: 'Traducir "concesión" como tienda/subsidio', correct: 'Quality concession = autorización formal de aceptar lote fuera de especificación menor | Retrofit = adaptar equipo existente', tip: '"Legacy units could be retrofitted within two days."' },
      vocab: [
        { en: 'Retrofit / Scrap Rate', es: 'Reacondicionar / Tasa de desperdicio', ipa: '/ˈrɛtroʊˌfɪt/', pinkStress: 'RET-ro-fit', example: 'Tooling can be retrofitted without halting shifts.', exampleES: 'El herramental puede adaptarse sin detener turnos.' },
        { en: 'Trade-off', es: 'Compensación costo-beneficio', ipa: '/ˈtreɪd ɔf/', pinkStress: 'TRADE-off', example: 'Explain the lead-time vs precision trade-off.', exampleES: 'Explica la compensación entre plazo y precisión.' }
      ],
      dialogue: [
        { speaker: 'OEM Eng', en: 'Your team is requesting an ECO on bracket thickness—won\'t this weaken vibration resistance?', es: 'Su equipo pide ECO en espesor de soporte; ¿no debilitará resistencia a vibración?' },
        { speaker: 'Lead', en: 'Good question. Had we cut alloy grade, stiffness would have dropped; instead, we switched to 7075 aluminum, which maintains full margin.', es: 'Buena pregunta. Si hubiéramos bajado grado de aleación habría caído rigidez; cambiamos a aluminio 7075, el cual conserva margen completo.' },
        { speaker: 'OEM Eng', en: 'Impressive! What happens to legacy stock?', es: '¡Impresionante! ¿Qué ocurre con el inventario anterior?' },
        { speaker: 'Lead', en: 'Existing housings are currently being retrofitted and will be re-certified by Friday.', es: 'Las carcasas actuales están siendo reacondicionadas y se recertificarán el viernes.' }
      ],
      drills: [
        { q: 'Existing fixtures ___ to accept the revised bolt pattern by Tuesday.', opts: ['could be retrofitted', 'can retrofit them', 'might retrofitting', 'should been retrofit'], ans: 0, exp: 'Pasiva modal correcta para capacidad técnica factible.', socraticHint: 'Modal + be + V3.' },
        { q: 'Select the most precise engineering justification statement:', opts: ['Batch 212 failed optical test #4 on October 14 due to lens misalignment.', 'Lots of things went wrong in the lab recently.', 'The machine maybe failed on last week because bad.', 'Things wasn\'t calibrated enough.'], ans: 0, exp: 'Aporta lote, prueba, fecha exacta y causa específica.', socraticHint: 'Precisión B2.' }
      ],
      classroomActivity: {
        title: 'Comité ECO "Defiende el Cambio" (Simulación B2)',
        grouping: 'Tríos (Proponente, Comprador OEM, Quality Auditor)',
        materials: 'Caso de cambio de material/tolerancia en Power Sheet',
        steps: ['Debate de 5 minutos defendiendo la ECO con cifras precisas, 1 pasiva avanzada y 1 condicional mixto.', 'Redacción de párrafo de justificación y práctica en Voice Crucible (20 min).']
      },
      powerSheet: {
        fillBlanks: ['1. Deviation permits ___ be authorized by Chief QA. (must / have)', '2. Tooling is currently ___ modified on Press 4. (being / been)', '3. Had we caught the typo earlier, rework wouldn\'t ___ needed today. (be / have been)', '4. Adding a rib cuts mass 8%, ___ lowers shipping cost. (which / what)'],
        reorder: ['precision / balances / This ECO / cost / and / .'],
        writePrompt: 'Redacta en 4 líneas la justificación de una ECO o cambio de proceso en tu proyecto:',
        answerKey: '1) must · 2) being · 3) be · 4) which | Orden: This ECO balances cost and precision.'
      }
    },
    {
      id: 'b2-c05', unitId: 'b2-u2', level: 'B2', classNum: 5, coreType: 'CORE', eaqualsRef: '#25, #26, #29',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Hedging, Softening, Generalising & Qualifying Conditions',
      titleES: 'Hedging Ejecutivo, Matices de Certeza y Cláusulas Condicionales Formales',
      grammarFocus: 'Hedging (It would appear that, We might want to consider, It seems likely) · Provided that / On condition that / Assuming · On the whole / More often than not',
      canDo: 'Suavizar críticas o propuestas delicadas frente a directivos y fijar condiciones contractuales precisas.',
      industryContext: 'Negociaciones de entregas ajustadas, evaluación de riesgos con clientes y consultoría.',
      warmupPrompt: '¿Por qué un vicepresidente estadounidense dice *"Timelines appear somewhat tight"* en lugar de *"Your dates are impossible!"*?',
      grammarFormulaHtml: makeFormula('Softener: It would appear that / We might want to consider + V-ing', '|', 'Qualifiers: Provided (that) / As long as / Taking X into consideration', '', '', 'We <strong>might want to consider</strong> phasing tests, <strong>provided that</strong> tooling arrives Friday.'),
      explanationES: '<strong>Hedging</strong> evita sonar absoluto o confrontativo en negocios en inglés: usa <code>would appear / seem to</code>, <code>somewhat / relatively</code>, <code>we might want to consider + -ing</code>, <code>tends to</code>. Para fijar requisitos precisos usa <code>provided (that)</code>, <code>as long as</code> y <code>on condition that</code> ("siempre y cuando"). Generaliza sin exagerar usando <code>on the whole</code> y <code>more often than not</code>.',
      goldenRuleES: '¡Cuidado gramatical tras <em>provided that / as long as</em>! Funcionan igual que <em>If</em>: van seguidas de Presente Simple cuando se habla del futuro (<em>provided that you guarantee delivery</em>).',
      commonMistake: { bad: 'We might want consider splitting batches. Provided you will guarantee price.', good: 'We might want TO CONSIDER SPLITTING batches. Provided THAT you GUARANTEE price.', exp: 'Infinitivo "to consider" + gerundio "-ing"; tras "provided that" usa presente simple, no "will".' },
      falseCognate: { term: 'Bandwidth / Leverage vs Compromise', mistake: 'Decir "Let\'s take advantage of their delay" agresivamente', correct: 'We might want to leverage this window... (profesional y estratégico)', tip: '"Provided that terms align, we can leverage existing capacity."' },
      vocab: [
        { en: 'Provided that / As long as', es: 'Siempre y cuando / Con tal de que', ipa: '/prəˈvaɪdɪd ðæt/', pinkStress: 'pro-VID-ed that', example: 'We agree to the fee provided that lead time stays under 3 weeks.', exampleES: 'Aceptamos tarifa siempre y cuando el plazo quede bajo 3 semanas.' },
        { en: 'Somewhat / On the whole', es: 'Algo / En términos generales', ipa: '/ˈsʌmwʌt/', pinkStress: 'SOME-what', example: 'On the whole, deliveries were somewhat slower in Q3.', exampleES: 'En términos generales, entregas fueron algo lentas en T3.' },
        { en: 'Taking into consideration', es: 'Tomando en consideración', ipa: '/kənˌsɪdəˈreɪʃən/', pinkStress: 'con-sid-er-A-tion', example: 'Taking shipping fees into consideration, local sourcing wins.', exampleES: 'Tomando en consideración envíos, gana proveeduría local.' }
      ],
      dialogue: [
        { speaker: 'Client', en: 'From our California office, your four-week press schedule seems somewhat tight.', es: 'Desde California, su calendario de prensas de 4 semanas parece algo apretado.' },
        { speaker: 'Lead', en: 'I appreciate your concern. What we might want to consider is running qualification in two sprints.', es: 'Agradezco su preocupación. Lo que podríamos considerar es correr calificación en dos sprints.' },
        { speaker: 'Client', en: 'That sounds reasonable, provided that first-article parts arrive before June 10.', es: 'Suena razonable, siempre y cuando piezas de primer artículo lleguen antes del 10 de junio.' },
        { speaker: 'Lead', en: 'On condition that customs clears smoothly, we guarantee June 8!', es: 'Con la condición de que aduana libere fluido, ¡garantizamos 8 de junio!' }
      ],
      drills: [
        { q: 'We will absorb the extra freight charge ___ that you maintain zero defects.', opts: ['provided', 'providing will', 'in spite of', 'despite'], ans: 0, exp: '"provided (that)" introduce condición contractual obligatoria.', socraticHint: 'Equivalente formal de "if and only if".' },
        { q: 'Which phrasing uses professional hedging to critique a risky deadline?', opts: ['It would appear that current tooling capacity is somewhat constrained.', 'Your deadline is totally unrealistic and stupid.', 'We can never make that date, forget it.', 'Always impossible schedules fail.'], ans: 0, exp: 'Combina verbo modal suave "would appear" + suavizador "somewhat".', socraticHint: 'Tono diplomático B2.' },
        { q: 'We might want to consider ___ our preventive maintenance window by one hour.', opts: ['extending', 'to extending', 'extend', 'extended'], ans: 0, exp: 'El verbo "consider" exige gerundio (-ing): consider extending.', socraticHint: 'consider + V-ing.' }
      ],
      classroomActivity: {
        title: '"Suavizador Diplomático" (De Crítico Duro a Consultor B2)',
        grouping: 'Parejas (13 min)',
        materials: '5 frases duras/directas ("Your design will break!", "Price too high!")',
        steps: ['Reescriben las 5 frases aplicando hedging (It appears..., might want to consider..., somewhat...) y ponen 1 condición contractual (provided that / taking into consideration).']
      },
      powerSheet: {
        fillBlanks: ['1. We accept the revision ___ that QA signs off first. (provided / although)', '2. On the ___, thermal yield improved in May. (whole / all)', '3. We might want to consider ___ a backup carrier. (hiring / hire)', '4. Taking costs ___ consideration, Option B wins. (into / on)'],
        reorder: ['somewhat / schedule / The / looks / tight / delivery / .'],
        writePrompt: 'Reescribe "This plan is too risky" usando hedging profesional + una condición con "provided that":',
        answerKey: '1) provided · 2) whole · 3) hiring · 4) into | Orden: The delivery schedule looks somewhat tight.'
      }
    },
    {
      id: 'b2-c06', unitId: 'b2-u2', level: 'B2', classNum: 6, coreType: 'CORE', eaqualsRef: '#41, #42, #43, #44, #45',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Meeting Facilitation, Turn-Taking, Delegation & Summarising',
      titleES: 'Facilitación Ejecutiva, Toma de Turnos y Delegación en Juntas',
      grammarFocus: 'Kick off / Circle back / Moving on / Would you like to weigh in? · Summarising (In a word, To sum up, All in all) · Active reactions',
      canDo: 'Liderar y moderar una junta multidisciplinaria dando la palabra, redirigiendo desvíos y resumiendo acuerdos.',
      industryContext: 'Quarterly Business Reviews (QBRs), juntas ejecutivas transfronterizas y cierre de actas.',
      warmupPrompt: 'Cuando 2 áreas discuten fuera de agenda, ¿qué frases usa un buen moderador para delegar palabra y volver al tema sin perder autoridad?',
      grammarFormulaHtml: makeFormula('Abrir/Delegar: Would you like to kick off? / Over to you', '|', 'Redirigir: Let\'s circle back to... / Moving on to...', '|', 'Resumir: All in all / To sum up', 'Pilar, <strong>would you like to start</strong>? · Let\'s <strong>circle back to</strong> CapEx right after Logistics. · <strong>To sum up</strong>, we proceed with Option A.'),
      explanationES: 'La competencia discursiva B2 exige controlar el flujo grupal: <strong>Iniciar/Delegar:</strong> <em>Would you like to kick off? / Let\'s get started.</em> <strong>Invitar a continuar:</strong> <em>Go on / Please expand on that.</em> <strong>Reconducir tema:</strong> <em>Let\'s circle back to... / Before I forget... / To get back to what we were saying...</em>. <strong>Resumir:</strong> <em>All in all, / Briefly, / To sum up,</em>.',
      goldenRuleES: 'Si quieres retomar control amablemente cuando alguien interrumpe usa: <em>"If I understood you correctly, you\'re saying..."</em> antes de responder.',
      commonMistake: { bad: 'Shut up and speak Ana! Change topic now. Resume: good.', good: 'Thanks Mark; Ana, would you like to weigh in? Let\'s table that and circle back to...', exp: 'Usa fórmulas de transición respetuosas y precisas ("weigh in", "circle back", "table a topic").' },
      falseCognate: { term: 'Table a topic (US vs UK) / Resume', mistake: 'Confundir "table a topic" en inglés US vs español', correct: 'Table (US) = posponer un tema para después | Wrap up = concluir reunión', tip: 'En reuniones norteamericanas "Let\'s table that for Friday" significa dejarlo pendiente; "Wrap up" = cerrar.' },
      vocab: [
        { en: 'Kick off / Wrap up', es: 'Arrancar junta / Concluir cierre', ipa: '/kɪk ɔf / ræp ʌp/', pinkStress: 'KICK off / WRAP up', example: 'Let\'s kick off on time and wrap up by noon.', exampleES: 'Arranquemos a tiempo y cerremos al mediodía.' },
        { en: 'Circle back / Table a topic', es: 'Retomar tema después / Posponer discusión', ipa: '/ˈsɜrkəl bæk/', pinkStress: 'CIR-cle back', example: 'Let\'s table pricing and circle back to logistics.', exampleES: 'Pospongamos precios y retomemos logística.' },
        { en: 'Stakeholder / Weigh in', es: 'Parte interesada / Opinar/aportar', ipa: '/ˈsteɪkˌhoʊldər/', pinkStress: 'STAKE-hold-er', example: 'Wait until key stakeholders weigh in.', exampleES: 'Espera a que los involucrados clave opinen.' }
      ],
      dialogue: [
        { speaker: 'Chair', en: 'Good morning everyone! Javier, would you like to kick off our QBR update?', es: '¡Buenos días todos! Javier, ¿te gustaría arrancar la actualización QBR?' },
        { speaker: 'Javier', en: 'Sure! Production ramp-up hit 98%, though shipping lead times remain tight.', es: '¡Claro! El arranque llegó al 98%, aunque tiempos de envío siguen apretados.' },
        { speaker: 'Sarah', en: 'If I understood correctly, tooling needs two extra weeks—is that right?', es: 'Si entendí bien, el herramental ocupa dos semanas extra, ¿es así?' },
        { speaker: 'Chair', en: 'Yes, good catch! Let\'s circle back to CapEx right after reviewing milestones, and then wrap up.', es: 'Sí, buen punto. Retomemos CapEx justo tras revisar hitos, y luego cerramos.' }
      ],
      drills: [
        { q: 'A heated side-debate starts during a tight QBR. As chair, what do you say to stay on schedule?', opts: ['Let\'s table this for a breakout call and circle back to our main agenda.', 'Everyone stop talking right now.', 'You are out of topic, quiet!', 'Let us cancel everything today.'], ans: 0, exp: '"table this" (posponer cortesmente) + "circle back" (volver al punto) es el estándar B2.', socraticHint: 'Facilitación profesional estadounidense.' },
        { q: 'To verify you heard a colleague\'s argument accurately, start with:', opts: ['So if I understand you correctly, what you\'re saying is...', 'No, that doesn\'t happen.', 'Speak slower next time.', 'Whatever, let\'s wrap up.'], ans: 0, exp: 'Exponente oficial EAQUALS B2 #41 de verificación del oyente.', socraticHint: 'Checking understanding.' }
      ],
      classroomActivity: {
        title: 'Simulación "Just a Minute / Chair the QBR" (Moderación Viva)',
        grouping: 'Equipos de 4 (1 Chair + 3 Managers)',
        materials: 'Tarjetas con marcadores obligatorios (Kick off, Circle back, Weigh in, If I understand you correctly, Wrap up)',
        steps: ['Debaten durante 4 minutos aprobar nueva línea de turno mientras el Chair usa al menos 4 fórmulas de facilitación y cierra resumiendo en 30 segundos.']
      },
      powerSheet: {
        fillBlanks: ['1. Sarah, would you like to ___ ___ our safety briefing? (kick off)', '2. We\'re out of time—let\'s ___ back to budgets Friday. (circle / spin)', '3. ___ up, our Mexicali site exceeded Q2 targets. (To sum / All total)', '4. Go ahead, ___ on—we\'re listening! (carry / keep on)'],
        reorder: ['we\'ve / All in all / milestone / hit / major / a / , / .'],
        writePrompt: 'Escribe 3 frases de moderador: 1 para iniciar/ceder la palabra, 1 para redirigir tema y 1 para cerrar:',
        answerKey: '1) kick off · 2) circle · 3) To sum · 4) carry | Orden: All in all, we\'ve hit a major milestone.'
      }
    },
    {
      id: 'b2-c07', unitId: 'b2-u2', level: 'B2', classNum: 7, coreType: 'CORE', eaqualsRef: '#67, #68, #70, #71, #72',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Narrative Tenses Suite: Past Simple, Continuous, Perfect & Perfect Continuous',
      titleES: 'Suite Completa de Tiempos Narrativos (Incl. Past Perfect Continuous)',
      grammarFocus: 'Past Simple (events) · Past Continuous (setting) · Past Perfect (earlier event) · Past Perfect Continuous (had been + V-ing = duration/fatigue before past point)',
      canDo: 'Construir narrativas detalladas de experiencias, auditorías o fallas combinando los 4 tiempos pasados fluidamente.',
      industryContext: 'Reconstrucción detallada de fallas tras turnos prolongados ("They had been running at 110% load when...").',
      warmupPrompt: '¿Cómo cuentas por qué un servidor o técnico estaba agotado antes de fallar? *"They HAD BEEN TESTING for 16 hours before it crashed."*!',
      grammarFormulaHtml: makeFormula('Duración previa antes de fallo: S + HAD BEEN + V-ing (+ for/since)', '|', 'Contrastes: had V3 (completado) vs was V-ing (fondo)', '', '', 'She was tired because she <strong>had been debugging</strong> logs since 4 AM when the call came in.'),
      explanationES: 'Los 4 tiempos narrativos B2 trabajan en cine: <strong>1) Past Continuous</strong> pinta la escena de fondo; <strong>2) Past Simple</strong> mueve la acción principal; <strong>3) Past Perfect</strong> retrocede a hechos completados antes; <strong>4) Past Perfect Continuous</strong> (<code>had been + V-ing</code>) subraya <strong>duración o esfuerzo continuo</strong> previo a otro evento pasado (<em>had been driving too fast / had been overheating</em>).',
      goldenRuleES: 'Usa <em>Past Perfect Continuous</em> cuando ves una evidencia o cansancio visible en el pasado causado por una actividad previa prolongada.',
      commonMistake: { bad: 'They were working 16 hours before it failed yesterday.', good: 'They HAD BEEN WORKING for 16 hours before it failed yesterday.', exp: 'Cuando mides duración ("for 16 hours") ANTES de un punto pasado ("before it failed"), necesitas "had been + V-ing".' },
      falseCognate: { term: 'Fatigue / Overworked vs Exhausted', mistake: 'I was very tire', correct: 'Completely exhausted / drained / fatigued (metal/person)', tip: '"After they had been running trials all night, engineers were totally exhausted."' },
      vocab: [
        { en: 'Had been + V-ing', es: 'Había estado + gerundio (duración previa)', ipa: '/hæd bɪn/', pinkStress: 'HAD been -ing', example: 'The pump had been leaking silently for days before bursting.', exampleES: 'La bomba había estado fugando por días antes de reventar.' },
        { en: 'Incident Timeline / Retrospective', es: 'Línea temporal / Retrospectiva', ipa: '/ˌrɛtrəˈspɛktɪv/', pinkStress: 'ret-ro-SPEC-tive', example: 'Map the incident timeline cleanly.', exampleES: 'Mapea la línea temporal del incidente.' }
      ],
      dialogue: [
        { speaker: 'Auditor', en: 'Walk me through the crash on Line 5 last Tuesday.', es: 'Guíame por la caída en Línea 5 el martes pasado.' },
        { speaker: 'Lead', en: 'Sure. Operators were packing batch 8 when an alarm sounded. Later we discovered the chiller fan had been vibrating for three shifts!', es: 'Claro. Empacaban lote 8 cuando sonó alarma. ¡Luego vimos que el ventilador había estado vibrando tres turnos!' },
        { speaker: 'Auditor', en: 'Had maintenance logged that vibration earlier?', es: '¿Había registrado mantenimiento esa vibración antes?' },
        { speaker: 'Lead', en: 'No—someone had missed it during Monday\'s quick sweep.', es: 'No; alguien la pasó por alto en la ronda rápida del lunes.' }
      ],
      drills: [
        { q: 'Quality engineers were exhausted because they ___ testing recall samples for twelve hours straight.', opts: ['had been', 'have been', 'were being', 'did been'], ans: 0, exp: 'Causa de duración continua previa al pasado ("were exhausted") → "had been testing".', socraticHint: 'Esfuerzo sostenido antes de un estado pasado.' },
        { q: 'While I ___ home yesterday, I realized I ___ my cleanroom keycard in Locker 4.', opts: ['was driving / had left', 'had driven / was leaving', 'drove / have left', 'was drive / left'], ans: 0, exp: 'Escena en curso ("was driving") + evento anterior ya ocurrido ("had left").', socraticHint: 'Combina Past Cont. + Past Simple + Past Perfect.' }
      ],
      classroomActivity: {
        title: '"Historia en 4 Tiempos" (Cadena Narrativa B2)',
        grouping: 'Grupos de 4 (cada integrante continúa 1 tiempo verbal)',
        materials: '4 comienzos dramáticos (ej. "By the time the client landed...", "Server lights turned red at midnight...")',
        steps: ['Integrante 1 da escenario (Past Cont.), 2 da causa previa larga (had been -ing), 3 da hecho anterior (had V3), 4 da giro y cierre (Past Simple).']
      },
      powerSheet: {
        fillBlanks: ['1. The coolant pump ___ ___ running hot all week before shutting down. (had been)', '2. When QA opened the bay, someone ___ already moved the box. (had / has)', '3. While the crew ___ inspecting Gate 2, the rain began. (was / had)', '4. Every winter in 2010, our team ___ audit five suppliers. (would / was)'],
        reorder: ['for hours / had / They / debugging / been / failed / before / it / .'],
        writePrompt: 'Narra en 3–4 líneas un evento memorable usando al menos 3 tiempos pasados distintos (incluyendo had been -ing):',
        answerKey: '1) had been · 2) had · 3) was · 4) would | Orden: They had been debugging for hours before it failed.'
      }
    },
    {
      id: 'b2-c08', unitId: 'b2-u2', level: 'B2', classNum: 8, coreType: 'CORE', eaqualsRef: '#78, #79',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Future Perfect & Future Perfect Continuous (Milestones & Projections)',
      titleES: 'Futuro Perfecto y Futuro Perfecto Continuo (Metas con By + Fecha)',
      grammarFocus: 'will have + V3 (completed by future point) · will have been + V-ing (duration up to future point) · By this time next year / By Q4',
      canDo: 'Proyectar entregas completadas antes de una fecha futura y calcular antigüedad o duración acumulada hacia el futuro.',
      industryContext: 'Pronósticos QBR, cumplimientos T-MEC ("By Q4 we will have shipped 10k units") y proyecciones de proyecto.',
      warmupPrompt: '¿Cómo dices *"Para cuando llegue el auditor mañana, YA HABREMOS TERMINADO la presentación"* y *"En diciembre HABRÉ TRABAJADO aquí 5 años"*?',
      grammarFormulaHtml: makeFormula('Hito Completado: BY + [futuro], S + WILL HAVE + V3', '|', 'Duración acumulada: WILL HAVE BEEN + V-ing + FOR [tiempo]', '', '', 'By 5:00 PM, we <strong>will have inspected</strong> all 50 units. · Next month she <strong>will have been leading</strong> QA for 3 years.'),
      explanationES: '<strong>Future Perfect</strong> (<code>will have + V3</code>) sitúa tu mirada en un punto del futuro (<code>by Friday, by 2027, by the time X arrives</code>) para ver una tarea <strong>ya terminada</strong> para ese entonces. <strong>Future Perfect Continuous</strong> (<code>will have been + V-ing</code>) mide <strong>cuánto tiempo llevará ocurriendo</strong> una actividad al llegar esa fecha futura.',
      goldenRuleES: '¡No uses <em>will</em> después de <code>by the time</code> o <code>when</code>! Di: <em>"By the time the board MEETS, we WILL HAVE FINALIZED the slides."</em>',
      commonMistake: { bad: 'By tomorrow we will finished the task. By the time he will arrive, I leave.', good: 'By tomorrow we WILL HAVE FINISHED the task. By the time he ARRIVES, I WILL HAVE LEFT.', exp: 'Usa "will have + V3"; después de "by the time" usa Presente Simple con sentido futuro.' },
      falseCognate: { term: 'By vs Until (Future Perfect)', mistake: 'Until December we will have finished', correct: 'BY December, we will have finished (completado antes de esa fecha)', tip: '"By" es el compañero inseparable de Future Perfect.' },
      vocab: [
        { en: 'By the time (+ Pres.)', es: 'Para cuando (+ futuro)', ipa: '/baɪ ðə taɪm/', pinkStress: 'by the TIME', example: 'By the time you land in Dallas, we\'ll have sent specs.', exampleES: 'Para cuando aterrices en Dallas, ya habremos enviado specs.' },
        { en: 'Finalized / Shipped', es: 'Finalizado / Embarcado', ipa: '/ˈfaɪnəˌlaɪzd/', pinkStress: 'FI-nal-ized', example: 'We will have shipped Batch 12 before year-end.', exampleES: 'Habremos embarcado el Lote 12 antes de fin de año.' }
      ],
      dialogue: [
        { speaker: 'Director', en: 'When will your robotics division hit full USMCA certification?', es: '¿Cuándo alcanzará tu división de robótica certificación T-MEC completa?' },
        { speaker: 'Lead', en: 'By the end of Q3, our team will have audited all Tier-2 suppliers.', es: 'Para fin de T3, nuestro equipo habrá auditado a todos los proveedores Tier-2.' },
        { speaker: 'Director', en: 'And how long will the Mexicali site have been running cleanroom lines by then?', es: '¿Y cuánto tiempo llevará operando líneas de cuarto limpio Mexicali para entonces?' },
        { speaker: 'Lead', en: 'By October, the plant will have been running 24/7 for two full years!', es: '¡Para octubre, la planta habrá estado operando 24/7 por dos años completos!' }
      ],
      drills: [
        { q: 'By the time the executive board convenes tomorrow, our engineers ___ the 8D deck.', opts: ['will have finalized', 'will finalizing', 'will be finalize', 'have finalized'], ans: 0, exp: '"By the time + presente" → Future Perfect ("will have + V3").', socraticHint: 'Acción completada antes de otro evento futuro.' },
        { q: 'At the end of next semester, Elena ___ studying German for three full years.', opts: ['will have been', 'will has been', 'has been', 'will have'], ans: 0, exp: 'Duración acumulada hasta fecha futura → will have been + -ing.', socraticHint: 'Future Perfect Continuous + "for X years".' }
      ],
      classroomActivity: {
        title: '"Mi Yo del 2030 & Hoja de Ruta del Proyecto"',
        grouping: 'Parejas (13 min)',
        materials: '3 metas futuras ("By next Friday", "By graduation", "In 5 years")',
        steps: ['Intercambian 2 logros cumplidos con Future Perfect ("By December I\'ll have completed B2...") y 1 duración continua ("I\'ll have been working in...").']
      },
      powerSheet: {
        fillBlanks: ['1. By Friday at 6 PM, we ___ ___ finished all 16 modules. (will have)', '2. Next July, Carlos will have ___ living in Austin for two years. (been / be)', '3. By the time the auditor ___, logs will have been verified. (arrives / will arrive)', '4. Will you ___ graduated by next June? (have / be)'],
        reorder: ['have / By 2028 / saved / we / will / $1M / .'],
        writePrompt: 'Proyecta 1 meta completada para fin de mes (will have V3) y 1 aniversario próximo (will have been -ing):',
        answerKey: '1) will have · 2) been · 3) arrives · 4) have | Orden: By 2028 we will have saved $1M.'
      }
    },
    {
      id: 'b2-c09', unitId: 'b2-u3', level: 'B2', classNum: 9, coreType: 'CORE', eaqualsRef: '#91, #159',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Negative & Conditional Inversion (Should / Had / Never / Seldom / Not Only)',
      titleES: 'Inversión Formal y Condicional (Should, Had, Seldom, Under no circumstances)',
      grammarFocus: 'Should you require... (1st Cond.) · Were we to... (2nd Cond.) · Had we known... (3rd Cond.) · Under no circumstances / Seldom / Little / Not only + Aux + S + V',
      canDo: 'Elevar el rigor sintáctico de memorándums de seguridad, contratos y advertencias críticas usando inversión formal.',
      industryContext: 'Políticas de seguridad cero ("Under no circumstances should..."), cláusulas legales y escalaciones.',
      warmupPrompt: 'Observa el protocolo de alta tensión: *"UNDER NO CIRCUMSTANCES SHOULD power be restored..."* ¿Por qué el verbo auxiliar salta ANTES del sujeto sin ser pregunta?',
      grammarFormulaHtml: makeFormula('Adverbio Negativo / Restrictivo (Never / Seldom / Not only / Under no circumstances)', '+', 'Auxiliar (should/did/had/was/have)', '+', 'Sujeto + Verbo', '<strong>Never have I</strong> seen a defect like this. · <strong>Had we tested</strong> earlier, it wouldn\'t have cracked. · <strong>Should you</strong> need help...'),
      explanationES: 'La <strong>Inversión</strong> aporta énfasis dramático o formalidad contractual colocando al inicio: <strong>1) Condicionales sin "if":</strong> <code>Should + S + V</code> (1º), <code>Were + S + to V</code> (2º), <code>Had + S + V3</code> (3º). <strong>2) Adverbios restrictivos/negativos:</strong> <em>Under no circumstances, Seldom, Rarely, Never, Little, Not only, Only after...</em> obligan a invertir <code>Auxiliar + Sujeto + Verbo</code> (si no hay auxiliar usa <em>do/does/did</em>).',
      goldenRuleES: 'Con <strong>Only after / Only when</strong> la inversión NO ocurre en la primera parte, sino en la cláusula principal final: <em>"Only after lab tests DID we confirm the cause."</em>',
      commonMistake: { bad: 'Under no circumstances you should open it. Had I knew, I acted.', good: 'Under no circumstances SHOULD YOU open it. HAD I KNOWN, I WOULD HAVE acted.', exp: 'Invierte Auxiliar + Sujeto tras el adverbio restrictivo; Had + V3.' },
      falseCognate: { term: 'Little did we know / Seldom', mistake: 'Traducir "Little did..." como "pequeño"', correct: 'Little did they realize... = Poco imaginaban / Ni idea tenían...', tip: '"Seldom has a flaw triggered such quick escalation" = Rara vez una falla ha detonado...' },
      vocab: [
        { en: 'Under no circumstances', es: 'Bajo ninguna circunstancia', ipa: '/ˈʌndər noʊ/', pinkStress: 'under NO cir-cum-stan-ces', example: 'Under no circumstances must guards be removed.', exampleES: 'Bajo ninguna circunstancia deben quitarse guardas.' },
        { en: 'Not only... but also', es: 'No solo... sino también', ipa: '/nɑt ˈoʊnli/', pinkStress: 'not ON-ly', example: 'Not only did they approve it, but they also cut costs.', exampleES: 'No solo lo aprobaron, sino que redujeron costos.' },
        { en: 'Seldom / Rarely', es: 'Rara vez (formal al inicio)', ipa: '/ˈsɛldəm/', pinkStress: 'SEL-dom', example: 'Seldom have engineers agreed so quickly.', exampleES: 'Rara vez los ingenieros han coincidido tan rápido.' }
      ],
      dialogue: [
        { speaker: 'Safety', en: 'Under no circumstances should operators bypass Lockout/Tagout during line jams!', es: '¡Bajo ninguna circunstancia deben los operadores evadir LOTO durante atascos!' },
        { speaker: 'Lead', en: 'Agreed. Had the night crew followed Step 2 earlier, the motor would not have burned.', es: 'De acuerdo. De haber seguido el turno nocturno el Paso 2, el motor no se habría quemado.' },
        { speaker: 'Safety', en: 'Indeed! Should anyone spot exposed wires, halt the bay immediately.', es: '¡Exacto! En caso de que alguien vea cables expuestos, detenga la bahía de inmediato.' }
      ],
      drills: [
        { q: 'Under no circumstances ___ energized equipment be opened before verifying LOTO.', opts: ['should', 'you should', 'musted', 'did be'], ans: 0, exp: '"Under no circumstances" exige inversión directa "should + sujeto (equipment) + be".', socraticHint: 'Adverbio negativo al inicio → Aux + S.' },
        { q: '___ the firmware been tested at -20°C, the crash would have appeared in R&D.', opts: ['Had', 'If had', 'Did', 'Should'], ans: 0, exp: 'Condicional 3º invertido sin "if": "Had + sujeto + been + V3".', socraticHint: 'Reemplaza "If it had been".' },
        { q: 'Not only ___ deliver ahead of schedule, but they also maintained zero defects.', opts: ['did the supplier', 'the supplier did', 'the supplier', 'were the supplier'], ans: 0, exp: '"Not only" + Pasado Simple requiere inversión con "did + sujeto".', socraticHint: 'Inversión de verbo pasado simple.' }
      ],
      classroomActivity: {
        title: '"Reglamento de Acero" (Reescritura por Inversión Formal)',
        grouping: 'Parejas (13 min)',
        materials: '4 advertencias comunes + 2 condicionales con If',
        steps: ['Elevan frases normales a tono de contrato/boletín usando Under no circumstances, Never, Not only... did, Had we..., Should you....']
      },
      powerSheet: {
        fillBlanks: ['1. Should you ___ technical help, contact Extension 400. (require / requires)', '2. Little ___ we know how urgent that report would become! (did / had)', '3. Had I ___ the tolerance earlier, we would have fixed it. (known / know)', '4. Never ___ I witnessed such fast troubleshooting! (have / did)'],
        reorder: ['power / should / Under / be / restored / no circumstances / .'],
        writePrompt: 'Transforma estas 2 a inversión formal: 1) If we had known... 2) You must never unlock Gate B.',
        answerKey: '1) require · 2) did · 3) known · 4) have | Orden: Under no circumstances should power be restored. | Transforms: 1) Had we known... 2) Never / Under no circumstances must you unlock Gate B.'
      }
    },
    {
      id: 'b2-c10', unitId: 'b2-u3', level: 'B2', classNum: 10, coreType: 'CORE', eaqualsRef: '#36',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Cleft Sentences & Fronting for Emphasis (What caused... / It was... that)',
      titleES: 'Oraciones Hendidas (Cleft Sentences) para Énfasis Ejecutivo',
      grammarFocus: 'It-clefts (It was X that/who...) · Wh-clefts (What caused X was... / What we need is...) · All-clefts (All I ask is...)',
      canDo: 'Poner foco quirúrgico sobre la causa raíz, persona responsable o solución clave en presentaciones y memos.',
      industryContext: 'Resúmenes ejecutivos de causa raíz ("What triggered the short circuit was...") y defensa técnica.',
      warmupPrompt: 'Compara: *"Solder fatigue caused the crack."* vs *"WHAT caused the crack WAS solder fatigue."* ¿Cuál dirige el reflector al culpable exacto?',
      grammarFormulaHtml: makeFormula('Wh-Cleft: WHAT + [S + Verbo] + IS/WAS + [Foco]', '|', 'It-Cleft: IT IS/WAS + [Foco] + THAT/WHO + [Resto]', '', '', '<strong>What caused</strong> the failure <strong>was</strong> thermal shock. · <strong>It was</strong> Batch 14 <strong>that</strong> triggered the recall.'),
      explanationES: 'Las <strong>Cleft Sentences</strong> dividen una oración simple para resaltar un dato específico: <strong>1) What-cleft:</strong> <code>What + cláusula + is/was + elemento clave</code> (<em>What matters is safety</em>); <strong>2) It-cleft:</strong> <code>It was + elemento enfático + that/who + resto</code> (<em>It was Elena who spotted it</em>).',
      goldenRuleES: 'Fíjate en la concordancia tras <em>What + ...</em>: el verbo de enlace suele ser singular (<code>is / was</code>) salvo que el foco al final sea un sustantivo plural obvio en habla informal (*What we need are 3 engineers* o formal *is*).',
      commonMistake: { bad: 'Which we need is more sensors. It was him who broke it yesterday (muy informal).', good: 'WHAT we need IS tighter sensors. IT WAS Batch 9 THAT failed.', exp: 'Usa "What" (no "which") al inicio de Wh-cleft; el foco va al final del "What-cleft" o justo tras "It is/was".' },
      falseCognate: { term: 'Focus / Highlight vs Point out', mistake: 'Pointing that caused it was...', correct: 'What we want to highlight / point out is that...', tip: 'Excelente arranque de diapositiva ejecutiva: "What this chart shows is..."' },
      vocab: [
        { en: 'What matters / triggered', es: 'Lo que importa / detonó', ipa: '/wʌt ˈmætərz/', pinkStress: 'WHAT mat-ters', example: 'What triggered the fault was a voltage spike.', exampleES: 'Lo que detonó la falla fue un pico de voltaje.' },
        { en: 'Containment Action', es: 'Acción de contención', ipa: '/kənˈteɪnmənt/', pinkStress: 'con-TAIN-ment', example: 'What QA needs now is immediate containment.', exampleES: 'Lo que Calidad necesita ahora es contención inmediata.' }
      ],
      dialogue: [
        { speaker: 'Exec', en: 'Stop guessing! Did the shipping carton or the foam insert fail?', es: '¡Basta de suponer! ¿Falló la caja o el inserto de espuma?' },
        { speaker: 'Eng', en: 'It was the foam density that failed drop testing, not the outer carton.', es: 'Fue la densidad de la espuma lo que falló en caída, no la caja exterior.' },
        { speaker: 'Exec', en: 'Okay—so what do we need to do before Friday?', es: 'Bien; entonces, ¿qué necesitamos hacer antes del viernes?' },
        { speaker: 'Eng', en: 'What we need to do is switch to dual-layer foam across Line 2.', es: 'Lo que debemos hacer es cambiar a espuma doble capa en la Línea 2.' }
      ],
      drills: [
        { q: '___ stopped the ultrasonic welder ___ a corroded ground strap.', opts: ['What / was', 'Which / was', 'That / is', 'It / that'], ans: 0, exp: 'Wh-cleft iniciando con "What" + verbo pasado "was".', socraticHint: 'Lo que detuvo... fue...' },
        { q: 'It ___ Vendor A ___ shipped the wrong resin lot on Tuesday.', opts: ['was / that', 'were / what', 'did / which', 'is / what'], ans: 0, exp: 'It-cleft pasado enfatizando al sujeto responsable: "It was X that...".', socraticHint: 'Fue [sujeto] quien...' }
      ],
      classroomActivity: {
        title: '"Reflector Ejecutivo" (Convertir Hechos a Cleft Sentences)',
        grouping: 'Parejas (13 min)',
        materials: '4 conclusiones técnicas planas',
        steps: ['Transforman cada hecho tanto a It-cleft como a What-cleft eligiendo qué palabra destacar según quién hace la pregunta ("Who approved it?" → "It was QA who...", "What failed?" → "What failed was...").']
      },
      powerSheet: {
        fillBlanks: ['1. ___ caused the outage was a lightning surge. (What / Which)', '2. It ___ our night technician who spotted the crack. (was / did)', '3. What our client expects ___ clear root-cause evidence. (is / are)', '4. ___ I need right now is five quiet minutes! (All / Every)'],
        reorder: ['is / What / consistency / matters / most / .'],
        writePrompt: 'Enfatiza la causa raíz o solución de un problema real usando 1 It-cleft y 1 What-cleft:',
        answerKey: '1) What · 2) was · 3) is · 4) All | Orden: What matters most is consistency.'
      }
    },
    {
      id: 'b2-c11', unitId: 'b2-u3', level: 'B2', classNum: 11, coreType: 'CORE', eaqualsRef: '#93, #119, #120',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Past Deduction Modals (can\'t/needn\'t/must have) & Wish / If only',
      titleES: 'Deducción Pasada (can\'t/needn\'t have) y Wish / If only',
      grammarFocus: 'must have V3 / can\'t have V3 / couldn\'t have V3 · needn\'t have V3 (fue innecesario!) vs didn\'t need to · I wish / If only + Past (present regret) & Past Perfect (past regret)',
      canDo: 'Evaluar hipótesis sobre hechos pasados con certeza lógica y expresar deseos o arrepentimientos sobre el presente o pasado.',
      industryContext: 'Post-mortems sin culpas, análisis forense de errores y optimización ("We needn\'t have scrapped the batch").',
      warmupPrompt: 'Diferencia sutil nivel B2: *"You DIDN\'T NEED TO buy more" (no los compraste)* vs *"You NEEDN\'T HAVE bought more" (¡sí los compraste, pero no hacía falta!)*.',
      grammarFormulaHtml: makeFormula('Deducción Pasada: MUST / CAN\'T / COULDN\'T HAVE + V3', '|', 'Innecesario: NEEDN\'T HAVE + V3', '|', 'Deseo/Lamento: I wish / If only + Pasado / had V3', 'He <strong>can\'t have lost</strong> the key—I saw it! · We <strong>needn\'t have stayed</strong> late. · I <strong>wish I had</strong> checked earlier.'),
      explanationES: '<strong>Deducción lógica sobre el pasado:</strong> <code>must have + V3</code> (seguro sí ocurrió), <code>can\'t / couldn\'t have + V3</code> (es imposible que haya pasado), <code>may/might have + V3</code> (quizás pasó). <strong>Needn\'t have + V3:</strong> hiciste algo que después resultó innecesario. <strong>Wish / If only:</strong> <code>+ Pasado Simple</code> = deseo diferente AHORA (<em>I wish I spoke Chinese</em>); <code>+ had V3</code> = arrepentimiento del PASADO (<em>I wish we had tested it</em>).',
      goldenRuleES: 'Tras <code>I wish</code> para referirse al presente con <em>to be</em> usa <code>were</code> o <code>was</code>, y para quejarse de hábitos irritantes ajenos usa <code>I wish he WOULD stop...</code>.',
      commonMistake: { bad: 'It mustn\'t have been Mark. I wish I have more time now! I wish I studied yesterday.', good: 'It CAN\'T HAVE been Mark. I wish I HAD more time! I wish I HAD STUDIED yesterday.', exp: 'Deducción negativa imposible siempre usa "can\'t/couldn\'t"; "wish" retrocede 1 tiempo verbal.' },
      falseCognate: { term: 'I hope vs I wish', mistake: 'I wish tomorrow is sunny', correct: 'I HOPE tomorrow IS sunny (futuro real) | I WISH today WERE sunny (irreal ahora)', tip: 'Usa "hope" para deseos posibles reales y "wish" para contrafactuales / lamentos.' },
      vocab: [
        { en: "Can't have / Must have + V3", es: 'Imposible que haya... / Seguro haya...', ipa: '/kænt hæv/', pinkStress: "CAN'T have", example: 'He can\'t have been in Toledo; he was with us!', exampleES: 'Imposible que estuviera en Toledo; ¡estaba con nosotros!' },
        { en: "Needn't have + V3", es: 'No hacía falta haber... (pero se hizo)', ipa: '/ˈnidənt hæv/', pinkStress: "NEED-n't have", example: 'We needn\'t have rushed—the meeting moved to Tuesday.', exampleES: 'No hacía falta correr; la junta se movió al martes.' },
        { en: 'Wish / If only', es: 'Ojalá / Desearía que...', ipa: '/wɪʃ / ɪf ˈoʊnli/', pinkStress: 'WISH / if ON-ly', example: 'I wish our ERP synced offline faster.', exampleES: 'Ojalá nuestro ERP sincronizara más rápido offline.' }
      ],
      dialogue: [
        { speaker: 'Tech', en: 'Look! Someone printed 300 safety manuals twice! Oh no, look at the date.', es: '¡Mira! ¡Alguien imprimió 300 manuales dos veces! Oh no, mira la fecha.' },
        { speaker: 'Lead', en: 'Wait—it can\'t have been Ana; she\'s on vacation! And we needn\'t have printed any yet because HR updated the file.', es: 'Espera; no pudo haber sido Ana, ¡está de vacaciones! Y no hacía falta haber impreso ninguno porque RH actualizó el archivo.' },
        { speaker: 'Tech', en: 'Ugh, I wish we had checked HR\'s email first!', es: 'Uf, ¡ojalá hubiéramos revisado el correo de RH primero!' }
      ],
      drills: [
        { q: 'It ___ been John you saw at Gate 1; he\'s been working remotely in Guadalajara all week!', opts: ["can't have", "mustn't have", "shouldn't to have", 'won\'t have'], ans: 0, exp: 'Imposibilidad deducida en el pasado = "can\'t / couldn\'t have + V3".', socraticHint: 'Nunca "mustn\'t have".' },
        { q: 'We ___ bought extra adapters; every laptop already came with a USB-C hub inside the box!', opts: ["needn't have", 'mustn\'t have', "couldn't have", "hadn't need"], ans: 0, exp: 'Acción sí realizada pero resultó inútil = "needn\'t have + V3".', socraticHint: 'Se compraron sin ser necesarios.' },
        { q: 'If only I ___ backed up my CAD assembly before the power surge hit!', opts: ['had', 'would', 'have', 'did'], ans: 0, exp: 'Arrepentimiento pasado tras "If only" = Past Perfect ("had + V3").', socraticHint: 'Retrocede al Past Perfect.' }
      ],
      classroomActivity: {
        title: '"Forense sin Culpas" + Cápsula de Arrepentimientos',
        grouping: 'Parejas (13 min)',
        materials: '4 mini-casos de error o esfuerzo innecesario',
        steps: ['Deducen qué pudo/no pudo ocurrir (must/can\'t/needn\'t have) y expresan 2 deseos reales con I wish (1 presente, 1 pasado).']
      },
      powerSheet: {
        fillBlanks: ['1. The lights are broken; a storm ___ have hit the transformer. (must / can)', "2. You ___ have brought a coat—it's 35°C inside! (needn't / mustn't)", '3. I wish my commute ___ (be) shorter! (were / is)', '4. I wish we ___ (test) the battery earlier. (had tested / tested)'],
        reorder: ['have / keys / couldn\'t / lost / already / He / the / .'],
        writePrompt: 'Escribe 1 frase con "can\'t have + V3" y 1 arrepentimiento/deseo con "I wish":',
        answerKey: "1) must · 2) needn't · 3) were · 4) had tested | Orden: He couldn't have lost the keys already."
      }
    },
    {
      id: 'b2-c12', unitId: 'b2-u3', level: 'B2', classNum: 12, coreType: 'CORE', eaqualsRef: '#48, #50, #53',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Formal Discourse Linkers (although, despite, in spite of, subsequently) & Executive Memos',
      titleES: 'Conectores Formales de Contraste/Secuencia y Memorándums de Escalación',
      grammarFocus: 'Although/Even though + Clause vs Despite / In spite of + Noun/V-ing/the fact that · Furthermore, Nevertheless, Subsequently',
      canDo: 'Estructurar memorándums ejecutivos de crisis y escalación conectando hechos adversos con planes de mitigación.',
      industryContext: 'Escalación formal por retrasos en cadena de suministro (ej. chips desde Taiwán) y planes CAPA.',
      warmupPrompt: 'Diferencia gramatical clave: *"ALTHOUGH it rained, we shipped"* vs *"DESPITE the rain, we shipped"*. ¡Jamás digas *"Despite OF"*!',
      grammarFormulaHtml: makeFormula('ALTHOUGH + S + Verbo', '|', 'DESPITE / IN SPITE OF + Sustantivo / V-ing / the fact that...', '|', 'Formal: Furthermore, / Nevertheless, / Subsequently,', '<strong>Despite</strong> customs delays, Line 1 kept running. · <strong>In spite of</strong> being short-staffed, QA finished.'),
      explanationES: '<strong>Although / Even though</strong> son conjunciones: requieren Sujeto + Verbo después. <strong>Despite</strong> e <strong>In spite of</strong> significan lo mismo ("a pesar de"), pero son preposiciones: solo admiten sustantivo, pronombre o <code>V-ing</code> (o añade <code>the fact that</code> si quieres meter verbo). Jamás escribas *"despite of"*. En memos usa <code>Furthermore,</code> (añadir argumento), <code>Nevertheless,</code> ("no obstante") y <code>Subsequently,</code> ("posteriormente").',
      goldenRuleES: 'Truco rápido: <strong>In spite of</strong> = 3 palabras; <strong>Despite</strong> = 1 palabra (nunca le pegues "of").',
      commonMistake: { bad: 'Despite of the delay, we delivered. In spite of we were tired, we worked.', good: 'DESPITE the delay, we delivered. IN SPITE OF BEING tired, we worked.', exp: 'Nunca "despite of"; "in spite of" no acepta sujeto+verbo directo sin "the fact that" o V-ing.' },
      falseCognate: { term: 'Subsequently / Actually / Eventual', mistake: 'Eventual = seguro', correct: 'Eventual = final / definitivo | Eventually = al final | Subsequently = acto seguido en la cadena', tip: '"Customs held Batch 5; subsequently, we triggered air-freight contingency."' },
      vocab: [
        { en: 'Non-Conformance Report (NCR)', es: 'Reporte de No Conformidad', ipa: '/kənˈfɔrməns/', pinkStress: 'non-con-FORM-ance', example: 'Despite the NCR, root cause was contained rapidly.', exampleES: 'Pese al NCR, la causa raíz se contuvo rápido.' },
        { en: 'Mitigation Plan / Sponsorship', es: 'Plan de mitigación / Respaldo directivo', ipa: '/ˌmɪtɪˈɡeɪʃən/', pinkStress: 'mit-i-GA-tion', example: 'Nevertheless, our mitigation plan needs sponsorship.', exampleES: 'No obstante, nuestro plan requiere respaldo directivo.' }
      ],
      dialogue: [
        { speaker: 'Supply', en: 'Customs cleared only half our Taiwan microcontroller shipment.', es: 'Aduana liberó solo mitad de nuestro embarque de microcontroladores.' },
        { speaker: 'Dir', en: 'Wait—despite our priority brokerage fees? Will Production stop?', es: 'Espera, ¿pese a nuestras cuotas prioritarias de agente? ¿Parará producción?' },
        { speaker: 'Supply', en: 'No—in spite of the 10-day hold on Batch B, Batch A covers Line 1 through Monday. Subsequently, air freight bridges the gap.', es: 'No; pese a retención de 10 días del Lote B, Lote A cubre Línea 1 al lunes. Luego flete aéreo cubre brecha.' },
        { speaker: 'Dir', en: 'Smart escalation memo! Nevertheless, copy Finance before approving air rates.', es: '¡Buen memo de escalación! No obstante, copia a Finanzas antes de aprobar flete aéreo.' }
      ],
      drills: [
        { q: '___ her temporary absence during inspection, Elena prepared every dossier ahead of time.', opts: ['In spite of', 'Although', 'Despite of', 'Even though'], ans: 0, exp: '"her temporary absence" es un grupo nominal sin verbo → "In spite of" o "Despite".', socraticHint: 'Preposición sin verbo después.' },
        { q: 'Which sentence is completely error-free?', opts: ['Despite heavy tariffs, regional sourcing expanded.', 'Despite of heavy tariffs, sourcing grew.', 'Although heavy tariffs, sourcing grew.', 'Nevertheless of tariffs, sourcing grew.'], ans: 0, exp: 'Despite + sustantivo (sin "of").', socraticHint: 'Verifica pese a + sustantivo.' }
      ],
      classroomActivity: {
        title: '"Memo de Escalación de Crisis en 6 Líneas"',
        grouping: 'Parejas (13 min)',
        materials: 'Escenario: 10 días de retraso en aduana / caída de nube',
        steps: ['Redactan memo formal para Dirección incluyendo Although/Despite, Nevertheless, Subsequently y acción de mitigación.', 'Intercambian memos evaluando claridad ejecutiva y cero errores de despite/although.']
      },
      powerSheet: {
        fillBlanks: ['1. ___ the power outage, our backup battery kept servers live. (Despite / Although)', '2. ___ the machine was noisy, tolerances stayed tight. (Although / In spite of)', '3. In spite of ___ late, she resolved the ticket fast. (arriving / arrived)', '4. Costs rose; ___, long-term savings outweigh fees. (nevertheless / despite)'],
        reorder: ['the rain / went / Despite / , / ahead / launch / the / .'],
        writePrompt: 'Escribe 2 frases contrarias sobre un reto real usando 1 vez "Although" y 1 vez "Despite / In spite of":',
        answerKey: '1) Despite · 2) Although · 3) arriving · 4) nevertheless | Orden: Despite the rain, the launch went ahead.'
      }
    },
    {
      id: 'b2-c13', unitId: 'b2-u4', level: 'B2', classNum: 13, coreType: 'CORE', eaqualsRef: '#83, #139',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Present Perfect Continuous & Articles with Abstract / Uncountable Concepts',
      titleES: 'Presente Perfecto Continuo y Artículos con Conceptos Abstractos',
      grammarFocus: 'have/has been + V-ing (recent/ongoing duration & visible evidence now) · Zero article for general abstract concepts (Education, Safety, Automation) vs "The" for specific instances',
      canDo: 'Enfatizar la continuidad de un esfuerzo reciente que sigue vivo y usar artículos correctamente al hablar de ideas abstractas.',
      industryContext: 'Reportes de avance de investigación ("We have been testing...") y ensayos de calidad/ética/tecnología.',
      warmupPrompt: '¿Por qué decimos "QUALITY is essential" (sin "THE"), pero "THE QUALITY of Batch 4 is high" (con "THE")?',
      grammarFormulaHtml: makeFormula('Duración viva hoy: S + have/has BEEN + V-ing', '|', 'Abstracto General = Ø (Zero Article) vs Específico = THE', '', '', 'We<strong>\'ve been optimizing</strong> firmware all week. · <strong>Automation</strong> boosts jobs vs <strong>The automation</strong> of Line 2 took months.'),
      explanationES: '<strong>Present Perfect Continuous</strong> (<code>have/has been + V-ing</code>) enfatiza que una actividad empezó atrás y <strong>sigue en marcha</strong> o acaba de detenerse dejando evidencia (<em>Hands are dirty—I\'ve been fixing the lathe</em>). <strong>Artículos abstractos:</strong> cuando hablas de conceptos universales (<em>innovation, education, safety, history, corruption</em>) NO uses <em>the</em>; pon <code>the</code> solo cuando delimitas (<em>the safety of our crew</em>).',
      goldenRuleES: 'Para preguntar "¿Cuánto tiempo llevas haciendo...?" usa casi siempre Present Perfect Continuous: <em>"How long have you been working on this circuit?"</em> (excepto con verbos de estado como <em>know / be / have</em>).',
      commonMistake: { bad: 'The education and the safety are vital in the life. I\'m working here for 3 years.', good: 'EDUCATION and SAFETY are vital in life. I HAVE BEEN WORKING here for 3 years.', exp: 'Conceptos generales rechazan "the"; acciones que empezaron en el pasado y siguen hoy usan Present Perfect (Continuous), no Present Continuous simple.' },
      falseCognate: { term: 'Have been vs Have gone / History vs Story', mistake: 'The story of Mexico (historia académica)', correct: 'History = historia académica/histórica | Story = cuento / anécdota / relato', tip: '"Early industrial history teaches safety discipline."' },
      vocab: [
        { en: 'All week / Recently', es: 'Toda la semana / Recientemente', ipa: '/ˈrisəntli/', pinkStress: 'RE-cent-ly', example: 'They\'ve been running endurance tests recently.', exampleES: 'Han estado corriendo pruebas de resistencia recientemente.' },
        { en: 'Automation / Innovation / Quality', es: 'Automatización / Innovación / Calidad (abstractos)', ipa: '/ˌɔtəˈmeɪʃən/', pinkStress: 'au-to-MA-tion', example: 'Innovation thrives where teamwork is valued.', exampleES: 'La innovación prospera donde se valora el trabajo en equipo.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'Why are your safety glasses covered in dust?', es: '¿Por qué tus lentes están cubiertos de polvo?' },
        { speaker: 'Tech', en: 'I\'ve been grinding bracket prototypes in Bay 2 for three hours!', es: '¡He estado puliendo prototipos de soporte en Bahía 2 por tres horas!' },
        { speaker: 'Lead', en: 'Nice effort. You know, precision matters even on fast prototypes.', es: 'Buen esfuerzo. Ya sabes, la precisión importa hasta en prototipos rápidos.' },
        { speaker: 'Tech', en: 'Totally—and the precision of that laser cutter makes finishing quick.', es: 'Totalmente; y la precisión de esa cortadora láser agiliza el acabado.' }
      ],
      drills: [
        { q: 'You\'ve been ___ too much overtime lately; take the weekend off!', opts: ['working', 'work', 'worked', 'be working'], ans: 0, exp: 'have/has been + V-ing = Present Perfect Continuous.', socraticHint: 'Continuidad reciente con efecto.' },
        { q: '___ safety starts with training, and ___ safety of our cleanroom requires daily discipline.', opts: ['Ø (no article) / the', 'The / Ø', 'The / the', 'A / the'], ans: 0, exp: 'General ("Safety" en abstracto) va sin artículo; delimitado ("the safety of our cleanroom") lleva "the".', socraticHint: 'General = cero artículo · Específico ("of...") = the.' }
      ],
      classroomActivity: {
        title: '"Evidencia Presente" & Debate Conceptual sin "The"',
        grouping: 'Parejas (13 min)',
        materials: '4 escenas con evidencia + 4 temas abstractos (Technology, Education, Ethics, Leadership)',
        steps: ['Adivinan qué ha estado haciendo su compañero por pistas visuales ("You have been + V-ing").', 'Opinan en 2 frases sobre cada concepto abstracto evitando el error español de poner "The" al principio.']
      },
      powerSheet: {
        fillBlanks: ['1. How long ___ you ___ studying industrial English? (have, been)', '2. ___ teamwork is key, especially ___ teamwork inside ER teams. (Ø, the)', '3. She\'s exhausted because she ___ been testing firmware since 6 AM. (has / is)', '4. ___ automation changes factory floor skills. (Ø / The)'],
        reorder: ['working / They / hard / week / have / all / been / .'],
        writePrompt: 'Escribe 1 frase sobre algo que llevas tiempo haciendo ("I\'ve been + -ing") y 1 opinión sobre un concepto abstracto sin "The":',
        answerKey: '1) have, been · 2) Ø, the · 3) has · 4) Ø | Orden: They have been working hard all week.'
      }
    },
    {
      id: 'b2-c14', unitId: 'b2-u4', level: 'B2', classNum: 14, coreType: 'CORE', eaqualsRef: '#158, #165, #180',
      modularity: 'grammar-inductive', hasSlides: false,
      title: 'Attitudinal Adverbs (Frankly, Clearly) & Intensifier Collocations',
      titleES: 'Adverbios Actitudinales y Colocaciones de Intensificadores',
      grammarFocus: 'Attitudinal adverbs (Frankly, Clearly, Apparently, Fortunately) · Intensifier collocations (totally exhausted, deeply concerned, bitterly disappointed, entirely satisfied)',
      canDo: 'Expresar postura personal frente a hechos con adverbios iniciales y combinar intensificadores como hablante culto B2.',
      industryContext: 'Reportes críticos ejecutivos, evaluación objetiva de riesgos y retroalimentación de desempeño.',
      warmupPrompt: '¿Por qué un hablante nativo dice *"ENTIRELY satisfied / TOTALLY exhausted / DEEPLY concerned"* pero suena extraño decir *"COMPLETELY happy"* o *"STRONGLY exhausted"*?',
      grammarFormulaHtml: makeFormula('Actitudinal al inicio: Frankly, / Clearly, / Apparently, + Oración', '|', 'Collocation B2: [Adverbio exacto] + [Adjetivo extremo/graduable]', '', '', '<strong>Fortunately</strong>, backup power kicked in. · We are <strong>entirely satisfied</strong> with supplier performance.'),
      explanationES: 'Los <strong>adverbios actitudinales</strong> al principio califican la frase entera mostrando postura: <code>Clearly,</code> (es obvio), <code>Apparently,</code> (según parece sin confirmar), <code>Frankly,</code> (con franqueza), <code>Fortunately/Regrettably,</code>. <strong>Collocations intensificadoras:</strong> con adjetivos extremos (*exhausted, horrified, impossible, essential*) jamás uses *very*; usa <code>absolutely, totally, completely, utterly</code>; con verbos/sentimientos usa <code>deeply concerned / strongly recommend / highly likely</code>.',
      goldenRuleES: 'Nunca uses <strong>very</strong> con adjetivos extremos: di <em>absolutely brilliant / completely exhausted</em>, nunca *"very exhausted"*.',
      commonMistake: { bad: 'Very impossible to ship today! Clear, the cable broke.', good: 'TOTALLY IMPOSSIBLE to ship today! CLEARLY, the cable broke.', exp: '"impossible" es absoluto/extremo (usa totally/utterly/virtually); adverbio inicial lleva "-ly" y coma.' },
      falseCognate: { term: 'Apparently vs Obviously / Actually', mistake: 'Traducir "apparently" como "de apariencia falsa"', correct: 'Apparently = aparentemente / según reportes | Clearly = evidentemente / claramente', tip: '"Apparently, customs upgraded their portal overnight."' },
      vocab: [
        { en: 'Apparently / Frankly', es: 'Aparentemente / Francamente', ipa: '/əˈpɛrəntli/', pinkStress: 'ap-PAR-ent-ly', example: 'Apparently, the vendor changed packaging without notice.', exampleES: 'Aparentemente el proveedor cambió empaque sin aviso.' },
        { en: 'Entirely Satisfied / Deeply Concerned', es: 'Totalmente satisfecho / Profundamente preocupado', ipa: '/ɪnˈtaɪərli/', pinkStress: 'en-TIRE-ly', example: 'Management is deeply concerned about scrap growth.', exampleES: 'La gerencia está profundamente preocupada por alza de merma.' },
        { en: 'Highly Likely / Strongly Recommend', es: 'Muy probable / Recomendar firmemente', ipa: '/ˈhaɪli/', pinkStress: 'HIGH-ly', example: 'We strongly recommend quarterly calibration.', exampleES: 'Recomendamos firmemente calibración trimestral.' }
      ],
      dialogue: [
        { speaker: 'VP', en: 'Are we ready to sign off on the automated welding cell?', es: '¿Estamos listos para firmar aprobación de la celda de soldadura?' },
        { speaker: 'QA', en: 'Honestly, we are entirely satisfied with precision, yet deeply concerned about fume exhaust noise.', es: 'Honestamente estamos totalmente satisfechos con precisión, pero muy preocupados por ruido del extractor.' },
        { speaker: 'VP', en: 'Apparently, the acoustic baffle arrived damaged in shipping. Frankly, I strongly recommend delaying launch one day to swap it.', es: 'Aparentemente el deflector acústico llegó dañado. Francamente recomiendo retrasar un día el arranque para cambiarlo.' }
      ],
      drills: [
        { q: 'I am ___ satisfied that every inspector followed the revised procedure.', opts: ['entirely', 'deeply', 'bitterly', 'very'], ans: 0, exp: 'Colocación estándar EAQUALS B2: "entirely satisfied".', socraticHint: 'Collocation natural con "satisfied".' },
        { q: '___, nobody realized the cooling fan had stopped until the thermal sensor tripped.', opts: ['Apparently', 'Apparent', 'Too', 'Strong'], ans: 0, exp: 'Adverbio actitudinal con "-ly" al inicio calificando toda la situación.', socraticHint: 'Modificador de cláusula completa.' },
        { q: 'We ___ recommend running cryogenic shock tests prior to release.', opts: ['strongly', 'heavily', 'hardly', 'entirely'], ans: 0, exp: 'Colocación fija: "strongly recommend".', socraticHint: 'Verbo "recommend" combina con...' }
      ],
      classroomActivity: {
        title: '"Empareja la Colocación Exacta" + Micro-Discurso',
        grouping: 'Parejas (13 min)',
        materials: 'Matriz 6x6 (strongly, deeply, entirely, highly, frankly, apparently)',
        steps: ['Conectan adverbios con adjetivos/verbos naturales y crean una mini-evaluación de 4 líneas sobre un producto o servicio real.']
      },
      powerSheet: {
        fillBlanks: ['1. After 14 hours on floor, the crew was ___ exhausted. (totally / very)', '2. ___, this schedule leaves zero margin for errors. (Frankly / Frank)', '3. Our audit team ___ recommends dual inspection. (strongly / deeply)', '4. I was ___ surprised by how fast she fixed the bug! (pleasantly / heavy)'],
        reorder: ['followed / protocol / satisfied / I am / entirely / he / that / .'],
        writePrompt: 'Evalúa un proyecto o experiencia reciente usando 1 adverbio actitudinal inicial y 1 colocación de intensificador:',
        answerKey: '1) totally · 2) Frankly · 3) strongly · 4) pleasantly | Orden: I am entirely satisfied that he followed protocol.'
      }
    },
    {
      id: 'b2-c15', unitId: 'b2-u4', level: 'B2', classNum: 15, coreType: 'CORE', eaqualsRef: '#96, #182, #188',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'US Corporate Idioms, Cultural Radar & Multi-Meaning Phrasal Verbs',
      titleES: 'Modismos Corporativos Americanos y Radar Cultural Nativo',
      grammarFocus: 'High-context idioms (bandwidth, move the needle, drop the ball, low-hanging fruit, ballpark figure, touch base, put off) · Literal translation trap avoidance',
      canDo: 'Comprender con naturalidad modismos corporativos de EE. UU. sin caer en interpretaciones literales erróneas.',
      industryContext: 'Juntas en Silicon Valley/Detroit, llamadas informales de negocios y traducción pragmática.',
      warmupPrompt: 'Cuando un director dice *"I don\'t have the BANDWIDTH for this"* o *"Give me a BALLPARK figure"*, ¿habla de internet o béisbol? ¡Descifra el código cultural!',
      grammarFormulaHtml: makeFormula('Modismo Americano', '≠', 'Traducción Literal', '→', 'Significado Pragmático Real', '<strong>I lack bandwidth</strong> = No tengo tiempo/capacidad. · <strong>Drop the ball</strong> = Cometer un descuido. · <strong>Put off</strong> = Posponer / desanimar.'),
      explanationES: 'En EE. UU. las juntas mezclan metáforas deportivas y tecnológicas en tono casual aunque hablen de millones de dólares: <code>bandwidth</code> (capacidad de tiempo/energía), <code>move the needle</code> (tener impacto medible), <code>low-hanging fruit</code> (victorias rápidas con poco esfuerzo), <code>ballpark figure</code> (cifra aproximada), <code>drop the ball</code> (descuidar una responsabilidad).',
      goldenRuleES: 'Los phrasal verbs cambian según contexto: <em>put someone off</em> = desanimar/quitar ganas; <em>put something off</em> = posponer para después.',
      commonMistake: { bad: 'I don\'t have bandwidth → check Wi-Fi router! Let\'s touch the base (tocar una base física).', good: 'No Wi-Fi issue—they simply mean "my schedule is full" / "let\'s sync up briefly".', exp: 'Reconoce el uso metafórico corporativo para responder alineado sin confusiones literales.' },
      falseCognate: { term: 'Bandwidth / Table / Groundwork', mistake: 'Tomar "bandwidth" literalmente como Mbps', correct: 'Schedule availability / mental capacity', tip: 'Si un colega dice "Can we circle back? I\'m swamped", ofrece retomar mañana por chat.' },
      vocab: [
        { en: 'Move the needle', es: 'Generar impacto medible real', ipa: '/muv ðə ˈnidəl/', pinkStress: 'MOVE the NEE-dle', example: 'Automation will truly move the needle on quality.', exampleES: 'La automatización sí moverá la aguja en calidad.' },
        { en: 'Low-hanging fruit', es: 'Mejoras fáciles y rápidas', ipa: '/loʊ ˈhæŋɪŋ frut/', pinkStress: 'LOW-hang-ing FRUIT', example: 'Fixing tape alignment is low-hanging fruit.', exampleES: 'Ajustar alineación de cinta es fruta fácil de alcanzar.' },
        { en: 'Ballpark figure', es: 'Cifra aproximada preliminar', ipa: '/ˈbɔlpɑrk ˈfɪɡjər/', pinkStress: 'BALL-park fig-ure', example: 'Give me a ballpark figure for 500 sensors.', exampleES: 'Dame un estimado aproximado por 500 sensores.' },
        { en: 'Drop the ball', es: 'Cometer un descuido / fallar', ipa: '/drɑp ðə bɔl/', pinkStress: 'DROP the BALL', example: 'We dropped the ball on confirming customs docs.', exampleES: 'Se nos fue el avión al confirmar papeles aduanales.' }
      ],
      dialogue: [
        { speaker: 'US PM', en: 'Hey Ana, I\'m swamped this week and lack bandwidth for the full BOM audit.', es: 'Oye Ana, ando tapado esta semana y no tengo disponibilidad para auditar todo el BOM.' },
        { speaker: 'Ana', en: 'Got it! Could we target the low-hanging fruit on Line 1 first so we move the needle today?', es: '¡Entendido! ¿Atacamos mejoras rápidas en Línea 1 primero para generar impacto hoy?' },
        { speaker: 'US PM', en: 'Love it. Give me a ballpark figure on tooling cost, and let\'s touch base Friday.', es: 'Me encanta. Dame un estimado aproximado de herramental y nos sincronizamos el viernes.' },
        { speaker: 'Ana', en: 'Will do—we won\'t drop the ball on Friday\'s handoff!', es: 'Hecho; ¡no fallaremos en la entrega del viernes!' }
      ],
      drills: [
        { q: 'When a Seattle PM says "I don\'t have the bandwidth for another task", she means:', opts: ['Her schedule is completely full right now.', 'Her office internet speed is slow.', 'She lost her badge credentials.', 'She needs a wider conveyor belt.'], ans: 0, exp: '"Bandwidth" metafórico = capacidad operativa o tiempo disponible.', socraticHint: 'Expresión cultural corporativa.' },
        { q: 'Before calculating exact quotes down to the cent, the client asks for a "ballpark figure":', opts: ['A rough preliminary estimate', 'Sports stadium capacity', 'Final signed contract', 'Scrap rate chart'], ans: 0, exp: '"Ballpark figure" = estimado aproximado inicial.', socraticHint: 'Cifra orientativa aproximada.' }
      ],
      classroomActivity: {
        title: '"Traductor Cultural" — Escenas de Juntas US-México',
        grouping: 'Parejas (13 min)',
        materials: '6 modismos en tarjetas (`STEMOS_PHRASES` / `LEVEL_UP_YOUR_ENGLISH`)',
        steps: ['Interpretan 1 micro-diálogo usando naturalmente mínimo 4 modismos corporativos con el tono correcto.', 'Comparan qué hubiera entendido alguien literalmente vs lo que realmente significa.']
      },
      powerSheet: {
        fillBlanks: ['1. Sorry, someone ___ the ball on shipping labels yesterday. (dropped / threw)', '2. Give me a ___ figure first—exact pricing next week. (ballpark / bandwidth)', '3. Replacing old bulbs is easy ___-hanging fruit! (low / slow)', '4. That redesign really moved the ___ on speed. (needle / ball)'],
        reorder: ['Friday / base / Let\'s / touch / before / .'],
        writePrompt: 'Elige 3 modismos del día y úsalos en un chat breve realista de trabajo o estudio:',
        answerKey: '1) dropped · 2) ballpark · 3) low · 4) needle | Orden: Let\'s touch base before Friday.'
      }
    },
    {
      id: 'b2-c16', unitId: 'b2-u4', level: 'B2', classNum: 16, coreType: 'CORE', eaqualsRef: '#27, #33, #34',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Cross-Border Retrospective & Executive B2 Crucible Capstone',
      titleES: 'Retrospectiva Transfronteriza y Crisol Ejecutivo B2',
      grammarFocus: 'Full B2 integration: Mixed Conditionals + Inversion + Clefts + Hedging + Idioms + Future Perfect',
      canDo: 'Evaluar críticamente un proyecto conjunto internacional, sintetizar lecciones aprendidas y aprobar la defensa oral/examen B2.',
      industryContext: 'Cierre de proyecto Joint Venture EE. UU.–LATAM, lecciones aprendidas y preparación examen B2.',
      warmupPrompt: 'En 60 segundos resume un semestre o proyecto complejo: Qué funcionó (Cleft), qué salió mal (Mixed Cond/Past Modal), qué se hará distinto (Future Perfect / Inversion).',
      grammarFormulaHtml: makeFormula('Síntesis B2: Cleft + Mixed Conditional / Past Modal + Inversion + Idiom', '', '', '', '', '<strong>What worked best was</strong> daily syncs. <strong>Had we caught</strong> drift early, we wouldn\'t be reworking. <strong>Never</strong> skip QA.'),
      explanationES: 'La maestría <strong>B2 (Vantage)</strong> demuestra fluidez controlada sin pausas largas ni errores sistemáticos al combinar argumentación lógica, matices de registro, condicionales complejos, voz pasiva y cultura corporativa real.',
      goldenRuleES: 'En presentaciones finales estructura siempre en regla de 3: <em>1) Outcome achieved; 2) Lesson learned; 3) Forward commitment</em>.',
      commonMistake: { bad: 'Resumen lineal de 20 "and then... and then..." sin jerarquía ejecutiva.', good: 'Síntesis estructurada con "All in all / What stood out was / Going forward, seldom will..."', exp: 'Usa conectores de síntesis y enfoque ejecutivo.' },
      falseCognate: { term: 'Retrospective vs Lessons Learned / Resume', mistake: 'Cerrar con "In resume..."', correct: 'In summary / To wrap up / All in all, ...', tip: 'Jamás digas "in resume" en inglés; usa "In summary", "All in all" o "To conclude".' },
      vocab: [
        { en: 'Retrospective / Lessons Learned', es: 'Retrospectiva / Lecciones aprendidas', ipa: '/ˌrɛtrəˈspɛktɪv/', pinkStress: 'ret-ro-SPEC-tive', example: 'Hold an honest blameless retrospective.', exampleES: 'Realiza una retrospectiva honesta sin culpas.' },
        { en: 'Joint Venture / Cross-Border', es: 'Proyecto conjunto / Transfronterizo', ipa: '/dʒɔɪnt ˈvɛntʃər/', pinkStress: 'JOINT ven-ture', example: 'Cross-border collaboration scaled our output.', exampleES: 'La colaboración transfronteriza escaló nuestra producción.' }
      ],
      dialogue: [
        { speaker: 'Exec', en: 'All in all, how did our six-month Mexicali–San Diego joint venture finish?', es: 'En conjunto, ¿cómo cerró nuestro proyecto conjunto de 6 meses Mexicali-San Diego?' },
        { speaker: 'PM', en: 'Remarkably well! By midnight Friday we will have delivered 100% of certified units.', es: '¡Extraordinariamente bien! Para medianoche del viernes habremos entregado 100% de unidades.' },
        { speaker: 'Exec', en: 'What turned things around after Q1 delays?', es: '¿Qué revirtió la situación tras los retrasos de T1?' },
        { speaker: 'PM', en: 'What truly moved the needle was daily 10-minute standups. Had we stayed on weekly emails, we wouldn\'t be ahead today!', es: 'Lo que de verdad generó impacto fueron standups diarios de 10 min. De haber seguido en correos semanales, ¡no iríamos adelantados hoy!' }
      ],
      drills: [
        { q: 'Were we to ignore early telemetry drift, defect risk ___ multiply rapidly.', opts: ['would', 'will have been', 'had', 'is'], ans: 0, exp: 'Inversión de 2º condicional ("Were we to + V") exige "would + V".', socraticHint: 'Condicional hipotético invertido.' },
        { q: 'Select the cleanest executive summary opener instead of "In resume":', opts: ['All in all, our joint team exceeded target throughput by 12%.', 'In resume, we did good job fast.', 'To resume everything, plant worked.', 'Actually, the resume is positive.'], ans: 0, exp: '"All in all," / "To sum up," es correcto; "in resume" es falso amigo.', socraticHint: 'Evita calco "en resumen".' }
      ],
      classroomActivity: {
        title: 'Defensa Final ante Junta Directiva (Crisol B2)',
        grouping: 'Tríos (Presentador, Director US, Quality Partner)',
        materials: 'Rubrica 5 criterios B2 + Power Sheet Capstone',
        steps: ['Presentación de 2 minutos + 1 min Q&A evaluando Clefts, Hedging, Modales Pasados e Idioms.', 'Ejecución completa de Boss Crucible & B2 Exam Marathon en stemOS (20 min).']
      },
      powerSheet: {
        fillBlanks: ['1. ___ in all, cross-functional syncs doubled speed. (All / In)', '2. Were we ___ skip validation, liability would soar. (to / for)', '3. What ___ the biggest impact was early containment. (had / did)', '4. By Q4 we ___ ___ automated 80% of checks. (will have)'],
        reorder: ['standups / What / daily / needle / moved / the / was / .'],
        writePrompt: 'Redacta tu retrospectiva B2 de 5 líneas usando 1 Cleft, 1 Inversión o Condicional Mixto y 1 Modismo:',
        answerKey: '1) All · 2) to · 3) had · 4) will have | Orden: What moved the needle was daily standups.'
      }
    },

    // =========================================================================
    // NIVEL C1–C2 EXTENSIÓN — 12 CLASES DE MAESTRÍA (c1-c01 .. c1-c12)
    // =========================================================================
    {
      id: 'c1-c01', unitId: 'c1-u1', level: 'C1-C2', classNum: 1, coreType: 'CORE', eaqualsRef: 'C1 #14, EGP C1',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Nominalization & Dense Technical/Academic Prose',
      titleES: 'Nominalización y Prosa Técnica/Académica de Alto Nivel',
      grammarFocus: 'Converting verbs/adjectives to abstract noun phrases + prepositional packing · Lexical density',
      canDo: 'Condensar reportes verbosos en prosa ejecutiva y científica de nivel publicación (IEEE / ISO).',
      industryContext: 'Redacción de papers, whitepapers de I+D, actas regulatorias ante FDA/FAA y patentes.',
      warmupPrompt: 'Compara: *"Because the cooling pump failed suddenly, the whole line stopped quickly"* vs *"Sudden pump failure prompted immediate line suspension"*. ¿Cuál suena a ingeniero senior C1?',
      grammarFormulaHtml: makeFormula('Cláusula Verbal Larga', '→', 'Frase Nominal (Adj + Sust + of/in)', '+', 'Verbo Analítico (triggered / yielded / mitigated)', '<strong>Failure to calibrate</strong> sensors <strong>led to widespread measurement drift</strong>.'),
      explanationES: 'La <strong>nominalización</strong> transforma acciones (<em>fail, deploy, analyze</em>) y cualidades (<em>reliable, scarce</em>) en sustantivos (<em>failure, deployment, analysis, reliability, scarcity</em>). Permite condensar causa y efecto en una sola oración objetiva e impersonal sin sonar infantil.',
      goldenRuleES: 'Evita abusar de <em>Nominalización + "is/are"</em> débil; empareja tu frase nominal con verbos precisos: <em>precipitated, yielded, underscored, necessitated, mitigated</em>.',
      commonMistake: { bad: 'The fail of the motor caused that they stopped the assembly.', good: 'Motor failure necessitated an immediate assembly halt.', exp: 'Usa el sustantivo derivado correcto ("failure", no "the fail") y evita "caused that".' },
      falseCognate: { term: 'Comprehensive / Concise', mistake: 'Traducir "comprehensive" como "comprensivo/empático"', correct: 'Integral / exhaustivo / completo', tip: '"A comprehensive audit" = auditoría integral completa, NO "auditoría comprensiva".' },
      vocab: [
        { en: 'Implementation', es: 'Implementación / Puesta en marcha', ipa: '/ˌɪmpləmɛnˈteɪʃən/', pinkStress: 'im-ple-men-TA-tion', example: 'Phased implementation minimized downtime.', exampleES: 'La implementación gradual minimizó paros.' },
        { en: 'Malfunction / Failure', es: 'Falla / Desperfecto crítico', ipa: '/ˌmælˈfʌŋkʃən/', pinkStress: 'mal-FUNC-tion', example: 'Relay malfunction prompted immediate isolation.', exampleES: 'La falla del relevador motivó aislamiento inmediato.' },
        { en: 'Mitigation', es: 'Mitigación / Atenuación de riesgo', ipa: '/ˌmɪtəˈɡeɪʃən/', pinkStress: 'mit-i-GA-tion', example: 'Thermal mitigation remains our top priority.', exampleES: 'La mitigación térmica sigue siendo prioridad.' },
        { en: 'Viability / Feasibility', es: 'Viabilidad / Factibilidad técnica', ipa: '/ˌvaɪəˈbɪləti/', pinkStress: 'vi-a-BIL-i-ty', example: 'The feasibility study confirmed long-term viability.', exampleES: 'El estudio de factibilidad confirmó viabilidad.' }
      ],
      dialogue: [
        { speaker: 'R&D Lead', en: 'Your draft reads slightly conversational for an IEEE whitepaper. Can we tighten the causality?', es: 'Tu borrador suena un poco coloquial para un whitepaper IEEE. ¿Ajustamos la causalidad?' },
        { speaker: 'Engineer', en: 'Certainly—instead of "we tested the alloy because it broke early," I\'ll nominalize the trigger.', es: 'Claro: en vez de "probamos la aleación porque se rompió antes", nominalizaré el detonante.' },
        { speaker: 'R&D Lead', en: 'Give me an example aloud.', es: 'Dame un ejemplo en voz alta.' },
        { speaker: 'Engineer', en: '"Premature alloy fatigue necessitated destructive stress testing prior to mass deployment."', es: '"La fatiga prematura de la aleación hizo necesarias pruebas destructivas previas al despliegue masivo."' }
      ],
      drills: [
        { q: 'Select the C1 nominalized rewrite of: "When workers complied strictly, defects dropped noticeably."', opts: ['Strict compliance yielded a marked reduction in defects.', 'When compliant strictly, defects went down noticeable.', 'Compliance strict made dropping the defects.', 'Workers complying strictly caused defects reduce.'], ans: 0, exp: '"Strict compliance yielded a marked reduction..." empaqueta sujeto y resultado en prosa técnica C1.', socraticHint: 'Busca Adj+Sustantivo + verbo preciso (yielded) + Sustantivo.' },
        { q: 'Which abstract noun properly derives from the verb "succeed" in business reports?', opts: ['Success', 'Successioning', 'Succeedment', 'Successfuly'], ans: 0, exp: '"Success" es éxito; "succession" es sucesión de cargos/secuencia.', socraticHint: 'Distingue familia morfológica.' },
        { q: '"A comprehensive root-cause assessment" means:', opts: ['A thorough, all-encompassing investigation', 'A sympathetic, forgiving review', 'A short emotional apology', 'A quick informal estimate'], ans: 0, exp: '"Comprehensive" = exhaustivo / integral (C1), no "comprensivo".', socraticHint: 'Cuidado con el falso cognado.' }
      ],
      classroomActivity: {
        title: 'Editor Ejecutivo IEEE (Compresión Nominal en Pares)',
        grouping: 'Parejas',
        materials: '4 oraciones coloquiales largas en pizarra + Power Sheet C1-C01',
        steps: ['Cada pareja transforma 3 oraciones coloquiales (18-24 palabras) en 1 oración nominalizada C1 de máx 11 palabras sin perder información.', 'Comparten en plenaria comparando verbos de alto impacto (precipitated, underscored, hampered).']
      },
      powerSheet: {
        fillBlanks: ['1. Strict ___ with ISO rules eliminated audit fines. (comply → noun)', '2. Battery degradation ___ a complete recall. (necessitated / need)', '3. Rapid ___ of the firmware resolved latency. (deploy → noun)', '4. Resource ___ forced strict prioritization. (scarce → noun)'],
        reorder: ['halted / Premature / failure / valve / operations / .'],
        writePrompt: 'Nominaliza esta idea en 1 frase C1: "Because the supplier delivered late, we delayed assembly for three days."',
        answerKey: '1) compliance · 2) necessitated · 3) deployment · 4) scarcity | Orden: Premature valve failure halted operations. | Ej: Late supplier delivery delayed assembly by three days.'
      }
    },
    {
      id: 'c1-c02', unitId: 'c1-u1', level: 'C1-C2', classNum: 2, coreType: 'CORE', eaqualsRef: 'C1 #19, EGP C1',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Advanced Relative & Reduced Participle Clauses',
      titleES: 'Cláusulas Relativas Avanzadas y Particípiales Reducidas',
      grammarFocus: 'Preposition + whom/which ("in which", "whereby") · All/none/most of whom/which · Reduced -ing / -ed clauses',
      canDo: 'Construir especificaciones complejas, patentes y contratos sin ambigüedad usando relativas formales y participios reducidos.',
      industryContext: 'Contratos MSA, especificaciones de arquitectura, auditorías legales y papers de ingeniería.',
      warmupPrompt: '¿Cómo condensas *"The bracket, which was machined from titanium and which weighs only 14g, passed vibration"* en elegante inglés técnico? -> *"Machined from titanium, the 14g bracket passed..."*',
      grammarFormulaHtml: makeFormula('Preposición + which / whom', '|', 'Quantifier + of whom / which', '|', 'Participle (-ing activa / -ed pasiva)', 'The protocol <strong>whereby</strong> nodes sync... · Twelve sensors, <strong>three of which</strong> failed... · <strong>Calibrated</strong> daily, accuracy holds.'),
      explanationES: 'En registro C1 evitamos dejar preposiciones colgando en textos escritos formales usando <code>by which / in which / whereby</code> y estructuras de cuantificador (<code>most of which, none of whom</code>). Las <strong>cláusulas participiales</strong> omiten sujeto+be para dar fluidez ejecutiva: <code>Designed for...</code> (pasiva) o <code>Operating at...</code> (activa).',
      goldenRuleES: 'Regla anti-error (Dangling Participle): el sujeto inmediatamente posterior a la coma <strong>DEBE</strong> ser el agente o paciente real del participio (✗ <em>Driving past the plant, the roof looked damaged</em>).',
      commonMistake: { bad: 'We tested 10 motors, three of them failed. / Tested at 80°C, engineers saw smoke.', good: 'We tested 10 motors, three of which failed. / Tested at 80°C, the units emitted smoke.', exp: 'Usa "of which" tras coma sin punto; y cuida que el sujeto tras el participio coincida lógicamente.' },
      falseCognate: { term: 'Whereby', mistake: 'Confundir "whereby" con "donde"', correct: 'Mediante el cual / Por el cual', tip: 'Excelente conector para explicar mecanismos: "a process whereby waste heat recycles power".' },
      vocab: [
        { en: 'Whereby', es: 'Mediante el cual / Por medio del cual', ipa: '/wɛrˈbaɪ/', pinkStress: 'where-BY', example: 'We built a loop whereby latency drops automatically.', exampleES: 'Creamos un lazo mediante el cual la latencia cae sola.' },
        { en: 'Pertaining to', es: 'Relativo a / Concerniente a', ipa: '/pərˈteɪnɪŋ tu/', pinkStress: 'per-TAIN-ing to', example: 'Clauses pertaining to IP remain binding.', exampleES: 'Las cláusulas relativas a PI siguen vigentes.' },
        { en: 'Comprising / Consisting of', es: 'Que comprende / Compuesto por', ipa: '/kəmˈpraɪzɪŋ/', pinkStress: 'com-PRIS-ing', example: 'A cluster comprising 16 GPUs runs inference.', exampleES: 'Un clúster compuesto por 16 GPU corre inferencia.' },
        { en: 'Subject to', es: 'Sujeto a / Condicionado a', ipa: '/ˈsʌbdʒɪkt tu/', pinkStress: 'SUB-ject to', example: 'Approvals are subject to quarterly verification.', exampleES: 'Las aprobaciones quedan sujetas a verificación trimestral.' }
      ],
      dialogue: [
        { speaker: 'Counsel', en: 'Clause 8 outlines the escrow mechanism whereby source code transfers upon insolvency.', es: 'La cláusula 8 detalla el mecanismo de depósito mediante el cual el código fuente se transfiere ante insolvencia.' },
        { speaker: 'CTO', en: 'What about the 12 test modules listed in Exhibit B, half of which use third-party firmware?', es: '¿Qué hay de los 12 módulos de prueba del Anexo B, la mitad de los cuales usan firmware de terceros?' },
        { speaker: 'Counsel', en: 'Embedded within our kernel, those libraries remain subject to Apache licensing.', es: 'Incrustadas dentro de nuestro kernel, esas bibliotecas siguen sujetas a licencia Apache.' }
      ],
      drills: [
        { q: 'The QA team audited 40 batches, ___ proved completely defect-free.', opts: ['all of which', 'all of them', 'all of whom', 'which all'], ans: 0, exp: 'Para cosas tras coma sin verbo finito previo usamos "all of which" (NO "all of them").', socraticHint: 'Relativa no restrictiva para objetos.' },
        { q: '___ under extreme thermal stress, the ceramic shield showed zero microfractures.', opts: ['Evaluated', 'Evaluating', 'Evaluate', 'Having evaluate'], ans: 0, exp: '"The ceramic shield" recibe la evaluación → participio pasado pasivo "Evaluated".', socraticHint: 'El escudo fue evaluado.' },
        { q: 'Fix the dangling participle: "Arriving at customs, the invoice showed an incorrect HS code."', opts: ['Arriving at customs, inspectors noticed an incorrect HS code on the invoice.', 'Arriving at customs, the invoice had arrived.', 'Arriving at customs, the box showed code.', 'The invoice arriving at customs was seen.'], ans: 0, exp: 'Los inspectores llegan a aduana, no la factura.', socraticHint: 'Alinea el sujeto tras la coma.' }
      ],
      classroomActivity: {
        title: 'Cirugía de Cláusulas de Patente & Evitar Dangling Participles',
        grouping: 'Parejas',
        materials: 'Tarjetas con 2 pares de oraciones + 2 errores dangling en Power Sheet',
        steps: ['Fusionan pares usando `whereby`, `most of which` y participios `-ed/-ing`.', 'Detectan y corrigen 2 dangling participles chistosos en 3 minutos.']
      },
      powerSheet: {
        fillBlanks: ['1. Five prototypes arrived, two of ___ needed rewiring. (which / whom)', '2. ___ from carbon fiber, the drone weighs under 400g. (Molded / Molding)', '3. An arbitration clause ___ disputes settle within 30 days. (whereby / where)', '4. Twenty engineers attended, none of ___ had prior notice. (whom / which)'],
        reorder: ['heat, / Exposed / expands / rapidly / metal / the / to / .'],
        writePrompt: 'Redacta 2 especificaciones C1: una usando "...none/half of which" y otra comenzando con participio "-ed":',
        answerKey: '1) which · 2) Molded · 3) whereby · 4) whom | Orden: Exposed to heat, the metal expands rapidly.'
      }
    },
    {
      id: 'c1-c03', unitId: 'c1-u1', level: 'C1-C2', classNum: 3, coreType: 'CORE', eaqualsRef: 'C1 Grammar / Register',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Mandative Subjunctive & Formal Policy/Governance Writing',
      titleES: 'Subjuntivo Mandativo y Redacción Formal de Políticas y Gobernanza',
      grammarFocus: 'It is imperative / essential / recommended that S + (should) + V_base · Lest S (should) V_base · Be that as it may',
      canDo: 'Redactar directivas de cumplimiento, protocolos de seguridad crítica y resoluciones corporativas en registro jurídico/ejecutivo impecable.',
      industryContext: 'Políticas de seguridad EHS, resoluciones de consejo, SLAs y memorándums regulatorios.',
      warmupPrompt: '¿Por qué un abogado o director escribe *"The board insists that every vendor **comply** (sin -s) and **be** audited"*? ¡El subjuntivo inglés vive en política y compliance!',
      grammarFormulaHtml: makeFormula('Verbo/Adj de Demanda (insist / imperative / vital)', '+', 'that + Sujeto', '+', '(not) Verbo Base / be + PP', 'It is imperative that he <strong>submit</strong> proof. · Policy mandates that data <strong>be</strong> encrypted.'),
      explanationES: 'El <strong>subjuntivo mandativo</strong> se usa en inglés formal (especialmente estadounidense e institucional) tras verbos y adjetivos de exigencia/urgencia: <code>mandate, insist, recommend, vital, imperative, essential</code>. Usa siempre la forma base infinitiva sin <code>-s</code> (<em>she check</em>) y niega solo con <code>not</code> sin <em>don\'t/doesn\'t</em> (<code>that she not enter</code>).',
      goldenRuleES: 'Expresiones fijas C1–C2 listas para usar: <em>Be that as it may</em> (sea como fuere), <em>Suffice it to say</em> (baste decir que), <em>Lest we overlook</em> (no sea que pasemos por alto).',
      commonMistake: { bad: 'OSHA requires that the supervisor wears goggles and doesn\'t ignore alarms.', good: 'OSHA requires that the supervisor wear goggles and not ignore alarms.', exp: 'El subjuntivo exige forma base ("wear") y negación directa con "not" ("not ignore").' },
      falseCognate: { term: 'Demand / Ordinance / Policy', mistake: 'Traducir "policy" como "policía"', correct: 'Normativa / Política interna institucional', tip: '"Compliance policy" = política de cumplimiento; "police" = policía.' },
      vocab: [
        { en: 'Imperative', es: 'Imperativo / Indispensable', ipa: '/ɪmˈpɛrətɪv/', pinkStress: 'im-PER-a-tive', example: 'It is imperative that valves remain sealed.', exampleES: 'Es imperativo que las válvulas permanezcan selladas.' },
        { en: 'Mandate', es: 'Ordenar por norma / Mandato', ipa: '/ˈmændeɪt/', pinkStress: 'MAN-date', example: 'Statutes mandate that logs be retained five years.', exampleES: 'Los estatutos exigen que los registros se guarden 5 años.' },
        { en: 'Lest', es: 'No sea que / Para evitar que', ipa: '/lɛst/', pinkStress: 'LEST', example: 'Back up keys lest access be lost.', exampleES: 'Respalda llaves no sea que se pierda acceso.' },
        { en: 'Stipulate', es: 'Estipular formalmente', ipa: '/ˈstɪpjəleɪt/', pinkStress: 'STIP-u-late', example: 'Contracts stipulate that notice be given in writing.', exampleES: 'Los contratos estipulan aviso por escrito.' }
      ],
      dialogue: [
        { speaker: 'Compliance', en: 'Federal guidelines mandate that all biometric hashes remain isolated on-premise.', es: 'Las pautas federales exigen que todo hash biométrico permanezca aislado localmente.' },
        { speaker: 'Ops Lead', en: 'Should our subcontractor request raw access?', es: '¿Qué tal si nuestro subcontratista solicita acceso sin procesar?' },
        { speaker: 'Compliance', en: 'Our charter stipulates that no third party access raw tokens, lest compliance certification be revoked.', es: 'Nuestro estatuto estipula que ningún tercero acceda a tokens crudos, no sea que se revoque la certificación.' }
      ],
      drills: [
        { q: 'The safety committee insists that the contractor ___ full PPE before entering Zone 4.', opts: ['wear', 'wears', 'wore', 'will wearing'], ans: 0, exp: '"Insists that + S + V_base" → "wear" (sin -s).', socraticHint: 'Subjuntivo mandativo sin conjugación de 3ª persona.' },
        { q: 'Protocol requires that sensitive credentials ___ stored in plaintext.', opts: ['not be', "aren't", "don't be", 'not being'], ans: 0, exp: 'Subjuntivo negativo pasivo = "not + be + past participle".', socraticHint: 'No uses auxiliares do/are en subjuntivo negativo.' },
        { q: 'Encrypt every backup nightly ___ critical telemetry be corrupted.', opts: ['lest', 'unless', 'despite', 'whereby'], ans: 0, exp: '"Lest + S + V_base/be" expresa precaución formal ("no sea que").', socraticHint: 'Conjunción C1–C2 de prevención.' }
      ],
      classroomActivity: {
        title: 'Redacción de Memorándum de Seguridad Crítica',
        grouping: 'Individual → Revisión por pares',
        materials: 'Plantilla Memo EHS en Power Sheet C1-C03',
        steps: ['Redactan 3 reglas obligatorias de laboratorio/ciberseguridad usando `It is vital that`, `Policy stipulates that` y `...not + V_base` / `lest`.', 'El compañero audita que no haya ninguna "-s" ni "don\'t" filtrada.']
      },
      powerSheet: {
        fillBlanks: ['1. Management recommended that the vendor ___ its pricing model. (revise / revises)', '2. It is crucial that this patch ___ deployed before midnight. (be / is)', '3. Policy directs that operators ___ bypass thermal interlocks. (not / don\'t)', '4. Audit trails are archived ___ discrepancy claims arise later. (lest / despite)'],
        reorder: ['maintained / logs / imperative / be / that / accurately / It / is / .'],
        writePrompt: 'Redacta 2 directivas mandativas para tu laboratorio usando subjuntivo afirmativo y negativo:',
        answerKey: '1) revise · 2) be · 3) not · 4) lest | Orden: It is imperative that logs be maintained accurately.'
      }
    },
    {
      id: 'c1-c04', unitId: 'c1-u2', level: 'C1-C2', classNum: 4, coreType: 'CORE', eaqualsRef: 'C1 #30, #31',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'High-Level Discourse Markers: Concession, Contrast & Causation',
      titleES: 'Marcadores Discursivos Avanzados: Concesión, Contraste y Causalidad',
      grammarFocus: 'Notwithstanding · Albeit · Inasmuch as · Thereby + -ing · Conversely · In light of',
      canDo: 'Articular argumentos complejos matizando concesiones, causas legales y efectos secundarios en ensayos y juntas directivas.',
      industryContext: 'Memorandos de análisis financiero, reportes de causas raíz (5-Whys) y evaluaciones de impacto.',
      warmupPrompt: '¿Cómo reemplazas los repetitivos "but", "although" y "so" por conectores de calibre C1 como *"albeit"*, *"notwithstanding"* y *"thereby reducing"*?',
      grammarFormulaHtml: makeFormula('Notwithstanding + Frase Nominal', '|', 'Adjetivo / Frase, albeit + breve', '|', 'Cláusula, thereby + Gerundio (-ing)', 'The upgrade worked, <strong>albeit at higher cost</strong>. · We automated QA, <strong>thereby slashing</strong> scrap.'),
      explanationES: 'Los conectores C1 tienen sintaxis estricta: <code>notwithstanding</code> equivale a <em>pese a</em> y toma sustantivo (o va al final: <em>supply shocks notwithstanding</em>); <code>albeit</code> significa <em>aunque / si bien</em> y va antes de un adjetivo o frase corta (nunca antes de cláusula con verbo conjugado completo); <code>thereby + -ing</code> introduce el resultado directo.',
      goldenRuleES: 'Formula de oro en reportes técnicos: <strong>[Acción implementada], thereby + [Verbo-ing] + [Métrica impactada]</strong> (ej. <em>"...thereby cutting rework by 32%"</em>).',
      commonMistake: { bad: 'Albeit the server crashed, users waited. / Thus allowing speed.', good: 'Although the server crashed (o Albeit slowly), users adapted. · ...thereby accelerating speed.', exp: '"Albeit" no abre cláusulas completas con sujeto+verbo; usa "Although".' },
      falseCognate: { term: 'Inasmuch as / Hence', mistake: 'Traducir "hence" como "entonces/después en tiempo"', correct: 'Por consiguiente / De ahí que', tip: '"Hence the delay" significa "de ahí el retraso" (causalidad lógica, no secuencia temporal).' },
      vocab: [
        { en: 'Albeit', es: 'Aunque / Si bien (antes de adj/frase)', ipa: '/ɔlˈbiɪt/', pinkStress: 'al-BE-it', example: 'Throughput rose, albeit modestly at first.', exampleES: 'La producción subió, si bien modestamente al inicio.' },
        { en: 'Notwithstanding', es: 'No obstante / Pese a', ipa: '/ˌnɑtwɪðˈstændɪŋ/', pinkStress: 'not-with-STAND-ing', example: 'Tariff hikes notwithstanding, margins held steady.', exampleES: 'Pese a alzas arancelarias, los márgenes se sostuvieron.' },
        { en: 'Thereby', es: 'Con ello / De ese modo (+ -ing)', ipa: '/ðɛrˈbaɪ/', pinkStress: 'there-BY', example: 'Motors idle offline, thereby saving 14% kWh.', exampleES: 'Los motores hibernan fuera de turno, ahorrando con ello 14% kWh.' },
        { en: 'Inasmuch as', es: 'En la medida en que / Dado que', ipa: '/ˌɪnəzˈmʌtʃ æz/', pinkStress: 'in-as-MUCH as', example: 'The test holds inasmuch as pressure stays constant.', exampleES: 'La prueba aplica en la medida en que la presión sea estable.' }
      ],
      dialogue: [
        { speaker: 'Analyst', en: 'Q3 output improved steadily, albeit under tight semiconductor constraints.', es: 'La producción de T3 mejoró con firmeza, aunque bajo fuertes restricciones de chips.' },
        { speaker: 'Director', en: 'How did plant scheduling adapt?', es: '¿Cómo se adaptó la programación de planta?' },
        { speaker: 'Analyst', en: 'We consolidated batch changeovers, thereby liberating six engineering hours per shift—labor shortages notwithstanding.', es: 'Consolidamos cambios de lote, liberando con ello 6 horas de ingeniería por turno, pese a la escasez laboral.' }
      ],
      drills: [
        { q: 'Progress on the cleanroom was undeniable, ___ slower than originally forecast.', opts: ['albeit', 'notwithstanding the', 'thereby', 'inasmuch'], ans: 0, exp: '"albeit + adj/phrase" introduce una concesión breve ("si bien más lento").', socraticHint: 'Va seguido solo por un grupo adjetival, sin verbo.' },
        { q: 'Dual-sourcing insulated our supply line, ___ mitigating single-vendor exposure.', opts: ['thereby', 'albeit', 'despite', 'inasmuch as'], ans: 0, exp: '"..., thereby + V-ing" conecta una acción con su consecuencia directa.', socraticHint: 'Precedido de coma + seguido por gerundio.' },
        { q: 'Early prototyping hurdles ___, the avionics module passed FAA burn-in.', opts: ['notwithstanding', 'albeit', 'thereby', 'henceforth'], ans: 0, exp: '"[Noun phrase] notwithstanding," equivale formalmente a "Despite [noun phrase],".', socraticHint: 'Posposición concesiva elegante.' }
      ],
      classroomActivity: {
        title: 'Cadena Argumentativa de Consultor McKinsey (1 min)',
        grouping: 'Tríos rotativos',
        materials: '4 tarjetas de conectores C1 (`albeit`, `thereby`, `notwithstanding`, `conversely`)',
        steps: ['Defienden una decisión de inversión en 4 oraciones enlazando los 4 conectores con precisión sintáctica.', 'Los dos oyentes validan si `albeit` o `thereby` respetaron su estructura gramatical.']
      },
      powerSheet: {
        fillBlanks: ['1. Sensor replacement succeeded, ___ incurring minor downtime. (albeit / although)', '2. Caching cut payload size, ___ doubling API responsiveness. (thereby / notwithstanding)', '3. Budget freezes ___, R&D delivered two patents. (notwithstanding / albeit)', '4. Compliance applies ___ automated inference affects credit. (inasmuch as / despite)'],
        reorder: ['thereby / costs / consolidated / cutting / Warehouses / shipping / .'],
        writePrompt: 'Escribe 2 oraciones ejecutivas usando "albeit" y "thereby + -ing" sobre mejora continua:',
        answerKey: '1) albeit · 2) thereby · 3) notwithstanding · 4) inasmuch as | Orden: Warehouses consolidated thereby cutting shipping costs.'
      }
    },
    {
      id: 'c1-c05', unitId: 'c1-u2', level: 'C1-C2', classNum: 5, coreType: 'CORE', eaqualsRef: 'C1 #3, EGP C1',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Nuanced Modal Probability, Concession & Hypothetical Modals',
      titleES: 'Matices Modales de Probabilidad, Concesión y Alternativas Hipotéticas',
      grammarFocus: 'may/might well have + PP · could hardly have · needn\'t have vs didn\'t need to · Should S + V (inverted)',
      canDo: 'Evaluar probabilidades complejas en retrospectiva, distinguir acciones innecesarias ya realizadas y expresar concesiones sofisticadas.',
      industryContext: 'Autopsias post-mortem de fallas, arbitraje de garantías y análisis forense técnico.',
      warmupPrompt: '¿Cuál es la enorme diferencia entre *"We didn\'t need to recalibrate"* y *"We needn\'t have recalibrated"*? ¡En la segunda perdiste tiempo haciéndolo!',
      grammarFormulaHtml: makeFormula('may / might well + V', '→', 'Probabilidad considerable / Concesión', '|', 'needn\'t have + PP', '<strong>We needn\'t have</strong> rushed—the shipment stalled. · Firmware <strong>might well have</strong> masked it.'),
      explanationES: 'Los modales C1 transmiten grados quirúrgicos de certeza e ironía técnica: <code>may/might well + V</code> significa <em>es muy probable que</em> o concesivo <em>aunque tenga razón...</em>; <code>needn\'t have + PP</code> indica algo que sí se hizo pero resultó inútil; <code>didn\'t need to + V</code> indica algo innecesario (normalmente no hecho).',
      goldenRuleES: 'Para invertir elegancia condicional formal en 1º grado usa: <code>Should further vibration occur, suspend operation</code> (= <em>If further vibration occurs...</em>).',
      commonMistake: { bad: 'We didn\'t need to printed 500 manuals, so we wasted paper yesterday.', good: 'We needn\'t have printed 500 manuals—they updated the spec this morning!', exp: 'Si la acción innecesaria SÍ ocurrió y lamentas el esfuerzo, usa "needn\'t have + PP".' },
      falseCognate: { term: 'Bound to / Apt to', mistake: 'Traducir "bound to happen" como "atado a pasar"', correct: 'Inevitable / destinado a pasar tarde o temprano', tip: '"Overheating was bound to trip the breaker" = El sobrecalentamiento iba a botar la pastilla tarde o temprano.' },
      vocab: [
        { en: 'Bound to (happen)', es: 'Inevitable que ocurra', ipa: '/baʊnd tu/', pinkStress: 'BOUND to', example: 'Unmonitored creep is bound to fracture.', exampleES: 'La fluencia sin monitoreo inevitablemente fracturará.' },
        { en: 'May well (have)', es: 'Bien podría (haber)... / Es muy probable', ipa: '/meɪ wɛl/', pinkStress: 'may WELL', example: 'Humidity may well have corroded the pin.', exampleES: 'La humedad muy probablemente corroyó el pin.' },
        { en: 'Needn\'t have', es: 'No hacía falta haber (pero se hizo)', ipa: '/ˈnidənt hæv/', pinkStress: 'NEED-n\'t have', example: 'We needn\'t have overnighted the spares.', exampleES: 'No había necesidad de mandar refacciones exprés.' },
        { en: 'Conceivably', es: 'Concebiblemente / Posiblemente', ipa: '/kənˈsivəbli/', pinkStress: 'con-CEIV-a-bly', example: 'Latency could conceivably trace to DNS.', exampleES: 'La latencia concebiblemente vendría del DNS.' }
      ],
      dialogue: [
        { speaker: 'Lead', en: 'We stayed until midnight rewriting reports—and management cancelled the audit this morning!', es: 'Nos quedamos hasta medianoche reescribiendo reportes ¡y gerencia canceló auditoría hoy!' },
        { speaker: 'QA', en: 'So we needn\'t have pulled an all-nighter after all. At least the deck might well serve next quarter.', es: 'Así que no hacía falta desvelarse después de todo. Al menos el deck bien podría servir el próximo trimestre.' },
        { speaker: 'Lead', en: 'True. Should they reinstate an audit unannounced, we\'re ready.', es: 'Cierto. En caso de que reinstalen auditoría sorpresa, ya estamos listos.' }
      ],
      drills: [
        { q: 'I spent three hours translating docs only to learn the client speaks Spanish! I ___ translated them.', opts: ["needn't have", "didn't need", "couldn't", 'must have'], ans: 0, exp: 'Acción completada que luego resultó innecesaria → "needn\'t have + PP".', socraticHint: 'Sí lo hiciste, pero no era necesario.' },
        { q: 'With unshielded cables near high-voltage rails, interference ___ occur.', opts: ['is bound to', 'needn\'t have', 'might hardly', 'had better not'], ans: 0, exp: '"Is bound to" indica alta inevitabilidad física/lógica.', socraticHint: 'Casi certeza física.' },
        { q: '___ any anomaly persist post-patch, escalate straight to Tier-3.', opts: ['Should', 'Were', 'Had', 'Might'], ans: 0, exp: 'Inversión de condicional futuro/presente real: "Should + S + V_base".', socraticHint: 'Inversión que reemplaza "If any anomaly persists".' }
      ],
      classroomActivity: {
        title: 'Diagnóstico Forense de Esfuerzos Innecesarios y Probabilidades',
        grouping: 'Parejas',
        materials: '4 mini-casos de proyecto en Power Sheet C1-C05',
        steps: ['Distinguen si el equipo actuó (`needn\'t have`) o evitó actuar (`didn\'t need to`).', 'Califican hipótesis con `may well have` vs `could hardly have`.']
      },
      powerSheet: {
        fillBlanks: ['1. Engineers ___ rewritten the script—v2 shipped native support anyway. (needn\'t have / mustn\'t have)', '2. Unchecked memory growth is ___ to crash the node. (bound / apt to not)', '3. Thermal drift ___ well explain Tuesday\'s offset. (may / had)', '4. ___ demand surge unexpectedly, Buffer B activates. (Should / Had)'],
        reorder: ['overtime / You / booked / needn\'t / Saturday / have / .'],
        writePrompt: 'Describe un esfuerzo innecesario que viviste y una consecuencia inevitable en el trabajo:',
        answerKey: '1) needn\'t have · 2) bound · 3) may · 4) Should | Orden: You needn\'t have booked Saturday overtime.'
      }
    },
    {
      id: 'c1-c06', unitId: 'c1-u2', level: 'C1-C2', classNum: 6, coreType: 'CORE', eaqualsRef: 'C1–C2 Octanove AWL',
      modularity: 'functional-spatial', hasSlides: true,
      title: 'Precision Executive & Technical Collocations (C1–C2 Lexicon)',
      titleES: 'Léxico de Precisión Ejecutiva y Colocaciones Técnicas C1–C2',
      grammarFocus: 'Academic/STEM collocations: empirical evidence · mitigate/exacerbate · corroborate · precedent · ubiquitous · trajectory',
      canDo: 'Reemplazar verbos genéricos ("make, get, bad, big") por colocaciones C1–C2 exactas usadas en industria global.',
      industryContext: 'Presentaciones estratégicas, revisiones entre pares, papers de datos y evaluaciones de mercado.',
      warmupPrompt: '¿Por qué un director prefiere escuchar *"corroborate our hypothesis and mitigate downside exposure"* en lugar de *"prove our idea good and make risk smaller"*?',
      grammarFormulaHtml: makeFormula('Adverbio/Adj Preciso (starkly / compelling / empirical)', '+', 'Verbo Colocado (exacerbate / corroborate / alleviate)', '+', 'Sustantivo Abstracto', '<strong>Empirical evidence</strong> corroborates growth. · Delays <strong>exacerbated</strong> bottlenecks.'),
      explanationES: 'La fluidez <strong>C1–C2</strong> no se mide por palabras raras aisladas sino por <strong>colocaciones naturales</strong> (palabras que coexisten juntas): <em>mitigate a risk</em>, <em>exacerbate a bottleneck</em>, <em>corroborate a claim</em>, <em>empirical evidence</em>, <em>viable trajectory</em>, <em>unprecedented throughput</em>.',
      goldenRuleES: 'Sustituye "bad/worse" por <em>exacerbate</em> (empeorar un problema) o <em>deteriorate</em>; sustituye "show/prove" por <em>substantiate</em> o <em>corroborate</em>.',
      commonMistake: { bad: 'Make an empirical proof to fix the big problem fast.', good: 'Gather empirical evidence to alleviate the bottleneck decisively.', exp: 'Colocación correcta: "gather/compile empirical evidence", "alleviate/mitigate a bottleneck".' },
      falseCognate: { term: 'Discrepancy vs Difference / Precedent', mistake: 'Confundir "precedent" (jurisprudencia/antecedente) con "president"', correct: 'Antecedente previo ("set a precedent")', tip: 'Para hablar de casos previos inéditos: "This yield sets an unprecedented benchmark".' },
      vocab: [
        { en: 'Corroborate / Substantiate', es: 'Corroborar / Sustentar con evidencia', ipa: '/kəˈrɑbəˌreɪt/', pinkStress: 'cor-ROB-o-rate', example: 'Lab logs corroborate telemetry readings.', exampleES: 'Las bitácoras de laboratorio corroboran la telemetría.' },
        { en: 'Exacerbate', es: 'Agraviar / Empeorar un problema existente', ipa: '/ɪɡˈzæsərˌbeɪt/', pinkStress: 'ex-AC-er-bate', example: 'Unplanned stops exacerbate tooling wear.', exampleES: 'Los paros no planeados agravan el desgaste.' },
        { en: 'Ubiquitous', es: 'Ubicuo / Omnipresente', ipa: '/juˈbɪkwɪtəs/', pinkStress: 'u-BIQ-ui-tous', example: 'Edge sensors are now ubiquitous across plants.', exampleES: 'Los sensores edge son ya ubicuos en plantas.' },
        { en: 'Feasible / Pragmatic', es: 'Factible / Pragmático', ipa: '/ˈfizəbəl/', pinkStress: 'FEA-si-ble', example: 'Retrofit cooling proved commercially feasible.', exampleES: 'La actualización de enfriamiento resultó viable.' }
      ],
      dialogue: [
        { speaker: 'VP Eng', en: 'Do field diagnostics corroborate the lab\'s failure hypothesis?', es: '¿Los diagnósticos de campo corroboran la hipótesis de falla del laboratorio?' },
        { speaker: 'Lead', en: 'Yes—and empirical vibration data reveals that humid transit further exacerbated weld fatigue.', es: 'Sí; y datos empíricos de vibración revelan que el traslado húmedo agravó la fatiga de soldadura.' },
        { speaker: 'VP Eng', en: 'What pragmatic mitigation is commercially feasible this quarter?', es: '¿Qué mitigación pragmática es comercialmente factible este trimestre?' }
      ],
      drills: [
        { q: 'Ignoring preventive lubrication will only ___ gear wear over peak season.', opts: ['exacerbate', 'corroborate', 'alleviate', 'mitigate'], ans: 0, exp: '"Exacerbate" = agravar o intensificar un problema existente.', socraticHint: 'Verbo para empeorar una situación.' },
        { q: 'Independent stress telemetry helped ___ the supplier\'s quality claim.', opts: ['corroborate', 'proliferate', 'exacerbate', 'circumvent'], ans: 0, exp: '"Corroborate" = confirmar con evidencia adicional independiente.', socraticHint: 'Respaldar una afirmación técnica.' },
        { q: 'Select the cleanest natural collocation:', opts: ['empirical evidence', 'empirical guessing', 'exacerbate safety', 'alleviate disaster increases'], ans: 0, exp: '"Empirical evidence" es colocación fija C1–C2 estándar.', socraticHint: 'Combina medición real con evidencia.' }
      ],
      classroomActivity: {
        title: 'Upgrader Léxico A2→C2 en Tiempo Real',
        grouping: 'Parejas',
        materials: '5 párrafos simples con palabras marcadas ("make smaller", "prove", "make worse", "everywhere")',
        steps: ['Sustituyen las 6 expresiones simples por colocaciones C1–C2 (`mitigate`, `corroborate`, `exacerbate`, `ubiquitous`, `unprecedented`, `feasible`).', 'Leen su versión mejorada midiendo concisión y autoridad.']
      },
      powerSheet: {
        fillBlanks: ['1. Independent audits ___ our emissions reduction metrics. (corroborate / exacerbate)', '2. Shipping bottlenecks could ___ raw wafer shortages. (exacerbate / substantiate)', '3. RFID tracking has become ___ in modern warehousing. (ubiquitous / scarce)', '4. Is a zero-downtime migration ___ before Q4? (feasible / vulnerable)'],
        reorder: ['evidence / mitigates / Empirical / design / blindspots / .'],
        writePrompt: 'Redacta un micro-diagnóstico de 3 líneas integrando "empirical evidence", "exacerbate" y "mitigate":',
        answerKey: '1) corroborate · 2) exacerbate · 3) ubiquitous · 4) feasible | Orden: Empirical evidence mitigates design blindspots.'
      }
    },
    {
      id: 'c1-c07', unitId: 'c1-u3', level: 'C1-C2', classNum: 7, coreType: 'CORE', eaqualsRef: 'C1–C2 Pragmatics & Crisis',
      modularity: 'functional-spatial', hasSlides: false,
      title: 'Executive Crisis Communication & Diplomatic Containment',
      titleES: 'Comunicación Ejecutiva de Crisis y Contención Diplomática',
      grammarFocus: 'Active accountability without panic · Strategic hedging · Concession–Bridge–Action framework · Tone calibration',
      canDo: 'Comunicar incidentes graves a clientes VIP o prensa técnica manteniendo credibilidad, calma y control legal.',
      industryContext: 'Manejo de crisis (outages, recalls, brechas de seguridad, incidentes de cliente tier-1).',
      warmupPrompt: 'Cuando ocurre un outage de 4 horas, ¿por qué decir *"It was our junior\'s fault"* o *"Everything is fine"* destruye la confianza? Aprende el marco C1: **Acknowledge → Contain → Rectify**.',
      grammarFormulaHtml: makeFormula('1. Acknowledge (Sin excusas)', '→', '2. Containment Scope (Precisión)', '→', '3. Corrective Roadmap + Timeline', 'We acknowledge service disruption; impact <strong>is confined to</strong> Region B; permanent failover deploys by 18:00.'),
      explanationES: 'La comunicación de crisis C1–C2 equilibra <strong>transparencia y responsabilidad controlada</strong>: evita culpar individuos, cuantifica el radio exacto de afectación (<code>impact is confined to...</code>), evita promesas absolutas ilegales ("never again") y cierra con hitos verificables.',
      goldenRuleES: 'Usa frases de contención de élite: <em>"Out of an abundance of caution..."</em>, <em>"Pending root-cause verification..."</em>, <em>"We take full ownership of remediation"</em>.',
      commonMistake: { bad: 'Sorry, we broke the database by accident and maybe tomorrow we fix it, don\'t sue us.', good: 'Out of an abundance of caution, affected nodes were isolated; full restoration is underway with hourly updates.', exp: 'Usa tono calmado, pasiva estratégica para acciones técnicas y compromiso de seguimiento concreto.' },
      falseCognate: { term: 'Contain / Compromise / Liability', mistake: 'Confundir "compromise" con "compromiso"', correct: 'Riesgo/vulneración ("compromised data") o acuerdo mutuo', tip: '"Zero customer keys were compromised" = Ninguna llave de cliente fue vulnerada/expuesta.' },
      vocab: [
        { en: 'Out of an abundance of caution', es: 'Por extrema precaución preventiva', ipa: '/aʊt ʌv æn əˈbʌndəns ʌv ˈkɔʃən/', pinkStress: 'a-BUN-dance of CAU-tion', example: 'Out of an abundance of caution, we recalled Lot 9.', exampleES: 'Por extrema precaución retiramos el Lote 9.' },
        { en: 'Confined to / Contained within', es: 'Limitado/confinado exclusivamente a', ipa: '/kənˈfaɪnd tu/', pinkStress: 'con-FINED to', example: 'Fault propagation was confined to staging nodes.', exampleES: 'La propagación de falla quedó confinada a nodos staging.' },
        { en: 'Compromised', es: 'Vulnerado / Expuesto / Puesto en riesgo', ipa: '/ˈkɑmprəˌmaɪzd/', pinkStress: 'COM-pro-mised', example: 'Audit confirms zero patient records were compromised.', exampleES: 'La auditoría confirma cero expedientes vulnerados.' },
        { en: 'Remediation', es: 'Remediación / Corrección definitiva', ipa: '/rɪˌmidiˈeɪʃən/', pinkStress: 're-me-di-A-tion', example: 'Permanent remediation concludes within 12 hours.', exampleES: 'La remediación permanente concluye en 12 horas.' }
      ],
      dialogue: [
        { speaker: 'Client VP', en: 'Your API outage froze our fulfillment floor for ninety minutes. How exposed are we?', es: 'Su caída de API congeló nuestro piso de surtido 90 minutos. ¿Qué tan expuestos estamos?' },
        { speaker: 'Incident Cmdr', en: 'We take full ownership of that disruption. Crucially, impact was confined strictly to us-west routing; zero payload data was compromised.', es: 'Asumimos plena responsabilidad de esa interrupción. De forma crucial, el impacto se limitó al ruteo us-west; cero datos fueron vulnerados.' },
        { speaker: 'Client VP', en: 'And going forward?', es: '¿Y hacia adelante?' },
        { speaker: 'Incident Cmdr', en: 'Failover patches are live now, and our formal post-mortem remediation brief lands on your desk by 09:00 tomorrow.', es: 'Los parches de respaldo ya operan y nuestro informe post-mortem formal llega a tu escritorio mañana a las 09:00.' }
      ],
      drills: [
        { q: 'Select the strongest executive sentence communicating proactive preventive shutdown:', opts: ['Out of an abundance of caution, we paused Shipments 4–7 pending lab clearance.', 'We panicked and shut lines off just in case nobody noticed.', 'Actually we compromised all boxes accidentally.', 'Policy blames operators for freezing production.'], ans: 0, exp: '"Out of an abundance of caution" proyecta liderazgo responsable y control preventivo.', socraticHint: 'Fórmula institucional estándar C1–C2.' },
        { q: 'When reassuring customers no passwords leaked, say:', opts: ['Zero user credentials were compromised.', 'No user credentials got compromised promises.', 'Nobody compromised with users.', 'Zero data made a compromise.'], ans: 0, exp: '"Credentials were compromised" = expuestas/vulneradas en seguridad.', socraticHint: 'Falso amigo "compromise".' }
      ],
      classroomActivity: {
        title: 'Simulacro de Llamada de Crisis en Vivo (Prensa / Cliente VIP)',
        grouping: 'Parejas (Incident Commander + Cliente Exigente)',
        materials: 'Tarjeta de Incidente (Falla lote médico / Outage pago) + Power Sheet',
        steps: ['El cliente hace 2 preguntas agresivas ("Who gets fired?", "Can you guarantee 100%?").', 'El Commander responde aplicando Acknowledge → Scope Confined → Timeline usando al menos 2 frases clave.']
      },
      powerSheet: {
        fillBlanks: ['1. Out of an ___ of caution, regional traffic was rerouted. (abundance / excessive)', '2. Telemetry confirms thermal spikes were ___ to Bay 3. (confined / contained on)', '3. Forensic review verified no API tokens were ___. (compromised / promise)', '4. Full ___ steps will be audited by Friday. (remediation / remediate)'],
        reorder: ['full / We / ownership / remediation / take / of / .'],
        writePrompt: 'Redacta un comunicado ejecutivo breve de 4 líneas ante un paro temporal de servicio usando el marco Acknowledge-Scope-Action:',
        answerKey: '1) abundance · 2) confined · 3) compromised · 4) remediation | Orden: We take full ownership of remediation.'
      }
    },
    {
      id: 'c1-c08', unitId: 'c1-u3', level: 'C1-C2', classNum: 8, coreType: 'CORE', eaqualsRef: 'C1–C2 Syntax / Rhetoric',
      modularity: 'grammar-inductive', hasSlides: true,
      title: 'Rhetorical Emphasis, Stylistic Inversion & Fronting',
      titleES: 'Énfasis Retórico, Inversión Estilística y Fronting Ejecutivo',
      grammarFocus: 'So + adj + be/aux + S + that · Such is/was + N + that · Not until... did · Only after... did · Adj + though it may be',
      canDo: 'Elevar discursos técnicos, conclusiones de auditoría y keynotes con ritmo retórico inolvidable de nivel C2.',
      industryContext: 'Discursos de lanzamiento, resúmenes ejecutivos ante consejo e informes de impacto estratégico.',
      warmupPrompt: 'Siente la fuerza retórica: *"The drift was so microscopic that legacy probes missed it"* vs *"So microscopic was the drift that legacy probes failed to register it"*.',
      grammarFormulaHtml: makeFormula('So + Adj', '+', 'Aux / Be + Sujeto', '+', 'that + Resultado', '<strong>So severe was</strong> latency <strong>that</strong> trades timed out. · <strong>Such is</strong> the scale <strong>that</strong> manual QA fails.'),
      explanationES: 'La inversión retórica antepone intensidad al inicio para capturar atención inmediata: <code>So + [Adj] + [was/did] + [Sujeto] + that...</code> o <code>Such + [be] + [Sustantivo] + that...</code>. También destacan <code>Not until [momento] did [S] [V_base]</code> y concesiones fronteadas: <code>Costly though the upgrade may seem, ROI exceeds 4x</code>.',
      goldenRuleES: 'Regla de ritmo en keynotes: jamás sobrecargues cada párrafo con inversión; reserva **1 por sección clave** para máximo impacto.',
      commonMistake: { bad: 'So urgent the problem was that we worked all Sunday.', good: 'So urgent was the problem that operations shifted to continuous coverage.', exp: 'Al anteponer "So + adj", debes invertir inmediatamente el verbo ("was the problem").' },
      falseCognate: { term: 'Albeit / Notwithstanding vs Though fronting', mistake: 'Usar "Although expensive it seems" en fronting', correct: 'Expensive though it may seem, ...', tip: '"[Adjective] + though + it may seem/be" es patrón elegante nativo C1–C2.' },
      vocab: [
        { en: 'Such is (the complexity)', es: 'Tal es (la complejidad que...)', ipa: '/sʌtʃ ɪz/', pinkStress: 'SUCH is', example: 'Such is the demand that Line 4 runs 24/7.', exampleES: 'Tal es la demanda que Línea 4 opera 24/7.' },
        { en: 'Not until', es: 'No fue sino hasta que...', ipa: '/nɑt ənˈtɪl/', pinkStress: 'not un-TIL', example: 'Not until Q4 did yields stabilize.', exampleES: 'No fue hasta T4 cuando el rendimiento se estabilizó.' },
        { en: 'Paramount', es: 'Supremo / De suma importancia', ipa: '/ˈpærəˌmaʊnt/', pinkStress: 'PAR-a-mount', example: 'Operator ergonomics remains paramount.', exampleES: 'La ergonomía del operador sigue siendo primordial.' },
        { en: 'Underscore', es: 'Subrayar / Poner de relieve', ipa: '/ˌʌndərˈskɔr/', pinkStress: 'un-der-SCORE', example: 'These metrics underscore urgent modernization.', exampleES: 'Estas métricas subrayan la urgencia de modernizar.' }
      ],
      dialogue: [
        { speaker: 'Keynote', en: 'So acute was the chip crunch in 2022 that legacy timelines collapsed overnight.', es: 'Tan aguda fue la escasez de chips en 2022 que los cronogramas tradicionales colapsaron de la noche a la mañana.' },
        { speaker: 'Moderator', en: 'And when did resilience actually turn around?', es: '¿Y cuándo dio realmente un giro la resiliencia?' },
        { speaker: 'Keynote', en: 'Not until plants standardized digital twins did cross-site recovery drop under six hours. Ambitious though it appeared then, it saved the decade.', es: 'No fue hasta que las plantas estandarizaron gemelos digitales cuando la recuperación cayó debajo de 6 horas. Ambicioso aunque parecía entonces, salvó la década.' }
      ],
      drills: [
        { q: 'So intricate ___ the calibration matrix that automated optical tracking became indispensable.', opts: ['was', 'it was', 'were', 'being'], ans: 0, exp: '"So + adj + [singular was] + S" (the calibration matrix).', socraticHint: 'Inversión obligatoria tras "So + adjetivo".' },
        { q: 'Not until independent stress telemetry arrived ___ understand the root frequency.', opts: ['did engineers', 'engineers did', 'engineers had', 'were engineers'], ans: 0, exp: '"Not until [cláusula/frase]" exige inversión auxiliar en la cláusula principal ("did engineers understand").', socraticHint: 'El auxiliar invertido va en la segunda parte.' },
        { q: '___ it may appear initially, proactive tooling pays back within two quarters.', opts: ['Costly though', 'Though costly', 'Albeit costly was', 'How costly'], ans: 0, exp: '"[Adjective] + though + S + V" = concesión retórica formal.', socraticHint: 'Patrón: Adjetivo primero + though.' }
      ],
      classroomActivity: {
        title: 'Transformación de Opening Speech (Plana → C2 Keynote)',
        grouping: 'Individual → Lectura expresiva en equipos',
        materials: '3 enunciados neutros en Power Sheet C1-C08',
        steps: ['Reescriben cada enunciado usando `So + Adj + V + S`, `Such is...` y `Not until... did...`.', 'Leen en voz alta aplicando pausa dramática y énfasis entonativo tras la inversión.']
      },
      powerSheet: {
        fillBlanks: ['1. So ___ was the battery breakthrough that range doubled overnight. (rapid / rapidly)', '2. Such ___ our confidence in the design that we extended warranty. (is / are)', '3. Not until logs were decrypted ___ notice the drift. (did QA / QA did)', '4. Complex ___ migration seems, ROI justifies execution. (though / although)'],
        reorder: ['precision / Such / tolerances / is / that / negligible / drift / becomes / .'],
        writePrompt: 'Escribe el arranque de un keynote de 2 oraciones usando "So [Adj]..." y "Not until... did...":',
        answerKey: '1) rapid · 2) is · 3) did QA · 4) though | Orden: Such is precision that tolerances drift becomes negligible. (o Such is tolerances precision...)'
      }
    },
    {
      id: 'c1-c09', unitId: 'c1-u3', level: 'C1-C2', classNum: 9, coreType: 'CORE', eaqualsRef: 'C1–C2 Debate & Pragmatics',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Cross-Examination, Counter-Arguments & Evidence-Based Debate',
      titleES: 'Interrogatorio Crítico, Contraargumentación y Debate con Evidencia',
      grammarFocus: 'Dialectical concession: Granted..., yet... · Playing devil\'s advocate · Distinguishing correlation vs causation · Refuting fallacies',
      canDo: 'Sostener debates estratégicos de alto nivel validando puntos válidos de la contraparte antes de refutar con datos.',
      industryContext: 'Comités de arquitectura (RFC reviews), debates regulatorios, revisión por pares y defensa presupuestal.',
      warmupPrompt: '¿Cómo desacreditas una propuesta riesgosa sin sonar hostil? ¡Valida primero (`Granted, on-prem cuts OPEX; yet that begs the question of redundancy`)!',
      grammarFormulaHtml: makeFormula('Concesión Parcial (Granted / Admittedly)', '+', 'Pivote Crítico (yet / that fails to account for)', '+', 'Contraevidencia Medible', '<strong>Admittedly</strong>, CAPEX looks modest; <strong>yet that presupposes</strong> zero downtime penalties.'),
      explanationES: 'Los hablantes C1–C2 nunca responden "You are wrong"; desarman objeciones mediante <strong>validación táctica + reencuadre</strong>: <code>Granted... yet...</code>, <code>To play devil\'s advocate...</code>, <code>That begs the question of...</code>, <code>Those figures fail to account for...</code>.',
      goldenRuleES: 'Fórmula profesional RFC: **Concede el mejor punto del rival antes de golpear el punto débil** — demuestra objetividad intelectual absoluta.',
      commonMistake: { bad: 'No, your idea is wrong and stupid because cloud costs lots of money.', good: 'To play devil\'s advocate, cloud latency looks attractive on paper, yet that projection assumes static traffic peaks.', exp: 'Reemplaza adjetivos personales por análisis de supuestos (`assumes`, `fails to account for`).' },
      falseCognate: { term: 'Begs the question / Presuppose', mistake: 'Creer que "begs the question" significa literalmente "suplica la pregunta"', correct: 'Da por sentado algo sin probarlo / plantea inevitablemente la interrogante', tip: 'Excelente giro C1 para señalar brechas lógicas con elegancia.' },
      vocab: [
        { en: 'Granted / Admittedly', es: 'Concedido / Ciertamente (concesión inicial)', ipa: '/ˈɡræntɪd/', pinkStress: 'GRANT-ed', example: 'Granted, tooling is costly; yet scrap drops 40%.', exampleES: 'Concedido, el herramental cuesta; aun así la merma cae 40%.' },
        { en: 'Devil\'s advocate', es: 'Abogado del diablo (prueba de resistencia lógica)', ipa: '/ˈdɛvəlz ˈædvəkət/', pinkStress: 'DEV-il\'s AD-vo-cate', example: 'Let me play devil\'s advocate on power draw.', exampleES: 'Permíteme ser abogado del diablo sobre consumo eléctrico.' },
        { en: 'Fail to account for', es: 'No tomar en cuenta / Omitir en cálculo', ipa: '/feɪl tu əˈkaʊnt fɔr/', pinkStress: 'fail to ac-COUNT for', example: 'These benchmarks fail to account for thermal throttling.', exampleES: 'Estas pruebas omiten el estrangulamiento térmico.' },
        { en: 'Presuppose / Premised on', es: 'Presuponer / Basado en la premisa de', ipa: '/ˌprisəˈpoʊz/', pinkStress: 'pre-sup-POSE', example: 'Your ROI is premised on uninterrupted supply.', exampleES: 'Tu ROI parte de la premisa de abasto ininterrumpido.' }
      ],
      dialogue: [
        { speaker: 'Proponent', en: 'Migrating entirely off mainframe cuts licensing $400k yearly.', es: 'Migrar totalmente fuera del mainframe ahorra $400k anuales en licencias.' },
        { speaker: 'Reviewer', en: 'Admittedly, annual licensing looks compelling on paper. Yet playing devil\'s advocate, that projection fails to account for compliance re-audit costs.', es: 'Ciertamente, la licencia anual luce atractiva en papel. Pero como abogado del diablo, esa proyección omite costos de re-auditoría de cumplimiento.' },
        { speaker: 'Proponent', en: 'Fair challenge—let\'s benchmark hybrid isolation vs full lift-and-shift.', es: 'Reto justo: comparemos aislamiento híbrido contra migración total.' }
      ],
      drills: [
        { q: 'Select the cleanest C1 counter-argument opener:', opts: ['Granted, edge inference reduces bandwidth; yet that fails to account for cooling retrofit.', 'You forgot cooling so your whole math is wrong.', 'Admittedly you are bad at forecasting.', 'Playing advocate devil makes me say no.'], ans: 0, exp: 'Valida brevemente ("Granted...") y señala la omisión objetiva ("fails to account for...").', socraticHint: 'Diplomacia basada en supuestos.' },
        { q: '"Your throughput guarantee is premised on 100% grid stability" implies:', opts: ['The guarantee assumes steady power as a baseline condition.', 'Power stability costs zero money.', 'The grid already failed twice.', 'You must cancel the contract immediately.'], ans: 0, exp: '"Premised on" = construido sobre ese supuesto base.', socraticHint: 'Evaluación de premisas.' }
      ],
      classroomActivity: {
        title: 'RFC Architecture Tribunal (Debate en Tríos con Roles)',
        grouping: 'Tríos (Proponente, Devil\'s Advocate, Juez C1)',
        materials: '2 temas técnicos debatibles (Edge AI vs Cloud / Automatizar Línea 2 vs Subcontratar)',
        steps: ['Ronda de 6 min: el Proponente defiende en 90s; el Devil\'s Advocate ataca usando mínimo 3 marcadores (`Granted... yet`, `fails to account for`, `premised on`).', 'El Juez otorga puntos por rigor técnico + calma diplomática.']
      },
      powerSheet: {
        fillBlanks: ['1. ___, single-vendor pricing is tempting; yet dependency risk spikes. (Granted / Agreeing)', '2. To play devil\'s ___, what happens under a 72h power blackout? (advocate / lawyer)', '3. Those unit economics fail to ___ for customs brokerage delays. (account / consider)', '4. Full payback is ___ on operating at 92% utilization. (premised / promise)'],
        reorder: ['account / fails / forecast / inflation / That / to / for / .'],
        writePrompt: 'Redacta un contraargumento C1 respetuoso frente a una idea arriesgada usando "Granted..., yet..." y "fails to account for":',
        answerKey: '1) Granted · 2) advocate · 3) account · 4) premised | Orden: That forecast fails to account for inflation.'
      }
    },
    {
      id: 'c1-c10', unitId: 'c1-u4', level: 'C1-C2', classNum: 10, coreType: 'CORE', eaqualsRef: 'C1–C2 Executive Discourse',
      modularity: 'functional-spatial', hasSlides: true,
      title: 'Persuasive Boardroom Proposals & Investor Pitching',
      titleES: 'Propuestas Persuasivas de Consejo y Pitching ante Inversionistas',
      grammarFocus: 'BLUF (Bottom Line Up Front) · Problem → Bottleneck → Architecture → Payback · Quantified risk-adjusted claims',
      canDo: 'Capturar la atención de un CFO/inversionista en los primeros 30 segundos defendiendo inversión técnica y ROI.',
      industryContext: 'Aprobaciones CAPEX, rondas seed/Series A de startups hardware/software y defensa presupuestal.',
      warmupPrompt: 'Regla BLUF en juntas ejecutivas estadounidenses: nunca cuentes la historia desde 1995 antes de decir cuánto cuesta y cuánto devuelve. ¡Empieza por la conclusión!',
      grammarFormulaHtml: makeFormula('BLUF Hook (Recomendación + Valor)', '+', 'Evidencia Piloto Validada', '+', 'Ask Concreto + Mitigación', 'We recommend a <strong>\$180k</strong> cell retrofit delivering <strong>11-month payback</strong> and zero headcount impact.'),
      explanationES: 'Los ejecutivos estadounidenses operan bajo <strong>BLUF (Bottom Line Up Front)</strong>: 1) Qué pides y cuál es el retorno; 2) Qué cuello de botella probado resuelve; 3) Evidencia piloto; 4) Plan de riesgo acotado. Prefiere verbos de impacto cuantificable: <em>unlock, capture, de-risk, amortize, scale</em>.',
      goldenRuleES: 'Cada número en tu pitch debe viajar en par con su horizonte o contrapeso: <em>"$180k CAPEX yielding $240k annualized savings — 9-month payback"</em>.',
      commonMistake: { bad: 'First let me explain the physics of heat from slide 1 to 18 and maybe at minute 19 I tell you price.', good: 'We propose investing $180k to cut thermal scrap 38%, reaching breakeven in Q3. Here is how pilot telemetry validates it.', exp: 'Coloca propuesta, métrica y breakeven al frente.' },
      falseCognate: { term: 'Amortize / Breakeven / Scalability', mistake: 'Confundir "benefit" (prestación/utilidad indirecta) con "profit/net savings"', correct: 'ROI / net cost avoidance / payback window', tip: 'En finanzas corporativas usa "payback period" o "net cost savings", no solo "benefits".' },
      vocab: [
        { en: 'De-risk', es: 'Reducir / Blindar contra el riesgo', ipa: '/diˈrɪsk/', pinkStress: 'de-RISK', example: 'Staged rollouts de-risk multi-million migrations.', exampleES: 'Los despliegues por etapas reducen el riesgo de migraciones.' },
        { en: 'Breakeven / Payback', es: 'Punto de equilibrio / Retorno de inversión', ipa: '/ˈbreɪkˌivən/', pinkStress: 'BREAK-ev-en', example: 'Automation achieves breakeven inside 10 months.', exampleES: 'La automatización logra punto de equilibrio en 10 meses.' },
        { en: 'Bottleneck', es: 'Cuello de botella operativo', ipa: '/ˈbɑtəlˌnɛk/', pinkStress: 'BOT-tle-neck', example: 'Vision inspection eliminates the packaging bottleneck.', exampleES: 'La inspección por visión elimina el cuello de botella.' },
        { en: 'Traction', es: 'Tracción / Adopción comprobada', ipa: '/ˈtrækʃən/', pinkStress: 'TRAC-tion', example: 'Early B2B traction tripled monthly recurring value.', exampleES: 'La tracción inicial B2B triplicó el valor recurrente.' }
      ],
      dialogue: [
        { speaker: 'Founder/PM', en: 'Bottom line up front: upgrading vision optics requires $140k CAPEX and achieves full payback inside eight months.', es: 'Conclusión al frente: actualizar óptica de visión requiere $140k CAPEX y se amortiza en ocho meses.' },
        { speaker: 'CFO', en: 'What de-risks deployment if calibration drifts on curved glass?', es: '¿Qué reduce el riesgo de despliegue si la calibración deriva en vidrio curvo?' },
        { speaker: 'Founder/PM', en: 'Four weeks of pilot data on Line 2 already validated 99.4% recall under curved glare—zero unscheduled stops.', es: 'Cuatro semanas de datos piloto en Línea 2 ya validaron 99.4% de precisión bajo reflejo curvo, cero paros.' }
      ],
      drills: [
        { q: 'Which opening follows the US executive BLUF principle best?', opts: ['We recommend a $95k sensor upgrade projected to save $220k annually with a 5-month payback.', 'Before mentioning cost, let me review physics history for 10 slides.', 'Hopefully this project works out great if approved someday.', 'Actually, the budget is big because sensors are expensive.'], ans: 0, exp: 'Inversión + retorno + horizonte de recuperación en la primera oración.', socraticHint: 'Bottom Line Up Front.' },
        { q: 'A phased pilot rollout helps ___ enterprise deployment before global scaling.', opts: ['de-risk', 'exacerbate', 'compromise', 'halt permanently'], ans: 0, exp: '"De-risk" = eliminar/reducir incertidumbre antes de escalar capital.', socraticHint: 'Verbo ejecutivo de gestión de riesgo.' }
      ],
      classroomActivity: {
        title: 'Elevator CAPEX Pitch de 90 Segundos (BLUF vs CFO)',
        grouping: 'Parejas (Pitch Lead + CFO Escéptico)',
        materials: 'Canvas BLUF en Power Sheet C1-C10',
        steps: ['El Pitch Lead entrega su apertura BLUF en máx 30s con costo, ahorro y payback.', 'El CFO lanza 1 objeción financiera y el Lead responde defendiendo con datos piloto y de-risking.']
      },
      powerSheet: {
        fillBlanks: ['1. Bottom ___ up front: hybrid caching slashes cloud spend 34%. (line / point)', '2. Pilot runs ___ large capital commitments before board approval. (de-risk / aggravate)', '3. Capital ___ happens by Month 7 at current run rate. (breakeven / breakdown)', '4. Eliminating manual handoffs unlocked the packaging ___. (bottleneck / throttle)'],
        reorder: ['inside / achieves / upgrade / payback / nine / This / months / .'],
        writePrompt: 'Redacta tu BLUF Pitch de 3 líneas para un proyecto STEM real (incluye CAPEX, impacto y payback):',
        answerKey: '1) line · 2) de-risk · 3) breakeven · 4) bottleneck | Orden: This upgrade achieves payback inside nine months.'
      }
    },
    {
      id: 'c1-c11', unitId: 'c1-u4', level: 'C1-C2', classNum: 11, coreType: 'CORE', eaqualsRef: 'C2 Pragmatics & Culture',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Cultural Nuance, Understatement, Irony & Pragmatic Diplomacy',
      titleES: 'Matices Culturales, Subestimación Elegante y Diplomacia Pragmática C2',
      grammarFocus: 'Reading between the lines (US positive cushioning vs UK understatement) · Softened bluntness · Face-saving disagreement',
      canDo: 'Descifrar qué quiere decir realmente un cliente angloparlante cuando dice "Interesting approach" o "Slightly ambitious", y responder con tacto maestro.',
      industryContext: 'Negociación intercultural US–UK–LATAM, feedback de desempeño delicado y relaciones con clientes clave.',
      warmupPrompt: 'Cuando un director británico dice *"That\'s a brave timeline"* o un VP californiano dice *"I love the energy, let\'s park that for V2"*, ¡NO significan "bravo" ni "aprobado"! Descifra el subtexto.',
      grammarFormulaHtml: makeFormula('Superficie Cortés', '≠', 'Significado Pragmático Real', '→', 'Respuesta Estratégica Face-Saving', '"With the greatest respect" = <strong>Fuerte desacuerdo</strong> · "Slightly behind" = <strong>Alerta roja de retraso</strong>.'),
      explanationES: 'Al nivel <strong>C2</strong> dominar la gramática es solo la mitad; la clave ejecutiva es decodificar el <strong>understatement</strong> (minimización irónica/cortés) y el <strong>face-saving</strong>: cuando un ejecutivo dice <em>"We may want to revisit..."</em> o <em>"Correct me if I\'m misreading..."</em>, está señalando un problema serio con elegancia.',
      goldenRuleES: 'Para corregir a un superior sin herir egos ("save face"): <em>"Building on your point—one nuance worth surfacing is..."</em> o <em>"Could I offer an alternative lens on that metric?"</em>.',
      commonMistake: { bad: 'No, boss, your numbers are completely wrong; we will lose money!', good: 'Could I offer a complementary lens on those utilization assumptions? Adjusting for setup downtime shifts net ROI.', exp: 'Reformula el error como "alternativa analítica" para lograr escucha activa sin defensividad.' },
      falseCognate: { term: 'Brave / Interesting / Parked', mistake: 'Tomar "That is quite a brave estimate" como elogio', correct: 'Advertencia diplomática de que es irreal o muy riesgoso', tip: 'En UK/executive English, "brave/bold" sobre un cronograma suele significar "irreal".' },
      vocab: [
        { en: 'Understatement', es: 'Subestimación atenuada / Quedarse corto adrede', ipa: '/ˌʌndərˈsteɪtmənt/', pinkStress: 'un-der-STATE-ment', example: '"Slightly bumpy" was an understatement—servers hung twice.', exampleES: '"Algo accidentado" fue quedarse corto: cayeron dos veces.' },
        { en: 'Park an idea', es: 'Aparcar/posponer indefinidamente una idea con tacto', ipa: '/pɑrk æn aɪˈdiə/', pinkStress: 'PARK an i-DEA', example: 'Let\'s park custom UI themes until telemetry stabilizes.', exampleES: 'Aplazemos temas visuales hasta estabilizar telemetría.' },
        { en: 'Face-saving', es: 'Que cuida el prestigio/dignidad del otro', ipa: '/ˈfeɪsˌseɪvɪŋ/', pinkStress: 'FACE-sav-ing', example: 'Offer a face-saving path during tough renegotiations.', exampleES: 'Ofrece una salida digna en renegociaciones difíciles.' },
        { en: 'An alternative lens', es: 'Otra perspectiva / Un ángulo complementario', ipa: '/æn ɔlˈtɜrnətɪv lɛnz/', pinkStress: 'al-TER-na-tive LENS', example: 'Allow me to offer an alternative lens on churn.', exampleES: 'Permíteme aportar otro ángulo sobre la deserción.' }
      ],
      dialogue: [
        { speaker: 'UK Partner', en: 'It\'s certainly a rather ambitious rollout date, isn\'t it?', es: 'Ciertamente es una fecha de lanzamiento bastante ambiciosa, ¿verdad? (Subtexto: imposible)' },
        { speaker: 'Engineer', en: 'I hear you loud and clear—that deadline is indeed tight. If we phase Region 2 by three weeks, would that de-risk QA?', es: 'Te escucho con total claridad: el plazo sí es muy apretado. Si escalamos Región 2 tres semanas, ¿desriesgamos QA?' },
        { speaker: 'UK Partner', en: 'Now that sounds remarkably pragmatic. Thank you for picking up on that.', es: 'Eso ya suena sumamente pragmático. Gracias por captarlo al vuelo.' }
      ],
      drills: [
        { q: 'When a British client remarks, "Shipping three days late was a trifle unfortunate," pragmatically they probably feel:', opts: ['Noticeably frustrated, though phrasing it with polite understatement', 'Completely overjoyed and grateful', 'Totally unaware of any delay', 'Excited to cancel holidays together'], ans: 0, exp: '"A trifle unfortunate" es understatement clásico británico ante un fallo serio.', socraticHint: 'Lee detrás de la suavidad verbal.' },
        { q: 'Choose the highest-EQ face-saving disagreement when your VP cites outdated telemetry:', opts: ['Building on that trend, may I share yesterday\'s updated telemetry that shifts the baseline slightly?', 'VP, you read an old spreadsheet and embarrassed yourself.', 'Actually your data is bogus.', 'Let\'s park your slide forever because it\'s wrong.'], ans: 0, exp: 'Valida ("Building on...") + ofrece dato nuevo como actualización neutral ("updated telemetry").', socraticHint: 'Desacuerdo sin confrontación directa.' }
      ],
      classroomActivity: {
        title: 'Decodificador de Subtexto & Diplomacia Intercultural',
        grouping: 'Parejas',
        materials: '5 frases con doble lectura corporativa US/UK en Power Sheet',
        steps: ['Traducen el subtexto real de cada frase ("Quite a brave projection", "We\'ll circle back next quarter").', 'Practican responder con "face-saving reframing" en 20 segundos.']
      },
      powerSheet: {
        fillBlanks: ['1. Saying the crash was "mildly inconvenient" is a massive ___. (understatement / overclaim)', '2. Let\'s ___ the redesign discussion until after audit. (park / drive)', '3. Could I offer an alternative ___ on those staffing ratios? (lens / glass)', '4. Building ___ your thesis, sensor calibration alters variance. (on / against)'],
        reorder: ['perspective / Could / offer / a / I / complementary / ?'],
        writePrompt: 'Reescribe diplomáticamente este mensaje brusco en tono C2 face-saving: "Your timeline is impossible and will fail."',
        answerKey: '1) understatement · 2) park · 3) lens · 4) on | Orden: Could I offer a complementary perspective? | Ej: "Aggressive though the timeline is, phasing Q3 milestones could protect delivery quality."'
      }
    },
    {
      id: 'c1-c12', unitId: 'c1-u4', level: 'C1-C2', classNum: 12, coreType: 'CORE', eaqualsRef: 'C2 Capstone Mastery',
      modularity: 'communicative-crucible', hasSlides: false,
      title: 'Executive Keynote, Research Defense & C1–C2 Mastery Crucible',
      titleES: 'Keynote Ejecutivo, Defensa de Investigación y Crisol Maestro C1–C2',
      grammarFocus: 'Full C1–C2 synthesis: Nominalization + Participial clauses + Subjunctive + Inversion + Debate + Pragmatic Diplomacy',
      canDo: 'Defender tesis técnicas, liderar alianzas binacionales complejas y comunicarse con autoridad, matiz y soltura de hablante experto C2.',
      industryContext: 'Defensa de tesis/publicación, keynote internacional, cierre ejecutivo binacional y examen maestro C1–C2.',
      warmupPrompt: 'Tu prueba final de nivel experto: en 90 segundos presenta un caso real integrando **1 Nominalización**, **1 Inversión retórica**, **1 Concesión dialéctica**, y responde a un cuestionamiento diplomático sin pausas vacías.',
      grammarFormulaHtml: makeFormula('Síntesis C1–C2: Nominalization + Reduced Clause', '+', 'Inversion + Subjunctive + Discourse Markers', '+', 'Diplomacy & BLUF ROI', '<strong>Tested at scale,</strong> telemetry proved vital; <strong>so dramatic were gains that</strong> policy mandates adoption.'),
      explanationES: 'Al alcanzar el dominio <strong>C1–C2</strong> tu inglés deja de ser traducción y se convierte en herramienta de liderazgo estratégico: precisas el registro, anticipas subtextos culturales, estructuras prosa densa legible y defiendes evidencia técnica bajo escrutinio en tiempo real.',
      goldenRuleES: 'Fórmula final de oratoria experta: <em>Lead with the insight (BLUF) → Anchor in empirical proof → Acknowledge trade-offs openly → Close with decisive ownership</em>.',
      commonMistake: { bad: 'Discurso largo sin estructura que salta entre registro coloquial e hiper-técnico incoherente.', good: 'Registro calibrado: BLUF claro, frases nominales en datos, marcadores de contraste precisos y cierre humano memorable.', exp: 'Coherencia de registro y economía de palabras definen el C2.' },
      falseCognate: { term: 'Mastery vs Control / Definitive', mistake: 'Decir "I dominated English"', correct: 'I achieved operational fluency / professional proficiency in English', tip: 'En inglés jamás digas "I dominate English/Python"; usa "I am proficient in" o "I command".' },
      vocab: [
        { en: 'Command (a language / domain)', es: 'Dominar con maestría un idioma o disciplina', ipa: '/kəˈmænd/', pinkStress: 'com-MAND', example: 'She commands both engineering depth and boardroom clarity.', exampleES: 'Ella domina tanto profundidad técnica como claridad ejecutiva.' },
        { en: 'Trade-off', es: 'Compromiso / Balance entre dos variables contrapuestas', ipa: '/ˈtreɪdˌɔf/', pinkStress: 'TRADE-off', example: 'Every architecture balances throughput against latency trade-offs.', exampleES: 'Toda arquitectura equilibra compromisos entre flujo y latencia.' },
        { en: 'Cornerstone', es: 'Piedra angular / Pilar fundamental', ipa: '/ˈkɔrnərˌstoʊn/', pinkStress: 'COR-ner-stone', example: 'Bilingual documentation is a cornerstone of cross-border QA.', exampleES: 'La documentación bilingüe es pilar del QA transfronterizo.' },
        { en: 'Resilience', es: 'Resiliencia operativa / Capacidad de recuperación', ipa: '/rɪˈzɪljəns/', pinkStress: 're-SIL-ience', example: 'Automated failover anchored multi-plant resilience.', exampleES: 'El respaldo automatizado ancló la resiliencia multiplanta.' }
      ],
      dialogue: [
        { speaker: 'Board Chair', en: 'Summarizing a multi-year transformation is rarely simple. What stands as the single cornerstone of success?', es: 'Resumir una transformación multianual rara vez es simple. ¿Cuál destaca como la piedra angular del éxito?' },
        { speaker: 'Director', en: 'Bottom line up front: cross-border bilingual telemetry cut warranty claims 41% inside eighteen months.', es: 'Conclusión al frente: la telemetría bilingüe transfronteriza redujo reclamos de garantía 41% en 18 meses.' },
        { speaker: 'Director', en: 'Granted, initial rollout friction seemed daunting; yet standardized protocols ensured compliance remained paramount. Never again will site handoffs depend on guesswork.', es: 'Concedido, la fricción inicial parecía intimidante; aun así protocolos estandarizados mantuvieron primordial el cumplimiento. Jamás volverán a depender de conjeturas.' },
        { speaker: 'Board Chair', en: 'Remarkably argued—you have full endorsement to scale globally.', es: 'Extraordinariamente argumentado: tienes respaldo total para escalar globalmente.' }
      ],
      drills: [
        { q: 'Which phrasing idiomatically states you mastered Python and Technical English on your CV?', opts: ['I command full professional proficiency in Python and Technical English.', 'I dominate Python and English strongly.', 'I master to control English very much.', 'I am the boss of Python language.'], ans: 0, exp: '"Proficient in" / "Command" evita el calco incorrecto de "dominar" ("dominate").', socraticHint: 'Nunca uses "dominate a language".' },
        { q: 'Select the C2 capstone sentence blending inversion, participle and nominalization cleanly:', opts: ['Deployed across three continents, our architecture performed flawlessly; never did latency breach SLA limits.', 'Deploying across three continents, operations worked well and we never breached SLA.', 'Deployed across continents, we performed fast and never latency broke.', 'It is vital that architecture deploys fastly never breaching.'], ans: 0, exp: 'Participio alineado ("our architecture") + nominalización limpia + inversión retórica ("never did latency breach").', socraticHint: 'Alinea participio + inversión auxiliar correcta.' }
      ],
      classroomActivity: {
        title: 'Keynote & Cross-Examination Final (Crisol C1–C2)',
        grouping: 'Panel de 3 o plenaria rápida (2 min presentación + 1 min Q&A)',
        materials: 'Rúbrica C2 de 5 ejes (Nominalización, Precisión Léxica, Sintaxis Invertida, Pragmática/Diplomacia, BLUF) + Power Sheet Maestro',
        steps: ['Cada participante defiende su proyecto o caso STEM ante el panel usando BLUF y al menos 4 rasgos C1–C2.', 'El panel lanza 1 pregunta hostil que debe desactivarse con `Granted..., yet...` o `alternative lens`.']
      },
      powerSheet: {
        fillBlanks: ['1. She ___ fluency in cross-border negotiations. (commands / dominates)', '2. Balancing throughput vs cost requires clear ___ analysis. (trade-off / compromise-trade)', '3. Never ___ system safeguards be deactivated mid-cycle. (shall / did to)', '4. Transparent governance remains a ___ of enterprise trust. (cornerstone / stonecorner)'],
        reorder: ['resilience / remains / Redundancy / of / cornerstone / a / .'],
        writePrompt: 'Redacta tu manifiesto ejecutivo final C1–C2 de 4–5 líneas aplicando Nominalización, 1 Inversión o Participio, BLUF y Diplomacia:',
        answerKey: '1) commands · 2) trade-off · 3) shall · 4) cornerstone | Orden: Redundancy remains a cornerstone of resilience.'
      }
    }
  ];

  const CLASSES = RAW_CLASSES.map(hydrateClass);

  const CLASSES_BY_ID = {};
  CLASSES.forEach((cls) => {
    CLASSES_BY_ID[cls.id] = cls;
    CLASSES_BY_ID[cls.id.toUpperCase()] = cls;
  });

  // ---------------------------------------------------------------------------
  // Curated CEFR + Tech/Engineering Supplemental Bank (Zero-Repetition Pool)
  // Covers A1, A2, B1, B2, C1-C2 across every cluster & ensures 8+ activities
  // per Duolingo section while aligning strictly with CEFR descriptors & STEM.
  // ---------------------------------------------------------------------------
  const CEFR_TECH_SUPPLEMENT_BANK = {
    'a1-u1': {
      vocab: [
        { en: 'Access Card', es: 'Tarjeta de acceso RFID', ipa: '/ˈækˌsɛs kɑrd/', pinkStress: 'AC-cess card', example: 'Tap your access card at the lab gate.', exampleES: 'Acerca tu tarjeta de acceso en la puerta del laboratorio.' },
        { en: 'Helpdesk Extension', es: 'Extensión de soporte TI', ipa: '/ˈhɛlpˌdɛsk ɪkˈstɛnʃən/', pinkStress: 'HELP-desk ex-TEN-sion', example: 'The IT helpdesk extension is four-five-one-oh.', exampleES: 'La extensión de soporte TI es cuatro-cinco-uno-cero.' },
        { en: 'Cleanroom Locker', es: 'Casillero de cuarto limpio', ipa: '/ˈklinˌrum ˈlɑkər/', pinkStress: 'CLEAN-room LOC-ker', example: 'My lab coat is in locker twelve.', exampleES: 'Mi bata de laboratorio está en el casillero doce.' },
        { en: 'Floor Plan', es: 'Plano de planta', ipa: '/flɔr plæn/', pinkStress: 'FLOOR plan', example: 'This floor plan shows Building B.', exampleES: 'Este plano de planta muestra el Edificio B.' }
      ],
      drills: [
        { q: 'What ___ your employee ID number?', opts: ['is', 'are', 'am', 'be'], ans: 0, exp: '"ID number" es singular (it), por lo que requiere "is".', socraticHint: 'Identifica si "employee ID number" es singular o plural.' },
        { q: 'We ___ software engineers at the Mexicali tech hub.', opts: ["'re", "'s", "'m", 'be'], ans: 0, exp: '"We" siempre usa "are" ("We\'re").', socraticHint: 'Conjuga "to be" para el pronombre plural "We".' },
        { q: 'Excuse me, is ___ badge active today?', opts: ['your', 'you', 'they', 'we'], ans: 0, exp: 'Antes del sustantivo "badge" usamos el adjetivo posesivo "your".', socraticHint: 'Necesitas el adjetivo posesivo para "tu credencial".' },
        { q: 'The robotics server room is ___ Floor 3, Room 304.', opts: ['on', 'at', 'under', 'from'], ans: 0, exp: 'Para pisos específicos dentro de un edificio se utiliza la preposición "on".', socraticHint: 'En inglés los pisos usan la preposición "on" (on Floor 3).' }
      ],
      dialogue: [
        { speaker: 'Security', en: 'Good afternoon. What is your badge code, please?', es: 'Buenas tardes. ¿Cuál es su código de credencial, por favor?' },
        { speaker: 'Engineer', en: "It's B-four-seven-zero. I am in Robotics Lab two.", es: 'Es B-cuatro-siete-cero. Estoy en el Laboratorio de Robótica dos.' }
      ],
      readingQuestions: [
        { q: 'Read: "All visitors sign in at Gate A before 8:30 AM and wear a green pass." Where do visitors sign in?', opts: ['At Gate A', 'In Lab B', 'On the third floor', 'After 5:00 PM'], ans: 0, exp: 'El aviso indica literalmente "sign in at Gate A".', socraticHint: 'Ubica la puerta mencionada en el aviso.' }
      ]
    },
    'a1-u2': {
      vocab: [
        { en: 'Server Rack', es: 'Rack de servidores', ipa: '/ˈsɜrvər ræk/', pinkStress: 'SER-ver rack', example: 'The main server rack is across from the CAD lab.', exampleES: 'El rack principal está frente al laboratorio CAD.' },
        { en: 'Daily Standup', es: 'Junta diaria de arranque', ipa: '/ˈdeɪli ˈstændʌp/', pinkStress: 'DAI-ly STAND-up', example: 'Our engineering standup starts at eight thirty.', exampleES: 'Nuestra junta diaria de ingeniería empieza a las ocho y media.' },
        { en: 'Debug Console', es: 'Consola de depuración', ipa: '/ˈdibʌɡ ˈkɑnsoʊl/', pinkStress: 'DE-bug CON-sole', example: 'Marco checks the debug console every morning.', exampleES: 'Marco revisa la consola de depuración cada mañana.' },
        { en: 'Turn Left', es: 'Gira a la izquierda', ipa: '/tɜrn lɛft/', pinkStress: 'turn LEFT', example: 'Turn left after the CNC zone.', exampleES: 'Gira a la izquierda después de la zona CNC.' }
      ],
      drills: [
        { q: 'The QA tester ___ every sensor log before lunch.', opts: ['checks', 'check', 'checking', 'are check'], ans: 0, exp: 'En Presente Simple, 3ª persona singular (The QA tester = he/she) agrega -s: "checks".', socraticHint: 'Recuerda la regla -s en Present Simple para he/she/it.' },
        { q: '___ the firmware team start their shift at 7:00 AM?', opts: ['Does', 'Do', 'Is', 'Are'], ans: 0, exp: '"The firmware team" (it/singular) forma preguntas en Presente Simple con "Does".', socraticHint: 'Usa el auxiliar Does para sujetos singulares.' },
        { q: 'Go straight down the hall and turn right ___ the printer hub.', opts: ['at', 'between', 'from', 'to'], ans: 0, exp: 'Para indicar un punto exacto de referencia en direcciones usamos "at".', socraticHint: 'Indica el punto exacto donde dar vuelta.' },
        { q: 'We always run unit tests ___ Monday mornings.', opts: ['on', 'in', 'at', 'by'], ans: 0, exp: 'Los días de la semana y combinaciones como "Monday mornings" llevan "on".', socraticHint: 'Recuerda: on + días, at + horas, in + meses/años.' }
      ],
      dialogue: [
        { speaker: 'Developer', en: 'Excuse me, how do I get to the IoT Testbench?', es: 'Disculpa, ¿cómo llego al Banco de Pruebas IoT?' },
        { speaker: 'Lead', en: 'Walk straight past the CNC bay and turn left next to Lab 4.', es: 'Camina derecho pasando la bahía CNC y gira a la izquierda junto al Lab 4.' }
      ],
      readingQuestions: [
        { q: 'Read: "Shift A runs a automated backup at 6:00 PM on Fridays." When does the backup happen?', opts: ['Every Friday at 6:00 PM', 'Monday at 8:00 AM', 'Only on Sundays', 'Twice per hour'], ans: 0, exp: 'El texto señala horario fijo: "at 6:00 PM on Fridays".', socraticHint: 'Verifica día y hora exacta.' }
      ]
    },
    'a1-u3': {
      vocab: [
        { en: 'Multimeter', es: 'Multímetro digital', ipa: '/ˌmʌltiˈmitər/', pinkStress: 'MUL-ti-me-ter', example: 'There is a calibrated multimeter in drawer two.', exampleES: 'Hay un multímetro calibrado en el cajón dos.' },
        { en: 'Circuit Board', es: 'Tarjeta electrónica (PCB)', ipa: '/ˈsɜrkɪt bɔrd/', pinkStress: 'CIR-cuit board', example: 'These circuit boards are ready for optical check.', exampleES: 'Estas tarjetas electrónicas están listas para revisión óptica.' },
        { en: 'ESD Wrist Strap', es: 'Pulsera antiestática', ipa: '/ˌiːˌɛsˈdi rɪst stræp/', pinkStress: 'wrist STRAP', example: 'Put on your ESD wrist strap before handling chips.', exampleES: 'Ponte tu pulsera antiestática antes de tocar chips.' },
        { en: 'USB Drive', es: 'Memoria USB', ipa: '/ˌjuːˌɛsˈbi draɪv/', pinkStress: 'USB drive', example: 'Whose orange USB drive is this? It is mine.', exampleES: '¿De quién es esta memoria USB naranja? Es mía.' }
      ],
      drills: [
        { q: '___ four logic analyzers on the workbench.', opts: ['There are', 'There is', 'They are', 'Is there'], ans: 0, exp: 'Para indicar existencia en plural ("four logic analyzers") se usa "There are".', socraticHint: 'Son 4 equipos en plural.' },
        { q: 'Look at ___ tiny microchips over there across the hall.', opts: ['those', 'these', 'this', 'that'], ans: 0, exp: '"microchips" es plural y está lejos ("over there"), así que corresponde "those".', socraticHint: 'Plural + lejanía = those.' },
        { q: 'How ___ thermal paste tubes do we have left?', opts: ['many', 'much', 'a little', 'is'], ans: 0, exp: '"tubes" es sustantivo contable en plural, por lo que pregunta con "How many".', socraticHint: 'Los tubos se pueden contar por pieza.' },
        { q: "I'd like ___ small ESD glove box for Station 5, please.", opts: ['a', 'an', 'those', 'many'], ans: 0, exp: '"small" empieza con sonido consonante y es singular → artículo "a".', socraticHint: 'Observa el sonido inicial de "small".' }
      ],
      dialogue: [
        { speaker: 'Tech A', en: 'Are there any spare HDMI cables in that cabinet?', es: '¿Hay cables HDMI de repuesto en ese gabinete?' },
        { speaker: 'Tech B', en: 'Yes, there are three yellow cables under the router.', es: 'Sí, hay tres cables amarillos debajo del router.' }
      ],
      readingQuestions: [
        { q: 'Read: "Station 1 holds a torque wrench and five M4 screws. There is no solder wire in Drawer 1." What is missing?', opts: ['Solder wire', 'Torque wrench', 'M4 screws', 'Workbench'], ans: 0, exp: 'El inventario dice "There is no solder wire".', socraticHint: 'Busca el artículo con cantidad cero ("no").' }
      ]
    },
    'a1-u4': {
      vocab: [
        { en: 'Emergency Stop', es: 'Paro de emergencia', ipa: '/ɪˈmɜrdʒənsi stɑp/', pinkStress: 'e-MER-gen-cy stop', example: 'Do not block the red emergency stop button.', exampleES: 'No bloquees el botón rojo de paro de emergencia.' },
        { en: 'Live Telemetry', es: 'Telemetría en vivo', ipa: '/laɪv təˈlɛmətri/', pinkStress: 'te-LE-me-try', example: 'The PLC node is streaming live telemetry now.', exampleES: 'El nodo PLC está transmitiendo telemetría en vivo ahora.' },
        { en: 'Network Patch', es: 'Parche de red / software', ipa: '/ˈnɛtˌwɜrk pætʃ/', pinkStress: 'NET-work patch', example: 'We are going to install the network patch tomorrow.', exampleES: 'Vamos a instalar el parche de red mañana.' },
        { en: 'Solder Station', es: 'Estación de soldadura', ipa: '/ˈsɑdər ˈsteɪʃən/', pinkStress: 'SO-lder STA-tion', example: 'Yesterday, the solder station was hotter than Station B.', exampleES: 'Ayer, la estación de soldadura estuvo más caliente que la Estación B.' }
      ],
      drills: [
        { q: '___ touch exposed high-voltage busbars without PPE.', opts: ["Don't", "Doesn't", 'Not to', "Aren't"], ans: 0, exp: 'El imperativo negativo de seguridad siempre empieza con "Don\'t + verbo base".', socraticHint: 'Prohibición directa en señales de seguridad.' },
        { q: 'Look at the dashboard: the robot arm ___ calibrating right now.', opts: ['is', 'does', 'was', 'be'], ans: 0, exp: 'Present Continuous para "right now" usa "am/is/are + V-ing".', socraticHint: '"Right now" indica acción en progreso.' },
        { q: '___ the cloud server offline for five minutes yesterday?', opts: ['Was', 'Did', 'Is', 'Were'], ans: 0, exp: 'Sin otro verbo principal y sujeto singular ("the cloud server") en pasado → "Was".', socraticHint: '¿Pasado de "to be" para "server" singular?' },
        { q: 'Server Model X is ___ than the older rack unit.', opts: ['faster', 'more fast', 'fastest', 'fast'], ans: 0, exp: 'Comparativo de adjetivo corto (fast + -er) acompañado de "than".', socraticHint: 'Adjetivo de 1 sílaba en comparación directa.' }
      ],
      dialogue: [
        { speaker: 'Supervisor', en: 'What are the technicians testing on Line 1 right now?', es: '¿Qué están probando los técnicos en la Línea 1 ahora mismo?' },
        { speaker: 'Lead', en: 'They are scanning QR tags and going to log the cycle times next.', es: 'Están escaneando códigos QR y después van a registrar los tiempos de ciclo.' }
      ],
      readingQuestions: [
        { q: 'Read: "Alert: Can you run Python scripts? Technicians with Badge Level 2 can access the test script folder today." Who can access the scripts?', opts: ['Technicians with Badge Level 2', 'All external guests', 'Level 0 interns', 'No one on weekends'], ans: 0, exp: 'El permiso aplica únicamente a "Badge Level 2".', socraticHint: 'Revisa el requisito de credencial indicado.' }
      ]
    },
    A1: {
      vocab: [
        { en: 'Logbook', es: 'Bitácora de registro', ipa: '/ˈlɔɡˌbʊk/', pinkStress: 'LOG-book', example: 'Write your shift start time in the digital logbook.', exampleES: 'Escribe tu hora de inicio de turno en la bitácora digital.' },
        { en: 'Firmware Check', es: 'Revisión de firmware', ipa: '/ˈfɜrmˌwɛr tʃɛk/', pinkStress: 'FIRM-ware check', example: 'We check firmware versions on every tablet.', exampleES: 'Revisamos versiones de firmware en cada tableta.' }
      ],
      drills: [
        { q: '___ your CAD workstation running smoothly right now?', opts: ['Is', 'Does', 'Do', 'Are'], ans: 0, exp: 'Con el participio "running" (Present Continuous) usamos "Is".', socraticHint: 'Verbo auxiliar para acción continua en progreso.' },
        { q: 'My coding partner and I ___ from Tijuana.', opts: ['are', 'is', 'am', 'has'], ans: 0, exp: '"My coding partner and I" equivale a "we" → "are".', socraticHint: 'Son dos personas = nosotros.' }
      ],
      dialogue: [
        { speaker: 'Trainer', en: 'Can you read the digital gauge pressure clearly?', es: '¿Puedes leer con claridad el manómetro digital de presión?' },
        { speaker: 'Trainee', en: 'Yes, I can. It displays twenty-four PSI.', es: 'Sí, puedo. Muestra veinticuatro PSI.' }
      ],
      readingQuestions: [
        { q: 'Read: "Keep aisles clear. Place spare power cords inside Box 3." Where do spare power cords go?', opts: ['Inside Box 3', 'On the floor', 'Under the door', 'On the desk'], ans: 0, exp: 'Instrucción directa: "Place spare power cords inside Box 3".', socraticHint: 'Busca el contenedor exacto mencionado.' }
      ]
    },
    'a2-u1': {
      vocab: [
        { en: 'Sensor Drift', es: 'Desviación de sensor', ipa: '/ˈsɛnsər drɪft/', pinkStress: 'SEN-sor drift', example: 'The laser sensor drifted while the conveyor ran.', exampleES: 'El sensor láser se desvió mientras corría el transportador.' },
        { en: 'Hotfix Patch', es: 'Parche correctivo urgente', ipa: '/ˈhɑtfɪks pætʃ/', pinkStress: 'HOT-fix patch', example: 'DevOps deployed a hotfix patch last night.', exampleES: 'DevOps desplegó un parche correctivo anoche.' },
        { en: 'Analog Log', es: 'Bitácora en papel (histórica)', ipa: '/ˈænəlɔɡ lɔɡ/', pinkStress: 'A-na-log log', example: 'We used to record cycle counts on paper forms.', exampleES: 'Solíamos registrar conteos de ciclo en formatos de papel.' },
        { en: 'Downtime Event', es: 'Evento de paro técnico', ipa: '/ˈdaʊnˌtaɪm ɪˈvɛnt/', pinkStress: 'DOWN-time e-VENT', example: 'The downtime event was confusing for new operators.', exampleES: 'El evento de paro fue confuso para operadores nuevos.' }
      ],
      drills: [
        { q: 'The PLC ___ an overload error while the cooling fan was spinning slowly.', opts: ['logged', 'was log', 'logs', 'logging'], ans: 0, exp: 'Acción puntual que interrumpe una acción continua en progreso usa Simple Past ("logged").', socraticHint: 'Contrasta acción larga (was spinning) vs evento puntual.' },
        { q: 'When ___ the maintenance squad replace that faulty relay?', opts: ['did', 'was', 'were', 'had to do'], ans: 0, exp: 'En Simple Past las preguntas con verbo normal ("replace") usan el auxiliar "did + verbo base".', socraticHint: '¿Qué auxiliar acompaña a "replace" en pasado?' },
        { q: 'We ___ use USB sticks for machine transfers; now everything syncs via Ethernet.', opts: ['used to', 'use to', 'were used', 'didn\'t used to'], ans: 0, exp: 'Hábito pasado descontinuado usa "used to + verbo base".', socraticHint: 'Expresa una costumbre técnica del pasado que cambió.' },
        { q: 'Operators felt ___ because the old oscilloscope menu was ___.', opts: ['confused / confusing', 'confusing / confused', 'confuse / confused', 'confusing / confuse'], ans: 0, exp: 'Sentimiento humano usa -ed (confused); la característica del equipo usa -ing (confusing).', socraticHint: 'Persona siente (-ed) vs cosa provoca (-ing).' }
      ],
      dialogue: [
        { speaker: 'Maint. Lead', en: 'What were you checking when the circuit breaker tripped?', es: '¿Qué estabas revisando cuando se botó el interruptor?' },
        { speaker: 'Tech', en: 'First I disconnected Drive 2, then I tested voltage across Phase B.', es: 'Primero desconecté el Variador 2 y luego medí el voltaje en la Fase B.' }
      ],
      readingQuestions: [
        { q: 'Read: "Shift B found a cracked coolant hose at 2:10 AM after a vibration alarm triggered." Why did Shift B inspect the machine?', opts: ['Because a vibration alarm triggered', 'For annual cleaning', 'To paint the guard', 'To change shifts'], ans: 0, exp: 'El detonante inmediato fue la alarma de vibración.', socraticHint: 'Identifica la causa que disparó la revisión.' }
      ]
    },
    'a2-u2': {
      vocab: [
        { en: 'Aluminum Chassis', es: 'Chasis de aluminio', ipa: '/əˈlumɪnəm ˈtʃæsi/', pinkStress: 'a-LU-mi-num CHAS-sis', example: 'This controller housing is made of brushed aluminum.', exampleES: 'Esta carcasa de controlador está hecha de aluminio cepillado.' },
        { en: 'Cycle Latency', es: 'Latencia de ciclo', ipa: '/ˈsaɪkəl ˈleɪtənsi/', pinkStress: 'CY-cle LA-ten-cy', example: 'Fiber optics have lower latency than copper lines.', exampleES: 'La fibra óptica tiene menor latencia que las líneas de cobre.' },
        { en: 'Heat Sink', es: 'Disipador térmico', ipa: '/hit sɪŋk/', pinkStress: 'HEAT sink', example: 'A heat sink is used for cooling power MOSFETs.', exampleES: 'Un disipador térmico se usa para enfriar MOSFETs de potencia.' },
        { en: 'Torque Spec', es: 'Especificación de torque', ipa: '/tɔrk spɛk/', pinkStress: 'TORQUE spec', example: 'Model Z is the most compact actuator in our catalog.', exampleES: 'El Modelo Z es el actuador más compacto de nuestro catálogo.' }
      ],
      drills: [
        { q: 'Edge Node B processes telemetry ___ than the legacy gateway.', opts: ['faster', 'more fast', 'the fastest', 'as fast'], ans: 0, exp: 'Con "than" y adjetivo corto ("fast") usamos el comparativo "-er": "faster".', socraticHint: 'Observa la palabra clave "than".' },
        { q: 'That LiPo battery pack isn\'t compact ___ for the micro-drone frame.', opts: ['enough', 'too', 'a few', 'most'], ans: 0, exp: '"enough" siempre va DESPUÉS del adjetivo ("compact enough").', socraticHint: 'Recuerda: too + adj vs adj + enough.' },
        { q: 'An optical encoder is used ___ angular motor position accurately.', opts: ['for measuring', 'for measure', 'to measuring', 'measure'], ans: 0, exp: 'Para propósito funcional de un objeto se usa "used for + V-ing" (o "used to + V_base").', socraticHint: 'Después de la preposición "for", el verbo lleva -ing.' },
        { q: 'Only ___ calibration weights remain inside the metrology kit.', opts: ['a few', 'a little', 'too much', 'enough of'], ans: 0, exp: '"weights" es contable plural → "a few" (no "a little").', socraticHint: '¿Se pueden contar las pesas patrón?' }
      ],
      dialogue: [
        { speaker: 'Buyer', en: 'Is the stainless steel enclosure as lightweight as the carbon one?', es: '¿El gabinete de acero inoxidable es tan ligero como el de fibra de carbono?' },
        { speaker: 'Engineer', en: 'No, it is heavier, but it is far more durable in washdown zones.', es: 'No, es más pesado, pero mucho más durable en zonas de lavado.' }
      ],
      readingQuestions: [
        { q: 'Read: "Gateway V3 weighs 220g, costs $140, and draws 3W. Gateway V1 weighs 450g, costs $190, and draws 8W." Which statement is true?', opts: ['Gateway V3 is lighter and less expensive than V1', 'Gateway V1 is faster and cheaper', 'Both weigh over 500g', 'V3 uses more power'], ans: 0, exp: 'V3 pesa 220g (más ligero) y cuesta $140 (más económico).', socraticHint: 'Compara peso y costo entre V1 y V3.' }
      ]
    },
    'a2-u3': {
      vocab: [
        { en: 'Sprint Backlog', es: 'Pendientes del sprint', ipa: '/sprɪnt ˈbæklɔɡ/', pinkStress: 'sprint BACK-log', example: 'We are going to review the sprint backlog tomorrow.', exampleES: 'Vamos a revisar los pendientes del sprint mañana.' },
        { en: 'Load Balancer', es: 'Balanceador de carga', ipa: '/loʊd ˈbælənsər/', pinkStress: 'LOAD BA-lan-cer', example: 'I will restart the backup load balancer right away.', exampleES: 'Reiniciaré el balanceador de respaldo de inmediato.' },
        { en: 'Deployment Window', es: 'Ventana de despliegue', ipa: '/dɪˈplɔɪmənt ˈwɪndoʊ/', pinkStress: 'de-PLOY-ment WIN-dow', example: 'Submit all API pull requests by Friday at noon.', exampleES: 'Envía todos los pull requests de API a más tardar el viernes al mediodía.' },
        { en: 'Reset Button', es: 'Botón de reinicio', ipa: '/ˈrisɛt ˈbʌtən/', pinkStress: 'RE-set BUT-ton', example: 'Hold this recessed pin to reset the Wi-Fi module.', exampleES: 'Presiona este pin oculto para reiniciar el módulo Wi-Fi.' }
      ],
      drills: [
        { q: 'Alert just popped up on Screen 2! — Okay, I ___ run diagnostics immediately.', opts: ["'ll", "'m going to", 'am run', 'will to'], ans: 0, exp: 'Decisión espontánea en el momento de hablar u ofrecer ayuda usa "will" ("I\'ll").', socraticHint: '¿Es un plan previo o una reacción inmediata a la alerta?' },
        { q: 'We calibrated the LiDAR sensor ___ detect obstacles within 40 meters.', opts: ['to', 'for', 'so to', 'for to'], ans: 0, exp: 'Infinitivo de propósito antes de verbo base usa "to" ("to detect"), nunca "for detect".', socraticHint: 'Propósito antes de verbo base en inglés.' },
        { q: 'Our DevOps lead avoids ___ unreviewed hotfixes before a holiday.', opts: ['pushing', 'to push', 'push', 'pushed'], ans: 0, exp: 'El verbo "avoid" siempre va seguido de gerundio (V-ing): "avoids pushing".', socraticHint: 'Patron verbal de avoid/enjoy/finish + -ing.' },
        { q: 'Please upload the CAD BOM ___ 4:00 PM today so procurement can order.', opts: ['by', 'until', 'during', 'along'], ans: 0, exp: 'Para fecha o hora límite exacta (deadline) se usa "by".', socraticHint: 'Significa "a más tardar a las 4:00 PM".' }
      ],
      dialogue: [
        { speaker: 'QA Lead', en: 'We are meeting the Texas automation supplier at 10 AM tomorrow.', es: 'Nos reunimos con el proveedor de automatización de Texas mañana a las 10 AM.' },
        { speaker: 'Planner', en: 'Great! How about sending them our test logs before noon?', es: '¡Excelente! ¿Qué tal si les enviamos nuestros registros de prueba antes del mediodía?' }
      ],
      readingQuestions: [
        { q: 'Read: "Memo: We are going to upgrade the ERP server on Saturday night. Please export open tickets by 5 PM Friday." What is already planned?', opts: ['Upgrading the ERP server on Saturday night', 'Buying new desks', 'Closing the plant', 'Canceling Friday shift'], ans: 0, exp: 'La migración ERP está confirmada con "going to upgrade".', socraticHint: 'Identifica la acción futura planeada.' }
      ]
    },
    'a2-u4': {
      vocab: [
        { en: 'Safety Interlock', es: 'Enclavamiento de seguridad', ipa: '/ˈseɪfti ˈɪntərlɑk/', pinkStress: 'SAFE-ty IN-ter-lock', example: 'You mustn\'t bypass the laser safety interlock.', exampleES: 'No debes puentear el enclavamiento de seguridad láser.' },
        { en: 'Firmware Update', es: 'Actualización de firmware', ipa: '/ˈfɜrmˌwɛr ˈʌpdeɪt/', pinkStress: 'FIRM-ware UP-date', example: 'Have you flashed the new firmware update yet?', exampleES: '¿Ya cargaste la nueva actualización de firmware?' },
        { en: 'Voltage Regulator', es: 'Regulador de voltaje', ipa: '/ˈvoʊltɪdʒ ˈrɛɡjəˌleɪtər/', pinkStress: 'VOL-tage RE-gu-la-tor', example: 'The voltage regulator might overheat under peak load.', exampleES: 'El regulador de voltaje podría sobrecalentarse bajo carga pico.' },
        { en: 'Work Order Ticket', es: 'Ticket de orden de trabajo', ipa: '/wɜrk ˈɔrdər ˈtɪkɪt/', pinkStress: 'WORK OR-der TIC-ket', example: 'If the pressure drops below 40 PSI, the valve closes.', exampleES: 'Si la presión cae debajo de 40 PSI, la válvula se cierra.' }
      ],
      drills: [
        { q: 'Operators ___ remove machine light curtains while power is active.', opts: ["mustn't", "don't have to", 'might to', "doesn't must"], ans: 0, exp: '"mustn\'t" expresa prohibición estricta; "don\'t have to" significa opcional.', socraticHint: '¿Está prohibido o solo es opcional?' },
        { q: 'Have you backed up the PLC ladder logic ___?', opts: ['yet', 'already', 'ever', 'since'], ans: 0, exp: 'Al final de preguntas y negaciones en Present Perfect usamos "yet".', socraticHint: 'Preguntas tipo "¿ya hiciste...?" terminan en "yet".' },
        { q: 'If the optical sensor ___ a jam, the line stops automatically.', opts: ['detects', 'will detect', 'detected', 'detect'], ans: 0, exp: 'En Zero Conditional (causa-efecto física), la cláusula "If" va en Presente Simple ("detects").', socraticHint: 'Regla científica/física siempre cierta = Zero Conditional.' },
        { q: 'Plug ___ the USB-C probe before launching the oscilloscope app.', opts: ['in', 'out', 'off', 'up'], ans: 0, exp: 'El phrasal verb para conectar a corriente/puerto es "plug in".', socraticHint: 'Conectar un dispositivo eléctrico o cable.' }
      ],
      dialogue: [
        { speaker: 'Technician', en: 'I have already filled out the LOTO permit, but I haven\'t tagged Breaker 4 yet.', es: 'Ya llené el permiso LOTO, pero aún no etiqueto el Interruptor 4.' },
        { speaker: 'Safety Audit', en: 'Good catch. Remember, you must attach your lock before opening any panel.', es: 'Buen detalle. Recuerda, debes colocar tu candado antes de abrir cualquier panel.' }
      ],
      readingQuestions: [
        { q: 'Read: "Zero-Downtime Rule: If CPU temperature exceeds 85°C, the fan controller will trigger Turbo Cooling." What happens above 85°C?', opts: ['Turbo Cooling activates automatically', 'The building power shuts off', 'Operators must open the roof', 'Nothing happens'], ans: 0, exp: 'First Conditional describe el resultado automático: "will trigger Turbo Cooling".', socraticHint: 'Revisa la consecuencia de la cláusula If.' }
      ]
    },
    A2: {
      vocab: [
        { en: 'Root Ticket', es: 'Ticket principal de falla', ipa: '/rut ˈtɪkɪt/', pinkStress: 'ROOT tic-ket', example: 'We have just closed the cooling-tower root ticket.', exampleES: 'Acabamos de cerrar el ticket principal de la torre de enfriamiento.' },
        { en: 'Payload Spec', es: 'Especificación de carga útil', ipa: '/ˈpeɪˌloʊd spɛk/', pinkStress: 'PAY-load spec', example: 'This cobot arm is built for light assembly payloads.', exampleES: 'Este brazo cobot está diseñado para cargas ligeras de ensamble.' }
      ],
      drills: [
        { q: 'You ___ wear a hard hat in the office lobby, only inside the foundry.', opts: ["don't have to", "mustn't", 'shouldn\'t to', 'haven\'t to'], ans: 0, exp: '"don\'t have to" indica que no es obligatorio.', socraticHint: 'Ausencia de obligación = don\'t have to.' },
        { q: 'If we optimize this SQL query tomorrow, latency ___ by 40%.', opts: ['will drop', 'drops to', 'dropped', 'would dropping'], ans: 0, exp: 'First Conditional (If + Present, will + V_base) para predicción técnica probable.', socraticHint: 'Resultado futuro probable = will + verbo.' }
      ],
      dialogue: [
        { speaker: 'Dev', en: 'Did the backup script run faster than yesterday?', es: '¿Corrió el script de respaldo más rápido que ayer?' },
        { speaker: 'Ops', en: 'Yes, it finished in four minutes instead of nine.', es: 'Sí, terminó en cuatro minutos en lugar de nueve.' }
      ],
      readingQuestions: [
        { q: 'Read: "Engineers should test calibration gauges before each shift, even when logs look green." What is advised?', opts: ['Testing gauges before every shift', 'Ignoring gauges if green', 'Replacing gauges daily', 'Working without gauges'], ans: 0, exp: '"should test" indica buena práctica recomendada.', socraticHint: 'Busca el verbo modal "should".' }
      ]
    },
    'b1-u1': {
      vocab: [
        { en: 'Automated Pipeline', es: 'Flujo automatizado CI/CD', ipa: '/ˈɔtəˌmeɪtɪd ˈpaɪpˌlaɪn/', pinkStress: 'AU-to-ma-ted PIPE-line', example: 'Every firmware build is validated by our automated pipeline.', exampleES: 'Cada compilación de firmware es validada por nuestro flujo automatizado.' },
        { en: 'Quality Audit', es: 'Auditoría de calidad', ipa: '/ˈkwɑləti ˈɔdɪt/', pinkStress: 'QUA-li-ty AU-dit', example: 'Two batches were quarantined due to thermal drift.', exampleES: 'Dos lotes fueron puestos en cuarentena debido a deriva térmica.' },
        { en: 'Cleanroom Gowning', es: 'Vestimenta de cuarto limpio', ipa: '/ˈklinˌrum ˈɡaʊnɪŋ/', pinkStress: 'GOWN-ing', example: 'Once anti-static boots are worn, step onto the tacky mat.', exampleES: 'Una vez puestas las botas antiestáticas, pisa el tapete adherente.' },
        { en: 'Legacy System', es: 'Sistema heredado antiguo', ipa: '/ˈlɛɡəsi ˈsɪstəm/', pinkStress: 'LE-ga-cy SYS-tem', example: 'Engineers would manually upload CSV logs every evening.', exampleES: 'Los ingenieros solían subir registros CSV manualmente cada tarde.' }
      ],
      drills: [
        { q: 'All PCB assemblies ___ optically inspected before conformal coating.', opts: ['are', 'have', 'is being do', 'was'], ans: 0, exp: 'Voz pasiva presente plural: "assemblies" + "are" + Past Participle ("inspected").', socraticHint: 'El sujeto "assemblies" es plural y recibe la acción.' },
        { q: 'Line 2 slowed down ___ a calibration mismatch on Valve 7.', opts: ['due to', 'because of that', 'although', 'however'], ans: 0, exp: '"due to" conecta una causa en forma de frase nominal ("a calibration mismatch").', socraticHint: 'Conector causal seguido de sustantivo.' },
        { q: 'Before cloud telemetry, our plant ___ have analog pressure charts.', opts: ['used to', 'would', 'was using to', 'did used to'], ans: 0, exp: 'Con verbos de estado como "have/be/live" solo usamos "used to", nunca "would".', socraticHint: '"have" expresa estado pasado, no acción repetida.' },
        { q: 'First, power is isolated; ___, the technician verifies zero energy.', opts: ['subsequently', 'despite', 'whereas', 'due to'], ans: 0, exp: '"subsequently" marca claramente el paso secuencial siguiente en un SOP.', socraticHint: 'Conector de secuencia formal en procedimientos.' }
      ],
      dialogue: [
        { speaker: 'Auditor', en: 'How are non-conforming aluminum parts handled under ISO 9001?', es: '¿Cómo se manejan las piezas de aluminio no conformes bajo ISO 9001?' },
        { speaker: 'QA Lead', en: 'They are tagged red immediately and moved to the quarantine cage.', es: 'Se etiquetan de rojo de inmediato y se trasladan a la jaula de cuarentena.' }
      ],
      readingQuestions: [
        { q: 'Read: "SOP-402: Once wafers are etched, they are rinsed in deionized water; therefore, particle counts stay below Class 100." Why do particle counts stay low?', opts: ['Because etched wafers are rinsed in deionized water', 'Because wafers are skipped', 'Because water is heated to 200C', 'Due to manual wiping'], ans: 0, exp: '"therefore" señala el efecto de realizar el enjuague con agua desionizada.', socraticHint: 'Observa la relación causa-efecto con "therefore".' }
      ]
    },
    'b1-u2': {
      vocab: [
        { en: 'Request for Quote (RFQ)', es: 'Solicitud de cotización', ipa: '/rɪˈkwɛst fɔr kwoʊt/', pinkStress: 'RFQ', example: 'We have worked with this PCB vendor since 2021.', exampleES: 'Hemos trabajado con este proveedor de PCB desde 2021.' },
        { en: 'Fault Chronology', es: 'Cronología de la falla', ipa: '/fɔlt krəˈnɑlədʒi/', pinkStress: 'chro-NO-lo-gy', example: 'When QA inspected Unit 9, Ops had already replaced the fuse.', exampleES: 'Cuando Calidad inspeccionó la Unidad 9, Ops ya había reemplazado el fusible.' },
        { en: 'Cost Optimization', es: 'Optimización de costos', ipa: '/kɔst ˌɑptəməˈzeɪʃən/', pinkStress: 'op-ti-mi-ZA-tion', example: 'I would appreciate it if you could confirm lead times.', exampleES: 'Le agradecería mucho si pudiera confirmar tiempos de entrega.' },
        { en: 'Batch Variance', es: 'Variación de lote', ipa: '/bætʃ ˈvɛriəns/', pinkStress: 'VA-ri-ance', example: 'Neither of the test servers showed packet loss.', exampleES: 'Ninguno de los servidores de prueba mostró pérdida de paquetes.' }
      ],
      drills: [
        { q: 'By the time maintenance reached Bay 3, the operator ___ already hit E-Stop.', opts: ['had', 'has', 'did', 'was'], ans: 0, exp: 'Past Perfect ("had + V3") indica una acción previa ocurrida antes de otro evento pasado ("reached").', socraticHint: 'La parada ocurrió ANTES de que llegara mantenimiento.' },
        { q: 'We have maintained 99.8% uptime ___ eighteen consecutive months.', opts: ['for', 'since', 'ago', 'during of'], ans: 0, exp: 'Duración total ("18 months") exige "for"; un punto inicial usa "since".', socraticHint: '¿Es duración o punto de inicio en el calendario?' },
        { q: '___ you please forward the revised BOM before 3:00 PM?', opts: ['Could', 'Do mind', 'Must to', 'Shall to'], ans: 0, exp: '"Could you please..." es el estándar profesional cordial en correos corporativos EE. UU.', socraticHint: 'Petición formal en un correo técnico.' },
        { q: '___ of the two redundant power supplies failed during stress testing.', opts: ['Neither', 'Both no', 'None of both', 'Every'], ans: 0, exp: 'Para cero de exactamente dos elementos usamos "Neither".', socraticHint: 'Se trata de exactamente dos fuentes.' }
      ],
      dialogue: [
        { speaker: 'Procurement', en: 'I would appreciate it if you could send an updated lead-time estimate for Q3.', es: 'Agradecería mucho si pudiera enviar un estimado actualizado de entrega para Q3.' },
        { speaker: 'Supplier', en: 'Certainly. We have held pricing steady since January and can ship by Tuesday.', es: 'Por supuesto. Hemos mantenido el precio desde enero y podemos embarcar el martes.' }
      ],
      readingQuestions: [
        { q: 'Read: "Before the firmware patch rolled out at 04:00, three gateway routers had dropped offline." What happened first?', opts: ['Three gateway routers dropped offline', 'The firmware patch rolled out', 'The office opened', 'New routers arrived'], ans: 0, exp: '"had dropped" en Past Perfect ocurrió antes del despliegue a las 04:00.', socraticHint: 'El tiempo Past Perfect marca el evento anterior.' }
      ]
    },
    'b1-u3': {
      vocab: [
        { en: 'Sprint Retrospective', es: 'Retrospectiva de sprint', ipa: '/sprɪnt ˌrɛtrəˈspɛktɪv/', pinkStress: 're-tro-SPEC-tive', example: 'Do you know when the staging environment will be back up?', exampleES: '¿Sabes cuándo volverá a estar en línea el ambiente staging?' },
        { en: 'Incident Escalation', es: 'Escalamiento de incidente', ipa: '/ˈɪnsɪdənt ˌɛskəˈleɪʃən/', pinkStress: 'es-ca-LA-tion', example: 'You validated the CAN bus frames, didn\'t you?', exampleES: 'Validaste las tramas del bus CAN, ¿no es así?' },
        { en: 'Release Freeze', es: 'Congelamiento de entregas', ipa: '/rɪˈlis friz/', pinkStress: 're-LEASE freeze', example: 'At 2 PM tomorrow, our team will be running load tests.', exampleES: 'Mañana a las 2 PM nuestro equipo estará corriendo pruebas de carga.' },
        { en: 'Stakeholder Sync', es: 'Alineación con interesados', ipa: '/ˈsteɪkˌhoʊldər sɪŋk/', pinkStress: 'STAKE-hol-der sync', example: 'The PM said that the client needed zero-downtime deployment.', exampleES: 'El PM dijo que el cliente necesitaba despliegue sin tiempos muertos.' }
      ],
      drills: [
        { q: 'Could you tell me where the backup CAD files ___?', opts: ['are stored', 'are they stored', 'do they store', 'stored are'], ans: 0, exp: 'En preguntas indirectas ("Could you tell me where...") el orden es Sujeto + Verbo (sin inversión).', socraticHint: 'Las preguntas indirectas no invierten auxiliar antes del sujeto.' },
        { q: "You've already merged the sensor calibration PR, ___?", opts: ["haven't you", "didn't you", "isn't it", "don't you"], ans: 0, exp: 'La oración usa "have" (Present Perfect); su question tag negativa es "haven\'t you".', socraticHint: 'Usa el mismo auxiliar del enunciado ("You have").' },
        { q: 'The lead architect said they ___ migrating to Kubernetes the next week.', opts: ['were', 'are', 'have been to', 'was'], ans: 0, exp: 'Reported Speech tras "said" retrocede el tiempo verbal ("are migrating" → "were migrating").', socraticHint: 'Aplica backshift al reporte en pasado.' },
        { q: 'We ran into an urgent spec issue, so let\'s bring ___ up during the standup.', opts: ['it', 'them', 'him', 'that those'], ans: 0, exp: 'Los pronombres ("it") en phrasal verbs separables ("bring up") siempre van EN MEDIO ("bring it up").', socraticHint: 'Pronombre siempre entre verbo y partícula.' }
      ],
      dialogue: [
        { speaker: 'Scrum Master', en: 'Could you confirm whether the thermal camera driver passed QA?', es: '¿Podrías confirmar si el controlador de la cámara térmica pasó QA?' },
        { speaker: 'Eng Lead', en: 'It passed on Linux, right? Anyway, at 3 PM we will be benchmarking Windows drivers.', es: 'Pasó en Linux, ¿cierto? De hecho, a las 3 PM estaremos midiendo drivers en Windows.' }
      ],
      readingQuestions: [
        { q: 'Read: "The Detroit plant manager told our team that she needed root-cause confirmation before Friday." What did the manager request?', opts: ['Root-cause confirmation before Friday', 'New laptops', 'Weekend overtime only', 'Hardware cancellation'], ans: 0, exp: 'Reported speech resume literalmente su exigencia: "root-cause confirmation before Friday".', socraticHint: 'Revisa el contenido de la cláusula con "that".' }
      ]
    },
    'b1-u4': {
      vocab: [
        { en: 'Containment Action', es: 'Acción de contención (8D)', ipa: '/kənˈteɪnmənt ˈækʃən/', pinkStress: 'con-TAIN-ment AC-tion', example: 'The valve that regulates coolant flow is stuck open.', exampleES: 'La válvula que regula el flujo de refrigerante está atascada abierta.' },
        { en: 'Preventive CAPA', es: 'Acción correctiva y preventiva', ipa: '/prɪˈvɛntɪv ˈkæpə/', pinkStress: 'pre-VEN-tive CA-pa', example: 'If we had verified tolerance earlier, scrap would not have spiked.', exampleES: 'Si hubiéramos verificado tolerancia antes, el scrap no habría subido.' },
        { en: 'Thermal Runaway', es: 'Fuga térmica de batería', ipa: '/ˈθɜrməl ˈrʌnəˌweɪ/', pinkStress: 'THER-mal RUN-a-way', example: 'Cell voltage dropped to zero, so the fuse must have blown.', exampleES: 'El voltaje cayó a cero, así que el fusible debió haberse fundido.' },
        { en: 'Trade-off Analysis', es: 'Análisis de balance técnico', ipa: '/treɪd ɔf əˈnælɪsɪs/', pinkStress: 'TRADE-off a-NA-ly-sis', example: 'I see your point; however, cycle time would suffer.', exampleES: 'Entiendo tu punto; sin embargo, el tiempo de ciclo sufriría.' }
      ],
      drills: [
        { q: 'The telemetry broker ___ distributes CAN messages runs on Rust.', opts: ['which', 'who', 'where', 'whose'], ans: 0, exp: 'Para cosas o software ("broker") usamos el pronombre relativo "which" (o "that").', socraticHint: 'Se refiere a un módulo de software.' },
        { q: 'If the team ___ automated boundary tests earlier, the bug wouldn\'t have reached prod.', opts: ['had run', 'ran', 'would run', 'runs'], ans: 0, exp: 'Third Conditional (prevención/arrepentimiento pasado) exige "If + had + V3".', socraticHint: 'Condicional 3º sobre prevención pasada.' },
        { q: 'The PSU LED is off and output is 0V; the main breaker ___ tripped.', opts: ['must have', "can't have", 'should to have', 'might not must'], ans: 0, exp: '95% de certeza lógica sobre una causa pasada usa "must have + V3".', socraticHint: 'Evidencia física contundente de causa.' },
        { q: 'CNC Spindle B cuts titanium 20% ___ than our older milling unit.', opts: ['more accurately', 'accurately', 'most accurate', 'accurater'], ans: 0, exp: 'Comparativo de adverbios terminados en -ly utiliza "more + adverbio + than".', socraticHint: 'Modifica al verbo "cuts", necesita adverbio comparativo.' }
      ],
      dialogue: [
        { speaker: 'Quality Eng', en: 'I see your point on shipping today; however, we should have audited torque logs first.', es: 'Entiendo tu punto sobre embarcar hoy; sin embargo, debimos auditar los registros de torque primero.' },
        { speaker: 'Plant Dir.', en: 'Agreed. If we add an inline vision camera now, future defects would drop near zero.', es: 'De acuerdo. Si agregamos una cámara de visión en línea ahora, los defectos futuros caerían casi a cero.' }
      ],
      readingQuestions: [
        { q: 'Read: "8D-D4: Unless the O-ring vendor proves thermal resilience at 180°C, our team will switch to fluorocarbon seals." Under what condition will they keep the vendor?', opts: ['Only if they prove thermal resilience at 180°C', 'Never under any condition', 'If price drops 5%', 'If shipping is free'], ans: 0, exp: '"Unless" equivale a "if not": solo se conserva al proveedor si demuestra la resistencia a 180°C.', socraticHint: 'Evalúa el significado de "Unless".' }
      ]
    },
    B1: {
      vocab: [
        { en: 'Service-Level Agreement', es: 'Acuerdo de nivel de servicio (SLA)', ipa: '/ˈsɜrvɪs ˈlɛvəl əˈɡrimənt/', pinkStress: 'SER-vice LE-vel', example: 'Latency stayed within our service-level agreement.', exampleES: 'La latencia se mantuvo dentro de nuestro acuerdo de nivel de servicio.' },
        { en: 'Changeover Time', es: 'Tiempo de cambio de modelo', ipa: '/ˈtʃeɪndʒˌoʊvər taɪm/', pinkStress: 'CHANGE-o-ver time', example: 'Quick-release fixtures cut changeover time in half.', exampleES: 'Los herramentales de liberación rápida redujeron a la mitad el cambio de modelo.' }
      ],
      drills: [
        { q: 'That sensor ___ calibrated by metrology last Friday morning.', opts: ['was', 'were', 'has', 'did'], ans: 0, exp: 'Tiempo definido en el pasado ("last Friday") + sujeto singular en voz pasiva → "was".', socraticHint: 'Combina voz pasiva y pasado simple.' },
        { q: 'Do you know ___ the API authentication token expires tonight?', opts: ['if', 'does', 'that is', 'what does'], ans: 0, exp: 'Pregunta indirecta de Sí/No usa "if" o "whether" sin inversión.', socraticHint: 'Usa "if/whether" para dudas de sí/no.' }
      ],
      dialogue: [
        { speaker: 'PM', en: 'Have you coordinated the BOM revision with suppliers yet?', es: '¿Ya coordinaste la revisión del BOM con los proveedores?' },
        { speaker: 'Lead', en: 'Yes, an email was sent yesterday so they could review updated tolerances.', es: 'Sí, se envió un correo ayer para que revisaran las tolerancias actualizadas.' }
      ],
      readingQuestions: [
        { q: 'Read: "Although prototype cycle times looked slow, software tuning reduced latency by 35%." What improved latency?', opts: ['Software tuning', 'Adding extra weight', 'Slowing motors', 'Skipping QA'], ans: 0, exp: 'El párrafo contrasta el arranque lento con la mejora por "software tuning".', socraticHint: 'Identifica qué acción causó la reducción.' }
      ]
    },
    'b2-u1': {
      vocab: [
        { en: 'Engineering Change Order', es: 'Orden de Cambio de Ingeniería (ECO)', ipa: '/ˌɛndʒəˈnɪrɪŋ tʃeɪndʒ ˈɔrdər/', pinkStress: 'ECO', example: 'The thermal pad ECO is currently being reviewed by AS9100 auditors.', exampleES: 'La ECO de almohadilla térmica está siendo revisada por auditores AS9100.' },
        { en: 'Traceability Matrix', es: 'Matriz de trazabilidad', ipa: '/ˌtreɪsəˈbɪləti ˈmeɪtrɪks/', pinkStress: 'tra-cea-BI-li-ty MA-trix', example: 'Firmware hashes are thought to have resolved the boot race condition.', exampleES: 'Se cree que los hashes de firmware resolvieron la condición de carrera en arranque.' },
        { en: 'Tolerance Stack-Up', es: 'Acumulación de tolerancias', ipa: '/ˈtɑlərəns ˈstækʌp/', pinkStress: 'TO-le-rance STACK-up', example: 'Had we caught that stack-up error in CAD, Line 4 would not be idle now.', exampleES: 'Si hubiéramos detectado ese error en CAD, la Línea 4 no estaría detenida ahora.' },
        { en: 'Deviation Waiver', es: 'Permiso de desviación temporal', ipa: '/ˌdiviˈeɪʃən ˈweɪvər/', pinkStress: 'de-vi-A-tion WAI-ver', example: 'The supplier housing, which arrived slightly anodized matte, passed salt-spray tests.', exampleES: 'La carcasa del proveedor, que llegó con anodizado mate, pasó pruebas salinas.' }
      ],
      drills: [
        { q: 'Micro-cracks on Batch 19 must ___ during thermal shock cycling.', opts: ['have formed', 'forming', 'formed be', 'have forming'], ans: 0, exp: 'Modal pasivo/activo perfecto de deducción: "must have + V3".', socraticHint: 'Deducción lógica pasada con modal.' },
        { q: 'The new IGBT inverter, ___ weighs 18% less than Gen-2, raises efficiency to 97.4%.', opts: ['which', 'that', 'whom', 'what'], ans: 0, exp: 'Cláusula relativa explicativa (después de coma) NUNCA usa "that"; usa "which".', socraticHint: 'Observa la coma antes del pronombre relativo.' },
        { q: 'If our verification script had validated boundary limits last month, Prod ___ crashing today.', opts: ["wouldn't be", "wouldn't have been", "isn't", "won't be"], ans: 0, exp: 'Mixed Conditional (Causa pasada → Resultado presente hoy): "wouldn\'t be + V-ing".', socraticHint: 'Mezcla pasado irreal ("last month") con efecto hoy ("today").' },
        { q: 'New PCB impedance standards are currently ___ implemented across Fab 2.', opts: ['being', 'been', 'be', 'to be'], ans: 0, exp: 'Voz pasiva continua presente ("are currently being + V3").', socraticHint: 'Acción pasiva en curso ahora mismo.' }
      ],
      dialogue: [
        { speaker: 'Chief Eng', en: 'What is the status of the ECO for the stainless cooling manifold?', es: '¿Cuál es el estatus de la ECO para el múltiple de enfriamiento?' },
        { speaker: 'Lead', en: 'Drawings are being finalized today; had tolerances loosened earlier, yield would be higher now.', es: 'Los planos están siendo finalizados hoy; si hubiéramos ampliado tolerancias antes, el rendimiento sería mayor ahora.' }
      ],
      readingQuestions: [
        { q: 'Read: "Approved under Deviation DW-88, the anodized brackets, which exhibited minor color variation, passed 1,000-hour corrosion qualification." Why were brackets accepted?', opts: ['They passed 1,000-hour corrosion qualification under a formal deviation', 'They were repainted manually', 'Color variation failed safety', 'Corrosion tests were skipped'], ans: 0, exp: 'Pasaron la calificación de 1,000h y quedaron respaldados bajo la desviación DW-88.', socraticHint: 'Confirma qué prueba técnica superaron.' }
      ]
    },
    'b2-u2': {
      vocab: [
        { en: 'Quarterly Business Review', es: 'Revisión trimestral de negocio (QBR)', ipa: '/ˈkwɔrtərli ˈbɪznəs rɪˈvju/', pinkStress: 'QBR', example: 'Let\'s kick off the QBR and circle back to telemetry latency.', exampleES: 'Arranquemos la QBR y retomemos luego la latencia de telemetría.' },
        { en: 'Milestone Slippage', es: 'Deslizamiento de hito', ipa: '/ˈmaɪlˌstoʊn ˈslɪpɪdʒ/', pinkStress: 'MILE-stone SLIP-page', example: 'Provided that silicon wafers clear customs Friday, Q4 targets hold.', exampleES: 'Siempre y cuando las obleas liberen aduana el viernes, las metas Q4 se mantienen.' },
        { en: 'Sustained Load', es: 'Carga sostenida continua', ipa: '/səˈsteɪnd loʊd/', pinkStress: 'sus-TAINED load', example: 'The edge cluster had been running at 98% load for six hours before failover.', exampleES: 'El clúster llevaba corriendo al 98% de carga seis horas antes de la conmutación.' },
        { en: 'Rollout Completion', es: 'Culminación de despliegue', ipa: '/ˈroʊˌlaʊt kəmˈpliʃən/', pinkStress: 'ROLL-out com-PLE-tion', example: 'By November 30, we will have migrated 42 factories to edge MQTT.', exampleES: 'Para el 30 de noviembre habremos migrado 42 plantas a MQTT edge.' }
      ],
      drills: [
        { q: '___ that our supplier confirms raw-die volume by Tuesday, delivery stays on schedule.', opts: ['Provided', 'Although', 'However', 'Despite'], ans: 0, exp: '"Provided that" establece una condición contractual estricta ("siempre y cuando").', socraticHint: 'Condicional formal equivalente a "on condition that".' },
        { q: 'By Q4 2027, our robotics division ___ commissioned 120 autonomous AMRs.', opts: ['will have', 'will be', 'has been', 'had'], ans: 0, exp: 'Future Perfect ("will have + V3") indica meta ya completada antes de una fecha futura.', socraticHint: 'Referencia futura completada ("By Q4 2027").' },
        { q: 'The turbine bearing ___ vibrating intensely for three hours before operators shut it down.', opts: ['had been', 'has been', 'was', 'would be'], ans: 0, exp: 'Past Perfect Continuous ("had been + V-ing") enfatiza duración previa a un punto pasado.', socraticHint: 'Duración de 3 horas antes del evento pasado.' },
        { q: 'Would our reliability architect like to ___ in on the cloud failover proposal?', opts: ['weigh', 'weight', 'circle on', 'pushing'], ans: 0, exp: 'Expresión ejecutiva estadounidense para aportar opinión en junta: "weigh in".', socraticHint: 'Phrasal verb corporativo = opinar o aportar.' }
      ],
      dialogue: [
        { speaker: 'VP Ops', en: 'It would appear that customs clearance might push Rack Lot 5 back by two days.', es: 'Parecería que el despacho aduanal podría retrasar dos días el Lote de Racks 5.' },
        { speaker: 'Director', en: 'To sum up, provided that Lot 4 ships Monday, our QBR KPIs will still have been met.', es: 'En resumen, siempre y cuando el Lote 4 salga el lunes, nuestros KPIs QBR se habrán cumplido.' }
      ],
      readingQuestions: [
        { q: 'Read: "Teams had been benchmarking FPGA inference for 48 hours straight when memory fragmentation surfaced." How long did benchmarking run before the issue surfaced?', opts: ['48 hours', '2 hours', '1 week', '30 minutes'], ans: 0, exp: 'La duración en Past Perfect Continuous es exactamente "48 hours straight".', socraticHint: 'Localiza el indicador temporal.' }
      ]
    },
    'b2-u3': {
      vocab: [
        { en: 'Zero-Defect Mandate', es: 'Mandato de cero defectos', ipa: '/ˈzɪroʊ ˈdifɛkt ˈmændeɪt/', pinkStress: 'ZE-ro DE-fect', example: 'Under no circumstances should unverified firmware reach safety PLCs.', exampleES: 'Bajo ninguna circunstancia debe firmware sin verificar llegar a PLCs de seguridad.' },
        { en: 'Root Fault Isolation', es: 'Aislamiento de falla raíz', ipa: '/rut fɔlt ˌaɪsəˈleɪʃən/', pinkStress: 'i-so-LA-tion', example: 'What triggered the CAN bus saturation was a noisy ground loop.', exampleES: 'Lo que detonó la saturación del bus CAN fue un lazo de tierra ruidoso.' },
        { en: 'Supply Bottleneck', es: 'Cuello de botella en suministro', ipa: '/səˈplaɪ ˈbɑtəlˌnɛk/', pinkStress: 'BOT-tle-neck', example: 'Despite tight microcontroller shortages, Tier-1 output exceeded targets.', exampleES: 'A pesar de la escasez de microcontroladores, la salida Tier-1 superó metas.' },
        { en: 'Forensic Post-Mortem', es: 'Análisis forense post-mortem', ipa: '/fəˈrɛnsɪk poʊst ˈmɔrtəm/', pinkStress: 'fo-REN-sic POST-mor-tem', example: 'We needn\'t have scrapped all 50 boards; only five had cold joints.', exampleES: 'No hacía falta desechar las 50 tarjetas; solo cinco tenían soldadura fría.' }
      ],
      drills: [
        { q: 'Under no circumstances ___ production operators override thermal safeties.', opts: ['should', 'they should', 'mustn\'t they', 'shouldn\'t'], ans: 0, exp: 'Tras adverbio negativo inicial ("Under no circumstances"), se invierte auxiliar antes del sujeto.', socraticHint: 'Inversión negativa formal.' },
        { q: 'What caused the lidar frame drops ___ outdated DMA buffer sizing.', opts: ['was', 'were being', 'which was', 'it was'], ans: 0, exp: 'En Wh-cleft sentence ("What caused X"), el foco singular toma el verbo "was".', socraticHint: 'Oración hendida para enfocar causa raíz.' },
        { q: 'We ___ tested the backup battery manually; the BMS already logs health every minute.', opts: ["needn't have", "must have", "can't have to", "didn't needed"], ans: 0, exp: '"needn\'t have + V3" indica que se realizó una acción en el pasado que resultó innecesaria.', socraticHint: 'Acción realizada innecesariamente.' },
        { q: '___ severe customs delays, the assembly line launched on schedule.', opts: ['In spite of', 'Although', 'Even though', 'Nevertheless'], ans: 0, exp: '"In spite of" (o "Despite") va seguido de frase nominal ("severe customs delays").', socraticHint: 'Contraste seguido de sustantivo sin verbo conjugado.' }
      ],
      dialogue: [
        { speaker: 'Lead Arch', en: 'Had we known about the oscillator drift, we would have swapped parts before EVT.', es: 'De haber sabido de la deriva del oscilador, habríamos cambiado piezas antes de EVT.' },
        { speaker: 'Reliability', en: 'True, it was the low-ESR capacitor that stabilized rail ripple completely.', es: 'Cierto, fue el capacitor de baja ESR el que estabilizó el rizado por completo.' }
      ],
      readingQuestions: [
        { q: 'Read: "Post-mortem: Not only did the failover proxy isolate faulty packets, but it also preserved active industrial sockets." What two things did the proxy achieve?', opts: ['Isolated faulty packets and preserved active sockets', 'Deleted sockets and shut down servers', 'Increased latency', 'Skipped health checks'], ans: 0, exp: 'La inversión "Not only did... but it also..." enumera dos logros simultáneos.', socraticHint: 'Revisa ambos miembros de la estructura Not only... but also.' }
      ]
    },
    'b2-u4': {
      vocab: [
        { en: 'Executive Bandwidth', es: 'Capacidad disponible de equipo', ipa: '/ɪɡˈzɛkjətɪv ˈbændˌwɪdθ/', pinkStress: 'BAND-width', example: 'Let\'s tackle low-hanging fruit while we have firmware bandwidth.', exampleES: 'Atendamos mejoras rápidas mientras tenemos capacidad disponible en firmware.' },
        { en: 'Ballpark Estimate', es: 'Estimación aproximada', ipa: '/ˈbɔlˌpɑrk ˈɛstɪmət/', pinkStress: 'BALL-park ES-ti-mate', example: 'Give us a ballpark figure before tomorrow\'s CAPEX vote.', exampleES: 'Danos una cifra aproximada antes de la votación CAPEX de mañana.' },
        { en: 'Move the Needle', es: 'Generar impacto medible', ipa: '/muv ðə ˈnidəl/', pinkStress: 'move the NEE-dle', example: 'Parallel GPU batching will genuinely move the needle on throughput.', exampleES: 'El procesamiento paralelo en GPU realmente moverá la aguja en productividad.' },
        { en: 'Validation Rigor', es: 'Rigor de validación', ipa: '/ˌvælɪˈdeɪʃən ˈrɪɡər/', pinkStress: 'RI-gor', example: 'Safety remains non-negotiable across automated robotics.', exampleES: 'La seguridad sigue siendo innegociable en robótica automatizada.' }
      ],
      drills: [
        { q: 'Engineers ___ tuning the reinforcement-learning control loop all week.', opts: ['have been', 'has been', 'are been', 'were have'], ans: 0, exp: 'Present Perfect Continuous para proceso continuo reciente que continúa vigente ("have been tuning").', socraticHint: 'Acción prolongada hasta el presente ("all week").' },
        { q: '___, the current battery thermal dissipation margin is tighter than desired.', opts: ['Frankly', 'Deeply', 'Totally', 'Bitterly'], ans: 0, exp: 'Adverbio actitudinal al inicio de oración para transparencia ejecutiva: "Frankly".', socraticHint: 'Introduce sinceridad profesional al principio.' },
        { q: 'Our board is ___ concerned about single-source semiconductor risk.', opts: ['deeply', 'totally exhausted', 'entirely wrong', 'bitterly happy'], ans: 0, exp: 'Colocación estándar B2/C1: "deeply concerned" (profundamente preocupado).', socraticHint: '¿Qué intensificador coloca con "concerned"?' },
        { q: '___ Automation transforms manufacturing requires strict cybersecurity.', opts: ['Automation (zero article)', 'The Automation', 'An Automation', 'Automations'], ans: 0, exp: 'Conceptos abstractos en sentido general ("Automation", "Safety") no llevan artículo "The".', socraticHint: 'Concepto abstracto general sin artículo.' }
      ],
      dialogue: [
        { speaker: 'CTO', en: 'We have been profiling edge latency all month—can we touch base after QA?', es: 'Hemos estado midiendo latencia edge todo el mes—¿podemos ponernos al día tras QA?' },
        { speaker: 'Director', en: 'Yes, let\'s pick the low-hanging fruit that actually moves the needle this quarter.', es: 'Sí, elijamos las mejoras rápidas que realmente generen impacto este trimestre.' }
      ],
      readingQuestions: [
        { q: 'Read: "Frankly, we don\'t have the engineering bandwidth to build an in-house MES before Q3; let\'s integrate an off-the-shelf API." What does the speaker mean by "bandwidth"?', opts: ['Available team time and engineering capacity', 'Wi-Fi frequency spectrum', 'Fiber optic cable thickness', 'Financial debt limit'], ans: 0, exp: 'En jerga corporativa tecnológica de EE. UU., "bandwidth" significa capacidad/tiempo disponible del equipo.', socraticHint: 'Evita traducir literalmente como "ancho de banda" físico.' }
      ]
    },
    B2: {
      vocab: [
        { en: 'Continuous Telemetry', es: 'Telemetría continua', ipa: '/kənˈtɪnjuəs təˈlɛmətri/', pinkStress: 'te-LE-me-try', example: 'Sensors had been logging anomalies prior to shutdown.', exampleES: 'Los sensores llevaban registrando anomalías antes del paro.' },
        { en: 'Throughput Gain', es: 'Ganancia de capacidad productiva', ipa: '/ˈθruˌpʊt ɡeɪn/', pinkStress: 'THROUGH-put gain', example: 'It was edge caching that slashed API response times.', exampleES: 'Fue el caché en borde lo que recortó los tiempos de respuesta.' }
      ],
      drills: [
        { q: 'Seldom ___ a single firmware patch yield such dramatic power savings.', opts: ['does', 'did it was', 'is', 'has it been do'], ans: 0, exp: 'Adverbio negativo restrictivo inicial ("Seldom") dispara inversión auxiliar ("Seldom does a...").', socraticHint: 'Inversión con "Seldom".' }
      ],
      dialogue: [
        { speaker: 'Principal', en: 'Let\'s circle back on the tolerance stack-up trade-off.', es: 'Retomemos el balance técnico de acumulación de tolerancias.' },
        { speaker: 'Lead', en: 'Provided that yield holds at 99%, we are aligned.', es: 'Siempre y cuando el rendimiento se mantenga en 99%, estamos alineados.' }
      ],
      readingQuestions: [
        { q: 'Read: "By next quarter, the automated wafer handler will have completed 500,000 cycles." When is the milestone complete?', opts: ['By next quarter', 'Yesterday morning', 'Never', 'Within 5 seconds'], ans: 0, exp: '"will have completed" proyecta la finalización antes del próximo trimestre.', socraticHint: 'Verifica el horizonte temporal.' }
      ]
    },
    'c1-u1': {
      vocab: [
        { en: 'Systemic Nominalization', es: 'Nominalización técnica formal', ipa: '/sɪˈstɛmɪk ˌnɑmənələˈzeɪʃən/', pinkStress: 'no-mi-na-li-ZA-tion', example: 'The miniaturization of MEMS gyroscopes enabled wearable telemetry.', exampleES: 'La miniaturización de giroscopios MEMS habilitó la telemetría vestible.' },
        { en: 'Contractual Mechanism', es: 'Mecanismo contractual', ipa: '/kənˈtræktʃuəl ˈmɛkəˌnɪzəm/', pinkStress: 'ME-cha-nism', example: 'Zero-trust tokens are the protocol whereby workloads authenticate.', exampleES: 'Los tokens zero-trust son el protocolo mediante el cual se autentican cargas.' },
        { en: 'Mandative Clause', es: 'Cláusula de mandato subjuntivo', ipa: '/ˈmændətɪv klɔz/', pinkStress: 'MAN-da-tive clause', example: 'FDA compliance mandates that every test record be cryptographically signed.', exampleES: 'El cumplimiento FDA exige que todo registro sea firmado criptográficamente.' },
        { en: 'Lexical Density', es: 'Densidad léxica ejecutiva', ipa: '/ˈlɛksɪkəl ˈdɛnsəti/', pinkStress: 'DEN-si-ty', example: 'Having validated ASIC timing, the verification team signed off tape-out.', exampleES: 'Habiendo validado la temporización ASIC, el equipo aprobó el envío a fábrica.' }
      ],
      drills: [
        { q: 'ISO auditors stipulate that calibration logs ___ retained unedited for seven years.', opts: ['be', 'are being', 'would', 'to be'], ans: 0, exp: 'Mandative subjunctive tras "stipulate that" exige verbo en forma base ("be").', socraticHint: 'Usa el subjuntivo formal inglés (verbo base sin "s" ni "are").' },
        { q: 'Redundant interlocks constitute the failsafe architecture ___ catastrophic faults are prevented.', opts: ['whereby', 'whom', 'which in', 'that where'], ans: 0, exp: '"whereby" significa "por medio del cual / mediante el cual" en redacción técnica/legal.', socraticHint: 'Preposición relativa de mecanismo o procedimiento.' },
        { q: '___ through formal verification, the flight-control kernel demonstrated zero deadlock states.', opts: ['Verified', 'Verifying by', 'Having verify', 'To verified'], ans: 0, exp: 'Cláusula participial reducida pasiva inicia con participio pasado ("Verified...").', socraticHint: 'Cláusula participial reducida de significado pasivo.' },
        { q: 'Select the strongest C1 nominalized sentence:', opts: ['Thermal degradation triggered premature battery failure.', 'When the battery got hot it broke fast.', 'Because of hotness the cell ruined itself.', 'Thermal things degrade bad quickly.'], ans: 0, exp: '"Thermal degradation" y "premature battery failure" condensan verbos/adjetivos en prosa ejecutiva C1.', socraticHint: 'Convierte acciones verbales en frases nominales densas.' }
      ],
      dialogue: [
        { speaker: 'Principal Eng', en: 'Our MSA outlines the arbitration framework whereby cross-border IP disputes are settled.', es: 'Nuestro MSA detalla el marco arbitral mediante el cual se resuelven disputas de PI.' },
        { speaker: 'Counsel', en: 'Crucially, it is imperative that source-code escrow deposits be audited quarterly.', es: 'Crucialmente, es imperativo que los depósitos en custodia de código se auditen trimestralmente.' }
      ],
      readingQuestions: [
        { q: 'Read: "Whitepaper Extract: Having mitigated electromagnetic interference via shielded twisted pairs, sensor SNR rose 14 dB." What caused the 14 dB SNR gain?', opts: ['Mitigating EMI using shielded twisted pairs', 'Increasing cable length', 'Removing shielding', 'Lowering voltage'], ans: 0, exp: 'La cláusula participial perfecta ("Having mitigated...") explica la causa anterior directa.', socraticHint: 'Lee la cláusula inicial con "Having + V3".' }
      ]
    },
    'c1-u2': {
      vocab: [
        { en: 'Empirical Corroboration', es: 'Corroboración empírica', ipa: '/ɪmˈpɪrɪkəl kəˌrɑbəˈreɪʃən/', pinkStress: 'cor-ro-bo-RA-tion', example: 'Benchmarks corroborate the neural compiler speedup claim.', exampleES: 'Los benchmarks corroboran la afirmación de aceleración del compilador.' },
        { en: 'Causal Attribution', es: 'Atribución causal forense', ipa: '/ˈkɔzəl ˌætrəˈbjuʃən/', pinkStress: 'at-tri-BU-tion', example: 'Solder reflow thermal spikes may well have fractured the ceramic die.', exampleES: 'Picos térmicos en reflujo bien pudieron haber fracturado el dado cerámico.' },
        { en: 'Ubiquitous Adoption', es: 'Adopción ubicua / generalizada', ipa: '/juˈbɪkwətəs əˈdɑpʃən/', pinkStress: 'u-BI-qui-tous', example: 'Notwithstanding higher upfront CAPEX, silicon-carbide inverters yield lifetime ROI.', exampleES: 'No obstante el CAPEX inicial mayor, los inversores SiC rinden retorno de vida útil.' },
        { en: 'Unprecedented Trajectory', es: 'Trayectoria sin precedentes', ipa: '/ʌnˈprɛsɪdəntɪd trəˈdʒɛktəri/', pinkStress: 'tra-JEC-to-ry', example: 'Albeit computationally expensive, formal verification eliminates race conditions.', exampleES: 'Aunque costosa en cómputo, la verificación formal elimina condiciones de carrera.' }
      ],
      drills: [
        { q: '___ promising laboratory efficiency, cryogenic cooling remains impractical for consumer vehicles.', opts: ['Albeit', 'Inasmuch', 'Thereby', 'Notwithstanding of'], ans: 0, exp: '"Albeit" introduce concesión directa antes de un adjetivo o frase corta ("Albeit promising...").', socraticHint: 'Equivalente elegante C1 a "although it is".' },
        { q: 'Edge inference offloads cloud traffic, ___ slashing cellular bandwidth costs by 62%.', opts: ['thereby', 'conversely', 'albeit', 'lest'], ans: 0, exp: '"thereby + V-ing" expresa resultado instrumental directo de la acción principal.', socraticHint: 'Conector que introduce consecuencia inmediata + gerundio.' },
        { q: 'Our reliability team ___ manually retested 100 units—the diagnostic script had already verified every hash.', opts: ["needn't have", 'may well have', 'could hardly to have', 'should have been'], ans: 0, exp: '"needn\'t have + V3" indica esfuerzo pasado innecesario porque ya estaba cubierto.', socraticHint: 'Se hizo trabajo duplicado que no hacía falta.' },
        { q: 'Empirical evidence ___ our hypothesis regarding high-frequency switching losses.', opts: ['corroborates', 'exacerbates', 'postpones', 'fabricates'], ans: 0, exp: 'Colocación científica estándar: "empirical evidence corroborates a hypothesis".', socraticHint: 'Respalda o confirma con datos experimentales.' }
      ],
      dialogue: [
        { speaker: 'R&D Lead', en: 'In light of Q2 failure telemetry, capacitor derating may well have prolonged inverter lifespan.', es: 'A la luz de la telemetría Q2, reducir el estrés del capacitor bien pudo prolongar la vida del inversor.' },
        { speaker: 'Peer Reviewer', en: 'Granted; nonetheless, anomalous switching harmonics could hardly have stemmed from thermal drift alone.', es: 'Concedido; no obstante, los armónicos anómalos difícilmente pudieron originarse solo por deriva térmica.' }
      ],
      readingQuestions: [
        { q: 'Read: "Inasmuch as wafer defects correlate strongly with humidity spikes, cleanroom HVAC upgrades will mitigate yield degradation." What justifies the HVAC upgrade?', opts: ['Wafer defects correlate strongly with humidity spikes', 'Air conditioning looks modern', 'Wafer demand fell', 'Humidity lowers defects'], ans: 0, exp: '"Inasmuch as" introduce la premisa causal verificada que fundamenta la inversión.', socraticHint: 'Identifica la causa tras "Inasmuch as".' }
      ]
    },
    'c1-u3': {
      vocab: [
        { en: 'Diplomatic Containment', es: 'Contención diplomática de crisis', ipa: '/ˌdɪpləˈmætɪk kənˈteɪnmənt/', pinkStress: 'con-TAIN-ment', example: 'Zero-trust isolation contained the API anomaly within four minutes.', exampleES: 'El aislamiento zero-trust contuvo la anomalía API en cuatro minutos.' },
        { en: 'Dialectical Concession', es: 'Concesión dialéctica', ipa: '/ˌdaɪəˈlɛktɪkəl kənˈsɛʃən/', pinkStress: 'con-CES-sion', example: 'Granted, monoliths simplify initial prototyping; yet microservices decouple scaling.', exampleES: 'Concedido, los monolitos simplifican prototipos; sin embargo microservicios desacoplan escala.' },
        { en: 'Stylistic Inversion', es: 'Inversión retórica de énfasis', ipa: '/staɪˈlɪstɪk ɪnˈvɜrʒən/', pinkStress: 'in-VER-sion', example: 'Not until end-to-end encryption rotated did latency stabilize completely.', exampleES: 'No fue sino hasta que rotó el cifrado que la latencia se estabilizó.' },
        { en: 'Correlation vs Causation', es: 'Correlación vs causalidad', ipa: '/ˌkɔrəˈleɪʃən ˈvɜrsəs kɔˈzeɪʃən/', pinkStress: 'cau-SA-tion', example: 'Playing devil\'s advocate, could packet loss mirror DNS throttling instead?', exampleES: 'Haciendo de abogado del diablo, ¿podría la pérdida reflejar límite DNS?' }
      ],
      drills: [
        { q: 'Not until the kernel memory leak was patched ___ container restarts cease.', opts: ['did', 'had did', 'were', 'do'], ans: 0, exp: '"Not until [cláusula]..." al inicio obliga inversión en la cláusula principal ("did container restarts cease").', socraticHint: 'Observa el tiempo pasado "was patched" → auxiliar "did".' },
        { q: '___ our telemetry redundancy that tier-1 automotive clients stayed completely unaffected.', opts: ['Such was', 'So were', 'Too was', 'Albeit'], ans: 0, exp: '"Such was + frase nominal + that..." enfatiza la magnitud retórica C1.', socraticHint: 'Énfasis retórico formal con sustantivo ("our telemetry redundancy").' },
        { q: 'In RFC architecture review, distinguish correlation from ___ before refactoring storage.', opts: ['causation', 'mitigation', 'precedent', 'exacerbation'], ans: 0, exp: 'Principio analítico C1: "distinguish correlation from causation".', socraticHint: 'Dos eventos simultáneos no implican que uno cause al otro.' },
        { q: 'Effective crisis briefings follow Concession – ___ – Action to rebuild executive trust.', opts: ['Bridge', 'Blame', 'Panic', 'Denial'], ans: 0, exp: 'Marco de comunicación ejecutiva: reconocer impacto (Concession), encuadrar solución (Bridge), comprometer fecha (Action).', socraticHint: 'Elemento puente entre el reconocimiento y la acción.' }
      ],
      dialogue: [
        { speaker: 'Incident Cmdr', en: 'Not only did we isolate the rogue microservice, but zero customer PII was exposed.', es: 'No solo aislamos el microservicio anómalo, sino que cero datos personales quedaron expuestos.' },
        { speaker: 'Client CTO', en: 'Granted, containment was swift; yet what structural safeguard prevents recurrence?', es: 'Concedido, la contención fue rápida; pero ¿qué salvaguarda estructural evita recurrencia?' }
      ],
      readingQuestions: [
        { q: 'Read: "RFC Debate: Formidable though monolithic latency benchmarks appear, single-point deployment creates systemic blast-radius risk." What is the author\'s main concern?', opts: ['Systemic blast-radius risk from single-point deployment', 'Monoliths lack benchmarks', 'Deployment is too cheap', 'Latency is zero'], ans: 0, exp: 'La concesión frontada ("Formidable though...") cede rapidez pero enfatiza el riesgo sistémico.', socraticHint: 'Analiza la segunda mitad tras la concesión.' }
      ]
    },
    'c1-u4': {
      vocab: [
        { en: 'BLUF Executive Brief', es: 'Resumen BLUF (Conclusión al frente)', ipa: '/blʌf ɪɡˈzɛkjətɪv brif/', pinkStress: 'BLUF brief', example: 'Leading with BLUF, this $1.2M robotics cell delivers 14-month CAPEX payback.', exampleES: 'Empezando con BLUF, esta celda robótica de $1.2M retorna inversión en 14 meses.' },
        { en: 'Pragmatic Understatement', es: 'Atenuación diplomática pragmática', ipa: '/præɡˈmætɪk ˈʌndərˌsteɪtmənt/', pinkStress: 'un-der-STATE-ment', example: '"Slightly suboptimal firmware stability" in UK parlance signals a critical release blocker.', exampleES: '"Estabilidad ligeramente subóptima" en inglés británico alerta un bloqueo crítico.' },
        { en: 'Risk-Adjusted Payback', es: 'Retorno ajustado al riesgo', ipa: '/rɪsk əˈdʒʌstɪd ˈpeɪˌbæk/', pinkStress: 'PAY-back', example: 'Risk-adjusted NPV demonstrates clear superiority over manual inspection.', exampleES: 'El VPN ajustado al riesgo demuestra clara superioridad sobre inspección manual.' },
        { en: 'Face-Saving Dissent', es: 'Disenso diplomático constructivo', ipa: '/feɪs ˈseɪvɪŋ dɪˈsɛnt/', pinkStress: 'dis-SENT', example: 'I wonder if we might revisit thermal tolerances before finalizing the SLA.', exampleES: 'Me pregunto si podríamos revisar tolerancias térmicas antes de cerrar el SLA.' }
      ],
      drills: [
        { q: 'To command executive attention in CAPEX pitches, open with ___ (Bottom Line Up Front).', opts: ['BLUF', 'appendices', 'anecdotes', 'syntax history'], ans: 0, exp: 'BLUF coloca recomendación, costo y retorno en los primeros 30 segundos.', socraticHint: 'Conclusión cuantificada desde la primera oración.' },
        { q: 'When a British client calls your UI latency "a bit brave," they diplomatically mean it is ___.', opts: ['unacceptably slow or risky', 'courageously optimized', 'ready for launch', 'visually colorful'], ans: 0, exp: 'Understatement anglosajón suaviza críticas serias sin perder contundencia técnica.', socraticHint: 'Lee entre líneas la cortesía británica.' },
        { q: 'Never ___ fail-safe watchdog timers be bypassed during high-speed line commissioning.', opts: ['shall', 'must to', 'did to', 'were'], ans: 0, exp: 'Inversión negativa formal de cumplimiento ("Never shall...").', socraticHint: 'Auxiliar formal normativo para prohibición absoluta.' },
        { q: 'Which phrase exemplifies face-saving executive disagreement in boardrooms?', opts: ['"With respect to the timeline, I wonder if we might stress-test Phase 2 first."', '"Your architecture fails completely."', '"You missed every point."', '"This proposal is unusable."'], ans: 0, exp: 'Cushioning pragmático ("With respect to..., I wonder if...") cuestiona técnicamente sin confrontar personalmente.', socraticHint: 'Busca suavizadores estratégicos y enfoque en datos.' }
      ],
      dialogue: [
        { speaker: 'Founder', en: 'BLUF: Automating AOI solder inspection recovers $480K annually with an 11-month payback.', es: 'BLUF: Automatizar la inspección óptica recupera $480K al año con retorno en 11 meses.' },
        { speaker: 'Partner', en: 'I appreciate the throughput math; I wonder if we might stress-test supply chain lead times.', es: 'Aprecio las cifras de productividad; me pregunto si podríamos estresar los tiempos de suministro.' }
      ],
      readingQuestions: [
        { q: 'Read: "Boardroom Note: While UK partners called our prototype margin \'rather snug,\' US reviewers warned it had \'zero safety headroom.\'" What do both teams actually agree on?', opts: ['The prototype margin is dangerously tight', 'The prototype has huge safety slack', 'UK loves tight margins', 'US expects zero cost'], ans: 0, exp: 'Ambas culturas describen el mismo cuello de botella técnico con registros pragmáticos distintos.', socraticHint: 'Decodifica el understatement británico vs franqueza americana.' }
      ]
    },
    'C1-C2': {
      vocab: [
        { en: 'Systemic Redundancy', es: 'Redundancia sistémica crítica', ipa: '/sɪˈstɛmɪk rɪˈdʌndənsi/', pinkStress: 're-DUN-dan-cy', example: 'Active-active failover remains a cornerstone of distributed cloud resilience.', exampleES: 'La conmutación activo-activo sigue siendo pilar de resiliencia en la nube.' },
        { en: 'Architectural RFC', es: 'Propuesta de arquitectura RFC', ipa: '/ˌɑrkəˈtɛktʃərəl ɑrˌɛfˈsi/', pinkStress: 'ar-chi-TEC-tu-ral RFC', example: 'Peer scrutiny sharpened every assumption inside our telemetry RFC.', exampleES: 'El escrutinio entre pares afinó cada supuesto dentro de nuestra RFC.' }
      ],
      drills: [
        { q: 'Hardly ___ the firmware benchmark finished before investors requested a live demo.', opts: ['had', 'has', 'did have', 'was'], ans: 0, exp: 'Inversión negativa clásica: "Hardly had [S] finished before/when...".', socraticHint: 'Empareja Hardly con Past Perfect invertido ("had").' }
      ],
      dialogue: [
        { speaker: 'Chair', en: 'Empirical throughput data corroborates the whitepaper; any final counter-arguments?', es: 'Los datos empíricos corroboran el whitepaper; ¿algún contraargumento final?' },
        { speaker: 'Fellow', en: 'None on scalability; however, it is vital that edge encryption keys rotate daily.', es: 'Ninguno en escalabilidad; sin embargo, es vital que las llaves edge roten diario.' }
      ],
      readingQuestions: [
        { q: 'Read: "Executive Keynote: Redundancy is not overhead; rather, it is the insurance policy whereby mission-critical SLA uptime persists." How is redundancy framed?', opts: ['As mission-critical insurance for SLA persistence', 'As unnecessary waste', 'As an accounting glitch', 'As an optional UI skin'], ans: 0, exp: 'El discurso redefine redundancia como póliza indispensable de continuidad SLA.', socraticHint: 'Lee la segunda cláusula después de "rather".' }
      ]
    }
  };

  function normDedupeKey(str) {
    return String(str || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function parsePowerSheetDrills(cls) {
    const out = [];
    const ps = cls && cls.powerSheet;
    if (!ps || !Array.isArray(ps.fillBlanks) || !ps.answerKey) return out;
    const akMap = {};
    for (const m of String(ps.answerKey).matchAll(/(\d+)\)\s*([^·|;,\n]+)/g)) {
      akMap[m[1]] = m[2].trim();
    }
    const helperPool = ['am', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'should', 'must', 'can', 'might', 'be', 'being', 'been'];
    ps.fillBlanks.forEach((rawLine) => {
      const m = String(rawLine).match(/^(\d+)\.\s*(.+?)\s*\(([^)]+)\)\s*$/);
      if (!m || !akMap[m[1]]) return;
      const promptTxt = m[2].trim();
      const rawOpts = m[3].split('/').map((s) => s.trim()).filter(Boolean);
      const ansTxt = akMap[m[1]];
      if (!rawOpts.some((o) => o.toLowerCase() === ansTxt.toLowerCase())) {
        rawOpts.unshift(ansTxt);
      }
      const uniqueOpts = [...new Set(rawOpts)];
      // Expand 2-option Power Sheet prompts into richer 4-option checks deterministically
      for (let h = 0; h < helperPool.length && uniqueOpts.length < 4; h++) {
        const cand = helperPool[(h + (cls.classNum || 1)) % helperPool.length];
        if (!uniqueOpts.some((o) => o.toLowerCase() === cand.toLowerCase()) && !ansTxt.includes(' ')) {
          uniqueOpts.push(cand);
        }
      }
      const ansIdx = uniqueOpts.findIndex((o) => o.toLowerCase() === ansTxt.toLowerCase());
      if (ansIdx >= 0 && uniqueOpts.length >= 2) {
        out.push({
          q: promptTxt,
          opts: uniqueOpts,
          ans: ansIdx,
          exp: `Respuesta Power Sheet: "${ansTxt}". ${cls.goldenRuleES || cls.explanationES || ''}`.replace(/<[^>]+>/g, ''),
          socraticHint: cls.grammarFocus ? `Aplica: ${cls.grammarFocus}` : 'Aplica la regla gramatical de la clase.'
        });
      }
    });
    return out;
  }

  function buildErrorAndCognateDrills(cls) {
    const out = [];
    if (cls && cls.commonMistake && cls.commonMistake.bad && cls.commonMistake.good) {
      const goodChoice = String(cls.commonMistake.good).split('/')[0].trim();
      const badChoice = String(cls.commonMistake.bad).split('/')[0].trim();
      if (goodChoice && badChoice && goodChoice.toLowerCase() !== badChoice.toLowerCase()) {
        out.push({
          q: `Error Detection (ES -> EN): Select the grammatically accurate engineering English sentence.`,
          opts: [goodChoice, badChoice],
          ans: 0,
          exp: cls.commonMistake.exp || 'Evita la interferencia directa del español.',
          socraticHint: 'Revisa sujeto, auxiliar, orden y preposiciones exactas.'
        });
      }
    }
    if (cls && cls.falseCognate && cls.falseCognate.term && cls.falseCognate.correct && cls.falseCognate.mistake) {
      out.push({
        q: `Precision Alert — What does "${cls.falseCognate.term}" mean in authentic US engineering English?`,
        opts: [
          cls.falseCognate.correct,
          cls.falseCognate.mistake,
          'Ignorar la especificación de calidad en el turno',
          'Cancelar la verificación normativa sin registro'
        ],
        ans: 0,
        exp: cls.falseCognate.tip || 'Falso cognado frecuente entre español técnico e inglés industrial.',
        socraticHint: 'Cuidado con falsos amigos que parecen iguales en español.'
      });
    }
    return out;
  }

  function pushUniqueBy(targetArr, seenSet, items, keyGetter, mapper) {
    (items || []).forEach((item) => {
      if (!item) return;
      const mapped = mapper ? mapper(item) : item;
      const key = normDedupeKey(keyGetter(mapped));
      if (!key || seenSet.has(key)) return;
      seenSet.add(key);
      targetArr.push(mapped);
    });
  }

  function buildVocabClozeExercises(vocabList, level) {
    const out = [];
    if (!Array.isArray(vocabList) || vocabList.length < 3) return out;
    vocabList.forEach((v, idx) => {
      const term = String(v.en || v.term || '').trim();
      const meaning = String(v.es || v.translation || '').trim();
      const ex = String(v.example || '').trim();
      if (!term || !meaning) return;
      // Pick 3 unique meanings or terms from other items as distractors
      const others = vocabList.filter((_, i) => i !== idx);
      // Case A: Contextual cloze when example explicitly contains the term (clean single word/phrase)
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const termRe = new RegExp(`\\b${escapedTerm}\\b`, 'i');
      if (ex && termRe.test(ex)) {
        const blanked = ex.replace(termRe, '_____');
        const distTerms = others.map((o) => o.en || o.term).filter((t) => t && t.toLowerCase() !== term.toLowerCase()).slice(0, 3);
        if (distTerms.length >= 2) {
          const opts = [term, ...distTerms];
          out.push({
            q: `Complete the ${level || 'Tech'} technical sentence: "${blanked}"`,
            opts: opts,
            ans: 0,
            exp: `"${term}" (${meaning}) completes the technical usage naturally: ${ex}`,
            socraticHint: v.exampleES || `Busca el término que significa "${meaning}".`
          });
          return;
        }
      }
      // Case B: Definition-to-term matching MCQ
      const distTerms = others.map((o) => o.en || o.term).filter((t) => t && t.toLowerCase() !== term.toLowerCase()).slice(0, 3);
      if (distTerms.length >= 2) {
        out.push({
          q: `Which ${level || 'STEM'} English term means "${meaning}"?`,
          opts: [term, ...distTerms],
          ans: 0,
          exp: `${term} = ${meaning}.${ex ? ' Example: ' + ex : ''}`,
          socraticHint: v.pinkStress ? `Stress: ${v.pinkStress}` : `Relaciona el concepto con "${meaning}".`
        });
      }
    });
    return out;
  }

  function getModularityTemplates() {
    return Object.values(MODULARITY_TEMPLATES);
  }

  function getAllClasses() {
    return CLASSES.slice();
  }

  function getClassesByLevel(level) {
    if (!level || level === 'ALL') return CLASSES.slice();
    const norm = String(level).toUpperCase().trim();
    if (norm === 'C1' || norm === 'C2' || norm === 'C1-C2' || norm === 'C1_C2') {
      return CLASSES.filter((c) => c.level === 'C1-C2');
    }
    return CLASSES.filter((c) => c.level.toUpperCase() === norm);
  }

  function getClassesByUnit(unitId) {
    if (!unitId) return [];
    const norm = String(unitId).toLowerCase().trim();
    return CLASSES.filter((c) => c.unitId === norm);
  }

  function getClassById(id) {
    if (!id) return null;
    return CLASSES_BY_ID[id] || CLASSES_BY_ID[String(id).toUpperCase()] || CLASSES_BY_ID[String(id).toLowerCase()] || null;
  }

  function rotateSlice(arr, offset) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    const shift = ((offset % arr.length) + arr.length) % arr.length;
    return arr.slice(shift).concat(arr.slice(0, shift));
  }

  function shuffleDrillDeterministic(d, seed) {
    if (!d || !Array.isArray(d.opts) || d.opts.length < 2) return d;
    const correctIdx = (typeof d.ans === 'number' && d.ans >= 0 && d.ans < d.opts.length) ? d.ans : 0;
    const correctVal = d.opts[correctIdx];
    const items = d.opts.map((opt, i) => ({ opt, hash: ((i + 1) * 37 + seed * 13 + String(opt).length * 7 + String(d.q || '').length) % 97 }));
    items.sort((a, b) => a.hash - b.hash);
    const newOpts = items.map((x) => x.opt);
    const newAns = newOpts.indexOf(correctVal);
    return Object.assign({}, d, {
      opts: newOpts,
      ans: newAns >= 0 ? newAns : 0
    });
  }

  function toRunnableUnit(clsOrId) {
    const cls = typeof clsOrId === 'string' ? getClassById(clsOrId) : clsOrId;
    if (!cls) return null;

    const rootGlobal = (typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : {}));
    const tracksApi = rootGlobal.STEMOS_MCER_TRACKS;
    const parentUnit = (tracksApi && typeof tracksApi.getUnitById === 'function')
      ? tracksApi.getUnitById(cls.unitId)
      : null;

    const siblingsSameUnit = CLASSES.filter((c) => c.unitId === cls.unitId && c.id !== cls.id);
    const siblingsSameLevel = CLASSES.filter((c) => c.level === cls.level && c.unitId !== cls.unitId);
    const rotOffset = Math.max(0, (cls.classNum || 1) - 1);
    const rotatedUnitSibs = rotateSlice(siblingsSameUnit, rotOffset);
    const rotatedLevelSibs = rotateSlice(siblingsSameLevel, rotOffset);

    const clusterBank = CEFR_TECH_SUPPLEMENT_BANK[cls.unitId] || {};
    const levelBank = CEFR_TECH_SUPPLEMENT_BANK[cls.level] || CEFR_TECH_SUPPLEMENT_BANK.A1;
    const sameLevelBanks = Object.keys(CEFR_TECH_SUPPLEMENT_BANK)
      .filter((k) => k.startsWith(cls.id.slice(0, 2) + '-u') && k !== cls.unitId)
      .map((k) => CEFR_TECH_SUPPLEMENT_BANK[k]);

    // 1. Vocabulary (>= 10 unique tech items)
    const vocabSeen = new Set();
    const mergedVocab = [];
    const mapVocab = (v) => Object.assign({}, v, {
      en: v.en || v.term || 'Technical Term',
      es: v.es || v.translation || 'Término técnico',
      term: v.en || v.term || 'Technical Term',
      sample: v.example || v.sample || ''
    });
    pushUniqueBy(mergedVocab, vocabSeen, cls.vocab, (v) => v.en, mapVocab);
    pushUniqueBy(mergedVocab, vocabSeen, clusterBank.vocab, (v) => v.en, mapVocab);
    if (parentUnit && parentUnit.vocabulary) {
      pushUniqueBy(mergedVocab, vocabSeen, parentUnit.vocabulary, (v) => v.en || v.term, mapVocab);
    }
    rotatedUnitSibs.forEach((sib) => {
      if (mergedVocab.length < 16) pushUniqueBy(mergedVocab, vocabSeen, sib.vocab, (v) => v.en, mapVocab);
    });
    pushUniqueBy(mergedVocab, vocabSeen, levelBank.vocab, (v) => v.en, mapVocab);
    if (mergedVocab.length < 10) {
      rotatedLevelSibs.forEach((sib) => {
        if (mergedVocab.length < 12) pushUniqueBy(mergedVocab, vocabSeen, sib.vocab, (v) => v.en, mapVocab);
      });
    }

    // 2. Grammar Drills (>= 10 unique CEFR + Tech drills)
    const drillSeen = new Set();
    const mergedDrills = [];
    const toStdDrill = (d) => ({
      q: d.q || d.question || '',
      opts: d.opts || d.options || [],
      ans: typeof d.ans === 'number' ? d.ans : (d.answer || 0),
      exp: d.exp || d.explanation || '',
      socraticHint: d.socraticHint || ''
    });
    const mapDrillFinal = (d) => Object.assign({}, d, {
      question: d.q,
      options: d.opts,
      answer: d.ans,
      explanation: d.exp
    });

    pushUniqueBy(mergedDrills, drillSeen, cls.drills, (d) => d.q, (d) => mapDrillFinal(toStdDrill(d)));
    const psDrills = parsePowerSheetDrills(cls).map((d, i) => shuffleDrillDeterministic(d, (cls.classNum || 1) + i + 3));
    pushUniqueBy(mergedDrills, drillSeen, psDrills, (d) => d.q, mapDrillFinal);
    const ownTrapDrills = buildErrorAndCognateDrills(cls).map((d, i) => shuffleDrillDeterministic(d, (cls.classNum || 1) + i + 7));
    pushUniqueBy(mergedDrills, drillSeen, ownTrapDrills, (d) => d.q, mapDrillFinal);
    const clusterDrills = (clusterBank.drills || []).map((d, i) => shuffleDrillDeterministic(d, (cls.classNum || 1) + i + 11));
    pushUniqueBy(mergedDrills, drillSeen, clusterDrills, (d) => d.q, mapDrillFinal);
    if (parentUnit && parentUnit.grammarDrills) {
      pushUniqueBy(mergedDrills, drillSeen, parentUnit.grammarDrills, (d) => d.q || d.question, (d) => mapDrillFinal(toStdDrill(d)));
    }
    rotatedUnitSibs.forEach((sib) => {
      if (mergedDrills.length < 14) {
        pushUniqueBy(mergedDrills, drillSeen, sib.drills, (d) => d.q, (d) => mapDrillFinal(toStdDrill(d)));
      }
    });
    const lvlDrills = (levelBank.drills || []).map((d, i) => shuffleDrillDeterministic(d, (cls.classNum || 1) + i + 17));
    pushUniqueBy(mergedDrills, drillSeen, lvlDrills, (d) => d.q, mapDrillFinal);
    if (mergedDrills.length < 10) {
      rotatedLevelSibs.forEach((sib) => {
        if (mergedDrills.length < 12) {
          pushUniqueBy(mergedDrills, drillSeen, sib.drills, (d) => d.q, (d) => mapDrillFinal(toStdDrill(d)));
        }
      });
    }

    // 3. Dialogue Lines (>= 8 unique realistic turns)
    const dlgSeen = new Set();
    const mergedDialogue = [];
    const mapDlg = (l) => Object.assign({}, l, {
      speaker: l.speaker || 'Engineer',
      en: l.en || l.text || '',
      es: l.es || l.translation || '',
      text: l.en || l.text || '',
      translation: l.es || l.translation || ''
    });
    pushUniqueBy(mergedDialogue, dlgSeen, cls.dialogue, (l) => l.en, mapDlg);
    pushUniqueBy(mergedDialogue, dlgSeen, clusterBank.dialogue, (l) => l.en, mapDlg);
    if (parentUnit && parentUnit.dialogue && parentUnit.dialogue.lines) {
      pushUniqueBy(mergedDialogue, dlgSeen, parentUnit.dialogue.lines, (l) => l.en || l.text, mapDlg);
    }
    rotatedUnitSibs.forEach((sib) => {
      if (mergedDialogue.length < 12) pushUniqueBy(mergedDialogue, dlgSeen, sib.dialogue, (l) => l.en, mapDlg);
    });
    pushUniqueBy(mergedDialogue, dlgSeen, levelBank.dialogue, (l) => l.en, mapDlg);
    if (mergedDialogue.length < 8) {
      rotatedLevelSibs.forEach((sib) => {
        if (mergedDialogue.length < 10) pushUniqueBy(mergedDialogue, dlgSeen, sib.dialogue, (l) => l.en, mapDlg);
      });
    }

    // 4. Vocabulary Exercises (>= 8 unique contextual cloze / meaning exercises)
    const vExSeen = new Set();
    const mergedVocabEx = [];
    if (parentUnit && parentUnit.vocabularyExercises) {
      pushUniqueBy(mergedVocabEx, vExSeen, parentUnit.vocabularyExercises, (e) => e.q || e.question, (e) => mapDrillFinal(toStdDrill(e)));
    }
    const generatedClozes = buildVocabClozeExercises(mergedVocab, cls.level).map((d, i) =>
      shuffleDrillDeterministic(d, (cls.classNum || 1) + i + 23)
    );
    pushUniqueBy(mergedVocabEx, vExSeen, generatedClozes, (d) => d.q, mapDrillFinal);

    // 5. Reading & Context Questions (>= 8 unique reading/error-radar/spec questions)
    const readSeen = new Set();
    const mergedReadingQs = [];
    const mapReadQ = (rq) => ({
      q: rq.q || rq.question || '',
      opts: rq.opts || rq.options || [],
      ans: typeof rq.ans === 'number' ? rq.ans : (rq.answer || 0),
      exp: rq.exp || rq.explanation || '',
      socraticHint: rq.socraticHint || ''
    });
    pushUniqueBy(mergedReadingQs, readSeen, (clusterBank.readingQuestions || []).map((d, i) => shuffleDrillDeterministic(d, i + 5)), (d) => d.q, mapReadQ);
    pushUniqueBy(mergedReadingQs, readSeen, ownTrapDrills, (d) => d.q, mapReadQ);
    if (parentUnit && parentUnit.reading && parentUnit.reading.questions) {
      pushUniqueBy(mergedReadingQs, readSeen, parentUnit.reading.questions, (d) => d.q || d.question, mapReadQ);
    }
    pushUniqueBy(mergedReadingQs, readSeen, psDrills, (d) => d.q, mapReadQ);
    pushUniqueBy(mergedReadingQs, readSeen, (levelBank.readingQuestions || []).map((d, i) => shuffleDrillDeterministic(d, i + 19)), (d) => d.q, mapReadQ);
    sameLevelBanks.forEach((b) => {
      if (mergedReadingQs.length < 10 && b && b.readingQuestions) {
        pushUniqueBy(mergedReadingQs, readSeen, b.readingQuestions.map((d, i) => shuffleDrillDeterministic(d, i + 31)), (d) => d.q, mapReadQ);
      }
    });
    rotatedUnitSibs.forEach((sib) => {
      if (mergedReadingQs.length < 10) {
        const sibTraps = buildErrorAndCognateDrills(sib).map((d, i) => shuffleDrillDeterministic(d, i + 13));
        const sibPs = parsePowerSheetDrills(sib).map((d, i) => shuffleDrillDeterministic(d, i + 29));
        pushUniqueBy(mergedReadingQs, readSeen, sibTraps, (d) => d.q, mapReadQ);
        pushUniqueBy(mergedReadingQs, readSeen, sibPs, (d) => d.q, mapReadQ);
      }
    });
    if (mergedReadingQs.length < 8) {
      pushUniqueBy(mergedReadingQs, readSeen, mergedDrills, (d) => d.q, mapReadQ);
    }

    // 6. Unit Quiz / Boss Synthesis (>= 10 unique synthesis checks)
    const quizSeen = new Set();
    const mergedQuiz = [];
    pushUniqueBy(mergedQuiz, quizSeen, cls.drills, (d) => d.q, (d) => mapDrillFinal(toStdDrill(d)));
    if (parentUnit && parentUnit.unitQuiz) {
      pushUniqueBy(mergedQuiz, quizSeen, parentUnit.unitQuiz, (d) => d.q || d.question, (d) => mapDrillFinal(toStdDrill(d)));
    }
    pushUniqueBy(mergedQuiz, quizSeen, mergedReadingQs, (d) => d.q, mapDrillFinal);
    pushUniqueBy(mergedQuiz, quizSeen, mergedDrills, (d) => d.q, mapDrillFinal);

    const readingPassage = (parentUnit && parentUnit.reading && (parentUnit.reading.text || parentUnit.reading.passage))
      || (cls.explanationES ? String(cls.explanationES).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : cls.canDo);

    return {
      id: cls.id,
      unitId: cls.unitId,
      parentUnitId: cls.unitId,
      isModularClass: true,
      level: cls.level,
      cefr: cls.level,
      unitNumber: cls.classNum,
      modulo: `Clase ${String(cls.classNum).padStart(2, '0')}`,
      classNum: cls.classNum,
      coreType: cls.coreType,
      eaqualsRef: cls.eaqualsRef,
      modularity: cls.modularity,
      modularityMeta: cls.modularityMeta,
      hasSlides: !!cls.hasSlides,
      slidesDeck: cls.slidesDeck || [],
      durationMinutes: cls.durationMinutes || 50,
      onlinePracticeMinutes: cls.onlinePracticeMinutes || 18,
      estimatedDuration: `${cls.durationMinutes || 50} min (${cls.onlinePracticeMinutes || 18}m online)`,
      hours: cls.accreditedHours,
      xp: cls.xp,
      title: cls.title,
      titleES: cls.titleES,
      grammarFocus: cls.grammarFocus,
      canDo: cls.canDo,
      industryContext: cls.industryContext,
      warmupPrompt: cls.warmupPrompt,
      grammarBox: {
        title: cls.titleES,
        formula: cls.grammarFormulaHtml,
        explanation: cls.explanationES,
        explanationES: cls.explanationES,
        goldenRule: cls.goldenRuleES,
        tipsES: cls.goldenRuleES,
        commonMistake: cls.commonMistake
      },
      falseCognates: cls.falseCognate ? [cls.falseCognate] : [],
      falseCognate: cls.falseCognate || null,
      vocabulary: mergedVocab,
      vocabularyExercises: mergedVocabEx,
      grammarDrills: mergedDrills,
      unitQuiz: mergedQuiz,
      dialogue: {
        context: cls.industryContext,
        lines: mergedDialogue
      },
      reading: {
        title: cls.titleES || cls.title,
        text: readingPassage,
        passage: readingPassage,
        questions: mergedReadingQs
      },
      readingQuestions: mergedReadingQs,
      listeningLab: {
        title: `Audio Lab · ${cls.titleES || cls.title}`,
        transcript: mergedDialogue.map((l) => l.en).join(' '),
        questions: mergedDrills.slice(0, 6).map((d) => ({
          q: d.q,
          options: d.opts,
          answer: d.ans,
          exp: d.exp,
          socraticHint: d.socraticHint
        }))
      },
      writingLab: {
        prompt: (cls.powerSheet && cls.powerSheet.writePrompt) || cls.canDo,
        sampleAnswer: (cls.powerSheet && cls.powerSheet.answerKey) || ''
      },
      instructionalPhases: cls.instructionalPhases || [],
      duoSteps: cls.duoSteps || [],
      classroomActivity: cls.classroomActivity,
      powerSheet: cls.powerSheet
    };
  }

  function getCefrCoverageSummary() {
    const byLevel = {};
    const byModularity = {};
    CLASSES.forEach((c) => {
      byLevel[c.level] = (byLevel[c.level] || 0) + 1;
      byModularity[c.modularity] = (byModularity[c.modularity] || 0) + 1;
    });
    return {
      totalClasses: CLASSES.length,
      byLevel,
      byModularity,
      slidesCount: CLASSES.filter((c) => c.hasSlides).length
    };
  }

  function searchClasses(query) {
    const q = String(query || '').toLowerCase().trim();
    if (!q) return CLASSES.slice();
    return CLASSES.filter((c) => {
      const hay = [c.id, c.unitId, c.level, c.title, c.titleES, c.grammarFocus, c.canDo, c.industryContext]
        .concat((c.vocab || []).map((v) => `${v.en} ${v.es}`))
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }

  return {
    version: '2026.11-mcer-50m-v1',
    modularityTemplates: MODULARITY_TEMPLATES,
    getModularityTemplates,
    getAllClasses,
    getClassesByLevel,
    getClassesByUnit,
    getClassById,
    toRunnableUnit,
    getCefrCoverageSummary,
    searchClasses
  };
}));

