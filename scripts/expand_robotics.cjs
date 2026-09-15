// scripts/expand_robotics.cjs — Expand Robotics & Automation modules (robot-m2 through robot-m5)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Robotics & Automation...');

// ─── MODULE 2: PLCs & IEC 61131-3 ─────────────
const robotM2 = {
  id: "robot-m2",
  title: "Programmable Logic Controllers (PLCs) & IEC 61131-3",
  titleES: "Controladores Lógicos Programables (PLCs) e IEC 61131-3",
  icon: "fa-solid fa-microchip",
  readings: [{
    id: "robot-m2-r1",
    title: "PLC Architecture, Scan Cycle & IEC 61131-3 Programming Languages",
    duration: "13 min",
    content: `
> **Industry Alignment**: Aligned with **IEC 61131-3 (Programmable Controller Programming Languages)**, **Rockwell Automation / Allen-Bradley** certification paths, and **Siemens TIA Portal** proficiency standards.

# PLC Architecture, Scan Cycle & IEC 61131-3 Programming Languages

The **Programmable Logic Controller (PLC)** is the central nervous system of every automated manufacturing line, robotic workcell, and process control system. From automotive body-in-white welding stations to pharmaceutical filling machines, PLCs execute deterministic real-time control logic with scan cycle times measured in milliseconds.

## 1. PLC Hardware Architecture

A modern industrial PLC consists of modular hardware components mounted on a DIN rail backplane:

- **CPU Module**: Contains the processor, program memory (flash), and communications interfaces. Industrial CPUs from Siemens (S7-1500), Rockwell Allen-Bradley (ControlLogix 5580), and Mitsubishi (iQ-R) execute millions of instructions per second with deterministic timing guaranteed by a real-time operating system (RTOS).
- **Power Supply Module**: Converts facility AC power (120/240V) to the 24V DC bus powering all I/O modules and the CPU backplane.
- **Digital Input Modules**: Interface with discrete field devices (proximity sensors, limit switches, push buttons). Each input channel reads a binary state (ON/OFF, 24V/0V) and maps it to a memory bit in the PLC's input image table.
- **Digital Output Modules**: Drive discrete actuators (solenoid valves, indicator lamps, motor contactors) by energizing relay or solid-state outputs based on the output image table.
- **Analog I/O Modules**: Read continuous process variables (4–20 mA current loops from pressure transmitters, 0–10V signals from temperature sensors) and output proportional control signals to variable frequency drives (VFDs) or proportional valves.

## 2. The PLC Scan Cycle

The PLC operates in a continuous, deterministic **scan cycle** consisting of four phases:

1. **Input Scan**: The CPU reads the physical state of all input modules and copies the data into the **Input Image Table** (a mirror of the physical inputs in CPU memory).
2. **Program Execution**: The CPU sequentially evaluates every rung of the ladder logic program (or every statement in structured text), reading from the input image table and writing results to the **Output Image Table**.
3. **Output Update**: The CPU transfers the output image table values to the physical output modules, energizing or de-energizing field devices.
4. **Housekeeping**: Communications processing (Ethernet/IP, PROFINET), diagnostics, and watchdog timer management.

A typical scan cycle completes in **1–10 milliseconds**, ensuring that safety-critical interlocks (emergency stop circuits, light curtain monitoring) respond within deterministic time bounds.

## 3. IEC 61131-3 Programming Languages

The international standard **IEC 61131-3** defines five programming languages for PLCs:

1. **Ladder Diagram (LD)**: Graphical language resembling electrical relay schematics. Contacts (inputs) and coils (outputs) are arranged on horizontal "rungs." It remains the most widely used PLC language because maintenance electricians can read it intuitively.
2. **Function Block Diagram (FBD)**: Graphical language connecting function blocks (timers, counters, PID controllers, math operations) with signal flow lines. Ideal for continuous process control and analog signal processing.
3. **Structured Text (ST)**: High-level textual language syntactically similar to Pascal. Supports IF/THEN/ELSE, FOR/WHILE loops, CASE statements, and complex mathematical expressions. Preferred for algorithm-intensive applications (trajectory calculation, recipe management).
4. **Instruction List (IL)**: Low-level assembly-like textual language. Deprecated in the 2013 revision but still found in legacy systems.
5. **Sequential Function Chart (SFC)**: Graphical language for programming sequential processes as a series of steps and transitions. Each step contains actions programmed in any of the other four languages. Ideal for batch processes, CNC tool changers, and multi-step robotic sequences.

## 4. Safety PLCs & SIL Ratings

Safety-critical applications (robot safeguarding, press brake two-hand controls, emergency stop circuits) require **Safety PLCs** certified to **IEC 61508 (Functional Safety)** and **IEC 62061 (Safety of Machinery)**:

- **SIL (Safety Integrity Level)**: Rated from SIL 1 (lowest) to SIL 3 (highest). SIL 3 requires a probability of dangerous failure per hour (PFH) of less than 10⁻⁷.
- **Redundant Architecture**: Safety PLCs use dual-channel processing (1oo2D—one-out-of-two with diagnostics). Both channels must agree before enabling a safety output. If a discrepancy is detected, the system transitions to a safe state (de-energized outputs).

---
> **Key Takeaway**: PLCs execute **deterministic scan cycles** (input → program → output) in 1–10 ms using **IEC 61131-3 languages** (Ladder, Structured Text, FBD, SFC). Safety-critical automation requires **SIL-rated Safety PLCs** with redundant dual-channel architectures to protect human operators and equipment.
`,
    vocabulary: [
      { en: "Scan Cycle", es: "Ciclo de Escaneo (Scan)", definition: "The continuous loop in which a PLC reads inputs, executes the program, and updates outputs within deterministic time bounds.", ipa: "/skæn ˈsaɪ.kəl/", collocations: ["scan cycle time", "deterministic scan", "1ms scan rate"] },
      { en: "Ladder Diagram (LD)", es: "Diagrama de Escalera (Ladder)", definition: "Graphical PLC programming language resembling electrical relay schematics with contacts and coils on horizontal rungs.", ipa: "/ˈlæd.ər ˈdaɪ.ə.ɡræm/", collocations: ["ladder logic rung", "normally open contact", "output coil"] },
      { en: "Structured Text (ST)", es: "Texto Estructurado (ST)", definition: "High-level IEC 61131-3 textual programming language with Pascal-like syntax supporting loops, conditionals, and complex math.", ipa: "/ˈstrʌk.tʃərd tɛkst/", collocations: ["IF-THEN-ELSE in ST", "FOR loop", "algorithm in structured text"] },
      { en: "Input Image Table", es: "Tabla de Imagen de Entradas", definition: "CPU memory buffer mirroring the physical state of all input modules, read at the start of each scan cycle.", ipa: "/ˈɪn.pʊt ˈɪm.ɪdʒ/", collocations: ["read input image", "memory-mapped I/O", "image table refresh"] },
      { en: "Safety Integrity Level (SIL)", es: "Nivel de Integridad de Seguridad (SIL)", definition: "IEC 61508 rating (SIL 1-3) quantifying the probability of dangerous failure per hour for safety-related control systems.", ipa: "/sɪl/", collocations: ["SIL 3 certified", "safety PLC rating", "probability of dangerous failure"] },
      { en: "Variable Frequency Drive (VFD)", es: "Variador de Frecuencia (VFD)", definition: "Electronic motor controller that adjusts the speed of an AC motor by varying the frequency and voltage of the power supply.", ipa: "/ˌviː.ɛfˈdiː/", collocations: ["VFD speed reference", "4-20 mA to VFD", "motor frequency control"] }
    ],
    questions: [
      { q: "What are the four phases of a PLC scan cycle in correct order?", options: ["Output → Input → Housekeeping → Program", "Input Scan → Program Execution → Output Update → Housekeeping", "Program → Housekeeping → Input → Output", "Initialization → Shutdown → Restart → Idle"], answer: 1 },
      { q: "Which IEC 61131-3 language is most widely used because maintenance electricians can read it intuitively?", options: ["Structured Text (ST)", "Instruction List (IL)", "Ladder Diagram (LD)", "Sequential Function Chart (SFC)"], answer: 2 },
      { q: "What does a SIL 3 Safety PLC use to ensure safe operation?", options: ["Single-channel processing only", "Dual-channel redundant architecture (1oo2D) with diagnostics", "Wi-Fi connectivity", "Cloud-based monitoring"], answer: 1 },
      { q: "What type of I/O module reads continuous process variables like 4–20 mA signals?", options: ["Digital Input Module", "Power Supply Module", "Analog Input Module", "Communications Module"], answer: 2 }
    ]
  }]
};

