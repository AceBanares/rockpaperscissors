// set game choices as an array with index ranging from 0 to 2
const gameChoices = ["ROCK", "PAPER", "SCISSORS"];
// record game results
const resultTable = [];
// record game stats
const gameStats = { gameWins: 0, gameTies: 0, gameLoses: 0 };

// set variables to hold appropriate DOM elements
const btnPlayerChoice = document.querySelector("#sendChoice");
const txtPlayerChoice = document.querySelector("#playerChoice");
const txtCompChoice = document.querySelector("#compChoice");
const txtGameResult = document.querySelector("#gameResult");
const txtGameWins = document.querySelector("#gameWins");
const txtGameTies = document.querySelector("#gameTies");
const txtGameLoses = document.querySelector("#gameLoses");
const txtRepeatValue = document.querySelector("#repeatValue");
const imgPlayerChoice = document.querySelector("#playerImg");
const imgCompChoice = document.querySelector("#compImg");
const rdoGameChoices = document.querySelectorAll(".form-check-input");

function getRandom(max = 1, min = 0) {
  // get a random number from min (default: 0) to max (default: 1)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getPlayerChoice() {
  // get the radio button that is currently chosen
  return document.querySelector(".form-check-input:checked").value;
}

function getCompChoice() {
  // use index from 0 to 2 to get a random item from gameChoice
  return gameChoices[getRandom(2)];
}

function displayUpdate(
  info = { playerChoice: "", compChoice: "", gameResult: "" }
) {
  // deconstruct the array info (default: empty)
  const { playerChoice, compChoice, gameResult } = info;
  // deconstruct the array gameStats
  const { gameWins, gameTies, gameLoses } = gameStats;
  // display the choice of both player and computer
  txtPlayerChoice.textContent = `Your choice: ${playerChoice}`;
  txtCompChoice.textContent = `Computer's choice: ${compChoice}`;
  // display the result of the game
  txtGameResult.textContent = gameResult;
  txtGameWins.textContent = `Wins: ${gameWins}`;
  txtGameTies.textContent = `Ties: ${gameTies}`;
  txtGameLoses.textContent = `Loses: ${gameLoses}`;
}

function updateImage(compChoice) {
  imgPlayerChoice.src = `images\\${getPlayerChoice()}.png`;
  if (compChoice.target) {
    imgCompChoice.src = "";
    txtGameResult.textContent = "";
  } else {
    imgCompChoice.src = `images\\${compChoice}.png`;
  }
}

function getWinner() {
  // use the functions above to get both choices
  const playerChoice = getPlayerChoice();
  const compChoice = getCompChoice();
  // get resultIndex by subtracting the indices of the choices
  let resultIndex =
    gameChoices.indexOf(playerChoice) - gameChoices.indexOf(compChoice);

  // if resultIndex is -2 then it is a win
  if (resultIndex < -1) resultIndex = 1;
  // if resultIndex is 2 then it is a lost
  if (resultIndex > 1) resultIndex = -1;

  // check RESULTS MATRIX below
  let gameResult = "";
  switch (resultIndex) {
    case -1:
      gameResult = "You LOST!";
      gameStats.gameLoses++;
      break;
    case 0:
      gameResult = "You TIED!";
      gameStats.gameTies++;
      break;
    case 1:
      gameResult = "You WON!";
      gameStats.gameWins++;
      break;
    default:
      console.log("Result is not defined!");
  }

  // set an object as a parameter to update the display
  const info = { playerChoice, compChoice, gameResult };

  resultTable.push(info);
  displayUpdate(info);
  updateImage(compChoice);
}

// RESULTS MATRIX
// ---------------------------------------------
//            rock        paper       scissors
// value      0	          1           2
// ---------------------------------------------
// 		        rock	      paper	      scissors
// rock		    0 tie	      -1 lose 	  -2 win
// paper		  1 win	      0 tie	      -1 lose
// scissors	  2 lose	    1 win	      0 tie

// wait for player to click the button to declare the winner
btnPlayerChoice.addEventListener("click", () => {
  let repeatValue = txtRepeatValue.value;
  if (isNaN(repeatValue) || repeatValue == "") {
    repeatValue = 1;
    txtRepeatValue.value = 1;
  }
  for (let repeat = 0; repeat < repeatValue; repeat++) {
    getWinner();
  }
  // txtRepeatValue.value = "";
});

rdoGameChoices.forEach(choice =>
  choice.addEventListener("change", updateImage)
);

// initialize the display
displayUpdate();

// naismith - collaborator
