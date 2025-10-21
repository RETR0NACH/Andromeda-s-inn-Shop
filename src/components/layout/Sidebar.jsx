import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';

// Recibimos la función `toggleSidebar` para que el botón de cerrar funcione
function Sidebar({ toggleSidebar }) {
    const { isAuthenticated, sesion, isAdmin, logout } = useAuth();
    const { productos } = useProducts();

    const categorias = [...new Set(productos.map(p => p.categoria))];

    return (
        <aside id="side-menu">
            {/* Botón para cerrar el menú en móvil */}
            <button className="close-sidebar-btn" onClick={toggleSidebar}>
                <i className="fa-solid fa-times"></i>
            </button>

            <img id="aside-logo" src="/images/Andromeda-Logo.png" alt="Logo Andromeda's Inn" />
            
            {/* Envolvemos la lista en un div para controlar el scroll independientemente del logo */}
            <div className="sidebar-links">
                <ul>
                    {/* Al hacer clic en un enlace, cerramos el menú */}
                    <li onClick={toggleSidebar}><NavLink to="/"><i className="fa-solid fa-house"></i> Página Principal</NavLink></li>
                    
                    {isAuthenticated ? (
                        <>
                            <li><a><i className="fa-solid fa-user"></i> Hola, {sesion.nombre}</a></li>
                            <li onClick={logout}><a href="#"><i className="fa-solid fa-sign-out-alt"></i> Cerrar Sesión</a></li>
                        </>
                    ) : (
                        <li onClick={toggleSidebar}><NavLink to="/login"><i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión</NavLink></li>
                    )}

                    {isAdmin && (
                        <li onClick={toggleSidebar}><NavLink to="/admin"><i className="fa-solid fa-user-shield"></i> Panel Admin</NavLink></li>
                    )}

                    <li>
                        <NavLink to="/catalogo" onClick={toggleSidebar}><i className="fa-solid fa-store"></i> Catálogo</NavLink>
                        <ul className="submenu">
                            {categorias.map(cat => (
                               <li key={cat} onClick={toggleSidebar}><NavLink to={`/catalogo?categoria=${cat}`}>{cat}</NavLink></li>
                            ))}
                        </ul>
                    </li>
                    <li onClick={toggleSidebar}><NavLink to="/contacto"><i className="fa-solid fa-envelope"></i> Contacto</NavLink></li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;