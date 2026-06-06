import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Demand, DemandFilters, DemandStatus, DemandPriority } from "@/types/demand";
import { demandService } from "@/Services/demandService";
import { authService } from "@/Services/authService";
import { metricsService } from "@/Services/metricsService";
import { ApiError } from "@/lib/api";

interface DemandStore {
  demands: Demand[];
  token: string | null;
  role: "cidadao" | "gestor" | null;
  userEmail: string | null;
  userName: string | null;
  filters: DemandFilters;
  selectedDemand: Demand | null;
  isLoading: boolean;
  error: string | null;
  apiMetrics: { total: number; byCategory: Record<string, number>; byRegion: Record<string, number> } | null;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (email: string, senha: string, expectedRole?: "cidadao" | "gestor") => Promise<void>;
  logout: () => void;
  addDemand: (newDemand: Demand) => void;
  updateDemand: (id: string, updates: Partial<Demand>) => void;
  getDemandById: (id: string) => Demand | undefined;
  setSelectedDemand: (demand: Demand | null) => void;
  updateDemandStatus: (id: string, newStatus: DemandStatus) => Promise<void>;
  fetchDemands: () => Promise<void>;
  fetchMetrics: () => Promise<void>;
  fetchDemandById: (id: string) => Promise<Demand | null>;
  createDemand: (input: {
    titulo: string;
    categoria: Demand["category"];
    regiao: Demand["region"];
    descricao: string;
    endereco: string;
    prioridade?: DemandPriority;
  }) => Promise<Demand>;
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
      token: null,
      role: null,
      userEmail: null,
      userName: null,
      filters: defaultFilters,
      selectedDemand: null,
      isLoading: false,
      error: null,
      apiMetrics: null,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      login: async (email, senha, expectedRole) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authService.login(email, senha);

          if (expectedRole && result.papel !== expectedRole) {
            throw new ApiError(
              expectedRole === "gestor"
                ? "Esta conta não possui perfil de gestor"
                : "Esta conta não possui perfil de cidadão",
              403
            );
          }

          set({
            token: result.token,
            role: result.papel,
            userEmail: email,
            userName: result.nome,
            isLoading: false,
            error: null,
          });
        } catch (err) {
          const message =
            err instanceof ApiError ? err.message : "Erro ao fazer login";
          set({ isLoading: false, error: message });
          throw err;
        }
      },

      logout: () =>
        set({
          token: null,
          role: null,
          userEmail: null,
          userName: null,
          demands: [],
          selectedDemand: null,
          error: null,
          apiMetrics: null,
        }),

      addDemand: (newDemand) =>
        set((state) => ({
          demands: [newDemand, ...state.demands],
        })),

      updateDemand: (id, updates) =>
        set((state) => ({
          demands: state.demands.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
          selectedDemand:
            state.selectedDemand?.id === id
              ? { ...state.selectedDemand, ...updates }
              : state.selectedDemand,
        })),

      getDemandById: (id) => get().demands.find((d) => d.id === id),

      setSelectedDemand: (demand) => set({ selectedDemand: demand }),

      updateDemandStatus: async (id, newStatus) => {
        const { token, role } = get();
        if (!token) throw new ApiError("Usuário não autenticado", 401);

        const updated = await demandService.updateStatus(token, id, newStatus);
        get().updateDemand(id, { status: updated.status });
        if (role === "gestor") {
          await get().fetchMetrics();
        }
      },

      setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),

      resetFilters: () => set({ filters: defaultFilters }),

      getFilteredDemands: () => {
        const { demands, filters } = get();
        return demands.filter((d) => {
          if (filters.status && d.status !== filters.status) return false;
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
        const { token, role, userName } = get();
        if (!token || !role) {
          set({ error: "Faça login para visualizar suas denúncias" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const demands =
            role === "gestor"
              ? await demandService.getAllForGestor(token)
              : await demandService.getMyDemands(token, userName ?? "");

          set({ demands, isLoading: false });
        } catch (err) {
          const message =
            err instanceof ApiError ? err.message : "Erro ao carregar denúncias";
          set({ error: message, isLoading: false });
        }
      },

      fetchMetrics: async () => {
        const { token, role } = get();
        if (!token || role !== "gestor") return;

        try {
          const apiMetrics = await metricsService.getKpis(token);
          set({ apiMetrics });
        } catch {
          set({ apiMetrics: null });
        }
      },

      fetchDemandById: async (id) => {
        const { token, role, userName } = get();
        if (!token || !role) return null;

        set({ isLoading: true, error: null });
        try {
          const demand =
            role === "gestor"
              ? await demandService.getByIdForGestor(token, id)
              : await demandService.getById(token, id, userName ?? "");

          set((state) => ({
            demands: state.demands.some((d) => d.id === id)
              ? state.demands.map((d) => (d.id === id ? demand : d))
              : [demand, ...state.demands],
            selectedDemand: demand,
            isLoading: false,
          }));

          return demand;
        } catch (err) {
          const message =
            err instanceof ApiError ? err.message : "Erro ao carregar denúncia";
          set({ error: message, isLoading: false });
          return null;
        }
      },

      createDemand: async (input) => {
        const { token, userName } = get();
        if (!token) throw new ApiError("Usuário não autenticado", 401);

        const demand = await demandService.create(
          token,
          input,
          userName ?? get().userEmail ?? ""
        );
        get().addDemand(demand);
        return demand;
      },
    }),
    {
      name: "smart-city-storage-v2",
      storage: createJSONStorage(() => localStorage), 
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        token: state.token,
        role: state.role,
        userEmail: state.userEmail,
        userName: state.userName,
      }),
    }
  )
);
