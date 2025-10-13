// RUTA: src/contexts/OrderContext.jsx

import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('pedidos', []);
  const { sesion } = useAuth();

  const addOrder = (cart, total) => {
    if (!sesion) return; // No se puede crear un pedido sin un usuario

    const newOrder = {
      id: Date.now(),
      userId: sesion.id,
      userEmail: sesion.email,
      items: cart,
      total: total,
      date: new Date().toISOString(), // Guarda la fecha y hora de la compra
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const value = {
    orders,
    addOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}