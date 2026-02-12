const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
