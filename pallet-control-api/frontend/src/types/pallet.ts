// types/pallet.ts - ATUALIZE
import { PalletTipo } from './envio'; // ADICIONE ESTE IMPORT

export type PalletStatus = "Disponível" | "Em Uso" | "Avariado";

export interface Pallet {
  id: number;
  code: string;
  status: PalletStatus;
  tipo: PalletTipo; // ADICIONE ESTE CAMPO
  localizacao?: string;
  ultimoMovimento?: string;
  createdAt: string;
}

// NÃO precisa re-exportar PalletTipo se já importou