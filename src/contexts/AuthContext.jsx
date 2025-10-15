import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useLocalStorage('usuarios', []);
  const [sesion, setSesion] = useLocalStorage('sesion', null);

  const login = (email, password) => {
    const adminCredentials = {
      id: 0, 
      nombre: 'Andromeda',
      apellido: 'Admin',
      email: 'andromeda@growshop.cl',
      password: 'admin123',
      rol: 'admin'
    };

    const allUsersWithAdmin = [...usuarios];
    if (!allUsersWithAdmin.some(u => u.email === adminCredentials.email)) {
      allUsersWithAdmin.push(adminCredentials);
    }
    
    // Buscamos al usuario en la lista que incluye al admin
    const usuario = allUsersWithAdmin.find(u => u.email === email && u.password === password);

    if (usuario) {
      setSesion(usuario);
      return usuario; // Devolvemos el objeto del usuario para saber su rol
    }
    return null; // Devolvemos null si las credenciales son incorrectas
  };

  const register = (userData) => {
    if (userData.email === 'andromeda@growshop.cl') {
        return false;
    }
    const existe = usuarios.some(u => u.email === userData.email);
    if (existe) {
      return false;
    }
    const nuevoUsuario = { ...userData, id: Date.now(), rol: 'cliente' };
    setUsuarios(prev => [...prev, nuevoUsuario]);
    setSesion(nuevoUsuario);
    return true;
  };

  const logout = () => {
    setSesion(null);
  };
  
  const value = {
    usuarios,
    sesion,
    isAuthenticated: !!sesion,
    isAdmin: sesion?.rol === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}