const express = require("express");
const cors = require("cors");
const { generateRoomCode } = require("./utils.js");

const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = 5000;
const socketio = require("socket.io");
const auth = require("./auth_middleware.js");
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
// room logic
let games = new Map();
let clients = new Map();

app.use("/api/questions", require("./routes/questions"));
app.use("/api/auth", require("./routes/auth"));
app.post("/create-room", auth, async (req, res) => {
  const { difficulty, topics, ranked } = req.body;
  const room_code = generateRoomCode();
  games.set(room_code, {
    code: room_code,
    clients: [],
    topics,
    difficulty,
    ranked,
  });
  return res.status(200).json({ code: room_code });
});

setInterval(() => {
  console.log(games);
}, 2000);

io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  clients.set(socket.id, socket);
  socket.emit("client_id", socket.id);
  socket.on("disconnect", () => {
    for (let [key, value] of games.entries()) {
      let game = games.get(key);
      for (let c of game.clients) {
        game.clients = game.clients.filter((client) => client.id !== socket.id);
      }
      if (games.get(key).clients.length === 0) {
        games.delete(key);
      }
    }
    console.log(socket.id, "disconnected");
  });

  socket.on("join", (payload) => {
    const { game_code, name } = payload;
    socket.join(game_code);
    if (!games.has(game_code)) {
      console.error("game code doesnt exit");
      return;
    }
    let game = games.get(game_code);
    game.clients.push({ name, id: socket.id });
    io.to(game_code).emit("join", game);
  });
});

server.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = server;
