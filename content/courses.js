/**
 * stemOS LXP Course Content Database
 * ====================================
 * STEM and Technical Skill — Nearshoring Industry Tracks
 * Target Level: A2+ (CEFR)
 * Format: 10-minute readings with key vocabulary and comprehension activities
 * 
 * Structure:
 *  - Each TRACK maps to a node on the stemOS Skills Graph
 *  - Each track has MODULES (sub-skills)
 *  - Each module has READINGS (~10 min each, 500-800 words)
 *  - Each reading has VOCABULARY (EN-ES glossary) and QUESTIONS
 */

var LXP_COURSES = {

    // =========================================================================
    // TRACK 1: SMART NETWORKS & CYBERSECURITY (FULL CONTENT)
    // =========================================================================
    "cybersecurity": {
        id: "cybersecurity",
        title: "Redes Inteligentes y Ciberseguridad",
        titleEN: "Smart Networks & Cybersecurity",
        level: "A2-B1",
        status: "full", // full content
        totalModules: 10,
        standard: "CONOCER EC1290",
        modules: [
            // -----------------------------------------------------------------
            // MODULE 1: Introduction to Smart Networks
            // -----------------------------------------------------------------
            {
                id: "cyber-m1",
                title: "Introduction to Smart Networks",
                titleES: "Introducción a las Redes Inteligentes",
                icon: "fa-solid fa-network-wired",
                readings: [
                    {
                        id: "cyber-m1-r1",
                        title: "What Is a Network?",
                        duration: "10 min",
                        content: `
> **Industry Certification Note**: The concepts in this module are directly aligned with the **CompTIA Network+ (N10-008)** certification — recognized as the #1 foundational credential for digital infrastructure engineering in global companies (Cisco, AWS, Microsoft).

# What Is a Network?

Every time you send a message on your phone, watch a video online, or check your email, you are using a **network**. But what exactly is a network?

## A Simple Definition

A **computer network** is a group of two or more devices that are **connected** to each other so they can **share information**. These devices can be computers, phones, tablets, printers, or even smart refrigerators.

Think of it like a road system in a city. The roads connect different buildings (devices), and cars (data) travel along these roads to reach their destination.

## Why Do We Need Networks?

Before networks existed, if you wanted to share a file with a colleague, you had to copy it onto a **floppy disk** or USB drive and physically carry it to their computer. This was slow and inconvenient.

Networks solve this problem. They allow devices to:

- **Share files** and documents instantly
- **Share resources** like printers and storage
- **Communicate** through email, chat, and video calls
- **Access the internet** and cloud services

## Key Components of a Network

Every network has some basic **components** (parts):

1. **Devices** (also called **nodes** or **endpoints**): These are the computers, phones, and other equipment connected to the network. Each device has a unique address called an **IP address** (Internet Protocol address).

2. **Cables and Connections**: Devices connect to each other using **cables** (like Ethernet cables) or **wireless signals** (Wi-Fi). The physical or wireless path between devices is called a **link**.

3. **Switches**: A **switch** is a device that connects multiple devices within the same network. When Device A sends data to Device B, the switch makes sure the data goes to the right place.

4. **Routers**: A **router** connects different networks together. For example, your home router connects your home network to the internet. The router decides the best **path** for data to travel.

5. **Servers**: A **server** is a powerful computer that stores data and provides **services** to other devices (called **clients**). When you visit a website, your browser (the client) requests information from a server.

## How Data Travels

When you send a message, your device doesn't send it as one big piece. Instead, the message is divided into small pieces called **packets**. Each packet travels through the network independently and may take different routes. When all packets arrive at the destination, they are **reassembled** into the original message.

This process is governed by rules called **protocols**. The most important protocol on the internet is **TCP/IP** (Transmission Control Protocol / Internet Protocol).

## Smart Networks

A **smart network** is a modern network that uses **software** and **artificial intelligence** to manage itself. Traditional networks require a human administrator to configure every device manually. Smart networks can:

- **Detect problems** automatically (like a broken connection)
- **Optimize performance** by choosing the fastest routes for data
- **Protect against threats** by identifying suspicious activity
- **Adapt** to changes in the number of connected devices

Smart networks are essential for modern technologies like the **Internet of Things (IoT)**, where thousands of sensors and devices need to communicate efficiently.

---

> **Key Takeaway**: A network connects devices so they can share data. Understanding the basic components — devices, switches, routers, servers, and protocols — is the foundation for everything you will learn in this course, directly aligned with **CompTIA Network+** and **ISO 27001** audit standards.
`,
                        vocabulary: [
                            { en: "Network", es: "Red", definition: "A group of connected devices that share information" },
                            { en: "Device / Node", es: "Dispositivo / Nodo", definition: "Any equipment connected to a network (computer, phone, etc.)" },
                            { en: "Switch", es: "Conmutador / Switch", definition: "A device that connects multiple devices in the same network" },
                            { en: "Router", es: "Enrutador / Router", definition: "A device that connects different networks and directs data" },
                            { en: "Server", es: "Servidor", definition: "A computer that stores data and provides services to other devices" },
                            { en: "Client", es: "Cliente", definition: "A device that requests services from a server" },
                            { en: "IP Address", es: "Dirección IP", definition: "A unique number that identifies each device on a network" },
                            { en: "Packet", es: "Paquete", definition: "A small piece of data sent through a network" },
                            { en: "Protocol", es: "Protocolo", definition: "A set of rules for how data is sent and received" },
                            { en: "TCP/IP", es: "TCP/IP", definition: "The main protocol used on the internet" },
                            { en: "Link", es: "Enlace", definition: "The connection path between two devices" },
                            { en: "Wireless", es: "Inalámbrico", definition: "Without cables, using radio signals (Wi-Fi)" }
                        ],
                        questions: [
                            { q: "What is a computer network?", options: ["A single computer working alone", "Two or more devices connected to share information", "A type of software", "A programming language"], answer: 1 },
                            { q: "What does a router do?", options: ["It stores files", "It connects devices in the same network", "It connects different networks together", "It prints documents"], answer: 2 },
                            { q: "What are packets?", options: ["Large files", "Small pieces of data sent through a network", "Types of cables", "Network passwords"], answer: 1 },
                            { q: "What makes a network 'smart'?", options: ["It uses expensive cables", "It uses software and AI to manage itself", "It only works with smartphones", "It has more than 100 devices"], answer: 1 }
                        ]
                    },
                    {
                        id: "cyber-m1-r2",
                        title: "Types of Networks: LAN, WAN, and More",
                        duration: "10 min",
                        content: `
# Types of Networks: LAN, WAN, and More

Not all networks are the same size. Some networks connect devices in a single room, while others connect devices across entire continents. Engineers classify networks by their **geographic scope** — how large an area they cover.

## LAN — Local Area Network

A **LAN** (Local Area Network) is the most common type of network. It connects devices in a **small area**, such as:

- A home (your Wi-Fi network)
- An office
- A school building
- A factory floor

LANs are fast because the devices are close together. Most LANs use **Ethernet cables** or **Wi-Fi** for connections. A typical LAN speed is between **100 Mbps** and **1 Gbps** (Megabits/Gigabits per second).

**Example**: In a semiconductor factory in Hermosillo, the computers on the production floor are connected through a LAN. This allows the quality control team to instantly access data from manufacturing sensors.

## WAN — Wide Area Network

A **WAN** (Wide Area Network) connects devices across a **large geographic area**, such as:

- Different cities
- Different states or countries
- Entire continents

The **internet** is the largest WAN in the world. WANs are generally **slower** than LANs because data has to travel longer distances. Companies use WANs to connect their offices in different cities.

**Example**: A nearshoring company with offices in Monterrey and Phoenix uses a WAN to connect both locations so employees can access the same databases and communication tools.

## MAN — Metropolitan Area Network

A **MAN** (Metropolitan Area Network) is between a LAN and a WAN in size. It covers a **city** or a **metropolitan area**. Internet Service Providers (ISPs) often operate MANs to provide internet service to a city.

**Example**: The public Wi-Fi network covering the downtown area of a city is a MAN.

## PAN — Personal Area Network

A **PAN** (Personal Area Network) is the smallest type. It connects devices that belong to **one person**, usually within a range of a few meters.

**Examples**:
- Your phone connected to your wireless headphones via **Bluetooth**
- Your smartwatch connected to your phone
- Your laptop connected to a wireless keyboard

## Other Network Types

| Type | Name | Range | Example |
|------|------|-------|---------|
| **WLAN** | Wireless LAN | Building | Office Wi-Fi |
| **SAN** | Storage Area Network | Data center | Server storage systems |
| **VPN** | Virtual Private Network | Any distance | Secure remote work connections |

## VPN — A Special Case

A **VPN** (Virtual Private Network) is not a physical network. Instead, it creates a **secure, encrypted tunnel** over an existing network (usually the internet). VPNs are essential for **cybersecurity** because they:

- Protect data from hackers when using public Wi-Fi
- Allow employees to **securely access** company networks from home
- Hide your real location and IP address

In the nearshoring industry, engineers often use VPNs to connect to their company's main servers in the United States while working from offices in Mexico.

## Network Topologies

The way devices are arranged and connected in a network is called its **topology**. Common topologies include:

- **Star**: All devices connect to a central switch. Most office LANs use this.
- **Mesh**: Every device connects to every other device. Very reliable but expensive. Used in smart networks.
- **Bus**: All devices share a single cable. Older technology, rarely used today.
- **Ring**: Devices connect in a circle. Used in some industrial networks.

Modern smart networks often use a **hybrid topology** — a combination of two or more topologies designed for the best performance and reliability.

---

> **Key Takeaway**: Networks are classified by size (PAN → LAN → MAN → WAN). Understanding these categories helps engineers design and manage the right network for each situation.
`,
                        vocabulary: [
                            { en: "LAN (Local Area Network)", es: "Red de Área Local", definition: "A network covering a small area like an office or home" },
                            { en: "WAN (Wide Area Network)", es: "Red de Área Amplia", definition: "A network covering a large geographic area" },
                            { en: "MAN (Metropolitan Area Network)", es: "Red de Área Metropolitana", definition: "A network covering a city or metropolitan area" },
                            { en: "PAN (Personal Area Network)", es: "Red de Área Personal", definition: "A very small network for one person's devices" },
                            { en: "VPN (Virtual Private Network)", es: "Red Privada Virtual", definition: "A secure, encrypted connection over the internet" },
                            { en: "Topology", es: "Topología", definition: "The physical or logical arrangement of devices in a network" },
                            { en: "Bandwidth", es: "Ancho de banda", definition: "The maximum amount of data a network can transfer" },
                            { en: "Mbps / Gbps", es: "Mbps / Gbps", definition: "Megabits/Gigabits per second — units of data transfer speed" },
                            { en: "Ethernet", es: "Ethernet", definition: "A wired networking technology using cables" },
                            { en: "Bluetooth", es: "Bluetooth", definition: "A wireless technology for short-range connections" },
                            { en: "Encrypted", es: "Cifrado / Encriptado", definition: "Data that is coded so only authorized people can read it" },
                            { en: "Nearshoring", es: "Nearshoring", definition: "Outsourcing business operations to a nearby country" }
                        ],
                        questions: [
                            { q: "Which type of network covers the smallest area?", options: ["LAN", "WAN", "PAN", "MAN"], answer: 2 },
                            { q: "What is the internet classified as?", options: ["A LAN", "A PAN", "The largest WAN", "A MAN"], answer: 2 },
                            { q: "What does a VPN do?", options: ["Makes the internet faster", "Creates a secure tunnel over the internet", "Replaces Wi-Fi", "Blocks all network traffic"], answer: 1 },
                            { q: "In a Star topology, all devices connect to:", options: ["Each other directly", "A single cable", "A central switch", "The internet"], answer: 2 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 2: Network Protocols and Communication
            // -----------------------------------------------------------------
            {
                id: "cyber-m2",
                title: "Network Protocols and Communication",
                titleES: "Protocolos de Red y Comunicación",
                icon: "fa-solid fa-server",
                readings: [
                    {
                        id: "cyber-m2-r1",
                        title: "How Devices Communicate: The OSI Model",
                        duration: "10 min",
                        content: `
# How Devices Communicate: The OSI Model

When you send a message from your phone to a friend's computer, the data passes through many different processes before it arrives. Engineers use a model called the **OSI Model** to understand and organize these processes.

## What Is the OSI Model?

The **OSI Model** (Open Systems Interconnection Model) is a **framework** that divides network communication into **seven layers**. Each layer has a specific job. Think of it like sending a letter: you write the message, put it in an envelope, add the address, and give it to the postal service. Each step is a different "layer."

## The Seven Layers (Simplified)

Let's look at each layer from bottom to top:

### Layer 1 — Physical Layer
This is the **hardware** — the actual cables, connectors, and wireless signals that carry data as electrical pulses or radio waves.

**Examples**: Ethernet cables, fiber optic cables, Wi-Fi antennas, USB ports.

**In simple terms**: "The road that carries the cars."

### Layer 2 — Data Link Layer
This layer organizes data into **frames** and ensures reliable delivery between two directly connected devices. It uses **MAC addresses** (Media Access Control) — unique hardware identifiers burned into every network device.

**Examples**: Switches operate at this layer. Your Wi-Fi card has a MAC address.

**In simple terms**: "The traffic lights and lane markings on the road."

### Layer 3 — Network Layer
This layer handles **routing** — finding the best path for data to travel from source to destination across multiple networks. It uses **IP addresses**.

**Examples**: Routers operate at this layer. Every device on the internet has an IP address.

**In simple terms**: "The GPS that finds the best route."

### Layer 4 — Transport Layer
This layer ensures data arrives **completely and in order**. It breaks data into **segments** and numbers them. If a segment is lost, it requests it again.

The two main protocols at this layer are:
- **TCP** (Transmission Control Protocol): Reliable, ensures every packet arrives. Used for web pages, email.
- **UDP** (User Datagram Protocol): Faster but less reliable. Used for video streaming, online gaming.

**In simple terms**: "The delivery person who checks that all packages arrived."

### Layer 5 — Session Layer
This layer manages **sessions** — the conversations between devices. It starts, maintains, and closes connections between applications.

**In simple terms**: "Starting and ending a phone call."

### Layer 6 — Presentation Layer
This layer handles **data formatting**, **encryption**, and **compression**. It translates data into a format the application can understand.

**Examples**: Converting an image from JPEG to PNG, encrypting data with SSL/TLS.

**In simple terms**: "The translator who makes sure both people speak the same language."

### Layer 7 — Application Layer
This is the layer closest to the **user**. It includes the applications and services people interact with directly.

**Examples**: Web browsers (HTTP/HTTPS), email (SMTP), file transfer (FTP).

**In simple terms**: "The actual conversation — the words you say on the phone."

## A Memory Trick

Engineers use this phrase to remember the layers (from Layer 1 to 7):

> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

(Physical → Data Link → Network → Transport → Session → Presentation → Application)

## Why Does This Matter for Cybersecurity?

Different **cyber attacks** target different layers of the OSI model:

| Layer | Attack Example |
|-------|---------------|
| Layer 1 | Cable tapping (physically intercepting data) |
| Layer 2 | MAC spoofing (faking a device's identity) |
| Layer 3 | IP spoofing (faking an IP address) |
| Layer 4 | SYN flood (overwhelming a server with connection requests) |
| Layer 7 | SQL injection, phishing (attacking applications directly) |

Understanding the OSI model helps cybersecurity professionals identify **where** an attack is happening and **how** to defend against it.

---

> **Key Takeaway**: The OSI model organizes communication into 7 layers. Each layer has a specific function, and cybersecurity threats can target any layer.
`,
                        vocabulary: [
                            { en: "OSI Model", es: "Modelo OSI", definition: "A 7-layer framework for understanding network communication" },
                            { en: "Frame", es: "Trama", definition: "A unit of data at the Data Link layer" },
                            { en: "MAC Address", es: "Dirección MAC", definition: "A unique hardware identifier for network devices" },
                            { en: "Routing", es: "Enrutamiento", definition: "The process of finding the best path for data" },
                            { en: "TCP", es: "TCP", definition: "Reliable protocol that ensures all data arrives correctly" },
                            { en: "UDP", es: "UDP", definition: "Fast protocol that doesn't guarantee delivery" },
                            { en: "Session", es: "Sesión", definition: "A connection between two communicating devices" },
                            { en: "Encryption", es: "Cifrado", definition: "The process of converting data into unreadable code for security" },
                            { en: "HTTP / HTTPS", es: "HTTP / HTTPS", definition: "Protocol for web pages. S = Secure (encrypted)" },
                            { en: "Fiber Optic", es: "Fibra Óptica", definition: "Cable that transmits data as light pulses, very fast" },
                            { en: "Spoofing", es: "Suplantación", definition: "Faking an identity (IP, MAC, email) to deceive" }
                        ],
                        questions: [
                            { q: "How many layers does the OSI model have?", options: ["4", "5", "7", "10"], answer: 2 },
                            { q: "Which layer handles routing and IP addresses?", options: ["Physical", "Data Link", "Network", "Transport"], answer: 2 },
                            { q: "What is the difference between TCP and UDP?", options: ["TCP is wireless, UDP is wired", "TCP is reliable, UDP is faster but less reliable", "They are the same", "TCP is for video, UDP is for email"], answer: 1 },
                            { q: "At which layer do web browsers operate?", options: ["Layer 1", "Layer 4", "Layer 5", "Layer 7"], answer: 3 }
                        ]
                    },
                    {
                        id: "cyber-m2-r2",
                        title: "IP Addresses and DNS: The Internet's Address System",
                        duration: "10 min",
                        content: `
# IP Addresses and DNS: The Internet's Address System

Every device connected to a network needs a unique **address** so other devices can find it and send data to it. This address is called an **IP address**.

## What Is an IP Address?

An **IP address** (Internet Protocol address) is a **number** assigned to every device on a network. It works like a postal address for your home — it tells the network exactly where to deliver data.

There are two versions of IP addresses in use today:

### IPv4 (Internet Protocol version 4)

IPv4 addresses look like this: **192.168.1.100**

They are made up of **four numbers** separated by dots. Each number can be from 0 to 255. This gives approximately **4.3 billion** possible addresses.

This sounds like a lot, but with billions of devices worldwide (phones, computers, smart TVs, IoT sensors), we have **run out** of IPv4 addresses.

### IPv6 (Internet Protocol version 6)

IPv6 addresses look like this: **2001:0db8:85a3:0000:0000:8a2e:0370:7334**

IPv6 uses **hexadecimal numbers** (0-9 and a-f) and provides approximately **340 undecillion** (3.4 × 10³⁸) addresses — enough for every grain of sand on Earth to have its own address.

The transition from IPv4 to IPv6 is gradual. Many networks today use both.

## Public vs. Private IP Addresses

Not all IP addresses are equal:

- **Public IP address**: This is your address on the **internet**. It is unique globally. Your Internet Service Provider (ISP) assigns it to your router.

- **Private IP address**: This is your address within your **local network** (LAN). Devices inside the same network use private addresses to communicate with each other.

Common private IP ranges:
- **10.0.0.0** — 10.255.255.255
- **172.16.0.0** — 172.31.255.255
- **192.168.0.0** — 192.168.255.255

Your router uses a technology called **NAT** (Network Address Translation) to translate between private and public addresses. This is why multiple devices in your home can share one public IP address.

## DNS — The Internet's Phone Book

IP addresses are numbers, but humans prefer to use names. Nobody wants to type **142.250.80.46** to visit Google. We prefer to type **google.com**.

The **DNS** (Domain Name System) is the service that translates **domain names** (like google.com) into **IP addresses** (like 142.250.80.46).

### How DNS Works (Step by Step):

1. You type **google.com** in your browser.
2. Your device asks a **DNS resolver** (usually provided by your ISP): "What is the IP address for google.com?"
3. The DNS resolver checks its **cache** (memory). If it has the answer, it responds immediately.
4. If not, the resolver asks the **root DNS servers**, which direct it to the **.com servers**, which direct it to **Google's DNS servers**.
5. Google's DNS server responds with the IP address: **142.250.80.46**
6. Your browser connects to that IP address and loads the page.

This entire process usually takes less than **50 milliseconds**.

## DNS and Cybersecurity

DNS is a critical system, and attackers often target it:

- **DNS Spoofing** (DNS Poisoning): An attacker inserts fake DNS records so when you type "mybank.com," you are redirected to a fake website that steals your password.

- **DNS Tunneling**: Attackers hide malicious data inside DNS queries to bypass firewalls.

- **DDoS on DNS**: Overwhelming DNS servers with millions of requests to make websites unreachable.

**DNSSEC** (DNS Security Extensions) is a security upgrade that digitally signs DNS records to prevent spoofing.

## Static vs. Dynamic IP

- **Static IP**: An address that never changes. Used for servers that need to be always reachable at the same address.
- **Dynamic IP**: An address assigned temporarily by a **DHCP** server (Dynamic Host Configuration Protocol). Most home devices use dynamic IPs.

---

> **Key Takeaway**: IP addresses identify devices on a network. DNS translates human-readable names into IP addresses. Both are fundamental systems that cybersecurity professionals must understand and protect.
`,
                        vocabulary: [
                            { en: "IP Address", es: "Dirección IP", definition: "A unique number identifying a device on a network" },
                            { en: "IPv4", es: "IPv4", definition: "Internet Protocol version 4, uses 32-bit addresses (e.g., 192.168.1.1)" },
                            { en: "IPv6", es: "IPv6", definition: "Internet Protocol version 6, uses 128-bit addresses for more devices" },
                            { en: "DNS", es: "Sistema de Nombres de Dominio", definition: "System that translates domain names to IP addresses" },
                            { en: "Domain Name", es: "Nombre de Dominio", definition: "A human-readable website address (e.g., google.com)" },
                            { en: "NAT", es: "Traducción de Direcciones de Red", definition: "Technology that translates private IPs to public IPs" },
                            { en: "ISP", es: "Proveedor de Servicios de Internet", definition: "Company that provides internet access" },
                            { en: "Cache", es: "Caché", definition: "Stored data for quick future access" },
                            { en: "DHCP", es: "DHCP", definition: "Protocol that automatically assigns IP addresses to devices" },
                            { en: "DNSSEC", es: "DNSSEC", definition: "Security extension for DNS to prevent spoofing" },
                            { en: "Static IP", es: "IP Estática", definition: "A fixed, permanent IP address" },
                            { en: "Dynamic IP", es: "IP Dinámica", definition: "A temporary IP address assigned by DHCP" }
                        ],
                        questions: [
                            { q: "Why was IPv6 created?", options: ["IPv4 is too slow", "IPv4 ran out of addresses", "IPv4 is not secure", "IPv6 uses cables instead of Wi-Fi"], answer: 1 },
                            { q: "What does DNS do?", options: ["Protects against viruses", "Assigns IP addresses automatically", "Translates domain names to IP addresses", "Encrypts network traffic"], answer: 2 },
                            { q: "What is DNS Spoofing?", options: ["Making DNS faster", "Inserting fake DNS records to redirect users", "Blocking DNS completely", "Creating new domain names"], answer: 1 },
                            { q: "What type of IP does a web server typically use?", options: ["Dynamic IP", "Private IP", "Static IP", "No IP"], answer: 2 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 3: Introduction to Cybersecurity
            // -----------------------------------------------------------------
            {
                id: "cyber-m3",
                title: "Introduction to Cybersecurity",
                titleES: "Introducción a la Ciberseguridad",
                icon: "fa-solid fa-shield-halved",
                readings: [
                    {
                        id: "cyber-m3-r1",
                        title: "What Is Cybersecurity? The CIA Triad",
                        duration: "10 min",
                        content: `
# What Is Cybersecurity? The CIA Triad

In a world where companies store sensitive data on computers and send it across networks, protecting that data is critical. This is the job of **cybersecurity**.

## Defining Cybersecurity

**Cybersecurity** is the practice of protecting **systems**, **networks**, and **data** from digital attacks, unauthorized access, and damage. It involves a combination of **technology**, **processes**, and **people**.

Cybersecurity is not just about computers. It includes:
- **Network security**: Protecting the network infrastructure
- **Application security**: Making sure software doesn't have vulnerabilities
- **Information security**: Protecting data from unauthorized access
- **Cloud security**: Securing data stored in cloud platforms
- **Operational security**: Deciding who has access to what

## The CIA Triad

The **CIA Triad** is the most important concept in cybersecurity. It stands for:

### C — Confidentiality

**Confidentiality** means that information is only accessible to the people who are **authorized** to see it. Private data should remain private.

**Examples of confidentiality measures**:
- **Passwords** and multi-factor authentication (MFA)
- **Encryption** — converting data into unreadable code
- **Access controls** — only certain employees can open certain files
- **Classification levels** — labeling data as Public, Internal, Confidential, or Secret

**When confidentiality fails**: A hacker steals the database of a bank and publishes customers' credit card numbers online. This is a **data breach**.

### I — Integrity

**Integrity** means that data is **accurate** and has not been **modified** by unauthorized people. You need to trust that the information you receive is the same information that was sent.

**Examples of integrity measures**:
- **Checksums** and **hash functions** — mathematical calculations that verify data hasn't changed
- **Digital signatures** — prove who created or modified a document
- **Version control** — tracking all changes to files
- **Backups** — copies of data in case the original is corrupted

**When integrity fails**: An attacker modifies a financial report before the CEO reads it, changing the numbers to hide fraud.

### A — Availability

**Availability** means that systems and data are **accessible** when authorized users need them. There is no point in having data if nobody can reach it.

**Examples of availability measures**:
- **Redundancy** — having backup servers ready to take over if the main server fails
- **Load balancing** — distributing traffic across multiple servers
- **Disaster recovery plans** — procedures to restore systems after a catastrophe
- **DDoS protection** — defending against attacks that try to overwhelm servers

**When availability fails**: A hospital's computer system goes down during a DDoS attack, and doctors cannot access patient records.

## Balancing the Triad

The three principles sometimes **conflict** with each other:

- Making data extremely confidential (lots of passwords, encryption) can reduce **availability** (users have to wait longer to access it).
- Making data always available (no passwords, no restrictions) reduces **confidentiality**.
- Adding integrity checks (verifying every piece of data) can slow down the system, reducing **availability**.

Good cybersecurity is about finding the right **balance** for each situation.

## Why Cybersecurity Matters for Nearshoring

In the nearshoring industry, Mexican companies often handle **sensitive data** from U.S. clients:
- Customer personal information
- Financial records
- Proprietary technology and trade secrets
- Medical data (HIPAA compliance)

A security breach can result in:
- **Legal penalties** (millions of dollars in fines)
- **Loss of client trust** (the client may move to a competitor)
- **Operational shutdown** (systems locked by ransomware)

This is why cybersecurity professionals are in such **high demand** in the nearshoring market.

---

> **Key Takeaway**: Cybersecurity protects systems, networks, and data. The CIA Triad (Confidentiality, Integrity, Availability) is the foundation of all security decisions.
`,
                        vocabulary: [
                            { en: "Cybersecurity", es: "Ciberseguridad", definition: "The practice of protecting systems, networks, and data from attacks" },
                            { en: "CIA Triad", es: "Tríada CID", definition: "Confidentiality, Integrity, Availability — the three pillars of security" },
                            { en: "Confidentiality", es: "Confidencialidad", definition: "Ensuring data is only accessible to authorized people" },
                            { en: "Integrity", es: "Integridad", definition: "Ensuring data is accurate and unmodified" },
                            { en: "Availability", es: "Disponibilidad", definition: "Ensuring systems and data are accessible when needed" },
                            { en: "Data Breach", es: "Filtración de Datos", definition: "Unauthorized access to sensitive data" },
                            { en: "Authentication", es: "Autenticación", definition: "Verifying the identity of a user or device" },
                            { en: "Access Control", es: "Control de Acceso", definition: "Rules determining who can access what resources" },
                            { en: "Redundancy", es: "Redundancia", definition: "Backup systems ready to take over if the primary fails" },
                            { en: "DDoS", es: "DDoS", definition: "Distributed Denial of Service — overwhelming a server with traffic" },
                            { en: "Hash Function", es: "Función Hash", definition: "Mathematical calculation that creates a unique fingerprint of data" },
                            { en: "Compliance", es: "Cumplimiento", definition: "Following legal and regulatory requirements" }
                        ],
                        questions: [
                            { q: "What does CIA stand for in cybersecurity?", options: ["Central Intelligence Agency", "Computer Information Architecture", "Confidentiality, Integrity, Availability", "Cybersecurity International Alliance"], answer: 2 },
                            { q: "What is a data breach?", options: ["When a hard drive breaks", "Unauthorized access to sensitive data", "When the internet is slow", "When a password is too long"], answer: 1 },
                            { q: "Which CIA principle is about making sure data hasn't been changed?", options: ["Confidentiality", "Integrity", "Availability", "Authentication"], answer: 1 },
                            { q: "Why is cybersecurity important for nearshoring companies?", options: ["To make websites look better", "Because computers are expensive", "They handle sensitive client data from other countries", "To save electricity"], answer: 2 }
                        ]
                    },
                    {
                        id: "cyber-m3-r2",
                        title: "Common Cyber Threats: Malware, Phishing, and Ransomware",
                        duration: "10 min",
                        content: `
# Common Cyber Threats: Malware, Phishing, and Ransomware

To protect a network, you first need to understand the **threats** you're defending against. In this reading, we'll explore the most common types of cyber attacks that affect businesses and individuals.

## Malware — Malicious Software

**Malware** (short for "malicious software") is any software designed to **harm**, **exploit**, or gain **unauthorized access** to a computer system. Malware comes in many forms:

### Virus
A **virus** is malware that **attaches itself** to a legitimate file or program. When the user opens the infected file, the virus activates and spreads to other files. Like a biological virus, it needs a "host" to survive.

**How it spreads**: Email attachments, infected USB drives, downloaded software.

### Worm
A **worm** is similar to a virus, but it can **spread on its own** across networks without needing a human to open a file. Worms exploit vulnerabilities in operating systems to move from device to device automatically.

**Famous example**: The **WannaCry** worm (2017) infected over 200,000 computers in 150 countries in just a few days.

### Trojan Horse
A **Trojan** (named after the Greek myth) is malware that **disguises itself** as legitimate software. The user thinks they're installing a useful program, but the Trojan secretly installs malicious code.

**Example**: A free "game" that secretly records your keystrokes and sends your passwords to an attacker.

### Spyware
**Spyware** is software that **secretly monitors** your activities — which websites you visit, what you type, even your webcam. It sends this information to the attacker.

### Adware
**Adware** is software that displays **unwanted advertisements** on your computer. While not always dangerous, it slows down your system and can be a gateway for more serious malware.

## Phishing — The Art of Deception

**Phishing** is a **social engineering** attack where the attacker pretends to be a trusted person or organization to trick you into revealing sensitive information.

### How Phishing Works:

1. You receive an email that looks like it's from your bank: "URGENT: Your account has been compromised. Click here to verify your identity."
2. The link takes you to a **fake website** that looks exactly like your bank's real website.
3. You enter your username and password.
4. The attacker now has your **credentials** and can access your real bank account.

### Types of Phishing:

| Type | Description |
|------|-------------|
| **Email Phishing** | Mass emails sent to thousands of people |
| **Spear Phishing** | Targeted at a specific person using personal information |
| **Whaling** | Targeted at high-level executives (the "big fish") |
| **Smishing** | Phishing via SMS text messages |
| **Vishing** | Phishing via voice calls |

### How to Identify Phishing:

- Check the sender's **email address** carefully (misspellings like "g00gle.com")
- Look for **urgency** and **fear tactics** ("Act now or your account will be closed!")
- **Hover over links** before clicking to see the real URL
- Legitimate companies never ask for passwords via email
- Look for **grammar mistakes** and odd formatting

## Ransomware — Your Files for Ransom

**Ransomware** is a type of malware that **encrypts** all your files and demands **payment** (a ransom) to unlock them. If you don't pay, your data is lost — or the attacker threatens to publish it.

### How Ransomware Works:

1. The victim clicks a malicious link or opens an infected attachment.
2. The ransomware silently encrypts all files on the computer (and sometimes the entire network).
3. A message appears: "Your files have been encrypted. Pay 2 Bitcoin ($60,000) within 72 hours or your data will be deleted."
4. The victim must decide whether to **pay** (no guarantee the attacker will unlock the files) or **restore from backups** (if they have them).

### Ransomware in the Real World:

- **Colonial Pipeline** (2021): A ransomware attack shut down the largest fuel pipeline in the U.S. for six days. The company paid $4.4 million in ransom.
- **Costa Rica** (2022): The Conti ransomware group attacked the government of Costa Rica, forcing the country to declare a national emergency.

### How to Protect Against Ransomware:

- Keep **regular backups** of all important data (offline, disconnected from the network)
- Keep all software and systems **up to date** with security patches
- Train employees to **recognize phishing** emails
- Use **endpoint protection** software (advanced antivirus)
- Implement **network segmentation** so ransomware can't spread to the entire network

---

> **Key Takeaway**: Malware, phishing, and ransomware are the most common cyber threats. Understanding how they work is the first step to defending against them.
`,
                        vocabulary: [
                            { en: "Malware", es: "Software Malicioso", definition: "Software designed to harm or exploit computer systems" },
                            { en: "Virus", es: "Virus", definition: "Malware that attaches to files and spreads when opened" },
                            { en: "Worm", es: "Gusano", definition: "Self-replicating malware that spreads across networks automatically" },
                            { en: "Trojan", es: "Troyano", definition: "Malware disguised as legitimate software" },
                            { en: "Phishing", es: "Phishing / Suplantación", definition: "Tricking users into revealing passwords by impersonating trusted entities" },
                            { en: "Social Engineering", es: "Ingeniería Social", definition: "Manipulating people psychologically to obtain information" },
                            { en: "Ransomware", es: "Ransomware / Secuestro de datos", definition: "Malware that encrypts files and demands payment" },
                            { en: "Credentials", es: "Credenciales", definition: "Username and password used to access a system" },
                            { en: "Spear Phishing", es: "Phishing Dirigido", definition: "Phishing targeted at a specific individual" },
                            { en: "Endpoint", es: "Punto Final / Endpoint", definition: "Any device connected to a network (computer, phone)" },
                            { en: "Patch", es: "Parche", definition: "A software update that fixes security vulnerabilities" },
                            { en: "Backup", es: "Respaldo / Copia de seguridad", definition: "A copy of data stored separately for recovery" }
                        ],
                        questions: [
                            { q: "What is the difference between a virus and a worm?", options: ["There is no difference", "A virus needs a host file; a worm spreads on its own", "A worm is more dangerous than a virus", "Viruses only affect phones"], answer: 1 },
                            { q: "What is the goal of phishing?", options: ["To encrypt your files", "To slow down your computer", "To trick you into revealing your passwords", "To install new software"], answer: 2 },
                            { q: "What should you do if you receive a ransomware attack?", options: ["Pay the ransom immediately", "Turn off the computer and never use it again", "Restore from backups and report the incident", "Delete all your emails"], answer: 2 },
                            { q: "Which type of phishing targets high-level executives?", options: ["Smishing", "Vishing", "Whaling", "Email Phishing"], answer: 2 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 4: Network Security Tools
            // -----------------------------------------------------------------
            {
                id: "cyber-m4",
                title: "Network Security Tools and Defenses",
                titleES: "Herramientas y Defensas de Seguridad de Red",
                icon: "fa-solid fa-lock",
                readings: [
                    {
                        id: "cyber-m4-r1",
                        title: "Firewalls, IDS, and Encryption",
                        duration: "10 min",
                        content: `
# Firewalls, IDS, and Encryption

Now that we understand the threats, let's study the **tools** cybersecurity professionals use to defend networks. These are the essential defense mechanisms every network engineer must know.

## Firewalls — The Network's Security Gate

A **firewall** is a security device (hardware or software) that **monitors and controls** network traffic based on predefined security **rules**. It acts as a barrier between a trusted internal network and untrusted external networks (like the internet).

### How a Firewall Works:

The firewall examines each **packet** of data and decides whether to **allow** it through or **block** it based on:

- **Source IP address** — Where is the data coming from?
- **Destination IP address** — Where is it going?
- **Port number** — What service is it using? (Port 80 = HTTP, Port 443 = HTTPS, Port 22 = SSH)
- **Protocol** — Is it TCP, UDP, or something else?

### Types of Firewalls:

| Type | Description | Use Case |
|------|-------------|----------|
| **Packet Filter** | Examines individual packets based on IP/port rules | Basic protection |
| **Stateful Inspection** | Tracks active connections and context | Most modern firewalls |
| **Application Layer** | Inspects the actual content of the data | Blocking specific web content |
| **Next-Gen (NGFW)** | Combines all above + IDS + deep packet inspection | Enterprise networks |

**Analogy**: A firewall is like the security guard at a building entrance. The guard checks your ID (IP address), your purpose (port/protocol), and decides whether to let you in.

## IDS and IPS — Detecting and Preventing Intrusions

While firewalls control access, **IDS** and **IPS** systems focus on detecting suspicious activity:

### IDS — Intrusion Detection System

An IDS **monitors** network traffic and **alerts** administrators when it detects something suspicious. It does NOT block the traffic — it only reports it.

Think of an IDS like a **security camera**. It watches everything and sends an alert if something looks wrong, but a human must respond.

### IPS — Intrusion Prevention System

An IPS does everything an IDS does, but it can also **automatically block** the suspicious traffic. It's a security camera with an automatic door lock.

### Detection Methods:

- **Signature-based**: Compares traffic to a database of known attack patterns. Fast but can't detect new, unknown attacks.
- **Anomaly-based**: Learns what "normal" traffic looks like and flags anything unusual. Can detect new attacks but may produce **false positives** (false alarms).

## Encryption — Locking Data with Math

**Encryption** is the process of converting readable data (**plaintext**) into unreadable code (**ciphertext**) using a mathematical **algorithm** and a **key**. Only someone with the correct key can convert the ciphertext back to plaintext (**decryption**).

### Symmetric Encryption

Both the sender and receiver use the **same key** to encrypt and decrypt data.

- **Fast** and efficient for large amounts of data
- **Problem**: How do you securely share the key with the other person?
- **Example algorithm**: AES (Advanced Encryption Standard) — used to protect top-secret government data

### Asymmetric Encryption (Public-Key Cryptography)

Uses **two different keys**:
- A **public key** (everyone can see it) — used to encrypt data
- A **private key** (kept secret) — used to decrypt data

- **Slower** than symmetric encryption
- **Solves the key-sharing problem** — you can publish your public key openly
- **Example algorithm**: RSA (Rivest–Shamir–Adleman)

### Encryption in Practice:

| Where | Protocol | Type |
|-------|----------|------|
| **Websites** | HTTPS (TLS/SSL) | Asymmetric + Symmetric |
| **Wi-Fi** | WPA3 | Symmetric |
| **Email** | PGP / S/MIME | Asymmetric |
| **VPN** | IPsec / WireGuard | Both |
| **Messaging** | Signal Protocol | Asymmetric |

When you see the **lock icon** 🔒 in your browser, it means the connection is encrypted with TLS — your data is protected between your device and the server.

## Defense in Depth

Good cybersecurity uses **multiple layers** of defense — this strategy is called **Defense in Depth**. No single tool is enough:

1. **Firewall** → Controls what enters the network
2. **IDS/IPS** → Detects suspicious activity
3. **Encryption** → Protects data even if intercepted
4. **Antivirus** → Detects malware on individual devices
5. **Training** → Educates users to recognize threats
6. **Backups** → Ensures data recovery if everything else fails

---

> **Key Takeaway**: Firewalls control access, IDS/IPS detect threats, and encryption protects data. A strong defense uses all three together in a "Defense in Depth" strategy.
`,
                        vocabulary: [
                            { en: "Firewall", es: "Cortafuegos / Firewall", definition: "A device that monitors and filters network traffic" },
                            { en: "IDS", es: "Sistema de Detección de Intrusos", definition: "System that detects and alerts about suspicious activity" },
                            { en: "IPS", es: "Sistema de Prevención de Intrusos", definition: "System that detects AND blocks suspicious activity" },
                            { en: "Encryption", es: "Cifrado", definition: "Converting data into unreadable code using a key" },
                            { en: "Plaintext", es: "Texto Plano", definition: "Readable, unencrypted data" },
                            { en: "Ciphertext", es: "Texto Cifrado", definition: "Encrypted, unreadable data" },
                            { en: "Public Key", es: "Clave Pública", definition: "Key shared openly, used to encrypt data" },
                            { en: "Private Key", es: "Clave Privada", definition: "Secret key used to decrypt data" },
                            { en: "AES", es: "AES", definition: "Advanced Encryption Standard — a symmetric algorithm" },
                            { en: "TLS/SSL", es: "TLS/SSL", definition: "Protocols that encrypt web traffic (HTTPS)" },
                            { en: "False Positive", es: "Falso Positivo", definition: "A security alert triggered by non-malicious activity" },
                            { en: "Defense in Depth", es: "Defensa en Profundidad", definition: "Using multiple layers of security" }
                        ],
                        questions: [
                            { q: "What does a firewall examine to decide whether to allow traffic?", options: ["Only the user's name", "Source/destination IP, port, and protocol", "The computer's brand", "The time of day only"], answer: 1 },
                            { q: "What is the main difference between IDS and IPS?", options: ["IDS is hardware, IPS is software", "IDS only detects; IPS detects and blocks", "IPS is older technology", "There is no difference"], answer: 1 },
                            { q: "In asymmetric encryption, which key is used to encrypt data?", options: ["Private key", "Public key", "Both keys together", "No key is needed"], answer: 1 },
                            { q: "What does the lock icon in your browser mean?", options: ["The website is popular", "The connection is encrypted with TLS", "The website has no viruses", "The website is a government site"], answer: 1 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 5: Security Best Practices
            // -----------------------------------------------------------------
            {
                id: "cyber-m5",
                title: "Security Best Practices in the Workplace",
                titleES: "Mejores Prácticas de Seguridad en el Trabajo",
                icon: "fa-solid fa-user-shield",
                readings: [
                    {
                        id: "cyber-m5-r1",
                        title: "Password Security and Multi-Factor Authentication",
                        duration: "10 min",
                        content: `
# Password Security and Multi-Factor Authentication

The simplest and most common security vulnerability is a **weak password**. In this reading, you'll learn how to create strong passwords and why passwords alone are not enough.

## The Problem with Passwords

According to security research:
- **81%** of data breaches involve weak or stolen passwords
- The most common password in 2025 is still **"123456"**
- The average person has **100+ online accounts** but uses only **5-7 unique passwords**

Hackers use several methods to crack passwords:

### Brute Force Attack
The attacker tries **every possible combination** of characters until finding the right one. A 4-digit PIN has only 10,000 possibilities — a computer can try all of them in seconds.

### Dictionary Attack
The attacker uses a **list of common words and passwords** (like "password," "admin," "love2024") to guess credentials.

### Credential Stuffing
When a website is breached and passwords are leaked, attackers try those same username/password combinations on **other websites** (because people reuse passwords).

## Creating Strong Passwords

A strong password should be:
- **At least 12 characters** long
- A mix of **uppercase** letters, **lowercase** letters, **numbers**, and **special characters** (!@#$%^&*)
- **Not a dictionary word** or common phrase
- **Unique** for each account

### The Passphrase Method

Instead of remembering complex strings like "xK9#mQ2$pL", use a **passphrase** — a sequence of random words that is easy to remember but hard to guess:

> **"Purple-Cactus-Runs-Toward-42-Moons"**

This passphrase is 37 characters long, contains uppercase, lowercase, numbers, special characters, and would take **centuries** to brute-force crack.

### Password Managers

A **password manager** is software that:
- **Generates** strong, unique passwords for every account
- **Stores** all passwords in an encrypted **vault**
- **Auto-fills** login forms
- You only need to remember **one master password**

Popular password managers: Bitwarden, 1Password, LastPass, KeePass.

## Multi-Factor Authentication (MFA)

Even the strongest password can be stolen through phishing. This is why we use **MFA** — requiring **two or more** forms of identification:

### The Three Factors:

| Factor | What It Is | Examples |
|--------|-----------|----------|
| **Something you know** | Knowledge | Password, PIN, security question |
| **Something you have** | Possession | Phone (SMS code), hardware token, authenticator app |
| **Something you are** | Biometrics | Fingerprint, face recognition, iris scan |

### Common MFA Methods:

1. **SMS Code**: A 6-digit code sent to your phone via text message. Better than nothing, but **vulnerable** to SIM-swapping attacks.

2. **Authenticator App**: Apps like Google Authenticator or Microsoft Authenticator generate a **time-based code** (TOTP) that changes every 30 seconds. More secure than SMS.

3. **Hardware Security Key**: A physical device (like YubiKey) that you plug into your computer or tap on your phone. The **most secure** method, virtually immune to phishing.

4. **Biometric**: Your fingerprint, face, or voice. Convenient but cannot be changed if compromised.

### MFA in the Workplace

In a professional environment, especially in nearshoring:
- **Email accounts** should always have MFA enabled
- **VPN access** to client networks requires MFA
- **Cloud platforms** (AWS, Azure, Google Cloud) should use MFA for admin accounts
- **Code repositories** (GitHub, GitLab) should require MFA for all developers

## The Zero Trust Model

Modern cybersecurity follows the **Zero Trust** principle: **"Never trust, always verify."**

In a Zero Trust environment:
- No device or user is automatically trusted, even inside the company network
- Every access request is **verified** with authentication
- Users have the **minimum access** they need to do their job (Principle of Least Privilege)
- All network activity is **logged and monitored**

---

> **Key Takeaway**: Strong passwords and MFA are the first line of defense. Use a password manager, enable MFA everywhere, and follow Zero Trust principles.
`,
                        vocabulary: [
                            { en: "Brute Force Attack", es: "Ataque de Fuerza Bruta", definition: "Trying every possible password combination" },
                            { en: "Dictionary Attack", es: "Ataque de Diccionario", definition: "Using a list of common words to guess passwords" },
                            { en: "Credential Stuffing", es: "Relleno de Credenciales", definition: "Using stolen passwords from one site on other sites" },
                            { en: "Passphrase", es: "Frase de Contraseña", definition: "A long password made of multiple random words" },
                            { en: "Password Manager", es: "Gestor de Contraseñas", definition: "Software that generates and stores strong passwords" },
                            { en: "MFA", es: "Autenticación Multifactor", definition: "Requiring two or more forms of ID to access an account" },
                            { en: "TOTP", es: "TOTP", definition: "Time-based One-Time Password — code that changes every 30 seconds" },
                            { en: "Biometrics", es: "Biometría", definition: "Using physical characteristics (fingerprint, face) for identification" },
                            { en: "Zero Trust", es: "Confianza Cero", definition: "Security model where nothing is automatically trusted" },
                            { en: "Least Privilege", es: "Privilegio Mínimo", definition: "Giving users only the access they need, nothing more" },
                            { en: "Vault", es: "Bóveda", definition: "Encrypted storage for sensitive data like passwords" }
                        ],
                        questions: [
                            { q: "What is the most secure MFA method?", options: ["SMS code", "Security question", "Hardware security key", "Email verification"], answer: 2 },
                            { q: "What does 'Zero Trust' mean?", options: ["Don't trust any software", "Never trust, always verify every access request", "Don't use the internet", "Trust only Microsoft products"], answer: 1 },
                            { q: "Why is 'password123' a bad password?", options: ["It's too long", "It uses numbers", "It's a common word easily guessed in a dictionary attack", "It contains special characters"], answer: 2 },
                            { q: "What does a password manager do?", options: ["Blocks hackers", "Generates, stores, and auto-fills strong unique passwords", "Replaces your keyboard", "Sends passwords to your email"], answer: 1 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 6: Career Paths in Cybersecurity
            // -----------------------------------------------------------------
            {
                id: "cyber-m6",
                title: "Career Paths in Cybersecurity",
                titleES: "Trayectorias Profesionales en Ciberseguridad",
                icon: "fa-solid fa-briefcase",
                readings: [
                    {
                        id: "cyber-m6-r1",
                        title: "Cybersecurity Careers and Certifications",
                        duration: "10 min",
                        content: `
# Cybersecurity Careers and Certifications

Cybersecurity is one of the **fastest-growing** career fields in the world. According to Cybersecurity Ventures, there will be **3.5 million unfilled cybersecurity jobs** globally by 2025. For professionals in Mexico's nearshoring industry, this represents an enormous opportunity.

## Entry-Level Roles

### Security Analyst (SOC Analyst)

A **Security Operations Center (SOC) Analyst** is usually the first cybersecurity role. SOC analysts work in shifts, monitoring security alerts 24/7.

**Responsibilities**:
- Monitor security dashboards and **SIEM** (Security Information and Event Management) tools
- Investigate **alerts** and determine if they are real threats or false positives
- Escalate confirmed incidents to senior analysts
- Write incident reports

**Average salary (Mexico nearshoring)**: $25,000 - $45,000 USD/year
**Required skills**: Networking fundamentals, log analysis, basic scripting

### IT Support / Help Desk (Security Focus)

Many cybersecurity professionals start in **IT support**, helping users with technical problems while learning about security tools and policies.

## Mid-Level Roles

### Penetration Tester (Ethical Hacker)

A **penetration tester** (or "pen tester") is hired by companies to **hack their own systems** — legally. They find vulnerabilities before real attackers do.

**Responsibilities**:
- Conduct **vulnerability assessments** and penetration tests
- Write detailed reports explaining each vulnerability and how to fix it
- Test web applications, networks, and physical security
- Stay up to date with the latest attack techniques

**Average salary**: $50,000 - $90,000 USD/year

### Security Engineer

A **security engineer** designs and implements the security infrastructure — firewalls, IDS/IPS, VPNs, encryption systems.

**Responsibilities**:
- Configure and maintain security tools
- Design secure network architectures
- Respond to and remediate security incidents
- Automate security processes with scripts

**Average salary**: $55,000 - $100,000 USD/year

## Senior / Specialized Roles

### Security Architect
Designs the overall security strategy for an organization. Requires 8-10+ years of experience.

### Incident Response Manager
Leads the team that responds to active cyber attacks. Works under extreme pressure and time constraints.

### Chief Information Security Officer (CISO)
The executive responsible for all cybersecurity in an organization. Reports directly to the CEO.

## Key Certifications

Certifications prove your knowledge and significantly increase your earning potential:

| Certification | Organization | Level | Focus |
|--------------|-------------|-------|-------|
| **CompTIA Security+** | CompTIA | Entry | General security fundamentals |
| **CEH** (Certified Ethical Hacker) | EC-Council | Mid | Penetration testing |
| **CISSP** (Certified Information Systems Security Professional) | ISC² | Senior | Security management & strategy |
| **OSCP** (Offensive Security Certified Professional) | OffSec | Mid-Senior | Hands-on penetration testing |
| **CCNA Security** | Cisco | Entry-Mid | Network security (Cisco devices) |

### Recommended Path for Mexico Nearshoring:

1. **Start**: CompTIA Network+ → CompTIA Security+
2. **Specialize**: CEH or CCNA Security
3. **Advance**: CISSP or OSCP

## Skills in Demand (Nearshoring Market)

Companies hiring cybersecurity professionals for nearshoring operations especially value:

- **English proficiency** (B1-B2 minimum) — most tools, documentation, and client communication are in English
- **Cloud security** (AWS, Azure, Google Cloud)
- **SIEM tools** (Splunk, QRadar, Microsoft Sentinel)
- **Scripting** (Python, Bash, PowerShell)
- **Compliance knowledge** (SOC 2, ISO 27001, HIPAA, GDPR)
- **Incident response** experience

## The Importance of English

In the cybersecurity field, English is not optional — it is **essential**:

- All major **security tools** have English interfaces
- **CVE reports** (Common Vulnerabilities and Exposures) are published in English
- **Incident reports** for U.S. clients must be written in English
- **Certifications** exams are primarily in English
- **Security conferences** (DEF CON, Black Hat, RSA) are conducted in English

This is exactly why you are taking this course — combining cybersecurity knowledge with technical and communication skills makes you a **highly competitive** candidate in the nearshoring market.

---

> **Key Takeaway**: Cybersecurity offers excellent career opportunities, especially in Mexico's nearshoring industry. Start with foundational certifications, develop strong English skills, and specialize in high-demand areas like cloud security and incident response.
`,
                        vocabulary: [
                            { en: "SOC (Security Operations Center)", es: "Centro de Operaciones de Seguridad", definition: "A team/facility that monitors security 24/7" },
                            { en: "SIEM", es: "SIEM", definition: "Software that collects and analyzes security logs from all systems" },
                            { en: "Penetration Testing", es: "Pruebas de Penetración", definition: "Legally hacking systems to find vulnerabilities" },
                            { en: "Vulnerability", es: "Vulnerabilidad", definition: "A weakness in a system that can be exploited" },
                            { en: "Ethical Hacker", es: "Hacker Ético", definition: "A security professional who hacks with permission to find weaknesses" },
                            { en: "Incident Response", es: "Respuesta a Incidentes", definition: "The process of handling a cyber attack" },
                            { en: "CISO", es: "Director de Seguridad de la Información", definition: "Chief Information Security Officer — top security executive" },
                            { en: "Certification", es: "Certificación", definition: "Official proof of professional knowledge and skills" },
                            { en: "Compliance", es: "Cumplimiento Normativo", definition: "Following laws and regulations (SOC 2, HIPAA, GDPR)" },
                            { en: "CVE", es: "CVE", definition: "Common Vulnerabilities and Exposures — public database of known security flaws" },
                            { en: "Remediate", es: "Remediar", definition: "To fix a security problem" }
                        ],
                        questions: [
                            { q: "What is the usual first cybersecurity job?", options: ["CISO", "Security Architect", "SOC Analyst", "Penetration Tester"], answer: 2 },
                            { q: "What does a penetration tester do?", options: ["Builds firewalls", "Legally hacks systems to find vulnerabilities", "Manages passwords", "Designs websites"], answer: 1 },
                            { q: "Which certification is recommended for entry-level professionals?", options: ["CISSP", "OSCP", "CompTIA Security+", "CEH"], answer: 2 },
                            { q: "Why is English important in cybersecurity?", options: ["It's not important", "All security tools and reports are primarily in English", "Only for Americans", "English passwords are stronger"], answer: 1 }
                        ]
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // TRACK 2: SEMICONDUCTORS (FULL CONTENT)
    // =========================================================================
    "semiconductors": {
        id: "semiconductors",
        title: "Semiconductores",
        titleEN: "Semiconductor Manufacturing",
        level: "A2-B1",
        status: "full",
        description: "Master the English vocabulary for semiconductor fabrication — from silicon wafers to FinFET transistors. Aligned with Mexico's nearshoring chip manufacturing boom.",
        descriptionES: "Domina el vocabulario en inglés para la fabricación de semiconductores — desde obleas de silicio hasta transistores FinFET.",
        totalModules: 10,
        estimatedHours: 20,
        prerequisites: ["esp-foundation"],
        standard: "CONOCER EC1290",
        conocer: "EC1290 (Inspección de Procesos de Alta Tecnología)",
        ngss: "HS-PS1-1 / HS-PS3-2 (Matter & Energy in Chips)",
        industry: "TSMC-GCU Manufacturing Specialist Intensive (MSI)",
        modules: [
            {
                id: "semi-m1",
                title: "Introduction to Semiconductors",
                titleES: "Introducción a los Semiconductores",
                icon: "fa-solid fa-microchip",
                readings: [
                    {
                        id: "semi-m1-r1",
                        title: "What Is a Semiconductor?",
                        duration: "10 min",
                        content: `
> **Global Chip Industry Note**: The technical standards and vocabulary in this module are modeled directly from **TSMC (Taiwan Semiconductor Manufacturing Co.)** Fab 18 training specifications and **SEMI (Semiconductor Equipment and Materials International)** certification standards — essential for engineering roles in North American chip nearshoring facilities.

# What Is a Semiconductor?

Every electronic device you use — your phone, your computer, your car — contains **semiconductors**. These tiny components are the foundation of modern technology. In this reading, you'll learn what semiconductors are, why they matter, and why Mexico is becoming a key player in their manufacturing.

## Three Types of Materials

To understand semiconductors, you first need to know the difference between three types of materials:

### 1. Conductors
**Conductors** are materials that allow electricity to flow through them easily. The electrons in these materials are free to move.

**Examples**: Copper, gold, silver, aluminum.
**Uses**: Wires, cables, circuit board traces.

### 2. Insulators
**Insulators** are materials that **block** the flow of electricity. Their electrons are tightly bound and cannot move freely.

**Examples**: Rubber, glass, plastic, ceramic.
**Uses**: Cable coatings, protective covers, circuit board substrates.

### 3. Semiconductors
**Semiconductors** are materials that fall **between** conductors and insulators. Under certain conditions, they can conduct electricity; under other conditions, they cannot. This ability to **switch** between conducting and not conducting is what makes them incredibly useful.

**Examples**: Silicon (Si), Germanium (Ge), Gallium Arsenide (GaAs).

## Silicon — The King of Semiconductors

**Silicon** is the most widely used semiconductor material. Here's why:

- It is the **second most abundant** element on Earth (found in sand and rocks)
- It has a very useful **crystal structure** (diamond cubic)
- Its electrical properties can be precisely **controlled** by adding other elements (a process called **doping**)
- It works well across a wide range of temperatures

**Fun fact**: Silicon Valley in California got its name because of the many companies that manufactured silicon-based microchips there in the 1970s and 1980s.

## What Do Semiconductors Do?

Semiconductors are used to make:

- **Transistors**: Tiny switches that can turn on and off billions of times per second. Modern processors contain **billions** of transistors.
- **Diodes**: Components that allow electricity to flow in **one direction** only. Used in LED lights, power supplies, and solar panels.
- **Integrated Circuits (ICs / Chips)**: Thousands or millions of transistors combined on a single piece of silicon. These are the "brains" of all electronic devices.
- **Sensors**: Devices that detect temperature, light, pressure, or motion.

## The Semiconductor Manufacturing Process (Overview)

Making a semiconductor chip is one of the most complex manufacturing processes in the world. Here is a simplified overview:

1. **Silicon Purification**: Raw silicon is purified to 99.9999999% purity (called "nine nines").
2. **Crystal Growth**: The purified silicon is grown into a large **single crystal** called an **ingot**.
3. **Wafer Slicing**: The ingot is sliced into thin round discs called **wafers** (typically 300mm in diameter).
4. **Photolithography**: Patterns are projected onto the wafer using **ultraviolet light** to create circuits.
5. **Etching**: Unwanted material is removed chemically or with plasma.
6. **Doping**: Specific areas of the wafer are treated with other elements to change their electrical properties.
7. **Deposition**: Thin layers of different materials are deposited onto the wafer.
8. **Testing**: Each chip on the wafer is tested for defects.
9. **Packaging**: Working chips are cut from the wafer and enclosed in protective packages.

Steps 4-7 are repeated **dozens of times** to build up the many layers of a modern chip. The entire process can take **3-4 months** from start to finish.

## Mexico and the Semiconductor Industry

Mexico is becoming a critical location for semiconductor manufacturing due to:

- **Geographic proximity** to the U.S. (where most chip companies are headquartered)
- A **large, young workforce** with engineering talent
- **USMCA** trade agreement benefits
- Lower costs compared to the U.S. while maintaining quality standards
- Existing automotive and electronics manufacturing infrastructure

Companies like **Intel**, **Texas Instruments**, and **Skyworks** already have operations in Mexico. The nearshoring trend is accelerating investment in semiconductor packaging, testing, and eventually fabrication facilities in cities like **Guadalajara**, **Monterrey**, and **Chihuahua**.

---

> **Key Takeaway**: Semiconductors are materials between conductors and insulators. Silicon is the most important semiconductor. Mexico's nearshoring boom is creating thousands of jobs in semiconductor manufacturing.
`,
                        vocabulary: [
                            { en: "Semiconductor", es: "Semiconductor", definition: "A material that can conduct or block electricity depending on conditions" },
                            { en: "Conductor", es: "Conductor", definition: "A material that allows electricity to flow easily (e.g., copper)" },
                            { en: "Insulator", es: "Aislante", definition: "A material that blocks electricity (e.g., rubber)" },
                            { en: "Silicon (Si)", es: "Silicio", definition: "The most common semiconductor material" },
                            { en: "Transistor", es: "Transistor", definition: "A tiny electronic switch — the building block of all chips" },
                            { en: "Diode", es: "Diodo", definition: "A component that allows current in one direction only" },
                            { en: "Integrated Circuit (IC)", es: "Circuito Integrado", definition: "A chip containing millions of transistors" },
                            { en: "Wafer", es: "Oblea", definition: "A thin disc of silicon used to make chips" },
                            { en: "Ingot", es: "Lingote", definition: "A large cylindrical crystal of purified silicon" },
                            { en: "Doping", es: "Dopaje", definition: "Adding impurities to silicon to change its electrical properties" },
                            { en: "Photolithography", es: "Fotolitografía", definition: "Using light to transfer circuit patterns onto a wafer" },
                            { en: "Etching", es: "Grabado", definition: "Removing material from a wafer using chemicals or plasma" }
                        ],
                        questions: [
                            { q: "Why are semiconductors special?", options: ["They are always conductors", "They can switch between conducting and not conducting", "They are the cheapest material", "They glow in the dark"], answer: 1 },
                            { q: "What is silicon?", options: ["A type of plastic", "The most widely used semiconductor material", "A conductor", "An insulator"], answer: 1 },
                            { q: "What is a wafer?", options: ["A type of chip packaging", "A thin disc of silicon where chips are made", "A testing tool", "A type of wire"], answer: 1 },
                            { q: "Why is Mexico important for the semiconductor industry?", options: ["Mexico invented semiconductors", "It is close to the U.S. with a large engineering workforce", "Silicon is only found in Mexico", "Mexico has the most advanced chip factories"], answer: 1 }
                        ]
                    },
                    {
                        id: "semi-m1-r2",
                        title: "Doping: N-Type and P-Type Semiconductors",
                        duration: "10 min",
                        content: `
# Doping: N-Type and P-Type Semiconductors

Pure silicon is not very useful for electronics because it doesn't conduct electricity well. To make silicon useful, engineers add tiny amounts of other elements — a process called **doping**. This is one of the most fundamental concepts in semiconductor manufacturing.

## Why Doping Is Necessary

A silicon atom has **4 electrons** in its outer shell. In a pure silicon crystal, each atom shares its 4 electrons with 4 neighboring atoms, forming strong **covalent bonds**. This creates a stable structure with very few free electrons, so pure silicon is a poor conductor.

To make silicon conduct electricity, we need to either:
- **Add extra electrons** (negative charge carriers) → **N-Type**
- **Create missing electrons ("holes")** (positive charge carriers) → **P-Type**

## N-Type Semiconductor

To create an **N-Type** ("Negative Type") semiconductor, we add atoms with **5 electrons** in their outer shell, such as:
- **Phosphorus (P)**
- **Arsenic (As)**
- **Antimony (Sb)**

When a phosphorus atom replaces a silicon atom in the crystal, 4 of its electrons form bonds with neighboring silicon atoms. The **5th electron** is free to move — it becomes a **charge carrier**.

Since these free electrons carry a **negative** charge, we call this **N-Type** semiconductor.

The added element (phosphorus) is called a **donor** because it "donates" an extra electron.

## P-Type Semiconductor

To create a **P-Type** ("Positive Type") semiconductor, we add atoms with only **3 electrons** in their outer shell, such as:
- **Boron (B)**
- **Gallium (Ga)**
- **Indium (In)**

When a boron atom replaces a silicon atom, it can only form 3 of the 4 needed bonds. The missing bond creates a **hole** — an empty space where an electron could be. This hole acts as a **positive charge carrier** because electrons from neighboring atoms can "jump" into the hole, effectively making the hole move through the crystal.

The added element (boron) is called an **acceptor** because it "accepts" electrons to fill its holes.

## The P-N Junction — Where the Magic Happens

When you place P-Type silicon next to N-Type silicon, you create a **P-N Junction** — the most important structure in all of electronics.

At the junction:
1. Free electrons from the N-side **diffuse** (spread) across to the P-side
2. Holes from the P-side diffuse to the N-side
3. This creates a **depletion zone** — a thin region with no free charge carriers
4. The depletion zone creates an **electric field** that prevents further diffusion

### Forward Bias (Conducting):
If you connect a battery with the **positive terminal** to the P-side and **negative terminal** to the N-side, the electric field is reduced, and current flows through the junction. The diode is **ON**.

### Reverse Bias (Blocking):
If you reverse the battery connections, the electric field increases, and no current flows. The diode is **OFF**.

This ability to act as a one-way switch for electricity is what makes the P-N junction so useful. It is the basis of:

- **Diodes** — one-way valves for electricity
- **LEDs** (Light Emitting Diodes) — P-N junctions that produce light
- **Solar cells** — P-N junctions that convert light into electricity
- **Transistors** — combinations of P-N junctions that act as switches and amplifiers

## Doping in the Factory

In a semiconductor fabrication plant (**fab**), doping is done using two main methods:

### Ion Implantation
A machine called an **ion implanter** shoots dopant atoms at the silicon wafer at very high speed. The atoms embed themselves into the silicon surface. This method offers **precise control** over the depth and concentration of doping.

### Diffusion
The wafer is heated in a **furnace** (800-1200°C) in the presence of dopant gases. The dopant atoms slowly diffuse into the silicon. This method is simpler but less precise than ion implantation.

## Key Numbers

| Property | Value |
|----------|-------|
| Dopant concentration (typical) | 1 atom per 10 million silicon atoms |
| Silicon atoms in 1 cm³ | ~5 × 10²² |
| Dopant atoms in 1 cm³ | ~5 × 10¹⁵ |
| Depletion zone width | ~0.1 to 1 micrometer |

Even though we add only a **tiny** amount of dopant, it dramatically changes the electrical behavior of silicon.

---

> **Key Takeaway**: Doping adds specific impurities to silicon to create N-Type (extra electrons) or P-Type (holes). The P-N junction created where they meet is the foundation of all electronic devices.
`,
                        vocabulary: [
                            { en: "Doping", es: "Dopaje", definition: "Adding impurity atoms to silicon to control its conductivity" },
                            { en: "N-Type", es: "Tipo N", definition: "Silicon doped with atoms that provide extra electrons" },
                            { en: "P-Type", es: "Tipo P", definition: "Silicon doped with atoms that create holes" },
                            { en: "Electron", es: "Electrón", definition: "A negatively charged subatomic particle" },
                            { en: "Hole", es: "Hueco / Laguna", definition: "An empty space where an electron could be — acts as positive charge" },
                            { en: "Covalent Bond", es: "Enlace Covalente", definition: "A chemical bond formed by sharing electrons" },
                            { en: "Donor", es: "Donador", definition: "An atom (like phosphorus) that donates an extra electron" },
                            { en: "Acceptor", es: "Aceptor", definition: "An atom (like boron) that accepts electrons" },
                            { en: "P-N Junction", es: "Unión P-N", definition: "The boundary between P-Type and N-Type silicon" },
                            { en: "Depletion Zone", es: "Zona de Agotamiento", definition: "The region at a P-N junction with no free carriers" },
                            { en: "Forward Bias", es: "Polarización Directa", definition: "Voltage applied to make a diode conduct" },
                            { en: "Ion Implantation", es: "Implantación de Iones", definition: "Shooting dopant atoms into silicon at high speed" },
                            { en: "Fab (Fabrication Plant)", es: "Fábrica / Planta de Fabricación", definition: "A factory where semiconductor chips are manufactured" }
                        ],
                        questions: [
                            { q: "What does doping do to silicon?", options: ["Makes it transparent", "Changes its electrical properties by adding impurities", "Makes it heavier", "Changes its color"], answer: 1 },
                            { q: "Which element is commonly used for N-Type doping?", options: ["Boron", "Oxygen", "Phosphorus", "Carbon"], answer: 2 },
                            { q: "What is a 'hole' in P-Type silicon?", options: ["A physical hole in the material", "An empty space acting as a positive charge carrier", "A manufacturing defect", "A type of electron"], answer: 1 },
                            { q: "What happens at a P-N junction under forward bias?", options: ["No current flows", "Current flows through the junction", "The silicon melts", "The junction breaks"], answer: 1 }
                        ]
                    }
                ]
            },

            // ----- SEMICONDUCTORS MODULES 2-6 (SKELETON STRUCTURE) -----
            {
                id: "semi-m2",
                title: "Transistors: The Building Blocks of Chips",
                titleES: "Transistores: Los Bloques de Construcción de Chips",
                icon: "fa-solid fa-cubes",
                readings: [
                    {
                        id: "semi-m2-r1",
                        title: "From Diodes to Transistors: The MOSFET",
                        duration: "10 min",
                        content: `
# From Diodes to Transistors: The MOSFET

The **transistor** is the most important invention of the 20th century. Every digital device — from smartphones to supercomputers — works because of transistors. In this reading, you'll learn how a transistor works and why the MOSFET is the most important type.

## What Is a Transistor?

A **transistor** is an electronic component that can act as both a **switch** and an **amplifier**. As a switch, it can be either ON (conducting electricity) or OFF (blocking electricity). This ON/OFF behavior is the basis of all digital computing — every 1 and 0 in your computer is represented by a transistor that is either on or off.

## The MOSFET

The **MOSFET** (Metal-Oxide-Semiconductor Field-Effect Transistor) is the most widely used type of transistor. Billions of MOSFETs are manufactured every day.

A MOSFET has three terminals:
- **Gate**: Controls whether the transistor is ON or OFF (like a light switch)
- **Source**: Where current enters the transistor
- **Drain**: Where current exits the transistor

### How It Works:

Between the source and drain, there is a **channel** made of semiconductor material. When no voltage is applied to the gate, the channel does not conduct — the transistor is **OFF**.

When you apply a voltage to the gate, an **electric field** forms through the thin oxide layer. This field attracts charge carriers into the channel, creating a conductive path between source and drain — the transistor is **ON**.

The "Metal-Oxide-Semiconductor" in the name refers to the structure:
- **Metal** (or polysilicon) gate electrode
- **Oxide** insulating layer (typically silicon dioxide, SiO₂)
- **Semiconductor** channel (silicon)

## Types of MOSFETs:

| Type | Channel | Turns ON when... |
|------|---------|-----------------|
| **NMOS** | N-Type | Positive voltage at gate |
| **PMOS** | P-Type | Negative voltage at gate |

### CMOS — Complementary MOS

Modern chips use **CMOS** technology, which combines both NMOS and PMOS transistors on the same chip. CMOS is used because:
- Very **low power consumption** (uses power only when switching)
- **High noise immunity** (resistant to electrical interference)
- **Scalable** — can be made very small

Almost every processor, memory chip, and digital circuit made today uses CMOS.

## Moore's Law and Scaling

In 1965, Intel co-founder **Gordon Moore** predicted that the number of transistors on a chip would **double approximately every two years** while the cost per transistor would decrease. This prediction, known as **Moore's Law**, has held true for over 50 years.

| Year | Process Node | Transistors (typical CPU) |
|------|-------------|--------------------------|
| 2000 | 180 nm | ~42 million |
| 2010 | 32 nm | ~1.2 billion |
| 2020 | 7 nm | ~10 billion |
| 2025 | 3 nm | ~50+ billion |

The "nm" (nanometer) refers to the **process node** — roughly the size of the smallest features on the chip. For reference, a human hair is about 80,000 nm wide.

## FinFET: The Modern Transistor

As transistors got smaller than ~20 nm, the traditional flat (planar) MOSFET design stopped working well. Electrons would **leak** through the thin channel even when the transistor was supposed to be OFF.

The solution was the **FinFET** (Fin Field-Effect Transistor), invented by Chenming Hu at UC Berkeley. Instead of a flat channel, the FinFET has a **vertical fin** of silicon that the gate wraps around on three sides. This gives the gate much better control over the channel, reducing leakage.

**Key benefits of FinFET**:
- **Lower leakage current** (less wasted power)
- **Faster switching speed**
- **Better performance at smaller sizes**
- Used in all modern processors (Apple A-series, Intel Core, AMD Ryzen, Qualcomm Snapdragon)

## What's Next: GAA (Gate-All-Around)

The next evolution beyond FinFET is the **GAA transistor** (Gate-All-Around), where the gate completely surrounds the channel on **all four sides**. Samsung and Intel are beginning to use GAA in their latest manufacturing processes (2nm and below).

---

> **Key Takeaway**: Transistors are switches that form the basis of all computing. The MOSFET is the most common type, and FinFET is the modern 3D version used in today's most advanced chips.
`,
                        vocabulary: [
                            { en: "Transistor", es: "Transistor", definition: "An electronic switch/amplifier — the building block of all chips" },
                            { en: "MOSFET", es: "MOSFET", definition: "Metal-Oxide-Semiconductor Field-Effect Transistor — the most common type" },
                            { en: "Gate", es: "Compuerta", definition: "The terminal that controls ON/OFF state in a transistor" },
                            { en: "Source", es: "Fuente", definition: "Where current enters a transistor" },
                            { en: "Drain", es: "Drenaje", definition: "Where current exits a transistor" },
                            { en: "Channel", es: "Canal", definition: "The conductive path between source and drain" },
                            { en: "CMOS", es: "CMOS", definition: "Complementary MOS — technology using both NMOS and PMOS" },
                            { en: "Moore's Law", es: "Ley de Moore", definition: "Transistor count doubles roughly every two years" },
                            { en: "Process Node", es: "Nodo de Proceso", definition: "The size of smallest features on a chip (measured in nm)" },
                            { en: "FinFET", es: "FinFET", definition: "3D transistor with a vertical fin for better gate control" },
                            { en: "GAA", es: "GAA (Compuerta Envolvente)", definition: "Gate-All-Around — next-gen transistor with gate on all sides" },
                            { en: "Leakage Current", es: "Corriente de Fuga", definition: "Unwanted current flow when a transistor should be OFF" }
                        ],
                        questions: [
                            { q: "What are the three terminals of a MOSFET?", options: ["Input, Output, Power", "Gate, Source, Drain", "Anode, Cathode, Base", "Positive, Negative, Ground"], answer: 1 },
                            { q: "What does CMOS combine?", options: ["Two types of cables", "NMOS and PMOS transistors", "Copper and silicon", "Digital and analog signals"], answer: 1 },
                            { q: "Why was FinFET invented?", options: ["To make chips cheaper", "To reduce leakage current at small sizes", "To use less silicon", "To make transistors bigger"], answer: 1 },
                            { q: "According to Moore's Law, transistor count doubles every:", options: ["6 months", "1 year", "~2 years", "10 years"], answer: 2 }
                        ]
                    }
                ]
            },

            // Remaining semiconductor modules as skeletons with titles
            {
                id: "semi-m3",
                title: "Photolithography: Printing Circuits with Light",
                titleES: "Fotolitografía: Imprimiendo Circuitos con Luz",
                icon: "fa-solid fa-sun",
                readings: [
                    {
                        id: "semi-m3-r1",
                        title: "How Photolithography Works",
                        duration: "10 min",
                        content: `
# How Photolithography Works

**Photolithography** (fotolitografía) is the process of using light to transfer geometric patterns from a photomask to a light-sensitive chemical called a **photoresist** on the wafer. It is like printing a photograph, but on a microscopic scale. This is the key step that defines the size of the transistors on a chip.

## The Step-by-Step Lithography Process

To build a pattern on the silicon wafer, engineers follow these steps:

1. **Surface Preparation & Cleaning**: The wafer is cleaned chemically to remove contaminants, and dehydrated at high temperatures.
2. **Photoresist Coating (Recubrimiento de fotorresistencia)**: A liquid photoresist is applied to the wafer. The wafer is spun at high speed (1000 to 5000 RPM) to spread the chemical into a uniform, microscopically thin layer. This is called **spin coating**.
3. **Soft Bake (Pre-horneado)**: The wafer is heated gently to evaporate the solvents and solidify the photoresist.
4. **Alignment and UV Exposure (Alineación y exposición)**: A high-precision machine aligns a **photomask** (a template containing the circuit pattern) over the wafer. **Ultraviolet (UV) light** is projected through the mask, hitting the photoresist in specific areas.
5. **Development (Revelado)**: The wafer is rinsed with a developer solution. Depending on the type of photoresist, the exposed or unexposed parts dissolve:
   - **Positive Photoresist**: The areas exposed to light become soluble and dissolve. The unexposed areas remain. (This is the most common type used).
   - **Negative Photoresist**: The areas exposed to light become insoluble and remain. The unexposed areas dissolve.
6. **Hard Bake (Horneado final)**: The wafer is baked again to harden the remaining photoresist pattern before etching or doping begins.

## The Importance of Alignment: Overlay Accuracy

A modern microchip contains up to 80 separate layers. Each layer must align perfectly with the layers below it. The precision of this alignment is called **overlay accuracy** (precisión de superposición). If a layer is misaligned by even a fraction of a nanometer, the entire chip will fail.

> **Analogy**: Imagine drawing 80 different layers of a house on separate sheets of clear paper. If you don't stack them perfectly, the doors won't line up with the walls, and the roof will float in the air.
`,
                        vocabulary: [
                            { en: "Photoresist", es: "Fotorresistencia / Resina fotosensible", definition: "A light-sensitive chemical polymer coated on the wafer" },
                            { en: "Photomask", es: "Fotomáscara / Retícula", definition: "A glass plate with metal patterns used to block UV light" },
                            { en: "UV Exposure", es: "Exposición ultravioleta", definition: "Shining UV light through a mask onto a photoresist" },
                            { en: "Development", es: "Revelado", definition: "Rinsing the wafer in chemical developer to reveal the pattern" },
                            { en: "Spin Coating", es: "Recubrimiento por centrifugado", definition: "Method to apply liquid photoresist uniformly by spinning the wafer" },
                            { en: "Overlay Accuracy", es: "Precisión de superposición", definition: "How precisely layers of a chip align on top of each other" }
                        ],
                        questions: [
                            { q: "What does positive photoresist do when exposed to UV light?", options: ["It becomes soluble and dissolves in developer", "It becomes harder and insoluble", "It changes color to yellow", "It converts into pure silicon"], answer: 0 },
                            { q: "What is the purpose of spin coating?", options: ["To clean the wafer from dust", "To spread liquid photoresist into a uniform, thin layer", "To cut the wafer into chips", "To bake the wafer at high speed"], answer: 1 },
                            { q: "Which term refers to the alignment precision between different chip layers?", options: ["Wavelength accuracy", "Spin coating accuracy", "Overlay accuracy", "Chemical solubility"], answer: 2 },
                            { q: "What is a photomask?", options: ["A protective cover worn by fab workers", "A tool to measure wafer thickness", "A template plate containing the circuit pattern", "A type of chemical developer"], answer: 2 }
                        ]
                    },
                    {
                        id: "semi-m3-r2",
                        title: "EUV: Extreme Ultraviolet Lithography",
                        duration: "10 min",
                        content: `
# EUV: Extreme Ultraviolet Lithography

As transistors shrunk below 10 nanometers, traditional ultraviolet light (with a wavelength of 193 nm) became too thick to print such small features. To continue scaling down, the industry developed **EUV (Extreme Ultraviolet) lithography** (litografía ultravioleta extrema).

## The Physics of EUV

EUV light has a wavelength of only **13.5 nanometers** (nanómetros). This extremely short wavelength allows engineers to print features as small as 2 or 3 nanometers. However, working with EUV light is incredibly difficult because of its physical properties:

1. **Air Absorbs EUV**: EUV light is absorbed by almost all matter, including air. Therefore, the entire lithography machine must operate under a high **vacuum** (vacío).
2. **Glass Lenses Don't Work**: Traditional glass lenses absorb EUV light instead of bending it. Instead, EUV machines use high-precision **reflective mirrors** (espejos reflectores) coated with alternating layers of silicon and molybdenum to guide the light.
3. **Generating the Light**: To create EUV light, a high-power CO₂ laser fires 50,000 times per second at tiny falling droplets of molten **tin** (estaño). The laser blasts the tin into a hot **plasma** that emits 13.5 nm light.

## ASML: The Monopoly

EUV technology is so complex that only one company in the world is capable of manufacturing EUV lithography machines: **ASML**, based in Veldhoven, Netherlands.

A single ASML EUV machine:
- Contains over 100,000 parts and 3,000 cables.
- Costs between **$150 million and $350 million USD** depending on the model (e.g., High-NA EUV).
- Requires 4 Boeing 747 cargo planes to ship to a fab.
- Requires dozens of specialized engineers to install and maintain.

Without ASML's EUV machines, companies like TSMC, Samsung, and Intel could not manufacture the 3-nanometer and 2-nanometer chips that power today's leading smartphones, AI servers, and graphics processors.
`,
                        vocabulary: [
                            { en: "EUV Lithography", es: "Litografía ultravioleta extrema", definition: "Next-gen lithography using 13.5nm wavelength light" },
                            { en: "Wavelength", es: "Longitud de onda", definition: "The distance between successive crests of a wave of light" },
                            { en: "Vacuum", es: "Vacío", definition: "A space entirely devoid of matter/air" },
                            { en: "Reflective Mirror", es: "Espejo reflector", definition: "Ultra-smooth mirror used to redirect light instead of lenses" },
                            { en: "Tin", es: "Estaño", definition: "Metal melted and vaporized by laser to produce EUV light" },
                            { en: "High-NA EUV", es: "EUV de alta apertura numérica", definition: "Advanced EUV systems using larger angles to print smaller sizes" }
                        ],
                        questions: [
                            { q: "What is the wavelength of Extreme Ultraviolet (EUV) light?", options: ["193 nm", "13.5 nm", "3 nm", "1.2 nm"], answer: 1 },
                            { q: "Why must EUV systems operate under a vacuum?", options: ["To prevent the silicon from burning", "Because air molecules absorb EUV light", "To cool down the lasers", "To speed up the spin coating"], answer: 1 },
                            { q: "What does the ASML EUV system use instead of traditional glass lenses?", options: ["Fiber optic cables", "Prisms made of quartz", "Highly reflective mirrors", "Water droplets"], answer: 2 },
                            { q: "Which company is the sole manufacturer of EUV lithography systems?", options: ["TSMC", "ASML", "Intel", "NVIDIA"], answer: 1 }
                        ]
                    }
                ]
            },
            {
                id: "semi-m4",
                title: "Etching, Deposition, and Clean Rooms",
                titleES: "Grabado, Deposición y Salas Limpias",
                icon: "fa-solid fa-flask",
                readings: [
                    {
                        id: "semi-m4-r1",
                        title: "The Clean Room Environment",
                        duration: "10 min",
                        content: `
# The Clean Room Environment

A semiconductor fabrication plant (fab) is home to the **cleanroom** (sala limpia) — one of the cleanest environments on Earth. In a cleanroom, the air is filtered constantly to control the concentration of airborne particles, temperature, humidity, and vibration.

## Why Cleanrooms Are Crucial

A modern transistor is thousands of times smaller than a grain of sand. A single microscopic dust particle, hair, or skin cell landing on a wafer can block light during photolithography, short-circuit metal lines, or cause a transistor to fail. 

The industry measures cleanliness using classes:
- **Class 100**: Less than 100 particles (larger than 0.5 microns) per cubic foot of air.
- **Class 10**: Less than 10 particles per cubic foot.
- **Class 1 (Fab Floor)**: Less than 1 particle per cubic foot. (For comparison, normal outdoor air contains about 35 million particles per cubic foot!).

## The Gown Room and Gowning Protocol

Humans are the biggest source of contamination in a fab. Skin flakes, hair, dust from clothes, and sweat are constantly shedding. To enter the cleanroom, workers must follow a strict **gowning protocol** in the **gown room** (sala de vestimenta):

1. **Shoe Cleaning**: Workers pass through shoe scrubbers and put on shoe covers.
2. **Hair & Face Coverings**: Wearing a hairnet and face mask.
3. **Bunny Suit (Traje especial)**: A full-body, anti-static suit that covers the worker from head to toe.
4. **Booties & Gloves**: Wearing specialized non-dusting boots and double-layer nitrile gloves.
5. **Air Shower (Ducha de aire)**: Before walking through the cleanroom doors, workers stand in an air shower cabinet that blows high-velocity filtered air to strip away any remaining dust from the outside of their bunny suits.

Workers also use specialized **cleanroom paper** and non-shedding pens. Traditional pencils are banned because graphite flakes contaminate the air.
`,
                        vocabulary: [
                            { en: "Cleanroom", es: "Sala limpia / Cuarto limpio", definition: "A controlled room with extremely low levels of dust and pollutants" },
                            { en: "Gown Room", es: "Sala de vestimenta", definition: "The locker area where workers put on protective suits" },
                            { en: "Bunny Suit", es: "Traje de sala limpia / Traje protector", definition: "The full-body suit worn to prevent human contamination" },
                            { en: "Air Shower", es: "Ducha de aire", definition: "Chamber that blows air to remove particles from clothing before entry" },
                            { en: "Contamination", es: "Contaminación", definition: "Unwanted particles that damage wafer circuits" },
                            { en: "Gowning Protocol", es: "Protocolo de vestimenta", definition: "The strict sequence of steps to dress in cleanroom gear" }
                        ],
                        questions: [
                            { q: "Why are cleanrooms necessary in semiconductor fabrication?", options: ["To prevent workers from getting sick", "Because a single dust particle can destroy microscopically small features", "To save electrical energy", "To protect wafers from daylight"], answer: 1 },
                            { q: "Which area do workers use to put on bunny suits and prepare for cleanroom entry?", options: ["The control center", "The gown room", "The cafeteria", "The chemical bath"], answer: 1 },
                            { q: "What is the function of the air shower?", options: ["To wash bunny suits with soap and water", "To blow high-velocity filtered air to remove dust particles from suits", "To measure the humidity of the fab", "To sterilize the silicon wafers"], answer: 1 },
                            { q: "Compared to normal outdoor air, Class 1 cleanroom air is about:", options: ["10 times cleaner", "1,000 times cleaner", "35 million times cleaner", "Exactly the same"], answer: 2 }
                        ]
                    },
                    {
                        id: "semi-m4-r2",
                        title: "Etching and Thin Film Deposition",
                        duration: "10 min",
                        content: `
# Etching and Thin Film Deposition

Once a circuit pattern has been printed onto the photoresist by photolithography, the wafer undergoes two key manufacturing phases to build the 3D structures: **Etching** (grabado) and **Deposition** (deposición).

## Etching: Removing Material

**Etching** is the process of removing unwanted materials from the wafer. The remaining photoresist acts as a shield, protecting the materials underneath. There are two primary types of etching:

### 1. Wet Etching (Grabado por vía húmeda)
The wafer is immersed in a liquid chemical bath (such as hydrofluoric acid). 
- **Pros**: Simple and cheap.
- **Cons**: It is **isotropic** (etched in all directions equally, creating curved edges). This makes it unsuitable for modern sub-10nm chips.

### 2. Dry Etching (Grabado por vía seca)
A machine uses reactive gas and **plasma** to bombard the wafer surface.
- **Pros**: It is **anisotropic** (etches only in a vertical direction, creating straight, sharp vertical walls). Essential for tiny, dense transistors.
- **Cons**: Complex, expensive, and can damage the crystal structure if not calibrated.

## Thin Film Deposition: Adding Material

To connect transistors and build insulating layers, engineers deposit thin films of conductors (metals) and insulators (dielectrics). The main methods are:

- **CVD (Chemical Vapor Deposition)**: Reactant gases mix in a chamber, causing a chemical reaction that deposits a solid film on the wafer. Used for insulating layers.
- **PVD (Physical Vapor Deposition / Sputtering)**: A physical process where gas ions bombard a metal target (like copper or aluminum), knocking atoms loose to coat the wafer. Used for metal connections.
- **ALD (Atomic Layer Deposition)**: Gases are introduced one at a time in self-limiting pulses. It builds the film **one atomic layer at a time**. ALD offers unmatched control over thickness and step coverage.

> **Overlaying layers**: These steps are repeated up to 80 times, layering oxides, metal lines, and silicon structures to build a complete microprocessor.
`,
                        vocabulary: [
                            { en: "Wet Etching", es: "Grabado en húmedo (químico)", definition: "Removing material using liquid chemicals" },
                            { en: "Dry Etching", es: "Grabado en seco (por plasma)", definition: "Removing material using reactive gases and plasma ions" },
                            { en: "Isotropic", es: "Isotrópico", definition: "Etching that occurs in all directions at the same rate" },
                            { en: "Anisotropic", es: "Anisotrópico", definition: "Etching that occurs in one preferred direction (typically vertical)" },
                            { en: "Chemical Vapor Deposition (CVD)", es: "Deposición química de vapor", definition: "Depositing materials through chemical reactions of gases" },
                            { en: "Physical Vapor Deposition (PVD)", es: "Deposición física de vapor", definition: "Coating wafer with metal by physically knocking atoms off a target" },
                            { en: "Atomic Layer Deposition (ALD)", es: "Deposición por capa atómica", definition: "Adding films one atomic layer at a time for maximum control" }
                        ],
                        questions: [
                            { q: "Why is dry etching preferred over wet etching for advanced node chips?", options: ["It is cheaper and faster", "It is anisotropic, creating straight vertical walls", "It uses liquid chemicals", "It cannot damage the crystal structure"], answer: 1 },
                            { q: "Which deposition method builds thin films one atomic layer at a time?", options: ["ALD", "CVD", "PVD", "Wet Etching"], answer: 0 },
                            { q: "What is PVD primarily used for in semiconductor manufacturing?", options: ["Developing positive photoresist", "Etching deep vertical channels", "Depositing metallic layers for electrical connections", "Purifying raw silicon crystals"], answer: 2 },
                            { q: "What does isotropic mean in etching?", options: ["Material is removed vertically only", "Material is removed in all directions equally", "No material is removed", "Only metals are removed"], answer: 1 }
                        ]
                    }
                ]
            },
            {
                id: "semi-m5",
                title: "Testing, Packaging, and Quality Control",
                titleES: "Pruebas, Empaquetado y Control de Calidad",
                icon: "fa-solid fa-vial",
                readings: [
                    {
                        id: "semi-m5-r1",
                        title: "Wafer Testing and Yield",
                        duration: "10 min",
                        content: `
# Wafer Testing and Yield

Before a silicon wafer is cut into individual chips, every single circuit must be tested. This phase is critical because manufacturing chips is imperfect, and defects are inevitable.

## Wafer Probe Testing

A machine called a **wafer prober** uses a probe card with thousands of microscopic needles to touch the electrical pads on each chip (called a **die**). It runs rapid electrical tests to verify if the logic, memory, and voltage levels are correct.

- **Sorting / Binning**: Chips that pass are marked as functional. In some cases, chips are classified into different "bins" based on their performance (e.g., speed, power consumption). A high-speed chip is sold as a premium processor, while a slower chip from the same wafer is sold at a lower price.
- **Ink Dotting / Digital Mapping**: Traditionally, defective chips were marked with a drop of black ink. Today, a computer generates a digital "wafer map" that records the coordinates of all failed dies.

## Yield: The Ultimate Metric

In semiconductor manufacturing, **yield** (rendimiento) is the most critical business metric. It represents the percentage of working chips produced compared to the maximum possible count.

$$\text{Yield} = \frac{\text{Number of functional dies}}{\text{Total dies on wafer}} \times 100\%$$

If a wafer contains 500 dies, and testing shows that 400 are functional, the yield is **80%**. A low yield (e.g., 20%) means the factory is wasting expensive materials and processing time, which can ruin a chip designer's profits.

## Statistical Process Control (SPC)

To maintain high yields, fabs use **SPC (Statistical Process Control)**. Sensors monitor thousands of parameters (such as temperature, gas flow, and pressure) in real-time. If a sensor's readings shift away from the statistical average, SPC charts alert engineers immediately. This allows them to stop the machines and fix issues before entire batches of wafers are ruined.
`,
                        vocabulary: [
                            { en: "Probe Testing", es: "Prueba con sonda / Testeo de obleas", definition: "Electrical testing of chips while still on the wafer" },
                            { en: "Die", es: "Pastilla / Chip individual", definition: "A single unpackaged square of silicon containing a circuit" },
                            { en: "Yield", es: "Rendimiento", definition: "The ratio of working chips to the total chips produced" },
                            { en: "Binning", es: "Clasificación de chips", definition: "Sorting chips into groups based on performance and speed" },
                            { en: "Wafer Map", es: "Mapa de oblea", definition: "A digital grid recording the layout and status of each die" },
                            { en: "Statistical Process Control (SPC)", es: "Control estadístico de procesos", definition: "Using statistical methods to monitor and control a production process" }
                        ],
                        questions: [
                            { q: "What does 'yield' measure in semiconductor manufacturing?", options: ["The weight of the silicon wafer", "The speed of the chip processing", "The percentage of functional working chips produced", "The quantity of gas used in etching"], answer: 2 },
                            { q: "What tool is used to run electrical tests on chips while they are still on the wafer?", options: ["A spin coater", "A wafer prober", "An ion implanter", "An air shower"], answer: 1 },
                            { q: "What is the primary purpose of 'binning'?", options: ["To throw failed chips in the trash", "To sort working chips into price/performance categories", "To pack wafers into shipping containers", "To wash the wafer between layers"], answer: 1 },
                            { q: "How is Statistical Process Control (SPC) used to maintain high yields?", options: ["By replacing human workers with robots", "By monitoring fab parameters in real-time to alert engineers of shifts", "By increasing the temperature of cleanrooms", "By using cheaper raw silicon"], answer: 1 }
                        ]
                    },
                    {
                        id: "semi-m5-r2",
                        title: "Chip Packaging and ISO 9001",
                        duration: "10 min",
                        content: `
# Chip Packaging and ISO 9001

A functional silicon die is extremely fragile. It is thinner than paper, sensitive to moisture, and can be destroyed by static electricity. To be useful, it must be enclosed in a protective shell — a process called **packaging** (empaquetado).

## The Three Roles of Packaging

1. **Environmental Protection**: Enclosing the die in a plastic, ceramic, or metal case to block dust, moisture, and impact.
2. **Electrical Connections**: Connecting the tiny microscopic pads on the die to larger pins or pads that can be soldered to a printed circuit board (PCB).
3. **Heat Dissipation**: Providing a path to pull heat away from the silicon core (often using metal heat spreaders).

## Packaging Techniques

As chips grew more advanced, packaging evolved:

### 1. Wire Bonding (Conexión por micro-alambres)
Microscopic gold or aluminum wires are welded from the die pads to the package leads. 
- **Pros**: Very cheap and reliable.
- **Cons**: Slow and limited bandwidth; not suitable for high-speed processors.

### 2. Flip-Chip
The die is flipped upside down, and small solder bumps on the chip surface connect directly to the package substrate. This allows for higher pin counts and shorter electrical paths.

### 3. BGA (Ball Grid Array)
Instead of pins, BGA packages use a grid of tiny **solder balls** (bolas de soldadura) on the bottom of the package. It provides high contact density and excellent thermal performance.

### 4. Advanced Packaging (2.5D/3D)
Combining multiple dies (like CPU cores and high-bandwidth memory, HBM) in a single package. TSMC's **CoWoS** (Chip-on-Wafer-on-Substrate) is an example of advanced packaging used for high-end AI chips.

## Quality Standards: ISO 9001 and Automotive Reliability

Chips used in cars (automotive grade) or planes (aerospace grade) must follow extreme quality standards. They must operate from -40°C to 125°C and survive vibrations for 15+ years. A failure in a phone is annoying; a failure in a car brake system is fatal. Fabs must comply with **ISO 9001** (general quality management) and **AEC-Q100** (automotive qualification standard) to sell to these safety-critical industries.
`,
                        vocabulary: [
                            { en: "Chip Packaging", es: "Empaquetado de chips / Encapsulado", definition: "Enclosing a silicon die in a protective container" },
                            { en: "Wire Bonding", es: "Conexión de micro-alambres", definition: "Connecting die to package leads using ultra-thin metal wires" },
                            { en: "Solder Ball", es: "Bola de soldadura", definition: "Tiny sphere of solder used to connect BGA packages to PCBs" },
                            { en: "BGA (Ball Grid Array)", es: "Matriz de rejilla de bolas", definition: "Package style using a grid of solder balls on the bottom" },
                            { en: "Heat Dissipation", es: "Disipación de calor", definition: "The process of transfering thermal energy away from the chip" },
                            { en: "Substrate", es: "Sustrato", definition: "The base material that holds the die and wiring in the package" }
                        ],
                        questions: [
                            { q: "What is the primary purpose of chip packaging?", options: ["To change the electrical voltage of the chip", "To protect the delicate silicon die and connect it to a circuit board", "To increase the transistor count", "To make chips look attractive"], answer: 1 },
                            { q: "Which packaging technique uses a grid of tiny solder balls on the bottom?", options: ["Wire Bonding", "Flip-Chip", "BGA (Ball Grid Array)", "Doping"], answer: 2 },
                            { q: "What is 'wire bonding'?", options: ["Welding micro-thin gold/aluminum wires from die pads to package leads", "Tying cables together inside the cleanroom", "Connecting wafers using copper bars", "Using lasers to glue the chip to glass"], answer: 0 },
                            { q: "Why do automotive grade chips require stricter certifications like AEC-Q100?", options: ["To make them cheaper for car buyers", "Because they experience extreme temperatures, vibrations, and failures can be fatal", "So they can connect to wireless networks", "To speed up their manufacturing time"], answer: 1 }
                        ]
                    },
                    {
                        id: "semi-m5-r3",
                        title: "Advanced Packaging & Data Center Architectures",
                        duration: "12 min",
                        content: `
# Advanced Packaging & Data Center Architectures

Data centers run on semiconductors — but not all chips use the same package. As AI, cloud computing, and hyperscale infrastructure continue to grow, **advanced packaging** has become one of the most critical technologies in the semiconductor industry. The package is no longer just protecting the chip; it has become a critical part of **system performance**.

## Workload-Specific Package Architectures

Different workloads require specialized package architectures:

### 1. AI Accelerators (GPUs & AI ASICs)
Used by NVIDIA (H100/B200), AMD (MI300), Google (TPU), Amazon (Trainium), Microsoft (Maia).
- **Typical Packages**: Large fcBGA (Flip-Chip Ball Grid Array), 2.5D Packaging (CoWoS), HBM Integration, Chiplets.
- **Key Priorities**: Massive memory bandwidth, high power delivery, advanced thermal performance.

### 2. Data Center CPUs
Used by Intel (Xeon), AMD (EPYC), NVIDIA (Grace).
- **Typical Packages**: fcBGA, LGA (Land Grid Array), Multi-Die Packages.
- **Key Specs**: Typically exceed **2,000–6,000+ I/O connections** and handle hundreds of watts of power.

### 3. Networking & Switch ASICs
Used by Broadcom (Tomahawk), NVIDIA (Spectrum), Cisco (Silicon One), Marvell (Teralynx).
- **Typical Packages**: Large fcBGA, Co-Packaged Optics (CPO).
- **Key Specs**: Next-generation AI switches require **800G, 1.6T, and future 3.2T** connectivity.

### 4. Optical Transceivers
- **Typical Packages**: LGA, Optical Modules, Silicon Photonics Packages.
- **Used for**: High-speed fiber connectivity, AI cluster networking, and data center interconnects (DCI).

### 5. Power Management & Power Semiconductors
Used for voltage regulation, power conversion, and AI rack power delivery.
- **Typical Packages**: QFN, Power QFN, LGA, Power Modules.
- **Industry Challenge**: Next-generation AI racks are approaching **megawatt-scale power consumption**, making power packaging a strategic bottleneck.

## Future Trends in Advanced Packaging

As AI infrastructure scales, advanced packaging is becoming just as important as the silicon itself:
- **Larger fcBGA substrates**: Accommodating multiple silicon dies on a single package.
- **HBM (High Bandwidth Memory)**: Stacking DRAM dies vertically using 3D TSVs (Through-Silicon Vias).
- **Chiplet Integration**: Breaking monolithic chips into smaller, specialized dies connected via high-speed interconnects (UCIe).
- **Silicon Photonics & Co-Packaged Optics (CPO)**: Bringing optical optics directly into the chip package to reduce power consumption and latency.
- **OSAT Expansion**: Offshore Assembly and Test facilities (including nearshoring facilities in North America) are investing heavily in advanced packaging lines.

---

> **Key Takeaway**: Advanced packaging (2.5D/3D, HBM, Chiplets, CPO, fcBGA) is transforming chip design. The package is no longer just a protective shell — it directly determines AI and data center performance.
`,
                        vocabulary: [
                            { en: "Advanced Packaging", es: "Empaquetado avanzado", definition: "High-density packaging integrating multiple dies, 2.5D/3D structures, or HBM" },
                            { en: "fcBGA (Flip-Chip Ball Grid Array)", es: "fcBGA", definition: "High-density package using solder bumps and a ball grid array substrate" },
                            { en: "HBM (High Bandwidth Memory)", es: "Memoria de alto ancho de banda", definition: "3D-stacked DRAM offering ultra-fast memory access for AI chips" },
                            { en: "Chiplet", es: "Chiplet / Die especializado", definition: "Small modular silicon die combined with others in a single package" },
                            { en: "Silicon Photonics", es: "Fotónica de silicio", definition: "Using light/optics instead of electricity to transfer data on silicon" },
                            { en: "CPO (Co-Packaged Optics)", es: "Óptica empaquetada conjuntamente", definition: "Integrating optical interfaces directly onto the semiconductor package" },
                            { en: "OSAT", es: "OSAT", definition: "Outsourced Semiconductor Assembly and Test company" },
                            { en: "Power Packaging", es: "Empaquetado de potencia", definition: "Packaging designed for high-current voltage regulation and thermal efficiency" }
                        ],
                        questions: [
                            { q: "Why has advanced packaging become so critical for AI accelerators and data center CPUs?", options: ["It makes chips look bigger", "It is no longer just a protective shell — it directly determines memory bandwidth, power delivery, and system performance", "It eliminates the need for cleanrooms", "It allows chips to be made out of plastic"], answer: 1 },
                            { q: "What is HBM (High Bandwidth Memory)?", options: ["A type of optical cable", "3D-stacked DRAM offering massive memory bandwidth for GPUs and AI ASICs", "A soft rubber coating for wafers", "A brand of power supply"], answer: 1 },
                            { q: "What is Co-Packaged Optics (CPO)?", options: ["Eyeglasses worn by cleanroom technicians", "Integrating optical interfaces directly into the chip package for high-speed connectivity", "Using cameras to inspect chips", "A type of photolithography laser"], answer: 1 },
                            { q: "What is a 'Chiplet' architecture?", options: ["A single tiny chip used only in watches", "Breaking a large monolithic processor into smaller specialized dies in one package", "A type of potato snack", "A defect found during wafer testing"], answer: 1 }
                        ]
                    }
                ]
            },
            {
                id: "semi-m6",
                title: "The Global Chip Industry and Nearshoring",
                titleES: "La Industria Global de Chips y Nearshoring",
                icon: "fa-solid fa-globe",
                readings: [
                    {
                        id: "semi-m6-r1",
                        title: "The Semiconductor Supply Chain",
                        duration: "10 min",
                        content: `
> **TSMC Fab 18 & SEMI Industry Note**: The global semiconductor supply chain is governed by **SEMI (Semiconductor Equipment and Materials International)** global standards (such as SEMI E187 for Fab Cybersecurity and SEMI E188 for Tool Interoperability). Understanding TSMC's GigaFab model and North American OSAT hubs is essential for nearshoring semiconductor specialists.

# The Semiconductor Supply Chain: From Fabless Design to OSAT Packaging

The semiconductor supply chain is one of the most complex, capital-intensive, and highly specialized networks in global economic history. Creating a single state-of-the-art 3nm processor requires over **1,500 individual manufacturing steps** spanning multiple continents and thousands of specialized supplier ecosystems.

## The Tripartite Business Model: Fabless, Foundries, and IDMs

The semiconductor industry relies on three distinct business architecture models:

### 1. Fabless Design Houses
Companies that concentrate 100% of their capital on microarchitecture research, circuit layout design, and software compilers, while outsourcing physical manufacturing entirely.
- **Key Players**: NVIDIA (GPUs), Apple (Apple Silicon M/A-series), AMD (Zen CPUs), Qualcomm (Snapdragon), MediaTek.
- **Core Function**: Producing GDSII/OASIS silicon layout files and delivering IP cores to contract foundries.

### 2. Pure-Play Foundries (Wafer Fabs)
Contract manufacturing mega-facilities dedicated strictly to executing customer GDSII layouts into physical silicon wafers. Pure-play foundries do not design or sell branded chips of their own, avoiding conflicts of interest with their clients.
- **Industry Titans**: **TSMC** (Taiwan Semiconductor Manufacturing Co.), GlobalFoundries, UMC, Tower Semiconductor.
- **Dominance**: TSMC's **Fab 18** in Tainan and Fab 20 in Hsinchu produce over **90%** of the world's most advanced sub-5nm microprocessors.

### 3. Integrated Device Manufacturers (IDMs)
Legacy semiconductor pioneers that maintain in-house design, silicon wafer fabrication, testing, and packaging under one corporate umbrella.
- **Key Players**: Intel, Samsung Electronics, Texas Instruments, Infineon, STMicroelectronics.
- **Evolution**: Modern IDMs are adopting "IDM 2.0" hybrid models, manufacturing core chiplets internally while contracting TSMC for leading-edge nodes.

## Geopolitical Realignment: CHIPS Act & North American Nearshoring

Because over 80% of global advanced wafer fabrication capacity was historically concentrated in East Asia, governments enacted major industrial policies to decentralize production:

- **US CHIPS and Science Act ($52 Billion USD)**: Direct federal subsidies to establish advanced wafer fabs within North America (e.g., TSMC Fab 21 in Phoenix, Arizona; Intel Fabs 52/62; Samsung Taylor, Texas).
- **SEMI E187 & E188 Standards Compliance**: Enforcing strict cybersecurity and hardware interoperability standards across equipment vendors to protect intellectual property against cyber espionage.

### Mexico's Strategic Nearshoring Role

The creation of the U.S. Southwest Semiconductor Belt directly integrates Mexico into high-value manufacturing nodes:

1. **OSAT (Outsourced Semiconductor Assembly and Test)**: Mexico is attracting multi-billion dollar packaging plants in Tijuana, Mexicali, and Chihuahua for Advanced 2.5D/3D Packaging (CoWoS - Chip-on-Wafer-on-Substrate).
2. **Design, Verification & Embedded Software**: Engineering hubs in Guadalajara and Monterrey lead pre-silicon verification, DFT (Design for Testability), and firmware compilation.
3. **Chemical & Equipment Supply Chains**: Suppliers across Northern Mexico produce ultra-pure electronic-grade gases, precision machining, and cleanroom consumables required by TSMC and Intel fabs in Arizona.

---

> **Key Takeaway**: The semiconductor industry is split into Fabless, Foundry, and IDM models. Driven by the CHIPS Act and **SEMI** standards, Mexico's nearshoring corridor plays a critical role in OSAT packaging, verification, and chemical supply chains for TSMC and North American fabs.
`,
                        vocabulary: [
                            { en: "Supply Chain", es: "Cadena de suministro", definition: "The sequence of processes involved in the production and distribution of a commodity" },
                            { en: "Foundry", es: "Fundidora de semiconductores", definition: "A factory that manufactures chips for other design companies" },
                            { en: "Fabless", es: "Sin fábrica", definition: "A business model where a company designs chips but outsources fabrication" },
                            { en: "IDM", es: "Fabricante de dispositivos integrados", definition: "A company that designs, manufactures, and sells its own chips" },
                            { en: "Nearshoring", es: "Nearshoring / Relocalización cercana", definition: "Moving manufacturing operations close to the primary market" },
                            { en: "CHIPS Act", es: "Ley de Chips (EE. UU.)", definition: "US federal law funding domestic semiconductor manufacturing and research" }
                        ],
                        questions: [
                            { q: "What is a 'fabless' semiconductor company?", options: ["A company that only sells raw silicon crystals", "A company that designs chips but outsources manufacturing to a foundry", "A factory that operates without using electricity", "A company that packages chips without testing them"], answer: 1 },
                            { q: "Which foundry company is the absolute world leader, manufacturing over 90% of advanced processors?", options: ["Intel", "Samsung", "TSMC", "ASML"], answer: 2 },
                            { q: "Why is nearshoring bringing semiconductor investment to Mexico?", options: ["Because silicon is only mined in Mexico", "To locate testing, packaging, and supply chains closer to North American fab hubs", "To replace U.S. design houses completely", "Because ASML is based in Mexico"], answer: 1 },
                            { q: "What is an IDM (Integrated Device Manufacturer)?", options: ["A company that designs, fabricates, and sells chips in-house", "A shipping firm that moves wafers", "A machine used in cleanrooms", "A brand of protective bunny suits"], answer: 0 }
                        ]
                    },
                    {
                        id: "semi-m6-r2",
                        title: "Careers in Semiconductor Manufacturing",
                        duration: "10 min",
                        content: `
> **Semiconductor Workforce Certification Note**: Fab career paths and technical competencies are structured according to **SEMI E10** (Specification for Definition and Measurement of Equipment Reliability, Availability, and Maintainability) and **ISO 14644-1** cleanroom certification requirements.

# Professional Career Paths in Semiconductor Fabrication

The unprecedented expansion of GigaFabs in North America and OSAT nearshoring hubs in Mexico is driving urgent demand for specialized engineers, technicians, and cleanroom operators. Modern semiconductor manufacturing relies on interdisciplinary engineering disciplines operating under zero-defect quality frameworks.

## Specialized Career Disciplines in a GigaFab

### 1. Semiconductor Manufacturing Specialist (MSI Track)
Specialists operate automated **FOUP (Front Opening Unified Pod)** material handling systems and overhead hoist transport (OHT) tracks across ISO Class 3/5 cleanroom bays:
- **Core Competencies**: Executing chemical Standard Operating Procedures (SOPs), wafer lot tracking via Manufacturing Execution Systems (MES), and managing gowning airlock protocols.
- **Career Trajectory**: Shift Lead -> Fab Area Supervisor -> Cleanroom Operations Manager.

### 2. Fab Equipment Reliability Technician (SEMI E10 Standard)
Equipment Technicians are responsible for maintaining multi-million-dollar tools (EUV scanners, High-Density Plasma Etchers, Chemical-Mechanical Planarization polishers):
- **Core Competencies**: Preventive maintenance (PM), vacuum pump leak detection using helium mass spectrometers, RF plasma generator calibration, and mean time between failures (MTBF) analysis under **SEMI E10**.
- **Career Trajectory**: Senior Tool Specialist -> Field Service Engineer -> Principal Equipment Architect.

### 3. Yield Enhancement & Process Engineer
Process Engineers manage the chemical, thermal, and optical parameters across wafer lots to maximize **Die Yield** (percentage of functional chips per wafer):
- **Core Competencies**: Designing Experiments (DOE), analyzing In-Line Metrology data, optimizing plasma etch gas ratios, and controlling thermal oxidation recipes.
- **Career Trajectory**: Process Integration Lead -> Yield Engineering Director.

### 4. Metrology & Quality Control Specialist (SPC Framework)
Quality specialists monitor physical contamination and electrical parameters to prevent catastrophic lot scrap:
- **Core Competencies**: Implementing **Statistical Process Control (SPC)**, operating Scanning Electron Microscopes (SEM) and X-ray Fluorescence (XRF) tools for nanoscale defect inspection, and conducting root-cause failure analysis (RCFA).

## Technical English as the Global Operational Standard

In global semiconductor manufacturing, **Technical English is the mandatory operational language across all GigaFabs**:
- **Consoles & MES Software**: 100% of equipment touchscreens, diagnostic alarms, and recipe editors display commands in English.
- **SOPs & Safety Logs**: Technical engineering specifications, material safety data sheets (MSDS), and change control requests (CCR) are written exclusively in English.
- **Cross-Border Nearshoring Sync**: Daily engineering hand-offs between fabs in Arizona, Texas, Mexico, and Taiwan are conducted via Technical English briefings.

---

> **Key Takeaway**: Semiconductor careers range from Manufacturing Specialists to Equipment Technicians and Process Engineers. Guided by **SEMI E10** and **ISO 14644** standards, fluency in Technical English is mandatory for global mobility and rapid career advancement.
`,
                        vocabulary: [
                            { en: "Manufacturing Specialist", es: "Especialista en manufactura", definition: "Role monitoring fab runs, handling wafers, and managing automated systems" },
                            { en: "Equipment Technician", es: "Técnico de equipo", definition: "Technician responsible for maintaining and repairing fab machinery" },
                            { en: "Process Engineer", es: "Ingeniero de procesos", definition: "Engineer optimizing chemical and physical manufacturing stages to improve yield" },
                            { en: "Quality Control", es: "Control de calidad", definition: "Monitoring and maintaining product standards using metrics like SPC" },
                            { en: "SOP", es: "Procedimiento operativo estándar", definition: "Standard Operating Procedure — detailed instructions for operations" },
                            { en: "Technical English", es: "Inglés técnico", definition: "English vocabulary and phrasing used for specific fields like engineering" }
                        ],
                        questions: [
                            { q: "Which role focuses on preventive maintenance and repair of fab machinery?", options: ["Process Engineer", "Equipment Technician", "Manufacturing Specialist", "Quality Control Technician"], answer: 1 },
                            { q: "Why is Technical English critical in Mexican semiconductor facilities?", options: ["Because most workers are from England", "All manuals, equipment screens, and global operations are in English", "To write Spanish translations", "To communicate with local retail stores"], answer: 1 },
                            { q: "What does a Process Engineer do in a fab?", options: ["Maintains cleanroom building structures", "Optimizes chemical and physical recipes of fabrication stages to improve yield", "Sorts packages into shipping boxes", "Dresses employees in the gown room"], answer: 1 },
                            { q: "What is a Manufacturing Specialist responsible for?", options: ["Writing software for smartphone apps", "Designing circuit architectures", "Monitoring automated production runs, handling wafers, and following gown room protocols", "Operating laser drills"], answer: 2 }
                        ]
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // TRACK 3: ELECTROMOBILITY & EV ENGINEERING (FULL CONTENT)
    // =========================================================================
    "electromobility": {
        id: "electromobility",
        title: "Electromovilidad",
        titleEN: "Electromobility & EV Engineering",
        level: "A2-B1",
        status: "full",
        description: "English for electric vehicle engineering — battery technology, electric motors, charging infrastructure, and Mexico's EV manufacturing sector.",
        descriptionES: "Inglés para ingeniería de vehículos eléctricos — tecnología de baterías, motores eléctricos, infraestructura de carga y el sector de manufactura EV de México.",
        totalModules: 10,
        estimatedHours: 20,
        prerequisites: ["esp-foundation"],
        standard: "CONOCER EC0391",
        conocer: "EC0391 (Mantenimiento y Ensamble de Vehículos Eléctricos)",
        ngss: "HS-PS3-3 (Energy System Optimization)",
        industry: "SAE J3400 (NACS) / ISO 26262 Functional Safety",
        modules: [
            // -----------------------------------------------------------------
            // MODULE 1: Introduction to Electric Vehicles
            // -----------------------------------------------------------------
            {
                id: "ev-m1",
                title: "Introduction to Electric Vehicles",
                titleES: "Introducción a los Vehículos Eléctricos",
                icon: "fa-solid fa-car-battery",
                readings: [
                    {
                        id: "ev-m1-r1",
                        title: "What Is an Electric Vehicle?",
                        duration: "10 min",
                        content: `
# What Is an Electric Vehicle?

Every year, millions of new electric vehicles (EVs) drive off factory floors around the world. In 2025, global EV sales exceeded 20 million units — roughly one in every five new cars sold. But what exactly makes a car "electric," and why is this technology transforming the automotive industry?

## The Basic Concept

An **electric vehicle** is a vehicle that uses one or more **electric motors** instead of (or in addition to) an internal combustion engine (ICE) to move. Instead of burning gasoline or diesel, an EV draws energy from a **battery pack** — a large collection of rechargeable battery cells stored in the floor of the vehicle.

Think of it this way: a traditional car is like a stove that burns gas. An EV is like an induction cooktop that uses electricity — cleaner, quieter, and more efficient.

## Types of Electric Vehicles

Not all EVs are the same. Engineers classify them into four categories:

### 1. BEV — Battery Electric Vehicle
A **BEV** runs entirely on electricity. It has no gasoline engine at all. The battery is the only energy source.

**Examples**: Tesla Model 3, BYD Seal, Nissan Leaf, Chevrolet Equinox EV.

### 2. PHEV — Plug-in Hybrid Electric Vehicle
A **PHEV** has both an electric motor and a gasoline engine. It can drive a short distance (typically 30-80 km) on electricity alone. After the battery is depleted, the gasoline engine takes over.

**Examples**: Toyota RAV4 Prime, BMW X5 xDrive50e.

### 3. HEV — Hybrid Electric Vehicle
An **HEV** also has both an electric motor and a gasoline engine, but it **cannot be plugged in**. The small battery is charged only through **regenerative braking** (recovering energy when slowing down). The electric motor assists the engine but cannot drive the car alone for long distances.

**Examples**: Toyota Prius, Honda Accord Hybrid.

### 4. FCEV — Fuel Cell Electric Vehicle
An **FCEV** uses a **hydrogen fuel cell** to generate electricity on board. Hydrogen gas reacts with oxygen in the fuel cell to produce electricity, water, and heat. FCEVs are rare and expensive, but they offer very fast refueling (~5 minutes).

**Examples**: Toyota Mirai, Hyundai NEXO.

## Key Components of a BEV

A modern battery electric vehicle has these essential components:

| Component | Function |
|-----------|----------|
| **Battery Pack** | Stores electrical energy (typically 40-100 kWh) |
| **Electric Motor** | Converts electricity into mechanical rotation to spin the wheels |
| **Inverter** | Converts DC (battery) to AC (motor) power |
| **Onboard Charger** | Converts AC from the wall outlet to DC for the battery |
| **Battery Management System (BMS)** | Monitors cell voltages, temperatures, and state of charge |
| **Thermal Management System** | Keeps the battery at optimal temperature (15-35°C) |
| **Regenerative Braking System** | Recovers kinetic energy during deceleration |

## Why EVs Matter for Mexico's Nearshoring Industry

Mexico is Latin America's largest automotive manufacturer, producing approximately 4 million vehicles per year. As global automakers transition to electric, Mexico's factories must adapt. The nearshoring wave is bringing new EV component manufacturing:

- **Battery module assembly** plants in Nuevo León and Coahuila
- **Electric motor** and **power electronics** manufacturing in Querétaro and Puebla
- **Wiring harness** production (the "nervous system" of every EV) in Chihuahua and Sonora

By 2026, electrified vehicles account for approximately 12.5% of light vehicle sales in Mexico, and this percentage is growing rapidly.

---

> **Key Takeaway**: An electric vehicle replaces the gasoline engine with an electric motor powered by a rechargeable battery. Mexico's automotive industry is transitioning to EV manufacturing, creating thousands of new technical jobs.
`,
                        vocabulary: [
                            { en: "Electric Vehicle (EV)", es: "Vehículo Eléctrico (VE)", definition: "A vehicle powered by one or more electric motors" },
                            { en: "Battery Pack", es: "Paquete de Baterías", definition: "The large rechargeable energy storage unit in an EV" },
                            { en: "BEV (Battery Electric Vehicle)", es: "Vehículo Eléctrico de Batería", definition: "An EV that runs entirely on electricity" },
                            { en: "PHEV (Plug-in Hybrid)", es: "Híbrido Enchufable", definition: "A vehicle with both electric motor and gasoline engine that can be plugged in" },
                            { en: "Inverter", es: "Inversor", definition: "Device that converts DC to AC power" },
                            { en: "Regenerative Braking", es: "Frenado Regenerativo", definition: "A system that recovers kinetic energy when slowing down" },
                            { en: "kWh (Kilowatt-hour)", es: "kWh (Kilovatio-hora)", definition: "Unit of energy — how much energy a battery stores" },
                            { en: "Fuel Cell", es: "Celda de Combustible", definition: "Device that generates electricity from hydrogen" },
                            { en: "Wiring Harness", es: "Arnés de Cableado", definition: "The bundle of electrical wires that connects all components" },
                            { en: "ICE (Internal Combustion Engine)", es: "Motor de Combustión Interna", definition: "Traditional gasoline/diesel engine" },
                            { en: "Nearshoring", es: "Nearshoring", definition: "Relocating manufacturing closer to the primary market" },
                            { en: "Thermal Management", es: "Gestión Térmica", definition: "Controlling temperature of battery and components" }
                        ],
                        questions: [
                            { q: "What is the main difference between a BEV and a PHEV?", options: ["Both use only electricity", "A BEV runs only on electricity; a PHEV has both electric and gasoline power", "A PHEV is faster", "A BEV uses hydrogen"], answer: 1 },
                            { q: "What does an inverter do in an EV?", options: ["Stores energy", "Converts DC power from the battery to AC power for the motor", "Cools the battery", "Connects to the internet"], answer: 1 },
                            { q: "What does regenerative braking recover?", options: ["Gasoline", "Water", "Kinetic energy during deceleration", "Heat from the engine"], answer: 2 },
                            { q: "Why is EV manufacturing important for Mexico?", options: ["Mexico invented EVs", "Mexico is Latin America's largest auto manufacturer transitioning to electric", "Mexico has the most hydrogen", "EVs are cheaper to design"], answer: 1 }
                        ]
                    },
                    {
                        id: "ev-m1-r2",
                        title: "The History and Future of Electric Vehicles",
                        duration: "10 min",
                        content: `
# The History and Future of Electric Vehicles

Many people think electric vehicles are a new invention. In reality, EVs are older than gasoline cars. Understanding this history helps us see where the technology is heading.

## The First Electric Cars (1830s–1900s)

The first crude electric carriage was built around **1832** by Scottish inventor Robert Anderson. By the 1890s, electric vehicles were actually **more popular** than gasoline cars in major cities like New York and London. They were quiet, clean, and easy to operate — you didn't need to hand-crank the engine like gasoline cars of that era.

In 1899, a Belgian electric car called "La Jamais Contente" became the first vehicle to exceed **100 km/h** (62 mph). Electric taxis operated in New York City as early as 1897.

## The Decline (1920s–1990s)

So why did electric cars disappear? Three main reasons:

1. **Henry Ford's Model T** (1908): Mass production made gasoline cars affordable — the Model T cost $260 (about $4,500 today), while electric cars cost $1,750+.
2. **The electric starter motor** (1912): Before this, gasoline cars required dangerous hand-cranking. The electric starter eliminated this inconvenience.
3. **Oil discoveries**: Cheap gasoline in Texas and Oklahoma made fuel costs negligible.

By the 1920s, the electric vehicle was essentially dead for the next 70 years.

## The Revival (1990s–2020s)

Several events brought EVs back:

- **1996**: General Motors released the **EV1**, a revolutionary electric car. It was popular with owners but GM controversially crushed all units by 2003.
- **2003**: **Tesla Motors** was founded by Martin Eberhard and Marc Tarpenning (Elon Musk joined as chairman and lead investor in 2004).
- **2008**: Tesla Roadster launched — the first highway-legal EV with a lithium-ion battery and over 300 km range.
- **2010**: Nissan Leaf became the first affordable mass-market EV.
- **2017**: Tesla Model 3 launched and became the best-selling EV in history.
- **2020s**: Chinese manufacturers like **BYD**, **NIO**, and **Xpeng** emerged as global leaders.

## The Current Landscape (2025–2026)

Today, the EV market is characterized by:

| Metric | Value |
|--------|-------|
| Global EV sales (2025) | ~20 million units |
| Share of new car sales | ~20% globally |
| Leading manufacturer | BYD (China) |
| Battery cost (2025) | ~$90/kWh (LFP chemistry) |
| Average range | 350-500 km (BEV) |

## Key Technologies Driving the Future

### Solid-State Batteries
Current EVs use **lithium-ion** batteries with liquid electrolytes. **Solid-state batteries** replace the liquid with a solid material, offering higher energy density, faster charging, and better safety. Mass production is expected by 2028-2030.

### Vehicle-to-Grid (V2G)
Future EVs will not just consume electricity — they will **sell it back** to the power grid. Your parked EV could power your home during a blackout or earn money by stabilizing the electrical grid.

### Autonomous Driving + EVs
Electric powertrains are ideal platforms for autonomous driving because electric motors respond **instantly** to computer commands and software updates can improve the vehicle over its lifetime.

---

> **Key Takeaway**: Electric vehicles were invented before gasoline cars but lost the market battle in the early 1900s. Today, they are back stronger than ever, driven by battery technology, climate goals, and software innovation.
`,
                        vocabulary: [
                            { en: "Internal Combustion Engine (ICE)", es: "Motor de Combustión Interna", definition: "Engine that burns fuel (gasoline/diesel)" },
                            { en: "Mass Production", es: "Producción en Masa", definition: "Manufacturing large quantities at low cost" },
                            { en: "Lithium-Ion Battery", es: "Batería de Iones de Litio", definition: "The most common rechargeable battery type in EVs" },
                            { en: "Solid-State Battery", es: "Batería de Estado Sólido", definition: "Next-gen battery replacing liquid electrolyte with solid" },
                            { en: "Energy Density", es: "Densidad Energética", definition: "Amount of energy stored per unit of weight or volume" },
                            { en: "Vehicle-to-Grid (V2G)", es: "Vehículo a Red (V2G)", definition: "Technology allowing EVs to send electricity back to the grid" },
                            { en: "Autonomous Driving", es: "Conducción Autónoma", definition: "Self-driving vehicle technology" },
                            { en: "Range", es: "Autonomía", definition: "How far a vehicle can travel on a single charge" },
                            { en: "Electrolyte", es: "Electrolito", definition: "The medium that carries ions between battery electrodes" },
                            { en: "Powertrain", es: "Tren Motriz", definition: "All components that generate and deliver power to wheels" }
                        ],
                        questions: [
                            { q: "When was the first electric carriage built?", options: ["Around 1832", "1908", "1996", "2003"], answer: 0 },
                            { q: "Why did gasoline cars win over electric cars in the early 1900s?", options: ["Electric cars were dangerous", "Mass production made gasoline cars cheap, and oil was abundant", "Electric cars were too fast", "Governments banned EVs"], answer: 1 },
                            { q: "What advantage do solid-state batteries offer?", options: ["They are heavier", "They use gasoline", "Higher energy density, faster charging, and better safety", "They never need charging"], answer: 2 },
                            { q: "What is Vehicle-to-Grid (V2G)?", options: ["Technology allowing EVs to send electricity back to the power grid", "A type of charger", "A GPS system", "A new car brand"], answer: 0 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 2: Battery Technology: Lithium-Ion and Beyond
            // -----------------------------------------------------------------
            {
                id: "ev-m2",
                title: "Battery Technology: Lithium-Ion and Beyond",
                titleES: "Tecnología de Baterías: Litio-Ion y Más Allá",
                icon: "fa-solid fa-battery-full",
                readings: [
                    {
                        id: "ev-m2-r1",
                        title: "How a Lithium-Ion Battery Works",
                        duration: "10 min",
                        content: `
# How a Lithium-Ion Battery Works

The battery is the heart of every electric vehicle. Understanding how it works is essential for anyone entering the EV manufacturing industry.

## The Basic Structure

A lithium-ion battery cell has four main components:

1. **Cathode** (positive electrode): Made of a lithium metal oxide. This is where lithium ions "live" when the battery is fully charged. The cathode material determines the battery's performance characteristics.

2. **Anode** (negative electrode): Usually made of **graphite** (a form of carbon). During charging, lithium ions move from the cathode to the anode and embed themselves between graphite layers — a process called **intercalation**.

3. **Electrolyte**: A liquid chemical that allows lithium **ions** (Li⁺) to move between the cathode and anode. The electrolyte conducts ions but **blocks electrons**, forcing them through the external circuit (which powers the motor).

4. **Separator**: A thin, porous membrane between the cathode and anode that prevents them from physically touching (which would cause a **short circuit**) while allowing ions to pass through.

## Charging and Discharging

### Charging (Plugging in):
- An external power source pushes lithium ions **from the cathode to the anode** through the electrolyte
- Electrons flow through the external circuit in the same direction
- Energy is stored as chemical potential energy in the anode

### Discharging (Driving):
- Lithium ions move **from the anode back to the cathode** through the electrolyte
- Electrons flow through the external circuit (powering the electric motor)
- Chemical energy is converted to electrical energy

> **Analogy**: Think of lithium ions as tiny workers carrying energy packages. During charging, they carry packages from one warehouse (cathode) to another (anode). During driving, they carry them back, and the energy released powers the car.

## Battery Chemistries

### LFP — Lithium Iron Phosphate (LiFePO₄)
- **Cost**: Low (~$50-90/kWh)
- **Safety**: Excellent (very resistant to thermal runaway)
- **Cycle Life**: Very long (3,000-5,000+ cycles)
- **Energy Density**: Lower (less range per kg)
- **Used by**: BYD (Blade Battery), Tesla (base models), most Chinese EVs

### NMC — Nickel Manganese Cobalt (LiNiMnCoO₂)
- **Cost**: Higher (~$100-140/kWh)
- **Safety**: Good (but more sensitive to heat)
- **Cycle Life**: Moderate (1,000-2,000 cycles)
- **Energy Density**: High (more range per kg)
- **Used by**: BMW, Mercedes, Hyundai, Tesla (long-range models)

### NCA — Nickel Cobalt Aluminum (LiNiCoAlO₂)
- **Cost**: High
- **Energy Density**: Highest among commercial chemistries
- **Used by**: Tesla (Panasonic cylindrical cells)

## From Cells to Packs

A single battery cell produces approximately **3.2-3.7 volts**. To build a usable battery:

1. **Cells** are grouped into **modules** (typically 6-12 cells)
2. **Modules** are assembled into a **battery pack** (typically 8-20 modules)
3. The pack is sealed, cooled, and integrated into the vehicle floor

A typical EV battery pack contains **thousands of individual cells** and weighs 300-700 kg.

---

> **Key Takeaway**: A lithium-ion battery works by shuttling lithium ions between cathode and anode. LFP is the dominant chemistry for mass-market EVs (cheap, safe, long-lasting), while NMC offers higher energy density for premium vehicles.
`,
                        vocabulary: [
                            { en: "Cathode", es: "Cátodo", definition: "Positive electrode of a battery cell" },
                            { en: "Anode", es: "Ánodo", definition: "Negative electrode (usually graphite)" },
                            { en: "Electrolyte", es: "Electrolito", definition: "Liquid/solid medium that conducts ions" },
                            { en: "Separator", es: "Separador", definition: "Thin membrane preventing electrodes from touching" },
                            { en: "Intercalation", es: "Intercalación", definition: "Insertion of lithium ions between graphite layers" },
                            { en: "LFP (Lithium Iron Phosphate)", es: "Fosfato de Hierro y Litio", definition: "Safe, affordable battery chemistry" },
                            { en: "NMC (Nickel Manganese Cobalt)", es: "Níquel Manganeso Cobalto", definition: "High-energy-density battery chemistry" },
                            { en: "Thermal Runaway", es: "Fuga Térmica", definition: "Dangerous chain reaction causing a battery fire" },
                            { en: "Cycle Life", es: "Vida de Ciclo", definition: "Number of charge-discharge cycles before degradation" },
                            { en: "Short Circuit", es: "Cortocircuito", definition: "Unintended direct connection between electrodes" },
                            { en: "Module", es: "Módulo", definition: "Group of battery cells wired together" },
                            { en: "Battery Pack", es: "Paquete de Baterías", definition: "Complete assembly of modules in a vehicle" }
                        ],
                        questions: [
                            { q: "What are the four main components of a lithium-ion cell?", options: ["Cathode, anode, electrolyte, separator", "Motor, inverter, charger, cable", "Frame, wheels, seats, glass", "Silicon, copper, iron, rubber"], answer: 0 },
                            { q: "What happens during battery discharge (driving)?", options: ["Ions move from anode to cathode through the motor", "Lithium ions move from anode to cathode through the electrolyte, generating electricity", "The battery gets heavier", "Nothing — the battery is static"], answer: 1 },
                            { q: "Which battery chemistry is safest and cheapest?", options: ["NMC", "NCA", "LFP (Lithium Iron Phosphate)", "Lead-acid"], answer: 2 },
                            { q: "Why is the separator important?", options: ["It charges the battery faster", "It prevents a short circuit by keeping cathode and anode apart while allowing ions through", "It stores energy", "It cools the motor"], answer: 1 }
                        ]
                    },
                    {
                        id: "ev-m2-r2",
                        title: "Cell Formats: Cylindrical, Prismatic, and Pouch",
                        duration: "10 min",
                        content: `
# Cell Formats: Cylindrical, Prismatic, and Pouch

Battery cells come in different physical shapes. Each shape has advantages and disadvantages for EV manufacturing.

## The Three Main Formats

### 1. Cylindrical Cells
Shaped like a standard AA battery but larger. Common sizes: **18650** (18mm × 65mm), **2170** (21mm × 70mm), and **4680** (46mm × 80mm).

**Advantages**: Mature manufacturing, excellent thermal management, strong structural integrity.
**Disadvantages**: Wasted space between round cells, many cells needed per pack.

### 2. Prismatic Cells
Rectangular, flat metal cans. **Advantages**: Space efficient, fewer cells per pack. **Disadvantages**: More expensive, can swell under stress.
**Used by**: BYD (Blade Battery), BMW, Volkswagen.

### 3. Pouch Cells
Flat, flexible cells in aluminum-laminated film. **Advantages**: Lightest format, most flexible shape. **Disadvantages**: Least structurally rigid, susceptible to swelling.
**Used by**: LG Energy Solution (for GM, Hyundai), SK Innovation.

## The 4680 Revolution

Tesla's **4680 cell** represents a major industry shift: 5× more energy per cell vs. 2170, 6× more power, 16% more range. However, the **Dry Battery Electrode (DBE)** process proved "way harder than expected." As of 2026, production has ramped but hasn't fully met original promises.

## Cell-to-Pack and Cell-to-Chassis

- **Cell-to-Pack (CTP)**: Eliminate modules. Place cells directly into the pack. BYD's Blade Battery uses this — saving 50% of space.
- **Cell-to-Chassis (CTC)**: The battery pack IS the vehicle floor. Tesla's structural battery in the Model Y is an early example.

These innovations reduce weight, increase range, lower cost, and create new manufacturing jobs.

---

> **Key Takeaway**: Battery cells come in cylindrical, prismatic, and pouch formats. The 4680 cylindrical cell and CTP/CTC integration are reshaping EV manufacturing.
`,
                        vocabulary: [
                            { en: "Cylindrical Cell", es: "Celda Cilíndrica", definition: "Round battery cell (like a large AA battery)" },
                            { en: "Prismatic Cell", es: "Celda Prismática", definition: "Rectangular metal-cased battery cell" },
                            { en: "Pouch Cell", es: "Celda de Bolsa / Pouch", definition: "Flat, flexible battery cell in aluminum film" },
                            { en: "4680 Cell", es: "Celda 4680", definition: "Tesla's large-format cylindrical cell (46mm × 80mm)" },
                            { en: "Tabless Electrode", es: "Electrodo sin Pestaña", definition: "Electrode design reducing internal resistance" },
                            { en: "Cell-to-Pack (CTP)", es: "Celda a Paquete", definition: "Eliminating modules to place cells directly in pack" },
                            { en: "Cell-to-Chassis (CTC)", es: "Celda a Chasis", definition: "Integrating battery directly into vehicle structure" },
                            { en: "Swelling", es: "Hinchamiento", definition: "Expansion of cells due to internal gas or pressure" },
                            { en: "Packing Efficiency", es: "Eficiencia de Empaque", definition: "How well cells fit together without wasted space" },
                            { en: "Dry Battery Electrode", es: "Electrodo Seco", definition: "Manufacturing process eliminating liquid solvents" }
                        ],
                        questions: [
                            { q: "Which cell format is used in Tesla's 4680?", options: ["Cylindrical", "Prismatic", "Pouch", "Flat-pack"], answer: 0 },
                            { q: "What is the main advantage of prismatic cells?", options: ["They are the lightest", "Rectangular shape packs efficiently with minimal gaps", "They are cheapest", "They don't need cooling"], answer: 1 },
                            { q: "What does Cell-to-Pack (CTP) eliminate?", options: ["The battery", "The motor", "The module layer — cells go directly into the pack", "The charger"], answer: 2 },
                            { q: "Why has 4680 manufacturing been difficult?", options: ["The cells are too small", "The Dry Battery Electrode process proved harder than expected to scale", "There is no demand", "Cylindrical cells are obsolete"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 3: Electric Motors and Powertrains
            // -----------------------------------------------------------------
            {
                id: "ev-m3",
                title: "Electric Motors and Powertrains",
                titleES: "Motores Eléctricos y Trenes Motrices",
                icon: "fa-solid fa-gear",
                readings: [
                    {
                        id: "ev-m3-r1",
                        title: "How Electric Motors Work",
                        duration: "10 min",
                        content: `
# How Electric Motors Work

The electric motor converts electrical energy from the battery into mechanical energy that spins the wheels. Electric motors are fundamentally simpler than internal combustion engines — a typical EV motor has approximately **20 moving parts** compared to over **2,000** in a gasoline engine.

## The Basic Principle: Electromagnetism

An electric motor works because of the **Lorentz force**: when you pass electricity through a wire near a magnet, the wire experiences a force. By arranging wires in a circular coil surrounded by magnets, you create continuous rotation.

### Key Components:
1. **Stator** (stationary part): Contains copper wire coils creating a rotating magnetic field
2. **Rotor** (rotating part): Spins inside the stator, connected to the drivetrain
3. **Shaft**: Transfers rotation to wheels through a **reduction gear**

## Types of EV Motors

### 1. PMSM — Permanent Magnet Synchronous Motor
The rotor contains **permanent magnets** (neodymium rare earth). Highest efficiency (90-97%), compact, excellent low-speed torque. Uses expensive rare earth magnets (80% from China).
**Used by**: Tesla (rear motor), BYD, most manufacturers.

### 2. AC Induction Motor
Invented by Nikola Tesla in 1887. No magnets — the stator's field **induces** currents in the rotor. Very robust, lower cost, no rare earth dependency.
**Used by**: Tesla (front motor in dual-motor models).

### 3. Switched Reluctance Motor (SRM)
Simplest design — no magnets, no rotor windings. Extremely cheap but more vibration and noise.

## Why EVs Feel So Fast

Electric motors deliver **100% of their torque instantly** from 0 RPM. A gasoline engine needs to rev up to 3,000-5,000 RPM. This is why even a modest EV accelerates faster off the line than most sports cars.

## Motor Configurations

- **Single motor**: One motor on rear or front axle. Simplest, cheapest.
- **Dual motor**: One per axle. Provides **all-wheel drive (AWD)** without a mechanical driveshaft.
- **Tri-motor**: One front + two rear. Enables **torque vectoring**. Used in Tesla Model S Plaid.

---

> **Key Takeaway**: Electric motors convert electricity to motion using electromagnetism. PMSM motors dominate for efficiency, but induction motors avoid rare earth dependence. EVs deliver instant torque.
`,
                        vocabulary: [
                            { en: "Stator", es: "Estátor", definition: "The stationary part of an electric motor" },
                            { en: "Rotor", es: "Rotor", definition: "The rotating part of an electric motor" },
                            { en: "Torque", es: "Par Motor / Torque", definition: "Rotational force applied to wheels" },
                            { en: "PMSM", es: "Motor Síncrono de Imanes Permanentes", definition: "High-efficiency motor using rare earth magnets" },
                            { en: "Induction Motor", es: "Motor de Inducción", definition: "Motor where rotor current is induced by stator field" },
                            { en: "Rare Earth Elements", es: "Elementos de Tierras Raras", definition: "Minerals like neodymium used in permanent magnets" },
                            { en: "Lorentz Force", es: "Fuerza de Lorentz", definition: "Force on a current-carrying wire in a magnetic field" },
                            { en: "Reduction Gear", es: "Engranaje Reductor", definition: "Single-speed gearbox in EVs" },
                            { en: "Torque Vectoring", es: "Vectorización de Torque", definition: "Sending different power to each wheel" },
                            { en: "All-Wheel Drive (AWD)", es: "Tracción en las Cuatro Ruedas", definition: "Power delivered to all four wheels" },
                            { en: "RPM", es: "RPM (Revoluciones Por Minuto)", definition: "Speed of motor rotation" },
                            { en: "Efficiency", es: "Eficiencia", definition: "Ratio of useful output to total input energy" }
                        ],
                        questions: [
                            { q: "What are the two main parts of an electric motor?", options: ["Battery and inverter", "Stator and rotor", "Cathode and anode", "Engine and transmission"], answer: 1 },
                            { q: "What type of motor uses permanent rare earth magnets?", options: ["PMSM (Permanent Magnet Synchronous Motor)", "Induction Motor", "Switched Reluctance Motor", "Diesel motor"], answer: 0 },
                            { q: "Why do EVs feel faster than gasoline cars from a stop?", options: ["They weigh less", "They have more gears", "Electric motors deliver 100% torque instantly at 0 RPM", "They use jet fuel"], answer: 2 },
                            { q: "What does a dual-motor configuration provide?", options: ["Better fuel economy", "All-wheel drive without a mechanical driveshaft", "Longer battery life", "Reduced cost"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 4: Charging Infrastructure and Standards
            // -----------------------------------------------------------------
            {
                id: "ev-m4",
                title: "Charging Infrastructure and Standards",
                titleES: "Infraestructura de Carga y Estándares",
                icon: "fa-solid fa-charging-station",
                readings: [
                    {
                        id: "ev-m4-r1",
                        title: "EV Charging Levels and Connectors",
                        duration: "10 min",
                        content: `
# EV Charging Levels and Connectors

Understanding how EVs charge is critical for anyone working in the electromobility industry.

## Charging Levels

### Level 1 — Standard Household Outlet
**Power**: 1.2-1.8 kW (120V AC). Adds ~5-8 km of range per hour. Extremely slow — rarely used as primary method.

### Level 2 — Dedicated Home/Workplace Charger
**Power**: 3.3-19.2 kW (240V AC). Adds ~25-50 km of range per hour. Most common method — charge overnight at home.

### Level 3 — DC Fast Charging (DCFC)
**Power**: 50-350+ kW (high-voltage DC). Adds 200-300 km in 20-30 minutes. Used for highway stops and commercial fleets. Stations cost $50,000-$150,000 each.

## Connector Standards (2025-2026)

### NACS / SAE J3400 — The New North American Standard
Originally Tesla's proprietary connector, now officially standardized as **SAE J3400**. As of 2026, NACS is the **unified standard** in North America:
- Single, compact connector for both AC and DC charging
- Supports up to **1,000V DC** and up to **1 MW** power
- All major automakers adopting NACS

### CCS1 — Being Phased Out
Previously the standard for non-Tesla vehicles. Being replaced by NACS.

### CCS2 — European Standard
Remains dominant in Europe (designed for three-phase AC).

### CHAdeMO — Legacy Japanese Standard
Used by early Nissan Leaf. Being phased out globally.

## Charging Curves and Battery Health

Charging is not linear. The battery charges fastest at 10-20% and slows above 80%:
- **10% → 80%**: Fastest (the "sweet spot")
- **80% → 100%**: Much slower — BMS reduces power to protect cells

This is why manufacturers quote "10-80% charging time."

---

> **Key Takeaway**: EV charging comes in three levels. NACS (SAE J3400) is becoming the unified North American standard. Charge to 80% for fastest results.
`,
                        vocabulary: [
                            { en: "Level 1 Charging", es: "Carga Nivel 1", definition: "Slow charging from standard household outlet (120V)" },
                            { en: "Level 2 Charging", es: "Carga Nivel 2", definition: "Medium charging from dedicated 240V charger" },
                            { en: "DC Fast Charging (DCFC)", es: "Carga Rápida DC", definition: "High-power direct-current charging (50-350+ kW)" },
                            { en: "EVSE", es: "Equipo de Suministro EV", definition: "Wall-mounted charging unit with safety features" },
                            { en: "NACS / SAE J3400", es: "NACS / SAE J3400", definition: "North American Charging Standard — the new unified connector" },
                            { en: "CCS", es: "Sistema de Carga Combinada", definition: "Legacy connector standard being phased out in NA" },
                            { en: "Supercharger", es: "Supercargador", definition: "Tesla's DC fast charging network" },
                            { en: "Charging Curve", es: "Curva de Carga", definition: "How charging speed varies with battery state of charge" },
                            { en: "State of Charge (SoC)", es: "Estado de Carga", definition: "Percentage of battery currently full" },
                            { en: "kW (Kilowatt)", es: "kW (Kilovatio)", definition: "Unit of power — how fast energy is delivered" }
                        ],
                        questions: [
                            { q: "Which charging level is fastest?", options: ["Level 1", "Level 2", "Level 3 (DC Fast Charging)", "They are all the same"], answer: 2 },
                            { q: "What is NACS (SAE J3400)?", options: ["A battery chemistry", "A car brand", "The new unified North American charging connector standard", "A type of motor"], answer: 2 },
                            { q: "Why do EV manufacturers quote '10-80% charging time'?", options: ["Because charging slows significantly above 80% to protect battery health", "Because the car can't charge above 80%", "Because the charger breaks at 80%", "Because 80% is the maximum capacity"], answer: 0 },
                            { q: "What does Level 2 charging require?", options: ["No special equipment", "A hydrogen fuel cell", "A dedicated 240V EVSE unit", "A DC fast charger"], answer: 2 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 5: EV Manufacturing Process
            // -----------------------------------------------------------------
            {
                id: "ev-m5",
                title: "EV Manufacturing Process",
                titleES: "Proceso de Manufactura de VE",
                icon: "fa-solid fa-industry",
                readings: [
                    {
                        id: "ev-m5-r1",
                        title: "From Raw Materials to Rolling Car",
                        duration: "10 min",
                        content: `
> **Automotive Quality & Safety Standards Note**: The manufacturing workflows in this reading strictly comply with **IATF 16949** (Automotive Quality Management Systems) and **ISO 26262** (Functional Safety for Road Vehicles). Mastering these protocols is essential for quality control engineers working across OEM plants and Tier-1 suppliers in Mexico's nearshoring corridor.

# From Raw Materials to Rolling Car: The EV Assembly Line

Manufacturing an electric vehicle combines traditional automotive assembly with high-precision electrochemical engineering and high-voltage safety protocols.

## The Five Phases of Industrial Assembly

### Phase 1: Battery Cell Manufacturing (Gigafactory Operations)
Cell production takes place under strict humidity control (<1% RH cleanroom environments) to prevent chemical degradation:
- **Slurry Preparation**: Mixing active cathode/anode powders with solvents into a homogeneous paste.
- **Coating & Calendering**: Applying slurry to current collectors (aluminum for cathode, copper for anode) and passing them through heavy heated rollers for precise thickness control.
- **Slitting & Stacking**: Precision cutting of coated foils into strips and stacking or winding them with separator layers.
- **Electrolyte Injection & Formation**: Sealing cells, injecting liquid electrolyte under vacuum, and performing the initial charge cycle (**Formation**) to build the Solid Electrolyte Interphase (SEI) layer.

### Phase 2: High-Voltage Battery Pack Integration
Cells are sorted by precise internal resistance and capacity before assembly:
- **Laser Welding & Bus Bar Interconnection**: Automated fiber-laser welding connects cell terminals with copper/aluminum **bus bars**.
- **Thermal Interface Materials (TIM)**: Applying thermally conductive gap fillers between cell blocks and aluminum liquid-cooling cold plates.
- **BMS Hardware & Harness Installation**: Integrating cell monitoring units (CMUs) and master **Battery Management Systems (BMS)** certified to **ISO 26262 ASIL-D**.
- **Structural Sealing & Dielectric Inspection**: Pressure testing against IP67/IP69K water ingress and performing high-potential (Hi-Pot) insulation checks at 2,500V DC.

### Phase 3: Electric Powertrain & E-Axle Assembly
Integrating electric traction motors with power electronics into a unified **e-axle** module:
- Hairpin copper stator winding to maximize slot fill factor and torque density.
- Rotor magnet insertion and high-speed dynamic balancing up to 20,000 RPM.
- Inverter assembly with Silicon Carbide (SiC) MOSFET power modules for >98% power conversion efficiency.

### Phase 4: Body-in-White (BIW) and Vehicle Marriage
- **Gigacasting & Stamping**: Large aluminum die-casting machines form major underbody structural sections in single pieces.
- **Robotic Body Joining**: Over 500 industrial robots perform spot welding, self-piercing riveting, and structural adhesive bonding.
- **Automated Painting**: E-coating for corrosion resistance, primer application, and electrostatic robotic color spraying.
- **The "Marriage" Station**: Automated Guided Vehicles (AGVs) lift the fully assembled, 500kg high-voltage battery pack from beneath the chassis, securing it with automated torque-controlled fasteners.

### Phase 5: End-of-Line (EOL) Quality Validation
- **End-of-Line Electrical Testing**: Validating high-voltage interlock loops (HVIL) and insulation resistance under Simulated Load.
- **ADAS & Sensor Calibration**: Calibrating LiDAR, millimeter-wave radar, and camera optics for autonomous driving assistance.
- **Dyno & Shower Testing**: High-pressure water chamber leaks inspection and chassis dynamometer acceleration/braking verification.

## Mexico's Nearshoring Industrial Corridor

The North American supply chain relies heavily on Mexican manufacturing hubs operating under IATF 16949 accreditation:

| Component / Subsystem | Key Mexican Manufacturing States | Industry Standards & Customers |
|-----------------------|----------------------------------|--------------------------------|
| High-Voltage Harnesses | Chihuahua, Sonora, Coahuila | US-CAR / IPC-WHMA-A-620 Standards |
| Battery Pack Enclosures | Nuevo León, Saltillo | Aluminum Extrusion & Laser Sealing |
| Inverters & Power Modules | Querétaro, San Luis Potosí | Automotive ISO 26262 ASIL-D |
| Stamping & Chassis Frame | Aguascalientes, Guanajuato | High-Strength Steel & Gigacasting |

---

> **Key Takeaway**: EV manufacturing merges electrochemical precision with heavy robotic assembly under **IATF 16949** and **ISO 26262** standards. Understanding these five assembly phases and Mexico's nearshoring corridor provides engineers with a competitive edge in global automotive careers.
`,
                        vocabulary: [
                            { en: "Gigafactory", es: "Gigafábrica", definition: "Massive factory dedicated to battery production" },
                            { en: "Electrode", es: "Electrodo", definition: "Cathode or anode component of a battery cell" },
                            { en: "Calendering", es: "Calandrado", definition: "Compressing electrode coating to precise thickness" },
                            { en: "Formation", es: "Formación", definition: "First charge/discharge cycle to activate a battery cell" },
                            { en: "Bus Bar", es: "Barra Colectora", definition: "Thick copper connector linking battery cells" },
                            { en: "E-Axle", es: "Eje Eléctrico", definition: "Integrated unit: motor + inverter + reduction gear" },
                            { en: "Body-in-White", es: "Carrocería en Blanco", definition: "Welded car body before painting" },
                            { en: "Marriage (assembly)", es: "Matrimonio (ensamble)", definition: "Joining battery pack to vehicle body" },
                            { en: "ADAS", es: "ADAS (Asistencia Avanzada)", definition: "Advanced Driver Assistance Systems" },
                            { en: "Dyno Testing", es: "Prueba en Dinamómetro", definition: "Testing vehicle performance on rollers" },
                            { en: "Laser Welding", es: "Soldadura Láser", definition: "High-precision joining using focused light" },
                            { en: "Slurry", es: "Pasta / Suspensión", definition: "Wet mixture of active materials applied to metal foil" }
                        ],
                        questions: [
                            { q: "What is a gigafactory?", options: ["A very large car", "A type of battery", "A massive factory dedicated to battery cell production", "A brand name"], answer: 2 },
                            { q: "What is the 'marriage' in EV assembly?", options: ["Two robots getting paired", "Joining the battery pack to the vehicle body from below", "Painting the car", "Installing the seats"], answer: 1 },
                            { q: "What is calendering in battery manufacturing?", options: ["Compressing electrode coating to precise thickness using rollers", "Cutting the battery into strips", "Testing the battery at high temperature", "Welding cells together"], answer: 0 },
                            { q: "Which EV components are manufactured in Chihuahua and Sonora?", options: ["Wiring harnesses", "Complete batteries", "Car bodies", "Tires"], answer: 0 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 6: BMS — Battery Management Systems
            // -----------------------------------------------------------------
            {
                id: "ev-m6",
                title: "BMS: Battery Management Systems",
                titleES: "Sistemas de Gestión de Baterías (BMS)",
                icon: "fa-solid fa-microchip",
                readings: [
                    {
                        id: "ev-m6-r1",
                        title: "The Brain of the Battery: How BMS Works",
                        duration: "10 min",
                        content: `
# The Brain of the Battery: How BMS Works

A Battery Management System (BMS) is the electronic controller that monitors and manages every aspect of a battery pack. Without a BMS, lithium-ion batteries would be dangerous and unreliable.

## Why BMS Is Critical

Lithium-ion batteries operate within narrow safety margins:
- **Overcharging** (above ~4.2V per cell) → thermal runaway risk
- **Over-discharging** (below ~2.5V) → permanent damage
- **Overheating** (above ~60°C) → accelerated degradation
- **Overcooling** (below -20°C) → lithium plating risk

## Core Functions

### 1. Cell Voltage Monitoring
Measures **every individual cell's** voltage. Can reduce power or disconnect battery via **contactors** if limits exceeded.

### 2. Temperature Monitoring
Controls liquid cooling circuits, heating elements, and fans to maintain optimal temperature.

### 3. State of Charge (SoC) Estimation
The battery's "fuel gauge." Estimated using **coulomb counting** (tracking current flow), voltage-based estimation, and **Kalman filtering** (advanced algorithm).

### 4. State of Health (SoH)
Tracks capacity loss over time. A new 77 kWh battery might hold only 65 kWh after 5 years. Used for warranty claims and used car valuations.

### 5. Cell Balancing
- **Passive balancing**: Excess energy dissipated as heat (simple, wastes energy)
- **Active balancing**: Energy transferred between cells (efficient, expensive)

### 6. Communication
BMS communicates via **CAN bus** protocol with the vehicle control unit, motor inverter, charger, and dashboard.

## BMS Architecture Types
- **Centralized**: One controller, all cells wired to it (small packs)
- **Distributed**: Small boards per module reporting to master (most EVs)
- **Modular**: Each module has full BMS (buses, commercial vehicles)

---

> **Key Takeaway**: The BMS monitors voltage, temperature, charge state, and health of every cell. It is the most critical electronic system in an EV.
`,
                        vocabulary: [
                            { en: "BMS (Battery Management System)", es: "Sistema de Gestión de Baterías", definition: "Electronic controller monitoring all battery functions" },
                            { en: "State of Charge (SoC)", es: "Estado de Carga", definition: "Percentage of battery energy remaining" },
                            { en: "State of Health (SoH)", es: "Estado de Salud", definition: "Remaining capacity vs. original capacity" },
                            { en: "Cell Balancing", es: "Balanceo de Celdas", definition: "Equalizing energy across cells in a pack" },
                            { en: "Contactor", es: "Contactor", definition: "High-voltage relay that connects/disconnects battery" },
                            { en: "Coulomb Counting", es: "Conteo de Coulombs", definition: "Tracking current flow to estimate charge level" },
                            { en: "Thermal Runaway", es: "Fuga Térmica", definition: "Uncontrolled temperature rise causing battery failure" },
                            { en: "Lithium Plating", es: "Deposición de Litio", definition: "Metallic lithium forming on anode in cold conditions" },
                            { en: "CAN Bus", es: "Bus CAN", definition: "Communication protocol between vehicle systems" },
                            { en: "Passive Balancing", es: "Balanceo Pasivo", definition: "Wasting excess energy as heat to equalize cells" },
                            { en: "Active Balancing", es: "Balanceo Activo", definition: "Transferring energy between cells to equalize them" },
                            { en: "ISO 26262", es: "ISO 26262", definition: "Functional safety standard for automotive electronics" }
                        ],
                        questions: [
                            { q: "What happens if a lithium-ion cell is overcharged?", options: ["It charges faster", "It lasts longer", "It can cause thermal runaway and fire", "Nothing"], answer: 2 },
                            { q: "What is State of Charge (SoC)?", options: ["The percentage of battery energy remaining", "The total capacity of the battery", "The temperature of the battery", "The voltage of the motor"], answer: 0 },
                            { q: "What is the difference between passive and active cell balancing?", options: ["They are the same", "Passive wastes excess energy as heat; active transfers energy between cells", "Passive is more expensive", "Active uses no electricity"], answer: 1 },
                            { q: "Which protocol does the BMS use to communicate with the vehicle?", options: ["Wi-Fi", "Bluetooth", "CAN Bus", "USB"], answer: 2 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 7: Regenerative Braking and Energy Recovery
            // -----------------------------------------------------------------
            {
                id: "ev-m7",
                title: "Regenerative Braking and Energy Recovery",
                titleES: "Frenado Regenerativo y Recuperación de Energía",
                icon: "fa-solid fa-bolt",
                readings: [
                    {
                        id: "ev-m7-r1",
                        title: "Turning Braking into Range",
                        duration: "10 min",
                        content: `
> **Automotive Standards Note**: Regenerative braking and torque vectoring systems in electric vehicles are engineered under **SAE J3012** (Energy Recovery Testing Standards) and **ISO 26262 ASIL-D** brake-by-wire functional safety requirements.

# Turning Braking into Range: Regenerative Braking Engineering

One of the most elegant engineering breakthroughs of electric powertrains is **regenerative braking** — an active energy recovery mechanism that transforms momentum back into chemical energy stored within the battery pack.

## Electromagnetic Physics & Energy Conversion Dynamics

Regenerative braking relies on **Faraday's Law of Electromagnetic Induction** and **Lenz's Law**. When a driver lifts their foot off the accelerator or depresses the brake pedal:

1. **Inverter Phase Switching**: The Silicon Carbide (SiC) inverter adjusts the pulse-width modulation (PWM) signals to shift stator magnetic field phase angles behind rotor rotation.
2. **Kinetic Energy Conversion**: The spinning vehicle wheels turn the permanent-magnet rotor inside the electric motor, transforming the motor into a three-phase AC generator.
3. **Rectification & High-Voltage Charging**: The generated AC electricity flows back through the inverter bridge diodes, rectifying into DC current to recharge the high-voltage battery at rates up to 250 kW.
4. **Counter-Electromotive Force (Back-EMF)**: Magnetic drag created inside the motor generates smooth, controllable retarding torque to decelerate the vehicle without mechanical friction.

## One-Pedal Driving & Brake-by-Wire Integration

Modern EVs integrate advanced **Brake-by-Wire (BbW)** hydraulic units to execute **Blended Braking**:

- **Deceleration Decoupling**: The brake pedal is not mechanically connected to the hydraulic calipers during normal deceleration. An electronic pedal simulator measures driver force and sends requests to the Vehicle Control Unit (VCU).
- **Smooth Torque Blending**: The VCU prioritizes 100% regenerative braking up to the motor's thermal and charge acceptance limits. Friction brakes engage seamlessly only when additional stopping power is required.
- **Component Longevity**: Because 80-90% of urban deceleration is handled electromagnetically, friction brake pads experience up to **80% less mechanical wear**, extending maintenance cycles to over 150,000 kilometers.

## Energy Recovery Efficiency Across Driving Profiles

| Real-World Driving Environment | Regenerative Kinetic Recovery Rate | Total EV Range Extension |
|--------------------------------|------------------------------------|--------------------------|
| Urban Stop-and-Go Traffic | 28% - 35% Recovery Rate | +20% to +30% Range |
| Mountain Slope Descent | 45% - 60% Recovery Rate | +35% Potential Range |
| High-Speed Highway Cruising | 5% - 12% Recovery Rate | +3% to +8% Range |

---

> **Key Takeaway**: Regenerative braking utilizes Faraday's law to convert kinetic energy into DC battery charge via inverter phase control. Governed by **ISO 26262 ASIL-D** brake-by-wire safety standards, it extends vehicle range by up to 30% and reduces mechanical brake wear.
`,
                        vocabulary: [
                            { en: "Regenerative Braking", es: "Frenado Regenerativo", definition: "Recovery of kinetic energy as electricity during braking" },
                            { en: "Electromagnetic Induction", es: "Inducción Electromagnética", definition: "Generating electricity by moving a conductor through a magnetic field" },
                            { en: "One-Pedal Driving", es: "Conducción de un Solo Pedal", definition: "Driving mode where lifting the accelerator causes strong deceleration" },
                            { en: "Blended Braking", es: "Frenado Combinado", definition: "Combining regenerative and friction braking seamlessly" },
                            { en: "Kinetic Energy", es: "Energía Cinética", definition: "Energy of a moving object" },
                            { en: "Generator Mode", es: "Modo Generador", definition: "Motor operating in reverse to produce electricity" },
                            { en: "Friction Braking", es: "Frenado por Fricción", definition: "Traditional brakes using pads pressing against rotors" },
                            { en: "Regen Limit", es: "Límite de Regeneración", definition: "When the battery cannot accept regenerative energy" },
                            { en: "Faraday's Law", es: "Ley de Faraday", definition: "Physical law governing electromagnetic induction" },
                            { en: "Brake Pad", es: "Pastilla de Freno", definition: "Component that presses against the rotor to create friction" }
                        ],
                        questions: [
                            { q: "How does regenerative braking work?", options: ["It uses extra gasoline", "The motor acts as a generator, converting kinetic energy back to electricity", "It uses solar panels", "It adds weight to the car"], answer: 1 },
                            { q: "What is one-pedal driving?", options: ["Strong regenerative braking that decelerates the car when you lift the accelerator", "Driving with only one foot", "A car with one pedal", "Emergency braking"], answer: 0 },
                            { q: "How much extra range does regenerative braking typically add?", options: ["50-80%", "15-25%", "1-2%", "100%"], answer: 1 },
                            { q: "When is regenerative braking limited?", options: ["When driving uphill", "When the battery is full, very cold, or the BMS limits charging", "When the car is new", "Never"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 8: Thermal Management in Electric Vehicles
            // -----------------------------------------------------------------
            {
                id: "ev-m8",
                title: "Thermal Management in Electric Vehicles",
                titleES: "Gestión Térmica en Vehículos Eléctricos",
                icon: "fa-solid fa-temperature-high",
                readings: [
                    {
                        id: "ev-m8-r1",
                        title: "Keeping the Battery at the Right Temperature",
                        duration: "10 min",
                        content: `
> **EV Thermal Safety Standard Note**: Automotive Thermal Management Systems (BTMS) are designed according to **SAE J2990** (Hybrid and EV Emergency Response & Thermal Mitigation) and **UL 2580** (Batteries for Use in Electric Vehicles) to guarantee thermal runaway containment.

# Thermal Management Engineering in Electric Powertrains

Temperature is a lithium-ion battery's most critical operational constraint. **Battery Thermal Management Systems (BTMS)** regulate electrochemical temperatures to ensure cell longevity, ultrafast charging capability, and occupant safety.

## The Electrochemical Temperature Spectrum (The 15-35°C Window)

| Operational Temperature Zone | Electrochemical Reaction Behavior | System Risk & Degradation Mechanism |
|------------------------------|-----------------------------------|------------------------------------|
| Below -20°C | High electrolyte viscosity & internal impedance | **Lithium Plating**: Metallic dendrites short-circuit separator |
| -10°C to 15°C | Reduced ion mobility | Slower DC fast charging & 20-35% cabin range drop |
| **15°C to 35°C** | **Optimal Intercalation Kinetics** | **Peak Efficiency, Maximum Cycle Life & Full Power** |
| 35°C to 45°C | Accelerated SEI layer growth | Solid Electrolyte Interphase breakdown & capacity fade |
| Above 60°C | Exothermic chemical decomposition | **Thermal Runaway Risk**: Gas generation & cell vent fire |

## Thermal Management Architecture & Fluid Dynamics

### 1. Indirect Liquid Cooling (Industry Benchmark)
A closed-loop **water-glycol (50/50 mixture)** circuit circulates through aluminum cooling plates with micro-channels integrated directly below cell modules:
- **Chiller Heat Exchanger**: Couples the battery cooling loop with the vehicle's HVAC refrigeration loop to chill coolant below ambient outdoor temperature during 350 kW DC fast charging.
- **PTC Heaters & Heat Pumps**: High-voltage Positive Temperature Coefficient (PTC) heaters warm coolant to precondition batteries before fast charging in freezing climates.

### 2. Heat Pump Thermodynamic Systems (Vapor Injection)
Modern EVs use multi-way valve heat pumps with Coefficient of Performance (COP) ratings between **2.5 and 4.0**. By extracting ambient energy and waste heat from the motor inverter, heat pumps consume up to **75% less battery power** for cabin heating compared to resistive heaters.

### 3. Direct Immersion Cooling (Next-Gen High Performance)
Cells are completely submerged in non-conductive, dielectric synthetic fluids (e.g., fluorinated hydrocarbons). Immersion cooling delivers **10× higher heat transfer coefficients** than cold plates, enabling 0-80% ultra-fast charging in under 8 minutes without localized hot spots.

---

> **Key Takeaway**: BTMS maintains battery temperature within 15-35°C using liquid cooling plates, heat pumps, and dielectric fluids. Compliant with **SAE J2990** and **UL 2580**, effective thermal engineering prevents degradation and thermal runaway risks.
`,
                        vocabulary: [
                            { en: "Thermal Management", es: "Gestión Térmica", definition: "Controlling temperature of EV components" },
                            { en: "Coolant", es: "Refrigerante", definition: "Liquid (water-glycol) circulating to absorb heat" },
                            { en: "Radiator", es: "Radiador", definition: "Heat exchanger that dissipates heat to the air" },
                            { en: "Chiller", es: "Enfriador", definition: "Refrigeration unit that cools liquid below ambient temperature" },
                            { en: "Heat Pump", es: "Bomba de Calor", definition: "Efficient device extracting heat from air for heating" },
                            { en: "Battery Preconditioning", es: "Preacondicionamiento de Batería", definition: "Warming battery before fast charging" },
                            { en: "Dielectric Fluid", es: "Fluido Dieléctrico", definition: "Non-conductive liquid used in immersion cooling" },
                            { en: "Lithium Plating", es: "Deposición de Litio", definition: "Dangerous metallic lithium forming on anode in cold" },
                            { en: "Thermal Runaway", es: "Fuga Térmica", definition: "Uncontrolled temperature chain reaction" },
                            { en: "Degradation", es: "Degradación", definition: "Gradual loss of battery capacity over time" }
                        ],
                        questions: [
                            { q: "What is the optimal temperature range for lithium-ion batteries?", options: ["-10°C to 0°C", "0°C to 10°C", "15°C to 35°C", "45°C to 60°C"], answer: 2 },
                            { q: "What is battery preconditioning?", options: ["Replacing the battery", "Warming the battery to optimal temperature before fast charging", "Testing the battery", "Draining the battery"], answer: 1 },
                            { q: "Why is cold weather problematic for EVs?", options: ["The motor freezes", "The battery loses range, charges slowly, and risks lithium plating", "The tires deflate", "The paint cracks"], answer: 1 },
                            { q: "What advantage does a heat pump have over resistive heaters?", options: ["It is cheaper to install", "It uses 2-3× less energy for the same heating effect", "It works without electricity", "It only works in summer"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 9: High-Voltage Safety Protocols
            // -----------------------------------------------------------------
            {
                id: "ev-m9",
                title: "High-Voltage Safety Protocols",
                titleES: "Protocolos de Seguridad de Alto Voltaje",
                icon: "fa-solid fa-triangle-exclamation",
                readings: [
                    {
                        id: "ev-m9-r1",
                        title: "Working Safely with High-Voltage Systems",
                        duration: "10 min",
                        content: `
# Working Safely with High-Voltage Systems

Electric vehicles operate at **400-800 volts DC** — enough to cause **fatal electrocution**. Working on HV systems requires specialized training and strict safety protocols.

## Understanding the Danger

At 400V with wet skin (10,000 ohms): Current = 400/10,000 = **40 mA** — in the lethal zone.

| Current | Effect on Human Body |
|---------|---------------------|
| 1 mA | Slight tingling |
| 10-20 mA | Can't let go (muscular contraction) |
| 50-100 mA | **Ventricular fibrillation (potentially fatal)** |
| 100+ mA | Cardiac arrest, severe burns |

## The Color Code: Orange = High Voltage

All high-voltage cables, connectors, and components are marked with **bright orange** covers (ISO 6722). If you see orange cables, STOP and verify the system is de-energized.

## De-Energization: Lockout/Tagout (LOTO)

1. **Turn off** the vehicle, remove key
2. **Disconnect 12V** auxiliary battery
3. **Remove service disconnect plug** (breaks HV circuit)
4. **Wait 5-10 minutes** for capacitors to discharge
5. **Verify zero voltage** with Category III/IV rated multimeter
6. **Apply lockout/tagout** — lock and warning tag on disconnect

## Personal Protective Equipment (PPE)

| PPE | Spec | Purpose |
|-----|------|---------|
| Insulated HV gloves | Class 0 (1,000V) | Hand protection |
| Leather protectors | Over insulated gloves | Mechanical protection |
| Safety glasses | Impact-rated | Eye protection |
| Insulated tools | IEC 60900 (1,000V) | Prevent shorts |
| Insulated floor mat | HV-rated rubber | Prevent ground path |

## ISO 26262 and ASIL Levels

**ISO 26262** defines ASIL levels A (lowest) to D (highest risk):
- Battery disconnect: **ASIL D** (most critical)
- Charging control: **ASIL C**
- Dashboard warnings: **ASIL B**

---

> **Key Takeaway**: EV high-voltage systems (400-800V) are lethal. Orange = HV. Always follow LOTO procedures and wear rated PPE. ISO 26262 governs functional safety.
`,
                        vocabulary: [
                            { en: "High Voltage (HV)", es: "Alto Voltaje (AV)", definition: "Electrical systems above 60V DC or 30V AC" },
                            { en: "Electrocution", es: "Electrocución", definition: "Injury or death from electric shock" },
                            { en: "Lockout/Tagout (LOTO)", es: "Bloqueo/Etiquetado", definition: "Procedure to ensure HV systems are safely de-energized" },
                            { en: "Service Disconnect", es: "Desconexión de Servicio", definition: "Physical plug that breaks the HV circuit" },
                            { en: "Multimeter", es: "Multímetro", definition: "Instrument measuring voltage, current, resistance" },
                            { en: "PPE", es: "EPP (Equipo de Protección Personal)", definition: "Safety gear worn by workers" },
                            { en: "Arc Flash", es: "Arco Eléctrico", definition: "Explosion of energy from an electrical fault" },
                            { en: "ASIL", es: "Nivel de Integridad de Seguridad Automotriz", definition: "Risk classification under ISO 26262" },
                            { en: "Contactor", es: "Contactor", definition: "High-voltage relay in the battery system" },
                            { en: "Ventricular Fibrillation", es: "Fibrilación Ventricular", definition: "Lethal irregular heartbeat caused by electric shock" },
                            { en: "Rescue Sheet", es: "Hoja de Rescate", definition: "Document showing first responders safe cut zones" },
                            { en: "Capacitor Discharge", es: "Descarga de Capacitor", definition: "Waiting for stored electrical charge to dissipate" }
                        ],
                        questions: [
                            { q: "What color identifies high-voltage cables in EVs?", options: ["Red", "Blue", "Orange", "Green"], answer: 2 },
                            { q: "What is the first step in de-energizing an EV?", options: ["Turn off the vehicle and remove the key", "Cut the orange cables", "Open the hood", "Call the fire department"], answer: 0 },
                            { q: "How much current is potentially lethal?", options: ["1,000 mA", "50-100 mA can cause ventricular fibrillation", "Only above 10 amps", "Any amount is safe"], answer: 1 },
                            { q: "What is ASIL D under ISO 26262?", options: ["The lowest safety level", "The highest safety integrity level for the most critical systems", "A battery chemistry", "A type of insulated glove"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 10: Mexico's EV Industry and Career Paths
            // -----------------------------------------------------------------
            {
                id: "ev-m10",
                title: "Mexico's EV Industry and Career Paths",
                titleES: "La Industria EV de México y Trayectorias Profesionales",
                icon: "fa-solid fa-road",
                readings: [
                    {
                        id: "ev-m10-r1",
                        title: "Mexico's Electromobility Landscape",
                        duration: "10 min",
                        content: `
# Mexico's Electromobility Landscape

Mexico is at the center of a historic automotive transformation. As the world's seventh-largest vehicle producer and Latin America's largest, Mexico's EV transition is essential for the country's economic future.

## Current Landscape (2025-2026)

- Electrified vehicles account for ~**12.5%** of Mexico's light vehicle sales
- BYD, Tesla, MG (SAIC), and JAC are leading EV brands
- Mexico produces ~**4 million vehicles** per year with 28 assembly plants and 900+ suppliers

## The Nearshoring Opportunity

The **USMCA (T-MEC)** requires 75% regional content for duty-free vehicles. This creates massive incentives for EV component manufacturing in Mexico:

| Component | Nearshoring Potential | Key States |
|-----------|----------------------|------------|
| Battery module assembly | High | Nuevo León, Coahuila |
| Wiring harnesses | Very High | Chihuahua, Sonora |
| Power electronics | Growing | Querétaro, Puebla |
| Electric motor assembly | Medium | Guanajuato, EdoMex |
| Charging equipment | Emerging | Jalisco, Nuevo León |

## Career Paths

### 1. Battery Technician
Assembles, tests, and repairs battery packs. Requires HV safety training (ISO 26262). Salary: MXN $15,000-25,000/month.

### 2. EV Manufacturing Engineer
Designs and optimizes assembly line processes. Works with robots and welding systems. Salary: MXN $30,000-55,000/month.

### 3. Charging Infrastructure Technician
Installs and maintains Level 2 and DC fast charging stations. Requires NOM-001-SEDE and NACS knowledge. Fast-growing field.

### 4. BMS Software Engineer
Develops firmware for Battery Management Systems in C/C++. Works with CAN bus and ISO 26262. Salary: MXN $45,000-80,000/month.

### 5. Quality Control Specialist
Applies IATF 16949 (automotive quality), tests with SPC and X-ray inspection. Ensures NACS compliance.

## The Importance of Technical English

In Mexico's EV sector, **English is the operational language**: all quality documentation, machine interfaces, SOPs, and global video conferences are in English. Technical certifications (SAE, ISO, IPC) are administered in English.

---

> **Key Takeaway**: Mexico's automotive industry is transitioning to EV manufacturing. Nearshoring and USMCA create thousands of new jobs. Technical English is the key skill separating entry-level workers from global specialists.
`,
                        vocabulary: [
                            { en: "USMCA", es: "T-MEC", definition: "US-Mexico-Canada trade agreement (successor to NAFTA)" },
                            { en: "Tier 1 Supplier", es: "Proveedor Nivel 1", definition: "Company that supplies directly to automakers" },
                            { en: "IATF 16949", es: "IATF 16949", definition: "Automotive quality management standard" },
                            { en: "NOM", es: "NOM (Norma Oficial Mexicana)", definition: "Mexican official technical standard" },
                            { en: "Firmware", es: "Firmware", definition: "Low-level software controlling electronic hardware" },
                            { en: "SPC", es: "Control Estadístico de Procesos", definition: "Using statistics to monitor manufacturing quality" },
                            { en: "SOP", es: "Procedimiento Operativo Estándar", definition: "Step-by-step work instruction" },
                            { en: "Charging Infrastructure", es: "Infraestructura de Carga", definition: "Network of EV charging stations" },
                            { en: "Regional Content", es: "Contenido Regional", definition: "Percentage of vehicle parts made in USMCA region" },
                            { en: "Duty-Free", es: "Libre de Aranceles", definition: "Exempt from import taxes" }
                        ],
                        questions: [
                            { q: "What trade agreement creates incentives for EV manufacturing in Mexico?", options: ["NAFTA", "USMCA (T-MEC)", "EU Free Trade", "OPEC"], answer: 1 },
                            { q: "What percentage of vehicle sales in Mexico are electrified (2026)?", options: ["50%", "1%", "Approximately 12.5%", "90%"], answer: 2 },
                            { q: "Which Mexican states lead in wiring harness manufacturing?", options: ["Chihuahua and Sonora", "Quintana Roo and Yucatán", "Oaxaca and Chiapas", "Mexico City"], answer: 0 },
                            { q: "Why is technical English critical in Mexico's EV industry?", options: ["Mexican laws require it", "All quality documentation, machine interfaces, and global communications are in English", "English is Mexico's official language", "It's not important"], answer: 1 }
                        ]
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // TRACK 4: IT & DIGITAL INNOVATION (FULL CONTENT)
    // =========================================================================
    "it-innovation": {
        id: "it-innovation",
        title: "Tecnologías de la Información e Innovación Digital",
        titleEN: "Information Technology & Digital Innovation",
        level: "A2-B1",
        status: "full",
        description: "English for IT professionals — cloud computing, software development, databases, DevOps, and digital transformation.",
        descriptionES: "Inglés para profesionales de TI — computación en la nube, desarrollo de software, bases de datos, DevOps y transformación digital.",
        totalModules: 10,
        estimatedHours: 20,
        prerequisites: ["esp-foundation"],
        standard: "CONOCER EC0217.01",
        conocer: "EC0217.01 (Capacitación Digital y Cloud)",
        ngss: "HS-ETS1-4 (Computer Modeling & Cloud Infrastructure)",
        industry: "AWS CLF-C02 / Google Cloud CDL / CompTIA A+",
        modules: [
            // -----------------------------------------------------------------
            // MODULE 1: Introduction to Information Technology
            // -----------------------------------------------------------------
            {
                id: "it-m1",
                title: "Introduction to Information Technology",
                titleES: "Introducción a las Tecnologías de la Información",
                icon: "fa-solid fa-laptop-code",
                readings: [
                    {
                        id: "it-m1-r1",
                        title: "What Is Information Technology?",
                        duration: "10 min",
                        content: `
# What Is Information Technology?

Information Technology — or **IT** — is everywhere. Every time you use your phone, make a purchase online, send a message, or take a class, you are interacting with IT systems. But what exactly does IT mean as a career field?

## A Working Definition

**Information Technology** is the use of computers, networks, software, and electronic systems to store, process, protect, and transmit information. IT is the infrastructure that makes modern business, education, healthcare, and government work.

Think of IT as the "nervous system" of any organization — it connects everything and keeps information flowing.

## The Five Pillars of IT

### 1. Hardware
The physical devices: servers, laptops, routers, switches, monitors, keyboards, mobile devices. Without hardware, there is no IT.

### 2. Software
The programs and operating systems that run on hardware: Windows, Linux, macOS, mobile apps, enterprise applications like SAP or Salesforce.

### 3. Networking
Connecting devices so they can communicate — LANs, WANs, the internet, Wi-Fi, VPNs. This is the "plumbing" of IT.

### 4. Data & Databases
Storing, organizing, and retrieving information. From a simple spreadsheet to massive cloud databases holding billions of records.

### 5. Security
Protecting all of the above from unauthorized access, attacks, and data loss. Cybersecurity is one of the fastest-growing IT specialties.

## The Cloud Revolution

The most significant shift in IT over the past decade is the move from **on-premises** (servers in your office) to **cloud computing** (servers in someone else's data center, accessed via the internet).

| Traditional IT | Cloud IT |
|----------------|----------|
| Buy and maintain your own servers | Rent computing power on demand |
| High upfront capital expense | Pay-as-you-go operating expense |
| Limited by physical capacity | Scale up or down instantly |
| You manage everything | Cloud provider manages infrastructure |

The three major cloud providers are:
- **AWS** (Amazon Web Services) — ~31% market share
- **Microsoft Azure** — ~25% market share  
- **Google Cloud Platform (GCP)** — ~11% market share

## IT in Mexico's Nearshoring Landscape

Mexico is one of the top IT outsourcing destinations in the Americas:
- **Guadalajara** is called "Mexico's Silicon Valley" — home to Intel, Oracle, IBM, and hundreds of startups
- **Monterrey** leads in enterprise IT services and fintech
- **Mexico City** is Latin America's largest tech hub with 10,000+ tech companies
- **Querétaro** and **Aguascalientes** are emerging data center hubs

By 2026, Mexico has approximately **700,000 IT professionals**, but the industry needs **1.2 million** — creating a massive talent gap and career opportunity.

---

> **Key Takeaway**: IT is the infrastructure that powers modern organizations. The shift to cloud computing and Mexico's nearshoring boom are creating unprecedented career opportunities for bilingual tech professionals.
`,
                        vocabulary: [
                            { en: "Information Technology (IT)", es: "Tecnologías de la Información (TI)", definition: "Use of computers and systems to manage information" },
                            { en: "Hardware", es: "Hardware", definition: "Physical computer equipment and devices" },
                            { en: "Software", es: "Software", definition: "Programs and applications running on hardware" },
                            { en: "Cloud Computing", es: "Computación en la Nube", definition: "Using remote servers via internet instead of local machines" },
                            { en: "On-Premises", es: "En Sitio / Local", definition: "IT infrastructure physically located at the organization" },
                            { en: "Server", es: "Servidor", definition: "A computer that provides services to other computers" },
                            { en: "VPN", es: "Red Privada Virtual", definition: "Encrypted tunnel for secure internet access" },
                            { en: "Data Center", es: "Centro de Datos", definition: "A facility housing many servers and networking equipment" },
                            { en: "Operating System", es: "Sistema Operativo", definition: "Core software managing hardware (Windows, Linux, macOS)" },
                            { en: "Scalability", es: "Escalabilidad", definition: "Ability to grow or shrink resources as needed" },
                            { en: "Capital Expense (CapEx)", es: "Gasto de Capital", definition: "Large upfront investment in physical assets" },
                            { en: "Pay-as-you-go", es: "Pago por Uso", definition: "Paying only for resources consumed" }
                        ],
                        questions: [
                            { q: "What are the five pillars of IT?", options: ["Hardware, Software, Networking, Data, Security", "Speed, Cost, Design, Marketing, Sales", "CPU, RAM, Disk, Screen, Keyboard", "Java, Python, C++, SQL, HTML"], answer: 0 },
                            { q: "What is the main difference between on-premises and cloud IT?", options: ["Cloud is slower", "On-premises uses the internet; cloud does not", "Cloud rents computing power remotely; on-premises owns physical servers locally", "There is no difference"], answer: 2 },
                            { q: "Which is the largest cloud provider by market share?", options: ["Google Cloud", "Microsoft Azure", "AWS (Amazon Web Services)", "IBM Cloud"], answer: 2 },
                            { q: "Why is Mexico's IT sector growing rapidly?", options: ["IT is declining globally", "Nearshoring demand creates a massive talent gap (700K workers vs 1.2M needed)", "Mexico invented cloud computing", "IT jobs don't require English"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 2: Cloud Computing: AWS, Azure, and GCP
            // -----------------------------------------------------------------
            {
                id: "it-m2",
                title: "Cloud Computing: AWS, Azure, and GCP",
                titleES: "Computación en la Nube: AWS, Azure y GCP",
                icon: "fa-solid fa-cloud",
                readings: [
                    {
                        id: "it-m2-r1",
                        title: "Cloud Service Models: IaaS, PaaS, SaaS",
                        duration: "10 min",
                        content: `
# Cloud Service Models: IaaS, PaaS, SaaS

Understanding cloud computing starts with understanding the three fundamental service models. Think of it like ordering food:

## The Pizza Analogy

| Model | Pizza Analogy | What you manage | What the provider manages |
|-------|--------------|-----------------|--------------------------|
| **On-Premises** | Make pizza at home | Everything | Nothing |
| **IaaS** | Buy ingredients, cook at home | OS, apps, data | Servers, storage, networking |
| **PaaS** | Take-and-bake pizza | Just your app and data | Everything else |
| **SaaS** | Eat at a restaurant | Nothing | Everything |

## IaaS — Infrastructure as a Service

You rent **virtual machines**, storage, and networks. You install your own operating system and software.

**Examples**: AWS EC2, Azure Virtual Machines, Google Compute Engine.
**Use case**: A company migrating their existing servers to the cloud.

## PaaS — Platform as a Service

The provider gives you a **complete development platform**. You just write and deploy your code — no servers to configure.

**Examples**: Google App Engine, AWS Elastic Beanstalk, Azure App Service.
**Use case**: A startup quickly building a web application without managing infrastructure.

## SaaS — Software as a Service

A complete **application** delivered through your browser. No installation, no maintenance.

**Examples**: Gmail, Microsoft 365, Salesforce, Slack, Zoom.
**Use case**: An office team using cloud email and productivity tools.

## The Shared Responsibility Model

This is a critical concept: security in the cloud is **shared** between the customer and the cloud provider.

- **Provider responsibility**: Physical security of data centers, hardware maintenance, network infrastructure, hypervisor patching.
- **Customer responsibility**: Data encryption, access management (IAM), application security, operating system patches (for IaaS).

> **Rule of thumb**: Security **OF** the cloud = provider. Security **IN** the cloud = customer.

## The Well-Architected Framework

AWS popularized the **Well-Architected Framework** with six pillars:
1. **Operational Excellence** — run and monitor systems effectively
2. **Security** — protect information and systems
3. **Reliability** — recover from failures, meet demand
4. **Performance Efficiency** — use resources efficiently
5. **Cost Optimization** — avoid unnecessary spending
6. **Sustainability** — minimize environmental impact

---

> **Key Takeaway**: IaaS gives you virtual hardware, PaaS gives you a development platform, SaaS gives you ready-to-use applications. Security responsibility is always shared between customer and provider.
`,
                        vocabulary: [
                            { en: "IaaS (Infrastructure as a Service)", es: "Infraestructura como Servicio", definition: "Renting virtual servers, storage, and networking" },
                            { en: "PaaS (Platform as a Service)", es: "Plataforma como Servicio", definition: "Ready-to-use platform for deploying applications" },
                            { en: "SaaS (Software as a Service)", es: "Software como Servicio", definition: "Complete application accessible via browser" },
                            { en: "Virtual Machine (VM)", es: "Máquina Virtual", definition: "Software emulation of a physical computer" },
                            { en: "Shared Responsibility Model", es: "Modelo de Responsabilidad Compartida", definition: "Security duties split between provider and customer" },
                            { en: "IAM (Identity and Access Management)", es: "Gestión de Identidad y Acceso", definition: "Controlling who can access which resources" },
                            { en: "Hypervisor", es: "Hipervisor", definition: "Software creating and managing virtual machines" },
                            { en: "Well-Architected Framework", es: "Marco de Buena Arquitectura", definition: "Best practices for cloud architecture design" },
                            { en: "Data Encryption", es: "Cifrado de Datos", definition: "Converting data to unreadable format for security" },
                            { en: "Elasticity", es: "Elasticidad", definition: "Ability to automatically scale resources up or down" }
                        ],
                        questions: [
                            { q: "What does SaaS stand for?", options: ["Server as a System", "Software as a Service", "Storage as a Solution", "Security as a Standard"], answer: 1 },
                            { q: "In the Shared Responsibility Model, who is responsible for data encryption?", options: ["Only the cloud provider", "Only the government", "The customer", "Nobody"], answer: 2 },
                            { q: "Which service model gives you the MOST control?", options: ["SaaS", "PaaS", "IaaS (you manage OS, apps, data)", "All give equal control"], answer: 2 },
                            { q: "What is the pizza analogy for PaaS?", options: ["Make pizza at home from scratch", "Take-and-bake — the platform is ready, you add your toppings (code)", "Eat at a restaurant", "Order delivery"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 3: Software Development Fundamentals
            // -----------------------------------------------------------------
            {
                id: "it-m3",
                title: "Software Development Fundamentals",
                titleES: "Fundamentos de Desarrollo de Software",
                icon: "fa-solid fa-code",
                readings: [
                    {
                        id: "it-m3-r1",
                        title: "The Software Development Life Cycle (SDLC)",
                        duration: "10 min",
                        content: `
# The Software Development Life Cycle (SDLC)

Building software is not just about writing code. Professional software development follows a structured process called the **Software Development Life Cycle (SDLC)**.

## The Six Phases

### 1. Planning & Requirements
Define **what** the software should do. Gather requirements from stakeholders (users, managers, clients). Document features, constraints, and success criteria.

### 2. Design
Create the **architecture** — how the system will be structured. Design the database schema, API endpoints, user interface mockups, and system diagrams.

### 3. Development (Coding)
Write the actual code using programming languages like **Python, JavaScript, Java, C#**, or **Go**. This is usually the longest phase.

### 4. Testing
Verify that the software works correctly:
- **Unit tests**: Test individual functions
- **Integration tests**: Test how components work together
- **End-to-end tests**: Test the full user experience
- **Security tests**: Check for vulnerabilities

### 5. Deployment
Release the software to users. This can be:
- **On-premises** installation
- **Cloud deployment** (AWS, Azure, GCP)
- **App store** submission (mobile)

### 6. Maintenance
Fix bugs, add new features, apply security patches. This phase lasts the entire lifetime of the software — often years or decades.

## Methodologies: Agile vs. Waterfall

### Waterfall (Linear)
Each phase must be **completed before** the next one starts. Like a waterfall flowing down — you can't go back upstream easily.

**Best for**: Regulated industries (medical devices, aerospace) where requirements are fixed and documentation is critical.

### Agile (Iterative)
Work in short **sprints** (1-4 weeks). Each sprint delivers a small, working increment. Requirements can change between sprints.

**Best for**: Web/mobile apps, startups, rapidly changing products.

| Feature | Waterfall | Agile |
|---------|-----------|-------|
| Flexibility | Low | High |
| Documentation | Heavy | Lightweight |
| Delivery | One final release | Continuous small releases |
| Customer feedback | At the end | Every sprint |

### Scrum (Most Popular Agile Framework)
- **Sprint**: 2-4 week work cycle
- **Daily Standup**: 15-minute meeting — what did you do yesterday? What will you do today? Any blockers?
- **Sprint Review**: Demo the work to stakeholders
- **Retrospective**: What went well? What to improve?

## Programming Paradigms

- **Object-Oriented (OOP)**: Code organized around "objects" with data and methods. Java, Python, C#.
- **Functional**: Code organized around pure functions. Haskell, Elixir, JavaScript (functional style).
- **Procedural**: Step-by-step instructions. C, Bash scripts.

---

> **Key Takeaway**: Professional software development follows the SDLC (plan → design → code → test → deploy → maintain). Agile/Scrum dominates modern teams; Waterfall suits regulated industries.
`,
                        vocabulary: [
                            { en: "SDLC", es: "Ciclo de Vida del Desarrollo de Software", definition: "Structured process for building software" },
                            { en: "Requirements", es: "Requisitos / Requerimientos", definition: "What the software must do (functional and non-functional)" },
                            { en: "Architecture", es: "Arquitectura", definition: "High-level structure and design of a system" },
                            { en: "API (Application Programming Interface)", es: "Interfaz de Programación de Aplicaciones", definition: "Set of rules for software to communicate" },
                            { en: "Agile", es: "Ágil", definition: "Iterative methodology with short sprints" },
                            { en: "Waterfall", es: "Cascada", definition: "Linear, sequential development methodology" },
                            { en: "Sprint", es: "Sprint", definition: "A fixed work cycle (1-4 weeks) in Agile" },
                            { en: "Scrum", es: "Scrum", definition: "Most popular Agile framework with sprints and standups" },
                            { en: "Unit Test", es: "Prueba Unitaria", definition: "Test for a single function or component" },
                            { en: "Deployment", es: "Despliegue", definition: "Releasing software to production" },
                            { en: "Stakeholder", es: "Parte Interesada", definition: "Anyone with interest in the project (users, managers)" },
                            { en: "Retrospective", es: "Retrospectiva", definition: "Meeting to reflect on what went well and what to improve" }
                        ],
                        questions: [
                            { q: "What are the six phases of the SDLC?", options: ["Planning, Design, Development, Testing, Deployment, Maintenance", "Start, Code, Ship, Sell, Scale, Exit", "Think, Write, Run, Break, Fix, Repeat", "Hire, Build, Launch, Grow, Pivot, Exit"], answer: 0 },
                            { q: "When is Waterfall methodology most appropriate?", options: ["For startups", "For social media apps", "For regulated industries where requirements are fixed (medical, aerospace)", "For all projects"], answer: 2 },
                            { q: "What is a Sprint in Scrum?", options: ["A programming language", "A fixed work cycle of 1-4 weeks delivering working software", "A type of server", "Running code faster"], answer: 1 },
                            { q: "What is the purpose of a Daily Standup?", options: ["Physical exercise", "A 15-minute meeting to share progress, plans, and blockers", "A code review session", "A customer demo"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 4: Databases and Data Management
            // -----------------------------------------------------------------
            {
                id: "it-m4",
                title: "Databases and Data Management",
                titleES: "Bases de Datos y Gestión de Datos",
                icon: "fa-solid fa-database",
                readings: [
                    {
                        id: "it-m4-r1",
                        title: "SQL vs NoSQL: Choosing the Right Database",
                        duration: "10 min",
                        content: `
# SQL vs NoSQL: Choosing the Right Database

Every application needs to store data. The type of database you choose determines how your data is organized, how fast you can access it, and how well it scales.

## Relational Databases (SQL)

**Relational databases** store data in structured **tables** with rows and columns — like a spreadsheet. Each table has a fixed **schema** (structure) defined in advance.

**SQL** (Structured Query Language) is the language used to create, read, update, and delete data. Example:

\`\`\`sql
SELECT name, email FROM users WHERE country = 'Mexico';
\`\`\`

### Key Properties: ACID
- **Atomicity**: Transactions are all-or-nothing
- **Consistency**: Data always follows rules
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data survives crashes

**Examples**: PostgreSQL, MySQL, Microsoft SQL Server, Oracle.
**Best for**: Financial systems, inventory, ERP, anything needing strict data integrity.

## Non-Relational Databases (NoSQL)

**NoSQL** databases store data in flexible formats — not limited to tables. "NoSQL" means "Not Only SQL."

### Types of NoSQL Databases:

| Type | Structure | Example | Best For |
|------|-----------|---------|----------|
| **Document** | JSON-like documents | MongoDB, Firestore | User profiles, content management |
| **Key-Value** | Simple key→value pairs | Redis, DynamoDB | Caching, sessions, real-time data |
| **Graph** | Nodes and relationships | Neo4j | Social networks, recommendation engines |
| **Wide-Column** | Column families | Apache Cassandra | IoT data, time-series at massive scale |

### Key Properties: BASE
- **Basically Available**: System always responds
- **Soft State**: Data may be temporarily inconsistent
- **Eventually Consistent**: All copies will sync eventually

## SQL vs NoSQL Decision Framework

| Factor | Choose SQL | Choose NoSQL |
|--------|-----------|-------------|
| Data structure | Fixed, well-defined schema | Flexible, evolving schema |
| Relationships | Complex relationships between tables | Simple or no relationships |
| Scaling | Vertical (bigger server) | Horizontal (more servers) |
| Transactions | ACID required (banking, finance) | Eventual consistency OK (social media) |

## The Modern Reality: Polyglot Persistence

In 2026, most applications use **multiple database types** simultaneously:
- **PostgreSQL** for billing and orders (ACID transactions)
- **MongoDB** for user profiles (flexible documents)
- **Redis** for caching and real-time features (speed)
- **Neo4j** for social graphs and AI recommendations (relationships)

---

> **Key Takeaway**: SQL databases enforce structure and integrity (ACID). NoSQL databases offer flexibility and scale (BASE). Modern applications often use both — this is called polyglot persistence.
`,
                        vocabulary: [
                            { en: "Database", es: "Base de Datos", definition: "Organized collection of structured data" },
                            { en: "SQL", es: "SQL (Lenguaje de Consulta Estructurado)", definition: "Language for managing relational databases" },
                            { en: "Schema", es: "Esquema", definition: "The defined structure of a database (tables, columns, types)" },
                            { en: "NoSQL", es: "NoSQL", definition: "Non-relational database types (document, key-value, graph)" },
                            { en: "ACID", es: "ACID", definition: "Properties ensuring reliable database transactions" },
                            { en: "Document Database", es: "Base de Datos Documental", definition: "NoSQL database storing JSON-like documents" },
                            { en: "Key-Value Store", es: "Almacén Clave-Valor", definition: "Simplest NoSQL model — lookup by key" },
                            { en: "Graph Database", es: "Base de Datos de Grafos", definition: "Database optimized for relationship traversal" },
                            { en: "Query", es: "Consulta", definition: "A request to retrieve or modify data" },
                            { en: "Horizontal Scaling", es: "Escalamiento Horizontal", definition: "Adding more servers to handle load" },
                            { en: "Polyglot Persistence", es: "Persistencia Políglota", definition: "Using multiple database types in one application" },
                            { en: "Caching", es: "Caché / Almacenamiento en Caché", definition: "Storing frequently accessed data in fast memory" }
                        ],
                        questions: [
                            { q: "What does ACID stand for?", options: ["Application, Code, Interface, Design", "Atomicity, Consistency, Isolation, Durability", "Access, Cloud, Internet, Data", "Automated, Cached, Indexed, Distributed"], answer: 1 },
                            { q: "Which database type is best for flexible, schema-less data like user profiles?", options: ["Relational SQL", "Document NoSQL (e.g., MongoDB)", "Spreadsheet", "File system"], answer: 1 },
                            { q: "What is polyglot persistence?", options: ["Using only one database", "Using multiple database types in the same application for different needs", "A programming language", "A cloud service"], answer: 1 },
                            { q: "When should you choose SQL over NoSQL?", options: ["When data has no structure", "When you need strict transactions and data integrity (ACID)", "When scaling horizontally is the priority", "When speed matters more than accuracy"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 5: DevOps and CI/CD Pipelines
            // -----------------------------------------------------------------
            {
                id: "it-m5",
                title: "DevOps and CI/CD Pipelines",
                titleES: "DevOps y Pipelines CI/CD",
                icon: "fa-solid fa-infinity",
                readings: [
                    {
                        id: "it-m5-r1",
                        title: "What Is DevOps? Breaking Down the Wall",
                        duration: "10 min",
                        content: `
# What Is DevOps? Breaking Down the Wall

Traditionally, software teams were split into two groups: **Developers** (who write code) and **Operations** (who deploy and maintain systems). These groups often had conflicting goals — developers wanted to ship features fast, while operations wanted stability. This created a "wall" between them.

**DevOps** is a culture, set of practices, and toolchain that breaks down this wall. The name combines "Development" + "Operations."

## Core DevOps Principles

### 1. Continuous Integration (CI)
Every developer pushes code to a shared repository **multiple times per day**. Each push triggers automated builds and tests. If anything breaks, the team knows within minutes.

### 2. Continuous Delivery (CD)
Code that passes all tests is **automatically prepared** for deployment. A human approves the final release.

### 3. Continuous Deployment
Goes one step further — code that passes tests is **automatically deployed** to production. No human approval needed. Used by Netflix, Amazon, Google.

### 4. Infrastructure as Code (IaC)
Define servers, networks, and configurations in **code files** (YAML, JSON, HCL) instead of manually clicking through dashboards. Tools: **Terraform**, AWS CloudFormation.

## The CI/CD Pipeline

A pipeline is an automated sequence of stages that code passes through:

\`\`\`
Code → Build → Test → Security Scan → Deploy to Staging → Deploy to Production
\`\`\`

### Key Tools (2026):

| Category | Tool | Purpose |
|----------|------|---------|
| CI/CD Platform | **GitHub Actions** (~33% market) | Automate build, test, deploy |
| CI/CD Platform | **Jenkins** (~28% market) | Self-hosted, highly customizable |
| Version Control | **Git / GitHub** | Track code changes, collaborate |
| IaC | **Terraform** | Define cloud infrastructure as code |
| Monitoring | **Prometheus + Grafana** | Monitor application performance |

## DevOps Metrics (DORA)

The **DORA metrics** measure DevOps team performance:
- **Deployment Frequency**: How often you deploy (elite: multiple times per day)
- **Lead Time for Changes**: Code commit to production (elite: < 1 hour)
- **Change Failure Rate**: % of deployments causing issues (elite: < 5%)
- **Time to Restore Service**: How fast you fix failures (elite: < 1 hour)

---

> **Key Takeaway**: DevOps unifies development and operations through CI/CD automation. GitHub Actions and Jenkins are the leading CI/CD tools. DORA metrics measure team performance.
`,
                        vocabulary: [
                            { en: "DevOps", es: "DevOps", definition: "Culture and practices unifying Development and Operations" },
                            { en: "CI (Continuous Integration)", es: "Integración Continua", definition: "Automatically building and testing code on every push" },
                            { en: "CD (Continuous Delivery/Deployment)", es: "Entrega/Despliegue Continuo", definition: "Automatically preparing or deploying code to production" },
                            { en: "Pipeline", es: "Pipeline / Tubería", definition: "Automated sequence of build, test, deploy stages" },
                            { en: "Infrastructure as Code (IaC)", es: "Infraestructura como Código", definition: "Defining servers and networks in code files" },
                            { en: "Version Control", es: "Control de Versiones", definition: "Tracking changes to code over time (Git)" },
                            { en: "Repository", es: "Repositorio", definition: "A storage location for code and its history" },
                            { en: "Build", es: "Compilación / Build", definition: "Converting source code into runnable software" },
                            { en: "Staging Environment", es: "Entorno de Pruebas", definition: "Pre-production environment for final testing" },
                            { en: "DORA Metrics", es: "Métricas DORA", definition: "Industry-standard DevOps performance measurements" },
                            { en: "Terraform", es: "Terraform", definition: "Popular Infrastructure as Code tool by HashiCorp" },
                            { en: "Deployment Frequency", es: "Frecuencia de Despliegue", definition: "How often new code reaches production" }
                        ],
                        questions: [
                            { q: "What problem does DevOps solve?", options: ["Making code run faster", "Breaking the wall between Development and Operations teams", "Replacing all servers with cloud", "Eliminating the need for testing"], answer: 1 },
                            { q: "What is the difference between Continuous Delivery and Continuous Deployment?", options: ["They are the same", "Delivery requires human approval before production; Deployment is fully automatic", "Deployment is slower", "Delivery is only for mobile apps"], answer: 1 },
                            { q: "What is Infrastructure as Code (IaC)?", options: ["Writing code on physical servers", "Defining infrastructure (servers, networks) in code files instead of manual configuration", "A programming language", "A type of database"], answer: 1 },
                            { q: "Which DORA metric measures how often you deploy?", options: ["Lead Time", "Change Failure Rate", "Deployment Frequency", "Time to Restore"], answer: 2 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 6: Containerization: Docker and Kubernetes
            // -----------------------------------------------------------------
            {
                id: "it-m6",
                title: "Containerization: Docker and Kubernetes",
                titleES: "Contenedores: Docker y Kubernetes",
                icon: "fa-solid fa-box-archive",
                readings: [
                    {
                        id: "it-m6-r1",
                        title: "Docker: Packaging Applications in Containers",
                        duration: "10 min",
                        content: `
# Docker: Packaging Applications in Containers

One of the most common problems in software is: "It works on my machine, but not in production." Docker solves this problem.

## What Is a Container?

A **container** is a lightweight, standalone package that includes everything an application needs to run: code, runtime, libraries, and system settings. Unlike a virtual machine, containers share the host operating system's kernel, making them much smaller and faster.

> **Analogy**: If a virtual machine is like an entire apartment (with its own plumbing, electricity, walls), a container is like a shipping container — standardized, portable, and stackable.

## Docker Architecture

| Component | Purpose |
|-----------|---------|
| **Dockerfile** | Recipe — instructions to build an image |
| **Image** | Blueprint — a read-only template with everything to run the app |
| **Container** | Running instance of an image |
| **Docker Hub** | Public registry of pre-built images |

## Kubernetes: Orchestrating Containers at Scale

When you have hundreds or thousands of containers, you need a system to manage them. **Kubernetes** (K8s) is that system.

### What Kubernetes Does:
- **Scheduling**: Decides which server runs which container
- **Scaling**: Automatically adds containers when traffic increases
- **Self-healing**: Restarts crashed containers automatically
- **Load balancing**: Distributes traffic across containers
- **Rolling updates**: Deploy new versions without downtime

### Key Kubernetes Concepts:

| Concept | Definition |
|---------|-----------|
| **Pod** | Smallest deployable unit (1+ containers) |
| **Node** | A physical or virtual machine running pods |
| **Cluster** | A group of nodes managed by Kubernetes |
| **Service** | Stable network endpoint for accessing pods |
| **Deployment** | Declarative description of desired state |

## GitOps: The Modern Deployment Pattern

**GitOps** treats Git as the "single source of truth" for infrastructure. Tools like **Argo CD** continuously monitor the Git repository and automatically synchronize the Kubernetes cluster to match.

---

> **Key Takeaway**: Docker packages applications in portable containers. Kubernetes orchestrates containers at scale with scheduling, scaling, and self-healing. GitOps uses Git as the source of truth for deployments.
`,
                        vocabulary: [
                            { en: "Container", es: "Contenedor", definition: "Lightweight, portable package with everything an app needs" },
                            { en: "Docker", es: "Docker", definition: "Platform for building and running containers" },
                            { en: "Image", es: "Imagen", definition: "Read-only template used to create containers" },
                            { en: "Dockerfile", es: "Dockerfile", definition: "Recipe file with instructions to build an image" },
                            { en: "Kubernetes (K8s)", es: "Kubernetes (K8s)", definition: "Container orchestration platform" },
                            { en: "Pod", es: "Pod", definition: "Smallest deployable unit in Kubernetes" },
                            { en: "Cluster", es: "Clúster", definition: "Group of machines managed together" },
                            { en: "Orchestration", es: "Orquestación", definition: "Automated management of multiple containers" },
                            { en: "Load Balancing", es: "Balanceo de Carga", definition: "Distributing traffic across multiple servers" },
                            { en: "Rolling Update", es: "Actualización Gradual", definition: "Deploying new versions without downtime" },
                            { en: "GitOps", es: "GitOps", definition: "Using Git as single source of truth for infrastructure" },
                            { en: "Self-healing", es: "Auto-reparación", definition: "Automatically restarting failed containers" }
                        ],
                        questions: [
                            { q: "What problem does Docker solve?", options: ["Making code run faster", "The 'works on my machine' problem — ensuring identical environments everywhere", "Replacing the internet", "Creating new programming languages"], answer: 1 },
                            { q: "What is the difference between a Docker image and a container?", options: ["They are the same", "An image is a blueprint; a container is a running instance of that image", "A container is larger", "An image runs on the internet"], answer: 1 },
                            { q: "What does Kubernetes do when a container crashes?", options: ["Nothing", "Sends an email", "Automatically restarts it (self-healing)", "Deletes all data"], answer: 2 },
                            { q: "What is a Pod in Kubernetes?", options: ["A database", "The smallest deployable unit containing one or more containers", "A type of server", "A programming language"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 7: Cybersecurity Architecture in Cloud
            // -----------------------------------------------------------------
            {
                id: "it-m7",
                title: "Cybersecurity Architecture in Cloud",
                titleES: "Arquitectura de Ciberseguridad en la Nube",
                icon: "fa-solid fa-shield",
                readings: [
                    {
                        id: "it-m7-r1",
                        title: "Securing the Cloud: Zero Trust and Defense in Depth",
                        duration: "10 min",
                        content: `
# Securing the Cloud: Zero Trust and Defense in Depth

Moving to the cloud does not automatically make your data secure. In fact, the #1 cause of cloud breaches is **misconfiguration** — humans accidentally leaving doors open.

## The Zero Trust Model

Traditional security used a "castle and moat" approach: trust everything inside the network, block everything outside. **Zero Trust** flips this:

> **"Never trust, always verify."**

Every request — whether from inside or outside the network — must be authenticated, authorized, and encrypted.

### Zero Trust Principles:
1. **Verify explicitly**: Authenticate using multiple signals (identity, location, device health)
2. **Least privilege access**: Give users only the minimum permissions they need
3. **Assume breach**: Design systems assuming attackers are already inside

## Defense in Depth (Layered Security)

Security is implemented in **multiple layers** so that if one layer fails, others still protect:

| Layer | Controls |
|-------|----------|
| **Physical** | Data center security, biometrics, guards |
| **Network** | Firewalls, VPNs, network segmentation |
| **Identity** | IAM, MFA (Multi-Factor Authentication), SSO |
| **Application** | Input validation, secure coding, OWASP Top 10 |
| **Data** | Encryption at rest and in transit, DLP, backup |
| **Monitoring** | SIEM, intrusion detection, log analysis |

## Common Cloud Security Threats

1. **Misconfiguration**: S3 buckets left public, open ports, default passwords
2. **Credential theft**: Phishing, password reuse, leaked API keys
3. **Ransomware**: Malware encrypting data and demanding payment
4. **Supply chain attacks**: Compromised third-party libraries
5. **Insider threats**: Employees with malicious intent or negligence

## MFA (Multi-Factor Authentication)

Requires **two or more** verification factors:
- **Something you know**: Password
- **Something you have**: Phone, hardware key (YubiKey)
- **Something you are**: Fingerprint, face scan

---

> **Key Takeaway**: Cloud security follows Zero Trust ("never trust, always verify") and Defense in Depth (multiple layers). Misconfiguration is the #1 cause of cloud breaches. MFA is essential.
`,
                        vocabulary: [
                            { en: "Zero Trust", es: "Confianza Cero", definition: "Security model: never trust, always verify" },
                            { en: "Defense in Depth", es: "Defensa en Profundidad", definition: "Multiple layers of security controls" },
                            { en: "MFA (Multi-Factor Authentication)", es: "Autenticación Multifactor", definition: "Requiring multiple verification methods" },
                            { en: "Firewall", es: "Cortafuegos / Firewall", definition: "Network security device filtering traffic" },
                            { en: "Encryption", es: "Cifrado / Encriptación", definition: "Converting data to unreadable format" },
                            { en: "Least Privilege", es: "Privilegio Mínimo", definition: "Giving users only necessary permissions" },
                            { en: "Misconfiguration", es: "Mala Configuración", definition: "Incorrectly set security settings" },
                            { en: "Ransomware", es: "Ransomware / Secuestro de Datos", definition: "Malware that encrypts data and demands payment" },
                            { en: "Phishing", es: "Phishing / Suplantación", definition: "Fake emails tricking users into revealing credentials" },
                            { en: "SIEM", es: "SIEM", definition: "Security Information and Event Management system" },
                            { en: "OWASP Top 10", es: "OWASP Top 10", definition: "The 10 most critical web application security risks" },
                            { en: "SSO (Single Sign-On)", es: "Inicio de Sesión Único", definition: "One login grants access to multiple systems" }
                        ],
                        questions: [
                            { q: "What is the core principle of Zero Trust?", options: ["Trust everyone inside the network", "Never trust, always verify every request", "Only use firewalls", "Block all internet access"], answer: 1 },
                            { q: "What is the #1 cause of cloud security breaches?", options: ["Hackers breaking encryption", "Misconfiguration (humans leaving settings open)", "Hardware failure", "Solar flares"], answer: 1 },
                            { q: "What are the three factors in MFA?", options: ["Speed, cost, and reliability", "Something you know, have, and are", "Email, phone, and fax", "CPU, RAM, and disk"], answer: 1 },
                            { q: "What does 'Least Privilege' mean?", options: ["Everyone gets full access", "Users receive only the minimum permissions needed for their role", "Nobody has any access", "Only managers have access"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 8: Artificial Intelligence & ML Engineering
            // -----------------------------------------------------------------
            {
                id: "it-m8",
                title: "Artificial Intelligence & ML Engineering",
                titleES: "Inteligencia Artificial e Ingeniería de ML",
                icon: "fa-solid fa-brain",
                readings: [
                    {
                        id: "it-m8-r1",
                        title: "Understanding AI, Machine Learning, and LLMs",
                        duration: "10 min",
                        content: `
# Understanding AI, Machine Learning, and LLMs

Artificial Intelligence is transforming every industry. Understanding the hierarchy — AI → ML → Deep Learning → LLMs — is essential for any IT professional.

## The AI Hierarchy

### 1. Artificial Intelligence (AI)
The broadest term — any system that can perform tasks normally requiring human intelligence: understanding language, recognizing images, making decisions.

### 2. Machine Learning (ML)
A subset of AI where systems **learn from data** instead of being explicitly programmed. The system finds patterns in data and uses them to make predictions.

**Three types**:
- **Supervised Learning**: Train with labeled data (input → correct output). Example: spam detection.
- **Unsupervised Learning**: Find hidden patterns in unlabeled data. Example: customer segmentation.
- **Reinforcement Learning**: Learn by trial and error with rewards. Example: game-playing AI.

### 3. Deep Learning
A subset of ML using **neural networks** with many layers. Inspired by the human brain but works very differently. Excels at images, audio, text, and video.

### 4. Foundation Models / LLMs
**Large Language Models** are neural networks trained on massive text datasets. They predict the next word in a sequence, but this simple mechanism enables remarkable capabilities:
- **GPT-4**, **Gemini**, **Claude** — text generation, reasoning, coding
- **DALL-E**, **Midjourney** — image generation
- **Whisper** — speech recognition

## The Transformer Architecture

Most modern AI is built on the **Transformer** (introduced in 2017). Key innovation: **Self-Attention** — the model can look at all words in a sentence simultaneously to understand context, rather than reading word-by-word.

## Key AI Engineering Skills (2026)

| Skill | Description |
|-------|-------------|
| **Prompt Engineering** | Crafting effective instructions for LLMs |
| **RAG** | Retrieval-Augmented Generation — connecting LLMs to private data |
| **Fine-tuning** | Adapting a pre-trained model to a specific domain |
| **Agentic AI** | Systems that plan, call tools, and execute autonomously |
| **Evaluation** | Measuring model output quality systematically |

## AI in Mexico's Tech Sector

Mexico's AI ecosystem is growing rapidly:
- **Nearshoring AI operations** — US companies building AI teams in Guadalajara and Mexico City
- **AI in manufacturing** — predictive maintenance, quality inspection, demand forecasting
- **Spanish-language NLP** — massive opportunity for bilingual ML engineers

---

> **Key Takeaway**: AI → ML → Deep Learning → LLMs. Transformers power modern AI. Key skills include prompt engineering, RAG, and agentic AI. Mexico's bilingual workforce is uniquely positioned for AI careers.
`,
                        vocabulary: [
                            { en: "Artificial Intelligence (AI)", es: "Inteligencia Artificial (IA)", definition: "Systems performing tasks requiring human-like intelligence" },
                            { en: "Machine Learning (ML)", es: "Aprendizaje Automático", definition: "Systems that learn patterns from data" },
                            { en: "Deep Learning", es: "Aprendizaje Profundo", definition: "ML using multi-layer neural networks" },
                            { en: "LLM (Large Language Model)", es: "Modelo de Lenguaje Grande", definition: "AI trained on massive text to generate human-like responses" },
                            { en: "Neural Network", es: "Red Neuronal", definition: "Computing system inspired by biological brain structure" },
                            { en: "Transformer", es: "Transformer", definition: "Neural network architecture using self-attention" },
                            { en: "Self-Attention", es: "Auto-Atención", definition: "Mechanism allowing model to weigh relationships between all words" },
                            { en: "RAG", es: "Generación Aumentada por Recuperación", definition: "Connecting LLMs to external data sources" },
                            { en: "Prompt Engineering", es: "Ingeniería de Prompts", definition: "Crafting effective instructions for AI models" },
                            { en: "Fine-tuning", es: "Ajuste Fino", definition: "Adapting a pre-trained model for a specific task" },
                            { en: "Supervised Learning", es: "Aprendizaje Supervisado", definition: "Training with labeled input-output pairs" },
                            { en: "Agentic AI", es: "IA Agéntica", definition: "AI systems that plan, act, and use tools autonomously" }
                        ],
                        questions: [
                            { q: "What is the correct hierarchy from broadest to most specific?", options: ["LLM → ML → AI → Deep Learning", "AI → Machine Learning → Deep Learning → LLMs", "Deep Learning → AI → ML → LLM", "They are all the same"], answer: 1 },
                            { q: "What does an LLM fundamentally do?", options: ["Understands human emotions", "Predicts the next word/token in a sequence", "Stores all human knowledge", "Thinks like a human brain"], answer: 1 },
                            { q: "What is RAG (Retrieval-Augmented Generation)?", options: ["A programming language", "Connecting LLMs to external private data sources for better answers", "A type of database", "Random Access Generation"], answer: 1 },
                            { q: "Why is Mexico well-positioned for AI careers?", options: ["Mexico invented AI", "Bilingual workforce + nearshoring demand + growing Spanish NLP market", "AI doesn't require English", "Mexican universities are the oldest"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 9: Data Pipelines and Big Data
            // -----------------------------------------------------------------
            {
                id: "it-m9",
                title: "Data Pipelines and Big Data",
                titleES: "Pipelines de Datos y Big Data",
                icon: "fa-solid fa-diagram-project",
                readings: [
                    {
                        id: "it-m9-r1",
                        title: "Moving Data at Scale: ETL, Streaming, and Data Lakes",
                        duration: "10 min",
                        content: `
# Moving Data at Scale: ETL, Streaming, and Data Lakes

Modern organizations generate enormous volumes of data — from IoT sensors, user clicks, transactions, social media, and machine logs. **Data pipelines** are the systems that collect, transform, and deliver this data to where it's needed.

## What Is a Data Pipeline?

A data pipeline is an automated workflow that moves data from **sources** (where data is created) through **transformations** (cleaning, enriching, formatting) to **destinations** (where data is consumed — dashboards, AI models, databases).

## ETL vs ELT

### ETL — Extract, Transform, Load
1. **Extract** data from sources (databases, APIs, files)
2. **Transform** data (clean, filter, aggregate) in a processing engine
3. **Load** transformed data into a data warehouse

Traditional approach. Best when data needs heavy cleaning before storage.

### ELT — Extract, Load, Transform
1. **Extract** data from sources
2. **Load** raw data directly into a data lake or cloud warehouse
3. **Transform** inside the warehouse using SQL

Modern approach. Best with powerful cloud warehouses (BigQuery, Snowflake, Redshift).

## Batch vs. Streaming

| Processing Type | How It Works | Latency | Use Case |
|----------------|--------------|---------|----------|
| **Batch** | Process large volumes on schedule (hourly, daily) | Minutes to hours | Monthly reports, training ML models |
| **Streaming** | Process events in real-time as they arrive | Milliseconds to seconds | Fraud detection, live dashboards, IoT |

**Tools**: Apache Kafka (streaming), Apache Spark (batch + streaming), Apache Airflow (orchestration).

## Data Storage Architectures

### Data Warehouse
- **Structured** data only
- Optimized for **SQL queries** and reporting
- Examples: Snowflake, Google BigQuery, Amazon Redshift

### Data Lake
- **Raw** data in any format (structured, semi-structured, unstructured)
- Storage is cheap; processing happens on demand
- Examples: AWS S3 + Athena, Azure Data Lake, Google Cloud Storage

### Data Lakehouse
- **Combines** warehouse structure with lake flexibility
- Query raw and structured data in one platform
- Examples: Databricks Delta Lake, Apache Iceberg

## The Five V's of Big Data

1. **Volume** — how much data (terabytes, petabytes)
2. **Velocity** — how fast data arrives (real-time streaming)
3. **Variety** — different formats (JSON, CSV, images, logs)
4. **Veracity** — accuracy and trustworthiness of data
5. **Value** — business insights extracted from data

---

> **Key Takeaway**: Data pipelines move data from sources to destinations. ETL transforms first; ELT loads first. Streaming handles real-time data; batch handles bulk processing. Modern architectures use data lakehouses.
`,
                        vocabulary: [
                            { en: "Data Pipeline", es: "Pipeline de Datos", definition: "Automated workflow moving data from source to destination" },
                            { en: "ETL (Extract, Transform, Load)", es: "ETL (Extraer, Transformar, Cargar)", definition: "Traditional data processing pattern" },
                            { en: "ELT (Extract, Load, Transform)", es: "ELT (Extraer, Cargar, Transformar)", definition: "Modern pattern — load raw, transform in warehouse" },
                            { en: "Data Warehouse", es: "Almacén de Datos", definition: "Storage optimized for structured data and queries" },
                            { en: "Data Lake", es: "Lago de Datos", definition: "Storage for raw data in any format" },
                            { en: "Data Lakehouse", es: "Lakehouse de Datos", definition: "Hybrid combining warehouse and lake features" },
                            { en: "Batch Processing", es: "Procesamiento por Lotes", definition: "Processing large data volumes on a schedule" },
                            { en: "Stream Processing", es: "Procesamiento en Tiempo Real", definition: "Processing data events as they arrive" },
                            { en: "Apache Kafka", es: "Apache Kafka", definition: "Platform for real-time data streaming" },
                            { en: "Big Data", es: "Big Data / Macrodatos", definition: "Extremely large datasets requiring special tools" },
                            { en: "Schema-on-Read", es: "Esquema en Lectura", definition: "Structure applied when reading data (data lake approach)" },
                            { en: "Orchestration", es: "Orquestación", definition: "Coordinating and scheduling pipeline workflows" }
                        ],
                        questions: [
                            { q: "What is the main difference between ETL and ELT?", options: ["They are the same", "ETL transforms before loading; ELT loads raw data first, then transforms", "ELT is older", "ETL only works with NoSQL"], answer: 1 },
                            { q: "When should you use streaming instead of batch processing?", options: ["For monthly reports", "When you need real-time processing (fraud detection, live dashboards)", "When data is small", "Never — batch is always better"], answer: 1 },
                            { q: "What is a Data Lakehouse?", options: ["A physical building", "A hybrid architecture combining data warehouse structure with data lake flexibility", "A type of database", "A programming language"], answer: 1 },
                            { q: "What are the Five V's of Big Data?", options: ["Volume, Velocity, Variety, Veracity, Value", "Very, Vast, Variable, Volatile, Vague", "Version, Vendor, Virtual, Visible, Valid", "None of the above"], answer: 0 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 10: Digital Transformation and Industry 4.0
            // -----------------------------------------------------------------
            {
                id: "it-m10",
                title: "Digital Transformation and Industry 4.0",
                titleES: "Transformación Digital e Industria 4.0",
                icon: "fa-solid fa-robot",
                readings: [
                    {
                        id: "it-m10-r1",
                        title: "Industry 4.0: The Smart Factory Revolution",
                        duration: "10 min",
                        content: `
# Industry 4.0: The Smart Factory Revolution

**Industry 4.0** refers to the fourth industrial revolution — the transformation of manufacturing through digital technologies.

## The Four Industrial Revolutions

| Revolution | Era | Key Technology |
|-----------|-----|---------------|
| Industry 1.0 | 1760s | Steam power, mechanization |
| Industry 2.0 | 1870s | Electricity, assembly lines |
| Industry 3.0 | 1970s | Computers, automation, PLCs |
| **Industry 4.0** | **2010s+** | **IoT, AI, cloud, digital twins** |

## Nine Pillars of Industry 4.0

### 1. Industrial IoT (IIoT)
Sensors on every machine collect real-time data — temperature, vibration, speed, pressure. A modern factory may have **10,000+ connected sensors**.

### 2. Cloud & Edge Computing
Cloud stores and processes data centrally. **Edge computing** processes data locally (at the sensor) for ultra-low latency decisions.

### 3. Big Data & Analytics
Analyzing manufacturing data to predict failures, optimize quality, and reduce waste.

### 4. Artificial Intelligence
AI inspects product quality (computer vision), optimizes supply chains, and predicts maintenance needs.

### 5. Digital Twins
A **digital twin** is a virtual replica of a physical machine or production line. Engineers can simulate changes, test scenarios, and predict failures — without touching the real system.

### 6. Autonomous Robots
Collaborative robots (**cobots**) work alongside humans. AGVs (Automated Guided Vehicles) transport materials without human drivers.

### 7. Additive Manufacturing (3D Printing)
Printing complex parts layer by layer — used for rapid prototyping and low-volume production.

### 8. Cybersecurity
Connected factories are vulnerable. Industrial cybersecurity (OT security) protects manufacturing systems from attacks.

### 9. System Integration
Connecting ERP, MES, SCADA, and PLC systems horizontally (across departments) and vertically (from sensor to boardroom).

## Mexico's Industry 4.0 Landscape (2026)

Mexico is rapidly adopting Industry 4.0:
- **FDI in manufacturing** captures ~37% of all foreign direct investment
- **"Smartshoring"** — nearshoring + digital infrastructure
- Key hubs: **Monterrey** (automotive IoT), **Querétaro** (aerospace digital), **Guadalajara** (electronics + AI)
- The "triple helix" model — collaboration between **industry, government, and academia** — drives workforce development

## Career Paths in Industry 4.0

- **IoT Engineer**: Deploys and maintains sensor networks. MXN $25,000-45,000/month.
- **Data Analyst**: Translates manufacturing data into insights. MXN $20,000-40,000/month.
- **Automation Engineer**: Programs PLCs, cobots, and SCADA. MXN $30,000-55,000/month.
- **Digital Twin Specialist**: Creates virtual replicas of production systems. MXN $40,000-70,000/month.

---

> **Key Takeaway**: Industry 4.0 transforms factories with IoT, AI, digital twins, and cloud computing. Mexico's "smartshoring" strategy combines nearshoring with digital infrastructure, creating high-value manufacturing careers.
`,
                        vocabulary: [
                            { en: "Industry 4.0", es: "Industria 4.0", definition: "Fourth industrial revolution — digital transformation of manufacturing" },
                            { en: "IIoT (Industrial Internet of Things)", es: "Internet Industrial de las Cosas", definition: "Network of sensors and devices in factories" },
                            { en: "Digital Twin", es: "Gemelo Digital", definition: "Virtual replica of a physical system" },
                            { en: "Edge Computing", es: "Computación en el Borde", definition: "Processing data locally near sensors (low latency)" },
                            { en: "Cobot (Collaborative Robot)", es: "Robot Colaborativo", definition: "Robot designed to work safely alongside humans" },
                            { en: "PLC (Programmable Logic Controller)", es: "Controlador Lógico Programable", definition: "Industrial computer controlling machines" },
                            { en: "SCADA", es: "SCADA", definition: "Supervisory Control and Data Acquisition system" },
                            { en: "MES (Manufacturing Execution System)", es: "Sistema de Ejecución de Manufactura", definition: "Software tracking production in real-time" },
                            { en: "Predictive Maintenance", es: "Mantenimiento Predictivo", definition: "Using data to predict equipment failure before it happens" },
                            { en: "Additive Manufacturing", es: "Manufactura Aditiva", definition: "3D printing — building parts layer by layer" },
                            { en: "OT Security", es: "Seguridad OT", definition: "Cybersecurity for operational technology (factory systems)" },
                            { en: "Smartshoring", es: "Smartshoring", definition: "Nearshoring combined with advanced digital infrastructure" }
                        ],
                        questions: [
                            { q: "What is Industry 4.0?", options: ["The fourth industrial revolution — digital transformation of manufacturing", "A new programming language", "A type of factory building", "The fourth version of the internet"], answer: 0 },
                            { q: "What is a Digital Twin?", options: ["A backup server", "A virtual replica of a physical system used for simulation", "A type of robot", "Two identical machines"], answer: 1 },
                            { q: "What does IIoT stand for?", options: ["Internal Internet of Technology", "Industrial Internet of Things", "Integrated IT Operations", "International IoT"], answer: 1 },
                            { q: "What is 'Smartshoring' in Mexico's context?", options: ["Moving factories to smarter countries", "Nearshoring combined with advanced digital infrastructure and Industry 4.0", "Only hiring smart people", "Using smartphones in factories"], answer: 1 }
                        ]
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // TRACK 5: AEROSPACE MANUFACTURING (FULL CONTENT)
    // =========================================================================
    "aerospace": {
        id: "aerospace",
        title: "Manufactura Aeronáutica",
        titleEN: "Aerospace Manufacturing",
        level: "A2-B1",
        status: "full",
        description: "English for aerospace manufacturing — composite materials, precision machining, quality assurance, and Mexico's aerospace corridor.",
        descriptionES: "Inglés para manufactura aeronáutica — materiales compuestos, maquinado de precisión, aseguramiento de calidad y el corredor aeroespacial de México.",
        totalModules: 9,
        estimatedHours: 18,
        prerequisites: ["esp-foundation", "semiconductors"],
        standard: "AS9100D",
        conocer: "EC0892 (Manufactura Aeroespacial de Precisión)",
        ngss: "HS-PS2-1 (Forces & Aerodynamics)",
        industry: "AS9100D / NADCAP / NAS 410 / FEMIA",
        modules: [
            // -----------------------------------------------------------------
            // MODULE 1: Introduction to Aerospace Engineering
            // -----------------------------------------------------------------
            {
                id: "aero-m1",
                title: "Introduction to Aerospace Engineering",
                titleES: "Introducción a la Ingeniería Aeroespacial",
                icon: "fa-solid fa-plane-up",
                readings: [
                    {
                        id: "aero-m1-r1",
                        title: "The Aerospace Supply Chain: From OEM to Tier 3",
                        duration: "10 min",
                        content: `
# The Aerospace Supply Chain: From OEM to Tier 3

The aerospace industry is one of the most complex and regulated manufacturing sectors in the world. Every commercial aircraft contains approximately **4 million parts** from thousands of suppliers across dozens of countries. Understanding the supply chain structure is essential for anyone entering this industry.

## The Supply Chain Pyramid

### OEM — Original Equipment Manufacturer
The companies that design, certify, and assemble complete aircraft. There are only a handful of major OEMs:
- **Airbus** (European) — A320neo, A350, A380
- **Boeing** (American) — 737 MAX, 787 Dreamliner, 777X
- **Embraer** (Brazilian) — E-Jets for regional aviation
- **COMAC** (Chinese) — C919 (new competitor)

### Tier 1 — Major Systems Integrators
Companies that build complete **systems** delivered to OEMs:
- **Safran** — engines (LEAP), landing gear, nacelles
- **Collins Aerospace** (RTX) — avionics, interiors, mechanical systems
- **Spirit AeroSystems** — fuselages, wings
- **GE Aerospace** — jet engines (GE90, GEnx, CFM LEAP)

### Tier 2 — Sub-assembly Manufacturers
Produce **sub-assemblies and major components**: turbine blades, actuators, flight control surfaces, hydraulic systems.

### Tier 3 — Parts and Materials Suppliers
Manufacture **individual parts and raw materials**: machined brackets, fasteners, composite panels, specialty metals. **This is where most Mexican aerospace factories operate.**

## Aerospace vs. Automotive: Key Differences

| Factor | Automotive | Aerospace |
|--------|-----------|-----------|
| Production volume | Millions per year | Hundreds per year |
| Tolerance | ±0.1 mm typical | ±0.01 mm or tighter |
| Quality standard | IATF 16949 | **AS9100D** |
| Part traceability | Batch level | **Individual serial number** |
| Certification cycle | Months | **Years** (FAA/EASA approval) |
| Material cost | Low-moderate | Very high (titanium, composites) |

## Mexico's Aerospace Position

Mexico is the **12th largest** aerospace manufacturer globally and **#1 in Latin America**:
- **400+ aerospace companies** operating in Mexico
- **US$11+ billion** in annual aerospace exports (2024)
- **80%** of exports go to the United States
- **FEMIA** (Federación Mexicana de la Industria Aeroespacial) coordinates the industry

Key aerospace clusters: **Querétaro** (manufacturing + MRO), **Sonora** (engine components), **Baja California** (largest cluster by companies), **Chihuahua** (engineering + composites), **Nuevo León** (CNC machining).

---

> **Key Takeaway**: The aerospace supply chain is a pyramid from OEMs to Tier 3 suppliers. Mexico operates primarily at Tier 2-3, with 400+ companies exporting $11B+ annually. AS9100D is the required quality standard.
`,
                        vocabulary: [
                            { en: "OEM (Original Equipment Manufacturer)", es: "Fabricante de Equipo Original", definition: "Company that designs and assembles the final aircraft" },
                            { en: "Tier 1 Supplier", es: "Proveedor de Nivel 1", definition: "Major company supplying complete systems to OEMs" },
                            { en: "Tier 2/3 Supplier", es: "Proveedor de Nivel 2/3", definition: "Companies making sub-assemblies or individual parts" },
                            { en: "AS9100D", es: "AS9100D", definition: "International aerospace quality management standard" },
                            { en: "Traceability", es: "Trazabilidad", definition: "Ability to track every part back to its origin" },
                            { en: "Tolerance", es: "Tolerancia", definition: "Acceptable range of variation in dimensions" },
                            { en: "MRO", es: "MRO (Mantenimiento, Reparación y Revisión)", definition: "Maintenance, Repair, and Overhaul of aircraft" },
                            { en: "Nacelle", es: "Nacela / Góndola", definition: "Housing that covers an aircraft engine" },
                            { en: "Fuselage", es: "Fuselaje", definition: "Main body of an aircraft" },
                            { en: "FAA", es: "FAA (Administración Federal de Aviación)", definition: "US aviation safety authority" },
                            { en: "EASA", es: "EASA (Agencia Europea de Seguridad Aérea)", definition: "European aviation safety authority" },
                            { en: "FEMIA", es: "FEMIA", definition: "Mexican Federation of the Aerospace Industry" }
                        ],
                        questions: [
                            { q: "What quality standard is required in aerospace manufacturing?", options: ["ISO 9001", "IATF 16949", "AS9100D", "Six Sigma"], answer: 2 },
                            { q: "At which tier do most Mexican aerospace factories operate?", options: ["OEM level", "Tier 1", "Tier 2-3 (parts and sub-assemblies)", "They don't participate"], answer: 2 },
                            { q: "How do aerospace tolerances compare to automotive?", options: ["They are the same", "Aerospace is less precise", "Aerospace requires much tighter tolerances (±0.01mm vs ±0.1mm)", "Automotive is more precise"], answer: 2 },
                            { q: "What is FEMIA?", options: ["A type of aircraft", "The Mexican Federation of the Aerospace Industry", "A certification standard", "A manufacturing process"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 2: Materials Science: Composites and Alloys
            // -----------------------------------------------------------------
            {
                id: "aero-m2",
                title: "Materials Science: Composites and Alloys",
                titleES: "Ciencia de Materiales: Compuestos y Aleaciones",
                icon: "fa-solid fa-atom",
                readings: [
                    {
                        id: "aero-m2-r1",
                        title: "Aerospace Materials: From Aluminum to Carbon Fiber",
                        duration: "10 min",
                        content: `
# Aerospace Materials: From Aluminum to Carbon Fiber

The materials used in aerospace are chosen for one primary reason: **strength-to-weight ratio**. Every kilogram saved on an aircraft structure saves approximately **$1,000-3,000 per year** in fuel costs over the aircraft's 20-30 year lifespan.

## Key Material Categories

### 1. Aluminum Alloys
The "traditional" aerospace material. Lightweight, affordable, easy to machine.
- **2024-T3**: High fatigue resistance — used for fuselage skins
- **7075-T6**: Very strong — used for wing structures
- **Content in modern aircraft**: ~20% of a Boeing 787 (down from 80% in older aircraft)

### 2. Titanium Alloys
Extremely strong, corrosion-resistant, and lightweight — but expensive and hard to machine.
- **Ti-6Al-4V**: The most common aerospace titanium alloy
- **Used for**: Landing gear, engine mounts, wing fittings, fasteners
- **Content**: ~15% of a Boeing 787

### 3. CFRP — Carbon Fiber Reinforced Polymer
Layers of carbon fiber sheets bonded with epoxy resin. Stronger than steel at 1/5 the weight.
- **Used for**: Wings, fuselage panels, tail structures
- **Content**: ~50% of a Boeing 787 Dreamliner and Airbus A350
- **Manufacturing**: Autoclave curing at 180°C under 7 atm pressure

### 4. Nickel-Based Superalloys
Can withstand temperatures above **1,000°C** — critical for jet engine components.
- **Inconel 718**: Most common aerospace superalloy
- **Single-crystal castings**: Turbine blades grown as one crystal for maximum strength
- **Used for**: High-pressure turbine blades, combustion chambers

### 5. Ceramic Matrix Composites (CMCs)
The cutting edge — ceramics reinforced with fibers. Can operate at **1,300°C+** while being 1/3 the weight of superalloys. Used in the LEAP engine by Safran/GE.

## Material Selection Matrix

| Property | Aluminum | Titanium | CFRP | Superalloy |
|----------|----------|----------|------|-----------|
| Strength-to-Weight | Good | Excellent | Best | Good |
| Temperature Resistance | Low (150°C) | Medium (300°C) | Low (180°C) | Very High (1,000°C+) |
| Cost | Low | High | Very High | Very High |
| Machinability | Easy | Difficult | Special tools | Very Difficult |

---

> **Key Takeaway**: Modern aircraft use a mix of aluminum, titanium, CFRP composites, and superalloys. The 787 Dreamliner is 50% composite. Material choice depends on strength, weight, temperature, and cost.
`,
                        vocabulary: [
                            { en: "Composite", es: "Material Compuesto", definition: "Material made from two or more different materials" },
                            { en: "CFRP", es: "Polímero Reforzado con Fibra de Carbono", definition: "Carbon fiber + epoxy resin — stronger than steel, lighter" },
                            { en: "Alloy", es: "Aleación", definition: "A metal made by combining two or more elements" },
                            { en: "Titanium", es: "Titanio", definition: "Strong, light, corrosion-resistant metal" },
                            { en: "Superalloy", es: "Superaleación", definition: "High-performance alloy resisting extreme temperatures" },
                            { en: "Fatigue Resistance", es: "Resistencia a la Fatiga", definition: "Ability to withstand repeated stress without cracking" },
                            { en: "Autoclave", es: "Autoclave", definition: "Pressurized oven for curing composite materials" },
                            { en: "Single Crystal", es: "Monocristal / Cristal Único", definition: "Material grown as one continuous crystal structure" },
                            { en: "Strength-to-Weight Ratio", es: "Relación Resistencia-Peso", definition: "How strong a material is relative to its weight" },
                            { en: "Corrosion Resistance", es: "Resistencia a la Corrosión", definition: "Ability to resist chemical degradation" },
                            { en: "Epoxy Resin", es: "Resina Epóxica", definition: "Strong adhesive binding composite fibers together" },
                            { en: "CMC", es: "Compuesto de Matriz Cerámica", definition: "Ceramic reinforced with fibers for extreme heat" }
                        ],
                        questions: [
                            { q: "What percentage of a Boeing 787 is composite material (CFRP)?", options: ["10%", "25%", "About 50%", "90%"], answer: 2 },
                            { q: "Which material is used for turbine blades that must resist 1,000°C+?", options: ["Aluminum", "Carbon fiber", "Nickel-based superalloys (single crystal)", "Plastic"], answer: 2 },
                            { q: "Why is titanium difficult to use despite its excellent properties?", options: ["It's too heavy", "It's expensive and very hard to machine", "It melts easily", "It rusts quickly"], answer: 1 },
                            { q: "What is CFRP?", options: ["A type of paint", "Carbon Fiber Reinforced Polymer — stronger than steel at 1/5 the weight", "A welding technique", "A quality standard"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 3: Precision Machining and CNC
            // -----------------------------------------------------------------
            {
                id: "aero-m3",
                title: "Precision Machining and CNC",
                titleES: "Maquinado de Precisión y CNC",
                icon: "fa-solid fa-cogs",
                readings: [
                    {
                        id: "aero-m3-r1",
                        title: "CNC Machining for Aerospace: 5-Axis Precision",
                        duration: "10 min",
                        content: `
# CNC Machining for Aerospace: 5-Axis Precision

**CNC** (Computer Numerical Control) machining is the process of using computer-controlled tools to cut, drill, and shape metal or composite parts with extreme precision.

## How CNC Works

1. An engineer designs the part in **CAD** (Computer-Aided Design) software
2. A programmer converts the design to **G-code** — instructions the machine understands
3. The CNC machine executes the G-code, moving cutting tools along programmed paths
4. The finished part is measured with a **CMM** (Coordinate Measuring Machine) to verify tolerances

## Axis Systems

| Type | Axes | Capability |
|------|------|-----------|
| **3-axis** | X, Y, Z | Simple parts, flat surfaces |
| **4-axis** | X, Y, Z + rotation | Cylindrical parts |
| **5-axis** | X, Y, Z + 2 rotations | **Complex 3D geometries in a single setup** |

### Why 5-Axis Matters for Aerospace
- Machine **complex curves** (turbine blades, structural ribs) in one operation
- Reduce setups from 5-6 to **1** — fewer errors, higher precision
- Achieve tolerances of **±0.0025 mm** (±0.0001 inches)
- Critical for titanium parts that are expensive to re-machine

## Key Machining Operations

- **Milling**: Rotating cutter removes material (most common)
- **Turning**: Part spins, tool cuts (for cylindrical parts like shafts)
- **Drilling**: Creating holes with precise diameter and depth
- **Boring**: Enlarging existing holes to exact dimensions
- **EDM**: Electrical Discharge Machining — for very hard materials using electrical sparks

## Tooling and Challenges with Aerospace Materials

### Titanium (Ti-6Al-4V)
- Generates extreme **heat** during cutting (low thermal conductivity)
- Requires **carbide tooling**, high-pressure coolant, and rigid machines
- Tool life is 3-5× shorter than cutting aluminum

### Composites (CFRP)
- Abrasive carbon fibers destroy standard tools
- Requires **diamond-coated** or **PCD** (Polycrystalline Diamond) tools
- Must control **delamination** (layers separating)

## Quality Verification

Every aerospace part requires measurement:
- **CMM** (Coordinate Measuring Machine): Touch probe measures 3D coordinates
- **Laser scanning**: Non-contact measurement for complex surfaces
- **Surface roughness tester**: Measures Ra (average surface roughness)

---

> **Key Takeaway**: 5-axis CNC machining enables single-setup manufacturing of complex aerospace parts at ±0.0025mm tolerance. Titanium and composites require specialized tooling and techniques.
`,
                        vocabulary: [
                            { en: "CNC (Computer Numerical Control)", es: "Control Numérico Computarizado", definition: "Computer-controlled precision machining" },
                            { en: "5-Axis Machining", es: "Maquinado de 5 Ejes", definition: "CNC with 5 degrees of movement for complex parts" },
                            { en: "CAD (Computer-Aided Design)", es: "Diseño Asistido por Computadora", definition: "Software for creating 3D part designs" },
                            { en: "G-code", es: "Código G", definition: "Programming language that controls CNC machines" },
                            { en: "CMM", es: "Máquina de Medición por Coordenadas", definition: "Precision measurement device for 3D verification" },
                            { en: "Milling", es: "Fresado", definition: "Removing material with a rotating cutting tool" },
                            { en: "Turning", es: "Torneado", definition: "Machining cylindrical parts on a lathe" },
                            { en: "EDM", es: "Electroerosión", definition: "Cutting hard materials using electrical sparks" },
                            { en: "Delamination", es: "Delaminación", definition: "Layers of composite material separating" },
                            { en: "Surface Roughness (Ra)", es: "Rugosidad Superficial", definition: "Measure of surface smoothness" },
                            { en: "Carbide Tooling", es: "Herramienta de Carburo", definition: "Very hard cutting tools for tough materials" },
                            { en: "Tolerance", es: "Tolerancia", definition: "Acceptable deviation from specified dimension" }
                        ],
                        questions: [
                            { q: "What advantage does 5-axis CNC have over 3-axis?", options: ["It is cheaper", "It can machine complex 3D shapes in a single setup", "It only works with aluminum", "It is slower"], answer: 1 },
                            { q: "What typical tolerance can 5-axis aerospace CNC achieve?", options: ["±1 mm", "±0.5 mm", "±0.0025 mm (±0.0001 inches)", "±10 mm"], answer: 2 },
                            { q: "Why is titanium difficult to machine?", options: ["It is too soft", "It generates extreme heat and rapidly wears tools", "It melts at low temperatures", "It is magnetic"], answer: 1 },
                            { q: "What is a CMM used for?", options: ["Cutting metal", "Measuring 3D coordinates of finished parts to verify tolerances", "Painting surfaces", "Welding joints"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 4: Avionics and Electrical Systems Integration
            // -----------------------------------------------------------------
            {
                id: "aero-m4",
                title: "Avionics and Electrical Systems Integration",
                titleES: "Integración de Aviónica y Sistemas Eléctricos",
                icon: "fa-solid fa-microchip",
                readings: [
                    {
                        id: "aero-m4-r1",
                        title: "Avionics: The Brain of the Aircraft",
                        duration: "10 min",
                        content: `
# Avionics: The Brain of the Aircraft

**Avionics** — a combination of "aviation" and "electronics" — encompasses all electronic systems used in aircraft. Modern jets are essentially flying computers with wings.

## Core Avionics Systems

| System | Function |
|--------|----------|
| **FMS** (Flight Management System) | Plans and manages the flight route |
| **EFIS** (Electronic Flight Instrument System) | Digital cockpit displays (glass cockpit) |
| **TCAS** (Traffic Collision Avoidance System) | Prevents mid-air collisions |
| **ILS** (Instrument Landing System) | Guides landing in low visibility |
| **Weather Radar** | Detects storms, turbulence, wind shear |
| **Communication Systems** | VHF radio, satellite links, ACARS |
| **Autopilot** | Automatic flight control |

## Wiring and Electrical Systems

A modern commercial aircraft contains:
- **500-600 km** of wiring (enough to stretch from Querétaro to Mexico City and back — three times)
- **100,000+ connectors**
- **1,500+ circuit breakers**

### Wire Harness Manufacturing
The wire harness is the "nervous system" of the aircraft. Mexico is one of the world's largest producers:
- Workers follow **nail board layouts** (full-size diagrams) to route wires
- Each wire is identified by a unique **part number** and **function code**
- Connections are crimped, soldered, or spliced following strict standards (IPC/WHMA-A-620)

## The More Electric Aircraft (MEA)

Traditional aircraft use **hydraulic, pneumatic, and electrical** systems. The trend is toward **More Electric Aircraft (MEA)** — replacing hydraulic and pneumatic with electrical:
- **Electric actuators** replace hydraulic cylinders
- **Electric taxi systems** (eTaxi) move aircraft on ground without engines
- **Electric Environmental Control Systems (ECS)** for cabin pressurization

The Boeing 787 pioneered this — it uses 60% more electrical power than conventional aircraft.

---

> **Key Takeaway**: Avionics are the electronic brain of modern aircraft. Mexico is a global leader in wire harness manufacturing. The industry is moving toward More Electric Aircraft (MEA).
`,
                        vocabulary: [
                            { en: "Avionics", es: "Aviónica", definition: "Electronic systems used in aircraft" },
                            { en: "FMS (Flight Management System)", es: "Sistema de Gestión de Vuelo", definition: "Computer managing flight routes and navigation" },
                            { en: "Glass Cockpit", es: "Cabina de Cristal", definition: "Digital display-based cockpit (replacing analog gauges)" },
                            { en: "Wire Harness", es: "Arnés de Cableado", definition: "Organized bundle of wires connecting aircraft systems" },
                            { en: "Connector", es: "Conector", definition: "Component joining two wires or circuits" },
                            { en: "Autopilot", es: "Piloto Automático", definition: "System that flies the aircraft without manual input" },
                            { en: "IPC/WHMA-A-620", es: "IPC/WHMA-A-620", definition: "Industry standard for wire harness quality" },
                            { en: "Circuit Breaker", es: "Interruptor de Circuito", definition: "Safety device that cuts power during overload" },
                            { en: "MEA (More Electric Aircraft)", es: "Aeronave Más Eléctrica", definition: "Aircraft replacing hydraulics with electric systems" },
                            { en: "Actuator", es: "Actuador", definition: "Device converting energy into physical movement" },
                            { en: "Crimp", es: "Crimpar / Engarzar", definition: "Joining wire to a connector by compression" },
                            { en: "TCAS", es: "Sistema de Alerta Anticolisión", definition: "System preventing mid-air collisions" }
                        ],
                        questions: [
                            { q: "How much wiring does a modern commercial aircraft contain?", options: ["50 meters", "5 km", "500-600 km", "5,000 km"], answer: 2 },
                            { q: "What is a 'glass cockpit'?", options: ["A cockpit made of glass", "A digital display-based cockpit replacing analog gauges", "A transparent aircraft nose", "A type of windshield"], answer: 1 },
                            { q: "What does MEA (More Electric Aircraft) mean?", options: ["Aircraft with more passengers", "Replacing hydraulic and pneumatic systems with electrical ones", "Aircraft that fly higher", "Electric-powered aircraft"], answer: 1 },
                            { q: "Why is Mexico important for wire harness manufacturing?", options: ["Mexico invented wire harnesses", "Mexico is one of the world's largest producers of aerospace wire harnesses", "Wire harnesses are not used in aerospace", "Mexico only produces automotive harnesses"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 5: Turbine Engine Components Manufacturing
            // -----------------------------------------------------------------
            {
                id: "aero-m5",
                title: "Turbine Engine Components Manufacturing",
                titleES: "Manufactura de Componentes de Turbinas",
                icon: "fa-solid fa-fan",
                readings: [
                    {
                        id: "aero-m5-r1",
                        title: "Inside a Jet Engine: From Fan to Nozzle",
                        duration: "10 min",
                        content: `
# Inside a Jet Engine: From Fan to Nozzle

A modern turbofan jet engine is one of the most complex machines ever built. The **LEAP engine** (by CFM International — a joint venture between GE and Safran) powers the majority of new narrowbody aircraft worldwide.

## How a Turbofan Works

Air enters the engine and is processed in stages:

1. **Fan**: Large front blades draw in air. Most air (80%) bypasses the core — this "bypass air" generates most of the thrust.
2. **Compressor**: Remaining air is compressed 40-50× in stages (low-pressure then high-pressure)
3. **Combustion Chamber**: Compressed air mixes with jet fuel (Jet-A) and ignites at ~1,500°C
4. **Turbine**: Hot gases spin turbine blades, which drive the compressor and fan via shafts
5. **Exhaust Nozzle**: Remaining gases exit at high speed, generating additional thrust

## The Most Demanding Component: Turbine Blades

High-pressure turbine (HPT) blades operate in the most extreme conditions:
- Temperature: **1,400-1,600°C** (above the melting point of the blade metal!)
- Rotational speed: **10,000+ RPM**
- Centrifugal force: Each blade experiences forces equivalent to **hanging a truck from it**

### How They Survive: Single-Crystal Casting
1. A wax model of the blade is created
2. The wax is coated in ceramic to form a **mold**
3. Wax is melted out ("lost wax" / investment casting)
4. Molten **nickel superalloy** is poured in
5. A **spiral grain selector** ensures only ONE crystal grows upward
6. The blade solidifies as a single crystal — no grain boundaries = maximum creep resistance

### Thermal Barrier Coatings (TBC)
Even single-crystal blades need help. A **ceramic coating** (yttria-stabilized zirconia) is applied to insulate the metal. Combined with **internal cooling channels** (tiny passages for air), the blade surface stays 200-300°C cooler than the gas stream.

## The LEAP Revolution
The LEAP engine introduced **3D-woven CFRP fan blades** — lighter and more durable than titanium. This is manufactured by Safran using resin transfer molding (RTM).

Sonora, Mexico is a key hub for turbine component manufacturing (Safran, Rolls-Royce).

---

> **Key Takeaway**: Turbine blades are the most extreme components in engineering — operating above their own melting point. Single-crystal casting, thermal barrier coatings, and internal cooling make this possible.
`,
                        vocabulary: [
                            { en: "Turbofan", es: "Turbofán", definition: "Most common jet engine type — fan + gas turbine" },
                            { en: "Compressor", es: "Compresor", definition: "Engine section that compresses incoming air" },
                            { en: "Combustion Chamber", es: "Cámara de Combustión", definition: "Where fuel and air mix and ignite" },
                            { en: "Turbine Blade", es: "Álabe / Aspa de Turbina", definition: "High-temperature rotating blade extracting energy from hot gases" },
                            { en: "Single-Crystal Casting", es: "Fundición Monocristalina", definition: "Growing a blade as one crystal for maximum strength" },
                            { en: "Investment Casting", es: "Fundición a la Cera Perdida", definition: "Lost-wax casting process for complex shapes" },
                            { en: "Thermal Barrier Coating (TBC)", es: "Recubrimiento de Barrera Térmica", definition: "Ceramic layer insulating metal from extreme heat" },
                            { en: "Bypass Ratio", es: "Relación de Derivación", definition: "Ratio of air bypassing vs entering the core" },
                            { en: "Creep Resistance", es: "Resistencia al Flujo Plástico", definition: "Ability to resist deformation under sustained heat and stress" },
                            { en: "Grain Boundary", es: "Límite de Grano", definition: "Interface between crystal grains — a weak point at high temperature" },
                            { en: "RPM", es: "RPM (Revoluciones Por Minuto)", definition: "Rotational speed of engine components" },
                            { en: "Thrust", es: "Empuje", definition: "Forward force generated by the engine" }
                        ],
                        questions: [
                            { q: "Why are turbine blades cast as single crystals?", options: ["For appearance", "Eliminating grain boundaries maximizes creep resistance at extreme temperatures", "Single crystals are cheaper", "It's a decorative choice"], answer: 1 },
                            { q: "At what temperature do high-pressure turbine blades operate?", options: ["200-300°C", "500-700°C", "1,400-1,600°C (above the blade metal's melting point)", "3,000°C"], answer: 2 },
                            { q: "What innovation did the LEAP engine introduce for fan blades?", options: ["Titanium fan blades", "3D-woven carbon fiber composite fan blades", "Wooden fan blades", "Ceramic fan blades"], answer: 1 },
                            { q: "What is investment casting also known as?", options: ["Sand casting", "Lost-wax casting", "Die casting", "Continuous casting"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 6: Non-Destructive Testing (NDT)
            // -----------------------------------------------------------------
            {
                id: "aero-m6",
                title: "Non-Destructive Testing (NDT)",
                titleES: "Pruebas No Destructivas (NDT)",
                icon: "fa-solid fa-magnifying-glass-chart",
                readings: [
                    {
                        id: "aero-m6-r1",
                        title: "Finding Flaws Without Breaking Parts",
                        duration: "10 min",
                        content: `
# Finding Flaws Without Breaking Parts: NDT Methods

In aerospace, a tiny crack or void can cause catastrophic failure. **Non-Destructive Testing (NDT)** inspects parts for defects without damaging them.

## The Six Primary NDT Methods

### 1. Visual Testing (VT)
The simplest method — trained inspectors examine parts with their eyes, magnifying glasses, or borescopes (cameras on flexible tubes for engine interiors). Always the first inspection performed.

### 2. Ultrasonic Testing (UT)
Uses **high-frequency sound waves** to detect internal flaws. A transducer sends sound into the material; reflections indicate cracks or voids.
- **Phased Array UT (PAUT)**: Multiple elements for detailed cross-sectional imaging
- **Best for**: Internal flaws in metals and composites, thickness measurement

### 3. Radiographic Testing (RT)
Uses **X-rays or gamma rays** to create images of a part's interior — like a medical X-ray for metal.
- Detects internal voids, inclusions, and porosity
- **Best for**: Castings, weld inspection, complex assemblies

### 4. Eddy Current Testing (ET)
Uses **electromagnetic induction** to detect surface and near-surface cracks in conductive materials.
- A coil generates alternating current; defects disturb the eddy current pattern
- **Best for**: Surface cracks in aluminum skins, bolt holes, engine discs

### 5. Liquid Penetrant Testing (PT)
Apply a colored or fluorescent liquid to the surface. The liquid seeps into cracks. After cleaning, a developer draws the liquid back out, revealing crack locations.
- **Best for**: Surface-breaking cracks on non-porous materials

### 6. Magnetic Particle Testing (MT)
Apply magnetic field and iron particles to the part. Particles cluster at cracks where the field is disturbed.
- **Only works on ferromagnetic materials** (steel, not aluminum or titanium)

## ASNT Certification Levels

The **American Society for Nondestructive Testing (ASNT)** defines three certification levels:

| Level | Can Do |
|-------|--------|
| **Level I** | Perform specific inspections under supervision |
| **Level II** | Inspect independently, interpret results, write reports |
| **Level III** | Develop procedures, certify Level I/II, full technical authority |

Aerospace specifically requires compliance with **NAS 410** (National Aerospace Standard for NDT personnel).

---

> **Key Takeaway**: NDT finds flaws without destroying parts. Key methods include ultrasonic, radiographic, eddy current, penetrant, and magnetic particle testing. ASNT certification (NAS 410) is required in aerospace.
`,
                        vocabulary: [
                            { en: "NDT (Non-Destructive Testing)", es: "Pruebas No Destructivas", definition: "Inspection methods that don't damage the part" },
                            { en: "Ultrasonic Testing (UT)", es: "Prueba Ultrasónica", definition: "Using sound waves to detect internal flaws" },
                            { en: "Radiographic Testing (RT)", es: "Prueba Radiográfica", definition: "Using X-rays to image internal structure" },
                            { en: "Eddy Current Testing (ET)", es: "Prueba de Corrientes Inducidas", definition: "Electromagnetic method for surface/near-surface cracks" },
                            { en: "Liquid Penetrant (PT)", es: "Líquidos Penetrantes", definition: "Dye seeps into surface cracks to reveal them" },
                            { en: "Phased Array", es: "Arreglo de Fase", definition: "Advanced ultrasonic technique with multiple elements" },
                            { en: "ASNT", es: "ASNT", definition: "American Society for Nondestructive Testing" },
                            { en: "NAS 410", es: "NAS 410", definition: "Aerospace NDT personnel certification standard" },
                            { en: "Transducer", es: "Transductor", definition: "Device converting electrical signals to sound waves" },
                            { en: "Porosity", es: "Porosidad", definition: "Small holes or voids in a material" },
                            { en: "Borescope", es: "Boroscopio", definition: "Camera on flexible tube for internal inspection" },
                            { en: "Discontinuity", es: "Discontinuidad", definition: "Any interruption in the normal structure of a material" }
                        ],
                        questions: [
                            { q: "Which NDT method uses sound waves to find internal flaws?", options: ["Eddy Current", "Visual Testing", "Ultrasonic Testing (UT)", "Liquid Penetrant"], answer: 2 },
                            { q: "What NDT certification standard is required in aerospace?", options: ["ISO 9001", "NAS 410", "IATF 16949", "CompTIA A+"], answer: 1 },
                            { q: "Which method is like a medical X-ray for metal parts?", options: ["Magnetic Particle Testing", "Radiographic Testing (RT)", "Visual Testing", "Eddy Current Testing"], answer: 1 },
                            { q: "What can an ASNT Level II certified technician do?", options: ["Only observe", "Inspect independently, interpret results, and write reports", "Only clean equipment", "Design aircraft"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 7: Assembly and Structural Integration
            // -----------------------------------------------------------------
            {
                id: "aero-m7",
                title: "Assembly and Structural Integration",
                titleES: "Ensamblaje e Integración Estructural",
                icon: "fa-solid fa-puzzle-piece",
                readings: [
                    {
                        id: "aero-m7-r1",
                        title: "Building an Aircraft: Assembly and Joining Technologies",
                        duration: "10 min",
                        content: `
# Building an Aircraft: Assembly and Joining Technologies

Assembling an aircraft is fundamentally different from assembling a car. Each aircraft is essentially **hand-built** with thousands of manual operations — but guided by digital precision tools.

## Aircraft Assembly Sequence

### 1. Sub-Assembly
Individual components (ribs, stringers, panels, bulkheads) are manufactured separately, inspected, and prepared for integration.

### 2. Major Assembly
Sub-assemblies are joined into major sections:
- **Forward fuselage** (cockpit area)
- **Center fuselage** (passenger cabin)
- **Aft fuselage** (tail section)
- **Wings** (left and right)
- **Empennage** (tail: horizontal + vertical stabilizer)

### 3. Final Assembly Line (FAL)
Major sections arrive and are joined together:
1. Fuselage sections are connected (**circumferential joins**)
2. Wings are attached to the center fuselage
3. Landing gear is installed
4. Engines are hung on pylons under the wings
5. Interior is installed (seats, galleys, lavatories, IFE systems)
6. All systems are connected and tested

## Joining Technologies

### Riveting (Most Common)
The traditional aerospace joining method. **Solid rivets** are inserted through pre-drilled holes and formed with pneumatic hammers.
- A single-aisle aircraft has approximately **1.5 million rivets**
- Hi-Lok and lockbolt fasteners are used for high-strength joints

### Adhesive Bonding
Structural adhesives bond composite panels. Used increasingly as composite content grows. Requires precise **surface preparation** (sandblasting, primer application).

### Welding
Limited in aerospace (aluminum warps, composites can't be welded). **Friction Stir Welding (FSW)** is an exception — used for SpaceX rocket tanks and some fuselage panels.

### Hybrid Joining
Combining riveting with adhesive for maximum strength — common in composite-to-metal joints.

## Digital Tools in Assembly

- **Laser trackers**: Measure positions to ±0.025mm accuracy
- **Automated drilling**: Robots drill thousands of rivet holes
- **Augmented Reality (AR)**: Workers see digital overlays on physical parts

---

> **Key Takeaway**: Aircraft assembly combines sub-assemblies into major sections on a Final Assembly Line. Riveting remains dominant (1.5M rivets per aircraft), but adhesive bonding grows with composite use.
`,
                        vocabulary: [
                            { en: "Final Assembly Line (FAL)", es: "Línea de Ensamble Final", definition: "Where all major aircraft sections are joined together" },
                            { en: "Rivet", es: "Remache", definition: "Metal fastener joining two sheets permanently" },
                            { en: "Fuselage", es: "Fuselaje", definition: "Main body tube of the aircraft" },
                            { en: "Empennage", es: "Empenaje / Cola", definition: "Tail section (horizontal + vertical stabilizer)" },
                            { en: "Stringer", es: "Larguerillo", definition: "Longitudinal structural member reinforcing the skin" },
                            { en: "Bulkhead", es: "Mamparo", definition: "Vertical partition dividing the fuselage into sections" },
                            { en: "Pylon", es: "Pilón", definition: "Structure connecting engine to wing" },
                            { en: "Friction Stir Welding", es: "Soldadura por Fricción", definition: "Solid-state welding using a rotating tool" },
                            { en: "Adhesive Bonding", es: "Unión Adhesiva", definition: "Joining parts with structural glue" },
                            { en: "Laser Tracker", es: "Rastreador Láser", definition: "Precision measurement device for large assemblies" },
                            { en: "Hi-Lok Fastener", es: "Sujetador Hi-Lok", definition: "High-strength aerospace fastener" },
                            { en: "IFE (In-Flight Entertainment)", es: "Entretenimiento a Bordo", definition: "Passenger entertainment system" }
                        ],
                        questions: [
                            { q: "How many rivets does a typical single-aisle aircraft have?", options: ["About 1,000", "About 50,000", "Approximately 1.5 million", "About 10 million"], answer: 2 },
                            { q: "What is the Final Assembly Line (FAL)?", options: ["Where individual parts are machined", "Where all major aircraft sections are joined together", "A testing facility", "A paint shop"], answer: 1 },
                            { q: "Why is traditional welding rarely used in aerospace?", options: ["It's too expensive", "Aluminum warps and composites can't be welded conventionally", "Welding is too slow", "It's illegal in aerospace"], answer: 1 },
                            { q: "What is an empennage?", options: ["The engine mount", "The tail section of an aircraft", "A type of rivet", "The landing gear"], answer: 1 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 8: Quality Assurance and AS9100
            // -----------------------------------------------------------------
            {
                id: "aero-m8",
                title: "Quality Assurance and AS9100",
                titleES: "Aseguramiento de Calidad y AS9100",
                icon: "fa-solid fa-clipboard-check",
                readings: [
                    {
                        id: "aero-m8-r1",
                        title: "AS9100D: The Aerospace Quality Standard",
                        duration: "10 min",
                        content: `
# AS9100D: The Aerospace Quality Standard

In aerospace, quality is not a goal — it is an **absolute requirement**. A single defective part can endanger hundreds of lives. **AS9100D** is the international quality management standard specifically designed for the aerospace industry.

## What Is AS9100D?

AS9100D is based on **ISO 9001** (the general quality standard) but adds aerospace-specific requirements:

| ISO 9001 | AS9100D Additions |
|----------|--------------------|
| General quality management | **Product safety** management |
| Customer focus | **Risk management** throughout production |
| Process approach | **Counterfeit part prevention** |
| Continual improvement | **Special process** control (heat treat, NDT, welding) |
| Documentation | **Complete traceability** of every part and material |
| Supplier management | **Flow-down** of requirements to all sub-tier suppliers |

## Key AS9100D Concepts

### 1. Configuration Management
Track every change to a product's design, documentation, and software throughout its lifecycle. If a bolt changes from Grade 5 to Grade 8, every affected document, drawing, and inspection plan must be updated.

### 2. Risk Management
Identify risks at every stage and implement controls. Aerospace uses **FMEA** (Failure Mode and Effects Analysis) to systematically evaluate what could go wrong and how severe the consequences would be.

### 3. First Article Inspection (FAI)
The **first part** produced from a new or changed process must undergo complete dimensional verification — every measurement verified against the drawing. Documented per **AS9102** (FAI standard).

### 4. NADCAP (National Aerospace and Defense Contractors Accreditation Program)
Special processes (heat treatment, NDT, chemical processing, welding, coatings) require **NADCAP accreditation** — an additional audit beyond AS9100D.

## The Cost of Non-Conformance

| Finding Type | Definition | Impact |
|-------------|-----------|--------|
| **Minor NC** | System gap that doesn't affect product | Must correct within 60 days |
| **Major NC** | Missing or failed system requirement | Can halt production |
| **Critical NC** | Product safety risk | **Immediate stop-ship** |

## Traceability: From Ore to Aircraft

Every aerospace part can be traced back to:
- The specific **heat lot** of raw material
- The **machine** and **operator** who produced it
- The **inspector** who verified it
- The **date and time** of every operation

---

> **Key Takeaway**: AS9100D is the mandatory aerospace quality standard adding safety, risk management, counterfeit prevention, and full traceability to ISO 9001. NADCAP accredits special processes.
`,
                        vocabulary: [
                            { en: "AS9100D", es: "AS9100D", definition: "International aerospace quality management standard" },
                            { en: "NADCAP", es: "NADCAP", definition: "Special process accreditation for aerospace" },
                            { en: "First Article Inspection (FAI)", es: "Inspección del Primer Artículo", definition: "Complete verification of the first part produced" },
                            { en: "FMEA", es: "Análisis de Modo y Efecto de Falla", definition: "Systematic analysis of potential failure modes" },
                            { en: "Traceability", es: "Trazabilidad", definition: "Tracking every part back to raw materials and processes" },
                            { en: "Non-Conformance (NC)", es: "No Conformidad", definition: "A part or process that doesn't meet requirements" },
                            { en: "Configuration Management", es: "Gestión de Configuración", definition: "Tracking all changes to product design and documentation" },
                            { en: "Flow-Down", es: "Flujo de Requisitos", definition: "Passing quality requirements to all suppliers in the chain" },
                            { en: "Counterfeit Part", es: "Parte Falsificada", definition: "Unapproved or fraudulent component" },
                            { en: "Special Process", es: "Proceso Especial", definition: "Process whose quality can't be fully verified by inspection alone" },
                            { en: "Heat Lot", es: "Lote de Fundición", definition: "A batch of metal from the same melting/processing" },
                            { en: "Stop-Ship", es: "Detención de Envío", definition: "Immediate halt to shipping any product" }
                        ],
                        questions: [
                            { q: "What is AS9100D based on?", options: ["IATF 16949", "ISO 9001 with aerospace-specific additions", "Six Sigma", "Lean Manufacturing"], answer: 1 },
                            { q: "What is a First Article Inspection (FAI)?", options: ["Checking the last part produced", "Complete dimensional verification of the first part from a new/changed process", "Visual inspection only", "Testing the machine"], answer: 1 },
                            { q: "What does NADCAP accredit?", options: ["General management systems", "Special processes like heat treatment, NDT, and coatings", "Employee training", "Office procedures"], answer: 1 },
                            { q: "What happens when a Critical Non-Conformance is found?", options: ["Nothing special", "A warning is issued", "Immediate stop-ship — no product leaves the factory", "The finding is ignored"], answer: 2 }
                        ]
                    }
                ]
            },
            // -----------------------------------------------------------------
            // MODULE 9: Mexico's Aerospace Corridor and Career Paths
            // -----------------------------------------------------------------
            {
                id: "aero-m9",
                title: "Mexico's Aerospace Corridor and Career Paths",
                titleES: "El Corredor Aeroespacial de México",
                icon: "fa-solid fa-map-location-dot",
                readings: [
                    {
                        id: "aero-m9-r1",
                        title: "Mexico's Aerospace Industry: Clusters and Careers",
                        duration: "10 min",
                        content: `
# Mexico's Aerospace Industry: Clusters and Careers

Mexico's aerospace sector has grown from virtually nothing in the early 2000s to a **US$11+ billion export industry** with 400+ companies in just 20 years. This growth is one of the most successful industrial development stories in Latin America.

## The Major Aerospace Clusters

### Querétaro — "The Aerospace Capital"
- **80+ aerospace companies** including Safran, Bombardier, Airbus (MRO)
- Specialization: **manufacturing, MRO, and R&D**
- University of Aeronautics (UNAQ) — Mexico's only aerospace-dedicated university
- **$1.2 billion** investment from Safran and Airbus (2026)

### Sonora — "Mexico's Turbine Capital"
- Specialization: **engine components, avionics, landing gear**
- Major companies: **Safran, Collins Aerospace, Latecoere**
- Binational megaregion with Arizona (shared supply chains)

### Baja California — Largest Cluster by Companies
- **100+ aerospace companies**
- Specialization: **electronics, machining, assemblies**
- Proximity to San Diego aerospace hub

### Chihuahua — Engineering and Composites
- Specialization: **metal and composite components, engineering**
- Companies: Honeywell, Textron Aviation, Kaman Aerospace

### Nuevo León — High-Tech Precision
- Specialization: **CNC machining, composite materials, additive manufacturing**
- Monterrey's strong engineering talent base

## Career Paths and Salaries (2026)

| Career | Description | Monthly Salary (MXN) |
|--------|-------------|---------------------|
| **CNC Operator** | Programs and operates precision machines | $15,000 - 25,000 |
| **NDT Technician (Level II)** | Inspects parts using ultrasonic, RT, ET methods | $18,000 - 30,000 |
| **Quality Inspector** | Verifies AS9100D compliance and dimensions | $15,000 - 25,000 |
| **Composite Technician** | Lays up and cures CFRP parts | $14,000 - 22,000 |
| **Manufacturing Engineer** | Designs production processes and fixtures | $30,000 - 55,000 |
| **Stress Engineer** | Analyzes structural loads and safety margins | $35,000 - 65,000 |
| **MRO Technician (A&P)** | Maintains and repairs aircraft | $20,000 - 40,000 |

## The Critical Importance of English

In Mexico's aerospace industry, **English is non-negotiable**:
- All technical drawings, specifications, and standards are in English
- Quality audits (AS9100D, NADCAP) are conducted in English
- Communication with OEMs (Boeing, Airbus, Safran) is entirely in English
- SOPs, work instructions, and NCR reports are written in English

A worker with the same technical skills but **bilingual ability** can earn **30-50% more** than a monolingual peer.

## FEMIA's Vision for 2030

The Federación Mexicana de la Industria Aeroespacial targets:
- **US$15 billion** in annual exports
- **Tier 1 status** for select Mexican companies
- Growth in **MRO** (Maintenance, Repair, and Overhaul) — the fastest-growing segment
- Integration of **Industry 4.0** into aerospace manufacturing

---

> **Key Takeaway**: Mexico's aerospace industry has 400+ companies exporting $11B+ annually across 5 major clusters. English proficiency is the #1 career differentiator, with bilingual workers earning 30-50% more.
`,
                        vocabulary: [
                            { en: "Aerospace Cluster", es: "Clúster Aeroespacial", definition: "Geographic concentration of aerospace companies" },
                            { en: "MRO", es: "MRO (Mantenimiento, Reparación, Revisión)", definition: "Maintenance, Repair, and Overhaul of aircraft" },
                            { en: "A&P License", es: "Licencia A&P", definition: "Airframe and Powerplant mechanic certification" },
                            { en: "UNAQ", es: "UNAQ", definition: "Universidad Nacional Aeronáutica de Querétaro" },
                            { en: "Binational Megaregion", es: "Megaregión Binacional", definition: "Cross-border industrial zone (e.g., Sonora-Arizona)" },
                            { en: "NCR (Non-Conformance Report)", es: "Reporte de No Conformidad", definition: "Document recording a quality deviation" },
                            { en: "SOP (Standard Operating Procedure)", es: "Procedimiento Operativo Estándar", definition: "Step-by-step work instruction" },
                            { en: "Fixture", es: "Dispositivo / Fixture", definition: "Tool that holds a part in position during manufacturing" },
                            { en: "Stress Analysis", es: "Análisis de Esfuerzos", definition: "Engineering analysis of forces on a structure" },
                            { en: "Lay-up", es: "Laminado", definition: "Process of placing composite fiber sheets in a mold" },
                            { en: "Work Instruction", es: "Instrucción de Trabajo", definition: "Detailed guide for performing a specific task" },
                            { en: "Nearshoring", es: "Nearshoring", definition: "Relocating manufacturing closer to the end market" }
                        ],
                        questions: [
                            { q: "How much does Mexico export in aerospace annually?", options: ["$1 billion", "$5 billion", "Over $11 billion", "$50 billion"], answer: 2 },
                            { q: "Which city is known as Mexico's 'Aerospace Capital'?", options: ["Monterrey", "Mexico City", "Querétaro", "Guadalajara"], answer: 2 },
                            { q: "How much more can a bilingual aerospace worker earn compared to a monolingual peer?", options: ["5-10%", "30-50% more", "The same", "Less"], answer: 1 },
                            { q: "What does FEMIA target for Mexico's aerospace exports by 2030?", options: ["$5 billion", "$10 billion", "$15 billion", "$50 billion"], answer: 2 }
                        ]
                    }
                ]
            }
        ]
    }
};

// Make available for window and import
if (typeof window !== 'undefined') {
    window.LXP_COURSES = LXP_COURSES;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LXP_COURSES;
}
