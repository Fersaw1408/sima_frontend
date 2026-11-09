
import { useEffect, useState } from 'react';
import { obtenerAlertas } from '../services/alertas';
import VolverDashboard from '../components/VolverDashboard';
import './Alertas.css';

function Alertas() {
    const [alertas, setAlertas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarAlertas = async () => {
            try {
                const respuesta = await obtenerAlertas();
                setAlertas(respuesta.data || []);
            } catch (error) {
                setError('No fue posible cargar las alertas.');
            } finally {
                setCargando(false);
            }
        };

        cargarAlertas();
    }, []);

    const pendientes = alertas.filter(
        alerta => alerta.estado?.toLowerCase() === 'pendiente'
    ).length;

    return (
        <div className="alertas-container">
            <VolverDashboard />

            <div className="alertas-header">
                <h1>Alertas</h1>
                <p>Consulta las notificaciones y alertas de tus medidores.</p>
            </div>

            <div className="alertas-resumen">
                <div className="alertas-card">
                    <h3>Total de alertas</h3>
                    <strong>{alertas.length}</strong>
                </div>

                <div className="alertas-card">
                    <h3>Alertas pendientes</h3>
                    <strong>{pendientes}</strong>
                </div>
            </div>

            <div className="alertas-listado">
                <h2>Historial de alertas</h2>

                {cargando && <p>Cargando alertas...</p>}

                {error && <p className="alertas-error">{error}</p>}

                {!cargando && !error && alertas.length === 0 && (
                    <p>No tienes alertas registradas.</p>
                )}

                {!cargando && !error && alertas.length > 0 && (
                    <div className="alertas-tabla-contenedor">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Mensaje</th>
                                    <th>Medidor</th>
                                    <th>Ubicación</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {alertas.map(alerta => (
                                    <tr key={alerta.id}>
                                        <td>{alerta.tipo}</td>
                                        <td>{alerta.mensaje}</td>
                                        <td>{alerta.numero_serie}</td>
                                        <td>{alerta.ubicacion}</td>
                                        <td>
                                            <span className={`alerta-estado alerta-${alerta.estado?.toLowerCase()}`}>
                                                {alerta.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Alertas;
