import * as picmo from "picmo";

console.log("hello new");

var emoji = document.querySelector("#form-emoji");
var randEmo = randomEmoji();
emoji.innerHTML = randEmo;
document.querySelector("#form-hidden-emoji").value = randEmo;

emoji.addEventListener("click", (e) => {
  var emojiPicker = document.querySelector("#emoji-picker");
  emojiPicker.classList.toggle("show");

  var picker = picmo.createPicker({ rootElement: emojiPicker });
  picker.addEventListener("emoji:select", (e) => {
    emoji.innerHTML = e.emoji;
    document.querySelector("#form-hidden-emoji").value = e.emoji;
  });
});

document.body.addEventListener("click", (e) => {
  if (e.target.closest("#emoji-picker") || e.target.closest("#form-emoji")) {
    return;
  }
  document.querySelector("#emoji-picker").classList.remove("show");
});

var coordsReady = false;
var isValidMsg = false;

var cancelButton = document.querySelector("#form-cancel-button");
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});

var submitButton = document.querySelector("#form-submit-button");
submitButton.disabled = true;
submitButton.value = ``;

var noticeMsg = document.querySelector("#form-notice");

navigator.geolocation.getCurrentPosition((position) => {
  document.querySelector("#form-longitude").value = position.coords.longitude;
  document.querySelector("#form-latitude").value = position.coords.latitude;

  submitButton.disabled = false;
  noticeMsg.innerHTML = "";

  coordsReady = true;

  if (isValidMsg) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

var msgInput = document.querySelector("#form-message");
msgInput.addEventListener("input", (e) => {
  var msg = e.target.value;
  if (msg.length > 0) {
    isValidMsg = true;
  } else {
    isValidMsg = false;
  }
  if (isValidMsg && coordsReady) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
