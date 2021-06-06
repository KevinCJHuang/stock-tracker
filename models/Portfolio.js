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
  numShares: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('portfolio', UserSchema);
