import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { isAdmin } = useAuth(); // Para saber si cargar todos los pedidos

  // Cargar pedidos (solo si es Admin)
  useEffect(() => {
    if (isAdmin) {
      const fetchOrders = async () => {
        try {
          const response = await api.get('/orders');
          setOrders(response.data);
        } catch (error) {
          console.error("Error cargando pedidos:", error);
        }
      };
      fetchOrders();
    }
  }, [isAdmin]);

  // Crear Pedido
  const addOrder = async (cart, total) => {
    try {
      // Preparamos el objeto tal cual lo espera el Backend (Modelo Order.java)
      const orderData = {
        total: total,
      };

      const response = await api.post('/orders', orderData);
      
      if (response.status === 200) {
        // Si es admin, actualizamos la lista local
        if (isAdmin) setOrders(prev => [...prev, response.data]);
        return true;
      }
    } catch (error) {
      console.error("Error al crear pedido:", error);
      alert("Error al procesar la compra. ¿Estás logueado?");
      return false;
    }
  };

  const value = {
    orders,
    addOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}