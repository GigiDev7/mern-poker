const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class CustomError {
  constructor(name, message) {
    this.message = message;
    this.name = name;
  }
}

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const registerUser = async (userData) => {
  const newUser = await User.create(userData);
  const token = createToken(newUser._id);

  return { newUser, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Authentication Error", "User does not exist");
  }
  const isPasswordCorrect = await comparePasswords(password, user?.password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      "Authentication Error",
      "Email or password incorrect"
    );
  }

  const token = createToken(user._id);
  return { user, token };
};

module.exports = { registerUser, loginUser };
