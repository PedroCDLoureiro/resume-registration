import { Router } from 'express';
import { listCandidates } from '../controllers/candidate.controller';

const router = Router();

router.get('/', listCandidates);

export default router;
