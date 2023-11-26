const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema( {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    userData: [{
        name: {
            type: String
        },
        email: {type: String},
        payment: {type: String}
    }],
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            name: {type: String},
            price: {type: Number},
            amount: {
                type: Number
            },
            color: {
                type: String
            },
            image: {type: String}
        }
    ],
    totalpay: [{
        subtotal: {type: Number},
        shipping: {type: Number},
        tax: {type: Number},
    }],
    delivery: [{
        address: {type: String},
        city: {type: String},
        postal_code: {type: String},
        country: {type: String}
    }]
},
{ timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema)