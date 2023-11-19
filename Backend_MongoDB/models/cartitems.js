const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItemsSchema = new Schema({

    quantity: {
        type: Number,
        required: false
    },
    cartId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('CartItems', cartItemsSchema)