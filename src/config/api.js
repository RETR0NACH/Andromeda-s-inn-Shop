import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'https://andromeda-backend-vqcx.onrender.com/api/v1';

const api = axios.create({
  baseURL: apiUrl,
});

export default api;