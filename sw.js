// sw.js - Simple fixed version
const CACHE_VERSION = 'dekut-gis-v4';
const CACHE_FILES = [
  'index.html',
  'manifest.json',
  'icon.png',
  'mobile.png',
  'sw.js',
  'boundary.geojson',
  'building.geojson',
  'main_roads.geojson',
  'pitch.geojson',
  'roads.geojson',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js',
  'https://unpkg.com/@turf/turf/turf.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => 
      cache.addAll(CACHE_FILES)
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(cacheName => {
        if (cacheName !== CACHE_VERSION) {
          return caches.delete(cacheName);
        }
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => 
      response || fetch(event.request)
    )
  );
});