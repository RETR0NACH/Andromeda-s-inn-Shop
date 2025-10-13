// RUTA: src/pages/admin/AdminOrdersPage.jsx

import React from 'react';
import { useOrders } from '../../contexts/OrderContext';

function AdminOrdersPage() {
  const { orders } = useOrders();

  return (
    <div>
      <h1>Gestión de Pedidos</h1>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <h3>Pedido #{order.id}</h3>
              <p><strong>Usuario:</strong> {order.userEmail}</p>
              <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Total:</strong> ${order.total.toLocaleString('es-CL')}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.cantidad} x {item.nombre}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay pedidos registrados.</p>
      )}
    </div>
  );
}

export default AdminOrdersPage;