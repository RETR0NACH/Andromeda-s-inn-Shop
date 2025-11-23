import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Solo guardamos la sesión en localStorage para no perderla al recargar
  const [sesion, setSesion] = useState(() => {
    try {
        const storedSession = localStorage.getItem('sesion');
        return storedSession ? JSON.parse(storedSession) : null;
    } catch (e) {
        return null;
    }
  });

  // 2. Estado para la lista de usuarios (para admin)
  const [usuarios, setUsuarios] = useState([]);

  // Efecto para cargar usuarios si soy admin
  useEffect(() => {
    if (sesion?.rol === 'admin') {
      const fetchUsuarios = async () => {
        try {
          const response = await api.get('/users');
          setUsuarios(response.data);
        } catch (error) {
          console.error("Error cargando usuarios:", error);
        }
      };
      fetchUsuarios();
    }
  }, [sesion]);

  // --- LOGIN ---
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const userData = response.data;

      localStorage.setItem('token', userData.token);
      localStorage.setItem('sesion', JSON.stringify(userData));
      setSesion(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Credenciales inválidas" };
    }
  };

   // --- REGISTRO ---
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const newUserData = response.data;

      localStorage.setItem('token', newUserData.token);
      localStorage.setItem('sesion', JSON.stringify(newUserData));
      setSesion(newUserData);

      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error);
      return { success: false, message: error.response?.data || "Error al registrar" };
    }
  };

  const logout = () => {
    setSesion(null);
    setUsuarios([]); 
    localStorage.removeItem('sesion');
    localStorage.removeItem('token');
  };

  // --- Funciones Admin (Placeholders conectados a API) ---
  const editarUsuario = async (usuario) => {
      // Implementar llamada PUT a API
      console.log("Editar usuario:", usuario);
  };
  const eliminarUsuario = async (id) => {
      // Implementar llamada DELETE a API
      console.log("Eliminar usuario:", id);
  };

  const value = {
    usuarios, // Ahora viene de la BD
    sesion,
    isAuthenticated: !!sesion,
    isAdmin: sesion?.rol === 'admin' || sesion?.rol === 'ADMIN', // Compatibilidad mayúsculas/minúsculas
    login,
    register,
    logout,
    editarUsuario,
    eliminarUsuario
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}