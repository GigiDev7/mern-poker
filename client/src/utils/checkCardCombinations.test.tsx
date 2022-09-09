import { checkRoyalFlush, checkStraightFlush } from "./checkCardCombinations";

describe("check card combinations utils", () => {
  describe("checking royal flush", () => {
    it("if its royal flush should return it", () => {
      const res = checkRoyalFlush(
        ["AH", "KH"],
        ["10H", "QH", "JH", "2S", "3S"]
      );

      expect(res.isRoyalFlush).toBe(true);
      expect(res.playerHand).toEqual(["AH", "KH", "QH", "JH", "10H"]);
    });
    it("should not return royal flush when its not", () => {
      const res = checkRoyalFlush(
        ["AH", "KH"],
        ["10H", "QH", "JC", "2S", "3S"]
      );

      expect(res.isRoyalFlush).toBe(false);
      expect(res.playerHand).toEqual([]);
    });
  });

  describe("checking straight flush", () => {
    it("should return true if its straight flush", () => {
      const res = checkStraightFlush(
        ["10S", "2H"],
        ["9S", "8S", "AC", "7S", "JS"]
      );

      expect(res.isStraightFlush).toBe(true);
      expect(res.playerHand).toEqual(["JS", "10S", "9S", "8S", "7S"]);
    });

    it("should return false if its not straight flush", () => {
      const res = checkStraightFlush(
        ["10S", "2H"],
        ["9S", "8S", "AC", "7S", "JH"]
      );

      expect(res.isStraightFlush).toBe(false);
      expect(res.playerHand).toEqual([]);
    });
  });
});
