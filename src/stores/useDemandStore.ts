import { create } from "zustand";
import { Demand, DemandFilters, DemandStatus, DemandPriority } from "@/types/demand";


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
    fotoUrl: "",
    endereco: "Parque da Macaxeira, Recife - PE",
    solicitante: "João Silva",
    dataRegistro: "15/03/2026 às 10:30",
    detalhes: "Grande quantidade de lixo acumulado na entrada do parque, atraindo animais e causando incômodo aos visitantes.",
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
    fotoUrl: "",
    endereco: "Rua Central, Bairro Vila",
    solicitante: "Maria Santos",
    dataRegistro: "20/03/2026 às 14:15",
    detalhes: "Poste com lâmpada queimada deixando a região sem iluminação durante a noite.",
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
    fotoUrl: "",
    endereco: "Parque Municipal, Av. Principal",
    solicitante: "Pedro Costa",
    dataRegistro: "18/03/2026 às 08:45",
    detalhes: "Árvore caída completamente bloqueando a passagem de pedestres e veículos.",
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
    fotoUrl: "",
    endereco: "Rua das Flores, nº 500",
    solicitante: "Ana Paula",
    dataRegistro: "19/03/2026 às 11:20",
    detalhes: "Cratera de grandes dimensões no meio da rua causando risco de acidentes.",
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
    fotoUrl: "",
    endereco: "Avenida Principal, próximo à Praça",
    solicitante: "Carlos Mendes",
    dataRegistro: "17/03/2026 às 09:00",
    detalhes: "Acúmulo de água na calçada dificultando a passagem de pedestres.",
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
    fotoUrl: "",
    endereco: "Avenida Brasil, nº 1200",
    solicitante: "Fabio Oliveira",
    dataRegistro: "16/03/2026 às 13:30",
    detalhes: "Semáforo completamente com defeito prejudicando o fluxo de trânsito.",
  },
];

interface DemandStore {
  demands: Demand[];
  filters: DemandFilters;
  selectedDemand: Demand | null;
  addDemand: (newDemand: Demand) => void;
  getDemandById: (id: string) => Demand | undefined;
  setSelectedDemand: (demand: Demand | null) => void;
  updateDemandStatus: (id: string, newStatus: DemandStatus) => void;
  updateDemandPriority: (id: string, newPriority: DemandPriority) => void;
  
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
  selectedDemand: null,

  addDemand: (newDemand: Demand) =>
    set((state) => ({
      demands: [newDemand, ...state.demands],
    })),

  getDemandById: (id: string) => {
    const state = get();
    return state.demands.find((demand) => demand.id === id);
  },

  setSelectedDemand: (demand: Demand | null) =>
    set({
      selectedDemand: demand,
    }),

  updateDemandStatus: (id: string, newStatus: DemandStatus) =>
    set((state) => ({
      demands: state.demands.map((demand) =>
        demand.id === id ? { ...demand, status: newStatus } : demand
      ),
      selectedDemand:
        state.selectedDemand?.id === id
          ? { ...state.selectedDemand, status: newStatus }
          : state.selectedDemand,
    })),

  updateDemandPriority: (id: string, newPriority: DemandPriority) =>
    set((state) => ({
      demands: state.demands.map((demand) =>
        demand.id === id ? { ...demand, priority: newPriority } : demand
      ),
      selectedDemand:
        state.selectedDemand?.id === id
          ? { ...state.selectedDemand, priority: newPriority }
          : state.selectedDemand,
    })),

  setFilters: (newFilters: Partial<DemandFilters>) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  getFilteredDemands: () => {
    const state = get();
    return state.demands.filter((demand) => {
      if (state.filters.status && demand.status.trim() !== state.filters.status.trim()) return false;
      if (state.filters.category && demand.category.trim() !== state.filters.category.trim()) return false;
      if (state.filters.region && demand.region.trim() !== state.filters.region.trim()) return false;
      if (state.filters.priority && demand.priority.trim() !== state.filters.priority.trim()) return false;
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