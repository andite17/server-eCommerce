require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection Sucessfull!!");
  })
  .catch((err) => {
    console.log("Failed connection : " + err);
  });

const port = process.env.LISTEN_PORT;

app.listen(port || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
