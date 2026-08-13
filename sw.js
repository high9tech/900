const CACHE_NAME = 'hightechps-host-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './exploit.js',
  './cache.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const total = ASSETS.length;
      let loaded = 0;

      for (const asset of ASSETS) {
        await cache.add(asset);
        loaded++;
        const percent = Math.round((loaded / total) * 100);
        
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({ type: 'CACHE_PROGRESS', percent: percent });
        });
      }
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});