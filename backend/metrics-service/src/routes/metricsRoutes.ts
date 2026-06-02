import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getKpis, refreshKpis } from '../controllers/metricsController';

const router = Router();

router.get('/metrics', authMiddleware, getKpis);
router.post('/metrics/refresh', authMiddleware, refreshKpis);

export default router;
