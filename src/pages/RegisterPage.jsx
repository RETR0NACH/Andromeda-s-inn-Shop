import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';

function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            setLoading(false);
            return;
        }

        // Llamada al backend
        const result = await register({ nombre, apellido, email, password });
        
        if (result.success) {
            navigate('/'); 
        } else {
            // Mostramos el error que viene del backend (ej: "El email ya existe")
            setError(result.message); 
        }
        setLoading(false);
    };

    return (
        <div className="centered-content">
            <div className="login-container">
                <h2>Crear una Cuenta</h2>
                <form id="register-form" noValidate onSubmit={handleSubmit}>
                    {error && <div className="error-message" style={{display: 'block', color: 'red'}}>{error}</div>}
                    <div className="form-group">
                        <label htmlFor="register-nombre">Nombre</label>
                        <input type="text" id="register-nombre" required value={nombre} onChange={e => setNombre(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-apellido">Apellido</label>
                        <input type="text" id="register-apellido" required value={apellido} onChange={e => setApellido(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-email">Correo Electrónico</label>
                        <input type="email" id="register-email" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password">Contraseña</label>
                        <input type="password" id="register-password" required minLength="6" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password-confirm">Confirmar Contraseña</label>
                        <input type="password" id="register-password-confirm" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="cta-button">Registrarse</button>
                </form>
                <p className="form-switch">¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
        </div>
    );
}

export default RegisterPage;