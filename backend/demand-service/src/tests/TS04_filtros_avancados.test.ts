// TS04 — Filtros avançados combinados (BDD)
//
// PRÉ-REQUISITOS:
//   • PostgreSQL do demand-service rodando e acessível via DATABASE_URL_DEMAND
//   • Redis rodando (demand-service importa redis no config/redis.ts)
//   • Migrations aplicadas (prisma migrate deploy)
//   • Variável JWT_SECRET definida (ou usa padrão 'smartcity-dev-secret')
//
// ENDPOINTS TESTADOS:
//   GET /demandas/demands          → listMinhasDenuncias  (cidadão)
//   GET /demandas/demands/feed     → listarFeedDenuncias  (cidadão)
//   GET /demandas/gestor/demands   → listarTodasDenuncias (gestor)
//
// Os conflitos de merge foram resolvidos. O JWT usa o campo `papel` em todos os testes.
//
// FILTROS SUPORTADOS PELO BACKEND ATUAL:
//   ✅ ?page=N&limit=N  (paginação — implementada em parsePagination)
//   ❌ ?categoria=      (NÃO implementado em listAllDenuncias / listDenunciasByCidadao)
//   ❌ ?status=         (NÃO implementado)
//   ❌ ?regiao=         (NÃO implementado)
//   ❌ ?prioridade=     (NÃO implementado)
//   Os testes de filtro ficam como it.skip() até o backend implementar os query params.
//
// COMANDO:
//   cd backend/demand-service && npx vitest run src/tests/TS04_filtros_avancados.test.ts

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { PrismaClient, Categorias, Regioes, StatusDenuncia, NivelPrioridade } from '@prisma/client';
import app from '../app';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'smartcity-dev-secret';

let tokenCidadao: string;
let tokenGestor: string;
let usuarioIdCidadao: number;
let usuarioIdGestor: number;
let cidadaoId: number;

const idsParaLimpar: number[] = [];

// Seed com categorias, status e regiões variados para cobrir todos os cenários de filtro
const dadosSeed: Array<{
  titulo: string;
  categoria: Categorias;
  regiao: Regioes;
  descricao: string;
  prioridade: NivelPrioridade;
  status: StatusDenuncia;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  rua: string;
}> = [
  {
    titulo: 'TS04 Poste apagado',
    categoria: Categorias.ILUMINACAO_PUBLICA,
    regiao: Regioes.REGIAO_METROPOLITANA_DO_RECIFE,
    descricao: 'Poste apagado na rua X',
    prioridade: NivelPrioridade.ALTA,
    status: StatusDenuncia.ABERTA,
    numero: '1', cep: '50000-000', bairro: 'Boa Viagem', cidade: 'Recife', rua: 'Av. Boa Viagem',
  },
  {
    titulo: 'TS04 Buraco na via',
    categoria: Categorias.MANUTENCAO_DE_VIAS,
    regiao: Regioes.AGRESTE,
    descricao: 'Buraco grande na rua Y',
    prioridade: NivelPrioridade.MEDIA,
    status: StatusDenuncia.EM_ANALISE,
    numero: '2', cep: '55000-000', bairro: 'Centro', cidade: 'Caruaru', rua: 'Rua Central',
  },
  {
    titulo: 'TS04 Lixo acumulado',
    categoria: Categorias.COLETA_DE_LIXO,
    regiao: Regioes.SERTAO,
    descricao: 'Lixo acumulado na esquina',
    prioridade: NivelPrioridade.BAIXA,
    status: StatusDenuncia.RESOLVIDA,
    numero: '3', cep: '56000-000', bairro: 'Bairro Alto', cidade: 'Petrolina', rua: 'Rua das Flores',
  },
  {
    titulo: 'TS04 Falta de saneamento',
    categoria: Categorias.SANEAMENTO,
    regiao: Regioes.ZONA_DA_MATA,
    descricao: 'Falta saneamento básico na rua Z',
    prioridade: NivelPrioridade.ALTA,
    status: StatusDenuncia.ABERTA,
    numero: '4', cep: '55100-000', bairro: 'Vila Nova', cidade: 'Palmares', rua: 'Av. Principal',
  },
  {
    titulo: 'TS04 Câmera quebrada',
    categoria: Categorias.SEGURANCA,
    regiao: Regioes.REGIAO_METROPOLITANA_DO_RECIFE,
    descricao: 'Câmera de segurança com defeito',
    prioridade: NivelPrioridade.MEDIA,
    status: StatusDenuncia.ABERTA,
    numero: '5', cep: '50100-000', bairro: 'Pina', cidade: 'Recife', rua: 'Rua do Pina',
  },
];

