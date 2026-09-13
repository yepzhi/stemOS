// scripts/expand_energy.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Energy:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// ENERGY & RENEWABLE: Grid-Forming Inverters & BESS (energy-m1)
// -------------------------------------------------------------
const energyReading = `
> **Industry Alignment & Grid Standard**: Aligned with **IEEE 1547 (Interconnection of Distributed Energy Resources)** and **IEC 61215 (Terrestrial photovoltaic modules)**. Essential for grid interconnection engineers and utility-scale solar developers.

# Utility-Scale Solar PV, BESS, and Grid-Forming Inverters

As the global power grid transitions from synchronous fossil-fuel generators to highly distributed inverter-based resources (IBRs), the physics of grid stability is fundamentally changing. Utility-scale Solar Photovoltaic (PV) plants and Battery Energy Storage Systems (BESS) must now actively support grid frequency and voltage.

## 1. Solar PV Arrays and Maximum Power Point Tracking (MPPT)
Utility-scale solar farms consist of thousands of PV modules wired in series (strings) and parallel. 
- **The P-V Curve**: A solar panel's output is non-linear and heavily dependent on irradiance and cell temperature. As temperature increases, voltage drops significantly.
- **MPPT**: The central inverter continuously adjusts the electrical load (impedance) using a Maximum Power Point Tracking (MPPT) algorithm to ensure the DC bus voltage always operates exactly at the "knee" of the P-V curve, extracting the absolute maximum wattage available at that millisecond.

## 2. Grid-Following vs. Grid-Forming Inverters
Historically, solar inverters were **Grid-Following (GFL)**. They acted as current sources, relying on a stable AC grid waveform (from rotating turbines) to lock onto using a Phase-Locked Loop (PLL). If the grid collapsed, the inverter would trip offline (Anti-Islanding).
Today, with fewer rotating turbines providing physical inertia, the grid is fragile. We now deploy **Grid-Forming (GFM) Inverters**:
- **Synthetic Inertia**: GFM inverters act as voltage sources. They mathematically simulate the mechanical mass of a spinning turbine. If grid frequency suddenly drops (e.g., a transmission line faults), the GFM inverter instantly injects massive amounts of real power within milliseconds to arrest the frequency decay (Rate of Change of Frequency - RoCoF).
- **Black Start Capability**: GFM inverters can establish a stable 60Hz grid from scratch during a total blackout, allowing other renewables to sync to them.

## 3. Battery Energy Storage Systems (BESS) Integration
A 100-Megawatt solar farm is useless during the evening peak demand unless paired with a BESS.
- **DC-Coupled vs. AC-Coupled**: In a DC-coupled architecture, the battery racks connect directly to the solar farm's DC bus. This captures "clipped" energy that would otherwise be lost when the solar panels generate more DC power than the inverter's AC rating.
- **Frequency Regulation Market**: BESS facilities monitor grid frequency (normally exactly 60.00 Hz). If the frequency dips to 59.95 Hz, the BESS discharges megawatts of power into the grid in under 200 milliseconds to balance supply and demand.

---
> **Key Takeaway**: Renewable energy engineering is no longer just about generating electrons; it is about providing **grid ancillary services (Synthetic Inertia, Frequency Regulation)** using **advanced power electronics (GFM Inverters, MPPT)**.
`;

