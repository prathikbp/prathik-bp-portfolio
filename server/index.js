const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact received:", { name, email, message });
  res.status(200).json({ msg: "Message received!" });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
