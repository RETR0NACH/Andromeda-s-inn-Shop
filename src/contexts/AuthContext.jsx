import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Inicializamos el estado leyendo del localStorage por si recarga la página
  const [sesion, setSesion] = useState(() => {
    const storedSession = localStorage.getItem('sesion');
    return storedSession ? JSON.parse(storedSession) : null;
  });

  // Función de Login Real
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // El backend nos devuelve: { token, id, email, rol, ... }
      const userData = response.data;

      // 1. Guardamos el Token para las futuras peticiones (api.js lo usa)
      localStorage.setItem('token', userData.token);
      
      // 2. Guardamos la sesión del usuario
      localStorage.setItem('sesion', JSON.stringify(userData));
      setSesion(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Credenciales incorrectas o error de servidor" };
    }
  };

  // Función de Registro Real
  const register = async (userData) => {
    try {
      // Enviamos nombre, apellido, email, password al backend
      const response = await api.post('/auth/register', userData);
      const newUserData = response.data;

      // Autologin tras registro exitoso
      localStorage.setItem('token', newUserData.token);
      localStorage.setItem('sesion', JSON.stringify(newUserData));
      setSesion(newUserData);

      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error);
      // Si el backend devuelve un mensaje de error (ej: email repetido), lo capturamos
      return { success: false, message: error.response?.data || "Error al registrarse" };
    }
  };

  const logout = () => {
    setSesion(null);
    localStorage.removeItem('sesion');
    localStorage.removeItem('token');
  };

  // Funciones de admin (Simplificadas para este contexto)
  const editarUsuario = async (usuario) => {
      // Lógica futura para conectar con backend si es necesario
      console.log("Editar usuario no implementado en backend aún", usuario);
  };
  const eliminarUsuario = async (id) => {
      // Lógica futura
      console.log("Eliminar usuario no implementado en backend aún", id);
  };

  const value = {
    usuarios: [], // Ya no usamos lista local de usuarios
    sesion,
    isAuthenticated: !!sesion,
    isAdmin: sesion?.rol === 'admin', // Asegúrate que tu backend devuelve 'admin' en minúsculas o ajusta aquí
    login,
    register,
    logout,
    editarUsuario,
    eliminarUsuario
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}