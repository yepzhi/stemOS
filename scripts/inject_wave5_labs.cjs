const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '..', 'content/courses.js');
let content = fs.readFileSync(coursesPath, 'utf8');

const ctx = { window: {}, module: { exports: {} } };
vm.runInNewContext(content, ctx);
const courses = ctx.LXP_COURSES || ctx.module.exports;

// 1. IT & Cloud Innovation: it-m7-r2
const itTrack = courses['it-innovation'];
const itM7 = itTrack.modules.find(m => m.id === 'it-m7');
if (itM7 && !itM7.readings.some(r => r.id === 'it-m7-r2')) {
  itM7.readings.push({
    id: 'it-m7-r2',
    title: 'Applied Lab: Zero Trust Architecture (NIST SP 800-207), Identity-Aware Proxy (IAP) & Microsegmentation',
    duration: '15 min',
    content: `
> **Cloud Cybersecurity Standard**: Aligned with **NIST SP 800-207 (Zero Trust Architecture)**, **CISA Zero Trust Maturity Model 2.0**, and **Cloud Security Alliance (CSA) Security Guidance**. Prepares enterprise security architects and DevSecOps engineers to enforce continuous verification, mutual TLS (mTLS) identity proxies, and eBPF-driven network microsegmentation.

# Applied Laboratory: Zero Trust Architecture, IAP & Microsegmentation

Traditional castle-and-moat network perimeters assume that any user or device inside the corporate local area network (LAN) or VPN is inherently trustworthy. In modern distributed cloud infrastructures and cross-border manufacturing supply chains, this assumption leads to lateral attacker movement following initial compromise. Zero Trust mandates a paradigm shift: **"Never trust, always verify."**

## 1. Core Principles of Zero Trust (NIST SP 800-207)
NIST SP 800-207 articulates three non-negotiable operational tenets:
1. **Verify Explicitly**: Authenticate and authorize every transaction based on all available data points, including user identity, device health posture, geographic context, firmware integrity, and real-time behavioral anomaly signals.
2. **Use Least Privilege Access**: Restrict access strictly with Just-In-Time (JIT) and Just-Enough-Access (JEA) permissions, leveraging adaptive risk-based conditional access policies.
3. **Assume Breach**: Minimize the blast radius by segmenting networks, encrypting all sessions end-to-end, and continuously analyzing telemetry for signs of compromise.

## 2. Zero Trust Control Plane: PEP vs. PDP
The architecture is structured around two distinct operational planes:
- **Policy Decision Point (PDP)**: The brain of the system. Composed of the Policy Engine (which evaluates access requests against security rules) and the Policy Administrator (which issues cryptographic access tokens or instructs enforcement nodes).
- **Policy Enforcement Point (PEP)**: The gatekeeper. Positioned inline between the client and enterprise resource.
- **Identity-Aware Proxy (IAP)**: A modern cloud PEP that intercepts incoming HTTP(S) and SSH/TCP traffic. Rather than granting network-layer VPN tunnels, an IAP verifies user identity via OAuth2/OIDC, checks device compliance (e.g., CrowdStrike/Intune EDR status), and terminates mTLS sessions at application Layer 7.

## 3. Network Microsegmentation & eBPF Telemetry
To prevent lateral movement within Kubernetes clusters and multi-cloud VPCs:
- **Default-Deny Ingress/Egress**: All inter-service pod-to-pod communications are blocked by default.
- **eBPF-Based Filtering (Cilium)**: Modern Linux kernels leverage Extended Berkeley Packet Filters (eBPF) running directly inside kernel space. This enables Layer 7 HTTP/gRPC API policy filtering and wireguard-based cryptographic encapsulation without the performance overhead of userspace iptables translation.

---
> **Key Takeaway**: Zero Trust replaces legacy perimeter firewalls with **continuous cryptographic verification, Identity-Aware Proxies (IAP), and kernel-level eBPF microsegmentation** to isolate threats and enforce absolute least privilege.
`,
    vocabulary: [
      {
        en: 'Policy Enforcement Point (PEP)',
        es: 'Punto de Aplicación de Políticas (PEP)',
        definition: 'Security component positioned directly in the communication path that intercepts, inspects, and enforces PDP access decisions.',
        ipa: '/ˈpɑː.lə.si ɛnˈfɔːrs.mənt pɔɪnt/',
        collocations: ['inline PEP proxy gateway', 'enforce PEP access token', 'terminate mTLS at PEP']
      },
      {
        en: 'Policy Decision Point (PDP)',
        es: 'Punto de Decisión de Políticas (PDP)',
        definition: 'Logical entity in Zero Trust architecture responsible for evaluating authorization requests against enterprise security policies.',
        ipa: '/ˈpɑː.lə.si dɪˈsɪʒ.ən pɔɪnt/',
        collocations: ['query centralized PDP engine', 'dynamic PDP risk evaluation', 'PDP policy authorization rules']
      },
      {
        en: 'Identity-Aware Proxy (IAP)',
        es: 'Proxy Consciente de la Identidad (IAP)',
        definition: 'Application-layer reverse proxy that validates user identity and device security posture before granting granular access to internal services.',
        ipa: '/aɪˈdɛn.tə.ti əˈwɛr ˈprɑːk.si/',
        collocations: ['deploy cloud IAP gateway', 'IAP context-aware access', 'replace legacy VPN with IAP']
      },
      {
        en: 'Network Microsegmentation',
        es: 'Microsegmentación de Red',
        definition: 'Security technique that divides data centers and cloud workloads into isolated, granular zones to prevent lateral movement of attackers.',
        ipa: '/ˈnɛt.wɜːrk ˌmaɪ.kroʊ.sɛɡ.mənˈteɪ.ʃən/',
        collocations: ['enforce eBPF microsegmentation', 'default-deny pod microsegmentation', 'restrict lateral attack movement']
      }
    ],
    questions: [
      {
        q: 'Under NIST SP 800-207 Zero Trust Architecture, what is the primary role of the Policy Decision Point (PDP)?',
        options: [
          'To physically route fiber optic cables in the data center',
          'To evaluate incoming access requests against security policies and behavioral risk signals, deciding whether access to the requested enterprise resource should be granted or denied',
          'To manufacture semiconductor memory chips',
          'To send promotional emails to customers'
        ],
        answer: 1,
        explanation: 'The PDP acts as the decision brain of Zero Trust. It ingests user identity, device health, threat intelligence, and enterprise policies to make an authoritative determination, which it then commands the Policy Enforcement Point (PEP) to execute.'
      },
      {
        q: 'How does an Identity-Aware Proxy (IAP) provide superior security compared to a traditional corporate Virtual Private Network (VPN)?',
        options: [
          'An IAP makes internet browsing completely free of charge',
          'A VPN grants broad network-layer (Layer 3/4) access to entire subnets upon login, whereas an IAP grants granular application-layer (Layer 7) access to specific authorized services only after verifying user identity and device posture',
          'An IAP eliminates the need for computer passwords entirely',
          'VPNs only function when the computer is connected to a printer'
        ],
        answer: 1,
        explanation: 'Legacy VPNs act like castle drawbridges: once an attacker breaches the VPN gateway, they have broad IP-level access to explore and compromise other servers. An IAP intercepts requests at Layer 7, granting access strictly on an application-by-application basis without exposing the underlying private network.'
      },
      {
        q: 'What does the Zero Trust foundational principle "Assume Breach" dictate in production cloud infrastructure design?',
        options: [
          'Engineers should give up on security because failure is inevitable',
          'Systems must be architected under the operational premise that adversaries already occupy the network, requiring end-to-end encryption, default-deny microsegmentation, and continuous anomaly telemetry',
          'Every computer in the office must be reformatted daily at 5 PM',
          'All software must be rewritten in assembly language'
        ],
        answer: 1,
        explanation: '"Assume Breach" forces architects to abandon perimeter trust. It demands robust internal defense-in-depth: limiting blast radius with microsegmentation, enforcing mutual TLS (mTLS) encryption on all internal traffic, and implementing automated continuous threat detection.'
      },
      {
        q: 'Why is eBPF (Extended Berkeley Packet Filter) preferred over traditional iptables for microsegmentation in high-density Kubernetes environments?',
        options: [
          'Because iptables was made illegal by international law',
          'Because eBPF runs custom sandboxed byte code directly in the Linux kernel, providing high-performance Layer 7 network visibility and routing without the sequential O(n) table lookup performance degradation of iptables',
          'Because eBPF only runs on battery power',
          'Because eBPF removes the need for operating system kernels'
        ],
        answer: 1,
        explanation: 'In large Kubernetes clusters with thousands of pods and frequent IP churning, iptables creates linear O(n) sequential rule evaluation chains that severely degrade network throughput and latency. eBPF utilizes constant-time O(1) hash maps and executes directly in kernel space with native Layer 7 awareness.'
      }
    ]
  });
  console.log('[UPDATED] Injected it-m7-r2');
}

