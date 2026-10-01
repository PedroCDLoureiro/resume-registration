import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CandidateForm from '../components/CandidateForm';
import { getCandidateById, updateCandidate } from '../services/candidateService';
import type { Candidate, CreateCandidateData } from '../types/candidate';

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
                const data = await getCandidateById(id!);
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
            await updateCandidate(id!, data);

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
