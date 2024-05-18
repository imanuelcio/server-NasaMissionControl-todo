const mongoose = require("mongoose");

const lauchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  lauchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Launch", lauchSchema);
