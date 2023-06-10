const body = document.querySelector("body");
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = null;
btnStop.disabled = true;
btnStart.addEventListener("click", () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, 1000);
})

btnStop.addEventListener("click", () => {
  clearInterval(timerId);
  btnStop.disabled = true;
  btnStart.disabled = false;
});