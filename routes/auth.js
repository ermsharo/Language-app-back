const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/auth', (req, res) => {
	res.send("user working")
})

router.post('/auth', (req, res) => {
	res.send("user working")
})

router.put('/auth', (req, res) => {
	res.send("user working")
})

router.delete('/auth', (req, res) => {
	res.send("user working")
})





module.exports = router