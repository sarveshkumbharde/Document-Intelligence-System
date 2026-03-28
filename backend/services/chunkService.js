// export const chunkText = (text, chunkSize = 500) => {
//   const words = text.split(" ");
//   const chunks = [];

//   for (let i = 0; i < words.length; i += chunkSize) {
//     chunks.push(words.slice(i, i + chunkSize).join(" "));
//   }

//   return chunks;
// };

export const chunkText = (text, chunkSize = 500, overlap = 100) => {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    chunks.push(text.slice(start, end));

    start += chunkSize - overlap;
  }

  return chunks;
};