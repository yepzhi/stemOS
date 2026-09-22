const fs = require('fs');
const path = require('path');

const coursesPath = path.join(__dirname, '..', 'content/courses.js');
let content = fs.readFileSync(coursesPath, 'utf8');

// Load data into a sandbox
const vm = require('vm');
const ctx = { window: {}, module: { exports: {} } };
vm.runInNewContext(content, ctx);
const courses = ctx.LXP_COURSES || ctx.module.exports;

// 1. Cybersecurity: cyber-m4-r2
const cyberTrack = courses['cybersecurity'];
const cyberM4 = cyberTrack.modules.find(m => m.id === 'cyber-m4');
if (cyberM4 && !cyberM4.readings.some(r => r.id === 'cyber-m4-r2')) {
  cyberM4.readings.push({
    id: 'cyber-m4-r2',
    title: 'Applied Lab: SIEM Telemetry, Suricata NIDS & Automated Incident Triage',
    duration: '15 min',
    content: `
> **Laboratory Benchmark & Operational Standard**: Aligned with **NIST SP 800-61 Rev. 2 (Computer Security Incident Handling Guide)** and **MITRE ATT&CK Enterprise Matrix**. Prepares SOC Tier 2 analysts and plant cybersecurity engineers to configure Network Intrusion Detection Systems (NIDS) and correlate telemetry in Security Information and Event Management (SIEM) pipelines.

# Applied Laboratory: SIEM Telemetry, Suricata NIDS & Automated Incident Triage

In critical operational technology (OT) and nearshoring industrial environments, passive network monitoring is essential because active port scanning can inadvertently fault sensitive Programmable Logic Controllers (PLCs). This lab focuses on passive packet capture, signature-based NIDS alerting, and automated SIEM correlation.

## 1. Network Tap Architecture & SPAN Port Mirroring
To inspect operational traffic without inserting inline latency or introducing a single point of failure (SPOF):
1. **Hardware Network TAPs (Test Access Points)**: Optical or copper TAPs physically split the physical layer signal, transmitting an exact duplicate of full-duplex traffic to an out-of-band monitoring appliance.
2. **Switch Port Analyzer (SPAN / Mirroring)**: Managed industrial switches duplicate traffic from internal VLANs to a designated promiscuous interface. Caution is required to avoid SPAN buffer oversubscription during bursty traffic events.

## 2. Suricata NIDS Rule Construction for Industrial Protocols
Suricata analyzes network packets against defined rule sets to detect malicious payloads, protocol anomalies, and unauthorized Modbus/CIP function codes. A representative industrial defense rule:
\`\`\`suricata
alert tcp $EXTERNAL_NET any -> $HOME_NET 502 (msg:"OT-SECURITY: Unauthorized Modbus Coil Write Attempt"; flow:to_server,established; content:"|00 00 00 00 00 06|"; offset:0; content:"|05|"; offset:7; depth:1; classtype:policy-violation; sid:1000852; rev:1;)
\`\`\`
This rule triggers when an external host issues Modbus Function Code 05 (\`Force Single Coil\`) targeting actuators on port 502, flagging potential physical tampering before setpoints are modified.

## 3. SIEM Ingestion & Elastic/Splunk Correlation Pipeline
1. **Log Normalization**: Raw PCAP metadata, Syslog, and Zeek connection records are mapped to the **Elastic Common Schema (ECS)** or Splunk Common Information Model (CIM).
2. **Correlation Logic**: An alert triggers when an unrecognized MAC address initiates an ARP request, followed within 60 seconds by TCP SYN packets across multiple industrial ports (MITRE ATT&CK T1046 - Network Service Discovery).
3. **Automated Triage (SOAR Playbook)**: The Security Orchestration, Automation, and Response (SOAR) engine creates a high-priority ticket, isolates the infected jump box via 802.1X VLAN steering, and notifies the on-call industrial controls lead.

---
> **Key Takeaway**: Defending smart manufacturing requires continuous telemetry correlation across **physical taps, Suricata signature inspection, and normalized SIEM workflows**. Rapid incident triage mitigates downtime and prevents cyber-physical damage.
`,
    vocabulary: [
      {
        en: 'Network Tap',
        es: 'Punto de Acceso de Red (TAP de Hardware)',
        definition: 'Dedicated hardware device providing access to data flowing across a computer network without modifying the original data stream.',
        ipa: '/ˈnɛt.wɜːrk tæp/',
        collocations: ['passive optical tap', 'SPAN port mirroring', 'fail-safe bypass TAP']
      },
      {
        en: 'Intrusion Detection System (IDS)',
        es: 'Sistema de Detección de Intrusiones (IDS)',
        definition: 'Software or hardware appliance monitoring network traffic for malicious activity or policy violations, producing telemetry alerts.',
        ipa: '/ɪnˈtruː.ʒən dɪˈtɛk.ʃən ˈsɪs.təm/',
        collocations: ['signature-based NIDS', 'anomaly detection threshold', 'deploy Suricata sensors']
      },
      {
        en: 'Log Normalization',
        es: 'Normalización de Registros',
        definition: 'Process of transforming heterogeneous log events from varied sources into a consistent, standardized data schema for cross-correlation.',
        ipa: '/lɔːɡ ˌnɔːr.mə.ləˈzeɪ.ʃən/',
        collocations: ['Elastic Common Schema (ECS)', 'normalize telemetry streams', 'CIM field mapping']
      },
      {
        en: 'Incident Triage',
        es: 'Clasificación y Triaje de Incidentes',
        definition: 'Systematic process of prioritizing cybersecurity alerts based on severity, blast radius, and potential operational impact on production.',
        ipa: '/ˈɪn.sɪ.dənt ˈtriː.ɑːʒ/',
        collocations: ['automated triage playbook', 'isolate compromised endpoint', 'rapid containment triage']
      }
    ],
    questions: [
      {
        q: 'Why are hardware network TAPs preferred over active inline scanners in operational technology (OT) plant networks?',
        options: [
          'Because active network scanners cost less and require no cabling',
          'Because active port scanning can overload fragile legacy PLCs and introduce latency, whereas passive TAPs provide zero-risk out-of-band monitoring',
          'Because hardware TAPs encrypt all corporate email automatically',
          'Because TAPs eliminate the need for firewalls completely'
        ],
        answer: 1,
        explanation: 'Legacy industrial PLCs often utilize lightweight TCP/IP stacks that can freeze or trigger emergency shutdowns when subjected to aggressive port scanning. Passive hardware TAPs physically mirror packet streams without injecting any packets or introducing single points of failure.'
      },
      {
        q: 'In the Suricata rule example, what does inspecting Function Code 05 over port 502 specifically aim to detect?',
        options: [
          'A DNS resolution query from a workstation',
          'An unauthenticated Modbus attempt to force/write a physical relay or coil on machinery',
          'A routine firmware download via HTTPS',
          'A Wi-Fi connection handshake'
        ],
        answer: 1,
        explanation: 'Port 502 is the standard port for Modbus TCP. Function Code 05 corresponds to "Force Single Coil," which commands a physical binary output (such as opening a valve or turning on a motor). Alerting on unauthorized writes prevents unauthorized physical disruption.'
      },
      {
        q: 'What is the primary benefit of mapping heterogeneous security logs to a standard schema like ECS or CIM in a SIEM?',
        options: [
          'It reduces the font size of the dashboard display',
          'It allows cross-source correlation rules to query diverse logs (firewalls, endpoints, NIDS) using uniform field names like source.ip and user.name',
          'It deletes old log files to save hard drive space',
          'It automatically fixes broken network cables'
        ],
        answer: 1,
        explanation: 'Log normalization ensures that regardless of whether a log originates from Suricata, a Cisco switch, or a Windows server, key entities are indexed identically, enabling seamless real-time correlation and automated threat hunting.'
      },
      {
        q: 'What action should an automated SOAR playbook execute first upon confirming a critical malware beacon from an industrial jump box?',
        options: [
          'Format all hard drives in the entire factory immediately',
          'Execute network microsegmentation isolation (e.g. via 802.1X quarantine VLAN) while preserving memory for forensic triage',
          'Post a public message on social media',
          'Ignore the alert until the weekly review meeting'
        ],
        answer: 1,
        explanation: 'Under NIST SP 800-61 containment protocols, isolating the infected system from the network stops lateral movement and command-and-control communication while leaving volatile RAM intact for digital forensics analysis.'
      }
    ]
  });
  console.log('[UPDATED] Injected cyber-m4-r2');
}

