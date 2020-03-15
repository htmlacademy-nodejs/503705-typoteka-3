'use strict';

const {Cli} = require(`./cli`);

const {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  COUNT_ERROR_MESSAGE,
  MAX_COUNT_OF_POSTS,
  ExitCode,
} = require(`../constants.js`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

if (userArguments.slice(1)) {
  const [userPostsCount] = userArguments.slice(1);

  if (Number.parseInt(userPostsCount, 10) > MAX_COUNT_OF_POSTS) {
    console.error(COUNT_ERROR_MESSAGE);
    process.exit(ExitCode.error);
  }

  Cli[userCommand].run(userPostsCount);
}
