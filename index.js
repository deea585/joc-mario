const mario = document.getElementById("mario");
let marioX = 0;
let isJumping = false;

let lives = 3;
let livesElement = document.getElementById("lives");

let tree1 = document.getElementById("tree1");
let stone1 = document.getElementById("stone1");

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    moveMario(1);
  } else if (event.key === "ArrowLeft") {
    moveMario(-1);
  } else if (event.key === "ArrowUp" && !isJumping) {
    jumpMario();
  }
});

function moveMario(direction) {
  marioX += direction * 10;
  mario.style.transform = `translateX(${marioX}px)`;

  checkCollisions();
}

function jumpMario() {
  isJumping = true;
  mario.style.transform = `translateY(-100px) translateX(${marioX}px)`;
  setTimeout(() => {
    mario.style.transform = `translateY(0) translateX(${marioX}px)`;
    isJumping = false;
  }, 500);
}

function checkCollisions() {
  checkObstacleCollision(tree1);
  checkObstacleCollision(stone1);
}

function checkObstacleCollision(obstacle) {
  const marioRect = mario.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    marioRect.bottom > obstacleRect.top &&
    marioRect.top < obstacleRect.bottom &&
    marioRect.right > obstacleRect.left &&
    marioRect.left < obstacleRect.right
  ) {
    lives--;
    livesElement.innerText = `Lives: ${lives}`;

    if (lives === 0) {
      alert("Game Over!");
      resetGame();
    }
  }
}

function resetGame() {
  lives = 3;
  livesElement.innerText = `Lives: ${lives}`;
  marioX = 0;
  mario.style.transform = `translateX(${marioX}px)`;
}
