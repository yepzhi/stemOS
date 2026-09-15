const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Project Management & Entrepreneurship Tracks...');

// ==========================================
// TRACK: PROJECT MANAGEMENT
// ==========================================
const pmTrack = LXP_COURSES["project-management"];
if (pmTrack) {
    console.log("Expanding project-management...");

    // M2: Critical Path Method (CPM), Gantt Charts and Resource Leveling
    pmTrack.modules[1] = {
        id: "pm-m2",
        title: "Critical Path Method (CPM), Gantt Charts and Resource Leveling",
        titleES: "Ruta Crítica (CPM), Diagramas de Gantt y Nivelación de Recursos",
        icon: "fa-solid fa-project-diagram",
        readings: [
            {
                id: "pm-m2-r1",
                title: "Scheduling and The Critical Path",
                duration: "10 min",
                content: `
# Scheduling and The Critical Path

A project manager's primary tool for scheduling is the **Gantt Chart**, a visual timeline that shows when tasks start, when they end, and how they relate to each other.

## Task Dependencies
Most tasks cannot start until another finishes (Finish-to-Start dependency). For example, you cannot pour a concrete foundation until you have dug the hole. 

## The Critical Path Method (CPM)
Because of these dependencies, certain tasks form a chain. The **Critical Path** is the longest sequence of dependent tasks that must be completed on time for the project to finish by its deadline.
- If a task *not* on the critical path is delayed by 2 days, the project deadline does not change.
- If a task *on* the critical path is delayed by 1 hour, the entire project is delayed by 1 hour.

## Resource Leveling
Sometimes the schedule requires 15 engineers on week 3, but you only have 10. **Resource Leveling** is the process of adjusting the schedule (often by delaying non-critical tasks) so that resource demand remains stable and achievable.

---
> **Key Takeaway**: Identifying the Critical Path tells the project manager exactly which tasks require their immediate daily attention, as there is zero margin for error.
`,
                vocabulary: [
                    {
                        en: "Dependency",
                        es: "Dependencia",
                        definition: "A logical relationship where one task relies on the completion or initiation of another."
                    },
                    {
                        en: "Critical Path",
                        es: "Ruta Crítica",
                        definition: "The sequence of stages determining the minimum time needed for an operation."
                    },
                    {
                        en: "Resource Leveling",
                        es: "Nivelación de Recursos",
                        definition: "A technique in project management that resolves resource allocation problems."
                    }
                ]
            }
        ],
        quiz: []
    };

    // M3: Project Risk Management: FMEA Matrix and Mitigation Plans
    pmTrack.modules[2] = {
        id: "pm-m3",
        title: "Project Risk Management: FMEA Matrix and Mitigation Plans",
        titleES: "Gestión de Riesgos: Matriz FMEA y Planes de Mitigación",
        icon: "fa-solid fa-exclamation-triangle",
        readings: [
            {
                id: "pm-m3-r1",
                title: "Anticipating Failure",
                duration: "12 min",
                content: `
# Anticipating Failure

In complex projects, things will go wrong. **Risk Management** is the formal process of identifying what could go wrong *before* it happens, and deciding what to do about it.

## The FMEA Matrix
**Failure Mode and Effects Analysis (FMEA)** is a highly structured method for evaluating risks. Each potential risk is scored on three criteria, usually from 1 to 10:
1. **Severity**: If this happens, how bad is the impact? (10 = catastrophic failure).
2. **Occurrence**: How likely is this to happen? (10 = almost certain).
3. **Detection**: If the problem occurs, how likely are we to notice it before it hits the customer? (10 = we have no way to detect it).

Multiplying these three numbers gives the **Risk Priority Number (RPN)**. The team must address the risks with the highest RPNs first.

## Mitigation Plans
Once a high-priority risk is identified, the project manager creates a **Mitigation Plan** to either lower the probability of occurrence (e.g., buying backup parts) or lower the severity (e.g., buying insurance).

---
> **Key Takeaway**: Good project managers do not hope for the best; they mathematically calculate the worst and plan for it using tools like the FMEA matrix.
`,
                vocabulary: [
                    {
                        en: "Severity",
                        es: "Severidad / Gravedad",
                        definition: "The fact or condition of being severe, serious, or strict."
                    },
                    {
                        en: "Mitigation",
                        es: "Mitigación",
                        definition: "The action of reducing the severity, seriousness, or painfulness of something."
                    },
                    {
                        en: "Detection",
                        es: "Detección",
                        definition: "The action or process of identifying the presence of something concealed."
                    }
                ]
            }
        ],
        quiz: []
    };

    // M4: Stakeholder Communication & Conflict Resolution in Tech Projects
    pmTrack.modules[3] = {
        id: "pm-m4",
        title: "Stakeholder Communication & Conflict Resolution in Tech Projects",
        titleES: "Comunicación con Stakeholders y Resolución de Conflictos",
        icon: "fa-solid fa-users",
        readings: [
            {
                id: "pm-m4-r1",
                title: "Managing People, Not Just Spreadsheets",
                duration: "10 min",
                content: `
# Managing People, Not Just Spreadsheets

A **Stakeholder** is anyone who is affected by the project or can influence it. This includes the client, the CEO, the engineering team, and even local government regulators.

## The Stakeholder Register
Project managers maintain a register mapping out each stakeholder's influence and interest. 
- A powerful client with high interest requires daily updates.
- A low-power department with low interest just needs a monthly newsletter.

## Conflict Resolution
In technical projects, conflicts usually arise over scope, schedule, or resources. When Team A needs the test lab at the same time as Team B, the Project Manager must intervene.
- **Avoidance**: Ignoring the problem (rarely works).
- **Compromise**: Both sides give up something.
- **Collaboration (Win-Win)**: The ideal approach. The PM works with both teams to find a creative solution (e.g., running tests overnight using automation so both teams hit their goals).

---
> **Key Takeaway**: A project rarely fails solely due to technical problems; it fails because of poor communication and misaligned stakeholder expectations.
`,
                vocabulary: [
                    {
                        en: "Stakeholder",
                        es: "Parte interesada / Stakeholder",
                        definition: "A person with an interest or concern in something, especially a business."
                    },
                    {
                        en: "Compromise",
                        es: "Compromiso / Término medio",
                        definition: "An agreement reached by each side making concessions."
                    },
                    {
                        en: "Scope",
                        es: "Alcance",
                        definition: "The combined objectives and requirements necessary to complete a project."
                    }
                ]
            }
        ],
        quiz: []
    };

    // M5: Statement of Work (SOW), SLA Governance and Milestone Sign-Off
    pmTrack.modules[4] = {
        id: "pm-m5",
        title: "Statement of Work (SOW), SLA Governance and Milestone Sign-Off",
        titleES: "Declaración de Trabajo (SOW), SLA y Cierre de Hitos",
        icon: "fa-solid fa-file-signature",
        readings: [
            {
                id: "pm-m5-r1",
                title: "The Contractual Foundation",
                duration: "10 min",
                content: `
# The Contractual Foundation

Before a project begins, the client and the vendor must agree on exactly what is being built. This is legally defined in the **Statement of Work (SOW)**.

## The Statement of Work (SOW)
The SOW details the deliverables, the timeline, the payment schedule, and crucially, what is *out of scope*. If a client asks for a new feature midway through the project, the PM references the SOW to initiate a formal "Change Request," which usually costs the client more money.

## Service Level Agreements (SLA)
For ongoing services (like hosting a website), an **SLA** dictates the acceptable level of performance. For example, an SLA might guarantee 99.9% "uptime." If the website goes down, the vendor owes the client a financial penalty.

## Milestones and Sign-Off
A project is broken into major phases called **Milestones**. When a milestone is reached, the client must formally "sign-off" on it. This proves they accept the work done so far and triggers the next payment invoice.

---
> **Key Takeaway**: The SOW and SLA protect the engineering team from "scope creep"—the slow, unapproved expansion of project requirements by the client.
`,
                vocabulary: [
                    {
                        en: "Scope Creep",
                        es: "Desviación del alcance",
                        definition: "Changes, continuous or uncontrolled growth in a project's scope, at any point after the project begins."
                    },
                    {
                        en: "Deliverable",
                        es: "Entregable",
                        definition: "A thing able to be provided, especially as a product of a development process."
                    },
                    {
                        en: "Milestone",
                        es: "Hito",
                        definition: "An action or event marking a significant change or stage in development."
                    }
                ]
            }
        ],
        quiz: []
    };
    pmTrack.status = "full";
}


