import { Router } from 'express';
import {
    listCandidates,
    createCandidate,
    getCandidate,
    updateCandidate,
} from '../controllers/candidate.controller';

const router = Router();

router.get('/', listCandidates);
router.post('/', createCandidate);
router.get('/:id', getCandidate);
router.put('/:id', updateCandidate);

export default router;
