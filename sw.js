var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = ["/", "/main.css", "/main.js"];

self.addEventListener("install", function(event) {
    // インストール処理
    event.waitUntil(
        // キャッシュしただけではそのキャッシュが使われるわけではない
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});
