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
  tipo: 'CIDADAO' | 'GESTOR' // Ajustado para bater com o Enum em caixa alta do Prisma
) {
  const hash = await bcrypt.hash(senha, SALT_ROUNDS);

  try {
    // Agora cria APENAS o usuário e salva o papel dele diretamente aqui
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hash,
        papel: tipo, 
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
    throw httpError('Credenciais inválidas', 401);
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw httpError('Credenciais inválidas', 401);
  }

  // Usamos "as any" temporariamente aqui para o TypeScript aceitar o campo papel
  // enquanto o banco de dados está sendo recriado do zero!
  const papelUsuario = (usuario as any).papel || 'CIDADAO';
  const role = papelUsuario.toLowerCase(); 
  
  const token = jwt.sign({ userId: usuario.id, role }, SECRET, { expiresIn: '24h' });

  return { token, role, userId: usuario.id, nome: usuario.nome };
}