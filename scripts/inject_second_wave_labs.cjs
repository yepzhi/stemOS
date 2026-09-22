const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '..', 'content/courses.js');
let content = fs.readFileSync(coursesPath, 'utf8');

const ctx = { window: {}, module: { exports: {} } };
vm.runInNewContext(content, ctx);
const courses = ctx.LXP_COURSES || ctx.module.exports;

// 1. Electromobility: ev-m3-r2
const evTrack = courses['electromobility'];
const evM3 = evTrack.modules.find(m => m.id === 'ev-m3');
if (evM3 && !evM3.readings.some(r => r.id === 'ev-m3-r2')) {
  evM3.readings.push({
    id: 'ev-m3-r2',
    title: 'Applied Lab: Permanent Magnet Synchronous Motors (PMSM), Field-Oriented Control (FOC) & SVPWM',
    duration: '15 min',
    content: `
> **Automotive Powertrain Standard**: Aligned with **ISO 26262 (Road Vehicles - Functional Safety ASIL D)** and **SAE J2907 (Power Rating of Electric Propulsion Motors)**. Equips electric drive and calibration engineers with the principles of vector control, Park/Clarke transformations, and space-vector pulse-width modulation (SVPWM).

# Applied Laboratory: Permanent Magnet Synchronous Motors (PMSM), Field-Oriented Control (FOC) & SVPWM

Modern electric vehicle powertrains rely on Interior Permanent Magnet Synchronous Motors (IPMSMs) due to their high torque density, wide constant-power speed range, and superior efficiency (>96%). To achieve decoupled control of electromagnetic torque and rotor flux, traction inverters execute high-frequency **Field-Oriented Control (FOC)** algorithms.

## 1. Clarke and Park Vector Transformations
Three-phase alternating currents ($i_a, i_b, i_c$) oscillate in a stationary 120° spatial reference frame, making proportional-integral (PI) current regulation complex:
1. **Clarke Transformation ($abc \\to \\alpha\\beta$)**: Projects the three stationary phase axes onto an orthogonal two-axis stationary reference plane ($\\alpha$ and $\\beta$).
2. **Park Transformation ($\\alpha\\beta \\to dq$)**: Rotates the orthogonal reference frame synchronously with the rotor magnetic flux vector using the rotor angle ($\\theta_e$) captured by an absolute optical encoder or resolver.
   - **Direct Axis ($d$-axis)**: Aligned with the rotor permanent magnet flux. Controlling $i_d$ controls field excitation (or field-weakening).
   - **Quadrature Axis ($q$-axis)**: Perpendicular to rotor flux. The torque produced is directly proportional to $i_q$:
     $$T_e = \\frac{3}{2} p \\left[ \\lambda_{pm} i_q + (L_d - L_q) i_d i_q \\right]$$
     Where $p$ is the number of pole pairs, $\\lambda_{pm}$ is the permanent magnet flux linkage, and $(L_d - L_q) i_d i_q$ represents reluctance torque resulting from rotor magnetic saliency.

## 2. Space Vector Pulse-Width Modulation (SVPWM)
Rather than comparing sinusoidal reference signals to a triangular carrier wave independently for each phase, digital signal processors (DSPs) utilize **Space Vector PWM**:
- **Hexagonal Voltage Vectors**: Six active switching states ($V_1$ to $V_6$) and two zero vectors ($V_0, V_7$) form a voltage hexagon on the complex plane.
- **DC-Bus Voltage Utilization**: SVPWM yields approximately 15.5% higher fundamental output voltage compared to sinusoidal PWM without overmodulation, significantly extending EV top speed before battery voltage saturation.

## 3. Field-Weakening & Reluctance Torque Maximization (MTPA)
1. **Maximum Torque Per Ampere (MTPA)**: At base speeds, the motor controller optimizes the angle between $i_d$ and $i_q$ to harvest both magnetic torque and reluctance torque simultaneously, minimizing stator $I^2R$ copper losses.
2. **Field-Weakening Region**: Above base speed, back-electromotive force (Back-EMF) approaches the DC battery pack voltage ($V_{dc}$). The controller injects negative direct-axis current ($-i_d$) to demagnetize the air gap flux, allowing the vehicle to cruise at high highway speeds without exceeding inverter breakdown voltage limits.

---
> **Key Takeaway**: Mastering electric drive engineering requires commanding **Clarke/Park mathematical transformations, Space Vector PWM switching kinetics, and Field-Weakening algorithms** to maximize EV range and dynamic acceleration safely.
`,
    vocabulary: [
      {
        en: 'Field-Oriented Control (FOC)',
        es: 'Control Orientado al Campo (FOC)',
        definition: 'Variable frequency drive control method where three-phase stator currents of an electric motor are transformed into decoupled flux and torque vectors.',
        ipa: '/fiːld ˈɔːriɛntɪd kənˈtroʊl/',
        collocations: ['execute FOC current loop', 'decouple d-q axis currents', 'sensorless FOC algorithm']
      },
      {
        en: 'Space Vector PWM (SVPWM)',
        es: 'Modulación por Ancho de Pulso de Vector Espacial (SVPWM)',
        definition: 'Digital modulation algorithm for controlling inverter power switches that maximizes DC-bus voltage utilization and reduces harmonic distortion.',
        ipa: '/speɪs ˈvɛktər ˌpiː.dʌbəl.juːˈɛm/',
        collocations: ['SVPWM switching sector', 'synthesize reference voltage vector', 'inverter harmonic distortion']
      },
      {
        en: 'Field-Weakening',
        es: 'Debilitamiento de Campo',
        definition: 'Control strategy of injecting negative d-axis demagnetizing current to counteract rotor magnet flux, enabling motor operation above base speed.',
        ipa: '/fiːld ˈwiːkənɪŋ/',
        collocations: ['field-weakening speed range', 'counteract back-EMF voltage', 'negative d-axis current injection']
      },
      {
        en: 'Reluctance Torque',
        es: 'Par de Reluctancia',
        definition: 'Torque generated by the magnetic alignment of rotor saliency pathways (Lq > Ld) minimizing magnetic circuit reluctance.',
        ipa: '/rɪˈlʌktəns tɔːrk/',
        collocations: ['maximize reluctance torque', 'magnetic saliency ratio', 'interior permanent magnet motor']
      }
    ],
    questions: [
      {
        q: 'What is the primary mathematical purpose of the Park transformation in Field-Oriented Control (FOC)?',
        options: [
          'To convert three-phase AC currents into a rotating DC-like two-coordinate frame (d-axis and q-axis) where torque and flux can be controlled independently using standard PI controllers',
          'To calculate the weight of the electric vehicle battery pack',
          'To translate user manual documents from German to English',
          'To increase the volume of the sound synthesizer'
        ],
        answer: 0,
        explanation: 'By rotating the coordinate system synchronously with the rotor magnetic flux, sinusoidal AC quantities appear as invariant DC values to the controller, enabling linear PI regulators to govern torque (via iq) and flux (via id) without steady-state tracking phase lag.'
      },
      {
        q: 'How does Space Vector PWM (SVPWM) outperform traditional Sinusoidal PWM (SPWM) in EV traction inverters?',
        options: [
          'SVPWM eliminates the need for electric motors entirely',
          'SVPWM achieves approximately 15.5% higher DC-bus voltage utilization and lower total harmonic distortion (THD), allowing motors to achieve higher speeds from the same battery voltage',
          'SVPWM allows vehicles to fly over traffic',
          'SVPWM runs without semiconductor switches'
        ],
        answer: 1,
        explanation: 'By treating the inverter as a unified switching system and synthesizing reference voltage vectors between adjacent active states, SVPWM extends the linear modulation index up to 2/sqrt(3) (~1.155), yielding 15.5% higher line-to-line output voltage before clipping.'
      },
      {
        q: 'Why must an EV traction controller inject negative d-axis current (-id) during high-speed highway cruising?',
        options: [
          'To intentionally stall the rotor to save power',
          'To weaken the net magnetic flux in the air gap and prevent the motor back-EMF from exceeding the battery DC-bus voltage limit',
          'To warm up the passenger cabin using stator heat',
          'To recharge 12V auxiliary lead-acid batteries'
        ],
        answer: 1,
        explanation: 'As rotor angular velocity increases, generated back-EMF voltage rises proportionally. When back-EMF matches the available DC battery bus voltage, no further accelerating current can be forced into the windings unless negative id flux weakens the air-gap field.'
      },
      {
        q: 'What structural feature allows Interior Permanent Magnet Synchronous Motors (IPMSM) to generate reluctance torque in addition to magnet torque?',
        options: [
          'Having square wheels on the dynamometer',
          'Magnetic saliency resulting from embedding magnets inside the rotor core, making the q-axis inductance (Lq) significantly higher than the d-axis inductance (Ld)',
          'Painting the motor casing with reflective thermal paint',
          'Using wooden rotor laminations'
        ],
        answer: 1,
        explanation: 'Because permanent magnets have a magnetic permeability close to air, embedding them in rotor iron creates a non-uniform reluctance path where the q-axis presents a much higher inductance than the d-axis (Lq > Ld), generating powerful reluctance torque along with permanent magnet torque.'
      }
    ]
  });
  console.log('[UPDATED] Injected ev-m3-r2');
}

