import UserModel, { UserClass } from 'models/user';
import LobbyModel, { LobbyClass } from 'models/lobby';
import GameModel, { GameClass } from 'models/game';
import { isInteger } from 'utils/game/helpers';
import {
  nextTurn,
  reveal,
  flag,
  checkGameEnd,
  getGame
} from 'utils/game/actions';
import { Socket } from 'socket.io';

async function findLobby(lobbyID: LobbyClass) {
  if (!lobbyID) return null;
  try {
    return await LobbyModel.findById(lobbyID).exec();
  } catch (err) {
    return null;
  }
}

async function findGame(gameID: GameClass) {
  if (!gameID) return null;
  try {
    return await GameModel.findById(gameID).exec();
  } catch (err) {
    return null;
  }
}

async function findUser(userID: UserClass) {
  if (!userID) return null;
  try {
    return await UserModel.findById(userID).exec();
  } catch (err) {
    return null;
  }
}

async function play(socket: Socket) {
  const passport = socket.request.session.passport;
  const query = socket.handshake.query;

  // store userID and lobbyID
  const userID = passport ? passport.user : process.env.TEMP;
  const lobbyID = query.lobbyID;

  // get lobby from database
  const lobby = await findLobby(lobbyID);
  if (!lobby) {
    socket.emit('status', 'Lobby cannot be found.');
    return socket.disconnect(true);
  }
  const gameID = lobby.players[userID];

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
    socket.emit('results', getGame(userIndex, game));
    return socket.disconnect(true);
  }

  // game connection success
  socket.emit('update', getGame(userIndex, game));
  socket.emit('status', process.env.SUCCESS);

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

    socket.emit('status', process.env.SUCCESS);
    socket.emit('update', getGame(userIndex, game));
  });

  socket.on('move', async (moves) => {
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
      socket.emit('status', process.env.SUCCESS);

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
        socket.emit('results', getGame(userIndex, game));

        if (userID !== process.env.TEMP) {
          // archive game if user is logged in
          let user = await findUser(userID);
          try {
            user.pastLobbies.push(lobbyID);
            user.lobbies.splice(user.lobbies.indexOf(lobbyID), 1);
            await user.save();
          } catch (err) {
            socket.emit('status', 'Error: cannot archive game.');
          }
        }

        return socket.disconnect(true);
      }
    }
  });
}

export default play;
