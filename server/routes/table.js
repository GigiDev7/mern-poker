const express = require("express");
const router = express.Router();

const protectAuth = require("../middlewares/protectAuth");

const { createTable } = require("../controllers/table");

router.use(protectAuth);

router.route("/create").post(createTable);

module.exports = router;
