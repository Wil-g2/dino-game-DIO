const dino = document.querySelector('.dino');
const gameArea = document.querySelector('.game-area');

let position = 0;
let isJumping = false;
let isGameOver = false;
let points = 0;

function setDinoPosition(type) {
  position = type === 'up' ? position += 20 : position -= 20;
  console.log('POS.', position);
  dino.style.bottom = position + 'px';
}

function jump() {
  isJumping = true;
  let jumpInterval = setInterval(() => {
    setDinoPosition('up');
    if (position >= 200) {
      clearInterval(jumpInterval)
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          setDinoPosition('down');
        }
      }, 30);
    }
  }, 10);
}


function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;
  console.log(randomTime);
  if (isGameOver) return;

  cactus.classList.add('cactus');
  gameArea.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      points += 50;
      clearInterval(leftTimer);
      gameArea.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = `<h1 class="game-over">Fim de jogo</h1> <h3 class="game-over"> Points: ${points}</h3>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', event  => {
  if (event.defaultPrevented) {
    return;
  }

  const key = event.key || event.keyCode;
  if (key === ' ' || 'ArrowUp') {
    if (!isJumping) {
      jump();
    }
  }
})