
import { useEffect, useState } from 'react';
import { obtenerLecturas } from '../services/lecturas';
import VolverDashboard from '../components/VolverDashboard';
import './Lecturas.css';

function Lecturas() {
    const [lecturas, setLecturas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarLecturas = async () => {
            try {
                const respuesta = await obtenerLecturas();
                setLecturas(respuesta.data || []);
            } catch (error) {
                setError('No fue posible cargar las lecturas.');
            } finally {
                setCargando(false);
            }
        };

        cargarLecturas();
    }, []);

    const totalLitros = lecturas.reduce(
        (total, lectura) => total + Number(lectura.consumo_litros),
        0
    );

    return (
        <div className="lecturas-container">
            <VolverDashboard />

            <div className="lecturas-header">
                <h1>Lecturas de agua</h1>
                <p>Consulta las lecturas registradas por tus medidores.</p>
            </div>

            <div className="lecturas-resumen">
                <div className="lecturas-card">
                    <h3>Total de lecturas</h3>
                    <strong>{lecturas.length}</strong>
                </div>

                <div className="lecturas-card">
                    <h3>Consumo acumulado</h3>
                    <strong>{totalLitros.toFixed(2)} L</strong>
                </div>
            </div>

            <div className="lecturas-tabla">
                <h2>Historial de lecturas</h2>

                {cargando && <p>Cargando lecturas...</p>}

                {error && <p className="lecturas-error">{error}</p>}

                {!cargando && !error && lecturas.length === 0 && (
                    <p>No hay lecturas registradas.</p>
                )}

                {!cargando && !error && lecturas.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Medidor</th>
                                <th>Ubicación</th>
                                <th>Consumo registrado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {lecturas.map((lectura) => (
                                <tr key={lectura.id}>
                                    <td>
                                        {new Date(lectura.fecha).toLocaleDateString('es-CO', {
                                            timeZone: 'UTC'
                                        })}
                                    </td>
                                    <td>{lectura.numero_serie}</td>
                                    <td>{lectura.ubicacion}</td>
                                    <td>
                                        {Number(lectura.consumo_litros).toFixed(2)} L
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Lecturas;
