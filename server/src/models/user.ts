const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  // user's lobbies ["Lobby.id"]
  lobbies: { type: [String], default: [] },
  // user's past ["Lobby.id"]
  pastLobbies: { type: [String], default: [] }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
