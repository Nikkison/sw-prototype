var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
    "/",
    "/main.css",
    "/main.js",
    "//code.jquery.com/jquery-3.3.1.min.js"
];

self.addEventListener("install", function(event) {
    // インストール処理
    event.waitUntil(
        // キャッシュしただけではそのキャッシュが使われるわけではない
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("Opened Cache:", urlsToCache);
            return cache.addAll(urlsToCache);
        })
    );
});
