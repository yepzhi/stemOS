// scripts/expand_data.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Data Science:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// DATA SCIENCE & ANALYTICS: Kafka, Lakehouse & Embeddings (data-m1)
// -------------------------------------------------------------
const dataReading = `
> **Industry Alignment & Architecture Standard**: Aligned with **Databricks Data Engineer Professional** concepts and **ISO/IEC 20547 (Big Data Reference Architecture)**. Essential for Data Engineers, ML Ops, and Backend Systems Architects.

# Real-Time Streaming, Lakehouse Architecture & Vector Embeddings

The era of monolithic relational databases performing nightly batch ETL (Extract, Transform, Load) jobs is over. Modern data science relies on real-time event streaming, unified Lakehouse architectures, and high-dimensional vector spaces to power GenAI applications.

## 1. Event Streaming with Apache Kafka
Instead of querying a database for state changes, modern applications use **event-driven architecture**.
- **Topics and Partitions**: In Apache Kafka, an event (e.g., a user click or a sensor reading) is published to a specific **Topic**. To scale horizontally, topics are split into **Partitions** across multiple broker nodes. 
- **Offset and Consumer Groups**: Consumers read messages from partitions. Kafka keeps track of what has been read using an **Offset** pointer. If a consumer crashes, it restarts and resumes exactly from its last committed offset, ensuring no data loss (At-Least-Once delivery semantics).

## 2. The Lakehouse Architecture (Parquet & Iceberg)
Historically, companies maintained cheap Data Lakes (raw unstructured files) and expensive Data Warehouses (structured SQL databases). The **Data Lakehouse** merges both:
- **Columnar Storage (Apache Parquet)**: Unlike CSV or JSON, which store data row-by-row, Parquet stores data column-by-column. This enables aggressive compression and allows analytical queries to instantly skip irrelevant columns, reducing I/O costs by 90%.
- **Table Formats (Apache Iceberg / Delta Lake)**: A metadata layer sits on top of the Parquet files in object storage (like AWS S3). Iceberg provides ACID transactions (Atomicity, Consistency, Isolation, Durability), enabling time-travel queries and schema evolution without locking the entire table.

## 3. Vector Embeddings and RAG (Retrieval-Augmented Generation)
Large Language Models (LLMs) require domain-specific context. 
- **Embeddings**: Text, images, or audio are passed through an embedding model (e.g., text-embedding-3) to generate a dense vector of floating-point numbers (e.g., 1536 dimensions). Vectors that are mathematically close (measured by Cosine Similarity) are semantically related in meaning.
- **Vector Databases**: These high-dimensional arrays are indexed in specialized vector databases (Pinecone, Milvus) using algorithms like HNSW (Hierarchical Navigable Small World).
- **RAG Pipeline**: When a user asks a question, the query is embedded, the vector database retrieves the nearest neighbors (most relevant documents), and these documents are injected into the LLM's prompt context before generation.

---
> **Key Takeaway**: Modern data engineering links **low-latency streaming (Kafka partitions)** with **high-throughput storage (Parquet/Iceberg)** and **semantic AI retrieval (Vector Embeddings, Cosine Similarity)**.
`;

