const express = require('express')
const dotenv = require('dotenv');

dotenv.config();

const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send({
        "message": "Fullstack Challenge 🏅 - Dictionary"
    }
    )
})

const authRoutes = require('./routes/auth')

app.use(authRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


