// RUTA: src/pages/ContactPage.jsx

import React from 'react';

function ContactPage() {
  return (
    <div className="contact-page-container">
        <h2>Contacto</h2>
        <div className="contact-content">
            <div className="contact-info">
                <h3>Dirección</h3>
                <p><i className="fa-solid fa-map-marker-alt"></i> Av. Siempre Viva 742, Valparaíso</p>
                <h3>Teléfono</h3>
                <p><i className="fa-solid fa-phone"></i> +56 9 1234 5678</p>
                <h3>Correo Electrónico</h3>
                <p><i className="fa-solid fa-envelope"></i> contacto@andromedainn.com</p>
            </div>
            <div className="contact-form">
                <form action="#">
                    <div className="form-group">
                        <label htmlFor="contact-name">Nombre</label>
                        <input type="text" id="contact-name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-email">Correo Electrónico</label>
                        <input type="email" id="contact-email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-subject">Asunto</label>
                        <input type="text" id="contact-subject" name="subject" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-message">Mensaje</label>
                        <textarea id="contact-message" name="message" rows="6" required></textarea>
                    </div>
                    <button type="submit" className="cta-button">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default ContactPage;