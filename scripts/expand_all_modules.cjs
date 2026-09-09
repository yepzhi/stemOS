// scripts/expand_all_modules.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// 1. CYBERSECURITY: OT/ICS Zero-Trust Architecture (cyber-m1)
// -------------------------------------------------------------
const cyberReading = `
> **Industry Alignment & Security Standard**: Aligned with **IEC 62443 (Industrial Network and System Security)** and **NIST SP 800-82 (Guide to Operational Technology Security)**. Prepares plant engineers to defend air-gapped supervisory control and data acquisition (SCADA) environments.

# OT/ICS Zero-Trust Architecture & Air-Gapped Networks: Industrial Defense Blueprint

In traditional manufacturing plants, the **Purdue Enterprise Reference Model** segmented Information Technology (IT) from Operational Technology (OT) networks using perimeter firewalls. Today, modern smart factories and Industrial IoT integration have eliminated the concept of a "trusted internal zone," making **Zero-Trust Architecture (ZTA)** an operational imperative.

## 1. The Purdue Model and the Air-Gap Myth

1. **Air-Gapped Networks**: An air-gap physically isolates a secure industrial network from external networks (the Internet and corporate IT). However, modern targeted malware (e.g., Stuxnet, Industroyer) routinely bridges physical air-gaps via compromised vendor maintenance laptops, infected USB firmware update keys, and dual-homed industrial jump boxes.
2. **Purdue Segmentation (Levels 0 to 3)**:
   - **Level 0 (Process)**: Physical sensors, actuators, conveyor motors, and robotic servodrives.
   - **Level 1 (Basic Control)**: **Programmable Logic Controllers (PLCs)** and Remote Terminal Units (RTUs) executing real-time ladder logic loops.
   - **Level 2 (Supervisory Control)**: Human-Machine Interfaces (HMIs) and Supervisory Control and Data Acquisition (**SCADA**) servers.
   - **Level 3 (Operations Management)**: Manufacturing Execution Systems (**MES**), plant historians, and batch management databases.
   - **Industrial Demilitarized Zone (IDMZ / Level 3.5)**: The mandatory isolation barrier where all cross-domain sessions terminate. Direct Level 4 (Corporate IT) to Level 1 connections are strictly prohibited.

## 2. Inherent Vulnerabilities of Legacy Industrial Protocols

Legacy OT protocols were engineered in the 1970s for reliability and low latency over RS-485 serial lines, with **zero built-in encryption or authentication**:
- **Modbus TCP**: Operates over TCP port 502 with plaintext function codes. Any host capable of sending raw TCP packets can inject unauthenticated command codes (e.g., \`Function Code 05: Force Single Coil\`), halting cooling pumps or altering thermal setpoints without credentials.
- **EtherNet/IP & CIP**: Lacks cryptographic nonces, rendering sessions vulnerable to packet replay and unauthorized firmware injection attacks.
- **DNP3**: Without Secure Authentication (SAv5), allows unauthorized broadcast commands to open electrical distribution circuit breakers.

## 3. Implementing Zero-Trust Microsegmentation

To mitigate lateral traversal across manufacturing lines, engineers implement **Zero-Trust Microsegmentation**:
1. **Never Trust, Always Verify**: Every device, PLC, and maintenance workstation must mutually authenticate before establishing a control session, regardless of physical port location.
2. **Deep Packet Inspection (DPI) Firewalls**: Inline industrial firewalls inspect application-layer payload bytes. Instead of merely allowing TCP port 502, the DPI engine enforces whitelist policies (e.g., allowing read telemetry while dropping write commands unless signed by an authorized engineering station).
3. **Micro-Perimeter Defense**: Isolating individual robotic cells into micro-segments prevents an infection on Line 1 from propagating laterally to the chassis assembly line.

---
> **Key Takeaway**: Industrial cybersecurity bridges **deterministic real-time control (PLCs, Modbus TCP, SCADA)** with **cryptographic zero-trust policies (IEC 62443, microsegmentation, DPI firewalls)**. Mastering technical English in this domain is essential for defending critical nearshoring manufacturing infrastructure.
`;

const cyberDialogue = {
  title: "Emergency ICS Incident Response: Modbus Packet Injection in the Assembly Subnet",
  titleES: "Respuesta a Incidentes en Sistemas de Control: Inyección de Paquetes Modbus en la Subred de Ensamble",
  scenarioContext: "Detroit, MI (Global Cyber Defense Center) ⇄ Saltillo, Coahuila (Automotive Powertrain Assembly Plant). Critical Severity 1 Teams Call.",
  characters: [
    { name: "Marcus Brody", role: "Global CISO & VP of Industrial Cybersecurity (Detroit)", avatar: "MB", color: "var(--cyan)" },
    { name: "Ing. Valeria Ramos", role: "Lead OT Security & SCADA Systems Engineer (Saltillo)", avatar: "VR", color: "var(--rose)" }
  ],
  turns: [
    {
      speaker: "Marcus Brody",
      text: "Valeria, our SIEM detected anomalous telemetry coming from the Saltillo Cell 3 stamping line. We're seeing hundreds of unauthenticated Modbus TCP write commands hitting the safety PLC. Has physical safety been compromised?",
      translation: "Valeria, nuestro SIEM detectó telemetría anómala proveniente de la línea de troquelado de la Celda 3 en Saltillo. Estamos viendo cientos de comandos de escritura Modbus TCP no autenticados impactando el PLC de seguridad. ¿Se comprometió la seguridad física?",
      targetTerms: ["SIEM", "telemetry", "Modbus TCP", "safety PLC"]
    },
    {
      speaker: "Ing. Valeria Ramos",
      text: "Negative on safety compromise, Marcus. The safety relay circuits are hardwired. However, our Deep Packet Inspection (DPI) firewall flagged unauthorized packets attempting to force coil 0x0412 on the hydraulic press PLC. The traffic originated from a contractor jump box inside Level 2.",
      translation: "Negativo en compromiso de seguridad, Marcus. Los circuitos de relevadores de seguridad están cableados físicamente. Sin embargo, nuestro firewall de Inspección Profunda de Paquetes (DPI) alertó sobre paquetes no autorizados intentando forzar la bobina 0x0412 en el PLC de la prensa hidráulica. El tráfico se originó desde una máquina puente de un contratista en el Nivel 2.",
      targetTerms: ["Deep Packet Inspection (DPI)", "force coil", "hydraulic press PLC", "jump box"]
    },
    {
      speaker: "Marcus Brody",
      text: "Isolate that jump box immediately. Sever the VLAN trunk and enforce microsegmentation on the Industrial DMZ. Did the attacker establish lateral movement into the robot cell controllers?",
      translation: "Aísla esa máquina puente de inmediato. Corta el enlace troncal VLAN y fuerza microsegmentación en la DMZ Industrial. ¿El atacante logró movimiento lateral hacia los controladores de las celdas de robots?",
      targetTerms: ["sever the VLAN trunk", "microsegmentation", "Industrial DMZ", "lateral movement"]
    },
    {
      speaker: "Ing. Valeria Ramos",
      text: "No lateral movement observed. Our zero-trust policy strictly dropped all egress traffic to Level 1. I revoked the contractor's Kerberos certificate and locked down port 502 with an explicit IP whitelist. The stamping line is operating deterministically.",
      translation: "No se observó movimiento lateral. Nuestra política de zero-trust descartó estrictamente todo el tráfico de salida hacia el Nivel 1. Revoqué el certificado Kerberos del contratista y bloqueé el puerto 502 con una lista blanca explícita de IPs. La línea de troquelado opera de forma determinista.",
      targetTerms: ["zero-trust policy", "egress traffic", "Kerberos certificate", "operating deterministically"]
    }
  ],
  contrastTips: [
    {
      school: "The computer had a virus and the machine stopped.",
      native: "The DPI industrial firewall intercepted an unauthenticated Modbus packet injection targeting PLC coil setpoints.",
      explanation: "En la escuela se dice 'the computer had a virus', pero en ciberseguridad industrial se especifica el vector de ataque exacto (packet injection, protocol payload, setpoint manipulation)."
    },
    {
      school: "Separate network with no internet.",
      native: "Air-gapped Purdue Level 1/2 control architecture with microsegmented Industrial DMZ.",
      explanation: "No se usa 'no internet'; los clientes de EE.UU. exigen especificar la arquitectura de aislamiento conforme al modelo Purdue e IEC 62443."
    }
  ]
};

const cyberLexicon = [
  {
    term: "Air-Gapped Network",
    ipa: "/ˈɛər.ɡæpt ˈnɛt.wɜːrk/",
    es: "Red Aislada Físicamente (Air-Gap)",
    category: "Arquitectura de Red",
    definition: "Physical network isolation measure ensuring that a secure computer network is completely separated from unsecured networks.",
    collocations: ["bridge the air gap", "air-gapped SCADA environment", "strict air-gap policy"],
    falseFriends: "No es simplemente 'desconectar el Wi-Fi'; implica aislamiento galvánico de fibra y prohibición de medios extraíbles.",
    nativeUsage: "The nuclear plant's safety PLCs run in a strictly air-gapped network with dual-custody physical access controls."
  },
  {
    term: "Purdue Enterprise Reference Model",
    ipa: "/pɜːrˈduː ˈɛn.tər.praɪz/",
    es: "Modelo de Referencia Purdue",
    category: "Estándar Arquitectónico",
    definition: "Hierarchical reference architecture defining network segmentation levels (0 to 5) for Industrial Control Systems (ICS).",
    collocations: ["Purdue Model segmentation", "Level 3.5 Industrial DMZ", "collapse the Purdue model"],
    falseFriends: "No es una marca comercial; es el estándar de facto ISA-95 para seguridad de redes de manufactura.",
    nativeUsage: "Engineers must never permit direct TCP routing from Level 4 enterprise IT down to Level 1 controller subnets."
  },
  {
    term: "Modbus TCP",
    ipa: "/ˈmɒd.bʌs ˌtiː.siːˈpiː/",
    es: "Protocolo Modbus TCP",
    category: "Protocolo Industrial",
    definition: "Industrial communications protocol operating on port 502 transmitting raw telemetry and control coils over Ethernet.",
    collocations: ["unencrypted Modbus payload", "Modbus function code 05", "Modbus polling cycle"],
    falseFriends: "Modbus carece por diseño de autenticación; cualquier paquete en la subred puede forzar bobinas (coils) físicas.",
    nativeUsage: "The Deep Packet Inspection engine drops any Modbus TCP packet attempting unauthorized coil writes during production."
  },
  {
    term: "Programmable Logic Controller (PLC)",
    ipa: "/ˈproʊ.ɡræm.ə.bəl ˈlɑː.dʒɪk/",
    es: "Controlador Lógico Programable (PLC)",
    category: "Hardware de Control",
    definition: "Ruggedized industrial digital computer designed for real-time control of manufacturing machinery and robotic lines.",
    collocations: ["PLC firmware integrity", "ladder logic execution loop", "safety-rated PLC"],
    falseFriends: "No es una 'computadora de escritorio'; opera en microsegundos y soporta vibración y temperaturas extremas.",
    nativeUsage: "Technicians verified that the PLC checksum matched the authorized master backup in the engineering vault."
  },
  {
    term: "Zero-Trust Architecture (ZTA)",
    ipa: "/ˈzɪr.oʊ trʌst/",
    es: "Arquitectura de Confianza Cero",
    category: "Modelo de Seguridad",
    definition: "Security model assuming that threats exist inside network boundaries, requiring continuous validation for every access request.",
    collocations: ["never trust, always verify", "zero-trust microsegmentation", "least-privilege access"],
    falseFriends: "No significa desconfiar de las personas; es una arquitectura matemática criptográfica por dispositivo y sesión.",
    nativeUsage: "Implementing zero-trust architecture stopped the malware from traversing laterally into the robotic welding line."
  },
  {
    term: "Deep Packet Inspection (DPI)",
    ipa: "/diːp ˈpæk.ɪt ɪnˈspɛk.ʃən/",
    es: "Inspección Profunda de Paquetes",
    category: "Filtrado de Red",
    definition: "Advanced packet processing method examining protocol payload bytes beyond IP and TCP headers to validate commands.",
    collocations: ["DPI industrial firewall", "inspect application-layer payload", "whitelist protocol commands"],
    falseFriends: "Diferente de un firewall tradicional; el DPI analiza si el comando de ingeniería es legítimo o malicioso.",
    nativeUsage: "The DPI gateway blocks any unauthorized setpoint changes on the furnace temperature controller."
  },
  {
    term: "Lateral Movement",
    ipa: "/ˈlæt.ər.əl ˈmuːv.mənt/",
    es: "Movimiento Lateral",
    category: "Vector de Amenaza",
    definition: "Technique used by attackers to progressively move through a network after establishing an initial compromised foothold.",
    collocations: ["prevent lateral traversal", "lateral movement across subnets", "quarantine infected hosts"],
    falseFriends: "En ingeniería mecánica significa desplazamiento físico; en ciberseguridad es la propagación de intrusiones en red.",
    nativeUsage: "Microsegmenting each manufacturing line stopped the attacker's lateral movement dead in its tracks."
  },
  {
    term: "Industrial DMZ (IDMZ)",
    ipa: "/ɪnˈdʌs.tri.əl ˌdiː.ɛmˈzɛd/",
    es: "Zona Desmilitarizada Industrial",
    category: "Segmentación",
    definition: "Perimeter network zone (Purdue Level 3.5) buffering enterprise IT systems from mission-critical plant-floor operations.",
    collocations: ["terminate sessions at IDMZ", "dual-homed IDMZ jump box", "cross-domain data broker"],
    falseFriends: "No tiene fines militares; es una zona de aislamiento de servidores intermediarios (historians, jump servers).",
    nativeUsage: "Plant historians replicate database tags across the IDMZ so corporate analysts never connect directly to PLCs."
  },
  {
    term: "Deterministic Network",
    ipa: "/dɪˌtɜːr.mɪˈnɪs.tɪk/",
    es: "Red Determinista",
    category: "Rendimiento de Red",
    definition: "Network communication architecture guaranteeing that messages arrive within an exact, predictable bounded timeframe.",
    collocations: ["sub-millisecond determinism", "deterministic cycle time", "Time-Sensitive Networking (TSN)"],
    falseFriends: "No es 'red decidida'; significa matemáticamente predecible con jitter cercano a cero.",
    nativeUsage: "EtherCAT networks provide deterministic communication so robotic arms coordinate movements at microsecond precision."
  },
  {
    term: "Supervisory Control and Data Acquisition (SCADA)",
    ipa: "/ˈskeɪ.də/",
    es: "Sistema SCADA",
    category: "Software de Planta",
    definition: "Industrial software platform that monitors, collects telemetry from, and commands distributed plant-floor operations.",
    collocations: ["SCADA human-machine interface", "real-time telemetry alarm", "SCADA server failover"],
    falseFriends: "Se pronuncia /SKEI-da/, no 'escada'. Es el centro de mando digital de toda la planta manufacturera.",
    nativeUsage: "The central SCADA console alerted the supervisor when hydraulic pressure dropped below the critical threshold."
  },
  {
    term: "Firmware Integrity",
    ipa: "/ˈfɜːrm.wɛər ɪnˈtɛɡ.rə.ti/",
    es: "Integridad del Firmware",
    category: "Seguridad de Dispositivo",
    definition: "Verification that controller operating software has not been tampered with, altered, or replaced by rogue code.",
    collocations: ["cryptographic firmware signature", "secure boot verification", "firmware checksum mismatch"],
    falseFriends: "Integridad aquí significa inalterabilidad criptográfica con llaves públicas, no 'honestidad moral'.",
    nativeUsage: "The PLC refuses to boot if the cryptographic hash of the new firmware does not match the OEM signature."
  },
  {
    term: "Safety Instrumented System (SIS)",
    ipa: "/ˈseɪf.ti ˌɪn.strəˈmɛn.tɪd/",
    es: "Sistema Instrumentado de Seguridad (SIS)",
    category: "Seguridad Funcional",
    definition: "Dedicated control system designed specifically to bring a plant to a safe state when predetermined conditions are breached.",
    collocations: ["Safety Integrity Level (SIL-3)", "hardwired emergency stop", "independent safety controller"],
    falseFriends: "El SIS siempre opera de manera físicamente separada del PLC de control básico para evitar catástrofes.",
    nativeUsage: "Even if the main PLC is hacked, the hardwired Safety Instrumented System will physically vent the emergency valves."
  }
];