// ─── MODULE 3: Cobots & ISO 10218 ──────────────
const robotM3 = {
  id: "robot-m3",
  title: "Collaborative Robots (Cobots) & ISO 10218 / TS 15066 Safety",
  titleES: "Robots Colaborativos (Cobots) e ISO 10218 / TS 15066",
  icon: "fa-solid fa-people-arrows",
  readings: [{
    id: "robot-m3-r1",
    title: "Cobot Technology, Power & Force Limiting & ISO Safety Standards",
    duration: "12 min",
    content: `
> **Industry Alignment**: Aligned with **ISO 10218-1/2 (Industrial Robot Safety)**, **ISO/TS 15066 (Collaborative Robot Operation)**, and **RIA R15.06 (ANSI Safety Requirements for Industrial Robots)**.

# Cobot Technology, Power & Force Limiting & ISO Safety Standards

**Collaborative robots (cobots)** represent a paradigm shift in industrial automation: they are designed to operate in direct physical proximity to human workers without the traditional safety fencing required by conventional industrial robots. This shared workspace model enables flexible, human-robot collaborative manufacturing cells.

## 1. The Four Collaborative Operation Modes (ISO/TS 15066)

ISO/TS 15066 defines four methods for achieving safe collaborative operation:

1. **Safety-Rated Monitored Stop (SMS)**: The robot operates at full industrial speed but monitors the collaborative workspace using safety-rated sensors (laser scanners, pressure mats). When a human enters the zone, the robot executes an immediate category 2 stop (controlled deceleration). The robot resumes automatically when the human exits.

2. **Hand Guiding**: The operator physically grasps a force-sensing handle mounted on the robot's end-effector to manually guide the robot through waypoints. The robot's servo drives are in a compliant, low-impedance mode. Used for teaching and cooperative material handling.

3. **Speed & Separation Monitoring (SSM)**: Safety-rated 3D vision systems (SICK, PILZ, Keyence) continuously track the human's position and velocity. The robot dynamically adjusts its speed proportionally to the closing distance—slowing to a crawl as the human approaches and stopping if the minimum protective distance is breached.

4. **Power & Force Limiting (PFL)**: The cobot's servo joints incorporate high-resolution torque sensors that detect contact forces in real time. If an external force exceeds predefined thresholds, the robot instantly stops or reverses. ISO/TS 15066 specifies maximum permissible forces and pressures for each body region (e.g., 150N transient force for the hand, 65N quasi-static force for the chest).

## 2. Cobot Hardware Architecture

Modern cobots (Universal Robots UR series, FANUC CRX, ABB GoFa) share common design principles:

- **Series-Elastic Actuators**: Each joint contains a precision torque sensor between the motor and the output link, providing intrinsic force feedback at >1 kHz sampling rates.
- **Rounded, Clamping-Free Geometry**: All external surfaces are smooth and rounded with minimum 3mm radii to eliminate pinch points and reduce contact pressure.
- **Payload Capacity**: Typically 3–25 kg, significantly less than industrial robots (which reach 500+ kg) because the cobot must remain safe even during unexpected contact.
- **Teach Pendant & Programming Interface**: Polyscope (UR), FANUC iHMI, or ABB FlexPendant provide graphical programming with drag-and-drop waypoints, enabling operators without formal robotics training to program tasks in minutes.

## 3. Risk Assessment for Collaborative Cells

Before deploying a cobot, engineers must conduct a formal **Risk Assessment** per ISO 12100:

1. **Hazard Identification**: Catalog all potential contact scenarios (operator reaching into the robot's swing radius, tool-change collisions, dropped workpieces).
2. **Risk Estimation**: For each hazard, estimate severity (S), frequency of exposure (F), and possibility of avoidance (P) using the risk matrix.
3. **Risk Reduction**: Apply the hierarchy: (1) Inherently safe design (PFL mode, rounded geometry), (2) Safeguarding (light curtains, area scanners), (3) Complementary measures (warning signs, training).
4. **Residual Risk Validation**: Verify through physical contact-force measurements using calibrated force gauges on body-model dummies that all contact scenarios remain below ISO/TS 15066 biomechanical limits.

---
> **Key Takeaway**: Cobots achieve safe human-robot collaboration through **four ISO/TS 15066 modes** (SMS, Hand Guiding, SSM, PFL), with **power-and-force-limited joints** detecting contact in real time. Deployment requires rigorous **ISO 12100 risk assessments** validating that all contact forces remain below biomechanical injury thresholds.
`,
    vocabulary: [
      { en: "Collaborative Robot (Cobot)", es: "Robot Colaborativo (Cobot)", definition: "Industrial robot designed to operate safely in direct physical proximity to human workers without protective fencing.", ipa: "/ˈkoʊ.bɒt/", collocations: ["cobot workcell", "fenceless cobot operation", "human-robot collaboration"] },
      { en: "Power & Force Limiting (PFL)", es: "Limitación de Potencia y Fuerza (PFL)", definition: "Collaborative mode where joint torque sensors detect contact forces and instantly stop the robot if thresholds are exceeded.", ipa: "/ˈpaʊ.ər ænd fɔːrs/", collocations: ["PFL mode activation", "torque sensor threshold", "maximum permissible force"] },
      { en: "Risk Assessment (ISO 12100)", es: "Evaluación de Riesgos (ISO 12100)", definition: "Systematic process of hazard identification, risk estimation, and risk reduction for machinery safety.", ipa: "/rɪsk əˈsɛs.mənt/", collocations: ["conduct risk assessment", "residual risk validation", "risk reduction hierarchy"] },
      { en: "Speed & Separation Monitoring (SSM)", es: "Monitoreo de Velocidad y Separación (SSM)", definition: "Collaborative mode dynamically adjusting robot speed based on real-time distance measurement to the nearest human.", ipa: "/spiːd ˌsɛp.əˈreɪ.ʃən/", collocations: ["3D safety scanner", "minimum protective distance", "dynamic speed reduction"] },
      { en: "Series-Elastic Actuator", es: "Actuador Serie-Elástico", definition: "Joint actuator with a built-in torque sensor between motor and output link, providing intrinsic force feedback.", ipa: "/ˈsɪr.iːz ɪˈlæs.tɪk/", collocations: ["joint torque sensing", "compliant actuator", "1 kHz force feedback"] },
      { en: "Teach Pendant", es: "Consola de Programación (Teach Pendant)", definition: "Handheld device for programming and operating an industrial robot, allowing waypoint definition and parameter adjustment.", ipa: "/tiːtʃ ˈpɛn.dənt/", collocations: ["jog the robot via pendant", "teach waypoints", "pendant programming mode"] }
    ],
    questions: [
      { q: "Which ISO/TS 15066 collaborative mode uses joint torque sensors to detect contact forces?", options: ["Safety-Rated Monitored Stop", "Speed & Separation Monitoring", "Power & Force Limiting (PFL)", "Hand Guiding"], answer: 2 },
      { q: "What is the first step in a formal Risk Assessment per ISO 12100?", options: ["Install warning signs", "Hazard Identification", "Purchase insurance", "Increase robot speed"], answer: 1 },
      { q: "Why do cobots have lower payload capacity (3–25 kg) compared to industrial robots?", options: ["They use weaker motors", "They must remain safe during unexpected contact with humans", "They are designed for children", "They run on batteries"], answer: 1 },
      { q: "In Speed & Separation Monitoring, what happens as a human approaches the robot?", options: ["The robot increases speed", "The robot dynamically reduces speed proportional to closing distance", "The robot shuts down permanently", "Nothing changes"], answer: 1 }
    ]
  }]
};

