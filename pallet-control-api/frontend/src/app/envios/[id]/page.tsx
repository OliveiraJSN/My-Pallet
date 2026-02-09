"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type PalletTipo = "PBR" | "CHEP" | "DESCARTAVEL";

interface Pallet {
  tipo: PalletTipo;
  quantidade: number;
}

interface Envio {
  id: number;
  envioNumero: string;
  filial: string;
  placa: string;
  dataEnvio: string;
  pallets: Pallet[];
  responsavel?: string;
  observacoes?: string;
  data: string;
}

export default function EnvioDetalhePage() {
  const params = useParams();
  const id = params.id;

  const [envio, setEnvio] = useState<Envio | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarEnvio() {
      try {
        const response = await fetch(
          `http://localhost:3001/envios/${id}`
        );

        if (!response.ok) {
          throw new Error("Envio não encontrado");
        }

        const data = await response.json();
        setEnvio(data);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarEnvio();
  }, [id]);

  if (loading) {
    return <p className="p-6">Carregando envio...</p>;
  }

  if (erro) {
    return <p className="p-6 text-red-600">{erro}</p>;
  }

  if (!envio) {
    return <p className="p-6">Envio não encontrado.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Envio {envio.envioNumero}
        </h1>

        <span className="px-3 py-1 text-sm rounded-md bg-yellow-100 text-yellow-700">
          Aberto
        </span>
      </div>

      {/* Informações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500">Filial</p>
          <p className="font-medium">{envio.filial}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Placa</p>
          <p className="font-medium">{envio.placa}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Data</p>
          <p className="font-medium">{envio.dataEnvio}</p>
        </div>
      </div>

      {/* Pallets */}
      <div>
        <h2 className="text-lg font-medium mb-2">Pallets enviados</h2>

        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-medium">Tipo</th>
                <th className="p-3 text-left text-sm font-medium">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody>
              {envio.pallets.map((pallet, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{pallet.tipo}</td>
                  <td className="p-3">{pallet.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Observações */}
      {envio.observacoes && (
        <div>
          <h2 className="text-lg font-medium mb-2">Observações</h2>
          <p className="border rounded-md p-4 bg-white">
            {envio.observacoes}
          </p>
        </div>
      )}

      {/* Ações */}
      <div className="flex justify-end">
        <Link
          href="/envios"
          className="px-4 py-2 border rounded-md"
        >
          Voltar para envios
        </Link>
      </div>
    </div>
  );
}
