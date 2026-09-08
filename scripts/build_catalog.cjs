// scripts/build_catalog.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawSource = fs.readFileSync(coursesPath, 'utf8');

const sandbox = {};
vm.runInNewContext(rawSource + '; __courses = LXP_COURSES;', sandbox);
const existingCourses = sandbox.__courses;

console.log('Loaded existing courses:', Object.keys(existingCourses));

const LXP_CATEGORIES = {
  "technology": {
    id: "technology",
    name: "Technology",
    nameES: "Tecnología",
    color: "#38bdf8",
    accent: "cyan",
    icon: "fa-solid fa-laptop-code",
    badge: "🔵 TECHNOLOGY",
    description: "Redes avanzadas, inteligencia artificial, IoT, desarrollo de software y computación en la nube para la industria global."
  },
  "engineering": {
    id: "engineering",
    name: "Engineering & Industry",
    nameES: "Ingeniería e Industria",
    color: "#34d399",
    accent: "emerald",
    icon: "fa-solid fa-gears",
    badge: "🟢 ENGINEERING & INDUSTRY",
    description: "Manufactura de alta precisión, semiconductores, electromovilidad, robótica y sistemas mecatrónicos de nearshoring."
  },
  "science": {
    id: "science",
    name: "Science & Future Technology",
    nameES: "Ciencia y Tecnología del Futuro",
    color: "#c084fc",
    accent: "purple",
    icon: "fa-solid fa-atom",
    badge: "🟣 SCIENCE & FUTURE TECHNOLOGY",
    description: "Biotecnología, tecnología espacial, sustentabilidad ambiental, nanotecnología y ciencias aplicadas."
  },
  "career": {
    id: "career",
    name: "Aviation, Career & Professional English",
    nameES: "Inglés para Aviación, Carrera y Profesional",
    color: "#fb923c",
    accent: "orange",
    icon: "fa-solid fa-plane-departure",
    badge: "🟠 AVIATION, CAREER & PROFESSIONAL ENGLISH",
    description: "Inglés técnico para aviación civil (OACI), aeroespacial de defensa, gestión ejecutiva, liderazgo y proyectos globales."
  }
};

// Build updated catalog
const updatedCourses = {};

// 1. TECHNOLOGY
// 1.1 Cybersecurity (Existing)
updatedCourses["cybersecurity"] = {
  ...existingCourses["cybersecurity"],
  category: "technology"
};

// 1.2 IT Innovation (Existing)
updatedCourses["it-innovation"] = {
  ...existingCourses["it-innovation"],
  category: "technology"
};

// 1.3 AI & Machine Learning (NEW - Priority)
updatedCourses["ai-ml"] = {
  id: "ai-ml",
  title: "Inteligencia Artificial y Aprendizaje Automático",
  titleEN: "AI & Machine Learning",
  category: "technology",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "IEEE 7000 / ISO 42001 AI Management",
  conocer: "EC1421 (Desarrollo de Soluciones de Inteligencia Artificial)",
  ngss: "Computer Science & Machine Intelligence Engineering",
  industry: "Global Deep Learning & Edge AI Standard",
  icon: "fa-solid fa-brain",
  description: "Inglés técnico para modelos neuronales profundos, inferencia en el borde (Edge NPU), visión artificial y arquitecturas Transformers.",
  modules: [
    {
      id: "aiml-m1",
      title: "Foundational Neural Networks & Edge AI Accelerators",
      titleES: "Redes Neuronales Fundamentales y Aceleradores Edge AI",
      icon: "fa-solid fa-microchip",
      readings: [
        {
          id: "aiml-m1-r1",
          title: "Deep Learning Architectures & Edge AI Accelerators",
          duration: "10 min",
          content: `
> **Industry Certification Note**: This module aligns with the **NVIDIA Certified Associate: Generative AI and LLMs** and **AWS Certified Machine Learning - Specialty (MLS-C01)** frameworks, establishing technical competency in deep learning architectures and hardware deployment.

# Deep Learning Architectures & Edge AI Accelerators: From Backpropagation to On-Device NPU Inference

In modern industrial engineering, Artificial Intelligence is no longer restricted to remote cloud data centers. From high-speed SMT assembly lines in Guadalajara to vision-guided quality stations in Ciudad Juárez, machine learning models execute directly on **Edge Hardware Accelerators**—including Neural Processing Units (NPUs), Tensor Processing Units (TPUs), and embedded GPUs.

## 1. The Core Mechanics of Artificial Neural Networks

An **Artificial Neural Network (ANN)** is a computational architecture inspired by biological neural networks. It consists of layers of interconnected nodes called **neurons**:

- **Input Layer**: Receives raw numerical features (e.g., sensor telemetry, image pixel tensors).
- **Hidden Layers**: Perform mathematical transformations via weighted linear combinations followed by non-linear **activation functions** (such as ReLU, GELU, or Sigmoid).
- **Output Layer**: Produces target predictions, such as categorical classifications (e.g., defective vs. non-defective PCB) or regression values (e.g., estimated time-to-failure in hours).

During the training phase, the model calculates the error between its prediction and the ground-truth label using a **Loss Function** (e.g., Cross-Entropy Loss or Mean Squared Error). The **Backpropagation algorithm** then computes partial derivatives via the mathematical chain rule, updating synaptic weights through **Stochastic Gradient Descent (SGD)** or Adam optimizers:

$$w_{new} = w_{old} - \\eta \\cdot \\nabla L(w)$$

Where $\\eta$ represents the learning rate and $\\nabla L(w)$ is the gradient of the loss function with respect to weights.

## 2. Cloud Training vs. Edge Inference

A critical distinction in industrial AI engineering is the operational divergence between **training** and **inference**:

1. **Model Training**: Extremely compute-intensive process requiring high-precision floating-point arithmetic (FP32 or BF16) executed on clusters of data center GPUs across days or weeks.
2. **Edge Inference**: The execution of a pre-trained model on local embedded devices in real time under strict electrical power, memory, and thermal constraints.

In nearshoring manufacturing plants, edge inference is mandatory because cloud round-trips introduce **network latency** (typically 60–150 milliseconds) and pose severe cybersecurity and data-sovereignty risks. An industrial automated optical inspection (AOI) robot inspecting 20 semiconductor wafers per second cannot tolerate network drops; it must classify images within **<15 milliseconds** entirely on-device.

## 3. Quantization and Model Optimization for Edge NPUs

To deploy a multi-million parameter neural network on an edge device, engineers apply rigorous model compression techniques:

- **Quantization (PTQ & QAT)**: Converting high-precision 32-bit floating point weights (FP32) into 8-bit integers (INT8). Quantization slashes memory footprints by **75%** and unlocks ultra-high throughput on specialized integer matrix engines (NPUs) with negligible accuracy degradation (<0.5%).
- **Weight Pruning**: Removing redundant synaptic weights whose mathematical contribution is near zero, inducing sparsity and reducing computational FLOPs.
- **Knowledge Distillation**: Training a compact, lightweight "Student" model to mimic the probability distribution of an unwieldy "Teacher" model.

---

> **Key Takeaway**: Industrial AI bridges mathematical deep learning (**backpropagation, loss functions, activation curves**) with low-latency hardware execution (**Edge NPUs, INT8 quantization, sub-20ms inference**). Mastery of these technical English concepts enables engineers to design and audit autonomous inspection systems for multinational OEM operations.
`,
          vocabulary: [
            { en: "Backpropagation", es: "Retropropagación", definition: "Algorithm computing gradients of loss with respect to weights via the chain rule" },
            { en: "Activation Function", es: "Función de Activación", definition: "Non-linear mathematical function (e.g., ReLU, GELU) determining neuron firing" },
            { en: "Quantization (INT8)", es: "Cuantización (INT8)", definition: "Process of reducing model weights from 32-bit float to 8-bit integers for edge efficiency" },
            { en: "Neural Processing Unit (NPU)", es: "Unidad de Procesamiento Neural (NPU)", definition: "Specialized silicon accelerator optimized for tensor and matrix operations" },
            { en: "Inference Latency", es: "Latencia de Inferencia", definition: "Time elapsed from input presentation to output prediction by a neural model" },
            { en: "Loss Function", es: "Función de Pérdida", definition: "Metric measuring discrepancy between predicted outputs and ground-truth labels" }
          ],
          questions: [
            { q: "Why is Edge Inference preferred over Cloud Inference in manufacturing AOI stations?", options: ["Cloud inference is free", "Edge inference eliminates network latency (<15ms) and guarantees local reliability", "Edge hardware requires no electricity", "Cloud models cannot process numbers"], answer: 1 },
            { q: "What is the primary operational benefit of INT8 Quantization?", options: ["It increases image resolution", "It reduces memory footprint by ~75% and accelerates NPU matrix calculations", "It deletes the loss function", "It converts code from Python to C++"], answer: 1 },
            { q: "Which mathematical algorithm calculates gradients for weight updates in neural networks?", options: ["QuickSort", "Backpropagation", "Monte Carlo Tree Search", "K-Means Clustering"], answer: 1 },
            { q: "What does the activation function introduce into a deep neural network?", options: ["Non-linearity", "Network latency", "Hardware failure", "Database indexing"], answer: 0 }
          ]
        }
      ]
    },
    {
      id: "aiml-m2",
      title: "Transformers & Large Language Model Architecture",
      titleES: "Arquitectura Transformer y Modelos de Lenguaje Masivo (LLM)",
      icon: "fa-solid fa-layer-group",
      readings: []
    },
    {
      id: "aiml-m3",
      title: "Computer Vision & Automated Optical Inspection (AOI)",
      titleES: "Visión Artificial e Inspección Óptica Automatizada",
      icon: "fa-solid fa-eye",
      readings: []
    },
    {
      id: "aiml-m4",
      title: "MLOps: CI/CD Pipelines & Model Deployment",
      titleES: "MLOps: Pipelines CI/CD y Despliegue de Modelos",
      icon: "fa-solid fa-server",
      readings: []
    },
    {
      id: "aiml-m5",
      title: "AI Governance, Safety & Bias Mitigation",
      titleES: "Gobernanza de IA, Seguridad y Mitigación de Sesgos",
      icon: "fa-solid fa-shield-halved",
      readings: []
    }
  ]
};

