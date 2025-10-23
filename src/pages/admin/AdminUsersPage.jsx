// RUTA: src/pages/admin/AdminUsersPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Table, Badge, Form, Col, Row, Button } from 'react-bootstrap'; 

const initialUserFormState = {
  id: null,
  nombre: '',
  apellido: '',
  email: '',
};

function AdminUsersPage() {
  // 1. Traer la función 'eliminarUsuario'
  const { usuarios, editarUsuario, eliminarUsuario } = useAuth(); 

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialUserFormState);
  const [editingUserId, setEditingUserId] = useState(null); 

  const handleShowEditForm = (usuario) => {
    if (usuario.id === 0 || usuario.rol === 'admin') {
        alert("No se puede editar el usuario administrador.");
        return;
    }
    setFormData({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
    });
    setEditingUserId(usuario.id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData(initialUserFormState);
    setEditingUserId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUserId !== null) {
      console.log('Intentando guardar cambios para usuario:', formData); 
      editarUsuario(formData); // Llamamos a la función del contexto
    }
    handleCloseForm();
  };
  
  

  const handleDelete = (id, nombre) => {
      if (id === 0) { // Doble chequeo por si acaso
          alert("No se puede eliminar al administrador.");
          return;
      }

      if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${nombre}? Esta acción no se puede deshacer.`)) {
          eliminarUsuario(id);
      }
  };


  return (
    <Card className="admin-card">
      <Card.Header as="h1">Gestión de Usuarios</Card.Header>
      <Card.Body>

        {showForm && (
          <Card className="mb-4 admin-card">
            <Card.Header as="h5">Editar Usuario</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                      type="text" name="nombre" value={formData.nombre} 
                      onChange={handleChange} required 
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control 
                      type="text" name="apellido" value={formData.apellido} 
                      onChange={handleChange} required 
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="email" name="email" value={formData.email} 
                    onChange={handleChange} required 
                  />
                </Form.Group>
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleCloseForm}>Cancelar</Button>
                  <Button variant="primary" type="submit">Guardar Cambios</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
        
        {/* --- TABLA DE USUARIOS --- */}
        <Table responsive striped bordered hover className="admin-table">
          <thead className="admin-table-header">
              <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th> 
              </tr>
          </thead>
          <tbody>
              {usuarios.filter(u => u.id !== 0).map(usuario => (
                  <tr key={usuario.id} className="align-middle">
                      <td>{usuario.id}</td>
                      <td>{usuario.nombre} {usuario.apellido}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <Badge pill bg={'secondary'} className="admin-user-badge">
                          Cliente 
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm"  
                          className="me-2"  
                          onClick={() => handleShowEditForm(usuario)}
                        >
                          <i className="bi bi-pencil-square"></i> Editar
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"  
                          onClick={() => handleDelete(usuario.id, `${usuario.nombre} ${usuario.apellido}`)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
                        </Button>
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