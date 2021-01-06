const mongoose = require('mongoose');
const { Schema } = mongoose;

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

module.exports = GameModel;
