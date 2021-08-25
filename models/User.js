const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true,
    },
    email: {
      type: String,
      min: 3,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  {
    timestapms: true,
  }
);

module.exports = mongoose.model("User", User);
