
import { useEffect, useState } from "react";
import {
    obtenerConfiguracion,
    registrarConfiguracion,
    actualizarConfiguracion
} from "../services/configuracion";
import VolverDashboard from "../components/VolverDashboard";
import "../css/Configuracion.css";

function Configuracion() {
    const [id, setId] = useState(null);
    const [notificaciones, setNotificaciones] = useState(true);
    const [modoOscuro, setModoOscuro] = useState(false);
    const [unidadMedida, setUnidadMedida] = useState("m3");
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarConfiguracion();
    }, []);

    const cargarConfiguracion = async () => {
        try {
            const respuesta = await obtenerConfiguracion();
            const configuracion = respuesta.data?.[0];

            if (configuracion) {
                setId(configuracion.id);
                setNotificaciones(Boolean(Number(configuracion.notificaciones)));
                setModoOscuro(Boolean(Number(configuracion.modo_oscuro)));
                setUnidadMedida(configuracion.unidad_medida);
            }
        } catch (error) {
            setMensaje("No fue posible cargar la configuración.");
        } finally {
            setCargando(false);
        }
    };

    const guardarConfiguracion = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setMensaje("");

        const datos = {
            notificaciones,
            modo_oscuro: modoOscuro,
            unidad_medida: unidadMedida
        };

        try {
            if (id) {
                await actualizarConfiguracion(id, datos);
                setMensaje("Configuración actualizada correctamente.");
            } else {
                const respuesta = await registrarConfiguracion(datos);
                setId(respuesta.data.id);
                setMensaje("Configuración guardada correctamente.");
            }
        } catch (error) {
            setMensaje(
                error.response?.data?.error ||
                "No fue posible guardar la configuración."
            );
        } finally {
            setGuardando(false);
        }
    };

    if (cargando) {
        return (
            <div className="configuracion-container">
                <VolverDashboard />
                <p>Cargando configuración...</p>
            </div>
        );
    }

    return (
        <div className={`configuracion-container ${modoOscuro ? "configuracion-oscura" : ""}`}>
            <VolverDashboard />

            <header className="configuracion-header">
                <h1>Configuración</h1>
                <p>Personaliza las preferencias de tu cuenta SIMA.</p>
            </header>

            <form
                className="configuracion-formulario"
                onSubmit={guardarConfiguracion}
            >
                <section className="configuracion-opcion">
                    <div>
                        <h3>Notificaciones</h3>
                        <p>Permitir las notificaciones de SIMA.</p>
                    </div>

                    <input
                        type="checkbox"
                        checked={notificaciones}
                        onChange={(e) => setNotificaciones(e.target.checked)}
                    />
                </section>

                <section className="configuracion-opcion">
                    <div>
                        <h3>Modo oscuro</h3>
                        <p>Activar la preferencia de modo oscuro.</p>
                    </div>

                    <input
                        type="checkbox"
                        checked={modoOscuro}
                        onChange={(e) => setModoOscuro(e.target.checked)}
                    />
                </section>

                <section className="configuracion-opcion">
                    <div>
                        <h3>Unidad de medida</h3>
                        <p>Selecciona cómo deseas visualizar el consumo.</p>
                    </div>

                    <select
                        value={unidadMedida}
                        onChange={(e) => setUnidadMedida(e.target.value)}
                    >
                        <option value="m3">Metros cúbicos (m³)</option>
                        <option value="litros">Litros</option>
                    </select>
                </section>

                <button
                    type="submit"
                    className="configuracion-guardar"
                    disabled={guardando}
                >
                    {guardando ? "Guardando..." : "Guardar configuración"}
                </button>

                {mensaje && (
                    <p className="configuracion-mensaje">{mensaje}</p>
                )}
            </form>
        </div>
    );
}

export default Configuracion;
