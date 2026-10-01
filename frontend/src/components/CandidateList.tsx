import { Link } from 'react-router-dom';
import type { Candidate } from '../types/candidate';
import './CandidateList.css';

interface CandidateListProps {
    candidates: Candidate[];
}

function CandidateList({ candidates }: CandidateListProps) {
    if (candidates.length === 0) {
        return <p className="candidate-empty">Nenhum candidato cadastrado.</p>;
    }

    return (
        <section className="candidate-list">
            {candidates.map((candidate) => (
                <article key={candidate.id} className="candidate-card">
                    <h3>{candidate.fullName}</h3>

                    <p>
                        <strong>E-mail:</strong> {candidate.email}
                    </p>

                    {candidate.phone && (
                        <p>
                            <strong>Telefone:</strong> {candidate.phone}
                        </p>
                    )}

                    {candidate.desiredArea && (
                        <p>
                            <strong>Área:</strong> {candidate.desiredArea}
                        </p>
                    )}

                    <Link to={`/candidates/${candidate.id}`} className="candidate-card-link">
                        Ver detalhes →
                    </Link>
                </article>
            ))}
        </section>
    );
}

export default CandidateList;
