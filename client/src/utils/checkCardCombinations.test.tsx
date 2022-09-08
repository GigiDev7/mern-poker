import { checkRoyalFlush } from "./checkCardCombinations";

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
    it("if  royal flush should return it", () => {
      const res = checkRoyalFlush(
        ["AH", "10H"],
        ["KH", "QH", "3S", "2S", "JH"]
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
    it("should return royalflush false when its not", () => {
      const res = checkRoyalFlush(
        ["AH", "KH"],
        ["10H", "3S", "JC", "2S", "JH"]
      );

      expect(res.isRoyalFlush).toBe(false);
      expect(res.playerHand).toEqual([]);
    });
  });
});
