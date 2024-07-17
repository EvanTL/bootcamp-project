const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../models/users')

exports.signup = (req, res, next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Signup Validation Failed')
        error.statusCode = 530
        error.message = errors.array()[0].msg
        throw error
    }

    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

    bcrypt.hash(password, 10) //This is an async function, threfore we use .then to continue
    .then(hashedPass => {
        const user = new Users({
            name: name,
            email: email,
            password: hashedPass,
        })

        return user.save()
    })
    .then(result => {
        res.status(201).json({
            message: "Signup success",
            userId: result._id
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }   

        next(err)
    })
}

exports.login = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Signup Validation Failed')
        error.statusCode = 530
        error.message = errors.array()[0].msg
        throw error
    }

    const {email, password} = req.body

    let loadedUser

    Users.findOne({email: email})
    .then(user => {
        if(!user){
            const error = new Error('User not found')
            error.statusCode = 531
            throw error
        }

        loadedUser = user
        
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Wrong password')
            error.statusCode = 532
            throw error
        }

        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'secretstatuscode',
            {expiresIn: '12h'}
        )
        res.status(200).json({
            token: token,
            message: "Login success",
            userId: loadedUser._id.toString(),
            userdata: {
                name: loadedUser.name,
                email: loadedUser.email
            }
        })
    }).catch(err => {
        console.log(err)
        if(!err.statusCode){
            err.statusCode = 500
        }

        next(err)
    })
}