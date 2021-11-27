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
let hangmanImg; // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl; // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector("#startGameBtn"); // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll("#letterButtons"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector("#letterBoxes"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
const init = function () {
  while (letterBoxEls.firstChild)
    letterBoxEls.removeChild(letterBoxEls.firstChild);
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
    li.innerHTML = `<input type="text" disabled value="${letters[i]}" />`;
    letterBoxEls.appendChild(li);
  }
};
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
/* 
- eventListener för var bokstav
- Loopa igenom ordet för att se om bokstaven finns med
- Om bokstaven finns ska den displayas
- Om bokstaven inte finns ska en img läggas till
- Bokstaven ska försvinna från borden 
 */

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
/*
- Om spelaren vinner ändra styling
- Om spelaren förlorar ändra styling
- Alla knappar förutom "starta spelet" ska disableas när spelaren vinner/förlorar
*/

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

startGameBtnEl.addEventListener("click", init);
