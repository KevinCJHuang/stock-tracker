const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    default: 'stock',
  },
});

module.exports = mongoose.model('watchlist', UserSchema);
