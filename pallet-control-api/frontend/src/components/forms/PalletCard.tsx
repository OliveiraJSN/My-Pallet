// components/forms/PalletCard.tsx - VERSÃO SIMPLIFICADA
"use client";

import { Edit2, Trash2, Check, X } from "lucide-react";
import { PalletTipo } from "@/types";

interface PalletCardProps {
  index: number;
  tipo: PalletTipo;
  quantidade: number;
  onUpdate: (index: number, tipo: PalletTipo, quantidade: number) => void;
  onRemove: (index: number) => void;
}

const tipoCores: Record<PalletTipo, string> = {
  PBR: "bg-blue-100 text-blue-800",
  CHEP: "bg-green-100 text-green-800",
  DESCARTAVEL: "bg-gray-100 text-gray-800",
};

const tipoNomes: Record<PalletTipo, string> = {
  PBR: "PBR",
  CHEP: "CHEP",
  DESCARTAVEL: "Descartável",
};

export default function PalletCard({
  index,
  tipo,
  quantidade,
  onUpdate,
  onRemove,
}: PalletCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1 rounded-md text-sm font-medium ${tipoCores[tipo]}`}>
          {tipoNomes[tipo]}
        </div>
        <div>
          <p className="font-semibold text-lg">{quantidade} unidades</p>
          <p className="text-sm text-gray-500">ID: {index + 1}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onRemove(index)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Excluir"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}