const dataDialogue = {
  title: "Incident Triage: Kafka Consumer Lag and Iceberg Compaction",
  titleES: "Triaje de Incidentes: Retraso de Consumidor Kafka y Compactación Iceberg",
  scenarioContext: "Austin, TX (Data Platform Team) ⇄ Monterrey, NL (Data Engineering Squad). P1 incident on live dashboard.",
  characters: [
    { name: "Sarah Jenkins", role: "Principal Data Architect (Austin)", avatar: "SJ", color: "var(--purple)" },
    { name: "Ing. David Garza", role: "Senior Data Engineer (Monterrey)", avatar: "DG", color: "var(--emerald)" }
  ],
  turns: [
    {
      speaker: "Sarah Jenkins",
      text: "David, the real-time anomaly detection dashboard is severely delayed. Datadog is showing a massive consumer lag on the 'sensor-telemetry' Kafka topic. What's bottlenecking the Spark Structured Streaming job?",
      translation: "David, el tablero de detección de anomalías en tiempo real está severamente retrasado. Datadog muestra un retraso de consumidor masivo en el tópico Kafka 'sensor-telemetry'. ¿Qué está creando un cuello de botella en el trabajo de Spark Structured Streaming?",
      targetTerms: ["delayed", "consumer lag", "Kafka topic", "bottlenecking", "Spark Structured Streaming"]
    },
    {
      speaker: "Ing. David Garza",
      text: "I checked the Spark executors. The ingestion isn't the problem; it's the write side. The Iceberg table on S3 suffers from the small files problem. The streaming job is writing thousands of tiny 5KB Parquet files per minute, destroying our I/O throughput.",
      translation: "Revisé los ejecutores de Spark. La ingesta no es el problema; es el lado de escritura. La tabla Iceberg en S3 sufre el problema de archivos pequeños. El trabajo de streaming está escribiendo miles de pequeños archivos Parquet de 5KB por minuto, destruyendo nuestro rendimiento de I/O.",
      targetTerms: ["Spark executors", "Iceberg table", "small files problem", "Parquet files", "I/O throughput"]
    },
    {
      speaker: "Sarah Jenkins",
      text: "Ah, the metadata overhead is choking the catalog. Have you triggered an asynchronous compaction job to merge those small files into larger 128MB chunks?",
      translation: "Ah, la sobrecarga de metadatos está ahogando el catálogo. ¿Has activado un trabajo de compactación asíncrono para fusionar esos pequeños archivos en fragmentos más grandes de 128MB?",
      targetTerms: ["metadata overhead", "catalog", "asynchronous compaction job", "merge"]
    },
    {
      speaker: "Ing. David Garza",
      text: "Yes, I just submitted a bin-packing rewrite data files procedure via Airflow. I also increased the Kafka poll timeout so the consumers don't rebalance while the write commits. The consumer lag should drop to zero in about ten minutes.",
      translation: "Sí, acabo de enviar un procedimiento de reescritura de archivos de datos tipo bin-packing a través de Airflow. También aumenté el tiempo de espera (timeout) de sondeo de Kafka para que los consumidores no se rebalanceen mientras se confirma la escritura. El retraso del consumidor debería caer a cero en unos diez minutos.",
      targetTerms: ["bin-packing", "rewrite data files", "poll timeout", "rebalance", "write commits"]
    }
  ],
  contrastTips: [
    {
      school: "The system is slow because there are too many files.",
      native: "The Iceberg table suffers from the small files problem, degrading I/O throughput due to metadata overhead.",
      explanation: "En ingeniería de datos, no se dice 'system is slow'; se especifica el problema arquitectónico exacto ('small files problem') y su impacto ('metadata overhead', 'I/O throughput')."
    },
    {
      school: "The app is not reading messages fast enough.",
      native: "Datadog is reporting high consumer lag on the Kafka partition.",
      explanation: "El término estándar para el retraso en la lectura de eventos en streaming es 'consumer lag'."
    }
  ]
};

const dataLexicon = [
  {
    term: "Consumer Lag",
    ipa: "/kənˈsuː.mər læɡ/",
    es: "Retraso del Consumidor",
    category: "Streaming",
    definition: "The difference between the latest offset produced to a Kafka partition and the latest offset that has been read and committed by a consumer group.",
    collocations: ["high consumer lag", "monitor lag in Datadog", "lag spike"],
    falseFriends: "No significa que el cliente/usuario (consumer) tenga una mala conexión a internet; se refiere a la aplicación backend que lee de Kafka.",
    nativeUsage: "During the Black Friday sale, consumer lag on the transaction topic spiked to 5 million messages."
  },
  {
    term: "Parquet",
    ipa: "/pɑːrˈkeɪ/",
    es: "Formato Parquet",
    category: "Almacenamiento",
    definition: "An open-source, column-oriented data file format designed for efficient data storage and retrieval in Hadoop/Spark ecosystems.",
    collocations: ["columnar Parquet file", "snappy compressed Parquet", "Parquet schema"],
    falseFriends: "No es un piso de madera ('parqué'); es el formato de datos analítico estándar de la industria.",
    nativeUsage: "Switching from JSON to Parquet reduced our S3 storage costs by 80% and sped up queries tenfold."
  },
  {
    term: "Metadata Overhead",
    ipa: "/ˈmɛt.əˌdeɪ.tə ˈoʊ.vər.hɛd/",
    es: "Sobrecarga de Metadatos",
    category: "Arquitectura",
    definition: "The excessive processing time and memory required by a system to read the structural information (metadata) of millions of tiny files rather than the actual data.",
    collocations: ["choked by metadata overhead", "Iceberg manifest metadata", "reduce overhead"],
    falseFriends: "Overhead aquí no es 'sobre la cabeza' ni 'techo'; significa costo indirecto o penalización de rendimiento.",
    nativeUsage: "Querying the data lake took 5 minutes purely due to the metadata overhead of scanning 100,000 tiny log files."
  },
  {
    term: "Vector Embedding",
    ipa: "/ˈvɛk.tər ɪmˈbɛd.ɪŋ/",
    es: "Incrustación Vectorial / Embedding Vectorial",
    category: "Machine Learning",
    definition: "A learned representation of text, images, or audio where semantic meaning is mapped to a dense array of continuous numbers (a vector) in a high-dimensional space.",
    collocations: ["generate embeddings", "embedding model API", "cosine similarity of embeddings"],
    falseFriends: "No es 'incrustar' un video en HTML; es la representación matemática del significado de una palabra o frase.",
    nativeUsage: "The RAG pipeline calculates the distance between the user's query embedding and the document embeddings in Pinecone."
  },
  {
    term: "Cosine Similarity",
    ipa: "/ˈkoʊ.saɪn ˌsɪm.əˈlær.ə.ti/",
    es: "Similitud del Coseno",
    category: "Matemáticas / IA",
    definition: "A metric used to measure how similar two vectors are, irrespective of their magnitude, by calculating the cosine of the angle between them.",
    collocations: ["high cosine similarity", "nearest neighbor search", "semantic similarity"],
    falseFriends: "Es una métrica de proximidad semántica, un valor de 1 significa vectores idénticos, 0 ortogonales.",
    nativeUsage: "The search engine returns documents that have the highest cosine similarity to the embedded search query."
  },
  {
    term: "Compaction",
    ipa: "/kəmˈpæk.ʃən/",
    es: "Compactación",
    category: "Gestión de Datos",
    definition: "A background maintenance process in data lakes/databases that merges many small data files into fewer, larger optimal-sized files to improve query performance.",
    collocations: ["trigger compaction job", "asynchronous compaction", "bin-packing compaction"],
    falseFriends: "No es aplastar basura; es una optimización crítica de I/O para evitar el 'small files problem'.",
    nativeUsage: "We scheduled a nightly Airflow DAG to run Iceberg table compaction across all event-driven datasets."
  }
];