// 1.4 Telecommunications & IoT
updatedCourses["telecom-iot"] = {
  id: "telecom-iot",
  title: "Telecomunicaciones e Internet de las Cosas (IoT)",
  titleEN: "Telecommunications & IoT",
  category: "technology",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "IEEE 802.11 / 3GPP 5G NR / LoRaWAN Standard",
  conocer: "EC1290 (Instalación de Sistemas de Telecomunicaciones)",
  ngss: "Telecommunications & Embedded IoT Systems",
  industry: "Global 5G & Industrial IoT (IIoT) Standard",
  icon: "fa-solid fa-tower-cell",
  description: "Protocolos de comunicación inalámbrica (5G NR, LoRaWAN, MQTT), sensores embebidos y redes industriales de telemetría.",
  modules: [
    { id: "iot-m1", title: "Industrial IoT Protocols: MQTT, CoAP and OPC UA", titleES: "Protocolos IoT Industrial: MQTT, CoAP y OPC UA", icon: "fa-solid fa-wifi", readings: [] },
    { id: "iot-m2", title: "5G New Radio (NR) & Private Industrial Cellular Networks", titleES: "5G New Radio y Redes Celulares Privadas Industriales", icon: "fa-solid fa-signal", readings: [] },
    { id: "iot-m3", title: "LPWAN Technologies: LoRaWAN and NB-IoT Deployment", titleES: "Tecnologías LPWAN: Despliegue de LoRaWAN y NB-IoT", icon: "fa-solid fa-satellite-dish", readings: [] },
    { id: "iot-m4", title: "Embedded Microcontrollers & Sensor Interfacing (I2C, SPI)", titleES: "Microcontroladores Embebidos e Interfaces de Sensores (I2C, SPI)", icon: "fa-solid fa-microchip", readings: [] },
    { id: "iot-m5", title: "Edge Gateway Security & Remote Telemetry Management", titleES: "Seguridad en Gateways de Borde y Gestión de Telemetría", icon: "fa-solid fa-lock", readings: [] }
  ]
};

// 1.5 Software Development & Programming
updatedCourses["software-dev"] = {
  id: "software-dev",
  title: "Desarrollo de Software y Programación",
  titleEN: "Software Development & Programming",
  category: "technology",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "ISO/IEC 25010 Software Engineering / Clean Code",
  conocer: "EC1086 (Programación de Aplicaciones Web)",
  ngss: "Software Engineering & Algorithmic Design",
  industry: "Full-Stack Enterprise Software Architecture Standard",
  icon: "fa-solid fa-code",
  description: "Ingeniería de software moderna: paradigmas funcionales y OOP, APIs REST/gRPC, microservicios, testing automatizado y patrones de diseño.",
  modules: [
    { id: "soft-m1", title: "Modern Software Paradigms: OOP vs Functional Architecture", titleES: "Paradigmas Modernos: OOP vs Arquitectura Funcional", icon: "fa-solid fa-cubes", readings: [] },
    { id: "soft-m2", title: "High-Performance API Design: REST, GraphQL and gRPC", titleES: "Diseño de APIs de Alto Rendimiento: REST, GraphQL y gRPC", icon: "fa-solid fa-network-wired", readings: [] },
    { id: "soft-m3", title: "Containerization & Orchestration: Docker and Kubernetes", titleES: "Contenedores y Orquestación: Docker y Kubernetes", icon: "fa-solid fa-box", readings: [] },
    { id: "soft-m4", title: "Test-Driven Development (TDD) & Automated CI/CD", titleES: "Desarrollo Guiado por Pruebas (TDD) y CI/CD Automatizado", icon: "fa-solid fa-vial-circle-check", readings: [] },
    { id: "soft-m5", title: "Design Patterns & Scalable Microservices Architecture", titleES: "Patrones de Diseño y Arquitectura de Microservicios", icon: "fa-solid fa-diagram-project", readings: [] }
  ]
};

// 1.6 Data Science & Analytics (NEW - Priority)
updatedCourses["data-analytics"] = {
  id: "data-analytics",
  title: "Ciencia de Datos y Analítica Avanzada",
  titleEN: "Data Science & Analytics",
  category: "technology",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "ISO/IEC 20547 Big Data / AWS Certified Data Engineer",
  conocer: "EC1350 (Analítica de Datos Industriales)",
  ngss: "Data Science & Applied Computational Statistics",
  industry: "Enterprise Big Data & Lakehouse Analytics Standard",
  icon: "fa-solid fa-chart-pie",
  description: "Inglés técnico para ingeniería de datos a gran escala, almacenamiento columnar (Parquet/Iceberg), inferencia estadística y búsqueda vectorial.",
  modules: [
    {
      id: "data-m1",
      title: "High-Throughput Data Pipelines & Modern Lakehouse Architecture",
      titleES: "Pipelines de Datos de Alto Rendimiento y Arquitectura Lakehouse",
      icon: "fa-solid fa-database",
      readings: [
        {
          id: "data-m1-r1",
          title: "Modern Data Engineering: Ingestion, Streaming, and Lakehouse Storage at Scale",
          duration: "10 min",
          content: `
> **Industry Certification Note**: This module aligns with the **Databricks Certified Data Engineer Associate** and **AWS Certified Data Engineer - Associate (DEA-C01)** frameworks, validating high-throughput ETL/ELT pipeline design and modern Lakehouse storage architecture.

# Modern Data Engineering: Ingestion, Streaming, and Lakehouse Storage at Scale

In multi-national nearshoring manufacturing operations, industrial telemetry is generated at staggering rates. Thousands of automated test benches, robotic arms, and CNC controllers stream vibration metrics, thermal logs, and cycle times continuously. Transforming this raw deluge into actionable executive insights requires a resilient **Modern Data Architecture**.

## 1. Batch Processing vs. Event-Driven Streaming

Traditionally, data was collected throughout a shift and processed in large **batch jobs** overnight using tools like Apache Hadoop MapReduce. While efficient for payroll and monthly billing, batch processing introduces hours of data latency.

Modern industrial operations rely instead on **Event-Driven Streaming Ingestion**:
- **Message Brokers (Apache Kafka, AWS Kinesis)**: Act as durable, distributed, fault-tolerant ingestion buffers capable of handling millions of concurrent events per second with sub-second latency.
- **Stream Processing Engines (Apache Flink, Spark Structured Streaming)**: Apply continuous stateful transformations, windowed aggregations (e.g., computing a rolling 5-minute temperature average), and anomaly detection algorithms in flight.

## 2. Columnar Storage: Parquet and ORC vs. Row-Based Formats

Data lakes no longer store analytical datasets in legacy row-oriented formats like CSV or JSON. Row-oriented storage requires reading entire records from disk just to query a single column:

- **Row-Oriented (CSV / PostgreSQL)**: Ideal for Online Transaction Processing (**OLTP**) where single records are inserted or updated by ID.
- **Columnar Storage (Apache Parquet / ORC)**: The bedrock of Online Analytical Processing (**OLAP**). Values from the same column are stored contiguously on disk.

Because values within a column share the same data type (e.g., floating-point sensor voltages), columnar engines achieve massive **Snappy/ZSTD compression ratios (up to 80%)** and utilize **Dictionary Encoding**. Furthermore, query engines utilize **Projection Pushdown** (reading only requested columns) and **Predicate Pushdown** (skipping disk blocks using min/max metadata statistics), accelerating query execution by orders of magnitude.

## 3. The Lakehouse Paradigm: ACID Guarantees on Object Storage

Historically, enterprises maintained two separate systems: a scalable but unmanaged **Data Lake** (AWS S3, Azure Blob, MinIO) for raw files, and a high-performance **Data Warehouse** (Snowflake, BigQuery) for structured queries. 

The **Data Lakehouse** architecture merges both worlds by introducing a transactional storage layer (such as **Delta Lake** or **Apache Iceberg**) directly on top of cheap cloud object storage:
- **ACID Transactions**: Guarantees Atomicity, Consistency, Isolation, and Durability, eliminating corrupted reads during concurrent write operations.
- **Time Travel & Data Versioning**: Enables engineers to query historical snapshots of the dataset to audit algorithmic models or reproduce quality defect investigations.
- **Schema Enforcement**: Prevents corrupt or malformed payloads from polluting clean analytical tables.

---

> **Key Takeaway**: Modern data analytics depends on **event streaming buffers (Kafka)**, **compressed columnar formats (Parquet)**, and **transactional lakehouse layers (Iceberg/Delta Lake)**. Mastering this technical English vocabulary empowers engineers to build scalable data telemetry backbones across cross-border industrial enterprises.
`,
          vocabulary: [
            { en: "Columnar Storage", es: "Almacenamiento Columnar", definition: "Data organization storing columns together on disk, optimizing analytical aggregation" },
            { en: "Lakehouse", es: "Lakehouse de Datos", definition: "Architecture combining the low cost of data lakes with the ACID transactions of warehouses" },
            { en: "Predicate Pushdown", es: "Empuje de Predicados (Predicate Pushdown)", definition: "Query optimization filtering data at disk storage level before loading into memory" },
            { en: "ACID Transactions", es: "Transacciones ACID", definition: "Set of properties (Atomicity, Consistency, Isolation, Durability) ensuring database reliability" },
            { en: "Event-Driven Streaming", es: "Transmisión Basada en Eventos", definition: "Real-time continuous data processing as individual events occur" },
            { en: "Data Pipeline", es: "Pipeline de Datos (ETL/ELT)", definition: "Series of automated stages extracting, transforming, and loading data" }
          ],
          questions: [
            { q: "Why is Apache Parquet preferred over CSV for analytical queries on billions of records?", options: ["Parquet files are human-readable in Notepad", "Parquet utilizes columnar storage and compression to read only requested columns", "CSV files cannot store numbers", "Parquet is an executable binary file"], answer: 1 },
            { q: "What does Predicate Pushdown achieve in modern query engines?", options: ["It crashes slow queries", "It evaluates WHERE filters at the storage layer to skip irrelevant disk blocks", "It translates queries to Spanish", "It encrypts network passwords"], answer: 1 },
            { q: "Which feature of a Data Lakehouse allows developers to query past historical states of a table?", options: ["Time Travel / Data Versioning", "RAM Caching", "Garbage Collection", "DNS Routing"], answer: 0 },
            { q: "Which tool is standard for real-time distributed message streaming in data engineering?", options: ["Apache Kafka", "Microsoft Excel", "HTML5 Canvas", "SQLite"], answer: 0 }
          ]
        }
      ]
    },
    { id: "data-m2", title: "SQL at Scale, Indexing & Query Execution Plans", titleES: "SQL a Escala, Indexación y Planes de Ejecución", icon: "fa-solid fa-bolt", readings: [] },
    { id: "data-m3", title: "Statistical Inference, Hypothesis Testing & A/B Experimentation", titleES: "Inferencia Estadística y Pruebas de Hipótesis", icon: "fa-solid fa-calculator", readings: [] },
    { id: "data-m4", title: "Predictive Analytics, Time-Series & Anomaly Detection", titleES: "Analítica Predictiva, Series de Tiempo y Anomalías", icon: "fa-solid fa-chart-line", readings: [] },
    { id: "data-m5", title: "Vector Databases, High-Dimensional Embeddings & Semantic Search", titleES: "Bases de Datos Vectoriales y Búsqueda Semántica", icon: "fa-solid fa-magnifying-glass-chart", readings: [] }
  ]
};

