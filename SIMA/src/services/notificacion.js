
import api from "../api/axiosConfig";

export const obtenerNotificaciones = () =>
    api.get("/notificacion").then(res => res.data);

export const obtenerNotificacion = (id) =>
    api.get(`/notificacion/${id}`).then(res => res.data);

export const registrarNotificacion = (datos) =>
    api.post("/notificacion", datos).then(res => res.data);

export const actualizarNotificacion = (id, datos) =>
    api.put(`/notificacion/${id}`, datos).then(res => res.data);

export const eliminarNotificacion = (id) =>
    api.delete(`/notificacion/${id}`).then(res => res.data);
