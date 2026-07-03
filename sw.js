/**
 * stemOS Dev Content Studio — PWA Service Worker (v1.0.5)
 * Enables 100% complete offline caching for 55 modules, readings, native phrases, and assets.
 */

const CACHE_NAME = 'stemos-dev-v1.0.5';

const ASSETS_TO_CACHE = [
  '/',
  '/dev',
  '/dev/',
  '/dev.html',
  '/dev/index.html',
  '/dev.css?v=1.0.5',
  '/dev.js?v=1.0.5',
  '/content/courses.js?v=1.0.5',
  '/content/phrases_library.js?v=1.0.5',
  '/content/LEVEL_UP_YOUR_ENGLISH.md',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Outfit:wght@600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install Event: Cache all essential assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker v1.0.5] Pre-caching all studio assets and courses');
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
          // If HTML request failed, return cached dev.html or dev/index.html
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/dev.html') || caches.match('/dev/index.html');
          }
        });
      })
  );
});
