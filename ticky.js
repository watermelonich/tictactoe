let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Get the HTML elements
const cells = document.querySelectorAll("td");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    handleCellClick(index);
  });
});

resetButton.addEventListener("click", resetGame);

// Function to handle a cell being clicked
function handleCellClick(index) {
  if (gameBoard[index] === "" && gameActive) {
    // Update the game board and the HTML display
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    // Check for a win or tie
    if (checkForWin()) {
      endGame(false);
    } else if (checkForTie()) {
      endGame(true);
    } else {
      // Switch the current player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `It's ${currentPlayer}'s turn`;
    }
  }
}

// Check for a win
function checkForWin() {
  return winningCombos.some((combo) => {
    return combo.every((index) => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

// Check for a tie
function checkForTie() {
  return gameBoard.every((cell) => {
    return cell !== "";
  });
}

// End the game
function endGame(isTie) {
  gameActive = false;

  if (isTie) {
    message.textContent = "It's a tie!";
  } else {
    message.textContent = `${currentPlayer} wins!`;
  }

  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

// Reset the game
function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  message.textContent = `It's ${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
    cell.addEventListener("click", handleCellClick);
  });
}
