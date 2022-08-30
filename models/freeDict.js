const Sequelize = require('sequelize');
const database = require('./../db');

const freeDictWords = database.define('free_dict_words', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    word: {
        type: Sequelize.STRING,
        allowNull: false
    },
})