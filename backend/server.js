const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("practiceMe server running");
});

app.use("/api/questions", require("./routes/questions"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
