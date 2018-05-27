import './style.css';

const winScore = 20;

const downloadSound = src => {
  const sound = new Audio();

  sound.addEventListener('error', () => {
    alert("Can't download a sound from: " + src);
  });

  sound.src = src;

  return sound;
};

const sounds = {
  green: downloadSound('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  red: downloadSound('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  blue: downloadSound('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  yellow: downloadSound('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

const colors = ['green', 'red', 'blue', 'yellow'];
const colorsDark = ['darkgreen', 'darkred', 'darkblue', 'darkgoldenrod'];
const colorsLight = ['lightgreen', 'lightpink', 'lightblue', 'lightyellow'];

const gameStore = {
  strict: false,
  start: false,
  seriesGame: [],
  seriesPlayer: [],
  playerMistake: false,
  intervalStartGame: undefined,
  timeoutStartGame: undefined,
  intervalPlayColors: undefined,
  timeoutPushColor: undefined,
  intervalGameOver: undefined,
  timeoutGameRound: undefined
};

const switchStrictMode = () => {
  document
    .getElementsByClassName('btnStrictPoint')[0]
    .classList.toggle('btnStrictOn');
  gameStore.strict = !gameStore.strict;
};

const changeColor = (color, toColor) => {
  document.getElementsByClassName(
    color + 'Field'
  )[0].style.backgroundColor = toColor;
};

const randomColor = () => {
  const randomColor = Math.round(Math.random() * 3);
  gameStore.seriesGame.push(colors[randomColor]);
};

const pushColor = color => {
  changeColor(color, colorsLight[colors.indexOf(color)]);
  sounds[color].play();

  gameStore.timeoutPushColor = setTimeout(() => {
    changeColor(color, color);
  }, 500);
};

const playColors = () => {
  let index = 0;
  gameStore.intervalPlayColors = setInterval(() => {
    pushColor(gameStore.seriesGame[index]);
    index++;

    if (index === gameStore.seriesGame.length) {
      clearInterval(gameStore.intervalPlayColors);
    }
  }, 1000);

  return gameStore.seriesGame.length * 1000;
};

const displayStart = () => {
  const display = document.getElementsByClassName('countDisplay')[0];
  let index = 0;

  gameStore.intervalStartGame = setInterval(() => {
    index % 2 === 0 ? (display.innerHTML = '- -') : (display.innerHTML = '');

    if (index === 4) {
      clearInterval(gameStore.intervalStartGame);
    }

    index++;
  }, 400);

  return 5 * 400 + 100;
};
const guessColors = event => {
  const countDisplay = document.getElementsByClassName('countDisplay')[0];
  const color = event.target.dataset.color;
  const index = gameStore.seriesPlayer.length;

  pushColor(color);

  if (gameStore.seriesGame[index] === color) {
    gameStore.seriesPlayer.push(color);
    if (index === gameStore.seriesGame.length - 1) {
      unableClick(true);
    }
  } else {
    countDisplay.innerHTML = '! !';
    unableClick(true);
    gameStore.playerMistake = true;
    gameStore.seriesPlayer = [];
  }
};

const unableClick = bool => {
  for (let i = 0; i < colors.length; i++) {
    const item = document.getElementsByClassName(colors[i] + 'Field')[0];

    if (bool) {
      if (!item.classList.contains('unableClick')) {
        item.classList.add('unableClick');
      }
    } else {
      if (item.classList.contains('unableClick')) {
        item.classList.remove('unableClick');
      }
    }
  }
};

const gameRound = () => {
  let index = gameStore.seriesGame.length;
  const countDisplay = document.getElementsByClassName('countDisplay')[0];
  countDisplay.innerHTML = index < 10 ? '0 ' + index : '1 ' + index / 10;

  let delay = playColors();

  gameStore.timeoutGameRound = setTimeout(() => {
    unableClick(false);

    gameStore.intervalGameOver = setInterval(() => {
      if (gameStore.playerMistake) {
        gameStore.playerMistake = false;
        if (gameStore.strict) {
          gameStore.seriesGame = [];
          for (let i = 0; i < colors.length; i++) {
            changeColor(colors[i], colorsDark[i]);
          }
          setTimeout(() => {
            for (let i = 0; i < colors.length; i++) {
              changeColor(colors[i], colors[i]);
            }
            startGame();
          }, 1000);
        } else {
          clearInterval(gameStore.intervalGameOver);

          for (let i = 0; i < colors.length; i++) {
            changeColor(colors[i], colorsDark[i]);
          }
          setTimeout(() => {
            for (let i = 0; i < colors.length; i++) {
              changeColor(colors[i], colors[i]);
            }
            gameRound();
          }, 1000);
        }
      } else if (
        gameStore.seriesGame.length === gameStore.seriesPlayer.length
      ) {
        if (gameStore.seriesPlayer.length === winScore) {
          countDisplay.innerHTML = 'WIN';
          cleanAllIntervars();
          for (let i = 0; i < colors.length; i++) {
            changeColor(colors[i], colorsLight[i]);
          }
          setTimeout(() => {
            for (let i = 0; i < colors.length; i++) {
              changeColor(colors[i], colors[i]);
            }
          }, 1000);
        } else {
          gameStore.seriesPlayer = [];
          clearInterval(gameStore.intervalGameOver);
          randomColor();
          gameRound();
        }
      }
    }, 1000);
  }, delay);
};

const startGame = () => {
  cleanAllIntervars();
  unableClick(true);
  gameStore.start = true;
  gameStore.seriesGame = [];
  gameStore.seriesPlayer = [];
  gameStore.playerMistake = false;

  let delayStart = displayStart();

  gameStore.timeoutStartGame = setTimeout(() => {
    randomColor();
    gameRound();
  }, delayStart);
};

const cleanAllIntervars = () => {
  clearTimeout(gameStore.timeoutStartGame);
  clearInterval(gameStore.intervalStartGame);
  clearInterval(gameStore.intervalPlayColors);
  clearTimeout(gameStore.timeoutPushColor);
  clearTimeout(gameStore.timeoutGameRound);
  clearInterval(gameStore.intervalGameOver);
};

const turnOnGame = () => {
  document
    .getElementsByClassName('btnStrict')[0]
    .addEventListener('click', switchStrictMode);

  document
    .getElementsByClassName('btnStart')[0]
    .addEventListener('click', startGame);

  for (let i = 0; i < colors.length; i++) {
    changeColor(colors[i], colors[i]);
  }
};

const turnOffGame = () => {
  document
    .getElementsByClassName('btnStrict')[0]
    .removeEventListener('click', switchStrictMode);

  document
    .getElementsByClassName('btnStart')[0]
    .removeEventListener('click', startGame);

  document
    .getElementsByClassName('btnStrictPoint')[0]
    .classList.remove('btnStrictOn');

  gameStore.strict = false;
  gameStore.start = false;
  gameStore.seriesGame = [];
  gameStore.seriesPlayer = [];
  gameStore.playerMistake = false;
  cleanAllIntervars();
  unableClick(true);

  for (let i = 0; i < colors.length; i++) {
    changeColor(colors[i], colorsDark[i]);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const switchGame = document.getElementsByClassName('inputRange')[0];
  const countDisplay = document.getElementsByClassName('countDisplay')[0];

  switchGame.addEventListener('click', () => {
    const classList = switchGame.firstElementChild.classList;
    classList.toggle('gameOff');
    classList.toggle('gameOn');

    if (classList.contains('gameOn')) {
      turnOnGame();
      countDisplay.innerHTML = '- -';
    } else {
      turnOffGame();
      countDisplay.innerHTML = '';
    }
  });

  for (let i = 0; i < colors.length; i++) {
    document
      .getElementsByClassName(colors[i] + 'Field')[0]
      .addEventListener('click', guessColors);
  }
});
