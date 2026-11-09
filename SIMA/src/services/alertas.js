
import api from '../api/axiosConfig';

export const obtenerAlertas = () =>
    api.get('/alertas').then(respuesta => respuesta.data);

export const obtenerAlerta = (id) =>
    api.get(`/alertas/${id}`).then(respuesta => respuesta.data);

export const registrarAlerta = (datos) =>
    api.post('/alertas', datos).then(respuesta => respuesta.data);
