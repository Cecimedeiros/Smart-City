import { create } from "zustand";
import { Demand, DemandFilters } from "@/types/demand";

// 1. Aqui ficam seus dados de exemplo (os Mocks)
const MOCK_DEMANDS: Demand[] = [
 {
    id: "1",
    title: "Grande concentração de lixo",
    location: "Parque da Macaxeira",
    category: "Coleta de lixo",
    status: "Aberta",
    priority: "Alta",
    region: "Região Metropolitana do Recife",
    description: "Muito lixo na frente do parque",
    createdAt: "2026-03-15",
  },
  {
    id: "2",
    title: "Poste com a lâmpada queimada",
    location: "Bairro Vila",
    category: "Iluminação Pública",
    status: "Em_analise",
    priority: "Media",
    region: "Sertão",
    description: "Falta de iluminação em vários pontos",
    createdAt: "2026-03-20",
  },
  {
    id: "3",
    title: "Árvore caída",
    location: "Parque Municipal",
    category: "Outros Empecilhos",
    status: "Aberta",
    priority: "Alta",
    region: "Região Metropolitana do Recife",
    description: "Árvore caída bloqueando a passagem",
    createdAt: "2026-03-18",
  },
  {
    id: "4",
    title: "Cratera",
    location: "Rua das Flores",
    category: "Manutenção de vias",
    status: "Em_analise",
    priority: "Media",
    region: "Outra",
    description: "Buraco enorme do meio da rua",
    createdAt: "2026-03-19",
  },
  {
    id: "5",
    title: "Poça de água na calçada",
    location: "Avenida Principal",
    category: "Saneamento",
    status: "Aberta",
    priority: "Baixa",
    region: "Agreste",
    description: "Acúmulo de água prejudicando pedestres",
    createdAt: "2026-03-17",
  },
  {
    id: "6",
    title: "Semáforo com defeito",
    location: "Avenida Brasil",
    category: "Sinalização de Trânsito",
    status: "Em_analise",
    priority: "Alta",
    region: "Região Metropolitana do Recife",
    description: "Semáforo não está funcionando",
    createdAt: "2026-03-16",
  },

];

interface DemandStore {
  demands: Demand[];
  filters: DemandFilters;
  addDemand: (newDemand: Demand) => void; 
  
  setFilters: (filters: Partial<DemandFilters>) => void;
  resetFilters: () => void;
  getFilteredDemands: () => Demand[];
  getDemandStats: () => {
    total: number;
    byCategory: Record<string, number>;
    byRegion: Record<string, number>;
  };
}

const defaultFilters: DemandFilters = {
  status: "",
  category: "",
  region: "",
  priority: "",
};

export const useDemandStore = create<DemandStore>((set, get) => ({
  demands: MOCK_DEMANDS,
  filters: defaultFilters,

  addDemand: (newDemand: Demand) =>
    set((state) => ({
      demands: [newDemand, ...state.demands],
    })),

  setFilters: (newFilters: Partial<DemandFilters>) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  getFilteredDemands: () => {
    const state = get();
    return state.demands.filter((demand) => {
      if (state.filters.status && demand.status !== state.filters.status) return false;
      if (state.filters.category && demand.category !== state.filters.category) return false;
      if (state.filters.region && demand.region !== state.filters.region) return false;
      if (state.filters.priority && demand.priority !== state.filters.priority) return false;
      return true;
    });
  },

  getDemandStats: () => {
    const state = get();
    const demands = state.demands;
    const total = demands.length;

    const byCategory: Record<string, number> = {};
    const byRegion: Record<string, number> = {};

    demands.forEach((demand) => {
      byCategory[demand.category] = (byCategory[demand.category] || 0) + 1;
      byRegion[demand.region] = (byRegion[demand.region] || 0) + 1;
    });

    return { total, byCategory, byRegion };
  },
}));