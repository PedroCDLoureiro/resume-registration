import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { Candidate } from '../types/candidate';

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
            <main>
                <p>{error}</p>

                <Link to="/candidates">Voltar para candidatos</Link>
            </main>
        );
    }

    if (!candidate) {
        return null;
    }

    return (
        <main>
            <Link to="/candidates">← Voltar para candidatos</Link>

            <Link to={`/candidates/${candidate.id}/edit`}>Editar candidato</Link>

            <button type="button" onClick={handleDelete}>
                Excluir candidato
            </button>

            <h1>{candidate.fullName}</h1>

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

            {candidate.professionalSummary && (
                <div>
                    <h2>Resumo profissional</h2>

                    <p>{candidate.professionalSummary}</p>
                </div>
            )}
        </main>
    );
}

export default CandidateDetails;
