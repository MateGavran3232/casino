const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());

app.get("/games", async (req, res) => {
  const search = req.query.search;
  try {
    const query = !search
      ? "SELECT * FROM games"
      : `SELECT * FROM games WHERE title LIKE '%${search}%';`;
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

app.post("/login", bodyParser.json(), async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, result) => {
      if (err) {
        console.error("Error", err);
        res.status(500).send("Error");
        return;
      }
      if (result) {
        res.send(result);
      } else {
        res.send("NOT FOUND");
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error");
  }
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = `SELECT * FROM users WHERE user_id = ${id}`;
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Error querying database.");
        return;
      }

      if (result.length === 0) {
        res.status(404).send("User not found.");
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    console.error("Database connection error:", e);
    res.status(500).send("Error connecting to database.");
  }
});

app.post("/register", bodyParser.json(), async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const query = `INSERT INTO users (username,email,password) VALUES ('${username}','${email}','${password}')`;

    db.query(query, (err, result) => {
      if (err) {
        console.error("Error", err);
        res.status(500).send("Errro");
        return;
      }
      if (result) {
        res.send("OK");
      } else {
        res.send("Failed to add user");
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error");
  }
});

app.post("/bet/:type", bodyParser.json(), async (req, res) => {
  const { money, userId } = req.body;
  const type = req.params.type;
  try {
    let query = "";
    switch (type) {
      case "LOST":
        query = `UPDATE game_properties SET total_money_earned = total_money_earned + ${money} WHERE game_id = 36`;
        break;
      case "WON":
        query = `UPDATE game_properties SET total_money_payed_out = total_money_payed_out + ${money} WHERE game_id = 36;
                  UPDATE users SET money = money + ${money} WHERE user_id = ${userId}`;
        break;
      case "ADD":
        query = `UPDATE users SET money = money + ${money} WHERE user_id = ${userId}`;
        break;
      case "START":
        query = `UPDATE users SET money = money - ${money} WHERE user_id = ${userId}`;
        break;
      default:
        query = "";
    }
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error", err);
        res.status(500).send("Error");
        return;
      }
      if (result) {
        res.send("OK");
      } else {
        res.send("Failed to connect to game!");
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
