import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', service: 'demand-service' });
  } catch {
    res.status(503).json({ status: 'error', service: 'demand-service' });
  }
});

export default router;
