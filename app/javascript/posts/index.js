import Viewer from "viewerjs";
import moment from "moment";

console.log("hello index");

moment.locale("ja", {
  weekdays: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
});

var listContainer = document.querySelector("#post-list");

for (let i = 0; i < 5; i++) {
  var postElement = document.createElement("div");
  postElement.classList.add("post-item");
  postElement.classList.add("loading");
  postElement.style.animationDelay = `${0.1 * i}s`;
  postElement.innerHTML = `
    <div class="post-content-emoji"></div>
    <div class="post-item-rhs">
      <div class="post-item-header">
        <div class="post-content-date"></div>
      </div>
      <div class="post-content-text"></div>
      <div class="post-content-coords">
        <div></div>
      </div>
    </div>`;
  listContainer.appendChild(postElement);
}

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `/posts/search?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      listContainer.innerHTML = "";
      data.reverse().forEach((post, i) => {
        var postElement = document.createElement("div");
        postElement.classList.add("post-item");
        postElement.style.animationDelay = `${0.1 * i}s`;
        postElement.innerHTML = `
        <div class="post-content-emoji">
          ${post.emoji || "?"}
        </div>
        <div class="post-item-rhs">
          <div class="post-item-header">
            <div class="post-content-date">
              ${moment(post.created_at).format("YYYY年M月D日（dd） HH:mm:ss")}
            </div>
          </div>
          <div class="post-content-text">
            ${post.content}
          </div>
          ${
            post.img_file_name
              ? `<div onClick="viewImage('post-image-${i}')" class="post-image-container">
              <img id="post-image-${i}" class="post-content-image" src="https://pochama.s3.amazonaws.com/${post.img_file_name}" alt="image" loading="lazy">
            </div>`
              : ""
          }
          <a class="post-content-coords" href="/posts/map?id=${post.id}&lat=${
          post.latitude
        }&lng=${post.longitude}">
            <div>
              ${post.latitude}, ${post.longitude}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-current-location" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"></path>
              <path d="M12 2l0 2"></path>
              <path d="M12 20l0 2"></path>
              <path d="M20 12l2 0"></path>
              <path d="M2 12l2 0"></path>
            </svg>
          </a>
        </div>
      `;
        listContainer.appendChild(postElement);
      });
    })
    .catch((err) => {
      console.log(err);
      listContainer.innerHTML = `<div class="post-list-notice">周辺の投稿を取得できませんでした T_T</div>`;
    });
});

function viewImage(id) {
  console.log(id);
  var viewer = new Viewer(document.getElementById(id), {
    inline: false,
    viewed() {
      viewer.zoomTo(1);
    },
  });
}
