const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

     const authHeader = req.get('Authorization')

     if(!authHeader){
         const error = new Error('Not Authenticated')
         error.statusCode = 600
         throw error
     }

    const token = authHeader.split(' ')[1]
    // const token = req.cookies.token

    let decodedToken
    try{
        decodedToken = jwt.verify(token, 'secretstatuscode')
    }catch(err){
        err.statusCode = 500
        throw err
    }

    if(!decodedToken){
        const error = new Error('Not Authenticated')
        error.statusCode = 601
        throw error
    }

    req.userId = decodedToken.userId
    next()
}