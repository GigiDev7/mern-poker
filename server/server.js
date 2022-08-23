const express = require("express");
require("dotenv").config();
require("./connectDB");
const { errorHandler } = require("./middlewares/errorHandler");

const userRouter = require("./routes/user");

const app = express();

app.use("/user", userRouter);

app.use(errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
