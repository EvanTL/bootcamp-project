const express = require('express')
const { QueryTypes } = require("sequelize")
const sequelize = require("../util/database")
const Carts = require("../models/carts")

//Assignment: carts
//Retreive
const getCart = async(req, res, next) => {
    const cart = await sequelize.query('SELECT * FROM `carts` WHERE `id` = (:id)', {
        replacements: {id: req.params.id},
        type: QueryTypes.SELECT,
        model: Carts,
        mapToModel: true
    })
    return res.status(200).json(cart)
}

const getCarts = async(req, res, next) => {
    const cart = await sequelize.query('SELECT * FROM `carts`', {
        type: QueryTypes.SELECT,
        model: Carts,
        mapToModel: true
    })
    return res.status(200).json(cart)
}

//Add
const createCart = async(req, res, next) => {
    const cart = await sequelize.query('INSERT INTO `carts`(`id`, `createdAt`, `updatedAt`, `userId`) VALUES (DEFAULT, DEFAULT, DEFAULT, :id)', {
        replacements: {id: req.params.id},
        type: QueryTypes.INSERT,
        model: Carts,
        mapToModel: true
    })
    return (
        res.send("Cart Created").json(cart))
}

//Update
const updateCart = async(req, res) => {
    const [results, metadata] = await sequelize.query("UPDATE `carts` SET `userId`=:userId WHERE `id`=:id",{
        replacements: {
            userId: req.body.newUserId,
            id: req.body.cartId,
            type: QueryTypes.UPDATE,
            model: Carts,
            mapToModel: true
        }
    })
    const cart = await sequelize.query("SELECT * FROM `carts` WHERE `id` = :id", {
        replacements: {
            id: req.body.cartId,
            type: QueryTypes.SELECT,
            model: Carts,
            mapToModel: true
        }
    })
    return res.json(cart)
}

//Delete
const deleteCart = async(req, res) => {
    await sequelize.query("DELETE FROM `carts` WHERE `id` =?",{
        replacements: [req.body.cartId],
        type: QueryTypes.DELETE,
        model: Carts,
        mapToModel: true
    })
    return res.send(`Cart Deleted. ID: ${req.body.cartId}`)
}

module.exports = {getCart, getCarts, createCart, updateCart, deleteCart}