// 2. Airforce & Aerospace Defense: af-m3-r2
const afTrack = courses['airforce-aerospace'];
const afM3 = afTrack.modules.find(m => m.id === 'af-m3');
if (afM3 && !afM3.readings.some(r => r.id === 'af-m3-r2')) {
  afM3.readings.push({
    id: 'af-m3-r2',
    title: 'Applied Lab: MIL-STD-1553B Avionics Bus, STANAG 5516 & Link 16 TADIL-J Protocol Stack',
    duration: '15 min',
    content: `
> **Military Avionics & Tactical Interoperability Standard**: Aligned with **MIL-STD-1553B (Digital Time Division Command/Response Multiplex Data Bus)**, **NATO STANAG 5516 (Tactical Data Exchange - Link 16)**, and **DoD Interface Standard MIL-STD-6016**. Prepares defense avionics systems integration engineers and mission systems operators to analyze high-reliability multiplex buses and real-time tactical datalinks.

# Applied Laboratory: MIL-STD-1553B Avionics Bus, STANAG 5516 & Link 16

Modern tactical strike aircraft (e.g. F-16, F/A-18, Eurofighter Typhoon) and aerospace defense platforms operate in highly contested electronic environments. Mission success requires deterministic, fault-tolerant digital avionics communication within the airframe (MIL-STD-1553B) seamlessly linked to coalition multi-domain networks via jam-resistant Link 16 tactical datalinks.

## 1. MIL-STD-1553B Multiplex Data Bus Architecture
MIL-STD-1553B defines a deterministic, dual-redundant serial bus operating at a transmission rate of $1.0\\,\\text{Mbit/s}$:
1. **Physical Layer**: Shielded twisted-wire pairs with transformer coupling to isolate individual terminal faults and suppress electromagnetic interference (EMI) from radar and engine ignition systems. Signals use differential Manchester II biphase coding.
2. **Terminal Functional Roles**:
   - **Bus Controller (BC)**: The sole master device authorized to initiate data transfers on the bus. It issues command words according to a pre-programmed cyclic schedule.
   - **Remote Terminal (RT)**: Avionics subsystems (Inertial Navigation Systems, Mission Computers, Radar altimeters, Flight Control Systems) that respond only when explicitly addressed by the BC. Up to 31 RTs can share a single bus.
   - **Bus Monitor (BM)**: Passive listener that records bus traffic for flight data recorders (black boxes) or post-mission tactical debriefing without transmitting.

## 2. Link 16 (TADIL-J / STANAG 5516) Tactical Datalink
Link 16 provides secure, jam-resistant, high-capacity digital data and voice exchange across joint air, naval, and ground coalition units:
- **TDMA (Time Division Multiple Access)**: Time is partitioned into epochs (12.8 minutes), frames (12 seconds), and 1,536 time slots per frame ($7.8125\\,\\text{ms}$ per slot). Terminals transmit in pre-assigned time slots, eliminating packet collisions.
- **Electronic Counter-Countermeasures (ECCM)**: Link 16 achieves anti-jam robustness by spreading transmissions over 51 discrete frequencies between 960 MHz and 1215 MHz, frequency hopping up to 77,000 hops per second.
- **J-Series Message Standard**: Structured binary message words representing common operational picture entities:
  - \`J2.2\`: Air Track position, altitude, velocity, and identification friend-or-foe (IFF).
  - \`J3.5\`: Surface / Ground combat point.
  - \`J12.0\`: Mission assignment and weapons engagement status.

## 3. Sensor-to-Shooter Latency Optimization
Modern multi-role fighters fuse radar, electro-optical targeting pods (FLIR), and Link 16 remote tracks into a single unified cockpit Tactical Situation Display. By eliminating voice radio coordination, sensor-to-shooter engagement times are compressed from minutes to sub-second automated designations.

---
> **Key Takeaway**: Military aerospace integration couples **deterministic fault-tolerant MIL-STD-1553B dual-redundant airframe avionics with jam-resistant NATO Link 16 TDMA frequency-hopping datalinks** to achieve total battlespace situational awareness.
`,
    vocabulary: [
      {
        en: 'Bus Controller (BC)',
        es: 'Controlador de Bus (BC en MIL-STD-1553B)',
        definition: 'The designated master terminal in a MIL-STD-1553B avionics bus that initiates all message transmissions and commands.',
        ipa: '/bʌs kənˈtroʊ.lər/',
        collocations: ['cyclic BC command schedule', 'redundant BC failover', 'BC-to-RT command word']
      },
      {
        en: 'Remote Terminal (RT)',
        es: 'Terminal Remoto (RT)',
        definition: 'Avionics subsystem device in a 1553 bus that responds to commands transmitted by the Bus Controller.',
        ipa: '/rɪˈmoʊt ˈtɜːr.mɪ.nəl/',
        collocations: ['RT status response word', 'addressable RT subaddress', 'transformer-coupled RT node']
      },
      {
        en: 'Time Division Multiple Access (TDMA)',
        es: 'Acceso Múltiple por División de Tiempo (TDMA)',
        definition: 'Channel access method that divides transmission time into discrete time slots, allowing multiple military units to share frequencies without interference.',
        ipa: '/taɪm dɪˈvɪʒ.ən ˈmʌl.tə.pəl ˈæk.sɛs/',
        collocations: ['Link 16 TDMA time slot', 'network synchronization TDMA frame', 'pre-assigned TDMA transmission capacity']
      },
      {
        en: 'Frequency Hopping Spread Spectrum (FHSS)',
        es: 'Espectro Ensanchado por Salto de Frecuencia',
        definition: 'Method of transmitting radio signals by rapidly switching a carrier among many frequency channels, providing anti-jam ECCM security.',
        ipa: '/ˈfriː.kwən.si ˈhɑː.pɪŋ sprɛd ˈspɛk.trəm/',
        collocations: ['tactical fast frequency hopping', 'jam-resistant FHSS waveform', '77000 hops per second']
      }
    ],
    questions: [
      {
        q: 'In a MIL-STD-1553B avionics multiplex data bus, what entity is exclusively authorized to initiate data transfers between subsystems?',
        options: [
          'Any Remote Terminal (RT) whenever it has data ready',
          'The Bus Controller (BC), which acts as the deterministic single master controlling all command/response message exchanges',
          'The ground control station via cellular radio',
          'The pilot by manually flipping an analog switch'
        ],
        answer: 1,
        explanation: 'MIL-STD-1553B is strictly a deterministic command/response architecture. No terminal is allowed to transmit on the bus unless commanded by the designated Bus Controller (BC), preventing data collisions and guaranteeing real-time predictability for flight-critical systems.'
      },
      {
        q: 'Why does the MIL-STD-1553B physical layer mandate dual-redundant shielded twisted-pair cabling with transformer coupling?',
        options: [
          'To make the aircraft heavier so it stays grounded',
          'To provide continuous operational backup if one bus line is severed by combat damage and provide galvanic isolation to suppress severe electromagnetic interference (EMI)',
          'To transmit analog television broadcasts to the cockpit',
          'To reduce the cost of copper wiring'
        ],
        answer: 1,
        explanation: 'The standard specifies dual independent bus channels (Bus A and Bus B). If Bus A suffers a physical break or short circuit from combat flak, the Bus Controller instantly shifts communications to Bus B. Transformer coupling provides electrical isolation, common-mode noise rejection, and prevents equipment failure from shorting the bus.'
      },
      {
        q: 'How does the NATO Link 16 (STANAG 5516) tactical datalink achieve robust resistance against enemy Electronic Warfare (EW) jamming?',
        options: [
          'By transmitting on high-power commercial FM radio frequencies',
          'By using Direct Sequence and Fast Frequency Hopping Spread Spectrum, rapidly switching frequencies up to 77,000 times per second across 51 channels',
          'By sending messages through encrypted paper letters dropped from the aircraft',
          'By turning off the aircraft transponder'
        ],
        answer: 1,
        explanation: 'Link 16 utilizes sophisticated Electronic Counter-Countermeasures (ECCM): its waveform hops across 51 frequencies in the 960-1215 MHz UHF aviation band at tens of thousands of hops per second, combined with Reed-Solomon forward error correction and pseudo-random cryptographic keys, making it nearly impossible to jam or intercept.'
      },
      {
        q: 'What is the operational function of a Link 16 "J2.2" message within the Joint Tactical Information Distribution System (JTIDS)?',
        options: [
          'It orders cafeteria lunches for ground crew',
          'It transmits standardized air track kinematics, reporting latitude, longitude, altitude, speed, heading, and friend/hostile identification to maintain a shared Common Operational Picture (COP)',
          'It reboots the flight control software in mid-air',
          'It plays musical chimes in the cockpit helmet'
        ],
        answer: 1,
        explanation: 'Link 16 uses standardized J-series message words. J2.2 is the universal Air Track message that shares kinematic telemetry (position, vector, altitude) and IFF status across all networked aircraft, Aegis naval cruisers, and Patriot missile batteries in real time.'
      }
    ]
  });
  console.log('[UPDATED] Injected af-m3-r2');
}

