var CACHE_NAME = "specific-cache-v1";
var urlsToCache = ["/register/specific/", "/register/main.css"];

self.addEventListener("install", function(event) {
    console.info("install: ", event);
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", event => {
    console.info("activate:", event);
    console.info("caches: ", caches);
});

self.addEventListener("fetch", function(event) {
    console.info("fetch: ", event.request);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            console.log("cache not hit");
            return fetch(event.request);
        })
    );
});
