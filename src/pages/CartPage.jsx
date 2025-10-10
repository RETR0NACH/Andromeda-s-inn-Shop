// RUTA: src/pages/CartPage.jsx

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
    const { cart, removeFromCart, clearCart, total } = useCart();

    return (
        <div className="cart-page-container">
            <h1>Tu Carrito de Compras</h1>
            {cart.length > 0 ? (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th className="product-col">Producto</th>
                                <th className="price-col">Precio</th>
                                <th className="actions-col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={`${item.id}-${index}`}> {/* Se usa el index para claves únicas si hay productos duplicados */}
                                    <td>
                                        <div className="cart-item-info">
                                            <img src={item.img.startsWith('/') ? item.img : `/${item.img}`} alt={item.nombre} />
                                            <span>{item.nombre}</span>
                                        </div>
                                    </td>
                                    <td>${item.precio.toLocaleString('es-CL')}</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="cart-summary">
                        <div className="total-price-container">
                            <h3>Total: ${total.toLocaleString('es-CL')}</h3>
                        </div>
                        <div className="cart-buttons-container">
                            <button onClick={clearCart} className="secondary-button">Vaciar Carrito</button>
                            <button className="cta-button">Finalizar Compra</button>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p>Tu carrito está vacío.</p>
                    <Link to="/catalogo" className="cta-button" style={{textDecoration: 'none', marginTop: '1rem', display: 'inline-block'}}>
                        Ir al Catálogo
                    </Link>
                </div>
            )}
        </div>
    );
}

export default CartPage;