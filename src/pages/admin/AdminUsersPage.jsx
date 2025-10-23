// RUTA: src/pages/admin/AdminUsersPage.jsx

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
// Importamos los componentes de Bootstrap
import { Card, Table, Badge } from 'react-bootstrap'; 

function AdminUsersPage() {
  const { usuarios } = useAuth();

  return (
    // 1. Usamos la misma clase "admin-card" para consistencia
    <Card className="admin-card">
      <Card.Header as="h1">Gestión de Usuarios</Card.Header>
      <Card.Body>
        
        {/* 2. Usamos la tabla responsiva de Bootstrap */}
        <Table responsive striped bordered hover className="admin-table">
          <thead className="admin-table-header">
              <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
              </tr>
          </thead>
          <tbody>
              {/* 3. Agregamos "align-middle" para centrar el texto verticalmente */}
              {usuarios.map(usuario => (
                  <tr key={usuario.id} className="align-middle">
                      <td>{usuario.id}</td>
                      <td>{usuario.nombre} {usuario.apellido}</td>
                      <td>{usuario.email}</td>
                      <td>
                        {/* 4. Usamos Badges para que el Rol se vea mejor */}
                        <Badge 
                          pill 
                          bg={usuario.rol === 'admin' ? 'success' : 'secondary'}
                          className="admin-user-badge"
                        >
                          {usuario.rol}
                        </Badge>
                      </td>
                  </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default AdminUsersPage;