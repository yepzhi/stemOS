// scripts/expand_telecom.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Telecom:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// TELECOM & IOT: 5G NR, LoRaWAN & Edge Computing (telecom-m1)
// -------------------------------------------------------------
const telecomReading = `
> **Industry Alignment & Connectivity Standard**: Aligned with **3GPP Release 16 (5G NR)** and **LoRaWAN® Specification 1.0.4**. Essential for IoT Network Architects, RF Engineers, and Telecommunications Specialists.

# 5G New Radio, LoRaWAN, and Edge Computing in IoT

The Internet of Things (IoT) requires vastly different connectivity profiles depending on the use case. A robotic surgeon requires ultra-low latency, while a smart water meter in a basement requires massive battery life and deep indoor penetration. Telecommunications engineers must architect networks utilizing the correct spectrum and protocol.

## 1. 5G NR (New Radio) and Network Slicing
Unlike 4G LTE, 5G is not just about faster smartphones; it is a foundational technology for critical infrastructure.
- **eMBB (Enhanced Mobile Broadband)**: High throughput for video streaming and AR/VR applications.
- **URLLC (Ultra-Reliable Low-Latency Communication)**: Designed for autonomous driving and industrial robotics, guaranteeing sub-millisecond latency and 99.999% reliability.
- **Network Slicing**: Using Software-Defined Networking (SDN), a single physical 5G network is virtually "sliced" into multiple logical networks. The hospital's URLLC slice is completely isolated from the consumer's eMBB slice, ensuring bandwidth is never compromised during an emergency.

## 2. LPWAN and the LoRaWAN Protocol
For massive IoT deployments (e.g., smart agriculture, asset tracking), 5G is often overkill and too power-hungry. Low-Power Wide-Area Networks (LPWAN) fill this gap.
- **LoRa (Long Range)**: A proprietary physical layer radio modulation technique based on Chirp Spread Spectrum (CSS) technology. It operates in unlicensed ISM bands (e.g., 915 MHz in North America).
- **LoRaWAN**: The MAC (Media Access Control) layer protocol built on top of LoRa. It allows a sensor to transmit a few bytes of data over 10+ kilometers while running on a single coin-cell battery for 10 years. 
- **Spreading Factor (SF)**: Engineers trade data rate for range. A higher Spreading Factor (e.g., SF12) increases the time on air, maximizing range and deep indoor penetration, but severely limits the payload size to bytes per hour.

## 3. Edge Computing and MQTT
Sending billions of raw sensor readings to the cloud is expensive and introduces latency.
- **Edge Computing**: Data processing is pushed to the "edge" of the network (e.g., an industrial gateway on the factory floor). Only aggregated data or anomalies are forwarded to the cloud.
- **MQTT (Message Queuing Telemetry Transport)**: The de facto messaging protocol for IoT. It uses a lightweight **Publish/Subscribe** model. Sensors publish telemetry to a centralized MQTT Broker on specific "topics," and edge gateways subscribe to those topics, decoupling the hardware from the software layer.

---
> **Key Takeaway**: Modern IoT architecture links **spectrum efficiency (LoRaWAN Spreading Factors)** with **critical infrastructure (5G URLLC Network Slicing)** and **decoupled messaging (MQTT Pub/Sub)**.
`;

