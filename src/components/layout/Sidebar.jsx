// RUTA: src/components/layout/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom'; // No necesitas Link aquí si usas NavLink para todo
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';

// Recibimos la función `toggleSidebar` para que el botón de cerrar funcione
function Sidebar({ toggleSidebar }) {
    const { isAuthenticated, sesion, isAdmin, logout } = useAuth();
    const { productos } = useProducts();

    const categorias = [...new Set(productos.map(p => p.categoria))];

    return (
        <aside id="side-menu">
            {/* Botón para cerrar el menú en móvil (Si lo tienes)*/}
            {/* <button className="close-sidebar-btn" onClick={toggleSidebar}>
                <i className="fa-solid fa-times"></i>
            </button> */}

            <img id="aside-logo" src="/images/Andromeda-Logo.png" alt="Logo Andromeda's Inn" />

            {/* --- CONTENIDO DE USUARIO (MOVIDO AQUÍ) --- */}
            {isAuthenticated && (
                <div className="sidebar-user-info">
                    <span id="sidebar-hola-user">Hola, {sesion.nombre}</span>
                </div>
            )}

            {/* Envolvemos la lista en un div para controlar el scroll independientemente del logo */}
            <div className="sidebar-links">
                {/* Asegúrate de que tu ul tenga el id si lo usaste en el CSS */}
                <ul id="sidebar-list">
                    {/* Al hacer clic en un enlace, cerramos el menú */}
                    <li onClick={toggleSidebar}><NavLink to="/"><i className="fa-solid fa-house"></i> Página Principal</NavLink></li>

                    {isAuthenticated ? (
                        <>
                            {/* "Hola, {sesion.nombre}" FUE MOVIDO ARRIBA */}
                            <li onClick={() => { logout(); toggleSidebar(); }}><a href="#"><i className="fa-solid fa-sign-out-alt"></i> Cerrar Sesión</a></li>
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