/**
 * BackgroundContainer Component
 * 
 * Componente reutilizável que fornece um fundo com:
 * - Imagem de cidade de Recife (public/images/city-background.webp)
 * - Gradiente roxo/laranja por cima (criando efeito visual)
 * - Centralização e responsividade
 * 
 * Aparece em:
 * - Tela de Cadastro
 * - Tela de Login
 * - Tela Inicial
 * - E outras telas com fundo visual
 * 
 * Uso:
 * <BackgroundContainer>
 *   <Logo />
 *   <SeuConteúdo />
 * </BackgroundContainer>
 */

import { ReactNode } from "react";

interface BackgroundContainerProps {
  children: ReactNode; // Conteúdo que vai ficar por cima do fundo
}

export default function BackgroundContainer({ children }: BackgroundContainerProps) {
  return (
    // Container principal com altura de tela inteira
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        // Imagem de fundo (Recife)
        backgroundImage: `url('/images/city-background.webp')`,
        // Tamanho: cobrir toda a área
        backgroundSize: 'cover',
        // Posição: centralizado
        backgroundPosition: 'center',
        // Efeito parallax (imagem se move menos que o scroll)
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 
        Camada de gradiente roxo/laranja por cima da imagem
        Cores do Figma:
        - De: Roxo (#3D2683 / #8528FF)
        - Para: Laranja (#FF6636)
        
        Opacidade: 0.7 a 0.8 (deixa a imagem um pouco visível por baixo)
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-purple-500/70 to-orange-500/80" />
      
      {/* 
        Conteúdo (children) fica por cima do fundo e gradiente
        z-10 = fica na frente
        w-full = ocupa toda a largura
        px-4 = padding lateral (responsivo em celular)
      */}
      <div className="relative z-10 w-full px-4">
        {children}
      </div>
    </div>
  );
}
