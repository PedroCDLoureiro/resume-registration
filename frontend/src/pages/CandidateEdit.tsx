import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CandidateForm from '../components/CandidateForm';
import type { Candidate, CreateCandidateData } from '../types/candidate';

const API_URL = `${import.meta.env.VITE_API_URL}/candidates`;

function CandidateEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

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

    async function handleSubmit(data: CreateCandidateData) {
        setSaving(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Erro ao atualizar candidato.');
            }

            navigate(`/candidates/${id}`);

            return true;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erro ao atualizar candidato.');
            }

            return false;
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p>Carregando candidato...</p>;
    }

    if (error && !candidate) {
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

    const initialData: CreateCandidateData = {
        fullName: candidate.fullName,
        email: candidate.email,
        phone: candidate.phone ?? '',
        desiredArea: candidate.desiredArea ?? '',
        professionalSummary: candidate.professionalSummary ?? '',
    };

    return (
        <main>
            <h1>Editar candidato</h1>

            {error && <p>{error}</p>}

            <CandidateForm
                initialData={initialData}
                onSubmit={handleSubmit}
                loading={saving}
                submitLabel="Salvar alterações"
            />
        </main>
    );
}

export default CandidateEdit;