const telecomDialogue = {
  title: "Network Architecture: Smart City Water Metering",
  titleES: "Arquitectura de Red: Medición de Agua en Smart City",
  scenarioContext: "Guadalajara, Jalisco (IoT Design Center) ⇄ Cisco IoT Solutions Team. Planning a massive smart meter deployment.",
  characters: [
    { name: "Ing. Carlos Mendoza", role: "IoT Solutions Architect", avatar: "CM", color: "var(--cyan)" },
    { name: "Rachel Adams", role: "Lead RF Engineer (Cisco)", avatar: "RA", color: "var(--emerald)" }
  ],
  turns: [
    {
      speaker: "Ing. Carlos Mendoza",
      text: "Rachel, the city wants to deploy 500,000 smart water meters underground. Initially, they requested 5G modules, but I pushed back. 5G NR is too power-hungry for a 10-year battery life, and high-frequency bands suffer from severe path loss in basements.",
      translation: "Rachel, la ciudad quiere desplegar 500,000 medidores de agua inteligentes bajo tierra. Inicialmente pidieron módulos 5G, pero me opuse. 5G NR consume demasiada energía para una batería de 10 años, y las bandas de alta frecuencia sufren de severa pérdida de trayectoria (path loss) en sótanos.",
      targetTerms: ["5G NR", "power-hungry", "battery life", "high-frequency bands", "path loss"]
    },
    {
      speaker: "Rachel Adams",
      text: "Exactly, Carlos. For massive machine-type communication deep indoors, we need a Low-Power Wide-Area Network. I recommend a LoRaWAN architecture operating in the unlicensed 915 MHz ISM band.",
      translation: "Exactamente, Carlos. Para comunicación masiva tipo máquina en interiores profundos, necesitamos una red de área amplia de baja potencia (LPWAN). Recomiendo una arquitectura LoRaWAN operando en la banda libre ISM de 915 MHz.",
      targetTerms: ["massive machine-type communication", "Low-Power Wide-Area Network", "LoRaWAN architecture", "unlicensed", "ISM band"]
    },
    {
      speaker: "Ing. Carlos Mendoza",
      text: "Agreed. To guarantee signal penetration through the concrete, we will configure the end-nodes with a Spreading Factor of 12. The data rate will drop to around 250 bits per second, but water meters only need to transmit a tiny MQTT payload once a day.",
      translation: "De acuerdo. Para garantizar la penetración de la señal a través del concreto, configuraremos los nodos finales con un Factor de Dispersión (Spreading Factor) de 12. La tasa de datos caerá a unos 250 bits por segundo, pero los medidores solo necesitan transmitir una pequeña carga útil (payload) MQTT una vez al día.",
      targetTerms: ["signal penetration", "end-nodes", "Spreading Factor", "data rate", "MQTT payload"]
    },
    {
      speaker: "Rachel Adams",
      text: "Perfect. We will deploy the LoRa gateways on the city's cellular towers. The gateways will act as packet forwarders, tunneling the MQTT messages back to the central network server via a secure 5G URLLC backhaul.",
      translation: "Perfecto. Desplegaremos los gateways LoRa en las torres celulares de la ciudad. Los gateways actuarán como reenviadores de paquetes (packet forwarders), tunelizando los mensajes MQTT de vuelta al servidor de red central a través de un backhaul seguro 5G URLLC.",
      targetTerms: ["gateways", "cellular towers", "packet forwarders", "tunneling", "backhaul"]
    }
  ],
  contrastTips: [
    {
      school: "The signal doesn't reach the basement.",
      native: "The high-frequency bands suffer from severe path loss in deep indoor environments.",
      explanation: "En telecomunicaciones, la 'señal que no llega' se cuantifica como 'path loss' (pérdida de trayectoria o atenuación) y penetración ('deep indoor')."
    },
    {
      school: "The sensor sends a small message over the internet.",
      native: "The end-node transmits a small MQTT payload over the LoRaWAN physical layer.",
      explanation: "Los ingenieros de IoT especifican el rol del dispositivo ('end-node'), el protocolo de aplicación ('MQTT payload') y la capa física ('LoRaWAN')."
    }
  ]
};

