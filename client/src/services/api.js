import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (username, email, password) =>
    API.post('/auth/register', { username, email, password }),
  login: (email, password) =>
    API.post('/auth/login', { email, password })
};

export const exerciseAPI = {
  getAll: () => API.get('/exercises'),
  getById: (id) => API.get(`/exercises/${id}`),
  create: (data) => API.post('/exercises', data),
  update: (id, data) => API.put(`/exercises/${id}`, data),
  delete: (id) => API.delete(`/exercises/${id}`)
};

export const workoutAPI = {
  getAll: () => API.get('/workouts'),
  getById: (id) => API.get(`/workouts/${id}`),
  create: (data) => API.post('/workouts', data),
  update: (id, data) => API.put(`/workouts/${id}`, data),
  delete: (id) => API.delete(`/workouts/${id}`)
};

export default API;
