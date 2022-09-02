const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const freeDict = require("../models/FreeDict");
const router = express.Router();

router.post("/auth/singup", (req, res) => {
  console.log("singup req", req.body);
  res.send("user working");
});

module.exports = router;
