// scripts/expand_airforce.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Air Force:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// AIR FORCE AEROSPACE ENGLISH: NATO STANAG & Supersonic Aerodynamics (af-m1)
// -------------------------------------------------------------
const afReading = `
> **Military & Aerospace Standard**: Aligned with **NATO STANAG 6001 (Language Proficiency Levels)** and **MIL-STD-1553 (Digital Time Division Command/Response Multiplex Data Bus)**. Essential for defense contractors, military pilots, and avionics systems engineers.

# Supersonic Aerodynamics, Flight Envelope & Brevity Codes

Military aviation operates at the extreme edges of aerodynamic physics and human endurance. Communication in this domain is highly compressed, utilizing standardized "Brevity Codes" to transmit complex tactical information in fractions of a second during high-G combat maneuvers.

## 1. Supersonic Aerodynamics and the Flight Envelope
When an aircraft approaches the speed of sound (Mach 1), it enters the **transonic regime**. 
- **Compressibility and Shock Waves**: As the aircraft accelerates, air molecules cannot move out of the way fast enough. They compress, forming a **shock wave** at the nose and wing leading edges. This creates a massive increase in aerodynamic drag known as **Wave Drag**.
- **Mach Tuck**: As the shock wave moves aft along the wing, the center of lift shifts backward, causing the aircraft's nose to pitch down violently—a phenomenon called Mach Tuck. Advanced fly-by-wire (FBW) systems automatically adjust the horizontal stabilators to counter this.
- **Flight Envelope**: The operational boundaries of an aircraft, defined by airspeed (Mach number), altitude, and structural load factor (G-force). Operating outside this "doghouse plot" results in aerodynamic stall or structural failure.

## 2. Multi-Sensor Fusion and MIL-STD-1553
Modern 5th-generation fighters (like the F-35) do not present raw sensor data to the pilot. Instead, they utilize **Sensor Fusion**.
- **MIL-STD-1553 Databus**: The military standard for avionics data integration. It is a dual-redundant, deterministic serial bus where a Bus Controller coordinates all communications between Remote Terminals (Radar, Electronic Warfare suite, Weapons systems) using a command/response protocol.
- **Active Electronically Scanned Array (AESA) Radar**: Unlike mechanical radars that physically sweep a dish, AESA radars steer radio beams electronically using thousands of solid-state transmit/receive modules, allowing simultaneous air-to-air tracking and air-to-ground mapping without moving parts.

## 3. Tactical Brevity Codes
During Beyond Visual Range (BVR) engagements, pilots use standardized, unclassified Brevity Words to convey information instantly over UHF/VHF radios without clogging the frequency:
- **BINGO**: Fuel state needed for recovery. (e.g., "Bingo fuel" means the aircraft must return to base immediately).
- **JOKER**: Fuel state above BINGO at which separation/bugout should begin.
- **FOX 3**: Simulated or actual launch of an active radar-guided missile (e.g., AIM-120 AMRAAM).
- **SPIKE**: Radar warning receiver (RWR) indication of an airborne threat in track or launch mode.

---
> **Key Takeaway**: Defense aerospace merges **extreme aerodynamics (Shock Waves, Mach Tuck)** with **deterministic avionics (MIL-STD-1553)** and **tactical linguistic compression (Brevity Codes, STANAG 6001)**.
`;

