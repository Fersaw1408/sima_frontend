
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Auth.css';

function Login() {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(correo, contrasena);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Bienvenido a SIMA</h1>
                <p>Ingresa a tu cuenta para consultar tu consumo de agua.</p>

                <form onSubmit={handleSubmit}>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    );
}

export default Login;
