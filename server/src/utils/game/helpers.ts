function isInBounds(
  r: number,
  c: number,
  height: number,
  width: number
): boolean {
  return 0 <= r && r < height && 0 <= c && c < width;
}

function isInteger(i: string) {
  return /^-?\d+$/.test(i);
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

// return whether there are players alive in the game
function playersAlive(
  playersCount: number,
  maxLives: number,
  explosions: Array<number>
): boolean {
  for (let i = 0; i < playersCount; i++)
    if (maxLives - explosions[i] > 0) return true;
  return false;
}

// ts https://stackoverflow.com/a/58962072
function tsHasOwnProperty<T extends object>(obj: T, key: any): key is keyof T {
  return key && obj && obj.hasOwnProperty(key) && key in obj;
}

// ts workaround https://stackoverflow.com/a/59459000
function getObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof typeof obj>;
}

// ts workaround https://stackoverflow.com/q/48134984
function getObjectValue<T extends object>(obj: T, key: keyof T, def: any): any {
  return obj && obj.hasOwnProperty(key) ? obj[key] : def;
}

export {
  isInBounds,
  isInteger,
  strsToInt,
  isElementOf,
  arrayUnion,
  arraySum,
  playersAlive,
  tsHasOwnProperty,
  getObjectKeys,
  getObjectValue
};
