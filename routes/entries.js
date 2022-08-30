const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/entries', (req, res) => {
	res.send("user working")
})

router.post('/entries', (req, res) => {
	res.send("user working")
})

router.put('/entries', (req, res) => {
	res.send("user working")
})

router.delete('/entries', (req, res) => {
	res.send("user working")
})





module.exports = router