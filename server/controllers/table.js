const { addTable, addPlayerToTable } = require("../services/table");
const Table = require("../models/tableSchema");

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

const getUpdatedTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;

    res.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });

    setInterval(async () => {
      const table = await Table.findById(tableId);
      console.log(table);
      res.write(`data: ${JSON.stringify(table)}`);
    }, 3000);

    ////res.write("data:" + JSON.stringify(table));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createTable, joinTable, getUpdatedTable };
