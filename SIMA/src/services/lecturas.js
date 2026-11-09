
import api from '../api/axiosConfig';

export const obtenerLecturas = () =>
    api.get('/lecturas').then(respuesta => respuesta.data);

export const obtenerLectura = (id) =>
    api.get(`/lecturas/${id}`).then(respuesta => respuesta.data);

export const registrarLectura = (datos) =>
    api.post('/lecturas', datos).then(respuesta => respuesta.data);
