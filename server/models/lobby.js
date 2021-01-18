const mongoose = require('mongoose');
const { Schema } = mongoose;

const LobbySchema = new Schema(
  {
    // delete lobby if it is temporary
    temp: { type: Boolean, default: true, index: true },
    // 'solo', 'vs', 'coop'
    lobbyType: String,
    // game of each player { 'User.id': 'Game.id' }
    players: Schema.Types.Mixed,
    // ['User.id'] of spectators
    spectators: { type: [String], default: [] }
  },
  { timestamps: true }
);

// delete lobby if it is temporary
LobbySchema.index(
  { createdAt: 1 },
  {
    // keep 2x longer than games
    expireAfterSeconds: 60 * 60 * 24 * 2,
    partialFilterExpression: { temp: true }
  }
);

const LobbyModel = mongoose.model('Lobby', LobbySchema);

module.exports = LobbyModel;
