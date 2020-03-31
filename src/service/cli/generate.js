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

/**
 * Период публикации -
 * три месяца с настоящего момента
 * в миллисекундах
 */
const PERIOD_OF_POST = 7776000000;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смртфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок - это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const SENTENCES = [
  `Ёлки - это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон - настоящая находка. Большой и яркий экран, мощнейший процессор - всё это в небольшом гаджете.`,
  `Золотое сечение - соотношение двух величин, нармоническая пропорция.`,
  `Собрать камни бесконичности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу, новую книгу, - и закрепите все урпажнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные урпажнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Модные гитарные риыф и скоростные соло - партии не дадут заскучать.`
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const getDate = () => {
  const nowDate = new Date();
  const earliestDate = nowDate - PERIOD_OF_POST;
  const dateOfPost = new Date(getRandomInt(earliestDate, nowDate));
  return `${dateOfPost.getFullYear()}-${dateOfPost.getMonth()}-${dateOfPost.getDate()} ${dateOfPost.getHours()}-${dateOfPost.getMinutes()}-${dateOfPost.getSeconds()}`;
};

const generatePosts = (amount) => (
  Array(amount).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getDate(),
    announce: getRandomArr(SENTENCES, getRandomInt(1, ANNOUNCE_AMOUNT)).join(` `),
    fullText: getRandomArr(SENTENCES, getRandomInt(ANNOUNCE_AMOUNT, SENTENCES.length - 1)).join(` `),
    category: getRandomArr(CATEGORIES, getRandomInt(1, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(userCountOfPosts) {
    let count = userCountOfPosts;
    if (!count) {
      count = DEFAULT_COUNT;
    }

    if (Number.parseInt(count, 10) > MAX_COUNT_OF_POSTS) {
      console.error(chalk.red(COUNT_ERROR_MESSAGE));
      process.exit(ExitCode.error);
    }

    count = Number.parseInt(userCountOfPosts, 10) || DEFAULT_COUNT;
    const fileContent = JSON.stringify(generatePosts(count));

    try {
      await fs.writeFile(FILE_NAME, fileContent);
      console.log(chalk.green(FILE_SUCCESS_MESSAGE));
    } catch (err) {
      console.error(chalk.red(FILE_ERR_MESSAGE));
    }
  },
};
