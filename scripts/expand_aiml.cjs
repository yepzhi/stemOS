// scripts/expand_aiml.cjs — Expand AI & Machine Learning modules (aiml-m2 through aiml-m5)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded', Object.keys(LXP_COURSES).length, 'courses. Expanding AI/ML...');

// ─────────────────────────────────────────────
// MODULE 2: Transformers & LLM Architecture
// ─────────────────────────────────────────────
const aimlM2 = {
  id: "aiml-m2",
  title: "Transformers & Large Language Model Architecture",
  titleES: "Arquitectura Transformer y Modelos de Lenguaje Masivo (LLM)",
  icon: "fa-solid fa-layer-group",
  readings: [{
    id: "aiml-m2-r1",
    title: "Transformer Architecture, Self-Attention & LLM Training Pipelines",
    duration: "14 min",
    content: `
> **Industry Certification Note**: Aligned with **Google Cloud Professional Machine Learning Engineer** and **NVIDIA Certified Associate: Generative AI and LLMs** frameworks.

# Transformer Architecture, Self-Attention & LLM Training Pipelines

The **Transformer** architecture, introduced in the 2017 paper *"Attention Is All You Need"*, fundamentally replaced recurrent neural networks (RNNs) and long short-term memory (LSTM) networks as the dominant paradigm for sequence-to-sequence tasks. Today, every Large Language Model (LLM)—from GPT to Gemini to LLaMA—is built on Transformer variants.

## 1. The Self-Attention Mechanism

The core innovation of the Transformer is the **Self-Attention** (also called **Scaled Dot-Product Attention**) mechanism. Unlike recurrent architectures that process tokens sequentially (left-to-right), self-attention allows every token in a sequence to attend to every other token simultaneously in a single parallel computation.

For a given input sequence of token embeddings, the mechanism computes three matrices:
- **Query (Q)**: What information is this token looking for?
- **Key (K)**: What information does this token contain?
- **Value (V)**: What information should this token transmit if selected?

The attention score is computed as:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

Where $d_k$ is the dimensionality of the key vectors. The $\\sqrt{d_k}$ scaling prevents the dot products from becoming excessively large, which would push the softmax function into regions with vanishingly small gradients.

**Multi-Head Attention (MHA)** extends this by running multiple self-attention operations in parallel across different learned subspaces, allowing the model to jointly attend to information from different representation subspaces at different positions.

## 2. Encoder-Decoder vs. Decoder-Only Architectures

The original Transformer used an **Encoder-Decoder** structure:
- **Encoder**: Processes the entire input sequence bidirectionally. Used in models like BERT (Bidirectional Encoder Representations from Transformers) for classification and named entity recognition (NER).
- **Decoder**: Generates output tokens autoregressively (one token at a time), using **causal masking** to prevent attending to future positions.

Modern generative LLMs (GPT-4, Gemini, Claude, LLaMA) are predominantly **Decoder-Only** architectures. They process the concatenated prompt and generated text as a single sequence, predicting the next token at each step. This simplification enables massively scalable training on internet-scale corpora.

## 3. Tokenization: BPE, SentencePiece & Vocabulary Construction

Before text enters the Transformer, it must be converted into numerical tokens. **Byte-Pair Encoding (BPE)** is the dominant tokenization algorithm:
1. Start with individual characters as the initial vocabulary.
2. Iteratively merge the most frequent adjacent pair of tokens into a new single token.
3. Repeat until the vocabulary reaches a target size (e.g., 32,000 or 100,000 tokens).

**SentencePiece** extends BPE to handle raw byte sequences without language-specific preprocessing, enabling truly multilingual tokenization (critical for Spanish-English industrial contexts).

The tokenizer vocabulary size directly impacts model capacity: larger vocabularies reduce average sequence length but increase the embedding matrix size and memory consumption.

## 4. Pre-Training, Fine-Tuning & Alignment

LLM development follows a three-stage pipeline:

1. **Pre-Training**: The model learns to predict the next token on massive unsupervised text corpora (trillions of tokens from the internet, books, and code). This stage requires thousands of GPU-hours and costs millions of dollars.
2. **Supervised Fine-Tuning (SFT)**: The pre-trained base model is further trained on curated instruction-response pairs (e.g., "Summarize this paragraph" → high-quality summary) to improve instruction-following behavior.
3. **Alignment (RLHF/DPO)**: **Reinforcement Learning from Human Feedback (RLHF)** trains a reward model based on human preference rankings, then uses Proximal Policy Optimization (PPO) to align the model's outputs with human values. **Direct Preference Optimization (DPO)** simplifies this by directly optimizing on preference pairs without a separate reward model.

## 5. Context Windows & Positional Encoding

Transformers have a fixed **context window** (e.g., 8K, 128K, or 1M tokens). This defines the maximum number of tokens the model can process in a single forward pass. Extending context windows requires advanced positional encoding techniques:
- **Rotary Position Embeddings (RoPE)**: Encodes absolute position using rotation matrices in the complex plane, naturally decaying attention scores for distant tokens.
- **ALiBi (Attention with Linear Biases)**: Adds a linear bias to attention scores proportional to token distance, enabling length extrapolation beyond training context.

---
> **Key Takeaway**: The Transformer architecture powers all modern LLMs through **parallel self-attention** (replacing sequential RNNs), **BPE tokenization** for multilingual text, and a **three-stage pipeline** (Pre-Training → SFT → RLHF/DPO) that transforms raw next-token predictors into aligned, instruction-following AI systems.
`,
    vocabulary: [
      { en: "Self-Attention (Scaled Dot-Product)", es: "Autoatención (Producto Punto Escalado)", definition: "Mechanism allowing each token to compute relevance scores against all other tokens in a sequence simultaneously.", ipa: "/sɛlf əˈtɛn.ʃən/", collocations: ["multi-head self-attention", "causal attention mask", "attention score matrix"] },
      { en: "Transformer", es: "Transformador (Transformer)", definition: "Neural network architecture based entirely on attention mechanisms, replacing recurrence and convolutions.", ipa: "/trænsˈfɔːr.mər/", collocations: ["Transformer block", "decoder-only Transformer", "Transformer layer"] },
      { en: "Byte-Pair Encoding (BPE)", es: "Codificación por Pares de Bytes (BPE)", definition: "Subword tokenization algorithm that iteratively merges the most frequent adjacent character pairs.", ipa: "/baɪt pɛr ɪnˈkoʊ.dɪŋ/", collocations: ["BPE vocabulary", "tokenizer training", "subword segmentation"] },
      { en: "Reinforcement Learning from Human Feedback (RLHF)", es: "Aprendizaje por Refuerzo con Retroalimentación Humana", definition: "Alignment technique training a reward model on human preferences to guide LLM behavior via policy optimization.", ipa: "/ˌɑːr.ɛl.eɪtʃˈɛf/", collocations: ["RLHF alignment", "reward model", "preference ranking"] },
      { en: "Context Window", es: "Ventana de Contexto", definition: "Maximum number of tokens an LLM can process in a single forward pass, defining its working memory capacity.", ipa: "/ˈkɑːn.tɛkst ˈwɪn.doʊ/", collocations: ["128K context window", "extend context length", "context overflow"] },
      { en: "Fine-Tuning (SFT)", es: "Ajuste Fino Supervisado (SFT)", definition: "Process of further training a pre-trained model on curated task-specific datasets to improve performance.", ipa: "/faɪn ˈtuː.nɪŋ/", collocations: ["instruction fine-tuning", "domain-specific SFT", "fine-tune on labeled data"] }
    ],
    questions: [
      { q: "What is the primary advantage of Self-Attention over Recurrent Neural Networks (RNNs)?", options: ["It uses less memory", "It processes all tokens in parallel rather than sequentially", "It requires no training data", "It only works with English text"], answer: 1 },
      { q: "In the LLM development pipeline, what follows Supervised Fine-Tuning (SFT)?", options: ["Pre-Training on raw text", "Alignment via RLHF or DPO", "Byte-Pair Encoding", "Quantization to INT8"], answer: 1 },
      { q: "What does the scaling factor √dk prevent in the attention computation?", options: ["Memory overflow in GPUs", "Dot products from becoming too large, causing vanishing softmax gradients", "The model from learning multiple languages", "Tokenizer vocabulary explosion"], answer: 1 },
      { q: "Which tokenization algorithm iteratively merges the most frequent adjacent pairs?", options: ["Word2Vec", "One-Hot Encoding", "Byte-Pair Encoding (BPE)", "TF-IDF Vectorization"], answer: 2 }
    ]
  }]
};

// ─────────────────────────────────────────────
// MODULE 3: Computer Vision & AOI
// ─────────────────────────────────────────────
const aimlM3 = {
  id: "aiml-m3",
  title: "Computer Vision & Automated Optical Inspection (AOI)",
  titleES: "Visión Artificial e Inspección Óptica Automatizada",
  icon: "fa-solid fa-eye",
  readings: [{
    id: "aiml-m3-r1",
    title: "Convolutional Neural Networks, Object Detection & Industrial AOI Systems",
    duration: "13 min",
    content: `
> **Industry Certification Note**: Aligned with **AWS Certified Machine Learning — Specialty** and **SEMI E142 (Automated Defect Classification)** standards for semiconductor and automotive quality inspection.

# Convolutional Neural Networks, Object Detection & Industrial AOI Systems

In high-volume manufacturing environments—from SMT (Surface Mount Technology) PCB assembly lines in Guadalajara to automotive paint shops in Monterrey—**Automated Optical Inspection (AOI)** systems powered by deep learning have replaced manual visual inspection. These systems capture high-resolution images at line speed and classify defects with sub-millisecond latency.

## 1. Convolutional Neural Networks (CNNs): Feature Extraction Hierarchy

A **Convolutional Neural Network (CNN)** is a specialized deep learning architecture designed to process grid-structured data (images, spectrograms). Its fundamental building blocks are:

- **Convolutional Layer**: Applies a set of learnable **filters** (kernels) across the input image. Each filter slides (convolves) over the image computing element-wise dot products, producing a **feature map** that detects specific patterns (edges, textures, shapes). Early layers detect low-level features (horizontal edges, color gradients); deeper layers learn high-level abstractions (component shapes, solder joint morphology).
- **Pooling Layer**: Reduces spatial dimensions through **Max Pooling** (selecting the maximum value in a local region) or **Average Pooling**, decreasing computational cost and providing translational invariance.
- **Fully Connected Layer**: Flattens the final feature maps into a 1D vector for classification via softmax or sigmoid activation.

The hierarchy of feature extraction—from raw pixels to edges to textures to objects—is the key insight that makes CNNs extraordinarily effective for visual recognition tasks.

## 2. Object Detection Architectures

Industrial AOI requires not just classifying an entire image, but **localizing and classifying multiple defects** simultaneously within a single frame. Modern object detection architectures include:

- **YOLO (You Only Look Once)**: A single-stage detector that divides the image into a grid and predicts bounding boxes and class probabilities simultaneously in one forward pass. YOLOv8/v9 variants achieve real-time inference (>100 FPS) on industrial GPUs, making them ideal for high-speed manufacturing lines.
- **SSD (Single Shot MultiBox Detector)**: Uses multi-scale feature maps from different layers to detect objects of varying sizes without separate region proposal steps.
- **Faster R-CNN**: A two-stage detector with a **Region Proposal Network (RPN)** that first identifies candidate regions, then classifies each proposal. Higher accuracy but slower than single-stage methods.

For semiconductor wafer inspection, **instance segmentation** models like **Mask R-CNN** generate pixel-level defect masks (e.g., precisely outlining a micro-crack on a die), enabling automated defect area measurement and severity classification.

## 3. AOI System Architecture in Manufacturing

A complete industrial AOI station consists of:

1. **Illumination System**: Structured lighting (coaxial, ring, dome, dark-field) engineered to maximize defect contrast. For solder paste inspection (SPI), 3D structured light uses phase-shifted fringe patterns to measure paste volume with micrometer precision.
2. **High-Speed Camera Array**: Industrial cameras (CoaXPress or Camera Link interfaces) capturing 12-bit grayscale or color images at 500+ frames per second. Resolution ranges from 5 to 25 megapixels depending on the required field-of-view and minimum detectable defect size.
3. **Edge AI Inference Engine**: An embedded GPU or NPU (e.g., NVIDIA Jetson AGX Orin) running the quantized CNN model. The inference pipeline processes each captured frame through preprocessing (geometric correction, normalization), model inference, and post-processing (non-maximum suppression, confidence thresholding) within a single production cycle time.
4. **Classification & Disposition**: Defects are classified by type (missing component, tombstoned capacitor, solder bridge, polarity reversal) and severity. The system triggers real-time rejection of defective units via pneumatic diverter gates or robotic pick-and-place arms.

## 4. Transfer Learning & Domain Adaptation

Training a CNN from scratch requires millions of labeled images. In practice, engineers use **Transfer Learning**: starting from a model pre-trained on ImageNet (14 million images, 1,000 classes) and fine-tuning only the final classification layers on a factory-specific dataset of a few thousand labeled defect images. This dramatically reduces training time from weeks to hours while maintaining high accuracy (>99.5% defect detection rate).

**Data Augmentation** techniques—random rotation, horizontal flipping, brightness jittering, Gaussian noise injection—artificially expand small training datasets and improve model robustness to real-world variations in lighting, component placement, and camera angle.

---
> **Key Takeaway**: Industrial AOI merges **CNN feature extraction** (convolutional filters → feature maps → classification) with **real-time object detection** (YOLO, Mask R-CNN) deployed on **edge inference hardware** (NVIDIA Jetson) to achieve >99.5% defect detection at manufacturing line speed—replacing human visual inspectors with consistent, tireless machine intelligence.
`,
    vocabulary: [
      { en: "Convolutional Neural Network (CNN)", es: "Red Neuronal Convolucional (CNN)", definition: "Deep learning architecture using learnable filters to extract hierarchical spatial features from images.", ipa: "/ˌkɑːn.vəˈluː.ʃən.əl/", collocations: ["CNN feature map", "convolutional filter", "deep CNN backbone"] },
      { en: "YOLO (You Only Look Once)", es: "YOLO (Solo Miras Una Vez)", definition: "Single-stage real-time object detection architecture that predicts bounding boxes and classes in one forward pass.", ipa: "/ˈjoʊ.loʊ/", collocations: ["YOLOv8 inference", "real-time YOLO detection", "YOLO bounding box"] },
      { en: "Transfer Learning", es: "Aprendizaje por Transferencia", definition: "Technique of reusing a pre-trained model on a new task, fine-tuning only the final layers on domain-specific data.", ipa: "/ˈtræns.fɜːr ˈlɜːr.nɪŋ/", collocations: ["ImageNet pre-trained", "fine-tune via transfer", "domain adaptation"] },
      { en: "Feature Map", es: "Mapa de Características", definition: "Output matrix produced by applying a convolutional filter to an input, encoding detected spatial patterns.", ipa: "/ˈfiː.tʃər mæp/", collocations: ["multi-scale feature maps", "feature extraction layer", "activation map"] },
      { en: "Non-Maximum Suppression (NMS)", es: "Supresión de No Máximos (NMS)", definition: "Post-processing algorithm that eliminates overlapping duplicate bounding box predictions, keeping only the highest-confidence detection.", ipa: "/nɒn ˈmæk.sɪ.məm/", collocations: ["NMS threshold", "suppress overlapping boxes", "confidence score filtering"] },
      { en: "Data Augmentation", es: "Aumento de Datos", definition: "Technique of artificially expanding training datasets through random transformations (rotation, flip, noise) to improve model robustness.", ipa: "/ˈdeɪ.tə ˌɔːɡ.mɛnˈteɪ.ʃən/", collocations: ["augmentation pipeline", "random crop augmentation", "synthetic training data"] }
    ],
    questions: [
      { q: "In a CNN, what does a convolutional filter (kernel) produce when applied to an input image?", options: ["A tokenized sequence", "A feature map encoding detected spatial patterns", "A compressed audio file", "A SQL query result"], answer: 1 },
      { q: "Why is YOLO preferred over Faster R-CNN for high-speed manufacturing AOI?", options: ["YOLO requires no training data", "YOLO achieves real-time inference (>100 FPS) in a single forward pass", "Faster R-CNN cannot detect objects", "YOLO uses no GPU memory"], answer: 1 },
      { q: "What is the primary benefit of Transfer Learning in industrial AOI deployment?", options: ["It eliminates the need for cameras", "It reduces training time from weeks to hours by reusing pre-trained weights", "It converts images to text automatically", "It removes the need for edge hardware"], answer: 1 },
      { q: "What post-processing technique eliminates redundant overlapping bounding boxes?", options: ["Backpropagation", "Byte-Pair Encoding", "Non-Maximum Suppression (NMS)", "Gradient Descent"], answer: 2 }
    ]
  }]
};