// 2. Robotics: robot-m1-r2
const robotTrack = courses['robotics-automation'];
const robotM1 = robotTrack.modules.find(m => m.id === 'robot-m1');
if (robotM1 && !robotM1.readings.some(r => r.id === 'robot-m1-r2')) {
  robotM1.readings.push({
    id: 'robot-m1-r2',
    title: 'Applied Lab: 6-DOF Industrial Robot Kinematics, Denavit-Hartenberg (D-H) & Singularity Avoidance',
    duration: '15 min',
    content: `
> **Industrial Robotics Standard**: Aligned with **ISO 10218-1/2 (Robots and Robotic Devices - Safety Requirements)** and **ANSI/RIA R15.06**. Prepares automation and controls engineers to compute coordinate transformations, solve inverse kinematic singularities, and enforce real-time trajectory limits.

# Applied Laboratory: 6-DOF Industrial Robot Kinematics, Denavit-Hartenberg (D-H) & Singularity Avoidance

Articulated 6-axis serial manipulators form the backbone of automated welding, material dispensing, and precision aerospace assembly. Transforming motor joint angles ($\\theta_1, \\dots, \\theta_6$) into spatial Cartesian coordinates of the end-effector tool center point (TCP) requires rigorous forward and inverse kinematic formulation.

## 1. Denavit-Hartenberg (D-H) Parameter Convention
The standard D-H convention attaches orthonormal reference frames ($\\{x_i, y_i, z_i\\}$) to each link along joint axes, parameterized by four geometric quantities:
1. **Link Length ($a_i$)**: Distance along the $x_i$ axis from $z_{i-1}$ to $z_i$.
2. **Link Twist ($\\alpha_i$)**: Angle of rotation about the $x_i$ axis from $z_{i-1}$ to $z_i$.
3. **Link Offset ($d_i$)**: Distance along the $z_{i-1}$ axis from $x_{i-1}$ to $x_i$ (variable in prismatic joints).
4. **Joint Angle ($\\theta_i$)**: Angle of rotation about the $z_{i-1}$ axis from $x_{i-1}$ to $x_i$ (variable in revolute joints).
The homogenous transformation matrix between consecutive link frames is formulated as:
$$^{i-1}T_i = \\begin{bmatrix}
\\cos\\theta_i & -\\sin\\theta_i\\cos\\alpha_i & \\sin\\theta_i\\sin\\alpha_i & a_i\\cos\\theta_i \\\\
\\sin\\theta_i & \\cos\\theta_i\\cos\\alpha_i & -\\cos\\theta_i\\sin\\alpha_i & a_i\\sin\\theta_i \\\\
0 & \\sin\\alpha_i & \\cos\\alpha_i & d_i \\\\
0 & 0 & 0 & 1
\\end{bmatrix}$$

## 2. Inverse Kinematics & The Manipulator Jacobian
While forward kinematics yields a unique tool pose for any set of joint angles ($x = f(\\theta)$), the **inverse kinematics** problem ($q = f^{-1}(x)$) is non-linear and typically presents up to 8 distinct geometric branch configurations (wrist-up vs. wrist-down, elbow-up vs. elbow-down, shoulder-left vs. shoulder-right).
- **Geometric Jacobian Matrix ($J$)**: Relates joint angular velocities ($\\dot{q}$) to Cartesian end-effector linear and angular velocities ($\\dot{x}$):
  $$\\dot{x} = J(q) \\dot{q}$$

## 3. Kinematic Singularities & Damped Least Squares (DLS)
A singularity occurs when the Jacobian matrix loses full rank ($\\det(J) = 0$), causing the robot to lose one or more degrees of freedom in Cartesian space:
1. **Wrist Singularity**: Occurs when Joint 4 and Joint 6 axes become collinear (Joint 5 angle $\\theta_5 = 0$). An infinitesimal rotation of the TCP can demand infinite joint velocity from axes 4 and 6, triggering overcurrent drive faults.
2. **Shoulder & Elbow Singularities**: Occur when the arm reaches maximum outward extension, causing the boundary of the reachable workspace.
3. **Damped Least Squares (Levenberg-Marquardt)**: When approaching singular postures, motion controllers replace the pure inverse Jacobian ($J^{-1}$) with a damped pseudo-inverse:
   $$J^* = J^T (J J^T + \\lambda^2 I)^{-1}$$
   Where $\\lambda$ is a damping scalar that trades tiny trajectory tracking errors for bounded, smooth joint motor velocities.

---
> **Key Takeaway**: Industrial robotic programming bridges **homogeneous matrix transformations (D-H parameters), velocity Jacobians, and singularity mitigation algorithms** to ensure smooth, safe autonomous operation on production lines.
`,
    vocabulary: [
      {
        en: 'Denavit-Hartenberg (D-H) Parameters',
        es: 'Parámetros de Denavit-Hartenberg (D-H)',
        definition: 'Standard four-parameter geometric convention used in robotics for attaching coordinate frames to the links of an articulated kinematic chain.',
        ipa: '/dɛnəˈviːt ˈhɑːrtənbɜːrɡ/',
        collocations: ['construct D-H parameter table', 'homogeneous transformation matrix', 'link twist angle']
      },
      {
        en: 'Kinematic Singularity',
        es: 'Singularidad Cinemática',
        definition: 'A manipulator configuration where the Jacobian matrix loses rank, preventing motion in one or more Cartesian directions and causing infinite theoretical joint velocities.',
        ipa: '/ˌkɪn.əˈmæt.ɪk ˌsɪŋ.ɡjəˈlær.ə.ti/',
        collocations: ['wrist singularity posture', 'Jacobian determinant approaches zero', 'singularity avoidance trajectory']
      },
      {
        en: 'Tool Center Point (TCP)',
        es: 'Punto Central de Herramienta (TCP)',
        definition: 'The specific focal point at the origin of the end-effector coordinate system around which Cartesian tool motions and orientations are calculated.',
        ipa: '/tuːl ˈsɛn.tər pɔɪnt/',
        collocations: ['calibrate 6-axis TCP', 'maintain constant TCP speed', 'TCP displacement vector']
      },
      {
        en: 'Manipulator Jacobian',
        es: 'Jacobiano del Manipulador',
        definition: 'Matrix of partial derivatives mapping joint space velocities to end-effector Cartesian linear and angular velocities.',
        ipa: '/məˈnɪp.jə.leɪ.tər dʒəˈkoʊ.bi.ən/',
        collocations: ['compute geometric Jacobian', 'Jacobian pseudo-inverse', 'singular value decomposition of Jacobian']
      }
    ],
    questions: [
      {
        q: 'What catastrophic physical behavior can occur if an industrial robot is commanded to pass directly through a wrist singularity without damping?',
        options: [
          'The robot motor joints 4 and 6 will attempt to rotate at theoretically infinite speeds to maintain the commanded trajectory, triggering motor over-velocity drive trips',
          'The end-effector tool will catch on fire immediately',
          'The robot will permanently erase its operating system',
          'The robot will grow taller'
        ],
        answer: 0,
        explanation: 'At a wrist singularity (axis 5 at 0 degrees), axes 4 and 6 become collinear and redundant. Attempting a linear Cartesian trajectory through this point inverts a singular matrix, yielding mathematically infinite joint velocities that trip motor drives on overcurrent or tracking errors.'
      },
      {
        q: 'What are the four geometric parameters defined in the standard Denavit-Hartenberg (D-H) kinematic convention?',
        options: [
          'Voltage, current, resistance, and capacitance',
          'Link length (a), link twist (alpha), link offset (d), and joint angle (theta)',
          'Red, green, blue, and alpha channel',
          'Mass, friction, torque, and inertia'
        ],
        answer: 1,
        explanation: 'The classic D-H convention describes the spatial relationship between adjacent joint frames using exactly four geometric quantities: link length along x, link twist about x, link offset along z, and joint angle about z.'
      },
      {
        q: 'How does Damped Least Squares (DLS) allow a robot controller to navigate near kinematic singularities without stalling?',
        options: [
          'It replaces the robot arm with a human worker',
          'It adds a damping regularization factor (lambda^2 * I) into the matrix inversion, sacrificing a minor amount of Cartesian path precision to keep joint velocities smoothly bounded',
          'It cuts electrical power to all brakes',
          'It disables all emergency stop buttons'
        ],
        answer: 1,
        explanation: 'DLS (also known as the Levenberg-Marquardt formulation) penalizes excessive joint velocities by introducing a damping term into the pseudo-inverse calculation, preventing divisor numbers near zero while maintaining controlled motion.'
      },
      {
        q: 'How many distinct mathematical kinematic configurations (e.g., wrist-up, elbow-down) can typically satisfy a single 6-DOF Cartesian TCP pose?',
        options: [
          'Exactly 1 configuration always',
          'Up to 8 distinct geometric branch configurations',
          'Infinity, because robots have no physical joints',
          'Zero, robots cannot calculate poses'
        ],
        answer: 1,
        explanation: 'For a standard spherical-wrist 6-DOF industrial robot, analytical inverse kinematics yields up to 8 valid mathematical configurations corresponding to combinations of shoulder (left/right), elbow (up/down), and wrist (flip/non-flip).'
      }
    ]
  });
  console.log('[UPDATED] Injected robot-m1-r2');
}

