// RUTA: src/pages/admin/AdminOrdersPage.jsx

import React from 'react';
import { useOrders } from '../../contexts/OrderContext';
// Importamos los componentes de Bootstrap
import { Accordion, Card, ListGroup, Badge, Alert } from 'react-bootstrap';

function AdminOrdersPage() {
  const { orders } = useOrders();

  // Ordenamos los pedidos para mostrar los más nuevos primero
  const sortedOrders = [...orders].reverse();

  return (
    <div> {/* No usamos Card aquí, el acordeón será el elemento principal */}
      <h1 className="mb-4">Gestión de Pedidos</h1>
      
      {sortedOrders.length > 0 ? (
        // 1. Usamos un Acordeón. defaultActiveKey="0" abre el primer pedido por defecto.
        <Accordion defaultActiveKey={sortedOrders[0]?.id.toString()} alwaysOpen className="admin-order-accordion">
          
          {sortedOrders.map(order => (
            // 2. Cada pedido es un item del Acordeón
            <Accordion.Item key={order.id} eventKey={order.id.toString()}>
              <Accordion.Header>
                {/* 3. Mostramos un resumen claro en la cabecera */}
                <div className="accordion-header-details">
                  <span>
                    <strong>Pedido #{order.id}</strong> - {order.userEmail}
                  </span>
                  <span>
                    {new Date(order.date).toLocaleString('es-CL')}
                  </span>
                  <Badge bg="primary" pill>
                    ${order.total.toLocaleString('es-CL')}
                  </Badge>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {/* 4. Usamos una ListGroup para mostrar los items del pedido */}
                <ListGroup variant="flush">
                  {order.items.map(item => (
                    <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg="secondary" className="me-2">{item.cantidad}x</Badge>
                        {item.nombre}
                      </div>
                      <span className="text-muted">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        // 5. Mostramos una Alerta si no hay pedidos
        <Alert variant="info">No hay pedidos registrados.</Alert>
      )}
    </div>
  );
}

export default AdminOrdersPage;