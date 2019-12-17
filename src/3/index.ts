import _ from 'lodash';

import { getInput } from '../utils';

const _getInput = (): string[] => getInput(__dirname);

type Point = [number, number];

const vectorsByDirection = {
  U: [0, 1] as Point,
  D: [0, -1] as Point,
  R: [1, 0] as Point,
  L: [-1, 0] as Point
};

const isDirection = (
  direction: string
): direction is keyof typeof vectorsByDirection =>
  direction in vectorsByDirection;

const computePoint = (
  start: Point,
  vector: Point,
  multiplier: number
): Point => {
  const x = start[0] + vector[0] * multiplier;
  const y = start[1] + vector[1] * multiplier;
  return [x, y];
};

const parseInstruction = (
  instruction: string
): { vector: Point; steps: number } => {
  const direction = instruction.slice(0, 1);
  const steps = parseInt(instruction.slice(1));
  if (!isDirection(direction)) {
    throw Error(`${direction} is an invalid direction`);
  }
  const vector = vectorsByDirection[direction];
  return {
    vector,
    steps
  };
};

const addPointsFromInstruction = (
  points: Set<string>,
  start: Point,
  instruction: string
): { points: Set<string>; lastPoint: Point } => {
  const { vector, steps } = parseInstruction(instruction);

  // Add each point in the line segment
  // starting at [0, 0], U2 would result in {'0,1', '0,2'}
  let lastPoint = null;
  _.range(1, steps + 1).forEach(step => {
    const newPoint = computePoint(start, vector, step);
    points.add(newPoint.toString());
    if (step === steps) {
      lastPoint = newPoint;
    }
  });
  if (lastPoint === null) {
    throw Error('lastPoint could not be set');
  }
  return {
    points: points,
    lastPoint: lastPoint
  };
};

const getWirePoints = (instructions: string[]): Set<string> => {
  const points: Set<string> = new Set();
  let start: Point = [0, 0];
  instructions.forEach((instruction: string) => {
    const { lastPoint } = addPointsFromInstruction(points, start, instruction);
    start = lastPoint;
  });
  return points;
};

const findWireIntersections = (
  existingWire: Set<string>,
  instructions: string[]
): Point[] => {
  let start: Point = [0, 0];
  const intersections: Point[] = [];
  instructions.forEach((instruction: string) => {
    const { vector, steps } = parseInstruction(instruction);
    _.range(1, steps + 1).forEach(step => {
      const newPoint = computePoint(start, vector, step);
      if (step === steps) {
        start = newPoint;
      }
      // Check for intersection
      if (existingWire.has(newPoint.toString())) {
        intersections.push(newPoint);
      }
    });
  });
  return intersections;
};

const manhattanDistance = (point: Point): number => {
  return Math.abs(point[0]) + Math.abs(point[1]);
};

/**
 * Computes the solution to part 1 of the day.
 */
const part1 = async (): Promise<number> => {
  const input = _getInput();
  const wire1Instructions = input[0].split(',');
  const wire2Instructions = input[1].split(',');
  const wire1Points = getWirePoints(wire1Instructions);
  const intersections = findWireIntersections(wire1Points, wire2Instructions);
  const distances = intersections.map(manhattanDistance);
  return Math.min(...distances);
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
