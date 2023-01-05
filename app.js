angular.module("ticTacToeApp", []).controller("GameController", GameController);

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", function () {
    document.table.classList.toggle("dark-mode");
    if (this.innerHTML === "Go Dark") {
      this.innerHTML = "May There Be Light";
    } else {
      this.innerHTML = "Go Dark";
    }
  });

function checkAge() {
  var player1Name = document.getElementById("player1-name").value;
  var player1Age = document.getElementById("player1-age").value;
  var player2Name = document.getElementById("player2-name").value;
  var player2Age = document.getElementById("player2-age").value;

  if (player1Age < 18 || player2Age < 18) {
    console.log("You are too young to play this game");
    document.getElementById("game-container").style.display = "none";
    document.getElementById("player-form").style.display = "block";
    document.getElementById("player-names").style.display = "none";
  } else {
    document.getElementById("game-container").style.display = "block";
    document.getElementById("player-names").style.display = "flex";
    document.getElementById("player-form").style.display = "none";
    document.getElementById("player1--name").innerHTML = player1Name;
    document.getElementById("player2--name").innerHTML = player2Name;
  }
}

document.getElementById("player-form").addEventListener("submit", checkAge);

function GameController() {
  var game = this;

  game.board = [
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
  ];
  game.currentPlayer = "X";
  game.winner = null;
  game.draw = false;

  game.makeMove = makeMove;
  game.reset = reset;

  function makeMove(cell) {
    if (game.winner || game.draw || cell.value) return;
    {
    }

    cell.value = game.currentPlayer;

    checkGameState();

    document.getElementById("move-sound").play();

    game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
  }

  function checkGameState() {
    // check rows
    for (var i = 0; i < game.board.length; i++) {
      if (
        game.board[i][0].value &&
        game.board[i][0].value === game.board[i][1].value &&
        game.board[i][1].value === game.board[i][2].value
      ) {
        game.winner = game.board[i][0].value;
        return;
      }
    }

    // check columns
    for (var j = 0; j < game.board.length; j++) {
      if (
        game.board[0][j].value &&
        game.board[0][j].value === game.board[1][j].value &&
        game.board[1][j].value === game.board[2][j].value
      ) {
        game.winner = game.board[0][j].value;
        $animate.addClass(document.getElementById("game-board"), "winner");
        return;
      }
    }

    // check diagonals
    if (
      game.board[0][0].value &&
      game.board[0][0].value === game.board[1][1].value &&
      game.board[1][1].value === game.board[2][2].value
    ) {
      game.winner = game.board[0][0].value;
      $animate.addClass(document.getElementById("game-board"), "winner");
      return;
    }
    if (
      game.board[0][2].value &&
      game.board[0][2].value === game.board[1][1].value &&
      game.board[1][1].value === game.board[2][0].value
    ) {
      game.winner = game.board[0][2].value;
      $animate.addClass(document.getElementById("game-board"), "winner");
      return;
    }

    // check for draw
    var emptyCells = 0;
    for (var i = 0; i < game.board.length; i++) {
      for (var j = 0; j < game.board[i].length; j++) {
        if (!game.board[i][j].value) {
          emptyCells++;
        }
      }
    }
    if (emptyCells === 0) {
      game.draw = true;
    }
  }

  function reset() {
    game.board = [
      [{ value: "" }, { value: "" }, { value: "" }],
      [{ value: "" }, { value: "" }, { value: "" }],
      [{ value: "" }, { value: "" }, { value: "" }],
    ];
    game.currentPlayer = "X";
    game.winner = null;
    game.draw = false;
  }
}
