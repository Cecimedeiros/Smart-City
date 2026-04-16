import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart City",
  description: "Plataforma para registro e acompanhamento de demandas urbanas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}