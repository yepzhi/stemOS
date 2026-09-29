/**
 * stemOS Dev Content Studio — PWA Service Worker (v5.36.0 Subsea HVDC & Umbilicals Suite)
 * Enables 100% complete offline caching for 34 tracks, 266 readings, 162 idioms, STEMBot Copilot, Auditable Certificates, Cloud Sync, Blueprint Lab, LOTO Zero-Energy Lab, Incident War Room, SCADA Digital Twin Lab, Cross-Border Audio Roleplay Lab, Capstone Board Exam, Student Onboarding Career Path 60h Engine, Active Path HUD, Slang Trainer, W3C Open Badges 3.0 Verifiable Credentials, Stackable Micro-Credentials 4×15h with Recruiter Portfolio Showcase, Nearshoring Talent Hub with STAR Mock Interview Simulator, Multi-Turn Live Voice/Chat Recruiter Agent, Enterprise Talent Pipeline CRM, System Architecture Whiteboard Defense Arena, AI Nearshoring ATS Resume Tailor, Cross-Border Multi-Plant Incident Drills, Executive Negotiation Chamber, Surprise Regulatory Audit Defense Chamber, Plant-Floor Gemba Walk Crucible, Cross-Track Executive Escalation Tribunal, Autonomous VR Cleanroom Walkthrough & Digital Twin 3.0, Cross-Border Autonomous AI Patent & IP Claim Defense Arena, Autonomous AI Boardroom ESG & Decarbonization Capital Allocation Crucible, Cross-Border Autonomous Global Supply Chain Reshoring & Dual-Sourcing Risk War Room, Autonomous Industrial Cybersecurity Threat Hunting & SCADA Incident Command Arena, Cross-Border Autonomous AI Predictive Maintenance & Zero-Unplanned-Downtime Reliability Crucible, Autonomous Cross-Border Microgrid & Clean Industrial Energy Arbitrage Chamber, Autonomous High-Throughput Advanced Packaging & 3D Heterogeneous Chiplet Metrology Cleanroom, Cross-Border Autonomous AI EV Battery Pack Thermal Runaway Containment & UN 38.3 Testing Crucible, Autonomous Hyperscale Data Center Direct-to-Chip Two-Phase Immersion Cooling & Power Density Optimization Chamber, Autonomous AI Nearshoring Bioprocess & Sterile Single-Use Bioreactor Validation Cleanroom, Autonomous Clean Hydrogen Electrolyzer & Ammonia Cracking Synthesis Crucible, Autonomous AI Semiconductor Cleanroom Ultra-Pure Water & Trace Chemical Contamination Reclamation Crucible, Autonomous Nearshoring Aerospace & Defense Avionics MIL-STD-1553 & DO-254 Hardware Assurance Crucible, Autonomous Nearshoring AI Subsea & Deepwater Subsea Blowout Preventer (BOP) & HPHT Crucible, Autonomous Nearshoring AI Nuclear SMR & Molten Salt Reactor (MSR) Control Room & Thermal-Hydraulics Crucible, Autonomous Nearshoring AI Carbon Capture, Utilization & Direct Air Capture (DAC) Sequestration Geomechanics Crucible, Autonomous Nearshoring AI Heavy-Duty Electric Vehicle (EV) Megawatt Charging System (MCS) & High-Power Fleet Telematics Crucible, Autonomous Nearshoring AI Quantum Cryptography Key Distribution (QKD) & Post-Quantum Cryptography (PQC) Optical Telemetry Crucible, Autonomous Nearshoring AI Submicron Extreme Ultraviolet (EUV) Photolithography & Computational Patterning Crucible, and Autonomous Nearshoring AI Subsea High-Voltage Direct Current (HVDC) Interconnector & Dynamic Subsea Umbilical Cable Crucible.
 */

const CACHE_NAME = 'stemos-lxp-v5.37.0-quantum-sensing';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.html',
  '/app.js',
  '/world-map.css',
  '/world-map.js',
  '/content/courses.js',
  '/content/career_tracks.js',
  '/content/phrases_library.js',
  '/dev',
  '/dev/',
  '/dev.html',
  '/dev/index.html',
  '/dev.css',
  '/dev.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Outfit:wght@600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install Event: Cache all essential assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker v5.10.0] Pre-caching all studio assets and courses');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[Service Worker] Pre-caching partial warning:', err);
      });
    })
  );
});

// Activate Event: Clean old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting outdated cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Message Listener: Force Cache Everything on Demand
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'CACHE_EVERYTHING') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE).then(() => {
          console.log('[Service Worker] Full offline sync completed successfully!');
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ status: 'SUCCESS', count: ASSETS_TO_CACHE.length });
          }
        });
      })
    );
  }
});

// Fetch Event: Network First with Instant Cache Fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network unavailable: Fallback to local cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If HTML request failed, return cached index.html or dev.html
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html') || caches.match('./index.html') || caches.match('/dev.html') || caches.match('/dev/index.html');
          }
        });
      })
  );
});
