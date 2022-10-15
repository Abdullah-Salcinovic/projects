const squares = document.querySelectorAll(".box");
const assBtn = document.getElementById("assBtn");
const colorName = document.getElementById("color-display");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const timerBar = document.getElementById("bar");
let score = 0;
let mainColor = " ";
let colors = [];
let time = 100;
let interval = 0;
let mainInterval = setInterval(start(), 2000);

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", () => {
    if (mainColor == squares[i].style.backgroundColor) {
      result.innerHTML = true;
      score++;
      scoreDisplay.innerHTML = score;
      clearInterval(mainInterval);
      mainInterval = setInterval(start(), 2000);
    } else {
      result.innerHTML = false;
      score = 0;
      scoreDisplay.innerHTML = score;
      mainColor = " ";
      clearInterval(mainInterval);
      clearInterval(interval);
    }
  });
}

function start() {
  time = 100;
  assignColors();
  startTimer();
  mainColor = chooseColor();
  colorName.innerHTML = mainColor;
  scoreDisplay.style.color = mainColor;
}

function randColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function newRand() {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push(randColor());
  }
  return arr;
}

function assignColors() {
  colors = newRand();
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
}

function chooseColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

assBtn.addEventListener("click", () => {
  score = 0;
  scoreDisplay.innerHTML = score;
  start();
  result.innerHTML = "pick";
  clearInterval(interval);
  interval = setInterval(() => {
    startTimer();
  }, 10);
});

function startTimer() {
  timerBar.style.width = `${time}%`;
  time -= 0.05;
}