// 2. ENGINEERING & INDUSTRY
// 2.1 Semiconductors (Existing)
updatedCourses["semiconductors"] = {
  ...existingCourses["semiconductors"],
  category: "engineering"
};

// 2.2 Electromobility (Existing)
updatedCourses["electromobility"] = {
  ...existingCourses["electromobility"],
  category: "engineering"
};

// 2.3 Aerospace Manufacturing (Existing)
updatedCourses["aerospace"] = {
  ...existingCourses["aerospace"],
  category: "engineering"
};

// 2.4 Robotics & Automation (NEW - Priority)
updatedCourses["robotics-automation"] = {
  id: "robotics-automation",
  title: "Robótica Industrial y Automatización",
  titleEN: "Robotics & Automation",
  category: "engineering",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "ISO 10218 / RIA R15.06 Industrial Robot Safety / IEC 61131-3",
  conocer: "EC1338 (Programación y Mantenimiento de Robots Industriales)",
  ngss: "Robotics & Automated Mechatronic Systems Engineering",
  industry: "Global Industrial Automation & Cobots Standard",
  icon: "fa-solid fa-robot",
  description: "Cinemática de manipuladores articulados de 6 ejes, programación de controladores lógicos (PLCs), cobots y middleware ROS 2.",
  modules: [
    {
      id: "robot-m1",
      title: "Industrial Robot Kinematics & Coordinate Systems",
      titleES: "Cinemática de Robots Industriales y Sistemas de Coordenadas",
      icon: "fa-solid fa-compass",
      readings: [
        {
          id: "robot-m1-r1",
          title: "6-Axis Articulated Robots: Forward and Inverse Kinematics in Modern Automation",
          duration: "10 min",
          content: `
> **Industrial Robotics Standard Note**: This curriculum adheres to **ISO 10218-1/2** (Safety requirements for industrial robots) and **RIA R15.06** standards, providing foundational competencies for robotic cell integration across automotive, aerospace, and electronics manufacturing.

# 6-Axis Articulated Robots: Forward and Inverse Kinematics in Modern Automation

Across automotive plants in Saltillo, Puebla, and Hermosillo, **6-Axis Articulated Industrial Robots** (manufactured by FANUC, ABB, KUKA, and Yaskawa) form the backbone of high-volume manufacturing. Whether executing high-amperage spot welding on vehicle chassis or precision dispensing of thermal adhesive on EV battery modules, these robotic arms operate with sub-millimeter precision.

## 1. Anatomy and Degrees of Freedom (6-DoF)

An articulated industrial manipulator utilizes an open kinematic chain composed of rigid links connected by motorized revolute joints. A standard 6-axis arm possesses **six degrees of freedom (6-DoF)**, mirroring human arm dexterity:

1. **Axis 1 (Base / Waist)**: Rotates the entire arm horizontally around the central pedestal.
2. **Axis 2 (Shoulder)**: Moves the lower arm vertically forward and backward.
3. **Axis 3 (Elbow)**: Pivots the upper arm up and down.
4. **Axis 4 (Forearm Roll)**: Rotates the wrist mechanism along its longitudinal axis.
5. **Axis 5 (Wrist Pitch / Bend)**: Tilts the end-of-arm tool up and down.
6. **Axis 6 (Wrist Roll / Flange)**: Rotates the mounting flange where the **End-Effector** (gripper, laser head, welding torch) is secured.

Six independent axes are the mathematical minimum required to position a tool at any arbitrary coordinate in 3D space $(X, Y, Z)$ while orienting it at any rotational angle (Roll, Pitch, Yaw).

## 2. Forward vs. Inverse Kinematics

Controlling a robotic manipulator requires mastering coordinate transformations between **Joint Space** and **Cartesian Space**:

- **Forward Kinematics (FK)**: Given the angular positions of all six revolute joints $(\\theta_1, \\theta_2, \\theta_3, \\theta_4, \\theta_5, \\theta_6)$, Forward Kinematics computes the exact Cartesian pose (position and orientation) of the Tool Center Point (TCP). Because each joint angle directly dictates link geometry, FK always yields a single, deterministic solution calculated using **Denavit-Hartenberg (D-H) parameter matrices**.
- **Inverse Kinematics (IK)**: The reverse and vastly more complex problem. Given a desired spatial destination for the TCP $(X, Y, Z, W, P, R)$, Inverse Kinematics calculates the required joint angles to achieve that pose. IK often yields **multiple mathematical configurations** (e.g., elbow-up vs. elbow-down, wrist-flipped) or no solution if the target lies outside the robot's **Work Envelope**.

## 3. Singularity Avoidance and Path Planning

A critical challenge in robot programming is avoiding **Kinematic Singularities**:
- A singularity occurs when two joint axes align collinearly, causing the robot's Jacobian matrix to lose mathematical rank.
- At a singularity point, the robot loses a degree of freedom in Cartesian space, requiring infinite joint velocity to sustain linear tool movement.
- Modern robot controllers enforce singularity avoidance algorithms, decelerating the arm or re-routing trajectory to prevent mechanical motor overcurrent and violent vibrations.

## 4. Repeatability vs. Accuracy (ISO 9283)

Engineers must never confuse precision metrics:
- **Pose Accuracy**: The ability of the robot to move to a command target coordinate in free space.
- **Pose Repeatability**: The ability of the robot to return to the exact same taught position after hundreds of thousands of cycles. Industrial robots exhibit outstanding repeatability (typically **$\\pm 0.02$ mm**), even if absolute spatial accuracy varies slightly due to arm deflection and temperature expansion.

---

> **Key Takeaway**: Industrial robotic integration combines **joint mechanics (6-DoF)** with rigorous spatial mathematics (**Forward/Inverse Kinematics, Tool Center Point calibration, and singularity avoidance**). Fluency in robotics English enables automation engineers to commission robotic workcells and resolve critical faults in multinational plants.
`,
          vocabulary: [
            { en: "Inverse Kinematics (IK)", es: "Cinemática Inversa", definition: "Mathematical calculation of required joint angles to place a tool at a target Cartesian coordinate" },
            { en: "Tool Center Point (TCP)", es: "Punto Central de la Herramienta (TCP)", definition: "The exact coordinate point at the tip of the end-effector where work is executed" },
            { en: "Kinematic Singularity", es: "Singularidad Cinemática", definition: "Alignment of joint axes causing loss of degrees of freedom and unbounded joint velocity" },
            { en: "End-Effector", es: "Efector Final / Garra", definition: "Tool mounted to the robot flange that interacts with parts (gripper, welder, dispenser)" },
            { en: "Work Envelope", es: "Espacio de Trabajo", definition: "The total 3D spatial boundary within which a robot can position its TCP" },
            { en: "Pose Repeatability", es: "Repetibilidad de Pose", definition: "Ability of a robot to return to an identical taught position across continuous cycles" }
          ],
          questions: [
            { q: "What is the primary difference between Forward Kinematics (FK) and Inverse Kinematics (IK)?", options: ["FK computes Cartesian pose from joint angles; IK calculates joint angles from a desired Cartesian pose", "FK moves backward; IK moves forward", "FK is only for electric motors; IK is for pneumatic valves", "There is no mathematical difference"], answer: 0 },
            { q: "What dangerous operational condition occurs at a Kinematic Singularity?", options: ["The battery discharges completely", "Joint axes align, requiring theoretical infinite joint velocity for linear motion", "The TCP changes color", "The gripper opens automatically"], answer: 1 },
            { q: "How many degrees of freedom (DoF) are mathematically required for full 3D spatial positioning and orientation?", options: ["2 DoF", "4 DoF", "6 DoF", "12 DoF"], answer: 2 },
            { q: "Which metric describes a robot's ability to return to the exact same taught coordinate cycle after cycle?", options: ["Pose Repeatability", "Operating Voltage", "Network Latency", "Thermal Dissipation"], answer: 0 }
          ]
        }
      ]
    },
    { id: "robot-m2", title: "Programmable Logic Controllers (PLCs) & IEC 61131-3", titleES: "Controladores Lógicos Programables (PLCs) y Norma IEC 61131-3", icon: "fa-solid fa-gears", readings: [] },
    { id: "robot-m3", title: "Collaborative Robots (Cobots) & ISO 10218 / TS 15066 Safety", titleES: "Robots Colaborativos (Cobots) y Seguridad ISO 10218", icon: "fa-solid fa-shield-virus", readings: [] },
    { id: "robot-m4", title: "Robot Operating System (ROS 2) & Real-Time Middleware", titleES: "Robot Operating System (ROS 2) y Middleware en Tiempo Real", icon: "fa-solid fa-network-wired", readings: [] },
    { id: "robot-m5", title: "End-Effectors, Grippers & Sensor-Guided Manipulation", titleES: "Efectores Finales, Garras y Manipulación Guiada por Sensores", icon: "fa-solid fa-hand", readings: [] }
  ]
};

