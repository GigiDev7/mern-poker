const { createTable, joinTable } = require("../../controllers/table");
const tableService = require("../../services/table");
const CustomError = require("../../utils/customError");
const { errorHandler } = require("../../middlewares/errorHandler");

jest.mock("../../services/table");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

const req = {
  user: {
    username: "username",
  },
  params: {
    tableId: "tableId",
  },
};

describe("table controllers", () => {
  describe("create table", () => {
    it("should create new table in DB", async () => {
      tableService.addTable.mockResolvedValue({
        _id: "tableId",
        players: ["username"],
      });

      await createTable(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        _id: "tableId",
        players: ["username"],
      });
    });
  });
  describe("join table", () => {
    it("should add new player in table", async () => {
      tableService.addPlayerToTable.mockResolvedValue({
        _id: "tableId",
        players: ["username", "usernameTwo"],
      });

      await joinTable(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        _id: "tableId",
        players: ["username", "usernameTwo"],
      });
    });
  });
  describe("join table error", () => {
    it("should return error message", async () => {
      tableService.addPlayerToTable.mockImplementationOnce(() => {
        throw new CustomError("No Table", "Table does not exist");
      });

      const next = jest.fn((e) => errorHandler(e, req, res));

      try {
        await joinTable(req, res, next);
      } catch (error) {
        next(error);
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Table does not exist",
      });
    });
  });
});
