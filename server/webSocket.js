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
    let tableData = {
      pot: 150,
      playingChips: {
        [table?.players[0]?.player]: 50,
        [table?.players[1]?.player]: 100,
      },
    };

    if (table?.players?.length > 1) {
      if (
        table?.players[0].cards.length === 0 &&
        table?.players[1].cards.length === 0
      ) {
        const cards = generateCards(4);
        table.players[0].cards.push(cards[0], cards[1]);
        table.players[1].cards.push(cards[2], cards[3]);
        table.players[0].chips = 19950;
        table.players[1].chips = 19900;
        await table.save();
      }

      io.emit("get-table", JSON.stringify(table), turn, tableData);
    }
  });
  socket.on("fold", async (turn, tableData) => {
    let { table, pot, playingChips } = tableData;
    const winner = table.players.find((el) => el.player !== turn);
    const loser = table.players.find((el) => el.player === turn);
    winner.chips = winner.chips + pot - 50;
    loser.chips = loser.chips - 100;
    playingChips[loser.player] = 100;
    playingChips[winner.player] = 50;
    pot = 150;
    io.emit("update-game", JSON.stringify(table), winner.player, {
      pot,
      playingChips,
    });
  });
});
