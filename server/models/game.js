const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema(
  {
    temp: { type: Boolean, default: true, index: true },
    shape: String,                // shape of board (square, hexagon, etc)
    height: Number,
    width: Number,
    bombCount: Number,
    start: { type: Date, default: undefined },
    end: { type: Date, default: undefined },
    turnIndex: Number,            // whos turn is it
    players: Schema.Types.Mixed,  // index of each player { "User.id": Number }
    data: {
      lives: [Number],            // max lives per player index
      flags: [Number],            // flags by player index
      explosions: [Number],       // explosions caused by player index
      bombLocations: [[Number]],
      solved: [[String]],         // solution board
      unsolved: [[String]]        // unsolved board
    }
  },
  { timestamps: true }
);

// delete game if it is temporary
GameSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24,
    partialFilterExpression: { temp: true }
  }
);

const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;
