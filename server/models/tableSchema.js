const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  players: [String],
});

const Table = mongoose.model("table", tableSchema);

module.exports = Table;
