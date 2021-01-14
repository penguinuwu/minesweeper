const Game = require('../../models/game');
const generateGame = require('../game/generate-game');

const playSolo = async (req, res, next) => {
  // generate game
  let game = generateGame({
    shape: req.body.shape,
    difficulty: req.body.difficulty,
    height: req.body.height,
    width: req.body.width,
    bombCount: req.body.bombCount
  });
  if (!game) return res.status(400).send('Invalid game settings.');

  // add user id or temp user
  let userID = (req.user) ? req.user.id : 'temp';
  let userIndex = Object.keys(game.players).length;
  game.players[userID] = userIndex;

  game.data.lives.push(game.data.maxLives);
  game.data.flags.push(0);
  game.data.explosions.push(0);
  game.temp = (userID === 'temp');

  // store game
  try {
    let newGame = new Game({
      temp: game.temp,
      shape: game.shape,
      height: game.height,
      width: game.width,
      bombCount: game.bombCount,
      players: game.players,
      lobbys: game.lobbys,
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

    // store game for user if user is logged in
    if (req.user) {
      req.user.games.push(newGame.id);
      await req.user.save();
    }

    return res.status(200).send(newGame.id);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error: could not create game.');
  }
};

module.exports = playSolo;