// 2. AI/ML: ai-m1-r2
const aiTrack = courses['ai-ml'];
const aiM1 = aiTrack.modules.find(m => m.id === 'aiml-m1');
if (aiM1 && !aiM1.readings.some(r => r.id === 'aiml-m1-r2')) {
  aiM1.readings.push({
    id: 'aiml-m1-r2',
    title: 'Applied Lab: Production Inference Benchmarking, Quantization & Latency-Accuracy Tradeoffs',
    duration: '14 min',
    content: `
> **Industry Benchmark & Architecture Standard**: Aligned with **MLPerf Inference Standards** and **NVIDIA TensorRT / ONNX Runtime** engineering guidelines. Guides AI engineers through optimizing foundation models for low-latency edge deployment in automated manufacturing and robotics.

# Applied Laboratory: Production Inference Benchmarking, Quantization & Latency-Accuracy Tradeoffs

Deploying deep neural networks in real-time industrial robotics, computer vision quality control, and edge gateways requires optimizing between memory footprint, computational throughput, and numerical precision.

## 1. Key Performance Indicators: TTFT, Throughput & Memory Bandwidth
When deploying AI models for defect classification or natural language instructions:
1. **Time to First Token (TTFT)**: Measures prompt evaluation latency. In automated inspection, prompt processing corresponds to the time required to preprocess high-resolution sensor frames.
2. **Inter-Token Latency (ITL)** / **Inference Time per Sample**: The duration needed to generate consecutive output tokens or bounding-box coordinates.
3. **Memory Bandwidth Bottlenecks**: Modern large models are predominantly memory-bandwidth bound rather than compute-bound (FLOP bound). Moving weights from High Bandwidth Memory (HBM) to compute registers consumes up to 80% of inference energy.

## 2. Model Compression: Post-Training Quantization (PTQ) vs. QAT
Floating-point 32-bit (FP32) tensors offer high dynamic range but demand massive memory and compute resources:
- **FP16 / BF16 (Half-Precision)**: Halves memory usage from 4 bytes to 2 bytes per parameter with negligible accuracy loss across most transformer layers.
- **INT8 Quantization**: Maps continuous weights and activations to 8-bit signed integers (\`[-128, 127]\`) using scale factors and zero-point offsets:
  $$q = \\text{clamp}\\left(\\text{round}\\left(\\frac{x}{S}\\right) + Z, -128, 127\\right)$$
- **AWQ (Activation-aware Weight Quantization)**: Preserves salient weight channels that correspond to high-magnitude activations, allowing 4-bit (INT4) weight compression without perplexity degradation.

## 3. KV Cache Management & PagedAttention
In autoregressive inference, caching previous Key and Value projection matrices avoids recalculating attention over past tokens:
1. **Memory Growth**: Without optimization, KV cache size scales linearly with sequence length and batch size:
   $$\\text{Memory}_{KV} = 2 \\times b \\times s \\times l \\times h \\times d \\times \\text{bytes}$$
2. **PagedAttention**: Partitions the continuous KV cache into non-contiguous virtual memory blocks (analogous to virtual memory OS paging), eliminating memory fragmentation and enabling up to a 4x increase in concurrent batch throughput.

---
> **Key Takeaway**: High-performance AI engineering requires balancing **precision quantization (INT8/FP4)** with **efficient memory paging (PagedAttention, TensorRT)** to meet millisecond-level SLAs in industrial automation.
`,
    vocabulary: [
      {
        en: 'Post-Training Quantization (PTQ)',
        es: 'Cuantización Posterior al Entrenamiento (PTQ)',
        definition: 'Technique that reduces model precision (e.g. FP32 to INT8) after training has concluded without requiring full retraining from scratch.',
        ipa: '/poʊst ˈtreɪnɪŋ ˌkwɑːntɪzaɪˈzeɪʃən/',
        collocations: ['PTQ calibration dataset', 'INT8 quantization error', 'zero-shot PTQ']
      },
      {
        en: 'Time to First Token (TTFT)',
        es: 'Tiempo hasta el Primer Token (TTFT)',
        definition: 'Latency metric capturing the time elapsed from user request dispatch to the generation of the first model response token.',
        ipa: '/taɪm tuː fɜːrst ˈtoʊkən/',
        collocations: ['reduce TTFT latency', 'prefill phase benchmarking', 'sub-100ms TTFT SLA']
      },
      {
        en: 'KV Cache',
        es: 'Caché de Claves y Valores (KV Cache)',
        definition: 'Memory buffer storing intermediate key and value tensor states in attention mechanisms to prevent redundant matrix re-computations.',
        ipa: '/keɪ viː kæʃ/',
        collocations: ['PagedAttention memory layout', 'KV cache compression', 'dynamically allocated KV blocks']
      },
      {
        en: 'Memory Bandwidth',
        es: 'Ancho de Banda de Memoria',
        definition: 'Rate at which data can be read from or stored into system memory by the GPU or AI acceleration silicon.',
        ipa: '/ˈmɛm.ər.i ˈbænd.wɪdtθ/',
        collocations: ['HBM3e memory bandwidth', 'bandwidth-bound kernels', 'saturate memory bus']
      }
    ],
    questions: [
      {
        q: 'Why does INT8 quantization dramatically accelerate AI inference throughput on modern GPUs and edge NPUs?',
        options: [
          'Because INT8 deletes half of the model layers completely',
          'Because 8-bit integers require 4x less memory bandwidth than FP32 and can leverage high-throughput tensor core matrix multiplication (DP4A/Tensor Cores)',
          'Because INT8 allows the model to run without electrical power',
          'Because integers generate more colorful images'
        ],
        answer: 1,
        explanation: 'Reducing precision from 32-bit floating point to 8-bit integers cuts memory traffic by 75%, alleviating memory bandwidth saturation and allowing dedicated INT8 systolic tensor hardware to execute higher operations per clock cycle.'
      },
      {
        q: 'What is the primary operational objective of PagedAttention in serving frameworks like vLLM?',
        options: [
          'To format model responses into printable PDF pages',
          'To eliminate internal memory fragmentation by allocating KV cache tensors into virtual memory blocks, maximizing concurrent batch capacity',
          'To speed up CPU clock speed via overclocking',
          'To encrypt internet search queries'
        ],
        answer: 1,
        explanation: 'PagedAttention applies operating system virtual memory paging concepts to LLM KV caches. Rather than allocating contiguous pre-allocated buffers, it dynamically allocates small blocks, reducing wasted memory and enabling substantially higher batch sizes.'
      },
      {
        q: 'Which phase of transformer inference is typically memory-bandwidth bound rather than compute bound?',
        options: [
          'The initial prompt prefill phase where thousands of tokens are processed simultaneously',
          'The token generation (decoding) phase where single tokens are generated sequentially while reloading all model weights each step',
          'The physical packaging of the GPU in cardboard',
          'The downloading of the dataset over Ethernet'
        ],
        answer: 1,
        explanation: 'During autoregressive token decoding (batch size 1), all model weights must be loaded from GPU High-Bandwidth Memory (HBM) into SRAM/registers just to process a single token, causing the memory bus to saturate before compute units reach full utilization.'
      },
      {
        q: 'How does Activation-aware Weight Quantization (AWQ) protect model accuracy during 4-bit compression?',
        options: [
          'By doubling the learning rate during backward propagation',
          'By identifying the top 1% salient weight channels that correlate with large activation magnitudes and maintaining them at higher precision or scaling them up',
          'By converting the entire model into text files',
          'By only running the model on weekends'
        ],
        answer: 1,
        explanation: 'AWQ discovered that not all weights are equally important; protecting the small fraction (0.5% to 1%) of weights associated with high-magnitude activation channels prevents distortion during 4-bit compression without requiring retraining.'
      }
    ]
  });
  console.log('[UPDATED] Injected ai-m1-r2');
}

