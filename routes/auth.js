const { Op } = require("sequelize");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv-safe").config();

const jwt = require("jsonwebtoken");

router.post("/auth/singup", async (req, res) => {
  const { user, email, password, passwordCheck } = req.body.formInputs;

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


      return res.status(200).send("User susseful created");
    } else {
      return res
        .status(400)
        .send("Alredy exist a acoount with this email adrress");
    }
  } else {
    return res.status(400).send("Alredy exist a acoount with this username");
  }
});

router.post("/auth/singin", async (req, res) => {

  const { email, password } = req.body.formInputs;
  const getUserByMail = await User.findOne({ where: { email: email } });
  const userByMail = getUserByMail.dataValues;
  if (
    userByMail.email == email &&
    bcrypt.compareSync(password, userByMail.password)
  ) {
    let userId = userByMail.id;
    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: 3600,
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
