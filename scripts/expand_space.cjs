// scripts/expand_space.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Space:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// SPACE & SATELLITE: Orbital Mechanics & CubeSats (space-m1)
// -------------------------------------------------------------
const spaceReading = `
> **Industry Alignment & Engineering Standard**: Aligned with **NASA Systems Engineering Handbook** and **CubeSat Design Specification (CDS)**. Essential for Aerospace Engineers, Mission Planners, and Satellite Technicians.

# Space Technology, Orbital Mechanics, and CubeSat Design

The commercialization of space, often referred to as "NewSpace," has dramatically lowered the barrier to entry for satellite deployment. Engineers are no longer constrained to massive, billion-dollar geostationary satellites; instead, they are deploying massive constellations of miniature satellites in Low Earth Orbit.

## 1. Orbital Mechanics and LEO
Choosing the correct orbit dictates the satellite's mission capabilities, launch costs, and operational lifespan.
- **Low Earth Orbit (LEO)**: Typically between 160 km and 2,000 km altitude. LEO offers low latency for communications (e.g., Starlink) and high resolution for Earth observation. However, objects in LEO experience significant atmospheric drag and require periodic re-boosting or they will de-orbit and burn up in the atmosphere.
- **Geostationary Equatorial Orbit (GEO)**: At an altitude of exactly 35,786 km, a satellite's orbital period matches Earth's rotation (24 hours). The satellite appears stationary over a single point on the equator, making it ideal for weather monitoring and television broadcasting, though latency is high (around 250ms).
- **Delta-v (Δv)**: A measure of the impulse required to perform a maneuver, such as launching, orbital insertion, or inclination changes. Engineers budget Delta-v like fuel in a car.

## 2. The CubeSat Revolution
The **CubeSat** is a standardized class of nanosatellites that has revolutionized space access for universities and private companies.
- **Form Factor (The 'U')**: A standard 1U CubeSat measures 10x10x10 cm and weighs no more than 1.33 kg. They can be scaled up (e.g., 3U, 6U, 12U) by stacking these basic units.
- **COTS Components**: Commercial Off-The-Shelf components are heavily utilized in NewSpace to reduce costs, unlike traditional space-grade hardware which is radiation-hardened and extremely expensive.
- **Deployment (P-POD)**: CubeSats are typically launched as secondary payloads. Once in orbit, a Poly Picosatellite Orbital Deployer (P-POD) uses a spring mechanism to eject the CubeSats safely without interfering with the primary payload.

## 3. Subsystem Architecture
A satellite is a highly constrained system operating in a hostile environment (extreme thermal cycling, vacuum, and ionizing radiation).
- **EPS (Electrical Power System)**: Manages solar panel generation, battery storage, and power distribution to other subsystems during the eclipse phase of the orbit.
- **ADCS (Attitude Determination and Control System)**: Maintains the satellite's orientation. It uses sensors (star trackers, sun sensors) to determine its attitude, and actuators (reaction wheels, magnetorquers) to point antennas toward Earth or solar panels toward the sun.
- **Telemetry, Tracking, and Command (TT&C)**: The two-way communication link between the spacecraft and the ground station.

---
> **Key Takeaway**: Modern space engineering relies on the standardization of the **CubeSat form factor**, the low latency of **LEO constellations**, and the rigorous management of **Delta-v** and **ADCS**.
`;