const afDialogue = {
  title: "BVR Intercept: Sensor Fusion and Avionics Fault",
  titleES: "Intercepción BVR: Fusión de Sensores y Fallo de Aviónica",
  scenarioContext: "Red Flag Exercise, Nellis AFB. ⇄ F-16 Viper (Callsign: VIPER 1) and AWACS (Callsign: DARKSTAR).",
  characters: [
    { name: "Captain Mitchell (VIPER 1)", role: "F-16 Flight Lead", avatar: "V1", color: "var(--amber)" },
    { name: "DARKSTAR Control", role: "AWACS Airborne Controller", avatar: "DS", color: "var(--cyan)" }
  ],
  turns: [
    {
      speaker: "DARKSTAR Control",
      text: "Viper 1, Darkstar. Picture clean. New contact, bullseye 045 for 60 miles, tracking south, 30 thousand, fast.",
      translation: "Viper 1, Darkstar. Imagen limpia. Nuevo contacto, bullseye 045 a 60 millas, rumbo sur, 30 mil pies, rápido.",
      targetTerms: ["Picture clean", "bullseye", "tracking south", "fast"]
    },
    {
      speaker: "Captain Mitchell (VIPER 1)",
      text: "Viper 1, contact. AESA radar shows a two-ship formation. However, I have an intermittent fault on the MIL-STD-1553 bus. My tactical display dropped the datalink tracks.",
      translation: "Viper 1, contacto. El radar AESA muestra una formación de dos naves. Sin embargo, tengo un fallo intermitente en el bus MIL-STD-1553. Mi pantalla táctica perdió las trazas del enlace de datos.",
      targetTerms: ["AESA radar", "two-ship formation", "MIL-STD-1553 bus", "tactical display", "datalink tracks"]
    },
    {
      speaker: "DARKSTAR Control",
      text: "Copy Viper 1. Be advised, contact is maneuvering. Spike, 12 o'clock, 40 miles. Hostile.",
      translation: "Copiado Viper 1. Tenga en cuenta, el contacto está maniobrando. Spike, a las 12 en punto, 40 millas. Hostil.",
      targetTerms: ["maneuvering", "Spike", "12 o'clock", "Hostile"]
    },
    {
      speaker: "Captain Mitchell (VIPER 1)",
      text: "Viper 1 is spiked. Defensive, pushing 9G, deploying countermeasures. I am Joker fuel. Engaging with Fox 3.",
      translation: "Viper 1 está siendo rastreado (spiked). Defensivo, empujando 9G, desplegando contramedidas. Estoy en combustible Joker. Atacando con Fox 3 (misil guiado por radar activo).",
      targetTerms: ["spiked", "Defensive", "pushing 9G", "countermeasures", "Joker fuel", "Fox 3"]
    }
  ],
  contrastTips: [
    {
      school: "I am shooting a missile at the enemy.",
      native: "Viper 1, Fox 3.",
      explanation: "En combate aéreo, la fraseología civil o escolar ('shooting a missile') se reemplaza por 'Brevity Codes' ultracortos. 'Fox 3' indica el lanzamiento específico de un misil guiado por radar activo."
    },
    {
      school: "The computer screen stopped showing the map.",
      native: "I have a MIL-STD-1553 bus fault; the tactical display dropped the datalink tracks.",
      explanation: "Los ingenieros y pilotos militares diagnostican los componentes exactos (bus 1553, datalink) en lugar de usar términos genéricos como 'computer screen'."
    }
  ]
};

const afLexicon = [
  {
    term: "Flight Envelope",
    ipa: "/flaɪt ˈɛn.və.loʊp/",
    es: "Envolvente de Vuelo",
    category: "Aerodinámica",
    definition: "The strict operational limits of an aircraft based on airspeed, load factor (G-force), and altitude. Exceeding it causes structural damage or stall.",
    collocations: ["push the flight envelope", "operate within the envelope", "V-n diagram"],
    falseFriends: "No es un sobre de correo para vuelos; es la gráfica de límites físicos (también llamada 'doghouse plot') del avión.",
    nativeUsage: "The test pilot expanded the flight envelope by successfully recovering from a Mach 1.2 dive at 50,000 feet."
  },
  {
    term: "AESA Radar",
    ipa: "/eɪˈiː.sə ˈreɪ.dɑːr/",
    es: "Radar AESA (Barrido Electrónico Activo)",
    category: "Aviónica",
    definition: "Active Electronically Scanned Array. A type of phased array radar whose transmitter and receiver functions are composed of numerous small solid-state transmit/receive modules (TRMs).",
    collocations: ["AESA radar upgrade", "electronic beam steering", "jam-resistant AESA"],
    falseFriends: "A diferencia del radar mecánico, la antena AESA no se mueve físicamente; el haz se dirige alterando la fase de las ondas de radio.",
    nativeUsage: "The F-35's AESA radar can simultaneously jam enemy signals while tracking multiple airborne targets."
  },
  {
    term: "Mach Tuck",
    ipa: "/mɑːk tʌk/",
    es: "Mach Tuck (Caída de nariz transónica)",
    category: "Aerodinámica Supersónica",
    definition: "An aerodynamic effect where the nose of an aircraft tends to pitch downward as it approaches the speed of sound due to the rearward shift of the center of lift.",
    collocations: ["counteract Mach tuck", "transonic regime", "stabilator trim"],
    falseFriends: "No es 'esconderse a Mach'; es un peligroso picado aerodinámico provocado por las ondas de choque transónicas.",
    nativeUsage: "Early jet fighters crashed because pilots lacked the hydraulic authority to pull out of the Mach tuck dive."
  },
  {
    term: "MIL-STD-1553",
    ipa: "/mɪl stænd ˈfɪf.tiːn ˈfɪf.ti θriː/",
    es: "Estándar Militar 1553 (Bus de Datos)",
    category: "Arquitectura de Aviónica",
    definition: "A military standard published by the US Department of Defense that defines the mechanical, electrical, and functional characteristics of a serial data bus.",
    collocations: ["1553 databus architecture", "dual-redundant 1553", "bus controller"],
    falseFriends: "Se pronuncia 'fifteen-fifty-three'. Es el sistema nervioso central de casi todos los aviones de combate occidentales.",
    nativeUsage: "The flight control computer communicates with the smart munitions via the MIL-STD-1553 dual-redundant bus."
  },
  {
    term: "Fox 3",
    ipa: "/fɑːks θriː/",
    es: "Fox 3 (Lanzamiento de misil activo)",
    category: "Brevity Codes",
    definition: "NATO brevity code indicating the simulated or actual launch of an active radar-guided air-to-air missile (e.g., AIM-120 AMRAAM).",
    collocations: ["call Fox 3", "Fox 3 on target", "Fox 1, 2, 3"],
    falseFriends: "No tiene nada que ver con zorros. Fox 1 es radar semi-activo, Fox 2 es guiado por calor (IR), y Fox 3 es radar activo.",
    nativeUsage: "Viper 1 called Fox 3 and immediately executed a crank maneuver to defeat the enemy's return fire."
  },
  {
    term: "Bullseye",
    ipa: "/ˈbʊl.zaɪ/",
    es: "Punto de Referencia (Bullseye)",
    category: "Navegación Táctica",
    definition: "An established reference point from which the position of an object can be referenced by bearing (magnetic) and range (nautical miles).",
    collocations: ["bullseye call", "reference bullseye", "bullseye coordinates"],
    falseFriends: "No significa dar en el blanco de un tiro de dardos; es una coordenada geográfica secreta compartida por todo el escuadrón.",
    nativeUsage: "AWACS reported a hostile group at Bullseye zero-four-zero for forty miles."
  }
];

