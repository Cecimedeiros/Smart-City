import 'dotenv/config';
import express from 'express';
import metricsRoutes from './routes/metricsRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { startMetricsCron } from './config/cron';
import { startEventSubscriber, startQueueWorker } from './workers/eventWorker';
import { refreshMetricsCache } from './services/metricsService';

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
app.use(metricsRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3003;

async function bootstrap() {
  startMetricsCron();
  await startEventSubscriber();
  startQueueWorker();

  try {
    await refreshMetricsCache();
    console.log('[metrics] Cache inicial de KPIs populado');
  } catch (err) {
    console.warn('[metrics] Cache inicial indisponível:', err);
  }

  app.listen(PORT, () => console.log(`metrics-service rodando na porta ${PORT}`));
}

bootstrap().catch((err) => {
  console.error('[metrics] Falha ao iniciar:', err);
  process.exit(1);
});
