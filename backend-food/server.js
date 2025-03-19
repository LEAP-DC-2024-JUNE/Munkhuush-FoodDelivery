const express = require("express");
const app = express();

// Use process.env.PORT for dynamic port assignment
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express on Render!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
