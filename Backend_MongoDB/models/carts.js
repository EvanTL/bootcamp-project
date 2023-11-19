const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartsSchema = new Schema(
{
    userId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Carts', cartsSchema)