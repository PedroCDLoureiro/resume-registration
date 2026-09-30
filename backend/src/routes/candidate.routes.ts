import { Router } from 'express';
import { listCandidates, createCandidate, getCandidate } from '../controllers/candidate.controller';

const router = Router();

router.get('/', listCandidates);
router.post('/', createCandidate);
router.get('/:id', getCandidate);

export default router;
