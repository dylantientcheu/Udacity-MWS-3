const STATIC_CACHE_NAME = "restaurants-reviews-static-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/axios.js",
  "/dbhelper.js",
  "/idb.js",
  "/main.js",
  "/restaurant.html?id=1",
  "/restaurant.html?id=2",
  "/restaurant.html?id=3",
  "/restaurant.html?id=4",
  "/restaurant.html?id=5",
  "/restaurant.html?id=6",
  "/restaurant.html?id=7",
  "/restaurant.html?id=8",
  "/restaurant.html?id=9",
  "/restaurant.html?id=10",
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith("restaurants-reviews-") &&
              cacheName != STATIC_CACHE_NAME
            );
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
