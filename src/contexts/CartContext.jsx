 
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

  // El carrito depende del usuario que ha iniciado sesión
  const userCart = sesion ? carritos[sesion.id] || [] : [];

  const updateCart = (newCart) => {
    if (sesion) {
      setCarritos(prev => ({
        ...prev,
        [sesion.id]: newCart
      }));
    }
  };

  const addToCart = (producto) => {
    const newCart = [...userCart, producto];
    updateCart(newCart);
  };

  const removeFromCart = (productId) => {
    const index = userCart.findIndex(p => p.id === productId);
    if (index > -1) {
      const newCart = [...userCart];
      newCart.splice(index, 1);
      updateCart(newCart);
    }
  };
  
  const clearCart = () => {
    updateCart([]);
  };

  const total = userCart.reduce((sum, item) => sum + item.precio, 0);

  const value = {
    cart: userCart,
    addToCart,
    removeFromCart,
    clearCart,
    total,
    itemCount: userCart.length,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}