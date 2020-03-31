'use strict';

const {Cli} = require(`./cli`);

const {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
} = require(`../constants.js`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

if (userArguments.slice(1)) {
  const [count] = userArguments.slice(1);

  Cli[userCommand].run(count);
}
