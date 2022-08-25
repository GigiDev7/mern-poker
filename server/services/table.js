const Table = require("../models/tableSchema");
const CustomError = require("../utils/customError");

const addTable = (username) => {
  return Table.create({ players: [username] });
};

const addPlayerToTable = async (username, tableId) => {
  const table = await Table.findById(tableId);
  if (!table) {
    throw new CustomError("No Table", "Table does not exist");
  }
  table.players.push(username);
  await table.save();
  return table;
};

module.exports = { addTable, addPlayerToTable };
