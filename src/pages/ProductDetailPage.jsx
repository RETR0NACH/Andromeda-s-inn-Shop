import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function ProductDetailPage() {
    const { id } = useParams();
    const { productos } = useProducts();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const producto = productos.find(p => p.id === parseInt(id));

    if (!producto) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2>Producto no encontrado</h2>
                <Link to="/catalogo">Volver al catálogo</Link>
            </div>
        );
    }

    // --- SOLUCIÓN DEFINITIVA PARA IMÁGENES EN public/images ---
    
    // 1. Obtenemos el nombre del archivo de la BD (backend usa 'imagen', legacy usaba 'img')
    const fileName = producto.imagen || producto.img;

    // 2. Construimos la ruta completa.
    // Si hay nombre de archivo, le anteponemos '/images/'. Si no, usamos placeholder.
    // Esto asume que en la BD guardas "bong2.png" y no "/images/bong2.png".
    const imageSrc = fileName ? `/images/${fileName}` : '/images/placeholder.png';
    
    // ---------------------------------------------------------


    const handleAddToCart = () => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            return;
        }
        addToCart(producto);
        alert(`${producto.nombre} ha sido añadido al carrito!`);
    };

    return (
        <div className="product-info-container">
            {/* Usamos la ruta calculada y añadimos un fallback por si falla la carga */}
            <img 
                src={imageSrc} 
                alt={producto.nombre} 
                className="product-image-large"
                onError={(e) => { 
                    e.target.onerror = null; // Previene loop infinito
                    e.target.src = '/images/placeholder.png'; 
                }}
            />
            
            <div className="product-details-text">
                <h2>{producto.nombre}</h2>
                <p className="product-description">{producto.descripcion}</p>
                <div className="product-purchase-section">
                    <span className="product-price-large">${producto.precio.toLocaleString('es-CL')}</span>
                    <button onClick={handleAddToCart} className="cta-button">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;