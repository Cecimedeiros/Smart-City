"use client";

import { useState } from "react";
import { Demand, DemandStatus, DemandPriority } from "@/types/demand";
import { Button } from "./Button";

// Props que o componente recebe
interface DemandDetailsProps {
  demand: Demand;                                    // Os dados da demanda
  onBack: () => void;                               // Função pra voltar
  isManager?: boolean;                              // True = gestor, False = cidadão
  onStatusChange?: (status: DemandStatus) => void;  // Callback quando gestor muda status
  onPriorityChange?: (priority: DemandPriority) => void; // Callback quando gestor muda prioridade
}

// Opções de status e prioridade nos dropdowns
const statusOptions: DemandStatus[] = ["Aberta", "Em análise", "Resolvida"];
const priorityOptions: DemandPriority[] = ["Alta", "Media", "Baixa"];

// Cores do indicador circular de status
const statusColors: Record<DemandStatus, string> = {
  Aberta: "bg-red-600",
  "Em análise": "bg-amber-500",
  Resolvida: "bg-green-600",
};

export function DemandDetails({
  demand,
  onBack,
  isManager = false,
  onStatusChange,
  onPriorityChange,
}: DemandDetailsProps) {
  // Estados pra controlar se tá editando status ou prioridade
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  
  // Valores temporários enquanto o gestor tá editando (antes de confirmar)
  const [tempStatus, setTempStatus] = useState(demand.status);
  const [tempPriority, setTempPriority] = useState(demand.priority);

  // Quando gestor clica em ✓ pra salvar status
  const handleStatusSave = () => {
    onStatusChange?.(tempStatus);        // Manda o novo status pro pai
    setIsEditingStatus(false);            // Fecha o modo edição
  };

  // Quando gestor clica em ✓ pra salvar prioridade
  const handlePrioritySave = () => {
    onPriorityChange?.(tempPriority);     // Manda a nova prioridade pro pai
    setIsEditingPriority(false);          // Fecha o modo edição
  };

  // Pega a cor correta baseado no status atual
  const statusColor = statusColors[demand.status as DemandStatus] || statusColors.Aberta;

  return (
    <div className="border border-gray-300 rounded-2xl p-8 mt-6 bg-white">
      
      {/* CABEÇALHO: Bolinha de cor + Título da demanda */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
        <div className={`w-6 h-6 rounded-full ${statusColor}`} />
        <h2 className="text-xl font-bold text-gray-800">{demand.problema}</h2>
      </div>

      {/* CONTEÚDO PRINCIPAL: 3 colunas (Foto, Metadados, Detalhes) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
        
        {/* COLUNA 1: Foto */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-700 mb-3">Foto:</p>
          <div className="bg-gray-200 rounded-lg h-40 w-full max-w-xs flex items-center justify-center text-gray-400 overflow-hidden">
            {demand.fotoUrl ? (
              <img src={demand.fotoUrl} alt={demand.problema} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm">Sem imagem</span>
            )}
          </div>
        </div>

        {/* COLUNA 2: Metadados (Categoria, Prioridade, Status, etc) */}
        <div className="flex flex-col gap-4 text-sm text-gray-800">
          
          {/* Campo: Categoria (só leitura) */}
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Categoria</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{demand.category}</p>
          </div>

          {/* Campo: Prioridade (editável pra gestor) */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Prioridade</span>
              
              {/* Ícone de edição (lápis) - só aparece pra gestor */}
              {isManager && !isEditingPriority && (
                <button
                  onClick={() => setIsEditingPriority(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Editar prioridade"
                >
                  {/* SVG do ícone de lápis */}
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Se tá editando: mostra dropdown + botões de salvar/cancelar */}
            {isEditingPriority ? (
              <div className="flex gap-2 items-center mt-2">
                {/* Dropdown pra escolher nova prioridade */}
                <select
                  value={tempPriority}
                  onChange={(e) => setTempPriority(e.target.value as DemandPriority)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {priorityOptions.map((p) => (
                    <option key={p} value={p}>
                      {p === "Media" ? "Média" : p}
                    </option>
                  ))}
                </select>
                
                {/* Botão ✓ pra salvar */}
                <button
                  onClick={handlePrioritySave}
                  className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                >
                  ✓
                </button>
                
                {/* Botão ✕ pra cancelar */}
                <button
                  onClick={() => {
                    setTempPriority(demand.priority);  // Volta pro valor original
                    setIsEditingPriority(false);
                  }}
                  className="px-2 py-1 bg-gray-300 text-gray-800 text-xs rounded hover:bg-gray-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              /* Se NÃO tá editando: mostra só o valor */
              <p className="text-sm font-semibold text-gray-700 mt-1">
                {demand.priority === "Media" ? "Média" : demand.priority}
              </p>
            )}
          </div>

          {/* Campo: Status (editável pra gestor) - MESMO PADRÃO DA PRIORIDADE */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Status</span>
              
              {/* Ícone de edição - só gestor */}
              {isManager && !isEditingStatus && (
                <button
                  onClick={() => setIsEditingStatus(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Editar status"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
            
            {isEditingStatus ? (
              <div className="flex gap-2 items-center mt-2">
                <select
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value as DemandStatus)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s === "Em análise" ? "Em Análise" : s}
                    </option>
                  ))}
                </select>
                <button onClick={handleStatusSave} className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors">✓</button>
                <button onClick={() => { setTempStatus(demand.status); setIsEditingStatus(false); }} className="px-2 py-1 bg-gray-300 text-gray-800 text-xs rounded hover:bg-gray-400 transition-colors">✕</button>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-700 mt-1">
                {demand.status === "Em análise" ? "Em Análise" : demand.status}
              </p>
            )}
          </div>

          {/* Campos só leitura: Endereço, Solicitante, Data */}
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Endereço</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{demand.endereco}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Solicitante</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{demand.solicitante}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Data e Horário de Registro</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{demand.dataRegistro}</p>
          </div>
        </div>

        {/* COLUNA 3: Detalhes (descrição completa) */}
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Detalhes:</p>
          <div className="bg-gray-100 rounded-lg p-4 min-h-56 text-sm text-gray-700 overflow-auto border border-gray-200">
            {demand.detalhes}
          </div>
        </div>
      </div>

      {/* RODAPÉ: Botões de ação */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        
        {/* Botão "Atualizar" - só aparece pra gestor */}
        {isManager ? (
          <Button variant="primary" size="md" className="bg-purple-600 hover:bg-purple-700">
            Atualizar
          </Button>
        ) : null}
        
        {/* Botão "Voltar" - aparece pra todos */}
        <button
          onClick={onBack}
          className="text-purple-600 text-sm font-semibold hover:text-purple-700 transition-colors"
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}