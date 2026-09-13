// scripts/expand_aviation.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Aviation:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// AVIATION ENGLISH: ICAO Phraseology & ATC Communications (aveng-m1)
// -------------------------------------------------------------
const aviationReading = `
> **Industry Alignment & Safety Standard**: Aligned with **ICAO Annex 1 (Personnel Licensing)** and **Doc 9835 (Manual on the Implementation of ICAO Language Proficiency Requirements)**. Essential for pilots, air traffic controllers, and dispatchers aiming for ICAO Level 4+ compliance.

# Standardized ICAO Phraseology, Readbacks & ATC Clearances

In the highly regulated environment of international civil aviation, precise and unambiguous communication between the flight deck and Air Traffic Control (ATC) is a matter of life and death. The International Civil Aviation Organization (ICAO) mandates standardized phraseology to mitigate the risk of catastrophic runway incursions and mid-air collisions caused by linguistic misunderstandings.

## 1. The Anatomy of an ATC Clearance and Pilot Readback
A clearance is an authorization from ATC for an aircraft to proceed under specified conditions. Pilots must strictly adhere to the **Readback requirement**: repeating critical parts of the clearance to confirm accurate reception.
- **Critical Elements Requiring Strict Readback**: Runway-in-use, altimeter settings (QNH), heading instructions, speed instructions, and clearance to enter, land on, take off from, hold short of, or cross a runway.
- **Format**: [Callsign], [Instruction], [Readback]. 
  *ATC: "AeroMexico 492, cleared for takeoff runway 05 Right, wind 060 at 12 knots."*
  *Pilot: "Cleared for takeoff runway 05 Right, AeroMexico 492."*

## 2. Standard Phraseology vs. Plain Language
While standard phraseology covers 90% of routine operations, emergencies and non-standard situations require **plain language proficiency**. 
- **Affirm / Negative**: Standard phraseology replaces colloquial terms like "yes" or "no" with "AFFIRM" and "NEGATIVE" to prevent radio clipping from obscuring single-syllable words.
- **Standby vs. Hold**: "Standby" means ATC is busy and will call you back (do not execute a maneuver). "Hold position" or "Hold short" is a direct instruction to stop the aircraft on the ground to prevent a runway incursion.
- **WILCO**: Abbreviation for "Will Comply", used to indicate that the instruction has been received, understood, and will be executed.

## 3. Emergency and Urgency Communications (MAYDAY vs. PAN-PAN)
When an aircraft's safety is compromised, the pilot must declare the level of threat using internationally recognized prefixes, repeated three times:
- **MAYDAY, MAYDAY, MAYDAY**: Indicates an aircraft is threatened by grave and imminent danger and requires immediate assistance (e.g., dual engine failure, uncontrollable fire).
- **PAN-PAN, PAN-PAN, PAN-PAN**: Indicates an urgency condition concerning the safety of the aircraft or persons on board, but does not require immediate assistance (e.g., passenger medical emergency, single engine failure on a multi-engine aircraft).

---
> **Key Takeaway**: Aviation safety depends on **standardized syntax (Readbacks, ICAO Phraseology)**, **clear enunciation of numbers (Tree, Niner)**, and the disciplined transition to **plain language** during non-routine urgency scenarios.
`;

