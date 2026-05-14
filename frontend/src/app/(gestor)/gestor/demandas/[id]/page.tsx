'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDemandStore } from '@/stores/useDemandStore';
import { Button } from '@/components/UI/Button';
import { DemandDetails } from '@/components/UI/DemandDetails';
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function DemandDetailsManagerPage() {
  const params = useParams();
  const router = useRouter();
  const demandId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);

  const demand = useDemandStore((state) =>
    state.demands.find((d) => d.id === demandId)
  );
  const updateDemand = useDemandStore((state) => state.updateDemand);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBack = () => {
    router.push('/gestor/dashboard');
  };

  const handleStatusChange = (newStatus: string) => {
    if (demand) {
      updateDemand(demandId, { status: newStatus as any });
      console.log('Status atualizado na store:', newStatus);
    }
  };

  const handlePriorityChange = (newPriority: string) => {
    if (demand) {
      updateDemand(demandId, { priority: newPriority as any });
      console.log('Prioridade atualizada na store:', newPriority);
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  if (!demand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Demanda não encontrada</p>
          <Button 
            onClick={handleBack} 
            variant="primary"
            className="cursor-pointer hover:shadow-lg transition-all"
          >
            Voltar às Demandas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <Link href="/gestor/dashboard">
          <h1 className="text-2xl font-bold text-purple-600 cursor-pointer hover:scale-105 transition-transform active:scale-95">
            Smart City
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">Gestor</span>
          <Link 
            href="/" 
            className="text-sm font-semibold text-gray-600 hover:text-red-500 cursor-pointer transition-colors"
          >
            Sair
          </Link>
        </div>
      </nav>

      <div className="w-full h-72 bg-gradient-to-r from-indigo-700 via-purple-600 to-orange-500 flex items-center justify-center">
        <h2 className="text-white text-4xl font-bold text-center mt-10">Gerenciamento de Demanda</h2>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="-mt-24 bg-white rounded-3xl shadow-2xl p-6 md:p-10 relative z-10 mb-10">
          
          <div className="flex justify-between items-center mb-8 border-b pb-6 border-gray-100">
            <button 
              onClick={handleBack}
              className="text-purple-600 font-bold flex items-center gap-2 hover:text-purple-800 transition-all cursor-pointer group"
            >
            </button>
            <span className="text-gray-400 text-sm font-mono">ID: #{demandId}</span>
          </div>

          <DemandDetails
            demand={demand}
            onBack={handleBack}
            isManager={true}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />

        </div>
      </div>

      <div className="h-12" />
    </div>
  );
}