/**
 * stemOS Dev Content Studio & Institutional Academic Ecosystem — PWA Service Worker (v6.0.0 Academic Portals & Curricular Engine)
 * Full offline PWA caching for 4 Portals (Student, Admin, Teacher, Register), 25 Career Paths (60h), Interleaved Curricula, XP HUD, and 3D World Map.
 */

const SW_VERSION = '6.8.5';
const CACHE_NAME = 'stemos-lxp-v6.8.5-mcer-offline-sync';
// Historical compatibility: v6.0.0-academic-portals, v6.1.0-firebase-sync, v6.2.0-piper-neural, v6.3.0-campus-diadema-offline, v6.3.1-sso-mobile-fixes, v6.8.2-hero-leveling-pathway, v6.8.3-offline-resilient-icons, v6.8.4-csp-resilient

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icon-192.svg',
  '/icon-512.svg',
  '/icon-maskable.svg',
  '/favicon.ico',
  '/styles.css',
  '/webfonts/fa-solid-900.woff2',
  '/app.html',
  '/app.js',
  '/placement.html',
  '/tracks.html',
  '/privacy.html',
  '/register.html',
  '/admin.html',
  '/teacher.html',
  '/404.html',
  '/world-map.css',
  '/world-map.js',
  '/content/courses.js',
  '/content/career_tracks.js',
  '/content/career_paths.js',
  '/content/firebase_config.js',
  '/content/firebase_adapter.js',
  '/content/gemini_service.js',
  '/content/mcer_tracks.js',
  '/content/placement_test.js',
  '/content/stemos_payments.js',
  '/content/phrases_library.js',
  '/content/stemos_tts.js',
  '/content/stemos_pwa.js',
  '/content/stemos_rum.js',
  '/content/stemos_phonetics.js',
  '/content/stemos_sync.js',
  '/content/audio/cleanroom_photolithography.wav',
  '/content/audio/cleanroom_basic_a2.wav',
  '/content/audio/pt-test-audio.mp3',
  '/content/audio/pt-l01.mp3',
  '/content/audio/pt-l02.mp3',
  '/content/audio/pt-l03.mp3',
  '/content/audio/pt-l04.mp3',
  '/content/audio/pt-l05.mp3',
  '/content/audio/pt-l06.mp3',
  '/content/audio/pt-l07.mp3',
  '/content/audio/pt-l08.mp3',
  '/content/audio/pt-l09.mp3',
  '/content/audio/pt-l10.mp3',
  '/content/audio/mcer/a1-u1-d1.mp3',
  '/content/audio/mcer/a1-u1-d2.mp3',
  '/content/audio/mcer/a1-u1-d3.mp3',
  '/content/audio/mcer/a1-u1-d4.mp3',
  '/content/audio/mcer/a1-u1-d5.mp3',
  '/content/audio/mcer/a1-u1-d6.mp3',
  '/content/audio/mcer/a1-u1-dialogue-full.mp3',
  '/content/audio/mcer/a1-u1-vocab-hello.mp3',
  '/content/audio/mcer/a1-u1-vocab-welcome.mp3',
  '/content/audio/mcer/a1-u1-vocab-name.mp3',
  '/content/audio/mcer/a1-u1-vocab-student.mp3',
  '/content/audio/mcer/a1-u1-vocab-coworker.mp3',
  '/content/audio/mcer/a1-u1-vocab-pleasure.mp3',
  '/content/audio/mcer/a1-u1-vocab-colleague.mp3',
  '/content/audio/mcer/a1-u1-vocab-morning.mp3',
  '/content/audio/mcer/a1-u1-listening-lab.mp3',
  '/content/audio/mcer/a1-u1-reading-passage.mp3',
  '/content/audio/mcer/a1-u1-crucible-model.mp3',
  '/content/audio/mcer/a1-u2-d1.mp3',
  '/content/audio/mcer/a1-u2-d2.mp3',
  '/content/audio/mcer/a1-u2-dialogue-full.mp3',
  '/content/audio/mcer/a1-u2-vocab-safety.mp3',
  '/content/audio/mcer/a1-u2-vocab-inspection.mp3',
  '/content/audio/mcer/a1-u2-listening-lab.mp3',
  '/dev',
  '/dev/',
  '/dev.html',
  '/dev/index.html',
  '/dev.css',
  '/dev.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Outfit:wght@600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2'
];

// Install Event: Cache all essential assets with resilient fallback
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker v6.5.0] Pre-caching PWA assets and curricula');
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[Service Worker] Non-fatal cache failure for:', url, err.message);
          })
        )
      );
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

// Fetch Event: Two-Tier High-Performance Strategy (Phase 84 CWV Engine)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http://') && !event.request.url.startsWith('https://')) return;

  let url;
  try {
    url = new URL(event.request.url);
  } catch (e) {
    return;
  }

  const isSpeedAsset = (
    url.pathname.match(/\.(svg|png|ico|jpg|jpeg|webp|gif|woff2|woff|ttf|wav|mp3)$/i) ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdnjs.cloudflare.com') ||
    url.pathname.includes('/content/courses.js') ||
    url.pathname.includes('/content/career_tracks.js') ||
    url.pathname.includes('/content/career_paths.js') ||
    url.pathname.includes('/content/phrases_library.js')
  );

  if (isSpeedAsset) {
    // TIER 1: Stale-While-Revalidate with bulletproof fallback
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const networkFetch = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
            }
            return networkResponse;
          })
          .catch((err) => {
            if (cachedResponse) return cachedResponse;
            throw err;
          });

        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // Allow external third-party APIs (Firebase, Cloudflare, telemetry) to be handled natively by browser
  if (url.origin !== self.location.origin) {
    return;
  }

  // TIER 2: Same-Origin Network-First with Instant Cache Fallback (HTML Documents & Dynamic Scripts)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          }).catch(() => {});
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        // If HTML request failed while offline, return cached entry point
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          const fallback = await caches.match('/index.html') || await caches.match('/app.html') || await caches.match('/dev.html');
          if (fallback) return fallback;
        }

        return new Response('Network error or offline', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});
