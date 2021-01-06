const mongoose = require('mongoose');
const { Schema } = mongoose;

const LobbySchema = new Schema({
  games: [Schema.Types.ObjectId]    // User.id
});

const LobbyModel = mongoose.model('Lobby', LobbySchema);

module.exports = LobbyModel;
