import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
      if (!isAuthenticated) {
          alert('Debes iniciar sesión para agregar productos al carrito.');
          return;
      }
      addToCart(producto);
      alert(`${producto.nombre} ha sido añadido al carrito!`);
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${producto.id}`}>
        <img src={producto.img} alt={producto.nombre} className="product-image" />
        <h3 className="product-name">{producto.nombre}</h3>
      </Link>
      <p className="product-price">${producto.precio.toLocaleString('es-CL')}</p>
      <button onClick={handleAddToCart} className="cta-button">
        Agregar al Carrito
      </button>
    </div>
  );
}

export default ProductCard;