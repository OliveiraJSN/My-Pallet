// app/envios/lista/page.tsx (VERSÃO PROFISSIONAL)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Download, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  MoreVertical,
  Truck,
  Calendar,
  User,
  Package
} from "lucide-react";
import Card from "@/components/ui/Card";
import TableSkeleton from "@/components/ui/TableSkeleton";
import TableFilters from "@/components/ui/TableFilters";
import TablePagination from "@/components/ui/TablePagination";
import { apiClient } from "../../../../lib/api-client";
import { Envio } from "@/types";

console.log('Testando import...');

export default function ListaEnviosPage() {
  // Estados
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  
  // Filtros
  const [filters, setFilters] = useState({
    status: undefined as string | undefined,
    filial: undefined as string | undefined,
    dataInicio: undefined as string | undefined,
    dataFim: undefined as string | undefined,
    responsavel: undefined as string | undefined,
  });
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Carregar dados
  useEffect(() => {
    carregarEnvios();
  }, [currentPage, itemsPerPage, filters]);

  async function carregarEnvios() {
    try {
      setLoading(true);
      const data = await apiClient.getEnvios();
      setEnvios(data);
      setTotalItems(data.length);
      setError("");
    } catch (err: any) {
      setError("Erro ao carregar envios. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Aplicar filtros e busca
  const filteredEnvios = envios.filter(envio => {
    // Busca geral
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        envio.envioNumero.toLowerCase().includes(searchLower) ||
        envio.filial.toLowerCase().includes(searchLower) ||
        envio.placa.toLowerCase().includes(searchLower) ||
        envio.responsavel.toLowerCase().includes(searchLower) ||
        envio.observacoes?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtros específicos
    if (filters.status && envio.status !== filters.status) return false;
    if (filters.filial && envio.filial !== filters.filial) return false;
    if (filters.responsavel && !envio.responsavel.toLowerCase().includes(filters.responsavel.toLowerCase())) return false;
    
    // Filtro por data
    if (filters.dataInicio || filters.dataFim) {
      const envioDate = new Date(envio.dataEnvio);
      if (filters.dataInicio && envioDate < new Date(filters.dataInicio)) return false;
      if (filters.dataFim && envioDate > new Date(filters.dataFim)) return false;
    }

    return true;
  });

  // Calcular paginação
  const totalPages = Math.ceil(filteredEnvios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEnvios = filteredEnvios.slice(startIndex, startIndex + itemsPerPage);

  // Funções auxiliares
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Resetar para primeira página
  };

  const handleClearFilters = () => {
    setFilters({
      status: undefined,
      filial: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      responsavel: undefined,
    });
    setCurrentPage(1);
  };

  const handleDeleteEnvio = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este envio?")) {
      try {
        await apiClient.deleteEnvio(id);
        carregarEnvios();
      } catch (error) {
        alert("Erro ao excluir envio.");
      }
    }
  };

  const handleExportCSV = () => {
    const headers = ["Número", "Filial", "Placa", "Data", "Responsável", "Status", "Pallets"];
    const csvData = filteredEnvios.map(envio => [
      envio.envioNumero,
      envio.filial,
      envio.placa,
      new Date(envio.dataEnvio).toLocaleDateString(),
      envio.responsavel,
      envio.status,
      envio.pallets.reduce((sum, p) => sum + p.quantidade, 0)
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `envios_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ENTREGUE": return "bg-green-100 text-green-800";
      case "EM_TRANSITO": return "bg-blue-100 text-blue-800";
      case "AGUARDANDO": return "bg-yellow-100 text-yellow-800";
      case "RASCUNHO": return "bg-gray-100 text-gray-800";
      case "CANCELADO": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading && envios.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lista de Envios</h1>
          <p className="text-gray-600">Gerencie todos os envios de pallets registrados</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/envios/novo"
            className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            + Novo Envio
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar por número, filial, placa, responsável..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Exportar CSV</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <TableFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">ENVIO</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">FILIAL</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">PLACA</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">DATA</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">STATUS</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">PALLETS</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedEnvios.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-12 h-12 text-gray-300" />
                      <p className="font-medium">Nenhum envio encontrado</p>
                      <p className="text-sm">Tente ajustar os filtros ou criar um novo envio</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedEnvios.map((envio) => (
                  <tr 
                    key={envio.id} 
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="p-4">
                      <div>
                        <Link 
                          href={`/envios/${envio.id}`}
                          className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
                        >
                          {envio.envioNumero}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">ID: {envio.id}</p>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium">{envio.filial}</span>
                      </div>
                    </td>
                    
                    <td className="p-4 font-mono text-sm">{envio.placa}</td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(envio.dataEnvio).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(envio.dataEnvio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(envio.status)}`}>
                        {envio.status.replace('_', ' ')}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {envio.pallets.reduce((sum, p) => sum + p.quantidade, 0)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({envio.pallets.length} tipos)
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/envios/${envio.id}`}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Visualizar"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        
                        <button
                          onClick={() => handleDeleteEnvio(envio.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="relative group">
                          <button
                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Mais opções"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                              Duplicar envio
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                              Imprimir etiqueta
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">
                              Cancelar envio
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {paginatedEnvios.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredEnvios.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total de Envios</p>
            <p className="text-2xl font-bold mt-1">{envios.length}</p>
          </div>
        </Card>
        
        <Card padding="md">
          <div className="text-center">
            <p className="text-sm text-gray-600">Em Trânsito</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">
              {envios.filter(e => e.status === "EM_TRANSITO").length}
            </p>
          </div>
        </Card>
        
        <Card padding="md">
          <div className="text-center">
            <p className="text-sm text-gray-600">Pendentes</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">
              {envios.filter(e => e.status === "AGUARDANDO").length}
            </p>
          </div>
        </Card>
        
        <Card padding="md">
          <div className="text-center">
            <p className="text-sm text-gray-600">Entregues</p>
            <p className="text-2xl font-bold mt-1 text-green-600">
              {envios.filter(e => e.status === "ENTREGUE").length}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}