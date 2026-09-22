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
 *  - category: Categoría temática (workplace, technical_debate, conflict_resolution, small_talk, metrics, meetings, problem_solving, soft_skills)
 *  - exampleEN: Ejemplo práctico en Nearshoring/Ingeniería
 *  - exampleES: Traducción del ejemplo al español
 *  - pronunciationHint: Consejo de pronunciación / ritmo nativo
 */

var STEMOS_PHRASES = [
  {
    "id": "phr-swamped",
    "phrase": "I'm swamped at the moment",
    "schoolVsNative": {
      "school": "I am very busy right now.",
      "native": "I'm swamped at the moment."
    },
    "meaningES": "Estoy inundado de trabajo / Hasta el cuello de pendientes",
    "explanation": "En la escuela enseñan 'very busy', pero en la industria nativa se usa 'swamped' (como estar sumergido bajo el agua). Suena extremadamente profesional e informal-elegante.",
    "category": "workplace",
    "exampleEN": "I'd love to review the wafer CAD files, but I'm swamped at the moment preparing for the TSMC audit.",
    "exampleES": "Me encantaría revisar los archivos CAD de las obleas, pero estoy saturado de trabajo en este momento preparando la auditoría de TSMC.",
    "pronunciationHint": "Pronuncia 'swamped' con 'p-t' final suave: /swɑːmpt/."
  },
  {
    "id": "phr-pipeline",
    "phrase": "It's currently in the pipeline",
    "schoolVsNative": {
      "school": "We are working on it now.",
      "native": "It's currently in the pipeline."
    },
    "meaningES": "Está en proceso / En camino a ser entregado",
    "explanation": "Se usa para confirmar que una tarea, documento o parche de software ya pasó por la etapa inicial y está avanzando por la tubería de producción.",
    "category": "workplace",
    "exampleEN": "Don't worry about the safety compliance certificate; it's currently in the pipeline.",
    "exampleES": "No te preocupes por el certificado de cumplimiento de seguridad; ya está en proceso.",
    "pronunciationHint": "Conecta 'in the' rápido: /ɪn ðə ˈpaɪplaɪn/."
  },
  {
    "id": "phr-back-burner",
    "phrase": "Let's put this on the back burner",
    "schoolVsNative": {
      "school": "We will do this later.",
      "native": "Let's put this on the back burner."
    },
    "meaningES": "Pongamos esto en segundo plano / Poner a fuego lento",
    "explanation": "Metáfora de la cocina (los quemadores de atrás). Significa posponer una tarea sin cancelarla para concentrar la energía en lo prioritario.",
    "category": "workplace",
    "exampleEN": "Let's put the UI redesign on the back burner and focus on fixing the telemetry latency bug first.",
    "exampleES": "Pongamos el rediseño de la interfaz en segundo plano y concentrémonos primero en corregir la falla de latencia de telemetría.",
    "pronunciationHint": "Énfasis en 'back': /ˈbæk ˌbɜːrnər/."
  },
  {
    "id": "phr-ducks-in-row",
    "phrase": "Get our ducks in a row",
    "schoolVsNative": {
      "school": "Organize everything well before starting.",
      "native": "Get our ducks in a row."
    },
    "meaningES": "Tener todo perfectamente organizado y alineado",
    "explanation": "Se usa antes de auditorías, demostraciones a clientes o arranques de línea. Significa no dejar ningún detalle suelto.",
    "category": "workplace",
    "exampleEN": "Before we invite the plant manager, let's make sure we have all our engineering ducks in a row.",
    "exampleES": "Antes de invitar al gerente de planta, asegurémonos de tener todos nuestros detalles técnicos perfectamente organizados.",
    "pronunciationHint": "Pronuncia 'ducks-in-a' de corrido: /dʌks ɪn ə roʊ/."
  },
  {
    "id": "phr-touch-base",
    "phrase": "Let's touch base tomorrow",
    "schoolVsNative": {
      "school": "I will call you or talk to you tomorrow.",
      "native": "Let's touch base tomorrow."
    },
    "meaningES": "Hagamos una breve sincronización / Contactémonos mañana",
    "explanation": "Una de las frases ejecutivas nativas más comunes. No implica una junta larga, sino una actualización breve de 2 minutos.",
    "category": "workplace",
    "exampleEN": "I'll review the sensor logs tonight, and let's touch base tomorrow morning at 8:00 AM.",
    "exampleES": "Revisaré los registros de los sensores esta noche y hagamos una breve sincronización mañana a las 8:00 AM.",
    "pronunciationHint": "Suena como 'touch-base': /tʌtʃ beɪs/."
  },
  {
    "id": "phr-streamline",
    "phrase": "We need to streamline this workflow",
    "schoolVsNative": {
      "school": "We must make this process faster.",
      "native": "We need to streamline this workflow."
    },
    "meaningES": "Optimizar / Eliminar pasos innecesarios",
    "explanation": "Viene de la aerodinámica (hacer algo aerodinámico). En ingeniería significa eliminar burocracia o desperdicios de tiempo.",
    "category": "workplace",
    "exampleEN": "By using automated scripts, we can streamline our firmware testing workflow by 40%.",
    "exampleES": "Usando scripts automatizados, podemos optimizar nuestro flujo de pruebas de firmware en un 40%.",
    "pronunciationHint": "Énfasis en 'stream': /ˈstriːmlaɪn/."
  },
  {
    "id": "phr-jump-conclusions",
    "phrase": "I wouldn't jump to conclusions just yet",
    "schoolVsNative": {
      "school": "Do not decide quickly without thinking.",
      "native": "I wouldn't jump to conclusions just yet."
    },
    "meaningES": "No me precipitaría a sacar conclusiones todavía",
    "explanation": "La usas para pedir prudencia técnica cuando un componente falla y alguien quiere culpar a la pieza equivocada sin suficientes pruebas.",
    "category": "technical_debate",
    "exampleEN": "The voltage dropped once, but I wouldn't jump to conclusions just yet until we test under full thermal load.",
    "exampleES": "El voltaje cayó una vez, pero no me precipitaría a sacar conclusiones todavía hasta probar bajo carga térmica completa.",
    "pronunciationHint": "Enlace fluido: /wʊdnt dʒʌmp tə kənˈkluːʒənz/."
  },
  {
    "id": "phr-standpoint",
    "phrase": "From a technical standpoint...",
    "schoolVsNative": {
      "school": "Speaking technically...",
      "native": "From a technical standpoint..."
    },
    "meaningES": "Desde un punto de vista técnico...",
    "explanation": "La muletilla profesional perfecta para separar argumentos de negocios o costos de las realidades físicas/técnicas.",
    "category": "technical_debate",
    "exampleEN": "From a technical standpoint, copper harness wiring will degrade faster than silver-plated contacts under high humidity.",
    "exampleES": "Desde un punto de vista técnico, el cableado de arnés de cobre se degradará más rápido que los contactos plateados bajo alta humedad.",
    "pronunciationHint": "Énfasis en 'standpoint': /ˈstændpɔɪnt/."
  },
  {
    "id": "phr-reservations",
    "phrase": "I have my reservations about this architecture",
    "schoolVsNative": {
      "school": "I think this plan is not good.",
      "native": "I have my reservations about this architecture."
    },
    "meaningES": "Tengo mis reservas / dudas justificadas sobre esto",
    "explanation": "Expresa dudas profesionales de forma elegante y respetuosa sin sonar destructivo o agresivo.",
    "category": "technical_debate",
    "exampleEN": "I have my reservations about using single-board controllers for industrial safety systems.",
    "exampleES": "Tengo mis reservas sobre el uso de controladores de tarjeta única para sistemas de seguridad industrial.",
    "pronunciationHint": "Suena como 'rez-er-VAY-shunz': /ˌrezərˈveɪʃənz/."
  },
  {
    "id": "phr-middle-ground",
    "phrase": "Can we find a middle ground?",
    "schoolVsNative": {
      "school": "Can we make a compromise?",
      "native": "Can we find a middle ground?"
    },
    "meaningES": "¿Podemos encontrar un punto medio?",
    "explanation": "Ideal durante negociaciones entre costo vs. rendimiento o entre requerimientos de diseño de dos departamentos.",
    "category": "technical_debate",
    "exampleEN": "Quality wants 100% manual inspection, while production wants 0%. Can we find a middle ground with sampling?",
    "exampleES": "Calidad quiere 100% inspección manual, mientras producción quiere 0%. ¿Podemos encontrar un punto medio con muestreo?",
    "pronunciationHint": "Ritmo continuo: /faɪnd ə ˈmɪdl graʊnd/."
  },
  {
    "id": "phr-aligns-with",
    "phrase": "That aligns perfectly with our data",
    "schoolVsNative": {
      "school": "That is equal to our results.",
      "native": "That aligns perfectly with our data."
    },
    "meaningES": "Eso coincide / se alinea perfectamente con nuestros datos",
    "explanation": "Palabra clave de trazabilidad. Muestra que la hipótesis de un colega concuerda con las mediciones reales.",
    "category": "technical_debate",
    "exampleEN": "Your cleanroom humidity graph aligns perfectly with our yield drop timestamp.",
    "exampleES": "Tu gráfica de humedad en el cuarto limpio coincide perfectamente con la marca de tiempo de caída de rendimiento.",
    "pronunciationHint": "Pronuncia 'aligns' como 'a-LAINZ': /əˈlaɪnz/."
  },
  {
    "id": "phr-oversight",
    "phrase": "My apologies, that was an oversight on my part",
    "schoolVsNative": {
      "school": "Sorry, I made a mistake.",
      "native": "My apologies, that was an oversight on my part."
    },
    "meaningES": "Mis disculpas, fue una omisión / descuido de mi parte",
    "explanation": "Diferencia a un estudiante novato de un ingeniero sénior. La palabra 'oversight' reconoce un descuido técnico de manera madura.",
    "category": "conflict_resolution",
    "exampleEN": "My apologies, leaving out the surge protection specification was an oversight on my part.",
    "exampleES": "Mis disculpas, dejar fuera la especificación de protección contra sobretensiones fue una omisión de mi parte.",
    "pronunciationHint": "Suena como 'OH-ver-sight': /ˈoʊvərsaɪt/."
  },
  {
    "id": "phr-step-back",
    "phrase": "Let's step back and look at the big picture",
    "schoolVsNative": {
      "school": "Stop arguing and look at the main goal.",
      "native": "Let's step back and look at the big picture."
    },
    "meaningES": "Demos un paso atrás y veamos el panorama general",
    "explanation": "La frase de liderazgo perfecta para calmar discusiones sobre detalles menores y reenfocar al equipo en la meta principal.",
    "category": "conflict_resolution",
    "exampleEN": "We're arguing over button colors. Let's step back and look at the big picture: operator safety.",
    "exampleES": "Estamos discutiendo por colores de botones. Demos un paso atrás y veamos el panorama general: la seguridad del operador.",
    "pronunciationHint": "Fluido: /stɛp bæk ænd lʊk æt ðə bɪɡ ˈpɪktʃər/."
  },
  {
    "id": "phr-misunderstandings",
    "phrase": "Let me double-check that to avoid any misunderstandings",
    "schoolVsNative": {
      "school": "I will check so there are no errors.",
      "native": "Let me double-check that to avoid any misunderstandings."
    },
    "meaningES": "Déjame verificarlo dos veces para evitar cualquier malentendido",
    "explanation": "Evita asumir premisas falsas en proyectos multiculturales (por ejemplo entre plantas de México, EE.UU. y Taiwán).",
    "category": "conflict_resolution",
    "exampleEN": "Let me double-check the pinout diagram with the hardware lead to avoid any misunderstandings.",
    "exampleES": "Déjame verificar dos veces el diagrama de pines con el líder de hardware para evitar cualquier malentendido.",
    "pronunciationHint": "Enlace: /ˌdʌblˈtʃɛk ðæt/."
  },
  {
    "id": "phr-catching-good-time",
    "phrase": "Catching you at a good time?",
    "schoolVsNative": {
      "school": "Are you free to talk to me?",
      "native": "Catching you at a good time?"
    },
    "meaningES": "¿Te agarro en un buen momento? / ¿Tienes un minuto?",
    "explanation": "La forma más nativa y considerada de iniciar un chat rápido en Slack, Teams o en persona sin sonar impositivo.",
    "category": "small_talk",
    "exampleEN": "Hey Elena, catching you at a good time? Need a 30-second opinion on this thermal paste choice.",
    "exampleES": "Hola Elena, ¿te agarro en un buen momento? Necesito tu opinión de 30 segundos sobre esta elección de pasta térmica.",
    "pronunciationHint": "Ritmo rápido: /ˈkætʃɪŋ juː æt ə ɡʊd taɪm/."
  },
  {
    "id": "phr-get-back-to-it",
    "phrase": "I'll let you get back to it",
    "schoolVsNative": {
      "school": "Goodbye, continue your work.",
      "native": "I'll let you get back to it."
    },
    "meaningES": "Te dejo continuar con lo tuyo / Te libero para que sigas trabajando",
    "explanation": "La despedida profesional por excelencia. Demuestra alto respeto por el tiempo de trabajo del interlocutor.",
    "category": "small_talk",
    "exampleEN": "Thanks for clarifying the voltage spec! I'll let you get back to it.",
    "exampleES": "¡Gracias por aclarar la especificación de voltaje! Te dejo continuar con lo tuyo.",
    "pronunciationHint": "Suena como 'get-back-to-it': /ɡɛt bæk tuː ɪt/."
  },
  {
    "id": "phr-keep-me-posted",
    "phrase": "Keep me posted!",
    "schoolVsNative": {
      "school": "Send me emails with updates.",
      "native": "Keep me posted!"
    },
    "meaningES": "¡Manténme al tanto! / ¡Avísame cualquier novedad!",
    "explanation": "Mucho más natural que 'inform me'. Se usa al terminar una conversación sobre un experimento o tarea en curso.",
    "category": "small_talk",
    "exampleEN": "Good luck with the cleanroom particle test! Keep me posted!",
    "exampleES": "¡Buena suerte con la prueba de partículas en el cuarto limpio! ¡Manténme al tanto!",
    "pronunciationHint": "Énfasis en 'posted': /kiːp miː ˈpoʊstɪd/."
  },
  {
    "id": "phr-drawing-board",
    "phrase": "Back to the drawing board",
    "schoolVsNative": {
      "school": "We must restart from zero.",
      "native": "Back to the drawing board."
    },
    "meaningES": "De vuelta a empezar desde cero",
    "explanation": "Se usa cuando un diseño o prototipo falla totalmente las pruebas de calidad y requiere reingeniería inicial.",
    "category": "metrics",
    "exampleEN": "The cooling system failed stress tests at 95°C. It's back to the drawing board for the heat sink design.",
    "exampleES": "El sistema de enfriamiento falló las pruebas de estrés a 95°C. Toca volver a empezar desde cero con el diseño del disipador.",
    "pronunciationHint": "Énfasis en 'drawing board': /bæk tuː ðə ˈdrɔːɪŋ bɔːrd/."
  },
  {
    "id": "phr-cut-corners",
    "phrase": "We cannot cut corners on safety",
    "schoolVsNative": {
      "school": "We must not do cheap bad work.",
      "native": "We cannot cut corners on safety."
    },
    "meaningES": "No podemos escatimar / tomar atajos en seguridad",
    "explanation": "Se refiere a arriesgar la calidad o saltarse normas para ahorrar dinero o tiempo.",
    "category": "metrics",
    "exampleEN": "When assembling high-voltage EV battery modules, we cannot cut corners on isolation testing.",
    "exampleES": "Al ensamblar módulos de batería de EV de alto voltaje, no podemos escatimar en pruebas de aislamiento.",
    "pronunciationHint": "Enlace: /kʌt ˈkɔːrnərz/."
  },
  {
    "id": "phr-ground-running",
    "phrase": "Hit the ground running",
    "schoolVsNative": {
      "school": "Start working fast and well from day one.",
      "native": "Hit the ground running."
    },
    "meaningES": "Arrancar a toda velocidad / Ser productivo desde el primer día",
    "explanation": "Muy usada en entrevistas de trabajo y nearshoring para describir a alguien que no requiere entrenamiento largo.",
    "category": "metrics",
    "exampleEN": "With your stemOS semiconductor certificate, you'll hit the ground running on the wafer fabrication team.",
    "exampleES": "Con tu certificado stemOS en semiconductores, arrancarás a toda velocidad en el equipo de fabricación de obleas.",
    "pronunciationHint": "Cadencia ágil: /hɪt ðə graʊnd ˈrʌnɪŋ/."
  },
  {
    "id": "phr-non-starter",
    "phrase": "That's a non-starter",
    "schoolVsNative": {
      "school": "That is impossible or not allowed.",
      "native": "That's a non-starter."
    },
    "meaningES": "Eso es inviable desde el origen / Ni siquiera es una opción",
    "explanation": "Se usa para descartar una propuesta que viola normas de seguridad, presupuestos o especificaciones de cliente desde el principio.",
    "category": "workplace",
    "exampleEN": "Bypassing cleanroom ISO 5 air filters during chip fabrication is a non-starter.",
    "exampleES": "Omitir los filtros de aire ISO 5 del cuarto limpio durante la fabricación de chips es inviable desde el origen.",
    "pronunciationHint": "Cadencia rápida: /ðæts ə nɒnˈstɑːrtər/."
  },
  {
    "id": "phr-step-on-gas",
    "phrase": "We need to step on the gas",
    "schoolVsNative": {
      "school": "We must work much faster.",
      "native": "We need to step on the gas."
    },
    "meaningES": "Acelerarle al ritmo / Pisar el acelerador",
    "explanation": "Metáfora automotriz para acelerar el desarrollo o entrega de un sprint técnico.",
    "category": "workplace",
    "exampleEN": "With the Boeing audit coming up in two weeks, we need to step on the gas with the AS9100 quality documentation.",
    "exampleES": "Con la auditoría de Boeing en dos semanas, necesitamos pisar el acelerador con la documentación de calidad AS9100.",
    "pronunciationHint": "Ritmo fluido: /stɛp ɒn ðə ɡæs/."
  },
  {
    "id": "phr-dropped-ball",
    "phrase": "That was my bad, I dropped the ball",
    "schoolVsNative": {
      "school": "I made a serious mistake.",
      "native": "That was my bad, I dropped the ball."
    },
    "meaningES": "Fue mi error, se me fue de las manos / cometí un descuido",
    "explanation": "Una forma transparente y madura de asumir responsabilidad por un fallo menor en el trabajo.",
    "category": "conflict_resolution",
    "exampleEN": "I dropped the ball on updating the firmware repository link before the release build. Fixing it now.",
    "exampleES": "Fue mi error no actualizar el enlace del repositorio de firmware antes de la versión final. Lo arreglo ahora mismo.",
    "pronunciationHint": "Pronuncia 'dropped-the-ball': /drɒpt ðə bɔːl/."
  },
  {
    "id": "phr-bear-with-me",
    "phrase": "Bear with me for a second",
    "schoolVsNative": {
      "school": "Please wait a moment while I work.",
      "native": "Bear with me for a second."
    },
    "meaningES": "Tenme un poco de paciencia un segundo / Acompáñame un momento",
    "explanation": "Pedir tiempo en vivo mientras abres una presentación, buscas un archivo o corriges un script en una pantalla compartida.",
    "category": "small_talk",
    "exampleEN": "Bear with me for a second while I share the wafer inspection telemetry dashboard.",
    "exampleES": "Ténganme paciencia un segundo mientras comparto el panel de telemetría de inspección de obleas.",
    "pronunciationHint": "Enlace suave: /bɛər wɪð miː/."
  },
  {
    "id": "phr-sanity-check",
    "phrase": "Let me do a quick sanity check",
    "schoolVsNative": {
      "school": "I will review if this makes sense.",
      "native": "Let me do a quick sanity check."
    },
    "meaningES": "Déjame hacer una revisión rápida de coherencia / comprobación de cordura",
    "explanation": "Revisar parámetros o números para asegurar que no tengan un error obvio antes de simular o enviar a fábrica.",
    "category": "technical_debate",
    "exampleEN": "Let me do a quick sanity check on these thermal resistance values before pushing the simulation.",
    "exampleES": "Déjame hacer una revisión rápida de coherencia a estos valores de resistencia térmica antes de lanzar la simulación.",
    "pronunciationHint": "Ritmo: /sænəti tʃɛk/."
  },
  {
    "id": "phr-bench-test",
    "phrase": "We ran a bench test on the prototype",
    "schoolVsNative": {
      "school": "We tested the part in the laboratory.",
      "native": "We ran a bench test on the prototype."
    },
    "meaningES": "Corrimos una prueba de banco en el prototipo",
    "explanation": "Probar un componente electrónico o mecánico en la mesa de trabajo de ingeniería antes de colocarlo en el sistema completo.",
    "category": "technical_debate",
    "exampleEN": "We ran a bench test on the new inverter board, and it handled 800V without thermal degradation.",
    "exampleES": "Hicimos una prueba de banco a la nueva tarjeta inversora y soportó 800V sin degradación térmica.",
    "pronunciationHint": "Énfasis en 'bench': /bɛntʃ tɛst/."
  },
  {
    "id": "phr-gut-check",
    "phrase": "My gut check tells me this is wrong",
    "schoolVsNative": {
      "school": "My intuition says this has errors.",
      "native": "My gut check tells me this is wrong."
    },
    "meaningES": "Mi intuición técnica me dice que algo no cuadra",
    "explanation": "Usar la intuición perfeccionada por la experiencia para detectar anomalías antes de tener los reportes completos.",
    "category": "technical_debate",
    "exampleEN": "My gut check tells me this power density calculation is too high for a standard QFN package.",
    "exampleES": "Mi intuición técnica me dice que este cálculo de densidad de potencia es muy alto para un empaque QFN estándar.",
    "pronunciationHint": "Pronuncia 'gut': /ɡʌt tʃɛk/."
  },
  {
    "id": "phr-shed-light",
    "phrase": "Can anyone shed light on this defect?",
    "schoolVsNative": {
      "school": "Can anyone explain this problem?",
      "native": "Can anyone shed light on this defect?"
    },
    "meaningES": "¿Alguien puede dar luz / aclarar este defecto?",
    "explanation": "Pedir contexto o explicación sobre una falla poco común o desconocida en producción.",
    "category": "technical_debate",
    "exampleEN": "Can anyone shed light on why the optical transceivers are experiencing high bit error rates at 800G?",
    "exampleES": "¿Alguien puede dar luz sobre por qué los transceptores ópticos están experimentando altas tasas de error de bits a 800G?",
    "pronunciationHint": "Fluido: /ʃɛd laɪt/."
  },
  {
    "id": "phr-walk-me-through",
    "phrase": "Walk me through what happened",
    "schoolVsNative": {
      "school": "Explain step by step what you did.",
      "native": "Walk me through what happened."
    },
    "meaningES": "Guíame paso a paso por lo que sucedió",
    "explanation": "Pedir la reconstrucción cronológica de los hechos antes de una falla en el servidor o línea de ensamble.",
    "category": "conflict_resolution",
    "exampleEN": "Walk me through what happened right before the robotic arm lost calibration on the SMT line.",
    "exampleES": "Guíame paso a paso por lo que pasó justo antes de que el brazo robótico perdiera la calibración en la línea SMT.",
    "pronunciationHint": "Conecta 'walk-me-through': /wɔːk miː θruː/."
  },
  {
    "id": "phr-workaround",
    "phrase": "Is there a temporary workaround in place?",
    "schoolVsNative": {
      "school": "Is there a temporary solution?",
      "native": "Is there a temporary workaround in place?"
    },
    "meaningES": "¿Hay alguna solución temporal o rodeos implementados?",
    "explanation": "Preguntar si se creó un baipás temporal para mantener operando la planta mientras se arregla el problema de raíz.",
    "category": "conflict_resolution",
    "exampleEN": "The automated optical inspection server crashed, but is there a manual workaround in place?",
    "exampleES": "El servidor de inspección óptica automatizada falló, pero ¿hay alguna solución temporal manual en marcha?",
    "pronunciationHint": "Palabra clave 'workaround': /ˈwɜːrkəraʊnd/."
  },
  {
    "id": "phr-root-cause",
    "phrase": "We need a full root-cause analysis (RCA)",
    "schoolVsNative": {
      "school": "We must study why the primary failure happened.",
      "native": "We need a full root-cause analysis (RCA)."
    },
    "meaningES": "Necesitamos un análisis completo de causa raíz",
    "explanation": "Metodología estándar en calidad (AS9100/ISO 9001) para investigar qué desencadenó el problema.",
    "category": "metrics",
    "exampleEN": "We contained the leak, but the aerospace client requires a full root-cause analysis by Friday.",
    "exampleES": "Contuvimos la fuga, pero el cliente aeroespacial requiere un análisis completo de causa raíz para el viernes.",
    "pronunciationHint": "Acrónimo 'R-C-A': /ruːt kɔːz əˈnæləsɪs/."
  },
  {
    "id": "phr-known-issue",
    "phrase": "Don't worry, it's a known issue",
    "schoolVsNative": {
      "school": "We already know about this bug.",
      "native": "Don't worry, it's a known issue."
    },
    "meaningES": "No te preocupes, es un problema ya identificado",
    "explanation": "Tranquiliza a un técnico o cliente confirmando que la falla ya está registrada en el backlog para su parche.",
    "category": "conflict_resolution",
    "exampleEN": "The minor voltage fluctuation on pin 4 is a known issue being addressed in the next firmware patch.",
    "exampleES": "La fluctuación menor de voltaje en el pin 4 es un problema ya identificado que se corregirá en el siguiente parche.",
    "pronunciationHint": "Suena como 'known-issue': /noʊn ˈɪʃuː/."
  },
  {
    "id": "phr-eta-fix",
    "phrase": "What's the ETA on the fix?",
    "schoolVsNative": {
      "school": "What time will the repair finish?",
      "native": "What's the ETA on the fix?"
    },
    "meaningES": "¿Cuál es el tiempo estimado de entrega / solución?",
    "explanation": "Pregunta directa por el horario o minutos faltantes para resolver un fallo en producción (ETA = Estimated Time of Arrival).",
    "category": "workplace",
    "exampleEN": "The CNC milling machine motor overheated. What's the ETA on the fix?",
    "exampleES": "El motor de la fresadora CNC se sobrecalentó. ¿Cuál es el tiempo estimado para repararlo?",
    "pronunciationHint": "Pronuncia 'E-T-A': /iː tiː eɪ ɒn ðə fɪks/."
  },
  {
    "id": "phr-escalate",
    "phrase": "We need to escalate this to Tier 3 support",
    "schoolVsNative": {
      "school": "We must send this problem to higher engineers.",
      "native": "We need to escalate this to Tier 3 support."
    },
    "meaningES": "Necesitamos escalar este problema al soporte de Nivel 3",
    "explanation": "Transferir un incidente crítico que sobrepasa los permisos o conocimientos del soporte inicial.",
    "category": "conflict_resolution",
    "exampleEN": "Since local diagnostics didn't resolve the optical link drop, we need to escalate this to Tier 3 support.",
    "exampleES": "Dado que el diagnóstico local no resolvió la caída del enlace óptico, debemos escalar esto a soporte de Nivel 3.",
    "pronunciationHint": "Énfasis en 'escalate': /ˈɛskəleɪt/."
  },
  {
    "id": "phr-outside-scope",
    "phrase": "That's outside our current scope",
    "schoolVsNative": {
      "school": "We cannot do that extra work in this contract.",
      "native": "That's outside our current scope."
    },
    "meaningES": "Eso está fuera de nuestro alcance actual",
    "explanation": "Poner un límite profesional amigable cuando un cliente o jefe pide tareas no contempladas en el plan original.",
    "category": "workplace",
    "exampleEN": "Redesigning the entire battery enclosure is great, but that's outside our current scope for Phase 1.",
    "exampleES": "Rediseñar todo el compartimento de la batería es genial, pero está fuera de nuestro alcance actual para la Fase 1.",
    "pronunciationHint": "Palabra clave 'scope': /aʊtˈsaɪd aʊər ˈkʌrənt skoʊp/."
  },
  {
    "id": "phr-check-bandwidth",
    "phrase": "Let me check our team's bandwidth",
    "schoolVsNative": {
      "school": "I will check if my team has time to work.",
      "native": "Let me check our team's bandwidth."
    },
    "meaningES": "Déjame verificar la disponibilidad / carga de trabajo de nuestro equipo",
    "explanation": "Usar 'bandwidth' (ancho de banda) para referirse a la capacidad de tiempo y energía humana de los ingenieros.",
    "category": "workplace",
    "exampleEN": "I'll check our engineering team's bandwidth for this week and get back to you with a commitment.",
    "exampleES": "Verificaré la disponibilidad de nuestro equipo de ingeniería para esta semana y te respondo con un compromiso.",
    "pronunciationHint": "Término técnico 'bandwidth': /ˈbændwɪdtθ/."
  },
  {
    "id": "phr-trade-off",
    "phrase": "It's a trade-off between weight and cost",
    "schoolVsNative": {
      "school": "It is a compromise of two things.",
      "native": "It's a trade-off between weight and cost."
    },
    "meaningES": "Es un compromiso / un intercambio equilibrado entre dos factores",
    "explanation": "Concepto central de la ingeniería: ceder en un aspecto (ej. costo) para ganar en otro (ej. resistencia térmica).",
    "category": "technical_debate",
    "exampleEN": "Choosing titanium over aluminum is a trade-off between weight reduction and material cost.",
    "exampleES": "Elegir titanio en lugar de aluminio es un compromiso equilibrado entre reducción de peso y costo de material.",
    "pronunciationHint": "Pronuncia 'trade-off': /ˈtreɪd ɒf/."
  },
  {
    "id": "phr-action-item",
    "phrase": "Who owns this action item?",
    "schoolVsNative": {
      "school": "Who is responsible for this task?",
      "native": "Who owns this action item?"
    },
    "meaningES": "¿Quién es el responsable directo de esta tarea?",
    "explanation": "Definir claridad absoluta al cerrar una junta corporativa para que los pendientes no queden flotando.",
    "category": "workplace",
    "exampleEN": "Great sync team. Who owns the action item for updating the AS9100 inspection checklist?",
    "exampleES": "Excelente junta equipo. ¿Quién es el responsable directo de actualizar la lista de cotejo de inspección AS9100?",
    "pronunciationHint": "Enlace: /uː oʊnz ðɪs ˈækʃən ˈaɪtəm/."
  },
  {
    "id": "phr-circle-back",
    "phrase": "Let's circle back to this later",
    "schoolVsNative": {
      "school": "We will talk about this point again later.",
      "native": "Let's circle back to this later."
    },
    "meaningES": "Retomemos esto más adelante",
    "explanation": "Establecer que un punto importante se volverá a analizar cuando existan más datos o concluya otro módulo.",
    "category": "workplace",
    "exampleEN": "Let's circle back to the micro-inverter topology once we receive the thermal test results.",
    "exampleES": "Retomemos la topología del microinversor más adelante una vez que recibamos los resultados de las pruebas térmicas.",
    "pronunciationHint": "Pronuncia 'circle-back': /ˈsɜːrkl bæk/."
  },
  {
    "id": "phr-take-offline",
    "phrase": "Let me take this offline with Sarah",
    "schoolVsNative": {
      "school": "We will talk about this privately outside the meeting.",
      "native": "Let me take this offline with Sarah."
    },
    "meaningES": "Déjame tratar este punto en privado / fuera de la reunión con Sarah",
    "explanation": "Desviar una discusión técnica muy detallada a una llamada de dos personas para no quitar tiempo a los demás asistentes.",
    "category": "small_talk",
    "exampleEN": "This signal integrity detail only affects the PCB layout team; let me take this offline with Sarah after the call.",
    "exampleES": "Este detalle de integridad de señal solo afecta al equipo de diseño de PCB; déjame tratarlo fuera de la reunión con Sarah.",
    "pronunciationHint": "Énfasis en 'offline': /teɪk ðɪs ˌɒfˈlaɪn/."
  },
  {
    "id": "phr-ducks-in-row-audit",
    "phrase": "Let's get our ducks in a row before the audit",
    "schoolVsNative": {
      "school": "We must prepare everything before the audit.",
      "native": "Let's get our ducks in a row before the audit."
    },
    "meaningES": "Pongamos todo perfectamente en orden antes de la auditoría",
    "explanation": "Expresión indispensable en plantas de manufactura para asegurar que los registros, certificaciones e insumos estén listos y verificados.",
    "category": "workplace",
    "exampleEN": "The ISO 13485 inspectors arrive at 9 AM tomorrow, so let's get our ducks in a row tonight.",
    "exampleES": "Los inspectores de ISO 13485 llegan mañana a las 9 AM, así que pongamos todo en perfecto orden esta noche.",
    "pronunciationHint": "Enlace fluido: /ɡɛt ˈaʊər dʌks ɪn ə roʊ/."
  },
  {
    "id": "phr-loop-me-in",
    "phrase": "Can you loop me in on that email thread?",
    "schoolVsNative": {
      "school": "Please send me that email too.",
      "native": "Can you loop me in on that email thread?"
    },
    "meaningES": "¿Puedes incluirme / copias en esa cadena de correos?",
    "explanation": "Dominio diario en corporativos internacionales. 'Loop in' significa dar acceso o visibilidad a alguien en un hilo de trabajo.",
    "category": "workplace",
    "exampleEN": "I hear TSMC is updating the silicon wafer specifications; please loop me in on that email thread.",
    "exampleES": "Escuché que TSMC está actualizando las especificaciones de obleas de silicio; por favor inclúyme en esa cadena de correos.",
    "pronunciationHint": "Pronuncia 'loop me in': /luːp miː ɪn/."
  },
  {
    "id": "phr-showstopper",
    "phrase": "This issue is a showstopper for line 2",
    "schoolVsNative": {
      "school": "This is a very serious problem for line 2.",
      "native": "This issue is a showstopper for line 2."
    },
    "meaningES": "Este problema es crítico / detiene por completo la producción",
    "explanation": "Término técnico de ingeniería y manufactura para un fallo impeditivo que no permite continuar el proceso hasta ser corregido.",
    "category": "technical_debate",
    "exampleEN": "The high-voltage interlock fault is a showstopper for testing the battery pack today.",
    "exampleES": "La falla en el enclavamiento de alto voltaje es un problema crítico que detiene las pruebas del paquete de baterías hoy.",
    "pronunciationHint": "Pronuncia 'show-stopper': /ˈʃoʊˌstɑːpər/."
  },
  {
    "id": "phr-play-by-ear",
    "phrase": "Let's play it by ear depending on the shipment",
    "schoolVsNative": {
      "school": "We will decide later.",
      "native": "Let's play it by ear depending on the shipment."
    },
    "meaningES": "Improvisemos / Tomemos decisiones sobre la marcha según se den los hechos",
    "explanation": "Se usa cuando no se puede fijar un plan estricto debido a variables externas (demoras en aduanas, clima o entregas de componentes).",
    "category": "workplace",
    "exampleEN": "Customs clearance is delayed at Laredo, so let's play it by ear regarding the afternoon assembly shift.",
    "exampleES": "El despacho aduanal se retrasó en Laredo, así que tomemos decisiones sobre la marcha con respecto al turno de ensamble de la tarde.",
    "pronunciationHint": "Enlace nativo: /pleɪ ɪt baɪ ɪər/."
  },
  {
    "id": "phr-touch-base-manager",
    "phrase": "Let me touch base with the plant manager",
    "schoolVsNative": {
      "school": "I will speak with the manager.",
      "native": "Let me touch base with the plant manager."
    },
    "meaningES": "Déjame ponerme en contacto / alinear indicadores brevemente con el gerente",
    "explanation": "Llamada o mensaje corto de sincronización ejecutiva sin necesidad de convocar a una junta formal de 1 hora.",
    "category": "workplace",
    "exampleEN": "I will touch base with the Querétaro plant manager before finalizing the aerospace CNC procurement budget.",
    "exampleES": "Me pondré en contacto brevemente con el gerente de la planta de Querétaro antes de finalizar el presupuesto de compra del CNC aeroespacial.",
    "pronunciationHint": "Ritmo rápido: /tʌtʃ beɪs/."
  },
  {
    "id": "phr-table-the-discussion",
    "phrase": "Let's table this discussion until the next sprint",
    "schoolVsNative": {
      "school": "We will not talk about this now.",
      "native": "Let's table this discussion until the next sprint."
    },
    "meaningES": "Pospongamos este tema / Dejémoslo sobre la mesa para la siguiente iteración",
    "explanation": "En inglés norteamericano de negocios, 'table' significa posponer formalmente un punto de agenda para abordarlo con más datos en la siguiente reunión.",
    "category": "meetings",
    "exampleEN": "Since the thermal simulation results aren't finalized, let's table this discussion until tomorrow's standup.",
    "exampleES": "Dado que los resultados de la simulación térmica no están finalizados, pospongamos este tema hasta el standup de mañana.",
    "pronunciationHint": "Énfasis suave en 'table': /ˈteɪbəl ðɪs dɪˈskʌʃən/."
  },
  {
    "id": "phr-hard-stop",
    "phrase": "I have a hard stop at 3:00 PM",
    "schoolVsNative": {
      "school": "I must leave at 3:00 PM.",
      "native": "I have a hard stop at 3:00 PM."
    },
    "meaningES": "Tengo que retirarme puntualmente a las 3:00 PM (compromiso inamovible)",
    "explanation": "Frase estándar en corporativos y reuniones técnicas para avisar con profesionalismo que no podrás quedarte ni un minuto después de la hora señalada.",
    "category": "meetings",
    "exampleEN": "I have a hard stop at 3:00 PM because the client in Detroit is joining the telemetry review call.",
    "exampleES": "Tengo un corte inamovible a las 3:00 PM porque el cliente en Detroit se unirá a la llamada de revisión de telemetría.",
    "pronunciationHint": "Vocal clara en 'hard': /hɑːrd stɑːp/."
  },
  {
    "id": "phr-unblock-team",
    "phrase": "What do you need from me to get unblocked?",
    "schoolVsNative": {
      "school": "How can I help you finish?",
      "native": "What do you need from me to get unblocked?"
    },
    "meaningES": "¿Qué necesitas de mi parte para destrabar tu avance?",
    "explanation": "Pregunta central en la cultura Agile/Scrum. Muestra liderazgo orientado al servicio eliminando cuellos de botella para ingenieros y desarrolladores.",
    "category": "meetings",
    "exampleEN": "If the firmware signing key is delayed, let me know what you need to get unblocked today.",
    "exampleES": "Si la clave de firma del firmware está demorada, avísame qué necesitas de mi parte para destrabarte hoy.",
    "pronunciationHint": "Énfasis en 'unblocked': /ʌnˈblɑːkt/."
  },
  {
    "id": "phr-bring-to-table",
    "phrase": "What does this new vendor bring to the table?",
    "schoolVsNative": {
      "school": "What advantages does this vendor have?",
      "native": "What does this new vendor bring to the table?"
    },
    "meaningES": "¿Qué valor agregado o propuesta diferencial ofrece este proveedor?",
    "explanation": "Expresión indispensable en juntas de evaluación técnica de proveedores, nearshoring o compras de maquinaria especializada.",
    "category": "meetings",
    "exampleEN": "Before switching from Fanuc to KUKA, what distinct capabilities do they bring to the table for our assembly line?",
    "exampleES": "Antes de cambiar de Fanuc a KUKA, ¿qué ventajas operativas diferenciales aportan para nuestra línea de ensamble?",
    "pronunciationHint": "Unión natural: /brɪŋ tuː ðə ˈteɪbəl/."
  },
  {
    "id": "phr-park-it",
    "phrase": "Let's park that topic in the parking lot for now",
    "schoolVsNative": {
      "school": "Do not talk about that now.",
      "native": "Let's park that in the parking lot for now."
    },
    "meaningES": "Guardemos ese punto en el registro de pendientes para no desviarnos de la agenda",
    "explanation": "Metáfora del 'parking lot' en juntas ejecutivas: evita que una conversación técnica profunda descarrile el objetivo principal de la reunión.",
    "category": "meetings",
    "exampleEN": "The CAN bus baud rate debate is important, but let's park that topic in the parking lot so we can approve the wire harness schematic.",
    "exampleES": "El debate de velocidad del bus CAN es importante, pero guardémoslo en pendientes para poder aprobar el diagrama del arnés eléctrico.",
    "pronunciationHint": "Ritmo continuo: /ˈpɑːrkɪŋ lɑːt/."
  },
  {
    "id": "phr-drill-down",
    "phrase": "Let's drill down into the sensor telemetry data",
    "schoolVsNative": {
      "school": "Let's look at the details.",
      "native": "Let's drill down into the sensor telemetry data."
    },
    "meaningES": "Profundicemos detalladamente en los datos de telemetría de los sensores",
    "explanation": "Término analítico usado para pasar de un resumen general de alto nivel a los registros milimétricos y causas microscópicas de un fenómeno.",
    "category": "meetings",
    "exampleEN": "Overall yield looks acceptable at 94%, but let's drill down into the thermal chamber logs for batch 402.",
    "exampleES": "El rendimiento general parece aceptable en 94%, pero profundicemos en los registros de la cámara térmica del lote 402.",
    "pronunciationHint": "Vocal prolongada: /drɪl daʊn/."
  },
  {
    "id": "phr-sync-up",
    "phrase": "Can we sync up for five minutes after the demo?",
    "schoolVsNative": {
      "school": "Can we talk for five minutes?",
      "native": "Can we sync up for five minutes after the demo?"
    },
    "meaningES": "¿Podemos sincronizarnos cinco minutos después de la demostración?",
    "explanation": "El término 'sync up' es el estándar moderno en tecnología e ingeniería para alinearse rápidamente de forma bilateral.",
    "category": "meetings",
    "exampleEN": "Can we sync up for five minutes to align on the client's revised tolerances for the titanium bracket?",
    "exampleES": "¿Podemos sincronizarnos cinco minutos para acordar las tolerancias modificadas del soporte de titanio?",
    "pronunciationHint": "Unión rápida: /sɪŋk ʌp/."
  },
  {
    "id": "phr-bottom-line",
    "phrase": "What is the bottom line on the battery cycle degradation?",
    "schoolVsNative": {
      "school": "What is the most important conclusion?",
      "native": "What is the bottom line on the battery cycle degradation?"
    },
    "meaningES": "¿Cuál es la conclusión fundamental / el dato definitivo sobre la degradación de la batería?",
    "explanation": "Proviene de la última línea del balance contable. En ingeniería se usa para pedir la conclusión indispensable sin rodeos técnicos innecesarios.",
    "category": "meetings",
    "exampleEN": "Forget the 80-page whitepaper for a second; what's the bottom line on whether these cells survive 1,500 fast-charge cycles?",
    "exampleES": "Olvidemos el reporte de 80 páginas por un momento; ¿cuál es la conclusión clave sobre si estas celdas sobreviven 1,500 ciclos de carga rápida?",
    "pronunciationHint": "Énfasis marcado: /ˌbɑːtəm ˈlaɪn/."
  },
  {
    "id": "phr-move-needle",
    "phrase": "Does this optimization really move the needle?",
    "schoolVsNative": {
      "school": "Does this change make a significant difference?",
      "native": "Does this optimization really move the needle?"
    },
    "meaningES": "¿Esta optimización realmente genera un impacto medible y significativo?",
    "explanation": "Metáfora del dial de un velocímetro o manómetro. Se usa para cuestionar si un esfuerzo técnico justifica el tiempo invertido o si es insignificante.",
    "category": "meetings",
    "exampleEN": "Saving 12 milliseconds on image inference is nice, but does it move the needle for the robotic pick-and-place cycle time?",
    "exampleES": "Ahorrar 12 milisegundos en inferencia de imagen es bueno, pero ¿realmente marca una diferencia sustancial en el tiempo de ciclo del robot?",
    "pronunciationHint": "Frase fluida: /muːv ðə ˈniːdəl/."
  },
  {
    "id": "phr-recap",
    "phrase": "Let's do a quick recap before we adjourn",
    "schoolVsNative": {
      "school": "Let us repeat the summary before ending.",
      "native": "Let's do a quick recap before we adjourn."
    },
    "meaningES": "Hagamos una breve recapitulación de acuerdos antes de dar por terminada la sesión",
    "explanation": "'Recap' (recapitulation) y 'adjourn' (cerrar sesión formalmente) son términos ejecutivos de alto calibre para concluir juntas con claridad de compromisos.",
    "category": "meetings",
    "exampleEN": "Let's do a quick recap of the tooling delivery dates before we adjourn today's engineering review.",
    "exampleES": "Hagamos una breve recapitulación de las fechas de entrega del herramental antes de concluir la revisión de ingeniería de hoy.",
    "pronunciationHint": "Acento en 'recap': /ˈriːkæp/."
  },
  {
    "id": "phr-on-the-same-page",
    "phrase": "Just to ensure we are all on the same page",
    "schoolVsNative": {
      "school": "To be sure we understand the same thing.",
      "native": "Just to ensure we are all on the same page."
    },
    "meaningES": "Solo para asegurarnos de que todos estamos en la misma sintonía / entendemos lo mismo",
    "explanation": "Frase cortés y efectiva de alineación que evita asumir acuerdos tácitos antes de iniciar la ejecución de un diseño.",
    "category": "meetings",
    "exampleEN": "Just to ensure we are all on the same page, the thermal envelope threshold is strictly capped at 85°C.",
    "exampleES": "Solo para asegurar que todos estamos en la misma sintonía, el umbral de envolvente térmica está topado estrictamente a 85°C.",
    "pronunciationHint": "Ritmo parejo: /ɑːn ðə seɪm peɪdʒ/."
  },
  {
    "id": "phr-open-floor",
    "phrase": "I'd like to open the floor to questions from the field team",
    "schoolVsNative": {
      "school": "Now you can ask questions.",
      "native": "I'd like to open the floor to questions from the field team."
    },
    "meaningES": "Me gustaría ceder la palabra / abrir el espacio para preguntas del equipo en campo",
    "explanation": "Fórmula formal y respetuosa para invitar a la participación técnica durante presentaciones de proyectos o revisiones de diseño.",
    "category": "meetings",
    "exampleEN": "Having demonstrated the autonomous navigation stack, I'd like to open the floor to questions from the field team.",
    "exampleES": "Habiendo demostrado el paquete de navegación autónoma, cedo la palabra para preguntas del equipo de campo.",
    "pronunciationHint": "Unión: /ˈoʊpən ðə flɔːr/."
  },
  {
    "id": "phr-wrap-up",
    "phrase": "Let's wrap this up so everyone can grab lunch",
    "schoolVsNative": {
      "school": "Let's finish the meeting now.",
      "native": "Let's wrap this up so everyone can grab lunch."
    },
    "meaningES": "Vayamos concluyendo para que todos puedan ir a comer",
    "explanation": "'Wrap up' es la manera natural de indicar que se están tocando los puntos finales de una reunión.",
    "category": "meetings",
    "exampleEN": "We have covered all seven safety non-conformances; let's wrap this up and distribute the sign-off sheet.",
    "exampleES": "Hemos cubierto las siete no conformidades de seguridad; vayamos concluyendo y distribuyamos la hoja de firmas.",
    "pronunciationHint": "Suave en 'wrap': /ræp ɪt ʌp/."
  },
  {
    "id": "phr-touch-upon",
    "phrase": "I'd also like to briefly touch upon the supply chain lead times",
    "schoolVsNative": {
      "school": "I want to speak about lead times too.",
      "native": "I'd also like to briefly touch upon the supply chain lead times."
    },
    "meaningES": "También quisiera abordar brevemente los tiempos de entrega de la cadena de suministro",
    "explanation": "'Touch upon' indica que se mencionará un tema complementario de forma concisa sin desviarse excesivamente.",
    "category": "meetings",
    "exampleEN": "Before we inspect the PCB layout, I'd like to briefly touch upon the microchip lead times from Taiwan.",
    "exampleES": "Antes de inspeccionar el diseño de la PCB, quisiera tocar brevemente los tiempos de entrega de microchips desde Taiwán.",
    "pronunciationHint": "Ligado natural: /tʌtʃ əˈpɑːn/."
  },
  {
    "id": "phr-call-it-a-day",
    "phrase": "We've resolved the main build errors; let's call it a day",
    "schoolVsNative": {
      "school": "Let's stop working for today.",
      "native": "We've resolved the main build errors; let's call it a day."
    },
    "meaningES": "Hemos resuelto los errores principales; demos por terminada la jornada",
    "explanation": "Expresión idiomática para finalizar el trabajo tras una jornada intensa y productiva de depuración o laboratorio.",
    "category": "meetings",
    "exampleEN": "All twenty motor controllers are responding correctly over CANopen; let's call it a day and run endurance tests tomorrow.",
    "exampleES": "Los veinte controladores de motor están respondiendo correctamente por CANopen; demos por concluido el día y corramos pruebas de resistencia mañana.",
    "pronunciationHint": "Ritmo: /kɔːl ɪt ə deɪ/."
  },
  {
    "id": "phr-action-oriented",
    "phrase": "Let's keep our meeting notes strictly action-oriented",
    "schoolVsNative": {
      "school": "Write only what people will do.",
      "native": "Let's keep our meeting notes strictly action-oriented."
    },
    "meaningES": "Mantengamos las minutas enfocadas estrictamente en compromisos de acción y responsables",
    "explanation": "Principio de ingeniería de alta eficiencia: evitar notas narrativas largas y registrar responsable, fecha límite y entregable concreto.",
    "category": "meetings",
    "exampleEN": "To accelerate our AS9100 prep, let's keep our meeting notes strictly action-oriented with clear DRI assignments.",
    "exampleES": "Para acelerar nuestra preparación AS9100, mantengamos las minutas enfocadas estrictamente en acciones con responsables individuales asignados.",
    "pronunciationHint": "Fluidez: /ˈækʃən ˌɔːriɛntɪd/."
  },
  {
    "id": "phr-pinch-point",
    "phrase": "The cooling pump throughput is the real pinch point",
    "schoolVsNative": {
      "school": "The cooling pump is the slowest part.",
      "native": "The cooling pump throughput is the real pinch point."
    },
    "meaningES": "El caudal de la bomba de enfriamiento es el verdadero punto crítico / cuello de botella",
    "explanation": "'Pinch point' es un término técnico que describe el punto exacto donde el flujo, la presión o el proceso se estrangula y limita todo el sistema.",
    "category": "problem_solving",
    "exampleEN": "Our batch processing isn't limited by CPU cores; the disk I/O write speed is the pinch point.",
    "exampleES": "Nuestro procesamiento por lotes no está limitado por los núcleos del CPU; la velocidad de escritura de disco es el punto de estrangulamiento.",
    "pronunciationHint": "Claro en 'pinch': /ˈpɪntʃ pɔɪnt/."
  },
  {
    "id": "phr-silver-bullet",
    "phrase": "There is no silver bullet for electromagnetic interference",
    "schoolVsNative": {
      "school": "There is no easy and magical solution.",
      "native": "There is no silver bullet for electromagnetic interference."
    },
    "meaningES": "No existe una solución mágica o milagrosa para la interferencia electromagnética",
    "explanation": "Metáfora de la 'bala de plata'. Se usa con frecuencia en ingeniería para recordar que resolver problemas complejos requiere capas múltiples de diseño.",
    "category": "problem_solving",
    "exampleEN": "Shielding cables helps, but there's no silver bullet for high-frequency EMI; you also need proper ground planes and ferrites.",
    "exampleES": "Blindar cables ayuda, pero no hay soluciones mágicas para EMI de alta frecuencia; también requieres planos de tierra adecuados y ferritas.",
    "pronunciationHint": "Acento: /ˈsɪlvər ˈbʊlɪt/."
  },
  {
    "id": "phr-iron-out-kinks",
    "phrase": "We need a pilot run to iron out the kinks",
    "schoolVsNative": {
      "school": "We need a test to fix small problems.",
      "native": "We need a pilot run to iron out the kinks."
    },
    "meaningES": "Necesitamos una corrida piloto para pulir asperezas y corregir pequeños fallos",
    "explanation": "Metáfora de planchar las arrugas de una tela. En manufactura y nearshoring, describe el proceso de calibrar herramientas y desbastar detalles iniciales.",
    "category": "problem_solving",
    "exampleEN": "The automated laser cutter works, but we need two more shifts to iron out the micro-calibration kinks.",
    "exampleES": "La cortadora láser automática funciona, pero necesitamos dos turnos más para pulir los detalles de microcalibración.",
    "pronunciationHint": "Ligadura: /ˈaɪərn aʊt ðə kɪŋks/."
  },
  {
    "id": "phr-back-to-square-one",
    "phrase": "If the shear test fails, we're back to square one",
    "schoolVsNative": {
      "school": "If the test fails, we must start from the beginning.",
      "native": "If the shear test fails, we're back to square one."
    },
    "meaningES": "Si la prueba de esfuerzo cortante falla, volvemos al punto de partida / foja cero",
    "explanation": "Expresión idiomática para indicar que un fallo invalida las hipótesis previas y obliga a replantear el diseño desde la base.",
    "category": "problem_solving",
    "exampleEN": "If the composite adhesive doesn't withstand cryogenic temperatures, we're back to square one with material selection.",
    "exampleES": "Si el adhesivo del compuesto no resiste temperaturas criogénicas, volvemos a foja cero con la selección del material.",
    "pronunciationHint": "Énfasis: /bæk tuː skwɛər wʌn/."
  },
  {
    "id": "phr-rule-out",
    "phrase": "We can definitively rule out power supply instability",
    "schoolVsNative": {
      "school": "We know the power supply is not the problem.",
      "native": "We can definitively rule out power supply instability."
    },
    "meaningES": "Podemos descartar definitivamente la inestabilidad de la fuente de poder",
    "explanation": "'Rule out' es el verbo indispensable en la investigación científica y diagnóstico de fallas (RCA) para eliminar hipótesis de raíz.",
    "category": "problem_solving",
    "exampleEN": "After verifying ripple noise below 5mV with the oscilloscope, we can rule out the switching regulator as the cause of rebooting.",
    "exampleES": "Tras verificar ruido de rizo menor a 5mV con el osciloscopio, podemos descartar el regulador conmutado como causa de reinicios.",
    "pronunciationHint": "Enlace fluido: /ruːl aʊt/."
  },
  {
    "id": "phr-troubleshoot-on-the-fly",
    "phrase": "Our field engineers had to troubleshoot on the fly",
    "schoolVsNative": {
      "school": "They fixed problems while things were running.",
      "native": "Our field engineers had to troubleshoot on the fly."
    },
    "meaningES": "Nuestros ingenieros de campo tuvieron que diagnosticar y resolver fallas en tiempo real sobre la marcha",
    "explanation": "'On the fly' denota resolución de problemas bajo presión operativa mientras la planta o el satélite se encuentra en operación activa.",
    "category": "problem_solving",
    "exampleEN": "When the primary telemetry downlink dropped during the engine static fire, the avionics team had to troubleshoot on the fly.",
    "exampleES": "Cuando el enlace de telemetría primario cayó durante el encendido estático del motor, el equipo de aviónica tuvo que resolver sobre la marcha.",
    "pronunciationHint": "Ritmo rápido: /ˈtrʌbəlʃuːt ɑːn ðə flaɪ/."
  },
  {
    "id": "phr-stopgap-solution",
    "phrase": "This thermal bypass is strictly a stopgap solution",
    "schoolVsNative": {
      "school": "This fix is only temporary.",
      "native": "This thermal bypass is strictly a stopgap solution."
    },
    "meaningES": "Este desvío térmico es estrictamente una solución provisional / un parche temporal",
    "explanation": "Término técnico de ingeniería para diferenciar una medida de contingencia inmediata de una corrección estructural permanente.",
    "category": "problem_solving",
    "exampleEN": "Applying external cooling fans is a stopgap solution; the long-term fix requires redesigning the liquid cooling jacket.",
    "exampleES": "Colocar ventiladores externos es una solución provisional; la solución a largo plazo exige rediseñar la camisa de refrigeración líquida.",
    "pronunciationHint": "Acento: /ˈstɑːpɡæp səˈluːʃən/."
  },
  {
    "id": "phr-replicate-bug",
    "phrase": "Were you able to replicate the defect on the bench?",
    "schoolVsNative": {
      "school": "Could you make the error happen again?",
      "native": "Were you able to replicate the defect on the bench?"
    },
    "meaningES": "¿Pudiste reproducir el defecto en el banco de pruebas?",
    "explanation": "En control de calidad de software y hardware, la reproducibilidad ('replication') es el primer requisito para emitir un parche validado.",
    "category": "problem_solving",
    "exampleEN": "Before sending the warranty report to Bosch, were you able to replicate the intermittent CAN timeout on the test bench?",
    "exampleES": "Antes de enviar el reporte de garantía a Bosch, ¿pudiste reproducir el timeout intermitente de CAN en el banco de pruebas?",
    "pronunciationHint": "Énfasis en 'replicate': /ˈrɛplɪkeɪt/."
  },
  {
    "id": "phr-fishbone-diagram",
    "phrase": "Let's map out the failure modes using an Ishikawa fishbone",
    "schoolVsNative": {
      "school": "Let's draw a cause and effect diagram.",
      "native": "Let's map out the failure modes using an Ishikawa fishbone."
    },
    "meaningES": "Mapeemos los modos de falla utilizando un diagrama de espina de pescado Ishikawa",
    "explanation": "Herramienta nuclear de Lean Manufacturing y Seis Sigma para clasificar causas raíces en Métodos, Mano de obra, Materiales, Maquinaria y Medición.",
    "category": "problem_solving",
    "exampleEN": "To understand the wafer delamination issue, let's assemble the team and construct a detailed fishbone diagram.",
    "exampleES": "Para comprender la delaminación de las obleas, reunamos al equipo y construyamos un diagrama de espina de pescado detallado.",
    "pronunciationHint": "Pronunciación clara: /ˈfɪʃboʊn ˈdaɪəɡræm/."
  },
  {
    "id": "phr-five-whys",
    "phrase": "We need to run a 5-Whys exercise to find the root cause",
    "schoolVsNative": {
      "school": "We need to ask why five times.",
      "native": "We need to run a 5-Whys exercise to find the root cause."
    },
    "meaningES": "Debemos ejecutar un ejercicio de los 5 Porqués para dar con la causa raíz",
    "explanation": "Metodología clásica de Toyota Production System (TPS) empleada globalmente en plantas de manufactura para perforar más allá de los síntomas superficiales.",
    "category": "problem_solving",
    "exampleEN": "Don't just blame the operator; run a rigorous 5-Whys exercise to discover why the interlock sensor failed to trip.",
    "exampleES": "No culpes al operador; ejecuta un ejercicio riguroso de 5 Porqués para descubrir por qué falló el sensor de enclavamiento.",
    "pronunciationHint": "Ligado: /faɪv waɪz/."
  },
  {
    "id": "phr-single-point-of-failure",
    "phrase": "That unmonitored switch is a single point of failure (SPOF)",
    "schoolVsNative": {
      "school": "If that switch breaks, everything breaks.",
      "native": "That unmonitored switch is a single point of failure."
    },
    "meaningES": "Ese conmutador sin redundancia es un punto único de falla (SPOF)",
    "explanation": "Concepto crítico de confiabilidad de sistemas (aerospacial, nuclear y centros de datos) que describe un componente cuya falla colapsa todo el sistema.",
    "category": "problem_solving",
    "exampleEN": "Under FAA safety guidelines, the primary flight computer cannot rely on a single point of failure for sensor arbitration.",
    "exampleES": "Bajo las directrices de seguridad de la FAA, la computadora de vuelo principal no puede depender de un punto único de falla para el arbitraje de sensores.",
    "pronunciationHint": "Sigla: /spɒf/ o /ˈsɪŋɡəl pɔɪnt əv ˈfeɪljər/."
  },
  {
    "id": "phr-intermittent-glitch",
    "phrase": "It's an intermittent glitch that only occurs at peak thermal load",
    "schoolVsNative": {
      "school": "It is a bug that appears sometimes when it is hot.",
      "native": "It's an intermittent glitch that only occurs at peak thermal load."
    },
    "meaningES": "Es una anomalía intermitente que solo ocurre bajo carga térmica máxima",
    "explanation": "'Intermittent glitch' es una de las fallas más desafiantes en ingeniería eléctrica y embebida, requiriendo pruebas de estrés ambiental (HALT/HASS).",
    "category": "problem_solving",
    "exampleEN": "The CAN bus packet drops aren't constant; they're an intermittent glitch triggered when inverter temperature exceeds 75°C.",
    "exampleES": "Las pérdidas de paquetes del bus CAN no son constantes; son una anomalía intermitente detonada cuando el inversor supera 75°C.",
    "pronunciationHint": "Acento: /ˌɪntərˈmɪtənt ɡlɪtʃ/."
  },
  {
    "id": "phr-band-aid-solution",
    "phrase": "Restarting the PLC is just a band-aid solution",
    "schoolVsNative": {
      "school": "Restarting the machine does not solve the real problem.",
      "native": "Restarting the PLC is just a band-aid solution."
    },
    "meaningES": "Reiniciar el PLC es solo un parche superficial / una curita que no resuelve el fondo",
    "explanation": "Metáfora universal para advertir que una acción solo enmascara el síntoma sin resolver la causa subyacente del error de diseño.",
    "category": "problem_solving",
    "exampleEN": "Power-cycling the robotic controller every morning is a band-aid solution; we must isolate the memory leak in the driver.",
    "exampleES": "Reiniciar el controlador robótico cada mañana es solo una curita; debemos aislar la fuga de memoria en el controlador.",
    "pronunciationHint": "Claro en 'band-aid': /ˈbændeɪd səˈluːʃən/."
  },
  {
    "id": "phr-postmortem-review",
    "phrase": "We will conduct a blameless postmortem on Friday",
    "schoolVsNative": {
      "school": "We will meet to discuss the failure without blaming people.",
      "native": "We will conduct a blameless postmortem on Friday."
    },
    "meaningES": "Llevaremos a cabo un análisis postmortem sin culpables el viernes",
    "explanation": "Práctica de ingeniería moderna (SRE / DevOps) donde las fallas de producción se analizan enfocándose en vulnerabilidades del sistema y procesos, no en culpar individuos.",
    "category": "problem_solving",
    "exampleEN": "Following yesterday's substation outage, we will conduct a blameless postmortem to improve our SCADA failover scripts.",
    "exampleES": "Tras la caída de la subestación de ayer, realizaremos un postmortem sin culpables para mejorar nuestros scripts de conmutación SCADA.",
    "pronunciationHint": "Acento en 'postmortem': /poʊstˈmɔːrtəm/."
  },
  {
    "id": "phr-containment-action",
    "phrase": "We implemented an immediate containment action to quarantine the lot",
    "schoolVsNative": {
      "school": "We separated the bad products right away.",
      "native": "We implemented an immediate containment action to quarantine the lot."
    },
    "meaningES": "Implementamos una acción de contención inmediata para poner el lote en cuarentena",
    "explanation": "Fase D3 de la metodología de resolución de problemas 8D en manufactura automotriz y aeroespacial para evitar que piezas no conformes lleguen al cliente.",
    "category": "problem_solving",
    "exampleEN": "As part of our 8D protocol, our immediate containment action was to freeze all outgoing pallet shipments from Warehouse C.",
    "exampleES": "Como parte de nuestro protocolo 8D, la acción de contención inmediata fue congelar todos los envíos de tarimas desde el Almacén C.",
    "pronunciationHint": "Ritmo: /kənˈteɪnmənt ˈækʃən/."
  },
  {
    "id": "phr-bottleneck-analysis",
    "phrase": "The throughput bottleneck lies in the automated optical inspection (AOI)",
    "schoolVsNative": {
      "school": "The slowest machine is the camera inspector.",
      "native": "The throughput bottleneck lies in the automated optical inspection (AOI)."
    },
    "meaningES": "El cuello de botella de rendimiento se encuentra en la inspección óptica automatizada (AOI)",
    "explanation": "Análisis de capacidad y teoría de restricciones (TOC) para maximizar la tasa de producción diaria en líneas de ensamble de tarjetas electrónicas.",
    "category": "problem_solving",
    "exampleEN": "Surface-mount placement is operating at 98% efficiency, so the throughput bottleneck lies strictly in the AOI station.",
    "exampleES": "La colocación superficial opera al 98% de eficiencia, por lo que el cuello de botella radica estrictamente en la estación AOI.",
    "pronunciationHint": "Énfasis: /ˈbɑːtəlˌnɛk əˈnæləsɪs/."
  },
  {
    "id": "phr-take-ownership",
    "phrase": "I'll take ownership of the environmental compliance filing",
    "schoolVsNative": {
      "school": "I will be responsible for that document.",
      "native": "I'll take ownership of the environmental compliance filing."
    },
    "meaningES": "Asumo el liderazgo y la responsabilidad total del trámite de cumplimiento ambiental",
    "explanation": "'Take ownership' denota proactividad, rendición de cuentas (accountability) y liderazgo autónomo sin necesidad de supervisión constante.",
    "category": "soft_skills",
    "exampleEN": "You don't need to chase the sub-contractors; I'll take full ownership of the cleanroom particle certification.",
    "exampleES": "No tienes que perseguir a los subcontratistas; yo asumo la responsabilidad total de la certificación de partículas del cuarto limpio.",
    "pronunciationHint": "Unión natural: /teɪk ˈoʊnərʃɪp/."
  },
  {
    "id": "phr-manage-expectations",
    "phrase": "We need to manage customer expectations regarding the silicon lead time",
    "schoolVsNative": {
      "school": "We must tell the customer they may wait longer.",
      "native": "We need to manage customer expectations regarding the silicon lead time."
    },
    "meaningES": "Debemos gestionar las expectativas del cliente respecto a los plazos de entrega de los chips",
    "explanation": "Habilidad blanda ejecutiva clave para mantener relaciones transparentes con clientes sin generar falsas promesas que dañen la confianza.",
    "category": "soft_skills",
    "exampleEN": "Given global wafer packaging constraints, we need to proactively manage expectations before promising Q3 deliveries.",
    "exampleES": "Dadas las restricciones globales de empaquetado de obleas, debemos gestionar las expectativas antes de prometer entregas en el 3er trimestre.",
    "pronunciationHint": "Ritmo fluido: /ˈmænɪdʒ ˌɛkspɛkˈteɪʃənz/."
  },
  {
    "id": "phr-give-props",
    "phrase": "Props to the firmware team for tracking down that race condition",
    "schoolVsNative": {
      "school": "Congratulations to the firmware team.",
      "native": "Props to the firmware team for tracking down that race condition."
    },
    "meaningES": "Reconocimiento y felicitaciones al equipo de firmware por dar con esa condición de carrera",
    "explanation": "'Props' (proper respect) es una forma moderna, colegiada y auténtica de reconocer públicamente el esfuerzo técnico extraordinario de colegas.",
    "category": "soft_skills",
    "exampleEN": "Props to the robotics team for deploying the safety update over the weekend without disrupting the assembly line.",
    "exampleES": "Reconocimiento al equipo de robótica por desplegar la actualización de seguridad el fin de semana sin interrumpir la línea.",
    "pronunciationHint": "Enérgico: /prɑːps tuː/."
  },
  {
    "id": "phr-constructive-criticism",
    "phrase": "Please take this code review as constructive feedback",
    "schoolVsNative": {
      "school": "Do not be angry about my corrections.",
      "native": "Please take this code review as constructive feedback."
    },
    "meaningES": "Por favor toma esta revisión de código como retroalimentación constructiva para mejorar",
    "explanation": "Frase fundamental en ingeniería de software y diseño para despersonalizar las correcciones y fomentar una cultura de excelencia técnica colectiva.",
    "category": "soft_skills",
    "exampleEN": "My notes on your finite element mesh density are purely constructive feedback to prevent divergent solver iterations.",
    "exampleES": "Mis observaciones sobre la densidad de malla de elementos finitos son retroalimentación constructiva para evitar divergencias del solucionador.",
    "pronunciationHint": "Claro en 'constructive': /kənˈstrʌktɪv ˈfiːdbæk/."
  },
  {
    "id": "phr-lead-by-example",
    "phrase": "Safety culture only works if supervisors lead by example",
    "schoolVsNative": {
      "school": "Supervisors must follow the rules first.",
      "native": "Safety culture only works if supervisors lead by example."
    },
    "meaningES": "La cultura de seguridad solo funciona si los supervisores predican con el ejemplo",
    "explanation": "Principio de liderazgo industrial: el comportamiento observable de los líderes define el estándar real de cumplimiento en planta.",
    "category": "soft_skills",
    "exampleEN": "Whether it's wearing ESD heel straps or safety goggles, supervisors must always lead by example in the cleanroom.",
    "exampleES": "Ya sea usando taloneras antiestáticas o lentes de seguridad, los supervisores siempre deben predicar con el ejemplo en el cuarto limpio.",
    "pronunciationHint": "Fluidez: /liːd baɪ ɪɡˈzæmpəl/."
  },
  {
    "id": "phr-empower-team",
    "phrase": "We need to empower shop-floor operators to halt the line",
    "schoolVsNative": {
      "school": "We should give workers permission to stop machines.",
      "native": "We need to empower shop-floor operators to halt the line."
    },
    "meaningES": "Debemos empoderar a los operadores de piso para detener la línea si detectan un defecto",
    "explanation": "Referencia al sistema Andon de Toyota. Otorga autonomía y confianza a los colaboradores para priorizar la calidad total sobre la velocidad.",
    "category": "soft_skills",
    "exampleEN": "Empowering line technicians to trigger an Andon cord pull has dropped our chassis weld defect rate by 40%.",
    "exampleES": "Empoderar a los técnicos de línea para activar el cordón Andon ha reducido nuestra tasa de defectos de soldadura de chasis en un 40%.",
    "pronunciationHint": "Acento: /ɪmˈpaʊər ðə tiːm/."
  },
  {
    "id": "phr-cross-functional-alignment",
    "phrase": "We achieved cross-functional alignment between design and tooling",
    "schoolVsNative": {
      "school": "Both teams agreed on the plan.",
      "native": "We achieved cross-functional alignment between design and tooling."
    },
    "meaningES": "Logramos alineación interfuncional entre el equipo de diseño y el de herramental",
    "explanation": "Habilidad esencial en corporativos globales donde ingeniería de producto, manufactura, finanzas y calidad deben marchar coordinados.",
    "category": "soft_skills",
    "exampleEN": "Achieving cross-functional alignment early prevented costly tooling revisions for the magnesium die-cast housing.",
    "exampleES": "Lograr alineación interfuncional temprana evitó costosas modificaciones de herramental para la carcasa de magnesio inyectado.",
    "pronunciationHint": "Estructurado: /krɔːs ˈfʌŋkʃənəl əˈlaɪnmənt/."
  },
  {
    "id": "phr-play-devils-advocate",
    "phrase": "Allow me to play devil's advocate regarding this battery chemistry",
    "schoolVsNative": {
      "school": "I will argue the other side.",
      "native": "Allow me to play devil's advocate regarding this battery chemistry."
    },
    "meaningES": "Permítanme hacer de abogado del diablo respecto a esta química de batería",
    "explanation": "Técnica deliberada para desafiar el pensamiento de grupo (groupthink) y evaluar los riesgos ocultos o peores escenarios de una decisión técnica.",
    "category": "soft_skills",
    "exampleEN": "Allow me to play devil's advocate: what happens if cobalt prices surge by 200% before our cell plant opens in Coahuila?",
    "exampleES": "Permítanme hacer de abogado del diablo: ¿qué sucede si los precios del cobalto suben 200% antes de abrir nuestra planta de celdas en Coahuila?",
    "pronunciationHint": "Acento en 'devil': /ˈdɛvəlz ˈædvəkət/."
  },
  {
    "id": "phr-bridge-the-gap",
    "phrase": "Our job is to bridge the gap between academic research and production",
    "schoolVsNative": {
      "school": "We connect school theories with real manufacturing.",
      "native": "Our job is to bridge the gap between academic research and production."
    },
    "meaningES": "Nuestra labor es cerrar la brecha entre la investigación académica y la manufactura en serie",
    "explanation": "Describe el proceso de transferencia tecnológica y desarrollo de prototipos (TRL 4 a 8) en industrias de frontera.",
    "category": "soft_skills",
    "exampleEN": "Nearshoring engineering centers serve to bridge the gap between advanced silicon design and high-volume test packaging.",
    "exampleES": "Los centros de ingeniería de nearshoring sirven para cerrar la brecha entre el diseño de chips y el empaquetado y prueba masiva.",
    "pronunciationHint": "Enlace: /brɪdʒ ðə ɡæp/."
  },
  {
    "id": "phr-walk-the-talk",
    "phrase": "If we preach quality first, management must walk the talk",
    "schoolVsNative": {
      "school": "Leaders must do what they say.",
      "native": "If we preach quality first, management must walk the talk."
    },
    "meaningES": "Si promulgamos la calidad primero, la dirección debe respaldar sus palabras con hechos",
    "explanation": "Expresión idiomática para exigir congruencia ética y operativa entre el discurso corporativo y las decisiones reales de presupuesto y tiempos.",
    "category": "soft_skills",
    "exampleEN": "Walking the talk means refusing to ship an uncalibrated turbine rotor, even if it threatens this quarter's delivery bonus.",
    "exampleES": "Respaldar las palabras con hechos significa negarse a enviar un rotor de turbina sin calibrar, aun si pone en riesgo el bono del trimestre.",
    "pronunciationHint": "Rima interna: /wɔːk ðə tɔːk/."
  },
  {
    "id": "phr-touchy-subject",
    "phrase": "Resource allocation between hardware and software is a touchy subject",
    "schoolVsNative": {
      "school": "This topic makes people emotional.",
      "native": "Resource allocation is a touchy subject."
    },
    "meaningES": "La asignación de recursos es un tema delicado / espinoso",
    "explanation": "Reconoce con tacto y diplomacia que un tema genera sensibilidades políticas entre departamentos antes de abordarlo formalmente.",
    "category": "soft_skills",
    "exampleEN": "Tooling budget cuts are always a touchy subject, so prepare your productivity ROI calculations before meeting finance.",
    "exampleES": "Los recortes de presupuesto de herramental son siempre un tema delicado, así que prepara tus cálculos de ROI antes de ver a finanzas.",
    "pronunciationHint": "Claro: /ˈtʌtʃi ˈsʌbdʒɪkt/."
  },
  {
    "id": "phr-give-credit-where-due",
    "phrase": "Credit where credit is due: the machining team solved the chatter issue",
    "schoolVsNative": {
      "school": "We must praise the machining team.",
      "native": "Credit where credit is due: the machining team solved the chatter."
    },
    "meaningES": "Al césar lo que es del césar: el equipo de maquinado resolvió el problema de vibración",
    "explanation": "Reconocimiento justo y honorable a colaboradores o proveedores que superaron un reto de ingeniería adverso.",
    "category": "soft_skills",
    "exampleEN": "Credit where credit is due: the Saltillo toolmakers achieved a surface finish that exceeded our aerospace spec.",
    "exampleES": "Honor a quien honor merece: los matriceros de Saltillo lograron un acabado superficial superior a nuestra especificación aeroespacial.",
    "pronunciationHint": "Cadencia: /ˈkrɛdɪt wɛər ˈkrɛdɪt ɪz djuː/."
  },
  {
    "id": "phr-on-the-fence",
    "phrase": "The plant VP is still on the fence regarding robotic cobots",
    "schoolVsNative": {
      "school": "The boss has not decided yet.",
      "native": "The plant VP is still on the fence regarding robotic cobots."
    },
    "meaningES": "El vicepresidente de planta aún está indeciso / dudoso respecto a los robots colaborativos",
    "explanation": "Estar 'sobre la cerca' significa mantenerse indeciso entre dos opciones esperando mayor evidencia empírica o demostración de retorno de inversión.",
    "category": "soft_skills",
    "exampleEN": "If the VP is still on the fence about cobot palletizers, show him the ergonomic injury reduction data from Line 3.",
    "exampleES": "Si el vicepresidente aún está indeciso sobre los paletizadores con cobots, muéstrale los datos de reducción de lesiones de la Línea 3.",
    "pronunciationHint": "Ligado: /ɑːn ðə fɛns/."
  },
  {
    "id": "phr-bend-over-backwards",
    "phrase": "Our field support engineers bent over backwards to meet the launch date",
    "schoolVsNative": {
      "school": "They worked very hard to help.",
      "native": "Our field engineers bent over backwards to meet the launch date."
    },
    "meaningES": "Nuestros ingenieros de soporte hicieron hasta lo imposible / se desvivieron para cumplir con el lanzamiento",
    "explanation": "Expresión que denota esfuerzo extraordinario y dedicación fuera de serie para resolver una emergencia de cliente o puesta en marcha.",
    "category": "soft_skills",
    "exampleEN": "The Monterrey test engineering team bent over backwards to qualify the EV wire harnesses ahead of the SOP deadline.",
    "exampleES": "El equipo de ingeniería de pruebas de Monterrey hizo hasta lo imposible para calificar los arneses de EV antes de la fecha de inicio de producción.",
    "pronunciationHint": "Fluido: /bɛnt ˈoʊvər ˈbækwərdz/."
  },
  {
    "id": "phr-ballpark-figure",
    "phrase": "Give me a ballpark figure on the NRE tooling expenditure",
    "schoolVsNative": {
      "school": "Give me an approximate cost.",
      "native": "Give me a ballpark figure on the NRE tooling expenditure."
    },
    "meaningES": "Dame una cifra aproximada / una estimación preliminar del gasto de herramental no recurrente",
    "explanation": "Término universal en negocios y presupuestos de ingeniería para solicitar una cifra de orden de magnitud antes de la cotización formal detallada.",
    "category": "metrics",
    "exampleEN": "I don't need a certified quote right now; just give me a ballpark figure for tooling a 12-cavity injection mold.",
    "exampleES": "No requiero una cotización certificada ahora; solo dame una cifra aproximada para el herramental de un molde de inyección de 12 cavidades.",
    "pronunciationHint": "Acento en 'ballpark': /ˈbɔːlpɑːrk ˈfɪɡjər/."
  },
  {
    "id": "phr-par-for-the-course",
    "phrase": "Minor thermal throttling during continuous full-load tests is par for the course",
    "schoolVsNative": {
      "school": "It is normal and expected to happen.",
      "native": "Minor thermal throttling is par for the course."
    },
    "meaningES": "Un estrangulamiento térmico menor es completamente normal y de esperarse bajo carga máxima",
    "explanation": "Término originario del golf ('par'). Indica que una dificultad o fenómeno observado entra dentro de los parámetros esperados de la física del sistema.",
    "category": "metrics",
    "exampleEN": "A 2% yield drop during initial wafer lot qualification is par for the course until tool chambers fully seat.",
    "exampleES": "Una caída de rendimiento del 2% durante la calificación inicial del lote de obleas es normal hasta que las cámaras de grabado se asienten.",
    "pronunciationHint": "Cadencia: /pɑːr fɔːr ðə kɔːrs/."
  },
  {
    "id": "phr-outlier-in-data",
    "phrase": "That 120-millisecond spike is a statistical outlier",
    "schoolVsNative": {
      "school": "That number is very strange and far from the average.",
      "native": "That 120-millisecond spike is a statistical outlier."
    },
    "meaningES": "Ese pico de 120 milisegundos es un valor atípico / anómalo que distorsiona el promedio",
    "explanation": "Término estadístico indispensable en Six Sigma y análisis de telemetría para valores que caen fuera de 3 desviaciones estándar (3-sigma).",
    "category": "metrics",
    "exampleEN": "Don't recalculate the entire Six Sigma baseline; isolate that network outlier caused by the scheduled switch backup.",
    "exampleES": "No recalcules toda la línea base de Six Sigma; aísla ese valor atípico provocado por el respaldo programado del conmutador.",
    "pronunciationHint": "Énfasis: /ˈaʊtlaɪər/."
  },
  {
    "id": "phr-burn-rate",
    "phrase": "At this component burn rate, our prototype stock will deplete by Tuesday",
    "schoolVsNative": {
      "school": "We are using parts too fast.",
      "native": "At this component burn rate, our prototype stock will deplete by Tuesday."
    },
    "meaningES": "A esta tasa de consumo de componentes, nuestro stock para prototipos se agotará el martes",
    "explanation": "Velocidad a la que se consumen insumos, capital o componentes durante una fase de pruebas aceleradas o desarrollo de producto.",
    "category": "metrics",
    "exampleEN": "Given the high burn rate of silicon carbide power modules on the dyno bench, order 50 additional units immediately.",
    "exampleES": "Dado el alto ritmo de consumo de módulos de carburo de silicio en el banco de dinamómetro, ordena 50 unidades más de inmediato.",
    "pronunciationHint": "Claro: /ˈbɜːrn reɪt/."
  },
  {
    "id": "phr-diminishing-returns",
    "phrase": "Polishing beyond a 0.2-micron surface roughness yields diminishing returns",
    "schoolVsNative": {
      "school": "More polishing is a waste of time.",
      "native": "Polishing further yields diminishing returns."
    },
    "meaningES": "Pulir más allá de 0.2 micras de rugosidad genera rendimientos decrecientes",
    "explanation": "Principio económico y de ingeniería: el punto a partir del cual cada incremento marginal de esfuerzo produce un beneficio insignificante frente a su costo.",
    "category": "metrics",
    "exampleEN": "Adding a tenth sensor to the battery module enters the realm of diminishing returns without enhancing safety diagnosis.",
    "exampleES": "Agregar un décimo sensor al módulo de baterías cae en rendimientos decrecientes sin mejorar el diagnóstico de seguridad.",
    "pronunciationHint": "Acento: /dɪˈmɪnɪʃɪŋ rɪˈtɜːrnz/."
  },
  {
    "id": "phr-benchmark-against",
    "phrase": "We need to benchmark our thermal efficiency against industry leaders",
    "schoolVsNative": {
      "school": "We should compare our efficiency with other companies.",
      "native": "We need to benchmark our thermal efficiency against industry leaders."
    },
    "meaningES": "Debemos someter nuestra eficiencia térmica a un análisis comparativo frente a los líderes del sector",
    "explanation": "Proceso riguroso de benchmarking para medir KPIs contra competidores de clase mundial o estándares AS9100 / ISO / IEEE.",
    "category": "metrics",
    "exampleEN": "Our aerospace composite brackets benchmark favorably in strength-to-weight ratio against forged aluminum alloys.",
    "exampleES": "Nuestros soportes compuestos aeroespaciales se comparan favorablemente en relación resistencia-peso contra aleaciones de aluminio forjado.",
    "pronunciationHint": "Fluido: /ˈbɛntʃmɑːrk əˈɡɛnst/."
  },
  {
    "id": "phr-tighten-tolerances",
    "phrase": "We must tighten our dimensional tolerances down to plus-minus 5 microns",
    "schoolVsNative": {
      "school": "We need to make our pieces with smaller errors.",
      "native": "We must tighten our dimensional tolerances to ±5 microns."
    },
    "meaningES": "Debemos cerrar / ajustar nuestras tolerancias dimensionales a ±5 micras",
    "explanation": "Término central en maquinado CNC de precisión, matricería y semiconductores para reducir el rango permitido de desviación geométrica (GD&T).",
    "category": "metrics",
    "exampleEN": "To pass AS9100 turbine blade audits, we have to tighten our CNC wire EDM tolerances to ±0.005 millimeters.",
    "exampleES": "Para aprobar las auditorías AS9100 de álabes de turbina, debemos ajustar nuestras tolerancias de electroerosión por hilo a ±0.005 milímetros.",
    "pronunciationHint": "Firme: /ˈtaɪtən ˈtɑːlərənsɪz/."
  },
  {
    "id": "phr-six-sigma-capability",
    "phrase": "The stamping process achieved a Cpk capability index of 1.67",
    "schoolVsNative": {
      "school": "The machine makes very few mistakes.",
      "native": "The stamping process achieved a Cpk index of 1.67."
    },
    "meaningES": "El proceso de troquelado alcanzó un índice de capacidad de proceso Cpk de 1.67",
    "explanation": "Estándar de oro en calidad automotriz (APQP/PPAP): un Cpk de 1.67 significa que el proceso genera menos de 1 defecto por millón de piezas producidas.",
    "category": "metrics",
    "exampleEN": "Tesla requires a minimum Cpk of 1.33, so our Saltillo stamping cell qualifying at 1.67 grants us immediate supplier certification.",
    "exampleES": "Tesla exige un Cpk mínimo de 1.33, por lo que nuestra celda de troquelado en Saltillo calificando a 1.67 nos otorga certificación inmediata.",
    "pronunciationHint": "Preciso: /siː piː keɪ ˌkeɪpəˈbɪlɪti/."
  },
  {
    "id": "phr-break-the-ice",
    "phrase": "Let's share a brief project highlight to break the ice",
    "schoolVsNative": {
      "school": "Let's talk to start the meeting friendly.",
      "native": "Let's share a brief project highlight to break the ice."
    },
    "meaningES": "Compartamos un logro breve del proyecto para romper el hielo",
    "explanation": "Estrategia para relajar la tensión en reuniones con clientes extranjeros o nuevos equipos antes de negociaciones técnicas complejas.",
    "category": "small_talk",
    "exampleEN": "Before reviewing the supplier contract, the German delegation broke the ice by asking about Sonora's solar energy infrastructure.",
    "exampleES": "Antes de revisar el contrato de proveedores, la delegación alemana rompió el hielo preguntando por la infraestructura solar de Sonora.",
    "pronunciationHint": "Fluidez: /breɪk ðə aɪs/."
  },
  {
    "id": "phr-how-have-you-been-keeping",
    "phrase": "How have you been keeping since the Detroit auto show?",
    "schoolVsNative": {
      "school": "How are you doing since the show?",
      "native": "How have you been keeping since the Detroit auto show?"
    },
    "meaningES": "¿Cómo te ha ido / qué ha sido de ti desde el auto show de Detroit?",
    "explanation": "Fórmula cortés, sofisticada y natural en el networking entre profesionales que no se han visto en meses.",
    "category": "small_talk",
    "exampleEN": "It's great to see you again, David; how have you been keeping since the aerospace symposium in Querétaro?",
    "exampleES": "Qué gusto verte de nuevo, David; ¿cómo te ha ido desde el simposio aeroespacial en Querétaro?",
    "pronunciationHint": "Ritmo continuo: /haʊ həv juː bɪn ˈkiːpɪŋ/."
  },
  {
    "id": "phr-small-world",
    "phrase": "You studied under Dr. Chen at MIT too? It's a small world!",
    "schoolVsNative": {
      "school": "What a big coincidence!",
      "native": "You worked there too? It's a small world!"
    },
    "meaningES": "¿Tú también colaboraste con el Dr. Chen? ¡Qué pequeño es el mundo!",
    "explanation": "Expresión cordial común cuando se descubren contactos, universidades o empresas anteriores compartidas en eventos técnicos.",
    "category": "small_talk",
    "exampleEN": "When the supplier's chief metallurgist recognized our lead chemist, she laughed and said, 'It really is a small world!'",
    "exampleES": "Cuando la jefa metalúrgica del proveedor reconoció a nuestra química líder, sonrió y dijo: '¡De verdad que el mundo es un pañuelo!'",
    "pronunciationHint": "Expresivo: /smɔːl wɜːrld/."
  },
  {
    "id": "phr-grab-a-bite",
    "phrase": "Let's grab a quick bite and talk through the spec sheet",
    "schoolVsNative": {
      "school": "Let's eat something quickly.",
      "native": "Let's grab a quick bite and talk through the spec sheet."
    },
    "meaningES": "Comamos algo rápido mientras platicamos sobre la hoja de especificaciones",
    "explanation": "Manera casual y amigable de invitar a almorzar a un cliente, colega o auditor de visita en planta sin sonar excesivamente formal.",
    "category": "small_talk",
    "exampleEN": "After wrapping up the plant tour, let's grab a quick bite downtown before your flight back to Austin.",
    "exampleES": "Tras terminar el recorrido por la planta, comamos algo rápido en el centro antes de tu vuelo de regreso a Austin.",
    "pronunciationHint": "Unión natural: /ɡræb ə baɪt/."
  },
  {
    "id": "phr-safe-travels",
    "phrase": "Safe travels on your flight back to headquarters!",
    "schoolVsNative": {
      "school": "Have a good trip on the plane.",
      "native": "Safe travels on your flight back to headquarters!"
    },
    "meaningES": "¡Buen viaje de regreso a las oficinas centrales!",
    "explanation": "La despedida estándar más profesional y cálida cuando un visitante extranjero o auditor parte de tu planta.",
    "category": "small_talk",
    "exampleEN": "Thank you for reviewing our semiconductor fab; safe travels back to Munich tomorrow morning!",
    "exampleES": "Gracias por revisar nuestra planta de semiconductores; ¡buen viaje de regreso a Múnich mañana temprano!",
    "pronunciationHint": "Claro: /seɪf ˈtrævəlz/."
  },
  {
    "id": "phr-weather-the-storm",
    "phrase": "Our engineering operations managed to weather the supply chain storm",
    "schoolVsNative": {
      "school": "We survived the bad situation with supplies.",
      "native": "We managed to weather the supply chain storm."
    },
    "meaningES": "Nuestras operaciones de ingeniería lograron capear el temporal de suministros con éxito",
    "explanation": "Metáfora náutica ampliamente empleada en pláticas informales de negocios para aludir a cómo la empresa resistió una crisis logística o económica.",
    "category": "small_talk",
    "exampleEN": "By dual-sourcing our microcontrollers, our assembly plant was able to weather the chip shortage storm.",
    "exampleES": "Al contar con dos fuentes de microcontroladores, nuestra planta de ensamble pudo capear el temporal de la escasez de chips.",
    "pronunciationHint": "Fluido: /ˈwɛðər ðə stɔːrm/."
  },
  {
    "id": "phr-stay-in-touch",
    "phrase": "Let's definitely stay in touch on LinkedIn after the conference",
    "schoolVsNative": {
      "school": "Do not forget me, send me messages.",
      "native": "Let's definitely stay in touch on LinkedIn after the conference."
    },
    "meaningES": "Definitivamente mantengámonos en contacto por LinkedIn tras el congreso",
    "explanation": "Frase de cierre indispensable de networking para consolidar vínculos profesionales con ingenieros y directores internacionales.",
    "category": "small_talk",
    "exampleEN": "I enjoyed our discussion on battery recycling; let's definitely stay in touch as your research advances.",
    "exampleES": "Disfruté mucho nuestra plática sobre reciclaje de baterías; ¡definitivamente mantengámonos en contacto a medida que avance tu investigación!",
    "pronunciationHint": "Ligado: /steɪ ɪn tʌtʃ/."
  },
  {
    "id": "phr-apples-to-apples",
    "phrase": "Make sure we are comparing apples to apples across both architectures",
    "schoolVsNative": {
      "school": "Compare identical things.",
      "native": "Make sure we are comparing apples to apples."
    },
    "meaningES": "Asegurémonos de estar comparando elementos equivalentes y en las mismas condiciones",
    "explanation": "Advertencia esencial en debates de benchmarking: no se puede comparar el consumo de energía en reposo con el consumo a plena carga computacional.",
    "category": "technical_debate",
    "exampleEN": "Comparing x86 server TDP to ARM mobile chip power draw isn't apples to apples; we must normalize for computational throughput.",
    "exampleES": "Comparar el TDP de servidores x86 con el consumo de chips ARM móviles no es peras con peras; debemos normalizar por rendimiento de cálculo.",
    "pronunciationHint": "Rítmico: /ˈæpəlz tuː ˈæpəlz/."
  },
  {
    "id": "phr-future-proof",
    "phrase": "We should future-proof the bus architecture by adopting Ethernet-APL",
    "schoolVsNative": {
      "school": "Design it so it is good for many years.",
      "native": "We should future-proof the bus architecture."
    },
    "meaningES": "Debemos blindar a futuro / garantizar la vigencia tecnológica de la arquitectura de bus",
    "explanation": "Diseñar con margen de expansión y compatibilidad para que el sistema industrial no quede obsoleto en 3 o 5 años.",
    "category": "technical_debate",
    "exampleEN": "Even though 100Mbps is enough today, future-proofing our subsea robotic telemetry demands gigabit fiber transceivers.",
    "exampleES": "Aunque 100Mbps bastan hoy, blindar a futuro la telemetría del robot submarino exige transceptores de fibra de un gigabit.",
    "pronunciationHint": "Énfasis: /ˈfjuːtʃər pruːf/."
  },
  {
    "id": "phr-push-the-envelope",
    "phrase": "This supersonic aerospike engine design really pushes the envelope",
    "schoolVsNative": {
      "school": "This design goes beyond traditional limits.",
      "native": "This engine design really pushes the envelope."
    },
    "meaningES": "Este diseño de motor aerospike realmente desafía los límites de lo conocido en la ingeniería",
    "explanation": "Originario de la aviación militar de pruebas (la 'envolvente de vuelo'). Significa operar en la vanguardia extrema de la tecnología y la física.",
    "category": "technical_debate",
    "exampleEN": "Fabricating 3nm transistor nodes with High-NA EUV lithography is truly pushing the thermodynamic envelope.",
    "exampleES": "Fabricar nodos de transistores de 3nm con litografía EUV de alta apertura numérica es realmente empujar los límites termodinámicos.",
    "pronunciationHint": "Enlace: /pʊʃ ðə ˈɛnvəloʊp/."
  },
  {
    "id": "phr-devil-is-in-details",
    "phrase": "The CAD model looks fine, but the devil is in the details of assembly tolerances",
    "schoolVsNative": {
      "school": "Small details will cause big problems.",
      "native": "The devil is in the details of assembly tolerances."
    },
    "meaningES": "El modelo CAD se ve bien, pero el diablo está en los detalles de las tolerancias de ensamble",
    "explanation": "Aforismo universal de la ingeniería para alertar que un concepto teórico puede fracasar estrepitosamente por descuidar microdetalles mecánicos.",
    "category": "technical_debate",
    "exampleEN": "Thermal expansion coefficients match on paper, but the devil is in the details of how the epoxies cure under high humidity.",
    "exampleES": "Los coeficientes de dilatación térmica coinciden en papel, pero el detalle crítico está en cómo curan los epóxicos bajo alta humedad.",
    "pronunciationHint": "Cadencia: /ðə ˈdɛvəl ɪz ɪn ðə dɪˈteɪlz/."
  },
  {
    "id": "phr-meet-halfway",
    "phrase": "Can we meet halfway on the delivery schedule and ship half the lot early?",
    "schoolVsNative": {
      "school": "Can we find a compromise?",
      "native": "Can we meet halfway on the delivery schedule?"
    },
    "meaningES": "¿Podemos acordar un punto medio en el cronograma y entregar la mitad del lote por adelantado?",
    "explanation": "Frase conciliadora para resolver discrepancias en compromisos de entrega entre planta de manufactura y cliente corporativo.",
    "category": "conflict_resolution",
    "exampleEN": "Since the assembly line can't wait for all 5,000 machined housings, let's meet halfway and air-freight 500 units on Monday.",
    "exampleES": "Dado que la línea no puede esperar las 5,000 carcasas, lleguemos a un acuerdo intermedio y enviemos 500 unidades por avión el lunes.",
    "pronunciationHint": "Fluidez: /miːt ˈhæfˈweɪ/."
  },
  {
    "id": "phr-no-hard-feelings",
    "phrase": "We disagreed on the supplier choice, but no hard feelings",
    "schoolVsNative": {
      "school": "Do not be angry with me.",
      "native": "We disagreed, but no hard feelings."
    },
    "meaningES": "Discrepamos en la elección del proveedor, pero sin resentimientos ni asperezas personales",
    "explanation": "Fórmula ejecutiva para reafirmar la camaradería y profesionalismo tras un debate técnico acalorado sobre diseño o costos.",
    "category": "conflict_resolution",
    "exampleEN": "I defended the titanium alloy and you backed the carbon fiber; no hard feelings, the data proved your approach was superior.",
    "exampleES": "Yo defendí la aleación de titanio y tú la fibra de carbono; sin resentimientos, los datos demostraron que tu propuesta era superior.",
    "pronunciationHint": "Suave: /noʊ hɑːrd ˈfiːlɪŋz/."
  },
  {
    "id": "phr-put-cards-on-table",
    "phrase": "Let's put our cards on the table regarding the budget deficit",
    "schoolVsNative": {
      "school": "Let us be completely honest about money.",
      "native": "Let's put our cards on the table regarding the budget."
    },
    "meaningES": "Pongamos las cartas sobre la mesa con total transparencia respecto al déficit presupuestal",
    "explanation": "Propuesta diplomática para eliminar secretismos y alinear a los directores técnicos con la realidad financiera sin rodeos.",
    "category": "conflict_resolution",
    "exampleEN": "Instead of concealing the silicon scrap rate from the board, let's put our cards on the table and request capital for new ovens.",
    "exampleES": "En lugar de ocultar la tasa de merma de silicio al consejo, pongamos las cartas sobre la mesa y solicitemos capital para hornos nuevos.",
    "pronunciationHint": "Énfasis: /pʊt aʊər kɑːrdz ɑːn ðə ˈteɪbəl/."
  },
  {
    "id": "phr-iron-out-differences",
    "phrase": "Let's schedule a workshop to iron out differences between QA and Production",
    "schoolVsNative": {
      "school": "We will meet to stop arguing.",
      "native": "Let's iron out differences between QA and Production."
    },
    "meaningES": "Programemos un taller para limar asperezas y conciliar criterios entre Calidad y Producción",
    "explanation": "Expresión constructiva para mediar en el clásico conflicto de intereses entre la meta de volumen de manufactura y el rigor de inspección de calidad.",
    "category": "conflict_resolution",
    "exampleEN": "The daily friction over cosmetic scratch criteria is hurting throughput; let's sit down and iron out our differences using boundary samples.",
    "exampleES": "La fricción diaria sobre rayaduras cosméticas afecta el volumen; sentémonos a limar asperezas definiendo muestras límite visuales.",
    "pronunciationHint": "Ligado: /ˈaɪərn aʊt ˈdɪfərənsɪz/."
  },
  {
    "id": "phr-hit-the-ground-running-ops",
    "phrase": "The new automation contractor hit the ground running on day one",
    "schoolVsNative": {
      "school": "The contractor started working fast immediately.",
      "native": "The contractor hit the ground running on day one."
    },
    "meaningES": "El nuevo contratista de automatización comenzó a producir resultados inmediatos desde el primer día",
    "explanation": "Alabanza técnica para ingenieros o consultores que se integran a un proyecto sin requerir semanas de capacitación para ser productivos.",
    "category": "workplace",
    "exampleEN": "Thanks to our standardized Git repos and Docker containers, our remote controls engineer hit the ground running on day one.",
    "exampleES": "Gracias a nuestros repositorios Git estandarizados y contenedores Docker, nuestro ingeniero de control remoto fue productivo desde el día uno.",
    "pronunciationHint": "Ritmo continuo: /hɪt ðə ɡraʊnd ˈrʌnɪŋ/."
  }
];

// Attach to window and export for Node modules
if (typeof window !== 'undefined') {
  window.STEMOS_PHRASES = STEMOS_PHRASES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = STEMOS_PHRASES;
}
