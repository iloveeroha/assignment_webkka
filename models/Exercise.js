const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscle: String,
  equipment: String
});

module.exports = mongoose.model("Exercise", exerciseSchema);
