import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

// Recibimos la función `toggleSidebar` como una prop desde MainLayout
function Header({ toggleSidebar }) {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        {/* Este es el nuevo botón de hamburguesa */}
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <h1 className="logo"><Link to="/">Andromeda's Inn Shop</Link></h1>
        
        <div className="search-bar">
          <form action="#" method="get">
            <input type="text" name="search" placeholder="Buscar productos..." />
            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        
        <div className="cart-container">
          <Link to="/carrito">
            <i className="fa-solid fa-cart-shopping"></i> 
            <span className="cart-text"> Carrito ({itemCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;