import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Cargar productos del Backend al iniciar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/products'); 
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // 2. Agregar Producto (POST)
  const agregarProducto = async (producto) => {
    try {
      const response = await api.post('/products', producto);
      setProductos(prev => [...prev, response.data]);
      alert("¡Producto guardado en la base de datos!");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar el producto.");
    }
  };

  // 3. Eliminar Producto (DELETE)
  const eliminarProducto = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProductos(prev => prev.filter(p => p.id !== id));
      alert("Producto eliminado.");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar.");
    }
  };

  // 4. Editar Producto (PUT) - Implementación básica
  const editarProducto = async (producto) => {
    try {
        // Asumiendo que tu backend tiene PUT /products/{id}
        const response = await api.put(`/products/${producto.id}`, producto);
        setProductos(prev => prev.map(p => p.id === producto.id ? response.data : p));
        alert("Producto actualizado.");
    } catch (error) {
        console.error("Error al editar:", error);
        alert("No se pudo editar.");
    }
  };

  const value = {
    productos,
    loading,
    agregarProducto,
    editarProducto,
    eliminarProducto,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}