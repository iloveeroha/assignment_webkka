import React from 'react';
import '../styles/App.css'; 

export default function About() {
  return (
    <div className="about-container" style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
      <div className="profile-card" style={{ margin: '0 auto', maxWidth: '600px', background: 'rgba(255, 255, 255, 0.22)', borderRadius: '15px', padding: '30px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>ℹ️ About Our App</h2>
        
        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '25px' }}>
          Welcome to <strong>Fitness App</strong>! We are dedicated to providing the simplest and most effective way to track your physical progress. Our goal is to remove the clutter and focus on what truly matters: your training.
        </p>

        <div style={{ textAlign: 'left', backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px' }}>
          <h4 style={{ color: '#4facfe', marginBottom: '10px' }}>What We Offer:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>✅ <strong>Exercise Management:</strong> Create and organize your own exercise database.</li>
            <li style={{ marginBottom: '10px' }}>✅ <strong>Minimalist Design:</strong> No distractions, just your data.</li>
            <li style={{ marginBottom: '10px' }}>✅ <strong>Role-Based Access:</strong> Secure environment for users and administrators.</li>
          </ul>
        </div>
        
        <p style={{ marginTop: '30px', fontSize: '0.9rem', opacity: 0.7 }}>
          Version: 1.0.0 <br />
          Built with React & Node.js for fitness enthusiasts worldwide.
        </p>
      </div>
    </div>
  );
}