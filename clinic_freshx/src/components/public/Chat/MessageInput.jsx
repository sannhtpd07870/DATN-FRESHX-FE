import React, { useState } from "react";
import "./MessageInput.css";

const MessageInput = ({ onSend, onTyping }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    onTyping();
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Nhập tin nhắn..."
        value={text}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Gửi</button>
    </div>
  );
};

export default MessageInput;
