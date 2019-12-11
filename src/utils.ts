import { readFileSync } from 'fs';
import path from 'path';

export const daysInDecember = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31
];

/**
 * Reads in input.txt and returns a list of lines of the file.
 */
export const getInput = (dir: string): string[] => {
  const inputPath = path.join(dir, 'input.txt');
  const input = readFileSync(inputPath).toString();
  return input.split(/\r?\n/).filter(line => line !== '');
};
