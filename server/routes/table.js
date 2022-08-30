const express = require("express");
const router = express.Router();

const protectAuth = require("../middlewares/protectAuth");

const {
  createTable,
  joinTable,
  getUpdatedTable,
} = require("../controllers/table");

//router.use(protectAuth);

router.route("/create").post(protectAuth, createTable);
router.route("/join/:tableId").patch(protectAuth, joinTable);
router.route("/:tableId").get(getUpdatedTable);

module.exports = router;