const dataSocratic = [
  {
    step: 1,
    concept: "Lakehouse & Small Files Problem",
    botQuestion: "Welcome to the Data Engineering Audit! Explain in English what the 'small files problem' is in a Data Lake. Why does writing thousands of 5KB files degrade query performance, and how is it fixed?",
    requiredKeywords: ["small files", "metadata", "overhead", "throughput", "compaction", "merge", "parquet"],
    minKeywords: 3,
    feedbackSuccess: "Perfect! Millions of tiny files create massive metadata overhead, choking the catalog and destroying I/O throughput. The solution is running a compaction job to merge them into larger (e.g., 128MB) Parquet chunks.",
    feedbackRetry: "Think about the catalog trying to read the list of files before even reading the data. What is 'metadata overhead'? What background process (starting with C) merges files?"
  },
  {
    step: 2,
    concept: "Vector Embeddings & RAG",
    botQuestion: "In a Retrieval-Augmented Generation (RAG) architecture, what is a 'vector embedding' and how does the system know which documents are semantically related to the user's query?",
    requiredKeywords: ["vector", "embedding", "cosine", "similarity", "numbers", "semantic", "distance", "nearest"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! A vector embedding converts text meaning into an array of numbers. The system finds related documents by measuring the spatial distance between vectors, typically using 'Cosine Similarity'.",
    feedbackRetry: "How do we turn text into math? Mention 'array of numbers' or 'dense vector'. How do we measure the distance between two vectors in space to check if they mean the same thing? (Starts with Cosine)."
  }
];

if (!LXP_COURSES["data-analytics"]) {
  LXP_COURSES["data-analytics"] = {
    id: "data-analytics",
    category: "cat-tech",
    title: "Data Science & Analytics",
    titleES: "Ciencia de Datos y Analítica",
    icon: "📊",
    desc: "Master event streaming architectures, Data Lakehouse metadata formats, and Vector Embedding engineering.",
    descES: "Domina arquitecturas de streaming de eventos, formatos de metadatos de Data Lakehouse y de Incrustaciones Vectoriales.",
    modules_required: 1,
    modules: [
      {
        id: "data-m1",
        title: "Kafka, Lakehouse & Embeddings",
        titleES: "Kafka, Lakehouse e Incrustaciones (Embeddings)",
        isGoldModel: true,
        readings: [
          {
            id: "data-m1-r1",
            title: "Streaming, Parquet & Vector Search Architecture",
            duration: "12 min",
            content: dataReading,
            vocabulary: dataLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: dataDialogue,
        lexiconMatrix: dataLexicon,
        socraticChallenges: dataSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["data-analytics"].modules[0] = {
    id: "data-m1",
    title: "Kafka, Lakehouse & Embeddings",
    titleES: "Kafka, Lakehouse e Incrustaciones (Embeddings)",
    isGoldModel: true,
    readings: [
      {
        id: "data-m1-r1",
        title: "Streaming, Parquet & Vector Search Architecture",
        duration: "12 min",
        content: dataReading,
        vocabulary: dataLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: dataDialogue,
    lexiconMatrix: dataLexicon,
    socraticChallenges: dataSocratic,
    quiz: []
  };
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
console.log('Successfully added Data Analytics module to courses.js');
