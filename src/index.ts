import yargs, { Arguments } from 'yargs';
import chalk from 'chalk';

import { daysInDecember } from './utils';
import { readdirSync } from 'fs';

interface Options {
  day: number;
}

const runOne = async (day: number): Promise<void> => {
  try {
    const { part1, part2 } = await import(`./${day}`);
    const solutionPart1 = await part1();
    const solutionPart2 = await part2();
    console.log(chalk.green(`Running day ${day}`));
    console.log(`Part 1: ${solutionPart1}`);
    console.log(`Part 2: ${solutionPart2}`);
  } catch (e) {
    switch (e.code) {
      case 'MODULE_NOT_FOUND':
        console.error(`Could not find files for day ${day}`);
        break;
      default:
        console.error(`Something went wrong: ${e.message}`);
    }
  }
};

const runAll = async (): Promise<void> => {
  console.log(chalk.green(`Running every day`));
  console.log('-----------------');

  // Find all day directories
  const directories = readdirSync('src', {
    withFileTypes: true
  })
    .filter(folderItem => folderItem.isDirectory())
    .map(dir => parseInt(dir.name));

  await directories.forEach(async day => {
    return runOne(day);
  });
};

/**
 * Runs the CLI to start one or all the
 */
const runCLI = async (): Promise<void> => {
  yargs
    .scriptName('advent-of-code')
    .command(
      ['run', '$0'],
      '',
      yargs => {
        yargs.option('day', {
          type: 'number',
          describe: 'the day to run',
          choices: daysInDecember
        });
      },
      async (argv: Arguments<Options>) => {
        if (argv.day) {
          await runOne(argv.day);
        } else {
          await runAll();
        }
      }
    )
    .help().argv;
};

runCLI();
