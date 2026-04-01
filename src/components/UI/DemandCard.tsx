import { Demand, DemandStatus, DemandPriority } from "@/types/demand";
import { Button } from "./Button";

interface DemandCardProps {
  demand: Demand;
  onViewDetails: (demandId: string) => void;
}

const statusConfig: Record<DemandStatus, { color: string; label: string }> = {
  aberta: { color: "bg-red-600", label: "Aberta" },
  em_analise: { color: "bg-amber-500", label: "Em Análise" },
  resolvida: { color: "bg-green-600", label: "Resolvida" },
};

const priorityLabel: Record<DemandPriority, string> = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

const categoryLabel: Record<string, string> = {
  infraestrutura: "Infraestrutura",
  saneamento: "Saneamento",
  outra: "Outra",
  iluminacao: "Iluminação",
  poda: "Poda",
};

export function DemandCard({ demand, onViewDetails }: DemandCardProps) {
  const statusConfig_ = statusConfig[demand.status];

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white hover:shadow-md transition-shadow">
      {/* Esquerda - Status e Título */}
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-4 h-4 rounded-full ${statusConfig_.color}`} />
        <h3 className="font-bold text-lg text-gray-800">{demand.title}</h3>
      </div>

      {/* Centro - Metadados */}
      <div className="flex-1 px-6">
        <div className="grid grid-cols-3 gap-6 text-xs text-gray-600">
          <div>
            <p className="font-semibold text-gray-700">Categoria</p>
            <p>{categoryLabel[demand.category] || demand.category}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Status</p>
            <p>{statusConfig_.label}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Prioridade</p>
            <p className="font-bold text-gray-800">{priorityLabel[demand.priority]}</p>
          </div>
        </div>
      </div>

      {/* Direita - Botão */}
      <Button
        variant="primary"
        size="sm"
        onClick={() => onViewDetails(demand.id)}
      >
        Ver Detalhes
      </Button>
    </div>
  );
}
