"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemandStore } from "@/stores/useDemandStore";
import { DemandFilters } from "@/types/demand";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { DemandCard } from "@/components/UI/DemandCard";

export default function Page() {
  const router = useRouter();
  const { filters, setFilters, resetFilters, getFilteredDemands, getDemandStats } =
    useDemandStore();
  const filteredDemands = getFilteredDemands();
  const stats = getDemandStats();
  const [selectedDemandId, setSelectedDemandId] = useState<string | null>(null);

  const handleFilterChange = (key: keyof DemandFilters, value: string) => {
    setFilters({ [key]: value === "" ? "" : (value as any) });
  };

  const handleViewDetails = (demandId: string) => {
    setSelectedDemandId(demandId);
    router.push(`/gestor/demandas/${demandId}`);
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
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

      
      <div className="w-full h-64 bg-linear-to-r from-indigo-900 via-fuchsia-500 to-orange-500 flex items-start justify-center pt-10">
        <h2 className="text-white text-4xl font-bold">Gestão</h2>
      </div>

     
      <div className="max-w-6xl mx-auto px-4">
        <div className="-mt-24 bg-white rounded-2xl shadow-xl p-8 relative z-10">
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            
            <div className="bg-purple-600 rounded-xl p-6 text-white">
              <p className="text-sm font-semibold mb-2">Demandas registradas</p>
              <p className="text-5xl font-bold">{stats.total}</p>
            </div>

            
            <div className="bg-purple-600 rounded-xl p-6 text-white">
              <p className="text-sm font-semibold mb-4">Demandas por categoria</p>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Infraestrutura</span>
                  <span className="font-bold">{stats.byCategory.infraestrutura}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saneamento</span>
                  <span className="font-bold">{stats.byCategory.saneamento}</span>
                </div>
                <div className="flex justify-between">
                  <span>Iluminação</span>
                  <span className="font-bold">{stats.byCategory.iluminacao}</span>
                </div>
              </div>
            </div>

            
            <div className="bg-purple-600 rounded-xl p-6 text-white">
              <p className="text-sm font-semibold mb-4">Demandas por região</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center">
                  <p className="text-xs">Norte</p>
                  <p className="text-xl font-bold">{stats.byRegion.norte}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs">Sul</p>
                  <p className="text-xl font-bold">{stats.byRegion.sul}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs">Leste</p>
                  <p className="text-xl font-bold">{stats.byRegion.leste}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs">Oeste</p>
                  <p className="text-xl font-bold">{stats.byRegion.oeste}</p>
                </div>
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
                  { value: "aberta", label: "Aberta" },
                  { value: "em_analise", label: "Em Análise" },
                  { value: "resolvida", label: "Resolvida" },
                ]}
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="flex-1"
              />

              <Select
                label="Categoria"
                options={[
                  { value: "", label: "Todas" },
                  { value: "infraestrutura", label: "Infraestrutura" },
                  { value: "saneamento", label: "Saneamento" },
                  { value: "iluminacao", label: "Iluminação" },
                  { value: "poda", label: "Poda" },
                  { value: "outra", label: "Outra" },
                ]}
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="flex-1"
              />

              <Select
                label="Região"
                options={[
                  { value: "", label: "Todas" },
                  { value: "norte", label: "Norte" },
                  { value: "sul", label: "Sul" },
                  { value: "leste", label: "Leste" },
                  { value: "oeste", label: "Oeste" },
                ]}
                value={filters.region}
                onChange={(e) => handleFilterChange("region", e.target.value)}
                className="flex-1"
              />

              <Select
                label="Prioridade"
                options={[
                  { value: "", label: "Todas" },
                  { value: "alta", label: "Alta" },
                  { value: "media", label: "Média" },
                  { value: "baixa", label: "Baixa" },
                ]}
                value={filters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
                className="flex-1"
              />

              <Button variant="primary" size="md" onClick={handleApplyFilters}>
                Aplicar Filtro
              </Button>
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-4 text-black">
              Demandas ({filteredDemands.length})
            </h3>
            <div className="flex flex-col gap-4">
              {filteredDemands.length > 0 ? (
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

