/**
 * @param {Date} date
 * @param {number} n
 * @return {Date} a date after n days
 */
const afterDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

export default afterDays;
