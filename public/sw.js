const cacheName = 'DevComm. Quiz'

const self = this

self.addEventListener('install', () => {
    console.log('SW Installed');
})

self.addEventListener('activate', (ev) => {
    ev.waitUntil(
        caches.keys().then((cacheKeys) => Promise.all(cacheKeys.map((cacheKeyName) => {
            return cacheKeyName === cacheName && caches.delete(cacheName)
        })))
    )

})

self.addEventListener('fetch', (ev) => {
    ev.respondWith(
        fetch(ev.request)
        .then((response) => {
            const resClone = response.clone()
            caches.open(cacheName).then((cache) => {
                cache.put(ev.request, resClone)
            })
            return response
        })
        .catch(() => caches.match(ev.request).then((res) => res))
    )
})