import { useState, type ChangeEvent } from 'react';
import { parseCandidatePdf } from '../services/candidateService';

interface PdfUploadProps {
    onDataExtracted: (data: { fullName?: string; email?: string; phone?: string }) => void;
}

function PdfUpload({ onDataExtracted }: PdfUploadProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const result = await parseCandidatePdf(file);
            onDataExtracted(result.data);

            setSuccess(result.message || 'Dados extraídos com sucesso!');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erro ao processar PDF.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h2>Importar currículo em PDF</h2>

            <input
                type="file"
                accept="application/pdf, .pdf"
                onChange={handleFileChange}
                disabled={loading}
            />

            {loading && <p>Processando PDF...</p>}

            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </section>
    );
}

export default PdfUpload;
