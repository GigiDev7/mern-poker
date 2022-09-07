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

export const checkStraightFlush = (
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
        if (temp >= 5) {
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
        if (temp >= 5) {
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
        if (temp >= 5) {
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

export const checkFlush = (playerCards: string[], tableCards: string[]) => {
  let firstCveti = playerCards[0][playerCards[0].length - 1];
  let secondCveti = playerCards[1][playerCards[1].length - 1];

  let isFlush = false;
  let playerHand: string[] = [];

  const cards = [...playerCards, ...tableCards];
  let sorted = sortCards(cards);

  if (firstCveti === secondCveti) {
    const filteredCards = sorted.filter((el) => el.endsWith(firstCveti));
    if (filteredCards.length >= 5) {
      isFlush = true;
      playerHand = filteredCards.slice(0, 5);
      return { isFlush, playerHand };
    }
  } else {
    const filteredCardsOne = sorted.filter((el) => el.endsWith(firstCveti));
    const filteredCardsTwo = sorted.filter((el) => el.endsWith(secondCveti));

    if (filteredCardsOne.length >= 5) {
      isFlush = true;
      playerHand = filteredCardsOne.slice(0, 5);
      return { isFlush, playerHand };
    }

    if (filteredCardsTwo.length >= 5) {
      isFlush = true;
      playerHand = filteredCardsTwo.slice(0, 5);
      return { isFlush, playerHand };
    }
  }

  return { isFlush, playerHand };
};

export const checkStraight = (playerCards: string[], tableCards: string[]) => {
  const cards = [...playerCards, ...tableCards];
  let sorted = Array.from(new Set(sortCards(cards)));

  let isStraight = false;
  let playerHand: string[] = [];

  if (sorted.length >= 5) {
    for (let i = 0; i < 4; i++) {
      let cur = i;
      let next = i + 1;
      let temp = 1;

      while (next < sorted.length) {
        let curCard = sorted[cur].slice(
          0,
          sorted[cur].length - 1
        ) as keyof typeof cardPriority;
        let nextCard = sorted[next].slice(
          0,
          sorted[next].length - 1
        ) as keyof typeof cardPriority;
        let curPr = cardPriority[curCard];
        let nextPr = cardPriority[nextCard];

        if (nextPr - curPr === 1) {
          cur++;
          next++;
          temp++;
        } else {
          break;
        }
      }

      if (temp >= 5) {
        isStraight = true;
        playerHand = sorted.slice(i, i + 5);
        break;
      } else {
        temp = 1;
      }
    }
  }

  return { isStraight, playerHand };
};

export const checkThreeOfKind = (
  playerCards: string[],
  tableCards: string[]
) => {
  const cards = [...playerCards, ...tableCards];
  let sorted = sortCards(cards);

  let isThreeOfKind = false;
  let playerHand: string[] = [];

  let tempObj: any = {};

  for (let card of sorted) {
    let st = card.slice(0, card.length - 1);
    tempObj[st] ? tempObj[st]++ : (tempObj[st] = 1);
  }

  const entries = Object.entries(tempObj).filter((el) => el[1] === 3);

  if (!entries.length) return { isThreeOfKind, playerHand };

  const threes = sorted.filter((el) => el.startsWith(entries[0][0]));
  playerHand = [...threes];
  if (sorted[0].startsWith(entries[0][0])) {
    playerHand.push(sorted[3], sorted[4]);
    return { isThreeOfKind, playerHand };
  }
  if (sorted[1].startsWith(entries[0][0])) {
    playerHand.push(sorted[4], sorted[5]);
    return { isThreeOfKind, playerHand };
  }

  playerHand.push(sorted[0], sorted[1]);
  return { isThreeOfKind, playerHand };
};

export const checkTwoPair = (playerCards: string[], tableCards: string[]) => {
  let isTwoPair = false;
  let playerHand: string[] = [];

  const cards = [...playerCards, ...tableCards];
  let sorted = sortCards(cards);

  let tempObj: any = {};

  for (let card of sorted) {
    let st = card.slice(0, card.length - 1);
    tempObj[st] ? tempObj[st]++ : (tempObj[st] = 1);
  }

  let entries = Object.entries(tempObj).filter((el) => el[1] === 2);

  if (entries.length < 2) return { isTwoPair, playerHand };

  isTwoPair = true;
  const firstTwos = sorted.filter((el) => el.startsWith(entries[0][0]));
  const secondTwos = sorted.filter((el) => el.startsWith(entries[1][0]));
  playerHand = [...firstTwos, ...secondTwos];

  const leftCards = sorted.filter(
    (el) => !el.startsWith(entries[0][0]) && !el.startsWith(entries[1][0])
  );
  playerHand.push(leftCards[0]);
  return { isTwoPair, playerHand };
};

export const checkOnePair = (playerCards: string[], tableCards: string[]) => {
  let isOnePair = false;
  let playerHand: string[] = [];

  const cards = [...playerCards, ...tableCards];

  let sorted = sortCards(cards);

  let tempObj: any = {};

  for (let card of sorted) {
    let st = card.slice(0, card.length - 1);
    tempObj[st] ? tempObj[st]++ : (tempObj[st] = 1);
  }

  let entries = Object.entries(tempObj).filter((el) => el[1] === 2);

  if (!entries.length) return { isOnePair, playerHand };

  isOnePair = true;
  const ones = sorted.filter((el) => el.startsWith(entries[0][0]));
  playerHand = [...ones];

  const leftCards = sorted.filter((el) => !el.startsWith(entries[0][0]));

  playerHand.push(leftCards[0], leftCards[1], leftCards[2]);
  return { isOnePair, playerHand };
};

export const checkHighCard = (playerCards: string[], tableCards: string[]) => {
  let playerHand = [];

  const sorted = sortCards([...playerCards, ...tableCards]);
  playerHand = sorted.slice(0, 5);

  return playerHand;
};

export const checkCardCombination = (
  playerCards: string[],
  tableCards: string[]
) => {
  let playerHand: { cards: string[]; combination: string } = {
    cards: [],
    combination: "",
  };

  const royalFlush = checkRoyalFlush(playerCards, tableCards);
  if (royalFlush.isRoyalFlush) {
    playerHand.cards = [...royalFlush.playerHand];
    playerHand.combination = "Royal Flush";
    return playerHand;
  }

  const straightFlush = checkStraightFlush(playerCards, tableCards);
  if (straightFlush.isStraightFlush) {
    playerHand.cards = [...straightFlush.playerHand];
    playerHand.combination = "Straight Flush";
    return playerHand;
  }

  const fourOfKind = checkFourOfKind(playerCards, tableCards);
  if (fourOfKind.isFourOfKind) {
    playerHand.cards = [...fourOfKind.playerHand];
    playerHand.combination = "Four of a kind";
    return playerHand;
  }

  const fullHouse = checkFullHouse(playerCards, tableCards);
  if (fullHouse.isFullHouse) {
    playerHand.cards = [...fullHouse.playerHand];
    playerHand.combination = "Full House";
    return playerHand;
  }

  const flush = checkFlush(playerCards, tableCards);
  if (flush.isFlush) {
    playerHand.cards = [...flush.playerHand];
    playerHand.combination = "Flush";
    return playerHand;
  }

  const straight = checkStraight(playerCards, tableCards);
  if (straight.isStraight) {
    playerHand.cards = [...straight.playerHand];
    playerHand.combination = "Straight";
    return playerHand;
  }

  const threeOfKind = checkThreeOfKind(playerCards, tableCards);
  if (threeOfKind.isThreeOfKind) {
    playerHand.cards = [...threeOfKind.playerHand];
    playerHand.combination = "Three of a kind";
    return playerHand;
  }

  const twoPairs = checkTwoPair(playerCards, tableCards);
  if (twoPairs.isTwoPair) {
    playerHand.cards = [...twoPairs.playerHand];
    playerHand.combination = "Two Pair";
    return playerHand;
  }

  const onePair = checkOnePair(playerCards, tableCards);
  if (onePair.isOnePair) {
    playerHand.cards = [...onePair.playerHand];
    playerHand.combination = "One Pair";
    return playerHand;
  }

  const highCard = checkHighCard(playerCards, tableCards);
  playerHand.cards = [...highCard];
  playerHand.combination = "High Card";
  return playerHand;
};
