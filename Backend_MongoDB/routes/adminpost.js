const express = require('express')
const router = express.Router()

//Task 6: Adminpost

router.get('/add-post', (req, res, next) => {
    res.send(
        `<form action="/middleassign/adminpost/mypost" method="POST">
        <p>Title</p>
        <input type="text" name="title">
        <p>Description</p>
        <input type="text" name="desc">
        <button type="submit">Submit</button>
        </form>`)
})

router.post('/mypost', (req, res, next) => {
    res.send(`<h2>Here is your post with ${req.body.title} and ${req.body.desc} created</h2>`)
})

module.exports = router