// 3. Project Management: pm-m1-r2
const pmTrack = courses['project-management'];
const pmM1 = pmTrack.modules.find(m => m.id === 'pm-m1');
if (pmM1 && !pmM1.readings.some(r => r.id === 'pm-m1-r2')) {
  pmM1.readings.push({
    id: 'pm-m1-r2',
    title: 'Applied Lab: Earned Value Management (EVM ANSI/EIA-748), Schedule Performance Index & Monte Carlo Risk',
    duration: '15 min',
    content: `
> **Project Controls & Engineering Governance Standard**: Aligned with **ANSI/EIA-748-D (Earned Value Management Systems)**, **ISO 21500 (Project, Programme and Portfolio Management)**, and **PMI PMBOK Guide (7th Edition)**. Prepares technical project managers and engineering leads to compute cost/schedule variances and simulate critical path risks.

# Applied Laboratory: Earned Value Management (EVM) & Monte Carlo Risk

Engineering and nearshoring capital expenditure projects (such as plant expansions, automotive tooling ramp-ups, and software migrations) frequently experience schedule slippage and budget overruns. Subjective progress claims ("We are 80% done") obscure true status. **Earned Value Management (EVM)** integrates technical scope, schedule, and cost into objective mathematical indicators.

## 1. The Core EVM Metrics Framework
EVM relies on three fundamental baseline measurements at any given reporting date:
1. **Planned Value (PV)**: The budgeted cost of work scheduled to be completed by the reporting date:
   $$PV = \\text{Budget at Completion (BAC)} \\times \\% \\text{Planned}$$
2. **Earned Value (EV)**: The budgeted cost of work actually performed and objectively verified:
   $$EV = BAC \\times \\% \\text{Completed}$$
3. **Actual Cost (AC)**: The actual financial expenditure incurred in accomplishing the work performed.

## 2. Performance Variances & Efficiency Indices
Deviations from the project baseline are quantified through variances and dimensionless efficiency ratios:
- **Cost Variance ($CV$) & Cost Performance Index ($CPI$)**:
  $$CV = EV - AC, \\quad CPI = \\frac{EV}{AC}$$
  - $CPI > 1.0$: Project is operating under budget (cost efficient).
  - $CPI < 1.0$: Project is over budget (cost overrun).
- **Schedule Variance ($SV$) & Schedule Performance Index ($SPI$)**:
  $$SV = EV - PV, \\quad SPI = \\frac{EV}{PV}$$
  - $SPI > 1.0$: Project is ahead of schedule.
  - $SPI < 1.0$: Project is behind schedule.
- **Estimate at Completion (EAC)**: Forecasting final total project expenditure assuming current cost efficiency continues:
  $$EAC = \\frac{BAC}{CPI}$$

## 3. Quantitative Risk Analysis: Monte Carlo Simulation
Deterministic single-point estimates fail because activity durations are stochastic.
- **Three-Point Estimates**: Define Optimistic ($o$), Most Likely ($m$), and Pessimistic ($p$) durations using a Beta-PERT distribution:
  $$\\mu = \\frac{o + 4m + p}{6}, \\quad \\sigma = \\frac{p - o}{6}$$
- **Monte Carlo Simulation**: Iterates 10,000 algorithmic runs randomly sampling activity durations across the network diagram. Generates a probability distribution (S-curve) identifying the **Confidence Level** (e.g., P80 date: 80% probability that the project will finish on or before that calendar date).

---
> **Key Takeaway**: Industrial project governance replaces subjective guesswork with **ANSI/EIA-748 Earned Value Management (CPI/SPI indicators) and Monte Carlo schedule risk modeling** to predict cost and milestone delivery with statistical precision.
`,
    vocabulary: [
      {
        en: 'Earned Value (EV)',
        es: 'Valor Ganado (EV)',
        definition: 'The measure of work performed expressed in terms of the budget authorized for that work.',
        ipa: '/ɜːrnd ˈvæl.juː/',
        collocations: ['calculate earned value progress', 'objective EV milestone credit', 'compare EV against actual cost']
      },
      {
        en: 'Cost Performance Index (CPI)',
        es: 'Índice de Desempeño del Costo (CPI)',
        definition: 'Dimensionless ratio of earned value to actual cost (EV/AC), measuring the financial efficiency of spent resources.',
        ipa: '/kɔːst pərˈfɔːr.məns ˈɪn.dɛks/',
        collocations: ['maintain CPI above 1.0', 'unfavorable CPI cost overrun', 'forecast EAC using CPI']
      },
      {
        en: 'Schedule Performance Index (SPI)',
        es: 'Índice de Desempeño del Cronograma (SPI)',
        definition: 'Dimensionless ratio of earned value to planned value (EV/PV), measuring how efficiently time is being utilized.',
        ipa: '/ˈskɛdʒ.uːl pərˈfɔːr.məns ˈɪn.dɛks/',
        collocations: ['critical path SPI slippage', 'SPI metric evaluation', 'track monthly SPI trends']
      },
      {
        en: 'Monte Carlo Simulation',
        es: 'Simulación Monte Carlo',
        definition: 'Computerized mathematical technique that uses repeated random sampling across probability distributions to calculate project risk.',
        ipa: '/ˌmɑːn.ti ˈkɑːr.loʊ ˌsɪm.jəˈleɪ.ʃən/',
        collocations: ['run Monte Carlo schedule risk', 'P80 confidence level milestone', 'probabilistic S-curve distribution']
      }
    ],
    questions: [
      {
        q: 'A high-tech manufacturing plant expansion project has a Planned Value (PV) of $500,000 USD, an Earned Value (EV) of $400,000 USD, and an Actual Cost (AC) of $450,000 USD. What is the project\'s status regarding cost and schedule?',
        options: [
          'Under budget and ahead of schedule',
          'Over budget (CPI = 0.89) and behind schedule (SPI = 0.80)',
          'Exactly on budget and on schedule',
          'Ahead of schedule but over budget'
        ],
        answer: 1,
        explanation: 'CPI = EV / AC = 400,000 / 450,000 = 0.89 (< 1.0 indicates cost overrun, getting only 89 cents of value for every dollar spent). SPI = EV / PV = 400,000 / 500,000 = 0.80 (< 1.0 indicates schedule delay, delivering work at only 80% of planned velocity).'
      },
      {
        q: 'Under ANSI/EIA-748 Earned Value Management, what does the formula EAC = BAC / CPI compute?',
        options: [
          'The salary of the project manager',
          'The Estimate at Completion (EAC), forecasting the total expected final project cost assuming future work is performed at the same cost efficiency rate demonstrated to date',
          'The amount of tax owed to the government',
          'The number of days until the next holiday'
        ],
        answer: 1,
        explanation: 'When project cost performance is expected to continue at the current burn rate, dividing the total original Budget at Completion (BAC) by the current Cost Performance Index (CPI) yields the realistic forecasted total final expenditure (EAC).'
      },
      {
        q: 'Why is a Monte Carlo schedule risk simulation mathematically superior to traditional deterministic Critical Path Method (CPM) scheduling?',
        options: [
          'Because Monte Carlo uses gambling rules to win money',
          'Because deterministic CPM assumes fixed task durations and ignores path convergence, whereas Monte Carlo simulates thousands of iterations with stochastic distributions, revealing the true probability of meeting project deadlines (e.g. P80)',
          'Because Monte Carlo removes all deadlines from the project',
          'Because CPM is not allowed by engineering standards'
        ],
        answer: 1,
        explanation: 'Real-world task durations are variable. Traditional CPM uses single-point estimates and suffers from "merge bias" (where parallel paths converge, creating a much higher probability of delay than any single path suggests). Monte Carlo models this variance across thousands of iterations to generate realistic probabilistic completion dates.'
      },
      {
        q: 'In Beta-PERT distribution modeling for project activity durations, what weights are assigned to the Most Likely duration estimate (m) relative to the Optimistic (o) and Pessimistic (p) estimates?',
        options: [
          'Equal weight: (o + m + p) / 3',
          'A weight of 4: (o + 4m + p) / 6',
          'A weight of 10: (o + 10m + p) / 12',
          'Zero weight: (o + p) / 2'
        ],
        answer: 1,
        explanation: 'The standard Beta-PERT formula calculates the expected mean duration as (o + 4m + p) / 6. The most likely estimate (m) is given quadruple the weight of the extreme boundary estimates (o and p) to reflect a bell-shaped probability distribution.'
      }
    ]
  });
  console.log('[UPDATED] Injected pm-m1-r2');
}

