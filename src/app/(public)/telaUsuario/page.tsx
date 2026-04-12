'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from "@/components/UI/Button"
import { DemandCard } from "@/components/UI/DemandCard"
import { Select } from "@/components/UI/Select"
import { useDemandStore } from "@/stores/useDemandStore"

type FilterKeys = "status" | "category" | "region" | "priority"

export default function TelaUsuarioPage() {
  // Pegando os estados e funções da store
  const demands = useDemandStore((state) => state.demands)
  const filters = useDemandStore((state) => state.filters)
  const isLoading = useDemandStore((state) => state.isLoading) // Importante!
  const setFilters = useDemandStore((state) => state.setFilters)
  const resetFilters = useDemandStore((state) => state.resetFilters)
  const getFilteredDemands = useDemandStore((state) => state.getFilteredDemands)
  const fetchDemands = useDemandStore((state) => state.fetchDemands) // Função que simula o carregamento
  const router = useRouter()

  // 1. Dispara o carregamento fake ao montar a página
  useEffect(() => {
    fetchDemands();
  }, [fetchDemands]);

  const filteredDemands = getFilteredDemands()

  const getOptions = (key: FilterKeys) => {
    const uniqueValues = Array.from(
      new Set(
        demands
          .map((d) => d[key]?.trim())
          .filter(Boolean)
      )
    )

    return [
      { label: "Todos", value: "" },
      ...uniqueValues.map((val) => ({
        label: val,
        value: val
      }))
    ]
  }

  const handleFilterChange = (key: FilterKeys, value: string) => {
    setFilters({ [key]: value })
  }

  // Quando cidadão clica em "Ver Detalhes", navega pra página de detalhes
  const handleViewDetails = (demandId: string) => {
    router.push(`/demandas/${demandId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <header className="w-full h-64 bg-gradient-to-r from-indigo-700 via-purple-600 to-orange-500 flex items-center justify-center shadow-lg">
        <h1 className="text-white text-5xl font-extrabold tracking-tight drop-shadow-md">
          Denúncias
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-16 pb-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
          
          <div className="flex justify-center mb-12">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 rounded-2xl font-bold text-lg shadow-lg transition-transform hover:scale-105 active:scale-95">
              Criar Nova Solicitação
            </Button>
          </div>

          <section className="mb-12">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">
              Filtros de Busca
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 items-end">
              <FilterItem 
                label="Status"
                options={getOptions("status")}
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              />
              <FilterItem 
                label="Categoria"
                options={getOptions("category")}
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              />
              <FilterItem 
                label="Região"
                options={getOptions("region")}
                value={filters.region}
                onChange={(e) => handleFilterChange("region", e.target.value)}
              />
              <FilterItem 
                label="Prioridade"
                options={getOptions("priority")}
                value={filters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
              />
              <Button 
                onClick={resetFilters}
                className="bg-gray-200 text-gray-700 h-11 w-full font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Limpar
              </Button>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h3 className="font-bold text-gray-700 text-lg ml-1">
              Resultados Recentes
            </h3>
            
            <div className="space-y-4 min-h-[200px] flex flex-col">
              {/* 2. LÓGICA DE CARREGAMENTO AQUI */}
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                  <p className="text-gray-500 font-medium animate-pulse">Buscando denúncias...</p>
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
                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400">Nenhuma denúncia encontrada para esses filtros.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function FilterItem({ 
  label, 
  options,
  value,
  onChange
}: { 
  label: string
  options: { label: string; value: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[11px] font-bold text-gray-500 ml-1">
        {label}
      </label>
      <Select 
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}