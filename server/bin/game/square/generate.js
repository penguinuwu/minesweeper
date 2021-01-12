const { CELLS_ENCODER } = require('./encode');
const { isInBounds } = require('./move');

// https://dash.harvard.edu/bitstream/handle/1/14398552/BECERRA-SENIORTHESIS-2015.pdf
const DEFAULT_DIFFICULTIES = {
  easy: {
    height: 10,
    width: 10,
    bombCount: 10
  },
  intermediate: {
    height: 16,
    width: 16,
    bombCount: 40
  },
  expert: {
    height: 30,
    width: 16,
    bombCount: 99
  }
};

const getDifficulty = (difficulty, height, width, bombCount) => {
  // check if difficulty is easy, intermediate, or expert
  if (DEFAULT_DIFFICULTIES[difficulty])
    return DEFAULT_DIFFICULTIES[difficulty];

  // check if height, width, and bombCount all exist
  if (!height || !width || !bombCount) return null;

  // check if board dimensions are valid
  if (
    !(2 <= height && height <= 50) ||
    !(2 <= width && width <= 50) ||
    !(height * width - 3 >= bombCount)
  )
    return {
      height: height,
      width: width,
      bombCount: bombCount
    };

  // invalid dimensions
  return null;
};

const shuffleArray = (array) => {
  // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const generateUnknownBoard = (height, width) => {
  // https://stackoverflow.com/a/38213067
  return [...Array(height)].map(() =>
    Array(width).fill(CELLS_ENCODER['unknown'])
  );
};

const generateBombLocations = (height, width, bombCount) => {
  // height must be in [2, 50]
  // width must be in [2, 50]
  // there must be 3 empty blocks
  // return null if settings are invalid
  if (
    !(2 <= height && height <= 50) ||
    !(2 <= width && width <= 50) ||
    !(height * width - 3 >= bombCount)
  )
    return null;

  // generate array of possible bomb locations
  let possibilities = [];
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (
        !(r === 0 && c === 0) &&
        !(r === 0 && c === 1) &&
        !(r === 1 && c === 0)
      ) {
        possibilities.push([r, c]);
      }
    }
  }

  // shuffle possibilities
  shuffleArray(possibilities);

  // take bombCount amount of possible bomb locations
  let bombLocations = [];
  for (let i = 0; i < bombCount; i++) {
    bombLocations.push(possibilities[i]);
  }

  return bombLocations;
};

const generateNewBoard = (height, width, bombLocs) => {
  // init board with unknowns
  let newBoard = generateUnknownBoard(height, width);

  // place bombs
  for (let i = 0; i < bombLocs.length; i++)
    newBoard[bombLocs[i][0]][bombLocs[i][1]] = CELLS_ENCODER['bomb'];

  // calculate numbers
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (newBoard[r][c] !== CELLS_ENCODER['unknown']) continue;
      let bombCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (
            (dx === 0 && dy === 0) ||
            !isInBounds(r + dy, c + dx, height, width)
          )
            continue;

          if (newBoard[r + dy][c + dx] === CELLS_ENCODER['bomb']) bombCount++;
        }
      }
      newBoard[r][c] = bombCount;
    }
  }

  return newBoard;
};

module.exports = {
  getDifficulty: getDifficulty,
  generateUnknownBoard: generateUnknownBoard,
  generateBombLocations: generateBombLocations,
  generateNewBoard: generateNewBoard
};