// ─── MODULE 4: ROS 2 & Real-Time Middleware ────
const robotM4 = {
  id: "robot-m4",
  title: "Robot Operating System (ROS 2) & Real-Time Middleware",
  titleES: "Robot Operating System (ROS 2) y Middleware de Tiempo Real",
  icon: "fa-solid fa-robot",
  readings: [{
    id: "robot-m4-r1",
    title: "ROS 2 Architecture, DDS Communication & Real-Time Robotics",
    duration: "12 min",
    content: `
> **Industry Alignment**: Aligned with **Open Robotics ROS 2 (Jazzy Jalisco/Rolling)**, **OMG DDS (Data Distribution Service)**, and **AUTOSAR Adaptive Platform** for automotive robotics middleware.

# ROS 2 Architecture, DDS Communication & Real-Time Robotics

The **Robot Operating System 2 (ROS 2)** is the de facto open-source middleware framework for robotics research and industrial deployment. Unlike its predecessor ROS 1 (which relied on a single-point-of-failure Master node), ROS 2 is built on the **Data Distribution Service (DDS)** standard, providing decentralized, real-time-capable, publish-subscribe communication.

## 1. ROS 2 Core Concepts

- **Nodes**: Individual processes performing specific tasks (sensor driver, path planner, motor controller). Each node is a self-contained computational unit.
- **Topics**: Named publish-subscribe channels. A node publishes messages to a topic (e.g., \`/camera/image_raw\`), and any number of subscriber nodes receive them asynchronously.
- **Services**: Synchronous request-response communication. A client node sends a request (e.g., "plan a path from A to B") and blocks until the server node returns a response.
- **Actions**: Asynchronous goal-oriented communication with feedback. Used for long-running tasks (e.g., "navigate to waypoint") where the client needs periodic progress updates and the ability to cancel.
- **Parameters**: Runtime-configurable key-value settings for each node (PID gains, sensor thresholds, speed limits).

## 2. DDS: The Communication Backbone

ROS 2 delegates all inter-node communication to a **DDS (Data Distribution Service)** implementation (Eclipse Cyclone DDS, eProsima Fast DDS, RTI Connext DDS):

- **Quality of Service (QoS) Policies**: DDS offers granular control over message delivery: **Reliability** (best-effort vs. reliable delivery), **Durability** (transient local for late-joining subscribers), **Deadline** (maximum acceptable inter-message period), **Liveliness** (automatic node health detection).
- **Zero-Configuration Discovery**: DDS uses multicast-based **Simple Discovery Protocol (SDP)** to automatically find all nodes on the network without a central broker. This eliminates the single-point-of-failure inherent in ROS 1's Master architecture.
- **Real-Time Transport**: DDS implementations can be configured with deterministic shared-memory transports and pre-allocated memory pools, enabling microsecond-level latency for safety-critical control loops.

## 3. The ROS 2 Navigation Stack (Nav2)

For autonomous mobile robots (AMRs) in warehouse logistics and manufacturing floor material transport:

- **SLAM (Simultaneous Localization and Mapping)**: Algorithms (Cartographer, SLAM Toolbox) fuse LiDAR scans and odometry data to build a 2D or 3D occupancy grid map while simultaneously tracking the robot's position within it.
- **Path Planning**: The global planner (NavFn, Smac Planner) computes an optimal collision-free path through the map. The local planner (DWB, MPPI) generates real-time velocity commands to follow the global path while avoiding dynamic obstacles detected by onboard sensors.
- **Costmap**: A multi-layered grid map combining static obstacles (walls from the SLAM map), dynamic obstacles (humans detected by LiDAR), and inflation zones (safety buffers around obstacles).

## 4. Real-Time Considerations

Industrial robotics demands **hard real-time** guarantees—a missed control deadline can cause physical damage or injury:

- **PREEMPT_RT Linux Kernel**: A patched Linux kernel providing deterministic scheduling with worst-case latencies under 50 microseconds, enabling ROS 2 nodes to run control loops at 1 kHz without jitter.
- **Executor Models**: ROS 2 provides SingleThreadedExecutor and MultiThreadedExecutor for callback scheduling. For real-time control, dedicated high-priority threads with CPU core affinity prevent interference from non-critical processes.
- **ros2_control Framework**: A standardized hardware abstraction layer connecting ROS 2 controllers (joint_trajectory_controller, diff_drive_controller) to physical actuators through hardware interface plugins, ensuring portable, vendor-agnostic motion control.

---
> **Key Takeaway**: ROS 2 provides a **decentralized, DDS-based middleware** with QoS-controlled topics, services, and actions. The **Nav2 stack** enables autonomous navigation via SLAM and costmap planning, while **PREEMPT_RT kernels** and the **ros2_control** framework deliver the hard real-time guarantees required for industrial robotic control loops.
`,
    vocabulary: [
      { en: "ROS 2 (Robot Operating System 2)", es: "ROS 2 (Sistema Operativo de Robots 2)", definition: "Open-source robotics middleware framework built on DDS providing decentralized publish-subscribe communication for robotic systems.", ipa: "/rɒs tuː/", collocations: ["ROS 2 node", "ROS 2 workspace", "launch ROS 2 stack"] },
      { en: "DDS (Data Distribution Service)", es: "DDS (Servicio de Distribución de Datos)", definition: "OMG standard for real-time, decentralized publish-subscribe middleware with configurable Quality of Service policies.", ipa: "/ˌdiː.diːˈɛs/", collocations: ["DDS QoS policy", "DDS discovery protocol", "reliable DDS transport"] },
      { en: "SLAM (Simultaneous Localization and Mapping)", es: "SLAM (Localización y Mapeo Simultáneo)", definition: "Algorithm that builds a map of an unknown environment while simultaneously tracking the robot's position within it.", ipa: "/slæm/", collocations: ["LiDAR SLAM", "visual SLAM", "SLAM occupancy grid"] },
      { en: "Topic (Publish-Subscribe)", es: "Tópico (Publicar-Suscribir)", definition: "Named communication channel in ROS 2 where publisher nodes send messages and subscriber nodes receive them asynchronously.", ipa: "/ˈtɒp.ɪk/", collocations: ["publish to topic", "subscribe to /cmd_vel", "topic message type"] },
      { en: "Quality of Service (QoS)", es: "Calidad de Servicio (QoS)", definition: "DDS configuration policies controlling reliability, durability, deadline, and liveliness of inter-node message delivery.", ipa: "/ˌkjuː.oʊˈɛs/", collocations: ["reliable QoS", "best-effort delivery", "QoS profile"] },
      { en: "PREEMPT_RT Kernel", es: "Kernel PREEMPT_RT (Tiempo Real)", definition: "Patched Linux kernel providing deterministic scheduling with worst-case latencies under 50 microseconds for real-time control.", ipa: "/priːˈɛmpt ˌɑːrˈtiː/", collocations: ["hard real-time kernel", "deterministic scheduling", "sub-millisecond jitter"] }
    ],
    questions: [
      { q: "What fundamental problem does ROS 2 solve by using DDS instead of ROS 1's Master node?", options: ["It makes robots cheaper", "It eliminates the single-point-of-failure with decentralized discovery", "It removes the need for sensors", "It converts Python to C++"], answer: 1 },
      { q: "In ROS 2, what is the difference between a Topic and a Service?", options: ["Topics are faster", "Topics are asynchronous pub-sub; Services are synchronous request-response", "Services are free; Topics cost money", "There is no difference"], answer: 1 },
      { q: "What does SLAM produce as its primary output?", options: ["A 3D-printed robot part", "A map of the environment and the robot's position within it simultaneously", "A trained neural network", "A PLC ladder diagram"], answer: 1 },
      { q: "Why is a PREEMPT_RT Linux kernel essential for industrial robotics?", options: ["It provides a graphical user interface", "It guarantees deterministic scheduling with sub-50μs latencies for real-time control loops", "It enables internet browsing", "It compiles code faster"], answer: 1 }
    ]
  }]
};

