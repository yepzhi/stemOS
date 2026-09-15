// scripts/expand_data.cjs — Data Science & Analytics (data-m2 through data-m5)
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const coursesPath = path.resolve(__dirname, '../content/courses.js');
const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(fs.readFileSync(coursesPath, 'utf8'), sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;
console.log('Expanding Data Science & Analytics...');

const dataM2 = { id: "data-m2", title: "SQL at Scale, Indexing & Query Execution Plans", titleES: "SQL a Escala, Indexación y Planes de Ejecución de Consultas", icon: "fa-solid fa-database", readings: [{ id: "data-m2-r1", title: "Advanced SQL Optimization, B-Tree Indexes & Query Planner Architecture", duration: "13 min", content: `
> **Industry Alignment**: Aligned with **Databricks Certified Data Engineer Associate**, **AWS Certified Data Analytics — Specialty**, and **ISO/IEC 9075 (SQL Standard)**.

# Advanced SQL Optimization, B-Tree Indexes & Query Planner Architecture

SQL remains the universal language of data. But writing correct SQL is only the first step—writing **performant SQL** that executes efficiently across billions of rows requires deep understanding of indexing, query execution plans, and database engine internals.

## 1. B-Tree Index Architecture

The **B-Tree (Balanced Tree)** is the default index structure in virtually all relational databases (PostgreSQL, MySQL, SQL Server, Oracle):
- **Structure**: A self-balancing tree where each node contains sorted keys and pointers. Leaf nodes contain pointers to the actual data rows (or the rows themselves in clustered indexes).
- **Search Complexity**: O(log N) — searching 1 billion rows requires at most ~30 node comparisons instead of scanning all 1 billion rows sequentially.
- **Clustered vs. Non-Clustered**: A **clustered index** physically sorts the table data by the index key (one per table). A **non-clustered index** maintains a separate structure with pointers to the heap (data rows).

**Composite Indexes**: An index on multiple columns (e.g., \`CREATE INDEX idx_order ON orders(customer_id, order_date)\`). The **leftmost prefix rule** means this index accelerates queries filtering on \`customer_id\` alone or \`customer_id + order_date\`, but NOT \`order_date\` alone.

## 2. Query Execution Plans

The **query planner** (also called the optimizer) transforms a SQL statement into an execution plan—a directed acyclic graph (DAG) of physical operations:
- **Seq Scan (Full Table Scan)**: Reads every row in the table. Acceptable for small tables but catastrophic for large ones.
- **Index Scan**: Uses the B-Tree index to locate matching rows directly. Orders of magnitude faster for selective queries.
- **Index Only Scan (Covering Index)**: All requested columns exist within the index itself, eliminating the need to fetch data from the main table (heap).
- **Hash Join**: Builds an in-memory hash table from the smaller relation, then probes it with rows from the larger relation. Optimal for equi-joins on large datasets.
- **Nested Loop Join**: For each row in the outer table, scans the inner table. Efficient only when the inner table has an index and the outer table is small.
- **Sort + Merge Join**: Sorts both relations on the join key, then merges them in a single pass. Efficient when both inputs are already sorted or when the result set is very large.

Use \`EXPLAIN ANALYZE\` (PostgreSQL) or \`EXPLAIN FORMAT=JSON\` (MySQL) to inspect the actual execution plan, including row estimates, execution time per node, and memory usage.

## 3. Partitioning & Sharding

For tables exceeding hundreds of millions of rows:
- **Table Partitioning**: Divides a table into smaller physical segments based on a partition key (date range, region, hash). The query planner performs **partition pruning**—skipping irrelevant partitions entirely.
- **Horizontal Sharding**: Distributes data across multiple database servers. Each shard holds a subset of rows. Requires a shard key strategy and a routing layer (Vitess, Citus, CockroachDB).

## 4. Window Functions & Analytical SQL

Modern analytical queries use **window functions** to compute running totals, rankings, and moving averages without GROUP BY aggregation:
- \`ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)\` — assigns a unique rank within each department.
- \`SUM(revenue) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\` — computes a 7-day rolling revenue sum.
- \`LAG(value, 1) OVER (ORDER BY timestamp)\` — retrieves the previous row's value for time-series delta calculations.

---
> **Key Takeaway**: Performant SQL requires understanding **B-Tree index mechanics** (O(log N) search, composite index leftmost prefix rule), reading **query execution plans** (EXPLAIN ANALYZE), applying **partitioning** for billion-row tables, and leveraging **window functions** for analytical computations at scale.
`,
    vocabulary: [
      { en: "B-Tree Index", es: "Índice B-Tree (Árbol B)", definition: "Self-balancing tree data structure enabling O(log N) search, insertion, and deletion in relational databases.", ipa: "/biː triː/", collocations: ["B-Tree leaf node", "clustered B-Tree index", "index key lookup"] },
      { en: "Query Execution Plan", es: "Plan de Ejecución de Consulta", definition: "The optimized sequence of physical operations (scans, joins, sorts) the database engine executes to fulfill a SQL statement.", ipa: "/ˈkwɪr.i ˌɛk.sɪˈkjuː.ʃən/", collocations: ["EXPLAIN ANALYZE", "execution plan node", "optimizer cost estimate"] },
      { en: "Partition Pruning", es: "Poda de Particiones", definition: "Query optimization technique where the planner skips irrelevant table partitions based on filter predicates.", ipa: "/pɑːrˈtɪʃ.ən ˈpruː.nɪŋ/", collocations: ["date-range partitioning", "prune unused partitions", "partition key selection"] },
      { en: "Window Function", es: "Función de Ventana (Window Function)", definition: "SQL function computing a value across a set of table rows related to the current row, without collapsing rows like GROUP BY.", ipa: "/ˈwɪn.doʊ ˈfʌŋk.ʃən/", collocations: ["ROW_NUMBER() OVER", "PARTITION BY clause", "rolling window aggregate"] },
      { en: "Hash Join", es: "Unión por Hash (Hash Join)", definition: "Join algorithm building an in-memory hash table from the smaller relation and probing it with rows from the larger relation.", ipa: "/hæʃ dʒɔɪn/", collocations: ["hash join build phase", "probe the hash table", "equi-join optimization"] },
      { en: "Horizontal Sharding", es: "Fragmentación Horizontal (Sharding)", definition: "Distributing table rows across multiple database servers, each holding a subset of the data for scalability.", ipa: "/ˈʃɑːr.dɪŋ/", collocations: ["shard key strategy", "cross-shard query", "shard rebalancing"] }
    ],
    questions: [
      { q: "What is the search complexity of a B-Tree index?", options: ["O(N) linear scan", "O(log N) logarithmic", "O(N²) quadratic", "O(1) constant"], answer: 1 },
      { q: "What does 'partition pruning' accomplish?", options: ["Deletes old data permanently", "Skips irrelevant table partitions during query execution, dramatically reducing scan volume", "Creates new indexes automatically", "Compresses data files"], answer: 1 },
      { q: "In a composite index on (customer_id, order_date), which query can use this index?", options: ["WHERE order_date = '2024-01-01' (alone)", "WHERE customer_id = 42 AND order_date > '2024-01-01'", "WHERE product_name = 'Widget'", "WHERE amount > 100"], answer: 1 },
      { q: "What command reveals the actual execution plan in PostgreSQL?", options: ["SELECT *", "DROP TABLE", "EXPLAIN ANALYZE", "CREATE INDEX"], answer: 2 }
    ]
  }]
};

const dataM3 = { id: "data-m3", title: "Statistical Inference, Hypothesis Testing & A/B Experimentation", titleES: "Inferencia Estadística, Pruebas de Hipótesis y Experimentación A/B", icon: "fa-solid fa-chart-column", readings: [{ id: "data-m3-r1", title: "Frequentist Hypothesis Testing, P-Values & Controlled Experimentation", duration: "12 min", content: `
> **Industry Alignment**: Aligned with **Google Data Analytics Professional Certificate**, **Meta Marketing Science Professional**, and **ASA Statement on P-Values (2016)**.

# Frequentist Hypothesis Testing, P-Values & Controlled Experimentation

Data-driven decision making in technology companies—from optimizing UI conversions to validating manufacturing process changes—relies on **statistical hypothesis testing**. Understanding these methods in English is essential for communicating with international data science teams and publishing results.

## 1. The Hypothesis Testing Framework

1. **Null Hypothesis (H₀)**: The default assumption that there is NO effect, NO difference, or NO relationship. Example: "The new landing page does NOT increase conversion rate."
2. **Alternative Hypothesis (H₁ or Hₐ)**: The claim that there IS an effect. "The new landing page DOES increase conversion rate."
3. **Test Statistic**: A numerical value computed from sample data (z-score, t-statistic, chi-squared) that quantifies how far the observed result deviates from what H₀ predicts.
4. **P-Value**: The probability of observing a test statistic at least as extreme as the one computed, ASSUMING H₀ is true. A small p-value (typically < 0.05) provides evidence against H₀.
5. **Decision**: If p-value < α (significance level, typically 0.05), reject H₀ in favor of H₁. Otherwise, fail to reject H₀.

## 2. Type I and Type II Errors

- **Type I Error (False Positive, α)**: Rejecting H₀ when it is actually true. "We concluded the new design works, but it actually doesn't." Controlled by the significance level α.
- **Type II Error (False Negative, β)**: Failing to reject H₀ when H₁ is actually true. "We concluded the new design has no effect, but it actually does."
- **Statistical Power (1 - β)**: The probability of correctly detecting a real effect. Standard target: 80%. Power increases with larger sample sizes and larger effect sizes.

## 3. A/B Testing (Controlled Experimentation)

A/B testing is the gold standard for causal inference in product and process optimization:
1. **Randomization**: Users (or production units) are randomly assigned to Control (A) or Treatment (B) groups, eliminating confounding variables.
2. **Sample Size Calculation**: Before launching, calculate the required sample size using: desired significance level (α = 0.05), desired power (1-β = 0.80), minimum detectable effect (MDE), and baseline conversion rate.
3. **Run Duration**: The experiment must run long enough to capture full business cycles (weekday/weekend effects, payroll cycles) and reach the required sample size.
4. **Analysis**: Compare the metric (conversion rate, revenue per user, defect rate) between groups using a two-proportion z-test or t-test. Report the point estimate, confidence interval, and p-value.
5. **Decision**: Ship the treatment if statistically significant AND practically significant (the effect size is large enough to matter operationally).

## 4. Common Pitfalls

- **Peeking**: Checking results repeatedly during the experiment inflates the false positive rate. Use sequential testing methods or pre-commit to a fixed analysis time.
- **Multiple Comparisons**: Testing many metrics simultaneously increases the chance of at least one false positive. Apply Bonferroni correction or False Discovery Rate (FDR) control.
- **Simpson's Paradox**: A trend that appears in aggregated data can reverse when the data is split by a confounding variable (e.g., by device type or user segment).

---
> **Key Takeaway**: Statistical inference follows the **H₀/H₁ → test statistic → p-value → decision** framework. A/B testing requires **randomization**, pre-calculated **sample sizes**, and awareness of pitfalls (**peeking, multiple comparisons, Simpson's Paradox**) to draw valid causal conclusions.
`,
    vocabulary: [
      { en: "P-Value", es: "Valor P (P-Value)", definition: "Probability of observing a test statistic as extreme as the one computed, assuming the null hypothesis is true.", ipa: "/piː ˈvæl.juː/", collocations: ["p-value below 0.05", "statistically significant p-value", "interpret the p-value"] },
      { en: "Null Hypothesis (H₀)", es: "Hipótesis Nula (H₀)", definition: "Default assumption that there is no effect, no difference, or no relationship in the population.", ipa: "/nʌl haɪˈpɒθ.ə.sɪs/", collocations: ["reject the null", "fail to reject H₀", "null hypothesis of no effect"] },
      { en: "Statistical Power", es: "Potencia Estadística (Power)", definition: "Probability of correctly detecting a real effect when it exists (1 minus the Type II error rate β).", ipa: "/pˈaʊ.ər/", collocations: ["80% power target", "underpowered study", "power analysis calculation"] },
      { en: "Confidence Interval", es: "Intervalo de Confianza", definition: "Range of values within which the true population parameter lies with a specified probability (typically 95%).", ipa: "/ˈkɒn.fɪ.dəns/", collocations: ["95% confidence interval", "narrow CI", "CI contains zero"] },
      { en: "Type I Error (False Positive)", es: "Error Tipo I (Falso Positivo)", definition: "Incorrectly rejecting a true null hypothesis — concluding there is an effect when there actually is none.", ipa: "/taɪp wʌn/", collocations: ["α = 0.05 controls Type I", "false positive rate", "significance level"] },
      { en: "Minimum Detectable Effect (MDE)", es: "Efecto Mínimo Detectable (MDE)", definition: "The smallest effect size that the experiment is designed to detect with the specified power and significance level.", ipa: "/ˌɛm.diːˈiː/", collocations: ["set the MDE", "MDE of 2% lift", "sample size for MDE"] }
    ],
    questions: [
      { q: "What does a p-value of 0.03 mean?", options: ["There is a 3% chance the treatment works", "Assuming the null hypothesis is true, there is a 3% probability of observing results this extreme", "The treatment is 97% effective", "The experiment has a 3% error rate"], answer: 1 },
      { q: "What is a Type II Error?", options: ["Concluding there is an effect when there is none", "Failing to detect a real effect that actually exists", "A calculation mistake", "A data entry error"], answer: 1 },
      { q: "Why is 'peeking' at A/B test results problematic?", options: ["It slows down the website", "Repeatedly checking results inflates the false positive rate", "It reveals the experiment to competitors", "It uses too much server memory"], answer: 1 },
      { q: "What is the standard target for statistical power in experiment design?", options: ["50%", "80%", "95%", "100%"], answer: 1 }
    ]
  }]
};

const dataM4 = { id: "data-m4", title: "Predictive Analytics, Time-Series & Anomaly Detection", titleES: "Analítica Predictiva, Series Temporales y Detección de Anomalías", icon: "fa-solid fa-chart-line", readings: [{ id: "data-m4-r1", title: "Time-Series Forecasting, Anomaly Detection & Predictive Maintenance", duration: "12 min", content: `
> **Industry Alignment**: Aligned with **AWS Certified Machine Learning**, **Google Cloud Professional Data Engineer**, and **ISO 55000 (Asset Management)** for predictive maintenance analytics.

# Time-Series Forecasting, Anomaly Detection & Predictive Maintenance

**Predictive analytics** transforms historical data into forward-looking insights. In industrial settings, it prevents equipment failures, optimizes inventory, and detects quality deviations before they become costly production stops.

## 1. Time-Series Decomposition

A **time series** is a sequence of data points indexed by time. Classical decomposition separates the signal into three components:
- **Trend (T)**: Long-term directional movement (increasing production output, declining defect rates).
- **Seasonality (S)**: Repeating patterns at fixed intervals (daily shift patterns, monthly demand cycles, quarterly peaks).
- **Residual (R)**: Random noise remaining after trend and seasonality are removed.

Additive model: Y(t) = T(t) + S(t) + R(t)
Multiplicative model: Y(t) = T(t) × S(t) × R(t)

## 2. Forecasting Methods

- **Exponential Smoothing (ETS)**: Family of methods assigning exponentially decreasing weights to older observations. Holt-Winters method handles both trend and seasonality.
- **ARIMA (AutoRegressive Integrated Moving Average)**: Statistical model combining autoregression (past values predict future), differencing (achieving stationarity), and moving average (past forecast errors). Specified as ARIMA(p,d,q) where p=AR order, d=differencing order, q=MA order.
- **Prophet (Meta)**: Decomposition-based model designed for business time series with daily/weekly/yearly seasonality and holiday effects. Robust to missing data and trend changes.
- **Temporal Fusion Transformers**: Deep learning architecture combining recurrent processing with attention mechanisms for multi-horizon forecasting with interpretable variable importance.

## 3. Anomaly Detection

An **anomaly** (outlier) is a data point that deviates significantly from expected behavior:
- **Statistical Methods**: Z-score (flag points >3 standard deviations from mean), IQR method (points beyond 1.5× interquartile range).
- **Isolation Forest**: Ensemble algorithm that isolates anomalies by randomly partitioning the feature space. Anomalies require fewer partitions to isolate.
- **Autoencoders**: Neural networks trained to reconstruct normal data. High reconstruction error indicates an anomaly (the model has not learned to reproduce that pattern).
- **DBSCAN**: Density-based clustering that labels points in sparse regions as anomalies.

## 4. Predictive Maintenance (PdM)

In manufacturing, PdM uses sensor telemetry (vibration, temperature, current, pressure) to predict equipment failures before they occur:
- **Remaining Useful Life (RUL)**: Predicting how many operating hours remain before a component fails, enabling just-in-time replacement.
- **Health Index**: A normalized score (0–100%) combining multiple sensor features into a single equipment health metric using supervised learning models.
- **Condition-Based Maintenance**: Maintenance is triggered by actual equipment condition (vibration exceeds threshold) rather than fixed calendar intervals, reducing unnecessary maintenance by 30–50%.

---
> **Key Takeaway**: Predictive analytics combines **time-series decomposition** (trend, seasonality, residual) with **forecasting models** (ARIMA, Prophet, Transformers) and **anomaly detection** (Isolation Forest, Autoencoders) to enable **predictive maintenance** that prevents equipment failures and optimizes industrial operations.
`,
    vocabulary: [
      { en: "ARIMA", es: "ARIMA (Modelo Autorregresivo Integrado de Media Móvil)", definition: "Statistical forecasting model combining autoregression, differencing for stationarity, and moving average of past errors.", ipa: "/əˈriː.mə/", collocations: ["ARIMA(1,1,1)", "seasonal ARIMA", "ARIMA forecast horizon"] },
      { en: "Anomaly Detection", es: "Detección de Anomalías", definition: "Identifying data points or patterns that deviate significantly from expected normal behavior.", ipa: "/əˈnɒm.ə.li/", collocations: ["real-time anomaly detection", "anomaly score threshold", "unsupervised anomaly detection"] },
      { en: "Time-Series Decomposition", es: "Descomposición de Series Temporales", definition: "Separating a time series into trend, seasonality, and residual components for analysis and forecasting.", ipa: "/taɪm ˈsɪr.iːz/", collocations: ["additive decomposition", "seasonal component", "detrended residual"] },
      { en: "Remaining Useful Life (RUL)", es: "Vida Útil Restante (RUL)", definition: "Predicted number of operating hours before a component fails, enabling proactive replacement scheduling.", ipa: "/ˌɑːr.juːˈɛl/", collocations: ["RUL prediction model", "estimate remaining life", "failure threshold"] },
      { en: "Isolation Forest", es: "Bosque de Aislamiento (Isolation Forest)", definition: "Anomaly detection algorithm isolating outliers by randomly partitioning feature space, requiring fewer splits for anomalies.", ipa: "/ˌaɪ.səˈleɪ.ʃən/", collocations: ["isolation tree split", "anomaly score", "ensemble anomaly detector"] },
      { en: "Stationarity", es: "Estacionariedad", definition: "Property of a time series whose statistical properties (mean, variance) do not change over time, required by ARIMA.", ipa: "/ˌsteɪ.ʃəˈnær.ɪ.ti/", collocations: ["test for stationarity", "differencing to achieve stationarity", "ADF test"] }
    ],
    questions: [
      { q: "What are the three components of classical time-series decomposition?", options: ["Mean, median, mode", "Trend, seasonality, and residual", "Input, output, error", "Training, validation, testing"], answer: 1 },
      { q: "What does ARIMA(p,d,q) represent?", options: ["Price, demand, quantity", "Autoregression order, differencing order, moving average order", "Precision, deviation, quality", "Probability, distribution, quartile"], answer: 1 },
      { q: "How does an Autoencoder detect anomalies?", options: ["By counting the number of data points", "By flagging data points with high reconstruction error, indicating unlearned patterns", "By sorting data alphabetically", "By comparing timestamps"], answer: 1 },
      { q: "What is the advantage of condition-based maintenance over calendar-based maintenance?", options: ["It is always cheaper", "Maintenance is triggered by actual equipment condition, reducing unnecessary maintenance by 30-50%", "It requires no sensors", "It eliminates all equipment failures"], answer: 1 }
    ]
  }]
};

const dataM5 = { id: "data-m5", title: "Vector Databases, High-Dimensional Embeddings & Semantic Search", titleES: "Bases de Datos Vectoriales, Embeddings de Alta Dimensión y Búsqueda Semántica", icon: "fa-solid fa-magnifying-glass-chart", readings: [{ id: "data-m5-r1", title: "Embedding Models, Vector Similarity Search & RAG Architectures", duration: "12 min", content: `
> **Industry Alignment**: Aligned with **Google Cloud Vertex AI**, **OpenAI Embedding API**, and **Pinecone/Weaviate/Milvus** vector database architectures.

# Embedding Models, Vector Similarity Search & RAG Architectures

Traditional keyword search fails when users express the same concept in different words. **Semantic search** solves this by representing text, images, and other data as dense numerical vectors (**embeddings**) where proximity in vector space reflects semantic similarity.

## 1. What Are Embeddings?

An **embedding** is a dense, fixed-dimensional numerical vector (e.g., 768 or 1536 floating-point numbers) produced by a neural network encoder. The model is trained so that semantically similar inputs map to nearby points in high-dimensional space:
- "machine learning engineer" → [0.23, -0.41, 0.87, ...]
- "ML software developer" → [0.25, -0.39, 0.85, ...] (very close in vector space)
- "chocolate cake recipe" → [-0.71, 0.56, -0.12, ...] (far away)

Embedding models (OpenAI text-embedding-3, Google Gecko, Cohere Embed v3, BGE-M3) are trained on massive text corpora using contrastive learning objectives.

## 2. Vector Similarity Metrics

To find the most similar vectors to a query, databases compute distance or similarity:
- **Cosine Similarity**: Measures the angle between two vectors, ignoring magnitude. Range: -1 (opposite) to +1 (identical). Most common for text embeddings.
- **Euclidean Distance (L2)**: Straight-line distance between two points. Lower = more similar. Sensitive to vector magnitude.
- **Dot Product**: Combines both direction and magnitude. Used when embedding models produce normalized vectors.

## 3. Vector Database Architecture

**Vector databases** (Pinecone, Weaviate, Milvus, Qdrant, ChromaDB, pgvector) are purpose-built for storing, indexing, and querying high-dimensional vectors:
- **Approximate Nearest Neighbor (ANN) Indexes**: Exact brute-force search across millions of vectors is computationally prohibitive. ANN algorithms trade minimal accuracy for massive speed improvements:
  - **HNSW (Hierarchical Navigable Small World)**: Graph-based index creating multi-layered proximity graphs. The most popular ANN algorithm due to high recall (>99%) at sub-millisecond query times.
  - **IVF (Inverted File Index)**: Clusters vectors using k-means, then searches only the nearest clusters. Faster index construction but lower recall than HNSW.
  - **Product Quantization (PQ)**: Compresses vectors by splitting them into subvectors and quantizing each independently, drastically reducing memory requirements.
- **Metadata Filtering**: Combines vector similarity search with traditional attribute filters (e.g., "find the most similar product descriptions WHERE category = 'electronics' AND price < 500").

## 4. Retrieval-Augmented Generation (RAG)

**RAG** is the dominant architecture for building LLM applications grounded in factual data:
1. **Indexing Phase**: Documents are chunked (split into segments of 256–1024 tokens), each chunk is embedded, and the vectors are stored in a vector database alongside the original text.
2. **Query Phase**: The user's question is embedded using the same model. A similarity search retrieves the top-K most relevant chunks.
3. **Generation Phase**: The retrieved chunks are injected into the LLM's prompt as context. The LLM generates an answer grounded in the retrieved evidence, dramatically reducing hallucination.

Advanced RAG techniques:
- **Hybrid Search**: Combining vector similarity with BM25 keyword scoring via Reciprocal Rank Fusion (RRF) for better recall.
- **Re-Ranking**: A cross-encoder model re-scores the initial retrieval results for higher precision.
- **Chunking Strategies**: Sentence-level, paragraph-level, or semantic chunking (splitting on topic boundaries detected by embedding similarity).

---
> **Key Takeaway**: **Embeddings** encode semantic meaning as dense vectors, enabling **similarity search** via cosine similarity on **ANN-indexed vector databases** (HNSW, IVF). **RAG architectures** ground LLM responses in factual retrieved data, combining vector search with generation to reduce hallucination.
`,
    vocabulary: [
      { en: "Embedding (Vector)", es: "Embedding (Vector Denso)", definition: "Dense fixed-dimensional numerical representation of text or data, where proximity in vector space reflects semantic similarity.", ipa: "/ɪmˈbɛd.ɪŋ/", collocations: ["text embedding model", "768-dimensional embedding", "embed the document"] },
      { en: "Cosine Similarity", es: "Similitud Coseno", definition: "Metric measuring the angle between two vectors, ranging from -1 (opposite) to +1 (identical), used to compare embeddings.", ipa: "/ˈkoʊ.saɪn/", collocations: ["cosine similarity score", "cosine distance threshold", "semantic similarity"] },
      { en: "Approximate Nearest Neighbor (ANN)", es: "Vecino Más Cercano Aproximado (ANN)", definition: "Algorithm family trading minimal accuracy for massive speed improvements in high-dimensional vector search.", ipa: "/əˈprɒk.sɪ.mət/", collocations: ["HNSW ANN index", "ANN query latency", "recall-speed tradeoff"] },
      { en: "RAG (Retrieval-Augmented Generation)", es: "RAG (Generación Aumentada por Recuperación)", definition: "Architecture grounding LLM responses in factual retrieved data by embedding, searching, and injecting relevant context into prompts.", ipa: "/ræɡ/", collocations: ["RAG pipeline", "RAG retrieval", "ground the LLM with RAG"] },
      { en: "HNSW (Hierarchical Navigable Small World)", es: "HNSW (Mundo Pequeño Navegable Jerárquico)", definition: "Graph-based ANN index creating multi-layered proximity graphs achieving >99% recall at sub-millisecond query times.", ipa: "/ˌeɪtʃ.ɛn.ɛs.ˈdʌb.əl.juː/", collocations: ["HNSW graph layer", "HNSW recall rate", "build HNSW index"] },
      { en: "Chunking (Document)", es: "Fragmentación de Documentos (Chunking)", definition: "Splitting documents into smaller segments (256-1024 tokens) for individual embedding and retrieval in RAG systems.", ipa: "/tʃʌŋk.ɪŋ/", collocations: ["semantic chunking", "chunk overlap", "chunk size optimization"] }
    ],
    questions: [
      { q: "Why are semantically similar texts close together in embedding space?", options: ["Because they have the same number of words", "Because the embedding model was trained to map similar meanings to nearby vectors", "Because they were written on the same date", "Because they share the same file format"], answer: 1 },
      { q: "What does HNSW achieve in vector databases?", options: ["Exact nearest neighbor search", ">99% recall at sub-millisecond query times by building navigable graph layers", "SQL query optimization", "Data compression to save disk space"], answer: 1 },
      { q: "In a RAG pipeline, what is the purpose of the retrieval step?", options: ["To train the LLM from scratch", "To find the most relevant document chunks and inject them as context to reduce hallucination", "To delete irrelevant data", "To compute the model's loss function"], answer: 1 },
      { q: "Which similarity metric measures the angle between two vectors, ignoring magnitude?", options: ["Euclidean distance", "Dot product", "Cosine similarity", "Manhattan distance"], answer: 2 }
    ]
  }]
};

// ─── APPLY ─────────────────────────────────────
const course = LXP_COURSES["data-analytics"];
for (const mod of [dataM2, dataM3, dataM4, dataM5]) {
  const idx = course.modules.findIndex(m => m.id === mod.id);
  if (idx !== -1) { course.modules[idx] = mod; console.log(`  ✅ ${mod.id}`); }
  else { course.modules.push(mod); console.log(`  ➕ ${mod.id}`); }
}

const header = `/**\n * stemOS LXP Course Content Database\n * ====================================\n * STEM & Specialized English (ESP) — Nearshoring & High-Tech Industry Tracks\n */\n\nvar LXP_CATEGORIES = ${JSON.stringify(LXP_CATEGORIES, null, 4)};\n\nvar LXP_COURSES = ${JSON.stringify(LXP_COURSES, null, 4)};\n\nif (typeof window !== 'undefined') {\n    window.LXP_CATEGORIES = LXP_CATEGORIES;\n    window.LXP_COURSES = LXP_COURSES;\n}\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { LXP_CATEGORIES, LXP_COURSES };\n}\n`;
fs.writeFileSync(coursesPath, header, 'utf8');
console.log(`\n✅ Data Science expanded. File: ${(fs.statSync(coursesPath).size/1024).toFixed(1)} KB`);
