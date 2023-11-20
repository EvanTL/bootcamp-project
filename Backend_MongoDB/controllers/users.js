const Users = require('../models/users')

//Get user by ID
exports.getUser = (req, res, next) => {
    const userId = req.params.userId

    Users.findById(userId)
    .select('name email role createdAt _id')
    .then(user => {
        res.json(user)
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getUsers = (req, res, next) => {

    Users.find()
    .select('name email role createdAt _id')
    .then(user => {
        res.json(user)
    }).catch(err => console.log(err))
}

exports.getUserbyQuery = (req, res, next) => {
    //Retreiving specific data with findAll attributes
    const mytitle = req.query.name

    Users.findAll({
        attributes: ['name'],
        where: {
            name: {[Op.like] : `%${mytitle}%`}
        }
    })
    .then(results => {
        res.send({
            data: results,
            total: results.length
        })
        console.log(results)
    })
    .catch(err => console.log(err))
}

//Update user data
exports.postUpdateUser = (req, res, next) => {
    const {newName, newEmail} = req.body
    const userId = req.params.userId

    Users.findById(userId)
    .then(user => {
        user.name = newName,
        user.email = newEmail

        return user.save()
    })
    .then(result => {
        console.log(result)
        res.json({
            status: 200,
            message: "User updated"
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

//Delete user
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId

    Users.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('User not found')
                error.statusCode = 404
            throw error
        }

        return user.deleteOne()
    })
    .then(() => {
        console.log("User Deleted")
        res.status(200).json({
            status: 200,
            message: "User Successfully Deleted"
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}