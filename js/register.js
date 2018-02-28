if ("serviceWorker" in navigator) {
    // hog
    navigator.serviceWorker
        .register("sw.js")
        .then(function(registration) {
            // 登録成功
            console.log("SW登録成功：", registration.scope);
        })
        .catch(function(err) {
            // 登録失敗 :(
            console.log("SW登録失敗：", err);
        });
}
