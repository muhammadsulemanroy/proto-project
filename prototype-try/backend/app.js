const express = require("express");
const app = express();
var cors = require('cors');
app.use(express.json());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.get("/", (req, res) => {
  res.status(200).send("Hello From suleman");
});

app.use(cors());
const supportRouter = require("./routes/supportRoutes");

app.use("/api/v1/supports", supportRouter);

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const port = 5000;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
