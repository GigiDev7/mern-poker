const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const protectAuth = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return res.status(403).json({ message: "Invalid authorization" });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedData) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = await User.findById(decodedData.id);
    next();
  });
};

module.exports = protectAuth;
