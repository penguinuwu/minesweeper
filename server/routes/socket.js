const playGame = require('../bin/play/playSocket');

const events = (io) => {
  io.on('connect', (socket) => {
    if (socket.handshake.query.action === 'play') {
      playGame(socket);
    } else {
      socket.emit('status', 'Coming soon!');
      socket.disconnect(true);
    }
  });
};

module.exports = events;
