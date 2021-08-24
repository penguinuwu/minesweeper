import { findUser } from 'models/user';
import { findLobby } from 'models/lobby';
import { findGame } from 'models/game';
import { SessionSocket } from 'routes-socket';
import {
  nextTurn,
  reveal,
  flag,
  checkGameEnd,
  getGame
} from 'utils/game/actions';
import { isInteger } from 'utils/game/helpers';

async function play(socket: SessionSocket) {
  const passport = socket.request.session.passport;

  // store userID and lobbyID
  const userID = passport ? passport.user : `${process.env.TEMP}`;
  const lobbyID = `${socket.handshake.query.lobbyID}`;

  // get lobby from database
  const lobby = await findLobby(lobbyID);
  if (!lobby) {
    socket.emit('status', 'Lobby cannot be found.');
    return socket.disconnect(true);
  }
  const gameID = lobby.playerToGame.get(userID);

  // get game from database
  const game = await findGame(gameID);
  if (!game) {
    socket.emit('status', 'Game cannot be found.');
    return socket.disconnect(true);
  }

  // verify user
  const userIndex = game.players.get(userID);
  // note: userIndex might be 0, so we cannot just check `!userIndex`
  if (userIndex === undefined || !isInteger(userIndex)) {
    socket.emit('status', 'You cannot access this game.');
    return socket.disconnect(true);
  }

  // emit results if game has ended
  if (game.end) {
    socket.emit('results', getGame(userIndex, game));
    return socket.disconnect(true);
  }

  // game connection success
  socket.emit('update', getGame(userIndex, game));
  // socket.emit('status', 'Success');

  socket.on('start', async () => {
    if (game.end) {
      socket.emit('status', 'Game has already ended.');
      socket.emit('results', getGame(userIndex, game));
      return socket.disconnect(true);
    } else if (game.start) {
      return socket.emit('status', 'Game has already started.');
    }
    // set start time
    game.start = Date.now();

    // set turn to current user
    game.turnIndex = userIndex;

    // reveal top left corner
    for (const [r, v] of [
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

    // socket.emit('status', 'Success');
    socket.emit('update', getGame(userIndex, game));
  });

  socket.on(
    'move',
    async (moves: { action: 'reveal' | 'flag'; row: string; col: string }) => {
      if (game.end) {
        socket.emit('status', 'Game has already ended.');
        socket.emit('results', getGame(userIndex, game));
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
        // socket.emit('status', 'Success');

        // if move did not succeed, do not update
        if (!success) return;

        // go to next player's turn
        nextTurn(game);

        // possibly end the game
        const end = checkGameEnd(userIndex, game);

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
          socket.emit('results', getGame(userIndex, game));

          if (userID !== process.env.TEMP) {
            // archive game if user is logged in
            const user = await findUser(userID);
            if (user) {
              try {
                user.pastLobbies.push(lobbyID);
                user.lobbies.splice(user.lobbies.indexOf(lobbyID), 1);
                await user.save();
              } catch (err) {
                socket.emit('status', 'Error: cannot archive game.');
              }
            }
          }

          return socket.disconnect(true);
        }
      }
    }
  );
}

export default play;
