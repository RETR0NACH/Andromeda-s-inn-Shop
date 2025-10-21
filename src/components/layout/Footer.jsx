import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        
        {/* Columna 1: Sobre nosotros */}
        <div className="footer-section about">
          <h3 className="footer-title">Andromeda's Inn Shop</h3>
          <p>
            Tu tienda de confianza para productos de otro mundo. Elevando tu experiencia desde 2025.
          </p>
        </div>

        {/* Columna 2: Enlaces de navegación */}
        <div className="footer-section links">
          <h3 className="footer-title">Navegación</h3>
          <ul>
            <li><Link to="/">Página Principal</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li> 
          </ul>
        </div>

        {/* Columna 3: Información de contacto */}
        <div className="footer-section contact">
          <h3 className="footer-title">Contacto</h3>
          
          {/* --- INICIO DE LA CORRECCIÓN DE ICONOS --- */}
          {/* La clase del icono va en una etiqueta <i> DENTRO del <p> */}
          <p><i className="fa-solid fa-map-marker-alt"></i> Av. Siempre Viva 742, Valparaíso</p>
          <p><i className="fa-solid fa-phone"></i> +56 9 1234 5678</p>
          <p><i className="fa-solid fa-envelope"></i> contacto@andromedainn.com</p>
          {/* --- FIN DE LA CORRECCIÓN DE ICONOS --- */}
        </div>

      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Andromeda's Inn Shop. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;