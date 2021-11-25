"use strict";
// Globala variabler

const wordList = [
  "Vintergatan",
  "Rymdraket",
  "Astronaut",
  "Solsystem",
  "Meteorregn",
  "Himlakropp",
  "Konstellation",
  "Supernova",
  "Ljusår",
  "Teleskop",
]; // Array: med spelets alla ord

let selectedWord; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let guesses = 0; // Number: håller antalet gissningar som gjorts
let hangmanImg; // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl; // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector("#startGameBtn"); // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll("#letterButtons"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls; // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// Funktion som slumpar fram ett ord
let randomWord = function (arr) {
  let randomWord = Math.floor(Math.random() * arr.length);
  selectedWord = arr[randomWord];
  return selectedWord;
};
// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
