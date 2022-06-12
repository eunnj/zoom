import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
console.log("hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // ({server})=>같은 서버에서 http,webSpcket을 둘 다 작동

function onSocketClose() {
  console.log("Disconnected from the Browser X");
}
// function onSocketMessage(message) {
//   console.log(message.toString("utf8"));
// }

// 각 브라우저의 socket을 담는 배역
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => {
      aSocket.send(message.toString("utf8"));
    });
  });
});
server.listen(3000, handleListen);
