import express from 'express';
import cors from 'cors';
import candidateRoutes from './routes/candidate.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/candidates', candidateRoutes);

app.use(errorHandler);

export default app;
