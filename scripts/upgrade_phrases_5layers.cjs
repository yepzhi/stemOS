const fs = require('fs');
const path = require('path');

const phrasesFilePath = path.join(__dirname, '../content/phrases_library.js');
let rawCode = fs.readFileSync(phrasesFilePath, 'utf8');

// Match existing array
const arrayMatch = rawCode.match(/var STEMOS_PHRASES = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.error('Could not find STEMOS_PHRASES array in file.');
  process.exit(1);
}

let existingList;
try {
  existingList = eval(arrayMatch[1]);
} catch (e) {
  console.error('Failed to parse existing phrases:', e.message);
  process.exit(1);
}

console.log(`Loaded ${existingList.length} existing phrases.`);

// Map category to Eje B Skill Category
function mapToSkill(cat, phraseText) {
  const p = (phraseText || '').toLowerCase();
  if (p.includes('loto') || p.includes('shift') || p.includes('line') || p.includes('plant') || p.includes('stand down') || p.includes('choke point') || p.includes('corner') || p.includes('safety')) {
    return 'plant_floor';
  }
  if (p.includes('table') || p.includes('meeting') || p.includes('circle back') || p.includes('loop') || p.includes('touch base') || p.includes('offline') || p.includes('room') || p.includes('bandwidth') || p.includes('hard stop') || p.includes('deadline')) {
    return 'meetings_escalations';
  }
  if (p.includes('report') || p.includes('email') || p.includes('8d') || p.includes('capa') || p.includes('ncr') || p.includes('document') || p.includes('bases')) {
    return 'written_reports';
  }
  if (p.includes('pitch') || p.includes('devil\'s advocate') || p.includes('present') || p.includes('flagpole') || p.includes('needle') || p.includes('sanity check') || p.includes('drawing board')) {
    return 'presentation_pitch';
  }
  if (p.includes('negotiat') || p.includes('deal') || p.includes('leverage') || p.includes('push back') || p.includes('give and take') || p.includes('walk away') || p.includes('feet to the fire') || p.includes('pay grade')) {
    return 'negotiation_leadership';
  }

  // Fallback by original category
  switch (cat) {
    case 'workplace': return 'plant_floor';
    case 'meetings': return 'meetings_escalations';
    case 'technical_debate': return 'meetings_escalations';
    case 'conflict_resolution': return 'negotiation_leadership';
    case 'problem_solving': return 'written_reports';
    case 'metrics': return 'presentation_pitch';
    case 'soft_skills': return 'negotiation_leadership';
    default: return 'colloquial_radar';
  }
}

// Dialect traps dictionary
const DIALECT_TRAPS = {
  "table this discussion": {
    hasTrap: true,
    usMeaning: "Posponer / suspender temporalmente de la agenda para atender lo urgente.",
    ukMeaning: "Poner a discusión prioritaria INMEDIATA sobre la mesa AHORA."
  },
  "let's table this discussion": {
    hasTrap: true,
    usMeaning: "Posponer / suspender temporalmente de la agenda para atender lo urgente.",
    ukMeaning: "Poner a discusión prioritaria INMEDIATA sobre la mesa AHORA."
  },
  "stand down": {
    hasTrap: true,
    usMeaning: "Cesar una operación o dar tregua a un estado de alerta en planta.",
    ukMeaning: "Renunciar formalmente a un cargo o retirarse de una posición pública."
  },
  "bomb": {
    hasTrap: true,
    usMeaning: "Fracaso total ('the audit bombed').",
    ukMeaning: "Gran éxito rotundo ('it went like a bomb')."
  }
};

// Enrich existing list with 5 layers
existingList.forEach(item => {
  const phraseLower = item.phrase.toLowerCase();
  
  if (!item.skillCategory) {
    item.skillCategory = mapToSkill(item.category, item.phrase);
  }
  
  if (!item.operationalMeaning) {
    item.operationalMeaning = item.meaningES || "Expresión técnica idiomática utilizada en entornos de manufactura avanzada.";
  }
  
  if (!item.mentalImageOrigin) {
    item.mentalImageOrigin = item.explanation || "Metáfora de ingeniería y lenguaje corporal adoptada en operaciones industriales nativas.";
  }
  
  if (!item.plantExample) {
    item.plantExample = item.exampleEN || "Standard operational communication in high-tech plant environments.";
  }
  
  if (!item.dialectDifference) {
    if (DIALECT_TRAPS[phraseLower]) {
      item.dialectDifference = DIALECT_TRAPS[phraseLower];
    } else {
      item.dialectDifference = {
        hasTrap: false,
        usMeaning: "Uso estándar en plantas de EE.UU. y operaciones de Nearshoring en México.",
        ukMeaning: "Comprendido de forma equivalente en ingeniería británica e internacional."
      };
    }
  }
  
  if (!item.riskLevel) {
    if (item.dialectDifference && item.dialectDifference.hasTrap) {
      item.riskLevel = "CRÍTICO";
    } else if (item.skillCategory === 'meetings_escalations' || item.skillCategory === 'negotiation_leadership') {
      item.riskLevel = "MEDIO";
    } else {
      item.riskLevel = "BAJO";
    }
  }
});

