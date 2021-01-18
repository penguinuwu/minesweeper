const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  // user's games ["Game.id"]
  games: { type: [String], default: [] },
  // user's past ["Game.id"]
  pastGames: { type: [String], default: [] }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
