const mongoose = require('mongoose');

const ORDER_SCHEMA = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant_users',
    required: true
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
      nameSnapshot: {
        type: String,
        required: true
      },
      priceSnapshot: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    validate: (value) => {
      const orderStatus = ['pending', 'accepted', 'rejected', 'preparing', 'out_for_delivery', 'completed', 'cancelled'];
      return orderStatus.includes(orderStatus);
    },
    message: 'Not Valide Order Status!!'
  }
}, { timestamps: true });

const ORDER_MODEL = new mongoose.model('orders', ORDER_SCHEMA);

module.exports = ORDER_MODEL;