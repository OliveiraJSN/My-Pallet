import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// "Banco de dados" em memória (mock)
const envios = [];

/**
 * POST /envios
 * Registra um novo envio
 */
app.post("/envios", (req, res) => {
  const envio = req.body;

  const novoEnvio = {
    id: envios.length + 1, // ID NUMÉRICO
    ...envio,
    criadoEm: new Date().toISOString(),
    status: "Aberto",
  };

  envios.push(novoEnvio);

  console.log("📦 Envio registrado:", novoEnvio);

  res.status(201).json(novoEnvio);
});

/**
 * GET /envios
 * Lista todos os envios
 */
app.get("/envios", (req, res) => {
  res.json(envios);
});

/**
 * GET /envios/:id
 * Detalhe de um envio específico
 */
app.get("/envios/:id", (req, res) => {
  const id = Number(req.params.id);

  const envio = envios.find((e) => e.id === id);

  if (!envio) {
    return res.status(404).json({
      message: "Envio não encontrado",
    });
  }

  res.json(envio);
});

// Start
app.listen(3001, () => {
  console.log("🚀 Backend rodando em http://localhost:3001");
});
