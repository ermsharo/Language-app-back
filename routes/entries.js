const path = require('path')
const { Op } = require("sequelize");
const express = require('express')
const freeDict = require('../models/FreeDict');
const router = express.Router()



const getNumberOfPages = (count, pageSize) => {

	if (count < pageSize) return 0;
	if (count % pageSize != 0) return (parseInt(count / pageSize))
	return (0)
}

router.get('/entries/en/', async (req, res) => {

	let page = 0;
	let pageSize = 20;

	//All query cenarios
	//Without req query
	let { search, limit } = req.query;
	console.log("params: \nsearch : ", search, " \nlimit : ", limit);


	//Paginate all results and return 


	const { count, rows } = await freeDict.findAndCountAll({
		where: {
			word: {
				[Op.like]: (search != undefined) ? `${search}%` : '%'
			}
		},
		offset: page * pageSize,
		limit: pageSize
	});


	res.send({
		"results": rows.map((item) => {
			return item.word;
		}),
		"totalDocs": count,
		"page": page,
		"totalPages": getNumberOfPages(count, pageSize),
		"hasNext": (page == getNumberOfPages(count, pageSize) ? false : true),
		"hasPrev": (page == 0 ? false : true)
	}
	);
})






module.exports = router