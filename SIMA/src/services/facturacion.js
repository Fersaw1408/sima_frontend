import api from "../api/axiosConfig";

export const obtenerFacturas = () =>
    api.get("/facturacion").then(res => res.data);

export const obtenerFactura = (id) =>
    api.get(`/facturacion/${id}`).then(res => res.data);

export const registrarFactura = (datos) =>
    api.post("/facturacion", datos).then(res => res.data);

export const actualizarFactura = (id, datos) =>
    api.put(`/facturacion/${id}`, datos).then(res => res.data);

export const eliminarFactura = (id) =>
    api.delete(`/facturacion/${id}`).then(res => res.data);