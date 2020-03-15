'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  let shuffledArray = someArray.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [shuffledArray[randomPosition], shuffledArray[i]] = [shuffledArray[i], shuffledArray[randomPosition]];
  }
  return shuffledArray;
};

const getRandomArr = (someArray, arrMaxLength) => shuffle(someArray).slice(0, arrMaxLength - 1);

module.exports = {
  getRandomInt,
  getRandomArr,
};
