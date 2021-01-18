const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  // user's lobbys ["Lobby.id"]
  lobbys: { type: [String], default: [] },
  // user's past ["Lobby.id"]
  pastLobbys: { type: [String], default: [] }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
