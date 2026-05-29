import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, email, senha, tipo' });
    }

    if (tipo !== 'cidadao' && tipo !== 'gestor') {
      return res.status(400).json({ error: 'tipo deve ser "cidadao" ou "gestor"' });
    }

    const result = await authService.register(nome, email, senha, tipo);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Campos obrigatórios: email, senha' });
    }

    const result = await authService.login(email, senha);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}
