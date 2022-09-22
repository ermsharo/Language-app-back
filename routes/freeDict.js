const path = require("path");
const { Op } = require("sequelize");
const express = require("express");
const freeDict = require("../models/FreeDict");
const router = express.Router();
const axios = require("axios").default;
const fs = require('fs/promises');

const addWordToWordList = async (word, wordId) => {
  //Inserting this word in historic

  const [row, created] = await historyLog.findOrCreate({
    where: {
      word: word,
      user_id: userId,
      word_id: wordId,
    },
  });

  if (created) {
    // console.log("Insert word -> ", row);
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


const getFreeDictWordUrl = (word) => {
  return freeDictWordUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.replace(
    /\s/g,
    "+"
  )}`;
}
//Route from a external service insert words in your database
router.get("/free-dict/fill-db", async (req, res) => {

  let wordsArrays;

  console.log("Status here");
  try {
    const data = await fs.readFile('english.txt', { encoding: 'utf8' });
    wordsArrays = data.toString().split("\n");
    let totalWordFound = 0;
    let totalWordNotFound = 0;
    let ga = ["file", "person", "dog", "asdasdasdasdasdasd"];

    for (let i = 1; i <= ga.length; i++) {

      axios
        .get(getFreeDictWordUrl(ga[i]))
        .then(async function (response) {
          //console.log("Response here", response);
          totalWordFound++;
          console.log("Word founded", totalWordFound);
          console.log("Words not founded", totalWordNotFound);

        })
        .catch(function (error) {

          totalWordNotFound++;
          console.log("Word founded", totalWordFound);
          console.log("Words not founded", totalWordNotFound);

          console.log(error);

        });

    };



  } catch (err) {
    console.log(err);
  }


  return res.status(200).send("Percorrido com sucesso")

  // axios
  //   .get(freeDictWordUrl)
  //   .then(async function (response) {
  //     //Case of this word exist in dictionart-api
  //     await freeDict.create({
  //       word: word,
  //     });

  //     return res.status(200).json({
  //       awnser: `word ${word} insert in database`,
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     return res.status(400).send(error);
  //   });
});

module.exports = router;
