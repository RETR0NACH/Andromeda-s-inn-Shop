import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api'; // Importamos la conexión al Backend
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { isAdmin } = useAuth(); 

  // 1. Cargar pedidos del Backend (Solo si es Admin)
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

  // 2. Crear Pedido (Enviar al Backend)
  const addOrder = async (cart, total) => {
  try {
    const orderData = {
      total: total,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.cantidad,
        unitPrice: item.precio
      }))
    };

    const response = await api.post('/orders', orderData);

    if (response.status === 201 || response.status === 200) {
      alert("¡Compra realizada con éxito!");
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