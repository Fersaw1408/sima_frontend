
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Consumo from './pages/Consumo';
import Medidores from './pages/Medidores';
import Lecturas from './pages/Lecturas';
import Alertas from './pages/Alertas';
import Reportes from './pages/Reportes';
import Facturacion from './pages/Facturacion';
import Notificacion from './pages/Notificacion';
import Configuracion from './pages/Configuracion';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/consumo" element={<Consumo />} />
                <Route path="/medidores" element={<Medidores />} />
                <Route path="/lecturas" element={<Lecturas />} />
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/facturacion" element={<Facturacion />} />
                <Route path="/notificacion" element={<Notificacion />} />
                <Route path="/configuracion" element={<Configuracion />} />
            </Route>
        </Routes>
    );
}

export default App;
