import express from 'express';
import cors from 'cors';
import candidateRoutes from './routes/candidate.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/candidates', candidateRoutes);

export default app;
