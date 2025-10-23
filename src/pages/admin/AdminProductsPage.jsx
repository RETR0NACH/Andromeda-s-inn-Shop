// RUTA: src/pages/admin/AdminProductsPage.jsx

import React, { useState, useEffect } from 'react'; 
import { useProducts } from '../../contexts/ProductContext';
import { Card, Button, Table, Image, Form, Col, Row } from 'react-bootstrap'; 

// Estado inicial vacío para el formulario
const initialFormState = {
  id: null,
  nombre: '',
  precio: '',
  img: '',
  categoria: '',
  descripcion: ''
};

function AdminProductsPage() {
  // Traer las funciones del contexto de productos
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useProducts();
  
  // Estados para controlar el formulario
  const [showForm, setShowForm] = useState(false); // ¿Mostrar el formulario?
  const [isEditing, setIsEditing] = useState(false); // ¿Estamos editando (true) o añadiendo (false)?
  const [formData, setFormData] = useState(initialFormState); // Datos del formulario
  const [imagePreview, setImagePreview] = useState(''); // Para la vista previa de la imagen

  // Efecto para actualizar la vista previa cuando cambia formData.img
  useEffect(() => {
    // Verifica que la ruta comience con '/images/' para evitar mostrar imágenes incorrectas
    if (formData.img && formData.img.startsWith('/images/')) {
        setImagePreview(formData.img);
    } else {
        setImagePreview(''); // Limpiar si no es una ruta válida o está vacío
    }
  }, [formData.img]);

  // Funciones para manejar el formulario
  const handleShowAddForm = () => {
    setIsEditing(false); 
    setFormData(initialFormState); 
    setShowForm(true); 
  };

  const handleShowEditForm = (producto) => {
    setIsEditing(true); 
    setFormData(producto); 
    setShowForm(true); 
  };

  const handleCloseForm = () => {
    setShowForm(false); 
    setFormData(initialFormState); 
  };

  // Maneja cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir precio a número antes de guardar
    const productData = { ...formData, precio: parseInt(formData.precio, 10) || 0 };

    if (isEditing) {
      editarProducto(productData);
    } else {
      // Para agregar, quitamos el 'id' ya que el contexto lo genera
      const { id, ...newProductData } = productData;
      agregarProducto(newProductData);
    }
    handleCloseForm(); // Cierra el formulario después de guardar
  };
  
  // Función para obtener las categorías únicas
  const getCategories = () => {
    return [...new Set(productos.map(p => p.categoria))];
  };

  return (
    <Card className="admin-card">
      <Card.Header as="h1">Gestión de Productos</Card.Header>
      <Card.Body>
        
        {/* --- Botón para mostrar el formulario de Añadir --- */}
        {!showForm && ( 
          <Button variant="primary" className="mb-3" onClick={handleShowAddForm}>
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Nuevo Producto
          </Button>
        )}
        
        {/* --- FORMULARIO (Se muestra condicionalmente) --- */}
        {showForm && (
          <Card className="mb-4 admin-card"> 
            <Card.Header as="h5">
              {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    {/* Columna Izquierda */}
                    <Col md={6}>
                        <Form.Group as={Row} className="mb-3" controlId="formNombre">
                            <Form.Label column sm={3}>Nombre</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" name="nombre" value={formData.nombre} 
                                    onChange={handleChange} required 
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCategoria">
                            <Form.Label column sm={3}>Categoría</Form.Label>
                            <Col sm={9}>
                                <Form.Select 
                                    name="categoria" value={formData.categoria} 
                                    onChange={handleChange} required
                                >
                                    <option value="">Selecciona...</option>
                                    {getCategories().map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                     <option value="Nueva Categoria">-- Nueva Categoría --</option> 
                                </Form.Select>
                                {formData.categoria === 'Nueva Categoria' && (
                                     <Form.Control 
                                        type="text" placeholder="Nombre nueva categoría" 
                                        className="mt-2"
                                        onChange={(e) => setFormData(prev => ({...prev, categoria: e.target.value}))} 
                                    />
                                )}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPrecio">
                            <Form.Label column sm={3}>Precio</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="number" name="precio" value={formData.precio} 
                                    onChange={handleChange} required min="0"
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    {/* Columna Derecha */}
                    <Col md={6}>
                        <Form.Group as={Row} className="mb-3" controlId="formImg">
                            <Form.Label column sm={3}>Ruta Imagen</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" name="img" value={formData.img} 
                                    onChange={handleChange} 
                                    placeholder="/images/nombre_archivo.png" required 
                                />
                                {imagePreview && (
                                    <Image 
                                      src={imagePreview} alt="Vista previa" 
                                      className="mt-2" 
                                      style={{ maxHeight: '100px', border: '1px solid #ddd' }} 
                                    />
                                )}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formDescripcion">
                            <Form.Label column sm={3}>Descripción</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    as="textarea" rows={3} name="descripcion" 
                                    value={formData.descripcion} onChange={handleChange} required 
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                
                {/* Botones del Formulario */}
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleCloseForm}>Cancelar</Button>
                    <Button variant="primary" type="submit">
                        {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
                    </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
        
        {/* --- TABLA DE PRODUCTOS --- */}
        <Table responsive striped bordered hover className="admin-table">
          <thead className="admin-table-header">
              <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
              {productos.map(producto => (
                  <tr key={producto.id} className="align-middle">
                      <td>{producto.id}</td>
                      <td>
                        <Image 
                          src={producto.img.startsWith('/') ? producto.img : `/${producto.img}`} 
                          alt={producto.nombre} 
                          className="admin-product-img" 
                          onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.png"}} 
                        />
                      </td>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString('es-CL')}</td>
                      <td>
                          <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEditForm(producto)}>
                            <i className="bi bi-pencil-square"></i> Editar
                          </Button>
                          <Button 
                            variant="outline-danger" size="sm"
                            onClick={() => { if(confirm('¿Seguro que quieres eliminar este producto?')) eliminarProducto(producto.id) }} 
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

export default AdminProductsPage;