// 2.5 Energy & Renewable Technologies (NEW - Priority)
updatedCourses["energy-renewables"] = {
  id: "energy-renewables",
  title: "Energías Renovables y Tecnologías Limpias",
  titleEN: "Energy & Renewable Technologies",
  category: "engineering",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "IEEE 1547 Interconnection / IEC 61215 PV / IEC 61400 Wind",
  conocer: "EC0586 (Instalación de Sistemas Fotovoltaicos en Residencia y Comercio)",
  ngss: "Clean Energy Engineering & Electric Grid Integration",
  industry: "Global Renewable Infrastructure & BESS Storage Standard",
  icon: "fa-solid fa-solar-panel",
  description: "Sistemas fotovoltaicos a gran escala, aerodinámica de turbinas eólicas, sistemas de almacenamiento de baterías (BESS) y redes inteligentes (Smart Grids).",
  modules: [
    {
      id: "energy-m1",
      title: "Utility-Scale Solar PV Systems & Grid Synchronization",
      titleES: "Sistemas Fotovoltaicos a Gran Escala y Sincronización a la Red",
      icon: "fa-solid fa-sun",
      readings: [
        {
          id: "energy-m1-r1",
          title: "Utility-Scale Photovoltaics: Inverter Dynamics, MPPT, and Grid Stability",
          duration: "10 min",
          content: `
> **Clean Energy Engineering Note**: This module aligns with **IEEE 1547-2018** (Standard for Interconnection and Interoperability of Distributed Energy Resources with Associated Electric Power Systems Interfaces) and **IEC 62109** safety protocols for solar power converters.

# Utility-Scale Photovoltaics: Inverter Dynamics, MPPT, and Grid Stability

As multinational nearshoring corporations mandate 100% renewable energy procurement for Mexican industrial facilities, utility-scale solar farms across Sonora, Coahuila, and Chihuahua play a pivotal role. Generating hundreds of megawatts of clean power requires far more than placing solar panels under sunlight; it demands complex power electronics, real-time grid synchronization, and active voltage regulation.

## 1. Photovoltaic Physics and Maximum Power Point Tracking (MPPT)

A solar cell generates direct current (DC) electricity via the **photovoltaic effect**, where incident photons excite valence electrons into the conduction band of a doped silicon semiconductor.

However, a photovoltaic panel's power output is strictly non-linear and governed by irradiance $(W/m^2)$ and operating junction temperature:
- **I-V Curve**: Plots cell current against voltage from Short-Circuit Current $(I_{sc})$ to Open-Circuit Voltage $(V_{oc})$.
- **P-V Curve**: Plots instantaneous power against voltage, displaying a distinct peak known as the **Maximum Power Point (MPP)**.

Because clouds and ambient temperatures shift continuously, utility-scale inverters run sophisticated **Maximum Power Point Tracking (MPPT)** algorithms (e.g., Perturb & Observe or Incremental Conductance). The inverter rapidly adjusts its internal DC bus impedance hundreds of times per second to keep photovoltaic strings operating precisely at their peak electrical efficiency ($V_{mpp} \\times I_{mpp}$).

## 2. Inverter Topologies: Centralized vs. String Inverters

In multi-megawatt solar plant engineering, choosing the right inverter topology is a foundational CAPEX/OPEX decision:
- **Central Inverters (1.5 MW - 4.5 MW)**: Large, centralized power stations housed in concrete enclosures. DC cabling from hundreds of solar combiner boxes runs to a single central inverter, which steps up power via an integrated transformer. They offer lower initial capital expenditure per watt but introduce a single point of failure.
- **String Inverters (150 kW - 350 kW)**: Distributed across solar array rows. Each string inverter manages a smaller subset of panels with independent MPPT trackers. If one inverter fails, 98% of the solar plant continues feeding power to the grid, optimizing plant **Capacity Factor** and simplifying field maintenance.

## 3. Grid-Following vs. Grid-Forming Inverters (IEEE 1547)

As renewable penetration on the electric grid increases, conventional synchronous generators (coal and gas turbines with massive spinning mechanical inertia) are decommissioned. This creates grid instability:

- **Grid-Following (GFL) Inverters**: Legacy inverters that monitor grid voltage and frequency via a Phase-Locked Loop (PLL), injecting current in synchrony. If grid voltage collapses, GFL inverters disconnect immediately to prevent islanding hazards.
- **Grid-Forming (GFM) Inverters**: The cutting edge of clean power engineering. GFM inverters act as independent AC voltage sources, establishing frequency and voltage reference signals using virtual synchronous machine (VSM) algorithms. They provide synthetic inertia, suppress rapid voltage dips, and facilitate black-start capability after widespread blackout events.

---

> **Key Takeaway**: Utility-scale solar engineering merges **semiconductor physics (photovoltaic effect)** with advanced **power electronics (MPPT algorithms, Central vs. String topologies, and Grid-Forming inverters)**. Command of these technical English concepts is vital for grid interconnection engineers managing multi-million-dollar clean energy projects.
`,
          vocabulary: [
            { en: "Maximum Power Point Tracking (MPPT)", es: "Seguimiento del Punto de Máxima Potencia (MPPT)", definition: "Algorithm maximizing inverter power extraction across variable sunlight and temperature" },
            { en: "Grid-Forming Inverter", es: "Inversor Formador de Red (Grid-Forming)", definition: "Advanced power inverter establishing voltage and frequency independently without grid dependency" },
            { en: "Capacity Factor", es: "Factor de Planta / Capacidad", definition: "Ratio of actual power generated over a time period to the theoretical maximum output" },
            { en: "Open-Circuit Voltage (Voc)", es: "Voltaje de Circuito Abierto (Voc)", definition: "Maximum voltage available from a solar cell with zero current flowing" },
            { en: "Harmonic Distortion (THD)", es: "Distorsión Armónica Total (THD)", definition: "Measurement of electrical noise and waveform deviation in AC power output" },
            { en: "Synthetic Inertia", es: "Inercia Sintética / Virtual", definition: "Emulated mechanical inertia provided by electronic inverters to stabilize grid frequency" }
          ],
          questions: [
            { q: "What is the primary function of an MPPT algorithm in a solar inverter?", options: ["To rotate solar panels physically", "To continuously adjust electrical impedance so the array operates at peak power output", "To disconnect panels at night", "To clean panel glass automatically"], answer: 1 },
            { q: "Why are Grid-Forming (GFM) inverters superior to Grid-Following inverters in high-renewable grids?", options: ["They establish independent voltage/frequency references and provide synthetic inertia", "They are cheaper to manufacture", "They consume zero solar energy", "They only work in DC current"], answer: 0 },
            { q: "What does an I-V curve characterize in photovoltaic engineering?", options: ["Internet velocity vs download time", "Current output as a function of voltage across varying irradiance and temperature", "Internal vibration of transformers", "Inverter warranty period"], answer: 1 },
            { q: "Which standard establishes interconnection rules for distributed energy resources in North America?", options: ["IEEE 1547", "ISO 9001", "HTML 5.2", "OSHA 1910"], answer: 0 }
          ]
        }
      ]
    },
    { id: "energy-m2", title: "Wind Turbine Aerodynamics, Nacelle & Pitch Control", titleES: "Aerodinámica de Turbinas Eólicas, Góndola y Control de Paso", icon: "fa-solid fa-wind", readings: [] },
    { id: "energy-m3", title: "Battery Energy Storage Systems (BESS) & Grid Firming", titleES: "Sistemas de Almacenamiento con Baterías (BESS)", icon: "fa-solid fa-car-battery", readings: [] },
    { id: "energy-m4", title: "Green Hydrogen: PEM Electrolysis & Industrial Applications", titleES: "Hidrógeno Verde: Electrólisis PEM y Usos Industriales", icon: "fa-solid fa-gas-pump", readings: [] },
    { id: "energy-m5", title: "Smart Grids, Microgrids & SCADA Energy Management", titleES: "Redes Eléctricas Inteligentes, Microredes y SCADA", icon: "fa-solid fa-plug-circle-bolt", readings: [] }
  ]
};

// 2.6 Engineering & Advanced Manufacturing
updatedCourses["advanced-manufacturing"] = {
  id: "advanced-manufacturing",
  title: "Ingeniería y Manufactura Avanzada",
  titleEN: "Engineering & Advanced Manufacturing",
  category: "engineering",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "ISO 9001 / AS9100 / ASTM Additive Manufacturing",
  conocer: "EC0845 (Supervisión de Procesos de Manufactura)",
  ngss: "Advanced Manufacturing & Materials Processing",
  industry: "Global Industry 4.0 & Precision Tooling Standard",
  icon: "fa-solid fa-industry",
  description: "Manufactura aditiva metálica (DMLS/SLM), gemelos digitales (Digital Twins), GD&T avanzado y celdas de mecanizado automatizado.",
  modules: [
    { id: "am-m1", title: "Geometric Dimensioning and Tolerancing (GD&T - ASME Y14.5)", titleES: "Dimensionamiento Geométrico y Tolerancias (GD&T)", icon: "fa-solid fa-ruler-combined", readings: [] },
    { id: "am-m2", title: "Metal Additive Manufacturing: DMLS, SLM and Binder Jetting", titleES: "Manufactura Aditiva Metálica: DMLS, SLM y Binder Jetting", icon: "fa-solid fa-cubes-stacked", readings: [] },
    { id: "am-m3", title: "Digital Twins & Industrial Simulation (Siemens, Dassault)", titleES: "Gemelos Digitales y Simulación Industrial", icon: "fa-solid fa-vr-cardboard", readings: [] },
    { id: "am-m4", title: "High-Speed 5-Axis CNC Milling & Toolpath Optimization", titleES: "Fresado CNC de 5 Ejes y Optimización de Trayectorias", icon: "fa-solid fa-screwdriver-wrench", readings: [] },
    { id: "am-m5", title: "Overall Equipment Effectiveness (OEE) & Kaizen Principles", titleES: "Efectividad Global del Equipo (OEE) y Principios Kaizen", icon: "fa-solid fa-chart-line", readings: [] }
  ]
};

// 2.7 Industrial Engineering & Operations (integrates previous logistics/supply chain)
updatedCourses["industrial-operations"] = {
  id: "industrial-operations",
  title: "Ingeniería Industrial y Operaciones",
  titleEN: "Industrial Engineering & Operations",
  category: "engineering",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "USMCA T-MEC / Six Sigma Black Belt / APICS CSCP",
  conocer: "EC0301 (Operaciones de Comercio Exterior y Logística)",
  ngss: "Industrial Engineering & Supply Chain Optimization",
  industry: "Nearshoring Logistics & Just-In-Time Operations Standard",
  icon: "fa-solid fa-dolly",
  description: "Logística transfronteriza T-MEC, Incoterms 2020, Lean Manufacturing Six Sigma, balanceo de líneas y gestión de inventarios Just-In-Time.",
  modules: existingCourses["no_stem_supply_chain"] ? existingCourses["no_stem_supply_chain"].modules : [
    { id: "io-m1", title: "USMCA/T-MEC Cross-Border Customs & Pedimentos", titleES: "Aduanas Transfronterizas T-MEC y Pedimentos en Inglés", icon: "fa-solid fa-file-contract", readings: [] },
    { id: "io-m2", title: "Lean Manufacturing: 5S, Kanban and Value Stream Mapping (VSM)", titleES: "Manufactura Esbelta: 5S, Kanban y Mapeo de Flujo de Valor", icon: "fa-solid fa-arrow-progress", readings: [] },
    { id: "io-m3", title: "Six Sigma DMAIC Methodology & Statistical Quality Control", titleES: "Metodología Six Sigma DMAIC y Control Estadístico", icon: "fa-solid fa-chart-simple", readings: [] },
    { id: "io-m4", title: "Incoterms 2020 Operational Execution (FOB, DDP, EXW)", titleES: "Ejecución de Incoterms 2020 en Logística Internacional", icon: "fa-solid fa-truck-ramp-box", readings: [] },
    { id: "io-m5", title: "Warehouse Management Systems (WMS) & Milk-Run Scheduling", titleES: "Sistemas WMS y Rutas Milk-Run Just-in-Time", icon: "fa-solid fa-warehouse", readings: [] }
  ]
};

