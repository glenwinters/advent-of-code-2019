import { getInput } from '../utils';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

const _getInput = () => getInput(__dirname);

const ASTEROID = '#';

type Map = string[][];

/**
 * Intuitively access the map using (x, y)
 */
const getPos = (map: Map, x: number, y: number): string => map[y][x];

/**
 * Check if the point is on the map.
 */
const inMapBounds = (map: Map, x: number, y: number): boolean =>
  x >= 0 && x < map.length && y >= 0 && y < map.length;

/**
 * For debugging, print the map.
 */
const printMap = (
  map: Map,
  asteroidsSeen: [number, number][],
  stationX: number,
  stationY: number
) => {
  for (let y = 0; y < map.length; y++) {
    let line = '';
    for (let x = 0; x < map.length; x++) {
      if (x === stationX && y === stationY) {
        line += '@';
      } else if (asteroidsSeen.find(([aX, aY]) => aX === x && aY === y)) {
        line += 'X';
      } else {
        line += getPos(map, x, y);
      }
    }
    console.log(line);
  }
  console.log('');
};

/**
 * Calculate the greatest common divisor of two numbers.
 * From https://github.com/ruffle1986/greatest-common-divisor
 */
const greatestCommonDivisor = (a: number, b: number): number => {
  if (!b) {
    return a;
  }
  return greatestCommonDivisor(b, a % b);
};

const countAsteroidsSeen = (map: Map, stationX: number, stationY: number) => {
  const asteroidsSeen: [number, number][] = [];
  let seen = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      // 1) Find next non-station asteroid but skip if it's already been scanned
      const isStation = x === stationX && y === stationY;
      if (
        getPos(map, x, y) === ASTEROID &&
        !isStation &&
        !asteroidsSeen.find(([aX, aY]) => aX === x && aY === y)
      ) {
        // 2) Identify smallest step between asteroid and station using gcd
        const dx = stationX - x;
        const dy = stationY - y;
        const gcd = greatestCommonDivisor(Math.abs(dx), Math.abs(dy));
        const stepX = dx / gcd;
        const stepY = dy / gcd;

        // 3) Check all points on the line to the station and mark every
        //    asteroid other than the current one as visited (replace # with X)
        let scanX = x + stepX;
        let scanY = y + stepY;
        while (!(scanX === stationX && scanY === stationY)) {
          if (getPos(map, scanX, scanY) === ASTEROID) {
            asteroidsSeen.push([scanX, scanY]);
          }
          scanX += stepX;
          scanY += stepY;
        }
        // 4) Also check all points on the line from the asteroid to the edge
        //    of the map and mark them as visited
        scanX = x - stepX;
        scanY = y - stepY;
        while (inMapBounds(map, scanX, scanY)) {
          if (getPos(map, scanX, scanY) === ASTEROID) {
            asteroidsSeen.push([scanX, scanY]);
          }
          scanX -= stepX;
          scanY -= stepY;
        }

        // 5) Mark the current asteroid as seen
        asteroidsSeen.push([x, y]);

        // 6) Note that one asteroid has been seen. Even if other asteroids
        //    were in the line, the station only sees one in that line.
        seen += 1;

        // DEBUG
        // printMap(map, asteroidsSeen, stationX, stationY);
      }
    }
  }
  return seen;
};

/**
 * Computes the solution to part 1 of the day.
 */
const part1 = async () => {
  const input = _getInput();
  const map = input.map(s => s.split(''));
  let seenMax = 0;

  // Check each asteroid
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      // If the space isn't an asteroid, calculate how many asteroids are seen
      // from that position
      if (getPos(map, x, y) === ASTEROID) {
        const seen = countAsteroidsSeen(map, x, y);
        // Update the max value if necessary
        if (seen > seenMax) {
          seenMax = seen;
        }
      }
    }
  }
  return seenMax;
};

/**
 * Computes the solution to part 2 of the day.
 */
const part2 = async () => {
  const input = _getInput();
  // 1) Calculate the angles of the asteroids
  // 2) Sort the angles (sort by distance secondarily)
  // 3) Blast away
};

export = {
  part1,
  part2
};
