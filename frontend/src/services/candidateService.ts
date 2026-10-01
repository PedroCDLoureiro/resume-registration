import type { Candidate, CreateCandidateData } from '../types/candidate';

const API_URL = `${import.meta.env.VITE_API_URL}/candidates`;

export async function createCandidate(data: CreateCandidateData): Promise<Candidate> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Erro ao cadastrar candidato.');
    }

    return result;
}

export async function getCandidates(): Promise<Candidate[]> {
    const response = await fetch(API_URL);

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Erro ao buscar candidatos.');
    }

    return result;
}

export async function parseCandidatePdf(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch(`${API_URL}/parse-pdf`, {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Erro ao processar PDF.');
    }

    return result;
}
