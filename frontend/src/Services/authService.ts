import { apiFetch, AUTH_API_URL } from '@/lib/api';

export interface AuthResponse {
  token: string;
  role: 'cidadao' | 'gestor';
  userId: number;
  nome: string;
}

export interface RegisterResponse {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

export const authService = {
  async login(email: string, senha: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(AUTH_API_URL, '/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
  },

  async register(
    nome: string,
    email: string,
    senha: string,
    tipo: 'cidadao' | 'gestor'
  ): Promise<RegisterResponse> {
    return apiFetch<RegisterResponse>(AUTH_API_URL, '/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha, tipo }),
    });
  },
};
