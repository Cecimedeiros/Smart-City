import { PrismaClient, Categorias, Regioes, NivelPrioridade } from '@prisma/client';

const prisma = new PrismaClient();

/*
 * Otimização — connection pooling
 * PrismaClient reutiliza conexões do pool automaticamente.
 * Uma única instância aqui evita overhead de conexão por requisição.
 */

export type CreateDenunciaInput = {
  titulo: string;
  categoria: Categorias;
  regiao: Regioes;
  descricao: string;
  prioridade: NivelPrioridade;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  rua: string;
  cidadaoId: number;
};

/*
 * Concorrência — upsert atômico
 *
 * Se dois requests do mesmo usuário chegarem simultaneamente, o upsert
 * garante que apenas um registro seja criado no banco (operação atômica).
 * Sem isso, dois INSERTs paralelos gerariam violação de unique constraint.
 *
 * Otimização: upsert é uma única query vs SELECT + INSERT separados.
 */
export async function findOrCreateCidadao(usuarioId: number) {
  return prisma.cidadao.upsert({
    where: { usuario_id: usuarioId },
    update: {},
    create: { usuario_id: usuarioId },
  });
}

export async function createDenuncia(data: CreateDenunciaInput) {
  return prisma.denuncia.create({
    data: {
      titulo: data.titulo,
      categoria: data.categoria,
      regiao: data.regiao,
      descricao: data.descricao,
      prioridade: data.prioridade,
      numero: data.numero,
      cep: data.cep,
      bairro: data.bairro,
      cidade: data.cidade,
      rua: data.rua,
      cidadao_id: data.cidadaoId,
    },
  });
}

export async function deleteDenunciaById(id: number) {
  return prisma.denuncia.delete({ where: { id_denuncia: id } });
}

export async function deleteCidadaoByUsuarioId(usuarioId: number) {
  return prisma.cidadao.delete({ where: { usuario_id: usuarioId } });
}
