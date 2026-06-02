<<<<<<< HEAD
import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.options('*', (_req, res) => res.sendStatus(204));

app.use(express.json());
app.use(healthRoutes);
app.use('/auth', authRoutes);
app.use(errorMiddleware);
=======
import app from './app';
>>>>>>> 5daa218ea61fc5f1f309a8a7d9cc18de38d87e2f

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`auth-service rodando na porta ${PORT}`));
