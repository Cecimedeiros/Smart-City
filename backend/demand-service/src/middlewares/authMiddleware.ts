import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change-me';

export interface AuthRequest extends Request {
  user?: { userId: number; papel: 'cidadao' | 'gestor'; email?: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: number; papel: 'cidadao' | 'gestor'; email?: string };
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

// Garante que apenas cidadãos acessem a rota
export function apenascidadao(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.papel !== 'cidadao') {
    return res.status(403).json({ error: 'Acesso restrito a cidadãos' });
  }
  next();
}
