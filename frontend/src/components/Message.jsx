const Message = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xl px-4 py-3 rounded-xl text-sm shadow
        ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;