
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const pdf = pdfParse.default || pdfParse;
console.log(pdfParse);

export const parsePDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdf(buffer);

  let text = data.text;

  // remove null bytes and invalid chars
  text = text.replace(/\0/g, "");
  text = text.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");

  return text;
};