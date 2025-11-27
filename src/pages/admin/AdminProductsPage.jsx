// RUTA: src/pages/admin/AdminProductsPage.jsx

import React, { useState, useEffect } from 'react'; 
import { useProducts } from '../../contexts/ProductContext';
import { Card, Button, Table, Image, Form, Col, Row } from 'react-bootstrap'; 

const initialFormState = {
  id: null,
  nombre: '',
  precio: '',
  imagen: '', // CAMBIO: Usamos 'imagen' para coincidir con el Backend
  categoria: '',
  descripcion: ''
};

function AdminProductsPage() {
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useProducts();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Efecto para la vista previa de la imagen
  useEffect(() => {
    const imgVal = formData.imagen;
    if (imgVal) {
        // Si ya tiene ruta completa o empieza con http
        if (imgVal.startsWith('/') || imgVal.startsWith('http')) {
            setImagePreview(imgVal);
        } else {
            // Si es solo el nombre del archivo, le agregamos la ruta
            setImagePreview(`/images/${imgVal}`);
        }
    } else {
        setImagePreview('');
    }
  }, [formData.imagen]);

  const handleShowAddForm = () => {
    setIsEditing(false); 
    setFormData(initialFormState); 
    setShowForm(true); 
  };

  const handleShowEditForm = (producto) => {
    setIsEditing(true); 
    // CORRECCIÓN IMPORTANTE: Mapeo seguro para evitar "uncontrolled input"
    setFormData({
        id: producto.id,
        nombre: producto.nombre || '',
        precio: producto.precio || '',
        // Aquí recuperamos 'imagen' del backend, o 'img' si es antiguo, o vacío
        imagen: producto.imagen || producto.img || '', 
        categoria: producto.categoria || '',
        descripcion: producto.descripcion || ''
    });
    setShowForm(true); 
  };

  const handleCloseForm = () => {
    setShowForm(false); 
    setFormData(initialFormState); 
    setNewCategoryName(''); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory = formData.categoria === 'Nueva Categoria' && newCategoryName
        ? newCategoryName.trim()
        : formData.categoria;

    const productData = { 
        ...formData, 
        precio: parseInt(formData.precio, 10) || 0, 
        categoria: finalCategory 
    };

    if (isEditing) {
      editarProducto(productData);
    } else {
      const { id, ...newProductData } = productData;
      agregarProducto(newProductData);
    }
    handleCloseForm();
  };
  
  const getCategories = () => {
    return [...new Set(productos.map(p => p.categoria))];
  };

  return (
    <Card className="admin-card">
      <Card.Header as="h1">Gestión de Productos</Card.Header>
      <Card.Body>
        
        {!showForm && ( 
          <Button variant="primary" className="mb-3" onClick={handleShowAddForm}>
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Nuevo Producto
          </Button>
        )}
        
        {showForm && (
          <Card className="mb-4 admin-card"> 
            <Card.Header as="h5">
              {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
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
                                    onChange={(e) => {
                                        handleChange(e);
                                        if (e.target.value !== 'Nueva Categoria') {
                                            setNewCategoryName('');
                                        }
                                    }} required
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
                                        value={newCategoryName} 
                                        onChange={(e) => setNewCategoryName(e.target.value)} 
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
                    <Col md={6}>
                        {/* CAMBIO: Input name="imagen" en lugar de "img" */}
                        <Form.Group as={Row} className="mb-3" controlId="formImagen">
                            <Form.Label column sm={3}>Ruta Imagen</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" name="imagen" value={formData.imagen} 
                                    onChange={handleChange} 
                                    placeholder="Ej: nombre_archivo.png" required 
                                />
                                {imagePreview && (
                                    <Image 
                                      src={imagePreview} alt="Vista previa" 
                                      className="mt-2" 
                                      style={{ maxHeight: '100px', border: '1px solid #ddd' }} 
                                      onError={(e) => e.target.style.display = 'none'}
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
                        // Lógica de imagen robusta para la tabla
                        src={
                            (producto.imagen || producto.img) 
                            ? ((producto.imagen || producto.img).startsWith('/') ? (producto.imagen || producto.img) : `/images/${producto.imagen || producto.img}`)
                            : "https://placehold.co/100x100?text=Sin+Imagen"
                        } 
                        alt={producto.nombre} 
                        className="admin-product-img" 
                        onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/100x100?text=Sin+Imagen"; 
                        }} 
                      />
                      </td>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio.toLocaleString('es-CL')}</td>
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