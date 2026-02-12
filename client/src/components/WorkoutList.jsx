import React, { useState, useEffect } from 'react';
import { workoutAPI, exerciseAPI } from '../services/api';
import '../styles/Workout.css';

export default function WorkoutList({ isAdmin }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    exercises: []
  });
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => {
  setExpandedId(expandedId === id ? null : id); 
};
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [workoutRes, exerciseRes] = await Promise.all([
        workoutAPI.getAll(),
        exerciseAPI.getAll()
      ]);
      setWorkouts(workoutRes.data);
      setExercises(exerciseRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'exercises') {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({
        ...prev,
        exercises: selectedOptions
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await workoutAPI.update(editingId, formData);
        alert('✅ Workout updated!');
      } else {
        await workoutAPI.create(formData);
        alert('✅ Workout created!');
      }
      setFormData({ title: '', exercises: [] });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (workout) => {
    setFormData({
      title: workout.title,
      exercises: workout.exercises.map(e => e._id)
    });
    setEditingId(workout._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('🗑️ Delete this workout?')) {
      try {
        await workoutAPI.delete(id);
        alert('✅ Workout deleted!');
        fetchData();
      } catch (err) {
        alert('❌ Error: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  if (loading) return <div className="loading">⏳ Loading workouts...</div>;

  return (
    <div className="workout-container">
      <h2>🗓️ Workouts</h2>
      
<button className="btn btn-primary" onClick={() => {
  setShowForm(!showForm);
  setEditingId(null);
  setFormData({ title: '', exercises: [] });
}}>
  {showForm ? '✕ Close' : ' Create Workout'}
</button>

      {showForm && (
        <form className="workout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Workout Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Select Exercises</label>
            <select
              name="exercises"
              multiple
              value={formData.exercises}
              onChange={handleFormChange}
              size={5}
            >
              {exercises.map(exercise => (
                <option key={exercise._id} value={exercise._id}>
                  {exercise.name}
                </option>
              ))}
            </select>
            <small>Hold Ctrl/Cmd to select multiple</small>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              {editingId ? '💾 Update' : '➕ Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => {
              setShowForm(false);
              setEditingId(null);
              setFormData({ title: '', exercises: [] });
            }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="workout-grid">
        {workouts.length === 0 ? (
          <p className="empty">No workouts yet</p>
        ) : (
          workouts.map(workout => (
  <div key={workout._id} className={`workout-card ${expandedId === workout._id ? 'active' : ''}`}>
    <div className="workout-header" onClick={() => toggleExpand(workout._id)}>
      <h3>🗓️ {workout.title}</h3>
      <span className="arrow">{expandedId === workout._id ? '🔽' : '▶️'}</span>
    </div>

    <div className={`workout-content ${expandedId === workout._id ? 'show' : ''}`}>
      <div className="exercises-list">
        <strong>Exercises ({workout.exercises.length}):</strong>
        {workout.exercises.length === 0 ? (
          <p>No exercises in this workout</p>
        ) : (
          <ul>
            {workout.exercises.map(exercise => (
              <li key={exercise._id} className="exercise-item">
                💪 {exercise.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card-actions">
        <button className="btn btn-sm btn-warning" onClick={(e) => { e.stopPropagation(); handleEdit(workout); }}>
          ✏️ Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(workout._id); }}>
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
))
        )}
      </div>
    </div>
  );
}
