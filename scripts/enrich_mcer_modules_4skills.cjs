/**
 * stemOS — MCER 4 Habilidades & Módulos Base de Aprendizaje (A1–B1) Enricher
 * ══════════════════════════════════════════════════════════════════════════
 * Implementa:
 * 1. Metadata de MÓDULOS (en vez de solo unidades): isModule, moduleNumber, modulo, 10 min por práctica
 * 2. Las 4 Habilidades del Inglés equilibradas: Escucha, Lectura, Escritura, Habla
 * 3. Taller de Redacción Técnica (Writing Lab) con IA Rápida y Rúbrica Automática
 * 4. Rutas Base de Aprendizaje (Base Paths) para A1 a B1 en las 4 Habilidades
 * ══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MCER_PATH = path.join(ROOT, 'content', 'mcer_tracks.js');
const DEV_MCER_PATH = path.join(ROOT, 'dev', 'content', 'mcer_tracks.js');

const WRITING_LABS = {
  'a1-u1': {
    id: 'write-a1-m1',
    title: 'Workplace Check-In & Employee Profile',
    titleES: 'Registro de Credencial y Perfil de Empleado en Planta',
    prompt: 'You arrive at the plant security kiosk on your first day as a new intern. Complete your written introductory record for your facility badge.',
    promptES: 'Llegas al módulo de seguridad en tu primer día como practicante. Redacta tu ficha de presentación para el registro de tu credencial de acceso.',
    instruction: 'Write 2-3 short sentences stating your name, your job role (intern / technician), and your assigned workstation or department.',
    instructionES: 'Escribe 2-3 oraciones cortas indicando tu nombre, tu puesto (practicante / técnico) y tu estación de trabajo o departamento asignado.',
    targetKeywords: ['name', 'intern', 'workstation', 'department', 'pleasure'],
    minWords: 18,
    starterTemplate: 'Good morning, my name is ... I am a new mechatronics intern. My assigned workstation is located in the ... department.',
    modelAnswer: 'Good morning, my name is Alex Rivera. I am a new engineering intern. My assigned workstation is on Assembly Line 3 in the quality department. It is a pleasure to join the team.',
    rubric: {
      vocabulary: 'Includes job title, workstation, and polite professional phrasing.',
      grammar: 'Correct use of verb to be (am/is) and possessive adjectives (my/your).',
      mechanics: 'Clear sentence boundaries with capitalization and periods.'
    }
  },
  'a1-u2': {
    id: 'write-a1-m2',
    title: 'Shift Handover Daily Routine Note',
    titleES: 'Bitácora de Entrega de Turno y Rutina Diaria',
    prompt: 'End of first shift. Leave a short handover note for the incoming second shift operator about daily production count and scheduled maintenance.',
    promptES: 'Fin del primer turno. Deja una nota breve de entrega de turno para el segundo turno indicando piezas producidas y mantenimiento programado.',
    instruction: 'Write 2-3 sentences stating your shift hours, the number of finished units produced, and when maintenance starts.',
    instructionES: 'Escribe 2-3 oraciones indicando el horario de turno, piezas terminadas producidas y la hora en que inicia el mantenimiento.',
    targetKeywords: ['shift', 'schedule', 'produced', 'maintenance', 'units'],
    minWords: 20,
    starterTemplate: 'First shift finishes at 3:30 PM. We produced ... units on schedule today. Scheduled maintenance begins at ...',
    modelAnswer: 'First shift finishes at 3:30 PM. We produced 450 finished units on schedule today. Routine maintenance on the conveyor belt begins at 4:00 PM without delay.',
    rubric: {
      vocabulary: 'Includes shift, schedule, units, and maintenance terms.',
      grammar: 'Correct use of Simple Present and time prepositions (at, on).',
      mechanics: 'Logical sequence and concise handover clarity.'
    }
  },
  'a1-u3': {
    id: 'write-a1-m3',
    title: 'Tool Crib Location & Equipment Requisition',
    titleES: 'Ubicación de Herramientas y Requisición de Equipo',
    prompt: 'A new teammate asks where digital calipers and safety glasses are kept. Write a brief location memo on the workstation whiteboard.',
    promptES: 'Un compañero pregunta dónde se guardan los calibradores digitales y lentes de seguridad. Escribe una nota de ubicación en el pizarrón.',
    instruction: 'Write 2-3 sentences using "there is / there are" to describe where tools and supplies are stored at your workstation.',
    instructionES: 'Escribe 2-3 oraciones usando "there is / there are" para describir dónde se almacenan las herramientas en la estación.',
    targetKeywords: ['there is', 'there are', 'calipers', 'cabinet', 'station'],
    minWords: 20,
    starterTemplate: 'At workstation 4, there is a locked tool cabinet. There are three pairs of ... on the shelf next to the ...',
    modelAnswer: 'At workstation 4, there is a locked tool cabinet on Wall C. There are three pairs of digital calipers and safety glasses on the shelf next to the inspection station.',
    rubric: {
      vocabulary: 'Accurate tool names and spatial prepositions (on, next to, between).',
      grammar: 'Proper agreement with singular "there is" and plural "there are".',
      mechanics: 'Punctuation and clear shopfloor directions.'
    }
  },
  'a1-u4': {
    id: 'write-a1-m4',
    title: 'EHS Warning Notice & Cleanroom Protocol',
    titleES: 'Aviso de Seguridad EHS y Protocolo en Sala Limpia',
    prompt: 'You notice a workstation without safety signage. Draft a short PPE reminder card to place on the tool rack.',
    promptES: 'Detectas una estación sin señalización. Redacta una tarjeta de recordatorio de EPP para colocarla junto al anaquel.',
    instruction: 'Write 2-3 direct imperative sentences instructing workers to wear safety glasses and report any hazards immediately.',
    instructionES: 'Escribe 2-3 oraciones imperativas directas ordenando el uso de lentes y reportar cualquier peligro de inmediato.',
    targetKeywords: ['wear', 'safety glasses', 'mandatory', 'hazard', 'report'],
    minWords: 18,
    starterTemplate: 'Please wear approved safety glasses before ... Protective gear is mandatory. Report any hazard to ...',
    modelAnswer: 'Wear approved safety glasses and earplugs before entering this bay. Safety eyewear is mandatory past the yellow line. Report any hazard or oil spill to EHS immediately.',
    rubric: {
      vocabulary: 'Safety directives (mandatory, hazard, protective eyewear).',
      grammar: 'Direct imperative mood (Wear, Report, Do not touch).',
      mechanics: 'Punchy, actionable safety formatting.'
    }
  },
  'a2-u1': {
    id: 'write-a2-m1',
    title: 'Equipment Stoppage Past Shift Log',
    titleES: 'Bitácora de Paro de Equipo e Incidente de Turno',
    prompt: 'Conveyor Line 2 stopped for 15 minutes during your shift. Write the past-tense incident entry in the digital maintenance logbook.',
    promptES: 'La banda transportadora 2 se detuvo 15 minutos en tu turno. Redacta el reporte en pasado para la bitácora digital de mantenimiento.',
    instruction: 'Write 3-4 sentences in the simple past stating when the line stopped, what happened, and who inspected it.',
    instructionES: 'Escribe 3-4 oraciones en pasado simple indicando la hora del paro, lo que ocurrió y quién lo inspeccionó.',
    targetKeywords: ['stopped', 'inspected', 'occurred', 'restarted', 'sensor'],
    minWords: 25,
    starterTemplate: 'At 10:15 AM, the conveyor line stopped because ... Technician Carlos inspected the ... We restarted operations at ...',
    modelAnswer: 'At 10:15 AM, the conveyor line stopped because an optical sensor jammed with debris. Technician Carlos inspected the roller assembly and cleared the blockage. We restarted operations at 10:30 AM without further downtime.',
    rubric: {
      vocabulary: 'Incident terms (downtime, jammed, inspected, restarted).',
      grammar: 'Consistent simple past regular (-ed) and irregular verb forms.',
      mechanics: 'Clear chronological order and timeline accuracy.'
    }
  },
  'a2-u2': {
    id: 'write-a2-m2',
    title: 'CNC Machine Specs & Material Comparison Note',
    titleES: 'Comparativa Técnica de Maquinado y Materiales',
    prompt: 'Your shift lead asks for a quick written comparison between Machine Alpha and Machine Beta for precision aluminum milling.',
    promptES: 'Tu líder de turno solicita una nota comparativa entre Máquina Alpha y Máquina Beta para maquinado de aluminio.',
    instruction: 'Write 3-4 sentences comparing speed, tolerance, and power consumption using comparative forms (faster than, more efficient than).',
    instructionES: 'Escribe 3-4 oraciones comparando velocidad, tolerancia y consumo eléctrico usando comparativos en inglés.',
    targetKeywords: ['faster', 'efficient', 'tolerance', 'compared', 'precision'],
    minWords: 30,
    starterTemplate: 'Machine Beta is faster than Machine Alpha for ... It operates with a tighter tolerance of ... Compared to Alpha, it is more ...',
    modelAnswer: 'Machine Beta is faster than Machine Alpha for milling high-precision aluminum components. It operates with a tighter tolerance of 0.02 mm. Compared to Alpha, Beta is more energy efficient and delivers superior surface precision.',
    rubric: {
      vocabulary: 'Engineering metrics (tolerance, efficiency, precision, milling).',
      grammar: 'Accurate comparative adjectives (faster than, more efficient than).',
      mechanics: 'Structured comparative contrast.'
    }
  },
  'a2-u3': {
    id: 'write-a2-m3',
    title: 'Upcoming Calibration Agenda & Schedule Request',
    titleES: 'Solicitud y Agenda de Calibración de Equipos',
    prompt: 'Coordinate next week CMM coordinate measuring calibration with the vendor. Write an email memo proposing dates and agenda items.',
    promptES: 'Coordina la calibración anual del equipo CMM con el proveedor externo mediante una nota de agenda para la próxima semana.',
    instruction: 'Write 3-4 sentences using future forms (will / going to) outlining the date, time, and test items for the calibration session.',
    instructionES: 'Escribe 3-4 oraciones en futuro (will / going to) detallando fecha, hora y componentes a calibrar.',
    targetKeywords: ['schedule', 'calibration', 'next week', 'agenda', 'confirm'],
    minWords: 30,
    starterTemplate: 'We are scheduling the annual calibration for next week on ... The technical agenda will cover ... Please confirm if you will ...',
    modelAnswer: 'We are scheduling the annual CMM calibration for next Tuesday at 9:00 AM. Our technical agenda will cover probe alignment, axis verification, and certificate renewal. Please confirm if your technician will arrive with ISO calibration standards.',
    rubric: {
      vocabulary: 'Scheduling and metrology terms (calibration, probe, alignment).',
      grammar: 'Future forms (will cover, are scheduling, going to arrive).',
      mechanics: 'Professional corporate tone and clear call to action.'
    }
  },
  'a2-u4': {
    id: 'write-a2-m4',
    title: 'Hydraulic Leak Work Order Ticket',
    titleES: 'Orden de Trabajo y Diagnóstico de Falla Hidráulica',
    prompt: 'Press 4 is experiencing an abnormal pressure drop and fluid leak. Draft an urgent maintenance work order ticket.',
    promptES: 'La Prensa 4 presenta una caída anormal de presión y fuga de fluido. Redacta el ticket urgente de mantenimiento.',
    instruction: 'Write 3-4 sentences describing the symptom, the suspected component, and the immediate action taken.',
    instructionES: 'Escribe 3-4 oraciones describiendo el síntoma, el componente sospechoso y la acción de contención inmediata.',
    targetKeywords: ['leak', 'pressure', 'abnormal', 'hydraulic', 'maintenance'],
    minWords: 30,
    starterTemplate: 'Press 4 is experiencing an abnormal pressure drop on cylinder 2. We observed a hydraulic leak near ... I initiated LOTO and requested emergency ...',
    modelAnswer: 'Press 4 is experiencing an abnormal pressure drop on cylinder 2. We observed a visible hydraulic leak near the main intake valve. I immediately stopped the machine, initiated LOTO safety tags, and requested urgent maintenance support.',
    rubric: {
      vocabulary: 'Technical diagnostics (abnormal drop, intake valve, LOTO, leak).',
      grammar: 'Present Continuous (is experiencing) and Simple Past (observed, initiated).',
      mechanics: 'Emergency ticket severity and clarity.'
    }
  },
  'b1-u1': {
    id: 'write-b1-m1',
    title: 'SOP Step-by-Step Cleanroom Gowning Procedure',
    titleES: 'Procedimiento Estandarizado SOP de Acceso a Cuarto Limpio',
    prompt: 'Write an updated 4-step Standard Operating Procedure guide for new technicians entering the Class 100 cleanroom.',
    promptES: 'Redacta un procedimiento estandarizado SOP de 4 pasos para técnicos que ingresan al cuarto limpio Clase 100.',
    instruction: 'Write 4-5 sentences using sequential transition words (First, Second, Next, Finally) to explain the gowning protocol.',
    instructionES: 'Escribe 4-5 oraciones usando conectores de secuencia (First, Second, Next, Finally) explicando el protocolo de vestimenta.',
    targetKeywords: ['first', 'cleanroom', 'procedure', 'ensure', 'finally'],
    minWords: 40,
    starterTemplate: 'First, step into the gowning vestibule and put on ... Next, put on the anti-static suit and ensure ... Finally, pass through the air shower before ...',
    modelAnswer: 'First, step into the gowning anteroom and put on disposable hairnets and ESD shoe covers. Second, put on the cleanroom coverall suit and ensure all zippers are sealed completely. Next, put on sterile nitrile gloves and safety glasses. Finally, pass through the air shower for 30 seconds before entering the active wafer manufacturing bay.',
    rubric: {
      vocabulary: 'Cleanroom standard terminology (ESD, anteroom, gowning, air shower).',
      grammar: 'Sequential discourse markers and imperative directives.',
      mechanics: 'Formal technical SOP documentation rigor.'
    }
  },
  'b1-u2': {
    id: 'write-b1-m2',
    title: 'Weekly Engineering Milestone Status Report',
    titleES: 'Reporte Semanal de Hitos de Ingeniería para Dirección',
    prompt: 'Draft your weekly project status email to the engineering director summarizing Line 3 qualification progress, a minor blocker, and next steps.',
    promptES: 'Redacta un correo ejecutivo de estatus semanal para la dirección de ingeniería resumiendo avances, un bloqueo menor y siguientes pasos.',
    instruction: 'Write a structured professional email with subject line, greeting, milestone progress, blocker mitigation, and polite sign-off.',
    instructionES: 'Escribe un correo formal con asunto, saludo, progreso de hitos, mitigación de bloqueo y despedida ejecutiva.',
    targetKeywords: ['milestone', 'progress', 'blocker', 'resolved', 'deliverable'],
    minWords: 45,
    starterTemplate: 'Dear Engineering Team, here is our weekly project update. We completed the first milestone with ... A minor blocker regarding ... was resolved yesterday. Our key deliverable for next week is ...',
    modelAnswer: 'Subject: Weekly Line 3 Qualification Progress Update\n\nDear Engineering Team, here is our weekly update on Line 3 qualification. We reached the first key milestone with zero defect escapes during prototype testing. A minor calibration blocker on Sensor B was resolved yesterday after firmware reconfiguration. Our primary deliverable for next week is the 48-hour continuous production run.',
    rubric: {
      vocabulary: 'Project management and technical milestones (blocker, deliverable, escapes).',
      grammar: 'Present Perfect and Simple Past for status tracking.',
      mechanics: 'Standard corporate email formatting and tone.'
    }
  },
  'b1-u3': {
    id: 'write-b1-m3',
    title: 'Daily Scrum Standup Summary Note',
    titleES: 'Resumen de Standup Técnico Asíncrono',
    prompt: 'Following an international technical standup call with US counterpart engineers, write a concise summary of your daily commitments and blockers.',
    promptES: 'Tras una junta técnica de standup con contrapartes en EE.UU., redacta un resumen asíncrono con tus compromisos del día y dudas.',
    instruction: 'Write 4-5 sentences detailing what you completed yesterday, what you will work on today, and one clarifying question regarding the schematic.',
    instructionES: 'Escribe 4-5 oraciones indicando qué terminaste ayer, qué harás hoy y una duda técnica sobre el diagrama esquemático.',
    targetKeywords: ['completed', 'working on', 'blocker', 'clarification', 'schematic'],
    minWords: 45,
    starterTemplate: 'Yesterday, I completed the testing for ... Today, I am working on ... There are no major blockers, but I need clarification on the schematic regarding ...',
    modelAnswer: 'Yesterday, I completed the automated PLC logic simulation for the packaging arm. Today, I am working on wiring the emergency stop circuit according to ISO standards. I have no critical blockers at this moment; however, I request a brief technical clarification from the design team regarding pin 14 on the updated electrical schematic.',
    rubric: {
      vocabulary: 'Agile/Scrum terminology (standup, blocker, completed, working on).',
      grammar: 'Contrasting past actions with ongoing present continuous work.',
      mechanics: 'Clear, concise cross-border engineering communication.'
    }
  },
  'b1-u4': {
    id: 'write-b1-m4',
    title: '8D Quality Containment & Root Cause Memo',
    titleES: 'Reporte 8D de Contención y Causa Raíz de Calidad',
    prompt: 'A customer reported solder bridge defects on PCB batch 410. Write the D3 containment and D4 root cause paragraph for the official 8D report.',
    promptES: 'Un cliente reportó puentes de soldadura en el lote 410. Redacta el párrafo D3 (contención) y D4 (causa raíz) para el reporte 8D.',
    instruction: 'Write 4-5 sentences proposing immediate product containment, identifying the probable root cause, and recommending a preventative action.',
    instructionES: 'Escribe 4-5 oraciones proponiendo contención inmediata, identificando causa raíz y sugiriendo acción preventiva.',
    targetKeywords: ['containment', 'root cause', 'defect', 'corrective', 'prevent'],
    minWords: 45,
    starterTemplate: 'We implemented immediate containment by quarantining ... Root cause analysis determined that ... To prevent future defects, we recommend the corrective action of ...',
    modelAnswer: 'We implemented immediate containment by quarantining 1,200 finished PCB units from lot 410 in the warehouse. Root cause analysis revealed excessive solder paste deposition caused by a worn stencil aperture. To prevent defect recurrence, we executed the corrective action of replacing the laser-cut stencil and adjusting automated optical inspection thresholds.',
    rubric: {
      vocabulary: 'Quality 8D methodology (containment, root cause, corrective action, recurrence).',
      grammar: 'Passive voice and formal problem-solving syntax.',
      mechanics: 'Auditable engineering quality compliance standards.'
    }
  },
  'b2-u1': {
    id: 'write-b2-m1',
    title: 'Engineering Change Order (ECO) Justification',
    titleES: 'Justificación Técnica de Orden de Cambio de Ingeniería (ECO)',
    prompt: 'Draft the technical justification section of an Engineering Change Order (ECO) modifying CNC machining tolerances from ±0.05mm to ±0.02mm.',
    promptES: 'Redacta la justificación técnica de una Orden de Cambio de Ingeniería (ECO) ajustando tolerancias CNC.',
    instruction: 'Write 4-5 sentences justifying the design revision, analyzing the thermal impact, and confirming toolpath feasibility.',
    instructionES: 'Escribe 4-5 oraciones justificando la revisión de diseño, analizando impacto térmico y validando factibilidad.',
    targetKeywords: ['engineering change', 'tolerance', 'feasibility', 'thermal', 'revision'],
    minWords: 50,
    starterTemplate: 'This Engineering Change Order proposes a revision to ... The tightened tolerance is necessary because ... Toolpath feasibility has been verified through ...',
    modelAnswer: 'This Engineering Change Order proposes a critical revision to drawing REV-D for the actuator housing. The tightened tolerance of ±0.02mm is necessary to eliminate vibration during high-speed thermal cycles. Machining feasibility has been confirmed via 5-axis CAM simulation without increasing cycle time. Implementation is scheduled for next Monday.',
    rubric: {
      vocabulary: 'Advanced aerospace/machining engineering terms.',
      grammar: 'Complex subordinate clauses and formal nominalizations.',
      mechanics: 'Strict compliance with ISO 9001 change control protocols.'
    }
  },
  'b2-u2': {
    id: 'write-b2-m2',
    title: 'Supplier Quality Concession & Non-Conformance Memo',
    titleES: 'Memorando de Concesión de Calidad y No-Conformidad',
    prompt: 'A tier-1 supplier shipped machined brackets with surface roughness Ra 3.4 instead of Ra 3.2. Draft a formal concession memo with conditions.',
    promptES: 'Un proveedor envió soportes maquinados con rugosidad Ra 3.4 en vez de Ra 3.2. Redacta el memorando formal de concesión condicionada.',
    instruction: 'Write 4-5 sentences evaluating the cosmetic versus functional risk and granting conditional acceptance with a supplier corrective action request (SCAR).',
    instructionES: 'Escribe 4-5 oraciones evaluando riesgo funcional vs cosmético y otorgando aceptación condicionada con SCAR.',
    targetKeywords: ['concession', 'non-conformance', 'supplier', 'acceptable', 'corrective action'],
    minWords: 50,
    starterTemplate: 'Regarding non-conformance report NCR-882, the supplier requested a temporary concession for ... Stress testing confirmed the parts are functionally acceptable, but ... We issue a formal corrective action request requiring ...',
    modelAnswer: 'Regarding non-conformance report NCR-882, the supplier requested a temporary engineering concession for batch 804 with surface roughness Ra 3.4. Finite element stress analysis confirmed the brackets remain functionally acceptable for non-pressurized mounts. We approve a one-time conditional concession, accompanied by a formal Supplier Corrective Action Request (SCAR) to recalibrate finishing tools.',
    rubric: {
      vocabulary: 'Nearshoring procurement and concession terminology.',
      grammar: 'Conditional structures and diplomatic contractual phrasing.',
      mechanics: 'Auditable legal and technical clarity.'
    }
  },
  'b2-u3': {
    id: 'write-b2-m3',
    title: 'Executive Crisis Escalation & Supply Chain Memo',
    titleES: 'Memorando Ejecutivo de Escalación y Riesgo de Cadena de Suministro',
    prompt: 'A critical microcontroller shipment from Taiwan is delayed by 10 days due to customs clearance. Write an executive briefing memo to senior leadership.',
    promptES: 'Un embarque crítico de microcontroladores tiene 10 días de retraso aduanal. Redacta el memorando de escalación para la alta dirección.',
    instruction: 'Write 5-6 sentences detailing the delivery delay, calculating the financial line-stop risk, and presenting two actionable mitigation strategies.',
    instructionES: 'Escribe 5-6 oraciones explicando el retraso, calculando el riesgo financiero y presentando dos estrategias de mitigación.',
    targetKeywords: ['escalation', 'delay', 'mitigation', 'financial', 'alternative'],
    minWords: 55,
    starterTemplate: 'This urgent escalation memo addresses the shipment delay of ... The projected impact threatens a financial line stoppage of ... We recommend two immediate mitigation strategies: first, ... second, ...',
    modelAnswer: 'This urgent escalation briefing addresses the 10-day customs clearance delay affecting automotive microcontroller lot MC-990. Without intervention, plant inventory will exhaust in 72 hours, resulting in a potential financial line-stop penalty of $45,000 per shift. We recommend two parallel mitigation strategies: first, expedite customs clearance via an emergency broker bond; second, source 500 qualified alternative units from our Texas sister facility to maintain assembly continuity.',
    rubric: {
      vocabulary: 'Executive C-level corporate vocabulary (mitigation, escalation, expedite, contingency).',
      grammar: 'Persuasive formal syntax with cause-and-effect logical connectors.',
      mechanics: 'High-impact executive memo structure.'
    }
  },
  'b2-u4': {
    id: 'write-b2-m4',
    title: 'Cross-Cultural Retrospective & Pragmatic Lessons Learned',
    titleES: 'Retrospectiva Intercultural y Lecciones Aprendidas de Nearshoring',
    prompt: 'Conclude a multi-site joint venture project with US and Mexican cross-border engineering teams. Write a reflective lessons-learned email.',
    promptES: 'Concluye un proyecto binacional México-EE.UU. Redacta un correo de retrospectiva y lecciones aprendidas.',
    instruction: 'Write 5-6 sentences synthesizing collaboration achievements, analyzing communication nuances, and thanking both engineering cohorts.',
    instructionES: 'Escribe 5-6 oraciones sintetizando logros binacionales, analizando comunicación intercultural y agradeciendo a los equipos.',
    targetKeywords: ['collaboration', 'retrospective', 'cross-cultural', 'achievement', 'partnership'],
    minWords: 55,
    starterTemplate: 'As we conclude the joint venture launch, I want to share our project retrospective. Our bilateral collaboration achieved ... Overcoming cross-cultural communication challenges allowed us to ... Thank you to both teams for this outstanding partnership.',
    modelAnswer: 'As we conclude the successful cross-border launch of Project Horizon, I am pleased to share our engineering retrospective. Our bilateral collaboration achieved a 99.4% first-pass yield across both manufacturing campuses. By establishing daily asynchronous standups, we bridged technical idioms and turned cross-cultural differences into operational strengths. Thank you to our colleagues in Baja California and Silicon Valley for this exemplary partnership.',
    rubric: {
      vocabulary: 'Advanced pragmatic idioms and collaborative leadership lexicon.',
      grammar: 'Nuanced stylistic register with complex participial clauses.',
      mechanics: 'Warm yet highly professional corporate diplomatic closing.'
    }
  }
};

console.log('Writing Labs configured for', Object.keys(WRITING_LABS).length, 'units.');

// Read content/mcer_tracks.js
let code = fs.readFileSync(MCER_PATH, 'utf8');

// 1. Inject writingLab & skillsBreakdown into each unit definition in MCER_LEVELS
Object.keys(WRITING_LABS).forEach(unitId => {
  const lab = WRITING_LABS[unitId];
  const unitMarker = `"id": "${unitId}",`;
  if (!code.includes(unitMarker)) {
    console.warn(`Warning: unit marker not found for ${unitId}`);
    return;
  }

  // Check if writingLab is already in unit block
  // Find where this unit ends or where unitNum is
  const unitIndex = code.indexOf(unitMarker);
  const nextUnitOrEnd = code.indexOf('"id":', unitIndex + unitMarker.length);
  const unitSubstring = code.substring(unitIndex, nextUnitOrEnd !== -1 ? nextUnitOrEnd : unitIndex + 5000);

  if (!unitSubstring.includes('"writingLab":')) {
    // Insert writingLab after "hours": 15, or after "xp":
    const insertAfter = '"xp":';
    const xpPos = code.indexOf(insertAfter, unitIndex);
    if (xpPos !== -1 && (nextUnitOrEnd === -1 || xpPos < nextUnitOrEnd)) {
      const lineEnd = code.indexOf('\n', xpPos);
      const injection = `\n        "isModule": true,\n        "moduleNumber": ${unitId.split('-u')[1]},\n        "modulo": "Módulo ${unitId.split('-u')[1]}",\n        "estimatedDuration": "10 min",\n        "durationMinutes": 10,\n        "skillsBreakdown": {\n          "listeningMinutes": 2.5,\n          "readingMinutes": 2.5,\n          "writingMinutes": 2.5,\n          "speakingMinutes": 2.5,\n          "totalMinutes": 10\n        },\n        "writingLab": ${JSON.stringify(lab, null, 10).replace(/\n/g, '\n        ')},`;
      code = code.substring(0, lineEnd) + injection + code.substring(lineEnd);
      console.log(`Injected writingLab into ${unitId}`);
    }
  } else {
    console.log(`Unit ${unitId} already has writingLab`);
  }
});

// 2. Update normalizeUnit to support writingLab and module properties
const normalizeTarget = 'vocabularyExercises: u.vocabularyExercises || []';
const normalizeReplacement = `vocabularyExercises: u.vocabularyExercises || [],
      isModule: true,
      moduleNumber: u.moduleNumber || u.unitNum || u.unitNumber,
      modulo: u.modulo || ('Módulo ' + (u.moduleNumber || u.unitNum || u.unitNumber)),
      estimatedDuration: u.estimatedDuration || '10 min',
      durationMinutes: u.durationMinutes || 10,
      skillsBreakdown: u.skillsBreakdown || {
        listeningMinutes: 2.5,
        readingMinutes: 2.5,
        writingMinutes: 2.5,
        speakingMinutes: 2.5,
        totalMinutes: 10
      },
      writingLab: u.writingLab || null`;

if (code.includes(normalizeTarget) && !code.includes('writingLab: u.writingLab || null')) {
  code = code.replace(normalizeTarget, normalizeReplacement);
  console.log('Updated normalizeUnit with module & writingLab properties.');
}

// 3. Add evaluateWritingSubmission and getBasePaths to return API
const apiAnchor = 'calculateStudentProgress: function(userLevel, completedUnitIds, passedExamLevels) {';
const apiAddition = `getAllModules: function() {
      return this.getAllUnits();
    },
    getModuleById: function(moduleId) {
      return this.getUnitById(moduleId);
    },
    getModulesByLevel: function(levelId) {
      return this.getUnitsByLevel(levelId);
    },
    getBasePaths: function() {
      return {
        levelPaths: [
          {
            id: 'path-mcer-a1',
            level: 'A1',
            name: 'Ruta Base A1: Fundamentos y Comunicación Esencial',
            nameEN: 'Base Path A1: Foundations & Essential Workplace Communication',
            totalModules: 4,
            durationPerModule: '10 min',
            accreditedHours: 60.0,
            skills: ['Listening', 'Reading', 'Writing', 'Speaking'],
            summary: '4 módulos balanceados de 10 minutos para estudiantes sin conocimientos previos. Cobertura completa de gramática, fonética y vocabulario inicial de planta.'
          },
          {
            id: 'path-mcer-a2',
            level: 'A2',
            name: 'Ruta Base A2: Operaciones, Mantenimiento e Incidentes',
            nameEN: 'Base Path A2: Shopfloor Operations, Maintenance & Incident Reporting',
            totalModules: 4,
            durationPerModule: '10 min',
            accreditedHours: 60.0,
            skills: ['Listening', 'Reading', 'Writing', 'Speaking'],
            summary: '4 módulos balanceados de 10 minutos para interactuar en turnos, reportar fallas en pasado, comparar refacciones y redactar órdenes de trabajo.'
          },
          {
            id: 'path-mcer-b1',
            level: 'B1',
            name: 'Ruta Base B1: Troubleshooting, Calidad y Transición ESP',
            nameEN: 'Base Path B1: Troubleshooting, Quality Assurance & ESP Transition Gateway',
            totalModules: 4,
            durationPerModule: '10 min',
            accreditedHours: 60.0,
            skills: ['Listening', 'Reading', 'Writing', 'Speaking'],
            summary: '4 módulos balanceados de 10 minutos que consolidan fluidez técnica en las 4 habilidades para abrir acceso a los 34 tracks especializados de la industria.'
          }
        ],
        skillPaths: [
          {
            id: 'skill-path-listening',
            skill: 'listening',
            name: 'Ruta de Comprensión Auditiva (Listening)',
            icon: 'fa-headphones',
            color: '#0ea5e9',
            description: '16 módulos con audio nativo americano (diálogos de planta, briefings de supervisor, llamadas técnicas y preguntas de verificación rápida).'
          },
          {
            id: 'skill-path-reading',
            skill: 'reading',
            name: 'Ruta de Comprensión Lectora (Reading)',
            icon: 'fa-file-lines',
            color: '#10b981',
            description: '16 módulos de lectura técnica (señalética EHS, manuales de equipo, hojas SOP, reportes de turno y especificaciones de calidad).'
          },
          {
            id: 'skill-path-writing',
            skill: 'writing',
            name: 'Ruta de Expresión Escrita con IA (Writing Lab)',
            icon: 'fa-pen-to-square',
            color: '#f59e0b',
            description: '16 retos interactivos de redacción técnica con rúbrica automatizada e IA rápida (bitácoras, órdenes de trabajo, correos ejecutivos y reportes 8D).'
          },
          {
            id: 'skill-path-speaking',
            skill: 'speaking',
            name: 'Ruta de Expresión Oral y Fonética (Speaking & Crisol)',
            icon: 'fa-microphone-lines',
            color: '#8b5cf6',
            description: 'Laboratorio fonético IPA, acentuación silábica y simulaciones en Crisol de Voz Industrial con debate socrático en tiempo real.'
          }
        ]
      };
    },
    evaluateWritingSubmission: function(unitId, userText) {
      const unit = this.getUnitById(unitId);
      if (!unit || !unit.writingLab) {
        return {
          score: 70,
          passed: true,
          feedback: 'Texto recibido. La unidad no define una rúbrica específica.',
          keywordsFound: [],
          keywordsMissing: [],
          wordCount: (userText || '').trim().split(/\\s+/).filter(Boolean).length
        };
      }

      const lab = unit.writingLab;
      const text = (userText || '').trim();
      const words = text ? text.split(/\\s+/).filter(Boolean) : [];
      const wordCount = words.length;
      const minWords = lab.minWords || 15;

      // 1. Keyword analysis
      const lowerText = text.toLowerCase();
      const targetKeywords = lab.targetKeywords || [];
      const keywordsFound = [];
      const keywordsMissing = [];

      targetKeywords.forEach(kw => {
        const lowerKw = kw.toLowerCase();
        if (lowerText.includes(lowerKw)) {
          keywordsFound.push(kw);
        } else {
          keywordsMissing.push(kw);
        }
      });

      const keywordRatio = targetKeywords.length > 0 ? (keywordsFound.length / targetKeywords.length) : 1;
      const keywordScore = Math.round(keywordRatio * 40);

      // 2. Length / Elaboration score (30 pts max)
      const lengthRatio = Math.min(1.2, wordCount / minWords);
      const lengthScore = Math.round(Math.min(30, lengthRatio * 30));

      // 3. Sentence mechanics & structure (30 pts max)
      let mechanicsScore = 20;
      if (text.length > 0 && /^[A-Z]/.test(text)) mechanicsScore += 5; // Starts with capital
      if (/[.!?]$/.test(text)) mechanicsScore += 5; // Ends with punctuation

      // Detect common beginner errors or Spanish leakage
      const spanishMarkers = ['\\bque\\b', '\\bde\\b', '\\bel\\b', '\\bla\\b', '\\ben\\b', '\\by\\b', '\\bpor\\b', '\\bcon\\b'];
      let spanishCount = 0;
      spanishMarkers.forEach(pat => {
        if (new RegExp(pat, 'i').test(text)) spanishCount++;
      });
      if (spanishCount > 2) {
        mechanicsScore = Math.max(5, mechanicsScore - 15);
      }

      const totalScore = Math.min(100, keywordScore + lengthScore + mechanicsScore);
      const passed = totalScore >= 70 && wordCount >= Math.floor(minWords * 0.7);

      // Socratic constructive feedback
      let feedback = '';
      if (passed) {
        feedback = \`¡Excelente redacción técnica! Obtuviste \${totalScore}/100. Has integrado con precisión \${keywordsFound.length} de \${targetKeywords.length} términos clave requeridos en este módulo.\`;
      } else if (wordCount < minWords) {
        feedback = \`Tu texto tiene \${wordCount} palabras (mínimo recomendado: \${minWords}). Amplía tu explicación añadiendo detalles del entorno de trabajo.\`;
      } else if (keywordsFound.length < Math.ceil(targetKeywords.length / 2)) {
        feedback = \`Buen intento (\${wordCount} palabras), pero necesitas integrar más vocabulario técnico del módulo. Faltaron: \${keywordsMissing.slice(0, 3).join(', ')}.\`;
      } else {
        feedback = \`Buen avance (\${totalScore}/100). Revisa la puntuación y asegúrate de cerrar cada oración con punto y mayúscula inicial.\`;
      }

      return {
        score: totalScore,
        passed: passed,
        wordCount: wordCount,
        minWords: minWords,
        keywordsFound: keywordsFound,
        keywordsMissing: keywordsMissing,
        feedback: feedback,
        modelAnswer: lab.modelAnswer,
        xpAwarded: passed ? 120 : 40
      };
    },
    ` + apiAnchor;

if (code.includes(apiAnchor) && !code.includes('evaluateWritingSubmission: function')) {
  code = code.replace(apiAnchor, apiAddition);
  console.log('Added getAllModules, getBasePaths, and evaluateWritingSubmission to STEMOS_MCER_TRACKS API.');
}

// 4. Update getPedagogicalDimensions in STEMOS_MCER_TRACKS to include writing
const pedTarget = "{ id: 'listening', name: 'Listening Comprehension Lab', nameES: 'Laboratorio de Comprensión Auditiva (Audio Nativo)', icon: 'fa-headphones', target: 'Industrial SOPs & Spoken English' },";
const pedReplacement = `{ id: 'listening', name: 'Listening Comprehension Lab', nameES: 'Laboratorio de Comprensión Auditiva (Audio Nativo)', icon: 'fa-headphones', target: 'Industrial SOPs & Spoken English' },
        { id: 'reading', name: 'Technical SOP Reading & Verification', nameES: 'Lectura Técnica & Protocolos Estandarizados', icon: 'fa-file-lines', target: 'Engineering Manuals & Work Instructions' },
        { id: 'writing', name: 'Technical Writing Lab & Rapid AI', nameES: 'Taller de Redacción Técnica & IA Rápida', icon: 'fa-pen-to-square', target: 'Workplace Notes, Logs & Clear Industrial Correspondence' },
        { id: 'speaking', name: 'Nearshoring Voice Crucible & Socratic AI', nameES: 'Crisol de Voz Industrial & Expresión Oral', icon: 'fa-microphone-lines', target: 'Real-time Plant Troubleshooting Simulation' },`;

if (code.includes(pedTarget) && !code.includes("id: 'writing'")) {
  code = code.replace(pedTarget, pedReplacement);
  console.log('Updated pedagogical dimensions to emphasize the 4 balanced skills.');
}

// Write to root and dev/ with 100% bit-for-bit parity
fs.writeFileSync(MCER_PATH, code, 'utf8');
fs.writeFileSync(DEV_MCER_PATH, code, 'utf8');

console.log('✅ Successfully updated content/mcer_tracks.js and dev/content/mcer_tracks.js');
