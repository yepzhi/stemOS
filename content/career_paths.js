/**
 * stemOS — Deterministic Career Path Engine (v5.42.0)
 * Standardizes 60.0-hour curricular engineering paths across Mexico (TecNM, UT, Estatales) and LATAM.
 * 
 * CORE ARCHITECTURAL INVARIANT:
 * "All students enrolled in the same engineering career share the EXACT same 16-module deterministic path."
 * 
 * 16-MODULE INTERLEAVING PATTERN (Repeated across 4 Hitos):
 * [M01/05/09/13] Theory Module     — Industrial SOPs, Physics & Math Foundations (3.5h, 300 XP)
 * [M02/06/10/14] English B1 Lab    — Technical Vocabulary, Escalation & Cross-Border Idioms (3.5h, 300 XP)
 * [M03/07/11/15] Practical Lab     — Interactive Plant Simulator / LOTO / Digital Twin (4.0h, 400 XP)
 * [M04/08/12/16] Milestone Exam    — Summative Assessment & W3C Open Badge Accreditation (4.0h, 500 XP)
 * 
 * TOTAL PER CAREER: 60.0 Curricular Hours | 5,600 Base XP | 4 Milestone Verifiable Credentials
 * ZERO A2 POLICY: 100% Technical Industrial English B1 across all descriptors, rubrics, and competencies.
 */

