# App Name
同じ場所に過去いた⼈の考えたこと、⾒たこと、感じたことを知ることができるWebアプリケーションです。

## ページ構成
トップページ(/)  
   -投稿(/posts/new)  
   -マップ(/posts/map)  


## 開発環境
Ruby 3.1.4  
Rails 7.0.7.2  
Docker 24.0.5  

## 環境構築
### イメージの作成
```
docker-compose build
```
### コンテナの起動
```
docker-compose up
```

### Docker内に移動
```
docker exec -it pochama-web-1 bash
```



