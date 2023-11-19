//Express router in separate files

const express = require('express') //Required for router
const router = express.Router()
const productsController = require('../controllers/product')
const userController = require('../controllers/users')
const { body, param } = require('express-validator')
const isAuth = require('../middleware/is-auth')
const Products = require('../models/products')
const adminAuth = require('../middleware/admin-auth')

//Final project routing: Products

//This is middleware for post with URL product:
router.post('/add-product',
[
    body('title').trim().isLength({min: 5}),
    body('price').trim().isLength({min: 3}),
    body('price').trim().toInt(),
    //isAuth,
    //adminAuth
]
, productsController.postAddProduct) //Create Product

router.post('/update-product/:productId', productsController.updateProduct) //Update Product

router.get('/products', productsController.getProducts) //get products

router.get('/product/:productId', productsController.getProductsbyId) // Get single product

//Final project routing: Users
router.get('/users', userController.getUsers)
//Raw queries

// router.post('/raw-products', rawQuery)
router.use('/delete-product/:productId', productsController.deleteProduct)
// router.get('/edit-user-product/:productId', productsController.getEditUserProduct)
router.get('/user-details/:userId', isAuth, adminAuth, productsController.getProductsbyUser)

module.exports = router