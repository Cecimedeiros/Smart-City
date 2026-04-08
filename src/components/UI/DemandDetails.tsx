"use client";

import { useState } from "react";
import { Demand, DemandStatus, DemandPriority } from "@/types/demand";

interface DemandDetailsProps {
  demand: Demand;
  onBack: () => void;
  onStatusChange?: (status: DemandStatus) => void;
  onPriorityChange?: (priority: DemandPriority) => void;
}

const statusOptions: DemandStatus[] = ["Aberta", "Em_analise", "Resolvida"];
const priorityOptions: DemandPriority[] = ["Alta", "Media", "Baixa"];

const statusColors: Record<DemandStatus, string> = {
  Aberta: "bg-red-600",
  Em_analise: "bg-amber-500",
  Resolvida: "bg-green-600",
};

export function DemandDetails({
  demand,
  onBack,
  onStatusChange,
  onPriorityChange,
}: DemandDetailsProps) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [tempStatus, setTempStatus] = useState(demand.status);
  const [tempPriority, setTempPriority] = useState(demand.priority);

  const handleStatusSave = () => {
    onStatusChange?.(tempStatus);
    setIsEditingStatus(false);
  };

  const handlePrioritySave = () => {
    onPriorityChange?.(tempPriority);
    setIsEditingPriority(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mt-6 bg-white">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
        <div className="w-6 h-6 rounded-full bg-red-600" />
        <h2 className="text-xl font-bold text-gray-800">{demand.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-700 mb-2">Foto:</p>
          <div className="bg-gray-200 rounded-md h-40 w-full max-w-xs mb-4 flex items-center justify-center text-gray-400">
            {demand.fotoUrl ? (
              <img src={demand.fotoUrl} alt={demand.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <span>Sem imagem</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-800">
          <div>
            <p className="text-xs text-gray-500 font-semibold">Categoria</p>
            <p className="text-sm">{demand.category}</p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Prioridade</span>
              {!isEditingPriority && (
                <button
                  onClick={() => setIsEditingPriority(true)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ✏️
                </button>
              )}
            </div>
            {isEditingPriority ? (
              <div className="flex gap-2 items-center mt-2">
                <select
                  value={tempPriority}
                  onChange={(e) => setTempPriority(e.target.value as DemandPriority)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {priorityOptions.map((p) => (
                    <option key={p} value={p}>
                      {p === "Media" ? "Média" : p}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handlePrioritySave}
                  className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                >
                  ✓
                </button>
                <button
                  onClick={() => {
                    setTempPriority(demand.priority);
                    setIsEditingPriority(false);
                  }}
                  className="px-2 py-1 bg-gray-300 text-gray-800 text-xs rounded hover:bg-gray-400"
                >
                  ✕
                </button>
              </div>
            ) : (
              <p className="text-sm font-bold">{demand.priority === "Media" ? "Média" : demand.priority}</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Status</span>
              {!isEditingStatus && (
                <button
                  onClick={() => setIsEditingStatus(true)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  ✏️
                </button>
              )}
            </div>
            {isEditingStatus ? (
              <div className="flex gap-2 items-center mt-2">
                <select
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value as DemandStatus)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s === "Em_analise" ? "Em Análise" : s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleStatusSave}
                  className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                >
                  ✓
                </button>
                <button
                  onClick={() => {
                    setTempStatus(demand.status);
                    setIsEditingStatus(false);
                  }}
                  className="px-2 py-1 bg-gray-300 text-gray-800 text-xs rounded hover:bg-gray-400"
                >
                  ✕
                </button>
              </div>
            ) : (
              <p className="text-sm font-bold">{demand.status === "Em_analise" ? "Em Análise" : demand.status}</p>
            )}
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">Endereço</p>
            <p className="text-sm">{demand.endereco}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">Solicitante</p>
            <p className="text-sm">{demand.solicitante}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold">Data e horário de registro</p>
            <p className="text-sm">{demand.dataRegistro}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-800 mb-2">Detalhes:</p>
          <div className="bg-gray-200 rounded-md p-4 h-24 text-sm text-gray-700 overflow-auto">
            {demand.detalhes}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="text-purple-600 text-sm font-semibold hover:underline"
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}
