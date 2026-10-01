import { useState, type ChangeEvent } from 'react';
import { parseCandidatePdf } from '../services/candidateService';
import './PdfUpload.css';

interface PdfUploadProps {
    onDataExtracted: (data: { fullName?: string; email?: string; phone?: string }) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

        if (!isPdf) {
            setError('Selecione um arquivo PDF válido.');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError('O PDF deve ter no máximo 5 MB.');
            return;
        }

        setLoading(true);

        try {
            const result = await parseCandidatePdf(file);

            const data = result.data;

            onDataExtracted(data);

            const hasExtractedData = data.fullName || data.email || data.phone;

            if (hasExtractedData) {
                setSuccess(
                    'Dados extraídos com sucesso! Confira as informações antes de cadastrar.'
                );
            } else {
                setSuccess(
                    'O PDF foi processado, mas não foi possível identificar os dados. Preencha o formulário manualmente.'
                );
            }
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
        <section className="pdf-upload">
            <h2>Importar currículo em PDF</h2>

            <p className="pdf-upload-description">
                Envie seu currículo para preencher automaticamente nome, e-mail e telefone. Você
                poderá revisar os dados antes de cadastrar.
            </p>

            <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                disabled={loading}
            />

            <p className="pdf-upload-description">Tamanho máximo: 5 MB.</p>

            {loading && <p className="pdf-upload-message">Processando PDF...</p>}

            {success && <p className="pdf-upload-message feedback-success">{success}</p>}

            {error && <p className="pdf-upload-message feedback-error">{error}</p>}
        </section>
    );
}

export default PdfUpload;
