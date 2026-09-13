// scripts/expand_software.cjs
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Loaded courses for Software Dev:', Object.keys(LXP_COURSES).length);

// -------------------------------------------------------------
// SOFTWARE DEVELOPMENT: Clean Architecture & Microservices (software-m1)
// -------------------------------------------------------------
const softwareReading = `
> **Industry Alignment & Engineering Standard**: Aligned with **ISO/IEC 25010 (Systems and software Quality Requirements)** and **Cloud Native Computing Foundation (CNCF) Patterns**. Essential for Full-Stack Developers, Backend Engineers, and DevOps Specialists.

# Clean Architecture, Microservices, and Event-Driven Design

In modern software engineering, scaling an application from a monolithic codebase to a highly distributed, cloud-native architecture requires rigorous adherence to design patterns. The transition mitigates technical debt and ensures that the system remains maintainable, testable, and highly available.

## 1. Clean Architecture and Domain-Driven Design (DDD)
At the core of maintainable software is the separation of concerns. **Clean Architecture** (popularized by Robert C. Martin) dictates that the business logic must be completely isolated from external frameworks, UI, and databases.
- **Dependency Inversion Principle (DIP)**: High-level modules (business rules) should not depend on low-level modules (database connectors). Both should depend on abstractions (interfaces).
- **Ubiquitous Language**: In Domain-Driven Design, developers and business stakeholders must agree on a shared vocabulary (e.g., instead of saying "change status to 2", the code and the business logic both say "MarkOrderAsFulfilled").

## 2. Microservices Architecture vs. Monoliths
A **Monolithic Application** packages the user interface, business logic, and data access into a single deployable unit. As the team grows, this creates a deployment bottleneck.
- **Microservices**: The application is decomposed into small, independently deployable services organized around business capabilities (e.g., Auth Service, Billing Service, Inventory Service). 
- **API Gateways**: Clients do not connect directly to microservices. Instead, an API Gateway acts as a reverse proxy, handling authentication, rate limiting, and request routing.
- **Database per Service**: A critical rule of microservices is that each service must own its database schema. Services must never share tables; they must communicate via well-defined APIs or events to prevent tightly coupled schemas.

## 3. Event-Driven Communication and Saga Patterns
When microservices do not share a database, maintaining data consistency across services requires specialized patterns.
- **Synchronous vs. Asynchronous**: Synchronous HTTP/REST calls between services can cause cascading failures (if Billing is down, Checkout fails). Asynchronous communication uses message brokers (like RabbitMQ or Kafka) to publish events (e.g., \`OrderPlacedEvent\`) that other services consume independently.
- **The Saga Pattern**: Since distributed databases lack traditional ACID transactions spanning multiple services, the Saga pattern manages a sequence of local transactions. If one step fails (e.g., Inventory is out of stock after Payment succeeds), the Saga executes **Compensating Transactions** (e.g., refunding the payment) to restore the system to a consistent state.

---
> **Key Takeaway**: Enterprise software engineering links **structural design (Clean Architecture, DDD)** with **distributed systems (Microservices, API Gateways)** and **eventual consistency (Sagas, Message Brokers)**.
`;

