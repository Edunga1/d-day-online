/**
 * @param {number} n
 * @return {string}
 */
const addZero = n => (n < 10 ? `0${n}` : n);

/**
 * @param {number} n
 * @return {string}
 */
const toTimerString = n => (n && `${addZero(n)}:`) || '';

/**
 * @param {number} n milliseconds
 * @return {string}
 * ex.
 * 931 => 93
 * 91 => 09
 */
const toMsString = n => addZero(
  Math.floor(n / 10),
);

export {
  toTimerString,
  toMsString,
};
