// src/lib/api-client.d.ts (crie este arquivo)
declare module '@/lib/api-client' {
  export const apiClient: {
    getEnvios: () => Promise<any[]>;
    getEnvio: (id: number) => Promise<any>;
    createEnvio: (data: any) => Promise<any>;
    updateEnvio: (id: number, data: any) => Promise<any>;
    deleteEnvio: (id: number) => Promise<any>;
    getPallets: () => Promise<any[]>;
    getFiliais: () => Promise<string[]>;
  };
  export const fetchAPI: any;
}