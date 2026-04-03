"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/UI/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoLogin, setTipoLogin] = useState<"cidadao" | "gestor">("cidadao");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular login
    setTimeout(() => {
      if (email && senha) {
        if (tipoLogin === "gestor") {
          router.push("/gestor/dashboard");
        } else {
          router.push("/demandas/nova");
        }
      } else {
        alert("Preencha todos os campos!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-purple-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
        <Link href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700">
          Smart City
        </Link>
        <Link href="/">
          <Button variant="outline" size="md">
            ← Voltar
          </Button>
        </Link>
      </nav>

      {/* Login Form */}
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          {/* Toggle Tipo de Usuário */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTipoLogin("cidadao")}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                tipoLogin === "cidadao"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Cidadão
            </button>
            <button
              onClick={() => setTipoLogin("gestor")}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                tipoLogin === "gestor"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Gestor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="seu@email.com"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="••••••••"
              />
            </div>

            {/* Botão Login */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem cadastro?{" "}
              <Link href="/cadastro" className="text-purple-600 font-bold hover:underline">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

