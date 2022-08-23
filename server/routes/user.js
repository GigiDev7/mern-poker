const express = require("express");
const { login, register } = require("../controllers/user");
const {
  loginValidation,
  registerValidation,
} = require("../middlewares/authValidator");
const {
  handleValidationError,
} = require("../middlewares/validationErrorHandler");

const router = express.Router();

router.route("/login").post(loginValidation, handleValidationError, login);
router
  .route("/register")
  .post(registerValidation, handleValidationError, register);

module.exports = router;