// 3. Energy Renewables: energy-m1-r2
const energyTrack = courses['energy-renewables'];
const energyM1 = energyTrack.modules.find(m => m.id === 'energy-m1');
if (energyM1 && !energyM1.readings.some(r => r.id === 'energy-m1-r2')) {
  energyM1.readings.push({
    id: 'energy-m1-r2',
    title: 'Applied Lab: Utility-Scale Solar PV Inverters, MPPT Algorithms & IEEE 1547-2018 Grid Interconnection',
    duration: '15 min',
    content: `
> **Renewable Energy Grid Standard**: Aligned with **IEEE 1547-2018 (Standard for Interconnection and Interoperability of Distributed Energy Resources with Associated Electric Power Systems Interfaces)** and **UL 1741 SB (Smart Inverters)**. Equips power systems engineers to configure dynamic volt-VAR regulation, frequency-watt droop response, and anti-islanding protection.

# Applied Laboratory: Utility-Scale Solar PV Inverters, MPPT Algorithms & IEEE 1547-2018 Grid Interconnection

Integrating gigawatt-scale solar photovoltaic (PV) generation into electrical distribution grids requires advanced power electronics. Modern utility-scale central and string inverters do not merely convert DC power to AC; they function as grid-forming assets providing active voltage and frequency stabilization.

## 1. Maximum Power Point Tracking (MPPT) Dynamics
Photovoltaic arrays exhibit non-linear current-voltage ($I-V$) and power-voltage ($P-V$) characteristics dictated by solar irradiance and semiconductor cell junction temperature:
1. **Perturb and Observe (P&O)**: The inverter microcontroller periodically introduces a small voltage increment ($\\Delta V$) and measures change in output power ($\\Delta P$). If $\\Delta P > 0$, the perturbation continues in the same direction; if $\\Delta P < 0$, the search direction reverses. Under rapid cloud passage, P&O can oscillate away from the true Maximum Power Point (MPP).
2. **Incremental Conductance (IncCond)**: Evaluates the derivative of power with respect to voltage:
   $$\\frac{dP}{dV} = \\frac{d(VI)}{dV} = I + V \\frac{dI}{dV} = 0 \\implies -\\frac{I}{V} = \\frac{dI}{dV}$$
   When instantaneous conductance equals negative incremental conductance, the system is operating at the exact MPP, eliminating steady-state hunting losses.

## 2. IEEE 1547-2018 Grid-Support Capabilities
Unlike legacy inverters that were required to disconnect instantly upon any grid fluctuation, smart inverters must exhibit **Fault Ride-Through (FRT)**:
- **Low-Voltage Ride-Through (LVRT)**: During transmission line faults where grid voltage sags to 0.5 p.u. (per-unit), inverters must remain connected for up to several seconds while injecting reactive current to support grid voltage recovery.
- **Volt-VAR Control**: Inverters absorb or inject reactive power ($Q$) as a programmed function of local grid terminal voltage ($V$), preventing overvoltage conditions on rural distribution feeders during peak mid-day generation.
- **Frequency-Watt Droop ($P(f)$)**: If grid frequency rises above nominal (e.g. $> 60.036\\,\\text{Hz}$), the inverter autonomously curtails active power output ($P$) proportionally to arrest grid frequency escalation.

## 3. Anti-Islanding Protection & Loss-of-Mains Detection
If a distribution circuit breaker opens, an unintentional island could form where the PV inverter continues powering local customer loads, posing fatal electrocution hazards to utility line crews:
1. **Passive Detection**: Continuous monitoring of Rate of Change of Frequency (ROCOF - $df/dt$) and Vector Shift (voltage angle jumps).
2. **Active Frequency Drift (AFD)**: The inverter continuously injects subtle current phase disturbances. Connected to a stiff grid, the frequency remains clamped at 60Hz. If utility connection is severed, the positive feedback loop rapidly drives frequency outside allowable trip windows within 2.0 seconds per UL 1741.

---
> **Key Takeaway**: Modern clean energy engineering demands commanding **Incremental Conductance MPPT algorithms, IEEE 1547-2018 Volt-VAR grid stabilization curves, and active anti-islanding safety protocols**.
`,
    vocabulary: [
      {
        en: 'Maximum Power Point Tracking (MPPT)',
        es: 'Seguimiento del Punto de Máxima Potencia (MPPT)',
        definition: 'Electronic algorithm used in solar inverters to continuously adjust electrical operating points so PV modules deliver peak achievable power.',
        ipa: '/ˈmæksɪməm ˈpaʊər pɔɪnt ˈtrækɪŋ/',
        collocations: ['incremental conductance MPPT', 'MPPT tracking efficiency', 'multi-channel MPPT string inverter']
      },
      {
        en: 'Low-Voltage Ride-Through (LVRT)',
        es: 'Soporte de Falla por Bajo Voltaje (LVRT)',
        definition: 'Capability of an electric power generator to stay connected to the electrical network through short periods of low grid voltage without tripping.',
        ipa: '/loʊ ˈvoʊltɪdʒ raɪd θruː/',
        collocations: ['satisfy LVRT ride-through curve', 'reactive current injection during sag', 'dynamic grid fault ride-through']
      },
      {
        en: 'Volt-VAR Control',
        es: 'Control Volt-VAR',
        definition: 'Autonomous grid-support function where the inverter modulates its reactive power output in response to measured terminal voltage changes.',
        ipa: '/voʊlt vɑːr kənˈtroʊl/',
        collocations: ['volt-VAR curve calibration', 'absorb inductive VARs', 'mitigate feeder overvoltage']
      },
      {
        en: 'Anti-Islanding Protection',
        es: 'Protección Anti-Isla',
        definition: 'Mandatory safety mechanism that forces a distributed generator to disconnect within milliseconds if the utility grid loses power.',
        ipa: '/ˌæntaɪ ˈaɪləndɪŋ prəˈtɛkʃən/',
        collocations: ['detect unintentional islanding', 'UL 1741 trip threshold', 'active frequency drift perturbation']
      }
    ],
    questions: [
      {
        q: 'Why does the Incremental Conductance MPPT algorithm outperform classic Perturb and Observe (P&O) during variable cloud cover?',
        options: [
          'Because Incremental Conductance uses solar panels made from gold',
          'Because Incremental Conductance calculates the exact zero slope (dP/dV = 0) from instantaneous and incremental conductance derivatives, avoiding oscillations and errors caused by rapid irradiance spikes',
          'Because Incremental Conductance eliminates the need for solar panels to face the sun',
          'Because it consumes zero electricity'
        ],
        answer: 1,
        explanation: 'Under rapidly shifting cloud cover, a sudden jump in irradiance can mislead P&O into believing power increased due to voltage adjustment, leading it in the wrong direction. Incremental Conductance tracks the fundamental derivative relationship dI/dV = -I/V, pinpointing the peak unambiguously.'
      },
      {
        q: 'Under modern IEEE 1547-2018 standards, what must a smart solar inverter do when grid voltage dips significantly during an electrical line fault?',
        options: [
          'Disconnect from the grid in less than 5 milliseconds',
          'Execute Low-Voltage Ride-Through (LVRT) by remaining connected and actively injecting reactive power to help support and restore transmission grid voltage',
          'Switch over to diesel fuel automatically',
          'Reverse the spin of customer electric fans'
        ],
        answer: 1,
        explanation: 'Legacy inverters used to trip immediately, turning minor local sags into catastrophic cascaded blackouts. IEEE 1547-2018 requires inverters to "ride through" transient voltage dips while injecting reactive VARs to aid voltage recovery.'
      },
      {
        q: 'Why is unintentional islanding considered an urgent, critical safety hazard in power distribution networks?',
        options: [
          'It makes utility meters run backwards too quickly',
          'An isolated energized section of the grid poses lethal electrocution risks to utility line maintenance crews who assume lines are de-energized, and can cause out-of-phase reclosing equipment damage',
          'It increases the ambient air temperature in the town',
          'It drains water from hydroelectric dams'
        ],
        answer: 1,
        explanation: 'Unintentional islanding occurs when a distributed generator continues powering a severed feeder. Utility crews repairing "dead" power poles could suffer fatal shock, and when utility reclosers automatically fire back on out-of-phase, generator shafts can shear.'
      },
      {
        q: 'What is the function of Volt-VAR curves in mitigating midday overvoltage on rural solar feeders?',
        options: [
          'They shut down all residential air conditioners',
          'When high solar generation pushes local voltage toward upper limits, the inverter absorbs inductive reactive power (VARs) to depress line voltage back into safe regulatory limits',
          'They convert AC electricity into high-pressure water',
          'They double the cost of electricity during sunny hours'
        ],
        answer: 1,
        explanation: 'High reverse active power flow on distribution lines with high impedance causes voltage rise (delta V ~= (P*R + Q*X) / V). By absorbing reactive power (negative Q), inverters counteract the resistive voltage rise, stabilizing line voltage without curtailing active power.'
      }
    ]
  });
  console.log('[UPDATED] Injected energy-m1-r2');
}

