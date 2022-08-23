const { loginUser, registerUser } = require("../services/user");

const register = async (req, res, next) => {
  try {
    const { newUser, token } = await registerUser(req.body);
    const { email, username, dateOfBirth } = newUser;
    res.status(200).json({ email, username, dateOfBirth, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body.email, req.body.password);
    const { email, username, dateOfBirth } = user;
    res.status(200).json({ email, username, dateOfBirth, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
