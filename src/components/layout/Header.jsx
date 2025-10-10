import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function Header() {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo"><Link to="/">Andromeda's Inn Shop</Link></h1>
        <div className="search-bar">
          <form action="#" method="get">
            <input type="text" name="search" placeholder="Buscar productos..." />
            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        <div className="cart-container">
          <Link to="/carrito">
            <i className="fa-solid fa-cart-shopping"></i> Carrito ({itemCount})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;