const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRouter = require("./routes/user");
const markerRouter = require("./routes/marker");

dotenv.config();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/uweb-travel-marker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

app.use("/api/users", userRouter);
app.use("/api/markers", markerRouter);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
