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

let selectedWord; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let guesses = 0; // Number: håller antalet gissningar som gjorts
let correctGuesses = 0;
let hangmanImg = document.querySelector("#hangman"); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let letterBtn = document.querySelectorAll(".btn--letter");

const msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
const startGameBtnEl = document.querySelector("#startGameBtn"); // DOM-nod: knappen som du startar spelet med
const letterButtonEls = document.querySelectorAll("#letterButtons"); // Array av DOM-noder: Knapparna för bokstäverna
const letterBoxEls = document.querySelector("#letterBoxes"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
const init = function () {
  //while (letterBoxEls.firstChild)
  //letterBoxEls.removeChild(letterBoxEls.firstChild);
  randomWord(wordList);
  createLetterBoxes();
};

// Funktion som slumpar fram ett ord
const randomWord = function (arr) {
  let random = Math.floor(Math.random() * arr.length);
  selectedWord = arr[random];
};

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram

const createLetterBoxes = function () {
  let letters = selectedWord.split("");
  for (let i = 0; i < letters.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<input type="text" disabled value="" />`;
    letterBoxEls.appendChild(li);
  }
};
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
const checkLetter = function () {
  let letter = this.value;
  for (let i = 0; i < selectedWord.length; i++)
    if (selectedWord.charAt(i) === letter) {
      letterBoxEls.children[
        i + 1
      ].innerHTML = `<input type="text" disabled value="${selectedWord[i]}" />`;
      correctGuesses++;
      if (correctGuesses === selectedWord.length) {
        msgHolderEl.textContent = "You win! Congratulations 🏆";
      }
    } else if (selectedWord.indexOf(letter) === -1) {
      guesses++;
      score();
      hangmanImg.src = `images/h${guesses}.png`;
      break;
    }
};

const score = function () {
  let guess = document.querySelector("#guess");
  if (guesses >= 1 && guesses < 6) {
    guess.textContent = `Guesses: ${guesses}/6`;
  } else if (guesses === 6) {
    msgHolderEl.textContent = "Game over 💀";
  }
};

/* 
- Bokstaven ska försvinna från borden
*/

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
/*
- Om spelaren vinner ändra styling
- Om spelaren förlorar ändra styling
- Alla knappar förutom "starta spelet" ska disableas när spelaren vinner/förlorar
*/

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
for (let i = 0; i < letterBtn.length; i++) {
  letterBtn[i].addEventListener("click", checkLetter);
}

startGameBtnEl.addEventListener("click", init);
