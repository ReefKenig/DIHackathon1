const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const cardValueMap = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit + this.value;
    cardDiv.style.color = this.color;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
}

class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

function newDeck() {
  return suits.flatMap((suit) => {
    return values.map((value) => {
      return new Card(suit, value);
    });
  });
}

function initGame() {
  playerPointsDiv.innerHTML = 0;
  cpuPointsDiv.innerHTML = 0;
  playerSide.innerHTML = "";
  cpuSide.innerHTML = "";
  let playerDeck = new Deck();
  playerDeck.shuffle();
  let cpuDeck = new Deck();
  cpuDeck.shuffle();
  return [playerDeck, cpuDeck];
}

function round(playerDeck, cpuDeck) {
  playerDeck;
  let playerDraw = flipCards(playerDeck);
  let cpuDraw = flipCards(cpuDeck);
  playerSide.appendChild(playerDraw.getHTML());
  cpuSide.appendChild(cpuDraw.getHTML());

  if (isRoundWinner(playerDraw, cpuDraw) == 1) {
    playerPointsDiv.innerHTML++;
  } else if (isRoundWinner(playerDraw, cpuDraw) == 0) {
    cpuPointsDiv.innerHTML++;
  }
}

function flipCards(deck) {
  return deck.cards[Math.floor(Math.random() * deck.cards.length)];
}

function isRoundWinner(playerCard, cpuCard) {
  if (cardValueMap[playerCard.value] > cardValueMap[cpuCard.value]) return 1;
  else if (cardValueMap[playerCard.value] < cardValueMap[cpuCard.value])
    return 0;
  else return;
}

function isWinner(playerPoints, cpuPoints) {
  if (playerPoints == 10) {
    return 1;
  } else if (cpuPoints == 10) {
    return 0;
  }
  return;
}

const cpuSide = document.querySelector(".cpuDeck");
const playerSide = document.querySelector(".playerDeck");
const cpuPointsDiv = document.querySelector(".cpuPoints");
const playerPointsDiv = document.querySelector(".playerPoints");
const drawButton = document.querySelector(".drawButton");
const decks = initGame();
const playerDeck = decks[0];
const cpuDeck = decks[1];
const winTheme = new Audio("./sounds/victory sound.wav");
let gameOver;
drawButton.addEventListener("click", function () {
  if (gameOver != undefined) {
    initGame();
    gameOver = undefined;
    drawButton.innerHTML = "DRAW ANOTHER CARD!";
    return;
  }
  playerSide.innerHTML = "";
  cpuSide.innerHTML = "";
  round(playerDeck, cpuDeck);
  gameOver = isWinner(playerPointsDiv.innerHTML, cpuPointsDiv.innerHTML);
  if (gameOver != undefined) {
    if (gameOver == 1) {
      drawButton.innerHTML = "Winner!";
      winTheme.play();
      drawButton.disabled = true;
    } else if (gameOver == 0) {
      drawButton.innerHTML = "Loser...";
      drawButton.disabled = true;
    }
    setTimeout(() => {
      drawButton.innerHTML = "Start a new Game?";
      drawButton.disabled = false;
    }, 3000);
  }
});
