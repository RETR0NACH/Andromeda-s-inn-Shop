// RUTA: src/pages/admin/AdminUsersPage.jsx

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function AdminUsersPage() {
  const { usuarios } = useAuth();

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <table className="admin-table">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
              </tr>
          </thead>
          <tbody>
              {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nombre} {usuario.apellido}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.rol}</td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;