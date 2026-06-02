import { Router } from 'express';
import { authMiddleware, apenascidadao } from '../middlewares/authMiddleware';
import { createDemand } from '../controllers/demandController';

const router = Router();

// POST /demandas — issue #26
// Apenas cidadãos autenticados criam demandas
router.post('/', authMiddleware, apenascidadao, createDemand);

export default router;
