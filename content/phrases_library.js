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
  },

  // =========================================================================
  // CATEGORÍA 6: CAPÍTULO 7 — FRASES QUE NO ENSEÑAN EN LA ESCUELA (NATIVE REAL-WORLD)
  // =========================================================================
  {
    id: "phr-non-starter",
    phrase: "That's a non-starter",
    schoolVsNative: {
      school: "That is impossible or not allowed.",
      native: "That's a non-starter."
    },
    meaningES: "Eso es inviable desde el origen / Ni siquiera es una opción",
    explanation: "Se usa para descartar una propuesta que viola normas de seguridad, presupuestos o especificaciones de cliente desde el principio.",
    category: "workplace",
    exampleEN: "Bypassing cleanroom ISO 5 air filters during chip fabrication is a non-starter.",
    exampleES: "Omitir los filtros de aire ISO 5 del cuarto limpio durante la fabricación de chips es inviable desde el origen.",
    pronunciationHint: "Cadencia rápida: /ðæts ə nɒnˈstɑːrtər/."
  },
  {
    id: "phr-step-on-gas",
    phrase: "We need to step on the gas",
    schoolVsNative: {
      school: "We must work much faster.",
      native: "We need to step on the gas."
    },
    meaningES: "Acelerarle al ritmo / Pisar el acelerador",
    explanation: "Metáfora automotriz para acelerar el desarrollo o entrega de un sprint técnico.",
    category: "workplace",
    exampleEN: "With the Boeing audit coming up in two weeks, we need to step on the gas with the AS9100 quality documentation.",
    exampleES: "Con la auditoría de Boeing en dos semanas, necesitamos pisar el acelerador con la documentación de calidad AS9100.",
    pronunciationHint: "Ritmo fluido: /stɛp ɒn ðə ɡæs/."
  },
  {
    id: "phr-dropped-ball",
    phrase: "That was my bad, I dropped the ball",
    schoolVsNative: {
      school: "I made a serious mistake.",
      native: "That was my bad, I dropped the ball."
    },
    meaningES: "Fue mi error, se me fue de las manos / cometí un descuido",
    explanation: "Una forma transparente y madura de asumir responsabilidad por un fallo menor en el trabajo.",
    category: "conflict_resolution",
    exampleEN: "I dropped the ball on updating the firmware repository link before the release build. Fixing it now.",
    exampleES: "Fue mi error no actualizar el enlace del repositorio de firmware antes de la versión final. Lo arreglo ahora mismo.",
    pronunciationHint: "Pronuncia 'dropped-the-ball': /drɒpt ðə bɔːl/."
  },
  {
    id: "phr-bear-with-me",
    phrase: "Bear with me for a second",
    schoolVsNative: {
      school: "Please wait a moment while I work.",
      native: "Bear with me for a second."
    },
    meaningES: "Tenme un poco de paciencia un segundo / Acompáñame un momento",
    explanation: "Pedir tiempo en vivo mientras abres una presentación, buscas un archivo o corriges un script en una pantalla compartida.",
    category: "small_talk",
    exampleEN: "Bear with me for a second while I share the wafer inspection telemetry dashboard.",
    exampleES: "Ténganme paciencia un segundo mientras comparto el panel de telemetría de inspección de obleas.",
    pronunciationHint: "Enlace suave: /bɛər wɪð miː/."
  },
  {
    id: "phr-sanity-check",
    phrase: "Let me do a quick sanity check",
    schoolVsNative: {
      school: "I will review if this makes sense.",
      native: "Let me do a quick sanity check."
    },
    meaningES: "Déjame hacer una revisión rápida de coherencia / comprobación de cordura",
    explanation: "Revisar parámetros o números para asegurar que no tengan un error obvio antes de simular o enviar a fábrica.",
    category: "technical_debate",
    exampleEN: "Let me do a quick sanity check on these thermal resistance values before pushing the simulation.",
    exampleES: "Déjame hacer una revisión rápida de coherencia a estos valores de resistencia térmica antes de lanzar la simulación.",
    pronunciationHint: "Ritmo: /sænəti tʃɛk/."
  },
  {
    id: "phr-bench-test",
    phrase: "We ran a bench test on the prototype",
    schoolVsNative: {
      school: "We tested the part in the laboratory.",
      native: "We ran a bench test on the prototype."
    },
    meaningES: "Corrimos una prueba de banco en el prototipo",
    explanation: "Probar un componente electrónico o mecánico en la mesa de trabajo de ingeniería antes de colocarlo en el sistema completo.",
    category: "technical_debate",
    exampleEN: "We ran a bench test on the new inverter board, and it handled 800V without thermal degradation.",
    exampleES: "Hicimos una prueba de banco a la nueva tarjeta inversora y soportó 800V sin degradación térmica.",
    pronunciationHint: "Énfasis en 'bench': /bɛntʃ tɛst/."
  },
  {
    id: "phr-gut-check",
    phrase: "My gut check tells me this is wrong",
    schoolVsNative: {
      school: "My intuition says this has errors.",
      native: "My gut check tells me this is wrong."
    },
    meaningES: "Mi intuición técnica me dice que algo no cuadra",
    explanation: "Usar la intuición perfeccionada por la experiencia para detectar anomalías antes de tener los reportes completos.",
    category: "technical_debate",
    exampleEN: "My gut check tells me this power density calculation is too high for a standard QFN package.",
    exampleES: "Mi intuición técnica me dice que este cálculo de densidad de potencia es muy alto para un empaque QFN estándar.",
    pronunciationHint: "Pronuncia 'gut': /ɡʌt tʃɛk/."
  },
  {
    id: "phr-shed-light",
    phrase: "Can anyone shed light on this defect?",
    schoolVsNative: {
      school: "Can anyone explain this problem?",
      native: "Can anyone shed light on this defect?"
    },
    meaningES: "¿Alguien puede dar luz / aclarar este defecto?",
    explanation: "Pedir contexto o explicación sobre una falla poco común o desconocida en producción.",
    category: "technical_debate",
    exampleEN: "Can anyone shed light on why the optical transceivers are experiencing high bit error rates at 800G?",
    exampleES: "¿Alguien puede dar luz sobre por qué los transceptores ópticos están experimentando altas tasas de error de bits a 800G?",
    pronunciationHint: "Fluido: /ʃɛd laɪt/."
  },

  // =========================================================================
  // CATEGORÍA 7: CAPÍTULO 8 — TROUBLESHOOTING & INCIDENTES (CRISIS MANAGEMENT)
  // =========================================================================
  {
    id: "phr-walk-me-through",
    phrase: "Walk me through what happened",
    schoolVsNative: {
      school: "Explain step by step what you did.",
      native: "Walk me through what happened."
    },
    meaningES: "Guíame paso a paso por lo que sucedió",
    explanation: "Pedir la reconstrucción cronológica de los hechos antes de una falla en el servidor o línea de ensamble.",
    category: "conflict_resolution",
    exampleEN: "Walk me through what happened right before the robotic arm lost calibration on the SMT line.",
    exampleES: "Guíame paso a paso por lo que pasó justo antes de que el brazo robótico perdiera la calibración en la línea SMT.",
    pronunciationHint: "Conecta 'walk-me-through': /wɔːk miː θruː/."
  },
  {
    id: "phr-workaround",
    phrase: "Is there a temporary workaround in place?",
    schoolVsNative: {
      school: "Is there a temporary solution?",
      native: "Is there a temporary workaround in place?"
    },
    meaningES: "¿Hay alguna solución temporal o rodeos implementados?",
    explanation: "Preguntar si se creó un baipás temporal para mantener operando la planta mientras se arregla el problema de raíz.",
    category: "conflict_resolution",
    exampleEN: "The automated optical inspection server crashed, but is there a manual workaround in place?",
    exampleES: "El servidor de inspección óptica automatizada falló, pero ¿hay alguna solución temporal manual en marcha?",
    pronunciationHint: "Palabra clave 'workaround': /ˈwɜːrkəraʊnd/."
  },
  {
    id: "phr-root-cause",
    phrase: "We need a full root-cause analysis (RCA)",
    schoolVsNative: {
      school: "We must study why the primary failure happened.",
      native: "We need a full root-cause analysis (RCA)."
    },
    meaningES: "Necesitamos un análisis completo de causa raíz",
    explanation: "Metodología estándar en calidad (AS9100/ISO 9001) para investigar qué desencadenó el problema.",
    category: "metrics",
    exampleEN: "We contained the leak, but the aerospace client requires a full root-cause analysis by Friday.",
    exampleES: "Contuvimos la fuga, pero el cliente aeroespacial requiere un análisis completo de causa raíz para el viernes.",
    pronunciationHint: "Acrónimo 'R-C-A': /ruːt kɔːz əˈnæləsɪs/."
  },
  {
    id: "phr-known-issue",
    phrase: "Don't worry, it's a known issue",
    schoolVsNative: {
      school: "We already know about this bug.",
      native: "Don't worry, it's a known issue."
    },
    meaningES: "No te preocupes, es un problema ya identificado",
    explanation: "Tranquiliza a un técnico o cliente confirmando que la falla ya está registrada en el backlog para su parche.",
    category: "conflict_resolution",
    exampleEN: "The minor voltage fluctuation on pin 4 is a known issue being addressed in the next firmware patch.",
    exampleES: "La fluctuación menor de voltaje en el pin 4 es un problema ya identificado que se corregirá en el siguiente parche.",
    pronunciationHint: "Suena como 'known-issue': /noʊn ˈɪʃuː/."
  },
  {
    id: "phr-eta-fix",
    phrase: "What's the ETA on the fix?",
    schoolVsNative: {
      school: "What time will the repair finish?",
      native: "What's the ETA on the fix?"
    },
    meaningES: "¿Cuál es el tiempo estimado de entrega / solución?",
    explanation: "Pregunta directa por el horario o minutos faltantes para resolver un fallo en producción (ETA = Estimated Time of Arrival).",
    category: "workplace",
    exampleEN: "The CNC milling machine motor overheated. What's the ETA on the fix?",
    exampleES: "El motor de la fresadora CNC se sobrecalentó. ¿Cuál es el tiempo estimado para repararlo?",
    pronunciationHint: "Pronuncia 'E-T-A': /iː tiː eɪ ɒn ðə fɪks/."
  },
  {
    id: "phr-escalate",
    phrase: "We need to escalate this to Tier 3 support",
    schoolVsNative: {
      school: "We must send this problem to higher engineers.",
      native: "We need to escalate this to Tier 3 support."
    },
    meaningES: "Necesitamos escalar este problema al soporte de Nivel 3",
    explanation: "Transferir un incidente crítico que sobrepasa los permisos o conocimientos del soporte inicial.",
    category: "conflict_resolution",
    exampleEN: "Since local diagnostics didn't resolve the optical link drop, we need to escalate this to Tier 3 support.",
    exampleES: "Dado que el diagnóstico local no resolvió la caída del enlace óptico, debemos escalar esto a soporte de Nivel 3.",
    pronunciationHint: "Énfasis en 'escalate': /ˈɛskəleɪt/."
  },

  // =========================================================================
  // CATEGORÍA 8: CAPÍTULO 9 — NEGOCIACIÓN Y NEARSHORING (MEETING ETIQUETTE)
  // =========================================================================
  {
    id: "phr-outside-scope",
    phrase: "That's outside our current scope",
    schoolVsNative: {
      school: "We cannot do that extra work in this contract.",
      native: "That's outside our current scope."
    },
    meaningES: "Eso está fuera de nuestro alcance actual",
    explanation: "Poner un límite profesional amigable cuando un cliente o jefe pide tareas no contempladas en el plan original.",
    category: "workplace",
    exampleEN: "Redesigning the entire battery enclosure is great, but that's outside our current scope for Phase 1.",
    exampleES: "Rediseñar todo el compartimento de la batería es genial, pero está fuera de nuestro alcance actual para la Fase 1.",
    pronunciationHint: "Palabra clave 'scope': /aʊtˈsaɪd aʊər ˈkʌrənt skoʊp/."
  },
  {
    id: "phr-check-bandwidth",
    phrase: "Let me check our team's bandwidth",
    schoolVsNative: {
      school: "I will check if my team has time to work.",
      native: "Let me check our team's bandwidth."
    },
    meaningES: "Déjame verificar la disponibilidad / carga de trabajo de nuestro equipo",
    explanation: "Usar 'bandwidth' (ancho de banda) para referirse a la capacidad de tiempo y energía humana de los ingenieros.",
    category: "workplace",
    exampleEN: "I'll check our engineering team's bandwidth for this week and get back to you with a commitment.",
    exampleES: "Verificaré la disponibilidad de nuestro equipo de ingeniería para esta semana y te respondo con un compromiso.",
    pronunciationHint: "Término técnico 'bandwidth': /ˈbændwɪdtθ/."
  },
  {
    id: "phr-trade-off",
    phrase: "It's a trade-off between weight and cost",
    schoolVsNative: {
      school: "It is a compromise of two things.",
      native: "It's a trade-off between weight and cost."
    },
    meaningES: "Es un compromiso / un intercambio equilibrado entre dos factores",
    explanation: "Concepto central de la ingeniería: ceder en un aspecto (ej. costo) para ganar en otro (ej. resistencia térmica).",
    category: "technical_debate",
    exampleEN: "Choosing titanium over aluminum is a trade-off between weight reduction and material cost.",
    exampleES: "Elegir titanio en lugar de aluminio es un compromiso equilibrado entre reducción de peso y costo de material.",
    pronunciationHint: "Pronuncia 'trade-off': /ˈtreɪd ɒf/."
  },
  {
    id: "phr-action-item",
    phrase: "Who owns this action item?",
    schoolVsNative: {
      school: "Who is responsible for this task?",
      native: "Who owns this action item?"
    },
    meaningES: "¿Quién es el responsable directo de esta tarea?",
    explanation: "Definir claridad absoluta al cerrar una junta corporativa para que los pendientes no queden flotando.",
    category: "workplace",
    exampleEN: "Great sync team. Who owns the action item for updating the AS9100 inspection checklist?",
    exampleES: "Excelente junta equipo. ¿Quién es el responsable directo de actualizar la lista de cotejo de inspección AS9100?",
    pronunciationHint: "Enlace: /uː oʊnz ðɪs ˈækʃən ˈaɪtəm/."
  },
  {
    id: "phr-circle-back",
    phrase: "Let's circle back to this later",
    schoolVsNative: {
      school: "We will talk about this point again later.",
      native: "Let's circle back to this later."
    },
    meaningES: "Retomemos esto más adelante",
    explanation: "Establecer que un punto importante se volverá a analizar cuando existan más datos o concluya otro módulo.",
    category: "workplace",
    exampleEN: "Let's circle back to the micro-inverter topology once we receive the thermal test results.",
    exampleES: "Retomemos la topología del microinversor más adelante una vez que recibamos los resultados de las pruebas térmicas.",
    pronunciationHint: "Pronuncia 'circle-back': /ˈsɜːrkl bæk/."
  },
  {
    id: "phr-take-offline",
    phrase: "Let me take this offline with Sarah",
    schoolVsNative: {
      school: "We will talk about this privately outside the meeting.",
      native: "Let me take this offline with Sarah."
    },
    meaningES: "Déjame tratar este punto en privado / fuera de la reunión con Sarah",
    explanation: "Desviar una discusión técnica muy detallada a una llamada de dos personas para no quitar tiempo a los demás asistentes.",
    category: "small_talk",
    exampleEN: "This signal integrity detail only affects the PCB layout team; let me take this offline with Sarah after the call.",
    exampleES: "Este detalle de integridad de señal solo afecta al equipo de diseño de PCB; déjame tratarlo fuera de la reunión con Sarah.",
    pronunciationHint: "Énfasis en 'offline': /teɪk ðɪs ˌɒfˈlaɪn/."
  }
];

// Attach to window and export for Node modules
if (typeof window !== 'undefined') {
  window.STEMOS_PHRASES = STEMOS_PHRASES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = STEMOS_PHRASES;
}
