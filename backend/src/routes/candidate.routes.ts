import { Router } from 'express';
import { listCandidates, createCandidate } from '../controllers/candidate.controller';

const router = Router();

router.get('/', listCandidates);
router.post('/', createCandidate);

export default router;
