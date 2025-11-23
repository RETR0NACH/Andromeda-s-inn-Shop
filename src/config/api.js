import axios from 'axios';

const apiUrl = 'https://backen-end.onrender.com/api/v1'; 

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
    // Recuperamos las credenciales guardadas (formato: "Basic base64string")
    const authHeader = localStorage.getItem('authHeader');
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
});

export default api;