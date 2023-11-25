//MongoDB model for products
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
{
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            allowNull: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        company: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: true
        },
        colors: {
            type: [String],
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: false
        },
        stars: {
            type: String,
            required: false
        },
        stock: {
            type: String,
            required: false
        },
        featured: {
            type: Boolean,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        shipping: {
            type: Boolean,
            required: false
        },
    }
)

module.exports = mongoose.model('Product', productSchema)