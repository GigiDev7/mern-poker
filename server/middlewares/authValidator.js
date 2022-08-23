const { checkSchema } = require("express-validator");

exports.loginValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
  },
});

exports.registerValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
  },
  username: {
    in: ["body"],
    errorMessage: "Username is requried",
  },
  dateOfBirth: {
    in: ["body"],
    isDate: true,
    errorMessage: "Date of birth is required",
  },
});
