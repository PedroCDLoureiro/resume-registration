import { Request, Response } from 'express';
import {
    getCandidates,
    createCandidate as createCandidateService,
    getCandidateById,
} from '../services/candidate.service';

export async function listCandidates(_req: Request, res: Response) {
    try {
        const candidates = await getCandidates();

        res.json(candidates);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Erro ao buscar candidatos.',
        });
    }
}

export async function createCandidate(req: Request, res: Response) {
    try {
        const { fullName, email, phone, desiredArea, professionalSummary } = req.body;

        if (!fullName || !fullName.trim()) {
            return res.status(400).json({
                message: 'O nome completo é obrigatório.',
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                message: 'O e-mail é obrigatório.',
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                message: 'Informe um e-mail válido.',
            });
        }

        const candidate = await createCandidateService({
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone?.trim() || undefined,
            desiredArea: desiredArea?.trim() || undefined,
            professionalSummary: professionalSummary?.trim() || undefined,
        });

        return res.status(201).json(candidate);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao cadastrar candidato.',
        });
    }
}

export async function getCandidate(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'ID do candidato inválido.',
            });
        }

        const candidate = await getCandidateById(id);

        if (!candidate) {
            return res.status(404).json({
                message: 'Candidato não encontrado.',
            });
        }

        return res.json(candidate);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao buscar candidato.',
        });
    }
}
