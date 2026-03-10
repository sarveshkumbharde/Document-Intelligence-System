import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const sendMessage = (question) => {
  return API.post("/chat/send-message", { question });
};

export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/documents/upload", formData);
};

export const getDocuments = () => API.get("/documents");

export const deleteDocument = (id) =>
  API.delete(`/documents/${id}`);

export const getChats = () => API.get("/chat");

export const deleteChats = () => API.delete("/chat/delete-chats");