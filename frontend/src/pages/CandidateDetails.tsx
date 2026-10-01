import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { Candidate } from '../types/candidate';
import './CandidateDetails.css';

const API_URL = `${import.meta.env.VITE_API_URL}/candidates`;

function CandidateDetails() {
    const { id } = useParams();

    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function loadCandidate() {
            try {
                const response = await fetch(`${API_URL}/${id}`);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Erro ao buscar candidato.');
                }

                setCandidate(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erro ao buscar candidato.');
                }
            } finally {
                setLoading(false);
            }
        }

        loadCandidate();
    }, [id]);

    async function handleDelete() {
        const confirmed = window.confirm('Tem certeza que deseja excluir este candidato?');

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            const data = response.status === 204 ? null : await response.json();

            if (!response.ok) {
                throw new Error(data?.message || 'Erro ao excluir candidato.');
            }

            navigate('/candidates');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erro ao excluir candidato.');
            }
        }
    }

    if (loading) {
        return <p>Carregando candidato...</p>;
    }

    if (error) {
        return (
            <main className="candidate-details">
                <Link to="/candidates" className="candidate-details-back">
                    ← Voltar para candidatos
                </Link>

                <p className="feedback-error">{error}</p>
            </main>
        );
    }

    if (!candidate) {
        return null;
    }

    return (
        <main className="candidate-details">
            <Link to="/candidates" className="candidate-details-back">
                ← Voltar para candidatos
            </Link>

            <article className="candidate-details-card">
                <header className="candidate-details-header">
                    <h1>{candidate.fullName}</h1>

                    <div className="candidate-details-actions">
                        <Link
                            to={`/candidates/${candidate.id}/edit`}
                            className="candidate-details-button"
                        >
                            Editar
                        </Link>

                        <button
                            type="button"
                            className="candidate-details-button candidate-details-button-danger"
                            onClick={handleDelete}
                        >
                            Excluir
                        </button>
                    </div>
                </header>

                <div className="candidate-details-info">
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
                            <strong>Área desejada:</strong> {candidate.desiredArea}
                        </p>
                    )}
                </div>

                {candidate.professionalSummary && (
                    <section className="candidate-details-summary">
                        <h2>Resumo profissional</h2>
                        <p>{candidate.professionalSummary}</p>
                    </section>
                )}
            </article>
        </main>
    );
}

export default CandidateDetails;
