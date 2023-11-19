//Sequelize
const Sequelize = require('sequelize')

const sequelize = new Sequelize('ecommerce', 'user', '123456789', {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize