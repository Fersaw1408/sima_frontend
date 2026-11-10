
import { useEffect, useState } from "react";
import {
    obtenerReportes,
    registrarReporte,
    actualizarReporte,
    eliminarReporte
} from "../services/reportes";

import VolverDashboard from "../components/VolverDashboard";
import "../css/Reportes.css";

function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [editando, setEditando] = useState(null);

    const [formulario, setFormulario] = useState({
        titulo: "",
        descripcion: "",
        tipo: "Consumo"
    });

    const cargarReportes = async () => {
        try {
            setCargando(true);
            const respuesta = await obtenerReportes();
            setReportes(respuesta.data || []);
            setError("");
        } catch (err) {
            setError("No fue posible cargar los reportes.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarReportes();
    }, []);

    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const limpiarFormulario = () => {
        setFormulario({
            titulo: "",
            descripcion: "",
            tipo: "Consumo"
        });
        setEditando(null);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        try {
            if (editando) {
                await actualizarReporte(editando, formulario);
                alert("Reporte actualizado correctamente.");
            } else {
                await registrarReporte(formulario);
                alert("Reporte registrado correctamente.");
            }

            limpiarFormulario();
            cargarReportes();
        } catch (err) {
            alert(err.response?.data?.error || "No fue posible guardar el reporte.");
        }
    };

    const prepararEdicion = (reporte) => {
        setEditando(reporte.id);

        setFormulario({
            titulo: reporte.titulo,
            descripcion: reporte.descripcion,
            tipo: reporte.tipo
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const manejarEliminar = async (id) => {
        const confirmar = window.confirm(
            "¿Estás seguro de eliminar este reporte?"
        );

        if (!confirmar) return;

        try {
            await eliminarReporte(id);
            alert("Reporte eliminado correctamente.");
            cargarReportes();
        } catch (err) {
            alert("No fue posible eliminar el reporte.");
        }
    };

    if (cargando) {
        return <div className="reportes-container">Cargando reportes...</div>;
    }

    return (
        <div className="reportes-container">
            <VolverDashboard />

            <div className="reportes-header">
                <h1>Reportes</h1>
                <p>Consulta y administra los reportes de tu consumo de agua.</p>
            </div>

            <div className="reportes-resumen">
                <div className="reporte-resumen-card">
                    <span>Total de reportes</span>
                    <strong>{reportes.length}</strong>
                </div>
            </div>

            <div className="reporte-formulario">
                <h2>{editando ? "Editar reporte" : "Registrar reporte"}</h2>

                <form onSubmit={manejarEnvio}>
                    <label>Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formulario.titulo}
                        onChange={manejarCambio}
                        placeholder="Escribe el título del reporte"
                        required
                    />

                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={manejarCambio}
                        placeholder="Describe el reporte"
                        rows="4"
                        required
                    />

                    <label>Tipo de reporte</label>
                    <select
                        name="tipo"
                        value={formulario.tipo}
                        onChange={manejarCambio}
                        required
                    >
                        <option value="Consumo">Consumo</option>
                        <option value="Anomalía">Anomalía</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                        <option value="Recomendación">Recomendación</option>
                    </select>

                    <div className="reporte-formulario-botones">
                        <button type="submit">
                            {editando ? "Guardar cambios" : "Registrar reporte"}
                        </button>

                        {editando && (
                            <button
                                type="button"
                                className="reporte-cancelar"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="reporte-listado">
                <h2>Historial de reportes</h2>

                {error && <p className="reporte-error">{error}</p>}

                {reportes.length === 0 ? (
                    <p>No tienes reportes registrados.</p>
                ) : (
                    <div className="reporte-tabla-contenedor">
                        <table className="reporte-tabla">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Tipo</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reportes.map((reporte) => (
                                    <tr key={reporte.id}>
                                        <td>{reporte.titulo}</td>
                                        <td>{reporte.descripcion}</td>
                                        <td>{reporte.tipo}</td>
                                        <td>
                                            {new Date(reporte.fecha).toLocaleDateString("es-CO")}
                                        </td>
                                        <td>
                                            <div className="reporte-acciones">
                                                <button
                                                    onClick={() => prepararEdicion(reporte)}
                                                    className="reporte-editar"
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() => manejarEliminar(reporte.id)}
                                                    className="reporte-eliminar"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
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

export default Reportes;
