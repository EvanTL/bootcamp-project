const Users = require('../models/users')

module.exports = (req, res, next) => {
    Users.findById(req.userId)
    .then(user => {
        if(user.role !== 'admin'){
            const error = new Error('Unauthorized')
            error.statusCode = 401
            throw error
        }
        next()
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}