// 3. Aerospace: aero-m1-r2
const aeroTrack = courses['aerospace'];
const aeroM1 = aeroTrack.modules.find(m => m.id === 'aero-m1');
if (aeroM1 && !aeroM1.readings.some(r => r.id === 'aero-m1-r2')) {
  aeroM1.readings.push({
    id: 'aero-m1-r2',
    title: 'Applied Lab: AS9100 Rev D Quality Protocols, Ultrasonic NDT & Composite Layup Inspection',
    duration: '15 min',
    content: `
> **Aerospace Compliance Standard**: Aligned with **AS9100 Rev D (Quality Management Systems - Requirements for Aviation, Space and Defense Organizations)** and **ASTM E2580 (Standard Practice for Ultrasonic Testing of Flat Panel Composites)**. Prepares aerospace structures engineers to implement rigorous quality inspection protocols.

# Applied Laboratory: AS9100 Rev D Quality Protocols, Ultrasonic NDT & Composite Layup Inspection

Commercial and defense aircraft manufacturing utilizes carbon-fiber-reinforced polymers (CFRP) to maximize specific strength and fatigue resistance. Because composite materials are formed simultaneously with the structural part during autoclave cure cycles, quality control must encompass raw prepreg storage, automated fiber placement (AFP), and non-destructive testing (NDT).

## 1. AS9100 Rev D Quality Gates in Composite Fabrication
AS9100 establishes stringent traceability and risk management imperatives:
1. **Foreign Object Debris (FOD) Prevention (Clause 8.1.4)**: Cleanroom layup zones require positive air pressure, strict tooling inventories, and anti-static poly-film peels to prevent particulate entrapment between plies.
2. **First Article Inspection (FAI - AS9102)**: Complete dimensional and mechanical verification of the initial manufacturing run before authorizing serialized production.
3. **Prepreg Out-Time Tracking**: Thermoset epoxy prepregs have a shelf life at -18°C and a strictly monitored cumulative "out-time" at room temperature (e.g., maximum 240 hours) to prevent premature resin polymerization prior to consolidation.

## 2. Non-Destructive Testing (NDT) Modalities for Laminates
Unlike metal alloys that exhibit isotropic grain structures, composites are anisotropic, making visual inspection insufficient to detect internal flaws:
- **Phased Array Ultrasonic Testing (PAUT)**: Multi-element transducer probes emit phased sound waves that penetrate laminate plies. Time-of-flight and amplitude analysis reveal delaminations, resin-rich pockets, and porosity.
- **Pulse-Echo C-Scan**: Translates ultrasonic return echoes into a 2D planar map of the part. Attenuation spikes highlight unbonded areas between consecutive carbon plies.
- **X-ray Computed Tomography (CT)**: High-resolution volumetric 3D reconstruction resolving micro-void percentages and fiber waviness (wrinkling) in high-stress wing spar radii.

## 3. Autoclave Cure Kinetics & Void Fraction Control
Consolidation under high pressure and temperature drives out volatile gases and bonds plies:
- **Vacuum Debulking**: Periodic vacuum bagging cycles during layup remove entrapped air pockets between ply consolidation steps.
- **Hydrostatic Autoclave Pressure**: Applying 6 to 7 bars of nitrogen gas pressure during the resin flow phase compresses micro-voids into solution, guaranteeing a total void content below 1.0% per aerospace structural certification standards.

---
> **Key Takeaway**: Aerospace manufacturing excellence demands integrating **AS9100 traceability, autoclave cure process kinetics, and Phased Array Ultrasonic Testing (PAUT)** to certify zero-defect composite primary flight structures.
`,
    vocabulary: [
      {
        en: 'Foreign Object Debris (FOD)',
        es: 'Desechos de Objetos Extraños (FOD)',
        definition: 'Any substance, debris, or foreign matter that could cause damage to aircraft systems, engines, or composite structures.',
        ipa: '/ˈfɔːr.ən ˈɑːb.dʒɛkt ˈdɛb.riː/',
        collocations: ['strict FOD containment zone', 'FOD prevention protocol', 'cleanroom FOD audit']
      },
      {
        en: 'Non-Destructive Testing (NDT)',
        es: 'Ensayos No Destructivos (NDT)',
        definition: 'Analysis techniques used to evaluate the structural integrity and properties of materials without causing permanent physical damage.',
        ipa: '/nɑːn dɪˈstrʌk.tɪv ˈtɛs.tɪŋ/',
        collocations: ['phased array ultrasonic NDT', 'certify Level II NDT inspector', 'pulse-echo C-scan inspection']
      },
      {
        en: 'Prepreg Out-Time',
        es: 'Tiempo Fuera de Refrigeración de Preimpregnados',
        definition: 'Accumulated time that resin-impregnated fiber material spends outside controlled sub-zero freezer storage before autoclave curing.',
        ipa: '/ˈpriːprɛɡ aʊt taɪm/',
        collocations: ['track prepreg out-time', 'resin gelation threshold', 'sub-zero freezer log']
      },
      {
        en: 'Delamination',
        es: 'Delaminación de Compuestos',
        definition: 'Structural failure mode where adjacent reinforcing plies within a laminated composite separate along their interface.',
        ipa: '/diːˌlæm.əˈneɪ.ʃən/',
        collocations: ['interlaminar delamination', 'sub-surface impact delamination', 'ultrasonic delamination mapping']
      }
    ],
    questions: [
      {
        q: 'Why must composite prepregs have their cumulative "out-time" strictly tracked prior to autoclave curing?',
        options: [
          'Because prepregs absorb sunlight and change color',
          'Because the reactive epoxy resin slowly cures at room temperature; exceeding allowable out-time prevents proper resin flow and ply consolidation during cure',
          'Because prepregs grow heavier when exposed to air',
          'Because prepregs evaporate completely within 24 hours'
        ],
        answer: 1,
        explanation: 'Thermoset prepregs undergo slow chemical polymerization at ambient temperatures. If out-time limits are breached, resin viscosity increases, preventing adequate wetting, flow, and consolidation during the autoclave cycle, resulting in unbonded dry plies and structural rejection.'
      },
      {
        q: 'Which NDT technique utilizes multi-element transducers to produce real-time cross-sectional imagery of composite delaminations?',
        options: [
          'Visual inspection with a magnifying glass',
          'Phased Array Ultrasonic Testing (PAUT)',
          'Hammer tap testing with an iron hammer',
          'Weighing the component on an industrial scale'
        ],
        answer: 1,
        explanation: 'Phased Array Ultrasonic Testing (PAUT) coordinates multiple piezo-electric transducer elements with precise electronic delays, sweeping acoustic beams across the laminate to create high-resolution sectional and volumetric scans of internal interfaces.'
      },
      {
        q: 'Under AS9100 Rev D, what is the mandatory purpose of a First Article Inspection (FAI) per AS9102?',
        options: [
          'To celebrate the opening of a new factory with a press conference',
          'To provide verified, documented evidence that all engineering design and specification requirements are fully understood, accounted for, and produced correctly by the manufacturing process',
          'To estimate shipping tax for international orders',
          'To train new security guards on campus'
        ],
        answer: 1,
        explanation: 'AS9102 First Article Inspection requires exhaustive 100% verification of all drawing dimensions, material certifications, special process validations, and tooling tolerances on initial parts before mass production begins.'
      },
      {
        q: 'What is the acceptable threshold for total structural void content in certified primary aerospace composite laminates?',
        options: [
          'Typically under 1.0% to 1.5% to prevent stress concentration and shear failure',
          'Around 25% to make the airplane lighter',
          'Between 40% and 50% for maximum flexibility',
          'Void content is not measured in aerospace'
        ],
        answer: 0,
        explanation: 'Aerospace structural design codes require void content strictly below 1.0% to 1.5%. Micro-voids act as critical stress risers that drastically reduce interlaminar shear strength and compressive fatigue endurance.'
      }
    ]
  });
  console.log('[UPDATED] Injected aero-m1-r2');
}

