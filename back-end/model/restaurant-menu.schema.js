const mongoose = require('mongoose');

const RESTAURANT_MENU_SCHEMA = new mongoose.Schema({

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurants',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

const RESTAURANT_MENU_MODEL = new mongoose.model('restaurant_menu', RESTAURANT_MENU_SCHEMA);

module.exports = RESTAURANT_MENU_MODEL;
