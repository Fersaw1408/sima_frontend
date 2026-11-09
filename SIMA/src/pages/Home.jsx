
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <header className="home-header">
                <div className="home-logo">
                    <span>💧</span> SIMA
                </div>

                <nav>
                    <a href="#inicio">Inicio</a>
                    <a href="#nosotros">Nosotros</a>
                    <a href="#funciones">Funciones</a>
                </nav>

                <div className="home-buttons">
                    <Link to="/login" className="btn-login">Iniciar sesión</Link>
                    <Link to="/registro" className="btn-register">Registrarse</Link>
                </div>
            </header>

            <main>
                <section className="hero" id="inicio">
                    <div className="hero-content">
                        <span className="hero-label">GESTIÓN INTELIGENTE DEL AGUA</span>

                        <h1>
                            Cuidar el agua es
                            <span> cuidar nuestro futuro.</span>
                        </h1>

                        <p>
                            SIMA es una plataforma inteligente que permite
                            monitorear el consumo de agua, consultar información
                            y promover un uso responsable del recurso hídrico.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/registro" className="btn-register">
                                Comenzar ahora
                            </Link>

                            <a href="#nosotros" className="btn-secondary">
                                Conocer más
                            </a>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="water-icon">💧</div>
                        <h2>Una gestión más inteligente</h2>
                        <p>La tecnología al servicio del agua.</p>
                    </div>
                </section>

                <section className="about" id="nosotros">
                    <h2>¿Qué es SIMA?</h2>
                    <p>
                        SIMA (Sistema Inteligente de Monitoreo de Agua) busca
                        facilitar el seguimiento del consumo de agua mediante
                        herramientas tecnológicas que permitan consultar
                        lecturas, identificar alertas y conocer la información
                        relacionada con el servicio.
                    </p>
                </section>

                <section className="features" id="funciones">
                    <h2>¿Qué puedes hacer con SIMA?</h2>

                    <div className="feature-grid">
                        <article className="feature-card">
                            <span>📊</span>
                            <h3>Consumo de agua</h3>
                            <p>Consulta información sobre el consumo de agua.</p>
                        </article>

                        <article className="feature-card">
                            <span>📟</span>
                            <h3>Medidores</h3>
                            <p>Consulta información de los medidores registrados.</p>
                        </article>

                        <article className="feature-card">
                            <span>🔔</span>
                            <h3>Alertas</h3>
                            <p>Identifica alertas relacionadas con el consumo.</p>
                        </article>

                        <article className="feature-card">
                            <span>📄</span>
                            <h3>Reportes</h3>
                            <p>Accede a reportes de la información registrada.</p>
                        </article>
                    </div>
                </section>
            </main>

            <footer className="home-footer">
                <p>© 2026 SIMA - Sistema Inteligente de Monitoreo de Agua</p>
            </footer>
        </div>
    );
}

export default Home;