// ─── MODULE 5: End-Effectors & Grippers ────────
const robotM5 = {
  id: "robot-m5",
  title: "End-Effectors, Grippers & Sensor-Guided Manipulation",
  titleES: "Efectores Finales, Grippers y Manipulación Guiada por Sensores",
  icon: "fa-solid fa-hand",
  readings: [{
    id: "robot-m5-r1",
    title: "Gripper Technologies, Force-Torque Sensing & Vision-Guided Robotic Manipulation",
    duration: "11 min",
    content: `
> **Industry Alignment**: Aligned with **ISO 9283 (Robot Performance Criteria)**, **ISO 14539 (Grasping Grippers)**, and **Schunk / OnRobot / Robotiq** industrial gripper certification programs.

# Gripper Technologies, Force-Torque Sensing & Vision-Guided Manipulation

The **end-effector** is the tool mounted at the terminal link of a robotic arm—the interface between the robot and the workpiece. The choice of end-effector determines what a robot can do: weld, paint, pick, place, screw, sand, or inspect. In nearshoring manufacturing, where product mix changes frequently, **flexible gripper systems** with sensor-guided intelligence are essential.

## 1. Gripper Taxonomies

- **Mechanical Grippers (Parallel Jaw)**: Two or three fingers actuated by pneumatic cylinders or electric servomotors. Jaw stroke, grip force (5–500 N), and finger geometry are application-specific. Widely used for prismatic parts (boxes, CNC blanks, machined housings).
- **Vacuum Grippers (Suction Cups)**: Generate negative pressure via Venturi ejectors or electric vacuum pumps. Ideal for flat, smooth, non-porous surfaces (sheet metal, glass panels, cardboard packaging). Multi-zone vacuum grippers handle irregular shapes by selectively activating cup arrays.
- **Magnetic Grippers**: Electromagnets or switchable permanent magnets grip ferromagnetic workpieces (steel plates, automotive body stampings). Switching off the magnet enables instant release without residual magnetism contaminating sensitive assembly areas.
- **Soft Grippers**: Flexible elastomeric fingers or inflatable bladders conform around irregular, fragile, or organic objects (fruits, bread rolls, electronics assemblies). Actuated by compressed air (pneumatic soft actuators) or cable-driven tendons.
- **Adaptive / Multi-Modal Grippers**: Combine two or more technologies (e.g., parallel fingers with suction cups on the fingertips) to handle diverse part geometries without tool changes.

## 2. Force-Torque Sensors (F/T Sensors)

Mounted between the robot's wrist flange and the end-effector, a **6-axis Force-Torque sensor** measures all three force components (Fx, Fy, Fz) and three torque components (Tx, Ty, Tz):

- **Force-Controlled Assembly**: Enables compliant insertion tasks (peg-in-hole, snap-fit, connector mating) where the robot adjusts its trajectory in real time based on contact forces, preventing part damage and compensating for positional uncertainty.
- **Polishing & Deburring**: The F/T sensor maintains constant contact force against curved surfaces, ensuring uniform material removal regardless of surface geometry variations.
- **Quality Verification**: Post-assembly force measurements confirm that fasteners are seated, clips are engaged, and seals are compressed within specification.

Typical specifications: 6-DOF measurement, ±200 N force range, ±5 Nm torque range, 10,000 Hz sampling rate, IP67 protection for industrial environments.

## 3. Vision-Guided Robotics (VGR)

**2D/3D Vision Systems** transform robots from blind, position-programmed machines into adaptive, intelligent agents:

- **2D Machine Vision**: Industrial cameras with pattern-matching algorithms locate parts on conveyors, measure orientation angles, and guide the robot to pick from non-fixed positions. Calibrated in the robot's coordinate frame via hand-eye calibration.
- **3D Structured Light / Stereo Vision**: Projects structured light patterns or uses stereo camera pairs to generate point clouds. Enables **bin picking**—the ability to reach into a random pile of parts, identify individual items, compute grasp poses, and extract them collision-free.
- **Eye-in-Hand vs. Eye-to-Hand**: Camera mounted on the robot wrist (eye-in-hand) provides the highest accuracy for close-range tasks; camera fixed above the workspace (eye-to-hand) provides a global overview for part localization.

## 4. Tool Changer Systems

**Automatic Tool Changers (ATCs)** enable a single robot to perform multiple tasks by swapping end-effectors in seconds:

- **Pneumatic Locking Mechanism**: The robot-side master plate locks onto the tool-side slave plate using pneumatic pistons engaging precision balls into V-grooves. Repeatability: ±0.005 mm.
- **Pass-Through Utilities**: The ATC interface transmits pneumatic pressure, electrical signals (24V digital I/O, analog signals), Ethernet communication, and even coolant/welding gas through the coupling, eliminating external cable routing.

---
> **Key Takeaway**: Industrial end-effectors span **mechanical, vacuum, magnetic, and soft grippers**, augmented by **6-axis F/T sensors** for force-controlled assembly and **3D vision systems** for adaptive bin picking. **Automatic tool changers** enable a single robot to perform multiple operations, maximizing cell flexibility in high-mix nearshoring production.
`,
    vocabulary: [
      { en: "End-Effector", es: "Efector Final (End-Effector)", definition: "The tool mounted at the terminal link of a robotic arm that directly interacts with the workpiece or environment.", ipa: "/ɛnd ɪˈfɛk.tər/", collocations: ["end-effector payload", "swap end-effector", "custom gripper design"] },
      { en: "Force-Torque Sensor (F/T Sensor)", es: "Sensor de Fuerza-Torque (F/T)", definition: "6-axis sensor measuring three force and three torque components, enabling compliant force-controlled robotic operations.", ipa: "/fɔːrs tɔːrk ˈsɛn.sər/", collocations: ["6-DOF F/T sensor", "force-controlled insertion", "contact force measurement"] },
      { en: "Bin Picking", es: "Recogida de Contenedor (Bin Picking)", definition: "Robotic capability to identify and extract individual parts from a randomly arranged pile using 3D vision and grasp planning.", ipa: "/bɪn ˈpɪk.ɪŋ/", collocations: ["3D bin picking", "random bin picking", "grasp pose estimation"] },
      { en: "Vacuum Gripper", es: "Gripper de Vacío (Ventosa)", definition: "End-effector using negative air pressure through suction cups to grip flat, smooth, non-porous workpieces.", ipa: "/ˈvæk.juːm ˈɡrɪp.ər/", collocations: ["Venturi vacuum generator", "multi-zone suction", "vacuum seal check"] },
      { en: "Automatic Tool Changer (ATC)", es: "Cambiador Automático de Herramienta (ATC)", definition: "Mechanism enabling a robot to swap end-effectors automatically using pneumatic locking master/slave plates.", ipa: "/ˌɔː.tə.ˈmæt.ɪk tuːl/", collocations: ["ATC master plate", "tool change cycle", "pass-through utilities"] },
      { en: "Hand-Eye Calibration", es: "Calibración Mano-Ojo", definition: "Process of establishing the geometric transformation between a camera's coordinate frame and the robot's tool frame.", ipa: "/hænd aɪ ˌkæl.ɪˈbreɪ.ʃən/", collocations: ["eye-in-hand calibration", "camera-to-robot transform", "calibration target board"] }
    ],
    questions: [
      { q: "Which gripper type is best suited for picking flat, smooth sheet metal parts?", options: ["Mechanical parallel jaw gripper", "Vacuum gripper with suction cups", "Soft elastomeric gripper", "Magnetic gripper with electromagnets"], answer: 1 },
      { q: "What does a 6-axis Force-Torque sensor enable in robotic assembly?", options: ["Wireless communication", "Compliant force-controlled insertion that adapts trajectory based on contact forces", "3D printing of parts", "PLC scan cycle timing"], answer: 1 },
      { q: "What is 'bin picking' in industrial robotics?", options: ["Selecting bins for storage", "Using 3D vision to identify and extract individual parts from a random pile", "Programming a PLC in ladder logic", "Cleaning the robot's workspace"], answer: 1 },
      { q: "What is the purpose of hand-eye calibration?", options: ["To calibrate the robot's paint gun", "To establish the geometric transform between the camera and robot tool frames", "To focus the operator's safety glasses", "To adjust the PLC scan cycle time"], answer: 1 }
    ]
  }]
};

// ─── APPLY ─────────────────────────────────────
const course = LXP_COURSES["robotics-automation"];
if (!course) { console.error("robotics-automation not found!"); process.exit(1); }

const newMods = [robotM2, robotM3, robotM4, robotM5];
for (const mod of newMods) {
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
console.log(`\n✅ Robotics & Automation expanded. File: ${(fs.statSync(coursesPath).size/1024).toFixed(1)} KB`);
