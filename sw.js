// SW v2026-v90 — Reset complet
// Supprimer tous les anciens caches à l'installation
self.addEventListener('install', event => {
  console.log('[SW] Install v2026-v90');
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate v2026-v90');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
    .then(() => self.clients.matchAll({type:'window'}).then(clients => {
      clients.forEach(client => client.postMessage({type:'SW_UPDATED'}));
    }))
  );
});

// Ne rien mettre en cache — tout depuis le réseau
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
