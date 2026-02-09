// components/forms/AddPalletForm.tsx - VERSÃO SIMPLES
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PalletTipo } from "@/types";

interface AddPalletFormProps {
  onAdd: (tipo: PalletTipo, quantidade: number) => void;
}

export default function AddPalletForm({ onAdd }: AddPalletFormProps) {
  const [tipo, setTipo] = useState<PalletTipo>("PBR");
  const [quantidade, setQuantidade] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantidade < 1) return;
    
    onAdd(tipo, quantidade);
    // Reseta para valores padrão
    setQuantidade(1);
    setTipo("PBR");
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de pallet
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as PalletTipo)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="PBR">PBR</option>
            <option value="CHEP">CHEP</option>
            <option value="DESCARTAVEL">Descartável</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade
          </label>
          <input
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Adicionar Pallet
          </button>
        </div>
      </div>
    </form>
  );
}