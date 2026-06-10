const express = require("express");
const pool = require("../db");

const router = express.Router();


// CREATE TICKET (Student)
router.post("/", async (req, res) => {
  try {
    const { title, description, created_by } = req.body;

    const result = await pool.query(
      "INSERT INTO tickets (title, description, created_by) VALUES ($1, $2, $3) RETURNING *",
      [title, description, created_by]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET TICKETS (Student - own tickets)
router.get("/user/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets WHERE created_by = $1",
      [req.params.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL TICKETS (Staff)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE STATUS (Staff)
router.put("/:id", async (req, res) => {
  try {
    const { status, reply } = req.body;

    const result = await pool.query(
      "UPDATE tickets SET status = $1, reply = $2 WHERE id = $3 RETURNING *",
      [status, reply, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;