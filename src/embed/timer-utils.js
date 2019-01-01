/**
 * @param {number} n
 * @return {string}
 */
const addZero = n => (n < 10 ? `0${n}` : n);

/**
 * @param {number} n
 * @return {string}
 */
const toTimerString = n => (typeof n === 'number' && `${addZero(Math.max(n, 0))}:`) || '';

/**
 * @param {number} n milliseconds
 * @return {string}
 * ex.
 * 931 => 93
 * 91 => 09
 */
const toMsString = n => addZero(
  Math.max(Math.floor(n / 10), 0),
);

export {
  toTimerString,
  toMsString,
};