const energyDialogue = {
  title: "Substation Interconnection: Overvoltage and GFM Parameter Tuning",
  titleES: "Interconexión de Subestación: Sobrevoltaje y Ajuste de Parámetros GFM",
  scenarioContext: "Pecos, TX (250MW Solar+Storage Plant) ⇄ ERCOT ISO Control Room. Commissioning test of Grid-Forming inverters.",
  characters: [
    { name: "Ing. Sofia Morales", role: "Lead Interconnection Engineer (Pecos)", avatar: "SM", color: "var(--amber)" },
    { name: "John Taggart", role: "ERCOT Grid Operations Coordinator", avatar: "JT", color: "var(--cyan)" }
  ],
  turns: [
    {
      speaker: "John Taggart",
      text: "Sofia, we're analyzing the data from the capacitor bank switching test. When we dropped the 345kV transmission line, your inverters failed to inject sufficient reactive power. We saw a severe transient overvoltage on the collector bus.",
      translation: "Sofia, estamos analizando los datos de la prueba de conmutación del banco de capacitores. Cuando desconectamos la línea de transmisión de 345kV, tus inversores fallaron en inyectar suficiente potencia reactiva. Vimos un sobrevoltaje transitorio severo en el bus colector.",
      targetTerms: ["capacitor bank switching", "reactive power", "transient overvoltage", "collector bus"]
    },
    {
      speaker: "Ing. Sofia Morales",
      text: "I see it on the fault recorder, John. The Grid-Following inverters tripped on Over-Voltage Ride Through (OVRT) limits. However, the two Grid-Forming (GFM) inverters on Pad 14 stayed online and tried to clamp the voltage.",
      translation: "Lo veo en el registrador de fallas, John. Los inversores Grid-Following se desconectaron por los límites de Soporte de Sobrevoltaje (OVRT). Sin embargo, los dos inversores Grid-Forming (GFM) en la Plataforma 14 se mantuvieron en línea e intentaron estabilizar el voltaje.",
      targetTerms: ["fault recorder", "Over-Voltage Ride Through (OVRT)", "Grid-Forming (GFM)", "clamp the voltage"]
    },
    {
      speaker: "John Taggart",
      text: "That's the issue. The GFM droop control parameters are too sluggish. We need them to provide dynamic voltage support within 16 milliseconds to prevent the rest of the plant from cascading offline.",
      translation: "Ese es el problema. Los parámetros de control de estatismo (droop) del GFM son muy lentos. Necesitamos que proporcionen soporte dinámico de voltaje en menos de 16 milisegundos para evitar que el resto de la planta se desconecte en cascada.",
      targetTerms: ["droop control parameters", "sluggish", "dynamic voltage support", "cascading offline"]
    },
    {
      speaker: "Ing. Sofia Morales",
      text: "Copy that. I will decrease the voltage droop deadband and increase the proportional gain on the synthetic inertia loop. We will flash the new firmware to the plant controller and be ready for a retest in 30 minutes.",
      translation: "Copiado. Disminuiré la banda muerta del estatismo de voltaje y aumentaré la ganancia proporcional en el lazo de inercia sintética. Cargaremos el nuevo firmware al controlador de la planta y estaremos listos para repetir la prueba en 30 minutos.",
      targetTerms: ["voltage droop deadband", "proportional gain", "synthetic inertia loop", "plant controller"]
    }
  ],
  contrastTips: [
    {
      school: "The solar panels turned off because there was too much electricity.",
      native: "The grid-following inverters tripped on Over-Voltage Ride Through (OVRT) limits during the capacitor bank switching.",
      explanation: "En interconexión de redes, 'too much electricity' no significa nada. Se debe especificar el tipo de fallo (Over-Voltage) y la función de protección que actuó (OVRT trip)."
    },
    {
      school: "The battery sends power to help the grid.",
      native: "The BESS injects real power for frequency regulation and provides synthetic inertia.",
      explanation: "La palabra 'help' es inaceptable en ingeniería eléctrica. Se especifican los servicios auxiliares: 'frequency regulation' o 'synthetic inertia'."
    }
  ]
};

