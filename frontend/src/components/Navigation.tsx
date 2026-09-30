import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/candidates">Candidatos</Link>

            <Link to="/candidates/new">Novo candidato</Link>
        </nav>
    );
}

export default Navigation;
