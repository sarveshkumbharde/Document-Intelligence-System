import { useState, useEffect } from "react";
import { sendMessage, getChats, getDocuments, deleteChats } from "../services/api";
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadChats = async () => {
      const res = await getChats();

      const formatted = res.data.map((c) => ({
        role: c.role,
        text: c.message,
      }));

      setMessages(formatted);
    };

    loadChats();
  }, []);
  const handleSend = async () => {
    if (!question) return;

    const userMessage = { role: "user", text: question };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await sendMessage(question);

      const aiMessage = {
        role: "ai",
        text: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white shadow rounded-xl p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}

        {loading && <p className="text-gray-500 text-sm">AI thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
          placeholder="Ask something about your documents..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
        <button
          onClick={async () => {
            await deleteChats();
            setMessages([]);
          }}
          className="text-red-500 text-sm"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
