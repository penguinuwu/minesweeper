const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  // user's games [Game._id]
  games: { type: [Schema.Types.ObjectId], default: [] },
  // user's past [Game._id]
  pastGames: { type: [Schema.Types.ObjectId], default: [] }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
