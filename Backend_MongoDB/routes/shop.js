const express = require('express') //Required for router
const router = express.Router()
const productsController = require('../controllers/product')
const shopController = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')

router.get('/products/search', productsController.getProductsbyFilter)
router.get('/product/:productId', isAuth, productsController.getProductsbyId)
router.get('/categories', shopController.getCategories)
router.post('/cart/add-product', shopController.postCart)
router.get('/cart', shopController.getCart)
router.delete('/cart/delete-product', shopController.deleteCartItem)
router.delete('/cart/clear', shopController.clearCart)

router.get("/",function (req, res){//For request and response. Request on left, response on right

    res.send("Welcome to Koding Akademi!!")
})

module.exports = router