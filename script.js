const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const messageText = document.querySelector("[data-endgame-message-text]");
const screenEndGame = document.querySelector("[data-endgame-message]");
const restartButton = document.querySelector("[data-endgame-button]");

// Variável para a vez de circle
let isCircleTurn;

// Combinações de vitória
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Função para iniciar o jogo e iniciar com X
const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  screenEndGame.classList.remove("show-endgame");
};

// Função para encerrar o jogo
const endGame = (isDraw) => {
  // Verificar se é um empate ou vitória
  if (isDraw) {
    messageText.innerText = "Ah, que pena, houve um empate! 😵";
  } else {
    messageText.innerText = isCircleTurn
      ? "Uhul, O venceu! poxa, mas que triste para X, tente novamente 😿"
      : "Uhul, X venceu! poxa, mas que triste para O, tente novamente 😿";
  }

  screenEndGame.classList.add("show-endgame");
};

// Função para verificar vitória
const checkForWin = (currentPlayer) => {
  // Verifica se alguma combinação esta preenchida para retornar true
  return winningCombinations.some((combination) => {
    // Que verifica todas as células para retornar true
    return combination.every((index) => {
      // Que verifica se contém o currentPlayer em cada célula para retornar true
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

// Função para verificar empate
const checkForDraw = () => {
  // Retorna o resultado da função que verifica todos os elementos do array cellElements
  return [...cellElements].every((cell) => {
    //
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

// Função adicionar classe do símbolo
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

// Função para visualizar símbolo antes de clicar
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

// Função mudar de símbulo
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

// Função
const handleClick = (e) => {
  // Jogar símbolo (X or Circle)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar vitória
  const isWin = checkForWin(classToAdd);

  // Verificar empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
