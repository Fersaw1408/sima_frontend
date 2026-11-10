
import { useEffect, useState } from 'react';
import { obtenerMedidores } from '../services/medidores';
import VolverDashboard from '../components/VolverDashboard';
import '../css/Medidores.css';

function Medidores() {
    const [medidores, setMedidores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarMedidores = async () => {
            try {
                const respuesta = await obtenerMedidores();
                setMedidores(respuesta.data || []);
            } catch (error) {
                setError('No fue posible cargar los medidores.');
            } finally {
                setCargando(false);
            }
        };

        cargarMedidores();
    }, []);

    return (
        <div className="medidores-container">
            <VolverDashboard />

            <div className="medidores-header">
                <div>
                    <h1>Mis medidores</h1>
                    <p>Consulta los medidores asociados a tu cuenta.</p>
                </div>
            </div>

            <div className="medidores-resumen">
                <div className="medidor-resumen-card">
                    <h3>Total de medidores</h3>
                    <strong>{medidores.length}</strong>
                </div>
            </div>

            {cargando && <p>Cargando medidores...</p>}

            {error && <p>{error}</p>}

            {!cargando && !error && medidores.length === 0 && (
                <p>No tienes medidores registrados.</p>
            )}

            <div className="medidores-lista">
                {medidores.map((medidor) => (
                    <div className="medidor-card" key={medidor.id}>
                        <div className="medidor-icono">💧</div>

                        <div className="medidor-informacion">
                            <h3>{medidor.numero_serie}</h3>
                            <p>{medidor.ubicacion}</p>
                            <span className="medidor-estado">
                                {medidor.estado}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Medidores;
