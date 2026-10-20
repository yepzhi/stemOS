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
  // DETERMINISTIC CAREER PATHS REGISTRY (36 Specialized Careers: 11 UPBC + 25 National)
  // ════════════════════════════════════════════════════════════════════════
  const CAREER_PATHS = {
    // ──────────────── UPBC: INGENIERÍA EN ANIMACIÓN Y EFECTOS VISUALES ────────────────
    'upbc-animacion': buildPath('upbc-animacion', 'Ingeniería en Animación y Efectos Visuales', 'Animación, Diseño Digital & Medios Tech', [
      {
        theoryTitle: 'Real-Time 3D Rendering & VFX Asset Pipelines',
        theoryCompetency: 'Analyze shader compilation, PBR material nodes, and OpenUSD scene graphs for real-time engines.',
        englishTitle: 'Production Terminology, Shot Breakdown & Asset Callouts',
        englishCompetency: 'Deliver standardized English shot turnovers, naming conventions, and asset delivery notes.',
        labTitle: '3D Pipeline Integration: USD Asset Ingestion & Lighting Sim',
        labCompetency: 'Configure ACES color transform, render passes (AOVs), and asset stage composition under production deadlines.',
        milestoneTitle: 'Studio Asset Delivery & Render Pipeline Certification',
        milestoneCompetency: 'Summative defense of asset turnaround time, color space compliance, and 3D viewport performance.',
        standards: ['OpenUSD 23.11', 'ACES 1.3 Color', 'VES Standards']
      },
      {
        theoryTitle: 'Visual Effects Simulation & Rigging Optimization',
        theoryCompetency: 'Model kinematic skeletal rigs, inverse kinematics constraints, and particle collision dynamics.',
        englishTitle: '8D Pipeline Incident Reports & Render Bug Escalations',
        englishCompetency: 'Draft structured technical bug tickets and studio vendor escalation correspondence in formal English.',
        labTitle: 'Render Farm Telemetry & Resource Bottleneck Simulator',
        labCompetency: 'Diagnose intermittent node dropouts, VRAM thrashing, and distributed frame rendering anomalies.',
        milestoneTitle: 'Render Diagnostics & Visual Asset Verification',
        milestoneCompetency: 'Accreditation in memory optimization, frame-rate budget compliance, and render telemetry analysis.',
        standards: ['SMPTE 2110', 'IEEE Computer Graphics', 'ISO/IEC 14496']
      },
      {
        theoryTitle: 'Virtual Production, Motion Capture & LED Wall Calibration',
        theoryCompetency: 'Calibrate camera tracking latency, parallax perspective, and genlock synchronization on virtual soundstages.',
        englishTitle: 'Studio Dailies, Creative Change Orders & Pitching',
        englishCompetency: 'Navigate contentious director feedback and deliver persuasive technical compromise pitches in English.',
        labTitle: 'Crisis War Room: Delivery Crunch & Frame Drop Containment',
        labCompetency: 'Command real-time recovery when master shot render fails 3 hours prior to international distributor premiere.',
        milestoneTitle: 'Studio Production Defense & Executive Buy-Off',
        milestoneCompetency: 'Defend virtual production shot delivery specifications before multinational executive studio review.',
        standards: ['VES Virtual Production Guidelines', 'SMPTE ST 2059 PTP']
      },
      {
        theoryTitle: 'Emerging Generative Vision & Real-Time Compositing',
        theoryCompetency: 'Synthesize neural radiance fields (NeRFs), deep compositing matrices, and real-time ray-tracing acceleration.',
        englishTitle: 'Technical Portfolio Pitch, Executive Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical demo reel defenses with clear acoustic articulation and technical vocabulary.',
        labTitle: 'Capstone Multi-Stage VFX Sequence Board Exam',
        labCompetency: 'Resolve multi-variable production breakdowns across interconnected animation, lighting, and comp nodes.',
        milestoneTitle: 'Master Digital Media Fellowship Accreditation & W3C Credential',
        milestoneCompetency: 'Final Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'VES Technical Outcomes']
      }
    ]),

    // ──────────────── UPBC: INGENIERÍA EN ENERGÍA Y DESARROLLO SOSTENIBLE ────────────────
    'upbc-energia': buildPath('upbc-energia', 'Ingeniería en Energía y Desarrollo Sostenible', 'Energía, Sustentabilidad & Turbomaquinaria', [
      {
        theoryTitle: 'Utility-Scale Solar PV & Turbomachinery Thermodynamics',
        theoryCompetency: 'Calculate solar irradiance degradation, inverter clipping ratios, and Brayton/Rankine thermal cycle efficiencies.',
        englishTitle: 'Plant Floor Safety SOPs, High-Voltage Commands & Shift Turnover',
        englishCompetency: 'Communicate high-voltage switching logs, thermal safety callouts, and field lockout notifications in English.',
        labTitle: 'LOTO Zero-Energy: Substation & Turbine Steam Valve Isolation',
        labCompetency: 'Execute multi-point mechanical, thermal, and electrical energy isolation with verified zero-energy try-step.',
        milestoneTitle: 'Power Plant Safety Readiness & Commissioning Certification',
        milestoneCompetency: 'Summative defense of arc flash boundaries, steam blowdown safety, and electrical isolation protocols.',
        standards: ['IEC 61215 Solar PV', 'OSHA 1910.147 LOTO', 'NFPA 70E']
      },
      {
        theoryTitle: 'Substation Telemetry, Inverter Health & Vibration Diagnostics',
        theoryCompetency: 'Analyze FFT spectrum vibration signatures on turbomachinery bearings and power inverter total harmonic distortion (THD).',
        englishTitle: '8D Root Cause Engineering Reports & Equipment Failure Memos',
        englishCompetency: 'Author formal technical 8D reports on transformer overheating and turbine blade thermal fatigue.',
        labTitle: 'SCADA Historian & Solar Field Telemetry Simulator',
        labCompetency: 'Diagnose intermittent inverter communications drops, DC ground faults, and telemetry historian anomalies.',
        milestoneTitle: 'Predictive Diagnostics & Grid Asset Health Verification',
        milestoneCompetency: 'Accreditation in inverter troubleshooting, vibration trend analysis, and SCADA telemetry precision.',
        standards: ['IEEE 1547 Grid Interconnect', 'ISO 10816 Vibration Severity']
      },
      {
        theoryTitle: 'Grid Interconnection Agreements & CENACE Código de Red 2.0',
        theoryCompetency: 'Evaluate power factor compliance, frequency droop response, and reactive power compensation (STATCOM/BESS).',
        englishTitle: 'Technical Meetings, PPA Negotiations & Regulatory Defense',
        englishCompetency: 'Lead technical discussions with grid dispatchers (CENACE/CAISO) and negotiate power purchase agreement terms in English.',
        labTitle: 'Crisis War Room: Grid Frequency Trip & Rapid Curtailment Drill',
        labCompetency: 'Command real-time battery storage and inverter ramping during sudden regional transmission corridor trip.',
        milestoneTitle: 'Cross-Border Grid Compliance & Interconnection Defense',
        milestoneCompetency: 'Defend utility-scale interconnection compliance before cross-border regulatory audit panels.',
        standards: ['CFE Código de Red 2.0', 'NERC Reliability Standards', 'ISO 50001']
      },
      {
        theoryTitle: 'Microgrid Black-Start, BESS LFP Systems & Hydrogen Integration',
        theoryCompetency: 'Design islanding synchronization algorithms, battery state-of-charge (SoC) estimation, and green hydrogen electrolysis.',
        englishTitle: 'Energy Capstone Pitch, Executive Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical project presentations with acoustic clarity and syllable stress precision.',
        labTitle: 'Capstone Multi-Megawatt Substation Board Exam Simulator',
        labCompetency: 'Resolve multi-variable power system breakdowns across interconnected PV strings, inverters, and switchgear.',
        milestoneTitle: 'Master Energy Systems Fellowship Accreditation & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'IEEE Power & Energy Society']
      }
    ]),

    // ──────────────── UPBC: INGENIERÍA MECATRÓNICA ────────────────
    'upbc-mecatronica': buildPath('upbc-mecatronica', 'Ingeniería Mecatrónica', 'Automatización, Robótica & Sistemas Ciberfísicos', [
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

    // ──────────────── UPBC: ING. EN TECNOLOGÍAS DE LA INFORMACIÓN E INNOVACIÓN DIGITAL ────────────────
    'upbc-ti': buildPath('upbc-ti', 'Ingeniería en Tecnologías de la Información e Innovación Digital', 'Software, Datos, IA & Redes Digitales', [
      {
        theoryTitle: 'Distributed Systems Architecture & Industrial MQTT/REST APIs',
        theoryCompetency: 'Architect low-latency event-driven microservices, edge MQTT brokers, and robust API schemas.',
        englishTitle: 'Technical Documentation, API Specifications & Standup Comm',
        englishCompetency: 'Draft comprehensive OpenAPI documentation and lead daily bilingual agile standups.',
        labTitle: 'Edge Node Telemetry Gateway & Offline-First Data Sync Sim',
        labCompetency: 'Implement resilient edge store-and-forward caching under simulated 40% network packet drop.',
        milestoneTitle: 'Distributed Cloud Architecture & API Integrity Certification',
        milestoneCompetency: 'Summative defense of data pipeline throughput, REST API contracts, and schema validation.',
        standards: ['REST / OpenAPI 3.1', 'MQTT v5.0', 'ISO/IEC 25010']
      },
      {
        theoryTitle: 'Distributed Tracing, Telemetry & P99 Latency Optimization',
        theoryCompetency: 'Analyze OpenTelemetry spans, heap memory profiling, and database connection pool saturation.',
        englishTitle: 'Blameless Postmortems, RCA Memos & Incident Communications',
        englishCompetency: 'Write rigorous postmortem incident reports and customer-facing degradation updates in formal English.',
        labTitle: 'Live Production Outage & Chaos Engineering Simulation',
        labCompetency: 'Triangulate memory leaks, runaway goroutines/threads, and deadlocks under active production loads.',
        milestoneTitle: 'Observability & High-Concurrency Systems Verification',
        milestoneCompetency: 'Accreditation in P99 latency containment, distributed traces, and root cause mitigation.',
        standards: ['OpenTelemetry Standard', 'SRE Principles (Google)', 'IEEE 829']
      },
      {
        theoryTitle: 'Industrial OT/IT Zero-Trust Security & Cloud Governance',
        theoryCompetency: 'Model microsegmentation, OAuth2/mTLS authentication, and NIST 800-82 OT cybersecurity frameworks.',
        englishTitle: 'Enterprise Technical Change Advisory Board (CAB) Defense',
        englishCompetency: 'Defend major production infrastructure deployments and SOC 2 security compliance in cross-border CAB meetings.',
        labTitle: 'Ransomware Attack Containment & OT Gateway Isolation Sim',
        labCompetency: 'Command containment procedures to isolate compromised manufacturing execution servers from plant floor PLCs.',
        milestoneTitle: 'Enterprise Security Architecture & Compliance Defense',
        milestoneCompetency: 'Defend security boundaries and incident recovery protocols before international audit panels.',
        standards: ['IEC 62443 / NIST 800-82', 'SOC 2 Type II', 'ISO 27001:2022']
      },
      {
        theoryTitle: 'Enterprise AI Agentic Workflows & Neural Edge Deployment',
        theoryCompetency: 'Deploy quantized LLM pipelines, RAG semantic stores, and edge computer vision inference runtimes.',
        englishTitle: 'Executive Technical Roadmap & Capstone Board Defense',
        englishCompetency: 'Deliver structured 5-minute technical defenses of multi-region cloud migrations to executive boards.',
        labTitle: 'Capstone Multi-Region Resilient Cloud Board Exam',
        labCompetency: 'Architect and execute automated multi-region active-active failover with zero data loss (RPO=0, RTO<30s).',
        milestoneTitle: 'Master Cloud Software Fellowship Accreditation & W3C Credential',
        milestoneCompetency: 'Final oral Socratic examination and verifiable W3C digital credential issuance.',
        standards: ['W3C Open Badges 3.0', 'IEEE Software Engineering Standards']
      }
    ]),

    // ──────────────── UPBC: INGENIERÍA EN MANUFACTURA AVANZADA ────────────────
    'upbc-manufactura': buildPath('upbc-manufactura', 'Ingeniería en Manufactura Avanzada', 'Manufactura Avanzada & Procesos Industriales', [
      {
        theoryTitle: 'Multi-Axis CNC Machining, G-Code & GD&T Datums',
        theoryCompetency: 'Calculate chip load, cutting speeds, tool deflection, and datum reference frames per ASME Y14.5.',
        englishTitle: 'Machine Shop Callouts, Tooling Setup & Shift Handover',
        englishCompetency: 'Communicate cutter wear logs, fixture offsets, and safety stoppage notifications in industrial English.',
        labTitle: 'LOTO Zero-Energy: 5-Axis CNC Mill Lockout Simulator',
        labCompetency: 'Isolate main breaker, pneumatic door locks, and high-pressure coolant pressure with verified zero-energy.',
        milestoneTitle: 'Precision Machining Safety & Tooling Setup Readiness',
        milestoneCompetency: 'Summative defense of machine guarding, interlock switches, and workpiece clamping integrity.',
        standards: ['ASME Y14.5 GD&T', 'OSHA 1910.212 Machine Guarding', 'ISO 9001:2015']
      },
      {
        theoryTitle: 'CMM Coordinate Metrology & SPC Process Stabilization',
        theoryCompetency: 'Perform touch-probe scan calibration, geometric tolerance evaluation, and Gage R&R precision metrics.',
        englishTitle: '8D Root Cause Containment & Non-Conformance Disposition',
        englishCompetency: 'Author formal technical 8D reports on dimensional non-conformances for international aerospace OEMs.',
        labTitle: 'Coordinate Measuring Machine (CMM) Inspection Simulator',
        labCompetency: 'Inspect complex turbine blade profiles, calculate true position deviations, and isolate tool wear drift.',
        milestoneTitle: 'Metrology Triangulation & Quality Disposition Defense',
        milestoneCompetency: 'Accreditation in Cpk capability calculation, datum alignment, and coordinate metrology.',
        standards: ['ISO 10360 CMM Testing', 'AIAG SPC Manual', 'AS9100D']
      },
      {
        theoryTitle: 'Design for Manufacturability (DFM) & Additive Hybrid Tooling',
        theoryCompetency: 'Evaluate metal laser powder bed fusion (LPBF), thermal stress relief, and post-machining allowances.',
        englishTitle: 'First Article Inspection (FAI) & Technical Change Negotiations',
        englishCompetency: 'Negotiate tolerance concessions and engineering change orders (ECO) with Tier-1 defense and aerospace customers.',
        labTitle: 'Crisis War Room: Tool Breakage & Urgent Production Recovery Drill',
        labCompetency: 'Recover failed workpiece zero point, verify spindle runout, and re-establish cycle times under deadline pressure.',
        milestoneTitle: 'Aerospace OEM Buy-Off & FAI Verification Defense',
        milestoneCompetency: 'Defend first article inspection documentation and dimensional conformance before external auditors.',
        standards: ['AS9102 First Article Inspection', 'ASTM F42 Additive Manufacturing']
      },
      {
        theoryTitle: 'Smart Factory Line Balancing & High-Mix Low-Volume Operations',
        theoryCompetency: 'Model cellular manufacturing layout, SMED rapid tool changeovers, and overall equipment effectiveness (OEE).',
        englishTitle: 'Manufacturing Capstone Pitch, Executive Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical CapEx justification presentations with acoustic clarity.',
        labTitle: 'Capstone Multi-Station Machining Cell Board Exam',
        labCompetency: 'Resolve multi-variable manufacturing breakdowns across interconnected CNC, washing, and CMM stations.',
        milestoneTitle: 'Master Advanced Manufacturing Fellowship Accreditation & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'SME Manufacturing Standards']
      }
    ]),

    // ──────────────── UPBC: LICENCIATURA EN ADMINISTRACIÓN ────────────────
    'upbc-administracion': buildPath('upbc-administracion', 'Licenciatura en Administración', 'Administración, Capital Humano & Negocios', [
      {
        theoryTitle: 'Cross-Border Corporate Policy & Bilingual Talent Strategy',
        theoryCompetency: 'Formulate organizational policies, talent acquisition rubrics, and bilingual engineering onboarding frameworks.',
        englishTitle: 'Job Descriptions, Executive Briefs & HR Onboarding Calls',
        englishCompetency: 'Author professional technical job descriptions and lead bilingual onboarding briefings in business English.',
        labTitle: 'HR Compliance Simulation: Labor Policy & Safety Standards',
        labCompetency: 'Audit facility labor compliance, overtime tracking, and mandatory ergonomic training programs.',
        milestoneTitle: 'Talent Acquisition & Organizational Readiness Certification',
        milestoneCompetency: 'Summative defense of recruitment pipelines, salary benchmarking, and cross-border labor compliance.',
        standards: ['ISO 30414 Human Resource Mgmt', 'USMCA Labor Chapter 23']
      },
      {
        theoryTitle: 'CapEx/OpEx Financial Modeling & Variance Telemetry',
        theoryCompetency: 'Model net present value (NPV), internal rate of return (IRR), and quarterly budget variance tracking.',
        englishTitle: 'Financial Variance Reports & Corporate Escalation Memos',
        englishCompetency: 'Draft rigorous financial variance analysis reports and CapEx escalation memos for corporate directors.',
        labTitle: 'ERP Financial Telemetry & Budget Variance Dashboard Sim',
        labCompetency: 'Diagnose cost overruns, vendor payment discrepancies, and labor turnover cost drivers in ERP systems.',
        milestoneTitle: 'Corporate Financial Health & Project Feasibility Verification',
        milestoneCompetency: 'Accreditation in capital budgeting, variance analysis, and operational cost containment.',
        standards: ['GAAP / IFRS Standards', 'PMI PMBOK 7th Edition']
      },
      {
        theoryTitle: 'USMCA Compliance, Labor Audits & Dispute Resolution',
        theoryCompetency: 'Evaluate rapid-response labor mechanism provisions, collective bargaining compliance, and ESG governance.',
        englishTitle: 'Executive Board Presentations & Dispute Negotiations',
        englishCompetency: 'Negotiate cross-border executive agreements, union dispute resolutions, and vendor master service contracts.',
        labTitle: 'Crisis War Room: Nearshoring Expansion & Downsizing Drill',
        labCompetency: 'Command workforce restructuring and critical facility ramp-up under tight operational milestones.',
        milestoneTitle: 'Cross-Border Governance & Executive Boardroom Defense',
        milestoneCompetency: 'Defend corporate compliance, talent retention, and ESG standards before international board panels.',
        standards: ['USMCA Rules of Origin', 'ISO 37301 Compliance Mgmt']
      },
      {
        theoryTitle: 'Strategic Nearshoring Expansion & Capital Allocation',
        theoryCompetency: 'Synthesize plant expansion economics, supply chain reshoring incentives, and long-term corporate strategy.',
        englishTitle: 'Executive Strategy Pitch & Fellowship Oral Defense',
        englishCompetency: 'Deliver concise 5-minute technical executive pitches with persuasive acoustic cadence and executive posture.',
        labTitle: 'Capstone Multi-Department Enterprise Feasibility Exam',
        labCompetency: 'Resolve multi-variable corporate operational crises spanning budget, HR disputes, and vendor supply disruption.',
        milestoneTitle: 'Master Corporate Administration Fellowship & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'Harvard Business Publishing Standards']
      }
    ]),

    // ──────────────── UPBC: INGENIERÍA EN SEMICONDUCTORES ────────────────
    'upbc-semiconductores': buildPath('upbc-semiconductores', 'Ingeniería en Semiconductores', 'Microelectrónica & Semiconductores', [
      {
        theoryTitle: 'Cleanroom Class 1 Protocols & Photolithography Foundations',
        theoryCompetency: 'Calculate UV exposure dose, photoresist sensitivity curves, and particulate deposition rates in ISO 14644 cleanrooms.',
        englishTitle: 'Cleanroom Gowning Commands, Shift Handover & Safety Logs',
        englishCompetency: 'Deliver standardized English shift handover logs, contamination callouts, and cleanroom airlock commands.',
        labTitle: 'LOTO Zero-Energy: High-Vacuum Plasma Etcher Isolation Sim',
        labCompetency: 'Execute toxic gas line isolation, RF power supply de-energization, and vacuum chamber purge with verified zero-energy.',
        milestoneTitle: 'Cleanroom Survival & Photolithography Readiness',
        milestoneCompetency: 'Summative oral defense of contamination control, wafer handling protocols, and chemical safety.',
        standards: ['SEMI S2 / S8 Safety', 'ISO 14644-1 Cleanrooms', 'OSHA 1910 Toxic Substances']
      },
      {
        theoryTitle: 'Scanning Electron Microscopy (SEM) & Wafer Defect Metrology',
        theoryCompetency: 'Analyze critical dimension (CD) SEM images, defect pareto distributions, and wafer yield loss modeling.',
        englishTitle: '8D Root Cause Yield Reports & Tool Vendor Escalation Memos',
        englishCompetency: 'Author formal technical 8D reports on particle contamination and tool vendor escalation memos in English.',
        labTitle: 'Wafer Fab SCADA Telemetry & Chemical Vapor Deposition Sim',
        labCompetency: 'Diagnose intermittent mass flow controller (MFC) drift, RF plasma instability, and film thickness anomalies.',
        milestoneTitle: 'Defect Triangulation & Thin-Film Metrology Verification',
        milestoneCompetency: 'Accreditation in wafer yield analysis, ellipsometry film measurements, and SEM defect classification.',
        standards: ['SEMI E10 Tool Reliability', 'JEDEC Standards', 'ISO 9001:2015']
      },
      {
        theoryTitle: 'Advanced Packaging (OSAT), Wire Bonding & Flip-Chip Assembly',
        theoryCompetency: 'Evaluate ball grid array (BGA) coplanarity, thermosonic wire bond shear strength, and thermal interface materials.',
        englishTitle: 'Fab Technical Review Meetings & Semiconductor Vendor Negotiations',
        englishCompetency: 'Navigate contentious OEM specification reviews and negotiate wafer lot disposition terms with overseas foundries.',
        labTitle: 'War Room Crisis Command: Sub-Micron Fab Tool Down Drill',
        labCompetency: 'Command real-time containment under $25,000/hour tool downtime ticker pressure and multi-discipline engineering coordination.',
        milestoneTitle: 'OSAT Packaging Defense & Customer Conformance Buy-Off',
        milestoneCompetency: 'Defend microchip packaging reliability and thermal cycling test data before automotive and aerospace customers.',
        standards: ['MIL-STD-883 Test Methods', 'AEC-Q100 Automotive Qualification']
      },
      {
        theoryTitle: 'Emerging Heterogeneous Integration, Chiplets & Advanced Metrology',
        theoryCompetency: 'Design 2.5D/3D interposer architectures, through-silicon vias (TSV), and high-bandwidth memory (HBM) interfaces.',
        englishTitle: 'Semiconductor Engineering Pitch, Executive Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical executive defenses of next-generation packaging architectures.',
        labTitle: 'Capstone Multi-Stage Fab & Packaging Board Exam Simulator',
        labCompetency: 'Resolve multi-variable microchip manufacturing breakdowns across interconnected lithography, etch, and test cells.',
        milestoneTitle: 'Master Semiconductor Fellowship Accreditation & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'IEEE Electron Devices Society']
      }
    ]),

    // ──────────────── UPBC: INGENIERÍA INDUSTRIAL ────────────────
    'upbc-industrial': buildPath('upbc-industrial', 'Ingeniería Industrial', 'Calidad, Lean Six Sigma & Procesos Industriales', [
      {
        theoryTitle: 'Standardized Work, Value Stream Mapping & 5S Industrial SOPs',
        theoryCompetency: 'Analyze cycle times, takt times, line balance charts, and identify 8 forms of manufacturing waste (muda).',
        englishTitle: 'Shopfloor 5S Callouts, Shift Handover & Kaizen Logs',
        englishCompetency: 'Deliver standardized English shift turnover reports, standard work instructions, and safety stoppage notices.',
        labTitle: 'LOTO Zero-Energy: Industrial Stamping & Injection Press Sim',
        labCompetency: 'Execute mechanical block insertion, pneumatic bleed, and electrical lock out on 500-ton presses.',
        milestoneTitle: 'Shopfloor Readiness & Lean Ergonomics Certification',
        milestoneCompetency: 'Summative defense of line balancing, standardized work sheets, and workplace safety compliance.',
        standards: ['ISO 9001:2015', 'OSHA 1910.147 LOTO', 'AIAG Core Tools']
      },
      {
        theoryTitle: 'Statistical Process Control (SPC), Gage R&R & 8D Problem Solving',
        theoryCompetency: 'Calculate control limits (UCL/LCL), process capability indices (Cp, Cpk), and measurement system variance.',
        englishTitle: '8D Root Cause Corrective Action (RCCA) Reports in English',
        englishCompetency: 'Draft structured 8D containment plans and customer-facing corrective action reports in technical English.',
        labTitle: 'Digital Plant Floor SCADA Telemetry & Scrap Spike Simulator',
        labCompetency: 'Triangulate sudden scrap rate surges on automated assembly lines using Pareto charts and process telemetry.',
        milestoneTitle: 'Root Cause Triangulation & SPC Capability Verification',
        milestoneCompetency: 'Accreditation in Cpk process capability, measurement system analysis (MSA), and 8D investigation.',
        standards: ['AIAG SPC Manual', 'AIAG MSA Manual', 'IATF 16949']
      },
      {
        theoryTitle: 'Advanced Product Quality Planning (APQP) & PPAP Level 3 Defense',
        theoryCompetency: 'Evaluate process failure mode and effects analysis (PFMEA), control plans, and dimensional results packages.',
        englishTitle: 'Customer Quality Audits, Concession Requests & Negotiations',
        englishCompetency: 'Defend PPAP submission documentation before cross-border Tier-1 automotive and medical OEM auditor panels.',
        labTitle: 'Crisis War Room: Customer Quality Containment & Quarantine Drill',
        labCompetency: 'Command yard hold, sorting containment, and rapid root cause isolation following customer line-stop notice.',
        milestoneTitle: 'PPAP Level 3 Submission & Auditor Compliance Buy-Off',
        milestoneCompetency: 'Defend production part approval processes and failure prevention mechanisms before client auditors.',
        standards: ['AIAG APQP/PPAP Manuals', 'ISO 13485 Medical Quality']
      },
      {
        theoryTitle: 'Six Sigma DMAIC Black Belt Methodologies & Plant Economics',
        theoryCompetency: 'Model hypothesis testing (ANOVA, Chi-square), regression models, and design of experiments (DOE) in manufacturing.',
        englishTitle: 'Six Sigma Executive Pitch, Project Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical project presentations detailing bottom-line financial savings in USD.',
        labTitle: 'Capstone Multi-Variable Plant Efficiency Board Exam',
        labCompetency: 'Resolve multi-variable operations breakdowns across interconnected stamping, molding, and packaging lines.',
        milestoneTitle: 'Master Industrial Engineering Fellowship & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'ASQ Six Sigma Black Belt']
      }
    ]),

    // ──────────────── UPBC: LICENCIATURA EN EDUCACIÓN ────────────────
    'upbc-educacion': buildPath('upbc-educacion', 'Licenciatura en Educación', 'Educación, Enseñanza & Pedagogía ESP', [
      {
        theoryTitle: 'Communicative Language Teaching (CLT) & ESP Curriculum Design',
        theoryCompetency: 'Analyze needs analysis methodologies, technical English corpus linguistics, and domain-specific learning objectives.',
        englishTitle: 'Instructional Commands, Lesson Plans & Academic Briefs',
        englishCompetency: 'Author rigorous technical syllabus documents and deliver precise classroom instructional commands in English.',
        labTitle: 'Micro-Teaching Simulator: Classroom Facilitation & Socratic Engagement',
        labCompetency: 'Lead interactive technical English seminars with formative checking questions and real-time pronunciation feedback.',
        milestoneTitle: 'Instructional Design & Pedagogical Delivery Certification',
        milestoneCompetency: 'Summative defense of curriculum mapping, communicative task design, and Bloom taxonomy alignment.',
        standards: ['CEFR Companion Volume 2020', 'TESOL Standards', 'Cambridge Teaching Framework']
      },
      {
        theoryTitle: 'Formative Assessment, CEFR Rubric Calibration & Diagnostic Testing',
        theoryCompetency: 'Calibrate CEFR descriptors (A1–B2) across Grammar, Listening, and Technical Reading competency dimensions.',
        englishTitle: 'Diagnostic Feedback Reports & Faculty Technical Memos',
        englishCompetency: 'Write structured student diagnostic reports and faculty coordination memos in clear academic English.',
        labTitle: 'Automated Language Testing & Psychometric Analytics Simulator',
        labCompetency: 'Analyze item discrimination indices, distractor efficacy, and cohort score distribution curves in testing platforms.',
        milestoneTitle: 'Assessment Calibration & Rubric Validation Verification',
        milestoneCompetency: 'Accreditation in standardized test design, inter-rater reliability, and CEFR diagnostic calibration.',
        standards: ['ALTE Can-Do Statements', 'ISO/IEC 23988 e-Assessment', 'CEFR Descriptors']
      },
      {
        theoryTitle: 'Institutional Bilingual Accreditation & ABET Criterion 3 Outcomes',
        theoryCompetency: 'Evaluate engineering student communicative outcomes per ABET Criterion 3 (Ability to communicate effectively in English).',
        englishTitle: 'Accreditation Panel Presentations & Faculty Defense',
        englishCompetency: 'Defend institutional language development plans before international academic accreditation committees.',
        labTitle: 'Crisis War Room: Academic Remediation & Cohort Attrition Containment',
        labCompetency: 'Command academic interventions for cohorts failing mandatory language exit milestones prior to industrial practicum.',
        milestoneTitle: 'Institutional Accreditation Defense & Program Review',
        milestoneCompetency: 'Defend department language outcomes, graduation velocity, and employer satisfaction surveys.',
        standards: ['ABET EAC Criterion 3', 'CACEI Accreditation Standards']
      },
      {
        theoryTitle: 'AI-Enhanced Language Acquisition & Educational Technology',
        theoryCompetency: 'Integrate conversational AI mentors, automated pronunciation acoustic scoring, and spaced repetition engines.',
        englishTitle: 'Educational Fellowship Pitch, Capstone Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical presentations on institutional educational innovation in academic English.',
        labTitle: 'Capstone Multi-Discipline Curriculum Defense Board Exam',
        labCompetency: 'Synthesize complete bilingual curriculum frameworks integrating industrial standards, labs, and certification badges.',
        milestoneTitle: 'Master Educational Leadership Fellowship & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'UNESCO ICT Competency Framework']
      }
    ]),

    // ──────────────── UPBC: LICENCIATURA EN GASTRONOMÍA ────────────────
    'upbc-gastronomia': buildPath('upbc-gastronomia', 'Licenciatura en Gastronomía', 'Artes Culinarias, Inocuidad & Servicios', [
      {
        theoryTitle: 'Professional Kitchen Brigade & HACCP Sanitation Protocols',
        theoryCompetency: 'Analyze time-temperature control for safety (TCS) foods, cross-contamination prevention, and kitchen brigade hierarchy.',
        englishTitle: 'Kitchen Callouts, Order Expediting & Brigade Commands',
        englishCompetency: 'Communicate standardized English expediting orders (all-day counts, fire, hold, pick up), allergen warnings, and shift turnover.',
        labTitle: 'Commercial Kitchen Sanitation & Food Safety Audit Sim',
        labCompetency: 'Execute HACCP 7-principle inspection, calibrate bimetallic stem thermometers, and verify 3-compartment sink sanitizer ppm.',
        milestoneTitle: 'Food Safety Readiness & Brigade Station Certification',
        milestoneCompetency: 'Summative defense of food code critical limits, allergen isolation, and personal hygiene SOPs.',
        standards: ['FDA Food Code 2022', 'ServSafe Manager Standards', 'HACCP Codex Alimentarius']
      },
      {
        theoryTitle: 'Menu Engineering, Recipe Costing & Yield Percentage Mathematics',
        theoryCompetency: 'Calculate edible portion (EP) vs as purchased (AP) yields, food cost percentages, and contribution margins (Stars/Plowhorses).',
        englishTitle: 'Food Cost Variance Reports & Supplier Specification Memos',
        englishCompetency: 'Draft structured food cost variance analysis memos and supplier purchase specifications in professional English.',
        labTitle: 'Inventory Telemetry & Critical Ingredient Traceability Sim',
        labCompetency: 'Diagnose inventory shrinkage, cold chain thermal excursions in walk-in coolers, and supplier invoice discrepancies.',
        milestoneTitle: 'Culinary Cost Control & Menu Profitability Verification',
        milestoneCompetency: 'Accreditation in recipe costing accuracy, yield testing, and supplier quality verification.',
        standards: ['National Restaurant Association Standards', 'ISO 22000 Food Safety']
      },
      {
        theoryTitle: 'High-End Beverage Management, Enology & Dining Room Service',
        theoryCompetency: 'Evaluate wine varietals of Baja California, food pairing chemistry, formal French/American service styles, and sommelier vocabulary.',
        englishTitle: 'VIP Dining Service, Wine Pairing Presentation & Guest Recovery',
        englishCompetency: 'Deliver eloquent table-side culinary presentations, explain complex flavor profiles, and resolve guest grievances in English.',
        labTitle: 'Crisis War Room: Banquet Rush & Critical Food Allergy Containment',
        labCompetency: 'Command kitchen brigade during a 250-cover simultaneous service crunch under critical dietary restriction modifications.',
        milestoneTitle: 'Dining Room Excellence & Executive Banquet Defense',
        milestoneCompetency: 'Defend banquet execution plans, service timing, and HACCP compliance before master chef tribunal.',
        standards: ['Court of Master Sommeliers Standards', 'AHLEI Hospitality Standards']
      },
      {
        theoryTitle: 'Sustainable Gastronomy, Farm-to-Table & Molecular Techniques',
        theoryCompetency: 'Design zero-waste kitchen workflows, local sourcing networks, sous-vide precision cooking, and hydrocolloid texture modification.',
        englishTitle: 'Culinary Concept Pitch, Executive Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical restaurant concept pitches with acoustic clarity and culinary eloquence.',
        labTitle: 'Capstone Multi-Course Tasting Menu Board Exam',
        labCompetency: 'Execute complex multi-course tasting menu service demonstrating technical precision, speed, and immaculate food safety.',
        milestoneTitle: 'Master Culinary Arts Fellowship Accreditation & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'American Culinary Federation (ACF)']
      }
    ]),

    // ──────────────── UPBC: LICENCIATURA EN NEGOCIOS Y MERCADOTECNIA ────────────────
    'upbc-negocios': buildPath('upbc-negocios', 'Licenciatura en Negocios y Mercadotecnia', 'Marketing, Comercio Internacional & Negocios Digitales', [
      {
        theoryTitle: 'Cross-Border Market Segmentation & Brand Architecture',
        theoryCompetency: 'Analyze demographic and psychographic consumer segments across US-Mexico border markets, positioning, and value propositions.',
        englishTitle: 'Marketing Briefs, Value Proposition Pitches & Team Callouts',
        englishCompetency: 'Author professional marketing briefs and deliver persuasive product positioning elevator pitches in business English.',
        labTitle: 'Digital Campaign Setup & Multi-Channel Ad Simulator',
        labCompetency: 'Configure Google Ads / Meta Ads targeting parameters, pixel conversion tracking, and UTM campaign parameters.',
        milestoneTitle: 'Brand Positioning & Campaign Strategy Certification',
        milestoneCompetency: 'Summative defense of target audience personas, value messaging clarity, and channel distribution strategy.',
        standards: ['AMA Code of Marketing Ethics', 'IAB Digital Advertising Standards']
      },
      {
        theoryTitle: 'Marketing Analytics, Attribution Modeling & CAC/LTV Telemetry',
        theoryCompetency: 'Model customer acquisition cost (CAC), lifetime value (LTV), return on ad spend (ROAS), and multi-touch attribution.',
        englishTitle: 'Marketing Performance Reports & Executive Data Memos',
        englishCompetency: 'Draft rigorous analytical campaign performance reports and budget reallocation memos for senior leadership in English.',
        labTitle: 'Conversion Funnel Telemetry & Abandonment Diagnostics Sim',
        labCompetency: 'Diagnose e-commerce checkout funnel drop-offs, landing page bounce rate spikes, and ad fatigue anomalies in analytics dashboards.',
        milestoneTitle: 'Analytics Triangulation & Conversion Optimization Verification',
        milestoneCompetency: 'Accreditation in conversion rate optimization (CRO), A/B testing statistical significance, and budget efficiency.',
        standards: ['Google Analytics 4 Standards', 'ISO 20252 Market Research']
      },
      {
        theoryTitle: 'B2B Technical Sales, Solution Selling & USMCA Trade Terms',
        theoryCompetency: 'Evaluate consultative sales cycles, RFP response frameworks, Incoterms 2020 commercial terms, and NDA/MSA legal clauses.',
        englishTitle: 'B2B Sales Presentations, Objection Handling & Contract Negotiations',
        englishCompetency: 'Lead high-stakes B2B sales meetings, handle pricing objections, and negotiate contract terms with US corporate buyers.',
        labTitle: 'Crisis War Room: Key Account Retention & Competitor Takeover Drill',
        labCompetency: 'Command emergency counter-retention strategy following a key cross-border client request for proposal review.',
        milestoneTitle: 'B2B Enterprise Sales Defense & Contract Closing Buy-Off',
        milestoneCompetency: 'Defend commercial proposal pricing structure, service level agreements, and contract terms before corporate panel.',
        standards: ['Incoterms 2020', 'USMCA Commercial Regulations']
      },
      {
        theoryTitle: 'International Go-to-Market Strategy & Omnichannel Growth',
        theoryCompetency: 'Synthesize market entry strategies, export marketing logistics, localized pricing strategies, and influencer growth loops.',
        englishTitle: 'Executive Marketing Pitch, Capstone Defense & Presentation',
        englishCompetency: 'Deliver structured 5-minute technical Go-to-Market executive pitches with persuasive acoustic cadence.',
        labTitle: 'Capstone Multi-Channel Commercial Campaign Board Exam',
        labCompetency: 'Resolve multi-variable commercial crises across concurrent budget cuts, ad channel bans, and competitive price wars.',
        milestoneTitle: 'Master Commercial Strategy Fellowship & W3C Credential',
        milestoneCompetency: 'Final oral Socratic defense before autonomous AI mentor tribunal for graduation accreditation.',
        standards: ['W3C Open Badges 3.0', 'American Marketing Association']
      }
    ]),

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
      if (!careerId) careerId = 'upbc-mecatronica';

      if (CAREER_PATHS[careerId]) {
        return CAREER_PATHS[careerId];
      }

      // Check if it is a TSU specialty ID (e.g. tsu-animacion-2d, tsu-robotica)
      if (typeof root.STEMOS_CAREER_TRACKS !== 'undefined') {
        const c = root.STEMOS_CAREER_TRACKS.getCareerById(careerId);
        if (c && c.parentCareerId && CAREER_PATHS[c.parentCareerId]) {
          const parentPath = CAREER_PATHS[c.parentCareerId];
          CAREER_PATHS[careerId] = {
            ...parentPath,
            careerId: careerId,
            careerName: c.name,
            tsuSpecialty: c.tsuSpecialty
          };
          return CAREER_PATHS[careerId];
        }
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
