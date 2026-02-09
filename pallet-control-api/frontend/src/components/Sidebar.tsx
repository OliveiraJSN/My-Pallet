// components/Sidebar.tsx - VERSÃO FUNCIONAL
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/envios", icon: Truck, label: "Envios" },
  { href: "/envios/novo", icon: PlusCircle, label: "Novo Envio" },
  { href: "/pallets", icon: Package, label: "Pallets" },
  { href: "/relatorios", icon: BarChart3, label: "Relatórios", disabled: true },
  { href: "/configuracoes", icon: Settings, label: "Configurações", disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside className={`
      flex flex-col
      min-h-screen
      bg-gray-900
      text-white
      transition-all
      duration-300
      ${isCollapsed ? 'w-20' : 'w-64'}
      border-r
      border-gray-800
    `}>
      {/* Logo Area */}
      <div className={`
        p-4
        border-b
        border-gray-800
        flex
        items-center
        ${isCollapsed ? 'justify-center' : 'justify-between'}
      `}>
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold">MyPallet</h1>
                <p className="text-xs text-gray-400 truncate">Controle</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-gray-800 rounded-md transition-colors"
              title="Recolher menu"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mb-2">
              <Package className="w-6 h-6" />
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1.5 hover:bg-gray-800 rounded-md transition-colors mt-2"
              title="Expandir menu"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || 
                         (item.href !== "/" && pathname?.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              className={`
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-lg
                transition-colors
                ${isActive 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.label : undefined}
              aria-disabled={item.disabled}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && (
                <>
                  <span className="font-medium truncate">{item.label}</span>
                  {item.disabled && (
                    <span className="ml-auto text-xs bg-gray-700 px-2 py-0.5 rounded">
                      Em breve
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Area */}
      <div className="p-3 border-t border-gray-800">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="font-semibold text-sm">A</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@email.com</p>
            </div>
            <button 
              className="p-1.5 hover:bg-gray-800 rounded-md transition-colors"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 py-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="font-semibold">A</span>
            </div>
            <button 
              className="p-2 hover:bg-gray-800 rounded-md transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}