const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const freeDict = require("../models/FreeDict");
const router = express.Router();

//Route from a external service insert words in your database
router.post("/free-dict/:word", async (req, res) => {
  //We will need to get re response of FREE Dictionary api for this word
  const word = req.params.word;
  const freeDictWordUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.replace(
    /\s/g,
    "+"
  )}`;

  axios
    .get(freeDictWordUrl)
    .then(async function (response) {
      //Case of this word exist in dictionart-api
      await WordList.create({
        word: arrayItem,
      });

      return res.status(200).json({
        awnser: `word ${word} insert in database`,
      });
    })
    .catch(function (error) {
      console.log(error);
      return res.status(400).send(error);
    });
});

module.exports = router;