beforeAll(async () => {
  const [cidadaoRow] = await prisma.$queryRaw<{ id: number }[]>`
    INSERT INTO usuarios (nome, email, senha, papel)
    VALUES ('Cidadao TS04', 'ts04.cidadao@test.com', 'hash', 'CIDADAO')
    ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome
    RETURNING id
  `;
  const [gestorRow] = await prisma.$queryRaw<{ id: number }[]>`
    INSERT INTO usuarios (nome, email, senha, papel)
    VALUES ('Gestor TS04', 'ts04.gestor@test.com', 'hash', 'GESTOR')
    ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome
    RETURNING id
  `;

  usuarioIdCidadao = cidadaoRow.id;
  usuarioIdGestor = gestorRow.id;

  tokenCidadao = jwt.sign({ userId: usuarioIdCidadao, papel: 'cidadao' }, SECRET);
  tokenGestor = jwt.sign({ userId: usuarioIdGestor, papel: 'gestor' }, SECRET);

  // Garante entrada na tabela cidadaos (o service faz upsert, mas antecipamos aqui para o seed)
  const cidadao = await prisma.cidadao.upsert({
    where: { usuario_id: usuarioIdCidadao },
    update: {},
    create: { usuario_id: usuarioIdCidadao },
  });
  cidadaoId = cidadao.id_cidadao;

  // Seed direto via Prisma — independente do endpoint de criação estar funcionando
  for (const dado of dadosSeed) {
    const denuncia = await prisma.denuncia.create({
      data: {
        titulo: dado.titulo,
        categoria: dado.categoria,
        regiao: dado.regiao,
        descricao: dado.descricao,
        prioridade: dado.prioridade,
        status: dado.status,
        numero: dado.numero,
        cep: dado.cep,
        bairro: dado.bairro,
        cidade: dado.cidade,
        rua: dado.rua,
        cidadao_id: cidadaoId,
      },
    });
    idsParaLimpar.push(denuncia.id_denuncia);
  }
});

afterAll(async () => {
  if (idsParaLimpar.length > 0) {
    await prisma.denuncia.deleteMany({ where: { id_denuncia: { in: idsParaLimpar } } });
  }
  await prisma.cidadao.deleteMany({ where: { usuario_id: usuarioIdCidadao } });
  await prisma.$executeRawUnsafe(
    `DELETE FROM usuarios WHERE email IN ('ts04.cidadao@test.com', 'ts04.gestor@test.com')`
  );
  await prisma.$disconnect();
});

// ──────────────────────────────────────────────────────────────────────────────

