import { PrismaClient, Categorias, Regioes, NivelPrioridade } from '@prisma/client';

// Instância única — Prisma reutiliza o pool de conexões automaticamente.
const prisma = new PrismaClient();

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

// Concorrência: upsert atômico evita duplicata quando dois requests
// do mesmo cidadão chegam simultaneamente — mais eficiente que SELECT + INSERT.
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
