const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema(
  {
    temp: { type: Boolean, default: true, index: true },
    shape: String,                    // shape of board (square, hexagon, etc)
    height: Number,
    width: Number,
    bombCount: Number,
    start: { type: Date, default: undefined },
    end: { type: Date, default: undefined },
    players: [Schema.Types.ObjectId], // [User._id]
    lobbys: [Schema.Types.ObjectId],  // [Lobby._id]
    data: {
      lives: Schema.Types.Mixed,      // max lives per user { User._id: Number }
      explosions: Schema.Types.Mixed, // explosions per user { User._id: Number }
      bombLocations: [[Number]],
      solved: [[String]],             // solution board
      unsolved: [[String]]            // unsolved board
    }
  },
  { timestamps: true }
);

// delete game if it is temporary
GameSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 1000 * 60 * 60 * 24,
    partialFilterExpression: { temp: true }
  }
);

const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;
