# SW 使ってみるサンプル

## これに沿ってやてみる

https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

## 環境

SW は HTTPS 環境もしくは local な環境でしか動かないとりあえずパブリックに見てもらうのは GitHubPages で

### local で動かしたい人

[Web Server for Chrome](https://goo.gl/q0QFjz)でサーバを立てるソースと詳しい使い方は各自。難しくはない。

### SW の更新とか

sw.js を更新したあと、ブラウザでそれを反映させるためには、

1. ファイル更新後そのページに一度訪れ
2. waiting 状態にし(ChromeDebugger->Application->ServiceWorker->sw.js が wait)
3. ウィンドウごと閉じて
4. 再度訪問する

と SW スクリプトが更新される。
SW スクリプトは訪問時毎回取得され、ブラウザ内のスクリプトと新しくダウンロードしたスクリプトでバイト差異が発見されれば、更新処理が走る（wait 状態になる）
