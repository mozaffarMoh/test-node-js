const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageBoxSchema = new Schema({
  message: String,
  sender: String,
  receiver: String,
  timestamp: String,
});

const MessageBox = mongoose.model("MessageBox", MessageBoxSchema);

module.exports = MessageBox;
