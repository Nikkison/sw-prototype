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

// リソース取得イベントが発火したときに走るコールバック
self.addEventListener("fetch", function(event) {
    console.log(event.request);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // キャッシュがあったのでレスポンスを返す
            if (response) {
                console.log(response);
                return response;
            }

            // 重要：リクエストを clone する。リクエストは Stream なので
            // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
            // 必要なので、リクエストは clone しないといけない
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(function(response) {
                // レスポンスが正しいかをチェック
                if (
                    !response ||
                    response.status !== 200 ||
                    response.type !== "basic"
                ) {
                    return response;
                }

                // 重要：レスポンスを clone する。レスポンスは Stream で
                // ブラウザ用とキャッシュ用の2回必要。なので clone して
                // 2つの Stream があるようにする
                var responseToCache = response.clone();

                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
