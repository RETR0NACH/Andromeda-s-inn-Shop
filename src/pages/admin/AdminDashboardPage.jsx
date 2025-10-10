// RUTA: src/pages/admin/AdminDashboardPage.jsx

import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';

function AdminDashboardPage() {
    const { productos } = useProducts();
    const { usuarios } = useAuth();

    return (
        <div>
            <h1>Bienvenido al Panel de Administración</h1>
            <p>Selecciona una opción de la barra lateral para comenzar a gestionar tu tienda.</p>
            
            <div className="admin-card-container">
                <div className="stat-card">
                    <h4>Total de Productos</h4>
                    <p className="stat-number">{productos.length}</p>
                </div>
                <div className="stat-card">
                    <h4>Total de Usuarios Registrados</h4>
                    <p className="stat-number">{usuarios.length}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;