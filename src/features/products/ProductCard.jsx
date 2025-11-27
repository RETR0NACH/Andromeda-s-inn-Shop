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

  // --- LÓGICA DE IMAGEN MEJORADA ---
  // 1. Obtenemos el nombre/ruta cruda de la BD
  const rawImage = producto.imagen || producto.img;

  // 2. Construimos la ruta final de forma inteligente:
  //    - Si no hay imagen, usa placeholder.
  //    - Si ya empieza con '/images/' o 'http', úsala tal cual.
  //    - Si es solo el nombre de archivo (ej: 'bong2.png'), agrégale '/images/'.
  let imageSrc = '/images/placeholder.png';
  if (rawImage) {
      if (rawImage.startsWith('/images/') || rawImage.startsWith('http')) {
          imageSrc = rawImage;
      } else {
          imageSrc = `/images/${rawImage}`;
      }
  }
  // ---------------------------------

  return (
    <div className="product-card">
      <Link to={`/producto/${producto.id}`} className="product-link">
        <img 
          src={imageSrc} 
          alt={producto.nombre} 
          className="product-image" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "/images/placeholder.png";
          }}
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