// New prioritized idioms from PLAN_DE_DESARROLLO.md
const newIdioms = [
  {
    "id": "phr-table-discussion",
    "phrase": "Let's table this discussion",
    "category": "meetings",
    "skillCategory": "meetings_escalations",
    "schoolVsNative": {
      "school": "We will not talk about this right now.",
      "native": "Let's table this discussion."
    },
    "meaningES": "Posponer temporalmente un tema para priorizar lo urgente (US)",
    "explanation": "En EE.UU. 'table' significa retirar un asunto de la mesa de debate y guardarlo en el cajón para después. En Reino Unido significa exactamente lo contrario (ponerlo a discusión inmediata). Es el modismo con mayor tasa de error en juntas cross-border.",
    "operationalMeaning": "Suspender temporalmente un punto de la agenda para concentrarse en bloqueos de producción inmediatos.",
    "mentalImageOrigin": "Práctica parlamentaria donde una ley se retiraba del debate colocándola sobre la mesa en reposo.",
    "plantExample": "We are getting too deep into the weeds with this valve tolerance. Let's table this discussion until the supplier provides the CMM report.",
    "exampleEN": "Let's table this discussion until the supplier provides the CMM dimensional report tomorrow morning.",
    "exampleES": "Pospongamos esta discusión hasta que el proveedor entregue el reporte dimensional CMM mañana por la mañana.",
    "dialectDifference": {
      "hasTrap": true,
      "usMeaning": "Posponer / Suspender temporalmente (Postpone / Shelve)",
      "ukMeaning": "Poner a discusión inmediata AHORA (Put forward for immediate debate)"
    },
    "riskLevel": "CRÍTICO",
    "pronunciationHint": "Pronuncia 'table' con diptongo /eɪ/ y 'discussion' con acento medio: /ˈteɪ.bəl ðɪs dɪˈskʌʃ.ən/."
  },
  {
    "id": "phr-cut-corners",
    "phrase": "Don't cut corners on QA",
    "category": "workplace",
    "skillCategory": "plant_floor",
    "schoolVsNative": {
      "school": "Do not do the work badly or quickly.",
      "native": "Don't cut corners on QA."
    },
    "meaningES": "No tomes atajos / No escatimes en calidad ni te saltes pasos",
    "explanation": "Metáfora de cortar las esquinas de un camino para llegar más rápido. En manufactura automotriz o médica, 'cutting corners' es motivo de auditoría y despido inmediato.",
    "operationalMeaning": "Saltarse pasos del SOP, no calibrar galgas o apurar un ciclo de curado para cumplir la cuota por turno.",
    "mentalImageOrigin": "Conducir o caminar cortando esquinas en vez de seguir la curva formal del pavimento.",
    "plantExample": "Even if the shift quota is tight, do not cut corners on the torque validation of safety-critical bolts.",
    "exampleEN": "Even if we are behind schedule, we cannot cut corners on the high-voltage insulation tests.",
    "exampleES": "Incluso si vamos retrasados, no podemos saltarnos pasos en las pruebas de aislamiento de alto voltaje.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Tomar atajos que comprometen la calidad o seguridad.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "ALTO",
    "pronunciationHint": "Conecta 'cut' con 'corners': /kʌt ˈkɔːr.nərz/."
  },
  {
    "id": "phr-drop-the-ball",
    "phrase": "We dropped the ball on that shipment",
    "category": "conflict_resolution",
    "skillCategory": "meetings_escalations",
    "schoolVsNative": {
      "school": "We made a mistake and forgot it.",
      "native": "We dropped the ball on that shipment."
    },
    "meaningES": "Cometer un error por descuido / Fallar en la entrega o seguimiento",
    "explanation": "Viene del fútbol americano o béisbol: cuando un jugador tiene el pase en las manos y deja caer el balón por falta de concentración.",
    "operationalMeaning": "Incumplir un hito acordado por falta de ownership o seguimiento entre turnos de producción.",
    "mentalImageOrigin": "Dejar caer un balón que tenías asegurado en las manos.",
    "plantExample": "Production thought Logistics had the export permits, and Logistics thought Quality had them. We dropped the ball.",
    "exampleEN": "We dropped the ball on notifying the customer about the customs hold in Laredo.",
    "exampleES": "Cometimos el descuido de no notificar al cliente sobre la retención aduanal en Laredo.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Cometer una pifia por descuido.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "Acento en 'ball': /drɑːpt ðə bɔːl/."
  },
  {
    "id": "phr-put-out-fires",
    "phrase": "We've been putting out fires all day",
    "category": "workplace",
    "skillCategory": "plant_floor",
    "schoolVsNative": {
      "school": "We have been solving many urgent problems.",
      "native": "We've been putting out fires all day."
    },
    "meaningES": "Apagar fuegos / Atender emergencias reactivas sin tiempo de planear",
    "explanation": "Expresa el estado de estrés operativo donde un ingeniero pasa de una crisis a otra sin poder hacer análisis de causa raíz.",
    "operationalMeaning": "Atención reactiva a paros de máquina, faltantes de material y rechazos de cliente sin estabilidad de proceso.",
    "mentalImageOrigin": "Bombero corriendo de un conato de incendio a otro en un almacén.",
    "plantExample": "Until we stabilize Line 3's PLC ladder logic, maintenance will just be putting out fires every shift.",
    "exampleEN": "I couldn't finish the 8D report because I was putting out fires on the stamping press all morning.",
    "exampleES": "No pude terminar el reporte 8D porque estuve apagando fuegos en la prensa de estampado toda la mañana.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Resolver crisis urgentes de forma reactiva.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "Pronuncia 'putting' suave: /ˈpʊt.ɪŋ aʊt ˈfaɪərz/."
  },
  {
    "id": "phr-stand-down",
    "phrase": "Stand down the assembly cell",
    "category": "workplace",
    "skillCategory": "plant_floor",
    "schoolVsNative": {
      "school": "Stop working on that machine immediately.",
      "native": "Stand down the assembly cell."
    },
    "meaningES": "Paro preventivo inmediato / Ponerse en pausa hasta nueva orden",
    "explanation": "Orden perentoria militar adoptada en plantas automotrices y aeroespaciales ante un riesgo crítico de seguridad o calidad.",
    "operationalMeaning": "Detener el ciclo de trabajo de operadores y máquinas para evitar producir chatarra o arriesgar integridad física.",
    "mentalImageOrigin": "Soldados retirándose de la posición de guardia.",
    "plantExample": "Quality detected a cracked carbide bit on CNC-04. Stand down the entire batch until 100% inspection is completed.",
    "exampleEN": "Safety officer ordered a stand-down on Line 2 following the hydraulic leak.",
    "exampleES": "El oficial de seguridad ordenó un paro total en la Línea 2 tras la fuga hidráulica.",
    "dialectDifference": {
      "hasTrap": true,
      "usMeaning": "Parar temporalmente una línea o celda de manufactura.",
      "ukMeaning": "Renunciar a un cargo directivo formal."
    },
    "riskLevel": "CRÍTICO",
    "pronunciationHint": "Énfasis en 'down': /stænd daʊn/."
  },
  {
    "id": "phr-choke-point",
    "phrase": "The CMM inspection is our choke point",
    "category": "metrics",
    "skillCategory": "plant_floor",
    "schoolVsNative": {
      "school": "That station makes the line slow.",
      "native": "The CMM inspection is our choke point."
    },
    "meaningES": "Punto de estrangulamiento / Cuello de botella restrictivo",
    "explanation": "Término estratégico militar que describe un paso angosto donde las tropas se acumulan. En manufactura, es la estación con mayor tiempo de ciclo.",
    "operationalMeaning": "Proceso con menor capacidad de rendimiento (throughput) que restringe el ritmo de toda la planta (Theory of Constraints).",
    "mentalImageOrigin": "Un embudo o desfiladero estrecho donde se atoran los vehículos.",
    "plantExample": "Surface treatment takes 45 minutes per rack; it is the ultimate choke point for our aerospace turbine blades.",
    "exampleEN": "If we don't automate the wire harness crimping, it will remain our main choke point.",
    "exampleES": "Si no automatizamos el ponchado de arneses, seguirá siendo nuestro principal punto de estrangulamiento.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Cuello de botella operativo severo.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "ALTO",
    "pronunciationHint": "/ˈtʃoʊk ˌpɔɪnt/."
  },
  {
    "id": "phr-bulletproof",
    "phrase": "We need a bulletproof containment plan",
    "category": "problem_solving",
    "skillCategory": "written_reports",
    "schoolVsNative": {
      "school": "Make a plan that has no mistakes.",
      "native": "We need a bulletproof containment plan."
    },
    "meaningES": "A prueba de balas / Blindado contra fallas y auditorías",
    "explanation": "En ingeniería se usa para procesos, códigos de software o planes 8D que han sido probados contra los peores escenarios posibles.",
    "operationalMeaning": "Protocolo robusto que garantiza cero defectos de escape hacia el cliente final.",
    "mentalImageOrigin": "Chaleco o blindaje balístico que detiene proyectiles.",
    "plantExample": "Before the GM audit team arrives, our poke-yoke error-proofing system must be completely bulletproof.",
    "exampleEN": "Our D4 root-cause verification methodology needs to be 100% bulletproof.",
    "exampleES": "Nuestra metodología de verificación de causa raíz D4 debe estar 100% blindada.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Invulnerable a errores o cuestionamientos.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/ˈbʊl.ɪt.pruːf/."
  },
  {
    "id": "phr-rule-of-thumb",
    "phrase": "As a rule of thumb, allow 15% margin",
    "category": "metrics",
    "skillCategory": "plant_floor",
    "schoolVsNative": {
      "school": "General practical rule.",
      "native": "As a rule of thumb, allow 15% margin."
    },
    "meaningES": "Como regla empírica / Regla práctica general",
    "explanation": "Heurística basada en la experiencia de taller más que en una fórmula matemática formal.",
    "operationalMeaning": "Parámetro aproximado de ingeniería usado para estimaciones rápidas en planta antes de la simulación.",
    "mentalImageOrigin": "Medir distancias en carpintería usando el ancho del pulgar.",
    "plantExample": "As a rule of thumb in injection molding, wall thickness should be kept within 2.5 to 3 millimeters.",
    "exampleEN": "As a rule of thumb, cooling time accounts for roughly 70% of the entire molding cycle.",
    "exampleES": "Como regla empírica, el tiempo de enfriamiento representa aproximadamente el 70% de todo el ciclo de moldeo.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Regla práctica aproximada.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/ˌruːl əv ˈθʌm/."
  },
  {
    "id": "phr-above-pay-grade",
    "phrase": "That sign-off is above my pay grade",
    "category": "workplace",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "I do not have the authority to decide this.",
      "native": "That sign-off is above my pay grade."
    },
    "meaningES": "Eso rebasa mi nivel de autoridad / No me corresponde autorizarlo",
    "explanation": "Manera profesional de delimitar responsabilidad sin sonar incompetente. Indica que la decisión involucra presupuesto o riesgo corporativo.",
    "operationalMeaning": "Derivación formal de una decisión técnica o financiera hacia la dirección de planta o matriz.",
    "mentalImageOrigin": "Tabulador militar de rangos y salarios.",
    "plantExample": "Accepting parts with out-of-spec micro-voids is above my pay grade; we need the Director of Quality to sign the deviation.",
    "exampleEN": "Approving a $50,000 tooling modification is above my pay grade.",
    "exampleES": "Aprobar una modificación de herramental de $50,000 USD rebasa mi nivel de autoridad.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Decisión reservada para niveles jerárquicos superiores.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/əˈbʌv maɪ ˈpeɪ ɡreɪd/."
  },
  {
    "id": "phr-read-the-room",
    "phrase": "You need to read the room during the audit",
    "category": "soft_skills",
    "skillCategory": "meetings_escalations",
    "schoolVsNative": {
      "school": "Understand how people feel in the room.",
      "native": "You need to read the room during the audit."
    },
    "meaningES": "Leer el ambiente / Percibir la tensión o ánimo de los presentes",
    "explanation": "Habilidad política clave para ingenieros que presentan ante clientes o auditores de IATF/FDA. Evita hacer comentarios inoportunos en momentos de tensión.",
    "operationalMeaning": "Ajustar el tono, nivel de detalle y ritmo de la presentación según el nivel de frustración o urgencia de la contraparte.",
    "mentalImageOrigin": "Un actor interpretando el lenguaje no verbal del público en el teatro.",
    "plantExample": "The VP was visibly frustrated by the yield drop. Read the room and keep your root-cause summary strictly to verified facts.",
    "exampleEN": "Before proposing an overtime weekend, read the room; the technicians are already burned out.",
    "exampleES": "Antes de proponer tiempo extra el fin de semana, lee el ambiente; los técnicos ya están exhaustos.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Evaluar el clima emocional de una junta.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/riːd ðə ruːm/."
  },
  {
    "id": "phr-loop-in",
    "phrase": "Please loop in the supply chain team",
    "category": "workplace",
    "skillCategory": "meetings_escalations",
    "schoolVsNative": {
      "school": "Send this email to the supply chain team too.",
      "native": "Please loop in the supply chain team."
    },
    "meaningES": "Incluir a alguien en el flujo de comunicación / Mantener al tanto",
    "explanation": "El verbo estándar en corporativos globales para agregar a un colega a un hilo de correo, canal de Slack o junta de estatus.",
    "operationalMeaning": "Asegurar que todas las áreas afectadas por un cambio de ingeniería (ECO) tengan visibilidad inmediata.",
    "mentalImageOrigin": "Cerrar un circuito eléctrico o una curva que incluye a más componentes.",
    "plantExample": "Since the resin formulation is changing, loop in the tooling engineer before issuing the PO.",
    "exampleEN": "I'm looping in Carlos from logistics so he can track the customs clearance.",
    "exampleES": "Estoy incluyendo a Carlos de logística para que pueda monitorear el despacho aduanal.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Integrar a alguien a una conversación o hilo de trabajo.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/luːp ɪn/."
  },
  {
    "id": "phr-cover-your-bases",
    "phrase": "Document everything to cover your bases",
    "category": "workplace",
    "skillCategory": "written_reports",
    "schoolVsNative": {
      "school": "Protect yourself from future problems.",
      "native": "Document everything to cover your bases."
    },
    "meaningES": "Cubrirte las espaldas / Asegurar todas las variables para no tener vulnerabilidades",
    "explanation": "Viene del béisbol, donde los jugadores de campo deben cubrir cada base para que el rival no anote.",
    "operationalMeaning": "Guardar registros de calibración, minutas firmadas y fotos de piezas para respaldar la posición técnica ante un reclamo.",
    "mentalImageOrigin": "Defensores colocándose exactamente sobre las almohadillas del diamante de béisbol.",
    "plantExample": "Always archive the raw CMM point cloud data alongside the PDF summary to cover your bases during warranty reviews.",
    "exampleEN": "Let's run a second torque audit just to cover our bases before final sign-off.",
    "exampleES": "Hagamos una segunda auditoría de torque solo para cubrirnos las espaldas antes de la firma final.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Tomar todas las precauciones documentales y técnicas.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/ˈkʌv.ər jʊər ˈbeɪ.sɪz/."
  },
  {
    "id": "phr-in-the-weeds",
    "phrase": "We're getting too deep in the weeds",
    "category": "meetings",
    "skillCategory": "meetings_escalations",
    "schoolVsNative": {
      "school": "We are talking about too many small details.",
      "native": "We're getting too deep in the weeds."
    },
    "meaningES": "Nos estamos perdiendo en los detalles / Ahogándonos en tecnicismos",
    "explanation": "Frase ejecutiva indispensable para moderar juntas que se alargan porque dos ingenieros debaten una minucia en lugar de decidir el rumbo general.",
    "operationalMeaning": "Perder de vista el objetivo de entrega por discutir matices técnicos secundarios.",
    "mentalImageOrigin": "Quedar atrapado en matorrales altos que te impiden ver el sendero.",
    "plantExample": "Gentlemen, we are in the weeds on solder paste chemistry. Let's refocus on whether the wave speed meets our tact time.",
    "exampleEN": "Let's step back; we're getting way too in the weeds on this minor bracket chamfer.",
    "exampleES": "Demos un paso atrás; nos estamos perdiendo en los detalles con este chaflán menor del soporte.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Enredarse en micro-detalles.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/ɪn ðə wiːdz/."
  },
  {
    "id": "phr-no-bandwidth",
    "phrase": "I don't have the bandwidth right now",
    "category": "workplace",
    "skillCategory": "meetings_escalations",
    "schoolVsNative": {
      "school": "I do not have time to do this task.",
      "native": "I don't have the bandwidth right now."
    },
    "meaningES": "No tengo capacidad operativa / No tengo espacio mental ni tiempo",
    "explanation": "Término adoptado de las telecomunicaciones (ancho de banda de un canal). Es la forma más profesional y elegante en Silicon Valley y manufactura para rechazar trabajo adicional sin sonar perezoso.",
    "operationalMeaning": "Saturación de carga laboral que impide asumir un nuevo proyecto sin descuidar los existentes.",
    "mentalImageOrigin": "Una fibra óptica o cable coaxial saturado de paquetes de datos que no puede transmitir un solo byte más.",
    "plantExample": "I can help with the ISO audit next month, but with the new line startup, I don't have the bandwidth this week.",
    "exampleEN": "Our controls team doesn't have the bandwidth to reprogram the welding cells before Friday.",
    "exampleES": "Nuestro equipo de controles no tiene la capacidad operativa para reprogramar las celdas de soldadura antes del viernes.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Capacidad o tiempo disponible para absorber trabajo.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/ˈbænd.wɪdθ/."
  },
  {
    "id": "phr-kick-the-can",
    "phrase": "Let's not kick the can down the road",
    "category": "problem_solving",
    "skillCategory": "meetings_escalations",
    "schoolVsNative": {
      "school": "Do not delay solving this problem.",
      "native": "Let's not kick the can down the road."
    },
    "meaningES": "No pateemos el bote hacia adelante / No pospongamos una solución de fondo",
    "explanation": "Advierte contra soluciones temporales 'parche' que solo aplazan una crisis mayor para el siguiente turno o trimestre.",
    "operationalMeaning": "Negarse a cerrar un 8D con acciones temporales de contención en lugar de una acción correctiva permanente (D5/D6).",
    "mentalImageOrigin": "Un niño pateando una lata vacía por la calle en lugar de levantarla y tirarla a la basura.",
    "plantExample": "Adding a manual inspector is just kicking the can down the road. We need automatic optical inspection at the source.",
    "exampleEN": "Replacing the hydraulic hose every week is kicking the can down the road; we need to find why the pressure spikes.",
    "exampleES": "Reemplazar la manguera hidráulica cada semana es patear el bote; necesitamos descubrir por qué hay picos de presión.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Postergar una decisión difícil sin resolverla.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "ALTO",
    "pronunciationHint": "/kɪk ðə kæn daʊn ðə roʊd/."
  },
  {
    "id": "phr-throw-under-bus",
    "phrase": "Don't throw your team under the bus",
    "category": "conflict_resolution",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "Do not blame other people to save yourself.",
      "native": "Don't throw your team under the bus."
    },
    "meaningES": "No eches a tu equipo a los leones / No culpes a otros para salvarte",
    "explanation": "Actitud tóxica donde un líder o colega responsabiliza públicamente a otro ante la gerencia para desviar la culpa.",
    "operationalMeaning": "Culpabilizar al operador o al turno nocturno ante el auditor para encubrir una falla sistémica de ingeniería.",
    "mentalImageOrigin": "Empujar físicamente a alguien debajo de las ruedas de un autobús en movimiento.",
    "plantExample": "Instead of throwing the third-shift operator under the bus, let's fix the unclear fixture labeling that caused the mistake.",
    "exampleEN": "A good engineering manager never throws their team under the bus in front of executive leadership.",
    "exampleES": "Un buen gerente de ingeniería jamás echa a su equipo a los leones frente a la alta dirección.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Traicionar o culpar a un colega para salvar el propio pellejo.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "CRÍTICO",
    "pronunciationHint": "/θroʊ ˈʌn.dər ðə bʌs/."
  },
  {
    "id": "phr-run-it-up-flagpole",
    "phrase": "Let's run it up the flagpole",
    "category": "meetings",
    "skillCategory": "presentation_pitch",
    "schoolVsNative": {
      "school": "Let us show this idea to see if people like it.",
      "native": "Let's run it up the flagpole."
    },
    "meaningES": "Izar la bandera para ver quién saluda / Sondear la reacción de la dirección",
    "explanation": "Viene del mundo publicitario y militar de EE.UU.: 'Let's run it up the flagpole and see who salutes'. Significa presentar una idea tentativa para ver qué resistencia genera antes de formalizarla.",
    "operationalMeaning": "Compartir un anteproyecto técnico o propuesta de CAPEX informalmente con la matriz para calibrar aceptación.",
    "mentalImageOrigin": "Izar una bandera en el asta de un cuartel para observar si la tropa forma y saluda.",
    "plantExample": "I sketched a redesign for the sub-assembly fixture. Let's run it up the flagpole with the plant director during tomorrow's walk.",
    "exampleEN": "Before we write the full CapEx proposal, let's run the conveyor automation idea up the flagpole with corporate.",
    "exampleES": "Antes de redactar la propuesta completa de CapEx, sondeeemos la idea de automatización de transportadores con corporativo.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Probar una idea para evaluar reacciones.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/rʌn ɪt ʌp ðə ˈflæɡ.poʊl/."
  },
  {
    "id": "phr-hold-feet-to-fire",
    "phrase": "The OEM is holding our feet to the fire",
    "category": "conflict_resolution",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "The customer is putting great pressure on us.",
      "native": "The OEM is holding our feet to the fire."
    },
    "meaningES": "Poner los pies al fuego / Presionar implacablemente para que cumplamos",
    "explanation": "Expresión medieval sobre el tormento del fuego para forzar a alguien a cumplir o confesar. En la industria automotriz y aeroespacial describe la presión contractual despiadada de los clientes OEM.",
    "operationalMeaning": "Exigencia diaria de reportes de avance y visitas en planta por parte de clientes cuando hay riesgo de parar su línea de ensamble.",
    "mentalImageOrigin": "Acercar los pies de alguien al fuego para exigir una respuesta o compromiso inmediato.",
    "plantExample": "Ford is holding our feet to the fire regarding the dimensional deviations on the instrument panel brackets.",
    "exampleEN": "Our CEO is holding our feet to the fire to achieve 98% OEE by the end of the quarter.",
    "exampleES": "Nuestro CEO nos está poniendo los pies al fuego para alcanzar el 98% de OEE antes de que termine el trimestre.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Presionar fuertemente a alguien para que cumpla sus compromisos.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "ALTO",
    "pronunciationHint": "/hoʊld fiːt tuː ðə ˈfaɪər/."
  },
  {
    "id": "phr-push-back",
    "phrase": "We need to push back on their deadline",
    "category": "conflict_resolution",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "We must tell them that the deadline is too short.",
      "native": "We need to push back on their deadline."
    },
    "meaningES": "Oponer resistencia justificada / Rechazar diplomáticamente una exigencia",
    "explanation": "Habilidad asertiva fundamental para líderes técnicos en plantas de Nearshoring. Decir 'sí a todo' a la matriz en EE.UU. causa desastres; 'pushing back' con datos técnicos demuestra madurez.",
    "operationalMeaning": "Rechazar una fecha de entrega o tolerancia inviable presentando estudios de capacidad y tiempos de ciclo.",
    "mentalImageOrigin": "Empujar físicamente en sentido contrario a una fuerza que te empuja.",
    "plantExample": "If Detroit asks for 500 prototype units by Tuesday, we have to push back; curing resin alone takes 72 hours.",
    "exampleEN": "Quality engineering pushed back against the supplier's request to widen the micro-crack tolerance.",
    "exampleES": "Ingeniería de calidad opuso resistencia a la solicitud del proveedor de ampliar la tolerancia de microfisuras.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Resistir o contrarrestar una propuesta con argumentos.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/pʊʃ bæk/."
  },
  {
    "id": "phr-give-and-take",
    "phrase": "Supplier negotiation requires give and take",
    "category": "conflict_resolution",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "Both sides must compromise in the negotiation.",
      "native": "Supplier negotiation requires give and take."
    },
    "meaningES": "Dar y recibir / Concesiones mutuas y reciprocidad",
    "explanation": "Describe una negociación constructiva donde no se busca aplastar al proveedor, sino lograr un equilibrio sostenible.",
    "operationalMeaning": "Conceder un tiempo de entrega más holgado a cambio de un descuento por volumen o empaque retornable.",
    "mentalImageOrigin": "Dos personas pasándose objetos mutuamente en una balanza.",
    "plantExample": "There has to be give and take; if we demand next-day delivery, we must accept paying the freight differential.",
    "exampleEN": "Engineering agreements are a matter of give and take between structural rigidity and vehicle weight.",
    "exampleES": "Los acuerdos de ingeniería son cuestión de dar y tomar entre rigidez estructural y peso del vehículo.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Concesiones mutuas para llegar a un acuerdo.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/ˈɡɪv ən teɪk/."
  },
  {
    "id": "phr-deal-breaker",
    "phrase": "A Cpk below 1.33 is a deal breaker",
    "category": "technical_debate",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "If this happens, we will cancel the agreement.",
      "native": "A Cpk below 1.33 is a deal breaker."
    },
    "meaningES": "Condición no negociable / Factor que cancela el trato por completo",
    "explanation": "Requisito estricto que, de no cumplirse, invalida cualquier oferta comercial o técnica, sin importar qué tan barata sea.",
    "operationalMeaning": "Criterio de aceptación técnica obligatorio (ej. certificación ISO 13485 o capacidad de proceso Cpk ≥ 1.67).",
    "mentalImageOrigin": "Un martillo que rompe un contrato sobre la mesa.",
    "plantExample": "Lack of cleanroom ISO Class 7 certification is an absolute deal breaker for our catheter manufacturing partners.",
    "exampleEN": "The vendor's refusal to supply raw material mill test certificates is a deal breaker.",
    "exampleES": "La negativa del proveedor a entregar certificados de prueba de molino de materia prima es motivo de cancelación del trato.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Factor que impide cerrar un acuerdo.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "CRÍTICO",
    "pronunciationHint": "/ˈdiːl ˌbreɪ.kər/."
  },
  {
    "id": "phr-walk-away-point",
    "phrase": "Know your walk-away point before negotiating",
    "category": "conflict_resolution",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "Know the limit where you will leave the negotiation.",
      "native": "Know your walk-away point before negotiating."
    },
    "meaningES": "Punto de retirada / El límite más allá del cual te levantas de la mesa",
    "explanation": "El umbral exacto (precio, plazo, penalización) donde un contrato deja de ser rentable y es mejor retirarse.",
    "operationalMeaning": "Parámetro financiero o de riesgo operativo fijado previamente por la dirección antes de sentarse con un cliente o proveedor.",
    "mentalImageOrigin": "Levantarse de la silla y caminar hacia la puerta de salida de la sala de juntas.",
    "plantExample": "Our walk-away point is a 6-week lead time; if they cannot commit to that, we will source from our Monterrey alternative.",
    "exampleEN": "Never enter an equipment procurement session without an established walk-away point.",
    "exampleES": "Nunca entres a una sesión de adquisición de equipo sin un punto de retirada establecido.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Límite infranqueable en una negociación.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "ALTO",
    "pronunciationHint": "/ˈwɔːk.ə.weɪ pɔɪnt/."
  },
  {
    "id": "phr-leverage",
    "phrase": "Dual sourcing gives us pricing leverage",
    "category": "conflict_resolution",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "Having two suppliers gives us an advantage.",
      "native": "Dual sourcing gives us pricing leverage."
    },
    "meaningES": "Apalancamiento / Poder de negociación o ventaja estratégica",
    "explanation": "El concepto de usar una palanca para multiplicar tu fuerza. En la industria, quien tiene alternativas o datos duros tiene el 'leverage'.",
    "operationalMeaning": "Posición de fuerza en contratos de suministro debido a volumen de compra, patentes exclusivas o alternativas listas.",
    "mentalImageOrigin": "Una barra apoyada en un fulcro que permite levantar una roca pesada con mínimo esfuerzo.",
    "plantExample": "By qualifying a second Mexican resin supplier, we gained massive leverage in annual price reviews with our US vendor.",
    "exampleEN": "The client has no leverage because we are the only AS9100-certified titanium anodizer in the region.",
    "exampleES": "El cliente no tiene poder de negociación porque somos el único anodizador de titanio certificado en AS9100 en la región.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Ventaja estratégica multiplicadora.",
      "ukMeaning": "En pronunciación: US /ˈlev.ɚ.ɪdʒ/ vs UK /ˈliː.vər.ɪdʒ/."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "US: /ˈlɛv.ər.ɪdʒ/ (énfasis en 'lev')."
  },
  {
    "id": "phr-down-to-the-wire",
    "phrase": "This line validation is down to the wire",
    "category": "workplace",
    "skillCategory": "plant_floor",
    "schoolVsNative": {
      "school": "We have very little time left to finish.",
      "native": "This line validation is down to the wire."
    },
    "meaningES": "Al filo del tiempo / Hasta el último segundo",
    "explanation": "Viene de las carreras de caballos de antaño, donde se colgaba un alambre (wire) sobre la línea de meta para detectar con precisión al ganador.",
    "operationalMeaning": "Arranques de línea donde las aprobaciones finales ocurren apenas minutos antes de que el primer camión deba salir.",
    "mentalImageOrigin": "Dos caballos cruzando la línea de meta rozando el alambre detector.",
    "plantExample": "PPAP submission is due at 5:00 PM and CMM data just came in at 4:30. It is truly down to the wire.",
    "exampleEN": "The tooling changeover went down to the wire before the morning shift whistle blew.",
    "exampleES": "El cambio de herramental se fue al filo del tiempo antes de que sonara el silbatazo del turno matutino.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Hasta el último segundo disponible.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/daʊn tuː ðə ˈwaɪər/."
  },
  {
    "id": "phr-by-the-book",
    "phrase": "Run the cleanroom audit strictly by the book",
    "category": "workplace",
    "skillCategory": "plant_floor",
    "schoolVsNative": {
      "school": "Follow all rules exactly without changes.",
      "native": "Run the cleanroom audit strictly by the book."
    },
    "meaningES": "Al pie de la letra / Siguiendo el manual y los procedimientos al 100%",
    "explanation": "El libro ('the book') representa los procedimientos operativos estándar (SOPs), normas ISO o manuales de calidad de planta.",
    "operationalMeaning": "Cero improvisaciones; no saltarse ningún paso de verificación ni omitir firmas de testigos.",
    "mentalImageOrigin": "Un inspector revisando cada acción con el manual impreso abierto frente a sus ojos.",
    "plantExample": "During the FDA 21 CFR Part 820 audit, answer only what is asked and execute every test strictly by the book.",
    "exampleEN": "Our aerospace welding protocols must be followed strictly by the book to avoid structural airworthiness failures.",
    "exampleES": "Nuestros protocolos de soldadura aeroespacial deben seguirse estrictamente al pie de la letra para evitar fallas estructurales de aeronavegabilidad.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Apegado estrictamente al reglamento o norma.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/baɪ ðə bʊk/."
  },
  {
    "id": "phr-red-tape",
    "phrase": "We're stuck in customs red tape",
    "category": "workplace",
    "skillCategory": "written_reports",
    "schoolVsNative": {
      "school": "There are too many bureaucratic official rules.",
      "native": "We're stuck in customs red tape."
    },
    "meaningES": "Trámites burocráticos engorrosos / Tramitología excesiva",
    "explanation": "Históricamente, los documentos oficiales legales en Inglaterra y España se ataban con cintas rojas. Hoy describe la fricción aduanal o corporativa.",
    "operationalMeaning": "Retrasos causados por validaciones de pedimentos de importación IMMEX, permisos de origen T-MEC o firmas corporativas redundantes.",
    "mentalImageOrigin": "Pilas de legajos y expedientes oficiales amarrados con cinta roja que impiden el paso.",
    "plantExample": "Our tooling spares are physically in Nuevo Laredo, but IMMEX tariff red tape has stalled delivery for three days.",
    "exampleEN": "We need to cut through the internal red tape to get immediate approval for the replacement servo drive.",
    "exampleES": "Necesitamos cortar la burocracia interna para obtener aprobación inmediata para el servodrive de reemplazo.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Burocracia que ralentiza procesos.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "MEDIO",
    "pronunciationHint": "/ˈrɛd teɪp/."
  },
  {
    "id": "phr-sweeten-the-deal",
    "phrase": "We can sweeten the deal with free spare parts",
    "category": "conflict_resolution",
    "skillCategory": "negotiation_leadership",
    "schoolVsNative": {
      "school": "We can give more things to make them buy.",
      "native": "We can sweeten the deal with free spare parts."
    },
    "meaningES": "Endulzar la oferta / Agregar un incentivo atractivo para cerrar el trato",
    "explanation": "Ofrecer un extra de bajo costo para ti pero de alto valor percibido para el cliente para destrabar una negociación.",
    "operationalMeaning": "Incluir consumibles de recambio, capacitación de operadores o extensión de garantía de maquinaria para firmar la orden de compra.",
    "mentalImageOrigin": "Añadir azúcar o miel a una comida para hacerla irresistible.",
    "plantExample": "To close the 3-year contract, let's sweeten the deal by including free on-site tooling calibration for the first 6 months.",
    "exampleEN": "The robotic arm vendor sweetened the deal by bundling two extra programming software licenses.",
    "exampleES": "El proveedor del brazo robótico endulzó la oferta incluyendo dos licencias adicionales de software de programación.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Mejorar las condiciones para acelerar el acuerdo.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/ˈswiː.tən ðə diːl/."
  },
  {
    "id": "phr-sanity-check",
    "phrase": "Let's do a quick sanity check on these numbers",
    "category": "problem_solving",
    "skillCategory": "presentation_pitch",
    "schoolVsNative": {
      "school": "Check quickly if the calculation makes sense.",
      "native": "Let's do a quick sanity check on these numbers."
    },
    "meaningES": "Prueba de cordura / Verificación rápida de sentido común",
    "explanation": "No es una auditoría exhaustiva, sino una verificación de 30 segundos para ver si el resultado tiene coherencia física o si hay un error de órdenes de magnitud.",
    "operationalMeaning": "Confirmar que un consumo de amperaje, tiempo de ciclo o esfuerzo cortante cae dentro del rango físico plausible antes de enviarlo a la dirección.",
    "mentalImageOrigin": "Un médico haciendo una pregunta básica para comprobar que el paciente está consciente y lúcido.",
    "plantExample": "The algorithm shows a 99.9% energy saving. Run a sanity check; that violates the second law of thermodynamics.",
    "exampleEN": "Before we present the cycle time reduction to the VP, do a sanity check on the robot acceleration limits.",
    "exampleES": "Antes de presentar la reducción de tiempo de ciclo al vicepresidente, haz una prueba de cordura en los límites de aceleración del robot.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Revisión rápida de verosimilitud.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/ˈsæn.ə.ti ˌtʃɛk/."
  },
  {
    "id": "phr-back-to-drawing-board",
    "phrase": "It's back to the drawing board for this bracket",
    "category": "problem_solving",
    "skillCategory": "presentation_pitch",
    "schoolVsNative": {
      "school": "The design failed, we must start again from zero.",
      "native": "It's back to the drawing board for this bracket."
    },
    "meaningES": "Volver a la mesa de dibujo / Empezar de nuevo desde cero tras fallar",
    "explanation": "Reconocer con madurez técnica que un concepto de diseño no funcionó en las pruebas físicas y requiere un replanteamiento estructural.",
    "operationalMeaning": "Rediseñar un componente en CAD tras fallar las pruebas destructivas de fatiga o cámara salina.",
    "mentalImageOrigin": "El tablero de dibujo donde los ingenieros borran el papel milimétrico para trazar nuevas líneas.",
    "plantExample": "The composite wing spar cracked at 120% load instead of 150%. It is back to the drawing board on the fiber layup orientation.",
    "exampleEN": "Our thermal simulation diverged completely; we need to go back to the drawing board on the heatsink geometry.",
    "exampleES": "Nuestra simulación térmica divergió por completo; debemos volver a la mesa de dibujo en la geometría del disipador.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Reiniciar el proceso de diseño tras un fracaso experimental.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "ALTO",
    "pronunciationHint": "/bæk tuː ðə ˈdrɔː.ɪŋ ˌbɔːrd/."
  },
  {
    "id": "phr-low-hanging-fruit",
    "phrase": "Let's capture the low-hanging fruit first",
    "category": "metrics",
    "skillCategory": "presentation_pitch",
    "schoolVsNative": {
      "school": "Solve the easy problems first.",
      "native": "Let's capture the low-hanging fruit first."
    },
    "meaningES": "Fruta al alcance de la mano / Victorias rápidas fáciles de cosechar",
    "explanation": "Metáfora del manzano: antes de traer la escalera para las ramas altas, recolecta las manzanas que están a la altura de tu mano. En Kaizen representa optimizaciones inmediatas sin inversión.",
    "operationalMeaning": "Acciones de mejora continua que reducen scrap o tiempo de ciclo de inmediato sin requerir nuevo herramental o CAPEX.",
    "mentalImageOrigin": "Recolectar fruta de las ramas bajas de un árbol sin necesidad de escalera.",
    "plantExample": "Standardizing operator hand movements at the packaging station is low-hanging fruit for saving 8 seconds per pack.",
    "exampleEN": "Fixing compressed air leaks is low-hanging fruit for reducing plant electrical consumption.",
    "exampleES": "Reparar fugas de aire comprimido es fruta al alcance de la mano para reducir el consumo eléctrico de la planta.",
    "dialectDifference": {
      "hasTrap": false,
      "usMeaning": "Oportunidades de mejora fáciles y de impacto inmediato.",
      "ukMeaning": "Mismo significado."
    },
    "riskLevel": "BAJO",
    "pronunciationHint": "/ˌloʊ.hæŋ.ɪŋ ˈfruːt/."
  }
];

// Add unique new idioms
let addedCount = 0;
const existingIds = new Set(existingList.map(p => p.id));
newIdioms.forEach(ni => {
  if (!existingIds.has(ni.id)) {
    existingList.push(ni);
    existingIds.add(ni.id);
    addedCount++;
  }
});

console.log(`Added ${addedCount} new prioritized industrial idioms. Total idioms: ${existingList.length}.`);

// Format output
const header = `// stemOS Professional & Native Technical Phrases Library
// Authentic industry collocations, idioms, and engineering communication patterns.
// Designed for technical professionals in high-tech manufacturing, software, aerospace, and nearshoring.
// Enhanced with Native Idioms 2.0 (5-Layer Schema: Operational Meaning, Mental Origin, Dialect Traps & Risk Levels).

var STEMOS_PHRASES = `;

const updatedCode = header + JSON.stringify(existingList, null, 2) + ';\n';
fs.writeFileSync(phrasesFilePath, updatedCode, 'utf8');
console.log('Successfully wrote upgraded phrases_library.js!');
