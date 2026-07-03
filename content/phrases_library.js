/**
 * stemOS LXP — Real-World Native Phrases Library
 * ===============================================
 * Frases y expresiones que NO enseñan en la escuela tradicional.
 * Contraste directo: "Escuela Tradicional vs. Inglés Nativo Profesional"
 * 
 * Estructura de cada entrada:
 *  - id: Identificador único
 *  - phrase: Expresión nativa
 *  - schoolVsNative: Qué se enseña en la escuela vs Cómo lo dice un nativo
 *  - meaningES: Significado en español
 *  - explanation: Explicación de matiz, tono y contexto de uso
 *  - category: Categoría temática
 *  - exampleEN: Ejemplo práctico en Nearshoring/Ingeniería
 *  - exampleES: Traducción del ejemplo al español
 *  - pronunciationHint: Consejo de pronunciación / ritmo nativo
 */

var STEMOS_PHRASES = [
  // =========================================================================
  // CATEGORÍA 1: WORKPLACE & PROYECTOS (Trabajo y Proyectos)
  // =========================================================================
  {
    id: "phr-swamped",
    phrase: "I'm swamped at the moment",
    schoolVsNative: {
      school: "I am very busy right now.",
      native: "I'm swamped at the moment."
    },
    meaningES: "Estoy inundado de trabajo / Hasta el cuello de pendientes",
    explanation: "En la escuela enseñan 'very busy', pero en la industria nativa se usa 'swamped' (como estar sumergido bajo el agua). Suena extremadamente profesional e informal-elegante.",
    category: "workplace",
    exampleEN: "I'd love to review the wafer CAD files, but I'm swamped at the moment preparing for the TSMC audit.",
    exampleES: "Me encantaría revisar los archivos CAD de las obleas, pero estoy saturado de trabajo en este momento preparando la auditoría de TSMC.",
    pronunciationHint: "Pronuncia 'swamped' con 'p-t' final suave: /swɑːmpt/."
  },
  {
    id: "phr-pipeline",
    phrase: "It's currently in the pipeline",
    schoolVsNative: {
      school: "We are working on it now.",
      native: "It's currently in the pipeline."
    },
    meaningES: "Está en proceso / En camino a ser entregado",
    explanation: "Se usa para confirmar que una tarea, documento o parche de software ya pasó por la etapa inicial y está avanzando por la tubería de producción.",
    category: "workplace",
    exampleEN: "Don't worry about the safety compliance certificate; it's currently in the pipeline.",
    exampleES: "No te preocupes por el certificado de cumplimiento de seguridad; ya está en proceso.",
    pronunciationHint: "Conecta 'in the' rápido: /ɪn ðə ˈpaɪplaɪn/."
  },
  {
    id: "phr-back-burner",
    phrase: "Let's put this on the back burner",
    schoolVsNative: {
      school: "We will do this later.",
      native: "Let's put this on the back burner."
    },
    meaningES: "Pongamos esto en segundo plano / Poner a fuego lento",
    explanation: "Metáfora de la cocina (los quemadores de atrás). Significa posponer una tarea sin cancelarla para concentrar la energía en lo prioritario.",
    category: "workplace",
    exampleEN: "Let's put the UI redesign on the back burner and focus on fixing the telemetry latency bug first.",
    exampleES: "Pongamos el rediseño de la interfaz en segundo plano y concentrémonos primero en corregir la falla de latencia de telemetría.",
    pronunciationHint: "Énfasis en 'back': /ˈbæk ˌbɜːrnər/."
  },
  {
    id: "phr-ducks-in-row",
    phrase: "Get our ducks in a row",
    schoolVsNative: {
      school: "Organize everything well before starting.",
      native: "Get our ducks in a row."
    },
    meaningES: "Tener todo perfectamente organizado y alineado",
    explanation: "Se usa antes de auditorías, demostraciones a clientes o arranques de línea. Significa no dejar ningún detalle suelto.",
    category: "workplace",
    exampleEN: "Before we invite the plant manager, let's make sure we have all our engineering ducks in a row.",
    exampleES: "Antes de invitar al gerente de planta, asegurémonos de tener todos nuestros detalles técnicos perfectamente organizados.",
    pronunciationHint: "Pronuncia 'ducks-in-a' de corrido: /dʌks ɪn ə roʊ/."
  },
  {
    id: "phr-touch-base",
    phrase: "Let's touch base tomorrow",
    schoolVsNative: {
      school: "I will call you or talk to you tomorrow.",
      native: "Let's touch base tomorrow."
    },
    meaningES: "Hagamos una breve sincronización / Contactémonos mañana",
    explanation: "Una de las frases ejecutivas nativas más comunes. No implica una junta larga, sino una actualización breve de 2 minutos.",
    category: "workplace",
    exampleEN: "I'll review the sensor logs tonight, and let's touch base tomorrow morning at 8:00 AM.",
    exampleES: "Revisaré los registros de los sensores esta noche y hagamos una breve sincronización mañana a las 8:00 AM.",
    pronunciationHint: "Suena como 'touch-base': /tʌtʃ beɪs/."
  },
  {
    id: "phr-streamline",
    phrase: "We need to streamline this workflow",
    schoolVsNative: {
      school: "We must make this process faster.",
      native: "We need to streamline this workflow."
    },
    meaningES: "Optimizar / Eliminar pasos innecesarios",
    explanation: "Viene de la aerodinámica (hacer algo aerodinámico). En ingeniería significa eliminar burocracia o desperdicios de tiempo.",
    category: "workplace",
    exampleEN: "By using automated scripts, we can streamline our firmware testing workflow by 40%.",
    exampleES: "Usando scripts automatizados, podemos optimizar nuestro flujo de pruebas de firmware en un 40%.",
    pronunciationHint: "Énfasis en 'stream': /ˈstriːmlaɪn/."
  },

  // =========================================================================
  // CATEGORÍA 2: DEBATE TÉCNICO Y OPINIONES (Technical Discussion)
  // =========================================================================
  {
    id: "phr-jump-conclusions",
    phrase: "I wouldn't jump to conclusions just yet",
    schoolVsNative: {
      school: "Do not decide quickly without thinking.",
      native: "I wouldn't jump to conclusions just yet."
    },
    meaningES: "No me precipitaría a sacar conclusiones todavía",
    explanation: "La usas para pedir prudencia técnica cuando un componente falla y alguien quiere culpar a la pieza equivocada sin suficientes pruebas.",
    category: "technical_debate",
    exampleEN: "The voltage dropped once, but I wouldn't jump to conclusions just yet until we test under full thermal load.",
    exampleES: "El voltaje cayó una vez, pero no me precipitaría a sacar conclusiones todavía hasta probar bajo carga térmica completa.",
    pronunciationHint: "Enlace fluido: /wʊdnt dʒʌmp tə kənˈkluːʒənz/."
  },
  {
    id: "phr-standpoint",
    phrase: "From a technical standpoint...",
    schoolVsNative: {
      school: "Speaking technically...",
      native: "From a technical standpoint..."
    },
    meaningES: "Desde un punto de vista técnico...",
    explanation: "La muletilla profesional perfecta para separar argumentos de negocios o costos de las realidades físicas/técnicas.",
    category: "technical_debate",
    exampleEN: "From a technical standpoint, copper harness wiring will degrade faster than silver-plated contacts under high humidity.",
    exampleES: "Desde un punto de vista técnico, el cableado de arnés de cobre se degradará más rápido que los contactos plateados bajo alta humedad.",
    pronunciationHint: "Énfasis en 'standpoint': /ˈstændpɔɪnt/."
  },
  {
    id: "phr-reservations",
    phrase: "I have my reservations about this architecture",
    schoolVsNative: {
      school: "I think this plan is not good.",
      native: "I have my reservations about this architecture."
    },
    meaningES: "Tengo mis reservas / dudas justificadas sobre esto",
    explanation: "Expresa dudas profesionales de forma elegante y respetuosa sin sonar destructivo o agresivo.",
    category: "technical_debate",
    exampleEN: "I have my reservations about using single-board controllers for industrial safety systems.",
    exampleES: "Tengo mis reservas sobre el uso de controladores de tarjeta única para sistemas de seguridad industrial.",
    pronunciationHint: "Suena como 'rez-er-VAY-shunz': /ˌrezərˈveɪʃənz/."
  },
  {
    id: "phr-middle-ground",
    phrase: "Can we find a middle ground?",
    schoolVsNative: {
      school: "Can we make a compromise?",
      native: "Can we find a middle ground?"
    },
    meaningES: "¿Podemos encontrar un punto medio?",
    explanation: "Ideal durante negociaciones entre costo vs. rendimiento o entre requerimientos de diseño de dos departamentos.",
    category: "technical_debate",
    exampleEN: "Quality wants 100% manual inspection, while production wants 0%. Can we find a middle ground with sampling?",
    exampleES: "Calidad quiere 100% inspección manual, mientras producción quiere 0%. ¿Podemos encontrar un punto medio con muestreo?",
    pronunciationHint: "Ritmo continuo: /faɪnd ə ˈmɪdl graʊnd/."
  },
  {
    id: "phr-aligns-with",
    phrase: "That aligns perfectly with our data",
    schoolVsNative: {
      school: "That is equal to our results.",
      native: "That aligns perfectly with our data."
    },
    meaningES: "Eso coincide / se alinea perfectamente con nuestros datos",
    explanation: "Palabra clave de trazabilidad. Muestra que la hipótesis de un colega concuerda con las mediciones reales.",
    category: "technical_debate",
    exampleEN: "Your cleanroom humidity graph aligns perfectly with our yield drop timestamp.",
    exampleES: "Tu gráfica de humedad en el cuarto limpio coincide perfectamente con la marca de tiempo de caída de rendimiento.",
    pronunciationHint: "Pronuncia 'aligns' como 'a-LAINZ': /əˈlaɪnz/."
  },

  // =========================================================================
  // CATEGORÍA 3: RESOLUCIÓN DE CONFLICTOS & ERRORES (Incident Management)
  // =========================================================================
  {
    id: "phr-oversight",
    phrase: "My apologies, that was an oversight on my part",
    schoolVsNative: {
      school: "Sorry, I made a mistake.",
      native: "My apologies, that was an oversight on my part."
    },
    meaningES: "Mis disculpas, fue una omisión / descuido de mi parte",
    explanation: "Diferencia a un estudiante novato de un ingeniero sénior. La palabra 'oversight' reconoce un descuido técnico de manera madura.",
    category: "conflict_resolution",
    exampleEN: "My apologies, leaving out the surge protection specification was an oversight on my part.",
    exampleES: "Mis disculpas, dejar fuera la especificación de protección contra sobretensiones fue una omisión de mi parte.",
    pronunciationHint: "Suena como 'OH-ver-sight': /ˈoʊvərsaɪt/."
  },
  {
    id: "phr-step-back",
    phrase: "Let's step back and look at the big picture",
    schoolVsNative: {
      school: "Stop arguing and look at the main goal.",
      native: "Let's step back and look at the big picture."
    },
    meaningES: "Demos un paso atrás y veamos el panorama general",
    explanation: "La frase de liderazgo perfecta para calmar discusiones sobre detalles menores y reenfocar al equipo en la meta principal.",
    category: "conflict_resolution",
    exampleEN: "We're arguing over button colors. Let's step back and look at the big picture: operator safety.",
    exampleES: "Estamos discutiendo por colores de botones. Demos un paso atrás y veamos el panorama general: la seguridad del operador.",
    pronunciationHint: "Fluido: /stɛp bæk ænd lʊk æt ðə bɪɡ ˈpɪktʃər/."
  },
  {
    id: "phr-misunderstandings",
    phrase: "Let me double-check that to avoid any misunderstandings",
    schoolVsNative: {
      school: "I will check so there are no errors.",
      native: "Let me double-check that to avoid any misunderstandings."
    },
    meaningES: "Déjame verificarlo dos veces para evitar cualquier malentendido",
    explanation: "Evita asumir premisas falsas en proyectos multiculturales (por ejemplo entre plantas de México, EE.UU. y Taiwán).",
    category: "conflict_resolution",
    exampleEN: "Let me double-check the pinout diagram with the hardware lead to avoid any misunderstandings.",
    exampleES: "Déjame verificar dos veces el diagrama de pines con el líder de hardware para evitar cualquier malentendido.",
    pronunciationHint: "Enlace: /ˌdʌblˈtʃɛk ðæt/."
  },

  // =========================================================================
  // CATEGORÍA 4: SMALL TALK & CONVERSACIÓN DE PASILLO (Social & Connection)
  // =========================================================================
  {
    id: "phr-catching-good-time",
    phrase: "Catching you at a good time?",
    schoolVsNative: {
      school: "Are you free to talk to me?",
      native: "Catching you at a good time?"
    },
    meaningES: "¿Te agarro en un buen momento? / ¿Tienes un minuto?",
    explanation: "La forma más nativa y considerada de iniciar un chat rápido en Slack, Teams o en persona sin sonar impositivo.",
    category: "small_talk",
    exampleEN: "Hey Elena, catching you at a good time? Need a 30-second opinion on this thermal paste choice.",
    exampleES: "Hola Elena, ¿te agarro en un buen momento? Necesito tu opinión de 30 segundos sobre esta elección de pasta térmica.",
    pronunciationHint: "Ritmo rápido: /ˈkætʃɪŋ juː æt ə ɡʊd taɪm/."
  },
  {
    id: "phr-get-back-to-it",
    phrase: "I'll let you get back to it",
    schoolVsNative: {
      school: "Goodbye, continue your work.",
      native: "I'll let you get back to it."
    },
    meaningES: "Te dejo continuar con lo tuyo / Te libero para que sigas trabajando",
    explanation: "La despedida profesional por excelencia. Demuestra alto respeto por el tiempo de trabajo del interlocutor.",
    category: "small_talk",
    exampleEN: "Thanks for clarifying the voltage spec! I'll let you get back to it.",
    exampleES: "¡Gracias por aclarar la especificación de voltaje! Te dejo continuar con lo tuyo.",
    pronunciationHint: "Suena como 'get-back-to-it': /ɡɛt bæk tuː ɪt/."
  },
  {
    id: "phr-keep-me-posted",
    phrase: "Keep me posted!",
    schoolVsNative: {
      school: "Send me emails with updates.",
      native: "Keep me posted!"
    },
    meaningES: "¡Manténme al tanto! / ¡Avísame cualquier novedad!",
    explanation: "Mucho más natural que 'inform me'. Se usa al terminar una conversación sobre un experimento o tarea en curso.",
    category: "small_talk",
    exampleEN: "Good luck with the cleanroom particle test! Keep me posted!",
    exampleES: "¡Buena suerte con la prueba de partículas en el cuarto limpio! ¡Manténme al tanto!",
    pronunciationHint: "Énfasis en 'posted': /kiːp miː ˈpoʊstɪd/."
  },

  // =========================================================================
  // CATEGORÍA 5: MÉTRICAS Y RESULTADOS (Data & Quality)
  // =========================================================================
  {
    id: "phr-drawing-board",
    phrase: "Back to the drawing board",
    schoolVsNative: {
      school: "We must restart from zero.",
      native: "Back to the drawing board."
    },
    meaningES: "De vuelta a empezar desde cero",
    explanation: "Se usa cuando un diseño o prototipo falla totalmente las pruebas de calidad y requiere reingeniería inicial.",
    category: "metrics",
    exampleEN: "The cooling system failed stress tests at 95°C. It's back to the drawing board for the heat sink design.",
    exampleES: "El sistema de enfriamiento falló las pruebas de estrés a 95°C. Toca volver a empezar desde cero con el diseño del disipador.",
    pronunciationHint: "Énfasis en 'drawing board': /bæk tuː ðə ˈdrɔːɪŋ bɔːrd/."
  },
  {
    id: "phr-cut-corners",
    phrase: "We cannot cut corners on safety",
    schoolVsNative: {
      school: "We must not do cheap bad work.",
      native: "We cannot cut corners on safety."
    },
    meaningES: "No podemos escatimar / tomar atajos en seguridad",
    explanation: "Se refiere a arriesgar la calidad o saltarse normas para ahorrar dinero o tiempo.",
    category: "metrics",
    exampleEN: "When assembling high-voltage EV battery modules, we cannot cut corners on isolation testing.",
    exampleES: "Al ensamblar módulos de batería de EV de alto voltaje, no podemos escatimar en pruebas de aislamiento.",
    pronunciationHint: "Enlace: /kʌt ˈkɔːrnərz/."
  },
  {
    id: "phr-ground-running",
    phrase: "Hit the ground running",
    schoolVsNative: {
      school: "Start working fast and well from day one.",
      native: "Hit the ground running."
    },
    meaningES: "Arrancar a toda velocidad / Ser productivo desde el primer día",
    explanation: "Muy usada en entrevistas de trabajo y nearshoring para describir a alguien que no requiere entrenamiento largo.",
    category: "metrics",
    exampleEN: "With your stemOS semiconductor certificate, you'll hit the ground running on the wafer fabrication team.",
    exampleES: "Con tu certificado stemOS en semiconductores, arrancarás a toda velocidad en el equipo de fabricación de obleas.",
    pronunciationHint: "Cadencia ágil: /hɪt ðə graʊnd ˈrʌnɪŋ/."
  }
];

// Attach to window and export for Node modules
if (typeof window !== 'undefined') {
  window.STEMOS_PHRASES = STEMOS_PHRASES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = STEMOS_PHRASES;
}
