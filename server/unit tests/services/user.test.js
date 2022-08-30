const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { loginUser, registerUser } = require("../../services/user");
const CustomError = require("../../utils/customError");

jest.mock("../../models/userSchema");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("user service", () => {
  describe("register user", () => {
    it("should register a user", async () => {
      User.create.mockResolvedValue({ _id: "userId", email: "email" });
      jwt.sign.mockImplementationOnce(() => "token");

      const { newUser, token } = await registerUser({ email: "email" });

      expect(token).toBe("token");
      expect(newUser).toStrictEqual({ _id: "userId", email: "email" });
    });
  });
  describe("login user", () => {
    it("should login a user", async () => {
      User.findOne.mockResolvedValue({ _id: "userId", email: "email" });
      jwt.sign.mockImplementationOnce(() => "token");
      bcrypt.compare.mockImplementationOnce(() => true);

      const { user, token } = await loginUser({ email: "email" });

      expect(token).toBe("token");
      expect(user).toStrictEqual({ _id: "userId", email: "email" });
    });
  });
  /*  describe("login user password do not match", () => {
    it("should throw error", async () => {
      User.findOne.mockResolvedValue({ _id: "userId", email: "email" });
      bcrypt.compare.mockImplementationOnce(() => false);

      const { user, token } = await loginUser({ email: "email" });

      expect(loginUser).toThrowError(
        new CustomError("Authentication Error", "Email or password incorrect")
      );
    });
  }); */
});
