const isInBounds = (r, c, height, width) => {
  return 0 <= r && r < height && 0 <= c && c < width;
};

const isInteger = (i) => {
  return /^-?\d+$/.test(i);
};

const strsToInt = (i, j) => {
  if (isInteger(i) && isInteger(j)) {
    return [true, parseInt(i), parseInt(j)];
  } else {
    return [false, i, j];
  }
};

const isElementOf = (item, a) => {
  for (let i of a) if (i[0] === item[0] && i[1] === item[1]) return true;
  return false;
};

const arrayUnion = (a, b) => {
  for (let i of b) if (!isElementOf(i, a)) a.push(i);
};

const arraySum = (array) => {
  let total = 0;
  for (let value of array) total += value;
  return total;
};

// return whether there are players alive in the game
const playersAlive = (playersCount, maxLives, explosions) => {
  for (let i = 0; i < playersCount; i++)
    if (maxLives[i] - explosions[i] > 0) return true;
  return false;
};

module.exports = {
  isInBounds: isInBounds,
  isInteger: isInteger,
  strsToInt: strsToInt,
  isElementOf: isElementOf,
  arrayUnion: arrayUnion,
  arraySum: arraySum,
  playersAlive: playersAlive
};
