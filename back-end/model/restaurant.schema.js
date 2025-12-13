const { default: mongoose } = require("mongoose");

const RESTAURANT_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    minlength: 10
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant_users'
  },
  cuisineTypes: {
    type: [String],
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: true,
    validate: {
      validator: (value) => {
        return value >= 0 && value <= 10;
      },
      message: "Enter valid rating for Restaurant!!"
    }
  }
}, { timestamps: true });

const RESTAURANT_MODEL = new mongoose.model('restaurants', RESTAURANT_SCHEMA);

module.exports = RESTAURANT_MODEL;