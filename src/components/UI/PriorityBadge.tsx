import { DemandPriority } from "@/types/demand";

interface PriorityBadgeProps {
  priority: DemandPriority;  // Qual prioridade mostrar
  showLabel?: boolean;       // Mostrar o texto ou só a bolinha
}

// Configuração de cores pra cada prioridade
const priorityConfig: Record<DemandPriority, { color: string; bgColor: string; label: string }> = {
  Alta: { color: "text-red-600", bgColor: "bg-red-100", label: "Alta" },
  Media: { color: "text-yellow-600", bgColor: "bg-yellow-100", label: "Média" },
  Baixa: { color: "text-green-600", bgColor: "bg-green-100", label: "Baixa" },
};

export function PriorityBadge({ priority, showLabel = true }: PriorityBadgeProps) {
  // Pega a configuração de cores da prioridade
  const config = priorityConfig[priority] || priorityConfig.Baixa;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor}`}>
      {/* Bolinha colorida */}
      <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
      
      {/* Texto (opcional) */}
      {showLabel && <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>}
    </div>
  );
}