/**
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

var LXP_CATEGORIES = {
    "technology": {
        "id": "technology",
        "name": "Technology",
        "nameES": "Tecnología",
        "color": "#38bdf8",
        "accent": "cyan",
        "icon": "fa-solid fa-laptop-code",
        "badge": "🔵 TECHNOLOGY",
        "description": "Redes avanzadas, inteligencia artificial, IoT, desarrollo de software y computación en la nube para la industria global."
    },
    "engineering": {
        "id": "engineering",
        "name": "Engineering & Industry",
        "nameES": "Ingeniería e Industria",
        "color": "#34d399",
        "accent": "emerald",
        "icon": "fa-solid fa-gears",
        "badge": "🟢 ENGINEERING & INDUSTRY",
        "description": "Manufactura de alta precisión, semiconductores, electromovilidad, robótica y sistemas mecatrónicos de nearshoring."
    },
    "science": {
        "id": "science",
        "name": "Science & Future Technology",
        "nameES": "Ciencia y Tecnología del Futuro",
        "color": "#c084fc",
        "accent": "purple",
        "icon": "fa-solid fa-atom",
        "badge": "🟣 SCIENCE & FUTURE TECHNOLOGY",
        "description": "Biotecnología, tecnología espacial, sustentabilidad ambiental, nanotecnología y ciencias aplicadas."
    },
    "career": {
        "id": "career",
        "name": "Aviation, Career & Professional English",
        "nameES": "Inglés para Aviación, Carrera y Profesional",
        "color": "#fb923c",
        "accent": "orange",
        "icon": "fa-solid fa-plane-departure",
        "badge": "🟠 AVIATION, CAREER & PROFESSIONAL ENGLISH",
        "description": "Inglés técnico para aviación civil (OACI), aeroespacial de defensa, gestión ejecutiva, liderazgo y proyectos globales."
    }
};

var LXP_COURSES = {
    "cybersecurity": {
        "id": "cybersecurity",
        "title": "Redes Inteligentes y Ciberseguridad",
        "titleEN": "Smart Networks & Cybersecurity",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 10,
        "standard": "CONOCER EC1290",
        "modules": [
            {
                "id": "cyber-m1",
                "title": "Introduction to Smart Networks",
                "titleES": "Introducción a las Redes Inteligentes",
                "icon": "fa-solid fa-network-wired",
                "readings": [
                    {
                        "id": "cyber-m1-r1",
                        "title": "What Is a Network?",
                        "duration": "10 min",
                        "content": "\n> **Industry Certification Note**: The concepts in this module are directly aligned with the **CompTIA Network+ (N10-008)** certification — recognized as the #1 foundational credential for digital infrastructure engineering in global companies (Cisco, AWS, Microsoft).\n\n# What Is a Network?\n\nEvery time you send a message on your phone, watch a video online, or check your email, you are using a **network**. But what exactly is a network?\n\n## A Simple Definition\n\nA **computer network** is a group of two or more devices that are **connected** to each other so they can **share information**. These devices can be computers, phones, tablets, printers, or even smart refrigerators.\n\nThink of it like a road system in a city. The roads connect different buildings (devices), and cars (data) travel along these roads to reach their destination.\n\n## Why Do We Need Networks?\n\nBefore networks existed, if you wanted to share a file with a colleague, you had to copy it onto a **floppy disk** or USB drive and physically carry it to their computer. This was slow and inconvenient.\n\nNetworks solve this problem. They allow devices to:\n\n- **Share files** and documents instantly\n- **Share resources** like printers and storage\n- **Communicate** through email, chat, and video calls\n- **Access the internet** and cloud services\n\n## Key Components of a Network\n\nEvery network has some basic **components** (parts):\n\n1. **Devices** (also called **nodes** or **endpoints**): These are the computers, phones, and other equipment connected to the network. Each device has a unique address called an **IP address** (Internet Protocol address).\n\n2. **Cables and Connections**: Devices connect to each other using **cables** (like Ethernet cables) or **wireless signals** (Wi-Fi). The physical or wireless path between devices is called a **link**.\n\n3. **Switches**: A **switch** is a device that connects multiple devices within the same network. When Device A sends data to Device B, the switch makes sure the data goes to the right place.\n\n4. **Routers**: A **router** connects different networks together. For example, your home router connects your home network to the internet. The router decides the best **path** for data to travel.\n\n5. **Servers**: A **server** is a powerful computer that stores data and provides **services** to other devices (called **clients**). When you visit a website, your browser (the client) requests information from a server.\n\n## How Data Travels\n\nWhen you send a message, your device doesn't send it as one big piece. Instead, the message is divided into small pieces called **packets**. Each packet travels through the network independently and may take different routes. When all packets arrive at the destination, they are **reassembled** into the original message.\n\nThis process is governed by rules called **protocols**. The most important protocol on the internet is **TCP/IP** (Transmission Control Protocol / Internet Protocol).\n\n## Smart Networks\n\nA **smart network** is a modern network that uses **software** and **artificial intelligence** to manage itself. Traditional networks require a human administrator to configure every device manually. Smart networks can:\n\n- **Detect problems** automatically (like a broken connection)\n- **Optimize performance** by choosing the fastest routes for data\n- **Protect against threats** by identifying suspicious activity\n- **Adapt** to changes in the number of connected devices\n\nSmart networks are essential for modern technologies like the **Internet of Things (IoT)**, where thousands of sensors and devices need to communicate efficiently.\n\n---\n\n> **Key Takeaway**: A network connects devices so they can share data. Understanding the basic components — devices, switches, routers, servers, and protocols — is the foundation for everything you will learn in this course, directly aligned with **CompTIA Network+** and **ISO 27001** audit standards.\n",
                        "vocabulary": [
                            {
                                "en": "Network",
                                "es": "Red",
                                "definition": "A group of connected devices that share information"
                            },
                            {
                                "en": "Device / Node",
                                "es": "Dispositivo / Nodo",
                                "definition": "Any equipment connected to a network (computer, phone, etc.)"
                            },
                            {
                                "en": "Switch",
                                "es": "Conmutador / Switch",
                                "definition": "A device that connects multiple devices in the same network"
                            },
                            {
                                "en": "Router",
                                "es": "Enrutador / Router",
                                "definition": "A device that connects different networks and directs data"
                            },
                            {
                                "en": "Server",
                                "es": "Servidor",
                                "definition": "A computer that stores data and provides services to other devices"
                            },
                            {
                                "en": "Client",
                                "es": "Cliente",
                                "definition": "A device that requests services from a server"
                            },
                            {
                                "en": "IP Address",
                                "es": "Dirección IP",
                                "definition": "A unique number that identifies each device on a network"
                            },
                            {
                                "en": "Packet",
                                "es": "Paquete",
                                "definition": "A small piece of data sent through a network"
                            },
                            {
                                "en": "Protocol",
                                "es": "Protocolo",
                                "definition": "A set of rules for how data is sent and received"
                            },
                            {
                                "en": "TCP/IP",
                                "es": "TCP/IP",
                                "definition": "The main protocol used on the internet"
                            },
                            {
                                "en": "Link",
                                "es": "Enlace",
                                "definition": "The connection path between two devices"
                            },
                            {
                                "en": "Wireless",
                                "es": "Inalámbrico",
                                "definition": "Without cables, using radio signals (Wi-Fi)"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is a computer network?",
                                "options": [
                                    "A single computer working alone",
                                    "Two or more devices connected to share information",
                                    "A type of software",
                                    "A programming language"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does a router do?",
                                "options": [
                                    "It stores files",
                                    "It connects devices in the same network",
                                    "It connects different networks together",
                                    "It prints documents"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What are packets?",
                                "options": [
                                    "Large files",
                                    "Small pieces of data sent through a network",
                                    "Types of cables",
                                    "Network passwords"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What makes a network 'smart'?",
                                "options": [
                                    "It uses expensive cables",
                                    "It uses software and AI to manage itself",
                                    "It only works with smartphones",
                                    "It has more than 100 devices"
                                ],
                                "answer": 1
                            }
                        ]
                    },
                    {
                        "id": "cyber-m1-r2",
                        "title": "Types of Networks: LAN, WAN, and More",
                        "duration": "10 min",
                        "content": "\n# Types of Networks: LAN, WAN, and More\n\nNot all networks are the same size. Some networks connect devices in a single room, while others connect devices across entire continents. Engineers classify networks by their **geographic scope** — how large an area they cover.\n\n## LAN — Local Area Network\n\nA **LAN** (Local Area Network) is the most common type of network. It connects devices in a **small area**, such as:\n\n- A home (your Wi-Fi network)\n- An office\n- A school building\n- A factory floor\n\nLANs are fast because the devices are close together. Most LANs use **Ethernet cables** or **Wi-Fi** for connections. A typical LAN speed is between **100 Mbps** and **1 Gbps** (Megabits/Gigabits per second).\n\n**Example**: In a semiconductor factory in Hermosillo, the computers on the production floor are connected through a LAN. This allows the quality control team to instantly access data from manufacturing sensors.\n\n## WAN — Wide Area Network\n\nA **WAN** (Wide Area Network) connects devices across a **large geographic area**, such as:\n\n- Different cities\n- Different states or countries\n- Entire continents\n\nThe **internet** is the largest WAN in the world. WANs are generally **slower** than LANs because data has to travel longer distances. Companies use WANs to connect their offices in different cities.\n\n**Example**: A nearshoring company with offices in Monterrey and Phoenix uses a WAN to connect both locations so employees can access the same databases and communication tools.\n\n## MAN — Metropolitan Area Network\n\nA **MAN** (Metropolitan Area Network) is between a LAN and a WAN in size. It covers a **city** or a **metropolitan area**. Internet Service Providers (ISPs) often operate MANs to provide internet service to a city.\n\n**Example**: The public Wi-Fi network covering the downtown area of a city is a MAN.\n\n## PAN — Personal Area Network\n\nA **PAN** (Personal Area Network) is the smallest type. It connects devices that belong to **one person**, usually within a range of a few meters.\n\n**Examples**:\n- Your phone connected to your wireless headphones via **Bluetooth**\n- Your smartwatch connected to your phone\n- Your laptop connected to a wireless keyboard\n\n## Other Network Types\n\n| Type | Name | Range | Example |\n|------|------|-------|---------|\n| **WLAN** | Wireless LAN | Building | Office Wi-Fi |\n| **SAN** | Storage Area Network | Data center | Server storage systems |\n| **VPN** | Virtual Private Network | Any distance | Secure remote work connections |\n\n## VPN — A Special Case\n\nA **VPN** (Virtual Private Network) is not a physical network. Instead, it creates a **secure, encrypted tunnel** over an existing network (usually the internet). VPNs are essential for **cybersecurity** because they:\n\n- Protect data from hackers when using public Wi-Fi\n- Allow employees to **securely access** company networks from home\n- Hide your real location and IP address\n\nIn the nearshoring industry, engineers often use VPNs to connect to their company's main servers in the United States while working from offices in Mexico.\n\n## Network Topologies\n\nThe way devices are arranged and connected in a network is called its **topology**. Common topologies include:\n\n- **Star**: All devices connect to a central switch. Most office LANs use this.\n- **Mesh**: Every device connects to every other device. Very reliable but expensive. Used in smart networks.\n- **Bus**: All devices share a single cable. Older technology, rarely used today.\n- **Ring**: Devices connect in a circle. Used in some industrial networks.\n\nModern smart networks often use a **hybrid topology** — a combination of two or more topologies designed for the best performance and reliability.\n\n---\n\n> **Key Takeaway**: Networks are classified by size (PAN → LAN → MAN → WAN). Understanding these categories helps engineers design and manage the right network for each situation.\n",
                        "vocabulary": [
                            {
                                "en": "LAN (Local Area Network)",
                                "es": "Red de Área Local",
                                "definition": "A network covering a small area like an office or home"
                            },
                            {
                                "en": "WAN (Wide Area Network)",
                                "es": "Red de Área Amplia",
                                "definition": "A network covering a large geographic area"
                            },
                            {
                                "en": "MAN (Metropolitan Area Network)",
                                "es": "Red de Área Metropolitana",
                                "definition": "A network covering a city or metropolitan area"
                            },
                            {
                                "en": "PAN (Personal Area Network)",
                                "es": "Red de Área Personal",
                                "definition": "A very small network for one person's devices"
                            },
                            {
                                "en": "VPN (Virtual Private Network)",
                                "es": "Red Privada Virtual",
                                "definition": "A secure, encrypted connection over the internet"
                            },
                            {
                                "en": "Topology",
                                "es": "Topología",
                                "definition": "The physical or logical arrangement of devices in a network"
                            },
                            {
                                "en": "Bandwidth",
                                "es": "Ancho de banda",
                                "definition": "The maximum amount of data a network can transfer"
                            },
                            {
                                "en": "Mbps / Gbps",
                                "es": "Mbps / Gbps",
                                "definition": "Megabits/Gigabits per second — units of data transfer speed"
                            },
                            {
                                "en": "Ethernet",
                                "es": "Ethernet",
                                "definition": "A wired networking technology using cables"
                            },
                            {
                                "en": "Bluetooth",
                                "es": "Bluetooth",
                                "definition": "A wireless technology for short-range connections"
                            },
                            {
                                "en": "Encrypted",
                                "es": "Cifrado / Encriptado",
                                "definition": "Data that is coded so only authorized people can read it"
                            },
                            {
                                "en": "Nearshoring",
                                "es": "Nearshoring",
                                "definition": "Outsourcing business operations to a nearby country"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Which type of network covers the smallest area?",
                                "options": [
                                    "LAN",
                                    "WAN",
                                    "PAN",
                                    "MAN"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is the internet classified as?",
                                "options": [
                                    "A LAN",
                                    "A PAN",
                                    "The largest WAN",
                                    "A MAN"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What does a VPN do?",
                                "options": [
                                    "Makes the internet faster",
                                    "Creates a secure tunnel over the internet",
                                    "Replaces Wi-Fi",
                                    "Blocks all network traffic"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "In a Star topology, all devices connect to:",
                                "options": [
                                    "Each other directly",
                                    "A single cable",
                                    "A central switch",
                                    "The internet"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "cyber-m2",
                "title": "Network Protocols and Communication",
                "titleES": "Protocolos de Red y Comunicación",
                "icon": "fa-solid fa-server",
                "readings": [
                    {
                        "id": "cyber-m2-r1",
                        "title": "How Devices Communicate: The OSI Model",
                        "duration": "10 min",
                        "content": "\n# How Devices Communicate: The OSI Model\n\nWhen you send a message from your phone to a friend's computer, the data passes through many different processes before it arrives. Engineers use a model called the **OSI Model** to understand and organize these processes.\n\n## What Is the OSI Model?\n\nThe **OSI Model** (Open Systems Interconnection Model) is a **framework** that divides network communication into **seven layers**. Each layer has a specific job. Think of it like sending a letter: you write the message, put it in an envelope, add the address, and give it to the postal service. Each step is a different \"layer.\"\n\n## The Seven Layers (Simplified)\n\nLet's look at each layer from bottom to top:\n\n### Layer 1 — Physical Layer\nThis is the **hardware** — the actual cables, connectors, and wireless signals that carry data as electrical pulses or radio waves.\n\n**Examples**: Ethernet cables, fiber optic cables, Wi-Fi antennas, USB ports.\n\n**In simple terms**: \"The road that carries the cars.\"\n\n### Layer 2 — Data Link Layer\nThis layer organizes data into **frames** and ensures reliable delivery between two directly connected devices. It uses **MAC addresses** (Media Access Control) — unique hardware identifiers burned into every network device.\n\n**Examples**: Switches operate at this layer. Your Wi-Fi card has a MAC address.\n\n**In simple terms**: \"The traffic lights and lane markings on the road.\"\n\n### Layer 3 — Network Layer\nThis layer handles **routing** — finding the best path for data to travel from source to destination across multiple networks. It uses **IP addresses**.\n\n**Examples**: Routers operate at this layer. Every device on the internet has an IP address.\n\n**In simple terms**: \"The GPS that finds the best route.\"\n\n### Layer 4 — Transport Layer\nThis layer ensures data arrives **completely and in order**. It breaks data into **segments** and numbers them. If a segment is lost, it requests it again.\n\nThe two main protocols at this layer are:\n- **TCP** (Transmission Control Protocol): Reliable, ensures every packet arrives. Used for web pages, email.\n- **UDP** (User Datagram Protocol): Faster but less reliable. Used for video streaming, online gaming.\n\n**In simple terms**: \"The delivery person who checks that all packages arrived.\"\n\n### Layer 5 — Session Layer\nThis layer manages **sessions** — the conversations between devices. It starts, maintains, and closes connections between applications.\n\n**In simple terms**: \"Starting and ending a phone call.\"\n\n### Layer 6 — Presentation Layer\nThis layer handles **data formatting**, **encryption**, and **compression**. It translates data into a format the application can understand.\n\n**Examples**: Converting an image from JPEG to PNG, encrypting data with SSL/TLS.\n\n**In simple terms**: \"The translator who makes sure both people speak the same language.\"\n\n### Layer 7 — Application Layer\nThis is the layer closest to the **user**. It includes the applications and services people interact with directly.\n\n**Examples**: Web browsers (HTTP/HTTPS), email (SMTP), file transfer (FTP).\n\n**In simple terms**: \"The actual conversation — the words you say on the phone.\"\n\n## A Memory Trick\n\nEngineers use this phrase to remember the layers (from Layer 1 to 7):\n\n> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way\n\n(Physical → Data Link → Network → Transport → Session → Presentation → Application)\n\n## Why Does This Matter for Cybersecurity?\n\nDifferent **cyber attacks** target different layers of the OSI model:\n\n| Layer | Attack Example |\n|-------|---------------|\n| Layer 1 | Cable tapping (physically intercepting data) |\n| Layer 2 | MAC spoofing (faking a device's identity) |\n| Layer 3 | IP spoofing (faking an IP address) |\n| Layer 4 | SYN flood (overwhelming a server with connection requests) |\n| Layer 7 | SQL injection, phishing (attacking applications directly) |\n\nUnderstanding the OSI model helps cybersecurity professionals identify **where** an attack is happening and **how** to defend against it.\n\n---\n\n> **Key Takeaway**: The OSI model organizes communication into 7 layers. Each layer has a specific function, and cybersecurity threats can target any layer.\n",
                        "vocabulary": [
                            {
                                "en": "OSI Model",
                                "es": "Modelo OSI",
                                "definition": "A 7-layer framework for understanding network communication"
                            },
                            {
                                "en": "Frame",
                                "es": "Trama",
                                "definition": "A unit of data at the Data Link layer"
                            },
                            {
                                "en": "MAC Address",
                                "es": "Dirección MAC",
                                "definition": "A unique hardware identifier for network devices"
                            },
                            {
                                "en": "Routing",
                                "es": "Enrutamiento",
                                "definition": "The process of finding the best path for data"
                            },
                            {
                                "en": "TCP",
                                "es": "TCP",
                                "definition": "Reliable protocol that ensures all data arrives correctly"
                            },
                            {
                                "en": "UDP",
                                "es": "UDP",
                                "definition": "Fast protocol that doesn't guarantee delivery"
                            },
                            {
                                "en": "Session",
                                "es": "Sesión",
                                "definition": "A connection between two communicating devices"
                            },
                            {
                                "en": "Encryption",
                                "es": "Cifrado",
                                "definition": "The process of converting data into unreadable code for security"
                            },
                            {
                                "en": "HTTP / HTTPS",
                                "es": "HTTP / HTTPS",
                                "definition": "Protocol for web pages. S = Secure (encrypted)"
                            },
                            {
                                "en": "Fiber Optic",
                                "es": "Fibra Óptica",
                                "definition": "Cable that transmits data as light pulses, very fast"
                            },
                            {
                                "en": "Spoofing",
                                "es": "Suplantación",
                                "definition": "Faking an identity (IP, MAC, email) to deceive"
                            }
                        ],
                        "questions": [
                            {
                                "q": "How many layers does the OSI model have?",
                                "options": [
                                    "4",
                                    "5",
                                    "7",
                                    "10"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which layer handles routing and IP addresses?",
                                "options": [
                                    "Physical",
                                    "Data Link",
                                    "Network",
                                    "Transport"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is the difference between TCP and UDP?",
                                "options": [
                                    "TCP is wireless, UDP is wired",
                                    "TCP is reliable, UDP is faster but less reliable",
                                    "They are the same",
                                    "TCP is for video, UDP is for email"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "At which layer do web browsers operate?",
                                "options": [
                                    "Layer 1",
                                    "Layer 4",
                                    "Layer 5",
                                    "Layer 7"
                                ],
                                "answer": 3
                            }
                        ]
                    },
                    {
                        "id": "cyber-m2-r2",
                        "title": "IP Addresses and DNS: The Internet's Address System",
                        "duration": "10 min",
                        "content": "\n# IP Addresses and DNS: The Internet's Address System\n\nEvery device connected to a network needs a unique **address** so other devices can find it and send data to it. This address is called an **IP address**.\n\n## What Is an IP Address?\n\nAn **IP address** (Internet Protocol address) is a **number** assigned to every device on a network. It works like a postal address for your home — it tells the network exactly where to deliver data.\n\nThere are two versions of IP addresses in use today:\n\n### IPv4 (Internet Protocol version 4)\n\nIPv4 addresses look like this: **192.168.1.100**\n\nThey are made up of **four numbers** separated by dots. Each number can be from 0 to 255. This gives approximately **4.3 billion** possible addresses.\n\nThis sounds like a lot, but with billions of devices worldwide (phones, computers, smart TVs, IoT sensors), we have **run out** of IPv4 addresses.\n\n### IPv6 (Internet Protocol version 6)\n\nIPv6 addresses look like this: **2001:0db8:85a3:0000:0000:8a2e:0370:7334**\n\nIPv6 uses **hexadecimal numbers** (0-9 and a-f) and provides approximately **340 undecillion** (3.4 × 10³⁸) addresses — enough for every grain of sand on Earth to have its own address.\n\nThe transition from IPv4 to IPv6 is gradual. Many networks today use both.\n\n## Public vs. Private IP Addresses\n\nNot all IP addresses are equal:\n\n- **Public IP address**: This is your address on the **internet**. It is unique globally. Your Internet Service Provider (ISP) assigns it to your router.\n\n- **Private IP address**: This is your address within your **local network** (LAN). Devices inside the same network use private addresses to communicate with each other.\n\nCommon private IP ranges:\n- **10.0.0.0** — 10.255.255.255\n- **172.16.0.0** — 172.31.255.255\n- **192.168.0.0** — 192.168.255.255\n\nYour router uses a technology called **NAT** (Network Address Translation) to translate between private and public addresses. This is why multiple devices in your home can share one public IP address.\n\n## DNS — The Internet's Phone Book\n\nIP addresses are numbers, but humans prefer to use names. Nobody wants to type **142.250.80.46** to visit Google. We prefer to type **google.com**.\n\nThe **DNS** (Domain Name System) is the service that translates **domain names** (like google.com) into **IP addresses** (like 142.250.80.46).\n\n### How DNS Works (Step by Step):\n\n1. You type **google.com** in your browser.\n2. Your device asks a **DNS resolver** (usually provided by your ISP): \"What is the IP address for google.com?\"\n3. The DNS resolver checks its **cache** (memory). If it has the answer, it responds immediately.\n4. If not, the resolver asks the **root DNS servers**, which direct it to the **.com servers**, which direct it to **Google's DNS servers**.\n5. Google's DNS server responds with the IP address: **142.250.80.46**\n6. Your browser connects to that IP address and loads the page.\n\nThis entire process usually takes less than **50 milliseconds**.\n\n## DNS and Cybersecurity\n\nDNS is a critical system, and attackers often target it:\n\n- **DNS Spoofing** (DNS Poisoning): An attacker inserts fake DNS records so when you type \"mybank.com,\" you are redirected to a fake website that steals your password.\n\n- **DNS Tunneling**: Attackers hide malicious data inside DNS queries to bypass firewalls.\n\n- **DDoS on DNS**: Overwhelming DNS servers with millions of requests to make websites unreachable.\n\n**DNSSEC** (DNS Security Extensions) is a security upgrade that digitally signs DNS records to prevent spoofing.\n\n## Static vs. Dynamic IP\n\n- **Static IP**: An address that never changes. Used for servers that need to be always reachable at the same address.\n- **Dynamic IP**: An address assigned temporarily by a **DHCP** server (Dynamic Host Configuration Protocol). Most home devices use dynamic IPs.\n\n---\n\n> **Key Takeaway**: IP addresses identify devices on a network. DNS translates human-readable names into IP addresses. Both are fundamental systems that cybersecurity professionals must understand and protect.\n",
                        "vocabulary": [
                            {
                                "en": "IP Address",
                                "es": "Dirección IP",
                                "definition": "A unique number identifying a device on a network"
                            },
                            {
                                "en": "IPv4",
                                "es": "IPv4",
                                "definition": "Internet Protocol version 4, uses 32-bit addresses (e.g., 192.168.1.1)"
                            },
                            {
                                "en": "IPv6",
                                "es": "IPv6",
                                "definition": "Internet Protocol version 6, uses 128-bit addresses for more devices"
                            },
                            {
                                "en": "DNS",
                                "es": "Sistema de Nombres de Dominio",
                                "definition": "System that translates domain names to IP addresses"
                            },
                            {
                                "en": "Domain Name",
                                "es": "Nombre de Dominio",
                                "definition": "A human-readable website address (e.g., google.com)"
                            },
                            {
                                "en": "NAT",
                                "es": "Traducción de Direcciones de Red",
                                "definition": "Technology that translates private IPs to public IPs"
                            },
                            {
                                "en": "ISP",
                                "es": "Proveedor de Servicios de Internet",
                                "definition": "Company that provides internet access"
                            },
                            {
                                "en": "Cache",
                                "es": "Caché",
                                "definition": "Stored data for quick future access"
                            },
                            {
                                "en": "DHCP",
                                "es": "DHCP",
                                "definition": "Protocol that automatically assigns IP addresses to devices"
                            },
                            {
                                "en": "DNSSEC",
                                "es": "DNSSEC",
                                "definition": "Security extension for DNS to prevent spoofing"
                            },
                            {
                                "en": "Static IP",
                                "es": "IP Estática",
                                "definition": "A fixed, permanent IP address"
                            },
                            {
                                "en": "Dynamic IP",
                                "es": "IP Dinámica",
                                "definition": "A temporary IP address assigned by DHCP"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why was IPv6 created?",
                                "options": [
                                    "IPv4 is too slow",
                                    "IPv4 ran out of addresses",
                                    "IPv4 is not secure",
                                    "IPv6 uses cables instead of Wi-Fi"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does DNS do?",
                                "options": [
                                    "Protects against viruses",
                                    "Assigns IP addresses automatically",
                                    "Translates domain names to IP addresses",
                                    "Encrypts network traffic"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is DNS Spoofing?",
                                "options": [
                                    "Making DNS faster",
                                    "Inserting fake DNS records to redirect users",
                                    "Blocking DNS completely",
                                    "Creating new domain names"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What type of IP does a web server typically use?",
                                "options": [
                                    "Dynamic IP",
                                    "Private IP",
                                    "Static IP",
                                    "No IP"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "cyber-m3",
                "title": "Introduction to Cybersecurity",
                "titleES": "Introducción a la Ciberseguridad",
                "icon": "fa-solid fa-shield-halved",
                "readings": [
                    {
                        "id": "cyber-m3-r1",
                        "title": "What Is Cybersecurity? The CIA Triad",
                        "duration": "10 min",
                        "content": "\n# What Is Cybersecurity? The CIA Triad\n\nIn a world where companies store sensitive data on computers and send it across networks, protecting that data is critical. This is the job of **cybersecurity**.\n\n## Defining Cybersecurity\n\n**Cybersecurity** is the practice of protecting **systems**, **networks**, and **data** from digital attacks, unauthorized access, and damage. It involves a combination of **technology**, **processes**, and **people**.\n\nCybersecurity is not just about computers. It includes:\n- **Network security**: Protecting the network infrastructure\n- **Application security**: Making sure software doesn't have vulnerabilities\n- **Information security**: Protecting data from unauthorized access\n- **Cloud security**: Securing data stored in cloud platforms\n- **Operational security**: Deciding who has access to what\n\n## The CIA Triad\n\nThe **CIA Triad** is the most important concept in cybersecurity. It stands for:\n\n### C — Confidentiality\n\n**Confidentiality** means that information is only accessible to the people who are **authorized** to see it. Private data should remain private.\n\n**Examples of confidentiality measures**:\n- **Passwords** and multi-factor authentication (MFA)\n- **Encryption** — converting data into unreadable code\n- **Access controls** — only certain employees can open certain files\n- **Classification levels** — labeling data as Public, Internal, Confidential, or Secret\n\n**When confidentiality fails**: A hacker steals the database of a bank and publishes customers' credit card numbers online. This is a **data breach**.\n\n### I — Integrity\n\n**Integrity** means that data is **accurate** and has not been **modified** by unauthorized people. You need to trust that the information you receive is the same information that was sent.\n\n**Examples of integrity measures**:\n- **Checksums** and **hash functions** — mathematical calculations that verify data hasn't changed\n- **Digital signatures** — prove who created or modified a document\n- **Version control** — tracking all changes to files\n- **Backups** — copies of data in case the original is corrupted\n\n**When integrity fails**: An attacker modifies a financial report before the CEO reads it, changing the numbers to hide fraud.\n\n### A — Availability\n\n**Availability** means that systems and data are **accessible** when authorized users need them. There is no point in having data if nobody can reach it.\n\n**Examples of availability measures**:\n- **Redundancy** — having backup servers ready to take over if the main server fails\n- **Load balancing** — distributing traffic across multiple servers\n- **Disaster recovery plans** — procedures to restore systems after a catastrophe\n- **DDoS protection** — defending against attacks that try to overwhelm servers\n\n**When availability fails**: A hospital's computer system goes down during a DDoS attack, and doctors cannot access patient records.\n\n## Balancing the Triad\n\nThe three principles sometimes **conflict** with each other:\n\n- Making data extremely confidential (lots of passwords, encryption) can reduce **availability** (users have to wait longer to access it).\n- Making data always available (no passwords, no restrictions) reduces **confidentiality**.\n- Adding integrity checks (verifying every piece of data) can slow down the system, reducing **availability**.\n\nGood cybersecurity is about finding the right **balance** for each situation.\n\n## Why Cybersecurity Matters for Nearshoring\n\nIn the nearshoring industry, Mexican companies often handle **sensitive data** from U.S. clients:\n- Customer personal information\n- Financial records\n- Proprietary technology and trade secrets\n- Medical data (HIPAA compliance)\n\nA security breach can result in:\n- **Legal penalties** (millions of dollars in fines)\n- **Loss of client trust** (the client may move to a competitor)\n- **Operational shutdown** (systems locked by ransomware)\n\nThis is why cybersecurity professionals are in such **high demand** in the nearshoring market.\n\n---\n\n> **Key Takeaway**: Cybersecurity protects systems, networks, and data. The CIA Triad (Confidentiality, Integrity, Availability) is the foundation of all security decisions.\n",
                        "vocabulary": [
                            {
                                "en": "Cybersecurity",
                                "es": "Ciberseguridad",
                                "definition": "The practice of protecting systems, networks, and data from attacks"
                            },
                            {
                                "en": "CIA Triad",
                                "es": "Tríada CID",
                                "definition": "Confidentiality, Integrity, Availability — the three pillars of security"
                            },
                            {
                                "en": "Confidentiality",
                                "es": "Confidencialidad",
                                "definition": "Ensuring data is only accessible to authorized people"
                            },
                            {
                                "en": "Integrity",
                                "es": "Integridad",
                                "definition": "Ensuring data is accurate and unmodified"
                            },
                            {
                                "en": "Availability",
                                "es": "Disponibilidad",
                                "definition": "Ensuring systems and data are accessible when needed"
                            },
                            {
                                "en": "Data Breach",
                                "es": "Filtración de Datos",
                                "definition": "Unauthorized access to sensitive data"
                            },
                            {
                                "en": "Authentication",
                                "es": "Autenticación",
                                "definition": "Verifying the identity of a user or device"
                            },
                            {
                                "en": "Access Control",
                                "es": "Control de Acceso",
                                "definition": "Rules determining who can access what resources"
                            },
                            {
                                "en": "Redundancy",
                                "es": "Redundancia",
                                "definition": "Backup systems ready to take over if the primary fails"
                            },
                            {
                                "en": "DDoS",
                                "es": "DDoS",
                                "definition": "Distributed Denial of Service — overwhelming a server with traffic"
                            },
                            {
                                "en": "Hash Function",
                                "es": "Función Hash",
                                "definition": "Mathematical calculation that creates a unique fingerprint of data"
                            },
                            {
                                "en": "Compliance",
                                "es": "Cumplimiento",
                                "definition": "Following legal and regulatory requirements"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does CIA stand for in cybersecurity?",
                                "options": [
                                    "Central Intelligence Agency",
                                    "Computer Information Architecture",
                                    "Confidentiality, Integrity, Availability",
                                    "Cybersecurity International Alliance"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is a data breach?",
                                "options": [
                                    "When a hard drive breaks",
                                    "Unauthorized access to sensitive data",
                                    "When the internet is slow",
                                    "When a password is too long"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which CIA principle is about making sure data hasn't been changed?",
                                "options": [
                                    "Confidentiality",
                                    "Integrity",
                                    "Availability",
                                    "Authentication"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is cybersecurity important for nearshoring companies?",
                                "options": [
                                    "To make websites look better",
                                    "Because computers are expensive",
                                    "They handle sensitive client data from other countries",
                                    "To save electricity"
                                ],
                                "answer": 2
                            }
                        ]
                    },
                    {
                        "id": "cyber-m3-r2",
                        "title": "Common Cyber Threats: Malware, Phishing, and Ransomware",
                        "duration": "10 min",
                        "content": "\n# Common Cyber Threats: Malware, Phishing, and Ransomware\n\nTo protect a network, you first need to understand the **threats** you're defending against. In this reading, we'll explore the most common types of cyber attacks that affect businesses and individuals.\n\n## Malware — Malicious Software\n\n**Malware** (short for \"malicious software\") is any software designed to **harm**, **exploit**, or gain **unauthorized access** to a computer system. Malware comes in many forms:\n\n### Virus\nA **virus** is malware that **attaches itself** to a legitimate file or program. When the user opens the infected file, the virus activates and spreads to other files. Like a biological virus, it needs a \"host\" to survive.\n\n**How it spreads**: Email attachments, infected USB drives, downloaded software.\n\n### Worm\nA **worm** is similar to a virus, but it can **spread on its own** across networks without needing a human to open a file. Worms exploit vulnerabilities in operating systems to move from device to device automatically.\n\n**Famous example**: The **WannaCry** worm (2017) infected over 200,000 computers in 150 countries in just a few days.\n\n### Trojan Horse\nA **Trojan** (named after the Greek myth) is malware that **disguises itself** as legitimate software. The user thinks they're installing a useful program, but the Trojan secretly installs malicious code.\n\n**Example**: A free \"game\" that secretly records your keystrokes and sends your passwords to an attacker.\n\n### Spyware\n**Spyware** is software that **secretly monitors** your activities — which websites you visit, what you type, even your webcam. It sends this information to the attacker.\n\n### Adware\n**Adware** is software that displays **unwanted advertisements** on your computer. While not always dangerous, it slows down your system and can be a gateway for more serious malware.\n\n## Phishing — The Art of Deception\n\n**Phishing** is a **social engineering** attack where the attacker pretends to be a trusted person or organization to trick you into revealing sensitive information.\n\n### How Phishing Works:\n\n1. You receive an email that looks like it's from your bank: \"URGENT: Your account has been compromised. Click here to verify your identity.\"\n2. The link takes you to a **fake website** that looks exactly like your bank's real website.\n3. You enter your username and password.\n4. The attacker now has your **credentials** and can access your real bank account.\n\n### Types of Phishing:\n\n| Type | Description |\n|------|-------------|\n| **Email Phishing** | Mass emails sent to thousands of people |\n| **Spear Phishing** | Targeted at a specific person using personal information |\n| **Whaling** | Targeted at high-level executives (the \"big fish\") |\n| **Smishing** | Phishing via SMS text messages |\n| **Vishing** | Phishing via voice calls |\n\n### How to Identify Phishing:\n\n- Check the sender's **email address** carefully (misspellings like \"g00gle.com\")\n- Look for **urgency** and **fear tactics** (\"Act now or your account will be closed!\")\n- **Hover over links** before clicking to see the real URL\n- Legitimate companies never ask for passwords via email\n- Look for **grammar mistakes** and odd formatting\n\n## Ransomware — Your Files for Ransom\n\n**Ransomware** is a type of malware that **encrypts** all your files and demands **payment** (a ransom) to unlock them. If you don't pay, your data is lost — or the attacker threatens to publish it.\n\n### How Ransomware Works:\n\n1. The victim clicks a malicious link or opens an infected attachment.\n2. The ransomware silently encrypts all files on the computer (and sometimes the entire network).\n3. A message appears: \"Your files have been encrypted. Pay 2 Bitcoin ($60,000) within 72 hours or your data will be deleted.\"\n4. The victim must decide whether to **pay** (no guarantee the attacker will unlock the files) or **restore from backups** (if they have them).\n\n### Ransomware in the Real World:\n\n- **Colonial Pipeline** (2021): A ransomware attack shut down the largest fuel pipeline in the U.S. for six days. The company paid $4.4 million in ransom.\n- **Costa Rica** (2022): The Conti ransomware group attacked the government of Costa Rica, forcing the country to declare a national emergency.\n\n### How to Protect Against Ransomware:\n\n- Keep **regular backups** of all important data (offline, disconnected from the network)\n- Keep all software and systems **up to date** with security patches\n- Train employees to **recognize phishing** emails\n- Use **endpoint protection** software (advanced antivirus)\n- Implement **network segmentation** so ransomware can't spread to the entire network\n\n---\n\n> **Key Takeaway**: Malware, phishing, and ransomware are the most common cyber threats. Understanding how they work is the first step to defending against them.\n",
                        "vocabulary": [
                            {
                                "en": "Malware",
                                "es": "Software Malicioso",
                                "definition": "Software designed to harm or exploit computer systems"
                            },
                            {
                                "en": "Virus",
                                "es": "Virus",
                                "definition": "Malware that attaches to files and spreads when opened"
                            },
                            {
                                "en": "Worm",
                                "es": "Gusano",
                                "definition": "Self-replicating malware that spreads across networks automatically"
                            },
                            {
                                "en": "Trojan",
                                "es": "Troyano",
                                "definition": "Malware disguised as legitimate software"
                            },
                            {
                                "en": "Phishing",
                                "es": "Phishing / Suplantación",
                                "definition": "Tricking users into revealing passwords by impersonating trusted entities"
                            },
                            {
                                "en": "Social Engineering",
                                "es": "Ingeniería Social",
                                "definition": "Manipulating people psychologically to obtain information"
                            },
                            {
                                "en": "Ransomware",
                                "es": "Ransomware / Secuestro de datos",
                                "definition": "Malware that encrypts files and demands payment"
                            },
                            {
                                "en": "Credentials",
                                "es": "Credenciales",
                                "definition": "Username and password used to access a system"
                            },
                            {
                                "en": "Spear Phishing",
                                "es": "Phishing Dirigido",
                                "definition": "Phishing targeted at a specific individual"
                            },
                            {
                                "en": "Endpoint",
                                "es": "Punto Final / Endpoint",
                                "definition": "Any device connected to a network (computer, phone)"
                            },
                            {
                                "en": "Patch",
                                "es": "Parche",
                                "definition": "A software update that fixes security vulnerabilities"
                            },
                            {
                                "en": "Backup",
                                "es": "Respaldo / Copia de seguridad",
                                "definition": "A copy of data stored separately for recovery"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the difference between a virus and a worm?",
                                "options": [
                                    "There is no difference",
                                    "A virus needs a host file; a worm spreads on its own",
                                    "A worm is more dangerous than a virus",
                                    "Viruses only affect phones"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the goal of phishing?",
                                "options": [
                                    "To encrypt your files",
                                    "To slow down your computer",
                                    "To trick you into revealing your passwords",
                                    "To install new software"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What should you do if you receive a ransomware attack?",
                                "options": [
                                    "Pay the ransom immediately",
                                    "Turn off the computer and never use it again",
                                    "Restore from backups and report the incident",
                                    "Delete all your emails"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which type of phishing targets high-level executives?",
                                "options": [
                                    "Smishing",
                                    "Vishing",
                                    "Whaling",
                                    "Email Phishing"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "cyber-m4",
                "title": "Network Security Tools and Defenses",
                "titleES": "Herramientas y Defensas de Seguridad de Red",
                "icon": "fa-solid fa-lock",
                "readings": [
                    {
                        "id": "cyber-m4-r1",
                        "title": "Firewalls, IDS, and Encryption",
                        "duration": "10 min",
                        "content": "\n# Firewalls, IDS, and Encryption\n\nNow that we understand the threats, let's study the **tools** cybersecurity professionals use to defend networks. These are the essential defense mechanisms every network engineer must know.\n\n## Firewalls — The Network's Security Gate\n\nA **firewall** is a security device (hardware or software) that **monitors and controls** network traffic based on predefined security **rules**. It acts as a barrier between a trusted internal network and untrusted external networks (like the internet).\n\n### How a Firewall Works:\n\nThe firewall examines each **packet** of data and decides whether to **allow** it through or **block** it based on:\n\n- **Source IP address** — Where is the data coming from?\n- **Destination IP address** — Where is it going?\n- **Port number** — What service is it using? (Port 80 = HTTP, Port 443 = HTTPS, Port 22 = SSH)\n- **Protocol** — Is it TCP, UDP, or something else?\n\n### Types of Firewalls:\n\n| Type | Description | Use Case |\n|------|-------------|----------|\n| **Packet Filter** | Examines individual packets based on IP/port rules | Basic protection |\n| **Stateful Inspection** | Tracks active connections and context | Most modern firewalls |\n| **Application Layer** | Inspects the actual content of the data | Blocking specific web content |\n| **Next-Gen (NGFW)** | Combines all above + IDS + deep packet inspection | Enterprise networks |\n\n**Analogy**: A firewall is like the security guard at a building entrance. The guard checks your ID (IP address), your purpose (port/protocol), and decides whether to let you in.\n\n## IDS and IPS — Detecting and Preventing Intrusions\n\nWhile firewalls control access, **IDS** and **IPS** systems focus on detecting suspicious activity:\n\n### IDS — Intrusion Detection System\n\nAn IDS **monitors** network traffic and **alerts** administrators when it detects something suspicious. It does NOT block the traffic — it only reports it.\n\nThink of an IDS like a **security camera**. It watches everything and sends an alert if something looks wrong, but a human must respond.\n\n### IPS — Intrusion Prevention System\n\nAn IPS does everything an IDS does, but it can also **automatically block** the suspicious traffic. It's a security camera with an automatic door lock.\n\n### Detection Methods:\n\n- **Signature-based**: Compares traffic to a database of known attack patterns. Fast but can't detect new, unknown attacks.\n- **Anomaly-based**: Learns what \"normal\" traffic looks like and flags anything unusual. Can detect new attacks but may produce **false positives** (false alarms).\n\n## Encryption — Locking Data with Math\n\n**Encryption** is the process of converting readable data (**plaintext**) into unreadable code (**ciphertext**) using a mathematical **algorithm** and a **key**. Only someone with the correct key can convert the ciphertext back to plaintext (**decryption**).\n\n### Symmetric Encryption\n\nBoth the sender and receiver use the **same key** to encrypt and decrypt data.\n\n- **Fast** and efficient for large amounts of data\n- **Problem**: How do you securely share the key with the other person?\n- **Example algorithm**: AES (Advanced Encryption Standard) — used to protect top-secret government data\n\n### Asymmetric Encryption (Public-Key Cryptography)\n\nUses **two different keys**:\n- A **public key** (everyone can see it) — used to encrypt data\n- A **private key** (kept secret) — used to decrypt data\n\n- **Slower** than symmetric encryption\n- **Solves the key-sharing problem** — you can publish your public key openly\n- **Example algorithm**: RSA (Rivest–Shamir–Adleman)\n\n### Encryption in Practice:\n\n| Where | Protocol | Type |\n|-------|----------|------|\n| **Websites** | HTTPS (TLS/SSL) | Asymmetric + Symmetric |\n| **Wi-Fi** | WPA3 | Symmetric |\n| **Email** | PGP / S/MIME | Asymmetric |\n| **VPN** | IPsec / WireGuard | Both |\n| **Messaging** | Signal Protocol | Asymmetric |\n\nWhen you see the **lock icon** 🔒 in your browser, it means the connection is encrypted with TLS — your data is protected between your device and the server.\n\n## Defense in Depth\n\nGood cybersecurity uses **multiple layers** of defense — this strategy is called **Defense in Depth**. No single tool is enough:\n\n1. **Firewall** → Controls what enters the network\n2. **IDS/IPS** → Detects suspicious activity\n3. **Encryption** → Protects data even if intercepted\n4. **Antivirus** → Detects malware on individual devices\n5. **Training** → Educates users to recognize threats\n6. **Backups** → Ensures data recovery if everything else fails\n\n---\n\n> **Key Takeaway**: Firewalls control access, IDS/IPS detect threats, and encryption protects data. A strong defense uses all three together in a \"Defense in Depth\" strategy.\n",
                        "vocabulary": [
                            {
                                "en": "Firewall",
                                "es": "Cortafuegos / Firewall",
                                "definition": "A device that monitors and filters network traffic"
                            },
                            {
                                "en": "IDS",
                                "es": "Sistema de Detección de Intrusos",
                                "definition": "System that detects and alerts about suspicious activity"
                            },
                            {
                                "en": "IPS",
                                "es": "Sistema de Prevención de Intrusos",
                                "definition": "System that detects AND blocks suspicious activity"
                            },
                            {
                                "en": "Encryption",
                                "es": "Cifrado",
                                "definition": "Converting data into unreadable code using a key"
                            },
                            {
                                "en": "Plaintext",
                                "es": "Texto Plano",
                                "definition": "Readable, unencrypted data"
                            },
                            {
                                "en": "Ciphertext",
                                "es": "Texto Cifrado",
                                "definition": "Encrypted, unreadable data"
                            },
                            {
                                "en": "Public Key",
                                "es": "Clave Pública",
                                "definition": "Key shared openly, used to encrypt data"
                            },
                            {
                                "en": "Private Key",
                                "es": "Clave Privada",
                                "definition": "Secret key used to decrypt data"
                            },
                            {
                                "en": "AES",
                                "es": "AES",
                                "definition": "Advanced Encryption Standard — a symmetric algorithm"
                            },
                            {
                                "en": "TLS/SSL",
                                "es": "TLS/SSL",
                                "definition": "Protocols that encrypt web traffic (HTTPS)"
                            },
                            {
                                "en": "False Positive",
                                "es": "Falso Positivo",
                                "definition": "A security alert triggered by non-malicious activity"
                            },
                            {
                                "en": "Defense in Depth",
                                "es": "Defensa en Profundidad",
                                "definition": "Using multiple layers of security"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does a firewall examine to decide whether to allow traffic?",
                                "options": [
                                    "Only the user's name",
                                    "Source/destination IP, port, and protocol",
                                    "The computer's brand",
                                    "The time of day only"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the main difference between IDS and IPS?",
                                "options": [
                                    "IDS is hardware, IPS is software",
                                    "IDS only detects; IPS detects and blocks",
                                    "IPS is older technology",
                                    "There is no difference"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "In asymmetric encryption, which key is used to encrypt data?",
                                "options": [
                                    "Private key",
                                    "Public key",
                                    "Both keys together",
                                    "No key is needed"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does the lock icon in your browser mean?",
                                "options": [
                                    "The website is popular",
                                    "The connection is encrypted with TLS",
                                    "The website has no viruses",
                                    "The website is a government site"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "cyber-m5",
                "title": "Security Best Practices in the Workplace",
                "titleES": "Mejores Prácticas de Seguridad en el Trabajo",
                "icon": "fa-solid fa-user-shield",
                "readings": [
                    {
                        "id": "cyber-m5-r1",
                        "title": "Password Security and Multi-Factor Authentication",
                        "duration": "10 min",
                        "content": "\n# Password Security and Multi-Factor Authentication\n\nThe simplest and most common security vulnerability is a **weak password**. In this reading, you'll learn how to create strong passwords and why passwords alone are not enough.\n\n## The Problem with Passwords\n\nAccording to security research:\n- **81%** of data breaches involve weak or stolen passwords\n- The most common password in 2025 is still **\"123456\"**\n- The average person has **100+ online accounts** but uses only **5-7 unique passwords**\n\nHackers use several methods to crack passwords:\n\n### Brute Force Attack\nThe attacker tries **every possible combination** of characters until finding the right one. A 4-digit PIN has only 10,000 possibilities — a computer can try all of them in seconds.\n\n### Dictionary Attack\nThe attacker uses a **list of common words and passwords** (like \"password,\" \"admin,\" \"love2024\") to guess credentials.\n\n### Credential Stuffing\nWhen a website is breached and passwords are leaked, attackers try those same username/password combinations on **other websites** (because people reuse passwords).\n\n## Creating Strong Passwords\n\nA strong password should be:\n- **At least 12 characters** long\n- A mix of **uppercase** letters, **lowercase** letters, **numbers**, and **special characters** (!@#$%^&*)\n- **Not a dictionary word** or common phrase\n- **Unique** for each account\n\n### The Passphrase Method\n\nInstead of remembering complex strings like \"xK9#mQ2$pL\", use a **passphrase** — a sequence of random words that is easy to remember but hard to guess:\n\n> **\"Purple-Cactus-Runs-Toward-42-Moons\"**\n\nThis passphrase is 37 characters long, contains uppercase, lowercase, numbers, special characters, and would take **centuries** to brute-force crack.\n\n### Password Managers\n\nA **password manager** is software that:\n- **Generates** strong, unique passwords for every account\n- **Stores** all passwords in an encrypted **vault**\n- **Auto-fills** login forms\n- You only need to remember **one master password**\n\nPopular password managers: Bitwarden, 1Password, LastPass, KeePass.\n\n## Multi-Factor Authentication (MFA)\n\nEven the strongest password can be stolen through phishing. This is why we use **MFA** — requiring **two or more** forms of identification:\n\n### The Three Factors:\n\n| Factor | What It Is | Examples |\n|--------|-----------|----------|\n| **Something you know** | Knowledge | Password, PIN, security question |\n| **Something you have** | Possession | Phone (SMS code), hardware token, authenticator app |\n| **Something you are** | Biometrics | Fingerprint, face recognition, iris scan |\n\n### Common MFA Methods:\n\n1. **SMS Code**: A 6-digit code sent to your phone via text message. Better than nothing, but **vulnerable** to SIM-swapping attacks.\n\n2. **Authenticator App**: Apps like Google Authenticator or Microsoft Authenticator generate a **time-based code** (TOTP) that changes every 30 seconds. More secure than SMS.\n\n3. **Hardware Security Key**: A physical device (like YubiKey) that you plug into your computer or tap on your phone. The **most secure** method, virtually immune to phishing.\n\n4. **Biometric**: Your fingerprint, face, or voice. Convenient but cannot be changed if compromised.\n\n### MFA in the Workplace\n\nIn a professional environment, especially in nearshoring:\n- **Email accounts** should always have MFA enabled\n- **VPN access** to client networks requires MFA\n- **Cloud platforms** (AWS, Azure, Google Cloud) should use MFA for admin accounts\n- **Code repositories** (GitHub, GitLab) should require MFA for all developers\n\n## The Zero Trust Model\n\nModern cybersecurity follows the **Zero Trust** principle: **\"Never trust, always verify.\"**\n\nIn a Zero Trust environment:\n- No device or user is automatically trusted, even inside the company network\n- Every access request is **verified** with authentication\n- Users have the **minimum access** they need to do their job (Principle of Least Privilege)\n- All network activity is **logged and monitored**\n\n---\n\n> **Key Takeaway**: Strong passwords and MFA are the first line of defense. Use a password manager, enable MFA everywhere, and follow Zero Trust principles.\n",
                        "vocabulary": [
                            {
                                "en": "Brute Force Attack",
                                "es": "Ataque de Fuerza Bruta",
                                "definition": "Trying every possible password combination"
                            },
                            {
                                "en": "Dictionary Attack",
                                "es": "Ataque de Diccionario",
                                "definition": "Using a list of common words to guess passwords"
                            },
                            {
                                "en": "Credential Stuffing",
                                "es": "Relleno de Credenciales",
                                "definition": "Using stolen passwords from one site on other sites"
                            },
                            {
                                "en": "Passphrase",
                                "es": "Frase de Contraseña",
                                "definition": "A long password made of multiple random words"
                            },
                            {
                                "en": "Password Manager",
                                "es": "Gestor de Contraseñas",
                                "definition": "Software that generates and stores strong passwords"
                            },
                            {
                                "en": "MFA",
                                "es": "Autenticación Multifactor",
                                "definition": "Requiring two or more forms of ID to access an account"
                            },
                            {
                                "en": "TOTP",
                                "es": "TOTP",
                                "definition": "Time-based One-Time Password — code that changes every 30 seconds"
                            },
                            {
                                "en": "Biometrics",
                                "es": "Biometría",
                                "definition": "Using physical characteristics (fingerprint, face) for identification"
                            },
                            {
                                "en": "Zero Trust",
                                "es": "Confianza Cero",
                                "definition": "Security model where nothing is automatically trusted"
                            },
                            {
                                "en": "Least Privilege",
                                "es": "Privilegio Mínimo",
                                "definition": "Giving users only the access they need, nothing more"
                            },
                            {
                                "en": "Vault",
                                "es": "Bóveda",
                                "definition": "Encrypted storage for sensitive data like passwords"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the most secure MFA method?",
                                "options": [
                                    "SMS code",
                                    "Security question",
                                    "Hardware security key",
                                    "Email verification"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What does 'Zero Trust' mean?",
                                "options": [
                                    "Don't trust any software",
                                    "Never trust, always verify every access request",
                                    "Don't use the internet",
                                    "Trust only Microsoft products"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is 'password123' a bad password?",
                                "options": [
                                    "It's too long",
                                    "It uses numbers",
                                    "It's a common word easily guessed in a dictionary attack",
                                    "It contains special characters"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What does a password manager do?",
                                "options": [
                                    "Blocks hackers",
                                    "Generates, stores, and auto-fills strong unique passwords",
                                    "Replaces your keyboard",
                                    "Sends passwords to your email"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "cyber-m6",
                "title": "Career Paths in Cybersecurity",
                "titleES": "Trayectorias Profesionales en Ciberseguridad",
                "icon": "fa-solid fa-briefcase",
                "readings": [
                    {
                        "id": "cyber-m6-r1",
                        "title": "Cybersecurity Careers and Certifications",
                        "duration": "10 min",
                        "content": "\n# Cybersecurity Careers and Certifications\n\nCybersecurity is one of the **fastest-growing** career fields in the world. According to Cybersecurity Ventures, there will be **3.5 million unfilled cybersecurity jobs** globally by 2025. For professionals in Mexico's nearshoring industry, this represents an enormous opportunity.\n\n## Entry-Level Roles\n\n### Security Analyst (SOC Analyst)\n\nA **Security Operations Center (SOC) Analyst** is usually the first cybersecurity role. SOC analysts work in shifts, monitoring security alerts 24/7.\n\n**Responsibilities**:\n- Monitor security dashboards and **SIEM** (Security Information and Event Management) tools\n- Investigate **alerts** and determine if they are real threats or false positives\n- Escalate confirmed incidents to senior analysts\n- Write incident reports\n\n**Average salary (Mexico nearshoring)**: $25,000 - $45,000 USD/year\n**Required skills**: Networking fundamentals, log analysis, basic scripting\n\n### IT Support / Help Desk (Security Focus)\n\nMany cybersecurity professionals start in **IT support**, helping users with technical problems while learning about security tools and policies.\n\n## Mid-Level Roles\n\n### Penetration Tester (Ethical Hacker)\n\nA **penetration tester** (or \"pen tester\") is hired by companies to **hack their own systems** — legally. They find vulnerabilities before real attackers do.\n\n**Responsibilities**:\n- Conduct **vulnerability assessments** and penetration tests\n- Write detailed reports explaining each vulnerability and how to fix it\n- Test web applications, networks, and physical security\n- Stay up to date with the latest attack techniques\n\n**Average salary**: $50,000 - $90,000 USD/year\n\n### Security Engineer\n\nA **security engineer** designs and implements the security infrastructure — firewalls, IDS/IPS, VPNs, encryption systems.\n\n**Responsibilities**:\n- Configure and maintain security tools\n- Design secure network architectures\n- Respond to and remediate security incidents\n- Automate security processes with scripts\n\n**Average salary**: $55,000 - $100,000 USD/year\n\n## Senior / Specialized Roles\n\n### Security Architect\nDesigns the overall security strategy for an organization. Requires 8-10+ years of experience.\n\n### Incident Response Manager\nLeads the team that responds to active cyber attacks. Works under extreme pressure and time constraints.\n\n### Chief Information Security Officer (CISO)\nThe executive responsible for all cybersecurity in an organization. Reports directly to the CEO.\n\n## Key Certifications\n\nCertifications prove your knowledge and significantly increase your earning potential:\n\n| Certification | Organization | Level | Focus |\n|--------------|-------------|-------|-------|\n| **CompTIA Security+** | CompTIA | Entry | General security fundamentals |\n| **CEH** (Certified Ethical Hacker) | EC-Council | Mid | Penetration testing |\n| **CISSP** (Certified Information Systems Security Professional) | ISC² | Senior | Security management & strategy |\n| **OSCP** (Offensive Security Certified Professional) | OffSec | Mid-Senior | Hands-on penetration testing |\n| **CCNA Security** | Cisco | Entry-Mid | Network security (Cisco devices) |\n\n### Recommended Path for Mexico Nearshoring:\n\n1. **Start**: CompTIA Network+ → CompTIA Security+\n2. **Specialize**: CEH or CCNA Security\n3. **Advance**: CISSP or OSCP\n\n## Skills in Demand (Nearshoring Market)\n\nCompanies hiring cybersecurity professionals for nearshoring operations especially value:\n\n- **English proficiency** (B1-B2 minimum) — most tools, documentation, and client communication are in English\n- **Cloud security** (AWS, Azure, Google Cloud)\n- **SIEM tools** (Splunk, QRadar, Microsoft Sentinel)\n- **Scripting** (Python, Bash, PowerShell)\n- **Compliance knowledge** (SOC 2, ISO 27001, HIPAA, GDPR)\n- **Incident response** experience\n\n## The Importance of English\n\nIn the cybersecurity field, English is not optional — it is **essential**:\n\n- All major **security tools** have English interfaces\n- **CVE reports** (Common Vulnerabilities and Exposures) are published in English\n- **Incident reports** for U.S. clients must be written in English\n- **Certifications** exams are primarily in English\n- **Security conferences** (DEF CON, Black Hat, RSA) are conducted in English\n\nThis is exactly why you are taking this course — combining cybersecurity knowledge with technical and communication skills makes you a **highly competitive** candidate in the nearshoring market.\n\n---\n\n> **Key Takeaway**: Cybersecurity offers excellent career opportunities, especially in Mexico's nearshoring industry. Start with foundational certifications, develop strong English skills, and specialize in high-demand areas like cloud security and incident response.\n",
                        "vocabulary": [
                            {
                                "en": "SOC (Security Operations Center)",
                                "es": "Centro de Operaciones de Seguridad",
                                "definition": "A team/facility that monitors security 24/7"
                            },
                            {
                                "en": "SIEM",
                                "es": "SIEM",
                                "definition": "Software that collects and analyzes security logs from all systems"
                            },
                            {
                                "en": "Penetration Testing",
                                "es": "Pruebas de Penetración",
                                "definition": "Legally hacking systems to find vulnerabilities"
                            },
                            {
                                "en": "Vulnerability",
                                "es": "Vulnerabilidad",
                                "definition": "A weakness in a system that can be exploited"
                            },
                            {
                                "en": "Ethical Hacker",
                                "es": "Hacker Ético",
                                "definition": "A security professional who hacks with permission to find weaknesses"
                            },
                            {
                                "en": "Incident Response",
                                "es": "Respuesta a Incidentes",
                                "definition": "The process of handling a cyber attack"
                            },
                            {
                                "en": "CISO",
                                "es": "Director de Seguridad de la Información",
                                "definition": "Chief Information Security Officer — top security executive"
                            },
                            {
                                "en": "Certification",
                                "es": "Certificación",
                                "definition": "Official proof of professional knowledge and skills"
                            },
                            {
                                "en": "Compliance",
                                "es": "Cumplimiento Normativo",
                                "definition": "Following laws and regulations (SOC 2, HIPAA, GDPR)"
                            },
                            {
                                "en": "CVE",
                                "es": "CVE",
                                "definition": "Common Vulnerabilities and Exposures — public database of known security flaws"
                            },
                            {
                                "en": "Remediate",
                                "es": "Remediar",
                                "definition": "To fix a security problem"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the usual first cybersecurity job?",
                                "options": [
                                    "CISO",
                                    "Security Architect",
                                    "SOC Analyst",
                                    "Penetration Tester"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What does a penetration tester do?",
                                "options": [
                                    "Builds firewalls",
                                    "Legally hacks systems to find vulnerabilities",
                                    "Manages passwords",
                                    "Designs websites"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which certification is recommended for entry-level professionals?",
                                "options": [
                                    "CISSP",
                                    "OSCP",
                                    "CompTIA Security+",
                                    "CEH"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why is English important in cybersecurity?",
                                "options": [
                                    "It's not important",
                                    "All security tools and reports are primarily in English",
                                    "Only for Americans",
                                    "English passwords are stronger"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            }
        ],
        "category": "technology"
    },
    "it-innovation": {
        "id": "it-innovation",
        "title": "Tecnologías de la Información e Innovación Digital",
        "titleEN": "Information Technology & Digital Innovation",
        "level": "A2-B1",
        "status": "full",
        "description": "English for IT professionals — cloud computing, software development, databases, DevOps, and digital transformation.",
        "descriptionES": "Inglés para profesionales de TI — computación en la nube, desarrollo de software, bases de datos, DevOps y transformación digital.",
        "totalModules": 10,
        "estimatedHours": 20,
        "prerequisites": [
            "esp-foundation"
        ],
        "standard": "CONOCER EC0217.01",
        "conocer": "EC0217.01 (Capacitación Digital y Cloud)",
        "ngss": "HS-ETS1-4 (Computer Modeling & Cloud Infrastructure)",
        "industry": "AWS CLF-C02 / Google Cloud CDL / CompTIA A+",
        "modules": [
            {
                "id": "it-m1",
                "title": "Introduction to Information Technology",
                "titleES": "Introducción a las Tecnologías de la Información",
                "icon": "fa-solid fa-laptop-code",
                "readings": [
                    {
                        "id": "it-m1-r1",
                        "title": "What Is Information Technology?",
                        "duration": "10 min",
                        "content": "\n# What Is Information Technology?\n\nInformation Technology — or **IT** — is everywhere. Every time you use your phone, make a purchase online, send a message, or take a class, you are interacting with IT systems. But what exactly does IT mean as a career field?\n\n## A Working Definition\n\n**Information Technology** is the use of computers, networks, software, and electronic systems to store, process, protect, and transmit information. IT is the infrastructure that makes modern business, education, healthcare, and government work.\n\nThink of IT as the \"nervous system\" of any organization — it connects everything and keeps information flowing.\n\n## The Five Pillars of IT\n\n### 1. Hardware\nThe physical devices: servers, laptops, routers, switches, monitors, keyboards, mobile devices. Without hardware, there is no IT.\n\n### 2. Software\nThe programs and operating systems that run on hardware: Windows, Linux, macOS, mobile apps, enterprise applications like SAP or Salesforce.\n\n### 3. Networking\nConnecting devices so they can communicate — LANs, WANs, the internet, Wi-Fi, VPNs. This is the \"plumbing\" of IT.\n\n### 4. Data & Databases\nStoring, organizing, and retrieving information. From a simple spreadsheet to massive cloud databases holding billions of records.\n\n### 5. Security\nProtecting all of the above from unauthorized access, attacks, and data loss. Cybersecurity is one of the fastest-growing IT specialties.\n\n## The Cloud Revolution\n\nThe most significant shift in IT over the past decade is the move from **on-premises** (servers in your office) to **cloud computing** (servers in someone else's data center, accessed via the internet).\n\n| Traditional IT | Cloud IT |\n|----------------|----------|\n| Buy and maintain your own servers | Rent computing power on demand |\n| High upfront capital expense | Pay-as-you-go operating expense |\n| Limited by physical capacity | Scale up or down instantly |\n| You manage everything | Cloud provider manages infrastructure |\n\nThe three major cloud providers are:\n- **AWS** (Amazon Web Services) — ~31% market share\n- **Microsoft Azure** — ~25% market share  \n- **Google Cloud Platform (GCP)** — ~11% market share\n\n## IT in Mexico's Nearshoring Landscape\n\nMexico is one of the top IT outsourcing destinations in the Americas:\n- **Guadalajara** is called \"Mexico's Silicon Valley\" — home to Intel, Oracle, IBM, and hundreds of startups\n- **Monterrey** leads in enterprise IT services and fintech\n- **Mexico City** is Latin America's largest tech hub with 10,000+ tech companies\n- **Querétaro** and **Aguascalientes** are emerging data center hubs\n\nBy 2026, Mexico has approximately **700,000 IT professionals**, but the industry needs **1.2 million** — creating a massive talent gap and career opportunity.\n\n---\n\n> **Key Takeaway**: IT is the infrastructure that powers modern organizations. The shift to cloud computing and Mexico's nearshoring boom are creating unprecedented career opportunities for bilingual tech professionals.\n",
                        "vocabulary": [
                            {
                                "en": "Information Technology (IT)",
                                "es": "Tecnologías de la Información (TI)",
                                "definition": "Use of computers and systems to manage information"
                            },
                            {
                                "en": "Hardware",
                                "es": "Hardware",
                                "definition": "Physical computer equipment and devices"
                            },
                            {
                                "en": "Software",
                                "es": "Software",
                                "definition": "Programs and applications running on hardware"
                            },
                            {
                                "en": "Cloud Computing",
                                "es": "Computación en la Nube",
                                "definition": "Using remote servers via internet instead of local machines"
                            },
                            {
                                "en": "On-Premises",
                                "es": "En Sitio / Local",
                                "definition": "IT infrastructure physically located at the organization"
                            },
                            {
                                "en": "Server",
                                "es": "Servidor",
                                "definition": "A computer that provides services to other computers"
                            },
                            {
                                "en": "VPN",
                                "es": "Red Privada Virtual",
                                "definition": "Encrypted tunnel for secure internet access"
                            },
                            {
                                "en": "Data Center",
                                "es": "Centro de Datos",
                                "definition": "A facility housing many servers and networking equipment"
                            },
                            {
                                "en": "Operating System",
                                "es": "Sistema Operativo",
                                "definition": "Core software managing hardware (Windows, Linux, macOS)"
                            },
                            {
                                "en": "Scalability",
                                "es": "Escalabilidad",
                                "definition": "Ability to grow or shrink resources as needed"
                            },
                            {
                                "en": "Capital Expense (CapEx)",
                                "es": "Gasto de Capital",
                                "definition": "Large upfront investment in physical assets"
                            },
                            {
                                "en": "Pay-as-you-go",
                                "es": "Pago por Uso",
                                "definition": "Paying only for resources consumed"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What are the five pillars of IT?",
                                "options": [
                                    "Hardware, Software, Networking, Data, Security",
                                    "Speed, Cost, Design, Marketing, Sales",
                                    "CPU, RAM, Disk, Screen, Keyboard",
                                    "Java, Python, C++, SQL, HTML"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What is the main difference between on-premises and cloud IT?",
                                "options": [
                                    "Cloud is slower",
                                    "On-premises uses the internet; cloud does not",
                                    "Cloud rents computing power remotely; on-premises owns physical servers locally",
                                    "There is no difference"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which is the largest cloud provider by market share?",
                                "options": [
                                    "Google Cloud",
                                    "Microsoft Azure",
                                    "AWS (Amazon Web Services)",
                                    "IBM Cloud"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why is Mexico's IT sector growing rapidly?",
                                "options": [
                                    "IT is declining globally",
                                    "Nearshoring demand creates a massive talent gap (700K workers vs 1.2M needed)",
                                    "Mexico invented cloud computing",
                                    "IT jobs don't require English"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m2",
                "title": "Cloud Computing: AWS, Azure, and GCP",
                "titleES": "Computación en la Nube: AWS, Azure y GCP",
                "icon": "fa-solid fa-cloud",
                "readings": [
                    {
                        "id": "it-m2-r1",
                        "title": "Cloud Service Models: IaaS, PaaS, SaaS",
                        "duration": "10 min",
                        "content": "\n> **Cloud Certification Standard Note**: Cloud service architecture and security governance in this module align directly with **AWS Certified Cloud Practitioner (CLF-C02)**, **Microsoft Certified: Azure Fundamentals (AZ-900)**, and **ISO/IEC 27017** (Cloud Security Standards).\n\n# Cloud Service Models: IaaS, PaaS, SaaS & Nearshoring Governance\n\nCloud computing is the utility-based delivery of computing services — including servers, storage, databases, networking, software, and analytics — over the Internet (\"the cloud\"). Nearshoring enterprises in Mexico rely on cloud infrastructure to connect U.S. corporate headquarters with local software engineering hubs.\n\n## The Cloud Architecture Spectrum\n\n### 1. IaaS — Infrastructure as a Service (AWS EC2 / Azure Compute)\nRent raw compute, block storage (AWS EBS), and Virtual Private Clouds (VPC). Engineers retain complete control over the guest Operating System (Linux/Windows), firewall rules, and runtime middleware.\n\n### 2. PaaS — Platform as a Service (AWS App Runner / Azure App Service)\nCloud vendors manage the underlying OS, runtime patching, and hardware scaling. Developers deploy application code directly via Git pipelines, maximizing velocity.\n\n### 3. SaaS — Software as a Service (Salesforce / Microsoft 365)\nFully managed end-user software applications accessed over HTTPS, eliminating client-side installation or server infrastructure maintenance.\n\n## The AWS/Azure Shared Responsibility Model & ISO 27017\n\nCloud security operates under a strict dual-custody governance framework:\n\n| Responsibility Domain | Managed by Cloud Provider (AWS/Azure) | Managed by Customer (Enterprise) |\n|-----------------------|---------------------------------------|----------------------------------|\n| **Physical Data Center** | Security guards, biometrics, power generators | None |\n| **Hardware & Hypervisors** | Server blade maintenance, SAN storage | None |\n| **Network Infrastructure** | DDoS mitigation, physical fiber backbones | None |\n| **Customer Data & IAM** | None | **Role-Based Access (RBAC), KMS Encryption** |\n| **Operating System & Apps** | None (in IaaS mode) | **OS Patching, Firewall Ports, SSL/TLS** |\n\n*Core Axiom*: The cloud vendor is responsible for security **OF** the cloud; the enterprise is responsible for security **IN** the cloud.\n\n## Cloud Architecture in Guadalajara & Querétaro IT Hubs\n\n- **Guadalajara IT Ecosystem (\"Silicon Valley of Mexico\")**: Major engineering centers for Oracle, Intel, IBM, and Amdocs leverage hybrid cloud architectures to maintain low-latency cross-border microservices for Fortune 500 clients.\n- **Querétaro Hyperscale Data Center Cluster**: Hyperscale cloud zones established by AWS, Microsoft Azure, and Google Cloud in Querétaro provide sub-10ms latency connectivity between Mexico City and Texas data centers.\n\n---\n\n> **Key Takeaway**: Cloud architecture is categorized into **IaaS, PaaS, and SaaS**. Aligned with **AWS CLF-C02** and **ISO 27017**, cloud security follows a shared responsibility model, driving enterprise IT growth across Guadalajara and Querétaro.\n",
                        "vocabulary": [
                            {
                                "en": "IaaS (Infrastructure as a Service)",
                                "es": "Infraestructura como Servicio",
                                "definition": "Renting virtual servers, storage, and networking"
                            },
                            {
                                "en": "PaaS (Platform as a Service)",
                                "es": "Plataforma como Servicio",
                                "definition": "Ready-to-use platform for deploying applications"
                            },
                            {
                                "en": "SaaS (Software as a Service)",
                                "es": "Software como Servicio",
                                "definition": "Complete application accessible via browser"
                            },
                            {
                                "en": "Virtual Machine (VM)",
                                "es": "Máquina Virtual",
                                "definition": "Software emulation of a physical computer"
                            },
                            {
                                "en": "Shared Responsibility Model",
                                "es": "Modelo de Responsabilidad Compartida",
                                "definition": "Security duties split between provider and customer"
                            },
                            {
                                "en": "IAM (Identity and Access Management)",
                                "es": "Gestión de Identidad y Acceso",
                                "definition": "Controlling who can access which resources"
                            },
                            {
                                "en": "Hypervisor",
                                "es": "Hipervisor",
                                "definition": "Software creating and managing virtual machines"
                            },
                            {
                                "en": "Well-Architected Framework",
                                "es": "Marco de Buena Arquitectura",
                                "definition": "Best practices for cloud architecture design"
                            },
                            {
                                "en": "Data Encryption",
                                "es": "Cifrado de Datos",
                                "definition": "Converting data to unreadable format for security"
                            },
                            {
                                "en": "Elasticity",
                                "es": "Elasticidad",
                                "definition": "Ability to automatically scale resources up or down"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does SaaS stand for?",
                                "options": [
                                    "Server as a System",
                                    "Software as a Service",
                                    "Storage as a Solution",
                                    "Security as a Standard"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "In the Shared Responsibility Model, who is responsible for data encryption?",
                                "options": [
                                    "Only the cloud provider",
                                    "Only the government",
                                    "The customer",
                                    "Nobody"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which service model gives you the MOST control?",
                                "options": [
                                    "SaaS",
                                    "PaaS",
                                    "IaaS (you manage OS, apps, data)",
                                    "All give equal control"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is the pizza analogy for PaaS?",
                                "options": [
                                    "Make pizza at home from scratch",
                                    "Take-and-bake — the platform is ready, you add your toppings (code)",
                                    "Eat at a restaurant",
                                    "Order delivery"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m3",
                "title": "Software Development Fundamentals",
                "titleES": "Fundamentos de Desarrollo de Software",
                "icon": "fa-solid fa-code",
                "readings": [
                    {
                        "id": "it-m3-r1",
                        "title": "The Software Development Life Cycle (SDLC)",
                        "duration": "10 min",
                        "content": "\n# The Software Development Life Cycle (SDLC)\n\nBuilding software is not just about writing code. Professional software development follows a structured process called the **Software Development Life Cycle (SDLC)**.\n\n## The Six Phases\n\n### 1. Planning & Requirements\nDefine **what** the software should do. Gather requirements from stakeholders (users, managers, clients). Document features, constraints, and success criteria.\n\n### 2. Design\nCreate the **architecture** — how the system will be structured. Design the database schema, API endpoints, user interface mockups, and system diagrams.\n\n### 3. Development (Coding)\nWrite the actual code using programming languages like **Python, JavaScript, Java, C#**, or **Go**. This is usually the longest phase.\n\n### 4. Testing\nVerify that the software works correctly:\n- **Unit tests**: Test individual functions\n- **Integration tests**: Test how components work together\n- **End-to-end tests**: Test the full user experience\n- **Security tests**: Check for vulnerabilities\n\n### 5. Deployment\nRelease the software to users. This can be:\n- **On-premises** installation\n- **Cloud deployment** (AWS, Azure, GCP)\n- **App store** submission (mobile)\n\n### 6. Maintenance\nFix bugs, add new features, apply security patches. This phase lasts the entire lifetime of the software — often years or decades.\n\n## Methodologies: Agile vs. Waterfall\n\n### Waterfall (Linear)\nEach phase must be **completed before** the next one starts. Like a waterfall flowing down — you can't go back upstream easily.\n\n**Best for**: Regulated industries (medical devices, aerospace) where requirements are fixed and documentation is critical.\n\n### Agile (Iterative)\nWork in short **sprints** (1-4 weeks). Each sprint delivers a small, working increment. Requirements can change between sprints.\n\n**Best for**: Web/mobile apps, startups, rapidly changing products.\n\n| Feature | Waterfall | Agile |\n|---------|-----------|-------|\n| Flexibility | Low | High |\n| Documentation | Heavy | Lightweight |\n| Delivery | One final release | Continuous small releases |\n| Customer feedback | At the end | Every sprint |\n\n### Scrum (Most Popular Agile Framework)\n- **Sprint**: 2-4 week work cycle\n- **Daily Standup**: 15-minute meeting — what did you do yesterday? What will you do today? Any blockers?\n- **Sprint Review**: Demo the work to stakeholders\n- **Retrospective**: What went well? What to improve?\n\n## Programming Paradigms\n\n- **Object-Oriented (OOP)**: Code organized around \"objects\" with data and methods. Java, Python, C#.\n- **Functional**: Code organized around pure functions. Haskell, Elixir, JavaScript (functional style).\n- **Procedural**: Step-by-step instructions. C, Bash scripts.\n\n---\n\n> **Key Takeaway**: Professional software development follows the SDLC (plan → design → code → test → deploy → maintain). Agile/Scrum dominates modern teams; Waterfall suits regulated industries.\n",
                        "vocabulary": [
                            {
                                "en": "SDLC",
                                "es": "Ciclo de Vida del Desarrollo de Software",
                                "definition": "Structured process for building software"
                            },
                            {
                                "en": "Requirements",
                                "es": "Requisitos / Requerimientos",
                                "definition": "What the software must do (functional and non-functional)"
                            },
                            {
                                "en": "Architecture",
                                "es": "Arquitectura",
                                "definition": "High-level structure and design of a system"
                            },
                            {
                                "en": "API (Application Programming Interface)",
                                "es": "Interfaz de Programación de Aplicaciones",
                                "definition": "Set of rules for software to communicate"
                            },
                            {
                                "en": "Agile",
                                "es": "Ágil",
                                "definition": "Iterative methodology with short sprints"
                            },
                            {
                                "en": "Waterfall",
                                "es": "Cascada",
                                "definition": "Linear, sequential development methodology"
                            },
                            {
                                "en": "Sprint",
                                "es": "Sprint",
                                "definition": "A fixed work cycle (1-4 weeks) in Agile"
                            },
                            {
                                "en": "Scrum",
                                "es": "Scrum",
                                "definition": "Most popular Agile framework with sprints and standups"
                            },
                            {
                                "en": "Unit Test",
                                "es": "Prueba Unitaria",
                                "definition": "Test for a single function or component"
                            },
                            {
                                "en": "Deployment",
                                "es": "Despliegue",
                                "definition": "Releasing software to production"
                            },
                            {
                                "en": "Stakeholder",
                                "es": "Parte Interesada",
                                "definition": "Anyone with interest in the project (users, managers)"
                            },
                            {
                                "en": "Retrospective",
                                "es": "Retrospectiva",
                                "definition": "Meeting to reflect on what went well and what to improve"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What are the six phases of the SDLC?",
                                "options": [
                                    "Planning, Design, Development, Testing, Deployment, Maintenance",
                                    "Start, Code, Ship, Sell, Scale, Exit",
                                    "Think, Write, Run, Break, Fix, Repeat",
                                    "Hire, Build, Launch, Grow, Pivot, Exit"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "When is Waterfall methodology most appropriate?",
                                "options": [
                                    "For startups",
                                    "For social media apps",
                                    "For regulated industries where requirements are fixed (medical, aerospace)",
                                    "For all projects"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is a Sprint in Scrum?",
                                "options": [
                                    "A programming language",
                                    "A fixed work cycle of 1-4 weeks delivering working software",
                                    "A type of server",
                                    "Running code faster"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the purpose of a Daily Standup?",
                                "options": [
                                    "Physical exercise",
                                    "A 15-minute meeting to share progress, plans, and blockers",
                                    "A code review session",
                                    "A customer demo"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m4",
                "title": "Databases and Data Management",
                "titleES": "Bases de Datos y Gestión de Datos",
                "icon": "fa-solid fa-database",
                "readings": [
                    {
                        "id": "it-m4-r1",
                        "title": "SQL vs NoSQL: Choosing the Right Database",
                        "duration": "10 min",
                        "content": "\n> **Data Architecture Standard Note**: Enterprise database management systems follow **ISO/IEC 9075** (SQL Standard), **CAP Theorem** (Consistency, Availability, Partition Tolerance), and **GDPR / LFPDPPP** data privacy regulations.\n\n# SQL vs NoSQL: Enterprise Data Architecture & The CAP Theorem\n\nSelecting the appropriate database paradigm is a foundational architectural decision. Software engineers and cloud architects must balance transactional consistency against distributed horizontal scalability across multi-region cloud clusters.\n\n## 1. Relational Database Management Systems (RDBMS / SQL)\n\nRelational databases store structured records in predefined tables linked by primary and foreign key constraints:\n- **ACID Transaction Guarantees**:\n  - **Atomicity**: All operations in a transaction execute successfully or roll back completely.\n  - **Consistency**: Data transitions strictly from one valid schema state to another.\n  - **Isolation**: Concurrent transactions execute without cross-contamination.\n  - **Durability**: Committed transactions persist permanently in non-volatile storage.\n- **Enterprise Engines**: PostgreSQL, MySQL, Oracle Database, Microsoft SQL Server. Ideal for core banking, ERP systems, and inventory ledger management.\n\n## 2. Distributed Non-Relational Databases (NoSQL) & The CAP Theorem\n\nNoSQL systems prioritize flexible JSON/document schemas and horizontal partitioning across thousands of server nodes:\n\n### The CAP Theorem (Brewer's Theorem)\nA distributed database system can simultaneously guarantee at most two of the following three properties:\n1. **Consistency (C)**: Every read receives the most recent write or an error.\n2. **Availability (A)**: Every non-failing node returns a non-error response without guarantee of latest data.\n3. **Partition Tolerance (P)**: The system continues operating despite network message loss or node disconnects.\n\n- **CP Systems (Consistency + Partition Tolerance)**: Focus on atomic data accuracy (e.g., PostgreSQL, MongoDB).\n- **AP Systems (Availability + Partition Tolerance)**: Focus on continuous read/write uptime (e.g., Apache Cassandra, DynamoDB).\n\n- **Document Databases (MongoDB / Firestore)**: Store BSON documents with dynamic fields; ideal for content management and user profiles.\n- **In-Memory Key-Value Stores (Redis / Memcached)**: Deliver sub-millisecond read/write latency for active session tokens and leaderboards.\n- **Wide-Column Stores (Apache Cassandra / ScyllaDB)**: Built for high-throughput time-series metrics and IoT telematics streaming.\n\n## 3. Modern Polyglot Persistence Architecture\n\nModern enterprise microservice architectures reject one-size-fits-all database choices. Under **Polyglot Persistence**, each microservice selects the optimal database engine (e.g., PostgreSQL for financial transactions, Redis for user auth caching, and Neo4j for fraud detection graphs).\n\n---\n\n> **Key Takeaway**: Enterprise data architecture balances **SQL (ACID)** integrity against **NoSQL (BASE/CAP)** distributed scaling, deploying **Polyglot Persistence** models under **ISO/IEC 9075** standards.\n",
                        "vocabulary": [
                            {
                                "en": "Database",
                                "es": "Base de Datos",
                                "definition": "Organized collection of structured data"
                            },
                            {
                                "en": "SQL",
                                "es": "SQL (Lenguaje de Consulta Estructurado)",
                                "definition": "Language for managing relational databases"
                            },
                            {
                                "en": "Schema",
                                "es": "Esquema",
                                "definition": "The defined structure of a database (tables, columns, types)"
                            },
                            {
                                "en": "NoSQL",
                                "es": "NoSQL",
                                "definition": "Non-relational database types (document, key-value, graph)"
                            },
                            {
                                "en": "ACID",
                                "es": "ACID",
                                "definition": "Properties ensuring reliable database transactions"
                            },
                            {
                                "en": "Document Database",
                                "es": "Base de Datos Documental",
                                "definition": "NoSQL database storing JSON-like documents"
                            },
                            {
                                "en": "Key-Value Store",
                                "es": "Almacén Clave-Valor",
                                "definition": "Simplest NoSQL model — lookup by key"
                            },
                            {
                                "en": "Graph Database",
                                "es": "Base de Datos de Grafos",
                                "definition": "Database optimized for relationship traversal"
                            },
                            {
                                "en": "Query",
                                "es": "Consulta",
                                "definition": "A request to retrieve or modify data"
                            },
                            {
                                "en": "Horizontal Scaling",
                                "es": "Escalamiento Horizontal",
                                "definition": "Adding more servers to handle load"
                            },
                            {
                                "en": "Polyglot Persistence",
                                "es": "Persistencia Políglota",
                                "definition": "Using multiple database types in one application"
                            },
                            {
                                "en": "Caching",
                                "es": "Caché / Almacenamiento en Caché",
                                "definition": "Storing frequently accessed data in fast memory"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does ACID stand for?",
                                "options": [
                                    "Application, Code, Interface, Design",
                                    "Atomicity, Consistency, Isolation, Durability",
                                    "Access, Cloud, Internet, Data",
                                    "Automated, Cached, Indexed, Distributed"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which database type is best for flexible, schema-less data like user profiles?",
                                "options": [
                                    "Relational SQL",
                                    "Document NoSQL (e.g., MongoDB)",
                                    "Spreadsheet",
                                    "File system"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is polyglot persistence?",
                                "options": [
                                    "Using only one database",
                                    "Using multiple database types in the same application for different needs",
                                    "A programming language",
                                    "A cloud service"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "When should you choose SQL over NoSQL?",
                                "options": [
                                    "When data has no structure",
                                    "When you need strict transactions and data integrity (ACID)",
                                    "When scaling horizontally is the priority",
                                    "When speed matters more than accuracy"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m5",
                "title": "DevOps and CI/CD Pipelines",
                "titleES": "DevOps y Pipelines CI/CD",
                "icon": "fa-solid fa-infinity",
                "readings": [
                    {
                        "id": "it-m5-r1",
                        "title": "What Is DevOps? Breaking Down the Wall",
                        "duration": "10 min",
                        "content": "\n# What Is DevOps? Breaking Down the Wall\n\nTraditionally, software teams were split into two groups: **Developers** (who write code) and **Operations** (who deploy and maintain systems). These groups often had conflicting goals — developers wanted to ship features fast, while operations wanted stability. This created a \"wall\" between them.\n\n**DevOps** is a culture, set of practices, and toolchain that breaks down this wall. The name combines \"Development\" + \"Operations.\"\n\n## Core DevOps Principles\n\n### 1. Continuous Integration (CI)\nEvery developer pushes code to a shared repository **multiple times per day**. Each push triggers automated builds and tests. If anything breaks, the team knows within minutes.\n\n### 2. Continuous Delivery (CD)\nCode that passes all tests is **automatically prepared** for deployment. A human approves the final release.\n\n### 3. Continuous Deployment\nGoes one step further — code that passes tests is **automatically deployed** to production. No human approval needed. Used by Netflix, Amazon, Google.\n\n### 4. Infrastructure as Code (IaC)\nDefine servers, networks, and configurations in **code files** (YAML, JSON, HCL) instead of manually clicking through dashboards. Tools: **Terraform**, AWS CloudFormation.\n\n## The CI/CD Pipeline\n\nA pipeline is an automated sequence of stages that code passes through:\n\n```\nCode → Build → Test → Security Scan → Deploy to Staging → Deploy to Production\n```\n\n### Key Tools (2026):\n\n| Category | Tool | Purpose |\n|----------|------|---------|\n| CI/CD Platform | **GitHub Actions** (~33% market) | Automate build, test, deploy |\n| CI/CD Platform | **Jenkins** (~28% market) | Self-hosted, highly customizable |\n| Version Control | **Git / GitHub** | Track code changes, collaborate |\n| IaC | **Terraform** | Define cloud infrastructure as code |\n| Monitoring | **Prometheus + Grafana** | Monitor application performance |\n\n## DevOps Metrics (DORA)\n\nThe **DORA metrics** measure DevOps team performance:\n- **Deployment Frequency**: How often you deploy (elite: multiple times per day)\n- **Lead Time for Changes**: Code commit to production (elite: < 1 hour)\n- **Change Failure Rate**: % of deployments causing issues (elite: < 5%)\n- **Time to Restore Service**: How fast you fix failures (elite: < 1 hour)\n\n---\n\n> **Key Takeaway**: DevOps unifies development and operations through CI/CD automation. GitHub Actions and Jenkins are the leading CI/CD tools. DORA metrics measure team performance.\n",
                        "vocabulary": [
                            {
                                "en": "DevOps",
                                "es": "DevOps",
                                "definition": "Culture and practices unifying Development and Operations"
                            },
                            {
                                "en": "CI (Continuous Integration)",
                                "es": "Integración Continua",
                                "definition": "Automatically building and testing code on every push"
                            },
                            {
                                "en": "CD (Continuous Delivery/Deployment)",
                                "es": "Entrega/Despliegue Continuo",
                                "definition": "Automatically preparing or deploying code to production"
                            },
                            {
                                "en": "Pipeline",
                                "es": "Pipeline / Tubería",
                                "definition": "Automated sequence of build, test, deploy stages"
                            },
                            {
                                "en": "Infrastructure as Code (IaC)",
                                "es": "Infraestructura como Código",
                                "definition": "Defining servers and networks in code files"
                            },
                            {
                                "en": "Version Control",
                                "es": "Control de Versiones",
                                "definition": "Tracking changes to code over time (Git)"
                            },
                            {
                                "en": "Repository",
                                "es": "Repositorio",
                                "definition": "A storage location for code and its history"
                            },
                            {
                                "en": "Build",
                                "es": "Compilación / Build",
                                "definition": "Converting source code into runnable software"
                            },
                            {
                                "en": "Staging Environment",
                                "es": "Entorno de Pruebas",
                                "definition": "Pre-production environment for final testing"
                            },
                            {
                                "en": "DORA Metrics",
                                "es": "Métricas DORA",
                                "definition": "Industry-standard DevOps performance measurements"
                            },
                            {
                                "en": "Terraform",
                                "es": "Terraform",
                                "definition": "Popular Infrastructure as Code tool by HashiCorp"
                            },
                            {
                                "en": "Deployment Frequency",
                                "es": "Frecuencia de Despliegue",
                                "definition": "How often new code reaches production"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What problem does DevOps solve?",
                                "options": [
                                    "Making code run faster",
                                    "Breaking the wall between Development and Operations teams",
                                    "Replacing all servers with cloud",
                                    "Eliminating the need for testing"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the difference between Continuous Delivery and Continuous Deployment?",
                                "options": [
                                    "They are the same",
                                    "Delivery requires human approval before production; Deployment is fully automatic",
                                    "Deployment is slower",
                                    "Delivery is only for mobile apps"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is Infrastructure as Code (IaC)?",
                                "options": [
                                    "Writing code on physical servers",
                                    "Defining infrastructure (servers, networks) in code files instead of manual configuration",
                                    "A programming language",
                                    "A type of database"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which DORA metric measures how often you deploy?",
                                "options": [
                                    "Lead Time",
                                    "Change Failure Rate",
                                    "Deployment Frequency",
                                    "Time to Restore"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m6",
                "title": "Containerization: Docker and Kubernetes",
                "titleES": "Contenedores: Docker y Kubernetes",
                "icon": "fa-solid fa-box-archive",
                "readings": [
                    {
                        "id": "it-m6-r1",
                        "title": "Docker: Packaging Applications in Containers",
                        "duration": "10 min",
                        "content": "\n# Docker: Packaging Applications in Containers\n\nOne of the most common problems in software is: \"It works on my machine, but not in production.\" Docker solves this problem.\n\n## What Is a Container?\n\nA **container** is a lightweight, standalone package that includes everything an application needs to run: code, runtime, libraries, and system settings. Unlike a virtual machine, containers share the host operating system's kernel, making them much smaller and faster.\n\n> **Analogy**: If a virtual machine is like an entire apartment (with its own plumbing, electricity, walls), a container is like a shipping container — standardized, portable, and stackable.\n\n## Docker Architecture\n\n| Component | Purpose |\n|-----------|---------|\n| **Dockerfile** | Recipe — instructions to build an image |\n| **Image** | Blueprint — a read-only template with everything to run the app |\n| **Container** | Running instance of an image |\n| **Docker Hub** | Public registry of pre-built images |\n\n## Kubernetes: Orchestrating Containers at Scale\n\nWhen you have hundreds or thousands of containers, you need a system to manage them. **Kubernetes** (K8s) is that system.\n\n### What Kubernetes Does:\n- **Scheduling**: Decides which server runs which container\n- **Scaling**: Automatically adds containers when traffic increases\n- **Self-healing**: Restarts crashed containers automatically\n- **Load balancing**: Distributes traffic across containers\n- **Rolling updates**: Deploy new versions without downtime\n\n### Key Kubernetes Concepts:\n\n| Concept | Definition |\n|---------|-----------|\n| **Pod** | Smallest deployable unit (1+ containers) |\n| **Node** | A physical or virtual machine running pods |\n| **Cluster** | A group of nodes managed by Kubernetes |\n| **Service** | Stable network endpoint for accessing pods |\n| **Deployment** | Declarative description of desired state |\n\n## GitOps: The Modern Deployment Pattern\n\n**GitOps** treats Git as the \"single source of truth\" for infrastructure. Tools like **Argo CD** continuously monitor the Git repository and automatically synchronize the Kubernetes cluster to match.\n\n---\n\n> **Key Takeaway**: Docker packages applications in portable containers. Kubernetes orchestrates containers at scale with scheduling, scaling, and self-healing. GitOps uses Git as the source of truth for deployments.\n",
                        "vocabulary": [
                            {
                                "en": "Container",
                                "es": "Contenedor",
                                "definition": "Lightweight, portable package with everything an app needs"
                            },
                            {
                                "en": "Docker",
                                "es": "Docker",
                                "definition": "Platform for building and running containers"
                            },
                            {
                                "en": "Image",
                                "es": "Imagen",
                                "definition": "Read-only template used to create containers"
                            },
                            {
                                "en": "Dockerfile",
                                "es": "Dockerfile",
                                "definition": "Recipe file with instructions to build an image"
                            },
                            {
                                "en": "Kubernetes (K8s)",
                                "es": "Kubernetes (K8s)",
                                "definition": "Container orchestration platform"
                            },
                            {
                                "en": "Pod",
                                "es": "Pod",
                                "definition": "Smallest deployable unit in Kubernetes"
                            },
                            {
                                "en": "Cluster",
                                "es": "Clúster",
                                "definition": "Group of machines managed together"
                            },
                            {
                                "en": "Orchestration",
                                "es": "Orquestación",
                                "definition": "Automated management of multiple containers"
                            },
                            {
                                "en": "Load Balancing",
                                "es": "Balanceo de Carga",
                                "definition": "Distributing traffic across multiple servers"
                            },
                            {
                                "en": "Rolling Update",
                                "es": "Actualización Gradual",
                                "definition": "Deploying new versions without downtime"
                            },
                            {
                                "en": "GitOps",
                                "es": "GitOps",
                                "definition": "Using Git as single source of truth for infrastructure"
                            },
                            {
                                "en": "Self-healing",
                                "es": "Auto-reparación",
                                "definition": "Automatically restarting failed containers"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What problem does Docker solve?",
                                "options": [
                                    "Making code run faster",
                                    "The 'works on my machine' problem — ensuring identical environments everywhere",
                                    "Replacing the internet",
                                    "Creating new programming languages"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the difference between a Docker image and a container?",
                                "options": [
                                    "They are the same",
                                    "An image is a blueprint; a container is a running instance of that image",
                                    "A container is larger",
                                    "An image runs on the internet"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does Kubernetes do when a container crashes?",
                                "options": [
                                    "Nothing",
                                    "Sends an email",
                                    "Automatically restarts it (self-healing)",
                                    "Deletes all data"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is a Pod in Kubernetes?",
                                "options": [
                                    "A database",
                                    "The smallest deployable unit containing one or more containers",
                                    "A type of server",
                                    "A programming language"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m7",
                "title": "Cybersecurity Architecture in Cloud",
                "titleES": "Arquitectura de Ciberseguridad en la Nube",
                "icon": "fa-solid fa-shield",
                "readings": [
                    {
                        "id": "it-m7-r1",
                        "title": "Securing the Cloud: Zero Trust and Defense in Depth",
                        "duration": "10 min",
                        "content": "\n# Securing the Cloud: Zero Trust and Defense in Depth\n\nMoving to the cloud does not automatically make your data secure. In fact, the #1 cause of cloud breaches is **misconfiguration** — humans accidentally leaving doors open.\n\n## The Zero Trust Model\n\nTraditional security used a \"castle and moat\" approach: trust everything inside the network, block everything outside. **Zero Trust** flips this:\n\n> **\"Never trust, always verify.\"**\n\nEvery request — whether from inside or outside the network — must be authenticated, authorized, and encrypted.\n\n### Zero Trust Principles:\n1. **Verify explicitly**: Authenticate using multiple signals (identity, location, device health)\n2. **Least privilege access**: Give users only the minimum permissions they need\n3. **Assume breach**: Design systems assuming attackers are already inside\n\n## Defense in Depth (Layered Security)\n\nSecurity is implemented in **multiple layers** so that if one layer fails, others still protect:\n\n| Layer | Controls |\n|-------|----------|\n| **Physical** | Data center security, biometrics, guards |\n| **Network** | Firewalls, VPNs, network segmentation |\n| **Identity** | IAM, MFA (Multi-Factor Authentication), SSO |\n| **Application** | Input validation, secure coding, OWASP Top 10 |\n| **Data** | Encryption at rest and in transit, DLP, backup |\n| **Monitoring** | SIEM, intrusion detection, log analysis |\n\n## Common Cloud Security Threats\n\n1. **Misconfiguration**: S3 buckets left public, open ports, default passwords\n2. **Credential theft**: Phishing, password reuse, leaked API keys\n3. **Ransomware**: Malware encrypting data and demanding payment\n4. **Supply chain attacks**: Compromised third-party libraries\n5. **Insider threats**: Employees with malicious intent or negligence\n\n## MFA (Multi-Factor Authentication)\n\nRequires **two or more** verification factors:\n- **Something you know**: Password\n- **Something you have**: Phone, hardware key (YubiKey)\n- **Something you are**: Fingerprint, face scan\n\n---\n\n> **Key Takeaway**: Cloud security follows Zero Trust (\"never trust, always verify\") and Defense in Depth (multiple layers). Misconfiguration is the #1 cause of cloud breaches. MFA is essential.\n",
                        "vocabulary": [
                            {
                                "en": "Zero Trust",
                                "es": "Confianza Cero",
                                "definition": "Security model: never trust, always verify"
                            },
                            {
                                "en": "Defense in Depth",
                                "es": "Defensa en Profundidad",
                                "definition": "Multiple layers of security controls"
                            },
                            {
                                "en": "MFA (Multi-Factor Authentication)",
                                "es": "Autenticación Multifactor",
                                "definition": "Requiring multiple verification methods"
                            },
                            {
                                "en": "Firewall",
                                "es": "Cortafuegos / Firewall",
                                "definition": "Network security device filtering traffic"
                            },
                            {
                                "en": "Encryption",
                                "es": "Cifrado / Encriptación",
                                "definition": "Converting data to unreadable format"
                            },
                            {
                                "en": "Least Privilege",
                                "es": "Privilegio Mínimo",
                                "definition": "Giving users only necessary permissions"
                            },
                            {
                                "en": "Misconfiguration",
                                "es": "Mala Configuración",
                                "definition": "Incorrectly set security settings"
                            },
                            {
                                "en": "Ransomware",
                                "es": "Ransomware / Secuestro de Datos",
                                "definition": "Malware that encrypts data and demands payment"
                            },
                            {
                                "en": "Phishing",
                                "es": "Phishing / Suplantación",
                                "definition": "Fake emails tricking users into revealing credentials"
                            },
                            {
                                "en": "SIEM",
                                "es": "SIEM",
                                "definition": "Security Information and Event Management system"
                            },
                            {
                                "en": "OWASP Top 10",
                                "es": "OWASP Top 10",
                                "definition": "The 10 most critical web application security risks"
                            },
                            {
                                "en": "SSO (Single Sign-On)",
                                "es": "Inicio de Sesión Único",
                                "definition": "One login grants access to multiple systems"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the core principle of Zero Trust?",
                                "options": [
                                    "Trust everyone inside the network",
                                    "Never trust, always verify every request",
                                    "Only use firewalls",
                                    "Block all internet access"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the #1 cause of cloud security breaches?",
                                "options": [
                                    "Hackers breaking encryption",
                                    "Misconfiguration (humans leaving settings open)",
                                    "Hardware failure",
                                    "Solar flares"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What are the three factors in MFA?",
                                "options": [
                                    "Speed, cost, and reliability",
                                    "Something you know, have, and are",
                                    "Email, phone, and fax",
                                    "CPU, RAM, and disk"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does 'Least Privilege' mean?",
                                "options": [
                                    "Everyone gets full access",
                                    "Users receive only the minimum permissions needed for their role",
                                    "Nobody has any access",
                                    "Only managers have access"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m8",
                "title": "Artificial Intelligence & ML Engineering",
                "titleES": "Inteligencia Artificial e Ingeniería de ML",
                "icon": "fa-solid fa-brain",
                "readings": [
                    {
                        "id": "it-m8-r1",
                        "title": "Understanding AI, Machine Learning, and LLMs",
                        "duration": "10 min",
                        "content": "\n# Understanding AI, Machine Learning, and LLMs\n\nArtificial Intelligence is transforming every industry. Understanding the hierarchy — AI → ML → Deep Learning → LLMs — is essential for any IT professional.\n\n## The AI Hierarchy\n\n### 1. Artificial Intelligence (AI)\nThe broadest term — any system that can perform tasks normally requiring human intelligence: understanding language, recognizing images, making decisions.\n\n### 2. Machine Learning (ML)\nA subset of AI where systems **learn from data** instead of being explicitly programmed. The system finds patterns in data and uses them to make predictions.\n\n**Three types**:\n- **Supervised Learning**: Train with labeled data (input → correct output). Example: spam detection.\n- **Unsupervised Learning**: Find hidden patterns in unlabeled data. Example: customer segmentation.\n- **Reinforcement Learning**: Learn by trial and error with rewards. Example: game-playing AI.\n\n### 3. Deep Learning\nA subset of ML using **neural networks** with many layers. Inspired by the human brain but works very differently. Excels at images, audio, text, and video.\n\n### 4. Foundation Models / LLMs\n**Large Language Models** are neural networks trained on massive text datasets. They predict the next word in a sequence, but this simple mechanism enables remarkable capabilities:\n- **GPT-4**, **Gemini**, **Claude** — text generation, reasoning, coding\n- **DALL-E**, **Midjourney** — image generation\n- **Whisper** — speech recognition\n\n## The Transformer Architecture\n\nMost modern AI is built on the **Transformer** (introduced in 2017). Key innovation: **Self-Attention** — the model can look at all words in a sentence simultaneously to understand context, rather than reading word-by-word.\n\n## Key AI Engineering Skills (2026)\n\n| Skill | Description |\n|-------|-------------|\n| **Prompt Engineering** | Crafting effective instructions for LLMs |\n| **RAG** | Retrieval-Augmented Generation — connecting LLMs to private data |\n| **Fine-tuning** | Adapting a pre-trained model to a specific domain |\n| **Agentic AI** | Systems that plan, call tools, and execute autonomously |\n| **Evaluation** | Measuring model output quality systematically |\n\n## AI in Mexico's Tech Sector\n\nMexico's AI ecosystem is growing rapidly:\n- **Nearshoring AI operations** — US companies building AI teams in Guadalajara and Mexico City\n- **AI in manufacturing** — predictive maintenance, quality inspection, demand forecasting\n- **Spanish-language NLP** — massive opportunity for bilingual ML engineers\n\n---\n\n> **Key Takeaway**: AI → ML → Deep Learning → LLMs. Transformers power modern AI. Key skills include prompt engineering, RAG, and agentic AI. Mexico's bilingual workforce is uniquely positioned for AI careers.\n",
                        "vocabulary": [
                            {
                                "en": "Artificial Intelligence (AI)",
                                "es": "Inteligencia Artificial (IA)",
                                "definition": "Systems performing tasks requiring human-like intelligence"
                            },
                            {
                                "en": "Machine Learning (ML)",
                                "es": "Aprendizaje Automático",
                                "definition": "Systems that learn patterns from data"
                            },
                            {
                                "en": "Deep Learning",
                                "es": "Aprendizaje Profundo",
                                "definition": "ML using multi-layer neural networks"
                            },
                            {
                                "en": "LLM (Large Language Model)",
                                "es": "Modelo de Lenguaje Grande",
                                "definition": "AI trained on massive text to generate human-like responses"
                            },
                            {
                                "en": "Neural Network",
                                "es": "Red Neuronal",
                                "definition": "Computing system inspired by biological brain structure"
                            },
                            {
                                "en": "Transformer",
                                "es": "Transformer",
                                "definition": "Neural network architecture using self-attention"
                            },
                            {
                                "en": "Self-Attention",
                                "es": "Auto-Atención",
                                "definition": "Mechanism allowing model to weigh relationships between all words"
                            },
                            {
                                "en": "RAG",
                                "es": "Generación Aumentada por Recuperación",
                                "definition": "Connecting LLMs to external data sources"
                            },
                            {
                                "en": "Prompt Engineering",
                                "es": "Ingeniería de Prompts",
                                "definition": "Crafting effective instructions for AI models"
                            },
                            {
                                "en": "Fine-tuning",
                                "es": "Ajuste Fino",
                                "definition": "Adapting a pre-trained model for a specific task"
                            },
                            {
                                "en": "Supervised Learning",
                                "es": "Aprendizaje Supervisado",
                                "definition": "Training with labeled input-output pairs"
                            },
                            {
                                "en": "Agentic AI",
                                "es": "IA Agéntica",
                                "definition": "AI systems that plan, act, and use tools autonomously"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the correct hierarchy from broadest to most specific?",
                                "options": [
                                    "LLM → ML → AI → Deep Learning",
                                    "AI → Machine Learning → Deep Learning → LLMs",
                                    "Deep Learning → AI → ML → LLM",
                                    "They are all the same"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does an LLM fundamentally do?",
                                "options": [
                                    "Understands human emotions",
                                    "Predicts the next word/token in a sequence",
                                    "Stores all human knowledge",
                                    "Thinks like a human brain"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is RAG (Retrieval-Augmented Generation)?",
                                "options": [
                                    "A programming language",
                                    "Connecting LLMs to external private data sources for better answers",
                                    "A type of database",
                                    "Random Access Generation"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is Mexico well-positioned for AI careers?",
                                "options": [
                                    "Mexico invented AI",
                                    "Bilingual workforce + nearshoring demand + growing Spanish NLP market",
                                    "AI doesn't require English",
                                    "Mexican universities are the oldest"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m9",
                "title": "Data Pipelines and Big Data",
                "titleES": "Pipelines de Datos y Big Data",
                "icon": "fa-solid fa-diagram-project",
                "readings": [
                    {
                        "id": "it-m9-r1",
                        "title": "Moving Data at Scale: ETL, Streaming, and Data Lakes",
                        "duration": "10 min",
                        "content": "\n# Moving Data at Scale: ETL, Streaming, and Data Lakes\n\nModern organizations generate enormous volumes of data — from IoT sensors, user clicks, transactions, social media, and machine logs. **Data pipelines** are the systems that collect, transform, and deliver this data to where it's needed.\n\n## What Is a Data Pipeline?\n\nA data pipeline is an automated workflow that moves data from **sources** (where data is created) through **transformations** (cleaning, enriching, formatting) to **destinations** (where data is consumed — dashboards, AI models, databases).\n\n## ETL vs ELT\n\n### ETL — Extract, Transform, Load\n1. **Extract** data from sources (databases, APIs, files)\n2. **Transform** data (clean, filter, aggregate) in a processing engine\n3. **Load** transformed data into a data warehouse\n\nTraditional approach. Best when data needs heavy cleaning before storage.\n\n### ELT — Extract, Load, Transform\n1. **Extract** data from sources\n2. **Load** raw data directly into a data lake or cloud warehouse\n3. **Transform** inside the warehouse using SQL\n\nModern approach. Best with powerful cloud warehouses (BigQuery, Snowflake, Redshift).\n\n## Batch vs. Streaming\n\n| Processing Type | How It Works | Latency | Use Case |\n|----------------|--------------|---------|----------|\n| **Batch** | Process large volumes on schedule (hourly, daily) | Minutes to hours | Monthly reports, training ML models |\n| **Streaming** | Process events in real-time as they arrive | Milliseconds to seconds | Fraud detection, live dashboards, IoT |\n\n**Tools**: Apache Kafka (streaming), Apache Spark (batch + streaming), Apache Airflow (orchestration).\n\n## Data Storage Architectures\n\n### Data Warehouse\n- **Structured** data only\n- Optimized for **SQL queries** and reporting\n- Examples: Snowflake, Google BigQuery, Amazon Redshift\n\n### Data Lake\n- **Raw** data in any format (structured, semi-structured, unstructured)\n- Storage is cheap; processing happens on demand\n- Examples: AWS S3 + Athena, Azure Data Lake, Google Cloud Storage\n\n### Data Lakehouse\n- **Combines** warehouse structure with lake flexibility\n- Query raw and structured data in one platform\n- Examples: Databricks Delta Lake, Apache Iceberg\n\n## The Five V's of Big Data\n\n1. **Volume** — how much data (terabytes, petabytes)\n2. **Velocity** — how fast data arrives (real-time streaming)\n3. **Variety** — different formats (JSON, CSV, images, logs)\n4. **Veracity** — accuracy and trustworthiness of data\n5. **Value** — business insights extracted from data\n\n---\n\n> **Key Takeaway**: Data pipelines move data from sources to destinations. ETL transforms first; ELT loads first. Streaming handles real-time data; batch handles bulk processing. Modern architectures use data lakehouses.\n",
                        "vocabulary": [
                            {
                                "en": "Data Pipeline",
                                "es": "Pipeline de Datos",
                                "definition": "Automated workflow moving data from source to destination"
                            },
                            {
                                "en": "ETL (Extract, Transform, Load)",
                                "es": "ETL (Extraer, Transformar, Cargar)",
                                "definition": "Traditional data processing pattern"
                            },
                            {
                                "en": "ELT (Extract, Load, Transform)",
                                "es": "ELT (Extraer, Cargar, Transformar)",
                                "definition": "Modern pattern — load raw, transform in warehouse"
                            },
                            {
                                "en": "Data Warehouse",
                                "es": "Almacén de Datos",
                                "definition": "Storage optimized for structured data and queries"
                            },
                            {
                                "en": "Data Lake",
                                "es": "Lago de Datos",
                                "definition": "Storage for raw data in any format"
                            },
                            {
                                "en": "Data Lakehouse",
                                "es": "Lakehouse de Datos",
                                "definition": "Hybrid combining warehouse and lake features"
                            },
                            {
                                "en": "Batch Processing",
                                "es": "Procesamiento por Lotes",
                                "definition": "Processing large data volumes on a schedule"
                            },
                            {
                                "en": "Stream Processing",
                                "es": "Procesamiento en Tiempo Real",
                                "definition": "Processing data events as they arrive"
                            },
                            {
                                "en": "Apache Kafka",
                                "es": "Apache Kafka",
                                "definition": "Platform for real-time data streaming"
                            },
                            {
                                "en": "Big Data",
                                "es": "Big Data / Macrodatos",
                                "definition": "Extremely large datasets requiring special tools"
                            },
                            {
                                "en": "Schema-on-Read",
                                "es": "Esquema en Lectura",
                                "definition": "Structure applied when reading data (data lake approach)"
                            },
                            {
                                "en": "Orchestration",
                                "es": "Orquestación",
                                "definition": "Coordinating and scheduling pipeline workflows"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the main difference between ETL and ELT?",
                                "options": [
                                    "They are the same",
                                    "ETL transforms before loading; ELT loads raw data first, then transforms",
                                    "ELT is older",
                                    "ETL only works with NoSQL"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "When should you use streaming instead of batch processing?",
                                "options": [
                                    "For monthly reports",
                                    "When you need real-time processing (fraud detection, live dashboards)",
                                    "When data is small",
                                    "Never — batch is always better"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is a Data Lakehouse?",
                                "options": [
                                    "A physical building",
                                    "A hybrid architecture combining data warehouse structure with data lake flexibility",
                                    "A type of database",
                                    "A programming language"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What are the Five V's of Big Data?",
                                "options": [
                                    "Volume, Velocity, Variety, Veracity, Value",
                                    "Very, Vast, Variable, Volatile, Vague",
                                    "Version, Vendor, Virtual, Visible, Valid",
                                    "None of the above"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            },
            {
                "id": "it-m10",
                "title": "Digital Transformation and Industry 4.0",
                "titleES": "Transformación Digital e Industria 4.0",
                "icon": "fa-solid fa-robot",
                "readings": [
                    {
                        "id": "it-m10-r1",
                        "title": "Industry 4.0: The Smart Factory Revolution",
                        "duration": "10 min",
                        "content": "\n# Industry 4.0: The Smart Factory Revolution\n\n**Industry 4.0** refers to the fourth industrial revolution — the transformation of manufacturing through digital technologies.\n\n## The Four Industrial Revolutions\n\n| Revolution | Era | Key Technology |\n|-----------|-----|---------------|\n| Industry 1.0 | 1760s | Steam power, mechanization |\n| Industry 2.0 | 1870s | Electricity, assembly lines |\n| Industry 3.0 | 1970s | Computers, automation, PLCs |\n| **Industry 4.0** | **2010s+** | **IoT, AI, cloud, digital twins** |\n\n## Nine Pillars of Industry 4.0\n\n### 1. Industrial IoT (IIoT)\nSensors on every machine collect real-time data — temperature, vibration, speed, pressure. A modern factory may have **10,000+ connected sensors**.\n\n### 2. Cloud & Edge Computing\nCloud stores and processes data centrally. **Edge computing** processes data locally (at the sensor) for ultra-low latency decisions.\n\n### 3. Big Data & Analytics\nAnalyzing manufacturing data to predict failures, optimize quality, and reduce waste.\n\n### 4. Artificial Intelligence\nAI inspects product quality (computer vision), optimizes supply chains, and predicts maintenance needs.\n\n### 5. Digital Twins\nA **digital twin** is a virtual replica of a physical machine or production line. Engineers can simulate changes, test scenarios, and predict failures — without touching the real system.\n\n### 6. Autonomous Robots\nCollaborative robots (**cobots**) work alongside humans. AGVs (Automated Guided Vehicles) transport materials without human drivers.\n\n### 7. Additive Manufacturing (3D Printing)\nPrinting complex parts layer by layer — used for rapid prototyping and low-volume production.\n\n### 8. Cybersecurity\nConnected factories are vulnerable. Industrial cybersecurity (OT security) protects manufacturing systems from attacks.\n\n### 9. System Integration\nConnecting ERP, MES, SCADA, and PLC systems horizontally (across departments) and vertically (from sensor to boardroom).\n\n## Mexico's Industry 4.0 Landscape (2026)\n\nMexico is rapidly adopting Industry 4.0:\n- **FDI in manufacturing** captures ~37% of all foreign direct investment\n- **\"Smartshoring\"** — nearshoring + digital infrastructure\n- Key hubs: **Monterrey** (automotive IoT), **Querétaro** (aerospace digital), **Guadalajara** (electronics + AI)\n- The \"triple helix\" model — collaboration between **industry, government, and academia** — drives workforce development\n\n## Career Paths in Industry 4.0\n\n- **IoT Engineer**: Deploys and maintains sensor networks. MXN $25,000-45,000/month.\n- **Data Analyst**: Translates manufacturing data into insights. MXN $20,000-40,000/month.\n- **Automation Engineer**: Programs PLCs, cobots, and SCADA. MXN $30,000-55,000/month.\n- **Digital Twin Specialist**: Creates virtual replicas of production systems. MXN $40,000-70,000/month.\n\n---\n\n> **Key Takeaway**: Industry 4.0 transforms factories with IoT, AI, digital twins, and cloud computing. Mexico's \"smartshoring\" strategy combines nearshoring with digital infrastructure, creating high-value manufacturing careers.\n",
                        "vocabulary": [
                            {
                                "en": "Industry 4.0",
                                "es": "Industria 4.0",
                                "definition": "Fourth industrial revolution — digital transformation of manufacturing"
                            },
                            {
                                "en": "IIoT (Industrial Internet of Things)",
                                "es": "Internet Industrial de las Cosas",
                                "definition": "Network of sensors and devices in factories"
                            },
                            {
                                "en": "Digital Twin",
                                "es": "Gemelo Digital",
                                "definition": "Virtual replica of a physical system"
                            },
                            {
                                "en": "Edge Computing",
                                "es": "Computación en el Borde",
                                "definition": "Processing data locally near sensors (low latency)"
                            },
                            {
                                "en": "Cobot (Collaborative Robot)",
                                "es": "Robot Colaborativo",
                                "definition": "Robot designed to work safely alongside humans"
                            },
                            {
                                "en": "PLC (Programmable Logic Controller)",
                                "es": "Controlador Lógico Programable",
                                "definition": "Industrial computer controlling machines"
                            },
                            {
                                "en": "SCADA",
                                "es": "SCADA",
                                "definition": "Supervisory Control and Data Acquisition system"
                            },
                            {
                                "en": "MES (Manufacturing Execution System)",
                                "es": "Sistema de Ejecución de Manufactura",
                                "definition": "Software tracking production in real-time"
                            },
                            {
                                "en": "Predictive Maintenance",
                                "es": "Mantenimiento Predictivo",
                                "definition": "Using data to predict equipment failure before it happens"
                            },
                            {
                                "en": "Additive Manufacturing",
                                "es": "Manufactura Aditiva",
                                "definition": "3D printing — building parts layer by layer"
                            },
                            {
                                "en": "OT Security",
                                "es": "Seguridad OT",
                                "definition": "Cybersecurity for operational technology (factory systems)"
                            },
                            {
                                "en": "Smartshoring",
                                "es": "Smartshoring",
                                "definition": "Nearshoring combined with advanced digital infrastructure"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is Industry 4.0?",
                                "options": [
                                    "The fourth industrial revolution — digital transformation of manufacturing",
                                    "A new programming language",
                                    "A type of factory building",
                                    "The fourth version of the internet"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What is a Digital Twin?",
                                "options": [
                                    "A backup server",
                                    "A virtual replica of a physical system used for simulation",
                                    "A type of robot",
                                    "Two identical machines"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does IIoT stand for?",
                                "options": [
                                    "Internal Internet of Technology",
                                    "Industrial Internet of Things",
                                    "Integrated IT Operations",
                                    "International IoT"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is 'Smartshoring' in Mexico's context?",
                                "options": [
                                    "Moving factories to smarter countries",
                                    "Nearshoring combined with advanced digital infrastructure and Industry 4.0",
                                    "Only hiring smart people",
                                    "Using smartphones in factories"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            }
        ],
        "category": "technology"
    },
    "ai-ml": {
        "id": "ai-ml",
        "title": "Inteligencia Artificial y Aprendizaje Automático",
        "titleEN": "AI & Machine Learning",
        "category": "technology",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "IEEE 7000 / ISO 42001 AI Management",
        "conocer": "EC1421 (Desarrollo de Soluciones de Inteligencia Artificial)",
        "ngss": "Computer Science & Machine Intelligence Engineering",
        "industry": "Global Deep Learning & Edge AI Standard",
        "icon": "fa-solid fa-brain",
        "description": "Inglés técnico para modelos neuronales profundos, inferencia en el borde (Edge NPU), visión artificial y arquitecturas Transformers.",
        "modules": [
            {
                "id": "aiml-m1",
                "title": "Foundational Neural Networks & Edge AI Accelerators",
                "titleES": "Redes Neuronales Fundamentales y Aceleradores Edge AI",
                "icon": "fa-solid fa-microchip",
                "readings": [
                    {
                        "id": "aiml-m1-r1",
                        "title": "Deep Learning Architectures & Edge AI Accelerators",
                        "duration": "10 min",
                        "content": "\n> **Industry Certification Note**: This module aligns with the **NVIDIA Certified Associate: Generative AI and LLMs** and **AWS Certified Machine Learning - Specialty (MLS-C01)** frameworks, establishing technical competency in deep learning architectures and hardware deployment.\n\n# Deep Learning Architectures & Edge AI Accelerators: From Backpropagation to On-Device NPU Inference\n\nIn modern industrial engineering, Artificial Intelligence is no longer restricted to remote cloud data centers. From high-speed SMT assembly lines in Guadalajara to vision-guided quality stations in Ciudad Juárez, machine learning models execute directly on **Edge Hardware Accelerators**—including Neural Processing Units (NPUs), Tensor Processing Units (TPUs), and embedded GPUs.\n\n## 1. The Core Mechanics of Artificial Neural Networks\n\nAn **Artificial Neural Network (ANN)** is a computational architecture inspired by biological neural networks. It consists of layers of interconnected nodes called **neurons**:\n\n- **Input Layer**: Receives raw numerical features (e.g., sensor telemetry, image pixel tensors).\n- **Hidden Layers**: Perform mathematical transformations via weighted linear combinations followed by non-linear **activation functions** (such as ReLU, GELU, or Sigmoid).\n- **Output Layer**: Produces target predictions, such as categorical classifications (e.g., defective vs. non-defective PCB) or regression values (e.g., estimated time-to-failure in hours).\n\nDuring the training phase, the model calculates the error between its prediction and the ground-truth label using a **Loss Function** (e.g., Cross-Entropy Loss or Mean Squared Error). The **Backpropagation algorithm** then computes partial derivatives via the mathematical chain rule, updating synaptic weights through **Stochastic Gradient Descent (SGD)** or Adam optimizers:\n\n$$w_{new} = w_{old} - \\eta \\cdot \\nabla L(w)$$\n\nWhere $\\eta$ represents the learning rate and $\\nabla L(w)$ is the gradient of the loss function with respect to weights.\n\n## 2. Cloud Training vs. Edge Inference\n\nA critical distinction in industrial AI engineering is the operational divergence between **training** and **inference**:\n\n1. **Model Training**: Extremely compute-intensive process requiring high-precision floating-point arithmetic (FP32 or BF16) executed on clusters of data center GPUs across days or weeks.\n2. **Edge Inference**: The execution of a pre-trained model on local embedded devices in real time under strict electrical power, memory, and thermal constraints.\n\nIn nearshoring manufacturing plants, edge inference is mandatory because cloud round-trips introduce **network latency** (typically 60–150 milliseconds) and pose severe cybersecurity and data-sovereignty risks. An industrial automated optical inspection (AOI) robot inspecting 20 semiconductor wafers per second cannot tolerate network drops; it must classify images within **<15 milliseconds** entirely on-device.\n\n## 3. Quantization and Model Optimization for Edge NPUs\n\nTo deploy a multi-million parameter neural network on an edge device, engineers apply rigorous model compression techniques:\n\n- **Quantization (PTQ & QAT)**: Converting high-precision 32-bit floating point weights (FP32) into 8-bit integers (INT8). Quantization slashes memory footprints by **75%** and unlocks ultra-high throughput on specialized integer matrix engines (NPUs) with negligible accuracy degradation (<0.5%).\n- **Weight Pruning**: Removing redundant synaptic weights whose mathematical contribution is near zero, inducing sparsity and reducing computational FLOPs.\n- **Knowledge Distillation**: Training a compact, lightweight \"Student\" model to mimic the probability distribution of an unwieldy \"Teacher\" model.\n\n---\n\n> **Key Takeaway**: Industrial AI bridges mathematical deep learning (**backpropagation, loss functions, activation curves**) with low-latency hardware execution (**Edge NPUs, INT8 quantization, sub-20ms inference**). Mastery of these technical English concepts enables engineers to design and audit autonomous inspection systems for multinational OEM operations.\n",
                        "vocabulary": [
                            {
                                "en": "Backpropagation",
                                "es": "Retropropagación",
                                "definition": "Algorithm computing gradients of loss with respect to weights via the chain rule"
                            },
                            {
                                "en": "Activation Function",
                                "es": "Función de Activación",
                                "definition": "Non-linear mathematical function (e.g., ReLU, GELU) determining neuron firing"
                            },
                            {
                                "en": "Quantization (INT8)",
                                "es": "Cuantización (INT8)",
                                "definition": "Process of reducing model weights from 32-bit float to 8-bit integers for edge efficiency"
                            },
                            {
                                "en": "Neural Processing Unit (NPU)",
                                "es": "Unidad de Procesamiento Neural (NPU)",
                                "definition": "Specialized silicon accelerator optimized for tensor and matrix operations"
                            },
                            {
                                "en": "Inference Latency",
                                "es": "Latencia de Inferencia",
                                "definition": "Time elapsed from input presentation to output prediction by a neural model"
                            },
                            {
                                "en": "Loss Function",
                                "es": "Función de Pérdida",
                                "definition": "Metric measuring discrepancy between predicted outputs and ground-truth labels"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why is Edge Inference preferred over Cloud Inference in manufacturing AOI stations?",
                                "options": [
                                    "Cloud inference is free",
                                    "Edge inference eliminates network latency (<15ms) and guarantees local reliability",
                                    "Edge hardware requires no electricity",
                                    "Cloud models cannot process numbers"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the primary operational benefit of INT8 Quantization?",
                                "options": [
                                    "It increases image resolution",
                                    "It reduces memory footprint by ~75% and accelerates NPU matrix calculations",
                                    "It deletes the loss function",
                                    "It converts code from Python to C++"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which mathematical algorithm calculates gradients for weight updates in neural networks?",
                                "options": [
                                    "QuickSort",
                                    "Backpropagation",
                                    "Monte Carlo Tree Search",
                                    "K-Means Clustering"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does the activation function introduce into a deep neural network?",
                                "options": [
                                    "Non-linearity",
                                    "Network latency",
                                    "Hardware failure",
                                    "Database indexing"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aiml-m2",
                "title": "Transformers & Large Language Model Architecture",
                "titleES": "Arquitectura Transformer y Modelos de Lenguaje Masivo (LLM)",
                "icon": "fa-solid fa-layer-group",
                "readings": []
            },
            {
                "id": "aiml-m3",
                "title": "Computer Vision & Automated Optical Inspection (AOI)",
                "titleES": "Visión Artificial e Inspección Óptica Automatizada",
                "icon": "fa-solid fa-eye",
                "readings": []
            },
            {
                "id": "aiml-m4",
                "title": "MLOps: CI/CD Pipelines & Model Deployment",
                "titleES": "MLOps: Pipelines CI/CD y Despliegue de Modelos",
                "icon": "fa-solid fa-server",
                "readings": []
            },
            {
                "id": "aiml-m5",
                "title": "AI Governance, Safety & Bias Mitigation",
                "titleES": "Gobernanza de IA, Seguridad y Mitigación de Sesgos",
                "icon": "fa-solid fa-shield-halved",
                "readings": []
            }
        ]
    },
    "telecom-iot": {
        "id": "telecom-iot",
        "title": "Telecomunicaciones e Internet de las Cosas (IoT)",
        "titleEN": "Telecommunications & IoT",
        "category": "technology",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "IEEE 802.11 / 3GPP 5G NR / LoRaWAN Standard",
        "conocer": "EC1290 (Instalación de Sistemas de Telecomunicaciones)",
        "ngss": "Telecommunications & Embedded IoT Systems",
        "industry": "Global 5G & Industrial IoT (IIoT) Standard",
        "icon": "fa-solid fa-tower-cell",
        "description": "Protocolos de comunicación inalámbrica (5G NR, LoRaWAN, MQTT), sensores embebidos y redes industriales de telemetría.",
        "modules": [
            {
                "id": "iot-m1",
                "title": "Industrial IoT Protocols: MQTT, CoAP and OPC UA",
                "titleES": "Protocolos IoT Industrial: MQTT, CoAP y OPC UA",
                "icon": "fa-solid fa-wifi",
                "readings": []
            },
            {
                "id": "iot-m2",
                "title": "5G New Radio (NR) & Private Industrial Cellular Networks",
                "titleES": "5G New Radio y Redes Celulares Privadas Industriales",
                "icon": "fa-solid fa-signal",
                "readings": []
            },
            {
                "id": "iot-m3",
                "title": "LPWAN Technologies: LoRaWAN and NB-IoT Deployment",
                "titleES": "Tecnologías LPWAN: Despliegue de LoRaWAN y NB-IoT",
                "icon": "fa-solid fa-satellite-dish",
                "readings": []
            },
            {
                "id": "iot-m4",
                "title": "Embedded Microcontrollers & Sensor Interfacing (I2C, SPI)",
                "titleES": "Microcontroladores Embebidos e Interfaces de Sensores (I2C, SPI)",
                "icon": "fa-solid fa-microchip",
                "readings": []
            },
            {
                "id": "iot-m5",
                "title": "Edge Gateway Security & Remote Telemetry Management",
                "titleES": "Seguridad en Gateways de Borde y Gestión de Telemetría",
                "icon": "fa-solid fa-lock",
                "readings": []
            }
        ]
    },
    "software-dev": {
        "id": "software-dev",
        "title": "Desarrollo de Software y Programación",
        "titleEN": "Software Development & Programming",
        "category": "technology",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "ISO/IEC 25010 Software Engineering / Clean Code",
        "conocer": "EC1086 (Programación de Aplicaciones Web)",
        "ngss": "Software Engineering & Algorithmic Design",
        "industry": "Full-Stack Enterprise Software Architecture Standard",
        "icon": "fa-solid fa-code",
        "description": "Ingeniería de software moderna: paradigmas funcionales y OOP, APIs REST/gRPC, microservicios, testing automatizado y patrones de diseño.",
        "modules": [
            {
                "id": "soft-m1",
                "title": "Modern Software Paradigms: OOP vs Functional Architecture",
                "titleES": "Paradigmas Modernos: OOP vs Arquitectura Funcional",
                "icon": "fa-solid fa-cubes",
                "readings": []
            },
            {
                "id": "soft-m2",
                "title": "High-Performance API Design: REST, GraphQL and gRPC",
                "titleES": "Diseño de APIs de Alto Rendimiento: REST, GraphQL y gRPC",
                "icon": "fa-solid fa-network-wired",
                "readings": []
            },
            {
                "id": "soft-m3",
                "title": "Containerization & Orchestration: Docker and Kubernetes",
                "titleES": "Contenedores y Orquestación: Docker y Kubernetes",
                "icon": "fa-solid fa-box",
                "readings": []
            },
            {
                "id": "soft-m4",
                "title": "Test-Driven Development (TDD) & Automated CI/CD",
                "titleES": "Desarrollo Guiado por Pruebas (TDD) y CI/CD Automatizado",
                "icon": "fa-solid fa-vial-circle-check",
                "readings": []
            },
            {
                "id": "soft-m5",
                "title": "Design Patterns & Scalable Microservices Architecture",
                "titleES": "Patrones de Diseño y Arquitectura de Microservicios",
                "icon": "fa-solid fa-diagram-project",
                "readings": []
            }
        ]
    },
    "data-analytics": {
        "id": "data-analytics",
        "title": "Ciencia de Datos y Analítica Avanzada",
        "titleEN": "Data Science & Analytics",
        "category": "technology",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "ISO/IEC 20547 Big Data / AWS Certified Data Engineer",
        "conocer": "EC1350 (Analítica de Datos Industriales)",
        "ngss": "Data Science & Applied Computational Statistics",
        "industry": "Enterprise Big Data & Lakehouse Analytics Standard",
        "icon": "fa-solid fa-chart-pie",
        "description": "Inglés técnico para ingeniería de datos a gran escala, almacenamiento columnar (Parquet/Iceberg), inferencia estadística y búsqueda vectorial.",
        "modules": [
            {
                "id": "data-m1",
                "title": "High-Throughput Data Pipelines & Modern Lakehouse Architecture",
                "titleES": "Pipelines de Datos de Alto Rendimiento y Arquitectura Lakehouse",
                "icon": "fa-solid fa-database",
                "readings": [
                    {
                        "id": "data-m1-r1",
                        "title": "Modern Data Engineering: Ingestion, Streaming, and Lakehouse Storage at Scale",
                        "duration": "10 min",
                        "content": "\n> **Industry Certification Note**: This module aligns with the **Databricks Certified Data Engineer Associate** and **AWS Certified Data Engineer - Associate (DEA-C01)** frameworks, validating high-throughput ETL/ELT pipeline design and modern Lakehouse storage architecture.\n\n# Modern Data Engineering: Ingestion, Streaming, and Lakehouse Storage at Scale\n\nIn multi-national nearshoring manufacturing operations, industrial telemetry is generated at staggering rates. Thousands of automated test benches, robotic arms, and CNC controllers stream vibration metrics, thermal logs, and cycle times continuously. Transforming this raw deluge into actionable executive insights requires a resilient **Modern Data Architecture**.\n\n## 1. Batch Processing vs. Event-Driven Streaming\n\nTraditionally, data was collected throughout a shift and processed in large **batch jobs** overnight using tools like Apache Hadoop MapReduce. While efficient for payroll and monthly billing, batch processing introduces hours of data latency.\n\nModern industrial operations rely instead on **Event-Driven Streaming Ingestion**:\n- **Message Brokers (Apache Kafka, AWS Kinesis)**: Act as durable, distributed, fault-tolerant ingestion buffers capable of handling millions of concurrent events per second with sub-second latency.\n- **Stream Processing Engines (Apache Flink, Spark Structured Streaming)**: Apply continuous stateful transformations, windowed aggregations (e.g., computing a rolling 5-minute temperature average), and anomaly detection algorithms in flight.\n\n## 2. Columnar Storage: Parquet and ORC vs. Row-Based Formats\n\nData lakes no longer store analytical datasets in legacy row-oriented formats like CSV or JSON. Row-oriented storage requires reading entire records from disk just to query a single column:\n\n- **Row-Oriented (CSV / PostgreSQL)**: Ideal for Online Transaction Processing (**OLTP**) where single records are inserted or updated by ID.\n- **Columnar Storage (Apache Parquet / ORC)**: The bedrock of Online Analytical Processing (**OLAP**). Values from the same column are stored contiguously on disk.\n\nBecause values within a column share the same data type (e.g., floating-point sensor voltages), columnar engines achieve massive **Snappy/ZSTD compression ratios (up to 80%)** and utilize **Dictionary Encoding**. Furthermore, query engines utilize **Projection Pushdown** (reading only requested columns) and **Predicate Pushdown** (skipping disk blocks using min/max metadata statistics), accelerating query execution by orders of magnitude.\n\n## 3. The Lakehouse Paradigm: ACID Guarantees on Object Storage\n\nHistorically, enterprises maintained two separate systems: a scalable but unmanaged **Data Lake** (AWS S3, Azure Blob, MinIO) for raw files, and a high-performance **Data Warehouse** (Snowflake, BigQuery) for structured queries. \n\nThe **Data Lakehouse** architecture merges both worlds by introducing a transactional storage layer (such as **Delta Lake** or **Apache Iceberg**) directly on top of cheap cloud object storage:\n- **ACID Transactions**: Guarantees Atomicity, Consistency, Isolation, and Durability, eliminating corrupted reads during concurrent write operations.\n- **Time Travel & Data Versioning**: Enables engineers to query historical snapshots of the dataset to audit algorithmic models or reproduce quality defect investigations.\n- **Schema Enforcement**: Prevents corrupt or malformed payloads from polluting clean analytical tables.\n\n---\n\n> **Key Takeaway**: Modern data analytics depends on **event streaming buffers (Kafka)**, **compressed columnar formats (Parquet)**, and **transactional lakehouse layers (Iceberg/Delta Lake)**. Mastering this technical English vocabulary empowers engineers to build scalable data telemetry backbones across cross-border industrial enterprises.\n",
                        "vocabulary": [
                            {
                                "en": "Columnar Storage",
                                "es": "Almacenamiento Columnar",
                                "definition": "Data organization storing columns together on disk, optimizing analytical aggregation"
                            },
                            {
                                "en": "Lakehouse",
                                "es": "Lakehouse de Datos",
                                "definition": "Architecture combining the low cost of data lakes with the ACID transactions of warehouses"
                            },
                            {
                                "en": "Predicate Pushdown",
                                "es": "Empuje de Predicados (Predicate Pushdown)",
                                "definition": "Query optimization filtering data at disk storage level before loading into memory"
                            },
                            {
                                "en": "ACID Transactions",
                                "es": "Transacciones ACID",
                                "definition": "Set of properties (Atomicity, Consistency, Isolation, Durability) ensuring database reliability"
                            },
                            {
                                "en": "Event-Driven Streaming",
                                "es": "Transmisión Basada en Eventos",
                                "definition": "Real-time continuous data processing as individual events occur"
                            },
                            {
                                "en": "Data Pipeline",
                                "es": "Pipeline de Datos (ETL/ELT)",
                                "definition": "Series of automated stages extracting, transforming, and loading data"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why is Apache Parquet preferred over CSV for analytical queries on billions of records?",
                                "options": [
                                    "Parquet files are human-readable in Notepad",
                                    "Parquet utilizes columnar storage and compression to read only requested columns",
                                    "CSV files cannot store numbers",
                                    "Parquet is an executable binary file"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does Predicate Pushdown achieve in modern query engines?",
                                "options": [
                                    "It crashes slow queries",
                                    "It evaluates WHERE filters at the storage layer to skip irrelevant disk blocks",
                                    "It translates queries to Spanish",
                                    "It encrypts network passwords"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which feature of a Data Lakehouse allows developers to query past historical states of a table?",
                                "options": [
                                    "Time Travel / Data Versioning",
                                    "RAM Caching",
                                    "Garbage Collection",
                                    "DNS Routing"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "Which tool is standard for real-time distributed message streaming in data engineering?",
                                "options": [
                                    "Apache Kafka",
                                    "Microsoft Excel",
                                    "HTML5 Canvas",
                                    "SQLite"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            },
            {
                "id": "data-m2",
                "title": "SQL at Scale, Indexing & Query Execution Plans",
                "titleES": "SQL a Escala, Indexación y Planes de Ejecución",
                "icon": "fa-solid fa-bolt",
                "readings": []
            },
            {
                "id": "data-m3",
                "title": "Statistical Inference, Hypothesis Testing & A/B Experimentation",
                "titleES": "Inferencia Estadística y Pruebas de Hipótesis",
                "icon": "fa-solid fa-calculator",
                "readings": []
            },
            {
                "id": "data-m4",
                "title": "Predictive Analytics, Time-Series & Anomaly Detection",
                "titleES": "Analítica Predictiva, Series de Tiempo y Anomalías",
                "icon": "fa-solid fa-chart-line",
                "readings": []
            },
            {
                "id": "data-m5",
                "title": "Vector Databases, High-Dimensional Embeddings & Semantic Search",
                "titleES": "Bases de Datos Vectoriales y Búsqueda Semántica",
                "icon": "fa-solid fa-magnifying-glass-chart",
                "readings": []
            }
        ]
    },
    "semiconductors": {
        "id": "semiconductors",
        "title": "Semiconductores",
        "titleEN": "Semiconductor Manufacturing",
        "level": "A2-B1",
        "status": "full",
        "description": "Master the English vocabulary for semiconductor fabrication — from silicon wafers to FinFET transistors. Aligned with Mexico's nearshoring chip manufacturing boom.",
        "descriptionES": "Domina el vocabulario en inglés para la fabricación de semiconductores — desde obleas de silicio hasta transistores FinFET.",
        "totalModules": 10,
        "estimatedHours": 20,
        "prerequisites": [
            "esp-foundation"
        ],
        "standard": "CONOCER EC1290",
        "conocer": "EC1290 (Inspección de Procesos de Alta Tecnología)",
        "ngss": "HS-PS1-1 / HS-PS3-2 (Matter & Energy in Chips)",
        "industry": "TSMC-GCU Manufacturing Specialist Intensive (MSI)",
        "modules": [
            {
                "id": "semi-m1",
                "title": "Introduction to Semiconductors",
                "titleES": "Introducción a los Semiconductores",
                "icon": "fa-solid fa-microchip",
                "readings": [
                    {
                        "id": "semi-m1-r1",
                        "title": "What Is a Semiconductor?",
                        "duration": "10 min",
                        "content": "\n> **Global Chip Industry Note**: The technical standards and vocabulary in this module are modeled directly from **TSMC (Taiwan Semiconductor Manufacturing Co.)** Fab 18 training specifications and **SEMI (Semiconductor Equipment and Materials International)** certification standards — essential for engineering roles in North American chip nearshoring facilities.\n\n# What Is a Semiconductor?\n\nEvery electronic device you use — your phone, your computer, your car — contains **semiconductors**. These tiny components are the foundation of modern technology. In this reading, you'll learn what semiconductors are, why they matter, and why Mexico is becoming a key player in their manufacturing.\n\n## Three Types of Materials\n\nTo understand semiconductors, you first need to know the difference between three types of materials:\n\n### 1. Conductors\n**Conductors** are materials that allow electricity to flow through them easily. The electrons in these materials are free to move.\n\n**Examples**: Copper, gold, silver, aluminum.\n**Uses**: Wires, cables, circuit board traces.\n\n### 2. Insulators\n**Insulators** are materials that **block** the flow of electricity. Their electrons are tightly bound and cannot move freely.\n\n**Examples**: Rubber, glass, plastic, ceramic.\n**Uses**: Cable coatings, protective covers, circuit board substrates.\n\n### 3. Semiconductors\n**Semiconductors** are materials that fall **between** conductors and insulators. Under certain conditions, they can conduct electricity; under other conditions, they cannot. This ability to **switch** between conducting and not conducting is what makes them incredibly useful.\n\n**Examples**: Silicon (Si), Germanium (Ge), Gallium Arsenide (GaAs).\n\n## Silicon — The King of Semiconductors\n\n**Silicon** is the most widely used semiconductor material. Here's why:\n\n- It is the **second most abundant** element on Earth (found in sand and rocks)\n- It has a very useful **crystal structure** (diamond cubic)\n- Its electrical properties can be precisely **controlled** by adding other elements (a process called **doping**)\n- It works well across a wide range of temperatures\n\n**Fun fact**: Silicon Valley in California got its name because of the many companies that manufactured silicon-based microchips there in the 1970s and 1980s.\n\n## What Do Semiconductors Do?\n\nSemiconductors are used to make:\n\n- **Transistors**: Tiny switches that can turn on and off billions of times per second. Modern processors contain **billions** of transistors.\n- **Diodes**: Components that allow electricity to flow in **one direction** only. Used in LED lights, power supplies, and solar panels.\n- **Integrated Circuits (ICs / Chips)**: Thousands or millions of transistors combined on a single piece of silicon. These are the \"brains\" of all electronic devices.\n- **Sensors**: Devices that detect temperature, light, pressure, or motion.\n\n## The Semiconductor Manufacturing Process (Overview)\n\nMaking a semiconductor chip is one of the most complex manufacturing processes in the world. Here is a simplified overview:\n\n1. **Silicon Purification**: Raw silicon is purified to 99.9999999% purity (called \"nine nines\").\n2. **Crystal Growth**: The purified silicon is grown into a large **single crystal** called an **ingot**.\n3. **Wafer Slicing**: The ingot is sliced into thin round discs called **wafers** (typically 300mm in diameter).\n4. **Photolithography**: Patterns are projected onto the wafer using **ultraviolet light** to create circuits.\n5. **Etching**: Unwanted material is removed chemically or with plasma.\n6. **Doping**: Specific areas of the wafer are treated with other elements to change their electrical properties.\n7. **Deposition**: Thin layers of different materials are deposited onto the wafer.\n8. **Testing**: Each chip on the wafer is tested for defects.\n9. **Packaging**: Working chips are cut from the wafer and enclosed in protective packages.\n\nSteps 4-7 are repeated **dozens of times** to build up the many layers of a modern chip. The entire process can take **3-4 months** from start to finish.\n\n## Mexico and the Semiconductor Industry\n\nMexico is becoming a critical location for semiconductor manufacturing due to:\n\n- **Geographic proximity** to the U.S. (where most chip companies are headquartered)\n- A **large, young workforce** with engineering talent\n- **USMCA** trade agreement benefits\n- Lower costs compared to the U.S. while maintaining quality standards\n- Existing automotive and electronics manufacturing infrastructure\n\nCompanies like **Intel**, **Texas Instruments**, and **Skyworks** already have operations in Mexico. The nearshoring trend is accelerating investment in semiconductor packaging, testing, and eventually fabrication facilities in cities like **Guadalajara**, **Monterrey**, and **Chihuahua**.\n\n---\n\n> **Key Takeaway**: Semiconductors are materials between conductors and insulators. Silicon is the most important semiconductor. Mexico's nearshoring boom is creating thousands of jobs in semiconductor manufacturing.\n",
                        "vocabulary": [
                            {
                                "en": "Semiconductor",
                                "es": "Semiconductor",
                                "definition": "A material that can conduct or block electricity depending on conditions"
                            },
                            {
                                "en": "Conductor",
                                "es": "Conductor",
                                "definition": "A material that allows electricity to flow easily (e.g., copper)"
                            },
                            {
                                "en": "Insulator",
                                "es": "Aislante",
                                "definition": "A material that blocks electricity (e.g., rubber)"
                            },
                            {
                                "en": "Silicon (Si)",
                                "es": "Silicio",
                                "definition": "The most common semiconductor material"
                            },
                            {
                                "en": "Transistor",
                                "es": "Transistor",
                                "definition": "A tiny electronic switch — the building block of all chips"
                            },
                            {
                                "en": "Diode",
                                "es": "Diodo",
                                "definition": "A component that allows current in one direction only"
                            },
                            {
                                "en": "Integrated Circuit (IC)",
                                "es": "Circuito Integrado",
                                "definition": "A chip containing millions of transistors"
                            },
                            {
                                "en": "Wafer",
                                "es": "Oblea",
                                "definition": "A thin disc of silicon used to make chips"
                            },
                            {
                                "en": "Ingot",
                                "es": "Lingote",
                                "definition": "A large cylindrical crystal of purified silicon"
                            },
                            {
                                "en": "Doping",
                                "es": "Dopaje",
                                "definition": "Adding impurities to silicon to change its electrical properties"
                            },
                            {
                                "en": "Photolithography",
                                "es": "Fotolitografía",
                                "definition": "Using light to transfer circuit patterns onto a wafer"
                            },
                            {
                                "en": "Etching",
                                "es": "Grabado",
                                "definition": "Removing material from a wafer using chemicals or plasma"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why are semiconductors special?",
                                "options": [
                                    "They are always conductors",
                                    "They can switch between conducting and not conducting",
                                    "They are the cheapest material",
                                    "They glow in the dark"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is silicon?",
                                "options": [
                                    "A type of plastic",
                                    "The most widely used semiconductor material",
                                    "A conductor",
                                    "An insulator"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is a wafer?",
                                "options": [
                                    "A type of chip packaging",
                                    "A thin disc of silicon where chips are made",
                                    "A testing tool",
                                    "A type of wire"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is Mexico important for the semiconductor industry?",
                                "options": [
                                    "Mexico invented semiconductors",
                                    "It is close to the U.S. with a large engineering workforce",
                                    "Silicon is only found in Mexico",
                                    "Mexico has the most advanced chip factories"
                                ],
                                "answer": 1
                            }
                        ]
                    },
                    {
                        "id": "semi-m1-r2",
                        "title": "Doping: N-Type and P-Type Semiconductors",
                        "duration": "10 min",
                        "content": "\n# Doping: N-Type and P-Type Semiconductors\n\nPure silicon is not very useful for electronics because it doesn't conduct electricity well. To make silicon useful, engineers add tiny amounts of other elements — a process called **doping**. This is one of the most fundamental concepts in semiconductor manufacturing.\n\n## Why Doping Is Necessary\n\nA silicon atom has **4 electrons** in its outer shell. In a pure silicon crystal, each atom shares its 4 electrons with 4 neighboring atoms, forming strong **covalent bonds**. This creates a stable structure with very few free electrons, so pure silicon is a poor conductor.\n\nTo make silicon conduct electricity, we need to either:\n- **Add extra electrons** (negative charge carriers) → **N-Type**\n- **Create missing electrons (\"holes\")** (positive charge carriers) → **P-Type**\n\n## N-Type Semiconductor\n\nTo create an **N-Type** (\"Negative Type\") semiconductor, we add atoms with **5 electrons** in their outer shell, such as:\n- **Phosphorus (P)**\n- **Arsenic (As)**\n- **Antimony (Sb)**\n\nWhen a phosphorus atom replaces a silicon atom in the crystal, 4 of its electrons form bonds with neighboring silicon atoms. The **5th electron** is free to move — it becomes a **charge carrier**.\n\nSince these free electrons carry a **negative** charge, we call this **N-Type** semiconductor.\n\nThe added element (phosphorus) is called a **donor** because it \"donates\" an extra electron.\n\n## P-Type Semiconductor\n\nTo create a **P-Type** (\"Positive Type\") semiconductor, we add atoms with only **3 electrons** in their outer shell, such as:\n- **Boron (B)**\n- **Gallium (Ga)**\n- **Indium (In)**\n\nWhen a boron atom replaces a silicon atom, it can only form 3 of the 4 needed bonds. The missing bond creates a **hole** — an empty space where an electron could be. This hole acts as a **positive charge carrier** because electrons from neighboring atoms can \"jump\" into the hole, effectively making the hole move through the crystal.\n\nThe added element (boron) is called an **acceptor** because it \"accepts\" electrons to fill its holes.\n\n## The P-N Junction — Where the Magic Happens\n\nWhen you place P-Type silicon next to N-Type silicon, you create a **P-N Junction** — the most important structure in all of electronics.\n\nAt the junction:\n1. Free electrons from the N-side **diffuse** (spread) across to the P-side\n2. Holes from the P-side diffuse to the N-side\n3. This creates a **depletion zone** — a thin region with no free charge carriers\n4. The depletion zone creates an **electric field** that prevents further diffusion\n\n### Forward Bias (Conducting):\nIf you connect a battery with the **positive terminal** to the P-side and **negative terminal** to the N-side, the electric field is reduced, and current flows through the junction. The diode is **ON**.\n\n### Reverse Bias (Blocking):\nIf you reverse the battery connections, the electric field increases, and no current flows. The diode is **OFF**.\n\nThis ability to act as a one-way switch for electricity is what makes the P-N junction so useful. It is the basis of:\n\n- **Diodes** — one-way valves for electricity\n- **LEDs** (Light Emitting Diodes) — P-N junctions that produce light\n- **Solar cells** — P-N junctions that convert light into electricity\n- **Transistors** — combinations of P-N junctions that act as switches and amplifiers\n\n## Doping in the Factory\n\nIn a semiconductor fabrication plant (**fab**), doping is done using two main methods:\n\n### Ion Implantation\nA machine called an **ion implanter** shoots dopant atoms at the silicon wafer at very high speed. The atoms embed themselves into the silicon surface. This method offers **precise control** over the depth and concentration of doping.\n\n### Diffusion\nThe wafer is heated in a **furnace** (800-1200°C) in the presence of dopant gases. The dopant atoms slowly diffuse into the silicon. This method is simpler but less precise than ion implantation.\n\n## Key Numbers\n\n| Property | Value |\n|----------|-------|\n| Dopant concentration (typical) | 1 atom per 10 million silicon atoms |\n| Silicon atoms in 1 cm³ | ~5 × 10²² |\n| Dopant atoms in 1 cm³ | ~5 × 10¹⁵ |\n| Depletion zone width | ~0.1 to 1 micrometer |\n\nEven though we add only a **tiny** amount of dopant, it dramatically changes the electrical behavior of silicon.\n\n---\n\n> **Key Takeaway**: Doping adds specific impurities to silicon to create N-Type (extra electrons) or P-Type (holes). The P-N junction created where they meet is the foundation of all electronic devices.\n",
                        "vocabulary": [
                            {
                                "en": "Doping",
                                "es": "Dopaje",
                                "definition": "Adding impurity atoms to silicon to control its conductivity"
                            },
                            {
                                "en": "N-Type",
                                "es": "Tipo N",
                                "definition": "Silicon doped with atoms that provide extra electrons"
                            },
                            {
                                "en": "P-Type",
                                "es": "Tipo P",
                                "definition": "Silicon doped with atoms that create holes"
                            },
                            {
                                "en": "Electron",
                                "es": "Electrón",
                                "definition": "A negatively charged subatomic particle"
                            },
                            {
                                "en": "Hole",
                                "es": "Hueco / Laguna",
                                "definition": "An empty space where an electron could be — acts as positive charge"
                            },
                            {
                                "en": "Covalent Bond",
                                "es": "Enlace Covalente",
                                "definition": "A chemical bond formed by sharing electrons"
                            },
                            {
                                "en": "Donor",
                                "es": "Donador",
                                "definition": "An atom (like phosphorus) that donates an extra electron"
                            },
                            {
                                "en": "Acceptor",
                                "es": "Aceptor",
                                "definition": "An atom (like boron) that accepts electrons"
                            },
                            {
                                "en": "P-N Junction",
                                "es": "Unión P-N",
                                "definition": "The boundary between P-Type and N-Type silicon"
                            },
                            {
                                "en": "Depletion Zone",
                                "es": "Zona de Agotamiento",
                                "definition": "The region at a P-N junction with no free carriers"
                            },
                            {
                                "en": "Forward Bias",
                                "es": "Polarización Directa",
                                "definition": "Voltage applied to make a diode conduct"
                            },
                            {
                                "en": "Ion Implantation",
                                "es": "Implantación de Iones",
                                "definition": "Shooting dopant atoms into silicon at high speed"
                            },
                            {
                                "en": "Fab (Fabrication Plant)",
                                "es": "Fábrica / Planta de Fabricación",
                                "definition": "A factory where semiconductor chips are manufactured"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does doping do to silicon?",
                                "options": [
                                    "Makes it transparent",
                                    "Changes its electrical properties by adding impurities",
                                    "Makes it heavier",
                                    "Changes its color"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which element is commonly used for N-Type doping?",
                                "options": [
                                    "Boron",
                                    "Oxygen",
                                    "Phosphorus",
                                    "Carbon"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is a 'hole' in P-Type silicon?",
                                "options": [
                                    "A physical hole in the material",
                                    "An empty space acting as a positive charge carrier",
                                    "A manufacturing defect",
                                    "A type of electron"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What happens at a P-N junction under forward bias?",
                                "options": [
                                    "No current flows",
                                    "Current flows through the junction",
                                    "The silicon melts",
                                    "The junction breaks"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "semi-m2",
                "title": "Transistors: The Building Blocks of Chips",
                "titleES": "Transistores: Los Bloques de Construcción de Chips",
                "icon": "fa-solid fa-cubes",
                "readings": [
                    {
                        "id": "semi-m2-r1",
                        "title": "From Diodes to Transistors: The MOSFET",
                        "duration": "10 min",
                        "content": "\n# From Diodes to Transistors: The MOSFET\n\nThe **transistor** is the most important invention of the 20th century. Every digital device — from smartphones to supercomputers — works because of transistors. In this reading, you'll learn how a transistor works and why the MOSFET is the most important type.\n\n## What Is a Transistor?\n\nA **transistor** is an electronic component that can act as both a **switch** and an **amplifier**. As a switch, it can be either ON (conducting electricity) or OFF (blocking electricity). This ON/OFF behavior is the basis of all digital computing — every 1 and 0 in your computer is represented by a transistor that is either on or off.\n\n## The MOSFET\n\nThe **MOSFET** (Metal-Oxide-Semiconductor Field-Effect Transistor) is the most widely used type of transistor. Billions of MOSFETs are manufactured every day.\n\nA MOSFET has three terminals:\n- **Gate**: Controls whether the transistor is ON or OFF (like a light switch)\n- **Source**: Where current enters the transistor\n- **Drain**: Where current exits the transistor\n\n### How It Works:\n\nBetween the source and drain, there is a **channel** made of semiconductor material. When no voltage is applied to the gate, the channel does not conduct — the transistor is **OFF**.\n\nWhen you apply a voltage to the gate, an **electric field** forms through the thin oxide layer. This field attracts charge carriers into the channel, creating a conductive path between source and drain — the transistor is **ON**.\n\nThe \"Metal-Oxide-Semiconductor\" in the name refers to the structure:\n- **Metal** (or polysilicon) gate electrode\n- **Oxide** insulating layer (typically silicon dioxide, SiO₂)\n- **Semiconductor** channel (silicon)\n\n## Types of MOSFETs:\n\n| Type | Channel | Turns ON when... |\n|------|---------|-----------------|\n| **NMOS** | N-Type | Positive voltage at gate |\n| **PMOS** | P-Type | Negative voltage at gate |\n\n### CMOS — Complementary MOS\n\nModern chips use **CMOS** technology, which combines both NMOS and PMOS transistors on the same chip. CMOS is used because:\n- Very **low power consumption** (uses power only when switching)\n- **High noise immunity** (resistant to electrical interference)\n- **Scalable** — can be made very small\n\nAlmost every processor, memory chip, and digital circuit made today uses CMOS.\n\n## Moore's Law and Scaling\n\nIn 1965, Intel co-founder **Gordon Moore** predicted that the number of transistors on a chip would **double approximately every two years** while the cost per transistor would decrease. This prediction, known as **Moore's Law**, has held true for over 50 years.\n\n| Year | Process Node | Transistors (typical CPU) |\n|------|-------------|--------------------------|\n| 2000 | 180 nm | ~42 million |\n| 2010 | 32 nm | ~1.2 billion |\n| 2020 | 7 nm | ~10 billion |\n| 2025 | 3 nm | ~50+ billion |\n\nThe \"nm\" (nanometer) refers to the **process node** — roughly the size of the smallest features on the chip. For reference, a human hair is about 80,000 nm wide.\n\n## FinFET: The Modern Transistor\n\nAs transistors got smaller than ~20 nm, the traditional flat (planar) MOSFET design stopped working well. Electrons would **leak** through the thin channel even when the transistor was supposed to be OFF.\n\nThe solution was the **FinFET** (Fin Field-Effect Transistor), invented by Chenming Hu at UC Berkeley. Instead of a flat channel, the FinFET has a **vertical fin** of silicon that the gate wraps around on three sides. This gives the gate much better control over the channel, reducing leakage.\n\n**Key benefits of FinFET**:\n- **Lower leakage current** (less wasted power)\n- **Faster switching speed**\n- **Better performance at smaller sizes**\n- Used in all modern processors (Apple A-series, Intel Core, AMD Ryzen, Qualcomm Snapdragon)\n\n## What's Next: GAA (Gate-All-Around)\n\nThe next evolution beyond FinFET is the **GAA transistor** (Gate-All-Around), where the gate completely surrounds the channel on **all four sides**. Samsung and Intel are beginning to use GAA in their latest manufacturing processes (2nm and below).\n\n---\n\n> **Key Takeaway**: Transistors are switches that form the basis of all computing. The MOSFET is the most common type, and FinFET is the modern 3D version used in today's most advanced chips.\n",
                        "vocabulary": [
                            {
                                "en": "Transistor",
                                "es": "Transistor",
                                "definition": "An electronic switch/amplifier — the building block of all chips"
                            },
                            {
                                "en": "MOSFET",
                                "es": "MOSFET",
                                "definition": "Metal-Oxide-Semiconductor Field-Effect Transistor — the most common type"
                            },
                            {
                                "en": "Gate",
                                "es": "Compuerta",
                                "definition": "The terminal that controls ON/OFF state in a transistor"
                            },
                            {
                                "en": "Source",
                                "es": "Fuente",
                                "definition": "Where current enters a transistor"
                            },
                            {
                                "en": "Drain",
                                "es": "Drenaje",
                                "definition": "Where current exits a transistor"
                            },
                            {
                                "en": "Channel",
                                "es": "Canal",
                                "definition": "The conductive path between source and drain"
                            },
                            {
                                "en": "CMOS",
                                "es": "CMOS",
                                "definition": "Complementary MOS — technology using both NMOS and PMOS"
                            },
                            {
                                "en": "Moore's Law",
                                "es": "Ley de Moore",
                                "definition": "Transistor count doubles roughly every two years"
                            },
                            {
                                "en": "Process Node",
                                "es": "Nodo de Proceso",
                                "definition": "The size of smallest features on a chip (measured in nm)"
                            },
                            {
                                "en": "FinFET",
                                "es": "FinFET",
                                "definition": "3D transistor with a vertical fin for better gate control"
                            },
                            {
                                "en": "GAA",
                                "es": "GAA (Compuerta Envolvente)",
                                "definition": "Gate-All-Around — next-gen transistor with gate on all sides"
                            },
                            {
                                "en": "Leakage Current",
                                "es": "Corriente de Fuga",
                                "definition": "Unwanted current flow when a transistor should be OFF"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What are the three terminals of a MOSFET?",
                                "options": [
                                    "Input, Output, Power",
                                    "Gate, Source, Drain",
                                    "Anode, Cathode, Base",
                                    "Positive, Negative, Ground"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does CMOS combine?",
                                "options": [
                                    "Two types of cables",
                                    "NMOS and PMOS transistors",
                                    "Copper and silicon",
                                    "Digital and analog signals"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why was FinFET invented?",
                                "options": [
                                    "To make chips cheaper",
                                    "To reduce leakage current at small sizes",
                                    "To use less silicon",
                                    "To make transistors bigger"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "According to Moore's Law, transistor count doubles every:",
                                "options": [
                                    "6 months",
                                    "1 year",
                                    "~2 years",
                                    "10 years"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "semi-m3",
                "title": "Photolithography: Printing Circuits with Light",
                "titleES": "Fotolitografía: Imprimiendo Circuitos con Luz",
                "icon": "fa-solid fa-sun",
                "readings": [
                    {
                        "id": "semi-m3-r1",
                        "title": "How Photolithography Works",
                        "duration": "10 min",
                        "content": "\n> **Semiconductor Equipment Standard Note**: Photolithography track equipment and scanner systems operate under **SEMI E187** (Cybersecurity for Fab Equipment), **SEMI E40** (Material Movement Management), and **ISO 14644-1 Class 1** ultra-pure cleanroom standards.\n\n# How Photolithography Works: ArF Immersion & Optical Physics\n\n**Photolithography** is the core process step in semiconductor manufacturing, using deep ultraviolet light to project microscopic circuit patterns from a quartz reticle (**photomask**) onto a light-sensitive chemical polymer (**photoresist**) coated on a silicon wafer. This process dictates transistor density and critical dimension (CD) scaling.\n\n## The Photolithography Processing Sequence\n\n1. **Surface Priming (HMDS Vapor Prime)**: Wafers are treated with Hexamethyldisilazane (HMDS) gas in a vacuum oven at 150°C to promote adhesion between hydrophobic silicon dioxide and organic photoresist.\n2. **Precision Spin Coating**: Liquid photoresist is dispensed at the wafer center while spinning at 3,000 to 5,000 RPM, creating a uniform film thickness controlled down to **±0.5 nanometers**.\n3. **Soft Bake**: Thermal processing at 100°C–120°C drives out residual solvents and stabilizes photoresist viscoelasticity.\n4. **Reticle Alignment & DUV Exposure**: High-aperture optical scanners align the photomask with sub-nanometer precision. **ArF 193 nm Deep Ultraviolet (DUV)** laser pulses project light through the reticle pattern. In **Immersion Lithography (193nm i)**, ultra-pure water (refractive index $n = 1.44$) fills the gap between the final optical lens and the wafer, boosting the numerical aperture (NA > 1.35).\n5. **Post-Exposure Bake (PEB) & Chemical Development**: PEB catalyzes chemical amplification within the resist. Rinsing with **TMAH (Tetramethylammonium hydroxide)** developer dissolves exposed regions (positive resist), exposing underlying silicon for plasma etching.\n\n## Reticle Alignment & Overlay Metrology\n\nModern microchip production stacks up to 80 separate patterned layers. Each layer must align with sub-nanometer accuracy:\n- **Overlay Budget**: Total allowable layer-to-layer misregistration must remain below **1.5 nanometers** across the entire 300mm wafer.\n- **Pellicle Protection**: Ultra-thin transparent membranes mounted above the quartz reticle protect photomask surfaces from airborne cleanroom dust.\n- **Critical Dimension Scanning Electron Microscopy (CD-SEM)**: High-resolution electron beam tools measure printed feature linewidths to ensure process compliance before wafers advance to plasma etching.\n\n## Computational Lithography & OPC (Optical Proximity Correction)\n\nAs critical dimensions shrank below light wavelengths, physical diffraction caused pattern distortion on the wafer. Modern lithography relies on advanced computational algorithms:\n- **Optical Proximity Correction (OPC)**: Modifying reticle geometries by adding serifs and shifting polygon edges to compensate for optical diffraction.\n- **Source-Mask Optimization (SMO)**: Jointly optimizing laser illumination pupil shapes and reticle features to maximize process window latitude.\n- **Multiple Patterning (Self-Aligned Quad Patterning - SAQP)**: Using sacrificial spacer deposition and etching to split sub-resolution pitches when single-exposure DUV resolution limits are reached.\n\n---\n\n> **Key Takeaway**: Photolithography relies on **ArF 193nm immersion optics**, **OPC computational lithography**, chemical amplification, and sub-1.5nm overlay metrology. Governed by **SEMI** standards, it is the fundamental driver of microchip scaling.\n",
                        "vocabulary": [
                            {
                                "en": "Photoresist",
                                "es": "Fotorresistencia / Resina fotosensible",
                                "definition": "A light-sensitive chemical polymer coated on the wafer"
                            },
                            {
                                "en": "Photomask",
                                "es": "Fotomáscara / Retícula",
                                "definition": "A glass plate with metal patterns used to block UV light"
                            },
                            {
                                "en": "UV Exposure",
                                "es": "Exposición ultravioleta",
                                "definition": "Shining UV light through a mask onto a photoresist"
                            },
                            {
                                "en": "Development",
                                "es": "Revelado",
                                "definition": "Rinsing the wafer in chemical developer to reveal the pattern"
                            },
                            {
                                "en": "Spin Coating",
                                "es": "Recubrimiento por centrifugado",
                                "definition": "Method to apply liquid photoresist uniformly by spinning the wafer"
                            },
                            {
                                "en": "Overlay Accuracy",
                                "es": "Precisión de superposición",
                                "definition": "How precisely layers of a chip align on top of each other"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does positive photoresist do when exposed to UV light?",
                                "options": [
                                    "It becomes soluble and dissolves in developer",
                                    "It becomes harder and insoluble",
                                    "It changes color to yellow",
                                    "It converts into pure silicon"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What is the purpose of spin coating?",
                                "options": [
                                    "To clean the wafer from dust",
                                    "To spread liquid photoresist into a uniform, thin layer",
                                    "To cut the wafer into chips",
                                    "To bake the wafer at high speed"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which term refers to the alignment precision between different chip layers?",
                                "options": [
                                    "Wavelength accuracy",
                                    "Spin coating accuracy",
                                    "Overlay accuracy",
                                    "Chemical solubility"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is a photomask?",
                                "options": [
                                    "A protective cover worn by fab workers",
                                    "A tool to measure wafer thickness",
                                    "A template plate containing the circuit pattern",
                                    "A type of chemical developer"
                                ],
                                "answer": 2
                            }
                        ]
                    },
                    {
                        "id": "semi-m3-r2",
                        "title": "EUV: Extreme Ultraviolet Lithography",
                        "duration": "10 min",
                        "content": "\n> **Advanced Lithography Industry Note**: Leading-edge EUV lithography systems operate under **SEMI E187** cybersecurity protocols and **ISO 14644-1 Class 1** vacuum cleanroom standards. Mastering EUV physics is critical for engineers operating in TSMC, Intel, and Samsung GigaFabs.\n\n# EUV: Extreme Ultraviolet Lithography Engineering\n\nAs transistor feature sizes scaled below 10 nanometers, traditional Deep Ultraviolet (DUV) immersion lithography using 193 nm argon-fluoride lasers reached its physical diffraction limit. Printing sub-5nm features required a radical leap to **Extreme Ultraviolet (EUV) lithography** operating at a wavelength of **13.5 nanometers**.\n\n## The Physics & Mechanical Challenges of EUV Systems\n\nOperating at 13.5 nm presents extreme optical and physical engineering hurdles:\n\n1. **Extreme Vacuum Environment**: EUV light is absorbed by almost all atomic matter — including nitrogen, oxygen, and standard optical glass. The entire optical train operates inside ultra-high vacuum chambers (<10⁻7 mbar).\n2. **Mo/Si Bragg Reflective Optics (Zeiss Anamorphic Mirrors)**: Traditional refractive glass lenses absorb EUV. Instead, EUV machines use precision mirrors composed of 40 to 50 alternating atomic layers of Molybdenum and Silicon, polished to sub-atomic tolerances (smooth within a fraction of a picometer).\n3. **Laser-Produced Plasma (LPP) Light Source**: High-power CO₂ lasers blast 50,000 falling droplets of molten **tin (Sn)** per second. Each droplet is struck twice to vaporize it into a 500,000°C plasma that emits 13.5 nm EUV photons.\n4. **Pellicle & Photomask Thermal Resistance**: Photomasks must withstand intense EUV energy densities. Advanced carbon nanotube **pellicles** protect photomasks from airborne contamination while resisting thermal stress without warping.\n\n## ASML & High-NA EUV (0.55 NA) Monopoly Architecture\n\nEUV equipment is exclusively designed and manufactured by **ASML** in Veldhoven, Netherlands, in partnership with Carl Zeiss Optics:\n\n- **Twinscan EXE:5000 (High-NA EUV)**: Uses 0.55 Numerical Aperture anamorphic optics, enabling direct printing of 2nm process nodes without complex multi-patterning schemes.\n- **Physical Footprint & Logistics**: Weighing over 150 metric tons, a single High-NA EUV scanner costs exceeding **$350 million USD** and requires 4 Boeing 747 cargo planes for transport to GigaFabs in Arizona, Oregon, and Taiwan.\n\n---\n\n> **Key Takeaway**: EUV lithography uses 13.5 nm light generated by laser-blasted molten tin in a vacuum. Guided by **SEMI** standards, ASML's reflective optics enable the direct printing of 2nm microchips for AI and cloud datacenters.\n",
                        "vocabulary": [
                            {
                                "en": "EUV Lithography",
                                "es": "Litografía ultravioleta extrema",
                                "definition": "Next-gen lithography using 13.5nm wavelength light"
                            },
                            {
                                "en": "Wavelength",
                                "es": "Longitud de onda",
                                "definition": "The distance between successive crests of a wave of light"
                            },
                            {
                                "en": "Vacuum",
                                "es": "Vacío",
                                "definition": "A space entirely devoid of matter/air"
                            },
                            {
                                "en": "Reflective Mirror",
                                "es": "Espejo reflector",
                                "definition": "Ultra-smooth mirror used to redirect light instead of lenses"
                            },
                            {
                                "en": "Tin",
                                "es": "Estaño",
                                "definition": "Metal melted and vaporized by laser to produce EUV light"
                            },
                            {
                                "en": "High-NA EUV",
                                "es": "EUV de alta apertura numérica",
                                "definition": "Advanced EUV systems using larger angles to print smaller sizes"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the wavelength of Extreme Ultraviolet (EUV) light?",
                                "options": [
                                    "193 nm",
                                    "13.5 nm",
                                    "3 nm",
                                    "1.2 nm"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why must EUV systems operate under a vacuum?",
                                "options": [
                                    "To prevent the silicon from burning",
                                    "Because air molecules absorb EUV light",
                                    "To cool down the lasers",
                                    "To speed up the spin coating"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does the ASML EUV system use instead of traditional glass lenses?",
                                "options": [
                                    "Fiber optic cables",
                                    "Prisms made of quartz",
                                    "Highly reflective mirrors",
                                    "Water droplets"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which company is the sole manufacturer of EUV lithography systems?",
                                "options": [
                                    "TSMC",
                                    "ASML",
                                    "Intel",
                                    "NVIDIA"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "semi-m4",
                "title": "Etching, Deposition, and Clean Rooms",
                "titleES": "Grabado, Deposición y Salas Limpias",
                "icon": "fa-solid fa-flask",
                "readings": [
                    {
                        "id": "semi-m4-r1",
                        "title": "The Clean Room Environment",
                        "duration": "10 min",
                        "content": "\n# The Clean Room Environment\n\nA semiconductor fabrication plant (fab) is home to the **cleanroom** (sala limpia) — one of the cleanest environments on Earth. In a cleanroom, the air is filtered constantly to control the concentration of airborne particles, temperature, humidity, and vibration.\n\n## Why Cleanrooms Are Crucial\n\nA modern transistor is thousands of times smaller than a grain of sand. A single microscopic dust particle, hair, or skin cell landing on a wafer can block light during photolithography, short-circuit metal lines, or cause a transistor to fail. \n\nThe industry measures cleanliness using classes:\n- **Class 100**: Less than 100 particles (larger than 0.5 microns) per cubic foot of air.\n- **Class 10**: Less than 10 particles per cubic foot.\n- **Class 1 (Fab Floor)**: Less than 1 particle per cubic foot. (For comparison, normal outdoor air contains about 35 million particles per cubic foot!).\n\n## The Gown Room and Gowning Protocol\n\nHumans are the biggest source of contamination in a fab. Skin flakes, hair, dust from clothes, and sweat are constantly shedding. To enter the cleanroom, workers must follow a strict **gowning protocol** in the **gown room** (sala de vestimenta):\n\n1. **Shoe Cleaning**: Workers pass through shoe scrubbers and put on shoe covers.\n2. **Hair & Face Coverings**: Wearing a hairnet and face mask.\n3. **Bunny Suit (Traje especial)**: A full-body, anti-static suit that covers the worker from head to toe.\n4. **Booties & Gloves**: Wearing specialized non-dusting boots and double-layer nitrile gloves.\n5. **Air Shower (Ducha de aire)**: Before walking through the cleanroom doors, workers stand in an air shower cabinet that blows high-velocity filtered air to strip away any remaining dust from the outside of their bunny suits.\n\nWorkers also use specialized **cleanroom paper** and non-shedding pens. Traditional pencils are banned because graphite flakes contaminate the air.\n",
                        "vocabulary": [
                            {
                                "en": "Cleanroom",
                                "es": "Sala limpia / Cuarto limpio",
                                "definition": "A controlled room with extremely low levels of dust and pollutants"
                            },
                            {
                                "en": "Gown Room",
                                "es": "Sala de vestimenta",
                                "definition": "The locker area where workers put on protective suits"
                            },
                            {
                                "en": "Bunny Suit",
                                "es": "Traje de sala limpia / Traje protector",
                                "definition": "The full-body suit worn to prevent human contamination"
                            },
                            {
                                "en": "Air Shower",
                                "es": "Ducha de aire",
                                "definition": "Chamber that blows air to remove particles from clothing before entry"
                            },
                            {
                                "en": "Contamination",
                                "es": "Contaminación",
                                "definition": "Unwanted particles that damage wafer circuits"
                            },
                            {
                                "en": "Gowning Protocol",
                                "es": "Protocolo de vestimenta",
                                "definition": "The strict sequence of steps to dress in cleanroom gear"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why are cleanrooms necessary in semiconductor fabrication?",
                                "options": [
                                    "To prevent workers from getting sick",
                                    "Because a single dust particle can destroy microscopically small features",
                                    "To save electrical energy",
                                    "To protect wafers from daylight"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which area do workers use to put on bunny suits and prepare for cleanroom entry?",
                                "options": [
                                    "The control center",
                                    "The gown room",
                                    "The cafeteria",
                                    "The chemical bath"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the function of the air shower?",
                                "options": [
                                    "To wash bunny suits with soap and water",
                                    "To blow high-velocity filtered air to remove dust particles from suits",
                                    "To measure the humidity of the fab",
                                    "To sterilize the silicon wafers"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Compared to normal outdoor air, Class 1 cleanroom air is about:",
                                "options": [
                                    "10 times cleaner",
                                    "1,000 times cleaner",
                                    "35 million times cleaner",
                                    "Exactly the same"
                                ],
                                "answer": 2
                            }
                        ]
                    },
                    {
                        "id": "semi-m4-r2",
                        "title": "Etching and Thin Film Deposition",
                        "duration": "10 min",
                        "content": "\n# Etching and Thin Film Deposition\n\nOnce a circuit pattern has been printed onto the photoresist by photolithography, the wafer undergoes two key manufacturing phases to build the 3D structures: **Etching** (grabado) and **Deposition** (deposición).\n\n## Etching: Removing Material\n\n**Etching** is the process of removing unwanted materials from the wafer. The remaining photoresist acts as a shield, protecting the materials underneath. There are two primary types of etching:\n\n### 1. Wet Etching (Grabado por vía húmeda)\nThe wafer is immersed in a liquid chemical bath (such as hydrofluoric acid). \n- **Pros**: Simple and cheap.\n- **Cons**: It is **isotropic** (etched in all directions equally, creating curved edges). This makes it unsuitable for modern sub-10nm chips.\n\n### 2. Dry Etching (Grabado por vía seca)\nA machine uses reactive gas and **plasma** to bombard the wafer surface.\n- **Pros**: It is **anisotropic** (etches only in a vertical direction, creating straight, sharp vertical walls). Essential for tiny, dense transistors.\n- **Cons**: Complex, expensive, and can damage the crystal structure if not calibrated.\n\n## Thin Film Deposition: Adding Material\n\nTo connect transistors and build insulating layers, engineers deposit thin films of conductors (metals) and insulators (dielectrics). The main methods are:\n\n- **CVD (Chemical Vapor Deposition)**: Reactant gases mix in a chamber, causing a chemical reaction that deposits a solid film on the wafer. Used for insulating layers.\n- **PVD (Physical Vapor Deposition / Sputtering)**: A physical process where gas ions bombard a metal target (like copper or aluminum), knocking atoms loose to coat the wafer. Used for metal connections.\n- **ALD (Atomic Layer Deposition)**: Gases are introduced one at a time in self-limiting pulses. It builds the film **one atomic layer at a time**. ALD offers unmatched control over thickness and step coverage.\n\n> **Overlaying layers**: These steps are repeated up to 80 times, layering oxides, metal lines, and silicon structures to build a complete microprocessor.\n",
                        "vocabulary": [
                            {
                                "en": "Wet Etching",
                                "es": "Grabado en húmedo (químico)",
                                "definition": "Removing material using liquid chemicals"
                            },
                            {
                                "en": "Dry Etching",
                                "es": "Grabado en seco (por plasma)",
                                "definition": "Removing material using reactive gases and plasma ions"
                            },
                            {
                                "en": "Isotropic",
                                "es": "Isotrópico",
                                "definition": "Etching that occurs in all directions at the same rate"
                            },
                            {
                                "en": "Anisotropic",
                                "es": "Anisotrópico",
                                "definition": "Etching that occurs in one preferred direction (typically vertical)"
                            },
                            {
                                "en": "Chemical Vapor Deposition (CVD)",
                                "es": "Deposición química de vapor",
                                "definition": "Depositing materials through chemical reactions of gases"
                            },
                            {
                                "en": "Physical Vapor Deposition (PVD)",
                                "es": "Deposición física de vapor",
                                "definition": "Coating wafer with metal by physically knocking atoms off a target"
                            },
                            {
                                "en": "Atomic Layer Deposition (ALD)",
                                "es": "Deposición por capa atómica",
                                "definition": "Adding films one atomic layer at a time for maximum control"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why is dry etching preferred over wet etching for advanced node chips?",
                                "options": [
                                    "It is cheaper and faster",
                                    "It is anisotropic, creating straight vertical walls",
                                    "It uses liquid chemicals",
                                    "It cannot damage the crystal structure"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which deposition method builds thin films one atomic layer at a time?",
                                "options": [
                                    "ALD",
                                    "CVD",
                                    "PVD",
                                    "Wet Etching"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What is PVD primarily used for in semiconductor manufacturing?",
                                "options": [
                                    "Developing positive photoresist",
                                    "Etching deep vertical channels",
                                    "Depositing metallic layers for electrical connections",
                                    "Purifying raw silicon crystals"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What does isotropic mean in etching?",
                                "options": [
                                    "Material is removed vertically only",
                                    "Material is removed in all directions equally",
                                    "No material is removed",
                                    "Only metals are removed"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "semi-m5",
                "title": "Testing, Packaging, and Quality Control",
                "titleES": "Pruebas, Empaquetado y Control de Calidad",
                "icon": "fa-solid fa-vial",
                "readings": [
                    {
                        "id": "semi-m5-r1",
                        "title": "Wafer Testing and Yield",
                        "duration": "10 min",
                        "content": "\n# Wafer Testing and Yield\n\nBefore a silicon wafer is cut into individual chips, every single circuit must be tested. This phase is critical because manufacturing chips is imperfect, and defects are inevitable.\n\n## Wafer Probe Testing\n\nA machine called a **wafer prober** uses a probe card with thousands of microscopic needles to touch the electrical pads on each chip (called a **die**). It runs rapid electrical tests to verify if the logic, memory, and voltage levels are correct.\n\n- **Sorting / Binning**: Chips that pass are marked as functional. In some cases, chips are classified into different \"bins\" based on their performance (e.g., speed, power consumption). A high-speed chip is sold as a premium processor, while a slower chip from the same wafer is sold at a lower price.\n- **Ink Dotting / Digital Mapping**: Traditionally, defective chips were marked with a drop of black ink. Today, a computer generates a digital \"wafer map\" that records the coordinates of all failed dies.\n\n## Yield: The Ultimate Metric\n\nIn semiconductor manufacturing, **yield** (rendimiento) is the most critical business metric. It represents the percentage of working chips produced compared to the maximum possible count.\n\n$$\text{Yield} = \frac{\text{Number of functional dies}}{\text{Total dies on wafer}} \times 100%$$\n\nIf a wafer contains 500 dies, and testing shows that 400 are functional, the yield is **80%**. A low yield (e.g., 20%) means the factory is wasting expensive materials and processing time, which can ruin a chip designer's profits.\n\n## Statistical Process Control (SPC)\n\nTo maintain high yields, fabs use **SPC (Statistical Process Control)**. Sensors monitor thousands of parameters (such as temperature, gas flow, and pressure) in real-time. If a sensor's readings shift away from the statistical average, SPC charts alert engineers immediately. This allows them to stop the machines and fix issues before entire batches of wafers are ruined.\n",
                        "vocabulary": [
                            {
                                "en": "Probe Testing",
                                "es": "Prueba con sonda / Testeo de obleas",
                                "definition": "Electrical testing of chips while still on the wafer"
                            },
                            {
                                "en": "Die",
                                "es": "Pastilla / Chip individual",
                                "definition": "A single unpackaged square of silicon containing a circuit"
                            },
                            {
                                "en": "Yield",
                                "es": "Rendimiento",
                                "definition": "The ratio of working chips to the total chips produced"
                            },
                            {
                                "en": "Binning",
                                "es": "Clasificación de chips",
                                "definition": "Sorting chips into groups based on performance and speed"
                            },
                            {
                                "en": "Wafer Map",
                                "es": "Mapa de oblea",
                                "definition": "A digital grid recording the layout and status of each die"
                            },
                            {
                                "en": "Statistical Process Control (SPC)",
                                "es": "Control estadístico de procesos",
                                "definition": "Using statistical methods to monitor and control a production process"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does 'yield' measure in semiconductor manufacturing?",
                                "options": [
                                    "The weight of the silicon wafer",
                                    "The speed of the chip processing",
                                    "The percentage of functional working chips produced",
                                    "The quantity of gas used in etching"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What tool is used to run electrical tests on chips while they are still on the wafer?",
                                "options": [
                                    "A spin coater",
                                    "A wafer prober",
                                    "An ion implanter",
                                    "An air shower"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the primary purpose of 'binning'?",
                                "options": [
                                    "To throw failed chips in the trash",
                                    "To sort working chips into price/performance categories",
                                    "To pack wafers into shipping containers",
                                    "To wash the wafer between layers"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "How is Statistical Process Control (SPC) used to maintain high yields?",
                                "options": [
                                    "By replacing human workers with robots",
                                    "By monitoring fab parameters in real-time to alert engineers of shifts",
                                    "By increasing the temperature of cleanrooms",
                                    "By using cheaper raw silicon"
                                ],
                                "answer": 1
                            }
                        ]
                    },
                    {
                        "id": "semi-m5-r2",
                        "title": "Chip Packaging and ISO 9001",
                        "duration": "10 min",
                        "content": "\n# Chip Packaging and ISO 9001\n\nA functional silicon die is extremely fragile. It is thinner than paper, sensitive to moisture, and can be destroyed by static electricity. To be useful, it must be enclosed in a protective shell — a process called **packaging** (empaquetado).\n\n## The Three Roles of Packaging\n\n1. **Environmental Protection**: Enclosing the die in a plastic, ceramic, or metal case to block dust, moisture, and impact.\n2. **Electrical Connections**: Connecting the tiny microscopic pads on the die to larger pins or pads that can be soldered to a printed circuit board (PCB).\n3. **Heat Dissipation**: Providing a path to pull heat away from the silicon core (often using metal heat spreaders).\n\n## Packaging Techniques\n\nAs chips grew more advanced, packaging evolved:\n\n### 1. Wire Bonding (Conexión por micro-alambres)\nMicroscopic gold or aluminum wires are welded from the die pads to the package leads. \n- **Pros**: Very cheap and reliable.\n- **Cons**: Slow and limited bandwidth; not suitable for high-speed processors.\n\n### 2. Flip-Chip\nThe die is flipped upside down, and small solder bumps on the chip surface connect directly to the package substrate. This allows for higher pin counts and shorter electrical paths.\n\n### 3. BGA (Ball Grid Array)\nInstead of pins, BGA packages use a grid of tiny **solder balls** (bolas de soldadura) on the bottom of the package. It provides high contact density and excellent thermal performance.\n\n### 4. Advanced Packaging (2.5D/3D)\nCombining multiple dies (like CPU cores and high-bandwidth memory, HBM) in a single package. TSMC's **CoWoS** (Chip-on-Wafer-on-Substrate) is an example of advanced packaging used for high-end AI chips.\n\n## Quality Standards: ISO 9001 and Automotive Reliability\n\nChips used in cars (automotive grade) or planes (aerospace grade) must follow extreme quality standards. They must operate from -40°C to 125°C and survive vibrations for 15+ years. A failure in a phone is annoying; a failure in a car brake system is fatal. Fabs must comply with **ISO 9001** (general quality management) and **AEC-Q100** (automotive qualification standard) to sell to these safety-critical industries.\n",
                        "vocabulary": [
                            {
                                "en": "Chip Packaging",
                                "es": "Empaquetado de chips / Encapsulado",
                                "definition": "Enclosing a silicon die in a protective container"
                            },
                            {
                                "en": "Wire Bonding",
                                "es": "Conexión de micro-alambres",
                                "definition": "Connecting die to package leads using ultra-thin metal wires"
                            },
                            {
                                "en": "Solder Ball",
                                "es": "Bola de soldadura",
                                "definition": "Tiny sphere of solder used to connect BGA packages to PCBs"
                            },
                            {
                                "en": "BGA (Ball Grid Array)",
                                "es": "Matriz de rejilla de bolas",
                                "definition": "Package style using a grid of solder balls on the bottom"
                            },
                            {
                                "en": "Heat Dissipation",
                                "es": "Disipación de calor",
                                "definition": "The process of transfering thermal energy away from the chip"
                            },
                            {
                                "en": "Substrate",
                                "es": "Sustrato",
                                "definition": "The base material that holds the die and wiring in the package"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the primary purpose of chip packaging?",
                                "options": [
                                    "To change the electrical voltage of the chip",
                                    "To protect the delicate silicon die and connect it to a circuit board",
                                    "To increase the transistor count",
                                    "To make chips look attractive"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which packaging technique uses a grid of tiny solder balls on the bottom?",
                                "options": [
                                    "Wire Bonding",
                                    "Flip-Chip",
                                    "BGA (Ball Grid Array)",
                                    "Doping"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is 'wire bonding'?",
                                "options": [
                                    "Welding micro-thin gold/aluminum wires from die pads to package leads",
                                    "Tying cables together inside the cleanroom",
                                    "Connecting wafers using copper bars",
                                    "Using lasers to glue the chip to glass"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "Why do automotive grade chips require stricter certifications like AEC-Q100?",
                                "options": [
                                    "To make them cheaper for car buyers",
                                    "Because they experience extreme temperatures, vibrations, and failures can be fatal",
                                    "So they can connect to wireless networks",
                                    "To speed up their manufacturing time"
                                ],
                                "answer": 1
                            }
                        ]
                    },
                    {
                        "id": "semi-m5-r3",
                        "title": "Advanced Packaging & Data Center Architectures",
                        "duration": "12 min",
                        "content": "\n# Advanced Packaging & Data Center Architectures\n\nData centers run on semiconductors — but not all chips use the same package. As AI, cloud computing, and hyperscale infrastructure continue to grow, **advanced packaging** has become one of the most critical technologies in the semiconductor industry. The package is no longer just protecting the chip; it has become a critical part of **system performance**.\n\n## Workload-Specific Package Architectures\n\nDifferent workloads require specialized package architectures:\n\n### 1. AI Accelerators (GPUs & AI ASICs)\nUsed by NVIDIA (H100/B200), AMD (MI300), Google (TPU), Amazon (Trainium), Microsoft (Maia).\n- **Typical Packages**: Large fcBGA (Flip-Chip Ball Grid Array), 2.5D Packaging (CoWoS), HBM Integration, Chiplets.\n- **Key Priorities**: Massive memory bandwidth, high power delivery, advanced thermal performance.\n\n### 2. Data Center CPUs\nUsed by Intel (Xeon), AMD (EPYC), NVIDIA (Grace).\n- **Typical Packages**: fcBGA, LGA (Land Grid Array), Multi-Die Packages.\n- **Key Specs**: Typically exceed **2,000–6,000+ I/O connections** and handle hundreds of watts of power.\n\n### 3. Networking & Switch ASICs\nUsed by Broadcom (Tomahawk), NVIDIA (Spectrum), Cisco (Silicon One), Marvell (Teralynx).\n- **Typical Packages**: Large fcBGA, Co-Packaged Optics (CPO).\n- **Key Specs**: Next-generation AI switches require **800G, 1.6T, and future 3.2T** connectivity.\n\n### 4. Optical Transceivers\n- **Typical Packages**: LGA, Optical Modules, Silicon Photonics Packages.\n- **Used for**: High-speed fiber connectivity, AI cluster networking, and data center interconnects (DCI).\n\n### 5. Power Management & Power Semiconductors\nUsed for voltage regulation, power conversion, and AI rack power delivery.\n- **Typical Packages**: QFN, Power QFN, LGA, Power Modules.\n- **Industry Challenge**: Next-generation AI racks are approaching **megawatt-scale power consumption**, making power packaging a strategic bottleneck.\n\n## Future Trends in Advanced Packaging\n\nAs AI infrastructure scales, advanced packaging is becoming just as important as the silicon itself:\n- **Larger fcBGA substrates**: Accommodating multiple silicon dies on a single package.\n- **HBM (High Bandwidth Memory)**: Stacking DRAM dies vertically using 3D TSVs (Through-Silicon Vias).\n- **Chiplet Integration**: Breaking monolithic chips into smaller, specialized dies connected via high-speed interconnects (UCIe).\n- **Silicon Photonics & Co-Packaged Optics (CPO)**: Bringing optical optics directly into the chip package to reduce power consumption and latency.\n- **OSAT Expansion**: Offshore Assembly and Test facilities (including nearshoring facilities in North America) are investing heavily in advanced packaging lines.\n\n---\n\n> **Key Takeaway**: Advanced packaging (2.5D/3D, HBM, Chiplets, CPO, fcBGA) is transforming chip design. The package is no longer just a protective shell — it directly determines AI and data center performance.\n",
                        "vocabulary": [
                            {
                                "en": "Advanced Packaging",
                                "es": "Empaquetado avanzado",
                                "definition": "High-density packaging integrating multiple dies, 2.5D/3D structures, or HBM"
                            },
                            {
                                "en": "fcBGA (Flip-Chip Ball Grid Array)",
                                "es": "fcBGA",
                                "definition": "High-density package using solder bumps and a ball grid array substrate"
                            },
                            {
                                "en": "HBM (High Bandwidth Memory)",
                                "es": "Memoria de alto ancho de banda",
                                "definition": "3D-stacked DRAM offering ultra-fast memory access for AI chips"
                            },
                            {
                                "en": "Chiplet",
                                "es": "Chiplet / Die especializado",
                                "definition": "Small modular silicon die combined with others in a single package"
                            },
                            {
                                "en": "Silicon Photonics",
                                "es": "Fotónica de silicio",
                                "definition": "Using light/optics instead of electricity to transfer data on silicon"
                            },
                            {
                                "en": "CPO (Co-Packaged Optics)",
                                "es": "Óptica empaquetada conjuntamente",
                                "definition": "Integrating optical interfaces directly onto the semiconductor package"
                            },
                            {
                                "en": "OSAT",
                                "es": "OSAT",
                                "definition": "Outsourced Semiconductor Assembly and Test company"
                            },
                            {
                                "en": "Power Packaging",
                                "es": "Empaquetado de potencia",
                                "definition": "Packaging designed for high-current voltage regulation and thermal efficiency"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why has advanced packaging become so critical for AI accelerators and data center CPUs?",
                                "options": [
                                    "It makes chips look bigger",
                                    "It is no longer just a protective shell — it directly determines memory bandwidth, power delivery, and system performance",
                                    "It eliminates the need for cleanrooms",
                                    "It allows chips to be made out of plastic"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is HBM (High Bandwidth Memory)?",
                                "options": [
                                    "A type of optical cable",
                                    "3D-stacked DRAM offering massive memory bandwidth for GPUs and AI ASICs",
                                    "A soft rubber coating for wafers",
                                    "A brand of power supply"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is Co-Packaged Optics (CPO)?",
                                "options": [
                                    "Eyeglasses worn by cleanroom technicians",
                                    "Integrating optical interfaces directly into the chip package for high-speed connectivity",
                                    "Using cameras to inspect chips",
                                    "A type of photolithography laser"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is a 'Chiplet' architecture?",
                                "options": [
                                    "A single tiny chip used only in watches",
                                    "Breaking a large monolithic processor into smaller specialized dies in one package",
                                    "A type of potato snack",
                                    "A defect found during wafer testing"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "semi-m6",
                "title": "The Global Chip Industry and Nearshoring",
                "titleES": "La Industria Global de Chips y Nearshoring",
                "icon": "fa-solid fa-globe",
                "readings": [
                    {
                        "id": "semi-m6-r1",
                        "title": "The Semiconductor Supply Chain",
                        "duration": "10 min",
                        "content": "\n> **TSMC Fab 18 & SEMI Industry Note**: The global semiconductor supply chain is governed by **SEMI (Semiconductor Equipment and Materials International)** global standards (such as SEMI E187 for Fab Cybersecurity and SEMI E188 for Tool Interoperability). Understanding TSMC's GigaFab model and North American OSAT hubs is essential for nearshoring semiconductor specialists.\n\n# The Semiconductor Supply Chain: From Fabless Design to OSAT Packaging\n\nThe semiconductor supply chain is one of the most complex, capital-intensive, and highly specialized networks in global economic history. Creating a single state-of-the-art 3nm processor requires over **1,500 individual manufacturing steps** spanning multiple continents and thousands of specialized supplier ecosystems.\n\n## The Tripartite Business Model: Fabless, Foundries, and IDMs\n\nThe semiconductor industry relies on three distinct business architecture models:\n\n### 1. Fabless Design Houses\nCompanies that concentrate 100% of their capital on microarchitecture research, circuit layout design, and software compilers, while outsourcing physical manufacturing entirely.\n- **Key Players**: NVIDIA (GPUs), Apple (Apple Silicon M/A-series), AMD (Zen CPUs), Qualcomm (Snapdragon), MediaTek.\n- **Core Function**: Producing GDSII/OASIS silicon layout files and delivering IP cores to contract foundries.\n\n### 2. Pure-Play Foundries (Wafer Fabs)\nContract manufacturing mega-facilities dedicated strictly to executing customer GDSII layouts into physical silicon wafers. Pure-play foundries do not design or sell branded chips of their own, avoiding conflicts of interest with their clients.\n- **Industry Titans**: **TSMC** (Taiwan Semiconductor Manufacturing Co.), GlobalFoundries, UMC, Tower Semiconductor.\n- **Dominance**: TSMC's **Fab 18** in Tainan and Fab 20 in Hsinchu produce over **90%** of the world's most advanced sub-5nm microprocessors.\n\n### 3. Integrated Device Manufacturers (IDMs)\nLegacy semiconductor pioneers that maintain in-house design, silicon wafer fabrication, testing, and packaging under one corporate umbrella.\n- **Key Players**: Intel, Samsung Electronics, Texas Instruments, Infineon, STMicroelectronics.\n- **Evolution**: Modern IDMs are adopting \"IDM 2.0\" hybrid models, manufacturing core chiplets internally while contracting TSMC for leading-edge nodes.\n\n## Geopolitical Realignment: CHIPS Act & North American Nearshoring\n\nBecause over 80% of global advanced wafer fabrication capacity was historically concentrated in East Asia, governments enacted major industrial policies to decentralize production:\n\n- **US CHIPS and Science Act ($52 Billion USD)**: Direct federal subsidies to establish advanced wafer fabs within North America (e.g., TSMC Fab 21 in Phoenix, Arizona; Intel Fabs 52/62; Samsung Taylor, Texas).\n- **SEMI E187 & E188 Standards Compliance**: Enforcing strict cybersecurity and hardware interoperability standards across equipment vendors to protect intellectual property against cyber espionage.\n\n### Mexico's Strategic Nearshoring Role\n\nThe creation of the U.S. Southwest Semiconductor Belt directly integrates Mexico into high-value manufacturing nodes:\n\n1. **OSAT (Outsourced Semiconductor Assembly and Test)**: Mexico is attracting multi-billion dollar packaging plants in Tijuana, Mexicali, and Chihuahua for Advanced 2.5D/3D Packaging (CoWoS - Chip-on-Wafer-on-Substrate).\n2. **Design, Verification & Embedded Software**: Engineering hubs in Guadalajara and Monterrey lead pre-silicon verification, DFT (Design for Testability), and firmware compilation.\n3. **Chemical & Equipment Supply Chains**: Suppliers across Northern Mexico produce ultra-pure electronic-grade gases, precision machining, and cleanroom consumables required by TSMC and Intel fabs in Arizona.\n\n---\n\n> **Key Takeaway**: The semiconductor industry is split into Fabless, Foundry, and IDM models. Driven by the CHIPS Act and **SEMI** standards, Mexico's nearshoring corridor plays a critical role in OSAT packaging, verification, and chemical supply chains for TSMC and North American fabs.\n",
                        "vocabulary": [
                            {
                                "en": "Supply Chain",
                                "es": "Cadena de suministro",
                                "definition": "The sequence of processes involved in the production and distribution of a commodity"
                            },
                            {
                                "en": "Foundry",
                                "es": "Fundidora de semiconductores",
                                "definition": "A factory that manufactures chips for other design companies"
                            },
                            {
                                "en": "Fabless",
                                "es": "Sin fábrica",
                                "definition": "A business model where a company designs chips but outsources fabrication"
                            },
                            {
                                "en": "IDM",
                                "es": "Fabricante de dispositivos integrados",
                                "definition": "A company that designs, manufactures, and sells its own chips"
                            },
                            {
                                "en": "Nearshoring",
                                "es": "Nearshoring / Relocalización cercana",
                                "definition": "Moving manufacturing operations close to the primary market"
                            },
                            {
                                "en": "CHIPS Act",
                                "es": "Ley de Chips (EE. UU.)",
                                "definition": "US federal law funding domestic semiconductor manufacturing and research"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is a 'fabless' semiconductor company?",
                                "options": [
                                    "A company that only sells raw silicon crystals",
                                    "A company that designs chips but outsources manufacturing to a foundry",
                                    "A factory that operates without using electricity",
                                    "A company that packages chips without testing them"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which foundry company is the absolute world leader, manufacturing over 90% of advanced processors?",
                                "options": [
                                    "Intel",
                                    "Samsung",
                                    "TSMC",
                                    "ASML"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why is nearshoring bringing semiconductor investment to Mexico?",
                                "options": [
                                    "Because silicon is only mined in Mexico",
                                    "To locate testing, packaging, and supply chains closer to North American fab hubs",
                                    "To replace U.S. design houses completely",
                                    "Because ASML is based in Mexico"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is an IDM (Integrated Device Manufacturer)?",
                                "options": [
                                    "A company that designs, fabricates, and sells chips in-house",
                                    "A shipping firm that moves wafers",
                                    "A machine used in cleanrooms",
                                    "A brand of protective bunny suits"
                                ],
                                "answer": 0
                            }
                        ]
                    },
                    {
                        "id": "semi-m6-r2",
                        "title": "Careers in Semiconductor Manufacturing",
                        "duration": "10 min",
                        "content": "\n> **Semiconductor Workforce Certification Note**: Fab career paths and technical competencies are structured according to **SEMI E10** (Specification for Definition and Measurement of Equipment Reliability, Availability, and Maintainability) and **ISO 14644-1** cleanroom certification requirements.\n\n# Professional Career Paths in Semiconductor Fabrication\n\nThe unprecedented expansion of GigaFabs in North America and OSAT nearshoring hubs in Mexico is driving urgent demand for specialized engineers, technicians, and cleanroom operators. Modern semiconductor manufacturing relies on interdisciplinary engineering disciplines operating under zero-defect quality frameworks.\n\n## Specialized Career Disciplines in a GigaFab\n\n### 1. Semiconductor Manufacturing Specialist (MSI Track)\nSpecialists operate automated **FOUP (Front Opening Unified Pod)** material handling systems and overhead hoist transport (OHT) tracks across ISO Class 3/5 cleanroom bays:\n- **Core Competencies**: Executing chemical Standard Operating Procedures (SOPs), wafer lot tracking via Manufacturing Execution Systems (MES), and managing gowning airlock protocols.\n- **Career Trajectory**: Shift Lead -> Fab Area Supervisor -> Cleanroom Operations Manager.\n\n### 2. Fab Equipment Reliability Technician (SEMI E10 Standard)\nEquipment Technicians are responsible for maintaining multi-million-dollar tools (EUV scanners, High-Density Plasma Etchers, Chemical-Mechanical Planarization polishers):\n- **Core Competencies**: Preventive maintenance (PM), vacuum pump leak detection using helium mass spectrometers, RF plasma generator calibration, and mean time between failures (MTBF) analysis under **SEMI E10**.\n- **Career Trajectory**: Senior Tool Specialist -> Field Service Engineer -> Principal Equipment Architect.\n\n### 3. Yield Enhancement & Process Engineer\nProcess Engineers manage the chemical, thermal, and optical parameters across wafer lots to maximize **Die Yield** (percentage of functional chips per wafer):\n- **Core Competencies**: Designing Experiments (DOE), analyzing In-Line Metrology data, optimizing plasma etch gas ratios, and controlling thermal oxidation recipes.\n- **Career Trajectory**: Process Integration Lead -> Yield Engineering Director.\n\n### 4. Metrology & Quality Control Specialist (SPC Framework)\nQuality specialists monitor physical contamination and electrical parameters to prevent catastrophic lot scrap:\n- **Core Competencies**: Implementing **Statistical Process Control (SPC)**, operating Scanning Electron Microscopes (SEM) and X-ray Fluorescence (XRF) tools for nanoscale defect inspection, and conducting root-cause failure analysis (RCFA).\n\n## Technical English as the Global Operational Standard\n\nIn global semiconductor manufacturing, **Technical English is the mandatory operational language across all GigaFabs**:\n- **Consoles & MES Software**: 100% of equipment touchscreens, diagnostic alarms, and recipe editors display commands in English.\n- **SOPs & Safety Logs**: Technical engineering specifications, material safety data sheets (MSDS), and change control requests (CCR) are written exclusively in English.\n- **Cross-Border Nearshoring Sync**: Daily engineering hand-offs between fabs in Arizona, Texas, Mexico, and Taiwan are conducted via Technical English briefings.\n\n---\n\n> **Key Takeaway**: Semiconductor careers range from Manufacturing Specialists to Equipment Technicians and Process Engineers. Guided by **SEMI E10** and **ISO 14644** standards, fluency in Technical English is mandatory for global mobility and rapid career advancement.\n",
                        "vocabulary": [
                            {
                                "en": "Manufacturing Specialist",
                                "es": "Especialista en manufactura",
                                "definition": "Role monitoring fab runs, handling wafers, and managing automated systems"
                            },
                            {
                                "en": "Equipment Technician",
                                "es": "Técnico de equipo",
                                "definition": "Technician responsible for maintaining and repairing fab machinery"
                            },
                            {
                                "en": "Process Engineer",
                                "es": "Ingeniero de procesos",
                                "definition": "Engineer optimizing chemical and physical manufacturing stages to improve yield"
                            },
                            {
                                "en": "Quality Control",
                                "es": "Control de calidad",
                                "definition": "Monitoring and maintaining product standards using metrics like SPC"
                            },
                            {
                                "en": "SOP",
                                "es": "Procedimiento operativo estándar",
                                "definition": "Standard Operating Procedure — detailed instructions for operations"
                            },
                            {
                                "en": "Technical English",
                                "es": "Inglés técnico",
                                "definition": "English vocabulary and phrasing used for specific fields like engineering"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Which role focuses on preventive maintenance and repair of fab machinery?",
                                "options": [
                                    "Process Engineer",
                                    "Equipment Technician",
                                    "Manufacturing Specialist",
                                    "Quality Control Technician"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is Technical English critical in Mexican semiconductor facilities?",
                                "options": [
                                    "Because most workers are from England",
                                    "All manuals, equipment screens, and global operations are in English",
                                    "To write Spanish translations",
                                    "To communicate with local retail stores"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does a Process Engineer do in a fab?",
                                "options": [
                                    "Maintains cleanroom building structures",
                                    "Optimizes chemical and physical recipes of fabrication stages to improve yield",
                                    "Sorts packages into shipping boxes",
                                    "Dresses employees in the gown room"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is a Manufacturing Specialist responsible for?",
                                "options": [
                                    "Writing software for smartphone apps",
                                    "Designing circuit architectures",
                                    "Monitoring automated production runs, handling wafers, and following gown room protocols",
                                    "Operating laser drills"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            }
        ],
        "category": "engineering"
    },
    "electromobility": {
        "id": "electromobility",
        "title": "Electromovilidad",
        "titleEN": "Electromobility & EV Engineering",
        "level": "A2-B1",
        "status": "full",
        "description": "English for electric vehicle engineering — battery technology, electric motors, charging infrastructure, and Mexico's EV manufacturing sector.",
        "descriptionES": "Inglés para ingeniería de vehículos eléctricos — tecnología de baterías, motores eléctricos, infraestructura de carga y el sector de manufactura EV de México.",
        "totalModules": 10,
        "estimatedHours": 20,
        "prerequisites": [
            "esp-foundation"
        ],
        "standard": "CONOCER EC0391",
        "conocer": "EC0391 (Mantenimiento y Ensamble de Vehículos Eléctricos)",
        "ngss": "HS-PS3-3 (Energy System Optimization)",
        "industry": "SAE J3400 (NACS) / ISO 26262 Functional Safety",
        "modules": [
            {
                "id": "ev-m1",
                "title": "Introduction to Electric Vehicles",
                "titleES": "Introducción a los Vehículos Eléctricos",
                "icon": "fa-solid fa-car-battery",
                "readings": [
                    {
                        "id": "ev-m1-r1",
                        "title": "What Is an Electric Vehicle?",
                        "duration": "10 min",
                        "content": "\n# What Is an Electric Vehicle?\n\nEvery year, millions of new electric vehicles (EVs) drive off factory floors around the world. In 2025, global EV sales exceeded 20 million units — roughly one in every five new cars sold. But what exactly makes a car \"electric,\" and why is this technology transforming the automotive industry?\n\n## The Basic Concept\n\nAn **electric vehicle** is a vehicle that uses one or more **electric motors** instead of (or in addition to) an internal combustion engine (ICE) to move. Instead of burning gasoline or diesel, an EV draws energy from a **battery pack** — a large collection of rechargeable battery cells stored in the floor of the vehicle.\n\nThink of it this way: a traditional car is like a stove that burns gas. An EV is like an induction cooktop that uses electricity — cleaner, quieter, and more efficient.\n\n## Types of Electric Vehicles\n\nNot all EVs are the same. Engineers classify them into four categories:\n\n### 1. BEV — Battery Electric Vehicle\nA **BEV** runs entirely on electricity. It has no gasoline engine at all. The battery is the only energy source.\n\n**Examples**: Tesla Model 3, BYD Seal, Nissan Leaf, Chevrolet Equinox EV.\n\n### 2. PHEV — Plug-in Hybrid Electric Vehicle\nA **PHEV** has both an electric motor and a gasoline engine. It can drive a short distance (typically 30-80 km) on electricity alone. After the battery is depleted, the gasoline engine takes over.\n\n**Examples**: Toyota RAV4 Prime, BMW X5 xDrive50e.\n\n### 3. HEV — Hybrid Electric Vehicle\nAn **HEV** also has both an electric motor and a gasoline engine, but it **cannot be plugged in**. The small battery is charged only through **regenerative braking** (recovering energy when slowing down). The electric motor assists the engine but cannot drive the car alone for long distances.\n\n**Examples**: Toyota Prius, Honda Accord Hybrid.\n\n### 4. FCEV — Fuel Cell Electric Vehicle\nAn **FCEV** uses a **hydrogen fuel cell** to generate electricity on board. Hydrogen gas reacts with oxygen in the fuel cell to produce electricity, water, and heat. FCEVs are rare and expensive, but they offer very fast refueling (~5 minutes).\n\n**Examples**: Toyota Mirai, Hyundai NEXO.\n\n## Key Components of a BEV\n\nA modern battery electric vehicle has these essential components:\n\n| Component | Function |\n|-----------|----------|\n| **Battery Pack** | Stores electrical energy (typically 40-100 kWh) |\n| **Electric Motor** | Converts electricity into mechanical rotation to spin the wheels |\n| **Inverter** | Converts DC (battery) to AC (motor) power |\n| **Onboard Charger** | Converts AC from the wall outlet to DC for the battery |\n| **Battery Management System (BMS)** | Monitors cell voltages, temperatures, and state of charge |\n| **Thermal Management System** | Keeps the battery at optimal temperature (15-35°C) |\n| **Regenerative Braking System** | Recovers kinetic energy during deceleration |\n\n## Why EVs Matter for Mexico's Nearshoring Industry\n\nMexico is Latin America's largest automotive manufacturer, producing approximately 4 million vehicles per year. As global automakers transition to electric, Mexico's factories must adapt. The nearshoring wave is bringing new EV component manufacturing:\n\n- **Battery module assembly** plants in Nuevo León and Coahuila\n- **Electric motor** and **power electronics** manufacturing in Querétaro and Puebla\n- **Wiring harness** production (the \"nervous system\" of every EV) in Chihuahua and Sonora\n\nBy 2026, electrified vehicles account for approximately 12.5% of light vehicle sales in Mexico, and this percentage is growing rapidly.\n\n---\n\n> **Key Takeaway**: An electric vehicle replaces the gasoline engine with an electric motor powered by a rechargeable battery. Mexico's automotive industry is transitioning to EV manufacturing, creating thousands of new technical jobs.\n",
                        "vocabulary": [
                            {
                                "en": "Electric Vehicle (EV)",
                                "es": "Vehículo Eléctrico (VE)",
                                "definition": "A vehicle powered by one or more electric motors"
                            },
                            {
                                "en": "Battery Pack",
                                "es": "Paquete de Baterías",
                                "definition": "The large rechargeable energy storage unit in an EV"
                            },
                            {
                                "en": "BEV (Battery Electric Vehicle)",
                                "es": "Vehículo Eléctrico de Batería",
                                "definition": "An EV that runs entirely on electricity"
                            },
                            {
                                "en": "PHEV (Plug-in Hybrid)",
                                "es": "Híbrido Enchufable",
                                "definition": "A vehicle with both electric motor and gasoline engine that can be plugged in"
                            },
                            {
                                "en": "Inverter",
                                "es": "Inversor",
                                "definition": "Device that converts DC to AC power"
                            },
                            {
                                "en": "Regenerative Braking",
                                "es": "Frenado Regenerativo",
                                "definition": "A system that recovers kinetic energy when slowing down"
                            },
                            {
                                "en": "kWh (Kilowatt-hour)",
                                "es": "kWh (Kilovatio-hora)",
                                "definition": "Unit of energy — how much energy a battery stores"
                            },
                            {
                                "en": "Fuel Cell",
                                "es": "Celda de Combustible",
                                "definition": "Device that generates electricity from hydrogen"
                            },
                            {
                                "en": "Wiring Harness",
                                "es": "Arnés de Cableado",
                                "definition": "The bundle of electrical wires that connects all components"
                            },
                            {
                                "en": "ICE (Internal Combustion Engine)",
                                "es": "Motor de Combustión Interna",
                                "definition": "Traditional gasoline/diesel engine"
                            },
                            {
                                "en": "Nearshoring",
                                "es": "Nearshoring",
                                "definition": "Relocating manufacturing closer to the primary market"
                            },
                            {
                                "en": "Thermal Management",
                                "es": "Gestión Térmica",
                                "definition": "Controlling temperature of battery and components"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the main difference between a BEV and a PHEV?",
                                "options": [
                                    "Both use only electricity",
                                    "A BEV runs only on electricity; a PHEV has both electric and gasoline power",
                                    "A PHEV is faster",
                                    "A BEV uses hydrogen"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does an inverter do in an EV?",
                                "options": [
                                    "Stores energy",
                                    "Converts DC power from the battery to AC power for the motor",
                                    "Cools the battery",
                                    "Connects to the internet"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does regenerative braking recover?",
                                "options": [
                                    "Gasoline",
                                    "Water",
                                    "Kinetic energy during deceleration",
                                    "Heat from the engine"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why is EV manufacturing important for Mexico?",
                                "options": [
                                    "Mexico invented EVs",
                                    "Mexico is Latin America's largest auto manufacturer transitioning to electric",
                                    "Mexico has the most hydrogen",
                                    "EVs are cheaper to design"
                                ],
                                "answer": 1
                            }
                        ]
                    },
                    {
                        "id": "ev-m1-r2",
                        "title": "The History and Future of Electric Vehicles",
                        "duration": "10 min",
                        "content": "\n# The History and Future of Electric Vehicles\n\nMany people think electric vehicles are a new invention. In reality, EVs are older than gasoline cars. Understanding this history helps us see where the technology is heading.\n\n## The First Electric Cars (1830s–1900s)\n\nThe first crude electric carriage was built around **1832** by Scottish inventor Robert Anderson. By the 1890s, electric vehicles were actually **more popular** than gasoline cars in major cities like New York and London. They were quiet, clean, and easy to operate — you didn't need to hand-crank the engine like gasoline cars of that era.\n\nIn 1899, a Belgian electric car called \"La Jamais Contente\" became the first vehicle to exceed **100 km/h** (62 mph). Electric taxis operated in New York City as early as 1897.\n\n## The Decline (1920s–1990s)\n\nSo why did electric cars disappear? Three main reasons:\n\n1. **Henry Ford's Model T** (1908): Mass production made gasoline cars affordable — the Model T cost $260 (about $4,500 today), while electric cars cost $1,750+.\n2. **The electric starter motor** (1912): Before this, gasoline cars required dangerous hand-cranking. The electric starter eliminated this inconvenience.\n3. **Oil discoveries**: Cheap gasoline in Texas and Oklahoma made fuel costs negligible.\n\nBy the 1920s, the electric vehicle was essentially dead for the next 70 years.\n\n## The Revival (1990s–2020s)\n\nSeveral events brought EVs back:\n\n- **1996**: General Motors released the **EV1**, a revolutionary electric car. It was popular with owners but GM controversially crushed all units by 2003.\n- **2003**: **Tesla Motors** was founded by Martin Eberhard and Marc Tarpenning (Elon Musk joined as chairman and lead investor in 2004).\n- **2008**: Tesla Roadster launched — the first highway-legal EV with a lithium-ion battery and over 300 km range.\n- **2010**: Nissan Leaf became the first affordable mass-market EV.\n- **2017**: Tesla Model 3 launched and became the best-selling EV in history.\n- **2020s**: Chinese manufacturers like **BYD**, **NIO**, and **Xpeng** emerged as global leaders.\n\n## The Current Landscape (2025–2026)\n\nToday, the EV market is characterized by:\n\n| Metric | Value |\n|--------|-------|\n| Global EV sales (2025) | ~20 million units |\n| Share of new car sales | ~20% globally |\n| Leading manufacturer | BYD (China) |\n| Battery cost (2025) | ~$90/kWh (LFP chemistry) |\n| Average range | 350-500 km (BEV) |\n\n## Key Technologies Driving the Future\n\n### Solid-State Batteries\nCurrent EVs use **lithium-ion** batteries with liquid electrolytes. **Solid-state batteries** replace the liquid with a solid material, offering higher energy density, faster charging, and better safety. Mass production is expected by 2028-2030.\n\n### Vehicle-to-Grid (V2G)\nFuture EVs will not just consume electricity — they will **sell it back** to the power grid. Your parked EV could power your home during a blackout or earn money by stabilizing the electrical grid.\n\n### Autonomous Driving + EVs\nElectric powertrains are ideal platforms for autonomous driving because electric motors respond **instantly** to computer commands and software updates can improve the vehicle over its lifetime.\n\n---\n\n> **Key Takeaway**: Electric vehicles were invented before gasoline cars but lost the market battle in the early 1900s. Today, they are back stronger than ever, driven by battery technology, climate goals, and software innovation.\n",
                        "vocabulary": [
                            {
                                "en": "Internal Combustion Engine (ICE)",
                                "es": "Motor de Combustión Interna",
                                "definition": "Engine that burns fuel (gasoline/diesel)"
                            },
                            {
                                "en": "Mass Production",
                                "es": "Producción en Masa",
                                "definition": "Manufacturing large quantities at low cost"
                            },
                            {
                                "en": "Lithium-Ion Battery",
                                "es": "Batería de Iones de Litio",
                                "definition": "The most common rechargeable battery type in EVs"
                            },
                            {
                                "en": "Solid-State Battery",
                                "es": "Batería de Estado Sólido",
                                "definition": "Next-gen battery replacing liquid electrolyte with solid"
                            },
                            {
                                "en": "Energy Density",
                                "es": "Densidad Energética",
                                "definition": "Amount of energy stored per unit of weight or volume"
                            },
                            {
                                "en": "Vehicle-to-Grid (V2G)",
                                "es": "Vehículo a Red (V2G)",
                                "definition": "Technology allowing EVs to send electricity back to the grid"
                            },
                            {
                                "en": "Autonomous Driving",
                                "es": "Conducción Autónoma",
                                "definition": "Self-driving vehicle technology"
                            },
                            {
                                "en": "Range",
                                "es": "Autonomía",
                                "definition": "How far a vehicle can travel on a single charge"
                            },
                            {
                                "en": "Electrolyte",
                                "es": "Electrolito",
                                "definition": "The medium that carries ions between battery electrodes"
                            },
                            {
                                "en": "Powertrain",
                                "es": "Tren Motriz",
                                "definition": "All components that generate and deliver power to wheels"
                            }
                        ],
                        "questions": [
                            {
                                "q": "When was the first electric carriage built?",
                                "options": [
                                    "Around 1832",
                                    "1908",
                                    "1996",
                                    "2003"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "Why did gasoline cars win over electric cars in the early 1900s?",
                                "options": [
                                    "Electric cars were dangerous",
                                    "Mass production made gasoline cars cheap, and oil was abundant",
                                    "Electric cars were too fast",
                                    "Governments banned EVs"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What advantage do solid-state batteries offer?",
                                "options": [
                                    "They are heavier",
                                    "They use gasoline",
                                    "Higher energy density, faster charging, and better safety",
                                    "They never need charging"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is Vehicle-to-Grid (V2G)?",
                                "options": [
                                    "Technology allowing EVs to send electricity back to the power grid",
                                    "A type of charger",
                                    "A GPS system",
                                    "A new car brand"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m2",
                "title": "Battery Technology: Lithium-Ion and Beyond",
                "titleES": "Tecnología de Baterías: Litio-Ion y Más Allá",
                "icon": "fa-solid fa-battery-full",
                "readings": [
                    {
                        "id": "ev-m2-r1",
                        "title": "How a Lithium-Ion Battery Works",
                        "duration": "10 min",
                        "content": "\n# How a Lithium-Ion Battery Works\n\nThe battery is the heart of every electric vehicle. Understanding how it works is essential for anyone entering the EV manufacturing industry.\n\n## The Basic Structure\n\nA lithium-ion battery cell has four main components:\n\n1. **Cathode** (positive electrode): Made of a lithium metal oxide. This is where lithium ions \"live\" when the battery is fully charged. The cathode material determines the battery's performance characteristics.\n\n2. **Anode** (negative electrode): Usually made of **graphite** (a form of carbon). During charging, lithium ions move from the cathode to the anode and embed themselves between graphite layers — a process called **intercalation**.\n\n3. **Electrolyte**: A liquid chemical that allows lithium **ions** (Li⁺) to move between the cathode and anode. The electrolyte conducts ions but **blocks electrons**, forcing them through the external circuit (which powers the motor).\n\n4. **Separator**: A thin, porous membrane between the cathode and anode that prevents them from physically touching (which would cause a **short circuit**) while allowing ions to pass through.\n\n## Charging and Discharging\n\n### Charging (Plugging in):\n- An external power source pushes lithium ions **from the cathode to the anode** through the electrolyte\n- Electrons flow through the external circuit in the same direction\n- Energy is stored as chemical potential energy in the anode\n\n### Discharging (Driving):\n- Lithium ions move **from the anode back to the cathode** through the electrolyte\n- Electrons flow through the external circuit (powering the electric motor)\n- Chemical energy is converted to electrical energy\n\n> **Analogy**: Think of lithium ions as tiny workers carrying energy packages. During charging, they carry packages from one warehouse (cathode) to another (anode). During driving, they carry them back, and the energy released powers the car.\n\n## Battery Chemistries\n\n### LFP — Lithium Iron Phosphate (LiFePO₄)\n- **Cost**: Low (~$50-90/kWh)\n- **Safety**: Excellent (very resistant to thermal runaway)\n- **Cycle Life**: Very long (3,000-5,000+ cycles)\n- **Energy Density**: Lower (less range per kg)\n- **Used by**: BYD (Blade Battery), Tesla (base models), most Chinese EVs\n\n### NMC — Nickel Manganese Cobalt (LiNiMnCoO₂)\n- **Cost**: Higher (~$100-140/kWh)\n- **Safety**: Good (but more sensitive to heat)\n- **Cycle Life**: Moderate (1,000-2,000 cycles)\n- **Energy Density**: High (more range per kg)\n- **Used by**: BMW, Mercedes, Hyundai, Tesla (long-range models)\n\n### NCA — Nickel Cobalt Aluminum (LiNiCoAlO₂)\n- **Cost**: High\n- **Energy Density**: Highest among commercial chemistries\n- **Used by**: Tesla (Panasonic cylindrical cells)\n\n## From Cells to Packs\n\nA single battery cell produces approximately **3.2-3.7 volts**. To build a usable battery:\n\n1. **Cells** are grouped into **modules** (typically 6-12 cells)\n2. **Modules** are assembled into a **battery pack** (typically 8-20 modules)\n3. The pack is sealed, cooled, and integrated into the vehicle floor\n\nA typical EV battery pack contains **thousands of individual cells** and weighs 300-700 kg.\n\n---\n\n> **Key Takeaway**: A lithium-ion battery works by shuttling lithium ions between cathode and anode. LFP is the dominant chemistry for mass-market EVs (cheap, safe, long-lasting), while NMC offers higher energy density for premium vehicles.\n",
                        "vocabulary": [
                            {
                                "en": "Cathode",
                                "es": "Cátodo",
                                "definition": "Positive electrode of a battery cell"
                            },
                            {
                                "en": "Anode",
                                "es": "Ánodo",
                                "definition": "Negative electrode (usually graphite)"
                            },
                            {
                                "en": "Electrolyte",
                                "es": "Electrolito",
                                "definition": "Liquid/solid medium that conducts ions"
                            },
                            {
                                "en": "Separator",
                                "es": "Separador",
                                "definition": "Thin membrane preventing electrodes from touching"
                            },
                            {
                                "en": "Intercalation",
                                "es": "Intercalación",
                                "definition": "Insertion of lithium ions between graphite layers"
                            },
                            {
                                "en": "LFP (Lithium Iron Phosphate)",
                                "es": "Fosfato de Hierro y Litio",
                                "definition": "Safe, affordable battery chemistry"
                            },
                            {
                                "en": "NMC (Nickel Manganese Cobalt)",
                                "es": "Níquel Manganeso Cobalto",
                                "definition": "High-energy-density battery chemistry"
                            },
                            {
                                "en": "Thermal Runaway",
                                "es": "Fuga Térmica",
                                "definition": "Dangerous chain reaction causing a battery fire"
                            },
                            {
                                "en": "Cycle Life",
                                "es": "Vida de Ciclo",
                                "definition": "Number of charge-discharge cycles before degradation"
                            },
                            {
                                "en": "Short Circuit",
                                "es": "Cortocircuito",
                                "definition": "Unintended direct connection between electrodes"
                            },
                            {
                                "en": "Module",
                                "es": "Módulo",
                                "definition": "Group of battery cells wired together"
                            },
                            {
                                "en": "Battery Pack",
                                "es": "Paquete de Baterías",
                                "definition": "Complete assembly of modules in a vehicle"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What are the four main components of a lithium-ion cell?",
                                "options": [
                                    "Cathode, anode, electrolyte, separator",
                                    "Motor, inverter, charger, cable",
                                    "Frame, wheels, seats, glass",
                                    "Silicon, copper, iron, rubber"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What happens during battery discharge (driving)?",
                                "options": [
                                    "Ions move from anode to cathode through the motor",
                                    "Lithium ions move from anode to cathode through the electrolyte, generating electricity",
                                    "The battery gets heavier",
                                    "Nothing — the battery is static"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which battery chemistry is safest and cheapest?",
                                "options": [
                                    "NMC",
                                    "NCA",
                                    "LFP (Lithium Iron Phosphate)",
                                    "Lead-acid"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why is the separator important?",
                                "options": [
                                    "It charges the battery faster",
                                    "It prevents a short circuit by keeping cathode and anode apart while allowing ions through",
                                    "It stores energy",
                                    "It cools the motor"
                                ],
                                "answer": 1
                            }
                        ]
                    },
                    {
                        "id": "ev-m2-r2",
                        "title": "Cell Formats: Cylindrical, Prismatic, and Pouch",
                        "duration": "10 min",
                        "content": "\n> **Automotive Battery Standards Note**: Battery cell formats and structural integration protocols are engineered according to **UN 38.3** (Transport Safety for Lithium Batteries) and **ISO 12405** (Electrically Propelled Road Vehicles — Test Specification for Lithium-Ion Battery Packs).\n\n# Cell Formats Architecture: Cylindrical, Prismatic, and Pouch Systems\n\nBattery cells are the fundamental building blocks of electric vehicle energy storage. Choosing the cell's physical geometry determines the battery pack's energy density, thermal dissipation capacity, structural integrity, and automated manufacturing complexity.\n\n## Mechanical & Volumetric Comparison of Cell Geometries\n\n### 1. Cylindrical Cells (High Reliability & Structural Strength)\nConstructed by tightly winding cathode, separator, and anode foils into a rigid metallic cylinder (can):\n- **Standard Industry Sizes**: **18650** (18mm diameter × 65mm length), **2170** (21mm × 70mm), and large-format **4680** (46mm × 80mm).\n- **Tabless Electrode Architecture**: Tesla's 4680 design eliminates traditional current collector tabs, using a continuous shingled edge. This reduces internal electrical resistance pathways by **5×**, preventing dangerous localized heat generation during 250 kW fast charging.\n- **Structural Integrity**: The cylindrical geometry provides superior resistance to internal pressure swelling and enables efficient cooling channels between round cells.\n\n### 2. Prismatic Cells (Maximum Volumetric Space Utilization)\nLarge, rigid rectangular metal cans containing stacked or flat-wound electrode sheets:\n- **Volumetric Efficiency**: Packs tightly without interstitial air gaps, achieving up to 60-70% volumetric packing efficiency.\n- **Dominant Architectures**: BYD **Blade Battery** (LFP chemistry integrated as structural beams) and CATL Large Prismatic blocks used by BMW, Volkswagen, and Hyundai.\n\n### 3. Pouch Cells (Flexible & Lightweight Packaging)\nElectrodes enclosed in flexible, aluminum-laminated polymer foils:\n- **Weight Reduction**: Eliminates heavy outer metal cans, offering the highest gravimetric energy density (Wh/kg).\n- **Mechanical Constraint Requirements**: Pouch cells swell by up to 10% over their cycle life due to gas formation; they require rigid external compression frames and foam pads to prevent delamination.\n\n## Structural Evolution: Module-Less Integration (CTP & CTC)\n\nTraditional EV battery packs used a three-tier hierarchy: **Cells → Modules → Pack**. Next-generation manufacturing eliminates intermediate structural layers:\n\n- **Cell-to-Pack (CTP)**: Cells serve as load-bearing structural members directly secured into the main pack casing. Eliminating module housing, bus bar harnesses, and CMUs increases volumetric utilization by 15-20% and reduces total pack weight by 10%.\n- **Cell-to-Chassis (CTC) / Structural Battery**: The battery pack casing replaces the vehicle floor pan, directly connecting to the front and rear body die-castings (Gigacastings). This increases torsional rigidity by over 30% while maximizing passenger cabin space.\n\n---\n\n> **Key Takeaway**: Cell format selection balances volumetric packing, cooling, and structural rigidity. Governed by **UN 38.3** and **ISO 12405**, innovations like 4680 tabless design and Cell-to-Pack (CTP) integration are driving modern EV manufacturing efficiency.\n",
                        "vocabulary": [
                            {
                                "en": "Cylindrical Cell",
                                "es": "Celda Cilíndrica",
                                "definition": "Round battery cell (like a large AA battery)"
                            },
                            {
                                "en": "Prismatic Cell",
                                "es": "Celda Prismática",
                                "definition": "Rectangular metal-cased battery cell"
                            },
                            {
                                "en": "Pouch Cell",
                                "es": "Celda de Bolsa / Pouch",
                                "definition": "Flat, flexible battery cell in aluminum film"
                            },
                            {
                                "en": "4680 Cell",
                                "es": "Celda 4680",
                                "definition": "Tesla's large-format cylindrical cell (46mm × 80mm)"
                            },
                            {
                                "en": "Tabless Electrode",
                                "es": "Electrodo sin Pestaña",
                                "definition": "Electrode design reducing internal resistance"
                            },
                            {
                                "en": "Cell-to-Pack (CTP)",
                                "es": "Celda a Paquete",
                                "definition": "Eliminating modules to place cells directly in pack"
                            },
                            {
                                "en": "Cell-to-Chassis (CTC)",
                                "es": "Celda a Chasis",
                                "definition": "Integrating battery directly into vehicle structure"
                            },
                            {
                                "en": "Swelling",
                                "es": "Hinchamiento",
                                "definition": "Expansion of cells due to internal gas or pressure"
                            },
                            {
                                "en": "Packing Efficiency",
                                "es": "Eficiencia de Empaque",
                                "definition": "How well cells fit together without wasted space"
                            },
                            {
                                "en": "Dry Battery Electrode",
                                "es": "Electrodo Seco",
                                "definition": "Manufacturing process eliminating liquid solvents"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Which cell format is used in Tesla's 4680?",
                                "options": [
                                    "Cylindrical",
                                    "Prismatic",
                                    "Pouch",
                                    "Flat-pack"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What is the main advantage of prismatic cells?",
                                "options": [
                                    "They are the lightest",
                                    "Rectangular shape packs efficiently with minimal gaps",
                                    "They are cheapest",
                                    "They don't need cooling"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does Cell-to-Pack (CTP) eliminate?",
                                "options": [
                                    "The battery",
                                    "The motor",
                                    "The module layer — cells go directly into the pack",
                                    "The charger"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why has 4680 manufacturing been difficult?",
                                "options": [
                                    "The cells are too small",
                                    "The Dry Battery Electrode process proved harder than expected to scale",
                                    "There is no demand",
                                    "Cylindrical cells are obsolete"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m3",
                "title": "Electric Motors and Powertrains",
                "titleES": "Motores Eléctricos y Trenes Motrices",
                "icon": "fa-solid fa-gear",
                "readings": [
                    {
                        "id": "ev-m3-r1",
                        "title": "How Electric Motors Work",
                        "duration": "10 min",
                        "content": "\n# How Electric Motors Work\n\nThe electric motor converts electrical energy from the battery into mechanical energy that spins the wheels. Electric motors are fundamentally simpler than internal combustion engines — a typical EV motor has approximately **20 moving parts** compared to over **2,000** in a gasoline engine.\n\n## The Basic Principle: Electromagnetism\n\nAn electric motor works because of the **Lorentz force**: when you pass electricity through a wire near a magnet, the wire experiences a force. By arranging wires in a circular coil surrounded by magnets, you create continuous rotation.\n\n### Key Components:\n1. **Stator** (stationary part): Contains copper wire coils creating a rotating magnetic field\n2. **Rotor** (rotating part): Spins inside the stator, connected to the drivetrain\n3. **Shaft**: Transfers rotation to wheels through a **reduction gear**\n\n## Types of EV Motors\n\n### 1. PMSM — Permanent Magnet Synchronous Motor\nThe rotor contains **permanent magnets** (neodymium rare earth). Highest efficiency (90-97%), compact, excellent low-speed torque. Uses expensive rare earth magnets (80% from China).\n**Used by**: Tesla (rear motor), BYD, most manufacturers.\n\n### 2. AC Induction Motor\nInvented by Nikola Tesla in 1887. No magnets — the stator's field **induces** currents in the rotor. Very robust, lower cost, no rare earth dependency.\n**Used by**: Tesla (front motor in dual-motor models).\n\n### 3. Switched Reluctance Motor (SRM)\nSimplest design — no magnets, no rotor windings. Extremely cheap but more vibration and noise.\n\n## Why EVs Feel So Fast\n\nElectric motors deliver **100% of their torque instantly** from 0 RPM. A gasoline engine needs to rev up to 3,000-5,000 RPM. This is why even a modest EV accelerates faster off the line than most sports cars.\n\n## Motor Configurations\n\n- **Single motor**: One motor on rear or front axle. Simplest, cheapest.\n- **Dual motor**: One per axle. Provides **all-wheel drive (AWD)** without a mechanical driveshaft.\n- **Tri-motor**: One front + two rear. Enables **torque vectoring**. Used in Tesla Model S Plaid.\n\n---\n\n> **Key Takeaway**: Electric motors convert electricity to motion using electromagnetism. PMSM motors dominate for efficiency, but induction motors avoid rare earth dependence. EVs deliver instant torque.\n",
                        "vocabulary": [
                            {
                                "en": "Stator",
                                "es": "Estátor",
                                "definition": "The stationary part of an electric motor"
                            },
                            {
                                "en": "Rotor",
                                "es": "Rotor",
                                "definition": "The rotating part of an electric motor"
                            },
                            {
                                "en": "Torque",
                                "es": "Par Motor / Torque",
                                "definition": "Rotational force applied to wheels"
                            },
                            {
                                "en": "PMSM",
                                "es": "Motor Síncrono de Imanes Permanentes",
                                "definition": "High-efficiency motor using rare earth magnets"
                            },
                            {
                                "en": "Induction Motor",
                                "es": "Motor de Inducción",
                                "definition": "Motor where rotor current is induced by stator field"
                            },
                            {
                                "en": "Rare Earth Elements",
                                "es": "Elementos de Tierras Raras",
                                "definition": "Minerals like neodymium used in permanent magnets"
                            },
                            {
                                "en": "Lorentz Force",
                                "es": "Fuerza de Lorentz",
                                "definition": "Force on a current-carrying wire in a magnetic field"
                            },
                            {
                                "en": "Reduction Gear",
                                "es": "Engranaje Reductor",
                                "definition": "Single-speed gearbox in EVs"
                            },
                            {
                                "en": "Torque Vectoring",
                                "es": "Vectorización de Torque",
                                "definition": "Sending different power to each wheel"
                            },
                            {
                                "en": "All-Wheel Drive (AWD)",
                                "es": "Tracción en las Cuatro Ruedas",
                                "definition": "Power delivered to all four wheels"
                            },
                            {
                                "en": "RPM",
                                "es": "RPM (Revoluciones Por Minuto)",
                                "definition": "Speed of motor rotation"
                            },
                            {
                                "en": "Efficiency",
                                "es": "Eficiencia",
                                "definition": "Ratio of useful output to total input energy"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What are the two main parts of an electric motor?",
                                "options": [
                                    "Battery and inverter",
                                    "Stator and rotor",
                                    "Cathode and anode",
                                    "Engine and transmission"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What type of motor uses permanent rare earth magnets?",
                                "options": [
                                    "PMSM (Permanent Magnet Synchronous Motor)",
                                    "Induction Motor",
                                    "Switched Reluctance Motor",
                                    "Diesel motor"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "Why do EVs feel faster than gasoline cars from a stop?",
                                "options": [
                                    "They weigh less",
                                    "They have more gears",
                                    "Electric motors deliver 100% torque instantly at 0 RPM",
                                    "They use jet fuel"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What does a dual-motor configuration provide?",
                                "options": [
                                    "Better fuel economy",
                                    "All-wheel drive without a mechanical driveshaft",
                                    "Longer battery life",
                                    "Reduced cost"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m4",
                "title": "Charging Infrastructure and Standards",
                "titleES": "Infraestructura de Carga y Estándares",
                "icon": "fa-solid fa-charging-station",
                "readings": [
                    {
                        "id": "ev-m4-r1",
                        "title": "EV Charging Levels and Connectors",
                        "duration": "10 min",
                        "content": "\n# EV Charging Levels and Connectors\n\nUnderstanding how EVs charge is critical for anyone working in the electromobility industry.\n\n## Charging Levels\n\n### Level 1 — Standard Household Outlet\n**Power**: 1.2-1.8 kW (120V AC). Adds ~5-8 km of range per hour. Extremely slow — rarely used as primary method.\n\n### Level 2 — Dedicated Home/Workplace Charger\n**Power**: 3.3-19.2 kW (240V AC). Adds ~25-50 km of range per hour. Most common method — charge overnight at home.\n\n### Level 3 — DC Fast Charging (DCFC)\n**Power**: 50-350+ kW (high-voltage DC). Adds 200-300 km in 20-30 minutes. Used for highway stops and commercial fleets. Stations cost $50,000-$150,000 each.\n\n## Connector Standards (2025-2026)\n\n### NACS / SAE J3400 — The New North American Standard\nOriginally Tesla's proprietary connector, now officially standardized as **SAE J3400**. As of 2026, NACS is the **unified standard** in North America:\n- Single, compact connector for both AC and DC charging\n- Supports up to **1,000V DC** and up to **1 MW** power\n- All major automakers adopting NACS\n\n### CCS1 — Being Phased Out\nPreviously the standard for non-Tesla vehicles. Being replaced by NACS.\n\n### CCS2 — European Standard\nRemains dominant in Europe (designed for three-phase AC).\n\n### CHAdeMO — Legacy Japanese Standard\nUsed by early Nissan Leaf. Being phased out globally.\n\n## Charging Curves and Battery Health\n\nCharging is not linear. The battery charges fastest at 10-20% and slows above 80%:\n- **10% → 80%**: Fastest (the \"sweet spot\")\n- **80% → 100%**: Much slower — BMS reduces power to protect cells\n\nThis is why manufacturers quote \"10-80% charging time.\"\n\n---\n\n> **Key Takeaway**: EV charging comes in three levels. NACS (SAE J3400) is becoming the unified North American standard. Charge to 80% for fastest results.\n",
                        "vocabulary": [
                            {
                                "en": "Level 1 Charging",
                                "es": "Carga Nivel 1",
                                "definition": "Slow charging from standard household outlet (120V)"
                            },
                            {
                                "en": "Level 2 Charging",
                                "es": "Carga Nivel 2",
                                "definition": "Medium charging from dedicated 240V charger"
                            },
                            {
                                "en": "DC Fast Charging (DCFC)",
                                "es": "Carga Rápida DC",
                                "definition": "High-power direct-current charging (50-350+ kW)"
                            },
                            {
                                "en": "EVSE",
                                "es": "Equipo de Suministro EV",
                                "definition": "Wall-mounted charging unit with safety features"
                            },
                            {
                                "en": "NACS / SAE J3400",
                                "es": "NACS / SAE J3400",
                                "definition": "North American Charging Standard — the new unified connector"
                            },
                            {
                                "en": "CCS",
                                "es": "Sistema de Carga Combinada",
                                "definition": "Legacy connector standard being phased out in NA"
                            },
                            {
                                "en": "Supercharger",
                                "es": "Supercargador",
                                "definition": "Tesla's DC fast charging network"
                            },
                            {
                                "en": "Charging Curve",
                                "es": "Curva de Carga",
                                "definition": "How charging speed varies with battery state of charge"
                            },
                            {
                                "en": "State of Charge (SoC)",
                                "es": "Estado de Carga",
                                "definition": "Percentage of battery currently full"
                            },
                            {
                                "en": "kW (Kilowatt)",
                                "es": "kW (Kilovatio)",
                                "definition": "Unit of power — how fast energy is delivered"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Which charging level is fastest?",
                                "options": [
                                    "Level 1",
                                    "Level 2",
                                    "Level 3 (DC Fast Charging)",
                                    "They are all the same"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is NACS (SAE J3400)?",
                                "options": [
                                    "A battery chemistry",
                                    "A car brand",
                                    "The new unified North American charging connector standard",
                                    "A type of motor"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why do EV manufacturers quote '10-80% charging time'?",
                                "options": [
                                    "Because charging slows significantly above 80% to protect battery health",
                                    "Because the car can't charge above 80%",
                                    "Because the charger breaks at 80%",
                                    "Because 80% is the maximum capacity"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What does Level 2 charging require?",
                                "options": [
                                    "No special equipment",
                                    "A hydrogen fuel cell",
                                    "A dedicated 240V EVSE unit",
                                    "A DC fast charger"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m5",
                "title": "EV Manufacturing Process",
                "titleES": "Proceso de Manufactura de VE",
                "icon": "fa-solid fa-industry",
                "readings": [
                    {
                        "id": "ev-m5-r1",
                        "title": "From Raw Materials to Rolling Car",
                        "duration": "10 min",
                        "content": "\n> **Automotive Quality & Safety Standards Note**: The manufacturing workflows in this reading strictly comply with **IATF 16949** (Automotive Quality Management Systems) and **ISO 26262** (Functional Safety for Road Vehicles). Mastering these protocols is essential for quality control engineers working across OEM plants and Tier-1 suppliers in Mexico's nearshoring corridor.\n\n# From Raw Materials to Rolling Car: The EV Assembly Line\n\nManufacturing an electric vehicle combines traditional automotive assembly with high-precision electrochemical engineering and high-voltage safety protocols.\n\n## The Five Phases of Industrial Assembly\n\n### Phase 1: Battery Cell Manufacturing (Gigafactory Operations)\nCell production takes place under strict humidity control (<1% RH cleanroom environments) to prevent chemical degradation:\n- **Slurry Preparation**: Mixing active cathode/anode powders with solvents into a homogeneous paste.\n- **Coating & Calendering**: Applying slurry to current collectors (aluminum for cathode, copper for anode) and passing them through heavy heated rollers for precise thickness control.\n- **Slitting & Stacking**: Precision cutting of coated foils into strips and stacking or winding them with separator layers.\n- **Electrolyte Injection & Formation**: Sealing cells, injecting liquid electrolyte under vacuum, and performing the initial charge cycle (**Formation**) to build the Solid Electrolyte Interphase (SEI) layer.\n\n### Phase 2: High-Voltage Battery Pack Integration\nCells are sorted by precise internal resistance and capacity before assembly:\n- **Laser Welding & Bus Bar Interconnection**: Automated fiber-laser welding connects cell terminals with copper/aluminum **bus bars**.\n- **Thermal Interface Materials (TIM)**: Applying thermally conductive gap fillers between cell blocks and aluminum liquid-cooling cold plates.\n- **BMS Hardware & Harness Installation**: Integrating cell monitoring units (CMUs) and master **Battery Management Systems (BMS)** certified to **ISO 26262 ASIL-D**.\n- **Structural Sealing & Dielectric Inspection**: Pressure testing against IP67/IP69K water ingress and performing high-potential (Hi-Pot) insulation checks at 2,500V DC.\n\n### Phase 3: Electric Powertrain & E-Axle Assembly\nIntegrating electric traction motors with power electronics into a unified **e-axle** module:\n- Hairpin copper stator winding to maximize slot fill factor and torque density.\n- Rotor magnet insertion and high-speed dynamic balancing up to 20,000 RPM.\n- Inverter assembly with Silicon Carbide (SiC) MOSFET power modules for >98% power conversion efficiency.\n\n### Phase 4: Body-in-White (BIW) and Vehicle Marriage\n- **Gigacasting & Stamping**: Large aluminum die-casting machines form major underbody structural sections in single pieces.\n- **Robotic Body Joining**: Over 500 industrial robots perform spot welding, self-piercing riveting, and structural adhesive bonding.\n- **Automated Painting**: E-coating for corrosion resistance, primer application, and electrostatic robotic color spraying.\n- **The \"Marriage\" Station**: Automated Guided Vehicles (AGVs) lift the fully assembled, 500kg high-voltage battery pack from beneath the chassis, securing it with automated torque-controlled fasteners.\n\n### Phase 5: End-of-Line (EOL) Quality Validation\n- **End-of-Line Electrical Testing**: Validating high-voltage interlock loops (HVIL) and insulation resistance under Simulated Load.\n- **ADAS & Sensor Calibration**: Calibrating LiDAR, millimeter-wave radar, and camera optics for autonomous driving assistance.\n- **Dyno & Shower Testing**: High-pressure water chamber leaks inspection and chassis dynamometer acceleration/braking verification.\n\n## Mexico's Nearshoring Industrial Corridor\n\nThe North American supply chain relies heavily on Mexican manufacturing hubs operating under IATF 16949 accreditation:\n\n| Component / Subsystem | Key Mexican Manufacturing States | Industry Standards & Customers |\n|-----------------------|----------------------------------|--------------------------------|\n| High-Voltage Harnesses | Chihuahua, Sonora, Coahuila | US-CAR / IPC-WHMA-A-620 Standards |\n| Battery Pack Enclosures | Nuevo León, Saltillo | Aluminum Extrusion & Laser Sealing |\n| Inverters & Power Modules | Querétaro, San Luis Potosí | Automotive ISO 26262 ASIL-D |\n| Stamping & Chassis Frame | Aguascalientes, Guanajuato | High-Strength Steel & Gigacasting |\n\n---\n\n> **Key Takeaway**: EV manufacturing merges electrochemical precision with heavy robotic assembly under **IATF 16949** and **ISO 26262** standards. Understanding these five assembly phases and Mexico's nearshoring corridor provides engineers with a competitive edge in global automotive careers.\n",
                        "vocabulary": [
                            {
                                "en": "Gigafactory",
                                "es": "Gigafábrica",
                                "definition": "Massive factory dedicated to battery production"
                            },
                            {
                                "en": "Electrode",
                                "es": "Electrodo",
                                "definition": "Cathode or anode component of a battery cell"
                            },
                            {
                                "en": "Calendering",
                                "es": "Calandrado",
                                "definition": "Compressing electrode coating to precise thickness"
                            },
                            {
                                "en": "Formation",
                                "es": "Formación",
                                "definition": "First charge/discharge cycle to activate a battery cell"
                            },
                            {
                                "en": "Bus Bar",
                                "es": "Barra Colectora",
                                "definition": "Thick copper connector linking battery cells"
                            },
                            {
                                "en": "E-Axle",
                                "es": "Eje Eléctrico",
                                "definition": "Integrated unit: motor + inverter + reduction gear"
                            },
                            {
                                "en": "Body-in-White",
                                "es": "Carrocería en Blanco",
                                "definition": "Welded car body before painting"
                            },
                            {
                                "en": "Marriage (assembly)",
                                "es": "Matrimonio (ensamble)",
                                "definition": "Joining battery pack to vehicle body"
                            },
                            {
                                "en": "ADAS",
                                "es": "ADAS (Asistencia Avanzada)",
                                "definition": "Advanced Driver Assistance Systems"
                            },
                            {
                                "en": "Dyno Testing",
                                "es": "Prueba en Dinamómetro",
                                "definition": "Testing vehicle performance on rollers"
                            },
                            {
                                "en": "Laser Welding",
                                "es": "Soldadura Láser",
                                "definition": "High-precision joining using focused light"
                            },
                            {
                                "en": "Slurry",
                                "es": "Pasta / Suspensión",
                                "definition": "Wet mixture of active materials applied to metal foil"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is a gigafactory?",
                                "options": [
                                    "A very large car",
                                    "A type of battery",
                                    "A massive factory dedicated to battery cell production",
                                    "A brand name"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is the 'marriage' in EV assembly?",
                                "options": [
                                    "Two robots getting paired",
                                    "Joining the battery pack to the vehicle body from below",
                                    "Painting the car",
                                    "Installing the seats"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is calendering in battery manufacturing?",
                                "options": [
                                    "Compressing electrode coating to precise thickness using rollers",
                                    "Cutting the battery into strips",
                                    "Testing the battery at high temperature",
                                    "Welding cells together"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "Which EV components are manufactured in Chihuahua and Sonora?",
                                "options": [
                                    "Wiring harnesses",
                                    "Complete batteries",
                                    "Car bodies",
                                    "Tires"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m6",
                "title": "BMS: Battery Management Systems",
                "titleES": "Sistemas de Gestión de Baterías (BMS)",
                "icon": "fa-solid fa-microchip",
                "readings": [
                    {
                        "id": "ev-m6-r1",
                        "title": "The Brain of the Battery: How BMS Works",
                        "duration": "10 min",
                        "content": "\n# The Brain of the Battery: How BMS Works\n\nA Battery Management System (BMS) is the electronic controller that monitors and manages every aspect of a battery pack. Without a BMS, lithium-ion batteries would be dangerous and unreliable.\n\n## Why BMS Is Critical\n\nLithium-ion batteries operate within narrow safety margins:\n- **Overcharging** (above ~4.2V per cell) → thermal runaway risk\n- **Over-discharging** (below ~2.5V) → permanent damage\n- **Overheating** (above ~60°C) → accelerated degradation\n- **Overcooling** (below -20°C) → lithium plating risk\n\n## Core Functions\n\n### 1. Cell Voltage Monitoring\nMeasures **every individual cell's** voltage. Can reduce power or disconnect battery via **contactors** if limits exceeded.\n\n### 2. Temperature Monitoring\nControls liquid cooling circuits, heating elements, and fans to maintain optimal temperature.\n\n### 3. State of Charge (SoC) Estimation\nThe battery's \"fuel gauge.\" Estimated using **coulomb counting** (tracking current flow), voltage-based estimation, and **Kalman filtering** (advanced algorithm).\n\n### 4. State of Health (SoH)\nTracks capacity loss over time. A new 77 kWh battery might hold only 65 kWh after 5 years. Used for warranty claims and used car valuations.\n\n### 5. Cell Balancing\n- **Passive balancing**: Excess energy dissipated as heat (simple, wastes energy)\n- **Active balancing**: Energy transferred between cells (efficient, expensive)\n\n### 6. Communication\nBMS communicates via **CAN bus** protocol with the vehicle control unit, motor inverter, charger, and dashboard.\n\n## BMS Architecture Types\n- **Centralized**: One controller, all cells wired to it (small packs)\n- **Distributed**: Small boards per module reporting to master (most EVs)\n- **Modular**: Each module has full BMS (buses, commercial vehicles)\n\n---\n\n> **Key Takeaway**: The BMS monitors voltage, temperature, charge state, and health of every cell. It is the most critical electronic system in an EV.\n",
                        "vocabulary": [
                            {
                                "en": "BMS (Battery Management System)",
                                "es": "Sistema de Gestión de Baterías",
                                "definition": "Electronic controller monitoring all battery functions"
                            },
                            {
                                "en": "State of Charge (SoC)",
                                "es": "Estado de Carga",
                                "definition": "Percentage of battery energy remaining"
                            },
                            {
                                "en": "State of Health (SoH)",
                                "es": "Estado de Salud",
                                "definition": "Remaining capacity vs. original capacity"
                            },
                            {
                                "en": "Cell Balancing",
                                "es": "Balanceo de Celdas",
                                "definition": "Equalizing energy across cells in a pack"
                            },
                            {
                                "en": "Contactor",
                                "es": "Contactor",
                                "definition": "High-voltage relay that connects/disconnects battery"
                            },
                            {
                                "en": "Coulomb Counting",
                                "es": "Conteo de Coulombs",
                                "definition": "Tracking current flow to estimate charge level"
                            },
                            {
                                "en": "Thermal Runaway",
                                "es": "Fuga Térmica",
                                "definition": "Uncontrolled temperature rise causing battery failure"
                            },
                            {
                                "en": "Lithium Plating",
                                "es": "Deposición de Litio",
                                "definition": "Metallic lithium forming on anode in cold conditions"
                            },
                            {
                                "en": "CAN Bus",
                                "es": "Bus CAN",
                                "definition": "Communication protocol between vehicle systems"
                            },
                            {
                                "en": "Passive Balancing",
                                "es": "Balanceo Pasivo",
                                "definition": "Wasting excess energy as heat to equalize cells"
                            },
                            {
                                "en": "Active Balancing",
                                "es": "Balanceo Activo",
                                "definition": "Transferring energy between cells to equalize them"
                            },
                            {
                                "en": "ISO 26262",
                                "es": "ISO 26262",
                                "definition": "Functional safety standard for automotive electronics"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What happens if a lithium-ion cell is overcharged?",
                                "options": [
                                    "It charges faster",
                                    "It lasts longer",
                                    "It can cause thermal runaway and fire",
                                    "Nothing"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is State of Charge (SoC)?",
                                "options": [
                                    "The percentage of battery energy remaining",
                                    "The total capacity of the battery",
                                    "The temperature of the battery",
                                    "The voltage of the motor"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What is the difference between passive and active cell balancing?",
                                "options": [
                                    "They are the same",
                                    "Passive wastes excess energy as heat; active transfers energy between cells",
                                    "Passive is more expensive",
                                    "Active uses no electricity"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which protocol does the BMS use to communicate with the vehicle?",
                                "options": [
                                    "Wi-Fi",
                                    "Bluetooth",
                                    "CAN Bus",
                                    "USB"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m7",
                "title": "Regenerative Braking and Energy Recovery",
                "titleES": "Frenado Regenerativo y Recuperación de Energía",
                "icon": "fa-solid fa-bolt",
                "readings": [
                    {
                        "id": "ev-m7-r1",
                        "title": "Turning Braking into Range",
                        "duration": "10 min",
                        "content": "\n> **Automotive Standards Note**: Regenerative braking and torque vectoring systems in electric vehicles are engineered under **SAE J3012** (Energy Recovery Testing Standards) and **ISO 26262 ASIL-D** brake-by-wire functional safety requirements.\n\n# Turning Braking into Range: Regenerative Braking Engineering\n\nOne of the most elegant engineering breakthroughs of electric powertrains is **regenerative braking** — an active energy recovery mechanism that transforms momentum back into chemical energy stored within the battery pack.\n\n## Electromagnetic Physics & Energy Conversion Dynamics\n\nRegenerative braking relies on **Faraday's Law of Electromagnetic Induction** and **Lenz's Law**. When a driver lifts their foot off the accelerator or depresses the brake pedal:\n\n1. **Inverter Phase Switching**: The Silicon Carbide (SiC) inverter adjusts the pulse-width modulation (PWM) signals to shift stator magnetic field phase angles behind rotor rotation.\n2. **Kinetic Energy Conversion**: The spinning vehicle wheels turn the permanent-magnet rotor inside the electric motor, transforming the motor into a three-phase AC generator.\n3. **Rectification & High-Voltage Charging**: The generated AC electricity flows back through the inverter bridge diodes, rectifying into DC current to recharge the high-voltage battery at rates up to 250 kW.\n4. **Counter-Electromotive Force (Back-EMF)**: Magnetic drag created inside the motor generates smooth, controllable retarding torque to decelerate the vehicle without mechanical friction.\n\n## One-Pedal Driving & Brake-by-Wire Integration\n\nModern EVs integrate advanced **Brake-by-Wire (BbW)** hydraulic units to execute **Blended Braking**:\n\n- **Deceleration Decoupling**: The brake pedal is not mechanically connected to the hydraulic calipers during normal deceleration. An electronic pedal simulator measures driver force and sends requests to the Vehicle Control Unit (VCU).\n- **Smooth Torque Blending**: The VCU prioritizes 100% regenerative braking up to the motor's thermal and charge acceptance limits. Friction brakes engage seamlessly only when additional stopping power is required.\n- **Component Longevity**: Because 80-90% of urban deceleration is handled electromagnetically, friction brake pads experience up to **80% less mechanical wear**, extending maintenance cycles to over 150,000 kilometers.\n\n## Energy Recovery Efficiency Across Driving Profiles\n\n| Real-World Driving Environment | Regenerative Kinetic Recovery Rate | Total EV Range Extension |\n|--------------------------------|------------------------------------|--------------------------|\n| Urban Stop-and-Go Traffic | 28% - 35% Recovery Rate | +20% to +30% Range |\n| Mountain Slope Descent | 45% - 60% Recovery Rate | +35% Potential Range |\n| High-Speed Highway Cruising | 5% - 12% Recovery Rate | +3% to +8% Range |\n\n---\n\n> **Key Takeaway**: Regenerative braking utilizes Faraday's law to convert kinetic energy into DC battery charge via inverter phase control. Governed by **ISO 26262 ASIL-D** brake-by-wire safety standards, it extends vehicle range by up to 30% and reduces mechanical brake wear.\n",
                        "vocabulary": [
                            {
                                "en": "Regenerative Braking",
                                "es": "Frenado Regenerativo",
                                "definition": "Recovery of kinetic energy as electricity during braking"
                            },
                            {
                                "en": "Electromagnetic Induction",
                                "es": "Inducción Electromagnética",
                                "definition": "Generating electricity by moving a conductor through a magnetic field"
                            },
                            {
                                "en": "One-Pedal Driving",
                                "es": "Conducción de un Solo Pedal",
                                "definition": "Driving mode where lifting the accelerator causes strong deceleration"
                            },
                            {
                                "en": "Blended Braking",
                                "es": "Frenado Combinado",
                                "definition": "Combining regenerative and friction braking seamlessly"
                            },
                            {
                                "en": "Kinetic Energy",
                                "es": "Energía Cinética",
                                "definition": "Energy of a moving object"
                            },
                            {
                                "en": "Generator Mode",
                                "es": "Modo Generador",
                                "definition": "Motor operating in reverse to produce electricity"
                            },
                            {
                                "en": "Friction Braking",
                                "es": "Frenado por Fricción",
                                "definition": "Traditional brakes using pads pressing against rotors"
                            },
                            {
                                "en": "Regen Limit",
                                "es": "Límite de Regeneración",
                                "definition": "When the battery cannot accept regenerative energy"
                            },
                            {
                                "en": "Faraday's Law",
                                "es": "Ley de Faraday",
                                "definition": "Physical law governing electromagnetic induction"
                            },
                            {
                                "en": "Brake Pad",
                                "es": "Pastilla de Freno",
                                "definition": "Component that presses against the rotor to create friction"
                            }
                        ],
                        "questions": [
                            {
                                "q": "How does regenerative braking work?",
                                "options": [
                                    "It uses extra gasoline",
                                    "The motor acts as a generator, converting kinetic energy back to electricity",
                                    "It uses solar panels",
                                    "It adds weight to the car"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is one-pedal driving?",
                                "options": [
                                    "Strong regenerative braking that decelerates the car when you lift the accelerator",
                                    "Driving with only one foot",
                                    "A car with one pedal",
                                    "Emergency braking"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "How much extra range does regenerative braking typically add?",
                                "options": [
                                    "50-80%",
                                    "15-25%",
                                    "1-2%",
                                    "100%"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "When is regenerative braking limited?",
                                "options": [
                                    "When driving uphill",
                                    "When the battery is full, very cold, or the BMS limits charging",
                                    "When the car is new",
                                    "Never"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m8",
                "title": "Thermal Management in Electric Vehicles",
                "titleES": "Gestión Térmica en Vehículos Eléctricos",
                "icon": "fa-solid fa-temperature-high",
                "readings": [
                    {
                        "id": "ev-m8-r1",
                        "title": "Keeping the Battery at the Right Temperature",
                        "duration": "10 min",
                        "content": "\n> **EV Thermal Safety Standard Note**: Automotive Thermal Management Systems (BTMS) are designed according to **SAE J2990** (Hybrid and EV Emergency Response & Thermal Mitigation) and **UL 2580** (Batteries for Use in Electric Vehicles) to guarantee thermal runaway containment.\n\n# Thermal Management Engineering in Electric Powertrains\n\nTemperature is a lithium-ion battery's most critical operational constraint. **Battery Thermal Management Systems (BTMS)** regulate electrochemical temperatures to ensure cell longevity, ultrafast charging capability, and occupant safety.\n\n## The Electrochemical Temperature Spectrum (The 15-35°C Window)\n\n| Operational Temperature Zone | Electrochemical Reaction Behavior | System Risk & Degradation Mechanism |\n|------------------------------|-----------------------------------|------------------------------------|\n| Below -20°C | High electrolyte viscosity & internal impedance | **Lithium Plating**: Metallic dendrites short-circuit separator |\n| -10°C to 15°C | Reduced ion mobility | Slower DC fast charging & 20-35% cabin range drop |\n| **15°C to 35°C** | **Optimal Intercalation Kinetics** | **Peak Efficiency, Maximum Cycle Life & Full Power** |\n| 35°C to 45°C | Accelerated SEI layer growth | Solid Electrolyte Interphase breakdown & capacity fade |\n| Above 60°C | Exothermic chemical decomposition | **Thermal Runaway Risk**: Gas generation & cell vent fire |\n\n## Thermal Management Architecture & Fluid Dynamics\n\n### 1. Indirect Liquid Cooling (Industry Benchmark)\nA closed-loop **water-glycol (50/50 mixture)** circuit circulates through aluminum cooling plates with micro-channels integrated directly below cell modules:\n- **Chiller Heat Exchanger**: Couples the battery cooling loop with the vehicle's HVAC refrigeration loop to chill coolant below ambient outdoor temperature during 350 kW DC fast charging.\n- **PTC Heaters & Heat Pumps**: High-voltage Positive Temperature Coefficient (PTC) heaters warm coolant to precondition batteries before fast charging in freezing climates.\n\n### 2. Heat Pump Thermodynamic Systems (Vapor Injection)\nModern EVs use multi-way valve heat pumps with Coefficient of Performance (COP) ratings between **2.5 and 4.0**. By extracting ambient energy and waste heat from the motor inverter, heat pumps consume up to **75% less battery power** for cabin heating compared to resistive heaters.\n\n### 3. Direct Immersion Cooling (Next-Gen High Performance)\nCells are completely submerged in non-conductive, dielectric synthetic fluids (e.g., fluorinated hydrocarbons). Immersion cooling delivers **10× higher heat transfer coefficients** than cold plates, enabling 0-80% ultra-fast charging in under 8 minutes without localized hot spots.\n\n---\n\n> **Key Takeaway**: BTMS maintains battery temperature within 15-35°C using liquid cooling plates, heat pumps, and dielectric fluids. Compliant with **SAE J2990** and **UL 2580**, effective thermal engineering prevents degradation and thermal runaway risks.\n",
                        "vocabulary": [
                            {
                                "en": "Thermal Management",
                                "es": "Gestión Térmica",
                                "definition": "Controlling temperature of EV components"
                            },
                            {
                                "en": "Coolant",
                                "es": "Refrigerante",
                                "definition": "Liquid (water-glycol) circulating to absorb heat"
                            },
                            {
                                "en": "Radiator",
                                "es": "Radiador",
                                "definition": "Heat exchanger that dissipates heat to the air"
                            },
                            {
                                "en": "Chiller",
                                "es": "Enfriador",
                                "definition": "Refrigeration unit that cools liquid below ambient temperature"
                            },
                            {
                                "en": "Heat Pump",
                                "es": "Bomba de Calor",
                                "definition": "Efficient device extracting heat from air for heating"
                            },
                            {
                                "en": "Battery Preconditioning",
                                "es": "Preacondicionamiento de Batería",
                                "definition": "Warming battery before fast charging"
                            },
                            {
                                "en": "Dielectric Fluid",
                                "es": "Fluido Dieléctrico",
                                "definition": "Non-conductive liquid used in immersion cooling"
                            },
                            {
                                "en": "Lithium Plating",
                                "es": "Deposición de Litio",
                                "definition": "Dangerous metallic lithium forming on anode in cold"
                            },
                            {
                                "en": "Thermal Runaway",
                                "es": "Fuga Térmica",
                                "definition": "Uncontrolled temperature chain reaction"
                            },
                            {
                                "en": "Degradation",
                                "es": "Degradación",
                                "definition": "Gradual loss of battery capacity over time"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the optimal temperature range for lithium-ion batteries?",
                                "options": [
                                    "-10°C to 0°C",
                                    "0°C to 10°C",
                                    "15°C to 35°C",
                                    "45°C to 60°C"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is battery preconditioning?",
                                "options": [
                                    "Replacing the battery",
                                    "Warming the battery to optimal temperature before fast charging",
                                    "Testing the battery",
                                    "Draining the battery"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is cold weather problematic for EVs?",
                                "options": [
                                    "The motor freezes",
                                    "The battery loses range, charges slowly, and risks lithium plating",
                                    "The tires deflate",
                                    "The paint cracks"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What advantage does a heat pump have over resistive heaters?",
                                "options": [
                                    "It is cheaper to install",
                                    "It uses 2-3× less energy for the same heating effect",
                                    "It works without electricity",
                                    "It only works in summer"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m9",
                "title": "High-Voltage Safety Protocols",
                "titleES": "Protocolos de Seguridad de Alto Voltaje",
                "icon": "fa-solid fa-triangle-exclamation",
                "readings": [
                    {
                        "id": "ev-m9-r1",
                        "title": "Working Safely with High-Voltage Systems",
                        "duration": "10 min",
                        "content": "\n# Working Safely with High-Voltage Systems\n\nElectric vehicles operate at **400-800 volts DC** — enough to cause **fatal electrocution**. Working on HV systems requires specialized training and strict safety protocols.\n\n## Understanding the Danger\n\nAt 400V with wet skin (10,000 ohms): Current = 400/10,000 = **40 mA** — in the lethal zone.\n\n| Current | Effect on Human Body |\n|---------|---------------------|\n| 1 mA | Slight tingling |\n| 10-20 mA | Can't let go (muscular contraction) |\n| 50-100 mA | **Ventricular fibrillation (potentially fatal)** |\n| 100+ mA | Cardiac arrest, severe burns |\n\n## The Color Code: Orange = High Voltage\n\nAll high-voltage cables, connectors, and components are marked with **bright orange** covers (ISO 6722). If you see orange cables, STOP and verify the system is de-energized.\n\n## De-Energization: Lockout/Tagout (LOTO)\n\n1. **Turn off** the vehicle, remove key\n2. **Disconnect 12V** auxiliary battery\n3. **Remove service disconnect plug** (breaks HV circuit)\n4. **Wait 5-10 minutes** for capacitors to discharge\n5. **Verify zero voltage** with Category III/IV rated multimeter\n6. **Apply lockout/tagout** — lock and warning tag on disconnect\n\n## Personal Protective Equipment (PPE)\n\n| PPE | Spec | Purpose |\n|-----|------|---------|\n| Insulated HV gloves | Class 0 (1,000V) | Hand protection |\n| Leather protectors | Over insulated gloves | Mechanical protection |\n| Safety glasses | Impact-rated | Eye protection |\n| Insulated tools | IEC 60900 (1,000V) | Prevent shorts |\n| Insulated floor mat | HV-rated rubber | Prevent ground path |\n\n## ISO 26262 and ASIL Levels\n\n**ISO 26262** defines ASIL levels A (lowest) to D (highest risk):\n- Battery disconnect: **ASIL D** (most critical)\n- Charging control: **ASIL C**\n- Dashboard warnings: **ASIL B**\n\n---\n\n> **Key Takeaway**: EV high-voltage systems (400-800V) are lethal. Orange = HV. Always follow LOTO procedures and wear rated PPE. ISO 26262 governs functional safety.\n",
                        "vocabulary": [
                            {
                                "en": "High Voltage (HV)",
                                "es": "Alto Voltaje (AV)",
                                "definition": "Electrical systems above 60V DC or 30V AC"
                            },
                            {
                                "en": "Electrocution",
                                "es": "Electrocución",
                                "definition": "Injury or death from electric shock"
                            },
                            {
                                "en": "Lockout/Tagout (LOTO)",
                                "es": "Bloqueo/Etiquetado",
                                "definition": "Procedure to ensure HV systems are safely de-energized"
                            },
                            {
                                "en": "Service Disconnect",
                                "es": "Desconexión de Servicio",
                                "definition": "Physical plug that breaks the HV circuit"
                            },
                            {
                                "en": "Multimeter",
                                "es": "Multímetro",
                                "definition": "Instrument measuring voltage, current, resistance"
                            },
                            {
                                "en": "PPE",
                                "es": "EPP (Equipo de Protección Personal)",
                                "definition": "Safety gear worn by workers"
                            },
                            {
                                "en": "Arc Flash",
                                "es": "Arco Eléctrico",
                                "definition": "Explosion of energy from an electrical fault"
                            },
                            {
                                "en": "ASIL",
                                "es": "Nivel de Integridad de Seguridad Automotriz",
                                "definition": "Risk classification under ISO 26262"
                            },
                            {
                                "en": "Contactor",
                                "es": "Contactor",
                                "definition": "High-voltage relay in the battery system"
                            },
                            {
                                "en": "Ventricular Fibrillation",
                                "es": "Fibrilación Ventricular",
                                "definition": "Lethal irregular heartbeat caused by electric shock"
                            },
                            {
                                "en": "Rescue Sheet",
                                "es": "Hoja de Rescate",
                                "definition": "Document showing first responders safe cut zones"
                            },
                            {
                                "en": "Capacitor Discharge",
                                "es": "Descarga de Capacitor",
                                "definition": "Waiting for stored electrical charge to dissipate"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What color identifies high-voltage cables in EVs?",
                                "options": [
                                    "Red",
                                    "Blue",
                                    "Orange",
                                    "Green"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is the first step in de-energizing an EV?",
                                "options": [
                                    "Turn off the vehicle and remove the key",
                                    "Cut the orange cables",
                                    "Open the hood",
                                    "Call the fire department"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "How much current is potentially lethal?",
                                "options": [
                                    "1,000 mA",
                                    "50-100 mA can cause ventricular fibrillation",
                                    "Only above 10 amps",
                                    "Any amount is safe"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is ASIL D under ISO 26262?",
                                "options": [
                                    "The lowest safety level",
                                    "The highest safety integrity level for the most critical systems",
                                    "A battery chemistry",
                                    "A type of insulated glove"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "ev-m10",
                "title": "Mexico's EV Industry and Career Paths",
                "titleES": "La Industria EV de México y Trayectorias Profesionales",
                "icon": "fa-solid fa-road",
                "readings": [
                    {
                        "id": "ev-m10-r1",
                        "title": "Mexico's Electromobility Landscape",
                        "duration": "10 min",
                        "content": "\n# Mexico's Electromobility Landscape\n\nMexico is at the center of a historic automotive transformation. As the world's seventh-largest vehicle producer and Latin America's largest, Mexico's EV transition is essential for the country's economic future.\n\n## Current Landscape (2025-2026)\n\n- Electrified vehicles account for ~**12.5%** of Mexico's light vehicle sales\n- BYD, Tesla, MG (SAIC), and JAC are leading EV brands\n- Mexico produces ~**4 million vehicles** per year with 28 assembly plants and 900+ suppliers\n\n## The Nearshoring Opportunity\n\nThe **USMCA (T-MEC)** requires 75% regional content for duty-free vehicles. This creates massive incentives for EV component manufacturing in Mexico:\n\n| Component | Nearshoring Potential | Key States |\n|-----------|----------------------|------------|\n| Battery module assembly | High | Nuevo León, Coahuila |\n| Wiring harnesses | Very High | Chihuahua, Sonora |\n| Power electronics | Growing | Querétaro, Puebla |\n| Electric motor assembly | Medium | Guanajuato, EdoMex |\n| Charging equipment | Emerging | Jalisco, Nuevo León |\n\n## Career Paths\n\n### 1. Battery Technician\nAssembles, tests, and repairs battery packs. Requires HV safety training (ISO 26262). Salary: MXN $15,000-25,000/month.\n\n### 2. EV Manufacturing Engineer\nDesigns and optimizes assembly line processes. Works with robots and welding systems. Salary: MXN $30,000-55,000/month.\n\n### 3. Charging Infrastructure Technician\nInstalls and maintains Level 2 and DC fast charging stations. Requires NOM-001-SEDE and NACS knowledge. Fast-growing field.\n\n### 4. BMS Software Engineer\nDevelops firmware for Battery Management Systems in C/C++. Works with CAN bus and ISO 26262. Salary: MXN $45,000-80,000/month.\n\n### 5. Quality Control Specialist\nApplies IATF 16949 (automotive quality), tests with SPC and X-ray inspection. Ensures NACS compliance.\n\n## The Importance of Technical English\n\nIn Mexico's EV sector, **English is the operational language**: all quality documentation, machine interfaces, SOPs, and global video conferences are in English. Technical certifications (SAE, ISO, IPC) are administered in English.\n\n---\n\n> **Key Takeaway**: Mexico's automotive industry is transitioning to EV manufacturing. Nearshoring and USMCA create thousands of new jobs. Technical English is the key skill separating entry-level workers from global specialists.\n",
                        "vocabulary": [
                            {
                                "en": "USMCA",
                                "es": "T-MEC",
                                "definition": "US-Mexico-Canada trade agreement (successor to NAFTA)"
                            },
                            {
                                "en": "Tier 1 Supplier",
                                "es": "Proveedor Nivel 1",
                                "definition": "Company that supplies directly to automakers"
                            },
                            {
                                "en": "IATF 16949",
                                "es": "IATF 16949",
                                "definition": "Automotive quality management standard"
                            },
                            {
                                "en": "NOM",
                                "es": "NOM (Norma Oficial Mexicana)",
                                "definition": "Mexican official technical standard"
                            },
                            {
                                "en": "Firmware",
                                "es": "Firmware",
                                "definition": "Low-level software controlling electronic hardware"
                            },
                            {
                                "en": "SPC",
                                "es": "Control Estadístico de Procesos",
                                "definition": "Using statistics to monitor manufacturing quality"
                            },
                            {
                                "en": "SOP",
                                "es": "Procedimiento Operativo Estándar",
                                "definition": "Step-by-step work instruction"
                            },
                            {
                                "en": "Charging Infrastructure",
                                "es": "Infraestructura de Carga",
                                "definition": "Network of EV charging stations"
                            },
                            {
                                "en": "Regional Content",
                                "es": "Contenido Regional",
                                "definition": "Percentage of vehicle parts made in USMCA region"
                            },
                            {
                                "en": "Duty-Free",
                                "es": "Libre de Aranceles",
                                "definition": "Exempt from import taxes"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What trade agreement creates incentives for EV manufacturing in Mexico?",
                                "options": [
                                    "NAFTA",
                                    "USMCA (T-MEC)",
                                    "EU Free Trade",
                                    "OPEC"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What percentage of vehicle sales in Mexico are electrified (2026)?",
                                "options": [
                                    "50%",
                                    "1%",
                                    "Approximately 12.5%",
                                    "90%"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which Mexican states lead in wiring harness manufacturing?",
                                "options": [
                                    "Chihuahua and Sonora",
                                    "Quintana Roo and Yucatán",
                                    "Oaxaca and Chiapas",
                                    "Mexico City"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "Why is technical English critical in Mexico's EV industry?",
                                "options": [
                                    "Mexican laws require it",
                                    "All quality documentation, machine interfaces, and global communications are in English",
                                    "English is Mexico's official language",
                                    "It's not important"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            }
        ],
        "category": "engineering"
    },
    "aerospace": {
        "id": "aerospace",
        "title": "Manufactura Aeronáutica",
        "titleEN": "Aerospace Manufacturing",
        "level": "A2-B1",
        "status": "full",
        "description": "English for aerospace manufacturing — composite materials, precision machining, quality assurance, and Mexico's aerospace corridor.",
        "descriptionES": "Inglés para manufactura aeronáutica — materiales compuestos, maquinado de precisión, aseguramiento de calidad y el corredor aeroespacial de México.",
        "totalModules": 9,
        "estimatedHours": 18,
        "prerequisites": [
            "esp-foundation",
            "semiconductors"
        ],
        "standard": "AS9100D",
        "conocer": "EC0892 (Manufactura Aeroespacial de Precisión)",
        "ngss": "HS-PS2-1 (Forces & Aerodynamics)",
        "industry": "AS9100D / NADCAP / NAS 410 / FEMIA",
        "modules": [
            {
                "id": "aero-m1",
                "title": "Introduction to Aerospace Engineering",
                "titleES": "Introducción a la Ingeniería Aeroespacial",
                "icon": "fa-solid fa-plane-up",
                "readings": [
                    {
                        "id": "aero-m1-r1",
                        "title": "The Aerospace Supply Chain: From OEM to Tier 3",
                        "duration": "10 min",
                        "content": "\n# The Aerospace Supply Chain: From OEM to Tier 3\n\nThe aerospace industry is one of the most complex and regulated manufacturing sectors in the world. Every commercial aircraft contains approximately **4 million parts** from thousands of suppliers across dozens of countries. Understanding the supply chain structure is essential for anyone entering this industry.\n\n## The Supply Chain Pyramid\n\n### OEM — Original Equipment Manufacturer\nThe companies that design, certify, and assemble complete aircraft. There are only a handful of major OEMs:\n- **Airbus** (European) — A320neo, A350, A380\n- **Boeing** (American) — 737 MAX, 787 Dreamliner, 777X\n- **Embraer** (Brazilian) — E-Jets for regional aviation\n- **COMAC** (Chinese) — C919 (new competitor)\n\n### Tier 1 — Major Systems Integrators\nCompanies that build complete **systems** delivered to OEMs:\n- **Safran** — engines (LEAP), landing gear, nacelles\n- **Collins Aerospace** (RTX) — avionics, interiors, mechanical systems\n- **Spirit AeroSystems** — fuselages, wings\n- **GE Aerospace** — jet engines (GE90, GEnx, CFM LEAP)\n\n### Tier 2 — Sub-assembly Manufacturers\nProduce **sub-assemblies and major components**: turbine blades, actuators, flight control surfaces, hydraulic systems.\n\n### Tier 3 — Parts and Materials Suppliers\nManufacture **individual parts and raw materials**: machined brackets, fasteners, composite panels, specialty metals. **This is where most Mexican aerospace factories operate.**\n\n## Aerospace vs. Automotive: Key Differences\n\n| Factor | Automotive | Aerospace |\n|--------|-----------|-----------|\n| Production volume | Millions per year | Hundreds per year |\n| Tolerance | ±0.1 mm typical | ±0.01 mm or tighter |\n| Quality standard | IATF 16949 | **AS9100D** |\n| Part traceability | Batch level | **Individual serial number** |\n| Certification cycle | Months | **Years** (FAA/EASA approval) |\n| Material cost | Low-moderate | Very high (titanium, composites) |\n\n## Mexico's Aerospace Position\n\nMexico is the **12th largest** aerospace manufacturer globally and **#1 in Latin America**:\n- **400+ aerospace companies** operating in Mexico\n- **US$11+ billion** in annual aerospace exports (2024)\n- **80%** of exports go to the United States\n- **FEMIA** (Federación Mexicana de la Industria Aeroespacial) coordinates the industry\n\nKey aerospace clusters: **Querétaro** (manufacturing + MRO), **Sonora** (engine components), **Baja California** (largest cluster by companies), **Chihuahua** (engineering + composites), **Nuevo León** (CNC machining).\n\n---\n\n> **Key Takeaway**: The aerospace supply chain is a pyramid from OEMs to Tier 3 suppliers. Mexico operates primarily at Tier 2-3, with 400+ companies exporting $11B+ annually. AS9100D is the required quality standard.\n",
                        "vocabulary": [
                            {
                                "en": "OEM (Original Equipment Manufacturer)",
                                "es": "Fabricante de Equipo Original",
                                "definition": "Company that designs and assembles the final aircraft"
                            },
                            {
                                "en": "Tier 1 Supplier",
                                "es": "Proveedor de Nivel 1",
                                "definition": "Major company supplying complete systems to OEMs"
                            },
                            {
                                "en": "Tier 2/3 Supplier",
                                "es": "Proveedor de Nivel 2/3",
                                "definition": "Companies making sub-assemblies or individual parts"
                            },
                            {
                                "en": "AS9100D",
                                "es": "AS9100D",
                                "definition": "International aerospace quality management standard"
                            },
                            {
                                "en": "Traceability",
                                "es": "Trazabilidad",
                                "definition": "Ability to track every part back to its origin"
                            },
                            {
                                "en": "Tolerance",
                                "es": "Tolerancia",
                                "definition": "Acceptable range of variation in dimensions"
                            },
                            {
                                "en": "MRO",
                                "es": "MRO (Mantenimiento, Reparación y Revisión)",
                                "definition": "Maintenance, Repair, and Overhaul of aircraft"
                            },
                            {
                                "en": "Nacelle",
                                "es": "Nacela / Góndola",
                                "definition": "Housing that covers an aircraft engine"
                            },
                            {
                                "en": "Fuselage",
                                "es": "Fuselaje",
                                "definition": "Main body of an aircraft"
                            },
                            {
                                "en": "FAA",
                                "es": "FAA (Administración Federal de Aviación)",
                                "definition": "US aviation safety authority"
                            },
                            {
                                "en": "EASA",
                                "es": "EASA (Agencia Europea de Seguridad Aérea)",
                                "definition": "European aviation safety authority"
                            },
                            {
                                "en": "FEMIA",
                                "es": "FEMIA",
                                "definition": "Mexican Federation of the Aerospace Industry"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What quality standard is required in aerospace manufacturing?",
                                "options": [
                                    "ISO 9001",
                                    "IATF 16949",
                                    "AS9100D",
                                    "Six Sigma"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "At which tier do most Mexican aerospace factories operate?",
                                "options": [
                                    "OEM level",
                                    "Tier 1",
                                    "Tier 2-3 (parts and sub-assemblies)",
                                    "They don't participate"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "How do aerospace tolerances compare to automotive?",
                                "options": [
                                    "They are the same",
                                    "Aerospace is less precise",
                                    "Aerospace requires much tighter tolerances (±0.01mm vs ±0.1mm)",
                                    "Automotive is more precise"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is FEMIA?",
                                "options": [
                                    "A type of aircraft",
                                    "The Mexican Federation of the Aerospace Industry",
                                    "A certification standard",
                                    "A manufacturing process"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m2",
                "title": "Materials Science: Composites and Alloys",
                "titleES": "Ciencia de Materiales: Compuestos y Aleaciones",
                "icon": "fa-solid fa-atom",
                "readings": [
                    {
                        "id": "aero-m2-r1",
                        "title": "Aerospace Materials: From Aluminum to Carbon Fiber",
                        "duration": "10 min",
                        "content": "\n> **Aerospace Materials Standard Note**: Structural aerospace materials and heat-treatment specifications are certified according to **AMS** (Aerospace Material Specifications), **ASTM E8** (Tension Testing of Metallic Materials), and **NADCAP** (Special Processes) standards.\n\n# Aerospace Materials Engineering: Composites, Superalloys, & AMS Specifications\n\nAerospace structural design centers on a singular engineering objective: **maximizing specific strength ($\text{MPa}/(\text{g/cm}^3)$)** while guaranteeing zero structural failure across 30,000+ flight pressurization cycles.\n\n## 1. Advanced Aerospace Metallic Alloys\n\n- **Aluminum-Lithium Alloys (2024-T3 / 7075-T6 / Al-Li 2060)**: Al-Li substitution reduces density by 3% while increasing elastic modulus by 6%. Extensively used in wing spars and fuselage stringers under **AMS 4027**.\n- **Titanium Alloys (Ti-6Al-4V / AMS 4928)**: High specific strength and thermal tolerance up to 400°C. Used in high-load structural fittings, pylon attachments, and landing gear cylinders. Titanium avoids galvanic corrosion when joined with carbon fiber.\n- **Nickel-Based Superalloys (Inconel 718 / Rene 41)**: Retains mechanical tensile strength above **1,000°C** inside jet engine combustors and turbine blades under **AMS 5662**. Single-crystal directional solidification casting eliminates grain boundaries to resist creep deformation.\n\n## 2. Composite Materials: Carbon Fiber Reinforced Polymers (CFRP)\n\nModern commercial wide-body airliners (Boeing 787 Dreamliner, Airbus A350 XWB) feature **>50% composite structures by weight**:\n\n- **Carbon Fiber Prepreg (T800 / HexPly)**: Formed via Automated Fiber Placement (AFP) or Automated Tape Laying (ATL).\n- **Autoclave Curing**: Polymerized at 180°C under 7 atm (100 psi) nitrogen pressure.\n- **NDT Quality Inspection**: Certified under Ultrasonic non-destructive testing standards.\n\n- **Prepreg Carbon Tapes**: Continuous high-modulus carbon fibers pre-impregnated with toughened epoxy resin.\n- **Autoclave Curing (ISO 14644)**: Heat and nitrogen pressure drive out microscopic air voids (<0.1% void content limit), cross-linking polymer chains to yield lightweight structural panels stronger than titanium.\n\n---\n\n> **Key Takeaway**: Modern aerospace relies on **CFRP composites** for airframes and **Inconel superalloys** for jet turbines. Material fabrication and NDT testing must comply with strict **AMS** and **NADCAP** quality standards.\n",
                        "vocabulary": [
                            {
                                "en": "Composite",
                                "es": "Material Compuesto",
                                "definition": "Material made from two or more different materials"
                            },
                            {
                                "en": "CFRP",
                                "es": "Polímero Reforzado con Fibra de Carbono",
                                "definition": "Carbon fiber + epoxy resin — stronger than steel, lighter"
                            },
                            {
                                "en": "Alloy",
                                "es": "Aleación",
                                "definition": "A metal made by combining two or more elements"
                            },
                            {
                                "en": "Titanium",
                                "es": "Titanio",
                                "definition": "Strong, light, corrosion-resistant metal"
                            },
                            {
                                "en": "Superalloy",
                                "es": "Superaleación",
                                "definition": "High-performance alloy resisting extreme temperatures"
                            },
                            {
                                "en": "Fatigue Resistance",
                                "es": "Resistencia a la Fatiga",
                                "definition": "Ability to withstand repeated stress without cracking"
                            },
                            {
                                "en": "Autoclave",
                                "es": "Autoclave",
                                "definition": "Pressurized oven for curing composite materials"
                            },
                            {
                                "en": "Single Crystal",
                                "es": "Monocristal / Cristal Único",
                                "definition": "Material grown as one continuous crystal structure"
                            },
                            {
                                "en": "Strength-to-Weight Ratio",
                                "es": "Relación Resistencia-Peso",
                                "definition": "How strong a material is relative to its weight"
                            },
                            {
                                "en": "Corrosion Resistance",
                                "es": "Resistencia a la Corrosión",
                                "definition": "Ability to resist chemical degradation"
                            },
                            {
                                "en": "Epoxy Resin",
                                "es": "Resina Epóxica",
                                "definition": "Strong adhesive binding composite fibers together"
                            },
                            {
                                "en": "CMC",
                                "es": "Compuesto de Matriz Cerámica",
                                "definition": "Ceramic reinforced with fibers for extreme heat"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What percentage of a Boeing 787 is composite material (CFRP)?",
                                "options": [
                                    "10%",
                                    "25%",
                                    "About 50%",
                                    "90%"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which material is used for turbine blades that must resist 1,000°C+?",
                                "options": [
                                    "Aluminum",
                                    "Carbon fiber",
                                    "Nickel-based superalloys (single crystal)",
                                    "Plastic"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why is titanium difficult to use despite its excellent properties?",
                                "options": [
                                    "It's too heavy",
                                    "It's expensive and very hard to machine",
                                    "It melts easily",
                                    "It rusts quickly"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is CFRP?",
                                "options": [
                                    "A type of paint",
                                    "Carbon Fiber Reinforced Polymer — stronger than steel at 1/5 the weight",
                                    "A welding technique",
                                    "A quality standard"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m3",
                "title": "Precision Machining and CNC",
                "titleES": "Maquinado de Precisión y CNC",
                "icon": "fa-solid fa-cogs",
                "readings": [
                    {
                        "id": "aero-m3-r1",
                        "title": "CNC Machining for Aerospace: 5-Axis Precision",
                        "duration": "10 min",
                        "content": "\n# CNC Machining for Aerospace: 5-Axis Precision\n\n**CNC** (Computer Numerical Control) machining is the process of using computer-controlled tools to cut, drill, and shape metal or composite parts with extreme precision.\n\n## How CNC Works\n\n1. An engineer designs the part in **CAD** (Computer-Aided Design) software\n2. A programmer converts the design to **G-code** — instructions the machine understands\n3. The CNC machine executes the G-code, moving cutting tools along programmed paths\n4. The finished part is measured with a **CMM** (Coordinate Measuring Machine) to verify tolerances\n\n## Axis Systems\n\n| Type | Axes | Capability |\n|------|------|-----------|\n| **3-axis** | X, Y, Z | Simple parts, flat surfaces |\n| **4-axis** | X, Y, Z + rotation | Cylindrical parts |\n| **5-axis** | X, Y, Z + 2 rotations | **Complex 3D geometries in a single setup** |\n\n### Why 5-Axis Matters for Aerospace\n- Machine **complex curves** (turbine blades, structural ribs) in one operation\n- Reduce setups from 5-6 to **1** — fewer errors, higher precision\n- Achieve tolerances of **±0.0025 mm** (±0.0001 inches)\n- Critical for titanium parts that are expensive to re-machine\n\n## Key Machining Operations\n\n- **Milling**: Rotating cutter removes material (most common)\n- **Turning**: Part spins, tool cuts (for cylindrical parts like shafts)\n- **Drilling**: Creating holes with precise diameter and depth\n- **Boring**: Enlarging existing holes to exact dimensions\n- **EDM**: Electrical Discharge Machining — for very hard materials using electrical sparks\n\n## Tooling and Challenges with Aerospace Materials\n\n### Titanium (Ti-6Al-4V)\n- Generates extreme **heat** during cutting (low thermal conductivity)\n- Requires **carbide tooling**, high-pressure coolant, and rigid machines\n- Tool life is 3-5× shorter than cutting aluminum\n\n### Composites (CFRP)\n- Abrasive carbon fibers destroy standard tools\n- Requires **diamond-coated** or **PCD** (Polycrystalline Diamond) tools\n- Must control **delamination** (layers separating)\n\n## Quality Verification\n\nEvery aerospace part requires measurement:\n- **CMM** (Coordinate Measuring Machine): Touch probe measures 3D coordinates\n- **Laser scanning**: Non-contact measurement for complex surfaces\n- **Surface roughness tester**: Measures Ra (average surface roughness)\n\n---\n\n> **Key Takeaway**: 5-axis CNC machining enables single-setup manufacturing of complex aerospace parts at ±0.0025mm tolerance. Titanium and composites require specialized tooling and techniques.\n",
                        "vocabulary": [
                            {
                                "en": "CNC (Computer Numerical Control)",
                                "es": "Control Numérico Computarizado",
                                "definition": "Computer-controlled precision machining"
                            },
                            {
                                "en": "5-Axis Machining",
                                "es": "Maquinado de 5 Ejes",
                                "definition": "CNC with 5 degrees of movement for complex parts"
                            },
                            {
                                "en": "CAD (Computer-Aided Design)",
                                "es": "Diseño Asistido por Computadora",
                                "definition": "Software for creating 3D part designs"
                            },
                            {
                                "en": "G-code",
                                "es": "Código G",
                                "definition": "Programming language that controls CNC machines"
                            },
                            {
                                "en": "CMM",
                                "es": "Máquina de Medición por Coordenadas",
                                "definition": "Precision measurement device for 3D verification"
                            },
                            {
                                "en": "Milling",
                                "es": "Fresado",
                                "definition": "Removing material with a rotating cutting tool"
                            },
                            {
                                "en": "Turning",
                                "es": "Torneado",
                                "definition": "Machining cylindrical parts on a lathe"
                            },
                            {
                                "en": "EDM",
                                "es": "Electroerosión",
                                "definition": "Cutting hard materials using electrical sparks"
                            },
                            {
                                "en": "Delamination",
                                "es": "Delaminación",
                                "definition": "Layers of composite material separating"
                            },
                            {
                                "en": "Surface Roughness (Ra)",
                                "es": "Rugosidad Superficial",
                                "definition": "Measure of surface smoothness"
                            },
                            {
                                "en": "Carbide Tooling",
                                "es": "Herramienta de Carburo",
                                "definition": "Very hard cutting tools for tough materials"
                            },
                            {
                                "en": "Tolerance",
                                "es": "Tolerancia",
                                "definition": "Acceptable deviation from specified dimension"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What advantage does 5-axis CNC have over 3-axis?",
                                "options": [
                                    "It is cheaper",
                                    "It can machine complex 3D shapes in a single setup",
                                    "It only works with aluminum",
                                    "It is slower"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What typical tolerance can 5-axis aerospace CNC achieve?",
                                "options": [
                                    "±1 mm",
                                    "±0.5 mm",
                                    "±0.0025 mm (±0.0001 inches)",
                                    "±10 mm"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Why is titanium difficult to machine?",
                                "options": [
                                    "It is too soft",
                                    "It generates extreme heat and rapidly wears tools",
                                    "It melts at low temperatures",
                                    "It is magnetic"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is a CMM used for?",
                                "options": [
                                    "Cutting metal",
                                    "Measuring 3D coordinates of finished parts to verify tolerances",
                                    "Painting surfaces",
                                    "Welding joints"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m4",
                "title": "Avionics and Electrical Systems Integration",
                "titleES": "Integración de Aviónica y Sistemas Eléctricos",
                "icon": "fa-solid fa-microchip",
                "readings": [
                    {
                        "id": "aero-m4-r1",
                        "title": "Avionics: The Brain of the Aircraft",
                        "duration": "10 min",
                        "content": "\n# Avionics: The Brain of the Aircraft\n\n**Avionics** — a combination of \"aviation\" and \"electronics\" — encompasses all electronic systems used in aircraft. Modern jets are essentially flying computers with wings.\n\n## Core Avionics Systems\n\n| System | Function |\n|--------|----------|\n| **FMS** (Flight Management System) | Plans and manages the flight route |\n| **EFIS** (Electronic Flight Instrument System) | Digital cockpit displays (glass cockpit) |\n| **TCAS** (Traffic Collision Avoidance System) | Prevents mid-air collisions |\n| **ILS** (Instrument Landing System) | Guides landing in low visibility |\n| **Weather Radar** | Detects storms, turbulence, wind shear |\n| **Communication Systems** | VHF radio, satellite links, ACARS |\n| **Autopilot** | Automatic flight control |\n\n## Wiring and Electrical Systems\n\nA modern commercial aircraft contains:\n- **500-600 km** of wiring (enough to stretch from Querétaro to Mexico City and back — three times)\n- **100,000+ connectors**\n- **1,500+ circuit breakers**\n\n### Wire Harness Manufacturing\nThe wire harness is the \"nervous system\" of the aircraft. Mexico is one of the world's largest producers:\n- Workers follow **nail board layouts** (full-size diagrams) to route wires\n- Each wire is identified by a unique **part number** and **function code**\n- Connections are crimped, soldered, or spliced following strict standards (IPC/WHMA-A-620)\n\n## The More Electric Aircraft (MEA)\n\nTraditional aircraft use **hydraulic, pneumatic, and electrical** systems. The trend is toward **More Electric Aircraft (MEA)** — replacing hydraulic and pneumatic with electrical:\n- **Electric actuators** replace hydraulic cylinders\n- **Electric taxi systems** (eTaxi) move aircraft on ground without engines\n- **Electric Environmental Control Systems (ECS)** for cabin pressurization\n\nThe Boeing 787 pioneered this — it uses 60% more electrical power than conventional aircraft.\n\n---\n\n> **Key Takeaway**: Avionics are the electronic brain of modern aircraft. Mexico is a global leader in wire harness manufacturing. The industry is moving toward More Electric Aircraft (MEA).\n",
                        "vocabulary": [
                            {
                                "en": "Avionics",
                                "es": "Aviónica",
                                "definition": "Electronic systems used in aircraft"
                            },
                            {
                                "en": "FMS (Flight Management System)",
                                "es": "Sistema de Gestión de Vuelo",
                                "definition": "Computer managing flight routes and navigation"
                            },
                            {
                                "en": "Glass Cockpit",
                                "es": "Cabina de Cristal",
                                "definition": "Digital display-based cockpit (replacing analog gauges)"
                            },
                            {
                                "en": "Wire Harness",
                                "es": "Arnés de Cableado",
                                "definition": "Organized bundle of wires connecting aircraft systems"
                            },
                            {
                                "en": "Connector",
                                "es": "Conector",
                                "definition": "Component joining two wires or circuits"
                            },
                            {
                                "en": "Autopilot",
                                "es": "Piloto Automático",
                                "definition": "System that flies the aircraft without manual input"
                            },
                            {
                                "en": "IPC/WHMA-A-620",
                                "es": "IPC/WHMA-A-620",
                                "definition": "Industry standard for wire harness quality"
                            },
                            {
                                "en": "Circuit Breaker",
                                "es": "Interruptor de Circuito",
                                "definition": "Safety device that cuts power during overload"
                            },
                            {
                                "en": "MEA (More Electric Aircraft)",
                                "es": "Aeronave Más Eléctrica",
                                "definition": "Aircraft replacing hydraulics with electric systems"
                            },
                            {
                                "en": "Actuator",
                                "es": "Actuador",
                                "definition": "Device converting energy into physical movement"
                            },
                            {
                                "en": "Crimp",
                                "es": "Crimpar / Engarzar",
                                "definition": "Joining wire to a connector by compression"
                            },
                            {
                                "en": "TCAS",
                                "es": "Sistema de Alerta Anticolisión",
                                "definition": "System preventing mid-air collisions"
                            }
                        ],
                        "questions": [
                            {
                                "q": "How much wiring does a modern commercial aircraft contain?",
                                "options": [
                                    "50 meters",
                                    "5 km",
                                    "500-600 km",
                                    "5,000 km"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is a 'glass cockpit'?",
                                "options": [
                                    "A cockpit made of glass",
                                    "A digital display-based cockpit replacing analog gauges",
                                    "A transparent aircraft nose",
                                    "A type of windshield"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does MEA (More Electric Aircraft) mean?",
                                "options": [
                                    "Aircraft with more passengers",
                                    "Replacing hydraulic and pneumatic systems with electrical ones",
                                    "Aircraft that fly higher",
                                    "Electric-powered aircraft"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is Mexico important for wire harness manufacturing?",
                                "options": [
                                    "Mexico invented wire harnesses",
                                    "Mexico is one of the world's largest producers of aerospace wire harnesses",
                                    "Wire harnesses are not used in aerospace",
                                    "Mexico only produces automotive harnesses"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m5",
                "title": "Turbine Engine Components Manufacturing",
                "titleES": "Manufactura de Componentes de Turbinas",
                "icon": "fa-solid fa-fan",
                "readings": [
                    {
                        "id": "aero-m5-r1",
                        "title": "Inside a Jet Engine: From Fan to Nozzle",
                        "duration": "10 min",
                        "content": "\n# Inside a Jet Engine: From Fan to Nozzle\n\nA modern turbofan jet engine is one of the most complex machines ever built. The **LEAP engine** (by CFM International — a joint venture between GE and Safran) powers the majority of new narrowbody aircraft worldwide.\n\n## How a Turbofan Works\n\nAir enters the engine and is processed in stages:\n\n1. **Fan**: Large front blades draw in air. Most air (80%) bypasses the core — this \"bypass air\" generates most of the thrust.\n2. **Compressor**: Remaining air is compressed 40-50× in stages (low-pressure then high-pressure)\n3. **Combustion Chamber**: Compressed air mixes with jet fuel (Jet-A) and ignites at ~1,500°C\n4. **Turbine**: Hot gases spin turbine blades, which drive the compressor and fan via shafts\n5. **Exhaust Nozzle**: Remaining gases exit at high speed, generating additional thrust\n\n## The Most Demanding Component: Turbine Blades\n\nHigh-pressure turbine (HPT) blades operate in the most extreme conditions:\n- Temperature: **1,400-1,600°C** (above the melting point of the blade metal!)\n- Rotational speed: **10,000+ RPM**\n- Centrifugal force: Each blade experiences forces equivalent to **hanging a truck from it**\n\n### How They Survive: Single-Crystal Casting\n1. A wax model of the blade is created\n2. The wax is coated in ceramic to form a **mold**\n3. Wax is melted out (\"lost wax\" / investment casting)\n4. Molten **nickel superalloy** is poured in\n5. A **spiral grain selector** ensures only ONE crystal grows upward\n6. The blade solidifies as a single crystal — no grain boundaries = maximum creep resistance\n\n### Thermal Barrier Coatings (TBC)\nEven single-crystal blades need help. A **ceramic coating** (yttria-stabilized zirconia) is applied to insulate the metal. Combined with **internal cooling channels** (tiny passages for air), the blade surface stays 200-300°C cooler than the gas stream.\n\n## The LEAP Revolution\nThe LEAP engine introduced **3D-woven CFRP fan blades** — lighter and more durable than titanium. This is manufactured by Safran using resin transfer molding (RTM).\n\nSonora, Mexico is a key hub for turbine component manufacturing (Safran, Rolls-Royce).\n\n---\n\n> **Key Takeaway**: Turbine blades are the most extreme components in engineering — operating above their own melting point. Single-crystal casting, thermal barrier coatings, and internal cooling make this possible.\n",
                        "vocabulary": [
                            {
                                "en": "Turbofan",
                                "es": "Turbofán",
                                "definition": "Most common jet engine type — fan + gas turbine"
                            },
                            {
                                "en": "Compressor",
                                "es": "Compresor",
                                "definition": "Engine section that compresses incoming air"
                            },
                            {
                                "en": "Combustion Chamber",
                                "es": "Cámara de Combustión",
                                "definition": "Where fuel and air mix and ignite"
                            },
                            {
                                "en": "Turbine Blade",
                                "es": "Álabe / Aspa de Turbina",
                                "definition": "High-temperature rotating blade extracting energy from hot gases"
                            },
                            {
                                "en": "Single-Crystal Casting",
                                "es": "Fundición Monocristalina",
                                "definition": "Growing a blade as one crystal for maximum strength"
                            },
                            {
                                "en": "Investment Casting",
                                "es": "Fundición a la Cera Perdida",
                                "definition": "Lost-wax casting process for complex shapes"
                            },
                            {
                                "en": "Thermal Barrier Coating (TBC)",
                                "es": "Recubrimiento de Barrera Térmica",
                                "definition": "Ceramic layer insulating metal from extreme heat"
                            },
                            {
                                "en": "Bypass Ratio",
                                "es": "Relación de Derivación",
                                "definition": "Ratio of air bypassing vs entering the core"
                            },
                            {
                                "en": "Creep Resistance",
                                "es": "Resistencia al Flujo Plástico",
                                "definition": "Ability to resist deformation under sustained heat and stress"
                            },
                            {
                                "en": "Grain Boundary",
                                "es": "Límite de Grano",
                                "definition": "Interface between crystal grains — a weak point at high temperature"
                            },
                            {
                                "en": "RPM",
                                "es": "RPM (Revoluciones Por Minuto)",
                                "definition": "Rotational speed of engine components"
                            },
                            {
                                "en": "Thrust",
                                "es": "Empuje",
                                "definition": "Forward force generated by the engine"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why are turbine blades cast as single crystals?",
                                "options": [
                                    "For appearance",
                                    "Eliminating grain boundaries maximizes creep resistance at extreme temperatures",
                                    "Single crystals are cheaper",
                                    "It's a decorative choice"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "At what temperature do high-pressure turbine blades operate?",
                                "options": [
                                    "200-300°C",
                                    "500-700°C",
                                    "1,400-1,600°C (above the blade metal's melting point)",
                                    "3,000°C"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What innovation did the LEAP engine introduce for fan blades?",
                                "options": [
                                    "Titanium fan blades",
                                    "3D-woven carbon fiber composite fan blades",
                                    "Wooden fan blades",
                                    "Ceramic fan blades"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is investment casting also known as?",
                                "options": [
                                    "Sand casting",
                                    "Lost-wax casting",
                                    "Die casting",
                                    "Continuous casting"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m6",
                "title": "Non-Destructive Testing (NDT)",
                "titleES": "Pruebas No Destructivas (NDT)",
                "icon": "fa-solid fa-magnifying-glass-chart",
                "readings": [
                    {
                        "id": "aero-m6-r1",
                        "title": "Finding Flaws Without Breaking Parts",
                        "duration": "10 min",
                        "content": "\n# Finding Flaws Without Breaking Parts: NDT Methods\n\nIn aerospace, a tiny crack or void can cause catastrophic failure. **Non-Destructive Testing (NDT)** inspects parts for defects without damaging them.\n\n## The Six Primary NDT Methods\n\n### 1. Visual Testing (VT)\nThe simplest method — trained inspectors examine parts with their eyes, magnifying glasses, or borescopes (cameras on flexible tubes for engine interiors). Always the first inspection performed.\n\n### 2. Ultrasonic Testing (UT)\nUses **high-frequency sound waves** to detect internal flaws. A transducer sends sound into the material; reflections indicate cracks or voids.\n- **Phased Array UT (PAUT)**: Multiple elements for detailed cross-sectional imaging\n- **Best for**: Internal flaws in metals and composites, thickness measurement\n\n### 3. Radiographic Testing (RT)\nUses **X-rays or gamma rays** to create images of a part's interior — like a medical X-ray for metal.\n- Detects internal voids, inclusions, and porosity\n- **Best for**: Castings, weld inspection, complex assemblies\n\n### 4. Eddy Current Testing (ET)\nUses **electromagnetic induction** to detect surface and near-surface cracks in conductive materials.\n- A coil generates alternating current; defects disturb the eddy current pattern\n- **Best for**: Surface cracks in aluminum skins, bolt holes, engine discs\n\n### 5. Liquid Penetrant Testing (PT)\nApply a colored or fluorescent liquid to the surface. The liquid seeps into cracks. After cleaning, a developer draws the liquid back out, revealing crack locations.\n- **Best for**: Surface-breaking cracks on non-porous materials\n\n### 6. Magnetic Particle Testing (MT)\nApply magnetic field and iron particles to the part. Particles cluster at cracks where the field is disturbed.\n- **Only works on ferromagnetic materials** (steel, not aluminum or titanium)\n\n## ASNT Certification Levels\n\nThe **American Society for Nondestructive Testing (ASNT)** defines three certification levels:\n\n| Level | Can Do |\n|-------|--------|\n| **Level I** | Perform specific inspections under supervision |\n| **Level II** | Inspect independently, interpret results, write reports |\n| **Level III** | Develop procedures, certify Level I/II, full technical authority |\n\nAerospace specifically requires compliance with **NAS 410** (National Aerospace Standard for NDT personnel).\n\n---\n\n> **Key Takeaway**: NDT finds flaws without destroying parts. Key methods include ultrasonic, radiographic, eddy current, penetrant, and magnetic particle testing. ASNT certification (NAS 410) is required in aerospace.\n",
                        "vocabulary": [
                            {
                                "en": "NDT (Non-Destructive Testing)",
                                "es": "Pruebas No Destructivas",
                                "definition": "Inspection methods that don't damage the part"
                            },
                            {
                                "en": "Ultrasonic Testing (UT)",
                                "es": "Prueba Ultrasónica",
                                "definition": "Using sound waves to detect internal flaws"
                            },
                            {
                                "en": "Radiographic Testing (RT)",
                                "es": "Prueba Radiográfica",
                                "definition": "Using X-rays to image internal structure"
                            },
                            {
                                "en": "Eddy Current Testing (ET)",
                                "es": "Prueba de Corrientes Inducidas",
                                "definition": "Electromagnetic method for surface/near-surface cracks"
                            },
                            {
                                "en": "Liquid Penetrant (PT)",
                                "es": "Líquidos Penetrantes",
                                "definition": "Dye seeps into surface cracks to reveal them"
                            },
                            {
                                "en": "Phased Array",
                                "es": "Arreglo de Fase",
                                "definition": "Advanced ultrasonic technique with multiple elements"
                            },
                            {
                                "en": "ASNT",
                                "es": "ASNT",
                                "definition": "American Society for Nondestructive Testing"
                            },
                            {
                                "en": "NAS 410",
                                "es": "NAS 410",
                                "definition": "Aerospace NDT personnel certification standard"
                            },
                            {
                                "en": "Transducer",
                                "es": "Transductor",
                                "definition": "Device converting electrical signals to sound waves"
                            },
                            {
                                "en": "Porosity",
                                "es": "Porosidad",
                                "definition": "Small holes or voids in a material"
                            },
                            {
                                "en": "Borescope",
                                "es": "Boroscopio",
                                "definition": "Camera on flexible tube for internal inspection"
                            },
                            {
                                "en": "Discontinuity",
                                "es": "Discontinuidad",
                                "definition": "Any interruption in the normal structure of a material"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Which NDT method uses sound waves to find internal flaws?",
                                "options": [
                                    "Eddy Current",
                                    "Visual Testing",
                                    "Ultrasonic Testing (UT)",
                                    "Liquid Penetrant"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What NDT certification standard is required in aerospace?",
                                "options": [
                                    "ISO 9001",
                                    "NAS 410",
                                    "IATF 16949",
                                    "CompTIA A+"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which method is like a medical X-ray for metal parts?",
                                "options": [
                                    "Magnetic Particle Testing",
                                    "Radiographic Testing (RT)",
                                    "Visual Testing",
                                    "Eddy Current Testing"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What can an ASNT Level II certified technician do?",
                                "options": [
                                    "Only observe",
                                    "Inspect independently, interpret results, and write reports",
                                    "Only clean equipment",
                                    "Design aircraft"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m7",
                "title": "Assembly and Structural Integration",
                "titleES": "Ensamblaje e Integración Estructural",
                "icon": "fa-solid fa-puzzle-piece",
                "readings": [
                    {
                        "id": "aero-m7-r1",
                        "title": "Building an Aircraft: Assembly and Joining Technologies",
                        "duration": "10 min",
                        "content": "\n# Building an Aircraft: Assembly and Joining Technologies\n\nAssembling an aircraft is fundamentally different from assembling a car. Each aircraft is essentially **hand-built** with thousands of manual operations — but guided by digital precision tools.\n\n## Aircraft Assembly Sequence\n\n### 1. Sub-Assembly\nIndividual components (ribs, stringers, panels, bulkheads) are manufactured separately, inspected, and prepared for integration.\n\n### 2. Major Assembly\nSub-assemblies are joined into major sections:\n- **Forward fuselage** (cockpit area)\n- **Center fuselage** (passenger cabin)\n- **Aft fuselage** (tail section)\n- **Wings** (left and right)\n- **Empennage** (tail: horizontal + vertical stabilizer)\n\n### 3. Final Assembly Line (FAL)\nMajor sections arrive and are joined together:\n1. Fuselage sections are connected (**circumferential joins**)\n2. Wings are attached to the center fuselage\n3. Landing gear is installed\n4. Engines are hung on pylons under the wings\n5. Interior is installed (seats, galleys, lavatories, IFE systems)\n6. All systems are connected and tested\n\n## Joining Technologies\n\n### Riveting (Most Common)\nThe traditional aerospace joining method. **Solid rivets** are inserted through pre-drilled holes and formed with pneumatic hammers.\n- A single-aisle aircraft has approximately **1.5 million rivets**\n- Hi-Lok and lockbolt fasteners are used for high-strength joints\n\n### Adhesive Bonding\nStructural adhesives bond composite panels. Used increasingly as composite content grows. Requires precise **surface preparation** (sandblasting, primer application).\n\n### Welding\nLimited in aerospace (aluminum warps, composites can't be welded). **Friction Stir Welding (FSW)** is an exception — used for SpaceX rocket tanks and some fuselage panels.\n\n### Hybrid Joining\nCombining riveting with adhesive for maximum strength — common in composite-to-metal joints.\n\n## Digital Tools in Assembly\n\n- **Laser trackers**: Measure positions to ±0.025mm accuracy\n- **Automated drilling**: Robots drill thousands of rivet holes\n- **Augmented Reality (AR)**: Workers see digital overlays on physical parts\n\n---\n\n> **Key Takeaway**: Aircraft assembly combines sub-assemblies into major sections on a Final Assembly Line. Riveting remains dominant (1.5M rivets per aircraft), but adhesive bonding grows with composite use.\n",
                        "vocabulary": [
                            {
                                "en": "Final Assembly Line (FAL)",
                                "es": "Línea de Ensamble Final",
                                "definition": "Where all major aircraft sections are joined together"
                            },
                            {
                                "en": "Rivet",
                                "es": "Remache",
                                "definition": "Metal fastener joining two sheets permanently"
                            },
                            {
                                "en": "Fuselage",
                                "es": "Fuselaje",
                                "definition": "Main body tube of the aircraft"
                            },
                            {
                                "en": "Empennage",
                                "es": "Empenaje / Cola",
                                "definition": "Tail section (horizontal + vertical stabilizer)"
                            },
                            {
                                "en": "Stringer",
                                "es": "Larguerillo",
                                "definition": "Longitudinal structural member reinforcing the skin"
                            },
                            {
                                "en": "Bulkhead",
                                "es": "Mamparo",
                                "definition": "Vertical partition dividing the fuselage into sections"
                            },
                            {
                                "en": "Pylon",
                                "es": "Pilón",
                                "definition": "Structure connecting engine to wing"
                            },
                            {
                                "en": "Friction Stir Welding",
                                "es": "Soldadura por Fricción",
                                "definition": "Solid-state welding using a rotating tool"
                            },
                            {
                                "en": "Adhesive Bonding",
                                "es": "Unión Adhesiva",
                                "definition": "Joining parts with structural glue"
                            },
                            {
                                "en": "Laser Tracker",
                                "es": "Rastreador Láser",
                                "definition": "Precision measurement device for large assemblies"
                            },
                            {
                                "en": "Hi-Lok Fastener",
                                "es": "Sujetador Hi-Lok",
                                "definition": "High-strength aerospace fastener"
                            },
                            {
                                "en": "IFE (In-Flight Entertainment)",
                                "es": "Entretenimiento a Bordo",
                                "definition": "Passenger entertainment system"
                            }
                        ],
                        "questions": [
                            {
                                "q": "How many rivets does a typical single-aisle aircraft have?",
                                "options": [
                                    "About 1,000",
                                    "About 50,000",
                                    "Approximately 1.5 million",
                                    "About 10 million"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "What is the Final Assembly Line (FAL)?",
                                "options": [
                                    "Where individual parts are machined",
                                    "Where all major aircraft sections are joined together",
                                    "A testing facility",
                                    "A paint shop"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why is traditional welding rarely used in aerospace?",
                                "options": [
                                    "It's too expensive",
                                    "Aluminum warps and composites can't be welded conventionally",
                                    "Welding is too slow",
                                    "It's illegal in aerospace"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is an empennage?",
                                "options": [
                                    "The engine mount",
                                    "The tail section of an aircraft",
                                    "A type of rivet",
                                    "The landing gear"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m8",
                "title": "Quality Assurance and AS9100",
                "titleES": "Aseguramiento de Calidad y AS9100",
                "icon": "fa-solid fa-clipboard-check",
                "readings": [
                    {
                        "id": "aero-m8-r1",
                        "title": "AS9100D: The Aerospace Quality Standard",
                        "duration": "10 min",
                        "content": "\n# AS9100D: The Aerospace Quality Standard\n\nIn aerospace, quality is not a goal — it is an **absolute requirement**. A single defective part can endanger hundreds of lives. **AS9100D** is the international quality management standard specifically designed for the aerospace industry.\n\n## What Is AS9100D?\n\nAS9100D is based on **ISO 9001** (the general quality standard) but adds aerospace-specific requirements:\n\n| ISO 9001 | AS9100D Additions |\n|----------|--------------------|\n| General quality management | **Product safety** management |\n| Customer focus | **Risk management** throughout production |\n| Process approach | **Counterfeit part prevention** |\n| Continual improvement | **Special process** control (heat treat, NDT, welding) |\n| Documentation | **Complete traceability** of every part and material |\n| Supplier management | **Flow-down** of requirements to all sub-tier suppliers |\n\n## Key AS9100D Concepts\n\n### 1. Configuration Management\nTrack every change to a product's design, documentation, and software throughout its lifecycle. If a bolt changes from Grade 5 to Grade 8, every affected document, drawing, and inspection plan must be updated.\n\n### 2. Risk Management\nIdentify risks at every stage and implement controls. Aerospace uses **FMEA** (Failure Mode and Effects Analysis) to systematically evaluate what could go wrong and how severe the consequences would be.\n\n### 3. First Article Inspection (FAI)\nThe **first part** produced from a new or changed process must undergo complete dimensional verification — every measurement verified against the drawing. Documented per **AS9102** (FAI standard).\n\n### 4. NADCAP (National Aerospace and Defense Contractors Accreditation Program)\nSpecial processes (heat treatment, NDT, chemical processing, welding, coatings) require **NADCAP accreditation** — an additional audit beyond AS9100D.\n\n## The Cost of Non-Conformance\n\n| Finding Type | Definition | Impact |\n|-------------|-----------|--------|\n| **Minor NC** | System gap that doesn't affect product | Must correct within 60 days |\n| **Major NC** | Missing or failed system requirement | Can halt production |\n| **Critical NC** | Product safety risk | **Immediate stop-ship** |\n\n## Traceability: From Ore to Aircraft\n\nEvery aerospace part can be traced back to:\n- The specific **heat lot** of raw material\n- The **machine** and **operator** who produced it\n- The **inspector** who verified it\n- The **date and time** of every operation\n\n---\n\n> **Key Takeaway**: AS9100D is the mandatory aerospace quality standard adding safety, risk management, counterfeit prevention, and full traceability to ISO 9001. NADCAP accredits special processes.\n",
                        "vocabulary": [
                            {
                                "en": "AS9100D",
                                "es": "AS9100D",
                                "definition": "International aerospace quality management standard"
                            },
                            {
                                "en": "NADCAP",
                                "es": "NADCAP",
                                "definition": "Special process accreditation for aerospace"
                            },
                            {
                                "en": "First Article Inspection (FAI)",
                                "es": "Inspección del Primer Artículo",
                                "definition": "Complete verification of the first part produced"
                            },
                            {
                                "en": "FMEA",
                                "es": "Análisis de Modo y Efecto de Falla",
                                "definition": "Systematic analysis of potential failure modes"
                            },
                            {
                                "en": "Traceability",
                                "es": "Trazabilidad",
                                "definition": "Tracking every part back to raw materials and processes"
                            },
                            {
                                "en": "Non-Conformance (NC)",
                                "es": "No Conformidad",
                                "definition": "A part or process that doesn't meet requirements"
                            },
                            {
                                "en": "Configuration Management",
                                "es": "Gestión de Configuración",
                                "definition": "Tracking all changes to product design and documentation"
                            },
                            {
                                "en": "Flow-Down",
                                "es": "Flujo de Requisitos",
                                "definition": "Passing quality requirements to all suppliers in the chain"
                            },
                            {
                                "en": "Counterfeit Part",
                                "es": "Parte Falsificada",
                                "definition": "Unapproved or fraudulent component"
                            },
                            {
                                "en": "Special Process",
                                "es": "Proceso Especial",
                                "definition": "Process whose quality can't be fully verified by inspection alone"
                            },
                            {
                                "en": "Heat Lot",
                                "es": "Lote de Fundición",
                                "definition": "A batch of metal from the same melting/processing"
                            },
                            {
                                "en": "Stop-Ship",
                                "es": "Detención de Envío",
                                "definition": "Immediate halt to shipping any product"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is AS9100D based on?",
                                "options": [
                                    "IATF 16949",
                                    "ISO 9001 with aerospace-specific additions",
                                    "Six Sigma",
                                    "Lean Manufacturing"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is a First Article Inspection (FAI)?",
                                "options": [
                                    "Checking the last part produced",
                                    "Complete dimensional verification of the first part from a new/changed process",
                                    "Visual inspection only",
                                    "Testing the machine"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does NADCAP accredit?",
                                "options": [
                                    "General management systems",
                                    "Special processes like heat treatment, NDT, and coatings",
                                    "Employee training",
                                    "Office procedures"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What happens when a Critical Non-Conformance is found?",
                                "options": [
                                    "Nothing special",
                                    "A warning is issued",
                                    "Immediate stop-ship — no product leaves the factory",
                                    "The finding is ignored"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aero-m9",
                "title": "Mexico's Aerospace Corridor and Career Paths",
                "titleES": "El Corredor Aeroespacial de México",
                "icon": "fa-solid fa-map-location-dot",
                "readings": [
                    {
                        "id": "aero-m9-r1",
                        "title": "Mexico's Aerospace Industry: Clusters and Careers",
                        "duration": "10 min",
                        "content": "\n# Mexico's Aerospace Industry: Clusters and Careers\n\nMexico's aerospace sector has grown from virtually nothing in the early 2000s to a **US$11+ billion export industry** with 400+ companies in just 20 years. This growth is one of the most successful industrial development stories in Latin America.\n\n## The Major Aerospace Clusters\n\n### Querétaro — \"The Aerospace Capital\"\n- **80+ aerospace companies** including Safran, Bombardier, Airbus (MRO)\n- Specialization: **manufacturing, MRO, and R&D**\n- University of Aeronautics (UNAQ) — Mexico's only aerospace-dedicated university\n- **$1.2 billion** investment from Safran and Airbus (2026)\n\n### Sonora — \"Mexico's Turbine Capital\"\n- Specialization: **engine components, avionics, landing gear**\n- Major companies: **Safran, Collins Aerospace, Latecoere**\n- Binational megaregion with Arizona (shared supply chains)\n\n### Baja California — Largest Cluster by Companies\n- **100+ aerospace companies**\n- Specialization: **electronics, machining, assemblies**\n- Proximity to San Diego aerospace hub\n\n### Chihuahua — Engineering and Composites\n- Specialization: **metal and composite components, engineering**\n- Companies: Honeywell, Textron Aviation, Kaman Aerospace\n\n### Nuevo León — High-Tech Precision\n- Specialization: **CNC machining, composite materials, additive manufacturing**\n- Monterrey's strong engineering talent base\n\n## Career Paths and Salaries (2026)\n\n| Career | Description | Monthly Salary (MXN) |\n|--------|-------------|---------------------|\n| **CNC Operator** | Programs and operates precision machines | $15,000 - 25,000 |\n| **NDT Technician (Level II)** | Inspects parts using ultrasonic, RT, ET methods | $18,000 - 30,000 |\n| **Quality Inspector** | Verifies AS9100D compliance and dimensions | $15,000 - 25,000 |\n| **Composite Technician** | Lays up and cures CFRP parts | $14,000 - 22,000 |\n| **Manufacturing Engineer** | Designs production processes and fixtures | $30,000 - 55,000 |\n| **Stress Engineer** | Analyzes structural loads and safety margins | $35,000 - 65,000 |\n| **MRO Technician (A&P)** | Maintains and repairs aircraft | $20,000 - 40,000 |\n\n## The Critical Importance of English\n\nIn Mexico's aerospace industry, **English is non-negotiable**:\n- All technical drawings, specifications, and standards are in English\n- Quality audits (AS9100D, NADCAP) are conducted in English\n- Communication with OEMs (Boeing, Airbus, Safran) is entirely in English\n- SOPs, work instructions, and NCR reports are written in English\n\nA worker with the same technical skills but **bilingual ability** can earn **30-50% more** than a monolingual peer.\n\n## FEMIA's Vision for 2030\n\nThe Federación Mexicana de la Industria Aeroespacial targets:\n- **US$15 billion** in annual exports\n- **Tier 1 status** for select Mexican companies\n- Growth in **MRO** (Maintenance, Repair, and Overhaul) — the fastest-growing segment\n- Integration of **Industry 4.0** into aerospace manufacturing\n\n---\n\n> **Key Takeaway**: Mexico's aerospace industry has 400+ companies exporting $11B+ annually across 5 major clusters. English proficiency is the #1 career differentiator, with bilingual workers earning 30-50% more.\n",
                        "vocabulary": [
                            {
                                "en": "Aerospace Cluster",
                                "es": "Clúster Aeroespacial",
                                "definition": "Geographic concentration of aerospace companies"
                            },
                            {
                                "en": "MRO",
                                "es": "MRO (Mantenimiento, Reparación, Revisión)",
                                "definition": "Maintenance, Repair, and Overhaul of aircraft"
                            },
                            {
                                "en": "A&P License",
                                "es": "Licencia A&P",
                                "definition": "Airframe and Powerplant mechanic certification"
                            },
                            {
                                "en": "UNAQ",
                                "es": "UNAQ",
                                "definition": "Universidad Nacional Aeronáutica de Querétaro"
                            },
                            {
                                "en": "Binational Megaregion",
                                "es": "Megaregión Binacional",
                                "definition": "Cross-border industrial zone (e.g., Sonora-Arizona)"
                            },
                            {
                                "en": "NCR (Non-Conformance Report)",
                                "es": "Reporte de No Conformidad",
                                "definition": "Document recording a quality deviation"
                            },
                            {
                                "en": "SOP (Standard Operating Procedure)",
                                "es": "Procedimiento Operativo Estándar",
                                "definition": "Step-by-step work instruction"
                            },
                            {
                                "en": "Fixture",
                                "es": "Dispositivo / Fixture",
                                "definition": "Tool that holds a part in position during manufacturing"
                            },
                            {
                                "en": "Stress Analysis",
                                "es": "Análisis de Esfuerzos",
                                "definition": "Engineering analysis of forces on a structure"
                            },
                            {
                                "en": "Lay-up",
                                "es": "Laminado",
                                "definition": "Process of placing composite fiber sheets in a mold"
                            },
                            {
                                "en": "Work Instruction",
                                "es": "Instrucción de Trabajo",
                                "definition": "Detailed guide for performing a specific task"
                            },
                            {
                                "en": "Nearshoring",
                                "es": "Nearshoring",
                                "definition": "Relocating manufacturing closer to the end market"
                            }
                        ],
                        "questions": [
                            {
                                "q": "How much does Mexico export in aerospace annually?",
                                "options": [
                                    "$1 billion",
                                    "$5 billion",
                                    "Over $11 billion",
                                    "$50 billion"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which city is known as Mexico's 'Aerospace Capital'?",
                                "options": [
                                    "Monterrey",
                                    "Mexico City",
                                    "Querétaro",
                                    "Guadalajara"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "How much more can a bilingual aerospace worker earn compared to a monolingual peer?",
                                "options": [
                                    "5-10%",
                                    "30-50% more",
                                    "The same",
                                    "Less"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does FEMIA target for Mexico's aerospace exports by 2030?",
                                "options": [
                                    "$5 billion",
                                    "$10 billion",
                                    "$15 billion",
                                    "$50 billion"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            }
        ],
        "category": "engineering"
    },
    "robotics-automation": {
        "id": "robotics-automation",
        "title": "Robótica Industrial y Automatización",
        "titleEN": "Robotics & Automation",
        "category": "engineering",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "ISO 10218 / RIA R15.06 Industrial Robot Safety / IEC 61131-3",
        "conocer": "EC1338 (Programación y Mantenimiento de Robots Industriales)",
        "ngss": "Robotics & Automated Mechatronic Systems Engineering",
        "industry": "Global Industrial Automation & Cobots Standard",
        "icon": "fa-solid fa-robot",
        "description": "Cinemática de manipuladores articulados de 6 ejes, programación de controladores lógicos (PLCs), cobots y middleware ROS 2.",
        "modules": [
            {
                "id": "robot-m1",
                "title": "Industrial Robot Kinematics & Coordinate Systems",
                "titleES": "Cinemática de Robots Industriales y Sistemas de Coordenadas",
                "icon": "fa-solid fa-compass",
                "readings": [
                    {
                        "id": "robot-m1-r1",
                        "title": "6-Axis Articulated Robots: Forward and Inverse Kinematics in Modern Automation",
                        "duration": "10 min",
                        "content": "\n> **Industrial Robotics Standard Note**: This curriculum adheres to **ISO 10218-1/2** (Safety requirements for industrial robots) and **RIA R15.06** standards, providing foundational competencies for robotic cell integration across automotive, aerospace, and electronics manufacturing.\n\n# 6-Axis Articulated Robots: Forward and Inverse Kinematics in Modern Automation\n\nAcross automotive plants in Saltillo, Puebla, and Hermosillo, **6-Axis Articulated Industrial Robots** (manufactured by FANUC, ABB, KUKA, and Yaskawa) form the backbone of high-volume manufacturing. Whether executing high-amperage spot welding on vehicle chassis or precision dispensing of thermal adhesive on EV battery modules, these robotic arms operate with sub-millimeter precision.\n\n## 1. Anatomy and Degrees of Freedom (6-DoF)\n\nAn articulated industrial manipulator utilizes an open kinematic chain composed of rigid links connected by motorized revolute joints. A standard 6-axis arm possesses **six degrees of freedom (6-DoF)**, mirroring human arm dexterity:\n\n1. **Axis 1 (Base / Waist)**: Rotates the entire arm horizontally around the central pedestal.\n2. **Axis 2 (Shoulder)**: Moves the lower arm vertically forward and backward.\n3. **Axis 3 (Elbow)**: Pivots the upper arm up and down.\n4. **Axis 4 (Forearm Roll)**: Rotates the wrist mechanism along its longitudinal axis.\n5. **Axis 5 (Wrist Pitch / Bend)**: Tilts the end-of-arm tool up and down.\n6. **Axis 6 (Wrist Roll / Flange)**: Rotates the mounting flange where the **End-Effector** (gripper, laser head, welding torch) is secured.\n\nSix independent axes are the mathematical minimum required to position a tool at any arbitrary coordinate in 3D space $(X, Y, Z)$ while orienting it at any rotational angle (Roll, Pitch, Yaw).\n\n## 2. Forward vs. Inverse Kinematics\n\nControlling a robotic manipulator requires mastering coordinate transformations between **Joint Space** and **Cartesian Space**:\n\n- **Forward Kinematics (FK)**: Given the angular positions of all six revolute joints $(\\theta_1, \\theta_2, \\theta_3, \\theta_4, \\theta_5, \\theta_6)$, Forward Kinematics computes the exact Cartesian pose (position and orientation) of the Tool Center Point (TCP). Because each joint angle directly dictates link geometry, FK always yields a single, deterministic solution calculated using **Denavit-Hartenberg (D-H) parameter matrices**.\n- **Inverse Kinematics (IK)**: The reverse and vastly more complex problem. Given a desired spatial destination for the TCP $(X, Y, Z, W, P, R)$, Inverse Kinematics calculates the required joint angles to achieve that pose. IK often yields **multiple mathematical configurations** (e.g., elbow-up vs. elbow-down, wrist-flipped) or no solution if the target lies outside the robot's **Work Envelope**.\n\n## 3. Singularity Avoidance and Path Planning\n\nA critical challenge in robot programming is avoiding **Kinematic Singularities**:\n- A singularity occurs when two joint axes align collinearly, causing the robot's Jacobian matrix to lose mathematical rank.\n- At a singularity point, the robot loses a degree of freedom in Cartesian space, requiring infinite joint velocity to sustain linear tool movement.\n- Modern robot controllers enforce singularity avoidance algorithms, decelerating the arm or re-routing trajectory to prevent mechanical motor overcurrent and violent vibrations.\n\n## 4. Repeatability vs. Accuracy (ISO 9283)\n\nEngineers must never confuse precision metrics:\n- **Pose Accuracy**: The ability of the robot to move to a command target coordinate in free space.\n- **Pose Repeatability**: The ability of the robot to return to the exact same taught position after hundreds of thousands of cycles. Industrial robots exhibit outstanding repeatability (typically **$\\pm 0.02$ mm**), even if absolute spatial accuracy varies slightly due to arm deflection and temperature expansion.\n\n---\n\n> **Key Takeaway**: Industrial robotic integration combines **joint mechanics (6-DoF)** with rigorous spatial mathematics (**Forward/Inverse Kinematics, Tool Center Point calibration, and singularity avoidance**). Fluency in robotics English enables automation engineers to commission robotic workcells and resolve critical faults in multinational plants.\n",
                        "vocabulary": [
                            {
                                "en": "Inverse Kinematics (IK)",
                                "es": "Cinemática Inversa",
                                "definition": "Mathematical calculation of required joint angles to place a tool at a target Cartesian coordinate"
                            },
                            {
                                "en": "Tool Center Point (TCP)",
                                "es": "Punto Central de la Herramienta (TCP)",
                                "definition": "The exact coordinate point at the tip of the end-effector where work is executed"
                            },
                            {
                                "en": "Kinematic Singularity",
                                "es": "Singularidad Cinemática",
                                "definition": "Alignment of joint axes causing loss of degrees of freedom and unbounded joint velocity"
                            },
                            {
                                "en": "End-Effector",
                                "es": "Efector Final / Garra",
                                "definition": "Tool mounted to the robot flange that interacts with parts (gripper, welder, dispenser)"
                            },
                            {
                                "en": "Work Envelope",
                                "es": "Espacio de Trabajo",
                                "definition": "The total 3D spatial boundary within which a robot can position its TCP"
                            },
                            {
                                "en": "Pose Repeatability",
                                "es": "Repetibilidad de Pose",
                                "definition": "Ability of a robot to return to an identical taught position across continuous cycles"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the primary difference between Forward Kinematics (FK) and Inverse Kinematics (IK)?",
                                "options": [
                                    "FK computes Cartesian pose from joint angles; IK calculates joint angles from a desired Cartesian pose",
                                    "FK moves backward; IK moves forward",
                                    "FK is only for electric motors; IK is for pneumatic valves",
                                    "There is no mathematical difference"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What dangerous operational condition occurs at a Kinematic Singularity?",
                                "options": [
                                    "The battery discharges completely",
                                    "Joint axes align, requiring theoretical infinite joint velocity for linear motion",
                                    "The TCP changes color",
                                    "The gripper opens automatically"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "How many degrees of freedom (DoF) are mathematically required for full 3D spatial positioning and orientation?",
                                "options": [
                                    "2 DoF",
                                    "4 DoF",
                                    "6 DoF",
                                    "12 DoF"
                                ],
                                "answer": 2
                            },
                            {
                                "q": "Which metric describes a robot's ability to return to the exact same taught coordinate cycle after cycle?",
                                "options": [
                                    "Pose Repeatability",
                                    "Operating Voltage",
                                    "Network Latency",
                                    "Thermal Dissipation"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            },
            {
                "id": "robot-m2",
                "title": "Programmable Logic Controllers (PLCs) & IEC 61131-3",
                "titleES": "Controladores Lógicos Programables (PLCs) y Norma IEC 61131-3",
                "icon": "fa-solid fa-gears",
                "readings": []
            },
            {
                "id": "robot-m3",
                "title": "Collaborative Robots (Cobots) & ISO 10218 / TS 15066 Safety",
                "titleES": "Robots Colaborativos (Cobots) y Seguridad ISO 10218",
                "icon": "fa-solid fa-shield-virus",
                "readings": []
            },
            {
                "id": "robot-m4",
                "title": "Robot Operating System (ROS 2) & Real-Time Middleware",
                "titleES": "Robot Operating System (ROS 2) y Middleware en Tiempo Real",
                "icon": "fa-solid fa-network-wired",
                "readings": []
            },
            {
                "id": "robot-m5",
                "title": "End-Effectors, Grippers & Sensor-Guided Manipulation",
                "titleES": "Efectores Finales, Garras y Manipulación Guiada por Sensores",
                "icon": "fa-solid fa-hand",
                "readings": []
            }
        ]
    },
    "energy-renewables": {
        "id": "energy-renewables",
        "title": "Energías Renovables y Tecnologías Limpias",
        "titleEN": "Energy & Renewable Technologies",
        "category": "engineering",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "IEEE 1547 Interconnection / IEC 61215 PV / IEC 61400 Wind",
        "conocer": "EC0586 (Instalación de Sistemas Fotovoltaicos en Residencia y Comercio)",
        "ngss": "Clean Energy Engineering & Electric Grid Integration",
        "industry": "Global Renewable Infrastructure & BESS Storage Standard",
        "icon": "fa-solid fa-solar-panel",
        "description": "Sistemas fotovoltaicos a gran escala, aerodinámica de turbinas eólicas, sistemas de almacenamiento de baterías (BESS) y redes inteligentes (Smart Grids).",
        "modules": [
            {
                "id": "energy-m1",
                "title": "Utility-Scale Solar PV Systems & Grid Synchronization",
                "titleES": "Sistemas Fotovoltaicos a Gran Escala y Sincronización a la Red",
                "icon": "fa-solid fa-sun",
                "readings": [
                    {
                        "id": "energy-m1-r1",
                        "title": "Utility-Scale Photovoltaics: Inverter Dynamics, MPPT, and Grid Stability",
                        "duration": "10 min",
                        "content": "\n> **Clean Energy Engineering Note**: This module aligns with **IEEE 1547-2018** (Standard for Interconnection and Interoperability of Distributed Energy Resources with Associated Electric Power Systems Interfaces) and **IEC 62109** safety protocols for solar power converters.\n\n# Utility-Scale Photovoltaics: Inverter Dynamics, MPPT, and Grid Stability\n\nAs multinational nearshoring corporations mandate 100% renewable energy procurement for Mexican industrial facilities, utility-scale solar farms across Sonora, Coahuila, and Chihuahua play a pivotal role. Generating hundreds of megawatts of clean power requires far more than placing solar panels under sunlight; it demands complex power electronics, real-time grid synchronization, and active voltage regulation.\n\n## 1. Photovoltaic Physics and Maximum Power Point Tracking (MPPT)\n\nA solar cell generates direct current (DC) electricity via the **photovoltaic effect**, where incident photons excite valence electrons into the conduction band of a doped silicon semiconductor.\n\nHowever, a photovoltaic panel's power output is strictly non-linear and governed by irradiance $(W/m^2)$ and operating junction temperature:\n- **I-V Curve**: Plots cell current against voltage from Short-Circuit Current $(I_{sc})$ to Open-Circuit Voltage $(V_{oc})$.\n- **P-V Curve**: Plots instantaneous power against voltage, displaying a distinct peak known as the **Maximum Power Point (MPP)**.\n\nBecause clouds and ambient temperatures shift continuously, utility-scale inverters run sophisticated **Maximum Power Point Tracking (MPPT)** algorithms (e.g., Perturb & Observe or Incremental Conductance). The inverter rapidly adjusts its internal DC bus impedance hundreds of times per second to keep photovoltaic strings operating precisely at their peak electrical efficiency ($V_{mpp} \\times I_{mpp}$).\n\n## 2. Inverter Topologies: Centralized vs. String Inverters\n\nIn multi-megawatt solar plant engineering, choosing the right inverter topology is a foundational CAPEX/OPEX decision:\n- **Central Inverters (1.5 MW - 4.5 MW)**: Large, centralized power stations housed in concrete enclosures. DC cabling from hundreds of solar combiner boxes runs to a single central inverter, which steps up power via an integrated transformer. They offer lower initial capital expenditure per watt but introduce a single point of failure.\n- **String Inverters (150 kW - 350 kW)**: Distributed across solar array rows. Each string inverter manages a smaller subset of panels with independent MPPT trackers. If one inverter fails, 98% of the solar plant continues feeding power to the grid, optimizing plant **Capacity Factor** and simplifying field maintenance.\n\n## 3. Grid-Following vs. Grid-Forming Inverters (IEEE 1547)\n\nAs renewable penetration on the electric grid increases, conventional synchronous generators (coal and gas turbines with massive spinning mechanical inertia) are decommissioned. This creates grid instability:\n\n- **Grid-Following (GFL) Inverters**: Legacy inverters that monitor grid voltage and frequency via a Phase-Locked Loop (PLL), injecting current in synchrony. If grid voltage collapses, GFL inverters disconnect immediately to prevent islanding hazards.\n- **Grid-Forming (GFM) Inverters**: The cutting edge of clean power engineering. GFM inverters act as independent AC voltage sources, establishing frequency and voltage reference signals using virtual synchronous machine (VSM) algorithms. They provide synthetic inertia, suppress rapid voltage dips, and facilitate black-start capability after widespread blackout events.\n\n---\n\n> **Key Takeaway**: Utility-scale solar engineering merges **semiconductor physics (photovoltaic effect)** with advanced **power electronics (MPPT algorithms, Central vs. String topologies, and Grid-Forming inverters)**. Command of these technical English concepts is vital for grid interconnection engineers managing multi-million-dollar clean energy projects.\n",
                        "vocabulary": [
                            {
                                "en": "Maximum Power Point Tracking (MPPT)",
                                "es": "Seguimiento del Punto de Máxima Potencia (MPPT)",
                                "definition": "Algorithm maximizing inverter power extraction across variable sunlight and temperature"
                            },
                            {
                                "en": "Grid-Forming Inverter",
                                "es": "Inversor Formador de Red (Grid-Forming)",
                                "definition": "Advanced power inverter establishing voltage and frequency independently without grid dependency"
                            },
                            {
                                "en": "Capacity Factor",
                                "es": "Factor de Planta / Capacidad",
                                "definition": "Ratio of actual power generated over a time period to the theoretical maximum output"
                            },
                            {
                                "en": "Open-Circuit Voltage (Voc)",
                                "es": "Voltaje de Circuito Abierto (Voc)",
                                "definition": "Maximum voltage available from a solar cell with zero current flowing"
                            },
                            {
                                "en": "Harmonic Distortion (THD)",
                                "es": "Distorsión Armónica Total (THD)",
                                "definition": "Measurement of electrical noise and waveform deviation in AC power output"
                            },
                            {
                                "en": "Synthetic Inertia",
                                "es": "Inercia Sintética / Virtual",
                                "definition": "Emulated mechanical inertia provided by electronic inverters to stabilize grid frequency"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the primary function of an MPPT algorithm in a solar inverter?",
                                "options": [
                                    "To rotate solar panels physically",
                                    "To continuously adjust electrical impedance so the array operates at peak power output",
                                    "To disconnect panels at night",
                                    "To clean panel glass automatically"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Why are Grid-Forming (GFM) inverters superior to Grid-Following inverters in high-renewable grids?",
                                "options": [
                                    "They establish independent voltage/frequency references and provide synthetic inertia",
                                    "They are cheaper to manufacture",
                                    "They consume zero solar energy",
                                    "They only work in DC current"
                                ],
                                "answer": 0
                            },
                            {
                                "q": "What does an I-V curve characterize in photovoltaic engineering?",
                                "options": [
                                    "Internet velocity vs download time",
                                    "Current output as a function of voltage across varying irradiance and temperature",
                                    "Internal vibration of transformers",
                                    "Inverter warranty period"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which standard establishes interconnection rules for distributed energy resources in North America?",
                                "options": [
                                    "IEEE 1547",
                                    "ISO 9001",
                                    "HTML 5.2",
                                    "OSHA 1910"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            },
            {
                "id": "energy-m2",
                "title": "Wind Turbine Aerodynamics, Nacelle & Pitch Control",
                "titleES": "Aerodinámica de Turbinas Eólicas, Góndola y Control de Paso",
                "icon": "fa-solid fa-wind",
                "readings": []
            },
            {
                "id": "energy-m3",
                "title": "Battery Energy Storage Systems (BESS) & Grid Firming",
                "titleES": "Sistemas de Almacenamiento con Baterías (BESS)",
                "icon": "fa-solid fa-car-battery",
                "readings": []
            },
            {
                "id": "energy-m4",
                "title": "Green Hydrogen: PEM Electrolysis & Industrial Applications",
                "titleES": "Hidrógeno Verde: Electrólisis PEM y Usos Industriales",
                "icon": "fa-solid fa-gas-pump",
                "readings": []
            },
            {
                "id": "energy-m5",
                "title": "Smart Grids, Microgrids & SCADA Energy Management",
                "titleES": "Redes Eléctricas Inteligentes, Microredes y SCADA",
                "icon": "fa-solid fa-plug-circle-bolt",
                "readings": []
            }
        ]
    },
    "advanced-manufacturing": {
        "id": "advanced-manufacturing",
        "title": "Ingeniería y Manufactura Avanzada",
        "titleEN": "Engineering & Advanced Manufacturing",
        "category": "engineering",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "ISO 9001 / AS9100 / ASTM Additive Manufacturing",
        "conocer": "EC0845 (Supervisión de Procesos de Manufactura)",
        "ngss": "Advanced Manufacturing & Materials Processing",
        "industry": "Global Industry 4.0 & Precision Tooling Standard",
        "icon": "fa-solid fa-industry",
        "description": "Manufactura aditiva metálica (DMLS/SLM), gemelos digitales (Digital Twins), GD&T avanzado y celdas de mecanizado automatizado.",
        "modules": [
            {
                "id": "am-m1",
                "title": "Geometric Dimensioning and Tolerancing (GD&T - ASME Y14.5)",
                "titleES": "Dimensionamiento Geométrico y Tolerancias (GD&T)",
                "icon": "fa-solid fa-ruler-combined",
                "readings": []
            },
            {
                "id": "am-m2",
                "title": "Metal Additive Manufacturing: DMLS, SLM and Binder Jetting",
                "titleES": "Manufactura Aditiva Metálica: DMLS, SLM y Binder Jetting",
                "icon": "fa-solid fa-cubes-stacked",
                "readings": []
            },
            {
                "id": "am-m3",
                "title": "Digital Twins & Industrial Simulation (Siemens, Dassault)",
                "titleES": "Gemelos Digitales y Simulación Industrial",
                "icon": "fa-solid fa-vr-cardboard",
                "readings": []
            },
            {
                "id": "am-m4",
                "title": "High-Speed 5-Axis CNC Milling & Toolpath Optimization",
                "titleES": "Fresado CNC de 5 Ejes y Optimización de Trayectorias",
                "icon": "fa-solid fa-screwdriver-wrench",
                "readings": []
            },
            {
                "id": "am-m5",
                "title": "Overall Equipment Effectiveness (OEE) & Kaizen Principles",
                "titleES": "Efectividad Global del Equipo (OEE) y Principios Kaizen",
                "icon": "fa-solid fa-chart-line",
                "readings": []
            }
        ]
    },
    "industrial-operations": {
        "id": "industrial-operations",
        "title": "Ingeniería Industrial y Operaciones",
        "titleEN": "Industrial Engineering & Operations",
        "category": "engineering",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "USMCA T-MEC / Six Sigma Black Belt / APICS CSCP",
        "conocer": "EC0301 (Operaciones de Comercio Exterior y Logística)",
        "ngss": "Industrial Engineering & Supply Chain Optimization",
        "industry": "Nearshoring Logistics & Just-In-Time Operations Standard",
        "icon": "fa-solid fa-dolly",
        "description": "Logística transfronteriza T-MEC, Incoterms 2020, Lean Manufacturing Six Sigma, balanceo de líneas y gestión de inventarios Just-In-Time.",
        "modules": [
            {
                "id": "sc-m1",
                "title": "USMCA/T-MEC Rules of Origin & Customs Documentation",
                "titleES": "Reglas de Origen T-MEC y Documentación Aduanera",
                "icon": "fa-solid fa-file-contract",
                "readings": [
                    {
                        "id": "sc-m1-r1",
                        "title": "Cross-Border Customs & Pedimentos in English",
                        "duration": "10 min",
                        "content": "\n> **Customs & Trade Governance Note**: Cross-border logistics between Mexico and North American markets operate under **USMCA / T-MEC Chapter 5** (Customs Procedures), **Chapter 4** (Rules of Origin), and **Incoterms 2020** specifications published by the International Chamber of Commerce (ICC).\n\n# Cross-Border Customs & Pedimentos in English: Nearshoring Logistics\n\nIn high-velocity nearshoring manufacturing corridors (e.g., Laredo / Nuevo Laredo port of entry handling over 14,000 trucks daily), seamless logistics coordination between Customs Brokers (*Agentes Aduanales*), Freight Forwarders, and SAT/CBP customs inspectors requires total fluency in English trade documentation.\n\n## Core Cross-Border Trade Documentation Matrix\n\n1. **Commercial Invoice**: Itemized legal bill issued by the exporter detailing unit quantities, currency valuation (USD), line-item descriptions, and 6-to-10 digit **Harmonized System (HS) Tariff Codes**.\n2. **Bill of Lading (BoL)**: Multi-modal contract of carriage acting as proof of cargo ownership, specifying freight terms (Prepaid vs. Collect) and carrier liability limits.\n3. **USMCA / T-MEC Certificate of Origin**: Legally binding declaration certifying that goods satisfy **Regional Value Content (RVC)** thresholds (e.g., 75% regional automotive content) to claim preferential 0% tariff treatment.\n4. **Pedimento de Importación (Customs Entry Summary)**: Official electronic declaration submitted to Mexican Customs (SAT/ANAM) specifying import regimes (e.g., **IMMEX** temporary importation vs. Definitiva), IVA tax guarantees, and DTA fees.\n\n## Incoterms 2020 Operational Execution: FOB vs. DDP\n\nChoosing the correct International Commercial Term (**Incoterm**) governs risk transfer, freight liability, and insurance coverage across international borders:\n\n- **EXW (Ex Works)**: Factory floor handover where buyer assumes all risk.\n- **FOB (Free On Board — Named Port of Shipment)**: The Mexican exporter clears goods for export and loads them onto the carrier at Laredo. The U.S. buyer assumes financial risk and transport costs the moment goods cross the loading threshold.\n- **DDP (Delivered Duty Paid — Named Destination)**: The Mexican exporter assumes 100% of transport costs, border drayage fees, U.S. customs clearance, and import duties, delivering freight directly to the buyer's warehouse door with zero buyer liability.\n\n## The Laredo & Texas Cross-Border Logistics Gateway\n\nOver **65% of all Mexican manufactured exports** bound for North American retail and automotive assembly plants flow through the Texas-Tamaulipas trade corridor:\n- **Cross-Border Drayage Operations**: Specialized short-haul drayage tractor-trailers transfer loaded trailers across the Rio Grande river between Nuevo Laredo staging yards and Laredo distribution hubs.\n- **C-TPAT (Customs-Trade Partnership Against Terrorism)**: Joint U.S. Customs and Border Protection (CBP) security certification providing audited manufacturing plants with dedicated expedited \"FAST Lanes\" to bypass 4-hour border wait times.\n- **IMMEX Program Operations**: Mexican tax incentive program allowing foreign manufacturers to temporarily import raw materials duty-free, provided finished goods are exported within statutory timeframes.\n\n## Just-In-Time (JIT) Sequencing & Milk-Run Logistics\n\nBeyond customs clearance, nearshoring logistics managers coordinate high-precision **Just-In-Time (JIT)** component deliveries to tier-1 OEM plants:\n- **Milk-Run Routing**: Scheduled multi-stop pickup trucks collecting parts from multiple suppliers across Monterrey or Saltillo, optimizing container load factors.\n- **VMI (Vendor-Managed Inventory)**: Overseas suppliers maintain buffer stock in border warehouses in McAllen or El Paso, transferring ownership only when pulled onto the assembly line.\n- **Kanban Signal Integration**: Electronic Data Interchange (EDI 856 / ASN - Advanced Shipping Notice) triggers real-time freight dispatches when factory buffer stock drops below reorder thresholds.\n\n---\n\n> **Key Takeaway**: Cross-border logistics relies on **T-MEC Chapter 5** documentation, **HS Codes**, **Incoterms 2020** (FOB vs. DDP), and **JIT Milk-Run** scheduling. Mastering these English customs protocols ensures sub-24h border clearance through the Laredo freight corridor.\n",
                        "vocabulary": [
                            {
                                "en": "Bill of Lading (BoL)",
                                "es": "Conocimiento de Embarque",
                                "definition": "Legal contract between carrier and shipper"
                            },
                            {
                                "en": "Harmonized System (HS) Code",
                                "es": "Fracción Arancelaria",
                                "definition": "International nomenclature for classifying traded products"
                            },
                            {
                                "en": "Delivered Duty Paid (DDP)",
                                "es": "Entregado con Derechos Pagados",
                                "definition": "Incoterm where seller pays all duties and shipping costs"
                            },
                            {
                                "en": "Free On Board (FOB)",
                                "es": "Libre a Bordo",
                                "definition": "Incoterm where buyer assumes responsibility after loading"
                            },
                            {
                                "en": "Customs Broker",
                                "es": "Agente Aduanal",
                                "definition": "Licensed specialist clearing goods through customs"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does Incoterm DDP mean?",
                                "options": [
                                    "Buyer pays all taxes",
                                    "Seller pays all shipping, duties, and import taxes",
                                    "No taxes are paid",
                                    "Shipping is free"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is an HS Code?",
                                "options": [
                                    "A driver's license number",
                                    "International classification number for traded goods",
                                    "A warehouse locator",
                                    "A tax penalty"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "mechatronics": {
        "id": "mechatronics",
        "title": "Ingeniería Mecánica y Mecatrónica",
        "titleEN": "Mechanical Engineering & Mechatronics",
        "category": "engineering",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "ASME BTH-1 / ISO 12100 Machine Safety",
        "conocer": "EC1120 (Mantenimiento de Sistemas Mecatrónicos)",
        "ngss": "Mechanical Engineering & Multi-Domain System Dynamics",
        "industry": "Global Electro-Mechanical Machine Design Standard",
        "icon": "fa-solid fa-cogs",
        "description": "Diseño mecánico de precisión, servomotores, sistemas electrohidráulicos y neumáticos, y análisis de esfuerzos por elementos finitos (FEA).",
        "modules": [
            {
                "id": "mech-m1",
                "title": "Finite Element Analysis (FEA): Stress, Strain and Thermal Load",
                "titleES": "Análisis por Elementos Finitos (FEA): Esfuerzo y Deformación",
                "icon": "fa-solid fa-vector-square",
                "readings": []
            },
            {
                "id": "mech-m2",
                "title": "Actuators & Servomotors: Closed-Loop PID Motion Control",
                "titleES": "Actuadores y Servomotores: Control de Movimiento PID",
                "icon": "fa-solid fa-rotate",
                "readings": []
            },
            {
                "id": "mech-m3",
                "title": "Electro-Pneumatic & Hydraulic Power Transmission Systems",
                "titleES": "Sistemas de Transmisión Electro-Neumática e Hidráulica",
                "icon": "fa-solid fa-faucet-drip",
                "readings": []
            },
            {
                "id": "mech-m4",
                "title": "Shaft Couplings, Bearing Selection and Harmonic Drives",
                "titleES": "Acoplamientos de Ejes, Rodamientos y Reductores Armónicos",
                "icon": "fa-solid fa-ring",
                "readings": []
            },
            {
                "id": "mech-m5",
                "title": "Thermal Management in Electronic Enclosures & Heat Pipes",
                "titleES": "Gestión Térmica en Gabinetes Electrónicos y Tubos de Calor",
                "icon": "fa-solid fa-temperature-arrow-up",
                "readings": []
            }
        ]
    },
    "biotechnology": {
        "id": "biotechnology",
        "title": "Biotecnología y Ciencias de la Vida",
        "titleEN": "Biotechnology & Life Sciences",
        "category": "science",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "cGMP / FDA 21 CFR Part 211 / ISO 14644 Biocleanrooms",
        "conocer": "EC1240 (Operación de Procesos Biotecnológicos)",
        "ngss": "Biotechnology & Applied Molecular Genetics",
        "industry": "Global Biopharmaceutical & Fermentation Standard",
        "icon": "fa-solid fa-dna",
        "description": "Bioprocesamiento en biorreactores, edición genética CRISPR, fermentación industrial, formulación farmacéutica y cGMP en salas limpias.",
        "modules": [
            {
                "id": "bio-m1",
                "title": "Bioreactor Operations: Aerobic & Anaerobic Fermentation Scaling",
                "titleES": "Operaciones en Biorreactores y Escalamiento de Fermentación",
                "icon": "fa-solid fa-flask",
                "readings": []
            },
            {
                "id": "bio-m2",
                "title": "CRISPR-Cas9 & Genetic Engineering Methodologies",
                "titleES": "CRISPR-Cas9 y Metodologías de Ingeniería Genética",
                "icon": "fa-solid fa-dna",
                "readings": []
            },
            {
                "id": "bio-m3",
                "title": "Downstream Processing: Chromatography & Ultrafiltration",
                "titleES": "Procesamiento Downstream: Cromatografía y Ultrafiltración",
                "icon": "fa-solid fa-filter",
                "readings": []
            },
            {
                "id": "bio-m4",
                "title": "Current Good Manufacturing Practices (cGMP) in Cleanrooms",
                "titleES": "Buenas Prácticas de Manufactura (cGMP) en Cuartos Limpios",
                "icon": "fa-solid fa-square-check",
                "readings": []
            },
            {
                "id": "bio-m5",
                "title": "Enzyme Kinetics & Industrial Biocatalysis Applications",
                "titleES": "Cinética Enzimática y Biocatálisis Industrial",
                "icon": "fa-solid fa-atom",
                "readings": []
            }
        ]
    },
    "space-satellite": {
        "id": "space-satellite",
        "title": "Tecnología Espacial y Satelital",
        "titleEN": "Space & Satellite Technology",
        "category": "science",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "NASA-STD / ESA ECSS / CubeSat Design Specification",
        "conocer": "EC1450 (Integración y Operación Satelital)",
        "ngss": "Space Systems Engineering & Orbital Mechanics",
        "industry": "NewSpace Commercial Satellites & Launch Services Standard",
        "icon": "fa-solid fa-satellite",
        "description": "Mecánica orbital, satélites CubeSat (LEO), propulsión de cohetes, telemetría espacial TT&C y mitigación de basura orbital.",
        "modules": [
            {
                "id": "space-m1",
                "title": "Orbital Mechanics: Keplerian Elements, LEO, GEO and Sun-Sync",
                "titleES": "Mecánica Orbital: Elementos Keplerianos, LEO y GEO",
                "icon": "fa-solid fa-earth-americas",
                "readings": []
            },
            {
                "id": "space-m2",
                "title": "CubeSat Subsystems: EPS, OBC, ADCS and Payload Integration",
                "titleES": "Subsistemas CubeSat: EPS, OBC, ADCS e Integración",
                "icon": "fa-solid fa-cube",
                "readings": []
            },
            {
                "id": "space-m3",
                "title": "Rocket Propulsion: Chemical, Cryogenic and Hall-Effect Thrusters",
                "titleES": "Propulsión de Cohetes: Química, Criogénica e Iónica",
                "icon": "fa-solid fa-fire",
                "readings": []
            },
            {
                "id": "space-m4",
                "title": "Satellite Ground Stations: Telemetry, Tracking and Command (TT&C)",
                "titleES": "Estaciones Terrenas: Telemetría, Seguimiento y Comando",
                "icon": "fa-solid fa-tower-broadcast",
                "readings": []
            },
            {
                "id": "space-m5",
                "title": "Space Debris Mitigation & Radiation Hardening in Orbit",
                "titleES": "Mitigación de Basura Espacial y Blindaje contra Radiación",
                "icon": "fa-solid fa-shield",
                "readings": []
            }
        ]
    },
    "environmental-sustainability": {
        "id": "environmental-sustainability",
        "title": "Sustentabilidad y Tecnología Ambiental",
        "titleEN": "Environmental & Sustainability",
        "category": "science",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "ISO 14001 Environmental Management / GHG Protocol / ESG",
        "conocer": "EC0945 (Gestión Ambiental y Huella de Carbono)",
        "ngss": "Environmental Science & Climate Tech Engineering",
        "industry": "Global Corporate ESG & Carbon Accounting Standard",
        "icon": "fa-solid fa-leaf",
        "description": "Auditorías de huella de carbono (Scope 1, 2, 3), tratamiento avanzado de agua industrial, captura de carbono (CCUS) y economía circular.",
        "modules": [
            {
                "id": "env-m1",
                "title": "Carbon Accounting: Scope 1, 2 and 3 Greenhouse Gas Protocol",
                "titleES": "Contabilidad de Carbono: Alcances 1, 2 y 3 Protocolo GEI",
                "icon": "fa-solid fa-smog",
                "readings": []
            },
            {
                "id": "env-m2",
                "title": "Industrial Wastewater Treatment: Reverse Osmosis and ZLD Systems",
                "titleES": "Tratamiento de Aguas Residuales: Ósmosis Inversa y ZLD",
                "icon": "fa-solid fa-droplet",
                "readings": []
            },
            {
                "id": "env-m3",
                "title": "Carbon Capture, Utilization and Storage (CCUS) Technologies",
                "titleES": "Captura, Utilización y Almacenamiento de Carbono (CCUS)",
                "icon": "fa-solid fa-cloud-arrow-down",
                "readings": []
            },
            {
                "id": "env-m4",
                "title": "Circular Economy: Cradle-to-Cradle Life Cycle Assessment (LCA)",
                "titleES": "Economía Circular y Análisis de Ciclo de Vida (LCA)",
                "icon": "fa-solid fa-arrows-spin",
                "readings": []
            },
            {
                "id": "env-m5",
                "title": "ISO 14001 Environmental Auditing & Zero-Waste Certification",
                "titleES": "Auditorías ISO 14001 y Certificación Basura Cero",
                "icon": "fa-solid fa-clipboard-check",
                "readings": []
            }
        ]
    },
    "healthcare-tech": {
        "id": "healthcare-tech",
        "title": "Tecnología en Salud y Dispositivos Biomédicos",
        "titleEN": "Healthcare Technology",
        "category": "science",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "FDA 21 CFR Part 820 / ISO 13485 / IEC 60601 Medical Electrical",
        "conocer": "EC1290 (Inspección en Manufactura de Dispositivos Médicos)",
        "ngss": "Biomedical Engineering & Clinical Technology",
        "industry": "FDA Medical Device & HealthTech Nearshoring Standard",
        "icon": "fa-solid fa-heart-pulse",
        "description": "Regulación FDA 21 CFR 820, salas limpias médicas, biocompatibilidad ISO 10993, expedientes de diseño (DHF/DMR) y telesalud.",
        "modules": [
            {
                "id": "med-m1",
                "title": "Biomedical Cleanrooms & FDA Regulatory Compliance",
                "titleES": "Salas Limpias Biomédicas y Regulación FDA",
                "icon": "fa-solid fa-microscope",
                "readings": [
                    {
                        "id": "med-m1-r1",
                        "title": "ISO 13485 & FDA Medical Device Quality Assurance",
                        "duration": "10 min",
                        "content": "\n> **MedTech Regulatory Governance Note**: Medical device manufacturing facilities in Baja California (Tijuana/Mexicali) and Chihuahua operate under **FDA 21 CFR Part 820** Quality System Regulation (QSR), **ISO 13485** (Medical Devices Quality Management), and **ISO 14971** (Risk Management).\n\n# ISO 13485 & FDA Medical Device Quality Assurance: MedTech Nearshoring\n\nMexico is the **#1 medical device exporter in Latin America** and the **#1 supplier of medical devices to the United States**. Clusters in Tijuana and Juarez manufacture life-critical devices — including cardiac pacemakers, vascular catheters, orthopedic implants, surgical staplers, and IV delivery sets.\n\n## Regulatory Framework: FDA 21 CFR Part 820 & ISO 13485\n\nUnlike general manufacturing, medical device production operates under total regulatory enforcement where non-compliance leads to FDA Warning Letters, product recalls, or criminal penalties.\n\n### 1. CAPA (Corrective and Preventive Action)\nA mandatory structured quality system to investigate non-conformances, determine root causes using 5-Why analysis, implement corrective actions, and track long-term effectiveness.\n\n### 2. DHF (Design History File) & DMR (Device Master Record)\n- **DHF**: Compilation of engineering design records demonstrating that the device was developed according to approved Design Controls.\n- **DMR**: The complete \"recipe\" containing specs, drawings, assembly SOPs, and packaging requirements needed to manufacture a single unit.\n\n### 3. Biocompatibility (ISO 10993) & Sterilization Validation (ISO 11135)\nMedical devices contacting human blood or tissue must undergo strict **Biocompatibility Testing** to ensure zero cytotoxicity. Finished products undergo validated **Ethylene Oxide (EtO)** or **Gamma Irradiation** sterilization cycles prior to distribution.\n\n---\n\n> **Key Takeaway**: Biomedical manufacturing in Mexico relies on **FDA 21 CFR Part 820** and **ISO 13485** compliance. Fluency in technical English is vital for managing CAPA investigations, DHF documentation, and FDA audits.\n",
                        "vocabulary": [
                            {
                                "en": "CAPA (Corrective and Preventive Action)",
                                "es": "CAPA / Acciones Correctivas y Preventivas",
                                "definition": "Formal system to eliminate root causes of non-conformances"
                            },
                            {
                                "en": "DHF (Design History File)",
                                "es": "Expediente de Historia de Diseño",
                                "definition": "Records demonstrating device design control compliance"
                            },
                            {
                                "en": "DMR (Device Master Record)",
                                "es": "Registro Maestro del Dispositivo",
                                "definition": "Manufacturing recipes and drawings to build a device"
                            },
                            {
                                "en": "Biocompatibility",
                                "es": "Biocompatibilidad",
                                "definition": "Material safety when contacting human tissue"
                            },
                            {
                                "en": "Sterilization Validation",
                                "es": "Validación de Esterilización",
                                "definition": "Proving product sterilization reliability under ISO 11135"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is CAPA in medical device quality systems?",
                                "options": [
                                    "Capital Assignment Plan",
                                    "Corrective and Preventive Action to fix quality issues",
                                    "Cardiovascular Pressure Analysis",
                                    "Cleanroom Air Pump Assembly"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "materials-nanotech": {
        "id": "materials-nanotech",
        "title": "Ciencia de Materiales y Nanotecnología",
        "titleEN": "Materials Science & Nanotechnology",
        "category": "science",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "ASTM International Standards for Advanced Materials",
        "conocer": "EC1180 (Análisis de Propiedades de Materiales Avanzados)",
        "ngss": "Materials Science & Nanoscale Engineering",
        "industry": "Global Advanced Materials & Nano-Coatings Standard",
        "icon": "fa-solid fa-atom",
        "description": "Estructura atómica, polímeros avanzados, grafeno, nanotubos de carbono, microscopía electrónica (SEM/TEM) y recubrimientos PVD/CVD.",
        "modules": [
            {
                "id": "mat-m1",
                "title": "Crystal Lattice Structures, Miller Indices and Phase Diagrams",
                "titleES": "Estructuras Cristalinas, Índices de Miller y Diagramas de Fase",
                "icon": "fa-solid fa-cubes",
                "readings": []
            },
            {
                "id": "mat-m2",
                "title": "Carbon Nanomaterials: Graphene, Carbon Nanotubes and Fullerenes",
                "titleES": "Nanomateriales de Carbono: Grafeno y Nanotubos",
                "icon": "fa-solid fa-circle-nodes",
                "readings": []
            },
            {
                "id": "mat-m3",
                "title": "Electron Microscopy: SEM, TEM, AFM and Diffraction Spectroscopy",
                "titleES": "Microscopía Electrónica: SEM, TEM, AFM y Espectroscopía",
                "icon": "fa-solid fa-microscope",
                "readings": []
            },
            {
                "id": "mat-m4",
                "title": "Thin Film Deposition: PVD Sputtering, CVD and Atomic Layer Deposition",
                "titleES": "Deposición de Películas Delgadas: PVD, CVD y ALD",
                "icon": "fa-solid fa-layer-group",
                "readings": []
            },
            {
                "id": "mat-m5",
                "title": "Smart Polymers, Shape Memory Alloys (SMA) and Superconductors",
                "titleES": "Polímeros Inteligentes, Aleaciones SMA y Superconductores",
                "icon": "fa-solid fa-wand-magic-sparkles",
                "readings": []
            }
        ]
    },
    "food-science": {
        "id": "food-science",
        "title": "Ciencia de los Alimentos y Tecnología Agroindustrial",
        "titleEN": "Food Science & Technology",
        "category": "science",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "FDA FSMA / HACCP / ISO 22000 Food Safety Management",
        "conocer": "EC0081 (Procesamiento y Conservación de Alimentos)",
        "ngss": "Food Science, Nutrition & Agricultural Bioengineering",
        "industry": "Global Agri-Food Safety & Precision Processing Standard",
        "icon": "fa-solid fa-wheat-awn",
        "description": "Química de alimentos, procesamiento térmico (pasteurización, UHT), empaque en atmósfera modificada (MAP) y certificaciones HACCP.",
        "modules": [
            {
                "id": "gas-m1",
                "title": "Culinary Operations & HACCP Food Safety",
                "titleES": "Operaciones Culinarias y Inocuidad Alimentaria HACCP",
                "icon": "fa-solid fa-kitchen-set",
                "readings": [
                    {
                        "id": "gas-m1-r1",
                        "title": "Kitchen Brigade & Food Safety Terminology",
                        "duration": "10 min",
                        "content": "\n> **Culinary Excellence Standard Note**: High-end culinary management in international luxury resorts and Michelin-starred restaurants strictly enforces **HACCP** (Hazard Analysis Critical Control Point) and **ServSafe Manager** food safety protocols.\n\n# Kitchen Brigade System & HACCP Food Safety Governance\n\nIn luxury hospitality culinary hubs across Cancún, Riviera Maya, Los Cabos, and Mexico City, executive culinary teams operate under French classic hierarchy (*Brigade de Cuisine*) while communicating seamlessly in professional English with international guests and vendors.\n\n## 1. The Classical Kitchen Brigade Hierarchy\n\n1. **Executive Chef (Chef de Cuisine)**: Master culinary director managing menu development, food cost percentages (FCP), vendor purchasing contracts, and kitchen labor efficiency.\n2. **Sous Chef de Cuisine**: Second-in-command supervising line execution, expeding plates during high-volume service, and managing shift handovers.\n3. **Chef de Partie (Station Specialists)**:\n   - *Saucier*: Prepares stocks, reductions, and classic mother sauces.\n   - *Poissonier*: Specialist in seafood fabrication and precise fish cooking.\n   - *Grillardin / Rotisseur*: Directs open-flame grill operations and protein roasting.\n   - *Garde Manger*: Manages cold kitchen preparations, charcuterie, and hors d'oeuvres.\n\n## 2. HACCP Food Safety Protocols & Microbiological Controls\n\nPreventing foodborne illnesses requires microsecond temperature vigilance across storage and preparation zones:\n- **Temperature Danger Zone (TDZ)**: Bacteria multiply rapidly between **4°C and 60°C (40°F - 140°F)**. Perishable proteins must pass through this zone in less than 2 hours.\n- **Critical Control Points (CCPs)**: Mandatory temperature thresholds verified with calibrated digital probes (e.g., cooking poultry to 74°C / 165°F internal temperature for 15 seconds).\n- **Cross-Contamination Prevention**: Color-coded cutting board protocols (Red = Raw Meat, Blue = Raw Seafood, Green = Produce, Yellow = Poultry).\n\n---\n\n> **Key Takeaway**: Professional culinary leadership combines **Brigade de Cuisine** station management with strict **HACCP** food safety monitoring in English to maintain 5-Star guest standards.\n",
                        "vocabulary": [
                            {
                                "en": "HACCP",
                                "es": "HACCP / Análisis de Peligros y Puntos Críticos",
                                "definition": "Systematic preventive approach to food safety"
                            },
                            {
                                "en": "Sous Chef",
                                "es": "Sub-Chef / Segundo al Mando",
                                "definition": "Direct assistant to the executive chef"
                            },
                            {
                                "en": "Cross-Contamination",
                                "es": "Contaminación Cruzada",
                                "definition": "Unintentional transfer of pathogens between foods"
                            },
                            {
                                "en": "Mise en Place",
                                "es": "Mise en Place / Todo en su Lugar",
                                "definition": "Preparation and organizing of ingredients before cooking"
                            },
                            {
                                "en": "Temperature Danger Zone",
                                "es": "Zona de Peligro de Temperatura",
                                "definition": "Range between 4°C and 60°C where bacteria grow rapidly"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What is the Temperature Danger Zone for food safety under HACCP?",
                                "options": [
                                    "Below 0°C",
                                    "Between 4°C and 60°C (40°F-140°F)",
                                    "Above 100°C",
                                    "There is no danger zone"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "aviation-english": {
        "id": "aviation-english",
        "title": "Inglés Aeronáutico y Radiotelefonía OACI",
        "titleEN": "Aviation English",
        "category": "career",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "ICAO Annex 1 Language Proficiency / FAA AC 60-28",
        "conocer": "EC1295 (Comunicaciones Aeronáuticas y Radiotelefonía)",
        "ngss": "Aviation Communications & Aeronautical Science",
        "industry": "ICAO Operational Level 4-6 Standard",
        "icon": "fa-solid fa-plane-departure",
        "description": "Fraseología aeronáutica estándar OACI, radiotelefonía con control de tráfico aéreo (ATC), colaciones obligatorias (readbacks) y meteorología METAR.",
        "modules": [
            {
                "id": "aveng-m1",
                "title": "ICAO Standard Radiotelephony & Emergency Readbacks",
                "titleES": "Radiotelefonía Estándar OACI y Colaciones de Emergencia",
                "icon": "fa-solid fa-headset",
                "readings": [
                    {
                        "id": "aveng-m1-r1",
                        "title": "ICAO Standard Phraseology: Clear Readback, Runway Safety, and Critical Radiotelephony",
                        "duration": "10 min",
                        "content": "\n> **International Aviation Standard Note**: This curriculum is structured in accordance with **ICAO Annex 1** (Personnel Licensing — Language Proficiency Requirements), **ICAO Doc 9835** (Manual on the Implementation of ICAO Language Proficiency Requirements), and **ICAO Doc 4444** (Air Traffic Management).\n\n# ICAO Standard Phraseology: Clear Readback, Runway Safety, and Critical Radiotelephony\n\nIn international civil aviation, language ambiguity is a direct flight safety hazard. Historically, misheard clearances, non-standard slang, and hearback errors have contributed to catastrophic aviation disasters (such as the 1977 Tenerife airport collision). In response, the **International Civil Aviation Organization (ICAO)** mandates that all pilots and air traffic controllers (ATCs) operating across international airspace demonstrate minimum **ICAO Operational Level 4** proficiency in English.\n\n## 1. The Core Purpose of Standard Phraseology\n\nAviation English is not general conversational English; it is a highly structured, unambiguous, closed-loop communications protocol. **Standard Phraseology** is engineered to:\n- Maximize voice transmission clarity over noisy, low-bandwidth High-Frequency (HF) and Very High-Frequency (VHF) amplitude-modulated (AM) radio channels.\n- Eliminate regional idioms, cultural idioms, and conversational fillers (\"um\", \"like\", \"you know\").\n- Ensure immediate comprehension across multinational flight crews and controllers whose native languages differ.\n\n## 2. Phonetic Alphabet and Numerical Pronunciation\n\nTo prevent phonetic confusion between similar-sounding letters and digits, ICAO specifies strict pronunciation rules:\n- **Letters**: *Alfa, Bravo, Charlie, Delta, Echo, Foxtrot... Zulu*.\n- **Numbers**:\n  - `3` is pronounced **\"TREE\"** (avoiding confusion with \"three\" / \"free\").\n  - `4` is pronounced **\"FOW-er\"**.\n  - `5` is pronounced **\"FIFE\"** (preventing confusion with \"fire\" or \"nine\").\n  - `9` is pronounced **\"NIN-er\"** (preventing acoustic confusion with German \"nein\").\n  - Decimals are explicitly spoken as **\"DAY-SEE-MAL\"** (e.g., VHF frequency 118.7 is spoken *\"ONE ONE EIGHT DECIMAL SEVEN\"*).\n\n## 3. Strict Readback Mandates: Closed-Loop Communication\n\nIn aviation radio communications, saying *\"Roger\"* or *\"Copy\"* does **NOT** confirm that a safety-critical instruction was understood. A controller cannot verify what a pilot actually heard unless the pilot reads back the exact operational parameters.\n\nUnder ICAO Doc 4444, flight crews **MUST** read back all parts of the following clearances verbatim:\n1. **Runway in Use, Hold Short Instructions, and Clearances to Enter, Land, Take Off, or Backtrack on any Runway**.\n2. **Altimeter Settings (QNH / QFE)**: Failure to correctly set atmospheric altimeter pressure leads directly to Controlled Flight Into Terrain (CFIT).\n3. **Assigned Heading, Speed, and Altitude / Flight Level (FL)**.\n4. **Secondary Surveillance Radar (SSR) Transponder Codes (\"Squawk\" codes)**.\n5. **Frequency Handoffs to Next Sector**.\n\n### Operational Dialogue Example:\n> **Controller**: *\"AeroMexico 402, climb and maintain Flight Level 280, turn right heading 090, squawk 4321.\"*  \n> **Pilot**: *\"Climb and maintain Flight Level 280, turn right heading 090, squawk 4321, AeroMexico 402.\"*\n\nIf the pilot had simply replied *\"Roger, AeroMexico 402\"*, the controller would immediately intervene: *\"AeroMexico 402, read back altitude and squawk.\"*\n\n## 4. Runway Incursions and \"Hold Short\" Discipline\n\nRunway incursions remain the #1 ground safety risk at international aerodromes. When instructed to *\"Taxi to Runway 23L, hold short of Runway 23R\"*, the phrase **\"HOLD SHORT\"** is legally binding. The aircraft must come to a complete stop prior to crossing the solid yellow double line. If a pilot fails to say \"Hold short\" in the readback, the controller is required by federal aviation regulations to reissue the restriction and obtain an explicit verbal readback.\n\n---\n\n> **Key Takeaway**: Aeronautical radiotelephony is a zero-tolerance protocol founded on **ICAO standard phraseology**, **phonetic clarity (Fife, Niner)**, and **mandatory closed-loop readbacks**. Fluency in standard aviation English guarantees clear coordination between flight decks and international ATC towers.\n",
                        "vocabulary": [
                            {
                                "en": "Readback",
                                "es": "Colación / Lectura de Confirmación",
                                "definition": "Repetition by the flight crew of ATC clearances to verify accurate comprehension"
                            },
                            {
                                "en": "Hold Short",
                                "es": "Mantener Fuera / Mantener Antes de",
                                "definition": "Mandatory instruction requiring an aircraft to stop before a designated runway or taxiway"
                            },
                            {
                                "en": "Altimeter Setting (QNH)",
                                "es": "Ajuste Altimétrico (QNH)",
                                "definition": "Barometric pressure setting calibrated to mean sea level, ensuring correct altitude readout"
                            },
                            {
                                "en": "Squawk Code",
                                "es": "Código Transponder (Squawk)",
                                "definition": "Four-digit discrete octal code assigned by ATC for radar identification"
                            },
                            {
                                "en": "Hearback Error",
                                "es": "Error de Escucha (Hearback)",
                                "definition": "Failure of a controller to notice a pilot's incorrect readback of a clearance"
                            },
                            {
                                "en": "Standard Phraseology",
                                "es": "Fraseología Estándar",
                                "definition": "Uniform set of words and concise terms authorized by ICAO for aviation radiotelephony"
                            }
                        ],
                        "questions": [
                            {
                                "q": "Why is saying only 'Roger' or 'Copy' unacceptable for safety-critical ATC clearances?",
                                "options": [
                                    "It is too polite",
                                    "It fails closed-loop communication; ATC cannot confirm the pilot heard the correct altitude or runway",
                                    "It wastes radio battery",
                                    "It disconnects the autopilot"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "How is the number '9' explicitly pronounced in ICAO standard radiotelephony?",
                                "options": [
                                    "Nine",
                                    "Niner",
                                    "Nueve",
                                    "Nein"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does the ATC command 'Hold Short of Runway 05' legally require the pilot to do?",
                                "options": [
                                    "Accelerate and cross quickly",
                                    "Stop completely before the runway holding line and read back the instruction",
                                    "Turn around and return to the gate",
                                    "Shut down the engines"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is the minimum ICAO Language Proficiency Level required for international commercial pilots?",
                                "options": [
                                    "Level 1 Elementary",
                                    "Level 2 Pre-operational",
                                    "Level 4 Operational",
                                    "Level 10 Master"
                                ],
                                "answer": 2
                            }
                        ]
                    }
                ]
            },
            {
                "id": "aveng-m2",
                "title": "Air Traffic Control (ATC) Clearances & Radar Vectoring",
                "titleES": "Autorizaciones ATC y Vectores Radar",
                "icon": "fa-solid fa-tower-observation",
                "readings": []
            },
            {
                "id": "aveng-m3",
                "title": "Aviation Meteorology: Decoding METAR, TAF & SIGMET",
                "titleES": "Meteorología Aeronáutica: Reportes METAR y TAF",
                "icon": "fa-solid fa-cloud-bolt",
                "readings": []
            },
            {
                "id": "aveng-m4",
                "title": "Crew Resource Management (CRM) & Cockpit Communication",
                "titleES": "Gestión de Recursos de Cabina (CRM) y Comunicación",
                "icon": "fa-solid fa-users",
                "readings": []
            },
            {
                "id": "aveng-m5",
                "title": "Emergency Communications: Pan-Pan, Mayday & Escalation",
                "titleES": "Comunicaciones de Emergencia: Pan-Pan, Mayday y Contingencias",
                "icon": "fa-solid fa-triangle-exclamation",
                "readings": []
            }
        ]
    },
    "airforce-aerospace": {
        "id": "airforce-aerospace",
        "title": "Inglés Aeroespacial Militar y de Defensa",
        "titleEN": "Air Force Aerospace English",
        "category": "career",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "NATO STANAG 6001 Language Proficiency / MIL-STD-1553",
        "conocer": "EC1460 (Operaciones y Mantenimiento de Sistemas de Defensa)",
        "ngss": "Defense Aerospace Engineering & Supersonic Aerodynamics",
        "industry": "Global Defense Aerospace & Military Aviation Standard",
        "icon": "fa-solid fa-jet-fighter",
        "description": "Aerodinámica supersónica, aviónica de combate (radar AESA, HUD), redes tácticas de enlace de datos (Link 16), normas OTAN STANAG y códigos breves.",
        "modules": [
            {
                "id": "af-m1",
                "title": "Tactical Flight Operations & Supersonic Aerodynamics",
                "titleES": "Operaciones de Vuelo Táctico y Aerodinámica Supersónica",
                "icon": "fa-solid fa-gauge-high",
                "readings": [
                    {
                        "id": "af-m1-r1",
                        "title": "Supersonic Flight Envelopes: Transonic Drag, Shock Waves, and Tactical Maneuvering",
                        "duration": "10 min",
                        "content": "\n> **Defense Aerospace Curriculum Note**: This module aligns with **NATO STANAG 6001** (Language Proficiency Levels for Defense Personnel) and **MIL-STD-1797** (Flying Qualities of Piloted Aircraft), preparing technical officers and defense contractors for cross-national aerospace integration.\n\n# Supersonic Flight Envelopes: Transonic Drag, Shock Waves, and Tactical Maneuvering\n\nIn military aerospace engineering and air combat operations, tactical aircraft operate across extreme velocity regimes. Understanding supersonic flight dynamics, structural load limits, and tactical communications requires deep technical fluency in aeronautical defense English.\n\n## 1. Aerodynamic Velocity Regimes and Mach Numbers\n\nAircraft airspeed is evaluated relative to the local speed of sound ($a$) via the dimensionless **Mach Number** ($M = v / a$):\n- **Subsonic Flow ($M < 0.8$)**: Airflow across the entire airframe remains below the speed of sound. Air is treated as an incompressible fluid.\n- **Transonic Flow ($0.8 \\le M < 1.2$)**: The most volatile aerodynamic regime. While the free-stream airspeed may be Mach 0.85, air accelerating over the curved upper surface of the wing reaches local supersonic speeds ($M > 1.0$). This creates local **shock waves** and induces massive **wave drag** and turbulent boundary layer separation (\"Mach Tuck\").\n- **Supersonic Flow ($1.2 \\le M < 5.0$)**: The entire aircraft moves faster than the speed of sound. Oblique shock waves form at the nose cone and leading wing edges.\n- **Hypersonic Flow ($M \\ge 5.0$)**: Aerodynamic friction causes extreme molecular dissociation and high-temperature plasma ionization.\n\nTo minimize transonic wave drag, supersonic military aircraft incorporate thin, highly swept delta wings, sharp leading edges, and the aerodynamic **Whitcomb Area Rule** (pinched \"coke-bottle\" fuselage geometry that smoothly transitions cross-sectional area).\n\n## 2. The Flight Envelope (V-n Diagram) and G-Limits\n\nA fighter jet's operational capabilities are strictly defined by its **Flight Envelope**, plotted on a Velocity-Load Factor (**V-n**) diagram:\n- **Load Factor ($n$)**: The ratio of aerodynamic lift ($L$) to aircraft weight ($W$), measured in gravitational units ($g$):\n  $$n = \\frac{L}{W}$$\n- **Corner Velocity ($V_c$)**: The minimum airspeed at which the pilot can pull the maximum design structural load factor (typically **$+9.0g$** in modern fighters like the F-16 or F-35) without aerodynamic stalling. It yields the sharpest possible instantaneous turn radius.\n- **Structural Limits**: Exceeding the maximum positive or negative $g$-limits causes structural airframe plastic deformation, wing spar shear failure, or catastrophic loss of pilot consciousness (**G-LOC** — G-induced Loss of Consciousness).\n\n## 3. NATO Tactical Brevity Words\n\nDuring air combat maneuvering and joint military exercises, multinational flight leads communicate over secure tactical radios using standardized **NATO Brevity Codes**:\n- **\"Bogeys\"**: An unidentified radar or visual contact.\n- **\"Bandit\"**: A contact positively identified as an enemy aircraft (does not automatically imply authority to engage).\n- **\"Fox Three\"**: Simulated or live launch of an active radar-guided missile (such as the AIM-120 AMRAAM).\n- **\"Tally\"**: Sighting of a target, bandit, or bogey visually.\n- **\"Bingo Fuel\"**: Fuel state requiring immediate departure from the operational combat area to return safely to base.\n\n---\n\n> **Key Takeaway**: Military aerospace engineering synthesizes **supersonic fluid mechanics (shock wave formation, Area Rule)** with physiological **flight envelope boundaries ($+9g$ load limits, V-n diagrams)** and **NATO tactical brevity codes**. Mastery of these specialized English terms enables defense engineers, flight technicians, and liaison officers to operate in multinational defense programs.\n",
                        "vocabulary": [
                            {
                                "en": "Mach Number",
                                "es": "Número Mach",
                                "definition": "Ratio of aircraft true airspeed to the local speed of sound in the surrounding medium"
                            },
                            {
                                "en": "Wave Drag",
                                "es": "Resistencia de Onda",
                                "definition": "Dramatic increase in aerodynamic drag caused by shock wave formation at transonic speeds"
                            },
                            {
                                "en": "Flight Envelope (V-n)",
                                "es": "Envolvente de Vuelo (Diagrama V-n)",
                                "definition": "Boundary diagram delineating safe structural airspeed and g-load limitations"
                            },
                            {
                                "en": "Corner Velocity",
                                "es": "Velocidad de Esquina (Corner Speed)",
                                "definition": "Airspeed at which maximum instantaneous turn rate and structural g-limit coincide"
                            },
                            {
                                "en": "Tactical Brevity Code",
                                "es": "Código Breve Táctico (NATO)",
                                "definition": "Standardized military words providing concise, unambiguous tactical commands over radio"
                            },
                            {
                                "en": "G-LOC",
                                "es": "G-LOC (Pérdida de Conciencia Inducida por Fuerza G)",
                                "definition": "Loss of pilot consciousness caused by blood draining from the brain under high g-forces"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What aerodynamic phenomenon causes extreme drag rise in the Transonic regime (Mach 0.8 - 1.2)?",
                                "options": [
                                    "Engine flameout",
                                    "Shock wave formation and boundary layer separation over the wing",
                                    "Fuel tank freezing",
                                    "Rudder disconnect"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What does the NATO brevity term 'Bingo Fuel' communicate to mission commanders?",
                                "options": [
                                    "The aircraft has refueled to 100%",
                                    "The aircraft has reached critical minimum fuel and must return to base immediately",
                                    "The fuel pump has failed",
                                    "Drop all external fuel tanks"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "What is Corner Velocity on a fighter aircraft's V-n Flight Envelope?",
                                "options": [
                                    "The speed required to taxi around runway corners",
                                    "The airspeed that allows pulling maximum structural g-load for the sharpest turn radius",
                                    "The landing stall speed",
                                    "The speed of sound at sea level"
                                ],
                                "answer": 1
                            },
                            {
                                "q": "Which NATO brevity phrase announces the launch of an active radar-guided missile (like AIM-120)?",
                                "options": [
                                    "Guns Guns Guns",
                                    "Fox Three",
                                    "Raygun",
                                    "Winchester"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            },
            {
                "id": "af-m2",
                "title": "Military Avionics: HUD, AESA Radar & EW Suites",
                "titleES": "Aviónica Militar: HUD, Radar AESA y Guerra Electrónica",
                "icon": "fa-solid fa-crosshairs",
                "readings": []
            },
            {
                "id": "af-m3",
                "title": "Tactical Data Networks: Link 16 & C4ISR Architecture",
                "titleES": "Redes Tácticas de Datos: Link 16 y C4ISR",
                "icon": "fa-solid fa-satellite-dish",
                "readings": []
            },
            {
                "id": "af-m4",
                "title": "NATO STANAG Compliance & Multinational Interoperability",
                "titleES": "Cumplimiento OTAN STANAG e Interoperabilidad",
                "icon": "fa-solid fa-file-shield",
                "readings": []
            },
            {
                "id": "af-m5",
                "title": "Defense Aerospace MRO, Airframe Depot Maintenance & AS9110",
                "titleES": "Mantenimiento MRO Militar y Norma AS9110",
                "icon": "fa-solid fa-wrench",
                "readings": []
            }
        ]
    },
    "hospitality-food": {
        "id": "hospitality-food",
        "title": "Inglés para Hotelería, Gastronomía y Servicios",
        "titleEN": "Hospitality & Food Service English",
        "category": "career",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "Forbes Travel Guide 5-Star / AHLA Standards",
        "conocer": "EC0309 (Servicios Hoteleros y Atención al Huésped)",
        "ngss": "Hospitality Operations & Customer Experience Leadership",
        "industry": "Luxury International Resort & Forbes 5-Star Standard",
        "icon": "fa-solid fa-hotel",
        "description": "Inglés de hospitalidad Forbes 5-Star, gestión de reservaciones en sistemas PMS, atención al huésped VIP y servicio gastronómico internacional.",
        "modules": [
            {
                "id": "hosp-m1",
                "title": "Front Office Operations & VIP Concierge",
                "titleES": "Operaciones de Recepción y Concierge VIP",
                "icon": "fa-solid fa-concierge-bell",
                "readings": [
                    {
                        "id": "hosp-m1-r1",
                        "title": "Forbes 5-Star Service Standards & Guest Experience",
                        "duration": "10 min",
                        "content": "\n> **Luxury Hospitality Standard Note**: Ultra-luxury resorts and boutique hotels measure customer service excellence using **Forbes Travel Guide 5-Star Rating System** benchmarks and **AHLA** (American Hotel & Lodging Association) standards.\n\n# Forbes 5-Star Service Standards & VIP Guest Experience\n\nIn premier Mexican luxury destinations — including Los Cabos, Punta Mita, Riviera Maya, and Mexico City — hospitality leaders must execute impeccable verbal and written English to deliver personalized 5-Star guest experiences.\n\n## Core Financial & Operational Hospitality Metrics\n\n1. **ADR (Average Daily Rate)**: Key performance metric calculating average rental revenue earned per occupied room:\n   $$\text{ADR} = \frac{\text{Total Room Revenue}}{\text{Number of Rooms Sold}}$$\n2. **RevPAR (Revenue Per Available Room)**: The ultimate financial health metric of a resort:\n   $$\text{RevPAR} = \text{ADR} \times \text{Occupancy Rate}$$\n3. **Property Management System (PMS)**: Central software suite (e.g., Opera PMS) managing reservations, guest folios, housekeeping room status, and guest preference profiles.\n\n## Forbes 5-Star Service Standards Execution\n\nThe Forbes 5-Star inspection evaluates over 900 rigorous standards across guest interactions:\n- **First Impression & Arrival**: Greeting guests within 30 seconds of arrival using guest name recognition, providing chilled towels and signature welcome beverages.\n- **Anticipatory Service**: Staff must anticipate guest needs before they are requested (e.g., placing lens wiping cloths next to sunglasses by the pool).\n- **Service Recovery Protocol (LAST Model)**:\n  - **L**isten: Attentively without interruption.\n  - **A**pologize: Sincerely on behalf of the resort.\n  - **S**olve: Offer immediate resolution options.\n  - **T**hank: Thank the guest for bringing the issue to light.\n\n---\n\n> **Key Takeaway**: Delivering luxury guest experiences requires polished English communication, PMS operational control, and adherence to **Forbes 5-Star Service Standards**.\n",
                        "vocabulary": [
                            {
                                "en": "RevPAR",
                                "es": "RevPAR / Ingreso por Habitación Disponible",
                                "definition": "Revenue per available room metric"
                            },
                            {
                                "en": "Concierge",
                                "es": "Concierge / Atención Personalizada",
                                "definition": "Hotel staff member assisting guests with bookings and services"
                            },
                            {
                                "en": "Turn-Down Service",
                                "es": "Servicio Nocturno / Arreglo de Cama",
                                "definition": "Evening housekeeping service preparing room for sleep"
                            },
                            {
                                "en": "Service Recovery",
                                "es": "Recuperación del Servicio",
                                "definition": "Action taken to resolve a guest issue effectively"
                            },
                            {
                                "en": "ADR (Average Daily Rate)",
                                "es": "Tarifa Promedio Diaria",
                                "definition": "Average room revenue earned per occupied room"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does RevPAR stand for in hotel management?",
                                "options": [
                                    "Revenue Per Available Room",
                                    "Review Public Rating",
                                    "Restaurant Visitor Price",
                                    "Room Rental Value"
                                ],
                                "answer": 0
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "business-leadership": {
        "id": "business-leadership",
        "title": "Inglés para Negocios, Liderazgo y Gestión",
        "titleEN": "Business, Leadership & Management English",
        "category": "career",
        "level": "A2-B1",
        "status": "full",
        "totalModules": 5,
        "standard": "ISO 30414 Human Resource Management / USMCA Labor Standards",
        "conocer": "EC0305 (Gestión de Recursos Humanos y Liderazgo)",
        "ngss": "Executive Leadership & Organizational Operations",
        "industry": "Global C-Suite & Nearshoring Management Standard",
        "icon": "fa-solid fa-briefcase",
        "description": "Inglés corporativo para presentaciones a directivos (Board decks), entrevistas técnicas STAR, auditorías laborales T-MEC y liderazgo transcultural.",
        "modules": [
            {
                "id": "hr-m1",
                "title": "Engineering Recruitment & Labor Audit Compliance",
                "titleES": "Reclutamiento de Ingenieros y Auditorías Laborales",
                "icon": "fa-solid fa-user-check",
                "readings": [
                    {
                        "id": "hr-m1-r1",
                        "title": "Technical Interviewing & Labor Standards",
                        "duration": "10 min",
                        "content": "\n> **Industrial HR Compliance Note**: Human Resources management in nearshoring manufacturing plants is governed by **USMCA Labor Chapter 23 / Annex 31-A** (Rapid Response Labor Mechanism - RRLM), **ISO 30414** (Human Capital Reporting), and **NOM-035-STPS** (Psychosocial Risk Factors in the Workplace).\n\n# Technical Interviewing & Labor Audit Compliance: Industrial HR\n\nIn multi-national nearshoring plants across Monterrey, Tijuana, and Querétaro, Industrial HR and Talent Acquisition leads act as the primary bridge between U.S. corporate executive leadership and local plant operations. Fluency in technical English is essential for conducting engineering interviews, negotiating collective bargaining agreements, and surviving federal labor audits.\n\n## 1. Technical Screening & The STAR Interview Method\n\nWhen recruiting specialized roles (e.g., Quality Engineers, Embedded Systems Developers, CNC Programmers), HR managers utilize the structured **STAR Method** in English:\n- **Situation**: Candidate describes a specific technical challenge at a previous manufacturing plant.\n- **Task**: Candidate outlines their core responsibilities under tight production deadlines.\n- **Action**: Candidate explains their engineering interventions (e.g., 8D Problem Solving, Root Cause Analysis).\n- **Result**: Candidate quantifies measurable outcomes (e.g., reduced scrap rate by 14%, improved overall equipment effectiveness - OEE).\n\n## 2. USMCA Annex 31-A & Rapid Response Labor Mechanism (RRLM) Audits\n\nUnder **T-MEC Annex 31-A**, U.S. and Mexican labor authorities conduct unannounced plant audits:\n- **Freedom of Association & Collective Bargaining**: Verifying that workers freely elect union representatives via secret ballot without factory management interference.\n- **Remediation Plan Execution**: HR teams must draft formal English response reports to the U.S. Department of Labor (USDOL) within 45 days if labor violations are alleged, preventing potential tariff penalties or border blockades on plant exports.\n\n## 3. Onboarding, EHS Safety Protocols & Work Instructions\n\nBeyond labor audits, Industrial HR leads direct bilingual orientation and safety indoctrination programs:\n- **EHS (Environmental Health and Safety) Compliance**: Enforcing OSHA and STPS safety protocols (Personal Protective Equipment - PPE, Lockout/Tagout - LOTO awareness, hazardous chemical handling under GHS).\n- **Standard Operating Procedures (SOPs)**: Ensuring assembly line workers and technicians understand English work instructions, defect logging, and quality escalation paths.\n\n## 4. NOM-035 & ISO 30414 Human Capital Metrics\n\nIndustrial HR tracks human capital key performance indicators (KPIs) to align with global corporate governance:\n- **Turnover Rate (Atrición)**: Monitoring monthly attrition percentages across assembly shifts and exit interview insights.\n- **NOM-035 Psychosocial Risk Audits**: Evaluating workplace stress, shift rotation fatigue, and anti-harassment protocols to maintain compliance with Mexican Labor Law (LFT).\n\n## 5. Expatriate Management & Global Mobility\n\nNearshoring facilities frequently host foreign engineering directors and expat specialists:\n- **Bilingual Onboarding Packages**: Drafting dual-language employment contracts, temporary work visa filings with INM (Instituto Nacional de Migración), and housing allowance packages.\n- **Cross-Cultural Leadership Workshops**: Facilitating communication alignment between American/Asian executive leadership and Mexican plant supervisors.\n\n---\n\n> **Key Takeaway**: Industrial HR specialists must master **STAR technical interviewing** and ensure plant compliance with **USMCA Annex 31-A (RRLM)**, **EHS safety protocols**, and **NOM-035** standards to protect export supply chains.\n",
                        "vocabulary": [
                            {
                                "en": "Talent Acquisition",
                                "es": "Atracción de Talento",
                                "definition": "Process of identifying and hiring skilled workers"
                            },
                            {
                                "en": "Onboarding",
                                "es": "Inducción / Integración",
                                "definition": "Process of integrating new employees into an organization"
                            },
                            {
                                "en": "EHS (Environmental Health and Safety)",
                                "es": "Seguridad y Medio Ambiente",
                                "definition": "Department managing workplace health and environmental rules"
                            },
                            {
                                "en": "Competency Screening",
                                "es": "Evaluación por Competencias",
                                "definition": "Interviewing based on specific skills and behaviors"
                            }
                        ],
                        "questions": [
                            {
                                "q": "What does EHS stand for in industrial HR?",
                                "options": [
                                    "Electric Heat System",
                                    "Environmental Health and Safety",
                                    "Employee Housing Service",
                                    "Executive Hiring Staff"
                                ],
                                "answer": 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "project-management": {
        "id": "project-management",
        "title": "Gestión de Proyectos y Comunicación Profesional",
        "titleEN": "Project Management & Professional Communication",
        "category": "career",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "PMI PMBOK Guide 7th Edition / Agile Scrum Alliance",
        "conocer": "EC0435 (Gestión de Proyectos de Base Tecnológica)",
        "ngss": "Project Engineering & Stakeholder Communications",
        "industry": "Global PMI PMP & Agile Enterprise Standard",
        "icon": "fa-solid fa-list-check",
        "description": "Metodologías Agile y Scrum, diagramas Gantt, gestión de riesgos (FMEA), entregables contractuales y comunicación técnica con clientes de EE.UU.",
        "modules": [
            {
                "id": "pm-m1",
                "title": "Agile & Scrum Frameworks: Sprints, Epics and User Stories",
                "titleES": "Metodologías Agile y Scrum: Sprints e Historias de Usuario",
                "icon": "fa-solid fa-person-running",
                "readings": []
            },
            {
                "id": "pm-m2",
                "title": "Critical Path Method (CPM), Gantt Charts and Resource Leveling",
                "titleES": "Método de Ruta Crítica (CPM) y Nivelación de Recursos",
                "icon": "fa-solid fa-timeline",
                "readings": []
            },
            {
                "id": "pm-m3",
                "title": "Project Risk Management: FMEA Matrix and Mitigation Plans",
                "titleES": "Gestión de Riesgos del Proyecto y Matriz FMEA",
                "icon": "fa-solid fa-shield-halved",
                "readings": []
            },
            {
                "id": "pm-m4",
                "title": "Stakeholder Communication & Conflict Resolution in Tech Projects",
                "titleES": "Comunicación con Stakeholders y Resolución de Conflictos",
                "icon": "fa-solid fa-comments",
                "readings": []
            },
            {
                "id": "pm-m5",
                "title": "Statement of Work (SOW), SLA Governance and Milestone Sign-Off",
                "titleES": "Declaración de Trabajo (SOW), SLAs y Cierre de Hitos",
                "icon": "fa-solid fa-file-signature",
                "readings": []
            }
        ]
    },
    "entrepreneurship": {
        "id": "entrepreneurship",
        "title": "Emprendimiento e Innovación Tecnológica",
        "titleEN": "Entrepreneurship & Innovation English",
        "category": "career",
        "level": "A2-B1",
        "status": "catalog_blueprint",
        "totalModules": 5,
        "standard": "Venture Capital Due Diligence / Lean Startup Methodology",
        "conocer": "EC0777 (Desarrollo y Lanzamiento de Startups)",
        "ngss": "Technological Entrepreneurship & Venture Finance",
        "industry": "Global Silicon Valley & LATAM Tech Startup Standard",
        "icon": "fa-solid fa-rocket",
        "description": "Inglés para pitch de inversión, rondas de capital de riesgo (VC), hojas de términos (Term Sheets), modelo Lean Canvas y validación de mercado.",
        "modules": [
            {
                "id": "ent-m1",
                "title": "The Pitch Deck: Hook, Problem-Solution Fit and Market Sizing (TAM/SAM/SOM)",
                "titleES": "El Pitch Deck: Ajuste Problema-Solución y Tamaño de Mercado",
                "icon": "fa-solid fa-chart-pie",
                "readings": []
            },
            {
                "id": "ent-m2",
                "title": "Venture Capital Financing: SAFE Agreements, Seed Rounds and Cap Tables",
                "titleES": "Financiamiento VC: Acuerdos SAFE y Tablas de Capitalización",
                "icon": "fa-solid fa-coins",
                "readings": []
            },
            {
                "id": "ent-m3",
                "title": "Term Sheets: Pre-Money Valuation, Liquidation Preference and Vesting",
                "titleES": "Hojas de Términos: Valuación Pre-Money y Preferencias",
                "icon": "fa-solid fa-handshake",
                "readings": []
            },
            {
                "id": "ent-m4",
                "title": "Lean Startup: Minimum Viable Product (MVP) and Pivot Strategies",
                "titleES": "Lean Startup: Producto Mínimo Viable (MVP) y Estrategias Pivot",
                "icon": "fa-solid fa-rotate-left",
                "readings": []
            },
            {
                "id": "ent-m5",
                "title": "Intellectual Property: Patents, Trade Secrets and International Licensing",
                "titleES": "Propiedad Intelectual: Patentes, Secretos y Licenciamiento",
                "icon": "fa-solid fa-certificate",
                "readings": []
            }
        ]
    }
};

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
