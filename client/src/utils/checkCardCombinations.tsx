import { cardPriority, combinationPriority } from "../cardCombinations";

const sortCards = (cards: string[]) => {
  return [...cards].sort((a, b) => {
    let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
    let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

    if (cardPriority[st] > cardPriority[st2]) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const checkRoyalFlush = (
  playerCards: string[],
  tableCards: string[]
) => {
  let isRoyalFlush = false;
  let playerHand: string[] = [];

  if (
    playerCards[0][playerCards[0].length - 1] ===
    playerCards[1][playerCards[1].length - 1]
  ) {
    const filteredCards = tableCards.filter(
      (el) => el[el.length - 1] === playerCards[0][playerCards[0].length - 1]
    );
    if (filteredCards.length >= 3) {
      let arr = [...filteredCards, ...playerCards];
      let cveti = playerCards[0][playerCards[0].length - 1];
      const royalFlush = [
        `A${cveti}`,
        `K${cveti}`,
        `Q${cveti}`,
        `J${cveti}`,
        `10${cveti}`,
      ];
      isRoyalFlush = royalFlush.every((el) => arr.includes(el));
      if (isRoyalFlush) {
        playerHand = [...royalFlush];
      }
    }
  } else if (
    playerCards[0][playerCards[0].length - 1] !==
    playerCards[1][playerCards[1].length - 1]
  ) {
    const filteredCardsOne = tableCards.filter(
      (el) => el[el.length - 1] === playerCards[0][playerCards[0].length - 1]
    );
    const filteredCardsTwo = tableCards.filter(
      (el) => el[el.length - 1] === playerCards[1][playerCards[1].length - 1]
    );

    if (filteredCardsOne.length >= 4) {
      let arr = [...filteredCardsOne, playerCards[0]];
      let cveti = playerCards[0][playerCards[0].length - 1];
      const royalFlush = [
        `A${cveti}`,
        `K${cveti}`,
        `Q${cveti}`,
        `J${cveti}`,
        `10${cveti}`,
      ];
      isRoyalFlush = royalFlush.every((el) => arr.includes(el));
      if (isRoyalFlush) {
        playerHand = [...royalFlush];
      }
    }

    if (filteredCardsTwo.length >= 4) {
      let arr = [...filteredCardsTwo, playerCards[1]];
      let cveti = playerCards[1][playerCards[1].length - 1];
      const royalFlush = [
        `A${cveti}`,
        `K${cveti}`,
        `Q${cveti}`,
        `J${cveti}`,
        `10${cveti}`,
      ];
      isRoyalFlush = royalFlush.every((el) => arr.includes(el));
      if (isRoyalFlush) {
        playerHand = [...royalFlush];
      }
    }
  }

  return { isRoyalFlush, playerHand };
};

export const chechStraightFlush = (
  playerCards: string[],
  tableCards: string[]
) => {
  let isStraightFlush = false;
  let playerHand: string[] = [];

  if (
    playerCards[0][playerCards[0].length - 1] ===
    playerCards[1][playerCards[1].length - 1]
  ) {
    const filteredCards = tableCards.filter(
      (el) => el[el.length - 1] === playerCards[0][playerCards[0].length - 1]
    );
    if (filteredCards.length >= 3) {
      let arr = [...filteredCards, ...playerCards];
      let sorted = sortCards(arr);
      for (let i = 0; i < 4; i++) {
        let prev = i;
        let cur = i + 1;
        let temp = 1;
        while (cur < sorted.length && temp < 5) {
          let prevCard = sorted[prev].slice(
            0,
            sorted[prev].length - 1
          ) as keyof typeof cardPriority;
          let curCard = sorted[cur].slice(
            0,
            sorted[cur].length - 1
          ) as keyof typeof cardPriority;
          let prevPr = cardPriority[prevCard];
          let curPr = cardPriority[curCard];
          if (curPr - prevPr === 1) {
            temp++;
            prev++;
            cur++;
          } else {
            break;
          }
        }
        if (temp === 5) {
          isStraightFlush = true;
          playerHand = sorted.slice(i, i + 5);
          break;
        } else {
          temp = 1;
        }
      }
    }
  } else if (
    playerCards[0][playerCards[0].length - 1] !==
    playerCards[1][playerCards[1].length - 1]
  ) {
    const filteredCardsOne = tableCards.filter(
      (el) => el[el.length - 1] === playerCards[0][playerCards[0].length - 1]
    );
    const filteredCardsTwo = tableCards.filter(
      (el) => el[el.length - 1] === playerCards[1][playerCards[1].length - 1]
    );

    if (filteredCardsOne.length >= 4) {
      let arr = [...filteredCardsOne, playerCards[0]];
      let sorted = sortCards(arr);
      for (let i = 0; i < 4; i++) {
        let prev = i;
        let cur = i + 1;
        let temp = 1;
        while (cur < sorted.length && temp < 5) {
          let prevCard = sorted[prev].slice(
            0,
            sorted[prev].length - 1
          ) as keyof typeof cardPriority;
          let curCard = sorted[cur].slice(
            0,
            sorted[cur].length - 1
          ) as keyof typeof cardPriority;
          let prevPr = cardPriority[prevCard];
          let curPr = cardPriority[curCard];
          if (curPr - prevPr === 1) {
            temp++;
            prev++;
            cur++;
          } else {
            break;
          }
        }
        if (temp === 5) {
          isStraightFlush = true;
          playerHand = sorted.slice(i, i + 5);
          break;
        } else {
          temp = 1;
        }
      }
    }

    if (filteredCardsTwo.length >= 4) {
      let arr = [...filteredCardsTwo, playerCards[1]];
      let sorted = sortCards(arr);
      for (let i = 0; i < 4; i++) {
        let prev = i;
        let cur = i + 1;
        let temp = 1;
        while (cur < sorted.length && temp < 5) {
          let prevCard = sorted[prev].slice(
            0,
            sorted[prev].length - 1
          ) as keyof typeof cardPriority;
          let curCard = sorted[cur].slice(
            0,
            sorted[cur].length - 1
          ) as keyof typeof cardPriority;
          let prevPr = cardPriority[prevCard];
          let curPr = cardPriority[curCard];
          if (curPr - prevPr === 1) {
            temp++;
            prev++;
            cur++;
          } else {
            break;
          }
        }
        if (temp === 5) {
          isStraightFlush = true;
          playerHand = sorted.slice(i, i + 5);
          break;
        } else {
          temp = 1;
        }
      }
    }
  }

  return { isStraightFlush, playerHand };
};

export const checkFourOfKind = (
  playerCards: string[],
  tableCards: string[]
) => {
  let isFourOfKind = false;
  let playerHand: string[] = [];

  const cards = [...playerCards, ...tableCards];
  let sorted = sortCards(cards);
  let tempObj: any = {};

  for (let card of sorted) {
    let st = card.slice(0, card.length - 1);
    tempObj[st] ? tempObj[st]++ : (tempObj[st] = 1);
    if (tempObj[st] === 4) {
      isFourOfKind = true;
      playerHand = [card, card, card, card];
      if (sorted[0] === card) {
        playerHand.push(sorted[4]);
      } else {
        playerHand.push(sorted[0]);
      }
      break;
    }
  }

  return { isFourOfKind, playerHand };
};

export const checkFullHouse = (playerCards: string[], tableCards: string[]) => {
  let isFullHouse = false;
  let playerHand: string[] = [];

  const cards = [...playerCards, ...tableCards];
  //let sorted = sortCards(cards);
  let tempObj: any = {};

  for (let card of cards) {
    let st = card.slice(0, card.length - 1);
    tempObj[st] ? tempObj[st]++ : (tempObj[st] = 1);
  }

  const entries: any = Object.entries(tempObj).sort((a: any, b: any) => {
    if (a[1] > b[1]) {
      return -1;
    } else {
      return 1;
    }
  });

  if (entries[1][1] < 2) return { isFullHouse, playerHand };

  if (entries[2][1] === 2) {
    isFullHouse = true;
    const threes = cards.filter((el) => el.startsWith(entries[0][0]));
    let twos;

    let first = entries[1][0] as keyof typeof cardPriority;
    let second = entries[2][0] as keyof typeof cardPriority;
    if (first < second) {
      twos = cards.filter((el) => el.startsWith(first));
    } else {
      twos = cards.filter((el) => el.startsWith(second));
    }
    playerHand = [...threes, ...twos];

    return { isFullHouse, playerHand };
  } else if (entries[1][1] === 3) {
    isFullHouse = true;
    let threes;
    let twos;
    let first = entries[0][0] as keyof typeof cardPriority;
    let second = entries[1][0] as keyof typeof cardPriority;

    if (first < second) {
      threes = cards.filter((el) => el.startsWith(first));
      twos = cards.filter((el) => el.startsWith(second));
    } else {
      threes = cards.filter((el) => el.startsWith(second));
      twos = cards.filter((el) => el.startsWith(first));
    }
    playerCards = [...threes, ...twos];

    return { isFullHouse, playerHand };
  } else {
    isFullHouse = true;
    const threes = cards.filter((el) => el.startsWith(entries[0][0]));
    const twos = cards.filter((el) => el.startsWith(entries[1][0]));
    playerHand = [...threes, ...twos];
    return { isFullHouse, playerHand };
  }
};
