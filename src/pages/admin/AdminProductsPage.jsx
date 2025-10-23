// RUTA: src/pages/admin/AdminProductsPage.jsx

import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
// Importamos los componentes de react-bootstrap que usaremos
import { Card, Button, Table, Image } from 'react-bootstrap'; 

function AdminProductsPage() {
  const { productos, eliminarProducto } = useProducts();

  return (
    // 1. Usamos una Card para envolver la página y darle un estilo limpio
    <Card className="admin-card">
      <Card.Header as="h1">Gestión de Productos</Card.Header>
      <Card.Body>
        
        {/* 2. Convertimos el botón simple en un Button de Bootstrap con ícono */}
        <Button variant="primary" className="mb-3">
          <i className="bi bi-plus-circle me-2"></i>
          Agregar Nuevo Producto
        </Button>
        
        {/* 3. Hacemos la tabla responsiva y le damos estilos de Bootstrap */}
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
                  // 4. Alineamos verticalmente el contenido de las filas
                  <tr key={producto.id} className="align-middle">
                      <td>{producto.id}</td>
                      <td>
                        {/* 5. Usamos el componente Image de Bootstrap */}
                        <Image 
                          src={producto.img.startsWith('/') ? producto.img : `/${producto.img}`} 
                          alt={producto.nombre} 
                          className="admin-product-img" 
                        />
                      </td>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString('es-CL')}</td>
                      <td>
                          {/* 6. Convertimos las acciones en Botones de Bootstrap */}
                          <Button variant="outline-primary" size="sm" className="me-2">
                            <i className="bi bi-pencil-square"></i> Editar
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => { if(confirm('¿Seguro?')) eliminarProducto(producto.id) }} 
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