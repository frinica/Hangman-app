"use strict";
// Globala variabler

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
]; // Array: med spelets alla ord

let selectedWord; // Håller ett ord som slumpats från ovan array
let incorrectGuesses = 0; // Antal fel gissningar
let correctGuesses = 0; // Antal rätt gissningar
let hangmanImg = document.querySelector("#hangman"); // Sökväg till bilder som visas vid fel gissning
const letterBtn = document
  .getElementById("letterButtons")
  .querySelectorAll(".btn");

const msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
const startGameBtnEl = document.querySelector("#startGameBtn"); // DOM-nod: knappen som du startar och startar om spelet med
const letterBoxEls = document.querySelector("#letterBoxes"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

//Återanvändbara funktioner

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
const init = function () {
  startGameBtnEl.textContent = "Starta nytt spel";
  // Ta bort rutorna från tidigare ord och generera ett nytt ord
  while (letterBoxEls.firstChild)
    letterBoxEls.removeChild(letterBoxEls.firstChild);
  randomWord(wordList);
  createLetterBoxes();
  // Lägg till eventListener och class till bokstäverna
  activateBtns();
  // Återställ värden
  incorrectGuesses = 0;
  correctGuesses = 0;
  guess.textContent = `Guesses: ${incorrectGuesses}/6`;
  hangmanImg.src = `images/h${incorrectGuesses}.png`;
  msgHolderEl.textContent = "";
};

// Funktion som slumpar fram ett ord
const randomWord = function (arr) {
  let random = Math.floor(Math.random() * arr.length);
  selectedWord = arr[random];
};

// Funktion som tar fram bokstävernas rutor
const createLetterBoxes = function () {
  let letters = selectedWord.split("");
  for (let i = 0; i < letters.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<input type="text" disabled value="" />`;
    letterBoxEls.appendChild(li);
  }
};

// Funktion som ropas vid vinst eller förlust
const score = function () {
  let guess = document.querySelector("#guess");
  if (correctGuesses === selectedWord.length) {
    msgHolderEl.textContent = "Grattis, du vann! 🏆";
    deactivateBtns();
  } else if (incorrectGuesses >= 1 && incorrectGuesses < 6) {
    guess.textContent = `Guesses: ${incorrectGuesses}/6`;
  } else if (incorrectGuesses === 6) {
    guess.textContent = `Guesses: ${incorrectGuesses}/6`;
    msgHolderEl.textContent = "Du förlorar... 💀";
    deactivateBtns();
  }
};

// Funktion som aktiverar bokstavsknapparna
const activateBtns = function () {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].addEventListener("click", checkLetter);
    letterBtn[i].classList.add("btn--stripe");
    letterBtn[i].classList.remove("btn--hidden");
  }
};

// Funktion som inaktiverar bokstavsknapparna
const deactivateBtns = function () {
  for (let i = 0; i < letterBtn.length; i++) {
    letterBtn[i].removeEventListener("click", checkLetter);
    letterBtn[i].classList.remove("btn--stripe");
    letterBtn[i].classList.add("btn--hidden");
  }
};

// Funktioner för att spela spelet

// Starta eller starta om spelet
startGameBtnEl.addEventListener("click", init);

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
const checkLetter = function () {
  let letter = this.value;
  // Tar bort eventListener och gömmer gissad bokstav
  this.removeEventListener("click", checkLetter);
  this.classList.remove("btn--stripe");
  this.classList.add("btn--hidden");
  // Loop som jämför gissad bokstav med bokstäverna i ordet
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
