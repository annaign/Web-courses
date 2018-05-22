var gameStore = {
  scorePlayer1: 0,
  scorePlayer2: 0,
  choicePlayer1: 'X',
  movesPlayer2: [],
  move: 'X',
  board: [],
};

function ZeroScore() {
  gameStore.scorePlayer1 = 0;
  gameStore.scorePlayer2 = 0;

  const scoreShow = document.querySelectorAll('.scoreShow > span');
  scoreShow[0].innerHTML = 0;
  scoreShow[1].innerHTML = 0;

  gameStore.movesPlayer2 = [
    '00cell',
    '01cell',
    '02cell',
    '10cell',
    '11cell',
    '12cell',
    '20cell',
    '21cell',
    '22cell',
  ];

  gameStore.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function CleanBoard() {
  // Очистка доски от крестиков и ноликов
  const gameField = document.querySelectorAll('.gameField > .cell');

  for (let i = 0; i < gameField.length; i++) {
    gameField[i].className = 'cell';
  }
}

function CheckMove() {
  const arr = gameStore.board;

  // 1 - первый игрок, 2 - второй игрок
  for (let i = 0; i < 3; i++) {
    if (arr[i][0] > 0 && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) {
      document.getElementById(i + '0' + 'cell').classList.add('cellColor');
      document.getElementById(i + '1' + 'cell').classList.add('cellColor');
      document.getElementById(i + '2' + 'cell').classList.add('cellColor');
      return arr[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (arr[0][i] > 0 && arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i]) {
      document.getElementById('0' + i + 'cell').classList.add('cellColor');
      document.getElementById('1' + i + 'cell').classList.add('cellColor');
      document.getElementById('2' + i + 'cell').classList.add('cellColor');
      return arr[0][i];
    }
  }
  if (arr[0][0] > 0 && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
    document.getElementById('00cell').classList.add('cellColor');
    document.getElementById('11cell').classList.add('cellColor');
    document.getElementById('22cell').classList.add('cellColor');
    return arr[0][0];
  }
  if (arr[0][2] > 0 && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
    document.getElementById('02cell').classList.add('cellColor');
    document.getElementById('11cell').classList.add('cellColor');
    document.getElementById('20cell').classList.add('cellColor');
    return arr[0][2];
  }

  return 0;
}

function CheckGameOver() {
  const checkMove = CheckMove();

  if (checkMove > 0 || gameStore.movesPlayer2.length === 0) {
    if (checkMove === 1) {
      gameStore.scorePlayer1 += 1;
      document.querySelectorAll('.scoreShow > span')[0].innerHTML =
        gameStore.scorePlayer1;
    }
    if (checkMove === 2) {
      gameStore.scorePlayer2 += 1;
      document.querySelectorAll('.scoreShow > span')[1].innerHTML =
        gameStore.scorePlayer2;
    }

    return true;
  }
  return false;
}

function NewGame() {
  gameStore.movesPlayer2 = [
    '00cell',
    '01cell',
    '02cell',
    '10cell',
    '11cell',
    '12cell',
    '20cell',
    '21cell',
    '22cell',
  ];
  gameStore.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  gameStore.move = 'X';

  CleanBoard();
}

function InitializeGame() {
  const radioChoice = document.querySelectorAll(
    '.radioChoice input[type="radio"]'
  );

  // По умолчанию выбор игрока "крестики"
  radioChoice[0].checked = true;

  // Выбор игроком X или O
  for (let i = 0; i < radioChoice.length; i++) {
    radioChoice[i].addEventListener('change', function(event) {
      gameStore.choicePlayer1 = event.target.value;
    });
  }

  ZeroScore();

  document
    .querySelector('.gameOver')
    .addEventListener('click', function(event) {
      NewGame();
      event.target.style.display = 'none';

      if (gameStore.move === 'X' && gameStore.choicePlayer1 !== 'X') {
        ComputerMove();
      }
    });

  document
    .querySelector('.gameStart')
    .addEventListener('click', function(event) {
      NewGame();
      RadioChoice(true);
      event.target.style.display = 'none';

      if (gameStore.move === 'X' && gameStore.choicePlayer1 !== 'X') {
        ComputerMove();
      }
    });

  // Активация функций для отображения крестиков и ноликов на доске
  const gameField = document.querySelectorAll('.gameField > .cell');
  for (let i = 0; i < gameField.length; i++) {
    gameField[i].addEventListener('click', function(event) {
      const cell = event.target;

      // Если кликнули по уже занятой ячейке
      if (
        cell.classList.contains('cell_X') ||
        cell.classList.contains('cell_O')
      ) {
        return;
      }

      if (PalyerMove(cell)) {
        return;
      }
      ComputerMove();
    });
  }
}

function PalyerMove(cell) {
  // Занесение хода в масиив
  gameStore.board[cell.id[0]][cell.id[1]] = 1;
  // Удаление клетки из возможных ходов
  gameStore.movesPlayer2 = gameStore.movesPlayer2.filter(function(move) {
    return move !== cell.id;
  });
  // Отображение хода на доске
  if (gameStore.move === 'X') {
    cell.classList.add('cell_X');
    gameStore.move = 'O';
  } else {
    cell.classList.add('cell_O');
    gameStore.move = 'X';
  }

  if (CheckGameOver()) {
    const gameOver = document.querySelector('.gameOver');
    gameOver.style.display = 'flex';
    return true;
  }
  return false;
}

function ComputerMove() {
  // Генерирование случайного хода
  let randomIndex = Math.round(Math.random() * gameStore.movesPlayer2.length);
  if (randomIndex === gameStore.movesPlayer2.length) {
    randomIndex = 0;
  }

  const movePlayer2 = gameStore.movesPlayer2[randomIndex];
  // Удаление клетки из возможных ходов
  gameStore.movesPlayer2 = gameStore.movesPlayer2.filter(function(move) {
    return move !== movePlayer2;
  });
  // Занесение хода в масиив
  gameStore.board[movePlayer2[0]][movePlayer2[1]] = 2;

  // Отображение хода на доске
  if (gameStore.move === 'X') {
    document.getElementById(movePlayer2).classList.add('cell_X');
    gameStore.move = 'O';
  } else {
    document.getElementById(movePlayer2).classList.add('cell_O');
    gameStore.move = 'X';
  }

  if (CheckGameOver()) {
    document.querySelector('.gameOver').style.display = 'flex';
    return true;
  }
  return false;
}

function ResetGame() {
  document.querySelector('.gameStart').style.display = 'flex';

  const radioChoice = document.querySelectorAll(
    '.radioChoice input[type="radio"]'
  );

  // По умолчанию выбор игрока "крестики"
  radioChoice[0].checked = true;
  radioChoice[1].checked = false;
  gameStore.choicePlayer1 = 'X';
  gameStore.move = 'X';

  ZeroScore();
  CleanBoard();
  RadioChoice(false);

  document.querySelector('.gameOver').style.display = 'none';
}

function RadioChoice(bool) {
  const radioChoice = document.querySelectorAll(
    '.radioChoice input[type="radio"]'
  );
  radioChoice[0].disabled = bool;
  radioChoice[1].disabled = bool;
}

document.addEventListener('DOMContentLoaded', function() {
  InitializeGame();

  document
    .getElementsByClassName('btnReset')[0]
    .addEventListener('click', function() {
      ResetGame();
    });
});
