---
to: src/<%=day%>/index.ts
---
import { getInput } from '../utils';

const _getInput = (): string[] => getInput(__dirname);

/**
 * Computes the solution to part 1 of the day.
 */
const part1 = async (): Promise<void> => {
  const input = _getInput();
};

/**
 * Computes the solution to part 2 of the day.
 */
const part2 = async (): Promise<void> => {
  const input = _getInput();
};

export = {
  part1,
  part2
};
