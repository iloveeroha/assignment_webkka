import React from 'react';
import '../styles/Profile.css';

export default function Profile({ user }) {
  if (!user) return <div className="loading">Please log in...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {(user.username || 'U').charAt(0).toUpperCase()}
          </div>
          <h2>{user.username || 'User'}</h2>
          <span className={`badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
            {user.role}
          </span>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <strong>📧 Email:</strong> 
            <span>{user.email || 'Not provided in token'}</span>
          </div>
          <div className="detail-item">
            <strong>🆔 User ID:</strong> 
            <span>{user.id || user._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}