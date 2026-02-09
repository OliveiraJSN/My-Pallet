"use client";

import Link from "next/link";

export default function EnviosHubPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Cabeçalho */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Envios de Pallets</h1>
        <p className="text-sm text-gray-500">
          Controle de movimentações de pallets entre filiais
        </p>
      </div>

      {/* Ações principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/envios/novo"
          className="border rounded-lg p-6 hover:shadow transition flex flex-col gap-2"
        >
          <span className="text-lg font-medium">📦 Novo Envio</span>
          <span className="text-sm text-gray-500">
            Registrar uma nova movimentação de pallets
          </span>
        </Link>

        <Link
          href="/envios/lista"
          className="border rounded-lg p-6 hover:shadow transition flex flex-col gap-2"
        >
          <span className="text-lg font-medium">📋 Listar Envios</span>
          <span className="text-sm text-gray-500">
            Visualizar envios já registrados
          </span>
        </Link>

        <div className="border rounded-lg p-6 opacity-50 cursor-not-allowed">
          <span className="text-lg font-medium">📊 Relatórios</span>
          <span className="text-sm text-gray-500">
            Em breve
          </span>
        </div>
      </div>
    </div>
  );
}
