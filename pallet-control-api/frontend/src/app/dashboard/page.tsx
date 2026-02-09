// app/dashboard/page.tsx - VERSÃO MODERNA
"use client";

import { useState, useEffect } from "react";
import { 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Users,
  DollarSign,
  Calendar
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";

// Dados para gráficos
const enviosPorMes = [
  { name: 'Jan', value: 12 },
  { name: 'Fev', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Abr', value: 22 },
  { name: 'Mai', value: 18 },
  { name: 'Jun', value: 24 },
];

const palletsPorTipo = [
  { name: 'PBR', value: 650 },
  { name: 'CHEP', value: 320 },
  { name: 'Descartável', value: 230 },
];

const statusPieData = [
  { name: 'Disponível', value: 860, color: '#10b981' },
  { name: 'Em Uso', value: 300, color: '#f59e0b' },
  { name: 'Avariado', value: 40, color: '#ef4444' },
];

const filiaisPerformance = [
  { name: 'Matriz', value: 45 },
  { name: 'Curitiba', value: 38 },
  { name: 'São Paulo', value: 52 },
  { name: 'Rio', value: 29 },
  { name: 'BH', value: 33 },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema • Hoje, {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Últimos 30 dias
          </button>
          <button className="px-4 py-2.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            Gerar relatório
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Envios"
          value={24}
          description="Este mês"
          trend={12.5}
          icon={Truck}
          color="blue"
          loading={isLoading}
        />
        
        <StatCard
          title="Pallets Disponíveis"
          value={860}
          description="72% do total"
          trend={-3.2}
          icon={Package}
          color="green"
          loading={isLoading}
        />
        
        <StatCard
          title="Taxa de Ocupação"
          value="86%"
          description="Acima da média"
          trend={8.7}
          icon={TrendingUp}
          color="purple"
          loading={isLoading}
        />
        
        <StatCard
          title="Envios Pendentes"
          value={3}
          description="Aguardando processamento"
          trend={0}
          icon={Clock}
          color="orange"
          loading={isLoading}
        />
      </div>

      {/* Gráficos e Atividade */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de linha */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Envios por Mês</h3>
            <select className="text-sm border rounded-lg px-3 py-1.5 bg-white">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <LineChart 
            data={enviosPorMes} 
            color="#3b82f6"
            height={300}
          />
        </div>

        {/* Atividade Recente */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* Gráficos secundários */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pallets por tipo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Pallets por Tipo</h3>
          <BarChart 
            data={palletsPorTipo}
            color="#10b981"
            height={250}
          />
        </div>

        {/* Distribuição */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Status dos Pallets</h3>
          <PieChart 
            data={statusPieData}
            height={250}
          />
        </div>

        {/* Performance por filial */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance por Filial</h3>
          <BarChart 
            data={filiaisPerformance}
            color="#8b5cf6"
            height={250}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Resumo do Sistema</h3>
            <p className="text-primary-100">Todos os indicadores estão dentro do esperado</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-primary-100">Taxa de entrega</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">24h</p>
              <p className="text-sm text-primary-100">Tempo médio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-primary-100">Incidentes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">R$ 12.4k</p>
              <p className="text-sm text-primary-100">Economia/mês</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}