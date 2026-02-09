// components/ui/TableFilters.tsx
"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";

interface TableFiltersProps {
  filters: {
    status?: string;
    filial?: string;
    dataInicio?: string;
    dataFim?: string;
    responsavel?: string;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
}

export default function TableFilters({ filters, onFilterChange, onClearFilters }: TableFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = ["TODOS", "RASCUNHO", "AGUARDANDO", "EM_TRANSITO", "ENTREGUE", "CANCELADO"];
  const filialOptions = ["TODAS", "Matriz", "Curitiba", "São Paulo", "Rio de Janeiro", "Belo Horizonte"];

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    const cleared = {
      status: undefined,
      filial: undefined,
      dataInicio: undefined,
      dataFim: undefined,
      responsavel: undefined,
    };
    setLocalFilters(cleared);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtros
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
            )}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
              Limpar filtros
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.status && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                Status: {filters.status}
              </span>
            )}
            {filters.filial && (
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Filial: {filters.filial}
              </span>
            )}
            {filters.dataInicio && (
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                De: {filters.dataInicio}
              </span>
            )}
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={localFilters.status || ""}
                onChange={(e) => setLocalFilters({...localFilters, status: e.target.value || undefined})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="">Todos os status</option>
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Filial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filial
              </label>
              <select
                value={localFilters.filial || ""}
                onChange={(e) => setLocalFilters({...localFilters, filial: e.target.value || undefined})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="">Todas as filiais</option>
                {filialOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Data Início */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Início
              </label>
              <input
                type="date"
                value={localFilters.dataInicio || ""}
                onChange={(e) => setLocalFilters({...localFilters, dataInicio: e.target.value || undefined})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              />
            </div>

            {/* Data Fim */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Fim
              </label>
              <input
                type="date"
                value={localFilters.dataFim || ""}
                onChange={(e) => setLocalFilters({...localFilters, dataFim: e.target.value || undefined})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              />
            </div>
          </div>

          {/* Responsável */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsável
            </label>
            <input
              type="text"
              placeholder="Buscar por responsável..."
              value={localFilters.responsavel || ""}
              onChange={(e) => setLocalFilters({...localFilters, responsavel: e.target.value || undefined})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}