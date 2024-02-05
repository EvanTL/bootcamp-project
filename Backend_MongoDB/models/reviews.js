const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReviewsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    stars: {type: Number},
    review: {type: String}
})