// ==========================================
// TRACK: ENTREPRENEURSHIP
// ==========================================
const entTrack = LXP_COURSES["entrepreneurship"];
if (entTrack) {
    console.log("Expanding entrepreneurship...");

    // M2: Venture Capital Financing: SAFE Agreements, Seed Rounds and Cap Tables
    entTrack.modules[1] = {
        id: "ent-m2",
        title: "Venture Capital Financing: SAFE Agreements, Seed Rounds and Cap Tables",
        titleES: "Financiamiento VC: Acuerdos SAFE, Rondas Semilla y Cap Tables",
        icon: "fa-solid fa-chart-pie",
        readings: [
            {
                id: "ent-m2-r1",
                title: "Raising Startup Capital",
                duration: "10 min",
                content: `
# Raising Startup Capital

High-growth tech startups require capital to build their product before they generate revenue. They raise this money from Angel Investors and **Venture Capital (VC)** firms.

## The SAFE Agreement
In the early days (Pre-Seed or Seed stages), pricing the company is difficult. Instead of issuing priced shares, startups use a **SAFE (Simple Agreement for Future Equity)**. 
The investor gives the startup cash today. In return, the SAFE guarantees that the investor will receive shares in the future when the company raises a formal "Series A" priced round.

## The Cap Table (Capitalization Table)
The **Cap Table** is a spreadsheet detailing exactly who owns what percentage of the company. 
- **Founders**: Usually start with 100%.
- **Option Pool**: Shares reserved for early employees (usually 10-15%).
- **Investors**: As the company raises money, they issue new shares to investors, which *dilutes* the ownership percentage of the founders.

---
> **Key Takeaway**: Understanding equity dilution is critical. A founder who raises too much money too early may end up owning only a tiny fraction of the company they built.
`,
                vocabulary: [
                    {
                        en: "Equity",
                        es: "Capital social / Acciones",
                        definition: "The value of the shares issued by a company."
                    },
                    {
                        en: "Dilution",
                        es: "Dilución",
                        definition: "A reduction in the ownership percentage of a share of stock caused by the issuance of new shares."
                    },
                    {
                        en: "Venture Capital",
                        es: "Capital de riesgo",
                        definition: "Capital invested in a project in which there is a substantial element of risk, typically a new or expanding business."
                    }
                ]
            }
        ],
        quiz: []
    };

    // M3: Term Sheets: Pre-Money Valuation, Liquidation Preference and Vesting
    entTrack.modules[2] = {
        id: "ent-m3",
        title: "Term Sheets: Pre-Money Valuation, Liquidation Preference and Vesting",
        titleES: "Term Sheets: Valuación Pre-Money, Preferencia de Liquidación y Vesting",
        icon: "fa-solid fa-file-contract",
        readings: [
            {
                id: "ent-m3-r1",
                title: "Decoding the Term Sheet",
                duration: "12 min",
                content: `
# Decoding the Term Sheet

When a Venture Capital firm wants to invest, they issue a **Term Sheet**, a non-binding document outlining the financial and legal terms of the investment.

## Valuation: Pre-Money vs. Post-Money
- **Pre-Money Valuation**: What the company is worth *before* the investment arrives.
- **Post-Money Valuation**: Pre-Money Valuation + The Investment Amount.
If your Pre-Money valuation is $8M and a VC invests $2M, your Post-Money valuation is $10M. The VC now owns 20% of the company ($2M / $10M).

## Liquidation Preference
This clause protects the investor if the startup sells for a low price. A "1x Liquidation Preference" means that if the company is sold, the VC gets their original investment back *first*, before the founders get a single penny.

## Vesting Schedules
Founders do not get all their shares on day one. Shares are subject to **Vesting**, usually over 4 years with a "1-year cliff." This means if a founder quits after 6 months, they walk away with 0% of the company, protecting the investors and the remaining co-founders.

---
> **Key Takeaway**: The Term Sheet defines who controls the board of directors and who gets paid when the company is sold. It is the most important legal document a founder will sign.
`,
                vocabulary: [
                    {
                        en: "Valuation",
                        es: "Valuación",
                        definition: "An estimation of something's worth, especially one carried out by a professional appraiser."
                    },
                    {
                        en: "Vesting",
                        es: "Vesting (Adquisición de derechos)",
                        definition: "The process of earning the right to stock or stock options over time."
                    },
                    {
                        en: "Liquidation",
                        es: "Liquidación",
                        definition: "The process of bringing a business to an end and distributing its assets to claimants."
                    }
                ]
            }
        ],
        quiz: []
    };

    // M4: Lean Startup: Minimum Viable Product (MVP) and Pivot Strategies
    entTrack.modules[3] = {
        id: "ent-m4",
        title: "Lean Startup: Minimum Viable Product (MVP) and Pivot Strategies",
        titleES: "Lean Startup: Producto Mínimo Viable (MVP) y Estrategias de Pivote",
        icon: "fa-solid fa-lightbulb",
        readings: [
            {
                id: "ent-m4-r1",
                title: "The Build-Measure-Learn Loop",
                duration: "10 min",
                content: `
# The Build-Measure-Learn Loop

Historically, entrepreneurs wrote 50-page business plans, spent a year building the product in secret, and then launched—only to discover nobody wanted it. The **Lean Startup** methodology flips this entirely.

## The Minimum Viable Product (MVP)
Instead of building a perfect product, you build an **MVP**. This is the absolute bare-minimum version of your product required to test your core hypothesis with real customers.
- If you want to start a food delivery app, don't build the app. Put up a simple webpage with a phone number and see if anyone actually calls.

## Pivot or Persevere
Once the MVP is in the hands of customers, you measure the data. 
- If the data proves your hypothesis, you **Persevere** and build the next feature.
- If the data shows customers don't care, you **Pivot**. A pivot is a structured course correction designed to test a new fundamental hypothesis about the product or strategy.

---
> **Key Takeaway**: The goal of a startup is not to execute a business plan; the goal is to search for a scalable, repeatable business model as quickly and cheaply as possible.
`,
                vocabulary: [
                    {
                        en: "Minimum Viable Product",
                        es: "Producto Mínimo Viable (MVP)",
                        definition: "A version of a product with just enough features to be usable by early customers who can then provide feedback."
                    },
                    {
                        en: "Pivot",
                        es: "Pivote",
                        definition: "A fundamental change in a business strategy based on direct market feedback."
                    },
                    {
                        en: "Hypothesis",
                        es: "Hipótesis",
                        definition: "A supposition or proposed explanation made on the basis of limited evidence as a starting point for further investigation."
                    }
                ]
            }
        ],
        quiz: []
    };

    // M5: Intellectual Property: Patents, Trade Secrets and International Licensing
    entTrack.modules[4] = {
        id: "ent-m5",
        title: "Intellectual Property: Patents, Trade Secrets and International Licensing",
        titleES: "Propiedad Intelectual: Patentes, Secretos Comerciales y Licencias",
        icon: "fa-solid fa-gavel",
        readings: [
            {
                id: "ent-m5-r1",
                title: "Protecting Your Innovation",
                duration: "10 min",
                content: `
# Protecting Your Innovation

For a tech startup, the code they write or the hardware they design is their most valuable asset. This is known as **Intellectual Property (IP)**, and it must be legally protected.

## Patents vs. Trade Secrets
- **Patents**: You publicly disclose exactly how your invention works to the government. In exchange, the government grants you a 20-year monopoly to stop anyone else from making, using, or selling it. It is expensive and takes years.
- **Trade Secrets**: You do not tell the government anything. You protect the invention by locking it down (like the Coca-Cola recipe or Google's search algorithm). It lasts forever, but if someone else reverse-engineers it, you have no legal protection.

## Licensing
Once you own a patent, you don't necessarily have to build a factory to make the product. You can **License** the patent to an established manufacturing corporation. They build the product and pay you a **Royalty** (a percentage of sales) for every unit they sell globally.

---
> **Key Takeaway**: A brilliant invention is financially worthless if a larger competitor can legally copy it the day it launches. IP strategy must be built into the company from day one.
`,
                vocabulary: [
                    {
                        en: "Patent",
                        es: "Patente",
                        definition: "A government authority conferring a right or title for a set period, especially the sole right to exclude others from making or selling an invention."
                    },
                    {
                        en: "Royalty",
                        es: "Regalía",
                        definition: "A sum paid to a patentee for the use of a patent or to an author or composer for each copy of a book sold or for each public performance."
                    },
                    {
                        en: "Reverse Engineering",
                        es: "Ingeniería inversa",
                        definition: "The reproduction of another manufacturer's product following detailed examination of its construction or composition."
                    }
                ]
            }
        ],
        quiz: []
    };
    entTrack.status = "full";
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
console.log('✅ Project Management and Entrepreneurship modules expanded and statuses set to "full".');
