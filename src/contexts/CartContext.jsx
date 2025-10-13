// RUTA: src/contexts/CartContext.jsx

import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [carritos, setCarritos] = useLocalStorage('carritos', {});
  const { sesion } = useAuth();

  const userCart = sesion ? carritos[sesion.id] || [] : [];

  const updateCart = (newCart) => {
    if (sesion) {
      setCarritos(prev => ({ ...prev, [sesion.id]: newCart }));
    }
  };

  const addToCart = (producto) => {
    const existingProductIndex = userCart.findIndex(item => item.id === producto.id);
    let newCart = [];
    if (existingProductIndex !== -1) {
      // Si el producto ya existe, incrementamos la cantidad
      newCart = userCart.map((item, index) => 
        index === existingProductIndex ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    } else {
      // Si es un producto nuevo, lo agregamos con cantidad 1
      newCart = [...userCart, { ...producto, cantidad: 1 }];
    }
    updateCart(newCart);
  };

  const decreaseQuantity = (productId) => {
    const newCart = userCart.map(item => 
      item.id === productId ? { ...item, cantidad: Math.max(0, item.cantidad - 1) } : item
    );
    updateCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = userCart.filter(item => item.id !== productId);
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const total = userCart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const itemCount = userCart.reduce((sum, item) => sum + item.cantidad, 0);

  const value = {
    cart: userCart,
    addToCart,
    decreaseQuantity, // Nueva función para disminuir
    removeFromCart, // La usaremos para la eliminación confirmada
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}