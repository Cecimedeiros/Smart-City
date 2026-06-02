import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change-me';

export interface AuthRequest extends Request {
<<<<<<< HEAD
  user?: { userId: number; role: 'cidadao' | 'gestor' };
=======
  user?: { userId: number; papel: 'cidadao' | 'gestor' };
>>>>>>> 5daa218ea61fc5f1f309a8a7d9cc18de38d87e2f
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
<<<<<<< HEAD
    const decoded = jwt.verify(token, SECRET) as { userId: number; role: 'cidadao' | 'gestor' };
=======
    const decoded = jwt.verify(token, SECRET) as { userId: number; papel: 'cidadao' | 'gestor' };
>>>>>>> 5daa218ea61fc5f1f309a8a7d9cc18de38d87e2f
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
<<<<<<< HEAD
=======

// Garante que apenas cidadãos acessem a rota
export function apenascidadao(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.papel !== 'cidadao') {
    return res.status(403).json({ error: 'Acesso restrito a cidadãos' });
  }
  next();
}
>>>>>>> 5daa218ea61fc5f1f309a8a7d9cc18de38d87e2f
