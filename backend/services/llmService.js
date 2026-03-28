import { ollama } from "../config/ollama.js";

export const generateAnswer = async (prompt) => {
  console.log("prompt length", prompt.length);
  const res = await ollama.post("/generate", {
    model: "mistral",
    prompt,
    stream: false,
    options: {
      num_predict: 120,
      temperature: 0.2
    },
  });

  return res.data.response;
};