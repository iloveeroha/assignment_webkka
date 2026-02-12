const path = require('path');
require("dotenv").config({ path: path.join(__dirname, ".env") }); 

const express = require("express");
const mongoose = require("mongoose");



const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI) 
  .then(() => console.log("✅ Atlas connected!"))
  .catch(err => console.error("❌ Mongo error:", err));

app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
