const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/history', (req, res) => {
	res.send("entries working")
})

module.exports = router