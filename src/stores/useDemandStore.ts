import { create } from "zustand";
import { Demand, DemandFilters, DemandStatus, DemandCategory, DemandPriority, DemandRegion } from "@/types/demand";

// Mock data com demandas simuladas
const MOCK_DEMANDS: Demand[] = [
  {
    id: "1",
    title: "Buraco na via - Centro",
    location: "Centro",
    category: "infraestrutura",
    status: "aberta",
    priority: "alta",
    region: "norte",
    description: "Buraco grande na via principal",
    createdAt: "2026-03-15",
  },
  {
    id: "2",
    title: "Iluminação deficiente",
    location: "Bairro Vila",
    category: "iluminacao",
    status: "em_analise",
    priority: "media",
    region: "sul",
    description: "Falta de iluminação em vários pontos",
    createdAt: "2026-03-20",
  },
  {
    id: "3",
    title: "Árvore caída",
    location: "Parque Municipal",
    category: "poda",
    status: "aberta",
    priority: "alta",
    region: "leste",
    description: "Árvore caída bloqueando a passagem",
    createdAt: "2026-03-18",
  },
  {
    id: "4",
    title: "Fuga de água",
    location: "Rua das Flores",
    category: "saneamento",
    status: "em_analise",
    priority: "media",
    region: "oeste",
    description: "Vazamento de água na tubulação principal",
    createdAt: "2026-03-19",
  },
  {
    id: "5",
    title: "Poça de água na calçada",
    location: "Avenida Principal",
    category: "saneamento",
    status: "aberta",
    priority: "baixa",
    region: "norte",
    description: "Acúmulo de água prejudicando pedestres",
    createdAt: "2026-03-17",
  },
  {
    id: "6",
    title: "Semáforo com defeito",
    location: "Avenida Brasil",
    category: "infraestrutura",
    status: "em_analise",
    priority: "alta",
    region: "sul",
    description: "Semáforo não está funcionando",
    createdAt: "2026-03-16",
  },
];

interface DemandStore {
  demands: Demand[];
  filters: DemandFilters;
  setFilters: (filters: Partial<DemandFilters>) => void;
  resetFilters: () => void;
  getFilteredDemands: () => Demand[];
  getDemandStats: () => {
    total: number;
    byCategory: Record<DemandCategory, number>;
    byRegion: Record<DemandRegion, number>;
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

  setFilters: (newFilters: Partial<DemandFilters>) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  resetFilters: () =>
    set({
      filters: defaultFilters,
    }),

  getFilteredDemands: () => {
    const state = get();
    return state.demands.filter((demand) => {
      if (state.filters.status && demand.status !== state.filters.status)
        return false;
      if (state.filters.category && demand.category !== state.filters.category)
        return false;
      if (state.filters.region && demand.region !== state.filters.region)
        return false;
      if (state.filters.priority && demand.priority !== state.filters.priority)
        return false;
      return true;
    });
  },

  getDemandStats: () => {
    const state = get();
    const demands = state.demands;

    const total = demands.length;

    const byCategory: Record<string, number> = {
      infraestrutura: 0,
      saneamento: 0,
      outra: 0,
      iluminacao: 0,
      poda: 0,
    };

    const byRegion: Record<string, number> = {
      norte: 0,
      sul: 0,
      leste: 0,
      oeste: 0,
    };

    demands.forEach((demand) => {
      byCategory[demand.category]++;
      byRegion[demand.region]++;
    });

    return { total, byCategory, byRegion };
  },
}));
