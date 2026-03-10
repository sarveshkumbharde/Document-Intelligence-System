import express from "express";
import { chat, getChats, deleteChats } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", getChats);
router.delete("/delete-chats", deleteChats);
router.post("/send-message", chat);

export default router; 