const mongoose = require('mongoose');
const CART_SCHEMA = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'restaurant_users'
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'restaurants'
  },
  items: {
    type: [{
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'restaurant_menu'
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
}, { timestamps: true });

const CART_MODEL = new mongoose.model('carts', CART_SCHEMA);

module.exports = CART_MODEL;