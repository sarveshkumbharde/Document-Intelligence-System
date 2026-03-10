import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});