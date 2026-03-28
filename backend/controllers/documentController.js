import { v4 as uuidv4 } from "uuid";
import sql from "../db/db.js";
import { parsePDF } from "../utils/pdfParser.js";
import { chunkText } from "../services/chunkService.js";
import { generateEmbedding } from "../services/embeddingService.js";

export const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const documentId = uuidv4();

    await sql.begin(async (sql) => {

      // insert document record
      await sql`
        INSERT INTO documents (id, filename)
        VALUES (${documentId}, ${file.originalname})
      `;

      // extract text
      const text = await parsePDF(file.path);

      // chunk text
      const chunks = chunkText(text, 300);

      for (const chunk of chunks) {

        const embedding = await generateEmbedding(chunk);

        const vector = `[${embedding.join(",")}]`;

        await sql`
          INSERT INTO chunks (id, document_id, content, embedding)
          VALUES (${uuidv4()}, ${documentId}, ${chunk}, ${vector}::vector)
        `;
      }

    });

    res.json({
      message: "Document indexed successfully",
      chunks: "success",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Document processing failed" });
  }
};


export const getDocuments = async (req, res) => {
  const docs = await sql`
    SELECT * FROM documents
    ORDER BY uploaded_at DESC
  `;

  res.json(docs);
};


export const deleteDocument = async (req, res) => {
  const { id } = req.params;

  await sql`DELETE FROM documents WHERE id = ${id}`;

  res.json({ message: "Document deleted" });
};