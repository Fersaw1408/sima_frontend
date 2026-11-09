
import api from "../api/axiosConfig";

export const obtenerConfiguracion = () =>
    api.get("/configuracion").then(res => res.data);

export const obtenerConfiguracionPorId = (id) =>
    api.get(`/configuracion/${id}`).then(res => res.data);

export const registrarConfiguracion = (datos) =>
    api.post("/configuracion", datos).then(res => res.data);

export const actualizarConfiguracion = (id, datos) =>
    api.put(`/configuracion/${id}`, datos).then(res => res.data);

export const eliminarConfiguracion = (id) =>
    api.delete(`/configuracion/${id}`).then(res => res.data);
