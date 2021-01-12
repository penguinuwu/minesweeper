const generateGame = (settings) => {
  if (settings.shape === 'square') {
    // import relevant square board functions
    const {
      getDifficulty,
      generateUnknownBoard,
      generateBombLocations,
      generateNewBoard
    } = require('./square/generate');

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
      players: [],
      lobbys: [],
      data: {
        lives: diff.lives,
        explosions: diff.explosions,
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
