"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemandStore } from "@/stores/useDemandStore";
import { DemandFilters } from "@/types/demand";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { DemandCard } from "@/components/UI/DemandCard";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { filters, setFilters, resetFilters, getFilteredDemands, getDemandStats, fetchDemands, isLoading } =
    useDemandStore();
  const filteredDemands = getFilteredDemands();
  const stats = getDemandStats();
  const [selectedDemandId, setSelectedDemandId] = useState<string | null>(null);
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    fetchDemands();
  }, [fetchDemands]);

  // keep local tempFilters in sync when store filters change (e.g., reset)
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof DemandFilters, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value === "" ? "" : (value as any) }));
  };

  const handleViewDetails = (demandId: string) => {
    setSelectedDemandId(demandId);
    router.push(`/gestor/demandas/${demandId}`);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
  };

  const handleResetFilters = () => {
    resetFilters();
    setTempFilters({ status: "", category: "", region: "", priority: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600">Smart City</h1>
        <div className="flex items-center gap-4">
          <a href="/gestor/dashboard" className="text-purple-600 font-bold mr-4 hover:text-purple-700">
            Painel de Gestão
          </a>
          <a href="/login" className="text-purple-400 font-normal hover:text-purple-500">
            Sair
          </a>
        </div>
      </nav>

      
      <div className="w-full h-64 bg-linear-to-r from-indigo-900 via-fuchsia-500 to-orange-500 flex items-start justify-center pt-10">
        <h2 className="text-white text-4xl font-bold">Painel de Gestão </h2>
      </div>

     
      <div className="max-w-6xl mx-auto px-4">
        <div className="-mt-24 bg-white rounded-2xl shadow-xl p-8 relative z-10">
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Card 1 - Total de Demandas */}
            <div className="bg-purple-600 rounded-xl p-6 text-white flex flex-col items-center justify-center min-h-[160px] gap-2">
              <p className="text-base font-semibold text-white/70 uppercase tracking-widest">Demandas registradas</p>
              <p className="text-7xl font-extrabold leading-none">{stats.total}</p>
            </div>

            
            <div className="bg-purple-600 rounded-xl p-6 text-white">
              <p className="text-lg font-bold mb-4 text-white/70">Demandas por categoria</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {[
                  "Coleta de lixo",
                  "Iluminação Pública",
                  "Manutenção de vias",
                  "Saneamento",
                  "Fiscalização",
                  "Segurança",
                  "Sinalização de Trânsito",
                  "Outros Empecilhos",
                ].map((cat) => (
                  <div key={cat} className="flex items-center justify-between gap-1">
                    <span className="truncate">{cat}</span>
                    <span className="font-bold shrink-0">{stats.byCategory[cat] ?? 0}</span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-purple-600 rounded-xl p-6 text-white">
              <p className="text-lg font-bold mb-4 text-white/70">Demandas por região</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {[
                  "RMR",
                  "Zona da Mata",
                  "Agreste",
                  "Sertão",
                  "Outra",
                ].map((reg) => (
                  <div key={reg} className="flex items-center justify-between gap-1">
                    <span className="truncate">{reg}</span>
                    <span className="font-bold shrink-0">{stats.byRegion[reg] ?? 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
          <div className="mb-8 text-black">
            <h3 className="text-xl font-bold mb-4 ">Filtros</h3>
            <div className="flex gap-4 items-end">
              <Select
                label="Status"
                options={[
                  { value: "", label: "Todos" },
                  { value: "Aberta", label: "Aberta" },
                  { value: "Em_analise", label: "Em Análise" },
                  { value: "Resolvida", label: "Resolvida" },
                ]}
                value={tempFilters.status}
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
                value={tempFilters.category}
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
                value={tempFilters.region}
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
                value={tempFilters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
                className="flex-1"
              />

              <div className="flex gap-2">
                <Button variant="primary" size="md" onClick={handleApplyFilters}>
                  Aplicar Filtro
                </Button>
                <Button variant="secondary" size="md" onClick={handleResetFilters}>
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>

          
          <div>
  <h3 className="text-xl font-bold mb-4 text-black">Demandas</h3>
  
  <div className="flex flex-col gap-4">
    {isLoading? (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-500 italic">Carregando dados da Smart City...</p>
      </div>
    ) : filteredDemands.length > 0 ? (
      filteredDemands.map((demand) => (
        <DemandCard
          key={demand.id}
          demand={demand}
          onViewDetails={handleViewDetails}
        />
      ))
    ) : (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhuma demanda encontrada com os filtros aplicados.</p>
      </div>
    )}
  </div>
</div> 

          

              
        </div>
      </div>

      
      <div className="h-12" />
    </div>
  );
}

