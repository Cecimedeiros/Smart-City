'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDemandStore } from '@/stores/useDemandStore';
import { Button } from '@/components/UI/Button';
import { DemandDetails } from '@/components/UI/DemandDetails';
import { useState } from 'react';

// Página de detalhes da demanda para GESTOR (com capacidade de edição)
export default function DemandDetailsManagerPage() {

  const params = useParams();
  const router = useRouter();
  const demandId = params.id as string;

  // Pega a demanda do store pelo ID da URL
  const demand = useDemandStore((state) =>
    state.demands.find((d) => d.id === demandId)
  );

  // Volta para o dashboard do gestor
  const handleBack = () => {
    router.push('/gestor/dashboard');
  };

  // Callback quando o gestor clica em "Atualizar"
  const handleUpdateDemand = () => {
    // TODO: Implementar lógica de atualização da demanda
    console.log('Demanda atualizada:', demandId);
  };

  // Callback quando o status é alterado
  const handleStatusChange = (newStatus: string) => {
    // TODO: Implementar lógica de mudança de status
    console.log('Status alterado para:', newStatus);
  };

  // Callback quando a prioridade é alterada
  const handlePriorityChange = (newPriority: string) => {
    // TODO: Implementar lógica de mudança de prioridade
    console.log('Prioridade alterada para:', newPriority);
  };

  // Se a demanda não existir, mostra erro
  if (!demand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Demanda não encontrada</p>
          <Button onClick={handleBack} variant="primary">
            Voltar às Demandas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR: Header com logo e info do gestor */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Smart City</h1>
        <div className="flex items-center gap-4">
          <span className="text-purple-600 font-semibold">Gestor</span>
          <a href="#" className="text-purple-600 hover:text-purple-700">
            Sair
          </a>
        </div>
      </nav>

      {/* BANNER: Gradiente com título da seção */}
      <div className="w-full h-64 bg-gradient-to-r from-indigo-700 via-purple-600 to-orange-500 flex items-center justify-center">
        <h2 className="text-white text-4xl font-bold text-center">Demandas</h2>
      </div>

      {/* CARD PRINCIPAL: Contém botão, filtros e detalhes da demanda */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="-mt-24 bg-white rounded-3xl shadow-xl p-10 relative z-10">
          
          {/* DETALHES DA DEMANDA: Componente com layout 3 colunas e capacidade de edição */}
          <DemandDetails
            demand={demand}
            onBack={handleBack}
            isManager={true}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />


        </div>
      </div>

      {/* Espaço vazio no rodapé */}
      <div className="h-12" />
    </div>
  );
}