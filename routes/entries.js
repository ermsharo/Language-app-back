const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/entries', (req, res) => {
	res.send("entries working")
})

module.exports = router