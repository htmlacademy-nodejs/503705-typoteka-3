'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  getRandomArr,
} = require(`../../utils.js`);
const {
  MAX_COUNT_OF_POSTS,
  COUNT_ERROR_MESSAGE,
  ExitCode,
} = require(`../../constants.js`);

const FILE_NAME = `mock.json`;
const FILE_ERR_MESSAGE = `Can't write data to file...`;
const FILE_SUCCESS_MESSAGE = `Operation success. File created.`;
const DEFAULT_COUNT = 1;
const ANNOUNCE_AMOUNT = 5;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;

/**
 * Период публикации -
 * три месяца с настоящего момента
 * в миллисекундах
 */
const PERIOD_OF_POST = 7776000000;

const readContent = async (filepath) => {
  try {
    const content = await fs.readFile(filepath, `utf-8`);
    return content.split(`\n`)
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getDate = () => {
  const nowDate = new Date();
  const earliestDate = nowDate - PERIOD_OF_POST;
  const dateOfPost = new Date(getRandomInt(earliestDate, nowDate));
  return `${dateOfPost.getFullYear()}-${dateOfPost.getMonth()}-${dateOfPost.getDate()} ${dateOfPost.getHours()}-${dateOfPost.getMinutes()}-${dateOfPost.getSeconds()}`;
};

const generatePosts = (amount, titles, sentences, categories) => (
  Array(amount).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getDate(),
    announce: getRandomArr(sentences, getRandomInt(1, ANNOUNCE_AMOUNT)).join(` `),
    fullText: getRandomArr(sentences, getRandomInt(ANNOUNCE_AMOUNT, sentences.length - 1)).join(` `),
    category: getRandomArr(categories, getRandomInt(1, categories.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(userCountOfPosts) {
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    let count = userCountOfPosts;
    if (!count) {
      count = DEFAULT_COUNT;
    }

    if (Number.parseInt(count, 10) > MAX_COUNT_OF_POSTS) {
      console.error(chalk.red(COUNT_ERROR_MESSAGE));
      process.exit(ExitCode.error);
    }

    count = Number.parseInt(userCountOfPosts, 10) || DEFAULT_COUNT;
    const fileContent = JSON.stringify(generatePosts(count, titles, sentences, categories));

    try {
      await fs.writeFile(FILE_NAME, fileContent);
      console.log(chalk.green(FILE_SUCCESS_MESSAGE));
    } catch (err) {
      console.error(chalk.red(FILE_ERR_MESSAGE));
    }
  },
};
