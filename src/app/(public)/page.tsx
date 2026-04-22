"use client";

import { Button } from "@/components/UI/Button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-purple-100">
   
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
        <Link href="/page">
          <h1 className="text-2xl font-bold text-purple-600 cursor-pointer hover:opacity-80 transition-opacity">
            Smart City
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <button
            className="text-purple-600 font-bold hover:text-purple-700 transition cursor-not-allowed opacity-60"
            disabled
          >
            Entrar
          </button>
          <Button variant="primary" size="md" disabled>
            Cadastrar
          </Button>
        </div>
      </nav>

      
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Bem-vindo ao Smart City</h2>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma para registro e acompanhamento de demandas urbanas
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="mb-4 text-4xl">👤</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Para Cidadãos</h3>
            <p className="text-gray-600 mb-6">
              Registre suas demandas e acompanhe o status em tempo real
            </p>
            <Button variant="primary" size="md" className="w-full" disabled>
              Cadastrar como Cidadão
            </Button>
          </div>

          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="mb-4 text-4xl">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Para Gestores</h3>
            <p className="text-gray-600 mb-6">
              Gerencie e acompanhe todas as demandas da cidade
            </p>
            <Button variant="primary" size="md" className="w-full" disabled>
              Acessar Dashboard
            </Button>
          </div>
        </div>

        <p className="text-gray-600 mt-12">
          Já tem cadastro?{" "}
          <button className="text-purple-600 font-bold hover:underline cursor-not-allowed opacity-60" disabled>
            Faça login aqui
          </button>
        </p>
      </div>
    </div>
  );
}