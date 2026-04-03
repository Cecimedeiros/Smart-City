// app/nova-demanda/page.tsx (ou onde você renderiza o formulário)
'use client'

import { FormDemanda } from "../../../../components/demands/FormDemanda"; // Importe seu componente aqui

export default function NovaDemandaPage() {
  return (
    <div className="min-h-screen bg-neutral-100"> {/* Fundo cinza claro da página */}
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-100 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Smart City</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium text-purple-700">Usuário</span>
          <button className="text-sm text-gray-600 hover:text-gray-900">Sair</button>
        </div>
      </header>

      {/* Banner de Gradiente */}
      <div className="h-64 bg-gradient-to-r from-violet-800 to-orange-500 flex items-center justify-center text-center mt-16 pt-8 pb-12"> {/* mt-16 para descer do header fixo */}
        <h2 className="text-4xl font-bold text-white px-4">Nova Denúncia</h2>
      </div>

      {/* Área do Formulário */}
      <main className="flex justify-center -mt-20 px-4 pb-16"> {/* -mt-20 para o card subir sobre o banner */}
        <FormDemanda />
      </main>
    </div>
  );
}