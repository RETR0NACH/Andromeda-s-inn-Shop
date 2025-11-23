import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // 1. Estado para la sesión activa (Token y datos del usuario logueado)
  // Mantenemos esto en localStorage SOLO para que no se cierre la sesión al refrescar.
  const [sesion, setSesion] = useState(() => {
    const storedSession = localStorage.getItem('sesion');
    return storedSession ? JSON.parse(storedSession) : null;
  });

  // 2. Estado para la lista de usuarios (SOLO para el Admin)
  const [usuarios, setUsuarios] = useState([]);

  // Efecto para cargar usuarios si soy admin
  useEffect(() => {
    if (sesion?.rol === 'admin') {
      fetchUsuarios();
    }
  }, [sesion]);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/users'); // Llama al nuevo UserController
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  // --- FUNCIONES DE AUTENTICACIÓN ---

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

  // --- FUNCIONES DE GESTIÓN (CRUD REAL) ---

  const editarUsuario = async (usuarioEditado) => {
    try {
      const response = await api.put(`/users/${usuarioEditado.id}`, usuarioEditado);
      // Actualizamos el estado local para que la tabla cambie sin recargar
      setUsuarios(prev => prev.map(u => u.id === usuarioEditado.id ? response.data : u));
      alert("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error editando usuario:", error);
      alert("No se pudo editar el usuario");
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      // Filtramos el usuario eliminado de la lista visual
      setUsuarios(prev => prev.filter(u => u.id !== id));
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("No se pudo eliminar el usuario");
    }
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