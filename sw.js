// ============================================================
// SERVICE WORKER — Japon 2026
// Changer le numéro de version force la mise à jour pour tous
// ============================================================

const VERSION = '2026-v34';
const CACHE = 'japon-2026-' + VERSION;

// À l'installation : cache uniquement le fichier principal
self.addEventListener('install', event => {
  console.log('[SW] Install v' + VERSION);
  // Activation immédiate sans attendre l'ancienne version
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(['./index.html']);
    }).catch(() => {})
  );
});

// À l'activation : supprimer TOUS les anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate v' + VERSION);
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE && k !== CACHE+'-tiles' && k !== CACHE+'-imgs')
            .map(k => {
              console.log('[SW] Suppression ancien cache:', k);
              return caches.delete(k);
            })
      );
    }).then(() => {
      // Prendre le contrôle immédiatement de toutes les pages ouvertes
      return self.clients.claim();
    }).then(() => {
      // Notifier les clients de se recharger
      return self.clients.matchAll({type:'window'}).then(clients => {
        clients.forEach(client => client.postMessage({type:'SW_UPDATED'}));
      });
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // index.html — toujours depuis le réseau (Network First)
  // Garantit que la dernière version est toujours chargée
  if(url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Tuiles MapTiler — Cache First (économise la bande passante)
  if(url.hostname.includes('maptiler') || url.hostname.includes('cartocdn')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE+'-tiles').then(c => c.put(event.request, clone));
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Images Pexels — Cache First
  if(url.hostname.includes('pexels') || url.hostname.includes('worldhistory') || url.hostname.includes('fonts')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE+'-imgs').then(c => c.put(event.request, clone));
          return response;
        }).catch(() => new Response('', {status: 408}));
      })
    );
    return;
  }

  // Tout le reste — Network First
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
