const mongoose = require("mongoose");

const roles = ['customer', 'owner', 'admin'];
const USER_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return roles.includes(v);
      },
      message: "Please enter valid role for the user!!"
    }
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const USER_MODEL = new mongoose.model('restaurant_users', USER_SCHEMA);

module.exports = USER_MODEL;