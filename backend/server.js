const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("practiceMe server running");
});

app.use("/api/arraybasic", require("./routes/arraybasic"));

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on http://192.168.50.74:${PORT}`);
});
