import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const createSignalRConnection = () => {
    const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7075/notificationHub") // Thay bằng URL của SignalR Hub trên server
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    return connection;
};

export default createSignalRConnection;
