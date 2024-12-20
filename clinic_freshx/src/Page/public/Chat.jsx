import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { DisplaySettings } from "@mui/icons-material";
// import "./Chat.css";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("User1");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7075/chathub") // Backend URL
      .build();

    connect
      .start()
      .then(() => {
        console.log("SignalR Connected");
      })
      .catch((err) => console.error("SignalR Connection Error: ", err));

    // Listen for new messages
    connect.on("ReceiveMessage", (user, message) => {
      setMessages((prev) => [...prev, { user, message }]);
    });

    // Listen for typing notifications
    connect.on("UserTyping", (user) => {
      setTypingUser(user);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000); // Typing indicator disappears after 3 seconds
    });

    setConnection(connect);

    return () => connect.stop();
  }, []);

  const sendMessage = async () => {
    if (connection) {
      await connection.invoke("SendMessage", user, message);
      setMessage("");
    }
  };

  const handleTyping = () => {
    if (connection) {
      connection.invoke("UserTyping", user);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set base64 image data
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="chat-container">
      <div className="chat-box" style={{ display: "block" }}>
        <div className="chat-header">
          <p className="chat-header__title button-large">Fresh-X AI</p>
          <img src="./assets/icons/close.svg" alt="" className="close" />
        </div>
        <div className="chat-body">
          {messages.map((msg, idx) => (
            <div className="chat-body__wrap">
              <p className="chat-body__name button-large">AI</p>
              {/* <p className="chat-body__ai-chat desc2">
        Xin chào, tôi là Fresh-X AI trợ lý ảo sức khỏe của bạn. Hôm nay bạn cảm
        thấy thế nào?
      </p> */}
              <strong>{msg.user}:</strong> {msg.message}
            </div>
          ))}
          {isTyping && typingUser && (
            <div className="typing-indicator">{typingUser} is typing...</div>
          )}
        </div>
        <div className="chat-footer">
          <div className="chat-footer__action">
            <img src="./assets/icons/camera.svg" alt="" className="camera" />
            <img src="./assets/icons/image.svg" alt="" className="image" />
            <img src="./assets/icons/mic.svg" alt="" className="mic" />
          </div>
          <div className="chat-footer__form">
            <input
              placeholder="Viết gì đó, ..."
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") { // Check if the key is Enter
                  e.preventDefault(); // Prevent form submission (default behavior)
                  sendMessage(e); // Trigger the sendMessage function
                }
              }}
              className="chat-footer__input desc2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage} type="submit" className="chat-footer__send">
              <img src="./assets/icons/send.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Chat;
