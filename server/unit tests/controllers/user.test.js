const { login, register } = require("../../controllers/user");
const userService = require("../../services/user");
const CustomError = require("../../utils/customError");
const { errorHandler } = require("../../middlewares/errorHandler");

jest.mock("../../services/user");

const req = {
  body: {
    email: "email",
    password: "password",
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

describe("user controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should login user and return user with token", async () => {
      userService.loginUser.mockResolvedValue({
        token: "token",
        user: {
          dateOfBirth: "1997-01-01",
          email: "email",
          _id: "userId",
          username: "username",
        },
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        dateOfBirth: "1997-01-01",
        email: "email",
        id: "userId",
        username: "username",
        token: "token",
      });
    });
  });

  describe("login Error", () => {
    it("should return an error", async () => {
      userService.loginUser.mockImplementationOnce(() => {
        throw new CustomError("Authentication Error", "User does not exist");
      });

      const next = jest.fn((e) => errorHandler(e, req, res));

      try {
        await login(req, res, next);
      } catch (error) {
        next(error);
      }

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "User does not exist" });
    });
  });

  describe("register", () => {
    it("should register a user", async () => {
      userService.registerUser.mockResolvedValue({
        token: "token",
        newUser: {
          dateOfBirth: "1997-01-01",
          email: "email",
          _id: "userId",
          username: "username",
        },
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        dateOfBirth: "1997-01-01",
        email: "email",
        id: "userId",
        username: "username",
        token: "token",
      });
    });
  });

  describe("register error", () => {
    it("should return an error", async () => {
      class MockError {
        constructor() {
          this.code = 11000;
          this.keyPattern = {
            username: "username",
          };
        }
      }

      userService.registerUser.mockImplementationOnce(() => {
        throw new MockError();
      });

      const next = jest.fn((e) => errorHandler(e, req, res));

      try {
        await register(req, res, next);
      } catch (error) {
        next(error);
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Username exists" });
    });
  });
});
