import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function (socket) {
  console.log("Client connected!");

  socket.on("message", function (data) {
    const msg = JSON.parse(data.toString());
    if (msg.content === "Hi") {
      socket.send(JSON.stringify({content: "Hello!", sender: "Server"}))
    }
  });
});


