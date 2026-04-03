"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/UI/Logo";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<"cidadao" | "gestor">("cidadao");
  const [codigoAcesso, setCodigoAcesso] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Cadastro:", { nome, email, senha, tipoUsuario, codigoAcesso });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Foto da cidade como fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/recife.jpg')" }}
   />

      {/* Gradiente roxo→laranja por cima */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #3D2683cc 0%, #8528FFaa 50%, #FF6636cc 100%)",
        }}
      />

      {/* Logo no topo esquerdo */}
      <div className="absolute top-8 left-8 z-20">
        <Logo variant="white" />
      </div>

      {/* Card branco centralizado */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-8">

          <h1 className="text-2xl font-bold text-center text-[#8528FF] mb-6">
            Criar conta
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Nome completo */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nome completo</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8528FF] focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Ex: joao@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8528FF] focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8528FF] focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Confirmar senha */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Confirmar senha</label>
              <input
                type="password"
                placeholder="Repita sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8528FF] focus:border-transparent placeholder:text-gray-400"
              />
            </div>

            {/* Tipo de usuário */}
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
                    className="accent-[#8528FF]"
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
                    className="accent-[#8528FF]"
                  />
                  Gestor
                </label>
              </div>
            </div>

            {/* Código de acesso — apenas para Gestor */}
            {tipoUsuario === "gestor" && (
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Código de acesso"
                  value={codigoAcesso}
                  onChange={(e) => setCodigoAcesso(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8528FF] focus:border-transparent placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Botão de cadastro */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-lg font-semibold text-white text-sm bg-[#8528FF] hover:bg-[#7020e0] active:bg-[#5c1ab8] transition-colors duration-200 cursor-pointer"
            >
              Criar Conta
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Já tem conta?{" "}
            <Link href="/login" className="text-gray-600 hover:text-[#8528FF] font-medium transition-colors">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
