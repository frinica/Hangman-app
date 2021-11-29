"use strict";
// Global variables

const wordList = [
  "VINTERGATAN",
  "RYMDRAKET",
  "ASTRONAUT",
  "SOLSYSTEM",
  "METEORREGN",
  "HIMLAKROPP",
  "KONSTELLATION",
  "SUPERNOVA",
  "LJUSÅR",
  "TELESKOP",
]; // Array that contains the words of the game

let selectedWord; // Contain a random word from the array
let incorrectGuesses = 0; // Counter for incorrect guesses
let correctGuesses = 0; // Counter for correct guesses
let hangmanImg = document.querySelector("#hangman"); // Path to the images that displays when a guess is incorrect
const letterBtn = document
  .getElementById("letterButtons")
  .querySelectorAll(".btn"); // Selecting the buttons in the ul

const msgHolderEl = document.querySelector("#message"); // Displays message when the game is over
const startGameBtnEl = document.querySelector("#startGameBtn"); // The button that will start or restart the game
const letterBoxEls = document.querySelector("#letterBoxes"); // Array for the boxes that will contain the letters in the word

//Reusable functions below

// This function is called when player start/restart the game
const init = function () {
  startGameBtnEl.textContent = "Starta nytt spel";
  // Remove previous letter boxes
  while (letterBoxEls.firstChild)
    letterBoxEls.removeChild(letterBoxEls.firstChild);
  randomWord(wordList);
  createLetterBoxes();
  // Add event listener and class to letter buttons
  activateBtns();
  // Reset values
  incorrectGuesses = 0;
  correctGuesses = 0;
  guess.textContent = `Guesses: ${incorrectGuesses}/6`;
  hangmanImg.src = `images/h${incorrectGuesses}.png`;
  msgHolderEl.textContent = "";
};

// This function will randomize a word from the array
const randomWord = function (arr) {
  let random = Math.floor(Math.random() * arr.length);
  selectedWord = arr[random];
};

// This function creates letter boxes to be displayed
const createLetterBoxes = function () {
  let letters = selectedWord.split("");
  for (let i = 0; i < letters.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<input type="text" disabled value="" />`;
    letterBoxEls.appendChild(li);
  }
};
// This function is called when a guess has been made to update the game board
const score = function () {
  let guess = document.querySelector("#guess");
  if (correctGuesses === selectedWord.length) {
    msgHolderEl.textContent = "Grattis, du vann! 🌟";
    deactivateBtns();
  } else if (incorrectGuesses >= 1 && incorrectGuesses < 6) {
    guess.textContent = `Guesses: ${incorrectGuesses}/6`;
  } else if (incorrectGuesses === 6) {
    guess.textContent = `Guesses: ${incorrectGuesses}/6`;
    msgHolderEl.textContent = "Du förlorade... 💀";
    deactivateBtns();
  }
};

// This function activates the letter buttons
const activateBtns = function () {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].addEventListener("click", checkLetter);
    letterBtn[i].classList.add("btn--stripe");
    letterBtn[i].classList.remove("btn--hidden");
  }
};

// This function deactivate the letter buttons
const deactivateBtns = function () {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].removeEventListener("click", checkLetter);
    letterBtn[i].classList.remove("btn--stripe");
    letterBtn[i].classList.add("btn--hidden");
  }
};

// Functions to play the game below

// Start or restart the game
startGameBtnEl.addEventListener("click", init);

// This function is called when a letter is guessed
const checkLetter = function () {
  let letter = this.value;
  // Remove event listener and hide the guessed letter
  this.removeEventListener("click", checkLetter);
  this.classList.remove("btn--stripe");
  this.classList.add("btn--hidden");
  // Loop that compares the guessed letter to the letters in the word
  for (let i = 0; i < selectedWord.length; i++)
    if (selectedWord.charAt(i) === letter) {
      letterBoxEls.children[
        i
      ].innerHTML = `<input type="text" disabled value="${selectedWord[i]}" />`;
      correctGuesses++;
      score();
    } else if (selectedWord.indexOf(letter) === -1) {
      incorrectGuesses++;
      score();
      hangmanImg.src = `images/h${incorrectGuesses}.png`;
      break;
    }
};
