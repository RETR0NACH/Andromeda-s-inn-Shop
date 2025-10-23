import React, { useState } from 'react'; // 1. Importar useState
import { useAuth } from '../../contexts/AuthContext';
// 2. Importar Form, Col, Row, Button
import { Card, Table, Badge, Form, Col, Row, Button } from 'react-bootstrap'; 

// Estado inicial vacío para el formulario de usuario
const initialUserFormState = {
  id: null,
  nombre: '',
  apellido: '',
  email: '',
  // No incluimos password ni rol
};

function AdminUsersPage() {
  // 3. Traer la nueva función 'editarUsuario'
  const { usuarios, editarUsuario } = useAuth();

  // 4. Estados para el formulario
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialUserFormState);
  // Solo necesitamos el modo edición, no hay "añadir" aquí
  const [editingUserId, setEditingUserId] = useState(null); 

  // 5. Handlers del formulario
  const handleShowEditForm = (usuario) => {
    // No permitir editar al admin
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
    setEditingUserId(usuario.id); // Guardamos el ID del usuario que estamos editando
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
      editarUsuario(formData); // Llamamos a la función del contexto
    }
    handleCloseForm();
  };

  return (
    <Card className="admin-card">
      <Card.Header as="h1">Gestión de Usuarios</Card.Header>
      <Card.Body>

        {/* --- FORMULARIO DE EDICIÓN (Se muestra condicionalmente) --- */}
        {showForm && (
          <Card className="mb-4 admin-card">
            <Card.Header as="h5">Editar Usuario</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Usamos Row y Col para un layout más ordenado */}
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="apellido" 
                      value={formData.apellido} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                
                {/* Botones del Formulario */}
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleCloseForm}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    Guardar Cambios
                  </Button>
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
                  <th>Acciones</th> {/* Nueva columna */}
              </tr>
          </thead>
          <tbody>
              {/* Filtramos el admin (id 0) para no mostrarlo en la tabla */}
              {usuarios.filter(u => u.id !== 0).map(usuario => (
                  <tr key={usuario.id} className="align-middle">
                      <td>{usuario.id}</td>
                      <td>{usuario.nombre} {usuario.apellido}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <Badge 
                          pill 
                          // Mostramos 'Cliente' en lugar de 'cliente'
                          bg={usuario.rol === 'admin' ? 'success' : 'secondary'}
                          className="admin-user-badge"
                        >
                          {usuario.rol === 'admin' ? 'Admin' : 'Cliente'}
                        </Badge>
                      </td>
                      <td>
                        {/* Botón Editar solo para clientes */}
                        {usuario.rol === 'cliente' && (
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            onClick={() => handleShowEditForm(usuario)}
                          >
                            <i className="bi bi-pencil-square"></i> Editar
                          </Button>
                        )}
                        {/* Podrías añadir un botón de eliminar aquí si quisieras */}
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