// 2.8 Mechanical Engineering & Mechatronics
updatedCourses["mechatronics"] = {
  id: "mechatronics",
  title: "Ingeniería Mecánica y Mecatrónica",
  titleEN: "Mechanical Engineering & Mechatronics",
  category: "engineering",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "ASME BTH-1 / ISO 12100 Machine Safety",
  conocer: "EC1120 (Mantenimiento de Sistemas Mecatrónicos)",
  ngss: "Mechanical Engineering & Multi-Domain System Dynamics",
  industry: "Global Electro-Mechanical Machine Design Standard",
  icon: "fa-solid fa-cogs",
  description: "Diseño mecánico de precisión, servomotores, sistemas electrohidráulicos y neumáticos, y análisis de esfuerzos por elementos finitos (FEA).",
  modules: [
    { id: "mech-m1", title: "Finite Element Analysis (FEA): Stress, Strain and Thermal Load", titleES: "Análisis por Elementos Finitos (FEA): Esfuerzo y Deformación", icon: "fa-solid fa-vector-square", readings: [] },
    { id: "mech-m2", title: "Actuators & Servomotors: Closed-Loop PID Motion Control", titleES: "Actuadores y Servomotores: Control de Movimiento PID", icon: "fa-solid fa-rotate", readings: [] },
    { id: "mech-m3", title: "Electro-Pneumatic & Hydraulic Power Transmission Systems", titleES: "Sistemas de Transmisión Electro-Neumática e Hidráulica", icon: "fa-solid fa-faucet-drip", readings: [] },
    { id: "mech-m4", title: "Shaft Couplings, Bearing Selection and Harmonic Drives", titleES: "Acoplamientos de Ejes, Rodamientos y Reductores Armónicos", icon: "fa-solid fa-ring", readings: [] },
    { id: "mech-m5", title: "Thermal Management in Electronic Enclosures & Heat Pipes", titleES: "Gestión Térmica en Gabinetes Electrónicos y Tubos de Calor", icon: "fa-solid fa-temperature-arrow-up", readings: [] }
  ]
};

// 3. SCIENCE & FUTURE TECHNOLOGY
// 3.1 Biotechnology & Life Sciences
updatedCourses["biotechnology"] = {
  id: "biotechnology",
  title: "Biotecnología y Ciencias de la Vida",
  titleEN: "Biotechnology & Life Sciences",
  category: "science",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "cGMP / FDA 21 CFR Part 211 / ISO 14644 Biocleanrooms",
  conocer: "EC1240 (Operación de Procesos Biotecnológicos)",
  ngss: "Biotechnology & Applied Molecular Genetics",
  industry: "Global Biopharmaceutical & Fermentation Standard",
  icon: "fa-solid fa-dna",
  description: "Bioprocesamiento en biorreactores, edición genética CRISPR, fermentación industrial, formulación farmacéutica y cGMP en salas limpias.",
  modules: [
    { id: "bio-m1", title: "Bioreactor Operations: Aerobic & Anaerobic Fermentation Scaling", titleES: "Operaciones en Biorreactores y Escalamiento de Fermentación", icon: "fa-solid fa-flask", readings: [] },
    { id: "bio-m2", title: "CRISPR-Cas9 & Genetic Engineering Methodologies", titleES: "CRISPR-Cas9 y Metodologías de Ingeniería Genética", icon: "fa-solid fa-dna", readings: [] },
    { id: "bio-m3", title: "Downstream Processing: Chromatography & Ultrafiltration", titleES: "Procesamiento Downstream: Cromatografía y Ultrafiltración", icon: "fa-solid fa-filter", readings: [] },
    { id: "bio-m4", title: "Current Good Manufacturing Practices (cGMP) in Cleanrooms", titleES: "Buenas Prácticas de Manufactura (cGMP) en Cuartos Limpios", icon: "fa-solid fa-square-check", readings: [] },
    { id: "bio-m5", title: "Enzyme Kinetics & Industrial Biocatalysis Applications", titleES: "Cinética Enzimática y Biocatálisis Industrial", icon: "fa-solid fa-atom", readings: [] }
  ]
};

// 3.2 Space & Satellite Technology
updatedCourses["space-satellite"] = {
  id: "space-satellite",
  title: "Tecnología Espacial y Satelital",
  titleEN: "Space & Satellite Technology",
  category: "science",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "NASA-STD / ESA ECSS / CubeSat Design Specification",
  conocer: "EC1450 (Integración y Operación Satelital)",
  ngss: "Space Systems Engineering & Orbital Mechanics",
  industry: "NewSpace Commercial Satellites & Launch Services Standard",
  icon: "fa-solid fa-satellite",
  description: "Mecánica orbital, satélites CubeSat (LEO), propulsión de cohetes, telemetría espacial TT&C y mitigación de basura orbital.",
  modules: [
    { id: "space-m1", title: "Orbital Mechanics: Keplerian Elements, LEO, GEO and Sun-Sync", titleES: "Mecánica Orbital: Elementos Keplerianos, LEO y GEO", icon: "fa-solid fa-earth-americas", readings: [] },
    { id: "space-m2", title: "CubeSat Subsystems: EPS, OBC, ADCS and Payload Integration", titleES: "Subsistemas CubeSat: EPS, OBC, ADCS e Integración", icon: "fa-solid fa-cube", readings: [] },
    { id: "space-m3", title: "Rocket Propulsion: Chemical, Cryogenic and Hall-Effect Thrusters", titleES: "Propulsión de Cohetes: Química, Criogénica e Iónica", icon: "fa-solid fa-fire", readings: [] },
    { id: "space-m4", title: "Satellite Ground Stations: Telemetry, Tracking and Command (TT&C)", titleES: "Estaciones Terrenas: Telemetría, Seguimiento y Comando", icon: "fa-solid fa-tower-broadcast", readings: [] },
    { id: "space-m5", title: "Space Debris Mitigation & Radiation Hardening in Orbit", titleES: "Mitigación de Basura Espacial y Blindaje contra Radiación", icon: "fa-solid fa-shield", readings: [] }
  ]
};

// 3.3 Environmental & Sustainability
updatedCourses["environmental-sustainability"] = {
  id: "environmental-sustainability",
  title: "Sustentabilidad y Tecnología Ambiental",
  titleEN: "Environmental & Sustainability",
  category: "science",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "ISO 14001 Environmental Management / GHG Protocol / ESG",
  conocer: "EC0945 (Gestión Ambiental y Huella de Carbono)",
  ngss: "Environmental Science & Climate Tech Engineering",
  industry: "Global Corporate ESG & Carbon Accounting Standard",
  icon: "fa-solid fa-leaf",
  description: "Auditorías de huella de carbono (Scope 1, 2, 3), tratamiento avanzado de agua industrial, captura de carbono (CCUS) y economía circular.",
  modules: [
    { id: "env-m1", title: "Carbon Accounting: Scope 1, 2 and 3 Greenhouse Gas Protocol", titleES: "Contabilidad de Carbono: Alcances 1, 2 y 3 Protocolo GEI", icon: "fa-solid fa-smog", readings: [] },
    { id: "env-m2", title: "Industrial Wastewater Treatment: Reverse Osmosis and ZLD Systems", titleES: "Tratamiento de Aguas Residuales: Ósmosis Inversa y ZLD", icon: "fa-solid fa-droplet", readings: [] },
    { id: "env-m3", title: "Carbon Capture, Utilization and Storage (CCUS) Technologies", titleES: "Captura, Utilización y Almacenamiento de Carbono (CCUS)", icon: "fa-solid fa-cloud-arrow-down", readings: [] },
    { id: "env-m4", title: "Circular Economy: Cradle-to-Cradle Life Cycle Assessment (LCA)", titleES: "Economía Circular y Análisis de Ciclo de Vida (LCA)", icon: "fa-solid fa-arrows-spin", readings: [] },
    { id: "env-m5", title: "ISO 14001 Environmental Auditing & Zero-Waste Certification", titleES: "Auditorías ISO 14001 y Certificación Basura Cero", icon: "fa-solid fa-clipboard-check", readings: [] }
  ]
};

// 3.4 Healthcare Technology (integrates former medical devices)
updatedCourses["healthcare-tech"] = {
  id: "healthcare-tech",
  title: "Tecnología en Salud y Dispositivos Biomédicos",
  titleEN: "Healthcare Technology",
  category: "science",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "FDA 21 CFR Part 820 / ISO 13485 / IEC 60601 Medical Electrical",
  conocer: "EC1290 (Inspección en Manufactura de Dispositivos Médicos)",
  ngss: "Biomedical Engineering & Clinical Technology",
  industry: "FDA Medical Device & HealthTech Nearshoring Standard",
  icon: "fa-solid fa-heart-pulse",
  description: "Regulación FDA 21 CFR 820, salas limpias médicas, biocompatibilidad ISO 10993, expedientes de diseño (DHF/DMR) y telesalud.",
  modules: existingCourses["no_stem_medical_devices"] ? existingCourses["no_stem_medical_devices"].modules : [
    { id: "health-m1", title: "ISO 13485 & FDA Medical Device Quality Assurance", titleES: "Aseguramiento de Calidad Médica ISO 13485 y FDA", icon: "fa-solid fa-stethoscope", readings: [] },
    { id: "health-m2", title: "Biocompatibility Testing (ISO 10993) & Sterilization Validation", titleES: "Pruebas de Biocompatibilidad y Validación de Esterilización", icon: "fa-solid fa-shield-halved", readings: [] },
    { id: "health-m3", title: "Design Controls: DHF, DMR, DHR and Risk Management (ISO 14971)", titleES: "Controles de Diseño: DHF, DMR, DHR y Gestión de Riesgo", icon: "fa-solid fa-folder-tree", readings: [] },
    { id: "health-m4", title: "Medical Electrical Equipment Safety (IEC 60601)", titleES: "Seguridad de Equipos Eléctricos Médicos (IEC 60601)", icon: "fa-solid fa-bolt", readings: [] },
    { id: "health-m5", title: "Software as a Medical Device (SaMD) & Cybersecurity Protocols", titleES: "Software como Dispositivo Médico (SaMD) y Ciberseguridad", icon: "fa-solid fa-laptop-medical", readings: [] }
  ]
};

