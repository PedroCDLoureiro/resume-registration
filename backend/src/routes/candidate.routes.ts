import { Router } from 'express';
import {
    listCandidates,
    createCandidate,
    getCandidate,
    updateCandidate,
    deleteCandidate,
    parsePdf,
} from '../controllers/candidate.controller';

import { uploadPdf } from '../middlewares/pdfUpload';

const router = Router();

router.get('/', listCandidates);
router.post('/', createCandidate);
router.post('/parse-pdf', uploadPdf.single('file'), parsePdf);
router.get('/:id', getCandidate);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

export default router;