const aviationDialogue = {
  title: "VFR to IFR Transition and Weather Deviation Request",
  titleES: "Transición de VFR a IFR y Solicitud de Desvío por Clima",
  scenarioContext: "Houston ARTCC ⇄ Learjet 45 (XA-JET) in flight over the Gulf of Mexico. Approaching convective weather.",
  characters: [
    { name: "Captain Reyes", role: "Pilot in Command (Learjet XA-JET)", avatar: "CR", color: "var(--cyan)" },
    { name: "Houston Center", role: "Air Route Traffic Control Center (ARTCC)", avatar: "HC", color: "var(--purple)" }
  ],
  turns: [
    {
      speaker: "Captain Reyes",
      text: "Houston Center, XA-JET, we are painting heavy precipitation on our weather radar 20 miles ahead. Request 15 degrees right of track for weather deviation.",
      translation: "Centro Houston, XA-JET, estamos pintando precipitación fuerte en nuestro radar meteorológico 20 millas al frente. Solicitamos desvío por clima de 15 grados a la derecha de la ruta.",
      targetTerms: ["painting heavy precipitation", "weather radar", "right of track", "weather deviation request"]
    },
    {
      speaker: "Houston Center",
      text: "XA-JET, Houston Center, deviation 15 degrees right of track approved. When able, proceed direct to the Laredo VOR. Report established on course.",
      translation: "XA-JET, Centro Houston, desvío de 15 grados a la derecha de la ruta aprobado. Cuando pueda, proceda directo al VOR de Laredo. Reporte establecido en curso.",
      targetTerms: ["deviation approved", "When able", "proceed direct", "VOR", "Report established on course"]
    },
    {
      speaker: "Captain Reyes",
      text: "Deviation 15 degrees right approved, direct Laredo when able, will report established. We also have a passenger requiring medical attention, declaring PAN-PAN, PAN-PAN, PAN-PAN. Requesting priority handling to Monterrey.",
      translation: "Desvío de 15 grados a la derecha aprobado, directo a Laredo cuando pueda, reportaré establecido. También tenemos un pasajero que requiere atención médica, declarando PAN-PAN, PAN-PAN, PAN-PAN. Solicitamos manejo prioritario a Monterrey.",
      targetTerms: ["will report established", "medical attention", "declaring PAN-PAN", "priority handling"]
    },
    {
      speaker: "Houston Center",
      text: "XA-JET, PAN-PAN copied. You are cleared direct Monterrey, descend and maintain Flight Level 240. Advise if you require medical personnel upon arrival.",
      translation: "XA-JET, PAN-PAN copiado. Está autorizado directo a Monterrey, descienda y mantenga Nivel de Vuelo 240. Avise si requiere personal médico a la llegada.",
      targetTerms: ["copied", "cleared direct", "descend and maintain", "Flight Level"]
    }
  ],
  contrastTips: [
    {
      school: "I need to turn right because of the rain.",
      native: "Request 15 degrees right of track for weather deviation.",
      explanation: "En radiotelefonía aeronáutica no se dice 'rain' ni 'turn right'; se usa la fraseología estándar 'weather deviation' y los grados específicos de desviación."
    },
    {
      school: "We have an emergency with a sick person.",
      native: "Declaring PAN-PAN, passenger requires immediate medical attention, requesting priority handling.",
      explanation: "Se debe usar el prefijo de urgencia oficial (PAN-PAN) e indicar 'priority handling' para notificar al ATC sobre la situación médica."
    }
  ]
};

const aviationLexicon = [
  {
    term: "Readback",
    ipa: "/ˈriːd.bæk/",
    es: "Colación / Repetición de Autorización",
    category: "Comunicaciones ATC",
    definition: "The procedure whereby the receiving station repeats a received message or an appropriate part thereof back to the transmitting station so as to obtain confirmation of correct reception.",
    collocations: ["strict readback requirement", "readback clearance", "incomplete readback"],
    falseFriends: "No es simplemente 'leer hacia atrás'; es el protocolo obligatorio de confirmación de instrucciones críticas como altitud y pista.",
    nativeUsage: "The controller caught the runway incursion early because the pilot's readback of the hold short instruction was incorrect."
  },
  {
    term: "Hold Short",
    ipa: "/hoʊld ʃɔːrt/",
    es: "Mantener Fuera De / Esperar Antes De",
    category: "Control Terrestre",
    definition: "An ATC instruction requiring an aircraft to stop and wait before crossing a specific point on the aerodrome, typically an active runway intersection.",
    collocations: ["hold short of runway 27", "hold short instruction", "cross the hold short line"],
    falseFriends: "No significa 'esperar un poco'; es una orden absoluta de no cruzar la línea de seguridad de la pista.",
    nativeUsage: "American 302, taxi via Alpha, hold short of Runway 14 Right and monitor tower."
  },
  {
    term: "Flight Level (FL)",
    ipa: "/flaɪt ˈlɛv.əl/",
    es: "Nivel de Vuelo",
    category: "Navegación Vertical",
    definition: "A surface of constant atmospheric pressure which is related to a specific pressure datum, 1013.2 hectopascals (hPa), and is separated from other such surfaces by specific pressure intervals.",
    collocations: ["climb and maintain flight level", "cruise flight level", "transition altitude"],
    falseFriends: "En aviación de gran altitud no se dice 'altitude of 30,000 feet', sino 'Flight Level 300' (FL300) con el altímetro en ajuste estándar.",
    nativeUsage: "Delta 129, climb and maintain Flight Level 350, contact Center on 124.7."
  },
  {
    term: "Runway Incursion",
    ipa: "/ˈrʌn.weɪ ɪnˈkɜːr.ʒən/",
    es: "Incursión en Pista",
    category: "Seguridad Operacional",
    definition: "Any occurrence at an aerodrome involving the incorrect presence of an aircraft, vehicle, or person on the protected area of a surface designated for the landing and take-off of aircraft.",
    collocations: ["prevent a runway incursion", "runway incursion hazard", "ground radar system"],
    falseFriends: "No es una 'invasión militar'; es el cruce no autorizado de un avión en una pista activa, un riesgo gravísimo.",
    nativeUsage: "The pilot initiated an immediate go-around to avoid a collision following a runway incursion by a baggage cart."
  },
  {
    term: "WILCO",
    ipa: "/ˈwɪl.koʊ/",
    es: "Entendido y Cumpliré",
    category: "Abreviaturas OACI",
    definition: "Abbreviation for 'Will Comply'. Used in radio communications to indicate that an instruction has been received, understood, and will be carried out.",
    collocations: ["roger, wilco", "affirmative wilco"],
    falseFriends: "WILCO ya incluye la afirmación de que se cumplirá la orden, no debe confundirse con 'Roger' que solo significa 'mensaje recibido'.",
    nativeUsage: "ATC instructed us to expedite our climb to FL280 due to traffic, and the captain replied 'Wilco'."
  },
  {
    term: "Squawk",
    ipa: "/skwɔːk/",
    es: "Código Transpondedor",
    category: "Vigilancia Radar",
    definition: "To set a specific four-digit octal code on the aircraft's transponder, allowing ATC radar to identify the aircraft and display its altitude and ground speed.",
    collocations: ["squawk 7700 (emergency)", "squawk ident", "reset squawk code"],
    falseFriends: "No significa 'graznar' en este contexto; es el comando del ATC para ingresar un código numérico en el panel.",
    nativeUsage: "Learjet 214, radar contact, squawk 4531 and ident."
  }
];

