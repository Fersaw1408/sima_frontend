
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrar } from '../services/auth';
import './Auth.css';

function Registro() {
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        nombre: '',
        cedula: '',
        correo: '',
        contrasena: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await registrar(datos);
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Crear cuenta</h1>
                <p>Regístrate para utilizar SIMA.</p>

                <form onSubmit={handleSubmit}>
                    <label>Nombre completo</label>
                    <input
                        name="nombre"
                        value={datos.nombre}
                        onChange={handleChange}
                        placeholder="Nombre completo"
                        required
                    />

                    <label>Documento de identidad</label>
                    <input
                        name="cedula"
                        value={datos.cedula}
                        onChange={handleChange}
                        placeholder="Número de documento"
                        required
                    />

                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        name="correo"
                        value={datos.correo}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="contrasena"
                        value={datos.contrasena}
                        onChange={handleChange}
                        placeholder="Crea una contraseña"
                        required
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarme'}
                    </button>
                </form>

                <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    );
}

export default Registro;
