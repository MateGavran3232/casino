const express = require("express");
const cors = require("cors");
const db = require("./db/db");

const app = express();

app.use(cors());

app.get("/games", async (req, res) => {
  const search = req.query.search;
  try {
    const query = !search
      ? "SELECT * FROM games"
      : `SELECT id,title FROM games WHERE title LIKE '%${search}%';`;
    db.query(query, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).send("Error querying database.");
        return;
      }
      res.send(result);
    });
  } catch (e) {
    console.error("Database connection error:", e);
    res.status(500).send("Error connecting to database.");
  }
});

app.get("/games/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = `SELECT * FROM games WHERE ID = ${id}`;
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Error querying database.");
        return;
      }

      if (result.length === 0) {
        res.status(404).send("Game not found.");
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    console.error("Database connection error:", e);
    res.status(500).send("Error connecting to database.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
