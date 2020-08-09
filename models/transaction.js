const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// This is a new schema profile/model that says a name, value and date must be specified. The name should be a string and should be trimmed. The value must be a number. The date can be left blank and by deafult it will add the current date.
const transactionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    value: {
      type: Number,
      required: "Enter an amount"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
