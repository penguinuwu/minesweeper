const play = require('$/lib/game/play');
const spectate = require('$/lib/game/spectate');

const events = (io) => {
  io.on('connect', (socket) => {
    if (socket.handshake.query.action === 'play') {
      play(socket);
    } else if (socket.handshake.query.action === 'spectate') {
      spectate(socket);
    } else {
      socket.emit('status', 'Coming soon!');
      socket.disconnect(true);
    }
  });
};

module.exports = events;
