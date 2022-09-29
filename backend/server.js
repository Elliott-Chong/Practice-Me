const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = 5000;
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("practiceMe server running");
});

app.use("/api/questions", require("./routes/questions"));
app.use("/api/auth", require("./routes/auth"));

// room logic
let rooms = {};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    for (let room in rooms) {
      for (let person of rooms[room]) {
        if (person.id == socket.id) {
          io.to(room).emit("game status", { status: false });
        }
      }
      rooms[room] = rooms[room].filter((person) => person.id != socket.id);
      if (rooms[room].length == 0) delete rooms[room];
    }
    console.log(rooms);
  });
  socket.on("start game", (roomCode) => {
    io.to(roomCode).emit("start game");
  });
  socket.on("join room", (roomCode, email) => {
    socket.join(roomCode);
    if (rooms.hasOwnProperty(roomCode)) {
      rooms[roomCode].push({ email, id: socket.id });
    } else {
      rooms[roomCode] = [{ email, id: socket.id }];
    }
    console.log(rooms);
    if (rooms[roomCode].length == 2) {
      io.to(roomCode).emit("game status", {
        status: true,
        players: rooms[roomCode],
      });
    }
  });
});

server.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = server;
