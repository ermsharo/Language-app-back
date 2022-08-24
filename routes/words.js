const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/words', (req, res) => {
	res.send("words working")
})

module.exports = router