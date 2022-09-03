const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv-safe").config();

const jwt = require("jsonwebtoken");

router.post("/auth/singup", async (req, res) => {
	console.log("singup req", req.body.formInputs);

	const { user, email, password, passwordCheck } = req.body.formInputs;
	console.log("->", user, email, password, passwordCheck);

	if (!(email && password && user && passwordCheck)) {
		return res.status(400).send("Form data is missing");
	}

	if (password != passwordCheck)
		return res.status(400).send("Password check is diferent from password");

	const getUserByUsername = await User.findOne({ where: { userName: user } });
	if (getUserByUsername === null) {
		//This username is free for use
		const getEmailByEmailtext = await User.findOne({ where: { email: email } });
		if (getEmailByEmailtext === null) {
			encryptedPassword = await bcrypt.hash(password, 10);

			const userCreated = await User.create({
				userName: user,
				email: email.toLowerCase(),
				password: encryptedPassword,
			});

			//console.log("User created", userCreated);
			return res.status(200).send("User susseful created");
		} else {
			return res
				.status(400)
				.send("Alredy exist a acoount with this email adrress");
		}
	} else {
		return res.status(400).send("Alredy exist a acoount with this username");
	}

	return res.send("singup working");
});


router.post("/auth/singin", async (req, res) => {
	console.log("singin req", req.body);
	const { email, password } = req.body.formInputs;
	console.log("->", email, password);
	let atalho = "emilio@mail.com";
	let atalhoSenha = "abc123";
	const getUserByMail = await User.findOne({ where: { email: atalho } });


	const userByMail = getUserByMail.dataValues;
	console.log("---> user obj", userByMail);
	let isPasswordValid = bcrypt.compareSync(
		atalhoSenha,
		userByMail.password
	);

	console.log("user id", userByMail.id);
	console.log("user email", userByMail.email);
	console.log("user password", userByMail.password);

	console.log("=>", userByMail.email, email);
	if (
		userByMail.email == email &&
		bcrypt.compareSync(password, userByMail.password)
	) {
		let userId = userByMail.id;
		const token = jwt.sign({ userId }, process.env.SECRET, {
			expiresIn: 300,
		});

		return res.status(200).json({
			id: userByMail.id,
			name: userByMail.userName,
			token: token,
		});
	}

	return res.status(400).send("User or password invalid");
});

module.exports = router;
