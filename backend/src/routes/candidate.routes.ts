import { Router } from 'express';
import {
    listCandidates,
    createCandidate,
    getCandidate,
    updateCandidate,
    deleteCandidate,
} from '../controllers/candidate.controller';

const router = Router();

router.get('/', listCandidates);
router.post('/', createCandidate);
router.get('/:id', getCandidate);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

export default router;
