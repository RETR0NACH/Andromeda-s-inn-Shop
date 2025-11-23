import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        const result = await login(email, password);

        if (result.success) {
            if (result.user.rol === 'admin') {
                navigate('/admin'); 
            } else {
                navigate('/'); 
            }
        } else {
            setError(result.message);
        }
       
    };

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