
import { useEffect, useState } from 'react';
import { obtenerConsumos } from '../services/consumo';
import VolverDashboard from '../components/VolverDashboard';
import '../css/Consumo.css';

function Consumo() {
    const [consumos, setConsumos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarConsumos = async () => {
            try {
                const respuesta = await obtenerConsumos();
                setConsumos(respuesta.data || []);
            } catch (error) {
                setError('No fue posible cargar los consumos.');
            } finally {
                setCargando(false);
            }
        };

        cargarConsumos();
    }, []);

    const totalLitros = consumos.reduce(
        (total, consumo) => total + Number(consumo.litros),
        0
    );

    return (
        <div className="consumo-container">
            <VolverDashboard />

            <h1>Consumo de agua</h1>
            <p>Consulta el historial de consumo de tus medidores.</p>

            <div className="consumo-resumen">
                <div className="consumo-card">
                    <h3>Consumo registrado</h3>
                    <strong>{totalLitros.toFixed(2)} L</strong>
                </div>

                <div className="consumo-card">
                    <h3>Registros</h3>
                    <strong>{consumos.length}</strong>
                </div>
            </div>

            <div className="consumo-tabla">
                <h2>Historial de consumo</h2>

                {cargando && <p>Cargando consumos...</p>}

                {error && <p>{error}</p>}

                {!cargando && !error && consumos.length === 0 && (
                    <p>No hay consumos registrados.</p>
                )}

                {!cargando && !error && consumos.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Medidor</th>
                                <th>Ubicación</th>
                                <th>Consumo</th>
                            </tr>
                        </thead>

                        <tbody>
                            {consumos.map((consumo) => (
                                <tr key={consumo.id}>
                                    <td>
                                        {new Date(consumo.fecha).toLocaleDateString('es-CO', {
                                            timeZone: 'UTC'
                                        })}
                                    </td>
                                    <td>{consumo.numero_serie}</td>
                                    <td>{consumo.ubicacion}</td>
                                    <td>{Number(consumo.litros).toFixed(2)} L</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Consumo;
