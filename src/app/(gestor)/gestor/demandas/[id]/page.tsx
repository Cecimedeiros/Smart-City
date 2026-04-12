"use client";

import { useParams, useRouter } from "next/navigation";
import { useDemandStore } from "@/stores/useDemandStore";
import { DemandStatus, DemandPriority } from "@/types/demand";
import { Button } from "@/components/UI/Button";
import { DemandDetails } from "@/components/UI/DemandDetails";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const demandId = params.id as string;

  const demand = useDemandStore((state) =>
    state.demands.find((d) => d.id === demandId)
  );
  const { updateDemandStatus, updateDemandPriority } = useDemandStore();

  const handleStatusChange = (newStatus: DemandStatus) => {
    updateDemandStatus(demandId, newStatus);
  };

  const handlePriorityChange = (newPriority: DemandPriority) => {
    updateDemandPriority(demandId, newPriority);
  };

  const handleBack = () => {
    router.push("/gestor/dashboard");
  };

  if (!demand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Demanda não encontrada</p>
          <Button onClick={handleBack}>Voltar ao Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600">Smart City</h1>
        <div className="flex items-center gap-4">
          <a href="/gestor/dashboard" className="text-purple-600 font-bold mr-4 hover:text-purple-700">
            Gestão
          </a>
          <a href="/login" className="text-purple-400 font-normal hover:text-purple-500">
            Sair
          </a>
        </div>
      </nav>

      <div className="w-full h-64 bg-linear-to-r from-[#4c1d95] via-[#d946ef] to-[#f97316] flex items-start justify-center pt-10">
        <h2 className="text-white text-4xl font-bold">Demandas</h2>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="-mt-24 bg-white rounded-3xl shadow-xl p-10 relative z-10">
          <DemandDetails
            demand={demand}
            onBack={handleBack}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
        </div>
      </div>

      
      <div className="h-12" />
    </div>
  );
}

