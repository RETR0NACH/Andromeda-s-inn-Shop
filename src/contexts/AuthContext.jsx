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
    // Se agrega un usuario admin por defecto si no existe
    const adminEmail = 'admin@admin.com';
    let allUsers = [...usuarios];
    if (!allUsers.some(u => u.email === adminEmail)) {
        const adminUser = { id: 0, nombre: 'Admin', apellido: 'User', email: adminEmail, password: 'admin', rol: 'admin' };
        allUsers.push(adminUser);
        setUsuarios(allUsers);
    }

    const usuario = allUsers.find(u => u.email === email && u.password === password);
    if (usuario) {
      setSesion(usuario);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const existe = usuarios.some(u => u.email === userData.email);
    if (existe) {
      return false; // Usuario ya existe
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