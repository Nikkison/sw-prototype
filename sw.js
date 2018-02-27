var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
    "/",
    "/main.css",
    "/main.js",
    "http://code.jquery.com/jquery-3.3.1.min.js"
];

// SWスクリプト自体がインストールされるときに走るコールバックを定義する
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
