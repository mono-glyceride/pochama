console.log("hello map");

let map;

async function drawMap(currentLatLng, focusItem) {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.querySelector("#map"), {
    center: focusItem ? focusItem.latLng : currentLatLng,
    zoom: focusItem ? 20 : 15,
  });

  // get posts
  fetch(
    `/posts/search?latitude=${
      focusItem ? focusItem.latLng.lat : currentLatLng.lat
    }&longitude=${focusItem ? focusItem.latLng.lng : currentLatLng.lng}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // draw markers
      data.forEach((post) => {
        let markerLatLng = {
          lat: post.latitude,
          lng: post.longitude,
        };

        // marker
        let marker = new google.maps.Marker({
          position: markerLatLng,
          map,
          title: post.content,
          label: {
            text: post.emoji || "?",
            fontSize: "24px",
          },
        });

        // info window
        let infoWindow = new google.maps.InfoWindow({
          position: markerLatLng,
          content: `
          <div class="infowin-container">
            <div class="infowin-content-emoji">
              ${post.emoji || "?"}
            </div>
            <div class="infowin-rhs">
              <div class="infowin-content-text">
              ${post.content}
              </div>
              ${
                post.img_file_name
                  ? `<div class="infowin-image-container">
                      <img class="infowin-content-image" src="https://pochama.s3.amazonaws.com/${post.img_file_name}" />
                    </div>`
                  : ""
              }
              <div class="infowin-content-date">
              ${new Date(post.created_at).toDateString()}
              </div>
            </div>
          </div>
        `,
        });

        if (!focusItem || (focusItem && post.id === focusItem.id)) {
          infoWindow.open(map, marker);
        }

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  new google.maps.Marker({
    position: currentLatLng,
    map,
    title: "You",
  });

  document.querySelector("#map").classList.remove("loading");
}

async function initMap() {
  let params = new URLSearchParams(window.location.search);

  await navigator.geolocation.getCurrentPosition((pos) => {
    let currentLatLng = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
    let focusItem = null;

    if (params.get("lat") !== null && params.get("lng") !== null) {
      focusItem = {
        latLng: {
          lat: parseFloat(params.get("lat")),
          lng: parseFloat(params.get("lng")),
        },
        id: parseInt(params.get("id")),
      };
    }

    drawMap(currentLatLng, focusItem);
  });
}

initMap();
