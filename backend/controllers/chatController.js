import { generateEmbedding } from "../services/embeddingService.js";
import { retrieveChunks } from "../services/retrievalService.js";
import { generateAnswer } from "../services/llmService.js";
import sql from "../db/db.js"
import { v4 as uuidv4 } from "uuid";

export const chat = async (req, res) => {
  const { question } = req.body;
  console.time("embedding");

  await sql`
      INSERT INTO chats (id, role, message)
      VALUES (${uuidv4()}, 'user', ${question})
    `;

  const embedding = await generateEmbedding(question);
  console.timeEnd("embedding");

  console.time("retrieval");

  const chunks = await retrieveChunks(embedding);
  console.timeEnd("retrieval");

  const context = chunks.join("\n");

  console.log("Chunks retrieved:", chunks.length);
  console.log("Context size:", context.length);

  const prompt = `
  Answer using the context below.

  Context:
  ${context}

  Question:
  ${question}
  `;

  console.time("llm");

  const answer = await generateAnswer(prompt);

  await sql `INSERT INTO chats(id, role, message) VALUES(${uuidv4()}, 'ai', ${answer})`
  console.timeEnd("llm");
  res.json({ answer });
};


export const getChats = async (req, res) => {
  const chats = await sql`
    SELECT * FROM chats
    ORDER BY created_at ASC
  `;

  res.json(chats);
};


export const deleteChats = async (req, res) => {
  await sql`DELETE FROM chats`;
  res.json({ message: "Chats cleared" });
};