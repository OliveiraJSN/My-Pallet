// src/lib/api-client.ts
import { 
  Envio, 
  CreateEnvioDTO, 
  UpdateEnvioDTO, 
  Pallet 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Função base para chamadas API
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const apiClient = {
  // ========== ENVIOS ==========
  getEnvios: async (): Promise<Envio[]> => {
    try {
      const data = await fetchAPI<Envio[]>('/envios');
      console.log('Envios carregados:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('Erro ao carregar envios, usando dados mock:', error);
      // Dados mock para desenvolvimento
      return [
        {
          id: 1,
          envioNumero: "ENV-2024-001",
          filial: "Matriz",
          placa: "ABC1234",
          dataEnvio: "2024-01-15T10:00:00Z",
          responsavel: "João Silva",
          observacoes: "Envio prioritário",
          pallets: [{ tipo: "PBR", quantidade: 10 }],
          status: "ENTREGUE",
          createdAt: "2024-01-15T08:00:00Z"
        },
        {
          id: 2,
          envioNumero: "ENV-2024-002",
          filial: "Curitiba",
          placa: "XYZ5678",
          dataEnvio: "2024-01-16T14:30:00Z",
          responsavel: "Maria Santos",
          pallets: [
            { tipo: "PBR", quantidade: 5 },
            { tipo: "CHEP", quantidade: 3 }
          ],
          status: "EM_TRANSITO",
          createdAt: "2024-01-16T09:00:00Z"
        },
        {
          id: 3,
          envioNumero: "ENV-2024-003",
          filial: "São Paulo",
          placa: "DEF9012",
          dataEnvio: "2024-01-17T09:15:00Z",
          responsavel: "Pedro Oliveira",
          observacoes: "Pallets avariados",
          pallets: [{ tipo: "DESCARTAVEL", quantidade: 15 }],
          status: "AGUARDANDO",
          createdAt: "2024-01-17T08:00:00Z"
        }
      ];
    }
  },
  
  getEnvio: async (id: number): Promise<Envio> => {
    try {
      return await fetchAPI<Envio>(`/envios/${id}`);
    } catch (error) {
      console.error(`Erro ao carregar envio ${id}:`, error);
      throw error;
    }
  },
  
  createEnvio: async (data: CreateEnvioDTO): Promise<Envio> => {
    try {
      return await fetchAPI<Envio>('/envios', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Erro ao criar envio:', error);
      throw error;
    }
  },
  
  updateEnvio: async (id: number, data: UpdateEnvioDTO): Promise<Envio> => {
    try {
      return await fetchAPI<Envio>(`/envios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`Erro ao atualizar envio ${id}:`, error);
      throw error;
    }
  },
  
  deleteEnvio: async (id: number): Promise<{ success: boolean; message?: string }> => {
    try {
      return await fetchAPI<{ success: boolean; message?: string }>(`/envios/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Erro ao excluir envio ${id}:`, error);
      throw error;
    }
  },

  // ========== PALLETS ==========
  getPallets: async (): Promise<Pallet[]> => {
    try {
      return await fetchAPI<Pallet[]>('/pallets');
    } catch (error) {
      console.warn('Endpoint /pallets não disponível');
      return [];
    }
  },

  // ========== FILIAIS ==========
  getFiliais: async (): Promise<string[]> => {
    try {
      return await fetchAPI<string[]>('/filiais');
    } catch (error) {
      console.warn('Endpoint /filiais não disponível, usando padrão');
      return ['Matriz', 'Curitiba', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte'];
    }
  },
};

export { fetchAPI };