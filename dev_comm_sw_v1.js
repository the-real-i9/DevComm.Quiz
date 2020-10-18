const cacheName = 'cache_dev_comm_quiz_v1';

const files = [
    './',
    './css/style.css',
    './js/app.js',
    './img/img-192.png',
    './img/img-512.png',
];

self.addEventListener('install', (ev) => {
    console.log('Installed');
});

self.addEventListener('activate', (ev) => {
    ev.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cache) => {
                if (cache !== cacheName) {
                    return caches.delete(cache);
                }
            }),
        )),
    );
});

self.addEventListener('fetch', (ev) => {
    ev.respondWith(
        fetch(ev.request)
        .then((response) => {
            const resClone = response.clone();
            caches.open(cacheName)
            .then((cache) => {
                cache.put(ev.request, resClone);
            });
            return response;
        })
        .catch((err) => caches.match(ev.request).then((res) => res)),
    );
});
