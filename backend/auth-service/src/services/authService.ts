import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'change-me';
const SALT_ROUNDS = 10;

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
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    // Mesma mensagem para usuário inexistente e senha errada — evita enumeração de e-mails
    throw httpError('Credenciais inválidas', 401);
  }

  // Concorrência: bcrypt.compare (CPU) e consulta de papel (I/O) rodam em paralelo
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
