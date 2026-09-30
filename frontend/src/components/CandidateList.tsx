import { Link } from 'react-router-dom';

import type { Candidate } from '../types/candidate';

interface CandidateListProps {
    candidates: Candidate[];
}

function CandidateList({ candidates }: CandidateListProps) {
    if (candidates.length === 0) {
        return <p>Nenhum candidato encontrado.</p>;
    }

    return (
        <section>
            {candidates.map((candidate) => (
                <article key={candidate.id}>
                    <h3>{candidate.fullName}</h3>
                    <p>
                        <strong>Email:</strong> {candidate.email}
                    </p>
                    {candidate.phone && (
                        <p>
                            <strong>Telefone:</strong> {candidate.phone}
                        </p>
                    )}
                    {candidate.desiredArea && (
                        <p>
                            <strong>Área desejada:</strong> {candidate.desiredArea}
                        </p>
                    )}
                    {candidate.professionalSummary && (
                        <p>
                            <strong>Resumo profissional:</strong> {candidate.professionalSummary}
                        </p>
                    )}

                    <Link to={`/candidates/${candidate.id}`}>Ver detalhes</Link>
                </article>
            ))}
        </section>
    );
}

export default CandidateList;
