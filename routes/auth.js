const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/auth', (req, res) => {
	res.send("auth working")
})

module.exports = router