const energyLexicon = [
  {
    term: "Grid-Forming Inverter (GFM)",
    ipa: "/ɡrɪd ˈfɔːr.mɪŋ ɪnˈvɜːr.tər/",
    es: "Inversor Formador de Red",
    category: "Electrónica de Potencia",
    definition: "An advanced inverter that acts as a voltage source, actively establishing grid voltage and frequency, and providing synthetic inertia without relying on a pre-existing grid.",
    collocations: ["GFM synthetic inertia", "droop control", "black start capability"],
    falseFriends: "No solo 'convierte corriente'; crea físicamente la onda senoidal de 60Hz y estabiliza a toda la red local.",
    nativeUsage: "Replacing synchronous condensers with Grid-Forming inverters allowed the island to operate on 100% renewable energy."
  },
  {
    term: "Maximum Power Point Tracking (MPPT)",
    ipa: "/ˈmæk.sə.məm ˈpaʊ.ər pɔɪnt ˈtræk.ɪŋ/",
    es: "Seguimiento del Punto de Máxima Potencia",
    category: "Control Solar",
    definition: "An algorithm included in solar inverters that continuously adjusts the electrical load to extract the absolute maximum power from PV modules as sunlight varies.",
    collocations: ["MPPT algorithm", "DC bus voltage", "P-V curve knee"],
    falseFriends: "No es un sistema de rastreo mecánico que gira los paneles hacia el sol; es un algoritmo de software que varía la impedancia eléctrica.",
    nativeUsage: "When the cloud passed over, the MPPT instantly shifted the DC voltage to find the new optimal power point."
  },
  {
    term: "Battery Energy Storage System (BESS)",
    ipa: "/ˈbæt.ər.i ˈɛn.ər.dʒi ˈstɔːr.ɪdʒ/",
    es: "Sistema de Almacenamiento de Energía en Baterías",
    category: "Infraestructura de Red",
    definition: "Large-scale lithium-ion or alternative chemistry battery installations used by utilities for load shifting, peak shaving, and frequency regulation.",
    collocations: ["utility-scale BESS", "BESS dispatch", "DC-coupled BESS"],
    falseFriends: "Un BESS a escala de servicios públicos no es una 'pila grande'; incluye sistemas de HVAC, supresión de incendios y subestaciones.",
    nativeUsage: "The 100MW BESS absorbed excess solar generation at noon and dispatched it into the grid during the 7 PM peak demand."
  },
  {
    term: "Rate of Change of Frequency (RoCoF)",
    ipa: "/reɪt əv tʃeɪndʒ əv ˈfriː.kwən.si/",
    es: "Tasa de Cambio de Frecuencia",
    category: "Estabilidad de Red",
    definition: "The speed at which the electrical grid frequency (Hz) drops or rises following a sudden loss of generation or a massive load connection.",
    collocations: ["arrest RoCoF", "high RoCoF event", "synthetic inertia response"],
    falseFriends: "Es la 'aceleración' de la caída de frecuencia. Una tasa alta desencadena apagones en cascada si no se detiene a tiempo.",
    nativeUsage: "The Grid-Forming inverters injected massive real power to arrest the RoCoF before it triggered under-frequency load shedding."
  },
  {
    term: "Over-Voltage Ride Through (OVRT)",
    ipa: "/ˈoʊ.vər ˈvoʊl.tɪdʒ raɪd θruː/",
    es: "Soporte de Sobrevoltaje",
    category: "Protección Eléctrica",
    definition: "A grid code requirement mandating that renewable energy generators must remain connected to the grid during temporary voltage spikes rather than tripping offline.",
    collocations: ["OVRT compliance", "trip limits", "Low-Voltage Ride Through (LVRT)"],
    falseFriends: "Ride Through significa 'soportar y no desconectarse'; el inversor debe 'cabalgar' la falla para no empeorar la caída de la red.",
    nativeUsage: "The solar farm successfully demonstrated its OVRT capability by staying online during the 1.2 per-unit voltage transient."
  },
  {
    term: "Synthetic Inertia",
    ipa: "/sɪnˈθɛt.ɪk ɪˈnɜːr.ʃə/",
    es: "Inercia Sintética",
    category: "Física de Redes",
    definition: "The capability of a power electronic inverter to mimic the kinetic energy and physical momentum of massive rotating turbines to resist sudden changes in grid frequency.",
    collocations: ["inject synthetic inertia", "virtual synchronous machine", "fast frequency response"],
    falseFriends: "No tiene masa física (hierro o rotores girando); es una simulación matemática que engaña a la red inyectando energía almacenada.",
    nativeUsage: "Since solar panels have no moving parts, the BESS uses synthetic inertia to stabilize the grid when a coal plant trips."
  }
];

