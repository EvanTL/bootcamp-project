const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    role: {

      type: String,
      
      enum: ['admin', 'user'],
      
      default: 'user',
      
      },
},
{ timestamps: true }
)

usersSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
  
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];
  
    if (cartProductIndex >= 0) {
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQty,
      });
    }
  
    const updatedCart = {
      items: updatedCartItems,
    };
  
    this.cart = updatedCart;
    return this.save();
  };

  usersSchema.methods.deleteCartItem = function (productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
  
    const updatedCart = {
      items: updatedCartItems,
    };
  
    this.cart = updatedCart;
    return this.save();
  };
  
  usersSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
  };

module.exports = mongoose.model("Users", usersSchema)