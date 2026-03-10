import { ollama } from "../config/ollama.js";

export const generateEmbedding = async (text) => {
  const res = await ollama.post("/embeddings", {
    model: "nomic-embed-text",
    prompt: text,
  });

  return res.data.embedding;
};