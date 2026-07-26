// ============================================================
// SERVICE WORKER — Japon 2026
// Changer le numéro de version force la mise à jour pour tous
// ============================================================

const VERSION = '2026-v74';
const CACHE = 'japon-2026-' + VERSION;
const CACHE_IMGS = CACHE + '-imgs';
const CACHE_TILES = CACHE + '-tiles';

// ── Toutes les images de l'appli à précacher à l'installation ──
const PRECACHE_IMGS = [
  'https://i.imgur.com/0hFXUbt.jpeg',
  'https://i.imgur.com/DdXw2tR.jpeg',
  'https://i.imgur.com/TLHwof4.jpeg',
  'https://i.imgur.com/ZQxJZNH.jpeg',
  'https://i.imgur.com/f01FWM4.jpeg',
  'https://i.imgur.com/fJ0G3y8.jpeg',
  'https://i.imgur.com/kVrwsRp.jpeg',
  'https://i.imgur.com/kWMnl2p.jpeg',
  'https://i.imgur.com/nD7mFd8.jpeg',
  'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/11307630/pexels-photo-11307630.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/12694382/pexels-photo-12694382.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/12759818/pexels-photo-12759818.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/13826151/pexels-photo-13826151.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/15683773/pexels-photo-15683773.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/15830266/pexels-photo-15830266.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/15924871/pexels-photo-15924871.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/161247/ginkaku-ji-temple-kyoto-japan-161247.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/16226405/pexels-photo-16226405.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/16412233/pexels-photo-16412233.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/16781771/pexels-photo-16781771.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1701747/pexels-photo-1701747.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1798631/pexels-photo-1798631.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18848570/pexels-photo-18848570.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18848579/pexels-photo-18848579.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/18848766/pexels-photo-18848766.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/19035807/pexels-photo-19035807.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/19693257/pexels-photo-19693257.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/19693257/pexels-photo-19693257.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/19848334/pexels-photo-19848334.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20150829/pexels-photo-20150829.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20199421/pexels-photo-20199421.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20259602/pexels-photo-20259602.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2450697/pexels-photo-2450697.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/25998459/pexels-photo-25998459.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/27082677/pexels-photo-27082677.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/27516858/pexels-photo-27516858.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/27573830/pexels-photo-27573830.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/28057691/pexels-photo-28057691.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/28969414/pexels-photo-28969414.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/29587987/pexels-photo-29587987.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30215354/pexels-photo-30215354.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30487720/pexels-photo-30487720.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30643058/pexels-photo-30643058.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30813051/pexels-photo-30813051.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30961867/pexels-photo-30961867.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30972483/pexels-photo-30972483.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30979559/pexels-photo-30979559.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31004987/pexels-photo-31004987.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31025509/pexels-photo-31025509.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31081698/pexels-photo-31081698.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31162239/pexels-photo-31162239.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3121302/pexels-photo-3121302.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31384203/pexels-photo-31384203.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31401592/pexels-photo-31401592.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31415445/pexels-photo-31415445.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31418368/pexels-photo-31418368.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/31434526/pexels-photo-31434526.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/32008338/pexels-photo-32008338.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/32788579/pexels-photo-32788579.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/33584293/pexels-photo-33584293.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/33701672/pexels-photo-33701672.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34013890/pexels-photo-34013890.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34065646/pexels-photo-34065646.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5598520/pexels-photo-5598520.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3408348/pexels-photo-3408348.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34247027/pexels-photo-34247027.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34438939/pexels-photo-34438939.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/34714509/pexels-photo-34714509.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34728995/pexels-photo-34728995.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34729046/pexels-photo-34729046.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34729046/pexels-photo-34729046.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/34924714/pexels-photo-34924714.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34985795/pexels-photo-34985795.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/35501370/pexels-photo-35501370.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/35663408/pexels-photo-35663408.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36047267/pexels-photo-36047267.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/36395896/pexels-photo-36395896.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36874904/pexels-photo-36874904.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36940470/pexels-photo-36940470.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/36940470/pexels-photo-36940470.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/37184733/pexels-photo-37184733.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4456247/pexels-photo-4456247.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5026334/pexels-photo-5026334.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5473056/pexels-photo-5473056.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5745136/pexels-photo-5745136.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6114840/pexels-photo-6114840.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7526797/pexels-photo-7526797.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8285079/pexels-photo-8285079.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8606805/pexels-photo-8606805.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/889848/pexels-photo-889848.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/8952612/pexels-photo-8952612.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/a7/fd/da.jpg',
  'https://static.tripzilla.ph/media/250883/conversions/01JY5TS1RVEMSACM5CHZQZD8F0-w1024.webp',
  'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-08/roppongi-hills-christmas-market-guide_4.jpg?itok=Uz1CL51P',
  'https://umamibites.com/wp-content/uploads/2024/09/UB236_10.jpg',
  'https://www.worldhistory.org/uploads/images/6755.jpg?v=1599464703-0',
  'https://images.pexels.com/photos/17234727/pexels-photo-17234727.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/37746985/pexels-photo-37746985.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/15924875/pexels-photo-15924875.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/15924872/pexels-photo-15924872.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/32107693/pexels-photo-32107693.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/37800171/pexels-photo-37800171.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

// À l'installation : cache index.html + précache toutes les images
self.addEventListener('install', event => {
  console.log('[SW] Install v' + VERSION);
  self.skipWaiting();
  event.waitUntil(
    Promise.all([
      // Cache principal : index.html
      caches.open(CACHE).then(cache => cache.addAll(['./index.html']).catch(() => {})),
      // Précache images : on tente chaque image individuellement
      // (si une échoue, les autres continuent)
      caches.open(CACHE_IMGS).then(cache => {
        return Promise.allSettled(
          PRECACHE_IMGS.map(url =>
            fetch(url, {mode:'cors'})
              .then(r => { if(r.ok) cache.put(url, r); })
              .catch(() => {})
          )
        );
      })
    ])
  );
});

// À l'activation : supprimer TOUS les anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate v' + VERSION);
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE && k !== CACHE_TILES && k !== CACHE_IMGS)
            .map(k => {
              console.log('[SW] Suppression ancien cache:', k);
              return caches.delete(k);
            })
      );
    }).then(() => self.clients.claim())
      .then(() => {
        return self.clients.matchAll({type:'window'}).then(clients => {
          clients.forEach(client => client.postMessage({type:'SW_UPDATED'}));
        });
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // index.html — Network First (toujours la dernière version)
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

  // Tuiles MapTiler — Cache First
  if(url.hostname.includes('maptiler') || url.hostname.includes('cartocdn')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_TILES).then(c => c.put(event.request, clone));
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Images (Pexels, Imgur, et autres) — Cache First
  const isImage = url.hostname.includes('pexels') ||
                  url.hostname.includes('imgur') ||
                  url.hostname.includes('worldhistory') ||
                  url.hostname.includes('tripzilla') ||
                  url.hostname.includes('rakuten') ||
                  url.hostname.includes('umamibites') ||
                  url.hostname.includes('tacdn') ||
                  url.pathname.match(/\.(jpe?g|png|webp|gif)$/i);

  if(isImage) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(response => {
          if(response.ok) {
            const clone = response.clone();
            caches.open(CACHE_IMGS).then(c => c.put(event.request, clone));
          }
          return response;
        }).catch(() => cached || new Response('', {status: 408}));
      })
    );
    return;
  }

  // Fonts Google — Cache First
  if(url.hostname.includes('fonts')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if(cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_IMGS).then(c => c.put(event.request, clone));
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Tout le reste — Network First
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
