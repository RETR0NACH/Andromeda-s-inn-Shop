// RUTA: src/pages/admin/AdminDashboardPage.jsx
// RUTA: src/pages/admin/AdminDashboardPage.jsx

import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext'; // 1. Importamos los pedidos
import { Row, Col, Card, Alert, ListGroup } from 'react-bootstrap'; // 2. Importamos componentes de Bootstrap
import { Link } from 'react-router-dom'; // Para los enlaces de "ver más"

function AdminDashboardPage() {
    const { productos } = useProducts();
    const { usuarios } = useAuth();
    const { orders } = useOrders(); // 3. Obtenemos los pedidos

    // Obtenemos los últimos 5 pedidos para la lista
    const recentOrders = orders.slice(-5).reverse();

    return (
        <div>
            {/* --- SECCIÓN DE BIENVENIDA --- */}
            <Alert variant="primary" className="admin-welcome-alert">
                <Alert.Heading>¡Bienvenido al Panel de Administración!</Alert.Heading>
                <p>
                    Selecciona una opción de la barra lateral para comenzar a gestionar tu tienda.
                </p>
            </Alert>

            {/* --- SECCIÓN DE TARJETAS DE ESTADÍSTICAS --- */}
            <Row className="mb-4">
                
                {/* Tarjeta de Total de Productos */}
                <Col md={4}>
                    {/* Usamos clases personalizadas como 'bg-primary-admin' para que las edites en admin.css */}
                    <Card className="text-white admin-stat-card bg-primary-admin mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title as="h4">{productos.length}</Card.Title>
                                    <Card.Text>Total de Productos</Card.Text>
                                </div>
                                <i className="bi bi-box-seam fs-1"></i>
                            </div>
                        </Card.Body>
                        <Card.Footer as={Link} to="/admin/productos" className="text-white">
                            Ver detalles <i className="bi bi-arrow-right-circle"></i>
                        </Card.Footer>
                    </Card>
                </Col>

                {/* Tarjeta de Total de Usuarios */}
                <Col md={4}>
                    <Card className="text-white admin-stat-card bg-success-admin mb-3">
                        <Card.Body>
                             <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title as="h4">{usuarios.length}</Card.Title>
                                    <Card.Text>Usuarios Registrados</Card.Text>
                                </div>
                                <i className="bi bi-people fs-1"></i>
                            </div>
                        </Card.Body>
                        <Card.Footer as={Link} to="/admin/usuarios" className="text-white">
                            Ver detalles <i className="bi bi-arrow-right-circle"></i>
                        </Card.Footer>
                    </Card>
                </Col>

                {/* Tarjeta de Total de Pedidos */}
                <Col md={4}>
                    <Card className="text-white admin-stat-card bg-warning-admin mb-3">
                        <Card.Body>
                             <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title as="h4">{orders.length}</Card.Title>
                                    <Card.Text>Total de Pedidos</Card.Text>
                                </div>
                                <i className="bi bi-receipt fs-1"></i>
                            </div>
                        </Card.Body>
                        <Card.Footer as={Link} to="/admin/pedidos" className="text-white">
                            Ver detalles <i className="bi bi-arrow-right-circle"></i>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            {/* --- SECCIÓN DE PEDIDOS RECIENTES --- */}
            <Row>
                <Col>
                    <Card className="admin-card">
                        <Card.Header as="h5">Pedidos Recientes</Card.Header>
                        <Card.Body>
                            {recentOrders.length > 0 ? (
                                <ListGroup variant="flush">
                                    {recentOrders.map(order => (
                                        <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Pedido #{order.id}</strong> - {order.userEmail}
                                            </div>
                                            <div>
                                                <span className="badge bg-secondary me-2">
                                                    {order.items.length} items
                                                </span>
                                                <strong>${order.total.toLocaleString('es-CL')}</strong>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>No hay pedidos recientes.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default AdminDashboardPage;