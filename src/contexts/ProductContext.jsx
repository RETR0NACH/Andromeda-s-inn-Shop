import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialProducts } from '../data/initialProducts';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [productos, setProductos] = useLocalStorage('productos', initialProducts);

  const agregarProducto = (producto) => {
    setProductos(prev => [...prev, { ...producto, id: Date.now() }]);
  };

  const editarProducto = (productoActualizado) => {
    setProductos(prev => prev.map(p => p.id === productoActualizado.id ? productoActualizado : p));
  };

  const eliminarProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };
  
  const value = {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}