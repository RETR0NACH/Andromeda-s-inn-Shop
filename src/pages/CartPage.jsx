import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';
import { Link } from 'react-router-dom';
import Toast from '../components/common/Toast';

function CartPage() {
    const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, total } = useCart();
    const { addOrder } = useOrders();
    
    const [itemToRemove, setItemToRemove] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const handleDecrease = (item) => {
        if (item.cantidad === 1) { setItemToRemove(item); } 
        else { decreaseQuantity(item.id); }
    };
    
    const confirmRemove = () => {
        if (itemToRemove) { removeFromCart(itemToRemove.id); setItemToRemove(null); }
    };
    
    const cancelRemove = () => { setItemToRemove(null); };

    const handleCheckout = async() => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const exito = await addOrder(cart, total);
        if (exito) {
            clearCart(); 
            setShowToast(true);
        }
    };

    return (
        <>
            <Toast message="¡Compra realizada con éxito!" show={showToast} onClose={() => setShowToast(false)} />
            {itemToRemove && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Confirmar Eliminación</h4>
                        <p>¿Estás seguro de que quieres eliminar "{itemToRemove.nombre}" de tu carrito?</p>
                        <div className="modal-actions">
                            <button onClick={cancelRemove} className="secondary-button">No</button>
                            <button onClick={confirmRemove} className="cta-button">Sí, Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="cart-page-wrapper">
                <div className="cart-page-container">
                    <h1>Tu Carrito de Compras</h1>
                    {cart.length > 0 ? (
                        <>
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th className="product-col">Producto</th>
                                        <th className="quantity-col">Cantidad</th>
                                        <th className="price-col">Precio</th>
                                        <th className="subtotal-col">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="cart-item-info">
                                                    <img src={item.img.startsWith('/') ? item.img : `/${item.img}`} alt={item.nombre} />
                                                    <span>{item.nombre}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="quantity-controls">
                                                    <button onClick={() => handleDecrease(item)}>-</button>
                                                    <span>{item.cantidad}</span>
                                                    <button onClick={() => addToCart(item)}>+</button>
                                                </div>
                                            </td>
                                            <td>${item.precio.toLocaleString('es-CL')}</td>
                                            <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="cart-summary">
                                <div className="total-price-container"><h3>Total: ${total.toLocaleString('es-CL')}</h3></div>
                                <div className="cart-buttons-container">
                                    <button onClick={clearCart} className="secondary-button">Vaciar Carrito</button>
                                    <button onClick={handleCheckout} className="cta-button">Finalizar Compra</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="cart-empty">
                            <p>Tu carrito está vacío.</p>
                            <Link to="/catalogo" className="cta-button">Ir al Catálogo</Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default CartPage;