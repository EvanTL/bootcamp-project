const Product = require('../models/products')

const User = require('../models/users')
const Cart = require('../models/carts')
const CartItem = require('../models/cartitems')
const Orders = require('../models/orders')
const OrderItems = require('../models/orderitems')
const { default: axios } = require('axios')

exports.getCart = (req,res,next) => {

    User.findById(req.user)
    .populate('cart.items.productId')
    .then(result => {
        res.json(result)
    })
}

exports.postCart = (req, res, next) => {
    
    const productId = req.body.productId

    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product)
    })
    .then(result => {
        console.log(result)
        res.json(result)
    })
    .catch(err => console.log(err))
}

exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId

    req.user.deleteCartItem(productId)
    .then(cart => {
        res.json(cart)
    }).catch(err => console.log(err))
}

exports.clearCart = (req, res, next) => {
    req.user.clearCart()
    .then(() => {
        res.send("cart nuked")
    }).catch(err => console.log(err))
}

exports.getCategories = (req, res, next) => {
    axios.get('https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/categories')
    .then(result => {
        res.status(200).json(result.data)
    })
    .catch(err => console.log(err))
    .finally(function() {
        console.log('call category')
    })
}