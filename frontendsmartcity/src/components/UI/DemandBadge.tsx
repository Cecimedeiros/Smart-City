import { DemandPriority } from "@/types/demand";

interface DemandBadgeProps {
  priority: DemandPriority;
  showLabel?: boolean;
}

const colorMap: Record<DemandPriority, string> = {
  Alta: "bg-red-500",
  Media: "bg-yellow-400",
  Baixa: "bg-green-500",
};

const labelMap: Record<DemandPriority, string> = {
  Alta: "Alta",
  Media: "Média",
  Baixa: "Baixa",
};

export default function DemandBadge({ priority, showLabel = false }: DemandBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded-full ${colorMap[priority]} shadow-sm flex-shrink-0`}
        title={`Prioridade: ${labelMap[priority]}`}
      />
      {showLabel && (
        <span className="text-sm font-medium text-gray-700">
          {labelMap[priority]}
        </span>
      )}
    </div>
  );
}
