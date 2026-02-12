import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Register from './components/Register';
import Login from './components/Login';
import ExerciseList from './components/ExerciseList';
import WorkoutList from './components/WorkoutList';
import './styles/App.css';
import Profile from './components/Profile';
import About from './components/About';
export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('exercises');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setActiveTab('exercises');
  };

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setShowRegister(false);
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  if (!user) {
    return (
      <div className="app">
        <div className="auth-nav">
          <h1>💪 Fitness App</h1>
          <button
            className="toggle-btn"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? '🔐 Login' : '📝 Register'}
          </button>
        </div>
        {showRegister ? (
          <Register onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    );
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-left">
          <h1>💪 Fitness App</h1>
          <div className="user-info">
            <span>👤 {user.id}</span>
            <span className={`role ${isAdmin ? 'admin' : 'user'}`}>
              {isAdmin ? '👑 Admin' : '👤 User'}
            </span>
          </div>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          🚪 Logout
        </button>
      </nav>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          💪 Exercises
        </button>

        <button
          className={`tab ${activeTab === 'workouts' ? 'active' : ''}`}
          onClick={() => setActiveTab('workouts')}
        >
          🗓️ Workouts
        </button>
                <button
    className={`tab ${activeTab === 'about' ? 'active' : ''}`}
    onClick={() => setActiveTab('about')}
  >
    ℹ️ Info
  </button>
        <button
    className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
    onClick={() => setActiveTab('profile')}
  >
    👤 Profile
  </button>
      </div>

      <div className="content">
        {activeTab === 'exercises' && <ExerciseList user={user} isAdmin={isAdmin} />}
        {activeTab === 'workouts' && <WorkoutList user={user} />}
        {activeTab === 'about' && <About />}
        {activeTab === 'profile' && <Profile user={user} />}
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2026 Fitness App Project. All rights reserved.</p>
          <div className="footer-links">
            <span>Built with React</span>
            <span className="separator">|</span>
            <span>Developed for Fitness Enthusiasts</span>
          </div>
        </div>
      </footer>

      {isAdmin && <div className="admin-badge">👑 Admin Panel Active</div>}
    </div>
  );
}