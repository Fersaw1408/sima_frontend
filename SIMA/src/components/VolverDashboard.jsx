
import { Link } from 'react-router-dom';
import './VolverDashboard.css';

function VolverDashboard() {
    return (
        <Link to="/dashboard" className="volver-dashboard">
            ← Volver al panel principal
        </Link>
    );
}

export default VolverDashboard;
