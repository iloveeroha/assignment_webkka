import React, { useState, useEffect } from 'react';
import { exerciseAPI } from '../services/api';
import '../styles/Exercise.css';

export default function ExerciseList({ isAdmin }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    muscle: '',
    equipment: ''
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await exerciseAPI.getAll();
      setExercises(response.data);
    } catch (err) {
      console.error('Error fetching exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await exerciseAPI.update(editingId, formData);
        alert('✅ Exercise updated!');
      } else {
        await exerciseAPI.create(formData);
        alert('✅ Exercise created!');
      }
      setFormData({ name: '', muscle: '', equipment: '' });
      setEditingId(null);
      setShowForm(false);
      fetchExercises();
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (exercise) => {
    setFormData({
      name: exercise.name,
      muscle: exercise.muscle || '',
      equipment: exercise.equipment || ''
    });
    setEditingId(exercise._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(' 🗑️ Are you sure you want to delete this exercise?')) {
      try {
        await exerciseAPI.delete(id);
        alert(' ✅ Exercise deleted!');
        fetchExercises(); 
      } catch (err) {
        console.error('Error while deleting:', err);
        alert('Failed to delete exercise');
      }
    }
  };

  if (loading) return <div className="loading">⏳ Loading exercises...</div>;

  return (
    <div className="exercise-container">
      <h2>💪 Exercises</h2>
      

        <button className="btn btn-primary" onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({ name: '', muscle: '', equipment: '' });
        }}>
          {showForm ? '✕ Close' : ' Add Exercise'}
        </button>


      {showForm && (
        <form className="exercise-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Exercise Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Muscle Group</label>
            <input
              type="text"
              name="muscle"
              value={formData.muscle}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Equipment</label>
            <input
              type="text"
              name="equipment"
              value={formData.equipment}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              {editingId ? '💾 Update' : '➕ Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => {
              setShowForm(false);
              setEditingId(null);
              setFormData({ name: '', muscle: '', equipment: '' });
            }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="exercise-grid">
        {exercises.length === 0 ? (
          <p className="empty">No exercises yet</p>
        ) : (
          exercises.map(exercise => (
            <div key={exercise._id} className="exercise-card">
              <h3>💪 {exercise.name}</h3>
              <p><strong>Muscle:</strong> {exercise.muscle || 'N/A'}</p>
              <p><strong>Equipment:</strong> {exercise.equipment || 'N/A'}</p>

                <div className="card-actions">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(exercise)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(exercise._id)}>
                    🗑️ Delete
                  </button>
                </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}