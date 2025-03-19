const cors = require("cors");
const express = require("express");
const app = express();

const PORT = 3001;
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
