const express = require('express') //Required for router
const router = express.Router()
const userController = require('../controllers/users')
const { getCart, createCart, updateCart, deleteCart } = require('../controllers/carts')

//Users
router.post('/add-user', userController.postAddUser)
router.get('/user/:id', userController.getUser)
router.get('/user/search', userController.getUserbyQuery)
router.get('/user', userController.getUsers)
router.post('/update-user', userController.postUpdateUser)
router.delete('/delete-user', userController.deleteUser)

//Carts
router.get('/cart/:id', getCart)
router.post('/cart/:id', createCart)
router.post('/update-cart', updateCart)
router.delete('/delete-cart', deleteCart)


module.exports = router