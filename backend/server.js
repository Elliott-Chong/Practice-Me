const express = require("express");
const cors = require("cors");

const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = 5000;
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("practiceMe server running");
});

app.use("/api/questions", require("./routes/questions"));
app.use("/api/auth", require("./routes/auth"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = server;
