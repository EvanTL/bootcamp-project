const express = require('express') //Required for router
const router = express.Router()
const productsController = require('../controllers/product')
const shopController = require('../controllers/shop')
const userController = require('../controllers/users')
const isAuth = require('../middleware/is-auth')

//Final Project routing: Products
router.get('/products', productsController.getProducts)
router.get('/products/search', productsController.getProductsbyFilter)
router.get('/product/:productId', productsController.getProductsbyId)
// router.get('/categories', shopController.getCategories)

//Final Project routing: Orders
router.get('/user', isAuth, userController.getUserShop)
router.get('/orders', isAuth, shopController.getOrdersbyUser)
router.post('/create-order', isAuth, shopController.createOrder)

//Final Project routing: Carts(Unused for the time being)
// router.post('/cart/add-product', isAuth, shopController.postCart)
// router.get('/cart', shopController.getCart)
// router.delete('/cart/delete-product', shopController.deleteCartItem)
// router.delete('/cart/clear', shopController.clearCart)

router.get("/",function (req, res){//For request and response. Request on left, response on right

    res.send("Welcome to Koding Akademi!!")
})

module.exports = router