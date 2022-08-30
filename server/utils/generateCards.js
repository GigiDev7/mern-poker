const cards = [
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "10S",
  "JS",
  "QS",
  "KS",
  "AS",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "10C",
  "JC",
  "QC",
  "KC",
  "AC",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "10H",
  "JH",
  "QH",
  "KH",
  "AH",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "10D",
  "JD",
  "QD",
  "KD",
  "AD",
];

const generateCards = (numberOfCards = 1, usedCards = []) => {
  let filteredCards = [];
  if (usedCards.length) {
    filteredCards = cards.filter((el) => !usedCards.includes(el));
  } else {
    filteredCards = [...cards];
  }
  let randomCards = [];
  for (let i = 0; i < numberOfCards; i++) {
    const randNum = Math.floor(Math.random() * filteredCards.length);
    randomCards.push(filteredCards[randNum]);
  }

  return randomCards;
};

module.exports = generateCards;