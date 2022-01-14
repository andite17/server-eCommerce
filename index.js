require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.LISTEN_PORT;
const userRouter = require("./src/routes/user");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection Sucessfull!!");
  })
  .catch((err) => {
    console.log("Failed connection : " + err);
  });

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.listen(port || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
