const Workout = require("../models/Workout");

exports.createWorkout = async (req, res) => {
  try {
    const workout = new Workout({
      title: req.body.title,
      exercises: req.body.exercises,
      createdBy: req.user.id
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().populate("exercises");
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
