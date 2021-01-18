const spectate = async (socket) => {
  socket.emit('status', 'Coming soon!');
  return socket.disconnect(true);
};

module.exports = spectate;
