const { Op } = require("sequelize");
const express = require("express");
const freeDict = require("../models/FreeDict");
const historyLog = require("../models/HistoryLog");
const favoritesLog = require("../models/FavoritesLog");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios").default;

//Midlewere function

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

const getNumberOfPages = (count, pageSize) => {
  if (count < pageSize) return 0;
  if (count % pageSize != 0) return parseInt(count / pageSize);
  return 0;
};

router.get("/entries/en/", verifyJWT, async (req, res) => {

  let pageSize = 50;
  //const page = req.body["page"];

  //All query cenarios
  //Without req query
  console.log("page here ", req.body.page);
  let { search, limit, page } = req.query;
  console.log("params: \nsearch : ", search, " \nlimit : ", limit, "\n page: ", page);

  //Paginate all results and return

  const { count, rows } = await freeDict.findAndCountAll({
    where: {
      word: {
        [Op.like]: search != undefined ? `${search}%` : "%",
      },
    },
    offset: page * pageSize,
    limit: pageSize,
  });

  res.send({
    results: rows.map((item) => {
      return item.word;
    }),
    totalDocs: count,
    page: page,
    totalPages: getNumberOfPages(count, pageSize),
    hasNext: page == getNumberOfPages(count, pageSize) ? false : true,
    hasPrev: page == 0 ? false : true,
  });
});


const addWordToHistory = async (wordId, word, userId) => {
  //Inserting this word in historic

  const [row, created] = await historyLog.findOrCreate({
    where: {
      word: word,
      user_id: userId,
      word_id: wordId,
    },
  });

  if (created) {
    console.log("Insert word -> ", row);
    return {
      status: 200,
      message: "successful add in history",
    };
  }

  return {
    status: 200,
    message: "this word alredy stay in history",
  };
};

router.get("/entries/en/:word", async (req, res) => {
  //The user id need to be presents en request body
  //The word id from the list of words also need to stay in body

  //We will need to get re response of FREE Dictionary api for this word
  const word = req.params.word;
  let testeUserId = 1;
  let testeWordId = 1;
  //console.log("body ->", req.body);
  const freeDictWordUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.replace(
    /\s/g,
    "+"
  )}`;

  axios
    .get(freeDictWordUrl)
    .then(async function (response) {
      // handle success
      //console.log("success", response.data)

      const insertionWordInHistory = await addWordToHistory(
        testeWordId,
        word,
        testeUserId
      );

      // console.log("Insert here -> -> ->", insertionWordInHistory);
      return res.status(insertionWordInHistory.status).json({
        awnser: insertionWordInHistory.message,
        freeDict: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return res.status(400).send(error);
    });
});


const removeWordToFavorites = async (wordId) => {
  //Remove word from favorites

  let remove = await favoritesLog.destroy({
    where: {
      wordId: wordId
    }
  });


  return {
    status: 200,
    message: "word removed from favorites",
  };
};


const addWordToFavorites = async (wordId, word, userId) => {
  //Inserting this word in historic

  const [row, created] = await favoritesLog.findOrCreate({
    where: {
      word: word,
      user_id: userId,
      word_id: wordId,
    },
  });

  if (created) {
    console.log("Insert word -> ", row);
    return {
      status: 200,
      message: "successful add in favorites",
    };
  }

  return {
    status: 200,
    message: "this word alredy is in favorites",
  };
};


router.post("/entries/en/:word/favorite", async (req, res) => {

  const word = req.params.word;
  let testeUserId = 1;
  let testeWordId = 1;


  const insertionWordInFavorites = await addWordToFavorites(
    testeWordId,
    word,
    testeUserId
  );


  return res.status(insertionWordInFavorites.status).json({
    awnser: insertionWordInFavorites.message,
  });


});


router.delete("/entries/en/:word/unfavorite", async (req, res) => {

  let testeWordId = 1;

  const insertionWordInFavorites = await removeWordToFavorites(
    testeWordId,
  );


  return res.status(insertionWordInFavorites.status).json({
    awnser: insertionWordInFavorites.message,
  });
});

module.exports = router;
