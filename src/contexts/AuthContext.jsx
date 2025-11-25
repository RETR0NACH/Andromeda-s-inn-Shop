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
    if (sesion?.rol === 'ADMIN' || sesion?.rol === 'admin') {
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
        console.log("Iniciando login para:", email);
        
        // Limpiamos cualquier auth previa para evitar conflictos
        localStorage.removeItem('authHeader');

        // Hacemos la petición POST sin cabeceras de autorización (es pública)
        const response = await api.post('/auth/login', { email, password });
        
        console.log("Respuesta del servidor:", response.status);

        if (response.status === 200) {
            const userData = response.data;
            // Guardar el token en el localStorage para futuros requests
            if (userData.token) {
              localStorage.setItem('token', userData.token);
            }
            
            localStorage.setItem('sesion', JSON.stringify(userData));
            setSesion(userData);
            return { success: true, user: userData };
        }

    } catch (error) {
        console.error("Error completo:", error);
        
        // Manejo de errores específico
        if (error.response) {
            // El servidor respondió con un código de error (ej: 401, 403, 404)
            if (error.response.status === 401) return { success: false, message: "Contraseña incorrecta" };
            if (error.response.status === 403) return { success: false, message: "Acceso denegado (403)" };
            if (error.response.status === 404) return { success: false, message: "Usuario no encontrado" };
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta (servidor caído)
            return { success: false, message: "El servidor no responde" };
        }
        
        return { success: false, message: "Error desconocido al iniciar sesión" };
    }
  };

  // --- REGISTRO ---
  const register = async (userData) => {
    try {
        // El registro es público, no necesita auth header
        const response = await api.post('/auth/register', userData);
        
        const newUserData = response.data;
        
        if (newUserData.token) {
            localStorage.setItem('token', newUserData.token);
        }
        
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
    localStorage.removeItem('authHeader'); // Importante borrar esto
  };

  const editarUsuario = async (usuario) => {
    try {
        // Asume que tu backend tiene PUT /users/{id}
        await api.put(`/users/${usuario.id}`, usuario);
        
        // Actualizamos la lista local para ver el cambio inmediatamente
        setUsuarios(prev => prev.map(u => u.id === usuario.id ? { ...u, ...usuario } : u));
        alert("Usuario actualizado correctamente");
    } catch (error) {
        console.error("Error editando usuario:", error);
        alert("Error al editar usuario");
    }
};

const eliminarUsuario = async (id) => {
    try {
        await api.delete(`/users/${id}`);
        setUsuarios(prev => prev.filter(u => u.id !== id));
        alert("Usuario eliminado");
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        alert("Error al eliminar usuario");
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