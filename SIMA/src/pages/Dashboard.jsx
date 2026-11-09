
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>SIMA</h1>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <span style={{
                        fontWeight: '600',
                        color: '#087e8b',
                        fontSize: '16px'
                    }}>
                        Bienvenido, {user?.nombre || 'Usuario'}
                    </span>

                    <button onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <h2>Panel principal</h2>
                <p>Gestiona y consulta tu información de consumo de agua.</p>

                <div className="dashboard-cards">
                    <Link to="/consumo" className="dashboard-card">
                        <h3>Consumo de agua</h3>
                        <p>Consulta tu consumo.</p>
                    </Link>

                    <Link to="/medidores" className="dashboard-card">
                        <h3>Medidores</h3>
                        <p>Consulta tus medidores registrados.</p>
                    </Link>

                    <Link to="/lecturas" className="dashboard-card">
                        <h3>Lecturas</h3>
                        <p>Consulta el historial de lecturas.</p>
                    </Link>

                    <Link to="/alertas" className="dashboard-card">
                        <h3>Alertas</h3>
                        <p>Consulta las alertas de tus medidores.</p>
                    </Link>

                    <Link to="/reportes" className="dashboard-card">
                        <h3>Reportes</h3>
                        <p>Consulta tus reportes.</p>
                    </Link>

                    <Link to="/facturacion" className="dashboard-card">
                        <h3>Facturación</h3>
                        <p>Revisa tus facturas.</p>
                    </Link>

                    <Link to="/notificacion" className="dashboard-card">
                        <h3>Notificaciones</h3>
                        <p>Consulta y administra tus notificaciones.</p>
                    </Link>

                    <Link to="/configuracion" className="dashboard-card">
                        <h3>Configuración</h3>
                        <p>Personaliza las preferencias de tu cuenta.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
