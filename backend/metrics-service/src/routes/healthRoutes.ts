import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { getRedisClient } from '../config/redis';

const router = Router();

router.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const redis = await getRedisClient();
    await redis.ping();
    res.json({ status: 'ok', service: 'metrics-service' });
  } catch {
    res.status(503).json({ status: 'error', service: 'metrics-service' });
  }
});

export default router;