const softwareDialogue = {
  title: "Architecture Review: Cascading Failures and the Saga Pattern",
  titleES: "Revisión de Arquitectura: Fallos en Cascada y el Patrón Saga",
  scenarioContext: "San Francisco, CA (HQ Architecture Board) ⇄ Bogotá, Colombia (Backend Core Team). Post-mortem analysis.",
  characters: [
    { name: "Emily Chen", role: "Staff Software Engineer (San Francisco)", avatar: "EC", color: "var(--emerald)" },
    { name: "Ing. Javier Ruiz", role: "Lead Backend Developer (Bogotá)", avatar: "JR", color: "var(--cyan)" }
  ],
  turns: [
    {
      speaker: "Emily Chen",
      text: "Javier, during yesterday's Black Friday spike, the Checkout Service crashed. It looks like it was waiting for a synchronous HTTP response from the Legacy Inventory API, causing a thread pool exhaustion. We had a textbook cascading failure.",
      translation: "Javier, durante el pico de Black Friday de ayer, el Servicio de Pago (Checkout) colapsó. Parece que estaba esperando una respuesta HTTP síncrona de la API de Inventario Legacy, causando el agotamiento del pool de hilos (thread pool). Tuvimos un fallo en cascada de manual.",
      targetTerms: ["Checkout Service", "synchronous HTTP response", "thread pool exhaustion", "cascading failure"]
    },
    {
      speaker: "Ing. Javier Ruiz",
      text: "Agreed, Emily. The tight coupling killed us. I propose we decouple the services by implementing an Event-Driven architecture. Checkout will publish an 'OrderCreated' event to an Amazon SQS queue, and Inventory can consume it asynchronously.",
      translation: "De acuerdo, Emily. El acoplamiento fuerte (tight coupling) nos mató. Propongo que desacoplemos los servicios implementando una arquitectura Orientada a Eventos. El Checkout publicará un evento 'OrderCreated' en una cola de Amazon SQS, y el Inventario podrá consumirlo de forma asíncrona.",
      targetTerms: ["tight coupling", "decouple the services", "Event-Driven architecture", "publish an event", "asynchronously"]
    },
    {
      speaker: "Emily Chen",
      text: "That solves the availability issue, but what about data consistency? If Payment processes successfully but Inventory later determines the item is out of stock, we can't use a standard SQL transaction rollback since they have separate databases.",
      translation: "Eso resuelve el problema de disponibilidad, pero ¿qué pasa con la consistencia de los datos? Si el Pago se procesa con éxito pero luego el Inventario determina que el artículo está agotado, no podemos usar un rollback de transacción SQL estándar ya que tienen bases de datos separadas.",
      targetTerms: ["availability issue", "data consistency", "transaction rollback", "separate databases"]
    },
    {
      speaker: "Ing. Javier Ruiz",
      text: "We will implement an Orchestration-based Saga pattern. If the inventory reservation fails, the Saga orchestrator will trigger a compensating transaction—specifically, emitting a 'RefundRequested' command to reverse the initial payment.",
      translation: "Implementaremos un patrón Saga basado en orquestación. Si la reserva de inventario falla, el orquestador Saga activará una transacción compensatoria; específicamente, emitiendo un comando 'RefundRequested' para revertir el pago inicial.",
      targetTerms: ["Saga pattern", "orchestrator", "compensating transaction", "reverse the initial payment"]
    }
  ],
  contrastTips: [
    {
      school: "The website broke because the other server was slow.",
      native: "We experienced a cascading failure due to thread pool exhaustion from a synchronous dependency.",
      explanation: "En la escuela se dice 'the website broke', pero un ingeniero debe especificar el mecanismo exacto del fallo: 'cascading failure' y 'thread pool exhaustion'."
    },
    {
      school: "I will make the code undo the changes.",
      native: "The Saga orchestrator will trigger a compensating transaction.",
      explanation: "En sistemas distribuidos, no existe un simple 'undo' (rollback). Se utiliza terminología arquitectónica formal como 'compensating transaction'."
    }
  ]
};

const softwareLexicon = [
  {
    term: "Microservices",
    ipa: "/ˈmaɪ.kroʊˌsɜːr.vɪ.sɪz/",
    es: "Microservicios",
    category: "Arquitectura",
    definition: "An architectural style that structures an application as a collection of small, autonomous services modeled around a business domain.",
    collocations: ["microservices architecture", "deploy a microservice", "strangler fig pattern"],
    falseFriends: "No son servidores físicamente pequeños; son componentes de software independientes con su propia base de datos y despliegue.",
    nativeUsage: "We are migrating the legacy PHP monolith into containerized Go and Node.js microservices."
  },
  {
    term: "Tight Coupling",
    ipa: "/taɪt ˈkʌp.lɪŋ/",
    es: "Acoplamiento Fuerte",
    category: "Diseño de Software",
    definition: "A state in software design where components are highly dependent on one another, making the system difficult to modify, test, or scale independently.",
    collocations: ["avoid tight coupling", "tightly coupled databases", "loose coupling"],
    falseFriends: "Coupling aquí no se refiere a parejas románticas (pareja), sino a la dependencia técnica entre dos piezas de código.",
    nativeUsage: "The tight coupling between the UI rendering and the database queries makes unit testing almost impossible."
  },
  {
    term: "Cascading Failure",
    ipa: "/kæsˈkeɪ.dɪŋ ˈfeɪl.jər/",
    es: "Fallo en Cascada",
    category: "Confiabilidad de Sistemas",
    definition: "A failure that grows progressively over time as one part of the system fails and shifts its load to other parts, causing them to fail as well.",
    collocations: ["prevent a cascading failure", "circuit breaker pattern", "cascading outage"],
    falseFriends: "No es una 'cascada de agua que falla'; es un efecto dominó destructivo en redes de servidores.",
    nativeUsage: "Without a circuit breaker pattern in place, the slow database caused a cascading failure across all upstream services."
  },
  {
    term: "Saga Pattern",
    ipa: "/ˈsɑː.ɡə ˈpæt.ərn/",
    es: "Patrón Saga",
    category: "Patrones Distribuidos",
    definition: "A design pattern used to manage data consistency across microservices in distributed transaction scenarios by executing a sequence of local transactions.",
    collocations: ["orchestration saga", "choreography saga", "implement the saga pattern"],
    falseFriends: "En ingeniería de software no es un 'cuento épico' (saga); es el protocolo de transacciones distribuidas compensatorias.",
    nativeUsage: "The e-commerce checkout relies on the Saga pattern to handle inventory reservation and payment processing across different microservices."
  },
  {
    term: "Compensating Transaction",
    ipa: "/ˈkɑːm.pən.seɪ.tɪŋ trænˈzæk.ʃən/",
    es: "Transacción Compensatoria",
    category: "Sistemas Distribuidos",
    definition: "An operation that semantically undoes the effect of a previous operation in a distributed system where standard database rollbacks are impossible.",
    collocations: ["trigger a compensating transaction", "compensating logic", "eventual consistency"],
    falseFriends: "No significa 'pagarle/compensarle con dinero al usuario'; significa revertir los cambios de estado en bases de datos asíncronas.",
    nativeUsage: "When the hotel booking failed, the saga executed a compensating transaction to refund the customer's flight payment."
  },
  {
    term: "Dependency Inversion",
    ipa: "/dɪˈpɛn.dən.si ɪnˈvɜːr.ʒən/",
    es: "Inversión de Dependencias (D del SOLID)",
    category: "Principios SOLID",
    definition: "A software design principle stating that high-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).",
    collocations: ["dependency inversion principle", "inject dependencies", "inversion of control"],
    falseFriends: "No es poner el código 'de cabeza'; es hacer que el código dependa de 'interfaces/contratos' y no de implementaciones directas.",
    nativeUsage: "By applying Dependency Inversion, we easily swapped the MySQL database for Postgres without changing the core business logic."
  }
];

