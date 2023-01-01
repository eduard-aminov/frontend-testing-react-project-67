#!/usr/bin/env node
import { Command } from 'commander';

import pageLoader from '../index.js';

const program = new Command();

program
  .option('-o, --output <type>', 'output file path', process.cwd())
  .parse();

const url = program.args[0];
const outputPath = program.opts().output;

await pageLoader(url, outputPath);
