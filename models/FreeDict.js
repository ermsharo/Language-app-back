const Sequelize = require("sequelize");
const database = require("../database/connection");

const freeDictWords = database.define("FREE_DICT_WORDS", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  word: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = freeDictWords;
