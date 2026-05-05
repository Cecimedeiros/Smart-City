import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Demand, DemandFilters, DemandStatus, DemandPriority } from "@/types/demand";
import { MOCK_DEMANDS } from '@/mocks/fake-data';

const normalizeStatus = (status: string): DemandStatus => {
  const s = String(status).trim();
  if (s === "Em análise" || s === "Aberta" || s === "Resolvida") return s;
  return "Aberta";
};

const normalizeDemands = (items: any[]): Demand[] => {
  return items.map((item) => ({
    ...item,
    status: normalizeStatus(item.status),
    problema: item.problema ?? item.title ?? "Problema não informado",
  }));
};

interface DemandStore {
  demands: Demand[];
  userEmail: string | null; 
  filters: DemandFilters;
  selectedDemand: Demand | null;
  isLoading: boolean; 
  error: string | null;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (email: string) => void; 
  logout: () => void; 
  addDemand: (newDemand: Demand) => void;
  deleteDemand: (id: string) => void; 
  updateDemand: (id: string, updates: Partial<Demand>) => void;
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

export const useDemandStore = create<DemandStore>()(
  persist(
    (set, get) => ({
      demands: [], 
      userEmail: null, 
      filters: defaultFilters,
      selectedDemand: null,
      isLoading: false,
      error: null,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      // Implementação das funções de Auth
      login: (email) => set({ userEmail: email }),
      logout: () => set({ userEmail: null }),

      addDemand: (newDemand: Demand) =>
        set((state) => ({
          demands: [newDemand, ...state.demands],
        })),

      deleteDemand: (id: string) =>
        set((state) => ({
          demands: state.demands.filter((d) => d.id !== id),
        })),

      updateDemand: (id, updates) =>
        set((state) => ({
          demands: state.demands.map((d) => 
            d.id === id ? { ...d, ...updates } : d
          ),
          selectedDemand: state.selectedDemand?.id === id 
            ? { ...state.selectedDemand, ...updates } 
            : state.selectedDemand,
        })),

      getDemandById: (id: string) => get().demands.find((d) => d.id === id),

      setSelectedDemand: (demand: Demand | null) => set({ selectedDemand: demand }),

      updateDemandStatus: (id: string, newStatus: DemandStatus) =>
        get().updateDemand(id, { status: newStatus }),

      updateDemandPriority: (id: string, newPriority: DemandPriority) =>
        get().updateDemand(id, { priority: newPriority }),

      setFilters: (newFilters: Partial<DemandFilters>) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),

      resetFilters: () => set({ filters: defaultFilters }),

      getFilteredDemands: () => {
        const { demands, filters } = get();
        return demands.filter((d) => {
          if (filters.status && normalizeStatus(d.status) !== normalizeStatus(filters.status)) return false;
          if (filters.category && d.category !== filters.category) return false;
          if (filters.region && d.region !== filters.region) return false;
          if (filters.priority && d.priority !== filters.priority) return false;
          return true;
        });
      },

      getDemandStats: () => {
        const demands = get().getFilteredDemands();
        const byCategory: Record<string, number> = {};
        const byRegion: Record<string, number> = {};
        demands.forEach((d) => {
          byCategory[d.category] = (byCategory[d.category] || 0) + 1;
          byRegion[d.region] = (byRegion[d.region] || 0) + 1;
        });
        return { total: demands.length, byCategory, byRegion };
      },

      fetchDemands: async () => {
        set({ isLoading: true });
        try {
          await new Promise((r) => setTimeout(r, 300));
          const mocks = normalizeDemands(MOCK_DEMANDS);
          
          set((state) => {
            const currentIds = new Set(state.demands.map(d => d.id));
            const uniqueMocks = mocks.filter(m => !currentIds.has(m.id));
            return { 
              demands: [...state.demands, ...uniqueMocks], 
              isLoading: false 
            };
          });
        } catch (err) {
          set({ error: "Erro ao carregar", isLoading: false });
        }
      },
    }),
    {
      name: "smart-city-storage-v1",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      
      partialize: (state) => ({ 
        demands: state.demands,
        userEmail: state.userEmail 
      }),
    }
  )
);