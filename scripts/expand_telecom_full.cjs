const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coursesPath = path.resolve(__dirname, '../content/courses.js');
const rawCode = fs.readFileSync(coursesPath, 'utf8');

const sandbox = { window: {}, module: { exports: {} } };
vm.runInNewContext(rawCode, sandbox);
const { LXP_CATEGORIES, LXP_COURSES } = sandbox;

console.log('Expanding Telecom & IoT Modules 2-5...');

const track = LXP_COURSES["telecom-iot"];
if (!track) {
    console.log("Track telecom-iot not found!");
    process.exit(1);
}

// Module 2: 5G New Radio (NR) & Private Industrial Cellular Networks
track.modules[1] = {
    id: "iot-m2",
    title: "5G New Radio (NR) & Private Industrial Cellular Networks",
    titleES: "5G New Radio y Redes Celulares Privadas Industriales",
    readings: [
        {
            id: "iot-m2-r1",
            title: "Private 5G Networks in Smart Factories",
            duration: "10 min",
            content: `
# Private 5G Networks in Smart Factories

The implementation of Industry 4.0 relies heavily on wireless connectivity. While Wi-Fi is common, **Private 5G Networks** are becoming the standard for mission-critical industrial applications.

## What is a Private 5G Network?

A private 5G network is a cellular network built specifically for an enterprise (like a factory, port, or mine). Unlike public 5G networks operated by carriers, a private network is owned and controlled entirely by the company, utilizing unlicensed or dedicated spectrum (like CBRS in the US).

## Key Advantages of 5G for Industry

1. **URLLC (Ultra-Reliable Low-Latency Communication)**: Achieves latency below 1 millisecond. This is critical for robotic arms, automated guided vehicles (AGVs), and safety systems.
2. **eMBB (Enhanced Mobile Broadband)**: Provides massive bandwidth for transmitting high-resolution video streams for AI quality inspection.
3. **mMTC (Massive Machine-Type Communications)**: Supports up to 1 million devices per square kilometer, perfect for dense sensor networks.

## Wi-Fi vs. 5G in Manufacturing

While Wi-Fi is cheaper to deploy, 5G offers **seamless mobility** without connection drops as devices (like drones or robots) move around a large facility. It also provides better security and protection against interference.

---
> **Key Takeaway**: Private 5G provides the low latency, high reliability, and massive device density needed for advanced robotics and automation.
`,
            vocabulary: [
                {
                    en: "Latency",
                    es: "Latencia",
                    definition: "The time it takes for data to travel from its source to its destination."
                },
                {
                    en: "Bandwidth",
                    es: "Ancho de banda",
                    definition: "The maximum rate of data transfer across a given path."
                },
                {
                    en: "Automated Guided Vehicle (AGV)",
                    es: "Vehículo Guiado Automáticamente",
                    definition: "Mobile robots used in industrial applications to move materials."
                },
                {
                    en: "Spectrum",
                    es: "Espectro (de radiofrecuencia)",
                    definition: "The range of electromagnetic radio frequencies used for wireless communication."
                }
            ]
        }
    ],
    quiz: []
};

// Module 3: LPWAN Technologies: LoRaWAN and NB-IoT Deployment
track.modules[2] = {
    id: "iot-m3",
    title: "LPWAN Technologies: LoRaWAN and NB-IoT Deployment",
    titleES: "Tecnologías LPWAN: Despliegue de LoRaWAN y NB-IoT",
    readings: [
        {
            id: "iot-m3-r1",
            title: "Introduction to LoRaWAN",
            duration: "10 min",
            content: `
# Introduction to LoRaWAN

When we need to connect sensors over vast distances (like across a city or a large agricultural farm), Wi-Fi and Bluetooth don't reach far enough. Cellular networks can reach, but they consume too much battery. This is where **LPWAN (Low-Power Wide-Area Network)** comes in.

## What is LoRaWAN?

**LoRaWAN** (Long Range Wide Area Network) is a networking protocol designed to wirelessly connect battery-operated devices to the internet in regional, national, or global networks.

- **Long Range**: Can transmit data up to 15 kilometers in rural areas and 5 kilometers in dense urban environments.
- **Low Power**: Sensors can run for 5 to 10 years on a single coin-cell battery.
- **Low Bandwidth**: Designed to send tiny amounts of data (a few bytes), like a temperature reading once per hour.

## Use Cases for LoRaWAN

1. **Smart Agriculture**: Soil moisture sensors deployed across thousands of hectares.
2. **Smart Cities**: Smart parking meters, waste management (trash cans that alert when full), and street lighting control.
3. **Asset Tracking**: Tracking the location of shipping containers across a logistics yard.

---
> **Key Takeaway**: LoRaWAN is ideal for applications that require long-range communication and long battery life, but only need to send small amounts of data infrequently.
`,
            vocabulary: [
                {
                    en: "LPWAN",
                    es: "LPWAN (Red de Área Amplia y Baja Potencia)",
                    definition: "A type of wireless network designed for long-range communications at a low bit rate."
                },
                {
                    en: "Payload",
                    es: "Carga útil",
                    definition: "The actual data or message being transmitted, excluding network headers."
                },
                {
                    en: "Gateway",
                    es: "Puerta de enlace / Gateway",
                    definition: "A device that routes data from a sensor network to the internet."
                }
            ]
        }
    ],
    quiz: []
};

