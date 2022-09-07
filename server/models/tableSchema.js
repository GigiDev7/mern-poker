const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  players: [
    {
      player: String,
      cards: [String],
      chips: { type: Number, default: 20000 },
    },
  ],
  turnsPlayed: {
    type: Number,
    default: 0,
  },
});

const Table = mongoose.model("table", tableSchema);

module.exports = Table;
