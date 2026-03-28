import sql from "../db/db.js";

export const retrieveChunks = async (embedding) => {
  const result = await sql`
    SELECT content
    FROM chunks
    ORDER BY embedding <=> ${JSON.stringify(embedding)}::vector
    LIMIT 5
  `;

  return result.map((row) => row.content);
};