(function(root) {
  'use strict';

  const MODULE_TYPES = {
    'theory': {
      id: 'theory',
      label: 'Technical Theory',
      icon: 'fa-book-open',
      color: '#38bdf8', // sky-400
      glow: 'rgba(56, 189, 248, 0.4)',
      defaultHours: 3.5,
      defaultXP: 300
    },
    'english-b1': {
      id: 'english-b1',
      label: 'Technical English B1 Lab',
      icon: 'fa-language',
      color: '#2dd4bf', // teal-400
      glow: 'rgba(45, 212, 191, 0.4)',
      defaultHours: 3.5,
      defaultXP: 300
    },
    'practical-lab': {
      id: 'practical-lab',
      label: 'Practical Lab Sim',
      icon: 'fa-flask',
      color: '#f59e0b', // amber-500
      glow: 'rgba(245, 158, 11, 0.4)',
      defaultHours: 4.0,
      defaultXP: 400
    },
    'milestone': {
      id: 'milestone',
      label: 'Milestone Checkpoint',
      icon: 'fa-award',
      color: '#10b981', // emerald-500
      glow: 'rgba(16, 185, 129, 0.5)',
      defaultHours: 4.0,
      defaultXP: 500
    }
  };

  // Helper generator to synthesize deterministic 16-module paths per career
  function buildPath(careerId, careerName, cluster, hitoConfigs) {
    const modules = [];
    let modNum = 1;

    hitoConfigs.forEach((h, hitoIdx) => {
      const hitoNum = hitoIdx + 1;

      // 1. Theory
      modules.push({
        id: `M${String(modNum).padStart(2, '0')}`,
        order: modNum++,
        hito: hitoNum,
        type: 'theory',
        title: h.theoryTitle,
        shortTitle: h.theoryShort || h.theoryTitle.split(':')[0],
        hours: 3.5,
        xp: 300,
        cluster: cluster,
        competency: h.theoryCompetency,
        standard: h.standards ? h.standards[0] : 'ISO/IEC Standard',
        icon: 'fa-book-open',
        badge: 'THEORY 3.5H'
      });

      // 2. English B1 Lab
      modules.push({
        id: `M${String(modNum).padStart(2, '0')}`,
        order: modNum++,
        hito: hitoNum,
        type: 'english-b1',
        title: h.englishTitle,
        shortTitle: h.englishShort || h.englishTitle.split(':')[0],
        hours: 3.5,
        xp: 300,
        cluster: cluster,
        competency: h.englishCompetency,
        standard: 'CEFR Technical English B1',
        icon: 'fa-language',
        badge: 'ENGLISH B1 3.5H'
      });

      // 3. Practical Lab Sim
      modules.push({
        id: `M${String(modNum).padStart(2, '0')}`,
        order: modNum++,
        hito: hitoNum,
        type: 'practical-lab',
        title: h.labTitle,
        shortTitle: h.labShort || h.labTitle.split(':')[0],
        hours: 4.0,
        xp: 400,
        cluster: cluster,
        competency: h.labCompetency,
        standard: h.standards ? h.standards[1] || h.standards[0] : 'OSHA 1910.147 / IEEE',
        icon: 'fa-flask',
        badge: 'LAB SIM 4.0H'
      });

      // 4. Milestone Checkpoint Exam
      modules.push({
        id: `M${String(modNum).padStart(2, '0')}`,
        order: modNum++,
        hito: hitoNum,
        type: 'milestone',
        title: `Hito ${hitoNum} Checkpoint: ${h.milestoneTitle}`,
        shortTitle: `Hito ${hitoNum} Assessment`,
        hours: 4.0,
        xp: 500,
        cluster: cluster,
        competency: h.milestoneCompetency,
        standard: 'W3C Open Badges 3.0 / ABET EAC',
        badgeHash: `sha256-stemos-${careerId}-hito${hitoNum}`,
        icon: 'fa-award',
        badge: 'CHECKPOINT 4.0H'
      });
    });

    return {
      careerId: careerId,
      careerName: careerName,
      cluster: cluster,
      totalHours: 60.0,
      totalXP: 5600,
      totalXp: 5600,
      modulesTotal: 16,
      hitosTotal: 4,
      hitosCount: 4,
      modules: modules
    };
  }

  // ════════════════════════════════════════════════════════════════════════
  // DETERMINISTIC CAREER PATHS REGISTRY (25 Specialized Careers)
  // ════════════════════════════════════════════════════════════════════════
  const CAREER_PATHS = {
    // ──────────────── 1. TECNM: INGENIERÍA MECATRÓNICA ────────────────
    'it-mecatronica': buildPath('it-mecatronica', 'Ingeniería Mecatrónica', 'Advanced Manufacturing & Robotics', [
      {
        theoryTitle: 'Multi-Axis Motion Control & Kinematics Terminology',
        theoryCompetency: 'Analyze mechanical backlash, absolute encoders, and inverse kinematics on 6-axis articulated robots.',
        englishTitle: 'Plant Floor Vocabulary & Shift Handover Commands',
        englishCompetency: 'Deliver standardized English shift handover logs, callouts, and safety stoppage notifications.',
        labTitle: 'LOTO Zero-Energy: Robotic Cell De-energization Sim',
        labCompetency: 'Execute 6-step mechanical and pneumatic energy isolation with verified zero-energy try-step.',
        milestoneTitle: 'Shopfloor Survival & Robotic Cell Commissioning',
        milestoneCompetency: 'Summative oral defense of safety circuits, dual-channel E-stops, and functional safety PL d.',
        standards: ['ISO 10218-1/2', 'OSHA 1910.147', 'IEC 62061 SIL']
      },
      {
        theoryTitle: 'Automated Inspection & Computer Vision Calibration',
        theoryCompetency: 'Configure coaxial telecentric lighting, pixel-to-millimeter spatial resolution, and optical flaw detection.',
        englishTitle: '8D Root Cause Reports & Supplier Escalation Emails',
        englishCompetency: 'Draft structured 8D containment reports and vendor escalation correspondence in formal technical English.',
        labTitle: 'Digital Twin SCADA Telemetry & Edge Gateway Sim',
        labCompetency: 'Diagnose intermittent OPC-UA bus drops, fieldbus packet jitter, and telemetry historian anomalies.',
        milestoneTitle: 'Root Cause Triangulation & Vision Diagnostics',
        milestoneCompetency: 'Accreditation in automated defect classification, Gage R&R precision, and SCADA monitoring.',
        standards: ['IATF 16949', 'IEEE 802.3 TSN', 'ISO 9001:2015']
      },
      {
        theoryTitle: 'Design Review & Tier-1 OEM Buy-Off Protocols',
        theoryCompetency: 'Evaluate tooling mechanical tolerances, servo sizing torque curves, and cycle time bottlenecks.',
        englishTitle: 'Technical Meetings, Plant Idioms & Negotiations',
        englishCompetency: 'Navigate contentious OEM engineering change orders and dispute resolution using plant floor idioms.',
        labTitle: 'War Room Crisis Command & Line-Stop Containment',
        labCompetency: 'Command real-time containment under $5,000/minute line-stop ticker pressure and technical coordination.',
        milestoneTitle: 'Cross-Border Negotiation & Auditor Defense',
        milestoneCompetency: 'Defend cell cycle-time buy-off specifications before cross-border automotive OEM executive panels.',
        standards: ['CE Machinery Directive', 'NFPA 70E Arc Flash']
      },
      {
        theoryTitle: 'Industrial Robot Crash Analysis & Safe Envelopes',
        theoryCompetency: 'Perform crash forensic analysis, joint torque spike calculation, and Cartesian zone restriction recalculation.',
        englishTitle: 'Engineering Pitch, Executive Defense & Presentation',
        englishCompetency: 'Deliver concise 5-minute technical executive pitches with acoustic clarity and syllable stress precision.',
        labTitle: 'Capstone Multi-Station Board Exam Simulation',
        labCompetency: 'Resolve multi-variable manufacturing breakdowns across interconnected hydraulic, vision, and PLC stations.',
        milestoneTitle: 'Oral Board Fellowship Defense & W3C Credential',
        milestoneCompetency: 'Final Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['ISO 13849-1 Cat 4', 'W3C Open Badges 3.0']
      }
    ]),

    // ──────────────── 2. TECNM: INGENIERÍA ELECTROMECÁNICA ────────────────
    'it-electromecanica': buildPath('it-electromecanica', 'Ingeniería Electromecánica', 'Heavy Power & Electromechanics', [
      {
        theoryTitle: 'Three-Phase Transformer Banks & Harmonics Mitigation',
        theoryCompetency: 'Calculate delta-wye connections, total harmonic distortion (THD), and k-factor ratings.',
        englishTitle: 'Substation Callouts & High-Voltage Switching Commands',
        englishCompetency: 'Communicate high-voltage switching orders, breaker lockouts, and grounding verifications.',
        labTitle: 'Substation LOTO & Residual Magnetic Energy Discharge',
        labCompetency: 'Perform complete mechanical racking and grounding rod deployment on 13.8kV switchgear.',
        milestoneTitle: 'Substation Readiness & Grid Safety Accreditation',
        milestoneCompetency: 'Demonstrate functional compliance with NFPA 70E safety boundaries and PPE category 4.',
        standards: ['IEEE 1584 Arc Flash', 'NFPA 70E', 'NOM-001-SEDE']
      },
      {
        theoryTitle: 'Thermographic Predictive Maintenance & Motor Stator Analysis',
        theoryCompetency: 'Analyze thermal imaging heat signatures, motor current signature analysis (MCSA), and winding degradation.',
        englishTitle: 'Failure Mode and Effects Analysis (FMEA) Technical Briefs',
        englishCompetency: 'Write rigorous FMEA action items and technical escalation memos for corporate asset directors.',
        labTitle: 'Variable Frequency Drive (VFD) Telemetry & Resonant Vibration Sim',
        labCompetency: 'Tune carrier frequency, skip resonance frequencies, and configure regenerative braking resistors.',
        milestoneTitle: 'Predictive Diagnostics & Stator Health Verification',
        milestoneCompetency: 'Verify root cause isolation on catastrophic motor bearing and winding failures.',
        standards: ['NEMA MG-1', 'ISO 10816 Vibration Severity']
      },
      {
        theoryTitle: 'Utility Interconnection Agreements & Power Factor Arbitrage',
        theoryCompetency: 'Evaluate utility demand charges, peak shaving strategies, and capacitor bank switching transients.',
        englishTitle: 'Executive Capital Expenditure (CapEx) Negotiation',
        englishCompetency: 'Present cost-benefit ROI proposals for high-efficiency transformer overhauls to CFO panels.',
        labTitle: 'Industrial Microgrid Black Start & Generator Synchronization',
        labCompetency: 'Coordinate automatic transfer switches (ATS) and synchronoscope phase alignment during blackout.',
        milestoneTitle: 'Grid Interconnection & Power Reliability Defense',
        milestoneCompetency: 'Defend microgrid islanding reliability and transient voltage recovery compliance.',
        standards: ['IEEE 1547 Interconnection', 'ISO 50001 Energy Mgmt']
      },
      {
        theoryTitle: 'Arc Flash Hazard Forensic Modeling & Coordination Curves',
        theoryCompetency: 'Construct time-current characteristic (TCC) trip curves and incident energy boundary zones.',
        englishTitle: 'Oral Board Fellowship Pitch & Regulatory Defense',
        englishCompetency: 'Lead executive safety defense before OSHA / STPS labor safety compliance inspectors.',
        labTitle: 'Capstone High-Voltage Switchgear Failure Emulation',
        labCompetency: 'Isolate asymmetric fault current conditions and restore plant auxiliary bus under blackout protocols.',
        milestoneTitle: 'Master Electromechanical Fellowship Accreditation',
        milestoneCompetency: 'Final oral examination and W3C digital credential issuance.',
        standards: ['IEEE 399 Power Systems', 'W3C Open Badges 3.0']
      }
    ]),

    // ──────────────── 3. TECNM: INGENIERÍA EN SEMICONDUCTORES ────────────────
    'it-semiconductores': buildPath('it-semiconductores', 'Ingeniería en Semiconductores', 'Microchip Architecture & Cleanrooms', [
      {
        theoryTitle: 'Cleanroom Class 100/ISO 5 Protocol & Wafer Fab Physics',
        theoryCompetency: 'Understand laminar flow dynamics, airborne particulate control, and wafer handling protocols.',
        englishTitle: 'Cleanroom Contamination Callouts & Fab English',
        englishCompetency: 'Execute immediate cleanroom breach notifications and process interlock voice communications.',
        labTitle: 'Photolithography Spin-Coater & Mask Alignment Sim',
        labCompetency: 'Calibrate photoresist thickness, pre-bake temperature curves, and critical dimension UV exposure.',
        milestoneTitle: 'Cleanroom Certification & Wafer Handling Readiness',
        milestoneCompetency: 'Pass cleanroom contamination containment and wafer transport safety audits.',
        standards: ['ISO 14644-1 Cleanrooms', 'SEMI E49 Fab Standards']
      },
      {
        theoryTitle: 'Plasma Dry Etching & Chemical Vapor Deposition (CVD)',
        theoryCompetency: 'Analyze plasma anisotropy, reactive ion etching (RIE) selectivity, and thin-film stoichiometry.',
        englishTitle: 'Yield Defect Reports & Metrology Analysis Emails',
        englishCompetency: 'Author detailed wafer fab yield excursion reports and cross-border fab coordination updates.',
        labTitle: 'SEM Metrology & Ellipsometry Thin-Film Telemetry Sim',
        labCompetency: 'Measure nanometer oxide layer thickness and identify particulate defects on silicon substrate.',
        milestoneTitle: 'Metrology Precision & Etch Selectivity Verification',
        milestoneCompetency: 'Demonstrate sub-micron metrology triangulation and wafer yield gap closure.',
        standards: ['SEMI S2 Safety', 'ASTM Wafer Geometry']
      },
      {
        theoryTitle: 'Automated Test Equipment (ATE) & Advanced Packaging',
        theoryCompetency: 'Model 2.5D/3D heterogeneous packaging, silicon interposers, and high-frequency RF test vectors.',
        englishTitle: 'Global Supply Chain Wafer Allocation Negotiations',
        englishCompetency: 'Negotiate foundry wafer capacity allocations and OSAT packaging timelines in English.',
        labTitle: 'Cleanroom Ultra-Pure Water (UPW) & Toxic Gas Abatement Sim',
        labCompetency: 'Manage 18.2 MOhm-cm UPW loop resistance and silane gas scrubber emergency interlocks.',
        milestoneTitle: 'Yield Optimization & Fab Safety Defense',
        milestoneCompetency: 'Defend packaging reliability and fab yield recovery before corporate foundry executives.',
        standards: ['SEMI S8 Ergonomics', 'JEDEC Packaging Standards']
      },
      {
        theoryTitle: 'EUV Photolithography & Computational Patterning',
        theoryCompetency: 'Master 13.5nm EUV optical distortion correction (OPC), pellicle durability, and multi-patterning.',
        englishTitle: 'Semiconductor Fellowship Executive Defense',
        englishCompetency: 'Defend chiplet thermal dissipation architecture before top Silicon Valley chip architects.',
        labTitle: 'Capstone Multi-Stage Microchip Packaging Exam',
        labCompetency: 'Resolve multi-variable microchip wafer crack, solder ball shear, and thermal throttling faults.',
        milestoneTitle: 'Master Semiconductor Fellowship Accreditation',
        milestoneCompetency: 'Complete oral board defense for W3C microchip engineering credential.',
        standards: ['IEEE Heterogeneous Integration', 'W3C Open Badges 3.0']
      }
    ]),

    // ──────────────── 4. TECNM: INGENIERÍA EN SISTEMAS AUTOMOTRICES ────────────────
    'it-automotriz': buildPath('it-automotriz', 'Ingeniería en Sistemas Automotrices', 'Electric Vehicles & Powertrain', [
      {
        theoryTitle: 'CAN-FD, LIN & Automotive Ethernet Bus Protocols',
        theoryCompetency: 'Analyze message arbitration, differential voltage levels, and bus termination diagnostics.',
        englishTitle: 'Assembly Line Troubleshooting & Production Callouts',
        englishCompetency: 'Communicate line-stop and torque audit notifications in North American assembly plants.',
        labTitle: 'High-Voltage EV Battery Pack Disconnection & Isolation Sim',
        labCompetency: 'Safely disconnect 800V DC bus using manual service disconnects (MSD) and verify 0.0V.',
        milestoneTitle: 'Assembly Readiness & High-Voltage EV Safety',
        milestoneCompetency: 'Demonstrate functional compliance with ISO 26262 ASIL standards and OSHA high-voltage rules.',
        standards: ['ISO 26262 ASIL', 'SAE J1772 EV Standards', 'IATF 16949']
      },
      {
        theoryTitle: 'Electric Traction Inverters & Field-Oriented Motor Control',
        theoryCompetency: 'Model SiC MOSFET switching frequencies, space vector PWM, and regenerative torque tables.',
        englishTitle: 'IATF 16949 Non-Conformance & PPAP Submission Logs',
        englishCompetency: 'Write formal production part approval process (PPAP) deviation logs and containment plans.',
        labTitle: 'Automotive Thermal Management & Refrigerant Loop Sim',
        labCompetency: 'Diagnose dual-circuit chiller performance, battery cooling plates, and heat pump valve timing.',
        milestoneTitle: 'Powertrain Diagnostics & Thermal Verification',
        milestoneCompetency: 'Accreditation in inverter efficiency, battery cooling balance, and motor torque response.',
        standards: ['SAE J2990 EV Safety', 'ISO 9001:2015']
      },
      {
        theoryTitle: 'Homologation, FMVSS Crash Compliance & UNECE Regulations',
        theoryCompetency: 'Interpret dynamic barrier impact telemetry, structural crumple zones, and airbag deployment timers.',
        englishTitle: 'OEM Supplier Audit Defense & Cost-Down Negotiations',
        englishCompetency: 'Defend engineering change proposals (ECR) against Tier-1 automotive cost reduction demands.',
        labTitle: 'EV Battery Pack Thermal Runaway Containment Drill',
        labCompetency: 'Coordinate automated fire suppression, pyro-fuse triggering, and gas venting under crisis.',
        milestoneTitle: 'Automotive Safety Homologation & Audit Defense',
        milestoneCompetency: 'Defend EV platform crashworthiness and thermal safety before regulatory review boards.',
        standards: ['UN 38.3 Battery Transport', 'FMVSS 305 EV Crash']
      },
      {
        theoryTitle: 'Advanced Driver Assistance Systems (ADAS) Sensor Fusion',
        theoryCompetency: 'Calibrate millimeter-wave radar, solid-state LiDAR, and camera vision multi-sensor fusion matrix.',
        englishTitle: 'Automotive Engineering Fellowship Capstone Defense',
        englishCompetency: 'Present autonomous vehicle trajectory planning validation before global OEM engineering directors.',
        labTitle: 'Capstone Autonomous EV Drive-by-Wire Board Exam',
        labCompetency: 'Resolve concurrent steer-by-wire, regenerative brake blend, and cyber-attack CAN bus injection.',
        milestoneTitle: 'Master Automotive Engineering Fellowship Accreditation',
        milestoneCompetency: 'Final oral defense and W3C digital credential issuance.',
        standards: ['ISO 21434 Cybersecurity', 'W3C Open Badges 3.0']
      }
    ]),

    // ──────────────── 5. TECNM: INGENIERÍA INDUSTRIAL ────────────────
    'it-industrial': buildPath('it-industrial', 'Ingeniería Industrial', 'Logistics, Supply Chain & Lean', [
      {
        theoryTitle: 'Value Stream Mapping (VSM) & Overall Equipment Effectiveness (OEE)',
        theoryCompetency: 'Calculate cycle time, takt time, lead time, and multi-plant OEE availability/performance/quality.',
        englishTitle: 'Gemba Walk Technical English & Operator Coaching',
        englishCompetency: 'Lead bilingual plant floor Gemba walk dialogues, identify waste (Muda), and coach shift supervisors.',
        labTitle: 'Kanban Pull System & Warehouse Bottleneck Simulator',
        labCompetency: 'Configure supermarket reorder points, safety stock buffers, and replenishment signals.',
        milestoneTitle: 'Lean Manufacturing & Shopfloor OEE Certification',
        milestoneCompetency: 'Defend value stream transformation blueprint before plant operations management.',
        standards: ['Lean Six Sigma', 'ISO 9001:2015 Quality Management']
      },
      {
        theoryTitle: 'Statistical Process Control (SPC) & Gage R&R Precision',
        theoryCompetency: 'Calculate Cp, Cpk, process variance, and Gage Repeatability and Reproducibility ANOVA models.',
        englishTitle: 'Root Cause 8D Reports & Cross-Border Supplier Escalations',
        englishCompetency: 'Formulate corrective action plans (CAPA) and lead supplier quality review conferences in English.',
        labTitle: 'Monte Carlo Cycle Time & Supply Chain Bottleneck Sim',
        labCompetency: 'Run stochastic risk simulations on cross-border logistics lanes and port customs clearance delays.',
        milestoneTitle: 'Process Capability & Six Sigma Green Belt Defense',
        milestoneCompetency: 'Demonstrate process stability, capability index Cpk >= 1.67, and scrap reduction validation.',
        standards: ['AIAG SPC Manual', 'AIAG MSA Manual']
      },
      {
        theoryTitle: 'Total Productive Maintenance (TPM) & Asset Lifecycle Costs',
        theoryCompetency: 'Model Mean Time Between Failures (MTBF), Mean Time to Repair (MTTR), and autonomous maintenance steps.',
        englishTitle: 'Master Service Agreement (MSA) & Freight Sourcing Negotiations',
        englishCompetency: 'Negotiate ocean container demurrage clauses, 3PL contracts, and expedited air-freight rates.',
        labTitle: 'Plant Floor Crisis War Room: Supply Disruption Drill',
        labCompetency: 'Reroute critical raw material inventory during major cross-border bridge border closure.',
        milestoneTitle: 'Supply Chain Reshoring & Operations Reliability Defense',
        milestoneCompetency: 'Defend dual-sourcing nearshoring supply chain architecture before executive VP panels.',
        standards: ['ISO 28000 Supply Chain', 'ISO 55001 Asset Mgmt']
      },
      {
        theoryTitle: 'Digital Factory Layout & Discrete Event Simulation',
        theoryCompetency: 'Design balanced multi-line plant layouts using cellular manufacturing and AGV routing algorithms.',
        englishTitle: 'Industrial Engineering Fellowship Executive Presentation',
        englishCompetency: 'Deliver high-impact executive Capstone presentation on nearshoring manufacturing plant expansion.',
        labTitle: 'Capstone Multi-Plant Industrial Operations Board Exam',
        labCompetency: 'Balance conflicting priorities: line shutdown risk, safety incident containment, and shipment delivery.',
        milestoneTitle: 'Master Industrial Operations Fellowship Accreditation',
        milestoneCompetency: 'Summative oral examination and W3C digital credential issuance.',
        standards: ['ISO 14001 Environmental', 'W3C Open Badges 3.0']
      }
    ]),

    // ──────────────── 6. UNIVERSIDADES TECNOLÓGICAS: TSU EN MECATRÓNICA ────────────────
    'ut-mecatronica': buildPath('ut-mecatronica', 'TSU e Ing. en Mecatrónica (Área Automatización)', 'Manufactura Avanzada & Robótica', [
      {
        theoryTitle: 'PLC Ladder Logic & Safety Relay Hardware Interlocks',
        theoryCompetency: 'Design fail-safe hardwired E-stop circuits, safety gates, and dual-redundant PLC inputs.',
        englishTitle: 'Plant Floor Commands & Maintenance Radio Protocols',
        englishCompetency: 'Communicate machine status, emergency stop alerts, and maintenance radio dispatches in English.',
        labTitle: 'LOTO Lockout & Hydraulic Cylinder Pressure Bleed Sim',
        labCompetency: 'Bleed residual hydraulic pressure to 0 psi and lock out main isolation manifold with padlock.',
        milestoneTitle: 'Dual Model Shopfloor Readiness Certification',
        milestoneCompetency: 'Pass hands-on shopfloor safety protocol audit for Tier-1 automotive plant entrance.',
        standards: ['IEC 61131-3 PLC', 'OSHA 1910.147', 'NFPA 79']
      },
      {
        theoryTitle: 'Electro-Pneumatics & Variable Frequency Drive Commissioning',
        theoryCompetency: 'Size directional control valves, calculate air consumption, and configure motor ramp-up parameters.',
        englishTitle: 'Maintenance Work Orders & Daily Shift Logs',
        englishCompetency: 'Write concise machine fault descriptions, replaced component part numbers, and downtime logs.',
        labTitle: 'Profinet/Modbus Fieldbus Drop Troubleshooting Sim',
        labCompetency: 'Identify cable shielding faults, IP address conflicts, and corrupted cyclic data packets.',
        milestoneTitle: 'Automation Fieldbus & Diagnostics Verification',
        milestoneCompetency: 'Verify fieldbus topology stability and servo parameter optimization under full production speed.',
        standards: ['ISO 1219 Fluid Power', 'IEC 61784 Fieldbus']
      },
      {
        theoryTitle: 'SCADA HMI Alarms & Industrial Internet of Things (IIoT)',
        theoryCompetency: 'Structure ISA-18.2 alarm management hierarchies, MQTT telemetry payloads, and dashboard KPIs.',
        englishTitle: 'Spare Parts Procurement & Technical Support Inquiries',
        englishCompetency: 'Conduct technical phone calls with foreign equipment manufacturers for emergency replacement parts.',
        labTitle: 'Automated Cell Sensor Misalignment & Calibration Sim',
        labCompetency: 'Re-align inductive proximity sensors, retro-reflective optical sensors, and verify teach pendant points.',
        milestoneTitle: 'Industrial Automation & Process Continuity Defense',
        milestoneCompetency: 'Defend root cause elimination of persistent sensor faults before plant engineering heads.',
        standards: ['ISA 18.2 Alarms', 'ISO 9001:2015']
      },
      {
        theoryTitle: 'Robotic Tool Center Point (TCP) & Payload Dynamics',
        theoryCompetency: 'Calculate moment of inertia, gravity center offsets, and dynamic acceleration curves.',
        englishTitle: 'TSU Capstone Technical Presentation & Defense',
        englishCompetency: 'Present graduation automated cell improvement project in technical English.',
        labTitle: 'Capstone Industrial Automation Station Board Exam',
        labCompetency: 'Troubleshoot combined pneumatic valve jam, PLC communications timeout, and sensor drift.',
        milestoneTitle: 'Master Automation Fellowship Accreditation',
        milestoneCompetency: 'Final oral evaluation and W3C digital credential issuance.',
        standards: ['ISO 10218-2 Cell Integration', 'W3C Open Badges 3.0']
      }
    ]),

    // ──────────────── 7. UNIVERSIDAD ESTATAL: INGENIERÍA BIOMÉDICA ────────────────
    'univ-biomedica': buildPath('univ-biomedica', 'Ingeniería Biomédica', 'Medical Devices & Clinical Engineering', [
      {
        theoryTitle: 'Biopotential Amplifiers, ECG Telemetry & Patient Isolation',
        theoryCompetency: 'Calculate common-mode rejection ratio (CMRR), driven-right-leg circuits, and microamp leakage limits.',
        englishTitle: 'Clinical Callouts & Hospital Bioethics Technical English',
        englishCompetency: 'Communicate life-support system operational alarms and sterile cleanroom callouts.',
        labTitle: 'Medical Device Electrical Safety & Leakage Current Testing',
        labCompetency: 'Measure earth leakage and patient auxiliary current in compliance with IEC 60601-1.',
        milestoneTitle: 'Clinical Engineering Safety & Bioethics Certification',
        milestoneCompetency: 'Demonstrate functional mastery of medical device safety and patient risk isolation.',
        standards: ['IEC 60601-1 Medical Safety', 'ISO 14971 Risk Mgmt']
      },
      {
        theoryTitle: 'Hemodialysis Fluidics & Mechanical Ventilator Pneumatics',
        theoryCompetency: 'Model dialysate conductivity sensors, proportional solenoid valves, and tidal volume flow control.',
        englishTitle: 'FDA 510(k) Premarket Submissions & Adverse Event Reports',
        englishCompetency: 'Author Medical Device Reporting (MDR) adverse event incident briefs in formal regulatory English.',
        labTitle: 'Ventilator Pressure-Volume Loop Calibration Sim',
        labCompetency: 'Calibrate differential pressure pneumotachometers and set high-pressure alarm trip limits.',
        milestoneTitle: 'Life-Support Calibration & Regulatory Verification',
        milestoneCompetency: 'Verify flow calibration curves and safety relief valves on neonatal life-support systems.',
        standards: ['ISO 13485 Medical QMS', 'FDA 21 CFR Part 820']
      },
      {
        theoryTitle: 'Diagnostic Imaging Physics: MRI Magnetic Gradients & CT Scanners',
        theoryCompetency: 'Analyze Larmor frequency, RF excitation pulses, superconducting quench protocols, and X-ray dose.',
        englishTitle: 'Clinical Trial Protocols & Regulatory Audit Defense',
        englishCompetency: 'Defend clinical device trials before institutional review boards (IRB) and international auditors.',
        labTitle: 'MRI Superconducting Magnet Quench & Cryogen Safety Sim',
        labCompetency: 'Execute liquid helium exhaust venting protocols and emergency patient extraction from 3-Tesla bore.',
        milestoneTitle: 'Diagnostic Imaging & Hospital Accreditation Defense',
        milestoneCompetency: 'Defend imaging safety protocols and ionizing radiation dosimetry compliance.',
        standards: ['IEC 60601-2-33 MRI', 'COFEPRIS Medical Regulations']
      },
      {
        theoryTitle: 'Implantable Neuromodulation & Biosensor Telemetry',
        theoryCompetency: 'Model hermetic titanium encapsulation, charge injection limits, and wireless inductive telemetry.',
        englishTitle: 'Biomedical Capstone Fellowship Defense',
        englishCompetency: 'Present biocompatible wearable sensor research to international medical device executives.',
        labTitle: 'Capstone Clinical Engineering Multi-Device Board Exam',
        labCompetency: 'Simultaneously troubleshoot defibrillator charge failure, patient monitor telemetry drop, and infusion pump occlusions.',
        milestoneTitle: 'Master Biomedical Engineering Fellowship Accreditation',
        milestoneCompetency: 'Summative oral examination and W3C digital credential issuance.',
        standards: ['ISO 10993 Biocompatibility', 'W3C Open Badges 3.0']
      }
    ]),

    // ──────────────── 8. LATAM: INGENIERÍA MECATRÓNICA LATAM ────────────────
    'latam-mecatronica': buildPath('latam-mecatronica', 'Ingeniería Mecatrónica Regional LATAM', 'Robotics & Regional Automation', [
      {
        theoryTitle: 'Industrial Automation Architecture & Field Sensor Interfacing',
        theoryCompetency: 'Select PNP/NPN transistor outputs, 4-20mA current loops, and optical safety light curtains.',
        englishTitle: 'Latin American Nearshoring Logistics & Industrial English',
        englishCompetency: 'Communicate operational logistics, customs manifests, and equipment commissioning in English.',
        labTitle: 'Industrial Machine Safety Interlock & LOTO Verification',
        labCompetency: 'Isolate main breaker, bleed air tank pressure, and lock out machine power entry box.',
        milestoneTitle: 'Industrial Safety & Commissioning Readiness',
        milestoneCompetency: 'Summative evaluation of safety interlocking and power distribution diagnostics.',
        standards: ['IEC 62061 SIL', 'OSHA 1910.147']
      },
      {
        theoryTitle: 'Embedded Microcontrollers & Industrial Bus Transceivers',
        theoryCompetency: 'Configure RS-485 Modbus RTU, SPI hardware lines, and optoisolated industrial I/O.',
        englishTitle: 'Engineering Escalation & Supplier Technical Memos',
        englishCompetency: 'Write root cause technical escalation memos to international parts suppliers.',
        labTitle: 'SCADA Telemetry & Sensor Calibration Lab Sim',
        labCompetency: 'Diagnose intermittent analog signal noise, grounding ground loops, and ADC conversion errors.',
        milestoneTitle: 'Telemetry Systems & Signal Conditioning Verification',
        milestoneCompetency: 'Accreditation in noise suppression, shielded cabling, and industrial sensor reliability.',
        standards: ['IEEE 1451 Smart Transducers', 'ISO 9001:2015']
      },
      {
        theoryTitle: 'Industrial Robotics Motion Paths & Singularity Avoidance',
        theoryCompetency: 'Identify wrist, shoulder, and elbow singularities; configure safe kinematic transit trajectories.',
        englishTitle: 'Cross-Border Technology Transfer & Contract Negotiations',
        englishCompetency: 'Negotiate equipment licensing terms and technical warranties with multinational engineering vendors.',
        labTitle: 'Production Line Bottleneck & Emergency Recovery Sim',
        labCompetency: 'Recover failed robotic palletizing cell and restore cycle times under real-time production quotas.',
        milestoneTitle: 'Robotics Integration & Multi-Plant Operations Defense',
        milestoneCompetency: 'Defend automation deployment strategy before regional manufacturing management.',
        standards: ['ISO 10218-1 Robotics', 'CE Machinery Safety']
      },
      {
        theoryTitle: 'Cyber-Physical Systems & Cloud Production Analytics',
        theoryCompetency: 'Integrate edge computing nodes, OPC-UA servers, and cloud predictive maintenance analytics.',
        englishTitle: 'Regional Capstone Fellowship Oral Defense',
        englishCompetency: 'Deliver comprehensive technical capstone defense in English before regional academic jury.',
        labTitle: 'Capstone Multi-Stage Automation Cell Board Exam',
        labCompetency: 'Diagnose compound servo motor overload, communications fault, and pneumatic pressure drop.',
        milestoneTitle: 'Master Mechatronics LATAM Fellowship Accreditation',
        milestoneCompetency: 'Final oral evaluation and W3C digital credential issuance.',
        standards: ['ISO 13849-1 Cat 4', 'W3C Open Badges 3.0']
      }
    ])
  };

  // ════════════════════════════════════════════════════════════════════════
  // AUTOMATIC FALLBACK PATH GENERATOR FOR REMAINING CAREERS
  // ════════════════════════════════════════════════════════════════════════
  function generateFallbackCareerPath(careerId, careerName, cluster) {
    return buildPath(careerId, careerName, cluster || 'Applied Engineering', [
      {
        theoryTitle: `${careerName}: Foundations, Physics & Standard Operating Procedures`,
        theoryCompetency: `Master core mathematical, physical, and foundational engineering principles for ${careerName}.`,
        englishTitle: 'Industrial SOPs, Safety Terminology & Plant Callouts',
        englishCompetency: 'Communicate standardized operational commands, shift turnover logs, and safety stoppage notices in English.',
        labTitle: 'LOTO Zero-Energy & Physical System Isolation Simulator',
        labCompetency: 'Execute standard lockout-tagout, pressure bleed, and verified zero-energy state procedures.',
        milestoneTitle: 'Shopfloor Survival & Safety Readiness Certification',
        milestoneCompetency: 'Demonstrate strict operational continuity, functional safety, and SOP compliance.',
        standards: ['ISO 9001:2015', 'OSHA 1910.147', 'ABET Engineering Standards']
      },
      {
        theoryTitle: `${careerName}: Telemetry, Diagnostics & Root Cause Analysis`,
        theoryCompetency: `Model sensor data acquisition, failure modes, and statistical variation across ${careerName} processes.`,
        englishTitle: '8D Root Cause Reports & Supplier Escalation Letters',
        englishCompetency: 'Author formal technical 8D reports, non-conformance containment plans, and vendor escalations.',
        labTitle: 'SCADA Digital Twin & Process Telemetry Simulator',
        labCompetency: 'Diagnose intermittent sensor drift, communication packet drops, and anomalous telemetry spikes.',
        milestoneTitle: 'Root Cause Triangulation & Diagnostics Verification',
        milestoneCompetency: 'Accreditation in process stabilization, instrumentation precision, and root cause isolation.',
        standards: ['IEEE Standards', 'ISO/IEC Data Metrics']
      },
      {
        theoryTitle: `${careerName}: Regulatory Compliance, Audits & Lifecycle Economics`,
        theoryCompetency: `Evaluate industrial regulatory compliance, equipment lifecycle economics, and CapEx ROI.`,
        englishTitle: 'Technical Meetings, Plant Floor Idioms & Contract Negotiations',
        englishCompetency: 'Lead technical cross-border meetings, resolve engineering change disputes, and negotiate delivery dates.',
        labTitle: 'Crisis War Room & Unplanned Downtime Containment Drill',
        labCompetency: 'Lead command-and-control operations under critical incident ticker pressure and resource constraints.',
        milestoneTitle: 'Cross-Border Negotiation & Auditor Defense',
        milestoneCompetency: 'Defend engineering specifications and safety compliance before institutional audit panels.',
        standards: ['ISO 55001 Asset Mgmt', 'CE / NOM Compliance']
      },
      {
        theoryTitle: `${careerName}: Advanced Specialization & Emerging Technologies`,
        theoryCompetency: `Synthesize advanced domain-specific engineering topics, optimization models, and AI tools.`,
        englishTitle: 'Engineering Pitch, Executive Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical executive defenses with precise acoustic phonetics.',
        labTitle: 'Capstone Multi-Variable Engineering Board Exam Simulator',
        labCompetency: 'Isolate and resolve concurrent multi-discipline engineering breakdowns under tight countdown.',
        milestoneTitle: 'Oral Board Fellowship Defense & W3C Credential',
        milestoneCompetency: 'Summative oral defense before Socratic AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'ABET Student Outcomes']
      }
    ]);
  }

  // ════════════════════════════════════════════════════════════════════════
  // PUBLIC API: STEMOS_CAREER_PATHS
  // ════════════════════════════════════════════════════════════════════════
  const engine = {
    MODULE_TYPES: MODULE_TYPES,

    /**
     * Get the deterministic 16-module path for any career.
     * Guaranteed Invariant: Every student with this careerId receives this exact path.
     * @param {string} careerId - e.g. 'it-mecatronica'
     * @returns {Object} Deterministic path containing exactly 16 modules across 4 hitos.
     */
    getPathForCareer: function(careerId) {
      if (!careerId) careerId = 'it-mecatronica';

      if (CAREER_PATHS[careerId]) {
        return CAREER_PATHS[careerId];
      }

      // If not explicitly defined, resolve career metadata from STEMOS_CAREER_TRACKS catalog
      let name = careerId;
      let cluster = 'Advanced Manufacturing';
      if (typeof root.STEMOS_CAREER_TRACKS !== 'undefined') {
        const c = root.STEMOS_CAREER_TRACKS.getCareerById(careerId);
        if (c) {
          name = c.name;
          cluster = c.cluster || cluster;
        }
      }

      // Generate and cache deterministic fallback
      CAREER_PATHS[careerId] = generateFallbackCareerPath(careerId, name, cluster);
      return CAREER_PATHS[careerId];
    },

    /**
     * Look up a specific module within a career path.
     * @param {string} careerId
     * @param {string} moduleId - e.g. 'M01', 'M07'
     */
    getModule: function(careerId, moduleId) {
      const path = this.getPathForCareer(careerId);
      return path.modules.find(m => m.id === moduleId || String(m.order) === String(moduleId));
    },

    /**
     * Get all 4 modules belonging to a specific Hito (1, 2, 3, or 4).
     * @param {string} careerId
     * @param {number} hitoNumber
     */
    getHitoModules: function(careerId, hitoNumber) {
      const path = this.getPathForCareer(careerId);
      return path.modules.filter(m => m.hito === parseInt(hitoNumber, 10));
    },

    /**
     * Compute progress metrics deterministically based on an array of completed module IDs.
     * @param {string} careerId
     * @param {Array<string>} completedModuleIds - e.g. ['M01', 'M02', 'M03']
     */
    calculateCohortProgress: function(careerId, completedModuleIds) {
      const path = this.getPathForCareer(careerId);
      const completedSet = new Set(completedModuleIds || []);

      let earnedXP = 0;
      let completedHours = 0;
      let completedCount = 0;
      let currentHito = 1;

      path.modules.forEach(m => {
        if (completedSet.has(m.id)) {
          earnedXP += m.xp;
          completedHours += m.hours;
          completedCount++;
        }
      });

      // Calculate current hito
      if (completedCount >= 12) currentHito = 4;
      else if (completedCount >= 8) currentHito = 3;
      else if (completedCount >= 4) currentHito = 2;
      else currentHito = 1;

      const progressPercent = Math.round((completedCount / path.modulesTotal) * 100);

      return {
        careerId: careerId,
        totalModules: path.modulesTotal,
        completedCount: completedCount,
        progressPercent: progressPercent,
        earnedXP: earnedXP,
        totalXP: path.totalXP,
        completedHours: completedHours,
        totalHours: path.totalHours,
        currentHito: currentHito,
        isCompleted: completedCount >= path.modulesTotal
      };
    },

    /**
     * Get all registered career paths
     */
    getAllCareerIds: function() {
      if (typeof root.STEMOS_CAREER_TRACKS !== 'undefined' && Array.isArray(root.STEMOS_CAREER_TRACKS.CAREERS)) {
        return root.STEMOS_CAREER_TRACKS.CAREERS.map(c => c.id);
      }
      return Object.keys(CAREER_PATHS);
    }
  };

  // Pre-populate all paths for registered careers
  if (typeof root.STEMOS_CAREER_TRACKS !== 'undefined' && Array.isArray(root.STEMOS_CAREER_TRACKS.CAREERS)) {
    root.STEMOS_CAREER_TRACKS.CAREERS.forEach(c => {
      engine.getPathForCareer(c.id);
    });
  }
  engine.careers = CAREER_PATHS;

  // Export globally for browser & Node.js environments
  root.STEMOS_CAREER_PATHS = engine;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = engine;
  }

})(typeof window !== 'undefined' ? window : global);
