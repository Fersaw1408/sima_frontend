import api from "../api/axiosConfig";

export const obtenerReportes = () =>
    api.get("/reportes").then(res => res.data);

export const obtenerReporte = (id) =>
    api.get(`/reportes/${id}`).then(res => res.data);

export const registrarReporte = (datos) =>
    api.post("/reportes", datos).then(res => res.data);

export const actualizarReporte = (id, datos) =>
    api.put(`/reportes/${id}`, datos).then(res => res.data);

export const eliminarReporte = (id) =>
    api.delete(`/reportes/${id}`).then(res => res.data);