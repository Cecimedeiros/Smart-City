'use client'

import React from 'react'

import { Button } from "@/components/UI/Button"
import { DemandCard } from "@/components/UI/DemandCard"
import { Select } from "@/components/UI/Select"
import { useDemandStore } from "@/stores/useDemandStore"


type FilterKeys = "status" | "category" | "region" | "priority"

export default function TelaUsuarioPage() {

  
  const demands = useDemandStore((state) => state.demands)
  const filters = useDemandStore((state) => state.filters)
  const setFilters = useDemandStore((state) => state.setFilters)
  const resetFilters = useDemandStore((state) => state.resetFilters)
  const getFilteredDemands = useDemandStore((state) => state.getFilteredDemands)

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
            
            <div className="space-y-4">
              {filteredDemands.map((demand) => (
                <DemandCard
                  key={demand.id}
                  demand={demand}
                  onViewDetails={() => console.log("Ver detalhes:", demand.id)}
                />
              ))}
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