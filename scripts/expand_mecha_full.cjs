const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Mechatronics Modules 2-5...');

const track = LXP_COURSES["mechatronics"];
if (!track) {
    console.log("Track mechatronics not found!");
    process.exit(1);
}

// Module 2: Actuators & Servomotors: Closed-Loop PID Motion Control
track.modules[1] = {
    id: "mecha-m2",
    title: "Actuators & Servomotors: Closed-Loop PID Motion Control",
    titleES: "Actuadores y Servomotores: Control PID de Lazo Cerrado",
    icon: "fa-solid fa-cogs",
    readings: [
        {
            id: "mecha-m2-r1",
            title: "Principles of Closed-Loop Control",
            duration: "10 min",
            content: `
# Principles of Closed-Loop Control

In mechatronics, moving a robotic arm precisely to a specific coordinate requires more than just sending voltage to a motor. It requires a **closed-loop system** with constant feedback.

## Servomotors vs Stepper Motors

- **Stepper Motors**: Move in discrete steps (e.g., 1.8 degrees per pulse). They operate in an *open-loop*, meaning the controller assumes the motor reached the position. If the motor gets stuck, the controller doesn't know.
- **Servomotors**: Use a high-speed DC or AC motor coupled with an encoder (sensor) that constantly reports the exact rotational position back to the controller.

## The PID Controller

To ensure the servomotor reaches its target quickly without overshooting, engineers use a **PID (Proportional-Integral-Derivative)** controller.
1. **Proportional (P)**: The further away from the target, the harder the motor pushes.
2. **Integral (I)**: Looks at past errors to eliminate steady-state error (e.g., if friction stops the arm just short of the target).
3. **Derivative (D)**: Looks at the rate of change and acts like a brake to prevent the arm from swinging past the target (overshoot).

---
> **Key Takeaway**: Servomotors paired with finely tuned PID controllers are the foundation of precise, high-speed industrial robotics.
`,
            vocabulary: [
                {
                    en: "Closed-loop",
                    es: "Lazo cerrado / Bucle cerrado",
                    definition: "A control system that uses feedback from the output to control the input."
                },
                {
                    en: "Encoder",
                    es: "Codificador (Sensor de posición)",
                    definition: "A sensor that translates mechanical motion into electrical signals to report position or speed."
                },
                {
                    en: "Overshoot",
                    es: "Sobrepaso",
                    definition: "When a system exceeds its target before correcting itself."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: Electro-Pneumatic & Hydraulic Power Transmission Systems
track.modules[2] = {
    id: "mecha-m3",
    title: "Electro-Pneumatic & Hydraulic Power Transmission Systems",
    titleES: "Sistemas de Transmisión de Potencia Electro-Neumática e Hidráulica",
    icon: "fa-solid fa-compress-arrows-alt",
    readings: [
        {
            id: "mecha-m3-r1",
            title: "Fluid Power in Industrial Automation",
            duration: "12 min",
            content: `
# Fluid Power in Industrial Automation

When electric motors aren't enough to generate massive linear force, mechatronics engineers turn to fluid power: **Pneumatics** and **Hydraulics**.

## Pneumatics (Air)

Pneumatic systems use compressed air to generate fast, clean, and safe linear motion.
- **Common Components**: Compressors, air prep units (FRL - Filter, Regulator, Lubricator), directional control valves, and pneumatic cylinders.
- **Applications**: High-speed sorting, pick-and-place packaging, and automated assembly where cleanliness is critical (e.g., food processing).
- **Limitation**: Air is compressible, so pneumatics are not ideal for stopping a load at a precise intermediate position.

## Hydraulics (Oil)

Hydraulic systems use pressurized liquid (usually mineral oil).
- **Advantage**: Because liquid is virtually incompressible, hydraulics can generate immense, steady force and hold heavy loads in precise positions.
- **Applications**: Heavy stamping presses, construction equipment, and injection molding machines.
- **Limitation**: Prone to leaks, messy, and requires robust, heavy hosing.

## Electro-Pneumatics

Modern systems are "electro-pneumatic". A PLC (Programmable Logic Controller) sends an electrical 24V signal to a **solenoid valve**, which magnetically shifts a spool to redirect the pressurized air, extending or retracting the cylinder.

---
> **Key Takeaway**: Use pneumatics for high speed and clean environments. Use hydraulics for immense force and rigidity.
`,
            vocabulary: [
                {
                    en: "Compressible",
                    es: "Compresible",
                    definition: "Capable of being reduced in volume by pressure (like air)."
                },
                {
                    en: "Solenoid valve",
                    es: "Electroválvula",
                    definition: "An electromechanically operated valve used to control the flow of fluid or air."
                },
                {
                    en: "Cylinder",
                    es: "Cilindro / Pistón",
                    definition: "An actuator that creates linear motion using fluid power."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: Shaft Couplings, Bearing Selection and Harmonic Drives
track.modules[3] = {
    id: "mecha-m4",
    title: "Shaft Couplings, Bearing Selection and Harmonic Drives",
    titleES: "Acoplamientos de Ejes, Selección de Rodamientos y Reductores Armónicos",
    icon: "fa-solid fa-wrench",
    readings: [
        {
            id: "mecha-m4-r1",
            title: "Mechanical Power Transmission",
            duration: "10 min",
            content: `
# Mechanical Power Transmission

Getting power from a motor shaft to a robotic joint requires careful mechanical design. Any play or looseness in the mechanical system will ruin the precision of the PID controller.

## Backlash and Harmonic Drives

**Backlash** is the clearance or "play" between mating gear teeth. In a robotic arm, even 1 millimeter of backlash at the shoulder joint translates to massive inaccuracy at the gripper.

To solve this, industrial robots use **Harmonic Drives** (Strain wave gearing). 
- A Harmonic Drive has zero backlash.
- It provides a massive gear reduction ratio in a very compact, lightweight package.
- It works by using a flexible splined cup that deforms slightly as it rotates inside a circular ring gear.

## Bearings and Couplings

- **Couplings**: Connect the motor shaft to the driven shaft. A *flexible coupling* is often used to accommodate slight misalignments and absorb shock.
- **Bearings**: Support rotating shafts while reducing friction. *Linear guide bearings* are used in CNC machines for smooth, rigid linear travel, while *tapered roller bearings* handle both radial (side-to-side) and axial (thrust) loads.

---
> **Key Takeaway**: The best software controller in the world cannot compensate for a poorly designed mechanical drivetrain with high backlash and friction.
`,
            vocabulary: [
                {
                    en: "Backlash",
                    es: "Juego mecánico / Holgura",
                    definition: "The clearance or lost motion in a mechanism caused by gaps between the parts."
                },
                {
                    en: "Harmonic Drive",
                    es: "Reductor armónico",
                    definition: "A type of gear system that can improve certain characteristics compared to traditional gearing, specifically zero backlash."
                },
                {
                    en: "Bearing",
                    es: "Rodamiento / Balero",
                    definition: "A machine element that constrains relative motion to only the desired motion, and reduces friction between moving parts."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: Thermal Management in Electronic Enclosures & Heat Pipes
track.modules[4] = {
    id: "mecha-m5",
    title: "Thermal Management in Electronic Enclosures & Heat Pipes",
    titleES: "Gestión Térmica en Gabinetes Electrónicos y Tubos de Calor",
    icon: "fa-solid fa-thermometer-half",
    readings: [
        {
            id: "mecha-m5-r1",
            title: "Cooling High-Power Electronics",
            duration: "12 min",
            content: `
# Cooling High-Power Electronics

Mechatronic systems combine heavy mechanical loads with sensitive electronics. As motor drivers and processors consume power, they generate heat. Without proper **thermal management**, components degrade rapidly or fail catastrophically.

## Heat Transfer Mechanisms

Engineers must manage heat through three mechanisms:
1. **Conduction**: Heat transfer through solid materials (e.g., a copper heatsink attached to a CPU).
2. **Convection**: Heat transfer via fluids or air (e.g., a fan blowing cold air across the heatsink fins).
3. **Radiation**: Heat emitted as infrared waves.

## Advanced Cooling Technologies

For extreme environments where fans are not enough (or where dust prevents their use), engineers use advanced solutions:

- **Heat Pipes**: A sealed copper tube containing a small amount of liquid (like water) under a vacuum. The liquid boils at the hot end, absorbing massive heat, travels to the cool end as vapor, condenses, and returns via capillary action. Heat pipes transfer heat hundreds of times faster than solid copper.
- **Liquid Cooling**: Pumping a coolant (like water-glycol) through cold plates attached directly to high-power components, commonly used in EV battery packs and high-end server racks.

---
> **Key Takeaway**: Effective thermal design requires moving heat away from the source via conduction (heatsinks/heat pipes) and exhausting it from the system via convection (fans/liquid loops).
`,
            vocabulary: [
                {
                    en: "Conduction",
                    es: "Conducción",
                    definition: "The transfer of heat through a solid material from a region of higher temperature to lower temperature."
                },
                {
                    en: "Convection",
                    es: "Convección",
                    definition: "The transfer of heat by the circulation or movement of the heated parts of a liquid or gas."
                },
                {
                    en: "Heat Pipe",
                    es: "Tubo de calor",
                    definition: "A heat-transfer device that combines the principles of both thermal conductivity and phase transition."
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
console.log('✅ Mechatronics modules expanded and status set to "full".');
