// RUTA: src/components/layout/AdminLayout.jsx

import React from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function AdminLayout() {
    const { isAdmin, isAuthenticated } = useAuth();

    // Si no está autenticado, no debería estar aquí
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Si está autenticado pero NO es admin, lo sacamos de aquí
    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-wrapper">
            <aside className="admin-sidebar">
                <h2>Andromeda's Inn</h2>
                <ul>
                    <li><NavLink to="/admin" end>Principal</NavLink></li>
                    <li><NavLink to="/admin/productos">Productos</NavLink></li>
                    <li><NavLink to="/admin/usuarios">Usuarios</NavLink></li>
                    <li><NavLink to="/">Volver a la Tienda</NavLink></li>
                </ul>
            </aside>
            <main className="admin-main-content">
                <Outlet /> {/* Aquí se renderizarán las páginas de admin */}
            </main>
        </div>
    );
}

export default AdminLayout;