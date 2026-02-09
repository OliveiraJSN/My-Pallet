// types/index.ts
// Re-export tudo dos outros arquivos de tipos

// Primeiro export de pallet.ts
export type PalletStatus = "Disponível" | "Em Uso" | "Avariado";

export interface Pallet {
  id: number;
  code: string;
  status: PalletStatus;
  tipo: PalletTipo;
  localizacao?: string;
  ultimoMovimento?: string;
  createdAt: string;
}

// Depois export de envio.ts
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
  dataEnvio: string;
  responsavel: string;
  observacoes?: string;
  pallets: PalletItem[];
  status: EnvioStatus;
  createdAt: string;
  updatedAt?: string;
}

export type CreateEnvioDTO = Omit<Envio, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnvioDTO = Partial<CreateEnvioDTO>;

export interface EnvioFilters {
  filial?: string;
  status?: EnvioStatus;
  dataInicio?: string;
  dataFim?: string;
  responsavel?: string;
}

// Tipos utilitários
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};