const spaceDialogue = {
  title: "Mission Planning: CubeSat Constellation Deployment",
  titleES: "Planificación de Misión: Despliegue de Constelación CubeSat",
  scenarioContext: "Houston, TX (Mission Control) ⇄ Monterrey, MX (Satellite Design Lab). Discussing a 6U CubeSat deployment.",
  characters: [
    { name: "Ing. Sofia Morales", role: "Lead Systems Engineer", avatar: "SM", color: "var(--cyan)" },
    { name: "Dr. James Carter", role: "Flight Dynamics Officer", avatar: "JC", color: "var(--amber)" }
  ],
  turns: [
    {
      speaker: "Ing. Sofia Morales",
      text: "James, we finished the thermal vacuum testing on the 6U CubeSat. However, our Delta-v budget is extremely tight for the planned inclination change after deployment.",
      translation: "James, terminamos las pruebas de vacío térmico en el CubeSat 6U. Sin embargo, nuestro presupuesto de Delta-v está extremadamente ajustado para el cambio de inclinación planeado después del despliegue.",
      targetTerms: ["thermal vacuum testing", "6U CubeSat", "Delta-v budget", "inclination change", "deployment"]
    },
    {
      speaker: "Dr. James Carter",
      text: "Understood, Sofia. If the primary payload drops you at a 500-kilometer Low Earth Orbit, the atmospheric drag will be minimal, but performing a significant plane change maneuver requires too much propellant.",
      translation: "Entendido, Sofía. Si la carga útil principal los deja en una Órbita Terrestre Baja de 500 kilómetros, el arrastre atmosférico será mínimo, pero realizar una maniobra significativa de cambio de plano requiere demasiado propulsor.",
      targetTerms: ["primary payload", "Low Earth Orbit", "atmospheric drag", "plane change maneuver", "propellant"]
    },
    {
      speaker: "Ing. Sofia Morales",
      text: "Exactly. To conserve propellant, I recommend we rely on the ADCS to stabilize the spacecraft using magnetorquers, rather than firing the thrusters. We can accept a slight drift in the orbital plane.",
      translation: "Exactamente. Para conservar propulsor, recomiendo que dependamos del ADCS para estabilizar la nave espacial usando magnetorquers, en lugar de encender los propulsores. Podemos aceptar una ligera deriva en el plano orbital.",
      targetTerms: ["conserve propellant", "ADCS", "stabilize the spacecraft", "magnetorquers", "thrusters", "orbital plane"]
    },
    {
      speaker: "Dr. James Carter",
      text: "That’s a smart tradeoff. As long as the solar panels maintain optimal sun-pointing during the eclipse phase, the EPS won't suffer. I will update the telemetry parameters for the ground station pass.",
      translation: "Ese es un intercambio inteligente. Mientras los paneles solares mantengan un apunte óptimo al sol durante la fase de eclipse, el EPS no sufrirá. Actualizaré los parámetros de telemetría para el pase de la estación terrena.",
      targetTerms: ["tradeoff", "sun-pointing", "eclipse phase", "EPS", "telemetry", "ground station pass"]
    }
  ],
  contrastTips: [
    {
      school: "The satellite doesn't have enough gas.",
      native: "The spacecraft has an extremely tight Delta-v budget and limited propellant.",
      explanation: "En la ingeniería aeroespacial, no se usa 'gas'; se planifica un 'presupuesto de Delta-v' (Delta-v budget) basado en el 'propulsor' (propellant)."
    },
    {
      school: "We need to turn the satellite to face the sun.",
      native: "The ADCS must execute a sun-pointing maneuver to stabilize the attitude.",
      explanation: "El control de posición en el espacio se llama 'Attitude Determination and Control System' (ADCS), y 'orientar' se describe como 'attitude' o 'pointing'."
    }
  ]
};

const spaceLexicon = [
  {
    term: "Delta-v (Δv)",
    ipa: "/ˈdɛl.tə viː/",
    es: "Delta-v (Cambio de Velocidad)",
    category: "Mecánica Orbital",
    definition: "A measure of the impulse needed to perform a trajectory maneuver. It is the mathematical measure of how much a spacecraft's velocity must change to move from one orbit to another.",
    collocations: ["Delta-v budget", "orbital insertion", "plane change"],
    falseFriends: "No es simplemente 'velocidad'; es el 'presupuesto de esfuerzo' o impulso total del que dispone una nave.",
    nativeUsage: "We lack the Delta-v required to reach GEO, so we must settle for a highly elliptical orbit."
  },
  {
    term: "CubeSat",
    ipa: "/ˈkjuːb.sæt/",
    es: "Nanosatélite CubeSat",
    category: "Diseño de Naves",
    definition: "A class of miniaturized satellites for space research made up of multiples of 10×10×10 cm cubic units (1U).",
    collocations: ["3U form factor", "CubeSat constellation", "P-POD deployer"],
    falseFriends: "No es un 'cubo satelital' de TV; es un estándar internacional de diseño de hardware aeroespacial.",
    nativeUsage: "The university successfully launched a 3U CubeSat to study ionizing radiation in LEO."
  },
  {
    term: "ADCS",
    ipa: "/eɪ-diː-siː-ɛs/",
    es: "Sistema de Control y Determinación de Actitud",
    category: "Subsistemas",
    definition: "Attitude Determination and Control System. The subsystem responsible for determining the spacecraft's orientation in space (attitude) and actively controlling it.",
    collocations: ["ADCS sensors", "magnetorquers", "reaction wheels"],
    falseFriends: "En el espacio, 'attitude' no significa 'actitud mental', sino la orientación física de la nave en 3D.",
    nativeUsage: "The ADCS utilizes three reaction wheels to maintain precise pointing toward the ground station."
  },
  {
    term: "Low Earth Orbit (LEO)",
    ipa: "/liː.oʊ/",
    es: "Órbita Terrestre Baja",
    category: "Mecánica Orbital",
    definition: "An Earth-centered orbit with an altitude of 2,000 km or less. It is the most common orbit for imaging satellites and the International Space Station.",
    collocations: ["LEO constellation", "atmospheric drag", "de-orbit"],
    falseFriends: "LEO no es el signo zodiacal; es la órbita de baja altura donde el arrastre atmosférico es un factor.",
    nativeUsage: "Starlink operates thousands of satellites in LEO to provide low-latency internet."
  },
  {
    term: "Telemetry",
    ipa: "/təˈlɛm.ɪ.tri/",
    es: "Telemetría",
    category: "Comunicaciones",
    definition: "The automated communications process by which measurements and other data are collected at remote or inaccessible points (like a spacecraft) and transmitted to receiving equipment for monitoring.",
    collocations: ["telemetry downlink", "TT&C subsystem", "ground station"],
    falseFriends: "No tiene que ver con 'telequinesis'; es la transmisión de datos métricos (temperatura, voltaje) desde el satélite.",
    nativeUsage: "Mission control lost the telemetry downlink just as the spacecraft entered the eclipse phase."
  },
  {
    term: "Propellant",
    ipa: "/prəˈpɛl.ənt/",
    es: "Propulsor (Combustible Espacial)",
    category: "Propulsión",
    definition: "A chemical mixture burned to produce thrust in rockets or spacecraft. It typically consists of a fuel and an oxidizer.",
    collocations: ["hypergolic propellant", "conserve propellant", "thruster firing"],
    falseFriends: "No digas 'gas' o 'fuel' de forma aislada; 'propellant' abarca la masa expulsada para generar empuje en el vacío.",
    nativeUsage: "The satellite has enough hydrazine propellant to maintain its orbit for another five years."
  }
];

