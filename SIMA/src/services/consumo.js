import api from '../api/axiosConfig';

export const obtenerConsumos = () => {
    return api.get('/consumo').then((respuesta) => respuesta.data);
};

export const obtenerConsumo = (id) => {
    return api.get(`/consumo/${id}`).then((respuesta) => respuesta.data);
};

export const registrarConsumo = (datos) => {
    return api.post('/consumo', datos).then((respuesta) => respuesta.data);
};
