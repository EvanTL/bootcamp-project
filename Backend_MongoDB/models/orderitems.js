const { Sequelize, Model } = require('sequelize')
const sequelize = require('../util/database.js')

const OrderItems = sequelize.define('orderitems', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = OrderItems