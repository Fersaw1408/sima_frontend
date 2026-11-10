
import { useEffect, useState } from "react";
import {
    obtenerFacturas,
    registrarFactura,
    actualizarFactura,
    eliminarFactura
} from "../services/facturacion";

import VolverDashboard from "../components/VolverDashboard";
import "../css/Facturacion.css";

function Facturacion() {
    const [facturas, setFacturas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [editando, setEditando] = useState(null);

    const [formulario, setFormulario] = useState({
        periodo: "",
        consumo: "",
        valor: "",
        fecha_vencimiento: "",
        estado: "Pendiente"
    });

    const cargarFacturas = async () => {
        try {
            setCargando(true);
            const respuesta = await obtenerFacturas();
            setFacturas(respuesta.data || []);
        } catch (error) {
            alert("No fue posible cargar las facturas.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarFacturas();
    }, []);

    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const limpiarFormulario = () => {
        setFormulario({
            periodo: "",
            consumo: "",
            valor: "",
            fecha_vencimiento: "",
            estado: "Pendiente"
        });
        setEditando(null);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        try {
            const datos = {
                ...formulario,
                consumo: Number(formulario.consumo),
                valor: Number(formulario.valor)
            };

            if (editando) {
                await actualizarFactura(editando, datos);
                alert("Factura actualizada correctamente.");
            } else {
                await registrarFactura(datos);
                alert("Factura registrada correctamente.");
            }

            limpiarFormulario();
            cargarFacturas();
        } catch (error) {
            alert(error.response?.data?.error || "No fue posible guardar la factura.");
        }
    };

    const prepararEdicion = (factura) => {
        setEditando(factura.id);

        setFormulario({
            periodo: factura.periodo,
            consumo: factura.consumo,
            valor: factura.valor,
            fecha_vencimiento: factura.fecha_vencimiento?.substring(0, 10),
            estado: factura.estado
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const manejarEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta factura?")) {
            return;
        }

        try {
            await eliminarFactura(id);
            alert("Factura eliminada correctamente.");
            cargarFacturas();
        } catch (error) {
            alert("No fue posible eliminar la factura.");
        }
    };

    const totalFacturado = facturas.reduce(
        (total, factura) => total + Number(factura.valor),
        0
    );

    const pendientes = facturas.filter(
        factura => factura.estado.toLowerCase() === "pendiente"
    ).length;

    if (cargando) {
        return <div className="facturacion-container">Cargando facturación...</div>;
    }

    return (
        <div className="facturacion-container">
            <VolverDashboard />

            <div className="facturacion-header">
                <h1>Facturación</h1>
                <p>Consulta y administra tus facturas de consumo de agua.</p>
            </div>

            <div className="facturacion-resumen">
                <div className="facturacion-card">
                    <span>Total de facturas</span>
                    <strong>{facturas.length}</strong>
                </div>

                <div className="facturacion-card">
                    <span>Facturas pendientes</span>
                    <strong>{pendientes}</strong>
                </div>

                <div className="facturacion-card">
                    <span>Total facturado</span>
                    <strong>
                        {totalFacturado.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                            maximumFractionDigits: 0
                        })}
                    </strong>
                </div>
            </div>

            <div className="facturacion-formulario">
                <h2>{editando ? "Editar factura" : "Registrar factura"}</h2>

                <form onSubmit={manejarEnvio}>
                    <label>Periodo</label>
                    <input
                        type="text"
                        name="periodo"
                        value={formulario.periodo}
                        onChange={manejarCambio}
                        placeholder="Ejemplo: Noviembre 2026"
                        required
                    />

                    <label>Consumo (litros)</label>
                    <input
                        type="number"
                        name="consumo"
                        min="0"
                        step="0.01"
                        value={formulario.consumo}
                        onChange={manejarCambio}
                        required
                    />

                    <label>Valor (COP)</label>
                    <input
                        type="number"
                        name="valor"
                        min="0"
                        step="0.01"
                        value={formulario.valor}
                        onChange={manejarCambio}
                        required
                    />

                    <label>Fecha de vencimiento</label>
                    <input
                        type="date"
                        name="fecha_vencimiento"
                        value={formulario.fecha_vencimiento}
                        onChange={manejarCambio}
                        required
                    />

                    <label>Estado</label>
                    <select
                        name="estado"
                        value={formulario.estado}
                        onChange={manejarCambio}
                        required
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagada">Pagada</option>
                    </select>

                    <div className="facturacion-botones">
                        <button type="submit">
                            {editando ? "Guardar cambios" : "Registrar factura"}
                        </button>

                        {editando && (
                            <button
                                type="button"
                                className="facturacion-cancelar"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="facturacion-listado">
                <h2>Historial de facturas</h2>

                {facturas.length === 0 ? (
                    <p>No tienes facturas registradas.</p>
                ) : (
                    <div className="facturacion-tabla-contenedor">
                        <table className="facturacion-tabla">
                            <thead>
                                <tr>
                                    <th>Periodo</th>
                                    <th>Consumo</th>
                                    <th>Valor</th>
                                    <th>Vencimiento</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {facturas.map((factura) => (
                                    <tr key={factura.id}>
                                        <td>{factura.periodo}</td>
                                        <td>{Number(factura.consumo).toLocaleString("es-CO")} L</td>
                                        <td>
                                            {Number(factura.valor).toLocaleString("es-CO", {
                                                style: "currency",
                                                currency: "COP",
                                                maximumFractionDigits: 0
                                            })}
                                        </td>
                                        <td>
                                            {String(factura.fecha_vencimiento).substring(0, 10)}
                                        </td>
                                        <td>
                                            <span className={
                                                factura.estado.toLowerCase() === "pagada"
                                                    ? "factura-pagada"
                                                    : "factura-pendiente"
                                            }>
                                                {factura.estado}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="facturacion-acciones">
                                                <button
                                                    className="factura-editar"
                                                    onClick={() => prepararEdicion(factura)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="factura-eliminar"
                                                    onClick={() => manejarEliminar(factura.id)}
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

export default Facturacion;
