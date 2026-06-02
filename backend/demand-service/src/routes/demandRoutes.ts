import { Router } from 'express';
<<<<<<< HEAD
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import {
  createDenuncia,
  listMinhasDenuncias,
  listarFeedDenuncias, 
  getDenunciaDetalhes,
} from '../controllers/cidadaoController';
import {
  atualizarStatusDenuncia,
  listarTodasDenuncias,
  getDenunciaDetalhesGestor,
} from '../controllers/gestorController';

const router = Router();


router.post(
  '/demands',
  authMiddleware,
  roleMiddleware('cidadao'),
  createDenuncia
);

router.get(
  '/demands',
  authMiddleware,
  roleMiddleware('cidadao'),
  listMinhasDenuncias
);


router.get(
  '/demands/feed',
  authMiddleware,
  roleMiddleware('cidadao'),
  listarFeedDenuncias 
);


router.get(
  '/demands/:id',
  authMiddleware,
  roleMiddleware('cidadao'),
  getDenunciaDetalhes
);


router.get(
  '/gestor/demands',
  authMiddleware,
  roleMiddleware('gestor'),
  listarTodasDenuncias 
);

router.get(
  '/gestor/demands/:id',
  authMiddleware,
  roleMiddleware('gestor'),
  getDenunciaDetalhesGestor
);

router.patch(
  '/demands/:id/status',
  authMiddleware,
  roleMiddleware('gestor'),
  atualizarStatusDenuncia
);

export default router;
=======
import { authMiddleware, apenascidadao } from '../middlewares/authMiddleware';
import { createDemand } from '../controllers/demandController';

const router = Router();

// POST /demandas — issue #26
// Apenas cidadãos autenticados criam demandas
router.post('/', authMiddleware, apenascidadao, createDemand);

export default router;
>>>>>>> 5daa218ea61fc5f1f309a8a7d9cc18de38d87e2f
