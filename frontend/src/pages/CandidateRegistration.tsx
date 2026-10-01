import { useState } from 'react';
import CandidateForm from '../components/CandidateForm';
import { createCandidate } from '../services/candidateService';
import type { CreateCandidateData } from '../types/candidate';
import PdfUpload from '../components/PdfUpload';

function CandidateRegistration() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [initialData, setInitialData] = useState<CreateCandidateData | undefined>();

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
                setError('Erro ao cadastrar candidato.');
            }

            return false;
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>Novo candidato</h1>
                    <p>
                        Cadastre um candidato manualmente ou importe os dados de um currículo em
                        PDF.
                    </p>
                </div>
            </div>

            {success && <p className="feedback-success">{success}</p>}

            {error && <p className="feedback-error">{error}</p>}

            <PdfUpload
                onDataExtracted={(data) => {
                    setInitialData({
                        fullName: data.fullName ?? '',
                        email: data.email ?? '',
                        phone: data.phone ?? '',
                        desiredArea: '',
                        professionalSummary: '',
                    });
                }}
            />

            <CandidateForm
                initialData={initialData}
                onSubmit={handleSubmit}
                loading={loading}
                submitLabel="Cadastrar"
            />
        </main>
    );
}

export default CandidateRegistration;
