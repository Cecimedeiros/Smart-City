import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Cria a tabela `usuarios` em db_demand para testes locais.
// Em produção, `usuarios` vive em db_auth (auth-service). O demand-service
// apenas armazena o `usuario_id` como inteiro em `cidadaos` e `gestores`
// (sem FK cross-database). Esta tabela local satisfaz a necessidade dos
// testes de gerar IDs reais e isolar o estado entre suítes.
export async function setup() {
  const prisma = new PrismaClient();
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS usuarios (
      id     SERIAL PRIMARY KEY,
      nome   VARCHAR(100) NOT NULL,
      email  VARCHAR(100) UNIQUE NOT NULL,
      senha  TEXT         NOT NULL,
      papel  VARCHAR(20)  NOT NULL
    )
  `;
  await prisma.$disconnect();
}