// 3.5 Materials Science & Nanotechnology
updatedCourses["materials-nanotech"] = {
  id: "materials-nanotech",
  title: "Ciencia de Materiales y Nanotecnología",
  titleEN: "Materials Science & Nanotechnology",
  category: "science",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "ASTM International Standards for Advanced Materials",
  conocer: "EC1180 (Análisis de Propiedades de Materiales Avanzados)",
  ngss: "Materials Science & Nanoscale Engineering",
  industry: "Global Advanced Materials & Nano-Coatings Standard",
  icon: "fa-solid fa-atom",
  description: "Estructura atómica, polímeros avanzados, grafeno, nanotubos de carbono, microscopía electrónica (SEM/TEM) y recubrimientos PVD/CVD.",
  modules: [
    { id: "mat-m1", title: "Crystal Lattice Structures, Miller Indices and Phase Diagrams", titleES: "Estructuras Cristalinas, Índices de Miller y Diagramas de Fase", icon: "fa-solid fa-cubes", readings: [] },
    { id: "mat-m2", title: "Carbon Nanomaterials: Graphene, Carbon Nanotubes and Fullerenes", titleES: "Nanomateriales de Carbono: Grafeno y Nanotubos", icon: "fa-solid fa-circle-nodes", readings: [] },
    { id: "mat-m3", title: "Electron Microscopy: SEM, TEM, AFM and Diffraction Spectroscopy", titleES: "Microscopía Electrónica: SEM, TEM, AFM y Espectroscopía", icon: "fa-solid fa-microscope", readings: [] },
    { id: "mat-m4", title: "Thin Film Deposition: PVD Sputtering, CVD and Atomic Layer Deposition", titleES: "Deposición de Películas Delgadas: PVD, CVD y ALD", icon: "fa-solid fa-layer-group", readings: [] },
    { id: "mat-m5", title: "Smart Polymers, Shape Memory Alloys (SMA) and Superconductors", titleES: "Polímeros Inteligentes, Aleaciones SMA y Superconductores", icon: "fa-solid fa-wand-magic-sparkles", readings: [] }
  ]
};

// 3.6 Food Science & Technology (integrates former gastronomy/culinary science)
updatedCourses["food-science"] = {
  id: "food-science",
  title: "Ciencia de los Alimentos y Tecnología Agroindustrial",
  titleEN: "Food Science & Technology",
  category: "science",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "FDA FSMA / HACCP / ISO 22000 Food Safety Management",
  conocer: "EC0081 (Procesamiento y Conservación de Alimentos)",
  ngss: "Food Science, Nutrition & Agricultural Bioengineering",
  industry: "Global Agri-Food Safety & Precision Processing Standard",
  icon: "fa-solid fa-wheat-awn",
  description: "Química de alimentos, procesamiento térmico (pasteurización, UHT), empaque en atmósfera modificada (MAP) y certificaciones HACCP.",
  modules: existingCourses["no_stem_gastronomy"] ? existingCourses["no_stem_gastronomy"].modules : [
    { id: "food-m1", title: "Food Microbiology & HACCP Critical Control Points", titleES: "Microbiología de Alimentos y Puntos Críticos HACCP", icon: "fa-solid fa-shield-virus", readings: [] },
    { id: "food-m2", title: "Thermal Preservation: Pasteurization, Retort Canning and Aseptic Filling", titleES: "Preservación Térmica: Pasteurización y Envasado Aséptico", icon: "fa-solid fa-temperature-high", readings: [] },
    { id: "food-m3", title: "Modified Atmosphere Packaging (MAP) & Barrier Polymers", titleES: "Empaque en Atmósfera Modificada (MAP) y Barreras", icon: "fa-solid fa-box", readings: [] },
    { id: "food-m4", title: "Water Activity (Aw), pH Kinetics and Shelf-Life Modeling", titleES: "Actividad de Agua (Aw), Cinética de pH y Vida de Anaquel", icon: "fa-solid fa-droplet", readings: [] },
    { id: "food-m5", title: "Functional Food Ingredients, Fermentation & Precision Agritech", titleES: "Alimentos Funcionales, Fermentación y Agrotecnología", icon: "fa-solid fa-seedling", readings: [] }
  ]
};

// 4. AVIATION, CAREER & PROFESSIONAL ENGLISH
// 4.1 Aviation English (NEW - Priority)
updatedCourses["aviation-english"] = {
  id: "aviation-english",
  title: "Inglés Aeronáutico y Radiotelefonía OACI",
  titleEN: "Aviation English",
  category: "career",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "ICAO Annex 1 Language Proficiency / FAA AC 60-28",
  conocer: "EC1295 (Comunicaciones Aeronáuticas y Radiotelefonía)",
  ngss: "Aviation Communications & Aeronautical Science",
  industry: "ICAO Operational Level 4-6 Standard",
  icon: "fa-solid fa-plane-departure",
  description: "Fraseología aeronáutica estándar OACI, radiotelefonía con control de tráfico aéreo (ATC), colaciones obligatorias (readbacks) y meteorología METAR.",
  modules: [
    {
      id: "aveng-m1",
      title: "ICAO Standard Radiotelephony & Emergency Readbacks",
      titleES: "Radiotelefonía Estándar OACI y Colaciones de Emergencia",
      icon: "fa-solid fa-headset",
      readings: [
        {
          id: "aveng-m1-r1",
          title: "ICAO Standard Phraseology: Clear Readback, Runway Safety, and Critical Radiotelephony",
          duration: "10 min",
          content: `
> **International Aviation Standard Note**: This curriculum is structured in accordance with **ICAO Annex 1** (Personnel Licensing — Language Proficiency Requirements), **ICAO Doc 9835** (Manual on the Implementation of ICAO Language Proficiency Requirements), and **ICAO Doc 4444** (Air Traffic Management).

# ICAO Standard Phraseology: Clear Readback, Runway Safety, and Critical Radiotelephony

In international civil aviation, language ambiguity is a direct flight safety hazard. Historically, misheard clearances, non-standard slang, and hearback errors have contributed to catastrophic aviation disasters (such as the 1977 Tenerife airport collision). In response, the **International Civil Aviation Organization (ICAO)** mandates that all pilots and air traffic controllers (ATCs) operating across international airspace demonstrate minimum **ICAO Operational Level 4** proficiency in English.

## 1. The Core Purpose of Standard Phraseology

Aviation English is not general conversational English; it is a highly structured, unambiguous, closed-loop communications protocol. **Standard Phraseology** is engineered to:
- Maximize voice transmission clarity over noisy, low-bandwidth High-Frequency (HF) and Very High-Frequency (VHF) amplitude-modulated (AM) radio channels.
- Eliminate regional idioms, cultural idioms, and conversational fillers ("um", "like", "you know").
- Ensure immediate comprehension across multinational flight crews and controllers whose native languages differ.

## 2. Phonetic Alphabet and Numerical Pronunciation

To prevent phonetic confusion between similar-sounding letters and digits, ICAO specifies strict pronunciation rules:
- **Letters**: *Alfa, Bravo, Charlie, Delta, Echo, Foxtrot... Zulu*.
- **Numbers**:
  - \`3\` is pronounced **"TREE"** (avoiding confusion with "three" / "free").
  - \`4\` is pronounced **"FOW-er"**.
  - \`5\` is pronounced **"FIFE"** (preventing confusion with "fire" or "nine").
  - \`9\` is pronounced **"NIN-er"** (preventing acoustic confusion with German "nein").
  - Decimals are explicitly spoken as **"DAY-SEE-MAL"** (e.g., VHF frequency 118.7 is spoken *"ONE ONE EIGHT DECIMAL SEVEN"*).

## 3. Strict Readback Mandates: Closed-Loop Communication

In aviation radio communications, saying *"Roger"* or *"Copy"* does **NOT** confirm that a safety-critical instruction was understood. A controller cannot verify what a pilot actually heard unless the pilot reads back the exact operational parameters.

Under ICAO Doc 4444, flight crews **MUST** read back all parts of the following clearances verbatim:
1. **Runway in Use, Hold Short Instructions, and Clearances to Enter, Land, Take Off, or Backtrack on any Runway**.
2. **Altimeter Settings (QNH / QFE)**: Failure to correctly set atmospheric altimeter pressure leads directly to Controlled Flight Into Terrain (CFIT).
3. **Assigned Heading, Speed, and Altitude / Flight Level (FL)**.
4. **Secondary Surveillance Radar (SSR) Transponder Codes ("Squawk" codes)**.
5. **Frequency Handoffs to Next Sector**.

### Operational Dialogue Example:
> **Controller**: *"AeroMexico 402, climb and maintain Flight Level 280, turn right heading 090, squawk 4321."*  
> **Pilot**: *"Climb and maintain Flight Level 280, turn right heading 090, squawk 4321, AeroMexico 402."*

If the pilot had simply replied *"Roger, AeroMexico 402"*, the controller would immediately intervene: *"AeroMexico 402, read back altitude and squawk."*

## 4. Runway Incursions and "Hold Short" Discipline

Runway incursions remain the #1 ground safety risk at international aerodromes. When instructed to *"Taxi to Runway 23L, hold short of Runway 23R"*, the phrase **"HOLD SHORT"** is legally binding. The aircraft must come to a complete stop prior to crossing the solid yellow double line. If a pilot fails to say "Hold short" in the readback, the controller is required by federal aviation regulations to reissue the restriction and obtain an explicit verbal readback.

---

> **Key Takeaway**: Aeronautical radiotelephony is a zero-tolerance protocol founded on **ICAO standard phraseology**, **phonetic clarity (Fife, Niner)**, and **mandatory closed-loop readbacks**. Fluency in standard aviation English guarantees clear coordination between flight decks and international ATC towers.
`,
          vocabulary: [
            { en: "Readback", es: "Colación / Lectura de Confirmación", definition: "Repetition by the flight crew of ATC clearances to verify accurate comprehension" },
            { en: "Hold Short", es: "Mantener Fuera / Mantener Antes de", definition: "Mandatory instruction requiring an aircraft to stop before a designated runway or taxiway" },
            { en: "Altimeter Setting (QNH)", es: "Ajuste Altimétrico (QNH)", definition: "Barometric pressure setting calibrated to mean sea level, ensuring correct altitude readout" },
            { en: "Squawk Code", es: "Código Transponder (Squawk)", definition: "Four-digit discrete octal code assigned by ATC for radar identification" },
            { en: "Hearback Error", es: "Error de Escucha (Hearback)", definition: "Failure of a controller to notice a pilot's incorrect readback of a clearance" },
            { en: "Standard Phraseology", es: "Fraseología Estándar", definition: "Uniform set of words and concise terms authorized by ICAO for aviation radiotelephony" }
          ],
          questions: [
            { q: "Why is saying only 'Roger' or 'Copy' unacceptable for safety-critical ATC clearances?", options: ["It is too polite", "It fails closed-loop communication; ATC cannot confirm the pilot heard the correct altitude or runway", "It wastes radio battery", "It disconnects the autopilot"], answer: 1 },
            { q: "How is the number '9' explicitly pronounced in ICAO standard radiotelephony?", options: ["Nine", "Niner", "Nueve", "Nein"], answer: 1 },
            { q: "What does the ATC command 'Hold Short of Runway 05' legally require the pilot to do?", options: ["Accelerate and cross quickly", "Stop completely before the runway holding line and read back the instruction", "Turn around and return to the gate", "Shut down the engines"], answer: 1 },
            { q: "What is the minimum ICAO Language Proficiency Level required for international commercial pilots?", options: ["Level 1 Elementary", "Level 2 Pre-operational", "Level 4 Operational", "Level 10 Master"], answer: 2 }
          ]
        }
      ]
    },
    { id: "aveng-m2", title: "Air Traffic Control (ATC) Clearances & Radar Vectoring", titleES: "Autorizaciones ATC y Vectores Radar", icon: "fa-solid fa-tower-observation", readings: [] },
    { id: "aveng-m3", title: "Aviation Meteorology: Decoding METAR, TAF & SIGMET", titleES: "Meteorología Aeronáutica: Reportes METAR y TAF", icon: "fa-solid fa-cloud-bolt", readings: [] },
    { id: "aveng-m4", title: "Crew Resource Management (CRM) & Cockpit Communication", titleES: "Gestión de Recursos de Cabina (CRM) y Comunicación", icon: "fa-solid fa-users", readings: [] },
    { id: "aveng-m5", title: "Emergency Communications: Pan-Pan, Mayday & Escalation", titleES: "Comunicaciones de Emergencia: Pan-Pan, Mayday y Contingencias", icon: "fa-solid fa-triangle-exclamation", readings: [] }
  ]
};

