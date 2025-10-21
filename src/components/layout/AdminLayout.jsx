// RUTA: src/components/layout/AdminLayout.jsx

import React from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../../styles/admin.css'; // Asegúrate de importar tu CSS de admin

function AdminLayout() {
    const { isAdmin, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    // Usamos 'as={NavLink}' para integrar react-router-dom con react-bootstrap
    // Esto asegura que los enlaces manejen el enrutamiento y obtengan la clase '.active'
    return (
        <Container fluid>
            <Row style={{ minHeight: '100vh' }}>
                {/* --- MENÚ LATERAL IZQUIERDO --- */}
                <Col md={3} lg={2} className="text-white p-3 admin-sidebar">
                    <h2 className="fs-4 mb-4">Andromeda's Inn</h2>
                    <Nav variant="pills" className="flex-column" defaultActiveKey="/admin">
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/admin" end>
                                <i className="bi bi-house-door me-2"></i> Principal
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/admin/productos">
                                <i className="bi bi-box-seam me-2"></i> Productos
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/admin/usuarios">
                                <i className="bi bi-people me-2"></i> Usuarios
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/admin/pedidos">
                                <i className="bi bi-receipt me-2"></i> Pedidos
                            </Nav.Link>
                        </Nav.Item>
                        
                        <hr />
                        
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/">
                                <i className="bi bi-arrow-left-circle me-2"></i> Volver a la Tienda
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <Col md={9} lg={10} className="p-4" style={{ height: '100vh', overflowY: 'auto' }}>
                    <Outlet /> {/* Aquí se renderizarán las páginas de admin */}
                </Col>
            </Row>
        </Container>
    );
}

export default AdminLayout;