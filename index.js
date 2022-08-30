const express = require('express')
const dotenv = require('dotenv');const authRoutes = require('./routes/auth')
const wordsRoutes = require('./routes/words')
const favoritesRoutes = require('./routes/favorites')
const historyRoutes = require('./routes/history')
const db = require('./database/connection')
dotenv.config();

const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send({
        "message": "Fullstack Challenge 🏅 - Dictionary"
    }
    )
})

//Database connection

db
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log("DB connection error :", err)
  })


//Routes
app.use(authRoutes);
app.use(wordsRoutes);
app.use(favoritesRoutes);
app.use(historyRoutes);

app.listen(port, () => {



    console.log(`Example app listening on port ${port}`)
})


