// SW v2026-v91 — Reset complet + bypass cache HTTP
// Supprimer tous les anciens caches à l'installation
self.addEventListener('install', event => {
  console.log('[SW] Install v2026-v91');
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate v2026-v91');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
    .then(() => self.clients.matchAll({type:'window'}).then(clients => {
      clients.forEach(client => client.postMessage({type:'SW_UPDATED'}));
    }))
  );
});

// Ne rien mettre en cache — tout depuis le réseau, en forçant le
// contournement du cache HTTP du navigateur (pas seulement la Cache API).
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => fetch(event.request))
  );
});