// 4. Biotechnology: bio-m1-r2
const bioTrack = courses['biotechnology'];
const bioM1 = bioTrack.modules.find(m => m.id === 'biotech-m1');
if (bioM1 && !bioM1.readings.some(r => r.id === 'biotech-m1-r2')) {
  bioM1.readings.push({
    id: 'biotech-m1-r2',
    title: 'Applied Lab: Bioreactor Scale-Up, Oxygen Mass Transfer (kLa) & In-Line Raman PAT',
    duration: '15 min',
    content: `
> **Biopharmaceutical Manufacturing Standard**: Aligned with **FDA 21 CFR Part 11**, **ICH Q8 (Pharmaceutical Development)**, and **cGMP (Current Good Manufacturing Practice)**. Equips bioprocess engineers to optimize stirred-tank bioreactor parameters during technology transfer from bench-scale to 2,000-liter production vessels.

# Applied Laboratory: Bioreactor Scale-Up, Oxygen Mass Transfer (kLa) & In-Line Raman PAT

Scaling recombinant protein and monoclonal antibody (mAb) expression from 5-liter laboratory benchtop vessels to commercial 2,000-liter single-use bioreactors (SUB) is a major engineering milestone. As vessel geometry expands, maintaining uniform physical and chemical micro-environments is critical to prevent shear-induced cell lysis while satisfying oxygen uptake rates.

## 1. Dimensional Similitude & Geometric Scale-Up Criteria
When scaling agitated bioreactors, engineers evaluate conflicting physical constraints:
1. **Constant Volumetric Power Input ($P/V$)**: Maintains turbulent energy dissipation rate but can increase impeller tip speed, creating high hydrodynamic shear stress that damages fragile mammalian CHO (Chinese Hamster Ovary) cell membranes.
2. **Constant Impeller Tip Speed ($v_{tip} = \\pi N D$)**: Protects shear-sensitive cell lines but reduces bulk mixing times, resulting in spatial pH and nutrient gradients.
3. **Oxygen Mass Transfer Coefficient ($k_L a$)**: Governs the rate at which gaseous oxygen dissolves into liquid fermentation broth:
   $$\\text{OTR} = k_L a (C^* - C_L)$$
   Where $C^*$ is the equilibrium oxygen saturation concentration and $C_L$ is the actual dissolved oxygen (DO) concentration.

## 2. Process Analytical Technology (PAT) & Real-Time Raman Spectroscopy
Modern biomanufacturing replaces manual off-line sampling with continuous in-line optical instrumentation:
- **In-Line Raman Spectroscopy**: Immersion laser probes emit monochromatic light into the broth. Inelastic Raman scattering spectra reveal real-time concentrations of glucose, lactate, glutamate, and viable cell density (VCD) without consuming broth volume or risking microbial contamination.
- **Off-Gas Mass Spectrometry**: Real-time analysis of oxygen consumption ($OUR$) and carbon dioxide evolution ($CER$) provides the Respiratory Quotient ($RQ$), indicating metabolic shifts from oxidative phosphorylation to lactic fermentation.

## 3. Clean-in-Place (CIP) & Sterilization-in-Place (SIP) Validation
To satisfy cGMP sterility mandates in stainless steel multi-use systems:
1. **CIP Regimen**: High-pressure spray balls circulate 0.5N sodium hydroxide (NaOH) at 65°C to saponify lipids and degrade residual cell debris, followed by water-for-injection (WFI) flushes.
2. **SIP Thermal Lethality**: Saturated clean steam at 121°C is held for a validated duration to ensure a minimum sterility assurance level (SAL) of $10^{-6}$, monitored by calibrated RTDs placed at hydraulic low points.

---
> **Key Takeaway**: Bioprocess scale-up synthesizes **fluid dynamics (Reynolds numbers, shear stress), gas mass transfer ($k_L a$), and in-line optical PAT** to maintain high cellular viability and product titer in compliance with cGMP regulations.
`,
    vocabulary: [
      {
        en: 'Volumetric Mass Transfer Coefficient (kLa)',
        es: 'Coeficiente Volumétrico de Transferencia de Masa (kLa)',
        definition: 'Parameter characterizing the rate at which gas species (such as oxygen) dissolve across the gas-liquid interface into liquid broth.',
        ipa: '/ˌvɑːljəˈmɛtrɪk mæs ˈtrænsfər koʊəˈfɪʃənt/',
        collocations: ['measure kLa via dynamic method', 'maximize kLa with micro-spargers', 'constant kLa scale-up criterion']
      },
      {
        en: 'Process Analytical Technology (PAT)',
        es: 'Tecnología Analítica de Procesos (PAT)',
        definition: 'System for designing, analyzing, and controlling manufacturing through timely measurements of critical quality and performance attributes.',
        ipa: '/ˈprɑː.sɛs ˌæn.əˈlɪt.ɪ.kəl tɛkˈnɑː.lə.dʒi/',
        collocations: ['implement in-line PAT sensors', 'Raman spectroscopy PAT probe', 'closed-loop PAT feedback control']
      },
      {
        en: 'Chinese Hamster Ovary (CHO) Cells',
        es: 'Células de Ovario de Hámster Chino (Células CHO)',
        definition: 'Epithelial cell line derived from Cricetulus griseus, widely utilized in industrial biomanufacturing to express humanized therapeutic proteins.',
        ipa: '/ˌtʃaɪˈniːz ˈhæmstər ˈoʊvəri sɛlz/',
        collocations: ['high-density CHO fed-batch culture', 'CHO cell viability threshold', 'recombinant mAb expression in CHO']
      },
      {
        en: 'Sterilization-in-Place (SIP)',
        es: 'Esterilización en Sitio (SIP)',
        definition: 'Automated thermal method of sterilizing process equipment using clean steam without dismantling components.',
        ipa: '/ˌstɛr.əl.əˈzeɪ.ʃən ɪn pleɪs/',
        collocations: ['validate SIP cycle lethality', 'clean steam SIP manifold', 'sterile barrier validation']
      }
    ],
    questions: [
      {
        q: 'Why is oxygen mass transfer (kLa) one of the most critical engineering constraints during bioreactor scale-up?',
        options: [
          'Because oxygen is poisonous to all mammalian cells',
          'Because oxygen has very low solubility in aqueous broth, yet high-density cell cultures require high oxygen uptake rates to sustain cellular respiration',
          'Because oxygen makes the bioreactor heavier as it fills',
          'Because oxygen extinguishes the bioreactor heater'
        ],
        answer: 1,
        explanation: 'Gaseous oxygen has very low solubility in water (approximately 7-8 mg/L at 37°C). Because high-density cultures consume oxygen rapidly, the transport rate across the bubble interface (governed by kLa) must equal or exceed the cell culture oxygen uptake rate (OUR) to avoid hypoxic apoptosis.'
      },
      {
        q: 'What distinct advantage does in-line Raman spectroscopy provide over traditional manual off-line sampling in biomanufacturing?',
        options: [
          'It replaces the need for electricity in the facility',
          'It enables continuous real-time measurement of multiple metabolites (glucose, lactate) without breaching vessel sterility or removing culture volume',
          'It changes the color of the final medication automatically',
          'It speeds up cell division by 500%'
        ],
        answer: 1,
        explanation: 'Traditional offline sampling requires removing aliquots from the bioreactor every 12 to 24 hours, introducing contamination risks and providing only delayed data. In-line Raman PAT delivers continuous, non-destructive optical molecular fingerprints in real time.'
      },
      {
        q: 'When scaling up a bioreactor with shear-sensitive mammalian cells, what risk arises from keeping volumetric power input (P/V) constant?',
        options: [
          'The vessel turns into solid ice',
          'Impeller tip speeds increase substantially in larger vessels, potentially exceeding shear thresholds and rupturing fragile cell membranes',
          'The cells stop absorbing carbohydrates',
          'The steam boiler pressure drops to zero'
        ],
        answer: 1,
        explanation: 'At constant P/V, larger diameter impellers rotate with significantly higher peripheral tip speeds. High shear forces in the impeller discharge stream can lyse mammalian cells (which lack rigid plant or bacterial cell walls).'
      },
      {
        q: 'What is the required Sterility Assurance Level (SAL) validated during bioprocess Sterilization-in-Place (SIP) thermal cycles?',
        options: [
          '50% probability of surviving organisms',
          '1 in 1,000,000 (10^-6) probability of a single viable non-sterile unit surviving',
          'Zero percent, which is mathematically impossible',
          '10% surviving organisms'
        ],
        answer: 1,
        explanation: 'Under cGMP standards for parenteral pharmaceuticals, an effective thermal sterilization cycle must achieve a Sterility Assurance Level of 10^-6, meaning the theoretical probability of a surviving microorganism is less than one in a million.'
      }
    ]
  });
  console.log('[UPDATED] Injected bio-m1-r2');
}

