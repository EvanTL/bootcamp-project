const express = require('express') //Required for router
const router = express.Router()
const { body } = require('express-validator')
const Users = require('../models/users')
const authController = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

router.post('/signup',
[
    body('email').isEmail().withMessage('Please enter a valid email address')
    .custom((value, {req}) => {
      return Users.findOne({email : value})
      .then(userDoc => {
        if(userDoc){
            return Promise.reject('Email already exists')
        }
      })  
    })
    .normalizeEmail(),

    body('password').trim().isLength({min: 5}).withMessage('Password must be at least 5 char'),

    body('name').not().isEmpty().withMessage('name cannot be empty')
],
authController.signup
)

router.post('/login', [
    body('email').isEmail().withMessage("Please enter a valid email address"),

    body('password').trim().isLength({min: 5}).withMessage('Password must be at least 5 char')

], authController.login)

router.post('/change-password', isAuth, authController.changePassword)

module.exports = router