// ─────────────────────────────────────────────
// MODULE 4: MLOps: CI/CD & Model Deployment
// ─────────────────────────────────────────────
const aimlM4 = {
  id: "aiml-m4",
  title: "MLOps: CI/CD Pipelines & Model Deployment",
  titleES: "MLOps: Pipelines CI/CD y Despliegue de Modelos",
  icon: "fa-solid fa-server",
  readings: [{
    id: "aiml-m4-r1",
    title: "MLOps Lifecycle, Model Registries & Production Serving Infrastructure",
    duration: "12 min",
    content: `
> **Industry Certification Note**: Aligned with **Google Cloud Professional Machine Learning Engineer**, **AWS Certified Machine Learning — Specialty**, and **MLflow Open Source Standard** for production ML lifecycle management.

# MLOps Lifecycle, Model Registries & Production Serving Infrastructure

Building a high-accuracy machine learning model in a Jupyter notebook is only 20% of the challenge. The remaining 80% is **MLOps (Machine Learning Operations)**—the engineering discipline of deploying, monitoring, and maintaining ML models in production at industrial scale.

## 1. The MLOps Lifecycle

MLOps extends traditional DevOps principles (CI/CD, infrastructure-as-code, monitoring) to the unique challenges of machine learning systems:

1. **Data Pipeline**: Automated ingestion, validation, and preprocessing of training data. Schema drift detection ensures that incoming data maintains the expected feature distributions. Tools: Apache Airflow, Kubeflow Pipelines, Prefect.
2. **Experiment Tracking**: Every training run logs hyperparameters (learning rate, batch size, optimizer), metrics (accuracy, F1-score, AUC-ROC), and artifact hashes. This enables reproducibility and systematic comparison across experiments. Tools: MLflow, Weights & Biases (W&B), Neptune.
3. **Model Registry**: A versioned repository storing trained model artifacts alongside metadata (training dataset version, performance metrics, lineage). The registry enforces promotion gates: a model must pass automated validation tests before transitioning from "Staging" to "Production." Tools: MLflow Model Registry, Vertex AI Model Registry.
4. **CI/CD for ML**: Continuous Integration validates code changes (unit tests, linting) and triggers retraining pipelines. Continuous Deployment automatically packages validated models into serving containers and deploys them to production endpoints with canary or blue-green rollout strategies.
5. **Monitoring & Observability**: Production models degrade over time due to **data drift** (the statistical distribution of input data shifts) and **concept drift** (the relationship between inputs and targets changes). Automated monitoring pipelines detect drift using statistical tests (KS-test, PSI) and trigger retraining workflows.

## 2. Model Serving Architectures

Once a model passes the registry's promotion gates, it must be served to production applications:

- **Real-Time Inference (Synchronous)**: REST or gRPC endpoints serving predictions with sub-100ms latency. The model is loaded into GPU memory and responds to individual requests. Frameworks: TensorFlow Serving, NVIDIA Triton Inference Server, TorchServe.
- **Batch Inference (Asynchronous)**: Processing large volumes of data offline (e.g., scoring all customer records nightly). Apache Spark ML or dedicated batch prediction jobs process millions of records in parallel.
- **Streaming Inference**: Models consume events from message queues (Apache Kafka, Amazon Kinesis) and produce predictions in near real-time. Essential for fraud detection, IoT anomaly alerting, and manufacturing quality monitoring.

## 3. Containerization & Orchestration

Production ML deployments rely on **containerization** for reproducibility:

- **Docker**: Packages the model, runtime dependencies (Python version, library versions), and serving framework into an immutable container image. This eliminates the "it works on my machine" problem.
- **Kubernetes (K8s)**: Orchestrates container deployment, auto-scaling (Horizontal Pod Autoscaler adjusts replica count based on request latency or GPU utilization), health checking (liveness/readiness probes), and rolling updates with zero downtime.
- **Model Optimization at Serving Time**: NVIDIA TensorRT compiles models into optimized execution plans targeting specific GPU architectures. ONNX Runtime provides hardware-agnostic inference acceleration.

## 4. Feature Stores & Training-Serving Skew

A **Feature Store** (e.g., Feast, Tecton, Vertex AI Feature Store) is a centralized repository for computing, storing, and serving ML features. It solves the critical problem of **training-serving skew**—when the features used during training differ from those available at inference time due to inconsistent data processing logic. The feature store maintains a single source of truth for feature computation, ensuring that training and serving pipelines produce identical feature values.

---
> **Key Takeaway**: MLOps transforms experimental ML models into reliable production systems through **experiment tracking** (MLflow), **model registries** with promotion gates, **containerized serving** (Docker + Kubernetes + Triton), and **continuous monitoring** for data drift—ensuring that industrial AI maintains accuracy and reliability 24/7.
`,
    vocabulary: [
      { en: "MLOps (Machine Learning Operations)", es: "MLOps (Operaciones de Aprendizaje Automático)", definition: "Engineering discipline for deploying, monitoring, and maintaining ML models in production at scale.", ipa: "/ˌɛm.ɛlˈɒps/", collocations: ["MLOps pipeline", "MLOps lifecycle", "production MLOps"] },
      { en: "Model Registry", es: "Registro de Modelos", definition: "Versioned repository storing trained model artifacts with metadata, lineage, and promotion gates for staging-to-production transitions.", ipa: "/ˈmɒd.əl ˈrɛdʒ.ɪ.stri/", collocations: ["register model version", "promote to production", "model artifact lineage"] },
      { en: "Data Drift", es: "Deriva de Datos", definition: "Statistical shift in the distribution of production input data compared to the training dataset, degrading model accuracy.", ipa: "/ˈdeɪ.tə drɪft/", collocations: ["detect data drift", "drift monitoring alert", "distribution shift"] },
      { en: "Feature Store", es: "Almacén de Características (Feature Store)", definition: "Centralized system for computing, storing, and serving ML features consistently across training and inference.", ipa: "/ˈfiː.tʃər stɔːr/", collocations: ["online feature store", "feature engineering pipeline", "training-serving consistency"] },
      { en: "Canary Deployment", es: "Despliegue Canario", definition: "Gradual rollout strategy routing a small percentage of traffic to the new model version while monitoring for regressions before full deployment.", ipa: "/kəˈnɛr.i dɪˈplɔɪ.mənt/", collocations: ["canary rollout", "percentage-based routing", "automated rollback"] },
      { en: "NVIDIA Triton Inference Server", es: "Servidor de Inferencia NVIDIA Triton", definition: "Open-source inference serving platform supporting multiple ML frameworks with dynamic batching and GPU scheduling.", ipa: "/ˈtraɪ.tɒn/", collocations: ["Triton model repository", "dynamic batching", "multi-model serving"] }
    ],
    questions: [
      { q: "What percentage of the ML production challenge does model building typically represent?", options: ["80%", "100%", "50%", "Approximately 20%, with the remaining 80% being MLOps"], answer: 3 },
      { q: "What is the primary purpose of a Model Registry in MLOps?", options: ["To train neural networks faster", "To version and store model artifacts with promotion gates from Staging to Production", "To compress images for AOI", "To replace Kubernetes"], answer: 1 },
      { q: "What causes a deployed ML model to degrade in accuracy over time?", options: ["Hardware failure exclusively", "Data drift and concept drift in production inputs", "Running out of disk space", "Using Python instead of C++"], answer: 1 },
      { q: "How does a Feature Store prevent training-serving skew?", options: ["By deleting old training data", "By maintaining a single source of truth for feature computation across training and serving", "By increasing GPU memory", "By converting models to ONNX format"], answer: 1 }
    ]
  }]
};

