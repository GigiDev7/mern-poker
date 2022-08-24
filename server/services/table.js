const Table = require("../models/tableSchema");

const addTable = (username) => {
  return Table.create({ players: [username] });
};

const addUserToTable = async (username, tableId) => {
  const table = await Table.findById(tableId);
  table.players.push(username);
  await table.save();
  return { ...table, players: [...table.players, username] };
};

module.exports = { addTable, addUserToTable };
