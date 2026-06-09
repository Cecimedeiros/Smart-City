import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RESOLVE",
  description: "Plataforma para Registro Eletrônico de Solicitações e Ocorrências com Verificação e Encaminhamento de demandas urbanas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}