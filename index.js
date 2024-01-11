const express = require("express");

const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = 3001;

app.use(cors());

app.set("view engine", "ejs");

const server = http.createServer(app);

const io = new Server(server, { cors: "*" });

app.get("/home", (req, res, next) => {
  res.render("home");
});

server.listen(PORT, () => {
  console.log(`Server starts with ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Socket connected...");

  socket.on("chat", (data) => {
    console.log(`User join with id - ${socket.id} and data - ${data}`);
    socket.broadcast.emit(data);
  });
});
