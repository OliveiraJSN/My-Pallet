// src/app/test-api/page.tsx
"use client";

import { apiClient } from "../../../lib/api-client";
import { useEffect } from "react";

export default function TestApiPage() {
  useEffect(() => {
    apiClient.getEnvios().then(data => {
      console.log("Dados carregados:", data);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Teste API</h1>
      <p>Verifique o console do navegador (F12)</p>
    </div>
  );
}