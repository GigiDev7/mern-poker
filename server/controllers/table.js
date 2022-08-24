const { addTable, addUserToTable } = require("../services/table");

const createTable = async (req, res, next) => {
  try {
    const table = await addTable(req.user.username);
    return res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTable };
