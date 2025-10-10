// RUTA: src/pages/ProductDetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function ProductDetailPage() {
    const { id } = useParams(); // Hook de React Router para leer el ":id" de la URL
    const { productos } = useProducts();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    // Buscamos el producto cuyo ID coincida con el de la URL
    const producto = productos.find(p => p.id === parseInt(id));

    // Si el producto no se encuentra (por ejemplo, URL inválida), mostramos un mensaje
    if (!producto) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <h2>Producto no encontrado</h2>
                <Link to="/catalogo">Volver al catálogo</Link>
            </div>
        );
    }

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
            {/* Usamos la ruta relativa a la carpeta `public` para las imágenes */}
            <img src={producto.img.startsWith('/') ? producto.img : `/${producto.img}`} alt={producto.nombre} className="product-image-large" />
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