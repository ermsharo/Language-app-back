const Sequelize = require('sequelize');
const database = require('./db');

const freeDict = database.define('free_dict', {
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