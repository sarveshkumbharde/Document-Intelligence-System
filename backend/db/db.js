// import { neon } from "@neondatabase/serverless";
// import dotenv from "dotenv";

// dotenv.config();

// const sql = neon(process.env.DB_URL);
// console.log("DB URL:", process.env.DB_URL);

// async function testDB() {
//   try {
//     const result = await sql`SELECT NOW()`;
//     console.log("DB connected:", result);
//   } catch (err) {
//     console.error("DB connection error:", err.message);
//   }
// }

// testDB();
// export default sql;


import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const sql = postgres(process.env.DB_URL);

export default sql;