const Table = require("./models/tableSchema");
const generateCards = require("./utils/generateCards");
const io = require("socket.io")(8888, {
  cors: {
    origin: ["http://localhost:8000", "http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("send-tableId", async (tableId) => {
    const table = await Table.findById(tableId);
    let turn = table?.players[0].player;

    if (table?.players?.length > 1) {
      if (
        table?.players[0].cards.length === 0 &&
        table?.players[1].cards.length === 0
      ) {
        const cards = generateCards(4);
        table.players[0].cards.push(cards[0], cards[1]);
        table.players[1].cards.push(cards[2], cards[3]);
        await table.save();
      }
      io.emit("get-table", JSON.stringify(table), turn);
    }
  });
});