const cyberSocratic = [
  {
    step: 1,
    concept: "Purdue Model & Air-Gap Limitations",
    botQuestion: "Welcome to the OT Security Audit! Explain in English why relying solely on a physical 'air-gap' is no longer sufficient to protect a manufacturing plant's PLCs. How do modern cyber-threats cross physical air-gaps?",
    requiredKeywords: ["air-gap", "plc", "purdue", "usb", "maintenance", "vendor", "jump box", "isolation", "physical"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! Air-gaps create a dangerous false sense of security because vendor maintenance laptops, infected firmware update USBs, and dual-homed jump boxes routinely bridge the physical gap, requiring internal microsegmentation.",
    feedbackRetry: "Think about physical entry points: how do technicians update PLC code or connect diagnostic laptops when machinery breaks down? Mention maintenance access and USB devices!"
  },
  {
    step: 2,
    concept: "Legacy Modbus Vulnerabilities vs DPI",
    botQuestion: "Why is Modbus TCP inherently vulnerable to packet injection attacks, and how does a Deep Packet Inspection (DPI) industrial firewall mitigate this vulnerability?",
    requiredKeywords: ["modbus", "unauthenticated", "encryption", "payload", "dpi", "deep packet inspection", "coil", "firewall", "whitelist"],
    minKeywords: 3,
    feedbackSuccess: "Outstanding technical precision! Modbus TCP lacks native authentication and encryption, allowing any host to send arbitrary coil writes. DPI firewalls inspect the application-layer payload, validating function codes against strict whitelists.",
    feedbackRetry: "Remember that Modbus TCP operates over port 502 with plaintext payloads and no cryptographic handshakes. What does a DPI firewall do with the payload bytes that a basic firewall cannot?"
  }
];

if (LXP_COURSES["cybersecurity"] && LXP_COURSES["cybersecurity"].modules) {
  const m1 = LXP_COURSES["cybersecurity"].modules[0];
  m1.isGoldModel = true;
  m1.title = "OT/ICS Zero-Trust Architecture & Air-Gapped Networks";
  m1.titleES = "Arquitectura Zero-Trust en OT/ICS y Redes Aisladas";
  m1.readings[0] = {
    id: "cyber-m1-r1",
    title: "OT/ICS Zero-Trust Architecture & Air-Gapped Networks",
    duration: "12 min",
    content: cyberReading,
    vocabulary: cyberLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
  };
  m1.dialogue = cyberDialogue;
  m1.lexiconMatrix = cyberLexicon;
  m1.socraticChallenges = cyberSocratic;
  console.log('✓ Successfully enriched cybersecurity (cyber-m1)');
}

// -------------------------------------------------------------
// 2. ELECTROMOBILITY: 800V Architecture & SiC Inverters (ev-m1)
// -------------------------------------------------------------
const evReading = `
> **Industry Certification Alignment**: Follows **SAE J1772 / ISO 15118 (Combined Charging System)** and **UL 2580 (Batteries for Use in Electric Vehicles)** standards. Essential for powertrain and high-voltage engineers at Tesla, BMW, Rivian, and Tier-1 suppliers.

# 800V High-Voltage Powertrain, SiC Inverters & Thermal Runaway Containment

The global transition from legacy 400-volt electric vehicle architectures to **800-volt high-voltage platforms** represents a quantum leap in charging speed, thermal efficiency, and powertrain power density.

## 1. Electrical Physics of 800V vs 400V Architectures

The governing electrical equation for resistive heat loss in wiring harnesses is Joule's Law:
$$P_{\\text{loss}} = I^2 R$$
Where $P$ is power loss in watts, $I$ is electrical current in amperes, and $R$ is copper conductor resistance.
- **Current Halving**: To deliver **350 kW** of charging power at 400V, the vehicle must draw **875 Amperes**, requiring thick, heavy copper cabling and active liquid-cooled charging cables.
- At **800V**, delivering the same 350 kW requires only **437.5 Amperes**. Because resistive losses scale quadratically ($I^2$), halving current reduces thermal heat generation in the vehicle's busbars by **75%**.
- This enables lighter wiring harnesses (saving 20–30 kg per vehicle) and sustains 10% to 80% DC fast-charging cycles in under **18 minutes**.

## 2. Silicon Carbide (SiC) MOSFET Inverter Switching

In an EV powertrain, the **Traction Inverter** converts direct current (DC) stored in the high-voltage battery pack into variable-frequency, three-phase alternating current (AC) to drive permanent magnet synchronous motors (PMSM):
1. **Silicon IGBTs vs SiC MOSFETs**: Legacy inverters utilized Silicon Insulated-Gate Bipolar Transistors (IGBTs), which suffer from significant switching losses above 10 kHz due to tail currents.
2. **Wide Bandgap (WBG) Semiconductor Physics**: Silicon Carbide (SiC) possesses a bandgap energy of **3.26 eV** (nearly 3x higher than Silicon's 1.12 eV) and a critical breakdown field 10x greater.
3. **Operational Benefits**: SiC MOSFETs switch efficiently at frequencies exceeding **50 kHz** with up to **99% inverter efficiency**, reducing motor harmonic ripple and extending vehicle range by 5% to 8% on identical battery pack capacities.

## 3. Battery Management Systems (BMS) and Thermal Runaway Propagation

Lithium-ion cells operating within automotive battery packs face the catastrophic threat of **Thermal Runaway**:
- **Initiation**: Triggered by internal dendrite short-circuits, mechanical casing puncture, or severe overcharging, temperatures rise past the critical threshold (typically **120°C–140°C**), causing the solid-electrolyte interphase (SEI) layer to decompose exothermically.
- **Oxygen Release**: Cathode materials release oxygen, fueling violent combustion of volatile organic carbonate solvents, generating temperatures over **900°C** and dangerous toxic gas venting (HF, CO).
- **UL 2580 Compliance**: The Battery Management System (**BMS**) must monitor individual cell voltages to millivolt precision and cell temperatures every 10 milliseconds. Automotive packs must feature **aerogel thermal barriers** and directional pressure relief vent valves ensuring that thermal runaway in a single cell cannot propagate to adjacent cells for a minimum of **5 minutes**, providing critical occupant egress time.

---
> **Key Takeaway**: EV engineering links **solid-state physics (SiC MOSFET inverters, wide bandgap semiconductors)** with **electrochemistry (Joule heating, thermal runaway containment)** and **embedded safety (BMS, UL 2580)**.
`;

const evDialogue = {
  title: "Powertrain Validation: SiC Inverter Thermal Drift during 350kW DC Fast Charge",
  titleES: "Validación de Tren Motriz: Deriva Térmica del Inversor SiC durante Carga Rápida DC de 350kW",
  scenarioContext: "Fremont, CA (EV Powertrain R&D) ⇄ Ramos Arizpe, Coahuila (Battery & Motor Gigafactory). Live Telemetry Review.",
  characters: [
    { name: "Derek Vance", role: "VP of Powertrain Engineering (Fremont)", avatar: "DV", color: "var(--cyan)" },
    { name: "Ing. Andrea Solís", role: "Battery Pack Systems Lead (Ramos Arizpe)", avatar: "AS", color: "var(--emerald)" }
  ],
  turns: [
    {
      speaker: "Derek Vance",
      text: "Morning Andrea. Reviewing the telemetry from dyno bench 4. During the 350kW DC fast charging simulation, pack voltage crested at 820 volts, but junction temperature on Phase U of the SiC inverter reached 115°C. Did the liquid cooling loop cavitate?",
      translation: "Buenos días Andrea. Revisando la telemetría del banco de dinamómetro 4. Durante la simulación de carga rápida DC a 350kW, el voltaje del paquete alcanzó un pico de 820 voltios, pero la temperatura de unión en la Fase U del inversor SiC llegó a 115°C. ¿Cavito el circuito de refrigeración líquida?",
      targetTerms: ["dyno bench", "350kW DC fast charging", "pack voltage", "junction temperature", "SiC inverter"]
    },
    {
      speaker: "Ing. Andrea Solís",
      text: "No cavitation, Derek. Coolant flow was steady at 18 liters per minute with 50/50 water-glycol. However, thermal imaging revealed a void in the Thermal Interface Material (TIM) beneath the direct-cooled SiC power module, creating an 8-degree hotspot.",
      translation: "Sin cavitación, Derek. El flujo de refrigerante se mantuvo estable a 18 litros por minuto con agua-glicol al 50/50. Sin embargo, la termografía reveló un vacío en el Material de Interfaz Térmica (TIM) debajo del módulo de potencia SiC refrigerado directamente, creando un punto caliente de 8 grados.",
      targetTerms: ["water-glycol coolant", "Thermal Interface Material (TIM)", "direct-cooled SiC module", "hotspot"]
    },
    {
      speaker: "Derek Vance",
      text: "Good catch. A thermal void like that at sustained 400-amp draw would cause gate oxide degradation over time. How did the cell balancing algorithm behave during the high-voltage constant-current phase?",
      translation: "Buena detección. Un vacío térmico como ese con consumo sostenido de 400 amperios causaría degradación del óxido de compuerta con el tiempo. ¿Cómo se comportó el algoritmo de balanceo de celdas durante la fase de corriente constante a alto voltaje?",
      targetTerms: ["gate oxide degradation", "sustained 400-amp draw", "cell balancing algorithm", "constant-current phase"]
    },
    {
      speaker: "Ing. Andrea Solís",
      text: "The BMS maintained cell-to-cell delta below 12 millivolts across all 192 series cells. The pyro-fuse circuit and High-Voltage Interlock Loop (HVIL) remained perfectly stable, and pressure relief vents showed zero gas discharge.",
      translation: "El BMS mantuvo el diferencial celda a celda por debajo de 12 milivoltios a lo largo de las 192 celdas en serie. El circuito del pirofusible y el circuito de enclavamiento de alto voltaje (HVIL) se mantuvieron perfectamente estables, y las válvulas de alivio de presión mostraron cero descarga de gas.",
      targetTerms: ["BMS cell delta", "pyro-fuse circuit", "High-Voltage Interlock Loop (HVIL)", "pressure relief vents"]
    }
  ],
  contrastTips: [
    {
      school: "The electric car battery is very hot and can burn.",
      native: "The Battery Management System monitors cell delta to mitigate solid-electrolyte interphase decomposition and thermal runaway.",
      explanation: "En la escuela se dice 'battery gets hot', pero en ingeniería automotriz se habla de 'thermal runaway propagation', 'SEI decomposition' y 'cell balancing telemetry'."
    },
    {
      school: "Change electricity from direct to alternate.",
      native: "The three-phase Silicon Carbide (SiC) traction inverter converts high-voltage DC to variable-frequency AC.",
      explanation: "Se debe especificar la topología del inversor (SiC MOSFET, three-phase) y las frecuencias de conmutación en kHz."
    }
  ]
};

const evLexicon = [
  {
    term: "Silicon Carbide (SiC) Inverter",
    ipa: "/ˈsɪl.ɪ.kən ˈkɑːr.baɪd ɪnˈvɜːr.tər/",
    es: "Inversor de Carburo de Silicio (SiC)",
    category: "Electrónica de Potencia",
    definition: "High-efficiency traction inverter utilizing wide bandgap SiC MOSFET semiconductor switches operating up to 800V.",
    collocations: ["SiC power module", "switching frequency (50kHz)", "inverter thermal dissipation"],
    falseFriends: "No es un convertidor simple; conmuta cientos de kilowatts a microsegundos con 99% de eficiencia.",
    nativeUsage: "Replacing Silicon IGBTs with SiC MOSFET inverters reduced powertrain energy losses by 70%."
  },
  {
    term: "Thermal Runaway",
    ipa: "/ˈθɜːr.məl ˈrʌn.ə.weɪ/",
    es: "Embalamiento Térmico / Fuga Térmica",
    category: "Seguridad Electroquímica",
    definition: "Unstoppable self-heating chemical reaction inside a battery cell releasing flammable gas, oxygen, and intense heat (>900°C).",
    collocations: ["thermal runaway propagation", "cell venting burst pressure", "thermal barrier insulation"],
    falseFriends: "No es que la batería 'se caliente rápido'; es una descomposición molecular en cadena irreversible.",
    nativeUsage: "The pack's aerogel barriers prevent thermal runaway in cell 14 from igniting neighboring cells."
  },
  {
    term: "State of Charge (SoC)",
    ipa: "/steɪt əv tʃɑːrdʒ/",
    es: "Estado de Carga (SoC)",
    category: "Métrica de Batería",
    definition: "The available capacity in a battery expressed as a percentage of its rated capacity (0% empty to 100% full).",
    collocations: ["SoC estimation algorithm", "Coulomb counting", "depth of discharge (DoD)"],
    falseFriends: "En ingeniería no se dice 'battery percentage'; se reporta formalmente como 'State of Charge (SoC)'.",
    nativeUsage: "The vehicle throttles fast charging power from 350kW down to 75kW once the SoC crosses 80%."
  },
  {
    term: "High-Voltage Interlock Loop (HVIL)",
    ipa: "/haɪ ˈvoʊl.tɪdʒ ˈɪn.tər.lɑːk/",
    es: "Bucle de Enclavamiento de Alto Voltaje (HVIL)",
    category: "Seguridad Funcional",
    definition: "Low-voltage electrical safety circuit that passes through all high-voltage connectors to trigger instant contactor disconnect if breached.",
    collocations: ["HVIL circuit continuity", "HVIL safety trip", "high-voltage disconnect latch"],
    falseFriends: "No es un candado mecánico; es un circuito serie de baja corriente monitoreado en microsegundos por el BMS.",
    nativeUsage: "If a technician unplugs an orange 800V connector without isolating power, the broken HVIL circuit trips the main contactors instantly."
  },
  {
    term: "Cell Balancing",
    ipa: "/sɛl ˈbæl.ən.sɪŋ/",
    es: "Balanceo de Celdas",
    category: "Gestión BMS",
    definition: "Technique equalizing charge levels across individual series-connected battery cells to maximize pack capacity and lifespan.",
    collocations: ["active vs passive cell balancing", "cell voltage delta (<10mV)", "bleeder resistor circuit"],
    falseFriends: "No es equilibrar el peso físico de las celdas; es nivelar sus voltajes electroquímicos de circuito abierto.",
    nativeUsage: "Passive balancing bleeds excess charge as heat to ensure weak cells do not get overcharged during DC fast charging."
  },
  {
    term: "Busbar",
    ipa: "/ˈbʌs.bɑːr/",
    es: "Barra Colectora / Barra Distribuidora",
    category: "Conducción Eléctrica",
    definition: "Metallic strip or bar (copper or aluminum) conducting high electrical currents between battery modules and inverter stages.",
    collocations: ["ultrasonic busbar welding", "busbar ampacity", "laminated busbar inductance"],
    falseFriends: "No es una 'barra de autobús'; es el conductor masivo de cobre que transporta 400+ amperios dentro de la batería.",
    nativeUsage: "Laser-welded copper busbars interconnect the 192 prismatic battery cells with sub-milliohm electrical resistance."
  },
  {
    term: "DC Fast Charging (DCFC)",
    ipa: "/diː siː fæst ˈtʃɑːr.dʒɪŋ/",
    es: "Carga Rápida en Corriente Continua",
    category: "Infraestructura",
    definition: "High-power EV charging method bypassing the vehicle's on-board charger to feed DC current directly into the battery pack.",
    collocations: ["350kW CCS charging standard", "liquid-cooled charging cable", "charging curve taper"],
    falseFriends: "No confundir con la carga doméstica de CA (Nivel 1 o 2); el DCFC bombea cientos de kilowatts en corriente continua directa.",
    nativeUsage: "The 800V architecture enables DC fast charging at 350 kW, adding 200 miles of range in just 15 minutes."
  },
  {
    term: "Thermal Interface Material (TIM)",
    ipa: "/ˈθɜːr.məl ˈɪn.tər.feɪs/",
    es: "Material de Interfaz Térmica (TIM)",
    category: "Gestión Térmica",
    definition: "Thermally conductive compound applied between heat sinks and power modules to eliminate microscopic air gaps.",
    collocations: ["TIM voiding inspection", "thermal paste dispensability", "TIM thermal conductivity (W/mK)"],
    falseFriends: "No es un pegamento ordinario; disipa megawatts de calor por metro cuadrado entre semiconductores y canales de refrigeración.",
    nativeUsage: "Automated vision systems verified zero air bubbles in the thermal interface material applied beneath the inverter module."
  },
  {
    term: "Liquid Immersion Cooling",
    ipa: "/ˈlɪk.wɪd ɪˈmɜːr.ʒən/",
    es: "Refrigeración por Inmersión Líquida",
    category: "Refrigeración Avanzada",
    definition: "Submerging battery cells directly in non-conductive dielectric fluid for maximum heat dissipation during extreme charging.",
    collocations: ["dielectric coolant circulation", "immersion cooling fluid flow rate", "direct thermal contact"],
    falseFriends: "No utiliza agua corriente (que causaría un cortocircuito mortal); usa fluidos dieléctricos de hidrocarburos sintéticos.",
    nativeUsage: "Liquid immersion cooling keeps battery cells under 45°C even during sustained full-throttle track driving."
  },
  {
    term: "Pyro-fuse (Pyrotechnic Disconnect)",
    ipa: "/ˈpaɪ.roʊ fjuːz/",
    es: "Pirofusible / Desconectador Pirotécnico",
    category: "Dispositivo de Seguridad",
    definition: "Safety device utilizing a micro-explosive propellant charge to physically sever the high-voltage circuit within 2 milliseconds of a crash.",
    collocations: ["pyro-fuse deployment", "millisecond circuit severance", "crash sensor trigger"],
    falseFriends: "No es un fusible térmico que se derrite; es un micro-detonador pirotécnico controlado electrónicamente.",
    nativeUsage: "In a severe collision, the airbag control unit triggers the pyro-fuse to isolate the 800V battery pack before fuel or fire hazards develop."
  },
  {
    term: "Regenerative Braking",
    ipa: "/rɪˈdʒɛn.ər.ə.tɪv ˈbreɪ.kɪŋ/",
    es: "Frenado Regenerativo",
    category: "Recuperación de Energía",
    definition: "Mechanism slowing a vehicle by converting kinetic energy into electrical energy stored back in the high-voltage battery.",
    collocations: ["regenerative torque request", "blended braking system", "regen power limit"],
    falseFriends: "No reemplaza al 100% los frenos de disco hidráulicos; trabaja en modo combinado (blended) para recuperar energía.",
    nativeUsage: "Aggressive regenerative braking recovers up to 80% of vehicle kinetic energy during stop-and-go city transit."
  },
  {
    term: "Depth of Discharge (DoD)",
    ipa: "/dɛpθ əv dɪsˈtʃɑːrdʒ/",
    es: "Profundidad de Descarga (DoD)",
    category: "Vida Útil de Batería",
    definition: "Percentage of the battery that has been discharged relative to its overall capacity, inverse of State of Charge.",
    collocations: ["limit DoD to 80%", "cycle life vs DoD curve", "shallow cycling"],
    falseFriends: "Descargar una celda a 100% de DoD acelera la degradación y el crecimiento de dendritas de litio.",
    nativeUsage: "Restricting the vehicle's usable DoD window between 10% and 90% doubles overall battery pack cycle longevity."
  }
];

const evSocratic = [
  {
    step: 1,
    concept: "800V vs 400V Resistive Heat Physics",
    botQuestion: "Welcome to the EV Powertrain Audit! Explain in English why moving from a 400V to an 800V vehicle architecture cuts resistive wiring heat generation by 75% for the same 350kW charging power. Mention Joule's Law!",
    requiredKeywords: ["joule", "current", "amperes", "voltage", "resistance", "halved", "power", "heat", "75%"],
    minKeywords: 3,
    feedbackSuccess: "Flawless physics explanation! By doubling voltage to 800V, current is halved for the same charging power. Because Joule's Law dictates that resistive heat loss scales quadratically (I²R), halving the current reduces thermal dissipation by exactly 75%.",
    feedbackRetry: "Remember the formula P = I²R! If you double the voltage, what happens to current (I) for the same 350 kW? How does squaring that current affect the heat loss?"
  },
  {
    step: 2,
    concept: "SiC Wide Bandgap Semiconductors vs Silicon IGBTs",
    botQuestion: "Why are Silicon Carbide (SiC) MOSFETs replacing traditional Silicon IGBTs in 800V traction inverters? What physical advantage does wide bandgap material provide at switching frequencies above 50 kHz?",
    requiredKeywords: ["sic", "silicon", "carbide", "bandgap", "mosfet", "igbt", "efficiency", "switching", "frequency", "inverter"],
    minKeywords: 3,
    feedbackSuccess: "Brilliant technical explanation! SiC has a wider bandgap (3.26 eV) and higher critical electric field than silicon, eliminating tail currents and enabling ultra-fast switching at 50+ kHz with over 99% inverter efficiency.",
    feedbackRetry: "Focus on the material property: Wide Bandgap (WBG). Why does SiC allow faster switching with lower thermal losses compared to silicon transistors?"
  }
];

if (LXP_COURSES["electromobility"] && LXP_COURSES["electromobility"].modules) {
  const m1 = LXP_COURSES["electromobility"].modules[0];
  m1.isGoldModel = true;
  m1.title = "800V High-Voltage Powertrain, SiC Inverters & Thermal Runaway";
  m1.titleES = "Tren Motriz de 800V, Inversores SiC y Embalamiento Térmico";
  m1.readings[0] = {
    id: "ev-m1-r1",
    title: "800V High-Voltage Powertrain & SiC Inverters",
    duration: "12 min",
    content: evReading,
    vocabulary: evLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
  };
  m1.dialogue = evDialogue;
  m1.lexiconMatrix = evLexicon;
  m1.socraticChallenges = evSocratic;
  console.log('✓ Successfully enriched electromobility (ev-m1)');
}

// -------------------------------------------------------------
// 3. AI & MACHINE LEARNING: Tensor Parallelism & H100 (aiml-m1)
// -------------------------------------------------------------
const aiReading = `
> **Industry Alignment & Compute Standards**: Follows **MLPerf Training & Inference Benchmarks** and **NVIDIA NeMo Distributed Training Protocols**. Critical for GPU cluster engineers, model optimization specialists, and MLOps leads.

# Transformer Weights, Attention Matrices & Tensor Parallelism: Frontier Model Infrastructure

Training and deploying frontier Large Language Models (LLMs) with over 70 billion parameters exceeds the physical memory capacity of any single GPU accelerator, necessitating **distributed tensor parallelism** across high-speed interconnect fabrics.

## 1. The Anatomy of Transformer Parameter Memory Allocation

When loading a dense transformer model into accelerator VRAM, memory overhead comprises:
1. **Model Weights**: In standard 16-bit floating-point (**FP16/BF16**), each parameter occupies **2 bytes**. A 70-billion-parameter model requires:
   $$\\text{Weight Memory} = 70 \\times 10^9 \\times 2\\text{ bytes} = 140\\text{ GB}$$
   Even an 80GB NVIDIA H100 SXM5 GPU cannot fit the base model weights alone into memory.
2. **Optimizer States (AdamW)**: During training, AdamW stores FP32 master weights (4 bytes), first-order momentum vectors (4 bytes), and second-order variance estimates (4 bytes) per parameter—adding **12 bytes per parameter** (840 GB for a 70B model).
3. **Activation & KV Cache Memory**: During inference, generating text token-by-token requires caching the Key and Value projection vectors of every preceding token across all transformer layers to avoid recomputing self-attention:
   $$\\text{KV Cache Size} = 2 \\times b \\times s \\times l \\times h \\times d$$
   Where $b$ is batch size, $s$ is sequence length, $l$ is layer count, $h$ is attention head count, and $d$ is head dimension. Long-context inference (128k tokens) rapidly exhausts remaining VRAM without **PagedAttention** memory management.

## 2. Distributed Parallelism Topologies

To distribute computational graphs across server nodes:
- **Tensor Parallelism (TP - Megatron-LM)**: Splits individual weight matrices across GPUs within the same NVLink domain. In multi-head attention, Query ($W_Q$), Key ($W_K$), and Value ($W_V$) weight matrices are column-sliced across 8 GPUs, followed by an **All-Reduce** collective communication step to sum partial outputs.
- **Pipeline Parallelism (PP)**: Partitions sequential transformer layers across distinct physical servers, using 1F1B (One-Forward-One-Backward) scheduling to minimize pipeline bubble idle time.
- **Data Parallelism (ZeRO / FSDP)**: Shards optimizer states, gradients, and model parameters across data-parallel ranks, dynamically gathering weights via All-Gather communication right before forward execution.

## 3. High-Throughput Interconnect Fabrics: NVLink and InfiniBand

Because Tensor Parallelism requires synchronizing layer activations at every single transformer block, interconnect latency is the pacing constraint:
- **Intra-Node NVLink 4**: Delivers **900 GB/s bidirectional bandwidth** per GPU with sub-microsecond latency, making tensor slicing mathematically feasible.
- **Inter-Node InfiniBand (NDR 400 Gbps)**: Employs **Remote Direct Memory Access (RDMA)** over Converged Ethernet (RoCE v2), allowing one server's GPU to read another server's VRAM directly, bypassing host CPUs and OS kernel network stacks.

---
> **Key Takeaway**: Enterprise AI systems link **linear algebra (attention matrices, tensor slicing)** with **distributed networking (NVLink, RDMA RoCE v2, All-Reduce collectives)** and **memory compression (FP8 quantization, PagedAttention)**.
`;

const aiDialogue = {
  title: "GPU Cluster Out-of-Memory (OOM) Root Cause Analysis during Distributed LLM Fine-Tuning",
  titleES: "Análisis de Causa Raíz de Falla por Memoria (OOM) en Clúster de GPUs durante Fine-Tuning Distribuido",
  scenarioContext: "Santa Clara, CA (AI Compute Architecture Team) ⇄ Guadalajara, Jalisco (High-Performance Computing Cluster). Slack Huddle Incident.",
  characters: [
    { name: "Dr. Aris Thorne", role: "Principal AI Infrastructure Architect (Santa Clara)", avatar: "AT", color: "var(--purple)" },
    { name: "Ing. Mateo Fuentes", role: "Lead MLOps & Distributed Systems Engineer (Guadalajara)", avatar: "MF", color: "var(--cyan)" }
  ],
  turns: [
    {
      speaker: "Dr. Aris Thorne",
      text: "Mateo, our 70B parameter fine-tuning job crashed with a CUDA out-of-memory error on Node 14 right after step 4,200. We were running Tensor Parallelism 8 and Pipeline Parallelism 4. Did the KV Cache allocate beyond the VRAM ceiling?",
      translation: "Mateo, nuestro trabajo de fine-tuning de 70B parámetros colapsó con un error CUDA de falta de memoria en el Nodo 14 justo después del paso 4,200. Estábamos corriendo Paralelismo de Tensores en 8 y Paralelismo de Pipeline en 4. ¿La caché KV se asignó más allá del límite de VRAM?",
      targetTerms: ["CUDA out-of-memory", "Tensor Parallelism", "Pipeline Parallelism", "KV Cache", "VRAM ceiling"]
    },
    {
      speaker: "Ing. Mateo Fuentes",
      text: "Investigating now, Aris. It wasn't the KV Cache; inference wasn't active. The crash occurred during an All-Reduce collective operation across the InfiniBand fabric. A burst in sequence length to 8,192 tokens caused the activation tensors to spike VRAM usage by 18 gigabytes per GPU.",
      translation: "Investigando ahora, Aris. No fue la caché KV; la inferencia no estaba activa. La caída ocurrió durante una operación colectiva All-Reduce a través de la red InfiniBand. Un pico repentino en la longitud de secuencia a 8,192 tokens provocó que los tensores de activación dispararan el uso de VRAM en 18 gigabytes por GPU.",
      targetTerms: ["All-Reduce collective", "InfiniBand fabric", "activation tensors", "sequence length"]
    },
    {
      speaker: "Dr. Aris Thorne",
      text: "Understood. The activation memory blew past our headroom. Can we enable FlashAttention-2 with activation checkpointing to recompute activations during the backward pass instead of storing them all in VRAM?",
      translation: "Entendido. La memoria de activación rebasó nuestro margen de seguridad. ¿Podemos habilitar FlashAttention-2 con puntos de control de activación (checkpointing) para recalcular las activaciones durante la pasada hacia atrás en lugar de almacenarlas todas en VRAM?",
      targetTerms: ["FlashAttention-2", "activation checkpointing", "backward pass", "recompute activations"]
    },
    {
      speaker: "Ing. Mateo Fuentes",
      text: "Done. I've reconfigured the PyTorch training manifest with FlashAttention-2, enabled full activation recomputation, and quantized optimizer states to FP8. That freed up 24GB of VRAM per H100 card, so we're resuming the distributed training run safely.",
      translation: "Listo. Reconfiguré el manifiesto de entrenamiento de PyTorch con FlashAttention-2, habilité el recálculo completo de activaciones y cuantifiqué los estados del optimizador a FP8. Eso liberó 24GB de VRAM por tarjeta H100, así que estamos reanudando la corrida de entrenamiento distribuido de manera segura.",
      targetTerms: ["activation recomputation", "quantized optimizer states", "FP8 quantization", "distributed training run"]
    }
  ],
  contrastTips: [
    {
      school: "The AI program crashed because the computer graphics card was small.",
      native: "The distributed training cluster triggered a CUDA Out-of-Memory exception during the All-Reduce collective due to uncheckpointed activation tensor spikes.",
      explanation: "En la escuela se dice 'graphics card was small', pero en centros de datos de IA se describe con precisión el tensor de activación, el colectivo de comunicación y la excepción de VRAM."
    },
    {
      school: "Make the AI answer faster.",
      native: "Optimize prompt throughput by deploying PagedAttention and FP8 weight quantization on the inference engine.",
      explanation: "En la industria de tecnología se habla de 'throughput', 'token latency (TTFT)', 'PagedAttention' y 'quantization'."
    }
  ]
};

const aiLexicon = [
  {
    term: "Tensor Parallelism (TP)",
    ipa: "/ˈtɛn.sər ˈpær.ə.lɛl.ɪ.zəm/",
    es: "Paralelismo de Tensores",
    category: "Cómputo Distribuido",
    definition: "Parallel computing technique splitting individual weight matrices of a transformer layer across multiple GPUs within the same server node.",
    collocations: ["Megatron-LM tensor slicing", "TP degree 8", "All-Reduce synchronization"],
    falseFriends: "No es correr 8 modelos separados; es dividir una sola multiplicación matricial en 8 aceleradores simultáneamente.",
    nativeUsage: "Tensor Parallelism splits the feed-forward projection matrix across eight H100 GPUs connected via NVLink."
  },
  {
    term: "KV Cache (Key-Value Cache)",
    ipa: "/kiː ˈvæl.juː kæʃ/",
    es: "Caché de Llaves y Valores (KV Cache)",
    category: "Optimización de Inferencia",
    definition: "Memory buffer storing previously computed attention Key and Value vectors to prevent quadratic recomputation during auto-regressive generation.",
    collocations: ["KV cache VRAM footprint", "PagedAttention memory allocation", "KV cache eviction policy"],
    falseFriends: "No es una caché web de navegador; es una estructura de tensores en memoria GPU que crece con cada palabra generada.",
    nativeUsage: "Without PagedAttention, managing the KV Cache for 50 concurrent users causes severe VRAM fragmentation."
  },
  {
    term: "Quantization (FP8 / INT4)",
    ipa: "/ˌkwɑːn.tɪˈzeɪ.ʃən/",
    es: "Cuantificación Numérica",
    category: "Compresión de Modelos",
    definition: "Process of reducing the bit-precision of model weights and activations (e.g., from FP16 to FP8 or INT4) to decrease memory usage and boost inference speed.",
    collocations: ["post-training quantization (PTQ)", "FP8 weight-only quantization", "perplexity degradation"],
    falseFriends: "No es 'contar cantidades'; es comprimir la representación matemática de números flotantes.",
    nativeUsage: "Quantizing the 70B model to FP8 slashed required GPU VRAM from 140GB down to 70GB with zero perceptible loss in reasoning accuracy."
  },
  {
    term: "FlashAttention",
    ipa: "/flæʃ əˈtɛn.ʃən/",
    es: "FlashAttention / Algoritmo de Atención Rápida",
    category: "Algoritmo de Aceleración",
    definition: "IO-aware exact attention algorithm minimizing slow GPU HBM memory read/writes by computing softmax tiling directly inside fast SRAM cache.",
    collocations: ["FlashAttention-2 kernel", "tiling attention matrix", "memory-bound self-attention"],
    falseFriends: "No es una animación Flash antigua; es el avance algorítmico más importante de la IA moderna para evitar cuellos de botella de memoria.",
    nativeUsage: "Enabling FlashAttention-2 accelerated training throughput by 2.4x while keeping GPU SRAM memory utilization optimal."
  },
  {
    term: "All-Reduce Collective",
    ipa: "/ɔːl rɪˈduːs kəˈlɛk.tɪv/",
    es: "Operación Colectiva All-Reduce",
    category: "Comunicación de Red",
    definition: "Distributed networking operation where all participating GPUs exchange and sum their local gradients so every worker receives the identical combined result.",
    collocations: ["Ring All-Reduce", "NCCL collective communication", "All-Reduce latency barrier"],
    falseFriends: "No significa 'reducir todo'; es la operación de suma y sincronización vectorial fundamental de la IA distribuida.",
    nativeUsage: "The NCCL library executed an All-Reduce operation across all 64 GPUs in under 1.2 milliseconds via InfiniBand."
  },
  {
    term: "InfiniBand RoCE v2",
    ipa: "/ɪnˈfɪn.ɪ.bænd ˈroʊ.siː/",
    es: "Red InfiniBand y RoCE v2",
    category: "Interconexión de Clúster",
    definition: "Ultra-low latency, high-bandwidth interconnect architecture supporting Remote Direct Memory Access (RDMA) across distributed compute nodes.",
    collocations: ["RDMA zero-copy transfer", "400Gbps NDR InfiniBand", "lossless Ethernet fabric"],
    falseFriends: "No es un cable Ethernet doméstico; permite a una GPU leer la memoria VRAM de otra GPU en otro rack sin intervención del procesador CPU.",
    nativeUsage: "Using InfiniBand RoCE v2 bypassed the host CPU kernel stack, dropping cross-rack tensor synchronization latency to under 2 microseconds."
  },
  {
    term: "Activation Checkpointing",
    ipa: "/ˌæk.tɪˈveɪ.ʃən ˈtʃɛk.pɔɪn.tɪŋ/",
    es: "Puntos de Control de Activaciones",
    category: "Gestión de Memoria",
    definition: "Technique trading compute for memory by discarding forward-pass activations and recomputing them on-the-fly during the backward pass.",
    collocations: ["gradient checkpointing", "recompute activations", "VRAM headroom optimization"],
    falseFriends: "No es guardar el archivo a disco; es recalcular la matemática hacia atrás para no saturar los 80GB de la GPU.",
    nativeUsage: "Activation checkpointing reduced peak training VRAM consumption by 60% at the cost of a modest 15% increase in compute runtime."
  },
  {
    term: "Parameter-Efficient Fine-Tuning (PEFT / LoRA)",
    ipa: "/ˌpɪə.ɛfˈtiː / ˈlɔː.rə/",
    es: "Ajuste Fino Eficiente (PEFT / LoRA)",
    category: "Entrenamiento de Modelos",
    definition: "Method freezing base model weights and training only low-rank decomposed adapter matrices, drastically reducing trainable parameters.",
    collocations: ["Low-Rank Adaptation (LoRA)", "rank 16 adapter", "freeze base foundation model"],
    falseFriends: "LoRA no es la tecnología de radio (LoRa); en IA significa Low-Rank Adaptation de matrices de pesos.",
    nativeUsage: "With LoRA, the team fine-tuned the model on specialized legal terminology by training just 0.2% of the parameters."
  },
  {
    term: "Latency Budget (TTFT & TPOT)",
    ipa: "/ˈleɪ.tən.si ˈbʌdʒ.ɪt/",
    es: "Presupuesto de Latencia",
    category: "Métricas de Servicio",
    definition: "Strict SLA thresholds measuring Time to First Token (TTFT) and Time Per Output Token (TPOT) during live LLM serving.",
    collocations: ["sub-50ms TTFT", "token throughput per second", "p99 inference latency"],
    falseFriends: "No es un presupuesto financiero; es la cantidad máxima de milisegundos permitida antes de que el usuario perciba lentitud.",
    nativeUsage: "The autonomous agent architecture requires a Time to First Token (TTFT) under 120 milliseconds to maintain fluid real-time responses."
  },
  {
    term: "GPU VRAM Allocation",
    ipa: "/ˌviːˈræm ˌæl.əˈkeɪ.ʃən/",
    es: "Asignación de Memoria VRAM",
    category: "Hardware de Aceleración",
    definition: "High-Bandwidth Memory (HBM3) allocated on the accelerator board for weights, cache, and CUDA execution contexts.",
    collocations: ["HBM3 bandwidth (3.35 TB/s)", "CUDA out-of-memory exception", "static vs dynamic memory pool"],
    falseFriends: "La memoria VRAM de una GPU H100 es soldada de ultra alta velocidad (HBM3); no se puede expandir agregando módulos RAM normales.",
    nativeUsage: "PyTorch's memory allocator fragmented the VRAM pool until an explicit cache empty call reclaimed 12GB of contiguous space."
  },
  {
    term: "Perplexity Drift",
    ipa: "/pərˈplɛk.sə.ti drɪft/",
    es: "Deriva de Perplejidad",
    category: "Métrica de Calidad",
    definition: "Statistical metric measuring how well a probability distribution predicts a sample; lower perplexity indicates higher linguistic confidence.",
    collocations: ["eval set perplexity", "detect perplexity spikes", "cross-entropy loss correlation"],
    falseFriends: "No significa que la IA esté 'sorprendida'; es la exponencial de la pérdida de entropía cruzada del modelo.",
    nativeUsage: "During quantization testing, FP8 precision maintained baseline perplexity within a strict 0.05 margin of error."
  },
  {
    term: "Inference Engine",
    ipa: "/ˈɪn.fər.əns ˈɛn.dʒɪn/",
    es: "Motor de Inferencia de Alto Rendimiento",
    category: "Software de Despliegue",
    definition: "Specialized runtime environment (e.g., vLLM, TensorRT-LLM) engineered to maximize GPU throughput and batching during model serving.",
    collocations: ["continuous batching", "TensorRT-LLM engine build", "multi-GPU inference server"],
    falseFriends: "No es un motor de búsqueda; es el compilador de bajo nivel que ejecuta los tensores en silicio optimizado.",
    nativeUsage: "Deploying the model via vLLM with continuous batching increased server throughput from 80 to 520 tokens per second."
  }
];

const aiSocratic = [
  {
    step: 1,
    concept: "Tensor Parallelism vs Pipeline Parallelism",
    botQuestion: "Welcome to the Frontier AI Cluster Audit! Explain in English why a single 80GB GPU cannot train a 70B parameter model. What is the fundamental difference between Tensor Parallelism and Pipeline Parallelism?",
    requiredKeywords: ["vram", "weights", "parameters", "tensor", "pipeline", "megatron", "layer", "split", "optimizer", "memory"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! A 70B model requires 140GB just for FP16 weights plus 840GB for AdamW optimizer states. Tensor Parallelism slices individual matrices across GPUs inside the same node using NVLink, while Pipeline Parallelism partitions sequential layers across separate servers.",
    feedbackRetry: "Think about the memory math: at 2 bytes per parameter (FP16), how much memory does a 70B model need? Then contrast how Tensor Parallelism splits individual weight matrices inside a layer versus Pipeline Parallelism dividing entire layers across machines!"
  },
  {
    step: 2,
    concept: "All-Reduce Communication & InfiniBand",
    botQuestion: "Why does Tensor Parallelism require ultra-fast interconnects like NVLink and InfiniBand RoCE v2? What happens to GPU compute utilization if the All-Reduce collective suffers from high latency?",
    requiredKeywords: ["all-reduce", "nvlink", "infiniband", "latency", "bandwidth", "synchronization", "compute", "idle", "roce"],
    minKeywords: 3,
    feedbackSuccess: "Brilliant explanation of distributed scaling bottlenecks! Tensor Parallelism requires an All-Reduce synchronization after every single transformer layer. If network latency is high, GPUs sit completely idle waiting for peer activations, collapsing compute utilization.",
    feedbackRetry: "Think about what happens at every layer: each GPU calculates a piece of the attention matrix and must sum it with all other GPUs before moving forward. What happens if the network is slow?"
  }
];

if (LXP_COURSES["ai-ml"] && LXP_COURSES["ai-ml"].modules) {
  const m1 = LXP_COURSES["ai-ml"].modules[0];
  m1.isGoldModel = true;
  m1.title = "Transformer Weights, Attention Matrices & Tensor Parallelism";
  m1.titleES = "Pesos Transformer, Matrices de Atención y Paralelismo de Tensores";
  m1.readings[0] = {
    id: "aiml-m1-r1",
    title: "Transformer Weights & Tensor Parallelism",
    duration: "14 min",
    content: aiReading,
    vocabulary: aiLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
  };
  m1.dialogue = aiDialogue;
  m1.lexiconMatrix = aiLexicon;
  m1.socraticChallenges = aiSocratic;
  console.log('✓ Successfully enriched ai-ml (aiml-m1)');
}

// -------------------------------------------------------------
// 4. AEROSPACE: 5-Axis CNC Titanium Machining & AS9100D (aero-m1)
// -------------------------------------------------------------
const aeroReading = `
> **Aerospace Certification Standard**: Aligned with **AS9100D (Aviation, Space, and Defense Quality Management)** and **ASME Y14.5 (Geometric Dimensioning and Tolerancing - GD&T)**. Mandatory knowledge for manufacturing engineers in Boeing, Airbus, Bombardier, and Safran supply chains.

# 5-Axis CNC Titanium Machining & AS9100D Geometric Tolerancing

Aerospace structural bulkheads, wing-spar fittings, and jet engine pylons demand materials with exceptional strength-to-weight ratios capable of withstanding extreme cyclic stress and aerodynamic flutter.

## 1. Material Properties of Titanium Grade 5 (Ti-6Al-4V)

Over 50% of aerospace structural titanium is **Ti-6Al-4V (Titanium Grade 5)**:
1. **Physical Advantages**: Yield strength exceeding **880 MPa**, exceptional corrosion resistance, and operational stability from cryogenic temperatures up to **400°C**.
2. **Machining Difficulties (Superalloy Metallurgy)**:
   - **Low Thermal Conductivity**: Ti-6Al-4V has a thermal conductivity of only **6.7 W/m·K** (compared to Aluminum's 200 W/m·K). Heat generated during cutting cannot conduct into the chip and instead concentrates at the tool cutting edge, generating temperatures past **1,000°C**.
   - **Chemical Reactivity**: At elevated temperatures, titanium chemically adheres to carbide cutting inserts (galling), resulting in catastrophic tool chipping and work-hardening.
   - **Low Modulus of Elasticity**: Titanium flexes under cutter pressure twice as much as steel ($E = 114\\text{ GPa}$), causing tool deflection, chatter harmonics, and dimensional drift.

## 2. Advanced 5-Axis CNC Machining Strategies

To mill complex monolithic airframe bulkheads without thermal failure:
- **Cryogenic Liquid CO2 / LN2 Tool Cooling**: Supercritical cryogenic CO2 or Liquid Nitrogen (-196°C) is fed directly through the tool spindle to the cutting tip, eliminating thermal heat concentration and extending carbide tool life by over 300%.
- **High-Efficiency Trochoidal Milling**: Continuous circular toolpaths maintain a constant tool engagement angle, preventing cutter shock loads and ensuring ultra-consistent chip thinning.

## 3. AS9100D Quality Audits & ASME Y14.5 GD&T

In aerospace manufacturing, traditional Cartesian plus-minus tolerances ($\pm 0.05\\text{ mm}$) are obsolete:
- **True Position Tolerance Zones**: **ASME Y14.5 GD&T** specifies cylindrical tolerance zones relative to a defined **Datum Reference Frame (A, B, C)**. A cylindrical tolerance zone permits 57% more usable manufacturing area while guaranteeing exact kinematic interchangeability of airframe bolt patterns.
- **First Article Inspection (FAI - AS9102)**: Before serial production commences, the supplier must produce a comprehensive AS9102 Form 3 dimensional balloon drawing verified on a **Coordinate Measuring Machine (CMM)** measuring 100% of blueprint characteristics with traceable calibrated probes.

---
> **Key Takeaway**: Aerospace manufacturing links **metallurgical physics (Ti-6Al-4V thermal conductivity, cryogenic milling)** with **geometric precision (ASME Y14.5 GD&T, True Position)** and **regulatory compliance (AS9100D, AS9102 FAI)**.
`;

const aeroDialogue = {
  title: "AS9100D Quality Escrow: CMM Datum Shift on Titanium Wing-Spar Bulkhead",
  titleES: "Auditoría de Calidad AS9100D: Desviación de Datum en CMM para Mampara de Ala de Titanio",
  scenarioContext: "Seattle, WA (Aerospace Commercial Structures Quality) ⇄ Querétaro (Aerospace Machining Cluster). Urgent Root Cause Analysis.",
  characters: [
    { name: "Wayne Sterling", role: "VP of Quality & Supplier Compliance (Seattle)", avatar: "WS", color: "var(--cyan)" },
    { name: "Ing. Carlos Treviño", role: "Lead 5-Axis CNC Machining Engineer (Querétaro)", avatar: "CT", color: "var(--gold)" }
  ],
  turns: [
    {
      speaker: "Wayne Sterling",
      text: "Carlos, we're reviewing the First Article Inspection (FAI) package for Lot 104 on the titanium wing-spar bulkhead. The Coordinate Measuring Machine (CMM) report shows the fastener hole pattern breached True Position tolerance by 0.04 millimeters relative to Datum B. What caused the datum shift?",
      translation: "Carlos, estamos revisando el paquete de Inspección de Primer Artículo (FAI) del Lote 104 para la mampara de ala de titanio. El reporte de la Máquina de Medición por Coordenadas (CMM) muestra que el patrón de barrenos violó la tolerancia de Posición Verdadera por 0.04 milímetros respecto al Datum B. ¿Qué causó la desviación de datum?",
      targetTerms: ["First Article Inspection (FAI)", "titanium wing-spar", "Coordinate Measuring Machine (CMM)", "True Position tolerance", "Datum B"]
    },
    {
      speaker: "Ing. Carlos Treviño",
      text: "Hello Wayne. We isolated the root cause to tool deflection and thermal expansion during roughing. The 5-axis gantry CNC experienced a minor chiller pressure drop, causing the Ti-6Al-4V billet to heat up to 68°C before the finish pass. The thermal growth shifted the secondary datum alignment.",
      translation: "Hola Wayne. Aislamos la causa raíz en la deflexión de la herramienta y la expansión térmica durante el desbaste. La fresadora CNC de 5 ejes tipo pórtico experimentó una caída de presión en el enfriador, lo que provocó que el tocho de Ti-6Al-4V se calentara a 68°C antes de la pasada de acabado. El crecimiento térmico desplazó la alineación del datum secundario.",
      targetTerms: ["tool deflection", "thermal expansion", "5-axis gantry CNC", "Ti-6Al-4V billet", "secondary datum"]
    },
    {
      speaker: "Wayne Sterling",
      text: "That explains the coordinate shift. Titanium's thermal conductivity is notoriously low. Have you recalibrated the in-process touch probes, and are you using cryogenic CO2 through-spindle cooling for the finishing pass?",
      translation: "Eso explica el cambio de coordenadas. La conductividad térmica del titanio es notoriamente baja. ¿Recalibraron las sondas de contacto en proceso y están utilizando refrigeración criogénica por CO2 a través del husillo para la pasada de acabado?",
      targetTerms: ["thermal conductivity", "touch probes", "cryogenic CO2 through-spindle cooling", "finishing pass"]
    },
    {
      speaker: "Ing. Carlos Treviño",
      text: "Yes, Wayne. We engaged the through-spindle cryogenic CO2 delivery at -78°C, which stabilized the part temperature at 20°C throughout machining. We re-inspected the piece on the CMM with temperature compensation active; True Position is now within 0.012 millimeters, well inside blueprint tolerance.",
      translation: "Sí, Wayne. Activamos el suministro criogénico de CO2 a través del husillo a -78°C, lo que estabilizó la temperatura de la pieza en 20°C durante todo el maquinado. Reinspeccionamos la pieza en la CMM con compensación térmica activa; la Posición Verdadera está ahora dentro de 0.012 milímetros, holgadamente dentro de la tolerancia de plano.",
      targetTerms: ["through-spindle cryogenic CO2", "CMM temperature compensation", "blueprint tolerance"]
    }
  ],
  contrastTips: [
    {
      school: "The metal hole is in the wrong place.",
      native: "The fastener hole pattern deviated from the True Position tolerance zone relative to the primary datum reference frame.",
      explanation: "En la escuela se dice 'hole is in the wrong place', pero en la industria aeroespacial se especifica 'True Position tolerance zone' y 'Datum Reference Frame'."
    },
    {
      school: "The machine cuts very hard metal.",
      native: "The 5-axis CNC utilizes through-spindle cryogenic cooling to mill Ti-6Al-4V superalloys without thermal tool degradation.",
      explanation: "Se debe especificar la aleación aeroespacial exacta (Ti-6Al-4V), la cinemática de 5 ejes y el método de refrigeración criogénica."
    }
  ]
};

const aeroLexicon = [
  {
    term: "Geometric Dimensioning and Tolerancing (GD&T)",
    ipa: "/dʒiː.əˈmɛt.rɪk dɪˈmɛn.ʃən.ɪŋ/",
    es: "Dimensionamiento y Tolerancias Geométricas (GD&T)",
    category: "Metrología de Diseño",
    definition: "Standardized engineering language (ASME Y14.5) defining the permissible variation of geometric form, orientation, and location on blueprints.",
    collocations: ["ASME Y14.5 standard", "feature control frame", "maximum material condition (MMC)"],
    falseFriends: "No es simplemente 'acotar medidas'; es una formulación matemática de zonas de tolerancia tridimensionales.",
    nativeUsage: "Applying GD&T on the bulkhead blueprint ensured that bolt patterns align perfectly regardless of manufacturing site."
  },
  {
    term: "True Position",
    ipa: "/truː pəˈzɪʃ.ən/",
    es: "Posición Verdadera (True Position)",
    category: "Tolerancia Geométrica",
    definition: "The exact theoretical coordinate location of a feature, surrounded by a cylindrical or spherical tolerance zone relative to specified datums.",
    collocations: ["true position tolerance zone", "diametrical tolerance symbol (⌀)", "projected tolerance zone"],
    falseFriends: "No significa 'posición real'; es la ubicación matemática perfecta de diseño contra la cual se mide la pieza física.",
    nativeUsage: "The fastener holes must hold a True Position of ⌀0.05mm at Maximum Material Condition relative to Datums A, B, and C."
  },
  {
    term: "Titanium Grade 5 (Ti-6Al-4V)",
    ipa: "/taɪˈteɪ.ni.əm ɡreɪd faɪv/",
    es: "Titanio Grado 5 (Ti-6Al-4V)",
    category: "Superaleación Aeroespacial",
    definition: "Alpha-beta titanium alloy containing 6% aluminum and 4% vanadium, combining high tensile strength with exceptional corrosion resistance.",
    collocations: ["Ti-6Al-4V forged billet", "low thermal conductivity (6.7 W/mK)", "titanium galling"],
    falseFriends: "No es titanio puro comercial; es una aleación termotratada con vanadio y aluminio para uso estructural crítico.",
    nativeUsage: "Ti-6Al-4V is selected for landing gear support bulkheads due to its outstanding strength-to-weight ratio."
  },
  {
    term: "Datum Reference Frame (DRF)",
    ipa: "/ˈdeɪ.təm ˈrɛf.ər.əns freɪm/",
    es: "Marco de Referencia de Datum",
    category: "Metrología Dimensional",
    definition: "Three mutually perpendicular datum planes (Primary, Secondary, Tertiary) establishing the coordinate reference system for all part features.",
    collocations: ["establish the datum reference frame", "primary datum feature", "datum target points"],
    falseFriends: "En inglés técnico la pronunciación estándar en aviación es /ˈdeɪ-təm/ o /ˈdɑː-təm/, nunca 'dato'.",
    nativeUsage: "The CMM aligned its coordinate axes to the three-plane Datum Reference Frame before probing the rib pockets."
  },
  {
    term: "Coordinate Measuring Machine (CMM)",
    ipa: "/koʊˈɔːr.dɪ.nət ˈmɛʒ.ər.ɪŋ məˈʃiːn/",
    es: "Máquina de Medición por Coordenadas (CMM)",
    category: "Equipo de Inspección",
    definition: "High-precision automated inspection device measuring the physical geometry of an object by sensing discrete points with an optical or ruby-tip probe.",
    collocations: ["CMM ruby touch probe", "laser scanning CMM", "automated inspection routine"],
    falseFriends: "No es un escáner común; mide piezas industriales con exactitud de sub-micrómetros en cuartos climatizados a 20°C.",
    nativeUsage: "The aerospace inspector mounted the wing rib onto the CMM granite table to verify 150 feature characteristics."
  },
  {
    term: "First Article Inspection (FAI - AS9102)",
    ipa: "/fɜːrst ˈɑːr.tɪ.kəl ɪnˈspɛk.ʃən/",
    es: "Inspección de Primer Artículo (FAI)",
    category: "Aseguramiento de Calidad",
    definition: "Formal verification and documentation process confirming that production processes can reliably manufacture parts to blueprint specifications.",
    collocations: ["AS9102 Form 1, 2, and 3", "ballooned engineering drawing", "FAI sign-off escrow"],
    falseFriends: "No es inspeccionar 'el primer artículo que compraste en la tienda'; es el protocolo formal de validación inicial de línea de producción aeroespacial.",
    nativeUsage: "Serial shipment is suspended until the OEM quality council signs off on the AS9102 First Article Inspection report."
  },
  {
    term: "Cryogenic Machining",
    ipa: "/ˌkraɪ.oʊˈdʒɛn.ɪk məˈʃiːn.ɪŋ/",
    es: "Maquinado Criogénico",
    category: "Proceso de Fabricación",
    definition: "Metal cutting process delivering sub-zero fluids (liquid CO2 at -78°C or liquid nitrogen at -196°C) directly to the tool-chip interface.",
    collocations: ["through-spindle cryogenic CO2", "eliminate tool wear", "supercritical fluid cooling"],
    falseFriends: "No significa congelar la fábrica entera; es la inyección de microchorros criogénicos exclusivamente en el filo de corte.",
    nativeUsage: "Through-spindle cryogenic machining lowered cutting tip temperatures by 500°C, quadrupling tool longevity on titanium alloys."
  },
  {
    term: "Tool Deflection",
    ipa: "/tuːl dɪˈflɛk.ʃən/",
    es: "Deflexión de Herramienta",
    category: "Dinámica de Corte",
    definition: "Bending of a cutting tool under lateral cutting forces, causing dimensional errors and wall taper on deep pockets.",
    collocations: ["minimize endmill deflection", "tool overhang ratio", "radial cutting force"],
    falseFriends: "No es que la herramienta se rompa; es la flexión elástica microscópica que produce cortes cónicos en lugar de rectos.",
    nativeUsage: "Reducing the endmill overhang length from 60mm to 35mm eliminated tool deflection during high-speed titanium milling."
  },
  {
    term: "Surface Roughness (Ra)",
    ipa: "/ˈsɜːr.fɪs ˈrʌf.nəs/",
    es: "Rugosidad Superficial (Ra)",
    category: "Métrica de Calidad",
    definition: "Arithmetical average roughness of a surface profile measured in micrometers (µm) or microinches (µin).",
    collocations: ["Ra 0.8 micrometer finish", "surface profilometer scan", "fatigue life enhancement"],
    falseFriends: "En aviación la rugosidad es crítica porque las micro-ranuras concentran esfuerzos que originan fracturas por fatiga.",
    nativeUsage: "The wing spar pocket floor must meet a strict surface roughness requirement of Ra ≤ 0.8 µm to prevent stress concentration."
  },
  {
    term: "Chattering Harmonics",
    ipa: "/ˈtʃæt.ər.ɪŋ hɑːrˈmɑːn.ɪks/",
    es: "Vibración Armónica de Corte (Chatter)",
    category: "Dinámica de Mecanizado",
    definition: "Self-excited high-frequency vibration between the cutting tool and workpiece causing severe surface waviness and cutter chipping.",
    collocations: ["suppress regenerative chatter", "stability lobe diagram", "spindle speed harmonics"],
    falseFriends: "'Chatter' no es conversar amigablemente; en maquinado es el chirrido destructivo que destruye fresas de carburo y piezas caras.",
    nativeUsage: "The CNC programmer consulted the stability lobe diagram to adjust spindle speed to 7,200 RPM, eliminating regenerative chattering."
  },
  {
    term: "Non-Destructive Testing (NDT)",
    ipa: "/ˌnɑːn.dɪˈstrʌk.tɪv ˈtɛs.tɪŋ/",
    es: "Ensayos No Destructivos (END / NDT)",
    category: "Inspección de Calidad",
    definition: "Analysis techniques used in science and industry to evaluate material properties without causing physical damage.",
    collocations: ["fluorescent penetrant inspection (FPI)", "ultrasonic phased array NDT", "certified Level II NDT technician"],
    falseFriends: "No es una prueba 'amable'; es una inspección rigurosa con líquidos penetrantes, ultrasonido o rayos X para detectar microfisuras internas.",
    nativeUsage: "Following 5-axis machining, the titanium bulkhead underwent Fluorescent Penetrant Inspection (FPI) to verify zero surface microcracks."
  },
  {
    term: "Stress Relieving Heat Treatment",
    ipa: "/strɛs rɪˈliːv.ɪŋ hiːt ˈtriːt.mənt/",
    es: "Tratamiento Térmico de Alivio de Tensiones",
    category: "Metalurgia",
    definition: "Thermal process heating a metal component below its transformation temperature to relieve residual stresses induced by heavy milling.",
    collocations: ["vacuum furnace stress relief", "residual stress warping", "post-machining thermal soak"],
    falseFriends: "No es un descanso para operadores; es hornear la pieza en hornos de vacío para evitar que se doble por tensiones internas residuales.",
    nativeUsage: "The titanium structural rib was held at 540°C in a vacuum furnace for two hours to relieve internal machining stresses."
  }
];

const aeroSocratic = [
  {
    step: 1,
    concept: "Titanium Thermal Conductivity in Machining",
    botQuestion: "Welcome to the Aerospace Machining Audit! Explain in English why Ti-6Al-4V (Titanium Grade 5) is notoriously difficult to machine compared to Aluminum alloys. How does its low thermal conductivity impact the cutting edge?",
    requiredKeywords: ["titanium", "thermal conductivity", "heat", "carbide", "tool", "cutting edge", "aluminum", "temperatures"],
    minKeywords: 3,
    feedbackSuccess: "Flawless metallurgical reasoning! Titanium has an extremely low thermal conductivity (6.7 W/m·K) compared to aluminum (200 W/m·K). The heat generated during shearing cannot dissipate into the chip and instead concentrates at the carbide tool edge, causing rapid galling and premature tool failure.",
    feedbackRetry: "Think about where the heat goes: in aluminum, 80% of the heat leaves with the flying chips. What happens when titanium cannot conduct heat away from the tool contact point?"
  },
  {
    step: 2,
    concept: "True Position vs Cartesian Tolerances",
    botQuestion: "Why does the aerospace industry use ASME Y14.5 True Position GD&T tolerances instead of traditional ± plus-minus Cartesian tolerances for wing-spar fastener holes?",
    requiredKeywords: ["true position", "cylindrical", "tolerance zone", "datum", "asme", "cartesian", "square", "interchangeability"],
    minKeywords: 3,
    feedbackSuccess: "Outstanding GD&T knowledge! Traditional plus-minus coordinates define a restrictive square tolerance zone. True Position defines a 360-degree cylindrical zone relative to defined Datums, granting 57% more allowable manufacturing area while mathematically ensuring kinematic interchangeability.",
    feedbackRetry: "Contrast the geometric shape: plus-minus tolerances create a square box, while True Position defines a cylindrical zone with a diameter symbol (⌀). Why does a circle give more manufacturing freedom than a square?"
  }
];

if (LXP_COURSES["aerospace"] && LXP_COURSES["aerospace"].modules) {
  const m1 = LXP_COURSES["aerospace"].modules[0];
  m1.isGoldModel = true;
  m1.title = "5-Axis CNC Titanium Machining & AS9100D Geometric Tolerancing";
  m1.titleES = "Maquinado CNC de 5 Ejes en Titanio y Tolerancias AS9100D";
  m1.readings[0] = {
    id: "aero-m1-r1",
    title: "5-Axis CNC Titanium Machining & AS9100D GD&T",
    duration: "14 min",
    content: aeroReading,
    vocabulary: aeroLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
  };
  m1.dialogue = aeroDialogue;
  m1.lexiconMatrix = aeroLexicon;
  m1.socraticChallenges = aeroSocratic;
  console.log('✓ Successfully enriched aerospace (aero-m1)');
}

// -------------------------------------------------------------
// 5. WRITE BACK TO COURSES.JS
// -------------------------------------------------------------
const header = `/**
 * stemOS LXP Course Content Database
 * ====================================
 * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks
 * 
 * Organizado en 4 Categorías Maestras y 26 Tracks Modulares:
 *  - 🔵 TECHNOLOGY (6 Tracks)
 *  - 🟢 ENGINEERING & INDUSTRY (8 Tracks)
 *  - 🟣 SCIENCE & FUTURE TECHNOLOGY (6 Tracks)
 *  - 🟠 AVIATION, CAREER & PROFESSIONAL ENGLISH (6 Tracks)
 * 
 * Target Level: A2+ / B1 CEFR Multi-Nivel
 * Incluye Modelos Gold ESP (Lectura de especificación pura, Diálogo real de planta, Matriz de colocaciones y Evaluador Socrático Feynman).
 */

var LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};

var LXP_COURSES = ${JSON.stringify(LXP_COURSES, null, 4)};

// Make available for window and import
if (typeof window !== 'undefined') {
    window.LXP_CATEGORIES = LXP_CATEGORIES;
    window.LXP_COURSES = LXP_COURSES;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LXP_CATEGORIES: LXP_CATEGORIES,
        LXP_COURSES: LXP_COURSES
    };
}
`;

fs.writeFileSync(coursesPath, header, 'utf8');
console.log('Successfully expanded all flagship courses in:', coursesPath);
