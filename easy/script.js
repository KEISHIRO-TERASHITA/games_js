const messages = ["大吉", "中吉", "小吉", "凶", "大凶"];
const messageArea = document.querySelector(".messageArea");

const button = document.querySelector(".button");
button.addEventListener("click", function () {
  const omikuji = Math.floor(Math.random() * 100);
  if (omikuji < 5) {
    messageArea.innerHTML = messages[0];
  } else if (omikuji < 35) {
    messageArea.innerHTML = messages[1];
  } else if (omikuji < 75) {
    messageArea.innerHTML = messages[2];
  } else if (omikuji < 95) {
    messageArea.innerHTML = messages[3];
  } else {
    messageArea.innerHTML = messages[4];
  }
  console.log(omikuji);
});
