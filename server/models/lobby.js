const mongoose = require('mongoose');
const { Schema } = mongoose;

const LobbySchema = new Schema({
  games: [String] // ["User.id"]
});

const LobbyModel = mongoose.model('Lobby', LobbySchema);

module.exports = LobbyModel;
