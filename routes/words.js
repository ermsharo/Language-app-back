const path = require('path')

const express = require('express')
const router = express.Router()
const database = require('./../db');

router.get('/words', (req, res) => {
	(async () => {
		try {
			const resultado = await database.sync();
			console.log(resultado);
			res.send(resultado)
		} catch (error) {
			console.log(error);
		}
	})();
})

module.exports = router