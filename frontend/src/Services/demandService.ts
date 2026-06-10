import { apiFetch, DEMAND_API_URL } from '@/lib/api';
import {
  ApiDenuncia,
  buildCreatePayload,
  mapDenunciaFromApi,
  mapDenunciasFromApi,
  mapStatusToApi,
} from '@/utils/demandMapper';
import { Demand, DemandCategory, DemandPriority, DemandRegion, DemandStatus } from '@/types/demand';

interface PaginatedResponse<T> {
  data: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export const demandService = {
  async getMyDemands(token?: string, solicitante = ''): Promise<Demand[]> {
    const res = await apiFetch<PaginatedResponse<ApiDenuncia>>(
      DEMAND_API_URL,
      '/demands/feed?page=1&limit=100',
      { token }
    );
    return mapDenunciasFromApi(res.data, solicitante);
  },

  async getAllForGestor(token?: string): Promise<Demand[]> {
    const res = await apiFetch<PaginatedResponse<ApiDenuncia>>(
      DEMAND_API_URL,
      '/gestor/demands?page=1&limit=100', 
      { token }
    );
    return mapDenunciasFromApi(res.data);
  },

  async getById(token?: string, id?: string, solicitante = ''): Promise<Demand> {
    const data = await apiFetch<ApiDenuncia>(DEMAND_API_URL, `/demands/${id}`, { token });
    return mapDenunciaFromApi(data, solicitante);
  },

  async getByIdForGestor(token?: string, id?: string): Promise<Demand> {
    const data = await apiFetch<ApiDenuncia>(DEMAND_API_URL, `/gestor/demands/${id}`, { token });
    return mapDenunciaFromApi(data);
  },

  async create(
    token?: string,
    input?: {
      titulo: string;
      categoria: DemandCategory;
      regiao: DemandRegion;
      descricao: string;
      endereco: string;
      prioridade?: DemandPriority;
    },
    solicitante = ''
  ): Promise<Demand> {
    const payload = buildCreatePayload(input!);
    const data = await apiFetch<ApiDenuncia>(DEMAND_API_URL, '/demands', {
      method: 'POST',
      token,
      body: JSON.stringify(payload),
    });
    return mapDenunciaFromApi(data, solicitante);
  },

  async updateStatus(token?: string, id?: string, status?: DemandStatus): Promise<Demand> {
    const result = await apiFetch<{ denuncia: ApiDenuncia }>(
      DEMAND_API_URL,
      `/demands/${id}/status`,
      {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status: mapStatusToApi(status!) }),
      }
    );
    return mapDenunciaFromApi(result.denuncia);
  },
};