import { cardPriority } from "../cardCombinations";

export const sortCards = (cards: string[]) => {
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

export const helperLowStraight = (cardsArr: string[]) => {
  let isLowStraight = false;
  let lowStraightHand: string[] = [];
  if (
    cardsArr[cardsArr.length - 1].startsWith("2") &&
    cardsArr[cardsArr.length - 2].startsWith("3") &&
    cardsArr[cardsArr.length - 3].startsWith("4") &&
    cardsArr[cardsArr.length - 4].startsWith("5") &&
    cardsArr[0].startsWith("A")
  ) {
    isLowStraight = true;
    lowStraightHand = [
      cardsArr[cardsArr.length - 4],
      cardsArr[cardsArr.length - 3],
      cardsArr[cardsArr.length - 2],
      cardsArr[cardsArr.length - 1],
      cardsArr[0],
    ];
  }

  return { isLowStraight, lowStraightHand };
};

export const countCardFrequency = (cardsArr: string[]) => {
  let frequencyObj: any = {};

  for (let card of cardsArr) {
    let st = card.slice(0, card.length - 1);
    frequencyObj[st] ? frequencyObj[st]++ : (frequencyObj[st] = 1);
  }

  return frequencyObj;
};

export const helperStraight = (cardsArr: string[]) => {
  let isSTraightCombination = false;
  let straightCombinationHand: string[] = [];

  for (let i = 0; i < 4; i++) {
    let prev = i;
    let cur = i + 1;
    let temp = 1;
    while (cur < cardsArr.length && temp < 5) {
      let prevCard = cardsArr[prev].slice(
        0,
        cardsArr[prev].length - 1
      ) as keyof typeof cardPriority;
      let curCard = cardsArr[cur].slice(
        0,
        cardsArr[cur].length - 1
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
      isSTraightCombination = true;
      straightCombinationHand = cardsArr.slice(i, i + 5);
      break;
    } else {
      temp = 1;
    }
  }

  return { isSTraightCombination, straightCombinationHand };
};