describe('TS04 - Filtros avançados combinados', () => {

  describe('Setup: seed de denúncias com categorias/status/regiões variadas', () => {

    it('deve ter exatamente 5 denúncias criadas no seed para este cidadão', () => {
      expect(idsParaLimpar.length).toBe(5);
      expect(cidadaoId).toBeGreaterThan(0);
    });

  });

  // ────────────────────────────────────────────────────────────────────────────
  // PAGINAÇÃO — suportada pelo backend
  // ────────────────────────────────────────────────────────────────────────────

  describe('Cenário: Filtro por paginação — listagem das próprias demandas', () => {

    it(
      'Given 5 denúncias cadastradas para o cidadão, When GET /demandas/demands com ?page=1&limit=2, Then retorna 2 registros e pagination.totalPages correto',
      async () => {
        const res = await request(app)
          .get('/demandas/demands?page=1&limit=2')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
        expect(res.body.pagination.limit).toBe(2);
        expect(res.body.pagination.page).toBe(1);
        // Math.ceil(5 / 2) = 3
        expect(res.body.pagination.totalPages).toBeGreaterThanOrEqual(3);
        expect(res.body.pagination.total).toBeGreaterThanOrEqual(5);
      }
    );

  });

  describe('Cenário: Página fora do range', () => {

    it(
      'Given denúncias cadastradas, When GET /demandas/demands com ?page=999, Then retorna array vazio',
      async () => {
        const res = await request(app)
          .get('/demandas/demands?page=999&limit=20')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(0);
        // total ainda reflete o count real — apenas a página está fora do range
        expect(res.body.pagination.total).toBeGreaterThanOrEqual(5);
      }
    );

  });

  describe('Cenário: Paginação no feed geral (GET /demandas/demands/feed)', () => {

    it(
      'Given 5+ denúncias no banco, When GET /demandas/demands/feed com ?page=1&limit=2, Then retorna 2 registros com pagination correto',
      async () => {
        const res = await request(app)
          .get('/demandas/demands/feed?page=1&limit=2')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
        expect(res.body.pagination.limit).toBe(2);
        expect(res.body.pagination.page).toBe(1);
        expect(res.body.pagination.totalPages).toBeGreaterThanOrEqual(3);
      }
    );

  });

  describe('Cenário: Paginação para gestor (GET /demandas/gestor/demands)', () => {

    it(
      'Given 5+ denúncias no banco, When gestor faz GET /demandas/gestor/demands com ?page=1&limit=2, Then retorna 2 registros',
      async () => {
        const res = await request(app)
          .get('/demandas/gestor/demands?page=1&limit=2')
          .set('Authorization', `Bearer ${tokenGestor}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
        expect(res.body.pagination.limit).toBe(2);
      }
    );

  });

  // ────────────────────────────────────────────────────────────────────────────
  // FILTROS AVANÇADOS — NÃO suportados pelo backend atual
  //
  // listAllDenuncias e listDenunciasByCidadao não aceitam query params de filtro.
  // Os testes abaixo documentam o comportamento esperado para quando o backend
  // implementar os query params (categoria, status, regiao, prioridade).
  // ────────────────────────────────────────────────────────────────────────────

  describe('Cenário: Filtro por categoria', () => {

    it.skip(
      // SKIP: listAllDenuncias ignora ?categoria — nenhum `where.categoria` é construído
      'Given denúncias de categorias diferentes, When GET /demandas/demands/feed com ?categoria=ILUMINACAO_PUBLICA, Then retorna apenas da categoria filtrada',
      async () => {
        const res = await request(app)
          .get('/demandas/demands/feed?categoria=ILUMINACAO_PUBLICA')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(
          res.body.data.every((d: { categoria: string }) => d.categoria === 'ILUMINACAO_PUBLICA')
        ).toBe(true);
      }
    );

  });

  describe('Cenário: Filtro por status', () => {

    it.skip(
      // SKIP: listAllDenuncias ignora ?status — nenhum `where.status` é construído
      'Given denúncias com status diferentes, When GET /demandas/demands/feed com ?status=ABERTA, Then retorna apenas as abertas',
      async () => {
        const res = await request(app)
          .get('/demandas/demands/feed?status=ABERTA')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(
          res.body.data.every((d: { status: string }) => d.status === 'ABERTA')
        ).toBe(true);
      }
    );

  });

  describe('Cenário: Filtro por região', () => {

    it.skip(
      // SKIP: listAllDenuncias ignora ?regiao — nenhum `where.regiao` é construído
      'Given denúncias de regiões diferentes, When GET /demandas/demands/feed com ?regiao=AGRESTE, Then retorna apenas do Agreste',
      async () => {
        const res = await request(app)
          .get('/demandas/demands/feed?regiao=AGRESTE')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(
          res.body.data.every((d: { regiao: string }) => d.regiao === 'AGRESTE')
        ).toBe(true);
      }
    );

  });

  describe('Cenário: Filtro por prioridade', () => {

    it.skip(
      // SKIP: listAllDenuncias ignora ?prioridade — nenhum `where.prioridade` é construído
      'Given denúncias com prioridades diferentes, When GET /demandas/demands/feed com ?prioridade=ALTA, Then retorna apenas as de prioridade alta',
      async () => {
        const res = await request(app)
          .get('/demandas/demands/feed?prioridade=ALTA')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(
          res.body.data.every((d: { prioridade: string }) => d.prioridade === 'ALTA')
        ).toBe(true);
      }
    );

  });

  describe('Cenário: Múltiplos filtros combinados', () => {

    it.skip(
      // SKIP: nenhum query param de filtro é suportado — query params extras são silenciosamente ignorados
      'Given denúncias variadas, When aplica categoria + status ao mesmo tempo, Then retorna apenas registros que atendem ambos os filtros',
      async () => {
        const res = await request(app)
          .get('/demandas/demands/feed?categoria=ILUMINACAO_PUBLICA&status=ABERTA')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(
          res.body.data.every(
            (d: { categoria: string; status: string }) =>
              d.categoria === 'ILUMINACAO_PUBLICA' && d.status === 'ABERTA'
          )
        ).toBe(true);
      }
    );

  });

  // ────────────────────────────────────────────────────────────────────────────
  // RESULTADO VAZIO — testável via cidadão sem demandas (sem depender de filtros)
  // ────────────────────────────────────────────────────────────────────────────

  describe('Cenário: Filtro sem resultados', () => {

    it(
      'Given cidadão sem demandas cadastradas, When GET /demandas/demands, Then retorna data vazio com total = 0',
      async () => {
        // Cidadão novo, sem nenhuma demanda criada
        const [novoRow] = await prisma.$queryRaw<{ id: number }[]>`
          INSERT INTO usuarios (nome, email, senha, papel)
          VALUES ('Sem Demandas TS04', 'ts04.semdemanda@test.com', 'hash', 'CIDADAO')
          ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome
          RETURNING id
        `;
        const tokenSemDemanda = jwt.sign({ userId: novoRow.id, papel: 'cidadao' }, SECRET);

        const res = await request(app)
          .get('/demandas/demands')
          .set('Authorization', `Bearer ${tokenSemDemanda}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(0);
        expect(res.body.pagination.total).toBe(0);

        // Cleanup do usuário auxiliar
        await prisma.cidadao.deleteMany({ where: { usuario_id: novoRow.id } });
        await prisma.$executeRawUnsafe(
          `DELETE FROM usuarios WHERE email = 'ts04.semdemanda@test.com'`
        );
      }
    );

    it.skip(
      // SKIP: para testar total=0 por filtro seria necessário ?categoria=X sem registros dessa categoria
      // Isso requer suporte a query params de filtro no backend
      'Given denúncias cadastradas, When aplica filtro que não corresponde a nenhum registro, Then retorna data vazio com total = 0',
      async () => {
        // Exemplo: combinação improvável de filtros que não deve ter resultado no seed
        const res = await request(app)
          .get('/demandas/demands/feed?categoria=FISCALIZACAO&status=EM_ANALISE&regiao=OUTRA')
          .set('Authorization', `Bearer ${tokenCidadao}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(0);
        expect(res.body.pagination.total).toBe(0);
      }
    );

  });

});
