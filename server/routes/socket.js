
const events = (io) => {
  // make a move
  const makeMove = require('../bin/play/move');
  io.on('move', makeMove);
}

module.exports = events;
