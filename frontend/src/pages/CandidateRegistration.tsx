import { useState } from 'react';
import CandidateForm from '../components/CandidateForm';
import { createCandidate } from '../services/candidateService';
import type { CreateCandidateData } from '../types/candidate';

function CandidateRegistration() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(data: CreateCandidateData) {
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            await createCandidate(data);

            setSuccess('Candidato cadastrado com sucesso!');

            return true;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Error ao cadastrar candidato.');
            }

            return false;
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <h1>Cadastro de Candidato</h1>

            {success && <p>{success}</p>}
            {error && <p>{error}</p>}

            <CandidateForm onSubmit={handleSubmit} loading={loading} />
        </main>
    );
}

export default CandidateRegistration;
