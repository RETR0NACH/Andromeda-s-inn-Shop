import React from 'react';
import { Link } from 'react-router-dom';

function Footer (){
    return(
        <footer className="site-footer">
            <div className="footer-content">
                {/* Columna 1: Sobre nosotros */}
                <div className="footer-section about">
                    <h3 className="footer-title">Andromeda's Inn Shop</h3>
                    <p>Tu tienda de confianza para productos de otro mundo. Elevando tu experiencia desde 2025.</p>
                </div>
                {/* Columna 2: Enlaces de navegacion */}
                <div className="footer-section links">
                    <h3 className="footer-title">Navegacion</h3>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                        <li><Link to="/catalogo">Catálogo</Link></li>
                        <li><Link to="/carrito">Carrito</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                {/* Columna 3: Informacion contacto */}
                <div className="footer-section contact"> 
                    <h3 className="footer-title">Contacto</h3>
                    <p className="fa-solid fa-map-marker-alt">Av. Siempre Viva 742, Valparaíso</p>
                    <p className="fa-solid fa-phone">+56 9 1234 5678</p>
                    <p className="fa-solid fa-envelope">contacto@andromedainn.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Andromeda's Inn Shop. Todos los derechos reservados.</p>
            </div>
        </footer> 
    );
}

export default Footer;  