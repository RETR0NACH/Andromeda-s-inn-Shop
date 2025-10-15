import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
    
        const usuarioLogueado = login(email, password);

        if (usuarioLogueado) {
            // Si el login fue exitoso, comprobamos el rol del usuario
            if (usuarioLogueado.rol === 'admin') {
                navigate('/admin'); // Si es admin, va al panel de administración
            } else {
                navigate('/'); // Si es cliente, va a la página principal
            }
        } else {
            setError('Correo o contraseña incorrectos.');
        }
       
    };
    
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="centered-content">
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                <form id="login-form" noValidate onSubmit={handleSubmit}>
                    {error && <div className="error-message" style={{display: 'block', color: 'red'}}>{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="cta-button">Ingresar</button>
                </form>
                <p className="form-switch">¿No tienes una cuenta? <Link to="/registro">Crea una aquí</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;