// 4. Business Leadership: biz-m1-r2
const bizTrack = courses['business-leadership'];
const bizM1 = bizTrack.modules.find(m => m.id === 'biz-m1');
if (bizM1 && !bizM1.readings.some(r => r.id === 'biz-m1-r2')) {
  bizM1.readings.push({
    id: 'biz-m1-r2',
    title: 'Applied Lab: Cross-Border Dual-Shoring Strategy, Foreign Direct Investment (FDI) & Due Diligence M&A',
    duration: '15 min',
    content: `
> **Corporate Strategy & Nearshoring Governance Standard**: Aligned with **OECD Guidelines for Multinational Enterprises**, **USMCA Chapter 14 (Investment Framework)**, and **World Bank Foreign Direct Investment (FDI) Best Practices**. Prepares corporate development executives, VP of operations, and plant managing directors to structure dual-shoring supply chains and audit cross-border M&A acquisitions.

# Applied Laboratory: Dual-Shoring Strategy, FDI & M&A Due Diligence

Global manufacturing operations are shifting from fragile single-source Asian offshoring to resilient regionalization. North American industrial corporations are executing **Dual-Shoring** architectures: maintaining automated high-capital advanced manufacturing hubs in the US/Canada paired with high-volume, cost-optimized engineering, subassembly, and tooling operations in Mexico.

## 1. Strategic Total Landed Cost (TLC) Modeling
Corporate executives evaluating manufacturing site selection cannot evaluate labor costs in isolation. **Total Landed Cost (TLC)** models capture the holistic financial profile:
$$\\text{TLC} = C_{\\text{ex-factory}} + C_{\\text{freight/customs}} + C_{\\text{inventory holding}} + C_{\\text{tariffs/duties}} + C_{\\text{lead-time risk}}$$
- **Lead-Time Elasticity**: Transpacific maritime shipping requires 30 to 45 days in transit, creating massive working capital tie-up and stockout vulnerability. Cross-border overland trucking from northern Mexico reaches US distribution centers within 24 to 48 hours, slashing safety stock inventory by 70%.
- **USMCA Duty Exemption**: Utilizing preferential zero-tariff rules under USMCA eliminates potential 25% Section 301 tariffs on steel, aluminum, and electronics.

## 2. Foreign Direct Investment (FDI) Vehicles in Mexico
Structuring industrial operations requires selecting the optimal legal and fiscal operating vehicle:
1. **Shelter Operating Model**: A foreign OEM contracts with an established Mexican shelter partner that provides legal entity incorporation, labor hiring, facility leasing, and environmental permitting. The OEM retains 100% intellectual property (IP) and production management with zero direct Mexican corporate tax liability.
2. **Stand-Alone Subsidized Entity (Incorporated Subsidiary)**: Direct capital investment with formal SAT tax registry, full IMMEX export maquiladora authorization, and IVA/IEPS value-added tax certification.

## 3. Technical & Environmental M&A Due Diligence
When acquiring an existing automotive tier-1 supplier or precision machining facility:
- **Phase I & Phase II Environmental Site Assessment (ASTM E1527-21)**: Auditing historical groundwater contamination, solvent degreaser disposal, and hazardous waste manifests to avoid inheriting multi-million dollar environmental remediation liabilities.
- **Labor Compliance & USMCA Rapid Response Mechanism (RRM)**: Auditing collective bargaining agreements under Mexican labor reform laws to ensure compliance with free union affiliation and wage mandates, avoiding immediate US border import embargoes.

---
> **Key Takeaway**: Strategic cross-border leadership balances **Total Landed Cost (TLC) financial modeling, IMMEX/Shelter FDI legal architectures, and rigorous M&A environmental/labor due diligence** to achieve sustainable supply chain resilience.
`,
    vocabulary: [
      {
        en: 'Total Landed Cost (TLC)',
        es: 'Costo Total Puesto en Destino (TLC)',
        definition: 'Comprehensive financial calculation of the complete cost of a product across the entire supply chain, including manufacturing, shipping, insurance, tariffs, and inventory carrying cost.',
        ipa: '/ˈtoʊ.təl ˈlæn.dɪd kɔːst/',
        collocations: ['model comparative TLC', 'TLC nearshoring analysis', 'reduce total landed cost']
      },
      {
        en: 'Foreign Direct Investment (FDI)',
        es: 'Inversión Extranjera Directa (IED / FDI)',
        definition: 'Substantial, long-term capital investment made by a firm or individual in one country into business interests located in another country.',
        ipa: '/ˈfɔːr.ən dɪˈrɛkt ɪnˈvɛst.mənt/',
        collocations: ['attract greenfield FDI', 'cross-border FDI flow', 'FDI tax incentive package']
      },
      {
        en: 'Shelter Operating Model',
        es: 'Modelo de Operación Shelter',
        definition: 'Business structure in Mexico where a specialized service provider manages administrative, legal, HR, and customs compliance, allowing foreign manufacturers to operate rapidly.',
        ipa: '/ˈʃɛl.tər ˈɑː.pəˌreɪ.tɪŋ ˈmɑː.dəl/',
        collocations: ['contract manufacturing shelter model', 'mitigate foreign liability via shelter', 'shelter maquiladora services']
      },
      {
        en: 'Environmental Due Diligence (Phase I ESA)',
        es: 'Diligencia Debida Ambiental (Fase I)',
        definition: 'Investigation into the historical and current environmental liabilities, soil contamination, and hazardous substances of a commercial property prior to acquisition.',
        ipa: '/ɪnˌvaɪ.rənˈmɛn.təl duː ˈdɪl.ə.dʒəns/',
        collocations: ['commission Phase I ESA audit', 'uncover historical contamination liability', 'CERCLA environmental due diligence']
      }
    ],
    questions: [
      {
        q: 'Why does a Total Landed Cost (TLC) analysis frequently reveal that nearshoring to Mexico is more cost-effective than Asian manufacturing, even if nominal hourly factory wages in Asia appear lower?',
        options: [
          'Because Asian factories do not have electricity',
          'Because TLC accounts for transpacific ocean freight spikes, 45-day pipeline inventory carrying costs, port demurrage, tariff risks, and the cost of slow supply chain response to demand fluctuations',
          'Because Mexico pays companies to buy raw materials',
          'Because shipping by boat is illegal in the Americas'
        ],
        answer: 1,
        explanation: 'Nominal ex-factory purchase price represents only a fraction of true cost. When freight charges, customs brokerage, 30-45 days of ocean inventory carrying costs, safety stock buffers, and potential tariff penalties are incorporated, short 24-48 hour overland transit from Mexico often delivers a lower overall Total Landed Cost.'
      },
      {
        q: 'What is the primary corporate strategic advantage of utilizing a "Shelter Operating Model" when establishing a new manufacturing operation in Mexico?',
        options: [
          'The foreign company does not have to pay its workers',
          'The shelter provider acts as the legal employer and handles all Mexican labor laws, permits, customs, and fiscal administration, dramatically reducing startup time and legal exposure while allowing the OEM to control production',
          'The shelter provider gives away free factory buildings',
          'The factory produces military tanks without government approval'
        ],
        answer: 1,
        explanation: 'Under a shelter model, the foreign parent company does not need to incorporate an independent Mexican legal entity. The shelter company assumes legal liability for HR, union agreements, environmental licenses, and customs compliance, enabling the manufacturer to ramp up production in months with minimal regulatory friction.'
      },
      {
        q: 'What is the primary objective of a Phase I Environmental Site Assessment (ASTM E1527) during an industrial M&A facility acquisition?',
        options: [
          'To count how many trees are planted around the parking lot',
          'To identify Recognized Environmental Conditions (RECs) such as historical soil/groundwater chemical contamination or solvent spills that could impose massive legal cleanup liabilities on the acquiring company',
          'To check the interior paint colors for aesthetic quality',
          'To inspect the cafeteria menu'
        ],
        answer: 1,
        explanation: 'Under environmental liability laws, buyers can inherit strict joint and several liability for past toxic contamination on an industrial property. A Phase I ESA reviews historical land records, aerial imagery, and site conditions to detect contamination before concluding the purchase agreement.'
      },
      {
        q: 'How does the USMCA Rapid Response Labor Mechanism (RRM) alter cross-border corporate risk for export manufacturing facilities in Mexico?',
        options: [
          'It allows factories to ignore all environmental laws',
          'It allows complaints to be filed regarding denials of workers\' rights to collective bargaining, with independent panellists having the authority to impose trade remedies (suspending preferential tariff benefits or blocking goods at the US border)',
          'It forces all workers to speak three languages',
          'It requires all factory managers to be elected by public voting'
        ],
        answer: 1,
        explanation: 'Annex 31-A of USMCA established the groundbreaking Rapid Response Mechanism (RRM). If a facility is found to deny freedom of association or independent union rights, the US government can suspend preferential tariff treatment or directly block imports from that specific factory at the border.'
      }
    ]
  });
  console.log('[UPDATED] Injected biz-m1-r2');
}

