// RUTA: src/pages/admin/AdminProductsPage.jsx

import React from 'react';
import { useProducts } from '../../contexts/ProductContext';

function AdminProductsPage() {
  const { productos, eliminarProducto } = useProducts();

  // En una aplicación real, aquí tendrías estados y un formulario para agregar/editar.
  // Por ahora, solo listamos y permitimos eliminar.

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <button className="cta-button" style={{marginBottom: '1rem'}}>Agregar Nuevo Producto</button>
      
      <table className="admin-table">
          <thead>
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
                  <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td><img src={producto.img.startsWith('/') ? producto.img : `/${producto.img}`} alt={producto.nombre} width="50" /></td>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString('es-CL')}</td>
                      <td>
                          <button className="edit-btn">Editar</button>
                          <button onClick={() => { if(confirm('¿Seguro?')) eliminarProducto(producto.id) }} className="delete-btn">Eliminar</button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
  );
}

export default AdminProductsPage;