// Module 4: Embedded Microcontrollers & Sensor Interfacing (I2C, SPI)
track.modules[3] = {
    id: "iot-m4",
    title: "Embedded Microcontrollers & Sensor Interfacing (I2C, SPI)",
    titleES: "Microcontroladores Embebidos e Interfaces de Sensores (I2C, SPI)",
    readings: [
        {
            id: "iot-m4-r1",
            title: "Sensor Communication Protocols: I2C vs SPI",
            duration: "12 min",
            content: `
# Sensor Communication Protocols: I2C vs SPI

At the very edge of the IoT network, microcontrollers (like ESP32 or STM32) need to read data from physical sensors (temperature, pressure, accelerometer). They do this using synchronous serial communication protocols.

## I2C (Inter-Integrated Circuit)

I2C is a two-wire protocol used for short-distance communication on a circuit board.

- **SDA (Serial Data)**: The line for the master and slave to send and receive data.
- **SCL (Serial Clock)**: The line that carries the clock signal.

**Advantages**: It only requires two wires, no matter how many sensors you connect. Each sensor has a unique address.
**Disadvantages**: It is relatively slow and only works well over short distances.

## SPI (Serial Peripheral Interface)

SPI is a four-wire communication protocol.

- **MOSI (Master Out Slave In)**: Data from microcontroller to sensor.
- **MISO (Master In Slave Out)**: Data from sensor to microcontroller.
- **SCLK (Serial Clock)**: Clock signal.
- **CS/SS (Chip Select)**: Used to select which sensor to talk to.

**Advantages**: SPI is much faster than I2C and supports full-duplex communication (sending and receiving at the same time).
**Disadvantages**: Requires more pins on the microcontroller. Every new sensor needs an additional Chip Select wire.

---
> **Key Takeaway**: Use I2C when you want to save pins and connect many simple sensors. Use SPI when you need high-speed data transfer.
`,
            vocabulary: [
                {
                    en: "Microcontroller",
                    es: "Microcontrolador",
                    definition: "A compact integrated circuit designed to govern a specific operation in an embedded system."
                },
                {
                    en: "Full-duplex",
                    es: "Full-duplex (Bidireccional simultáneo)",
                    definition: "The ability to send and receive data simultaneously."
                },
                {
                    en: "Synchronous",
                    es: "Síncrono",
                    definition: "Data transmission synchronized by a shared clock signal."
                }
            ]
        }
    ],
    quiz: []
};

// Module 5: Edge Gateway Security & Remote Telemetry Management
track.modules[4] = {
    id: "iot-m5",
    title: "Edge Gateway Security & Remote Telemetry Management",
    titleES: "Seguridad en Gateways de Borde y Gestión de Telemetría",
    readings: [
        {
            id: "iot-m5-r1",
            title: "Securing the IoT Edge Gateway",
            duration: "10 min",
            content: `
# Securing the IoT Edge Gateway

In an industrial network, sensors do not usually connect directly to the cloud. Instead, they connect to an **Edge Gateway**. This gateway collects data from all local sensors, translates protocols, and forwards the data to the cloud.

## The Role of the Edge Gateway

An edge gateway sits between the OT (Operational Technology) network on the factory floor and the IT (Information Technology) network or the cloud. It acts as a bridge and a firewall.

## Security Challenges at the Edge

If a hacker gains access to the edge gateway, they can intercept sensitive manufacturing data or even send malicious commands to industrial robots.

### Key Security Measures

1. **Mutual TLS (mTLS)**: The gateway and the cloud server must mutually authenticate using digital certificates.
2. **Encrypted Storage**: Credentials and API keys stored on the gateway must be encrypted, often using a hardware TPM (Trusted Platform Module).
3. **Over-The-Air (OTA) Updates**: The gateway must be able to securely download and install firmware patches to fix vulnerabilities.
4. **Firewall and Port Closure**: All unnecessary inbound network ports on the gateway must be closed to prevent unauthorized access.

---
> **Key Takeaway**: The edge gateway is the critical chokepoint between the physical factory and the digital cloud. Securing it with certificates and encryption is paramount.
`,
            vocabulary: [
                {
                    en: "Edge Gateway",
                    es: "Puerta de enlace de borde / Gateway",
                    definition: "A device that connects a local network of IoT devices to the cloud."
                },
                {
                    en: "Mutual Authentication",
                    es: "Autenticación mutua",
                    definition: "A security process in which both entities verify each other's identity."
                },
                {
                    en: "Firmware",
                    es: "Firmware",
                    definition: "Software programmed into read-only memory, providing low-level control for hardware."
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
console.log('✅ Telecom & IoT modules expanded and status set to "full".');
