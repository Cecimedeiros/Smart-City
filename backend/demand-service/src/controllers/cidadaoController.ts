import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as denunciaService from '../services/denunciaService';
import { parsePagination } from '../utils/pagination';

export async function createDenuncia(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const input = denunciaService.validateCreateDenunciaInput(req.body);
    const denuncia = await denunciaService.createDenuncia(req.user!.userId, input);
    return res.status(201).json(denuncia);
  } catch (err) {
    next(err);
  }
}

export async function listMinhasDenuncias(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const pagination = parsePagination(req.query as Record<string, unknown>);
    const resultado = await denunciaService.listDenunciasByCidadao(req.user!.userId, pagination);
    return res.json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function listarFeedDenuncias(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const pagination = parsePagination(req.query as Record<string, unknown>);
    const resultado = await denunciaService.listAllDenuncias(pagination);
    return res.json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function getDenunciaDetalhes(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const denunciaId = denunciaService.parseDenunciaId(req.params.id);
    const denuncia = await denunciaService.getDenunciaByIdForGestor(denunciaId);
    return res.json(denuncia);
  } catch (err) {
    next(err);
  }
}