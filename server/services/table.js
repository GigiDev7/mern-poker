const Table = require("../models/tableSchema");

const addTable = (username) => {
  return Table.create({ players: [username] });
};

const addPlayerToTable = async (username, tableId) => {
  const table = await Table.findById(tableId);
  table.players.push(username);
  await table.save();
  return table;
};

module.exports = { addTable, addPlayerToTable };
