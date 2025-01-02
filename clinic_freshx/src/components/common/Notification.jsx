import React, { useEffect, useState } from "react";
import createSignalRConnection from "../../services/signalRService";
import * as signalR from "@microsoft/signalr";

const NotificationComponent = () => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const connect = async () => {
            // const conn = createSignalRConnection();
            const conn = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7075/notificationHub") // Backend URL
            .build();
            // Định nghĩa hành động khi nhận thông báo
            conn.on("ReceiveNotification", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            try {
                await conn.start();
                console.log("SignalR connected.");
                setConnection(conn);
            } catch (error) {
                console.error("SignalR connection failed: ", error);
            }
        };

        connect();

        // Cleanup khi component unmount
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
