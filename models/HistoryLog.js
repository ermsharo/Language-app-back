const Sequelize = require("sequelize");
const database = require("../database/connection");

const historyLog = database.define("HISTORY_LOGS", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  word_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  word: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = historyLog;
