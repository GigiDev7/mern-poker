const express = require("express");
require("dotenv").config();
require("./connectDB");

const userRouter = require("./routes/user");

const app = express();

app.use("/user", userRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
