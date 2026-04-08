import { create } from "zustand";
import { Demand, DemandFilters, DemandStatus, DemandPriority } from "@/types/demand";
import { MOCK_DEMANDS } from '@/mocks/fake-data';

interface DemandStore {
  demands: Demand[];
  filters: DemandFilters;
  selectedDemand: Demand | null;
  isLoading: boolean; 
  error: string | null;
  addDemand: (newDemand: Demand) => void;
  getDemandById: (id: string) => Demand | undefined;
  setSelectedDemand: (demand: Demand | null) => void;
  updateDemandStatus: (id: string, newStatus: DemandStatus) => void;
  updateDemandPriority: (id: string, newPriority: DemandPriority) => void;
  fetchDemands: () => Promise<void>;
  
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
  isLoading: false,
  error: null,

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

  fetchDemands: async () => {
    set({ isLoading: true, error: null }); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const dados = MOCK_DEMANDS; 

      set({ demands: dados, isLoading: false }); 
    } catch (err) {
      set({ error: "Erro ao carregar demandas", isLoading: false });
    }
  }
}));