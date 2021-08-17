import { GameClass } from 'models/game';
import { CELLS_ENCODER } from 'utils/game/encode';
import {
  isInBounds,
  isInteger,
  strsToInt,
  isElementOf,
  arrayUnion,
  arraySum,
  playersAlive
} from 'utils/game/helpers';

function nextTurn(game: GameClass) {
  const playerCount = Object.keys(game.players).length;
  game.turnIndex = (game.turnIndex + 1) % playerCount;
  game.markModified('turnIndex');
}

function reveal(i: string, j: string, game: GameClass) {
  let [success, r, c] = strsToInt(i, j);
  if (!success || !isInBounds(r, c, game.height, game.width)) return false;

  // if clicked on flag or bomb, then do nothing
  if (game.data.unsolved[r][c] === CELLS_ENCODER['flag']) return false;
  if (game.data.unsolved[r][c] === CELLS_ENCODER['bomb']) return false;

  // reveal all trivial squares
  let queue: Array<[number, number]> = [];
  let checked: Array<[number, number]> = [];

  if (game.data.unsolved[r][c] === CELLS_ENCODER['unknown']) {
    // if clicked on unknown, then reveal 1 cell
    queue.push([r, c]);
  } else if (isInteger(game.data.unsolved[r][c])) {
    // if clicked on number, then find surrounding trivial cells
    let surround: Array<[number, number]> = [];
    let surroundCount = parseInt(game.data.unsolved[r][c]);

    // find trivial cells
    for (let dr of [-1, 0, 1]) {
      for (let dc of [-1, 0, 1]) {
        let r2 = r + dr;
        let c2 = c + dc;

        // ignore if out of bounds
        if (!isInBounds(r2, c2, game.height, game.width)) continue;

        // check if its a bomb, flag, or unknown
        if (
          game.data.unsolved[r2][c2] === CELLS_ENCODER['flag'] ||
          game.data.unsolved[r2][c2] === CELLS_ENCODER['bomb']
        ) {
          surroundCount--;
        } else if (game.data.unsolved[r2][c2] === CELLS_ENCODER['unknown']) {
          surround.push([r2, c2]);
        }
      }
    }
    // there must be surroundCount of surrounding bombs
    if (surroundCount === 0) arrayUnion(queue, surround);
    // DEBUG: queue
    // console.log(`q ${Array.from(queue)}`)
    // no trivial cells
    if (queue.length === 0) return false;
  } else {
    // undefined cell
    return false;
  }

  while (queue.length) {
    [r, c] = queue.pop()!;
    checked.push([r, c]);

    if (game.data.unsolved[r][c] !== CELLS_ENCODER['unknown']) continue;

    // reveal cell
    game.data.unsolved[r][c] = game.data.solved[r][c];

    if (game.data.unsolved[r][c] === CELLS_ENCODER['0']) {
      // if revealed cell is 0, then reveal surrounding unknown cells
      for (let dr of [-1, 0, 1]) {
        for (let dc of [-1, 0, 1]) {
          let r2 = r + dr;
          let c2 = c + dc;
          if (
            !isInBounds(r2, c2, game.height, game.width) ||
            isElementOf([r2, c2], checked)
          )
            continue;
          if (game.data.unsolved[r2][c2] === CELLS_ENCODER['unknown'])
            queue.push([r2, c2]);
        }
      }
    } else if (game.data.unsolved[r][c] === CELLS_ENCODER['bomb']) {
      // bomb revealed
      game.data.explosions[game.turnIndex]++;
    }
  }

  return true;
}

function flag(i: string, j: string, game: GameClass) {
  let [success, r, c] = strsToInt(i, j);
  if (!success || !isInBounds(r, c, game.height, game.width)) return false;

  // if clicked on bomb, then do nothing
  if (game.data.unsolved[r][c] === CELLS_ENCODER['bomb']) return false;

  if (game.data.unsolved[r][c] === CELLS_ENCODER['flag']) {
    // remove flag
    game.data.unsolved[r][c] = CELLS_ENCODER['unknown'];
    game.data.flags[game.turnIndex]--;
  } else if (game.data.unsolved[r][c] === CELLS_ENCODER['unknown']) {
    // flag unknown block
    game.data.unsolved[r][c] = CELLS_ENCODER['flag'];
    game.data.flags[game.turnIndex]++;
  } else {
    // try to flag multiple blocks
    let surround: Array<[number, number]> = [];
    let surroundCount = parseInt(game.data.unsolved[r][c]);

    // check 9 surrounding directions
    for (let dr of [-1, 0, 1]) {
      for (let dc of [-1, 0, 1]) {
        let r2 = r + dr;
        let c2 = c + dc;

        // ignore current block and out of bounds
        if (
          (dr === 0 && dc === 0) ||
          !isInBounds(r2, c2, game.height, game.width)
        )
          continue;

        if (
          game.data.unsolved[r2][c2] === CELLS_ENCODER['flag'] ||
          game.data.unsolved[r2][c2] === CELLS_ENCODER['bomb']
        ) {
          surroundCount--;
        } else if (game.data.unsolved[r2][c2] === CELLS_ENCODER['unknown']) {
          surroundCount--;
          surround.push([r2, c2]);
        }
      }
    }

    if (surroundCount === 0 && surround.length !== 0) {
      // if all bombs are accounted for, then place trivial flags
      for ([r, c] of surround) {
        game.data.unsolved[r][c] = CELLS_ENCODER['flag'];
        game.data.flags[game.turnIndex]++;
      }
    } else {
      // no trivial flags
      return false;
    }
  }

  return true;
}

function gameEnd(game: GameClass) {
  if (!game.end) game.end = Date.now();
}

function checkGameEnd(game: GameClass) {
  // check end time set
  if (game.end) return true;

  // check players alive
  const playerCount = Object.keys(game.players).length;
  if (!playersAlive(playerCount, game.maxLives, game.explosions)) {
    gameEnd(game);
    return true;
  }

  // check if there are hidden bombs remaining
  const revealedBombCount = arraySum(game.flags) + arraySum(game.explosions);
  if (game.bombLocations.length === revealedBombCount) {
    // check bomb locations
    for (let i = 0; i < game.bombLocations.length; i++) {
      let [r, c] = game.bombLocations[i];
      if (game.unsolved[r][c] === CELLS_ENCODER['unknown']) return false;
    }
    // all bomb locations are revealed
    gameEnd(game);
    return true;
  }

  return false;
}

function getGame(userIndex: number, game: GameClass) {
  return {
    start: game.start,
    end: game.end,
    bombs: game.bombLocations.length - game.flags[game.turnIndex],
    lives: game.maxLives - game.explosions[game.turnIndex],
    // it is my turn if game has started, game has not ended, and index is me
    myTurn: game.start && !game.end && game.turnIndex === userIndex,
    board: game.unsolved
  };
}

export { nextTurn, reveal, flag, checkGameEnd, getGame };
