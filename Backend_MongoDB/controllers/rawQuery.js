const express = require('express') //Required for router
const { Sequelize } = require("sequelize")
const sequelize = require("../util/database")

const rawQuery = async(req, res, next) => {
    const [results, metadata] = await sequelize.query("UPDATE `products` SET `price`='50000' WHERE `id`= 24")
    const product = await sequelize.query("SELECT * FROM `products` WHERE `id` = 24")
    
    return res.json(product)
}

module.exports = rawQuery