const aviationSocratic = [
  {
    step: 1,
    concept: "Readbacks & Critical Instructions",
    botQuestion: "Welcome to the Aviation English Audit! According to ICAO phraseology, why must a pilot perform a 'readback' of specific ATC clearances, such as altimeter settings and runway assignments? What risk does this mitigate?",
    requiredKeywords: ["readback", "confirm", "correct", "reception", "runway", "incursion", "misunderstanding"],
    minKeywords: 3,
    feedbackSuccess: "Excellent! Readbacks are critical for ATC to confirm the correct reception of instructions. This strict protocol directly mitigates the risk of catastrophic runway incursions or mid-air collisions caused by miscommunication.",
    feedbackRetry: "Think about the safety loop. If ATC gives a clearance to cross a runway, how do they verify you heard the correct runway number? Mention the risk of 'runway incursions'."
  },
  {
    step: 2,
    concept: "Urgency vs Emergency Phraseology",
    botQuestion: "Explain the difference in English between declaring 'MAYDAY' and declaring 'PAN-PAN' over the radio. Give one example of a situation where a pilot should use PAN-PAN.",
    requiredKeywords: ["mayday", "pan-pan", "imminent", "danger", "immediate", "urgency", "medical", "passenger"],
    minKeywords: 3,
    feedbackSuccess: "Perfect distinction. MAYDAY is reserved for grave and imminent danger requiring immediate assistance (like an engine fire). PAN-PAN denotes an urgency regarding safety, such as a passenger medical issue, but without imminent danger to the aircraft itself.",
    feedbackRetry: "Compare the level of threat. Which one requires 'immediate assistance' due to imminent danger? What word is used for a medical issue that is urgent but doesn't threaten the whole aircraft?"
  }
];

if (!LXP_COURSES["aviation-english"]) {
  LXP_COURSES["aviation-english"] = {
    id: "aviation-english",
    category: "cat-career",
    title: "Aviation English",
    titleES: "Inglés Aeronáutico y Radiotelefonía",
    icon: "✈️",
    desc: "Master standard ICAO phraseology, ATC communications, and emergency readback procedures for Level 4+ compliance.",
    descES: "Domina la fraseología OACI, comunicaciones ATC y procedimientos de emergencia para cumplimiento de Nivel 4+.",
    modules_required: 1,
    modules: [
      {
        id: "aveng-m1",
        title: "ICAO Phraseology & ATC Communications",
        titleES: "Fraseología OACI y Comunicaciones ATC",
        isGoldModel: true,
        readings: [
          {
            id: "aveng-m1-r1",
            title: "Standardized ICAO Phraseology & Readbacks",
            duration: "12 min",
            content: aviationReading,
            vocabulary: aviationLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: aviationDialogue,
        lexiconMatrix: aviationLexicon,
        socraticChallenges: aviationSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["aviation-english"].modules[0] = {
    id: "aveng-m1",
    title: "ICAO Phraseology & ATC Communications",
    titleES: "Fraseología OACI y Comunicaciones ATC",
    isGoldModel: true,
    readings: [
      {
        id: "aveng-m1-r1",
        title: "Standardized ICAO Phraseology & Readbacks",
        duration: "12 min",
        content: aviationReading,
        vocabulary: aviationLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: aviationDialogue,
    lexiconMatrix: aviationLexicon,
    socraticChallenges: aviationSocratic,
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
console.log('Successfully added Aviation English module to courses.js');