const spaceSocratic = [
  {
    step: 1,
    concept: "Orbital Mechanics & LEO",
    botQuestion: "Welcome to Mission Control! If you are launching a satellite constellation to provide low-latency internet (like Starlink), which orbit should you choose: LEO or GEO? What is a major disadvantage (related to the atmosphere) of being in that orbit?",
    requiredKeywords: ["leo", "low", "earth", "orbit", "latency", "drag", "atmosphere", "de-orbit"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! You must choose Low Earth Orbit (LEO) for low latency. However, objects in LEO experience atmospheric drag, requiring periodic boosts to avoid burning up.",
    feedbackRetry: "Think about distance. Which orbit is closer to Earth (yielding lower latency)? What does the thin upper atmosphere do to objects flying close to Earth?"
  },
  {
    step: 2,
    concept: "ADCS & Delta-v",
    botQuestion: "Suppose your CubeSat needs to turn its solar panels toward the sun, but you want to save 'fuel'. Which subsystem (acronym) is responsible for turning the satellite, and what is the term for the 'fuel budget' or impulse required for maneuvers?",
    requiredKeywords: ["adcs", "attitude", "determination", "control", "delta-v", "budget", "propellant"],
    minKeywords: 2,
    feedbackSuccess: "Perfect! The ADCS (Attitude Determination and Control System) handles the pointing maneuver, saving your precious Delta-v (Δv) budget for larger trajectory changes.",
    feedbackRetry: "What 4-letter acronym stands for the system that controls the satellite's 'attitude' (orientation)? And what is the mathematical term (Delta-something) for the impulse budget?"
  }
];

if (!LXP_COURSES["space-satellite"]) {
  LXP_COURSES["space-satellite"] = {
    id: "space-satellite",
    category: "cat-science",
    title: "Space & Satellite Technology",
    titleES: "Tecnología Espacial y Satelital",
    icon: "🛰️",
    desc: "Master orbital mechanics, CubeSat engineering (CDS), and telemetry systems for NewSpace missions.",
    descES: "Domina la mecánica orbital, ingeniería de CubeSats (CDS) y sistemas de telemetría para misiones NewSpace.",
    modules_required: 1,
    modules: [
      {
        id: "space-m1",
        title: "Orbital Mechanics & CubeSats",
        titleES: "Mecánica Orbital y CubeSats",
        isGoldModel: true,
        readings: [
          {
            id: "space-m1-r1",
            title: "NewSpace, LEO & ADCS",
            duration: "11 min",
            content: spaceReading,
            vocabulary: spaceLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: spaceDialogue,
        lexiconMatrix: spaceLexicon,
        socraticChallenges: spaceSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["space-satellite"].modules[0] = {
    id: "space-m1",
    title: "Orbital Mechanics & CubeSats",
    titleES: "Mecánica Orbital y CubeSats",
    isGoldModel: true,
    readings: [
      {
        id: "space-m1-r1",
        title: "NewSpace, LEO & ADCS",
        duration: "11 min",
        content: spaceReading,
        vocabulary: spaceLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: spaceDialogue,
    lexiconMatrix: spaceLexicon,
    socraticChallenges: spaceSocratic,
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
console.log('Successfully added Space module to courses.js');
