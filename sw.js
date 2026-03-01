const CACHE_NAME = 'roza-siyam-pwa-v2.2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg',
    './cities.json'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    if (e.request.method === 'GET') {
                        cache.put(e.request, fetchRes.clone());
                    }
                    return fetchRes;
                });
            });
        }).catch(() => null)
    );
});