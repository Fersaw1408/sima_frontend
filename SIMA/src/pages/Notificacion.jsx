
import { useEffect, useState } from "react";
import {
    obtenerNotificaciones,
    registrarNotificacion,
    actualizarNotificacion,
    eliminarNotificacion
} from "../services/notificacion";

import VolverDashboard from "../components/VolverDashboard";
import "../css/Notificacion.css";

function Notificaciones() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [editando, setEditando] = useState(null);

    const [formulario, setFormulario] = useState({
        titulo: "",
        mensaje: "",
        tipo: "Sistema",
        leida: false
    });

    const cargarNotificaciones = async () => {
        try {
            const respuesta = await obtenerNotificaciones();
            setNotificaciones(respuesta.data || []);
        } catch (error) {
            setMensaje("No fue posible cargar las notificaciones.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarNotificaciones();
    }, []);

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;

        setFormulario({
            ...formulario,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const limpiarFormulario = () => {
        setFormulario({
            titulo: "",
            mensaje: "",
            tipo: "Sistema",
            leida: false
        });

        setEditando(null);
    };

    const guardarNotificacion = async (e) => {
        e.preventDefault();

        try {
            if (editando) {
                await actualizarNotificacion(editando, formulario);
                setMensaje("Notificación actualizada correctamente.");
            } else {
                await registrarNotificacion(formulario);
                setMensaje("Notificación creada correctamente.");
            }

            limpiarFormulario();
            await cargarNotificaciones();
        } catch (error) {
            setMensaje(
                error.response?.data?.error ||
                "No fue posible guardar la notificación."
            );
        }
    };

    const prepararEdicion = (notificacion) => {
        setEditando(notificacion.id);

        setFormulario({
            titulo: notificacion.titulo,
            mensaje: notificacion.mensaje,
            tipo: notificacion.tipo,
            leida: Boolean(Number(notificacion.leida))
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cambiarEstado = async (notificacion) => {
        try {
            await actualizarNotificacion(notificacion.id, {
                titulo: notificacion.titulo,
                mensaje: notificacion.mensaje,
                tipo: notificacion.tipo,
                leida: !Boolean(Number(notificacion.leida))
            });

            await cargarNotificaciones();
        } catch (error) {
            setMensaje("No fue posible cambiar el estado.");
        }
    };

    const borrarNotificacion = async (id) => {
        const confirmar = window.confirm(
            "¿Estás seguro de eliminar esta notificación?"
        );

        if (!confirmar) return;

        try {
            await eliminarNotificacion(id);
            setMensaje("Notificación eliminada correctamente.");
            await cargarNotificaciones();
        } catch (error) {
            setMensaje("No fue posible eliminar la notificación.");
        }
    };

    const noLeidas = notificaciones.filter(
        notificacion => !Boolean(Number(notificacion.leida))
    ).length;

    return (
        <div className="notificaciones-container">
            <VolverDashboard />

            <header className="notificaciones-header">
                <h1>Notificaciones</h1>
                <p>Consulta y administra tus notificaciones de SIMA.</p>
            </header>

            <section className="notificaciones-resumen">
                <div className="notificacion-resumen-card">
                    <h3>{notificaciones.length}</h3>
                    <p>Total de notificaciones</p>
                </div>

                <div className="notificacion-resumen-card">
                    <h3>{noLeidas}</h3>
                    <p>Notificaciones sin leer</p>
                </div>

                <div className="notificacion-resumen-card">
                    <h3>{notificaciones.length - noLeidas}</h3>
                    <p>Notificaciones leídas</p>
                </div>
            </section>

            <section className="notificaciones-formulario">
                <h2>{editando ? "Editar notificación" : "Crear notificación"}</h2>

                <form onSubmit={guardarNotificacion}>
                    <div className="notificacion-campo">
                        <label>Título</label>
                        <input
                            type="text"
                            name="titulo"
                            value={formulario.titulo}
                            onChange={manejarCambio}
                            maxLength="150"
                            required
                        />
                    </div>

                    <div className="notificacion-campo">
                        <label>Mensaje</label>
                        <textarea
                            name="mensaje"
                            value={formulario.mensaje}
                            onChange={manejarCambio}
                            required
                        />
                    </div>

                    <div className="notificacion-campo">
                        <label>Tipo</label>
                        <select
                            name="tipo"
                            value={formulario.tipo}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="Sistema">Sistema</option>
                            <option value="Consumo">Consumo</option>
                            <option value="Facturación">Facturación</option>
                            <option value="Recomendación">Recomendación</option>
                            <option value="Alerta">Alerta</option>
                        </select>
                    </div>

                    <label className="notificacion-checkbox">
                        <input
                            type="checkbox"
                            name="leida"
                            checked={formulario.leida}
                            onChange={manejarCambio}
                        />
                        Marcar como leída
                    </label>

                    <div className="notificacion-botones">
                        <button type="submit">
                            {editando ? "Guardar cambios" : "Crear notificación"}
                        </button>

                        {editando && (
                            <button
                                type="button"
                                className="notificacion-cancelar"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </section>

            {mensaje && (
                <p className="notificaciones-mensaje">{mensaje}</p>
            )}

            <section className="notificaciones-listado">
                <h2>Mis notificaciones</h2>

                {cargando ? (
                    <p>Cargando notificaciones...</p>
                ) : notificaciones.length === 0 ? (
                    <p>No tienes notificaciones registradas.</p>
                ) : (
                    <div className="notificaciones-lista">
                        {notificaciones.map(notificacion => (
                            <article
                                className={`notificacion-card ${
                                    Boolean(Number(notificacion.leida))
                                        ? "notificacion-leida"
                                        : "notificacion-no-leida"
                                }`}
                                key={notificacion.id}
                            >
                                <div className="notificacion-card-contenido">
                                    <div className="notificacion-card-titulo">
                                        <h3>{notificacion.titulo}</h3>
                                        <span>{notificacion.tipo}</span>
                                    </div>

                                    <p>{notificacion.mensaje}</p>

                                    <small>
                                        {notificacion.fecha
                                            ? new Date(notificacion.fecha).toLocaleString("es-CO")
                                            : "Fecha no disponible"}
                                    </small>

                                    <strong>
                                        {Boolean(Number(notificacion.leida))
                                            ? "Leída"
                                            : "Sin leer"}
                                    </strong>
                                </div>

                                <div className="notificacion-acciones">
                                    <button
                                        onClick={() => cambiarEstado(notificacion)}
                                    >
                                        {Boolean(Number(notificacion.leida))
                                            ? "Marcar sin leer"
                                            : "Marcar como leída"}
                                    </button>

                                    <button
                                        onClick={() => prepararEdicion(notificacion)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="notificacion-eliminar"
                                        onClick={() => borrarNotificacion(notificacion.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Notificaciones;
