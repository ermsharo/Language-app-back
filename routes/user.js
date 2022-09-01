const path = require("path");

const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  req = {};
  res.send("user working");
});

module.exports = router;
