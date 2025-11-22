// RUTA: src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';

function Sidebar({ toggleSidebar }) {
    const { isAuthenticated, sesion, isAdmin, logout } = useAuth();
    const { productos } = useProducts();

    const categorias = [...new Set(productos.map(p => p.categoria))];

    return (
        <aside id="side-menu">
            <img id="aside-logo" src="/images/Andromeda-Logo.png" alt="Logo Andromeda's Inn" />

            {isAuthenticated && (
                <div className="sidebar-user-info">
                    <span id="sidebar-hola-user">Hola, {sesion.nombre}</span>
                </div>
            )}

            <div className="sidebar-links">
                <ul id="sidebar-list">
                    {/* --- INICIO: Íconos cambiados a Bootstrap Icons --- */}
                    <li onClick={toggleSidebar}><NavLink to="/"><i className="bi bi-house-door-fill me-2"></i> Página Principal</NavLink></li>

                    {isAdmin && (
                        <li onClick={toggleSidebar}><NavLink to="/admin"><i className="bi bi-shield-lock-fill me-2"></i> Panel Admin</NavLink></li>
                    )}

                    <li>
                        <NavLink to="/catalogo" onClick={toggleSidebar}><i className="bi bi-shop me-2"></i> Catálogo</NavLink>
                        <ul className="submenu">
                            {categorias.map(cat => (
                               <li key={cat} onClick={toggleSidebar}><NavLink to={`/catalogo?categoria=${cat}`}>{cat}</NavLink></li>
                            ))}
                        </ul>
                    </li>
                    <li onClick={toggleSidebar}><NavLink to="/contacto"><i className="bi bi-envelope-fill me-2"></i> Contacto</NavLink></li>
                    {/* --- FIN: Íconos cambiados a Bootstrap Icons --- */}
                </ul>
            </div>

            {/* --- BLOQUE DE ACCIONES INFERIORES (LOGIN/LOGOUT) --- */}
            <div className="sidebar-bottom-actions">
                {isAuthenticated ? (
                    <>
                        <hr className="sidebar-divider" />
                        <div className="logout-link-wrapper">
                            <a 
                                href="#" 
                                onClick={() => { logout(); toggleSidebar(); }}
                                className="logout-button"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <hr className="sidebar-divider" />
                        <div className="login-link-wrapper">
                            <NavLink to="/login" className="login-button">
                                <i className="bi bi-box-arrow-in-right me-2"></i> Iniciar Sesión
                            </NavLink>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;