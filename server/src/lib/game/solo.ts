const Game = require('$/models/game');
const Lobby = require('$/models/lobby');
const generateGame = require('$/bin/game/generate-game');

const playSolo = async (req, res, next) => {
  // generate game
  // use template strings to prevent array injection
  let game = generateGame({
    shape: `${req.body.shape}`,
    difficulty: `${req.body.difficulty}`,
    height: `${req.body.height}`,
    width: `${req.body.width}`,
    bombCount: `${req.body.bombCount}`
  });
  if (!game) return res.status(400).send('Invalid game settings.');

  // add user id or temp user
  let userID = req.user ? req.user.id : process.env.TEMP;
  let userIndex = Object.keys(game.players).length;
  game.players[userID] = userIndex;

  game.data.lives.push(game.data.maxLives);
  game.data.flags.push(0);
  game.data.explosions.push(0);
  game.temp = userID === process.env.TEMP;

  // store game
  try {
    let newGame = new Game({
      temp: game.temp,
      shape: game.shape,
      height: game.height,
      width: game.width,
      bombCount: game.bombCount,
      players: game.players,
      data: {
        lives: game.data.lives,
        flags: game.data.flags,
        explosions: game.data.explosions,
        bombLocations: game.data.bombLocations,
        solved: game.data.solved,
        unsolved: game.data.unsolved
      }
    });
    await newGame.save();

    let newLobby = new Lobby({
      temp: game.temp,
      lobbyType: 'solo',
      players: {},
      spectators: []
    });
    newLobby.players[userID] = newGame.id;
    await newLobby.save();

    // store lobby for user if user is logged in
    if (req.user) {
      req.user.lobbies.push(newLobby.id);
      await req.user.save();
    }

    return res
      .status(200)
      .send({ lobbyType: newLobby.lobbyType, lobbyID: newLobby._id });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error: could not create game.');
  }
};

module.exports = playSolo;
