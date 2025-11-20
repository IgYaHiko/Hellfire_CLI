import express from "express";

const app = express();

// Fallback PORT if environment variable is missing
const PORT = process.env.PORT || 8080;

app.get("/hi", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`🔥[HELLFIRE]: Server running at http://localhost:${PORT}`);
});
