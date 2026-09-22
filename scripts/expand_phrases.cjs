const fs = require('fs');
const path = require('path');

const phrasesPath = path.join(__dirname, '..', 'content/phrases_library.js');
let phrases = require(phrasesPath);

const newPhrases = [
  {
    id: "phr-sanity-check",
    phrase: "Let's do a quick sanity check on the finite element stress numbers",
    schoolVsNative: {
      school: "Let's check if the numbers are not crazy.",
      native: "Let's do a quick sanity check on the finite element stress numbers."
    },
    meaningES: "Hagamos una verificación de coherencia preliminar (sanity check) a los números de esfuerzo por elemento finito",
    explanation: "Revisión rápida de orden de magnitud para comprobar que una simulación o cálculo complejo no viola principios físicos básicos antes de presentarlo formalmente.",
    category: "technical_debate",
    exampleEN: "Before presenting the structural model to the aerospace customer, let's do a sanity check on the wing spar bending moment.",
    exampleES: "Antes de presentar el modelo estructural al cliente aeroespacial, hagamos una verificación de coherencia del momento flexionante del larguero.",
    pronunciationHint: "Preciso: /ˈsænɪti tʃɛk/."
  },
  {
    id: "phr-move-the-needle",
    phrase: "Optimizing the cooling loop will actually move the needle on overall line OEE",
    schoolVsNative: {
      school: "This change will make a big difference in production.",
      native: "Optimizing the cooling loop will move the needle on overall line OEE."
    },
    meaningES: "Optimizar el circuito de enfriamiento realmente marcará una diferencia medible en el OEE general de la línea",
    explanation: "Expresión ejecutiva para señalar que una iniciativa técnica tiene un impacto estadísticamente significativo y cuantificable en los KPIs clave.",
    category: "metrics",
    exampleEN: "Minor software tweaks won't suffice; we need automated optical inspection to truly move the needle on scrap reduction.",
    exampleES: "Ajustes menores de software no bastarán; necesitamos inspección óptica automatizada para realmente mover la aguja en la reducción de merma.",
    pronunciationHint: "Fluido: /muːv ðə ˈniːdəl/."
  },
  {
    id: "phr-single-pane-of-glass",
    phrase: "Our central dashboard provides a single pane of glass for all factory telemetry",
    schoolVsNative: {
      school: "All our factory data is on one computer screen.",
      native: "Our dashboard provides a single pane of glass for all factory telemetry."
    },
    meaningES: "Nuestro tablero central ofrece un panel unificado de control (single pane of glass) para toda la telemetría de la planta",
    explanation: "Concepto de arquitectura que consolida múltiples fuentes de datos dispersas (SCADA, ERP, IoT) en una interfaz coherente e integral.",
    category: "workplace",
    exampleEN: "By integrating Grafana with our MQTT broker, plant supervisors now monitor 40 CNC machines from a single pane of glass.",
    exampleES: "Al integrar Grafana con nuestro intermediario MQTT, los supervisores de planta ahora monitorean 40 máquinas CNC desde un panel unificado.",
    pronunciationHint: "Ligado: /ˈsɪŋɡəl peɪn əv ɡlæs/."
  },
  {
    id: "phr-table-stakes",
    phrase: "Dual-redundant power supplies are table stakes for automotive server racks",
    schoolVsNative: {
      school: "Dual power is a normal and basic requirement.",
      native: "Dual-redundant power supplies are table stakes for automotive server racks."
    },
    meaningES: "Las fuentes de poder redundantes son un requisito mínimo indispensable (table stakes) para gabinetes de servidores automotrices",
    explanation: "Requisito básico e innegociable de entrada; la característica mínima para ser tomado en cuenta en una licitación técnica o de ingeniería.",
    category: "technical_debate",
    exampleEN: "In the electric vehicle ecosystem, 800V fast-charging capability is becoming table stakes for all premium sedans.",
    exampleES: "En el ecosistema de vehículos eléctricos, la capacidad de carga rápida a 800V se está convirtiendo en el estándar mínimo para todo sedán premium.",
    pronunciationHint: "Enfático: /ˈteɪbəl steɪks/."
  },
  {
    id: "phr-dogfooding",
    phrase: "We are dogfooding our internal firmware update tool on our own manufacturing test fixtures",
    schoolVsNative: {
      school: "We use our own software first to test it.",
      native: "We are dogfooding our internal firmware tool on our own test fixtures."
    },
    meaningES: "Estamos probando internamente nuestro propio software (dogfooding) en nuestros propios bancos de prueba de manufactura",
    explanation: "Práctica de ingeniería donde los desarrolladores utilizan intensivamente sus propios productos en escenarios reales de producción antes de lanzarlos a clientes.",
    category: "workplace",
    exampleEN: "Before shipping the SDK to third-party medical device developers, our embedded team dogfooded it for two months.",
    exampleES: "Antes de enviar el SDK a desarrolladores externos de dispositivos médicos, nuestro equipo de embebidos lo probó internamente durante dos meses.",
    pronunciationHint: "Coloquial profesional: /ˈdɔːɡˌfuːdɪŋ/."
  },
  {
    id: "phr-par-for-the-course",
    phrase: "Minor thermal drift during initial calibration is par for the course with ceramic heaters",
    schoolVsNative: {
      school: "This error is normal and expected.",
      native: "Minor thermal drift during calibration is par for the course with ceramic heaters."
    },
    meaningES: "Una ligera deriva térmica durante la calibración inicial es algo completamente normal y esperado en calefactores cerámicos",
    explanation: "Expresión que transmite calma al asegurar que una complicación aparente forma parte del comportamiento natural y anticipado del proceso.",
    category: "soft_skills",
    exampleEN: "Don't panic about the first-pass yield drop during retooling; a slight dip is par for the course until temperatures stabilize.",
    exampleES: "No te alarmes por la caída de rendimiento durante el reajuste; una baja temporal es normal hasta que las temperaturas se estabilizan.",
    pronunciationHint: "Natural: /pɑːr fɔːr ðə kɔːrs/."
  },
  {
    id: "phr-elephant-in-the-room",
    phrase: "Let's address the elephant in the room: our PCB yield dropped by 12% last week",
    schoolVsNative: {
      school: "Let's talk about the big bad problem everyone is ignoring.",
      native: "Let's address the elephant in the room: our PCB yield dropped by 12%."
    },
    meaningES: "Abordemos el problema evidente que todos están ignorando: nuestro rendimiento de PCB cayó 12% la semana pasada",
    explanation: "Intervención asertiva para sacar a la luz un problema grave que el equipo evita mencionar por incomodidad política o temor.",
    category: "conflict_resolution",
    exampleEN: "Rather than pretending our timeline is intact, let's address the elephant in the room: the FPGA supplier is 6 weeks behind.",
    exampleES: "En vez de fingir que nuestro cronograma está intacto, abordemos la realidad que todos evitan: el proveedor de FPGAs tiene 6 semanas de retraso.",
    pronunciationHint: "Ritmo continuo: /ˈɛləfənt ɪn ðə ruːm/."
  },
  {
    id: "phr-rubber-meets-the-road",
    phrase: "The prototype simulated well, but where the rubber meets the road is the 1000-hour environmental chamber test",
    schoolVsNative: {
      school: "Now we will see the real test in the laboratory.",
      native: "Where the rubber meets the road is the 1000-hour chamber test."
    },
    meaningES: "El prototipo simuló bien, pero la prueba de fuego definitiva (donde la goma toca el asfalto) es el ensayo de 1000 horas en cámara climática",
    explanation: "Momento decisivo en el que una teoría, simulación computacional o diseño conceptual debe demostrar su validez en condiciones operativas reales y severas.",
    category: "workplace",
    exampleEN: "CAD drawings look clean on a monitor, but where the rubber meets the road is on the shop floor during pilot assembly.",
    exampleES: "Los planos en CAD lucen impecables en la pantalla, pero la verdadera prueba de fuego es en la planta durante el ensamble piloto.",
    pronunciationHint: "Expresivo: /ˈrʌbər miːts ðə roʊd/."
  },
  {
    id: "phr-north-star-metric",
    phrase: "First Pass Yield is our north star metric for the automated surface-mount line",
    schoolVsNative: {
      school: "The most important number for our factory is yield.",
      native: "First Pass Yield is our north star metric for the SMT line."
    },
    meaningES: "El rendimiento a la primera pasada (FPY) es nuestra métrica guía fundamental (north star) para la línea de montaje superficial",
    explanation: "Indicador clave supremo que alinea los esfuerzos de ingeniería y producción hacia el objetivo de mayor valor para la empresa.",
    category: "metrics",
    exampleEN: "While cycle time matters, our north star metric during ramp-up remains zero defect escapes to customer docks.",
    exampleES: "Aunque el tiempo de ciclo importa, nuestra métrica guía durante el arranque sigue siendo cero escapes de defectos hacia el cliente.",
    pronunciationHint: "Claro: /nɔːrθ stɑːr ˈmɛtrɪk/."
  },
  {
    id: "phr-gut-check",
    phrase: "Can we do a quick gut check on whether this delivery date is realistic?",
    schoolVsNative: {
      school: "Do you honestly think we can finish on time?",
      native: "Can we do a quick gut check on whether this delivery date is realistic?"
    },
    meaningES: "¿Podemos hacer una valoración intuitiva y honesta sobre si esta fecha de entrega es realista?",
    explanation: "Petición informal en reuniones para recabar la opinión honesta e instintiva de los ingenieros sobre la viabilidad de un plan sin rodeos formales.",
    category: "meetings",
    exampleEN: "Before committing to the OEM customer, let's do a quick gut check with the tooling technicians in Monterrey.",
    exampleES: "Antes de comprometernos con el cliente OEM, hagamos una valoración honesta y directa con los matriceros en Monterrey.",
    pronunciationHint: "Breve: /ɡʌt tʃɛk/."
  },
  {
    id: "phr-across-the-board",
    phrase: "The laser welding upgrade reduced cycle times by 15% across the board",
    schoolVsNative: {
      school: "All stations got 15% faster.",
      native: "The welding upgrade reduced cycle times by 15% across the board."
    },
    meaningES: "La modernización de soldadura láser redujo los tiempos de ciclo en un 15% en todas las áreas de manera uniforme",
    explanation: "Indica que un impacto positivo, ajuste o política se aplica a cada estación, módulo o categoría sin excepciones.",
    category: "metrics",
    exampleEN: "Implementing lean 5S housekeeping resulted in a 20% reduction in setup times across the board.",
    exampleES: "Implementar las 5S de manufactura esbelta produjo una reducción del 20% en tiempos de cambio de herramental de forma generalizada.",
    pronunciationHint: "Fluido: /əˈkrɔːs ðə bɔːrd/."
  },
  {
    id: "phr-pain-point",
    phrase: "Manual wire crimping remains the single biggest pain point on the wiring harness line",
    schoolVsNative: {
      school: "The worst problem on the line is manual crimping.",
      native: "Manual crimping remains the single biggest pain point on the line."
    },
    meaningES: "El ponchado manual de cables sigue siendo el principal punto crítico de dolor en la línea de arneses eléctricos",
    explanation: "Identificación precisa de la fuente recurrente de demoras, retrabajos o frustración ergonómica en un proceso de producción.",
    category: "problem_solving",
    exampleEN: "Our software upgrade eliminates the latency pain point reported by operators on the SCADA terminals.",
    exampleES: "Nuestra actualización de software elimina el problema crítico de latencia reportado por los operadores en las terminales SCADA.",
    pronunciationHint: "Énfasis: /ˈpeɪn pɔɪnt/."
  },
  {
    id: "phr-pushback",
    phrase: "We received significant pushback from the supplier regarding the tighter cleanliness specs",
    schoolVsNative: {
      school: "The supplier did not agree and argued against us.",
      native: "We received significant pushback regarding the tighter cleanliness specs."
    },
    meaningES: "Recibimos una fuerte resistencia y objeciones por parte del proveedor respecto a las especificaciones de limpieza más estrictas",
    explanation: "Término corporativo diplomático para describir la resistencia organizada o renuencia a aceptar un nuevo estándar o cambio contractual.",
    category: "conflict_resolution",
    exampleEN: "Expect some pushback from the machine shop when enforcing the new digital work order protocol.",
    exampleES: "Es de esperar cierta resistencia del taller de maquinado al implementar el nuevo protocolo digital de órdenes de trabajo.",
    pronunciationHint: "Enfático: /ˈpʊʃˌbæk/."
  },
  {
    id: "phr-drill-down",
    phrase: "Let's drill down into the CAN bus error logs to pinpoint the intermittent timeout",
    schoolVsNative: {
      school: "Let's examine the detailed log files.",
      native: "Let's drill down into the CAN bus error logs to pinpoint the timeout."
    },
    meaningES: "Profundicemos en el desglose de los registros de error del bus CAN para localizar con precisión el tiempo de espera intermitente",
    explanation: "Analizar datos en niveles progresivos de mayor detalle técnico para llegar a la causa raíz de una anomalía.",
    category: "problem_solving",
    exampleEN: "The high-level scrap rate looks bad; let's drill down by machine serial number and shift to isolate the defect.",
    exampleES: "La tasa global de merma se ve mal; profundicemos desglosando por número de serie de máquina y turno para aislar el defecto.",
    pronunciationHint: "Activo: /drɪl daʊn/."
  },
  {
    id: "phr-low-hanging-fruit",
    phrase: "Recalibrating the torque drivers is low-hanging fruit that will immediately prevent stripped threads",
    schoolVsNative: {
      school: "This is an easy fix we should do first.",
      native: "Recalibrating torque drivers is low-hanging fruit that prevents stripped threads."
    },
    meaningES: "Recalibrar los atornilladores de torque es una oportunidad inmediata y de fácil alcance (low-hanging fruit) que evitará roscas barridas al instante",
    explanation: "Mejora obvia y rápida que requiere mínimo esfuerzo o inversión para conseguir un resultado positivo tangible de inmediato.",
    category: "problem_solving",
    exampleEN: "Before investing in a $200k vision system, let's harvest the low-hanging fruit by adding simple physical poka-yoke guide pins.",
    exampleES: "Antes de invertir 200 mil dólares en visión artificial, aprovechemos las soluciones inmediatas agregando pernos guía poka-yoke mecánicos.",
    pronunciationHint: "Metáfora: /loʊ ˈhæŋɪŋ fruːt/."
  },
  {
    id: "phr-keep-me-in-the-loop",
    phrase: "Please keep me in the loop on the ultrasonic test results from the evening shift",
    schoolVsNative: {
      school: "Tell me what happens with the results.",
      native: "Please keep me in the loop on the ultrasonic test results."
    },
    meaningES: "Por favor mantenme al tanto y copia en la comunicación sobre los resultados de pruebas ultrasónicas del turno vespertino",
    explanation: "Solicitud profesional para asegurar que no se omitan correos o actualizaciones críticas sobre un proceso en curso.",
    category: "workplace",
    exampleEN: "As you negotiate the aluminum ingot pricing with the smelter, keep me in the loop on any volume discounts.",
    exampleES: "Conforme negocies el precio de lingotes de aluminio con la fundidora, mantenme al tanto de cualquier descuento por volumen.",
    pronunciationHint: "Suave: /kiːp miː ɪn ðə luːp/."
  },
  {
    id: "phr-take-it-offline",
    phrase: "Since this requires detailed schematic analysis, let's take it offline between Carlos and the EE team",
    schoolVsNative: {
      school: "Stop talking about this in the big meeting.",
      native: "Since this requires schematic analysis, let's take it offline."
    },
    meaningES: "Dado que esto requiere un análisis esquemático detallado, tratémoslo en una sesión separada fuera de esta junta entre Carlos y el equipo de electrónica",
    explanation: "Fórmula cortés y eficaz para evitar que un debate técnico hiperespecífico monopolice el tiempo de una reunión plenaria.",
    category: "meetings",
    exampleEN: "We have 15 minutes left on the agenda; let's take the thermal dissipation trade-off offline and report back tomorrow.",
    exampleES: "Nos quedan 15 minutos en la agenda; tratemos el compromiso de disipación térmica por separado y presentemos conclusiones mañana.",
    pronunciationHint: "Práctico: /teɪk ɪt ˌɔːfˈlaɪn/."
  },
  {
    id: "phr-back-to-the-drawing-board",
    phrase: "The thermal prototype failed under sustained load; it's back to the drawing board for the heat sink geometry",
    schoolVsNative: {
      school: "We must start the design from zero again.",
      native: "The prototype failed; it's back to the drawing board for the heat sink."
    },
    meaningES: "El prototipo térmico falló bajo carga sostenida; debemos volver a la mesa de diseño desde el principio para la geometría del disipador",
    explanation: "Reconocimiento pragmático de que un enfoque falló y requiere un rediseño conceptual completo sin lamentaciones.",
    category: "technical_debate",
    exampleEN: "If the resin fails the UL 94 V-0 flammability test, it's back to the drawing board for our polymer formulation.",
    exampleES: "Si la resina reprueba el ensayo de inflamabilidad UL 94 V-0, tendremos que volver a la mesa de diseño con nuestra formulación polimérica.",
    pronunciationHint: "Resuelto: /bæk tə ðə ˈdrɔːɪŋ bɔːrd/."
  },
  {
    id: "phr-skin-in-the-game",
    phrase: "When design engineers work directly on the assembly floor, they have real skin in the game",
    schoolVsNative: {
      school: "They are personally invested in the success of the factory.",
      native: "When design engineers support the line, they have skin in the game."
    },
    meaningES: "Cuando los ingenieros de diseño apoyan directamente en la línea de ensamble, tienen un compromiso directo y riesgo compartido (skin in the game)",
    explanation: "Tener un interés o consecuencia personal directa en el resultado final, lo que garantiza máxima dedicación y responsabilidad.",
    category: "soft_skills",
    exampleEN: "By tying management bonuses directly to customer defect PPM rates, leadership now has real skin in the game.",
    exampleES: "Al vincular los bonos de la gerencia directamente con las PPM de defectos al cliente, la directiva ahora tiene un compromiso directo con el resultado.",
    pronunciationHint: "Expresivo: /skɪn ɪn ðə ɡeɪm/."
  },
  {
    id: "phr-weather-the-storm",
    phrase: "Our lean inventory and cross-trained technicians allowed us to weather the semiconductor shortage",
    schoolVsNative: {
      school: "We survived the difficult crisis successfully.",
      native: "Our cross-trained team allowed us to weather the storm of the chip shortage."
    },
    meaningES: "Nuestro inventario esbelto y técnicos con capacitación cruzada nos permitieron sortear la tormenta ante la escasez de semiconductores",
    explanation: "Superar con resiliencia y éxito un periodo prolongado de adversidad técnica o crisis de suministros en la industria.",
    category: "soft_skills",
    exampleEN: "Thanks to proactive dual-sourcing agreements, our aerospace plant weathered the supply chain storm without halting delivery lines.",
    exampleES: "Gracias a acuerdos proactivos de doble proveeduría, nuestra planta aeroespacial sorteó la tormenta de suministros sin frenar entregas.",
    pronunciationHint: "Metáfora: /ˈwɛðər ðə stɔːrm/."
  }
];

// Add only unique phrases
const existingIds = new Set(phrases.map(p => p.id));
let added = 0;
newPhrases.forEach(p => {
  if (!existingIds.has(p.id)) {
    phrases.push(p);
    existingIds.add(p.id);
    added++;
  }
});

const output = `// stemOS Professional & Native Technical Phrases Library
// Authentic industry collocations, idioms, and engineering communication patterns.
// Designed for technical professionals in high-tech manufacturing, software, aerospace, and nearshoring.

var STEMOS_PHRASES = ${JSON.stringify(phrases, null, 2)};

// Attach to window and export for Node modules
if (typeof window !== 'undefined') {
  window.STEMOS_PHRASES = STEMOS_PHRASES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = STEMOS_PHRASES;
}
`;

fs.writeFileSync(phrasesPath, output, 'utf8');
console.log(`[SUCCESS] Added ${added} new phrases. Total phrases in library: ${phrases.length}`);
