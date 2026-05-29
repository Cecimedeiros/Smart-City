import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'change-me';

/*
 * Otimização: custo 10 é o padrão da indústria — gera ~100ms por hash,
 * equilibrando segurança contra brute-force e tempo de resposta aceitável.
 * Subir para 12+ dobra o tempo a cada incremento; não vale a pena sem HTTPS/rate-limit.
 */
const SALT_ROUNDS = 10;

// Evita repetir o mesmo padrão de erro em toda função
function httpError(mensagem: string, status: number): Error & { status: number } {
  const err = new Error(mensagem) as Error & { status: number };
  err.status = status;
  return err;
}

export async function register(
  nome: string,
  email: string,
  senha: string,
  tipo: 'cidadao' | 'gestor'
) {
  const hash = await bcrypt.hash(senha, SALT_ROUNDS);

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hash,
        ...(tipo === 'cidadao'
          ? { cidadao: { create: {} } }
          : { gestor: { create: {} } }),
      },
    });

    return { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw httpError('E-mail já cadastrado', 409);
    }
    throw err;
  }
}

export async function login(email: string, senha: string) {
  // Busca sem include — traz só a linha de usuarios, sem JOINs desnecessários
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    // Mesma mensagem para "usuário não existe" e "senha errada" —
    // evita que alguém descubra quais e-mails estão cadastrados pelo retorno da API
    throw httpError('Credenciais inválidas', 401);
  }

  /*
   * CONCORRÊNCIA — Promise.all com corrotinas assíncronas
   *
   * Mecanismo : corrotinas (Promises) gerenciadas pelo event loop do Node.js
   * Componente: auth-service › src/services/authService.ts › função login()
   *
   * O que acontece aqui:
   *   - bcrypt.compare é CPU-bound: ocupa o thread principal por ~100ms
   *   - prisma.cidadao.findUnique é I/O-bound: aguarda resposta do banco
   *
   * Sem Promise.all, uma operação esperaria a outra terminar (sequencial).
   * Com Promise.all, as duas disparam ao mesmo tempo — o event loop alterna
   * entre elas enquanto cada uma aguarda seu recurso, reduzindo o tempo total
   * de resposta do login em ~20-50ms por requisição.
   *
   * Otimização adicional: buscamos só a tabela cidadaos (não gestores).
   * Se cidadao for null, o papel é gestor — uma query a menos por login.
   */
  const [senhaValida, cidadao] = await Promise.all([
    bcrypt.compare(senha, usuario.senha),
    prisma.cidadao.findUnique({ where: { usuario_id: usuario.id } }),
  ]);

  if (!senhaValida) {
    throw httpError('Credenciais inválidas', 401);
  }

  const role = cidadao ? 'cidadao' : 'gestor';
  const token = jwt.sign({ userId: usuario.id, role }, SECRET, { expiresIn: '24h' });

  return { token, role, userId: usuario.id, nome: usuario.nome };
}
