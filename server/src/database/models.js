const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  games: [Schema.Types.ObjectId],   // user's games [Game._id]
  session: String
});
const UserModel = mongoose.model('User', UserSchema);

const GameSchema = new Schema({
  shape: String,                    // shape of board (square, hexagon, etc)
  height: Number,
  width: Number,
  bombCount: Number,
  start: Date,
  end: Date,
  players: [Schema.Types.ObjectId], // [User._id]
  lobbys: [Schema.Types.ObjectId],  // [Lobby._id]
  data: {
    lives: Schema.Types.Mixed,      // max lives per user { User._id: Number }
    explosions: Schema.Types.Mixed, // explosions per user { User._id: Number }
    bombLocations: [[Number]],
    solved: [[String]],
    unsolved: [[String]]
  }
});
const GameModel = mongoose.model('Game', GameSchema);

const LobbySchema = new Schema({
  games: [Schema.Types.ObjectId]    // User.id
});
const LobbyModel = mongoose.model('Lobby', LobbySchema);

module.exports = {
  User: UserModel,
  Game: GameModel,
  Lobby: LobbyModel
};
