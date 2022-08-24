const express = require("express");
require("dotenv").config();
require("./connectDB");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

const userRouter = require("./routes/user");
const tableRouter = require("./routes/table");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/table", tableRouter);

app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
