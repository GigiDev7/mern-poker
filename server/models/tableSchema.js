const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  players: [
    {
      player: String,
      cards: [String],
      chips: { type: Number, default: 20000 },
    },
  ],
});

const Table = mongoose.model("table", tableSchema);

module.exports = Table;
