# Advent of Code 2019

These are my solutions to [Advent of Code 2019](https://adventofcode.com/2019).

## Getting Started

Run every day with `yarn start`.

Run a single day with `yarn start --day <day>`.

### Example

```
$ yarn --silent start --day 1
Running day 1
Part 1: 3266288
Part 2: 4896582
```

## Development

`src/index.ts` is the runner, which needs to be invoked by `ts-node` since it's
in TypeScript.

Each day is in it's own directory (e.g. `src/1/`) that contains `input.txt`, the
puzzle input, and `index.ts`, the TS module. The TS module must export the
functions `part1` and `part2`, which should return the solutions of each part.

Each solution function starts by calling `getInput`, a helper function that
reads the local puzzle input and returns an array of lines.

### Start a new day

Generate the skeleton code for a new day with `npx hygen day new`.
