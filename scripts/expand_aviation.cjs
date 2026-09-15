// scripts/expand_aviation.cjs — Aviation English (aveng-m2 through aveng-m5)
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const coursesPath = path.resolve(__dirname, '../content/courses.js');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(fs.readFileSync(coursesPath, 'utf8'), sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;
console.log('Expanding Aviation English...');

const avengM2 = { id: "aveng-m2", title: "Air Traffic Control (ATC) Clearances & Radar Vectoring", titleES: "Autorizaciones de Control de Tráfico Aéreo (ATC) y Vectores Radar", icon: "fa-solid fa-tower-broadcast", readings: [{ id: "aveng-m2-r1", title: "ATC Clearance Phraseology, Radar Vectoring & Separation Standards", duration: "13 min", content: `
> **Industry Alignment**: Aligned with **ICAO Annex 10 (Aeronautical Telecommunications)**, **ICAO Doc 4444 (PANS-ATM)**, and **FAA Order 7110.65 (ATC Procedures)**.

# ATC Clearance Phraseology, Radar Vectoring & Separation Standards

Every commercial flight operates under the direct control of **Air Traffic Control (ATC)** services. The standardized phraseology used in controller-pilot communications is not casual language—it is a precision-engineered protocol designed to eliminate ambiguity in safety-critical airspace operations.

## 1. Types of ATC Clearances

A **clearance** is an authorization for an aircraft to proceed under specified conditions within controlled airspace. Key clearance types include:

- **IFR Clearance (CRAFT Format)**: Before departure, pilots receive an Instrument Flight Rules clearance containing: **C**learance limit (destination airport), **R**oute (SID and airways), **A**ltitude (initial and cruise), **F**requency (departure frequency), **T**ransponder code (squawk).
- **Takeoff Clearance**: "Runway 27 Left, cleared for takeoff, wind 260 at 12." This is the ONLY clearance that authorizes an aircraft to use the runway for departure.
- **Landing Clearance**: "Cleared to land runway 09 Right." Without this explicit clearance, an aircraft must execute a missed approach (go-around).
- **En Route Clearance Amendments**: "Turn left heading 180, climb and maintain flight level 350, direct ROMEO intersection."

## 2. Radar Vectoring

**Radar vectors** are headings assigned by ATC to guide aircraft for:
- **Traffic Separation**: Maintaining the required 3 NM (nautical miles) lateral or 1,000 ft vertical separation in terminal airspace.
- **Sequencing for Approach**: Spacing arrivals at optimal intervals (typically 4–6 NM in trail) for the ILS/VOR approach.
- **Weather Deviation**: Guiding aircraft around convective cells (thunderstorms) depicted on the controller's weather radar overlay.

Standard phraseology: "Turn right heading 270, vectors for the ILS Runway 27 Left approach." The pilot reads back: "Right heading 270, vectors ILS 27 Left, Volaris 512."

## 3. Readback & Hearback Protocol

The **readback** is the pilot's verbal repetition of critical ATC instructions. Items that MUST be read back per ICAO standards:
- Runway assignments and holding instructions
- Altimeter settings (QNH)
- Assigned altitudes and flight levels
- Speed restrictions and heading assignments
- Transponder (squawk) codes
- Route clearances and frequency changes

If the controller detects an incorrect readback (**hearback error**), they must issue a correction immediately: "Negative, I say again, climb and maintain flight level 310, not 350."

## 4. Standard Phraseology Examples

| Controller Instruction | Pilot Readback |
|---|---|
| "Descend and maintain 4,000 feet, altimeter 29.92" | "Descending to 4,000, altimeter 29.92, United 437" |
| "Turn left heading 090, vectors ILS 27L" | "Left heading 090, vectors ILS 27 Left, Delta 1218" |
| "Hold short of Runway 27 Left" | "Holding short 27 Left, Aeroméxico 401" |
| "Contact approach 124.5" | "Over to 124.5, VivaAerobus 638" |

---
> **Key Takeaway**: ATC communications follow **ICAO standardized phraseology** with mandatory **readback/hearback** protocols for safety-critical instructions. **Radar vectoring** provides heading guidance for traffic separation, approach sequencing, and weather avoidance—all communicated using precise, unambiguous English terminology.
`,
    vocabulary: [
      { en: "Clearance (ATC)", es: "Autorización (ATC)", definition: "Authorization from Air Traffic Control for an aircraft to proceed under specified conditions within controlled airspace.", ipa: "/ˈklɪr.əns/", collocations: ["IFR clearance", "clearance limit", "cleared for takeoff"] },
      { en: "Radar Vector", es: "Vector Radar", definition: "A specific heading assigned by ATC to guide an aircraft for separation, sequencing, or weather avoidance.", ipa: "/ˈreɪ.dɑːr ˈvɛk.tər/", collocations: ["vectors for the approach", "turn left heading", "radar-guided sequencing"] },
      { en: "Readback", es: "Colación (Readback)", definition: "Pilot's verbal repetition of critical ATC instructions to confirm correct reception and understanding.", ipa: "/ˈriːd.bæk/", collocations: ["mandatory readback", "readback error", "correct readback confirmed"] },
      { en: "Squawk Code", es: "Código Squawk (Transpondedor)", definition: "Four-digit octal code assigned by ATC to identify an aircraft on radar displays.", ipa: "/skwɔːk koʊd/", collocations: ["squawk 4521", "transponder code assignment", "squawk ident"] },
      { en: "Flight Level (FL)", es: "Nivel de Vuelo (FL)", definition: "Altitude expressed in hundreds of feet above the standard datum plane (29.92 inHg), used above the transition altitude.", ipa: "/flaɪt ˈlɛv.əl/", collocations: ["climb to flight level 350", "maintain FL 280", "transition altitude"] },
      { en: "Go-Around (Missed Approach)", es: "Aproximación Frustrada (Go-Around)", definition: "Procedure where a pilot aborts the landing and climbs away from the runway, following the published missed approach procedure.", ipa: "/ɡoʊ əˈraʊnd/", collocations: ["execute a go-around", "missed approach procedure", "initiate go-around"] }
    ],
    questions: [
      { q: "What does the acronym CRAFT represent in an IFR clearance?", options: ["Crew, Radio, Altitude, Fuel, Time", "Clearance limit, Route, Altitude, Frequency, Transponder code", "Control, Radar, Approach, Frequency, Takeoff", "Climb, Right, Assigned, Flight level, Turn"], answer: 1 },
      { q: "What must a pilot do if they have NOT received a landing clearance?", options: ["Land anyway", "Execute a missed approach (go-around)", "Request a new squawk code", "Turn off the transponder"], answer: 1 },
      { q: "What is the standard lateral radar separation minimum in terminal airspace?", options: ["1 nautical mile", "3 nautical miles", "10 kilometers", "500 feet"], answer: 1 },
      { q: "What is a 'hearback error'?", options: ["A pilot hearing loss condition", "When ATC detects an incorrect readback from the pilot", "A radar malfunction", "A radio frequency interference"], answer: 1 }
    ]
  }]
};

const avengM3 = { id: "aveng-m3", title: "Aviation Meteorology: Decoding METAR, TAF & SIGMET", titleES: "Meteorología Aeronáutica: Decodificación de METAR, TAF y SIGMET", icon: "fa-solid fa-cloud-sun-rain", readings: [{ id: "aveng-m3-r1", title: "Aviation Weather Reports, Forecasts & Hazardous Weather Briefings", duration: "12 min", content: `
> **Industry Alignment**: Aligned with **ICAO Annex 3 (Meteorological Service for International Air Navigation)** and **WMO Technical Regulations**.

# Aviation Weather Reports, Forecasts & Hazardous Weather Briefings

Weather is the single largest variable affecting flight safety and operational efficiency. Pilots must decode standardized weather products rapidly and make time-critical decisions based on coded meteorological information.

## 1. METAR (Meteorological Aerodrome Report)

A **METAR** is an hourly surface weather observation issued by certified meteorological observers at airports worldwide. Format:

\`METAR MMTJ 141850Z 28012G22KT 9999 FEW030 SCT120 BKN250 28/14 A2992 RMK AO2\`

Decoded:
- **MMTJ**: Station identifier (Tijuana International Airport, Mexico)
- **141850Z**: Day 14, time 18:50 UTC (Zulu)
- **28012G22KT**: Wind from 280° at 12 knots, gusting to 22 knots
- **9999**: Visibility 10+ kilometers (unrestricted)
- **FEW030 SCT120 BKN250**: Few clouds at 3,000 ft, Scattered at 12,000 ft, Broken at 25,000 ft
- **28/14**: Temperature 28°C / Dewpoint 14°C
- **A2992**: Altimeter setting 29.92 inHg
- **RMK AO2**: Remarks — Automated observation with precipitation discriminator

## 2. TAF (Terminal Aerodrome Forecast)

A **TAF** is a 24–30 hour forecast for airport weather conditions, issued every 6 hours:

\`TAF MMTJ 141730Z 1418/1518 27010KT 9999 SCT040 TEMPO 1500/1506 4000 TSRA BKN025CB\`

Key change indicators:
- **TEMPO**: Temporary fluctuations (lasting less than 1 hour each, totaling less than half the period)
- **BECMG**: Becoming — a gradual permanent change over the specified period
- **FM**: From — an abrupt change at the specified time
- **PROB30/40**: Probability (30% or 40%) of the following conditions

## 3. SIGMET & AIRMET

- **SIGMET (Significant Meteorological Information)**: Warnings for hazardous weather phenomena affecting en route aircraft safety: severe turbulence, severe icing, thunderstorms (embedded CBs), volcanic ash, tropical cyclones, sandstorms. Valid for up to 4 hours.
- **AIRMET**: Advisories for weather phenomena hazardous to light aircraft and VFR operations: moderate turbulence, moderate icing, IFR conditions (ceiling below 1,000 ft, visibility below 3 miles), sustained surface winds above 30 knots, mountain obscuration.

## 4. Practical Decision Making

Pilots use weather products to determine:
- **Fuel Planning**: Alternate airport requirements based on TAF ceiling/visibility forecasts
- **Approach Minimums**: Whether reported conditions meet the Decision Altitude (DA) and Runway Visual Range (RVR) minimums for the planned instrument approach
- **Route Deviation**: Whether to file amended routes avoiding SIGMETs for convective activity
- **Delay Assessment**: Whether departure should be delayed based on TEMPO or PROB groups indicating below-minimum conditions

---
> **Key Takeaway**: Aviation meteorology relies on **coded products** (METAR for current observations, TAF for forecasts, SIGMET/AIRMET for hazards) that pilots must decode rapidly to make **fuel, route, approach, and delay decisions** critical to flight safety.
`,
    vocabulary: [
      { en: "METAR", es: "METAR (Informe Meteorológico de Aeródromo)", definition: "Standardized hourly surface weather observation report issued at airports worldwide.", ipa: "/ˈmiː.tɑːr/", collocations: ["decode a METAR", "current METAR observation", "METAR wind group"] },
      { en: "TAF (Terminal Aerodrome Forecast)", es: "TAF (Pronóstico de Aeródromo Terminal)", definition: "24–30 hour weather forecast for airport conditions, issued every 6 hours in coded format.", ipa: "/tæf/", collocations: ["TAF validity period", "TEMPO group", "BECMG change indicator"] },
      { en: "SIGMET", es: "SIGMET (Información Meteorológica Significativa)", definition: "Warning advisory for hazardous en route weather: severe turbulence, severe icing, volcanic ash, embedded thunderstorms.", ipa: "/ˈsɪɡ.mɛt/", collocations: ["convective SIGMET", "SIGMET for volcanic ash", "valid SIGMET area"] },
      { en: "Ceiling", es: "Techo (Ceiling)", definition: "Height of the lowest cloud layer reported as Broken (BKN) or Overcast (OVC), defining the vertical extent of visual flight conditions.", ipa: "/ˈsiː.lɪŋ/", collocations: ["ceiling 800 feet", "below minimums ceiling", "indefinite ceiling"] },
      { en: "Altimeter Setting", es: "Ajuste de Altímetro (QNH)", definition: "Atmospheric pressure value set on the altimeter to read correct altitude above mean sea level.", ipa: "/ælˈtɪm.ɪ.tər/", collocations: ["altimeter 29.92", "QNH setting", "transition level altimeter"] },
      { en: "Runway Visual Range (RVR)", es: "Alcance Visual de Pista (RVR)", definition: "Instrumentally measured distance a pilot can see down the runway from a specific point, critical for low-visibility approach minimums.", ipa: "/ˌɑːr.viːˈɑːr/", collocations: ["RVR 2400 feet", "touchdown RVR", "approach minimums RVR"] }
    ],
    questions: [
      { q: "In a METAR, what does '28012G22KT' mean?", options: ["Temperature 28°C, humidity 12%", "Wind from 280° at 12 knots gusting to 22 knots", "Runway 28 visibility 12 km", "Cloud base at 280 meters"], answer: 1 },
      { q: "What is the difference between TEMPO and BECMG in a TAF?", options: ["TEMPO is for wind, BECMG is for clouds", "TEMPO indicates temporary fluctuations; BECMG indicates a gradual permanent change", "They are the same", "TEMPO is international, BECMG is US-only"], answer: 1 },
      { q: "What type of weather information does a SIGMET warn about?", options: ["Normal weather conditions", "Hazardous phenomena: severe turbulence, severe icing, volcanic ash, embedded CBs", "Light winds and clear skies", "Airport construction notices"], answer: 1 },
      { q: "Why is the altimeter setting critical for safe flight?", options: ["It controls the engine power", "It ensures the altimeter displays correct altitude above mean sea level for terrain and traffic separation", "It adjusts the cabin temperature", "It activates the autopilot"], answer: 1 }
    ]
  }]
};

const avengM4 = { id: "aveng-m4", title: "Crew Resource Management (CRM) & Cockpit Communication", titleES: "Gestión de Recursos de Tripulación (CRM) y Comunicación en Cabina", icon: "fa-solid fa-users-gear", readings: [{ id: "aveng-m4-r1", title: "CRM Principles, Threat & Error Management (TEM) & Assertive Communication", duration: "11 min", content: `
> **Industry Alignment**: Aligned with **ICAO Doc 9683 (Human Factors Training Manual)** and **FAA AC 120-51E (CRM Training)**.

# CRM Principles, Threat & Error Management & Assertive Communication

**Crew Resource Management (CRM)** is the training methodology designed to reduce human error in aviation by optimizing the use of all available resources: equipment, procedures, and—most critically—the people in the cockpit.

## 1. The Evolution of CRM

CRM emerged from the investigation of catastrophic accidents caused not by mechanical failure, but by breakdowns in crew communication, leadership, and decision-making. The landmark 1977 Tenerife disaster (583 fatalities) and the 1978 United Airlines Flight 173 fuel exhaustion crash demonstrated that captains who ignored input from junior crew members created fatal authority gradients.

Modern CRM (6th generation) emphasizes **Threat and Error Management (TEM)**:
- **Threats**: External factors that increase operational complexity (weather, ATC congestion, aircraft malfunctions, fatigue). Threats are anticipated and managed proactively.
- **Errors**: Crew actions or inactions that lead to a deviation from organizational expectations. Errors are inevitable; the goal is detection and recovery before they become **undesired aircraft states** (e.g., unstabilized approach, runway incursion).
- **Undesired Aircraft States**: Conditions resulting from unmanaged errors that reduce safety margins (incorrect altitude, excessive speed on approach, wrong runway alignment).

## 2. Core CRM Competencies

- **Communication**: Clear, concise, unambiguous communication using standard phraseology. The **two-challenge rule** empowers any crew member to voice a safety concern twice; if ignored, they must take direct action.
- **Situational Awareness (SA)**: Maintaining a mental model of the current state of the aircraft, systems, environment, and crew. SA has three levels: perception (Level 1), comprehension (Level 2), and projection (Level 3—anticipating future states).
- **Decision Making**: Structured models like **FORDEC** (Facts, Options, Risks, Decision, Execution, Check) provide a systematic framework for time-critical operational decisions.
- **Workload Management**: Distributing tasks between Pilot Flying (PF) and Pilot Monitoring (PM) based on operational phase, preventing task saturation during high-workload phases (approach, engine failure, go-around).
- **Leadership & Followership**: Effective captains create an environment where first officers feel empowered to speak up. The authority gradient must be flat enough for assertive communication but structured enough for decisive command authority.

## 3. Assertive Communication Techniques

When a crew member identifies a safety concern:
1. **State the observation**: "I see our airspeed is decaying below Vref."
2. **Express concern**: "I'm concerned we may be getting too slow for a stabilized approach."
3. **Propose a solution**: "I recommend adding thrust and considering a go-around."
4. **Seek agreement**: "Do you agree, Captain?"

If overruled and the threat persists, the crew member escalates: "Captain, I am unable to accept this approach. We need to go around NOW."

---
> **Key Takeaway**: CRM optimizes cockpit teamwork through **Threat and Error Management**, **structured decision-making (FORDEC)**, and **assertive communication** that empowers all crew members to challenge unsafe situations—transforming the cockpit from an authoritarian hierarchy into a collaborative safety system.
`,
    vocabulary: [
      { en: "Crew Resource Management (CRM)", es: "Gestión de Recursos de Tripulación (CRM)", definition: "Training methodology optimizing crew communication, leadership, and decision-making to reduce human error in aviation.", ipa: "/kruː rɪˈsɔːrs/", collocations: ["CRM training program", "CRM competencies", "CRM scenario exercise"] },
      { en: "Threat and Error Management (TEM)", es: "Gestión de Amenazas y Errores (TEM)", definition: "Framework for proactively identifying threats, trapping errors, and recovering from undesired aircraft states.", ipa: "/θrɛt ænd ˈɛr.ər/", collocations: ["TEM model", "error trapping", "unmanaged threat"] },
      { en: "Situational Awareness (SA)", es: "Conciencia Situacional (SA)", definition: "Pilot's mental model of the current state and projected future state of the aircraft, systems, and environment.", ipa: "/ˌsɪtʃ.uˈeɪ.ʃən.əl/", collocations: ["loss of SA", "maintain situational awareness", "SA Level 3 projection"] },
      { en: "Authority Gradient", es: "Gradiente de Autoridad", definition: "The perceived difference in authority between the captain and first officer, affecting the junior crew member's willingness to speak up.", ipa: "/ɔːˈθɒr.ɪ.ti ˈɡreɪ.di.ənt/", collocations: ["steep authority gradient", "flat cockpit hierarchy", "assertive first officer"] },
      { en: "FORDEC", es: "FORDEC (Modelo de Decisión)", definition: "Structured decision-making model: Facts, Options, Risks & benefits, Decision, Execution, Check.", ipa: "/ˈfɔːr.dɛk/", collocations: ["apply FORDEC model", "time-critical FORDEC", "FORDEC decision audit"] },
      { en: "Stabilized Approach", es: "Aproximación Estabilizada", definition: "An approach where the aircraft meets all required parameters (speed, configuration, descent rate, alignment) by a defined gate altitude.", ipa: "/ˈsteɪ.bɪ.laɪzd/", collocations: ["stabilized by 1,000 feet", "unstabilized approach go-around", "approach criteria met"] }
    ],
    questions: [
      { q: "What event catalyzed the development of modern CRM training?", options: ["The invention of autopilot", "Fatal accidents caused by crew communication failures, not mechanical problems", "The introduction of GPS", "A change in fuel regulations"], answer: 1 },
      { q: "In the TEM framework, what is an 'undesired aircraft state'?", options: ["A clean aircraft", "A condition resulting from unmanaged errors that reduces safety margins", "A new aircraft model", "An aircraft on the ground"], answer: 1 },
      { q: "What does the 'two-challenge rule' empower a crew member to do?", options: ["Challenge the airline's management twice per year", "Voice a safety concern twice, and if ignored, take direct action", "Change the flight plan twice", "Request two meals during the flight"], answer: 1 },
      { q: "What does FORDEC stand for?", options: ["Flight, Operations, Runway, Departure, Engine, Checklist", "Facts, Options, Risks, Decision, Execution, Check", "Fuel, Oil, Radar, Distance, Elevation, Course", "Forward, Observe, Report, Decide, Engage, Confirm"], answer: 1 }
    ]
  }]
};

const avengM5 = { id: "aveng-m5", title: "Emergency Communications: Pan-Pan, Mayday & Escalation", titleES: "Comunicaciones de Emergencia: Pan-Pan, Mayday y Escalación", icon: "fa-solid fa-triangle-exclamation", readings: [{ id: "aveng-m5-r1", title: "Emergency & Urgency Phraseology, Squawk 7700 & Ditching Procedures", duration: "11 min", content: `
> **Industry Alignment**: Aligned with **ICAO Annex 2 (Rules of the Air)**, **ICAO Annex 10 Vol. II**, and **FAA AIM Chapter 6 (Emergency Procedures)**.

# Emergency & Urgency Phraseology, Squawk 7700 & Ditching Procedures

Aviation emergencies demand immediate, precise communication. The international radiotelephony distress and urgency protocol, established by ICAO, ensures that any pilot worldwide can declare an emergency using universally understood phrases.

## 1. Distress vs. Urgency

- **MAYDAY (Distress)**: Declared when the aircraft or its occupants are in **grave and imminent danger** and require immediate assistance. Examples: engine fire, complete engine failure, structural failure, rapid depressurization. The word "MAYDAY" is spoken three times.
- **PAN-PAN (Urgency)**: Declared when the situation is **urgent but not immediately life-threatening**. Examples: partial system failure, sick passenger requiring medical diversion, fuel status approaching minimum reserves. "PAN-PAN" is spoken three times.

## 2. Standard Distress Call Format

\`\`\`
"MAYDAY, MAYDAY, MAYDAY,
[Station addressed] — Monterrey Approach,
[Callsign] — Volaris 512,
[Nature of distress] — Engine fire, left engine,
[Intentions] — Returning to Monterrey,
[Position, altitude] — 15 miles north, 8,000 feet,
[Souls on board] — 162 souls,
[Fuel remaining] — 45 minutes,
[Other information] — Requesting crash fire rescue."
\`\`\`

## 3. Emergency Transponder Codes

- **Squawk 7700**: General emergency. Activates a prominent flashing symbol on all ATC radar displays, instantly prioritizing the aircraft.
- **Squawk 7600**: Communication failure (NORDO — No Radio). ATC provides separation services assuming the pilot is following the last assigned route and altitude.
- **Squawk 7500**: Hijack/unlawful interference. Triggers immediate security response protocols without requiring verbal communication that could alert the hijacker.

## 4. ATC Priority Handling

Upon receiving a distress declaration:
1. ATC acknowledges: "Volaris 512, Mayday acknowledged. You are cleared to Monterrey via direct, descend at your discretion. All traffic will be cleared from your path."
2. **Priority over all other traffic**: The distressed aircraft receives unrestricted clearance. All other aircraft are vectored clear.
3. **Alert notification**: ATC activates the Alerting Service, notifying rescue coordination centers (RCC) and airport crash/fire/rescue (CFR) services.
4. **Silence on frequency**: The controller may transmit "All stations, stop transmitting, MAYDAY traffic" to clear the frequency.

## 5. Communication Failure Procedures

If radio communication is lost (NORDO):
- Squawk 7600 and attempt communication on the emergency frequency 121.5 MHz.
- In VMC (Visual Meteorological Conditions): Continue VFR, land at the nearest suitable airport.
- In IMC (Instrument Meteorological Conditions): Follow the last assigned route and altitude, then the filed flight plan route. Commence the approach at the Expected Approach Time (EAT) or, if none received, at the Estimated Time of Arrival (ETA).

---
> **Key Takeaway**: Aviation emergencies use **MAYDAY** (grave danger) and **PAN-PAN** (urgency) protocols with **structured distress call formats**. Emergency transponder codes (**7700, 7600, 7500**) provide instant identification on ATC radar, triggering priority handling, traffic clearance, and rescue coordination.
`,
    vocabulary: [
      { en: "MAYDAY", es: "MAYDAY (Señal de Socorro)", definition: "International distress signal indicating the aircraft or occupants are in grave and imminent danger requiring immediate assistance.", ipa: "/ˈmeɪ.deɪ/", collocations: ["declare MAYDAY", "MAYDAY three times", "Mayday acknowledged"] },
      { en: "PAN-PAN", es: "PAN-PAN (Señal de Urgencia)", definition: "International urgency signal indicating a condition requiring assistance but not immediate danger to life or aircraft.", ipa: "/pæn pæn/", collocations: ["declare PAN-PAN", "urgency situation", "medical PAN-PAN"] },
      { en: "Squawk 7700", es: "Squawk 7700 (Código de Emergencia)", definition: "Transponder code activating an emergency alert on all ATC radar displays, providing instant visual identification.", ipa: "/skwɔːk/", collocations: ["squawk 7700 emergency", "transponder emergency code", "radar alert symbol"] },
      { en: "Souls on Board (SOB)", es: "Almas a Bordo (SOB)", definition: "Total number of persons (passengers and crew) on the aircraft, reported during emergency declarations for rescue planning.", ipa: "/soʊlz ɒn bɔːrd/", collocations: ["162 souls on board", "report souls and fuel", "rescue coordination"] },
      { en: "NORDO (No Radio)", es: "NORDO (Sin Radio)", definition: "Condition where an aircraft has lost all radio communication capability, requiring transponder code 7600 and visual signal procedures.", ipa: "/ˈnɔːr.doʊ/", collocations: ["NORDO procedures", "squawk 7600", "communication failure"] },
      { en: "Emergency Frequency 121.5 MHz", es: "Frecuencia de Emergencia 121.5 MHz", definition: "International aeronautical emergency and distress frequency monitored by all ATC facilities and many aircraft.", ipa: "/ɪˈmɜːr.dʒən.si/", collocations: ["guard frequency", "monitor 121.5", "emergency locator transmitter"] }
    ],
    questions: [
      { q: "When should a pilot declare MAYDAY instead of PAN-PAN?", options: ["When requesting a meal", "When the aircraft or occupants are in grave and imminent danger", "When requesting a frequency change", "When the weather is slightly bad"], answer: 1 },
      { q: "What transponder code indicates a hijack situation?", options: ["7700", "7600", "7500", "1200"], answer: 2 },
      { q: "How many times must the word 'MAYDAY' be spoken at the beginning of a distress call?", options: ["Once", "Twice", "Three times", "Five times"], answer: 2 },
      { q: "What should a pilot do first when experiencing total radio communication failure?", options: ["Land immediately regardless of conditions", "Squawk 7600 and attempt contact on 121.5 MHz", "Turn off all electrical systems", "Descend to the lowest altitude"], answer: 1 }
    ]
  }]
};

// ─── APPLY ─────────────────────────────────────
const course = LXP_COURSES["aviation-english"];
const mods = [avengM2, avengM3, avengM4, avengM5];
for (const mod of mods) {
  const idx = course.modules.findIndex(m => m.id === mod.id);
  if (idx !== -1) { course.modules[idx] = mod; console.log(`  ✅ ${mod.id}`); }
  else { course.modules.push(mod); console.log(`  ➕ ${mod.id}`); }
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
console.log(`\n✅ Aviation English expanded. File: ${(fs.statSync(coursesPath).size/1024).toFixed(1)} KB`);
