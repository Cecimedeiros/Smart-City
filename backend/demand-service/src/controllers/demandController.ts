import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as demandService from '../services/demandService';

export async function createDemand(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const usuarioId = req.user!.userId;
    const input = req.body as demandService.CreateDemandInput;

    const denuncia = await demandService.createDemand(usuarioId, input);

    return res.status(201).json(denuncia);
  } catch (err) {
    next(err);
  }
}