const telecomLexicon = [
  {
    term: "Network Slicing",
    ipa: "/ˈnɛt.wɜːrk ˈslaɪ.sɪŋ/",
    es: "Corte de Red / Segmentación de Red (5G)",
    category: "Arquitectura 5G",
    definition: "A network architecture that enables the multiplexing of virtualized and independent logical networks on the same physical network infrastructure, each tailored for a specific service requirement.",
    collocations: ["5G network slicing", "URLLC slice", "SLA guarantees"],
    falseFriends: "No es 'rebanar cables'; es la virtualización extrema por software (SDN) para garantizar el ancho de banda a servicios críticos.",
    nativeUsage: "The autonomous vehicle fleet operates on a dedicated URLLC network slice to prevent latency spikes during high-traffic hours."
  },
  {
    term: "LoRaWAN",
    ipa: "/ˈlɔː.rə.wæn/",
    es: "LoRaWAN (Red de Área Amplia de Largo Alcance)",
    category: "Protocolos LPWAN",
    definition: "A Low-Power, Wide-Area (LPWA) networking protocol designed to wirelessly connect battery-operated 'things' to the internet in regional, national or global networks.",
    collocations: ["LoRaWAN gateway", "unlicensed spectrum", "Chirp Spread Spectrum"],
    falseFriends: "LoRa es la modulación de radio física; LoRaWAN es el protocolo de software MAC que se ejecuta por encima.",
    nativeUsage: "We covered the entire 5,000-acre farm with soil moisture sensors using just three LoRaWAN gateways."
  },
  {
    term: "Spreading Factor (SF)",
    ipa: "/ˈsprɛd.ɪŋ ˈfæk.tər/",
    es: "Factor de Dispersión / Esparcimiento",
    category: "Radiofrecuencia",
    definition: "In LoRa modulation, the duration of the chirp. A higher SF increases the receiver's sensitivity and range but exponentially increases the time on air and decreases the data rate.",
    collocations: ["increase spreading factor", "SF12 deep indoor", "time on air"],
    falseFriends: "No es factor de 'propagación de virus'; es la configuración de radio que intercambia velocidad de datos por alcance kilométrico.",
    nativeUsage: "The basement water meters required Spreading Factor 12 to punch through the concrete foundation."
  },
  {
    term: "URLLC",
    ipa: "/juː-ɑːr-ɛl-ɛl-siː/",
    es: "Comunicaciones Ultra Confiables de Baja Latencia",
    category: "Clasificación 5G",
    definition: "Ultra-Reliable Low-Latency Communication. A 5G NR category designed for mission-critical applications requiring sub-millisecond latency and 99.999% availability.",
    collocations: ["URLLC backhaul", "mission-critical IoT", "robotic telesurgery"],
    falseFriends: "Es un acrónimo. No se lee como palabra, se deletrea U-R-L-L-C.",
    nativeUsage: "Remote robotic surgery is only possible over a 5G URLLC connection due to the strict latency limits."
  },
  {
    term: "MQTT",
    ipa: "/ɛm-kjuː-tiː-tiː/",
    es: "MQTT (Message Queuing Telemetry Transport)",
    category: "Mensajería IoT",
    definition: "A lightweight, publish-subscribe network protocol that transports messages between devices, ideal for remote locations with a small code footprint and limited network bandwidth.",
    collocations: ["MQTT broker", "publish/subscribe model", "telemetry payload"],
    falseFriends: "Originalmente 'MQ Telemetry Transport', pero hoy es el estándar ISO (ISO/IEC 20922) para conectar sensores a la nube.",
    nativeUsage: "The temperature sensor publishes its data to the MQTT broker on the topic 'factory/zone1/temp'."
  },
  {
    term: "Path Loss",
    ipa: "/pæθ lɔːs/",
    es: "Pérdida de Trayectoria",
    category: "Física de Ondas",
    definition: "The reduction in power density of an electromagnetic wave as it propagates through space, caused by free space dispersion, absorption, and diffraction.",
    collocations: ["severe path loss", "calculate link budget", "penetration loss"],
    falseFriends: "No significa que perdiste tu camino; es la atenuación o pérdida de fuerza de la señal de radio a través del aire y obstáculos.",
    nativeUsage: "The high-frequency 5G mmWave signals suffer from massive path loss when passing through tinted glass windows."
  }
];