// 4. Telecom & IoT: telecom-m1-r2
const telecomTrack = courses['telecom-iot'];
const telecomM1 = telecomTrack.modules.find(m => m.id === 'telecom-m1');
if (telecomM1 && !telecomM1.readings.some(r => r.id === 'telecom-m1-r2')) {
  telecomM1.readings.push({
    id: 'telecom-m1-r2',
    title: 'Applied Lab: Time-Sensitive Networking (TSN IEEE 802.1Qbv), MQTT Telemetry & Industrial 5G',
    duration: '15 min',
    content: `
> **Industrial Communications Standard**: Aligned with **IEEE 802.1 TSN (Time-Sensitive Networking Standards)**, **IEC 61158 (Industrial Communication Networks)**, and **3GPP Release 16/17 (5G System for Industrial Automation)**. Prepares IoT and automation engineers to design deterministic Ethernet fabrics and low-latency publish-subscribe telemetry pipelines.

# Applied Laboratory: Time-Sensitive Networking (TSN IEEE 802.1Qbv), MQTT Telemetry & Industrial 5G

Traditional standard Ethernet (IEEE 802.3) operates on a "best-effort" carrier-sense multiple access with collision detection (CSMA/CD) architecture, introducing non-deterministic jitter that is unacceptable for high-speed robotic servo loops. **Time-Sensitive Networking (TSN)** extends standard Ethernet to guarantee bounded microsecond latency and zero packet loss for safety-critical industrial automation.

## 1. IEEE 802.1Qbv Time-Aware Shaper (TAS)
The foundation of deterministic Ethernet transmission is the **Time-Aware Shaper**:
1. **Time Synchronization (IEEE 802.1AS)**: Establishes a generalized Precision Time Protocol (gPTP) across all network bridges, synchronizing internal clocks with sub-microsecond precision.
2. **Scheduled Transmission Gates**: IEEE 802.1Qbv organizes switch egress queues into 8 priority traffic classes. A cyclic schedule opens and closes transmission gates:
   - **Protected Window**: High-priority scheduled traffic (such as robotic motion control packets) is allocated an exclusive time slot. All lower-priority queues (corporate IT, web traffic) are gated closed, guaranteeing deterministic traversal through the switch without queuing delays or head-of-line blocking.
   - **Guard Bands & Frame Preemption (IEEE 802.1Qbu)**: If a best-effort packet is partially transmitted when the protected window opens, frame preemption interrupts the non-critical packet and resumes it later, eliminating guard-band latency waste.

## 2. MQTT-SN & Lightweight Telemetry Protocols
For battery-operated sensor nodes across vast factory floors:
- **MQTT (Message Queuing Telemetry Transport)**: Publish/Subscribe architecture centered on a message broker.
  - **QoS Levels**: QoS 0 (At most once), QoS 1 (At least once with ACK), and QoS 2 (Exactly once with a four-step handshake).
- **MQTT-SN (for Sensor Networks)**: Operates over connectionless UDP rather than persistent TCP, replacing string-based topic names with 2-byte integer Topic IDs to drastically compress header overhead and preserve wireless device battery life.

## 3. Industrial Private 5G (URLLC Architecture)
3GPP Release 16 introduced **Ultra-Reliable Low-Latency Communication (URLLC)** tailored for Industry 4.0:
1. **Target SLA**: 99.999% (five-nines) transmission reliability with latency under 1.0 millisecond over the radio interface.
2. **Network Slicing**: Logical network virtualization allows plant operators to carve an isolated URLLC slice for automated guided vehicles (AGVs) while streaming high-bandwidth 4K video feeds over an eMBB slice on the same physical antenna infrastructure.

---
> **Key Takeaway**: Industrial IoT convergence synthesizes **TSN IEEE 802.1Qbv microsecond determinism, MQTT-SN lightweight telemetry serialization, and 5G URLLC network slicing** to power autonomous smart factories.
`,
    vocabulary: [
      {
        en: 'Time-Sensitive Networking (TSN)',
        es: 'Redes Sensibles al Tiempo (TSN)',
        definition: 'Set of IEEE 802 standards that enable deterministic real-time communication over standard Ethernet networks.',
        ipa: '/taɪm ˈsɛnsətɪv ˈnɛt.wɜːrkɪŋ/',
        collocations: ['TSN time-aware shaper', 'IEEE 802.1AS clock synchronization', 'deterministic packet latency']
      },
      {
        en: 'Frame Preemption (IEEE 802.1Qbu)',
        es: 'Preempción de Tramas',
        definition: 'Mechanism allowing an urgent high-priority network frame to interrupt the transmission of a lower-priority frame mid-stream to guarantee instant traversal.',
        ipa: '/freɪm priːˈɛmp.ʃən/',
        collocations: ['enable frame preemption', 'guard band optimization', 'interrupt best-effort traffic']
      },
      {
        en: 'Quality of Service (QoS)',
        es: 'Calidad de Servicio (QoS)',
        definition: 'Measurement of overall transmission performance that defines delivery guarantees, packet loss tolerance, and latency bounds.',
        ipa: '/ˈkwɑːləti əv ˈsɜːrvɪs/',
        collocations: ['MQTT QoS level 2', 'guarantee deterministic QoS', 'prioritize critical traffic queue']
      },
      {
        en: 'Ultra-Reliable Low-Latency Communication (URLLC)',
        es: 'Comunicación Ultraconfiable de Baja Latencia (URLLC)',
        definition: '5G network architecture tier designed to achieve 99.999% reliability with sub-millisecond radio latency for industrial control systems.',
        ipa: '/ˈʌltrə rɪˈlaɪəbəl loʊ ˈleɪtənsi/',
        collocations: ['5G URLLC network slice', 'sub-millisecond radio SLA', 'industrial AGV wireless control']
      }
    ],
    questions: [
      {
        q: 'Why was standard IEEE 802.3 Ethernet historically considered inadequate for closed-loop robotic motion control without TSN extensions?',
        options: [
          'Because standard Ethernet cables are too heavy for robots to carry',
          'Because standard Ethernet relies on best-effort queuing and CSMA/CD principles, introducing variable latency and jitter that can disrupt microsecond motor synchronization',
          'Because Ethernet only works during daylight hours',
          'Because Ethernet requires analog phonograph needles'
        ],
        answer: 1,
        explanation: 'Standard Ethernet was designed for high throughput without guaranteed transit times. If multiple workstations transmit simultaneously, buffers fill, causing non-deterministic delays and packet drops that would destabilize tight robotic servo control loops.'
      },
      {
        q: 'How does the IEEE 802.1Qbv Time-Aware Shaper (TAS) guarantee that critical motion control packets never experience queuing delay?',
        options: [
          'By turning off the switch power supply',
          'By synchronizing all network bridge clocks with gPTP and enforcing strict cyclic schedules where non-critical queues are gated closed during the protected transmission window',
          'By transmitting all packets through wireless radio antennas',
          'By compressing packets with zip software'
        ],
        answer: 1,
        explanation: 'TAS operates like dedicated express lanes with synchronized traffic lights. Non-critical traffic queues are completely gated off just before the scheduled transmission window opens, ensuring the critical packet finds an empty output queue with zero contention.'
      },
      {
        q: 'What makes MQTT-SN advantageous over standard MQTT for battery-powered industrial IoT sensor nodes?',
        options: [
          'It replaces long string topic names with compact 2-byte integer IDs and runs over connectionless UDP, reducing wireless transmission airtime and battery drain',
          'It requires sensors to be plugged into 480V three-phase power',
          'It prints sensor readings onto paper automatically',
          'It encrypts data by writing it backwards'
        ],
        answer: 0,
        explanation: 'Standard MQTT requires long TCP three-way handshakes and verbose text topic names like "factory/building1/line2/vibration/sensor4". MQTT-SN runs over lightweight UDP and maps topics to short 2-byte numbers, drastically reducing packet size and transceiver power draw.'
      },
      {
        q: 'What is the primary target reliability specification for 5G Ultra-Reliable Low-Latency Communication (URLLC) in industrial automation?',
        options: [
          '50% packet delivery within 1 hour',
          '99.999% (five-nines) reliability with under 1.0 millisecond latency over the radio interface',
          '10% reliability with unlimited data storage',
          'Zero percent reliability'
        ],
        answer: 1,
        explanation: 'Under 3GPP standards, URLLC is engineered to achieve 99.999% packet success rates within 1 millisecond radio latency, satisfying the stringent performance requirements needed to cut physical umbilical cables on industrial robots and mobile AGVs.'
      }
    ]
  });
  console.log('[UPDATED] Injected telecom-m1-r2');
}

