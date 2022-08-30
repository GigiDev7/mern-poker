const express = require("express");
const router = express.Router();

const protectAuth = require("../middlewares/protectAuth");

const { createTable, joinTable } = require("../controllers/table");

router.use(protectAuth);

router.route("/create").post(createTable);
router.route("/join/:tableId").patch(joinTable);

module.exports = router;
