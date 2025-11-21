import axios from 'axios';

// Esta es la dirección de tu backend.
// Si lo subes a la nube, cambiarás esta URL. Por ahora es local.
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Interceptor: Si hay un token guardado, lo enviamos en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;