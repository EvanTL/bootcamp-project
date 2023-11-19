//Sequelize model for products
const { Sequelize } = require('sequelize')
const sequelize = require('../util/database.js')

const Category = sequelize.define('category',
{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        // freezeTableName: true : This is used to disable auto-pluralization from sequelize
        // {tableName: 'products' This can be used if the model name and the table name are different}
    }
)

module.exports = Category