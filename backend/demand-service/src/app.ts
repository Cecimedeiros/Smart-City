import 'dotenv/config';
import express from 'express';
import demandRoutes from './routes/demandRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use('/demandas', demandRoutes);
app.use(errorMiddleware);

export default app;
