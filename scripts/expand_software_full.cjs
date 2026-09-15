const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Software Dev Modules 2-5...');

const track = LXP_COURSES["software-dev"];
if (!track) {
    console.log("Track software-dev not found!");
    process.exit(1);
}

// Module 2: High-Performance API Design: REST, GraphQL and gRPC
track.modules[1] = {
    id: "soft-m2",
    title: "High-Performance API Design: REST, GraphQL and gRPC",
    titleES: "Diseño de APIs de Alto Rendimiento: REST, GraphQL y gRPC",
    icon: "fa-solid fa-network-wired",
    readings: [
        {
            id: "soft-m2-r1",
            title: "Comparing API Paradigms",
            duration: "10 min",
            content: `
# Comparing API Paradigms

In modern software development, deciding how services communicate is foundational. We typically choose between REST, GraphQL, and gRPC based on the specific needs of the application.

## REST (Representational State Transfer)

REST is the most common architectural style. It uses standard HTTP methods (GET, POST, PUT, DELETE) and organizes data around **Resources** (like \`/users\` or \`/orders\`).
- **Pros**: Easy to cache, widely understood, uses standard HTTP infrastructure.
- **Cons**: Can lead to **Over-fetching** (getting more data than you need) or **Under-fetching** (requiring multiple requests to get all needed data).

## GraphQL

Created by Facebook, GraphQL allows the client to specify exactly what data it wants. Instead of multiple endpoints, it exposes a single endpoint (\`/graphql\`).
- **Pros**: Solves over/under-fetching. Clients dictate the shape of the response.
- **Cons**: Difficult to cache on the network edge. Can lead to complex, heavy database queries if not carefully optimized.

## gRPC (gRPC Remote Procedure Calls)

Developed by Google, gRPC uses **Protocol Buffers (Protobuf)** instead of JSON and runs over HTTP/2. It calls functions on remote servers as if they were local functions.
- **Pros**: Extremely fast, heavily compressed binary payload, strong typing with Protobuf contracts. Ideal for microservice-to-microservice communication.
- **Cons**: Harder to debug (payload is binary, not human-readable JSON), not natively supported by all web browsers.

---
> **Key Takeaway**: Use REST for public APIs, GraphQL for complex client-facing applications, and gRPC for internal, high-speed microservice communication.
`,
            vocabulary: [
                {
                    en: "Over-fetching",
                    es: "Sobrecarga de datos",
                    definition: "Downloading more data than the client actually needs for the UI."
                },
                {
                    en: "Payload",
                    es: "Carga útil",
                    definition: "The actual data being transmitted in an API request or response."
                },
                {
                    en: "Endpoint",
                    es: "Punto de acceso / Endpoint",
                    definition: "A specific URL where an API can be accessed by a client application."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: Containerization & Orchestration: Docker and Kubernetes
track.modules[2] = {
    id: "soft-m3",
    title: "Containerization & Orchestration: Docker and Kubernetes",
    titleES: "Contenedores y Orquestación: Docker y Kubernetes",
    icon: "fa-solid fa-box",
    readings: [
        {
            id: "soft-m3-r1",
            title: "The Shift to Containers",
            duration: "12 min",
            content: `
# The Shift to Containers

Before containers, applications were deployed on physical servers or Virtual Machines (VMs). A VM requires a full guest Operating System (OS), which consumes gigabytes of memory and takes minutes to boot. 

## Docker and Containers

**Docker** revolutionized deployment by introducing lightweight containers. A container packages the application code along with its specific dependencies (libraries, runtime) but **shares the host OS kernel**. 
- Containers boot in milliseconds.
- They ensure environment consistency: "It works on my machine" means it will work in production.

## Kubernetes (K8s)

When you only have three containers, Docker is enough. But modern enterprise architectures have thousands of microservices. How do you ensure they are running, scale them up during high traffic, and restart them if they crash?

**Kubernetes** is an open-source container orchestration system.
- **Pods**: The smallest deployable unit in K8s, usually containing one container.
- **Nodes**: Physical or virtual machines that run the Pods.
- **Control Plane**: The master system that schedules Pods across Nodes and ensures the desired state.

---
> **Key Takeaway**: Docker builds and runs the container. Kubernetes manages and orchestrates thousands of them in a production cluster.
`,
            vocabulary: [
                {
                    en: "Container",
                    es: "Contenedor",
                    definition: "A lightweight, standalone, executable package of software that includes everything needed to run an application."
                },
                {
                    en: "Kernel",
                    es: "Núcleo / Kernel",
                    definition: "The core program of an operating system that manages system resources."
                },
                {
                    en: "Orchestration",
                    es: "Orquestación",
                    definition: "The automated configuration, management, and coordination of computer systems and software."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: Test-Driven Development (TDD) & Automated CI/CD
track.modules[3] = {
    id: "soft-m4",
    title: "Test-Driven Development (TDD) & Automated CI/CD",
    titleES: "Desarrollo Basado en Pruebas (TDD) y CI/CD Automatizado",
    icon: "fa-solid fa-code-branch",
    readings: [
        {
            id: "soft-m4-r1",
            title: "TDD and the Deployment Pipeline",
            duration: "10 min",
            content: `
# TDD and the Deployment Pipeline

High-performing software teams release code to production multiple times a day. This velocity is only possible through strict testing practices and automated deployment pipelines.

## Test-Driven Development (TDD)

TDD is a software development process that relies on a very short development cycle:
1. **Red**: Write a failing test for a new feature.
2. **Green**: Write the minimum amount of code necessary to make the test pass.
3. **Refactor**: Clean up the code while ensuring the test stays green.

TDD ensures that every piece of logic is covered by tests, reducing bugs and allowing developers to refactor with confidence.

## CI/CD (Continuous Integration and Continuous Deployment)

**Continuous Integration (CI)**:
Every time a developer pushes code to a repository (like GitHub), an automated pipeline builds the app and runs all unit tests. If a test fails, the code cannot be merged.

**Continuous Deployment (CD)**:
If the CI phase passes, the CD pipeline automatically deploys the code to a staging or production environment. This eliminates manual release processes, drastically reducing human error.

---
> **Key Takeaway**: Without comprehensive automated tests (TDD), CI/CD pipelines become a mechanism to push bugs into production faster.
`,
            vocabulary: [
                {
                    en: "Refactor",
                    es: "Refactorizar",
                    definition: "Restructuring existing computer code without changing its external behavior."
                },
                {
                    en: "Pipeline",
                    es: "Tubería / Pipeline",
                    definition: "A set of automated processes that allow developers and DevOps to compile, build, and deploy code."
                },
                {
                    en: "Staging Environment",
                    es: "Entorno de pruebas / Staging",
                    definition: "An environment for testing that exactly resembles the production environment."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: Design Patterns & Scalable Microservices Architecture
track.modules[4] = {
    id: "soft-m5",
    title: "Design Patterns & Scalable Microservices Architecture",
    titleES: "Patrones de Diseño y Arquitectura de Microservicios",
    icon: "fa-solid fa-sitemap",
    readings: [
        {
            id: "soft-m5-r1",
            title: "Microservices and Resilience",
            duration: "12 min",
            content: `
# Microservices and Resilience

Unlike a **Monolith**, where all application logic is compiled into a single massive codebase, a **Microservices Architecture** divides the application into small, independent services that communicate over a network.

## Benefits of Microservices
- **Independent Scaling**: If the billing service experiences high load, you can scale it independently without scaling the user profile service.
- **Technology Agnosticism**: Team A can write their service in Go, while Team B uses Python.

## The Cost of Distributed Systems
Microservices introduce network latency and the possibility of partial failures. What happens if Service A calls Service B, but Service B is down?

### The Circuit Breaker Pattern
To prevent cascading failures, architects implement the **Circuit Breaker** pattern. If Service B starts timing out, the Circuit Breaker "opens" and immediately fails any new requests from Service A without waiting. This gives Service B time to recover instead of overwhelming it with retries.

### Event-Driven Architecture
Instead of synchronous HTTP calls (which block and wait), services can communicate asynchronously using an Event Bus (like Apache Kafka). If the email service goes down, the checkout service can still process an order and just drop an "OrderCreated" event into the queue. The email service will process it when it comes back online.

---
> **Key Takeaway**: Microservices solve organizational scaling problems but introduce distributed computing complexity that must be managed with patterns like Circuit Breakers and Event Queues.
`,
            vocabulary: [
                {
                    en: "Monolith",
                    es: "Monolito",
                    definition: "A unified software application that is self-contained and independent from other computing applications."
                },
                {
                    en: "Latency",
                    es: "Latencia",
                    definition: "The delay before a transfer of data begins following an instruction for its transfer."
                },
                {
                    en: "Asynchronous",
                    es: "Asíncrono",
                    definition: "Communication where the sender does not wait for a response before continuing its work."
                }
            ]
        }
    ],
    quiz: []
};

track.status = "full";

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
console.log('✅ Software Dev modules expanded and status set to "full".');
