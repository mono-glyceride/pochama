// script.js
document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector(".timeline");

    // タイムライン上のコンテンツを生成するロジックをここに追加
    // 例: APIからデータを取得してコンテンツを表示する
    fetch("https://api.example.com/timeline")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const post = document.createElement("div");
                post.className = "post";
                post.innerHTML = `
                    <p>${item.content}</p>
                    <small>${item.timestamp}</small>
                    <hr>
                `;
                timeline.appendChild(post);
            });
        });
});