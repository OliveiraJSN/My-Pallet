// types/envio.ts
export type PalletTipo = "PBR" | "CHEP" | "DESCARTAVEL";

export interface PalletItem {
  tipo: PalletTipo;
  quantidade: number;
}

export type EnvioStatus = 
  | "RASCUNHO" 
  | "AGUARDANDO" 
  | "EM_TRANSITO" 
  | "ENTREGUE" 
  | "CANCELADO";

export interface Envio {
  id: number;
  envioNumero: string;
  filial: string;
  placa: string;
  dataEnvio: string; // ISO string
  responsavel: string;
  observacoes?: string;
  pallets: PalletItem[];
  status: EnvioStatus;
  createdAt: string;
  updatedAt?: string;
}

// Tipo para criar novo envio (sem ID, createdAt)
export type CreateEnvioDTO = Omit<Envio, 'id' | 'createdAt' | 'updatedAt'>;

// Tipo para atualizar envio
export type UpdateEnvioDTO = Partial<CreateEnvioDTO>;

// Filtros para busca
export interface EnvioFilters {
  filial?: string;
  status?: EnvioStatus;
  dataInicio?: string;
  dataFim?: string;
  responsavel?: string;
}