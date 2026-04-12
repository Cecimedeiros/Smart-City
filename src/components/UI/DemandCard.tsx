import { Demand, DemandStatus, DemandPriority } from "@/types/demand";
import { Button } from "./Button";

interface DemandCardProps {
  demand: Demand;
  onViewDetails: (demandId: string) => void;
}

const statusConfig: Record<DemandStatus, { color: string; label: string }> = {
  Aberta: { color: "bg-red-600", label: "Aberta" },
  "Em análise": { color: "bg-amber-500", label: "Em Análise" },
  Resolvida: { color: "bg-green-600", label: "Resolvida" },
};

const priorityLabel: Record<DemandPriority, string> = {
  Alta: "Alta",
  Media: "Média",
  Baixa: "Baixa",
};

const categoryLabel: Record<string, string> = {
  "Infraestrutura": "Infraestrutura",
  "Saneamento": "Saneamento",
  "Outra": "Outra",
  "Iluminação Pública": "Iluminação Pública",
  "Manutenção de vias": "Manutenção de vias",
  "Coleta de lixo": "Coleta de lixo",
  "Fiscalização": "Fiscalização",
  "Segurança": "Segurança",
  "Sinalização de Trânsito": "Sinalização de Trânsito",
  "Outros Empecilhos": "Outros Empecilhos",
};

export function DemandCard({ demand, onViewDetails }: DemandCardProps) {
  const normalizedStatus = demand.status === "Em_analise" ? "Em análise" : demand.status;
  const statusConfig_ = statusConfig[normalizedStatus as DemandStatus] ?? statusConfig.Aberta;
  const problemName = demand.problema ?? (demand as any).title ?? "Problema não informado";

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white hover:shadow-md transition-shadow">

      <div className="flex items-center gap-4 flex-1">
        <div className={`w-4 h-4 rounded-full ${statusConfig_.color}`} />
        <h3 className="font-bold text-lg text-gray-800">{problemName}</h3>
      </div>

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
