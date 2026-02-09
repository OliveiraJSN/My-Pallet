// components/Header.tsx (COMPLETO ATUALIZADO)
"use client";

import { Bell, Search, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const [search, setSearch] = useState("");
  const { isCollapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Função para obter título da página atual
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/envios") return "Envios";
    if (pathname === "/envios/novo") return "Novo Envio";
    if (pathname === "/envios/lista") return "Lista de Envios";
    if (pathname?.startsWith("/envios/") && pathname !== "/envios/novo") return "Detalhe do Envio";
    if (pathname === "/pallets") return "Pallets";
    if (pathname === "/relatorios") return "Relatórios";
    if (pathname === "/configuracoes") return "Configurações";
    return "MyPallet";
  };

  // Função para obter descrição da página
  const getPageDescription = () => {
    if (pathname === "/dashboard") return "Visão geral do sistema";
    if (pathname === "/envios") return "Gerenciamento de envios";
    if (pathname === "/envios/novo") return "Registrar novo envio";
    if (pathname === "/envios/lista") return "Histórico de envios";
    if (pathname?.startsWith("/envios/") && pathname !== "/envios/novo") return "Detalhes do envio";
    if (pathname === "/pallets") return "Controle de pallets";
    return "Sistema de controle de envios de pallets";
  };

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-gray-200">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left: Toggle sidebar & Page info */}
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={isCollapsed ? "Expandir menu" : "Recolher menu"}
              aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 text-gray-600" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">MyPallet</span>
                <span className="text-gray-300">/</span>
                <span className="font-medium text-gray-700">
                  {getPageTitle()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {getPageDescription()}
              </p>
            </div>

            {/* Mobile title */}
            <div className="md:hidden">
              <h1 className="text-lg font-semibold text-gray-800">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Center: Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar envios, pallets, filiais..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                aria-label="Buscar no sistema"
              />
            </div>
          </div>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Notifications */}
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notificações"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            {/* Desktop user info */}
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </div>

            {/* Mobile user icon */}
            <div className="md:hidden">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar envios, pallets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
              aria-label="Buscar no sistema"
            />
          </div>
        </div>
      </div>

      {/* Stats bar (opcional - para dashboard) */}
      {pathname === "/dashboard" && (
        <div className="hidden md:block bg-gray-50 border-t border-gray-200 px-6 py-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Sistema operacional
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                24 envios este mês
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                86% pallets disponíveis
              </span>
            </div>
            <div>
              <span className="text-gray-500">Última atualização: hoje 10:30</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}