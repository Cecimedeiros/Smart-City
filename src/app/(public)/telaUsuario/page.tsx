'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { DemandCard } from "@/components/UI/DemandCard"
import { useDemandStore } from "@/stores/useDemandStore"
import Link from "next/link";

// constants
import { CATEGORIAS, REGIOES, STATUS, PRIORIDADES } from '@/constants/demanda'

type FilterKeys = "status" | "category" | "region" | "priority"

export default function TelaUsuarioPage() {
  const filters = useDemandStore((state) => state.filters)
  const isLoading = useDemandStore((state) => state.isLoading)
  const setFilters = useDemandStore((state) => state.setFilters)
  const resetFilters = useDemandStore((state) => state.resetFilters)
  const getFilteredDemands = useDemandStore((state) => state.getFilteredDemands)
  const fetchDemands = useDemandStore((state) => state.fetchDemands)

  const router = useRouter()

  useEffect(() => {
    fetchDemands()
  }, [fetchDemands])

  const filteredDemands = getFilteredDemands()

  const getOptions = (key: FilterKeys) => {
    switch (key) {
      case "status":
        return ["", ...STATUS]
      case "category":
        return ["", ...CATEGORIAS]
      case "region":
        return ["", ...REGIOES]
      case "priority":
        return ["", ...PRIORIDADES]
      default:
        return [""]
    }
  }

  const handleFilterChange = (key: FilterKeys, value: string) => {
    setFilters({ [key]: value })
  }

  const handleViewDetails = (demandId: string) => {
    router.push(`/demandas/${demandId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="h-[250px] flex items-center justify-center 
        bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400 shadow-lg">
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          Denúncias
        </h1>
      </div>

      {/* CONTAINER */}
      <div className="max-w-5xl mx-auto -mt-16 pb-20 px-4">

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">

      {/* BOTÃO PRINCIPAL */}
      <div className="flex justify-center mb-10">
        <Link href="/demandas/nova">
          <button 
            type="button"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Criar Nova Solicitação
          </button>
        </Link>
      </div>

          {/* FILTROS */}
          <div className="mb-10">
            <p className="text-xs font-bold text-gray-400 mb-4">
              FILTROS DE BUSCA
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

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

              {/* BOTÃO LIMPAR PADRONIZADO */}
              <button
                onClick={resetFilters}
                className="
                  w-full md:w-auto
                  px-4 py-2
                  rounded-lg
                  text-sm font-semibold
                  bg-purple-600
                  text-white
                  hover:bg-purple-700
                  transition
                "
              >
                Limpar
              </button>

            </div>
          </div>

          {/* RESULTADOS */}
          <div className="space-y-4">

            <p className="font-bold text-gray-700">
              Resultados Recentes
            </p>

            {isLoading ? (
              <div className="flex flex-col items-center py-10 text-gray-500">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
                Buscando denúncias...
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
              <div className="text-center py-10 text-gray-400">
                Nenhuma denúncia encontrada para esses filtros.
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

/* FILTER COMPONENT */
function FilterItem({
  label,
  options,
  value,
  onChange
}: {
  label: string
  options: string[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div>
      <p className="text-xs font-bold mb-1 text-gray-600">
        {label}
      </p>

      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          border border-gray-300
          rounded-lg
          px-3 py-2
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
        "
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? "Todos" : opt}
          </option>
        ))}
      </select>
    </div>
  )
}