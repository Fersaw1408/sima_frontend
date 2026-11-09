import api from '../api/axiosConfig';

export const registrar = (datos) => {
    return api.post('/auth/register', datos).then((r) => r.data);
};

export const iniciarSesion = (correo, contrasena) => {
    return api.post('/auth/login', {
        correo,
        contrasena
    }).then((r) => r.data);
};