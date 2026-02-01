# 🏋️ Fitness API

Backend REST API for managing workouts and exercises.  
Built with Node.js, Express, MongoDB and JWT authentication.

This project allows users to register, login, create exercises, create workouts, and link exercises to workouts.

---

## 🚀 Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Swagger UI
- Postman

---

🏋️ Exercises
Create exercise

POST /api/exercises

{
  "name": "Push Ups",
  "muscle": "Chest"
}

Get all exercises

GET /api/exercises

GET /api/exercises

🗓 Workouts
Create workout

POST /api/workouts

{
  "title": "Chest Day",
  "exercises": ["EXERCISE_ID"]
}

Get all workouts (with exercises)

GET /api/workouts

Exercises are populated using Mongoose populate().

🔒 Protected Route

GET /api/protected

Header:

Authorization: Bearer JWT_TOKEN


Response:

{
  "message": "You are authorized"
}

📘 Swagger Documentation

Swagger UI is available at:

http://localhost:5000/api-docs


It provides interactive API documentation for all endpoints.

🧪 Testing

All endpoints were tested using Postman.

MongoDB Compass was used to verify stored data.

📌 Notes

This project focuses on backend development.
All functionality is implemented as a REST API without frontend UI.