const afSocratic = [
  {
    step: 1,
    concept: "Mach Tuck & Transonic Aerodynamics",
    botQuestion: "Welcome to the Aerospace Engineering Audit! Explain what happens to an aircraft's center of lift when it enters the transonic regime (approaching Mach 1). Why does this cause a phenomenon called 'Mach Tuck'?",
    requiredKeywords: ["center", "lift", "shifts", "backward", "rearward", "nose", "pitch", "down", "shock wave"],
    minKeywords: 3,
    feedbackSuccess: "Perfect aerodynamics! As the shock wave forms and moves aft, the center of lift shifts backward. This creates a strong nose-down pitching moment called Mach Tuck, which advanced fly-by-wire systems must automatically trim out.",
    feedbackRetry: "Think about the balance of the aircraft. As the shock wave moves along the wing, where does the 'center of lift' go? What does that shift cause the nose of the plane to do?"
  },
  {
    step: 2,
    concept: "Tactical Brevity Codes",
    botQuestion: "In NATO brevity codes, what does it mean when a pilot transmits 'BINGO' over the radio? How is this different from 'JOKER'?",
    requiredKeywords: ["bingo", "fuel", "recovery", "return", "base", "joker", "separation", "bugout"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! 'BINGO' is the critical fuel state requiring an immediate return to base. 'JOKER' is a pre-briefed fuel level just above Bingo, signaling when the pilot should begin to disengage (bugout) from the fight.",
    feedbackRetry: "Both terms relate to the aircraft's fuel gauge. Which one means 'I must return to base right now' and which one is the warning limit just above that?"
  }
];

if (!LXP_COURSES["airforce-aerospace"]) {
  LXP_COURSES["airforce-aerospace"] = {
    id: "airforce-aerospace",
    category: "cat-career",
    title: "Air Force Aerospace English",
    titleES: "Inglés Aeroespacial Militar y Defensa",
    icon: "🦅",
    desc: "Master NATO STANAG brevity codes, supersonic aerodynamics, and MIL-STD-1553 avionics integration.",
    descES: "Domina los códigos brevity OTAN STANAG, aerodinámica supersónica e integración de aviónica MIL-STD-1553.",
    modules_required: 1,
    modules: [
      {
        id: "af-m1",
        title: "NATO STANAG & Supersonic Aerodynamics",
        titleES: "OTAN STANAG y Aerodinámica Supersónica",
        isGoldModel: true,
        readings: [
          {
            id: "af-m1-r1",
            title: "Flight Envelope, Sensor Fusion & Brevity Codes",
            duration: "12 min",
            content: afReading,
            vocabulary: afLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: afDialogue,
        lexiconMatrix: afLexicon,
        socraticChallenges: afSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["airforce-aerospace"].modules[0] = {
    id: "af-m1",
    title: "NATO STANAG & Supersonic Aerodynamics",
    titleES: "OTAN STANAG y Aerodinámica Supersónica",
    isGoldModel: true,
    readings: [
      {
        id: "af-m1-r1",
        title: "Flight Envelope, Sensor Fusion & Brevity Codes",
        duration: "12 min",
        content: afReading,
        vocabulary: afLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: afDialogue,
    lexiconMatrix: afLexicon,
    socraticChallenges: afSocratic,
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
console.log('Successfully added Air Force module to courses.js');
