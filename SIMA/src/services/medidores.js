
import api from '../api/axiosConfig';

export const obtenerMedidores = () => {
    return api.get('/medidores').then((respuesta) => respuesta.data);
};

export const obtenerMedidor = (id) => {
    return api.get(`/medidores/${id}`).then((respuesta) => respuesta.data);
};

export const registrarMedidor = (datos) => {
    return api.post('/medidores', datos).then((respuesta) => respuesta.data);
};
