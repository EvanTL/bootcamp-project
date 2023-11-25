const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema( {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            amount: {
                type: Number
            },
            color: {
                type: String
            }
        }
    ],
    delivery: {
        address: {type: String},
        city: {type: String},
        postal_code: {type: String},
        country: {type: String}
    }
});

module.exports = mongoose.model("Orders", OrderSchema)