export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

/**
 *
 * @param {Array of Numbers} array
 * @returns  sum of all numbers
 */
export const getArraySum = array => {
  return array.reduce(function (a, b) {
    return a + b;
  }, 0);
};