// 5. Entrepreneurship: entre-m1-r2
const entTrack = courses['entrepreneurship'];
const entM1 = entTrack.modules.find(m => m.id === 'entre-m1');
if (entM1 && !entM1.readings.some(r => r.id === 'entre-m1-r2')) {
  entM1.readings.push({
    id: 'entre-m1-r2',
    title: 'Applied Lab: DeepTech Venture Capital Due Diligence, SAFE Term Sheets, Cap Tables & Unit Economics (CAC/LTV)',
    duration: '15 min',
    content: `
> **Technology Entrepreneurship & Venture Finance Standard**: Aligned with **National Venture Capital Association (NVCA) Model Legal Documents**, **Y Combinator Post-Money SAFE Guidelines**, and **CFA Institute Private Equity Valuation Framework**. Prepares technical startup founders and deeptech engineering entrepreneurs to model capitalization tables and pass institutional VC due diligence.

# Applied Laboratory: DeepTech VC Due Diligence, SAFE Term Sheets & Cap Tables

Scaling hard-tech, semiconductor, biotechnology, or robotics startups requires substantial equity financing before achieving cash flow break-even. Engineering founders must understand venture capital mechanics: negotiating financing instruments without suffering crippling equity dilution, modeling capitalization tables, and proving sustainable unit economics.

## 1. Early-Stage Financing: The Post-Money SAFE
Rather than pricing equity in pre-seed rounds (which incurs expensive legal fees and contentious early valuation debates), startups utilize the **Simple Agreement for Future Equity (SAFE)**:
- **Valuation Cap**: The maximum effective valuation at which the investor\'s investment will convert into preferred shares during the future priced Series A round.
- **Conversion Math**:
  $$\\text{Ownership Percentage} = \\frac{\\text{Investment Amount}}{\\text{Post-Money Valuation Cap}}$$
  A $500,000 USD SAFE on a $5,000,000 USD post-money valuation cap guarantees the angel investor exactly $10\\%$ equity upon Series A conversion, providing transparent anti-dilution visibility for founders.

## 2. Capitalization Table (Cap Table) Dynamics & Dilution
A startup\'s Cap Table tracks equity ownership across multiple financing rounds:
1. **Founders\' Equity & 4-Year Vesting**: Standard vesting schedules protect the company through a **1-year cliff** (no shares vest if a co-founder departs within month 1-12) followed by 36 months of linear monthly vesting.
2. **Unallocated Option Pool (ESOP)**: VCs typically mandate establishing a 10% to 15% employee stock option pool created from the pre-money valuation, ensuring that dilution is borne primarily by existing founders rather than incoming investors.
3. **Liquidation Preferences**: Preferred shares carry a liquidation preference (e.g. 1x non-participating). In an exit or bankruptcy, preferred investors receive their initial capital back before common shareholders (founders/employees) receive any proceeds.

## 3. Fundamental Unit Economics: CAC, LTV, and Payback Period
Institutional venture capital firms (VCs) scrutinize unit economics to determine whether capital injections will generate exponential growth or accelerate cash burn:
- **Customer Acquisition Cost (CAC)**:
  $$CAC = \\frac{\\text{Total Sales \\& Marketing Expenditure}}{\\text{Number of New Customers Acquired}}$$
- **Customer Lifetime Value (LTV)**:
  $$LTV = \\frac{\\text{Average Revenue Per User (ARPU)} \\times \\text{Gross Margin (\\%)}}{\\text{Monthly Churn Rate}}$$
- **The Golden Ratio ($LTV / CAC$)**:
  - $LTV / CAC < 1.0$: Value destructive; company is paying more to acquire customers than they generate in gross profit.
  - $LTV / CAC \\ge 3.0$: Healthy venture-scalable unit economics.
  - **CAC Payback Period**: Time in months required for gross profit from a customer to recover their acquisition cost; top-tier SaaS/hardware startups maintain a payback period $< 12\\,\\text{months}$.

---
> **Key Takeaway**: DeepTech startup survival depends on mastering **Post-Money SAFE conversion mathematics, cap table vesting/option-pool dilution dynamics, and maintaining an LTV/CAC ratio $\\ge 3.0$** to secure institutional venture capital.
`,
    vocabulary: [
      {
        en: 'Simple Agreement for Future Equity (SAFE)',
        es: 'Acuerdo Simple para Futuro Capital (SAFE)',
        definition: 'Financing contract created by Y Combinator that allows early-stage startups to raise money from investors with deferred equity pricing until a future round.',
        ipa: '/ˈsɪm.pəl əˈɡriː.mənt fɔːr ˈfjuː.tʃər ˈɛk.wə.ti/',
        collocations: ['issue post-money SAFE', 'SAFE valuation cap', 'convert SAFE into Series A preferred shares']
      },
      {
        en: 'Capitalization Table (Cap Table)',
        es: 'Tabla de Capitalización (Cap Table)',
        definition: 'Spreadsheet or ledger detailing the ownership stakes, equity dilution, stock options, and valuations of a startup across financing rounds.',
        ipa: '/ˌkæp.ə.t̬əl.əˈzeɪ.ʃən ˈteɪ.bəl/',
        collocations: ['model cap table dilution', 'manage clean cap table', 'reserve 15% ESOP pool on cap table']
      },
      {
        en: 'Customer Acquisition Cost (CAC)',
        es: 'Costo de Adquisición de Clientes (CAC)',
        definition: 'The total sales and marketing cost required to persuade a customer to buy a company\'s product or service.',
        ipa: '/ˈkʌs.tə.mər ˌæk.wəˈzɪʃ.ən kɔːst/',
        collocations: ['reduce customer CAC', 'calculate blended CAC', 'CAC payback period']
      },
      {
        en: 'Customer Lifetime Value (LTV)',
        es: 'Valor de Vida del Cliente (LTV)',
        definition: 'The total gross profit an average customer is projected to generate over the entire lifespan of their business relationship.',
        ipa: '/ˈkʌs.tə.mər ˈlaɪf.taɪm ˈvæl.juː/',
        collocations: ['achieve 3x LTV to CAC ratio', 'high-retention LTV calculation', 'maximize enterprise customer LTV']
      }
    ],
    questions: [
      {
        q: 'Under a standard Y Combinator Post-Money SAFE agreement, if an angel investor invests $1,000,000 USD at a $10,000,000 USD post-money valuation cap, what exact ownership stake has the investor secured prior to subsequent priced rounds?',
        options: [
          '50%',
          '10% ($1,000,000 / $10,000,000)',
          '1%',
          'The investor does not receive any ownership'
        ],
        answer: 1,
        explanation: 'In a Post-Money SAFE, the calculation is direct and transparent: Ownership = Investment Amount / Post-Money Valuation Cap = 1,000,000 / 10,000,000 = 10%. The investor is guaranteed 10% ownership immediately prior to the next priced financing round.'
      },
      {
        q: 'What is the corporate governance purpose of a "1-Year Cliff" in standard 4-year startup founder equity vesting agreements?',
        options: [
          'To ensure that founders take a 1-year vacation',
          'To protect the startup and remaining co-founders by ensuring that if a founder leaves or is terminated within their first 12 months, they depart with zero company shares',
          'To avoid paying business taxes for one year',
          'To give away shares to competitors'
        ],
        answer: 1,
        explanation: 'A 1-year cliff prevents "dead equity" on the Cap Table. If an early co-founder departs after only 4 months, without a cliff they would walk away with a permanent chunk of company equity; with a 1-year cliff, 0% vests until the 12-month anniversary is reached.'
      },
      {
        q: 'Why do institutional venture capital investors look for an LTV to CAC ratio of at least 3:1 in high-growth startups?',
        options: [
          'Because the number 3 is considered lucky in finance',
          'Because acquiring customers costs sales and marketing capital; an LTV/CAC ratio >= 3.0 proves that customers generate three times more gross profit than the cost to acquire them, leaving sufficient margin for overhead, R&D, and net profitability',
          'Because 3:1 is the ratio of computers to employees',
          'Because banks will not open checking accounts otherwise'
        ],
        answer: 1,
        explanation: 'An LTV/CAC ratio of 1:1 means the company breaks even on marketing expenditure but loses money when engineering, support, and administrative overhead are included. A 3:1 ratio provides sufficient healthy gross profit margin to finance rapid scaling and ongoing product research.'
      },
      {
        q: 'What does a "1x Non-Participating Liquidation Preference" mean for Series A Preferred stockholders in the event of a company acquisition or liquidation?',
        options: [
          'Investors are never allowed to get their money back',
          'Preferred investors have the contractual right to either get their 1x investment returned first before common stockholders receive anything, OR convert their preferred shares into common shares and share pro-rata in the total proceeds (whichever yields more)',
          'Investors take all company computers and desks',
          'Investors must pay the startup double their original investment'
        ],
        answer: 1,
        explanation: 'A 1x non-participating liquidation preference provides downside protection: if the startup sells for a low price, preferred investors get their initial investment back first. If the startup sells for a massive valuation, they convert to common shares to participate proportionally in the larger upside.'
      }
    ]
  });
  console.log('[UPDATED] Injected entre-m1-r2');
}

