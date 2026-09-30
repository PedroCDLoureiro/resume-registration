import { Request, Response } from 'express';
import { getCandidates } from '../services/candidate.service';

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