// 5. Software Dev: software-m1-r2
const softTrack = courses['software-dev'];
const softM1 = softTrack.modules.find(m => m.id === 'software-m1');
if (softM1 && !softM1.readings.some(r => r.id === 'software-m1-r2')) {
  softM1.readings.push({
    id: 'software-m1-r2',
    title: 'Applied Lab: MISRA C:2023 Compliance, Static Analysis & Deterministic Embedded Memory Management',
    duration: '15 min',
    content: `
> **Safety-Critical Software Standard**: Aligned with **MISRA C:2023 (Guidelines for the Use of the C Language in Critical Systems)** and **ISO 26262 Part 6 (Software Level Safety Integrity)**. Equips embedded software engineers to prevent undefined behavior, memory leaks, and stack overflows in mission-critical firmware.

# Applied Laboratory: MISRA C:2023 Compliance, Static Analysis & Deterministic Embedded Memory Management

The C language is the dominant programming language for bare-metal microcontrollers, automotive ECUs, and flight avionics due to its low-level hardware control and minimal runtime overhead. However, native C lacks memory safety, allowing buffer overflows, undefined pointer arithmetic, and type truncation. **MISRA C:2023** establishes mandatory coding constraints to guarantee code reliability, portability, and safety.

## 1. Core Mandates of MISRA C:2023
MISRA classifies guidelines into three compliance categories: *Mandatory* (no deviations permitted), *Required* (formal justification required for deviations), and *Advisory*.
1. **Rule 21.3 (Prohibition of Dynamic Memory Allocation - Mandatory)**:
   - Use of functions from \`<stdlib.h>\` including \`malloc()\`, \`calloc()\`, \`realloc()\`, and \`free()\` is strictly prohibited in production firmware. Dynamic heaps suffer from non-deterministic allocation latency and heap fragmentation, which can cause memory starvation after thousands of hours of continuous field operation.
2. **Rule 11.4 & 11.8 (Pointer Conversions & Const Qualification)**:
   - A conversion should not be performed between a pointer to object type and a different pointer to object type unless the alignment criteria are strictly honored. Casting away \`const\` volatile qualifiers is prohibited.
3. **Rule 10.4 (Strict Type Matching Across Operators)**:
   - Both operands of an arithmetic or logical operator must share the same essential type to prevent implicit sign conversions and integer promotion vulnerabilities.

## 2. Static Code Analysis & Abstract Interpretation
Rather than relying solely on runtime unit testing, engineers integrate automated static analysis tools into CI/CD pipelines:
- **Abstract Interpretation Engines (e.g. Polyspace, Coverity, SonarQube)**: Mathematically prove the absence of runtime errors (division by zero, array out-of-bounds, deadlocks) across all possible input paths without executing the code.
- **Cyclomatic Complexity Limits**: Formally measuring McCabe Cyclomatic Complexity ($V(G) = E - N + 2P$) ensures no function exceeds a threshold of 10-15, ensuring testability and minimizing branch defects.

## 3. Deterministic Memory Architectures: Static Buffers & Ring Buffers
To process high-frequency CAN bus and sensor streams safely:
\`\`\`c
/* MISRA-compliant static circular ring buffer with compile-time bounds */
#define RING_BUFFER_CAPACITY (64U)

typedef struct {
    uint8_t buffer[RING_BUFFER_CAPACITY];
    volatile uint32_t head;
    volatile uint32_t tail;
} CircularBuffer_t;

bool RingBuffer_Push(CircularBuffer_t * const pRing, const uint8_t data) {
    bool success = false;
    if (pRing != NULL) {
        uint32_t next_head = (pRing->head + 1U) % RING_BUFFER_CAPACITY;
        if (next_head != pRing->tail) { /* Check if full */
            pRing->buffer[pRing->head] = data;
            pRing->head = next_head;
            success = true;
        }
    }
    return success;
}
\`\`\`
All storage is allocated in the static BSS data segment at compile time, eliminating heap fragmentation risks completely.

---
> **Key Takeaway**: Safety-critical embedded software engineering demands replacing dynamic memory with **statically verified ring buffers, adhering strictly to MISRA C:2023 guidelines, and validating firmware via formal abstract interpretation**.
`,
    vocabulary: [
      {
        en: 'Dynamic Memory Allocation',
        es: 'Asignación Dinámica de Memoria',
        definition: 'Allocation of memory storage from the runtime heap at execution time (e.g. malloc), prohibited in safety-critical systems.',
        ipa: '/daɪˈnæm.ɪk ˈmɛm.ər.i ˌæləˈkeɪʃən/',
        collocations: ['prohibit dynamic heap allocation', 'heap memory fragmentation', 'deterministic static allocation']
      },
      {
        en: 'Static Code Analysis',
        es: 'Análisis Estático de Código',
        definition: 'Automated evaluation of computer software without executing the program, mathematically checking compliance against coding standards.',
        ipa: '/ˈstætɪk koʊd əˈnæləsɪs/',
        collocations: ['integrate static analysis in CI/CD', 'abstract interpretation engine', 'zero MISRA rule violations']
      },
      {
        en: 'Cyclomatic Complexity',
        es: 'Complejidad Ciclomática',
        definition: 'Software quantitative metric measuring the number of linearly independent paths through a program source code.',
        ipa: '/ˌsaɪkləˈmætɪk kəmˈplɛksəti/',
        collocations: ['limit cyclomatic complexity', 'McCabe complexity metric', 'reduce conditional branching']
      },
      {
        en: 'Undefined Behavior (UB)',
        es: 'Comportamiento Indefinido (UB)',
        definition: 'Condition in computer programming where the language specification imposes no requirements on output, often resulting in severe crashes or exploits.',
        ipa: '/ˌʌndɪˈfaɪnd bɪˈheɪvjər/',
        collocations: ['eliminate undefined behavior', 'buffer overflow exploit', 'uninitialized pointer dereference']
      }
    ],
    questions: [
      {
        q: 'Why does MISRA C Rule 21.3 strictly ban the use of malloc() and dynamic heap allocation in safety-critical automotive and aerospace firmware?',
        options: [
          'Because malloc() is only available in Python',
          'Because dynamic memory allocation introduces non-deterministic execution timing and can cause heap fragmentation, leading to unexpected memory allocation failure during critical operations',
          'Because hard drives do not have enough gigabytes',
          'Because malloc() uses too much Internet bandwidth'
        ],
        answer: 1,
        explanation: 'Dynamic allocation is non-deterministic in timing: searching heap memory pools takes variable clock cycles, and over days of operation, repeated allocations and deallocations fragment the heap until a malloc() suddenly returns NULL, potentially crashing flight or brake controls.'
      },
      {
        q: 'What is the primary advantage of static code analysis utilizing abstract interpretation over standard unit testing?',
        options: [
          'Static analysis requires no computers to run',
          'Static analysis mathematically proves the absence of entire classes of runtime errors (like buffer overflows and division by zero) across all possible execution paths without running the binary',
          'Static analysis rewrites the entire program into assembly language',
          'Static analysis automatically files patents'
        ],
        answer: 1,
        explanation: 'Unit tests can only test specific pre-selected test vectors and inputs. Formal abstract interpretation evaluates mathematical bounds across all variable domains, rigorously proving that a pointer dereference or array index can never exceed allocated memory bounds under any condition.'
      },
      {
        q: 'What is the recommended threshold for McCabe Cyclomatic Complexity in high-integrity software modules to guarantee maintainability and testability?',
        options: [
          'Around 500 to 1,000 branches per function',
          'Typically kept below 10 to 15 linearly independent decision paths per function',
          'Zero, functions cannot contain any code',
          'It does not matter as long as the compiler produces an output'
        ],
        answer: 1,
        explanation: 'Standard safety engineering guidelines (including ISO 26262 and NASA coding rules) mandate keeping cyclomatic complexity below 10 to 15. High complexity indicates deeply nested conditional logic that is exceptionally difficult to test exhaustively for 100% MC/DC coverage.'
      },
      {
        q: 'Why are statically allocated circular ring buffers preferred for processing incoming CAN bus sensor messages in embedded firmware?',
        options: [
          'Because circular buffers store messages in a magnetic ring',
          'Because their storage is fully allocated at compile time in the static BSS segment with constant-time O(1) push/pop operations, completely eliminating memory allocation failures and runtime latency jitter',
          'Because they can store an infinite amount of data forever',
          'Because they don’t require a microcontroller clock'
        ],
        answer: 1,
        explanation: 'A statically allocated circular buffer guarantees memory availability at link time, possesses zero risk of memory fragmentation, and executes in deterministic O(1) constant time, making it ideal for real-time interrupt service routines (ISRs).'
      }
    ]
  });
  console.log('[UPDATED] Injected software-m1-r2');
}

// Write updated content back
const outputJS = `// stemOS Learning Experience Platform - Course Catalog
// Comprehensive Technical English (ESP) curriculum for high-tech engineering tracks.

var LXP_COURSES = ${JSON.stringify(courses, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LXP_COURSES;
}
`;

fs.writeFileSync(coursesPath, outputJS, 'utf8');
console.log('[SUCCESS] content/courses.js updated with 5 new applied engineering labs!');
