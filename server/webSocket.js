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
        const firstCard = generateCards();
        const secondCard = generateCards([firstCard]);
        const thirdCard = generateCards([secondCard, firstCard]);
        const fourthCard = generateCards([thirdCard, secondCard, firstCard]);
        table.players[0].cards.push(firstCard, secondCard);
        table.players[1].cards.push(thirdCard, fourthCard);
        table.players[0].chips = 19950;
        table.players[1].chips = 19900;
        await table.save();
      }

      io.emit("get-table", JSON.stringify(table), turn, tableData);
    }
  });
  socket.on("fold", async (turn, tableData) => {
    const firstCard = generateCards();
    const secondCard = generateCards([firstCard]);
    const thirdCard = generateCards([secondCard, firstCard]);
    const fourthCard = generateCards([thirdCard, secondCard, firstCard]);
    let { table, pot, playingChips } = tableData;
    table.turnsPlayed = 0;
    const winner = table.players.find((el) => el.player !== turn);
    const loser = table.players.find((el) => el.player === turn);
    winner.chips = winner.chips + pot - 50;
    loser.chips = loser.chips - 100;
    winner.cards = [firstCard, secondCard];
    loser.cards = [thirdCard, fourthCard];
    playingChips[loser.player] = 100;
    playingChips[winner.player] = 50;
    pot = 150;
    io.emit("update-game", JSON.stringify(table), winner.player, {
      pot,
      playingChips,
    });
  });

  socket.on("all-in", (turn, tableData) => {
    let { table, pot, playingChips } = tableData;
    table.turnsPlayed++;
    const turnPlayer = table.players.find((el) => el.player === turn);
    const secondPlayer = table.players.find((el) => el.player !== turn);
    pot = pot + turnPlayer.chips;
    playingChips[turnPlayer.player] =
      turnPlayer.chips + playingChips[turnPlayer.player];
    turnPlayer.chips = 0;

    if (table.turnsPlayed === 2) {
      const firstCard = generateCards([
        ...turnPlayer.cards,
        ...secondPlayer.cards,
      ]);
      const secondCard = generateCards([
        ...turnPlayer.cards,
        ...secondPlayer.cards,
        firstCard,
      ]);
      const thirdCard = generateCards([
        ...turnPlayer.cards,
        ...secondPlayer.cards,
        firstCard,
        secondCard,
      ]);

      const fourthCard = generateCards([
        ...turnPlayer.cards,
        ...secondPlayer.cards,
        firstCard,
        secondCard,
        thirdCard,
      ]);

      const fifthCard = generateCards([
        ...turnPlayer.cards,
        ...secondPlayer.cards,
        firstCard,
        secondCard,
        thirdCard,
        fourthCard,
      ]);

      io.emit("update-game", JSON.stringify(table), secondPlayer.player, {
        pot,
        playingChips,
        tableCards: [firstCard, secondCard, thirdCard, fourthCard, fifthCard],
      });
    } else {
      io.emit("update-game", JSON.stringify(table), secondPlayer.player, {
        pot,
        playingChips,
      });
    }
  });
});
