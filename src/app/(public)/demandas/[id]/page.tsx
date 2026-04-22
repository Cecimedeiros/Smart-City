'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDemandStore } from '@/stores/useDemandStore';
import { Button } from '@/components/UI/Button';
import { DemandDetails } from '@/components/UI/DemandDetails';
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function DemandDetailsCitizenPage() {
  const params = useParams();
  const router = useRouter();
  const demandId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof document === 'undefined') return;
    const referrer = document.referrer || '';
    if (referrer.includes('/gestor/')) {
      router.replace(`/gestor/demandas/${demandId}`);
    }
  }, [demandId, router]);

  const demand = useDemandStore((state) =>
    state.demands.find((d) => d.id === demandId)
  );

  const handleBack = () => {
    router.push('/telaUsuario');
  };

  if (!isMounted) return <div className="min-h-screen bg-neutral-100" />;

  if (!demand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Demanda não encontrada</p>
          <Button 
            onClick={handleBack} 
            variant="primary"
            className="cursor-pointer hover:shadow-lg transition-all active:scale-95"
          >
            Voltar às Denúncias
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100"> 
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-100 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <Link href="/">
          <h1 className="text-2xl font-bold text-purple-600 cursor-pointer hover:opacity-80 transition-all hover:scale-105 active:scale-95">
            Smart City
          </h1>
        </Link>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">Usuário</span>
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-red-500 cursor-pointer transition-colors font-semibold hover:underline"
          >
            Sair
          </Link>
        </div>
      </header>

      <div className="w-full h-64 bg-gradient-to-r from-indigo-700 via-purple-600 to-orange-500 flex items-center justify-center">
        <h2 className="text-white text-4xl font-bold text-center">Detalhes da Denúncia</h2>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="-mt-24 bg-white rounded-3xl shadow-xl p-6 md:p-10 relative z-10">
          
          <div className="flex justify-center mb-8">
            <Button 
              onClick={() => router.push('/demandas/nova')}
              variant="primary"
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95"
            >
              Criar Nova Solicitação
            </Button>
          </div>

          <DemandDetails
            demand={demand}
            onBack={handleBack}
            isManager ={false}
          />
        </div>
      </div>

      <div className="h-12" />
    </div>
  );
}