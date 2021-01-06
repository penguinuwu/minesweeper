const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  games: [Schema.Types.ObjectId]    // user's games [Game._id]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
