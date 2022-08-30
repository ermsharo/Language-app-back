const Sequelize = require('sequelize');
const database = require('./../db');

const favoritesLog = database.define('favorites_log', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    word_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    created_time: {
        type:Sequelize.DATE,
    },
    update_time: {
        type:Sequelize.DATE,
    }
})