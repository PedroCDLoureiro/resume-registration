import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <header className="navigation">
            <div className="navigation-content">
                <Link to="/candidates" className="navigation-logo">
                    Cadastro de Candidatos
                </Link>

                <nav className="navigation-links">
                    <Link to="/candidates">Candidatos</Link>

                    <Link to="/candidates/new" className="navigation-button">
                        Novo candidato
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navigation;
