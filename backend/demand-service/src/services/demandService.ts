import { Categorias, Regioes, NivelPrioridade } from '@prisma/client';
import * as repo from '../repositories/DenunciaRepository';

export type CreateDemandInput = {
  titulo: string;
  categoria: Categorias;
  regiao: Regioes;
  descricao: string;
  prioridade?: NivelPrioridade;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  rua: string;
};

export async function createDemand(usuarioId: number, data: CreateDemandInput) {
  const cidadao = await repo.findOrCreateCidadao(usuarioId);

  return repo.createDenuncia({
    ...data,
    prioridade: data.prioridade ?? 'MEDIA',
    cidadaoId: cidadao.id_cidadao,
  });
}
