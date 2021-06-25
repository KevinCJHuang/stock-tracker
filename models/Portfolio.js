const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  symbol: {
    type: String,
    required: true,
  },
  numShares: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "stock"
  }
}, {"strict": false });
UserSchema.index({ "user": 1, "symbol": 1}, { "unique": true });
module.exports = mongoose.model('portfolio', UserSchema);
