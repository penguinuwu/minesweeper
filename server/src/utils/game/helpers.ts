function isInBounds(
  r: number,
  c: number,
  height: number,
  width: number
): boolean {
  return 0 <= r && r < height && 0 <= c && c < width;
}

function isInteger(i: string | number) {
  return /^-?\d+$/.test(`${i}`);
}

function strsToInt(i: string, j: string): [boolean, number, number] {
  if (isInteger(i) && isInteger(j)) {
    return [true, parseInt(i), parseInt(j)];
  } else {
    return [false, 0, 0];
  }
}

function isElementOf<T>(item: [T, T], a: Array<[T, T]>): boolean {
  for (let i of a) {
    if (i[0] === item[0] && i[1] === item[1]) {
      return true;
    }
  }
  return false;
}

function arrayUnion<T>(a: Array<[T, T]>, b: Array<[T, T]>) {
  for (let i of b) if (!isElementOf(i, a)) a.push(i);
}

function arraySum(array: Array<number>): number {
  let total = 0;
  for (let value of array) total += value;
  return total;
}

// return whether there are any dead players in the game
function playersDead(
  playersCount: number,
  maxLives: number,
  explosions: Array<number>
): boolean {
  for (let i = 0; i < playersCount; i++)
    if (maxLives - explosions[i] <= 0) return true;
  return false;
}

export {
  isInBounds,
  isInteger,
  strsToInt,
  isElementOf,
  arrayUnion,
  arraySum,
  playersDead
};
