import { getInput } from '../utils';

const _getInput = (): string[] => getInput(__dirname);

const computeFuelRequired = (mass: number): number => Math.floor(mass / 3) - 2;

const computeFuelRequiredRecursive = (mass: number): number => {
  const fuelRequired = computeFuelRequired(mass);
  return fuelRequired > 0
    ? fuelRequired + computeFuelRequiredRecursive(fuelRequired)
    : 0;
};

/**
 * Computes the solution to part 1 of the day.
 */
const part1 = async (): Promise<number> => {
  const masses = _getInput().map(line => parseInt(line));
  const fuelRequiredSum = masses.reduce(
    (memo, mass) => memo + computeFuelRequired(mass),
    0
  );
  return fuelRequiredSum;
};

/**
 * Computes the solution to part 2 of the day.
 */
const part2 = async (): Promise<number> => {
  const masses = _getInput().map(line => parseInt(line));
  const fuelRequiredSum = masses.reduce(
    (memo, mass) => memo + computeFuelRequiredRecursive(mass),
    0
  );
  return fuelRequiredSum;
};

export = {
  part1,
  part2
};
