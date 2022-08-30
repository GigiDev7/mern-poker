const { addTable, addPlayerToTable } = require("../services/table");

const createTable = async (req, res, next) => {
  try {
    const table = await addTable(req.user.username);
    return res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

const joinTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    const table = await addPlayerToTable(req.user.username, tableId);
    return res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTable, joinTable };
