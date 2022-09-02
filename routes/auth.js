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
  const getEmailByEmailtext = await User.findOne({ where: { email: atalho } });
  console.log("--->", getEmailByEmailtext.dataValues);

  let isPasswordValid = bcrypt.compareSync(
    atalhoSenha,
    getEmailByEmailtext.password
  );

  console.log("user id", getEmailByEmailtext.id);
  console.log("user email", getEmailByEmailtext.email);
  console.log("user password", getEmailByEmailtext.password);

  console.log("=>", getEmailByEmailtext.email, email);
  if (
    getEmailByEmailtext.email == email &&
    bcrypt.compareSync(atalhoSenha, getEmailByEmailtext.password)
  ) {
    let userId = getEmailByEmailtext.id;
    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: 300,
    });

    return res.status(200).json({
      id: getEmailByEmailtext.id,
      name: getEmailByEmailtext.userName,
      token: token,
    });
  }

  return res.status(400).send("User or password invalid");
});

module.exports = router;
