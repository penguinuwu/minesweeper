const generateGame = (settings) => {
  if (settings.shape === 'square') {
    // settings must have:
    //   difficulty: easy | intermediate | hard
    // or
    //   width: Number that is in [2, 50]
    //   height: Number that is in [2, 50]
    //   bombCount: Number that is <= width*height-3

    // import relevant square board functions
    const {
      getDifficulty,
      generateUnknownBoard,
      generateBombLocations,
      generateNewBoard
    } = require('$/bin/game/square/generate');

    // get difficulty settings
    let diff = getDifficulty(
      settings.difficulty,
      settings.height,
      settings.width,
      settings.bombCount
    );
    if (!diff) return null;

    // generate bomb locations
    let bombLocations = generateBombLocations(
      diff.height,
      diff.width,
      diff.bombCount
    );
    if (!bombLocations) return null;

    // generate solution and unsolved board
    let solved = generateNewBoard(diff.height, diff.width, bombLocations);
    let unsolved = generateUnknownBoard(diff.height, diff.width);
    if (!unsolved || !solved) return null;

    let game = {
      temp: true,
      shape: 'square',
      height: diff.height,
      width: diff.width,
      bombCount: diff.bombCount,
      players: {},
      lobbys: [],
      data: {
        maxLives: diff.maxLives,
        lives: [],
        flags: [],
        explosions: [],
        bombLocations: bombLocations,
        solved: solved,
        unsolved: unsolved
      }
    };

    return game;
  }

  return null;
};

module.exports = generateGame;
