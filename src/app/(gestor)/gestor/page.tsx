import Link from "next/link";
import { Button } from "@/components/UI/Button";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600">Smart City</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Gestor</span>
          <Link href="/login">
            <Button variant="outline" size="md">
              Sair
            </Button>
          </Link>
        </div>
      </nav>

      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Painel de Gestão</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="mb-4 text-5xl">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h3>
            <p className="text-gray-600 mb-6">
              Visualize e gerencie todas as demandas da cidade
            </p>
            <Link href="/gestor/dashboard" className="block">
              <Button variant="primary" size="md" className="w-full">
                Acessar Dashboard
              </Button>
            </Link>
          </div>

          
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="mb-4 text-5xl">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Kanban</h3>
            <p className="text-gray-600 mb-6">
              Organize demandas por status em um quadro visual
            </p>
            <Link href="/gestor/kanban" className="block">
              <Button variant="primary" size="md" className="w-full">
                Acessar Kanban
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