// ─────────────────────────────────────────────
// MODULE 5: AI Governance, Safety & Bias
// ─────────────────────────────────────────────
const aimlM5 = {
  id: "aiml-m5",
  title: "AI Governance, Safety & Bias Mitigation",
  titleES: "Gobernanza de IA, Seguridad y Mitigación de Sesgos",
  icon: "fa-solid fa-shield-halved",
  readings: [{
    id: "aiml-m5-r1",
    title: "Responsible AI Frameworks, Algorithmic Bias & Regulatory Compliance",
    duration: "11 min",
    content: `
> **Industry Certification Note**: Aligned with **ISO/IEC 42001:2023 (AI Management System)**, **IEEE 7000 (Model Process for Ethical Engineering)**, and the **EU AI Act (2024)** regulatory framework.

# Responsible AI Frameworks, Algorithmic Bias & Regulatory Compliance

As AI systems increasingly make high-stakes decisions—from hiring and lending to medical diagnostics and autonomous driving—the engineering community must address fundamental questions of **fairness**, **transparency**, **accountability**, and **safety**. AI Governance is no longer a philosophical exercise; it is an engineering discipline with formal standards, auditing procedures, and legal mandates.

## 1. Sources of Algorithmic Bias

**Algorithmic bias** occurs when an AI system produces systematically prejudiced results due to flawed assumptions in the machine learning process. Bias can enter the pipeline at multiple stages:

- **Training Data Bias**: The dataset reflects historical inequities. Example: a hiring model trained on ten years of résumé data from a company that historically hired predominantly male engineers will learn to penalize résumés containing female-associated terms.
- **Sampling Bias**: Underrepresentation of minority groups in the training dataset. If a facial recognition system is trained on 85% light-skinned faces, its error rate on dark-skinned individuals will be disproportionately higher.
- **Label Bias**: Human annotators inject subjective judgment into ground-truth labels. In medical imaging, diagnostic labels may reflect regional clinical practices rather than objective pathology.
- **Feedback Loop Bias**: A deployed model's predictions influence future data collection, creating a self-reinforcing cycle. Predictive policing systems that direct patrols to historically over-policed neighborhoods generate more arrests in those areas, which then trains the next model iteration to predict even higher crime rates there.

## 2. Fairness Metrics & Bias Auditing

Engineers must quantify fairness using mathematical metrics:

- **Demographic Parity**: The probability of a positive prediction should be equal across all protected groups (e.g., gender, ethnicity). $P(\\hat{Y}=1 | A=a) = P(\\hat{Y}=1 | A=b)$
- **Equalized Odds**: The true positive rate (TPR) and false positive rate (FPR) should be equal across groups. This ensures the model is equally accurate for all demographics.
- **Calibration**: Among all individuals predicted to have a 70% probability of an outcome, approximately 70% should actually experience that outcome, regardless of group membership.

**Bias auditing tools** (IBM AI Fairness 360, Google What-If Tool, Microsoft Fairlearn) automate the computation of these metrics across protected attributes and generate compliance reports.

## 3. Explainability & Interpretability (XAI)

Regulatory frameworks increasingly mandate that AI decisions be **explainable**:

- **SHAP (SHapley Additive exPlanations)**: Assigns each feature a contribution score based on cooperative game theory (Shapley values), explaining how much each input feature pushed the prediction above or below the baseline.
- **LIME (Local Interpretable Model-agnostic Explanations)**: Generates a locally faithful linear model around a specific prediction to explain which features most influenced the decision.
- **Attention Visualization**: In Transformer models, visualizing attention weight matrices reveals which input tokens the model focused on when generating each output token.

## 4. Regulatory Landscape

The global regulatory framework for AI is rapidly crystallizing:

- **EU AI Act (2024)**: The world's first comprehensive AI law. Classifies AI systems by risk level: **Unacceptable Risk** (social scoring, real-time biometric surveillance) → banned; **High Risk** (medical devices, hiring, credit scoring) → mandatory conformity assessments, human oversight, and documentation; **Limited Risk** → transparency obligations; **Minimal Risk** → no restrictions.
- **ISO/IEC 42001:2023**: International standard for AI Management Systems, defining requirements for establishing, implementing, and continually improving responsible AI practices within organizations.
- **NIST AI Risk Management Framework (AI RMF 1.0)**: Voluntary U.S. framework providing a structured approach to AI risk identification, assessment, and mitigation.

## 5. Red Teaming & AI Safety

**AI Red Teaming** involves adversarial testing of AI systems to discover failure modes, harmful outputs, and security vulnerabilities before deployment:
- **Prompt Injection Attacks**: Crafted inputs that override the model's system instructions, causing it to leak confidential data or execute unintended behaviors.
- **Jailbreaking**: Techniques that bypass safety guardrails (content filters, refusal training) to elicit prohibited outputs.
- **Adversarial Examples**: Imperceptible perturbations to input data (e.g., adding noise to a stop sign image) that cause misclassification while appearing identical to human observers.

---
> **Key Takeaway**: AI Governance requires engineers to **audit for algorithmic bias** (demographic parity, equalized odds), ensure **model explainability** (SHAP, LIME), comply with **international regulations** (EU AI Act, ISO 42001), and conduct **red team adversarial testing** before deploying AI systems in high-stakes industrial and social applications.
`,
    vocabulary: [
      { en: "Algorithmic Bias", es: "Sesgo Algorítmico", definition: "Systematic and unfair discrimination in AI outputs caused by flawed data, assumptions, or model design.", ipa: "/ˌæl.ɡəˈrɪð.mɪk ˈbaɪ.əs/", collocations: ["bias in training data", "mitigate algorithmic bias", "bias audit report"] },
      { en: "SHAP (SHapley Additive exPlanations)", es: "SHAP (Explicaciones Aditivas de Shapley)", definition: "Explainability method assigning each feature a contribution value based on cooperative game theory.", ipa: "/ʃæp/", collocations: ["SHAP feature importance", "Shapley value plot", "model explainability"] },
      { en: "Demographic Parity", es: "Paridad Demográfica", definition: "Fairness metric requiring equal probability of positive predictions across all protected demographic groups.", ipa: "/ˌdɛm.əˈɡræf.ɪk ˈpær.ɪ.ti/", collocations: ["achieve demographic parity", "fairness constraint", "protected attribute"] },
      { en: "EU AI Act", es: "Ley de IA de la UE", definition: "World's first comprehensive AI regulation classifying systems by risk level and mandating conformity assessments for high-risk AI.", ipa: "/ˌiː.juː eɪˈaɪ ækt/", collocations: ["high-risk AI classification", "conformity assessment", "EU regulatory compliance"] },
      { en: "Red Teaming", es: "Equipo Rojo (Red Teaming)", definition: "Adversarial testing methodology probing AI systems for failure modes, biases, and security vulnerabilities before deployment.", ipa: "/rɛd ˈtiː.mɪŋ/", collocations: ["AI red team exercise", "adversarial testing", "discover attack vectors"] },
      { en: "Prompt Injection", es: "Inyección de Prompt", definition: "Attack technique using crafted inputs to override an LLM's system instructions, causing unintended or harmful behavior.", ipa: "/prɑːmpt ɪnˈdʒɛk.ʃən/", collocations: ["indirect prompt injection", "jailbreak attempt", "safety guardrail bypass"] }
    ],
    questions: [
      { q: "What is 'feedback loop bias' in a deployed AI system?", options: ["The model crashes from too many requests", "The model's predictions influence future data, creating a self-reinforcing cycle of bias", "The model forgets its training data", "Users provide too much positive feedback"], answer: 1 },
      { q: "Under the EU AI Act, what happens to AI systems classified as 'Unacceptable Risk'?", options: ["They receive a warning label", "They are banned entirely", "They require a software update", "They are reclassified as Low Risk"], answer: 1 },
      { q: "What does SHAP measure for each input feature?", options: ["The feature's storage size in bytes", "How much each feature contributed to pushing the prediction above or below the baseline", "The feature's pixel resolution", "The training time per epoch"], answer: 1 },
      { q: "What is the purpose of AI Red Teaming?", options: ["To make the model faster", "To adversarially test for failure modes, harmful outputs, and security vulnerabilities", "To compress the model for edge deployment", "To translate the model into Spanish"], answer: 1 }
    ]
  }]
};

// ─── APPLY MODULES ─────────────────────────────
const course = LXP_COURSES["ai-ml"];
if (!course) { console.error("ai-ml course not found!"); process.exit(1); }

// Replace stub modules (indices 1-4)
const newModules = [aimlM2, aimlM3, aimlM4, aimlM5];
for (let i = 0; i < newModules.length; i++) {
  const idx = course.modules.findIndex(m => m.id === newModules[i].id);
  if (idx !== -1) {
    course.modules[idx] = newModules[i];
    console.log(`  ✅ Replaced ${newModules[i].id}: ${newModules[i].title}`);
  } else {
    course.modules.push(newModules[i]);
    console.log(`  ➕ Added ${newModules[i].id}: ${newModules[i].title}`);
  }
}

// ─── SERIALIZE & SAVE ──────────────────────────
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
console.log('\n✅ Successfully expanded AI/ML track (4 modules) in courses.js');
console.log(`   File size: ${(fs.statSync(coursesPath).size / 1024).toFixed(1)} KB`);