// 5. Semiconductors: semi-m2-r2
const semiTrack = courses['semiconductors'];
const semiM2 = semiTrack.modules.find(m => m.id === 'semi-m2');
if (semiM2 && !semiM2.readings.some(r => r.id === 'semi-m2-r2')) {
  semiM2.readings.push({
    id: 'semi-m2-r2',
    title: 'Applied Lab: FinFET to Gate-All-Around (GAA) Nanosheet Architecture & Quantum Tunneling',
    duration: '15 min',
    content: `
> **Semiconductor Device Physics Standard**: Aligned with **IEEE International Roadmap for Devices and Systems (IRDS)**. Prepares semiconductor device and process integration engineers to understand sub-3nm transistor scaling, gate electrostatic control, and quantum mechanical leakage mechanisms.

# Applied Laboratory: FinFET to Gate-All-Around (GAA) Nanosheet Architecture & Quantum Tunneling

For over a decade, 3D FinFET (Fin Field-Effect Transistor) architectures powered semiconductor advancement by wrapping the gate electrode around three sides of a vertical silicon fin. However, as physical gate lengths scaled below 12 nanometers (corresponding to commercial 3nm and 2nm nodes), short-channel effects, drain-induced barrier lowering (DIBL), and subthreshold leakage necessitated transitioning to **Gate-All-Around (GAA) Nanosheet** field-effect transistors.

## 1. Physical Limitations of FinFET at the 3nm Node
1. **Drain-Induced Barrier Lowering (DIBL)**: As the gate length shortens, the drain's electric field penetrates the channel, lowering the source-channel potential barrier and preventing the transistor from turning completely off.
2. **Fin Depletion & Aspect Ratio Limits**: Tall, thin fins suffer from mechanical bending during wet etching and chemical mechanical planarization (CMP). Furthermore, electrostatic control through only three surfaces fails to fully suppress leakage currents through the un-gated fin bottom.
3. **Subthreshold Swing ($SS$) Degradation**: At room temperature, thermodynamic physics dictates a theoretical minimum subthreshold swing of:
   $$SS = \\left(\\frac{k_B T}{q}\\right) \\ln(10) \\left(1 + \\frac{C_{dep}}{C_{ox}}\\right) \\approx 60\\,\\text{mV/decade}$$
   FinFETs at ultra-short nodes exhibit degraded $SS > 75\\,\\text{mV/decade}$, driving up static power dissipation.

## 2. Gate-All-Around (GAA) Nanosheet (MBCFET) Innovation
In GAA nanosheet transistors (termed Multi-Bridge-Channel FET or MBCFET by Samsung and RibbonFET by Intel):
- **4-Sided Electrostatic Surrounding**: Multiple horizontally stacked silicon nanosheet channels are completely surrounded on all four sides by the high-k metal gate (HKMG) stack.
- **Variable Channel Width ($W_{eff}$)**: Unlike FinFETs where channel width is quantized by integer numbers of fins, nanosheet lithography allows designers to continuously tune sheet width (e.g., from 15nm to 50nm) to optimize speed versus dynamic capacitance.
- **Inner Spacer Formation**: Atomic layer deposition (ALD) introduces low-k dielectric inner spacers between nanosheet levels, dramatically reducing parasitic gate-to-source and gate-to-drain capacitance.

## 3. Quantum Tunneling & Parasitic Interconnect Scaling
As gate oxide thicknesses drop below 1.5 nanometers:
1. **Quantum Direct Tunneling**: Electrons possess non-zero probability of tunneling directly through the potential barrier of the gate dielectric into the channel, causing exponential gate leakage current ($J_g$).
2. **Backside Power Delivery Network (BSPDN)**: At sub-2nm nodes, signal and power wiring on the front side of the wafer causes severe $IR$ drop and RC delays. Moving power supply lines ($V_{dd}$ and $V_{ss}$) to the backside of the wafer with Through-Silicon Vias (TSVs) reduces resistance losses by 20% and frees up front-side metal routing tracks.

---
> **Key Takeaway**: Leading-edge silicon manufacturing overcomes nanoscale physical limits through **GAA nanosheet architecture, atomic layer deposition of inner spacers, and Backside Power Delivery Networks (BSPDN)**.
`,
    vocabulary: [
      {
        en: 'Gate-All-Around (GAA) Transistor',
        es: 'Transistor con Compuerta Envolvente (GAA)',
        definition: 'Advanced transistor architecture where the gate electrode surrounds stacked horizontal nanosheet conductive channels on all four sides.',
        ipa: '/ɡeɪt ɔːl əˈraʊnd trænˈzɪs.tər/',
        collocations: ['stacked nanosheet GAA architecture', 'four-sided electrostatic gate control', 'sub-2nm GAA transition']
      },
      {
        en: 'Drain-Induced Barrier Lowering (DIBL)',
        es: 'Disminución de Barrera Inducida por Drenaje (DIBL)',
        definition: 'Short-channel effect in field-effect transistors where high drain voltages reduce the source-to-channel potential barrier.',
        ipa: '/dreɪn ɪnˈduːst ˈbær.i.ər ˈloʊ.ər.ɪŋ/',
        collocations: ['minimize DIBL leakage', 'short-channel DIBL metric', 'DIBL suppression via GAA']
      },
      {
        en: 'Backside Power Delivery Network (BSPDN)',
        es: 'Red de Distribución de Energía por la Cara Posterior (BSPDN)',
        definition: 'Manufacturing architecture separating power routing to the backside of the silicon wafer to eliminate front-side IR drop.',
        ipa: '/ˈbæk.saɪd ˈpaʊ.ər dɪˈlɪv.ər.i ˈnɛt.wɜːrk/',
        collocations: ['implement BSPDN power rails', 'through-silicon via (TSV) power taps', 'BSPDN resistance reduction']
      },
      {
        en: 'Subthreshold Swing (SS)',
        es: 'Pendiente Subumbral (SS)',
        definition: 'Metric indicating the gate voltage increase required to increase drain current by one order of magnitude below the threshold voltage.',
        ipa: '/sʌbˈθrɛʃ.hoʊld swɪŋ/',
        collocations: ['steep subthreshold swing', '60 mV/decade theoretical limit', 'subthreshold leakage minimization']
      }
    ],
    questions: [
      {
        q: 'Why does the Gate-All-Around (GAA) nanosheet architecture provide superior electrostatic control compared to FinFET at sub-3nm nodes?',
        options: [
          'Because GAA transistors are made from plastic rather than silicon',
          'Because the high-k metal gate surrounds the horizontal channel sheets on all four sides, completely eliminating un-gated leakage paths',
          'Because GAA transistors operate at absolute zero temperature',
          'Because GAA transistors do not require source or drain electrodes'
        ],
        answer: 1,
        explanation: 'FinFET gates cover the fin on three sides, leaving the bottom of the fin susceptible to leakage when scaled to sub-12nm gate lengths. GAA surrounds the nanosheets on all four surfaces, providing total electrostatic pinch-off and suppressing short-channel effects.'
      },
      {
        q: 'What is the theoretical physical lower limit for Subthreshold Swing (SS) in conventional silicon field-effect transistors at room temperature (300K)?',
        options: [
          '0 mV/decade',
          'Approximately 60 mV/decade, determined by the Boltzmann thermal distribution of electrons (kT/q * ln(10))',
          '1,000 mV/decade',
          'There is no limit; any voltage works'
        ],
        answer: 1,
        explanation: 'Due to the thermal Boltzmann distribution of carriers over a potential energy barrier, a classical MOSFET requires at least 60 millivolts of gate potential at 300 Kelvin to alter channel current by a factor of 10. Transistors approaching 60 mV/decade turn on and off with maximum efficiency.'
      },
      {
        q: 'What primary engineering problem is solved by moving power rails to the backside of the wafer via Backside Power Delivery (BSPDN)?',
        options: [
          'It makes the wafer transparent',
          'It separates high-current power lines from dense signal lines, mitigating severe IR voltage drop and freeing front-side metal layers for signal routing',
          'It allows chips to run without heat sinks',
          'It reduces the cost of cardboard packaging'
        ],
        answer: 1,
        explanation: 'At advanced nodes, power and signal routing compete for narrow front-side copper interconnects, creating immense parasitic resistance and IR voltage drops. Placing thick power rails on the polished backside connects directly to transistors via TSVs, dramatically improving power integrity.'
      },
      {
        q: 'What role do low-k inner spacers play between the stacked nanosheet channels in GAA transistors?',
        options: [
          'They allow the transistor to glow with light',
          'They isolate the gate metal from source/drain contact regions, drastically reducing parasitic capacitance and preventing leakage',
          'They act as tiny cooling fans inside the chip',
          'They store digital photos permanently'
        ],
        answer: 1,
        explanation: 'Inner spacers are dielectric barriers placed between nanosheet levels adjacent to source/drain epilayers. They prevent the gate metal from overlapping the source/drain, drastically reducing parasitic capacitive coupling that would otherwise degrade high-frequency switching performance.'
      }
    ]
  });
  console.log('[UPDATED] Injected semi-m2-r2');
}

// Generate the output file
const outputJS = `// stemOS Learning Experience Platform - Course Catalog
// Comprehensive Technical English (ESP) curriculum for high-tech engineering tracks.

var LXP_COURSES = ${JSON.stringify(courses, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LXP_COURSES;
}
`;

fs.writeFileSync(coursesPath, outputJS, 'utf8');
console.log('[SUCCESS] content/courses.js updated and written with new applied laboratory readings!');
