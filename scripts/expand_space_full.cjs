const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Space & Satellite Modules 2-5...');

const track = LXP_COURSES["space-satellite"];
if (!track) {
    console.log("Track space-satellite not found!");
    process.exit(1);
}

// Module 2: CubeSat Subsystems: EPS, OBC, ADCS and Payload Integration
track.modules[1] = {
    id: "space-m2",
    title: "CubeSat Subsystems: EPS, OBC, ADCS and Payload Integration",
    titleES: "Subsistemas CubeSat: EPS, OBC, ADCS e Integración de Carga Útil",
    icon: "fa-solid fa-satellite",
    readings: [
        {
            id: "space-m2-r1",
            title: "Anatomy of a Nanosatellite",
            duration: "10 min",
            content: `
# Anatomy of a Nanosatellite

A **CubeSat** is a class of nanosatellites that use a standard size and form factor. The standard unit (1U) is a $10 \\times 10 \\times 10$ cm cube weighing roughly 1 kg. Despite their small size, they contain all the critical subsystems of a school-bus-sized satellite.

## Core Subsystems

- **EPS (Electrical Power System)**: Consists of solar panels (often deployable), batteries, and a power distribution board. It manages the energy budget of the satellite.
- **OBC (On-Board Computer)**: The "brain." It manages data storage, executes commands, and schedules when the payload should take readings.
- **ADCS (Attitude Determination and Control System)**: Figures out where the satellite is pointing (using sun sensors, star trackers, and magnetometers) and physically rotates it (using reaction wheels or magnetorquers) to point cameras at Earth or solar panels at the sun.

## The Payload

The **Payload** is the reason the satellite was launched. It could be a high-resolution camera, a radio receiver, or a biological experiment. Every subsystem exists purely to keep the payload alive and transmit its data back to Earth.

---
> **Key Takeaway**: CubeSats have democratized space by standardizing the satellite bus, allowing universities and startups to launch payloads into Low Earth Orbit (LEO) at a fraction of historical costs.
`,
            vocabulary: [
                {
                    en: "Attitude",
                    es: "Actitud (Orientación)",
                    definition: "The orientation of a spacecraft relative to its direction of motion or another frame of reference."
                },
                {
                    en: "Payload",
                    es: "Carga útil",
                    definition: "The cargo carried by a spacecraft, which performs the primary mission."
                },
                {
                    en: "Subsystem",
                    es: "Subsistema",
                    definition: "A self-contained system within a larger system."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: Rocket Propulsion: Chemical, Cryogenic and Hall-Effect Thrusters
track.modules[2] = {
    id: "space-m3",
    title: "Rocket Propulsion: Chemical, Cryogenic and Hall-Effect Thrusters",
    titleES: "Propulsión de Cohetes: Propulsores Químicos, Criogénicos y de Efecto Hall",
    icon: "fa-solid fa-rocket",
    readings: [
        {
            id: "space-m3-r1",
            title: "Reaching Orbit and Beyond",
            duration: "12 min",
            content: `
# Reaching Orbit and Beyond

Spacecraft propulsion is divided into two phases: Launch (escaping Earth's gravity) and In-Space Propulsion (maneuvering once in orbit).

## Chemical Propulsion

Launch vehicles rely on massive chemical rockets. They mix a **fuel** (like RP-1 kerosene or liquid hydrogen) with an **oxidizer** (like liquid oxygen) in a combustion chamber.
- **Cryogenic Engines**: Use super-chilled liquid gases. The space shuttle main engines used liquid hydrogen/oxygen. They are highly efficient but extremely difficult to handle and store.
- **Hypergolic Engines**: Use chemicals that spontaneously ignite when they touch. They are highly reliable (no spark plug needed) and are often used for maneuvering thrusters, but they are highly toxic.

## Electric Propulsion (Hall-Effect Thrusters)

Once a satellite is in orbit, it doesn't need millions of pounds of thrust. It needs efficiency. 
**Hall-Effect Thrusters** use electricity (from solar panels) to ionize a noble gas (like Xenon) and accelerate it to extremely high speeds using a magnetic field. 
- **Advantage**: They have very high **Specific Impulse ($I_{sp}$)**, meaning they use very little propellant.
- **Disadvantage**: They produce very low thrust—equivalent to the weight of a piece of paper. They accelerate the spacecraft very slowly over months.

---
> **Key Takeaway**: Chemical rockets provide the brute force needed to escape gravity, while electric propulsion provides the extreme efficiency needed for long-duration deep space missions.
`,
            vocabulary: [
                {
                    en: "Cryogenic",
                    es: "Criogénico",
                    definition: "Relating to the production and behavior of materials at very low temperatures."
                },
                {
                    en: "Oxidizer",
                    es: "Oxidante",
                    definition: "A substance that provides the oxygen necessary for combustion."
                },
                {
                    en: "Thrust",
                    es: "Empuje",
                    definition: "The propulsive force generated by a rocket engine."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: Satellite Ground Stations: Telemetry, Tracking and Command (TT&C)
track.modules[3] = {
    id: "space-m4",
    title: "Satellite Ground Stations: Telemetry, Tracking and Command (TT&C)",
    titleES: "Estaciones Terrenas: Telemetría, Rastreo y Comando (TT&C)",
    icon: "fa-solid fa-satellite-dish",
    readings: [
        {
            id: "space-m4-r1",
            title: "Talking to Spacecraft",
            duration: "10 min",
            content: `
# Talking to Spacecraft

A satellite in orbit is useless if we cannot receive its data or send it instructions. This communication is handled by the **Ground Segment**, specifically Ground Stations with large parabolic dish antennas.

## The TT&C Subsystem

1. **Telemetry**: The "health check" data the satellite sends down. This includes battery voltage, temperatures, and error logs.
2. **Tracking**: Determining the exact orbital position and velocity of the satellite from Earth.
3. **Command**: The instructions sent *up* to the satellite (e.g., "turn on the camera," or "fire the thrusters for 3 seconds").

## The Challenge of LEO

Satellites in **Low Earth Orbit (LEO)** travel at roughly 7.8 km per second. From the perspective of a single Ground Station on Earth, the satellite will rise over the horizon and set just 10 minutes later. 
- During this short "pass," the antenna must physically track the fast-moving satellite across the sky.
- The satellite must download all its collected data (often gigabytes of imagery) in that tiny 10-minute window before connection is lost.

---
> **Key Takeaway**: To maintain continuous contact with a LEO satellite, operators must rent time on a global network of ground stations distributed across different continents.
`,
            vocabulary: [
                {
                    en: "Telemetry",
                    es: "Telemetría",
                    definition: "The automated communications process by which measurements and other data are collected at remote or inaccessible points and transmitted to receiving equipment."
                },
                {
                    en: "Orbit",
                    es: "Órbita",
                    definition: "The gravitationally curved trajectory of an object, such as the trajectory of a planet around a star or a natural satellite around a planet."
                },
                {
                    en: "Antenna",
                    es: "Antena",
                    definition: "A rod, wire, or other device used to transmit or receive radio or television signals."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: Space Debris Mitigation & Radiation Hardening in Orbit
track.modules[4] = {
    id: "space-m5",
    title: "Space Debris Mitigation & Radiation Hardening in Orbit",
    titleES: "Mitigación de Basura Espacial y Endurecimiento contra Radiación",
    icon: "fa-solid fa-meteor",
    readings: [
        {
            id: "space-m5-r1",
            title: "Surviving the Orbital Environment",
            duration: "12 min",
            content: `
# Surviving the Orbital Environment

Space is an incredibly hostile environment for both humans and electronics. The two greatest threats to a satellite's lifespan are radiation and collisions.

## Radiation Hardening

Outside Earth's protective atmosphere, satellites are bombarded by high-energy cosmic rays and solar flares.
- **Single Event Upsets (SEUs)**: A high-energy particle can strike a memory chip and flip a '0' to a '1'. This "bit flip" can crash the onboard computer or corrupt data.
- **Radiation Hardening**: To survive, aerospace engineers use specialized, older-generation computer chips with physical shielding. They also use software redundancy, where three computers calculate the same math problem; if one gets hit by radiation and disagrees with the other two, it is ignored (Triple Modular Redundancy).

## Space Debris Mitigation

There are over 30,000 tracked pieces of "space junk" larger than a softball in orbit. At orbital speeds, a collision with a 1-centimeter screw carries the energy of an exploding hand grenade.
- **The Kessler Syndrome**: A theoretical scenario where collisions create more debris, causing a cascade effect that could render Low Earth Orbit unusable for generations.
- **Mitigation**: International regulations now require satellites to have a de-orbit plan. At the end of their 5-year mission, satellites must lower their orbit so they burn up safely in the atmosphere, rather than floating dead in space for centuries.

---
> **Key Takeaway**: Designing for space is fundamentally different from terrestrial engineering. You cannot send a technician to fix a broken computer or buff out a scratch in Low Earth Orbit.
`,
            vocabulary: [
                {
                    en: "Radiation",
                    es: "Radiación",
                    definition: "The emission of energy as electromagnetic waves or as moving subatomic particles, especially high-energy particles which cause ionization."
                },
                {
                    en: "Debris",
                    es: "Escombros / Basura",
                    definition: "Scattered pieces of waste or remains."
                },
                {
                    en: "Redundancy",
                    es: "Redundancia",
                    definition: "The inclusion of extra components which are not strictly necessary to functioning, in case of failure in other components."
                }
            ]
        }
    ],
    quiz: []
};

track.status = "full";

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
console.log('✅ Space & Satellite modules expanded and status set to "full".');
