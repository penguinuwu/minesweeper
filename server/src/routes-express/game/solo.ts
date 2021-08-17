import { Request, Response } from 'express';
import GameModel from 'models/game';
import LobbyModel from 'models/lobby';
import UserModel from 'models/user';
import generateGame from 'utils/game/generate-game';

async function playSolo(req: Request, res: Response) {
  // generate game
  // use template strings to prevent array injection
  let game = generateGame({
    difficulty: `${req.body.difficulty}`,
    height: `${req.body.height}`,
    width: `${req.body.width}`,
    bombCount: `${req.body.bombCount}`,
    maxLives: `${req.body.maxLives}`
  });
  if (!game) return res.status(400).send('Invalid game settings.');

  // add user id or temp user
  let userID = req.user ? `${req.user.id}` : `${process.env.TEMP}`;
  let userIndex = 1;
  let players = { [userID]: userIndex };

  let flags = [0];
  let explosions = [0];
  let temp = userID === process.env.TEMP;

  // store game
  try {
    let newGame = await GameModel.create({
      temp: temp,
      height: game.height,
      width: game.width,
      maxLives: game.maxLives,
      bombLocations: game.bombLocations,
      solved: game.solved,
      unsolved: game.unsolved,
      players: players,
      flags: flags,
      explosions: explosions
    });

    let newLobby = await LobbyModel.create({
      temp: temp,
      lobbyType: 'solo',
      players: { [userID]: newGame.id }
    });

    // store lobby for user if user is logged in
    if (req.user) {
      await UserModel.findByIdAndUpdate(req.user.id, {
        $push: { lobbies: newLobby.id }
      });
    }

    return res
      .status(200)
      .send({ lobbyType: newLobby.lobbyType, lobbyID: newLobby.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error: could not create game.');
  }
}

export default playSolo;
