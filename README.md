# Personal Knowledge AI (RAG System)

A full-stack **Retrieval Augmented Generation (RAG)** application that allows users to upload documents and ask questions about them.
The system indexes documents using **embeddings** and retrieves relevant information to generate accurate answers using a local LLM.

This project demonstrates how modern **GenAI systems combine vector search and large language models** to build intelligent applications.

---

# Features

• Upload PDF documents
• Automatic document parsing and chunking
• Vector embedding generation
• Semantic search using pgvector
• Ask questions about uploaded documents
• Chat history persistence
• View and delete uploaded documents
• Delete chat history
• State persists after page reload

---

# Tech Stack

### Frontend

* React (Vite)
* TailwindCSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* Neon PostgreSQL
* pgvector extension

### AI Models

* Ollama
* TinyLlama / Phi3
* nomic-embed-text (embeddings)

---

# Architecture

The system follows a typical **RAG architecture**.

```
User
 ↓
React Frontend
 ↓
Node.js API
 ↓
Embedding Model (Ollama)
 ↓
PostgreSQL + pgvector
 ↓
LLM (Ollama)
 ↓
Generated Answer
```

---

# RAG Pipeline

### Document Ingestion

```
PDF Upload
 ↓
Text Extraction
 ↓
Text Chunking
 ↓
Embedding Generation
 ↓
Store embeddings in PostgreSQL
```

### Question Answering

```
User Question
 ↓
Generate Question Embedding
 ↓
Vector Similarity Search
 ↓
Retrieve Relevant Chunks
 ↓
Send Context to LLM
 ↓
Generate Answer
```

---

# Database Schema

### documents

```
id (UUID)
filename
uploaded_at
```

### chunks

```
id (UUID)
document_id
content
embedding (VECTOR)
```

### chats

```
id (UUID)
role
message
created_at
```

---

# Installation

## 1. Clone Repository

```
git clone https://github.com/yourusername/personal-knowledge-ai.git
cd personal-knowledge-ai
```

---

# Backend Setup

```
cd backend
npm install
```

Create `.env`

```
DB_URL=your_neon_database_url
```

Start server

```
npm run dev
```

Server runs on

```
http://localhost:5000
```

---

# Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Ollama Setup

Install Ollama:

https://ollama.com

Pull models:

```
ollama pull tinyllama
ollama pull nomic-embed-text
```

Ensure Ollama is running locally.

---

# API Endpoints

### Upload Document

```
POST /api/documents/upload
```

### Get Documents

```
GET /api/documents
```

### Delete Document

```
DELETE /api/documents/:id
```

### Send Message

```
POST /api/chat/send-message
```

### Get Chat History

```
GET /api/chat
```

### Clear Chat History

```
DELETE /api/chat
```

---

# Project Structure

```
backend
 ├ controllers
 ├ routes
 ├ services
 ├ utils
 ├ db
 └ server.js

frontend
 ├ components
 ├ pages
 ├ services
 ├ App.jsx
 └ main.jsx
```

---

# Example Workflow

1. Upload a PDF document
2. The backend extracts and chunks the text
3. Each chunk is converted to an embedding
4. Embeddings are stored in PostgreSQL using pgvector
5. User asks a question
6. Vector search retrieves relevant chunks
7. LLM generates answer using retrieved context

---


# Future Improvements

• Streaming responses
• Document citations in answers
• Multi-document collections
• Authentication system
• Better chunking strategy
• Hybrid search (keyword + vector)

---

# Author

Sarvesh Kumbharde

---

# License

MIT License
