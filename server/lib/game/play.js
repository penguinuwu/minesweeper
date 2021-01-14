const User = require('$/models/user');
const Game = require('$/models/game');
const { isInteger } = require('$/bin/game/helpers');
const {
  nextTurn,
  reveal,
  flag,
  checkGameEnd,
  getGame,
  getResults
} = require('$/bin/game/square/actions');

const findGame = async (gameID) => {
  if (!gameID) return null;
  try {
    return await Game.findById(gameID).exec();
  } catch (err) {
    return null;
  }
};

const findUser = async (userID) => {
  if (!userID) return null;
  try {
    return await User.findById(userID).exec();
  } catch (err) {
    return null;
  }
};

const play = async (socket) => {
  const passport = socket.request.session.passport;
  const query = socket.handshake.query;

  // store userID and gameID
  const userID = passport ? passport.user : 'temp';
  const gameID = query.gameID;

  // get game from database
  const game = await findGame(gameID);
  if (!game) {
    socket.emit('status', 'Game cannot be found.');
    return socket.disconnect(true);
  }

  // verify user
  const userIndex = game.players[userID];
  if (!isInteger(userIndex)) {
    socket.emit('status', 'You cannot access this game.');
    return socket.disconnect(true);
  }

  // emit results if game has ended
  if (game.end) {
    socket.emit('results', getResults(game));
    return socket.disconnect(true);
  }

  // game connection success
  socket.emit('update', getGame(userIndex, game));
  socket.emit('status', 'Success.');

  socket.on('start', async () => {
    if (game.end) {
      socket.emit('status', 'Game has already ended.');
      socket.emit('results', getResults(game));
      return socket.disconnect(true);
    } else if (game.start) {
      return socket.emit('status', 'Game has already started.');
    }
    // set start time
    game.start = Date.now();

    // set turn to current user
    game.turnIndex = userIndex;

    // reveal top left corner
    for (let [r, v] of [
      [0, 0],
      [0, 1],
      [1, 0]
    ])
      reveal(r, v, game);

    try {
      await game.save();
    } catch (err) {
      socket.emit('status', 'Error: cannot start game.');
      return socket.disconnect(true);
    }

    socket.emit('status', 'Success.');
    socket.emit('update', getGame(userIndex, game));
  });

  socket.on('move', async (moves) => {
    if (game.end) {
      socket.emit('status', 'Game has already ended.');
      socket.emit('results', getResults(game));
      return socket.disconnect(true);
    } else if (game.turnIndex !== userIndex) {
      return socket.emit('status', 'It is not your turn.');
    } else {
      let success = null;
      if (moves.action === 'reveal') {
        success = reveal(moves.row, moves.col, game);
      } else if (moves.action === 'flag') {
        success = flag(moves.row, moves.col, game);
      }
      socket.emit('status', 'Success.');

      // if move did not succeed, do not update
      if (!success) return;

      // go to next player's turn
      nextTurn(game);

      // possibly end the game
      let end = checkGameEnd(game);

      // save game
      try {
        await game.save();
      } catch (err) {
        socket.emit('status', 'Error: cannot save game.');
        return socket.disconnect(true);
      }
      socket.emit('update', getGame(userIndex, game));

      // check if game is over
      if (end) {
        socket.emit('results', getResults(game));

        // archive game
        let user = await findUser(userID);
        user.pastGames.push(gameID);
        user.games.splice(user.games.indexOf(gameID), 1);
        try {
          await user.save();
        } catch (err) {
          socket.emit('status', 'Error: cannot archive game.');
        }

        return socket.disconnect(true);
      }
    }
  });
};

module.exports = play;
