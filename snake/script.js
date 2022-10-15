const field = document.querySelectorAll(".field div");
const display = document.querySelector("span");
const startBtn = document.querySelector(".start");

let currentSnake = [1, 0];
let direction = 1;
let x = 0;
let score = 0;
let intervalTime = 0;
let interval = 0;

function startGame() {
  currentSnake.forEach((index) => field[index].classList.remove("snake"));
  field[x].classList.remove("coin");
  randCoin();
  currentSnake = [2, 1, 0];
  clearInterval(interval);
  intervalTime = 500;
  direction = 1;
  score = 0;
  display.innerText = score;
  currentIndex = 0;
  currentSnake.forEach((index) => field[index].classList.add("snake"));
  interval = setInterval(interactions, intervalTime);
}

function interactions() {
  if (
    (currentSnake[0] + 10 >= 10 * 10 && direction === 10) ||
    (currentSnake[0] % 10 === 10 - 1 && direction === 1) ||
    (currentSnake[0] % 10 === 0 && direction === -1) ||
    (currentSnake[0] - 10 < 0 && direction === -10) ||
    field[currentSnake[0] + direction].classList.contains("snake")
  ) {
    clearInterval(interval);
    return;
  }

  const tail = currentSnake.pop();
  field[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  if (field[currentSnake[0]].classList.contains("coin")) {
    field[currentSnake[0]].classList.remove("coin");
    field[tail].classList.add("snake");
    currentSnake.push(tail);
    randCoin();
    score++;
    display.textContent = score;
    clearInterval(interval);
    intervalTime *= 0.9;
    interval = setInterval(interactions, intervalTime);
  }
  field[currentSnake[0]].classList.add("snake");
}

function randCoin() {
  do x = Math.floor(Math.random() * 100);
  while (field[x].classList.contains("snake"));
  {
    field[x].classList.add("coin");
  }
}

startBtn.addEventListener("click", startGame);
document.addEventListener("keyup", function (e) {
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      direction = -1;
      break;
    case "ArrowRight":
      direction = 1;
      break;
    case "ArrowUp":
      direction = -10;
      break;
    case "ArrowDown":
      direction = 10;
      break;
  }
});
