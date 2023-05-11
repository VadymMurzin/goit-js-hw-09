const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let intervalId = null;

function startBackgroundChange() {
  startButton.disabled = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopBackgroundChange() {
  startButton.disabled = false;
  clearInterval(intervalId);
  intervalId = null;
}

startButton.addEventListener('click', startBackgroundChange);
stopButton.addEventListener('click', stopBackgroundChange);