const softwareSocratic = [
  {
    step: 1,
    concept: "Tight Coupling vs Loose Coupling",
    botQuestion: "Welcome to the Software Architecture Audit! Explain in English why 'Tight Coupling' is dangerous in a Microservices architecture. What happens if Service A makes a synchronous HTTP request to Service B, and Service B becomes slow?",
    requiredKeywords: ["tight", "coupling", "synchronous", "cascading", "failure", "dependent", "wait"],
    minKeywords: 3,
    feedbackSuccess: "Perfect! Tight coupling means components are highly dependent on each other. If Service A makes a synchronous call to a slow Service B, Service A's threads will block (wait), leading to thread pool exhaustion and a dangerous cascading failure.",
    feedbackRetry: "Think about dependencies! If you 'tightly couple' two services with a synchronous call, what happens to the first service when the second one stops responding? Mention 'cascading failure'."
  },
  {
    step: 2,
    concept: "The Saga Pattern & Compensating Transactions",
    botQuestion: "In a distributed system, you cannot use a traditional SQL 'rollback' to undo a transaction that spans multiple separate databases. Explain how the 'Saga Pattern' solves this problem using 'Compensating Transactions'.",
    requiredKeywords: ["saga", "compensating", "transaction", "undo", "reverse", "distributed", "eventual consistency"],
    minKeywords: 3,
    feedbackSuccess: "Spot-on! Since microservices don't share a database, the Saga Pattern orchestrates a sequence of local transactions. If one step fails, it triggers a Compensating Transaction (like a refund command) to semantically undo the previous steps.",
    feedbackRetry: "How do you undo an action if you can't use a database rollback? Think about what the system has to do manually to reverse a change. Use the term 'Compensating Transaction'."
  }
];

if (!LXP_COURSES["software-dev"]) {
  LXP_COURSES["software-dev"] = {
    id: "software-dev",
    category: "cat-tech",
    title: "Software Development & Programming",
    titleES: "Desarrollo de Software y Programación",
    icon: "💻",
    desc: "Master Clean Architecture, SOLID principles, Microservices, and Event-Driven distributed systems.",
    descES: "Domina Clean Architecture, principios SOLID, Microservicios y sistemas distribuidos orientados a eventos.",
    modules_required: 1,
    modules: [
      {
        id: "software-m1",
        title: "Clean Architecture & Microservices",
        titleES: "Clean Architecture y Microservicios",
        isGoldModel: true,
        readings: [
          {
            id: "software-m1-r1",
            title: "Microservices, Sagas & Event-Driven Design",
            duration: "12 min",
            content: softwareReading,
            vocabulary: softwareLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
          }
        ],
        dialogue: softwareDialogue,
        lexiconMatrix: softwareLexicon,
        socraticChallenges: softwareSocratic,
        quiz: []
      }
    ]
  };
} else {
  LXP_COURSES["software-dev"].modules[0] = {
    id: "software-m1",
    title: "Clean Architecture & Microservices",
    titleES: "Clean Architecture y Microservicios",
    isGoldModel: true,
    readings: [
      {
        id: "software-m1-r1",
        title: "Microservices, Sagas & Event-Driven Design",
        duration: "12 min",
        content: softwareReading,
        vocabulary: softwareLexicon.map(i => ({ en: i.term, es: i.es, definition: i.definition, ipa: i.ipa, collocations: i.collocations }))
      }
    ],
    dialogue: softwareDialogue,
    lexiconMatrix: softwareLexicon,
    socraticChallenges: softwareSocratic,
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
console.log('Successfully added Software Dev module to courses.js');
