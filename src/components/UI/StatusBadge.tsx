import { DemandStatus } from "@/types/demand";

interface StatusBadgeProps {
  status: DemandStatus;    
  showLabel?: boolean;     
}

const statusConfig: Record<DemandStatus, { color: string; bgColor: string; label: string }> = {
  Aberta: { color: "text-red-600", bgColor: "bg-red-100", label: "Aberta" },
  "Em análise": { color: "text-amber-600", bgColor: "bg-amber-100", label: "Em Análise" },
  Resolvida: { color: "text-green-600", bgColor: "bg-green-100", label: "Resolvida" },
};

export function StatusBadge({ status, showLabel = true }: StatusBadgeProps) {
  
  const config = statusConfig[status] || statusConfig.Aberta;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor}`}>
     
      <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
      
      {showLabel && <span className={`text-xs font-semibold ${config.color}`}>{config.label}</span>}
    </div>
  );
}