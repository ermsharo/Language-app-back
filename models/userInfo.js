const Sequelize = require('sequelize');
const database = require('./../db');

const userInfo = database.define('user_info', {
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
        type: Sequelize.DATE,
    },
    update_time: {
        type: Sequelize.DATE,
    }
})