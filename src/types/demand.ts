export type DemandStatus = "aberta" | "em_analise" | "resolvida";
export type DemandCategory = "infraestrutura" | "saneamento" | "outra" | "iluminacao" | "poda";
export type DemandPriority = "alta" | "media" | "baixa";
export type DemandRegion = "norte" | "sul" | "leste" | "oeste";

export interface Demand {
  id: string;
  title: string;
  location: string;
  category: DemandCategory;
  status: DemandStatus;
  priority: DemandPriority;
  region: DemandRegion;
  description?: string;
  createdAt?: string;
}

export interface DemandFilters {
  status: DemandStatus | "";
  category: DemandCategory | "";
  region: DemandRegion | "";
  priority: DemandPriority | "";
}
