const express = require("express");
require("dotenv").config();
require("./connectDB");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const Table = require("./models/tableSchema");
const io = require("socket.io")(8888, {
  cors: {
    origin: ["http://localhost:8000", "http://localhost:3000"],
  },
});

const userRouter = require("./routes/user");
const tableRouter = require("./routes/table");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/table", tableRouter);

app.use(errorHandler);

const port = process.env.PORT || 8080;

io.on("connection", (socket) => {
  socket.on("send-tableId", async (tableId) => {
    const table = await Table.findById(tableId);

    if (table?.players?.length > 1) {
      io.emit("get-table", JSON.stringify(table));
    }
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
