https://dashboard.render.com/web/srv-d66khenpm1nc73cnn31g/deploys/dep-d66kmee3jp1c73a8fu80
# 💪 Fullstack Fitness Manager

A modern, full-stack web application designed to manage exercise databases and workout routines.  
This project has evolved from a simple REST API into a complete user-driven platform with a dedicated React frontend.

---

## 🚀 Key Features (Actually Implemented)

### 🖥 Frontend (React.js)

- **Tabbed Navigation** - Seamless switching between Exercises, Workouts, Info, and Profile.
- **Authentication Flow** - Secure Login and Registration forms with persistent sessions via `localStorage`.
- **Role-Based UI** - The interface dynamically adapts based on user roles (Admin vs User).  
  Admins see management tools that regular users cannot.
- **Clean Design** - A minimalist, non-transparent UI focused on readability and professional aesthetics.
- **Global Footer** - Persistent branding and project info across all views.

---

### ⚙ Backend (Node.js & Express)

- **JWT Security** - Fully implemented JSON Web Token authentication for protected routes.
- **MongoDB Integration** - Real-time data storage using Mongoose models.
- **Data Populating** - Workouts automatically link to the Exercise collection using Mongoose `.populate()`, allowing complex data relationships.
- **Protected Operations** - Only authorized Admins can create or modify the global exercise database.

---

## 🛠 Tech Stack

### Frontend
- React  
- Vite  
- jwt-decode  
- CSS3  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  
- Mongoose  

### Security
- JWT (JSON Web Tokens)  
- Bcrypt (Password Hashing)  

### Tools
- Postman (API Testing)  
- MongoDB Compass  

---

## 🗺 Application Structure

| View | Functionality |
|------|--------------|
| 💪 **Exercises** | View the global exercise library. Admins can add new movements. |
| 🗓 **Workouts** | View curated workout routines linked to specific exercises. |
| ℹ️ **Info** | Dedicated "About Us" section explaining the app's technical vision. |
| 👤 **Profile** | User dashboard displaying Account ID, Email, and Role (Admin/User). |

---

## 📡 API Architecture (REST)

### 🔐 Authentication
POST /api/auth/register → Create a new account
POST /api/auth/login → Authenticate and receive a Bearer Token

### 💪 Exercises
GET /api/exercises → Fetch all exercises (Public)
POST /api/exercises → Create new exercise (Admin Only)

### 🗓 Workouts
GET /api/workouts → Fetch workouts with exercise data populated

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/fitness-app.git
```

### 2️⃣ Backend Setup
cd backend
npm install
npm run dev

### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

---
### 📌 Development Notes

Version 1.2.0 - Removed redundant "Goals" and "Workout Count" stats from the Profile to ensure a cleaner, data-driven UI.

Proxying - The frontend is configured via Vite to proxy API requests to the backend server to avoid CORS issues during development.

Status - Fully Functional. Current focus is on optimizing the User Profile experience.
