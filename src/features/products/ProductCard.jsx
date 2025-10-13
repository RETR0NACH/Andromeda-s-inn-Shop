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
      <Link to={`/producto/${producto.id}`} className="product-link">
        <img 
      src={producto.img} 
      alt={producto.nombre} 
      className="product-image" 
      />
      </Link>
      <div className="product-details">
        <h3 className="product-name">{producto.nombre}</h3>
        <p className="product-price">${producto.precio.toLocaleString('es-CL')}</p>
      </div>


      <div className="product-actions">
        <button onClick={handleAddToCart} className="cta-button">
        Agregar al Carrito
      </button>
      </div>
    </div>
  );
}

export default ProductCard;