/*
 * auth-service — porta 3001
 *
 * Responsável por cadastro e login de usuários (cidadãos e gestores).
 * Gera tokens JWT consumidos pelos demais serviços do monorepo.
 *
 * Rotas expostas:
 *   POST /auth/register  — cadastro de novo usuário
 *   POST /auth/login     — autenticação, retorna JWT
 *
 * ─── Concorrência ────────────────────────────────────────────────────────────
 * Mecanismo : corrotinas assíncronas (Promises) via event loop do Node.js
 * Onde      : authService.ts › login() — Promise.all
 * Ganho     : verificação de senha (CPU) e consulta de papel no banco (I/O)
 *             rodam em paralelo, reduzindo ~20-50ms por requisição de login
 *
 * ─── Otimizações ─────────────────────────────────────────────────────────────
 * - bcrypt com custo 10: padrão da indústria (~100ms/hash), equilíbrio entre
 *   segurança contra brute-force e latência aceitável
 * - Login busca usuario sem include, depois só tabela cidadaos (não gestores),
 *   eliminando um JOIN desnecessário por requisição
 * - Mesma mensagem de erro para "usuário não existe" e "senha errada":
 *   previne enumeração de e-mails cadastrados (user enumeration attack)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`auth-service rodando na porta ${PORT}`));
