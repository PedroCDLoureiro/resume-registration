import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { CreateCandidateData } from '../types/candidate';
import './CandidateForm.css';

interface CandidateFormProps {
    onSubmit: (data: CreateCandidateData) => Promise<boolean>;
    initialData?: CreateCandidateData;
    loading?: boolean;
    submitLabel?: string;
}

function CandidateForm({
    onSubmit,
    initialData,
    loading = false,
    submitLabel = 'Cadastrar',
}: CandidateFormProps) {
    const [formData, setFormData] = useState<CreateCandidateData>(
        initialData ?? {
            fullName: '',
            email: '',
            phone: '',
            desiredArea: '',
            professionalSummary: '',
        }
    );

    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
    }>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setErrors({});
        }
    }, [initialData]);

    function validateForm() {
        const newErrors: {
            fullName?: string;
            email?: string;
        } = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'O nome completo é obrigatório.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'O e-mail é obrigatório.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(formData.email.trim())) {
                newErrors.email = 'Informe um e-mail válido.';
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        const success = await onSubmit(formData);

        if (success) {
            resetForm();
            setErrors({});
        }
    }

    function resetForm() {
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            desiredArea: '',
            professionalSummary: '',
        });
    }

    return (
        <form className="candidate-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="fullName">Nome completo *</label>

                <input
                    id="fullName"
                    className={errors.fullName ? 'input-error' : ''}
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

                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="email">E-mail *</label>

                <input
                    id="email"
                    className={errors.email ? 'input-error' : ''}
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

                {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-field">
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

            <div className="form-field">
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

            <div className="form-field">
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

            <button className="form-submit" type="submit" disabled={loading}>
                {loading ? 'Salvando...' : submitLabel}
            </button>
        </form>
    );
}

export default CandidateForm;