// 4.2 Air Force Aerospace English (NEW - Priority)
updatedCourses["airforce-aerospace"] = {
  id: "airforce-aerospace",
  title: "Inglés Aeroespacial Militar y de Defensa",
  titleEN: "Air Force Aerospace English",
  category: "career",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "NATO STANAG 6001 Language Proficiency / MIL-STD-1553",
  conocer: "EC1460 (Operaciones y Mantenimiento de Sistemas de Defensa)",
  ngss: "Defense Aerospace Engineering & Supersonic Aerodynamics",
  industry: "Global Defense Aerospace & Military Aviation Standard",
  icon: "fa-solid fa-jet-fighter",
  description: "Aerodinámica supersónica, aviónica de combate (radar AESA, HUD), redes tácticas de enlace de datos (Link 16), normas OTAN STANAG y códigos breves.",
  modules: [
    {
      id: "af-m1",
      title: "Tactical Flight Operations & Supersonic Aerodynamics",
      titleES: "Operaciones de Vuelo Táctico y Aerodinámica Supersónica",
      icon: "fa-solid fa-gauge-high",
      readings: [
        {
          id: "af-m1-r1",
          title: "Supersonic Flight Envelopes: Transonic Drag, Shock Waves, and Tactical Maneuvering",
          duration: "10 min",
          content: `
> **Defense Aerospace Curriculum Note**: This module aligns with **NATO STANAG 6001** (Language Proficiency Levels for Defense Personnel) and **MIL-STD-1797** (Flying Qualities of Piloted Aircraft), preparing technical officers and defense contractors for cross-national aerospace integration.

# Supersonic Flight Envelopes: Transonic Drag, Shock Waves, and Tactical Maneuvering

In military aerospace engineering and air combat operations, tactical aircraft operate across extreme velocity regimes. Understanding supersonic flight dynamics, structural load limits, and tactical communications requires deep technical fluency in aeronautical defense English.

## 1. Aerodynamic Velocity Regimes and Mach Numbers

Aircraft airspeed is evaluated relative to the local speed of sound ($a$) via the dimensionless **Mach Number** ($M = v / a$):
- **Subsonic Flow ($M < 0.8$)**: Airflow across the entire airframe remains below the speed of sound. Air is treated as an incompressible fluid.
- **Transonic Flow ($0.8 \\le M < 1.2$)**: The most volatile aerodynamic regime. While the free-stream airspeed may be Mach 0.85, air accelerating over the curved upper surface of the wing reaches local supersonic speeds ($M > 1.0$). This creates local **shock waves** and induces massive **wave drag** and turbulent boundary layer separation ("Mach Tuck").
- **Supersonic Flow ($1.2 \\le M < 5.0$)**: The entire aircraft moves faster than the speed of sound. Oblique shock waves form at the nose cone and leading wing edges.
- **Hypersonic Flow ($M \\ge 5.0$)**: Aerodynamic friction causes extreme molecular dissociation and high-temperature plasma ionization.

To minimize transonic wave drag, supersonic military aircraft incorporate thin, highly swept delta wings, sharp leading edges, and the aerodynamic **Whitcomb Area Rule** (pinched "coke-bottle" fuselage geometry that smoothly transitions cross-sectional area).

## 2. The Flight Envelope (V-n Diagram) and G-Limits

A fighter jet's operational capabilities are strictly defined by its **Flight Envelope**, plotted on a Velocity-Load Factor (**V-n**) diagram:
- **Load Factor ($n$)**: The ratio of aerodynamic lift ($L$) to aircraft weight ($W$), measured in gravitational units ($g$):
  $$n = \\frac{L}{W}$$
- **Corner Velocity ($V_c$)**: The minimum airspeed at which the pilot can pull the maximum design structural load factor (typically **$+9.0g$** in modern fighters like the F-16 or F-35) without aerodynamic stalling. It yields the sharpest possible instantaneous turn radius.
- **Structural Limits**: Exceeding the maximum positive or negative $g$-limits causes structural airframe plastic deformation, wing spar shear failure, or catastrophic loss of pilot consciousness (**G-LOC** — G-induced Loss of Consciousness).

## 3. NATO Tactical Brevity Words

During air combat maneuvering and joint military exercises, multinational flight leads communicate over secure tactical radios using standardized **NATO Brevity Codes**:
- **"Bogeys"**: An unidentified radar or visual contact.
- **"Bandit"**: A contact positively identified as an enemy aircraft (does not automatically imply authority to engage).
- **"Fox Three"**: Simulated or live launch of an active radar-guided missile (such as the AIM-120 AMRAAM).
- **"Tally"**: Sighting of a target, bandit, or bogey visually.
- **"Bingo Fuel"**: Fuel state requiring immediate departure from the operational combat area to return safely to base.

---

> **Key Takeaway**: Military aerospace engineering synthesizes **supersonic fluid mechanics (shock wave formation, Area Rule)** with physiological **flight envelope boundaries ($+9g$ load limits, V-n diagrams)** and **NATO tactical brevity codes**. Mastery of these specialized English terms enables defense engineers, flight technicians, and liaison officers to operate in multinational defense programs.
`,
          vocabulary: [
            { en: "Mach Number", es: "Número Mach", definition: "Ratio of aircraft true airspeed to the local speed of sound in the surrounding medium" },
            { en: "Wave Drag", es: "Resistencia de Onda", definition: "Dramatic increase in aerodynamic drag caused by shock wave formation at transonic speeds" },
            { en: "Flight Envelope (V-n)", es: "Envolvente de Vuelo (Diagrama V-n)", definition: "Boundary diagram delineating safe structural airspeed and g-load limitations" },
            { en: "Corner Velocity", es: "Velocidad de Esquina (Corner Speed)", definition: "Airspeed at which maximum instantaneous turn rate and structural g-limit coincide" },
            { en: "Tactical Brevity Code", es: "Código Breve Táctico (NATO)", definition: "Standardized military words providing concise, unambiguous tactical commands over radio" },
            { en: "G-LOC", es: "G-LOC (Pérdida de Conciencia Inducida por Fuerza G)", definition: "Loss of pilot consciousness caused by blood draining from the brain under high g-forces" }
          ],
          questions: [
            { q: "What aerodynamic phenomenon causes extreme drag rise in the Transonic regime (Mach 0.8 - 1.2)?", options: ["Engine flameout", "Shock wave formation and boundary layer separation over the wing", "Fuel tank freezing", "Rudder disconnect"], answer: 1 },
            { q: "What does the NATO brevity term 'Bingo Fuel' communicate to mission commanders?", options: ["The aircraft has refueled to 100%", "The aircraft has reached critical minimum fuel and must return to base immediately", "The fuel pump has failed", "Drop all external fuel tanks"], answer: 1 },
            { q: "What is Corner Velocity on a fighter aircraft's V-n Flight Envelope?", options: ["The speed required to taxi around runway corners", "The airspeed that allows pulling maximum structural g-load for the sharpest turn radius", "The landing stall speed", "The speed of sound at sea level"], answer: 1 },
            { q: "Which NATO brevity phrase announces the launch of an active radar-guided missile (like AIM-120)?", options: ["Guns Guns Guns", "Fox Three", "Raygun", "Winchester"], answer: 1 }
          ]
        }
      ]
    },
    { id: "af-m2", title: "Military Avionics: HUD, AESA Radar & EW Suites", titleES: "Aviónica Militar: HUD, Radar AESA y Guerra Electrónica", icon: "fa-solid fa-crosshairs", readings: [] },
    { id: "af-m3", title: "Tactical Data Networks: Link 16 & C4ISR Architecture", titleES: "Redes Tácticas de Datos: Link 16 y C4ISR", icon: "fa-solid fa-satellite-dish", readings: [] },
    { id: "af-m4", title: "NATO STANAG Compliance & Multinational Interoperability", titleES: "Cumplimiento OTAN STANAG e Interoperabilidad", icon: "fa-solid fa-file-shield", readings: [] },
    { id: "af-m5", title: "Defense Aerospace MRO, Airframe Depot Maintenance & AS9110", titleES: "Mantenimiento MRO Militar y Norma AS9110", icon: "fa-solid fa-wrench", readings: [] }
  ]
};

