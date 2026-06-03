import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export function roleMiddleware(...roles: Array<'cidadao' | 'gestor'>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!roles.includes(req.user.papel)) {
      return res.status(403).json({ error: 'Acesso negado para este perfil' });
    }

    next();
  };
}
