import { cards } from "../cards";

const generateCards = (numberOfCards: number = 1, usedCards: string[] = []) => {
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

export default generateCards;
