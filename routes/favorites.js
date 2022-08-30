const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/favorites', (req, res) => {
	res.send("entries working")
})

module.exports = router