const energySocratic = [
  {
    step: 1,
    concept: "Grid-Forming vs Grid-Following Inverters",
    botQuestion: "Welcome to the Renewable Energy Audit! Explain in English the fundamental difference between a Grid-Following inverter and a Grid-Forming (GFM) inverter. Which one can perform a 'black start' and why?",
    requiredKeywords: ["forming", "following", "voltage source", "current source", "black start", "synthetic inertia"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! A grid-following inverter is a current source that needs an existing AC waveform to lock onto. A Grid-Forming (GFM) inverter acts as a voltage source, creating its own 60Hz waveform, which is why it can perform a black start and provide synthetic inertia.",
    feedbackRetry: "Think about the terms 'Source'. Which inverter acts as a 'Current Source' and which acts as a 'Voltage Source'? Why does an islanded grid need a Grid-Forming inverter?"
  },
  {
    step: 2,
    concept: "MPPT & Solar PV Curves",
    botQuestion: "Why do utility-scale solar inverters use a Maximum Power Point Tracking (MPPT) algorithm? What happens to the solar panel's voltage when the temperature increases?",
    requiredKeywords: ["maximum", "power", "point", "voltage", "drops", "temperature", "impedance", "knee"],
    minKeywords: 3,
    feedbackSuccess: "Perfect! As solar cell temperature increases, the voltage drops significantly. The MPPT algorithm constantly adjusts the electrical impedance to find the 'knee' of the P-V curve, extracting the absolute maximum wattage at any given moment.",
    feedbackRetry: "Remember the P-V (Power-Voltage) curve. What does heat do to a solar panel's voltage? What is the algorithm constantly adjusting to stay on the 'knee' of the curve?"
  }
];

if (!LXP_COURSES["energy-renewables"]) {
  LXP_COURSES["energy-renewables"] = {
    id: "energy-renewables",
    category: "cat-engineering",
    title: "Energy & Renewable Technologies",
    titleES: "Energías Renovables y Tecnologías Limpias",
    icon: "⚡",
    desc: "Master utility-scale solar PV, Grid-Forming (GFM) inverters, and Battery Energy Storage Systems (BESS) integration.",
    descES: "Domina energía solar fotovoltaica a gran escala, inversores formadores de red (GFM) e integración BESS.",
    modules_required: 1,
    modules: [
      {
        id: "energy-m1",
        title: "Grid-Forming Inverters & BESS",
        titleES: "Inversores Formadores de Red e Integración BESS",
        isGoldModel: true,
        readings: [
          {
            id: "energy-m1-r1",
            title: "Utility-Scale Solar PV & Grid-Forming Inverters",
            duration: "12 min",
            content: energyReading,
            vocabulary: energyLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: energyDialogue,
        lexiconMatrix: energyLexicon,
        socraticChallenges: energySocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["energy-renewables"].modules[0] = {
    id: "energy-m1",
    title: "Grid-Forming Inverters & BESS",
    titleES: "Inversores Formadores de Red e Integración BESS",
    isGoldModel: true,
    readings: [
      {
        id: "energy-m1-r1",
        title: "Utility-Scale Solar PV & Grid-Forming Inverters",
        duration: "12 min",
        content: energyReading,
        vocabulary: energyLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: energyDialogue,
    lexiconMatrix: energyLexicon,
    socraticChallenges: energySocratic,
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
console.log('Successfully added Energy module to courses.js');
