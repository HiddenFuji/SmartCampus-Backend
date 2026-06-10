const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Campus API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});