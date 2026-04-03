export type DemandStatus = "Aberta" | "Em_analise" | "Resolvida";
export type DemandCategory = "Iluminação Pública" | "Manutenção de vias" | "Saneamento" | "Coleta de lixo" | "Fiscalização" | "Segurança" | "Sinalização de Trânsito" | "Outros Empecilhos";
export type DemandPriority = "Alta" | "Media" | "Baixa";
export type DemandRegion = "Região Metropolitana do Recife" | "Zona da Mata" | "Agreste" | "Sertão" | "Outra";

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
  fotoUrl?: string;
  endereco: string;
  solicitante: string;
  dataRegistro: string;
  detalhes: string;
}

export interface DemandFilters {
  status: DemandStatus | "";
  category: DemandCategory | "";
  region: DemandRegion | "";
  priority: DemandPriority | "";
}
