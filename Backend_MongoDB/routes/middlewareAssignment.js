const express = require('express') //Required for router
const router = express.Router()
const adminpost = require('./adminpost')

//Middleware assignment:
//Task 2:
router.use('/assignment2',(req, res, next) => {
    console.log('New request')
    next()
},(req, res, next) => {
    res.send("Processing request")
})

//Task 3:
router.use('/posts/:param', (req, res, next) => {
    res.send(`Routing ${req.params.param} success`)
})

//Task 5: Print:
router.get("/print?", (req, res) => {
    res.send(req.query.text)
})

//Task 5: Add:
router.get('/add?', (req, res, next) => {
    const result = Number(req.query.a) + Number(req.query.b)
    res.send(`${result}`)
})

//Routing to task 6:
router.use('/adminpost', adminpost)

//Task 3: Dummy response with '/' mounted on app
router.use('/', (req, res, next) => {
    res.send("Welcome to adminpost")
})

module.exports = router