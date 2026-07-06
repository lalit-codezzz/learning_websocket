import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function (socket) {
  console.log("Client connected!");

  socket.send("Hello!");

  socket.on("message", function (data) {
    console.log(data.toString());
  });
});


