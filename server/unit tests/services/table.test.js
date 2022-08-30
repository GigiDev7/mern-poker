const Table = require("../../models/tableSchema");
const { addPlayerToTable, addTable } = require("../../services/table");

jest.mock("../../models/tableSchema");

describe("table service", () => {
  describe("create table", () => {
    it("should create a new table", async () => {
      Table.create.mockResolvedValue({
        _id: "tableId",
        players: ["mockPlayer"],
      });

      const result = await addTable("mockPlayer");

      expect(result).toEqual({ _id: "tableId", players: ["mockPlayer"] });
    });
  });
  describe("update table", () => {
    it("should add a player to the table", async () => {
      Table.findById.mockResolvedValue({
        _id: "tableId",
        players: ["mockPlayer"],
        save: jest.fn(() => {}),
      });

      var result = await addPlayerToTable("mockPlayerTwo", "tableId");

      expect(result.players).toEqual(["mockPlayer", "mockPlayerTwo"]);
    });
  });
});
