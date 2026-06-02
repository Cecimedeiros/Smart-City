<<<<<<< HEAD
import 'dotenv/config';
import express from 'express';
import demandRoutes from './routes/demandRoutes';
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
app.use(demandRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;

=======
import app from './app';

// Concorrência: I/O assíncrono do Node.js — cada await libera o event loop,
// permitindo que múltiplas requisições sejam processadas ao mesmo tempo sem bloqueio.

const PORT = process.env.PORT || 3002;
>>>>>>> 5daa218ea61fc5f1f309a8a7d9cc18de38d87e2f
app.listen(PORT, () => console.log(`demand-service rodando na porta ${PORT}`));
