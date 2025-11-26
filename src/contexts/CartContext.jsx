import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';

const CartContext = createContext();
export function useCart() { return useContext(CartContext); }

export function CartProvider({ children }) {
  const [carritos, setCarritos] = useLocalStorage('carritos', {});
  const { sesion } = useAuth();

  // Clave para el carrito: user:id o 'guest'
  const cartKey = sesion?.id ? String(sesion.id) : 'guest';

  const userCart = carritos[cartKey] || [];

  const saveCart = (newCart) => {
    setCarritos(prev => ({ ...prev, [cartKey]: newCart }));
  };

  const addToCart = (producto) => {
    const idx = userCart.findIndex(i => i.id === producto.id);
    let newCart;
    if (idx !== -1) {
      newCart = userCart.map((it, i) => i === idx ? { ...it, cantidad: it.cantidad + 1 } : it);
    } else {
      newCart = [...userCart, { ...producto, cantidad: 1 }];
    }
    saveCart(newCart);
  };

  const decreaseQuantity = (productId) => {
    let newCart = userCart.map(item =>
      item.id === productId ? { ...item, cantidad: Math.max(0, item.cantidad - 1) } : item
    );
    // eliminar los que queden en 0
    newCart = newCart.filter(item => item.cantidad > 0);
    saveCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = userCart.filter(item => item.id !== productId);
    saveCart(newCart);
  };

  const clearCart = () => saveCart([]);

  const total = userCart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const itemCount = userCart.reduce((sum, item) => sum + item.cantidad, 0);

  const value = {
    cart: userCart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}