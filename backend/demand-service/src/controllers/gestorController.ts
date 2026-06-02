import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as denunciaService from '../services/denunciaService';
import { parsePagination } from '../utils/pagination';

export async function listarTodasDenuncias(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const pagination = parsePagination(req.query as Record<string, unknown>);
    const resultado = await denunciaService.listAllDenuncias(pagination);
    return res.json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function getDenunciaDetalhesGestor(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const denunciaId = denunciaService.parseDenunciaId(req.params.id);
    const denuncia = await denunciaService.getDenunciaByIdForGestor(denunciaId);
    return res.json(denuncia);
  } catch (err) {
    next(err);
  }
}

export async function atualizarStatusDenuncia(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const denunciaId = denunciaService.parseDenunciaId(req.params.id);
    const novoStatus = denunciaService.validateStatusInput(req.body.status);

    const resultado = await denunciaService.updateDenunciaStatus(
      req.user!.userId,
      denunciaId,
      novoStatus
    );

    return res.json(resultado);
  } catch (err) {
    next(err);
  }
}
