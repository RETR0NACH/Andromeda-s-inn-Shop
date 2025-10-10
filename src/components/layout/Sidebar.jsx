import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';

function Sidebar() {
    const { isAuthenticated, sesion, isAdmin, logout } = useAuth();
    const { productos } = useProducts();

    const categorias = [...new Set(productos.map(p => p.categoria))];

    return (
        <aside id="side-menu">
            <img id="aside-logo" src="/images/Andromeda-Logo.png" alt="Logo Andromeda's Inn" />
            <ul>
                <li><NavLink to="/"><i className="fa-solid fa-house"></i> Página Principal</NavLink></li>
                
                {isAuthenticated ? (
                    <>
                        <li><a><i className="fa-solid fa-user"></i> Hola, {sesion.nombre}</a></li>
                        <li><a href="#" onClick={logout}><i className="fa-solid fa-sign-out-alt"></i> Cerrar Sesión</a></li>
                    </>
                ) : (
                    <li><NavLink to="/login"><i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión</NavLink></li>
                )}

                {isAdmin && (
                    <li><NavLink to="/admin"><i className="fa-solid fa-user-shield"></i> Panel Admin</NavLink></li>
                )}

                <li>
                    <NavLink to="/catalogo"><i className="fa-solid fa-store"></i> Catálogo</NavLink>
                    <ul className="submenu">
                        {categorias.map(cat => (
                           <li key={cat}><NavLink to={`/catalogo?categoria=${cat}`}>{cat}</NavLink></li>
                        ))}
                    </ul>
                </li>
                <li><NavLink to="/contacto"><i className="fa-solid fa-envelope"></i> Contacto</NavLink></li>
            </ul>
        </aside>
    );
}

export default Sidebar;