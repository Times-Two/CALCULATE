const CACHE_NAME = 'calculator-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './calculate.css',
  './app.js',
  './manifest.json',
  './theo.png'
];

// Install event - cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.warn('Cache install error:', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - respond from cache, fallback to network, fallback to index.html if navigate
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Handle page reloads
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('./index.html');
      })
    );
  } else {
    // Handle assets like CSS, JS, images
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
