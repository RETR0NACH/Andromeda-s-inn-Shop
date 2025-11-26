import React from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { Accordion, ListGroup, Badge, Alert } from 'react-bootstrap';

function AdminOrdersPage() {
  const { orders } = useOrders();

  // Ordenar los pedidos más nuevos primero
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  return (
    <div>
      <h1 className="mb-4">Gestión de Pedidos</h1>

      {sortedOrders.length > 0 ? (
        <Accordion defaultActiveKey={sortedOrders[0]?.id.toString()} alwaysOpen>
          {sortedOrders.map(order => (
            <Accordion.Item key={order.id} eventKey={order.id.toString()}>
              <Accordion.Header>
                <div className="accordion-header-details d-flex justify-content-between w-100">
                  <span>
                    <strong>Pedido #{order.id}</strong> — Usuario ID: {order.userId}
                  </span>

                  <span>
                    {new Date(order.createdAt).toLocaleString('es-CL')}
                  </span>

                  <Badge bg="primary" pill>
                    ${order.total.toLocaleString('es-CL')}
                  </Badge>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <ListGroup variant="flush">
                  {order.items.map(item => (
                    <ListGroup.Item
                      key={`${order.id}-${item.productId}`}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <Badge bg="secondary" className="me-2">{item.quantity}x</Badge>
                        Producto #{item.productId}
                      </div>

                      <span className="text-muted">
                        ${(item.unitPrice * item.quantity).toLocaleString('es-CL')}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Alert variant="info">No hay pedidos registrados.</Alert>
      )}
    </div>
  );
}

export default AdminOrdersPage;