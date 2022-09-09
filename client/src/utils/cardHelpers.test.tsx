import {
  countCardFrequency,
  helperLowStraight,
  helperRoyalFlush,
  helperStraight,
  sortCards,
} from "./cardHelpers";

describe("card helper functions", () => {
  describe("count card frequency", () => {
    it("should count each card frequency and return it", () => {
      const res = countCardFrequency([
        "AD",
        "AC",
        "AS",
        "KS",
        "KD",
        "2S",
        "2D",
      ]);

      expect(res).toMatchObject({ A: 3, K: 2, "2": 2 });
    });
  });

  describe("low straight helper", () => {
    it("should return true if its low straight", () => {
      const res = helperLowStraight(["AD", "KD", "5D", "4C", "3C", "2S"]);

      expect(res.isLowStraight).toBe(true);
      expect(res.lowStraightHand).toEqual(
        expect.arrayContaining(["AD", "2S", "3C", "4C", "5D"])
      );
    });
  });

  describe("sort cards", () => {
    it("should sort cards based on priority", () => {
      const res = sortCards(["2S", "5S", "AS", "KS", "10S", "7S", "QS"]);

      expect(res).toEqual(["AS", "KS", "QS", "10S", "7S", "5S", "2S"]);
    });
  });

  describe("helper straight", () => {
    it("should return true if given cards can be straight", () => {
      const res = helperStraight(["AC", "KH", "10S", "9S", "8S", "7H", "6C"]);

      expect(res.isSTraightCombination).toBe(true);
      expect(res.straightCombinationHand).toEqual(
        expect.arrayContaining(["10S", "9S", "8S", "7H", "6C"])
      );
    });
  });

  describe("helper royal flush", () => {
    it("should return true if given cards can be royal flush", () => {
      const res = helperRoyalFlush(
        ["AD", "KD", "9H", "10D", "2S", "QD", "JD"],
        "D"
      );

      expect(res.isRoyalFlushHand).toBe(true);
      expect(res.royalFlush).toEqual(
        expect.arrayContaining(["AD", "KD", "QD", "JD", "10D"])
      );
    });
  });
});
