// RUTA: src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
// Asegúrate de tener importado 'bootstrap-icons/font/bootstrap-icons.css' en tu main.jsx o index.html

function Header({ toggleSidebar }) {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        {/* --- Botón Hamburguesa --- */}
        <button className="hamburger-menu" onClick={toggleSidebar} aria-label="Abrir menú">
          <i className="bi bi-list"></i> {/* Ícono de Bootstrap */}
        </button>

        {/* --- Logo --- */}
        <h1 className="logo"><Link to="/">Andromeda's Inn Shop</Link></h1>

        {/* --- Barra de Búsqueda Eliminada --- */}
        {/*
        <div className="search-bar">
          <form action="#" method="get">
            <input type="text" name="search" placeholder="Buscar productos..." />
            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        */}

        {/* --- Carrito --- */}
        <div className="cart-container">
          <Link to="/carrito">
            {/* Puedes mantener Font Awesome o cambiar a bi-cart si prefieres */}
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-text"> Carrito ({itemCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;