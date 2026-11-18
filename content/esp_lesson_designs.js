/**
 * ==============================================================================
 * stemOS LXP — Diseños Instruccionales 50 Minutos para Modularidades ESP & Carreras
 * Envuelve las 4 modularidades de Career Paths / Courses:
 *   1) theory        — Fundamentos Técnicos & Terminología Industrial (50 min)
 *   2) english-b1    — Inglés Técnico Aplicado (SOPs, Reportes, Negociación) (50 min)
 *   3) practical-lab — Laboratorio Práctico & Diagnóstico en Escenario (50 min)
 *   4) milestone     — Evaluación Integradora & Acreditación Hito (50 min)
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
    root.STEMOS_ESP_DESIGNS = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_ESP_DESIGNS = result;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const ESP_MODULARITY_TEMPLATES = {
    'theory': {
      id: 'theory',
      name: 'Modularidad ESP-1: Fundamentos Técnicos & Léxico Industrial (50 min)',
      badge: 'TEORÍA + LÉXICO 50m',
      hasSlides: true,
      totalMinutes: 50,
      onlineDuoMinutes: 17,
      focus: 'Dominio conceptual de arquitectura/normativa técnica (ISO/IEC/IEEE) con traducción bilingüe y acento técnico.',
      phases: [
        { block: '00–05 min', phase: 'Ignición Industrial', desc: 'Plantea 1 caso real de planta o falla costosa relacionada con la norma técnica del día.' },
        { block: '05–16 min', phase: 'Blueprint Técnico (+ Slides)', desc: 'Disección visual del estándar (ej. Purdue, LOTO, ACES, IATF) + 6 términos críticos con IPA y colocaciones.' },
        { block: '16–28 min', phase: 'Mapeo Técnico en Equipo', desc: 'Equipos etiquetan un diagrama o flujo técnico en inglés y traducen especificaciones críticas sin glosario.' },
        { block: '28–45 min', phase: 'Reto Online Duolingo (17 min)', desc: 'Secuencia en app.html: Technical Vocab Sprint (4m) + Reading Brief (5m) + Collocation Builder (4m) + Quiz (4m).' },
        { block: '45–50 min', phase: 'Exit Ticket & Power Sheet', desc: 'Verificación de 3 colocaciones clave y entrega/descarga del Power Sheet ESP de 1 hoja.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Tech Vocab Sprint', minutes: 4 },
        { step: 2, type: 'sentence_builder', title: 'Spec Builder', minutes: 4 },
        { step: 3, type: 'listening', title: 'Technical Audio Lab', minutes: 5 },
        { step: 4, type: 'grammar_drills', title: 'Concept Quiz', minutes: 4 }
      ],
      activityTemplate: {
        title: 'Etiquetado Bilingüe de Arquitectura / Norma Industrial',
        grouping: 'Parejas o Tríos técnicos',
        materials: 'Diagrama en proyector + Power Sheet ESP (Sección Mapa/Términos)',
        steps: [
          'Cada pareja identifica 4 términos en inglés del estándar de hoy y redacta 1 colocación operativa real en piso.',
          'Intercambian hojas y verifican precisión conceptual usando el estándar normativo citado.'
        ]
      }
    },
    'english-b1': {
      id: 'english-b1',
      name: 'Modularidad ESP-2: Comunicación Técnica & Turnos en Inglés (50 min)',
      badge: 'ENGLISH LAB 50m',
      hasSlides: true,
      totalMinutes: 50,
      onlineDuoMinutes: 18,
      focus: 'Uso funcional de inglés operativo en cambios de turno (shift handoffs), SOPs, reportes 8D y juntas técnicas.',
      phases: [
        { block: '00–05 min', phase: 'Audio Real de Piso / Junta', desc: 'Escucha breve de intercambio técnico en inglés sin texto y extracción del problema principal.' },
        { block: '05–15 min', phase: 'Estructura & Registro (+ Slides)', desc: 'Fórmula comunicativa del módulo (SOP imperativo, 8D pasivo o pitching técnico) + 1 alerta de falso cognado.' },
        { block: '15–27 min', phase: 'Roleplay Shift Handoff / Ticket', desc: 'Práctica oral cronometrada simulando entrega de turno, escalación a proveedor o defensa técnica en inglés.' },
        { block: '27–45 min', phase: 'Reto Online Duolingo (18 min)', desc: 'Vocab Sprint (3m) + Sentence Builder (4m) + Audio Lab (4m) + Writing & Drills (4m) + Voice Check (3m).' },
        { block: '45–50 min', phase: 'Exit Ticket & Power Sheet', desc: 'Revisión de plantilla de reporte/frase clave y descarga del Power Sheet bilingüe.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Phrase Sprint', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Report Builder', minutes: 4 },
        { step: 3, type: 'listening', title: 'Handoff Audio Lab', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'SOP & Grammar Check', minutes: 4 },
        { step: 5, type: 'voice_crucible', title: 'Voice Handoff', minutes: 3 }
      ],
      activityTemplate: {
        title: 'Simulación Shift Handoff / Escalación Técnica Bilingüe',
        grouping: 'Parejas (Ingeniero Saliente / Supervisor EE. UU.)',
        materials: 'Bitácora de falla + Power Sheet ESP',
        steps: [
          'En 90 segundos el ingeniero saliente reporta estado, incidencia e instrucción usando las frases del módulo.',
          'El supervisor formula 2 preguntas de aclaración exigiendo precisión de datos/tiempos en inglés.'
        ]
      }
    },
    'practical-lab': {
      id: 'practical-lab',
      name: 'Modularidad ESP-3: Laboratorio Práctico & Diagnóstico en Simulador (50 min)',
      badge: 'LAB SIM 50m',
      hasSlides: false,
      totalMinutes: 50,
      onlineDuoMinutes: 19,
      focus: 'Toma de decisiones en crisis técnica, telemetría SCADA, aislamiento LOTO y troubleshooting bajo reloj.',
      phases: [
        { block: '00–05 min', phase: 'Alerta de Telemetría (Incidente)', desc: 'Presentación del estado anómalo (alarma, paro de línea o caída de nodo) y restricción de tiempo.' },
        { block: '05–14 min', phase: 'Protocolo de Contención & Vocabulario Crítico', desc: 'Revisión rápida del árbol de decisión técnico y comandos de seguridad en inglés.' },
        { block: '14–26 min', phase: 'War Room en Tríos (Checklist)', desc: 'Resolución colaborativa de pasos de diagnóstico ordenando secuencia de aislamiento/recuperación.' },
        { block: '26–45 min', phase: 'Simulador & Reto Online Duolingo (19 min)', desc: 'Ejecución del simulador de laboratorio + verificación de protocolo y diagnóstico en app.html.' },
        { block: '45–50 min', phase: 'Bitácora de Cierre & Power Sheet', desc: 'Registro del root cause en el Power Sheet de 1 hoja para portafolio de evidencias.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Safety & Fault Terms', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Procedure Sequencing', minutes: 5 },
        { step: 3, type: 'listening', title: 'Alert Comprehension', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'Troubleshooting Lab', minutes: 7 }
      ],
      activityTemplate: {
        title: 'War Room: Árbol de Contención y Secuencia Cero-Fallas',
        grouping: 'Equipos de 3 (Lead, Diagnostician, Safety Auditor)',
        materials: 'Checklist de protocolo en Power Sheet ESP',
        steps: [
          'Ordenan los 4 pasos de diagnóstico sin omitir verificaciones de seguridad/calidad.',
          'Sustentan verbalmente en inglés por qué descartaron la hipótesis incorrecta.'
        ]
      }
    },
    'milestone': {
      id: 'milestone',
      name: 'Modularidad ESP-4: Evaluación Hito & Crisol Socrático (50 min)',
      badge: 'CHECKPOINT HITO 50m',
      hasSlides: false,
      totalMinutes: 50,
      onlineDuoMinutes: 20,
      focus: 'Síntesis integradora del Hito, defensa socrática oral/escrita y emisión de evidencia acreditable (W3C/ABET/CACEI).',
      phases: [
        { block: '00–05 min', phase: 'Briefing de Rúbrica Hito', desc: 'Alineación de criterios de aprobación del Hito y estándares normativos aplicables.' },
        { block: '05–14 min', phase: 'Calibración Socrática Express', desc: 'Repaso rápido de las 3 preguntas más retadoras del bloque y trampa frecuente.' },
        { block: '14–25 min', phase: 'Defensa Oral en Tríadas', desc: 'Mini-defensa cronometrada (2 min) ante evaluador par con retroalimentación directa.' },
        { block: '25–45 min', phase: 'Checkpoint & Boss Crucible Online (20 min)', desc: 'Evaluación sumativa de los micro-pasos del hito + Defensa Socrática IA / Examen de Hito en app.html.' },
        { block: '45–50 min', phase: 'Acreditación & Power Sheet Integrador', desc: 'Registro de XP/horas acreditadas (3.5–4.0h) y guardado del Power Sheet resumen del Hito.' }
      ],
      duoSteps: [
        { step: 1, type: 'vocab_sprint', title: 'Milestone Blitz', minutes: 3 },
        { step: 2, type: 'sentence_builder', title: 'Executive Synthesis', minutes: 4 },
        { step: 3, type: 'listening', title: 'Audit Audio Prompt', minutes: 4 },
        { step: 4, type: 'grammar_drills', title: 'Hito Exam', minutes: 4 },
        { step: 5, type: 'voice_crucible', title: 'Socratic Boss Defense', minutes: 5 }
      ],
      activityTemplate: {
        title: 'Mini-Tribunal Técnico de Hito (3 Minutos)',
        grouping: 'Tríos rotativos (Defensor + 2 Evaluadores)',
        materials: 'Rúbrica ABET/CONOCER del Hito en Power Sheet',
        steps: [
          'El defensor expone solución al caso integrador conectando estándar normativo + léxico técnico inglés.',
          'Evaluadores aplican 1 pregunta socrática de seguimiento antes de pasar al examen online.'
        ]
      }
    }
  };

  function getTemplate(type) {
    return ESP_MODULARITY_TEMPLATES[type] || ESP_MODULARITY_TEMPLATES.theory;
  }

  function getAllTemplates() {
    return Object.values(ESP_MODULARITY_TEMPLATES);
  }

  function extractVocabFromCourseMod(modObj) {
    if (!modObj) return [];
    const readingVocab = (modObj.readings && modObj.readings[0] && Array.isArray(modObj.readings[0].vocabulary))
      ? modObj.readings[0].vocabulary.map((v) => ({
          en: v.en || v.term || 'Technical Term',
          es: v.es || v.translation || 'Término técnico',
          ipa: v.ipa || '',
          pinkStress: String(v.en || '').toUpperCase().split(' ').slice(0, 3).join(' '),
          example: (v.collocations && v.collocations[0]) ? `Standard usage: ${v.collocations[0]}.` : (v.definition || ''),
          exampleES: v.definition || v.es || ''
        }))
      : [];
    if (readingVocab.length) return readingVocab.slice(0, 6);

    const lex = Array.isArray(modObj.lexiconMatrix) ? modObj.lexiconMatrix : [];
    if (lex.length) {
      return lex.slice(0, 6).map((item) => ({
        en: item.term || item.en || 'Term',
        es: item.translation || item.es || 'Definición',
        ipa: item.ipa || '',
        pinkStress: item.stress || String(item.term || '').toUpperCase(),
        example: item.example || item.context || '',
        exampleES: item.exampleES || item.notes || ''
      }));
    }
    return [];
  }

  const ESP_STEM_SUPPLEMENT_VOCAB = [
    { en: 'Lockout / Tagout (LOTO)', es: 'Bloqueo y etiquetado de energía cero', ipa: '/ˈlɑkˌaʊt ˈtæɡˌaʊt/', pinkStress: 'LOCK-out TAG-out', example: 'Always apply Lockout Tagout locks before servicing live drives.', exampleES: 'Aplica siempre candados de bloqueo y etiquetado antes de dar servicio a variadores.' },
    { en: 'Root Cause Analysis', es: 'Análisis de causa raíz (8D)', ipa: '/rut kɔz əˈnælɪsɪs/', pinkStress: 'ROOT cause a-NA-ly-sis', example: 'Engineering documented the root cause analysis within twenty-four hours.', exampleES: 'Ingeniería documentó el análisis de causa raíz en veinticuatro horas.' },
    { en: 'Shift Handoff Log', es: 'Bitácora de entrega de turno', ipa: '/ʃɪft ˈhændɔf lɔɡ/', pinkStress: 'SHIFT HAND-off log', example: 'Every technician signs the shift handoff log before leaving the bay.', exampleES: 'Cada técnico firma la bitácora de relevo de turno antes de salir de la bahía.' },
    { en: 'Tolerance Stack-Up', es: 'Acumulación de tolerancias', ipa: '/ˈtɑlərəns ˈstækʌp/', pinkStress: 'TO-le-rance STACK-up', example: 'CAD reviewers verified zero destructive tolerance stack-up on the bracket.', exampleES: 'Los revisores CAD verificaron cero acumulación crítica de tolerancias en el soporte.' },
    { en: 'Standard Operating Procedure', es: 'Procedimiento Estándar de Operación (SOP)', ipa: '/ˈstændərd ˈɑpəˌreɪtɪŋ prəˈsidʒər/', pinkStress: 'SOP', example: 'Line leads must follow the Standard Operating Procedure without shortcuts.', exampleES: 'Los líderes de línea deben seguir el SOP sin atajos.' },
    { en: 'Preventive Maintenance', es: 'Mantenimiento preventivo programado', ipa: '/prɪˈvɛntɪv ˈmeɪntənəns/', pinkStress: 'pre-VEN-tive MAIN-te-nance', example: 'Preventive maintenance reduced unplanned motor downtime by forty percent.', exampleES: 'El mantenimiento preventivo redujo en 40% los paros no planeados de motor.' },
    { en: 'Telemetry Baseline', es: 'Línea base de telemetría', ipa: '/təˈlɛmətri ˈbeɪsˌlaɪn/', pinkStress: 'te-LE-me-try BASE-line', example: 'Compare live thermal readings against the commissioning telemetry baseline.', exampleES: 'Compara lecturas térmicas en vivo contra la línea base de telemetría.' },
    { en: 'Containment Protocol', es: 'Protocolo de contención inmediata', ipa: '/kənˈteɪnmənt ˈproʊtəˌkɑl/', pinkStress: 'con-TAIN-ment PRO-to-col', example: 'Quality initiated the containment protocol as soon as drift was flagged.', exampleES: 'Calidad inició el protocolo de contención apenas se detectó deriva.' },
    { en: 'Compliance Audit', es: 'Auditoría de cumplimiento normativo', ipa: '/kəmˈplaɪəns ˈɔdɪt/', pinkStress: 'com-PLI-ance AU-dit', example: 'Cleanroom documentation passed the external ISO compliance audit.', exampleES: 'La documentación de cuarto limpio aprobó la auditoría externa ISO.' },
    { en: 'Bill of Materials (BOM)', es: 'Lista estructurada de materiales', ipa: '/bɪl ʌv məˈtɪriəlz/', pinkStress: 'BOM', example: 'Update the Bill of Materials before releasing revision B to procurement.', exampleES: 'Actualiza la lista de materiales antes de liberar la revisión B a compras.' },
    { en: 'Throughput Metric', es: 'Métrica de capacidad de salida', ipa: '/ˈθruˌpʊt ˈmɛtrɪk/', pinkStress: 'THROUGH-put ME-tric', example: 'Parallel test fixtures boosted hourly throughput metrics by eighteen units.', exampleES: 'Los herramentales paralelos aumentaron la capacidad por hora en dieciocho unidades.' },
    { en: 'Corrective Action (CAPA)', es: 'Acción correctiva y preventiva', ipa: '/kəˈrɛktɪv ˈækʃən/', pinkStress: 'cor-REC-tive CAPA', example: 'Close out the CAPA verification checklist prior to Friday QBR.', exampleES: 'Cierra la lista de verificación CAPA antes de la QBR del viernes.' }
  ];

  const ESP_STEM_SUPPLEMENT_DRILLS = [
    {
      q: 'All critical subsystems ___ calibrated against NIST-traceable instruments prior to release.',
      opts: ['are', 'is being do', 'has', 'does'],
      ans: 0,
      exp: 'El sujeto plural "All critical subsystems" requiere voz pasiva presente "are + Past Participle".',
      socraticHint: 'Identifica sujeto plural en voz pasiva estándar de ingeniería.'
    },
    {
      q: 'Technicians ___ bypass safety light curtains even during high-urgency production runs.',
      opts: ["mustn't", "don't have to", 'might to', "haven't"],
      ans: 0,
      exp: '"mustn\'t" comunica prohibición estricta de seguridad (OSHA/ISO), distinta de ausencia de obligación.',
      socraticHint: '¿Es prohibición estricta o algo opcional?'
    },
    {
      q: 'If live vibration RMS ___ threshold limits, the PLC automatically triggers controlled shutdown.',
      opts: ['exceeds', 'will exceed', 'exceeded was', 'exceeding'],
      ans: 0,
      exp: 'En Zero Conditional para lógica física/PLC ("If + Present Simple"), usamos "exceeds".',
      socraticHint: 'Causa-efecto determinística en control automático.'
    },
    {
      q: '___ we verified impedance stability in EVT, the board revision would already be in mass production.',
      opts: ['Had', 'Did', 'Should to', 'Were to had'],
      ans: 0,
      exp: 'Conditional inversion ("Had we verified..." = "If we had verified...") en reportes técnicos.',
      socraticHint: 'Inversión condicional de 3ª forma / Mixta sin "If".'
    },
    {
      q: 'Before Shift A handed off Bay 2, the reliability team ___ replaced the fatigued bearing.',
      opts: ['had already', 'have already', 'was already', 'did already'],
      ans: 0,
      exp: 'Past Perfect ("had already + V3") indica una acción terminada antes de otro evento pasado.',
      socraticHint: 'Orden cronológico previo a la entrega de turno.'
    },
    {
      q: 'Sensors are equipped with double shielding ___ prevent electromagnetic signal distortion.',
      opts: ['to', 'for preventing', 'so that to', 'in order of'],
      ans: 0,
      exp: 'Infinitivo de propósito antes de verbo base ("to prevent").',
      socraticHint: 'Expresa finalidad técnica ante verbo infinitivo.'
    },
    {
      q: 'What triggered the CAN-bus fault ___ an intermittent ground loop at Connector J4.',
      opts: ['was', 'were', 'it was', 'which did'],
      ans: 0,
      exp: 'En Wh-cleft ("What triggered..."), el foco singular toma "was".',
      socraticHint: 'Enfatiza la causa raíz puntual en reportes 8D.'
    },
    {
      q: 'Please forward the signed test sign-off ___ 4:00 PM Friday so logistics can schedule shipment.',
      opts: ['by', 'until', 'during', 'along'],
      ans: 0,
      exp: '"by" marca el plazo límite máximo (deadline) para entrega de entregables.',
      socraticHint: 'Preposición exacta para fecha/hora límite.'
    },
    {
      q: 'Could you confirm whether the revised BOM ___ uploaded to PDM yet?',
      opts: ['has been', 'is been', 'was did', 'has it been'],
      ans: 0,
      exp: 'Pregunta indirecta en voz pasiva Present Perfect ("whether the BOM has been uploaded").',
      socraticHint: 'Recuerda: sin inversión auxiliar en preguntas indirectas.'
    },
    {
      q: '___ strict raw-material shortages, engineering maintained 99.4% first-pass yield.',
      opts: ['Despite', 'Although', 'However', 'Even though of'],
      ans: 0,
      exp: '"Despite" conecta una frase nominal de contraste sin verbo conjugado.',
      socraticHint: 'Conector concesivo antes de grupo nominal.'
    }
  ];

  function espNormKey(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function espShuffleDrill(drill, seed) {
    if (!drill || !Array.isArray(drill.opts) || drill.opts.length < 2) return drill;
    const correctIdx = (typeof drill.ans === 'number' && drill.ans >= 0 && drill.ans < drill.opts.length) ? drill.ans : 0;
    const correctVal = drill.opts[correctIdx];
    const ranked = drill.opts.map((opt, i) => ({
      opt,
      score: ((i + 1) * 41 + seed * 17 + String(opt).length * 11 + String(drill.q || '').length) % 101
    }));
    ranked.sort((a, b) => a.score - b.score);
    const newOpts = ranked.map((r) => r.opt);
    return Object.assign({}, drill, { opts: newOpts, ans: Math.max(0, newOpts.indexOf(correctVal)) });
  }

  function buildEspClassPayload(trackOrCareerId, modObj, rawCourseObj) {
    const modType = (modObj && modObj.type) || 'theory';
    const tpl = getTemplate(modType);
    const modulesList = (rawCourseObj && Array.isArray(rawCourseObj.modules)) ? rawCourseObj.modules : [];
    const courseMod = modulesList.length
      ? modulesList.find((m) => m.id === (modObj && modObj.id)) || modulesList[0]
      : (modObj && (modObj.readings || modObj.quiz) ? modObj : null);
    const modOrder = (modObj && (modObj.order || 1)) || 1;
    const standard = (modObj && modObj.standard) || (rawCourseObj && rawCourseObj.standard) || 'ISO / IEEE / ABET';
    const modTitle = (modObj && (modObj.shortTitle || modObj.title)) || 'Industrial Protocol';

    // 1. Expand Vocabulary (>= 12 unique STEM terms)
    const vocabSeen = new Set();
    const vocab = [];
    const addVocab = (item) => {
      if (!item || !item.en) return;
      const k = espNormKey(item.en);
      if (!k || vocabSeen.has(k)) return;
      vocabSeen.add(k);
      vocab.push(item);
    };

    extractVocabFromCourseMod(courseMod).forEach(addVocab);
    if (modObj) {
      String(modObj.title || '').split(/[:,&\-/+()]+/).map((s) => s.trim()).filter((s) => s.length >= 3).forEach((w) => {
        addVocab({
          en: w,
          es: `Concepto técnico (${standard})`,
          ipa: '',
          pinkStress: w.toUpperCase(),
          example: (modObj.competency && modObj.competency.length > 15)
            ? `Verify ${w} to meet ${modTitle} requirements.`
            : `Apply ${w} under ${standard} engineering protocols.`,
          exampleES: `Verifica ${w} conforme a los requisitos de ${modTitle}.`
        });
      });
    }
    // Harvest terms from sibling career modules in rotated order
    const siblingMods = modulesList.filter((m) => m && m.id !== (modObj && modObj.id));
    const rotatedSibs = siblingMods.length ? siblingMods.slice(modOrder % siblingMods.length).concat(siblingMods.slice(0, modOrder % siblingMods.length)) : [];
    rotatedSibs.forEach((sib) => {
      if (vocab.length >= 14) return;
      extractVocabFromCourseMod(sib).slice(0, 2).forEach(addVocab);
      if (sib.shortTitle && vocab.length < 14) {
        addVocab({
          en: sib.shortTitle,
          es: sib.competency ? sib.competency.slice(0, 58) : `Módulo ${sib.id} (${sib.standard || standard})`,
          ipa: '',
          pinkStress: String(sib.shortTitle).toUpperCase(),
          example: `Coordinate ${sib.shortTitle} checks according to ${sib.standard || standard}.`,
          exampleES: `Coordina verificaciones de ${sib.shortTitle} conforme a ${sib.standard || standard}.`
        });
      }
    });
    for (let i = 0; i < ESP_STEM_SUPPLEMENT_VOCAB.length && vocab.length < 12; i++) {
      addVocab(ESP_STEM_SUPPLEMENT_VOCAB[(i + modOrder) % ESP_STEM_SUPPLEMENT_VOCAB.length]);
    }

    const v0 = (vocab[0] && vocab[0].en) || 'protocol';
    const v1 = (vocab[1] && vocab[1].en) || 'compliance';
    const v2 = (vocab[2] && vocab[2].en) || 'baseline telemetry';

    // 2. Expand Dialogue (>= 8 unique realistic engineering turns)
    const dlgSeen = new Set();
    const dialogue = [];
    const addTurn = (speaker, en, es) => {
      const k = espNormKey(en);
      if (!k || dlgSeen.has(k)) return;
      dlgSeen.add(k);
      dialogue.push({ speaker, en, es, text: en, translation: es });
    };
    if (courseMod && Array.isArray(courseMod.dialogue)) {
      courseMod.dialogue.forEach((d) => addTurn(d.speaker || d.role || 'Engineer', d.en || d.text || d.line || '', d.es || d.translation || ''));
    }
    const synthesizedTurns = [
      ['Lead Engineer', `Team, today's 50-minute focus is ${modTitle}. Confirm ${v0} before deployment.`, `Equipo, el enfoque de 50 min de hoy es ${modTitle}. Confirmen ${v0} antes del despliegue.`],
      ['Specialist', `Confirmed. We aligned documentation with ${standard} compliance and logged telemetry.`, `Confirmado. Alineamos documentación con ${standard} y registramos la telemetría.`],
      ['QA Auditor', `Have you already cross-checked ${v1} against the master acceptance matrix?`, `¿Ya cotejaron ${v1} contra la matriz maestra de aceptación?`],
      ['Specialist', `Yes, all parameters stay within nominal tolerances and zero deviations were detected.`, `Sí, todos los parámetros siguen dentro de tolerancias nominales sin desviaciones.`],
      ['Shift Supervisor', `If ambient drift affects ${v2}, trigger containment immediately and notify engineering.`, `Si la deriva ambiental afecta ${v2}, activen contención de inmediato y notifiquen a ingeniería.`],
      ['Reliability Eng', `Understood. Lockout tags are attached and the digital handoff report is live in PDM.`, `Entendido. Las etiquetas LOTO están colocadas y el reporte digital ya está activo en PDM.`],
      ['Program Manager', `Provide a concise BLUF summary by four PM so the US plant lead can sign off.`, `Envíen un resumen BLUF conciso a las cuatro PM para que el líder en EE. UU. firme aprobación.`],
      ['Lead Engineer', `We will upload the verified checklist and Power Sheet sign-off before shift changeover.`, `Subiremos la lista verificada y firma de Power Sheet antes del relevo de turno.`]
    ];
    synthesizedTurns.forEach(([spk, en, es]) => addTurn(spk, en, es));

    // 3. Expand Technical & CEFR Drills (>= 10 unique 4-option checks)
    const drillSeen = new Set();
    const drills = [];
    const addDrill = (d, seed) => {
      if (!d || !d.q || !Array.isArray(d.opts) || d.opts.length < 2) return;
      const k = espNormKey(d.q);
      if (!k || drillSeen.has(k)) return;
      drillSeen.add(k);
      drills.push(espShuffleDrill(d, seed));
    };

    if (courseMod && Array.isArray(courseMod.quiz)) {
      courseMod.quiz.forEach((q, qi) => {
        addDrill({
          q: q.question || q.q || '',
          opts: q.options || q.opts || [],
          ans: typeof q.correct === 'number' ? q.correct : (q.ans || 0),
          exp: q.explanation || q.exp || 'Alineado a normativa técnica del módulo.',
          socraticHint: q.socraticHint || `Relaciona con ${standard}.`
        }, modOrder + qi);
      });
    }

    addDrill({
      q: `Which deliverable demonstrates mastery of "${modTitle}"?`,
      opts: [
        (modObj && modObj.competency) || 'Verified technical compliance & English operational handoff',
        'Skipping standard verification under schedule pressure',
        'Unlogged ad-hoc changes without cross-shift communication',
        'Translating technical acronyms word-for-word into Spanish'
      ],
      ans: 0,
      exp: 'La competencia exige evidencia técnica verificable conforme al estándar y comunicación precisa en inglés.',
      socraticHint: `Revisa el estándar normativo (${standard}).`
    }, modOrder + 3);

    addDrill({
      q: `Under ${standard}, what must engineers verify first when validating "${v0}"?`,
      opts: [
        `Documented baseline conformance and calibrated telemetry`,
        'Estimating tolerances visually without instrumentation',
        'Deferring logbook entry until next month',
        'Disabling interlock sensors during peak run'
      ],
      ans: 0,
      exp: `Todo protocolo bajo ${standard} exige línea base documentada y telemetría calibrada.`,
      socraticHint: 'Aplica trazabilidad y calibración normativa.'
    }, modOrder + 5);

    addDrill({
      q: `Which English phrase professionally communicates a deviation in "${modTitle}" to a US engineering team?`,
      opts: [
        `"BLUF: ${v1} deviated 2% below spec; containment is active under ${standard}."`,
        '"Maybe it broke a little, we ignore today."',
        '"Is problem big, please fix unknown."',
        '"No need to log because line is running."'
      ],
      ans: 0,
      exp: 'El estándar ejecutivo EE. UU. exige datos cuantificados, acción de contención y referencia normativa.',
      socraticHint: 'Busca precisión técnica, datos y formato BLUF.'
    }, modOrder + 7);

    // Add curated CEFR + Engineering drills until >= 12
    for (let i = 0; i < ESP_STEM_SUPPLEMENT_DRILLS.length && drills.length < 12; i++) {
      const idx = (i + modOrder) % ESP_STEM_SUPPLEMENT_DRILLS.length;
      addDrill(ESP_STEM_SUPPLEMENT_DRILLS[idx], modOrder + idx + 11);
    }

    return {
      id: `esp:${trackOrCareerId}:${(modObj && modObj.id) || 'M01'}`,
      modId: (modObj && modObj.id) || 'M01',
      trackId: trackOrCareerId,
      isEsp: true,
      level: (rawCourseObj && rawCourseObj.level) || (modType === 'english-b1' ? 'B1 ESP' : 'STEM ESP'),
      modularity: modType,
      modularityMeta: tpl,
      hasSlides: tpl.hasSlides,
      durationMinutes: 50,
      onlinePracticeMinutes: tpl.onlineDuoMinutes,
      accreditedHours: (modObj && modObj.hours) || 3.5,
      xp: (modObj && modObj.xp) || 300,
      standard,
      title: (modObj && modObj.title) || 'ESP Engineering Module',
      titleES: (modObj && (modObj.titleES || modObj.shortTitle || modObj.title)) || 'Módulo Técnico ESP',
      canDo: (modObj && modObj.competency) || tpl.focus,
      industryContext: `${standard} · ${(modObj && modObj.cluster) || 'Nearshoring Industrial STEM'}`,
      grammarFormulaHtml: `<div style="font-size:0.84rem;color:#0f172a;font-weight:700;">Eje Técnico: <code>${standard}</code> · Competencia: ${(modObj && modObj.competency) || tpl.focus}</div>`,
      explanationES: `Sesión modular de <strong>50 minutos</strong> (${tpl.badge}) diseñada para integrar la competencia técnica <strong>${(modObj && modObj.title) || ''}</strong> con producción bilingüe operativa y ${tpl.onlineDuoMinutes} min de práctica online en <em>stemOS</em>.`,
      goldenRuleES: `Domina siempre 1 término normativo (${v0}), 1 colocación de acción y 1 enunciado de reporte claro bajo <strong>${standard}</strong>.`,
      commonMistake: {
        bad: 'Depender de traducción literal al reportar fallas o saltarse la verificación documental por prisa.',
        good: `Comunicar estado + evidencia + norma (${standard}) con frases técnicas concretas.`,
        exp: 'La acreditación industrial (ABET / CACEI / CONOCER) evalúa precisión técnica y trazabilidad en inglés.'
      },
      falseCognate: {
        term: 'Compliance vs Complacency / Spec',
        mistake: 'Traducir "technical compliance" como "complacencia"',
        correct: 'Cumplimiento normativo verificable',
        tip: 'Usa siempre "in compliance with [ISO/OSHA/IEEE]" para certificar apego a norma.'
      },
      vocab,
      dialogue,
      drills,
      instructionalPhases: tpl.phases,
      duoSteps: tpl.duoSteps,
      classroomActivity: tpl.activityTemplate,
      powerSheet: {
        fillBlanks: [
          `1. All procedures must align with ___ standards. (${standard.split(' ')[0]} / informal)`,
          `2. Verify "${v0}" before signing off shift handoff. (baseline / guess)`,
          `3. Cross-team documentation prioritizes clarity and ___. (${v1} / ambiguity)`,
          '4. Logged deviations trigger formal root-cause ___. (containment / ignore)'
        ],
        reorder: [`standards / ${standard.split(' ')[0]} / must / verify / Engineers / .`],
        writePrompt: `Redacta 3 líneas en inglés técnico integrando "${v0}" bajo la norma ${standard}:`,
        answerKey: `1) ${standard.split(' ')[0]} · 2) baseline · 3) ${v1} · 4) containment | Standard verification logged under ${standard}.`
      }
    };
  }

  return {
    version: '2026.11-esp-50m-v1',
    templates: ESP_MODULARITY_TEMPLATES,
    getTemplate,
    getAllTemplates,
    buildEspClassPayload
  };
}));
