/**
 * ==============================================================================
 * stemOS LXP — Catálogo Nacional y LATAM de Carreras, Tracks de 60 Horas
 * y Motor de Mundos 3D Deterministas Adaptados con IA
 * 
 * Alineado a:
 * - Universidades Tecnológicas (UT / Politécnicas - TSU e Ingenierías)
 * - Institutos Tecnológicos (TecNM - Tecnológico Nacional de México)
 * - Universidades Estatales y Autónomas de México (UNAM, IPN, UDG, UANL, BUAP, UAQ, UABC)
 * - Universidades Tecnológicas y Públicas de LATAM (UTN Argentina, SENA Colombia, etc.)
 * - Estándar Curricular Uniforme de 60 Horas Auditables (4 Hitos x 15 Horas)
 * - Acreditación W3C Open Badges 3.0, ISO 9001:2015 Cl. 7.2 y Estándares Globales
 * ==============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.STEMOS_CAREER_TRACKS = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Función determinista de hash para garantizar que la misma carrera genere SIEMPRE el mismo mundo
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convertir a entero de 32 bits
    }
    return Math.abs(hash);
  }

  // Generador pseudo-aleatorio determinista (Mulberry32)
  function seededRandom(seed) {
    return function() {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  const INSTITUTION_TYPES = {
    UT: {
      id: 'ut',
      name: 'Universidades Tecnológicas & Politécnicas',
      badge: 'TSU & Ingeniería Técnica',
      desc: 'Planes intensivos 70% práctica / 30% teoría orientados a técnicos superiores y estadías de planta.'
    },
    IT: {
      id: 'it',
      name: 'Institutos Tecnológicos (TecNM)',
      badge: 'TecNM Nacional',
      desc: 'El sistema de educación superior tecnológica más grande de México con 254 campus y residencias profesionales.'
    },
    UNIV_ESTATAL: {
      id: 'univ-estatal',
      name: 'Universidades Estatales y Autónomas',
      badge: 'Estatales & Autónomas',
      desc: 'Formación de ingeniería de alta especialidad, diseño de I+D, posgrados y certificación internacional.'
    },
    LATAM: {
      id: 'latam',
      name: 'Universidades de Latinoamérica',
      badge: 'LATAM Regional',
      desc: 'Universidades tecnológicas y politécnicas de Sudamérica y Centroamérica (UTN, SENA, Univs Públicas).'
    }
  };

  const CAREERS = [
    // ════════════════════════════════════════════════════════════════════════
    // 1. UNIVERSIDADES TECNOLÓGICAS (UT)
    // ════════════════════════════════════════════════════════════════════════
    {
      id: 'ut-mecatronica',
      name: 'TSU e Ing. en Mecatrónica (Área Automatización e Instalaciones)',
      system: 'ut',
      systemLabel: 'Universidades Tecnológicas (UT)',
      typicalCampuses: ['UT de Tijuana', 'UT de Querétaro', 'UT de Ramos Arizpe', 'UT de Ciudad Juárez'],
      cluster: 'Manufactura Avanzada & Robótica',
      primaryTrackId: 'robotics-automation',
      secondaryTrackId: 'embedded-firmware-edge-ai',
      totalHours: 60.0,
      standards: ['IEC 61131-3 PLC', 'ISO 10218-1/2', 'OSHA 1910.147 LOTO', 'NFPA 70E Arc Flash'],
      defaultHub: 'Saltillo-Ramos & Ciudad Juárez',
      description: 'Programación de PLCs Allen-Bradley/Siemens, calibración de servomotores Yaskawa/KUKA, comisionamiento de celdas robotizadas y protocolos LOTO de energía cero.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Shopfloor SOP & LOTO Zero-Energy Isolation', focus: 'Instrucciones operativas de celdas, relevo de turnos y bloqueo de actuadores neumáticos.' },
        { hito: 2, hours: 15.0, title: 'P&ID Blueprints & SCADA Historian Diagnostics', focus: 'Lectura de planos electroneumáticos, monitoreo de alarmas OPC-UA y análisis de causa raíz 8D.' },
        { hito: 3, hours: 15.0, title: 'Cross-Border Escalation & Vendor Support', focus: 'Llamadas de servicio técnico con EE.UU., solicitud de refacciones críticas y reporte de paro.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Automated Cell Defense', focus: 'Defensa oral socrática ante tribunal sobre resolución de fallas intermitentes de bus de campo.' }
      ],
      aiMentor: {
        name: 'Ing. Marcus Vance',
        title: 'Lead Robotics & Automation Commissioning Specialist',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres Marcus Vance, especialista de comisionamiento de robótica en plantas automotrices de Norteamérica. Evalúas la precisión técnica del alumno en PLC ladder logic, seguridad funcional y vocabulario de mantenimiento sin rodeos.'
      },
      worldTheme: {
        biomeName: 'Giga-Cell Robotics Foundry',
        primaryColor: '#f97316',
        secondaryColor: '#ea580c',
        glowColor: 'rgba(249, 115, 22, 0.45)',
        atmosphereGradient: ['#1c1917', '#431407', '#7c2d12', '#ea580c'],
        gridColor: 'rgba(251, 146, 60, 0.35)',
        starfieldTint: '#fdba74'
      }
    },
    {
      id: 'ut-mantenimiento-industrial',
      name: 'TSU e Ing. en Mantenimiento Industrial (Área Maquinaria Pesada)',
      system: 'ut',
      systemLabel: 'Universidades Tecnológicas (UT)',
      typicalCampuses: ['UT de Coahuila', 'UT de Hermosillo', 'UT del Norte de Guanajuato', 'UT de San Luis Potosí'],
      cluster: 'Confiabilidad & Operaciones',
      primaryTrackId: 'industrial-operations',
      secondaryTrackId: 'quality-ehs',
      totalHours: 60.0,
      standards: ['ISO 55001 Asset Management', 'OSHA 1910.147', 'VDI 2056 Vibration Severity', 'NFPA 79'],
      defaultHub: 'Monterrey & Ramos Arizpe',
      description: 'Mantenimiento predictivo por análisis de vibraciones mecánicas, termografía infrarroja, alineación láser de ejes y reporte de paros de maquinaria pesada.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Predictive Vibration Analysis & PM Logs', focus: 'Vocabulario de rodamientos, desbalance dinámico, cavitación de bombas e inspección termográfica.' },
        { hito: 2, hours: 15.0, title: 'LOTO Lockout Protocols & Hydraulic Schematics', focus: 'Aislamiento de presión residual en prensas de 2,000 toneladas y try-step auditado.' },
        { hito: 3, hours: 15.0, title: 'Critical Line-Stop Escalation & Spare Parts Procurement', focus: 'Negociación de entrega hot-shot de refacciones con distribuidores de EE.UU. bajo presión de OEE.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: MTBF & MTTR Optimization', focus: 'Defensa de plan de mantenimiento autónomo TPM y justificación de presupuesto de overhaul.' }
      ],
      aiMentor: {
        name: 'Chief Insp. Donald Reed',
        title: 'Plant Reliability & Heavy Machinery Director',
        voicePersona: 'en-US-Standard-B',
        contextPrompt: 'Eres Donald Reed, veterano de confiabilidad de equipo en prensas de troquelado. Exiges precisión numérica en amplitudes de vibración (mm/s RMS), tolerancias de alineación y disciplina LOTO.'
      },
      worldTheme: {
        biomeName: 'Heavy Machinery Overhaul Bay',
        primaryColor: '#eab308',
        secondaryColor: '#ca8a04',
        glowColor: 'rgba(234, 179, 8, 0.45)',
        atmosphereGradient: ['#18181b', '#3f2c06', '#713f12', '#ca8a04'],
        gridColor: 'rgba(250, 204, 21, 0.35)',
        starfieldTint: '#fef08a'
      }
    },
    {
      id: 'ut-procesos-industriales',
      name: 'TSU e Ing. en Procesos Industriales (Área Manufactura y Plásticos)',
      system: 'ut',
      systemLabel: 'Universidades Tecnológicas (UT)',
      typicalCampuses: ['UT de Puebla', 'UT de Tamaulipas Norte', 'UT de Tijuana', 'UT de Querétaro'],
      cluster: 'Manufactura & Transformación',
      primaryTrackId: 'advanced-manufacturing',
      secondaryTrackId: 'automotive-lean',
      totalHours: 60.0,
      standards: ['AIAG APQP/PPAP', 'IATF 16949', 'SPI Mold Standards', 'ISO 9001:2015'],
      defaultHub: 'Tijuana, Puebla & Juárez',
      description: 'Moldeo por inyección de polímeros técnicos, ajuste de parámetros térmicos/presión en máquinas Husky/Engel, reducción de scrap y validación de herramentales.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Injection Molding Cycle Optimization & SOPs', focus: 'Detección de defectos (short shot, flash, warpage, sink marks) y terminología de resinas plásticas.' },
        { hito: 2, hours: 15.0, title: 'GD&T Part Inspection & CMM Verification', focus: 'Lectura de tolerancias geométricas, verificación en mesa de coordenadas CMM y estudios de capacidad Cpk.' },
        { hito: 3, hours: 15.0, title: 'PPAP Warrant Submission & Customer Concessions', focus: 'Negociación de concesión temporal de dimensionales con ingenieros de calidad de Detroit.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Tooling Wear & Line Balancing', focus: 'Resolución de desbalance en tiempo de ciclo entre estaciones de moldeo y ensamble ultrasonido.' }
      ],
      aiMentor: {
        name: 'Ing. Elena Rostova',
        title: 'Senior Tooling & Plastics Processing Specialist',
        voicePersona: 'en-US-Neural2-F',
        contextPrompt: 'Eres Elena Rostova, especialista de moldes de inyección técnica para la industria automotriz y médica. Evalúas el uso exacto de términos de reología, presión de empaque y análisis de defectos.'
      },
      worldTheme: {
        biomeName: 'Precision Polymer Extrusion Vault',
        primaryColor: '#06b6d4',
        secondaryColor: '#0891b2',
        glowColor: 'rgba(6, 182, 212, 0.45)',
        atmosphereGradient: ['#0f172a', '#083344', '#155e75', '#0891b2'],
        gridColor: 'rgba(34, 211, 238, 0.35)',
        starfieldTint: '#a5f3fc'
      }
    },
    {
      id: 'ut-ti-software',
      name: 'TSU e Ing. en Tecnologías de la Información (Desarrollo Multiplataforma & Cloud)',
      system: 'ut',
      systemLabel: 'Universidades Tecnológicas (UT)',
      typicalCampuses: ['UT de Jalisco', 'UT de Aguascalientes', 'UT de Querétaro', 'UT Metropolitana de Mérida'],
      cluster: 'Tecnología & Cloud Industrial',
      primaryTrackId: 'software-dev',
      secondaryTrackId: 'web-dev-agentic',
      totalHours: 60.0,
      standards: ['OpenTelemetry', 'ISO 27001', 'REST/GraphQL API Standards', 'SOC 2 Type II'],
      defaultHub: 'Guadalajara, Monterrey & Mérida',
      description: 'Desarrollo de microservicios para telemetría de manufactura, integración de APIs industriales, pipelines de CI/CD y despliegue de dashboards de producción.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Clean Architecture & Industrial REST/MQTT APIs', focus: 'Vocabulario de endpoints, payloads JSON, latencia de red en planta y manejo de excepciones.' },
        { hito: 2, hours: 15.0, title: 'Observability, Distributed Tracing & Postmortems', focus: 'Análisis de cuellos de botella con OpenTelemetry, métricas P99 y redacción de incident reports.' },
        { hito: 3, hours: 15.0, title: 'Sprint Planning, PR Reviews & Cross-Border Standups', focus: 'Discusión de deuda técnica, revisión de pull requests en inglés y priorización de backlog.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Fault-Tolerant Edge Architecture', focus: 'Defensa de arquitectura offline-first para terminales MES en línea de ensamble.' }
      ],
      aiMentor: {
        name: 'Arct. Alex Chen',
        title: 'Principal Cloud Systems & Observability Architect',
        voicePersona: 'en-US-Neural2-A',
        contextPrompt: 'Eres Alex Chen, arquitecto principal de sistemas de alta escala en Austin. Evalúas la concisión en revisiones de código, términos de concurrencia y argumentación técnica en juntas de diseño.'
      },
      worldTheme: {
        biomeName: 'Distributed Cloud Matrix Node',
        primaryColor: '#3b82f6',
        secondaryColor: '#2563eb',
        glowColor: 'rgba(59, 130, 246, 0.45)',
        atmosphereGradient: ['#030712', '#0f172a', '#1e3a8a', '#2563eb'],
        gridColor: 'rgba(96, 165, 250, 0.35)',
        starfieldTint: '#bfdbfe'
      }
    },
    {
      id: 'ut-logistica-transporte',
      name: 'TSU e Ing. en Logística y Transporte (Cadena de Suministro Internacional)',
      system: 'ut',
      systemLabel: 'Universidades Tecnológicas (UT)',
      typicalCampuses: ['UT de Nuevo Laredo', 'UT de Nogales', 'UT de Reynosa', 'UT de Altamira'],
      cluster: 'Comercio Exterior & Logística',
      primaryTrackId: 'logistics-compliance',
      secondaryTrackId: 'advanced-supply-chain-reshoring',
      totalHours: 60.0,
      standards: ['Incoterms 2020', 'C-TPAT / OEA', 'T-MEC / USMCA Origin Rules', 'SAT Anexo 24/31'],
      defaultHub: 'Nuevo Laredo, Monterrey & Juárez',
      description: 'Coordinación de cruces fronterizos en el World Trade Bridge, despacho aduanero de materiales IMMEX, rastreo de fletes aéreos fletados y mitigación de multas aduanales.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Border Crossing Manifests & Incoterms 2020', focus: 'Diferenciación operativa entre FCA, DAP y DDP, bill of lading y cartas porte.' },
        { hito: 2, hours: 15.0, title: 'Customs Holds, Anexo 24 Discrepancies & SAT Audits', focus: 'Resolución de discrepancias arancelarias HTSUS vs TIGIE y justificación de mermas.' },
        { hito: 3, hours: 15.0, title: 'Expedited Freight Negotiation & Line-Stop Crisis', focus: 'Negociación de charters aéreos de emergencia cuando un tráiler queda varado en frontera.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Reshoring Supply Network Redesign', focus: 'Presentación ejecutiva de balance entre costo landed, inventario de seguridad y riesgo geopolítico.' }
      ],
      aiMentor: {
        name: 'Broker Sarah Sterling',
        title: 'Senior Cross-Border Trade & Customs Compliance Counsel',
        voicePersona: 'en-US-Neural2-C',
        contextPrompt: 'Eres Sarah Sterling, abogada aduanal y agente de cruce en Laredo. Eres directa y estricta en el uso de los Incoterms 2020, documentos fiscales y vocabulario de transfer y drayage.'
      },
      worldTheme: {
        biomeName: 'Laredo Intermodal Cross-Dock Harbor',
        primaryColor: '#f59e0b',
        secondaryColor: '#d97706',
        glowColor: 'rgba(245, 158, 11, 0.45)',
        atmosphereGradient: ['#1c1917', '#451a03', '#78350f', '#d97706'],
        gridColor: 'rgba(251, 191, 36, 0.35)',
        starfieldTint: '#fde68a'
      }
    },
    {
      id: 'ut-energias-renovables',
      name: 'TSU e Ing. en Energías Renovables (Sistemas Solares y Turbinas)',
      system: 'ut',
      systemLabel: 'Universidades Tecnológicas (UT)',
      typicalCampuses: ['UT de Cancún', 'UT de Campeche', 'UT del Valle del Mezquital', 'UT de Tabasco'],
      cluster: 'Sustentabilidad & Energía',
      primaryTrackId: 'energy-renewables',
      secondaryTrackId: 'energy-data-centers',
      totalHours: 60.0,
      standards: ['IEC 61215 Solar PV', 'IEC 61400 Wind Turbines', 'IEEE 1547 Grid Interconnect', 'CFE Código de Red 2.0'],
      defaultHub: 'Sonora (Plan Sonora), Querétaro & Oaxaca',
      description: 'Parques fotovoltaicos utility-scale, aerogeneradores de 4MW, sistemas de almacenamiento en baterías BESS LFP y cumplimiento del Código de Red ante CENACE.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Utility-Scale PV Field Commissioning & Inverters', focus: 'Vocabulario de inversores centrales, curvas I-V, degradación PID y cajas combinadoras.' },
        { hito: 2, hours: 15.0, title: 'Substation GIS & Grid Interconnection Sync', focus: 'Sincronización a 115kV, factor de potencia, armónicos de 5º orden y disparo de relevadores.' },
        { hito: 3, hours: 15.0, title: 'Grid Operator Curtailment & Power Purchase Agreements', focus: 'Comunicación técnica con CENACE en cortes de generación y gestión contractual PPA.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Microgrid Black-Start Protocol', focus: 'Defensa del protocolo de arranque en negro e isla eléctrica con soporte de banco BESS.' }
      ],
      aiMentor: {
        name: 'Dr. Julian Thorne',
        title: 'Renewable Power Systems & Grid Integration Specialist',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres el Dr. Julian Thorne, ingeniero consultor de interconexión eléctrica a gran escala. Exiges precisión en frecuencia (60.0 Hz), control droop e impedancia de Thévenin en la red.'
      },
      worldTheme: {
        biomeName: 'Desert Solar & Substation Oasis',
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        glowColor: 'rgba(16, 185, 129, 0.45)',
        atmosphereGradient: ['#022c22', '#064e3b', '#047857', '#059669'],
        gridColor: 'rgba(52, 211, 153, 0.35)',
        starfieldTint: '#a7f3d0'
      }
    },

    // ════════════════════════════════════════════════════════════════════════
    // 2. INSTITUTOS TECNOLÓGICOS (TecNM)
    // ════════════════════════════════════════════════════════════════════════
    {
      id: 'it-mecatronica',
      name: 'Ingeniería Mecatrónica (TecNM)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Saltillo', 'IT de Toluca', 'IT de Culiacán', 'IT de Hermosillo', 'IT de Morelia', 'IT de Veracruz'],
      cluster: 'Ingeniería Mecatrónica & Control',
      primaryTrackId: 'robotics-automation',
      secondaryTrackId: 'automotive-lean',
      totalHours: 60.0,
      standards: ['ISO 10218-1/2', 'IATF 16949', 'CE Machinery Directive 2006/42/EC', 'IEC 62061 SIL'],
      defaultHub: 'Saltillo-Ramos, Toluca & Hermosillo',
      description: 'Integración electromecánica de precisión, servocontrol multieje, cinemática directa/inversa de robots antropomórficos y diseño de herramentales end-of-arm.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Multi-Axis Motion Control & Kinematics Terminology', focus: 'Definición de encoders absolutos, backlash en reductores cicloidales y repetibilidad mecánica.' },
        { hito: 2, hours: 15.0, title: 'Automated Inspection & Computer Vision Calibration', focus: 'Calibración de cámaras industriales Cognex/Keyence, iluminación coaxial y píxeles por milímetro.' },
        { hito: 3, hours: 15.0, title: 'Design Review & Tier-1 OEM Buy-Off Negotiations', focus: 'Defensa de especificaciones de celda robotizada ante ingenieros de Stellantis/General Motors.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Industrial Robot Crash Analysis', focus: 'Análisis forense de colisión de robot con troquel, torque spikes y recálculo de envolvente segura.' }
      ],
      aiMentor: {
        name: 'Chief Eng. Robert Vance',
        title: 'VP of Advanced Robotics & Powertrain Integration',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres Robert Vance, directivo de integración robótica en Detroit y Saltillo. Valoras las respuestas estructuradas, la física exacta de actuadores y el inglés técnico directo sin vacilaciones.'
      },
      worldTheme: {
        biomeName: 'Precision Mechatronics Test Track',
        primaryColor: '#f97316',
        secondaryColor: '#c2410c',
        glowColor: 'rgba(249, 115, 22, 0.45)',
        atmosphereGradient: ['#18181b', '#3b1206', '#7c2d12', '#c2410c'],
        gridColor: 'rgba(251, 146, 60, 0.35)',
        starfieldTint: '#fed7aa'
      }
    },
    {
      id: 'it-electromecanica',
      name: 'Ingeniería Electromecánica (TecNM)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Tijuana', 'IT de Cd. Madero', 'IT de Aguascalientes', 'IT de Chihuahua', 'IT de Pachuca'],
      cluster: 'Energía & Sistemas Electromecánicos',
      primaryTrackId: 'industrial-operations',
      secondaryTrackId: 'energy-renewables',
      totalHours: 60.0,
      standards: ['IEEE 141 Red Book', 'NFPA 70E Arc Flash', 'NEMA MG-1 Electric Motors', 'OSHA 1910.303'],
      defaultHub: 'Tijuana, Monterrey & Chihuahua',
      description: 'Distribución en media tensión, cálculo de corto circuito en tableros switchgear de 480V, centro de control de motores (CCM) y protección de transformadores secos.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Industrial Switchgear & 480V Power Distribution', focus: 'Vocabulario de interruptores de potencia, relevadores térmicos y curvas tiempo-corriente.' },
        { hito: 2, hours: 15.0, title: 'Arc Flash Hazard Calculations & NFPA 70E PPE', focus: 'Categorías de riesgo de arco eléctrico, distancias de frontera y rotulado de tableros industriales.' },
        { hito: 3, hours: 15.0, title: 'Electrical Contractor Coordination & Outage Windows', focus: 'Coordinación en inglés de libranzas eléctricas con subestación y cuadrillas de mantenimiento.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Transformer Oil Breakdown & DGA', focus: 'Interpretación de gases disueltos en aceite (DGA) para diagnosticar falla incipiente de aislamiento.' }
      ],
      aiMentor: {
        name: 'Master Electr. Harold Briggs',
        title: 'Senior Industrial High-Voltage Electrical Inspector',
        voicePersona: 'en-US-Standard-B',
        contextPrompt: 'Eres Harold Briggs, inspector certificado de sistemas eléctricos industriales de alto voltaje. Enfatizas la seguridad de vida, el estándar NFPA 70E y las libranzas rigurosas sin errores.'
      },
      worldTheme: {
        biomeName: 'High-Voltage Switchgear Substation',
        primaryColor: '#eab308',
        secondaryColor: '#a16207',
        glowColor: 'rgba(234, 179, 8, 0.45)',
        atmosphereGradient: ['#1c1917', '#422006', '#713f12', '#a16207'],
        gridColor: 'rgba(250, 204, 21, 0.35)',
        starfieldTint: '#fef9c3'
      }
    },
    {
      id: 'it-electronica',
      name: 'Ingeniería Electrónica (Especialidad Semiconductores y Hardware)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Tijuana', 'IT de Culiacán', 'IT de Querétaro', 'IT de Hermosillo', 'IT de Puebla'],
      cluster: 'Semiconductores & Hardware',
      primaryTrackId: 'semiconductors',
      secondaryTrackId: 'embedded-firmware-edge-ai',
      totalHours: 60.0,
      standards: ['IPC-A-610 Class 3', 'JEDEC JESD22', 'IEEE 1149.1 JTAG', 'ANSI/ESD S20.20'],
      defaultHub: 'Guadalajara, Tijuana & Mexicali',
      description: 'Diseño de PCB multicapa de alta velocidad, ruteo de pares diferenciales, mitigación de EMI/EMC, pruebas funcionales automáticas ATE y aseguramiento de componentes.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'High-Speed PCB Stackup & Differential Impedance', focus: 'Terminología de dieléctricos FR-4/Rogers, vías enterradas, eye diagrams y crosstalk.' },
        { hito: 2, hours: 15.0, title: 'Boundary-Scan JTAG & In-Circuit Testing (ICT)', focus: 'Depuración de buses con osciloscopios de 4GHz, vectores de prueba y localización de pistas abiertas.' },
        { hito: 3, hours: 15.0, title: 'Component End-of-Life (EOL) & Silicon Sourcing', focus: 'Gestión de obsolescencia de circuitos integrados con distribuidores globales de Texas Instruments/Analog.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: EMC Anechoic Chamber Failure', focus: 'Resolución de emisiones radiadas en cámara anecoica para certificación FCC Parte 15 Clase B.' }
      ],
      aiMentor: {
        name: 'Dr. Kenji Sato',
        title: 'Director of Hardware Integrity & Silicon Test',
        voicePersona: 'en-US-Neural2-A',
        contextPrompt: 'Eres Kenji Sato, director de hardware y silicio. Cuestionas implacablemente el margen de ruido, el ruteo de reloj de alta velocidad y los filtros pasivos de desacoplo.'
      },
      worldTheme: {
        biomeName: 'High-Speed Silicon Silicon Test Foundry',
        primaryColor: '#0ea5e9',
        secondaryColor: '#0284c7',
        glowColor: 'rgba(14, 165, 233, 0.45)',
        atmosphereGradient: ['#0f172a', '#082f49', '#0369a1', '#0284c7'],
        gridColor: 'rgba(56, 189, 248, 0.35)',
        starfieldTint: '#bae6fd'
      }
    },
    {
      id: 'it-industrial',
      name: 'Ingeniería Industrial (Lean Six Sigma & Calidad IATF 16949)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Saltillo', 'IT de Toluca', 'IT de Celaya', 'IT de Cd. Juárez', 'IT de Tijuana', 'IT de San Luis Potosí'],
      cluster: 'Calidad & Excelencia Operacional',
      primaryTrackId: 'quality-ehs',
      secondaryTrackId: 'automotive-lean',
      totalHours: 60.0,
      standards: ['IATF 16949', 'Six Sigma DMAIC Black Belt', 'AIAG Core Tools (MSA, SPC)', 'ISO 9001:2015'],
      defaultHub: 'Saltillo-Ramos, Bajío & Cd. Juárez',
      description: 'Liderazgo de proyectos DMAIC, estudios Gage R&R para certificar sistemas de medición, balanceo de ensamble con takt time y auditorías de certificación de clientes automotrices.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Shopfloor Gemba Walk & Kaizen Event Facilitation', focus: 'Identificación de las 8 mudas (desperdicios), cálculo de OEE y redacción de A3 problem solving.' },
        { hito: 2, hours: 15.0, title: 'Measurement Systems Analysis (MSA) & SPC Charts', focus: 'Interpretación de cartas X-barra R, cálculo de Cpk/Ppk y porcentaje de contribución Gage R&R.' },
        { hito: 3, hours: 15.0, title: '8D Root Cause Defense & Formal Customer Escalation', focus: 'Defensa de contención D3 y causa raíz D4 ante auditores de calidad de Ford y BMW en EE.UU.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Comprehensive IATF Plant Audit', focus: 'Simulación de auditoría estricta de cláusula 8.5 de control de producción sin no conformidades mayores.' }
      ],
      aiMentor: {
        name: 'Master Black Belt Arthur Vance',
        title: 'Global Quality Director & Senior IATF Lead Auditor',
        voicePersona: 'en-US-Standard-B',
        contextPrompt: 'Eres Arthur Vance, Lead Auditor internacional de IATF 16949. No toleras respuestas vagas; exiges evidencia estadística sólida, trazabilidad de lote y contención inmediata en planta.'
      },
      worldTheme: {
        biomeName: 'Six Sigma Metrology & Quality War Room',
        primaryColor: '#10b981',
        secondaryColor: '#047857',
        glowColor: 'rgba(16, 185, 129, 0.45)',
        atmosphereGradient: ['#022c22', '#064e3b', '#065f46', '#047857'],
        gridColor: 'rgba(52, 211, 153, 0.35)',
        starfieldTint: '#d1fae5'
      }
    },
    {
      id: 'it-sistemas',
      name: 'Ingeniería en Sistemas Computacionales (Arquitectura Cloud & DevOps)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Culiacán', 'IT de Morelia', 'IT de Hermosillo', 'IT de León', 'IT de Mérida', 'IT de Orizaba'],
      cluster: 'Software & Infraestructura Crítica',
      primaryTrackId: 'software-dev',
      secondaryTrackId: 'cybersecurity',
      totalHours: 60.0,
      standards: ['Linux Foundation Standards', 'Kubernetes CKA', 'NIST SP 800-53', 'ISO 27001:2022'],
      defaultHub: 'Guadalajara, Monterrey & CDMX',
      description: 'Orquestación de contenedores Kubernetes en plantas de manufactura, infraestructura como código (Terraform), pipelines de entrega continua y mitigación de vulnerabilidades CVE.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Linux Kernel Tuning & Container Security Contexts', focus: 'Permisos POSIX, cgroups, imágenes base minimalistas distroless y gestión de secretos.' },
        { hito: 2, hours: 15.0, title: 'Kubernetes Cluster Deployment & Ingress Routing', focus: 'Configuración de manifests YAML, service meshes Istio, certificados mTLS y balanceadores.' },
        { hito: 3, hours: 15.0, title: 'Production Incident War Room & Root Cause Blameless Postmortem', focus: 'Manejo de llamadas de alta tensión ante caída de servicio y redacción de incident summary para el CTO.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Zero-Downtime Database Migration', focus: 'Defensa de plan de migración de base de datos relacional con réplicas activas sin pérdida de datos.' }
      ],
      aiMentor: {
        name: 'Staff SRE Dave Miller',
        title: 'Senior Site Reliability Engineering Lead',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres Dave Miller, Staff SRE en Detroit/Chicago. Valoras la precisión en latencias P99, mitigación de cascadas de fallas y comunicación técnica serena en medio del caos de un incidente.'
      },
      worldTheme: {
        biomeName: 'Mission-Critical Cloud Datacenter Pod',
        primaryColor: '#8b5cf6',
        secondaryColor: '#7c3aed',
        glowColor: 'rgba(139, 92, 246, 0.45)',
        atmosphereGradient: ['#0f172a', '#2e1065', '#581c87', '#7c3aed'],
        gridColor: 'rgba(167, 139, 250, 0.35)',
        starfieldTint: '#ddd6fe'
      }
    },
    {
      id: 'it-gestion-empresarial',
      name: 'Ingeniería en Gestión Empresarial (Nearshoring & Cadena de Suministro)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Saltillo', 'IT de Tijuana', 'IT de Aguascalientes', 'IT de Querétaro', 'IT de Cd. Victoria'],
      cluster: 'Estrategia Industrial & Nearshoring',
      primaryTrackId: 'business-leadership',
      secondaryTrackId: 'logistics-compliance',
      totalHours: 60.0,
      standards: ['T-MEC / USMCA Investment Rules', 'IMMEX SAT Reglas', 'Incoterms 2020', 'US GAAP'],
      defaultHub: 'Monterrey, Saltillo & Tijuana',
      description: 'Evaluación financiera de proyectos de reubicación fabril (Capex/Opex), costeo landed de componentes, cumplimiento de reglas de origen y presentación de planes de negocio a casa matriz.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Total Cost of Ownership (TCO) vs Landed Cost', focus: 'Modelación de costos de mano de obra directa, aranceles, inventario en tránsito y fletes.' },
        { hito: 2, hours: 15.0, title: 'IMMEX Compliance & Annex 24 Inventory Audits', focus: 'Trazabilidad de importaciones temporales de maquinaria y balances de descargo aduanal.' },
        { hito: 3, hours: 15.0, title: 'Cross-Border Boardroom Presentations & Capex Approval', focus: 'Pitch ejecutivo en inglés defendiendo la inversión de $15M USD en una nueva nave de manufactura.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Plant Relocation Feasibility Defense', focus: 'Defensa socrática ante directores de EE.UU. sobre riesgos laborales, sindicatos y proveedores Tier-2.' }
      ],
      aiMentor: {
        name: 'Managing Dir. Victoria Hayes',
        title: 'Global Nearshoring Operations & Finance Director',
        voicePersona: 'en-US-Neural2-F',
        contextPrompt: 'Eres Victoria Hayes, directora de inversiones transfronterizas. Cuestionas los supuestos de retorno de inversión (ROI), periodo de recuperación y riesgos de tipo de cambio peso/dólar.'
      },
      worldTheme: {
        biomeName: 'Executive Nearshoring Boardroom Pavilion',
        primaryColor: '#059669',
        secondaryColor: '#047857',
        glowColor: 'rgba(5, 150, 105, 0.45)',
        atmosphereGradient: ['#064e3b', '#065f46', '#047857', '#059669'],
        gridColor: 'rgba(52, 211, 153, 0.35)',
        starfieldTint: '#a7f3d0'
      }
    },
    {
      id: 'it-logistica',
      name: 'Ingeniería en Logística (TecNM)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Cd. Juárez', 'IT de Tijuana', 'IT de Querétaro', 'IT de Nogales', 'IT de Toluca', 'IT de Puebla'],
      cluster: 'Cadena de Suministro & Transporte',
      primaryTrackId: 'logistics-compliance',
      secondaryTrackId: 'advanced-supply-chain-reshoring',
      totalHours: 60.0,
      standards: ['Incoterms 2020', 'EDI 850/856 Standards', 'C-TPAT Security Criteria', 'ISO 28000'],
      defaultHub: 'Cd. Juárez, Monterrey & Nuevo Laredo',
      description: 'Gestión de centros de distribución de alta rotación (Cross-Docking), optimización de rutas terrestres intermodales, integración EDI y auditorías de seguridad en la cadena.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Warehouse Management Systems (WMS) & RF Barcoding', focus: 'Vocabulario de ubicación de slots, picking por voz, tiempo de ciclo de dock-to-stock y KPI de precisión.' },
        { hito: 2, hours: 15.0, title: 'Intermodal Freight Drayage & Border Transfer Operations', focus: 'Gestión de transfers entre patios mexicanos y bodegas de cruce en El Paso / Laredo.' },
        { hito: 3, hours: 15.0, title: 'Supply Chain Disruption Escalation & Carrier Contracting', focus: 'Renegociación de tarifas spot de autotransporte ante escasez de cajas secas refrigeradas.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Reshoring Supply Network Resilience', focus: 'Defensa de estrategia de doble abastecimiento (Dual-Sourcing) para componentes críticos de ensamble.' }
      ],
      aiMentor: {
        name: 'Dir. Marcus Thorne',
        title: 'Vice President of North American Freight Operations',
        voicePersona: 'en-US-Standard-B',
        contextPrompt: 'Eres Marcus Thorne, vicepresidente de operaciones de fletes. Exiges números claros de costo por milla, tiempos de estadía en patio (demurrage) y cero complacencia ante retrasos de entrega.'
      },
      worldTheme: {
        biomeName: 'Intermodal Logistics Drayage Terminal',
        primaryColor: '#d97706',
        secondaryColor: '#b45309',
        glowColor: 'rgba(217, 119, 6, 0.45)',
        atmosphereGradient: ['#1c1917', '#451a03', '#78350f', '#b45309'],
        gridColor: 'rgba(251, 191, 36, 0.35)',
        starfieldTint: '#fde68a'
      }
    },
    {
      id: 'it-materiales',
      name: 'Ingeniería en Materiales (Metalurgia y Ensayos No Destructivos)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Saltillo', 'IT de Morelia', 'IT de San Luis Potosí', 'IT de Chihuahua', 'IT de Zacatecas'],
      cluster: 'Ciencia de Materiales & Metalurgia',
      primaryTrackId: 'materials-nanotech',
      secondaryTrackId: 'automotive-lean',
      totalHours: 60.0,
      standards: ['ASTM E8 Tensile', 'AMS 2750 Pyrometry', 'ASNT SNT-TC-1A NDT', 'ISO 6892-1'],
      defaultHub: 'Saltillo-Monclova & Monterrey',
      description: 'Caracterización de aceros de ultra-alta resistencia (AHSS), microscopía electrónica de barrido (MEB), ensayos de ultrasonido phased-array y tratamientos térmicos aeroespaciales.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Tensile Stress-Strain Curves & Microstructure Phase ID', focus: 'Terminología de límite elástico, dureza Rockwell C, ferrita, martensita y tamaño de grano ASTM.' },
        { hito: 2, hours: 15.0, title: 'Non-Destructive Testing (NDT) & Ultrasonic Flaw Sizing', focus: 'Detección de inclusiones no metálicas, grietas por fatiga térmica y criterio de aceptación/rechazo.' },
        { hito: 3, hours: 15.0, title: 'Raw Material Supplier Non-Conformance & Heat Lot Quarantine', focus: 'Emisión de reporte técnico formal a fundiciones extranjeras exigiendo análisis de composición OES.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Catastrophic Fracture Surface Analysis', focus: 'Defensa de dictamen pericial sobre rotura frágil de un perno estructural en suspensión automotriz.' }
      ],
      aiMentor: {
        name: 'Dr. Alistair Campbell',
        title: 'Chief Metallurgist & Materials Failure Analyst',
        voicePersona: 'en-GB-Neural2-B',
        contextPrompt: 'Eres Alistair Campbell, metalurgista jefe británico. No aceptas suposiciones; exiges el examen estricto de la fractografía, diagramas de fase hierro-carbono y trazabilidad de colada.'
      },
      worldTheme: {
        biomeName: 'High-Temperature Metallurgy Crucible',
        primaryColor: '#ef4444',
        secondaryColor: '#b91c1c',
        glowColor: 'rgba(239, 68, 68, 0.45)',
        atmosphereGradient: ['#18181b', '#450a0a', '#7f1d1d', '#b91c1c'],
        gridColor: 'rgba(248, 113, 113, 0.35)',
        starfieldTint: '#fecaca'
      }
    },
    {
      id: 'it-quimica',
      name: 'Ingeniería Química y Bioquímica (Plantas de Proceso y HAZMAT)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Celaya', 'IT de Durango', 'IT de Mérida', 'IT de Minatitlán', 'IT de Toluca', 'IT de Tijuana'],
      cluster: 'Química Industrial & Bioprocesos',
      primaryTrackId: 'biotechnology',
      secondaryTrackId: 'quality-ehs',
      totalHours: 60.0,
      standards: ['OSHA 1910.119 PSM', 'EPA Clean Air Act', 'NFPA 30 Flammable Liquids', 'GHS Hazard Comm'],
      defaultHub: 'Coatzacoalcos, Monterrey & Celaya',
      description: 'Diseño y balance de reactores continuos de tanque agitado, columnas de destilación fraccionada, gestión de seguridad de procesos (PSM) y hojas SDS en inglés.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Continuous Reactor Mass & Energy Balances', focus: 'Vocabulario de transferencia de masa, cinética de reacción exotérmica y enfriamiento por camisas.' },
        { hito: 2, hours: 15.0, title: 'Process Safety Management (PSM) & HAZOP Studies', focus: 'Aplicación de palabras guía (No, More, Less, As Well As) para identificar riesgos de sobrepresión.' },
        { hito: 3, hours: 15.0, title: 'Environmental Spill Response & EPA/PROFEPA Incident Briefing', focus: 'Comunicación técnica en incidentes de fuga química con autoridades regulatorias y prensa técnica.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Thermal Runaway Reaction Containment', focus: 'Defensa del sistema de venteo de emergencia y disco de ruptura ante descontrol térmico.' }
      ],
      aiMentor: {
        name: 'Dr. Rebecca Stone',
        title: 'Senior Process Safety & Chemical Engineering Specialist',
        voicePersona: 'en-US-Neural2-F',
        contextPrompt: 'Eres la Dra. Rebecca Stone, especialista en seguridad de procesos químicos industriales. Eres sumamente rigurosa con las hojas de datos de seguridad (SDS), límites de inflamabilidad y presión de vapor.'
      },
      worldTheme: {
        biomeName: 'Continuous Chemical Processing Refiner',
        primaryColor: '#14b8a6',
        secondaryColor: '#0f766e',
        glowColor: 'rgba(20, 184, 166, 0.45)',
        atmosphereGradient: ['#042f2e', '#115e59', '#0f766e', '#14b8a6'],
        gridColor: 'rgba(45, 212, 191, 0.35)',
        starfieldTint: '#99f6e4'
      }
    },
    {
      id: 'it-automotriz',
      name: 'Ingeniería Automotriz (Sistemas de Propulsión & Movilidad Eléctrica)',
      system: 'it',
      systemLabel: 'Tecnológico Nacional de México (TecNM)',
      typicalCampuses: ['IT de Puebla', 'IT de Saltillo', 'IT de Hermosillo', 'IT de Aguascalientes', 'IT de Toluca'],
      cluster: 'Automotriz & Electromovilidad',
      primaryTrackId: 'automotive-lean',
      secondaryTrackId: 'electromobility',
      totalHours: 60.0,
      standards: ['ISO 26262 ASIL-D', 'SAE J1772 EV Charging', 'UN ECE R100 Battery Safety', 'IATF 16949'],
      defaultHub: 'Saltillo-Ramos, Puebla & Hermosillo',
      description: 'Arquitectura de paquetes de baterías de alto voltaje de 800V, inversores de carburo de silicio (SiC), protocolos CAN/LIN y seguridad funcional automotriz.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'EV High-Voltage Architecture & Inverter Topologies', focus: 'Terminología de contactores principales, aislamiento galvánico de alta tensión y refrigeración líquida.' },
        { hito: 2, hours: 15.0, title: 'Battery Management Systems (BMS) Telemetry & Cell Balancing', focus: 'Diagnóstico de sobrecarga térmica, degradación de estado de salud (SOH) y fuga térmica (Thermal Runaway).' },
        { hito: 3, hours: 15.0, title: 'Homologation Testing & NHTSA/ECE Crash Compliance', focus: 'Negociación de reportes de pruebas de choque con ingenieros de certificación en Detroit y Bruselas.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: ASIL-D Hazard Analysis & Risk Assessment (HARA)', focus: 'Defensa socrática de objetivos de seguridad funcional para evitar aceleración no intencionada del vehículo.' }
      ],
      aiMentor: {
        name: 'Chief Eng. Dieter Schmidt',
        title: 'Powertrain Electrification & Functional Safety Director',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres Dieter Schmidt, director de electrificación de tren motriz. Eres analítico y minucioso; exiges justificaciones matemáticas de disipación de potencia y rigor en la norma ISO 26262.'
      },
      worldTheme: {
        biomeName: '800V EV Gigafactory Testing Circuit',
        primaryColor: '#0284c7',
        secondaryColor: '#0369a1',
        glowColor: 'rgba(2, 132, 199, 0.45)',
        atmosphereGradient: ['#082f49', '#075985', '#0284c7', '#38bdf8'],
        gridColor: 'rgba(56, 189, 248, 0.35)',
        starfieldTint: '#e0f2fe'
      }
    },

    // ════════════════════════════════════════════════════════════════════════
    // 3. UNIVERSIDADES ESTATALES Y AUTÓNOMAS DE MÉXICO
    // ════════════════════════════════════════════════════════════════════════
    {
      id: 'est-aeroespacial',
      name: 'Ingeniería Aeroespacial y Aviónica (UNAM, IPN, UAQ, UABC, UANL)',
      system: 'univ-estatal',
      systemLabel: 'Universidades Estatales y Autónomas',
      typicalCampuses: ['Universidad Nacional Autónoma de México (UNAM)', 'Instituto Politécnico Nacional (UPIITA / ESIME)', 'Universidad Autónoma de Querétaro (UAQ)', 'Universidad Autónoma de Baja California (UABC)', 'Universidad Autónoma de Nuevo León (UANL)'],
      cluster: 'Aeroespacial & Defensa',
      primaryTrackId: 'aerospace',
      secondaryTrackId: 'airforce-aerospace',
      totalHours: 60.0,
      standards: ['AS9100 Rev D', 'RTCA DO-178C / DO-254', 'MIL-STD-1553B Bus', 'FAA 14 CFR Part 21'],
      defaultHub: 'Querétaro, Mexicali & Chihuahua',
      description: 'Manufactura de aeroestructuras de fibra de carbono, arneses de aviónica para aeronaves comerciales y de defensa, túneles de viento supersónicos y certificación de aeronavegabilidad.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Carbon-Fiber Autoclave Curing & Non-Destructive Tap Testing', focus: 'Vocabulario de delaminación, resinas epóxicas aeroespaciales, porosidad y curado al vacío.' },
        { hito: 2, hours: 15.0, title: 'Avionics Bus Architecture & MIL-STD-1553B Protocol', focus: 'Depuración de mensajes comando/respuesta, decodificación Manchester II y transformadores de acoplo.' },
        { hito: 3, hours: 15.0, title: 'FAA/DGAC Airworthiness Directive Concession Reviews', focus: 'Defensa técnica de concesión de ingeniería para ensamble de empenaje con auditores de Boeing.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: DO-254 DAL-A Hardware Assurance Board', focus: 'Tribunal sumativo de certificación de hardware aviónico crítico para vuelo sin fallas de modo común.' }
      ],
      aiMentor: {
        name: 'Capt. Alistair Ross',
        title: 'Chief Flight Systems Engineer & FAA Designated Airworthiness Rep',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres el Capitán Alistair Ross, ingeniero aeroespacial y representante de certificación de la FAA. Exiges precisión absoluta en tolerancias de aeronavegabilidad, redundancia y análisis de modos de falla.'
      },
      worldTheme: {
        biomeName: 'Orbital Hangar & Supersonic Wind Tunnel',
        primaryColor: '#0284c7',
        secondaryColor: '#0369a1',
        glowColor: 'rgba(2, 132, 199, 0.5)',
        atmosphereGradient: ['#020617', '#082f49', '#0c4a6e', '#0369a1'],
        gridColor: 'rgba(56, 189, 248, 0.4)',
        starfieldTint: '#38bdf8'
      }
    },
    {
      id: 'est-biomedica',
      name: 'Ingeniería Biomédica e Instrumentación Quirúrgica (UAM, UDG, UANL, IBERO)',
      system: 'univ-estatal',
      systemLabel: 'Universidades Estatales y Autónomas',
      typicalCampuses: ['Universidad Autónoma Metropolitana (UAM)', 'Universidad de Guadalajara (UDG)', 'Universidad Autónoma de Nuevo León (UANL)', 'Universidad Autónoma de Ciudad Juárez (UACJ)'],
      cluster: 'Dispositivos Médicos & BioTech',
      primaryTrackId: 'medical-devices',
      secondaryTrackId: 'healthcare-tech',
      totalHours: 60.0,
      standards: ['FDA 21 CFR § 820 Quality System', 'ISO 13485:2016', 'ISO 11135 EtO Sterilization', 'EU MDR 2017/745'],
      defaultHub: 'Tijuana, Cd. Juárez & Guadalajara',
      description: 'Manufactura de catéteres cardiovasculares, implantes ortopédicos de titanio, esterilización por óxido de etileno (EtO), cuartos limpios ISO Clase 7 y defensa de auditorías FDA Form 483.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Cleanroom ISO Class 7 Gowning & Particulate Monitoring', focus: 'Protocolos de cuartos limpios, bioburden microbiológico, diferenciales de presión y vestimenta estéril.' },
        { hito: 2, hours: 15.0, title: 'Tyvek Heat Sealing & ASTM F1929 Dye Penetration Testing', focus: 'Validación de barrera estéril, parámetros de termosellado (temperatura, tiempo, presión) y prueba de tinte.' },
        { hito: 3, hours: 15.0, title: 'FDA Investigator Audit Defense & Form 483 CAPA Closeout', focus: 'Respuesta oral y documental en inglés ante un inspector de la FDA por una no conformidad de sellado.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Class III Implantable Risk Management (ISO 14971)', focus: 'Defensa del archivo de gestión de riesgos (RMF) y justificación de nivel de aseguramiento de esterilidad.' }
      ],
      aiMentor: {
        name: 'Lead Auditor Arthur Vance',
        title: 'Former FDA Investigator & Senior MedTech Regulatory Auditor',
        voicePersona: 'en-US-Standard-B',
        contextPrompt: 'Eres Arthur Vance, ex-investigador de la FDA y auditor líder ISO 13485. Eres implacable con la integridad de datos (ALCOA+), trazabilidad de lotes clínicos y defensa de CAPA sin ambigüedades.'
      },
      worldTheme: {
        biomeName: 'ISO Class 7 Sterile Medical Cleanroom',
        primaryColor: '#06b6d4',
        secondaryColor: '#0891b2',
        glowColor: 'rgba(6, 182, 212, 0.45)',
        atmosphereGradient: ['#042f2e', '#0e7490', '#155e75', '#0891b2'],
        gridColor: 'rgba(34, 211, 238, 0.35)',
        starfieldTint: '#67e8f9'
      }
    },
    {
      id: 'est-semiconductores',
      name: 'Ingeniería en Semiconductores y Microelectrónica (UDG, UNAM, IPN, UACJ, ITSON)',
      system: 'univ-estatal',
      systemLabel: 'Universidades Estatales y Autónomas',
      typicalCampuses: ['Universidad de Guadalajara (UDG)', 'CINVESTAV / IPN', 'Universidad Autónoma de Ciudad Juárez (UACJ)', 'Instituto Tecnológico de Sonora (ITSON)'],
      cluster: 'Semiconductores & Fotónica',
      primaryTrackId: 'semiconductors',
      secondaryTrackId: 'materials-nanotech',
      totalHours: 60.0,
      standards: ['SEMI Standards (E10, E30, SECS/GEM)', 'ISO 14644-1 Class 1', 'IEEE 1500 Embedded Core Test'],
      defaultHub: 'Guadalajara (Silicon Valley Mexicano) & Mexicali',
      description: 'Procesamiento de obleas de silicio de 300mm, fotolitografía ultravioleta extrema (EUV), empaquetado avanzado 2.5D/3D Chiplets, curvas Shmoo y pruebas de rendimiento de silicio.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Cleanroom ISO Class 1 Laminar Airflow & Chemical Etching', focus: 'Protocolos de litografía, deposición de vapor químico (CVD), grabado iónico reactivo (RIE) y dopado.' },
        { hito: 2, hours: 15.0, title: 'Automatic Test Equipment (ATE) & Scan-Chain Shmoo Plots', focus: 'Medición de voltaje vs frecuencia, localización de bits fallidos en memorias SRAM y rendimiento de oblea.' },
        { hito: 3, hours: 15.0, title: 'Yield Fallout Review with Austin & Hsinchu Fab Managers', focus: 'Junta de emergencia en inglés analizando una caída de 4% en yield por contaminación de partículas.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Advanced 2.5D Chiplet Substrate Warpage', focus: 'Defensa de solución para pandeo de interposer de silicio durante el reflow de microbumps.' }
      ],
      aiMentor: {
        name: 'Dr. Raymond Zhao',
        title: 'Vice President of Fab Operations & Advanced Silicon Yield',
        voicePersona: 'en-US-Neural2-A',
        contextPrompt: 'Eres el Dr. Raymond Zhao, vicepresidente de operaciones de semiconductores. Tu enfoque es el rendimiento por oblea (yield), la densidad de defectos D0 y la física de dispositivos a escala nanométrica.'
      },
      worldTheme: {
        biomeName: 'EUV Photolithography Cleanroom Fab',
        primaryColor: '#0ea5e9',
        secondaryColor: '#0284c7',
        glowColor: 'rgba(14, 165, 233, 0.5)',
        atmosphereGradient: ['#020617', '#0c4a6e', '#075985', '#0284c7'],
        gridColor: 'rgba(56, 189, 248, 0.4)',
        starfieldTint: '#7dd3fc'
      }
    },
    {
      id: 'est-ia-datos',
      name: 'Ingeniería en Inteligencia Artificial y Ciencia de Datos (IPN UPIITA, UNAM, UANL)',
      system: 'univ-estatal',
      systemLabel: 'Universidades Estatales y Autónomas',
      typicalCampuses: ['UPIITA - Instituto Politécnico Nacional', 'Facultad de Ingeniería - UNAM', 'FIME - Universidad Autónoma de Nuevo León', 'CUCEI - Universidad de Guadalajara'],
      cluster: 'Inteligencia Artificial & Edge AI',
      primaryTrackId: 'ai-ml',
      secondaryTrackId: 'web-dev-agentic',
      totalHours: 60.0,
      standards: ['NIST AI Risk Management Framework', 'MLOps Model Governance', 'ISO/IEC 42001', 'ONNX Runtime'],
      defaultHub: 'CDMX, Guadalajara & Monterrey',
      description: 'Modelos de visión artificial para control de calidad en tiempo real en línea, cuantización int8 para Edge AI en microcontroladores y gobernanza de modelos de IA.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Industrial Computer Vision & Zero-Shot Anomaly Detection', focus: 'Vocabulario de tensores, matrices de confusión, precisión/recall y preprocesamiento de imágenes.' },
        { hito: 2, hours: 15.0, title: 'Model Quantization (FP32 to INT8) & Edge Deployment', focus: 'Compilación con TensorRT, optimización de memoria VRAM e inferencia a 60 FPS en hardware de borde.' },
        { hito: 3, hours: 15.0, title: 'AI Ethics, Algorithmic Bias & Customer Executive Reviews', focus: 'Presentación en inglés de falsos positivos y falsos negativos ante la dirección general de planta.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Drift Detection & Automated Retraining', focus: 'Defensa de arquitectura MLOps para detectar data drift cuando cambia la iluminación de la línea.' }
      ],
      aiMentor: {
        name: 'Dr. Priya Ramanathan',
        title: 'Head of Industrial AI & Applied Machine Learning Research',
        voicePersona: 'en-IN-Neural2-D',
        contextPrompt: 'Eres la Dra. Priya Ramanathan, directora de investigación en IA industrial. Evalúas la comprensión rigurosa de funciones de pérdida, convergencia de gradientes y métricas de generalización.'
      },
      worldTheme: {
        biomeName: 'Neural Tensor Accelerator Core',
        primaryColor: '#a855f7',
        secondaryColor: '#9333ea',
        glowColor: 'rgba(168, 85, 247, 0.45)',
        atmosphereGradient: ['#0f172a', '#3b0764', '#6b21a8', '#9333ea'],
        gridColor: 'rgba(192, 132, 252, 0.35)',
        starfieldTint: '#e9d5ff'
      }
    },
    {
      id: 'est-ciberseguridad',
      name: 'Ingeniería en Ciberseguridad y Redes Críticas (UANL, UABC, UAQ, IPN)',
      system: 'univ-estatal',
      systemLabel: 'Universidades Estatales y Autónomas',
      typicalCampuses: ['Universidad Autónoma de Nuevo León (UANL)', 'Universidad Autónoma de Baja California (UABC)', 'Universidad Autónoma de Querétaro (UAQ)', 'UPIITA - IPN'],
      cluster: 'Ciberseguridad OT/ICS',
      primaryTrackId: 'cybersecurity',
      secondaryTrackId: 'telecom-iot',
      totalHours: 60.0,
      standards: ['IEC 62443 Industrial Security', 'NIST SP 800-82 OT Security', 'MITRE ATT&CK for ICS', 'ISO 27001'],
      defaultHub: 'Monterrey, Tijuana & Querétaro',
      description: 'Defensa de redes operacionales de planta (OT/SCADA), aislamiento de redes air-gapped, análisis de malware industrial y auditorías de penetración ética en PLCs.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Purdue Model Level 3.5 Industrial DMZ Segmentation', focus: 'Configuración de firewalls DPI, terminación de sesiones y políticas de mínimo privilegio en planta.' },
        { hito: 2, hours: 15.0, title: 'Modbus TCP & CIP Protocol Anomaly Detection', focus: 'Análisis de capturas Wireshark para detectar inyección de código de función no autorizado en PLCs.' },
        { hito: 3, hours: 15.0, title: 'Ransomware Incident Response & C-Level Crisis Briefing', focus: 'Liderazgo en inglés de la sala de guerra durante un ataque dirigido a los servidores SCADA de la planta.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Industrial Air-Gap Breach Forensic Audit', focus: 'Defensa del reporte forense demostrando el vector de entrada vía memoria USB de un contratista.' }
      ],
      aiMentor: {
        name: 'Chief CISO Marcus Thorne',
        title: 'Global Head of Industrial OT/ICS Cybersecurity Defense',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres Marcus Thorne, CISO especializado en ciberseguridad de infraestructura crítica y plantas nucleares/automotrices. Eres inflexible con la segmentación Purdue y la autenticación multifactor.'
      },
      worldTheme: {
        biomeName: 'Air-Gapped SCADA Cyber Defense Vault',
        primaryColor: '#0ea5e9',
        secondaryColor: '#0284c7',
        glowColor: 'rgba(14, 165, 233, 0.45)',
        atmosphereGradient: ['#030712', '#082f49', '#0369a1', '#0284c7'],
        gridColor: 'rgba(56, 189, 248, 0.35)',
        starfieldTint: '#38bdf8'
      }
    },
    {
      id: 'est-comercio-internacional',
      name: 'Licenciatura en Negocios y Comercio Internacional IMMEX (UNAM, UDG, UANL)',
      system: 'univ-estatal',
      systemLabel: 'Universidades Estatales y Autónomas',
      typicalCampuses: ['Facultad de Contaduría y Administración - UNAM', 'CUCEA - Universidad de Guadalajara', 'FACPYA - Universidad Autónoma de Nuevo León', 'FCA - UABC Tijuana'],
      cluster: 'Negocios & Comercio Exterior',
      primaryTrackId: 'business-leadership',
      secondaryTrackId: 'logistics-compliance',
      totalHours: 60.0,
      standards: ['T-MEC / USMCA Reglas de Origen', 'Incoterms 2020', 'Anexo 24 y 31 SAT', 'C-TPAT Security'],
      defaultHub: 'Monterrey, Guadalajara, Tijuana & CDMX',
      description: 'Estructuración de contratos transfronterizos de suministro, cálculo del valor de contenido regional (VCR) para exención arancelaria y defensa de auditorías fiscales de comercio exterior.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'USMCA Regional Value Content (RVC) Calculation', focus: 'Método de costo neto vs método de valor de transacción, listas de materiales (BOM) y rastreo de origen.' },
        { hito: 2, hours: 15.0, title: 'IMMEX Virtual Pedimentos & Sub-Maquila Transfers', focus: 'Regulación de transferencias virtuales de inventario entre maquiladoras bajo pedimentos clave V1.' },
        { hito: 3, hours: 15.0, title: 'Contract Dispute Negotiation with US Corporate Counsel', focus: 'Negociación de cláusulas de fuerza mayor y asignación de demoras de flete con abogados en Chicago.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Tariff Retaliation Strategy Simulation', focus: 'Defensa de plan de contingencia ante aranceles intempestivos o disputas comerciales internacionales.' }
      ],
      aiMentor: {
        name: 'Managing Partner Sarah Sterling',
        title: 'Senior Partner in Cross-Border Trade & Corporate Arbitration',
        voicePersona: 'en-US-Neural2-C',
        contextPrompt: 'Eres Sarah Sterling, abogada corporativa de arbitraje comercial internacional. Exiges rigor en la interpretación textual de los capítulos del T-MEC y redacción legal precisa sin ambigüedades.'
      },
      worldTheme: {
        biomeName: 'International Trade Arbitration Chamber',
        primaryColor: '#d97706',
        secondaryColor: '#b45309',
        glowColor: 'rgba(217, 119, 6, 0.45)',
        atmosphereGradient: ['#1c1917', '#451a03', '#78350f', '#b45309'],
        gridColor: 'rgba(251, 191, 36, 0.35)',
        starfieldTint: '#fde68a'
      }
    },

    // ════════════════════════════════════════════════════════════════════════
    // 4. UNIVERSIDADES DE LATINOAMÉRICA (LATAM)
    // ════════════════════════════════════════════════════════════════════════
    {
      id: 'latam-automatizacion-scada',
      name: 'Ingeniería en Automatización y Control Industrial (UTN Argentina, Univs LATAM)',
      system: 'latam',
      systemLabel: 'Universidades de Latinoamérica (LATAM)',
      typicalCampuses: ['Universidad Tecnológica Nacional (UTN Argentina)', 'Politécnico Grancolombiano / SENA (Colombia)', 'Universidad Técnica Federico Santa María (Chile)', 'Universidad Nacional de Ingeniería (UNI Perú)'],
      cluster: 'Automatización & Control Regional',
      primaryTrackId: 'robotics-automation',
      secondaryTrackId: 'industrial-operations',
      totalHours: 60.0,
      standards: ['ISA-95 Enterprise-Control System Integration', 'OPC Unified Architecture (OPC UA)', 'IEC 61131-3'],
      defaultHub: 'Buenos Aires, Medellín, Santiago & Lima',
      description: 'Integración de sistemas SCADA con servidores MES industriales, telemetría OPC-UA para plantas mineras, petroquímicas y de alimentos, y control distribuido DCS.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'ISA-95 Enterprise Level Hierarchy & OPC-UA Data Models', focus: 'Mapeo de variables de proceso, tipos de datos estructurados, suscripciones y seguridad por certificados.' },
        { hito: 2, hours: 15.0, title: 'Distributed Control Systems (DCS) & Loop Tuning', focus: 'Sintonización de lazos PID con criterios Ziegler-Nichols, respuesta al escalón y tiempos muertos.' },
        { hito: 3, hours: 15.0, title: 'Multi-National Vendor Acceptance Testing (FAT/SAT)', focus: 'Liderazgo de pruebas de aceptación en fábrica (FAT) en inglés con proveedores alemanes y japoneses.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Mining Flotation Cell Runaway Stabilization', focus: 'Defensa de estrategia de control para estabilizar nivel y flujo en celdas de flotación de cobre.' }
      ],
      aiMentor: {
        name: 'Ing. Carlos Menéndez',
        title: 'Director of Industrial SCADA & DCS Integration for LATAM',
        voicePersona: 'en-US-Neural2-D',
        contextPrompt: 'Eres Carlos Menéndez, director de automatización pesada en plantas mineras y petroquímicas de Sudamérica. Eres pragmático y riguroso con la disponibilidad del 99.99% de los lazos de control.'
      },
      worldTheme: {
        biomeName: 'Mining & Heavy Processing SCADA Hub',
        primaryColor: '#f97316',
        secondaryColor: '#ea580c',
        glowColor: 'rgba(249, 115, 22, 0.45)',
        atmosphereGradient: ['#1c1917', '#431407', '#7c2d12', '#ea580c'],
        gridColor: 'rgba(251, 146, 60, 0.35)',
        starfieldTint: '#fdba74'
      }
    },
    {
      id: 'latam-telecomunicaciones',
      name: 'Ingeniería en Telecomunicaciones y Telemática (LATAM)',
      system: 'latam',
      systemLabel: 'Universidades de Latinoamérica (LATAM)',
      typicalCampuses: ['Universidad de Buenos Aires (UBA)', 'Universidad de Chile', 'Universidad Nacional de Colombia', 'Pontificia Universidad Católica del Perú (PUCP)'],
      cluster: 'Telecomunicaciones & Redes Móviles',
      primaryTrackId: 'telecom-iot',
      secondaryTrackId: 'cybersecurity',
      totalHours: 60.0,
      standards: ['3GPP 5G NR Standards', 'ITU-T Recommendations', 'IEEE 802.11ax/be Wi-Fi 7', 'DWDM Optical Transport'],
      defaultHub: 'Regional LATAM & Conectividad Transfronteriza',
      description: 'Redes celulares 5G privadas para plantas industriales, enlaces de microondas de alta capacidad, transporte óptico submarino DWDM y protocolos IoT LoRaWAN.',
      milestones: [
        { hito: 1, hours: 15.0, title: '5G Private Standalone (SA) Core Architecture in Plants', focus: 'Vocabulario de network slicing, gNodeB, control de latencia ultra-baja (URLLC) y antenas MIMO masivas.' },
        { hito: 2, hours: 15.0, title: 'Optical Spectrum Analysis & DWDM Wavelength Routing', focus: 'Atenuación por kilómetro, dispersión cromática, relación señal-ruido óptica (OSNR) y amplificadores EDFA.' },
        { hito: 3, hours: 15.0, title: 'International Carrier Peering & SLA Negotiations', focus: 'Negociación de acuerdos de nivel de servicio con proveedores globales de tránsito IP en Miami y Dallas.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Subsea Fiber Optic Cut Emergency Rerouting', focus: 'Defensa del protocolo de redundancia ante el corte físico de un enlace de fibra óptica submarino.' }
      ],
      aiMentor: {
        name: 'Dir. Helen Ward',
        title: 'Global Telecom Infrastructure & Subsea Network Director',
        voicePersona: 'en-US-Neural2-F',
        contextPrompt: 'Eres Helen Ward, directora global de infraestructura de telecomunicaciones. Eres directa y analítica; exiges la justificación de atenuación en decibelios (dB) y la arquitectura de respaldo de red.'
      },
      worldTheme: {
        biomeName: '5G Core & Transcontinental Fiber Nexus',
        primaryColor: '#0ea5e9',
        secondaryColor: '#0284c7',
        glowColor: 'rgba(14, 165, 233, 0.45)',
        atmosphereGradient: ['#020617', '#082f49', '#0369a1', '#0284c7'],
        gridColor: 'rgba(56, 189, 248, 0.35)',
        starfieldTint: '#38bdf8'
      }
    },
    {
      id: 'latam-agroindustria-bioprocesos',
      name: 'Ingeniería Agroindustrial y Bioprocesos de Exportación (LATAM)',
      system: 'latam',
      systemLabel: 'Universidades de Latinoamérica (LATAM)',
      typicalCampuses: ['Universidad Zamorano', 'Universidad Nacional Agraria La Molina (Perú)', 'Universidad de Caldas (Colombia)', 'INTA / UBA (Argentina)'],
      cluster: 'Agroindustria & Biotecnología',
      primaryTrackId: 'food-science',
      secondaryTrackId: 'biotechnology',
      totalHours: 60.0,
      standards: ['FDA FSMA Food Safety', 'GlobalG.A.P. Standards', 'HACCP Codex Alimentarius', 'Cold Chain GDP'],
      defaultHub: 'Bajío México, Valle del Cauca, Valle Central Chile & Mendoza',
      description: 'Cadena de frío controlada con sensores IoT, inocuidad alimentaria según FSMA para exportación a EE.UU., liofilización industrial y procesamiento enzimático de alta gama.',
      milestones: [
        { hito: 1, hours: 15.0, title: 'Cold Chain IoT Telemetry & Thermal Excursions', focus: 'Monitoreo de contenedores refrigerados reefer, control de atmósfera modificada y registro de temperatura.' },
        { hito: 2, hours: 15.0, title: 'HACCP Critical Control Points (CCP) & Pathogen Testing', focus: 'Identificación de riesgos microbiológicos (Listeria, Salmonella), límites críticos y acciones correctivas.' },
        { hito: 3, hours: 15.0, title: 'FDA Detention at Port of Entry & Lab Retest Defense', focus: 'Defensa técnica ante la detención de un embarque agrícola en el puerto de Long Beach o Pharr.' },
        { hito: 4, hours: 15.0, title: 'Socratic AI Capstone: Industrial Lyophilization Cycle Validation', focus: 'Defensa de la receta térmica de liofilización para preservar bioactivos sin pérdida nutricional.' }
      ],
      aiMentor: {
        name: 'Dr. Fernando Salgado',
        title: 'Senior Food Safety & Agro-Export Compliance Director',
        voicePersona: 'en-US-Standard-B',
        contextPrompt: 'Eres Fernando Salgado, experto en inocuidad alimentaria y normativas de importación de la FDA. Exiges verificación documental rigurosa de puntos críticos de control y cadena de frío ininterrumpida.'
      },
      worldTheme: {
        biomeName: 'Precision Agro-Biotech Cold Vault',
        primaryColor: '#84cc16',
        secondaryColor: '#65a30d',
        glowColor: 'rgba(132, 204, 22, 0.45)',
        atmosphereGradient: ['#14532d', '#166534', '#15803d', '#65a30d'],
        gridColor: 'rgba(163, 230, 53, 0.35)',
        starfieldTint: '#d9f99d'
      }
    }
  ];

  // Inyectar el seed determinista en cada carrera y generar sus coordenadas
  CAREERS.forEach(career => {
    const seed = hashString(career.id);
    career.worldTheme.seed = seed;
    const rng = seededRandom(seed);
    career.worldTheme.rng = rng;

    // Generar coordenadas deterministas para los 16 nodos del mundo de esta carrera
    career.worldTheme.nodeCoordinates = [];
    const totalNodes = 16;
    for (let i = 0; i < totalNodes; i++) {
      const frac = i / (totalNodes - 1);
      // Espiral esférica única pero determinista para la carrera
      const lon = (rng() * 0.3) + frac * (4.2 * Math.PI);
      let lat = 0.70 - frac * 1.40 + (Math.sin(i * 1.45 + seed % 7) * 0.12);
      lat = Math.max(-1.18, Math.min(1.18, lat));

      const x = Math.cos(lat) * Math.sin(lon);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon);

      career.worldTheme.nodeCoordinates.push({
        step: i + 1,
        milestoneIndex: Math.floor(i / 4) + 1,
        ux: x,
        uy: y,
        uz: z,
        nodeType: (i % 4 === 3) ? 'milestone-checkpoint' : 'skill-puck'
      });
    }
  });

  return {
    INSTITUTION_TYPES: INSTITUTION_TYPES,
    CAREERS: CAREERS,
    getCareerById: function(id) {
      return CAREERS.find(c => c.id === id) || CAREERS[0];
    },
    getCareersBySystem: function(system) {
      return CAREERS.filter(c => c.system === system);
    },
    // Garantiza que dos alumnos de la misma carrera vean exactamente el mismo mundo
    getSharedWorldTheme: function(careerId) {
      const career = this.getCareerById(careerId);
      return career.worldTheme;
    }
  };
}));
