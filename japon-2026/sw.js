// ============================================================
// SERVICE WORKER — Japon 2026
// Cache toutes les ressources pour utilisation hors ligne
// ============================================================

const CACHE_NAME = 'japon-2026-v1';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  './',
  './index.html',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&display=swap',
];

// Installation — mise en cache des ressources statiques
self.addEventListener('install', event => {
  console.log('[SW] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation — nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activation...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Suppression ancien cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes — stratégie Cache First
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Tuiles MapTiler — Network First (si réseau dispo) sinon cache
  if (url.hostname.includes('maptiler') || url.hostname.includes('cartocdn')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Mettre en cache la tuile si succès
          const responseClone = response.clone();
          caches.open(CACHE_NAME + '-tiles')
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          // Pas de réseau → chercher dans le cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Images Pexels — Cache First
  if (url.hostname.includes('pexels') || url.hostname.includes('worldhistory')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME + '-images')
            .then(cache => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Tout le reste — Cache First avec fallback réseau
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