// 6. Hospitality & Food Service: hosp-m1-r2
const hospTrack = courses['hospitality-food'];
const hospM1 = hospTrack.modules.find(m => m.id === 'hosp-m1');
if (hospM1 && !hospM1.readings.some(r => r.id === 'hosp-m1-r2')) {
  hospM1.readings.push({
    id: 'hosp-m1-r2',
    title: 'Applied Lab: RevPAR Yield Management, Dynamic Pricing Algorithms & Global Distribution Systems (GDS/NDC)',
    duration: '15 min',
    content: `
> **Hospitality Asset Management & Revenue Optimization Standard**: Aligned with **HSMAI (Hospitality Sales and Marketing Association International) Revenue Optimization Standards**, **Uniform System of Accounts for the Lodging Industry (USALI)**, and **IATA New Distribution Capability (NDC)**. Prepares revenue managers, hotel directors of finance, and corporate travel directors to implement dynamic pricing algorithms and optimize Global Distribution System (GDS) channel yields.

# Applied Laboratory: RevPAR Yield Management, Dynamic Pricing & GDS

Modern international resort destinations and business hub hotels (e.g. Los Cabos, Riviera Maya, Mexico City, Monterrey) operate in highly competitive multi-channel distribution landscapes. Maximizing top-line revenue and net operating income (NOI) requires moving beyond static seasonal room rates to algorithmic **Revenue Management & Yield Optimization**.

## 1. Key Performance Metrics: ADR, Occupancy, and RevPAR
The core triumvirate of hospitality financial analytics:
1. **Average Daily Rate (ADR)**: Measures the average rental revenue paid per occupied room:
   $$ADR = \\frac{\\text{Total Room Revenue}}{\\text{Total Rooms Sold}}$$
2. **Occupancy Rate (Occ %)**: Percentage of available room inventory occupied:
   $$\\text{Occ \\%} = \\frac{\\text{Total Rooms Sold}}{\\text{Total Available Rooms}} \\times 100$$
3. **Revenue Per Available Room (RevPAR)**: The gold standard metric evaluating combined pricing power and inventory utilization:
   $$RevPAR = ADR \\times \\text{Occupancy Rate} = \\frac{\\text{Total Room Revenue}}{\\text{Total Available Rooms}}$$
- **Revenue Generation Index (RGI / RevPAR Index)**: Compares the property\'s RevPAR against its competitive set (CompSet):
  $$RGI = \\frac{\\text{Property RevPAR}}{\\text{CompSet RevPAR}} \\times 100$$
  An $RGI > 100$ demonstrates that the property is capturing more than its mathematical "fair share" of market revenues.

## 2. Dynamic Pricing Algorithms & Demand Elasticity
Hotel rooms and airline seats are **perishable assets**: an unsold room tonight produces zero revenue and cannot be stored in inventory tomorrow.
- **Price Elasticity of Demand ($\\epsilon_d$)**:
  $$\\epsilon_d = \\frac{\\% \\Delta \\text{ Quantity Demanded}}{\\% \\Delta \\text{ Price}}$$
- **Automated Rate Yield Optimization**: Algorithmic revenue engines continuously adjust room rates based on real-time forward booking pace, flight arrival schedules, regional conventions, competitor rate parity scraping, and historical cancellation velocity.
- **Unconstrained Demand & Length of Stay (LOS) Controls**: During high-demand compression dates (e.g., Formula 1 Mexico Grand Prix), systems impose Minimum Length of Stay (MLOS = 3 nights) and close lower-priced discount rate tiers to maximize total room revenue per guest stay.

## 3. Global Distribution Systems (GDS) & Channel Cost Optimization
Hotel inventory flows through multiple electronic channels with drastically differing acquisition costs:
- **Direct Web Channel (Brand.com)**: Lowest cost of distribution ($2\\%\\text{ to }5\\%$ merchant processing fee) with maximum guest data ownership.
- **Global Distribution Systems (Sabre, Amadeus, Travelport)**: B2B networks connecting travel management companies (TMCs) booking corporate business travelers ($8\\text{ to }12\\,\\text{USD}$ booking fee).
- **Online Travel Agencies (OTAs: Expedia, Booking.com)**: High commission channels ($15\\%\\text{ to }22\\%$ commission fee). Revenue managers deploy strict rate parity policies and availability fencing to steer OTA bookers into direct hotel loyalty program channels.

---
> **Key Takeaway**: Modern hospitality asset engineering optimizes financial returns by **maximizing RevPAR and RGI Fair Share, executing algorithmic dynamic pricing with length-of-stay fencing, and managing GDS/OTA channel distribution costs**.
`,
    vocabulary: [
      {
        en: 'Revenue Per Available Room (RevPAR)',
        es: 'Ingreso por Habitación Disponible (RevPAR)',
        definition: 'Key hospitality performance metric calculated by multiplying Average Daily Rate by Occupancy Rate, measuring overall inventory revenue efficiency.',
        ipa: '/ˈrɛv.pɑːr/',
        collocations: ['maximize property RevPAR', 'RevPAR index performance', 'outperform CompSet RevPAR']
      },
      {
        en: 'Average Daily Rate (ADR)',
        es: 'Tarifa Promedio Diaria (ADR)',
        definition: 'Metric indicating the average realized revenue earned per paid occupied room over a given period.',
        ipa: '/ˈæv.ər.ɪdʒ ˈdeɪ.li reɪt/',
        collocations: ['drive ADR growth', 'discounted group ADR', 'high-season premium ADR']
      },
      {
        en: 'Global Distribution System (GDS)',
        es: 'Sistema de Distribución Global (GDS)',
        definition: 'Computerized worldwide reservation network connecting travel agents and corporate booking systems with hotels, airlines, and car rental firms.',
        ipa: '/ˈɡloʊ.bəl ˌdɪs.trəˈbjuː.ʃən ˈsɪs.təm/',
        collocations: ['distribute hotel rates across GDS', 'Sabre and Amadeus GDS connectivity', 'corporate travel GDS booking fee']
      },
      {
        en: 'Length of Stay (LOS) Restriction',
        es: 'Restricción de Estancia Mínima (MLOS)',
        definition: 'Yield management tool that requires a guest to reserve a minimum number of consecutive nights during high-demand peak dates.',
        ipa: '/lɛŋkθ ʌv steɪ rɪˈstrɪk.ʃən/',
        collocations: ['enforce minimum length of stay (MLOS)', 'prevent single-night stay spillage', 'high-demand LOS restriction']
      }
    ],
    questions: [
      {
        q: 'A 200-room luxury resort in Los Cabos has an Average Daily Rate (ADR) of $400 USD and an Occupancy Rate of 75%. What is the resort\'s Revenue Per Available Room (RevPAR)?',
        options: [
          '$200 USD',
          '$300 USD ($400 × 0.75)',
          '$400 USD',
          '$533 USD'
        ],
        answer: 1,
        explanation: 'RevPAR = ADR × Occupancy Rate = $400 × 0.75 = $300 USD. Alternatively: Total Room Revenue = 150 occupied rooms × $400 = $60,000; dividing by 200 total available rooms = $300 USD.'
      },
      {
        q: 'Why is RevPAR considered a more comprehensive and objective health indicator for hotel asset performance than Occupancy Rate alone?',
        options: [
          'Because RevPAR is calculated in euros',
          'Because a hotel can easily achieve 100% occupancy by giving rooms away at deep unprofitable discounts; RevPAR mathematically balances pricing power (ADR) with volume (Occupancy)',
          'Because RevPAR excludes the cost of electricity',
          'Because occupancy cannot be measured on weekends'
        ],
        answer: 1,
        explanation: 'High occupancy achieved by slashing room rates damages profit margins and brand reputation. RevPAR balances both factors: earning $300 RevPAR with 75% occupancy at $400 ADR generates far higher net operating income than 100% occupancy at $150 ADR ($150 RevPAR) due to lower housekeeping and wear-and-tear costs.'
      },
      {
        q: 'What is the operational goal of implementing a Minimum Length of Stay (MLOS) restriction during peak event periods (such as the Formula 1 Grand Prix)?',
        options: [
          'To encourage guests to leave the hotel early',
          'To prevent single-night reservations on the peak Saturday night from leaving adjacent Friday and Sunday nights vacant and un-sellable ("orphan days")',
          'To shut down the front desk on Sunday',
          'To give free spa treatments to all guests'
        ],
        answer: 1,
        explanation: 'During high-compression events, demand on the peak Saturday is massive. Without an MLOS rule (e.g. 3-night minimum from Friday to Sunday), Saturday sells out instantly to single-night travelers, leaving Friday and Sunday with severe vacancies because multi-night travelers can no longer be accommodated.'
      },
      {
        q: 'Why do major hotel brands incentivize guests with loyalty points and perks to book directly on Brand.com rather than through third-party Online Travel Agencies (OTAs like Expedia or Booking.com)?',
        options: [
          'Because OTAs pay hotels a bonus for every booking',
          'Because OTAs charge steep merchant commissions (15% to 22%) on every room sold and withhold direct guest contact data, whereas direct bookings reduce distribution costs and build long-term guest lifetime value',
          'Because direct booking websites are only available in English',
          'Because governments prohibit hotels from working with OTAs'
        ],
        answer: 1,
        explanation: 'Third-party OTAs take a substantial 15% to 22% commission on the total room tariff and mask customer email addresses, preventing personalized marketing. Direct bookings cost the property only 2% to 5% in digital transaction fees while capturing complete guest preferences and loyalty.'
      }
    ]
  });
  console.log('[UPDATED] Injected hosp-m1-r2');
}

// Write back to courses.js
const outputJS = `// stemOS Learning Experience Platform - Course Catalog
// Comprehensive Technical English (ESP) curriculum for high-tech engineering tracks.

var LXP_COURSES = ${JSON.stringify(courses, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LXP_COURSES;
}
`;

fs.writeFileSync(coursesPath, outputJS, 'utf8');
console.log('[SUCCESS] content/courses.js updated with Wave 5 applied engineering labs across ALL tracks!');
