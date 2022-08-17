let deckId;
let count1 = 0;
let count2 = 0;
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const header = document.getElementById("header");
const remainingCards = document.getElementById("remaining-cards");
const remainingCardsText = document.getElementById("remaining-cards-text");

function shuffleDeck() {
  drawCardBtn.disabled = false;
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      remainingCardsText.textContent = "Remaining Cards";
      remainingCards.textContent = data.remaining;
      deckId = data.deck_id;
      count1 = 0;
      count2 = 0;
      player1Score.textContent = `${count1}`;
      player2Score.textContent = `${count2}`;
    });
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
      cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      header.textContent = winnerText;
      remainingCards.textContent = data.remaining;

      if (data.remaining === 0) {
        drawCardBtn.disabled = true;
        if (count1 > count2) {
          header.textContent = "Player 1 won the game!";
        } else if (count2 > count1) {
          header.textContent = "Player 2 won the game!";
        } else {
          header.textContent = "It's a tie!";
        }
      }
    });
}

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    count1++;
    player1Score.textContent = `${count1}`;
    return "Player 1 wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    count2++;
    player2Score.textContent = `${count2}`;
    return "Player 2 wins!";
  } else {
    return "It's a WAR!";
  }
}

newDeckBtn.addEventListener("click", shuffleDeck);
drawCardBtn.addEventListener("click", drawCards);
