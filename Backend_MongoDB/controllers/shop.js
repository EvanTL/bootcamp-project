const Product = require('../models/products')
const Order = require("../models/orders")

const Users = require('../models/users')
const { default: axios } = require('axios')

exports.createOrder = (req, res, next) => {
    const userId = req.userId
    const user = JSON.parse(req.body.user)
    const items = JSON.parse(req.body.items)
    const delivery = JSON.parse(req.body.delivery)

    const order = new Order({
        userId: userId,
        items: items,
        userData: user,
        delivery: delivery
    })
    
    order.save()
    .then((result) => {
        console.log(result)
        res.status(201).json("Order Successfully created")
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getOrdersbyUser = (req, res, next) => {
    const userId = req.userId

    Order.find({userId: userId})
    .then(orders => {
        res.json(orders)
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

//The Following APIs are unused for the time being

// exports.getCart = (req,res,next) => {

//     Users.findById(req.users)
//     .populate('cart.items.productId')
//     .then(result => {
//         res.json(result)
//     }).catch(err => {
//         if(!err.statusCode){
//             err.statusCode = 500
//         }
//         next(err)
//     })
// }

// exports.postCart = (req, res, next) => {
    
//     const productId = req.body.productId

//     Product.findById(productId)
//     .then(product => {
//         return req.users.addToCart(product)
//     })
//     .then(result => {
//         console.log(result)
//         res.json(result)
//     })
//     .catch(err => {
//         if(!err.statusCode){
//             err.statusCode = 500
//         }
//         next(err)
//     })
// }

// exports.deleteCartItem = (req, res, next) => {
//     const productId = req.body.productId

//     req.users.deleteCartItem(productId)
//     .then(cart => {
//         res.json(cart)
//     }).catch(err => {
//         if(!err.statusCode){
//             err.statusCode = 500
//         }
//         next(err)
//     })
// }

// exports.clearCart = (req, res, next) => {
//     req.users.clearCart()
//     .then(() => {
//         res.send("cart nuked")
//     }).catch(err => console.log(err))
// }

// exports.getCategories = (req, res, next) => {
//     axios.get('https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/categories')
//     .then(result => {
//         res.status(200).json(result.data)
//     })
//     .catch(err => console.log(err))
//     .finally(function() {
//         console.log('call category')
//     })
// }