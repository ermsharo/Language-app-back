const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const entriesRoutes = require("./routes/entries");

const db = require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
dotenv.config();

require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT;
app.use(jsonParser);
app.use(cors());
app.get("/", (req, res) => {
  res.send({
    message: "Fullstack Challenge 🏅 - Dictionary",
  });
});

//Database connection

db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB connection error :", err);
  });

//Routes
app.use(authRoutes);
app.use(entriesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
