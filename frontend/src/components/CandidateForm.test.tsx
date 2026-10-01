import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CandidateForm from './CandidateForm';

describe('CandidateForm', () => {
    it('deve mostrar erro quando o nome não for informado', async () => {
        const handleSubmit = vi.fn();

        render(<CandidateForm onSubmit={handleSubmit} />);

        const submitButton = screen.getByRole('button', {
            name: 'Cadastrar',
        });

        fireEvent.click(submitButton);

        expect(await screen.findByText('O nome completo é obrigatório.')).toBeInTheDocument();

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('deve mostrar erro quando o e-mail não for informado', async () => {
        const handleSubmit = vi.fn();

        render(<CandidateForm onSubmit={handleSubmit} />);

        const nameInput = screen.getByLabelText('Nome completo *');

        fireEvent.change(nameInput, {
            target: {
                value: 'Pedro Loureiro',
            },
        });

        const submitButton = screen.getByRole('button', {
            name: 'Cadastrar',
        });

        fireEvent.click(submitButton);

        expect(await screen.findByText('O e-mail é obrigatório.')).toBeInTheDocument();

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('deve mostrar erro para e-mail inválido', async () => {
        const handleSubmit = vi.fn();

        render(<CandidateForm onSubmit={handleSubmit} />);

        const nameInput = screen.getByLabelText('Nome completo *');

        const emailInput = screen.getByLabelText('E-mail *');

        fireEvent.change(nameInput, {
            target: {
                value: 'Pedro Loureiro',
            },
        });

        fireEvent.change(emailInput, {
            target: {
                value: 'pedro@',
            },
        });

        const submitButton = screen.getByRole('button', {
            name: 'Cadastrar',
        });

        fireEvent.click(submitButton);

        expect(await screen.findByText('Informe um e-mail válido.')).toBeInTheDocument();

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('deve chamar onSubmit quando os dados forem válidos', async () => {
        const handleSubmit = vi.fn().mockResolvedValue(true);

        render(<CandidateForm onSubmit={handleSubmit} />);

        const nameInput = screen.getByLabelText('Nome completo *');

        const emailInput = screen.getByLabelText('E-mail *');

        const phoneInput = screen.getByLabelText('Telefone');

        fireEvent.change(nameInput, {
            target: {
                value: 'Pedro Loureiro',
            },
        });

        fireEvent.change(emailInput, {
            target: {
                value: 'pedro@email.com',
            },
        });

        fireEvent.change(phoneInput, {
            target: {
                value: '(41) 99999-9999',
            },
        });

        const submitButton = screen.getByRole('button', {
            name: 'Cadastrar',
        });

        fireEvent.click(submitButton);

        expect(handleSubmit).toHaveBeenCalledWith({
            fullName: 'Pedro Loureiro',
            email: 'pedro@email.com',
            phone: '(41) 99999-9999',
            desiredArea: '',
            professionalSummary: '',
        });
    });
});
