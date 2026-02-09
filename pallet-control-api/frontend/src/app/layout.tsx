// app/layout.tsx (ATUALIZADO)
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/context/SidebarContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MyPallet - Controle de Envios",
  description: "Sistema profissional de controle de envios de pallets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans bg-background text-gray-900">
        <SidebarProvider>
          <div className="min-h-screen flex">
            <Sidebar />
            
            <div className="flex-1 flex flex-col">
              <Header />
              
              <main className="flex-1 p-4 md:p-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}