//Express router in separate files

const express = require('express') //Required for router
const router = express.Router()
const productsController = require('../controllers/product')
const userController = require('../controllers/users')
const shopController = require('../controllers/shop')
const { body, param } = require('express-validator')
const isAuth = require('../middleware/is-auth')
const Products = require('../models/products')
const Users = require('../models/users')
const adminAuth = require('../middleware/admin-auth')

//Final project routing: Products

//This is middleware for post with URL product:
router.post('/add-product',
[
    body('title').trim().isLength({min: 5}),
    body('price').trim().isLength({min: 3}),
    body('price').trim().toInt(),
    isAuth,
    //adminAuth
]
, productsController.postAddProduct) //Create Product

router.post('/update-product/:productId', productsController.updateProduct) //Update Product

router.get('/products', productsController.getProducts) //get products

router.get('/product/:productId', productsController.getProductsbyId) // Get single product

router.use('/delete-product/:productId', productsController.deleteProduct) // Delete products

//Final project routing: Users

//Get users
router.get('/users', userController.getUsers)

//Get Single User
router.get('/user/:userId', userController.getUser)

//Update User
router.post('/update-user/:userId',
[
  body('newEmail').isEmail().withMessage('Please enter a valid email address')
  .normalizeEmail(),

  body('newName').not().isEmpty().withMessage('name cannot be empty'),

  body('newPassword').trim().isLength({min: 5}).withMessage('Password must be at least 5 char')
], userController.postUpdateUser)

//Delete Users
router.delete('/delete-user/:userId', userController.deleteUser)

//Final Project Routing: Orders
router.get('/orders', shopController.getOrders) //getOrders

router.get('/order/:orderId', shopController.adminSingleOrder)

//Raw queries

// router.post('/raw-products', rawQuery)

// router.get('/edit-user-product/:productId', productsController.getEditUserProduct)
//router.get('/user-details/:userId', isAuth, adminAuth, productsController.getProductsbyUser)

module.exports = router