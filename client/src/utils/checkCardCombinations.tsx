import { cardPriority, combinationPriority } from "../cardCombinations";

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
        playerHand = arr
          .sort((a, b) => {
            let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
            let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

            if (cardPriority[st] > cardPriority[st2]) {
              return -1;
            } else {
              return 1;
            }
          })
          .slice(2);
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
        playerHand = arr
          .sort((a, b) => {
            let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
            let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

            if (cardPriority[st] > cardPriority[st2]) {
              return -1;
            } else {
              return 1;
            }
          })
          .slice(2);
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
        playerHand = arr
          .sort((a, b) => {
            let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
            let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

            if (cardPriority[st] > cardPriority[st2]) {
              return -1;
            } else {
              return 1;
            }
          })
          .slice(2);
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
      let sorted = arr.sort((a, b) => {
        let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
        let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

        if (cardPriority[st] > cardPriority[st2]) {
          return -1;
        } else {
          return 1;
        }
      });
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
          if (curPr - prevPr === -1) {
            temp++;
            prev++;
            cur++;
          } else {
            break;
          }
        }
        if (temp === 5) {
          isStraightFlush = true;
          playerHand = sorted.slice(2);
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
      let sorted = arr.sort((a, b) => {
        let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
        let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

        if (cardPriority[st] > cardPriority[st2]) {
          return -1;
        } else {
          return 1;
        }
      });
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
          if (curPr - prevPr === -1) {
            temp++;
            prev++;
            cur++;
          } else {
            break;
          }
        }
        if (temp === 5) {
          isStraightFlush = true;
          playerHand = sorted.slice(2);
          break;
        } else {
          temp = 1;
        }
      }
    }

    if (filteredCardsTwo.length >= 4) {
      let arr = [...filteredCardsTwo, playerCards[1]];
      let sorted = arr.sort((a, b) => {
        let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
        let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

        if (cardPriority[st] > cardPriority[st2]) {
          return -1;
        } else {
          return 1;
        }
      });
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
          if (curPr - prevPr === -1) {
            temp++;
            prev++;
            cur++;
          } else {
            break;
          }
        }
        if (temp === 5) {
          isStraightFlush = true;
          playerHand = sorted.slice(2);
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
  let sorted = cards.sort((a, b) => {
    let st = a.slice(0, a.length - 1) as keyof typeof cardPriority;
    let st2 = b.slice(0, b.length - 1) as keyof typeof cardPriority;

    if (cardPriority[st] > cardPriority[st2]) {
      return -1;
    } else {
      return 1;
    }
  });
  let tempObj: any = {};

  for (let card of sorted) {
    let st = card.slice(0, card.length - 1);
    tempObj[st] ? tempObj[st]++ : (tempObj[st] = 1);
    if (tempObj[st] === 4) {
      isFourOfKind = true;
      playerHand = [card, card, card, card];
      if (sorted[sorted.length - 1] === card) {
        playerHand.push(sorted[2]);
      } else {
        playerHand.push(sorted[sorted.length - 1]);
      }
      break;
    }
  }

  return { isFourOfKind, playerHand };
};
