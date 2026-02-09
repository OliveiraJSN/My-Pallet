// app/envios/novo/page.tsx - VERSÃO SIMPLIFICADA E FUNCIONAL
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Truck, Calendar, User, Package, ArrowLeft } from "lucide-react";
import PalletCard from "@/components/forms/PalletCard";
import AddPalletForm from "@/components/forms/AddPalletForm";
import Link from "next/link";
import { PalletTipo } from "@/types";

type PalletItem = {
  tipo: PalletTipo;
  quantidade: number;
};

export default function NovoEnvioPage() {
  const router = useRouter();
  
  // Estados do formulário
  const [filial, setFilial] = useState("");
  const [placa, setPlaca] = useState("");
  const [dataEnvio, setDataEnvio] = useState(new Date().toISOString().split("T")[0]);
  const [responsavel, setResponsavel] = useState("");
  const [observacoes, setObservacoes] = useState("");
  
  // Estados dos pallets - COMEÇA VAZIO!
  const [pallets, setPallets] = useState<PalletItem[]>([]);
  
  // Estado de loading e mensagens
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // Gerar número do envio
  const envioNumero = `ENV-${String(Date.now()).slice(-6)}`;

  // Adicionar pallet
  const adicionarPallet = (tipo: PalletTipo, quantidade: number) => {
    setPallets([...pallets, { tipo, quantidade }]);
  };

  // Remover pallet
  const removerPallet = (index: number) => {
    setPallets(pallets.filter((_, i) => i !== index));
  };

  // Atualizar pallet (simplificado - apenas remove e adiciona novo)
  const atualizarPallet = (index: number, tipo: PalletTipo, quantidade: number) => {
    const novosPallets = [...pallets];
    novosPallets[index] = { tipo, quantidade };
    setPallets(novosPallets);
  };

  // Validar formulário
  const validarFormulario = () => {
    if (!filial) {
      setMensagem("❌ Selecione uma filial");
      return false;
    }
    if (!placa.trim()) {
      setMensagem("❌ Informe a placa do veículo");
      return false;
    }
    if (!responsavel.trim()) {
      setMensagem("❌ Informe o responsável");
      return false;
    }
    if (pallets.length === 0) {
      setMensagem("❌ Adicione pelo menos um pallet");
      return false;
    }
    return true;
  };

  // Salvar envio
  const salvarEnvio = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    setMensagem("");

    const payload = {
      envioNumero,
      filial,
      placa: placa.toUpperCase(),
      dataEnvio,
      responsavel,
      observacoes,
      pallets,
    };

    try {
      const response = await fetch("http://localhost:3001/envios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar envio");
      }

      setMensagem("✅ Envio registrado com sucesso!");
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/envios");
      }, 2000);

    } catch (error) {
      setMensagem("❌ Erro ao registrar envio. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Calcular total de pallets
  const totalPallets = pallets.reduce((total, pallet) => total + pallet.quantidade, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
        <div className="flex items-center gap-4">
          <Link
            href="/envios"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Novo Envio de Pallets</h1>
            <p className="text-gray-600">Preencha os dados do envio</p>
          </div>
        </div>
        
        <div className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
          {envioNumero}
        </div>
      </div>

      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filial */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Filial de destino *
          </label>
          <select
            value={filial}
            onChange={(e) => setFilial(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
            required
          >
            <option value="">Selecione uma filial</option>
            <option value="Matriz">Matriz</option>
            <option value="Curitiba">Curitiba</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Belo Horizonte">Belo Horizonte</option>
          </select>
        </div>

        {/* Placa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Placa do veículo *
          </label>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
            placeholder="ABC1A23"
            required
          />
        </div>

        {/* Data */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Data do envio
          </label>
          <input
            type="date"
            value={dataEnvio}
            onChange={(e) => setDataEnvio(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
          />
        </div>

        {/* Responsável */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Responsável pelo envio *
          </label>
          <input
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
            placeholder="Nome do responsável"
            required
          />
        </div>
      </div>

      {/* Pallets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Pallets do Envio
          </h2>
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{totalPallets}</span> unidades
          </div>
        </div>

        {/* Formulário para adicionar */}
        <AddPalletForm onAdd={adicionarPallet} />

        {/* Lista de Pallets */}
        <div className="space-y-3">
          {pallets.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum pallet adicionado ainda</p>
              <p className="text-sm">Use o formulário acima para adicionar pallets</p>
            </div>
          ) : (
            pallets.map((pallet, index) => (
              <PalletCard
                key={index}
                index={index}
                tipo={pallet.tipo}
                quantidade={pallet.quantidade}
                onUpdate={atualizarPallet}
                onRemove={removerPallet}
              />
            ))
          )}
        </div>
      </div>

      {/* Observações */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Observações (opcional)
        </label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
          rows={3}
          placeholder="Informações adicionais sobre o envio..."
        />
      </div>

      {/* Mensagem e Ações */}
      <div className="space-y-4">
        {mensagem && (
          <div className={`p-4 rounded-lg ${
            mensagem.includes("✅") 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {mensagem}
          </div>
        )}

        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4">
          <Link
            href="/envios"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
          >
            Cancelar
          </Link>
          
          <button
            onClick={salvarEnvio}
            disabled={loading}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Envio
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}