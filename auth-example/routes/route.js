const express = require("express");
const router = express.Router();

const users = [
  { username: "user1", password: "password123", role: "user" },
  { username: "admin", password: "admin123", role: "admin" },
];

// router.get("/users", (req, res) => {
//   res.json(users);
// });

module.exports = router;
