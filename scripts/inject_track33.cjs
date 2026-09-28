/**
 * scripts/inject_track33.cjs
 * Injects Track 33: Agile Hardware, Embedded Firmware & Edge AI
 * (AUTOSAR Classic/Adaptive / FreeRTOS / MISRA-C / HIL Testing / TinyML Cortex-M / Secure OTA Bootloaders)
 * into content/courses.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.join(__dirname, '../content/courses.js');
let fileContent = fs.readFileSync(coursesPath, 'utf8');

// Define Track 33 Data
const track33 = {
    id: "embedded-firmware-edge-ai",
    title: "Hardware Ágil, Firmware Embebido e Inteligencia Artificial en el Borde (Edge AI)",
    titleEN: "Agile Hardware, Embedded Firmware & Edge AI",
    level: "B2-C1",
    category: "technology",
    description: "Desarrollo de firmware de misión crítica y sistemas embebidos automotrices e industriales: arquitectura AUTOSAR Classic y Adaptive, sistemas operativos de tiempo real (FreeRTOS, Zephyr RTOS), estándares de codificación segura MISRA-C:2012 / MISRA-C++:2023, validación Hardware-in-the-Loop (HIL dSPACE / NI), despliegue de modelos TinyML en microcontroladores ARM Cortex-M / RISC-V y cargadores de arranque seguros (Secure Bootloader con ECDSA y rollback protection).",
    status: "full",
    totalModules: 6,
    standard: "AUTOSAR R22-11 / MISRA-C:2012 / ISO 26262 ASIL-D / IEEE 1451 / NIST SP 800-193 (PFR) / TinyML",
    modules: [
        {
            id: "emb-m1",
            title: "AUTOSAR Classic vs Adaptive Architecture & Automotive Microcontrollers",
            titleES: "Arquitectura AUTOSAR Classic vs Adaptive y Microcontroladores Automotrices",
            icon: "fa-solid fa-microchip",
            isGoldModel: true,
            readings: [
                {
                    id: "emb-m1-r1",
                    title: "AUTOSAR Classic Layered Stack: BSW, RTE, and Application Software Components (SWC)",
                    duration: "15 min",
                    content: `> **Automotive Embedded Standard**: **AUTOSAR (Automotive Open System Architecture) Release R22-11** and **ISO 26262 Road Vehicles - Functional Safety**. Mandatory architecture for Tier-1 electronic control unit (ECU) engineering in powertrain, braking, and body domains.

# AUTOSAR Classic Architecture & Layered ECU Stack

### 1. The Core Philosophy of AUTOSAR
AUTOSAR decouples application software components (**SWCs**) from the underlying microcontroller hardware (**MCU**). In traditional legacy automotive firmware, control algorithms were tightly coupled with hardware registers (e.g., direct register manipulation of timer peripherals for fuel injector PWMs). AUTOSAR abstracts hardware dependencies, enabling automotive OEMs and Tier-1 suppliers to reuse software components across distinct hardware silicon vendors (e.g., NXP S32K, Infineon AURIX TC3xx, STMicroelectronics Stellar).

### 2. The Three-Tier Architecture

| Architecture Layer | Core Components | Operational Role & Abstraction Level |
| :--- | :--- | :--- |
| **Application Layer** | **Software Components (SWCs)**, Sensor/Actuator SWCs, Composition Components | Contains the proprietary control logic (e.g., adaptive cruise control velocity calculation, battery pack state-of-charge estimation). Communicates exclusively via Ports (Client-Server and Sender-Receiver interfaces). Has zero knowledge of hardware registers. |
| **Runtime Environment (RTE)** | Virtual Functional Bus (VFB) implementation, Runnables, Event Handlers | The communications backbone of AUTOSAR. Maps inter-runnable data exchange whether two SWCs reside on the same ECU core or communicate across a CAN FD / Automotive Ethernet bus. Generates optimized C inline functions during ECU extract configuration. |
| **Basic Software (BSW)** | **MCAL**, ECU Abstraction, Complex Device Drivers (CDD), Services Layer | Provides hardware-dependent drivers, operating system (AUTOSAR OS OSEK/VDX derivative), diagnostic stacks (UDS ISO 14229), and memory management (NVRAM Manager, Flash EEPROM Emulation). |

\`\`\`
+-------------------------------------------------------------+
|               AUTOSAR Software Components (SWCs)            |
+-------------------------------------------------------------+
                              | (Sender-Receiver / Client-Server)
+-------------------------------------------------------------+
|                Runtime Environment (RTE)                    |
+-------------------------------------------------------------+
| Services (OS, Com, Diag, NvM, WdgM, BswM)                  |
| ECU Abstraction Layer (IoHwAb, CanIf, LinIf, EthIf)         |
| Microcontroller Abstraction Layer (MCAL: Port, Dio, Gpt, Adc)|
+-------------------------------------------------------------+
|             Silicon Hardware (Infineon AURIX / NXP S32)     |
+-------------------------------------------------------------+
\`\`\`

### 3. Microcontroller Abstraction Layer (MCAL)
The **MCAL** is the lowest software layer of the BSW, provided directly by the semiconductor vendor. It directly accesses internal MCU registers and provides standard APIs to upper layers:
1. **Microcontroller Drivers**: Clock initialization (MCU Driver), General Purpose Timer (GPT), Watchdog Driver (WDG).
2. **I/O Drivers**: Digital Input/Output (DIO), Analog-to-Digital Converter (ADC), Pulse Width Modulation (PWM), Port Driver (pin muxing).
3. **Communication Drivers**: Controller Area Network (CAN), Local Interconnect Network (LIN), Serial Peripheral Interface (SPI), Ethernet (ETH).
4. **Memory Drivers**: Internal Flash Driver (FLS), Internal RAM Driver.`
                },
                {
                    id: "emb-m1-r2",
                    title: "AUTOSAR Adaptive Platform: POSIX PSE51, Service-Oriented Architecture (SOME/IP) & High-Performance Compute",
                    duration: "14 min",
                    content: `> **Domain Compute Standard**: **AUTOSAR Adaptive Platform** and **IEEE POSIX.13 PSE51**. Designed for autonomous driving domain controllers (ADAS), central gateway zonal compute modules, and telematics systems.

# AUTOSAR Adaptive: Service-Oriented Architecture in High-Performance ECUs

### 1. Classic vs. Adaptive: Fundamental Divergence

| Architectural Dimension | AUTOSAR Classic | AUTOSAR Adaptive |
| :--- | :--- | :--- |
| **Primary Domain** | Deep embedded, hard real-time, safety-critical (Braking, Steering, Airbags) | Zonal controllers, ADAS perception, Infotainment, Fleet Telematics |
| **Target Silicon** | 32-bit Microcontrollers (e.g., TriCore, Cortex-M7, Cortex-R5) | Multi-core 64-bit SoCs (e.g., Cortex-A78AE, NVIDIA Orin, Qualcomm Snapdragon Ride) |
| **Operating System** | AUTOSAR OS (Static OSEK-based, pre-compiled scheduling table) | Real-Time POSIX OS (e.g., QNX Neutrino, Linux with PREEMPT_RT, PikeOS) |
| **Language Standard** | ANSI C (C90/C99 strictly adhering to MISRA-C:2012) | Modern C++ (C++14/C++17 conforming to AUTOSAR C++ guidelines) |
| **Communication Paradigm** | Signal-based (CAN FD, FlexRay message frames) | **Service-Oriented Architecture (SOME/IP, DDS)** over Gigabit Automotive Ethernet |
| **Software Updates** | Monolithic static binary reflash via CAN bootloader | Dynamic execution, microservices, containerized OTA container updates |

### 2. Scalable service-Oriented MiddlewarE over IP (SOME/IP)
SOME/IP provides publish/subscribe and remote procedure call (RPC) mechanisms over IPv4/IPv6:
- **Service Discovery (SOME/IP-SD)**: Dynamically advertises available ECU services and allows client nodes to subscribe to telemetry events at runtime without hardcoded CAN matrix IDs.
- **Serialization**: Efficient binary payload serialization with little-endian or big-endian wire formatting, supporting dynamic arrays and nested structures.

### 3. Zonal Electrical/Electronic (E/E) Architecture
Modern vehicles transition from 100+ distributed federated ECUs to 3–4 **Zonal Gateway Controllers** managed by a Central Vehicle Computer:
- Zonal controllers aggregate sensor telemetry via local CAN/LIN networks and bridge payload streams to high-speed Automotive Ethernet (100BASE-T1 / 1000BASE-T1) using IEEE 802.1Q Time-Sensitive Networking (TSN).`
                }
            ],
            vocabulary: [
                {
                    en: "Basic Software (BSW)",
                    es: "Software Básico (BSW)",
                    definition: "Standardized software layer in AUTOSAR Classic providing foundational hardware abstraction, operating system, and communication services.",
                    ipa: "/ˈbeɪ.sɪk ˈsɔːft.wɛər/",
                    collocations: ["BSW module configuration", "MCAL layer abstraction", "BSW scheduler tick"]
                },
                {
                    en: "Runtime Environment (RTE)",
                    es: "Entorno de Ejecución (RTE)",
                    definition: "Middleware layer that mediates information exchange between AUTOSAR software components and the basic software stack.",
                    ipa: "/ˈrʌn.taɪm ɪnˈvaɪ.rən.mənt/",
                    collocations: ["RTE runnable entity", "Sender-Receiver interface", "generate RTE header files"]
                },
                {
                    en: "Microcontroller Abstraction Layer (MCAL)",
                    es: "Capa de Abstracción de Microcontrolador (MCAL)",
                    definition: "Lowest BSW layer containing hardware-specific drivers that interact directly with the microcontroller internal peripherals and registers.",
                    ipa: "/ˈmaɪ.kroʊ.kənˌtroʊ.lər æbˈstræk.ʃən ˈleɪ.ər/",
                    collocations: ["MCAL pin multiplexing", "vendor-supplied MCAL", "MCAL configuration generator"]
                },
                {
                    en: "Service-Oriented Architecture (SOA)",
                    es: "Arquitectura Orientada a Servicios (SOA)",
                    definition: "Software design model where application components communicate via standardized services across a network, utilizing protocols like SOME/IP.",
                    ipa: "/ˈsɜːr.vɪs ˌɔːr.iˈɛn.tɪd ˈɑːr.kɪ.tɛk.tʃər/",
                    collocations: ["SOME/IP service discovery", "publish-subscribe paradigm", "service interface deployment"]
                },
                {
                    en: "Hardware-in-the-Loop (HIL)",
                    es: "Hardware en el Lazo (HIL)",
                    definition: "Simulation technique where real ECU hardware is connected to a computer simulator executing real-time plant physics models.",
                    ipa: "/ˈhɑːrd.wɛər ɪn ðə luːp/",
                    collocations: ["HIL test bench", "fault injection testing", "automated HIL test suite"]
                },
                {
                    en: "Time-Sensitive Networking (TSN)",
                    es: "Redes Sensibles al Tiempo (TSN)",
                    definition: "Set of IEEE 802.1 standards providing deterministic latency, time synchronization, and bandwidth guarantees over standard Ethernet.",
                    ipa: "/taɪm ˈsɛn.sɪ.tɪv ˈnɛt.wɜːr.kɪŋ/",
                    collocations: ["TSN traffic shaper", "IEEE 802.1AS synchronization", "bounded latency packet transmission"]
                }
            ],
            questions: [
                {
                    id: "emb-q1",
                    prompt: "In AUTOSAR Classic, which software layer directly accesses the microcontroller's internal peripheral registers to provide standardized APIs to the ECU Abstraction Layer?",
                    options: [
                        "Runtime Environment (RTE)",
                        "Microcontroller Abstraction Layer (MCAL)",
                        "Application Software Component (SWC)",
                        "Complex Device Driver (CDD)"
                    ],
                    correctIndex: 1,
                    explanation: "The Microcontroller Abstraction Layer (MCAL) is the lowest software layer of the BSW, supplied by the silicon vendor, and directly interacts with the internal registers of the MCU."
                },
                {
                    id: "emb-q2",
                    prompt: "Why does the AUTOSAR Adaptive Platform use POSIX PSE51 and SOME/IP over Ethernet instead of the Classic OSEK OS and static CAN message scheduling?",
                    options: [
                        "To minimize flash memory footprint below 64 kilobytes for low-cost 8-bit body controllers.",
                        "To eliminate the need for functional safety validation under ISO 26262.",
                        "To support high-bandwidth computing, service-oriented dynamic deployment, and multi-core SoCs required for ADAS and domain controllers.",
                        "Because static CAN scheduling is legally prohibited in modern North American automotive plants."
                    ],
                    correctIndex: 2,
                    explanation: "AUTOSAR Adaptive addresses high-performance compute domains (ADAS, Zonal controllers) requiring multi-gigabit Ethernet bandwidth, POSIX multi-threading, dynamic microservices, and modern C++14/17 support."
                }
            ],
            dialogues: [
                {
                    speaker: "Klaus Weber",
                    role: "Chief Architect, Powertrain ECUs (Stuttgart Matrix)",
                    text: "We are observing jitter exceeding 85 microseconds on the PWM dead-time execution runnable during maximum SPI burst transfers. How is your MCAL DMA channel configured relative to the RTE event task priority?"
                },
                {
                    speaker: "Carlos Mendoza",
                    role: "Senior Embedded Firmware Engineer (Saltillo Plant)",
                    text: "We identified that the SPI DMA completion interrupt was preempting the CAT2 ISR handling the motor phase commutation. We re-allocated the DMA peripheral request to channel 4 and wrapped the critical register update in an atomic RTE critical section, bounding worst-case latency to 12 microseconds."
                }
            ]
        },
        {
            id: "emb-m2",
            title: "Real-Time Operating Systems (RTOS): FreeRTOS, Zephyr & Deterministic Scheduling",
            titleES: "Sistemas Operativos de Tiempo Real (RTOS): FreeRTOS, Zephyr y Planificación Determinista",
            icon: "fa-solid fa-clock",
            readings: [
                {
                    id: "emb-m2-r1",
                    title: "Preemptive Priority Scheduling, Context Switching & Rate Monotonic Analysis (RMA)",
                    duration: "13 min",
                    content: `> **Embedded Systems Standard**: **IEEE POSIX Real-Time Extensions** and **Rate-Monotonic Scheduling Theory (Liu & Layland)**. Essential for deterministic embedded firmware design in robotics, automotive, and medical devices.

# Deterministic Real-Time Systems: Scheduling, Context Switches & RMA

### 1. Hard Real-Time vs Soft Real-Time
In a **hard real-time system**, missing a single task deadline constitutes a catastrophic system failure (e.g., antilock braking system failing to calculate wheel deceleration within a 5 ms cycle). In a **soft real-time system**, missing a deadline degrades performance or user experience without causing hardware damage or safety hazards (e.g., frame dropped in a video streaming interface).

### 2. Preemptive Priority-Based Scheduler Operation
A Real-Time Operating System (**RTOS**) kernel operates a hardware timer tick (typically configured between 100 Hz and 1000 Hz, corresponding to a 1 ms to 10 ms tick period):
1. **Ready List**: Tasks ready for execution are maintained in priority-ordered queues.
2. **Preemption**: When a higher-priority task transitions from the *Blocked* state (e.g., unblocked by a hardware interrupt service routine via a semaphore) to the *Ready* state, the scheduler immediately suspends the lower-priority running task.
3. **Context Switch Mechanism**:
   - The CPU registers (e.g., Cortex-M Program Counter \`PC\`, Link Register \`LR\`, Stack Pointer \`SP\`, General-Purpose Registers \`R0-R12\`) of the preempted task are pushed onto its private stack.
   - The PendSV (Pendable Service Call) exception handler switches the Processor Stack Pointer (\`PSP\`) to point to the stack top of the incoming high-priority task.
   - Registers are popped from the new stack, and execution resumes seamlessly.

### 3. Rate Monotonic Analysis (RMA)
Rate Monotonic Scheduling assigns static priorities strictly based on task execution period: tasks with the shortest periods receive the highest priorities.
Under Liu and Layland's theorem, a set of $n$ independent periodic tasks is guaranteed to meet all deadlines if processor utilization $U$ satisfies:

$$U = \\sum_{i=1}^{n} \\frac{C_i}{T_i} \\le n(2^{1/n} - 1)$$

For a large number of tasks ($n \\to \\infty$), the utilization bound converges to approximately **69.3%** ($U \\le \\ln 2 \\approx 0.693$). Designing firmware below this threshold guarantees schedulability under worst-case execution time (WCET).`
                },
                {
                    id: "emb-m2-r2",
                    title: "Priority Inversion, Priority Inheritance Protocol & Zephyr RTOS Architecture",
                    duration: "14 min",
                    content: `> **RTOS Architecture Benchmark**: **Zephyr Project (Linux Foundation)** and **FreeRTOS Kernel v10.5+**. Industry benchmarks for connected IoT devices, edge sensor nodes, and smart manufacturing gateways.

# Concurrency Hazards: Priority Inversion & The Zephyr Kernel

### 1. The Classic Priority Inversion Catastrophe
**Priority Inversion** occurs when a low-priority task ($L$) acquires a shared resource (guarded by a binary semaphore or mutex), and a high-priority task ($H$) attempts to acquire the same resource, becoming blocked. If an intermediate-priority task ($M$)—which does not require the resource—preempts $L$, task $H$ is indefinitely delayed by task $M$, violating real-time determinism.
- *Historical Precedent*: The Mars Pathfinder spacecraft in 1997 suffered repeated total system resets caused by priority inversion on an internal shared information bus (ASI thread blocked by meteorological thread while communications tasks ran).

### 2. Mitigation: Priority Inheritance Protocol (PIP)
When task $H$ blocks waiting for a mutex held by task $L$, the RTOS kernel temporarily elevates the priority of task $L$ to match the priority of $H$. This prevents any intermediate-priority task $M$ from preempting $L$. Once $L$ releases the mutex, its priority is restored to its original base level, and $H$ immediately unblocks and acquires the mutex.

\`\`\`
Task H (High)    : --- [Wait Mutex]===================> [Acquires Mutex]----
Task M (Medium)  : -------- [Attempt Preempt BLOCKED by PIP] ---------------
Task L (Low)     : --[Takes Mutex]====(Inherits H Priority)===[Releases]----
\`\`\`

### 3. Zephyr RTOS: The Modern Open-Source Embedded Standard
Backwards-compatible with POSIX and optimized for memory-constrained microcontrollers:
- **Device Tree (\`.dts\`) Integration**: Hardware configurations, pin multiplexing, and peripheral clock gates are statically declared in hardware device trees, separating hardware descriptions from application C code.
- **Kconfig System**: Kernel capabilities (networking stacks, cryptographic accelerators, Bluetooth LE) are enabled via modular granular compile-time flags, eliminating dead code.`
                }
            ],
            vocabulary: [
                {
                    en: "Preemptive Scheduling",
                    es: "Planificación con Desalojo (Preemptiva)",
                    definition: "Scheduling policy where the RTOS kernel can interrupt an executing task to allocate CPU time to a higher-priority ready task.",
                    ipa: "/priːˈɛmp.tɪv ˈskɛdʒ.uː.lɪŋ/",
                    collocations: ["deterministic preemptive scheduler", "preempt running thread", "preemption latency"]
                },
                {
                    en: "Priority Inversion",
                    es: "Inversión de Prioridad",
                    definition: "Hazard where a high-priority task is indirectly blocked by a medium-priority task due to an unmanaged lock held by a low-priority task.",
                    ipa: "/praɪˈɔːr.ə.ti ɪnˈvɜːr.ʒən/",
                    collocations: ["unbounded priority inversion", "trigger system reset", "priority inheritance mutex"]
                },
                {
                    en: "Worst-Case Execution Time (WCET)",
                    es: "Tiempo de Ejecución en el Peor Caso (WCET)",
                    definition: "Maximum possible length of time a software task takes to execute on a specific target hardware processor.",
                    ipa: "/wɜːrst keɪs ˌɛk.səˈkjuː.ʃən taɪm/",
                    collocations: ["calculate static WCET", "bound WCET jitter", "timing analysis tool"]
                },
                {
                    en: "Context Switch",
                    es: "Cambio de Contexto",
                    definition: "Procedure where the processor saves execution state for one thread and restores another thread's state to resume execution.",
                    ipa: "/ˈkɑːn.tɛkst swɪtʃ/",
                    collocations: ["context switch overhead", "save CPU registers to stack", "minimize context switch latency"]
                }
            ],
            questions: [
                {
                    id: "emb-q3",
                    prompt: "How does the Priority Inheritance Protocol prevent unbounded priority inversion when a low-priority task holds a mutex required by a high-priority task?",
                    options: [
                        "It terminates the low-priority task immediately and clears the mutex lock.",
                        "It temporarily raises the low-priority task's execution priority to that of the waiting high-priority task until the mutex is released.",
                        "It downgrades the waiting high-priority task to the idle thread priority.",
                        "It disables all hardware interrupts across the entire microcontroller core permanently."
                    ],
                    correctIndex: 1,
                    explanation: "Under the Priority Inheritance Protocol, the holder of a contended mutex temporarily inherits the priority of the highest-priority blocked task, preventing medium-priority tasks from preempting it."
                }
            ],
            dialogues: [
                {
                    speaker: "Brent Higgins",
                    role: "Robotics Firmware Architect (Boston HQ)",
                    text: "We noticed our CAN-bus packet parser task is periodically missing its 10-millisecond deadline under heavy telematics load. Are you utilizing dynamic memory allocation inside that FreeRTOS thread?"
                },
                {
                    speaker: "Ana Sofía Garza",
                    role: "Embedded Software Lead (Monterrey Facility)",
                    text: "No, we strictly prohibited heap calls like pvPortMalloc during runtime. However, we found that our queue length was undersized, causing the telemetry publisher to block on a mutex with no priority inheritance flag enabled. We replaced the standard binary semaphore with a mutex featuring priority inheritance and statically pre-allocated message buffers."
                }
            ]
        },
        {
            id: "emb-m3",
            title: "MISRA-C:2012 & Secure Embedded Coding Standards for Safety-Critical Systems",
            titleES: "Estándares de Codificación Segura MISRA-C:2012 para Sistemas Críticos de Seguridad",
            icon: "fa-solid fa-shield-halved",
            readings: [
                {
                    id: "emb-m3-r1",
                    title: "MISRA-C:2012 Directives & Rules: Preventing Undefined Behavior, Pointer Aliasing & Stack Overflow",
                    duration: "14 min",
                    content: `> **Functional Safety Coding Standard**: **MISRA-C:2012 (Guidelines for the use of the C language in critical systems)** and **ISO 26262 Part 6**. Mandatory compliance standard for Tier-1 automotive and aerospace firmware certification.

# MISRA-C:2012: Eliminating C Language Undefined Behaviors

### 1. The Perils of Standard C in Safety-Critical ECUs
The C programming language is notoriously prone to **undefined behaviors**, **unspecified behaviors**, and compiler-dependent implementation choices:
- Unchecked pointer arithmetic can corrupt memory buffers in adjacent SRAM regions.
- Implicit type promotions (e.g., promotion of unsigned 8-bit integers to signed 32-bit integers during bitwise shifts) introduce silent calculation overflows.
- Unconstrained recursion or dynamic memory allocation (\`malloc\`/\`free\`) causes unpredictable stack exhaustion and heap fragmentation.

### 2. MISRA-C Classification: Directives vs Rules
MISRA-C divides guidelines into two distinct categories:
- **Directives**: Guidelines where compliance cannot be proven strictly by analyzing the source code alone; they require tool configuration, process documentation, or system design analysis (e.g., *Dir 4.3: Assembly language shall be encapsulated and isolated*).
- **Rules**: Guidelines where compliance can be verified automatically through Static Code Analysis (SCA) tools (e.g., PC-lint, Polyspace, Coverity, SonarQube).

Rules are classified by enforcement level:

| Classification | Meaning & Regulatory Enforcement | Deviation Procedure |
| :--- | :--- | :--- |
| **Mandatory** | Absolute compliance required. Zero exceptions permitted under any circumstance. | **No deviation allowed**. Code violating a mandatory rule will immediately fail automotive certification. |
| **Required** | Compliance required unless a formal, documented, and peer-reviewed safety deviation is justified. | Requires formal Deviation Permit detailing technical rationale, safety impact analysis, and mitigation controls. |
| **Advisory** | Recommended engineering best practice. Adherence evaluated during code quality reviews. | Formal deviation paperwork not legally required, but non-compliance must be tracked in the project quality log. |

### 3. Core MISRA-C Rules Every Embedded Engineer Must Defend
1. **Rule 11.4 & Rule 11.6 (Pointer Conversions)**: Conversions shall not be performed between a pointer to an object and an integer type, nor between a pointer to void and any arithmetic type. *(Ensures pointer arithmetic remains strictly typed and deterministic).*
2. **Rule 17.2 (Recursion Prohibited)**: Functions shall not call themselves, either directly or indirectly. *(Prevents unbounded stack growth and catastrophic stack overflow faults).*
3. **Rule 21.3 (Dynamic Heap Allocation Prohibited)**: The memory allocation and deallocation functions of \`<stdlib.h>\` (\`malloc\`, \`calloc\`, \`realloc\`, \`free\`) shall not be used. *(Guarantees that all memory requirements are known and bounded at compile/link time).*
4. **Rule 10.4 (Mismatched Essential Types)**: Both operands of an operator shall have the same essential type category. *(Prevents implicit signed-to-unsigned conversion bugs in threshold evaluations).*`
                }
            ],
            vocabulary: [
                {
                    en: "Static Code Analysis (SCA)",
                    es: "Análisis Estático de Código",
                    definition: "Software verification method where source code is analyzed without executing the program to detect defects and MISRA non-compliances.",
                    ipa: "/ˈstæt.ɪk koʊd əˈnæl.ə.sɪs/",
                    collocations: ["SCA toolchain pipeline", "resolve static analysis violations", "zero-defect static code gate"]
                },
                {
                    en: "Undefined Behavior",
                    es: "Comportamiento Indefinido",
                    definition: "Condition in the C language specification where the standard imposes no requirements, leading to unpredictable program execution or crashes.",
                    ipa: "/ˌʌn.dɪˈfaɪnd bɪˈheɪv.jər/",
                    collocations: ["trigger undefined behavior", "compiler-dependent behavior", "eliminate undefined pointer casts"]
                },
                {
                    en: "Stack Overflow",
                    es: "Desbordamiento de Pila (Stack Overflow)",
                    definition: "Runtime fault occurring when execution memory allocation exceeds the allocated bounds of the call stack, corrupting adjacent variables.",
                    ipa: "/stæk ˈoʊ.vər.floʊ/",
                    collocations: ["stack watermark monitoring", "prevent catastrophic stack overflow", "statically bounded call depth"]
                }
            ],
            questions: [
                {
                    id: "emb-q4",
                    prompt: "Under MISRA-C:2012, why are functions such as malloc(), calloc(), and free() strictly prohibited (Rule 21.3) in safety-critical automotive ECUs?",
                    options: [
                        "Because dynamic memory allocation introduces non-deterministic execution times, heap fragmentation, and unpredictable memory exhaustion at runtime.",
                        "Because modern ARM Cortex-M microcontrollers lack hardware support for random-access memory.",
                        "Because dynamic allocation is only supported when writing code in Python or Java.",
                        "Because dynamic allocation increases binary size by more than 10 megabytes."
                    ],
                    correctIndex: 0,
                    explanation: "In safety-critical embedded systems, non-deterministic allocation times and runtime heap fragmentation can lead to memory allocation failures while driving, violating ISO 26262 determinism."
                }
            ],
            dialogues: [
                {
                    speaker: "Greg Thornton",
                    role: "Global Safety & Quality Auditor (Detroit HQ)",
                    text: "During our pre-certification scan of your steering control module, the static analyzer flagged three violations of MISRA-C Rule 11.4 regarding integer-to-pointer casting in your motor driver. How are you addressing this before our customer PPAP?"
                },
                {
                    speaker: "Valeria Rios",
                    role: "Firmware Safety Compliance Specialist (Guadalajara Facility)",
                    text: "Those casts occurred within the register-level base address macros generated for memory-mapped I/O peripherals. We encapsulated all direct register access within an approved vendor MCAL layer and filed a formal MISRA Deviation Permit with formal boundary proofs, which was signed off by our ISO 26262 Functional Safety Manager."
                }
            ]
        },
        {
            id: "emb-m4",
            title: "Hardware-in-the-Loop (HIL) Testing & Automated Validation (dSPACE & NI)",
            titleES: "Pruebas Hardware en el Lazo (HIL) y Validación Automatizada (dSPACE y NI)",
            icon: "fa-solid fa-network-wired",
            readings: [
                {
                    id: "emb-m4-r1",
                    title: "HIL Simulator Architecture: Signal Conditioning, Fault Injection Units (FIU) & Real-Time Physics Models",
                    duration: "15 min",
                    content: `> **Validation & Verification Standard**: **ISO 26262 Part 4 (System Level Validation)** and **ASAM HIL (Association for Standardisation of Automation and Measuring Systems)**.

# Hardware-in-the-Loop (HIL) Simulation Architecture

### 1. Purpose of HIL Testing
Before flashing firmware onto real test vehicles or industrial robotics cells, the ECU must be validated against a **Hardware-in-the-Loop (HIL) Simulator**. The real physical ECU is plugged directly into the HIL cabinet via its wiring harness. The HIL simulator executes real-time mathematical models of the physical plant (e.g., internal combustion engine thermodynamics, electric motor flux dynamics, battery thermal dissipation) at sub-millisecond cycle times (typically 100 µs to 1 ms).

### 2. Core Subsystems of an Industrial HIL Rack

\`\`\`
+-----------------------+              +------------------------------+
|   Real ECU Hardware   |  Wire Harness|        HIL Simulator         |
|                       | <==========> | Signal Conditioning & Loads  |
| - Microcontroller     |              | Fault Injection Unit (FIU)   |
| - Driver ICs / Power  |              | Real-Time Processor (Physics)|
+-----------------------+              +------------------------------+
\`\`\`

1. **Real-Time Processor**: High-speed real-time computer (running real-time Linux or QNX) solving differential equations representing the physical vehicle dynamics.
2. **I/O Boards & Signal Conditioning**:
   - DACs simulate analog sensor signals (e.g., manifold pressure, thermocouple voltages, wheel speed hall-effect pulse trains).
   - ADCs measure actuator drive currents produced by the ECU (e.g., solenoid valve firing currents, injector pulses).
   - Electrical loads (e.g., dummy resistor banks, electronic loads) simulate real coil inductances and impedances.
3. **Fault Injection Units (FIU)**:
   Hardware matrices of solid-state relays capable of introducing physical circuit faults under automated test scripts:
   - **Pin-to-Ground Short**: Simulates wiring harness chafing against vehicle chassis ground.
   - **Pin-to-Battery Short ($V_{bat}$)**: Simulates short circuits to 12V / 24V / 48V power lines.
   - **Open Circuit / Broken Wire**: Simulates connector disconnections or severed harness wires.
   - **Cross-Pin Short**: Simulates insulation breakdown between adjacent sensor lines.`
                }
            ],
            vocabulary: [
                {
                    en: "Fault Injection Unit (FIU)",
                    es: "Unidad de Inyección de Fallas (FIU)",
                    definition: "Hardware switching hardware within a HIL simulator used to physically simulate short circuits, open circuits, and harness degradation.",
                    ipa: "/fɔːlt ɪnˈdʒɛk.ʃən ˈjuː.nɪt/",
                    collocations: ["automated FIU test script", "short-to-battery fault injection", "open-pin harness disconnect"]
                },
                {
                    en: "Plant Model",
                    es: "Modelo de la Planta Física",
                    definition: "Mathematical simulation running in real time representing the physical mechanical, thermal, or electrical dynamics of the controlled system.",
                    ipa: "/plænt ˈmɑː.dəl/",
                    collocations: ["execute real-time plant model", "simulate battery electrochemical response", "sub-millisecond plant execution"]
                }
            ],
            questions: [
                {
                    id: "emb-q5",
                    prompt: "What is the primary function of a Fault Injection Unit (FIU) in an automotive HIL test cabinet?",
                    options: [
                        "To compile C code into microcontroller assembly language.",
                        "To mechanically measure the torque of the engine output shaft.",
                        "To physically simulate wiring faults such as pin-to-ground shorts, pin-to-battery shorts, and open circuits while the ECU is executing.",
                        "To recharge the vehicle's high-voltage lithium battery pack during bench testing."
                    ],
                    correctIndex: 2,
                    explanation: "Fault Injection Units utilize controlled relay matrices to inject realistic electrical faults (shorts to ground, battery, and open circuits) to test the ECU's diagnostic detection and failsafe transition logic."
                }
            ],
            dialogues: [
                {
                    speaker: "Jason Campbell",
                    role: "HIL Validation Director (Detroit Technical Center)",
                    text: "During the automated regression run for Release 4.2, the steer-by-wire ECU failed the open-circuit sensor harness test. Did the diagnostic trouble code (DTC) register within the required 50-millisecond fault detection interval?"
                },
                {
                    speaker: "Hector Zambrano",
                    role: "Lead HIL Automation Engineer (Saltillo Plant)",
                    text: "The FIU correctly triggered the open circuit on channel 2, but the firmware debouncing filter was set to 65 milliseconds, exceeding the ASIL-D fault handling time interval (FHTI). We retuned the debounce counter to 30 milliseconds and re-verified on the dSPACE simulator with 100% test pass rate."
                }
            ]
        },
        {
            id: "emb-m5",
            title: "TinyML & Edge AI on ARM Cortex-M & RISC-V Microcontrollers",
            titleES: "TinyML e Inteligencia Artificial en el Borde para Microcontroladores ARM Cortex-M y RISC-V",
            icon: "fa-solid fa-brain",
            readings: [
                {
                    id: "emb-m5-r1",
                    title: "Deploying Neural Networks in Extreme Constraints: Quantization (INT8), CMSIS-NN & Tensor Arenas",
                    duration: "14 min",
                    content: `> **Edge Intelligence Standard**: **TensorFlow Lite for Microcontrollers (TFLM)**, **CMSIS-NN (ARM Common Microcontroller Software Interface Standard)**, and **Edge Impulse**. Enabler for zero-latency predictive maintenance, acoustic anomaly detection, and vibration monitoring on plant machinery.

# TinyML: Deep Learning in Kilobytes of Memory

### 1. The Challenge of Edge Machine Learning
Modern deep learning models (e.g., ResNet, Transformers) require gigabytes of VRAM and teraflops of floating-point compute. In industrial edge sensors (e.g., motor vibration monitors, acoustic leak detectors, handheld ultrasonic probes), engineers must deploy neural network inference on microcontrollers operating with:
- Less than **256 KB to 1 MB of Flash memory** (code storage).
- Less than **64 KB to 256 KB of SRAM** (runtime memory).
- Strict power envelopes under **50 milliwatts** (battery or energy harvesting operation).

### 2. The Quantization Pipeline: FP32 to INT8
Standard machine learning models train using 32-bit floating-point numbers (\`float32\`). Floating-point arithmetic on microcontrollers lacking a hardware Floating Point Unit (FPU) incurs massive cycle penalties.
**Post-Training Quantization (PTQ)** maps continuous floating-point weights and activations to 8-bit signed integers (\`int8\`, values from -128 to +127):

$$q = \\text{round}\\left(\\frac{r}{S}\\right) + Z$$

Where:
- $r$ is the real floating-point value.
- $S$ is the scale factor (positive real number).
- $Z$ is the integer zero-point offset.
- $q$ is the quantized 8-bit integer.

**Benefits of INT8 Quantization**:
- **4x reduction** in model flash footprint (e.g., a 2 MB model compresses to 500 KB).
- **3x to 5x acceleration** in inference latency via SIMD (Single Instruction, Multiple Data) instructions on ARM Cortex-M4/M7/M33 cores.
- Negligible accuracy loss (typically under 1% drop in classification F1-score).

### 3. CMSIS-NN Kernel Optimizations
ARM CMSIS-NN provides hand-crafted assembly implementations of convolution, pooling, and fully-connected neural network layers. It utilizes the \`SMLAD\` instruction (Signed Dual Multiply with Add), executing two 16-bit multiplications and accumulating into a 32-bit register in a single clock cycle.

### 4. Memory Management: The Tensor Arena
Unlike desktop machine learning frameworks that dynamically allocate memory during inference, TinyML uses a single static byte array known as the **Tensor Arena**:
- All input tensors, intermediate activation buffers, and output probabilities share this pre-allocated buffer.
- Eliminates runtime dynamic heap allocation, guaranteeing compliance with safety standards (MISRA-C Rule 21.3).`
                }
            ],
            vocabulary: [
                {
                    en: "Quantization",
                    es: "Cuantización",
                    definition: "Process of reducing the numerical precision of neural network weights and activations (e.g., from 32-bit float to 8-bit integer) to conserve memory and cycles.",
                    ipa: "/ˌkwɑːn.təˈzeɪ.ʃən/",
                    collocations: ["post-training quantization", "INT8 quantized weights", "quantization-aware training"]
                },
                {
                    en: "Tensor Arena",
                    es: "Arena de Tensores",
                    definition: "Statically pre-allocated block of contiguous SRAM used by TinyML runtimes to hold all model activations and intermediate scratchpad buffers.",
                    ipa: "/ˈtɛn.sər əˈriː.nə/",
                    collocations: ["allocate static tensor arena", "tensor arena size estimation", "prevent heap fragmentation during inference"]
                },
                {
                    en: "Anomalous Vibration Detection",
                    es: "Detección de Vibración Anómala",
                    definition: "Edge AI application using accelerometer spectral features and neural networks to identify mechanical bearing failure before line stoppages occur.",
                    ipa: "/əˈnɑː.mə.ləs vaɪˈbreɪ.ʃən dɪˈtɛk.ʃən/",
                    collocations: ["bearing wear prediction", "FFT spectral analysis", "edge classification pipeline"]
                }
            ],
            questions: [
                {
                    id: "emb-q6",
                    prompt: "What is the primary benefit of performing INT8 post-training quantization on a neural network deployed on an ARM Cortex-M microcontroller?",
                    options: [
                        "It increases the model size by four times to fill unused flash memory.",
                        "It reduces flash footprint by 75% and dramatically speeds up inference using single-cycle SIMD arithmetic with minimal accuracy loss.",
                        "It converts the microcontroller into a cloud server.",
                        "It enables the microcontroller to execute Python scripts natively."
                    ],
                    correctIndex: 1,
                    explanation: "Quantizing 32-bit floating-point weights to 8-bit integers achieves a 4x reduction in memory footprint and enables single-cycle integer SIMD instructions (such as ARM SMLAD), providing high inference throughput within constrained SRAM."
                }
            ],
            dialogues: [
                {
                    speaker: "Dr. Ethan Brooks",
                    role: "Director of Edge AI Research (San Jose HQ)",
                    text: "Our autoencoder model for ultrasonic bearing fault classification is 380 kilobytes in float32. Our production sensor node uses an STM32WB with only 128 kilobytes of user RAM. What is your optimization strategy?"
                },
                {
                    speaker: "Mariana Alatorre",
                    role: "TinyML Embedded Engineer (Guadalajara Electronics Hub)",
                    text: "We ran full integer quantization using a representative calibration dataset of 500 vibration spectrograms. The model footprint shrank to 92 kilobytes, fitting comfortably inside flash, and we optimized the static Tensor Arena to 24 kilobytes of SRAM. Inference latency on the Cortex-M4 core dropped from 240 milliseconds to 38 milliseconds at 64 megahertz."
                }
            ]
        },
        {
            id: "emb-m6",
            title: "Secure Bootloaders, Cryptographic Root-of-Trust & Over-The-Air (OTA) Updates",
            titleES: "Cargadores de Arranque Seguros (Secure Bootloaders), Raíz de Confianza Criptográfica y Actualizaciones OTA",
            icon: "fa-solid fa-lock",
            readings: [
                {
                    id: "emb-m6-r1",
                    title: "Secure Boot Chain: Hardware Root of Trust, ECDSA Signature Verification & Anti-Rollback Monotonic Counters",
                    duration: "15 min",
                    content: `> **Cybersecurity Embedded Standard**: **NIST SP 800-193 (Platform Firmware Resiliency Guidelines)** and **ISO/SAE 21434 Road Vehicles - Cybersecurity Engineering**.

# Secure Boot: Establishing the Hardware Chain of Trust

### 1. The Anatomy of an Embedded Boot Attack
Without a cryptographically verified boot process, an adversary with physical or remote bus access can flash malicious firmware onto an ECU. Such rogue firmware can disable safety interlocks, exfiltrate proprietary control parameters, or bridge isolated automotive subnetworks.

### 2. The Chain of Trust Architecture

\`\`\`
[ Hardware Root of Trust (Immutable ROM) ]
                   | Verifies Public Key & ECDSA Signature
                   v
[ First-Stage Bootloader (FSBL) ]
                   | Verifies Second-Stage Hash
                   v
[ Second-Stage Bootloader (SSBL) ]
                   | Authenticates Application Image
                   v
[ Main Firmware (AUTOSAR / FreeRTOS Application) ]
\`\`\`

1. **Hardware Root of Trust (RoT)**: Immutable boot ROM code etched into the silicon during semiconductor manufacturing. The RoT cannot be altered, patched, or erased.
2. **Cryptographic Signature Verification**:
   - The vendor signs the compiled binary with a private asymmetric key (e.g., **ECDSA curve secp256r1** or Ed25519) in a secure build server (Hardware Security Module, HSM).
   - The public key or its cryptographic hash is permanently burned into the target MCU's **One-Time Programmable (OTP) fuses** or Hardware Security Module (HSM / SHE).
   - Before branching execution to the application code, the bootloader computes the SHA-256 hash of the image and verifies the digital signature. If the signature is invalid, the MCU immediately halts or enters a safe recovery mode.

### 3. Dual-Bank Flash & Anti-Rollback Protection
Over-the-Air (OTA) updates introduce severe failure risks during flashing (power loss during write cycles, corrupted communication packets):
- **A/B Dual-Bank Partitioning**: The MCU flash memory is divided into two identical banks (Bank A and Bank B). The active firmware executes from Bank A while the incoming OTA payload is written into Bank B in the background. Once written and verified, a boot flag switches the active bank on the next reboot. If Bank B fails self-tests, the bootloader automatically rolls back to Bank A.
- **Anti-Rollback Monotonic Counters**: Attackers often attempt \"downgrade attacks,\" flashing an older, legitimate, but known-vulnerable firmware release. Hardware monotonic counters burned into fuses ensure that the bootloader rejects any binary with a version number lower than the currently recorded counter.`
                }
            ],
            vocabulary: [
                {
                    en: "Hardware Root of Trust (RoT)",
                    es: "Raíz de Confianza en Hardware (RoT)",
                    definition: "Cryptographic foundation permanently embodied in hardware that is inherently trusted to initiate the secure boot process without vulnerability to software modification.",
                    ipa: "/ˈhɑːrd.wɛər ruːt əv trʌst/",
                    collocations: ["immutable boot ROM", "burn OTP security fuses", "silicon root of trust"]
                },
                {
                    en: "Over-The-Air (OTA) Update",
                    es: "Actualización Inalámbrica (OTA)",
                    definition: "Mechanism for remotely distributing and flashing new firmware, configuration, or encryption keys to embedded devices over wireless cellular or Wi-Fi networks.",
                    ipa: "/ˈoʊ.vər ði ɛər ˈʌp.deɪt/",
                    collocations: ["A/B dual-bank flash swap", "fail-safe OTA rollback", "cryptographically signed OTA payload"]
                },
                {
                    en: "Anti-Rollback Protection",
                    es: "Protección Contra Reversión (Anti-Rollback)",
                    definition: "Security mechanism utilizing monotonic hardware counters to prevent an attacker from flashing an older firmware version with known security exploits.",
                    ipa: "/ˈæn.taɪ ˈroʊl.bæk prəˈtɛk.ʃən/",
                    collocations: ["monotonic fuse counter", "prevent downgrade attacks", "anti-rollback firmware policy"]
                }
            ],
            questions: [
                {
                    id: "emb-q7",
                    prompt: "Why is an A/B dual-bank flash architecture combined with monotonic counters critical for automotive OTA firmware updates?",
                    options: [
                        "It eliminates the need for any wireless communications transceiver in the car.",
                        "It enables background flashing with zero vehicle downtime and provides atomic fallback if the new image is corrupted, while monotonic counters prevent downgrade attacks.",
                        "It doubles the vehicle's horsepower output.",
                        "It formats the internal flash memory every time the vehicle engine is turned off."
                    ],
                    correctIndex: 1,
                    explanation: "Dual-bank flash allows writing the incoming update while the existing firmware operates normally; if the new image fails validation or power is severed, the bootloader safely reboots into the known-good bank, and monotonic counters block malicious version rollbacks."
                }
            ],
            dialogues: [
                {
                    speaker: "Charles Sterling",
                    role: "Chief Cybersecurity Architect (Automotive OEM)",
                    text: "If a fleet gateway loses cellular connectivity during a 45-megabyte firmware download midway through writing to flash, what guarantees our ECU will not be permanently bricked?"
                },
                {
                    speaker: "Fernando Ortiz",
                    role: "Secure Bootloader Architect (Guadalajara Facility)",
                    text: "We implement an A/B dual-bank memory map with SHA-256 block integrity hashes. The active application runs uninterrupted from Bank A. Bank B is only staged and validated; the bootloader will never swap the execution pointer until the complete binary passes ECDSA signature verification and the self-test flag is acknowledged on first boot."
                }
            ]
        }
    ]
};

// Check if already injected
const matchExisting = fileContent.match(/"embedded-firmware-edge-ai"\s*:/);
if (matchExisting) {
    console.log("Track 33 is already present in courses.js! Skipping duplicate insertion.");
} else {
    // Inject Track 33 before the last closing of LXP_COURSES
    // Find the last closing brace of LXP_COURSES
    const lastBraceIndex = fileContent.lastIndexOf('};');
    if (lastBraceIndex === -1) {
        console.error("Could not find '};' in courses.js");
        process.exit(1);
    }

    const before = fileContent.substring(0, lastBraceIndex);
    const after = fileContent.substring(lastBraceIndex);

    // Format track 33 JSON with clean indentation
    const track33Str = `,\n    "embedded-firmware-edge-ai": ` + JSON.stringify(track33, null, 8);

    const updatedContent = before + track33Str + "\n" + after;
    fs.writeFileSync(coursesPath, updatedContent, 'utf8');
    console.log("Successfully injected Track 33 (embedded-firmware-edge-ai) into content/courses.js!");
}
