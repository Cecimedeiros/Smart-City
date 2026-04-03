"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDemandStore } from "@/stores/useDemandStore";
import { DemandFilters, DemandStatus, DemandPriority } from "@/types/demand";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { DemandDetails } from "@/components/UI/DemandDetails";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const demandId = params.id as string;

  const { getDemandById, updateDemandStatus, updateDemandPriority, filters, setFilters } =
    useDemandStore();

  const [demand, setDemand] = useState(getDemandById(demandId));
  const [localFilters, setLocalFilters] = useState<DemandFilters>(filters);

  useEffect(() => {
    const selectedDemand = getDemandById(demandId);
    setDemand(selectedDemand);
  }, [demandId, getDemandById]);

  const handleFilterChange = (key: keyof DemandFilters, value: string) => {
    setLocalFilters({ ...localFilters, [key]: value === "" ? "" : (value as any) });
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", localFilters);
  };

  const handleStatusChange = (newStatus: DemandStatus) => {
    updateDemandStatus(demandId, newStatus);
    setDemand(getDemandById(demandId));
  };

  const handlePriorityChange = (newPriority: DemandPriority) => {
    updateDemandPriority(demandId, newPriority);
    setDemand(getDemandById(demandId));
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
          <a href="/gestor/gestor" className="text-purple-600 font-bold mr-4 hover:text-purple-700">
            Gestão
          </a>
          <a href="/login" className="text-purple-400 font-normal hover:text-purple-500">
            Sair
          </a>
        </div>
      </nav>

      {/* Banner Hero com Gradiente */}
      <div className="w-full h-64 bg-linear-to-r from-[#4c1d95] via-[#d946ef] to-[#f97316] flex items-start justify-center pt-10">
        <h2 className="text-white text-4xl font-bold">Demandas</h2>
      </div>

      {/* Cartão Principal */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="-mt-24 bg-white rounded-3xl shadow-xl p-8 relative z-10">
          {/* Secção de Filtros */}
          <div className="mb-8 text-black">
            <h3 className="text-xl font-bold mb-4">Filtros</h3>
            <div className="flex gap-4 items-end">
              <Select
                label="Status"
                options={[
                  { value: "", label: "Todos" },
                  { value: "Aberta", label: "Aberta" },
                  { value: "Em_analise", label: "Em Análise" },
                  { value: "Resolvida", label: "Resolvida" },
                ]}
                value={localFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="flex-1"
              />

              <Select
                label="Categoria"
                options={[
                  { value: "", label: "Todas" },
                  { value: "Iluminação Pública", label: "Iluminação Pública" },
                  { value: "Manutenção de vias", label: "Manutenção de vias" },
                  { value: "Saneamento", label: "Saneamento" },
                  { value: "Coleta de lixo", label: "Coleta de lixo" },
                  { value: "Fiscalização", label: "Fiscalização" },
                  { value: "Segurança", label: "Segurança" },
                  { value: "Sinalização de Trânsito", label: "Sinalização de Trânsito" },
                  { value: "Outros Empecilhos", label: "Outros Empecilhos" },
                ]}
                value={localFilters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="flex-1"
              />

              <Select
                label="Região"
                options={[
                  { value: "", label: "Todas" },
                  { value: "Região Metropolitana do Recife", label: "Região Metropolitana do Recife" },
                  { value: "Zona da Mata", label: "Zona da Mata" },
                  { value: "Agreste", label: "Agreste" },
                  { value: "Sertão", label: "Sertão" },
                  { value: "Outra", label: "Outra" },
                ]}
                value={localFilters.region}
                onChange={(e) => handleFilterChange("region", e.target.value)}
                className="flex-1"
              />

              <Select
                label="Prioridade"
                options={[
                  { value: "", label: "Todas" },
                  { value: "Alta", label: "Alta" },
                  { value: "Media", label: "Média" },
                  { value: "Baixa", label: "Baixa" },
                ]}
                value={localFilters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
                className="flex-1"
              />

              <Button variant="primary" size="md" onClick={handleApplyFilters}>
                Aplicar Filtro
              </Button>
            </div>
          </div>

          {/* Componente de Detalhes da Demanda */}
          <DemandDetails
            demand={demand}
            onBack={handleBack}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
        </div>
      </div>

      {/* Espaço em branco no fundo */}
      <div className="h-12" />
    </div>
  );
}