// 4.3 Hospitality & Food Service English (integrates former hospitality)
updatedCourses["hospitality-food"] = {
  id: "hospitality-food",
  title: "Inglés para Hotelería, Gastronomía y Servicios",
  titleEN: "Hospitality & Food Service English",
  category: "career",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "Forbes Travel Guide 5-Star / AHLA Standards",
  conocer: "EC0309 (Servicios Hoteleros y Atención al Huésped)",
  ngss: "Hospitality Operations & Customer Experience Leadership",
  industry: "Luxury International Resort & Forbes 5-Star Standard",
  icon: "fa-solid fa-hotel",
  description: "Inglés de hospitalidad Forbes 5-Star, gestión de reservaciones en sistemas PMS, atención al huésped VIP y servicio gastronómico internacional.",
  modules: existingCourses["no_stem_hospitality"] ? existingCourses["no_stem_hospitality"].modules : [
    { id: "hosp-m1", title: "Forbes 5-Star Standards & VIP Guest Experience", titleES: "Estándares Forbes 5 Estrellas y Experiencia VIP", icon: "fa-solid fa-star", readings: [] },
    { id: "hosp-m2", title: "Property Management Systems (PMS): Check-In, Folios and ADR", titleES: "Sistemas PMS: Registro, Folios y Métrica ADR", icon: "fa-solid fa-desktop", readings: [] },
    { id: "hosp-m3", title: "Fine Dining Service, Wine Pairing and Table Etiquette", titleES: "Servicio de Alta Cocina, Maridaje y Etiqueta", icon: "fa-solid fa-wine-glass", readings: [] },
    { id: "hosp-m4", title: "Service Recovery & Conflict Resolution Protocols (LAST Model)", titleES: "Recuperación del Servicio y Resolución de Conflictos", icon: "fa-solid fa-handshake-angle", readings: [] },
    { id: "hosp-m5", title: "Events, Banquets & Luxury Conference Management", titleES: "Gestión de Eventos, Banquetes y Conferencias", icon: "fa-solid fa-champagne-glasses", readings: [] }
  ]
};

// 4.4 Business, Leadership & Management English (integrates former HR)
updatedCourses["business-leadership"] = {
  id: "business-leadership",
  title: "Inglés para Negocios, Liderazgo y Gestión",
  titleEN: "Business, Leadership & Management English",
  category: "career",
  level: "A2-B1",
  status: "full",
  totalModules: 5,
  standard: "ISO 30414 Human Resource Management / USMCA Labor Standards",
  conocer: "EC0305 (Gestión de Recursos Humanos y Liderazgo)",
  ngss: "Executive Leadership & Organizational Operations",
  industry: "Global C-Suite & Nearshoring Management Standard",
  icon: "fa-solid fa-briefcase",
  description: "Inglés corporativo para presentaciones a directivos (Board decks), entrevistas técnicas STAR, auditorías laborales T-MEC y liderazgo transcultural.",
  modules: existingCourses["no_stem_hr_compliance"] ? existingCourses["no_stem_hr_compliance"].modules : [
    { id: "biz-m1", title: "Executive Decision Making & C-Suite Board Presentations", titleES: "Toma de Decisiones Ejecutivas y Presentaciones de Directorio", icon: "fa-solid fa-person-chalkboard", readings: [] },
    { id: "biz-m2", title: "Cross-Cultural Team Leadership in US-Mexico Nearshoring", titleES: "Liderazgo de Equipos Transculturales en Nearshoring", icon: "fa-solid fa-users-rays", readings: [] },
    { id: "biz-m3", title: "Technical Talent Acquisition & STAR Behavioral Interviewing", titleES: "Atracción de Talento Técnico y Entrevistas STAR", icon: "fa-solid fa-user-check", readings: [] },
    { id: "biz-m4", title: "USMCA Annex 31-A Rapid Response Labor Audits Compliance", titleES: "Cumplimiento de Auditorías Laborales T-MEC Anexo 31-A", icon: "fa-solid fa-scale-balanced", readings: [] },
    { id: "biz-m5", title: "Executive Compensation, KPI Benchmarking & Plant Retention", titleES: "Compensación Ejecutiva y Retención de Talento", icon: "fa-solid fa-award", readings: [] }
  ]
};

// 4.5 Project Management & Professional Communication
updatedCourses["project-management"] = {
  id: "project-management",
  title: "Gestión de Proyectos y Comunicación Profesional",
  titleEN: "Project Management & Professional Communication",
  category: "career",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "PMI PMBOK Guide 7th Edition / Agile Scrum Alliance",
  conocer: "EC0435 (Gestión de Proyectos de Base Tecnológica)",
  ngss: "Project Engineering & Stakeholder Communications",
  industry: "Global PMI PMP & Agile Enterprise Standard",
  icon: "fa-solid fa-list-check",
  description: "Metodologías Agile y Scrum, diagramas Gantt, gestión de riesgos (FMEA), entregables contractuales y comunicación técnica con clientes de EE.UU.",
  modules: [
    { id: "pm-m1", title: "Agile & Scrum Frameworks: Sprints, Epics and User Stories", titleES: "Metodologías Agile y Scrum: Sprints e Historias de Usuario", icon: "fa-solid fa-person-running", readings: [] },
    { id: "pm-m2", title: "Critical Path Method (CPM), Gantt Charts and Resource Leveling", titleES: "Método de Ruta Crítica (CPM) y Nivelación de Recursos", icon: "fa-solid fa-timeline", readings: [] },
    { id: "pm-m3", title: "Project Risk Management: FMEA Matrix and Mitigation Plans", titleES: "Gestión de Riesgos del Proyecto y Matriz FMEA", icon: "fa-solid fa-shield-halved", readings: [] },
    { id: "pm-m4", title: "Stakeholder Communication & Conflict Resolution in Tech Projects", titleES: "Comunicación con Stakeholders y Resolución de Conflictos", icon: "fa-solid fa-comments", readings: [] },
    { id: "pm-m5", title: "Statement of Work (SOW), SLA Governance and Milestone Sign-Off", titleES: "Declaración de Trabajo (SOW), SLAs y Cierre de Hitos", icon: "fa-solid fa-file-signature", readings: [] }
  ]
};

// 4.6 Entrepreneurship & Innovation English
updatedCourses["entrepreneurship"] = {
  id: "entrepreneurship",
  title: "Emprendimiento e Innovación Tecnológica",
  titleEN: "Entrepreneurship & Innovation English",
  category: "career",
  level: "A2-B1",
  status: "catalog_blueprint",
  totalModules: 5,
  standard: "Venture Capital Due Diligence / Lean Startup Methodology",
  conocer: "EC0777 (Desarrollo y Lanzamiento de Startups)",
  ngss: "Technological Entrepreneurship & Venture Finance",
  industry: "Global Silicon Valley & LATAM Tech Startup Standard",
  icon: "fa-solid fa-rocket",
  description: "Inglés para pitch de inversión, rondas de capital de riesgo (VC), hojas de términos (Term Sheets), modelo Lean Canvas y validación de mercado.",
  modules: [
    { id: "ent-m1", title: "The Pitch Deck: Hook, Problem-Solution Fit and Market Sizing (TAM/SAM/SOM)", titleES: "El Pitch Deck: Ajuste Problema-Solución y Tamaño de Mercado", icon: "fa-solid fa-chart-pie", readings: [] },
    { id: "ent-m2", title: "Venture Capital Financing: SAFE Agreements, Seed Rounds and Cap Tables", titleES: "Financiamiento VC: Acuerdos SAFE y Tablas de Capitalización", icon: "fa-solid fa-coins", readings: [] },
    { id: "ent-m3", title: "Term Sheets: Pre-Money Valuation, Liquidation Preference and Vesting", titleES: "Hojas de Términos: Valuación Pre-Money y Preferencias", icon: "fa-solid fa-handshake", readings: [] },
    { id: "ent-m4", title: "Lean Startup: Minimum Viable Product (MVP) and Pivot Strategies", titleES: "Lean Startup: Producto Mínimo Viable (MVP) y Estrategias Pivot", icon: "fa-solid fa-rotate-left", readings: [] },
    { id: "ent-m5", title: "Intellectual Property: Patents, Trade Secrets and International Licensing", titleES: "Propiedad Intelectual: Patentes, Secretos y Licenciamiento", icon: "fa-solid fa-certificate", readings: [] }
  ]
};

console.log('Total courses built:', Object.keys(updatedCourses).length);

// Generate final file
const header = `/**
 * stemOS LXP Course Content Database
 * ====================================
 * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks
 * 
 * Organizado en 4 Categorías Maestras y 26 Tracks Modulares:
 *  - 🔵 TECHNOLOGY (6 Tracks)
 *  - 🟢 ENGINEERING & INDUSTRY (8 Tracks)
 *  - 🟣 SCIENCE & FUTURE TECHNOLOGY (6 Tracks)
 *  - 🟠 AVIATION, CAREER & PROFESSIONAL ENGLISH (6 Tracks)
 * 
 * Target Level: A2+ / B1 CEFR Multi-Nivel
 * Formato: Lecturas de 10 minutos (~500-800 palabras), glosario técnico EN-ES y preguntas socráticas.
 */

var LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};

var LXP_COURSES = ${JSON.stringify(updatedCourses, null, 4)};

// Make available for window and import
if (typeof window !== 'undefined') {
    window.LXP_CATEGORIES = LXP_CATEGORIES;
    window.LXP_COURSES = LXP_COURSES;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LXP_CATEGORIES: LXP_CATEGORIES,
        LXP_COURSES: LXP_COURSES
    };
}
`;

fs.writeFileSync(coursesPath, header, 'utf8');
console.log('Successfully wrote catalog to:', coursesPath);
