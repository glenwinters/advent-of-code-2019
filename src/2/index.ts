import { getInput } from '../utils';

const _getInput = () => getInput(__dirname);

const runProgram = (state: number[], i: number): number[] => {
  const newState = [...state];
  const opcode = state[i];
  switch (opcode) {
    // ADD
    case 1:
      newState[state[i + 3]] = state[state[i + 1]] + state[state[i + 2]];
      return runProgram(newState, i + 4);
    // MULTIPLY
    case 2:
      newState[state[i + 3]] = state[state[i + 1]] * state[state[i + 2]];
      return runProgram(newState, i + 4);
    // HALT
    case 99:
      return state;
    // ERROR
    default:
      console.error('uh oh');
      return state;
  }
};

/**
 * Computes the solution to part 1 of the day.
 */
const part1 = async () => {
  const initialState: number[] = _getInput()[0]
    .split(',')
    .map(c => parseInt(c));

  // Restore to 1202 program alarm state
  initialState[1] = 12;
  initialState[2] = 2;

  const finalState = runProgram(initialState, 0);
  return finalState[0];
};

/**
 * Computes the solution to part 2 of the day.
 */
const part2 = async () => {
  const initialState: number[] = _getInput()[0]
    .split(',')
    .map(c => parseInt(c));

  for (let verb = 0; verb < 100; verb++) {
    for (let noun = 0; noun < 100; noun++) {
      const tweakedState = [...initialState];
      tweakedState[1] = noun;
      tweakedState[2] = verb;

      const finalState = runProgram(tweakedState, 0);

      if (finalState[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
};

export = {
  part1,
  part2
};