const telecomSocratic = [
  {
    step: 1,
    concept: "5G URLLC & Network Slicing",
    botQuestion: "Welcome to the Telecom Engineering Audit! In 5G networks, what is 'Network Slicing'? Why is it crucial to put a remote robotic surgery application on a URLLC slice rather than a consumer eMBB slice?",
    requiredKeywords: ["slicing", "virtual", "logical", "isolated", "urllc", "latency", "reliable", "bandwidth"],
    minKeywords: 3,
    feedbackSuccess: "Perfect! Network slicing creates isolated virtual networks on the same physical hardware. Robotic surgery demands a URLLC slice to guarantee sub-millisecond latency and extreme reliability, which shouldn't be interrupted by someone streaming Netflix on the eMBB slice.",
    feedbackRetry: "Think about dividing a single physical network into virtual pieces. What is the term for that? Why does a surgeon need 'Ultra-Reliable Low-Latency' (URLLC) instead of consumer broadband?"
  },
  {
    step: 2,
    concept: "LoRaWAN & Spreading Factor",
    botQuestion: "When designing an IoT network for underground water meters, why would an engineer choose LoRaWAN instead of 5G? What happens to the data rate and the signal range when you increase the 'Spreading Factor' (e.g., to SF12)?",
    requiredKeywords: ["lorawan", "battery", "power", "spreading", "factor", "range", "penetration", "data", "rate"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! LoRaWAN is chosen for its 10-year battery life and long range. Increasing the Spreading Factor to 12 drastically improves signal penetration (range) through concrete, but as a tradeoff, it severely decreases the data rate.",
    feedbackRetry: "Compare battery usage: which one lasts 10 years on a coin cell? Also, consider the trade-off in radio physics: if you increase the 'Spreading Factor' to push the signal through thick concrete, what happens to the speed (data rate)?"
  }
];

if (!LXP_COURSES["telecom-iot"]) {
  LXP_COURSES["telecom-iot"] = {
    id: "telecom-iot",
    category: "cat-tech",
    title: "Telecommunications & IoT",
    titleES: "Telecomunicaciones e IoT",
    icon: "📡",
    desc: "Master 5G NR architectures, LoRaWAN LPWAN protocols, and MQTT edge computing for industrial IoT.",
    descES: "Domina arquitecturas 5G NR, protocolos LoRaWAN LPWAN y edge computing MQTT para IoT industrial.",
    modules_required: 1,
    modules: [
      {
        id: "telecom-m1",
        title: "5G NR, LoRaWAN & Edge Computing",
        titleES: "5G NR, LoRaWAN y Edge Computing",
        isGoldModel: true,
        readings: [
          {
            id: "telecom-m1-r1",
            title: "IoT Connectivity, Network Slicing & MQTT",
            duration: "12 min",
            content: telecomReading,
            vocabulary: telecomLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: telecomDialogue,
        lexiconMatrix: telecomLexicon,
        socraticChallenges: telecomSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["telecom-iot"].modules[0] = {
    id: "telecom-m1",
    title: "5G NR, LoRaWAN & Edge Computing",
    titleES: "5G NR, LoRaWAN y Edge Computing",
    isGoldModel: true,
    readings: [
      {
        id: "telecom-m1-r1",
        title: "IoT Connectivity, Network Slicing & MQTT",
        duration: "12 min",
        content: telecomReading,
        vocabulary: telecomLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: telecomDialogue,
    lexiconMatrix: telecomLexicon,
    socraticChallenges: telecomSocratic,
    quiz: []
  };
}

const header = `/**
 * stemOS LXP Course Content Database
 * ====================================
 * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks
 */

var LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};

var LXP_COURSES = ${JSON.stringify(LXP_COURSES, null, 4)};

if (typeof window !== 'undefined') {
    window.LXP_CATEGORIES = LXP_CATEGORIES;
    window.LXP_COURSES = LXP_COURSES;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LXP_CATEGORIES, LXP_COURSES };
}
`;

fs.writeFileSync(coursesPath, header, 'utf8');
console.log('Successfully added Telecom module to courses.js');
