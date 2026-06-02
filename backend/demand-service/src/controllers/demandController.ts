import { Response, NextFunction } from 'express';
import { Categorias, Regioes, NivelPrioridade } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as demandService from '../services/demandService';

/*
 * Otimização — validação no controller antes de chegar ao banco
 * Rejeita enum inválido sem abrir conexão com o Prisma.
 */
const CATEGORIAS = Object.values(Categorias);
const REGIOES    = Object.values(Regioes);
const PRIORIDADES = Object.values(NivelPrioridade);

function httpError(mensagem: string, status: number): Error & { status: number } {
  const err = new Error(mensagem) as Error & { status: number };
  err.status = status;
  return err;
}

export async function createDemand(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { titulo, categoria, regiao, descricao, prioridade, numero, cep, bairro, cidade, rua } = req.body;

    const obrigatorios = { titulo, categoria, regiao, descricao, numero, cep, bairro, cidade, rua };
    const faltando = Object.keys(obrigatorios).filter((k) => !obrigatorios[k as keyof typeof obrigatorios]);

    if (faltando.length > 0) {
      return next(httpError(`Campos obrigatórios faltando: ${faltando.join(', ')}`, 400));
    }

    if (!CATEGORIAS.includes(categoria)) {
      return next(httpError(`Categoria inválida. Valores aceitos: ${CATEGORIAS.join(', ')}`, 400));
    }

    if (!REGIOES.includes(regiao)) {
      return next(httpError(`Região inválida. Valores aceitos: ${REGIOES.join(', ')}`, 400));
    }

    if (prioridade && !PRIORIDADES.includes(prioridade)) {
      return next(httpError(`Prioridade inválida. Valores aceitos: ${PRIORIDADES.join(', ')}`, 400));
    }

    const denuncia = await demandService.createDemand(req.user!.userId, {
      titulo,
      categoria,
      regiao,
      descricao,
      prioridade,
      numero,
      cep,
      bairro,
      cidade,
      rua,
    });

    return res.status(201).json(denuncia);
  } catch (err) {
    next(err);
  }
}
