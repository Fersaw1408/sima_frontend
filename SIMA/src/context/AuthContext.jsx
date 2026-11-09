
import { createContext, useContext, useState } from 'react';
import { iniciarSesion } from '../services/auth';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
    });

    const [loading, setLoading] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUser(null);
    };

    const login = async (correo, contrasena) => {
        setLoading(true);

        try {
            const respuesta = await iniciarSesion(correo, contrasena);

            localStorage.setItem('token', respuesta.token);
            localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));

            setUser(respuesta.usuario);

            return respuesta;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
