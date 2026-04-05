"use client";

import { useState } from "react";
import { Button } from "@/components/UI/Button";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<"cidadao" | "gestor">("cidadao");
  const [codigoAcesso, setCodigoAcesso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    if (tipoUsuario === "gestor" && !codigoAcesso) {
      alert("Código de acesso é obrigatório para gestores!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Cadastro:", { nome, email, senha, tipoUsuario, codigoAcesso });
      alert("Cadastro desabilitado: navegação entre páginas foi removida");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/recife.jpg')" }}
      />

      
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #3D2683cc 0%, #8528FFaa 50%, #FF6636cc 100%)",
        }}
      />

      
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center py-4 px-8 z-30">
        <button className="flex items-center gap-2 cursor-not-allowed opacity-60" disabled>
          <div className="text-2xl font-bold text-white">Smart City</div>
        </button>
        <Button variant="outline" size="md" className="text-white border-white" disabled>
          ← Voltar
        </Button>
      </nav>

      
      <div className="relative z-10 w-full max-w-sm mx-4 mt-20">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-8">

          <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
            Criar conta
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nome completo</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Ex: joao@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Confirmar senha</label>
              <input
                type="password"
                placeholder="Repita sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Tipo de usuário</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="radio"
                    name="tipoUsuario"
                    value="cidadao"
                    checked={tipoUsuario === "cidadao"}
                    onChange={() => setTipoUsuario("cidadao")}
                    className="accent-purple-600"
                  />
                  Cidadão
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="radio"
                    name="tipoUsuario"
                    value="gestor"
                    checked={tipoUsuario === "gestor"}
                    onChange={() => setTipoUsuario("gestor")}
                    className="accent-purple-600"
                  />
                  Gestor
                </label>
              </div>
            </div>

            
            {tipoUsuario === "gestor" && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Código de acesso</label>
                <input
                  type="text"
                  placeholder="Código fornecido pelo administrador"
                  value={codigoAcesso}
                  onChange={(e) => setCodigoAcesso(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder:text-gray-400"
                />
              </div>
            )}

           
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Já tem conta?{" "}
            <button className="text-purple-600 hover:text-purple-700 font-semibold transition-colors cursor-not-allowed opacity-60" disabled>
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
