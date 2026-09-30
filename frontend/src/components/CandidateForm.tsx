import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CreateCandidateData } from '../types/candidate';

interface CandidateFormProps {
    onSubmit: (data: CreateCandidateData) => Promise<void>;
    loading?: boolean;
}

function CandidateForm({ onSubmit, loading = false }: CandidateFormProps) {
    const [formData, setFormData] = useState<CreateCandidateData>({
        fullName: '',
        email: '',
        phone: '',
        desiredArea: '',
        professionalSummary: '',
    });

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fullName">Nome completo *</label>

                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            fullName: event.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label htmlFor="email">E-mail *</label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            email: event.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label htmlFor="phone">Telefone</label>

                <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            phone: event.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label htmlFor="desiredArea">Área/cargo desejado</label>

                <input
                    id="desiredArea"
                    name="desiredArea"
                    type="text"
                    value={formData.desiredArea}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            desiredArea: event.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label htmlFor="professionalSummary">Resumo profissional</label>

                <textarea
                    id="professionalSummary"
                    name="professionalSummary"
                    value={formData.professionalSummary}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            professionalSummary: event.target.value,
                        })
                    }
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
        </form>
    );
}

export default CandidateForm;
