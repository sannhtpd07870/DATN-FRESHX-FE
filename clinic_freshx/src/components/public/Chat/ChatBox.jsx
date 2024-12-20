import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";

const ChatBox = ({ messages, isTyping }) => {
  const chatRef = useRef(null);

  // Cuộn xuống cuối khung chat khi có tin nhắn mới
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="chatbox">
      <div className="chatbox-messages" ref={chatRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "me" ? "me" : "other"}`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Đang gõ...</div>}
      </div>
    </div>
  );
};

export default ChatBox;
