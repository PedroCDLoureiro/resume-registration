import { Request, Response } from 'express';
import {
    getCandidates,
    createCandidate as createCandidateService,
    getCandidateById,
    updateCandidate as updateCandidateService,
    deleteCandidate as deleteCandidateService,
} from '../services/candidate.service';
import { extractPdfText } from '../utils/pdfParser';
import { extractCandidateData } from '../utils/candidateExtractor';

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

export async function updateCandidate(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'ID do candidato inválido.',
            });
        }

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

        const existingCandidate = await getCandidateById(id);

        if (!existingCandidate) {
            return res.status(404).json({
                message: 'Candidato não encontrado.',
            });
        }

        const candidate = await updateCandidateService(id, {
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone?.trim() || undefined,
            desiredArea: desiredArea?.trim() || undefined,
            professionalSummary: professionalSummary?.trim() || undefined,
        });

        return res.json(candidate);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao atualizar candidato.',
        });
    }
}

export async function deleteCandidate(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'ID do candidato inválido.',
            });
        }

        const existingCandidate = await getCandidateById(id);

        if (!existingCandidate) {
            return res.status(404).json({
                message: 'Candidato não encontrado.',
            });
        }

        await deleteCandidateService(id);

        return res.status(204).send();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao excluir candidato.',
        });
    }
}

export async function parsePdf(req: Request, res: Response) {
    console.log('FILES:', req.files);
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'Envie um arquivo PDF.',
            });
        }

        const text = await extractPdfText(req.file.buffer);

        const candidateData = extractCandidateData(text);

        return res.json({
            data: candidateData,
        });
    } catch (error) {
        console.error(error);

        return res.status(200).json({
            data: {
                fullName: undefined,
                email: undefined,
                phone: undefined,
            },
            message: 'Não foi possível extrair os dados do PDF. Preencha o formulário manualmente.',
        });
    }
}
