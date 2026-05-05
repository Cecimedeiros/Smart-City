import { DemandFilters as DemandFiltersType } from "@/types/demand";
import { Select } from "./Select";
import { Button } from "./Button";

interface DemandFiltersProps {
  filters: DemandFiltersType;                                    
  onFilterChange: (key: keyof DemandFiltersType, value: string) => void; 
  onApplyFilters: () => void;                                
  onResetFilters: () => void;                                  
}

export function DemandFilters({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
}: DemandFiltersProps) {
  return (
    <section className="mb-8">
    
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
        Filtros
      </h3>
      
      <div className="flex gap-3 items-end bg-gray-50 p-4 rounded-xl border border-gray-200">
        
        <div className="flex-1 min-w-[120px]">
          <Select
            label="Status"
            options={[
              { value: "", label: "Todos" },
              { value: "Aberta", label: "Aberta" },
              { value: "Em análise", label: "Em Análise" },
              { value: "Resolvida", label: "Resolvida" },
            ]}
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
          />
        </div>

        <div className="flex-1 min-w-[120px]">
          <Select
            label="Categoria"
            options={[
              { value: "", label: "Todas" },
              { value: "Iluminação Pública", label: "Iluminação Pública" },
              { value: "Manutenção de vias", label: "Manutenção de vias" },
              { value: "Saneamento", label: "Saneamento" },
              { value: "Coleta de lixo", label: "Coleta de lixo" },
              { value: "Fiscalização", label: "Fiscalização" },
              { value: "Segurança", label: "Segurança" },
              { value: "Sinalização de Trânsito", label: "Sinalização de Trânsito" },
              { value: "Outros Empecilhos", label: "Outros Empecilhos" },
            ]}
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
          />
        </div>

        <div className="flex-1 min-w-[120px]">
          <Select
            label="Região"
            options={[
              { value: "", label: "Todas" },
              { value: "Região Metropolitana do Recife", label: "RMR" },
              { value: "Zona da Mata", label: "Zona da Mata" },
              { value: "Agreste", label: "Agreste" },
              { value: "Sertão", label: "Sertão" },
              { value: "Outra", label: "Outra" },
            ]}
            value={filters.region}
            onChange={(e) => onFilterChange("region", e.target.value)}
          />
        </div>

        <div className="flex-1 min-w-[120px]">
          <Select
            label="Prioridade"
            options={[
              { value: "", label: "Todas" },
              { value: "Alta", label: "Alta" },
              { value: "Media", label: "Média" },
              { value: "Baixa", label: "Baixa" },
            ]}
            value={filters.priority}
            onChange={(e) => onFilterChange("priority", e.target.value)}
          />
        </div>

        <Button 
          variant="primary" 
          size="md"
          onClick={onApplyFilters}
          className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
        >
          Aplicar Filtro
        </Button>

        <Button 
          variant="secondary" 
          size="md"
          onClick={onResetFilters}
          className="whitespace-nowrap"
        >
          Limpar
        </Button>
      </div>
    </section>
  );
}