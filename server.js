require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const app = express();



const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI) 
  .then(() => console.log("✅ Atlas connected!"))
  .catch(err => console.error("❌ Mongo error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



