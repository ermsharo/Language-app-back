const { Op } = require("sequelize");
const express = require("express");
const User = require("../models/User");
const HistoryLog = require("../models/HistoryLog");
const FavoritesLog = require("../models/FavoritesLog");
const router = express.Router();
const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
}

router.get("/user/me", verifyJWT, async (req, res) => {
  let genericUser = "emilio";
  const getUserByUsername = await User.findOne({
    where: { username: genericUser },
  });
  if (getUserByUsername !== null) {
    const userByUsername = getUserByUsername.dataValues;
    return res.status(200).json({
      id: userByUsername.id,
      username: userByUsername.userName,
      email: userByUsername.email,
    });
  }

  res.status(401).send("user not find");
});

const getNumberOfPages = (count, pageSize) => {
  if (count < pageSize) return 0;
  if (count % pageSize != 0) return parseInt(count / pageSize);
  return 0;
};

const getUserByBody = () => {};

const getFavoritesByUserId = async (userId) => {
  const { rows } = await FavoritesLog.findAndCountAll({
    where: {
      user_id: userId,
    },
  });

  // filter just the words
  let favoritedWords = rows.map(function (value) {
    return value.word;
  });

  return favoritedWords;
};
const verifyIsFavorited = (favoritedWords, word) => {
  return favoritedWords.includes(word);
};

router.get("/user/me/history", verifyJWT, async (req, res) => {
  let genericUserId = 1;
  let pageSize = 20;
  let { page } = req.query;

  const { count, rows } = await HistoryLog.findAndCountAll({
    where: {
      user_id: genericUserId,
    },
    offset: page * pageSize,
    limit: pageSize,
  });

  let favoritedWords = await getFavoritesByUserId(1);

  return res.send({
    results: rows.map((item) => {
      return {
        word: item.word,
        isFavorite: verifyIsFavorited(favoritedWords, item.word),
      };
    }),
    totalDocs: count,
    page: page,
    totalPages: getNumberOfPages(count, pageSize),
    hasNext: page == getNumberOfPages(count, pageSize) ? false : true,
    hasPrev: page == 0 ? false : true,
  });
});

router.get("/user/me/favorites", verifyJWT, async (req, res) => {
  console.log("singup req", req.body);
  let genericUserId = 1;
  let pageSize = 20;

  let { page } = req.query;

  const { count, rows } = await FavoritesLog.findAndCountAll({
    where: {
      user_id: genericUserId,
    },
    offset: page * pageSize,
    limit: pageSize,
  });

  return res.send({
    results: rows.map((item) => {
      return { word: item.word, isFavorite: true };
    }),
    totalDocs: count,
    page: page,
    totalPages: getNumberOfPages(count, pageSize),
    hasNext: page == getNumberOfPages(count, pageSize) ? false : true,
    hasPrev: page == 0 ? false : true,
  });
});

module.exports = router;
