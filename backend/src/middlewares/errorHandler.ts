import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'O PDF deve ter no máximo 5 MB.',
            });
        }

        return res.status(400).json({
            message: 'Erro ao enviar o arquivo.',
        });
    }

    if (error instanceof Error) {
        if (error.message === 'O arquivo deve ser um PDF válido.') {
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    console.error(error);

    return res.status(500).json({
        message: 'Erro interno do servidor.',
    });
}
